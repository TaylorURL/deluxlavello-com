import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import App from '@app/App.jsx';
import { ROUTE_TABLE } from '@app/routeTable.js';

export { META, NOT_FOUND, ORIGIN } from '@constants/meta.js';
export { STRUCTURED_DATA } from '@constants/structuredData.js';
export { firmYear } from '@lib/year.js';

// Resolved rather than lazy: a prerendered page must hold its own markup.
let routes = null;

export async function prepare() {
  routes = await Promise.all(
    ROUTE_TABLE.map(async (r) => ({ path: r.path, Component: (await r.load()).default })),
  );
}

export function render(url, year) {
  return renderToString(
    <StaticRouter location={url}>
      <App routes={routes} year={year} />
    </StaticRouter>,
  );
}
