
import { Link } from "react-router-dom";
import { BarChart2, FileText, Home } from "lucide-react";

interface NavLinksProps {
  handleProtectedLink: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const NavLinks = ({ handleProtectedLink }: NavLinksProps) => {
  return (
    <div className="hidden md:flex md:ml-10 md:items-center md:space-x-8">
      <Link
        to="/"
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <Home className="mr-1 h-4 w-4" />
        Home
      </Link>
      
      <a
        href="/dashboard"
        onClick={(e) => handleProtectedLink(e, "/dashboard")}
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <BarChart2 className="mr-1 h-4 w-4" />
        Dashboard
      </a>

      <a
        href="/builder"
        onClick={(e) => handleProtectedLink(e, "/builder")}
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <FileText className="mr-1 h-4 w-4" />
        Resume Builder
      </a>
      
      <a
        href="/analyze"
        onClick={(e) => handleProtectedLink(e, "/analyze")}
        className="text-gray-700 hover:text-primary inline-flex items-center"
      >
        <FileText className="mr-1 h-4 w-4" />
        Resume Analysis
      </a>
    </div>
  );
};

export default NavLinks;
