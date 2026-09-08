import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/auth', '/patient-result'] }],
    sitemap: 'https://sescoconcept.name.ng/sitemap.xml',
  };
}
