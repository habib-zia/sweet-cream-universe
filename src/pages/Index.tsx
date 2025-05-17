
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import PopularProducts from '@/components/PopularProducts';
import FlavorGrid from '@/components/FlavorGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navbar />
        
        <main>
          <HeroSlider />
          
          <AboutSection />
          
          <PopularProducts />
          
          <FlavorGrid />
          
          <WhyChooseUs />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
