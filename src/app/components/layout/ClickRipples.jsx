import { useEffect, useRef } from 'react';

// Press feedback on a control answers for that control. This layer answers for
// the click wherever it lands, including the ground between controls. The rings
// are short-lived decoration, so they are drawn straight into the layer rather
// than through state.
export default function ClickRipples() {
  const layer = useRef(null);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onDown = (event) => {
      if (still.matches || event.button !== 0 || !layer.current) return;
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      layer.current.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  return <div className="click-layer" aria-hidden="true" ref={layer} />;
}
