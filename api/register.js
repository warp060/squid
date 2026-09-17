import supabase from './db-client.js';

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 8;
}

const clean = (v, max = 200) =>
  typeof v === 'string' ? v.replace(/[<>'"`]/g, '').trim().slice(0, max) : '';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const phoneOk = (v) => /^[+]?[\d\s-]{10,16}$/.test(v);
const tag = () => 'IN26-' + Array.from({ length: 4 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const ip = (req.headers['x-forwarded-for'] || 'unknown').toString().split(',')[0].trim();
    if (rateLimited(ip)) return res.status(429).json({ error: 'Too many attempts. Please wait a minute and try again.' });

    const b = req.body || {};
    const event_slugs = Array.isArray(b.event_slugs) ? b.event_slugs.map((s) => clean(String(s), 60)).filter(Boolean) : [];
    const full_name = clean(b.full_name, 80);
    const email = clean(b.email, 120).toLowerCase();
    const phone = clean(b.phone, 20);
    const college = clean(b.college, 140);
    const department = clean(b.department, 80);
    const year_of_study = clean(b.year_of_study, 20);
    const city = clean(b.city, 60);
    const state = clean(b.state, 60);
    const alternate_phone = clean(b.alternate_phone, 20);
    const emergency_contact = clean(b.emergency_contact, 100);
    const team_name = clean(b.team_name, 60);
    const team_size = clean(b.team_size, 10);
    const teammates = Array.isArray(b.teammates)
      ? b.teammates.slice(0, 5).map((t) => ({ name: clean(t && t.name, 80) })).filter((t) => t.name.length >= 2)
      : [];

    if (!event_slugs.length) return res.status(400).json({ error: 'Select at least one arena.' });
    if (full_name.length < 3) return res.status(400).json({ error: 'Full name is required.' });
    if (!emailOk(email)) return res.status(400).json({ error: 'A valid email is required.' });
    if (!phoneOk(phone)) return res.status(400).json({ error: 'A valid phone number is required.' });
    if (college.length < 3) return res.status(400).json({ error: 'College name is required.' });
    if (department.length < 2) return res.status(400).json({ error: 'Department is required.' });
    if (!year_of_study) return res.status(400).json({ error: 'Year of study is required.' });
    if (alternate_phone && !phoneOk(alternate_phone)) return res.status(400).json({ error: 'Alternate phone is invalid.' });
    if (b.agree_rules !== true) return res.status(400).json({ error: 'You must accept the arena protocol.' });

    const { data: known } = await supabase.from('events').select('slug');
    const knownSlugs = new Set((known || []).map((e) => e.slug));
    const validSlugs = event_slugs.filter((s) => knownSlugs.has(s));
    if (!validSlugs.length) return res.status(400).json({ error: 'Selected arenas are invalid.' });

    let player_tag = tag();
    for (let i = 0; i < 5; i++) {
      const { data: exists } = await supabase.from('registrations').select('id').eq('player_tag', player_tag).limit(1);
      if (!exists || !exists.length) break;
      player_tag = tag();
    }

    const { data: reg, error: regErr } = await supabase
      .from('registrations')
      .insert({
        player_tag,
        full_name,
        email,
        phone,
        college,
        department,
        year_of_study,
        city: city || null,
        state: state || null,
        alternate_phone: alternate_phone || null,
        emergency_contact: emergency_contact || null,
        team_name: team_name || null,
        team_size: team_size || null,
        teammates,
        status: 'confirmed',
      })
      .select()
      .single();
    if (regErr) throw regErr;

    const joins = validSlugs.map((slug) => ({ registration_id: reg.id, event_slug: slug }));
    const { error: joinErr } = await supabase.from('registration_events').insert(joins);
    if (joinErr) console.error('registration_events insert failed:', joinErr.message);

    return res.status(201).json({
      ok: true,
      player_tag: reg.player_tag,
      full_name: reg.full_name,
      event_slugs: validSlugs,
    });
  } catch (err) {
    console.error('register API error:', err.message);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
}
