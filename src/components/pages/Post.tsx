import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Page from "../UI/Page";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";
import iContentfulPostRes from "../../interfaces/iContentfulPostRes";

const CDN_KEY = import.meta.env.VITE_CDN_API_KEY;
const SPACE_ID = import.meta.env.VITE_SPACE_ID;

const Post = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState<iContentfulPostRes | null>(null);

  useEffect(() => {
    const getBlogPost = async () => {
      if (!id) return;

      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries/${id}?access_token=${CDN_KEY}`,
      );
      const data = await response.json();
      console.log(data.fields);
      setPost(data);
    };

    getBlogPost();
  }, []);

  return (
    <Page>
      <main>
        {post ? (
          <div>
            <h1 className="text-3xl font-bold mt-6 mb-3 px-2">
              {post.fields.title}
            </h1>
            <p className="mx-3 whitespace-pre-line">{post.fields.post}</p>
          </div>
        ) : (
          <span className="loading loading-spinner loading-xl"></span>
        )}
        <Popular />
        <ContactForm />
      </main>
    </Page>
  );
};

export default Post;
