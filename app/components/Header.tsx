import { Link } from 'remix';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container-lg flex items-center justify-between py-3">
        <Link to="/" className="button">
          🚀 Snippets
        </Link>

        <div className="flex items-center">
          <Link to="/login" className="button ghost">
            Login
          </Link>

          <Link to="/sign-up" className="button primary ml-2">
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
