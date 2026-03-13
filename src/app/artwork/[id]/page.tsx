"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ARTWORKS } from "@/lib/artworks";
import {
  ArrowLeft,
  Camera,
  Maximize2,
  RotateCw,
  Move,
  X,
  ShoppingBag,
  Heart,
  Share2,
} from "lucide-react";

export default function ArtworkPage() {
  const { id } = useParams();
  const artwork = ARTWORKS.find((a) => a.id === id);
  const [arMode, setArMode] = useState(false);
  const [arStep, setArStep] = useState<"scanning" | "placing" | "placed">("scanning");
  const [wishlist, setWishlist] = useState(false);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 px-6">
        <h1 className="text-3xl font-black text-primary uppercase text-center">
          Artwork Not Found
        </h1>
        <Link href="/" className="text-primary underline font-bold text-sm">
          Return Home
        </Link>
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
      <div className="container px-4 md:px-6 mx-auto pt-6 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="container px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

        {/* Artwork Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[4/5] max-h-[60vh] md:max-h-none rounded-2xl md:rounded-3xl overflow-hidden border border-primary/10 shadow-2xl shadow-primary/10 bg-secondary lg:sticky lg:top-24"
        >
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* AR badge on image */}
          <button
            onClick={startAR}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl shadow-primary/40 hover:scale-105 transition-transform"
          >
            <Camera className="w-3.5 h-3.5" />
            View in AR
          </button>

          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {artwork.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Artwork Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* Artist + Title */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">
              {artwork.artist}
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-primary leading-none mb-3">
              {artwork.title}
            </h1>
            <p className="text-xs font-bold text-secondary-foreground uppercase tracking-widest opacity-70">
              {artwork.medium} · {artwork.year}
            </p>
          </div>

          <div className="w-full h-px bg-primary/10" />

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Dimensions", value: artwork.dimensions },
              { label: "Year", value: String(artwork.year) },
              { label: "Edition", value: artwork.medium.includes("1 of 1") ? "1 of 1" : "Limited" },
              { label: "AR Ready", value: "Yes" },
            ].map((spec) => (
              <div key={spec.label} className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 mb-1">
                  {spec.label}
                </p>
                <p className="text-sm font-bold uppercase tracking-wider">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-primary/10" />

          {/* Description */}
          <p className="text-sm md:text-base font-medium text-secondary-foreground leading-relaxed opacity-80">
            {artwork.description}
          </p>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl md:text-4xl font-black text-primary tracking-tighter">
              {artwork.price}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">
              USD · Free shipping
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-primary/30">
                <ShoppingBag className="w-4 h-4" />
                Acquire
              </button>
              <button
                onClick={startAR}
                className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-primary text-primary rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all"
              >
                <Camera className="w-4 h-4" />
                Try in AR
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                  wishlist
                    ? "border-red-400 text-red-400"
                    : "border-primary/20 text-primary/60 hover:border-primary"
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlist ? "fill-red-400" : ""}`} />
                {wishlist ? "Saved" : "Wishlist"}
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-primary/20 text-primary/60 hover:border-primary transition-all">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Works */}
      <div className="container px-4 md:px-6 mx-auto mt-16">
        <h3 className="text-xl md:text-3xl font-black tracking-tighter uppercase text-primary mb-8">
          Also Available
        </h3>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {relatedWorks.map((work) => (
            <Link key={work.id} href={`/artwork/${work.id}`} className="group">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-primary/10 mb-3">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-xs md:text-sm truncate">{work.title}</p>
                  <p className="text-white/60 text-[9px] md:text-xs font-bold uppercase tracking-widest">
                    {work.artist} — {work.price}
                  </p>
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
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px),
                                    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)`,
                }}
              />
              <div className="absolute bottom-[35%] left-0 right-0 h-px bg-white/10" />
              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/40 to-transparent" />
            </div>

            {/* Top HUD */}
            <div className="relative z-10 flex items-start justify-between px-5 pt-14 pb-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  Camera Active
                </div>
                {arStep !== "scanning" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Surface Mapped
                  </motion.div>
                )}
                {arStep === "placed" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    SLAM Tracking: On · 8ms
                  </motion.div>
                )}
              </div>
              <button
                onClick={() => { setArMode(false); setArStep("scanning"); }}
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AR Scene */}
            <div className="relative flex-1 flex items-center justify-center px-4">
              {arStep === "scanning" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-primary/40 border-t-primary animate-spin" />
                  <p className="text-white font-bold text-sm uppercase tracking-widest">
                    Scanning surfaces...
                  </p>
                </motion.div>
              )}

              {arStep === "placing" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-56 h-44 border-2 border-dashed border-primary/60 rounded-lg flex items-center justify-center animate-pulse">
                    <p className="text-primary/80 text-xs font-black uppercase tracking-widest text-center px-4">
                      Move your device to<br />place the artwork
                    </p>
                  </div>
                </motion.div>
              )}

              {arStep === "placed" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative"
                >
                  <div className="absolute inset-0 translate-y-4 blur-2xl bg-black/50 scale-110 rounded-sm" />
                  <div className="relative w-52 md:w-72 aspect-[4/5] rounded-sm overflow-hidden border-[10px] border-[#d4c4a0] shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
                    <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
                    <div className="absolute inset-0 border border-primary/30 rounded-sm pointer-events-none">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                      <div className="absolute -top-7 left-0 right-0 flex justify-center">
                        <div className="bg-primary/90 backdrop-blur-md text-white text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                          {artwork.title} · {artwork.dimensions}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mx-auto w-40 h-3 bg-black/40 blur-md rounded-full" />
                </motion.div>
              )}
            </div>

            {/* Bottom Controls */}
            {arStep === "placed" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 px-5 pb-10 flex flex-col gap-4"
              >
                <div className="flex justify-center gap-6">
                  {[
                    { icon: <Move className="w-5 h-5" />, label: "Move" },
                    { icon: <RotateCw className="w-5 h-5" />, label: "Rotate" },
                    { icon: <Maximize2 className="w-5 h-5" />, label: "Scale" },
                  ].map((ctrl) => (
                    <button key={ctrl.label} className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                        {ctrl.icon}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/60">
                        {ctrl.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-1">
                  <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl shadow-primary/40">
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

            {/* Step Dots */}
            <div className="relative z-10 flex justify-center gap-2 pb-5">
              {(["scanning", "placing", "placed"] as const).map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    arStep === step ? "w-8 bg-primary" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
