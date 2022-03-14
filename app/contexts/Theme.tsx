import { createContext, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark' | undefined;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'object') {
      return undefined;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)');

    function onChange() {
      setTheme(media.matches ? 'dark' : 'light');
    }

    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

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

const clientThemeScript = `;(() => {
  let media = window.matchMedia('(prefers-color-scheme: dark)')

  if (media.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})();`;

export function ThemeScripts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: clientThemeScript,
      }}
    />
  );
}

export default ThemeProvider;
