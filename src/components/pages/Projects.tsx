import Page from "../UI/Page";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";

const Projects = () => {
  return (
    <Page>
      <h2 className="text-center font-bold text-xl my-8 text-gray-500 md:text-left">
        PROJECTS
      </h2>
      <main className="grid place-items-center grid-cols-1 md:grid-cols-2"></main>
      <div className="text-center">
        <button className="btn btn-secondary">Load More</button>
      </div>
      <Popular />
      <ContactForm />
    </Page>
  );
};

export default Projects;
