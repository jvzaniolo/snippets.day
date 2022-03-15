import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import ThemeProvider, { ThemeScripts, useTheme, useThemeValue } from '~/contexts/Theme';
import Header from '~/components/Header';
import styles from '~/styles/tailwind.min.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
  return { title: 'Snippets' };
};

export const loader: LoaderFunction = () => {
  return json({
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  });
};

function App() {
  let { env } = useLoaderData();
  let className = useThemeValue('', 'dark');

  return (
    <html lang="en" className={className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ThemeScripts />
      </head>
      <body className="bg-white text-moon-900 dark:bg-moon-900 dark:text-white">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(env)}` }} />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
