'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/admin/ToastContext';
import { usePermissions } from '@/lib/permissions';
import { Card, Table, Tr, Td, Btn } from '@/components/admin/ui';

interface ContactRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company: string | null;
  service: string | null;
  brief: string;
  created_at: string;
}
interface NewsletterRow {
  id: number;
  email: string;
  created_at: string;
}

export default function SubmissionsTab() {
  const { toast } = useToast();
  const { can } = usePermissions();
  const [tab, setTab] = useState<'contact' | 'newsletter'>('contact');
  const [contacts, setContacts] = useState<ContactRow[] | null>(null);
  const [newsletter, setNewsletter] = useState<NewsletterRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const [c, n] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_signups').select('*').order('created_at', { ascending: false }),
      ]);
      if (c.error && n.error) {
        setError("Couldn't load submissions — have you run the SQL setup for contact_submissions and newsletter_signups yet? See SUPABASE_SETUP.md.");
      } else {
        if (c.error) console.error(c.error.message); else setContacts(c.data as ContactRow[]);
        if (n.error) console.error(n.error.message); else setNewsletter(n.data as NewsletterRow[]);
      }
      setLoading(false);
    })();
  }, []);

  const deleteRow = async (table: 'contact_submissions' | 'newsletter_signups', id: number) => {
    if (!confirm('Delete this submission?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { toast('Only Super Admin can delete submissions', 'error'); return; }
    if (table === 'contact_submissions') setContacts(prev => prev?.filter(r => r.id !== id) ?? null);
    else setNewsletter(prev => prev?.filter(r => r.id !== id) ?? null);
    toast('Submission deleted');
  };

  if (loading) return <Card title="Form Submissions"><p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>Loading…</p></Card>;

  if (error) {
    return (
      <Card title="Form Submissions">
        <p style={{ color: '#ef4444', fontSize: '.88rem', lineHeight: 1.7 }}>{error}</p>
      </Card>
    );
  }

  return (
    <Card title="Form Submissions">
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Btn variant={tab === 'contact' ? 'primary' : 'outline'} size="sm" onClick={() => setTab('contact')}>Contact ({contacts?.length ?? 0})</Btn>
        <Btn variant={tab === 'newsletter' ? 'primary' : 'outline'} size="sm" onClick={() => setTab('newsletter')}>Newsletter ({newsletter?.length ?? 0})</Btn>
      </div>

      {tab === 'contact' && (
        contacts && contacts.length > 0 ? (
          <Table headers={['Date', 'Name', 'Email', 'Service', 'Brief', '']}>
            {contacts.map(r => (
              <Tr key={r.id}>
                <Td>{new Date(r.created_at).toLocaleDateString()}</Td>
                <Td title>{r.first_name} {r.last_name}</Td>
                <Td><a href={`mailto:${r.email}`} style={{ color: 'var(--blue)' }}>{r.email}</a></Td>
                <Td>{r.service || '—'}</Td>
                <Td>{r.brief.length > 50 ? r.brief.slice(0, 50) + '…' : r.brief}</Td>
                <Td>{can('delete_submissions') && <Btn variant="danger" size="sm" onClick={() => deleteRow('contact_submissions', r.id)}>Delete</Btn>}</Td>
              </Tr>
            ))}
          </Table>
        ) : <p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>No contact submissions yet.</p>
      )}

      {tab === 'newsletter' && (
        newsletter && newsletter.length > 0 ? (
          <Table headers={['Date', 'Email', '']}>
            {newsletter.map(r => (
              <Tr key={r.id}>
                <Td>{new Date(r.created_at).toLocaleDateString()}</Td>
                <Td title>{r.email}</Td>
                <Td>{can('delete_submissions') && <Btn variant="danger" size="sm" onClick={() => deleteRow('newsletter_signups', r.id)}>Delete</Btn>}</Td>
              </Tr>
            ))}
          </Table>
        ) : <p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>No newsletter signups yet.</p>
      )}
    </Card>
  );
}
