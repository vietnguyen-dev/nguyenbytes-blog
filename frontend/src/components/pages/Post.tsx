import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Page from "../UI/Page";
import iWordpressRes from "../interfaces/iWordpressRes";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";
const APIURL = import.meta.env.VITE_API_URL;

export const replace = (content: string | undefined) => {
  if (!content) return "";
  return content.replace(/<p>/g, "<p class=mb-4>");
};

const Post = () => {
  const [page, setPage] = useState<iWordpressRes | null>(null);
  let { id } = useParams();

  useEffect(() => {
    const getBlogPost = async () => {
      const res = await fetch(`${APIURL}/posts/${id}`);
      const data: iWordpressRes = await res.json();
      setPage(data);
    };
    getBlogPost();
  }, []);

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
      {page ? (
        <main className="lg:mx-24">
          <h2 className="text-3xl mb-6">{page.title.rendered}</h2>
          <p className="mb-3">
            Posted on {formatDate(page.date)}, Updated on{" "}
            {formatDate(page.modified)}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: replace(page.content?.rendered),
            }}
          />
          <Popular />
          <ContactForm />
        </main>
      ) : (
        <p>content loading...</p>
      )}
    </Page>
  );
};

export default Post;
