import { useLocation } from 'react-router-dom';
import useRouteChange from '@hooks/useRouteChange.js';

// Sits inside the page's loading boundary, so what it does on arrival waits for
// the page it arrives at.
export default function ViewFrame({ children }) {
  useRouteChange(useLocation());
  return children;
}
