
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';
import { Mail, Phone, Send, MessageSquare, User } from 'lucide-react';

// Define form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    reset();
    setIsSubmitting(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navbar />
        
        <main className="pt-20 pb-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 z-0">
            {isDark ? (
              <>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
                <div className="absolute top-40 left-20 w-96 h-96 rounded-full bg-iceCream-indigo/5 blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-iceCream-rose/5 blur-3xl"></div>
              </>
            ) : (
              <>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-gray-50 to-white"></div>
                <div className="absolute top-40 left-20 w-96 h-96 rounded-full bg-iceCream-indigo/10 blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-iceCream-rose/10 blur-3xl"></div>
              </>
            )}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-3xl mx-auto mb-16 pt-10"
            >
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                <span className={isDark ? "gradient-heading" : "gradient-heading-light"}>
                  Get in Touch
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-4">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you!
                Fill out the form below and our team will get back to you as soon as possible.
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Contact form */}
                <motion.div variants={itemVariants} className="lg:col-span-3">
                  <div className="glass-card p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              id="name"
                              placeholder="Your Name"
                              className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 pl-10"
                              {...register('name')}
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                          {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              placeholder="Your Email"
                              className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 pl-10"
                              {...register('email')}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                          {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              id="phone"
                              placeholder="Phone Number"
                              className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 pl-10"
                              {...register('phone')}
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                          {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              id="subject"
                              placeholder="Subject"
                              className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 pl-10"
                              {...register('subject')}
                            />
                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                          {errors.subject && (
                            <p className="text-sm text-red-500">{errors.subject.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea
                          id="message"
                          placeholder="Your Message"
                          rows={5}
                          className="resize-none bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                          {...register('message')}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="gradient-primary-btn w-full text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>
                
                {/* Contact information */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <div className="glass-card p-8 h-full">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-white/30 dark:bg-gray-800/30 p-5 rounded-xl">
                        <h4 className="font-semibold text-lg mb-1">Our Location</h4>
                        <p className="text-muted-foreground">
                          123 Ice Cream Way<br />
                          Frozen City, FC 12345<br />
                          United States
                        </p>
                      </div>
                      
                      <div className="bg-white/30 dark:bg-gray-800/30 p-5 rounded-xl">
                        <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                        <p className="text-muted-foreground mb-1">
                          <span className="font-medium">Customer Support:</span><br />
                          support@wallsicecream.com
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Business Inquiries:</span><br />
                          business@wallsicecream.com
                        </p>
                      </div>
                      
                      <div className="bg-white/30 dark:bg-gray-800/30 p-5 rounded-xl">
                        <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                        <p className="text-muted-foreground mb-1">
                          <span className="font-medium">Customer Service:</span><br />
                          +1 (123) 456-7890
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Toll Free:</span><br />
                          1-800-ICE-CREAM
                        </p>
                      </div>
                      
                      <div className="bg-white/30 dark:bg-gray-800/30 p-5 rounded-xl">
                        <h4 className="font-semibold text-lg mb-1">Business Hours</h4>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9am - 5pm<br />
                          Saturday: 10am - 4pm<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Map section */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-16 glass-card p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-6">Find Us</h3>
              <div className="h-96 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620796158045!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Walls Ice Cream Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ContactPage;
