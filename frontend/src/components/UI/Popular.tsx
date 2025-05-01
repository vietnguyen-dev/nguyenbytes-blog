import { useState, useEffect } from "react";
const APIURL = import.meta.env.VITE_API_URL;
import { iCategory } from "../../App";
const Popular = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getBlogPost = async (title: string) => {
      const response = await fetch(`${APIURL}/categories`);
      const catgegories = await response.json();
      if (catgegories.length === 0) {
        setPosts([]);
      }
      const filtered = catgegories.filter(
        (category: iCategory) => category.name === title
      );
      let id = filtered[0].id;
      const res = await fetch(`${APIURL}/posts?categories=${id}`);
      const data = await res.json();
      setPosts(data);
    };
    getBlogPost("Popular");
  }, []);

  const isRoot = () => {
    const path = window.location.pathname;
    return path === "/";
  };

  const root = isRoot();

  return (
    <div className={`mt-10 sticky top-20 ${root && "lg:h-screen"}`}>
      <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest px-2">
        POPULAR CONTENT
      </h2>
      <div>
        {posts.map((post: any) => (
          <div key={post.id} className="mb-3 px-2">
            <h2 className="text-lg">
              <a
                href={`/${post.id}`}
                className="hover:border-b-2 hover:border-blue-400"
              >
                {post.title.rendered}
              </a>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
