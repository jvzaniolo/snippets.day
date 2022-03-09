import { Link } from 'remix';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme, useThemeValue } from '~/contexts/theme';
// import Avatar from './Avatar';
// import AvatarMenu from './AvatarMenu';

// type Profile = {
//   firstName: string;
//   lastName: string;
// };

const Header = () => {
  // const session = useSession();
  const { toggleTheme } = useTheme();
  const icon = useThemeValue(<FiMoon />, <FiSun />);
  // const [profile, setProfile] = React.useState<Profile | undefined>(undefined);

  return (
    <header className="border border-b bg-white dark:bg-moon-800">
      <div className="container-lg flex items-center justify-between py-3">
        <Link to="/" className="button">
          🚀 Snippets
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="button ghost icon"
          >
            {icon}
          </button>

          {/* {session?.user ? (
            <AvatarMenu className="ml-2 h-8 w-8">
              <Avatar firstName={profile?.firstName} lastName={profile?.lastName} />
            </AvatarMenu>
          ) : ( */}
          <>
            <Link to="/login" className="button ghost">
              Login
            </Link>

            <Link to="/sign-up" className="button primary ml-2">
              Create Account
            </Link>
          </>
          {/* )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
