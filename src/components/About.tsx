"use client";

import { motion } from "framer-motion";

const timelineEvents = [
  { year: "The Vision", title: "Creative Design", desc: "Crafting digital experiences that merge aesthetics with functionality, specializing in UI/UX and branding." },
  { year: "The Lens", title: "Professional Photography", desc: "Capturing moments through a cinematic lens, focusing on portraits, street, and commercial photography." },
  { year: "The Strategy", title: "Business & Finance", desc: "Leveraging financial acumen and accounting expertise to drive strategic business growth." },
  { year: "The Medium", title: "Web & AI", desc: "Building the future with modern web tools including React, HTML, CSS, Wix, and Prompt Engineering." }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The <span className="text-gradient">Story</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl glass-card overflow-hidden p-2">
              <div className="w-full h-full rounded-xl bg-secondary relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 opacity-80"
                  style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Amogh2.jpeg')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent mix-blend-multiply"></div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-accent-1 opacity-50 rounded-tr-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent-2 opacity-50 rounded-bl-3xl"></div>
          </motion.div>

          {/* Right - Timeline */}
          <div className="space-y-12">
            {timelineEvents.map((event, idx) => (
              <motion.div 
                key={event.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline Line for mobile */}
                <div className="absolute left-0 top-0 bottom-[-3rem] w-px bg-white/10 md:hidden"></div>
                {/* Timeline Dot for mobile */}
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-accent-1 shadow-[0_0_10px_#00E5FF] md:hidden"></div>
                
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-accent-1 hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-accent-3 text-sm font-mono tracking-wider">{event.year}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-3">{event.title}</h3>
                  <p className="text-text-muted leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
