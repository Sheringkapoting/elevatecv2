
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Default to demo project values if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tkkoossbckaojnhhmtsc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRra29vc3NiY2thb2puaGhtdHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDkzMTYsImV4cCI6MjA2MDQ4NTMxNn0.P1Z_spmF7nQXEVrATIgiZs1thdq344oDyIU2PV8i8U0';

// Log status of configuration
console.log('Supabase configuration:', {
  urlProvided: !!import.meta.env.VITE_SUPABASE_URL,
  keyProvided: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  usingFallback: !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY
});

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,  // This is critical for OAuth flows
    flowType: 'implicit'       // Try this for LinkedIn OAuth
  }
});

// Validate the client connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase client initialized successfully, auth event:', event);
});
