
import { Link } from "react-router-dom";
import { BarChart2, FileText, Home, User } from "lucide-react";

interface NavLinksProps {
  isAuthenticated: boolean;
  handleProtectedLink: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const NavLinks = ({ isAuthenticated, handleProtectedLink }: NavLinksProps) => {
  return (
    <div className="hidden md:flex md:ml-10 md:items-center md:space-x-8">
      <Link
        to="/"
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <Home className="mr-1 h-4 w-4" />
        Home
      </Link>
      <Link
        to="/dashboard"
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <BarChart2 className="mr-1 h-4 w-4" />
        Dashboard
      </Link>
      <a
        href="/analyze"
        onClick={(e) => handleProtectedLink(e, "/analyze")}
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <FileText className="mr-1 h-4 w-4" />
        Resume Analysis
      </a>
      {isAuthenticated && (
        <Link
          to="/profile"
          className="text-gray-700 hover:text-primary inline-flex items-center"
        >
          <User className="mr-1 h-4 w-4" />
          My Profile
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
