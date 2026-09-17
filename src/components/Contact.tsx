import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { apiPost } from '../lib/api';
import { VENUE_SHORT, INSTAGRAM_URL, ORGANIZER } from '../data/content';

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
            {[
              { icon: MapPin, k: 'VENUE', v: VENUE_SHORT },
              { icon: Phone, k: 'COORDINATORS', v: 'Contact numbers will be announced by the organizers.' },
              { icon: Mail, k: 'EMAIL', v: 'Official email will be announced by the organizers.' },
            ].map((c) => (
              <div key={c.k} className="hud-border flex gap-4 bg-panel/70 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-neon/30 bg-neon/10">
                  <c.icon size={18} className="text-neon" />
                </span>
                <div>
                  <p className="font-grotesk text-[10px] tracking-[0.3em] text-faint">{c.k}</p>
                  <p className="font-grotesk mt-1 text-[13.5px] leading-relaxed font-medium text-ivory">{c.v}</p>
                </div>
              </div>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hud-border group flex items-center gap-4 bg-panel/70 p-5 transition-colors hover:border-neon/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-neon/30 bg-neon/10">
                <Instagram size={18} className="text-neon" />
              </span>
              <div className="flex-1">
                <p className="font-grotesk text-[10px] tracking-[0.3em] text-faint">OFFICIAL CHANNEL</p>
                <p className="font-grotesk mt-1 text-[13.5px] font-medium text-ivory group-hover:text-neon">@revibe_events_ on Instagram</p>
              </div>
            </a>
            <p className="font-grotesk text-[11px] leading-relaxed tracking-[0.2em] text-faint uppercase">
              Organized by {ORGANIZER}
            </p>
            <div className="hud-border group relative overflow-hidden">
              <img
                src="/media/g-campus.jpg"
                alt="Symposium halls at the INTELLETTO-26 venue"
                loading="lazy"
                className="aspect-[16/8] w-full object-cover saturate-[0.6] transition-all duration-500 group-hover:scale-[1.03] group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" aria-hidden="true" />
              <p className="font-grotesk absolute bottom-0 left-0 px-4 py-3 text-[10px] tracking-[0.3em] text-steel uppercase">Command HQ · Vellore</p>
            </div>
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
