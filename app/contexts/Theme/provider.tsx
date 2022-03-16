import { createContext, useEffect, useState, useMemo, useRef } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { Theme } from './types';
import { useFetcher } from 'remix';

type ThemeContextValue = {
  theme: Theme | undefined;
  setTheme: Dispatch<SetStateAction<Theme | undefined>>;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeProvider({ children, initialValue }: { children: ReactNode; initialValue: Theme }) {
  let [theme, setTheme] = useState(() => {
    if (initialValue) {
      return initialValue;
    }

    if (typeof window === 'undefined') return undefined;

    let cl = document.documentElement.classList;

    if (cl.contains('dark')) return Theme.DARK;
    if (cl.contains('light')) return Theme.LIGHT;
  });

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let onChange = () => {
      setTheme(media.matches ? Theme.DARK : Theme.LIGHT);
    };

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  /* Remove this once useFetcher is properly memoized */
  let fetcher = useFetcher();
  let fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  let isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    if (!theme) return;

    fetcherRef.current.submit({ theme }, { method: 'post', action: 'action/set-theme' });
  }, [theme]);
  /* Remove  */

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
