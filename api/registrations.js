import { getRegistrationsService } from '../server/services.js';

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
    const list = await getRegistrationsService();
    return res.status(200).json({
      total: list.length,
      registrations: list,
    });
  } catch (err) {
    console.error('registrations API error:', err.message);
    return res.status(500).json({ error: 'Unable to load registrations right now.' });
  }
}
