"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ARTWORKS } from "@/lib/artworks";
import { ArrowLeft, Camera, Maximize2, RotateCw, Move, X, ShoppingBag, Heart, Share2 } from "lucide-react";

export default function ArtworkPage() {
  const { id } = useParams();
  const artwork = ARTWORKS.find((a) => a.id === id);
  const [arMode, setArMode] = useState(false);
  const [arStep, setArStep] = useState<"scanning" | "placing" | "placed">("scanning");
  const [wishlist, setWishlist] = useState(false);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6">
        <h1 className="text-4xl font-black text-primary uppercase">Artwork Not Found</h1>
        <Link href="/" className="text-primary underline">Return Home</Link>
      </div>
    );
  }

  const startAR = () => {
    setArMode(true);
    setArStep("scanning");
    setTimeout(() => setArStep("placing"), 2000);
    setTimeout(() => setArStep("placed"), 4000);
  };

  const relatedWorks = ARTWORKS.filter((a) => a.id !== artwork.id);

  return (
    <div className="min-h-screen pb-24">
      {/* Back Nav */}
      <div className="container px-6 mx-auto pt-8 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="container px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Artwork Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-primary/10 shadow-2xl shadow-primary/10 bg-secondary sticky top-24"
        >
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* AR Badge */}
          <button
            onClick={startAR}
            className="absolute bottom-6 right-6 flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-full text-xs font-black tracking-widest uppercase shadow-2xl shadow-primary/40 hover:scale-105 transition-transform"
          >
            <Camera className="w-4 h-4" />
            View in AR
          </button>

          {/* Tags */}
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {artwork.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Artwork Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col gap-8 pt-4"
        >
          {/* Artist */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">
              {artwork.artist}
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-primary leading-none mb-4">
              {artwork.title}
            </h1>
            <p className="text-sm font-bold text-secondary-foreground uppercase tracking-widest opacity-70">
              {artwork.medium} · {artwork.year}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-primary/10" />

          {/* Specs */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Dimensions", value: artwork.dimensions },
              { label: "Year", value: String(artwork.year) },
              { label: "Edition", value: artwork.medium.includes("1 of 1") ? "1 of 1" : "Limited" },
              { label: "AR Ready", value: "Yes" },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 mb-1">{spec.label}</p>
                <p className="text-sm font-bold uppercase tracking-wider">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-primary/10" />

          {/* Description */}
          <p className="text-sm md:text-base font-medium text-secondary-foreground leading-relaxed opacity-80">
            {artwork.description}
          </p>

          {/* Price & Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">{artwork.price}</span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">USD · Free shipping</span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-8 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-2xl shadow-primary/30">
                <ShoppingBag className="w-4 h-4" />
                Acquire Artwork
              </button>
              <button
                onClick={startAR}
                className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-8 py-5 border-2 border-primary text-primary rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all"
              >
                <Camera className="w-4 h-4" />
                Try in AR
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${wishlist ? "border-red-400 text-red-400" : "border-primary/20 text-primary/60 hover:border-primary"}`}
              >
                <Heart className={`w-4 h-4 ${wishlist ? "fill-red-400" : ""}`} />
                {wishlist ? "Saved" : "Wishlist"}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-primary/20 text-primary/60 hover:border-primary transition-all">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Works */}
      <div className="container px-6 mx-auto mt-24">
        <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-primary mb-10">
          Also Available
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {relatedWorks.map((work) => (
            <Link key={work.id} href={`/artwork/${work.id}`} className="group">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-primary/10 mb-4">
                <Image src={work.image} alt={work.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm truncate">{work.title}</p>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{work.artist} — {work.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== AR EXPERIENCE OVERLAY ===== */}
      <AnimatePresence>
        {arMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col"
          >
            {/* Simulated Camera Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
              {/* Subtle room texture simulation */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px),
                                  repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)`
              }} />
              {/* Simulated wall/floor meeting line */}
              <div className="absolute bottom-[35%] left-0 right-0 h-px bg-white/10" />
              {/* Simulated floor shading */}
              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/40 to-transparent" />
            </div>

            {/* Status HUD Top */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  Camera Active
                </div>
                {arStep !== "scanning" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Surface Mapped
                  </motion.div>
                )}
                {arStep === "placed" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    SLAM Tracking: On · Latency: 8ms
                  </motion.div>
                )}
              </div>
              <button
                onClick={() => { setArMode(false); setArStep("scanning"); }}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main AR Scene */}
            <div className="relative flex-1 flex items-center justify-center">

              {/* Scanning Phase */}
              {arStep === "scanning" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-4 border-primary/40 border-t-primary animate-spin" />
                  <p className="text-white font-bold text-sm uppercase tracking-widest">Scanning surfaces...</p>
                </motion.div>
              )}

              {/* Placing Phase */}
              {arStep === "placing" && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                  {/* Dotted placement circle on the wall */}
                  <div className="w-64 h-48 border-2 border-dashed border-primary/60 rounded-lg flex items-center justify-center animate-pulse">
                    <p className="text-primary/80 text-xs font-black uppercase tracking-widest text-center px-4">
                      Move your device to<br/>place the artwork
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Placed Phase — actual artwork on wall */}
              {arStep === "placed" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative"
                >
                  {/* Picture frame shadow on wall */}
                  <div className="absolute inset-0 translate-y-4 blur-2xl bg-black/50 scale-110 rounded-sm" />

                  {/* The framed artwork */}
                  <div className="relative w-64 md:w-80 aspect-[4/5] rounded-sm overflow-hidden border-[12px] border-[#d4c4a0] shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
                    <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />

                    {/* AR Overlay HUD on artwork */}
                    <div className="absolute inset-0 border border-primary/30 rounded-sm pointer-events-none">
                      {/* Corner markers */}
                      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
                      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary" />
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary" />
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />

                      {/* Info badge */}
                      <div className="absolute -top-8 left-0 right-0 flex justify-center">
                        <div className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                          {artwork.title} · {artwork.dimensions}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle floor shadow */}
                  <div className="mt-2 mx-auto w-48 h-4 bg-black/40 blur-md rounded-full" />
                </motion.div>
              )}
            </div>

            {/* Bottom Controls */}
            {arStep === "placed" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 px-6 pb-12 flex flex-col gap-4"
              >
                {/* Control buttons */}
                <div className="flex justify-center gap-4">
                  {[
                    { icon: <Move className="w-5 h-5" />, label: "Move" },
                    { icon: <RotateCw className="w-5 h-5" />, label: "Rotate" },
                    { icon: <Maximize2 className="w-5 h-5" />, label: "Scale" },
                  ].map((ctrl) => (
                    <button key={ctrl.label} className="flex flex-col items-center gap-1.5">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                        {ctrl.icon}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{ctrl.label}</span>
                    </button>
                  ))}
                </div>

                {/* Acquire CTA */}
                <div className="flex gap-3 mt-2">
                  <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 shadow-2xl shadow-primary/40">
                    <ShoppingBag className="w-4 h-4" />
                    Acquire — {artwork.price}
                  </button>
                  <button
                    onClick={() => setArStep("scanning")}
                    className="px-5 py-4 border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-wider backdrop-blur-md bg-white/5"
                  >
                    Retry
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step Indicator */}
            <div className="relative z-10 flex justify-center gap-2 pb-6">
              {(["scanning", "placing", "placed"] as const).map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-500 ${arStep === step ? "w-8 bg-primary" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
