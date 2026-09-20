const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({console, setTimeout(){}, document:{body:{addEventListener(){},getAttribute(){return 'home';}},getElementById(){return null;},querySelectorAll(){return [];},addEventListener(){}},window:{addEventListener(){}}});
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const files=[...html.matchAll(/<script[^>]*data-poker-lazy-domain="rating-(?:common|winter|spring|summer|current)"[^>]*src="\.\/([^?" ]+)/g)].map(m=>m[1]);
for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
vm.runInContext('window.pokerEnsureScriptDomains = function(){return Promise.resolve();};',context);
(async()=>{
 const data=await context.pokerGetClubNewsTournamentSnapshotsReady();
 fs.writeFileSync(path.join(root,'news-rating-snapshots.json'),JSON.stringify(data));
 console.log('Generated news rating snapshots:',Object.keys(data).length);
})().catch(e=>{console.error(e);process.exitCode=1;});
