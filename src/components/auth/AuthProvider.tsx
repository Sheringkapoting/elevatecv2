
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

  // Get returnTo from location state if available
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Get the current URL - this is crucial for social auth redirects
    const currentUrl = window.location.origin;
    console.log("Current origin for auth redirects:", currentUrl);

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "Authenticated" : "Unauthenticated");
      
      if (session) {
        console.log("User profile data:", session.user.user_metadata);
        setSession(session);
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
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session ? "Authenticated" : "Unauthenticated");
      
      if (session) {
        console.log("User metadata:", session.user.user_metadata);
        setSession(session);
        
        // When auth state changes to logged in, redirect to the intended page or default to profile
        if (event === 'SIGNED_IN') {
          toast({
            title: "Login successful",
            description: "You have been successfully logged in."
          });
          
          // Only navigate if not on profile page and not from a signup event
          const isSignUp = sessionStorage.getItem('is_signup_event');
          if (!location.pathname.includes('/profile') && !isSignUp) {
            // Navigate to the page the user was trying to access before login
            navigate(from, { replace: true });
          }
          
          // Clear the signup flag
          sessionStorage.removeItem('is_signup_event');
        } else if (event === 'SIGNED_UP') {
          // Set flag to indicate this was a signup event
          sessionStorage.setItem('is_signup_event', 'true');
          
          toast({
            title: "Account created",
            description: "Your account has been created successfully."
          });
          
          // For signup events, always redirect to profile
          navigate('/profile', { replace: true });
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
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
            console.log("User profile data from redirect:", data.session.user.user_metadata);
            setSession(data.session);
            toast({
              title: "Login successful",
              description: "You have been successfully logged in."
            });
            navigate(from, { replace: true });
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
  }, [setSession, navigate, location, toast, from]);

  return <>{children}</>;
}
