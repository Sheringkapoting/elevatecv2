
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Linkedin } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const SocialLoginButtons = () => {
  const { toast } = useToast();
  const { signInWithLinkedIn, signInWithMicrosoft } = useAuth();

  const handleLinkedInLogin = async () => {
    try {
      await signInWithLinkedIn();
    } catch (error) {
      toast({
        title: "Error signing in with LinkedIn",
        description: "There was a problem with LinkedIn authentication.",
        variant: "destructive",
      });
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await signInWithMicrosoft();
    } catch (error) {
      toast({
        title: "Error signing in with Microsoft",
        description: "There was a problem with Microsoft authentication.",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === "LinkedIn") {
      handleLinkedInLogin();
    } else if (provider === "Microsoft") {
      handleMicrosoftLogin();
    } else {
      toast({
        title: "Social login not implemented",
        description: `${provider} login will be available in the full version.`,
      });
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => handleSocialLogin("Google")}
        >
          <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
              fill="#EA4335"
            />
            <path
              d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
              fill="#4285F4"
            />
            <path
              d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
              fill="#FBBC05"
            />
            <path
              d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
              fill="#34A853"
            />
          </svg>
          Google
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => handleSocialLogin("LinkedIn")}
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => handleSocialLogin("Microsoft")}
        >
          <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M11.4008 2H2V11.4008H11.4008V2Z" fill="#F25022" />
            <path d="M11.4008 12.5992H2V22H11.4008V12.5992Z" fill="#00A4EF" />
            <path d="M22 2H12.5992V11.4008H22V2Z" fill="#7FBA00" />
            <path d="M22 12.5992H12.5992V22H22V12.5992Z" fill="#FFB900" />
          </svg>
          Microsoft
        </Button>
      </div>
    </>
  );
};
