<p align="center">
  <img src="public/brand/logo-640.webp" width="200" alt="Delux Financial Solutions" />
</p>

<h1 align="center">Delux Financial Solutions</h1>

<p align="center">
  <b>Credit education, credit building, and financial guidance in Houston, TX.</b>
</p>
<p align="center">
  The website for Delux L Avello LLC — a React site built with Vite and prerendered to static pages.<br />
  Live at <a href="https://deluxlavello.com">deluxlavello.com</a>.
</p>
<p align="center">
  <sub>Published for reading. Proprietary — see <a href="LICENSE.md">LICENSE.md</a>. Outside contributions are not accepted.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.40.1-B89A63?style=for-the-badge" alt="Version 2026.40.1" />
  <img src="https://img.shields.io/badge/React-19-B89A63?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-B89A63?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/Vite-7-B89A63?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Vercel-B89A63?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<br />

## Why it is built this way

A credit practice is found through search and read on a phone, often on a slow connection. The site is written in React on the same stack as the other TaylorURL sites, and the build renders every route into its own HTML document with its own head, so the page is on screen before any script runs. Spanish is served from the same pages as English rather than from a second set of them.

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3 align="center">Pages, not a shell</h3>
      <p align="center">Fourteen routes plus a 404, each prerendered with its own title, description and canonical, and JSON-LD on every page meant to be indexed. The bundle adopts the page it is served with rather than drawing it again, so a crawler and a reader get the same document.</p>
    </td>
    <td width="50%" valign="top">
      <h3 align="center">Two languages, one page</h3>
      <p align="center">Spanish is a lookup keyed on the English string. No page carries translation markup, switching languages fetches nothing, and the URL stays where it was.</p>
    </td>
  </tr>
</table>

<br />

## Stack

| Layer     | Technology                                                               |
| :-------- | :----------------------------------------------------------------------- |
| Framework | React 19, React Router 7                                                 |
| Build     | Vite 7, with a server build that prerenders every route                  |
| Styling   | Tailwind CSS 3, with the theme tokens and components in `src/index.css`  |
| Type      | Source Serif 4 and Source Sans 3, self-hosted as one variable file each  |
| Marks     | One SVG sprite, `src/app/assets/sprite.svg`                              |
| Rail      | `@taylorurl/split-rail`, the attribution bar every TaylorURL site shares |
| Tests     | `jsdom` — the built pages are adopted by the app and asserted            |
| Tooling   | ESLint 10, Prettier 3                                                    |
| Hosting   | Vercel                                                                   |

## Getting started

```bash
npm install
npm run dev           # Vite dev server
npm run build         # builds the app, then prerenders every route into dist/
```

Node 22 is what the project builds on. Nothing needs configuring to run locally: there is no API key and no service to sign in to — the pages are static, and the only network call the site makes is the error report in the head of `index.html`. `api/version.js` is the one thing served that is not a file on disk. It reads `VERCEL_GIT_COMMIT_SHA`, which Vercel sets on every build; a local run without it answers `dev`.

### Scripts

| Script                 | Does                                                                      |
| :--------------------- | :------------------------------------------------------------------------ |
| `npm run dev`          | Start the Vite dev server.                                                |
| `npm run build`        | Build the app and prerender every route into `dist/`.                     |
| `npm run preview`      | Serve the built site.                                                     |
| `npm run lint`         | Lint with ESLint.                                                         |
| `npm run format`       | Format with Prettier.                                                     |
| `npm run format:check` | Check formatting without writing.                                         |
| `npm test`             | Build, then adopt the built pages in a DOM and assert what a reader sees. |
| `npm run i18n`         | Build, then report the English strings `i18n/es.json` still owes.         |

## How it works

