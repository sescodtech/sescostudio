import { supabase } from '@/lib/supabase';

const TABLE = 'newsletter_signups';

/** Persists a newsletter signup to Supabase. Throws on failure (including duplicate email). */
export async function subscribeNewsletter(email: string): Promise<void> {
  const { error } = await supabase.from(TABLE).insert({ email: email.trim().toLowerCase() });
  if (error) {
    console.error('Newsletter signup error:', error.message);
    throw error;
  }
}
