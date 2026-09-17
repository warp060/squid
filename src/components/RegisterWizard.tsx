import { useEffect, useState } from 'react';
import { useForm, useFieldArray, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertCircle, Plus, Trash2,
  Swords, User, GraduationCap, PhoneCall, Users, ClipboardCheck, PartyPopper,
} from 'lucide-react';
import { apiGet, apiPost, type ArenaEvent } from '../lib/api';

const phoneRegex = /^[+]?[\d\s-]{10,16}$/;

const schema = z.object({
  event_slugs: z.array(z.string()).min(1, 'Select at least one arena to continue.'),
  full_name: z.string().trim().min(3, 'Enter your full name (min 3 characters).').max(80),
  email: z.string().trim().email('Enter a valid email address.').max(120),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number.'),
  college: z.string().trim().min(3, 'Enter your college name.').max(140),
  department: z.string().trim().min(2, 'Enter your department.').max(80),
  year_of_study: z.string().min(1, 'Select your year of study.'),
  city: z.string().trim().max(60).optional().or(z.literal('')),
  state: z.string().trim().max(60).optional().or(z.literal('')),
  alternate_phone: z.string().trim().max(20).optional().or(z.literal('')),
  emergency_contact: z.string().trim().max(100).optional().or(z.literal('')),
  team_name: z.string().trim().max(60).optional().or(z.literal('')),
  team_size: z.string().optional().or(z.literal('')),
  teammates: z.array(z.object({ name: z.string().trim().min(2, 'Min 2 characters').max(80) })).max(5).optional().default([]),
  agree_rules: z.boolean().refine((v) => v === true, 'You must accept the arena protocol to register.'),
}).superRefine((v, ctx) => {
  if (v.alternate_phone && !phoneRegex.test(v.alternate_phone)) {
    ctx.addIssue({ code: 'custom', path: ['alternate_phone'], message: 'Enter a valid phone number.' });
  }
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  { id: 0, label: 'Arenas', icon: Swords },
  { id: 1, label: 'Player', icon: User },
  { id: 2, label: 'College', icon: GraduationCap },
  { id: 3, label: 'Contact', icon: PhoneCall },
  { id: 4, label: 'Squad', icon: Users },
  { id: 5, label: 'Review', icon: ClipboardCheck },
  { id: 6, label: 'Confirmed', icon: PartyPopper },
];

const STEP_FIELDS: (keyof FormValues)[][] = [
  ['event_slugs'],
  ['full_name', 'email', 'phone'],
  ['college', 'department', 'year_of_study'],
  ['alternate_phone'],
  [],
  ['agree_rules'],
  [],
];

const inputCls =
  'w-full border border-white/10 bg-void/70 px-4 py-3.5 text-[14px] text-ivory placeholder:text-faint transition-colors focus:border-neon/60 focus:outline-none';
const labelCls = 'font-grotesk mb-1.5 block text-[11px] font-semibold tracking-[0.25em] text-steel uppercase';
const errCls = 'mt-1.5 text-[12px] text-neon';

interface SuccessData {
  player_tag: string;
  full_name: string;
  event_slugs: string[];
}

import { OFFICIAL_EVENTS } from '../data/eventsData';

export default function RegisterWizard() {
  const [step, setStep] = useState(0);
  const [events, setEvents] = useState<ArenaEvent[]>(OFFICIAL_EVENTS);
  const [eventsError, setEventsError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState<SuccessData | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    mode: 'onTouched',
    defaultValues: {
      event_slugs: [],
      full_name: '',
      email: '',
      phone: '',
      college: '',
      department: '',
      year_of_study: '',
      city: '',
      state: '',
      alternate_phone: '',
      emergency_contact: '',
      team_name: '',
      team_size: '',
      teammates: [],
      agree_rules: false,
    },
  });
  const { register, control, trigger, watch, setValue, getValues, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'teammates' });
  const picked = watch('event_slugs');

  useEffect(() => {
    apiGet<ArenaEvent[]>('/api/events')
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          setEvents(d);
        }
      })
      .catch(() => {
        // Fallback already seeded with OFFICIAL_EVENTS
      });
  }, []);

  const toggleEvent = (slug: string) => {
    const cur = getValues('event_slugs');
    setValue('event_slugs', cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug], { shouldValidate: true });
  };

  const next = async () => {
    const toCheck = STEP_FIELDS[step];
    const ok = toCheck.length ? await trigger(toCheck) : true;
    if (ok) {
      setStep((s) => Math.min(6, s + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    const ok = await trigger();
    if (!ok) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const data = await apiPost<SuccessData & { ok: boolean }>('/api/register', getValues());
      setSuccess({ player_tag: data.player_tag, full_name: data.full_name, event_slugs: data.event_slugs });
      setStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const pickedNames = events.filter((e) => picked.includes(e.slug)).map((e) => e.name);
  const progress = Math.round(((step + 1) / 7) * 100);

  return (
    <div>
      <div className="mb-8" aria-label="Registration progress">
        <div className="flex items-center justify-between">
          <p className="font-grotesk text-[11px] tracking-[0.3em] text-faint">STEP {Math.min(step + 1, 7)} / 07</p>
          <p className="font-grotesk text-[11px] tracking-[0.3em] text-neon">{progress}%</p>
        </div>
        <div className="mt-2 h-1 overflow-hidden bg-white/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <motion.div className="h-full bg-neon" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} style={{ boxShadow: `0 0 12px rgba(var(--theme-glow-rgb),0.8)` }} />
        </div>
        <ol className="mt-4 hidden grid-cols-7 gap-1 md:grid">
          {STEPS.map((s) => (
            <li key={s.id} className={`font-grotesk flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase ${s.id <= step ? 'text-ivory' : 'text-faint'}`} aria-current={s.id === step ? 'step' : undefined}>
              <s.icon size={13} className={s.id <= step ? 'text-neon' : ''} /> {s.label}
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.28 }}
        >
          {step === 0 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-ivory sm:text-2xl">Select your arenas</legend>
              <p className="mt-1 text-sm text-dim">Choose every stage you want to enter. You can fight in both divisions.</p>
              {eventsError && <p className="mt-4 text-sm text-neon" role="alert">{eventsError}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {events.map((e) => {
                  const on = picked.includes(e.slug);
                  return (
                    <button
                      type="button"
                      key={e.slug}
                      onClick={() => toggleEvent(e.slug)}
                      aria-pressed={on}
                      className={`cursor-pointer border p-4 text-left transition-all ${
                        on ? 'border-neon bg-neon/10 shadow-[0_0_18px_rgba(255,46,126,0.3)]' : 'hud-border bg-panel/60 hover:border-white/25'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-grotesk text-[10px] tracking-[0.28em] text-faint">{e.stage_code}</span>
                        <span className={`flex h-5 w-5 items-center justify-center border text-[11px] font-bold ${on ? 'border-neon bg-neon text-white' : 'border-white/20 text-transparent'}`} aria-hidden="true">✓</span>
                      </span>
                      <span className="font-display mt-1.5 block text-[15px] font-bold text-ivory">{e.name}</span>
                      <span className={`font-grotesk mt-1 block text-[10.5px] tracking-[0.2em] uppercase ${e.category === 'technical' ? 'text-neon' : 'text-sage'}`}>{e.category}</span>
                    </button>
                  );
                })}
              </div>
              {errors.event_slugs && <p className={errCls} role="alert">{errors.event_slugs.message}</p>}
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-ivory sm:text-2xl">Player information</legend>
              <p className="mt-1 text-sm text-dim">Your identity inside the arena. Use your real details.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="r-name" className={labelCls}>Full name *</label>
                  <input id="r-name" className={inputCls} placeholder="Aarav Sharma" autoComplete="name" {...register('full_name')} />
                  {errors.full_name && <p className={errCls} role="alert">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label htmlFor="r-email" className={labelCls}>Email *</label>
                  <input id="r-email" type="email" className={inputCls} placeholder="you@college.edu" autoComplete="email" {...register('email')} />
                  {errors.email && <p className={errCls} role="alert">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="r-phone" className={labelCls}>Phone *</label>
                  <input id="r-phone" type="tel" className={inputCls} placeholder="+91 98765 43210" autoComplete="tel" {...register('phone')} />
                  {errors.phone && <p className={errCls} role="alert">{errors.phone.message}</p>}
                </div>
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-ivory sm:text-2xl">College information</legend>
              <p className="mt-1 text-sm text-dim">The institution you represent on the national stage.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="r-college" className={labelCls}>College name *</label>
                  <input id="r-college" className={inputCls} placeholder="Your college / university" {...register('college')} />
                  {errors.college && <p className={errCls} role="alert">{errors.college.message}</p>}
                </div>
                <div>
                  <label htmlFor="r-dept" className={labelCls}>Department *</label>
                  <input id="r-dept" className={inputCls} placeholder="CSE / ECE / ME …" {...register('department')} />
                  {errors.department && <p className={errCls} role="alert">{errors.department.message}</p>}
                </div>
                <div>
                  <label htmlFor="r-year" className={labelCls}>Year of study *</label>
                  <select id="r-year" className={inputCls} {...register('year_of_study')} defaultValue="">
                    <option value="" disabled>Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="PG / Other">PG / Other</option>
                  </select>
                  {errors.year_of_study && <p className={errCls} role="alert">{errors.year_of_study.message}</p>}
                </div>
                <div>
                  <label htmlFor="r-city" className={labelCls}>City</label>
                  <input id="r-city" className={inputCls} placeholder="Vellore" autoComplete="address-level2" {...register('city')} />
                </div>
                <div>
                  <label htmlFor="r-state" className={labelCls}>State</label>
                  <input id="r-state" className={inputCls} placeholder="Tamil Nadu" autoComplete="address-level1" {...register('state')} />
                </div>
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-ivory sm:text-2xl">Contact information</legend>
              <p className="mt-1 text-sm text-dim">Backup channels so command can always reach you.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="r-alt" className={labelCls}>Alternate phone</label>
                  <input id="r-alt" type="tel" className={inputCls} placeholder="Optional" {...register('alternate_phone')} />
                  {errors.alternate_phone && <p className={errCls} role="alert">{errors.alternate_phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="r-emg" className={labelCls}>Emergency contact</label>
                  <input id="r-emg" className={inputCls} placeholder="Name + phone (optional)" {...register('emergency_contact')} />
                </div>
              </div>
              <div className="hud-border glass mt-6 p-4">
                <p className="font-grotesk text-[12px] leading-relaxed tracking-wide text-steel">
                  PRIMARY CHANNELS — {getValues('email') || '—'} · {getValues('phone') || '—'}. All arena
                  briefings and slot allotments will be sent here.
                </p>
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-ivory sm:text-2xl">Squad details</legend>
              <p className="mt-1 text-sm text-dim">Solo player? Skip ahead. Entering team arenas? Declare your squad.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="r-team" className={labelCls}>Squad name</label>
                  <input id="r-team" className={inputCls} placeholder="e.g. Night Owls (optional)" {...register('team_name')} />
                </div>
                <div>
                  <label htmlFor="r-tsize" className={labelCls}>Squad size</label>
                  <select id="r-tsize" className={inputCls} {...register('team_size')} defaultValue="">
                    <option value="">Solo / undecided</option>
                    <option value="2">2 players</option>
                    <option value="3">3 players</option>
                    <option value="4">4 players</option>
                    <option value="5+">5+ players</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <p className={labelCls}>Squad members (max 5)</p>
                <div className="space-y-3">
                  {fields.map((f, i) => (
                    <div key={f.id} className="flex gap-2">
                      <input
                        className={inputCls}
                        placeholder={`Member ${i + 1} full name`}
                        {...register(`teammates.${i}.name` as const)}
                        aria-label={`Squad member ${i + 1} name`}
                      />
                      <button type="button" onClick={() => remove(i)} className="cursor-pointer border border-white/15 px-3.5 text-dim hover:border-neon hover:text-neon" aria-label={`Remove member ${i + 1}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {fields.length < 5 && (
                    <button type="button" onClick={() => append({ name: '' })} className="font-grotesk inline-flex cursor-pointer items-center gap-2 border border-dashed border-white/20 px-4 py-3 text-[12px] font-bold tracking-[0.18em] text-dim uppercase hover:border-neon/60 hover:text-neon">
                      <Plus size={15} /> Add member
                    </button>
                  )}
                </div>
              </div>
            </fieldset>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-display text-xl font-bold text-ivory sm:text-2xl">Review and confirm</h2>
              <p className="mt-1 text-sm text-dim">Verify your dossier before entering the registry.</p>
              <dl className="hud-border mt-6 divide-y divide-white/10 bg-panel/60 text-[13.5px]">
                {[
                  ['Arenas', pickedNames.join(', ') || '—'],
                  ['Player', `${getValues('full_name')} · ${getValues('email')} · ${getValues('phone')}`],
                  ['College', `${getValues('college')} · ${getValues('department')} · ${getValues('year_of_study')}`],
                  ['Squad', getValues('team_name') || (fields.length ? `${fields.length} member(s)` : 'Solo')],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:gap-4">
                    <dt className="font-grotesk text-[11px] tracking-[0.25em] text-faint uppercase">{k}</dt>
                    <dd className="text-ivory">{v}</dd>
                  </div>
                ))}
              </dl>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-[13.5px] text-dim">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" {...register('agree_rules')} />
                <span>I accept the arena protocol and confirm that all details provided are accurate. I understand the official rulebook will be published by the organizers.</span>
              </label>
              {errors.agree_rules && <p className={errCls} role="alert">{errors.agree_rules.message}</p>}
              {submitError && (
                <p className="mt-4 flex items-center gap-2 text-[13.5px] text-neon" role="alert">
                  <AlertCircle size={16} /> {submitError}
                </p>
              )}
            </div>
          )}

          {step === 6 && success && (
            <div className="py-6 text-center" role="status">
              <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
                <CheckCircle2 size={56} className="mx-auto text-sage" style={{ filter: 'drop-shadow(0 0 18px rgba(111,154,126,0.6))' }} />
              </motion.div>
              <h2 className="font-display mt-6 text-2xl font-black text-ivory sm:text-3xl">YOU ARE <span className="text-neon text-glow-pink">IN THE ARENA</span></h2>
              <p className="mt-2 text-sm text-dim">Welcome, {success.full_name}. Your player dossier is registered.</p>
              <div className="hud-border mx-auto mt-8 max-w-md bg-void/60 p-6">
                <p className="font-grotesk text-[10px] tracking-[0.35em] text-faint">PLAYER TAG</p>
                <p className="font-display mt-2 text-3xl font-black tracking-wider text-neon text-glow-pink">{success.player_tag}</p>
                <div className="mt-4 border-t border-white/10 pt-4 text-left">
                  <p className="font-grotesk text-[10px] tracking-[0.3em] text-faint">REGISTERED ARENAS</p>
                  <ul className="mt-2 space-y-1">
                    {pickedNames.map((n) => (
                      <li key={n} className="font-grotesk text-[13px] text-ivory">— {n}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="font-grotesk mx-auto mt-6 max-w-md text-[12px] leading-relaxed tracking-wide text-faint">
                Screenshot this tag. Slot allotments and arena briefings will be sent to your registered email.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step < 6 && (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="font-grotesk inline-flex cursor-pointer items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-[12px] font-bold tracking-[0.2em] text-dim uppercase transition-colors hover:text-ivory disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Back
          </button>
          {step < 5 ? (
            <button
              type="button"
              onClick={next}
              className="clip-btn font-grotesk inline-flex cursor-pointer items-center justify-center gap-2 bg-neon px-8 py-3.5 text-[12px] font-bold tracking-[0.2em] text-white uppercase hover:bg-crimson"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="clip-btn font-grotesk inline-flex cursor-pointer items-center justify-center gap-2 bg-neon px-8 py-3.5 text-[12px] font-bold tracking-[0.2em] text-white uppercase hover:bg-crimson disabled:opacity-60"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              {submitting ? 'Registering…' : 'Confirm registration'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
