
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const NavbarContainer = () => {
  const { user, session, profileImage, userName, signIn, signUp, signOut, signInWithGoogle, signInWithLinkedIn, signInWithMicrosoft } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleProtectedLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!user) {
      e.preventDefault();
      toast({
        title: "Authentication required",
        description: "Please log in to access this feature.",
        variant: "destructive",
      });
      openLoginDialog();
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
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <LoginForm onSwitchToRegister={switchToRegister} />
        </DialogContent>
      </Dialog>
      
      {/* Register Dialog */}
      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <RegisterForm onSwitchToLogin={switchToLogin} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavbarContainer;
