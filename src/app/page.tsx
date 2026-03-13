import { AnimatedHero } from "@/components/AnimatedHero";
import { FeaturedArtwork } from "@/components/FeaturedArtwork";
import { Services } from "@/components/Services";
import { ARViewer } from "@/components/ar/ARViewer";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center overflow-x-hidden">
      <AnimatedHero />
      
      <div className="w-full flex flex-col items-center">
        <FeaturedArtwork />
        <Services />

        <section className="py-12 md:py-16 container px-6 mx-auto flex flex-col items-center text-center">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-primary mb-6">Interactive</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">IMMERSE <span className="opacity-40">YOURSELF</span></h3>
            <p className="text-base md:text-xl text-secondary-foreground max-w-2xl font-bold uppercase tracking-widest leading-relaxed">
              Our proprietary AR integration allows you to see how each piece of art would look in your physical space before acquisition.
            </p>
          </div>
          <ARViewer />
        </section>

        {/* Curated Collections Preview */}
        <section className="py-12 md:py-16 bg-secondary/30 w-full flex justify-center overflow-hidden">
          <div className="container px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center mx-auto">
            <div className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border-2 border-primary/10 max-w-md mx-auto w-full group shadow-2xl shadow-primary/5">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-40 group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-8 md:p-12 text-center relative z-10">
                    <span className="text-8xl md:text-[14rem] font-black opacity-10 absolute inset-0 flex items-center justify-center pointer-events-none">01</span>
                    <h4 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">NEO <br/> CLASSICISM</h4>
                    <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase max-w-[240px] mx-auto opacity-70">Modern take on classical digital forms and balance.</p>
                    <button className="mt-4 px-10 py-5 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-black text-[11px] uppercase tracking-[0.3em]">DISCOVER COLLECTION</button>
                  </div>
               </div>
            </div>
            <div className="space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
                <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-primary mb-6">Collections</h2>
                <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">CURATED <br/><span className="opacity-40">SERIES</span></h3>
              </div>
              <div className="space-y-8 w-full max-w-md">
                {[
                  { title: "Etheral Landscapes", count: "12 Pieces" },
                  { title: "Abstract Geometry", count: "08 Pieces" },
                  { title: "Digital Sculptura", count: "15 Pieces" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer border-b-2 border-primary/10 pb-6 w-full">
                    <div className="text-left">
                      <h5 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors tracking-tighter uppercase">{item.title}</h5>
                      <p className="text-[11px] font-black text-secondary-foreground tracking-[0.3em] uppercase mt-2 opacity-60">{item.count}</p>
                    </div>
                    <div className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="text-2xl">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Artist Story */}
        <section className="py-12 md:py-16 container px-6 flex flex-col items-center text-center mx-auto">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/10 mb-12 border-2 border-primary/20 overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent opacity-50" />
          </div>
          <h2 className="text-2xl md:text-5xl font-black max-w-4xl mb-12 leading-[1.2] tracking-tighter sm:px-6 uppercase">
            "Art is not just what we see, but the space we create between reality and imagination."
          </h2>
          <div className="w-24 h-1 bg-primary/20 mb-10" />
          <p className="text-primary font-black tracking-[0.5em] uppercase text-[12px]">Marcus Vane — Lead Curator</p>
        </section>

        {/* Newsletter */}
        <section className="py-12 md:py-16 container px-6 mx-auto w-full flex justify-center">
          <div className="glass p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] text-center border-2 border-primary/10 relative overflow-hidden w-full flex flex-col items-center">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">STAY <br/><span className="gradient-text">INSPIRED</span></h2>
            <p className="text-sm md:text-xl text-secondary-foreground max-w-2xl mx-auto mb-12 font-bold uppercase tracking-widest leading-relaxed">
              Join our private list to receive exclusive updates on new drops and secret gallery exhibitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10 w-full px-2">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="bg-primary/5 border-2 border-primary/10 rounded-full px-8 py-5 outline-none focus:border-primary transition-colors flex-grow text-foreground placeholder:text-muted-foreground text-xs font-black uppercase tracking-[0.2em]"
              />
              <button className="px-10 py-5 bg-primary text-white rounded-full font-black hover:opacity-90 transition-all text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 whitespace-nowrap">
                SUBSCRIBE NOW
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
