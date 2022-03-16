import { useContext } from 'react';
import { isTheme, ThemeContext } from './provider';

export function useTheme() {
  let context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export function useThemeValue<T>(light: T, dark: T) {
  let { theme } = useTheme();

  return isTheme(theme) && theme === 'dark' ? light : dark;
}
