import React, { useState } from 'react';
import { Copy, Check, Gift, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeartDivider } from './HeartDivider';
import { useInView } from '@/hooks/useInView';
import { toast } from 'sonner';

const bankAccounts = [
  {
    bank: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Oky Dwi Prasetyo',
    color: 'from-blue-500 to-blue-600',
    logo: '🏦',
  },
  {
    bank: 'Mandiri',
    accountNumber: '0987654321',
    accountName: 'Mita Berliana',
    color: 'from-yellow-500 to-yellow-600',
    logo: '🏛️',
  },
];

export const GiftSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-ivory overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-rose/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-rose mb-6">
            <Gift className="w-8 h-8 text-ivory" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-body tracking-widest uppercase mb-4">
            Wedding Gift
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Kirim Hadiah
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan hadiah, kami menyediakan informasi berikut.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {bankAccounts.map((account, index) => (
            <div
              key={account.bank}
              className={`bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-card border border-rose-light/50 text-center transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${account.color} flex items-center justify-center mx-auto mb-4 shadow-soft`}>
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-display text-xl text-foreground mb-2">
                Bank {account.bank}
              </h3>
              
              <p className="font-body text-muted-foreground text-sm mb-4">
                a.n. {account.accountName}
              </p>

              <div className="bg-rose-light/50 rounded-xl p-4 mb-4">
                <p className="font-display text-2xl text-foreground tracking-wider">
                  {account.accountNumber}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => copyToClipboard(account.accountNumber, index)}
                className="w-full"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Salin Nomor Rekening
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>

        <HeartDivider className="mt-16" />

        {/* Physical gift address */}
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">
            Kirim Hadiah ke Alamat
          </h3>
          <p className="font-body text-muted-foreground leading-relaxed">
            Q8F6+5XG, Pd. Kobong, Kedungrejo, Kec. Rowokangkung, Kabupaten Lumajang, Jawa Timur 67359
          </p>
          <p className="font-body text-muted-foreground mt-2">
            a.n. <span className="font-medium text-foreground">Oky Dwi Prasetyo / Mita Berliana</span>
          </p>
        </div>
      </div>
    </section>
  );
};
