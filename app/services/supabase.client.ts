import { createClient } from '@supabase/supabase-js';

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    };
  }
}

if (!window.env.SUPABASE_KEY) {
  throw new Error('Missing env variable SUPABASE_KEY');
}

if (!window.env.SUPABASE_URL) {
  throw new Error('Missing env variable SUPABASE_URL');
}

const supabaseClient = createClient(window.env.SUPABASE_URL, window.env.SUPABASE_KEY);

export default supabaseClient;
