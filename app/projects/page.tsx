"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Page from "@/src/components/UI/Page";
import Popular from "@/src/components/UI/Popular";
import ContactForm from "@/src/components/UI/Contact";
import Cloud from "@/src/components/UI/Cloud";
import iContentfulResponse from "@/src/interfaces/iContentfulRes";

const CDN_KEY = process.env.NEXT_PUBLIC_CDN_API_KEY;
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<iContentfulResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProjects = async () => {
      const tagId = "projects";
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${CDN_KEY}&content_type=blog&metadata.tags.sys.id[in]=${tagId}`,
      );
      const data = await response.json();
      setProjects(data);
    };

    getProjects();
  }, []);

  const goToPost = (id: string) => {
    router.push(`/post?id=${id}`);
  };

  return (
    <Page>
      <div className="relative">
        <Cloud
          variant={1}
          className="absolute -top-4 left-1/4 -translate-x-1/2 md:left-0 md:translate-x-0 w-48 h-24 text-base-content opacity-5 z-0"
        />
        <h2 className="text-center font-bold text-xl my-8 text-gray-500 md:text-left relative z-10">
          PROJECTS
        </h2>
      </div>
      <main className="grid place-items-center grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {projects ? (
          projects.items.map((project) => (
            <div
              key={project.fields.id}
              className="card bg-base-100 shadow-xl p-6 w-full"
            >
              <h3 className="mb-3">
                <a
                  href={`/post?id=${project.sys.id}`}
                  className="text-gray-500 text-xl font-bold"
                >
                  {project.fields.title}
                </a>
              </h3>
              <p className="mb-3 line-clamp-3">{project.fields.post}</p>
              <button
                className="btn btn-primary mx-auto lg:ml-auto lg:mr-0"
                onClick={() => goToPost(project.sys.id)}
              >
                READ MORE
              </button>
            </div>
          ))
        ) : (
          <span className="loading loading-spinner loading-xl"></span>
        )}
      </main>
      <Popular />
      <ContactForm />
    </Page>
  );
}
