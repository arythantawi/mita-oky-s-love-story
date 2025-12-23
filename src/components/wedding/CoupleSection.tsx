import React from 'react';
import { Heart } from 'lucide-react';
import { HeartDivider } from './HeartDivider';
import { useInView } from '@/hooks/useInView';

export const CoupleSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-gradient-soft overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-peach/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4">
            Bismillahirrahmanirrahim
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Assalamu'alaikum Wr. Wb.
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Bride */}
          <div className={`text-center transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-rose rounded-full animate-pulse-soft" />
              <div className="absolute inset-2 bg-ivory rounded-full overflow-hidden shadow-card">
                <div className="w-full h-full bg-rose-light flex items-center justify-center">
                  <span className="font-display text-6xl text-rose-dark">M</span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 border-2 border-gold/30 rounded-full" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Mita Berliana, S.Si, M.Si
            </h3>
            <p className="font-body text-muted-foreground mb-4">
              Putri kedua dari
            </p>
            <p className="font-body text-foreground">
              Bapak Agus Bambang Dwi Purwanto
            </p>
            <p className="font-body text-foreground">
              & Ibu Uchuda
            </p>
          </div>

          {/* Divider for mobile */}
          <div className="md:hidden flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose fill-rose animate-heartbeat" />
          </div>

          {/* Groom */}
          <div className={`text-center transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-rose rounded-full animate-pulse-soft" />
              <div className="absolute inset-2 bg-ivory rounded-full overflow-hidden shadow-card">
                <div className="w-full h-full bg-rose-light flex items-center justify-center">
                  <span className="font-display text-6xl text-rose-dark">O</span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 border-2 border-gold/30 rounded-full" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Oky Dwi Prasetyo, S.Kom
            </h3>
            <p className="font-body text-muted-foreground mb-4">
              Putra kedua dari
            </p>
            <p className="font-body text-foreground">
              Bapak (Alm.) Sulaiman
            </p>
            <p className="font-body text-foreground">
              & Ibu Suji Rahayu
            </p>
          </div>
        </div>

        <HeartDivider className="mt-16" />

        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-display text-lg md:text-xl text-foreground italic leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
          </p>
          <p className="font-body text-muted-foreground mt-4">
            — QS. Ar-Rum: 21
          </p>
        </div>
      </div>
    </section>
  );
};
