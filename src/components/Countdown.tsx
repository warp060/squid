import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EVENT_TARGET_ISO } from '../data/content';

function parts(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0');
  return (
    <div className="hud-border glass relative min-w-[72px] px-3 py-3 text-center sm:min-w-[92px] sm:px-5 sm:py-4">
      <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-neon/70" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-neon/70" aria-hidden="true" />
      <div className="font-display relative h-8 overflow-hidden text-2xl font-bold text-ivory sm:h-10 sm:text-4xl" aria-live="off">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="block text-glow-pink"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="font-grotesk mt-1 text-[9px] tracking-[0.3em] text-dim sm:text-[10px]">{label}</p>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(() => parts(new Date(EVENT_TARGET_ISO).getTime()));
  useEffect(() => {
    const id = window.setInterval(() => setT(parts(new Date(EVENT_TARGET_ISO).getTime())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex items-stretch gap-2 sm:gap-3" role="timer" aria-label="Countdown to INTELLETTO-26">
      <Cell value={t.days} label="DAYS" />
      <Cell value={t.hours} label="HOURS" />
      <Cell value={t.minutes} label="MINS" />
      <Cell value={t.seconds} label="SECS" />
    </div>
  );
}
