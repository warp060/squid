import serverless from 'serverless-http';
import express from 'express';
import app from '../../server/server.js';

const api = express();
// Strip .netlify/functions/api from the path if present so routes match
api.use('/.netlify/functions/api', app);
api.use(app);

export const handler = serverless(api);
