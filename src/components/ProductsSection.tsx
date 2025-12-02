import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
  const [cartCount, setCartCount] = useState(0);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call to /api/products - replace with actual API when ready
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real implementation, you would use:
      // const response = await fetch('/api/products');
      // if (!response.ok) throw new Error('Failed to fetch products');
      // const data = await response.json();
      
      const data = getMockProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load products from API. Please check your connection and try again.');
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
    setCartCount(prev => prev + 1);
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)} - Cart now has ${cartCount + 1} items`,
    });
  };

  // Filter and sort products
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
        // Keep original order for newest
        break;
    }

    return filtered;
  }, [products, searchTerm, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Featured Products
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Discover our carefully curated selection of premium products designed to enhance your lifestyle
          </p>
          
          {/* Cart Counter Badge */}
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{cartCount} item{cartCount !== 1 ? 's' : ''} in cart</span>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
              aria-label="Search products"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <ErrorAlert 
              message={error} 
              onRetry={loadProducts}
              className="mx-auto max-w-md"
            />
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SkeletonLoader />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <>
            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      index={index}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p>Try adjusting your search terms or filters</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Results Summary */}
            {!loading && filteredAndSortedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-sm text-muted-foreground"
              >
                Showing {filteredAndSortedProducts.length} of {products.length} products
                {searchTerm && (
                  <span> for "{searchTerm}"</span>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* Refresh Button for Error Recovery */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              onClick={loadProducts}
              className="group"
              aria-label="Refresh products"
            >
              <RefreshCw className="h-4 w-4 mr-2 group-hover:animate-spin" />
              Refresh Products
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;