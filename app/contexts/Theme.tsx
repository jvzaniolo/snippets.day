import { createContext, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | undefined;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const MEDIA = window.matchMedia('(prefers-color-scheme: dark)');
const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'object') return undefined;

    return MEDIA.matches ? 'dark' : 'light';
  });

  useEffect(() => {
    function onChange() {
      setTheme(MEDIA.matches ? 'dark' : 'light');
    }

    MEDIA.addEventListener('change', onChange);

    return () => MEDIA.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  let context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export function useThemeValue<T>(light: T, dark: T) {
  let { theme } = useTheme();

  return theme === 'light' ? light : dark;
}

export function ThemeScripts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `;(() => {
          if (${JSON.stringify(MEDIA)}.matches) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        })();`,
      }}
    />
  );
}

export default ThemeProvider;
