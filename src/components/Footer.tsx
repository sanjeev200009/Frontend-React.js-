import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Follow us on Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Follow us on Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Follow us on Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'Connect with us on LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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
      transition: { duration: 0.5 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.h2 
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              StoreFront
            </motion.h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for quality products and exceptional shopping experiences.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 10,
                    backgroundColor: "rgb(59, 130, 246)" 
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    whileHover={{ x: 5 }}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    <span className="group-hover:border-b border-blue-400 transition-all duration-300">
                      {link.name}
                    </span>
                    <ArrowRight 
                      size={16} 
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest products, exclusive deals, and company updates.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                  aria-label="Email address for newsletter subscription"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 transition-all duration-300 group"
                  >
                    <span>Subscribe</span>
                    <Mail size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800/50 mt-12 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <motion.p 
              className="text-gray-400 text-sm"
              whileHover={{ color: "rgb(156, 163, 175)" }}
            >
              &copy; {new Date().getFullYear()} StoreFront. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex space-x-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.a 
                href="/privacy" 
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="/terms" 
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
                aria-label="Terms of Service"
              >
                Terms of Service
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;