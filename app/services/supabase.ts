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

if (!process.env.SUPABASE_KEY) {
  throw new Error('Missing env variable SUPABASE_KEY');
}

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing env variable SUPABASE_URL');
}

function getSupabaseClient() {
  const isServer = typeof window === 'undefined';

  return createClient(
    isServer ? process.env.SUPABASE_URL : window.env.SUPABASE_URL,
    isServer ? process.env.SUPABASE_KEY : window.env.SUPABASE_KEY
  );
}

const supabase = getSupabaseClient();

export default supabase;
