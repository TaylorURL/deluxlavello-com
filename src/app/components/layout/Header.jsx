import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ConsultationLink from '@components/ui/ConsultationLink.jsx';
import Icon from '@components/ui/Icon.jsx';
import { NAV, SERVICE_GROUPS } from '@constants/practice.js';
import useConsultationHref from '@hooks/useConsultationHref.js';
import useIsCurrent from '@hooks/useIsCurrent.js';

const COMPACT = '(max-width: 860px)';
const isCompact = () => window.matchMedia(COMPACT).matches;

// Tab stops in document order, minus the ones a closed panel has taken out of
// the layout. The active element is kept even when it measures as hidden, so
// focus already inside a collapsing container still has a place in the list.
const focusablesIn = (element) =>
  [
    ...element.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  ].filter((node) => node.offsetParent !== null || node === document.activeElement);

export default function Header() {
  const { pathname } = useLocation();
  const isCurrent = useIsCurrent();
  const consultation = useConsultationHref();

  const [navOpen, setNavOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(null);
  const [floating, setFloating] = useState(false);

  const header = useRef(null);
  const nav = useRef(null);
  const toggle = useRef(null);
  const trigger = useRef(null);
  const sentinel = useRef(null);

  // The bar is sticky under a utility strip that scrolls away, so its bottom
  // edge moves between two heights. Reading it as the panel opens is what keeps
  // the panel against the bar in both states.
  const openPanel = useCallback((open) => {
    if (open && header.current)
      setPanelTop(Math.round(header.current.getBoundingClientRect().bottom));
    setPanelOpen(open);
  }, []);

  const closeNav = useCallback(() => {
    setNavOpen(false);
    setPanelOpen(false);
  }, []);

  // A new page closes whatever was open on the last one. Settled during the
  // render that sees the new address, so the page never draws with them open.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setNavOpen(false);
    setPanelOpen(false);
  }

  // The open menu owns the screen on a phone, so the page behind it stops
  // scrolling for as long as it is open.
  useEffect(() => {
    document.body.style.overflow = navOpen && isCompact() ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  // Widening past the breakpoint returns the nav to the header row, which leaves
  // the open state and the scroll lock behind if nothing clears them.
  useEffect(() => {
    const query = window.matchMedia(COMPACT);
    const sync = () => {
      if (!query.matches) setNavOpen(false);
    };
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // One class carries the bar into its floating state and back, set by a
  // sentinel parked at the threshold rather than by reading scroll every frame.
  useEffect(() => {
    if (!sentinel.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFloating(!entry.isIntersecting);
        setPanelOpen(false);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      if (panelOpen) {
        setPanelOpen(false);
        trigger.current?.focus();
      } else if (navOpen) {
        setNavOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (event) => {
      if (!panelOpen || isCompact()) return;
      if (event.target.closest('.mega-panel') || event.target.closest('.nav-group')) return;
      setPanelOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [panelOpen, navOpen]);

  // Opening moves focus into the menu, once the menu is on screen to take it.
  // Its visibility is transitioned, and at the first instant of the transition
  // it still reads as hidden, which refuses focus; a frame later it does not.
  useEffect(() => {
    if (!navOpen || !nav.current) return undefined;
    const frame = requestAnimationFrame(() => focusablesIn(nav.current)[0]?.focus());
    return () => cancelAnimationFrame(frame);
  }, [navOpen]);

  // Full-screen and over the page, the menu owns the tab ring: without this,
  // Tab walks out of it into content the reader cannot see.
  const trapTab = (event) => {
    if (event.key !== 'Tab' || !isCompact() || !navOpen) return;
    const stops = focusablesIn(nav.current);
    if (!stops.length) return;
    const edge = event.shiftKey ? stops[0] : stops[stops.length - 1];
    if (document.activeElement !== edge) return;
    event.preventDefault();
    (event.shiftKey ? stops[stops.length - 1] : stops[0]).focus();
  };

  const onNavClick = (event) => {
    if (event.target.closest('a')) closeNav();
  };

  return (
    <>
      <div className="scroll-sentinel" aria-hidden="true" ref={sentinel} />
      <header className={`site-header${floating ? ' is-floating' : ''}`} ref={header}>
        <div className="site-header__inner mx-auto w-[calc(100%-2.5rem)] max-w-shell">
          <Link className="brand" to="/">
            <picture>
              <source
                type="image/webp"
                srcSet="/brand/logo-mark-148.webp 148w, /brand/logo-mark-296.webp 296w"
                sizes="74px"
              />
              <img
                className="brand__mark"
                src="/brand/logo-mark-148.png"
                srcSet="/brand/logo-mark-148.png 148w, /brand/logo-mark-296.webp 296w"
                sizes="74px"
                alt="Delux Financial Solutions"
                width="148"
                height="103"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />
            </picture>
            <span className="brand__tag">Financial Solutions</span>
          </Link>
          <button
            className={`nav-toggle${navOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={navOpen}
            aria-controls="site-nav"
            aria-label="Menu"
            ref={toggle}
            onClick={() => (navOpen ? closeNav() : setNavOpen(true))}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav
            className={`site-nav${navOpen ? ' is-open' : ''}`}
            id="site-nav"
            aria-label="Main"
            ref={nav}
            onClick={onNavClick}
            onKeyDown={trapTab}
          >
            <div className="nav-group">
              <button
                className="nav-group__trigger"
                type="button"
                aria-expanded={panelOpen}
                aria-haspopup="true"
                aria-controls="panel-services"
                ref={trigger}
                onClick={() => openPanel(!panelOpen)}
              >
                Services
                <span className="nav-group__caret" aria-hidden="true"></span>
              </button>
            </div>
            {NAV.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isCurrent(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <ConsultationLink className="btn btn--gold" href={consultation} />
          </nav>
        </div>
      </header>
      {/* The panel's visibility is transitioned, so a closed panel would keep its
          links in the tab order for the length of the fade. inert takes them out
          of reach on the click instead. */}
      <div
        className={`mega-panel${panelOpen ? ' is-open' : ''}`}
        id="panel-services"
        data-panel="services"
        inert={!panelOpen}
        style={panelTop === null ? undefined : { top: `${panelTop}px` }}
        onClick={(event) => {
          if (event.target.closest('a')) closeNav();
        }}
      >
        <div className="mega-panel__inner mx-auto w-[calc(100%-2.5rem)] max-w-shell">
          {SERVICE_GROUPS.map((group) => (
            <div className="mega-col" key={group.head}>
              <p className="mega-col__head">{group.head}</p>
              {group.links.map((link) => (
                <Link
                  className="mega-link"
                  key={link.href}
                  to={link.href}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                >
                  <Icon name={link.art} className="mega-link__art" viewBox="0 0 64 64" />
                  <span>
                    <b>{link.title}</b>
                    <i>{link.note}</i>
                  </span>
                </Link>
              ))}
            </div>
          ))}
          <Link className="mega-feature" to="/services/">
            <p className="mega-feature__title">Compare Every Path</p>
            <p className="mega-feature__desc">
              Four services side by side, with what each one covers and who it suits.
            </p>
            <span className="mega-feature__go">
              See the Comparison
              <Icon name="i-arrow" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
