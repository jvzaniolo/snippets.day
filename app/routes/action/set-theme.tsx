import { ActionFunction, json, redirect } from 'remix';
import { getThemeSession, isTheme } from '~/contexts/Theme';

export const action: ActionFunction = async ({ request }) => {
  let themeSession = await getThemeSession(request);
  let formData = await request.formData();
  let theme = formData.get('theme');

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  themeSession.setTheme(theme);

  return json(
    { success: true },
    { headers: { 'Set-Cookie': await themeSession.commit() } }
  );
};

export const loader = () => redirect('/', { status: 404 });
