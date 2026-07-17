"use client";

import { useRef, useEffect } from "react";
import anime from "animejs";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    text: "Amoghavarsha transformed our entire brand identity. His eye for design and understanding of business strategy is unmatched."
  },
  {
    name: "David Chen",
    role: "Marketing Director, Nexus",
    text: "The photography sessions were professional and the results were stunning. Truly elevated our marketing campaigns."
  },
  {
    name: "Priya Sharma",
    role: "Founder, StartupX",
    text: "Having a designer who also understands finance is a game changer. The UI is beautiful and the business logic is flawless."
  },
  {
    name: "Michael Ross",
    role: "Creative Lead, Studio 54",
    text: "Exceptional attention to detail. The 3D elements and smooth animations made our website stand out from the competition."
  },
  {
    name: "Elena Rodriguez",
    role: "CFO, Global Retail",
    text: "Meticulous accounting skills combined with an artistic eye. A rare talent that brings value to every aspect of a project."
  }
];

export default function Testimonials() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Duplicate for infinite scroll effect
    const container = marqueeRef.current;
    container.innerHTML += container.innerHTML;
    
    const anim = anime({
      targets: container,
      translateX: ['0%', '-50%'],
      duration: 30000,
      easing: 'linear',
      loop: true
    });
    
    // Pause on hover
    const pauseAnim = () => anim.pause();
    const playAnim = () => anim.play();
    
    container.addEventListener('mouseenter', pauseAnim);
    container.addEventListener('mouseleave', playAnim);
    
    return () => {
      container.removeEventListener('mouseenter', pauseAnim);
      container.removeEventListener('mouseleave', playAnim);
      anime.remove(container);
    };
  }, []);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Client <span className="text-gradient">Testimonials</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full mx-auto"></div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-primary to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-primary to-transparent"></div>
        
        <div className="flex w-max" ref={marqueeRef}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="w-[400px] mx-4 glass-card p-8 rounded-2xl border border-white/5 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 flex items-center justify-center text-primary font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <span className="text-accent-3 text-sm">{t.role}</span>
                </div>
              </div>
              <p className="text-text-muted italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
