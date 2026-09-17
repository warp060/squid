import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2, Expand } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiGet, type GalleryItem } from '../lib/api';

const FALLBACK: GalleryItem[] = [
  { id: 1, src: '/media/g-code.jpg', title: 'Night build sessions', caption: 'Hackathon battleground', sort_order: 1 },
  { id: 2, src: '/media/g-stage.jpg', title: 'Main stage', caption: 'Keynotes and finals', sort_order: 2 },
  { id: 3, src: '/media/g-chess.jpg', title: 'Mind arenas', caption: 'Chess championships', sort_order: 3 },
  { id: 4, src: '/media/g-esports.jpg', title: 'Esports pit', caption: 'Squad showdowns', sort_order: 4 },
  { id: 5, src: '/media/g-art.jpg', title: 'Creative cells', caption: 'Art and painting', sort_order: 5 },
  { id: 6, src: '/media/g-trophy.jpg', title: 'The prize vault', caption: 'Glory awaits', sort_order: 6 },
  { id: 7, src: '/media/g-campus.jpg', title: 'Symposium halls', caption: 'Sessions and workshops', sort_order: 7 },
  { id: 8, src: '/media/g-cooking.jpg', title: 'Fire-less kitchen', caption: 'Culinary arena', sort_order: 8 },
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    apiGet<GalleryItem[]>('/api/gallery')
      .then((d) => setItems(d.length ? d : FALLBACK))
      .catch(() => setItems(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((v) => (v === null ? v : (v + 1) % items.length));
      if (e.key === 'ArrowLeft') setLightbox((v) => (v === null ? v : (v - 1 + items.length) % items.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, items.length]);

  return (
    <section id="gallery" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32" aria-label="Gallery">
      <div className="bg-fine-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 05 // ARENA ARCHIVES"
          title="Echoes from"
          accent="the arena floor."
          sub="Atmosphere frames from symposium battlegrounds — stages, pits, cells and vaults. Select any frame to inspect it."
        />

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-dim" role="status">
            <Loader2 className="animate-spin text-neon" size={22} /> Developing frames…
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((g, i) => (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
                onClick={() => setLightbox(i)}
                className={`group relative cursor-pointer overflow-hidden border border-white/10 text-left ${i % 4 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                aria-label={`Open image: ${g.title}`}
              >
                <div className={i % 4 === 0 ? 'aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[420px]' : 'aspect-[4/3]'}>
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-[0.65] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <div>
                    <p className="font-grotesk text-[10px] tracking-[0.3em] text-neon uppercase">{g.caption}</p>
                    <p className="font-display mt-1 text-[15px] font-bold text-ivory">{g.title}</p>
                  </div>
                  <Expand size={16} className="shrink-0 text-ivory/60 transition-colors group-hover:text-neon" />
                </div>
                <span className="absolute inset-0 border border-neon/0 transition-colors group-hover:border-neon/40" aria-hidden="true" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${items[lightbox].title}`}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 cursor-pointer rounded border border-white/20 p-2.5 text-ivory hover:border-neon hover:text-neon"
              onClick={() => setLightbox(null)}
              aria-label="Close viewer (Escape)"
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-3 cursor-pointer rounded border border-white/20 p-2.5 text-ivory hover:border-neon hover:text-neon sm:left-6"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-3 cursor-pointer rounded border border-white/20 p-2.5 text-ivory hover:border-neon hover:text-neon sm:right-6"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length); }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            <motion.figure
              key={items[lightbox].id}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={items[lightbox].src} alt={items[lightbox].title} className="max-h-[72vh] w-auto max-w-full border border-white/15 object-contain" />
              <figcaption className="mt-3 flex items-center justify-between gap-4">
                <span className="font-display text-sm font-bold text-ivory">{items[lightbox].title}</span>
                <span className="font-grotesk text-[11px] tracking-[0.25em] text-faint">{lightbox + 1} / {items.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
