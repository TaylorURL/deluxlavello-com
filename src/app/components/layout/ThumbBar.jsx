import ConsultationLink from '@components/ui/ConsultationLink.jsx';
import { PHONE } from '@constants/practice.js';
import useConsultationHref from '@hooks/useConsultationHref.js';

// The number and the booking page are this site's two real actions. On a phone
// both sit inside the menu once the reader has scrolled past the hero, so this
// bar carries them at the edge the thumb already rests on. The stylesheet shows
// it only at that width.
export default function ThumbBar() {
  const consultation = useConsultationHref();
  return (
    <div className="thumb-bar">
      <ConsultationLink className="btn btn--gold" href={consultation} />
      <a className="btn btn--ghost" href={PHONE.href}>
        Call
      </a>
    </div>
  );
}
