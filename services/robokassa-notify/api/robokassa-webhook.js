'use strict';
// Public transport endpoint. Only the existing signed Robokassa handler may
// confirm payments; no payment state is inferred from an HTTP request here.
const UPSTREAM = 'https://poker-app-ebon.vercel.app/api/robokassa-webhook';
module.exports = async function (req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).end();
  const url = new URL(UPSTREAM);
  if (req.method === 'GET') url.search = new URL(req.url, 'https://localhost').search;
  let body;
  if (req.method === 'POST') {
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/x-www-form-urlencoded')) return res.status(400).end();
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      const fields = new URLSearchParams();
      for (const [key, value] of Object.entries(req.body)) {
        if (typeof value !== 'string') return res.status(400).end();
        fields.append(key, value);
      }
      body = Buffer.from(fields.toString());
    } else if (req.body !== undefined) body = Buffer.from(req.body);
    else {
      const chunks = []; let size = 0;
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > 16384) return res.status(400).end();
        chunks.push(Buffer.from(chunk));
      }
      body = Buffer.concat(chunks);
    }
    if (body.length > 16384) return res.status(400).end();
  }
  try {
    const upstream = await fetch(url, {
      method: req.method, redirect: 'error',
      headers: req.method === 'POST' ? {'content-type': 'application/x-www-form-urlencoded'} : {},
      ...(body ? {body} : {}), signal: AbortSignal.timeout(20000)
    });
    const text = await upstream.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // Never acknowledge a payment unless the original verifier acknowledged it.
    return res.status(upstream.status).send(text);
  } catch (error) {
    console.error('[payment-notify] upstream unavailable', error.name);
    return res.status(503).end();
  }
};
module.exports.config = {api: {bodyParser: false}};
