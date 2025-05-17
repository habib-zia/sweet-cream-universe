
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <section className="relative w-full overflow-hidden pb-[140px]">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
        )}
        
        {/* Animated circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-iceCream-purple/10 dark:bg-iceCream-purple/5 blur-3xl animate-rotate-slow" />
        <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-iceCream-cyan/10 dark:bg-iceCream-cyan/5 blur-3xl animate-rotate-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen pt-20 lg:pt-0">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left px-4 py-10 lg:py-0"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block mb-2">Taste The</span>
            <span className={isDark ? "gradient-heading" : "gradient-heading-light"}>
              Perfect Sweetness
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Indulge in our artisanal ice cream collection. Each flavor is crafted with premium ingredients 
            to deliver an unforgettable experience with every scoop.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button asChild className="gradient-primary-btn text-base">
              <Link to="/shop">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-background border-2 text-base">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-1/2 mt-10 lg:mt-0 relative"
        >
          <div className="relative p-4">
            {/* Floating ice cream images with animation */}
            <motion.div 
              className="absolute -top-10 right-20 z-20"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=987&auto=format&fit=crop" 
                alt="Ice cream cone" 
                className="w-32 h-32 object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-10 left-10 z-20"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1633933358116-a27b902fad35?q=80&w=987&auto=format&fit=crop" 
                alt="Ice cream bar" 
                className="w-36 h-36 object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-800"
              />
            </motion.div>
            
            {/* Main image */}
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2070&auto=format&fit=crop" 
                alt="Ice cream collection" 
                className="w-full h-auto rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scrolling indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;
