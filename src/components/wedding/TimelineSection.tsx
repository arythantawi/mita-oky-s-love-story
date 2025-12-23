import React from 'react';
import { Heart } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const timeline = [
  {
    year: '2020',
    title: 'Awal Bertemu',
    description: 'Pertemuan pertama yang tak terduga, namun menjadi awal dari segalanya. Dua hati yang berbeda mulai menemukan kecocokan.',
    icon: '💫',
  },
  {
    year: '2021',
    title: 'Perjuangan Bersama',
    description: 'Melewati berbagai rintangan dan tantangan bersama. Setiap ujian semakin memperkuat ikatan cinta kami.',
    icon: '💪',
  },
  {
    year: '2024',
    title: 'Lamaran',
    description: 'Momen sakral ketika janji untuk bersama selamanya diucapkan. Dengan restu orang tua, kami siap melangkah ke jenjang berikutnya.',
    icon: '💍',
  },
  {
    year: '2026',
    title: 'Pernikahan',
    description: 'Puncak dari perjalanan cinta kami. Dengan ridho Allah SWT, kami resmi menjadi satu keluarga.',
    icon: '👰🤵',
  },
];

export const TimelineSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-gradient-soft overflow-hidden">
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-rose/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-peach/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4">
            Our Journey
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Cerita Cinta Kami
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose via-gold to-rose -translate-x-1/2" />

          {timeline.map((item, index) => (
            <div
              key={item.year}
              className={`relative flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div
                className={`w-5/12 transition-all duration-1000 ${
                  isInView ? 'opacity-100' : 'opacity-0'
                } ${index % 2 === 0 ? (isInView ? 'translate-x-0' : '-translate-x-10') : (isInView ? 'translate-x-0' : 'translate-x-10')}`}
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                <div className={`bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-rose-light/50 ${
                  index % 2 === 0 ? 'text-right' : 'text-left'
                }`}>
                  <span className="text-4xl mb-3 block">{item.icon}</span>
                  <span className="inline-block font-display text-sm text-rose bg-rose-light px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-rose shadow-glow flex items-center justify-center transition-all duration-500 ${
                  isInView ? 'scale-100' : 'scale-0'
                }`} style={{ transitionDelay: `${400 + index * 200}ms` }}>
                  <Heart className="w-5 h-5 text-ivory fill-ivory" />
                </div>
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
