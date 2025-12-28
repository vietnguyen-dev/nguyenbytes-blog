import { useState, useEffect } from "react";
import Page from "./components/UI/Page";
import Popular from "./components/UI/Popular";
import ContactForm from "./components/UI/Contact";

const CDN_KEY = import.meta.env.VITE_CDN_API_KEY;
const SPACE_ID = import.meta.env.VITE_SPACE_ID;

import iContentfulRes from "./interfaces/iContentfulRes";

function App() {
  const [posts, setPosts] = useState<iContentfulRes | null>(null);

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

  if (!posts) {
    return (
      <Page>
        <div>Loading...</div>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="text-2xl font-bold my-8 text-gray-500 tracking-widest">
        ARTICLES
      </h1>
      <main className="flex flex-col lg:flex-row ">
        <div className="flex flex-col mr-6">
          {posts.items.map((post) => (
            <div key={post.fields.id}>
              <h3 className="text-gray-500">{post.fields.title}</h3>
              <p>{post.fields.post}</p>
            </div>
          ))}
        </div>
        <Popular />
      </main>
      <ContactForm />
    </Page>
  );
}

export default App;
