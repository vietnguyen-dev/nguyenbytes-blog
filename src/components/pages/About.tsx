import Page from "../UI/Page";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";

const About = () => {
  return (
    <Page>
      <div className="lg:w-3/5 lg:mx-auto lg:px-8">
        <h2 className="text-center font-bold text-xl my-8 text-gray-500 md:text-left">
          ABOUT ME
        </h2>
        <main className="mb-8">
          <div className="prose max-w-none">
          <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-6">What I Do</h3>
          <p className="mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p className="mb-4">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
          </p>

          <div className="mt-8">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View My Resume
            </a>
          </div>
          </div>
        </main>
        <Popular />
        <ContactForm />
      </div>
    </Page>
  );
};

export default About;
