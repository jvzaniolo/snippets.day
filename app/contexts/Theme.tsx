import { createContext, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | undefined;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : undefined
  );

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)');

    function onChange() {
      setTheme(media.matches ? 'dark' : 'light');
    }

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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

/**
 * Fix flickering on dark mode when reloading the page, but introduces a hydration error:
 * `Extra attributes from the server: class` at html
 */
export function ThemeScripts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `;(() => {
          let media = window.matchMedia('(prefers-color-scheme: dark)')

          if (media.matches) {
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
