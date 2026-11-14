'use strict';
const envPath=process.argv.find(arg=>arg.startsWith('--env='))?.slice(6);if(envPath)process.loadEnvFile(envPath);
async function main(){
 const redis=require('../lib/redis'),index=require('../lib/raffle-prize-totals');
 const pipeline=(commands,options)=>redis.pipeline(commands,{...options,throwOnError:true,timeoutMs:15000,context:'raffle.prize-totals.rebuild'});
 const run=async commands=>(await pipeline(commands)).map(row=>{if(row.error)throw Error(row.error);return row.result;});
 const records=await require('../lib/raffle-card-snapshot').read(run);
 console.log(JSON.stringify({raffles:records.length,apply:process.argv.includes('--apply')}));
 if(!process.argv.includes('--apply'))return;
 const maps=await index.contributions(records,pipeline);
 for(let i=0;i<records.length;i+=25){
  const commands=records.slice(i,i+25).map((r,j)=>index.reconcileCommand(r,maps[i+j]));
  await run(commands);console.log(JSON.stringify({indexed:Math.min(i+25,records.length),total:records.length}));
 }
 await run([['EVAL',index.MARK_READY,3,'poker_app:raffle_ids',index.DIGESTS,index.READY]]);
 console.log(JSON.stringify({ready:true,indexed:records.length}));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
