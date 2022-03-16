import { createCookieSessionStorage } from 'remix';
import type { Theme } from './types';

const themeCookie = createCookieSessionStorage({
  cookie: { name: 'theme', secrets: ['some-secret'] },
});

async function getThemeSession(request: Request) {
  let session = await themeCookie.getSession(request.headers.get('Cookie'));

  return {
    theme: session.get('theme'),
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeCookie.commitSession(session),
  };
}

export { getThemeSession };
