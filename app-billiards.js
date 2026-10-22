(()=>{var Tu=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],gs=Number.isFinite,_r=r=>r===8?null:r<8?0:1;function wl(r,e,t){return!r.inHand||r.moving||r.winner!==null||!gs(e)||!gs(t)||e<15||e>985||t<15||t>485||r.balls.some(n=>n.id&&!n.pocket&&Math.hypot(n.x-e,n.y-t)<21)||Tu.some(n=>Math.hypot(n[0]-e,n[1]-t)<28)?!1:(Object.assign(r.balls[0],{x:e,y:t,vx:0,vy:0,pocket:!1}),r.inHand=!1,r.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function El(r,e,t){if(r.moving||r.inHand||r.winner!==null||!gs(e)||!gs(t)||t<.05||t>1)return!1;Object.assign(r.balls[0],{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),r.moving=!0,r.firstHit=null,r.sunk=[],r.scratch=!1;let n=r.groups[r.turn];return r.eightReady=n!==null&&!r.balls.some(i=>i.id&&i.id!==8&&!i.pocket&&_r(i.id)===n),r.legalFirst=r.eightReady?[8]:r.balls.filter(i=>i.id&&i.id!==8&&!i.pocket&&(n===null||_r(i.id)===n)).map(i=>i.id),r.shot++,r.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0}function zf(r){r.moving=!1;let e=r.turn,t=r.groups[e],n=r.balls.some(a=>!a.pocket&&a.id&&a.id!==8&&_r(a.id)===t),i=r.scratch||r.firstHit===null||!r.legalFirst.includes(r.firstHit);if(r.sunk.includes(8)){r.winner=!i&&r.eightReady?e:1-e,r.message="\u0418\u0433\u0440\u043E\u043A "+(r.winner+1)+" \u043F\u043E\u0431\u0435\u0434\u0438\u043B"+(r.winner!==e?" \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0437\u0430\u0431\u0438\u0442\u0430 \u0440\u0430\u043D\u044C\u0448\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0438\u043B\u0438 \u0441 \u0444\u043E\u043B\u043E\u043C":"");return}!i&&t===null&&r.sunk.some(a=>a!==8)&&(r.groups[e]=_r(r.sunk.find(a=>a!==8)),r.groups[1-e]=1-r.groups[e]),r.scores=[0,1].map(a=>r.balls.filter(o=>o.id&&o.id!==8&&o.pocket&&_r(o.id)===r.groups[a]).length);let s=!i&&r.sunk.some(a=>_r(a)===r.groups[e]);s||(r.turn=1-e),i?(r.inHand=!0,r.balls[0].pocket=!0,r.message="\u0424\u043E\u043B \xB7 \u0438\u0433\u0440\u043E\u043A "+(r.turn+1)+" \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0431\u0438\u0442\u043E\u043A"):r.message="\u0425\u043E\u0434 \u0438\u0433\u0440\u043E\u043A\u0430 "+(r.turn+1)+(s?" \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":"")}function wu(r,e=1/120){if(r.moving){e=Math.min(Math.max(e,0),1/120);for(let t of r.balls){if(t.pocket)continue;t.x+=t.vx*e,t.y+=t.vy*e;let n=Math.hypot(t.vx,t.vy),i=Math.max(0,n-135*e);if(n&&(t.vx*=i/n,t.vy*=i/n),Tu.some(([s,a])=>Math.hypot(t.x-s,t.y-a)<24)){t.pocket=!0,t.vx=t.vy=0,t.id===0?r.scratch=!0:r.sunk.push(t.id);continue}t.x<10&&(t.x=10,t.vx=Math.abs(t.vx)*.84),t.x>990&&(t.x=990,t.vx=-Math.abs(t.vx)*.84),t.y<10&&(t.y=10,t.vy=Math.abs(t.vy)*.84),t.y>490&&(t.y=490,t.vy=-Math.abs(t.vy)*.84)}for(let t=0;t<r.balls.length;t++)for(let n=t+1;n<r.balls.length;n++){let i=r.balls[t],s=r.balls[n];if(i.pocket||s.pocket)continue;let a=s.x-i.x,o=s.y-i.y,l=Math.hypot(a,o);if(l>=20)continue;l=Math.max(l,.001);let c=a/l,h=o/l,u=(20-l)/2+.001;i.x-=c*u,i.y-=h*u,s.x+=c*u,s.y+=h*u;let d=(i.vx-s.vx)*c+(i.vy-s.vy)*h;if(d>0){i.id===0&&r.firstHit===null&&(r.firstHit=s.id),s.id===0&&r.firstHit===null&&(r.firstHit=i.id);let p=d*.98;i.vx-=p*c,i.vy-=p*h,s.vx+=p*c,s.vy+=p*h}}r.balls.every(t=>t.pocket||Math.hypot(t.vx,t.vy)<1)&&(r.balls.forEach(t=>t.vx=t.vy=0),zf(r))}}function Eu(r,e,t){return e!==r.turn||!t||typeof t!="object"?!1:t.type==="shot"?El(r,t.angle,t.power):t.type==="place"?wl(r,t.x,t.y):!1}function Au(r){return!!r&&[0,1].includes(r.turn)&&Array.isArray(r.balls)&&r.balls.length===16&&new Set(r.balls.map(e=>e.id)).size===16&&r.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(gs)&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3)&&Array.isArray(r.groups)&&r.groups.length===2&&r.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(r.scores)&&r.scores.length===2&&r.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=7)&&(r.winner===null||r.winner===0||r.winner===1)&&typeof r.message=="string"&&r.message.length<250}var Ru=Object.freeze({pool8:Object.freeze({name:"\u041F\u0443\u043B \xB7 9 \u0444\u0443\u0442\u043E\u0432",length:2540,ball:57.15,corner:114.3,side:127,cornerShelf:38.1,sideShelf:6.35,cornerFlare:7,sideFlare:14,restitution:.86}),pyramid:Object.freeze({name:"\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430 \xB7 12 \u0444\u0443\u0442\u043E\u0432",length:3560,ball:68,corner:72.5,side:82.5,cornerShelf:5.5,sideShelf:0,cornerFlare:0,sideFlare:0,restitution:.84})}),Bi=r=>Ru[typeof r=="string"?r:r.discipline]||Ru.pool8,Al=new Map;function vr(r){let e=Bi(r),t=e.name;if(Al.has(t))return Al.get(t);let n=1e3/e.length,i=e.ball/2*n,s=e.corner*n,a=e.side*n,o=s/Math.SQRT2,l=a/2,c=[[[o,0],[500-l,0],2],[[500+l,0],[1e3-o,0],2],[[o,500],[500-l,500],3],[[500+l,500],[1e3-o,500],3],[[0,o],[0,500-o],0],[[1e3,o],[1e3,500-o],1]].map(([p,m,v])=>({a:p,b:m,side:v,jaw:!1})),h=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],u=h.map(([p,m],v)=>{let g=v%3===1,f=g?[0,m===0?1:-1]:[p===0?Math.SQRT1_2:-Math.SQRT1_2,m===0?Math.SQRT1_2:-Math.SQRT1_2],_=[-f[1],f[0]],x=g?a:s,y=g?[p,m]:[p+f[0]*o/Math.SQRT2,m+f[1]*o/Math.SQRT2],b=(g?e.sideShelf:e.cornerShelf)*n,A=b+i*1.4,L=Math.tan((g?e.sideFlare:e.cornerFlare)*Math.PI/180),U=[-1,1].map(N=>y.map((k,B)=>k+_[B]*x/2*N));for(let[N,k]of U.entries()){let B=N===0?-1:1,O=k.map((j,G)=>j-f[G]*A-_[G]*B*L*A);c.push({a:k,b:O,side:g?m===0?2:3:Math.abs(k[0]-p)<.01?p===0?0:1:m===0?2:3,jaw:!0})}return{index:v,center:y,n:f,t:_,mouth:x,shelf:b,ends:U,drop:y.map((N,k)=>N-f[k]*(b+i*.7))}}),d={spec:e,scale:n,r:i,rails:c,pockets:u};return Al.set(t,d),d}function Cu(r,e){for(let t of e.pockets){let n=r.x-t.center[0],i=r.y-t.center[1],s=n*t.n[0]+i*t.n[1],a=n*t.t[0]+i*t.t[1];if(s<-(t.shelf+e.r*.6)&&Math.abs(a)<t.mouth/2-e.r*.99)return t.index}return-1}function Iu(r,e){let t=e.b[0]-e.a[0],n=e.b[1]-e.a[1],i=t*t+n*n,s=Math.max(0,Math.min(1,((r.x-e.a[0])*t+(r.y-e.a[1])*n)/i));return{x:e.a[0]+t*s,y:e.a[1]+n*s}}var Pu=(r,e)=>Math.max(-e,Math.min(e,r));function Lu(r){return r===void 0||!!r&&typeof r=="object"&&Number.isFinite(r.x)&&Number.isFinite(r.y)&&Math.hypot(r.x,r.y)<=1.000001}function Nu(r,e,t,n={x:0,y:0}){let i=1.625*n.y*t;r.rollX=Math.cos(e)*i,r.rollY=Math.sin(e)*i,r.side=-1.625*n.x*t}function Du(r,e,t){let n=981e4/Bi(t).length,i=r.vx-(r.rollX||0),s=r.vy-(r.rollY||0),a=Math.hypot(i,s);if(a>.05){let o=Math.min(.2*n*e,a/3.5),l=i/a*o,c=s/a*o;r.vx-=l,r.vy-=c,r.rollX=(r.rollX||0)+2.5*l,r.rollY=(r.rollY||0)+2.5*c}else{let o=Math.hypot(r.vx,r.vy),l=Math.max(0,o-.018*n*e);o&&(r.vx*=l/o,r.vy*=l/o),r.rollX=r.vx,r.rollY=r.vy}r.side=Math.sign(r.side||0)*Math.max(0,Math.abs(r.side||0)-.018*n*e)}function Uu(r,e,t,n){let i=r.vx*e+r.vy*t;if(i>=0)return!1;let s=-(1+n)*i,a=-t,o=e,l=r.vx*a+r.vy*o-(r.side||0),c=Pu(-l/3.5,.14*s);return r.vx+=s*e+c*a,r.vy+=s*t+c*o,r.side=(r.side||0)-2.5*c,!0}function Ou(r,e,t,n,i){let s=-n,a=t,o=(r.vx-e.vx)*s+(r.vy-e.vy)*a+(r.side||0)+(e.side||0),l=Pu(o/7,.04*i);r.vx-=l*s,r.vy-=l*a,e.vx+=l*s,e.vy+=l*a,r.side=(r.side||0)-2.5*l,e.side=(e.side||0)-2.5*l}function Ea(r){r.rollX=r.rollY=r.side=0}function Fu(r){return Math.hypot(r.vx-(r.rollX||0),r.vy-(r.rollY||0))>1}var mi=1e3,gi=500,Rl=10,Cl=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],ku=["pool8","pyramid"],_s=r=>r===8||r===0?null:r<8?0:1,Nt=r=>vr(r).r,Hf=r=>r.balls.find(e=>e.id===(r.cueId??0));function vs(r={}){let e=r.discipline||"pool8";if(!ku.includes(e))throw Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0430");let t=e==="pyramid"&&r.color==="red"?"red":e==="pyramid"?"yellow":"standard",n=Nt({discipline:e}),i=(Number(r.seed)||1)>>>0,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),a=Array.from({length:15},(c,h)=>h+1);for(let c=14;c>0;c--){let h=Math.floor(s()*(c+1));[a[c],a[h]]=[a[h],a[c]]}if(e==="pool8"){let c=a.indexOf(8);[a[4],a[c]]=[8,a[4]];let h=a.find(d=>d<8),u=a.find(d=>d>8);for(let[d,p]of[[h,10],[u,14]]){let m=a.indexOf(d);[a[p],a[m]]=[d,a[p]]}}let o=[{id:0,x:230,y:250,vx:0,vy:0,pocket:!1}],l=0;for(let c=0;c<5;c++)for(let h=0;h<=c;h++)o.push({id:a[l++],x:750+c*(2*n+.05)*Math.sqrt(3)/2,y:250+(h-c/2)*(2*n+.05),vx:0,vy:0,pocket:!1});return{rulesVersion:2,discipline:e,color:t,seed:Number(r.seed)||1,balls:o,turn:r.breaker===1?1:0,breaker:r.breaker===1?1:0,cueId:0,groups:[null,null],scores:[0,0],captured:[[],[]],moving:!1,inHand:!1,handZone:null,winner:null,shot:0,breakPending:!0,message:"\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430 \xB7 \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A",firstHit:null,sunk:[],scratch:!1,pending:null}}function zu(r){return!r.moving&&r.winner===null&&!r.pending}function Ra(r,e,t){if(!r.rulesVersion)return wl(r,e,t);let n=Nt(r),i=Hf(r);return!zu(r)||!r.inHand&&!r.breakPending||!i||![e,t].every(Number.isFinite)||e<n||e>mi-n||t<n||t>gi-n||(r.handZone==="head"||r.breakPending)&&e>=250||r.balls.some(s=>s.id!==i.id&&!s.pocket&&Math.hypot(s.x-e,s.y-t)<n*2+.05)||Cl.some(s=>Math.hypot(s[0]-e,s[1]-t)<25)?!1:(Object.assign(i,{x:e,y:t,vx:0,vy:0,pocket:!1}),r.nextHeadShot=r.handZone==="head",r.inHand=!1,r.handZone=null,Ea(i),r.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function Vf(r,e){let t=[];return r.x<=e+.2&&t.push(0),r.x>=mi-e-.2&&t.push(1),r.y<=e+.2&&t.push(2),r.y>=gi-e-.2&&t.push(3),t}function ki(r){if(r.discipline==="pyramid")return r.balls.filter(n=>!n.pocket&&n.id!==(r.cueId??0));let e=r.groups[r.turn],t=r.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||_s(n.id)===e));return e===null&&[0,1].some(n=>!r.balls.some(i=>!i.pocket&&_s(i.id)===n))?[...t,...r.balls.filter(n=>n.id===8&&!n.pocket)]:t.length?t:r.balls.filter(n=>n.id===8&&!n.pocket)}function Il(r,e,t,n={}){if(!r.rulesVersion)return El(r,e,t);if(!Lu(n.spin)||!zu(r)||r.inHand||![e,t].every(Number.isFinite)||t<.05||t>1)return!1;let i=r.discipline==="pyramid"&&!r.breakPending?n.cueId??r.cueId:0,s=r.balls.find(c=>c.id===i&&!c.pocket);if(!s||r.breakPending&&s.x>=250)return!1;r.cueId=i;let a=ki(r).map(c=>c.id),o=r.breakPending,l=n.safety===!0;return r.discipline==="pool8"&&!o&&!l&&(!a.includes(n.callBall)||!Number.isInteger(n.callPocket)||n.callPocket<0||n.callPocket>5)?!1:(r.headShot=!!r.nextHeadShot||o,r.nextHeadShot=!1,r.headExited=s.x>=250,r.illegalHead=!1,r.lastShooter=r.turn,r.call=o?null:{ball:n.callBall,pocket:n.callPocket,safety:l},r.legalFirst=o?r.balls.filter(c=>c.id).map(c=>c.id):a,r.eightReady=r.discipline==="pool8"&&a.includes(8),Object.assign(s,{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),r.spin=n.spin?{x:n.spin.x,y:n.spin.y}:{x:0,y:0},Nu(s,e,180+t*1250,r.spin),r.contacts={balls:0,rails:0,jaws:0},r.moving=!0,r.firstHit=null,r.sunk=[],r.pots=[],r.scratch=!1,r.railAfter=!1,r.breakRails=[],r.breakCross=[],r.tracks=Object.fromEntries(r.balls.map(c=>[c.id,{rails:[],cross:!1,frozen:Vf(c,Nt(r))}])),r.pyramidLegal=!1,r.wasBreak=o,r.breakPending=!1,r.shot++,r.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0)}function Gu(r,e){let t=r.balls.find(i=>i.id===e),n=Nt(r);if(t){for(let i of[1,-1])for(let s=750;i>0?s<mi-n:s>n;s+=i*(2*n+.1))if(!r.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-s,a.y-250)<2*n+.05)){Object.assign(t,{x:s,y:250,vx:0,vy:0,pocket:!1});return}for(let i=n+1;i<mi-n;i+=2*n+1)for(let s=n+1;s<gi-n;s+=2*n+1)if(!r.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-i,a.y-s)<2*n+.05)){Object.assign(t,{x:i,y:s,vx:0,vy:0,pocket:!1});return}}}function Aa(r){r.captured=r.groups.map(e=>e===null?[]:r.balls.filter(t=>t.pocket&&_s(t.id)===e).map(t=>t.id).sort((t,n)=>t-n)),r.scores=r.captured.map(e=>e.length)}function Pl(r,e){r.winner=e,r.message="\u0418\u0433\u0440\u043E\u043A "+(e+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B \u043F\u0430\u0440\u0442\u0438\u044E"}function Wf(r){let e=r.turn,t=r.wasBreak,n=r.scratch||r.illegalHead||r.firstHit===null||!r.legalFirst.includes(r.firstHit)||!t&&!r.sunk.length&&!r.railAfter,i=r.sunk.includes(8);if(t){i&&Gu(r,8);let o=!r.sunk.length&&r.breakRails.length<4;if(n||o||i){let l=n||o?1-e:e;r.turn=l,r.pending={type:"pool-break",offender:e,foul:n,illegal:o,eight:i},r.message=n?"\u0424\u043E\u043B \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":o?"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":"\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",Aa(r);return}r.turn=r.sunk.length?e:1-e,r.message=r.sunk.length?"\u0420\u0430\u0437\u0431\u043E\u0439 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \xB7 \u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430",Aa(r);return}let s=r.call&&!r.call.safety&&(r.pots||[]).some(o=>o.id===r.call.ball&&o.pocket===r.call.pocket);if(i){if(r.groups[e]===null&&r.eightReady&&!n&&s){let o=[0,1].find(l=>!r.balls.some(c=>!c.pocket&&_s(c.id)===l));r.groups[e]=o,r.groups[1-e]=1-o}Aa(r),Pl(r,!n&&r.eightReady&&s?e:1-e);return}!n&&s&&r.groups[e]===null&&(r.groups[e]=_s(r.call.ball),r.groups[1-e]=1-r.groups[e]),Aa(r);let a=!n&&s;a||(r.turn=1-e),n?(r.inHand=!0,r.handZone="any",r.cueId=0,r.balls.find(o=>o.id===0).pocket=!0,r.message="\u0424\u043E\u043B \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435"):r.message=a?"\u0428\u0430\u0440 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":r.call?.safety?"\u041E\u0442\u044B\u0433\u0440\u044B\u0448 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"}function Xf(r){let e=r.turn,t=r.wasBreak,n=r.sunk.length>0||r.breakRails.length>=3||r.breakRails.length>=2&&r.breakCross.length>0;if(r.firstHit===null||t&&!n||!t&&!r.sunk.length&&!r.pyramidLegal){for(let s of r.sunk)Gu(r,s);r.turn=1-e,r.pending={type:"pyramid-foul",offender:e,illegalBreak:t&&!n},r.message="\u0428\u0442\u0440\u0430\u0444 \xB7 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443";return}for(let s of r.sunk)r.captured[e].includes(s)||r.captured[e].push(s);if(r.scores=r.captured.map(s=>s.length),r.scores[e]>=8){Pl(r,e);return}r.sunk.length||(r.turn=1-e),r.cueId=r.balls.find(s=>!s.pocket)?.id??0,r.message=r.sunk.length?"\u0428\u0430\u0440\u044B \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D\u044B \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430 \xB7 \u0431\u0438\u0442\u043E\u043A \u2014 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440"}function jf(r){r.moving=!1;for(let e of r.balls)Ea(e);r.lastShot={player:r.lastShooter,potted:[...r.sunk],contacts:{...r.contacts},spin:{...r.spin}},r.discipline==="pyramid"?Xf(r):Wf(r),delete r.tracks}function qf(r,e,t){if(r.firstHit===null)return;r.railAfter=!0,e.id!==r.cueId&&!r.breakRails.includes(e.id)&&r.breakRails.push(e.id);let n=r.tracks[e.id];(n.cross||n.rails.some(i=>i!==t))&&(r.pyramidLegal=!0),n.rails.includes(t)||n.rails.push(t)}function Yf(r,e){if(r.firstHit===null)return;let t=r.tracks[e.id];t.rails.length&&(r.pyramidLegal=!0),t.cross=!0,e.id!==r.cueId&&!r.breakCross.includes(e.id)&&r.breakCross.push(e.id)}function Zf(r,e,t){if(r.firstHit===null&&(e.id===r.cueId?(r.firstHit=t.id,r.headShot&&!r.headExited&&t.x<250&&(r.illegalHead=!0)):t.id===r.cueId&&(r.firstHit=e.id,r.headShot&&!r.headExited&&e.x<250&&(r.illegalHead=!0))),r.firstHit===null)return;let n=r.tracks[e.id],i=r.tracks[t.id];for(let[o,l]of[[n,i],[i,n]])l.frozen.some(c=>o.cross||o.rails.some(h=>h!==c))&&(r.pyramidLegal=!0);let s=[...new Set([...n.rails,...i.rails])],a=n.cross||i.cross;n.rails=[...s],i.rails=[...s],n.cross=i.cross=a}function Ca(r,e=1/120){if(!r.rulesVersion)return wu(r,e);if(!r.moving)return;e=Math.min(Math.max(e,0),1/120);let t=vr(r),n=t.r,i=Math.max(...r.balls.map(o=>Math.hypot(o.vx,o.vy))),s=Math.max(1,Math.min(12,Math.ceil(i*e/(n*.3)))),a=e/s;for(let o=0;o<s;o++){for(let l of r.balls){if(l.pocket)continue;let c=l.x;l.x+=l.vx*a,l.y+=l.vy*a,l.id===r.cueId&&l.x>=250&&(r.headExited=!0),(c-500)*(l.x-500)<0&&Yf(r,l),Du(l,a,r);for(let u of t.rails){let d=Iu(l,u),p=l.x-d.x,m=l.y-d.y,v=Math.hypot(p,m);if(v>=n||v<1e-5)continue;let g=p/v,f=m/v;l.x=d.x+g*(n+1e-4),l.y=d.y+f*(n+1e-4),Uu(l,g,f,t.spec.restitution)&&(qf(r,l,u.side),r.contacts&&r.contacts[u.jaw||Math.hypot(d.x-u.a[0],d.y-u.a[1])<.001||Math.hypot(d.x-u.b[0],d.y-u.b[1])<.001?"jaws":"rails"]++)}let h=Cu(l,t);h>=0&&(l.pocket=!0,l.vx=l.vy=0,Ea(l),r.pots.push({id:l.id,pocket:h}),l.id===r.cueId&&(r.scratch=!0),(r.discipline==="pyramid"||l.id!==0)&&r.sunk.push(l.id))}for(let l=0;l<r.balls.length;l++)for(let c=l+1;c<r.balls.length;c++){let h=r.balls[l],u=r.balls[c];if(h.pocket||u.pocket)continue;let d=u.x-h.x,p=u.y-h.y,m=Math.hypot(d,p);if(m>=n*2)continue;m=Math.max(m,.001);let v=d/m,g=p/m,f=(n*2-m)/2+.001;h.x-=v*f,h.y-=g*f,u.x+=v*f,u.y+=g*f;let _=(h.vx-u.vx)*v+(h.vy-u.vy)*g;if(_>0){Zf(r,h,u),r.contacts&&r.contacts.balls++;let x=_*.98;h.vx-=x*v,h.vy-=x*g,u.vx+=x*v,u.vy+=x*g,Ou(h,u,v,g,x)}}}r.balls.every(o=>o.pocket||Math.hypot(o.vx,o.vy)<1&&!Fu(o))&&(r.balls.forEach(o=>o.vx=o.vy=0),jf(r))}function Bu(r,e,t=!1){let n={scores:r.scores,captured:r.captured},i=vs({discipline:r.discipline,color:r.color,seed:r.seed+1,breaker:e});if(t){i.scores=n.scores,i.captured=n.captured;for(let l of n.captured.flat())i.balls.find(c=>c.id===l).pocket=!0;let s=i.balls.filter(l=>!l.pocket),a=s.find(l=>l.id===0);if(!a){a=s[0];let l=i.captured.find(c=>c.includes(0));l[l.indexOf(0)]=a.id,a.pocket=!0,a=i.balls.find(c=>c.id===0),a.pocket=!1}Object.assign(a,{x:230,y:250});let o=0;for(let l=0;l<5;l++)for(let c=0;c<=l;c++){let h=s.filter(u=>u.id!==a.id&&!u.pocket)[o++];h&&Object.assign(h,{x:750+l*(Nt(i)*2+.05)*Math.sqrt(3)/2,y:250+(c-l/2)*(Nt(i)*2+.05)})}}Object.keys(r).forEach(s=>delete r[s]),Object.assign(r,i)}function Kf(r,e){let t=r.pending;if(!t||r.moving||r.winner!==null)return!1;if(t.type==="pool-break"){if(!(t.illegal?["accept",...t.foul?["hand"]:[],"rerack-self","rerack-opponent"]:t.eight?["accept","rerack-self"]:["accept","hand"]).includes(e.choice))return!1;let i=r.turn;return r.pending=null,e.choice.startsWith("rerack")?(Bu(r,e.choice==="rerack-self"?i:1-i),!0):((e.choice==="hand"||t.eight&&t.foul||r.balls.find(s=>s.id===0).pocket)&&(r.inHand=!0,r.handZone="head",r.cueId=0),r.message=r.inHand?"\u0420\u0430\u0437\u0431\u043E\u0439 \xB7 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437",!0)}if(t.type==="pyramid-foul"){if(!["play","pass",...t.illegalBreak?["rerack-self","rerack-opponent"]:[]].includes(e.choice))return!1;let n=r.balls.find(s=>s.id===e.ballId&&!s.pocket);if(!n)return!1;let i=r.turn;return n.pocket=!0,r.captured[i].push(n.id),r.scores=r.captured.map(s=>s.length),r.pending=null,r.scores[i]>=8?(Pl(r,i),!0):e.choice.startsWith("rerack")?(Bu(r,e.choice==="rerack-self"?i:1-i,!0),!0):(r.turn=e.choice==="pass"?t.offender:i,r.cueId=r.balls.find(s=>!s.pocket)?.id??0,r.message="\u0428\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440 \u0441\u043D\u044F\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A",!0)}return!1}function zi(r,e,t){return r.rulesVersion?e!==r.turn||!t||typeof t!="object"?!1:t.type==="decision"?Kf(r,t):t.type==="shot"?Il(r,t.angle,t.power,t):t.type==="place"?Ra(r,t.x,t.y):!1:Eu(r,e,t)}function Ll(r){return r?.rulesVersion?r.rulesVersion===2&&ku.includes(r.discipline)&&[0,1].includes(r.turn)&&Array.isArray(r.balls)&&r.balls.length===16&&new Set(r.balls.map(e=>e.id)).size===16&&r.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(Number.isFinite)&&["rollX","rollY","side"].every(t=>e[t]===void 0||Number.isFinite(e[t]))&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3&&typeof e.pocket=="boolean")&&Array.isArray(r.groups)&&r.groups.length===2&&r.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(r.scores)&&r.scores.length===2&&r.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=16)&&Array.isArray(r.captured)&&r.captured.length===2&&r.captured.every(e=>Array.isArray(e)&&e.every(t=>Number.isInteger(t)&&t>=0&&t<16))&&(r.winner===null||r.winner===0||r.winner===1)&&typeof r.message=="string"&&r.message.length<250:Au(r)}function Hu({request:r,onUpdate:e,onError:t}){let n=!1,i=null,s="",a=0,o=!1;function l(h){n||h.revision<a||(s=h.roomId,a=h.revision,e(h))}async function c(){if(clearTimeout(i),!(n||!s))try{l(await r({action:"room",roomId:s}))}catch(h){n||t(h.message)}finally{n||(clearTimeout(i),i=setTimeout(c,800))}}return{async start(h,u,d={}){try{let p=await r(h?{action:"create",...d}:{action:"join",roomId:u});if(l(p),h&&d.challenge)try{await r({action:"challenge",roomId:p.roomId}),n||e({...p,challengeSent:!0})}catch(m){n||t(m.message)}n||(clearTimeout(i),i=setTimeout(c,800))}catch(p){n||t(p.message,!0)}},async move(h,u=!1){if(!(n||o||!s)){o=!0;try{l(await r({action:u?"rematch":"move",roomId:s,revision:a,...u?{}:{move:h}}))}catch(d){n||(t(d.message),c())}finally{o=!1}}},close(){n=!0,clearTimeout(i)}}}var Nd=0,Ec=1,Dd=2;var Ac=1,Xo=2,kn=3,Ii=0,en=1,cn=2,Pi=0,ua=1,Rc=2,Cc=3,Ic=4,Ud=5,Zr=100,Od=101,Fd=102,Bd=103,kd=104,zd=200,Gd=201,Hd=202,Vd=203,Wd=204,Xd=205,jd=206,qd=207,Yd=208,Zd=209,Kd=210,Jd=211,$d=212,Qd=213,ep=214,jo=0,qo=1,Yo=2,da=3,Zo=4,Ko=5,Jo=6,$o=7,tp=0,np=1,ip=2,li=0,rp=1,sp=2,ap=3,Qo=4,op=5,lp=6,cp=7,uc="attached",hp="detached",Pc=300,Kr=301,ir=302,Li=303,el=304,pa=306,Jt=1e3,bi=1001,Dr=1002,$t=1003,tl=1004;var rr=1005;var jt=1006,Jr=1007;var zn=1008;var Gn=1009,Lc=1010,Nc=1011,$r=1012,nl=1013,sr=1014,hn=1015,Qr=1016,il=1017,rl=1018,es=1020,Dc=35902,Uc=35899,up=1021,dp=1022,un=1023,fa=1026,ma=1027,sl=1028,al=1029,pp=1030,Oc=1031;var Fc=1033,ol=33776,ll=33777,cl=33778,hl=33779,Bc=35840,kc=35841,zc=35842,Gc=35843,Hc=36196,Vc=37492,Wc=37496,Xc=37808,jc=37809,qc=37810,Yc=37811,Zc=37812,Kc=37813,Jc=37814,$c=37815,Qc=37816,eh=37817,th=37818,nh=37819,ih=37820,rh=37821,sh=36492,ah=36494,oh=36495,lh=36283,ch=36284,hh=36285,uh=36286;var ji=2300,qi=2301,ao=2302,dc=2400,pc=2401,fc=2402;var dh=0,ga=1,ts=2;var fp=3201;var mp=0,gp=1,ar="",ot="srgb",Dt="srgb-linear",Ps="linear",lt="srgb";var Xi=7680;var _p=512,vp=513,xp=514,ph=515,yp=516,Mp=517,Sp=518,bp=519,oo=35044;var fh="300 es",ii=2e3,Ls=2001;var ri=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vu=1234567,Lr=Math.PI/180,Yi=180/Math.PI;function an(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Ot[255&r]+Ot[r>>8&255]+Ot[r>>16&255]+Ot[r>>24&255]+"-"+Ot[255&e]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[63&t|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[255&n]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Ve(r,e,t){return Math.max(e,Math.min(t,r))}function mc(r,e){return(r%e+e)%e}function Rs(r,e,t){return(1-t)*r+t*e}function yn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function at(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var mh={DEG2RAD:Lr,RAD2DEG:Yi,generateUUID:an,clamp:Ve,euclideanModulo:mc,mapLinear:function(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)},inverseLerp:function(r,e,t){return r!==e?(t-r)/(e-r):0},lerp:Rs,damp:function(r,e,t,n){return Rs(r,e,1-Math.exp(-t*n))},pingpong:function(r,e=1){return e-Math.abs(mc(r,2*e)-e)},smoothstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*(3-2*r)},smootherstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*r*(r*(6*r-15)+10)},randInt:function(r,e){return r+Math.floor(Math.random()*(e-r+1))},randFloat:function(r,e){return r+Math.random()*(e-r)},randFloatSpread:function(r){return r*(.5-Math.random())},seededRandom:function(r){r!==void 0&&(Vu=r);let e=Vu+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(r){return r*Lr},radToDeg:function(r){return r*Yi},isPowerOfTwo:function(r){return!(r&r-1)&&r!==0},ceilPowerOfTwo:function(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))},floorPowerOfTwo:function(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))},setQuaternionFromProperEuler:function(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*m,l*p,o*c);break;case"YXY":r.set(l*p,o*h,l*m,o*c);break;case"ZYZ":r.set(l*m,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}},normalize:at,denormalize:yn},ie=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],m=s[a+2],v=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=m,void(e[t+3]=v);if(u!==v||l!==d||c!==p||h!==m){let g=1-o,f=l*d+c*p+h*m+u*v,_=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){let b=Math.sqrt(x),A=Math.atan2(b,f*_);g=Math.sin(g*A)/b,o=Math.sin(o*A)/b}let y=o*_;if(l=l*g+d*y,c=c*g+p*y,h=h*g+m*y,u=u*g+v*y,g===1-o){let b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*p-c*d,e[t+1]=l*m+h*d+c*u-o*p,e[t+2]=c*m+h*p+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),p=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"YXZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"ZXY":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"ZYX":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"YZX":this._x=d*h*u+c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u-d*p*m;break;case"XZY":this._x=d*h*u-c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nl.copy(this).projectOnVector(e),this.sub(Nl)}reflect(e){return this.sub(Nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nl=new w,Wu=new qt,Ge=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],m=n[8],v=i[0],g=i[3],f=i[6],_=i[1],x=i[4],y=i[7],b=i[2],A=i[5],L=i[8];return s[0]=a*v+o*_+l*b,s[3]=a*g+o*x+l*A,s[6]=a*f+o*y+l*L,s[1]=c*v+h*_+u*b,s[4]=c*g+h*x+u*A,s[7]=c*f+h*y+u*L,s[2]=d*v+p*_+m*b,s[5]=d*g+p*x+m*A,s[8]=d*f+p*y+m*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,p=c*s-a*l,m=t*u+n*d+i*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Dl.makeScale(e,t)),this}rotate(e){return this.premultiply(Dl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Dl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Dl=new Ge;function gh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ur(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Tp(){let r=Ur("canvas");return r.style.display="block",r}var Xu={};function Or(r){r in Xu||(Xu[r]=!0,console.warn(r))}function wp(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var ju=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jf(){let r={enabled:!0,workingColorSpace:Dt,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===lt&&(i.r=ni(i.r),i.g=ni(i.g),i.b=ni(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(i.r=Nr(i.r),i.g=Nr(i.g),i.b=Nr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Ps:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Or("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Or("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Dt]:{primaries:e,whitePoint:n,transfer:Ps,toXYZ:ju,fromXYZ:qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ot},outputColorSpaceConfig:{drawingBufferColorSpace:ot}},[ot]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:ju,fromXYZ:qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ot}}}),r}var $e=Jf();function ni(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Nr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var xr,lo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xr===void 0&&(xr=Ur("canvas")),xr.width=e.width,xr.height=e.height;let i=xr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=xr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*ni(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ni(t[n]/255)):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},$f=0,Fr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=an(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ul(i[a].image)):s.push(Ul(i[a]))}else s=Ul(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ul(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?lo.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Qf=0,Ol=new w,Rt=class r extends ri{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,l=1009,c=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=an(),this.name="",this.source=new Fr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ol).x}get height(){return this.source.getSize(Ol).y}get depth(){return this.source.getSize(Ol).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jt:e.x=e.x-Math.floor(e.x);break;case bi:e.x=e.x<0?0:1;break;case Dr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Jt:e.y=e.y-Math.floor(e.y);break;case bi:e.y=e.y<0?0:1;break;case Dr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rt.DEFAULT_IMAGE=null,Rt.DEFAULT_MAPPING=Pc,Rt.DEFAULT_ANISOTROPY=1;var nt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],m=l[9],v=l[2],g=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(p+1)/2,b=(f+1)/2,A=(h+d)/4,L=(u+v)/4,U=(m+g)/4;return x>y&&x>b?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=A/n,s=L/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=A/i,s=U/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=L/s,i=U/s),this.set(n,i,s,t),this}let _=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},co=class extends ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Rt(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Fr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends co{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ns=class extends Rt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$t,this.minFilter=$t,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ho=class extends Rt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$t,this.minFilter=$t,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ut=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,_n):_n.fromBufferAttribute(s,a),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ia.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ia.copy(n.boundingBox)),Ia.applyMatrix4(e.matrixWorld),this.union(Ia)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xs),Pa.subVectors(this.max,xs),yr.subVectors(e.a,xs),Mr.subVectors(e.b,xs),Sr.subVectors(e.c,xs),_i.subVectors(Mr,yr),vi.subVectors(Sr,Mr),Gi.subVectors(yr,Sr);let t=[0,-_i.z,_i.y,0,-vi.z,vi.y,0,-Gi.z,Gi.y,_i.z,0,-_i.x,vi.z,0,-vi.x,Gi.z,0,-Gi.x,-_i.y,_i.x,0,-vi.y,vi.x,0,-Gi.y,Gi.x,0];return!!Fl(t,yr,Mr,Sr,Pa)&&(t=[1,0,0,0,1,0,0,0,1],!!Fl(t,yr,Mr,Sr,Pa)&&(La.crossVectors(_i,vi),t=[La.x,La.y,La.z],Fl(t,yr,Mr,Sr,Pa)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(_n).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},qn=[new w,new w,new w,new w,new w,new w,new w,new w],_n=new w,Ia=new Ut,yr=new w,Mr=new w,Sr=new w,_i=new w,vi=new w,Gi=new w,xs=new w,Pa=new w,La=new w,Hi=new w;function Fl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Hi.fromArray(r,s);let o=i.x*Math.abs(Hi.x)+i.y*Math.abs(Hi.y)+i.z*Math.abs(Hi.z),l=e.dot(Hi),c=t.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var em=new Ut,ys=new w,Bl=new w,Ht=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):em.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);let t=ys.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(ys,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Bl)),this.expandByPoint(ys.copy(e.center).sub(Bl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Yn=new w,kl=new w,Na=new w,xi=new w,zl=new w,Da=new w,Gl=new w,Ti=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){kl.copy(e).add(t).multiplyScalar(.5),Na.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(kl);let s=.5*e.distanceTo(t),a=-this.direction.dot(Na),o=xi.dot(this.direction),l=-xi.dot(Na),c=xi.lengthSq(),h=Math.abs(1-a*a),u,d,p,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){let v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(kl).addScaledVector(Na,d),p}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);let n=Yn.dot(this.direction),i=Yn.dot(Yn)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i?null:((o>n||n!=n)&&(n=o),(l<i||i!=i)&&(i=l),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,n,i,s){zl.subVectors(t,e),Da.subVectors(n,e),Gl.crossVectors(zl,Da);let a,o=this.direction.dot(Gl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}xi.subVectors(this.origin,e);let l=a*this.direction.dot(Da.crossVectors(xi,Da));if(l<0)return null;let c=a*this.direction.dot(zl.cross(xi));if(c<0||l+c>o)return null;let h=-a*xi.dot(Gl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Le=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,d,p,m,v,g){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,p,m,v,g)}set(e,t,n,i,s,a,o,l,c,h,u,d,p,m,v,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/br.setFromMatrixColumn(e,0).length(),s=1/br.setFromMatrixColumn(e,1).length(),a=1/br.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,m=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+m*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=m+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,p=l*u,m=c*h,v=c*u;t[0]=d+v*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-m,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,p=l*u,m=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,p=a*u,m=o*h,v=o*u;t[0]=l*h,t[4]=m*c-p,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=p*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=m*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+m,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*l,p=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-m,t[2]=m*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tm,e,nm)}lookAt(e,t,n){let i=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),yi.crossVectors(n,Zt),yi.lengthSq()===0&&(Math.abs(n.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),yi.crossVectors(n,Zt)),yi.normalize(),Ua.crossVectors(Zt,yi),i[0]=yi.x,i[4]=Ua.x,i[8]=Zt.x,i[1]=yi.y,i[5]=Ua.y,i[9]=Zt.y,i[2]=yi.z,i[6]=Ua.z,i[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],m=n[2],v=n[6],g=n[10],f=n[14],_=n[3],x=n[7],y=n[11],b=n[15],A=i[0],L=i[4],U=i[8],N=i[12],k=i[1],B=i[5],O=i[9],j=i[13],G=i[2],q=i[6],K=i[10],Q=i[14],te=i[3],xe=i[7],we=i[11],Se=i[15];return s[0]=a*A+o*k+l*G+c*te,s[4]=a*L+o*B+l*q+c*xe,s[8]=a*U+o*O+l*K+c*we,s[12]=a*N+o*j+l*Q+c*Se,s[1]=h*A+u*k+d*G+p*te,s[5]=h*L+u*B+d*q+p*xe,s[9]=h*U+u*O+d*K+p*we,s[13]=h*N+u*j+d*Q+p*Se,s[2]=m*A+v*k+g*G+f*te,s[6]=m*L+v*B+g*q+f*xe,s[10]=m*U+v*O+g*K+f*we,s[14]=m*N+v*j+g*Q+f*Se,s[3]=_*A+x*k+y*G+b*te,s[7]=_*L+x*B+y*q+b*xe,s[11]=_*U+x*O+y*K+b*we,s[15]=_*N+x*j+y*Q+b*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*p-n*l*p)+e[7]*(+t*l*p-t*c*d+s*a*d-i*a*p+i*c*h-s*l*h)+e[11]*(+t*c*u-t*o*p-s*a*u+n*a*p+s*o*h-n*c*h)+e[15]*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],m=e[12],v=e[13],g=e[14],f=e[15],_=u*g*c-v*d*c+v*l*p-o*g*p-u*l*f+o*d*f,x=m*d*c-h*g*c-m*l*p+a*g*p+h*l*f-a*d*f,y=h*v*c-m*u*c+m*o*p-a*v*p-h*o*f+a*u*f,b=m*u*l-h*v*l-m*o*d+a*v*d+h*o*g-a*u*g,A=t*_+n*x+i*y+s*b;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/A;return e[0]=_*L,e[1]=(v*d*s-u*g*s-v*i*p+n*g*p+u*i*f-n*d*f)*L,e[2]=(o*g*s-v*l*s+v*i*c-n*g*c-o*i*f+n*l*f)*L,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*p-n*l*p)*L,e[4]=x*L,e[5]=(h*g*s-m*d*s+m*i*p-t*g*p-h*i*f+t*d*f)*L,e[6]=(m*l*s-a*g*s-m*i*c+t*g*c+a*i*f-t*l*f)*L,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*p+t*l*p)*L,e[8]=y*L,e[9]=(m*u*s-h*v*s-m*n*p+t*v*p+h*n*f-t*u*f)*L,e[10]=(a*v*s-m*o*s+m*n*c-t*v*c-a*n*f+t*o*f)*L,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*p-t*o*p)*L,e[12]=b*L,e[13]=(h*v*i-m*u*i+m*n*d-t*v*d-h*n*g+t*u*g)*L,e[14]=(m*o*i-a*v*i-m*n*l+t*v*l+a*n*g-t*o*g)*L,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*L,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,p=s*h,m=s*u,v=a*h,g=a*u,f=o*u,_=l*c,x=l*h,y=l*u,b=n.x,A=n.y,L=n.z;return i[0]=(1-(v+f))*b,i[1]=(p+y)*b,i[2]=(m-x)*b,i[3]=0,i[4]=(p-y)*A,i[5]=(1-(d+f))*A,i[6]=(g+_)*A,i[7]=0,i[8]=(m+x)*L,i[9]=(g-_)*L,i[10]=(1-(d+v))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=br.set(i[0],i[1],i[2]).length(),a=br.set(i[4],i[5],i[6]).length(),o=br.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],vn.copy(this);let l=1/s,c=1/a,h=1/o;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=c,vn.elements[5]*=c,vn.elements[6]*=c,vn.elements[8]*=h,vn.elements[9]*=h,vn.elements[10]*=h,t.setFromRotationMatrix(vn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),m,v;if(l)m=s/(a-s),v=a*s/(a-s);else if(o===ii)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==Ls)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),v=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),m,v;if(l)m=1/(a-s),v=a/(a-s);else if(o===ii)m=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==Ls)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),v=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},br=new w,vn=new Le,tm=new w(0,0,0),nm=new w(1,1,1),yi=new w,Ua=new w,Zt=new w,Yu=new Le,Zu=new qt,Mn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zu.setFromEuler(this),this.setFromQuaternion(Zu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mn.DEFAULT_ORDER="XYZ";var Br=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},im=0,Ku=new w,Tr=new qt,Zn=new Le,Oa=new w,Ms=new w,rm=new w,sm=new qt,Ju=new w(1,0,0),$u=new w(0,1,0),Qu=new w(0,0,1),ed={type:"added"},am={type:"removed"},wr={type:"childadded",child:null},Hl={type:"childremoved",child:null},ft=class r extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=an(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new Mn,n=new qt,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ge}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.multiply(Tr),this}rotateOnWorldAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.premultiply(Tr),this}rotateX(e){return this.rotateOnAxis(Ju,e)}rotateY(e){return this.rotateOnAxis($u,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ju,e)}translateY(e){return this.translateOnAxis($u,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oa.copy(e):Oa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Ms,Oa,this.up):Zn.lookAt(Oa,Ms,this.up),this.quaternion.setFromRotationMatrix(Zn),i&&(Zn.extractRotation(i.matrixWorld),Tr.setFromRotationMatrix(Zn),this.quaternion.premultiply(Tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ed),wr.child=e,this.dispatchEvent(wr),wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(am),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ed),wr.child=e,this.dispatchEvent(wr),wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,sm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};ft.DEFAULT_UP=new w(0,1,0),ft.DEFAULT_MATRIX_AUTO_UPDATE=!0,ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=new w,Kn=new w,Vl=new w,Jn=new w,Er=new w,Ar=new w,td=new w,Wl=new w,Xl=new w,jl=new w,ql=new nt,Yl=new nt,Zl=new nt,Qn=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),xn.subVectors(e,t),i.cross(xn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){xn.subVectors(i,t),Kn.subVectors(n,t),Vl.subVectors(e,t);let a=xn.dot(xn),o=xn.dot(Kn),l=xn.dot(Vl),c=Kn.dot(Kn),h=Kn.dot(Vl),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-p-m,m,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Jn)!==null&&Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return ql.setScalar(0),Yl.setScalar(0),Zl.setScalar(0),ql.fromBufferAttribute(e,t),Yl.fromBufferAttribute(e,n),Zl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(ql,s.x),a.addScaledVector(Yl,s.y),a.addScaledVector(Zl,s.z),a}static isFrontFacing(e,t,n,i){return xn.subVectors(n,t),Kn.subVectors(e,t),xn.cross(Kn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),.5*xn.cross(Kn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Er.subVectors(i,n),Ar.subVectors(s,n),Wl.subVectors(e,n);let l=Er.dot(Wl),c=Ar.dot(Wl);if(l<=0&&c<=0)return t.copy(n);Xl.subVectors(e,i);let h=Er.dot(Xl),u=Ar.dot(Xl);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Er,a);jl.subVectors(e,s);let p=Er.dot(jl),m=Ar.dot(jl);if(m>=0&&p<=m)return t.copy(s);let v=p*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Ar,o);let g=h*m-p*u;if(g<=0&&u-h>=0&&p-m>=0)return td.subVectors(s,i),o=(u-h)/(u-h+(p-m)),t.copy(i).addScaledVector(td,o);let f=1/(g+v+d);return a=v*f,o=d*f,t.copy(n).addScaledVector(Er,a).addScaledVector(Ar,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Fa={h:0,s:0,l:0};function Kl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Re=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=mc(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Kl(a,s,e+1/3),this.g=Kl(a,s,e),this.b=Kl(a,s,e-1/3)}return $e.colorSpaceToWorking(this,i),this}setStyle(e,t=ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ot){let n=Ep[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=Nr(e.r),this.g=Nr(e.g),this.b=Nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ot){return $e.workingToColorSpace(Ft.copy(this),e),65536*Math.round(Ve(255*Ft.r,0,255))+256*Math.round(Ve(255*Ft.g,0,255))+Math.round(Ve(255*Ft.b,0,255))}getHexString(e=ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Ft.copy(this),t);let n=Ft.r,i=Ft.g,s=Ft.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=ot){$e.workingToColorSpace(Ft.copy(this),e);let t=Ft.r,n=Ft.g,i=Ft.b;return e!==ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(Fa);let n=Rs(Mi.h,Fa.h,t),i=Rs(Mi.s,Fa.s,t),s=Rs(Mi.l,Fa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ft=new Re;Re.NAMES=Ep;var om=0,Yt=class extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=an(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bt=class extends Yt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},F0=lm();function lm(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,i[l]=24,i[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,i[l]=-c-1,i[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,i[l]=13,i[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,i[l]=24,i[256|l]=24):(n[l]=31744,n[256|l]=64512,i[l]=13,i[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var St=new w,Ba=new ie,cm=0,Tt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oo,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==oo&&(e.usage=this.usage),e}};var Ds=class extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Us=class extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var De=class extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}},hm=0,rn=new Le,Jl=new ft,Rr=new w,Kt=new Ut,Ss=new Ut,Pt=new w,rt=class r extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=an(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?Us:Ds)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,n){return rn.makeTranslation(e,t,n),this.applyMatrix4(rn),this}scale(e,t,n){return rn.makeScale(e,t,n),this.applyMatrix4(rn),this}lookAt(e){return Jl.lookAt(e),Jl.updateMatrix(),this.applyMatrix4(Jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ut);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Kt.setFromBufferAttribute(s),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ht);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Ss.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(Kt.min,Ss.min),Kt.expandByPoint(Pt),Pt.addVectors(Kt.max,Ss.max),Kt.expandByPoint(Pt)):(Kt.expandByPoint(Ss.min),Kt.expandByPoint(Ss.max))}Kt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Pt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Pt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Pt.fromBufferAttribute(o,c),l&&(Rr.fromBufferAttribute(e,c),Pt.add(Rr)),i=Math.max(i,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new w,l[U]=new w;let c=new w,h=new w,u=new w,d=new ie,p=new ie,m=new ie,v=new w,g=new w;function f(U,N,k){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,k),d.fromBufferAttribute(s,U),p.fromBufferAttribute(s,N),m.fromBufferAttribute(s,k),h.sub(c),u.sub(c),p.sub(d),m.sub(d);let B=1/(p.x*m.y-m.x*p.y);isFinite(B)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-p.y).multiplyScalar(B),g.copy(u).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(B),o[U].add(v),o[N].add(v),o[k].add(v),l[U].add(g),l[N].add(g),l[k].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let U=0,N=_.length;U<N;++U){let k=_[U],B=k.start;for(let O=B,j=B+k.count;O<j;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let x=new w,y=new w,b=new w,A=new w;function L(U){b.fromBufferAttribute(i,U),A.copy(b);let N=o[U];x.copy(N),x.sub(b.multiplyScalar(b.dot(N))).normalize(),y.crossVectors(A,N);let k=y.dot(l[U])<0?-1:1;a.setXYZW(U,x.x,x.y,x.z,k)}for(let U=0,N=_.length;U<N;++U){let k=_[U],B=k.start;for(let O=B,j=B+k.count;O<j;O+=3)L(e.getX(O+0)),L(e.getX(O+1)),L(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,l=new w,c=new w,h=new w,u=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){let m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,m=0;for(let v=0,g=l.length;v<g;v++){p=o.isInterleavedBufferAttribute?l[v]*o.data.stride+o.offset:l[v]*h;for(let f=0;f<h;f++)d[m++]=c[p++]}return new Tt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=e(i[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nd=new Le,Vi=new Ti,ka=new Ht,id=new w,za=new w,Ga=new w,Ha=new w,$l=new w,Va=new w,rd=new w,Wa=new w,ut=class extends ft{constructor(e=new rt,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Va.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&($l.fromBufferAttribute(u,e),a?Va.addScaledVector($l,h):Va.addScaledVector($l.sub(t),h))}t.add(Va)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(s),Vi.copy(e.ray).recast(e.near),ka.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(ka,id)===null||Vi.origin.distanceToSquared(id)>(e.far-e.near)**2))return;nd.copy(s).invert(),Vi.copy(e.ray).applyMatrix4(nd),n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Vi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){let g=d[m],f=a[g.materialIndex];for(let _=Math.max(g.start,p.start),x=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));_<x;_+=3)i=Xa(this,f,e,n,c,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}else for(let m=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);m<v;m+=3)i=Xa(this,a,e,n,c,h,u,o.getX(m),o.getX(m+1),o.getX(m+2)),i&&(i.faceIndex=Math.floor(m/3),t.push(i));else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){let g=d[m],f=a[g.materialIndex];for(let _=Math.max(g.start,p.start),x=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));_<x;_+=3)i=Xa(this,f,e,n,c,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}else for(let m=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);m<v;m+=3)i=Xa(this,a,e,n,c,h,u,m,m+1,m+2),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}};function Xa(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,za),r.getVertexPosition(l,Ga),r.getVertexPosition(c,Ha);let h=(function(u,d,p,m,v,g,f,_){let x;if(x=d.side===1?m.intersectTriangle(f,g,v,!0,_):m.intersectTriangle(v,g,f,d.side===0,_),x===null)return null;Wa.copy(_),Wa.applyMatrix4(u.matrixWorld);let y=p.ray.origin.distanceTo(Wa);return y<p.near||y>p.far?null:{distance:y,point:Wa.clone(),object:u}})(r,e,t,n,za,Ga,Ha,rd);if(h){let u=new w;Qn.getBarycoord(rd,za,Ga,Ha,u),i&&(h.uv=Qn.getInterpolatedAttribute(i,o,l,c,u,new ie)),s&&(h.uv1=Qn.getInterpolatedAttribute(s,o,l,c,u,new ie)),a&&(h.normal=Qn.getInterpolatedAttribute(a,o,l,c,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new w,materialIndex:0};Qn.getNormal(za,Ga,Ha,d.normal),h.face=d,h.barycoord=u}return h}var Ln=class r extends rt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;function m(v,g,f,_,x,y,b,A,L,U,N){let k=y/L,B=b/U,O=y/2,j=b/2,G=A/2,q=L+1,K=U+1,Q=0,te=0,xe=new w;for(let we=0;we<K;we++){let Se=we*B-j;for(let Ne=0;Ne<q;Ne++){let re=Ne*k-O;xe[v]=re*_,xe[g]=Se*x,xe[f]=G,c.push(xe.x,xe.y,xe.z),xe[v]=0,xe[g]=0,xe[f]=A>0?1:-1,h.push(xe.x,xe.y,xe.z),u.push(Ne/L),u.push(1-we/U),Q+=1}}for(let we=0;we<U;we++)for(let Se=0;Se<L;Se++){let Ne=d+Se+q*we,re=d+Se+q*(we+1),le=d+(Se+1)+q*(we+1),oe=d+(Se+1)+q*we;l.push(Ne,re,oe),l.push(re,le,oe),te+=6}o.addGroup(p,te,N),p+=te,d+=Q}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(h,3)),this.setAttribute("uv",new De(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function or(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function kt(r){let e={};for(let t=0;t<r.length;t++){let n=or(r[t]);for(let i in n)e[i]=n[i]}return e}function _h(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}var Ap={clone:or,merge:kt},Sn=class extends Yt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},kr=class extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Si=new w,sd=new ie,ad=new ie,bt=class extends kr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Yi*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Lr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Yi*Math.atan(Math.tan(.5*Lr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,sd,ad),t.subVectors(ad,sd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Lr*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Cr=-90,uo=class extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new bt(Cr,1,e,t);i.layers=this.layers,this.add(i);let s=new bt(Cr,1,e,t);s.layers=this.layers,this.add(s);let a=new bt(Cr,1,e,t);a.layers=this.layers,this.add(a);let o=new bt(Cr,1,e,t);o.layers=this.layers,this.add(o);let l=new bt(Cr,1,e,t);l.layers=this.layers,this.add(l);let c=new bt(Cr,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==Ls)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Os=class extends Rt{constructor(e=[],t=301,n,i,s,a,o,l,c,h){super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},po=class extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Os(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ln(5,5,5),s=new Sn({name:"CubemapFromEquirect",uniforms:or(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ut(i,s),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=jt),new uo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Gt=class extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},um={type:"move"},zr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(um)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Fs=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Bs=class extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Gr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oo,this.updateRanges=[],this.version=0,this.uuid=an()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},zt=new w,Hr=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var B0=new w,k0=new w,z0=new w,G0=new ie,H0=new ie,V0=new Le,W0=new w,X0=new w,j0=new w,q0=new ie,Y0=new ie,Z0=new ie;var K0=new w,J0=new w;var od=new w,ld=new nt,cd=new nt,dm=new w,hd=new Le,ja=new w,Ql=new Ht,ud=new Le,ec=new Ti,ks=class extends ut{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uc,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ut),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ja),this.boundingBox.expandByPoint(ja)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ht),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ja),this.boundingSphere.expandByPoint(ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ql.copy(this.boundingSphere),Ql.applyMatrix4(i),e.ray.intersectsSphere(Ql)!==!1&&(ud.copy(i).invert(),ec.copy(e.ray).applyMatrix4(ud),this.boundingBox!==null&&ec.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,ec)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;ld.fromBufferAttribute(i.attributes.skinIndex,e),cd.fromBufferAttribute(i.attributes.skinWeight,e),od.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=cd.getComponent(s);if(a!==0){let o=ld.getComponent(s);hd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(dm.copy(od).applyMatrix4(hd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Vr=class extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}},zs=class extends Rt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=1003,h=1003,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},dd=new Le,pm=new Le,Gs=class r{constructor(e=[],t=[]){this.uuid=an(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:pm;dd.multiplyMatrices(o,t[s]),dd.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new zs(t,e,e,un,hn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Vr),this.bones.push(a),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},wi=class extends Tt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ir=new Le,pd=new Le,qa=[],fd=new Ut,fm=new Le,bs=new ut,Ts=new Ht,Hs=class extends ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wi(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,fm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ut),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ir),fd.copy(e.boundingBox).applyMatrix4(Ir),this.boundingBox.union(fd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ht),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ir),Ts.copy(e.boundingSphere).applyMatrix4(Ir),this.boundingSphere.union(Ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(bs.geometry=this.geometry,bs.material=this.material,bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),e.ray.intersectsSphere(Ts)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ir),pd.multiplyMatrices(n,Ir),bs.matrixWorld=pd,bs.raycast(e,qa);for(let a=0,o=qa.length;a<o;a++){let l=qa[a];l.instanceId=s,l.object=this,t.push(l)}qa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new wi(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new zs(new Float32Array(i*this.count),i,this.count,sl,hn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},tc=new w,mm=new w,gm=new Ge,sn=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=tc.subVectors(n,t).cross(mm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(tc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||gm.getNormalMatrix(e),i=this.coplanarPoint(tc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Wi=new Ht,_m=new ie(.5,.5),Ya=new w,Ei=class{constructor(e=new sn,t=new sn,n=new sn,i=new sn,s=new sn,a=new sn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],p=s[7],m=s[8],v=s[9],g=s[10],f=s[11],_=s[12],x=s[13],y=s[14],b=s[15];if(i[0].setComponents(c-a,p-h,f-m,b-_).normalize(),i[1].setComponents(c+a,p+h,f+m,b+_).normalize(),i[2].setComponents(c+o,p+u,f+v,b+x).normalize(),i[3].setComponents(c-o,p-u,f-v,b-x).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,p-d,f-g,b-y).normalize();else if(i[4].setComponents(c-l,p-d,f-g,b-y).normalize(),t===ii)i[5].setComponents(c+l,p+d,f+g,b+y).normalize();else{if(t!==Ls)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(l,d,g,y).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);let t=_m.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ya.x=i.normal.x>0?e.max.x:e.min.x,Ya.y=i.normal.y>0?e.max.y:e.min.y,Ya.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},An=new Le,Rn=new Ei,fo=class r{constructor(){this.coordinateSystem=ii}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Rn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Rn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Rn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Rn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Rn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Rn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Rn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Rn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Rn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Rn.containsPoint(e))return!0}return!1}clone(){return new r}};var gc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},$0=new Le,Q0=new Re(1,1,1),e_=new Ei,t_=new fo,n_=new Ut,i_=new Ht,r_=new w,s_=new w,a_=new w,o_=new gc,l_=new ut;var si=class extends Yt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},mo=new w,go=new w,md=new Le,ws=new Ti,Za=new Ht,nc=new w,gd=new w,Nn=class extends ft{constructor(e=new rt,t=new si){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)mo.fromBufferAttribute(t,i-1),go.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=mo.distanceTo(go);e.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Za.copy(n.boundingSphere),Za.applyMatrix4(i),Za.radius+=s,e.ray.intersectsSphere(Za)===!1)return;md.copy(i).invert(),ws.copy(e.ray).applyMatrix4(md);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let m=d,v=p-1;m<v;m+=c){let g=h.getX(m),f=h.getX(m+1),_=Ka(this,e,ws,l,g,f,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(p-1),v=h.getX(d),g=Ka(this,e,ws,l,m,v,p-1);g&&t.push(g)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let m=d,v=p-1;m<v;m+=c){let g=Ka(this,e,ws,l,m,m+1,m);g&&t.push(g)}if(this.isLineLoop){let m=Ka(this,e,ws,l,p-1,d,p-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Ka(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(mo.fromBufferAttribute(o,i),go.fromBufferAttribute(o,s),t.distanceSqToSegment(mo,go,nc,gd)>n)return;nc.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(nc);return l<e.near||l>e.far?void 0:{distance:l,point:gd.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var _d=new w,vd=new w,Vs=class extends Nn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)_d.fromBufferAttribute(t,i),vd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+_d.distanceTo(vd);e.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ws=class extends Nn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Wr=class extends Yt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xd=new Le,_c=new Ti,Ja=new Ht,$a=new w,Xs=class extends ft{constructor(e=new rt,t=new Wr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(i),Ja.radius+=s,e.ray.intersectsSphere(Ja)===!1)return;xd.copy(i).invert(),_c.copy(e.ray).applyMatrix4(xd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);u<d;u++){let p=c.getX(u);$a.fromBufferAttribute(h,p),yd($a,p,l,i,e,t,this)}else for(let u=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);u<d;u++)$a.fromBufferAttribute(h,u),yd($a,u,l,i,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function yd(r,e,t,n,i,s,a){let o=_c.distanceSqToPoint(r);if(o<t){let l=new w;_c.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var on=class extends Rt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},js=class extends Rt{constructor(e,t,n=1014,i,s,a,o=1003,l=1003,c,h=1026,u=1){if(h!==fa&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},qs=class extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},_o=class r extends rt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,m=2*n+s,v=i+1,g=new w,f=new w;for(let _=0;_<=m;_++){let x=0,y=0,b=0,A=0;if(_<=n){let N=_/n,k=N*Math.PI/2;y=-h-e*Math.cos(k),b=e*Math.sin(k),A=-e*Math.cos(k),x=N*u}else if(_<=n+s){let N=(_-n)/s;y=N*t-h,b=e,A=0,x=u+N*d}else{let N=(_-n-s)/n,k=N*Math.PI/2;y=h+e*Math.sin(k),b=e*Math.cos(k),A=e*Math.sin(k),x=u+d+N*u}let L=Math.max(0,Math.min(1,x/p)),U=0;_===0?U=.5/i:_===m&&(U=-.5/i);for(let N=0;N<=i;N++){let k=N/i,B=k*Math.PI*2,O=Math.sin(B),j=Math.cos(B);f.x=-b*j,f.y=y,f.z=b*O,o.push(f.x,f.y,f.z),g.set(-b*j,A,b*O),g.normalize(),l.push(g.x,g.y,g.z),c.push(k+U,L)}if(_>0){let N=(_-1)*v;for(let k=0;k<i;k++){let B=N+k,O=N+k+1,j=_*v+k,G=_*v+k+1;a.push(B,O,j),a.push(O,G,j)}}}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Zi=class r extends rt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new w,h=new ie;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("normal",new De(o,3)),this.setAttribute("uv",new De(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Dn=class r extends rt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],m=0,v=[],g=n/2,f=0;function _(x){let y=m,b=new ie,A=new w,L=0,U=x===!0?e:t,N=x===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,g*N,0),d.push(0,N,0),p.push(.5,.5),m++;let k=m;for(let B=0;B<=i;B++){let O=B/i*l+o,j=Math.cos(O),G=Math.sin(O);A.x=U*G,A.y=g*N,A.z=U*j,u.push(A.x,A.y,A.z),d.push(0,N,0),b.x=.5*j+.5,b.y=.5*G*N+.5,p.push(b.x,b.y),m++}for(let B=0;B<i;B++){let O=y+B,j=k+B;x===!0?h.push(j,j+1,O):h.push(j+1,j,O),L+=3}c.addGroup(f,L,x===!0?1:2),f+=L}(function(){let x=new w,y=new w,b=0,A=(t-e)/n;for(let L=0;L<=s;L++){let U=[],N=L/s,k=N*(t-e)+e;for(let B=0;B<=i;B++){let O=B/i,j=O*l+o,G=Math.sin(j),q=Math.cos(j);y.x=k*G,y.y=-N*n+g,y.z=k*q,u.push(y.x,y.y,y.z),x.set(G,A,q).normalize(),d.push(x.x,x.y,x.z),p.push(O,1-N),U.push(m++)}v.push(U)}for(let L=0;L<i;L++)for(let U=0;U<s;U++){let N=v[U][L],k=v[U+1][L],B=v[U+1][L+1],O=v[U][L+1];(e>0||U!==0)&&(h.push(N,k,O),b+=3),(t>0||U!==s-1)&&(h.push(k,B,O),b+=3)}c.addGroup(f,b,0),f+=b})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(d,3)),this.setAttribute("uv",new De(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},vo=class r extends Dn{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ai=class r extends rt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(p,m,v,g){let f=g+1,_=[];for(let x=0;x<=f;x++){_[x]=[];let y=p.clone().lerp(v,x/f),b=m.clone().lerp(v,x/f),A=f-x;for(let L=0;L<=A;L++)_[x][L]=L===0&&x===f?y:y.clone().lerp(b,L/A)}for(let x=0;x<f;x++)for(let y=0;y<2*(f-x)-1;y++){let b=Math.floor(y/2);y%2==0?(l(_[x][b+1]),l(_[x+1][b]),l(_[x][b])):(l(_[x][b+1]),l(_[x+1][b+1]),l(_[x+1][b]))}}function l(p){s.push(p.x,p.y,p.z)}function c(p,m){let v=3*p;m.x=e[v+0],m.y=e[v+1],m.z=e[v+2]}function h(p,m,v,g){g<0&&p.x===1&&(a[m]=p.x-1),v.x===0&&v.z===0&&(a[m]=g/2/Math.PI+.5)}function u(p){return Math.atan2(p.z,-p.x)}function d(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let m=new w,v=new w,g=new w;for(let f=0;f<t.length;f+=3)c(t[f+0],m),c(t[f+1],v),c(t[f+2],g),o(m,v,g,p)})(i),(function(p){let m=new w;for(let v=0;v<s.length;v+=3)m.x=s[v+0],m.y=s[v+1],m.z=s[v+2],m.normalize().multiplyScalar(p),s[v+0]=m.x,s[v+1]=m.y,s[v+2]=m.z})(n),(function(){let p=new w;for(let m=0;m<s.length;m+=3){p.x=s[m+0],p.y=s[m+1],p.z=s[m+2];let v=u(p)/2/Math.PI+.5,g=d(p)/Math.PI+.5;a.push(v,1-g)}(function(){let m=new w,v=new w,g=new w,f=new w,_=new ie,x=new ie,y=new ie;for(let b=0,A=0;b<s.length;b+=9,A+=6){m.set(s[b+0],s[b+1],s[b+2]),v.set(s[b+3],s[b+4],s[b+5]),g.set(s[b+6],s[b+7],s[b+8]),_.set(a[A+0],a[A+1]),x.set(a[A+2],a[A+3]),y.set(a[A+4],a[A+5]),f.copy(m).add(v).add(g).divideScalar(3);let L=u(f);h(_,A+0,m,L),h(x,A+2,v,L),h(y,A+4,g,L)}})(),(function(){for(let m=0;m<a.length;m+=6){let v=a[m+0],g=a[m+2],f=a[m+4],_=Math.max(v,g,f),x=Math.min(v,g,f);_>.9&&x<.1&&(v<.2&&(a[m+0]+=1),g<.2&&(a[m+2]+=1),f<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new De(s,3)),this.setAttribute("normal",new De(s.slice(),3)),this.setAttribute("uv",new De(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},xo=class r extends Ai{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Qa=new w,eo=new w,ic=new w,to=new Qn,yo=class extends rt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Lr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:v,b:g,c:f}=to;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),to.getNormal(ic),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let x=(_+1)%3,y=u[_],b=u[x],A=to[h[_]],L=to[h[x]],U=`${y}_${b}`,N=`${b}_${y}`;N in d&&d[N]?(ic.dot(d[N].normal)<=s&&(p.push(A.x,A.y,A.z),p.push(L.x,L.y,L.z)),d[N]=null):U in d||(d[U]={index0:c[_],index1:c[x],normal:ic.clone()})}}for(let m in d)if(d[m]){let{index0:v,index1:g}=d[m];Qa.fromBufferAttribute(o,v),eo.fromBufferAttribute(o,g),p.push(Qa.x,Qa.y,Qa.z),p.push(eo.x,eo.y,eo.z)}this.setAttribute("position",new De(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Qt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(i=Math.floor(l+(c-l)/2),o=n[i]-a,o<0)l=i+1;else{if(!(o>0)){c=i;break}c=i-1}if(i=c,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new ie:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,l=new Le;for(let p=0;p<=e;p++){let m=p/e;i[p]=this.getTangentAt(m,new w)}s[0]=new w,a[0]=new w;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Ve(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,m))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(Ve(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],p*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Xr=class extends Qt{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ie){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Mo=class extends Xr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vh(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var no=new w,rc=new vh,sc=new vh,ac=new vh,So=class extends Qt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=i[(c-1)%s]:(no.subVectors(i[0],i[1]).add(i[0]),o=no);let u=i[c%s],d=i[(c+1)%s];if(this.closed||c+2<s?l=i[(c+2)%s]:(no.subVectors(i[s-1],i[s-2]).add(i[s-1]),l=no),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),g=Math.pow(d.distanceToSquared(l),p);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),rc.initNonuniformCatmullRom(o.x,u.x,d.x,l.x,m,v,g),sc.initNonuniformCatmullRom(o.y,u.y,d.y,l.y,m,v,g),ac.initNonuniformCatmullRom(o.z,u.z,d.z,l.z,m,v,g)}else this.curveType==="catmullrom"&&(rc.initCatmullRom(o.x,u.x,d.x,l.x,this.tension),sc.initCatmullRom(o.y,u.y,d.y,l.y,this.tension),ac.initCatmullRom(o.z,u.z,d.z,l.z,this.tension));return n.set(rc.calc(h),sc.calc(h),ac.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Md(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Cs(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Is(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Ys=class extends Qt{constructor(e=new ie,t=new ie,n=new ie,i=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ie){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Is(e,i.x,s.x,a.x,o.x),Is(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},bo=class extends Qt{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Is(e,i.x,s.x,a.x,o.x),Is(e,i.y,s.y,a.y,o.y),Is(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Zs=class extends Qt{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},To=class extends Qt{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ks=class extends Qt{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Cs(e,i.x,s.x,a.x),Cs(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Js=class extends Qt{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Cs(e,i.x,s.x,a.x),Cs(e,i.y,s.y,a.y),Cs(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$s=class extends Qt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Md(o,l.x,c.x,h.x,u.x),Md(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ie().fromArray(i))}return this}},wo=Object.freeze({__proto__:null,ArcCurve:Mo,CatmullRomCurve3:So,CubicBezierCurve:Ys,CubicBezierCurve3:bo,EllipseCurve:Xr,LineCurve:Zs,LineCurve3:To,QuadraticBezierCurve:Ks,QuadraticBezierCurve3:Js,SplineCurve:$s}),Eo=class extends Qt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new wo[i.type]().fromJSON(i))}return this}},Qs=class extends Eo{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Zs(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Ks(this.currentPoint.clone(),new ie(e,t),new ie(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Ys(this.currentPoint.clone(),new ie(e,t),new ie(n,i),new ie(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new $s(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new Xr(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ki=class extends Qs{constructor(e){super(e),this.uuid=an(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Qs().fromJSON(i))}return this}};function vm(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Sd(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,u,d,p){let m=[];for(let v=0,g=u.length;v<g;v++){let f=Sd(h,u[v]*p,v<g-1?u[v+1]*p:h.length,p,!1);f===f.next&&(f.steiner=!0),m.push(Em(f))}m.sort(bm);for(let v=0;v<m.length;v++)d=Tm(m[v],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let p=r[d],m=r[d+1];p<o&&(o=p),m<l&&(l=m),p>h&&(h=p),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return ea(s,a,t,o,l,c,0),a}function Sd(r,e,t,n,i){let s;if(i===(function(a,o,l,c){let h=0;for(let u=o,d=l-c;u<l;u+=c)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=bd(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=bd(a/n|0,r[a],r[a+1],s);return s&&jr(s,s.next)&&(na(s),s=s.next),s}function Ji(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!jr(n,n.next)&&vt(n.prev,n,n.next)!==0)n=n.next;else{if(na(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ea(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(l,c,h,u){let d=l;do d.z===0&&(d.z=vc(d.x,d.y,c,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==l);d.prevZ.nextZ=null,d.prevZ=null,(function(p){let m,v=1;do{let g,f=p;p=null;let _=null;for(m=0;f;){m++;let x=f,y=0;for(let A=0;A<v&&(y++,x=x.nextZ,x);A++);let b=v;for(;y>0||b>0&&x;)y!==0&&(b===0||!x||f.z<=x.z)?(g=f,f=f.nextZ,y--):(g=x,x=x.nextZ,b--),_?_.nextZ=g:p=g,g.prevZ=_,_=g;f=x}_.nextZ=null,v*=2}while(m>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?ym(r,n,i,s):xm(r))e.push(l.i,r.i,c.i),na(r),r=c.next,o=c.next;else if((r=c)===o){a?a===1?ea(r=Mm(Ji(r),e),e,t,n,i,s,2):a===2&&Sm(r,e,t,n,i,s):ea(Ji(r),e,t,n,i,s,1);break}}}function xm(r){let e=r.prev,t=r,n=r.next;if(vt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,s,a),u=Math.min(o,l,c),d=Math.max(i,s,a),p=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=p&&As(i,o,s,l,a,c,m.x,m.y)&&vt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ym(r,e,t,n){let i=r.prev,s=r,a=r.next;if(vt(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,p=Math.min(o,l,c),m=Math.min(h,u,d),v=Math.max(o,l,c),g=Math.max(h,u,d),f=vc(p,m,e,t,n),_=vc(v,g,e,t,n),x=r.prevZ,y=r.nextZ;for(;x&&x.z>=f&&y&&y.z<=_;){if(x.x>=p&&x.x<=v&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&As(o,h,l,u,c,d,x.x,x.y)&&vt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=p&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&As(o,h,l,u,c,d,y.x,y.y)&&vt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=f;){if(x.x>=p&&x.x<=v&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&As(o,h,l,u,c,d,x.x,x.y)&&vt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=_;){if(y.x>=p&&y.x<=v&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&As(o,h,l,u,c,d,y.x,y.y)&&vt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Mm(r,e){let t=r;do{let n=t.prev,i=t.next.next;!jr(n,i)&&Cp(n,t,t.next,i)&&ta(n,i)&&ta(i,n)&&(e.push(n.i,t.i,i.i),na(t),na(t.next),t=r=i),t=t.next}while(t!==r);return Ji(t)}function Sm(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Am(a,o)){let l=Ip(a,o);return a=Ji(a,a.next),l=Ji(l,l.next),ea(a,e,t,n,i,s,0),void ea(l,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function bm(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Tm(r,e){let t=(function(i,s){let a=s,o=i.x,l=i.y,c,h=-1/0;if(jr(i,a))return a;do{if(jr(i,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let v=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,c=a.x<a.next.x?a:a.next,v===o))return c}a=a.next}while(a!==s);if(!c)return null;let u=c,d=c.x,p=c.y,m=1/0;a=c;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Rp(l<p?o:h,l,d,p,l<p?h:o,l,a.x,a.y)){let v=Math.abs(l-a.y)/(o-a.x);ta(a,i)&&(v<m||v===m&&(a.x>c.x||a.x===c.x&&wm(c,a)))&&(c=a,m=v)}a=a.next}while(a!==u);return c})(r,e);if(!t)return e;let n=Ip(t,r);return Ji(n,n.next),Ji(t,t.next)}function wm(r,e){return vt(r.prev,r,e.prev)<0&&vt(e.next,r,r.next)<0}function vc(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Em(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Rp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function As(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Rp(r,e,t,n,i,s,a,o)}function Am(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Cp(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(ta(r,e)&&ta(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(vt(r.prev,r,e.prev)||vt(r,e.prev,e))||jr(r,e)&&vt(r.prev,r,r.next)>0&&vt(e.prev,e,e.next)>0)}function vt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function jr(r,e){return r.x===e.x&&r.y===e.y}function Cp(r,e,t,n){let i=ro(vt(r,e,t)),s=ro(vt(r,e,n)),a=ro(vt(t,n,r)),o=ro(vt(t,n,e));return i!==s&&a!==o||!(i!==0||!io(r,t,e))||!(s!==0||!io(r,n,e))||!(a!==0||!io(t,r,n))||!(o!==0||!io(t,e,n))}function io(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ro(r){return r>0?1:r<0?-1:0}function ta(r,e){return vt(r.prev,r,r.next)<0?vt(r,e,r.next)>=0&&vt(r,r.prev,e)>=0:vt(r,e,r.prev)<0||vt(r,r.next,e)<0}function Ip(r,e){let t=xc(r.i,r.x,r.y),n=xc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function bd(r,e,t,n){let i=xc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function na(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function xc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var yc=class{static triangulate(e,t,n=2){return vm(e,t,n)}},Cn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Td(e),wd(n,e);let a=e.length;t.forEach(Td);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,wd(n,t[l]);let o=yc.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Td(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function wd(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Ao=class r extends rt{constructor(e=new Ki([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,f=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Rm,x,y,b,A,L,U=!1;f&&(x=f.getSpacedPoints(h),U=!0,d=!1,y=f.computeFrenetFrames(h,!1),b=new w,A=new w,L=new w),d||(g=0,p=0,m=0,v=0);let N=o.extractPoints(c),k=N.shape,B=N.holes;if(!Cn.isClockWise(k)){k=k.reverse();for(let P=0,M=B.length;P<M;P++){let R=B[P];Cn.isClockWise(R)&&(B[P]=R.reverse())}}function O(P){let M=10000000000000001e-36,R=P[0];for(let D=1;D<=P.length;D++){let I=D%P.length,Z=P[I],z=Z.x-R.x,H=Z.y-R.y,ne=z*z+H*H,pe=Math.max(Math.abs(Z.x),Math.abs(Z.y),Math.abs(R.x),Math.abs(R.y));ne<=M*pe*pe?(P.splice(I,1),D--):R=Z}}O(k),B.forEach(O);let j=B.length,G=k;for(let P=0;P<j;P++){let M=B[P];k=k.concat(M)}function q(P,M,R){return M||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(M,R)}let K=k.length;function Q(P,M,R){let D,I,Z,z=P.x-M.x,H=P.y-M.y,ne=R.x-P.x,pe=R.y-P.y,se=z*z+H*H,_e=z*pe-H*ne;if(Math.abs(_e)>Number.EPSILON){let be=Math.sqrt(se),Ie=Math.sqrt(ne*ne+pe*pe),qe=M.x-H/be,et=M.y+z/be,tt=((R.x-pe/Ie-qe)*pe-(R.y+ne/Ie-et)*ne)/(z*pe-H*ne);D=qe+z*tt-P.x,I=et+H*tt-P.y;let fe=D*D+I*I;if(fe<=2)return new ie(D,I);Z=Math.sqrt(fe/2)}else{let be=!1;z>Number.EPSILON?ne>Number.EPSILON&&(be=!0):z<-Number.EPSILON?ne<-Number.EPSILON&&(be=!0):Math.sign(H)===Math.sign(pe)&&(be=!0),be?(D=-H,I=z,Z=Math.sqrt(se)):(D=z,I=H,Z=Math.sqrt(se/2))}return new ie(D/Z,I/Z)}let te=[];for(let P=0,M=G.length,R=M-1,D=P+1;P<M;P++,R++,D++)R===M&&(R=0),D===M&&(D=0),te[P]=Q(G[P],G[R],G[D]);let xe=[],we,Se,Ne=te.concat();for(let P=0,M=j;P<M;P++){let R=B[P];we=[];for(let D=0,I=R.length,Z=I-1,z=D+1;D<I;D++,Z++,z++)Z===I&&(Z=0),z===I&&(z=0),we[D]=Q(R[D],R[Z],R[z]);xe.push(we),Ne=Ne.concat(we)}if(g===0)Se=Cn.triangulateShape(G,B);else{let P=[],M=[];for(let R=0;R<g;R++){let D=R/g,I=p*Math.cos(D*Math.PI/2),Z=m*Math.sin(D*Math.PI/2)+v;for(let z=0,H=G.length;z<H;z++){let ne=q(G[z],te[z],Z);Ce(ne.x,ne.y,-I),D===0&&P.push(ne)}for(let z=0,H=j;z<H;z++){let ne=B[z];we=xe[z];let pe=[];for(let se=0,_e=ne.length;se<_e;se++){let be=q(ne[se],we[se],Z);Ce(be.x,be.y,-I),D===0&&pe.push(be)}D===0&&M.push(pe)}}Se=Cn.triangulateShape(P,M)}let re=Se.length,le=m+v;for(let P=0;P<K;P++){let M=d?q(k[P],Ne[P],le):k[P];U?(A.copy(y.normals[0]).multiplyScalar(M.x),b.copy(y.binormals[0]).multiplyScalar(M.y),L.copy(x[0]).add(A).add(b),Ce(L.x,L.y,L.z)):Ce(M.x,M.y,0)}for(let P=1;P<=h;P++)for(let M=0;M<K;M++){let R=d?q(k[M],Ne[M],le):k[M];U?(A.copy(y.normals[P]).multiplyScalar(R.x),b.copy(y.binormals[P]).multiplyScalar(R.y),L.copy(x[P]).add(A).add(b),Ce(L.x,L.y,L.z)):Ce(R.x,R.y,u/h*P)}for(let P=g-1;P>=0;P--){let M=P/g,R=p*Math.cos(M*Math.PI/2),D=m*Math.sin(M*Math.PI/2)+v;for(let I=0,Z=G.length;I<Z;I++){let z=q(G[I],te[I],D);Ce(z.x,z.y,u+R)}for(let I=0,Z=B.length;I<Z;I++){let z=B[I];we=xe[I];for(let H=0,ne=z.length;H<ne;H++){let pe=q(z[H],we[H],D);U?Ce(pe.x,pe.y+x[h-1].y,x[h-1].x+R):Ce(pe.x,pe.y,u+R)}}}function oe(P,M){let R=P.length;for(;--R>=0;){let D=R,I=R-1;I<0&&(I=P.length-1);for(let Z=0,z=h+2*g;Z<z;Z++){let H=K*Z,ne=K*(Z+1);T(M+D+H,M+I+H,M+I+ne,M+D+ne)}}}function Ce(P,M,R){l.push(P),l.push(M),l.push(R)}function ke(P,M,R){S(P),S(M),S(R);let D=i.length/3,I=_.generateTopUV(n,i,D-3,D-2,D-1);F(I[0]),F(I[1]),F(I[2])}function T(P,M,R,D){S(P),S(M),S(D),S(M),S(R),S(D);let I=i.length/3,Z=_.generateSideWallUV(n,i,I-6,I-3,I-2,I-1);F(Z[0]),F(Z[1]),F(Z[3]),F(Z[1]),F(Z[2]),F(Z[3])}function S(P){i.push(l[3*P+0]),i.push(l[3*P+1]),i.push(l[3*P+2])}function F(P){s.push(P.x),s.push(P.y)}(function(){let P=i.length/3;if(d){let M=0,R=K*M;for(let D=0;D<re;D++){let I=Se[D];ke(I[2]+R,I[1]+R,I[0]+R)}M=h+2*g,R=K*M;for(let D=0;D<re;D++){let I=Se[D];ke(I[0]+R,I[1]+R,I[2]+R)}}else{for(let M=0;M<re;M++){let R=Se[M];ke(R[2],R[1],R[0])}for(let M=0;M<re;M++){let R=Se[M];ke(R[0]+K*h,R[1]+K*h,R[2]+K*h)}}n.addGroup(P,i.length/3-P,0)})(),(function(){let P=i.length/3,M=0;oe(G,M),M+=G.length;for(let R=0,D=B.length;R<D;R++){let I=B[R];oe(I,M),M+=I.length}n.addGroup(P,i.length/3-P,1)})()}this.setAttribute("position",new De(i,3)),this.setAttribute("uv",new De(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new wo[i.type]().fromJSON(i)),new r(n,e.options)}},Rm={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*i],h=e[3*i+1];return[new ie(s,a),new ie(o,l),new ie(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],m=e[3*i+2],v=e[3*s],g=e[3*s+1],f=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new ie(a,1-l),new ie(c,1-u),new ie(d,1-m),new ie(v,1-f)]:[new ie(o,1-l),new ie(h,1-u),new ie(p,1-m),new ie(g,1-f)]}},Ro=class r extends Ai{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Co=class r extends rt{constructor(e=[new ie(0,-.5),new ie(.5,0),new ie(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ve(i,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new w,d=new ie,p=new w,m=new w,v=new w,g=0,f=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,f=e[_+1].y-e[_].y,p.x=1*f,p.y=-g,p.z=0*f,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[_+1].x-e[_].x,f=e[_+1].y-e[_].y,p.x=1*f,p.y=-g,p.z=0*f,m.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(m)}for(let _=0;_<=t;_++){let x=n+_*h*i,y=Math.sin(x),b=Math.cos(x);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*y,u.y=e[A].y,u.z=e[A].x*b,a.push(u.x,u.y,u.z),d.x=_/t,d.y=A/(e.length-1),o.push(d.x,d.y);let L=l[3*A+0]*y,U=l[3*A+1],N=l[3*A+0]*b;c.push(L,U,N)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){let y=x+_*e.length,b=y,A=y+e.length,L=y+e.length+1,U=y+1;s.push(b,A,U),s.push(L,U,A)}this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("uv",new De(o,2)),this.setAttribute("normal",new De(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Io=class r extends Ai{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},ln=class r extends rt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,p=[],m=[],v=[],g=[];for(let f=0;f<h;f++){let _=f*d-a;for(let x=0;x<c;x++){let y=x*u-s;m.push(y,-_,0),v.push(0,0,1),g.push(x/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<o;_++){let x=_+c*f,y=_+c*(f+1),b=_+1+c*(f+1),A=_+1+c*f;p.push(x,y,A),p.push(y,b,A)}this.setIndex(p),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Po=class r extends rt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new w,m=new ie;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){let f=s+g/n*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let v=0;v<i;v++){let g=v*(n+1);for(let f=0;f<n;f++){let _=f+g,x=_,y=_+n+1,b=_+n+2,A=_+1;o.push(x,y,A),o.push(y,b,A)}}this.setIndex(o),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},qr=class r extends rt{constructor(e=new Ki([new ie(0,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,m=d.holes;Cn.isClockWise(p)===!1&&(p=p.reverse());for(let g=0,f=m.length;g<f;g++){let _=m[g];Cn.isClockWise(_)===!0&&(m[g]=_.reverse())}let v=Cn.triangulateShape(p,m);for(let g=0,f=m.length;g<f;g++){let _=m[g];p=p.concat(_)}for(let g=0,f=p.length;g<f;g++){let _=p[g];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let g=0,f=v.length;g<f;g++){let _=v[g],x=_[0]+u,y=_[1]+u,b=_[2]+u;n.push(x,y,b),l+=3}}this.setIndex(n),this.setAttribute("position",new De(i,3)),this.setAttribute("normal",new De(s,3)),this.setAttribute("uv",new De(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Ri=class r extends rt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new w,d=new w,p=[],m=[],v=[],g=[];for(let f=0;f<=n;f++){let _=[],x=f/n,y=0;f===0&&a===0?y=.5/t:f===n&&l===Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){let A=b/t;u.x=-e*Math.cos(i+A*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+A*s)*Math.sin(a+x*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(A+y,1-x),_.push(c++)}h.push(_)}for(let f=0;f<n;f++)for(let _=0;_<t;_++){let x=h[f][_+1],y=h[f][_],b=h[f+1][_],A=h[f+1][_+1];(f!==0||a>0)&&p.push(x,y,A),(f!==n-1||l<Math.PI)&&p.push(y,b,A)}this.setIndex(p),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Lo=class r extends Ai{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},$i=class r extends rt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new w,u=new w,d=new w;for(let p=0;p<=n;p++)for(let m=0;m<=i;m++){let v=m/i*s,g=p/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=i;m++){let v=(i+1)*p+m-1,g=(i+1)*(p-1)+m-1,f=(i+1)*(p-1)+m,_=(i+1)*p+m;a.push(v,g,_),a.push(g,f,_)}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},No=class r extends rt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new w,d=new w,p=new w,m=new w,v=new w,g=new w,f=new w;for(let x=0;x<=n;++x){let y=x/n*s*Math.PI*2;_(y,s,a,e,p),_(y+.01,s,a,e,m),g.subVectors(m,p),f.addVectors(m,p),v.crossVectors(g,f),f.crossVectors(v,g),v.normalize(),f.normalize();for(let b=0;b<=i;++b){let A=b/i*Math.PI*2,L=-t*Math.cos(A),U=t*Math.sin(A);u.x=p.x+(L*f.x+U*v.x),u.y=p.y+(L*f.y+U*v.y),u.z=p.z+(L*f.z+U*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),c.push(d.x,d.y,d.z),h.push(x/n),h.push(b/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){let b=(i+1)*(x-1)+(y-1),A=(i+1)*x+(y-1),L=(i+1)*x+y,U=(i+1)*(x-1)+y;o.push(b,A,U),o.push(A,L,U)}function _(x,y,b,A,L){let U=Math.cos(x),N=Math.sin(x),k=b/y*x,B=Math.cos(k);L.x=A*(2+B)*.5*U,L.y=A*(2+B)*N*.5,L.z=A*Math.sin(k)*.5}this.setIndex(o),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Do=class r extends rt{constructor(e=new Js(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,l=new w,c=new ie,h=new w,u=[],d=[],p=[],m=[];function v(g){h=e.getPointAt(g/t,h);let f=a.normals[g],_=a.binormals[g];for(let x=0;x<=i;x++){let y=x/i*Math.PI*2,b=Math.sin(y),A=-Math.cos(y);l.x=A*f.x+b*_.x,l.y=A*f.y+b*_.y,l.z=A*f.z+b*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let g=0;g<t;g++)v(g);v(s===!1?t:0),(function(){for(let g=0;g<=t;g++)for(let f=0;f<=i;f++)c.x=g/t,c.y=f/i,p.push(c.x,c.y)})(),(function(){for(let g=1;g<=t;g++)for(let f=1;f<=i;f++){let _=(i+1)*(g-1)+(f-1),x=(i+1)*g+(f-1),y=(i+1)*g+f,b=(i+1)*(g-1)+f;m.push(_,x,b),m.push(x,y,b)}})()})(),this.setIndex(m),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(d,3)),this.setAttribute("uv",new De(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new wo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Uo=class extends rt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start;for(let p=d,m=d+u.count;p<m;p+=3)for(let v=0;v<3;v++){let g=o.getX(p+v),f=o.getX(p+(v+1)%3);i.fromBufferAttribute(a,g),s.fromBufferAttribute(a,f),Ed(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Ed(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new De(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Ed(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var c_=Object.freeze({__proto__:null,BoxGeometry:Ln,CapsuleGeometry:_o,CircleGeometry:Zi,ConeGeometry:vo,CylinderGeometry:Dn,DodecahedronGeometry:xo,EdgesGeometry:yo,ExtrudeGeometry:Ao,IcosahedronGeometry:Ro,LatheGeometry:Co,OctahedronGeometry:Io,PlaneGeometry:ln,PolyhedronGeometry:Ai,RingGeometry:Po,ShapeGeometry:qr,SphereGeometry:Ri,TetrahedronGeometry:Lo,TorusGeometry:$i,TorusKnotGeometry:No,TubeGeometry:Do,WireframeGeometry:Uo});var mt=class extends Yt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},gt=class extends mt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Oo=class extends Yt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Fo=class extends Yt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var ia=class extends si{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function so(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Cm(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Im(r){let e=r.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,i){return r[n]-r[i]}),t}function Ad(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Pp(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var ai=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bo=class extends ai{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:dc,endingEnd:dc}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case pc:s=e,o=2*t-n;break;case fc:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case pc:a=e,l=2*n-t;break;case fc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,m=(n-t)/(i-t),v=m*m,g=v*m,f=-d*g+2*d*v-d*m,_=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,x=(-1-p)*g+(1.5+p)*v+.5*m,y=p*g-p*v;for(let b=0;b!==o;++b)s[b]=f*a[h+b]+_*a[c+b]+x*a[l+b]+y*a[u+b];return s}},ko=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},zo=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Xt=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=so(t,this.TimeBufferType),this.values=so(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:so(e.times,Array),values:so(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Bo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ji:t=this.InterpolantFactoryMethodDiscrete;break;case qi:t=this.InterpolantFactoryMethodLinear;break;case ao:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ji;case this.InterpolantFactoryMethodLinear:return qi;case this.InterpolantFactoryMethodSmooth:return ao}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Cm(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ao,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let m=t[h+p];if(m!==t[u+p]||m!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Xt.prototype.ValueTypeName="",Xt.prototype.TimeBufferType=Float32Array,Xt.prototype.ValueBufferType=Float32Array,Xt.prototype.DefaultInterpolation=qi;var ei=class extends Xt{constructor(e,t,n){super(e,t,n)}};ei.prototype.ValueTypeName="bool",ei.prototype.ValueBufferType=Array,ei.prototype.DefaultInterpolation=ji,ei.prototype.InterpolantFactoryMethodLinear=void 0,ei.prototype.InterpolantFactoryMethodSmooth=void 0;var ra=class extends Xt{constructor(e,t,n,i){super(e,t,n,i)}};ra.prototype.ValueTypeName="color";var Un=class extends Xt{constructor(e,t,n,i){super(e,t,n,i)}};Un.prototype.ValueTypeName="number";var Go=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)qt.slerpFlat(s,0,a,c-o,a,c,l);return s}},On=class extends Xt{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Go(this.times,this.values,this.getValueSize(),e)}};On.prototype.ValueTypeName="quaternion",On.prototype.InterpolantFactoryMethodSmooth=void 0;var ti=class extends Xt{constructor(e,t,n){super(e,t,n)}};ti.prototype.ValueTypeName="string",ti.prototype.ValueBufferType=Array,ti.prototype.DefaultInterpolation=ji,ti.prototype.InterpolantFactoryMethodLinear=void 0,ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Fn=class extends Xt{constructor(e,t,n,i){super(e,t,n,i)}};Fn.prototype.ValueTypeName="vector";var sa=class{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=an(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Pm(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Xt.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=Im(l);l=Ad(l,1,h),c=Ad(c,1,h),i||l[0]!==0||(l.push(s),c.push(c[0])),a.push(new Un(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,p,m){if(d.length!==0){let v=[],g=[];Pp(d,v,g,p),v.length!==0&&m.push(new h(u,v,g))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let u=c[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let d={},p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let m=0;m<u[p].morphTargets.length;m++)d[u[p].morphTargets[m]]=-1;for(let m in d){let v=[],g=[];for(let f=0;f!==u[p].morphTargets.length;++f){let _=u[p];v.push(_.time),g.push(_.morphTarget===m?1:0)}i.push(new Un(".morphTargetInfluence["+m+"]",v,g))}l=d.length*a}else{let d=".bones["+t[h].name+"]";n(Fn,d+".position",u,"pos",i),n(On,d+".quaternion",u,"rot",i),n(Fn,d+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let i=this.tracks[t];e=Math.max(e,i.times[i.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Pm(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Un;case"vector":case"vector2":case"vector3":case"vector4":return Fn;case"color":return ra;case"quaternion":return On;case"bool":case"boolean":return ei;case"string":return ti}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(r.type);if(r.times===void 0){let t=[],n=[];Pp(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var In={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Ho=class{constructor(e,t,n){let i=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,l),o===l&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],m=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Lp=new Ho,Bn=class{constructor(e){this.manager=e!==void 0?e:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Bn.DEFAULT_MATERIAL_NAME="__DEFAULT";var $n={},Mc=class extends Error{constructor(e,t){super(e),this.response=t}},Yr=class extends Bn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=In.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if($n[e]!==void 0)return void $n[e].push({onLoad:t,onProgress:n,onError:i});$n[e]=[],$n[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=$n[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,m=p!==0,v=0,g=new ReadableStream({start(f){(function _(){u.read().then(({done:x,value:y})=>{if(x)f.close();else{v+=y.byteLength;let b=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:p});for(let A=0,L=h.length;A<L;A++){let U=h[A];U.onProgress&&U.onProgress(b)}f.enqueue(y),_()}},x=>{f.error(x)})})()}});return new Response(g)}throw new Mc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{In.add(`file:${e}`,c);let h=$n[e];delete $n[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{let h=$n[e];if(h===void 0)throw this.manager.itemError(e),c;delete $n[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Pr=new WeakMap,Vo=class extends Bn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=In.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Pr.get(a);u===void 0&&(u=[],Pr.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Ur("img");function l(){h(),t&&t(this);let u=Pr.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}Pr.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),In.remove(`image:${e}`);let d=Pr.get(this)||[];for(let p=0;p<d.length;p++){let m=d[p];m.onError&&m.onError(u)}Pr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),In.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Ci=class extends Bn{constructor(e){super(e)}load(e,t,n,i){let s=new Rt,a=new Vo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Qi=class extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},aa=class extends Qi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},oc=new Le,Rd=new w,Cd=new w,oa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ei,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Rd),Cd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cd),t.updateMatrixWorld(),oc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sc=class extends oa{constructor(){super(new bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Yi*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},la=class extends Qi{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Sc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Id=new Le,Es=new w,lc=new w,bc=class extends oa{constructor(){super(new bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ie(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Es.setFromMatrixPosition(e.matrixWorld),n.position.copy(Es),lc.copy(n.position),lc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(lc),n.updateMatrixWorld(),i.makeTranslation(-Es.x,-Es.y,-Es.z),Id.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Id,n.coordinateSystem,n.reversedDepth)}},er=class extends Qi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new bc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},tr=class extends kr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Tc=class extends oa{constructor(){super(new tr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},nr=class extends Qi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Tc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var oi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var cc=new WeakMap,ca=class extends Bn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=In.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(c=>{if(cc.has(a)!==!0)return t&&t(c),s.manager.itemEnd(e),c;i&&i(cc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return In.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),cc.set(l,c),In.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});In.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var h_=new Le,u_=new Le,d_=new Le;var Wo=class extends bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var p_=new w,f_=new qt,m_=new w,g_=new w,__=new w;var v_=new w,x_=new qt,y_=new w,M_=new w;var xh="\\[\\]\\.:\\/",Lm=new RegExp("["+xh+"]","g"),hc="[^"+xh+"]",Nm="[^"+xh.replace("\\.","")+"]",Dm=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",hc)+/(WCOD+)?/.source.replace("WCOD",Nm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hc)+"$"),Um=["material","materials","bones","map"],ht=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lm,"")}static parseTrackName(e){let t=Dm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Um.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ht.Composite=class{constructor(r,e,t){let n=t||ht.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray],ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var S_=new Float32Array(1);var Pd=new Le,ha=class{constructor(e,t,n=0,i=1/0){this.ray=new Ti(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Pd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pd),this}intersectObject(e,t=!0,n=[]){return wc(e,this,n,t),n.sort(Ld),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)wc(e[i],this,n,t);return n.sort(Ld),n}};function Ld(r,e){return r.distance-e.distance}function wc(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)wc(s[a],e,t,!0)}}var b_=new ie;var T_=new w,w_=new w,E_=new w,A_=new w,R_=new w,C_=new w,I_=new w;var P_=new w;var L_=new w,N_=new Le,D_=new Le;var U_=new w,O_=new Re,F_=new Re;var B_=new w,k_=new w,z_=new w;var G_=new w,H_=new kr;var V_=new Ut;var W_=new w;function yh(r,e,t,n){let i=(function(s){switch(s){case Gn:case Lc:return{byteLength:1,components:1};case $r:case Nc:case Qr:return{byteLength:2,components:1};case il:case rl:return{byteLength:2,components:4};case sr:case nl:case hn:return{byteLength:4,components:1};case Dc:case Uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case sl:case al:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case un:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function nf(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Fm(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(r.bindBuffer(o,s),c.length===0)r.bufferSubData(o,0,l);else{c.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<c.length;u++){let d=c[h],p=c[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,c[h]=p)}c.length=h+1;for(let u=0,d=c.length;u<d;u++){let p=c[u];r.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var We={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},de={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Hn={basic:{uniforms:kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Re(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:kt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:kt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Re(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:kt([de.points,de.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:kt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:kt([de.common,de.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:kt([de.sprite,de.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:kt([de.common,de.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:kt([de.lights,de.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Hn.physical={uniforms:kt([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};var ul={r:0,b:0,g:0},lr=new Mn,Bm=new Le;function km(r,e,t,n,i,s,a){let o=new Re(0),l,c,h=s===!0?0:1,u=null,d=0,p=null;function m(g){let f=g.isScene===!0?g.background:null;return f&&f.isTexture&&(f=(g.backgroundBlurriness>0?t:e).get(f)),f}function v(g,f){g.getRGB(ul,_h(r)),n.buffers.color.setClear(ul.r,ul.g,ul.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(g,f=1){o.set(g),h=f,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(g){h=g,v(o,h)},render:function(g){let f=!1,_=m(g);_===null?v(o,h):_&&_.isColor&&(v(_,1),f=!0);let x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||f)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(g,f){let _=m(f);_&&(_.isCubeTexture||_.mapping===pa)?(c===void 0&&(c=new ut(new Ln(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:or(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,y,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),lr.copy(f.backgroundRotation),lr.x*=-1,lr.y*=-1,lr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(lr.y*=-1,lr.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(lr)),c.material.toneMapped=$e.getTransfer(_.colorSpace)!==lt,u===_&&d===_.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=_,d=_.version,p=r.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ut(new ln(2,2),new Sn({name:"BackgroundMaterial",uniforms:or(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=$e.getTransfer(_.colorSpace)!==lt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&d===_.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=_,d=_.version,p=r.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function zm(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null),s=i,a=!1;function o(f){return r.bindVertexArray(f)}function l(f){return r.deleteVertexArray(f)}function c(f){let _=[],x=[],y=[];for(let b=0;b<t;b++)_[b]=0,x[b]=0,y[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:x,attributeDivisors:y,object:f,attributes:{},index:null}}function h(){let f=s.newAttributes;for(let _=0,x=f.length;_<x;_++)f[_]=0}function u(f){d(f,0)}function d(f,_){let x=s.newAttributes,y=s.enabledAttributes,b=s.attributeDivisors;x[f]=1,y[f]===0&&(r.enableVertexAttribArray(f),y[f]=1),b[f]!==_&&(r.vertexAttribDivisor(f,_),b[f]=_)}function p(){let f=s.newAttributes,_=s.enabledAttributes;for(let x=0,y=_.length;x<y;x++)_[x]!==f[x]&&(r.disableVertexAttribArray(x),_[x]=0)}function m(f,_,x,y,b,A,L){L===!0?r.vertexAttribIPointer(f,_,x,b,A):r.vertexAttribPointer(f,_,x,y,b,A)}function v(){g(),a=!0,s!==i&&(s=i,o(s.object))}function g(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(f,_,x,y,b){let A=!1,L=(function(U,N,k){let B=k.wireframe===!0,O=n[U.id];O===void 0&&(O={},n[U.id]=O);let j=O[N.id];j===void 0&&(j={},O[N.id]=j);let G=j[B];return G===void 0&&(G=c(r.createVertexArray()),j[B]=G),G})(y,x,_);s!==L&&(s=L,o(s.object)),A=(function(U,N,k,B){let O=s.attributes,j=N.attributes,G=0,q=k.getAttributes();for(let K in q)if(q[K].location>=0){let Q=O[K],te=j[K];if(te===void 0&&(K==="instanceMatrix"&&U.instanceMatrix&&(te=U.instanceMatrix),K==="instanceColor"&&U.instanceColor&&(te=U.instanceColor)),Q===void 0||Q.attribute!==te||te&&Q.data!==te.data)return!0;G++}return s.attributesNum!==G||s.index!==B})(f,y,x,b),A&&(function(U,N,k,B){let O={},j=N.attributes,G=0,q=k.getAttributes();for(let K in q)if(q[K].location>=0){let Q=j[K];Q===void 0&&(K==="instanceMatrix"&&U.instanceMatrix&&(Q=U.instanceMatrix),K==="instanceColor"&&U.instanceColor&&(Q=U.instanceColor));let te={};te.attribute=Q,Q&&Q.data&&(te.data=Q.data),O[K]=te,G++}s.attributes=O,s.attributesNum=G,s.index=B})(f,y,x,b),b!==null&&e.update(b,r.ELEMENT_ARRAY_BUFFER),(A||a)&&(a=!1,(function(U,N,k,B){h();let O=B.attributes,j=k.getAttributes(),G=N.defaultAttributeValues;for(let q in j){let K=j[q];if(K.location>=0){let Q=O[q];if(Q===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(Q=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(Q=U.instanceColor)),Q!==void 0){let te=Q.normalized,xe=Q.itemSize,we=e.get(Q);if(we===void 0)continue;let Se=we.buffer,Ne=we.type,re=we.bytesPerElement,le=Ne===r.INT||Ne===r.UNSIGNED_INT||Q.gpuType===nl;if(Q.isInterleavedBufferAttribute){let oe=Q.data,Ce=oe.stride,ke=Q.offset;if(oe.isInstancedInterleavedBuffer){for(let T=0;T<K.locationSize;T++)d(K.location+T,oe.meshPerAttribute);U.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let T=0;T<K.locationSize;T++)u(K.location+T);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let T=0;T<K.locationSize;T++)m(K.location+T,xe/K.locationSize,Ne,te,Ce*re,(ke+xe/K.locationSize*T)*re,le)}else{if(Q.isInstancedBufferAttribute){for(let oe=0;oe<K.locationSize;oe++)d(K.location+oe,Q.meshPerAttribute);U.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let oe=0;oe<K.locationSize;oe++)u(K.location+oe);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let oe=0;oe<K.locationSize;oe++)m(K.location+oe,xe/K.locationSize,Ne,te,xe*re,xe/K.locationSize*oe*re,le)}}else if(G!==void 0){let te=G[q];if(te!==void 0)switch(te.length){case 2:r.vertexAttrib2fv(K.location,te);break;case 3:r.vertexAttrib3fv(K.location,te);break;case 4:r.vertexAttrib4fv(K.location,te);break;default:r.vertexAttrib1fv(K.location,te)}}}}p()})(f,_,x,y),b!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(b).buffer))},reset:v,resetDefaultState:g,dispose:function(){v();for(let f in n){let _=n[f];for(let x in _){let y=_[x];for(let b in y)l(y[b].object),delete y[b];delete _[x]}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;let _=n[f.id];for(let x in _){let y=_[x];for(let b in y)l(y[b].object),delete y[b];delete _[x]}delete n[f.id]},releaseStatesOfProgram:function(f){for(let _ in n){let x=n[_];if(x[f.id]===void 0)continue;let y=x[f.id];for(let b in y)l(y[b].object),delete y[b];delete x[f.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function Gm(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)i(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function Hm(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===un||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===Qr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Gn&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==hn&&!p)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Vm(r){let e=this,t=null,n=0,i=!1,s=!1,a=new sn,o=new Ge,l={value:null,needsUpdate:!1};function c(h,u,d,p){let m=h!==null?h.length:0,v=null;if(m!==0){if(v=l.value,p!==!0||v===null){let g=d+4*m,f=u.matrixWorldInverse;o.getNormalMatrix(f),(v===null||v.length<g)&&(v=new Float32Array(g));for(let _=0,x=d;_!==m;++_,x+=4)a.copy(h[_]).applyMatrix4(f,o),a.normal.toArray(v,x),v[x+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,v}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,m=h.clipIntersection,v=h.clipShadows,g=r.get(h);if(!i||p===null||p.length===0||s&&!v)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let f=s?0:n,_=4*f,x=g.clippingState||null;l.value=x,x=c(p,u,_,d);for(let y=0;y!==_;++y)x[y]=t[y];g.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function Wm(r){let e=new WeakMap;function t(i,s){return s===Li?i.mapping=Kr:s===el&&(i.mapping=ir),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Li||s===el){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new po(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Np=[.125,.215,.35,.446,.526,.582],_a=20,Mh=new tr,Dp=new Re,Sh=null,bh=0,Th=0,wh=!1,hr=(1+Math.sqrt(5))/2,ns=1/hr,Up=[new w(-hr,ns,0),new w(hr,ns,0),new w(-ns,0,hr),new w(ns,0,hr),new w(0,hr,-ns),new w(0,hr,ns),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Xm=new w,fl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Xm}=s;Sh=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sh,bh,Th),this._renderer.xr.enabled=wh,e.scissorTest=!1,dl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Kr||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sh=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Qr,format:un,colorSpace:Dt,depthBuffer:!1},i=Op(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Op(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,u=a-4+1+Np.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);l.push(p);let m=1/p;d>a-4?m=Np[d-a+4-1]:d===0&&(m=0),c.push(m);let v=1/(p-2),g=-v,f=1+v,_=[g,g,f,g,f,f,g,g,f,f,g,f],x=6,y=6,b=3,A=2,L=1,U=new Float32Array(b*y*x),N=new Float32Array(A*y*x),k=new Float32Array(L*y*x);for(let O=0;O<x;O++){let j=O%3*2/3-1,G=O>2?0:-1,q=[j,G,0,j+2/3,G,0,j+2/3,G+1,0,j,G,0,j+2/3,G+1,0,j,G+1,0];U.set(q,b*y*O),N.set(_,A*y*O);let K=[O,O,O,O,O,O];k.set(K,L*y*O)}let B=new rt;B.setAttribute("position",new Tt(U,b)),B.setAttribute("uv",new Tt(N,A)),B.setAttribute("faceIndex",new Tt(k,L)),o.push(B),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(_a),h=new w(0,1,0);return new Sn({name:"SphericalGaussianBlur",defines:{n:_a,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ut(this._lodPlanes[0],e);this._renderer.compile(t,Mh)}_sceneToCubeUV(e,t,n,i,s){let a=new bt(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(Dp),c.toneMapping=li,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(i),c.clearDepth(),c.setRenderTarget(null));let d=new Bt({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),p=new ut(new Ln,d),m=!1,v=e.background;v?v.isColor&&(d.color.copy(v),e.background=null,m=!0):(d.color.copy(Dp),m=!0);for(let g=0;g<6;g++){let f=g%3;f===0?(a.up.set(0,o[g],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[g],s.y,s.z)):f===1?(a.up.set(0,0,o[g]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[g],s.z)):(a.up.set(0,o[g],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[g]));let _=this._cubeSize;dl(i,f*_,g>2?_:0,_,_),c.setRenderTarget(i),m&&c.render(p,a),c.render(e,a)}p.geometry.dispose(),p.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Kr||e.mapping===ir;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ut(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;dl(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Mh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Up[(i-s-1)%Up.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ut(this._lodPlanes[i],c),u=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,m=s/p,v=isFinite(s)?1+Math.floor(3*m):_a;v>_a&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let g=[],f=0;for(let y=0;y<_a;++y){let b=y/m,A=Math.exp(-b*b/2);g.push(A),y===0?f+=A:y<v&&(f+=2*A)}for(let y=0;y<g.length;y++)g[y]=g[y]/f;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=g,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=p,u.mipInt.value=_-n;let x=this._sizeLods[i];dl(t,3*x*(i>_-4?i-_+4:0),4*(this._cubeSize-x),3*x,2*x),l.setRenderTarget(t),l.render(h,Mh)}};function Op(r,e,t){let n=new Pn(r,e,t);return n.texture.mapping=pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Fp(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Bp(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Uh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jm(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Li||s===el,o=s===Kr||s===ir;if(a||o){let l=e.get(i),c=l!==void 0?l.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==c)return t===null&&(t=new fl(r)),l=a?t.fromEquirectangular(i,l):t.fromCubemap(i,l),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),l.texture;if(l!==void 0)return l.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let m=0;m<p;m++)u[m]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new fl(r)),l=a?t.fromEquirectangular(i):t.fromCubemap(i),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),i.addEventListener("dispose",n),l.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function qm(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Or("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ym(r,e,t,n){let i={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",a),delete i[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,d=0;if(h!==null){let v=h.array;d=h.version;for(let g=0,f=v.length;g<f;g+=3){let _=v[g+0],x=v[g+1],y=v[g+2];c.push(_,x,x,y,y,_)}}else{if(u===void 0)return;{let v=u.array;d=u.version;for(let g=0,f=v.length/3-1;g<f;g+=3){let _=g+0,x=g+1,y=g+2;c.push(_,x,x,y,y,_)}}}let p=new(gh(c)?Us:Ds)(c,1);p.version=d;let m=s.get(l);m&&e.remove(m),s.set(l,p)}return{get:function(l,c){return i[c.id]===!0||(c.addEventListener("dispose",a),i[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Zm(r,e,t){let n,i,s;function a(o,l,c){c!==0&&(r.drawElementsInstanced(n,l,i,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,l){r.drawElements(n,l,i,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,i,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,l[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,i,o,0,h,0,c);let d=0;for(let p=0;p<c;p++)d+=l[p]*h[p];t.update(d,n,1)}}}function Km(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Jm(r,e,t){let n=new WeakMap,i=new nt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let U=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",U)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],f=a.morphAttributes.color||[],_=0;d===!0&&(_=1),p===!0&&(_=2),m===!0&&(_=3);let x=a.attributes.position.count*_,y=1;x>e.maxTextureSize&&(y=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let b=new Float32Array(x*y*4*h),A=new Ns(b,x,y,h);A.type=hn,A.needsUpdate=!0;let L=4*_;for(let N=0;N<h;N++){let k=v[N],B=g[N],O=f[N],j=x*y*4*N;for(let G=0;G<k.count;G++){let q=G*L;d===!0&&(i.fromBufferAttribute(k,G),b[j+q+0]=i.x,b[j+q+1]=i.y,b[j+q+2]=i.z,b[j+q+3]=0),p===!0&&(i.fromBufferAttribute(B,G),b[j+q+4]=i.x,b[j+q+5]=i.y,b[j+q+6]=i.z,b[j+q+7]=0),m===!0&&(i.fromBufferAttribute(O,G),b[j+q+8]=i.x,b[j+q+9]=i.y,b[j+q+10]=i.z,b[j+q+11]=O.itemSize===4?i.w:1)}}u={count:h,texture:A,size:new ie(x,y)},n.set(a,u),a.addEventListener("dispose",U)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<l.length;m++)d+=l[m];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",l)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function $m(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(i.get(c)!==o&&(e.update(c),i.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return c},dispose:function(){i=new WeakMap}}}var rf=new Rt,kp=new js(1,1),sf=new Ns,af=new ho,of=new Os,zp=[],Gp=[],Hp=new Float32Array(16),Vp=new Float32Array(9),Wp=new Float32Array(4);function rs(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=zp[i];if(s===void 0&&(s=new Float32Array(i),zp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Ct(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function It(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function gl(r,e){let t=Gp[e];t===void 0&&(t=new Int32Array(e),Gp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Qm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function eg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2fv(this.addr,e),It(t,e)}}function tg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;r.uniform3fv(this.addr,e),It(t,e)}}function ng(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4fv(this.addr,e),It(t,e)}}function ig(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Ct(t,n))return;Wp.set(n),r.uniformMatrix2fv(this.addr,!1,Wp),It(t,n)}}function rg(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Ct(t,n))return;Vp.set(n),r.uniformMatrix3fv(this.addr,!1,Vp),It(t,n)}}function sg(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Ct(t,n))return;Hp.set(n),r.uniformMatrix4fv(this.addr,!1,Hp),It(t,n)}}function ag(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function og(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2iv(this.addr,e),It(t,e)}}function lg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3iv(this.addr,e),It(t,e)}}function cg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4iv(this.addr,e),It(t,e)}}function hg(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function ug(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2uiv(this.addr,e),It(t,e)}}function dg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3uiv(this.addr,e),It(t,e)}}function pg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4uiv(this.addr,e),It(t,e)}}function fg(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(kp.compareFunction=ph,s=kp):s=rf,t.setTexture2D(e||s,i)}function mg(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||af,i)}function gg(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||of,i)}function _g(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||sf,i)}function vg(r,e){r.uniform1fv(this.addr,e)}function xg(r,e){let t=rs(e,this.size,2);r.uniform2fv(this.addr,t)}function yg(r,e){let t=rs(e,this.size,3);r.uniform3fv(this.addr,t)}function Mg(r,e){let t=rs(e,this.size,4);r.uniform4fv(this.addr,t)}function Sg(r,e){let t=rs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function bg(r,e){let t=rs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Tg(r,e){let t=rs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function wg(r,e){r.uniform1iv(this.addr,e)}function Eg(r,e){r.uniform2iv(this.addr,e)}function Ag(r,e){r.uniform3iv(this.addr,e)}function Rg(r,e){r.uniform4iv(this.addr,e)}function Cg(r,e){r.uniform1uiv(this.addr,e)}function Ig(r,e){r.uniform2uiv(this.addr,e)}function Pg(r,e){r.uniform3uiv(this.addr,e)}function Lg(r,e){r.uniform4uiv(this.addr,e)}function Ng(r,e,t){let n=this.cache,i=e.length,s=gl(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||rf,s[a])}function Dg(r,e,t){let n=this.cache,i=e.length,s=gl(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||af,s[a])}function Ug(r,e,t){let n=this.cache,i=e.length,s=gl(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||of,s[a])}function Og(r,e,t){let n=this.cache,i=e.length,s=gl(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||sf,s[a])}var Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Qm;case 35664:return eg;case 35665:return tg;case 35666:return ng;case 35674:return ig;case 35675:return rg;case 35676:return sg;case 5124:case 35670:return ag;case 35667:case 35671:return og;case 35668:case 35672:return lg;case 35669:case 35673:return cg;case 5125:return hg;case 36294:return ug;case 36295:return dg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return _g}})(t.type)}},Rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return vg;case 35664:return xg;case 35665:return yg;case 35666:return Mg;case 35674:return Sg;case 35675:return bg;case 35676:return Tg;case 5124:case 35670:return wg;case 35667:case 35671:return Eg;case 35668:case 35672:return Ag;case 35669:case 35673:return Rg;case 5125:return Cg;case 36294:return Ig;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Og}})(t.type)}},Ch=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Eh=/(\w+)(\])?(\[|\.)?/g;function Xp(r,e){r.seq.push(e),r.map[e.id]=e}function Fg(r,e,t){let n=r.name,i=n.length;for(Eh.lastIndex=0;;){let s=Eh.exec(n),a=Eh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===i){Xp(t,c===void 0?new Ah(o,r,e):new Rh(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Ch(o),Xp(t,h)),t=h}}}var is=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Fg(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function jp(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Bg=0,qp=new Ge;function Yp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),d=Math.min(l+6,c.length);for(let p=u;p<d;p++){let m=p+1;h.push(`${m===l?">":" "} ${m}: ${c[p]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function kg(r,e){let t=(function(n){$e._getMatrix(qp,$e.workingColorSpace,n);let i=`mat3( ${qp.elements.map(s=>s.toFixed(4))} )`;switch($e.getTransfer(n)){case Ps:return[i,"LinearTransferOETF"];case lt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zg(r,e){let t;switch(e){case rp:t="Linear";break;case sp:t="Reinhard";break;case ap:t="Cineon";break;case Qo:t="ACESFilmic";break;case lp:t="AgX";break;case cp:t="Neutral";break;case op:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var pl=new w;function Gg(){return $e.getLuminanceCoefficients(pl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${pl.x.toFixed(4)}, ${pl.y.toFixed(4)}, ${pl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function va(r){return r!==""}function Zp(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(r){return r.replace(Hg,Wg)}var Vg=new Map;function Wg(r,e){let t=We[e];if(t===void 0){let n=Vg.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Ih(t)}var Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jp(r){return r.replace(Xg,jg)}function jg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function $p(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qg(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(B){let O="SHADOWMAP_TYPE_BASIC";return B.shadowMapType===Ac?O="SHADOWMAP_TYPE_PCF":B.shadowMapType===Xo?O="SHADOWMAP_TYPE_PCF_SOFT":B.shadowMapType===kn&&(O="SHADOWMAP_TYPE_VSM"),O})(t),c=(function(B){let O="ENVMAP_TYPE_CUBE";if(B.envMap)switch(B.envMapMode){case Kr:case ir:O="ENVMAP_TYPE_CUBE";break;case pa:O="ENVMAP_TYPE_CUBE_UV"}return O})(t),h=(function(B){let O="ENVMAP_MODE_REFLECTION";return B.envMap&&B.envMapMode===ir&&(O="ENVMAP_MODE_REFRACTION"),O})(t),u=(function(B){let O="ENVMAP_BLENDING_NONE";if(B.envMap)switch(B.combine){case tp:O="ENVMAP_BLENDING_MULTIPLY";break;case np:O="ENVMAP_BLENDING_MIX";break;case ip:O="ENVMAP_BLENDING_ADD"}return O})(t),d=(function(B){let O=B.envMapCubeUVHeight;if(O===null)return null;let j=Math.log2(O)-2,G=1/O;return{texelWidth:1/(3*Math.max(Math.pow(2,j),112)),texelHeight:G,maxMip:j}})(t),p=(function(B){return[B.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",B.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(va).join(`
`)})(t),m=(function(B){let O=[];for(let j in B){let G=B[j];G!==!1&&O.push("#define "+j+" "+G)}return O.join(`
`)})(s),v=i.createProgram(),g,f,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(va).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(va).join(`
`),f.length>0&&(f+=`
`)):(g=[$p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(va).join(`
`),f=[$p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?We.tonemapping_pars_fragment:"",t.toneMapping!==li?zg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,kg("linearToOutputTexel",t.outputColorSpace),Gg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(va).join(`
`)),a=Ih(a),a=Zp(a,t),a=Kp(a,t),o=Ih(o),o=Zp(o,t),o=Kp(o,t),a=Jp(a),o=Jp(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let x=_+g+a,y=_+f+o,b=jp(i,i.VERTEX_SHADER,x),A=jp(i,i.FRAGMENT_SHADER,y);function L(B){if(r.debug.checkShaderErrors){let O=i.getProgramInfoLog(v)||"",j=i.getShaderInfoLog(b)||"",G=i.getShaderInfoLog(A)||"",q=O.trim(),K=j.trim(),Q=G.trim(),te=!0,xe=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(te=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,b,A);else{let we=Yp(i,b,"vertex"),Se=Yp(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+q+`
`+we+`
`+Se)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):K!==""&&Q!==""||(xe=!1);xe&&(B.diagnostics={runnable:te,programLog:q,vertexShader:{log:K,prefix:g},fragmentShader:{log:Q,prefix:f}})}i.deleteShader(b),i.deleteShader(A),U=new is(i,v),N=(function(O,j){let G={},q=O.getProgramParameter(j,O.ACTIVE_ATTRIBUTES);for(let K=0;K<q;K++){let Q=O.getActiveAttrib(j,K),te=Q.name,xe=1;Q.type===O.FLOAT_MAT2&&(xe=2),Q.type===O.FLOAT_MAT3&&(xe=3),Q.type===O.FLOAT_MAT4&&(xe=4),G[te]={type:Q.type,location:O.getAttribLocation(j,te),locationSize:xe}}return G})(i,v)}let U,N;i.attachShader(v,b),i.attachShader(v,A),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),this.getUniforms=function(){return U===void 0&&L(this),U},this.getAttributes=function(){return N===void 0&&L(this),N};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(v,37297)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=A,this}var Yg=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Lh(e),t.set(e,n)),n}},Lh=class{constructor(e){this.id=Yg++,this.code=e,this.usedTimes=0}};function Zg(r,e,t,n,i,s,a){let o=new Br,l=new Ph,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(g){return c.add(g),g===0?"uv":`uv${g}`}return{getParameters:function(g,f,_,x,y){let b=x.fog,A=y.geometry,L=g.isMeshStandardMaterial?x.environment:null,U=(g.isMeshStandardMaterial?t:e).get(g.envMap||L),N=U&&U.mapping===pa?U.image.height:null,k=m[g.type];g.precision!==null&&(p=i.getMaxPrecision(g.precision),p!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",p,"instead."));let B=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,O=B!==void 0?B.length:0,j,G,q,K,Q=0;if(A.morphAttributes.position!==void 0&&(Q=1),A.morphAttributes.normal!==void 0&&(Q=2),A.morphAttributes.color!==void 0&&(Q=3),k){let Ee=Hn[k];j=Ee.vertexShader,G=Ee.fragmentShader}else j=g.vertexShader,G=g.fragmentShader,l.update(g),q=l.getVertexShaderID(g),K=l.getFragmentShaderID(g);let te=r.getRenderTarget(),xe=r.state.buffers.depth.getReversed(),we=y.isInstancedMesh===!0,Se=y.isBatchedMesh===!0,Ne=!!g.map,re=!!g.matcap,le=!!U,oe=!!g.aoMap,Ce=!!g.lightMap,ke=!!g.bumpMap,T=!!g.normalMap,S=!!g.displacementMap,F=!!g.emissiveMap,P=!!g.metalnessMap,M=!!g.roughnessMap,R=g.anisotropy>0,D=g.clearcoat>0,I=g.dispersion>0,Z=g.iridescence>0,z=g.sheen>0,H=g.transmission>0,ne=R&&!!g.anisotropyMap,pe=D&&!!g.clearcoatMap,se=D&&!!g.clearcoatNormalMap,_e=D&&!!g.clearcoatRoughnessMap,be=Z&&!!g.iridescenceMap,Ie=Z&&!!g.iridescenceThicknessMap,qe=z&&!!g.sheenColorMap,et=z&&!!g.sheenRoughnessMap,tt=!!g.specularMap,fe=!!g.specularColorMap,Pe=!!g.specularIntensityMap,He=H&&!!g.transmissionMap,X=H&&!!g.thicknessMap,Y=!!g.gradientMap,ce=!!g.alphaMap,$=g.alphaTest>0,ye=!!g.alphaHash,Ue=!!g.extensions,C=li;g.toneMapped&&(te!==null&&te.isXRRenderTarget!==!0||(C=r.toneMapping));let ve={shaderID:k,shaderType:g.type,shaderName:g.name,vertexShader:j,fragmentShader:G,defines:g.defines,customVertexShaderID:q,customFragmentShaderID:K,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:p,batching:Se,batchingColor:Se&&y._colorsTexture!==null,instancing:we,instancingColor:we&&y.instanceColor!==null,instancingMorph:we&&y.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:te===null?r.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Dt,alphaToCoverage:!!g.alphaToCoverage,map:Ne,matcap:re,envMap:le,envMapMode:le&&U.mapping,envMapCubeUVHeight:N,aoMap:oe,lightMap:Ce,bumpMap:ke,normalMap:T,displacementMap:d&&S,emissiveMap:F,normalMapObjectSpace:T&&g.normalMapType===gp,normalMapTangentSpace:T&&g.normalMapType===mp,metalnessMap:P,roughnessMap:M,anisotropy:R,anisotropyMap:ne,clearcoat:D,clearcoatMap:pe,clearcoatNormalMap:se,clearcoatRoughnessMap:_e,dispersion:I,iridescence:Z,iridescenceMap:be,iridescenceThicknessMap:Ie,sheen:z,sheenColorMap:qe,sheenRoughnessMap:et,specularMap:tt,specularColorMap:fe,specularIntensityMap:Pe,transmission:H,transmissionMap:He,thicknessMap:X,gradientMap:Y,opaque:g.transparent===!1&&g.blending===ua&&g.alphaToCoverage===!1,alphaMap:ce,alphaTest:$,alphaHash:ye,combine:g.combine,mapUv:Ne&&v(g.map.channel),aoMapUv:oe&&v(g.aoMap.channel),lightMapUv:Ce&&v(g.lightMap.channel),bumpMapUv:ke&&v(g.bumpMap.channel),normalMapUv:T&&v(g.normalMap.channel),displacementMapUv:S&&v(g.displacementMap.channel),emissiveMapUv:F&&v(g.emissiveMap.channel),metalnessMapUv:P&&v(g.metalnessMap.channel),roughnessMapUv:M&&v(g.roughnessMap.channel),anisotropyMapUv:ne&&v(g.anisotropyMap.channel),clearcoatMapUv:pe&&v(g.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&v(g.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&v(g.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&v(g.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&v(g.sheenColorMap.channel),sheenRoughnessMapUv:et&&v(g.sheenRoughnessMap.channel),specularMapUv:tt&&v(g.specularMap.channel),specularColorMapUv:fe&&v(g.specularColorMap.channel),specularIntensityMapUv:Pe&&v(g.specularIntensityMap.channel),transmissionMapUv:He&&v(g.transmissionMap.channel),thicknessMapUv:X&&v(g.thicknessMap.channel),alphaMapUv:ce&&v(g.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(T||R),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!A.attributes.uv&&(Ne||ce),fog:!!b,useFog:g.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:g.flatShading===!0&&g.wireframe===!1,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xe,skinning:y.isSkinnedMesh===!0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:Q,numDirLights:f.directional.length,numPointLights:f.point.length,numSpotLights:f.spot.length,numSpotLightMaps:f.spotLightMap.length,numRectAreaLights:f.rectArea.length,numHemiLights:f.hemi.length,numDirLightShadows:f.directionalShadowMap.length,numPointLightShadows:f.pointShadowMap.length,numSpotLightShadows:f.spotShadowMap.length,numSpotLightShadowsWithMaps:f.numSpotLightShadowsWithMaps,numLightProbes:f.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:r.shadowMap.enabled&&_.length>0,shadowMapType:r.shadowMap.type,toneMapping:C,decodeVideoTexture:Ne&&g.map.isVideoTexture===!0&&$e.getTransfer(g.map.colorSpace)===lt,decodeVideoTextureEmissive:F&&g.emissiveMap.isVideoTexture===!0&&$e.getTransfer(g.emissiveMap.colorSpace)===lt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===cn,flipSided:g.side===en,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Ue&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&g.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return ve.vertexUv1s=c.has(1),ve.vertexUv2s=c.has(2),ve.vertexUv3s=c.has(3),c.clear(),ve},getProgramCacheKey:function(g){let f=[];if(g.shaderID?f.push(g.shaderID):(f.push(g.customVertexShaderID),f.push(g.customFragmentShaderID)),g.defines!==void 0)for(let _ in g.defines)f.push(_),f.push(g.defines[_]);return g.isRawShaderMaterial===!1&&((function(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapCubeUVHeight),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.morphAttributeCount),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)})(f,g),(function(_,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),_.push(o.mask)})(f,g),f.push(r.outputColorSpace)),f.push(g.customProgramCacheKey),f.join()},getUniforms:function(g){let f=m[g.type],_;if(f){let x=Hn[f];_=Ap.clone(x.uniforms)}else _=g.uniforms;return _},acquireProgram:function(g,f){let _;for(let x=0,y=h.length;x<y;x++){let b=h[x];if(b.cacheKey===f){_=b,++_.usedTimes;break}}return _===void 0&&(_=new qg(r,f,g,s),h.push(_)),_},releaseProgram:function(g){if(--g.usedTimes===0){let f=h.indexOf(g);h[f]=h[h.length-1],h.pop(),g.destroy()}},releaseShaderCache:function(g){l.remove(g)},programs:h,dispose:function(){l.dispose()}}}function Kg(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Jg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Qp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ef(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,l,c,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=l,d.groupOrder=c,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.push(d):l.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.unshift(d):l.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let l=r[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Jg),n.length>1&&n.sort(o||Qp),i.length>1&&i.sort(o||Qp)}}}function $g(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new ef,r.set(e,[i])):t>=n.length?(i=new ef,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Qg(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Re};break;case"SpotLight":t={position:new w,direction:new w,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var e0=0;function t0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function n0(r){let e=new Qg,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new Le,a=new Le;return{setup:function(o){let l=0,c=0,h=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let u=0,d=0,p=0,m=0,v=0,g=0,f=0,_=0,x=0,y=0,b=0;o.sort(t0);for(let L=0,U=o.length;L<U;L++){let N=o[L],k=N.color,B=N.intensity,O=N.distance,j=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)l+=k.r*B,c+=k.g*B,h+=k.b*B;else if(N.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(N.sh.coefficients[G],B);b++}else if(N.isDirectionalLight){let G=e.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let q=N.shadow,K=t.get(N);K.shadowIntensity=q.intensity,K.shadowBias=q.bias,K.shadowNormalBias=q.normalBias,K.shadowRadius=q.radius,K.shadowMapSize=q.mapSize,n.directionalShadow[u]=K,n.directionalShadowMap[u]=j,n.directionalShadowMatrix[u]=N.shadow.matrix,g++}n.directional[u]=G,u++}else if(N.isSpotLight){let G=e.get(N);G.position.setFromMatrixPosition(N.matrixWorld),G.color.copy(k).multiplyScalar(B),G.distance=O,G.coneCos=Math.cos(N.angle),G.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),G.decay=N.decay,n.spot[p]=G;let q=N.shadow;if(N.map&&(n.spotLightMap[x]=N.map,x++,q.updateMatrices(N),N.castShadow&&y++),n.spotLightMatrix[p]=q.matrix,N.castShadow){let K=t.get(N);K.shadowIntensity=q.intensity,K.shadowBias=q.bias,K.shadowNormalBias=q.normalBias,K.shadowRadius=q.radius,K.shadowMapSize=q.mapSize,n.spotShadow[p]=K,n.spotShadowMap[p]=j,_++}p++}else if(N.isRectAreaLight){let G=e.get(N);G.color.copy(k).multiplyScalar(B),G.halfWidth.set(.5*N.width,0,0),G.halfHeight.set(0,.5*N.height,0),n.rectArea[m]=G,m++}else if(N.isPointLight){let G=e.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),G.distance=N.distance,G.decay=N.decay,N.castShadow){let q=N.shadow,K=t.get(N);K.shadowIntensity=q.intensity,K.shadowBias=q.bias,K.shadowNormalBias=q.normalBias,K.shadowRadius=q.radius,K.shadowMapSize=q.mapSize,K.shadowCameraNear=q.camera.near,K.shadowCameraFar=q.camera.far,n.pointShadow[d]=K,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=N.shadow.matrix,f++}n.point[d]=G,d++}else if(N.isHemisphereLight){let G=e.get(N);G.skyColor.copy(N.color).multiplyScalar(B),G.groundColor.copy(N.groundColor).multiplyScalar(B),n.hemi[v]=G,v++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let A=n.hash;A.directionalLength===u&&A.pointLength===d&&A.spotLength===p&&A.rectAreaLength===m&&A.hemiLength===v&&A.numDirectionalShadows===g&&A.numPointShadows===f&&A.numSpotShadows===_&&A.numSpotMaps===x&&A.numLightProbes===b||(n.directional.length=u,n.spot.length=p,n.rectArea.length=m,n.point.length=d,n.hemi.length=v,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=_+x-y,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=b,A.directionalLength=u,A.pointLength=d,A.spotLength=p,A.rectAreaLength=m,A.hemiLength=v,A.numDirectionalShadows=g,A.numPointShadows=f,A.numSpotShadows=_,A.numSpotMaps=x,A.numLightProbes=b,n.version=e0++)},setupView:function(o,l){let c=0,h=0,u=0,d=0,p=0,m=l.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let f=o[v];if(f.isDirectionalLight){let _=n.directional[c];_.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),c++}else if(f.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(f.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(f.isRectAreaLight){let _=n.rectArea[d];_.position.setFromMatrixPosition(f.matrixWorld),_.position.applyMatrix4(m),a.identity(),s.copy(f.matrixWorld),s.premultiply(m),a.extractRotation(s),_.halfWidth.set(.5*f.width,0,0),_.halfHeight.set(0,.5*f.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),d++}else if(f.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(f.matrixWorld),_.position.applyMatrix4(m),h++}else if(f.isHemisphereLight){let _=n.hemi[p];_.direction.setFromMatrixPosition(f.matrixWorld),_.direction.transformDirection(m),p++}}},state:n}}function tf(r){let e=new n0(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function i0(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new tf(r),e.set(t,[s])):n>=i.length?(s=new tf(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function r0(r,e,t){let n=new Ei,i=new ie,s=new ie,a=new nt,o=new Oo({depthPacking:fp}),l=new Fo,c={},h=t.maxTextureSize,u={[Ii]:en,[en]:Ii,[cn]:cn},d=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let m=new rt;m.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ut(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ac;let f=this.type;function _(A,L){let U=e.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Pn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(L,null,U,d,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(L,null,U,p,v,null)}function x(A,L,U,N){let k=null,B=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(B!==void 0)k=B;else if(k=U.isPointLight===!0?l:o,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let O=k.uuid,j=L.uuid,G=c[O];G===void 0&&(G={},c[O]=G);let q=G[j];q===void 0&&(q=k.clone(),G[j]=q,L.addEventListener("dispose",b)),k=q}return k.visible=L.visible,k.wireframe=L.wireframe,k.side=N===kn?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:u[L.side],k.alphaMap=L.alphaMap,k.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,k.map=L.map,k.clipShadows=L.clipShadows,k.clippingPlanes=L.clippingPlanes,k.clipIntersection=L.clipIntersection,k.displacementMap=L.displacementMap,k.displacementScale=L.displacementScale,k.displacementBias=L.displacementBias,k.wireframeLinewidth=L.wireframeLinewidth,k.linewidth=L.linewidth,U.isPointLight===!0&&k.isMeshDistanceMaterial===!0&&(r.properties.get(k).light=U),k}function y(A,L,U,N,k){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&k===kn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);let O=e.update(A),j=A.material;if(Array.isArray(j)){let G=O.groups;for(let q=0,K=G.length;q<K;q++){let Q=G[q],te=j[Q.materialIndex];if(te&&te.visible){let xe=x(A,te,N,k);A.onBeforeShadow(r,A,L,U,O,xe,Q),r.renderBufferDirect(U,null,O,xe,A,Q),A.onAfterShadow(r,A,L,U,O,xe,Q)}}}else if(j.visible){let G=x(A,j,N,k);A.onBeforeShadow(r,A,L,U,O,G,null),r.renderBufferDirect(U,null,O,G,A,null),A.onAfterShadow(r,A,L,U,O,G,null)}}let B=A.children;for(let O=0,j=B.length;O<j;O++)y(B[O],L,U,N,k)}function b(A){A.target.removeEventListener("dispose",b);for(let L in c){let U=c[L],N=A.target.uuid;N in U&&(U[N].dispose(),delete U[N])}}this.render=function(A,L,U){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let N=r.getRenderTarget(),k=r.getActiveCubeFace(),B=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Pi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let j=f!==kn&&this.type===kn,G=f===kn&&this.type!==kn;for(let q=0,K=A.length;q<K;q++){let Q=A[q],te=Q.shadow;if(te===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(te.autoUpdate===!1&&te.needsUpdate===!1)continue;i.copy(te.mapSize);let xe=te.getFrameExtents();if(i.multiply(xe),s.copy(te.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/xe.x),i.x=s.x*xe.x,te.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/xe.y),i.y=s.y*xe.y,te.mapSize.y=s.y)),te.map===null||j===!0||G===!0){let Se=this.type!==kn?{minFilter:$t,magFilter:$t}:{};te.map!==null&&te.map.dispose(),te.map=new Pn(i.x,i.y,Se),te.map.texture.name=Q.name+".shadowMap",te.camera.updateProjectionMatrix()}r.setRenderTarget(te.map),r.clear();let we=te.getViewportCount();for(let Se=0;Se<we;Se++){let Ne=te.getViewport(Se);a.set(s.x*Ne.x,s.y*Ne.y,s.x*Ne.z,s.y*Ne.w),O.viewport(a),te.updateMatrices(Q,Se),n=te.getFrustum(),y(L,U,te.camera,Q,this.type)}te.isPointLightShadow!==!0&&this.type===kn&&_(te,U),te.needsUpdate=!1}f=this.type,g.needsUpdate=!1,r.setRenderTarget(N,k,B)}}var s0={[jo]:qo,[Yo]:Jo,[Zo]:$o,[da]:Ko,[qo]:jo,[Jo]:Yo,[$o]:Zo,[Ko]:da};function a0(r,e){let t=new function(){let M=!1,R=new nt,D=null,I=new nt(0,0,0,0);return{setMask:function(Z){D===Z||M||(r.colorMask(Z,Z,Z,Z),D=Z)},setLocked:function(Z){M=Z},setClear:function(Z,z,H,ne,pe){pe===!0&&(Z*=ne,z*=ne,H*=ne),R.set(Z,z,H,ne),I.equals(R)===!1&&(r.clearColor(Z,z,H,ne),I.copy(R))},reset:function(){M=!1,D=null,I.set(-1,0,0,0)}}},n=new function(){let M=!1,R=!1,D=null,I=null,Z=null;return{setReversed:function(z){if(R!==z){let H=e.get("EXT_clip_control");z?H.clipControlEXT(H.LOWER_LEFT_EXT,H.ZERO_TO_ONE_EXT):H.clipControlEXT(H.LOWER_LEFT_EXT,H.NEGATIVE_ONE_TO_ONE_EXT),R=z;let ne=Z;Z=null,this.setClear(ne)}},getReversed:function(){return R},setTest:function(z){z?le(r.DEPTH_TEST):oe(r.DEPTH_TEST)},setMask:function(z){D===z||M||(r.depthMask(z),D=z)},setFunc:function(z){if(R&&(z=s0[z]),I!==z){switch(z){case jo:r.depthFunc(r.NEVER);break;case qo:r.depthFunc(r.ALWAYS);break;case Yo:r.depthFunc(r.LESS);break;case da:r.depthFunc(r.LEQUAL);break;case Zo:r.depthFunc(r.EQUAL);break;case Ko:r.depthFunc(r.GEQUAL);break;case Jo:r.depthFunc(r.GREATER);break;case $o:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}I=z}},setLocked:function(z){M=z},setClear:function(z){Z!==z&&(R&&(z=1-z),r.clearDepth(z),Z=z)},reset:function(){M=!1,D=null,I=null,Z=null,R=!1}}},i=new function(){let M=!1,R=null,D=null,I=null,Z=null,z=null,H=null,ne=null,pe=null;return{setTest:function(se){M||(se?le(r.STENCIL_TEST):oe(r.STENCIL_TEST))},setMask:function(se){R===se||M||(r.stencilMask(se),R=se)},setFunc:function(se,_e,be){D===se&&I===_e&&Z===be||(r.stencilFunc(se,_e,be),D=se,I=_e,Z=be)},setOp:function(se,_e,be){z===se&&H===_e&&ne===be||(r.stencilOp(se,_e,be),z=se,H=_e,ne=be)},setLocked:function(se){M=se},setClear:function(se){pe!==se&&(r.clearStencil(se),pe=se)},reset:function(){M=!1,R=null,D=null,I=null,Z=null,z=null,H=null,ne=null,pe=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,m=null,v=null,g=null,f=null,_=null,x=null,y=new Re(0,0,0),b=0,A=!1,L=null,U=null,N=null,k=null,B=null,O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,G=0,q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(q)[1]),j=G>=1):q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),j=G>=2);let K=null,Q={},te=r.getParameter(r.SCISSOR_BOX),xe=r.getParameter(r.VIEWPORT),we=new nt().fromArray(te),Se=new nt().fromArray(xe);function Ne(M,R,D,I){let Z=new Uint8Array(4),z=r.createTexture();r.bindTexture(M,z),r.texParameteri(M,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(M,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let H=0;H<D;H++)M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?r.texImage3D(R,0,r.RGBA,1,1,I,0,r.RGBA,r.UNSIGNED_BYTE,Z):r.texImage2D(R+H,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Z);return z}let re={};function le(M){o[M]!==!0&&(r.enable(M),o[M]=!0)}function oe(M){o[M]!==!1&&(r.disable(M),o[M]=!1)}re[r.TEXTURE_2D]=Ne(r.TEXTURE_2D,r.TEXTURE_2D,1),re[r.TEXTURE_CUBE_MAP]=Ne(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[r.TEXTURE_2D_ARRAY]=Ne(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),re[r.TEXTURE_3D]=Ne(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),le(r.DEPTH_TEST),n.setFunc(da),S(!1),F(Ec),le(r.CULL_FACE),T(Pi);let Ce={[Zr]:r.FUNC_ADD,[Od]:r.FUNC_SUBTRACT,[Fd]:r.FUNC_REVERSE_SUBTRACT};Ce[Bd]=r.MIN,Ce[kd]=r.MAX;let ke={[zd]:r.ZERO,[Gd]:r.ONE,[Hd]:r.SRC_COLOR,[Wd]:r.SRC_ALPHA,[Kd]:r.SRC_ALPHA_SATURATE,[Yd]:r.DST_COLOR,[jd]:r.DST_ALPHA,[Vd]:r.ONE_MINUS_SRC_COLOR,[Xd]:r.ONE_MINUS_SRC_ALPHA,[Zd]:r.ONE_MINUS_DST_COLOR,[qd]:r.ONE_MINUS_DST_ALPHA,[Jd]:r.CONSTANT_COLOR,[$d]:r.ONE_MINUS_CONSTANT_COLOR,[Qd]:r.CONSTANT_ALPHA,[ep]:r.ONE_MINUS_CONSTANT_ALPHA};function T(M,R,D,I,Z,z,H,ne,pe,se){if(M!==Pi){if(d===!1&&(le(r.BLEND),d=!0),M===Ud)Z=Z||R,z=z||D,H=H||I,R===m&&Z===f||(r.blendEquationSeparate(Ce[R],Ce[Z]),m=R,f=Z),D===v&&I===g&&z===_&&H===x||(r.blendFuncSeparate(ke[D],ke[I],ke[z],ke[H]),v=D,g=I,_=z,x=H),ne.equals(y)!==!1&&pe===b||(r.blendColor(ne.r,ne.g,ne.b,pe),y.copy(ne),b=pe),p=M,A=!1;else if(M!==p||se!==A){if(m===Zr&&f===Zr||(r.blendEquation(r.FUNC_ADD),m=Zr,f=Zr),se)switch(M){case ua:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Rc:r.blendFunc(r.ONE,r.ONE);break;case Cc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ic:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}else switch(M){case ua:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Rc:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Cc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ic:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}v=null,g=null,_=null,x=null,y.set(0,0,0),b=0,p=M,A=se}}else d===!0&&(oe(r.BLEND),d=!1)}function S(M){L!==M&&(M?r.frontFace(r.CW):r.frontFace(r.CCW),L=M)}function F(M){M!==Nd?(le(r.CULL_FACE),M!==U&&(M===Ec?r.cullFace(r.BACK):M===Dd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):oe(r.CULL_FACE),U=M}function P(M,R,D){M?(le(r.POLYGON_OFFSET_FILL),k===R&&B===D||(r.polygonOffset(R,D),k=R,B=D)):oe(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:le,disable:oe,bindFramebuffer:function(M,R){return l[M]!==R&&(r.bindFramebuffer(M,R),l[M]=R,M===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=R),M===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=R),!0)},drawBuffers:function(M,R){let D=h,I=!1;if(M){D=c.get(R),D===void 0&&(D=[],c.set(R,D));let Z=M.textures;if(D.length!==Z.length||D[0]!==r.COLOR_ATTACHMENT0){for(let z=0,H=Z.length;z<H;z++)D[z]=r.COLOR_ATTACHMENT0+z;D.length=Z.length,I=!0}}else D[0]!==r.BACK&&(D[0]=r.BACK,I=!0);I&&r.drawBuffers(D)},useProgram:function(M){return u!==M&&(r.useProgram(M),u=M,!0)},setBlending:T,setMaterial:function(M,R){M.side===cn?oe(r.CULL_FACE):le(r.CULL_FACE);let D=M.side===en;R&&(D=!D),S(D),M.blending===ua&&M.transparent===!1?T(Pi):T(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),n.setFunc(M.depthFunc),n.setTest(M.depthTest),n.setMask(M.depthWrite),t.setMask(M.colorWrite);let I=M.stencilWrite;i.setTest(I),I&&(i.setMask(M.stencilWriteMask),i.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),i.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),P(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?le(r.SAMPLE_ALPHA_TO_COVERAGE):oe(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:S,setCullFace:F,setLineWidth:function(M){M!==N&&(j&&r.lineWidth(M),N=M)},setPolygonOffset:P,setScissorTest:function(M){M?le(r.SCISSOR_TEST):oe(r.SCISSOR_TEST)},activeTexture:function(M){M===void 0&&(M=r.TEXTURE0+O-1),K!==M&&(r.activeTexture(M),K=M)},bindTexture:function(M,R,D){D===void 0&&(D=K===null?r.TEXTURE0+O-1:K);let I=Q[D];I===void 0&&(I={type:void 0,texture:void 0},Q[D]=I),I.type===M&&I.texture===R||(K!==D&&(r.activeTexture(D),K=D),r.bindTexture(M,R||re[M]),I.type=M,I.texture=R)},unbindTexture:function(){let M=Q[K];M!==void 0&&M.type!==void 0&&(r.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},updateUBOMapping:function(M,R){let D=a.get(R);D===void 0&&(D=new WeakMap,a.set(R,D));let I=D.get(M);I===void 0&&(I=r.getUniformBlockIndex(R,M.name),D.set(M,I))},uniformBlockBinding:function(M,R){let D=a.get(R).get(M);s.get(R)!==D&&(r.uniformBlockBinding(R,D,M.__bindingPointIndex),s.set(R,D))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},scissor:function(M){we.equals(M)===!1&&(r.scissor(M.x,M.y,M.z,M.w),we.copy(M))},viewport:function(M){Se.equals(M)===!1&&(r.viewport(M.x,M.y,M.z,M.w),Se.copy(M))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},K=null,Q={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,m=null,v=null,g=null,f=null,_=null,x=null,y=new Re(0,0,0),b=0,A=!1,L=null,U=null,N=null,k=null,B=null,we.set(0,0,r.canvas.width,r.canvas.height),Se.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function o0(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,S){return p?new OffscreenCanvas(T,S):Ur("canvas")}function v(T,S,F){let P=1,M=ke(T);if((M.width>F||M.height>F)&&(P=F/Math.max(M.width,M.height)),P<1){if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let R=Math.floor(P*M.width),D=Math.floor(P*M.height);u===void 0&&(u=m(R,D));let I=S?m(R,D):u;return I.width=R,I.height=D,I.getContext("2d").drawImage(T,0,0,R,D),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+R+"x"+D+")."),I}return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),T}return T}function g(T){return T.generateMipmaps}function f(T){r.generateMipmap(T)}function _(T){return T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?r.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(T,S,F,P,M=!1){if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let R=S;if(S===r.RED&&(F===r.FLOAT&&(R=r.R32F),F===r.HALF_FLOAT&&(R=r.R16F),F===r.UNSIGNED_BYTE&&(R=r.R8)),S===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(R=r.R8UI),F===r.UNSIGNED_SHORT&&(R=r.R16UI),F===r.UNSIGNED_INT&&(R=r.R32UI),F===r.BYTE&&(R=r.R8I),F===r.SHORT&&(R=r.R16I),F===r.INT&&(R=r.R32I)),S===r.RG&&(F===r.FLOAT&&(R=r.RG32F),F===r.HALF_FLOAT&&(R=r.RG16F),F===r.UNSIGNED_BYTE&&(R=r.RG8)),S===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(R=r.RG8UI),F===r.UNSIGNED_SHORT&&(R=r.RG16UI),F===r.UNSIGNED_INT&&(R=r.RG32UI),F===r.BYTE&&(R=r.RG8I),F===r.SHORT&&(R=r.RG16I),F===r.INT&&(R=r.RG32I)),S===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(R=r.RGB8UI),F===r.UNSIGNED_SHORT&&(R=r.RGB16UI),F===r.UNSIGNED_INT&&(R=r.RGB32UI),F===r.BYTE&&(R=r.RGB8I),F===r.SHORT&&(R=r.RGB16I),F===r.INT&&(R=r.RGB32I)),S===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(R=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(R=r.RGBA16UI),F===r.UNSIGNED_INT&&(R=r.RGBA32UI),F===r.BYTE&&(R=r.RGBA8I),F===r.SHORT&&(R=r.RGBA16I),F===r.INT&&(R=r.RGBA32I)),S===r.RGB&&(F===r.UNSIGNED_INT_5_9_9_9_REV&&(R=r.RGB9_E5),F===r.UNSIGNED_INT_10F_11F_11F_REV&&(R=r.R11F_G11F_B10F)),S===r.RGBA){let D=M?Ps:$e.getTransfer(P);F===r.FLOAT&&(R=r.RGBA32F),F===r.HALF_FLOAT&&(R=r.RGBA16F),F===r.UNSIGNED_BYTE&&(R=D===lt?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(R=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(R=r.RGB5_A1)}return R!==r.R16F&&R!==r.R32F&&R!==r.RG16F&&R!==r.RG32F&&R!==r.RGBA16F&&R!==r.RGBA32F||e.get("EXT_color_buffer_float"),R}function y(T,S){let F;return T?S===null||S===sr||S===es?F=r.DEPTH24_STENCIL8:S===hn?F=r.DEPTH32F_STENCIL8:S===$r&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===sr||S===es?F=r.DEPTH_COMPONENT24:S===hn?F=r.DEPTH_COMPONENT32F:S===$r&&(F=r.DEPTH_COMPONENT16),F}function b(T,S){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==$t&&T.minFilter!==jt?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function A(T){let S=T.target;S.removeEventListener("dispose",A),(function(F){let P=n.get(F);if(P.__webglInit===void 0)return;let M=F.source,R=d.get(M);if(R){let D=R[P.__cacheKey];D.usedTimes--,D.usedTimes===0&&U(F),Object.keys(R).length===0&&d.delete(M)}n.remove(F)})(S),S.isVideoTexture&&h.delete(S)}function L(T){let S=T.target;S.removeEventListener("dispose",L),(function(F){let P=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let R=0;R<6;R++){if(Array.isArray(P.__webglFramebuffer[R]))for(let D=0;D<P.__webglFramebuffer[R].length;D++)r.deleteFramebuffer(P.__webglFramebuffer[R][D]);else r.deleteFramebuffer(P.__webglFramebuffer[R]);P.__webglDepthbuffer&&r.deleteRenderbuffer(P.__webglDepthbuffer[R])}else{if(Array.isArray(P.__webglFramebuffer))for(let R=0;R<P.__webglFramebuffer.length;R++)r.deleteFramebuffer(P.__webglFramebuffer[R]);else r.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&r.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&r.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let R=0;R<P.__webglColorRenderbuffer.length;R++)P.__webglColorRenderbuffer[R]&&r.deleteRenderbuffer(P.__webglColorRenderbuffer[R]);P.__webglDepthRenderbuffer&&r.deleteRenderbuffer(P.__webglDepthRenderbuffer)}let M=F.textures;for(let R=0,D=M.length;R<D;R++){let I=n.get(M[R]);I.__webglTexture&&(r.deleteTexture(I.__webglTexture),a.memory.textures--),n.remove(M[R])}n.remove(F)})(S)}function U(T){let S=n.get(T);r.deleteTexture(S.__webglTexture);let F=T.source;delete d.get(F)[S.__cacheKey],a.memory.textures--}let N=0;function k(T,S){let F=n.get(T);if(T.isVideoTexture&&(function(P){let M=a.render.frame;h.get(P)!==M&&(h.set(P,M),P.update())})(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){let P=T.image;if(P===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(P.complete!==!1)return void Q(F,T,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+S)}let B={[Jt]:r.REPEAT,[bi]:r.CLAMP_TO_EDGE,[Dr]:r.MIRRORED_REPEAT},O={[$t]:r.NEAREST,[tl]:r.NEAREST_MIPMAP_NEAREST,[rr]:r.NEAREST_MIPMAP_LINEAR,[jt]:r.LINEAR,[Jr]:r.LINEAR_MIPMAP_NEAREST,[zn]:r.LINEAR_MIPMAP_LINEAR},j={[_p]:r.NEVER,[bp]:r.ALWAYS,[vp]:r.LESS,[ph]:r.LEQUAL,[xp]:r.EQUAL,[Sp]:r.GEQUAL,[yp]:r.GREATER,[Mp]:r.NOTEQUAL};function G(T,S){if(S.type!==hn||e.has("OES_texture_float_linear")!==!1||S.magFilter!==jt&&S.magFilter!==Jr&&S.magFilter!==rr&&S.magFilter!==zn&&S.minFilter!==jt&&S.minFilter!==Jr&&S.minFilter!==rr&&S.minFilter!==zn||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(T,r.TEXTURE_WRAP_S,B[S.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,B[S.wrapT]),T!==r.TEXTURE_3D&&T!==r.TEXTURE_2D_ARRAY||r.texParameteri(T,r.TEXTURE_WRAP_R,B[S.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,O[S.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,O[S.minFilter]),S.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,j[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===$t||S.minFilter!==rr&&S.minFilter!==zn||S.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");r.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function q(T,S){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",A));let P=S.source,M=d.get(P);M===void 0&&(M={},d.set(P,M));let R=(function(D){let I=[];return I.push(D.wrapS),I.push(D.wrapT),I.push(D.wrapR||0),I.push(D.magFilter),I.push(D.minFilter),I.push(D.anisotropy),I.push(D.internalFormat),I.push(D.format),I.push(D.type),I.push(D.generateMipmaps),I.push(D.premultiplyAlpha),I.push(D.flipY),I.push(D.unpackAlignment),I.push(D.colorSpace),I.join()})(S);if(R!==T.__cacheKey){M[R]===void 0&&(M[R]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,F=!0),M[R].usedTimes++;let D=M[T.__cacheKey];D!==void 0&&(M[T.__cacheKey].usedTimes--,D.usedTimes===0&&U(S)),T.__cacheKey=R,T.__webglTexture=M[R].texture}return F}function K(T,S,F){return Math.floor(Math.floor(T/F)/S)}function Q(T,S,F){let P=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(P=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(P=r.TEXTURE_3D);let M=q(T,S),R=S.source;t.bindTexture(P,T.__webglTexture,r.TEXTURE0+F);let D=n.get(R);if(R.version!==D.__version||M===!0){t.activeTexture(r.TEXTURE0+F);let I=$e.getPrimaries($e.workingColorSpace),Z=S.colorSpace===ar?null:$e.getPrimaries(S.colorSpace),z=S.colorSpace===ar||I===Z?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,z);let H=v(S.image,!1,i.maxTextureSize);H=Ce(S,H);let ne=s.convert(S.format,S.colorSpace),pe=s.convert(S.type),se,_e=x(S.internalFormat,ne,pe,S.colorSpace,S.isVideoTexture);G(P,S);let be=S.mipmaps,Ie=S.isVideoTexture!==!0,qe=D.__version===void 0||M===!0,et=R.dataReady,tt=b(S,H);if(S.isDepthTexture)_e=y(S.format===ma,S.type),qe&&(Ie?t.texStorage2D(r.TEXTURE_2D,1,_e,H.width,H.height):t.texImage2D(r.TEXTURE_2D,0,_e,H.width,H.height,0,ne,pe,null));else if(S.isDataTexture)if(be.length>0){Ie&&qe&&t.texStorage2D(r.TEXTURE_2D,tt,_e,be[0].width,be[0].height);for(let fe=0,Pe=be.length;fe<Pe;fe++)se=be[fe],Ie?et&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,se.width,se.height,ne,pe,se.data):t.texImage2D(r.TEXTURE_2D,fe,_e,se.width,se.height,0,ne,pe,se.data);S.generateMipmaps=!1}else Ie?(qe&&t.texStorage2D(r.TEXTURE_2D,tt,_e,H.width,H.height),et&&(function(fe,Pe,He,X){let Y=fe.updateRanges;if(Y.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Pe.width,Pe.height,He,X,Pe.data);else{Y.sort((C,ve)=>C.start-ve.start);let ce=0;for(let C=1;C<Y.length;C++){let ve=Y[ce],Ee=Y[C],Te=ve.start+ve.count,Ye=K(Ee.start,Pe.width,4),ct=K(ve.start,Pe.width,4);Ee.start<=Te+1&&Ye===ct&&K(Ee.start+Ee.count-1,Pe.width,4)===Ye?ve.count=Math.max(ve.count,Ee.start+Ee.count-ve.start):(++ce,Y[ce]=Ee)}Y.length=ce+1;let $=r.getParameter(r.UNPACK_ROW_LENGTH),ye=r.getParameter(r.UNPACK_SKIP_PIXELS),Ue=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Pe.width);for(let C=0,ve=Y.length;C<ve;C++){let Ee=Y[C],Te=Math.floor(Ee.start/4),Ye=Math.ceil(Ee.count/4),ct=Te%Pe.width,it=Math.floor(Te/Pe.width),Wt=Ye;r.pixelStorei(r.UNPACK_SKIP_PIXELS,ct),r.pixelStorei(r.UNPACK_SKIP_ROWS,it),t.texSubImage2D(r.TEXTURE_2D,0,ct,it,Wt,1,He,X,Pe.data)}fe.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,$),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ye),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ue)}})(S,H,ne,pe)):t.texImage2D(r.TEXTURE_2D,0,_e,H.width,H.height,0,ne,pe,H.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ie&&qe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,tt,_e,be[0].width,be[0].height,H.depth);for(let fe=0,Pe=be.length;fe<Pe;fe++)if(se=be[fe],S.format!==un)if(ne!==null)if(Ie){if(et)if(S.layerUpdates.size>0){let He=yh(se.width,se.height,S.format,S.type);for(let X of S.layerUpdates){let Y=se.data.subarray(X*He/se.data.BYTES_PER_ELEMENT,(X+1)*He/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,X,se.width,se.height,1,ne,Y)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,se.width,se.height,H.depth,ne,se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,fe,_e,se.width,se.height,H.depth,0,se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?et&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,se.width,se.height,H.depth,ne,pe,se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,fe,_e,se.width,se.height,H.depth,0,ne,pe,se.data)}else{Ie&&qe&&t.texStorage2D(r.TEXTURE_2D,tt,_e,be[0].width,be[0].height);for(let fe=0,Pe=be.length;fe<Pe;fe++)se=be[fe],S.format!==un?ne!==null?Ie?et&&t.compressedTexSubImage2D(r.TEXTURE_2D,fe,0,0,se.width,se.height,ne,se.data):t.compressedTexImage2D(r.TEXTURE_2D,fe,_e,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?et&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,se.width,se.height,ne,pe,se.data):t.texImage2D(r.TEXTURE_2D,fe,_e,se.width,se.height,0,ne,pe,se.data)}else if(S.isDataArrayTexture)if(Ie){if(qe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,tt,_e,H.width,H.height,H.depth),et)if(S.layerUpdates.size>0){let fe=yh(H.width,H.height,S.format,S.type);for(let Pe of S.layerUpdates){let He=H.data.subarray(Pe*fe/H.data.BYTES_PER_ELEMENT,(Pe+1)*fe/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Pe,H.width,H.height,1,ne,pe,He)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,ne,pe,H.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,_e,H.width,H.height,H.depth,0,ne,pe,H.data);else if(S.isData3DTexture)Ie?(qe&&t.texStorage3D(r.TEXTURE_3D,tt,_e,H.width,H.height,H.depth),et&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,ne,pe,H.data)):t.texImage3D(r.TEXTURE_3D,0,_e,H.width,H.height,H.depth,0,ne,pe,H.data);else if(S.isFramebufferTexture){if(qe)if(Ie)t.texStorage2D(r.TEXTURE_2D,tt,_e,H.width,H.height);else{let fe=H.width,Pe=H.height;for(let He=0;He<tt;He++)t.texImage2D(r.TEXTURE_2D,He,_e,fe,Pe,0,ne,pe,null),fe>>=1,Pe>>=1}}else if(be.length>0){if(Ie&&qe){let fe=ke(be[0]);t.texStorage2D(r.TEXTURE_2D,tt,_e,fe.width,fe.height)}for(let fe=0,Pe=be.length;fe<Pe;fe++)se=be[fe],Ie?et&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,ne,pe,se):t.texImage2D(r.TEXTURE_2D,fe,_e,ne,pe,se);S.generateMipmaps=!1}else if(Ie){if(qe){let fe=ke(H);t.texStorage2D(r.TEXTURE_2D,tt,_e,fe.width,fe.height)}et&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne,pe,H)}else t.texImage2D(r.TEXTURE_2D,0,_e,ne,pe,H);g(S)&&f(P),D.__version=R.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function te(T,S,F,P,M,R){let D=s.convert(F.format,F.colorSpace),I=s.convert(F.type),Z=x(F.internalFormat,D,I,F.colorSpace),z=n.get(S),H=n.get(F);if(H.__renderTarget=S,!z.__hasExternalTextures){let ne=Math.max(1,S.width>>R),pe=Math.max(1,S.height>>R);M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?t.texImage3D(M,R,Z,ne,pe,S.depth,0,D,I,null):t.texImage2D(M,R,Z,ne,pe,0,D,I,null)}t.bindFramebuffer(r.FRAMEBUFFER,T),oe(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,P,M,H.__webglTexture,0,le(S)):(M===r.TEXTURE_2D||M>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&M<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,P,M,H.__webglTexture,R),t.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(T,S,F){if(r.bindRenderbuffer(r.RENDERBUFFER,T),S.depthBuffer){let P=S.depthTexture,M=P&&P.isDepthTexture?P.type:null,R=y(S.stencilBuffer,M),D=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,I=le(S);oe(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I,R,S.width,S.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,I,R,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,R,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,D,r.RENDERBUFFER,T)}else{let P=S.textures;for(let M=0;M<P.length;M++){let R=P[M],D=s.convert(R.format,R.colorSpace),I=s.convert(R.type),Z=x(R.internalFormat,D,I,R.colorSpace),z=le(S);F&&oe(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,z,Z,S.width,S.height):oe(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,z,Z,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Z,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,T),!S.depthTexture||!S.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let F=n.get(S.depthTexture);F.__renderTarget=S,F.__webglTexture&&S.depthTexture.image.width===S.width&&S.depthTexture.image.height===S.height||(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),k(S.depthTexture,0);let P=F.__webglTexture,M=le(S);if(S.depthTexture.format===fa)oe(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,P,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,P,0);else{if(S.depthTexture.format!==ma)throw new Error("Unknown depthTexture format");oe(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,P,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,P,0)}}function Se(T){let S=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){let P=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),P){let M=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,P.removeEventListener("dispose",M)};P.addEventListener("dispose",M),S.__depthDisposeCallback=M}S.__boundDepthTexture=P}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let P=T.texture.mipmaps;P&&P.length>0?we(S.__webglFramebuffer[0],T):we(S.__webglFramebuffer,T)}else if(F){S.__webglDepthbuffer=[];for(let P=0;P<6;P++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[P]),S.__webglDepthbuffer[P]===void 0)S.__webglDepthbuffer[P]=r.createRenderbuffer(),xe(S.__webglDepthbuffer[P],T,!1);else{let M=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,R=S.__webglDepthbuffer[P];r.bindRenderbuffer(r.RENDERBUFFER,R),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,R)}}else{let P=T.texture.mipmaps;if(P&&P.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),xe(S.__webglDepthbuffer,T,!1);else{let M=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,R=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,R),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,R)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ne=[],re=[];function le(T){return Math.min(i.maxSamples,T.samples)}function oe(T){let S=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ce(T,S){let F=T.colorSpace,P=T.format,M=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Dt&&F!==ar&&($e.getTransfer(F)===lt?P===un&&M===Gn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function ke(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=function(){let T=N;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),N+=1,T},this.resetTextureUnits=function(){N=0},this.setTexture2D=k,this.setTexture2DArray=function(T,S){let F=n.get(T);T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version?Q(F,T,S):t.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+S)},this.setTexture3D=function(T,S){let F=n.get(T);T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version?Q(F,T,S):t.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+S)},this.setTextureCube=function(T,S){let F=n.get(T);T.version>0&&F.__version!==T.version?(function(P,M,R){if(M.image.length!==6)return;let D=q(P,M),I=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+R);let Z=n.get(I);if(I.version!==Z.__version||D===!0){t.activeTexture(r.TEXTURE0+R);let z=$e.getPrimaries($e.workingColorSpace),H=M.colorSpace===ar?null:$e.getPrimaries(M.colorSpace),ne=M.colorSpace===ar||z===H?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let pe=M.isCompressedTexture||M.image[0].isCompressedTexture,se=M.image[0]&&M.image[0].isDataTexture,_e=[];for(let Y=0;Y<6;Y++)_e[Y]=pe||se?se?M.image[Y].image:M.image[Y]:v(M.image[Y],!0,i.maxCubemapSize),_e[Y]=Ce(M,_e[Y]);let be=_e[0],Ie=s.convert(M.format,M.colorSpace),qe=s.convert(M.type),et=x(M.internalFormat,Ie,qe,M.colorSpace),tt=M.isVideoTexture!==!0,fe=Z.__version===void 0||D===!0,Pe=I.dataReady,He,X=b(M,be);if(G(r.TEXTURE_CUBE_MAP,M),pe){tt&&fe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,X,et,be.width,be.height);for(let Y=0;Y<6;Y++){He=_e[Y].mipmaps;for(let ce=0;ce<He.length;ce++){let $=He[ce];M.format!==un?Ie!==null?tt?Pe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,$.width,$.height,Ie,$.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,et,$.width,$.height,0,$.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):tt?Pe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,$.width,$.height,Ie,qe,$.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,et,$.width,$.height,0,Ie,qe,$.data)}}}else{if(He=M.mipmaps,tt&&fe){He.length>0&&X++;let Y=ke(_e[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,X,et,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(se){tt?Pe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,_e[Y].width,_e[Y].height,Ie,qe,_e[Y].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,et,_e[Y].width,_e[Y].height,0,Ie,qe,_e[Y].data);for(let ce=0;ce<He.length;ce++){let $=He[ce].image[Y].image;tt?Pe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,$.width,$.height,Ie,qe,$.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,et,$.width,$.height,0,Ie,qe,$.data)}}else{tt?Pe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ie,qe,_e[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,et,Ie,qe,_e[Y]);for(let ce=0;ce<He.length;ce++){let $=He[ce];tt?Pe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,Ie,qe,$.image[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,et,Ie,qe,$.image[Y])}}}g(M)&&f(r.TEXTURE_CUBE_MAP),Z.__version=I.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version})(F,T,S):t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+S)},this.rebindTextures=function(T,S,F){let P=n.get(T);S!==void 0&&te(P.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&Se(T)},this.setupRenderTarget=function(T){let S=T.texture,F=n.get(T),P=n.get(S);T.addEventListener("dispose",L);let M=T.textures,R=T.isWebGLCubeRenderTarget===!0,D=M.length>1;if(D||(P.__webglTexture===void 0&&(P.__webglTexture=r.createTexture()),P.__version=S.version,a.memory.textures++),R){F.__webglFramebuffer=[];for(let I=0;I<6;I++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[I]=[];for(let Z=0;Z<S.mipmaps.length;Z++)F.__webglFramebuffer[I][Z]=r.createFramebuffer()}else F.__webglFramebuffer[I]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let I=0;I<S.mipmaps.length;I++)F.__webglFramebuffer[I]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(D)for(let I=0,Z=M.length;I<Z;I++){let z=n.get(M[I]);z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture(),a.memory.textures++)}if(T.samples>0&&oe(T)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let I=0;I<M.length;I++){let Z=M[I];F.__webglColorRenderbuffer[I]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[I]);let z=s.convert(Z.format,Z.colorSpace),H=s.convert(Z.type),ne=x(Z.internalFormat,z,H,Z.colorSpace,T.isXRRenderTarget===!0),pe=le(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,pe,ne,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.RENDERBUFFER,F.__webglColorRenderbuffer[I])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),xe(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(R){t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture),G(r.TEXTURE_CUBE_MAP,S);for(let I=0;I<6;I++)if(S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)te(F.__webglFramebuffer[I][Z],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+I,Z);else te(F.__webglFramebuffer[I],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0);g(S)&&f(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(D){for(let I=0,Z=M.length;I<Z;I++){let z=M[I],H=n.get(z),ne=r.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ne=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ne,H.__webglTexture),G(ne,z),te(F.__webglFramebuffer,T,z,r.COLOR_ATTACHMENT0+I,ne,0),g(z)&&f(ne)}t.unbindTexture()}else{let I=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(I=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(I,P.__webglTexture),G(I,S),S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)te(F.__webglFramebuffer[Z],T,S,r.COLOR_ATTACHMENT0,I,Z);else te(F.__webglFramebuffer,T,S,r.COLOR_ATTACHMENT0,I,0);g(S)&&f(I),t.unbindTexture()}T.depthBuffer&&Se(T)},this.updateRenderTargetMipmap=function(T){let S=T.textures;for(let F=0,P=S.length;F<P;F++){let M=S[F];if(g(M)){let R=_(T),D=n.get(M).__webglTexture;t.bindTexture(R,D),f(R),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(T){if(T.samples>0){if(oe(T)===!1){let S=T.textures,F=T.width,P=T.height,M=r.COLOR_BUFFER_BIT,R=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,D=n.get(T),I=S.length>1;if(I)for(let z=0;z<S.length;z++)t.bindFramebuffer(r.FRAMEBUFFER,D.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,D.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,D.__webglMultisampledFramebuffer);let Z=T.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,D.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,D.__webglFramebuffer);for(let z=0;z<S.length;z++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(M|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(M|=r.STENCIL_BUFFER_BIT)),I){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,D.__webglColorRenderbuffer[z]);let H=n.get(S[z]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,H,0)}r.blitFramebuffer(0,0,F,P,0,0,F,P,M,r.NEAREST),l===!0&&(Ne.length=0,re.length=0,Ne.push(r.COLOR_ATTACHMENT0+z),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ne.push(R),re.push(R),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,re)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),I)for(let z=0;z<S.length;z++){t.bindFramebuffer(r.FRAMEBUFFER,D.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.RENDERBUFFER,D.__webglColorRenderbuffer[z]);let H=n.get(S[z]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,D.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.TEXTURE_2D,H,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,D.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let S=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=te,this.useMultisampledRTT=oe}function l0(r,e){return{convert:function(t,n=ar){let i,s=$e.getTransfer(n);if(t===Gn)return r.UNSIGNED_BYTE;if(t===il)return r.UNSIGNED_SHORT_4_4_4_4;if(t===rl)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Dc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Uc)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Lc)return r.BYTE;if(t===Nc)return r.SHORT;if(t===$r)return r.UNSIGNED_SHORT;if(t===nl)return r.INT;if(t===sr)return r.UNSIGNED_INT;if(t===hn)return r.FLOAT;if(t===Qr)return r.HALF_FLOAT;if(t===up)return r.ALPHA;if(t===dp)return r.RGB;if(t===un)return r.RGBA;if(t===fa)return r.DEPTH_COMPONENT;if(t===ma)return r.DEPTH_STENCIL;if(t===sl)return r.RED;if(t===al)return r.RED_INTEGER;if(t===pp)return r.RG;if(t===Oc)return r.RG_INTEGER;if(t===Fc)return r.RGBA_INTEGER;if(t===ol||t===ll||t===cl||t===hl)if(s===lt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===ol)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===ll)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===cl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===hl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===ol)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===ll)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===cl)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===hl)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Bc||t===kc||t===zc||t===Gc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Bc)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===kc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===zc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Gc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Hc||t===Vc||t===Wc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Hc||t===Vc)return s===lt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Wc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Xc||t===jc||t===qc||t===Yc||t===Zc||t===Kc||t===Jc||t===$c||t===Qc||t===eh||t===th||t===nh||t===ih||t===rh){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Xc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===jc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===qc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Yc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Zc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Kc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Jc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===$c)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Qc)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===eh)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===th)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===nh)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===ih)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===rh)return s===lt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===sh||t===ah||t===oh){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===sh)return s===lt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ah)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===oh)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===lh||t===ch||t===hh||t===uh){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===lh)return i.COMPRESSED_RED_RGTC1_EXT;if(t===ch)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===hh)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===uh)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===es?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Nh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Sn({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dh=class extends ri{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,m=null,v=typeof XRWebGLBinding<"u",g=new Nh,f={},_=t.getContextAttributes(),x=null,y=null,b=[],A=[],L=new ie,U=null,N=new bt;N.viewport=new nt;let k=new bt;k.viewport=new nt;let B=[N,k],O=new Wo,j=null,G=null;function q(re){let le=A.indexOf(re.inputSource);if(le===-1)return;let oe=b[le];oe!==void 0&&(oe.update(re.inputSource,re.frame,c||a),oe.dispatchEvent({type:re.type,data:re.inputSource}))}function K(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",Q);for(let re=0;re<b.length;re++){let le=A[re];le!==null&&(A[re]=null,b[re].disconnect(le))}j=null,G=null,g.reset();for(let re in f)delete f[re];e.setRenderTarget(x),p=null,d=null,u=null,i=null,y=null,Ne.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}function Q(re){for(let le=0;le<re.removed.length;le++){let oe=re.removed[le],Ce=A.indexOf(oe);Ce>=0&&(A[Ce]=null,b[Ce].disconnect(oe))}for(let le=0;le<re.added.length;le++){let oe=re.added[le],Ce=A.indexOf(oe);if(Ce===-1){for(let T=0;T<b.length;T++){if(T>=A.length){A.push(oe),Ce=T;break}if(A[T]===null){A[T]=oe,Ce=T;break}}if(Ce===-1)break}let ke=b[Ce];ke&&ke.connect(oe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let le=b[re];return le===void 0&&(le=new zr,b[re]=le),le.getTargetRaySpace()},this.getControllerGrip=function(re){let le=b[re];return le===void 0&&(le=new zr,b[re]=le),le.getGripSpace()},this.getHand=function(re){let le=b[re];return le===void 0&&(le=new zr,b[re]=le),le.getHandSpace()},this.setFramebufferScaleFactor=function(re){s=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(re){if(i=re,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",K),i.addEventListener("inputsourceschange",Q),_.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,oe=null,Ce=null;_.depth&&(Ce=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=_.stencil?ma:fa,oe=_.stencil?es:sr);let ke={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(ke),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Pn(d.textureWidth,d.textureHeight,{format:un,type:Gn,depthTexture:new js(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let le={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,le),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Pn(p.framebufferWidth,p.framebufferHeight,{format:un,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ne.setContext(i),Ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};let te=new w,xe=new w;function we(re,le){le===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(le.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(i===null)return;let le=re.near,oe=re.far;g.texture!==null&&(g.depthNear>0&&(le=g.depthNear),g.depthFar>0&&(oe=g.depthFar)),O.near=k.near=N.near=le,O.far=k.far=N.far=oe,j===O.near&&G===O.far||(i.updateRenderState({depthNear:O.near,depthFar:O.far}),j=O.near,G=O.far),O.layers.mask=6|re.layers.mask,N.layers.mask=3&O.layers.mask,k.layers.mask=5&O.layers.mask;let Ce=re.parent,ke=O.cameras;we(O,Ce);for(let T=0;T<ke.length;T++)we(ke[T],Ce);ke.length===2?(function(T,S,F){te.setFromMatrixPosition(S.matrixWorld),xe.setFromMatrixPosition(F.matrixWorld);let P=te.distanceTo(xe),M=S.projectionMatrix.elements,R=F.projectionMatrix.elements,D=M[14]/(M[10]-1),I=M[14]/(M[10]+1),Z=(M[9]+1)/M[5],z=(M[9]-1)/M[5],H=(M[8]-1)/M[0],ne=(R[8]+1)/R[0],pe=D*H,se=D*ne,_e=P/(-H+ne),be=_e*-H;if(S.matrixWorld.decompose(T.position,T.quaternion,T.scale),T.translateX(be),T.translateZ(_e),T.matrixWorld.compose(T.position,T.quaternion,T.scale),T.matrixWorldInverse.copy(T.matrixWorld).invert(),M[10]===-1)T.projectionMatrix.copy(S.projectionMatrix),T.projectionMatrixInverse.copy(S.projectionMatrixInverse);else{let Ie=D+_e,qe=I+_e,et=pe-be,tt=se+(P-be),fe=Z*I/qe*Ie,Pe=z*I/qe*Ie;T.projectionMatrix.makePerspective(et,tt,fe,Pe,Ie,qe),T.projectionMatrixInverse.copy(T.projectionMatrix).invert()}})(O,N,k):O.projectionMatrix.copy(N.projectionMatrix),(function(T,S,F){F===null?T.matrix.copy(S.matrixWorld):(T.matrix.copy(F.matrixWorld),T.matrix.invert(),T.matrix.multiply(S.matrixWorld)),T.matrix.decompose(T.position,T.quaternion,T.scale),T.updateMatrixWorld(!0),T.projectionMatrix.copy(S.projectionMatrix),T.projectionMatrixInverse.copy(S.projectionMatrixInverse),T.isPerspectiveCamera&&(T.fov=2*Yi*Math.atan(1/T.projectionMatrix.elements[5]),T.zoom=1)})(re,O,Ce)},this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||p!==null)return l},this.setFoveation=function(re){l=re,d!==null&&(d.fixedFoveation=re),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=re)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(re){return f[re]};let Se=null,Ne=new nf;Ne.setAnimationLoop(function(re,le){if(h=le.getViewerPose(c||a),m=le,h!==null){let oe=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ce=!1;oe.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let T=0;T<oe.length;T++){let S=oe[T],F=null;if(p!==null)F=p.getViewport(S);else{let M=u.getViewSubImage(d,S);F=M.viewport,T===0&&(e.setRenderTargetTextures(y,M.colorTexture,M.depthStencilTexture),e.setRenderTarget(y))}let P=B[T];P===void 0&&(P=new bt,P.layers.enable(T),P.viewport=new nt,B[T]=P),P.matrix.fromArray(S.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(S.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(F.x,F.y,F.width,F.height),T===0&&(O.matrix.copy(P.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(P)}let ke=i.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let T=u.getDepthInformation(oe[0]);T&&T.isValid&&T.texture&&g.init(T,i.renderState)}if(ke&&ke.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let T=0;T<oe.length;T++){let S=oe[T].camera;if(S){let F=f[S];F||(F=new qs,f[S]=F);let P=u.getCameraImage(S);F.sourceTexture=P}}}}for(let oe=0;oe<b.length;oe++){let Ce=A[oe],ke=b[oe];Ce!==null&&ke!==void 0&&ke.update(Ce,le,c||a)}Se&&Se(re,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),m=null}),this.setAnimationLoop=function(re){Se=re},this.dispose=function(){}}},cr=new Mn,c0=new Le;function h0(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===en&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===en&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(i.envMap.value=o,cr.copy(l),cr.x*=-1,cr.y*=-1,cr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(cr.y*=-1,cr.z*=-1),i.envMapRotation.value.setFromMatrix4(c0.makeRotationFromEuler(cr)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,_h(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===en&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(i,s,l)):s.isMeshMatcapMaterial?(n(i,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(c,h,u,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function u0(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,d,p,m){let v=u.value,g=d+"_"+p;if(m[g]===void 0)return m[g]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let f=m[g];if(typeof v=="number"||typeof v=="boolean"){if(f!==v)return m[g]=v,!0}else if(f.equals(v)===!1)return f.copy(v),!0}return!1}function c(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&((function(g){let f=g.uniforms,_=0,x=16;for(let b=0,A=f.length;b<A;b++){let L=Array.isArray(f[b])?f[b]:[f[b]];for(let U=0,N=L.length;U<N;U++){let k=L[U],B=Array.isArray(k.value)?k.value:[k.value];for(let O=0,j=B.length;O<j;O++){let G=c(B[O]),q=_%x,K=q%G.boundary,Q=q+K;_+=K,Q!==0&&x-Q<G.storage&&(_+=x-Q),k.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=G.storage}}}let y=_%x;y>0&&(_+=x-y),g.__size=_,g.__cache={}})(u),p=(function(g){let f=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=f;let _=r.createBuffer(),x=g.__size,y=g.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,x,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,f,_),_})(u),i[u.id]=p,u.addEventListener("dispose",h));let m=d.program;n.updateUBOMapping(u,m);let v=e.render.frame;s[u.id]!==v&&((function(g){let f=i[g.id],_=g.uniforms,x=g.__cache;r.bindBuffer(r.UNIFORM_BUFFER,f);for(let y=0,b=_.length;y<b;y++){let A=Array.isArray(_[y])?_[y]:[_[y]];for(let L=0,U=A.length;L<U;L++){let N=A[L];if(l(N,y,L,x)===!0){let k=N.__offset,B=Array.isArray(N.value)?N.value:[N.value],O=0;for(let j=0;j<B.length;j++){let G=B[j],q=c(G);typeof G=="number"||typeof G=="boolean"?(N.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,k+O,N.__data)):G.isMatrix3?(N.__data[0]=G.elements[0],N.__data[1]=G.elements[1],N.__data[2]=G.elements[2],N.__data[3]=0,N.__data[4]=G.elements[3],N.__data[5]=G.elements[4],N.__data[6]=G.elements[5],N.__data[7]=0,N.__data[8]=G.elements[6],N.__data[9]=G.elements[7],N.__data[10]=G.elements[8],N.__data[11]=0):(G.toArray(N.__data,O),O+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,N.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var ml=class{constructor(e={}){let{canvas:t=Tp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let m=new Uint32Array(4),v=new Int32Array(4),g=null,f=null,_=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,b=!1;this._outputColorSpace=ot;let A=0,L=0,U=null,N=-1,k=null,B=new nt,O=new nt,j=null,G=new Re(0),q=0,K=t.width,Q=t.height,te=1,xe=null,we=null,Se=new nt(0,0,K,Q),Ne=new nt(0,0,K,Q),re=!1,le=new Ei,oe=!1,Ce=!1,ke=new Le,T=new w,S=new nt,F={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},P=!1;function M(){return U===null?te:1}let R,D,I,Z,z,H,ne,pe,se,_e,be,Ie,qe,et,tt,fe,Pe,He,X,Y,ce,$,ye,Ue,C=n;function ve(E,V){return t.getContext(E,V)}try{let E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ye,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",it,!1),C===null){let V="webgl2";if(C=ve(V,E),C===null)throw ve(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}function Ee(){R=new qm(C),R.init(),$=new l0(C,R),D=new Hm(C,R,e,$),I=new a0(C,R),D.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),Z=new Km(C),z=new Kg,H=new o0(C,R,I,z,D,$,Z),ne=new Wm(y),pe=new jm(y),se=new Fm(C),ye=new zm(C,se),_e=new Ym(C,se,Z,ye),be=new $m(C,_e,se,Z),X=new Jm(C,D,H),fe=new Vm(z),Ie=new Zg(y,ne,pe,R,D,ye,fe),qe=new h0(y,z),et=new $g,tt=new i0(R),He=new km(y,ne,pe,I,be,p,l),Pe=new r0(y,be,D),Ue=new u0(C,Z,D,I),Y=new Gm(C,R,Z),ce=new Zm(C,R,Z),Z.programs=Ie.programs,y.capabilities=D,y.extensions=R,y.properties=z,y.renderLists=et,y.shadowMap=Pe,y.state=I,y.info=Z}Ee();let Te=new Dh(y,C);function Ye(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let E=Z.autoReset,V=Pe.enabled,J=Pe.autoUpdate,ee=Pe.needsUpdate,W=Pe.type;Ee(),Z.autoReset=E,Pe.enabled=V,Pe.autoUpdate=J,Pe.needsUpdate=ee,Pe.type=W}function it(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Wt(E){let V=E.target;V.removeEventListener("dispose",Wt),(function(J){(function(ee){let W=z.get(ee).programs;W!==void 0&&(W.forEach(function(ae){Ie.releaseProgram(ae)}),ee.isShaderMaterial&&Ie.releaseShaderCache(ee))})(J),z.remove(J)})(V)}function Xn(E,V,J){E.transparent===!0&&E.side===cn&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,Ta(E,V,J),E.side=Ii,E.needsUpdate=!0,Ta(E,V,J),E.side=cn):Ta(E,V,J)}this.xr=Te,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let E=R.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=R.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(E){E!==void 0&&(te=E,this.setSize(K,Q,!1))},this.getSize=function(E){return E.set(K,Q)},this.setSize=function(E,V,J=!0){Te.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(K=E,Q=V,t.width=Math.floor(E*te),t.height=Math.floor(V*te),J===!0&&(t.style.width=E+"px",t.style.height=V+"px"),this.setViewport(0,0,E,V))},this.getDrawingBufferSize=function(E){return E.set(K*te,Q*te).floor()},this.setDrawingBufferSize=function(E,V,J){K=E,Q=V,te=J,t.width=Math.floor(E*J),t.height=Math.floor(V*J),this.setViewport(0,0,E,V)},this.getCurrentViewport=function(E){return E.copy(B)},this.getViewport=function(E){return E.copy(Se)},this.setViewport=function(E,V,J,ee){E.isVector4?Se.set(E.x,E.y,E.z,E.w):Se.set(E,V,J,ee),I.viewport(B.copy(Se).multiplyScalar(te).round())},this.getScissor=function(E){return E.copy(Ne)},this.setScissor=function(E,V,J,ee){E.isVector4?Ne.set(E.x,E.y,E.z,E.w):Ne.set(E,V,J,ee),I.scissor(O.copy(Ne).multiplyScalar(te).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(E){I.setScissorTest(re=E)},this.setOpaqueSort=function(E){xe=E},this.setTransparentSort=function(E){we=E},this.getClearColor=function(E){return E.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,J=!0){let ee=0;if(E){let W=!1;if(U!==null){let ae=U.texture.format;W=ae===Fc||ae===Oc||ae===al}if(W){let ae=U.texture.type,ge=ae===Gn||ae===sr||ae===$r||ae===es||ae===il||ae===rl,Me=He.getClearColor(),Ae=He.getClearAlpha(),Oe=Me.r,Be=Me.g,Fe=Me.b;ge?(m[0]=Oe,m[1]=Be,m[2]=Fe,m[3]=Ae,C.clearBufferuiv(C.COLOR,0,m)):(v[0]=Oe,v[1]=Be,v[2]=Fe,v[3]=Ae,C.clearBufferiv(C.COLOR,0,v))}else ee|=C.COLOR_BUFFER_BIT}V&&(ee|=C.DEPTH_BUFFER_BIT),J&&(ee|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ye,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",it,!1),He.dispose(),et.dispose(),tt.dispose(),z.dispose(),ne.dispose(),pe.dispose(),be.dispose(),ye.dispose(),Ue.dispose(),Ie.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",tn),Te.removeEventListener("sessionend",fr),pn.stop()},this.renderBufferDirect=function(E,V,J,ee,W,ae){V===null&&(V=F);let ge=W.isMesh&&W.matrixWorld.determinant()<0,Me=(function(Ke,_t,Lt,je,ze){_t.isScene!==!0&&(_t=F),H.resetTextureUnits();let fn=_t.fog,yl=je.isMeshStandardMaterial?_t.environment:null,wa=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Dt,pi=(je.isMeshStandardMaterial?pe:ne).get(je.envMap||yl),wn=je.vertexColors===!0&&!!Lt.attributes.color&&Lt.attributes.color.itemSize===4,mr=!!Lt.attributes.tangent&&(!!je.normalMap||je.anisotropy>0),jn=!!Lt.morphAttributes.position,Ml=!!Lt.morphAttributes.normal,gr=!!Lt.morphAttributes.color,yu=li;je.toneMapped&&(U!==null&&U.isXRRenderTarget!==!0||(yu=y.toneMapping));let Mu=Lt.morphAttributes.position||Lt.morphAttributes.normal||Lt.morphAttributes.color,Ff=Mu!==void 0?Mu.length:0,Je=z.get(je),Bf=f.state.lights;if(oe===!0&&(Ce===!0||Ke!==k)){let nn=Ke===k&&je.id===N;fe.setState(je,Ke,nn)}let mn=!1;je.version===Je.__version?Je.needsLights&&Je.lightsStateVersion!==Bf.state.version||Je.outputColorSpace!==wa||ze.isBatchedMesh&&Je.batching===!1?mn=!0:ze.isBatchedMesh||Je.batching!==!0?ze.isBatchedMesh&&Je.batchingColor===!0&&ze.colorTexture===null||ze.isBatchedMesh&&Je.batchingColor===!1&&ze.colorTexture!==null||ze.isInstancedMesh&&Je.instancing===!1?mn=!0:ze.isInstancedMesh||Je.instancing!==!0?ze.isSkinnedMesh&&Je.skinning===!1?mn=!0:ze.isSkinnedMesh||Je.skinning!==!0?ze.isInstancedMesh&&Je.instancingColor===!0&&ze.instanceColor===null||ze.isInstancedMesh&&Je.instancingColor===!1&&ze.instanceColor!==null||ze.isInstancedMesh&&Je.instancingMorph===!0&&ze.morphTexture===null||ze.isInstancedMesh&&Je.instancingMorph===!1&&ze.morphTexture!==null||Je.envMap!==pi||je.fog===!0&&Je.fog!==fn?mn=!0:Je.numClippingPlanes===void 0||Je.numClippingPlanes===fe.numPlanes&&Je.numIntersection===fe.numIntersection?(Je.vertexAlphas!==wn||Je.vertexTangents!==mr||Je.morphTargets!==jn||Je.morphNormals!==Ml||Je.morphColors!==gr||Je.toneMapping!==yu||Je.morphTargetsCount!==Ff)&&(mn=!0):mn=!0:mn=!0:mn=!0:mn=!0:(mn=!0,Je.__version=je.version);let Fi=Je.currentProgram;mn===!0&&(Fi=Ta(je,_t,ze));let Su=!1,ms=!1,Sl=!1,Mt=Fi.getUniforms(),fi=Je.uniforms;if(I.useProgram(Fi.program)&&(Su=!0,ms=!0,Sl=!0),je.id!==N&&(N=je.id,ms=!0),Su||k!==Ke){I.buffers.depth.getReversed()&&Ke.reversedDepth!==!0&&(Ke._reversedDepth=!0,Ke.updateProjectionMatrix()),Mt.setValue(C,"projectionMatrix",Ke.projectionMatrix),Mt.setValue(C,"viewMatrix",Ke.matrixWorldInverse);let nn=Mt.map.cameraPosition;nn!==void 0&&nn.setValue(C,T.setFromMatrixPosition(Ke.matrixWorld)),D.logarithmicDepthBuffer&&Mt.setValue(C,"logDepthBufFC",2/(Math.log(Ke.far+1)/Math.LN2)),(je.isMeshPhongMaterial||je.isMeshToonMaterial||je.isMeshLambertMaterial||je.isMeshBasicMaterial||je.isMeshStandardMaterial||je.isShaderMaterial)&&Mt.setValue(C,"isOrthographic",Ke.isOrthographicCamera===!0),k!==Ke&&(k=Ke,ms=!0,Sl=!0)}if(ze.isSkinnedMesh){Mt.setOptional(C,ze,"bindMatrix"),Mt.setOptional(C,ze,"bindMatrixInverse");let nn=ze.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Mt.setValue(C,"boneTexture",nn.boneTexture,H))}ze.isBatchedMesh&&(Mt.setOptional(C,ze,"batchingTexture"),Mt.setValue(C,"batchingTexture",ze._matricesTexture,H),Mt.setOptional(C,ze,"batchingIdTexture"),Mt.setValue(C,"batchingIdTexture",ze._indirectTexture,H),Mt.setOptional(C,ze,"batchingColorTexture"),ze._colorsTexture!==null&&Mt.setValue(C,"batchingColorTexture",ze._colorsTexture,H));let bl=Lt.morphAttributes;bl.position===void 0&&bl.normal===void 0&&bl.color===void 0||X.update(ze,Lt,Fi),(ms||Je.receiveShadow!==ze.receiveShadow)&&(Je.receiveShadow=ze.receiveShadow,Mt.setValue(C,"receiveShadow",ze.receiveShadow)),je.isMeshGouraudMaterial&&je.envMap!==null&&(fi.envMap.value=pi,fi.flipEnvMap.value=pi.isCubeTexture&&pi.isRenderTargetTexture===!1?-1:1),je.isMeshStandardMaterial&&je.envMap===null&&_t.environment!==null&&(fi.envMapIntensity.value=_t.environmentIntensity),ms&&(Mt.setValue(C,"toneMappingExposure",y.toneMappingExposure),Je.needsLights&&(gn=Sl,(En=fi).ambientLightColor.needsUpdate=gn,En.lightProbe.needsUpdate=gn,En.directionalLights.needsUpdate=gn,En.directionalLightShadows.needsUpdate=gn,En.pointLights.needsUpdate=gn,En.pointLightShadows.needsUpdate=gn,En.spotLights.needsUpdate=gn,En.spotLightShadows.needsUpdate=gn,En.rectAreaLights.needsUpdate=gn,En.hemisphereLights.needsUpdate=gn),fn&&je.fog===!0&&qe.refreshFogUniforms(fi,fn),qe.refreshMaterialUniforms(fi,je,te,Q,f.state.transmissionRenderTarget[Ke.id]),is.upload(C,vu(Je),fi,H));var En,gn;if(je.isShaderMaterial&&je.uniformsNeedUpdate===!0&&(is.upload(C,vu(Je),fi,H),je.uniformsNeedUpdate=!1),je.isSpriteMaterial&&Mt.setValue(C,"center",ze.center),Mt.setValue(C,"modelViewMatrix",ze.modelViewMatrix),Mt.setValue(C,"normalMatrix",ze.normalMatrix),Mt.setValue(C,"modelMatrix",ze.matrixWorld),je.isShaderMaterial||je.isRawShaderMaterial){let nn=je.uniformsGroups;for(let Tl=0,kf=nn.length;Tl<kf;Tl++){let bu=nn[Tl];Ue.update(bu,Fi),Ue.bind(bu,Fi)}}return Fi})(E,V,J,ee,W);I.setMaterial(ee,ge);let Ae=J.index,Oe=1;if(ee.wireframe===!0){if(Ae=_e.getWireframeAttribute(J),Ae===void 0)return;Oe=2}let Be=J.drawRange,Fe=J.attributes.position,Xe=Be.start*Oe,dt=(Be.start+Be.count)*Oe;ae!==null&&(Xe=Math.max(Xe,ae.start*Oe),dt=Math.min(dt,(ae.start+ae.count)*Oe)),Ae!==null?(Xe=Math.max(Xe,0),dt=Math.min(dt,Ae.count)):Fe!=null&&(Xe=Math.max(Xe,0),dt=Math.min(dt,Fe.count));let xt=dt-Xe;if(xt<0||xt===1/0)return;let yt;ye.setup(W,ee,Me,J,Ae);let pt=Y;if(Ae!==null&&(yt=se.get(Ae),pt=ce,pt.setIndex(yt)),W.isMesh)ee.wireframe===!0?(I.setLineWidth(ee.wireframeLinewidth*M()),pt.setMode(C.LINES)):pt.setMode(C.TRIANGLES);else if(W.isLine){let Ke=ee.linewidth;Ke===void 0&&(Ke=1),I.setLineWidth(Ke*M()),W.isLineSegments?pt.setMode(C.LINES):W.isLineLoop?pt.setMode(C.LINE_LOOP):pt.setMode(C.LINE_STRIP)}else W.isPoints?pt.setMode(C.POINTS):W.isSprite&&pt.setMode(C.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Or("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(R.get("WEBGL_multi_draw"))pt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Ke=W._multiDrawStarts,_t=W._multiDrawCounts,Lt=W._multiDrawCount,je=Ae?se.get(Ae).bytesPerElement:1,ze=z.get(ee).currentProgram.getUniforms();for(let fn=0;fn<Lt;fn++)ze.setValue(C,"_gl_DrawID",fn),pt.render(Ke[fn]/je,_t[fn])}else if(W.isInstancedMesh)pt.renderInstances(Xe,xt,W.count);else if(J.isInstancedBufferGeometry){let Ke=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,_t=Math.min(J.instanceCount,Ke);pt.renderInstances(Xe,xt,_t)}else pt.render(Xe,xt)},this.compile=function(E,V,J=null){J===null&&(J=E),f=tt.get(J),f.init(V),x.push(f),J.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),E!==J&&E.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),f.setupLights();let ee=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ae=W.material;if(ae)if(Array.isArray(ae))for(let ge=0;ge<ae.length;ge++){let Me=ae[ge];Xn(Me,J,W),ee.add(Me)}else Xn(ae,J,W),ee.add(ae)}),f=x.pop(),ee},this.compileAsync=function(E,V,J=null){let ee=this.compile(E,V,J);return new Promise(W=>{function ae(){ee.forEach(function(ge){z.get(ge).currentProgram.isReady()&&ee.delete(ge)}),ee.size!==0?setTimeout(ae,10):W(E)}R.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Ui=null;function tn(){pn.stop()}function fr(){pn.start()}let pn=new nf;function ui(E,V,J,ee){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||le.intersectsSprite(E)){ee&&S.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ke);let ae=be.update(E),ge=E.material;ge.visible&&g.push(E,ae,ge,J,S.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||le.intersectsObject(E))){let ae=be.update(E),ge=E.material;if(ee&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),S.copy(E.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),S.copy(ae.boundingSphere.center)),S.applyMatrix4(E.matrixWorld).applyMatrix4(ke)),Array.isArray(ge)){let Me=ae.groups;for(let Ae=0,Oe=Me.length;Ae<Oe;Ae++){let Be=Me[Ae],Fe=ge[Be.materialIndex];Fe&&Fe.visible&&g.push(E,ae,Fe,J,S.z,Be)}}else ge.visible&&g.push(E,ae,ge,J,S.z,null)}}let W=E.children;for(let ae=0,ge=W.length;ae<ge;ae++)ui(W[ae],V,J,ee)}function fs(E,V,J,ee){let W=E.opaque,ae=E.transmissive,ge=E.transparent;f.setupLightsView(J),oe===!0&&fe.setGlobalState(y.clippingPlanes,J),ee&&I.viewport(B.copy(ee)),W.length>0&&di(W,V,J),ae.length>0&&di(ae,V,J),ge.length>0&&di(ge,V,J),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function Oi(E,V,J,ee){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[ee.id]===void 0&&(f.state.transmissionRenderTarget[ee.id]=new Pn(1,1,{generateMipmaps:!0,type:R.has("EXT_color_buffer_half_float")||R.has("EXT_color_buffer_float")?Qr:Gn,minFilter:zn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));let W=f.state.transmissionRenderTarget[ee.id],ae=ee.viewport||B;W.setSize(ae.z*y.transmissionResolutionScale,ae.w*y.transmissionResolutionScale);let ge=y.getRenderTarget(),Me=y.getActiveCubeFace(),Ae=y.getActiveMipmapLevel();y.setRenderTarget(W),y.getClearColor(G),q=y.getClearAlpha(),q<1&&y.setClearColor(16777215,.5),y.clear(),P&&He.render(J);let Oe=y.toneMapping;y.toneMapping=li;let Be=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),f.setupLightsView(ee),oe===!0&&fe.setGlobalState(y.clippingPlanes,ee),di(E,J,ee),H.updateMultisampleRenderTarget(W),H.updateRenderTargetMipmap(W),R.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Xe=0,dt=V.length;Xe<dt;Xe++){let xt=V[Xe],yt=xt.object,pt=xt.geometry,Ke=xt.material,_t=xt.group;if(Ke.side===cn&&yt.layers.test(ee.layers)){let Lt=Ke.side;Ke.side=en,Ke.needsUpdate=!0,_u(yt,J,ee,pt,Ke,_t),Ke.side=Lt,Ke.needsUpdate=!0,Fe=!0}}Fe===!0&&(H.updateMultisampleRenderTarget(W),H.updateRenderTargetMipmap(W))}y.setRenderTarget(ge,Me,Ae),y.setClearColor(G,q),Be!==void 0&&(ee.viewport=Be),y.toneMapping=Oe}function di(E,V,J){let ee=V.isScene===!0?V.overrideMaterial:null;for(let W=0,ae=E.length;W<ae;W++){let ge=E[W],Me=ge.object,Ae=ge.geometry,Oe=ge.group,Be=ge.material;Be.allowOverride===!0&&ee!==null&&(Be=ee),Me.layers.test(J.layers)&&_u(Me,V,J,Ae,Be,Oe)}}function _u(E,V,J,ee,W,ae){E.onBeforeRender(y,V,J,ee,W,ae),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(y,V,J,ee,E,ae),W.transparent===!0&&W.side===cn&&W.forceSinglePass===!1?(W.side=en,W.needsUpdate=!0,y.renderBufferDirect(J,V,ee,W,E,ae),W.side=Ii,W.needsUpdate=!0,y.renderBufferDirect(J,V,ee,W,E,ae),W.side=cn):y.renderBufferDirect(J,V,ee,W,E,ae),E.onAfterRender(y,V,J,ee,W,ae)}function Ta(E,V,J){V.isScene!==!0&&(V=F);let ee=z.get(E),W=f.state.lights,ae=f.state.shadowsArray,ge=W.state.version,Me=Ie.getParameters(E,W.state,ae,V,J),Ae=Ie.getProgramCacheKey(Me),Oe=ee.programs;ee.environment=E.isMeshStandardMaterial?V.environment:null,ee.fog=V.fog,ee.envMap=(E.isMeshStandardMaterial?pe:ne).get(E.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",Wt),Oe=new Map,ee.programs=Oe);let Be=Oe.get(Ae);if(Be!==void 0){if(ee.currentProgram===Be&&ee.lightsStateVersion===ge)return xu(E,Me),Be}else Me.uniforms=Ie.getUniforms(E),E.onBeforeCompile(Me,y),Be=Ie.acquireProgram(Me,Ae),Oe.set(Ae,Be),ee.uniforms=Me.uniforms;let Fe=ee.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(Fe.clippingPlanes=fe.uniform),xu(E,Me),ee.needsLights=(function(Xe){return Xe.isMeshLambertMaterial||Xe.isMeshToonMaterial||Xe.isMeshPhongMaterial||Xe.isMeshStandardMaterial||Xe.isShadowMaterial||Xe.isShaderMaterial&&Xe.lights===!0})(E),ee.lightsStateVersion=ge,ee.needsLights&&(Fe.ambientLightColor.value=W.state.ambient,Fe.lightProbe.value=W.state.probe,Fe.directionalLights.value=W.state.directional,Fe.directionalLightShadows.value=W.state.directionalShadow,Fe.spotLights.value=W.state.spot,Fe.spotLightShadows.value=W.state.spotShadow,Fe.rectAreaLights.value=W.state.rectArea,Fe.ltc_1.value=W.state.rectAreaLTC1,Fe.ltc_2.value=W.state.rectAreaLTC2,Fe.pointLights.value=W.state.point,Fe.pointLightShadows.value=W.state.pointShadow,Fe.hemisphereLights.value=W.state.hemi,Fe.directionalShadowMap.value=W.state.directionalShadowMap,Fe.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Fe.spotShadowMap.value=W.state.spotShadowMap,Fe.spotLightMatrix.value=W.state.spotLightMatrix,Fe.spotLightMap.value=W.state.spotLightMap,Fe.pointShadowMap.value=W.state.pointShadowMap,Fe.pointShadowMatrix.value=W.state.pointShadowMatrix),ee.currentProgram=Be,ee.uniformsList=null,Be}function vu(E){if(E.uniformsList===null){let V=E.currentProgram.getUniforms();E.uniformsList=is.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function xu(E,V){let J=z.get(E);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}pn.setAnimationLoop(function(E){Ui&&Ui(E)}),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(E){Ui=E,Te.setAnimationLoop(E),E===null?pn.stop():pn.start()},Te.addEventListener("sessionstart",tn),Te.addEventListener("sessionend",fr),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(b===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(V),V=Te.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,V,U),f=tt.get(E,x.length),f.init(V),x.push(f),ke.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),le.setFromProjectionMatrix(ke,ii,V.reversedDepth),Ce=this.localClippingEnabled,oe=fe.init(this.clippingPlanes,Ce),g=et.get(E,_.length),g.init(),_.push(g),Te.enabled===!0&&Te.isPresenting===!0){let ae=y.xr.getDepthSensingMesh();ae!==null&&ui(ae,V,-1/0,y.sortObjects)}ui(E,V,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(xe,we),P=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,P&&He.addToRenderList(g,E),this.info.render.frame++,oe===!0&&fe.beginShadows();let J=f.state.shadowsArray;Pe.render(J,E,V),oe===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();let ee=g.opaque,W=g.transmissive;if(f.setupLights(),V.isArrayCamera){let ae=V.cameras;if(W.length>0)for(let ge=0,Me=ae.length;ge<Me;ge++)Oi(ee,W,E,ae[ge]);P&&He.render(E);for(let ge=0,Me=ae.length;ge<Me;ge++){let Ae=ae[ge];fs(g,E,Ae,Ae.viewport)}}else W.length>0&&Oi(ee,W,E,V),P&&He.render(E),fs(g,E,V);U!==null&&L===0&&(H.updateMultisampleRenderTarget(U),H.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(y,E,V),ye.resetDefaultState(),N=-1,k=null,x.pop(),x.length>0?(f=x[x.length-1],oe===!0&&fe.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,_.pop(),g=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,V,J){let ee=z.get(E);ee.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),z.get(E.texture).__webglTexture=V,z.get(E.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:J,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){let J=z.get(E);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0};let Df=C.createFramebuffer();this.setRenderTarget=function(E,V=0,J=0){U=E,A=V,L=J;let ee=!0,W=null,ae=!1,ge=!1;if(E){let Me=z.get(E);if(Me.__useDefaultFramebuffer!==void 0)I.bindFramebuffer(C.FRAMEBUFFER,null),ee=!1;else if(Me.__webglFramebuffer===void 0)H.setupRenderTarget(E);else if(Me.__hasExternalTextures)H.rebindTextures(E,z.get(E.texture).__webglTexture,z.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Be=E.depthTexture;if(Me.__boundDepthTexture!==Be){if(Be!==null&&z.has(Be)&&(E.width!==Be.image.width||E.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(E)}}let Ae=E.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ge=!0);let Oe=z.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(W=Array.isArray(Oe[V])?Oe[V][J]:Oe[V],ae=!0):W=E.samples>0&&H.useMultisampledRTT(E)===!1?z.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?Oe[J]:Oe,B.copy(E.viewport),O.copy(E.scissor),j=E.scissorTest}else B.copy(Se).multiplyScalar(te).floor(),O.copy(Ne).multiplyScalar(te).floor(),j=re;if(J!==0&&(W=Df),I.bindFramebuffer(C.FRAMEBUFFER,W)&&ee&&I.drawBuffers(E,W),I.viewport(B),I.scissor(O),I.setScissorTest(j),ae){let Me=z.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+V,Me.__webglTexture,J)}else if(ge){let Me=V;for(let Ae=0;Ae<E.textures.length;Ae++){let Oe=z.get(E.textures[Ae]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ae,Oe.__webglTexture,J,Me)}}else if(E!==null&&J!==0){let Me=z.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Me.__webglTexture,J)}N=-1},this.readRenderTargetPixels=function(E,V,J,ee,W,ae,ge,Me=0){if(!E||!E.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Ae=Ae[ge]),Ae){I.bindFramebuffer(C.FRAMEBUFFER,Ae);try{let Oe=E.textures[Me],Be=Oe.format,Fe=Oe.type;if(!D.textureFormatReadable(Be))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(Fe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");V>=0&&V<=E.width-ee&&J>=0&&J<=E.height-W&&(E.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Me),C.readPixels(V,J,ee,W,$.convert(Be),$.convert(Fe),ae))}finally{let Oe=U!==null?z.get(U).__webglFramebuffer:null;I.bindFramebuffer(C.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,V,J,ee,W,ae,ge,Me=0){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Ae=Ae[ge]),Ae){if(V>=0&&V<=E.width-ee&&J>=0&&J<=E.height-W){I.bindFramebuffer(C.FRAMEBUFFER,Ae);let Oe=E.textures[Me],Be=Oe.format,Fe=Oe.type;if(!D.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Xe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Xe),C.bufferData(C.PIXEL_PACK_BUFFER,ae.byteLength,C.STREAM_READ),E.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Me),C.readPixels(V,J,ee,W,$.convert(Be),$.convert(Fe),0);let dt=U!==null?z.get(U).__webglFramebuffer:null;I.bindFramebuffer(C.FRAMEBUFFER,dt);let xt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await wp(C,xt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Xe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ae),C.deleteBuffer(Xe),C.deleteSync(xt),ae}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,V=null,J=0){let ee=Math.pow(2,-J),W=Math.floor(E.image.width*ee),ae=Math.floor(E.image.height*ee),ge=V!==null?V.x:0,Me=V!==null?V.y:0;H.setTexture2D(E,0),C.copyTexSubImage2D(C.TEXTURE_2D,J,0,0,ge,Me,W,ae),I.unbindTexture()};let Uf=C.createFramebuffer(),Of=C.createFramebuffer();this.copyTextureToTexture=function(E,V,J=null,ee=null,W=0,ae=null){let ge,Me,Ae,Oe,Be,Fe,Xe,dt,xt;ae===null&&(W!==0?(Or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=W,W=0):ae=0);let yt=E.isCompressedTexture?E.mipmaps[ae]:E.image;if(J!==null)ge=J.max.x-J.min.x,Me=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,Oe=J.min.x,Be=J.min.y,Fe=J.isBox3?J.min.z:0;else{let wn=Math.pow(2,-W);ge=Math.floor(yt.width*wn),Me=Math.floor(yt.height*wn),Ae=E.isDataArrayTexture?yt.depth:E.isData3DTexture?Math.floor(yt.depth*wn):1,Oe=0,Be=0,Fe=0}ee!==null?(Xe=ee.x,dt=ee.y,xt=ee.z):(Xe=0,dt=0,xt=0);let pt=$.convert(V.format),Ke=$.convert(V.type),_t;V.isData3DTexture?(H.setTexture3D(V,0),_t=C.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(H.setTexture2DArray(V,0),_t=C.TEXTURE_2D_ARRAY):(H.setTexture2D(V,0),_t=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,V.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,V.unpackAlignment);let Lt=C.getParameter(C.UNPACK_ROW_LENGTH),je=C.getParameter(C.UNPACK_IMAGE_HEIGHT),ze=C.getParameter(C.UNPACK_SKIP_PIXELS),fn=C.getParameter(C.UNPACK_SKIP_ROWS),yl=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,yt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,yt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Oe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Be),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Fe);let wa=E.isDataArrayTexture||E.isData3DTexture,pi=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){let wn=z.get(E),mr=z.get(V),jn=z.get(wn.__renderTarget),Ml=z.get(mr.__renderTarget);I.bindFramebuffer(C.READ_FRAMEBUFFER,jn.__webglFramebuffer),I.bindFramebuffer(C.DRAW_FRAMEBUFFER,Ml.__webglFramebuffer);for(let gr=0;gr<Ae;gr++)wa&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,z.get(E).__webglTexture,W,Fe+gr),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,z.get(V).__webglTexture,ae,xt+gr)),C.blitFramebuffer(Oe,Be,ge,Me,Xe,dt,ge,Me,C.DEPTH_BUFFER_BIT,C.NEAREST);I.bindFramebuffer(C.READ_FRAMEBUFFER,null),I.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(W!==0||E.isRenderTargetTexture||z.has(E)){let wn=z.get(E),mr=z.get(V);I.bindFramebuffer(C.READ_FRAMEBUFFER,Uf),I.bindFramebuffer(C.DRAW_FRAMEBUFFER,Of);for(let jn=0;jn<Ae;jn++)wa?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,wn.__webglTexture,W,Fe+jn):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,wn.__webglTexture,W),pi?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,mr.__webglTexture,ae,xt+jn):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,mr.__webglTexture,ae),W!==0?C.blitFramebuffer(Oe,Be,ge,Me,Xe,dt,ge,Me,C.COLOR_BUFFER_BIT,C.NEAREST):pi?C.copyTexSubImage3D(_t,ae,Xe,dt,xt+jn,Oe,Be,ge,Me):C.copyTexSubImage2D(_t,ae,Xe,dt,Oe,Be,ge,Me);I.bindFramebuffer(C.READ_FRAMEBUFFER,null),I.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else pi?E.isDataTexture||E.isData3DTexture?C.texSubImage3D(_t,ae,Xe,dt,xt,ge,Me,Ae,pt,Ke,yt.data):V.isCompressedArrayTexture?C.compressedTexSubImage3D(_t,ae,Xe,dt,xt,ge,Me,Ae,pt,yt.data):C.texSubImage3D(_t,ae,Xe,dt,xt,ge,Me,Ae,pt,Ke,yt):E.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ae,Xe,dt,ge,Me,pt,Ke,yt.data):E.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ae,Xe,dt,yt.width,yt.height,pt,yt.data):C.texSubImage2D(C.TEXTURE_2D,ae,Xe,dt,ge,Me,pt,Ke,yt);C.pixelStorei(C.UNPACK_ROW_LENGTH,Lt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,je),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ze),C.pixelStorei(C.UNPACK_SKIP_ROWS,fn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,yl),ae===0&&V.generateMipmaps&&C.generateMipmap(_t),I.unbindTexture()},this.initRenderTarget=function(E){z.get(E).__webglFramebuffer===void 0&&H.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?H.setTextureCube(E,0):E.isData3DTexture?H.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?H.setTexture2DArray(E,0):H.setTexture2D(E,0),I.unbindTexture()},this.resetState=function(){A=0,L=0,U=null,I.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}};function Oh(r,e){if(e===dh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ts||e===ga){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===ts)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var _l=class extends Bn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Vh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new zh(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=oi.extractUrlBase(e);a=oi.resolveURL(c,this.path)}else a=oi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Yr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===pf){try{a[Ze.KHR_BINARY_GLTF]=new ru(e)}catch(u){i&&i(u);return}s=JSON.parse(a[Ze.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new uu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Ze.KHR_MATERIALS_UNLIT:a[u]=new Gh;break;case Ze.KHR_DRACO_MESH_COMPRESSION:a[u]=new su(s,this.dracoLoader);break;case Ze.KHR_TEXTURE_TRANSFORM:a[u]=new au;break;case Ze.KHR_MESH_QUANTIZATION:a[u]=new ou;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function d0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var Ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},zh=class{constructor(e){this.parser=e,this.name=Ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new Re(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Dt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new nr(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new er(h),c.distance=u;break;case"spot":c=new la(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Vn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Gh=class{constructor(){this.name=Ze.KHR_MATERIALS_UNLIT}getMaterialType(){return Bt}extendParams(e,t,n){let i=[];e.color=new Re(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Dt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ot))}return Promise.all(i)}},Hh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Vh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ie(o,o)}return Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Re(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Dt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ot)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},qh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Re().setRGB(o[0],o[1],o[2],Dt),Promise.all(s)}},Zh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Re().setRGB(o[0],o[1],o[2],Dt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ot)),Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=Ze.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},$h=class{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Qh=class{constructor(e){this.parser=e,this.name=Ze.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},eu=class{constructor(e){this.parser=e,this.name=Ze.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},tu=class{constructor(e){this.parser=e,this.name=Ze.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},nu=class{constructor(e){this.name=Ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}},iu=class{constructor(e){this.name=Ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==dn.TRIANGLES&&c.mode!==dn.TRIANGLE_STRIP&&c.mode!==dn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(let m of u){let v=new Le,g=new w,f=new qt,_=new w(1,1,1),x=new Hs(m.geometry,m.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,v.compose(g,f,_));for(let y in l)if(y==="_COLOR_0"){let b=l[y];x.instanceColor=new wi(b.array,b.itemSize,b.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);ft.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),p.push(x)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},pf="glTF",xa=12,cf={JSON:1313821514,BIN:5130562},ru=class{constructor(e){this.name=Ze.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,xa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==pf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-xa,s=new DataView(e,xa),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===cf.JSON){let c=new Uint8Array(e,xa+a,o);this.content=n.decode(c)}else if(l===cf.BIN){let c=xa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},su=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=cu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=cu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],p=ss[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(let m in p.attributes){let v=p.attributes[m],g=l[m];g!==void 0&&(v.normalized=g)}u(p)},o,c,Dt,d)})})}},au=class{constructor(){this.name=Ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ou=class{constructor(){this.name=Ze.KHR_MESH_QUANTIZATION}},vl=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,m=e*c,v=m-c,g=-2*p+3*d,f=p-d,_=1-g,x=f-d+u;for(let y=0;y!==o;y++){let b=a[v+y+o],A=a[v+y+l]*h,L=a[m+y+o],U=a[m+y]*h;s[y]=_*b+x*A+g*L+f*U}return s}},p0=new qt,lu=class extends vl{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return p0.fromArray(s).normalize().toArray(s),s}},dn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ss={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},hf={9728:$t,9729:jt,9984:tl,9985:Jr,9986:rr,9987:zn},uf={33071:bi,33648:Dr,10497:Jt},Fh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ni={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},f0={CUBICSPLINE:void 0,LINEAR:qi,STEP:ji},Bh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function m0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new mt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ii})),r.DefaultMaterial}function ur(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Vn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function g0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function _0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function v0(r){let e,t=r.extensions&&r.extensions[Ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+kh(t.attributes):e=r.indices+":"+kh(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+kh(r.targets[n]);return e}function kh(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function hu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function x0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var y0=new Le,uu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new d0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Ci(this.options.manager):this.textureLoader=new ca(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ur(s,o,i),Vn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ze.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(oi.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Fh[i.type],o=ss[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Tt(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Fh[i.type],c=ss[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,v,g;if(p&&p!==u){let f=Math.floor(d/p),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count,x=t.cache.get(_);x||(v=new c(o,f*p,i.count*p/h),x=new Gr(v,p/h),t.cache.add(_,x)),g=new Hr(x,l,d%p/h,m)}else o===null?v=new c(i.count*l):v=new c(o,d,i.count*l),g=new Tt(v,l,m);if(i.sparse!==void 0){let f=Fh.SCALAR,_=ss[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,b=new _(a[1],x,i.sparse.count*f),A=new c(a[2],y,i.sparse.count*l);o!==null&&(g=new Tt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let L=0,U=b.length;L<U;L++){let N=b[L];if(g.setX(N,A[L*l]),l>=2&&g.setY(N,A[L*l+1]),l>=3&&g.setZ(N,A[L*l+2]),l>=4&&g.setW(N,A[L*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return h.magFilter=hf[d.magFilter]||jt,h.minFilter=hf[d.minFilter]||zn,h.wrapS=uf[d.wrapS]||Jt,h.wrapT=uf[d.wrapT]||Jt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==$t&&h.minFilter!==jt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let m=d;t.isImageBitmapLoader===!0&&(m=function(v){let g=new Rt(v);g.needsUpdate=!0,d(g)}),t.load(oi.resolveURL(u,s.path),m,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Vn(u,a),u.userData.mimeType=a.mimeType||x0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Ze.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ze.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[Ze.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Wr,Yt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new si,Yt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return mt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[Ze.KHR_MATERIALS_UNLIT]){let u=i[Ze.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new Re(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Dt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,ot)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=cn);let h=s.alphaMode||Bh.OPAQUE;if(h===Bh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Bh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Bt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ie(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==Bt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Bt){let u=s.emissiveFactor;o.emissive=new Re().setRGB(u[0],u[1],u[2],Dt)}return s.emissiveTexture!==void 0&&a!==Bt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ot)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),Vn(u,s),t.associations.set(u,{materials:e}),s.extensions&&ur(i,u,s),u})}createUniqueName(e){let t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return df(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=v0(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Ze.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=df(new rt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?m0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,m=h.length;p<m;p++){let v=h[p],g=a[p],f,_=c[p];if(g.mode===dn.TRIANGLES||g.mode===dn.TRIANGLE_STRIP||g.mode===dn.TRIANGLE_FAN||g.mode===void 0)f=s.isSkinnedMesh===!0?new ks(v,_):new ut(v,_),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),g.mode===dn.TRIANGLE_STRIP?f.geometry=Oh(f.geometry,ga):g.mode===dn.TRIANGLE_FAN&&(f.geometry=Oh(f.geometry,ts));else if(g.mode===dn.LINES)f=new Vs(v,_);else if(g.mode===dn.LINE_STRIP)f=new Nn(v,_);else if(g.mode===dn.LINE_LOOP)f=new Ws(v,_);else if(g.mode===dn.POINTS)f=new Xs(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(f.geometry.morphAttributes).length>0&&_0(f,s),f.name=t.createUniqueName(s.name||"mesh_"+e),Vn(f,s),g.extensions&&ur(i,f,g),t.assignFinalMaterial(f),u.push(f)}for(let p=0,m=u.length;p<m;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&ur(i,u[0],s),u[0];let d=new Gt;s.extensions&&ur(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,m=u.length;p<m;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new bt(mh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new tr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Le;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Gs(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let p=i.channels[u],m=i.samplers[p.sampler],v=p.target,g=v.node,f=i.parameters!==void 0?i.parameters[m.input]:m.input,_=i.parameters!==void 0?i.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",_)),c.push(m),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],m=u[2],v=u[3],g=u[4],f=[];for(let x=0,y=d.length;x<y;x++){let b=d[x],A=p[x],L=m[x],U=v[x],N=g[x];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let k=n._createAnimationTracks(b,A,L,U,N);if(k)for(let B=0;B<k.length;B++)f.push(k[B])}let _=new sa(s,void 0,f);return Vn(_,i),_})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,y0)});for(let p=0,m=u.length;p<m;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Vr:c.length>1?h=new Gt:c.length===1?h=c[0]:h=new ft,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Vn(h,s),s.extensions&&ur(n,h,s),s.matrix!==void 0){let u=new Le;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Gt;n.name&&(s.name=i.createUniqueName(n.name)),Vn(s,n),n.extensions&&ur(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[d,p]of i.associations)(d instanceof Yt||d instanceof Rt)&&u.set(d,p);return h.traverse(d=>{let p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];Ni[s.path]===Ni.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Ni[s.path]){case Ni.weights:c=Un;break;case Ni.rotation:c=On;break;case Ni.translation:case Ni.scale:c=Fn;break;default:n.itemSize===1?c=Un:c=Fn;break}let h=i.interpolation!==void 0?f0[i.interpolation]:qi,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){let m=new c(l[d]+"."+Ni[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=hu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof On?lu:vl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function M0(r,e,t){let n=e.attributes,i=new Ut;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),o.normalized){let h=hu(ss[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new w,l=new w;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,m=d.max;if(p!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(m[2]))),d.normalized){let v=hu(ss[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new Ht;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function df(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=cu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return $e.workingColorSpace!==Dt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),Vn(r,e),M0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?g0(r,e.targets,t):r})}function ff(r){let e=91,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296);function n(l){let c=document.createElement("canvas");c.width=c.height=512;let h=c.getContext("2d"),u={stone:"#795437",wood:"#35271f",felt:"#144333",leather:"#8d201b",rug:"#782e25",roof:"#263532",plaster:"#303235",cabinet:"#202225",deck:"#846449"};h.fillStyle=u[l],h.fillRect(0,0,512,512);for(let p=0;p<14e3;p++){let m=t()*512,v=t()*512;h.fillStyle=t()>.5?"#ffffff0a":"#00000010",h.fillRect(m,v,l==="wood"||l==="deck"?40:2,1)}if(l==="stone"){for(let p=0;p<28;p++){let m=t()*512,v=t()*512;h.beginPath(),h.moveTo(m,v);for(let g=0;g<18;g++)m+=12+t()*14,v+=Math.sin(g*.7+p)*8+(t()-.5)*20,h.lineTo(m,v);h.strokeStyle=p%4?"#d7ad7830":"#f0ce9750",h.lineWidth=p%4?.65:1.5,h.stroke()}h.strokeStyle="#141518",h.lineWidth=5,h.strokeRect(0,0,512,512),h.strokeStyle="#d4a04e",h.lineWidth=1.8,h.strokeRect(2,2,508,508)}if(l==="wood"||l==="deck")for(let p=0;p<512;p+=64){h.fillStyle="#00000026",h.fillRect(0,p,512,2);for(let m=p%128?128:0;m<512;m+=256)h.fillRect(m,p,1,64),h.fillStyle="#c5916330",h.fillRect(m+3,p+3,250,1),h.fillStyle="#00000026"}if(l==="rug"){h.fillStyle="#7d2225",h.fillRect(0,0,512,512);for(let p=0;p<12e3;p++)h.fillStyle=p%2?"#e4b48718":"#0000000d",h.fillRect(t()*512,t()*512,1,2);for(let[p,m,v]of[[12,3,"#3c2626"],[21,1,"#b07058"],[35,2,"#242322"],[45,1,"#b07058"]])h.strokeStyle=v,h.lineWidth=m,h.strokeRect(p,p,512-p*2,512-p*2);h.strokeStyle="#a8946155",h.lineWidth=1;for(let p=65;p<460;p+=32)for(let m=65;m<460;m+=32)h.beginPath(),h.moveTo(m-5,p),h.quadraticCurveTo(m,p-9,m+5,p),h.quadraticCurveTo(m,p+9,m-5,p),h.stroke();h.save(),h.translate(256,256);for(let p=0;p<16;p++)h.rotate(Math.PI/8),h.strokeStyle="#b6a16c",h.beginPath(),h.moveTo(0,0),h.bezierCurveTo(25,-26,65,-23,88,0),h.bezierCurveTo(65,23,25,26,0,0),h.stroke();for(let p of[28,94,104])h.beginPath(),h.arc(0,0,p,0,Math.PI*2),h.stroke();h.fillStyle="#c2ac78",h.font="44px Georgia",h.textAlign="center",h.fillText("\u2660",0,16),h.restore()}if(l==="plaster")for(let p=-64;p<600;p+=128)for(let m=-64;m<600;m+=128)h.beginPath(),h.moveTo(m,p-64),h.bezierCurveTo(m+9,p-31,m+47,p-28,m+64,p),h.bezierCurveTo(m+47,p+28,m+9,p+31,m,p+64),h.bezierCurveTo(m-9,p+31,m-47,p+28,m-64,p),h.bezierCurveTo(m-47,p-28,m-9,p-31,m,p-64),h.strokeStyle="#a599784e",h.lineWidth=2.2,h.stroke(),h.fillStyle="#b39157",h.beginPath(),h.arc(m,p-64,2,0,Math.PI*2),h.fill(),h.strokeStyle="#10131880",h.lineWidth=1,h.strokeRect(m-6,p-6,12,12);if(l==="cabinet"){h.fillStyle="#ffffff06";for(let p=0;p<512;p+=4)h.fillRect(0,p,512,1);h.strokeStyle="#0b0e10",h.lineWidth=12,h.strokeRect(18,18,476,476),h.strokeStyle="#947547",h.lineWidth=2,h.strokeRect(27,27,458,458),h.strokeStyle="#4b4b45",h.lineWidth=1,h.strokeRect(32,32,448,448)}if(l==="roof"){h.strokeStyle="#83908644";for(let p=0;p<512;p+=32){h.fillStyle="#00000040",h.fillRect(0,p,512,3);for(let m=p%64?32:0;m<512;m+=64)h.strokeRect(m,p,64,32)}}if(l==="leather")for(let p=0;p<512;p+=128)for(let m=0;m<512;m+=128)h.beginPath(),h.moveTo(m,p),h.lineTo(m+64,p+64),h.lineTo(m+128,p),h.strokeStyle="#31171055",h.lineWidth=4,h.stroke(),h.fillStyle="#d38d5866",h.beginPath(),h.arc(m+64,p+64,5,0,Math.PI*2),h.fill();let d=new on(c);return d.colorSpace=ot,d.wrapS=d.wrapT=Jt,d.anisotropy=4,r.push(d),d}let i={};for(let l of["stone","wood","felt","leather","rug","roof","plaster","cabinet","deck"]){let c=n(l);i[l]=new(l==="stone"?gt:mt)({map:c,bumpMap:c,bumpScale:{stone:.004,wood:.012,leather:.025,rug:.018,plaster:.012}[l]||.01,roughness:{stone:.18,wood:.4,leather:.38,roof:.8}[l]||.86,metalness:l==="stone"?.3:0})}let s=document.createElement("canvas");s.width=512,s.height=256;let a=s.getContext("2d");a.fillStyle="#29241d",a.fillRect(0,0,512,256);for(let l of[40,168,296,424]){let c=a.createRadialGradient(l,86,2,l,86,43);c.addColorStop(0,"#ffe4a8"),c.addColorStop(.2,"#d59345"),c.addColorStop(1,"#29241d"),a.fillStyle=c,a.fillRect(l-43,43,86,86),a.fillStyle="#ffe5b3",a.fillRect(l-3,60,6,43)}let o=new on(s);return o.colorSpace=ot,o.mapping=Li,r.push(o),i.stone.envMap=o,i.stone.clearcoat=.85,i.stone.clearcoatRoughness=.12,i.stone.envMapIntensity=.9,i.gold=new mt({color:"#b99958",metalness:.78,roughness:.29}),i.dark=new mt({color:"#182421",metalness:.55,roughness:.35}),i.cream=new mt({color:"#d7c5a1",roughness:.85}),i.rubber=new mt({color:"#171d1c",roughness:.95}),i.red=new mt({color:"#a04730",metalness:.25,roughness:.4}),i.green=new mt({color:"#346044",roughness:.8}),i.light=new mt({color:"#ffe2a8",emissive:"#ffc46a",emissiveIntensity:2.1,roughness:.4}),i.water=new gt({color:"#398b8c",roughness:.16,metalness:.25,clearcoat:1,transparent:!0,opacity:.82}),i.glass=new gt({color:"#a7c4bc",roughness:.13,metalness:.2,transparent:!0,opacity:.2,depthWrite:!1}),i}var S0=["#f5ecd5","#e7b12e","#2862bc","#cc3835","#7443a2","#e88328","#26764a","#82322e","#171b23"];function as(r,e){return e.discipline==="pyramid"?r===0?e.color==="red"?"#ac2838":"#e6b735":"#fff3d9":S0[r>8?r-8:r]}function mf(r){let e=new ml({canvas:r,antialias:!0,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.toneMapping=Qo,e.toneMappingExposure=1.25,e.shadowMap.enabled=!0,e.shadowMap.type=Xo;let t=new Bs;t.background=new Re("#91c7cf"),t.fog=new Fs("#91c7cf",45,180);let n=new bt(47,1,.1,250),i=[],s=ff(i),a=new Map,o=[],l="room",c="",h=document.createElement("canvas");h.width=128,h.height=64;let u=h.getContext("2d"),d=u.createLinearGradient(0,0,0,64);d.addColorStop(0,"#e3dfce"),d.addColorStop(.48,"#9aa49c"),d.addColorStop(1,"#42352a"),u.fillStyle=d,u.fillRect(0,0,128,64);let p=new on(h);p.colorSpace=ot,p.mapping=Li,i.push(p),t.environment=p,t.environmentIntensity=.55,t.add(new aa("#ffecd1","#3b2d22",2.5));let m=new nr("#ffe5b7",3);m.position.set(-8,18,-15),m.castShadow=!0,m.shadow.mapSize.set(2048,2048),Object.assign(m.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.5,far:50}),m.shadow.bias=-15e-5,m.shadow.normalBias=.015,t.add(m);let v=new er("#ffd397",85,25,2);v.position.set(0,6,0),t.add(v);function g(X,Y,ce,$,ye,Ue=0,C=0){let ve=new ut(X,Y);return ve.position.set(ce,$,ye),ve.rotation.set(Ue,C,0),ve.castShadow=ve.receiveShadow=!0,t.add(ve),ve}function f(X,Y,ce,$,ye,Ue,C){return g(new Ln(X,Y,ce),$,ye,Ue,C)}let _=s.stone.map.clone();_.repeat.set(6,6),_.needsUpdate=!0,i.push(_);let x=s.stone.clone();x.map=x.bumpMap=_,x.color.set("#59635b"),x.roughness=.32,x.bumpScale=.012,g(new ln(24,24),x,0,0,0,-Math.PI/2);let y=s.plaster.map.clone();y.repeat.set(5,2),y.needsUpdate=!0,i.push(y);let b=s.plaster.clone();b.map=y,f(.25,7,23,b,-11,3.5,0),f(.25,7,23,b,11,3.5,0),f(22,7,.2,b,0,3.5,11);for(let X of[-10.8,10.8])f(.12,.1,22,s.gold,X,1.8,0),f(.12,1.7,22,s.cabinet,X,.9,0);for(let X of[-10.5,-5.25,0,5.25,10.5])f(.12,6.7,.15,s.dark,X,3.35,-10),f(.025,6,.18,s.gold,X,3.35,-9.98);f(21,.12,.15,s.dark,0,6.6,-10),f(21,.12,.15,s.dark,0,.12,-10),g(new ln(28,8),s.deck,0,-.03,-14,-Math.PI/2),f(15,.15,4.6,s.cream,0,.03,-14),f(14.2,.1,3.8,s.water,0,.13,-14);for(let X of[-7.4,7.4])f(.2,.2,4.6,s.gold,X,.15,-14);g(new ln(220,160),new mt({color:"#237b8b",metalness:.4,roughness:.2}),0,-.4,-97,-Math.PI/2);for(let X of[-9,9]){f(1.5,.25,3,s.cream,X,.3,-14),f(1.5,.8,.2,s.wood,X,.7,-15.3);let Y=g(new Dn(.5,.4,.8,24),s.dark,X,.4,-9);for(let ce=0;ce<9;ce++){let $=g(new Ri(.35,10,8),s.green,X+Math.sin(ce*2)*.45,1.3+ce%3*.35,-9+Math.cos(ce*2)*.4);$.scale.set(.5,2.2,.3),$.rotation.z=Math.sin(ce)*.55}}function A(X){let Y=document.createElement("canvas");Y.width=Y.height=1024;let ce=Y.getContext("2d"),$=71,ye=()=>($=$*1664525+1013904223>>>0,$/4294967296);ce.fillStyle=X==="cloth"?"#17634f":"#382016",ce.fillRect(0,0,1024,1024);for(let C=0;C<18e3;C++){let ve=ye()*1024,Ee=ye()*1024;ce.strokeStyle=X==="cloth"?C%2?"#ffffff0a":"#00000012":C%2?"#d6a26d24":"#100a062b",ce.lineWidth=X==="cloth"?.6:ye()*2+.3,ce.beginPath(),ce.moveTo(ve,Ee),ce.lineTo(ve+(X==="cloth"?2:60+ye()*180),Ee+(X==="cloth"?2:Math.sin(ve*.01)*4)),ce.stroke()}let Ue=new on(Y);return Ue.colorSpace=ot,Ue.wrapS=Ue.wrapT=Jt,Ue.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),i.push(Ue),Ue}let L=A("cloth");s.felt=new mt({map:L,bumpMap:L,bumpScale:.008,roughness:.94,color:"#b0d9c4"});let U=A("wood");s.wood=new gt({map:U,roughness:.28,clearcoat:.65,clearcoatRoughness:.22});let N=new Ci;function k(X,Y,{repeat:ce=1,bump:$=.004}={}){N.load("assets/player-hall/"+X,ye=>{if(fe){ye.dispose();return}ye.colorSpace=ot,ye.wrapS=ye.wrapT=Jt,ye.repeat.set(ce,ce),ye.anisotropy=Math.min(16,e.capabilities.getMaxAnisotropy()),i.push(ye),Y.map=ye,Y.bumpMap=ye,Y.bumpScale=$,Y.color.set(X.includes("floor")?"#85786c":X.includes("cloth")?"#b8cebf":"#ffffff"),Y.needsUpdate=!0},void 0,()=>{})}k("billiards-floor-v1.webp",x,{repeat:4,bump:.005}),k("billiards-cloth-v1.webp",s.felt,{repeat:1,bump:.001}),k("billiards-walnut-v1.webp",s.wood,{repeat:1,bump:.003});let B=new gt({color:"#15100c",roughness:.82,clearcoat:.08}),O=new mt({color:"#020403",roughness:1});f(10.9,.6,5.9,s.dark,0,1.75,0),f(10.95,.07,5.95,s.gold,0,1.95,0),f(10.7,.28,5.7,s.wood,0,2.1,0),f(10,.08,5,s.felt,0,2.23,0);let j=new Gt;t.add(j);let G="";function q(X){let Y=vr(X);if(G===Y.spec.name)return;G=Y.spec.name;for(let $ of[...j.children])$.geometry?.dispose(),$.isLine&&$.material.dispose(),j.remove($);let ce=($,ye=2.37)=>new w(($[0]-500)/100,ye,($[1]-250)/100);for(let $ of Y.rails){let ye=$.b[0]-$.a[0],Ue=$.b[1]-$.a[1],C=Math.hypot(ye,Ue),ve=[($.a[0]+$.b[0])/2,($.a[1]+$.b[1])/2],Ee=-Ue/C,Te=ye/C,Ye=[500,250];$.jaw&&(Ye=Y.pockets.slice().sort((Wt,Xn)=>Math.hypot(Wt.center[0]-ve[0],Wt.center[1]-ve[1])-Math.hypot(Xn.center[0]-ve[0],Xn.center[1]-ve[1]))[0].drop),(Ye[0]-ve[0])*Ee+(Ye[1]-ve[1])*Te<0&&(Ee=-Ee,Te=-Te);let ct=new ut(new Ln(C/100,.2,.12),s.felt);ct.position.copy(ce([ve[0]-Ee*6,ve[1]-Te*6],2.36)),ct.rotation.y=-Math.atan2(Ue,ye),ct.castShadow=ct.receiveShadow=!0,j.add(ct)}for(let $ of Y.pockets){let ye=[Y.rails[6+$.index*2].b,Y.rails[7+$.index*2].b],Ue=[$.ends[0],$.ends[1],ye[1],ye[0]],C=new Ki;Ue.forEach((Ye,ct)=>{let it=(Ye[0]-500)/100,Wt=-(Ye[1]-250)/100;ct?C.lineTo(it,Wt):C.moveTo(it,Wt)}),C.closePath();let ve=new ut(new qr(C),B);ve.rotation.x=-Math.PI/2,ve.position.y=2.278,j.add(ve);let Ee=new Nn(new rt().setFromPoints([$.ends[0],ye[0],ye[1],$.ends[1]].map(Ye=>ce(Ye,2.285))),new si({color:"#624a2c"}));j.add(Ee);let Te=new ut(new Zi($.mouth/240,40),O);Te.rotation.x=-Math.PI/2,Te.position.copy(ce($.drop,2.281)),j.add(Te)}}q({discipline:"pool8"});for(let X of[-4.2,4.2])for(let Y of[-1.9,1.9])f(.5,1.7,.5,s.dark,X,.85,Y),f(.54,.12,.54,s.gold,X,.15,Y);for(let X of[-2.75,2.75])for(let Y=-4;Y<=4;Y++)g(new Ri(.025,8,6),s.cream,Y,2.26,X);for(let X of[-2.6,2.6])o.push(g(new Dn(.025,.025,1.5,8),s.dark,X,6,0)),o.push(g(new Dn(.12,.6,.42,32),s.dark,X,5.1,0)),o.push(g(new Zi(.53,32),s.light,X,4.87,0,Math.PI/2));function K(X,Y={discipline:"pool8"}){let ce=document.createElement("canvas");ce.width=256,ce.height=128;let $=ce.getContext("2d");if($.fillStyle=Y.discipline==="pyramid"?as(X,Y):X>8?"#fff5db":as(X,Y),$.fillRect(0,0,256,128),X>8&&Y.discipline!=="pyramid"&&($.fillStyle=as(X,Y),$.fillRect(0,34,256,60)),X)for(let Ue of[64,192])$.fillStyle="#fff9e6",$.beginPath(),$.arc(Ue,64,20,0,Math.PI*2),$.fill(),$.fillStyle="#182328",$.font="bold 27px Arial",$.textAlign="center",$.textBaseline="middle",$.fillText(X,Ue,65);let ye=new on(ce);return ye.colorSpace=ot,i.push(ye),ye}for(let X=0;X<16;X++){let Y=g(new Ri(.1,64,48),new gt({map:K(X),roughness:.12,metalness:0,clearcoat:1,clearcoatRoughness:.08,ior:1.52}),0,2.37,0);Y.rotation.x=-Math.PI/2,a.set(X,Y)}let Q=document.createElement("canvas");Q.width=Q.height=64;let te=Q.getContext("2d"),xe=te.createRadialGradient(32,32,3,32,32,32);xe.addColorStop(0,"#00000099"),xe.addColorStop(1,"#00000000"),te.fillStyle=xe,te.fillRect(0,0,64,64);let we=new on(Q);i.push(we);let Se=new Map;for(let X=0;X<16;X++){let Y=g(new ln(.31,.31),new Bt({map:we,transparent:!0,depthWrite:!1}),0,2.277,0,-Math.PI/2);Y.castShadow=!1,Se.set(X,Y)}let Ne=new rt().setFromPoints([new w,new w]),re=new Nn(Ne,new ia({color:"#f9e3a6",dashSize:.13,gapSize:.08}));t.add(re);let le=new Gt;t.add(le);let oe=new gt({color:"#dec18d",roughness:.24,clearcoat:1}),Ce=new mt({color:"#b6a38a",metalness:.8,roughness:.24}),ke=new gt({color:"#e4c390",roughness:.28,clearcoat:.65}),T=new mt({color:"#182c28",roughness:.65}),S=new mt({color:"#fff0cb",roughness:.3}),F=new mt({color:"#497e94",roughness:.9});function P(X,Y,ce,$,ye){let Ue=new ut(new Dn(ce,$,Y-X,24),ye);Ue.rotation.z=Math.PI/2,Ue.position.x=-(X+Y)/2,Ue.castShadow=!0,le.add(Ue)}P(.15,1.1,.014,.022,ke),P(1.1,2.15,.022,.029,oe),P(2.15,2.85,.029,.034,T),P(2.85,3,.034,.035,oe),P(.11,.15,.015,.015,S),P(.09,.11,.015,.015,F);for(let X of[1.85,2.15,2.85])P(X-.012,X+.012,.033,.033,Ce);for(let X=0;X<40;X++)P(2.16+X*.017,2.164+X*.017,.03,.03,T);let M=new Ci().load("assets/player-hall/billiards-cues-v1.webp");M.colorSpace=ot,M.repeat.set(1/8,1),M.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),i.push(M);let R=document.createElement("canvas");R.width=512,R.height=64;let D=new on(R);D.colorSpace=ot,i.push(D);let I=new ut(new ln(.52,.055),new Bt({map:D,transparent:!0}));I.rotation.x=-Math.PI/2,I.position.set(-1.65,.032,0),I.visible=!1,le.add(I);function Z(X,Y){let ce=["maple","walnut","aces","ocean","carbon","ruby","signature","sovereign"],$=Math.max(0,ce.indexOf(X.id));if(oe.color.set($?"#ffffff":X.color),oe.map=$?M:null,oe.needsUpdate=!0,M.offset.x=$/8,M.needsUpdate=!0,T.color.set(X.grip),Ce.color.set(X.metal),I.visible=!!X.named,X.named){let ye=R.getContext("2d");ye.clearRect(0,0,512,64),ye.fillStyle="#c9a34f",ye.fillRect(0,0,512,64),ye.fillStyle="#171a16",ye.font="bold 39px sans-serif",ye.textAlign="center",ye.textBaseline="middle",ye.fillText(String(Y||"\u0413\u0435\u0440\u043E\u0439").slice(0,28),256,34,490),D.needsUpdate=!0}}let z=g(new $i(.1,.008,8,48),new Bt({color:"#f6dfac",transparent:!0,opacity:.8}),0,2.285,0,Math.PI/2);z.castShadow=!1;let H=performance.now(),ne=g(new $i(.16,.014,8,64),new Bt({color:"#ffd775",depthTest:!1,transparent:!0,opacity:.95}),0,2.29,0,Math.PI/2);ne.castShadow=ne.receiveShadow=!1,ne.renderOrder=10,ne.visible=!1;let pe=new ha,se=new sn(new w(0,1,0),-2.37);function _e(){let X=r.getBoundingClientRect();e.setSize(X.width,X.height,!1),n.aspect=X.width/X.height,n.updateProjectionMatrix(),be(l)}function be(X){if(l=X,o.forEach(Y=>Y.visible=X!=="table"),n.up.set(X==="table"?1:0,X==="table"?0:1,0),X==="table"){let Y=r.getBoundingClientRect(),ce=Number.parseFloat(getComputedStyle(document.body).getPropertyValue("--billiards-controls-height"))||170,$=66,ye=Math.min(ce+12,Y.height*.48),Ue=Math.max(180,Y.height-$-ye),C=Y.width>Y.height,ve=Math.max((C?6.1:11.5)*Y.height/Ue,(C?11.5:6.1)/n.aspect);n.up.set(C?0:1,0,C?-1:0),n.setViewOffset(Y.width,Y.height,Y.width>700?36:27,(ye-$)/2,Y.width,Y.height),n.position.set(0,2.3+ve/(2*Math.tan(n.fov*Math.PI/360)),.01),n.lookAt(0,2.25,0)}else n.clearViewOffset(),n.position.set(9,7.2,10),n.lookAt(0,2,-4)}function Ie(X,Y){let ce=r.getBoundingClientRect();pe.setFromCamera(new ie((X-ce.left)/ce.width*2-1,1-(Y-ce.top)/ce.height*2),n);let $=new w;return pe.ray.intersectPlane(se,$)?{x:$.x*100+500,y:$.z*100+250}:null}function qe(X){let Y=vr({discipline:G.includes("\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430")?"pyramid":"pool8"}).pockets[X].center,ce=new w((Y[0]-500)/100,2.37,(Y[1]-250)/100).project(n),$=r.getBoundingClientRect();return{x:$.left+(ce.x+1)*$.width/2,y:$.top+(1-ce.y)*$.height/2}}function et(X,Y,ce){let $=performance.now(),ye=Math.min(.05,($-H)/1e3);H=$;let Ue=X.discipline+":"+X.color;if(Ue!==c){c=Ue;for(let[ve,Ee]of a){let Te=Ee.material.map;Ee.material.map=K(ve,X),Ee.material.needsUpdate=!0,Te?.dispose();let Ye=i.indexOf(Te);Ye>=0&&i.splice(Ye,1)}q(X)}for(let ve of X.balls){let Ee=a.get(ve.id);if(Ee.visible=!ve.pocket,Ee.position.set((ve.x-500)/100,2.27+Nt(X)/100,(ve.y-250)/100),Ee.scale.setScalar(Nt(X)/10),X.moving&&!ve.pocket){let Ye=new w((ve.rollY||0)/Nt(X),-(ve.side||0)/Nt(X),-(ve.rollX||0)/Nt(X)),ct=Ye.length();ct&&Ee.rotateOnWorldAxis(Ye.normalize(),ct*ye)}let Te=Se.get(ve.id);Te.visible=Ee.visible,Te.position.set(Ee.position.x+.025,2.277,Ee.position.z+.025)}let C=X.discipline==="pool8"&&!X.moving&&X.selectedTarget!=null?X.balls.find(ve=>ve.id===X.selectedTarget&&!ve.pocket):null;if(ne.visible=!!C&&ce&&l==="table",C&&(ne.position.set((C.x-500)/100,2.29,(C.y-250)/100),ne.scale.setScalar(Nt(X)/10)),z.visible=!1,re.visible=le.visible=ce&&l==="table",re.visible){let ve=X.balls.find(tn=>tn.id===(X.cueId??0))||X.balls[0],Ee=(ve.x-500)/100,Te=(ve.y-250)/100,Ye=Math.cos(Y),ct=Math.sin(Y),it=12,Wt=null,Xn=1/0;for(let tn of X.balls){if(tn.id===ve.id||tn.pocket)continue;let fr=(tn.x-500)/100-Ee,pn=(tn.y-250)/100-Te,ui=fr*Ye+pn*ct,fs=fr*fr+pn*pn-ui*ui,Oi=Nt(X)*2/100;if(ui>0&&fs<Oi*Oi){let di=Math.max(0,ui-Math.sqrt(Oi*Oi-fs));di<it&&(it=di,Wt=tn,Xn=di)}}Ye>0&&(it=Math.min(it,(4.9-Ee)/Ye)),Ye<0&&(it=Math.min(it,(-4.9-Ee)/Ye)),ct>0&&(it=Math.min(it,(2.4-Te)/ct)),ct<0&&(it=Math.min(it,(-2.4-Te)/ct)),Wt&&Math.abs(it-Xn)<1e-5&&(z.visible=!0,z.position.set(Ee+Ye*it,2.285,Te+ct*it),z.scale.setScalar(Nt(X)/10),z.material.color.set(ki(X).some(tn=>tn.id===Wt.id)?"#dfefca":"#ed7770"));let Ui=Ne.attributes.position;Ui.setXYZ(0,Ee,2.38,Te),Ui.setXYZ(1,Ee+Ye*it,2.38,Te+ct*it),Ui.needsUpdate=!0,re.computeLineDistances(),le.position.set(Ee,2.4,Te),le.rotation.set(0,-Y,0)}e.render(t,n)}let tt=new _l,fe=!1,Pe=Promise.allSettled([["armchair/ArmChair_01_1k.gltf",2.4,[[8,.08,4,-Math.PI/2],[-8,.08,4,Math.PI/2]],!0],["plant/potted_plant_01-mobile.gltf",2.8,[[9,.08,-8,0],[-9,.08,-8,1]],!1]].map(async([X,Y,ce,$])=>{let ye=await tt.loadAsync("assets/city-interior/"+X),Ue=ye.scene,C=new Ut().setFromObject(Ue),ve=C.getSize(new w);if(fe){Ue.traverse(Ee=>{Ee.geometry?.dispose();for(let Te of[].concat(Ee.material||[])){for(let Ye of Object.values(Te))Ye?.isTexture&&Ye.dispose();Te.dispose()}});return}Ue.position.set(-(C.min.x+C.max.x)/2,-C.min.y,-(C.min.z+C.max.z)/2),Ue.traverse(Ee=>{if(Ee.isMesh)for(let Te of[].concat(Ee.material)){$&&(Te.color.set("#a52721"),Te.roughnessMap=null,Te.roughness=.33);for(let Ye of Object.values(Te))Ye?.isTexture&&i.push(Ye)}});for(let[Ee,Te,Ye,ct]of ce){if(fe)return;let it=new Gt;it.add(Ue.clone()),it.scale.setScalar(Y/ve.y),it.position.set(Ee,Te,Ye),it.rotation.y=ct,t.add(it)}})),He=new ResizeObserver(_e);return He.observe(r),_e(),{render:et,point:Ie,projectPocket:qe,setView:be,setCue:Z,ready:Pe,dispose(){fe=!0,He.disconnect(),t.traverse(X=>{X.geometry?.dispose();for(let Y of[].concat(X.material||[]))Y.dispose()}),i.forEach(X=>X.dispose()),e.dispose()}}}var b0=r=>r===8?null:r<8?0:1;function T0(r){if(r.rulesVersion)return ki(r);let e=r.groups[r.turn],t=r.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||b0(n.id)===e));return t.length?t:r.balls.filter(n=>n.id===8&&!n.pocket)}function gf(r,e,t,n,i=Rl){let s=e.x-r.x,a=e.y-r.y,o=s*s+a*a;return!t.some(l=>!l.pocket&&!n.includes(l.id)&&(()=>{let c=((l.x-r.x)*s+(l.y-r.y)*a)/o;return c<=0||c>=1?!1:Math.hypot(l.x-r.x-s*c,l.y-r.y-a*c)<i*2+1})())}function _f(r){if(r.moving||r.winner!==null)return null;if(r.pending){let o=r.pending;return o.type==="pyramid-foul"?{type:"decision",choice:"play",ballId:r.balls.find(l=>!l.pocket).id}:{type:"decision",choice:o.illegal?"rerack-self":"accept"}}if(r.inHand){for(let o=180;o<mi-30;o+=45)for(let l=gi/2;l<gi-25;l+=30){let c=structuredClone(r);if(Ra(c,o,l))return{type:"place",x:o,y:l}}for(let o=30;o<mi-25;o+=25)for(let l=30;l<gi-25;l+=25){let c=structuredClone(r);if(Ra(c,o,l))return{type:"place",x:o,y:l}}return null}let e=r.discipline==="pyramid"?r.balls.find(o=>o.id===r.cueId&&!o.pocket)||r.balls.find(o=>!o.pocket):r.balls[0],t=r.rulesVersion?Nt(r):Rl,n={...r,cueId:e.id},i=T0(n),s=null;for(let o of i)for(let[l,[c,h]]of Cl.entries()){let u=Math.hypot(c-o.x,h-o.y);if(u<1)continue;let d=(c-o.x)/u,p=(h-o.y)/u,m={x:o.x-d*t*2,y:o.y-p*t*2};if(m.x<t||m.x>mi-t||m.y<t||m.y>gi-t)continue;let v=Math.hypot(m.x-e.x,m.y-e.y),g=((m.x-e.x)*d+(m.y-e.y)*p)/Math.max(1,v);if(g<.25||!gf(e,m,r.balls,[e.id,o.id],t)||!gf(o,{x:c,y:h},r.balls,[e.id,o.id],t))continue;let f=g*700-v*.25-u*.4;s&&s.score>=f||(s={score:f,type:"shot",cueId:e.id,callBall:o.id,callPocket:l,angle:Math.atan2(m.y-e.y,m.x-e.x),power:Math.max(.15,Math.min(.85,(Math.sqrt(2*.018*9810*1e3/Bi(r).length*(v+u/Math.max(.3,g)))/.714-180)/1250+.05))})}if(s)return delete s.score,s;let a=i.slice().sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y)-Math.hypot(l.x-e.x,l.y-e.y))[0];return a?{type:"shot",cueId:e.id,callBall:a.id,callPocket:0,angle:Math.atan2(a.y-e.y,a.x-e.x),power:.4}:null}var os=Object.freeze([{id:"maple",name:"\u041F\u0435\u0440\u0432\u044B\u0439 \u0443\u0434\u0430\u0440",level:0,color:"#dec18d",grip:"#62452e",metal:"#b6a38a"},{id:"walnut",name:"\u041E\u0440\u0435\u0445\u043E\u0432\u044B\u0439 \u043A\u043B\u0443\u0431",level:10,color:"#633a23",grip:"#453024",metal:"#d5ae60"},{id:"aces",name:"\u0414\u0432\u0430 \u0442\u0443\u0437\u0430",level:20,color:"#124e3c",grip:"#173c30",metal:"#e7bb61"},{id:"ocean",name:"\u041E\u043A\u0435\u0430\u043D",level:35,color:"#226b96",grip:"#203f56",metal:"#cad7df"},{id:"carbon",name:"\u041A\u0430\u0440\u0431\u043E\u043D",level:50,color:"#242b30",grip:"#161d21",metal:"#d6dee3"},{id:"ruby",name:"\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0439",level:65,color:"#6d1726",grip:"#3c1720",metal:"#edbf65"},{id:"signature",name:"\u0418\u043C\u0435\u043D\u043D\u043E\u0439",level:80,color:"#eee0b2",grip:"#171b1a",metal:"#e5bf68",named:!0},{id:"sovereign",name:"\u041F\u043E\u0432\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0441\u0442\u043E\u043B\u0430",level:100,color:"#122d27",grip:"#12201c",metal:"#f4cc71"}]);function w0(r,e){let t=os.find(n=>n.id===r);return t&&Number.isFinite(e)&&e>=t.level?t:os[0]}function E0(r){if(!r?.self||!r.accountId)throw Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0433\u0435\u0440\u043E\u044F.");let e=Number(r.garage?.stats?.level);if(!Number.isFinite(e)||e<0)throw Error("\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.");return{accountId:String(r.accountId),level:Math.floor(e),nick:String(r.nick||r.name||"\u0413\u0435\u0440\u043E\u0439").trim().slice(0,28)}}function vf({source:r,room:e,openInitially:t=!1}){let n=d=>document.getElementById(d),i=n("cueDialog"),s=null,a=os[0],o=!1;function l(){return"p21:billiards:cue:v1:"+s.accountId}function c(d){a=d,e?.setCue(d,s?.nick||""),n("cueButton").textContent="\u041A\u0438\u0439 \xB7 "+d.name}function h(){let d=document.activeElement?.dataset?.cue;if(n("cueSave").disabled=o,n("cueHero").textContent=o?"\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F\u2026":s?"\u0412\u0430\u0448 \u0433\u0435\u0440\u043E\u0439 \xB7 \u0443\u0440\u043E\u0432\u0435\u043D\u044C "+s.level:"\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u0438\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C",n("cueList").replaceChildren(),os.forEach((p,m)=>{let v=!!s&&s.level>=p.level||p.level===0,g=document.createElement("button");g.type="button",g.className="cue-card",g.dataset.cue=p.id,g.setAttribute("aria-pressed",String(a.id===p.id)),g.disabled=!v||o;let f=document.createElement("span");f.className="cue-card__art",f.style.backgroundPosition=m/7*100+"% center",f.setAttribute("aria-hidden","true");let _=document.createElement("strong");_.textContent=p.name;let x=document.createElement("small");x.textContent=p.level?"\u0421 "+p.level+" \u0443\u0440\u043E\u0432\u043D\u044F":"\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C";let y=document.createElement("span");if(y.className="cue-card__state",y.textContent=v?a.id===p.id?"\u2713 \u0412\u044B\u0431\u0440\u0430\u043D":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C":"\u{1F512} \u0415\u0449\u0451 "+Math.max(0,p.level-(s?.level||0))+" \u0443\u0440.",g.append(f,_,x),p.named){let b=document.createElement("span");b.className="cue-card__name",b.textContent=s?.level>=p.level?s.nick:"\u0412\u0430\u0448 \u043D\u0438\u043A \u043D\u0430 \u043A\u0438\u0435",g.append(b)}g.append(y),g.onclick=()=>{if(!(o||!v)){c(p);try{s&&localStorage.setItem(l(),p.id)}catch{}h(),n("cueFeedback").textContent="\u0412\u044B\u0431\u0440\u0430\u043D \u043A\u0438\u0439 \xAB"+p.name+"\xBB"+(p.named?" \xB7 "+s.nick:"")+"."}},n("cueList").append(g)}),d){let p=Array.from(n("cueList").children).find(m=>m.dataset.cue===d);p&&!p.disabled&&p.focus({preventScroll:!0})}}async function u(){if(!o){o=!0,h(),n("cueError").textContent="";try{if(typeof r.pokerSocialRequest!="function")throw Error("\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0438\u043B\u044C\u044F\u0440\u0434 \u0438\u0437 \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u043E\u043C\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F.");let d=await r.pokerSocialRequest("player-hall",{action:"get"});s=E0(d.hall);let p;try{p=localStorage.getItem(l())}catch{}c(w0(p,s.level))}catch(d){s=null,c(os[0]),n("cueError").textContent=d.message||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0433\u0435\u0440\u043E\u044F."}finally{o=!1,h()}}}return n("cueSave").onclick=()=>{if(!o)try{s&&localStorage.setItem(l(),a.id),c(a),i.close()}catch{n("cueError").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."}},n("cueRetry").onclick=u,n("cueClose").onclick=()=>i.close(),i.addEventListener("click",d=>{if(d.target===i){let p=i.getBoundingClientRect();(d.clientX<p.left||d.clientX>p.right||d.clientY<p.top||d.clientY>p.bottom)&&i.close()}}),n("cueButton").onclick=()=>{i.showModal(),u()},c(os[0]),h(),u(),t&&i.showModal(),{inspect:()=>({selected:a.id,level:s?.level??null,nick:s?.nick||"",loading:o})}}var xf=["\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430"],me=r=>document.getElementById(r);function yf({move:r,room:e}){let t=0,n="",i=null,s=!1;function a(){return{discipline:me("discipline").value,color:me("ballSet").value,raceTo:Number(me("raceTo").value)}}function o(f){let _=me(f);me(f+"Buttons").replaceChildren(...Array.from(_.options,x=>{let y=document.createElement("button");return y.type="button",y.dataset.value=x.value,y.textContent=x.text,y.setAttribute("aria-pressed",String(_.value===x.value)),y.onclick=()=>{_.value=x.value,_.dispatchEvent(new Event("change"))},y}))}function l(){let f=me("discipline").value==="pyramid";me("ballSet").replaceChildren(...(f?[["yellow","\u0411\u0435\u043B\u044B\u0435 + \u0436\u0451\u043B\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"],["red","\u0411\u0435\u043B\u044B\u0435 + \u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"]]:[["standard","\u0426\u0432\u0435\u0442\u043D\u044B\u0435: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \u0438 \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435"]]).map(([x,y])=>new Option(y,x))),me("disciplineInfo").textContent=f?"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430: \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u0442\u044C 8 \u0448\u0430\u0440\u043E\u0432. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0431\u0438\u0442\u043A\u043E\u043C \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440.":"\u041F\u0443\u043B \xAB\u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430\xBB: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0432\u043E\u044F \u0433\u0440\u0443\u043F\u043F\u0430, \u0437\u0430\u0442\u0435\u043C \u2116 8. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.";let _=Bi(me("discipline").value);me("tableDimensions").textContent=_.name+" \xB7 \u0448\u0430\u0440\u044B "+_.ball+" \u043C\u043C \xB7 \u0441\u0442\u0432\u043E\u0440\u044B "+_.corner+" / "+_.side+" \u043C\u043C",o("discipline"),o("ballSet")}me("placeBreak").onclick=()=>s=!s,me("discipline").onchange=l,me("ballSet").onchange=()=>o("ballSet"),l(),xf.forEach((f,_)=>me("callPocket").add(new Option(_+1+" \xB7 "+f,String(_)))),me("callBall").onchange=me("callPocket").onchange=me("safety").onchange=()=>{},me("decisionButtons").onclick=f=>{let _=f.target.closest("[data-decision]")?.dataset.decision;_&&r({type:"decision",choice:_,ballId:Number(me("penaltyBall").value)})},me("pocketMarkers").replaceChildren(...xf.map((f,_)=>{let x=document.createElement("button");return x.type="button",x.textContent=_+1,x.title=f,x.setAttribute("aria-label","\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0443\u0437\u0443 "+(_+1)+" \xB7 "+f),x.onclick=()=>me("callPocket").value=String(_),x}));function c(f,_){let x=document.createElement("span");return x.className="potted-ball"+(_.discipline!=="pyramid"&&f>8?" striped":""),x.style.setProperty("--ball-color",as(f,_)),x.textContent=f||"",x.title=f?"\u0428\u0430\u0440 "+f:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439 \u0448\u0430\u0440",f===8&&_.discipline==="pool8"&&_.winner!==null&&_.winner!==_.lastShooter&&(x.classList.add("invalid-eight"),x.title="\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435\u043C \u2014 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0448 \u043F\u0430\u0440\u0442\u0438\u0438"),x}function h(f){if(!f)return"\u0411\u0438\u0442\u043E\u043A";let _=["","\u0436\u0451\u043B\u0442\u044B\u0439","\u0441\u0438\u043D\u0438\u0439","\u043A\u0440\u0430\u0441\u043D\u044B\u0439","\u0444\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439","\u043E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439","\u0437\u0435\u043B\u0451\u043D\u044B\u0439","\u0431\u043E\u0440\u0434\u043E\u0432\u044B\u0439","\u0447\u0451\u0440\u043D\u044B\u0439"];return"\u2116 "+f+" \xB7 "+_[f>8?f-8:f]+(f===8?"":f>8?" \xB7 \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0439":" \xB7 \u0441\u043F\u043B\u043E\u0448\u043D\u043E\u0439")}function u(f,_,x){let y=f.value;f.replaceChildren(new Option(x,""),..._.map(b=>new Option(f.id==="callBall"&&i?.discipline==="pool8"?h(b.id):b.id?"\u2116 "+b.id:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439",String(b.id)))),_.some(b=>String(b.id)===y)&&(f.value=y)}function d(f){return{cueId:t,callBall:me("callBall").value===""?null:Number(me("callBall").value),callPocket:me("callPocket").value===""?null:Number(me("callPocket").value),safety:me("safety").checked}}function p(f,_){if(f.discipline!=="pyramid"||f.breakPending||f.inHand)return!1;let x=f.balls.filter(y=>!y.pocket).map(y=>({ball:y,distance:Math.hypot(y.x-_.x,y.y-_.y)})).filter(y=>y.distance<22).sort((y,b)=>y.distance-b.distance)[0]?.ball;return x?(t=x.id,!0):!1}function m(f,{player:_,mode:x,tableView:y,can:b}){i=f,me("matchDiscipline").textContent=f.discipline==="pyramid"?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",(!f.balls.some(k=>k.id===t&&!k.pocket)||f.breakPending||f.discipline!=="pyramid")&&(t=f.discipline==="pyramid"&&!f.breakPending?f.balls.find(k=>!k.pocket)?.id??0:0);let A=f.discipline==="pyramid",L=JSON.stringify([f.shot,f.turn,f.discipline,f.color,f.groups,f.balls.map(k=>k.pocket),f.pending,f.winner,_,x]);me("placeBreak").hidden=!f.breakPending||!b,me("placeBreak").textContent=s?"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432 \u0434\u043E\u043C\u0435 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435":"\u041F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435",me("ballShelves").hidden=!y,me("callControls").hidden=!y||A||f.breakPending||f.moving||!!f.pending||!b,me("cuePickHint").hidden=!y||!A||f.breakPending,me("cuePickHint").textContent="\u0411\u0438\u0442\u043E\u043A: "+(t?"\u2116 "+t:"\u0446\u0432\u0435\u0442\u043D\u043E\u0439")+" \xB7 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0448\u0430\u0440 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",me("decisionPanel").hidden=!f.pending||!b;let U=d(f),N=!A&&!f.breakPending&&!v()&&(U.callBall===null||U.callPocket===null);if(b&&f.pending?me("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438 \u043D\u0438\u0436\u0435":b&&f.inHand?me("hint").textContent=f.handZone==="head"?"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435 \u2014 \u0432 \u043D\u0438\u0436\u043D\u0435\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438 \u0441\u0442\u043E\u043B\u0430":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0431\u0438\u0442\u043A\u0430":b&&N&&(me("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 \u043B\u0438\u0431\u043E \u043E\u0442\u044B\u0433\u0440\u044B\u0448"),me("shoot").disabled=!b||f.inHand||!y||!!f.pending||N||s,me("pocketMarkers").hidden=!y||A||f.breakPending||!b||!!f.pending,me("pocketMarkers").hidden||Array.from(me("pocketMarkers").children).forEach((k,B)=>{let O=e.projectPocket?.(B);O&&(k.style.left=O.x+"px",k.style.top=O.y+"px"),k.classList.toggle("chosen",me("callPocket").value===String(B))}),L!==n){n=L,u(me("callBall"),ki({...f,cueId:t}),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440");for(let B=0;B<2;B++){let O=B===0,j=x==="training"?B:O?_:1-_,G=x==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(B+1):O?"\u0412\u044B":x==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433",q=f.groups[j];me("shelfName"+B).textContent=G,me("shelfGroup"+B).textContent=A?"\u0414\u043E 8 \u0448\u0430\u0440\u043E\u0432":q===null?"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":q===0?"\u0421\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \xB7 1\u20137":"\u041F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 \xB7 9\u201315";let K=[...f.captured?.[j]||f.balls.filter(Q=>Q.pocket&&Q.id&&Q.id!==8&&q!==null&&(Q.id<8?0:1)===q).map(Q=>Q.id)];!A&&f.winner!==null&&f.lastShooter===j&&f.balls.some(Q=>Q.id===8&&Q.pocket)&&K.push(8),me("shelfBalls"+B).replaceChildren(...K.map(Q=>c(Q,f))),me("shelfCount"+B).textContent=(A?K.length:K.filter(Q=>Q!==8).length)+" / "+(A?8:7),me("shelf"+B).classList.toggle("active",f.turn===j&&f.winner===null)}let k=!A&&f.groups[0]===null?f.balls.filter(B=>B.pocket&&B.id&&B.id!==8):[];if(me("unassignedBalls").replaceChildren(...k.map(B=>c(B.id,f))),me("unassignedTray").hidden=!k.length,f.pending){let B=f.pending,O=B.type==="pyramid-foul";me("penaltyLabel").hidden=!O,O&&u(me("penaltyBall"),f.balls.filter(G=>!G.pocket),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440");let j=O?[["play","\u0421\u043D\u044F\u0442\u044C \u0448\u0430\u0440 \u0438 \u0438\u0433\u0440\u0430\u0442\u044C"],["pass","\u0421\u043D\u044F\u0442\u044C \u0448\u0430\u0440 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0445\u043E\u0434"],...B.illegalBreak?[["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:[]]:B.illegal?[["accept","\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"],...B.foul?[["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]]:[],["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:B.eight?[["accept",B.foul?"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \xB7 \u0431\u0438\u0442\u043E\u043A \u0438\u0437 \u0434\u043E\u043C\u0430":"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"],["rerack-self","\u0420\u0430\u0437\u0431\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E"]]:[["accept","\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"],["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]];me("decisionButtons").replaceChildren(...j.map(([G,q])=>{let K=document.createElement("button");return K.type="button",K.dataset.decision=G,K.textContent=q,K}))}}if(f.pending?.type==="pyramid-foul")for(let k of me("decisionButtons").children)k.disabled=me("penaltyBall").value==="";return{...f,cueId:t,selectedTarget:U.callBall}}function v(){return me("safety").checked}function g(){let f=(i?.discipline||a().discipline)==="pyramid";me("rulesTitle").textContent=f?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",me("rulesText").replaceChildren(...(f?["15 \u0431\u0435\u043B\u044B\u0445 \u0448\u0430\u0440\u043E\u0432 \u0438 \u043E\u0434\u0438\u043D \u0446\u0432\u0435\u0442\u043D\u043E\u0439. \u041F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0442\u043E\u0442, \u043A\u0442\u043E \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u043B 8 \u0448\u0430\u0440\u043E\u0432. \u0428\u0430\u0440\u044B \u043D\u0435 \u0434\u0435\u043B\u044F\u0442\u0441\u044F \u043D\u0430 \u0441\u0432\u043E\u0438 \u0438 \u0447\u0443\u0436\u0438\u0435.","\u0420\u0430\u0437\u0431\u043E\u0439 \u2014 \u0446\u0432\u0435\u0442\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u0438\u0437 \u0434\u043E\u043C\u0430. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0435\u0433\u043E \u0431\u0438\u0442\u043A\u043E\u043C. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u0431\u0438\u0432\u0430\u0442\u044C \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440, \u0438 \u0441\u0430\u043C \u0431\u0438\u0442\u043E\u043A \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0448\u0430\u0440\u0430. \u0417\u0430\u043A\u0430\u0437 \u043B\u0443\u0437\u044B \u043D\u0435 \u043D\u0443\u0436\u0435\u043D.","\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439: \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0437\u0430\u0431\u0438\u0442 \u0448\u0430\u0440, \u043B\u0438\u0431\u043E 3 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430, \u043B\u0438\u0431\u043E 2 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430 \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u043F\u0435\u0440\u0435\u0441\u0451\u043A \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0443 \u0441\u0442\u043E\u043B\u0430.","\u0415\u0441\u043B\u0438 \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442, \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u043D\u044B \u0434\u0432\u0430 \u0440\u0430\u0437\u043D\u044B\u0445 \u0431\u043E\u0440\u0442\u0430 \u043B\u0438\u0431\u043E \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u044B \u0438 \u0431\u043E\u0440\u0442. \u042D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0447\u0435\u0440\u0435\u0437 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u0438\u043C \u0448\u0430\u0440\u0430\u043C. \u041E\u0434\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0433\u043E \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0431\u043E\u0440\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E.","\u0417\u0430 \u0444\u043E\u043B \u0432\u0441\u0435 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u0435 \u0448\u0430\u0440\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043B\u044E\u0431\u043E\u0439 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443, \u0437\u0430\u0442\u0435\u043C \u0438\u0433\u0440\u0430\u0435\u0442 \u0441\u0430\u043C \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442 \u0445\u043E\u0434. \u041F\u0440\u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u043C \u0440\u0430\u0437\u0431\u043E\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0430\u043A\u0436\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443 \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C \u0441\u0447\u0451\u0442\u0430."]:["\u0411\u0435\u043B\u044B\u0439 \u0431\u0438\u0442\u043E\u043A \u0438 15 \u0446\u0432\u0435\u0442\u043D\u044B\u0445: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 1\u20137, \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 9\u201315, \u0447\u0451\u0440\u043D\u044B\u0439 \u2116 8. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u0433\u0440\u0443\u043F\u043F\u0443, \u0437\u0430\u0442\u0435\u043C \u0437\u0430\u0431\u0435\u0439\u0442\u0435 \u2116 8 \u0432 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u043B\u0443\u0437\u0443.","\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430. \u0411\u0435\u0437 \u0437\u0430\u0431\u0438\u0442\u043E\u0433\u043E \u0448\u0430\u0440\u0430 \u043C\u0438\u043D\u0438\u043C\u0443\u043C 4 \u0440\u0430\u0437\u043D\u044B\u0445 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u0434\u043E\u043B\u0436\u043D\u044B \u043A\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F \u0431\u043E\u0440\u0442\u0430. \u0421\u0442\u043E\u043B \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.","\u041F\u0435\u0440\u0435\u0434 \u043A\u0430\u0436\u0434\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 (\u043D\u043E\u043C\u0435\u0440\u0430 \u043B\u0443\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u043D\u0430 \u0441\u0442\u043E\u043B\u0435). \u0417\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0443\u0434\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441\u0435\u0440\u0438\u044E. \u041C\u043E\u0436\u043D\u043E \u043E\u0431\u044A\u044F\u0432\u0438\u0442\u044C \u043E\u0442\u044B\u0433\u0440\u044B\u0448 \u2014 \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0433\u043E \u0445\u043E\u0434 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0443.","\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0448\u0430\u0440\u0430 \u0441\u0432\u043E\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B; \u043D\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043C \u0441\u0442\u043E\u043B\u0435 \u2014 \u043B\u044E\u0431\u043E\u0433\u043E, \u043A\u0440\u043E\u043C\u0435 \u2116 8, \u043F\u043E\u043A\u0430 \u043D\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u0430 \u043E\u0434\u043D\u0430 \u0438\u0437 \u0433\u0440\u0443\u043F\u043F. \u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u0435\u043D \u0437\u0430\u0431\u0438\u0442\u044B\u0439 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438\u043B\u0438 \u043A\u0430\u0441\u0430\u043D\u0438\u0435 \u0431\u043E\u0440\u0442\u0430 \u043B\u044E\u0431\u044B\u043C \u0448\u0430\u0440\u043E\u043C.","\u0417\u0430\u0431\u0438\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A, \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0440 \u2014 \u0444\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0441\u0442\u0430\u0432\u0438\u0442 \u0431\u0438\u0442\u043E\u043A \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435; \u043F\u043E\u0441\u043B\u0435 \u0444\u043E\u043B\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u2014 \u0432 \u0434\u043E\u043C\u0435. \u0420\u0430\u043D\u043D\u044F\u044F \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430, \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u0444\u043E\u043B\u043E\u043C \u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043B\u0443\u0437\u0435 \u2014 \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435. \u041D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438\u0431\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439."]).map(_=>{let x=document.createElement("p");return x.textContent=_,x})),me("rules").showModal()}return me("rulesButton").onclick=g,{settings:a,options:d,render:m,chooseCue:p,restoreControls(f){t=f.cueId??0,n="",s=!1,me("callBall").replaceChildren(new Option("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440",""),new Option("\u2116 "+f.callBall,String(f.callBall))),me("callBall").value=f.callBall==null?"":String(f.callBall),me("callPocket").value=f.callPocket==null?"":String(f.callPocket),me("safety").checked=!!f.safety},isPlacing:f=>f.inHand||f.breakPending&&s,placed(){s=!1},reset(){t=0,s=!1,n="",me("callBall").value="",me("callPocket").value="",me("safety").checked=!1},inspect:()=>({selectedCue:t,call:d(i||{})})}}var st=r=>document.getElementById(r),Mf=r=>Math.abs(r)<.005?0:Math.round(r*100)/100;function Sf({adjust:r}){let e={x:0,y:0},t=!1,n=-1;function i(){let o=[];return e.y&&o.push(e.y>0?"\u043D\u0430\u043A\u0430\u0442":"\u043E\u0442\u0442\u044F\u0436\u043A\u0430"),e.x&&o.push(e.x>0?"\u043F\u0440\u0430\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A":"\u043B\u0435\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A"),o.join(" + ")||"\u0446\u0435\u043D\u0442\u0440"}function s(){let o=i();st("spinDot").style.left=50+e.x*43+"%",st("spinDot").style.top=50-e.y*43+"%",st("spinX").value=Math.round(e.x*100),st("spinY").value=Math.round(e.y*100),st("spinXValue").textContent=Math.round(e.x*100)+"%",st("spinYValue").textContent=Math.round(e.y*100)+"%",st("spinLabel").textContent=o,st("spinButton").textContent="\u042D\u0444\u0444\u0435\u043A\u0442 \xB7 "+o,st("spinPad").setAttribute("aria-label","\u0422\u043E\u0447\u043A\u0430 \u0443\u0434\u0430\u0440\u0430: "+o)}function a(o){let l=st("spinPad").getBoundingClientRect(),c=(o.clientX-l.left-l.width/2)/(l.width*.43),h=(l.top+l.height/2-o.clientY)/(l.height*.43),u=Math.max(1,Math.hypot(c,h));e={x:Mf(c/u),y:Mf(h/u)};let d=Math.hypot(e.x,e.y);d>1&&(e.x/=d,e.y/=d),s()}st("spinPad").onpointerdown=o=>{o.preventDefault(),st("spinPad").setPointerCapture(o.pointerId),a(o)},st("spinPad").onpointermove=o=>{st("spinPad").hasPointerCapture(o.pointerId)&&a(o)},st("spinPad").onpointerup=st("spinPad").onpointercancel=o=>{st("spinPad").hasPointerCapture(o.pointerId)&&st("spinPad").releasePointerCapture(o.pointerId)};for(let[o,l,c]of[["spinX","x","y"],["spinY","y","x"]])st(o).oninput=()=>{let h=Math.sqrt(Math.max(0,1-e[c]**2));e[l]=Math.max(-h,Math.min(h,Number(st(o).value)/100)),s()};return st("spinButton").onclick=()=>{t&&st("spinDialog").showModal()},st("spinClose").onclick=()=>st("spinDialog").close(),st("spinReset").onclick=()=>{e={x:0,y:0},s()},st("aimLeft").onclick=()=>{t&&r(-.2*Math.PI/180)},st("aimRight").onclick=()=>{t&&r(.2*Math.PI/180)},s(),{value:()=>({...e}),restore(o){e=o?{...o}:{x:0,y:0},n=-1,s()},reset(){e={x:0,y:0},s(),n=-1},render(o,l){t=l&&!o.pending&&!o.inHand;for(let h of["spinButton","aimLeft","aimRight"])st(h).disabled=!t;o.moving&&o.shot!==n&&(n=o.shot,e={x:0,y:0},s());let c=o.lastShot;st("lastShotSummary").hidden=!c,st("lastShotSummary").textContent=c?"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0443\u0434\u0430\u0440: \u0432 \u043B\u0443\u0437\u044B "+c.potted.length+" \xB7 \u0431\u043E\u0440\u0442\u0430 "+(c.contacts.rails||0)+" \xB7 \u0433\u0443\u0431\u043A\u0438 "+(c.contacts.jaws||0):""},inspect:()=>({spin:{...e}})}}function ls(r=1,e=1){if(r!==1&&r!==3)throw Error("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u043D\u0443 \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0441\u0435\u0440\u0438\u044E \u0434\u043E 3 \u043F\u043E\u0431\u0435\u0434.");return{target:r,wins:[0,0],round:1,creditedRound:0,winner:null,number:e}}function du(r,e){return![0,1].includes(e)||r.winner!==null||r.creditedRound===r.round?!1:(r.wins[e]++,r.creditedRound=r.round,r.wins[e]>=r.target&&(r.winner=e),!0)}function bf(r){if(r.creditedRound!==r.round)throw Error("\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043F\u0430\u0440\u0442\u0438\u044E.");return r.winner!==null?ls(r.target,r.number+1):{...r,wins:[...r.wins],round:r.round+1}}function Tf(){let r=null;return{move(e,t,n){let i=structuredClone(e);return zi(e,e.turn,t)?(t.type==="shot"&&(r={before:i,move:structuredClone(t),controls:structuredClone(n)}),!0):!1},restore(){return r?{state:structuredClone(r.before),controls:structuredClone(r.controls),move:structuredClone(r.move)}:null},replay(){let e=this.restore();return!e||!zi(e.state,e.state.turn,e.move)?null:e},clear(){r=null},inspect:()=>({available:!!r})}}var he=r=>document.getElementById(r),ue=vs(),cs=ue,wt=0,Wn=!1,hs=null,Tn=0,ci=!1,us=performance.now(),bn=0,fu=0,pu=-1,Et=null,ya=0,xl="",Qe=null,dr=0,At=ls(),Ma=At,ds=Tf(),hi;try{hi=mf(he("room"))}catch{he("connection").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C 3D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.",he("create").disabled=he("join").disabled=he("solo").disabled=he("training").disabled=!0}var Ef=window;try{parent!==window&&parent.location.origin===location.origin&&(Ef=parent)}catch{}var pr=Sf({adjust:r=>{Tn=Math.atan2(Math.sin(Tn+r),Math.cos(Tn+r))}}),Vt=yf({move:r=>mu(r),room:hi}),Af=new URLSearchParams(location.search).get("mode")==="cues";Af&&(he("lobby").hidden=!0);var A0=vf({source:Ef,room:hi,openInitially:Af});async function R0(r){let e=window;try{parent!==window&&parent.location.origin===location.origin&&(e=parent)}catch{}let t=e.pokerApiAuthJsonBody?.({})||{},n=e.getApiBase?.()||location.origin,i=await fetch(n+"/api/billiards",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",cache:"no-store",body:JSON.stringify({...t,...r}),signal:AbortSignal.timeout(1e4)}),s=await i.json();if(!i.ok||!s.ok)throw Error(s.error||"\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.");return s}function Di(r){he("connection").textContent=r}function Sa(r){Qe===null&&(he("lobby").hidden=!r),ci=r,hi?.setView(r?"table":"room"),document.body.classList.toggle("billiards-table-view",r),he("view").textContent=r?"\u0412 \u043A\u043E\u043C\u043D\u0430\u0442\u0443":"\u041A \u0441\u0442\u043E\u043B\u0443"}function ps(){ds.clear(),Wn=!1,Qe=null,dr=0,Et=null,hs?.close(),hs=null,xl="",he("create").disabled=he("join").disabled=!1,he("lobby").hidden=!1,he("game").hidden=!0,Sa(!1),he("lobby").hidden=!1}function Rf(r=!1){if(!hi)return;du(At,ue.winner);let e=r&&Qe==="solo"&&ue.winner!==null?ue:null,t=e?bf(At):ls(Vt.settings().raceTo),n=e?{discipline:e.discipline,color:e.color,breaker:1-(e.breaker||0)}:Vt.settings();ps(),Qe="solo",At=t,Ma=At,ue=vs({...n,seed:Math.floor(Math.random()*4294967296)}),Vt.reset(),pr.reset(),cs=ue,wt=0,Wn=!0,Tn=0,bn=0,ue.message=ue.turn===0?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443 \xB7 \u0431\u0438\u0442\u043E\u043A \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043C\u0430":"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443",he("lobby").hidden=!0,he("game").hidden=!1,he("matchMode").textContent="\u041E\u0414\u0418\u041D\u041E\u0427\u041D\u0410\u042F \u041F\u0410\u0420\u0422\u0418\u042F \xB7 \u041A\u041E\u041C\u041F\u042C\u042E\u0422\u0415\u0420",Sa(!0),us=performance.now()}function Cf(){hi&&(ps(),Qe="training",ue=vs({...Vt.settings(),seed:Math.floor(Math.random()*4294967296)}),cs=ue,At=ls(),Vt.reset(),pr.reset(),wt=0,Wn=!0,Tn=0,bn=0,he("lobby").hidden=!0,he("game").hidden=!1,he("matchMode").textContent="\u0422\u0420\u0415\u041D\u0418\u0420\u041E\u0412\u041A\u0410 \xB7 \u0412\u042B \u0423\u041F\u0420\u0410\u0412\u041B\u042F\u0415\u0422\u0415 \u041E\u0411\u0415\u0418\u041C\u0418 \u0421\u0422\u041E\u0420\u041E\u041D\u0410\u041C\u0418",Sa(!0),us=performance.now())}function mu(r){return Qe==="training"?ds.move(ue,r,{angle:Tn,power:Number(he("power").value),rules:Vt.options(ue),spin:pr.value()}):Qe==="solo"?zi(ue,wt,r):hs?.move(r)}function If(r){if(Qe!=="training")return;let e=r?ds.replay():ds.restore();e&&(ue=e.state,cs=ue,wt=ue.turn,Tn=e.controls.angle,he("power").value=e.controls.power,he("powerValue").textContent=e.controls.power+"%",Vt.restoreControls(e.controls.rules),pr.restore(e.controls.spin),bn=0,us=performance.now(),dr=0)}function C0(r){if(Ll(r.state)&&(xl="",ya=r.serverNow-Date.now(),wt=r.player,Wn=r.ready,he("roomCode").textContent=r.roomId,he("invite").hidden=r.player!==0,he("create").disabled=he("join").disabled=!1,r.challengeSent&&Di("\u0412\u044B\u0437\u043E\u0432 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 \u0447\u0430\u0442 \u0438\u0433\u0440\u043E\u043A\u043E\u0432 \xB7 \u0436\u0434\u0451\u043C \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"),r.ready?(he("lobby").hidden=!0,he("game").hidden=!1,he("matchMode").textContent="\u041F\u0410\u0420\u0422\u0418\u042F \u0421 \u0414\u0420\u0423\u0413\u041E\u041C \xB7 \u041E\u041D\u041B\u0410\u0419\u041D"):r.challengeSent||Di("\u041A\u043E\u043C\u043D\u0430\u0442\u0430 "+r.roomId+" \xB7 \u0436\u0434\u0451\u043C \u0434\u0440\u0443\u0433\u0430"),r.revision!==pu)){if(pu=r.revision,cs=r.state,Ma=r.match||ls(),Et=r.playback,At=Et?.matchBefore?structuredClone(Et.matchBefore):structuredClone(Ma),Et&&Ll(Et.before)&&Date.now()+ya<Et.startedAt+Et.durationMs){ue=structuredClone(Et.before),Et.move?zi(ue,ue.turn,Et.move):Il(ue,Et.angle,Et.power);let e=Math.max(0,Date.now()+ya-Et.startedAt);for(let t=0;t<Math.floor(e/1e3*120)&&ue.moving;t++)Ca(ue)}else ue=cs,At=structuredClone(Ma),Et=null;r.ready&&!ci&&Sa(!0),bn=0,us=performance.now()}}function ba(r,e=!1){let t=he("code").value.toUpperCase().replace(/\s/g,"");if(!r&&!/^[A-HJ-NP-Z2-9]{10}$/.test(t)){Di("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u0441\u043B\u0430\u043B \u0434\u0440\u0443\u0433.");return}ps(),Qe="online",pu=-1,he("create").disabled=he("join").disabled=!0,Di(r?"\u0421\u043E\u0437\u0434\u0430\u0451\u043C \u043A\u043E\u043C\u043D\u0430\u0442\u0443\u2026":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F\u2026"),hs=Hu({request:R0,onUpdate:C0,onError(n,i){xl=n,Wn=!1,Di(n),i?he("create").disabled=he("join").disabled=!1:he("hint").textContent=n}}),hs.start(r,t,{...Vt.settings(),challenge:e})}he("challenge").onclick=()=>{he("create").disabled||ba(!0,!0)};he("solo").onclick=()=>Rf();he("training").onclick=Cf;he("restoreShot").onclick=()=>If(!1);he("repeatShot").onclick=()=>If(!0);he("create").onclick=()=>ba(!0);he("join").onclick=()=>ba(!1);he("code").onkeydown=r=>{r.key==="Enter"&&ba(!1)};he("copy").onclick=async()=>{try{await navigator.clipboard.writeText(he("roomCode").textContent),Di("\u041A\u043E\u0434 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0434\u0440\u0443\u0433\u0443.")}catch{Di("\u041A\u043E\u0434 \u043A\u043E\u043C\u043D\u0430\u0442\u044B: "+he("roomCode").textContent)}};he("view").onclick=()=>Sa(!ci);he("power").oninput=()=>{he("powerValue").textContent=he("power").value+"%"};he("shoot").onclick=()=>mu({type:"shot",angle:Tn,power:Number(he("power").value)/100,...Vt.options(ue),spin:pr.value()});he("again").onclick=()=>Qe==="training"?Cf():Qe==="solo"?Rf(!0):hs?.move(null,!0);he("modes").onclick=()=>{ps(),Di("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u0443\u044E \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0438\u0433\u0440\u0443 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C.")};var gu=!1;function Pf(r){if(!ci||!Wn||ue.turn!==wt||ue.moving||ue.winner!==null)return;let e=hi.point(r.clientX,r.clientY);if(!e)return;if(Vt.isPlacing(ue)||ue.breakPending&&r.shiftKey){r.type==="pointerdown"&&(mu({type:"place",x:e.x,y:e.y}),Vt.placed());return}if(r.type==="pointerdown"&&Vt.chooseCue(ue,e))return;let t=Vt.options(ue).cueId,n=ue.balls.find(i=>i.id===t&&!i.pocket);n&&(Math.hypot(e.x-n.x,e.y-n.y)<18||(Tn=Math.atan2(n.y-e.y,n.x-e.x)))}he("room").onpointerdown=r=>{gu=!0,he("room").setPointerCapture(r.pointerId),Pf(r)};he("room").onpointermove=r=>{gu&&Pf(r)};he("room").onpointerup=he("room").onpointercancel=()=>gu=!1;he("closeRules").onclick=()=>he("rules").close();he("back").onclick=()=>{ps(),parent!==window?parent.postMessage({type:"p21-billiards-close"},location.origin):location.assign("./")};function Lf(r){let e=Math.min((r-us)/1e3,.1);if(us=r,Qe==="solo"||Qe==="training"){for(bn+=e;bn>=1/120&&ue.moving;)Ca(ue),bn-=1/120;if(ue.moving||(bn=0),Qe==="solo"&&ue.turn===1&&!ue.moving&&ue.winner===null){if(dr||(dr=r+650),r>=dr){let a=_f(ue);a&&zi(ue,1,a),dr=0}}else dr=0}else if(Et&&Date.now()+ya>=Et.startedAt){for(bn+=e;bn>=1/120&&ue.moving;)Ca(ue),bn-=1/120;Date.now()+ya>=Et.startedAt+Et.durationMs&&(ue=cs,At=structuredClone(Ma),Et=null)}Qe==="solo"&&du(At,ue.winner),Qe==="training"&&(wt=ue.turn);let t=Wn&&ue.turn===wt&&!ue.moving&&ue.winner===null,n=Qe==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(ue.turn+1):ue.turn===wt?"\u0412\u0430\u0448 \u0445\u043E\u0434":Qe==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430";he("status").textContent=Qe==="training"&&ue.winner!==null?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(ue.winner+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0430 \u043F\u0430\u0440\u0442\u0438\u044E":Qe!=="training"&&At.winner!==null&&ue.winner!==null?At.winner===wt?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 "+(At.target===3?"\u0441\u0435\u0440\u0438\u044E":"\u043F\u0430\u0440\u0442\u0438\u044E"):"\u041F\u043E\u0431\u0435\u0434\u0438\u043B "+(Qe==="solo"?"\u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0434\u0440\u0443\u0433"):ue.moving?"\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438":ue.winner!==null?ue.winner===wt?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 \u043F\u0430\u0440\u0442\u0438\u044E":Qe==="solo"?"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u0434\u0440\u0443\u0433":ue.pending?(ue.turn===wt?"\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440":"\u0412\u044B\u0431\u043E\u0440 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430")+" \xB7 "+ue.message:ue.inHand?n+" \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438"+(ue.handZone==="head"?" \u0438\u0437 \u0434\u043E\u043C\u0430":""):ue.breakPending?ue.turn===wt?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":Qe==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":"\u0414\u0440\u0443\u0433 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":n,he("hint").textContent=xl||(Wn?ue.winner!==null?"\u041F\u0430\u0440\u0442\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430":ue.moving?"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0448\u0430\u0440\u043E\u0432":ue.turn!==wt?Qe==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430":ue.inHand?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u0431\u0438\u0442\u043A\u0430":ci?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043A\u0438\u0439 \u0437\u0430 \u0437\u0430\u0434\u043D\u044E\u044E \u0447\u0430\u0441\u0442\u044C \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043B\u0443":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041A \u0441\u0442\u043E\u043B\u0443\xBB, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0443\u0434\u0430\u0440":"");for(let a=0;a<2;a++){let o=ue.groups[a];he("p"+(a+1)).textContent=(Qe==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(a+1):a===wt?"\u0412\u044B":Qe==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 "+(ue.discipline==="pyramid"?"\u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":o===null?"\u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":o===0?"\u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435":"\u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435")+" \xB7 "+ue.scores[a]+"/"+(ue.discipline==="pyramid"?8:7),he("p"+(a+1)).className=ue.turn===a?"active":""}he("seriesScore").hidden=Qe==="training"||!Wn,he("seriesScore").textContent=At.target===3?"\u0414\u043E 3 \u043F\u043E\u0431\u0435\u0434 \xB7 \u0412\u044B "+At.wins[wt]+" : "+At.wins[1-wt]+" "+(Qe==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 \u043F\u0430\u0440\u0442\u0438\u044F "+At.round:"\u041E\u0434\u043D\u0430 \u043F\u0430\u0440\u0442\u0438\u044F",he("trainingControls").hidden=Qe!=="training";let i=ds.inspect().available;he("restoreShot").disabled=he("repeatShot").disabled=!i,he("again").hidden=Qe!=="training"&&(ue.winner===null||wt!==0),he("again").textContent=Qe==="training"?"\u041D\u043E\u0432\u0430\u044F \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430":At.target===3?At.winner!==null?"\u041D\u043E\u0432\u0430\u044F \u0441\u0435\u0440\u0438\u044F \u0434\u043E 3 \u043F\u043E\u0431\u0435\u0434":"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F":"\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F",Qe==="training"?he("hint").textContent=ue.moving?"\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0439\u0442\u0435 \u0443\u0434\u0430\u0440 \u0438\u043B\u0438 \u0432\u0435\u0440\u043D\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u0443\u044E \u043F\u043E\u0437\u0438\u0446\u0438\u044E":"\u0411\u0435\u0437 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430: \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043E\u0431\u0435\u0438\u043C\u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u0430\u043C\u0438 \u0438 \u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u0434\u0430\u0440 \u0437\u0430\u043D\u043E\u0432\u043E":ue.winner!==null&&Qe==="online"&&wt!==0&&(he("hint").textContent="\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u044C \u043A\u043E\u043C\u043D\u0430\u0442\u044B"),pr.render(ue,t&&ci);let s=Vt.render(ue,{player:wt,mode:Qe,tableView:ci,can:t});ci&&hi?.render(s,Tn,t&&!ue.inHand&&!ue.pending),fu=requestAnimationFrame(Lf)}var Nf=new ResizeObserver(()=>{let r=he("game").getBoundingClientRect().height;r&&document.body.style.setProperty("--billiards-controls-height",Math.ceil(r)+"px")});Nf.observe(he("game"));var wf=new URLSearchParams(location.search).get("room");/^[A-HJ-NP-Z2-9]{10}$/.test(wf||"")&&(he("code").value=wf,ba(!1));fu=requestAnimationFrame(Lf);window.PokerBilliards={inspect:()=>({mode:Qe,ready:Wn,tableView:ci,equipment:A0.inspect(),rules:Vt.inspect(),shotTools:pr.inspect(),training:ds.inspect(),series:structuredClone(At),angle:Tn,state:structuredClone(ue)})};window.addEventListener("pagehide",()=>{cancelAnimationFrame(fu),Nf.disconnect(),ps(),hi?.dispose()});})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
