
import { type Session, type User, type AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithLinkedIn: (redirectTo?: string) => Promise<void>;
  signInWithMicrosoft: (redirectTo?: string) => Promise<void>;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

// Helper to ensure we have a valid redirect URL
const getRedirectUrl = (customUrl?: string): string => {
  // Use the provided URL or default to window.location.origin
  const baseUrl = customUrl || window.location.origin;
  
  // Log the redirect URL for debugging
  console.log("Using redirect URL:", baseUrl);
  
  return baseUrl;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  signUp: async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      set({ error: error as AuthError });
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      set({ error: error as AuthError });
    }
  },
  signInWithLinkedIn: async (redirectTo?: string) => {
    try {
      const effectiveRedirectTo = getRedirectUrl(redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: effectiveRedirectTo,
          queryParams: {
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("LinkedIn login error:", error);
      set({ error: error as AuthError });
    }
  },
  signInWithMicrosoft: async (redirectTo?: string) => {
    try {
      const effectiveRedirectTo = getRedirectUrl(redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: effectiveRedirectTo,
          queryParams: {
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Microsoft login error:", error);
      set({ error: error as AuthError });
    }
  },
  signInWithGoogle: async (redirectTo?: string) => {
    try {
      const effectiveRedirectTo = getRedirectUrl(redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: effectiveRedirectTo,
          queryParams: {
            prompt: "consent",
            access_type: "offline",
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google login error:", error);
      set({ error: error as AuthError });
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error });
    } else {
      set({ user: null, session: null });
    }
  },
  setSession: (session) => {
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    });
  },
}));
