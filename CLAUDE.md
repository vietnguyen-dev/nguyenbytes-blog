# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js, localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint (next lint)
```

## Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_SPACE_ID` — Contentful space ID
- `NEXT_PUBLIC_CDN_API_KEY` — Contentful CDN (delivery) API key
- `NEXT_PUBLIC_PREVIEW_API_KEY` — Contentful preview API key

## Architecture

Next.js 15 App Router. All pages are client components (`"use client"`) because they use hooks, state, and localStorage. Each page renders inside the `Page` layout component from `src/components/UI/Page.tsx`, which provides the navbar, footer, and `ThemeProvider` context.

**Routing** (`app/` directory):
- `app/page.tsx` — home/blog feed
- `app/post/page.tsx` — post detail, reads `?id=<contentfulEntryId>` query param (wrapped in `<Suspense>` for `useSearchParams`)
- `app/projects/page.tsx` — projects grid
- `app/about/page.tsx` — re-exports `src/components/pages/About`
- `app/contact/page.tsx` — re-exports `src/components/pages/Contact`
- `app/layout.tsx` — root HTML shell with Next.js `Metadata` export

**Data fetching**: All Contentful API calls are plain `fetch()` inside `useEffect` hooks — no SDK methods. CDN endpoint: `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`. Posts use `content_type=blog`; projects and popular posts filter by `metadata.tags.sys.id[in]=<tagId>`.

**Theme**: `ThemeProvider` (React Context) stores `"light"` or `"black"` in localStorage and sets `data-theme` on `<html>`. Reads localStorage with a `typeof window === "undefined"` guard for SSR safety. DaisyUI reads `data-theme` for theming. Custom `light` theme colors defined in `tailwind.config.js`.

**Layout**: `src/components/UI/Page.tsx` wraps every page. It renders `ThemeProvider`, sticky navbar (with mobile dialog menu), page content, and footer. Navbar background appears only after scrolling past 50px. Uses `<Link>` from `next/link` for internal navigation.

**Styling**: Tailwind CSS + DaisyUI v4. Custom animations (`animate-slide-in-fade`, `animate-slide-in-right`, `animate-slide-in-bottom`) and link underline hover effects are defined in `app/globals.css`.

**Images**: Static files in `public/img/`. Referenced as string paths (`"/img/filename.ext"`), not imported as modules.
