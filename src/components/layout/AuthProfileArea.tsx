
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogIn } from "lucide-react";

interface AuthProfileAreaProps {
  isAuthenticated: boolean;
  profileImage: string | null;
  userName: string | null;
  openLoginDialog: () => void;
  openRegisterDialog: () => void;
  handleLogout: () => void;
}

const AuthProfileArea = ({
  isAuthenticated,
  profileImage,
  userName,
  openLoginDialog,
  openRegisterDialog,
  handleLogout,
}: AuthProfileAreaProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
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
            className="text-primary-600 border-primary-600 hover:bg-primary-50"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            className="text-primary-600 border-primary-600 hover:bg-primary-50 inline-flex items-center"
            onClick={openLoginDialog}
          >
            <LogIn className="mr-1 h-4 w-4" />
            Sign In
          </Button>
          <Button
            className="bg-primary-600 hover:bg-primary-700 text-white"
            onClick={openRegisterDialog}
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthProfileArea;
