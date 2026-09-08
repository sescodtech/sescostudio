import type { Metadata } from 'next';
import './globals.css';
import { CMSProvider } from '@/lib/CMSContext';
import FaviconSync from '@/components/ui/FaviconSync';
import MaintenanceGate from '@/components/ui/MaintenanceGate';
import AnalyticsScripts from '@/components/ui/AnalyticsScripts';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { supabase } from '@/lib/supabase';
import { DEFAULT_CMS } from '@/lib/cms';

// Revalidate SEO metadata from the CMS every 5 minutes instead of on every
// request — keeps admin-edited titles/descriptions live without forcing
// the whole site into per-request dynamic rendering.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  let seo = DEFAULT_CMS.seo;
  try {
    const { data } = await supabase.from('sesco_cms').select('content').eq('id', 1).maybeSingle();
    if (data?.content?.seo) seo = { ...DEFAULT_CMS.seo, ...data.content.seo };
  } catch {
    // Falls back to DEFAULT_CMS.seo on any network/config issue — never blocks the build or render.
  }

  return {
    metadataBase: new URL('https://sescoconcept.name.ng'),
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    keywords: ['SESCO STUDIO', 'web development', 'branding', 'AI automation', 'Nigeria'],
    openGraph: {
      metadataBase: new URL('https://sescoconcept.name.ng'),
    title: seo.defaultTitle,
      description: seo.defaultDescription,
      type: 'website',
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    icons: {
      icon: '/icon',
      shortcut: '/icon',
      apple: '/icon',
    },
    twitter: {
      card: 'summary_large_image',
      metadataBase: new URL('https://sescoconcept.name.ng'),
    title: seo.defaultTitle,
      description: seo.defaultDescription,
      site: seo.twitterHandle || undefined,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SESCO STUDIO',
    url: 'https://sescoconcept.name.ng',
    description: DEFAULT_CMS.seo.defaultDescription,
    areaServed: ['Nigeria', 'Africa'],
    knowsAbout: ['Web development', 'Digital systems', 'Software applications', 'AI automation', 'Brand design', 'Digital strategy'],
  };
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <CMSProvider>
          <FaviconSync />
          <AnalyticsScripts />
          <MaintenanceGate>{children}</MaintenanceGate>
          <FloatingWhatsApp />
        </CMSProvider>
      </body>
    </html>
  );
}
