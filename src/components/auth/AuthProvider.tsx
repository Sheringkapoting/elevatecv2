
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Get the current URL - this is crucial for social auth redirects
    const currentUrl = window.location.origin;
    console.log("Current origin for auth redirects:", currentUrl);

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // If user is authenticated and we're on the home page, redirect to dashboard
      if (session && location.pathname === '/') {
        navigate('/dashboard', { replace: true });
      }
    });

    // Check for error parameters in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      console.error("Auth error from URL parameters:", error, errorDescription);
      toast({
        title: "Authentication error",
        description: errorDescription || "There was a problem with authentication.",
        variant: "destructive"
      });
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // If auth state changes to logged in and we're on the home page, redirect to dashboard
      if (session && location.pathname === '/') {
        toast({
          title: "Login successful",
          description: "You have been successfully logged in."
        });
        navigate('/dashboard', { replace: true });
      }
    });

    // Handle hash fragment from OAuth redirect
    const handleRedirectResult = async () => {
      if (window.location.hash) {
        console.log("Found hash in URL, handling OAuth callback");
        try {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Auth error during callback:", error);
            toast({
              title: "Login failed",
              description: error.message || "Failed to authenticate."
            });
            return;
          }
          
          if (data?.session) {
            console.log("Successfully established session from OAuth redirect");
            setSession(data.session);
            toast({
              title: "Login successful",
              description: "You have been successfully logged in."
            });
            navigate('/dashboard', { replace: true });
          }
        } catch (err) {
          console.error("Error handling OAuth redirect:", err);
          toast({
            title: "Login error",
            description: "An unexpected error occurred during login."
          });
        }
      }
    };

    // Execute the redirect handler
    handleRedirectResult();

    return () => subscription.unsubscribe();
  }, [setSession, navigate, location, toast]);

  return <>{children}</>;
}
