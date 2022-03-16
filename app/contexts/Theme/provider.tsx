import { createContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from './types';

type ThemeContextValue = {
  theme: Theme | null;
  setTheme: (newValue: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, rawSetTheme] = useState(() => {
    if (typeof window === 'undefined') return null;

    let rootClass = document.documentElement.classList;
    let initialTheme: Theme = rootClass.contains('dark') ? 'dark' : 'light';

    sessionStorage.setItem('theme', initialTheme);

    return initialTheme;
  });

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    function onChange() {
      rawSetTheme(media.matches ? 'dark' : 'light');
    }

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    let root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      sessionStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      sessionStorage.setItem('theme', 'light');
    }
  }, [theme]);

  let themeValue = useMemo(() => {
    return {
      theme,
      setTheme: rawSetTheme,
    };
  }, [theme, rawSetTheme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}
