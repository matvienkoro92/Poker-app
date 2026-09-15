'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),sharp=require('sharp');
const {sngPlayerArt}=require('../lib/sng-player-art');
const root=path.resolve(__dirname,'..');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
(async()=>{
 const source=await fs.readFile(path.join(root,'club-news-data.js'),'utf8');
 const data=JSON.parse(source.slice(source.indexOf(' = ')+3).trim().replace(/;$/,''));
 const hero=data.dayHeroes[data.latestDate];if(!hero)return;
 const art=sngPlayerArt({displayName:hero.nick})||'assets/achievement-trophy-day-hero-v1.webp';
 const png=await sharp(path.join(root,art.split('?')[0])).resize(330,370,{fit:'contain',background:'#10171f'}).png().toBuffer();
 const reward=new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0}).format(hero.reward)+' ₽';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="440"><rect width="1000" height="440" rx="28" fill="#10171f"/><rect x="3" y="3" width="994" height="434" rx="26" fill="none" stroke="#d7ac58" stroke-width="4"/><image x="20" y="35" width="330" height="370" href="data:image/png;base64,${png.toString('base64')}"/><g font-family="sans-serif"><text x="385" y="88" fill="#e6c778" font-size="32">ГЕРОЙ ДНЯ · ${esc(data.latestDate)}</text><text x="385" y="171" fill="#ffffff" font-size="${Math.min(50,540/(hero.nick.length*.65))}" font-weight="bold">${esc(hero.nick)}</text><text x="385" y="258" fill="#f4ce67" font-size="52" font-weight="bold">${esc(reward)}</text><text x="385" y="310" fill="#b9c1ce" font-size="25">Выигрыш в турнире</text><text x="385" y="388" fill="#e6c778" font-size="26">Клуб «Два туза»</text></g></svg>`;
 const name='pulse-hero-'+data.latestDate.replaceAll('.','-')+'.jpg';
 await fs.mkdir(path.join(root,'public/assets/pulse'),{recursive:true});
 await sharp(Buffer.from(svg)).jpeg({quality:85}).toFile(path.join(root,'public/assets/pulse',name));
 await fs.writeFile(path.join(root,'public/pulse-hero.json'),JSON.stringify({date:data.latestDate,nick:hero.nick,reward:hero.reward,image:'/assets/pulse/'+name}));
 console.log('Generated pulse hero card:',hero.nick,data.latestDate);
})().catch(e=>{console.error(e);process.exitCode=1});
