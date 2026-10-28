<img src="public/og-card.png" width="520" alt="Delux Financial Solutions">

# Delux Financial Solutions

Website for a credit education practice in Houston, Texas, in English and Spanish.

[deluxlavello.com](https://deluxlavello.com)

<img src="https://img.shields.io/badge/version-2026.44.3-B89A63?style=for-the-badge" alt="Version 2026.44.3" />

Explains the services and the process, then sends people to book a free first consultation. React, prerendered per route.

## How the Spanish works

Pages are written once, in English. `i18n/es.json` maps each English string to its Spanish, and `src/app/lib/translate.js` walks the text nodes plus the `aria-label`, `alt` and `title` attributes and swaps them in place. There's no translation markup in the components, and a phrase used on several pages is translated once.

The catch is that React keeps writing to the nodes it owns. Each node remembers the English it was given and what's currently shown. If it holds neither, React rewrote it, and that text is the new English. A `MutationObserver` batches changes into one pass per microtask, and a pass with nothing to change writes nothing, which is what keeps it from looping.

I'd rather pay for a pass over the text on each change than thread a translation hook through every view.

Language and theme (light, dark, slate, system) are saved in `localStorage` and applied by a head script before first paint. `PreferencesContext` starts from the served defaults so hydration matches, then picks up the saved values.

## Adding a page

1. A component in `src/app/views/`.
2. A line in `src/app/routeTable.js`.
3. Its title and description in `src/app/constants/meta.js`.
4. Its Spanish in `i18n/es.json`. `npm run i18n` builds the site and lists every visible string that still has none.

`scripts/prerender.js` writes each route to its own document, with its meta, structured data and the Spanish strings that page uses.

## Running it

```bash
npm install
npm run dev
npm run build
npm test        # builds, loads each page into jsdom, mounts the app and checks what a reader sees
```

Node 22, nothing to configure. `npm run i18n` needs Python 3.

A failed image gets one more try a moment later. That rule sits in the head script rather than the bundle, because the first images load before the bundle exists.

React 19, React Router 7, Vite 7, Tailwind CSS 3, on Vercel. Proprietary, see [LICENSE.md](LICENSE.md).

Built and maintained by [TaylorURL](https://www.taylorurl.com).
