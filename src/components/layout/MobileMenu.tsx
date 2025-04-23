
import { Link } from "react-router-dom";
import { FileText, BarChart2, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  profileImage: string | null;
  userName: string | null;
  handleProtectedLink: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
  handleLogout: () => void;
  openLoginDialog: () => void;
  openRegisterDialog: () => void;
}

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  isAuthenticated,
  profileImage,
  userName,
  handleProtectedLink,
  handleLogout,
  openLoginDialog,
  openRegisterDialog,
}: MobileMenuProps) => {
  if (!isMenuOpen) return null;
  return (
    <div className="md:hidden mt-4">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link to="/"
          className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <Home className="mr-2 h-5 w-5" />
          Home
        </Link>
        
        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link
              to="/builder"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="mr-2 h-5 w-5" />
              Resume Builder
            </Link>
          </>
        )}
        
        <a
          href="/analyze"
          onClick={(e) => {
            handleProtectedLink(e, "/analyze");
            setIsMenuOpen(false);
          }}
          className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
        >
          <FileText className="mr-2 h-5 w-5" />
          Resume Analysis
        </a>
        
        {isAuthenticated && (
          <Link
            to="/profile"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="mr-2 h-5 w-5" />
            My Profile
          </Link>
        )}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-5">
          {isAuthenticated ? (
            <>
              <Avatar className="h-10 w-10 border border-primary-600" title={userName || ''}>
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={userName || 'User'} />
                ) : (
                  <AvatarFallback>
                    <User className="h-6 w-6 text-primary-600" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Button
                variant="outline"
                className="w-full ml-2 text-primary-600 border-primary-600 hover:bg-primary-50"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full mr-2 text-primary-600 border-primary-600 hover:bg-primary-50"
                onClick={() => {
                  openLoginDialog();
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                onClick={() => {
                  openRegisterDialog();
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
