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
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
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
  
  // First check the user_metadata
  const metadataImage = user.user_metadata?.avatar_url || 
         user.user_metadata?.picture || 
         user.user_metadata?.user_image;
  
  // If we have an image from metadata, return that
  if (metadataImage) return metadataImage;
  
  // Otherwise, check if the profile table has an image
  return null;
};

// Helper to extract user name from metadata
const getUserNameFromMetadata = (user: User | null): string | null => {
  if (!user) return null;
  
  return user.user_metadata?.full_name || 
         user.user_metadata?.name || 
         user.email || 
         null;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  profileImage: null,
  userName: null,
  signUp: async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      console.log("Signup attempt for email:", email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
      } else {
        console.log("Signup successful");
        // Set flag for redirect to profile in session storage
        sessionStorage.setItem('is_signup_event', 'true');
        sessionStorage.setItem('should_redirect_profile', 'true');
      }
      
      set({ error: error });
      return { error };
    } catch (error) {
      console.error("Unexpected signup error:", error);
      set({ error: error as AuthError });
      return { error: error as AuthError };
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      console.log("[auth.ts] Starting sign in process for email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // Set error state regardless if error is null or not
      set({ error: error });
      
      if (error) {
        console.error("[auth.ts] Sign in error:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
      } else {
        console.log("[auth.ts] Sign in successful", {
          userId: data.session?.user.id,
          email: data.session?.user.email,
          lastSignIn: data.session?.user.last_sign_in_at
        });
        // Remove any signup flags during login
        sessionStorage.removeItem('is_signup_event');
        sessionStorage.removeItem('should_redirect_profile');
      }
      
      return { error };
    } catch (error) {
      console.error("[auth.ts] Unexpected sign in error:", error);
      set({ error: error as AuthError });
      return { error: error as AuthError };
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
    
    // First try to get the profile image from the session user metadata
    let profileImage = getProfileImageFromMetadata(user);
    
    // If the user exists and we have no profile image from metadata, try to get from profiles table
    if (user && !profileImage) {
      // We'll fetch the user's profile from the database to get the profile_picture
      supabase.from('profiles')
        .select('profile_picture')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data && data.profile_picture) {
            // Update the profileImage state with the profile picture from the database
            set(state => ({ ...state, profileImage: data.profile_picture }));
          }
        })
        .catch(error => {
          console.error("Error fetching profile picture:", error);
        });
    }
    
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
