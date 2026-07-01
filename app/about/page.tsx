import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import AboutPage from '@/components/sections/AboutPage';

export const metadata: Metadata = { title: 'About — SESCO STUDIO', description: 'Learn about SESCO STUDIO — a premium digital innovation studio.' };

export default function About() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main><AboutPage /></main>
      <Footer />
    </>
  );
}
