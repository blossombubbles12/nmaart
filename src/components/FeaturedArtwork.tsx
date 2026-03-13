"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ARTWORKS } from "@/lib/artworks";

export function FeaturedArtwork() {
  return (
    <section className="py-12 md:py-16 container px-6 mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-center md:items-end w-full mb-12 gap-6"
      >
        <div className="text-center md:text-left">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
            Masterpieces
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary">
            FEATURED <span className="opacity-20">WORKS</span>
          </h3>
        </div>
        <Link
          href="/gallery"
          className="text-[10px] font-black tracking-[0.3em] border-b-2 border-primary pb-1 hover:opacity-70 transition-all text-primary uppercase"
        >
          VIEW ALL EXHIBITIONS
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 w-full">
        {ARTWORKS.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/artwork/${work.id}`} className="group cursor-pointer flex flex-col items-center text-center block">
              {/* Image Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:rounded-3xl mb-4 md:mb-6 bg-secondary border border-primary/10 shadow-2xl shadow-primary/5">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                  <span className="px-6 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 uppercase">
                    View Details
                  </span>
                  <span className="px-6 py-3 bg-primary text-white rounded-full font-bold text-xs tracking-widest transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 uppercase flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                    View in AR
                  </span>
                </div>
              </div>

              <h4 className="text-xs md:text-xl font-bold mb-1 text-primary truncate w-full">
                {work.title}
              </h4>
              <p className="text-[8px] md:text-sm text-secondary-foreground font-bold tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                {work.artist} — {work.price}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
