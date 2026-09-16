import { useEffect } from 'react';
import { META, NOT_FOUND, ORIGIN } from '@constants/meta.js';
import { canonicalPath } from '@lib/paths.js';

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute(attribute, value);
};

// The served document already names its page and the browser has already put
// the reader where the address points, so the first page leaves both alone.
let arrived = false;

// A page reached without a reload still has to say which page it is. Called from
// inside the page's own boundary, so it runs once the page has loaded and the
// section a hash names exists to scroll to.
export default function useRouteChange({ pathname, hash }) {
  useEffect(() => {
    if (!arrived) {
      arrived = true;
      return;
    }
    const path = canonicalPath(pathname);
    const meta = META[path] ?? NOT_FOUND;
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', `${ORIGIN}${path}`);
    setMeta('link[rel="canonical"]', 'href', `${ORIGIN}${path}`);

    // A new page opens at its top, or at the section its address names. Focus
    // moves to the page itself, so a keyboard or a screen reader starts there
    // rather than on the link that has just gone.
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);
}
