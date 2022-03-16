import type { Theme } from './types';

function clientCode() {
  let mql = window.matchMedia('(prefers-color-scheme: dark)');
  let persistedTheme = sessionStorage.getItem('theme') as Theme | null;
  let initialTheme: Theme = persistedTheme || (mql.matches ? 'dark' : 'light');

  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function ThemeScripts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `;(${String(clientCode)})();`,
      }}
    />
  );
}
