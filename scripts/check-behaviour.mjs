// Exercises the built pages the way a browser would: loads one into a DOM,
// adopts it with the app, and asserts what a reader would see. Run after a
// build (npm test does both).
//
//     node scripts/check-behaviour.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';
import { build } from 'vite';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const OUT = resolve(ROOT, 'node_modules/.delux-behaviour');

let failures = 0;
const check = (label, got, want) => {
  const ok = got === want;
  if (!ok) failures += 1;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'}  ${label}${ok ? '' : `\n        got ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`,
  );
};

const page = (path) =>
  resolve(
    DIST,
    path === '/'
      ? 'index.html'
      : path.endsWith('.html')
        ? path.slice(1)
        : `${path.slice(1)}index.html`,
  );

// A DOM becomes the global one, because the app reads window and document the
// way a browser hands them over.
const GLOBALS = [
  'window',
  'document',
  'navigator',
  'location',
  'localStorage',
  'Node',
  'NodeFilter',
  'HTMLElement',
  'HTMLIFrameElement',
  'Element',
  'Event',
  'MouseEvent',
  'KeyboardEvent',
  'MutationObserver',
  'IntersectionObserver',
  'getComputedStyle',
  'requestAnimationFrame',
  'cancelAnimationFrame',
];

const makeDom = (html, url, { theme, lang } = {}) => {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true });
  const { window } = dom;
  const store = new Map();
  if (theme) store.set('delux-theme', theme);
  if (lang) store.set('delux-lang', lang);
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
  });
  // JSDOM has no layout, so it ships neither of these.
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  window.matchMedia = (query) => ({
    matches: query.includes('prefers-color-scheme: dark'),
    addEventListener() {},
    removeEventListener() {},
  });
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = () => {};
  // The head bootstrap does this before the first paint in a browser.
  const root = window.document.documentElement;
  root.setAttribute('data-theme-choice', theme || 'light');
  root.setAttribute('data-theme', !theme ? 'light' : theme === 'system' ? 'dark' : theme);
  for (const name of GLOBALS) {
    Object.defineProperty(globalThis, name, {
      value: window[name],
      configurable: true,
      writable: true,
    });
  }
  return window;
};

