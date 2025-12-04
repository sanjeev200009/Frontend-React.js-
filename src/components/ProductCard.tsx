import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/services/api';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

const ProductCard = ({ product, onAddToCart, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200">
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => console.error('Image failed to load:', product.image_url, e)}
            onLoad={() => console.log('Image loaded successfully:', product.image_url)}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40"
          />
        </div>

        <CardContent className="p-4">
          <motion.h3 
            className="mb-2 text-lg font-semibold text-card-foreground line-clamp-1 group-hover:text-blue-600 transition-colors duration-200"
            whileHover={{ x: 2 }}
          >
            {product.name}
          </motion.h3>
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <motion.p 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            ${product.price.toFixed(2)}
          </motion.p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full gap-2"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;