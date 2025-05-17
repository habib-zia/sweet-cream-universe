
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IceCream, iceCreamApi } from '@/api/iceCreamApi';
import { Button } from '@/components/ui/button';
import IceCreamCard from './IceCreamCard';
import { useNavigate } from 'react-router-dom';

const FlavorGrid = () => {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-bounce-soft">Loading...</div>
      </div>
    );
  }

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
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
            Discover Our Flavors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of ice cream flavors, each one crafted with the finest ingredients 
            to bring you an unforgettable taste experience.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {iceCreams.map((iceCream) => (
            <motion.div key={iceCream.id} variants={itemVariants}>
              <IceCreamCard iceCream={iceCream} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center">
          <Button
            onClick={() => navigate('/shop')}
            className="gradient-btn px-8 py-6 text-lg"
          >
            View All Flavors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlavorGrid;
