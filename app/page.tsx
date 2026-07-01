import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import { TrustedBy, AboutPreview, ProcessSection, WhySection, PortfolioPreview, TestimonialsSection, CTASection } from '@/components/sections/HomeSections';

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBy />
        <ServicesSection />
        <AboutPreview />
        <ProcessSection />
        <WhySection />
        <PortfolioPreview />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
