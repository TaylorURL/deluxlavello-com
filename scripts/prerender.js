// Writes every route into its own document after the build, so a crawler and a
// reader are served the page itself rather than an empty shell.
//
//     node scripts/prerender.js      (npm run build runs it)

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const shell = readFileSync(join(DIST, 'index.html'), 'utf8');
const entry = pathToFileURL(join(process.cwd(), 'node_modules/.delux-ssr/entry-server.js')).href;
const { render, prepare, META, NOT_FOUND, ORIGIN, STRUCTURED_DATA, firmYear } = await import(entry);
await prepare();

const dictionary = JSON.parse(readFileSync('i18n/es.json', 'utf8'));
const year = firmYear();

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// JSON inside a script element ends at the first </script, wherever it sits.
const scriptJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const NAMED = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
  copy: '\u00a9',
  middot: '\u00b7',
};
const decode = (text) =>
  text.replace(
    /&(?:#(\d+)|#[xX]([\da-fA-F]+)|([a-zA-Z][\da-zA-Z]*));/g,
    (whole, dec, hex, name) => {
      if (dec !== undefined) return String.fromCodePoint(Number(dec));
      if (hex !== undefined) return String.fromCodePoint(parseInt(hex, 16));
      return name in NAMED ? NAMED[name] : whole;
    },
  );

// The Spanish a document needs for its own page, inlined so a reader who has
// chosen Spanish is not waiting on a request for the first swap. Matched on the
// text the browser will see: entities decoded, whitespace collapsed, markup and
// React's text separators out of the way.
const spanishFor = (html) => {
  const searchable = decode(html.replace(/<!--.*?-->/g, '').replace(/<[^>]+>/g, '\n')).replace(
    /\s+/g,
    ' ',
  );
  const labels = decode(
    [...html.matchAll(/(?:aria-label|alt|title)="([^"]*)"/g)].map((m) => m[1]).join('\n'),
  );
  const used = {};
  for (const [english, spanish] of Object.entries(dictionary)) {
    if (searchable.includes(english) || labels.includes(english)) used[english] = spanish;
  }
  return used;
};

// React writes an image preload beside any image it is told to fetch early.
// Rendered to a string there is no head to put it in, and the shell already
// preloads the one image that matters, so these come out of the body.
const PRELOAD = /<link\s[^>]*rel="preload"[^>]*as="image"[^>]*\/?>/gi;

// Every document is finished before any script runs, so its first frame owes the
// bundle nothing. A module script still starts downloading as soon as the parser
// meets it, and on a slow phone that download competes with the stylesheet and
// the two faces the headline waits on: measured on a throttled mobile run, it
// moved the largest paint from 1.8s to 2.3s. So the bundle is asked for one frame
// after the first, and the page's own chunks are not preloaded at all, which is
// the same competition by another road.
//
// A document held open across a deploy names a bundle the next deploy removed.
// The page it holds still reads perfectly and answers nothing, so a failed load
// reloads once for the current names, and a flag stops a build that has moved on
// from looping.
const boot = (src) =>
  `<script type="module">
      const flag = 'delux:bundle-reload'
      const start = () =>
        import(${JSON.stringify(src)}).then(
          () => setTimeout(() => { try { sessionStorage.removeItem(flag) } catch {} }, 10000),
          () => {
            let spent = true
            try {
              spent = sessionStorage.getItem(flag) === '1'
              sessionStorage.setItem(flag, '1')
            } catch {}
            if (!spent) location.reload()
          }
        )
      requestAnimationFrame(() => requestAnimationFrame(start))
    </script>`;

const paintFirst = (html) =>
  html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_tag, src) =>
    boot(src),
  );

const document = ({ path, meta, body, stamp }) => {
  const href = path ? `${ORIGIN}${path}` : `${ORIGIN}/404.html`;
  const head = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    meta.robots ? `<meta name="robots" content="${escapeAttr(meta.robots)}" />` : null,
    path ? `<link rel="canonical" href="${href}" />` : null,
    `<meta property="og:type" content="${meta.ogType ?? 'website'}" />`,
    ...(meta.article
      ? [
          `<meta property="article:published_time" content="${meta.article.published}" />`,
          `<meta property="article:modified_time" content="${meta.article.modified}" />`,
          `<meta property="article:author" content="${escapeAttr(meta.article.author)}" />`,
        ]
      : []),
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${href}" />`,
    ...(path ? STRUCTURED_DATA[path] : []).map(
      (data) => `<script type="application/ld+json">${scriptJson(data)}</script>`,
    ),
  ]
    .filter(Boolean)
    .join('\n    ');

  let out = paintFirst(shell.replace(/<!--route-head-->[\s\S]*?<!--\/route-head-->/, head));
  out = out.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="${stamp}" data-year="${year}">${body.replace(PRELOAD, '')}</div>`,
  );
  const spanish = spanishFor(out);
  if (Object.keys(spanish).length) {
    out = out.replace(
      '</body>',
      `  <script type="application/json" id="i18n-es">${scriptJson(spanish)}</script>\n  </body>`,
    );
  }
  return out;
};

for (const [path, meta] of Object.entries(META)) {
  const out = document({ path, meta, body: render(path, year), stamp: path });
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  console.log(`${path.padEnd(40)} ${(out.length / 1024).toFixed(1)} KB`);
}

// Vercel serves this for any address it cannot match, which keeps the status an
// honest 404. It answers for every such address, so it carries no single path.
{
  const out = document({
    path: null,
    meta: NOT_FOUND,
    body: render('/this-page-does-not-exist/', year),
    stamp: '*',
  });
  writeFileSync(join(DIST, '404.html'), out);
  console.log(`${'404'.padEnd(40)} ${(out.length / 1024).toFixed(1)} KB`);
}
