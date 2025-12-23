import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const playlist = [
  { title: "Akad", artist: "Payung Teduh", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Perfect", artist: "Ed Sheeran", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Teman Hidup", artist: "Tulus", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onEnded={nextTrack}
        loop={false}
      />
      
      <div className="fixed bottom-6 right-6 z-50">
        {isExpanded ? (
          <div className="bg-ivory/95 backdrop-blur-md rounded-2xl shadow-card p-4 border border-rose-light animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-rose flex items-center justify-center">
                <Music className="w-6 h-6 text-ivory" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm text-foreground truncate">{playlist[currentTrack].title}</p>
                <p className="text-xs text-muted-foreground truncate">{playlist[currentTrack].artist}</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="icon" onClick={prevTrack} className="h-8 w-8">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button variant="wedding" size="icon" onClick={togglePlay} className="h-10 w-10">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextTrack} className="h-8 w-8">
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className={`w-14 h-14 rounded-full bg-gradient-rose shadow-glow flex items-center justify-center transition-transform hover:scale-110 ${isPlaying ? 'animate-pulse-soft' : ''}`}
          >
            <Music className="w-6 h-6 text-ivory" />
          </button>
        )}
      </div>
    </>
  );
};
