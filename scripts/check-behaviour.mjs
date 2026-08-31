// Exercises the built pages the way a browser would: loads one into a DOM, runs
// site.js against it, and asserts what a reader would see. Run after a build.
//
//     node scripts/check-behaviour.mjs

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const script = readFileSync(resolve(ROOT, 'src/site.js'), 'utf8')

let failures = 0
const check = (label, got, want) => {
  const ok = got === want
  if (!ok) failures += 1
  console.log(
    `${ok ? 'ok  ' : 'FAIL'}  ${label}${ok ? '' : `\n        got ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`
  )
}

const load = (page, { theme, lang } = {}) => {
  const html = readFileSync(resolve(ROOT, 'dist', page), 'utf8')
  const dom = new JSDOM(html, { url: 'https://deluxlavello.com/', pretendToBeVisual: true, runScripts: 'outside-only' })
  const { window } = dom
  const store = new Map()
  if (theme) store.set('delux-theme', theme)
  if (lang) store.set('delux-lang', lang)
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
    },
  })
  // JSDOM has no layout, so it ships no IntersectionObserver. The bar's floating
  // state is a scroll behaviour; these checks are about language and theme.
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  }
  window.matchMedia = (query) => ({
    matches: query.includes('prefers-color-scheme: dark'),
    addEventListener() {},
    removeEventListener() {},
  })
  // The head bootstrap already ran under JSDOM against the real localStorage,
  // so the resolved theme is re-applied here against the stubbed one.
  const root = window.document.documentElement
  root.setAttribute('data-theme-choice', theme || 'system')
  root.setAttribute('data-theme', !theme || theme === 'system' ? 'dark' : theme)
  if (lang === 'es') root.lang = 'es'
  window.eval(script.replace(/^import .*$/gm, ''))
  return window
}

const text = (window, selector) => window.document.querySelector(selector)?.textContent.trim()

console.log('English by default')
{
  const w = load('index.html')
  check('html lang', w.document.documentElement.lang, 'en')
  check('hero heading', text(w, '.hero h1'), 'Build credit that opens doors.')
  check('index entry', text(w, '.index b'), 'Credit Building')
  check('nav cta', text(w, '.site-nav .btn--gold'), 'Schedule a Consultation')
  check('theme resolved', w.document.documentElement.getAttribute('data-theme'), 'dark')
  check('lang trigger', text(w, '[data-picker="lang"] [data-picker-value]'), 'EN')
}

console.log('\nSpanish when stored')
{
  const w = load('index.html', { lang: 'es' })
  check('html lang', w.document.documentElement.lang, 'es')
  check('hero heading', text(w, '.hero h1'), 'Construya crédito que le abra puertas.')
  check('index entry', text(w, '.index b'), 'Construcción de Crédito')
  check('nav cta', text(w, '.site-nav .btn--gold'), 'Agende una Consulta')
  check('document title', w.document.title, 'Delux Financial Solutions | Educación Crediticia en Houston, TX')
  check('image alt', w.document.querySelector('.plate__frame img').alt.slice(0, 13), 'Darian Avello')
  check('lang trigger', text(w, '[data-picker="lang"] [data-picker-value]'), 'ES')
  check('lang checked', w.document.querySelector('[data-lang="es"]').getAttribute('aria-checked'), 'true')
}

console.log('\nSwitching back to English restores the source text')
{
  const w = load('index.html', { lang: 'es' })
  w.document.querySelector('[data-lang="en"]').click()
  check('hero heading', text(w, '.hero h1'), 'Build credit that opens doors.')
  check('document title', w.document.title, 'Delux Financial Solutions | Credit Education in Houston, TX')
  check('html lang', w.document.documentElement.lang, 'en')
}

console.log('\nTheme picker')
{
  const w = load('index.html')
  const trigger = w.document.querySelector('[data-picker="theme"] .picker__trigger')
  const menu = w.document.querySelector('#picker-theme')
  check('menu starts hidden', menu.hidden, true)
  trigger.click()
  check('menu opens', menu.hidden, false)
  check('trigger expanded', trigger.getAttribute('aria-expanded'), 'true')
  w.document.querySelector('[data-theme-option="light"]').click()
  check('theme applied', w.document.documentElement.getAttribute('data-theme'), 'light')
  check('choice recorded', w.document.documentElement.getAttribute('data-theme-choice'), 'light')
  check('menu closes', menu.hidden, true)
  check('light checked', w.document.querySelector('[data-theme-option="light"]').getAttribute('aria-checked'), 'true')
  check(
    'system unchecked',
    w.document.querySelector('[data-theme-option="system"]').getAttribute('aria-checked'),
    'false'
  )
  check('trigger names value', trigger.getAttribute('aria-label'), 'Theme: Light')
}

console.log('\nStored theme wins over the system')
{
  const w = load('index.html', { theme: 'gray' })
  check('theme applied', w.document.documentElement.getAttribute('data-theme'), 'gray')
  check('slate checked', w.document.querySelector('[data-theme-option="gray"]').getAttribute('aria-checked'), 'true')
}

console.log('\nEvery page carries its own Spanish')
for (const page of ['about/index.html', 'services/index.html', 'privacy/index.html', 'terms/index.html', '404.html']) {
  const w = load(page, { lang: 'es' })
  const leftover = [...w.document.querySelectorAll('h1, h2')].map((h) => h.textContent.trim())
  const dict = JSON.parse(w.document.getElementById('i18n-es').textContent)
  const untranslated = leftover.filter((h) => dict[h])
  check(`${page} headings translated`, untranslated.length, 0)
}

console.log('\nThe closed mega panel takes no clicks')
{
  // It is a fixed layer above the header's z-index that covers the whole viewport
  // on a phone, so with only opacity: 0 it is invisible and still swallows every
  // click aimed at the page behind it.
  const index = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf8')
  const href = index.match(/href="(\/assets\/site-[^"]+\.css)"/)[1]
  const sheet = readFileSync(resolve(ROOT, 'dist', href.slice(1)), 'utf8')
  const closed = sheet.match(/\.mega-panel:not\(\.is-open\)\{([^}]*)\}/)
  check('closed panel rule exists', Boolean(closed), true)
  check('closed panel ignores the pointer', /pointer-events:\s*none/.test(closed ? closed[1] : ''), true)
  check('closed panel is hidden', /visibility:\s*hidden/.test(closed ? closed[1] : ''), true)

  const w = load('index.html')
  const panel = w.document.querySelector('.mega-panel')
  check('panel starts inert', panel.hasAttribute('inert'), true)
}

console.log(failures ? `\n${failures} failing` : '\nall checks pass')
process.exit(failures ? 1 : 0)
