import { createContext, useEffect, useState, useMemo, useRef } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { Theme } from './types';
import { useFetcher } from 'remix';

type ThemeContextValue = {
  theme: Theme | null;
  setTheme: Dispatch<SetStateAction<Theme | null>>;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children, initialValue }: { children: ReactNode; initialValue: Theme }) {
  let [theme, setTheme] = useState(() => {
    if (initialValue) {
      return initialValue;
    }

    if (typeof window === 'undefined') return null;

    return document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT;
  });

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let onChange = () => {
      setTheme(media.matches ? Theme.DARK : Theme.LIGHT);
    };

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  let fetcher = useFetcher();
  let fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  let mount = useRef(false);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
      return;
    }
    if (!theme) return;

    fetcherRef.current.submit({ theme }, { method: 'post', action: 'action/set-theme' });
  }, [theme]);

  let themeValue = useMemo(() => {
    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(prev => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)),
    };
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

export { Theme, ThemeContext };
export default ThemeProvider;
