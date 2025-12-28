import { useState, useEffect } from "react";
const APIURL = import.meta.env.VITE_API_URL;
const Popular = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getBlogPost = async () => {};
    console.log("test");
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
