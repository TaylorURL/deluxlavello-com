import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTE_TABLE } from '@app/routeTable.js';
import Footer from '@components/layout/Footer.jsx';
import Header from '@components/layout/Header.jsx';
import IconSprite from '@components/layout/IconSprite.jsx';
import SplitRail from '@taylorurl/split-rail';
import ViewFrame from '@components/layout/ViewFrame.jsx';
import ThumbBar from '@components/layout/ThumbBar.jsx';
import UtilityBar from '@components/layout/UtilityBar.jsx';
import { PreferencesProvider, usePreferences } from '@context/PreferencesContext.jsx';
import useTranslation from '@hooks/useTranslation.js';
import { firmYear } from '@lib/year.js';

// Each page arrives on request. The server build hands in the resolved set
// instead, so the prerendered document holds the page itself.
const LAZY = ROUTE_TABLE.map((r) => ({ path: r.path, Component: lazy(r.load) }));

export default function App({ routes = LAZY, year }) {
  return (
    <PreferencesProvider>
      <Site routes={routes} year={year} />
    </PreferencesProvider>
  );
}

function Site({ routes, year: servedYear }) {
  const { pathname } = useLocation();
  const { language } = usePreferences();
  useTranslation(language, pathname);

  // The year the document was built in, until the page is running and can ask
  // the clock. Both read the firm's own zone.
  const [year, setYear] = useState(servedYear ?? firmYear());
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(firmYear());
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to Content
      </a>
      <IconSprite />
      <UtilityBar />
      <Header />
      <main id="main" tabIndex={-1} className="focus-visible:outline-none">
        <Suspense fallback={null}>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ViewFrame>
                    <Component />
                  </ViewFrame>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer year={year}>
        <SplitRail version={__BUILD_VERSION__} year={Number(year)} />
      </Footer>
      <ThumbBar />
    </>
  );
}
