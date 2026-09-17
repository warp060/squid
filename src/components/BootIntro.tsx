import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BootIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2000),
      setTimeout(() => setPhase(5), 2600),
      setTimeout(onDone, 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      exit={{ opacity: 0, filter: 'brightness(2.5)', transition: { duration: 0.6, ease: 'easeInOut' } }}
      onClick={onDone}
      role="presentation"
      aria-hidden="true"
    >
      <div className="bg-arena-grid absolute inset-0 opacity-40" />

      {/* Main circular logo container */}
      <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
        {/* Outer spinning gradient ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, var(--color-neon) 20%, transparent 40%, var(--color-crimson) 60%, transparent 80%, var(--color-neon) 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2.5px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2.5px))',
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={phase >= 1 ? { opacity: 1, rotate: 360 } : {}}
          transition={{ opacity: { duration: 0.5 }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
        />

        {/* Pulse ring 1 */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-neon/50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={phase >= 1 ? { scale: [0.9, 1.4, 1.4], opacity: [0.6, 0, 0] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />

        {/* Pulse ring 2 (delayed) */}
        <motion.span
          className="absolute inset-0 rounded-full border border-crimson/40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={phase >= 1 ? { scale: [0.9, 1.6, 1.6], opacity: [0.4, 0, 0] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
        />

        {/* Inner glow circle background */}
        <motion.span
          className="absolute inset-[4px] rounded-full border border-white/10"
          style={{ background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb), 0.06) 0%, var(--color-void) 70%)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Breathing glow behind guard */}
        <motion.span
          className="absolute inset-[15%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb), 0.2) 0%, transparent 70%)' }}
          animate={phase >= 2 ? { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Squid Game Guard SVG */}
        <motion.svg
          width="110"
          height="110"
          viewBox="0 0 200 200"
          fill="none"
          className="relative z-10"
          aria-hidden="true"
          style={{ filter: `drop-shadow(0 0 18px rgba(var(--theme-glow-rgb),0.7))` }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Hood / Head outline */}
          <motion.path
            d="M100 28 C68 28 48 52 48 78 L48 95 C48 95 50 100 56 102 L56 108 C56 108 58 118 68 120 L68 126 C68 126 66 130 62 132 L58 136 C54 140 56 146 60 148 L140 148 C144 146 146 140 142 136 L138 132 C134 130 132 126 132 126 L132 120 C142 118 144 108 144 108 L144 102 C150 100 152 95 152 95 L152 78 C152 52 132 28 100 28Z"
            fill="var(--color-neon)"
            initial={{ opacity: 0, y: -20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Face visor (dark circle area) */}
          <motion.ellipse
            cx="100"
            cy="82"
            rx="32"
            ry="30"
            fill="var(--color-void)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Triangle symbol on visor */}
          <motion.path
            d="M100 62 L118 94 L82 94 Z"
            stroke="var(--color-ivory)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="96"
            strokeDashoffset={96}
            animate={phase >= 3 ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          />

          {/* Body / Cloak with center line */}
          <motion.path
            d="M60 148 L56 158 C52 168 54 172 58 174 L80 180 C84 181 88 180 90 178 L100 170 L110 178 C112 180 116 181 120 180 L142 174 C146 172 148 168 144 158 L140 148"
            fill="var(--color-neon)"
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Center vertical line on cloak */}
          <motion.line
            x1="100" y1="102" x2="100" y2="170"
            stroke="var(--color-void)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 4 ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Drip effects */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={phase >= 5 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Left drip 1 */}
            <motion.path
              d="M72 180 C72 180 70 190 70 194 C70 197 72 199 74 197 C76 195 74 190 72 180Z"
              fill="var(--color-neon)"
              animate={phase >= 5 ? { y: [0, 4, 0], opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Center drip */}
            <motion.path
              d="M100 180 C100 180 98 194 98 200 C98 204 102 204 102 200 C102 194 100 180 100 180Z"
              fill="var(--color-neon)"
              animate={phase >= 5 ? { y: [0, 6, 0], opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
            {/* Right drip 1 */}
            <motion.path
              d="M128 180 C128 180 130 188 130 192 C130 195 128 197 126 195 C124 193 126 188 128 180Z"
              fill="var(--color-neon)"
              animate={phase >= 5 ? { y: [0, 5, 0], opacity: [1, 0.65, 1] } : {}}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
            {/* Small side drips */}
            <motion.path
              d="M82 181 C82 181 81 186 81 188 C81 190 83 190 83 188 C83 186 82 181 82 181Z"
              fill="var(--color-neon)"
              animate={phase >= 5 ? { y: [0, 3, 0], opacity: [0.8, 0.4, 0.8] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.path
              d="M118 181 C118 181 119 187 119 189 C119 191 117 191 117 189 C117 187 118 181 118 181Z"
              fill="var(--color-neon)"
              animate={phase >= 5 ? { y: [0, 3, 0], opacity: [0.8, 0.5, 0.8] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </motion.g>
        </motion.svg>
      </div>

      {/* Text content */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="font-grotesk text-[11px] tracking-[0.5em] text-neon">NATIONAL LEVEL SYMPOSIUM</p>
        <motion.h1
          className="font-display mt-3 text-3xl tracking-tight text-ivory text-glow-pink sm:text-5xl md:text-6xl"
          style={{ fontWeight: 800 }}
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          INTELLETTO
        </motion.h1>
        <motion.p
          className="font-grotesk mt-3 text-xs tracking-[0.4em] text-dim"
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
        >
          ENTER THE ARENA
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <div className="mt-10 h-px w-48 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-neon"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3.0, ease: 'easeInOut' }}
          style={{ boxShadow: `0 0 12px rgba(var(--theme-glow-rgb),0.9)` }}
        />
      </div>
      <p className="font-grotesk mt-4 text-[10px] tracking-[0.3em] text-faint">INITIALIZING ARENA — TAP TO SKIP</p>
    </motion.div>
  );
}


