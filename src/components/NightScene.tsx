import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Particle } from '../types';

const NightScene: React.FC = () => {
  const [stars, setStars] = useState<Particle[]>([]);

  useEffect(() => {
    const createStars = () => {
      const newStars: Particle[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: 0,
          speedY: 0,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      setStars(newStars);
    };

    createStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-900 smooth">
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-12 right-12 md:top-20 md:right-20 w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-yellow-100 rounded-full shadow-2xl shadow-yellow-200/50"></div>
          <div className="absolute inset-2 bg-yellow-50 rounded-full"></div>
          {/* Moon craters */}
          <div className="absolute top-4 left-6 w-4 h-4 md:w-6 md:h-6 bg-gray-200 rounded-full opacity-30"></div>
          <div className="absolute top-10 right-8 w-3 h-3 md:w-5 md:h-5 bg-gray-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-6 left-10 w-5 h-5 md:w-7 md:h-7 bg-gray-200 rounded-full opacity-30"></div>
        </div>
        {/* Moon glow */}
        <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-40 animate-pulse"></div>
      </motion.div>

      {/* Shooting stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          animate={{
            x: ['-10%', '120%'],
            y: ['0%', '50%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 4 + 2,
            ease: "easeOut",
          }}
          className="absolute top-0 left-0"
        >
          <div className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white">
            <div className="absolute top-0 left-0 w-20 h-0.5 bg-gradient-to-r from-white to-transparent transform -rotate-45"></div>
          </div>
        </motion.div>
      ))}

      {/* Floating sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          animate={{
            y: [
              `${50 + (i % 10) * 5}%`,
              `${30 + (i % 10) * 5}%`,
              `${50 + (i % 10) * 5}%`
            ],
            x: [
              `${(i % 10) * 10}%`,
              `${(i % 10) * 10 + 5}%`,
              `${(i % 10) * 10}%`
            ],
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          className="absolute text-xl md:text-2xl lg:text-3xl"
        >
          ✨
        </motion.div>
      ))}

      {/* Milky Way effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent transform rotate-45 blur-3xl opacity-20"></div>
      </div>

      {/* Galaxy particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`galaxy-${i}`}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, delay: i * 0.1 }
          }}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${i * 18}deg) translateY(-${200 + i * 20}px)`,
          }}
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full blur-sm opacity-60"></div>
        </motion.div>
      ))}

      {/* Constellation effect */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Draw some constellation lines */}
        <motion.path
          d="M 100 100 L 200 150 L 300 100 L 200 50 Z"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </div>
  );
};

export default NightScene;