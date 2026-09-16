// Addresses are served with a trailing slash, so a route is matched on the path
// with one added: /about and /about/ are the same page.
export const canonicalPath = (pathname) => (pathname.endsWith('/') ? pathname : `${pathname}/`);
