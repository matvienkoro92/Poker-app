'use strict';
const {createHash,timingSafeEqual}=require('node:crypto');
const redis=require('../redis');
const {savePayment,deliver}=require('../robokassa-payments');
async function fields(req){
  if(req.method==='GET')return new URL(req.url,'https://localhost').searchParams;
  if(req.body&&typeof req.body==='object'&&!Buffer.isBuffer(req.body)){
    const result=new URLSearchParams();
    for(const [k,v] of Object.entries(req.body)){if(typeof v!=='string')throw Error('Invalid field');result.append(k,v);}
    return result;
  }
  if(!String(req.headers['content-type']||'').startsWith('application/x-www-form-urlencoded'))throw Error('Invalid type');
  let raw=req.body;
  if(raw===undefined){const chunks=[];let size=0;for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>16384)throw Error('Too large');chunks.push(Buffer.from(chunk));}raw=Buffer.concat(chunks);}
  if(Buffer.byteLength(raw)>16384)throw Error('Too large');
  return new URLSearchParams(String(raw));
}
module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(!['GET','POST'].includes(req.method))return res.status(405).end();
  const secret=process.env.ROBOKASSA_PASSWORD2,algorithm=process.env.ROBOKASSA_HASH_ALGORITHM||'md5';
  if(!secret||!['md5','sha256','sha512'].includes(algorithm)||!redis.isConfigured())return res.status(503).end();
  let params;
  try{params=await fields(req);if(params.toString().length>16384)throw Error();const seen=new Set();for(const [k]of params){if(seen.has(k.toLowerCase()))throw Error();seen.add(k.toLowerCase());}}catch{return res.status(400).end();}
  const sum=params.get('OutSum'),invoice=params.get('InvId'),signature=params.get('SignatureValue');
  if(!/^\d{1,10}(?:\.\d{1,6})?$/.test(sum||'')||!/^\d{1,19}$/.test(invoice||'')||!signature||!/^[0-9a-f]+$/i.test(signature))return res.status(400).end();
  // Production amounts have six decimal places; reject fractions of a kopeck.
  const [rub,frac='']=sum.split('.');
  if(/[1-9]/.test(frac.slice(2)))return res.status(400).end();
  const amount=Number(rub)*100+Number(frac.slice(0,2).padEnd(2,'0'));
  if(!Number.isSafeInteger(amount)||amount<=0||amount>10000000000)return res.status(400).end();
  const custom=[...params].filter(([k])=>/^shp_/i.test(k)).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,v])=>k+'='+v);
  const expected=createHash(algorithm).update([sum,invoice,secret,...custom].join(':')).digest();
  const supplied=Buffer.from(signature,'hex');
  if(signature.length!==expected.length*2||supplied.length!==expected.length||!timingSafeEqual(expected,supplied))return res.status(403).end();
  if(params.get('IsTest')==='1')return res.status(400).end();
  const id=BigInt(invoice).toString(),now=Date.now();
  const payment={id,providerId:'robokassa',status:'confirmed',amount,confirmedAt:now,receivedAt:now};
  try{await savePayment(payment);}catch{return res.status(503).end();}
  try{await deliver(payment);}catch{console.error('Robokassa notification pending retry');}
  return res.status(200).send('OK'+invoice);
};
