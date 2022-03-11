import { FiMoon, FiSun } from 'react-icons/fi';
import { Link } from 'remix';
import { useTheme, useThemeValue } from '~/contexts/Theme';

export default function Header() {
  let { toggleTheme } = useTheme();
  let icon = useThemeValue(<FiMoon />, <FiSun />);

  return (
    <header className="shadow dark:bg-moon-800">
      <div className="container-lg flex items-center justify-between py-3">
        <Link to="/" className="button text-lg" aria-label="Home page">
          🚀 Snippets
        </Link>

        <ul>
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="button ghost icon"
              aria-label="toggle theme"
            >
              {icon}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
