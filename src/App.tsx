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

  // 🎵 Music states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(true);

  // 🎉 Wishes configuration
  const wishesConfig: WishesConfig = {
    name: "Beautiful Soul",
    message: "May your day be filled with endless joy and magic! ✨",
    subMessage: "Wishing you all the happiness in the world! 🌟",
  };

  // 🎵 Play music once the celebration begins
  useEffect(() => {
    if (!started) return;

    audioRef.current = new Audio("/music/birthday.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audioRef.current.play().catch(() => {
      console.log("Autoplay blocked until user clicks 🎵 button.");
    });
  }, [started]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setMusicPlaying(!musicPlaying);
  };

  // 🌞🌙 Auto theme switch every 10 sec
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      toggleTheme();
    }, 10000);

    return () => clearInterval(interval);
  }, [started, toggleTheme]);

  const handleStart = () => {
    setStarted(true);
  };

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

          {/* 3D Particle Layer */}
          <Scene3D isDark={isDark} />

          {/* Photo Frame */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <PhotoFrame isDark={isDark} />
          </div>

          {/* Wishes Text */}
          <WishesText config={wishesConfig} isDark={isDark} />

          {/* ☀️🌙 Theme Toggle Button */}
          {/* <motion.button
            onClick={toggleTheme}
            className={`
              fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl
              ${
                isDark
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }
              transition-all duration-300
            `}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-3xl">{isDark ? "☀️" : "🌙"}</span>
          </motion.button> */}

          {/* 🎵 Music Toggle Button */}
          {/* <motion.button
            onClick={toggleMusic}
            className="
              fixed bottom-8 left-8 z-50 p-4 rounded-full
              bg-pink-500 text-white shadow-2xl hover:bg-pink-600
              transition-all duration-300
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-3xl">{musicPlaying ? "🔊" : "🔈"}</span>
          </motion.button> */}

          {/* 🎉 Confetti */}
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
