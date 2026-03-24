"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Page from "@/src/components/UI/Page";
import Popular from "@/src/components/UI/Popular";
import ContactForm from "@/src/components/UI/Contact";
import iContentfulPostRes from "@/src/interfaces/iContentfulPostRes";

const CDN_KEY = process.env.NEXT_PUBLIC_CDN_API_KEY;
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;

function PostContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState<iContentfulPostRes | null>(null);

  useEffect(() => {
    const getBlogPost = async () => {
      if (!id) return;

      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries/${id}?access_token=${CDN_KEY}`,
      );
      const data = await response.json();
      setPost(data);
    };

    getBlogPost();
  }, [id]);

  return (
    <Page>
      <main className="lg:w-3/5 lg:mx-auto lg:px-8">
        {post ? (
          <div>
            <h1 className="text-3xl font-bold mt-6 mb-2">
              {post.fields.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(post.sys.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="whitespace-pre-line">{post.fields.post}</p>
          </div>
        ) : (
          <span className="loading loading-spinner loading-xl"></span>
        )}
        <Popular />
        <ContactForm />
      </main>
    </Page>
  );
}

export default function PostPage() {
  return (
    <Suspense
      fallback={
        <Page>
          <span className="loading loading-spinner loading-xl"></span>
        </Page>
      }
    >
      <PostContent />
    </Suspense>
  );
}
