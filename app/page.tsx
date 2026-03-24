"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Page from "@/src/components/UI/Page";
import Popular from "@/src/components/UI/Popular";
import ContactForm from "@/src/components/UI/Contact";
import Search from "@/src/components/UI/Search";
import Cloud from "@/src/components/UI/Cloud";
import iContentfulRes from "@/src/interfaces/iContentfulRes";

const CDN_KEY = process.env.NEXT_PUBLIC_CDN_API_KEY;
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;

export default function Home() {
  const [posts, setPosts] = useState<iContentfulRes | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getBlogPost = async () => {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${CDN_KEY}&content_type=blog`,
      );
      const data = await response.json();
      setPosts(data);
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
    router.push(`/post?id=${id}`);
  };

  const filteredPosts = posts.items.filter(
    (post) =>
      post.fields.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.fields.post.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Page>
      <section className="my-12 py-8 relative">
        <Cloud
          variant={2}
          className="absolute -top-12 left-[2%] lg:left-[27%] w-96 h-48 text-base-content opacity-5 z-0"
        />
        <h1 className="text-2xl font-bold text-center mb-3 relative z-10 animate-slide-in-fade">
          Hello, I&apos;m Viet Nguyen.
          <br />
          Welcome to my Developer Blog!
        </h1>
        <h2 className="text-center relative z-10 animate-slide-in-right">
          I talk about what I am working on currently and trends in software
          development!
        </h2>
        <div className="flex gap-4 justify-center mt-6 relative z-10 animate-slide-in-bottom">
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
        <Cloud
          variant={3}
          className="hidden lg:block absolute -top-4 right-[2%] lg:right-[12%] w-56 h-28 text-base-content opacity-5 z-0"
        />
      </section>
      <div className="relative">
        <Cloud
          variant={4}
          className="absolute -top-16 -left-12 lg:left-[12%] w-60 h-30 text-base-content opacity-5 z-0"
        />
        <Search onSearch={setSearchTerm} />
      </div>
      <h2 className="text-2xl font-bold text-gray-500 tracking-widest mb-6">
        ARTICLES
      </h2>
      <main className="flex flex-col lg:flex-row lg:gap-8 relative">
        <div className="flex flex-col lg:w-3/4 lg:max-w-2xl relative z-10">
          {filteredPosts.map((post) => (
            <div
              key={post.fields.id}
              className="card bg-base-100 shadow-xl p-6 mb-6"
            >
              <h3 className="mb-3">
                <a
                  href={`/post?id=${post.sys.id}`}
                  className="text-gray-500 text-xl font-bold"
                >
                  {post.fields.title}
                </a>
              </h3>
              <p className="mb-3 line-clamp-3 mb-3">{post.fields.post}</p>
              <button
                className="btn btn-primary mx-auto lg:ml-auto lg:mr-0"
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
