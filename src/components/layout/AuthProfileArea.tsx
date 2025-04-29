
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { User, Settings, HelpCircle, Mail, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10 border border-primary-600" title={userName || ''}>
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={userName || 'User'} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-6 w-6 text-primary-600" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{userName?.split('@')[0] || 'User'}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md p-1">
              <DropdownMenuItem 
                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" 
                onClick={() => navigateTo('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" 
                onClick={() => navigateTo('/settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" 
                onClick={() => navigateTo('/help')}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" 
                onClick={() => navigateTo('/contact')}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>Contact Us</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
              
              <DropdownMenuItem 
                className="flex items-center px-3 py-2 text-sm cursor-pointer text-red-500 hover:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            className="text-primary-600 border-primary-600 hover:bg-primary-50 inline-flex items-center"
            onClick={openLoginDialog}
          >
            <LogOut className="mr-1 h-4 w-4" />
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