// The app is compiled once for node, the same way the prerender compiles it, but
// against React's development build: that is the one that carries act() and says
// when the markup it adopts differs from the markup it would have drawn.
process.env.NODE_ENV = 'development';
await build({
  root: ROOT,
  mode: 'development',
  logLevel: 'warn',
  build: {
    ssr: resolve(ROOT, 'scripts/behaviour/client.jsx'),
    outDir: OUT,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
makeDom('<!doctype html><html><body></body></html>', 'https://deluxlavello.com/');
const { hydrate, act } = await import(pathToFileURL(resolve(OUT, 'client.js')).href);

const settle = async () => {
  for (let i = 0; i < 5; i += 1) {
    await act(async () => {
      await new Promise((done) => setTimeout(done, 20));
    });
  }
};

const load = async (path, options) => {
  const window = makeDom(
    readFileSync(page(path), 'utf8'),
    `https://deluxlavello.com${path}`,
    options,
  );
  const consoleErrors = [];
  const original = console.error;
  console.error = (...args) => consoleErrors.push(args.join(' '));
  const { root, errors } = await hydrate(window.document.getElementById('root'));
  await settle();
  console.error = original;
  return { window, document: window.document, root, errors: [...errors, ...consoleErrors] };
};

const click = async (element) => {
  await act(async () => {
    element.dispatchEvent(
      new globalThis.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }),
    );
  });
  await settle();
};

const unmount = (root) => act(() => root.unmount());

const text = (document, selector) => document.querySelector(selector)?.textContent.trim();

console.log('Every page is adopted without a mismatch');
for (const path of ['/', '/services/', '/about/', '/education/', '/contact/', '/privacy/']) {
  const { errors, root } = await load(path);
  check(
    `${path} adopted cleanly`,
    errors.length ? String(errors[0]).slice(0, 160) : 'clean',
    'clean',
  );
  await unmount(root);
}
{
  const { window, errors, root } = await load('/404.html');
  check(
    '404 document renders its page',
    text(window.document, 'main h1'),
    'This page does not exist',
  );
  check('404 adopted cleanly', errors.length ? String(errors[0]).slice(0, 160) : 'clean', 'clean');
  await unmount(root);
}

console.log('\nEnglish by default');
{
  const { document, root } = await load('/');
  check('html lang', document.documentElement.lang, 'en');
  check('hero heading', text(document, 'main h1'), 'Build credit that opens doors.');
  check('index entry', text(document, '.index b'), 'Credit Building');
  check('nav cta', text(document, '.site-nav .btn--gold'), 'Schedule a Consultation');
  check('theme resolved', document.documentElement.getAttribute('data-theme'), 'light');
  check('lang trigger', text(document, '[data-picker="lang"] [data-picker-value]'), 'EN');
  await unmount(root);
}

console.log('\nSpanish when stored');
{
  const { document, root } = await load('/', { lang: 'es' });
  check('html lang', document.documentElement.lang, 'es');
  check('hero heading', text(document, 'main h1'), 'Construya crédito que le abra puertas.');
  check('index entry', text(document, '.index b'), 'Construcción de Crédito');
  check('nav cta', text(document, '.site-nav .btn--gold'), 'Agende una Consulta');
  check(
    'document title',
    document.title,
    'Delux Financial Solutions | Educación Crediticia en Houston, TX',
  );
  check('image alt', document.querySelector('.plate__frame img').alt.slice(0, 13), 'Darian Avello');
  check('lang trigger', text(document, '[data-picker="lang"] [data-picker-value]'), 'ES');
  check(
    'lang checked',
    document.querySelector('#picker-lang [data-value="es"]').getAttribute('aria-checked'),
    'true',
  );

  console.log('\nSwitching back to English restores the source text');
  await click(document.querySelector('#picker-lang [data-value="en"]'));
  check('hero heading', text(document, 'main h1'), 'Build credit that opens doors.');
  check(
    'document title',
    document.title,
    'Delux Financial Solutions | Credit Education in Houston, TX',
  );
  check('html lang', document.documentElement.lang, 'en');
  await unmount(root);
}

console.log('\nSpanish follows the reader to the next page');
{
  const { document, root } = await load('/', { lang: 'es' });
  await click(document.querySelector('.site-nav a[href="/about/"]'));
  check('about heading', text(document, 'main h1'), 'Crédito que usted entiende y controla');
  check('about title', document.title.startsWith('Nosotros'), true);
  await unmount(root);
}

console.log('\nTheme picker');
{
  const { document, root } = await load('/');
  const trigger = document.querySelector('[data-picker="theme"] .picker__trigger');
  const menu = document.querySelector('#picker-theme');
  check('menu starts hidden', menu.hidden, true);
  await click(trigger);
  check('menu opens', menu.hidden, false);
  check('trigger expanded', trigger.getAttribute('aria-expanded'), 'true');
  await click(document.querySelector('#picker-theme [data-value="dark"]'));
  check('theme applied', document.documentElement.getAttribute('data-theme'), 'dark');
  check('choice recorded', document.documentElement.getAttribute('data-theme-choice'), 'dark');
  check('stored', globalThis.localStorage.getItem('delux-theme'), 'dark');
  check('menu closes', menu.hidden, true);
  check(
    'dark checked',
    document.querySelector('#picker-theme [data-value="dark"]').getAttribute('aria-checked'),
    'true',
  );
  check(
    'system unchecked',
    document.querySelector('#picker-theme [data-value="system"]').getAttribute('aria-checked'),
    'false',
  );
  check('trigger names value', trigger.getAttribute('aria-label'), 'Theme: Dark');
  await unmount(root);
}

console.log('\nStored theme wins over the default');
{
  const { document, root } = await load('/', { theme: 'gray' });
  check('theme applied', document.documentElement.getAttribute('data-theme'), 'gray');
  check(
    'slate checked',
    document.querySelector('#picker-theme [data-value="gray"]').getAttribute('aria-checked'),
    'true',
  );
  await unmount(root);
}

console.log('\nMoving between pages');
{
  const { document, root } = await load('/');
  await click(document.querySelector('.site-nav a[href="/education/"]'));
  check('education heading', text(document, 'main h1'), 'Credit, in plain language');
  check(
    'education title',
    document.title,
    'Credit Education and Resources | Delux Financial Solutions',
  );
  check(
    'canonical follows',
    document.querySelector('link[rel="canonical"]').getAttribute('href'),
    'https://deluxlavello.com/education/',
  );
  check(
    'nav marks the page',
    document.querySelector('.site-nav a[href="/education/"]').getAttribute('aria-current'),
    'page',
  );
  await unmount(root);
}

console.log('\nThe consultation button');
{
  const home = await load('/');
  check(
    'leads to contact',
    home.document.querySelector('.site-nav .btn--gold').getAttribute('href'),
    '/contact/',
  );
  await unmount(home.root);
  const contact = await load('/contact/');
  check(
    'leads on to booking from contact',
    contact.document.querySelector('.site-nav .btn--gold').getAttribute('href'),
    'https://info.deluxlavello.com/consultation',
  );
  await unmount(contact.root);
}

console.log('\nThe menu and the services panel');
{
  const { document, root } = await load('/');
  const panel = document.querySelector('.mega-panel');
  check('panel starts inert', panel.hasAttribute('inert'), true);
  await click(document.querySelector('.nav-group__trigger'));
  check('panel opens', panel.classList.contains('is-open'), true);
  check('panel takes the pointer', panel.hasAttribute('inert'), false);
  await act(async () => {
    document.dispatchEvent(
      new globalThis.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
  });
  check('escape closes it', panel.classList.contains('is-open'), false);
  const toggle = document.querySelector('.nav-toggle');
  await click(toggle);
  check('menu opens', document.querySelector('.site-nav').classList.contains('is-open'), true);
  check('toggle expanded', toggle.getAttribute('aria-expanded'), 'true');
  await unmount(root);
}

console.log('\nEvery page carries its own Spanish');
for (const path of ['/about/', '/services/', '/privacy/', '/terms/', '/404.html']) {
  const { document, root } = await load(path, { lang: 'es' });
  const dict = JSON.parse(document.getElementById('i18n-es').textContent);
  const left = [...document.querySelectorAll('h1, h2')]
    .map((h) => h.textContent.trim())
    .filter((h) => dict[h]);
  check(`${path} headings translated`, left.length, 0);
  await unmount(root);
}

console.log('\nThe served documents');
for (const path of ['/', '/services/credit-building/', '/education/', '/disclaimer/']) {
  const html = readFileSync(page(path), 'utf8');
  check(
    `${path} canonical`,
    html.includes(`<link rel="canonical" href="https://deluxlavello.com${path}" />`),
    true,
  );
  check(`${path} structured data`, /<script type="application\/ld\+json">/.test(html), true);
  check(`${path} holds its page`, /<main[^>]*>[\s\S]*<h1/.test(html), true);
}
{
  const html = readFileSync(resolve(DIST, '404.html'), 'utf8');
  check(
    '404 is kept out of the index',
    html.includes('<meta name="robots" content="noindex, follow" />'),
    true,
  );
}

console.log('\nThe closed mega panel takes no clicks');
{
  // It is a fixed layer above the header's z-index that covers the whole viewport
  // on a phone, so with only opacity: 0 it is invisible and still swallows every
  // click aimed at the page behind it.
  const css = readdirSync(resolve(DIST, 'assets')).find((f) => /^index-.*\.css$/.test(f));
  const sheet = readFileSync(resolve(DIST, 'assets', css), 'utf8');
  const closed = sheet.match(/\.mega-panel:not\(\.is-open\)\{([^}]*)\}/);
  check('closed panel rule exists', Boolean(closed), true);
  check(
    'closed panel ignores the pointer',
    /pointer-events:\s*none/.test(closed ? closed[1] : ''),
    true,
  );
  check('closed panel is hidden', /visibility:\s*hidden/.test(closed ? closed[1] : ''), true);
}

console.log('\nA lost image is asked again before the app has hydrated');
{
  // The mark in the header is requested while the document is still being
  // parsed, so whatever asks for it again has to be in the document rather
  // than in the bundle. These two run the served page's own head script and
  // fail the mark with nothing hydrated behind it.
  const open = () => {
    const dom = new JSDOM(readFileSync(page('/'), 'utf8'), {
      url: 'https://deluxlavello.com/',
      runScripts: 'dangerously',
    });
    const reports = [];
    dom.window.navigator.sendBeacon = (endpoint, body) => {
      reports.push(JSON.parse(body));
      return true;
    };
    return { dom, window: dom.window, reports };
  };
  const wait = (ms) => new Promise((done) => setTimeout(done, ms));

  const recovered = open();
  const mark = recovered.window.document.querySelector('img.brand__mark');
  const source = recovered.window.document.querySelector('.brand source');
  check(
    'the served markup carries no handler of its own',
    mark.getAttributeNames().filter((name) => name.startsWith('on')).length,
    0,
  );
  mark.dispatchEvent(new recovered.window.Event('error'));
  await wait(1500);
  check(
    'the webp candidates are asked again',
    source.getAttribute('srcset'),
    '/brand/logo-mark-148.webp?retry=1 148w, /brand/logo-mark-296.webp?retry=1 296w',
  );
  check(
    'the png fallback is asked again',
    mark.getAttribute('src'),
    '/brand/logo-mark-148.png?retry=1',
  );
  // The second attempt arrives, so nothing was missing from the page the
  // reader was looking at and there is nothing to report.
  Object.defineProperty(mark, 'complete', { value: true });
  Object.defineProperty(mark, 'naturalWidth', { value: 148 });
  await wait(3000);
  check('a recovered image is not reported', recovered.reports.length, 0);
  recovered.dom.window.close();

  const lost = open();
  const gone = lost.window.document.querySelector('img.brand__mark');
  gone.dispatchEvent(new lost.window.Event('error'));
  await wait(1500);
  // The second attempt fails as well. One ask per element for the life of the
  // page, so this does not put the page in a loop.
  gone.dispatchEvent(new lost.window.Event('error'));
  await wait(200);
  check(
    'nothing is asked a third time',
    gone.getAttribute('src'),
    '/brand/logo-mark-148.png?retry=1',
  );
  await wait(2700);
  check('an image that never arrived is reported once', lost.reports.length, 1);
  check(
    'the report names the file rather than the retry',
    lost.reports[0] && lost.reports[0].message,
    'Failed to load img: https://deluxlavello.com/brand/logo-mark-148.png',
  );
  lost.dom.window.close();
}

console.log(failures ? `\n${failures} failing` : '\nall checks pass');
process.exit(failures ? 1 : 0);
