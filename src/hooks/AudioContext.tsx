import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create persistent audio element
    const audio = new Audio();
    audio.src = '/media/salesman_video.mp4';
    audio.preload = 'auto';
    audio.volume = 0.8;
    audio.loop = true;

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      // Fallback to .mp3 if .mp4 audio stream fails
      if (!audio.src.endsWith('salseman.mp3')) {
        audio.src = '/media/salseman.mp3';
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      }
    };

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play prevented by browser policy:', err);
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const pause = () => {
    stop();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        stop();
      } else {
        play();
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, play, pause, stop }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useMusic must be used within an AudioProvider');
  }
  return context;
}
