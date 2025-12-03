import React, { useState } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';
import { Product } from '@/services/api';
import { toast } from 'sonner';

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen">
      <Header cartCount={cartItems.length} />
      <main>
        <Banner />
        <ProductsSection onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
