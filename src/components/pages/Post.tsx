import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Page from "../UI/Page";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";

const CDN_KEY = import.meta.env.VITE_CDN_API_KEY;
const SPACE_ID = import.meta.env.VITE_SPACE_ID;

const Post = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const getBlogPost = async () => {
      if (!id) return;

      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries/${id}?access_token=${CDN_KEY}`,
      );
      const data = await response.json();
      console.log(data);
      setPost(data);
    };

    getBlogPost();
  }, [id]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return (
    <Page>
      <main className="lg:mx-24">
        <h2 className="text-3xl font-bold mt-6 mb-3 px-2"></h2>
        <Popular />
        <ContactForm />
      </main>
    </Page>
  );
};

export default Post;
