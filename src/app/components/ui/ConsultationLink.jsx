import { Link } from 'react-router-dom';

// The booking page is another site, so it leaves by a plain link; the contact
// page is this one.
export default function ConsultationLink({
  className,
  href,
  children = 'Schedule a Consultation',
}) {
  return href.startsWith('/') ? (
    <Link className={className} to={href}>
      {children}
    </Link>
  ) : (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
