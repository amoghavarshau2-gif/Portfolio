"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";

const stats = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 85, suffix: "+" },
  { label: "Photos Captured", value: 10, suffix: "K+" },
  { label: "Designs Created", value: 450, suffix: "+" },
  { label: "Years Experience", value: 6, suffix: "+" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      const targets = document.querySelectorAll('.stat-number');
      
      targets.forEach((target, idx) => {
        const finalValue = stats[idx].value;
        anime({
          targets: target,
          innerHTML: [0, finalValue],
          easing: 'easeOutExpo',
          round: 1, // rounds to nearest integer
          duration: 2500,
          delay: idx * 200
        });
      });
    }
  }, [isInView, hasAnimated]);

  return (
    <section className="py-20 relative z-10 border-y border-white/5 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12" ref={containerRef}>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-baseline mb-2">
                <span className="stat-number text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-1 to-accent-2">
                  0
                </span>
                <span className="text-3xl md:text-4xl font-bold text-accent-2 ml-1">{stat.suffix}</span>
              </div>
              <p className="text-text-muted font-medium text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
