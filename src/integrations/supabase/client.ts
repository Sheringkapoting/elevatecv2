// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tkkoossbckaojnhhmtsc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRra29vc3NiY2thb2puaGhtdHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDkzMTYsImV4cCI6MjA2MDQ4NTMxNn0.P1Z_spmF7nQXEVrATIgiZs1thdq344oDyIU2PV8i8U0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);