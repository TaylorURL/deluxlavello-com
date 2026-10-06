import { useEffect, useRef, useState } from 'react';
import retryImage from '@lib/retryImage.js';

// A photograph arrives over the placeholder fill rather than replacing it in a
// single repaint. The served markup carries no hidden state, so a page whose
// script never runs still shows every image.
//
// A request that fails is asked again once before the frame settles on the
// placeholder; retryImage holds that rule for every image on the site.
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

    const reveal = () => setState('is-decoded');
    const onError = () => {
      if (!retryImage(node)) reveal();
    };

    node.addEventListener('load', reveal, { once: true });
    node.addEventListener('error', onError);
    return () => {
      node.removeEventListener('load', reveal);
      node.removeEventListener('error', onError);
    };
  }, []);

  return <img {...props} ref={image} className={state || undefined} />;
}
