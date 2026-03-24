import ContactForm from "../UI/Contact";
import Page from "../UI/Page";
import Popular from "../UI/Popular";
import Cloud from "../UI/Cloud";

const Contact = () => {
  return (
    <Page>
      <div className="lg:w-3/5 lg:mx-auto lg:px-8 relative">
        <Cloud variant={1} className="absolute -top-4 -left-8 lg:left-0 w-48 h-24 text-base-content opacity-5 z-0" />
        <h2 className="text-center font-bold text-xl my-8 text-gray-500 md:text-left relative z-10">
          CONTACT
        </h2>
        <p className="mb-3">Contact me at the below options!</p>
        <ContactForm showHeading={false} showLaptop={true} />
        <Popular />
      </div>
    </Page>
  );
};

export default Contact;
