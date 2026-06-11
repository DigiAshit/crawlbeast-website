"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Welcome",           // English
  "Bienvenido",        // Spanish
  "Bienvenue",         // French
  "Willkommen",        // German
  "Benvenuto",         // Italian
  "ようこそ",          // Japanese
  "欢迎",              // Chinese
  "Добро пожаловать",  // Russian
  "स्वागत है",          // Hindi
];

const PageLoader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (index < words.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 240); // speed of word cycling
      return () => clearTimeout(timeout);
    } else {
      // Finished all words, start exit delay
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100vh",
            scale: 0.95,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex h-screen w-screen items-center justify-center bg-[#07090E]"
        >
          {/* Subtle grid in loader */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          {/* Glowing central orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Flash text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            {/* Small flashing status dot */}
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
              {words[index]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
