// One table, two consumers: the client wraps each loader in lazy() so a page
// arrives on request, and the server build awaits them so the prerendered HTML
// holds the real page rather than a placeholder.
export const ROUTE_TABLE = [
  { path: '/', load: () => import('@views/Home.jsx') },
  { path: '/services/', load: () => import('@views/Services.jsx') },
  { path: '/services/credit-building/', load: () => import('@views/CreditBuilding.jsx') },
  { path: '/services/credit-growth/', load: () => import('@views/CreditGrowth.jsx') },
  {
    path: '/services/credit-building-and-growth/',
    load: () => import('@views/CreditBuildingAndGrowth.jsx'),
  },
  {
    path: '/services/debt-lawsuit-response/',
    load: () => import('@views/DebtLawsuitResponse.jsx'),
  },
  { path: '/how-it-works/', load: () => import('@views/HowItWorks.jsx') },
  { path: '/education/', load: () => import('@views/Education.jsx') },
  { path: '/partners/', load: () => import('@views/Partners.jsx') },
  { path: '/about/', load: () => import('@views/About.jsx') },
  { path: '/contact/', load: () => import('@views/Contact.jsx') },
  { path: '/privacy/', load: () => import('@views/Privacy.jsx') },
  { path: '/terms/', load: () => import('@views/Terms.jsx') },
  { path: '/disclaimer/', load: () => import('@views/Disclaimer.jsx') },
  { path: '*', load: () => import('@views/NotFound.jsx') },
];
