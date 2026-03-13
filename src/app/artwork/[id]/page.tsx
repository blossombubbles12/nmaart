"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ARTWORKS } from "@/lib/artworks";
import { ArrowLeft, Camera, ShoppingBag, Heart, Share2 } from "lucide-react";
import { WebXRAR } from "@/components/ar/WebXRAR";

export default function ArtworkPage() {
  const { id } = useParams();
  const artwork = ARTWORKS.find((a) => a.id === id);
  const [arMode, setArMode] = useState(false);
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


  const relatedWorks = ARTWORKS.filter((a) => a.id !== artwork.id);

  return (
    <div className="min-h-screen pb-24">
      {/* Real WebXR AR overlay — mounts when active */}
      {arMode && (
        <WebXRAR
          imageUrl={artwork.image}
          title={artwork.title}
          price={artwork.price}
          onClose={() => setArMode(false)}
        />
      )}
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
            onClick={() => setArMode(true)}
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
                onClick={() => setArMode(true)}
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

    </div>
  );
}
