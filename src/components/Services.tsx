"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import { Paintbrush, Printer, PenTool, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Originals",
    description: "One-of-a-kind digital masterpieces curated from the world's most visionary artists.",
    icon: <Paintbrush className="w-8 h-8" />,
    image: "/images/home1.png",
  },
  {
    title: "Artprints",
    description: "Museum-grade physical editions crafted with archival precision and premium canvas.",
    icon: <Printer className="w-8 h-8" />,
    image: "/images/home2.jpg",
  },
  {
    title: "Customized",
    description: "Bespoke digital alterations designed specifically for your unique living spaces.",
    icon: <PenTool className="w-8 h-8" />,
    image: "/images/home3.png",
  }
];

export function Services() {
  return (
    <section className="py-12 md:py-16 w-full flex flex-col items-center">
      <div className="container px-6 mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-primary">
              CURATED <span className="opacity-20">SOLUTIONS</span>
            </h3>
          </div>
          <p className="text-sm md:text-base text-secondary-foreground max-w-sm font-bold uppercase tracking-widest leading-relaxed opacity-70">
            Expanding the boundaries of digital ownership through professional artistic services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[250px] md:h-[400px] lg:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-primary/20 cursor-pointer shadow-xl shadow-primary/5"
            >
              {/* Fully Visible Image Background */}
              <div className="absolute inset-0 z-0">
                <NextImage 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
              </div>
              
              {/* Compact & Visible Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 z-20">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h4 className="text-xl md:text-3xl font-bold text-white drop-shadow-md">
                    {service.title}
                  </h4>
                  
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl bg-black/40 backdrop-blur-md text-white">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-[-2px] transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
