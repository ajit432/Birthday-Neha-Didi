import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoFrameProps {
  isDark: boolean;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ isDark }) => {

  // Add as many photos as you want
  const photos = [
    "/assets/img1.jpg",
    "/assets/img2.jpg",
    "/assets/img3.jpg",
    "/assets/img4.jpg",
    "/assets/img5.jpg",
  ];

  // Current index
  const [index, setIndex] = useState(0);

  // Change photo every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 0.5,
        type: "spring",
        stiffness: 200 
      }}
      className="relative z-10 smooth"
    >
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Decorative rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 rounded-full border-4 border-dashed border-pink-400 dark:border-purple-400 opacity-50"
        />
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-12 rounded-full border-4 border-dotted border-purple-400 dark:border-indigo-400 opacity-30"
        />

        {/* Photo container */}
        <div className={`
          relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96
          rounded-full overflow-hidden shadow-2xl
          ${isDark 
            ? 'ring-8 ring-purple-500/50 shadow-purple-500/50' 
            : 'ring-8 ring-pink-400/50 shadow-pink-500/50'
          }
        `}>
          
          <motion.img
            key={index}  // important for fade animation
            src={photos[index]}
            alt="Birthday"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Overlay gradient */}
          <div className={`
            absolute inset-0 
            ${isDark 
              ? 'bg-gradient-to-t from-purple-900/30 to-transparent' 
              : 'bg-gradient-to-t from-pink-200/30 to-transparent'
            }
          `} />
        </div>

        {/* Floating particles around photo */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, delay: i * 0.2 }
            }}
            className="absolute"
            style={{
              top: '95%',
              left: '38%',
              transform: `rotate(${i * 45}deg) translateY(-180px)`,
            }}
          >
            <span className="text-3xl">
              {isDark ? '✨' : ['🌸', '🦋', '🌺', '🌼', '🌷', '🌻', '🌹', '💐'][i]}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PhotoFrame;
