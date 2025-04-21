
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

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
    <Navbar
      isAuthenticated={!!user}
      profileImage={profileImage}
      userName={userName}
      openLoginDialog={openLoginDialog}
      openRegisterDialog={openRegisterDialog}
      handleLogout={handleLogout}
      handleProtectedLink={handleProtectedLink}
    />
  );
};

export default NavbarContainer;
