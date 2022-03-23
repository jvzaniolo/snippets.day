import { createClient } from '@supabase/supabase-js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }
  }
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    };
  }
}

const isServer = typeof document === 'undefined';

function createSupabaseClient() {
  if (isServer) {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  }

  return createClient(window.env.SUPABASE_URL, window.env.SUPABASE_KEY);
}

const supabase = createSupabaseClient();

export default supabase;
