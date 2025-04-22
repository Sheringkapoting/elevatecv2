
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
      
      <div className="relative -mb-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
      </div>
      
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
