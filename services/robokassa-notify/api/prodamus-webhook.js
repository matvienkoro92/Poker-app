'use strict';
const UPSTREAM = 'https://poker-app-ebon.vercel.app/api/prodamus-webhook';
module.exports = async function (req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const signature = req.headers.sign;
  if (typeof signature !== 'string' || !/^[0-9a-f]{64}$/i.test(signature)) return res.status(403).end();
  const contentType = String(req.headers['content-type'] || '');
  if (!/^(application\/x-www-form-urlencoded|multipart\/form-data)(?:;|$)/i.test(contentType)) return res.status(400).end();
  try {
    let body;
    if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) body = Buffer.from(req.body);
    else if (req.body != null) {
      // Vercel's Node helpers parse urlencoded forms before invoking handlers.
      // Re-encode the same decoded field names/values (including bracket paths).
      // The upstream HMAC is computed on decoded fields, not raw form bytes.
      if (!/^application\/x-www-form-urlencoded(?:;|$)/i.test(contentType) ||
          typeof req.body !== 'object' || Array.isArray(req.body)) return res.status(400).end();
      const fields = new URLSearchParams();
      for (const [key, value] of Object.entries(req.body)) {
        if (typeof value !== 'string') return res.status(400).end();
        fields.append(key, value);
      }
      body = Buffer.from(fields.toString());
    } else {
      const chunks = []; let size = 0;
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > 65536) return res.status(400).end();
        chunks.push(Buffer.from(chunk));
      }
      body = Buffer.concat(chunks);
    }
    if (body.length > 65536) return res.status(400).end();
    const upstream = await fetch(UPSTREAM, {
      method: 'POST', redirect: 'error',
      headers: {'content-type': contentType, sign: signature},
      body, signal: AbortSignal.timeout(20000)
    });
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(upstream.status).send(await upstream.text());
  } catch (error) {
    console.error('[prodamus-notify] upstream unavailable', error.name);
    return res.status(503).end();
  }
};
module.exports.config = {api: {bodyParser: false}};
