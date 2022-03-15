import { createClient } from '@supabase/supabase-js';

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    };
  }
}

if (!window.env.SUPABASE_URL) throw new Error('SUPABASE_URL is required');

if (!window.env.SUPABASE_KEY) throw new Error('SUPABASE_KEY is required');

const supabaseClient = createClient(window.env.SUPABASE_URL, window.env.SUPABASE_KEY);

export default supabaseClient;
