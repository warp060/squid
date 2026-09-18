import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, MapPin, Users, Swords, Cpu, Trophy, BrainCircuit, Sparkles, Target, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { EVENT_DATES_LABEL, VENUE_SHORT, ORGANIZER } from '../data/content';

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{String(val).padStart(2, '0')}{suffix}</span>;
}

const STATS = [
  { icon: Swords, value: 8, label: 'Competition Arenas', suffix: '' },
  { icon: Cpu, value: 4, label: 'Technical Stages', suffix: '' },
  { icon: Trophy, value: 4, label: 'Non-Technical Stages', suffix: '' },
  { icon: Users, value: 1, label: 'Day of Action', suffix: '' },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32" aria-label="About INTELLETTO-26">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity"
        style={{ backgroundImage: "url('/aboutbg.avif')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04050a] via-transparent to-[#04050a]" aria-hidden="true" />
      <div className="bg-fine-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-blood/20 blur-[150px]" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-32 h-[380px] w-[380px] rounded-full bg-neon/10 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 01 // ABOUT INTELLETTO-26"
          title="One stage."
          accent="Infinite intelligence."
          sub="Conducted by the Department of Artificial Intelligence and Machine Learning — where raw talent meets intelligent competition across eight battle-tested arenas."
        />

        {/* Host Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hud-border card-sheen mb-10 flex flex-col items-start justify-between gap-4 border-neon/30 bg-panel/75 p-5 sm:flex-row sm:items-center sm:p-6"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xs border border-neon/50 bg-neon/15 shadow-[0_0_20px_rgba(237,27,118,0.3)]">
              <BrainCircuit size={22} className="text-neon" />
            </span>
            <div>
              <p className="font-grotesk text-[10px] font-bold tracking-[0.3em] text-neon uppercase">
                Conducted By
              </p>
              <h3 className="font-display text-base font-bold text-ivory sm:text-lg">
                {ORGANIZER}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Dept. of AI & ML', '8 Arenas', 'National Stage', 'Cash & Trophies'].map((tag) => (
              <span
                key={tag}
                className="font-grotesk rounded-xs border border-white/10 bg-void/70 px-3 py-1 text-[10px] font-semibold tracking-wider text-steel uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="space-y-4 text-[15px] leading-relaxed text-dim"
          >
            <p>
              <strong className="text-ivory">INTELLETTO-26</strong> is a national-level technical symposium proudly
              conducted by the <strong className="text-ivory">Department of Artificial Intelligence and Machine Learning</strong>.
              Designed as an arena of high-caliber intellect, it invites the sharpest student minds from colleges across
              India to compete, code, strategize, and conquer.
            </p>

            <p>
              Featuring <strong className="text-ivory">eight dedicated arenas</strong> — four technical battlegrounds
              and four electrifying non-technical showdowns — every challenge is engineered to test your innovation,
              rapid adaptation, and team synergy under pressure.
            </p>



            {/* Status Strip */}
            <div className="hud-border glass flex items-center gap-3 p-3.5">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-sage" aria-hidden="true" />
              <p className="font-grotesk text-[12px] tracking-wide text-steel">
                <strong className="text-ivory">Open to all UG / PG students nationwide.</strong> Step into the arena and make your mark.
              </p>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hud-border group relative overflow-hidden"
          >
            <img
              src="/media/e-ai.jpg"
              alt="Department of Artificial Intelligence and Machine Learning presenting INTELLETTO-26"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover saturate-[0.75] transition-all duration-500 group-hover:scale-[1.03] group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/25 to-transparent" aria-hidden="true" />
            <figcaption className="font-grotesk absolute bottom-0 left-0 flex w-full items-center justify-between px-5 py-3.5 text-[10px] tracking-[0.25em] text-steel uppercase backdrop-blur-xs">
              <span className="flex items-center gap-2">
                <Sparkles size={13} className="text-neon" /> Arena Preview
              </span>
              <span className="font-bold text-neon">DEPT. OF AI &amp; ML</span>
            </figcaption>
          </motion.figure>
        </div>

        {/* 4 Details Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: CalendarDays, k: 'DATE', v: EVENT_DATES_LABEL },
            { icon: MapPin, k: 'VENUE', v: VENUE_SHORT },
            { icon: BrainCircuit, k: 'CONDUCTED BY', v: 'Dept. of Artificial Intelligence & Machine Learning' },
            { icon: Trophy, k: 'ARENAS', v: '8 Arenas · Solo & Squad Knockouts' },
          ].map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="hud-border card-sheen group bg-panel/70 p-4 transition-colors hover:border-neon/40"
            >
              <c.icon size={18} className="text-neon" />
              <p className="font-grotesk mt-3 text-[9.5px] tracking-[0.3em] text-faint">{c.k}</p>
              <p className="font-grotesk mt-1 text-[13px] leading-snug font-semibold text-ivory">{c.v}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="group bg-abyss/95 p-6 text-center transition-colors hover:bg-panel md:p-7">
              <s.icon size={18} className="mx-auto text-faint transition-colors group-hover:text-neon" />
              <p className="font-display mt-2.5 text-3xl font-bold text-ivory md:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="font-grotesk mt-1.5 text-[10px] tracking-[0.25em] text-faint uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
