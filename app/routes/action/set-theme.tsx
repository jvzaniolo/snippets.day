import { ActionFunction, json, redirect } from 'remix';
import { Theme, getThemeSession } from '~/contexts/Theme';

export const action: ActionFunction = async ({ request }) => {
  let themeSession = await getThemeSession(request);
  let formData = await request.formData();
  let theme = formData.get('theme') as Theme;

  themeSession.setTheme(theme);

  return json(true, {
    headers: {
      'Set-Cookie': await themeSession.commit(),
    },
  });
};

export const loader = () => redirect('/', { status: 404 });

export default function MarkRead() {
  return <div>Oops... You should not see this.</div>;
}
