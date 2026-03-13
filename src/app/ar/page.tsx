"use client";

import { ARViewer } from "@/components/ar/ARViewer";
import { motion } from "framer-motion";
import { Info, Sparkles, Smartphone, Box } from "lucide-react";

export default function ARPage() {
  return (
    <div className="flex flex-col w-full items-center min-h-screen overflow-x-hidden">
      {/* Hero Section for AR */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 container px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">
            FUTURE <br />
            <span className="gradient-text pb-2 inline-block">DIMENSIONS</span>
          </h1>
          <p className="text-base md:text-xl text-secondary-foreground mb-12 px-4 font-bold uppercase tracking-widest leading-relaxed">
            Experience art beyond the canvas. Our Augmented Reality technology allows you to project masterpieces directly into your physical environment.
          </p>
        </motion.div>
      </section>

      {/* Main AR Viewer Card */}
      <section className="w-full container px-6 mb-24 flex justify-center">
         <ARViewer />
      </section>

      {/* Features Detail */}
      <section className="py-24 bg-secondary/30 w-full flex justify-center">
        <div className="container px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-10 rounded-[2.5rem] border-2 border-primary/10 text-left"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
              <Smartphone className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Mobile Ready</h3>
            <p className="text-secondary-foreground text-xs font-bold uppercase leading-relaxed tracking-wider">
              Optimized for iOS and Android. No app installation required – works directly in your mobile browser.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-10 rounded-[2.5rem] border-2 border-primary/10 text-left"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
              <Box className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">True-to-Scale</h3>
            <p className="text-secondary-foreground text-xs font-bold uppercase leading-relaxed tracking-wider">
               Experience artworks in their actual physical dimensions, allowing for realistic spatial planning in your home.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-10 rounded-[2.5rem] border-2 border-primary/10 text-left"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
              <Sparkles className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">High Fidelity</h3>
            <p className="text-secondary-foreground text-xs font-bold uppercase leading-relaxed tracking-wider">
              Advanced texture mapping and lighting simulation ensure the digital artwork reacts realistically to your environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integration Note */}
      <section className="py-24 container px-6 mx-auto">
        <div className="max-w-4xl mx-auto glass p-12 rounded-[3rem] border-2 border-primary/20 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-shrink-0 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <Info className="text-primary w-10 h-10" />
           </div>
           <div>
             <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">Developer Note: 8thWall Integration</h2>
             <p className="text-secondary-foreground mb-6 font-bold uppercase text-xs tracking-widest leading-relaxed">
               The current AR experience is a high-fidelity simulation designed for showcase. To enable full spatial tracking and world-place technology, we integrate with the <strong>8thWall WebAR SDK</strong>.
             </p>
             <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
               <p className="text-primary text-[10px] font-black font-mono opacity-80 uppercase tracking-[0.2em] leading-loose">
                 // Integration Steps Required:<br/>
                 1. Link 8thWall Project Key to ARViewer component<br/>
                 2. Load SLAM tracking engine in the AR lifecycle<br/>
                 3. Reference .GLB / .USDZ models for support
               </p>
             </div>
           </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 container px-6 mx-auto text-center">
         <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter">Discover the Art of Tomorrow</h2>
         <div className="flex flex-col sm:flex-row gap-6 justify-center">
           <button className="px-12 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-110 transition-transform shadow-2xl shadow-primary/40">
              EXPLORE FULL COLLECTION
           </button>
         </div>
      </section>
    </div>
  );
}
