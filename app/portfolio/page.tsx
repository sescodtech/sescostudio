import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import PortfolioPage from '@/components/sections/PortfolioPage';

export const metadata: Metadata = { title: 'Portfolio — SESCO STUDIO', description: 'Real systems, real results. A showcase of digital products we have built.' };

export default function Portfolio() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main><PortfolioPage /></main>
      <Footer />
    </>
  );
}
