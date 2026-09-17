import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, MapPin, CalendarDays, Ticket, Compass } from 'lucide-react';
import Countdown from './Countdown';
import { EVENT_DATES_LABEL, VENUE_SHORT, ORGANIZER } from '../data/content';
import { useMusic } from '../hooks/AudioContext';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function FloatShape({ className, d, delay = 0 }: { className?: string; d: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
      animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <path d={d} />
    </motion.svg>
  );
}

export default function Hero({ booted }: { booted: boolean }) {
  const { isPlaying } = useMusic();
  const salesmanVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = salesmanVideoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.currentTime = 0;
      video.play().catch((err) => console.warn('Salesman video play error:', err));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <section id="home" className="grain relative flex min-h-[100svh] items-center overflow-hidden" aria-label="INTELLETTO-26 hero">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Default ambient hero video */}
        <video
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isPlaying ? 'opacity-0' : 'opacity-45'
          }`}
          src="/media/hero-arena.mp4"
          poster="/media/arena-key.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Squid Game Salesman video playing when logo clicked */}
        <video
          ref={salesmanVideoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isPlaying ? 'opacity-65' : 'opacity-0 pointer-events-none'
          }`}
          src="/media/salesman_video.mp4"
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Dark cinematic gradient overlays for pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/50 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-transparent to-void/70" />
        <div className="bg-arena-grid animate-grid-pan absolute inset-0 opacity-55" />
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-crimson/25 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-neon/20 blur-[130px]" />

        {/* Dynamic neon pink audio mood glow when video is active */}
        {isPlaying && (
          <div className="absolute inset-0 bg-neon/10 mix-blend-screen pointer-events-none transition-opacity duration-1000 animate-pulse" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 text-neon/50" aria-hidden="true">
        <FloatShape className="absolute top-[16%] right-[10%] hidden h-20 w-20 md:block" d="M12 4a8 8 0 100 16 8 8 0 000-16z" />
        <FloatShape className="absolute top-[58%] right-[22%] hidden h-12 w-12 text-ivory/30 lg:block" d="M12 4l8 16H4z" delay={1.4} />
        <FloatShape className="absolute bottom-[18%] left-[6%] hidden h-14 w-14 text-crimson/60 md:block" d="M4 4h16v16H4z" delay={2.2} />
        <FloatShape className="absolute top-[24%] left-[14%] h-8 w-8 text-ivory/20" d="M12 4l8 16H4z" delay={0.8} />
      </div>

      <div className="font-grotesk pointer-events-none absolute top-1/2 left-5 hidden -translate-y-1/2 xl:block" aria-hidden="true">
        <p className="vertical-rail text-[10px] text-faint">SECTOR 07 — ARENA BREACH // 12.91 N 79.13 E</p>
      </div>
      <div className="font-grotesk pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 xl:block" aria-hidden="true">
        <p className="vertical-rail text-[10px] text-faint">8 ARENAS · 02 DIVISIONS · 01 NATIONAL STAGE</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={booted ? 'show' : 'hidden'}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-14 sm:px-6 sm:pt-32 sm:pb-20 md:pt-36 lg:px-8"
      >
        <motion.div variants={item} className="flex flex-wrap items-center gap-2">
          <span className="clip-tag font-grotesk inline-flex items-center gap-2 bg-neon/15 px-4 py-2 text-[10.5px] font-semibold tracking-[0.3em] text-neon uppercase ring-1 ring-neon/40 sm:text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" aria-hidden="true" />
            {ORGANIZER} presents
          </span>
        </motion.div>

        <motion.p variants={item} className="font-grotesk mt-3 text-xs tracking-[0.45em] text-steel sm:mt-6 sm:text-sm">
          NATIONAL LEVEL TECHNICAL SYMPOSIUM
        </motion.p>

        <motion.h1 variants={item} className="font-display mt-2 leading-[0.95] font-black tracking-tight sm:mt-3">
          <span className="block text-[clamp(2.1rem,8.6vw,7rem)] text-ivory">
            INTELLETTO<span className="text-neon text-glow-pink animate-flicker">-26</span>
          </span>
          <span className="font-grotesk mt-2 block text-[clamp(0.8rem,2.4vw,1.5rem)] font-medium tracking-[0.28em] text-dim uppercase sm:mt-4">
            The Survival Arena
          </span>
        </motion.h1>

        <motion.p variants={item} className="mt-3 max-w-2xl text-[13.5px] leading-snug text-dim sm:mt-6 sm:text-[15px] sm:leading-relaxed">
          <span className="hidden sm:inline">Eight competition arenas. Two divisions. One national stage. Conducted by the Department of Artificial Intelligence and Machine Learning. Solve, design, battle, present, and outlast the finest student minds in the country — under the lights of the arena.</span>
          <span className="sm:hidden">8 arenas. 2 divisions. One national stage — outlast the finest student minds under the lights of the arena.</span>
        </motion.p>

        <motion.div variants={item} className="font-grotesk mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10.5px] tracking-[0.18em] text-steel uppercase sm:mt-6 sm:gap-x-6 sm:gap-y-2 sm:text-[13px]">
          <span className="inline-flex items-center gap-1.5 sm:gap-2"><CalendarDays size={14} className="text-neon sm:size-[15px]" /> {EVENT_DATES_LABEL}</span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2"><MapPin size={14} className="text-neon sm:size-[15px]" /> <span className="hidden sm:inline">{VENUE_SHORT}</span><span className="sm:hidden">CAHCET · Vellore</span></span>
        </motion.div>

        <motion.div variants={item} className="mt-5 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:items-center sm:gap-3">
          <Link
            to="/register"
            className="clip-btn group font-grotesk inline-flex items-center justify-center gap-2 bg-neon px-6 py-3 text-[12.5px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-crimson hover:shadow-[0_0_36px_rgba(255,46,126,0.6)] sm:px-8 sm:py-4 sm:text-sm"
          >
            <Ticket size={16} className="transition-transform group-hover:-rotate-12" /> Register Now
          </Link>
          <Link
            to="/events"
            className="clip-btn font-grotesk inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3 text-[12.5px] font-bold tracking-[0.2em] text-ivory uppercase backdrop-blur transition-all duration-300 hover:border-neon/60 hover:bg-neon/10 sm:px-8 sm:py-4 sm:text-sm"
          >
            <Compass size={16} /> Explore Events
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-6 sm:mt-12">
          <p className="font-grotesk mb-2 text-[9px] tracking-[0.35em] text-faint sm:mb-3 sm:text-[10px]">THE ARENA OPENS IN</p>
          <Countdown />
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-void/70 py-3 backdrop-blur" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
          {[0, 1].map((n) => (
            <span key={n} className="font-grotesk text-[11px] tracking-[0.35em] text-dim uppercase">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  Enter the arena <span className="mx-6 text-neon">○</span> Intelletto-26 <span className="mx-6 text-neon">△</span> 13 stages <span className="mx-6 text-neon">□</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-neon md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
