import { useState, useEffect } from "react";
import githubLogo from "../../img/github-mark-white.svg";
import linkedinLOGO from "../../img/linkedin-app-white-icon.svg";
import HeaderImg from "./headerImg";

interface iPageProps {
  children: React.ReactNode;
}

const Page: React.FC<iPageProps> = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "winter", // Default to 'winter' theme
  );
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as "winter" | "night");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "winter" ? "night" : "winter"));
  };

  return (
    <>
      <div
        className={`navbar z-50 ${
          scrollY > 0
            ? "sticky bg-base-100 bg-opacity-75 shadow-xl"
            : "absolute"
        } top-0 md:px-36 lg:px-[20%] xl:px-[22%]`}
      >
        <div className="flex-1">
          <h1 className="font-bold text-lg lg:text-2xl">
            <a href="/">Nguyen Bytes</a>
          </h1>
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
        <nav className="hidden mr-6 z-99 md:block">
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
        <label className="swap swap-rotate">
          {/* Checkbox to control the state */}
          <input
            type="checkbox"
            checked={theme === "night"}
            onChange={toggleTheme}
          />
          {/* Sun icon for 'winter' theme */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* Moon icon for 'forest' theme */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <HeaderImg theme={theme} />
      <div className="px-2 md:px-36 lg:px-[20%] xl:px-[22%]">{children}</div>
      <footer className="footer bg-neutral text-neutral-content flex justify-between content-center px-6 py-4 md:px-12 lg:px-36 xl:px-[20%]">
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
        <nav className="flex justify-end">
          <a href="https://www.linkedin.com/in/vietnguyen-dev/">
            <img
              src={linkedinLOGO}
              alt="linkedin logo"
              className="w-2/12 ml-auto"
            />
          </a>
          <a href="https://github.com/vietnguyen-dev">
            <img src={githubLogo} alt="github logo" className="w-1/2" />
          </a>
        </nav>
      </footer>
    </>
  );
};

export default Page;
