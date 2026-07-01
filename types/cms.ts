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
}

export interface CMSData {
  logo: string | null;
  favicon: string | null;
  pin: string;
  heroHeadline: string;
  heroSub: string;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  contact: {
    email: string;
    website: string;
    location: string;
    whatsapp?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  about: {
    missionTitle: string;
    missionDesc: string;
    vision: string;
  };
  media: Array<{ url: string; name: string; type: string }>;
}
