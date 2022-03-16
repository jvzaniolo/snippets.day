import { Theme } from './types';

function clientCode() {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;

  let cl = document.documentElement.classList;
  let themeAlreadyApplied = cl.contains('light') || cl.contains('dark');

  if (!themeAlreadyApplied) {
    cl.add(theme);
  }
}

function ThemeScript({ ssr }: { ssr: Theme }) {
  return ssr ? null : (
    <script
      dangerouslySetInnerHTML={{
        __html: `;(${String(clientCode)})();`,
      }}
    />
  );
}

export { ThemeScript };
