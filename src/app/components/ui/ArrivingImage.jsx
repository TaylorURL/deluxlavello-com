import { useEffect, useRef, useState } from 'react';

// A photograph arrives over the placeholder fill rather than replacing it in a
// single repaint. The served markup carries no hidden state, so a page whose
// script never runs still shows every image.
//
// One failed request does not cost the reader the photograph. A dropped
// connection, a revalidation that did not come back, a handover between
// networks - each ends the fetch with an error event and leaves the frame
// empty for the rest of the visit, because nothing asks a second time. The
// element is asked once more, a moment later, against the same address; a file
// that is genuinely absent fails the same way twice and settles on the
// placeholder exactly as before.
const RETRY_MS = 1200;

export default function ArrivingImage(props) {
  const image = useRef(null);
  const [state, setState] = useState('');

  useEffect(() => {
    const node = image.current;
    if (!node) return undefined;
    if (node.complete && node.naturalWidth > 0) {
      setState('is-decoded');
      return undefined;
    }
    setState('is-arriving');

    let retried = false;
    let timer;

    const reveal = () => setState('is-decoded');
    const onError = () => {
      if (retried) {
        reveal();
        return;
      }
      retried = true;
      // Re-assigning the same candidate list restarts the selection, and the
      // delay keeps a retry off the back of whatever just dropped.
      timer = setTimeout(() => {
        const srcset = node.getAttribute('srcset');
        const src = node.getAttribute('src');
        // Removed rather than blanked: an empty src resolves against the
        // document and would fetch the page itself.
        node.removeAttribute('srcset');
        node.removeAttribute('src');
        if (srcset !== null) node.setAttribute('srcset', srcset);
        if (src !== null) node.setAttribute('src', src);
      }, RETRY_MS);
    };

    node.addEventListener('load', reveal, { once: true });
    node.addEventListener('error', onError);
    return () => {
      clearTimeout(timer);
      node.removeEventListener('load', reveal);
      node.removeEventListener('error', onError);
    };
  }, []);

  return <img {...props} ref={image} className={state || undefined} />;
}
