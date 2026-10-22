'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const output=path.resolve('output/wardrobe-audit',process.env.AUDIT_RUN||'current');
(async()=>{fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch();const failures=[],records=[];try{
 const page=await browser.newPage({viewport:{width:780,height:1000},deviceScaleFactor:1});
 page.on('pageerror',e=>failures.push(e.message));
 await page.route('https://fit.test/**',r=>{const u=new URL(r.request().url()),f=path.join(process.cwd(),u.pathname);if(u.pathname==='/')return r.fulfill({body:'<meta charset="utf-8"><body></body>',contentType:'text/html'});if(!fs.existsSync(f)||!fs.statSync(f).isFile()){failures.push('missing '+u.pathname);return r.fulfill({status:404,body:''});}return r.fulfill({path:f});});
 await page.goto('https://fit.test/');await page.addScriptTag({path:'app-garage-catalog.js'});
 const groups=await page.evaluate(()=>{const G=PokerGarage,all=G.catalog({level:100}).filter(i=>G.characterFields.includes(i.kind)&&!['body','visor'].includes(i.kind)&&(G.curatedWardrobeItem(i)||G.defaults[i.kind]===i.id));return Object.fromEntries([...new Set(all.map(i=>i.kind))].map(k=>[k,all.filter(i=>i.kind===k).map(i=>({id:i.id,title:i.title}))]));});
 groups.visor=groups.helmet.filter(i=>i.id!=='none').map(i=>({...i,look:{helmet:i.id,visor:'closed',glasses:'aviatorGold'}}));
 groups.combinations=[
 {id:'summer',title:'Майка, шорты, низкая обувь',look:{suit:'palmTank',pants:'sandShorts',shoes:'nikeAirForceWhite',hat:'strawSun',watch:'rolexDayDate',ring:'goldAces',necklace:'goldChain'}},
 {id:'formal',title:'Костюм, брюки, оксфорды',look:{suit:'navyBusiness',pants:'navyBusinessPants',shoes:'blackOxford',hat:'italianFedora',watch:'roseDress',ring:'clubSignet',patch:'name',patchText:'МАНКИ'}},
 {id:'winter',title:'Дублёнка, валенки, ушанка',look:{suit:'sovietShearling',pants:'woolCharcoal',shoes:'valenki',hat:'ushanka',watch:'rolexSubmariner'}},
 {id:'street',title:'Худи, джоггеры, высокие кроссовки',look:{suit:'jordanBrooklyn',pants:'nikeClubJoggers',shoes:'jordanBlackToe',hat:'pokerClassicCap',watch:'smartBlack',ring:'silverSpade'}},
 {id:'biker',title:'Куртка, джинсы, ботинки, шлем',look:{suit:'leatherBiker',pants:'blackDenim',shoes:'combatBlack',helmet:'silver',visor:'closed',watch:'carbonChrono',ring:'rubyLion'}},
 {id:'casual',title:'Кардиган, чиносы, лоферы',look:{suit:'gucciWebCardigan',pants:'sandChinos',shoes:'brownLoafers',glasses:'roundGold',necklace:'nicknameBling',patchText:'ПОКЕРМАНКИ',watch:'goldClassic'}},
 {id:'bare',title:'Без верха, шорты, украшения',look:{suit:'none',pants:'oceanShorts',shoes:'retroRunner',hair:'hairMohawk',necklace:'silverTag',ring:'diamondKing',watch:'steelBlue'}},
 {id:'tee',title:'Футболка, джинсы, кеды',look:{suit:'riverTee',pants:'washedJeans',shoes:'canvasHigh',hair:'hairAfro',glasses:'wayfarerBlack',watch:'rolexGMT',necklace:'acesPendant'}}
 ];
 const allowed=process.env.AUDIT_KINDS?.split(',');
 const auditPants=process.env.AUDIT_PANTS||'blackDenim';
 for(const [kind,items]of Object.entries(groups)){if(allowed&&!allowed.includes(kind))continue;
  for(let start=0;start<items.length;start+=6){const batch=items.slice(start,start+6);const rows=await page.evaluate(async({kind,batch,auditPants})=>{
   const G=PokerGarage,source=new Image();source.src=G.characterBasePath;await source.decode();const rows=[];
   for(const item of batch){const images=[];
    for(const [body]of G.bodyTypes){const look={...G.defaults,body,suit:'stussyBasicTee',pants:auditPants,shoes:'none',helmet:'none',...(kind==='combinations'||kind==='visor'?item.look:{[kind]:item.id})};await G.loadWardrobe(look);if(look.helmet!=='none')await G.loadHelmet(true,look.visor,true,look.helmet).decode();const art=G.renderCharacter(source,look),extra=art.height-source.naturalHeight;
     const box=kind==='combinations'?[0,0,1024,art.height]:kind==='suit'?[100,180+extra,820,760]:kind==='pants'?[180,590+extra,670,780]:kind==='shoes'?[120,1130+extra,790,410]:['hat','hair','helmet','visor','glasses'].includes(kind)?[280,0,470,390+extra]:['watch','ring'].includes(kind)?[715,650+extra,200,290]:[300,240+extra,440,490];
     const c=document.createElement('canvas');c.width=240;c.height=Math.round(240*box[3]/box[2]);c.getContext('2d').drawImage(art,...box,0,0,c.width,c.height);images.push({body,src:c.toDataURL('image/webp',.9)});
    }rows.push({kind,...item,images});
   }return rows;
  },{kind,batch,auditPants});
  const sheet=kind+'-'+(start/6+1)+'.png';records.push(...rows.map(({images,...r})=>({...r,sheet})));
  const cards=rows.map(row=>'<article><h3>'+row.id+' · '+row.title+'</h3><div>'+row.images.map(im=>'<figure><img src="'+im.src+'"><figcaption>'+im.body+'</figcaption></figure>').join('')+'</div></article>').join('');
  await page.setContent('<meta charset="utf-8"><style>body{margin:0;padding:14px;background:#182127;color:#ead9b5;font:12px Arial}h3{font-size:13px;margin:8px}article{border-bottom:1px solid #65705e;padding:4px 0}article>div{display:flex}figure{margin:0 5px;text-align:center}img{width:240px;max-height:260px;object-fit:contain}figcaption{margin:3px}</style>'+cards);await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:path.join(output,sheet),fullPage:true});
  console.log(kind+': '+Math.min(start+6,items.length)+'/'+items.length);
  // Bound audit memory independently of the live render cache.
  await page.goto('https://fit.test/');await page.addScriptTag({path:'app-garage-catalog.js'});
 }
 }
 fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify({items:records.length,renders:records.length*3,records,failures},null,2));assert.deepEqual(failures,[]);console.log('PASS '+records.length+' items, '+records.length*3+' body fits; all requested assets loaded');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
