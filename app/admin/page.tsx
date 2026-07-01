import type { Metadata } from 'next';
import { AdminAuthProvider } from '@/lib/AdminAuthContext';
import AdminApp from '@/components/admin/AdminApp';

export const metadata: Metadata = { title: 'Admin — SESCO STUDIO CMS', robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminApp />
    </AdminAuthProvider>
  );
}
