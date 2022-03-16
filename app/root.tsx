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
import Header from '~/components/Header';
import ThemeProvider, { getThemeSession, useTheme, ThemeScript } from '~/contexts/Theme';
import styles from '~/styles/tailwind.min.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
  return { title: 'Snippets' };
};

export const loader: LoaderFunction = async ({ request }) => {
  let themeSession = await getThemeSession(request);

  return json({
    theme: themeSession.theme,
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  });
};

function App() {
  let { env, theme: ssrTheme } = useLoaderData();
  let { theme } = useTheme();

  return (
    <html lang="en" className={theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ThemeScript ssr={ssrTheme} />
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
  let { theme } = useLoaderData();

  return (
    <ThemeProvider initialValue={theme}>
      <App />
    </ThemeProvider>
  );
}
