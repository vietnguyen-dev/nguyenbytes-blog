import { useState, useEffect } from "react";

const EMAIL_API = import.meta.env.VITE_EMAIL_LAMBDA;

let debounceTimer: ReturnType<typeof setTimeout>;

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sent, sentStatus] = useState<boolean>(false);
  const [btnStatus, setBtnStatus] = useState<boolean>(false);

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      checkBtnStatus(name, email, message, setBtnStatus);
    }, 500); // wait 500ms after the user stops typing
  }, [name, email, message]);

  const checkBtnStatus = (
    name: string,
    email: string,
    message: string,
    setBtnStatus: (status: boolean) => void
  ) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = pattern.test(email);

    if (name.length > 0 && message.length > 0 && validEmail) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

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
      <div className="card bg-base-100 shadow-xl max-w-sm mx-auto mb-3">
        <div className="card-body">
          <h2 className="card-title">Contact Me!</h2>
          <p className="mb-3">
            If you want to work with me or ask me a question send it here!
          </p>
          <form className="flex flex-col" onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered validator w-full max-w-xs mb-3"
              value={name}
              required
              onChange={handleName}
            />
            <input
              type="email"
              placeholder="email@email.com"
              className="input input-bordered validator w-full max-w-xs mb-3"
              value={email}
              required
              onChange={handleEmail}
            />
            <textarea
              placeholder="type message here"
              className="input input-bordered w-full max-w-xs mb-3 h-auto"
              value={message}
              required
              onChange={handleMessage}
              rows={5}
            />
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary w-full max-w-xs"
                disabled={!btnStatus}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
