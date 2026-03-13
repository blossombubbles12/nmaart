"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HERO_IMAGES = [
  "/images/home1.png",
  "/images/home2.jpg",
  "/images/home3.png",
];

export function AnimatedHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[110dvh] w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image Slider with Parallax */}
      <motion.div 
         style={{ y, scale }}
         className="absolute inset-0 z-0 flex items-center justify-center bg-background"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentIndex]}
              alt={`Art Banner ${currentIndex + 1}`}
              fill
              priority
              className="object-cover opacity-60 dark:opacity-40"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background z-10" />
      </motion.div>

      {/* Hero Content */}
      <div className="container relative z-10 px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ opacity }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.8 pb-2] text-center uppercase text-primary">
            DIVINE <br />
            <span className="gradient-text pb-2 inline-block">DIMENSIONS</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-secondary-foreground max-w-2xl mx-auto mb-10 font-bold px-4 uppercase tracking-widest leading-relaxed">
            Explore the intersection of physical reality and digital imagination through our curated AR-ready collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
            <button className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-primary/40">
              EXPLORE GALLERY
            </button>
            <button className="w-full sm:w-auto px-10 py-5 border-2 border-primary/20 glass text-foreground rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
              VIEW IN AR
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements / Decoration */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute bottom-20 right-20 w-32 h-32 blur-3xl bg-primary/30 rounded-full"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute top-40 left-20 w-48 h-48 blur-3xl bg-primary/20 rounded-full"
      />
    </section>
  );
}
