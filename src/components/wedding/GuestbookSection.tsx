import React, { useState } from 'react';
import { Send, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { toast } from 'sonner';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

const initialMessages: GuestMessage[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah mawaddah warahmah. Bahagia selalu!',
    timestamp: new Date('2025-01-10'),
  },
  {
    id: '2',
    name: 'Siti Aminah',
    message: 'Barakallah untuk kalian berdua. Semoga pernikahan ini menjadi awal kebahagiaan yang tak berkesudahan.',
    timestamp: new Date('2025-01-09'),
  },
  {
    id: '3',
    name: 'Ahmad Rizki',
    message: 'Happy wedding Oky & Mita! Semoga langgeng sampai akhir hayat. Aamiin.',
    timestamp: new Date('2025-01-08'),
  },
];

export const GuestbookSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [messages, setMessages] = useState<GuestMessage[]>(initialMessages);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Mohon lengkapi nama dan ucapan Anda');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date(),
    };
    
    setMessages([newMessage, ...messages]);
    setName('');
    setMessage('');
    setIsSubmitting(false);
    toast.success('Ucapan Anda telah terkirim!');
  };

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-gradient-soft overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-rose/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-peach/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-rose mb-6">
            <MessageCircle className="w-8 h-8 text-ivory" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4">
            Guestbook
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Buku Tamu
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Tuliskan doa dan ucapan terbaik Anda untuk kami
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-card border border-rose-light/50 mb-12 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Nama Anda
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-ivory border border-rose-light/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose font-body"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-body text-sm text-foreground mb-2">
                  Ucapan & Doa
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-ivory border border-rose-light/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose font-body resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="wedding"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Mengirim...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Ucapan
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Messages */}
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-rose-light/30 transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-ivory text-sm">
                      {msg.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display text-foreground">{msg.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
