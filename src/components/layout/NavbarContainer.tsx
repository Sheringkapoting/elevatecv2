
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import MobileMenu from "./MobileMenu";

const NavbarContainer = () => {
  const { user, session, profileImage, userName, signOut } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleLoginSuccess = () => {
      setLoginDialogOpen(false);
      setRegisterDialogOpen(false);
    };
    
    window.addEventListener('login:success', handleLoginSuccess);
    
    return () => {
      window.removeEventListener('login:success', handleLoginSuccess);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setLoginDialogOpen(false);
      setRegisterDialogOpen(false);
    }
  }, [user]);

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setRegisterDialogOpen(true);
  };

  const switchToRegister = () => {
    setLoginDialogOpen(false);
    setRegisterDialogOpen(true);
  };

  const switchToLogin = () => {
    setRegisterDialogOpen(false);
    setLoginDialogOpen(true);
  };

  const handleLogout = async () => {
    try {
      // First navigate to home page
      navigate("/");
      
      // Then handle the signout process
      await signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProtectedLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this feature.",
        variant: "destructive",
      });
      openLoginDialog();
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <Navbar
        isAuthenticated={!!user}
        profileImage={profileImage}
        userName={userName}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        handleLogout={handleLogout}
        handleProtectedLink={handleProtectedLink}
      />
      
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isAuthenticated={!!user}
        profileImage={profileImage}
        userName={userName}
        handleProtectedLink={handleProtectedLink}
        handleLogout={handleLogout}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
      />
      
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <LoginForm onSwitchToRegister={switchToRegister} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <RegisterForm onSwitchToLogin={switchToLogin} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavbarContainer;
