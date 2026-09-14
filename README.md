<p align="center">
  <img src="public/brand/logo-640.webp" width="200" alt="Delux Financial Solutions" />
</p>

<h1 align="center">Delux Financial Solutions</h1>

<p align="center">
  <b>Credit education, credit building, and financial guidance in Houston, TX.</b>
</p>
<p align="center">
  The website for Delux L Avello LLC — a static multi-page site built with Vite.<br />
  Live at <a href="https://deluxlavello.com">deluxlavello.com</a>.
</p>
<p align="center">
  <sub>Published for reading. Proprietary — see <a href="LICENSE.md">LICENSE.md</a>. Outside contributions are not accepted.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.38.0-B89A63?style=for-the-badge" alt="Version 2026.38.0" />
  <img src="https://img.shields.io/badge/Vite-7-B89A63?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/JavaScript-B89A63?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vercel-B89A63?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<br />

## Why it is built this way

A credit practice is found through search and read on a phone, often on a slow connection. Every page here is real HTML on disk with its own head, and the whole site ships one stylesheet and one script with no runtime dependencies. Spanish is served from the same pages as English rather than from a second set of them.

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3 align="center">Pages, not a shell</h3>
      <p align="center">Fourteen routes as <code>index.html</code> files plus a top-level 404, each with its own title and description, and JSON-LD on every page meant to be indexed. Shared blocks are inlined at build time, so a crawler and a reader get the same document.</p>
    </td>
    <td width="50%" valign="top">
      <h3 align="center">Two languages, one page</h3>
      <p align="center">Spanish is a lookup keyed on the English string. No page carries translation markup, switching languages fetches nothing, and the URL stays where it was.</p>
    </td>
  </tr>
</table>

<br />

## Stack

| Layer     | Technology                                                              |
| :-------- | :---------------------------------------------------------------------- |
| Pages     | Hand-written HTML, one `index.html` per route                           |
| Build     | Vite 7 in MPA mode, with partial-inlining and translation plugins       |
| Styling   | One stylesheet, `src/site.css`, on the tokens in `brand/tokens.css`     |
| Behaviour | One browser script, `src/site.js` — no framework, no runtime dependency |
| Type      | Source Serif 4 and Source Sans 3, self-hosted as one variable file each |
| Marks     | One SVG sprite, `partials/icons.html`                                   |
| Tests     | `jsdom` — the built pages are loaded and asserted                       |
| Tooling   | ESLint 10, Prettier 3                                                   |
| Hosting   | Vercel                                                                  |

## Getting started

```bash
npm install
npm run dev           # Vite dev server
npm run build         # writes every route into dist/
```

Node 22 is what the project builds on. Nothing needs configuring to run locally: there is no API key and no service to sign in to — the pages are static, and the only network call the site makes is the error report in `partials/headcommon.html`. `api/version.js` is the one thing served that is not a file on disk. It reads `VERCEL_GIT_COMMIT_SHA`, which Vercel sets on every build; a local run without it answers `dev`.

### Scripts

| Script                 | Does                                                                             |
| :--------------------- | :------------------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server.                                                       |
| `npm run build`        | Build every route into `dist/`.                                                  |
| `npm run preview`      | Serve the built site.                                                            |
| `npm test`             | Build, then load the built pages in a DOM and assert what a reader sees.         |
| `npm run lint`         | Lint with ESLint.                                                                |
| `npm run format`       | Format with Prettier.                                                            |
| `npm run format:check` | Check formatting without writing.                                                |
| `npm run i18n`         | Report the English strings `i18n/es.json` still owes, and which have gone stale. |

## How it works

- **A page includes a shared block by writing its marker.** `<!--header-->` pulls in `partials/header.html`, and the plugin in [vite.config.js](vite.config.js) inlines it at build time, repeating until no markers are left so a partial can carry one of its own. `<!--year-->` and `<!--version-->` are not files: they resolve to the build year and the version in `package.json`.
- **Styles are a semantic layer over brand primitives.** [src/site.css](src/site.css) aliases the gold ramp and the neutrals in [brand/tokens.css](brand/tokens.css) into names like `--surface` and `--accent-ink`, then redefines that layer for the dark, light, and slate themes. A component reads the semantic name, so a theme is one block of overrides.
- **The geometry is square.** The radius tokens are zero, and a block is separated by its ground and the rule around it rather than by a card. `--surface` and `--surface-raised` follow from each theme's own raised ground, so a card is never described per theme.
- **Glass is spent where a reader looks through it.** The bar and the menu panel take a backdrop filter; `.ambient` is the fixed field of light that gives the blur something to sample, which is why `body` paints no background of its own. Where the blur cannot run, and for a reader who asks for less transparency, one block of token overrides puts both back to opaque.
- **One sprite carries every mark.** [partials/icons.html](partials/icons.html) holds sixteen of them: eight drawn on a 24-unit grid for the interface and eight on a 64-unit grid for the spot art. Every base shape is `currentColor` and every emphasis is `var(--accent)`, so a mark takes the ink and the accent of whichever theme it lands in.
- **Theme and language resolve before the first paint.** An inline script in `partials/headcommon.html` reads the stored choice, so neither arrives as a flash of the other. `data-theme` on the root is the resolved value and `data-theme-choice` is the preference behind it, which is `dark` until someone picks otherwise.
- **Browser errors are reported.** The same head script posts uncaught errors, rejections, failed resource loads, and 5xx responses to the error collector, capped at ten per page view.

## Language

Pages are written and served in English. Spanish rides along as a lookup keyed on the English string itself, so no page carries translation markup and a phrase written once is translated once. [i18n/es.json](i18n/es.json) is the whole dictionary, and the build inlines only the entries a given page contains.

At runtime the picker walks the text the page already holds, which is why switching languages fetches nothing and keeps the URL. `scripts/i18n-strings.py` lists what is missing and what has gone stale, and `npm test` fails if a heading is left in English.

## Project structure

```
deluxlavello-com/
├── index.html                 Home, and the page every other route is modelled on
├── 404.html                   Not-found page
├── about/  contact/  disclaimer/  education/  how-it-works/  partners/  privacy/  terms/
├── services/                  Services index, plus a page each for credit-building/,
│                              credit-growth/, credit-building-and-growth/, and
│                              debt-lawsuit-response/
├── partials/                  Shared header, footer, common head tags, icon sprite, and the
│                              credit figures and coach portrait two pages each reuse
├── brand/tokens.css           The gold ramp and the neutrals, sampled from the monogram
├── src/
│   ├── site.css               The whole stylesheet
│   └── site.js                The whole browser script
├── i18n/es.json               The Spanish dictionary
├── scripts/
│   ├── i18n-strings.py        What the dictionary still owes
│   └── check-behaviour.mjs    The DOM assertions npm test runs
├── public/                    Served at the web root — favicon.svg, apple-touch-icon.png,
│                              site.webmanifest, og-card.png (1200x630), robots.txt,
│                              sitemap.xml, llms.txt, /fonts/, /brand/, /photos/
├── api/version.js             The commit the running deployment was built from, at /api/version
├── vite.config.js             MPA config, the two build plugins, and the route table
└── vercel.json                Security headers, and caching for the hashed assets, the fonts and the brand files
```

Every route in the build is listed in `rollupOptions.input`, so a new page is a directory, an `index.html`, and one line there.

## License

Copyright (c) 2026 TaylorURL LLC. All rights reserved.

<br />

<p align="center">
  <sub>Credit education, credit building, and financial guidance in Houston, TX.</sub>
</p>
