
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
      
      // If user is authenticated and on the index page, redirect to dashboard
      if (session && location.pathname === '/') {
        navigate('/dashboard');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // When user becomes authenticated and they're on the index page, redirect to dashboard
      if (session && location.pathname === '/') {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, navigate, location.pathname]);

  return <>{children}</>;
}
