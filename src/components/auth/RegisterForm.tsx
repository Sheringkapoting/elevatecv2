
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RegisterFormFields } from "./RegisterFormFields";
import { SocialSignupButtons } from "./SocialSignupButtons";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">Create Account</DialogTitle>
      </DialogHeader>
      
      <RegisterFormFields />
      
      <SocialSignupButtons />
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
