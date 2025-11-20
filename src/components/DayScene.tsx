import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Particle } from '../types';

const DayScene: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: Math.random() * -0.3 - 0.2,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  const elements = ['🌸', '🦋', '🌺', '🌼', '🌷', '🌻', '☀️', '🌈', '🦜', '🌹'];

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-green-100 smooth">
      {/* Animated sun */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: 360,
        }}
        transition={{ 
          scale: { repeat: Infinity, duration: 4 },
          rotate: { repeat: Infinity, duration: 30, ease: "linear" }
        }}
        className="absolute top-8 right-8 md:top-16 md:right-16 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-yellow-300 rounded-full shadow-2xl shadow-yellow-400/50"
      >
        <div className="absolute inset-2 bg-yellow-200 rounded-full"></div>
        <div className="absolute inset-4 bg-yellow-100 rounded-full"></div>
      </motion.div>

      {/* Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          animate={{
            x: ['-20%', '120%'],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
          className="absolute"
          style={{
            top: `${10 + i * 15}%`,
            left: '-20%',
          }}
        >
          <div className="relative">
            <div className="w-16 h-8 md:w-24 md:h-12 lg:w-32 lg:h-16 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-2 left-6 w-12 h-6 md:w-20 md:h-10 lg:w-24 lg:h-12 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-1 left-12 w-14 h-7 md:w-22 md:h-11 lg:w-28 lg:h-14 bg-white rounded-full opacity-80"></div>
          </div>
        </motion.div>
      ))}

      {/* Floating spring elements */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + particle.speedX * 100}vw`,
              `${particle.x}vw`
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + particle.speedY * 100}vh`,
              `${particle.y}vh`
            ],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute pointer-events-none"
          style={{
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        >
          {elements[particle.id % elements.length]}
        </motion.div>
      ))}

      {/* Birds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`bird-${i}`}
          animate={{
            x: ['-10%', '110%'],
            y: [
              `${20 + i * 10}%`,
              `${15 + i * 10}%`,
              `${20 + i * 10}%`
            ],
          }}
          transition={{
            x: { duration: 20 + i * 3, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute text-2xl md:text-3xl"
        >
          🦜
        </motion.div>
      ))}

      {/* Ground grass effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-green-400 via-green-300 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-500 opacity-50"></div>
      </div>

      {/* Flowers on ground */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
        {['🌷', '🌺', '🌻', '🌸', '🌼', '🌹'].map((flower, i) => (
          <motion.div
            key={`flower-${i}`}
            animate={{
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-3xl md:text-5xl lg:text-6xl"
          >
            {flower}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DayScene;