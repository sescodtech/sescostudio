export interface Service {
  id: number;
  tag: string;
  icon: string;
  title: string;
  desc: string;
  color: 'blue' | 'gold';
  items?: string[];
}

export interface Project {
  id: number;
  title: string;
  type: string;
  desc: string;
  tags: string[];
  icon: string;
  bg: string;
  results: string;
  challenge?: string;
  r1?: { n: string; l: string };
  r2?: { n: string; l: string };
  link?: string;
  accessType?: 'public' | 'client' | 'nda' | 'private';
  accessLabel?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  initials: string;
  quote: string;
  stars: number;
}

export interface BlogPost {
  id: number;
  title: string;
  cat: string;
  excerpt: string;
  date: string;
  icon: string;
  bg: string;
  status: 'published' | 'draft';
  content?: string;
  readTime?: string;
  authorEmail?: string;
}

export interface FAQ {
  id: number;
  q: string;
  a: string;
}

export interface TeamMember {
  id: number;
  initials: string;
  name: string;
  role: string;
  bio: string;
}

export interface NavLink {
  id: number;
  label: string;
  href: string;
}

export interface CMSData {
  logo: string | null;
  favicon: string | null;
  heroHeadline: string;
  heroSub: string;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  faq: FAQ[];
  team: TeamMember[];
  navigation: {
    links: NavLink[];
    ctaLabel: string;
  };
  footer: {
    tagline: string;
    servicesLinks: string[];
  };
  contact: {
    email: string;
    website: string;
    location: string;
    whatsapp?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    github2?: string;
    businessHours?: string;
  };
  about: {
    missionTitle: string;
    missionDesc: string;
    vision: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string | null;
    twitterHandle?: string;
  };
  siteSettings: {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    ga4Id?: string;
    gtmId?: string;
    clarityId?: string;
  };
  media: Array<{ url: string; name: string; type: string }>;
}
