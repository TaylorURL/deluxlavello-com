<p align="center"><img src="public/og-card.png" width="520" alt="Delux Financial Solutions"></p>
<h1 align="center">Delux Financial Solutions</h1>
<p align="center">Website for a credit education practice in Houston, Texas, in English and Spanish.</p>
<p align="center"><a href="https://deluxlavello.com">deluxlavello.com</a></p>
<p align="center">
  <img src="https://img.shields.io/badge/version-2026.44.1-B89A63?style=for-the-badge" alt="Version 2026.44.1" />
</p>

Delux Financial Solutions (Delux L Avello LLC) teaches people how credit works and helps them build or rebuild it. Darian Avello, The Credit Coach, is the educator behind it. The site explains the services and the process, and sends visitors to book a free first consultation.

<details>
<summary>What's on the site</summary>

- A page for each service: credit building, credit growth, the two combined, and debt lawsuit response support
- A credit education page on reports, scores, utilization, payment history and common mistakes
- How the process works, from the first consultation on
- A partners page for referral partners in auto sales, real estate and mortgage
- Every page in English and Spanish, with a switch in the footer that swaps the language in place
- Light, dark and slate themes
- A "Schedule a Consultation" button in the header, and on phones a bar along the bottom with that button and "Call"

</details>

<details>
<summary>Running it locally</summary>

You need Node 22.

```bash
npm install
npm run dev
npm run build   # builds the site and prerenders every page into dist/
npm test        # builds, then checks the built pages in a test DOM
```

Nothing needs configuring locally. The only variable in `.env.example` is `VERCEL_GIT_COMMIT_SHA`, which Vercel sets on each build.

Adding a page means a component in `src/app/views/`, a line in `src/app/routeTable.js` and its title and description in `src/app/constants/meta.js`. Spanish text lives in `i18n/es.json`, keyed on the English, and `npm run i18n` (needs Python 3) lists what's missing.

</details>

## Built with

React 19, React Router 7, Vite 7 and Tailwind CSS 3. Hosted on Vercel.

<details>
<summary>License</summary>

Proprietary. Copyright (c) 2026 TaylorURL LLC, all rights reserved. See [LICENSE.md](LICENSE.md).

</details>

Built and maintained by [TaylorURL](https://www.taylorurl.com).
