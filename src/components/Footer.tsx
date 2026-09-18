import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { NAV_LINKS, ORGANIZER } from '../data/content';

const EVENT_SHORTCUTS = ['Paper Presentation', 'Mini Hackathon', 'Coding & Debugging', 'Shark Tank x SGC', 'Free Fire', 'IPL Auction'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#04050a]" aria-label="Footer">
      <div className="bg-arena-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-black text-ivory">INTELLETTO<span className="text-neon">-26</span></p>
            <p className="font-grotesk mt-2 text-[10.5px] tracking-[0.3em] text-faint uppercase">National Level Technical Symposium</p>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-dim">
              Eight arenas. One national stage. Conducted by the {ORGANIZER} — built for the ones who refuse elimination.
            </p>
          </div>

          <nav aria-label="Footer quick links">
            <p className="font-grotesk text-[11px] font-bold tracking-[0.3em] text-ivory uppercase">Quick links</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <Link to={l.path} className="cursor-pointer text-[13.5px] text-dim transition-colors hover:text-neon">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-center sm:items-start lg:items-center">
            <Link
              to="/register"
              className="clip-btn font-grotesk inline-flex items-center gap-2 bg-neon px-6 py-3 text-[12px] font-bold tracking-[0.2em] text-white uppercase hover:bg-crimson"
            >
              Register now
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-grotesk mt-4 flex cursor-pointer items-center gap-2 text-[11px] tracking-[0.25em] text-faint uppercase hover:text-neon"
            >
              <ArrowUp size={14} /> Back to top
            </button>
          </div>


        </div>

        <p className="font-display pointer-events-none mt-12 text-center text-[clamp(2rem,8.5vw,6rem)] leading-none font-black tracking-tight text-white/[0.035] select-none" aria-hidden="true">
          INTELLETTO-26
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-grotesk text-[11px] tracking-[0.2em] text-faint uppercase text-center sm:text-left">
            © 2026 INTELLETTO-26 · Designed and developed by BUILDREX · All rights reserved
          </p>
          <p className="font-grotesk flex items-center gap-2 text-[11px] tracking-[0.2em] text-faint uppercase">
            <ShieldCheck size={13} className="text-sage" /> Enter the arena
          </p>
        </div>
      </div>
    </footer>
  );
}
