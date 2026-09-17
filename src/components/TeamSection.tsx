import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Star, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { TEAM } from '../data/content';

const GLYPHS = ['M12 4a8 8 0 100 16 8 8 0 000-16z', 'M12 4l8 16H4z', 'M4 4h16v16H4z', 'M12 2l3 6h7l-5 5 2 7-7-4-7 4 2-7-5-5h7z'];

export default function TeamSection() {
  return (
    <section id="team" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32" aria-label="Team">
      <div className="bg-fine-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-neon/10 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="COMMAND DECK // TEAM"
          title="Led by"
          accent="the visionaries."
          sub="The core team steering INTELLETTO-26 — operations, arenas and player experience."
        />

        {/* Leadership Row */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="hud-border card-sheen group relative overflow-hidden bg-panel/80 p-8 text-center transition-colors hover:border-neon/50"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neon/40 bg-neon/10 transition-shadow group-hover:shadow-[0_0_28px_rgba(237,27,118,0.4)]">
              <Star size={26} className="text-neon" />
            </span>
            <p className="font-grotesk mt-5 text-[10px] tracking-[0.35em] text-faint">HEAD OF DEPARTMENT</p>
            <h3 className="font-display mt-2 text-xl font-bold text-ivory">{TEAM.hod}</h3>
            <span className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-neon to-transparent" aria-hidden="true" />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="hud-border card-sheen group relative overflow-hidden bg-panel/80 p-8 text-center transition-colors hover:border-neon/50"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neon/40 bg-neon/10 transition-shadow group-hover:shadow-[0_0_28px_rgba(237,27,118,0.4)]">
              <ShieldCheck size={26} className="text-neon" />
            </span>
            <p className="font-grotesk mt-5 text-[10px] tracking-[0.35em] text-faint">FACULTY CO-ORDINATOR</p>
            <h3 className="font-display mt-2 text-xl font-bold text-ivory">{TEAM.facultyCoordinator}</h3>
            <span className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-neon to-transparent" aria-hidden="true" />
          </motion.article>
        </div>

        {/* Student Coordinators Row */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.studentCoordinators.map((name, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="hud-border card-sheen group relative overflow-hidden bg-panel/80 p-8 text-center transition-colors hover:border-neon/50"
            >
              <span className="pointer-events-none absolute -top-8 -right-8 text-white/[0.05] transition-colors group-hover:text-neon/10" aria-hidden="true">
                <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d={GLYPHS[i % 4]} />
                </svg>
              </span>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neon/40 bg-neon/10 transition-shadow group-hover:shadow-[0_0_28px_rgba(237,27,118,0.4)]">
                <Crown size={26} className="text-neon" />
              </span>
              <p className="font-grotesk mt-5 text-[10px] tracking-[0.35em] text-faint">COMMANDER 0{i + 1}</p>
              <h3 className="font-display mt-2 text-xl font-bold text-ivory">{name}</h3>
              <p className="font-grotesk mt-2 text-[10.5px] tracking-[0.25em] text-sage uppercase">Student coordinator</p>
              <span className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-neon to-transparent" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/events?view=coordinators"
            className="font-grotesk inline-flex items-center gap-2 border border-white/15 bg-panel/60 px-6 py-3 text-[11.5px] font-bold tracking-[0.2em] text-dim uppercase transition-all hover:border-neon hover:text-ivory hover:shadow-[0_0_20px_rgba(237,27,118,0.25)]"
          >
            Explore 8 Arena Event Coordinators & Crew ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
