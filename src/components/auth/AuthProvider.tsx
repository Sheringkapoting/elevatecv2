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
<<<<<<< HEAD
    console.log("AuthProvider mounted, checking for session...");
    console.log("Current location:", location);

    // Set up auth state change listener immediately
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, !!session);
      setSession(session);
=======
    // Get the current URL - this is crucial for social auth redirects
    const currentUrl = window.location.origin;
    console.log("[AuthProvider] Initializing with origin:", currentUrl);
    console.log("[AuthProvider] Current location path:", location.pathname);

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("[AuthProvider] Initial session check:", 
        session ? `Authenticated as ${session.user.email}` : "Unauthenticated"
      );
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
      
<<<<<<< HEAD
      if (session && location.pathname === '/') {
        toast({
          title: "Login successful",
          description: "You have been successfully logged in."
        });
        navigate('/dashboard', { replace: true });
=======
      if (session) {
        console.log("[AuthProvider] User profile data:", session.user.user_metadata);
        setSession(session);

        // Check if we need to redirect to profile after signup
        const shouldRedirectToProfile = sessionStorage.getItem('should_redirect_profile');
        if (shouldRedirectToProfile === 'true') {
          console.log("Redirecting to profile page after signup");
          sessionStorage.removeItem('should_redirect_profile');
          setTimeout(() => {
            navigate('/profile', { replace: true });
          }, 800); // Slightly longer delay to ensure auth state is fully processed
        }
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
      }
    });

<<<<<<< HEAD
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session:", !!session);
      setSession(session);
=======
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[AuthProvider] Auth state changed:", {
        event,
        authenticated: !!session,
        userId: session?.user?.id,
        email: session?.user?.email
      });
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
      
<<<<<<< HEAD
      if (session && location.pathname === '/') {
        navigate('/dashboard', { replace: true });
=======
      if (session) {
        setSession(session);
        
        if (event === 'SIGNED_IN') {
          console.log("[AuthProvider] Processing successful sign in");
          toast({
            title: "Login successful",
            description: "You have been successfully logged in."
          });
          
          // Check if this is a new signup or regular login
          const isSignUp = sessionStorage.getItem('is_signup_event');
          
          if (isSignUp === 'true') {
            console.log("[AuthProvider] Processing signup event");
            setTimeout(() => {
              navigate('/profile', { replace: true });
              sessionStorage.removeItem('is_signup_event');
            }, 800);
          } else {
            console.log("[AuthProvider] Processing regular login, redirecting to:", from);
            setTimeout(() => {
              navigate(from, { replace: true });
            }, 500);
          }
        }
        
        // Check for new user flag in user metadata to identify signup events
        const isNewUser = session.user.app_metadata?.provider === 'email' && 
                          session.user.app_metadata?.providers?.length === 1 && 
                          session.user.created_at === session.user.updated_at;
                          
        if (isNewUser) {
          console.log("Detected new user based on metadata");
          // Set flag to indicate this was a signup event
          sessionStorage.setItem('is_signup_event', 'true');
          sessionStorage.setItem('should_redirect_profile', 'true');
          
          toast({
            title: "Account created",
            description: "Your account has been created successfully."
          });
          
          // Redirect to profile page for new users
          setTimeout(() => {
            navigate('/profile', { replace: true });
          }, 800);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log("[AuthProvider] User signed out");
        setSession(null);
        sessionStorage.removeItem('is_signup_event');
        sessionStorage.removeItem('should_redirect_profile');
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
      }
    });

<<<<<<< HEAD
    // Handle hash or query parameters from OAuth redirect
    const handleOAuthRedirect = async () => {
      // Check if we're on an OAuth callback page
      if (
        location.hash || 
        location.search.includes('access_token') || 
        location.search.includes('code=')
      ) {
        console.log("Detected potential OAuth redirect");
        
=======
    // Handle hash fragment from OAuth redirect
    const handleRedirectResult = async () => {
      if (window.location.hash) {
        console.log("Found hash in URL, handling OAuth callback");
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
        try {
<<<<<<< HEAD
          // First try the getSessionFromUrl method
          const { data, error } = await supabase.auth.getSessionFromUrl();
=======
          const { data, error } = await supabase.auth.getSession();
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
          
<<<<<<< HEAD
          console.log("getSessionFromUrl result:", data, error);
=======
          if (error) {
            console.error("Auth error during callback:", error);
            toast({
              title: "Login failed",
              description: error.message || "Failed to authenticate."
            });
            return;
          }
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
          
<<<<<<< HEAD
          if (error) {
            console.error("Error in getSessionFromUrl:", error);
            
            // If that fails, try to manually extract the token
            if (location.hash && location.hash.includes('access_token')) {
              console.log("Attempting manual access token extraction");
              const hashParams = new URLSearchParams(location.hash.substring(1));
              const accessToken = hashParams.get('access_token');
              
              if (accessToken) {
                // Try setting the session manually
                const { data: sessionData, error: sessionError } = 
                  await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: '',
                  });
                
                console.log("Manual setSession result:", sessionData, sessionError);
                
                if (sessionError) {
                  throw sessionError;
                }
                
                if (sessionData?.session) {
                  setSession(sessionData.session);
                  toast({
                    title: "Login successful",
                    description: "You have been successfully logged in."
                  });
                  navigate('/dashboard', { replace: true });
                }
              }
            } else {
              throw error;
            }
          } else if (data?.session) {
=======
          if (data?.session) {
            console.log("Successfully established session from OAuth redirect");
            console.log("User profile data from redirect:", data.session.user.user_metadata);
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7
            setSession(data.session);
            toast({
              title: "Login successful",
              description: "You have been successfully logged in."
            });
            navigate(from, { replace: true });
          }
        } catch (err) {
          console.error("Failed to handle OAuth redirect:", err);
          toast({
            title: "Login failed",
            description: "Could not complete authentication. Please try again."
          });
          navigate('/', { replace: true });
        }
      }
    };

    // Execute the OAuth redirect handler
    handleOAuthRedirect();

<<<<<<< HEAD
    return () => {
      console.log("Cleaning up AuthProvider");
      data.subscription.unsubscribe();
    };
  }, [setSession, navigate, location, toast]);
=======
    return () => subscription.unsubscribe();
  }, [setSession, navigate, location, toast, from]);
>>>>>>> 2f34913cd1ce5d30e1bbe0ff77cf08fe4d313ab7

  return <>{children}</>;
}
