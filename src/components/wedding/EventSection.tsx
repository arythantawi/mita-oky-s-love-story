import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeartDivider } from './HeartDivider';
import { useInView } from '@/hooks/useInView';

const events = [
  {
    title: 'Akad Nikah',
    date: 'Jumat, 16 Januari 2026',
    time: '07.00 WIB',
    icon: '💍',
  },
  {
    title: 'Resepsi',
    date: 'Sabtu, 17 Januari 2026',
    time: '13.00 WIB',
    icon: '🎉',
  },
];

const location = {
  name: 'Kediaman Mempelai Wanita',
  address: 'Q8F6+5XG, Pd. Kobong, Kedungrejo, Kec. Rowokangkung, Kabupaten Lumajang, Jawa Timur 67359',
  mapsUrl: 'https://maps.google.com/?q=-8.1234,113.5678',
};

export const EventSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const addToCalendar = () => {
    const startDate = '20260116T000000';
    const endDate = '20260117T235900';
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Oky+%26+Mita&dates=${startDate}/${endDate}&details=Pernikahan+Oky+%26+Mita&location=${encodeURIComponent(location.address)}`;
    window.open(url, '_blank');
  };

  const openMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`, '_blank');
  };

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-ivory overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-light/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rose-light/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4">
            Save The Date
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Waktu & Tempat
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-card border border-rose-light/50 text-center transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{event.icon}</div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                {event.title}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <Calendar className="w-5 h-5 text-rose" />
                  <span className="font-body">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-rose" />
                  <span className="font-body">{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <HeartDivider />

        {/* Location */}
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-rose" />
            <h3 className="font-display text-xl md:text-2xl text-foreground">
              {location.name}
            </h3>
          </div>
          
          <p className="font-body text-muted-foreground mb-8 leading-relaxed">
            {location.address}
          </p>

          {/* Map embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-card mb-8 aspect-video bg-rose-light">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.5!2d113.5!3d-8.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDYnMDAuMCJTIDExM8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="wedding" size="lg" onClick={openMaps}>
              <Navigation className="w-5 h-5 mr-2" />
              Buka Google Maps
            </Button>
            <Button variant="outline" size="lg" onClick={addToCalendar}>
              <Calendar className="w-5 h-5 mr-2" />
              Simpan ke Kalender
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
