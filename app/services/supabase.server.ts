import { createClient } from '@supabase/supabase-js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }
  }
}

if (!process.env.SUPABASE_KEY) {
  throw new Error('Missing env variable SUPABASE_KEY');
}

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing env variable SUPABASE_URL');
}

const supabaseServer = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabaseServer;
