import type { Metadata } from 'next';
import './globals.css';
import { CMSProvider } from '@/lib/CMSContext';

export const metadata: Metadata = {
  title: 'SESCO STUDIO — Building Digital Systems for Modern Businesses',
  description: 'SESCO STUDIO is a premium digital innovation studio. We build systems, not just designs.',
  keywords: ['SESCO STUDIO', 'web development', 'branding', 'AI automation', 'Nigeria'],
  openGraph: { title: 'SESCO STUDIO', description: 'We build systems, not just designs.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CMSProvider>{children}</CMSProvider>
      </body>
    </html>
  );
}
