import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, CheckCircle, TrendingUp } from 'lucide-react';

const Banner = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        

        {[Star, Sparkles, CheckCircle, TrendingUp].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              y: [0, -20, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${20 + (i * 15)}%`,
            }}
          >
            <Icon className="h-6 w-6 text-blue-300/50" />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh]"
        >
          <motion.div variants={slideInLeft} className="space-y-10">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 border border-blue-100/50 shadow-lg backdrop-blur-sm"
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rated #1 by 10,000+ customers
              </span>
            </motion.div>


            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                  Aahaas
                </span>
                <span className="block text-gray-900">Ecommerce</span>
                <span className="block text-gray-700 text-4xl sm:text-5xl lg:text-6xl">
                  Premium Products
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl font-medium">
                Experience the future of online shopping with Aahaas Ecommerce. 
                <span className="text-blue-600">Premium products</span> delivered with excellence.
              </p>
            </motion.div>

            {/* Feature Points */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {[
                { icon: CheckCircle, text: "Premium Quality", color: "text-emerald-500" },
                { icon: TrendingUp, text: "Best Prices", color: "text-blue-500" },
                { icon: Star, text: "5-Star Service", color: "text-yellow-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToProducts}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span>Shop Now</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Product Showcase */}
          <motion.div
            variants={slideInRight}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Product Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
              >
                {/* Product Preview */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Premium Product Icon */}
                  <div className="relative z-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Sparkles className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30"></div>
                    <div className="absolute top-4 left-4 w-8 h-8 bg-blue-300/50 rounded-full"></div>
                    <div className="absolute bottom-6 right-6 w-6 h-6 bg-purple-300/50 rounded-full"></div>
                    <div className="absolute top-1/2 right-8 w-4 h-4 bg-blue-400/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Collection</h3>
                  <p className="text-gray-600 text-sm">Discover excellence in every detail</p>
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg"
                >
                  <Star className="h-5 w-5 text-white" fill="currentColor" />
                </motion.div>
                
                {/* Quality Badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 -left-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-3 shadow-lg"
                >
                  <CheckCircle className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-3xl blur-2xl -z-10 scale-110"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-3xl blur-3xl -z-20"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;