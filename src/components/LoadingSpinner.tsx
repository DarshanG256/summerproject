import React from 'react';
import { motion } from 'framer-motion';
import { Route, Leaf } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10"
    >
      <div className="text-center space-y-6">
        {/* Animated Icons */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto relative"
          >
            <Route className="w-16 h-16 text-emerald-500" />
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0.5
            }}
            className="absolute top-4 right-4 w-6 h-6 text-teal-600"
          >
            <Leaf className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <motion.h3
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl font-bold text-gray-800"
          >
            Calculating Eco Route
          </motion.h3>
          
          <motion.div className="space-y-1">
            {[
              'Analyzing elevation data...',
              'Optimizing for fuel efficiency...',
              'Calculating carbon emissions...',
              'Finding the greenest path...'
            ].map((text, index) => (
              <motion.p
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: index * 0.5,
                  repeat: Infinity,
                }}
                className="text-sm text-gray-600"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;