import express, { Application, Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = 8081;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Nodemailer Transporter Configuration (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// send email route
app.post("/send-email", async (req: Request, res: Response) => {
  const { email, text } = req.body;

  // Input validation
  if (!email || !text) {
    res
      .status(400)
      .json({ error: "Missing required fields: to, subject, text" });
  }

  const html = `
        You have received a new message

        ${text}

        from: ${email}
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: process.env.EMAIL_USER, // Receiver's email
    subject: "Email from Nguyenbytes.com", // Email subject
    text: html, // Email body content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send email",
      details: (error as any).message,
    });
  }
});

// start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
