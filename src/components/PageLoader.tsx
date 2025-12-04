import { motion } from 'framer-motion';

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader = ({ onComplete }: PageLoaderProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Aahaas
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default PageLoader;