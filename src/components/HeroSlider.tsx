
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Define hero slide types
interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1587563974074-5776a21a396c?q=80&w=2070&auto=format&fit=crop',
    title: 'Coolest Treat in Town',
    subtitle: 'Indulge in our premium ice cream collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop',
    title: 'Creamy. Dreamy. Walls.',
    subtitle: 'Experience the perfect sweet treat for any occasion'
  },
  {
    image: 'https://images.unsplash.com/photo-1538489949601-cbf7d82e4e16?q=80&w=1972&auto=format&fit=crop',
    title: 'Irresistible Flavors',
    subtitle: 'Discover our signature tastes crafted for you'
  }
];

const HeroSlider = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        effect="fade"
        speed={1000}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-white p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center max-w-4xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.subtitle}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
