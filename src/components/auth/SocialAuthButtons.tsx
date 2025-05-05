
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function SocialAuthButtons() {
  const { signInWithGoogle, signInWithMicrosoft, signInWithLinkedIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading("google");
      // Set explicit login flag for social login
      sessionStorage.setItem('is_explicit_login', 'true');
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
      // Clear flag on error
      sessionStorage.removeItem('is_explicit_login');
    } finally {
      setIsLoading(null);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading("microsoft");
      // Set explicit login flag for social login
      sessionStorage.setItem('is_explicit_login', 'true');
      await signInWithMicrosoft();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Microsoft",
        variant: "destructive",
      });
      // Clear flag on error
      sessionStorage.removeItem('is_explicit_login');
    } finally {
      setIsLoading(null);
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      setIsLoading("linkedin");
      // Set explicit login flag for social login
      sessionStorage.setItem('is_explicit_login', 'true');
      await signInWithLinkedIn();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with LinkedIn",
        variant: "destructive",
      });
      // Clear flag on error
      sessionStorage.removeItem('is_explicit_login');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleGoogleLogin}
        disabled={!!isLoading}
      >
        {isLoading === "google" ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
        )}
        Sign in with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleMicrosoftLogin}
        disabled={!!isLoading}
      >
        {isLoading === "microsoft" ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <svg className="h-4 w-4 mr-2" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
        )}
        Sign in with Microsoft
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleLinkedInLogin}
        disabled={!!isLoading}
      >
        {isLoading === "linkedin" ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#0A66C2"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        )}
        Sign in with LinkedIn
      </Button>
    </div>
  );
}
