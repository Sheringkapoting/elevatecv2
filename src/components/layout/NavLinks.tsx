
import { Link } from "react-router-dom";
import { BarChart2, FileText, Home, FilePen } from "lucide-react";

interface NavLinksProps {
  handleProtectedLink: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const NavLinks = ({ handleProtectedLink }: NavLinksProps) => {
  return (
    <div className="hidden md:flex md:ml-10 md:items-center md:space-x-8">
      <Link
        to="/"
        className="text-primary-600 hover:text-primary-700 inline-flex items-center"
      >
        <Home className="mr-1 h-4 w-4" />
        Home
      </Link>
      
      <a
        href="/dashboard"
        onClick={(e) => handleProtectedLink(e, "/dashboard")}
        className="text-gray-700 hover:text-primary-600 inline-flex items-center"
      >
        <BarChart2 className="mr-1 h-4 w-4" />
        Dashboard
      </a>

      {/* Changed from "a" tag with click handler to direct Link for Resume Analysis */}
      <Link
        to="/analyze"
        className="text-gray-700 hover:text-primary-600 inline-flex items-center"
      >
        <FileText className="mr-1 h-4 w-4" />
        Resume Analysis
      </Link>
      
      <a
        href="/builder"
        onClick={(e) => handleProtectedLink(e, "/builder")}
        className="text-gray-700 hover:text-primary-600 inline-flex items-center"
      >
        <FilePen className="mr-1 h-4 w-4" />
        Resume Builder
      </a>
    </div>
  );
};

export default NavLinks;
