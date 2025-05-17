
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { IceCream, iceCreamApi } from '@/api/iceCreamApi';
import IceCreamModal from '@/components/IceCreamModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from 'next-themes';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const IceCreamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [iceCream, setIceCream] = useState<IceCream | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    if (id) {
      fetchIceCreamDetail(parseInt(id));
    }
  }, [id]);
  
  const fetchIceCreamDetail = async (iceCreamId: number) => {
    try {
      setLoading(true);
      const data = await iceCreamApi.getIceCreamById(iceCreamId);
      if (data) {
        setIceCream(data);
      } else {
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "The requested ice cream product could not be found."
        });
        navigate('/shop');
      }
    } catch (error) {
      console.error('Error fetching ice cream details:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load ice cream details."
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateIceCream = async (data: Partial<IceCream>) => {
    if (!iceCream || !id) return;
    
    try {
      const updated = await iceCreamApi.updateIceCream(parseInt(id), data);
      if (updated) {
        setIceCream(updated);
        toast({
          title: "Success!",
          description: "Ice cream updated successfully."
        });
      }
    } catch (error) {
      console.error('Error updating ice cream:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update ice cream."
      });
    }
  };
  
  const handleDeleteIceCream = async () => {
    if (!id) return;
    
    try {
      const success = await iceCreamApi.deleteIceCream(parseInt(id));
      if (success) {
        toast({
          title: "Success!",
          description: "Ice cream deleted successfully."
        });
        navigate('/shop');
      } else {
        throw new Error("Delete operation failed");
      }
    } catch (error) {
      console.error('Error deleting ice cream:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete ice cream."
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
              <button 
                onClick={() => navigate('/shop')}
                className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
              </button>
              
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-bounce-soft">Loading product details...</div>
                </div>
              ) : iceCream ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Slider */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl overflow-hidden"
                  >
                    {iceCream.images && iceCream.images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="aspect-square"
                      >
                        {iceCream.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={image}
                              alt={`${iceCream.flavour} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="w-full aspect-square bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">No image available</p>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Product Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h1 className="text-4xl font-bold">{iceCream.flavour}</h1>
                      <p className="text-xl text-muted-foreground">{iceCream.company}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-2xl font-bold">${iceCream.price.toFixed(2)}</div>
                      {iceCream.is_popular && (
                        <span className="ml-4 px-3 py-1 bg-iceCream-yellow/20 text-iceCream-orange text-xs font-medium rounded-full">
                          Popular Item
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="ice-card light dark:dark p-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                          <Tag size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Type & Size</p>
                          <p className="font-medium">{iceCream.type}, {iceCream.size}</p>
                        </div>
                      </div>
                      
                      <div className="ice-card light dark:dark p-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                          <Calendar size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Expires On</p>
                          <p className="font-medium">{new Date(iceCream.expire_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">Color:</span>
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: iceCream.color }}
                      />
                      <span className="text-sm font-mono">{iceCream.color}</span>
                    </div>
                    
                    <div className="flex space-x-4 pt-6">
                      <Button
                        onClick={() => setIsEditModalOpen(true)}
                        className="gradient-btn flex-1"
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Update
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="flex-1">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              "{iceCream.flavour}" ice cream from the database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteIceCream}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Product not found.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
        
        <AnimatePresence>
          {iceCream && (
            <IceCreamModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={(data) => handleUpdateIceCream(data)}
              iceCream={iceCream}
              title="Update Ice Cream"
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default IceCreamDetail;
