import sprite from '@app/assets/sprite.svg?raw';

// One sprite carries every mark, drawn in currentColor, so a mark takes the ink
// of the theme it lands in. The file is the drawing; this lifts its definitions
// into the page once for every <use> to point at.
const defs = sprite.slice(
  sprite.indexOf('<defs>') + '<defs>'.length,
  sprite.lastIndexOf('</defs>'),
);

export default function IconSprite() {
  return (
    <svg className="sprite" aria-hidden="true" focusable="false" width="0" height="0">
      <defs dangerouslySetInnerHTML={{ __html: defs }} />
    </svg>
  );
}
