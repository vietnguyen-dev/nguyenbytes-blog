import { useState, useEffect } from "react";
import Page from "./components/UI/Page";
import Popular from "./components/UI/Popular";
import ContactForm from "./components/UI/Contact";

const APIURL = import.meta.env.VITE_API_URL;

export interface iCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: {
    self: { href: string }[];
    collection: { href: string }[];
  };
}

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [perPage, setPerPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  useEffect(() => {
    const getBlogPost = async (title: string) => {
      const response = await fetch(`${APIURL}/categories`);
      const catgegories = await response.json();
      if (catgegories.length === 0) {
        setBlogPosts([]);
      }
      const filtered = catgegories.filter(
        (category: iCategory) => category.name === title
      );
      let id = filtered[0].id;
      const res = await fetch(
        `${APIURL}/posts?categories=${id}&per_page=${10 * perPage}`
      );
      const data = await res.json();
      if (data.length <= 10) {
        setLoadMore(false);
      }
      setBlogPosts(data);
    };

    getBlogPost("Blog Post");
  }, [perPage]);

  const shortenHTML = (content: string) => {
    const parts = content.split("/p>");
    if (parts.length <= 1) {
      return content;
    }
    const shortened = parts.slice(0, 1).join("/p>") + "/p>";
    return shortened;
  };

  const increasePerPage = () => {
    setPerPage(perPage + 1);
  };

  return (
    <Page>
      <h1 className="text-2xl font-bold my-8 text-gray-500 tracking-widest">
        ARTICLES
      </h1>
      <main className="flex flex-col lg:flex-row ">
        <div className="flex flex-col mr-6">
          {blogPosts.map((post: any) => (
            <div className="mb-12" key={post.id}>
              <h2 className="mb-3 text-2xl font-semibold">
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
              <button className="btn btn-secondary">
                <a href={`/${post.id}`}>Load More</a>
              </button>
            </div>
          ))}
          {loadMore || (
            <button
              className="btn btn-secondary w-32"
              onClick={increasePerPage}
            >
              Load More
            </button>
          )}
        </div>
        <Popular />
      </main>
      <ContactForm />
    </Page>
  );
}

export default App;
