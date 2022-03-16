import { Link } from 'remix';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme, useThemeValue } from '~/contexts/Theme';

export default function Header() {
  let { theme, setTheme } = useTheme();
  let icon = useThemeValue(<FiMoon />, <FiSun />);

  return (
    <header className="sticky top-0 bg-white shadow dark:bg-moon-800">
      <div className="container-lg flex items-center justify-between py-3">
        <Link to="/" className="button text-lg" aria-label="Home page">
          🚀 Snippets
        </Link>

        <nav className="flex">
          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="button ghost icon"
            aria-label="toggle theme"
          >
            {icon}
          </button>
          <Link to="/login" className="button ghost">
            Login
          </Link>
          <Link to="/sign-up" className="button primary ml-2">
            Create Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
