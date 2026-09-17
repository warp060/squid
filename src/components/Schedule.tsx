import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Loader2, Info } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiGet, type ScheduleItem } from '../lib/api';

export default function Schedule() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [day, setDay] = useState('DAY 01');

  useEffect(() => {
    apiGet<ScheduleItem[]>('/api/schedule')
      .then((d) => {
        setItems(d);
        if (d.length && !d.some((x) => x.day_label === 'DAY 01')) setDay(d[0].day_label);
      })
      .catch(() => setError('Failed to load the timeline. Please refresh and try again.'))
      .finally(() => setLoading(false));
  }, []);

  const days = useMemo(() => [...new Set(items.map((i) => i.day_label))], [items]);
  const list = items.filter((i) => i.day_label === day);

  return (
    <section id="schedule" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32" aria-label="Schedule">
      <div className="bg-fine-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 03 // MISSION TIMELINE"
          title="The two-day"
          accent="survival run."
          sub="A polished run-of-show will be published here. Until then, this is the structural timeline of the arena weekend."
        />

        <div className="hud-border glass mb-8 flex items-start gap-3 p-4">
          <Info size={17} className="mt-0.5 shrink-0 text-neon" />
          <p className="text-[13px] leading-relaxed text-dim">
            The official event-day schedule with exact timings has not been released yet. Timings below
            are marked <span className="font-grotesk font-bold text-ivory">TBA</span> and the full timetable
            will be announced by the organizers.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-dim" role="status">
            <Loader2 className="animate-spin text-neon" size={22} /> Loading timeline…
          </div>
        )}
        {error && !loading && (
          <div className="hud-border bg-panel p-8 text-center" role="alert">
            <p className="text-sm text-dim">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-8 flex gap-2" role="tablist" aria-label="Select day">
              {days.map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={day === d}
                  onClick={() => setDay(d)}
                  className={`font-grotesk cursor-pointer border px-6 py-3 text-[12px] font-bold tracking-[0.25em] uppercase transition-all ${
                    day === d ? 'border-neon bg-neon/15 text-ivory shadow-[0_0_18px_rgba(255,46,126,0.3)]' : 'border-white/10 text-dim hover:text-ivory'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <ol className="relative space-y-4 border-l border-white/10 pl-0">
              {list.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="hud-border card-sheen relative ml-6 bg-panel/70 p-5 sm:ml-8 sm:p-6"
                >
                  <span className="absolute top-6 -left-[33px] flex h-4 w-4 items-center justify-center sm:-left-[41px]" aria-hidden="true">
                    <span className="absolute h-4 w-4 rounded-full border border-neon/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_10px_rgba(255,46,126,0.9)]" />
                  </span>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="font-grotesk inline-flex items-center gap-2 bg-void px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] text-neon ring-1 ring-neon/30">
                      <Clock size={13} /> {s.start_time || 'TBA'}{s.end_time ? ` — ${s.end_time}` : ''}
                    </span>
                    {s.venue_hint && (
                      <span className="font-grotesk inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] text-faint uppercase">
                        <MapPin size={13} /> {s.venue_hint}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display mt-3 text-lg font-bold text-ivory sm:text-xl">{s.title}</h3>
                  {s.description && <p className="mt-1.5 text-[13.5px] leading-relaxed text-dim">{s.description}</p>}
                </motion.li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
