import { useState, useEffect } from "react";
const CDN_KEY = import.meta.env.VITE_CDN_API_KEY;
const SPACE_ID = import.meta.env.VITE_SPACE_ID;

const Popular = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getBlogPost = async () => {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${CDN_KEY}&content_type=blog`,
      );
      const data = await response.json();
      setPosts(data);
      console.log(data);
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
      <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest px-2">
        POPULAR CONTENT
      </h2>
      <div></div>
    </div>
  );
};

export default Popular;
