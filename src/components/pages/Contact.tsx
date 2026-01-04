import ContactForm from "../UI/Contact";
import Page from "../UI/Page";
import Popular from "../UI/Popular";

const Contact = () => {
  return (
    <Page>
      <h2 className="text-3xl font-bold mt-6 mb-3">Contact</h2>
      <p className="mb-3">Contact me at the below options!</p>
      <ContactForm showHeading={false} />
      <Popular />
    </Page>
  );
};

export default Contact;
