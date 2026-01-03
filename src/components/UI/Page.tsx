import { useState, useEffect } from "react";
import githubLogo from "../../img/github-mark-white.svg";
import linkedinLOGO from "../../img/linkedin-app-white-icon.svg";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "./ThemeProvider";

interface iPageProps {
  children: React.ReactNode;
}

const Page: React.FC<iPageProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <div
        className={`navbar z-50 sticky bg-base-100 bg-opacity-75 top-0 ${scrollY > 50 && `shadow-xl`}`}
      >
        <div className="flex-1">
          <h3 className="font-bold text-2xl">
            <a href="/">Nguyen Bytes</a>
          </h3>
        </div>
        <div className="flex-none md:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => {
              if (document) {
                (
                  document.getElementById("nav-modal") as HTMLFormElement
                ).showModal();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
          <dialog id="nav-modal" className="modal top-[-30%]">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex flex-col text-right [&>*]:mt-3">
                <a href="/" className="mr-3">
                  Blog
                </a>
                <a href="/projects" className="mr-3">
                  Projects
                </a>
                <a href="/about" className="mr-3">
                  About
                </a>
                <a href="/contact" className="mr-3">
                  Contact
                </a>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <nav className="hidden z-99 md:block">
          <a href="/" className="mr-3">
            Blog
          </a>
          <a href="/projects" className="mr-3">
            Projects
          </a>
          <a href="/about" className="mr-3">
            About
          </a>
          <a href="/contact" className="mr-3">
            Contact
          </a>
        </nav>
        <ThemeToggle />
      </div>
      <div className="mx-6 mt-6">{children}</div>
      <footer className="footer bg-neutral text-neutral-content flex justify-between content-center p-6">
        <div className="md:flex md:flex-row">
          <a href="/" className="mr-3">
            Blog
          </a>
          <a href="/projects" className="mr-3">
            Projects
          </a>
          <a href="/about" className="mr-3">
            About
          </a>
          <a href="/contact" className="mr-3">
            Contact
          </a>
        </div>
        <nav className="flex flex-col items-end">
          <a href="https://www.linkedin.com/in/vietnguyen-dev/">
            <img
              src={linkedinLOGO}
              alt="linkedin logo"
              className="w-2/12 ml-auto"
            />
          </a>
          <a href="https://github.com/vietnguyen-dev">
            <img src={githubLogo} alt="github logo" className="w-1/2 ml-auto" />
          </a>
        </nav>
      </footer>
    </ThemeProvider>
  );
};

export default Page;
