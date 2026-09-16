import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@components/ui/Icon.jsx';
import Picker from '@components/ui/Picker.jsx';
import { EMAIL, FOOTER_LINKS, PHONE, SOCIAL } from '@constants/practice.js';
import useIsCurrent from '@hooks/useIsCurrent.js';
import { usePreferences } from '@context/PreferencesContext.jsx';

const THEMES = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'gray', label: 'Slate' },
  { value: 'system', label: 'System' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

const GLOBE =
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3a15.6 15.6 0 0 0-1.2-5.4A8 8 0 0 1 18.9 11ZM12 4c.8 1.1 1.6 3.4 1.8 7h-3.6C10.4 7.4 11.2 5.1 12 4ZM4.3 13h3c.1 2 .5 3.9 1.2 5.4A8 8 0 0 1 4.3 13Zm3-2h-3a8 8 0 0 1 4.2-5.4A15.6 15.6 0 0 0 7.3 11ZM12 20c-.8-1.1-1.6-3.4-1.8-7h3.6c-.2 3.6-1 5.9-1.8 7Zm2.7-1.6c.7-1.5 1.1-3.4 1.2-5.4h3a8 8 0 0 1-4.2 5.4Z';
const HALF_DISC = 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2v16a8 8 0 0 1 0-16Z';

export default function Footer({ year, children }) {
  const isCurrent = useIsCurrent();
  const { theme, setTheme, language, setLanguage } = usePreferences();
  // The pickers open one at a time.
  const [openPicker, setOpenPicker] = useState(null);
  const themeName = THEMES.find((option) => option.value === theme)?.label ?? 'Dark';

  return (
    <footer className="site-footer">
      <div className="site-footer__band mx-auto w-[calc(100%-2.5rem)] max-w-shell">
        <div className="site-footer__mast">
          <p className="site-footer__wordmark">Delux Financial Solutions</p>
          <p className="site-footer__tagline">
            Credit you understand and control, built in Houston, Texas.
          </p>
          <ul className="social">
            {SOCIAL.map((profile) => (
              <li key={profile.name}>
                <a href={profile.href} rel="me noopener" target="_blank" aria-label={profile.name}>
                  <Icon name={profile.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__aside">
          <p className="site-footer__reach">
            <a href={PHONE.href}>{PHONE.label}</a> <a href={EMAIL.href}>{EMAIL.label}</a>
          </p>
          <nav className="site-footer__links" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isCurrent(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="chrome">
            <Picker
              id="picker-lang"
              name="lang"
              label="Language"
              icon={GLOBE}
              value={language.toUpperCase()}
              options={LANGUAGES}
              selected={language}
              onSelect={setLanguage}
              open={openPicker === 'picker-lang'}
              onOpen={setOpenPicker}
            />
            <Picker
              id="picker-theme"
              name="theme"
              label="Theme"
              icon={HALF_DISC}
              value={themeName}
              triggerLabel={`Theme: ${themeName}`}
              options={THEMES}
              selected={theme}
              onSelect={setTheme}
              open={openPicker === 'picker-theme'}
              onOpen={setOpenPicker}
            />
          </div>
        </div>
      </div>
      <div className="site-footer__legal mx-auto w-[calc(100%-2.5rem)] max-w-shell">
        <p>
          Delux L Avello LLC provides credit education, credit-building support and financial
          guidance. Results vary by individual. We do not guarantee specific score increases,
          removal of accurate information or approval for financing. Delux L Avello LLC is not a law
          firm and does not provide legal representation.
        </p>
        {/* Which wording binds is a question only a translated site raises, so
            the answer only shows on the translated site. */}
        <p className="site-footer__note">
          This site is published in English. The Spanish version is provided for convenience, and
          the English version governs.
        </p>
        <p>
          &copy; <span>{year}</span> Delux L Avello LLC. All rights reserved.
        </p>
      </div>
      {children}
    </footer>
  );
}
