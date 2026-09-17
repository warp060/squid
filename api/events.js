import supabase from './db-client.js';

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
    const { slug, category } = req.query;
    let query = supabase.from('events').select('*').order('sort_order', { ascending: true });
    if (slug) query = query.eq('slug', String(slug));
    if (category) query = query.eq('category', String(category));
    const { data, error } = await query;
    if (error) throw error;
    if (slug) {
      if (!data || !data.length) return res.status(404).json({ error: 'Event not found' });
      return res.status(200).json(data[0]);
    }
    return res.status(200).json(data || []);
  } catch (err) {
    console.error('events API error:', err.message);
    return res.status(500).json({ error: 'Unable to load events right now.' });
  }
}
