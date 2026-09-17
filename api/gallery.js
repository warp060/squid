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
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return res.status(200).json(data || []);
  } catch (err) {
    console.error('gallery API error:', err.message);
    return res.status(500).json({ error: 'Unable to load gallery right now.' });
  }
}
