
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IceCream, iceCreamApi } from '@/api/iceCreamApi';
import IceCreamCard from '@/components/IceCreamCard';
import IceCreamModal from '@/components/IceCreamModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from 'next-themes';

const ShopPage = () => {
  const { toast } = useToast();
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    fetchIceCreams();
  }, []);
  
  const fetchIceCreams = async () => {
    try {
      setLoading(true);
      const data = await iceCreamApi.getAllIceCreams();
      setIceCreams(data);
    } catch (error) {
      console.error('Error fetching ice creams:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load ice cream products."
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddIceCream = async (data: Omit<IceCream, 'id'>) => {
    try {
      const newIceCream = await iceCreamApi.addIceCream(data);
      setIceCreams((prev) => [...prev, newIceCream]);
      toast({
        title: "Success!",
        description: "Ice cream added successfully."
      });
    } catch (error) {
      console.error('Error adding ice cream:', error);
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to add ice cream."
      });
    }
  };

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navbar />
        
        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto">
            <div className="py-8">
              <div className="flex flex-wrap justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Shop Online</h1>
                  <p className="text-muted-foreground">
                    Explore our delicious range of ice cream products
                  </p>
                </div>
                
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="gradient-primary-btn mt-4 sm:mt-0"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Ice Cream
                </Button>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-bounce-soft">Loading ice cream products...</div>
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  <AnimatePresence>
                    {iceCreams.map((iceCream) => (
                      <motion.div
                        key={iceCream.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IceCreamCard iceCream={iceCream} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
              
              {!loading && iceCreams.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No ice cream products found.</p>
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="gradient-primary-btn"
                  >
                    Add Your First Ice Cream
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
        
        <IceCreamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddIceCream}
          title="Add New Ice Cream"
        />
      </div>
    </ThemeProvider>
  );
};

export default ShopPage;
