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
    <div className="hud-border glass relative flex-1 sm:flex-initial min-w-[62px] xs:min-w-[70px] sm:min-w-[92px] px-2 py-2.5 sm:px-5 sm:py-4 text-center">
      <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-neon/70 sm:h-3 sm:w-3" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-neon/70 sm:h-3 sm:w-3" aria-hidden="true" />
      <div className="font-display relative h-7 sm:h-10 overflow-hidden text-xl xs:text-2xl sm:text-4xl font-bold text-ivory" aria-live="off">
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
      <p className="font-grotesk mt-1 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.3em] text-dim">{label}</p>
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
    <div className="flex w-full max-w-sm sm:max-w-none items-stretch gap-1.5 xs:gap-2 sm:gap-3" role="timer" aria-label="Countdown to INTELLETTO-26">
      <Cell value={t.days} label="DAYS" />
      <Cell value={t.hours} label="HOURS" />
      <Cell value={t.minutes} label="MINS" />
      <Cell value={t.seconds} label="SECS" />
    </div>
  );
}
