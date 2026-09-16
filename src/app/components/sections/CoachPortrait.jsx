import ArrivingImage from '@components/ui/ArrivingImage.jsx';

export default function CoachPortrait() {
  return (
    <figure className="plate">
      <div className="plate__frame">
        <ArrivingImage
          src="/photos/coach-portrait-544.webp"
          srcSet="/photos/coach-portrait-544.webp 544w, /photos/coach-portrait-1088.webp 1088w"
          sizes="(min-width: 54rem) 34rem, 92vw"
          alt="Darian Avello standing at a glass rail in a lobby, brass fixtures behind him"
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="plate__caption">
        <b>Darian Avello</b>
        <i>The Credit Coach</i>
      </figcaption>
    </figure>
  );
}
