
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { IceCream, iceCreamApi } from '@/api/iceCreamApi';
import IceCreamCard from './IceCreamCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PopularProducts = () => {
  const [popularIceCreams, setPopularIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-bounce-soft">Loading...</div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
            Our Popular Flavors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved ice cream creations that our customers can't get enough of.
            Indulge in these fan favorites and see why they're so popular.
          </p>
        </motion.div>
        
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {popularIceCreams.map((iceCream) => (
              <SwiperSlide key={iceCream.id}>
                <IceCreamCard iceCream={iceCream} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
