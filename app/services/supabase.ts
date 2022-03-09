import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_KEY) {
  throw new Error('Missing env variable SUPABASE_KEY')
}

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing env variable SUPABASE_URL')
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default supabase
