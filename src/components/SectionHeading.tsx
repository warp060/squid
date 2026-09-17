import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function SectionHeading({
  code,
  title,
  accent,
  sub,
}: {
  code: string;
  title: ReactNode;
  accent?: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-12 max-w-3xl md:mb-16"
    >
      <p className="font-grotesk flex items-center gap-3 text-[11px] font-semibold tracking-[0.4em] text-neon">
        <span className="inline-block h-px w-10 bg-neon" aria-hidden="true" />
        {code}
      </p>
      <h2 className="font-display mt-4 text-3xl leading-[1.08] font-bold text-ivory sm:text-4xl md:text-5xl">
        {title} {accent && <span className="text-neon text-glow-pink">{accent}</span>}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-dim">{sub}</p>}
    </motion.div>
  );
}
