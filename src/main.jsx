import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@app/App.jsx';
import { canonicalPath } from '@lib/paths.js';
import { META } from '@constants/meta.js';
import './index.css';

const container = document.getElementById('root');
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App year={container.dataset.year} />
    </BrowserRouter>
  </StrictMode>
);

// Every route is built into its own document, and a document that already holds
// its page is adopted rather than drawn again - but only where the document and
// the router agree on which page this is. The 404 document is stamped for any
// address the site has no page for. The dev server serves the empty shell with
// no stamp at all, so it is drawn from nothing.
const stamp = container.getAttribute('data-prerendered');
const path = window.location.pathname;
const agrees = stamp === '*' ? !META[canonicalPath(path)] : stamp === path;

if (agrees) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