- **Every route is a finished document.** `npm run build` builds the browser bundle, then a server build of the same app, and [scripts/prerender.js](scripts/prerender.js) renders each route in [src/app/routeTable.js](src/app/routeTable.js) into `dist/<route>/index.html` with the head from [src/app/constants/meta.js](src/app/constants/meta.js) and the JSON-LD from `structuredData.js`. The bundle is asked for one frame after the first paint and adopts the markup it finds rather than drawing it again. Moving between pages after that happens in the browser, and each page is its own chunk.
- **Page layout is Tailwind; the parts are components.** A page lays itself out with utilities. The theme tokens, the element base and the components the chrome and the content blocks share (`btn`, `panel`, `index`, `mega-panel` and the rest) live in [src/index.css](src/index.css), and [tailwind.config.js](tailwind.config.js) maps the colours, faces and sizes onto the same tokens, so a utility follows the theme too. Preflight is off, because the element base is the site's own.
- **Styles are a semantic layer over brand primitives.** The navy ramp, the cool neutrals and the gold ramp at the top of `src/index.css` are aliased into names like `--surface`, `--action` and `--accent-ink`, and that layer is redefined for the light, dark and slate themes. A component reads the semantic name, so a theme is one block of overrides.
- **The geometry is square.** The radius tokens are zero, and a block is separated by its ground and the rule around it rather than by a card.
- **Navy bands frame every page.** The utility strip, each page's opening (`.hero.band`), the closing call to action and the footer sit on navy in every theme. A band restates the semantic tokens, so a button or a card inside one takes gold and white without a class of its own. The sections between the bands alternate grounds.
- **One sprite carries every mark.** [src/app/assets/sprite.svg](src/app/assets/sprite.svg) holds sixteen of them: eight drawn on a 24-unit grid for the interface and eight on a 64-unit grid for the spot art. Every base shape is `currentColor` and every emphasis is `var(--accent)`, so a mark takes the ink and the accent of whichever theme it lands in.
- **Theme and language resolve before the first paint.** An inline script in the head of [index.html](index.html) reads the stored choice, so neither arrives as a flash of the other. `data-theme` on the root is the resolved value and `data-theme-choice` is the preference behind it, which is `light` until someone picks otherwise. The footer pickers write both through [src/app/context/PreferencesContext.jsx](src/app/context/PreferencesContext.jsx).
- **Browser errors are reported.** The same head posts uncaught errors, rejections, failed resource loads and 5xx responses to the error collector, capped at ten per page view.

## Language

Pages are written and served in English. Spanish rides along as a lookup keyed on the English string itself, so no page carries translation markup and a phrase written once is translated once. [i18n/es.json](i18n/es.json) is the whole dictionary. The prerender inlines the entries a page contains, so the first switch fetches nothing, and a reader who has chosen Spanish loads the rest once, for the pages after it.

At runtime [src/app/lib/translate.js](src/app/lib/translate.js), driven by `hooks/useTranslation.js`, walks the text the page already holds and swaps it in place, remembering the English each piece started as, so switching back restores it and the URL stays where it was. `npm run i18n` lists what is missing and what has gone stale, and `npm test` fails if a heading is left in English.

## Project structure

```
deluxlavello-com/
├── index.html                 The document every route is written into, with the head
│                              script that resolves the theme and reports errors
├── src/
│   ├── main.jsx               Browser entry: adopts a prerendered page, or draws one
│   ├── entry-server.jsx       Server entry the prerender renders each route with
│   ├── index.css              Tailwind, the theme tokens, the element base and the components
│   └── app/
│       ├── App.jsx            The chrome around every page, and the routes
│       ├── routeTable.js      Every route and the view it loads
│       ├── views/             One component per route
│       ├── components/
│       │   ├── layout/        The header, footer, utility strip and thumb bar
│       │   ├── sections/      The content blocks two views share
│       │   └── ui/            Pickers, icons, links and images
│       ├── context/           The theme and language preferences
│       ├── hooks/             Translation, the current link, and what a page change does
│       ├── constants/         Page heads, structured data, and the practice's details
│       ├── lib/               Plain helpers: the translator, paths and the firm's year
│       └── assets/sprite.svg  Every mark on the site
├── i18n/es.json               The Spanish dictionary
├── scripts/
│   ├── prerender.js           Writes every route into its own document
│   ├── i18n-strings.py        What the dictionary still owes
│   ├── check-behaviour.mjs    The DOM assertions npm test runs
│   └── behaviour/client.jsx   The app entry those assertions adopt pages with
├── public/                    Served at the web root — favicon.svg, apple-touch-icon.png,
│                              site.webmanifest, og-card.png (1200x630), robots.txt,
│                              sitemap.xml, llms.txt, /fonts/, /brand/, /photos/
├── api/version.js             The commit the running deployment was built from, at /api/version
├── tailwind.config.js         The theme tokens as Tailwind colours, faces and sizes
├── vite.config.js             Aliases, the build version, and the browser chrome colour
└── vercel.json                Security headers, and caching for the hashed assets, the fonts and the brand files
```

A new page is a component in `src/app/views/`, a line in `src/app/routeTable.js`, and its head in `src/app/constants/meta.js`.

## License

Copyright (c) 2026 TaylorURL LLC. All rights reserved.

<br />

<p align="center">
  <sub>Credit education, credit building, and financial guidance in Houston, TX.</sub>
</p>
