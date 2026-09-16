import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@app/App.jsx';

// The browser entry, minus the stylesheet, as a module the behaviour checks can
// run inside a DOM of their own.
export async function hydrate(container) {
  const errors = [];
  let root;
  await act(async () => {
    root = hydrateRoot(
      container,
      <BrowserRouter>
        <App year={container.dataset.year} />
      </BrowserRouter>,
      { onRecoverableError: (error) => errors.push(error) },
    );
  });
  return { root, errors };
}

export { act };
