"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import anime from "animejs";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const roles = ["Creative Designer", "Professional Photographer", "Finance Professional", "Professional Dancer"];
    let roleIndex = 0;
    
    if (!textRef.current) return;
    
    const animateText = () => {
      const textContainer = textRef.current;
      if (!textContainer) return;
      
      textContainer.innerText = roles[roleIndex];
      textContainer.innerHTML = textContainer.textContent!.replace(/\S/g, "<span class='letter inline-block'>$&</span>");
      
      anime.timeline({ loop: false })
        .add({
          targets: '.role-text .letter',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 1000,
          delay: (el, i) => 50 * (i + 1)
        })
        .add({
          targets: '.role-text .letter',
          opacity: [1, 0],
          easing: "easeInOutQuad",
          duration: 1000,
          delay: (el, i) => 50 * (i + 1),
          complete: () => {
            roleIndex = (roleIndex + 1) % roles.length;
            animateText();
          }
        }, "+=2000");
    };
    
    animateText();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div style={{ y, opacity }} className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side */}
        <div className="flex flex-col items-start space-y-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-accent-3 text-lg font-mono mb-2"
            >
              HELLO,
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 leading-tight"
            >
              I'm <br /> <span className="text-gradient">Amoghavarsha U</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-10 text-2xl md:text-3xl font-light text-text-muted role-text" 
              ref={textRef}
            ></motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#portfolio" className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 text-primary font-semibold hover:scale-105 transition-transform">
              View Portfolio
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-accent-3 hover:text-accent-3 transition-colors">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="relative group hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-1/20 to-accent-2/20 rounded-2xl blur-3xl group-hover:blur-xl transition-all duration-700"></div>
          <motion.div 
            whileHover={{ rotateY: 10, rotateX: -10, scale: 1.02 }}
            className="relative w-full rounded-2xl glass-card overflow-hidden border border-white/10 group-hover:border-accent-1/50 transition-colors duration-500"
            style={{ transformStyle: "preserve-3d", minHeight: '50vh' }}
          >
            {/* Generated Portrait Image */}
            <div className="w-full h-full bg-secondary flex items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-80 mix-blend-overlay bg-cover bg-center"
                style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Amogh1.jpeg)` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl border border-white/5 translate-z-12">
              <p className="text-white text-sm font-light">"Bridging the gap between creative design, precise photography, and strategic finance."</p>
            </div>
          </motion.div>
        </motion.div>
        
      </motion.div>
    </section>
  );
}
