# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, localhost:5173)
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Environment Variables

Required in `.env`:
- `VITE_SPACE_ID` — Contentful space ID
- `VITE_CDN_API_KEY` — Contentful CDN (delivery) API key
- `VITE_PREVIEW_API_KEY` — Contentful preview API key

## Architecture

Single-page app using React Router for client-side routing. All routes render inside a `Page` layout wrapper that provides the navbar, footer, and `ThemeProvider` context.

**Routing** (`src/main.tsx`):
- `/` → `src/App.tsx` — home/blog feed
- `/post?id=<contentfulEntryId>` → `src/components/pages/Post.tsx`
- `/projects` → `src/components/pages/Projects.tsx`
- `/about` → `src/components/pages/About.tsx`
- `/contact` → `src/components/pages/Contact.tsx`

`vercel.json` rewrites all paths to `index.html` for SPA routing on Vercel.

**Data fetching**: All Contentful API calls are plain `fetch()` calls inside `useEffect` hooks — no SDK methods are used. The CDN endpoint is `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`. Posts are filtered by `content_type=blog`; projects and popular posts are filtered by `metadata.tags.sys.id[in]=<tagId>`.

**Theme**: `ThemeProvider` (React Context) stores `"light"` or `"black"` in `localStorage` and sets `data-theme` on `<html>`. DaisyUI reads this attribute for theming. The custom `light` theme colors are defined in `tailwind.config.js`.

**Layout**: `src/components/UI/Page.tsx` wraps every page. It renders `ThemeProvider`, the sticky navbar (with a mobile dialog menu), page content, and footer. The navbar background appears only after scrolling past 50px.

**Styling**: Tailwind CSS + DaisyUI v4. Custom animations (`animate-slide-in-fade`, `animate-slide-in-right`, `animate-slide-in-bottom`) and link underline hover effects are defined in `src/index.css`.

**Images**: Stored in `src/img/` and imported directly into components. The `Contact` UI component switches between `thinkpad.jpeg` (light) and `macbook-bg-removed.png` (dark) based on theme.
