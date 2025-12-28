import { useState, useEffect } from "react";
import Page from "../UI/Page";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";
import { iCategory } from "../../App";
const APIURL = import.meta.env.VITE_API_URL;

const Projects = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [perPage, setPerPage] = useState<number>(1);

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
      setBlogPosts(data);
    };
    getBlogPost("Projects");
  }, [perPage]);

  const increasePage = () => setPerPage(perPage + 1);

  return (
    <Page>
      <h2 className="text-center font-bold text-xl my-8 text-gray-500 md:text-left">
        PROJECTS
      </h2>
      <main className="grid place-items-center grid-cols-1 md:grid-cols-2">
        {blogPosts.map((post: any) => {
          return (
            <div
              key={post.id}
              className="card bg-base-100 shadow-xl mb-6 mr-3 "
            >
              <div className="card-body">
                <h3 className="card-title">{post.title.rendered}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  className="line-clamp-3"
                />
                <div className="card-actions justify-end">
                  <a href={`/${post.id}`}>Read More</a>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      <div className="text-center">
        <button className="btn btn-secondary" onClick={increasePage}>
          Load More
        </button>
      </div>
      <Popular />
      <ContactForm />
    </Page>
  );
};

export default Projects;
