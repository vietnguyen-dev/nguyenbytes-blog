import { useState } from "react";

const EMAIL_API = import.meta.env.VITE_EMAIL_LAMBDA;

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sent, sentStatus] = useState<boolean>(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(EMAIL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          subject: "Blog Inquiry",
          email: email,
          message: message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        sentStatus(true);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex mt-12">
      <div className="card bg-base-100 shadow-xl max-w-sm mx-auto">
        <div className="card-body">
          {sent ? (
            <p>Message sent. I will reach out shortly!</p>
          ) : (
            <>
              <h2 className="card-title">Contact Me!</h2>
              <p className="mb-3">
                If you want to work with me or ask me a question send it here!
              </p>
              <form className="flex flex-col" onSubmit={sendEmail}>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered w-full max-w-xs mb-3"
                  value={name}
                  onChange={handleName}
                />
                <input
                  type="text"
                  placeholder="email@email.com"
                  className="input input-bordered w-full max-w-xs mb-3"
                  value={email}
                  onChange={handleEmail}
                />
                <textarea
                  placeholder="type message here"
                  className="input input-bordered w-full max-w-xs mb-3 h-auto"
                  value={message}
                  onChange={handleMessage}
                  rows={5}
                />
                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full max-w-xs">
                    SUBMIT
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
