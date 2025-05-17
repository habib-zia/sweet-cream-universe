
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from 'next-themes';
import { IceCreamCone, Star, Award, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: IceCreamCone,
    title: 'Premium Ingredients',
    description: 'We use only the finest, freshest ingredients in our ice cream for exceptional taste that you can truly feel.'
  },
  {
    icon: Star,
    title: 'Unique Flavors',
    description: 'Discover our wide variety of flavors from classic favorites to innovative creations that surprise your taste buds.'
  },
  {
    icon: Award,
    title: 'Award-Winning',
    description: 'Our ice creams have won numerous awards for quality and taste excellence in international competitions.'
  },
  {
    icon: ThumbsUp,
    title: 'Customer Favorites',
    description: 'Loved by generations of ice cream enthusiasts around the world, creating moments of joy with every scoop.'
  }
];

const WhyChooseUs = () => {
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
      transition: { duration: 0.5 }
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
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/70 to-white" />
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-iceCream-purple/5 dark:bg-iceCream-purple/3 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-iceCream-teal/5 dark:bg-iceCream-teal/3 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-2 px-4 py-1.5 bg-gradient-to-r 
            from-iceCream-indigo/10 to-iceCream-purple/10 
            dark:from-iceCream-indigo/5 dark:to-iceCream-purple/5
            rounded-full text-sm font-semibold text-iceCream-purple">
            Why Choose Us
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            The <span className={isDark ? "gradient-heading" : "gradient-heading-light"}>
              Walls Difference
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground">
            There are many reasons why Walls has been a trusted ice cream brand for generations.
            Here's what makes our ice cream truly special and keeps our customers coming back for more.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 h-full"
            >
              <div className="w-16 h-16 mb-6 mx-auto rounded-xl bg-gradient-to-br 
                from-iceCream-purple to-iceCream-indigo shadow-lg shadow-indigo-500/20
                flex items-center justify-center">
                <feature.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
