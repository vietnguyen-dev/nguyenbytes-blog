import { useEffect } from "react";
import Page from "../UI/Page";

const APIURL = import.meta.env.VITE_API_URL;

const About = () => {
  useEffect(() => {
    const getBlogPost = async () => {
      console.log("data");
    };
    getBlogPost();
  }, []);

  return (
    <Page>
      <h1>About</h1>
    </Page>
  );
};

export default About;
