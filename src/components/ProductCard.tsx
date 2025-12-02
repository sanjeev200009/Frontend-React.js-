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
      whileHover={{ y: -8 }}
    >
      <Card className="group h-full overflow-hidden border-border/50 bg-card transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-card-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
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