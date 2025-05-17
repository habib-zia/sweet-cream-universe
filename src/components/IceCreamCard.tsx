
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IceCreamCone, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import { IceCream } from '@/api/iceCreamApi';
import { cn } from '@/lib/utils';

interface IceCreamCardProps {
  iceCream: IceCream;
}

const IceCreamCard = ({ iceCream }: IceCreamCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleClick = () => {
    navigate(`/ice-creams/${iceCream.id}`);
  };

  return (
    <motion.div
      className={cn(
        "glass-card overflow-hidden rounded-2xl cursor-pointer",
        isDark ? "hover:shadow-xl hover:shadow-indigo-500/10" : "hover:shadow-xl hover:shadow-orange-500/10"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-56 overflow-hidden">
        {iceCream.images && iceCream.images.length > 0 ? (
          <img 
            src={iceCream.images[0]} 
            alt={iceCream.flavour}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ 
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <IceCreamCone size={48} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Price tag */}
        <div 
          className="absolute top-4 left-4 bg-gradient-to-r from-iceCream-indigo to-iceCream-purple 
                    text-white font-semibold px-3 py-1 rounded-full shadow-lg"
        >
          ${iceCream.price.toFixed(2)}
        </div>
        
        {iceCream.is_popular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-iceCream-yellow to-iceCream-orange 
                        text-white font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Star size={14} className="fill-white" /> Popular
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{iceCream.flavour}</h3>
          <span 
            className="inline-block h-5 w-5 rounded-full border-2 border-white/50 dark:border-gray-800/50"
            style={{ backgroundColor: iceCream.color }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{iceCream.company}</p>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
            {iceCream.type}
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
            {iceCream.size}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default IceCreamCard;
