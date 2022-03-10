import { Link } from 'remix';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container-lg flex items-center justify-center py-3">
        <Link to="/" className="button text-lg" aria-label="Home page">
          🚀 Snippets
        </Link>

        {/* <div className="flex items-center"> */}
        {/* <Link to="/login" className="button ghost">
            Login
          </Link>

          <Link to="/sign-up" className="button primary ml-2">
            Create Account
          </Link> */}
        {/* </div> */}
      </div>
    </header>
  );
};

export default Header;
