import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sescoconcept.name.ng';
  const now = new Date();
  return ['/', '/about', '/services', '/portfolio', '/case-studies', '/blog', '/contact'].map(path => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/contact' || path === '/portfolio' ? 0.9 : 0.7,
  }));
}
