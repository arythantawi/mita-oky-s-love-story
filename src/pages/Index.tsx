import React, { useState, useEffect } from 'react';
import { CoverSection } from '@/components/wedding/CoverSection';
import { CoupleSection } from '@/components/wedding/CoupleSection';
import { EventSection } from '@/components/wedding/EventSection';
import { TimelineSection } from '@/components/wedding/TimelineSection';
import { GiftSection } from '@/components/wedding/GiftSection';
import { GuestbookSection } from '@/components/wedding/GuestbookSection';
import { FooterSection } from '@/components/wedding/FooterSection';
import { MusicPlayer } from '@/components/wedding/MusicPlayer';
import { CaricatureSection } from '@/components/wedding/CaricatureSection';
import { Helmet } from 'react-helmet-async';

const Index: React.FC = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling when invitation is not open
    if (!isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInvitationOpen]);

  return (
    <>
      <Helmet>
        <title>Pernikahan Oky & Mita | 16-17 Januari 2026</title>
        <meta name="description" content="Undangan pernikahan Oky Dwi Prasetyo & Mita Berliana. Akad Nikah: 16 Januari 2026. Resepsi: 17 Januari 2026. Lumajang, Jawa Timur." />
        <meta property="og:title" content="Pernikahan Oky & Mita" />
        <meta property="og:description" content="Undangan pernikahan Oky Dwi Prasetyo & Mita Berliana" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="relative">
        {!isInvitationOpen ? (
          <CoverSection onOpenInvitation={() => setIsInvitationOpen(true)} />
        ) : (
          <div className="animate-fade-in">
            <CoupleSection />
            <EventSection />
            <TimelineSection />
            <CaricatureSection />
            <GiftSection />
            <GuestbookSection />
            <FooterSection />
            <MusicPlayer />
          </div>
        )}
      </main>
    </>
  );
};

export default Index;
