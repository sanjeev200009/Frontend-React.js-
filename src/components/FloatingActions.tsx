import { motion } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Chat Support */}
      <motion.button
        className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="h-5 w-5" />
      </motion.button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
};

export default FloatingActions;