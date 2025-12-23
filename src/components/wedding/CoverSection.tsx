import React, { useState } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloralDecoration } from './FloralDecoration';
import { useGuestName } from '@/hooks/useGuestName';
import heroBackground from '@/assets/wedding-hero-bg.jpg';

interface CoverSectionProps {
  onOpenInvitation: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onOpenInvitation }) => {
  const guestName = useGuestName();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 800);
  };

  return (
    <section className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${isOpening ? 'opacity-0 scale-105' : ''}`}>
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />

      {/* Floating decorations */}
      <FloralDecoration position="top-left" className="animate-float opacity-40" />
      <FloralDecoration position="top-right" className="animate-float-delayed opacity-40" />
      <FloralDecoration position="bottom-left" className="animate-float-delayed opacity-40" />
      <FloralDecoration position="bottom-right" className="animate-float opacity-40" />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose/30 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          The Wedding of
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-2 animate-fade-up drop-shadow-sm" style={{ animationDelay: '0.4s' }}>
          Oky
        </h1>
        
        <div className="flex items-center justify-center gap-4 my-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="h-px w-12 bg-gold" />
          <span className="font-display text-2xl md:text-3xl text-gold italic">&</span>
          <div className="h-px w-12 bg-gold" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 animate-fade-up drop-shadow-sm" style={{ animationDelay: '0.6s' }}>
          Mita
        </h1>

        <div className="bg-ivory/90 backdrop-blur-md rounded-2xl p-6 shadow-card border border-rose-light/50 mb-8 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm text-muted-foreground mb-2">Kepada Yth.</p>
          <p className="font-display text-xl md:text-2xl text-foreground">{guestName}</p>
          <p className="text-sm text-muted-foreground mt-2">Anda diundang untuk hadir di acara pernikahan kami</p>
        </div>

        <Button
          variant="wedding"
          size="xl"
          onClick={handleOpen}
          className="animate-fade-up group"
          style={{ animationDelay: '1s' }}
        >
          <Heart className="w-5 h-5 mr-2 group-hover:animate-heartbeat" />
          Buka Undangan
        </Button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};
