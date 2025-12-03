import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5' 
          : 'bg-white/60 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aahaas
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={item === 'Products' ? '#products' : '#'}
                className="relative text-gray-700 hover:text-indigo-600 font-medium text-sm transition-colors duration-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Search Bar */}
          <motion.div 
            className="hidden lg:flex items-center flex-1 max-w-sm mx-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-focus-within:text-indigo-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-500"
              />
            </div>
          </motion.div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button 
              className="relative p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 backdrop-blur-sm rounded-2xl transition-all duration-200 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 backdrop-blur-sm rounded-2xl transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-6 mx-4 mb-4">
                <div className="space-y-1">
                  {['Home', 'Products', 'About', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={item === 'Products' ? '#products' : '#'}
                      className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                  
                  {/* Mobile Search */}
                  <div className="pt-4 mt-4 border-t border-gray-200/50">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
