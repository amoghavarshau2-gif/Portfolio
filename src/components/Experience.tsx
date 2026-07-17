"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    type: "Finance",
    date: "2026 - Present",
    title: "Financial analyst & accounting",
    company: "Matrica Networks Pvt Ltd",
    desc: "Handled bookkeeping, GST filings, and corporate tax optimization strategies for medium-sized enterprises."
  },
  {
    type: "Work",
    date: "Present",
    title: "UI/UX Designer",
    company: "Matrica Networks Pvt Ltd & Freelancer",
    desc: "Leading the design system and delivering high-fidelity prototypes for enterprise fintech applications."
  },
  {
    type: "Freelance",
    date: "Present",
    title: "Video making & Video editing",
    company: "Self-Employed",
    desc: "Managed branding and digital presence for startups, combining design with strategic business insights."
  },
  {
    type: "Dancer",
    date: "Present",
    title: "Dancer",
    company: "Self-Employed",
    desc: "Professional dancing performances and choreography."
  },
  {
    type: "Photography Projects",
    date: "2018 - Present",
    title: "Commercial & Portrait Photographer",
    company: "Freelance",
    desc: "Captured stunning visuals for brand campaigns, fashion shoots, and high-profile corporate events."
  },
  {
    type: "Education",
    date: "Undergraduate",
    title: "B.Com",
    company: "Sheshadripuram College",
    desc: "Bachelor of Commerce, focusing on financial accounting principles and business strategy."
  },
  {
    type: "Education",
    date: "Pre-University",
    title: "PUC",
    company: "National College",
    desc: "Pre-University College education laying the foundation for commerce."
  },
  {
    type: "Education",
    date: "Secondary",
    title: "10th Standard",
    company: "Little Angels School",
    desc: "Early education and foundational learning."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full"></div>

          {/* Animated Scroll Line */}
          <motion.div
            style={{ height }}
            className="absolute left-[20px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-accent-1 via-accent-3 to-accent-2 -translate-x-1/2 rounded-full origin-top"
          ></motion.div>

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}>

                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-accent-1 -translate-x-1/2 z-10 shadow-[0_0_15px_#00E5FF]"
                  ></motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="glass-card p-6 rounded-2xl hover:border-accent-1/50 transition-colors duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-accent-3 text-xs font-mono mb-4 border border-white/10">
                        {exp.type}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <h4 className="text-lg font-medium text-text-muted mb-4">{exp.company} | {exp.date}</h4>
                      <p className="text-sm text-text-muted/80 leading-relaxed">{exp.desc}</p>
                    </div>
                  </motion.div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-5/12"></div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
