import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Page from "./components/UI/Page";
import Popular from "./components/UI/Popular";
import ContactForm from "./components/UI/Contact";
import Search from "./components/UI/Search";
import Cloud from "./components/UI/Cloud";

const CDN_KEY = import.meta.env.VITE_CDN_API_KEY;
const SPACE_ID = import.meta.env.VITE_SPACE_ID;

import iContentfulRes from "./interfaces/iContentfulRes";

function App() {
  const [posts, setPosts] = useState<iContentfulRes | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
        <span className="loading loading-spinner loading-xl"></span>
      </Page>
    );
  }

  const goToPost = (id: string) => {
    navigate(`/post?id=${id}`);
  };

  const filteredPosts = posts.items.filter(
    (post) =>
      post.fields.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.fields.post.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Page>
      <section className="my-12 py-8 relative">
        {/* Cloud behind Hello, Welcome to my Developer Blog! */}
        <Cloud variant={2} className="absolute -top-12 left-[2%] lg:left-[27%] w-96 h-48 text-base-content opacity-5 z-0" />
        <h1 className="text-2xl font-bold text-center mb-3 relative z-10">
          Hello, I'm Viet Nguyen.<br />Welcome to my Developer Blog!
        </h1>
        <p className="text-center relative z-10">
          I talk about what I am working on currently and trends in software
          development!
        </p>
        <div className="flex gap-4 justify-center mt-6 relative z-10">
          <a href="/contact" className="btn btn-primary">
            CONTACT ME
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            VIEW MY RESUME
          </a>
        </div>
        {/* Decorative cloud on right */}
        <Cloud variant={3} className="hidden lg:block absolute -top-4 right-[2%] lg:right-[12%] w-56 h-28 text-base-content opacity-5 z-0" />
      </section>
      <div className="relative">
        <Cloud variant={4} className="absolute -top-16 -left-12 lg:left-[12%] w-60 h-30 text-base-content opacity-5 z-0" />
        <Search onSearch={setSearchTerm} />
      </div>
      <h2 className="text-2xl font-bold text-gray-500 tracking-widest mb-6">
        ARTICLES
      </h2>
      <main className="flex flex-col lg:flex-row lg:gap-8 relative">
        <div className="flex flex-col lg:w-3/4 lg:max-w-2xl relative z-10">
          {filteredPosts.map((post) => (
            <div key={post.fields.id} className="card bg-base-100 shadow-xl p-6 mb-6">
              <h3 className="text-gray-500 text-xl font-bold mb-3">
                {post.fields.title}
              </h3>
              <p className="mb-3 line-clamp-3 mb-3">{post.fields.post}</p>
              <button
                className="btn btn-primary ml-auto"
                onClick={() => goToPost(post.sys.id)}
              >
                READ MORE
              </button>
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
