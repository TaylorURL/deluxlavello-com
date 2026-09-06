import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const page = (p) => resolve(import.meta.dirname, p)

const { version } = JSON.parse(readFileSync(page('package.json'), 'utf8'))

// The browser chrome takes a literal colour, and a meta element cannot read a
// custom property. Lifting the value out of the token block at build time keeps
// the ground named in one place rather than two that drift apart.
const themeColor = readFileSync(page('brand/tokens.css'), 'utf8').match(/--delux-black:\s*(#[0-9a-f]{3,8})/i)?.[1]

// The firm's own year. The build runs in CI at UTC, which turns the year over
// six hours before Texas does, and the runtime slot is filled from the
// visitor's clock; both name the same business, so both read the same zone.
const ZONE = 'America/Chicago'
const currentYear = () => new Intl.DateTimeFormat('en-CA', { timeZone: ZONE, year: 'numeric' }).format(new Date())

const expand = (html) =>
  html.replace(/<!--([a-z-]+)-->/g, (marker, name) => {
    if (name === 'year') return currentYear()
    if (name === 'version') return version
    if (name === 'themecolor') return themeColor ?? ''
    const file = page(`partials/${name}.html`)
    return existsSync(file) ? readFileSync(file, 'utf8') : marker
  })

const partials = () => ({
  name: 'partials',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      // A partial may itself carry a marker, so expand until the page settles.
      // The pass cap stops a partial that includes itself from looping forever.
      let document = html
      for (let pass = 0; pass < 5; pass += 1) {
        const next = expand(document)
        if (next === document) break
        document = next
      }
      return document
    },
  },
})

const dictionary = JSON.parse(readFileSync(page('i18n/es.json'), 'utf8'))

// The named entities this site's pages actually use, plus the numeric forms.
// Anything unrecognised is left standing rather than guessed at.
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', copy: '\u00a9', middot: '\u00b7' }

const decodeEntities = (text) =>
  text.replace(/&(?:#(\d+)|#[xX]([\da-fA-F]+)|([a-zA-Z][\da-zA-Z]*));/g, (whole, dec, hex, name) => {
    if (dec !== undefined) return String.fromCodePoint(Number(dec))
    if (hex !== undefined) return String.fromCodePoint(parseInt(hex, 16))
    return name in NAMED ? NAMED[name] : whole
  })

// English is what the file says and what a crawler is served. Spanish rides
// along as a lookup keyed on the English string itself, so a page carries no
// translation markup and a phrase written once is translated once. Only the
// entries a page actually contains are inlined.
const translations = () => ({
  name: 'translations',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      // Matched against the text the runtime sees rather than the markup the file
      // carries. src/site.js reads a text node, which the parser has already
      // decoded, and keys its lookup on that with the whitespace collapsed. So
      // the same two steps run here in the same order: entities first, then
      // whitespace. Comparing raw markup drops every phrase the formatter
      // wrapped over two lines, and every phrase holding an escaped character.
      const used = {}
      const searchable = decodeEntities(html).replace(/\s+/g, ' ')
      for (const [english, spanish] of Object.entries(dictionary)) {
        if (searchable.includes(english)) used[english] = spanish
      }
      if (!Object.keys(used).length) return html
      // The payload is inlined into the document, so an unescaped < in any entry
      // could close the script element early and spill the rest onto the page.
      const payload = JSON.stringify(used).replace(/</g, '\\u003c')
      return html.replace('</body>', `<script type="application/json" id="i18n-es">${payload}</script>\n</body>`)
    },
  },
})

export default defineConfig({
  appType: 'mpa',
  plugins: [partials(), translations()],
  build: {
    // The source is shipped as written; nothing on the page needs a syntax
    // older than this.
    target: 'es2022',
    rollupOptions: {
      input: {
        home: page('index.html'),
        services: page('services/index.html'),
        creditBuilding: page('services/credit-building/index.html'),
        creditGrowth: page('services/credit-growth/index.html'),
        creditBuildingAndGrowth: page('services/credit-building-and-growth/index.html'),
        debtLawsuitResponse: page('services/debt-lawsuit-response/index.html'),
        howItWorks: page('how-it-works/index.html'),
        education: page('education/index.html'),
        partners: page('partners/index.html'),
        about: page('about/index.html'),
        contact: page('contact/index.html'),
        privacy: page('privacy/index.html'),
        terms: page('terms/index.html'),
        disclaimer: page('disclaimer/index.html'),
        notFound: page('404.html'),
      },
    },
  },
})
