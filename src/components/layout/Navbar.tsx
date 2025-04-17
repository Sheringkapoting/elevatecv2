import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, BarChart2, Home, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

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

  return (
    <>
      <nav className="bg-white border-b border-gray-200 py-4 px-4 md:px-8 fixed w-full top-0 left-0 z-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-primary-600">Elevate CV (.NET)</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50">
                Home
              </Link>
              <a
                href="/analyze"
                onClick={(e) => handleProtectedLink(e, "/analyze")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50"
              >
                Resume Analysis
              </a>
              <a
                href="/builder"
                onClick={(e) => handleProtectedLink(e, "/builder")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50"
              >
                Resume Builder
              </a>
              <a
                href="/dashboard"
                onClick={(e) => handleProtectedLink(e, "/dashboard")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50"
              >
                Dashboard
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="text-primary-600 border-primary-600 hover:bg-primary-50"
                onClick={openLoginDialog}
              >
                Sign In
              </Button>
              <Button 
                className="bg-primary-600 hover:bg-primary-700 text-white"
                onClick={openRegisterDialog}
              >
                Get Started
              </Button>
            </div>

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

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50">
                <Home className="mr-2 h-5 w-5" />
                Home
              </Link>
              <a
                href="/analyze"
                onClick={(e) => handleProtectedLink(e, "/analyze")}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              >
                <FileText className="mr-2 h-5 w-5" />
                Resume Analysis
              </a>
              <a
                href="/builder"
                onClick={(e) => handleProtectedLink(e, "/builder")}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              >
                <User className="mr-2 h-5 w-5" />
                Resume Builder
              </a>
              <a
                href="/dashboard"
                onClick={(e) => handleProtectedLink(e, "/dashboard")}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <Button 
                  variant="outline" 
                  className="w-full mr-2 text-primary-600 border-primary-600 hover:bg-primary-50"
                  onClick={openLoginDialog}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={openRegisterDialog}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
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
