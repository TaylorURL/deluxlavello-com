// The pages are written and served in English, and Spanish is a lookup keyed on
// the English string itself, so no component carries translation markup and a
// phrase written once is translated once. Translating walks the text the page
// already holds and swaps it in place.
//
// React owns those text nodes and writes to them only when what it renders
// changes, so each node remembers the English it was given and the text shown
// in its place. A node whose value is neither has been rewritten by React since,
// and what it now holds is the new English.

const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'svg', 'CODE']);
export const LABELS = ['aria-label', 'alt', 'title'];

export const tidy = (text) => text.replace(/\s+/g, ' ').trim();

const texts = new WeakMap();
const labels = new WeakMap();
let englishTitle = null;
let shownTitle = null;

const lookup = (words, english) => (words ? (words[tidy(english)] ?? null) : null);

const rewriteText = (node, words) => {
  let seen = texts.get(node);
  if (!seen || (node.nodeValue !== seen.english && node.nodeValue !== seen.shown)) {
    seen = { english: node.nodeValue, shown: node.nodeValue };
    texts.set(node, seen);
  }
  const spanish = lookup(words, seen.english);
  const next =
    spanish === null
      ? seen.english
      : `${seen.english.match(/^\s*/)[0]}${spanish}${seen.english.match(/\s*$/)[0]}`;
  if (node.nodeValue !== next) node.nodeValue = next;
  seen.shown = next;
};

const rewriteLabels = (element, words) => {
  let seen = labels.get(element);
  if (!seen) {
    seen = {};
    labels.set(element, seen);
  }
  for (const name of LABELS) {
    const value = element.getAttribute(name);
    if (value === null) continue;
    const slot = seen[name];
    if (!slot || (value !== slot.english && value !== slot.shown))
      seen[name] = { english: value, shown: value };
    const spanish = lookup(words, seen[name].english);
    const next = spanish === null ? seen[name].english : spanish;
    if (value !== next) element.setAttribute(name, next);
    seen[name].shown = next;
  }
};

// words is the Spanish dictionary, or null for English.
export const translate = (root, words) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      for (let parent = node.parentNode; parent && parent !== root; parent = parent.parentNode) {
        if (SKIP.has(parent.nodeName)) return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) rewriteText(node, words);
  root
    .querySelectorAll('[aria-label], img[alt], [title]')
    .forEach((element) => rewriteLabels(element, words));

  if (document.title !== englishTitle && document.title !== shownTitle)
    englishTitle = document.title;
  shownTitle = (words && lookup(words, englishTitle)) || englishTitle;
  if (document.title !== shownTitle) document.title = shownTitle;
  document.documentElement.lang = words ? 'es' : 'en';
};
