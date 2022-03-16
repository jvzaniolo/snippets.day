import { createContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const themes: Array<Theme> = Object.values(Theme);

type ThemeContextValue = {
  theme: Theme | null;
  setTheme: (newValue: Theme) => void;
  toggleTheme: () => void;
};

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme);
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode; initialValue: Theme | null }) {
  let [theme, rawSetTheme] = useState(() => {
    if (typeof window === 'undefined') return null;

    return document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT;
  });

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    function onChange() {
      rawSetTheme(media.matches ? Theme.DARK : Theme.LIGHT);
    }

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    let root = document.documentElement;

    if (theme === Theme.DARK) {
      root.classList.add(Theme.DARK);
    } else {
      root.classList.remove(Theme.LIGHT);
    }
  }, [theme]);

  let themeValue = useMemo(() => {
    return {
      theme,
      setTheme: rawSetTheme,
      toggleTheme: () => rawSetTheme(prev => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)),
    };
  }, [theme, rawSetTheme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

export { isTheme, ThemeContext };
export default ThemeProvider;
