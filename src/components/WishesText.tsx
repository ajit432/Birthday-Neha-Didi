import React from 'react';
import { motion } from 'framer-motion';
import type { WishesConfig } from '../types';

interface WishesTextProps {
  config: WishesConfig;
  isDark: boolean;
}

const WishesText: React.FC<WishesTextProps> = ({ config, isDark }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
      {/* Top wishes */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mb-auto mt-8 md:mt-16 text-center"
      >
        <motion.h1
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2 
          }}
          className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold
            ${isDark 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600'
            }
          `}
        >
          Happy Birthday
        </motion.h1>
        
        <motion.h2
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className={`
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4
            ${isDark ? 'text-pink-300' : 'text-purple-700'}
          `}
        >
          {config.name} 🎉
        </motion.h2>
      </motion.div>

      {/* Bottom message */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-auto mb-8 md:mb-16 text-center max-w-4xl"
      >
        <motion.p
          animate={{ 
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3 
          }}
          className={`
            text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold
            ${isDark ? 'text-white' : 'text-gray-800'}
          `}
        >
          {config.message}
        </motion.p>
        
        {config.subMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className={`
              text-lg sm:text-xl md:text-2xl mt-4
              ${isDark ? 'text-purple-200' : 'text-purple-600'}
            `}
          >
            {config.subMessage}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default WishesText;