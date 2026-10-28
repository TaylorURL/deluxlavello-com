<img src="public/og-card.png" width="520" alt="Delux Financial Solutions">

# Delux Financial Solutions

Website for a credit education practice in Houston, Texas, in English and Spanish.

[deluxlavello.com](https://deluxlavello.com)

<img src="https://img.shields.io/badge/version-2026.44.1-B89A63?style=for-the-badge" alt="Version 2026.44.1" />

Explains the services and the process, then sends people to book a free first consultation. React, prerendered per route. Spanish is swapped in place in the browser.

## How it's built

- **Prerendered.** `npm run build` does a client build, an SSR build, then `scripts/prerender.js` writes each route in `src/app/routeTable.js` to its own document with its meta, structured data and the Spanish strings that page uses. The app hydrates over it.
- **Spanish is a lookup.** Pages are written once, in English. `i18n/es.json` maps each English string to its Spanish. No translation markup in components, and a phrase is translated once wherever it shows up. `src/app/lib/translate.js` walks the text nodes and the `aria-label`, `alt` and `title` attributes and swaps them.
- **Keeping up with React.** React keeps writing to the nodes it owns. Each node remembers the English it got and what's shown for it. If it holds neither, React rewrote it, and that's the new English. A `MutationObserver` batches changes into one pass per microtask. A pass with nothing to change writes nothing, so it settles instead of looping.
- **Preferences.** Language and theme (light, dark, slate, system) live in `localStorage`. A head script applies them before first paint. `PreferencesContext` starts from the served defaults so hydration matches, then picks up the saved values.

<details>
<summary>Decisions and tradeoffs</summary>

- Translating the DOM instead of the component tree keeps the views plain. The cost is a pass over the text on every change, and the no-op pass keeps that cheap.
- A failed image gets one more request a moment later (`src/app/lib/retryImage.js`). The rule lives in the head script, not the bundle, because the first images load before the bundle exists.
- React's image preloads are stripped from the prerendered body. There they're just a second request for the same file.
- Targets `es2022`, no module preload polyfill.
- `npm test` builds the site, loads each page into jsdom, mounts the app over it, and checks what a reader would see (`scripts/check-behaviour.mjs`).
- `npm run i18n` reads the built pages and lists every visible string with no Spanish yet.
- `middleware.js` checks a TaylorURL status endpoint and shows a holding page if the site is paused. Fails open. `api/version.js` returns the deployed commit, uncached.
- The bottom footer bar is [`@taylorurl/split-rail`](https://github.com/TaylorURL/split-rail), pinned to a tag.

</details>

## Running it locally

Needs Node 22.

```bash
npm install
npm run dev
npm run build   # client build, SSR build, then prerender into dist/
npm test        # build, then check the built pages in jsdom
npm run i18n    # build, then list strings missing from i18n/es.json (Python 3)
```

Nothing needs configuring locally. The only variable in `.env.example` is `VERCEL_GIT_COMMIT_SHA`, which Vercel sets on each build.

<details>
<summary>Adding a page</summary>

1. A component in `src/app/views/`.
2. A line in `src/app/routeTable.js`.
3. Its title and description in `src/app/constants/meta.js`.
4. Its Spanish in `i18n/es.json`, keyed on the English. `npm run i18n` shows what is missing.

</details>

## Built with

React 19, React Router 7, Vite 7 and Tailwind CSS 3. Hosted on Vercel.

<details>
<summary>License</summary>

Proprietary. Copyright (c) 2026 TaylorURL LLC, all rights reserved. See [LICENSE.md](LICENSE.md).

</details>

Built and maintained by [TaylorURL](https://www.taylorurl.com).
