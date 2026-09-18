import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, PhoneCall, Instagram, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiPost } from '../lib/api';
import { VENUE_SHORT, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/content';

const inputCls =
  'w-full border border-white/10 bg-void/70 px-4 py-3.5 text-[14px] text-ivory placeholder:text-faint transition-colors focus:border-neon/60 focus:outline-none';

const labelCls = 'font-grotesk mb-1.5 block text-[11px] font-semibold tracking-[0.25em] text-steel uppercase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email and message are required.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await apiPost('/api/contact', form);
      setStatus('done');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32" aria-label="Contact">
      <div className="bg-fine-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-neon/10 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          code="TRANSMISSION 07 // REACH THE CONTROL ROOM"
          title="Contact"
          accent="command."
          sub="Questions about arenas, squads or entry protocol? Send a transmission — the crew responds between rounds."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="space-y-4 lg:col-span-2"
          >
            {/* Venue */}
            <div className="hud-border flex gap-4 bg-panel/70 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-neon/30 bg-neon/10">
                <MapPin size={18} className="text-neon" />
              </span>
              <div>
                <p className="font-grotesk text-[10px] tracking-[0.3em] text-faint">VENUE</p>
                <p className="font-grotesk mt-1 text-[13.5px] leading-relaxed font-medium text-ivory">{VENUE_SHORT}</p>
              </div>
            </div>

            {/* Coordinators Contact Card */}
            <div className="hud-border bg-panel/70 p-5">
              <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-neon/30 bg-neon/10">
                  <Phone size={17} className="text-neon" />
                </span>
                <div>
                  <p className="font-grotesk text-[10px] tracking-[0.3em] text-faint uppercase">COORDINATORS</p>
                  <p className="font-display text-[13px] font-bold text-ivory">Direct Helpline & Enquiries</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {/* Faculty Coordinator */}
                <div>
                  <p className="font-grotesk mb-1.5 text-[10px] font-semibold tracking-[0.25em] text-neon uppercase">
                    Faculty Coordinator
                  </p>
                  <div className="flex items-center justify-between gap-3 border border-white/10 bg-void/60 px-3.5 py-2.5 transition-colors hover:border-neon/40">
                    <span className="font-grotesk text-[13px] font-medium text-ivory">
                      Mr. Yoga Moorthy R
                    </span>
                    <a
                      href="tel:+919952650475"
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-neon/40 bg-neon/15 text-neon transition-all hover:scale-110 hover:bg-neon hover:text-white"
                      title="Call Mr. Yoga Moorthy R"
                      aria-label="Call Mr. Yoga Moorthy R"
                    >
                      <PhoneCall size={14} />
                    </a>
                  </div>
                </div>

                {/* Student Coordinators */}
                <div>
                  <p className="font-grotesk mb-1.5 text-[10px] font-semibold tracking-[0.25em] text-neon uppercase">
                    Student Coordinators
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { name: 'Iman Shihad', phone: '+918056447446' },
                      { name: 'Naeemullah.R', phone: '+918667085106' },
                      { name: 'Jayaprakash.B', phone: '+919361732287' },
                      { name: 'Rizwan', phone: '+919629962211' },
                    ].map((sc) => (
                      <div
                        key={sc.name}
                        className="flex items-center justify-between gap-2 border border-white/10 bg-void/60 px-3 py-2 transition-colors hover:border-neon/40"
                      >
                        <span className="font-grotesk truncate text-[12.5px] font-medium text-ivory">
                          {sc.name}
                        </span>
                        <a
                          href={`tel:${sc.phone}`}
                          className="flex h-7 w-7 shrink-0 items-center justify-center border border-neon/40 bg-neon/15 text-neon transition-all hover:scale-110 hover:bg-neon hover:text-white"
                          title={`Call ${sc.name}`}
                          aria-label={`Call ${sc.name}`}
                        >
                          <PhoneCall size={13} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={INSTAGRAM_URL || '#'}
              target={INSTAGRAM_URL ? '_blank' : undefined}
              rel="noreferrer"
              className="hud-border group flex items-center gap-4 bg-panel/70 p-5 transition-colors hover:border-neon/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-neon/30 bg-neon/10">
                <Instagram size={18} className="text-neon" />
              </span>
              <div className="flex-1">
                <p className="font-grotesk text-[10px] tracking-[0.3em] text-faint">OFFICIAL CHANNEL</p>
                <p className="font-grotesk mt-1 text-[13.5px] font-medium text-ivory group-hover:text-neon">
                  {INSTAGRAM_HANDLE || (INSTAGRAM_URL ? 'Follow on Instagram' : 'To be announced')}
                </p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hud-border bg-panel/70 p-6 sm:p-8 lg:col-span-3"
          >
            {status === 'done' ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center" role="status">
                <CheckCircle2 size={44} className="text-sage" />
                <h3 className="font-display mt-5 text-xl font-bold text-ivory">Transmission received.</h3>
                <p className="mt-2 max-w-sm text-sm text-dim">The control room will respond shortly. Keep your player tag ready.</p>
                <button onClick={() => setStatus('idle')} className="font-grotesk mt-6 cursor-pointer border border-white/15 px-6 py-3 text-xs font-bold tracking-[0.2em] text-dim uppercase hover:text-ivory">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className={labelCls}>Name *</label>
                    <input id="c-name" className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your full name" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className={labelCls}>Email *</label>
                    <input id="c-email" type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@college.edu" autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className={labelCls}>Phone</label>
                    <input id="c-phone" type="tel" className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 …" autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className={labelCls}>Subject</label>
                    <input id="c-subject" className={inputCls} value={form.subject} onChange={(e) => set('subject', e.target.value)} placeholder="Registration / Events / Other" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-msg" className={labelCls}>Message *</label>
                    <textarea id="c-msg" rows={5} className={`${inputCls} resize-none`} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Write your transmission…" />
                  </div>
                </div>
                {error && (
                  <p className="mt-4 flex items-center gap-2 text-[13px] text-neon" role="alert">
                    <AlertCircle size={15} /> {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="clip-btn font-grotesk mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-neon px-8 py-4 text-[13px] font-bold tracking-[0.22em] text-white uppercase transition-all hover:bg-crimson disabled:opacity-60 sm:w-auto"
                >
                  {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {status === 'sending' ? 'Transmitting…' : 'Send transmission'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
