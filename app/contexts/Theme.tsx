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

function isTheme(value: unknown): value is Theme {
  return value === Theme.LIGHT || value === Theme.DARK;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
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
    let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    let onChange = () => {
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

function useTheme() {
  let context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

function useThemeValue<T>(light: T, dark: T) {
  let { theme } = useTheme();
  let [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return theme === Theme.LIGHT ? light : dark;
}

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

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `;(${String(clientCode)})();`,
      }}
    />
  );
}

export { ThemeScript, useTheme, useThemeValue };
export default ThemeProvider;
