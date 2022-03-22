import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeValue = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, rawSetTheme] = useState(() => {
    if (typeof window === 'undefined') return null;

    const storedTheme = window.sessionStorage.getItem('theme');

    if (storedTheme) return storedTheme as Theme;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Theme.DARK;
    }

    return Theme.LIGHT;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      rawSetTheme(mediaQueryList.matches ? Theme.DARK : Theme.LIGHT);
    };

    mediaQueryList.addEventListener('change', onChange);

    return () => mediaQueryList.removeEventListener('change', onChange);
  }, []);

  function setTheme(newTheme: Theme) {
    window.sessionStorage.setItem('theme', newTheme);

    rawSetTheme(newTheme);
  }

  function toggleTheme() {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function isTheme(value: unknown): value is Theme {
  return value === Theme.LIGHT || value === Theme.DARK;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export function useThemeValue<T>(light: T, dark: T) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return theme === Theme.LIGHT ? light : dark;
}

export function ThemeScript() {
  function clientCode() {
    let root = document.documentElement;
    let theme = window.sessionStorage.getItem('theme');

    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }

    if (theme === 'dark') root.classList.add('dark');
    if (theme === 'light') root.classList.remove('dark');
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `;(${String(clientCode)})();`,
      }}
    />
  );
}
