import { Link } from 'react-router-dom';
import { Home, Ticket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <div className="bg-arena-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-crimson/20 blur-[150px]" aria-hidden="true" />
      <div className="relative text-center">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-neon" aria-hidden="true" style={{ filter: `drop-shadow(0 0 16px rgba(var(--theme-glow-rgb),0.8))` }}>
          <path d="M12 4l8 16H4z" />
          <path d="M12 10v4M12 17.5v.01" strokeLinecap="round" />
        </svg>
        <p className="font-grotesk mt-6 text-[11px] tracking-[0.4em] text-neon">ERROR 404 // SECTOR NOT FOUND</p>
        <h1 className="font-display mt-3 text-4xl font-black text-ivory sm:text-6xl">You wandered<br />off the grid.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-dim">This sector of the arena does not exist. Return to base before the lights go out.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="clip-btn font-grotesk inline-flex items-center justify-center gap-2 bg-neon px-7 py-3.5 text-[12.5px] font-bold tracking-[0.2em] text-white uppercase hover:bg-crimson">
            <Home size={16} /> Back to base
          </Link>
          <Link to="/register" className="clip-btn font-grotesk inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-3.5 text-[12.5px] font-bold tracking-[0.2em] text-ivory uppercase hover:border-neon/60">
            <Ticket size={16} /> Register
          </Link>
        </div>
      </div>
    </div>
  );
}
