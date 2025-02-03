import ContactForm from "../UI/Contact";
import Page from "../UI/Page";
import Popular from "../UI/Popular";

const Contact = () => {
  return (
    <Page>
      <h2 className="text-2xl font-bold mb-3">Contact</h2>
      <p className="mb-3">
        Email me at the form below or message me on linkedin at the icon in the
        footer!
      </p>
      <p>Alternatively call me at (971) 998 2695</p>
      <ContactForm />
      <Popular />
    </Page>
  );
};

export default Contact;
