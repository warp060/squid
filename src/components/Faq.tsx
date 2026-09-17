import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Loader2, MessageCircleQuestion } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiGet, type Faq } from '../lib/api';

const FALLBACK: Faq[] = [
  { id: 1, question: 'What is INTELLETTO-26?', answer: 'INTELLETTO-26 is a national level technical symposium featuring 13 competitive arenas across technical and non-technical divisions — from paper presentations and hackathons to esports and auctions.', sort_order: 1 },
  { id: 2, question: 'Who can participate?', answer: 'The symposium is open to undergraduate and postgraduate students from colleges across India. Specific eligibility per arena will be confirmed by the organizers.', sort_order: 2 },
  { id: 3, question: 'How do I register?', answer: 'Use the Player Registration flow on this website — pick your arenas, enter your details, review and confirm. You will receive a unique player tag on success.', sort_order: 3 },
];

export default function Faq() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    apiGet<Faq[]>('/api/faqs')
      .then((d) => {
        setFaqs(d.length ? d : FALLBACK);
        setOpen(d.length ? d[0].id : 1);
      })
      .catch(() => { setFaqs(FALLBACK); setOpen(1); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden bg-abyss py-24 md:py-32" aria-label="Frequently asked questions">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 06 // INTEL DESK"
          title="Questions from"
          accent="new recruits."
        />

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-14 text-dim" role="status">
            <Loader2 className="animate-spin text-neon" size={22} /> Decrypting intel…
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((f) => {
              const isOpen = open === f.id;
              return (
                <div key={f.id} className={`hud-border bg-panel/70 transition-colors ${isOpen ? 'border-neon/40' : ''}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${f.id}`}
                    className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <MessageCircleQuestion size={18} className={isOpen ? 'shrink-0 text-neon' : 'shrink-0 text-faint'} />
                    <span className="font-grotesk flex-1 text-[14.5px] font-semibold text-ivory">{f.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={isOpen ? 'shrink-0 text-neon' : 'shrink-0 text-dim'}>
                      <Plus size={19} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${f.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/10 px-5 py-5 pl-[52px] text-[14px] leading-relaxed text-dim sm:px-6 sm:pl-[56px]">
                          {f.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
