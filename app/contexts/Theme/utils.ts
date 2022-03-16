import { Theme } from './types';

export function isTheme(theme: unknown): theme is Theme {
  return theme === 'light' || theme === 'dark';
}
