import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import ContactPage from '@/components/sections/ContactPage';

export const metadata: Metadata = { title: 'Contact — SESCO STUDIO', description: 'Start a project with SESCO STUDIO. Get back to you within 24 hours.' };

export default function Contact() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main><ContactPage /></main>
      <Footer />
    </>
  );
}
