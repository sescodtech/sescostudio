/** Verified live links for client-facing portfolio projects. */
export const PROJECT_LIVE_LINKS: Record<string, string> = {
  'Andus International': 'https://andusinternationalng.com',
  'Mercy Hub': 'https://mercy-hub.vercel.app',
  'Salem Medical Laboratories': 'https://salemmedicals.com',
  'Olajide Property': 'https://olajide-property.vercel.app',
  'Marie Prime Global': 'https://marieprimeglobal.com',
  'Sesco Concept': 'https://sescoconcept.name.ng',
  'Emunahh Global Consult': 'https://emunahh.com',
};

export function getProjectLiveLink(title: string, link?: string): string | undefined {
  return link?.trim() || PROJECT_LIVE_LINKS[title];
}
