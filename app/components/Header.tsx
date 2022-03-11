import { Link } from 'remix';

export default function Header() {
  return (
    <header className="shadow dark:bg-moon-800">
      <div className="container-lg flex items-center justify-center py-3">
        <Link to="/" className="button text-lg" aria-label="Home page">
          🚀 Snippets
        </Link>
      </div>
    </header>
  );
}
