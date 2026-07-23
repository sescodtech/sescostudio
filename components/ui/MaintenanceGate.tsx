'use client';
import { usePathname } from 'next/navigation';
import { useCMS } from '@/lib/CMSContext';
import LogoMark from '@/components/ui/LogoMark';

export default function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const { data } = useCMS();
  const pathname = usePathname();

  // /admin always stays reachable so an admin can turn maintenance mode back off.
  if (data.siteSettings.maintenanceMode && !pathname.startsWith('/admin')) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5%' }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
            <LogoMark size="lg" showWordmark={false} />
          </div>
          <p className="section-label centered">Under Maintenance</p>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-3xl)', marginBottom: 16 }}>We&apos;ll Be Right Back</h1>
          <p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8 }}>{data.siteSettings.maintenanceMessage}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
