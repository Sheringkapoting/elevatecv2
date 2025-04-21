
import { Link } from "react-router-dom";

interface NavLinksProps {
  isAuthenticated: boolean;
  handleProtectedLink: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

// Always renders in this order: Home | Dashboard | Resume Analysis | Resume Builder
const NavLinks = ({ isAuthenticated, handleProtectedLink }: NavLinksProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8 mx-auto">
      <Link to="/" className="px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50">
        Home
      </Link>
      <Link to="/dashboard" className="px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50">
        Dashboard
      </Link>
      <Link
        to="/analyze"
        className="px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50"
        onClick={e => handleProtectedLink(e, "/analyze")}
      >
        Resume Analysis
      </Link>
      <Link
        to="/builder"
        className="px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50"
        onClick={e => handleProtectedLink(e, "/builder")}
      >
        Resume Builder
      </Link>
    </div>
  );
};

export default NavLinks;
