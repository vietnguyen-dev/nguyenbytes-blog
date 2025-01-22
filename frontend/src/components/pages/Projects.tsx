import { useState, useEffect } from "react";
import Page from "../UI/Page";
import Popular from "../UI/Popular";
import ContactForm from "../UI/Contact";
const APIURL = import.meta.env.VITE_API_URL;
const PROJECTS = import.meta.env.VITE_PROJECTS;

const Projects = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [perPage, setPerPage] = useState<number>(1);

  useEffect(() => {
    const getBlogPost = async () => {
      const res = await fetch(
        `${APIURL}/posts?categories=${PROJECTS}&per_page=${10 * perPage}`
      );
      const data = await res.json();
      setBlogPosts(data);
    };
    getBlogPost();
  }, [perPage]);

  return (
    <Page>
      <h2 className="text-center font-bold text-2xl mb-3 md: text-left">
        Projects
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
      <Popular />
      <ContactForm />
    </Page>
  );
};

export default Projects;
