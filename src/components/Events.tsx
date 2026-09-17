import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, Zap, BrainCircuit, Code2, Sparkles, Gamepad2, Crown,
  Palette, X, Users, Clock, BadgeCheck, MapPin, Ticket, Trophy,
  Eye, Loader2, Fingerprint, ShieldCheck, LayoutGrid, UsersRound,
  CheckCircle2, ArrowUpRight, type LucideIcon,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiGet, type ArenaEvent } from '../lib/api';
import { OFFICIAL_EVENTS, type OfficialEvent } from '../data/eventsData';
import { UNAVAILABLE, EVENT_CREW, EVENT_IMAGES } from '../data/content';

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  Code2,
  FileText,
  Sparkles,
  Gamepad2,
  Zap,
  Crown,
  Palette,
};

type Filter = 'all' | 'technical' | 'non-technical';
type ViewMode = 'cards' | 'coordinators';

function EventModal({ event, onClose }: { event: ArenaEvent | OfficialEvent; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const Icon = ICONS[event.icon] ?? Zap;
  const crew = EVENT_CREW[event.slug] || ('coordinators' in event ? { unit: event.name, coordinators: event.coordinators, team: event.team } : null);
  const banner = EVENT_IMAGES[event.slug] ?? '/media/arena-key.jpg';
  const rows = [
    { icon: Fingerprint, k: 'Event ID', v: `EVT-${String(event.sort_order).padStart(2, '0')}` },
    { icon: Users, k: 'Member Limit', v: event.member_limit || event.team_size },
    { icon: Ticket, k: 'Per Head Fee', v: event.per_head_fee || '-' },
    { icon: Ticket, k: 'Team Fee', v: event.team_fee || '-' },
    { icon: Trophy, k: 'Prize (1st / 2nd)', v: event.prize ? `₹${event.prize}` : UNAVAILABLE },
    { icon: Clock, k: 'Duration', v: event.duration },
    { icon: BadgeCheck, k: 'Eligibility', v: event.eligibility },
    { icon: MapPin, k: 'Arena', v: event.venue_hint },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${event.name} details`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-abyss shadow-2xl sm:rounded-sm"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-abyss/95 px-5 py-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-neon/40 bg-neon/10">
              <Icon size={20} className="text-neon" />
            </span>
            <div>
              <p className="font-grotesk text-[10px] tracking-[0.3em] text-neon uppercase">
                {event.stage_code} · {event.category === 'technical' ? 'Technical Arena' : 'Non-Technical Arena'}
              </p>
              <h3 className="font-display text-lg font-bold text-ivory sm:text-xl">{event.name}</h3>
            </div>
          </div>
          <button ref={closeRef} onClick={onClose} className="cursor-pointer rounded border border-white/15 p-2 text-dim hover:text-ivory" aria-label="Close details">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-6 sm:px-7">
          <div className="relative -mx-5 -mt-6 mb-6 overflow-hidden sm:-mx-7" aria-hidden="true">
            <img src={banner} alt="" loading="lazy" className="aspect-[21/8] w-full object-cover saturate-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
          </div>
          <p className="font-grotesk text-[13px] font-medium tracking-wide text-steel italic">“{event.tagline}”</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-dim">{event.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.k} className="hud-border bg-panel/60 p-3.5">
                <p className="font-grotesk flex items-center gap-2 text-[10px] tracking-[0.28em] text-faint uppercase">
                  <r.icon size={13} className="text-neon" /> {r.k}
                </p>
                <p className="font-grotesk mt-1.5 text-[13px] font-medium text-ivory">{r.v || UNAVAILABLE}</p>
              </div>
            ))}
          </div>

          <h4 className="font-grotesk mt-7 flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-ivory uppercase">
            <ShieldCheck size={14} className="text-neon" /> Arena Coordinators & Organizing Crew
          </h4>
          {crew ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="hud-border border-neon/30 bg-panel/70 p-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <p className="font-grotesk flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.22em] text-neon uppercase">
                    <Crown size={13} /> Designated Coordinators
                  </p>
                  <span className="font-grotesk text-[9px] tracking-wider text-faint uppercase">{crew.coordinators.length} Leads</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {crew.coordinators.map((c, idx) => (
                    <li key={c} className="flex items-center justify-between gap-2">
                      <span className="font-grotesk text-[13.5px] font-semibold text-ivory">
                        {idx + 1}. {c}
                      </span>
                      <span className="font-grotesk rounded-xs border border-neon/40 bg-neon/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-neon uppercase">
                        Coordinator
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hud-border bg-panel/60 p-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <p className="font-grotesk flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.22em] text-steel uppercase">
                    <Users size={13} /> Organizing Crew
                  </p>
                  <span className="font-grotesk text-[9px] tracking-wider text-faint uppercase">{crew.team.length} Squad</span>
                </div>
                {crew.team.length ? (
                  <ul className="mt-3 space-y-1.5">
                    {crew.team.map((m, idx) => (
                      <li key={m} className="font-grotesk flex items-center gap-2 text-[13px] text-dim">
                        <span className="text-[10px] text-faint">{String(idx + 1).padStart(2, '0')}.</span>
                        <span className="text-ivory/90">{m}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-grotesk mt-3 text-[12.5px] text-dim italic">Direct coordinator-managed event</p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-[13.5px] text-dim">{UNAVAILABLE}</p>
          )}

          <h4 className="font-grotesk mt-7 text-[11px] font-bold tracking-[0.3em] text-ivory uppercase">Arena Protocol & Rules</h4>
          <ul className="mt-3 space-y-2.5">
            {(event.rules?.length ? event.rules : [UNAVAILABLE]).map((rule, i) => (
              <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-dim">
                <span className="font-grotesk mt-0.5 shrink-0 text-[11px] font-bold text-neon">{String(i + 1).padStart(2, '0')}</span>
                {rule}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="clip-btn font-grotesk inline-flex flex-1 items-center justify-center gap-2 bg-neon px-6 py-3.5 text-[13px] font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-crimson hover:shadow-[0_0_24px_rgba(237,27,118,0.5)]"
            >
              <Ticket size={16} /> Enter Arena / Register
            </Link>
            <button
              onClick={onClose}
              className="font-grotesk cursor-pointer border border-white/15 px-6 py-3.5 text-[13px] font-bold tracking-[0.2em] text-dim uppercase transition-colors hover:border-white/40 hover:text-ivory"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Events() {
  const [events, setEvents] = useState<(ArenaEvent | OfficialEvent)[]>(OFFICIAL_EVENTS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selected, setSelected] = useState<ArenaEvent | OfficialEvent | null>(null);

  useEffect(() => {
    // Attempt to fetch fresh data from API; fallback is already seeded with OFFICIAL_EVENTS
    apiGet<ArenaEvent[]>('/api/events')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {
        // Fallback is already seeded with canonical official events
      })
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(() => {
    if (filter === 'all') return events;
    return events.filter((e) => e.category === filter);
  }, [events, filter]);

  const technicalEvents = useMemo(() => events.filter((e) => e.category === 'technical'), [events]);
  const nonTechnicalEvents = useMemo(() => events.filter((e) => e.category === 'non-technical'), [events]);

  return (
    <section id="events" className="relative scroll-mt-20 overflow-hidden bg-abyss py-24 md:py-32" aria-label="Events">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" aria-hidden="true" />
      <div className="absolute -top-24 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-neon/10 blur-[150px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 02 // CHOOSE YOUR ARENA"
          title="Eight arenas."
          accent="Zero mercy."
          sub="Four technical battlegrounds. Four non-technical showdowns. Handled by designated student coordinators and organizing squads."
        />

        {/* Action & Filter Toolbar */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter events">
            {([
              { id: 'all', label: 'All Arenas (8)' },
              { id: 'technical', label: 'Technical (4)' },
              { id: 'non-technical', label: 'Non-Technical (4)' },
            ] as { id: Filter; label: string }[]).map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`font-grotesk cursor-pointer border px-4 py-2 text-[11.5px] font-bold tracking-[0.2em] uppercase transition-all ${filter === f.id
                    ? 'border-neon bg-neon/15 text-ivory shadow-[0_0_18px_rgba(237,27,118,0.35)]'
                    : 'border-white/10 text-dim hover:border-white/30 hover:text-ivory'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center border border-white/15 bg-void p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`font-grotesk flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all ${viewMode === 'cards' ? 'bg-neon/20 text-neon' : 'text-dim hover:text-ivory'
                  }`}
                title="Grid view of arena dossiers"
              >
                <LayoutGrid size={13} /> Arenas
              </button>
              <button
                onClick={() => setViewMode('coordinators')}
                className={`font-grotesk flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all ${viewMode === 'coordinators' ? 'bg-neon/20 text-neon' : 'text-dim hover:text-ivory'
                  }`}
                title="Directory of Event Coordinators and Squads"
              >
                <UsersRound size={13} /> Coordinators
              </button>
            </div>

            <span className="font-grotesk hidden items-center gap-2 text-[10.5px] tracking-[0.25em] text-sage lg:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" aria-hidden="true" /> ACCESS OPEN
            </span>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-dim" role="status">
            <Loader2 className="animate-spin text-neon" size={22} /> Loading arena dossiers…
          </div>
        )}

        {/* View Mode: Cards Grid */}
        {viewMode === 'cards' && (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((e) => {
                const Icon = ICONS[e.icon] ?? Zap;
                const crew = EVENT_CREW[e.slug] || ('coordinators' in e ? { unit: e.name, coordinators: (e as OfficialEvent).coordinators, team: (e as OfficialEvent).team } : null);
                const banner = EVENT_IMAGES[e.slug] ?? '/media/arena-key.jpg';

                return (
                  <motion.article
                    layout
                    key={e.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -6 }}
                    className="hud-border card-sheen group relative flex flex-col justify-between overflow-hidden bg-panel/80 p-0 transition-all hover:border-neon/50 hover:shadow-[0_0_30px_rgba(237,27,118,0.18)]"
                  >
                    <div>
                      {/* Banner Image */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={banner}
                          alt={`${e.name} — competition arena`}
                          loading="lazy"
                          className="h-full w-full object-cover saturate-[0.7] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" aria-hidden="true" />
                        <span
                          className={`font-grotesk absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-bold tracking-[0.22em] uppercase ring-1 ${e.category === 'technical'
                              ? 'bg-void/85 text-neon ring-neon/40'
                              : 'bg-void/85 text-sage ring-sage/40'
                            }`}
                        >
                          {e.category === 'technical' ? 'Tech' : 'Non-Tech'}
                        </span>
                        <span className="font-grotesk absolute bottom-2 left-3 text-[9.5px] font-semibold tracking-[0.22em] text-faint uppercase">
                          {e.stage_code}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 pt-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-void transition-colors group-hover:border-neon/50 group-hover:bg-neon/10">
                            <Icon size={18} className="text-steel transition-colors group-hover:text-neon" />
                          </span>
                          <h3 className="font-display text-[16px] leading-snug font-bold text-ivory group-hover:text-white">
                            {e.name}
                          </h3>
                        </div>

                        <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-relaxed text-dim">{e.tagline}</p>

                        {/* Coordinator Information */}
                        {crew && (
                          <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                            <div className="flex items-start gap-1.5">
                              <Crown size={12} className="mt-0.5 shrink-0 text-neon" />
                              <div className="min-w-0 flex-1">
                                <p className="font-grotesk text-[9.5px] font-bold tracking-[0.18em] text-faint uppercase">
                                  Coordinators
                                </p>
                                <p className="font-grotesk truncate text-[11.5px] font-medium text-ivory">
                                  {crew.coordinators.join(' · ')}
                                </p>
                              </div>
                            </div>

                            {crew.team.length > 0 && (
                              <div className="flex items-start gap-1.5 pt-0.5">
                                <Users size={12} className="mt-0.5 shrink-0 text-steel" />
                                <div className="min-w-0 flex-1">
                                  <p className="font-grotesk text-[9px] tracking-[0.18em] text-faint uppercase">
                                    Team: <span className="text-steel">{crew.team.slice(0, 2).join(', ')}{crew.team.length > 2 ? ` +${crew.team.length - 2}` : ''}</span>
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-2 border-t border-white/10 p-4 pt-3">
                      <button
                        onClick={() => setSelected(e)}
                        className="font-grotesk inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 border border-white/15 px-3 py-2 text-[11px] font-bold tracking-[0.16em] text-steel uppercase transition-colors hover:border-neon/60 hover:text-neon"
                        aria-label={`View details for ${e.name}`}
                      >
                        <Eye size={13} /> View Details
                      </button>
                      <Link
                        to="/register"
                        className="font-grotesk inline-flex flex-1 items-center justify-center gap-1.5 bg-neon/85 px-3 py-2 text-[11px] font-bold tracking-[0.16em] text-white uppercase transition-all hover:bg-neon hover:shadow-[0_0_15px_rgba(237,27,118,0.5)]"
                        aria-label={`Register for ${e.name}`}
                      >
                        <Ticket size={13} /> Enter
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode: Coordinators & Squad Directory */}
        {viewMode === 'coordinators' && (
          <div className="space-y-12">
            {/* Technical Events Coordinators */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-neon/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center border border-neon/40 bg-neon/10">
                    <Code2 size={16} className="text-neon" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ivory">Technical Event Coordinators</h3>
                    <p className="font-grotesk text-[10.5px] tracking-[0.25em] text-faint uppercase">
                      4 Technical Arenas // Assigned Command & Crew
                    </p>
                  </div>
                </div>
                <span className="font-grotesk rounded-xs border border-neon/40 bg-neon/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-neon uppercase">
                  Technical
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {technicalEvents.map((e) => {
                  const crew = EVENT_CREW[e.slug] || ('coordinators' in e ? { unit: e.name, coordinators: (e as OfficialEvent).coordinators, team: (e as OfficialEvent).team } : null);
                  return (
                    <div
                      key={e.slug}
                      className="hud-border card-sheen relative flex flex-col justify-between border-white/10 bg-panel/75 p-5 transition-all hover:border-neon/50"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <span className="font-grotesk text-[9.5px] font-bold tracking-[0.25em] text-neon uppercase">
                            {e.stage_code}
                          </span>
                          <span className="font-grotesk text-[9px] text-faint">EVT-0{e.sort_order}</span>
                        </div>

                        <h4 className="font-display mt-3 text-[16.5px] font-bold text-ivory">{e.name}</h4>

                        {crew && (
                          <div className="mt-4 space-y-4">
                            {/* Coordinators List */}
                            <div>
                              <p className="font-grotesk flex items-center gap-1 text-[10px] font-bold tracking-[0.22em] text-neon uppercase">
                                <Crown size={12} /> Coordinators
                              </p>
                              <div className="mt-2 space-y-1.5">
                                {crew.coordinators.map((c) => (
                                  <div key={c} className="flex items-center justify-between gap-2 rounded-xs bg-void/60 px-2.5 py-1.5">
                                    <span className="font-grotesk text-[13px] font-semibold text-ivory">{c}</span>
                                    <span className="font-grotesk rounded-xs border border-neon/40 bg-neon/10 px-1.5 py-0.5 text-[8.5px] font-bold tracking-widest text-neon uppercase">
                                      coordinator
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Team Members List */}
                            {crew.team.length > 0 && (
                              <div>
                                <p className="font-grotesk flex items-center gap-1 text-[9.5px] font-bold tracking-[0.2em] text-steel uppercase">
                                  <Users size={12} /> Team Members
                                </p>
                                <ol className="mt-2 space-y-1 text-[12.5px] text-dim">
                                  {crew.team.map((m, idx) => (
                                    <li key={m} className="font-grotesk flex items-center gap-2 px-1 py-0.5">
                                      <span className="text-[10px] text-faint">{idx + 1}.</span>
                                      <span className="text-ivory/85">{m}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setSelected(e)}
                        className="font-grotesk mt-5 flex w-full cursor-pointer items-center justify-center gap-1 border border-white/15 py-2 text-[11px] font-bold tracking-[0.16em] text-dim uppercase transition-colors hover:border-neon hover:text-neon"
                      >
                        View Details <ArrowUpRight size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Non-Technical Events Coordinators */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-sage/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center border border-sage/40 bg-sage/10">
                    <Zap size={16} className="text-sage" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ivory">Non-Technical Event Coordinators</h3>
                    <p className="font-grotesk text-[10.5px] tracking-[0.25em] text-faint uppercase">
                      4 Non-Technical Arenas // Assigned Command & Crew
                    </p>
                  </div>
                </div>
                <span className="font-grotesk rounded-xs border border-sage/40 bg-sage/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-sage uppercase">
                  Non-Technical
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {nonTechnicalEvents.map((e) => {
                  const crew = EVENT_CREW[e.slug] || ('coordinators' in e ? { unit: e.name, coordinators: (e as OfficialEvent).coordinators, team: (e as OfficialEvent).team } : null);
                  return (
                    <div
                      key={e.slug}
                      className="hud-border card-sheen relative flex flex-col justify-between border-white/10 bg-panel/75 p-5 transition-all hover:border-sage/50"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <span className="font-grotesk text-[9.5px] font-bold tracking-[0.25em] text-sage uppercase">
                            {e.stage_code}
                          </span>
                          <span className="font-grotesk text-[9px] text-faint">EVT-0{e.sort_order}</span>
                        </div>

                        <h4 className="font-display mt-3 text-[16.5px] font-bold text-ivory">{e.name}</h4>

                        {crew && (
                          <div className="mt-4 space-y-4">
                            {/* Coordinators List */}
                            <div>
                              <p className="font-grotesk flex items-center gap-1 text-[10px] font-bold tracking-[0.22em] text-sage uppercase">
                                <Crown size={12} /> Coordinators
                              </p>
                              <div className="mt-2 space-y-1.5">
                                {crew.coordinators.map((c) => (
                                  <div key={c} className="flex items-center justify-between gap-2 rounded-xs bg-void/60 px-2.5 py-1.5">
                                    <span className="font-grotesk text-[13px] font-semibold text-ivory">{c}</span>
                                    <span className="font-grotesk rounded-xs border border-sage/40 bg-sage/10 px-1.5 py-0.5 text-[8.5px] font-bold tracking-widest text-sage uppercase">
                                      coordinator
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Team Members List */}
                            {crew.team.length > 0 ? (
                              <div>
                                <p className="font-grotesk flex items-center gap-1 text-[9.5px] font-bold tracking-[0.2em] text-steel uppercase">
                                  <Users size={12} /> Team Members
                                </p>
                                <ol className="mt-2 space-y-1 text-[12.5px] text-dim">
                                  {crew.team.map((m, idx) => (
                                    <li key={m} className="font-grotesk flex items-center gap-2 px-1 py-0.5">
                                      <span className="text-[10px] text-faint">{idx + 1}.</span>
                                      <span className="text-ivory/85">{m}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            ) : (
                              <div className="rounded-xs border border-white/5 bg-void/40 p-2.5">
                                <p className="font-grotesk text-[11.5px] text-faint italic">
                                  Direct coordinator execution arena
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setSelected(e)}
                        className="font-grotesk mt-5 flex w-full cursor-pointer items-center justify-center gap-1 border border-white/15 py-2 text-[11px] font-bold tracking-[0.16em] text-dim uppercase transition-colors hover:border-sage hover:text-sage"
                      >
                        View Details <ArrowUpRight size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
