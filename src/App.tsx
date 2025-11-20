import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks/useTheme";

import StartButton from "./components/StartButton";
import DayScene from "./components/DayScene";
import NightScene from "./components/NightScene";
import PhotoFrame from "./components/PhotoFrame";
import WishesText from "./components/WishesText";
import Scene3D from "./components/Scene3D";

import type { WishesConfig } from "./types";

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Music reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Wishes config
  const wishesConfig: WishesConfig = {
    name: "Beautiful Soul",
    message: "May your day be filled with endless joy and magic! ✨",
    subMessage: "Wishing you all the happiness in the world! 🌟",
  };

  // Play music after start button is clicked
  const handleStart = () => {
    setStarted(true);

    audioRef.current = new Audio("/music/birthday.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    audioRef.current.play().catch(() => {
      console.log("Autoplay prevented. User interaction required.");
    });
  };

  // Auto-switch day/night every 10 seconds
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      toggleTheme();
    }, 10000);

    return () => clearInterval(interval);
  }, [started, toggleTheme]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {!started && <StartButton onStart={handleStart} />}
      </AnimatePresence>

      {started && (
        <>
          {/* Background Scene */}
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="night"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <NightScene />
              </motion.div>
            ) : (
              <motion.div
                key="day"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <DayScene />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D particles */}
          <Scene3D isDark={isDark} />

          {/* Photo frame */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <PhotoFrame isDark={isDark} />
          </div>

          {/* Wishes text */}
          <WishesText config={wishesConfig} isDark={isDark} />

          {/* Confetti */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              initial={{
                y: -100,
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360 * 3,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear",
              }}
              className="fixed pointer-events-none z-40"
            >
              <span className="text-2xl">
                {["🎉", "🎊", "🎈", "🎁", "💝", "⭐", "💫", "🌟"][i % 8]}
              </span>
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
