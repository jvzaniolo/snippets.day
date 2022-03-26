import { Link } from 'remix';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme, useThemeValue } from '~/contexts/Theme';
import { useSession } from '~/contexts/Session';
import supabase from '~/services/supabase';

export default function Header() {
  const { session } = useSession();
  const { toggleTheme } = useTheme();
  const icon = useThemeValue(<FiMoon />, <FiSun />);

  return (
    <header className="sticky top-0 bg-white shadow dark:bg-moon-800">
      <div className="container-lg flex items-center justify-between py-3">
        <Link to="/" className="button text-lg" aria-label="Home page">
          🚀 Snippets
        </Link>

        <nav className="flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="button ghost icon"
            aria-label="toggle theme"
          >
            {icon}
          </button>

          {session ? (
            <button
              className="button primary ml-2"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/sign-in" className="button ghost">
                Sign In
              </Link>
              <Link to="/sign-up" className="button primary ml-2">
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
