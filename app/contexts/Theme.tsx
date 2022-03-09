import {
  createContext,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSetColorMode = () => {
      setTheme(media.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', handleSetColorMode);

    handleSetColorMode();

    return () => {
      media.removeEventListener('change', handleSetColorMode);
    };
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
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export function useThemeValue(light: React.ReactNode, dark: React.ReactNode) {
  const { theme } = useTheme();

  return theme === 'light' ? light : dark;
}

export default ThemeProvider;
