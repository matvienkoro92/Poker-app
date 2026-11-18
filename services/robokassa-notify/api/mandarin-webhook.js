'use strict';
const UPSTREAM = 'https://poker-app-ebon.vercel.app/api/mandarin-webhook';
module.exports = async function(req, res) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'POST') { res.statusCode=405; return res.end(); }
  try {
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) { res.statusCode=400; return res.end(); }
    let payload = req.body;
    if (payload == null) {
      const chunks=[];let size=0;
      for await (const chunk of req) { size+=Buffer.byteLength(chunk);if(size>65536){res.statusCode=413;return res.end();}chunks.push(Buffer.from(chunk)); }
      payload=Buffer.concat(chunks);
    }
    if (typeof payload==='string' || Buffer.isBuffer(payload)) {
      if(Buffer.byteLength(payload)>65536){res.statusCode=413;return res.end();}
      try{payload=JSON.parse(String(payload));}catch{res.statusCode=400;return res.end();}
    }
    if (!payload || JSON.stringify(payload).length>65536 || typeof payload.invoice_id!=='string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.invoice_id)) { res.statusCode=400;return res.end(); }
    // Forward only the invoice ID. The backend fetches authoritative payment data.
    const response=await fetch(UPSTREAM,{
      method:'POST',redirect:'error',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({invoice_id:payload.invoice_id.toLowerCase()}),signal:AbortSignal.timeout(9000)
    });
    res.statusCode=response.status;
    res.setHeader('Content-Type','application/json; charset=utf-8');
    return res.end(await response.text());
  }catch{res.statusCode=503;return res.end();}
};
