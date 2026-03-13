export function Footer() {
  return (
    <footer className="w-full py-20 px-6 border-t border-primary/10 bg-secondary/30 mt-20 flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div className="space-y-6 flex flex-col items-start">
          <h2 className="text-3xl font-black tracking-tighter gradient-text">NMA ART</h2>
          <p className="text-base md:text-lg font-bold text-secondary-foreground max-w-sm uppercase leading-relaxed tracking-wide">
            A premium digital art museum experience, showcasing the intersection of creativity and technology.
          </p>
        </div>
        
        <div className="space-y-6 flex flex-col items-start">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Gallery</h3>
          <ul className="space-y-3 text-sm font-black uppercase tracking-widest text-secondary-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors">Featured Works</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Collections</li>
            <li className="hover:text-primary cursor-pointer transition-colors">New Arrivals</li>
          </ul>
        </div>

        <div className="space-y-6 flex flex-col items-start">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Discover</h3>
          <ul className="space-y-3 text-sm font-black uppercase tracking-widest text-secondary-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors">AR Experience</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Artists</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Exhibitions</li>
          </ul>
        </div>

        <div className="space-y-6 flex flex-col items-start">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Connect</h3>
          <ul className="space-y-3 text-sm font-black uppercase tracking-widest text-secondary-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors">Instagram</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Twitter</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Newsletter</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl w-full mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.2em] text-secondary-foreground uppercase">
        <p>© 2026 NMA ART GALLERY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-10">
          <span className="hover:text-primary cursor-pointer transition-colors">PRIVACY POLICY</span>
          <span className="hover:text-primary cursor-pointer transition-colors">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
}
