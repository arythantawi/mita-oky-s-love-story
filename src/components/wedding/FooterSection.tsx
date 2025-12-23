import React from 'react';
import { Heart } from 'lucide-react';
import { FloralDecoration } from './FloralDecoration';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative py-20 md:py-32 bg-gradient-hero overflow-hidden">
      {/* Decorations */}
      <FloralDecoration position="bottom-left" />
      <FloralDecoration position="bottom-right" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4">
            Thank You
          </p>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Terima Kasih
          </h2>

          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-rose" />
            <Heart className="w-6 h-6 text-rose fill-rose animate-heartbeat" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-rose" />
          </div>

          <p className="font-display text-xl md:text-2xl text-foreground mb-2">
            Kami yang berbahagia
          </p>
          
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-gradient mb-8">
            Oky & Mita
          </h3>

          <p className="font-body text-sm text-muted-foreground">
            #OkyMitaWedding
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-0 left-0 right-0 py-4 text-center border-t border-rose-light/30">
        <p className="font-body text-xs text-muted-foreground">
          Made with <Heart className="w-3 h-3 inline text-rose fill-rose" /> for Oky & Mita
        </p>
      </div>
    </footer>
  );
};
