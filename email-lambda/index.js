import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({});

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  },
  body: JSON.stringify(body),
});

const parseBody = (event) => {
  if (!event?.body) {
    return {};
  }

  if (typeof event.body === "string") {
    return JSON.parse(event.body);
  }

  return event.body;
};

const normalizeString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildTextEmail = ({ name, email, company, note }) =>
  [
    "New contact form submission",
    "",
    "Contact details",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    "",
    "Message",
    note,
  ].join("\n");

const buildHtmlEmail = ({ name, email, company, note }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeNote = escapeHtml(note).replace(/\n/g, "<br />");

  return `
    <html>
      <body style="margin:0;padding:24px;background-color:#f4f4f4;font-family:Arial,sans-serif;color:#1f2937;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:32px;">
                    <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;color:#111827;">New contact form submission</h1>
                    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                      A new inquiry was submitted through your website.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;">
                      <tr>
                        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;font-weight:600;width:140px;">Name</td>
                        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;font-weight:600;">Email</td>
                        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;">${safeEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;font-weight:600;">Company</td>
                        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;">${safeCompany}</td>
                      </tr>
                    </table>
                    <h2 style="margin:0 0 12px;font-size:16px;line-height:1.4;color:#111827;">Message</h2>
                    <div style="font-size:14px;line-height:1.7;color:#374151;white-space:normal;">${safeNote}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim();
};

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method || event?.httpMethod;

  if (method === "OPTIONS") {
    return response(200, { ok: true });
  }

  try {
    const body = parseBody(event);
    const name = normalizeString(body.name);
    const email = normalizeString(body.email).toLowerCase();
    const company = normalizeString(body.company);
    const note = normalizeString(body.note);

    if (!name || !email || !company || !note) {
      return response(400, {
        error: "Missing required fields: name, email, company, and note.",
      });
    }

    if (!isValidEmail(email)) {
      return response(400, {
        error: "Email must be a valid email address.",
      });
    }

    const fromEmail = process.env.SES_FROM_EMAIL;
    if (!fromEmail) {
      throw new Error("SES_FROM_EMAIL environment variable is required.");
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!notificationEmail) {
      throw new Error("NOTIFICATION_EMAIL environment variable is required.");
    }

    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: [notificationEmail],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `New website inquiry: ${name} (${company})`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: buildTextEmail({ name, email, company, note }),
            Charset: "UTF-8",
          },
          Html: {
            Data: buildHtmlEmail({ name, email, company, note }),
            Charset: "UTF-8",
          },
        },
      },
    });

    await ses.send(command);

    return response(200, { ok: true });
  } catch (error) {
    console.error("Failed to send email with SES", error);

    return response(500, {
      error: error instanceof Error ? error.message : "Failed to send email.",
    });
  }
};
