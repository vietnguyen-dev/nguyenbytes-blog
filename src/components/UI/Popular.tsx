import { useState, useEffect } from "react";
import iContentfulResponse from "../../interfaces/iContentfulRes";
import Cloud from "./Cloud";
const CDN_KEY = import.meta.env.VITE_CDN_API_KEY;
const SPACE_ID = import.meta.env.VITE_SPACE_ID;

const Popular = () => {
  const [posts, setPosts] = useState<iContentfulResponse | null>(null);

  useEffect(() => {
    const getBlogPost = async () => {
      const tagId = "popular";
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${CDN_KEY}&content_type=blog&metadata.tags.sys.id[in]=${tagId}`,
      );
      const data = await response.json();
      setPosts(data);
    };

    getBlogPost();
  }, []);

  return (
    <div className={`mt-10 relative`}>
      {/* Decorative cloud for Popular component */}
      <Cloud variant={2} className="absolute -top-8 -left-8 lg:left-[5%] w-48 h-24 text-base-content opacity-5 z-0" />

      <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest px-2 relative z-10">
        POPULAR CONTENT
      </h2>
      {posts && (
        <ul className="ml-3 relative z-10">
          {posts.items.map((post) => (
            <li key={post.fields.id} className="mb-3">
              <a href={`/post?id=${post.sys.id}`}>{post.fields.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Popular;
