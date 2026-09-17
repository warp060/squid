import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Ticket, ChevronRight, BrainCircuit } from 'lucide-react';
import { NAV_LINKS, ORGANIZER } from '../data/content';
import { useTheme } from '../hooks/ThemeContext';
import { useMusic } from '../hooks/AudioContext';

/* ─── Squid Game shapes toggle icon ─── */
function ThemeToggleIcon({ theme }: { theme: 'arena' | 'squidgame' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden="true">
      {theme === 'arena' ? (
        /* Show ○△□ shapes (Squid Game icon) — click to enter Squid Game mode */
        <>
          <circle cx="5" cy="12" r="3" stroke="currentColor" />
          <path d="M12 7l3.5 6H8.5z" stroke="currentColor" />
          <rect x="17" y="9" width="6" height="6" stroke="currentColor" />
        </>
      ) : (
        /* Show moon icon — click to go back to dark Arena mode */
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          stroke="currentColor"
          fill="currentColor"
          fillOpacity="0.15"
        />
      )}
    </svg>
  );
}

function Mark() {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <div className="flex items-center gap-3">
      {/* Circular animated logo — click to play/pause Salesman theme music */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          togglePlay();
        }}
        aria-label={isPlaying ? 'Pause Squid Game Salesman Theme' : 'Play Squid Game Salesman Theme'}
        title={isPlaying ? 'Music playing — click to pause' : 'Click logo to play Squid Game theme music'}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon transition-transform active:scale-95"
      >
        {/* Expanding music sound ripple waves when audio is playing */}
        {isPlaying && (
          <>
            <span
              className="absolute inset-[-4px] rounded-full border border-neon/60 animate-[musicRipple_1.8s_cubic-bezier(0,0.2,0.8,1)_infinite] pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute inset-[-10px] rounded-full border border-neon/30 animate-[musicRipple_2.4s_cubic-bezier(0,0.2,0.8,1)_infinite_0.6s] pointer-events-none"
              aria-hidden="true"
            />
          </>
        )}

        {/* Outer spinning gradient ring (spins faster when playing) */}
        <span
          className={`absolute inset-[-3px] rounded-full ${isPlaying ? 'animate-[logoSpin_3s_linear_infinite]' : 'animate-logo-spin'
            }`}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, var(--color-neon) 25%, transparent 50%, var(--color-crimson) 75%, transparent 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
          }}
          aria-hidden="true"
        />

        {/* Pulsing glow circle */}
        <span
          className={`absolute inset-0 rounded-full animate-logo-pulse ${isPlaying ? 'shadow-[0_0_20px_rgba(255,46,126,0.65)]' : ''
            }`}
          aria-hidden="true"
        />

        {/* Inner dark circle background */}
        <span className="absolute inset-[1px] rounded-full bg-void/90 border border-white/10" aria-hidden="true" />

        {/* Guard figure inside */}
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
          className="relative z-10"
          style={{ filter: `drop-shadow(0 0 5px rgba(var(--theme-glow-rgb),0.7))` }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Hood */}
          <path
            d="M100 28 C68 28 48 52 48 78 L48 95 C48 95 50 100 56 102 L56 108 C56 108 58 118 68 120 L68 126 C68 126 66 130 62 132 L58 136 C54 140 56 146 60 148 L140 148 C144 146 146 140 142 136 L138 132 C134 130 132 126 132 126 L132 120 C142 118 144 108 144 108 L144 102 C150 100 152 95 152 95 L152 78 C152 52 132 28 100 28Z"
            fill="var(--color-neon)"
          />
          {/* Face visor */}
          <ellipse cx="100" cy="82" rx="32" ry="30" fill="var(--color-void)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          {/* Triangle mask */}
          <path d="M100 62 L118 94 L82 94 Z" stroke="var(--color-ivory)" strokeWidth="3" strokeLinejoin="round" fill="none" />
          {/* Cloak */}
          <path
            d="M60 148 L56 158 C52 168 54 172 58 174 L80 180 C84 181 88 180 90 178 L100 170 L110 178 C112 180 116 181 120 180 L142 174 C146 172 148 168 144 158 L140 148"
            fill="var(--color-neon)"
          />
          {/* Center line */}
          <line x1="100" y1="102" x2="100" y2="170" stroke="var(--color-void)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          {/* Drips */}
          <path d="M72 180 C72 180 70 190 70 194 C70 197 72 199 74 197 C76 195 74 190 72 180Z" fill="var(--color-neon)" />
          <path d="M100 180 C100 180 98 194 98 200 C98 204 102 204 102 200 C102 194 100 180 100 180Z" fill="var(--color-neon)" />
          <path d="M128 180 C128 180 130 188 130 192 C130 195 128 197 126 195 C124 193 126 188 128 180Z" fill="var(--color-neon)" />
        </motion.svg>
      </button>

      {/* Brand Title Link to Home */}
      <Link to="/" className="cursor-pointer select-none leading-none group/title" aria-label="INTELLETTO-26 — home">
        <span className="font-display block text-[15px] font-bold tracking-wide text-ivory group-hover/title:text-white transition-colors">
          INTELLETTO<span className="text-neon">-26</span>
        </span>
        <span className="font-grotesk block text-[8.5px] tracking-[0.32em] text-faint">
          SYMPOSIUM ARENA
        </span>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${scrolled ? 'glass border-b border-white/10 py-3' : 'border-b border-transparent bg-transparent py-5'
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <Mark />

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  to={l.path}
                  className={`font-grotesk relative cursor-pointer rounded px-3 py-2 text-[12.5px] font-medium tracking-[0.14em] uppercase transition-colors ${isActive(l.path) ? 'text-ivory' : 'text-dim hover:text-ivory'
                    }`}
                >
                  {l.label}
                  {isActive(l.path) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] bg-neon"
                      style={{ boxShadow: `0 0 10px rgba(var(--theme-glow-rgb),0.9)` }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="cursor-pointer rounded border border-white/15 p-2.5 text-dim transition-colors hover:border-neon/60 hover:text-neon"
              aria-label={theme === 'arena' ? 'Switch to Squid Game theme' : 'Switch to Arena theme'}
              title={theme === 'arena' ? 'Squid Game Mode' : 'Arena Mode'}
              whileTap={{ scale: 0.88 }}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="block"
              >
                <ThemeToggleIcon theme={theme} />
              </motion.span>
            </motion.button>

            <Link
              to="/register"
              className="clip-btn font-grotesk hidden items-center gap-2 bg-neon px-5 py-2.5 text-[12.5px] font-bold tracking-[0.16em] text-white uppercase transition-all hover:bg-crimson hover:shadow-[0_0_24px_rgba(255,46,126,0.55)] sm:inline-flex"
            >
              <Ticket size={15} /> Register
            </Link>
            <button
              className="cursor-pointer rounded border border-white/15 p-2.5 text-ivory transition-colors hover:border-neon/60 hover:text-neon lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer (Rendered outside <header> so backdrop-filter doesn't clip/trap it) */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[990] bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[999] flex h-full w-[85%] max-w-sm flex-col justify-between border-l border-white/10 bg-[#0c0e17] p-6 shadow-2xl overflow-y-auto [data-theme=squidgame]_:bg-white"
              style={{ background: theme === 'squidgame' ? '#ffffff' : undefined }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div>
                {/* Header with Mark and Close Button */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <Mark />
                  <button
                    onClick={() => setOpen(false)}
                    className="cursor-pointer rounded border border-white/15 p-2 text-ivory transition-colors hover:border-neon hover:text-neon"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Host Department Pill */}
                <div className="mt-4 flex items-center gap-2 rounded-xs border border-neon/30 bg-neon/10 px-3 py-2">
                  <BrainCircuit size={15} className="text-neon shrink-0" />
                  <p className="font-grotesk text-[10px] font-semibold tracking-wider text-ivory truncate">
                    Dept. of Artificial Intelligence &amp; ML
                  </p>
                </div>

                {/* Theme Toggle in Mobile */}
                <button
                  onClick={toggleTheme}
                  className="mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xs border border-white/10 bg-white/5 px-3 py-2.5 transition-colors hover:border-neon/40 hover:bg-neon/5"
                  aria-label={theme === 'arena' ? 'Switch to Squid Game theme' : 'Switch to Arena theme'}
                >
                  <ThemeToggleIcon theme={theme} />
                  <span className="font-grotesk text-[10px] font-semibold tracking-wider text-ivory">
                    {theme === 'arena' ? 'SQUID GAME MODE' : 'ARENA MODE'}
                  </span>
                </button>

                {/* Navigation Links */}
                <nav className="mt-5" aria-label="Mobile Primary">
                  <ul className="space-y-1">
                    {NAV_LINKS.map((l, i) => {
                      const isCurrent = isActive(l.path);
                      return (
                        <motion.li
                          key={l.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 + i * 0.035 }}
                        >
                          <Link
                            to={l.path}
                            onClick={() => setOpen(false)}
                            className={`font-grotesk group flex w-full cursor-pointer items-center justify-between rounded-xs px-3 py-3 text-left text-[13.5px] font-semibold tracking-[0.18em] uppercase transition-all ${isCurrent
                              ? 'border border-neon/40 bg-neon/15 text-ivory shadow-[0_0_15px_rgba(255,46,126,0.25)]'
                              : 'text-dim hover:bg-white/5 hover:text-ivory'
                              }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="font-grotesk text-[10px] text-faint">0{i + 1}</span>
                              <span className={isCurrent ? 'text-neon font-bold' : ''}>{l.label}</span>
                            </span>
                            <ChevronRight
                              size={14}
                              className={`transition-transform group-hover:translate-x-1 ${isCurrent ? 'text-neon' : 'text-faint'
                                }`}
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 border-t border-white/10 pt-5">
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="clip-btn font-grotesk flex w-full items-center justify-center gap-2 bg-neon py-3.5 text-[13px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-crimson hover:shadow-[0_0_20px_rgba(255,46,126,0.6)]"
                >
                  <Ticket size={16} /> Register for Arenas
                </Link>
                <p className="font-grotesk mt-3 text-center text-[9.5px] tracking-[0.25em] text-faint uppercase">
                  INTELLETTO-26 // 8 ARENAS OPEN
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

