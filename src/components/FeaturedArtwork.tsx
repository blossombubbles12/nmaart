"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FEATURED_WORKS = [
  { id: 1, title: "CRYSTAL GEOMETRY I", artist: "ARISSA VANCE", image: "/images/artwork/1.png", price: "$4,200" },
  { id: 2, title: "FLUID DYNAMICS II", artist: "KAI STELLAR", image: "/images/artwork/2.png", price: "$3,800" },
  { id: 3, title: "DIMENSIONAL SHIFT", artist: "ELARA VOX", image: "/images/artwork/hero.png", price: "$5,500" },
];

export function FeaturedArtwork() {
  return (
    <section className="py-12 md:py-16 container px-6 mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-center md:items-end w-full mb-16 gap-6"
      >
        <div className="text-center md:text-left">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Masterpieces</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary">FEATURED <span className="opacity-20">WORKS</span></h3>
        </div>
        <button className="text-[10px] font-black tracking-[0.3em] border-b-2 border-primary pb-1 hover:opacity-70 transition-all text-primary uppercase">
          VIEW ALL EXHIBITIONS
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 w-full">
        {FEATURED_WORKS.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col items-center text-center"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl mb-8 bg-secondary border border-primary/10 shadow-2xl shadow-primary/5">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xl">
                <button className="px-8 py-4 bg-white text-black rounded-full font-black text-xs tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 uppercase">
                  VIEW DETAILS
                </button>
              </div>
            </div>
            <h4 className="text-sm md:text-3xl font-black mb-1 md:mb-3 tracking-tighter uppercase text-primary truncate w-full">{work.title}</h4>
            <p className="text-[8px] md:text-base text-secondary-foreground font-black tracking-[0.1em] md:tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">{work.artist} — {work.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
