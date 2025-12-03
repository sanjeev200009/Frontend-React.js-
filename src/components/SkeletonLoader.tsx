import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const SkeletonLoader = () => {
  const shimmer = {
    animate: {
      x: ['100%', '-100%'],
    },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden">
        <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            {...shimmer}
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                {...shimmer}
              />
            </div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                {...shimmer}
              />
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                {...shimmer}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              {...shimmer}
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SkeletonLoader;