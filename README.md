# brandonnarito.com

My personal portfolio: projects, case studies, skills and contact, live at **[brandonnarito.com](https://brandonnarito.com)**.

## What's in it

- **Case studies** for [Tapt](https://brandonnarito.com/projects/tapt) (an offline-first NFC attendance system) and [Wholesale IMS](https://brandonnarito.com/projects/wholesale-ims) (an inventory and sales system for a wholesale store). Each covers the problem, constraints, key decisions, a diagram of how the system works, and screenshots. They're generated from one typed data file, `lib/case-studies.ts`, and statically rendered at build time.
- **A cursor-tracking pixel-art mascot** in the hero.
- **A typing test** overlay.
- **Light and dark themes**, and motion that respects reduced-motion settings.
- **SEO basics:** per-page metadata and canonical URLs, Person structured data (JSON-LD), a sitemap, and generated social preview images, including one per case study.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Vercel (hosting and analytics)

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Adding a case study

Add an entry to `CASE_STUDIES` in `lib/case-studies.ts`. The page at `/projects/<slug>`, its social preview image and its sitemap entry are generated from it. Screenshots go in `public/projects/<slug>/`; mark phone-sized ones `narrow: true` so they sit side by side.

---

By [Brandon Dylan Narito](https://brandonnarito.com) · [GitHub](https://github.com/brandonskie27-hub)
