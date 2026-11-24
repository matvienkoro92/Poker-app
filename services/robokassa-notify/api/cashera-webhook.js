'use strict';
const {createHmac} = require('node:crypto');
const upstream = 'https://poker-app-ebon.vercel.app/api/cashera-webhook';

module.exports = async function casheraRelay(req,res) {
  res.setHeader('Cache-Control','no-store');
  const end = status => { res.statusCode=status; return res.end(); };
  if (req.method!=='POST') return end(405);
  const key=req.headers['x-api-key'], secret=req.headers['x-secret'];
  if (typeof key!=='string'||!key||typeof secret!=='string'||!secret) return end(401);
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type']||'')) return end(415);
  let payload=req.body;
  try {
    if (payload==null) {
      const chunks=[]; let size=0;
      for await (const chunk of req) {
        size+=Buffer.byteLength(chunk);
        if (size>65536) return end(413);
        chunks.push(Buffer.from(chunk));
      }
      payload=Buffer.concat(chunks);
    }
    if (typeof payload==='string'||Buffer.isBuffer(payload)) payload=JSON.parse(String(payload));
    payload=JSON.stringify(payload);
    if (Buffer.byteLength(payload)>65536) return end(413);
  } catch { return end(400); }
  const stamp=String(Date.now());
  const proof=createHmac('sha256',JSON.stringify([key,secret])).update(stamp+'\n'+payload).digest('hex');
  try {
    const upstreamResponse=await fetch(upstream,{method:'POST',redirect:'error',signal:AbortSignal.timeout(25000),
      headers:{'Content-Type':'application/json','X-Cashera-Relay-Time':stamp,'X-Cashera-Relay-Proof':proof},body:payload});
    return end(upstreamResponse.status);
  } catch { return end(503); }
};
