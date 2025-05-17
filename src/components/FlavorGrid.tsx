
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IceCream, iceCreamApi } from '@/api/iceCreamApi';
import { Button } from '@/components/ui/button';
import IceCreamCard from './IceCreamCard';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';

const FlavorGrid = () => {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    const fetchIceCreams = async () => {
      try {
        const data = await iceCreamApi.getAllIceCreams();
        // Limit to 6 flavors for the homepage
        setIceCreams(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching ice creams:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIceCreams();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const shimmerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 2
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="section-padding relative overflow-hidden" 
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-gray-900/30 to-black/0" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-gray-100 to-white/0" />
        )}
        
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-iceCream-rose/5 dark:bg-iceCream-rose/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-iceCream-mint/5 dark:bg-iceCream-mint/3 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-2 px-4 py-1.5 bg-gradient-to-r 
            from-iceCream-yellow/10 to-iceCream-orange/10 
            dark:from-iceCream-yellow/5 dark:to-iceCream-orange/5
            rounded-full text-sm font-semibold text-iceCream-orange">
            Our Collection
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Discover Our <span className={isDark ? "gradient-heading" : "gradient-heading-light"}>
              Signature Flavors
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of ice cream flavors, each one crafted with the finest ingredients 
            to bring you an unforgettable taste experience. Every scoop tells a story of quality and passion.
          </motion.p>
        </motion.div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item}
                variants={shimmerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-200 dark:bg-gray-800 rounded-xl h-80 overflow-hidden relative"
              >
                <div className="shiny-overlay animate-shimmer"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {iceCreams.map((iceCream) => (
              <motion.div 
                key={iceCream.id} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <IceCreamCard iceCream={iceCream} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/shop')}
            className="gradient-btn text-base"
          >
            Explore All Flavors <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FlavorGrid;
