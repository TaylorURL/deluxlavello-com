import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalPath } from '@lib/paths.js';

// A link to the page being read marks itself, which is how the bar and the
// footer show where the reader is.
export default function useIsCurrent() {
  const { pathname } = useLocation();
  const here = canonicalPath(pathname);
  return useCallback((href) => href === here, [here]);
}
