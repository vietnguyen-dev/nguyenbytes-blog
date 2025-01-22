import { useState, useEffect } from "react";
const APIURL = import.meta.env.VITE_API_URL;
const POPULAR = import.meta.env.VITE_POPULAR;

const Popular = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getBlogPost = async () => {
      const res = await fetch(`${APIURL}/posts?categories=${POPULAR}`);
      const data = await res.json();
      setPosts(data);
    };
    getBlogPost();
  }, []);

  const isRoot = () => {
    const path = window.location.pathname;
    return path === "/";
  };

  const root = isRoot();

  return (
    <div className={`mt-10 sticky top-20 ${root && "lg:h-screen"}`}>
      <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest">
        POPULAR CONTENT
      </h2>
      <div>
        {posts.map((post: any) => (
          <div key={post.id} className="mb-3">
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
