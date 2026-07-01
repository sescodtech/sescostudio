import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Guard: during `next build` with no .env.local the vars will be empty.
// The client is only ever called at runtime (client components / API routes),
// so we create a placeholder that throws a readable error if someone calls it
// without the vars set, rather than crashing the entire build.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');
