
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // If we have a hash in the URL, it might be from a redirect
      if (location.hash && location.hash.includes('access_token')) {
        // Clear the hash and redirect to dashboard or home
        navigate(session ? '/dashboard' : '/', { replace: true });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // If auth state changes to logged in and we're on the home page, redirect to dashboard
      if (session && location.pathname === '/') {
        navigate('/dashboard', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, navigate, location]);

  return <>{children}</>;
}
