"use client"

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Cart } from "./Cart";
import { useCart } from "@/lib/CartContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsOpen: setIsCartOpen, totalItems } = useCart();

  const navLinks = [
    { name: "GALLERY", href: "/gallery" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "ARTISTS", href: "/artists" },
    { name: "AR EXPERIENCE", href: "/ar" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-[100] glass px-6 py-4 flex flex-col items-center"
      >
        <div className="container mx-auto flex justify-between items-center px-0">
          <Link href="/" className="text-2xl font-black tracking-tighter gradient-text relative z-[110]">
            NMA ART
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex gap-10 text-sm font-black">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-primary transition-colors tracking-[0.2em] text-[13px]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center h-full">
               <ThemeToggle />
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-primary hover:scale-105 transition-all text-white shadow-lg shadow-primary/20"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-white text-primary text-[10px] font-black rounded-full flex items-center justify-center border-2 border-primary"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            
            <Cart />

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground relative z-[110]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-background backdrop-blur-3xl lg:hidden flex flex-col p-6 pt-0"
          >
            {/* Top bar inside mobile menu (covers the navbar) */}
            <div className="flex items-center justify-between py-5 border-b border-primary/10 mb-8">
              <span className="text-2xl font-black tracking-tighter gradient-text">NMA ART</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start gap-10 w-full max-w-sm">
              <div className="flex flex-col items-start gap-6 lg:hidden">

                 <button className="px-10 py-4 bg-primary text-white rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl shadow-primary/40">
                    EXPLORE COLLECTION
                 </button>
              </div>

              <div className="flex flex-col items-start gap-8 w-full mt-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="w-full text-left"
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-bold hover:text-primary transition-colors block py-3"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-16 text-left w-full"
              >
                <div className="text-[11px] tracking-[0.4em] font-black text-primary mb-8 uppercase">Stay Connected</div>
                <div className="flex flex-col gap-5 w-full">
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="bg-primary/5 border-2 border-primary/10 rounded-full px-10 py-6 text-sm font-black outline-none focus:border-primary w-full uppercase tracking-widest placeholder:opacity-40"
                  />
                  <button className="w-full py-6 bg-foreground text-background rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-primary transition-colors shadow-2xl">
                    JOIN THE ELITE LIST
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Background Decoration for Mobile Menu */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-20 -mb-20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
