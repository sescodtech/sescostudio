import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import ServicesPage from '@/components/sections/ServicesPage';

export const metadata: Metadata = { title: 'Services — SESCO STUDIO', description: 'Web development, branding, AI automation, and social media management.' };

export default function Services() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main><ServicesPage /></main>
      <Footer />
    </>
  );
}
