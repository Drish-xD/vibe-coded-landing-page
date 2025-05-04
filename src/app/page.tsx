import Layout from '@/components/layout/Layout';
import Benefits from '@/components/sections/Benefits';
import CtaSection from '@/components/sections/CtaSection';
import Features from '@/components/sections/Features';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Benefits />
      <CtaSection />
    </Layout>
  );
}
