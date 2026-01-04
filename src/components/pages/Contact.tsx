import ContactForm from "../UI/Contact";
import Page from "../UI/Page";
import Popular from "../UI/Popular";

const Contact = () => {
  return (
    <Page>
      <div className="lg:w-3/5 lg:mx-auto lg:px-8">
        <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest px-2 mt-6">CONTACT</h2>
        <p className="mb-3">Contact me at the below options!</p>
        <ContactForm showHeading={false} />
        <Popular />
      </div>
    </Page>
  );
};

export default Contact;
