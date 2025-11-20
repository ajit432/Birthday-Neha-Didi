import React from 'react';
import { motion } from 'framer-motion';

interface StartButtonProps {
  onStart: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <div className=" smooth fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1 
        }}
        className="text-center"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2 
          }}
        >
          🎂 Special Day 🎂
        </motion.h1>
        
        <motion.button
          onClick={onStart}
          className="px-12 py-6 text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(236, 72, 153, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          🎁 Click to Celebrate 🎁
        </motion.button>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Something magical awaits...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default StartButton;