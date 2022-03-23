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
import SessionProvider from '~/contexts/Session';
import ThemeProvider, { ThemeScript, useTheme } from '~/contexts/Theme';
import styles from '~/styles/tailwind.min.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: undefined,
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Code+Pro:wght@200;300;400;500;600;700;800;900&display=swap',
    },
    { rel: 'stylesheet', href: styles },
  ];
};

export const meta: MetaFunction = () => {
  return { title: 'Snippets' };
};

export const loader: LoaderFunction = async () => {
  return json({
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  });
};

function App() {
  const { env } = useLoaderData();
  const { theme } = useTheme();

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-moon-900 dark:bg-moon-900 dark:text-white">
        <SessionProvider>
          <Header />
          <Outlet />
        </SessionProvider>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <ThemeScript />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
