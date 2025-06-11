import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, AlertTriangle, TrendingDown } from 'lucide-react';
import { EmissionData } from '../types';

interface EmissionComparisonProps {
  emissions: EmissionData;
}

const EmissionComparison: React.FC<EmissionComparisonProps> = ({ emissions }) => {
  const { ecoRouteCO2, shortestRouteCO2, co2Saved, percentageSaved } = emissions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <Leaf className="w-5 h-5 text-emerald-600" />
        <span>Environmental Impact</span>
      </h3>

      {/* CO2 Savings Highlight */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium">CO₂ Emissions Saved</p>
            <p className="text-3xl font-bold">{co2Saved} kg</p>
            <p className="text-emerald-100 text-sm">
              {percentageSaved.toFixed(1)}% reduction from standard route
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          >
            <TrendingDown className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>

      {/* Comparison Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Emission Comparison</span>
          <span className="text-gray-500">kg CO₂</span>
        </div>

        {/* Eco Route Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-600">Eco Route</span>
            <span className="text-sm font-bold text-emerald-600">{ecoRouteCO2} kg</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(ecoRouteCO2 / shortestRouteCO2) * 100}%` }}
              transition={{ delay: 0.7, duration: 1 }}
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
            />
          </div>
        </motion.div>

        {/* Standard Route Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Standard Route</span>
            <span className="text-sm font-bold text-gray-600">{shortestRouteCO2} kg</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Environmental Impact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200"
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800 mb-1">
              Environmental Benefit
            </p>
            <p className="text-xs text-green-700">
              Your eco-optimized route prevents the equivalent emissions of burning{' '}
              <span className="font-medium">{(co2Saved * 0.43).toFixed(1)} liters</span> of gasoline.
              This contributes to cleaner air and reduced climate impact.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmissionComparison;