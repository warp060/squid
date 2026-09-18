import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiGet, type GalleryItem } from '../lib/api';

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/media/gallery2.jpg',
    title: 'Symposium Delegation',
    caption: 'Faculty & Organizers Showcase',
    sort_order: 1,
  },
  {
    id: 2,
    src: '/media/gallery1.jpg',
    title: 'Technical Mentoring',
    caption: 'Live Architecture & Guidance',
    sort_order: 2,
  },
  {
    id: 3,
    src: '/media/gallery5.jpg',
    title: 'Code Sprint Arena',
    caption: 'Intensive Collaborative Building',
    sort_order: 3,
  },
  {
    id: 4,
    src: '/media/gallery6.jpg',
    title: 'Hackathon Battleground',
    caption: 'Full Arena Engagement',
    sort_order: 4,
  },
  {
    id: 5,
    src: '/media/gallery8.jpg',
    title: 'Project Pitch: My Forest',
    caption: 'Stage Pitch & Review',
    sort_order: 5,
  },
  {
    id: 6,
    src: '/media/gallery7.jpg',
    title: 'Project Pitch: Habit Heatmap',
    caption: 'Live System Exhibition',
    sort_order: 6,
  },
  {
    id: 7,
    src: '/media/gallery4.jpg',
    title: 'Arena Project Presentation',
    caption: 'Interactive Review Session',
    sort_order: 7,
  },
  {
    id: 8,
    src: '/media/gallery3.jpg',
    title: 'System Demonstration & Evaluation',
    caption: 'Live Dashboard Showcase',
    sort_order: 8,
  },
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    apiGet<GalleryItem[]>('/api/gallery')
      .then((d) => {
        if (d && d.length > 0) setItems(d);
      })
      .catch(() => {
        // Keep default GALLERY_ITEMS
      });
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
          code="TRANSMISSION 05 // INNOVATHON ARCHIVES"
          title="Web Designing"
          accent="Innovathon."
          sub="Conducted by Department of Artificial Intelligence and Machine Learning"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((g, i) => {
            const isHero = i === 0;
            const isSpotlight = i === 7;
            return (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                onClick={() => setLightbox(i)}
                className={`group relative cursor-pointer overflow-hidden border border-white/10 bg-black/60 text-left shadow-lg shadow-black/40 transition-all duration-300 hover:border-neon/60 hover:shadow-[0_0_30px_rgba(255,46,147,0.2)] ${isHero
                    ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                    : isSpotlight
                      ? 'sm:col-span-2 lg:col-span-2'
                      : 'sm:col-span-1 lg:col-span-1'
                  }`}
                aria-label={`Open image: ${g.title}`}
              >
                <div
                  className={`w-full overflow-hidden ${isHero
                      ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[460px]'
                      : isSpotlight
                        ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]'
                        : 'aspect-[4/3]'
                    }`}
                >
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Deep dark gradient overlay that smoothly conceals bottom camera metadata and highlights text */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/95 via-35% to-transparent transition-opacity duration-300 group-hover:via-black/90"
                  aria-hidden="true"
                />
                {isHero && (
                  <div className="absolute top-3.5 left-3.5 flex items-center rounded-md border border-neon/40 bg-black/60 px-3 py-1 backdrop-blur-md">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                    <span className="font-grotesk text-[10px] font-bold tracking-widest text-neon uppercase">
                      Featured Highlight
                    </span>
                  </div>
                )}
                {isSpotlight && (
                  <div className="absolute top-3.5 left-3.5 flex items-center rounded-md border border-neon/40 bg-black/60 px-3 py-1 backdrop-blur-md">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                    <span className="font-grotesk text-[10px] font-bold tracking-widest text-neon uppercase">
                      Demo Spotlight
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div className="relative z-10">
                    <p className="font-grotesk text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-neon uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {g.caption}
                    </p>
                    <p
                      className={`font-display font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${isHero || isSpotlight ? 'mt-1 text-lg sm:text-xl' : 'mt-0.5 text-sm sm:text-base'
                        }`}
                    >
                      {g.title}
                    </p>
                  </div>
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-ivory/80 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-neon group-hover:bg-neon/20 group-hover:text-neon">
                    <Expand size={15} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${items[lightbox].title}`}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 z-10 cursor-pointer rounded-full border border-white/20 bg-white/5 p-2.5 text-ivory backdrop-blur-sm transition-colors hover:border-neon hover:text-neon"
              onClick={() => setLightbox(null)}
              aria-label="Close viewer (Escape)"
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-3 z-10 cursor-pointer rounded-full border border-white/20 bg-white/5 p-2.5 text-ivory backdrop-blur-sm transition-colors hover:border-neon hover:text-neon sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + items.length) % items.length);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-3 z-10 cursor-pointer rounded-full border border-white/20 bg-white/5 p-2.5 text-ivory backdrop-blur-sm transition-colors hover:border-neon hover:text-neon sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % items.length);
              }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
            <motion.figure
              key={items[lightbox].id}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[90vh] max-w-5xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center bg-black/80">
                <img
                  src={items[lightbox].src}
                  alt={items[lightbox].title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 bg-void/80 px-5 py-3.5 backdrop-blur-sm">
                <div>
                  <p className="font-grotesk text-[11px] font-semibold tracking-[0.25em] text-neon uppercase">
                    {items[lightbox].caption}
                  </p>
                  <p className="font-display text-base font-bold text-ivory">
                    {items[lightbox].title}
                  </p>
                </div>
                <div className="rounded border border-white/10 bg-white/5 px-3 py-1 font-grotesk text-[11px] tracking-[0.25em] text-faint">
                  {lightbox + 1} / {items.length}
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

