
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginFormFields } from "./LoginFormFields";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">Sign In</DialogTitle>
      </DialogHeader>
      
      <LoginFormFields />
      <SocialLoginButtons />
      
      <div className="space-y-2 text-center text-sm">
        <div>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div>
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-medium text-primary hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
