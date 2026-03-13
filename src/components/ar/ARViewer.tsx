"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Maximize, RotateCw, Move } from "lucide-react";

export function ARViewer({ modelUrl }: { modelUrl?: string }) {
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden glass border border-primary/10 group mx-auto max-w-6xl">
      {!isInitialized ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10 p-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
          >
            <Camera className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase text-primary">AUGMENTED REALITY</h2>
          <p className="text-secondary-foreground max-w-md mb-8 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
            Experience the artwork in your own space. Use your mobile camera to place, rotate, and scale the masterpiece on your wall.
          </p>
          <button 
            onClick={() => setIsInitialized(true)}
            className="px-10 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
          >
            LAUNCH AR EXPERIENCE
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 bg-secondary flex flex-col items-center justify-center overflow-hidden">
          {/* Simulated AR Camera Background with Scanning Grid */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-1/2 left-0 w-full h-[2px] bg-primary/20 blur-sm animate-pulse pointer-events-none" />
          <div className="absolute right-1/2 top-0 w-[2px] h-full bg-primary/10 blur-sm pointer-events-none" />

          {/* AR Scene Content */}
          <motion.div 
            animate={{ 
              rotateY: [0, 15, -15, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-64 h-80 md:w-80 md:h-96 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden border-8 border-white/90 transform-gpu"
          >
             {/* The Artwork itself */}
             <div className="absolute inset-0 z-0">
               <img 
                 src="/images/artwork/1.png" 
                 alt="AR Preview" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
             </div>

             {/* Holographic AR Overlays over the artwork */}
             <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center opacity-70">
                <div className="w-[90%] h-[90%] border border-primary/40 rounded flex items-center justify-center relative">
                   {/* Scanning crosshairs */}
                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -mt-1 -ml-1" />
                   <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -mt-1 -mr-1" />
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -mb-1 -ml-1" />
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary -mb-1 -mr-1" />
                   
                   <div className="bg-primary/80 text-white text-[8px] font-black tracking-widest px-3 py-1 rounded absolute -top-3">
                     SCALE: 100% | WALL DETECTED
                   </div>
                </div>
             </div>
          </motion.div>

          {/* AR Status Labels */}
          <div className="absolute top-10 left-10 text-[10px] font-black opacity-100 flex flex-col gap-3 uppercase tracking-[0.2em] text-foreground">
             <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> CAMERA ACTIVE</div>
             <div className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" /> SLAM TRACKING: ON</div>
             <div>LATENCY: 12ms</div>
          </div>

          {/* AR Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 p-3 glass rounded-full z-20 shadow-2xl shadow-black/40 border-2 border-primary/20">
            <button title="Move" className="p-3 hover:bg-primary/20 rounded-full transition-colors active:scale-90 text-primary"><Move className="w-6 h-6" /></button>
            <button title="Rotate" className="p-3 hover:bg-primary/20 rounded-full transition-colors active:scale-90 text-primary"><RotateCw className="w-6 h-6" /></button>
            <button title="Scale" className="p-3 hover:bg-primary/20 rounded-full transition-colors active:scale-90 text-primary"><Maximize className="w-6 h-6" /></button>
          </div>

          <button 
            onClick={() => setIsInitialized(false)}
            className="absolute top-10 right-10 px-6 py-2.5 glass hover:bg-primary/30 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border-2 border-primary/20 transition-all active:scale-95"
          >
            DISCONNECT
          </button>
        </div>
      )}

      {/* Background decoration when not initialized */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/20 to-transparent" />
      </div>
    </div>
  );
}
