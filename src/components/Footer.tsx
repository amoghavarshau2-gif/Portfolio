"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaBehance } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-white/5 bg-primary relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-0"
        >
          <a href="#home" className="text-2xl font-bold tracking-tighter text-white group inline-block">
            AMOGHAVARSHA<span className="text-accent-1 group-hover:text-accent-2 transition-colors duration-300">.</span>
          </a>
          <p className="text-text-muted text-sm mt-1">Creative Professional & Finance Expert</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex space-x-6 mb-6 md:mb-0"
        >
          <a href="https://www.linkedin.com/in/amoghavarsha-u-13361a417/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-1 transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.instagram.com/_amogha__31_/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-pink-500 transition-colors">
            <FaInstagram size={20} />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-muted text-sm"
        >
          &copy; {currentYear} Amoghavarsha U. All rights reserved.
        </motion.div>
        
      </div>
    </footer>
  );
}
