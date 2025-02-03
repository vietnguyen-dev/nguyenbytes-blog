import { useState, useEffect } from "react";
import Page from "../UI/Page";
import iWordpressRes from "../interfaces/iWordpressRes";
import { replace } from "../pages/Post";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";

const APIURL = import.meta.env.VITE_API_URL;

const About = () => {
  const [about, setAbout] = useState<iWordpressRes | null>(null);

  useEffect(() => {
    const getBlogPost = async () => {
      const res = await fetch(`${APIURL}/pages?slug=about`);
      const data: iWordpressRes[] = await res.json();
      console.log(data);
      setAbout(data[0]);
    };
    getBlogPost();
  }, []);

  return (
    <Page>
      {about ? (
        <main className="lg:mx-24">
          <h2 className="text-2xl font-semibold mb-3">
            {about.title.rendered}
          </h2>
          <div
            className="mb-12"
            dangerouslySetInnerHTML={{
              __html: replace(about.content?.rendered),
            }}
          />
          <Popular />
          <ContactForm />
        </main>
      ) : (
        <p>no loaded</p>
      )}
    </Page>
  );
};

export default About;
