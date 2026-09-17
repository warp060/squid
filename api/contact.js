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

const clean = (v, max = 500) =>
  typeof v === 'string' ? v.replace(/[<>'"`]/g, '').trim().slice(0, max) : '';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const ip = (req.headers['x-forwarded-for'] || 'unknown').toString().split(',')[0].trim();
    if (rateLimited(ip)) return res.status(429).json({ error: 'Too many attempts. Please wait a minute.' });

    const b = req.body || {};
    const name = clean(b.name, 80);
    const email = clean(b.email, 120).toLowerCase();
    const phone = clean(b.phone, 20);
    const subject = clean(b.subject, 140);
    const message = clean(b.message, 2000);

    if (name.length < 2) return res.status(400).json({ error: 'Name is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(400).json({ error: 'A valid email is required.' });
    if (message.length < 5) return res.status(400).json({ error: 'Message is too short.' });

    const { error } = await supabase.from('contact_messages').insert({
      name, email, phone: phone || null, subject: subject || null, message,
    });
    if (error) throw error;
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('contact API error:', err.message);
    return res.status(500).json({ error: 'Could not send message. Please try again.' });
  }
}
