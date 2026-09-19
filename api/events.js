import { getEventsService } from '../server/services.js';

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { slug, category } = req.query || {};
    const events = await getEventsService({ slug, category });
    if (slug && !events.length) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(slug ? events[0] : events);
  } catch (err) {
    console.error('events API error:', err.message);
    return res.status(500).json({ error: 'Unable to load events right now.' });
  }
}
