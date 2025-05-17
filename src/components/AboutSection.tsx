
import { motion } from 'framer-motion';
import { IceCreamCone } from 'lucide-react';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading">
              About Walls Ice Cream
            </h2>
            <p className="text-lg text-muted-foreground">
              Since our founding in 1922, Walls has been creating delicious ice cream treats 
              that bring joy to people around the world. Our commitment to quality and 
              taste has made us a beloved brand for generations.
            </p>
            <p className="text-muted-foreground">
              Every scoop of Walls ice cream is made with carefully selected ingredients 
              and crafted to deliver the perfect balance of flavors and textures. From classic 
              favorites to innovative new creations, we're dedicated to making every ice cream 
              moment special.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-iceCream-yellow to-iceCream-orange flex items-center justify-center">
                <IceCreamCone size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Premium Quality</h4>
                <p className="text-sm text-muted-foreground">Only the finest ingredients</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1887&auto=format&fit=crop"
              alt="Ice cream production"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <p className="font-medium">Crafting joy since 1922</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
