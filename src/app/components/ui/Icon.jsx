// A mark from the sprite, drawn in the ink of wherever it lands.
export default function Icon({ name, className = 'icon', viewBox = '0 0 24 24' }) {
  return (
    <svg className={className} aria-hidden="true" viewBox={viewBox}>
      <use href={`#${name}`} />
    </svg>
  );
}
