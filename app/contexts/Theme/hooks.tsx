import { useContext } from 'react';
import { isTheme } from './utils';
import { ThemeContext } from './provider';

function useTheme() {
  let context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

function useThemeValue<T>(light: T, dark: T) {
  let { theme } = useTheme();

  return isTheme(theme) && theme === 'dark' ? light : dark;
}

export { useTheme, useThemeValue };
