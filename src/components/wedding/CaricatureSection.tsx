import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Download, Share2, Sparkles, Upload, X } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const styles = [
  { id: 'cartoon', name: 'Cartoon', emoji: '🎨' },
  { id: 'sketch', name: 'Sketch', emoji: '✏️' },
  { id: 'watercolor', name: 'Watercolor', emoji: '🎭' },
  { id: 'anime', name: 'Anime', emoji: '⭐' },
  { id: 'pop_art', name: 'Pop Art', emoji: '🌈' },
];

export const CaricatureSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('cartoon');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCaricature = async () => {
    if (!selectedImage) {
      toast.error('Silakan pilih foto terlebih dahulu');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-caricature', {
        body: { 
          imageBase64: selectedImage,
          style: selectedStyle
        }
      });

      if (error) {
        console.error('Error generating caricature:', error);
        toast.error('Gagal membuat karikatur. Silakan coba lagi.');
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedImage(data.image);
      toast.success('Karikatur berhasil dibuat!');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const addWatermark = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(imageUrl);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(imageUrl);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        // Add watermark
        const fontSize = Math.max(20, img.width / 25);
        ctx.font = `bold ${fontSize}px "Playfair Display", serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        
        const watermarkText = 'Wedding of Oky & Mita';
        const x = canvas.width / 2;
        const y = canvas.height - fontSize - 20;
        
        // Draw text stroke for better visibility
        ctx.strokeText(watermarkText, x, y);
        ctx.fillText(watermarkText, x, y);
        
        // Add decorative hearts
        ctx.font = `${fontSize * 0.8}px serif`;
        ctx.fillText('💕', x - ctx.measureText(watermarkText).width / 2 - 30, y);
        ctx.fillText('💕', x + ctx.measureText(watermarkText).width / 2 + 30, y);
        
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(imageUrl);
      img.src = imageUrl;
    });
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const watermarkedImage = await addWatermark(generatedImage);
      const link = document.createElement('a');
      link.href = watermarkedImage;
      link.download = 'karikatur-wedding-oky-mita.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Karikatur berhasil diunduh!');
    } catch (err) {
      toast.error('Gagal mengunduh gambar');
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      const watermarkedImage = await addWatermark(generatedImage);
      
      // Convert base64 to blob for sharing
      const response = await fetch(watermarkedImage);
      const blob = await response.blob();
      const file = new File([blob], 'karikatur-wedding.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Karikatur Wedding Oky & Mita',
          text: 'Lihat karikatur saya untuk pernikahan Oky & Mita! 💕',
          files: [file]
        });
      } else {
        // Fallback to WhatsApp share
        const text = encodeURIComponent('Lihat karikatur saya untuk pernikahan Oky & Mita! 💕');
        window.open(`https://wa.me/?text=${text}`, '_blank');
        toast.info('Unduh gambar lalu bagikan ke WhatsApp');
      }
    } catch (err) {
      console.error('Share error:', err);
      toast.error('Gagal membagikan. Silakan unduh dan bagikan manual.');
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 px-4 bg-gradient-to-b from-wedding-ivory to-wedding-rose/20 overflow-hidden"
    >
      {/* Hidden canvas for watermarking */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-peach/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-wedding-rose/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Sparkles className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl text-wedding-rose mb-4">
            AI Karikatur
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Buat karikatur unik dari foto Anda sebagai kenang-kenangan di hari pernikahan kami
          </p>
        </div>

        <div className={`bg-background/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Style Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">
              Pilih Gaya Karikatur
            </label>
            <div className="flex flex-wrap gap-3 justify-center">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                    selectedStyle === style.id
                      ? 'border-wedding-rose bg-wedding-rose/20 text-wedding-rose scale-105'
                      : 'border-border hover:border-wedding-peach hover:bg-wedding-peach/10'
                  }`}
                >
                  <span className="mr-2">{style.emoji}</span>
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Foto Anda
              </label>
              
              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-wedding-rose/40 rounded-2xl p-8 text-center cursor-pointer hover:border-wedding-rose hover:bg-wedding-rose/5 transition-all duration-300 aspect-square flex flex-col items-center justify-center"
                >
                  <Camera className="w-12 h-12 text-wedding-rose/50 mb-4" />
                  <p className="text-muted-foreground mb-2">Klik untuk upload foto</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG (Maks. 5MB)</p>
                </div>
              ) : (
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={resetForm}
                    className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button
                onClick={generateCaricature}
                disabled={!selectedImage || isGenerating}
                className="w-full bg-gradient-to-r from-wedding-rose to-wedding-peach hover:opacity-90 text-white"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Membuat Karikatur...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Buat Karikatur
                  </>
                )}
              </Button>
            </div>

            {/* Result Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Hasil Karikatur
              </label>

              {!generatedImage ? (
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center aspect-square flex flex-col items-center justify-center bg-muted/30">
                  <Sparkles className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {isGenerating ? 'Memproses foto Anda...' : 'Hasil karikatur akan muncul di sini'}
                  </p>
                  {isGenerating && (
                    <div className="mt-4 w-48 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-wedding-rose to-wedding-peach animate-pulse" style={{ width: '60%' }} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={generatedImage} 
                    alt="Caricature Result" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-center font-display text-lg">
                      Wedding of Oky & Mita 💕
                    </p>
                  </div>
                </div>
              )}

              {generatedImage && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 border-wedding-rose text-wedding-rose hover:bg-wedding-rose hover:text-white"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Unduh
                  </Button>
                  <Button
                    onClick={handleShare}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Bagikan
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
