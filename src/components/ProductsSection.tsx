import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';
import ErrorAlert from './ErrorAlert';
import { Product, getProducts } from '@/services/api';
import { toast } from 'sonner';

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

const ProductsSection = ({ onAddToCart }: ProductsSectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    setProducts([]); // Clear existing products
    
    try {
      console.log('Loading products from Laravel API...');
      const data = await getProducts();
      console.log('Products loaded successfully:', data);
      
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setError('No products found in the database. Please add some products to your Laravel backend.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unable to connect to the backend';
      setError(`Failed to load products: ${errorMessage}. Please ensure the Laravel server is running on port 8000.`);
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
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)}`,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked"),
      },
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [products, searchTerm, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium products, fetched live from our Laravel API
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm border-border/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={loadProducts}
              disabled={loading}
              className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ErrorAlert 
              message={error}
              onRetry={loadProducts}
            />
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading products...</span>
              </div>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? `No products match "${searchTerm}". Try a different search term.`
                    : "No products available at the moment."
                  }
                </p>
                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                    className="mx-auto"
                  >
                    Clear Search
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Results Summary */}
        {!loading && !error && filteredAndSortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-sm text-muted-foreground"
          >
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {searchTerm && ` for "${searchTerm}"`}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
