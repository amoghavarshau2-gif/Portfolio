"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaBehance, FaDribbble, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
            <p className="text-text-muted mb-12 leading-relaxed max-w-xl mx-auto">
              Whether you have a project in mind, need a consultation, or just want to say hi, 
              feel free to reach out. I'm currently available for freelance opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <a href="mailto:amoghavarshau2@gmail.com" className="flex flex-col items-center space-y-4 text-white hover:text-accent-1 transition-colors group">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div className="text-center">
                  <span className="block text-sm text-text-muted mb-1">Email</span>
                  <span className="font-medium text-sm block">amoghavarshau2@gmail.com</span>
                </div>
              </a>
              
              <a href="tel:+917022261802" className="flex flex-col items-center space-y-4 text-white hover:text-accent-2 transition-colors group">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaPhone className="text-2xl" />
                </div>
                <div className="text-center">
                  <span className="block text-sm text-text-muted mb-1">Phone</span>
                  <span className="font-medium text-sm block">+91 70222 61802</span>
                </div>
              </a>
              
              <a href="https://maps.google.com/?q=Bengaluru,+India" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-4 text-white hover:text-accent-3 transition-colors group">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div className="text-center">
                  <span className="block text-sm text-text-muted mb-1">Location</span>
                  <span className="font-medium text-sm block">Bengaluru, India</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/amoghavarsha-u-13361a417/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-4 text-white hover:text-blue-500 transition-colors group">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaLinkedin className="text-2xl" />
                </div>
                <div className="text-center">
                  <span className="block text-sm text-text-muted mb-1">LinkedIn</span>
                  <span className="font-medium text-sm block">Amoghavarsha U</span>
                </div>
              </a>
            </div>
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
