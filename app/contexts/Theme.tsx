import { createContext, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | undefined;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * @description Known issue: When in dark mode, the page blinks in the first render because the 'light' styles are the Tailwind's default
 */
function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : undefined
  );

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

export default ThemeProvider;
