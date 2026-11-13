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
    else {
      // Do not re-encode nested form fields or multipart boundaries: signatures
      // must be checked against the original provider data by the main handler.
      if (req.body != null) return res.status(400).end();
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
