
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import React from "react";

interface SocialAuthButtonsProps {
  isLoading: boolean;
  setIsLoading?: (v: boolean) => void; // Only needed for forms that manage loading state
  context?: "login" | "signup";
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ isLoading, setIsLoading, context = "login" }) => {
  const { toast } = useToast();
  const { signInWithGoogle, signInWithLinkedIn, signInWithMicrosoft } = useAuth();

  const handleSocial = async (provider: "Google" | "LinkedIn" | "Microsoft") => {
    try {
      setIsLoading?.(true);
      if (provider === "Google") return await signInWithGoogle();
      if (provider === "LinkedIn") return await signInWithLinkedIn();
      if (provider === "Microsoft") return await signInWithMicrosoft();
      toast({
        title: "Social login not implemented",
        description: `${provider} will be available in the full version.`,
      });
    } catch (error) {
      console.error(`Error during ${provider} login:`, error);
      toast({
        title: `Error signing in with ${provider}`,
        description: `There was a problem with ${provider} authentication.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading?.(false);
    }
  };

  // Identical LinkedIn SVG for both modals
  const LinkedInSVG = (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="#0077B5"
      />
    </svg>
  );

  return (
    <>
      <div className="relative -mb-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {/* Google Button */}
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => handleSocial("Google")}
          disabled={isLoading}
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
        {/* LinkedIn Button */}
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => handleSocial("LinkedIn")}
          disabled={isLoading}
        >
          {LinkedInSVG}
          LinkedIn
        </Button>
        {/* Microsoft Button */}
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => handleSocial("Microsoft")}
          disabled={isLoading}
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

