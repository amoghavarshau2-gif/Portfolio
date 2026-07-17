"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Gallery from "@/components/Gallery";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Dynamically import Background to avoid SSR issues with Three.js
const Background = dynamic(() => import("@/components/Background"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Disable scroll while loading and scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <main className="min-h-screen relative selection:bg-accent-1/30 selection:text-white">
        
        {loading && <Loader onComplete={() => setLoading(false)} />}
        
        <Background />
        
        <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Gallery />
          <Experience />
          <Contact />
          <Footer />
        </div>
        
      </main>
    </ReactLenis>
  );
}
