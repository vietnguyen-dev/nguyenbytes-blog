import { useState, useEffect } from "react";
import Page from "./components/UI/Page";
import Popular from "./components/UI/Popular";
import ContactForm from "./components/UI/Contact";

const APIURL = import.meta.env.VITE_API_URL;
const BLOG = import.meta.env.VITE_BLOG;

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [perPage, setPerPage] = useState<number>(1);

  useEffect(() => {
    const getBlogPost = async () => {
      const res = await fetch(
        `${APIURL}/posts?categories=${BLOG}&per_page=${10 * perPage}`
      );
      const data = await res.json();
      setBlogPosts(data);
    };
    getBlogPost();
  }, [perPage]);

  const shortenHTML = (content: string) => {
    const parts = content.split("/p>");
    if (parts.length <= 1) {
      return content;
    }
    const shortened = parts.slice(0, 1).join("/p>") + "/p>";
    return shortened;
  };

  const increasePerPage = () => setPerPage(perPage + 1);

  return (
    <Page>
      <h1 className="text-xl font-bold mb-8 text-gray-400 tracking-widest">
        ARTICLES
      </h1>
      <main className="flex flex-col lg:flex-row ">
        <div className="flex flex-col mr-6">
          {blogPosts.map((post: any) => (
            <div className="mb-12" key={post.id}>
              <h2 className="mb-3 text-xl font-semibold">
                <a
                  href={`/${post.id}`}
                  className="font-bold mb-3 hover:border-b-2 hover:border-blue-400"
                >
                  {post.title.rendered}
                </a>
              </h2>
              <div
                className="mb-3"
                dangerouslySetInnerHTML={{
                  __html: shortenHTML(post.content.rendered),
                }}
              />
              <button className="btn btn-primary">
                <a href={`${post.id}`}>Read More</a>
              </button>
            </div>
          ))}
          <button className="btn btn-secondary w-32" onClick={increasePerPage}>
            Load More
          </button>
        </div>
        <Popular />
      </main>
      <ContactForm />
    </Page>
  );
}

export default App;
