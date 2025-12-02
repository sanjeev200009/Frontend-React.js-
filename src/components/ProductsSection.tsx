import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';
import ErrorAlert from './ErrorAlert';
import { Product, getMockProducts } from '@/services/api';
import { toast } from 'sonner';

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

const ProductsSection = ({ onAddToCart }: ProductsSectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call - replace with actual API when ready
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = getMockProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast.success(`${product.name} has been added to your cart.`);
  };

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Featured Products
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover our handpicked selection of premium products
          </p>
        </motion.div>

        {error && (
          <ErrorAlert message={error} onRetry={loadProducts} />
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.isArray(products) && products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;