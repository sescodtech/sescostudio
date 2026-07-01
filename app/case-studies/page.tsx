import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import CaseStudiesPage from '@/components/sections/CaseStudiesPage';

export const metadata: Metadata = { title: 'Case Studies — SESCO STUDIO', description: 'Deep dives into how we approached, built, and delivered each project.' };

export default function CaseStudies() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main><CaseStudiesPage /></main>
      <Footer />
    </>
  );
}
