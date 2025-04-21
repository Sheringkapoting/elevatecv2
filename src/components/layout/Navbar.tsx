import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, BarChart2, Home, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import NavLinks from "./NavLinks";
import AuthProfileArea from "./AuthProfileArea";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, session, profileImage, userName, signOut } = useAuth();

  const isAuthenticated = !!user;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProtectedLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to access this feature.",
        variant: "destructive",
      });
      setLoginDialogOpen(true);
    } else {
      navigate(path);
    }
  };

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
    setRegisterDialogOpen(false);
  };

  const openRegisterDialog = () => {
    setRegisterDialogOpen(true);
    setLoginDialogOpen(false);
  };

  const handleSwitchToRegister = () => {
    setLoginDialogOpen(false);
    setRegisterDialogOpen(true);
  };

  const handleSwitchToLogin = () => {
    setRegisterDialogOpen(false);
    setLoginDialogOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out."
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 py-4 px-4 md:px-8 fixed w-full top-0 left-0 z-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-primary-600">Elevate CV (.NET)</span>
            </Link>

            <NavLinks
              isAuthenticated={isAuthenticated}
              handleProtectedLink={handleProtectedLink}
            />

            <AuthProfileArea
              isAuthenticated={isAuthenticated}
              profileImage={profileImage}
              userName={userName}
              openLoginDialog={openLoginDialog}
              openRegisterDialog={openRegisterDialog}
              handleLogout={handleLogout}
            />

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isAuthenticated={isAuthenticated}
          profileImage={profileImage}
          userName={userName}
          handleProtectedLink={handleProtectedLink}
          handleLogout={handleLogout}
          openLoginDialog={openLoginDialog}
          openRegisterDialog={openRegisterDialog}
        />
      </nav>

      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <LoginForm onSwitchToRegister={handleSwitchToRegister} />
        </DialogContent>
      </Dialog>

      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
