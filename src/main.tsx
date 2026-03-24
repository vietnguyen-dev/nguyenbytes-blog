import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import Contact from "./components/pages/Contact.tsx";
import Post from "./components/pages/Post.tsx";
import About from "./components/pages/About.tsx";
import Projects from "./components/pages/Projects.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
