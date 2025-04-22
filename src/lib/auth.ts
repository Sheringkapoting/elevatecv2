
import { type Session, type User, type AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  profileImage: string | null;
  userName: string | null;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
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

// Helper to extract profile image URL from user metadata
const getProfileImageFromMetadata = (user: User | null): string | null => {
  if (!user) return null;
  
  return user.user_metadata?.avatar_url || 
         user.user_metadata?.picture || 
         user.user_metadata?.user_image || 
         null;
};

// Helper to extract user name from metadata
const getUserNameFromMetadata = (user: User | null): string | null => {
  if (!user) return null;
  
  return user.user_metadata?.full_name || 
         user.user_metadata?.name || 
         user.email || 
         null;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  profileImage: null,
  userName: null,
  signUp: async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
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
            hd: "domain.com", // Optional: limit to specific domains
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
      set({ 
        user: null, 
        session: null, 
        profileImage: null,
        userName: null 
      });
    }
  },
  setSession: (session) => {
    const user = session?.user ?? null;
    const profileImage = getProfileImageFromMetadata(user);
    const userName = getUserNameFromMetadata(user);
    
    console.log("Setting session with user:", user?.id);
    console.log("Profile image:", profileImage);
    console.log("User name:", userName);
    
    set({
      session,
      user,
      profileImage,
      userName,
      loading: false,
    });
  },
}));
