'use strict';
const runLua = require('../../scripts/contract-redis-lua');
module.exports = function paymentRedis() {
  const strings = new Map(), hashes = new Map(), scores = new Map(), calls = [];
  function bucket(store, key) {
    if (!store.has(key)) store.set(key,new Map());
    return store.get(key);
  }
  function execute([op,key,...args]) {
    if (op === 'EVAL') {
      const count = Number(args.shift());
      const result = runLua(key,args.slice(0,count),args.slice(count).map(String),parts=>execute(parts));
      return result && typeof result === 'object' && !Object.keys(result).length ? [] : result;
    }
    if (op === 'GET') return strings.get(key) ?? null;
    if (op === 'SET') {
      if (args.includes('NX') && strings.has(key)) return null;
      strings.set(key,args[0]); return 'OK';
    }
    if (op === 'DEL') return Number(strings.delete(key));
    if (op === 'EXISTS') return Number(strings.has(key));
    if (op === 'HKEYS') return [...bucket(hashes,key).keys()];
    if (op === 'HVALS') return [...bucket(hashes,key).values()];
    if (op === 'HGET') return bucket(hashes,key).get(args[0]) ?? null;
    if (op === 'HDEL') return Number(bucket(hashes,key).delete(args[0]));
    if (op === 'HSET') {bucket(hashes,key).set(args[0],args[1]);return 1;}
    if (op === 'ZADD') {
      const z=bucket(scores,key),id=args.at(-1);
      if (args[0]==='NX' && z.has(id)) return 0;
      z.set(id,Number(args.at(-2))); return 1;
    }
    if (op === 'ZREM') return Number(bucket(scores,key).delete(args[0]));
    if (op === 'ZRANGEBYSCORE') return [...bucket(scores,key)]
      .filter(([,score])=>score<=Number(args[1]))
      .sort(([a,x],[b,y])=>x-y||a.localeCompare(b)).slice(0,Number(args[4])).map(([id])=>id);
    throw Error('Unhandled command '+op);
  }
  async function pipeline(commands) {
    const result=commands.map(command=>({result:execute(command)}));
    calls.push({commands, result});return result;
  }
  return {pipeline,strings,hashes,scores,calls,isConfigured:()=>true};
};
