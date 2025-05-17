
import { motion } from 'framer-motion';
import { IceCreamCone, Star, Award, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: IceCreamCone,
    title: 'Premium Ingredients',
    description: 'We use only the finest, freshest ingredients in our ice cream for exceptional taste.'
  },
  {
    icon: Star,
    title: 'Unique Flavors',
    description: 'Discover our wide variety of flavors from classic favorites to innovative creations.'
  },
  {
    icon: Award,
    title: 'Award-Winning',
    description: 'Our ice creams have won numerous awards for quality and taste excellence.'
  },
  {
    icon: ThumbsUp,
    title: 'Customer Favorites',
    description: 'Loved by generations of ice cream enthusiasts around the world.'
  }
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section className="py-20 px-4 bg-gradient-to-br from-iceCream-indigo/5 to-iceCream-purple/5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
            Why Choose Walls
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            There are many reasons why Walls has been a trusted ice cream brand for generations.
            Here's what makes us special.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="ice-card light dark:dark p-6"
            >
              <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-iceCream-blue to-iceCream-cyan flex items-center justify-center">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
