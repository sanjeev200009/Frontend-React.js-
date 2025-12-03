import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={0} />
      
      <main className="flex-grow bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-lg w-full text-center"
        >
          {/* Animated 404 */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.h1 
              className="text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
              animate={floatingAnimation}
            >
              404
            </motion.h1>
            
            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <Search className="h-8 w-8 text-blue-600" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              The page you're looking for seems to have wandered off. 
              Don't worry, even the best explorers sometimes take a wrong turn!
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <p className="text-sm text-gray-500 mb-4">Here are some helpful links:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      Go Home
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link to="/" onClick={() => window.history.back()}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Go Back
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            variants={itemVariants}
            className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
          >
            <p className="text-sm text-blue-700">
              💡 <strong>Fun fact:</strong> The first 404 error was at CERN in 1992. 
              You're part of internet history!
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
