import { supabase } from '@/lib/supabase';

export interface ContactSubmission {
  first: string;
  last: string;
  email: string;
  company: string;
  service: string;
  brief: string;
}

const TABLE = 'contact_submissions';

/**
 * Persists a contact form lead to Supabase. Throws on failure so the UI
 * can show a real error state instead of a fake success message.
 */
export async function submitContactForm(form: ContactSubmission): Promise<void> {
  const { error } = await supabase.from(TABLE).insert({
    first_name: form.first.trim(),
    last_name: form.last.trim(),
    email: form.email.trim(),
    company: form.company.trim() || null,
    service: form.service || null,
    brief: form.brief.trim(),
  });

  if (error) {
    console.error('Contact form submission error:', error.message);
    throw error;
  }
}
