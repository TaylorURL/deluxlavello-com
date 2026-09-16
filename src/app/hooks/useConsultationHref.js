import { useLocation } from 'react-router-dom';
import { BOOKING } from '@constants/practice.js';
import { canonicalPath } from '@lib/paths.js';

// The consultation button leads to the contact page everywhere except on the
// contact page, where it leads on to the booking page.
export default function useConsultationHref() {
  const { pathname } = useLocation();
  return canonicalPath(pathname) === '/contact/' ? BOOKING : '/contact/';
}
