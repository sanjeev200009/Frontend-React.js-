import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';
import { Product } from '@/services/api';

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <Header cartCount={cart.length} />
      <main>
        <Banner />
        <ProductsSection onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;