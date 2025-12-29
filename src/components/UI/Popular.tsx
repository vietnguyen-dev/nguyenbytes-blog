import { useState, useEffect } from "react";
import iContentfulResponse from "../../interfaces/iContentfulRes";
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
    <div className={`mt-10 sticky top-20`}>
      <h2 className="font-bold mb-4 text-gray-400 font-medium tracking-widest px-2">
        POPULAR CONTENT
      </h2>
      {posts && (
        <ul className="ml-3">
          {posts.items.map((post) => (
            <li key={post.fields.id}>
              <a>{post.fields.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Popular;
