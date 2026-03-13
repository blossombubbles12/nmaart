"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/lib/CartContext"
import Image from "next/image"

export function Cart() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-primary/10 shadow-2xl z-[1000] flex flex-col pt-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pb-8 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter">Your Bag</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{totalItems} items curated</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-full hover:bg-primary/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 opacity-40">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest">Your curated collection is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6 group"
                  >
                    <div className="relative w-24 h-32 rounded-xl overflow-hidden border border-primary/10 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-1">{item.artist}</p>
                          <h3 className="text-base font-black uppercase tracking-tighter leading-tight">{item.title}</h3>
                        </div>
                        <p className="font-black text-sm">{item.price}</p>
                      </div>
                      
                      <p className="text-[10px] font-bold text-secondary-foreground opacity-60 uppercase tracking-widest mb-auto mt-1">
                        {item.dimensions}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-3 py-1.5 border border-primary/5">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-secondary-foreground/40 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-8 pt-8 pb-12 border-t border-primary/10 bg-secondary/20 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span>Shipping & Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-black uppercase tracking-tight">Total</span>
                  <span className="text-2xl font-black text-primary tracking-tighter">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full py-6 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 hover:opacity-90 transition-all group">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[9px] text-center font-bold text-secondary-foreground/40 uppercase tracking-widest">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
