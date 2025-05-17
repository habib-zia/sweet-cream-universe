
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IceCreamCone, Award, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-iceCream-purple/5 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-iceCream-teal/5 blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-iceCream-purple/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-iceCream-cyan/10 blur-3xl"></div>
          </>
        )}
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
            <div>
              <motion.div
                variants={itemVariants}
                className="inline-block mb-2 px-4 py-1.5 bg-gradient-to-r from-iceCream-orange/10 to-iceCream-yellow/10 
                dark:from-iceCream-orange/5 dark:to-iceCream-yellow/5
                rounded-full text-sm font-semibold text-iceCream-orange"
              >
                Our Story
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Crafting Moments of <span className={isDark ? "gradient-heading" : "gradient-heading-light"}>
                  Pure Delight
                </span>
              </motion.h2>
            </div>
            
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Since our founding in 1922, Walls has been creating delicious ice cream treats 
              that bring joy to people around the world. Our commitment to quality and 
              taste has made us a beloved brand for generations.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-muted-foreground">
              Every scoop of Walls ice cream is made with carefully selected ingredients 
              crafted to deliver the perfect balance of flavors and textures. From classic 
              favorites to innovative new creations, we're dedicated to making every ice cream 
              moment special.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-iceCream-yellow to-iceCream-orange flex items-center justify-center shadow-lg shadow-iceCream-orange/20">
                  <Check size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Premium Quality</h4>
                  <p className="text-sm text-muted-foreground">Only the finest ingredients</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-iceCream-purple to-iceCream-indigo flex items-center justify-center shadow-lg shadow-iceCream-purple/20">
                  <Award size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Award Winning</h4>
                  <p className="text-sm text-muted-foreground">Recognized for excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image section with overlapping elements */}
          <motion.div variants={itemVariants} className="lg:col-span-7 relative">
            <div className="relative h-[500px]">
              {/* Main image with border */}
              <motion.div 
                variants={itemVariants}
                className="absolute left-0 top-0 w-4/5 h-[350px] rounded-2xl overflow-hidden 
                  border-8 border-white dark:border-gray-800 shadow-2xl z-20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1633933032781-a3e73576097e?q=80&w=1887&auto=format&fit=crop"
                  alt="Ice cream production"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Secondary image */}
              <motion.div 
                variants={itemVariants}
                className="absolute bottom-0 right-0 w-2/3 h-[280px] rounded-2xl overflow-hidden 
                  border-8 border-white dark:border-gray-800 shadow-2xl z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559703248-dcaaec9fab78?q=80&w=1964&auto=format&fit=crop"
                  alt="Ice cream display"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating element */}
              <motion.div
                className="absolute top-1/2 right-24 transform -translate-y-1/2 z-30"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className={`w-36 h-36 rounded-full flex items-center justify-center 
                  bg-gradient-to-br from-iceCream-blue to-iceCream-cyan shadow-xl 
                  border-4 border-white dark:border-gray-800`}>
                  <div className="text-center text-white">
                    <IceCreamCone size={36} className="mx-auto mb-1" />
                    <p className="font-bold text-sm">Premium<br/>Flavors</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
