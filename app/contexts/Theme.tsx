import { createContext, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | null;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * @description Known issue: When in dark mode, the page blinks in the first render because the 'light' styles are the Tailwind's default
 */
function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme | null>(() =>
    typeof window !== 'undefined' ? (window.localStorage.getItem('theme') as Theme) : null
  );

  useEffect(() => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
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

export function useThemeValue(light: React.ReactNode, dark: React.ReactNode) {
  let { theme } = useTheme();

  return theme === 'light' ? light : dark;
}

export default ThemeProvider;
