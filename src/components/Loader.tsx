"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    // Anime.js background particles
    if (containerRef.current) {
      const elements = Array.from({ length: 50 }).map(() => {
        const el = document.createElement("div");
        el.classList.add("absolute", "w-2", "h-2", "bg-accent-1", "rounded-full", "opacity-0");
        el.style.left = `${Math.random() * 100}vw`;
        el.style.top = `${Math.random() * 100}vh`;
        return el;
      });

      elements.forEach(el => containerRef.current?.appendChild(el));

      anime({
        targets: elements,
        opacity: [0, 0.5, 0],
        scale: [0, 1.5, 0],
        translateY: () => anime.random(-100, 100),
        translateX: () => anime.random(-100, 100),
        delay: anime.stagger(100),
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary overflow-hidden"
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1 
          ref={textRef}
          className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-1 to-accent-2 mb-8 tracking-tighter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          AMOGHAVARSHA
        </motion.h1>
        
        <div className="flex items-center space-x-4">
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-1 via-accent-3 to-accent-2"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className="text-text-muted font-mono w-12">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
