import serverless from 'serverless-http';
import app from '../../server/server.js';

export const handler = serverless(app, {
  request(req, event) {
    if (req.url && req.url.startsWith('/.netlify/functions/api')) {
      req.url = req.url.replace('/.netlify/functions/api', '/api');
    }
  },
});
