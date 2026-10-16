'use strict';
const sharp=require('sharp'),fs=require('fs'),path=require('path');
const designs=[
 ['acesGoldTank','Два туза · Золото','#161d21','#e5bd6a','aces'],
 ['acesIvoryTank','Два туза · Клубная','#eee8d7','#233c38','club'],
 ['mankiChampionTank','ПокерМанки · Чемпион','#183e32','#e4bd68','champion'],
 ['poker21BlackTank','Poker21 · Black Label','#1b1e25','#efe7d2','poker'],
 ['poker21RedTank','Poker21 · Красная серия','#8a2331','#f7e9ca','race'],
 ['allInNightTank','Олл-ин · Ночная игра','#26314c','#d4c3f2','allin'],
 ['riverClubTank','Ривер · На моей стороне','#244e61','#f3d9ac','river']
];
const text=(str,y,size=20,weight=800)=>`<text x="210" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="${weight}" font-size="${size}" letter-spacing="1">${str}</text>`;
function print(kind,color){const cards='<g stroke="currentColor" stroke-width="2" fill="none"><rect x="162" y="125" width="58" height="82" rx="5" transform="rotate(-12 191 166)"/><rect x="202" y="125" width="58" height="82" rx="5" transform="rotate(12 231 166)"/></g><text x="184" y="174" font-family="Georgia" font-size="35">♠</text><text x="219" y="174" font-family="Georgia" font-size="35">♥</text>';
const crown='<path d="M184 118l-8-23 22 12 12-23 12 23 22-12-8 23z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M184 124h52" stroke="currentColor" stroke-width="3"/>';
let content='';if(kind==='aces')content=cards+text('ДВА ТУЗА',237,26)+text('POKER CLUB',257,10,500);
if(kind==='club')content='<circle cx="210" cy="169" r="61" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="210" cy="169" r="54" fill="none" stroke="currentColor" stroke-width=".8"/>'+text('A ♠ A',177,32)+text('ДВА ТУЗА',210,17)+text('КЛУБ СВОИХ',250,11,500);
if(kind==='champion')content=crown+text('ПОКЕРМАНКИ',154,18)+text('♠',202,48)+text('ЧЕМПИОН',236,24)+text('THE WINNING HAND',257,9,500);
if(kind==='poker')content=text('POKER',151,24)+text('21',209,66)+ '<path d="M158 225h104" stroke="currentColor" stroke-width="2"/>'+text('BLACK LABEL',246,12,500);
if(kind==='race')content='<path d="M145 118h130M145 124h130M145 242h130M145 248h130" stroke="currentColor" stroke-width="2"/>'+text('POKER',158,23)+text('21',216,62)+text('CLUB SERIES',237,10,500);
if(kind==='allin')content=text('ALL',153,38)+text('IN',199,44)+ '<path d="M160 213l50 19 50-19" fill="none" stroke="currentColor" stroke-width="3"/>'+text('NO HALF MEASURES',256,9,500);
if(kind==='river')content=text('THE RIVER',147,22)+text('♠',201,48)+'<path d="M151 217q15-12 30 0t30 0t30 0t30 0M151 226q15-12 30 0t30 0t30 0t30 0" fill="none" stroke="currentColor" stroke-width="2"/>'+text('НА МОЕЙ СТОРОНЕ',253,11,500);
return `<svg width="399" height="356" xmlns="http://www.w3.org/2000/svg"><g fill="${color}" color="${color}" opacity=".94">${content}</g></svg>`;}
(async()=>{for(const belly of [false,true]){const source=`assets/player-hall/wardrobe/summer/${belly?'bellyPalmTank':'palmTank'}.webp`;const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});const original=Buffer.from(data),mask=Buffer.alloc(info.width*info.height*4);for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){const n=(y*info.width+x)*4,r=data[n],g=data[n+1],b=data[n+2];if(data[n+3]&&g>r*1.055&&b>=r*1.025){mask[n]=mask[n+1]=mask[n+2]=255;mask[n+3]=data[n+3];}}
const low=await sharp(original,{raw:info}).blur(9).raw().toBuffer();for(const [id,,color,ink,kind]of designs){const pixels=Buffer.from(original),rgb=color.slice(1).match(/../g).map(x=>parseInt(x,16));for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){const n=(y*info.width+x)*4;if(!mask[n+3])continue;const light=Math.max(.50,Math.min(1.13,low[n+1]/175)),grain=((x*17+y*31)%13-6)*.35;for(let k=0;k<3;k++)pixels[n+k]=Math.max(0,Math.min(255,rgb[k]*light+grain));}
const overlay=await sharp(Buffer.from(print(kind,ink))).resize(info.width,info.height).png().toBuffer();const clipped=await sharp(overlay).composite([{input:await sharp(mask,{raw:info}).png().toBuffer(),blend:'dest-in'}]).png().toBuffer();const filename=(belly?'belly'+id[0].toUpperCase()+id.slice(1):id)+'.webp';await sharp(pixels,{raw:info}).composite([{input:clipped}]).webp({quality:95}).toFile(path.join('assets/player-hall/wardrobe/summer',filename));}}
console.log('Generated seven club tanks and seven belly fits');})();
