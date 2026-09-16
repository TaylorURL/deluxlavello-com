import { useEffect, useRef, useState } from 'react';

// A photograph arrives over the placeholder fill rather than replacing it in a
// single repaint. The served markup carries no hidden state, so a page whose
// script never runs still shows every image.
export default function ArrivingImage(props) {
  const image = useRef(null);
  const [state, setState] = useState('');

  useEffect(() => {
    const node = image.current;
    if (!node) return undefined;
    if (node.complete) {
      setState('is-decoded');
      return undefined;
    }
    setState('is-arriving');
    const reveal = () => setState('is-decoded');
    node.addEventListener('load', reveal, { once: true });
    node.addEventListener('error', reveal, { once: true });
    return () => {
      node.removeEventListener('load', reveal);
      node.removeEventListener('error', reveal);
    };
  }, []);

  return <img {...props} ref={image} className={state || undefined} />;
}
