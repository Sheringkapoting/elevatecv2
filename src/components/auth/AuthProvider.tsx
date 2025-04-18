
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
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // If user is authenticated and we're on the home page, redirect to dashboard
      if (session && location.pathname === '/') {
        navigate('/dashboard', { replace: true });
      }
    });

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
      if (location.hash && location.hash.includes('access_token')) {
        // If we detect an access token in the URL hash, it's likely an OAuth redirect
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          // The user has been authenticated via OAuth
          // We can now navigate them to the dashboard
          toast({
            title: "Login successful",
            description: "You have been successfully logged in via LinkedIn."
          });
          navigate('/dashboard', { replace: true });
        }
      }
    };

    // Execute the redirect handler
    handleRedirectResult();

    return () => subscription.unsubscribe();
  }, [setSession, navigate, location, toast]);

  return <>{children}</>;
}
