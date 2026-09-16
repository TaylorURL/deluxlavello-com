import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// The head script has already put the stored theme and language on the document
// before the first paint. These start from the served defaults so the adopted
// markup matches, then take the stored values once the page is running.

const Preferences = createContext(null);

const THEME_KEY = 'delux-theme';
const LANG_KEY = 'delux-lang';

const readStored = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const remember = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // A browser refusing storage still gets the change for this page view.
  }
};

const systemDark = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const applyTheme = (choice) => {
  const root = document.documentElement;
  root.setAttribute('data-theme-choice', choice);
  root.setAttribute('data-theme', choice === 'system' ? (systemDark() ? 'dark' : 'light') : choice);
  // The browser chrome takes its colour from the strip at the top of the page,
  // so the two read as one edge whichever theme is showing.
  const meta = document.querySelector('meta[name="theme-color"]');
  const top = document.querySelector('.utility') ?? document.body;
  if (meta) meta.setAttribute('content', getComputedStyle(top).backgroundColor);
};

export function PreferencesProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Read once after adoption, which is the only moment storage can be read
    // without the server and the browser disagreeing about the markup.
    /* eslint-disable react-hooks/set-state-in-effect */
    setThemeState(readStored(THEME_KEY) || 'light');
    setLanguageState(readStored(LANG_KEY) === 'es' ? 'es' : 'en');
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    applyTheme(theme);
    if (theme !== 'system') return undefined;
    // Following the system means following it as it changes, not only at load.
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = () => applyTheme('system');
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, [theme]);

  const setTheme = useCallback((choice) => {
    remember(THEME_KEY, choice);
    setThemeState(choice);
  }, []);

  const setLanguage = useCallback((choice) => {
    remember(LANG_KEY, choice);
    setLanguageState(choice);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, language, setLanguage }),
    [theme, setTheme, language, setLanguage],
  );
  return <Preferences.Provider value={value}>{children}</Preferences.Provider>;
}

export const usePreferences = () => useContext(Preferences);
