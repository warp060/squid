import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ShieldAlert } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { RULES } from '../data/content';

export default function Rules() {
  const [open, setOpen] = useState<string | null>('general');

  return (
    <section id="rules" className="relative scroll-mt-20 overflow-hidden bg-abyss py-24 md:py-32" aria-label="Rules">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" aria-hidden="true" />
      <div className="absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-crimson/20 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 04 // CODE OF THE ARENA"
          title="Survive by"
          accent="the protocol."
          sub="Indicative arena guidelines to help you prepare. The official rulebook will be published by the organizers and supersedes everything here."
        />

        <div className="space-y-3">
          {RULES.map((r) => {
            const isOpen = open === r.id;
            return (
              <div key={r.id} className={`hud-border bg-panel/70 transition-colors ${isOpen ? 'border-neon/40' : ''}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  aria-expanded={isOpen}
                  aria-controls={`rules-${r.id}`}
                  className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-7"
                >
                  <ShieldAlert size={19} className={isOpen ? 'shrink-0 text-neon' : 'shrink-0 text-faint'} />
                  <span className="flex-1">
                    <span className="font-grotesk block text-[10px] tracking-[0.32em] text-faint">{r.code}</span>
                    <span className="font-display mt-0.5 block text-[16px] font-bold text-ivory sm:text-lg">{r.title}</span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className={isOpen ? 'text-neon' : 'text-dim'}>
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`rules-${r.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-3 border-t border-white/10 px-5 py-6 sm:px-7 sm:pl-[68px]">
                        {r.points.map((p, i) => (
                          <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-dim">
                            <span className="font-grotesk mt-0.5 shrink-0 text-[11px] font-bold text-neon">{String(i + 1).padStart(2, '0')}</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
