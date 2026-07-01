import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import BlogPage from '@/components/sections/BlogPage';

export const metadata: Metadata = { title: 'Blog — SESCO STUDIO', description: 'Thoughts on technology, design systems, AI automation, and building digital businesses.' };

export default function Blog() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main><BlogPage /></main>
      <Footer />
    </>
  );
}
