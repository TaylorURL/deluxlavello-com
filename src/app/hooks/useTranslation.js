import { useEffect } from 'react';
import { LABELS, translate } from '@lib/translate.js';

// The document carries the Spanish for its own page, so the first swap needs no
// request. Moving to another page needs the rest, which is fetched once, only by
// a reader who has chosen Spanish.
let inline = null;
const inlineWords = () => {
  if (inline) return inline;
  try {
    inline = JSON.parse(document.getElementById('i18n-es')?.textContent || '{}');
  } catch {
    inline = {};
  }
  return inline;
};

let everything = null;
const loadEverything = () => {
  everything ??= import('@i18n/es.json').then((module) => module.default);
  return everything;
};

export default function useTranslation(language, pathname) {
  useEffect(() => {
    const root = document.body;
    if (language !== 'es') {
      translate(root, null);
      return undefined;
    }

    let words = inlineWords();
    let queued = false;
    const run = () => {
      queued = false;
      translate(root, words);
    };
    // React rewrites text as state changes and routes load, and each of those
    // writes arrives here to be translated again. A pass that finds nothing to
    // change writes nothing, so the observer settles rather than loops.
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      queueMicrotask(run);
    });
    run();
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: LABELS,
    });
    const titleNode = document.querySelector('title');
    if (titleNode)
      observer.observe(titleNode, { childList: true, characterData: true, subtree: true });

    let live = true;
    loadEverything().then(
      (full) => {
        if (!live) return;
        words = full;
        run();
      },
      () => {},
    );
    return () => {
      live = false;
      observer.disconnect();
    };
  }, [language, pathname]);
}
