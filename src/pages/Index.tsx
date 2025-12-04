import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import FloatingActions from '@/components/FloatingActions';
import SectionDivider from '@/components/SectionDivider';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Product } from '@/services/api';
import { toast } from 'sonner';

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-indigo-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>
      
      {isLoading && <PageLoader onComplete={handleLoadingComplete} />}
      <Header cartCount={cartItems.length} />
      <main className="relative z-10">
        <Banner />
        <SectionDivider />
        <ProductsSection onAddToCart={handleAddToCart} />
        <TestimonialsSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Index;
