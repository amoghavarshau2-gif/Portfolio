"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "UI Design", "Branding", "Photography", "Finance Projects"];

const projects = [
  { id: 1, title: "Fintech Dashboard", category: "UI Design", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Urban Shadows", category: "Photography", img: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Aura Branding", category: "Branding", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Tax Optimization App", category: "UI Design", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, title: "Corporate Audit", category: "Finance Projects", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, title: "Neon Nights", category: "Photography", img: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1000&auto=format&fit=crop" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Selected <span className="text-gradient">Works</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-accent-1 text-primary" 
                    : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="relative group rounded-2xl overflow-hidden glass-card aspect-video cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-accent-1 text-xs font-mono mb-2 block">{project.category}</span>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>

      {/* Project Details Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-secondary p-1 rounded-2xl max-w-4xl w-full border border-white/10 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-1 hover:text-primary transition-colors"
              >
                ✕
              </button>
              
              <div className="aspect-video w-full relative">
                <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover rounded-xl" />
              </div>
              
              <div className="p-8">
                <span className="text-accent-1 text-sm font-mono mb-2 block">{selectedProject.category}</span>
                <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-text-muted mb-6">
                  This project demonstrates a meticulous approach to {selectedProject.category.toLowerCase()}. 
                  Combining aesthetic excellence with functional precision, it serves as a testament to the dedication 
                  to quality and innovation.
                </p>
                
                <a href="#" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 text-primary font-medium hover:opacity-90 transition-opacity">
                  View Live Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
