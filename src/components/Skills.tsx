"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FaHtml5, FaCss3, FaJs, FaReact, FaGitAlt, FaCamera, FaCalculator, FaFileInvoiceDollar, FaChartLine, FaPenNib, FaPalette, FaImage, FaDraftingCompass, FaLayerGroup, FaCode } from "react-icons/fa";

const skillCategories = [
  {
    title: "Design",
    color: "from-[#FF00FF] to-[#00E5FF]",
    skills: [
      { name: "Photoshop", icon: <FaImage /> },
      { name: "Illustrator", icon: <FaPenNib /> },
      { name: "Figma", icon: <FaLayerGroup /> },
      { name: "Canva", icon: <FaPalette /> },
      { name: "Lightroom", icon: <FaDraftingCompass /> },
    ]
  },
  {
    title: "Web & AI",
    color: "from-[#00FFA3] to-[#00E5FF]",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3 /> },
      { name: "Wix", icon: <FaCode /> },
      { name: "Prompt Engineering", icon: <FaCode /> },
    ]
  },
  {
    title: "Photography",
    color: "from-[#7C3AED] to-[#FF00FF]",
    skills: [
      { name: "Portrait", icon: <FaCamera /> },
      { name: "Street", icon: <FaCamera /> },
      { name: "Commercial", icon: <FaCamera /> },
      { name: "Editing", icon: <FaCamera /> },
    ]
  },
  {
    title: "Finance",
    color: "from-[#F59E0B] to-[#EF4444]",
    skills: [
      { name: "Accounting", icon: <FaCalculator /> },
      { name: "Excel", icon: <FaChartLine /> },
      { name: "GST", icon: <FaFileInvoiceDollar /> },
      { name: "Tally", icon: <FaCalculator /> },
      { name: "Bookkeeping", icon: <FaFileInvoiceDollar /> },
    ]
  },
];

const TiltCard = ({ category, delay }: { category: any, delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct * 20);
    y.set(yPct * -20);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative w-full rounded-2xl glass-card p-6 border border-white/10 group cursor-pointer"
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
        style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      ></div>
      
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${category.color} mb-6`}>
          {category.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {category.skills.map((skill: any) => (
            <div key={skill.name} className="flex items-center space-x-3 text-text-muted hover:text-white transition-colors">
              <span className="text-xl">{skill.icon}</span>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Expertise & <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: "1000px" }}>
          {skillCategories.map((category, idx) => (
            <TiltCard key={category.title} category={category} delay={idx * 0.1} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
