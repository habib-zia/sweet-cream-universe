
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IceCream } from '@/api/iceCreamApi';
import { useToast } from '@/hooks/use-toast';

interface IceCreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<IceCream, 'id'>) => void;
  iceCream?: IceCream;
  title: string;
}

const IceCreamModal = ({
  isOpen,
  onClose,
  onSubmit,
  iceCream,
  title
}: IceCreamModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues = {
    company: iceCream?.company || 'Walls',
    type: iceCream?.type || 'Cup',
    size: iceCream?.size || 'Medium',
    price: iceCream?.price || 100.00,
    flavour: iceCream?.flavour || '',
    color: iceCream?.color || '#7D4C92',
    expire_date: iceCream?.expire_date || '',
    images: iceCream?.images ? iceCream.images.join(', ') : '',
    is_popular: iceCream?.is_popular || false
  };
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues });
  
  const processForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Process images to convert from comma separated string to array
      const processedImages = data.images.split(',').map((img: string) => img.trim()).filter(Boolean);
      
      await onSubmit({
        ...data,
        price: parseFloat(data.price),
        images: processedImages
      });
      
      toast({
        title: "Success!",
        description: `Ice cream ${iceCream ? 'updated' : 'created'} successfully.`
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${iceCream ? 'update' : 'create'} ice cream.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-background p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-muted rounded-full"
              >
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit(processForm)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  {...register('company', { required: "Company is required" })}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs">{errors.company.message as string}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    className="w-full border rounded p-2 bg-background"
                    {...register('type', { required: "Type is required" })}
                  >
                    <option value="Cup">Cup</option>
                    <option value="Cone">Cone</option>
                    <option value="Stick">Stick</option>
                    <option value="Tub">Tub</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs">{errors.type.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <select
                    id="size"
                    className="w-full border rounded p-2 bg-background"
                    {...register('size', { required: "Size is required" })}
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                  {errors.size && (
                    <p className="text-red-500 text-xs">{errors.size.message as string}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  {...register('price', { 
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" }
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="flavour">Flavor</Label>
                <Input
                  id="flavour"
                  placeholder="Ice cream flavor"
                  {...register('flavour', { required: "Flavor is required" })}
                />
                {errors.flavour && (
                  <p className="text-red-500 text-xs">{errors.flavour.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex items-center gap-2">
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="color"
                        id="color"
                        className="w-12 h-8 rounded cursor-pointer"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Input
                    {...register('color', { required: "Color is required" })}
                    placeholder="#7D4C92"
                  />
                </div>
                {errors.color && (
                  <p className="text-red-500 text-xs">{errors.color.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expire_date">Expiry Date</Label>
                <Input
                  id="expire_date"
                  type="date"
                  {...register('expire_date', { required: "Expiry date is required" })}
                />
                {errors.expire_date && (
                  <p className="text-red-500 text-xs">{errors.expire_date.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="images">Images (comma separated URLs)</Label>
                <Input
                  id="images"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  {...register('images')}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_popular"
                  className="w-4 h-4"
                  {...register('is_popular')}
                />
                <Label htmlFor="is_popular">Popular item</Label>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="mr-2"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="gradient-primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : iceCream ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IceCreamModal;
