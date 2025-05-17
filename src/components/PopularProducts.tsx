
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IceCream, iceCreamApi } from '@/api/iceCreamApi';
import IceCreamCard from './IceCreamCard';
import { useTheme } from 'next-themes';
import { Star } from 'lucide-react';

// Import the Carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PopularProducts = () => {
  const [popularIceCreams, setPopularIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
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
    const fetchPopularIceCreams = async () => {
      try {
        const data = await iceCreamApi.getPopularIceCreams();
        setPopularIceCreams(data);
      } catch (error) {
        console.error('Error fetching popular ice creams:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPopularIceCreams();
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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black/70 to-gray-900" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-iceCream-rose/5 dark:bg-iceCream-rose/3 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-iceCream-mint/5 dark:bg-iceCream-mint/3 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 bg-gradient-to-r 
            from-iceCream-yellow/10 to-iceCream-amber/10 
            dark:from-iceCream-yellow/5 dark:to-iceCream-amber/5
            rounded-full text-sm font-semibold text-iceCream-amber">
            <Star size={16} className="fill-iceCream-amber" /> Popular Picks <Star size={16} className="fill-iceCream-amber" />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className={isDark ? "gradient-heading" : "gradient-heading-light"}>
              Fan Favorites
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground">
            Discover our most loved ice cream creations that our customers can't get enough of.
            Indulge in these fan favorites and see why they're so popular across the world.
          </motion.p>
        </motion.div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
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
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {popularIceCreams.map((iceCream) => (
                  <CarouselItem key={iceCream.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IceCreamCard iceCream={iceCream} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="relative static left-0 translate-y-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-10 w-10 rounded-full" />
                <CarouselNext className="relative static right-0 translate-y-0 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-10 w-10 rounded-full" />
              </div>
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
