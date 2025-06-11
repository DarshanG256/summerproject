import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Route, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                EcoRouteAI
              </h1>
              <p className="text-sm text-gray-600">Intelligent Carbon-Aware Planning</p>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-6">
            <motion.div 
              className="flex items-center space-x-2 text-emerald-600"
              whileHover={{ scale: 1.05 }}
            >
              <Route className="w-4 h-4" />
              <span className="text-sm font-medium">Smart Routing</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-teal-600"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI Optimized</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;