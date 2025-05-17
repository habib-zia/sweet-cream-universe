
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IceCreamCone } from 'lucide-react';
import { useTheme } from 'next-themes';
import { IceCream } from '@/api/iceCreamApi';

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
      className={`ice-card ${isDark ? 'dark' : 'light'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-52">
        {iceCream.images && iceCream.images.length > 0 ? (
          <img 
            src={iceCream.images[0]} 
            alt={iceCream.flavour}
            className="w-full h-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted rounded-t-xl">
            <IceCreamCone size={48} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Price tag */}
        <div 
          className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 text-foreground px-3 py-1 rounded-full 
                     shadow-md"
        >
          ${iceCream.price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{iceCream.flavour}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">{iceCream.company}</p>
          <span 
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: iceCream.color }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">
              {iceCream.type}
            </span>
            <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">
              {iceCream.size}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IceCreamCard;
