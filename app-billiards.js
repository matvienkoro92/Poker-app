(()=>{var xu=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],is=Number.isFinite,or=r=>r===8?null:r<8?0:1;function _l(r,e,t){return!r.inHand||r.moving||r.winner!==null||!is(e)||!is(t)||e<15||e>985||t<15||t>485||r.balls.some(n=>n.id&&!n.pocket&&Math.hypot(n.x-e,n.y-t)<21)||xu.some(n=>Math.hypot(n[0]-e,n[1]-t)<28)?!1:(Object.assign(r.balls[0],{x:e,y:t,vx:0,vy:0,pocket:!1}),r.inHand=!1,r.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function vl(r,e,t){if(r.moving||r.inHand||r.winner!==null||!is(e)||!is(t)||t<.05||t>1)return!1;Object.assign(r.balls[0],{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),r.moving=!0,r.firstHit=null,r.sunk=[],r.scratch=!1;let n=r.groups[r.turn];return r.eightReady=n!==null&&!r.balls.some(i=>i.id&&i.id!==8&&!i.pocket&&or(i.id)===n),r.legalFirst=r.eightReady?[8]:r.balls.filter(i=>i.id&&i.id!==8&&!i.pocket&&(n===null||or(i.id)===n)).map(i=>i.id),r.shot++,r.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0}function Cf(r){r.moving=!1;let e=r.turn,t=r.groups[e],n=r.balls.some(a=>!a.pocket&&a.id&&a.id!==8&&or(a.id)===t),i=r.scratch||r.firstHit===null||!r.legalFirst.includes(r.firstHit);if(r.sunk.includes(8)){r.winner=!i&&r.eightReady?e:1-e,r.message="\u0418\u0433\u0440\u043E\u043A "+(r.winner+1)+" \u043F\u043E\u0431\u0435\u0434\u0438\u043B"+(r.winner!==e?" \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0437\u0430\u0431\u0438\u0442\u0430 \u0440\u0430\u043D\u044C\u0448\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0438\u043B\u0438 \u0441 \u0444\u043E\u043B\u043E\u043C":"");return}!i&&t===null&&r.sunk.some(a=>a!==8)&&(r.groups[e]=or(r.sunk.find(a=>a!==8)),r.groups[1-e]=1-r.groups[e]),r.scores=[0,1].map(a=>r.balls.filter(o=>o.id&&o.id!==8&&o.pocket&&or(o.id)===r.groups[a]).length);let s=!i&&r.sunk.some(a=>or(a)===r.groups[e]);s||(r.turn=1-e),i?(r.inHand=!0,r.balls[0].pocket=!0,r.message="\u0424\u043E\u043B \xB7 \u0438\u0433\u0440\u043E\u043A "+(r.turn+1)+" \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0431\u0438\u0442\u043E\u043A"):r.message="\u0425\u043E\u0434 \u0438\u0433\u0440\u043E\u043A\u0430 "+(r.turn+1)+(s?" \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":"")}function yu(r,e=1/120){if(r.moving){e=Math.min(Math.max(e,0),1/120);for(let t of r.balls){if(t.pocket)continue;t.x+=t.vx*e,t.y+=t.vy*e;let n=Math.hypot(t.vx,t.vy),i=Math.max(0,n-135*e);if(n&&(t.vx*=i/n,t.vy*=i/n),xu.some(([s,a])=>Math.hypot(t.x-s,t.y-a)<24)){t.pocket=!0,t.vx=t.vy=0,t.id===0?r.scratch=!0:r.sunk.push(t.id);continue}t.x<10&&(t.x=10,t.vx=Math.abs(t.vx)*.84),t.x>990&&(t.x=990,t.vx=-Math.abs(t.vx)*.84),t.y<10&&(t.y=10,t.vy=Math.abs(t.vy)*.84),t.y>490&&(t.y=490,t.vy=-Math.abs(t.vy)*.84)}for(let t=0;t<r.balls.length;t++)for(let n=t+1;n<r.balls.length;n++){let i=r.balls[t],s=r.balls[n];if(i.pocket||s.pocket)continue;let a=s.x-i.x,o=s.y-i.y,l=Math.hypot(a,o);if(l>=20)continue;l=Math.max(l,.001);let c=a/l,h=o/l,u=(20-l)/2+.001;i.x-=c*u,i.y-=h*u,s.x+=c*u,s.y+=h*u;let p=(i.vx-s.vx)*c+(i.vy-s.vy)*h;if(p>0){i.id===0&&r.firstHit===null&&(r.firstHit=s.id),s.id===0&&r.firstHit===null&&(r.firstHit=i.id);let d=p*.98;i.vx-=d*c,i.vy-=d*h,s.vx+=d*c,s.vy+=d*h}}r.balls.every(t=>t.pocket||Math.hypot(t.vx,t.vy)<1)&&(r.balls.forEach(t=>t.vx=t.vy=0),Cf(r))}}function Mu(r,e,t){return e!==r.turn||!t||typeof t!="object"?!1:t.type==="shot"?vl(r,t.angle,t.power):t.type==="place"?_l(r,t.x,t.y):!1}function Su(r){return!!r&&[0,1].includes(r.turn)&&Array.isArray(r.balls)&&r.balls.length===16&&new Set(r.balls.map(e=>e.id)).size===16&&r.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(is)&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3)&&Array.isArray(r.groups)&&r.groups.length===2&&r.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(r.scores)&&r.scores.length===2&&r.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=7)&&(r.winner===null||r.winner===0||r.winner===1)&&typeof r.message=="string"&&r.message.length<250}var bu=Object.freeze({pool8:Object.freeze({name:"\u041F\u0443\u043B \xB7 9 \u0444\u0443\u0442\u043E\u0432",length:2540,ball:57.15,corner:114.3,side:127,cornerShelf:38.1,sideShelf:6.35,cornerFlare:7,sideFlare:14,restitution:.86}),pyramid:Object.freeze({name:"\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430 \xB7 12 \u0444\u0443\u0442\u043E\u0432",length:3560,ball:68,corner:72.5,side:82.5,cornerShelf:5.5,sideShelf:0,cornerFlare:0,sideFlare:0,restitution:.84})}),Ii=r=>bu[typeof r=="string"?r:r.discipline]||bu.pool8,xl=new Map;function lr(r){let e=Ii(r),t=e.name;if(xl.has(t))return xl.get(t);let n=1e3/e.length,i=e.ball/2*n,s=e.corner*n,a=e.side*n,o=s/Math.SQRT2,l=a/2,c=[[[o,0],[500-l,0],2],[[500+l,0],[1e3-o,0],2],[[o,500],[500-l,500],3],[[500+l,500],[1e3-o,500],3],[[0,o],[0,500-o],0],[[1e3,o],[1e3,500-o],1]].map(([d,m,g])=>({a:d,b:m,side:g,jaw:!1})),h=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],u=h.map(([d,m],g)=>{let f=g%3===1,_=f?[0,m===0?1:-1]:[d===0?Math.SQRT1_2:-Math.SQRT1_2,m===0?Math.SQRT1_2:-Math.SQRT1_2],v=[-_[1],_[0]],x=f?a:s,y=f?[d,m]:[d+_[0]*o/Math.SQRT2,m+_[1]*o/Math.SQRT2],w=(f?e.sideShelf:e.cornerShelf)*n,R=w+i*1.4,N=Math.tan((f?e.sideFlare:e.cornerFlare)*Math.PI/180),D=[-1,1].map(C=>y.map((B,G)=>B+v[G]*x/2*C));for(let[C,B]of D.entries()){let G=C===0?-1:1,O=B.map((Y,k)=>Y-_[k]*R-v[k]*G*N*R);c.push({a:B,b:O,side:f?m===0?2:3:Math.abs(B[0]-d)<.01?d===0?0:1:m===0?2:3,jaw:!0})}return{index:g,center:y,n:_,t:v,mouth:x,shelf:w,ends:D,drop:y.map((C,B)=>C-_[B]*(w+i*.7))}}),p={spec:e,scale:n,r:i,rails:c,pockets:u};return xl.set(t,p),p}function Tu(r,e){for(let t of e.pockets){let n=r.x-t.center[0],i=r.y-t.center[1],s=n*t.n[0]+i*t.n[1],a=n*t.t[0]+i*t.t[1];if(s<-(t.shelf+e.r*.6)&&Math.abs(a)<t.mouth/2-e.r*.99)return t.index}return-1}function wu(r,e){let t=e.b[0]-e.a[0],n=e.b[1]-e.a[1],i=t*t+n*n,s=Math.max(0,Math.min(1,((r.x-e.a[0])*t+(r.y-e.a[1])*n)/i));return{x:e.a[0]+t*s,y:e.a[1]+n*s}}var Eu=(r,e)=>Math.max(-e,Math.min(e,r));function Au(r){return r===void 0||!!r&&typeof r=="object"&&Number.isFinite(r.x)&&Number.isFinite(r.y)&&Math.hypot(r.x,r.y)<=1.000001}function Ru(r,e,t,n={x:0,y:0}){let i=1.625*n.y*t;r.rollX=Math.cos(e)*i,r.rollY=Math.sin(e)*i,r.side=-1.625*n.x*t}function Cu(r,e,t){let n=981e4/Ii(t).length,i=r.vx-(r.rollX||0),s=r.vy-(r.rollY||0),a=Math.hypot(i,s);if(a>.05){let o=Math.min(.2*n*e,a/3.5),l=i/a*o,c=s/a*o;r.vx-=l,r.vy-=c,r.rollX=(r.rollX||0)+2.5*l,r.rollY=(r.rollY||0)+2.5*c}else{let o=Math.hypot(r.vx,r.vy),l=Math.max(0,o-.018*n*e);o&&(r.vx*=l/o,r.vy*=l/o),r.rollX=r.vx,r.rollY=r.vy}r.side=Math.sign(r.side||0)*Math.max(0,Math.abs(r.side||0)-.018*n*e)}function Iu(r,e,t,n){let i=r.vx*e+r.vy*t;if(i>=0)return!1;let s=-(1+n)*i,a=-t,o=e,l=r.vx*a+r.vy*o-(r.side||0),c=Eu(-l/3.5,.14*s);return r.vx+=s*e+c*a,r.vy+=s*t+c*o,r.side=(r.side||0)-2.5*c,!0}function Pu(r,e,t,n,i){let s=-n,a=t,o=(r.vx-e.vx)*s+(r.vy-e.vy)*a+(r.side||0)+(e.side||0),l=Eu(o/7,.04*i);r.vx-=l*s,r.vy-=l*a,e.vx+=l*s,e.vy+=l*a,r.side=(r.side||0)-2.5*l,e.side=(e.side||0)-2.5*l}function ua(r){r.rollX=r.rollY=r.side=0}function Lu(r){return Math.hypot(r.vx-(r.rollX||0),r.vy-(r.rollY||0))>1}var oi=1e3,li=500,yl=10,Ml=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],Du=["pool8","pyramid"],rs=r=>r===8||r===0?null:r<8?0:1,It=r=>lr(r).r,Pf=r=>r.balls.find(e=>e.id===(r.cueId??0));function pa(r={}){let e=r.discipline||"pool8";if(!Du.includes(e))throw Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0430");let t=e==="pyramid"&&r.color==="red"?"red":e==="pyramid"?"yellow":"standard",n=It({discipline:e}),i=(Number(r.seed)||1)>>>0,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),a=Array.from({length:15},(c,h)=>h+1);for(let c=14;c>0;c--){let h=Math.floor(s()*(c+1));[a[c],a[h]]=[a[h],a[c]]}if(e==="pool8"){let c=a.indexOf(8);[a[4],a[c]]=[8,a[4]];let h=a.find(p=>p<8),u=a.find(p=>p>8);for(let[p,d]of[[h,10],[u,14]]){let m=a.indexOf(p);[a[d],a[m]]=[p,a[d]]}}let o=[{id:0,x:230,y:250,vx:0,vy:0,pocket:!1}],l=0;for(let c=0;c<5;c++)for(let h=0;h<=c;h++)o.push({id:a[l++],x:750+c*(2*n+.05)*Math.sqrt(3)/2,y:250+(h-c/2)*(2*n+.05),vx:0,vy:0,pocket:!1});return{rulesVersion:2,discipline:e,color:t,seed:Number(r.seed)||1,balls:o,turn:r.breaker===1?1:0,breaker:r.breaker===1?1:0,cueId:0,groups:[null,null],scores:[0,0],captured:[[],[]],moving:!1,inHand:!1,handZone:null,winner:null,shot:0,breakPending:!0,message:"\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430 \xB7 \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A",firstHit:null,sunk:[],scratch:!1,pending:null}}function Uu(r){return!r.moving&&r.winner===null&&!r.pending}function fa(r,e,t){if(!r.rulesVersion)return _l(r,e,t);let n=It(r),i=Pf(r);return!Uu(r)||!r.inHand&&!r.breakPending||!i||![e,t].every(Number.isFinite)||e<n||e>oi-n||t<n||t>li-n||(r.handZone==="head"||r.breakPending)&&e>=250||r.balls.some(s=>s.id!==i.id&&!s.pocket&&Math.hypot(s.x-e,s.y-t)<n*2+.05)||Ml.some(s=>Math.hypot(s[0]-e,s[1]-t)<25)?!1:(Object.assign(i,{x:e,y:t,vx:0,vy:0,pocket:!1}),r.nextHeadShot=r.handZone==="head",r.inHand=!1,r.handZone=null,ua(i),r.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function Lf(r,e){let t=[];return r.x<=e+.2&&t.push(0),r.x>=oi-e-.2&&t.push(1),r.y<=e+.2&&t.push(2),r.y>=li-e-.2&&t.push(3),t}function Pi(r){if(r.discipline==="pyramid")return r.balls.filter(n=>!n.pocket&&n.id!==(r.cueId??0));let e=r.groups[r.turn],t=r.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||rs(n.id)===e));return e===null&&[0,1].some(n=>!r.balls.some(i=>!i.pocket&&rs(i.id)===n))?[...t,...r.balls.filter(n=>n.id===8&&!n.pocket)]:t.length?t:r.balls.filter(n=>n.id===8&&!n.pocket)}function Sl(r,e,t,n={}){if(!r.rulesVersion)return vl(r,e,t);if(!Au(n.spin)||!Uu(r)||r.inHand||![e,t].every(Number.isFinite)||t<.05||t>1)return!1;let i=r.discipline==="pyramid"&&!r.breakPending?n.cueId??r.cueId:0,s=r.balls.find(c=>c.id===i&&!c.pocket);if(!s||r.breakPending&&s.x>=250)return!1;r.cueId=i;let a=Pi(r).map(c=>c.id),o=r.breakPending,l=n.safety===!0;return r.discipline==="pool8"&&!o&&!l&&(!a.includes(n.callBall)||!Number.isInteger(n.callPocket)||n.callPocket<0||n.callPocket>5)?!1:(r.headShot=!!r.nextHeadShot||o,r.nextHeadShot=!1,r.headExited=s.x>=250,r.illegalHead=!1,r.lastShooter=r.turn,r.call=o?null:{ball:n.callBall,pocket:n.callPocket,safety:l},r.legalFirst=o?r.balls.filter(c=>c.id).map(c=>c.id):a,r.eightReady=r.discipline==="pool8"&&a.includes(8),Object.assign(s,{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),r.spin=n.spin?{x:n.spin.x,y:n.spin.y}:{x:0,y:0},Ru(s,e,180+t*1250,r.spin),r.contacts={balls:0,rails:0,jaws:0},r.moving=!0,r.firstHit=null,r.sunk=[],r.pots=[],r.scratch=!1,r.railAfter=!1,r.breakRails=[],r.breakCross=[],r.tracks=Object.fromEntries(r.balls.map(c=>[c.id,{rails:[],cross:!1,frozen:Lf(c,It(r))}])),r.pyramidLegal=!1,r.wasBreak=o,r.breakPending=!1,r.shot++,r.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0)}function Ou(r,e){let t=r.balls.find(i=>i.id===e),n=It(r);if(t){for(let i of[1,-1])for(let s=750;i>0?s<oi-n:s>n;s+=i*(2*n+.1))if(!r.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-s,a.y-250)<2*n+.05)){Object.assign(t,{x:s,y:250,vx:0,vy:0,pocket:!1});return}for(let i=n+1;i<oi-n;i+=2*n+1)for(let s=n+1;s<li-n;s+=2*n+1)if(!r.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-i,a.y-s)<2*n+.05)){Object.assign(t,{x:i,y:s,vx:0,vy:0,pocket:!1});return}}}function da(r){r.captured=r.groups.map(e=>e===null?[]:r.balls.filter(t=>t.pocket&&rs(t.id)===e).map(t=>t.id).sort((t,n)=>t-n)),r.scores=r.captured.map(e=>e.length)}function bl(r,e){r.winner=e,r.message="\u0418\u0433\u0440\u043E\u043A "+(e+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B \u043F\u0430\u0440\u0442\u0438\u044E"}function Nf(r){let e=r.turn,t=r.wasBreak,n=r.scratch||r.illegalHead||r.firstHit===null||!r.legalFirst.includes(r.firstHit)||!t&&!r.sunk.length&&!r.railAfter,i=r.sunk.includes(8);if(t){i&&Ou(r,8);let o=!r.sunk.length&&r.breakRails.length<4;if(n||o||i){let l=n||o?1-e:e;r.turn=l,r.pending={type:"pool-break",offender:e,foul:n,illegal:o,eight:i},r.message=n?"\u0424\u043E\u043B \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":o?"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":"\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",da(r);return}r.turn=r.sunk.length?e:1-e,r.message=r.sunk.length?"\u0420\u0430\u0437\u0431\u043E\u0439 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \xB7 \u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430",da(r);return}let s=r.call&&!r.call.safety&&(r.pots||[]).some(o=>o.id===r.call.ball&&o.pocket===r.call.pocket);if(i){if(r.groups[e]===null&&r.eightReady&&!n&&s){let o=[0,1].find(l=>!r.balls.some(c=>!c.pocket&&rs(c.id)===l));r.groups[e]=o,r.groups[1-e]=1-o}da(r),bl(r,!n&&r.eightReady&&s?e:1-e);return}!n&&s&&r.groups[e]===null&&(r.groups[e]=rs(r.call.ball),r.groups[1-e]=1-r.groups[e]),da(r);let a=!n&&s;a||(r.turn=1-e),n?(r.inHand=!0,r.handZone="any",r.cueId=0,r.balls.find(o=>o.id===0).pocket=!0,r.message="\u0424\u043E\u043B \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435"):r.message=a?"\u0428\u0430\u0440 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":r.call?.safety?"\u041E\u0442\u044B\u0433\u0440\u044B\u0448 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"}function Df(r){let e=r.turn,t=r.wasBreak,n=r.sunk.length>0||r.breakRails.length>=3||r.breakRails.length>=2&&r.breakCross.length>0;if(r.firstHit===null||t&&!n||!t&&!r.sunk.length&&!r.pyramidLegal){for(let s of r.sunk)Ou(r,s);r.turn=1-e,r.pending={type:"pyramid-foul",offender:e,illegalBreak:t&&!n},r.message="\u0428\u0442\u0440\u0430\u0444 \xB7 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443";return}for(let s of r.sunk)r.captured[e].includes(s)||r.captured[e].push(s);if(r.scores=r.captured.map(s=>s.length),r.scores[e]>=8){bl(r,e);return}r.sunk.length||(r.turn=1-e),r.cueId=r.balls.find(s=>!s.pocket)?.id??0,r.message=r.sunk.length?"\u0428\u0430\u0440\u044B \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D\u044B \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430 \xB7 \u0431\u0438\u0442\u043E\u043A \u2014 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440"}function Uf(r){r.moving=!1;for(let e of r.balls)ua(e);r.lastShot={player:r.lastShooter,potted:[...r.sunk],contacts:{...r.contacts},spin:{...r.spin}},r.discipline==="pyramid"?Df(r):Nf(r),delete r.tracks}function Of(r,e,t){if(r.firstHit===null)return;r.railAfter=!0,e.id!==r.cueId&&!r.breakRails.includes(e.id)&&r.breakRails.push(e.id);let n=r.tracks[e.id];(n.cross||n.rails.some(i=>i!==t))&&(r.pyramidLegal=!0),n.rails.includes(t)||n.rails.push(t)}function Ff(r,e){if(r.firstHit===null)return;let t=r.tracks[e.id];t.rails.length&&(r.pyramidLegal=!0),t.cross=!0,e.id!==r.cueId&&!r.breakCross.includes(e.id)&&r.breakCross.push(e.id)}function Bf(r,e,t){if(r.firstHit===null&&(e.id===r.cueId?(r.firstHit=t.id,r.headShot&&!r.headExited&&t.x<250&&(r.illegalHead=!0)):t.id===r.cueId&&(r.firstHit=e.id,r.headShot&&!r.headExited&&e.x<250&&(r.illegalHead=!0))),r.firstHit===null)return;let n=r.tracks[e.id],i=r.tracks[t.id];for(let[o,l]of[[n,i],[i,n]])l.frozen.some(c=>o.cross||o.rails.some(h=>h!==c))&&(r.pyramidLegal=!0);let s=[...new Set([...n.rails,...i.rails])],a=n.cross||i.cross;n.rails=[...s],i.rails=[...s],n.cross=i.cross=a}function ma(r,e=1/120){if(!r.rulesVersion)return yu(r,e);if(!r.moving)return;e=Math.min(Math.max(e,0),1/120);let t=lr(r),n=t.r,i=Math.max(...r.balls.map(o=>Math.hypot(o.vx,o.vy))),s=Math.max(1,Math.min(12,Math.ceil(i*e/(n*.3)))),a=e/s;for(let o=0;o<s;o++){for(let l of r.balls){if(l.pocket)continue;let c=l.x;l.x+=l.vx*a,l.y+=l.vy*a,l.id===r.cueId&&l.x>=250&&(r.headExited=!0),(c-500)*(l.x-500)<0&&Ff(r,l),Cu(l,a,r);for(let u of t.rails){let p=wu(l,u),d=l.x-p.x,m=l.y-p.y,g=Math.hypot(d,m);if(g>=n||g<1e-5)continue;let f=d/g,_=m/g;l.x=p.x+f*(n+1e-4),l.y=p.y+_*(n+1e-4),Iu(l,f,_,t.spec.restitution)&&(Of(r,l,u.side),r.contacts&&r.contacts[u.jaw||Math.hypot(p.x-u.a[0],p.y-u.a[1])<.001||Math.hypot(p.x-u.b[0],p.y-u.b[1])<.001?"jaws":"rails"]++)}let h=Tu(l,t);h>=0&&(l.pocket=!0,l.vx=l.vy=0,ua(l),r.pots.push({id:l.id,pocket:h}),l.id===r.cueId&&(r.scratch=!0),(r.discipline==="pyramid"||l.id!==0)&&r.sunk.push(l.id))}for(let l=0;l<r.balls.length;l++)for(let c=l+1;c<r.balls.length;c++){let h=r.balls[l],u=r.balls[c];if(h.pocket||u.pocket)continue;let p=u.x-h.x,d=u.y-h.y,m=Math.hypot(p,d);if(m>=n*2)continue;m=Math.max(m,.001);let g=p/m,f=d/m,_=(n*2-m)/2+.001;h.x-=g*_,h.y-=f*_,u.x+=g*_,u.y+=f*_;let v=(h.vx-u.vx)*g+(h.vy-u.vy)*f;if(v>0){Bf(r,h,u),r.contacts&&r.contacts.balls++;let x=v*.98;h.vx-=x*g,h.vy-=x*f,u.vx+=x*g,u.vy+=x*f,Pu(h,u,g,f,x)}}}r.balls.every(o=>o.pocket||Math.hypot(o.vx,o.vy)<1&&!Lu(o))&&(r.balls.forEach(o=>o.vx=o.vy=0),Uf(r))}function Nu(r,e,t=!1){let n={scores:r.scores,captured:r.captured},i=pa({discipline:r.discipline,color:r.color,seed:r.seed+1,breaker:e});if(t){i.scores=n.scores,i.captured=n.captured;for(let l of n.captured.flat())i.balls.find(c=>c.id===l).pocket=!0;let s=i.balls.filter(l=>!l.pocket),a=s.find(l=>l.id===0);if(!a){a=s[0];let l=i.captured.find(c=>c.includes(0));l[l.indexOf(0)]=a.id,a.pocket=!0,a=i.balls.find(c=>c.id===0),a.pocket=!1}Object.assign(a,{x:230,y:250});let o=0;for(let l=0;l<5;l++)for(let c=0;c<=l;c++){let h=s.filter(u=>u.id!==a.id&&!u.pocket)[o++];h&&Object.assign(h,{x:750+l*(It(i)*2+.05)*Math.sqrt(3)/2,y:250+(c-l/2)*(It(i)*2+.05)})}}Object.keys(r).forEach(s=>delete r[s]),Object.assign(r,i)}function kf(r,e){let t=r.pending;if(!t||r.moving||r.winner!==null)return!1;if(t.type==="pool-break"){if(!(t.illegal?["accept",...t.foul?["hand"]:[],"rerack-self","rerack-opponent"]:t.eight?["accept","rerack-self"]:["accept","hand"]).includes(e.choice))return!1;let i=r.turn;return r.pending=null,e.choice.startsWith("rerack")?(Nu(r,e.choice==="rerack-self"?i:1-i),!0):((e.choice==="hand"||t.eight&&t.foul||r.balls.find(s=>s.id===0).pocket)&&(r.inHand=!0,r.handZone="head",r.cueId=0),r.message=r.inHand?"\u0420\u0430\u0437\u0431\u043E\u0439 \xB7 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437",!0)}if(t.type==="pyramid-foul"){if(!["play","pass",...t.illegalBreak?["rerack-self","rerack-opponent"]:[]].includes(e.choice))return!1;let n=r.balls.find(s=>s.id===e.ballId&&!s.pocket);if(!n)return!1;let i=r.turn;return n.pocket=!0,r.captured[i].push(n.id),r.scores=r.captured.map(s=>s.length),r.pending=null,r.scores[i]>=8?(bl(r,i),!0):e.choice.startsWith("rerack")?(Nu(r,e.choice==="rerack-self"?i:1-i,!0),!0):(r.turn=e.choice==="pass"?t.offender:i,r.cueId=r.balls.find(s=>!s.pocket)?.id??0,r.message="\u0428\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440 \u0441\u043D\u044F\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A",!0)}return!1}function ga(r,e,t){return r.rulesVersion?e!==r.turn||!t||typeof t!="object"?!1:t.type==="decision"?kf(r,t):t.type==="shot"?Sl(r,t.angle,t.power,t):t.type==="place"?fa(r,t.x,t.y):!1:Mu(r,e,t)}function Tl(r){return r?.rulesVersion?r.rulesVersion===2&&Du.includes(r.discipline)&&[0,1].includes(r.turn)&&Array.isArray(r.balls)&&r.balls.length===16&&new Set(r.balls.map(e=>e.id)).size===16&&r.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(Number.isFinite)&&["rollX","rollY","side"].every(t=>e[t]===void 0||Number.isFinite(e[t]))&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3&&typeof e.pocket=="boolean")&&Array.isArray(r.groups)&&r.groups.length===2&&r.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(r.scores)&&r.scores.length===2&&r.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=16)&&Array.isArray(r.captured)&&r.captured.length===2&&r.captured.every(e=>Array.isArray(e)&&e.every(t=>Number.isInteger(t)&&t>=0&&t<16))&&(r.winner===null||r.winner===0||r.winner===1)&&typeof r.message=="string"&&r.message.length<250:Su(r)}function Fu({request:r,onUpdate:e,onError:t}){let n=!1,i=null,s="",a=0,o=!1;function l(h){n||h.revision<a||(s=h.roomId,a=h.revision,e(h))}async function c(){if(clearTimeout(i),!(n||!s))try{l(await r({action:"room",roomId:s}))}catch(h){n||t(h.message)}finally{n||(clearTimeout(i),i=setTimeout(c,800))}}return{async start(h,u,p={}){try{let d=await r(h?{action:"create",...p}:{action:"join",roomId:u});l(d),n||(clearTimeout(i),i=setTimeout(c,800))}catch(d){n||t(d.message,!0)}},async move(h,u=!1){if(!(n||o||!s)){o=!0;try{l(await r({action:u?"rematch":"move",roomId:s,revision:a,...u?{}:{move:h}}))}catch(p){n||(t(p.message),c())}finally{o=!1}}},close(){n=!0,clearTimeout(i)}}}var Rd=0,vc=1,Cd=2;var xc=1,Lo=2,Pn=3,Mi=0,qt=1,nn=2,Si=0,Js=1,yc=2,Mc=3,Sc=4,Id=5,Gr=100,Pd=101,Ld=102,Nd=103,Dd=104,Ud=200,Od=201,Fd=202,Bd=203,kd=204,zd=205,Gd=206,Hd=207,Vd=208,Wd=209,Xd=210,jd=211,qd=212,Yd=213,Zd=214,No=0,Do=1,Uo=2,$s=3,Oo=4,Fo=5,Bo=6,ko=7,Kd=0,Jd=1,$d=2,ti=0,Qd=1,ep=2,tp=3,zo=4,np=5,ip=6,rp=7,ic="attached",sp="detached",bc=300,Hr=301,qi=302,bi=303,Go=304,Qs=306,Qt=1e3,mi=1001,Tr=1002,Xt=1003,Ho=1004;var Yi=1005;var kt=1006,Vr=1007;var Ln=1008;var Nn=1009,Tc=1010,wc=1011,Wr=1012,Vo=1013,Zi=1014,rn=1015,Xr=1016,Wo=1017,Xo=1018,jr=1020,Ec=35902,Ac=35899,ap=1021,op=1022,sn=1023,ea=1026,ta=1027,jo=1028,qo=1029,lp=1030,Rc=1031;var Cc=1033,Yo=33776,Zo=33777,Ko=33778,Jo=33779,Ic=35840,Pc=35841,Lc=35842,Nc=35843,Dc=36196,Uc=37492,Oc=37496,Fc=37808,Bc=37809,kc=37810,zc=37811,Gc=37812,Hc=37813,Vc=37814,Wc=37815,Xc=37816,jc=37817,qc=37818,Yc=37819,Zc=37820,Kc=37821,Jc=36492,$c=36494,Qc=36495,eh=36283,th=36284,nh=36285,ih=36286;var Fi=2300,Bi=2301,qa=2302,rc=2400,sc=2401,ac=2402;var rh=0,na=1,qr=2;var cp=3201;var hp=0,up=1,Ki="",rt="srgb",Rt="srgb-linear",_s="linear",it="srgb";var Oi=7680;var dp=512,pp=513,fp=514,sh=515,mp=516,gp=517,_p=518,vp=519,Ya=35044;var ah="300 es",Kn=2e3,vs=2001;var Jn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bu=1234567,Sr=Math.PI/180,ki=180/Math.PI;function $t(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Pt[255&r]+Pt[r>>8&255]+Pt[r>>16&255]+Pt[r>>24&255]+"-"+Pt[255&e]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[63&t|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[255&n]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Ge(r,e,t){return Math.max(e,Math.min(t,r))}function oc(r,e){return(r%e+e)%e}function fs(r,e,t){return(1-t)*r+t*e}function fn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function nt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var oh={DEG2RAD:Sr,RAD2DEG:ki,generateUUID:$t,clamp:Ge,euclideanModulo:oc,mapLinear:function(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)},inverseLerp:function(r,e,t){return r!==e?(t-r)/(e-r):0},lerp:fs,damp:function(r,e,t,n){return fs(r,e,1-Math.exp(-t*n))},pingpong:function(r,e=1){return e-Math.abs(oc(r,2*e)-e)},smoothstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*(3-2*r)},smootherstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*r*(r*(6*r-15)+10)},randInt:function(r,e){return r+Math.floor(Math.random()*(e-r+1))},randFloat:function(r,e){return r+Math.random()*(e-r)},randFloatSpread:function(r){return r*(.5-Math.random())},seededRandom:function(r){r!==void 0&&(Bu=r);let e=Bu+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(r){return r*Sr},radToDeg:function(r){return r*ki},isPowerOfTwo:function(r){return!(r&r-1)&&r!==0},ceilPowerOfTwo:function(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))},floorPowerOfTwo:function(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))},setQuaternionFromProperEuler:function(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),p=a((e-n)/2),d=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*p,o*c);break;case"YZY":r.set(l*p,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*p,o*h,o*c);break;case"XZX":r.set(o*h,l*m,l*d,o*c);break;case"YXY":r.set(l*d,o*h,l*m,o*c);break;case"ZYZ":r.set(l*m,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}},normalize:nt,denormalize:fn},ne=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],p=s[a+0],d=s[a+1],m=s[a+2],g=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=p,e[t+1]=d,e[t+2]=m,void(e[t+3]=g);if(u!==g||l!==p||c!==d||h!==m){let f=1-o,_=l*p+c*d+h*m+u*g,v=_>=0?1:-1,x=1-_*_;if(x>Number.EPSILON){let w=Math.sqrt(x),R=Math.atan2(w,_*v);f=Math.sin(f*R)/w,o=Math.sin(o*R)/w}let y=o*v;if(l=l*f+p*y,c=c*f+d*y,h=h*f+m*y,u=u*f+g*y,f===1-o){let w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],p=s[a+1],d=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*d-c*p,e[t+1]=l*m+h*p+c*u-o*d,e[t+2]=c*m+h*d+o*p-l*u,e[t+3]=h*m-o*u-l*p-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),p=l(n/2),d=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=p*h*u+c*d*m,this._y=c*d*u-p*h*m,this._z=c*h*m+p*d*u,this._w=c*h*u-p*d*m;break;case"YXZ":this._x=p*h*u+c*d*m,this._y=c*d*u-p*h*m,this._z=c*h*m-p*d*u,this._w=c*h*u+p*d*m;break;case"ZXY":this._x=p*h*u-c*d*m,this._y=c*d*u+p*h*m,this._z=c*h*m+p*d*u,this._w=c*h*u-p*d*m;break;case"ZYX":this._x=p*h*u-c*d*m,this._y=c*d*u+p*h*m,this._z=c*h*m-p*d*u,this._w=c*h*u+p*d*m;break;case"YZX":this._x=p*h*u+c*d*m,this._y=c*d*u+p*h*m,this._z=c*h*m-p*d*u,this._w=c*h*u-p*d*m;break;case"XZY":this._x=p*h*u-c*d*m,this._y=c*d*u-p*h*m,this._z=c*h*m+p*d*u,this._w=c*h*u+p*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],p=n+o+u;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(s-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=i*u+this._y*p,this._z=s*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ku.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ku.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wl.copy(this).projectOnVector(e),this.sub(wl)}reflect(e){return this.sub(wl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wl=new T,ku=new zt,ze=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],d=n[5],m=n[8],g=i[0],f=i[3],_=i[6],v=i[1],x=i[4],y=i[7],w=i[2],R=i[5],N=i[8];return s[0]=a*g+o*v+l*w,s[3]=a*f+o*x+l*R,s[6]=a*_+o*y+l*N,s[1]=c*g+h*v+u*w,s[4]=c*f+h*x+u*R,s[7]=c*_+h*y+u*N,s[2]=p*g+d*v+m*w,s[5]=p*f+d*x+m*R,s[8]=p*_+d*y+m*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,p=o*l-h*s,d=c*s-a*l,m=t*u+n*p+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/m;return e[0]=u*g,e[1]=(i*c-h*n)*g,e[2]=(o*n-i*a)*g,e[3]=p*g,e[4]=(h*t-i*l)*g,e[5]=(i*s-o*t)*g,e[6]=d*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(El.makeScale(e,t)),this}rotate(e){return this.premultiply(El.makeRotation(-e)),this}translate(e,t){return this.premultiply(El.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},El=new ze;function lh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function wr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function xp(){let r=wr("canvas");return r.style.display="block",r}var zu={};function Er(r){r in zu||(zu[r]=!0,console.warn(r))}function yp(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Gu=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hu=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zf(){let r={enabled:!0,workingColorSpace:Rt,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===it&&(i.r=Zn(i.r),i.g=Zn(i.g),i.b=Zn(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(i.r=br(i.r),i.g=br(i.g),i.b=br(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?_s:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Er("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Er("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Rt]:{primaries:e,whitePoint:n,transfer:_s,toXYZ:Gu,fromXYZ:Hu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:rt},outputColorSpaceConfig:{drawingBufferColorSpace:rt}},[rt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:Gu,fromXYZ:Hu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:rt}}}),r}var Ze=zf();function Zn(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function br(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var cr,Za=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{cr===void 0&&(cr=wr("canvas")),cr.width=e.width,cr.height=e.height;let i=cr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=cr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*Zn(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Zn(t[n]/255)):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Gf=0,Ar=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=$t(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Al(i[a].image)):s.push(Al(i[a]))}else s=Al(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Al(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Za.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Hf=0,Rl=new T,Mt=class r extends Jn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,l=1009,c=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=$t(),this.name="",this.source=new Ar(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Rl).x}get height(){return this.source.getSize(Rl).y}get depth(){return this.source.getSize(Rl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qt:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case Tr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Qt:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case Tr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Mt.DEFAULT_IMAGE=null,Mt.DEFAULT_MAPPING=bc,Mt.DEFAULT_ANISOTROPY=1;var $e=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],p=l[1],d=l[5],m=l[9],g=l[2],f=l[6],_=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-g)<.01&&Math.abs(m-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+g)<.1&&Math.abs(m+f)<.1&&Math.abs(c+d+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(d+1)/2,w=(_+1)/2,R=(h+p)/4,N=(u+g)/4,D=(m+f)/4;return x>y&&x>w?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=R/n,s=N/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=R/i,s=D/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=N/s,i=D/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-m)*(f-m)+(u-g)*(u-g)+(p-h)*(p-h));return Math.abs(v)<.001&&(v=1),this.x=(f-m)/v,this.y=(u-g)/v,this.z=(p-h)/v,this.w=Math.acos((c+d+_-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ka=class extends Jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Mt(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ar(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},bn=class extends Ka{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},xs=class extends Mt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ja=class extends Mt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ct=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(s,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_a.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_a.copy(n.boundingBox)),_a.applyMatrix4(e.matrixWorld),this.union(_a)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ss),va.subVectors(this.max,ss),hr.subVectors(e.a,ss),ur.subVectors(e.b,ss),dr.subVectors(e.c,ss),ci.subVectors(ur,hr),hi.subVectors(dr,ur),Li.subVectors(hr,dr);let t=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Li.z,Li.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Li.z,0,-Li.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Li.y,Li.x,0];return!!Cl(t,hr,ur,dr,va)&&(t=[1,0,0,0,1,0,0,0,1],!!Cl(t,hr,ur,dr,va)&&(xa.crossVectors(ci,hi),t=[xa.x,xa.y,xa.z],Cl(t,hr,ur,dr,va)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(un).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},zn=[new T,new T,new T,new T,new T,new T,new T,new T],un=new T,_a=new Ct,hr=new T,ur=new T,dr=new T,ci=new T,hi=new T,Li=new T,ss=new T,va=new T,xa=new T,Ni=new T;function Cl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ni.fromArray(r,s);let o=i.x*Math.abs(Ni.x)+i.y*Math.abs(Ni.y)+i.z*Math.abs(Ni.z),l=e.dot(Ni),c=t.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Vf=new Ct,as=new T,Il=new T,Ot=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Vf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);let t=as.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Il.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Il)),this.expandByPoint(as.copy(e.center).sub(Il))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Gn=new T,Pl=new T,ya=new T,ui=new T,Ll=new T,Ma=new T,Nl=new T,gi=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Pl.copy(e).add(t).multiplyScalar(.5),ya.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(Pl);let s=.5*e.distanceTo(t),a=-this.direction.dot(ya),o=ui.dot(this.direction),l=-ui.dot(ya),c=ui.lengthSq(),h=Math.abs(1-a*a),u,p,d,m;if(h>0)if(u=a*l-o,p=a*o-l,m=s*h,u>=0)if(p>=-m)if(p<=m){let g=1/h;u*=g,p*=g,d=u*(u+a*p+2*o)+p*(a*u+p+2*l)+c}else p=s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p=-s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p<=-m?(u=Math.max(0,-(-a*s+o)),p=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c):p<=m?(u=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+c):(u=Math.max(0,-(a*s+o)),p=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c);else p=a>0?-s:s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Pl).addScaledVector(ya,p),d}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);let n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,i=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,i=(e.min.x-p.x)*c),h>=0?(s=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),n>l||o>i?null:((o>n||n!=n)&&(n=o),(l<i||i!=i)&&(i=l),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,i,s){Ll.subVectors(t,e),Ma.subVectors(n,e),Nl.crossVectors(Ll,Ma);let a,o=this.direction.dot(Nl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}ui.subVectors(this.origin,e);let l=a*this.direction.dot(Ma.crossVectors(ui,Ma));if(l<0)return null;let c=a*this.direction.dot(Ll.cross(ui));if(c<0||l+c>o)return null;let h=-a*ui.dot(Nl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ie=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,p,d,m,g,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,p,d,m,g,f)}set(e,t,n,i,s,a,o,l,c,h,u,p,d,m,g,f){let _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=i,_[1]=s,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=u,_[14]=p,_[3]=d,_[7]=m,_[11]=g,_[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/pr.setFromMatrixColumn(e,0).length(),s=1/pr.setFromMatrixColumn(e,1).length(),a=1/pr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let p=a*h,d=a*u,m=o*h,g=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+m*c,t[5]=p-g*c,t[9]=-o*l,t[2]=g-p*c,t[6]=m+d*c,t[10]=a*l}else if(e.order==="YXZ"){let p=l*h,d=l*u,m=c*h,g=c*u;t[0]=p+g*o,t[4]=m*o-d,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-m,t[6]=g+p*o,t[10]=a*l}else if(e.order==="ZXY"){let p=l*h,d=l*u,m=c*h,g=c*u;t[0]=p-g*o,t[4]=-a*u,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*h,t[9]=g-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let p=a*h,d=a*u,m=o*h,g=o*u;t[0]=l*h,t[4]=m*c-d,t[8]=p*c+g,t[1]=l*u,t[5]=g*c+p,t[9]=d*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let p=a*l,d=a*c,m=o*l,g=o*c;t[0]=l*h,t[4]=g-p*u,t[8]=m*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*u+m,t[10]=p-g*u}else if(e.order==="XZY"){let p=a*l,d=a*c,m=o*l,g=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=p*u+g,t[5]=a*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=o*h,t[10]=g*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wf,e,Xf)}lookAt(e,t,n){let i=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),di.crossVectors(n,Vt),di.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),di.crossVectors(n,Vt)),di.normalize(),Sa.crossVectors(Vt,di),i[0]=di.x,i[4]=Sa.x,i[8]=Vt.x,i[1]=di.y,i[5]=Sa.y,i[9]=Vt.y,i[2]=di.z,i[6]=Sa.z,i[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],d=n[13],m=n[2],g=n[6],f=n[10],_=n[14],v=n[3],x=n[7],y=n[11],w=n[15],R=i[0],N=i[4],D=i[8],C=i[12],B=i[1],G=i[5],O=i[9],Y=i[13],k=i[2],X=i[6],K=i[10],ae=i[14],ee=i[3],_e=i[7],be=i[11],ye=i[15];return s[0]=a*R+o*B+l*k+c*ee,s[4]=a*N+o*G+l*X+c*_e,s[8]=a*D+o*O+l*K+c*be,s[12]=a*C+o*Y+l*ae+c*ye,s[1]=h*R+u*B+p*k+d*ee,s[5]=h*N+u*G+p*X+d*_e,s[9]=h*D+u*O+p*K+d*be,s[13]=h*C+u*Y+p*ae+d*ye,s[2]=m*R+g*B+f*k+_*ee,s[6]=m*N+g*G+f*X+_*_e,s[10]=m*D+g*O+f*K+_*be,s[14]=m*C+g*Y+f*ae+_*ye,s[3]=v*R+x*B+y*k+w*ee,s[7]=v*N+x*G+y*X+w*_e,s[11]=v*D+x*O+y*K+w*be,s[15]=v*C+x*Y+y*ae+w*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],p=e[10],d=e[14];return e[3]*(+s*l*u-i*c*u-s*o*p+n*c*p+i*o*d-n*l*d)+e[7]*(+t*l*d-t*c*p+s*a*p-i*a*d+i*c*h-s*l*h)+e[11]*(+t*c*u-t*o*d-s*a*u+n*a*d+s*o*h-n*c*h)+e[15]*(-i*o*h-t*l*u+t*o*p+i*a*u-n*a*p+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],p=e[10],d=e[11],m=e[12],g=e[13],f=e[14],_=e[15],v=u*f*c-g*p*c+g*l*d-o*f*d-u*l*_+o*p*_,x=m*p*c-h*f*c-m*l*d+a*f*d+h*l*_-a*p*_,y=h*g*c-m*u*c+m*o*d-a*g*d-h*o*_+a*u*_,w=m*u*l-h*g*l-m*o*p+a*g*p+h*o*f-a*u*f,R=t*v+n*x+i*y+s*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/R;return e[0]=v*N,e[1]=(g*p*s-u*f*s-g*i*d+n*f*d+u*i*_-n*p*_)*N,e[2]=(o*f*s-g*l*s+g*i*c-n*f*c-o*i*_+n*l*_)*N,e[3]=(u*l*s-o*p*s-u*i*c+n*p*c+o*i*d-n*l*d)*N,e[4]=x*N,e[5]=(h*f*s-m*p*s+m*i*d-t*f*d-h*i*_+t*p*_)*N,e[6]=(m*l*s-a*f*s-m*i*c+t*f*c+a*i*_-t*l*_)*N,e[7]=(a*p*s-h*l*s+h*i*c-t*p*c-a*i*d+t*l*d)*N,e[8]=y*N,e[9]=(m*u*s-h*g*s-m*n*d+t*g*d+h*n*_-t*u*_)*N,e[10]=(a*g*s-m*o*s+m*n*c-t*g*c-a*n*_+t*o*_)*N,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*d-t*o*d)*N,e[12]=w*N,e[13]=(h*g*i-m*u*i+m*n*p-t*g*p-h*n*f+t*u*f)*N,e[14]=(m*o*i-a*g*i-m*n*l+t*g*l+a*n*f-t*o*f)*N,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*p+t*o*p)*N,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,p=s*c,d=s*h,m=s*u,g=a*h,f=a*u,_=o*u,v=l*c,x=l*h,y=l*u,w=n.x,R=n.y,N=n.z;return i[0]=(1-(g+_))*w,i[1]=(d+y)*w,i[2]=(m-x)*w,i[3]=0,i[4]=(d-y)*R,i[5]=(1-(p+_))*R,i[6]=(f+v)*R,i[7]=0,i[8]=(m+x)*N,i[9]=(f-v)*N,i[10]=(1-(p+g))*N,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=pr.set(i[0],i[1],i[2]).length(),a=pr.set(i[4],i[5],i[6]).length(),o=pr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],dn.copy(this);let l=1/s,c=1/a,h=1/o;return dn.elements[0]*=l,dn.elements[1]*=l,dn.elements[2]*=l,dn.elements[4]*=c,dn.elements[5]*=c,dn.elements[6]*=c,dn.elements[8]*=h,dn.elements[9]*=h,dn.elements[10]*=h,t.setFromRotationMatrix(dn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-i),p=(t+e)/(t-e),d=(n+i)/(n-i),m,g;if(l)m=s/(a-s),g=a*s/(a-s);else if(o===Kn)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else{if(o!==vs)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),g=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),p=-(t+e)/(t-e),d=-(n+i)/(n-i),m,g;if(l)m=1/(a-s),g=a/(a-s);else if(o===Kn)m=-2/(a-s),g=-(a+s)/(a-s);else{if(o!==vs)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),g=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},pr=new T,dn=new Ie,Wf=new T(0,0,0),Xf=new T(1,1,1),di=new T,Sa=new T,Vt=new T,Vu=new Ie,Wu=new zt,mn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],p=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wu.setFromEuler(this),this.setFromQuaternion(Wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mn.DEFAULT_ORDER="XYZ";var Rr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},jf=0,Xu=new T,fr=new zt,Hn=new Ie,ba=new T,os=new T,qf=new T,Yf=new zt,ju=new T(1,0,0),qu=new T(0,1,0),Yu=new T(0,0,1),Zu={type:"added"},Zf={type:"removed"},mr={type:"childadded",child:null},Dl={type:"childremoved",child:null},lt=class r extends Jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=$t(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new T,t=new mn,n=new zt,i=new T(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ie},normalMatrix:{value:new ze}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.multiply(fr),this}rotateOnWorldAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.premultiply(fr),this}rotateX(e){return this.rotateOnAxis(ju,e)}rotateY(e){return this.rotateOnAxis(qu,e)}rotateZ(e){return this.rotateOnAxis(Yu,e)}translateOnAxis(e,t){return Xu.copy(e).applyQuaternion(this.quaternion),this.position.add(Xu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ju,e)}translateY(e){return this.translateOnAxis(qu,e)}translateZ(e){return this.translateOnAxis(Yu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ba.copy(e):ba.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(os,ba,this.up):Hn.lookAt(ba,os,this.up),this.quaternion.setFromRotationMatrix(Hn),i&&(Hn.extractRotation(i.matrixWorld),fr.setFromRotationMatrix(Hn),this.quaternion.premultiply(fr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zu),mr.child=e,this.dispatchEvent(mr),mr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zf),Dl.child=e,this.dispatchEvent(Dl),Dl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zu),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,e,qf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,Yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};lt.DEFAULT_UP=new T(0,1,0),lt.DEFAULT_MATRIX_AUTO_UPDATE=!0,lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=new T,Vn=new T,Ul=new T,Wn=new T,gr=new T,_r=new T,Ku=new T,Ol=new T,Fl=new T,Bl=new T,kl=new $e,zl=new $e,Gl=new $e,jn=class r{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),pn.subVectors(e,t),i.cross(pn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){pn.subVectors(i,t),Vn.subVectors(n,t),Ul.subVectors(e,t);let a=pn.dot(pn),o=pn.dot(Vn),l=pn.dot(Ul),c=Vn.dot(Vn),h=Vn.dot(Ul),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let p=1/u,d=(c*l-o*h)*p,m=(a*h-o*l)*p;return s.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Wn)!==null&&Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return kl.setScalar(0),zl.setScalar(0),Gl.setScalar(0),kl.fromBufferAttribute(e,t),zl.fromBufferAttribute(e,n),Gl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(kl,s.x),a.addScaledVector(zl,s.y),a.addScaledVector(Gl,s.z),a}static isFrontFacing(e,t,n,i){return pn.subVectors(n,t),Vn.subVectors(e,t),pn.cross(Vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),.5*pn.cross(Vn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;gr.subVectors(i,n),_r.subVectors(s,n),Ol.subVectors(e,n);let l=gr.dot(Ol),c=_r.dot(Ol);if(l<=0&&c<=0)return t.copy(n);Fl.subVectors(e,i);let h=gr.dot(Fl),u=_r.dot(Fl);if(h>=0&&u<=h)return t.copy(i);let p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(gr,a);Bl.subVectors(e,s);let d=gr.dot(Bl),m=_r.dot(Bl);if(m>=0&&d<=m)return t.copy(s);let g=d*c-l*m;if(g<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(_r,o);let f=h*m-d*u;if(f<=0&&u-h>=0&&d-m>=0)return Ku.subVectors(s,i),o=(u-h)/(u-h+(d-m)),t.copy(i).addScaledVector(Ku,o);let _=1/(f+g+p);return a=g*_,o=p*_,t.copy(n).addScaledVector(gr,a).addScaledVector(_r,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Mp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Ta={h:0,s:0,l:0};function Hl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ae=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=oc(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Hl(a,s,e+1/3),this.g=Hl(a,s,e),this.b=Hl(a,s,e-1/3)}return Ze.colorSpaceToWorking(this,i),this}setStyle(e,t=rt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rt){let n=Mp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=br(e.r),this.g=br(e.g),this.b=br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rt){return Ze.workingToColorSpace(Lt.copy(this),e),65536*Math.round(Ge(255*Lt.r,0,255))+256*Math.round(Ge(255*Lt.g,0,255))+Math.round(Ge(255*Lt.b,0,255))}getHexString(e=rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Lt.copy(this),t);let n=Lt.r,i=Lt.g,s=Lt.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=rt){Ze.workingToColorSpace(Lt.copy(this),e);let t=Lt.r,n=Lt.g,i=Lt.b;return e!==rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(Ta);let n=fs(pi.h,Ta.h,t),i=fs(pi.s,Ta.s,t),s=fs(pi.l,Ta.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Lt=new Ae;Ae.NAMES=Mp;var Kf=0,Gt=class extends Jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=$t(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ft=class extends Gt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},E0=Jf();function Jf(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,i[l]=24,i[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,i[l]=-c-1,i[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,i[l]=13,i[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,i[l]=24,i[256|l]=24):(n[l]=31744,n[256|l]=64512,i[l]=13,i[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var vt=new T,wa=new ne,$f=0,yt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$f++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ya,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)wa.fromBufferAttribute(this,t),wa.applyMatrix3(e),this.setXY(t,wa.x,wa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ya&&(e.usage=this.usage),e}};var ys=class extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ms=class extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var De=class extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Qf=0,Kt=new Ie,Vl=new lt,vr=new T,Wt=new Ct,ls=new Ct,Tt=new T,tt=class r extends Jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=$t(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lh(e)?Ms:ys)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return Vl.lookAt(e),Vl.updateMatrix(),this.applyMatrix4(Vl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ct);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ot);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new T,1/0);if(e){let n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(Wt.min,ls.min),Wt.expandByPoint(Tt),Tt.addVectors(Wt.max,ls.max),Wt.expandByPoint(Tt)):(Wt.expandByPoint(ls.min),Wt.expandByPoint(ls.max))}Wt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Tt.fromBufferAttribute(o,c),l&&(vr.fromBufferAttribute(e,c),Tt.add(vr)),i=Math.max(i,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new T,l[D]=new T;let c=new T,h=new T,u=new T,p=new ne,d=new ne,m=new ne,g=new T,f=new T;function _(D,C,B){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,C),u.fromBufferAttribute(n,B),p.fromBufferAttribute(s,D),d.fromBufferAttribute(s,C),m.fromBufferAttribute(s,B),h.sub(c),u.sub(c),d.sub(p),m.sub(p);let G=1/(d.x*m.y-m.x*d.y);isFinite(G)&&(g.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(G),f.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(G),o[D].add(g),o[C].add(g),o[B].add(g),l[D].add(f),l[C].add(f),l[B].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let D=0,C=v.length;D<C;++D){let B=v[D],G=B.start;for(let O=G,Y=G+B.count;O<Y;O+=3)_(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let x=new T,y=new T,w=new T,R=new T;function N(D){w.fromBufferAttribute(i,D),R.copy(w);let C=o[D];x.copy(C),x.sub(w.multiplyScalar(w.dot(C))).normalize(),y.crossVectors(R,C);let B=y.dot(l[D])<0?-1:1;a.setXYZW(D,x.x,x.y,x.z,B)}for(let D=0,C=v.length;D<C;++D){let B=v[D],G=B.start;for(let O=G,Y=G+B.count;O<Y;O+=3)N(e.getX(O+0)),N(e.getX(O+1)),N(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new yt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);let i=new T,s=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let p=0,d=e.count;p<d;p+=3){let m=e.getX(p+0),g=e.getX(p+1),f=e.getX(p+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,d=t.count;p<d;p+=3)i.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,p=new c.constructor(l.length*h),d=0,m=0;for(let g=0,f=l.length;g<f;g++){d=o.isInterleavedBufferAttribute?l[g]*o.data.stride+o.offset:l[g]*h;for(let _=0;_<h;_++)p[m++]=c[d++]}return new yt(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=e(i[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let p=e(c[h],n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ju=new Ie,Di=new gi,Ea=new Ot,$u=new T,Aa=new T,Ra=new T,Ca=new T,Wl=new T,Ia=new T,Qu=new T,Pa=new T,ct=class extends lt{constructor(e=new tt,t=new Ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Ia.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(Wl.fromBufferAttribute(u,e),a?Ia.addScaledVector(Wl,h):Ia.addScaledVector(Wl.sub(t),h))}t.add(Ia)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ea.copy(n.boundingSphere),Ea.applyMatrix4(s),Di.copy(e.ray).recast(e.near),Ea.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Ea,$u)===null||Di.origin.distanceToSquared($u)>(e.far-e.near)**2))return;Ju.copy(s).invert(),Di.copy(e.ray).applyMatrix4(Ju),n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Di)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,g=p.length;m<g;m++){let f=p[m],_=a[f.materialIndex];for(let v=Math.max(f.start,d.start),x=Math.min(o.count,Math.min(f.start+f.count,d.start+d.count));v<x;v+=3)i=La(this,_,e,n,c,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let m=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);m<g;m+=3)i=La(this,a,e,n,c,h,u,o.getX(m),o.getX(m+1),o.getX(m+2)),i&&(i.faceIndex=Math.floor(m/3),t.push(i));else if(l!==void 0)if(Array.isArray(a))for(let m=0,g=p.length;m<g;m++){let f=p[m],_=a[f.materialIndex];for(let v=Math.max(f.start,d.start),x=Math.min(l.count,Math.min(f.start+f.count,d.start+d.count));v<x;v+=3)i=La(this,_,e,n,c,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let m=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);m<g;m+=3)i=La(this,a,e,n,c,h,u,m,m+1,m+2),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}};function La(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Aa),r.getVertexPosition(l,Ra),r.getVertexPosition(c,Ca);let h=(function(u,p,d,m,g,f,_,v){let x;if(x=p.side===1?m.intersectTriangle(_,f,g,!0,v):m.intersectTriangle(g,f,_,p.side===0,v),x===null)return null;Pa.copy(v),Pa.applyMatrix4(u.matrixWorld);let y=d.ray.origin.distanceTo(Pa);return y<d.near||y>d.far?null:{distance:y,point:Pa.clone(),object:u}})(r,e,t,n,Aa,Ra,Ca,Qu);if(h){let u=new T;jn.getBarycoord(Qu,Aa,Ra,Ca,u),i&&(h.uv=jn.getInterpolatedAttribute(i,o,l,c,u,new ne)),s&&(h.uv1=jn.getInterpolatedAttribute(s,o,l,c,u,new ne)),a&&(h.normal=jn.getInterpolatedAttribute(a,o,l,c,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new T,materialIndex:0};jn.getNormal(Aa,Ra,Ca,p.normal),h.face=p,h.barycoord=u}return h}var Tn=class r extends tt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],p=0,d=0;function m(g,f,_,v,x,y,w,R,N,D,C){let B=y/N,G=w/D,O=y/2,Y=w/2,k=R/2,X=N+1,K=D+1,ae=0,ee=0,_e=new T;for(let be=0;be<K;be++){let ye=be*G-Y;for(let Pe=0;Pe<X;Pe++){let oe=Pe*B-O;_e[g]=oe*v,_e[f]=ye*x,_e[_]=k,c.push(_e.x,_e.y,_e.z),_e[g]=0,_e[f]=0,_e[_]=R>0?1:-1,h.push(_e.x,_e.y,_e.z),u.push(Pe/N),u.push(1-be/D),ae+=1}}for(let be=0;be<D;be++)for(let ye=0;ye<N;ye++){let Pe=p+ye+X*be,oe=p+ye+X*(be+1),he=p+(ye+1)+X*(be+1),ce=p+(ye+1)+X*be;l.push(Pe,oe,ce),l.push(oe,he,ce),ee+=6}o.addGroup(d,ee,C),d+=ee,p+=ae}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(h,3)),this.setAttribute("uv",new De(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ji(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Nt(r){let e={};for(let t=0;t<r.length;t++){let n=Ji(r[t]);for(let i in n)e[i]=n[i]}return e}function ch(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var Sp={clone:Ji,merge:Nt},gn=class extends Gt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Cr=class extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=Kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},fi=new T,ed=new ne,td=new ne,xt=class extends Cr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*ki*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Sr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*ki*Math.atan(Math.tan(.5*Sr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,ed,td),t.subVectors(td,ed)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Sr*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},xr=-90,$a=class extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new xt(xr,1,e,t);i.layers=this.layers,this.add(i);let s=new xt(xr,1,e,t);s.layers=this.layers,this.add(s);let a=new xt(xr,1,e,t);a.layers=this.layers,this.add(a);let o=new xt(xr,1,e,t);o.layers=this.layers,this.add(o);let l=new xt(xr,1,e,t);l.layers=this.layers,this.add(l);let c=new xt(xr,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Kn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==vs)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,p,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ss=class extends Mt{constructor(e=[],t=301,n,i,s,a,o,l,c,h){super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qa=class extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ss(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Tn(5,5,5),s=new gn({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ct(i,s),o=t.minFilter;return t.minFilter===Ln&&(t.minFilter=kt),new $a(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ut=class extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},em={type:"move"},Ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let g of e.hand.values()){let f=t.getJointPose(g,n),_=this._getHandJoint(c,g);f!==null&&(_.matrix.fromArray(f.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=f.radius),_.visible=f!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&p>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(em)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ut;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var bs=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ae(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ts=class extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ya,this.updateRanges=[],this.version=0,this.uuid=$t()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$t()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$t()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Dt=new T,Lr=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var A0=new T,R0=new T,C0=new T,I0=new ne,P0=new ne,L0=new Ie,N0=new T,D0=new T,U0=new T,O0=new ne,F0=new ne,B0=new ne;var k0=new T,z0=new T;var nd=new T,id=new $e,rd=new $e,tm=new T,sd=new Ie,Na=new T,Xl=new Ot,ad=new Ie,jl=new gi,ws=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ic,this.bindMatrix=new Ie,this.bindMatrixInverse=new Ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ct),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Na),this.boundingBox.expandByPoint(Na)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ot),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Na),this.boundingSphere.expandByPoint(Na)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xl.copy(this.boundingSphere),Xl.applyMatrix4(i),e.ray.intersectsSphere(Xl)!==!1&&(ad.copy(i).invert(),jl.copy(e.ray).applyMatrix4(ad),this.boundingBox!==null&&jl.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,jl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new $e,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ic?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===sp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;id.fromBufferAttribute(i.attributes.skinIndex,e),rd.fromBufferAttribute(i.attributes.skinWeight,e),nd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=rd.getComponent(s);if(a!==0){let o=id.getComponent(s);sd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(tm.copy(nd).applyMatrix4(sd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Nr=class extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Es=class extends Mt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=1003,h=1003,u,p){super(null,a,o,l,c,h,i,s,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},od=new Ie,nm=new Ie,As=class r{constructor(e=[],t=[]){this.uuid=$t(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ie)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ie;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:nm;od.multiplyMatrices(o,t[s]),od.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Es(t,e,e,sn,rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Nr),this.bones.push(a),this.boneInverses.push(new Ie().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},_i=class extends yt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},yr=new Ie,ld=new Ie,Da=[],cd=new Ct,im=new Ie,cs=new ct,hs=new Ot,Rs=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _i(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,im)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ct),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yr),cd.copy(e.boundingBox).applyMatrix4(yr),this.boundingBox.union(cd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ot),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yr),hs.copy(e.boundingSphere).applyMatrix4(yr),this.boundingSphere.union(hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hs.copy(this.boundingSphere),hs.applyMatrix4(n),e.ray.intersectsSphere(hs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,yr),ld.multiplyMatrices(n,yr),cs.matrixWorld=ld,cs.raycast(e,Da);for(let a=0,o=Da.length;a<o;a++){let l=Da[a];l.instanceId=s,l.object=this,t.push(l)}Da.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _i(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Es(new Float32Array(i*this.count),i,this.count,jo,rn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ql=new T,rm=new T,sm=new ze,Jt=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ql.subVectors(n,t).cross(rm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ql),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sm.getNormalMatrix(e),i=this.coplanarPoint(ql).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ui=new Ot,am=new ne(.5,.5),Ua=new T,vi=class{constructor(e=new Jt,t=new Jt,n=new Jt,i=new Jt,s=new Jt,a=new Jt){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],p=s[6],d=s[7],m=s[8],g=s[9],f=s[10],_=s[11],v=s[12],x=s[13],y=s[14],w=s[15];if(i[0].setComponents(c-a,d-h,_-m,w-v).normalize(),i[1].setComponents(c+a,d+h,_+m,w+v).normalize(),i[2].setComponents(c+o,d+u,_+g,w+x).normalize(),i[3].setComponents(c-o,d-u,_-g,w-x).normalize(),n)i[4].setComponents(l,p,f,y).normalize(),i[5].setComponents(c-l,d-p,_-f,w-y).normalize();else if(i[4].setComponents(c-l,d-p,_-f,w-y).normalize(),t===Kn)i[5].setComponents(c+l,d+p,_+f,w+y).normalize();else{if(t!==vs)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(l,p,f,y).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){Ui.center.set(0,0,0);let t=am.distanceTo(e.center);return Ui.radius=.7071067811865476+t,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ua.x=i.normal.x>0?e.max.x:e.min.x,Ua.y=i.normal.y>0?e.max.y:e.min.y,Ua.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ua)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},xn=new Ie,yn=new vi,eo=class r{constructor(){this.coordinateSystem=Kn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),yn.setFromProjectionMatrix(xn,i.coordinateSystem,i.reversedDepth),yn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),yn.setFromProjectionMatrix(xn,i.coordinateSystem,i.reversedDepth),yn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),yn.setFromProjectionMatrix(xn,i.coordinateSystem,i.reversedDepth),yn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),yn.setFromProjectionMatrix(xn,i.coordinateSystem,i.reversedDepth),yn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),yn.setFromProjectionMatrix(xn,i.coordinateSystem,i.reversedDepth),yn.containsPoint(e))return!0}return!1}clone(){return new r}};var lc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},G0=new Ie,H0=new Ae(1,1,1),V0=new vi,W0=new eo,X0=new Ct,j0=new Ot,q0=new T,Y0=new T,Z0=new T,K0=new lc,J0=new ct;var $n=class extends Gt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},to=new T,no=new T,hd=new Ie,us=new gi,Oa=new Ot,Yl=new T,ud=new T,wn=class extends lt{constructor(e=new tt,t=new $n){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)to.fromBufferAttribute(t,i-1),no.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=to.distanceTo(no);e.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(i),Oa.radius+=s,e.ray.intersectsSphere(Oa)===!1)return;hd.copy(i).invert(),us.copy(e.ray).applyMatrix4(hd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let m=p,g=d-1;m<g;m+=c){let f=h.getX(m),_=h.getX(m+1),v=Fa(this,e,us,l,f,_,m);v&&t.push(v)}if(this.isLineLoop){let m=h.getX(d-1),g=h.getX(p),f=Fa(this,e,us,l,m,g,d-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let m=p,g=d-1;m<g;m+=c){let f=Fa(this,e,us,l,m,m+1,m);f&&t.push(f)}if(this.isLineLoop){let m=Fa(this,e,us,l,d-1,p,d-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Fa(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(to.fromBufferAttribute(o,i),no.fromBufferAttribute(o,s),t.distanceSqToSegment(to,no,Yl,ud)>n)return;Yl.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(Yl);return l<e.near||l>e.far?void 0:{distance:l,point:ud.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var dd=new T,pd=new T,Cs=class extends wn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)dd.fromBufferAttribute(t,i),pd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+dd.distanceTo(pd);e.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Is=class extends wn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Dr=class extends Gt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fd=new Ie,cc=new gi,Ba=new Ot,ka=new T,Ps=class extends lt{constructor(e=new tt,t=new Dr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ba.copy(n.boundingSphere),Ba.applyMatrix4(i),Ba.radius+=s,e.ray.intersectsSphere(Ba)===!1)return;fd.copy(i).invert(),cc.copy(e.ray).applyMatrix4(fd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);u<p;u++){let d=c.getX(u);ka.fromBufferAttribute(h,d),md(ka,d,l,i,e,t,this)}else for(let u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);u<p;u++)ka.fromBufferAttribute(h,u),md(ka,u,l,i,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function md(r,e,t,n,i,s,a){let o=cc.distanceSqToPoint(r);if(o<t){let l=new T;cc.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var en=class extends Mt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ls=class extends Mt{constructor(e,t,n=1014,i,s,a,o=1003,l=1003,c,h=1026,u=1){if(h!==ea&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ar(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ns=class extends Mt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},io=class r extends tt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,p=t,d=2*u+p,m=2*n+s,g=i+1,f=new T,_=new T;for(let v=0;v<=m;v++){let x=0,y=0,w=0,R=0;if(v<=n){let C=v/n,B=C*Math.PI/2;y=-h-e*Math.cos(B),w=e*Math.sin(B),R=-e*Math.cos(B),x=C*u}else if(v<=n+s){let C=(v-n)/s;y=C*t-h,w=e,R=0,x=u+C*p}else{let C=(v-n-s)/n,B=C*Math.PI/2;y=h+e*Math.sin(B),w=e*Math.cos(B),R=e*Math.sin(B),x=u+p+C*u}let N=Math.max(0,Math.min(1,x/d)),D=0;v===0?D=.5/i:v===m&&(D=-.5/i);for(let C=0;C<=i;C++){let B=C/i,G=B*Math.PI*2,O=Math.sin(G),Y=Math.cos(G);_.x=-w*Y,_.y=y,_.z=w*O,o.push(_.x,_.y,_.z),f.set(-w*Y,R,w*O),f.normalize(),l.push(f.x,f.y,f.z),c.push(B+D,N)}if(v>0){let C=(v-1)*g;for(let B=0;B<i;B++){let G=C+B,O=C+B+1,Y=v*g+B,k=v*g+B+1;a.push(G,O,Y),a.push(O,k,Y)}}}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Ur=class r extends tt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new T,h=new ne;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){let d=n+u/t*i;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("normal",new De(o,3)),this.setAttribute("uv",new De(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},En=class r extends tt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],p=[],d=[],m=0,g=[],f=n/2,_=0;function v(x){let y=m,w=new ne,R=new T,N=0,D=x===!0?e:t,C=x===!0?1:-1;for(let G=1;G<=i;G++)u.push(0,f*C,0),p.push(0,C,0),d.push(.5,.5),m++;let B=m;for(let G=0;G<=i;G++){let O=G/i*l+o,Y=Math.cos(O),k=Math.sin(O);R.x=D*k,R.y=f*C,R.z=D*Y,u.push(R.x,R.y,R.z),p.push(0,C,0),w.x=.5*Y+.5,w.y=.5*k*C+.5,d.push(w.x,w.y),m++}for(let G=0;G<i;G++){let O=y+G,Y=B+G;x===!0?h.push(Y,Y+1,O):h.push(Y+1,Y,O),N+=3}c.addGroup(_,N,x===!0?1:2),_+=N}(function(){let x=new T,y=new T,w=0,R=(t-e)/n;for(let N=0;N<=s;N++){let D=[],C=N/s,B=C*(t-e)+e;for(let G=0;G<=i;G++){let O=G/i,Y=O*l+o,k=Math.sin(Y),X=Math.cos(Y);y.x=B*k,y.y=-C*n+f,y.z=B*X,u.push(y.x,y.y,y.z),x.set(k,R,X).normalize(),p.push(x.x,x.y,x.z),d.push(O,1-C),D.push(m++)}g.push(D)}for(let N=0;N<i;N++)for(let D=0;D<s;D++){let C=g[D][N],B=g[D+1][N],G=g[D+1][N+1],O=g[D][N+1];(e>0||D!==0)&&(h.push(C,B,O),w+=3),(t>0||D!==s-1)&&(h.push(B,G,O),w+=3)}c.addGroup(_,w,0),_+=w})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(p,3)),this.setAttribute("uv",new De(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ro=class r extends En{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},xi=class r extends tt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(d,m,g,f){let _=f+1,v=[];for(let x=0;x<=_;x++){v[x]=[];let y=d.clone().lerp(g,x/_),w=m.clone().lerp(g,x/_),R=_-x;for(let N=0;N<=R;N++)v[x][N]=N===0&&x===_?y:y.clone().lerp(w,N/R)}for(let x=0;x<_;x++)for(let y=0;y<2*(_-x)-1;y++){let w=Math.floor(y/2);y%2==0?(l(v[x][w+1]),l(v[x+1][w]),l(v[x][w])):(l(v[x][w+1]),l(v[x+1][w+1]),l(v[x+1][w]))}}function l(d){s.push(d.x,d.y,d.z)}function c(d,m){let g=3*d;m.x=e[g+0],m.y=e[g+1],m.z=e[g+2]}function h(d,m,g,f){f<0&&d.x===1&&(a[m]=d.x-1),g.x===0&&g.z===0&&(a[m]=f/2/Math.PI+.5)}function u(d){return Math.atan2(d.z,-d.x)}function p(d){return Math.atan2(-d.y,Math.sqrt(d.x*d.x+d.z*d.z))}(function(d){let m=new T,g=new T,f=new T;for(let _=0;_<t.length;_+=3)c(t[_+0],m),c(t[_+1],g),c(t[_+2],f),o(m,g,f,d)})(i),(function(d){let m=new T;for(let g=0;g<s.length;g+=3)m.x=s[g+0],m.y=s[g+1],m.z=s[g+2],m.normalize().multiplyScalar(d),s[g+0]=m.x,s[g+1]=m.y,s[g+2]=m.z})(n),(function(){let d=new T;for(let m=0;m<s.length;m+=3){d.x=s[m+0],d.y=s[m+1],d.z=s[m+2];let g=u(d)/2/Math.PI+.5,f=p(d)/Math.PI+.5;a.push(g,1-f)}(function(){let m=new T,g=new T,f=new T,_=new T,v=new ne,x=new ne,y=new ne;for(let w=0,R=0;w<s.length;w+=9,R+=6){m.set(s[w+0],s[w+1],s[w+2]),g.set(s[w+3],s[w+4],s[w+5]),f.set(s[w+6],s[w+7],s[w+8]),v.set(a[R+0],a[R+1]),x.set(a[R+2],a[R+3]),y.set(a[R+4],a[R+5]),_.copy(m).add(g).add(f).divideScalar(3);let N=u(_);h(v,R+0,m,N),h(x,R+2,g,N),h(y,R+4,f,N)}})(),(function(){for(let m=0;m<a.length;m+=6){let g=a[m+0],f=a[m+2],_=a[m+4],v=Math.max(g,f,_),x=Math.min(g,f,_);v>.9&&x<.1&&(g<.2&&(a[m+0]+=1),f<.2&&(a[m+2]+=1),_<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new De(s,3)),this.setAttribute("normal",new De(s.slice(),3)),this.setAttribute("uv",new De(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},so=class r extends xi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},za=new T,Ga=new T,Zl=new T,Ha=new jn,ao=class extends tt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Sr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),p={},d=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:g,b:f,c:_}=Ha;if(g.fromBufferAttribute(o,c[0]),f.fromBufferAttribute(o,c[1]),_.fromBufferAttribute(o,c[2]),Ha.getNormal(Zl),u[0]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let x=(v+1)%3,y=u[v],w=u[x],R=Ha[h[v]],N=Ha[h[x]],D=`${y}_${w}`,C=`${w}_${y}`;C in p&&p[C]?(Zl.dot(p[C].normal)<=s&&(d.push(R.x,R.y,R.z),d.push(N.x,N.y,N.z)),p[C]=null):D in p||(p[D]={index0:c[v],index1:c[x],normal:Zl.clone()})}}for(let m in p)if(p[m]){let{index0:g,index1:f}=p[m];za.fromBufferAttribute(o,g),Ga.fromBufferAttribute(o,f),d.push(za.x,za.y,za.z),d.push(Ga.x,Ga.y,Ga.z)}this.setAttribute("position",new De(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},jt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(i=Math.floor(l+(c-l)/2),o=n[i]-a,o<0)l=i+1;else{if(!(o>0)){c=i;break}c=i-1}if(i=c,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new ne:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new T,i=[],s=[],a=[],o=new T,l=new Ie;for(let d=0;d<=e;d++){let m=d/e;i[d]=this.getTangentAt(m,new T)}s[0]=new T,a[0]=new T;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),p=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Ge(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(Ge(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Or=class extends jt{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*h-d*u+this.aX,c=p*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},oo=class extends Or{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function hh(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let p=(a-s)/c-(o-s)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;p*=h,d*=h,i(a,o,p,d)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Va=new T,Kl=new hh,Jl=new hh,$l=new hh,lo=class extends jt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=i[(c-1)%s]:(Va.subVectors(i[0],i[1]).add(i[0]),o=Va);let u=i[c%s],p=i[(c+1)%s];if(this.closed||c+2<s?l=i[(c+2)%s]:(Va.subVectors(i[s-1],i[s-2]).add(i[s-1]),l=Va),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(p),d),f=Math.pow(p.distanceToSquared(l),d);g<1e-4&&(g=1),m<1e-4&&(m=g),f<1e-4&&(f=g),Kl.initNonuniformCatmullRom(o.x,u.x,p.x,l.x,m,g,f),Jl.initNonuniformCatmullRom(o.y,u.y,p.y,l.y,m,g,f),$l.initNonuniformCatmullRom(o.z,u.z,p.z,l.z,m,g,f)}else this.curveType==="catmullrom"&&(Kl.initCatmullRom(o.x,u.x,p.x,l.x,this.tension),Jl.initCatmullRom(o.y,u.y,p.y,l.y,this.tension),$l.initCatmullRom(o.z,u.z,p.z,l.z,this.tension));return n.set(Kl.calc(h),Jl.calc(h),$l.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function gd(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function ms(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function gs(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Ds=class extends jt{constructor(e=new ne,t=new ne,n=new ne,i=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ne){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(gs(e,i.x,s.x,a.x,o.x),gs(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},co=class extends jt{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(gs(e,i.x,s.x,a.x,o.x),gs(e,i.y,s.y,a.y,o.y),gs(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Us=class extends jt{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends jt{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Os=class extends jt{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ms(e,i.x,s.x,a.x),ms(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fs=class extends jt{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ms(e,i.x,s.x,a.x),ms(e,i.y,s.y,a.y),ms(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bs=class extends jt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(gd(o,l.x,c.x,h.x,u.x),gd(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ne().fromArray(i))}return this}},uo=Object.freeze({__proto__:null,ArcCurve:oo,CatmullRomCurve3:lo,CubicBezierCurve:Ds,CubicBezierCurve3:co,EllipseCurve:Or,LineCurve:Us,LineCurve3:ho,QuadraticBezierCurve:Os,QuadraticBezierCurve3:Fs,SplineCurve:Bs}),po=class extends jt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new uo[i.type]().fromJSON(i))}return this}},ks=class extends po{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Us(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Os(this.currentPoint.clone(),new ne(e,t),new ne(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Ds(this.currentPoint.clone(),new ne(e,t),new ne(n,i),new ne(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Bs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new Or(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},zi=class extends ks{constructor(e){super(e),this.uuid=$t(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new ks().fromJSON(i))}return this}};function om(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=_d(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,u,p,d){let m=[];for(let g=0,f=u.length;g<f;g++){let _=_d(h,u[g]*d,g<f-1?u[g+1]*d:h.length,d,!1);_===_.next&&(_.steiner=!0),m.push(mm(_))}m.sort(dm);for(let g=0;g<m.length;g++)p=pm(m[g],p);return p})(r,e,s,t)),r.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let p=t;p<i;p+=t){let d=r[p],m=r[p+1];d<o&&(o=d),m<l&&(l=m),d>h&&(h=d),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return zs(s,a,t,o,l,c,0),a}function _d(r,e,t,n,i){let s;if(i===(function(a,o,l,c){let h=0;for(let u=o,p=l-c;u<l;u+=c)h+=(a[p]-a[u])*(a[u+1]+a[p+1]),p=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=vd(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=vd(a/n|0,r[a],r[a+1],s);return s&&Fr(s,s.next)&&(Hs(s),s=s.next),s}function Gi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Fr(n,n.next)&&ut(n.prev,n,n.next)!==0)n=n.next;else{if(Hs(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function zs(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(l,c,h,u){let p=l;do p.z===0&&(p.z=hc(p.x,p.y,c,h,u)),p.prevZ=p.prev,p.nextZ=p.next,p=p.next;while(p!==l);p.prevZ.nextZ=null,p.prevZ=null,(function(d){let m,g=1;do{let f,_=d;d=null;let v=null;for(m=0;_;){m++;let x=_,y=0;for(let R=0;R<g&&(y++,x=x.nextZ,x);R++);let w=g;for(;y>0||w>0&&x;)y!==0&&(w===0||!x||_.z<=x.z)?(f=_,_=_.nextZ,y--):(f=x,x=x.nextZ,w--),v?v.nextZ=f:d=f,f.prevZ=v,v=f;_=x}v.nextZ=null,g*=2}while(m>1)})(p)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?cm(r,n,i,s):lm(r))e.push(l.i,r.i,c.i),Hs(r),r=c.next,o=c.next;else if((r=c)===o){a?a===1?zs(r=hm(Gi(r),e),e,t,n,i,s,2):a===2&&um(r,e,t,n,i,s):zs(Gi(r),e,t,n,i,s,1);break}}}function lm(r){let e=r.prev,t=r,n=r.next;if(ut(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,s,a),u=Math.min(o,l,c),p=Math.max(i,s,a),d=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=p&&m.y>=u&&m.y<=d&&ps(i,o,s,l,a,c,m.x,m.y)&&ut(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function cm(r,e,t,n){let i=r.prev,s=r,a=r.next;if(ut(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,p=a.y,d=Math.min(o,l,c),m=Math.min(h,u,p),g=Math.max(o,l,c),f=Math.max(h,u,p),_=hc(d,m,e,t,n),v=hc(g,f,e,t,n),x=r.prevZ,y=r.nextZ;for(;x&&x.z>=_&&y&&y.z<=v;){if(x.x>=d&&x.x<=g&&x.y>=m&&x.y<=f&&x!==i&&x!==a&&ps(o,h,l,u,c,p,x.x,x.y)&&ut(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=d&&y.x<=g&&y.y>=m&&y.y<=f&&y!==i&&y!==a&&ps(o,h,l,u,c,p,y.x,y.y)&&ut(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=_;){if(x.x>=d&&x.x<=g&&x.y>=m&&x.y<=f&&x!==i&&x!==a&&ps(o,h,l,u,c,p,x.x,x.y)&&ut(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=v;){if(y.x>=d&&y.x<=g&&y.y>=m&&y.y<=f&&y!==i&&y!==a&&ps(o,h,l,u,c,p,y.x,y.y)&&ut(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function hm(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Fr(n,i)&&Tp(n,t,t.next,i)&&Gs(n,i)&&Gs(i,n)&&(e.push(n.i,t.i,i.i),Hs(t),Hs(t.next),t=r=i),t=t.next}while(t!==r);return Gi(t)}function um(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&gm(a,o)){let l=wp(a,o);return a=Gi(a,a.next),l=Gi(l,l.next),zs(a,e,t,n,i,s,0),void zs(l,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function dm(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function pm(r,e){let t=(function(i,s){let a=s,o=i.x,l=i.y,c,h=-1/0;if(Fr(i,a))return a;do{if(Fr(i,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let g=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(g<=o&&g>h&&(h=g,c=a.x<a.next.x?a:a.next,g===o))return c}a=a.next}while(a!==s);if(!c)return null;let u=c,p=c.x,d=c.y,m=1/0;a=c;do{if(o>=a.x&&a.x>=p&&o!==a.x&&bp(l<d?o:h,l,p,d,l<d?h:o,l,a.x,a.y)){let g=Math.abs(l-a.y)/(o-a.x);Gs(a,i)&&(g<m||g===m&&(a.x>c.x||a.x===c.x&&fm(c,a)))&&(c=a,m=g)}a=a.next}while(a!==u);return c})(r,e);if(!t)return e;let n=wp(t,r);return Gi(n,n.next),Gi(t,t.next)}function fm(r,e){return ut(r.prev,r,e.prev)<0&&ut(e.next,r,r.next)<0}function hc(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function mm(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function bp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function ps(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&bp(r,e,t,n,i,s,a,o)}function gm(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Tp(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(Gs(r,e)&&Gs(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(ut(r.prev,r,e.prev)||ut(r,e.prev,e))||Fr(r,e)&&ut(r.prev,r,r.next)>0&&ut(e.prev,e,e.next)>0)}function ut(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Fr(r,e){return r.x===e.x&&r.y===e.y}function Tp(r,e,t,n){let i=Xa(ut(r,e,t)),s=Xa(ut(r,e,n)),a=Xa(ut(t,n,r)),o=Xa(ut(t,n,e));return i!==s&&a!==o||!(i!==0||!Wa(r,t,e))||!(s!==0||!Wa(r,n,e))||!(a!==0||!Wa(t,r,n))||!(o!==0||!Wa(t,e,n))}function Wa(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Xa(r){return r>0?1:r<0?-1:0}function Gs(r,e){return ut(r.prev,r,r.next)<0?ut(r,e,r.next)>=0&&ut(r,r.prev,e)>=0:ut(r,e,r.prev)<0||ut(r,r.next,e)<0}function wp(r,e){let t=uc(r.i,r.x,r.y),n=uc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function vd(r,e,t,n){let i=uc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Hs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function uc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var dc=class{static triangulate(e,t,n=2){return om(e,t,n)}},Mn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];xd(e),yd(n,e);let a=e.length;t.forEach(xd);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,yd(n,t[l]);let o=dc.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function xd(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function yd(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var fo=class r extends tt{constructor(e=new zi([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,p=t.bevelEnabled===void 0||t.bevelEnabled,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,_=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:_m,x,y,w,R,N,D=!1;_&&(x=_.getSpacedPoints(h),D=!0,p=!1,y=_.computeFrenetFrames(h,!1),w=new T,R=new T,N=new T),p||(f=0,d=0,m=0,g=0);let C=o.extractPoints(c),B=C.shape,G=C.holes;if(!Mn.isClockWise(B)){B=B.reverse();for(let L=0,M=G.length;L<M;L++){let A=G[L];Mn.isClockWise(A)&&(G[L]=A.reverse())}}function O(L){let M=10000000000000001e-36,A=L[0];for(let U=1;U<=L.length;U++){let I=U%L.length,q=L[I],z=q.x-A.x,H=q.y-A.y,ie=z*z+H*H,fe=Math.max(Math.abs(q.x),Math.abs(q.y),Math.abs(A.x),Math.abs(A.y));ie<=M*fe*fe?(L.splice(I,1),U--):A=q}}O(B),G.forEach(O);let Y=G.length,k=B;for(let L=0;L<Y;L++){let M=G[L];B=B.concat(M)}function X(L,M,A){return M||console.error("THREE.ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(M,A)}let K=B.length;function ae(L,M,A){let U,I,q,z=L.x-M.x,H=L.y-M.y,ie=A.x-L.x,fe=A.y-L.y,re=z*z+H*H,ve=z*fe-H*ie;if(Math.abs(ve)>Number.EPSILON){let Se=Math.sqrt(re),Re=Math.sqrt(ie*ie+fe*fe),Ve=M.x-H/Se,W=M.y+z/Se,le=((A.x-fe/Re-Ve)*fe-(A.y+ie/Re-W)*ie)/(z*fe-H*ie);U=Ve+z*le-L.x,I=W+H*le-L.y;let $=U*U+I*I;if($<=2)return new ne(U,I);q=Math.sqrt($/2)}else{let Se=!1;z>Number.EPSILON?ie>Number.EPSILON&&(Se=!0):z<-Number.EPSILON?ie<-Number.EPSILON&&(Se=!0):Math.sign(H)===Math.sign(fe)&&(Se=!0),Se?(U=-H,I=z,q=Math.sqrt(re)):(U=z,I=H,q=Math.sqrt(re/2))}return new ne(U/q,I/q)}let ee=[];for(let L=0,M=k.length,A=M-1,U=L+1;L<M;L++,A++,U++)A===M&&(A=0),U===M&&(U=0),ee[L]=ae(k[L],k[A],k[U]);let _e=[],be,ye,Pe=ee.concat();for(let L=0,M=Y;L<M;L++){let A=G[L];be=[];for(let U=0,I=A.length,q=I-1,z=U+1;U<I;U++,q++,z++)q===I&&(q=0),z===I&&(z=0),be[U]=ae(A[U],A[q],A[z]);_e.push(be),Pe=Pe.concat(be)}if(f===0)ye=Mn.triangulateShape(k,G);else{let L=[],M=[];for(let A=0;A<f;A++){let U=A/f,I=d*Math.cos(U*Math.PI/2),q=m*Math.sin(U*Math.PI/2)+g;for(let z=0,H=k.length;z<H;z++){let ie=X(k[z],ee[z],q);Ce(ie.x,ie.y,-I),U===0&&L.push(ie)}for(let z=0,H=Y;z<H;z++){let ie=G[z];be=_e[z];let fe=[];for(let re=0,ve=ie.length;re<ve;re++){let Se=X(ie[re],be[re],q);Ce(Se.x,Se.y,-I),U===0&&fe.push(Se)}U===0&&M.push(fe)}}ye=Mn.triangulateShape(L,M)}let oe=ye.length,he=m+g;for(let L=0;L<K;L++){let M=p?X(B[L],Pe[L],he):B[L];D?(R.copy(y.normals[0]).multiplyScalar(M.x),w.copy(y.binormals[0]).multiplyScalar(M.y),N.copy(x[0]).add(R).add(w),Ce(N.x,N.y,N.z)):Ce(M.x,M.y,0)}for(let L=1;L<=h;L++)for(let M=0;M<K;M++){let A=p?X(B[M],Pe[M],he):B[M];D?(R.copy(y.normals[L]).multiplyScalar(A.x),w.copy(y.binormals[L]).multiplyScalar(A.y),N.copy(x[L]).add(R).add(w),Ce(N.x,N.y,N.z)):Ce(A.x,A.y,u/h*L)}for(let L=f-1;L>=0;L--){let M=L/f,A=d*Math.cos(M*Math.PI/2),U=m*Math.sin(M*Math.PI/2)+g;for(let I=0,q=k.length;I<q;I++){let z=X(k[I],ee[I],U);Ce(z.x,z.y,u+A)}for(let I=0,q=G.length;I<q;I++){let z=G[I];be=_e[I];for(let H=0,ie=z.length;H<ie;H++){let fe=X(z[H],be[H],U);D?Ce(fe.x,fe.y+x[h-1].y,x[h-1].x+A):Ce(fe.x,fe.y,u+A)}}}function ce(L,M){let A=L.length;for(;--A>=0;){let U=A,I=A-1;I<0&&(I=L.length-1);for(let q=0,z=h+2*f;q<z;q++){let H=K*q,ie=K*(q+1);b(M+U+H,M+I+H,M+I+ie,M+U+ie)}}}function Ce(L,M,A){l.push(L),l.push(M),l.push(A)}function Le(L,M,A){S(L),S(M),S(A);let U=i.length/3,I=v.generateTopUV(n,i,U-3,U-2,U-1);F(I[0]),F(I[1]),F(I[2])}function b(L,M,A,U){S(L),S(M),S(U),S(M),S(A),S(U);let I=i.length/3,q=v.generateSideWallUV(n,i,I-6,I-3,I-2,I-1);F(q[0]),F(q[1]),F(q[3]),F(q[1]),F(q[2]),F(q[3])}function S(L){i.push(l[3*L+0]),i.push(l[3*L+1]),i.push(l[3*L+2])}function F(L){s.push(L.x),s.push(L.y)}(function(){let L=i.length/3;if(p){let M=0,A=K*M;for(let U=0;U<oe;U++){let I=ye[U];Le(I[2]+A,I[1]+A,I[0]+A)}M=h+2*f,A=K*M;for(let U=0;U<oe;U++){let I=ye[U];Le(I[0]+A,I[1]+A,I[2]+A)}}else{for(let M=0;M<oe;M++){let A=ye[M];Le(A[2],A[1],A[0])}for(let M=0;M<oe;M++){let A=ye[M];Le(A[0]+K*h,A[1]+K*h,A[2]+K*h)}}n.addGroup(L,i.length/3-L,0)})(),(function(){let L=i.length/3,M=0;ce(k,M),M+=k.length;for(let A=0,U=G.length;A<U;A++){let I=G[A];ce(I,M),M+=I.length}n.addGroup(L,i.length/3-L,1)})()}this.setAttribute("position",new De(i,3)),this.setAttribute("uv",new De(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new uo[i.type]().fromJSON(i)),new r(n,e.options)}},_m={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*i],h=e[3*i+1];return[new ne(s,a),new ne(o,l),new ne(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],p=e[3*i],d=e[3*i+1],m=e[3*i+2],g=e[3*s],f=e[3*s+1],_=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-u),new ne(p,1-m),new ne(g,1-_)]:[new ne(o,1-l),new ne(h,1-u),new ne(d,1-m),new ne(f,1-_)]}},mo=class r extends xi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},go=class r extends tt{constructor(e=[new ne(0,-.5),new ne(.5,0),new ne(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ge(i,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new T,p=new ne,d=new T,m=new T,g=new T,f=0,_=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,_=e[v+1].y-e[v].y,d.x=1*_,d.y=-f,d.z=0*_,g.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(g.x,g.y,g.z);break;default:f=e[v+1].x-e[v].x,_=e[v+1].y-e[v].y,d.x=1*_,d.y=-f,d.z=0*_,m.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),l.push(d.x,d.y,d.z),g.copy(m)}for(let v=0;v<=t;v++){let x=n+v*h*i,y=Math.sin(x),w=Math.cos(x);for(let R=0;R<=e.length-1;R++){u.x=e[R].x*y,u.y=e[R].y,u.z=e[R].x*w,a.push(u.x,u.y,u.z),p.x=v/t,p.y=R/(e.length-1),o.push(p.x,p.y);let N=l[3*R+0]*y,D=l[3*R+1],C=l[3*R+0]*w;c.push(N,D,C)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){let y=x+v*e.length,w=y,R=y+e.length,N=y+e.length+1,D=y+1;s.push(w,R,D),s.push(N,D,R)}this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("uv",new De(o,2)),this.setAttribute("normal",new De(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},_o=class r extends xi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},tn=class r extends tt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,p=t/l,d=[],m=[],g=[],f=[];for(let _=0;_<h;_++){let v=_*p-a;for(let x=0;x<c;x++){let y=x*u-s;m.push(y,-v,0),g.push(0,0,1),f.push(x/o),f.push(1-_/l)}}for(let _=0;_<l;_++)for(let v=0;v<o;v++){let x=v+c*_,y=v+c*(_+1),w=v+1+c*(_+1),R=v+1+c*_;d.push(x,y,R),d.push(y,w,R)}this.setIndex(d),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(g,3)),this.setAttribute("uv",new De(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},vo=class r extends tt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,p=(t-e)/(i=Math.max(1,i)),d=new T,m=new ne;for(let g=0;g<=i;g++){for(let f=0;f<=n;f++){let _=s+f/n*a;d.x=u*Math.cos(_),d.y=u*Math.sin(_),l.push(d.x,d.y,d.z),c.push(0,0,1),m.x=(d.x/t+1)/2,m.y=(d.y/t+1)/2,h.push(m.x,m.y)}u+=p}for(let g=0;g<i;g++){let f=g*(n+1);for(let _=0;_<n;_++){let v=_+f,x=v,y=v+n+1,w=v+n+2,R=v+1;o.push(x,y,R),o.push(y,w,R)}}this.setIndex(o),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Br=class r extends tt{constructor(e=new zi([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=i.length/3,p=h.extractPoints(t),d=p.shape,m=p.holes;Mn.isClockWise(d)===!1&&(d=d.reverse());for(let f=0,_=m.length;f<_;f++){let v=m[f];Mn.isClockWise(v)===!0&&(m[f]=v.reverse())}let g=Mn.triangulateShape(d,m);for(let f=0,_=m.length;f<_;f++){let v=m[f];d=d.concat(v)}for(let f=0,_=d.length;f<_;f++){let v=d[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,_=g.length;f<_;f++){let v=g[f],x=v[0]+u,y=v[1]+u,w=v[2]+u;n.push(x,y,w),l+=3}}this.setIndex(n),this.setAttribute("position",new De(i,3)),this.setAttribute("normal",new De(s,3)),this.setAttribute("uv",new De(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},yi=class r extends tt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new T,p=new T,d=[],m=[],g=[],f=[];for(let _=0;_<=n;_++){let v=[],x=_/n,y=0;_===0&&a===0?y=.5/t:_===n&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){let R=w/t;u.x=-e*Math.cos(i+R*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+R*s)*Math.sin(a+x*o),m.push(u.x,u.y,u.z),p.copy(u).normalize(),g.push(p.x,p.y,p.z),f.push(R+y,1-x),v.push(c++)}h.push(v)}for(let _=0;_<n;_++)for(let v=0;v<t;v++){let x=h[_][v+1],y=h[_][v],w=h[_+1][v],R=h[_+1][v+1];(_!==0||a>0)&&d.push(x,y,R),(_!==n-1||l<Math.PI)&&d.push(y,w,R)}this.setIndex(d),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(g,3)),this.setAttribute("uv",new De(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},xo=class r extends xi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},kr=class r extends tt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new T,u=new T,p=new T;for(let d=0;d<=n;d++)for(let m=0;m<=i;m++){let g=m/i*s,f=d/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(g),u.y=(e+t*Math.cos(f))*Math.sin(g),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(g),h.y=e*Math.sin(g),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(m/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=i;m++){let g=(i+1)*d+m-1,f=(i+1)*(d-1)+m-1,_=(i+1)*(d-1)+m,v=(i+1)*d+m;a.push(g,f,v),a.push(f,_,v)}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},yo=class r extends tt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new T,p=new T,d=new T,m=new T,g=new T,f=new T,_=new T;for(let x=0;x<=n;++x){let y=x/n*s*Math.PI*2;v(y,s,a,e,d),v(y+.01,s,a,e,m),f.subVectors(m,d),_.addVectors(m,d),g.crossVectors(f,_),_.crossVectors(g,f),g.normalize(),_.normalize();for(let w=0;w<=i;++w){let R=w/i*Math.PI*2,N=-t*Math.cos(R),D=t*Math.sin(R);u.x=d.x+(N*_.x+D*g.x),u.y=d.y+(N*_.y+D*g.y),u.z=d.z+(N*_.z+D*g.z),l.push(u.x,u.y,u.z),p.subVectors(u,d).normalize(),c.push(p.x,p.y,p.z),h.push(x/n),h.push(w/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){let w=(i+1)*(x-1)+(y-1),R=(i+1)*x+(y-1),N=(i+1)*x+y,D=(i+1)*(x-1)+y;o.push(w,R,D),o.push(R,N,D)}function v(x,y,w,R,N){let D=Math.cos(x),C=Math.sin(x),B=w/y*x,G=Math.cos(B);N.x=R*(2+G)*.5*D,N.y=R*(2+G)*C*.5,N.z=R*Math.sin(B)*.5}this.setIndex(o),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Mo=class r extends tt{constructor(e=new Fs(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new T,l=new T,c=new ne,h=new T,u=[],p=[],d=[],m=[];function g(f){h=e.getPointAt(f/t,h);let _=a.normals[f],v=a.binormals[f];for(let x=0;x<=i;x++){let y=x/i*Math.PI*2,w=Math.sin(y),R=-Math.cos(y);l.x=R*_.x+w*v.x,l.y=R*_.y+w*v.y,l.z=R*_.z+w*v.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)g(f);g(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let _=0;_<=i;_++)c.x=f/t,c.y=_/i,d.push(c.x,c.y)})(),(function(){for(let f=1;f<=t;f++)for(let _=1;_<=i;_++){let v=(i+1)*(f-1)+(_-1),x=(i+1)*f+(_-1),y=(i+1)*f+_,w=(i+1)*(f-1)+_;m.push(v,x,w),m.push(x,y,w)}})()})(),this.setIndex(m),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(p,3)),this.setAttribute("uv",new De(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new uo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},So=class extends tt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new T,s=new T;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],p=u.start;for(let d=p,m=p+u.count;d<m;d+=3)for(let g=0;g<3;g++){let f=o.getX(d+g),_=o.getX(d+(g+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,_),Md(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Md(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new De(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Md(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var $0=Object.freeze({__proto__:null,BoxGeometry:Tn,CapsuleGeometry:io,CircleGeometry:Ur,ConeGeometry:ro,CylinderGeometry:En,DodecahedronGeometry:so,EdgesGeometry:ao,ExtrudeGeometry:fo,IcosahedronGeometry:mo,LatheGeometry:go,OctahedronGeometry:_o,PlaneGeometry:tn,PolyhedronGeometry:xi,RingGeometry:vo,ShapeGeometry:Br,SphereGeometry:yi,TetrahedronGeometry:xo,TorusGeometry:kr,TorusKnotGeometry:yo,TubeGeometry:Mo,WireframeGeometry:So});var dt=class extends Gt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},pt=class extends dt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var bo=class extends Gt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},To=class extends Gt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Vs=class extends $n{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ja(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function vm(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function xm(r){let e=r.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,i){return r[n]-r[i]}),t}function Sd(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Ep(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var Qn=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},wo=class extends Qn{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rc,endingEnd:rc}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case sc:s=e,o=2*t-n;break;case ac:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case sc:a=e,l=2*n-t;break;case ac:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,d=this._weightNext,m=(n-t)/(i-t),g=m*m,f=g*m,_=-p*f+2*p*g-p*m,v=(1+p)*f+(-1.5-2*p)*g+(-.5+p)*m+1,x=(-1-d)*f+(1.5+d)*g+.5*m,y=d*f-d*g;for(let w=0;w!==o;++w)s[w]=_*a[h+w]+v*a[c+w]+x*a[l+w]+y*a[u+w];return s}},Eo=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let p=0;p!==o;++p)s[p]=a[c+p]*u+a[l+p]*h;return s}},Ao=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Bt=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ja(t,this.TimeBufferType),this.values=ja(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ja(e.times,Array),values:ja(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fi:t=this.InterpolantFactoryMethodDiscrete;break;case Bi:t=this.InterpolantFactoryMethodLinear;break;case qa:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fi;case this.InterpolantFactoryMethodLinear:return Bi;case this.InterpolantFactoryMethodSmooth:return qa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&vm(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qa,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,u=h-n,p=h+n;for(let d=0;d!==n;++d){let m=t[h+d];if(m!==t[u+d]||m!==t[p+d]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Bt.prototype.ValueTypeName="",Bt.prototype.TimeBufferType=Float32Array,Bt.prototype.ValueBufferType=Float32Array,Bt.prototype.DefaultInterpolation=Bi;var qn=class extends Bt{constructor(e,t,n){super(e,t,n)}};qn.prototype.ValueTypeName="bool",qn.prototype.ValueBufferType=Array,qn.prototype.DefaultInterpolation=Fi,qn.prototype.InterpolantFactoryMethodLinear=void 0,qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ws=class extends Bt{constructor(e,t,n,i){super(e,t,n,i)}};Ws.prototype.ValueTypeName="color";var An=class extends Bt{constructor(e,t,n,i){super(e,t,n,i)}};An.prototype.ValueTypeName="number";var Ro=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)zt.slerpFlat(s,0,a,c-o,a,c,l);return s}},Rn=class extends Bt{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ro(this.times,this.values,this.getValueSize(),e)}};Rn.prototype.ValueTypeName="quaternion",Rn.prototype.InterpolantFactoryMethodSmooth=void 0;var Yn=class extends Bt{constructor(e,t,n){super(e,t,n)}};Yn.prototype.ValueTypeName="string",Yn.prototype.ValueBufferType=Array,Yn.prototype.DefaultInterpolation=Fi,Yn.prototype.InterpolantFactoryMethodLinear=void 0,Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var Cn=class extends Bt{constructor(e,t,n,i){super(e,t,n,i)}};Cn.prototype.ValueTypeName="vector";var Xs=class{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=$t(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(ym(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Bt.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=xm(l);l=Sd(l,1,h),c=Sd(c,1,h),i||l[0]!==0||(l.push(s),c.push(c[0])),a.push(new An(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],p=i[u];p||(i[u]=p=[]),p.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,p,d,m){if(p.length!==0){let g=[],f=[];Ep(p,g,f,d),g.length!==0&&m.push(new h(u,g,f))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let u=c[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let p={},d;for(d=0;d<u.length;d++)if(u[d].morphTargets)for(let m=0;m<u[d].morphTargets.length;m++)p[u[d].morphTargets[m]]=-1;for(let m in p){let g=[],f=[];for(let _=0;_!==u[d].morphTargets.length;++_){let v=u[d];g.push(v.time),f.push(v.morphTarget===m?1:0)}i.push(new An(".morphTargetInfluence["+m+"]",g,f))}l=p.length*a}else{let p=".bones["+t[h].name+"]";n(Cn,p+".position",u,"pos",i),n(Rn,p+".quaternion",u,"rot",i),n(Cn,p+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let i=this.tracks[t];e=Math.max(e,i.times[i.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function ym(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return An;case"vector":case"vector2":case"vector3":case"vector4":return Cn;case"color":return Ws;case"quaternion":return Rn;case"bool":case"boolean":return qn;case"string":return Yn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(r.type);if(r.times===void 0){let t=[],n=[];Ep(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var Sn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Co=class{constructor(e,t,n){let i=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,l),o===l&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=c.length;u<p;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Ap=new Co,In=class{constructor(e){this.manager=e!==void 0?e:Ap,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};In.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xn={},pc=class extends Error{constructor(e,t){super(e),this.response=t}},zr=class extends In{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Sn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Xn[e]!==void 0)return void Xn[e].push({onLoad:t,onProgress:n,onError:i});Xn[e]=[],Xn[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Xn[e],u=c.body.getReader(),p=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=p?parseInt(p):0,m=d!==0,g=0,f=new ReadableStream({start(_){(function v(){u.read().then(({done:x,value:y})=>{if(x)_.close();else{g+=y.byteLength;let w=new ProgressEvent("progress",{lengthComputable:m,loaded:g,total:d});for(let R=0,N=h.length;R<N;R++){let D=h[R];D.onProgress&&D.onProgress(w)}_.enqueue(y),v()}},x=>{_.error(x)})})()}});return new Response(f)}throw new pc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(u);return c.arrayBuffer().then(d=>p.decode(d))}}}).then(c=>{Sn.add(`file:${e}`,c);let h=Xn[e];delete Xn[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=Xn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Xn[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Mr=new WeakMap,Io=class extends In{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Sn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Mr.get(a);u===void 0&&(u=[],Mr.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=wr("img");function l(){h(),t&&t(this);let u=Mr.get(this)||[];for(let p=0;p<u.length;p++){let d=u[p];d.onLoad&&d.onLoad(this)}Mr.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),Sn.remove(`image:${e}`);let p=Mr.get(this)||[];for(let d=0;d<p.length;d++){let m=p[d];m.onError&&m.onError(u)}Mr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Sn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Hi=class extends In{constructor(e){super(e)}load(e,t,n,i){let s=new Mt,a=new Io(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Vi=class extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},js=class extends Vi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ql=new Ie,bd=new T,Td=new T,qs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vi,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;bd.setFromMatrixPosition(e.matrixWorld),t.position.copy(bd),Td.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Td),t.updateMatrixWorld(),Ql.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ql,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ql)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},fc=class extends qs{constructor(){super(new xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*ki*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ys=class extends Vi{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new fc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wd=new Ie,ds=new T,ec=new T,mc=class extends qs{constructor(){super(new xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new $e(2,1,1,1),new $e(0,1,1,1),new $e(3,1,1,1),new $e(1,1,1,1),new $e(3,0,1,1),new $e(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ds.setFromMatrixPosition(e.matrixWorld),n.position.copy(ds),ec.copy(n.position),ec.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ec),n.updateMatrixWorld(),i.makeTranslation(-ds.x,-ds.y,-ds.z),wd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wd,n.coordinateSystem,n.reversedDepth)}},Wi=class extends Vi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new mc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Xi=class extends Cr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},gc=class extends qs{constructor(){super(new Xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ji=class extends Vi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new gc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ei=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var tc=new WeakMap,Zs=class extends In{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Sn.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(c=>{if(tc.has(a)!==!0)return t&&t(c),s.manager.itemEnd(e),c;i&&i(tc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Sn.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),tc.set(l,c),Sn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Sn.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Q0=new Ie,e_=new Ie,t_=new Ie;var Po=class extends xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var n_=new T,i_=new zt,r_=new T,s_=new T,a_=new T;var o_=new T,l_=new zt,c_=new T,h_=new T;var uh="\\[\\]\\.:\\/",Mm=new RegExp("["+uh+"]","g"),nc="[^"+uh+"]",Sm="[^"+uh.replace("\\.","")+"]",bm=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",nc)+/(WCOD+)?/.source.replace("WCOD",Sm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nc)+"$"),Tm=["material","materials","bones","map"],st=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Mm,"")}static parseTrackName(e){let t=bm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Tm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=class{constructor(r,e,t){let n=t||st.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray],st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var u_=new Float32Array(1);var Ed=new Ie,Ks=class{constructor(e,t,n=0,i=1/0){this.ray=new gi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Rr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ed.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ed),this}intersectObject(e,t=!0,n=[]){return _c(e,this,n,t),n.sort(Ad),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)_c(e[i],this,n,t);return n.sort(Ad),n}};function Ad(r,e){return r.distance-e.distance}function _c(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)_c(s[a],e,t,!0)}}var d_=new ne;var p_=new T,f_=new T,m_=new T,g_=new T,__=new T,v_=new T,x_=new T;var y_=new T;var M_=new T,S_=new Ie,b_=new Ie;var T_=new T,w_=new Ae,E_=new Ae;var A_=new T,R_=new T,C_=new T;var I_=new T,P_=new Cr;var L_=new Ct;var N_=new T;function dh(r,e,t,n){let i=(function(s){switch(s){case Nn:case Tc:return{byteLength:1,components:1};case Wr:case wc:case Xr:return{byteLength:2,components:1};case Wo:case Xo:return{byteLength:2,components:4};case Zi:case Vo:case rn:return{byteLength:4,components:1};case Ec:case Ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case jo:case qo:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case sn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Jp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Em(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(r.bindBuffer(o,s),c.length===0)r.bufferSubData(o,0,l);else{c.sort((u,p)=>u.start-p.start);let h=0;for(let u=1;u<c.length;u++){let p=c[h],d=c[u];d.start<=p.start+p.count+1?p.count=Math.max(p.count,d.start+d.count-p.start):(++h,c[h]=d)}c.length=h+1;for(let u=0,p=c.length;u<p;u++){let d=c[u];r.bufferSubData(o,d.start*l.BYTES_PER_ELEMENT,l,d.start,d.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var He={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},pe={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Dn={basic:{uniforms:Nt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Nt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ae(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Nt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Nt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Nt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ae(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Nt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Nt([pe.points,pe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Nt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Nt([pe.common,pe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Nt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Nt([pe.sprite,pe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Nt([pe.common,pe.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Nt([pe.lights,pe.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Dn.physical={uniforms:Nt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};var $o={r:0,b:0,g:0},$i=new mn,Am=new Ie;function Rm(r,e,t,n,i,s,a){let o=new Ae(0),l,c,h=s===!0?0:1,u=null,p=0,d=null;function m(f){let _=f.isScene===!0?f.background:null;return _&&_.isTexture&&(_=(f.backgroundBlurriness>0?t:e).get(_)),_}function g(f,_){f.getRGB($o,ch(r)),n.buffers.color.setClear($o.r,$o.g,$o.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(f,_=1){o.set(f),h=_,g(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,g(o,h)},render:function(f){let _=!1,v=m(f);v===null?g(o,h):v&&v.isColor&&(g(v,1),_=!0);let x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,_){let v=m(_);v&&(v.isCubeTexture||v.mapping===Qs)?(c===void 0&&(c=new ct(new Tn(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Ji(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,y,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),$i.copy(_.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Am.makeRotationFromEuler($i)),c.material.toneMapped=Ze.getTransfer(v.colorSpace)!==it,u===v&&p===v.version&&d===r.toneMapping||(c.material.needsUpdate=!0,u=v,p=v.version,d=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ct(new tn(2,2),new gn({name:"BackgroundMaterial",uniforms:Ji(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(v.colorSpace)!==it,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&p===v.version&&d===r.toneMapping||(l.material.needsUpdate=!0,u=v,p=v.version,d=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function Cm(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null),s=i,a=!1;function o(_){return r.bindVertexArray(_)}function l(_){return r.deleteVertexArray(_)}function c(_){let v=[],x=[],y=[];for(let w=0;w<t;w++)v[w]=0,x[w]=0,y[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:x,attributeDivisors:y,object:_,attributes:{},index:null}}function h(){let _=s.newAttributes;for(let v=0,x=_.length;v<x;v++)_[v]=0}function u(_){p(_,0)}function p(_,v){let x=s.newAttributes,y=s.enabledAttributes,w=s.attributeDivisors;x[_]=1,y[_]===0&&(r.enableVertexAttribArray(_),y[_]=1),w[_]!==v&&(r.vertexAttribDivisor(_,v),w[_]=v)}function d(){let _=s.newAttributes,v=s.enabledAttributes;for(let x=0,y=v.length;x<y;x++)v[x]!==_[x]&&(r.disableVertexAttribArray(x),v[x]=0)}function m(_,v,x,y,w,R,N){N===!0?r.vertexAttribIPointer(_,v,x,w,R):r.vertexAttribPointer(_,v,x,y,w,R)}function g(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(_,v,x,y,w){let R=!1,N=(function(D,C,B){let G=B.wireframe===!0,O=n[D.id];O===void 0&&(O={},n[D.id]=O);let Y=O[C.id];Y===void 0&&(Y={},O[C.id]=Y);let k=Y[G];return k===void 0&&(k=c(r.createVertexArray()),Y[G]=k),k})(y,x,v);s!==N&&(s=N,o(s.object)),R=(function(D,C,B,G){let O=s.attributes,Y=C.attributes,k=0,X=B.getAttributes();for(let K in X)if(X[K].location>=0){let ae=O[K],ee=Y[K];if(ee===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),ae===void 0||ae.attribute!==ee||ee&&ae.data!==ee.data)return!0;k++}return s.attributesNum!==k||s.index!==G})(_,y,x,w),R&&(function(D,C,B,G){let O={},Y=C.attributes,k=0,X=B.getAttributes();for(let K in X)if(X[K].location>=0){let ae=Y[K];ae===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(ae=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(ae=D.instanceColor));let ee={};ee.attribute=ae,ae&&ae.data&&(ee.data=ae.data),O[K]=ee,k++}s.attributes=O,s.attributesNum=k,s.index=G})(_,y,x,w),w!==null&&e.update(w,r.ELEMENT_ARRAY_BUFFER),(R||a)&&(a=!1,(function(D,C,B,G){h();let O=G.attributes,Y=B.getAttributes(),k=C.defaultAttributeValues;for(let X in Y){let K=Y[X];if(K.location>=0){let ae=O[X];if(ae===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(ae=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(ae=D.instanceColor)),ae!==void 0){let ee=ae.normalized,_e=ae.itemSize,be=e.get(ae);if(be===void 0)continue;let ye=be.buffer,Pe=be.type,oe=be.bytesPerElement,he=Pe===r.INT||Pe===r.UNSIGNED_INT||ae.gpuType===Vo;if(ae.isInterleavedBufferAttribute){let ce=ae.data,Ce=ce.stride,Le=ae.offset;if(ce.isInstancedInterleavedBuffer){for(let b=0;b<K.locationSize;b++)p(K.location+b,ce.meshPerAttribute);D.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let b=0;b<K.locationSize;b++)u(K.location+b);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let b=0;b<K.locationSize;b++)m(K.location+b,_e/K.locationSize,Pe,ee,Ce*oe,(Le+_e/K.locationSize*b)*oe,he)}else{if(ae.isInstancedBufferAttribute){for(let ce=0;ce<K.locationSize;ce++)p(K.location+ce,ae.meshPerAttribute);D.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ce=0;ce<K.locationSize;ce++)u(K.location+ce);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let ce=0;ce<K.locationSize;ce++)m(K.location+ce,_e/K.locationSize,Pe,ee,_e*oe,_e/K.locationSize*ce*oe,he)}}else if(k!==void 0){let ee=k[X];if(ee!==void 0)switch(ee.length){case 2:r.vertexAttrib2fv(K.location,ee);break;case 3:r.vertexAttrib3fv(K.location,ee);break;case 4:r.vertexAttrib4fv(K.location,ee);break;default:r.vertexAttrib1fv(K.location,ee)}}}}d()})(_,v,x,y),w!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(w).buffer))},reset:g,resetDefaultState:f,dispose:function(){g();for(let _ in n){let v=n[_];for(let x in v){let y=v[x];for(let w in y)l(y[w].object),delete y[w];delete v[x]}delete n[_]}},releaseStatesOfGeometry:function(_){if(n[_.id]===void 0)return;let v=n[_.id];for(let x in v){let y=v[x];for(let w in y)l(y[w].object),delete y[w];delete v[x]}delete n[_.id]},releaseStatesOfProgram:function(_){for(let v in n){let x=n[v];if(x[_.id]===void 0)continue;let y=x[_.id];for(let w in y)l(y[w].object),delete y[w];delete x[_.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:d}}function Im(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)i(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function Pm(r,e,t,n){let i;function s(p){if(p==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";p="mediump"}return p==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let p=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(p.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(p){return p===sn||n.convert(p)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(p){let d=p===Xr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(p!==Nn&&n.convert(p)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&p!==rn&&!d)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Lm(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Jt,o=new ze,l={value:null,needsUpdate:!1};function c(h,u,p,d){let m=h!==null?h.length:0,g=null;if(m!==0){if(g=l.value,d!==!0||g===null){let f=p+4*m,_=u.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<f)&&(g=new Float32Array(f));for(let v=0,x=p;v!==m;++v,x+=4)a.copy(h[v]).applyMatrix4(_,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,g}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||n!==0||i;return i=u,n=h.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,p){let d=h.clippingPlanes,m=h.clipIntersection,g=h.clipShadows,f=r.get(h);if(!i||d===null||d.length===0||s&&!g)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let _=s?0:n,v=4*_,x=f.clippingState||null;l.value=x,x=c(d,u,v,p);for(let y=0;y!==v;++y)x[y]=t[y];f.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=_}}}function Nm(r){let e=new WeakMap;function t(i,s){return s===bi?i.mapping=Hr:s===Go&&(i.mapping=qi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===bi||s===Go){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new Qa(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Rp=[.125,.215,.35,.446,.526,.582],ia=20,ph=new Xi,Cp=new Ae,fh=null,mh=0,gh=0,_h=!1,er=(1+Math.sqrt(5))/2,Yr=1/er,Ip=[new T(-er,Yr,0),new T(er,Yr,0),new T(-Yr,0,er),new T(Yr,0,er),new T(0,er,-Yr),new T(0,er,Yr),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Dm=new T,tl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Dm}=s;fh=this._renderer.getRenderTarget(),mh=this._renderer.getActiveCubeFace(),gh=this._renderer.getActiveMipmapLevel(),_h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Np(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fh,mh,gh),this._renderer.xr.enabled=_h,e.scissorTest=!1,Qo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hr||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fh=this._renderer.getRenderTarget(),mh=this._renderer.getActiveCubeFace(),gh=this._renderer.getActiveMipmapLevel(),_h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Xr,format:sn,colorSpace:Rt,depthBuffer:!1},i=Pp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pp(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,u=a-4+1+Rp.length;for(let p=0;p<u;p++){let d=Math.pow(2,h);l.push(d);let m=1/d;p>a-4?m=Rp[p-a+4-1]:p===0&&(m=0),c.push(m);let g=1/(d-2),f=-g,_=1+g,v=[f,f,_,f,_,_,f,f,_,_,f,_],x=6,y=6,w=3,R=2,N=1,D=new Float32Array(w*y*x),C=new Float32Array(R*y*x),B=new Float32Array(N*y*x);for(let O=0;O<x;O++){let Y=O%3*2/3-1,k=O>2?0:-1,X=[Y,k,0,Y+2/3,k,0,Y+2/3,k+1,0,Y,k,0,Y+2/3,k+1,0,Y,k+1,0];D.set(X,w*y*O),C.set(v,R*y*O);let K=[O,O,O,O,O,O];B.set(K,N*y*O)}let G=new tt;G.setAttribute("position",new yt(D,w)),G.setAttribute("uv",new yt(C,R)),G.setAttribute("faceIndex",new yt(B,N)),o.push(G),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(ia),h=new T(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:ia,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Ah(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,ph)}_sceneToCubeUV(e,t,n,i,s){let a=new xt(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(Cp),c.toneMapping=ti,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(i),c.clearDepth(),c.setRenderTarget(null));let p=new Ft({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),d=new ct(new Tn,p),m=!1,g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,m=!0):(p.color.copy(Cp),m=!0);for(let f=0;f<6;f++){let _=f%3;_===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[f],s.y,s.z)):_===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[f]));let v=this._cubeSize;Qo(i,_*v,f>2?v:0,v,v),c.setRenderTarget(i),m&&c.render(d,a),c.render(e,a)}d.geometry.dispose(),d.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Hr||e.mapping===qi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Np()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ct(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Qo(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,ph)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ip[(i-s-1)%Ip.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ct(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,d=isFinite(s)?Math.PI/(2*p):2*Math.PI/39,m=s/d,g=isFinite(s)?1+Math.floor(3*m):ia;g>ia&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to 20`);let f=[],_=0;for(let y=0;y<ia;++y){let w=y/m,R=Math.exp(-w*w/2);f.push(R),y===0?_+=R:y<g&&(_+=2*R)}for(let y=0;y<f.length;y++)f[y]=f[y]/_;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=d,u.mipInt.value=v-n;let x=this._sizeLods[i];Qo(t,3*x*(i>v-4?i-v+4:0),4*(this._cubeSize-x),3*x,2*x),l.setRenderTarget(t),l.render(h,ph)}};function Pp(r,e,t){let n=new bn(r,e,t);return n.texture.mapping=Qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Lp(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ah(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Np(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Ah(){return`

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
	`}function Um(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===bi||s===Go,o=s===Hr||s===qi;if(a||o){let l=e.get(i),c=l!==void 0?l.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==c)return t===null&&(t=new tl(r)),l=a?t.fromEquirectangular(i,l):t.fromCubemap(i,l),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),l.texture;if(l!==void 0)return l.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let p=0,d=6;for(let m=0;m<d;m++)u[m]!==void 0&&p++;return p===d})(h)?(t===null&&(t=new tl(r)),l=a?t.fromEquirectangular(i):t.fromCubemap(i),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),i.addEventListener("dispose",n),l.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Om(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Er("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Fm(r,e,t,n){let i={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",a),delete i[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,p=0;if(h!==null){let g=h.array;p=h.version;for(let f=0,_=g.length;f<_;f+=3){let v=g[f+0],x=g[f+1],y=g[f+2];c.push(v,x,x,y,y,v)}}else{if(u===void 0)return;{let g=u.array;p=u.version;for(let f=0,_=g.length/3-1;f<_;f+=3){let v=f+0,x=f+1,y=f+2;c.push(v,x,x,y,y,v)}}}let d=new(lh(c)?Ms:ys)(c,1);d.version=p;let m=s.get(l);m&&e.remove(m),s.set(l,d)}return{get:function(l,c){return i[c.id]===!0||(c.addEventListener("dispose",a),i[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Bm(r,e,t){let n,i,s;function a(o,l,c){c!==0&&(r.drawElementsInstanced(n,l,i,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,l){r.drawElements(n,l,i,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,i,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let p=0;p<o.length;p++)a(o[p]/s,l[p],h[p]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,i,o,0,h,0,c);let p=0;for(let d=0;d<c;d++)p+=l[d]*h[d];t.update(p,n,1)}}}function km(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function zm(r,e,t){let n=new WeakMap,i=new $e;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let D=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",D)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,d=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],v=0;p===!0&&(v=1),d===!0&&(v=2),m===!0&&(v=3);let x=a.attributes.position.count*v,y=1;x>e.maxTextureSize&&(y=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*y*4*h),R=new xs(w,x,y,h);R.type=rn,R.needsUpdate=!0;let N=4*v;for(let C=0;C<h;C++){let B=g[C],G=f[C],O=_[C],Y=x*y*4*C;for(let k=0;k<B.count;k++){let X=k*N;p===!0&&(i.fromBufferAttribute(B,k),w[Y+X+0]=i.x,w[Y+X+1]=i.y,w[Y+X+2]=i.z,w[Y+X+3]=0),d===!0&&(i.fromBufferAttribute(G,k),w[Y+X+4]=i.x,w[Y+X+5]=i.y,w[Y+X+6]=i.z,w[Y+X+7]=0),m===!0&&(i.fromBufferAttribute(O,k),w[Y+X+8]=i.x,w[Y+X+9]=i.y,w[Y+X+10]=i.z,w[Y+X+11]=O.itemSize===4?i.w:1)}}u={count:h,texture:R,size:new ne(x,y)},n.set(a,u),a.addEventListener("dispose",D)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let p=0;for(let m=0;m<l.length;m++)p+=l[m];let d=a.morphTargetsRelative?1:1-p;o.getUniforms().setValue(r,"morphTargetBaseInfluence",d),o.getUniforms().setValue(r,"morphTargetInfluences",l)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Gm(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(i.get(c)!==o&&(e.update(c),i.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return c},dispose:function(){i=new WeakMap}}}var $p=new Mt,Dp=new Ls(1,1),Qp=new xs,ef=new Ja,tf=new Ss,Up=[],Op=[],Fp=new Float32Array(16),Bp=new Float32Array(9),kp=new Float32Array(4);function Kr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Up[i];if(s===void 0&&(s=new Float32Array(i),Up[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function St(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function bt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function il(r,e){let t=Op[e];t===void 0&&(t=new Int32Array(e),Op[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Hm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Vm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2fv(this.addr,e),bt(t,e)}}function Wm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;r.uniform3fv(this.addr,e),bt(t,e)}}function Xm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4fv(this.addr,e),bt(t,e)}}function jm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(St(t,n))return;kp.set(n),r.uniformMatrix2fv(this.addr,!1,kp),bt(t,n)}}function qm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(St(t,n))return;Bp.set(n),r.uniformMatrix3fv(this.addr,!1,Bp),bt(t,n)}}function Ym(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(St(t,n))return;Fp.set(n),r.uniformMatrix4fv(this.addr,!1,Fp),bt(t,n)}}function Zm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Km(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2iv(this.addr,e),bt(t,e)}}function Jm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3iv(this.addr,e),bt(t,e)}}function $m(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4iv(this.addr,e),bt(t,e)}}function Qm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function eg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2uiv(this.addr,e),bt(t,e)}}function tg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3uiv(this.addr,e),bt(t,e)}}function ng(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4uiv(this.addr,e),bt(t,e)}}function ig(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Dp.compareFunction=sh,s=Dp):s=$p,t.setTexture2D(e||s,i)}function rg(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ef,i)}function sg(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||tf,i)}function ag(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Qp,i)}function og(r,e){r.uniform1fv(this.addr,e)}function lg(r,e){let t=Kr(e,this.size,2);r.uniform2fv(this.addr,t)}function cg(r,e){let t=Kr(e,this.size,3);r.uniform3fv(this.addr,t)}function hg(r,e){let t=Kr(e,this.size,4);r.uniform4fv(this.addr,t)}function ug(r,e){let t=Kr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function dg(r,e){let t=Kr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function pg(r,e){let t=Kr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function fg(r,e){r.uniform1iv(this.addr,e)}function mg(r,e){r.uniform2iv(this.addr,e)}function gg(r,e){r.uniform3iv(this.addr,e)}function _g(r,e){r.uniform4iv(this.addr,e)}function vg(r,e){r.uniform1uiv(this.addr,e)}function xg(r,e){r.uniform2uiv(this.addr,e)}function yg(r,e){r.uniform3uiv(this.addr,e)}function Mg(r,e){r.uniform4uiv(this.addr,e)}function Sg(r,e,t){let n=this.cache,i=e.length,s=il(t,i);St(n,s)||(r.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||$p,s[a])}function bg(r,e,t){let n=this.cache,i=e.length,s=il(t,i);St(n,s)||(r.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||ef,s[a])}function Tg(r,e,t){let n=this.cache,i=e.length,s=il(t,i);St(n,s)||(r.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||tf,s[a])}function wg(r,e,t){let n=this.cache,i=e.length,s=il(t,i);St(n,s)||(r.uniform1iv(this.addr,s),bt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Qp,s[a])}var xh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Hm;case 35664:return Vm;case 35665:return Wm;case 35666:return Xm;case 35674:return jm;case 35675:return qm;case 35676:return Ym;case 5124:case 35670:return Zm;case 35667:case 35671:return Km;case 35668:case 35672:return Jm;case 35669:case 35673:return $m;case 5125:return Qm;case 36294:return eg;case 36295:return tg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return sg;case 36289:case 36303:case 36311:case 36292:return ag}})(t.type)}},yh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return og;case 35664:return lg;case 35665:return cg;case 35666:return hg;case 35674:return ug;case 35675:return dg;case 35676:return pg;case 5124:case 35670:return fg;case 35667:case 35671:return mg;case 35668:case 35672:return gg;case 35669:case 35673:return _g;case 5125:return vg;case 36294:return xg;case 36295:return yg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return wg}})(t.type)}},Mh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},vh=/(\w+)(\])?(\[|\.)?/g;function zp(r,e){r.seq.push(e),r.map[e.id]=e}function Eg(r,e,t){let n=r.name,i=n.length;for(vh.lastIndex=0;;){let s=vh.exec(n),a=vh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===i){zp(t,c===void 0?new xh(o,r,e):new yh(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Mh(o),zp(t,h)),t=h}}}var Zr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Eg(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Gp(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Ag=0,Hp=new ze;function Vp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),p=Math.min(l+6,c.length);for(let d=u;d<p;d++){let m=d+1;h.push(`${m===l?">":" "} ${m}: ${c[d]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Rg(r,e){let t=(function(n){Ze._getMatrix(Hp,Ze.workingColorSpace,n);let i=`mat3( ${Hp.elements.map(s=>s.toFixed(4))} )`;switch(Ze.getTransfer(n)){case _s:return[i,"LinearTransferOETF"];case it:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Cg(r,e){let t;switch(e){case Qd:t="Linear";break;case ep:t="Reinhard";break;case tp:t="Cineon";break;case zo:t="ACESFilmic";break;case ip:t="AgX";break;case rp:t="Neutral";break;case np:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var el=new T;function Ig(){return Ze.getLuminanceCoefficients(el),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${el.x.toFixed(4)}, ${el.y.toFixed(4)}, ${el.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ra(r){return r!==""}function Wp(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sh(r){return r.replace(Pg,Ng)}var Lg=new Map;function Ng(r,e){let t=He[e];if(t===void 0){let n=Lg.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Sh(t)}var Dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jp(r){return r.replace(Dg,Ug)}function Ug(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function qp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Og(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(G){let O="SHADOWMAP_TYPE_BASIC";return G.shadowMapType===xc?O="SHADOWMAP_TYPE_PCF":G.shadowMapType===Lo?O="SHADOWMAP_TYPE_PCF_SOFT":G.shadowMapType===Pn&&(O="SHADOWMAP_TYPE_VSM"),O})(t),c=(function(G){let O="ENVMAP_TYPE_CUBE";if(G.envMap)switch(G.envMapMode){case Hr:case qi:O="ENVMAP_TYPE_CUBE";break;case Qs:O="ENVMAP_TYPE_CUBE_UV"}return O})(t),h=(function(G){let O="ENVMAP_MODE_REFLECTION";return G.envMap&&G.envMapMode===qi&&(O="ENVMAP_MODE_REFRACTION"),O})(t),u=(function(G){let O="ENVMAP_BLENDING_NONE";if(G.envMap)switch(G.combine){case Kd:O="ENVMAP_BLENDING_MULTIPLY";break;case Jd:O="ENVMAP_BLENDING_MIX";break;case $d:O="ENVMAP_BLENDING_ADD"}return O})(t),p=(function(G){let O=G.envMapCubeUVHeight;if(O===null)return null;let Y=Math.log2(O)-2,k=1/O;return{texelWidth:1/(3*Math.max(Math.pow(2,Y),112)),texelHeight:k,maxMip:Y}})(t),d=(function(G){return[G.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",G.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ra).join(`
`)})(t),m=(function(G){let O=[];for(let Y in G){let k=G[Y];k!==!1&&O.push("#define "+Y+" "+k)}return O.join(`
`)})(s),g=i.createProgram(),f,_,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ra).join(`
`),f.length>0&&(f+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ra).join(`
`),_.length>0&&(_+=`
`)):(f=[qp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ra).join(`
`),_=[qp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?He.tonemapping_pars_fragment:"",t.toneMapping!==ti?Cg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Rg("linearToOutputTexel",t.outputColorSpace),Ig(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ra).join(`
`)),a=Sh(a),a=Wp(a,t),a=Xp(a,t),o=Sh(o),o=Wp(o,t),o=Xp(o,t),a=jp(a),o=jp(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,_=["#define varying in",t.glslVersion===ah?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ah?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let x=v+f+a,y=v+_+o,w=Gp(i,i.VERTEX_SHADER,x),R=Gp(i,i.FRAGMENT_SHADER,y);function N(G){if(r.debug.checkShaderErrors){let O=i.getProgramInfoLog(g)||"",Y=i.getShaderInfoLog(w)||"",k=i.getShaderInfoLog(R)||"",X=O.trim(),K=Y.trim(),ae=k.trim(),ee=!0,_e=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(ee=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,w,R);else{let be=Vp(i,w,"vertex"),ye=Vp(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+X+`
`+be+`
`+ye)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):K!==""&&ae!==""||(_e=!1);_e&&(G.diagnostics={runnable:ee,programLog:X,vertexShader:{log:K,prefix:f},fragmentShader:{log:ae,prefix:_}})}i.deleteShader(w),i.deleteShader(R),D=new Zr(i,g),C=(function(O,Y){let k={},X=O.getProgramParameter(Y,O.ACTIVE_ATTRIBUTES);for(let K=0;K<X;K++){let ae=O.getActiveAttrib(Y,K),ee=ae.name,_e=1;ae.type===O.FLOAT_MAT2&&(_e=2),ae.type===O.FLOAT_MAT3&&(_e=3),ae.type===O.FLOAT_MAT4&&(_e=4),k[ee]={type:ae.type,location:O.getAttribLocation(Y,ee),locationSize:_e}}return k})(i,g)}let D,C;i.attachShader(g,w),i.attachShader(g,R),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g),this.getUniforms=function(){return D===void 0&&N(this),D},this.getAttributes=function(){return C===void 0&&N(this),C};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=i.getProgramParameter(g,37297)),B},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ag++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=R,this}var Fg=0,bh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Th(e),t.set(e,n)),n}},Th=class{constructor(e){this.id=Fg++,this.code=e,this.usedTimes=0}};function Bg(r,e,t,n,i,s,a){let o=new Rr,l=new bh,c=new Set,h=[],u=i.logarithmicDepthBuffer,p=i.vertexTextures,d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,_,v,x,y){let w=x.fog,R=y.geometry,N=f.isMeshStandardMaterial?x.environment:null,D=(f.isMeshStandardMaterial?t:e).get(f.envMap||N),C=D&&D.mapping===Qs?D.image.height:null,B=m[f.type];f.precision!==null&&(d=i.getMaxPrecision(f.precision),d!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let G=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,O=G!==void 0?G.length:0,Y,k,X,K,ae=0;if(R.morphAttributes.position!==void 0&&(ae=1),R.morphAttributes.normal!==void 0&&(ae=2),R.morphAttributes.color!==void 0&&(ae=3),B){let ft=Dn[B];Y=ft.vertexShader,k=ft.fragmentShader}else Y=f.vertexShader,k=f.fragmentShader,l.update(f),X=l.getVertexShaderID(f),K=l.getFragmentShaderID(f);let ee=r.getRenderTarget(),_e=r.state.buffers.depth.getReversed(),be=y.isInstancedMesh===!0,ye=y.isBatchedMesh===!0,Pe=!!f.map,oe=!!f.matcap,he=!!D,ce=!!f.aoMap,Ce=!!f.lightMap,Le=!!f.bumpMap,b=!!f.normalMap,S=!!f.displacementMap,F=!!f.emissiveMap,L=!!f.metalnessMap,M=!!f.roughnessMap,A=f.anisotropy>0,U=f.clearcoat>0,I=f.dispersion>0,q=f.iridescence>0,z=f.sheen>0,H=f.transmission>0,ie=A&&!!f.anisotropyMap,fe=U&&!!f.clearcoatMap,re=U&&!!f.clearcoatNormalMap,ve=U&&!!f.clearcoatRoughnessMap,Se=q&&!!f.iridescenceMap,Re=q&&!!f.iridescenceThicknessMap,Ve=z&&!!f.sheenColorMap,W=z&&!!f.sheenRoughnessMap,le=!!f.specularMap,$=!!f.specularColorMap,J=!!f.specularIntensityMap,de=H&&!!f.transmissionMap,Ne=H&&!!f.thicknessMap,te=!!f.gradientMap,ue=!!f.alphaMap,me=f.alphaTest>0,Ue=!!f.alphaHash,Ke=!!f.extensions,P=ti;f.toneMapped&&(ee!==null&&ee.isXRRenderTarget!==!0||(P=r.toneMapping));let Je={shaderID:B,shaderType:f.type,shaderName:f.name,vertexShader:Y,fragmentShader:k,defines:f.defines,customVertexShaderID:X,customFragmentShaderID:K,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:ye,batchingColor:ye&&y._colorsTexture!==null,instancing:be,instancingColor:be&&y.instanceColor!==null,instancingMorph:be&&y.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ee===null?r.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Rt,alphaToCoverage:!!f.alphaToCoverage,map:Pe,matcap:oe,envMap:he,envMapMode:he&&D.mapping,envMapCubeUVHeight:C,aoMap:ce,lightMap:Ce,bumpMap:Le,normalMap:b,displacementMap:p&&S,emissiveMap:F,normalMapObjectSpace:b&&f.normalMapType===up,normalMapTangentSpace:b&&f.normalMapType===hp,metalnessMap:L,roughnessMap:M,anisotropy:A,anisotropyMap:ie,clearcoat:U,clearcoatMap:fe,clearcoatNormalMap:re,clearcoatRoughnessMap:ve,dispersion:I,iridescence:q,iridescenceMap:Se,iridescenceThicknessMap:Re,sheen:z,sheenColorMap:Ve,sheenRoughnessMap:W,specularMap:le,specularColorMap:$,specularIntensityMap:J,transmission:H,transmissionMap:de,thicknessMap:Ne,gradientMap:te,opaque:f.transparent===!1&&f.blending===Js&&f.alphaToCoverage===!1,alphaMap:ue,alphaTest:me,alphaHash:Ue,combine:f.combine,mapUv:Pe&&g(f.map.channel),aoMapUv:ce&&g(f.aoMap.channel),lightMapUv:Ce&&g(f.lightMap.channel),bumpMapUv:Le&&g(f.bumpMap.channel),normalMapUv:b&&g(f.normalMap.channel),displacementMapUv:S&&g(f.displacementMap.channel),emissiveMapUv:F&&g(f.emissiveMap.channel),metalnessMapUv:L&&g(f.metalnessMap.channel),roughnessMapUv:M&&g(f.roughnessMap.channel),anisotropyMapUv:ie&&g(f.anisotropyMap.channel),clearcoatMapUv:fe&&g(f.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&g(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(f.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&g(f.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&g(f.sheenColorMap.channel),sheenRoughnessMapUv:W&&g(f.sheenRoughnessMap.channel),specularMapUv:le&&g(f.specularMap.channel),specularColorMapUv:$&&g(f.specularColorMap.channel),specularIntensityMapUv:J&&g(f.specularIntensityMap.channel),transmissionMapUv:de&&g(f.transmissionMap.channel),thicknessMapUv:Ne&&g(f.thicknessMap.channel),alphaMapUv:ue&&g(f.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(b||A),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!R.attributes.uv&&(Pe||ue),fog:!!w,useFog:f.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_e,skinning:y.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:ae,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:P,decodeVideoTexture:Pe&&f.map.isVideoTexture===!0&&Ze.getTransfer(f.map.colorSpace)===it,decodeVideoTextureEmissive:F&&f.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(f.emissiveMap.colorSpace)===it,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===nn,flipSided:f.side===qt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Ke&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ke&&f.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Je.vertexUv1s=c.has(1),Je.vertexUv2s=c.has(2),Je.vertexUv3s=c.has(3),c.clear(),Je},getProgramCacheKey:function(f){let _=[];if(f.shaderID?_.push(f.shaderID):(_.push(f.customVertexShaderID),_.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)_.push(v),_.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)})(_,f),(function(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),v.push(o.mask)})(_,f),_.push(r.outputColorSpace)),_.push(f.customProgramCacheKey),_.join()},getUniforms:function(f){let _=m[f.type],v;if(_){let x=Dn[_];v=Sp.clone(x.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,_){let v;for(let x=0,y=h.length;x<y;x++){let w=h[x];if(w.cacheKey===_){v=w,++v.usedTimes;break}}return v===void 0&&(v=new Og(r,_,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let _=h.indexOf(f);h[_]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){l.remove(f)},programs:h,dispose:function(){l.dispose()}}}function kg(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function zg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Yp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Zp(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,l,c,h,u){let p=r[e];return p===void 0?(p={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},r[e]=p):(p.id=a.id,p.object=a,p.geometry=o,p.material=l,p.groupOrder=c,p.renderOrder=a.renderOrder,p.z=h,p.group=u),e++,p}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,l,c,h,u){let p=s(a,o,l,c,h,u);l.transmission>0?n.push(p):l.transparent===!0?i.push(p):t.push(p)},unshift:function(a,o,l,c,h,u){let p=s(a,o,l,c,h,u);l.transmission>0?n.unshift(p):l.transparent===!0?i.unshift(p):t.unshift(p)},finish:function(){for(let a=e,o=r.length;a<o;a++){let l=r[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||zg),n.length>1&&n.sort(o||Yp),i.length>1&&i.sort(o||Yp)}}}function Gg(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Zp,r.set(e,[i])):t>=n.length?(i=new Zp,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Hg(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Ae};break;case"SpotLight":t={position:new T,direction:new T,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new T,halfWidth:new T,halfHeight:new T}}return r[e.id]=t,t}}}var Vg=0;function Wg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Xg(r){let e=new Hg,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new T);let i=new T,s=new Ie,a=new Ie;return{setup:function(o){let l=0,c=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let u=0,p=0,d=0,m=0,g=0,f=0,_=0,v=0,x=0,y=0,w=0;o.sort(Wg);for(let N=0,D=o.length;N<D;N++){let C=o[N],B=C.color,G=C.intensity,O=C.distance,Y=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)l+=B.r*G,c+=B.g*G,h+=B.b*G;else if(C.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(C.sh.coefficients[k],G);w++}else if(C.isDirectionalLight){let k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let X=C.shadow,K=t.get(C);K.shadowIntensity=X.intensity,K.shadowBias=X.bias,K.shadowNormalBias=X.normalBias,K.shadowRadius=X.radius,K.shadowMapSize=X.mapSize,n.directionalShadow[u]=K,n.directionalShadowMap[u]=Y,n.directionalShadowMatrix[u]=C.shadow.matrix,f++}n.directional[u]=k,u++}else if(C.isSpotLight){let k=e.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(B).multiplyScalar(G),k.distance=O,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,n.spot[d]=k;let X=C.shadow;if(C.map&&(n.spotLightMap[x]=C.map,x++,X.updateMatrices(C),C.castShadow&&y++),n.spotLightMatrix[d]=X.matrix,C.castShadow){let K=t.get(C);K.shadowIntensity=X.intensity,K.shadowBias=X.bias,K.shadowNormalBias=X.normalBias,K.shadowRadius=X.radius,K.shadowMapSize=X.mapSize,n.spotShadow[d]=K,n.spotShadowMap[d]=Y,v++}d++}else if(C.isRectAreaLight){let k=e.get(C);k.color.copy(B).multiplyScalar(G),k.halfWidth.set(.5*C.width,0,0),k.halfHeight.set(0,.5*C.height,0),n.rectArea[m]=k,m++}else if(C.isPointLight){let k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){let X=C.shadow,K=t.get(C);K.shadowIntensity=X.intensity,K.shadowBias=X.bias,K.shadowNormalBias=X.normalBias,K.shadowRadius=X.radius,K.shadowMapSize=X.mapSize,K.shadowCameraNear=X.camera.near,K.shadowCameraFar=X.camera.far,n.pointShadow[p]=K,n.pointShadowMap[p]=Y,n.pointShadowMatrix[p]=C.shadow.matrix,_++}n.point[p]=k,p++}else if(C.isHemisphereLight){let k=e.get(C);k.skyColor.copy(C.color).multiplyScalar(G),k.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[g]=k,g++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let R=n.hash;R.directionalLength===u&&R.pointLength===p&&R.spotLength===d&&R.rectAreaLength===m&&R.hemiLength===g&&R.numDirectionalShadows===f&&R.numPointShadows===_&&R.numSpotShadows===v&&R.numSpotMaps===x&&R.numLightProbes===w||(n.directional.length=u,n.spot.length=d,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+x-y,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=w,R.directionalLength=u,R.pointLength=p,R.spotLength=d,R.rectAreaLength=m,R.hemiLength=g,R.numDirectionalShadows=f,R.numPointShadows=_,R.numSpotShadows=v,R.numSpotMaps=x,R.numLightProbes=w,n.version=Vg++)},setupView:function(o,l){let c=0,h=0,u=0,p=0,d=0,m=l.matrixWorldInverse;for(let g=0,f=o.length;g<f;g++){let _=o[g];if(_.isDirectionalLight){let v=n.directional[c];v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),c++}else if(_.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(_.isRectAreaLight){let v=n.rectArea[p];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),v.halfWidth.set(.5*_.width,0,0),v.halfHeight.set(0,.5*_.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),p++}else if(_.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),h++}else if(_.isHemisphereLight){let v=n.hemi[d];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(m),d++}}},state:n}}function Kp(r){let e=new Xg(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function jg(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Kp(r),e.set(t,[s])):n>=i.length?(s=new Kp(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function qg(r,e,t){let n=new vi,i=new ne,s=new ne,a=new $e,o=new bo({depthPacking:cp}),l=new To,c={},h=t.maxTextureSize,u={[Mi]:qt,[qt]:Mi,[nn]:nn},p=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:`void main() {
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
}`}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let m=new tt;m.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new ct(m,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xc;let _=this.type;function v(R,N){let D=e.update(g);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new bn(i.x,i.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(N,null,D,p,g,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(N,null,D,d,g,null)}function x(R,N,D,C){let B=null,G=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(G!==void 0)B=G;else if(B=D.isPointLight===!0?l:o,r.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){let O=B.uuid,Y=N.uuid,k=c[O];k===void 0&&(k={},c[O]=k);let X=k[Y];X===void 0&&(X=B.clone(),k[Y]=X,N.addEventListener("dispose",w)),B=X}return B.visible=N.visible,B.wireframe=N.wireframe,B.side=C===Pn?N.shadowSide!==null?N.shadowSide:N.side:N.shadowSide!==null?N.shadowSide:u[N.side],B.alphaMap=N.alphaMap,B.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,B.map=N.map,B.clipShadows=N.clipShadows,B.clippingPlanes=N.clippingPlanes,B.clipIntersection=N.clipIntersection,B.displacementMap=N.displacementMap,B.displacementScale=N.displacementScale,B.displacementBias=N.displacementBias,B.wireframeLinewidth=N.wireframeLinewidth,B.linewidth=N.linewidth,D.isPointLight===!0&&B.isMeshDistanceMaterial===!0&&(r.properties.get(B).light=D),B}function y(R,N,D,C,B){if(R.visible===!1)return;if(R.layers.test(N.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&B===Pn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);let O=e.update(R),Y=R.material;if(Array.isArray(Y)){let k=O.groups;for(let X=0,K=k.length;X<K;X++){let ae=k[X],ee=Y[ae.materialIndex];if(ee&&ee.visible){let _e=x(R,ee,C,B);R.onBeforeShadow(r,R,N,D,O,_e,ae),r.renderBufferDirect(D,null,O,_e,R,ae),R.onAfterShadow(r,R,N,D,O,_e,ae)}}}else if(Y.visible){let k=x(R,Y,C,B);R.onBeforeShadow(r,R,N,D,O,k,null),r.renderBufferDirect(D,null,O,k,R,null),R.onAfterShadow(r,R,N,D,O,k,null)}}let G=R.children;for(let O=0,Y=G.length;O<Y;O++)y(G[O],N,D,C,B)}function w(R){R.target.removeEventListener("dispose",w);for(let N in c){let D=c[N],C=R.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}this.render=function(R,N,D){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;let C=r.getRenderTarget(),B=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Si),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let Y=_!==Pn&&this.type===Pn,k=_===Pn&&this.type!==Pn;for(let X=0,K=R.length;X<K;X++){let ae=R[X],ee=ae.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;i.copy(ee.mapSize);let _e=ee.getFrameExtents();if(i.multiply(_e),s.copy(ee.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/_e.x),i.x=s.x*_e.x,ee.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/_e.y),i.y=s.y*_e.y,ee.mapSize.y=s.y)),ee.map===null||Y===!0||k===!0){let ye=this.type!==Pn?{minFilter:Xt,magFilter:Xt}:{};ee.map!==null&&ee.map.dispose(),ee.map=new bn(i.x,i.y,ye),ee.map.texture.name=ae.name+".shadowMap",ee.camera.updateProjectionMatrix()}r.setRenderTarget(ee.map),r.clear();let be=ee.getViewportCount();for(let ye=0;ye<be;ye++){let Pe=ee.getViewport(ye);a.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),O.viewport(a),ee.updateMatrices(ae,ye),n=ee.getFrustum(),y(N,D,ee.camera,ae,this.type)}ee.isPointLightShadow!==!0&&this.type===Pn&&v(ee,D),ee.needsUpdate=!1}_=this.type,f.needsUpdate=!1,r.setRenderTarget(C,B,G)}}var Yg={[No]:Do,[Uo]:Bo,[Oo]:ko,[$s]:Fo,[Do]:No,[Bo]:Uo,[ko]:Oo,[Fo]:$s};function Zg(r,e){let t=new function(){let M=!1,A=new $e,U=null,I=new $e(0,0,0,0);return{setMask:function(q){U===q||M||(r.colorMask(q,q,q,q),U=q)},setLocked:function(q){M=q},setClear:function(q,z,H,ie,fe){fe===!0&&(q*=ie,z*=ie,H*=ie),A.set(q,z,H,ie),I.equals(A)===!1&&(r.clearColor(q,z,H,ie),I.copy(A))},reset:function(){M=!1,U=null,I.set(-1,0,0,0)}}},n=new function(){let M=!1,A=!1,U=null,I=null,q=null;return{setReversed:function(z){if(A!==z){let H=e.get("EXT_clip_control");z?H.clipControlEXT(H.LOWER_LEFT_EXT,H.ZERO_TO_ONE_EXT):H.clipControlEXT(H.LOWER_LEFT_EXT,H.NEGATIVE_ONE_TO_ONE_EXT),A=z;let ie=q;q=null,this.setClear(ie)}},getReversed:function(){return A},setTest:function(z){z?he(r.DEPTH_TEST):ce(r.DEPTH_TEST)},setMask:function(z){U===z||M||(r.depthMask(z),U=z)},setFunc:function(z){if(A&&(z=Yg[z]),I!==z){switch(z){case No:r.depthFunc(r.NEVER);break;case Do:r.depthFunc(r.ALWAYS);break;case Uo:r.depthFunc(r.LESS);break;case $s:r.depthFunc(r.LEQUAL);break;case Oo:r.depthFunc(r.EQUAL);break;case Fo:r.depthFunc(r.GEQUAL);break;case Bo:r.depthFunc(r.GREATER);break;case ko:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}I=z}},setLocked:function(z){M=z},setClear:function(z){q!==z&&(A&&(z=1-z),r.clearDepth(z),q=z)},reset:function(){M=!1,U=null,I=null,q=null,A=!1}}},i=new function(){let M=!1,A=null,U=null,I=null,q=null,z=null,H=null,ie=null,fe=null;return{setTest:function(re){M||(re?he(r.STENCIL_TEST):ce(r.STENCIL_TEST))},setMask:function(re){A===re||M||(r.stencilMask(re),A=re)},setFunc:function(re,ve,Se){U===re&&I===ve&&q===Se||(r.stencilFunc(re,ve,Se),U=re,I=ve,q=Se)},setOp:function(re,ve,Se){z===re&&H===ve&&ie===Se||(r.stencilOp(re,ve,Se),z=re,H=ve,ie=Se)},setLocked:function(re){M=re},setClear:function(re){fe!==re&&(r.clearStencil(re),fe=re)},reset:function(){M=!1,A=null,U=null,I=null,q=null,z=null,H=null,ie=null,fe=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,p=!1,d=null,m=null,g=null,f=null,_=null,v=null,x=null,y=new Ae(0,0,0),w=0,R=!1,N=null,D=null,C=null,B=null,G=null,O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,k=0,X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=k>=1):X.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=k>=2);let K=null,ae={},ee=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),be=new $e().fromArray(ee),ye=new $e().fromArray(_e);function Pe(M,A,U,I){let q=new Uint8Array(4),z=r.createTexture();r.bindTexture(M,z),r.texParameteri(M,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(M,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let H=0;H<U;H++)M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?r.texImage3D(A,0,r.RGBA,1,1,I,0,r.RGBA,r.UNSIGNED_BYTE,q):r.texImage2D(A+H,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,q);return z}let oe={};function he(M){o[M]!==!0&&(r.enable(M),o[M]=!0)}function ce(M){o[M]!==!1&&(r.disable(M),o[M]=!1)}oe[r.TEXTURE_2D]=Pe(r.TEXTURE_2D,r.TEXTURE_2D,1),oe[r.TEXTURE_CUBE_MAP]=Pe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[r.TEXTURE_2D_ARRAY]=Pe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),oe[r.TEXTURE_3D]=Pe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),he(r.DEPTH_TEST),n.setFunc($s),S(!1),F(vc),he(r.CULL_FACE),b(Si);let Ce={[Gr]:r.FUNC_ADD,[Pd]:r.FUNC_SUBTRACT,[Ld]:r.FUNC_REVERSE_SUBTRACT};Ce[Nd]=r.MIN,Ce[Dd]=r.MAX;let Le={[Ud]:r.ZERO,[Od]:r.ONE,[Fd]:r.SRC_COLOR,[kd]:r.SRC_ALPHA,[Xd]:r.SRC_ALPHA_SATURATE,[Vd]:r.DST_COLOR,[Gd]:r.DST_ALPHA,[Bd]:r.ONE_MINUS_SRC_COLOR,[zd]:r.ONE_MINUS_SRC_ALPHA,[Wd]:r.ONE_MINUS_DST_COLOR,[Hd]:r.ONE_MINUS_DST_ALPHA,[jd]:r.CONSTANT_COLOR,[qd]:r.ONE_MINUS_CONSTANT_COLOR,[Yd]:r.CONSTANT_ALPHA,[Zd]:r.ONE_MINUS_CONSTANT_ALPHA};function b(M,A,U,I,q,z,H,ie,fe,re){if(M!==Si){if(p===!1&&(he(r.BLEND),p=!0),M===Id)q=q||A,z=z||U,H=H||I,A===m&&q===_||(r.blendEquationSeparate(Ce[A],Ce[q]),m=A,_=q),U===g&&I===f&&z===v&&H===x||(r.blendFuncSeparate(Le[U],Le[I],Le[z],Le[H]),g=U,f=I,v=z,x=H),ie.equals(y)!==!1&&fe===w||(r.blendColor(ie.r,ie.g,ie.b,fe),y.copy(ie),w=fe),d=M,R=!1;else if(M!==d||re!==R){if(m===Gr&&_===Gr||(r.blendEquation(r.FUNC_ADD),m=Gr,_=Gr),re)switch(M){case Js:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yc:r.blendFunc(r.ONE,r.ONE);break;case Mc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}else switch(M){case Js:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yc:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Mc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}g=null,f=null,v=null,x=null,y.set(0,0,0),w=0,d=M,R=re}}else p===!0&&(ce(r.BLEND),p=!1)}function S(M){N!==M&&(M?r.frontFace(r.CW):r.frontFace(r.CCW),N=M)}function F(M){M!==Rd?(he(r.CULL_FACE),M!==D&&(M===vc?r.cullFace(r.BACK):M===Cd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ce(r.CULL_FACE),D=M}function L(M,A,U){M?(he(r.POLYGON_OFFSET_FILL),B===A&&G===U||(r.polygonOffset(A,U),B=A,G=U)):ce(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:he,disable:ce,bindFramebuffer:function(M,A){return l[M]!==A&&(r.bindFramebuffer(M,A),l[M]=A,M===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=A),M===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=A),!0)},drawBuffers:function(M,A){let U=h,I=!1;if(M){U=c.get(A),U===void 0&&(U=[],c.set(A,U));let q=M.textures;if(U.length!==q.length||U[0]!==r.COLOR_ATTACHMENT0){for(let z=0,H=q.length;z<H;z++)U[z]=r.COLOR_ATTACHMENT0+z;U.length=q.length,I=!0}}else U[0]!==r.BACK&&(U[0]=r.BACK,I=!0);I&&r.drawBuffers(U)},useProgram:function(M){return u!==M&&(r.useProgram(M),u=M,!0)},setBlending:b,setMaterial:function(M,A){M.side===nn?ce(r.CULL_FACE):he(r.CULL_FACE);let U=M.side===qt;A&&(U=!U),S(U),M.blending===Js&&M.transparent===!1?b(Si):b(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),n.setFunc(M.depthFunc),n.setTest(M.depthTest),n.setMask(M.depthWrite),t.setMask(M.colorWrite);let I=M.stencilWrite;i.setTest(I),I&&(i.setMask(M.stencilWriteMask),i.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),i.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),L(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?he(r.SAMPLE_ALPHA_TO_COVERAGE):ce(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:S,setCullFace:F,setLineWidth:function(M){M!==C&&(Y&&r.lineWidth(M),C=M)},setPolygonOffset:L,setScissorTest:function(M){M?he(r.SCISSOR_TEST):ce(r.SCISSOR_TEST)},activeTexture:function(M){M===void 0&&(M=r.TEXTURE0+O-1),K!==M&&(r.activeTexture(M),K=M)},bindTexture:function(M,A,U){U===void 0&&(U=K===null?r.TEXTURE0+O-1:K);let I=ae[U];I===void 0&&(I={type:void 0,texture:void 0},ae[U]=I),I.type===M&&I.texture===A||(K!==U&&(r.activeTexture(U),K=U),r.bindTexture(M,A||oe[M]),I.type=M,I.texture=A)},unbindTexture:function(){let M=ae[K];M!==void 0&&M.type!==void 0&&(r.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},updateUBOMapping:function(M,A){let U=a.get(A);U===void 0&&(U=new WeakMap,a.set(A,U));let I=U.get(M);I===void 0&&(I=r.getUniformBlockIndex(A,M.name),U.set(M,I))},uniformBlockBinding:function(M,A){let U=a.get(A).get(M);s.get(A)!==U&&(r.uniformBlockBinding(A,U,M.__bindingPointIndex),s.set(A,U))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},scissor:function(M){be.equals(M)===!1&&(r.scissor(M.x,M.y,M.z,M.w),be.copy(M))},viewport:function(M){ye.equals(M)===!1&&(r.viewport(M.x,M.y,M.z,M.w),ye.copy(M))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},K=null,ae={},l={},c=new WeakMap,h=[],u=null,p=!1,d=null,m=null,g=null,f=null,_=null,v=null,x=null,y=new Ae(0,0,0),w=0,R=!1,N=null,D=null,C=null,B=null,G=null,be.set(0,0,r.canvas.width,r.canvas.height),ye.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function Kg(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap,u,p=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(b,S){return d?new OffscreenCanvas(b,S):wr("canvas")}function g(b,S,F){let L=1,M=Le(b);if((M.width>F||M.height>F)&&(L=F/Math.max(M.width,M.height)),L<1){if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let A=Math.floor(L*M.width),U=Math.floor(L*M.height);u===void 0&&(u=m(A,U));let I=S?m(A,U):u;return I.width=A,I.height=U,I.getContext("2d").drawImage(b,0,0,A,U),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+A+"x"+U+")."),I}return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),b}return b}function f(b){return b.generateMipmaps}function _(b){r.generateMipmap(b)}function v(b){return b.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?r.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(b,S,F,L,M=!1){if(b!==null){if(r[b]!==void 0)return r[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let A=S;if(S===r.RED&&(F===r.FLOAT&&(A=r.R32F),F===r.HALF_FLOAT&&(A=r.R16F),F===r.UNSIGNED_BYTE&&(A=r.R8)),S===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.R8UI),F===r.UNSIGNED_SHORT&&(A=r.R16UI),F===r.UNSIGNED_INT&&(A=r.R32UI),F===r.BYTE&&(A=r.R8I),F===r.SHORT&&(A=r.R16I),F===r.INT&&(A=r.R32I)),S===r.RG&&(F===r.FLOAT&&(A=r.RG32F),F===r.HALF_FLOAT&&(A=r.RG16F),F===r.UNSIGNED_BYTE&&(A=r.RG8)),S===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.RG8UI),F===r.UNSIGNED_SHORT&&(A=r.RG16UI),F===r.UNSIGNED_INT&&(A=r.RG32UI),F===r.BYTE&&(A=r.RG8I),F===r.SHORT&&(A=r.RG16I),F===r.INT&&(A=r.RG32I)),S===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.RGB8UI),F===r.UNSIGNED_SHORT&&(A=r.RGB16UI),F===r.UNSIGNED_INT&&(A=r.RGB32UI),F===r.BYTE&&(A=r.RGB8I),F===r.SHORT&&(A=r.RGB16I),F===r.INT&&(A=r.RGB32I)),S===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(A=r.RGBA16UI),F===r.UNSIGNED_INT&&(A=r.RGBA32UI),F===r.BYTE&&(A=r.RGBA8I),F===r.SHORT&&(A=r.RGBA16I),F===r.INT&&(A=r.RGBA32I)),S===r.RGB&&(F===r.UNSIGNED_INT_5_9_9_9_REV&&(A=r.RGB9_E5),F===r.UNSIGNED_INT_10F_11F_11F_REV&&(A=r.R11F_G11F_B10F)),S===r.RGBA){let U=M?_s:Ze.getTransfer(L);F===r.FLOAT&&(A=r.RGBA32F),F===r.HALF_FLOAT&&(A=r.RGBA16F),F===r.UNSIGNED_BYTE&&(A=U===it?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(A=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(A=r.RGB5_A1)}return A!==r.R16F&&A!==r.R32F&&A!==r.RG16F&&A!==r.RG32F&&A!==r.RGBA16F&&A!==r.RGBA32F||e.get("EXT_color_buffer_float"),A}function y(b,S){let F;return b?S===null||S===Zi||S===jr?F=r.DEPTH24_STENCIL8:S===rn?F=r.DEPTH32F_STENCIL8:S===Wr&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Zi||S===jr?F=r.DEPTH_COMPONENT24:S===rn?F=r.DEPTH_COMPONENT32F:S===Wr&&(F=r.DEPTH_COMPONENT16),F}function w(b,S){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Xt&&b.minFilter!==kt?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function R(b){let S=b.target;S.removeEventListener("dispose",R),(function(F){let L=n.get(F);if(L.__webglInit===void 0)return;let M=F.source,A=p.get(M);if(A){let U=A[L.__cacheKey];U.usedTimes--,U.usedTimes===0&&D(F),Object.keys(A).length===0&&p.delete(M)}n.remove(F)})(S),S.isVideoTexture&&h.delete(S)}function N(b){let S=b.target;S.removeEventListener("dispose",N),(function(F){let L=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(L.__webglFramebuffer[A]))for(let U=0;U<L.__webglFramebuffer[A].length;U++)r.deleteFramebuffer(L.__webglFramebuffer[A][U]);else r.deleteFramebuffer(L.__webglFramebuffer[A]);L.__webglDepthbuffer&&r.deleteRenderbuffer(L.__webglDepthbuffer[A])}else{if(Array.isArray(L.__webglFramebuffer))for(let A=0;A<L.__webglFramebuffer.length;A++)r.deleteFramebuffer(L.__webglFramebuffer[A]);else r.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&r.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&r.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let A=0;A<L.__webglColorRenderbuffer.length;A++)L.__webglColorRenderbuffer[A]&&r.deleteRenderbuffer(L.__webglColorRenderbuffer[A]);L.__webglDepthRenderbuffer&&r.deleteRenderbuffer(L.__webglDepthRenderbuffer)}let M=F.textures;for(let A=0,U=M.length;A<U;A++){let I=n.get(M[A]);I.__webglTexture&&(r.deleteTexture(I.__webglTexture),a.memory.textures--),n.remove(M[A])}n.remove(F)})(S)}function D(b){let S=n.get(b);r.deleteTexture(S.__webglTexture);let F=b.source;delete p.get(F)[S.__cacheKey],a.memory.textures--}let C=0;function B(b,S){let F=n.get(b);if(b.isVideoTexture&&(function(L){let M=a.render.frame;h.get(L)!==M&&(h.set(L,M),L.update())})(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&F.__version!==b.version){let L=b.image;if(L===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(L.complete!==!1)return void ae(F,b,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else b.isExternalTexture&&(F.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+S)}let G={[Qt]:r.REPEAT,[mi]:r.CLAMP_TO_EDGE,[Tr]:r.MIRRORED_REPEAT},O={[Xt]:r.NEAREST,[Ho]:r.NEAREST_MIPMAP_NEAREST,[Yi]:r.NEAREST_MIPMAP_LINEAR,[kt]:r.LINEAR,[Vr]:r.LINEAR_MIPMAP_NEAREST,[Ln]:r.LINEAR_MIPMAP_LINEAR},Y={[dp]:r.NEVER,[vp]:r.ALWAYS,[pp]:r.LESS,[sh]:r.LEQUAL,[fp]:r.EQUAL,[_p]:r.GEQUAL,[mp]:r.GREATER,[gp]:r.NOTEQUAL};function k(b,S){if(S.type!==rn||e.has("OES_texture_float_linear")!==!1||S.magFilter!==kt&&S.magFilter!==Vr&&S.magFilter!==Yi&&S.magFilter!==Ln&&S.minFilter!==kt&&S.minFilter!==Vr&&S.minFilter!==Yi&&S.minFilter!==Ln||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(b,r.TEXTURE_WRAP_S,G[S.wrapS]),r.texParameteri(b,r.TEXTURE_WRAP_T,G[S.wrapT]),b!==r.TEXTURE_3D&&b!==r.TEXTURE_2D_ARRAY||r.texParameteri(b,r.TEXTURE_WRAP_R,G[S.wrapR]),r.texParameteri(b,r.TEXTURE_MAG_FILTER,O[S.magFilter]),r.texParameteri(b,r.TEXTURE_MIN_FILTER,O[S.minFilter]),S.compareFunction&&(r.texParameteri(b,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(b,r.TEXTURE_COMPARE_FUNC,Y[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Xt||S.minFilter!==Yi&&S.minFilter!==Ln||S.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");r.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function X(b,S){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",R));let L=S.source,M=p.get(L);M===void 0&&(M={},p.set(L,M));let A=(function(U){let I=[];return I.push(U.wrapS),I.push(U.wrapT),I.push(U.wrapR||0),I.push(U.magFilter),I.push(U.minFilter),I.push(U.anisotropy),I.push(U.internalFormat),I.push(U.format),I.push(U.type),I.push(U.generateMipmaps),I.push(U.premultiplyAlpha),I.push(U.flipY),I.push(U.unpackAlignment),I.push(U.colorSpace),I.join()})(S);if(A!==b.__cacheKey){M[A]===void 0&&(M[A]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,F=!0),M[A].usedTimes++;let U=M[b.__cacheKey];U!==void 0&&(M[b.__cacheKey].usedTimes--,U.usedTimes===0&&D(S)),b.__cacheKey=A,b.__webglTexture=M[A].texture}return F}function K(b,S,F){return Math.floor(Math.floor(b/F)/S)}function ae(b,S,F){let L=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(L=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(L=r.TEXTURE_3D);let M=X(b,S),A=S.source;t.bindTexture(L,b.__webglTexture,r.TEXTURE0+F);let U=n.get(A);if(A.version!==U.__version||M===!0){t.activeTexture(r.TEXTURE0+F);let I=Ze.getPrimaries(Ze.workingColorSpace),q=S.colorSpace===Ki?null:Ze.getPrimaries(S.colorSpace),z=S.colorSpace===Ki||I===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,z);let H=g(S.image,!1,i.maxTextureSize);H=Ce(S,H);let ie=s.convert(S.format,S.colorSpace),fe=s.convert(S.type),re,ve=x(S.internalFormat,ie,fe,S.colorSpace,S.isVideoTexture);k(L,S);let Se=S.mipmaps,Re=S.isVideoTexture!==!0,Ve=U.__version===void 0||M===!0,W=A.dataReady,le=w(S,H);if(S.isDepthTexture)ve=y(S.format===ta,S.type),Ve&&(Re?t.texStorage2D(r.TEXTURE_2D,1,ve,H.width,H.height):t.texImage2D(r.TEXTURE_2D,0,ve,H.width,H.height,0,ie,fe,null));else if(S.isDataTexture)if(Se.length>0){Re&&Ve&&t.texStorage2D(r.TEXTURE_2D,le,ve,Se[0].width,Se[0].height);for(let $=0,J=Se.length;$<J;$++)re=Se[$],Re?W&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,re.width,re.height,ie,fe,re.data):t.texImage2D(r.TEXTURE_2D,$,ve,re.width,re.height,0,ie,fe,re.data);S.generateMipmaps=!1}else Re?(Ve&&t.texStorage2D(r.TEXTURE_2D,le,ve,H.width,H.height),W&&(function($,J,de,Ne){let te=$.updateRanges;if(te.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,J.width,J.height,de,Ne,J.data);else{te.sort((P,Je)=>P.start-Je.start);let ue=0;for(let P=1;P<te.length;P++){let Je=te[ue],ft=te[P],et=Je.start+Je.count,Et=K(ft.start,J.width,4),on=K(Je.start,J.width,4);ft.start<=et+1&&Et===on&&K(ft.start+ft.count-1,J.width,4)===Et?Je.count=Math.max(Je.count,ft.start+ft.count-Je.start):(++ue,te[ue]=ft)}te.length=ue+1;let me=r.getParameter(r.UNPACK_ROW_LENGTH),Ue=r.getParameter(r.UNPACK_SKIP_PIXELS),Ke=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,J.width);for(let P=0,Je=te.length;P<Je;P++){let ft=te[P],et=Math.floor(ft.start/4),Et=Math.ceil(ft.count/4),on=et%J.width,Fn=Math.floor(et/J.width),Bn=Et;r.pixelStorei(r.UNPACK_SKIP_PIXELS,on),r.pixelStorei(r.UNPACK_SKIP_ROWS,Fn),t.texSubImage2D(r.TEXTURE_2D,0,on,Fn,Bn,1,de,Ne,J.data)}$.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,me),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ue),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ke)}})(S,H,ie,fe)):t.texImage2D(r.TEXTURE_2D,0,ve,H.width,H.height,0,ie,fe,H.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Re&&Ve&&t.texStorage3D(r.TEXTURE_2D_ARRAY,le,ve,Se[0].width,Se[0].height,H.depth);for(let $=0,J=Se.length;$<J;$++)if(re=Se[$],S.format!==sn)if(ie!==null)if(Re){if(W)if(S.layerUpdates.size>0){let de=dh(re.width,re.height,S.format,S.type);for(let Ne of S.layerUpdates){let te=re.data.subarray(Ne*de/re.data.BYTES_PER_ELEMENT,(Ne+1)*de/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,Ne,re.width,re.height,1,ie,te)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,re.width,re.height,H.depth,ie,re.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,$,ve,re.width,re.height,H.depth,0,re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?W&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,re.width,re.height,H.depth,ie,fe,re.data):t.texImage3D(r.TEXTURE_2D_ARRAY,$,ve,re.width,re.height,H.depth,0,ie,fe,re.data)}else{Re&&Ve&&t.texStorage2D(r.TEXTURE_2D,le,ve,Se[0].width,Se[0].height);for(let $=0,J=Se.length;$<J;$++)re=Se[$],S.format!==sn?ie!==null?Re?W&&t.compressedTexSubImage2D(r.TEXTURE_2D,$,0,0,re.width,re.height,ie,re.data):t.compressedTexImage2D(r.TEXTURE_2D,$,ve,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?W&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,re.width,re.height,ie,fe,re.data):t.texImage2D(r.TEXTURE_2D,$,ve,re.width,re.height,0,ie,fe,re.data)}else if(S.isDataArrayTexture)if(Re){if(Ve&&t.texStorage3D(r.TEXTURE_2D_ARRAY,le,ve,H.width,H.height,H.depth),W)if(S.layerUpdates.size>0){let $=dh(H.width,H.height,S.format,S.type);for(let J of S.layerUpdates){let de=H.data.subarray(J*$/H.data.BYTES_PER_ELEMENT,(J+1)*$/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,H.width,H.height,1,ie,fe,de)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,ie,fe,H.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ve,H.width,H.height,H.depth,0,ie,fe,H.data);else if(S.isData3DTexture)Re?(Ve&&t.texStorage3D(r.TEXTURE_3D,le,ve,H.width,H.height,H.depth),W&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,ie,fe,H.data)):t.texImage3D(r.TEXTURE_3D,0,ve,H.width,H.height,H.depth,0,ie,fe,H.data);else if(S.isFramebufferTexture){if(Ve)if(Re)t.texStorage2D(r.TEXTURE_2D,le,ve,H.width,H.height);else{let $=H.width,J=H.height;for(let de=0;de<le;de++)t.texImage2D(r.TEXTURE_2D,de,ve,$,J,0,ie,fe,null),$>>=1,J>>=1}}else if(Se.length>0){if(Re&&Ve){let $=Le(Se[0]);t.texStorage2D(r.TEXTURE_2D,le,ve,$.width,$.height)}for(let $=0,J=Se.length;$<J;$++)re=Se[$],Re?W&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,ie,fe,re):t.texImage2D(r.TEXTURE_2D,$,ve,ie,fe,re);S.generateMipmaps=!1}else if(Re){if(Ve){let $=Le(H);t.texStorage2D(r.TEXTURE_2D,le,ve,$.width,$.height)}W&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ie,fe,H)}else t.texImage2D(r.TEXTURE_2D,0,ve,ie,fe,H);f(S)&&_(L),U.__version=A.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function ee(b,S,F,L,M,A){let U=s.convert(F.format,F.colorSpace),I=s.convert(F.type),q=x(F.internalFormat,U,I,F.colorSpace),z=n.get(S),H=n.get(F);if(H.__renderTarget=S,!z.__hasExternalTextures){let ie=Math.max(1,S.width>>A),fe=Math.max(1,S.height>>A);M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?t.texImage3D(M,A,q,ie,fe,S.depth,0,U,I,null):t.texImage2D(M,A,q,ie,fe,0,U,I,null)}t.bindFramebuffer(r.FRAMEBUFFER,b),ce(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,L,M,H.__webglTexture,0,he(S)):(M===r.TEXTURE_2D||M>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&M<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,L,M,H.__webglTexture,A),t.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(b,S,F){if(r.bindRenderbuffer(r.RENDERBUFFER,b),S.depthBuffer){let L=S.depthTexture,M=L&&L.isDepthTexture?L.type:null,A=y(S.stencilBuffer,M),U=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,I=he(S);ce(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I,A,S.width,S.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,I,A,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,A,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,U,r.RENDERBUFFER,b)}else{let L=S.textures;for(let M=0;M<L.length;M++){let A=L[M],U=s.convert(A.format,A.colorSpace),I=s.convert(A.type),q=x(A.internalFormat,U,I,A.colorSpace),z=he(S);F&&ce(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,z,q,S.width,S.height):ce(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,z,q,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,q,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function be(b,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,b),!S.depthTexture||!S.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let F=n.get(S.depthTexture);F.__renderTarget=S,F.__webglTexture&&S.depthTexture.image.width===S.width&&S.depthTexture.image.height===S.height||(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),B(S.depthTexture,0);let L=F.__webglTexture,M=he(S);if(S.depthTexture.format===ea)ce(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,L,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,L,0);else{if(S.depthTexture.format!==ta)throw new Error("Unknown depthTexture format");ce(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,L,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,L,0)}}function ye(b){let S=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==b.depthTexture){let L=b.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),L){let M=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,L.removeEventListener("dispose",M)};L.addEventListener("dispose",M),S.__depthDisposeCallback=M}S.__boundDepthTexture=L}if(b.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let L=b.texture.mipmaps;L&&L.length>0?be(S.__webglFramebuffer[0],b):be(S.__webglFramebuffer,b)}else if(F){S.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[L]),S.__webglDepthbuffer[L]===void 0)S.__webglDepthbuffer[L]=r.createRenderbuffer(),_e(S.__webglDepthbuffer[L],b,!1);else{let M=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,A=S.__webglDepthbuffer[L];r.bindRenderbuffer(r.RENDERBUFFER,A),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,A)}}else{let L=b.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),_e(S.__webglDepthbuffer,b,!1);else{let M=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,A=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,A),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,A)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Pe=[],oe=[];function he(b){return Math.min(i.maxSamples,b.samples)}function ce(b){let S=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ce(b,S){let F=b.colorSpace,L=b.format,M=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==Rt&&F!==Ki&&(Ze.getTransfer(F)===it?L===sn&&M===Nn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function Le(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=function(){let b=C;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),C+=1,b},this.resetTextureUnits=function(){C=0},this.setTexture2D=B,this.setTexture2DArray=function(b,S){let F=n.get(b);b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version?ae(F,b,S):t.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+S)},this.setTexture3D=function(b,S){let F=n.get(b);b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version?ae(F,b,S):t.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+S)},this.setTextureCube=function(b,S){let F=n.get(b);b.version>0&&F.__version!==b.version?(function(L,M,A){if(M.image.length!==6)return;let U=X(L,M),I=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+A);let q=n.get(I);if(I.version!==q.__version||U===!0){t.activeTexture(r.TEXTURE0+A);let z=Ze.getPrimaries(Ze.workingColorSpace),H=M.colorSpace===Ki?null:Ze.getPrimaries(M.colorSpace),ie=M.colorSpace===Ki||z===H?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let fe=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,ve=[];for(let te=0;te<6;te++)ve[te]=fe||re?re?M.image[te].image:M.image[te]:g(M.image[te],!0,i.maxCubemapSize),ve[te]=Ce(M,ve[te]);let Se=ve[0],Re=s.convert(M.format,M.colorSpace),Ve=s.convert(M.type),W=x(M.internalFormat,Re,Ve,M.colorSpace),le=M.isVideoTexture!==!0,$=q.__version===void 0||U===!0,J=I.dataReady,de,Ne=w(M,Se);if(k(r.TEXTURE_CUBE_MAP,M),fe){le&&$&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ne,W,Se.width,Se.height);for(let te=0;te<6;te++){de=ve[te].mipmaps;for(let ue=0;ue<de.length;ue++){let me=de[ue];M.format!==sn?Re!==null?le?J&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue,0,0,me.width,me.height,Re,me.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue,W,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):le?J&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue,0,0,me.width,me.height,Re,Ve,me.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue,W,me.width,me.height,0,Re,Ve,me.data)}}}else{if(de=M.mipmaps,le&&$){de.length>0&&Ne++;let te=Le(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ne,W,te.width,te.height)}for(let te=0;te<6;te++)if(re){le?J&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ve[te].width,ve[te].height,Re,Ve,ve[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,W,ve[te].width,ve[te].height,0,Re,Ve,ve[te].data);for(let ue=0;ue<de.length;ue++){let me=de[ue].image[te].image;le?J&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue+1,0,0,me.width,me.height,Re,Ve,me.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue+1,W,me.width,me.height,0,Re,Ve,me.data)}}else{le?J&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Re,Ve,ve[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,W,Re,Ve,ve[te]);for(let ue=0;ue<de.length;ue++){let me=de[ue];le?J&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue+1,0,0,Re,Ve,me.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,ue+1,W,Re,Ve,me.image[te])}}}f(M)&&_(r.TEXTURE_CUBE_MAP),q.__version=I.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version})(F,b,S):t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+S)},this.rebindTextures=function(b,S,F){let L=n.get(b);S!==void 0&&ee(L.__webglFramebuffer,b,b.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&ye(b)},this.setupRenderTarget=function(b){let S=b.texture,F=n.get(b),L=n.get(S);b.addEventListener("dispose",N);let M=b.textures,A=b.isWebGLCubeRenderTarget===!0,U=M.length>1;if(U||(L.__webglTexture===void 0&&(L.__webglTexture=r.createTexture()),L.__version=S.version,a.memory.textures++),A){F.__webglFramebuffer=[];for(let I=0;I<6;I++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[I]=[];for(let q=0;q<S.mipmaps.length;q++)F.__webglFramebuffer[I][q]=r.createFramebuffer()}else F.__webglFramebuffer[I]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let I=0;I<S.mipmaps.length;I++)F.__webglFramebuffer[I]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(U)for(let I=0,q=M.length;I<q;I++){let z=n.get(M[I]);z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture(),a.memory.textures++)}if(b.samples>0&&ce(b)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let I=0;I<M.length;I++){let q=M[I];F.__webglColorRenderbuffer[I]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[I]);let z=s.convert(q.format,q.colorSpace),H=s.convert(q.type),ie=x(q.internalFormat,z,H,q.colorSpace,b.isXRRenderTarget===!0),fe=he(b);r.renderbufferStorageMultisample(r.RENDERBUFFER,fe,ie,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.RENDERBUFFER,F.__webglColorRenderbuffer[I])}r.bindRenderbuffer(r.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),_e(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(A){t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture),k(r.TEXTURE_CUBE_MAP,S);for(let I=0;I<6;I++)if(S.mipmaps&&S.mipmaps.length>0)for(let q=0;q<S.mipmaps.length;q++)ee(F.__webglFramebuffer[I][q],b,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+I,q);else ee(F.__webglFramebuffer[I],b,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0);f(S)&&_(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(U){for(let I=0,q=M.length;I<q;I++){let z=M[I],H=n.get(z),ie=r.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,H.__webglTexture),k(ie,z),ee(F.__webglFramebuffer,b,z,r.COLOR_ATTACHMENT0+I,ie,0),f(z)&&_(ie)}t.unbindTexture()}else{let I=r.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(I=b.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(I,L.__webglTexture),k(I,S),S.mipmaps&&S.mipmaps.length>0)for(let q=0;q<S.mipmaps.length;q++)ee(F.__webglFramebuffer[q],b,S,r.COLOR_ATTACHMENT0,I,q);else ee(F.__webglFramebuffer,b,S,r.COLOR_ATTACHMENT0,I,0);f(S)&&_(I),t.unbindTexture()}b.depthBuffer&&ye(b)},this.updateRenderTargetMipmap=function(b){let S=b.textures;for(let F=0,L=S.length;F<L;F++){let M=S[F];if(f(M)){let A=v(b),U=n.get(M).__webglTexture;t.bindTexture(A,U),_(A),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(b){if(b.samples>0){if(ce(b)===!1){let S=b.textures,F=b.width,L=b.height,M=r.COLOR_BUFFER_BIT,A=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=n.get(b),I=S.length>1;if(I)for(let z=0;z<S.length;z++)t.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,U.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,U.__webglMultisampledFramebuffer);let q=b.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,U.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,U.__webglFramebuffer);for(let z=0;z<S.length;z++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(M|=r.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(M|=r.STENCIL_BUFFER_BIT)),I){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,U.__webglColorRenderbuffer[z]);let H=n.get(S[z]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,H,0)}r.blitFramebuffer(0,0,F,L,0,0,F,L,M,r.NEAREST),l===!0&&(Pe.length=0,oe.length=0,Pe.push(r.COLOR_ATTACHMENT0+z),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Pe.push(A),oe.push(A),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,oe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),I)for(let z=0;z<S.length;z++){t.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.RENDERBUFFER,U.__webglColorRenderbuffer[z]);let H=n.get(S[z]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,U.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+z,r.TEXTURE_2D,H,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,U.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){let S=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=ce}function Jg(r,e){return{convert:function(t,n=Ki){let i,s=Ze.getTransfer(n);if(t===Nn)return r.UNSIGNED_BYTE;if(t===Wo)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Xo)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Ec)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Ac)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Tc)return r.BYTE;if(t===wc)return r.SHORT;if(t===Wr)return r.UNSIGNED_SHORT;if(t===Vo)return r.INT;if(t===Zi)return r.UNSIGNED_INT;if(t===rn)return r.FLOAT;if(t===Xr)return r.HALF_FLOAT;if(t===ap)return r.ALPHA;if(t===op)return r.RGB;if(t===sn)return r.RGBA;if(t===ea)return r.DEPTH_COMPONENT;if(t===ta)return r.DEPTH_STENCIL;if(t===jo)return r.RED;if(t===qo)return r.RED_INTEGER;if(t===lp)return r.RG;if(t===Rc)return r.RG_INTEGER;if(t===Cc)return r.RGBA_INTEGER;if(t===Yo||t===Zo||t===Ko||t===Jo)if(s===it){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===Yo)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Zo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Ko)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Jo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===Yo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Zo)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Ko)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Jo)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Ic||t===Pc||t===Lc||t===Nc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Ic)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Pc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Lc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Nc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Dc||t===Uc||t===Oc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Dc||t===Uc)return s===it?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Oc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Fc||t===Bc||t===kc||t===zc||t===Gc||t===Hc||t===Vc||t===Wc||t===Xc||t===jc||t===qc||t===Yc||t===Zc||t===Kc){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Fc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Bc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===kc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===zc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Gc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Hc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Vc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Wc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Xc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===jc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===qc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Yc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Zc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Kc)return s===it?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Jc||t===$c||t===Qc){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Jc)return s===it?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===$c)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Qc)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===eh||t===th||t===nh||t===ih){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===eh)return i.COMPRESSED_RED_RGTC1_EXT;if(t===th)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===nh)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ih)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===jr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var wh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ns(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eh=class extends Jn{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,p=null,d=null,m=null,g=typeof XRWebGLBinding<"u",f=new wh,_={},v=t.getContextAttributes(),x=null,y=null,w=[],R=[],N=new ne,D=null,C=new xt;C.viewport=new $e;let B=new xt;B.viewport=new $e;let G=[C,B],O=new Po,Y=null,k=null;function X(oe){let he=R.indexOf(oe.inputSource);if(he===-1)return;let ce=w[he];ce!==void 0&&(ce.update(oe.inputSource,oe.frame,c||a),ce.dispatchEvent({type:oe.type,data:oe.inputSource}))}function K(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",ae);for(let oe=0;oe<w.length;oe++){let he=R[oe];he!==null&&(R[oe]=null,w[oe].disconnect(he))}Y=null,k=null,f.reset();for(let oe in _)delete _[oe];e.setRenderTarget(x),d=null,p=null,u=null,i=null,y=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}function ae(oe){for(let he=0;he<oe.removed.length;he++){let ce=oe.removed[he],Ce=R.indexOf(ce);Ce>=0&&(R[Ce]=null,w[Ce].disconnect(ce))}for(let he=0;he<oe.added.length;he++){let ce=oe.added[he],Ce=R.indexOf(ce);if(Ce===-1){for(let b=0;b<w.length;b++){if(b>=R.length){R.push(ce),Ce=b;break}if(R[b]===null){R[b]=ce,Ce=b;break}}if(Ce===-1)break}let Le=w[Ce];Le&&Le.connect(ce)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let he=w[oe];return he===void 0&&(he=new Ir,w[oe]=he),he.getTargetRaySpace()},this.getControllerGrip=function(oe){let he=w[oe];return he===void 0&&(he=new Ir,w[oe]=he),he.getGripSpace()},this.getHand=function(oe){let he=w[oe];return he===void 0&&(he=new Ir,w[oe]=he),he.getHandSpace()},this.setFramebufferScaleFactor=function(oe){s=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(oe){c=oe},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(oe){if(i=oe,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",K),i.addEventListener("inputsourceschange",ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(N),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,ce=null,Ce=null;v.depth&&(Ce=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=v.stencil?ta:ea,ce=v.stencil?jr:Zi);let Le={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};u=this.getBinding(),p=u.createProjectionLayer(Le),i.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),y=new bn(p.textureWidth,p.textureHeight,{format:sn,type:Nn,depthTexture:new Ls(p.textureWidth,p.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let he={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,he),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new bn(d.framebufferWidth,d.framebufferHeight,{format:sn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Pe.setContext(i),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let ee=new T,_e=new T;function be(oe,he){he===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(he.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(i===null)return;let he=oe.near,ce=oe.far;f.texture!==null&&(f.depthNear>0&&(he=f.depthNear),f.depthFar>0&&(ce=f.depthFar)),O.near=B.near=C.near=he,O.far=B.far=C.far=ce,Y===O.near&&k===O.far||(i.updateRenderState({depthNear:O.near,depthFar:O.far}),Y=O.near,k=O.far),O.layers.mask=6|oe.layers.mask,C.layers.mask=3&O.layers.mask,B.layers.mask=5&O.layers.mask;let Ce=oe.parent,Le=O.cameras;be(O,Ce);for(let b=0;b<Le.length;b++)be(Le[b],Ce);Le.length===2?(function(b,S,F){ee.setFromMatrixPosition(S.matrixWorld),_e.setFromMatrixPosition(F.matrixWorld);let L=ee.distanceTo(_e),M=S.projectionMatrix.elements,A=F.projectionMatrix.elements,U=M[14]/(M[10]-1),I=M[14]/(M[10]+1),q=(M[9]+1)/M[5],z=(M[9]-1)/M[5],H=(M[8]-1)/M[0],ie=(A[8]+1)/A[0],fe=U*H,re=U*ie,ve=L/(-H+ie),Se=ve*-H;if(S.matrixWorld.decompose(b.position,b.quaternion,b.scale),b.translateX(Se),b.translateZ(ve),b.matrixWorld.compose(b.position,b.quaternion,b.scale),b.matrixWorldInverse.copy(b.matrixWorld).invert(),M[10]===-1)b.projectionMatrix.copy(S.projectionMatrix),b.projectionMatrixInverse.copy(S.projectionMatrixInverse);else{let Re=U+ve,Ve=I+ve,W=fe-Se,le=re+(L-Se),$=q*I/Ve*Re,J=z*I/Ve*Re;b.projectionMatrix.makePerspective(W,le,$,J,Re,Ve),b.projectionMatrixInverse.copy(b.projectionMatrix).invert()}})(O,C,B):O.projectionMatrix.copy(C.projectionMatrix),(function(b,S,F){F===null?b.matrix.copy(S.matrixWorld):(b.matrix.copy(F.matrixWorld),b.matrix.invert(),b.matrix.multiply(S.matrixWorld)),b.matrix.decompose(b.position,b.quaternion,b.scale),b.updateMatrixWorld(!0),b.projectionMatrix.copy(S.projectionMatrix),b.projectionMatrixInverse.copy(S.projectionMatrixInverse),b.isPerspectiveCamera&&(b.fov=2*ki*Math.atan(1/b.projectionMatrix.elements[5]),b.zoom=1)})(oe,O,Ce)},this.getCamera=function(){return O},this.getFoveation=function(){if(p!==null||d!==null)return l},this.setFoveation=function(oe){l=oe,p!==null&&(p.fixedFoveation=oe),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=oe)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(O)},this.getCameraTexture=function(oe){return _[oe]};let ye=null,Pe=new Jp;Pe.setAnimationLoop(function(oe,he){if(h=he.getViewerPose(c||a),m=he,h!==null){let ce=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Ce=!1;ce.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let b=0;b<ce.length;b++){let S=ce[b],F=null;if(d!==null)F=d.getViewport(S);else{let M=u.getViewSubImage(p,S);F=M.viewport,b===0&&(e.setRenderTargetTextures(y,M.colorTexture,M.depthStencilTexture),e.setRenderTarget(y))}let L=G[b];L===void 0&&(L=new xt,L.layers.enable(b),L.viewport=new $e,G[b]=L),L.matrix.fromArray(S.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(S.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(F.x,F.y,F.width,F.height),b===0&&(O.matrix.copy(L.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(L)}let Le=i.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){u=n.getBinding();let b=u.getDepthInformation(ce[0]);b&&b.isValid&&b.texture&&f.init(b,i.renderState)}if(Le&&Le.includes("camera-access")&&g){e.state.unbindTexture(),u=n.getBinding();for(let b=0;b<ce.length;b++){let S=ce[b].camera;if(S){let F=_[S];F||(F=new Ns,_[S]=F);let L=u.getCameraImage(S);F.sourceTexture=L}}}}for(let ce=0;ce<w.length;ce++){let Ce=R[ce],Le=w[ce];Ce!==null&&Le!==void 0&&Le.update(Ce,he,c||a)}ye&&ye(oe,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),m=null}),this.setAnimationLoop=function(oe){ye=oe},this.dispose=function(){}}},Qi=new mn,$g=new Ie;function Qg(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===qt&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===qt&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(i.envMap.value=o,Qi.copy(l),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),i.envMapRotation.value.setFromMatrix4($g.makeRotationFromEuler(Qi)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,ch(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===qt&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(i,s,l)):s.isMeshMatcapMaterial?(n(i,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(c,h,u,p){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*p,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function e0(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,p,d,m){let g=u.value,f=p+"_"+d;if(m[f]===void 0)return m[f]=typeof g=="number"||typeof g=="boolean"?g:g.clone(),!0;{let _=m[f];if(typeof g=="number"||typeof g=="boolean"){if(_!==g)return m[f]=g,!0}else if(_.equals(g)===!1)return _.copy(g),!0}return!1}function c(u){let p={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(p.boundary=4,p.storage=4):u.isVector2?(p.boundary=8,p.storage=8):u.isVector3||u.isColor?(p.boundary=16,p.storage=12):u.isVector4?(p.boundary=16,p.storage=16):u.isMatrix3?(p.boundary=48,p.storage=48):u.isMatrix4?(p.boundary=64,p.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),p}function h(u){let p=u.target;p.removeEventListener("dispose",h);let d=a.indexOf(p.__bindingPointIndex);a.splice(d,1),r.deleteBuffer(i[p.id]),delete i[p.id],delete s[p.id]}return{bind:function(u,p){let d=p.program;n.uniformBlockBinding(u,d)},update:function(u,p){let d=i[u.id];d===void 0&&((function(f){let _=f.uniforms,v=0,x=16;for(let w=0,R=_.length;w<R;w++){let N=Array.isArray(_[w])?_[w]:[_[w]];for(let D=0,C=N.length;D<C;D++){let B=N[D],G=Array.isArray(B.value)?B.value:[B.value];for(let O=0,Y=G.length;O<Y;O++){let k=c(G[O]),X=v%x,K=X%k.boundary,ae=X+K;v+=K,ae!==0&&x-ae<k.storage&&(v+=x-ae),B.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=k.storage}}}let y=v%x;y>0&&(v+=x-y),f.__size=v,f.__cache={}})(u),d=(function(f){let _=(function(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=_;let v=r.createBuffer(),x=f.__size,y=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,x,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,v),v})(u),i[u.id]=d,u.addEventListener("dispose",h));let m=p.program;n.updateUBOMapping(u,m);let g=e.render.frame;s[u.id]!==g&&((function(f){let _=i[f.id],v=f.uniforms,x=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let y=0,w=v.length;y<w;y++){let R=Array.isArray(v[y])?v[y]:[v[y]];for(let N=0,D=R.length;N<D;N++){let C=R[N];if(l(C,y,N,x)===!0){let B=C.__offset,G=Array.isArray(C.value)?C.value:[C.value],O=0;for(let Y=0;Y<G.length;Y++){let k=G[Y],X=c(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,B+O,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):(k.toArray(C.__data,O),O+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=g)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var nl=class{constructor(e={}){let{canvas:t=xp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e,d;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let m=new Uint32Array(4),g=new Int32Array(4),f=null,_=null,v=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,w=!1;this._outputColorSpace=rt;let R=0,N=0,D=null,C=-1,B=null,G=new $e,O=new $e,Y=null,k=new Ae(0),X=0,K=t.width,ae=t.height,ee=1,_e=null,be=null,ye=new $e(0,0,K,ae),Pe=new $e(0,0,K,ae),oe=!1,he=new vi,ce=!1,Ce=!1,Le=new Ie,b=new T,S=new $e,F={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},L=!1;function M(){return D===null?ee:1}let A,U,I,q,z,H,ie,fe,re,ve,Se,Re,Ve,W,le,$,J,de,Ne,te,ue,me,Ue,Ke,P=n;function Je(E,V){return t.getContext(E,V)}try{let E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",on,!1),t.addEventListener("webglcontextcreationerror",Fn,!1),P===null){let V="webgl2";if(P=Je(V,E),P===null)throw Je(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}function ft(){A=new Om(P),A.init(),me=new Jg(P,A),U=new Pm(P,A,e,me),I=new Zg(P,A),U.reversedDepthBuffer&&p&&I.buffers.depth.setReversed(!0),q=new km(P),z=new kg,H=new Kg(P,A,I,z,U,me,q),ie=new Nm(y),fe=new Um(y),re=new Em(P),Ue=new Cm(P,re),ve=new Fm(P,re,q,Ue),Se=new Gm(P,ve,re,q),Ne=new zm(P,U,H),$=new Lm(z),Re=new Bg(y,ie,fe,A,U,Ue,$),Ve=new Qg(y,z),W=new Gg,le=new jg(A),de=new Rm(y,ie,fe,I,Se,d,l),J=new qg(y,Se,U),Ke=new e0(P,q,U,I),te=new Im(P,A,q),ue=new Bm(P,A,q),q.programs=Re.programs,y.capabilities=U,y.extensions=A,y.properties=z,y.renderLists=W,y.shadowMap=J,y.state=I,y.info=q}ft();let et=new Eh(y,P);function Et(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function on(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let E=q.autoReset,V=J.enabled,Z=J.autoUpdate,Q=J.needsUpdate,j=J.type;ft(),q.autoReset=E,J.enabled=V,J.autoUpdate=Z,J.needsUpdate=Q,J.type=j}function Fn(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Bn(E){let V=E.target;V.removeEventListener("dispose",Bn),(function(Z){(function(Q){let j=z.get(Q).programs;j!==void 0&&(j.forEach(function(se){Re.releaseProgram(se)}),Q.isShaderMaterial&&Re.releaseShaderCache(Q))})(Z),z.remove(Z)})(V)}function ir(E,V,Z){E.transparent===!0&&E.side===nn&&E.forceSinglePass===!1?(E.side=qt,E.needsUpdate=!0,ca(E,V,Z),E.side=Mi,E.needsUpdate=!0,ca(E,V,Z),E.side=nn):ca(E,V,Z)}this.xr=et,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=A.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=A.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(E){E!==void 0&&(ee=E,this.setSize(K,ae,!1))},this.getSize=function(E){return E.set(K,ae)},this.setSize=function(E,V,Z=!0){et.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(K=E,ae=V,t.width=Math.floor(E*ee),t.height=Math.floor(V*ee),Z===!0&&(t.style.width=E+"px",t.style.height=V+"px"),this.setViewport(0,0,E,V))},this.getDrawingBufferSize=function(E){return E.set(K*ee,ae*ee).floor()},this.setDrawingBufferSize=function(E,V,Z){K=E,ae=V,ee=Z,t.width=Math.floor(E*Z),t.height=Math.floor(V*Z),this.setViewport(0,0,E,V)},this.getCurrentViewport=function(E){return E.copy(G)},this.getViewport=function(E){return E.copy(ye)},this.setViewport=function(E,V,Z,Q){E.isVector4?ye.set(E.x,E.y,E.z,E.w):ye.set(E,V,Z,Q),I.viewport(G.copy(ye).multiplyScalar(ee).round())},this.getScissor=function(E){return E.copy(Pe)},this.setScissor=function(E,V,Z,Q){E.isVector4?Pe.set(E.x,E.y,E.z,E.w):Pe.set(E,V,Z,Q),I.scissor(O.copy(Pe).multiplyScalar(ee).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(E){I.setScissorTest(oe=E)},this.setOpaqueSort=function(E){_e=E},this.setTransparentSort=function(E){be=E},this.getClearColor=function(E){return E.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,Z=!0){let Q=0;if(E){let j=!1;if(D!==null){let se=D.texture.format;j=se===Cc||se===Rc||se===qo}if(j){let se=D.texture.type,ge=se===Nn||se===Zi||se===Wr||se===jr||se===Wo||se===Xo,Me=de.getClearColor(),Ee=de.getClearAlpha(),Oe=Me.r,Be=Me.g,Fe=Me.b;ge?(m[0]=Oe,m[1]=Be,m[2]=Fe,m[3]=Ee,P.clearBufferuiv(P.COLOR,0,m)):(g[0]=Oe,g[1]=Be,g[2]=Fe,g[3]=Ee,P.clearBufferiv(P.COLOR,0,g))}else Q|=P.COLOR_BUFFER_BIT}V&&(Q|=P.DEPTH_BUFFER_BIT),Z&&(Q|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",on,!1),t.removeEventListener("webglcontextcreationerror",Fn,!1),de.dispose(),W.dispose(),le.dispose(),z.dispose(),ie.dispose(),fe.dispose(),Se.dispose(),Ue.dispose(),Ke.dispose(),Re.dispose(),et.dispose(),et.removeEventListener("sessionstart",rr),et.removeEventListener("sessionend",cu),Ri.stop()},this.renderBufferDirect=function(E,V,Z,Q,j,se){V===null&&(V=F);let ge=j.isMesh&&j.matrixWorld.determinant()<0,Me=(function(qe,ht,At,Xe,ke){ht.isScene!==!0&&(ht=F),H.resetTextureUnits();let ln=ht.fog,dl=Xe.isMeshStandardMaterial?ht.environment:null,ha=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Rt,si=(Xe.isMeshStandardMaterial?fe:ie).get(Xe.envMap||dl),_n=Xe.vertexColors===!0&&!!At.attributes.color&&At.attributes.color.itemSize===4,sr=!!At.attributes.tangent&&(!!Xe.normalMap||Xe.anisotropy>0),kn=!!At.morphAttributes.position,pl=!!At.morphAttributes.normal,ar=!!At.morphAttributes.color,mu=ti;Xe.toneMapped&&(D!==null&&D.isXRRenderTarget!==!0||(mu=y.toneMapping));let gu=At.morphAttributes.position||At.morphAttributes.normal||At.morphAttributes.color,Ef=gu!==void 0?gu.length:0,Ye=z.get(Xe),Af=_.state.lights;if(ce===!0&&(Ce===!0||qe!==B)){let Zt=qe===B&&Xe.id===C;$.setState(Xe,qe,Zt)}let cn=!1;Xe.version===Ye.__version?Ye.needsLights&&Ye.lightsStateVersion!==Af.state.version||Ye.outputColorSpace!==ha||ke.isBatchedMesh&&Ye.batching===!1?cn=!0:ke.isBatchedMesh||Ye.batching!==!0?ke.isBatchedMesh&&Ye.batchingColor===!0&&ke.colorTexture===null||ke.isBatchedMesh&&Ye.batchingColor===!1&&ke.colorTexture!==null||ke.isInstancedMesh&&Ye.instancing===!1?cn=!0:ke.isInstancedMesh||Ye.instancing!==!0?ke.isSkinnedMesh&&Ye.skinning===!1?cn=!0:ke.isSkinnedMesh||Ye.skinning!==!0?ke.isInstancedMesh&&Ye.instancingColor===!0&&ke.instanceColor===null||ke.isInstancedMesh&&Ye.instancingColor===!1&&ke.instanceColor!==null||ke.isInstancedMesh&&Ye.instancingMorph===!0&&ke.morphTexture===null||ke.isInstancedMesh&&Ye.instancingMorph===!1&&ke.morphTexture!==null||Ye.envMap!==si||Xe.fog===!0&&Ye.fog!==ln?cn=!0:Ye.numClippingPlanes===void 0||Ye.numClippingPlanes===$.numPlanes&&Ye.numIntersection===$.numIntersection?(Ye.vertexAlphas!==_n||Ye.vertexTangents!==sr||Ye.morphTargets!==kn||Ye.morphNormals!==pl||Ye.morphColors!==ar||Ye.toneMapping!==mu||Ye.morphTargetsCount!==Ef)&&(cn=!0):cn=!0:cn=!0:cn=!0:cn=!0:(cn=!0,Ye.__version=Xe.version);let Ci=Ye.currentProgram;cn===!0&&(Ci=ca(Xe,ht,ke));let _u=!1,ns=!1,fl=!1,_t=Ci.getUniforms(),ai=Ye.uniforms;if(I.useProgram(Ci.program)&&(_u=!0,ns=!0,fl=!0),Xe.id!==C&&(C=Xe.id,ns=!0),_u||B!==qe){I.buffers.depth.getReversed()&&qe.reversedDepth!==!0&&(qe._reversedDepth=!0,qe.updateProjectionMatrix()),_t.setValue(P,"projectionMatrix",qe.projectionMatrix),_t.setValue(P,"viewMatrix",qe.matrixWorldInverse);let Zt=_t.map.cameraPosition;Zt!==void 0&&Zt.setValue(P,b.setFromMatrixPosition(qe.matrixWorld)),U.logarithmicDepthBuffer&&_t.setValue(P,"logDepthBufFC",2/(Math.log(qe.far+1)/Math.LN2)),(Xe.isMeshPhongMaterial||Xe.isMeshToonMaterial||Xe.isMeshLambertMaterial||Xe.isMeshBasicMaterial||Xe.isMeshStandardMaterial||Xe.isShaderMaterial)&&_t.setValue(P,"isOrthographic",qe.isOrthographicCamera===!0),B!==qe&&(B=qe,ns=!0,fl=!0)}if(ke.isSkinnedMesh){_t.setOptional(P,ke,"bindMatrix"),_t.setOptional(P,ke,"bindMatrixInverse");let Zt=ke.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),_t.setValue(P,"boneTexture",Zt.boneTexture,H))}ke.isBatchedMesh&&(_t.setOptional(P,ke,"batchingTexture"),_t.setValue(P,"batchingTexture",ke._matricesTexture,H),_t.setOptional(P,ke,"batchingIdTexture"),_t.setValue(P,"batchingIdTexture",ke._indirectTexture,H),_t.setOptional(P,ke,"batchingColorTexture"),ke._colorsTexture!==null&&_t.setValue(P,"batchingColorTexture",ke._colorsTexture,H));let ml=At.morphAttributes;ml.position===void 0&&ml.normal===void 0&&ml.color===void 0||Ne.update(ke,At,Ci),(ns||Ye.receiveShadow!==ke.receiveShadow)&&(Ye.receiveShadow=ke.receiveShadow,_t.setValue(P,"receiveShadow",ke.receiveShadow)),Xe.isMeshGouraudMaterial&&Xe.envMap!==null&&(ai.envMap.value=si,ai.flipEnvMap.value=si.isCubeTexture&&si.isRenderTargetTexture===!1?-1:1),Xe.isMeshStandardMaterial&&Xe.envMap===null&&ht.environment!==null&&(ai.envMapIntensity.value=ht.environmentIntensity),ns&&(_t.setValue(P,"toneMappingExposure",y.toneMappingExposure),Ye.needsLights&&(hn=fl,(vn=ai).ambientLightColor.needsUpdate=hn,vn.lightProbe.needsUpdate=hn,vn.directionalLights.needsUpdate=hn,vn.directionalLightShadows.needsUpdate=hn,vn.pointLights.needsUpdate=hn,vn.pointLightShadows.needsUpdate=hn,vn.spotLights.needsUpdate=hn,vn.spotLightShadows.needsUpdate=hn,vn.rectAreaLights.needsUpdate=hn,vn.hemisphereLights.needsUpdate=hn),ln&&Xe.fog===!0&&Ve.refreshFogUniforms(ai,ln),Ve.refreshMaterialUniforms(ai,Xe,ee,ae,_.state.transmissionRenderTarget[qe.id]),Zr.upload(P,pu(Ye),ai,H));var vn,hn;if(Xe.isShaderMaterial&&Xe.uniformsNeedUpdate===!0&&(Zr.upload(P,pu(Ye),ai,H),Xe.uniformsNeedUpdate=!1),Xe.isSpriteMaterial&&_t.setValue(P,"center",ke.center),_t.setValue(P,"modelViewMatrix",ke.modelViewMatrix),_t.setValue(P,"normalMatrix",ke.normalMatrix),_t.setValue(P,"modelMatrix",ke.matrixWorld),Xe.isShaderMaterial||Xe.isRawShaderMaterial){let Zt=Xe.uniformsGroups;for(let gl=0,Rf=Zt.length;gl<Rf;gl++){let vu=Zt[gl];Ke.update(vu,Ci),Ke.bind(vu,Ci)}}return Ci})(E,V,Z,Q,j);I.setMaterial(Q,ge);let Ee=Z.index,Oe=1;if(Q.wireframe===!0){if(Ee=ve.getWireframeAttribute(Z),Ee===void 0)return;Oe=2}let Be=Z.drawRange,Fe=Z.attributes.position,We=Be.start*Oe,at=(Be.start+Be.count)*Oe;se!==null&&(We=Math.max(We,se.start*Oe),at=Math.min(at,(se.start+se.count)*Oe)),Ee!==null?(We=Math.max(We,0),at=Math.min(at,Ee.count)):Fe!=null&&(We=Math.max(We,0),at=Math.min(at,Fe.count));let mt=at-We;if(mt<0||mt===1/0)return;let gt;Ue.setup(j,Q,Me,Z,Ee);let ot=te;if(Ee!==null&&(gt=re.get(Ee),ot=ue,ot.setIndex(gt)),j.isMesh)Q.wireframe===!0?(I.setLineWidth(Q.wireframeLinewidth*M()),ot.setMode(P.LINES)):ot.setMode(P.TRIANGLES);else if(j.isLine){let qe=Q.linewidth;qe===void 0&&(qe=1),I.setLineWidth(qe*M()),j.isLineSegments?ot.setMode(P.LINES):j.isLineLoop?ot.setMode(P.LINE_LOOP):ot.setMode(P.LINE_STRIP)}else j.isPoints?ot.setMode(P.POINTS):j.isSprite&&ot.setMode(P.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)Er("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(A.get("WEBGL_multi_draw"))ot.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let qe=j._multiDrawStarts,ht=j._multiDrawCounts,At=j._multiDrawCount,Xe=Ee?re.get(Ee).bytesPerElement:1,ke=z.get(Q).currentProgram.getUniforms();for(let ln=0;ln<At;ln++)ke.setValue(P,"_gl_DrawID",ln),ot.render(qe[ln]/Xe,ht[ln])}else if(j.isInstancedMesh)ot.renderInstances(We,mt,j.count);else if(Z.isInstancedBufferGeometry){let qe=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,ht=Math.min(Z.instanceCount,qe);ot.renderInstances(We,mt,ht)}else ot.render(We,mt)},this.compile=function(E,V,Z=null){Z===null&&(Z=E),_=le.get(Z),_.init(V),x.push(_),Z.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(_.pushLight(j),j.castShadow&&_.pushShadow(j))}),E!==Z&&E.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(_.pushLight(j),j.castShadow&&_.pushShadow(j))}),_.setupLights();let Q=new Set;return E.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let se=j.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){let Me=se[ge];ir(Me,Z,j),Q.add(Me)}else ir(se,Z,j),Q.add(se)}),_=x.pop(),Q},this.compileAsync=function(E,V,Z=null){let Q=this.compile(E,V,Z);return new Promise(j=>{function se(){Q.forEach(function(ge){z.get(ge).currentProgram.isReady()&&Q.delete(ge)}),Q.size!==0?setTimeout(se,10):j(E)}A.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let ri=null;function rr(){Ri.stop()}function cu(){Ri.start()}let Ri=new Jp;function ul(E,V,Z,Q){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)Z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLight)_.pushLight(E),E.castShadow&&_.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||he.intersectsSprite(E)){Q&&S.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Le);let se=Se.update(E),ge=E.material;ge.visible&&f.push(E,se,ge,Z,S.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||he.intersectsObject(E))){let se=Se.update(E),ge=E.material;if(Q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),S.copy(E.boundingSphere.center)):(se.boundingSphere===null&&se.computeBoundingSphere(),S.copy(se.boundingSphere.center)),S.applyMatrix4(E.matrixWorld).applyMatrix4(Le)),Array.isArray(ge)){let Me=se.groups;for(let Ee=0,Oe=Me.length;Ee<Oe;Ee++){let Be=Me[Ee],Fe=ge[Be.materialIndex];Fe&&Fe.visible&&f.push(E,se,Fe,Z,S.z,Be)}}else ge.visible&&f.push(E,se,ge,Z,S.z,null)}}let j=E.children;for(let se=0,ge=j.length;se<ge;se++)ul(j[se],V,Z,Q)}function hu(E,V,Z,Q){let j=E.opaque,se=E.transmissive,ge=E.transparent;_.setupLightsView(Z),ce===!0&&$.setGlobalState(y.clippingPlanes,Z),Q&&I.viewport(G.copy(Q)),j.length>0&&la(j,V,Z),se.length>0&&la(se,V,Z),ge.length>0&&la(ge,V,Z),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function uu(E,V,Z,Q){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[Q.id]===void 0&&(_.state.transmissionRenderTarget[Q.id]=new bn(1,1,{generateMipmaps:!0,type:A.has("EXT_color_buffer_half_float")||A.has("EXT_color_buffer_float")?Xr:Nn,minFilter:Ln,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let j=_.state.transmissionRenderTarget[Q.id],se=Q.viewport||G;j.setSize(se.z*y.transmissionResolutionScale,se.w*y.transmissionResolutionScale);let ge=y.getRenderTarget(),Me=y.getActiveCubeFace(),Ee=y.getActiveMipmapLevel();y.setRenderTarget(j),y.getClearColor(k),X=y.getClearAlpha(),X<1&&y.setClearColor(16777215,.5),y.clear(),L&&de.render(Z);let Oe=y.toneMapping;y.toneMapping=ti;let Be=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),_.setupLightsView(Q),ce===!0&&$.setGlobalState(y.clippingPlanes,Q),la(E,Z,Q),H.updateMultisampleRenderTarget(j),H.updateRenderTargetMipmap(j),A.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let We=0,at=V.length;We<at;We++){let mt=V[We],gt=mt.object,ot=mt.geometry,qe=mt.material,ht=mt.group;if(qe.side===nn&&gt.layers.test(Q.layers)){let At=qe.side;qe.side=qt,qe.needsUpdate=!0,du(gt,Z,Q,ot,qe,ht),qe.side=At,qe.needsUpdate=!0,Fe=!0}}Fe===!0&&(H.updateMultisampleRenderTarget(j),H.updateRenderTargetMipmap(j))}y.setRenderTarget(ge,Me,Ee),y.setClearColor(k,X),Be!==void 0&&(Q.viewport=Be),y.toneMapping=Oe}function la(E,V,Z){let Q=V.isScene===!0?V.overrideMaterial:null;for(let j=0,se=E.length;j<se;j++){let ge=E[j],Me=ge.object,Ee=ge.geometry,Oe=ge.group,Be=ge.material;Be.allowOverride===!0&&Q!==null&&(Be=Q),Me.layers.test(Z.layers)&&du(Me,V,Z,Ee,Be,Oe)}}function du(E,V,Z,Q,j,se){E.onBeforeRender(y,V,Z,Q,j,se),E.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),j.onBeforeRender(y,V,Z,Q,E,se),j.transparent===!0&&j.side===nn&&j.forceSinglePass===!1?(j.side=qt,j.needsUpdate=!0,y.renderBufferDirect(Z,V,Q,j,E,se),j.side=Mi,j.needsUpdate=!0,y.renderBufferDirect(Z,V,Q,j,E,se),j.side=nn):y.renderBufferDirect(Z,V,Q,j,E,se),E.onAfterRender(y,V,Z,Q,j,se)}function ca(E,V,Z){V.isScene!==!0&&(V=F);let Q=z.get(E),j=_.state.lights,se=_.state.shadowsArray,ge=j.state.version,Me=Re.getParameters(E,j.state,se,V,Z),Ee=Re.getProgramCacheKey(Me),Oe=Q.programs;Q.environment=E.isMeshStandardMaterial?V.environment:null,Q.fog=V.fog,Q.envMap=(E.isMeshStandardMaterial?fe:ie).get(E.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",Bn),Oe=new Map,Q.programs=Oe);let Be=Oe.get(Ee);if(Be!==void 0){if(Q.currentProgram===Be&&Q.lightsStateVersion===ge)return fu(E,Me),Be}else Me.uniforms=Re.getUniforms(E),E.onBeforeCompile(Me,y),Be=Re.acquireProgram(Me,Ee),Oe.set(Ee,Be),Q.uniforms=Me.uniforms;let Fe=Q.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(Fe.clippingPlanes=$.uniform),fu(E,Me),Q.needsLights=(function(We){return We.isMeshLambertMaterial||We.isMeshToonMaterial||We.isMeshPhongMaterial||We.isMeshStandardMaterial||We.isShadowMaterial||We.isShaderMaterial&&We.lights===!0})(E),Q.lightsStateVersion=ge,Q.needsLights&&(Fe.ambientLightColor.value=j.state.ambient,Fe.lightProbe.value=j.state.probe,Fe.directionalLights.value=j.state.directional,Fe.directionalLightShadows.value=j.state.directionalShadow,Fe.spotLights.value=j.state.spot,Fe.spotLightShadows.value=j.state.spotShadow,Fe.rectAreaLights.value=j.state.rectArea,Fe.ltc_1.value=j.state.rectAreaLTC1,Fe.ltc_2.value=j.state.rectAreaLTC2,Fe.pointLights.value=j.state.point,Fe.pointLightShadows.value=j.state.pointShadow,Fe.hemisphereLights.value=j.state.hemi,Fe.directionalShadowMap.value=j.state.directionalShadowMap,Fe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Fe.spotShadowMap.value=j.state.spotShadowMap,Fe.spotLightMatrix.value=j.state.spotLightMatrix,Fe.spotLightMap.value=j.state.spotLightMap,Fe.pointShadowMap.value=j.state.pointShadowMap,Fe.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.currentProgram=Be,Q.uniformsList=null,Be}function pu(E){if(E.uniformsList===null){let V=E.currentProgram.getUniforms();E.uniformsList=Zr.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function fu(E,V){let Z=z.get(E);Z.outputColorSpace=V.outputColorSpace,Z.batching=V.batching,Z.batchingColor=V.batchingColor,Z.instancing=V.instancing,Z.instancingColor=V.instancingColor,Z.instancingMorph=V.instancingMorph,Z.skinning=V.skinning,Z.morphTargets=V.morphTargets,Z.morphNormals=V.morphNormals,Z.morphColors=V.morphColors,Z.morphTargetsCount=V.morphTargetsCount,Z.numClippingPlanes=V.numClippingPlanes,Z.numIntersection=V.numClipIntersection,Z.vertexAlphas=V.vertexAlphas,Z.vertexTangents=V.vertexTangents,Z.toneMapping=V.toneMapping}Ri.setAnimationLoop(function(E){ri&&ri(E)}),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(E){ri=E,et.setAnimationLoop(E),E===null?Ri.stop():Ri.start()},et.addEventListener("sessionstart",rr),et.addEventListener("sessionend",cu),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(V),V=et.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,V,D),_=le.get(E,x.length),_.init(V),x.push(_),Le.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),he.setFromProjectionMatrix(Le,Kn,V.reversedDepth),Ce=this.localClippingEnabled,ce=$.init(this.clippingPlanes,Ce),f=W.get(E,v.length),f.init(),v.push(f),et.enabled===!0&&et.isPresenting===!0){let se=y.xr.getDepthSensingMesh();se!==null&&ul(se,V,-1/0,y.sortObjects)}ul(E,V,0,y.sortObjects),f.finish(),y.sortObjects===!0&&f.sort(_e,be),L=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,L&&de.addToRenderList(f,E),this.info.render.frame++,ce===!0&&$.beginShadows();let Z=_.state.shadowsArray;J.render(Z,E,V),ce===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=f.opaque,j=f.transmissive;if(_.setupLights(),V.isArrayCamera){let se=V.cameras;if(j.length>0)for(let ge=0,Me=se.length;ge<Me;ge++)uu(Q,j,E,se[ge]);L&&de.render(E);for(let ge=0,Me=se.length;ge<Me;ge++){let Ee=se[ge];hu(f,E,Ee,Ee.viewport)}}else j.length>0&&uu(Q,j,E,V),L&&de.render(E),hu(f,E,V);D!==null&&N===0&&(H.updateMultisampleRenderTarget(D),H.updateRenderTargetMipmap(D)),E.isScene===!0&&E.onAfterRender(y,E,V),Ue.resetDefaultState(),C=-1,B=null,x.pop(),x.length>0?(_=x[x.length-1],ce===!0&&$.setGlobalState(y.clippingPlanes,_.state.camera)):_=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(E,V,Z){let Q=z.get(E);Q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),z.get(E.texture).__webglTexture=V,z.get(E.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:Z,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){let Z=z.get(E);Z.__webglFramebuffer=V,Z.__useDefaultFramebuffer=V===void 0};let bf=P.createFramebuffer();this.setRenderTarget=function(E,V=0,Z=0){D=E,R=V,N=Z;let Q=!0,j=null,se=!1,ge=!1;if(E){let Me=z.get(E);if(Me.__useDefaultFramebuffer!==void 0)I.bindFramebuffer(P.FRAMEBUFFER,null),Q=!1;else if(Me.__webglFramebuffer===void 0)H.setupRenderTarget(E);else if(Me.__hasExternalTextures)H.rebindTextures(E,z.get(E.texture).__webglTexture,z.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Be=E.depthTexture;if(Me.__boundDepthTexture!==Be){if(Be!==null&&z.has(Be)&&(E.width!==Be.image.width||E.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(E)}}let Ee=E.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ge=!0);let Oe=z.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(j=Array.isArray(Oe[V])?Oe[V][Z]:Oe[V],se=!0):j=E.samples>0&&H.useMultisampledRTT(E)===!1?z.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?Oe[Z]:Oe,G.copy(E.viewport),O.copy(E.scissor),Y=E.scissorTest}else G.copy(ye).multiplyScalar(ee).floor(),O.copy(Pe).multiplyScalar(ee).floor(),Y=oe;if(Z!==0&&(j=bf),I.bindFramebuffer(P.FRAMEBUFFER,j)&&Q&&I.drawBuffers(E,j),I.viewport(G),I.scissor(O),I.setScissorTest(Y),se){let Me=z.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+V,Me.__webglTexture,Z)}else if(ge){let Me=V;for(let Ee=0;Ee<E.textures.length;Ee++){let Oe=z.get(E.textures[Ee]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ee,Oe.__webglTexture,Z,Me)}}else if(E!==null&&Z!==0){let Me=z.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Me.__webglTexture,Z)}C=-1},this.readRenderTargetPixels=function(E,V,Z,Q,j,se,ge,Me=0){if(!E||!E.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){I.bindFramebuffer(P.FRAMEBUFFER,Ee);try{let Oe=E.textures[Me],Be=Oe.format,Fe=Oe.type;if(!U.textureFormatReadable(Be))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(Fe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");V>=0&&V<=E.width-Q&&Z>=0&&Z<=E.height-j&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Me),P.readPixels(V,Z,Q,j,me.convert(Be),me.convert(Fe),se))}finally{let Oe=D!==null?z.get(D).__webglFramebuffer:null;I.bindFramebuffer(P.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,V,Z,Q,j,se,ge,Me=0){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){if(V>=0&&V<=E.width-Q&&Z>=0&&Z<=E.height-j){I.bindFramebuffer(P.FRAMEBUFFER,Ee);let Oe=E.textures[Me],Be=Oe.format,Fe=Oe.type;if(!U.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.bufferData(P.PIXEL_PACK_BUFFER,se.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Me),P.readPixels(V,Z,Q,j,me.convert(Be),me.convert(Fe),0);let at=D!==null?z.get(D).__webglFramebuffer:null;I.bindFramebuffer(P.FRAMEBUFFER,at);let mt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await yp(P,mt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,se),P.deleteBuffer(We),P.deleteSync(mt),se}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,V=null,Z=0){let Q=Math.pow(2,-Z),j=Math.floor(E.image.width*Q),se=Math.floor(E.image.height*Q),ge=V!==null?V.x:0,Me=V!==null?V.y:0;H.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,Z,0,0,ge,Me,j,se),I.unbindTexture()};let Tf=P.createFramebuffer(),wf=P.createFramebuffer();this.copyTextureToTexture=function(E,V,Z=null,Q=null,j=0,se=null){let ge,Me,Ee,Oe,Be,Fe,We,at,mt;se===null&&(j!==0?(Er("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=j,j=0):se=0);let gt=E.isCompressedTexture?E.mipmaps[se]:E.image;if(Z!==null)ge=Z.max.x-Z.min.x,Me=Z.max.y-Z.min.y,Ee=Z.isBox3?Z.max.z-Z.min.z:1,Oe=Z.min.x,Be=Z.min.y,Fe=Z.isBox3?Z.min.z:0;else{let _n=Math.pow(2,-j);ge=Math.floor(gt.width*_n),Me=Math.floor(gt.height*_n),Ee=E.isDataArrayTexture?gt.depth:E.isData3DTexture?Math.floor(gt.depth*_n):1,Oe=0,Be=0,Fe=0}Q!==null?(We=Q.x,at=Q.y,mt=Q.z):(We=0,at=0,mt=0);let ot=me.convert(V.format),qe=me.convert(V.type),ht;V.isData3DTexture?(H.setTexture3D(V,0),ht=P.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(H.setTexture2DArray(V,0),ht=P.TEXTURE_2D_ARRAY):(H.setTexture2D(V,0),ht=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);let At=P.getParameter(P.UNPACK_ROW_LENGTH),Xe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ke=P.getParameter(P.UNPACK_SKIP_PIXELS),ln=P.getParameter(P.UNPACK_SKIP_ROWS),dl=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,gt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,gt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Oe),P.pixelStorei(P.UNPACK_SKIP_ROWS,Be),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Fe);let ha=E.isDataArrayTexture||E.isData3DTexture,si=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){let _n=z.get(E),sr=z.get(V),kn=z.get(_n.__renderTarget),pl=z.get(sr.__renderTarget);I.bindFramebuffer(P.READ_FRAMEBUFFER,kn.__webglFramebuffer),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,pl.__webglFramebuffer);for(let ar=0;ar<Ee;ar++)ha&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,z.get(E).__webglTexture,j,Fe+ar),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,z.get(V).__webglTexture,se,mt+ar)),P.blitFramebuffer(Oe,Be,ge,Me,We,at,ge,Me,P.DEPTH_BUFFER_BIT,P.NEAREST);I.bindFramebuffer(P.READ_FRAMEBUFFER,null),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(j!==0||E.isRenderTargetTexture||z.has(E)){let _n=z.get(E),sr=z.get(V);I.bindFramebuffer(P.READ_FRAMEBUFFER,Tf),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,wf);for(let kn=0;kn<Ee;kn++)ha?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_n.__webglTexture,j,Fe+kn):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,_n.__webglTexture,j),si?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,sr.__webglTexture,se,mt+kn):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,sr.__webglTexture,se),j!==0?P.blitFramebuffer(Oe,Be,ge,Me,We,at,ge,Me,P.COLOR_BUFFER_BIT,P.NEAREST):si?P.copyTexSubImage3D(ht,se,We,at,mt+kn,Oe,Be,ge,Me):P.copyTexSubImage2D(ht,se,We,at,Oe,Be,ge,Me);I.bindFramebuffer(P.READ_FRAMEBUFFER,null),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else si?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(ht,se,We,at,mt,ge,Me,Ee,ot,qe,gt.data):V.isCompressedArrayTexture?P.compressedTexSubImage3D(ht,se,We,at,mt,ge,Me,Ee,ot,gt.data):P.texSubImage3D(ht,se,We,at,mt,ge,Me,Ee,ot,qe,gt):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,se,We,at,ge,Me,ot,qe,gt.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,se,We,at,gt.width,gt.height,ot,gt.data):P.texSubImage2D(P.TEXTURE_2D,se,We,at,ge,Me,ot,qe,gt);P.pixelStorei(P.UNPACK_ROW_LENGTH,At),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Xe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ke),P.pixelStorei(P.UNPACK_SKIP_ROWS,ln),P.pixelStorei(P.UNPACK_SKIP_IMAGES,dl),se===0&&V.generateMipmaps&&P.generateMipmap(ht),I.unbindTexture()},this.initRenderTarget=function(E){z.get(E).__webglFramebuffer===void 0&&H.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?H.setTextureCube(E,0):E.isData3DTexture?H.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?H.setTexture2DArray(E,0):H.setTexture2D(E,0),I.unbindTexture()},this.resetState=function(){R=0,N=0,D=null,I.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};function Rh(r,e){if(e===rh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===qr||e===na){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===qr)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var rl=class extends In{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Uh(t)}),this.register(function(t){return new Oh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Bh(t)}),this.register(function(t){return new kh(t)}),this.register(function(t){return new zh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Dh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new Fh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Lh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Zh(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=ei.extractUrlBase(e);a=ei.resolveURL(c,this.path)}else a=ei.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new zr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===lf){try{a[je.KHR_BINARY_GLTF]=new Kh(e)}catch(u){i&&i(u);return}s=JSON.parse(a[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new iu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],p=s.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:a[u]=new Nh;break;case je.KHR_DRACO_MESH_COMPRESSION:a[u]=new Jh(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:a[u]=new $h;break;case je.KHR_MESH_QUANTIZATION:a[u]=new Qh;break;default:p.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function t0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Lh=class{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new Ae(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Rt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ji(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Wi(h),c.distance=u;break;case"spot":c=new Ys(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Un(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Nh=class{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return Ft}extendParams(e,t,n){let i=[];e.color=new Ae(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Rt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,rt))}return Promise.all(i)}},Dh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Uh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(o,o)}return Promise.all(s)}},Oh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Fh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},Bh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Rt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,rt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},kh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},zh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(o[0],o[1],o[2],Rt),Promise.all(s)}},Gh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Hh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(o[0],o[1],o[2],Rt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,rt)),Promise.all(s)}},Vh=class{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Xh=class{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},jh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},qh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},Yh=class{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,p=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,p,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,p,i.mode,i.filter),d})})}else return null}},Zh=class{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==an.TRIANGLES&&c.mode!==an.TRIANGLE_STRIP&&c.mode!==an.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],p=c[0].count,d=[];for(let m of u){let g=new Ie,f=new T,_=new zt,v=new T(1,1,1),x=new Rs(m.geometry,m.material,p);for(let y=0;y<p;y++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&_.fromBufferAttribute(l.ROTATION,y),l.SCALE&&v.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,g.compose(f,_,v));for(let y in l)if(y==="_COLOR_0"){let w=l[y];x.instanceColor=new _i(w.array,w.itemSize,w.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);lt.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),d.push(x)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},lf="glTF",sa=12,rf={JSON:1313821514,BIN:5130562},Kh=class{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,sa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==lf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-sa,s=new DataView(e,sa),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===rf.JSON){let c=new Uint8Array(e,sa+a,o);this.content=n.decode(c)}else if(l===rf.BIN){let c=sa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Jh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=tu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=tu[h]||h.toLowerCase();if(a[h]!==void 0){let p=n.accessors[e.attributes[h]],d=Jr[p.componentType];c[u]=d.name,l[u]=p.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,p){i.decodeDracoFile(h,function(d){for(let m in d.attributes){let g=d.attributes[m],f=l[m];f!==void 0&&(g.normalized=f)}u(d)},o,c,Rt,p)})})}},$h=class{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Qh=class{constructor(){this.name=je.KHR_MESH_QUANTIZATION}},sl=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,p=u*u,d=p*u,m=e*c,g=m-c,f=-2*d+3*p,_=d-p,v=1-f,x=_-p+u;for(let y=0;y!==o;y++){let w=a[g+y+o],R=a[g+y+l]*h,N=a[m+y+o],D=a[m+y]*h;s[y]=v*w+x*R+f*N+_*D}return s}},n0=new zt,eu=class extends sl{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return n0.fromArray(s).normalize().toArray(s),s}},an={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Jr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sf={9728:Xt,9729:kt,9984:Ho,9985:Vr,9986:Yi,9987:Ln},af={33071:mi,33648:Tr,10497:Qt},Ch={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},tu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ti={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},i0={CUBICSPLINE:void 0,LINEAR:Bi,STEP:Fi},Ih={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function r0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new dt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Mi})),r.DefaultMaterial}function tr(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Un(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function s0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let p=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(p)}if(i){let p=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(p)}if(s){let p=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(p)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],p=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=p),r.morphTargetsRelative=!0,r})}function a0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function o0(r){let e,t=r.extensions&&r.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ph(t.attributes):e=r.indices+":"+Ph(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ph(r.targets[n]);return e}function Ph(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function nu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function l0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var c0=new Ie,iu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new t0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Hi(this.options.manager):this.textureLoader=new Zs(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return tr(s,o,i),Un(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(ei.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Ch[i.type],o=Jr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new yt(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Ch[i.type],c=Jr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,p=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,g,f;if(d&&d!==u){let _=Math.floor(p/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+_+":"+i.count,x=t.cache.get(v);x||(g=new c(o,_*d,i.count*d/h),x=new Pr(g,d/h),t.cache.add(v,x)),f=new Lr(x,l,p%d/h,m)}else o===null?g=new c(i.count*l):g=new c(o,p,i.count*l),f=new yt(g,l,m);if(i.sparse!==void 0){let _=Ch.SCALAR,v=Jr[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,w=new v(a[1],x,i.sparse.count*_),R=new c(a[2],y,i.sparse.count*l);o!==null&&(f=new yt(f.array.slice(),f.itemSize,f.normalized)),f.normalized=!1;for(let N=0,D=w.length;N<D;N++){let C=w[N];if(f.setX(C,R[N*l]),l>=2&&f.setY(C,R[N*l+1]),l>=3&&f.setZ(C,R[N*l+2]),l>=4&&f.setW(C,R[N*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}f.normalized=m}return f})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let p=(s.samplers||{})[a.sampler]||{};return h.magFilter=sf[p.magFilter]||kt,h.minFilter=sf[p.minFilter]||Ln,h.wrapS=af[p.wrapS]||Qt,h.wrapT=af[p.wrapT]||Qt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Xt&&h.minFilter!==kt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let p=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(p),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(p,d){let m=p;t.isImageBitmapLoader===!0&&(m=function(g){let f=new Mt(g);f.needsUpdate=!0,p(f)}),t.load(ei.resolveURL(u,s.path),m,void 0,d)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Un(u,a),u.userData.mimeType=a.mimeType||l0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Dr,Gt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new $n,Gt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return dt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){let u=i[je.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new Ae(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let p=u.baseColorFactor;o.color.setRGB(p[0],p[1],p[2],Rt),o.opacity=p[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,rt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(p){return p.getMaterialType&&p.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(p){return p.extendMaterialParams&&p.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=nn);let h=s.alphaMode||Ih.OPAQUE;if(h===Ih.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Ih.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Ft&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ne(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==Ft&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Ft){let u=s.emissiveFactor;o.emissive=new Ae().setRGB(u[0],u[1],u[2],Rt)}return s.emissiveTexture!==void 0&&a!==Ft&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,rt)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),Un(u,s),t.associations.set(u,{materials:e}),s.extensions&&tr(i,u,s),u})}createUniqueName(e){let t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return of(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=o0(c),u=i[h];if(u)a.push(u.promise);else{let p;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?p=s(c):p=of(new tt,c,t),i[h]={primitive:c,promise:p},a.push(p)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?r0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let g=h[d],f=a[d],_,v=c[d];if(f.mode===an.TRIANGLES||f.mode===an.TRIANGLE_STRIP||f.mode===an.TRIANGLE_FAN||f.mode===void 0)_=s.isSkinnedMesh===!0?new ws(g,v):new ct(g,v),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),f.mode===an.TRIANGLE_STRIP?_.geometry=Rh(_.geometry,na):f.mode===an.TRIANGLE_FAN&&(_.geometry=Rh(_.geometry,qr));else if(f.mode===an.LINES)_=new Cs(g,v);else if(f.mode===an.LINE_STRIP)_=new wn(g,v);else if(f.mode===an.LINE_LOOP)_=new Is(g,v);else if(f.mode===an.POINTS)_=new Ps(g,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(_.geometry.morphAttributes).length>0&&a0(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),Un(_,s),f.extensions&&tr(i,_,f),t.assignFinalMaterial(_),u.push(_)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return s.extensions&&tr(i,u[0],s),u[0];let p=new Ut;s.extensions&&tr(i,p,s),t.associations.set(p,{meshes:e});for(let d=0,m=u.length;d<m;d++)p.add(u[d]);return p})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new xt(oh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Xi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Un(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let p=new Ie;s!==null&&p.fromArray(s.array,c*16),l.push(p)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new As(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,p=i.channels.length;u<p;u++){let d=i.channels[u],m=i.samplers[d.sampler],g=d.target,f=g.node,_=i.parameters!==void 0?i.parameters[m.input]:m.input,v=i.parameters!==void 0?i.parameters[m.output]:m.output;g.node!==void 0&&(a.push(this.getDependency("node",f)),o.push(this.getDependency("accessor",_)),l.push(this.getDependency("accessor",v)),c.push(m),h.push(g))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let p=u[0],d=u[1],m=u[2],g=u[3],f=u[4],_=[];for(let x=0,y=p.length;x<y;x++){let w=p[x],R=d[x],N=m[x],D=g[x],C=f[x];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let B=n._createAnimationTracks(w,R,N,D,C);if(B)for(let G=0;G<B.length;G++)_.push(B[G])}let v=new Xs(s,void 0,_);return Un(v,i),v})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],p=c[2];p!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(p,c0)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Nr:c.length>1?h=new Ut:c.length===1?h=c[0]:h=new lt,h!==c[0])for(let u=0,p=c.length;u<p;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Un(h,s),s.extensions&&tr(n,h,s),s.matrix!==void 0){let u=new Ie;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Ut;n.name&&(s.name=i.createUniqueName(n.name)),Un(s,n),n.extensions&&tr(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[p,d]of i.associations)(p instanceof Gt||p instanceof Mt)&&u.set(p,d);return h.traverse(p=>{let d=i.associations.get(p);d!=null&&u.set(p,d)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];Ti[s.path]===Ti.weights?e.traverse(function(p){p.morphTargetInfluences&&l.push(p.name?p.name:p.uuid)}):l.push(o);let c;switch(Ti[s.path]){case Ti.weights:c=An;break;case Ti.rotation:c=Rn;break;case Ti.translation:case Ti.scale:c=Cn;break;default:n.itemSize===1?c=An:c=Cn;break}let h=i.interpolation!==void 0?i0[i.interpolation]:Bi,u=this._getArrayFromAccessor(n);for(let p=0,d=l.length;p<d;p++){let m=new c(l[p]+"."+Ti[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=nu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Rn?eu:sl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function h0(r,e,t){let n=e.attributes,i=new Ct;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new T(l[0],l[1],l[2]),new T(c[0],c[1],c[2])),o.normalized){let h=nu(Jr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new T,l=new T;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let p=t.json.accessors[u.POSITION],d=p.min,m=p.max;if(d!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),p.normalized){let g=nu(Jr[p.componentType]);l.multiplyScalar(g)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new Ot;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function of(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=tu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Ze.workingColorSpace!==Rt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),Un(r,e),h0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?s0(r,e.targets,t):r})}function cf(r){let e=91,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296);function n(l){let c=document.createElement("canvas");c.width=c.height=512;let h=c.getContext("2d"),u={stone:"#795437",wood:"#35271f",felt:"#144333",leather:"#8d201b",rug:"#782e25",roof:"#263532",plaster:"#303235",cabinet:"#202225",deck:"#846449"};h.fillStyle=u[l],h.fillRect(0,0,512,512);for(let d=0;d<14e3;d++){let m=t()*512,g=t()*512;h.fillStyle=t()>.5?"#ffffff0a":"#00000010",h.fillRect(m,g,l==="wood"||l==="deck"?40:2,1)}if(l==="stone"){for(let d=0;d<28;d++){let m=t()*512,g=t()*512;h.beginPath(),h.moveTo(m,g);for(let f=0;f<18;f++)m+=12+t()*14,g+=Math.sin(f*.7+d)*8+(t()-.5)*20,h.lineTo(m,g);h.strokeStyle=d%4?"#d7ad7830":"#f0ce9750",h.lineWidth=d%4?.65:1.5,h.stroke()}h.strokeStyle="#141518",h.lineWidth=5,h.strokeRect(0,0,512,512),h.strokeStyle="#d4a04e",h.lineWidth=1.8,h.strokeRect(2,2,508,508)}if(l==="wood"||l==="deck")for(let d=0;d<512;d+=64){h.fillStyle="#00000026",h.fillRect(0,d,512,2);for(let m=d%128?128:0;m<512;m+=256)h.fillRect(m,d,1,64),h.fillStyle="#c5916330",h.fillRect(m+3,d+3,250,1),h.fillStyle="#00000026"}if(l==="rug"){h.fillStyle="#7d2225",h.fillRect(0,0,512,512);for(let d=0;d<12e3;d++)h.fillStyle=d%2?"#e4b48718":"#0000000d",h.fillRect(t()*512,t()*512,1,2);for(let[d,m,g]of[[12,3,"#3c2626"],[21,1,"#b07058"],[35,2,"#242322"],[45,1,"#b07058"]])h.strokeStyle=g,h.lineWidth=m,h.strokeRect(d,d,512-d*2,512-d*2);h.strokeStyle="#a8946155",h.lineWidth=1;for(let d=65;d<460;d+=32)for(let m=65;m<460;m+=32)h.beginPath(),h.moveTo(m-5,d),h.quadraticCurveTo(m,d-9,m+5,d),h.quadraticCurveTo(m,d+9,m-5,d),h.stroke();h.save(),h.translate(256,256);for(let d=0;d<16;d++)h.rotate(Math.PI/8),h.strokeStyle="#b6a16c",h.beginPath(),h.moveTo(0,0),h.bezierCurveTo(25,-26,65,-23,88,0),h.bezierCurveTo(65,23,25,26,0,0),h.stroke();for(let d of[28,94,104])h.beginPath(),h.arc(0,0,d,0,Math.PI*2),h.stroke();h.fillStyle="#c2ac78",h.font="44px Georgia",h.textAlign="center",h.fillText("\u2660",0,16),h.restore()}if(l==="plaster")for(let d=-64;d<600;d+=128)for(let m=-64;m<600;m+=128)h.beginPath(),h.moveTo(m,d-64),h.bezierCurveTo(m+9,d-31,m+47,d-28,m+64,d),h.bezierCurveTo(m+47,d+28,m+9,d+31,m,d+64),h.bezierCurveTo(m-9,d+31,m-47,d+28,m-64,d),h.bezierCurveTo(m-47,d-28,m-9,d-31,m,d-64),h.strokeStyle="#a599784e",h.lineWidth=2.2,h.stroke(),h.fillStyle="#b39157",h.beginPath(),h.arc(m,d-64,2,0,Math.PI*2),h.fill(),h.strokeStyle="#10131880",h.lineWidth=1,h.strokeRect(m-6,d-6,12,12);if(l==="cabinet"){h.fillStyle="#ffffff06";for(let d=0;d<512;d+=4)h.fillRect(0,d,512,1);h.strokeStyle="#0b0e10",h.lineWidth=12,h.strokeRect(18,18,476,476),h.strokeStyle="#947547",h.lineWidth=2,h.strokeRect(27,27,458,458),h.strokeStyle="#4b4b45",h.lineWidth=1,h.strokeRect(32,32,448,448)}if(l==="roof"){h.strokeStyle="#83908644";for(let d=0;d<512;d+=32){h.fillStyle="#00000040",h.fillRect(0,d,512,3);for(let m=d%64?32:0;m<512;m+=64)h.strokeRect(m,d,64,32)}}if(l==="leather")for(let d=0;d<512;d+=128)for(let m=0;m<512;m+=128)h.beginPath(),h.moveTo(m,d),h.lineTo(m+64,d+64),h.lineTo(m+128,d),h.strokeStyle="#31171055",h.lineWidth=4,h.stroke(),h.fillStyle="#d38d5866",h.beginPath(),h.arc(m+64,d+64,5,0,Math.PI*2),h.fill();let p=new en(c);return p.colorSpace=rt,p.wrapS=p.wrapT=Qt,p.anisotropy=4,r.push(p),p}let i={};for(let l of["stone","wood","felt","leather","rug","roof","plaster","cabinet","deck"]){let c=n(l);i[l]=new(l==="stone"?pt:dt)({map:c,bumpMap:c,bumpScale:{stone:.004,wood:.012,leather:.025,rug:.018,plaster:.012}[l]||.01,roughness:{stone:.18,wood:.4,leather:.38,roof:.8}[l]||.86,metalness:l==="stone"?.3:0})}let s=document.createElement("canvas");s.width=512,s.height=256;let a=s.getContext("2d");a.fillStyle="#29241d",a.fillRect(0,0,512,256);for(let l of[40,168,296,424]){let c=a.createRadialGradient(l,86,2,l,86,43);c.addColorStop(0,"#ffe4a8"),c.addColorStop(.2,"#d59345"),c.addColorStop(1,"#29241d"),a.fillStyle=c,a.fillRect(l-43,43,86,86),a.fillStyle="#ffe5b3",a.fillRect(l-3,60,6,43)}let o=new en(s);return o.colorSpace=rt,o.mapping=bi,r.push(o),i.stone.envMap=o,i.stone.clearcoat=.85,i.stone.clearcoatRoughness=.12,i.stone.envMapIntensity=.9,i.gold=new dt({color:"#b99958",metalness:.78,roughness:.29}),i.dark=new dt({color:"#182421",metalness:.55,roughness:.35}),i.cream=new dt({color:"#d7c5a1",roughness:.85}),i.rubber=new dt({color:"#171d1c",roughness:.95}),i.red=new dt({color:"#a04730",metalness:.25,roughness:.4}),i.green=new dt({color:"#346044",roughness:.8}),i.light=new dt({color:"#ffe2a8",emissive:"#ffc46a",emissiveIntensity:2.1,roughness:.4}),i.water=new pt({color:"#398b8c",roughness:.16,metalness:.25,clearcoat:1,transparent:!0,opacity:.82}),i.glass=new pt({color:"#a7c4bc",roughness:.13,metalness:.2,transparent:!0,opacity:.2,depthWrite:!1}),i}var u0=["#f5ecd5","#e7b12e","#2862bc","#cc3835","#7443a2","#e88328","#26764a","#82322e","#171b23"];function $r(r,e){return e.discipline==="pyramid"?r===0?e.color==="red"?"#ac2838":"#e6b735":"#fff3d9":u0[r>8?r-8:r]}function hf(r){let e=new nl({canvas:r,antialias:!0,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.toneMapping=zo,e.toneMappingExposure=1.25,e.shadowMap.enabled=!0,e.shadowMap.type=Lo;let t=new Ts;t.background=new Ae("#91c7cf"),t.fog=new bs("#91c7cf",45,180);let n=new xt(47,1,.1,250),i=[],s=cf(i),a=new Map,o=[],l="room",c="",h=document.createElement("canvas");h.width=128,h.height=64;let u=h.getContext("2d"),p=u.createLinearGradient(0,0,0,64);p.addColorStop(0,"#e3dfce"),p.addColorStop(.48,"#9aa49c"),p.addColorStop(1,"#42352a"),u.fillStyle=p,u.fillRect(0,0,128,64);let d=new en(h);d.colorSpace=rt,d.mapping=bi,i.push(d),t.environment=d,t.environmentIntensity=.55,t.add(new js("#ffecd1","#3b2d22",2.5));let m=new ji("#ffe5b7",3);m.position.set(-8,18,-15),m.castShadow=!0,m.shadow.mapSize.set(1024,1024),Object.assign(m.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.5,far:50}),m.shadow.bias=-15e-5,m.shadow.normalBias=.015,t.add(m);let g=new Wi("#ffd397",85,25,2);g.position.set(0,6,0),t.add(g);function f(W,le,$,J,de,Ne=0,te=0){let ue=new ct(W,le);return ue.position.set($,J,de),ue.rotation.set(Ne,te,0),ue.castShadow=ue.receiveShadow=!0,t.add(ue),ue}function _(W,le,$,J,de,Ne,te){return f(new Tn(W,le,$),J,de,Ne,te)}let v=s.stone.map.clone();v.repeat.set(6,6),v.needsUpdate=!0,i.push(v);let x=s.stone.clone();x.map=x.bumpMap=v,f(new tn(24,24),x,0,0,0,-Math.PI/2);let y=s.plaster.map.clone();y.repeat.set(5,2),y.needsUpdate=!0,i.push(y);let w=s.plaster.clone();w.map=y,_(.25,7,23,w,-11,3.5,0),_(.25,7,23,w,11,3.5,0),_(22,7,.2,w,0,3.5,11);for(let W of[-10.8,10.8])_(.12,.1,22,s.gold,W,1.8,0),_(.12,1.7,22,s.cabinet,W,.9,0);for(let W of[-10.5,-5.25,0,5.25,10.5])_(.12,6.7,.15,s.dark,W,3.35,-10),_(.025,6,.18,s.gold,W,3.35,-9.98);_(21,.12,.15,s.dark,0,6.6,-10),_(21,.12,.15,s.dark,0,.12,-10),f(new tn(28,8),s.deck,0,-.03,-14,-Math.PI/2),_(15,.15,4.6,s.cream,0,.03,-14),_(14.2,.1,3.8,s.water,0,.13,-14);for(let W of[-7.4,7.4])_(.2,.2,4.6,s.gold,W,.15,-14);f(new tn(220,160),new dt({color:"#237b8b",metalness:.4,roughness:.2}),0,-.4,-97,-Math.PI/2);for(let W of[-9,9]){_(1.5,.25,3,s.cream,W,.3,-14),_(1.5,.8,.2,s.wood,W,.7,-15.3);let le=f(new En(.5,.4,.8,24),s.dark,W,.4,-9);for(let $=0;$<9;$++){let J=f(new yi(.35,10,8),s.green,W+Math.sin($*2)*.45,1.3+$%3*.35,-9+Math.cos($*2)*.4);J.scale.set(.5,2.2,.3),J.rotation.z=Math.sin($)*.55}}function R(W){let le=document.createElement("canvas");le.width=le.height=1024;let $=le.getContext("2d"),J=71,de=()=>(J=J*1664525+1013904223>>>0,J/4294967296);$.fillStyle=W==="cloth"?"#17634f":"#382016",$.fillRect(0,0,1024,1024);for(let te=0;te<18e3;te++){let ue=de()*1024,me=de()*1024;$.strokeStyle=W==="cloth"?te%2?"#ffffff0a":"#00000012":te%2?"#d6a26d24":"#100a062b",$.lineWidth=W==="cloth"?.6:de()*2+.3,$.beginPath(),$.moveTo(ue,me),$.lineTo(ue+(W==="cloth"?2:60+de()*180),me+(W==="cloth"?2:Math.sin(ue*.01)*4)),$.stroke()}let Ne=new en(le);return Ne.colorSpace=rt,Ne.wrapS=Ne.wrapT=Qt,Ne.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),i.push(Ne),Ne}let N=R("cloth");s.felt=new dt({map:N,bumpMap:N,bumpScale:.008,roughness:.94,color:"#b0d9c4"});let D=R("wood");s.wood=new pt({map:D,roughness:.28,clearcoat:.65,clearcoatRoughness:.22}),_(10.9,.6,5.9,s.dark,0,1.75,0),_(10.95,.07,5.95,s.gold,0,1.95,0),_(10.7,.28,5.7,s.wood,0,2.1,0),_(10,.08,5,s.felt,0,2.23,0);let C=new Ut;t.add(C);let B="";function G(W){let le=lr(W);if(B===le.spec.name)return;B=le.spec.name;for(let J of[...C.children])J.geometry?.dispose(),J.isLine&&J.material.dispose(),C.remove(J);let $=(J,de=2.37)=>new T((J[0]-500)/100,de,(J[1]-250)/100);for(let J of le.rails){let de=J.b[0]-J.a[0],Ne=J.b[1]-J.a[1],te=Math.hypot(de,Ne),ue=[(J.a[0]+J.b[0])/2,(J.a[1]+J.b[1])/2],me=-Ne/te,Ue=de/te,Ke=[500,250];J.jaw&&(Ke=le.pockets.slice().sort((ft,et)=>Math.hypot(ft.center[0]-ue[0],ft.center[1]-ue[1])-Math.hypot(et.center[0]-ue[0],et.center[1]-ue[1]))[0].drop),(Ke[0]-ue[0])*me+(Ke[1]-ue[1])*Ue<0&&(me=-me,Ue=-Ue);let P=new ct(new Tn(te/100,.2,.12),s.felt);P.position.copy($([ue[0]-me*6,ue[1]-Ue*6],2.36)),P.rotation.y=-Math.atan2(Ne,de),P.castShadow=P.receiveShadow=!0,C.add(P)}for(let J of le.pockets){let de=[le.rails[6+J.index*2].b,le.rails[7+J.index*2].b],Ne=[J.ends[0],J.ends[1],de[1],de[0]],te=new zi;Ne.forEach((Ue,Ke)=>{let P=(Ue[0]-500)/100,Je=-(Ue[1]-250)/100;Ke?te.lineTo(P,Je):te.moveTo(P,Je)}),te.closePath();let ue=new ct(new Br(te),s.rubber);ue.rotation.x=-Math.PI/2,ue.position.y=2.278,C.add(ue);let me=new wn(new tt().setFromPoints([J.ends[0],de[0],de[1],J.ends[1]].map(Ue=>$(Ue,2.285))),new $n({color:"#bca36a"}));C.add(me)}}G({discipline:"pool8"});for(let W of[-4.2,4.2])for(let le of[-1.9,1.9])_(.5,1.7,.5,s.dark,W,.85,le),_(.54,.12,.54,s.gold,W,.15,le);for(let W of[-2.75,2.75])for(let le=-4;le<=4;le++)f(new yi(.025,8,6),s.cream,le,2.26,W);for(let W of[-3.4,0,3.4])o.push(f(new En(.025,.025,1.5,8),s.dark,W,6,0)),o.push(f(new En(.12,.6,.42,32),s.dark,W,5.1,0)),o.push(f(new Ur(.53,32),s.light,W,4.87,0,Math.PI/2));function O(W,le={discipline:"pool8"}){let $=document.createElement("canvas");$.width=256,$.height=128;let J=$.getContext("2d");if(J.fillStyle=le.discipline==="pyramid"?$r(W,le):W>8?"#fff5db":$r(W,le),J.fillRect(0,0,256,128),W>8&&le.discipline!=="pyramid"&&(J.fillStyle=$r(W,le),J.fillRect(0,34,256,60)),W)for(let Ne of[64,192])J.fillStyle="#fff9e6",J.beginPath(),J.arc(Ne,64,20,0,Math.PI*2),J.fill(),J.fillStyle="#182328",J.font="bold 27px Arial",J.textAlign="center",J.textBaseline="middle",J.fillText(W,Ne,65);let de=new en($);return de.colorSpace=rt,i.push(de),de}for(let W=0;W<16;W++){let le=f(new yi(.1,48,32),new pt({map:O(W),roughness:.12,metalness:0,clearcoat:1,clearcoatRoughness:.08,ior:1.52}),0,2.37,0);le.rotation.x=-Math.PI/2,a.set(W,le)}let Y=document.createElement("canvas");Y.width=Y.height=64;let k=Y.getContext("2d"),X=k.createRadialGradient(32,32,3,32,32,32);X.addColorStop(0,"#00000099"),X.addColorStop(1,"#00000000"),k.fillStyle=X,k.fillRect(0,0,64,64);let K=new en(Y);i.push(K);let ae=new Map;for(let W=0;W<16;W++){let le=f(new tn(.31,.31),new Ft({map:K,transparent:!0,depthWrite:!1}),0,2.277,0,-Math.PI/2);le.castShadow=!1,ae.set(W,le)}let ee=new tt().setFromPoints([new T,new T]),_e=new wn(ee,new Vs({color:"#f9e3a6",dashSize:.13,gapSize:.08}));t.add(_e);let be=new Ut;t.add(be);let ye=new pt({color:"#dec18d",roughness:.24,clearcoat:1}),Pe=new dt({color:"#b6a38a",metalness:.8,roughness:.24}),oe=new pt({color:"#e4c390",roughness:.28,clearcoat:.65}),he=new dt({color:"#182c28",roughness:.65}),ce=new dt({color:"#fff0cb",roughness:.3}),Ce=new dt({color:"#497e94",roughness:.9});function Le(W,le,$,J,de){let Ne=new ct(new En($,J,le-W,24),de);Ne.rotation.z=Math.PI/2,Ne.position.x=-(W+le)/2,Ne.castShadow=!0,be.add(Ne)}Le(.15,1.1,.014,.022,oe),Le(1.1,2.15,.022,.029,ye),Le(2.15,2.85,.029,.034,he),Le(2.85,3,.034,.035,ye),Le(.11,.15,.015,.015,ce),Le(.09,.11,.015,.015,Ce);for(let W of[1.85,2.15,2.85])Le(W-.012,W+.012,.033,.033,Pe);for(let W=0;W<40;W++)Le(2.16+W*.017,2.164+W*.017,.03,.03,he);let b=new Hi().load("assets/player-hall/billiards-cues-v1.webp");b.colorSpace=rt,b.repeat.set(1/8,1),b.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),i.push(b);let S=document.createElement("canvas");S.width=512,S.height=64;let F=new en(S);F.colorSpace=rt,i.push(F);let L=new ct(new tn(.52,.055),new Ft({map:F,transparent:!0}));L.rotation.x=-Math.PI/2,L.position.set(-1.65,.032,0),L.visible=!1,be.add(L);function M(W,le){let $=["maple","walnut","aces","ocean","carbon","ruby","signature","sovereign"],J=Math.max(0,$.indexOf(W.id));if(ye.color.set(J?"#ffffff":W.color),ye.map=J?b:null,ye.needsUpdate=!0,b.offset.x=J/8,b.needsUpdate=!0,he.color.set(W.grip),Pe.color.set(W.metal),L.visible=!!W.named,W.named){let de=S.getContext("2d");de.clearRect(0,0,512,64),de.fillStyle="#c9a34f",de.fillRect(0,0,512,64),de.fillStyle="#171a16",de.font="bold 39px sans-serif",de.textAlign="center",de.textBaseline="middle",de.fillText(String(le||"\u0413\u0435\u0440\u043E\u0439").slice(0,28),256,34,490),F.needsUpdate=!0}}let A=f(new kr(.1,.008,8,48),new Ft({color:"#f6dfac",transparent:!0,opacity:.8}),0,2.285,0,Math.PI/2);A.castShadow=!1;let U=performance.now(),I=new Ks,q=new Jt(new T(0,1,0),-2.37);function z(){let W=r.getBoundingClientRect();e.setSize(W.width,W.height,!1),n.aspect=W.width/W.height,n.updateProjectionMatrix(),H(l)}function H(W){if(l=W,o.forEach(le=>le.visible=W!=="table"),n.up.set(W==="table"?1:0,W==="table"?0:1,0),W==="table"){let le=n.aspect;n.position.set(0,2.3+Math.max(14,8/le),.01),n.lookAt(0,2.25,0)}else n.position.set(9,7.2,10),n.lookAt(0,2,-4)}function ie(W,le){let $=r.getBoundingClientRect();I.setFromCamera(new ne((W-$.left)/$.width*2-1,1-(le-$.top)/$.height*2),n);let J=new T;return I.ray.intersectPlane(q,J)?{x:J.x*100+500,y:J.z*100+250}:null}function fe(W){let le=lr({discipline:B.includes("\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430")?"pyramid":"pool8"}).pockets[W].center,$=new T((le[0]-500)/100,2.37,(le[1]-250)/100).project(n),J=r.getBoundingClientRect();return{x:J.left+($.x+1)*J.width/2,y:J.top+(1-$.y)*J.height/2}}function re(W,le,$){let J=performance.now(),de=Math.min(.05,(J-U)/1e3);U=J;let Ne=W.discipline+":"+W.color;if(Ne!==c){c=Ne;for(let[te,ue]of a){let me=ue.material.map;ue.material.map=O(te,W),ue.material.needsUpdate=!0,me?.dispose();let Ue=i.indexOf(me);Ue>=0&&i.splice(Ue,1)}G(W)}for(let te of W.balls){let ue=a.get(te.id);if(ue.visible=!te.pocket,ue.position.set((te.x-500)/100,2.27+It(W)/100,(te.y-250)/100),ue.scale.setScalar(It(W)/10),W.moving&&!te.pocket){let Ue=new T((te.rollY||0)/It(W),-(te.side||0)/It(W),-(te.rollX||0)/It(W)),Ke=Ue.length();Ke&&ue.rotateOnWorldAxis(Ue.normalize(),Ke*de)}let me=ae.get(te.id);me.visible=ue.visible,me.position.set(ue.position.x+.025,2.277,ue.position.z+.025)}if(A.visible=!1,_e.visible=be.visible=$&&l==="table",_e.visible){let te=W.balls.find(Et=>Et.id===(W.cueId??0))||W.balls[0],ue=(te.x-500)/100,me=(te.y-250)/100,Ue=Math.cos(le),Ke=Math.sin(le),P=12,Je=null,ft=1/0;for(let Et of W.balls){if(Et.id===te.id||Et.pocket)continue;let on=(Et.x-500)/100-ue,Fn=(Et.y-250)/100-me,Bn=on*Ue+Fn*Ke,ir=on*on+Fn*Fn-Bn*Bn,ri=It(W)*2/100;if(Bn>0&&ir<ri*ri){let rr=Math.max(0,Bn-Math.sqrt(ri*ri-ir));rr<P&&(P=rr,Je=Et,ft=rr)}}Ue>0&&(P=Math.min(P,(4.9-ue)/Ue)),Ue<0&&(P=Math.min(P,(-4.9-ue)/Ue)),Ke>0&&(P=Math.min(P,(2.4-me)/Ke)),Ke<0&&(P=Math.min(P,(-2.4-me)/Ke)),Je&&Math.abs(P-ft)<1e-5&&(A.visible=!0,A.position.set(ue+Ue*P,2.285,me+Ke*P),A.scale.setScalar(It(W)/10),A.material.color.set(Pi(W).some(Et=>Et.id===Je.id)?"#dfefca":"#ed7770"));let et=ee.attributes.position;et.setXYZ(0,ue,2.38,me),et.setXYZ(1,ue+Ue*P,2.38,me+Ke*P),et.needsUpdate=!0,_e.computeLineDistances(),be.position.set(ue,2.4,me),be.rotation.set(0,-le,0)}e.render(t,n)}let ve=new rl,Se=!1,Re=Promise.allSettled([["armchair/ArmChair_01_1k.gltf",2.4,[[8,.08,4,-Math.PI/2],[-8,.08,4,Math.PI/2]],!0],["plant/potted_plant_01-mobile.gltf",2.8,[[9,.08,-8,0],[-9,.08,-8,1]],!1]].map(async([W,le,$,J])=>{let de=await ve.loadAsync("assets/city-interior/"+W),Ne=de.scene,te=new Ct().setFromObject(Ne),ue=te.getSize(new T);if(Se){Ne.traverse(me=>{me.geometry?.dispose();for(let Ue of[].concat(me.material||[])){for(let Ke of Object.values(Ue))Ke?.isTexture&&Ke.dispose();Ue.dispose()}});return}Ne.position.set(-(te.min.x+te.max.x)/2,-te.min.y,-(te.min.z+te.max.z)/2),Ne.traverse(me=>{if(me.isMesh)for(let Ue of[].concat(me.material)){J&&(Ue.color.set("#a52721"),Ue.roughnessMap=null,Ue.roughness=.33);for(let Ke of Object.values(Ue))Ke?.isTexture&&i.push(Ke)}});for(let[me,Ue,Ke,P]of $){if(Se)return;let Je=new Ut;Je.add(Ne.clone()),Je.scale.setScalar(le/ue.y),Je.position.set(me,Ue,Ke),Je.rotation.y=P,t.add(Je)}})),Ve=new ResizeObserver(z);return Ve.observe(r),z(),{render:re,point:ie,projectPocket:fe,setView:H,setCue:M,ready:Re,dispose(){Se=!0,Ve.disconnect(),t.traverse(W=>{W.geometry?.dispose();for(let le of[].concat(W.material||[]))le.dispose()}),i.forEach(W=>W.dispose()),e.dispose()}}}var d0=r=>r===8?null:r<8?0:1;function p0(r){if(r.rulesVersion)return Pi(r);let e=r.groups[r.turn],t=r.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||d0(n.id)===e));return t.length?t:r.balls.filter(n=>n.id===8&&!n.pocket)}function uf(r,e,t,n,i=yl){let s=e.x-r.x,a=e.y-r.y,o=s*s+a*a;return!t.some(l=>!l.pocket&&!n.includes(l.id)&&(()=>{let c=((l.x-r.x)*s+(l.y-r.y)*a)/o;return c<=0||c>=1?!1:Math.hypot(l.x-r.x-s*c,l.y-r.y-a*c)<i*2+1})())}function df(r){if(r.moving||r.winner!==null)return null;if(r.pending){let o=r.pending;return o.type==="pyramid-foul"?{type:"decision",choice:"play",ballId:r.balls.find(l=>!l.pocket).id}:{type:"decision",choice:o.illegal?"rerack-self":"accept"}}if(r.inHand){for(let o=180;o<oi-30;o+=45)for(let l=li/2;l<li-25;l+=30){let c=structuredClone(r);if(fa(c,o,l))return{type:"place",x:o,y:l}}for(let o=30;o<oi-25;o+=25)for(let l=30;l<li-25;l+=25){let c=structuredClone(r);if(fa(c,o,l))return{type:"place",x:o,y:l}}return null}let e=r.discipline==="pyramid"?r.balls.find(o=>o.id===r.cueId&&!o.pocket)||r.balls.find(o=>!o.pocket):r.balls[0],t=r.rulesVersion?It(r):yl,n={...r,cueId:e.id},i=p0(n),s=null;for(let o of i)for(let[l,[c,h]]of Ml.entries()){let u=Math.hypot(c-o.x,h-o.y);if(u<1)continue;let p=(c-o.x)/u,d=(h-o.y)/u,m={x:o.x-p*t*2,y:o.y-d*t*2};if(m.x<t||m.x>oi-t||m.y<t||m.y>li-t)continue;let g=Math.hypot(m.x-e.x,m.y-e.y),f=((m.x-e.x)*p+(m.y-e.y)*d)/Math.max(1,g);if(f<.25||!uf(e,m,r.balls,[e.id,o.id],t)||!uf(o,{x:c,y:h},r.balls,[e.id,o.id],t))continue;let _=f*700-g*.25-u*.4;s&&s.score>=_||(s={score:_,type:"shot",cueId:e.id,callBall:o.id,callPocket:l,angle:Math.atan2(m.y-e.y,m.x-e.x),power:Math.max(.15,Math.min(.85,(Math.sqrt(2*.018*9810*1e3/Ii(r).length*(g+u/Math.max(.3,f)))/.714-180)/1250+.05))})}if(s)return delete s.score,s;let a=i.slice().sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y)-Math.hypot(l.x-e.x,l.y-e.y))[0];return a?{type:"shot",cueId:e.id,callBall:a.id,callPocket:0,angle:Math.atan2(a.y-e.y,a.x-e.x),power:.4}:null}var Qr=Object.freeze([{id:"maple",name:"\u041F\u0435\u0440\u0432\u044B\u0439 \u0443\u0434\u0430\u0440",level:0,color:"#dec18d",grip:"#62452e",metal:"#b6a38a"},{id:"walnut",name:"\u041E\u0440\u0435\u0445\u043E\u0432\u044B\u0439 \u043A\u043B\u0443\u0431",level:10,color:"#633a23",grip:"#453024",metal:"#d5ae60"},{id:"aces",name:"\u0414\u0432\u0430 \u0442\u0443\u0437\u0430",level:20,color:"#124e3c",grip:"#173c30",metal:"#e7bb61"},{id:"ocean",name:"\u041E\u043A\u0435\u0430\u043D",level:35,color:"#226b96",grip:"#203f56",metal:"#cad7df"},{id:"carbon",name:"\u041A\u0430\u0440\u0431\u043E\u043D",level:50,color:"#242b30",grip:"#161d21",metal:"#d6dee3"},{id:"ruby",name:"\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0439",level:65,color:"#6d1726",grip:"#3c1720",metal:"#edbf65"},{id:"signature",name:"\u0418\u043C\u0435\u043D\u043D\u043E\u0439",level:80,color:"#eee0b2",grip:"#171b1a",metal:"#e5bf68",named:!0},{id:"sovereign",name:"\u041F\u043E\u0432\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0441\u0442\u043E\u043B\u0430",level:100,color:"#122d27",grip:"#12201c",metal:"#f4cc71"}]);function f0(r,e){let t=Qr.find(n=>n.id===r);return t&&Number.isFinite(e)&&e>=t.level?t:Qr[0]}function m0(r){if(!r?.self||!r.accountId)throw Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0433\u0435\u0440\u043E\u044F.");let e=Number(r.garage?.stats?.level);if(!Number.isFinite(e)||e<0)throw Error("\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.");return{accountId:String(r.accountId),level:Math.floor(e),nick:String(r.nick||r.name||"\u0413\u0435\u0440\u043E\u0439").trim().slice(0,28)}}function pf({source:r,room:e,openInitially:t=!1}){let n=p=>document.getElementById(p),i=n("cueDialog"),s=null,a=Qr[0],o=!1;function l(){return"p21:billiards:cue:v1:"+s.accountId}function c(p){a=p,e?.setCue(p,s?.nick||""),n("cueButton").textContent="\u041A\u0438\u0439 \xB7 "+p.name}function h(){let p=document.activeElement?.dataset?.cue;if(n("cueHero").textContent=o?"\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F\u2026":s?"\u0412\u0430\u0448 \u0433\u0435\u0440\u043E\u0439 \xB7 \u0443\u0440\u043E\u0432\u0435\u043D\u044C "+s.level:"\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u0438\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C",n("cueList").replaceChildren(),Qr.forEach((d,m)=>{let g=!!s&&s.level>=d.level||d.level===0,f=document.createElement("button");f.type="button",f.className="cue-card",f.dataset.cue=d.id,f.setAttribute("aria-pressed",String(a.id===d.id)),f.disabled=!g||o;let _=document.createElement("span");_.className="cue-card__art",_.style.backgroundPosition=m/7*100+"% center",_.setAttribute("aria-hidden","true");let v=document.createElement("strong");v.textContent=d.name;let x=document.createElement("small");x.textContent=d.level?"\u0421 "+d.level+" \u0443\u0440\u043E\u0432\u043D\u044F":"\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C";let y=document.createElement("span");if(y.className="cue-card__state",y.textContent=g?a.id===d.id?"\u2713 \u0412\u044B\u0431\u0440\u0430\u043D":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C":"\u{1F512} \u0415\u0449\u0451 "+Math.max(0,d.level-(s?.level||0))+" \u0443\u0440.",f.append(_,v,x),d.named){let w=document.createElement("span");w.className="cue-card__name",w.textContent=s?.level>=d.level?s.nick:"\u0412\u0430\u0448 \u043D\u0438\u043A \u043D\u0430 \u043A\u0438\u0435",f.append(w)}f.append(y),f.onclick=()=>{if(!(o||!g)){c(d);try{s&&localStorage.setItem(l(),d.id)}catch{}h(),n("cueFeedback").textContent="\u0412\u044B\u0431\u0440\u0430\u043D \u043A\u0438\u0439 \xAB"+d.name+"\xBB"+(d.named?" \xB7 "+s.nick:"")+"."}},n("cueList").append(f)}),p){let d=Array.from(n("cueList").children).find(m=>m.dataset.cue===p);d&&!d.disabled&&d.focus({preventScroll:!0})}}async function u(){if(!o){o=!0,h(),n("cueError").textContent="";try{if(typeof r.pokerSocialRequest!="function")throw Error("\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0438\u043B\u044C\u044F\u0440\u0434 \u0438\u0437 \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u043E\u043C\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F.");let p=await r.pokerSocialRequest("player-hall",{action:"get"});s=m0(p.hall);let d;try{d=localStorage.getItem(l())}catch{}c(f0(d,s.level))}catch(p){s=null,c(Qr[0]),n("cueError").textContent=p.message||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0433\u0435\u0440\u043E\u044F."}finally{o=!1,h()}}}return n("cueRetry").onclick=u,n("cueClose").onclick=()=>i.close(),i.addEventListener("click",p=>{if(p.target===i){let d=i.getBoundingClientRect();(p.clientX<d.left||p.clientX>d.right||p.clientY<d.top||p.clientY>d.bottom)&&i.close()}}),n("cueButton").onclick=()=>{i.showModal(),u()},c(Qr[0]),h(),u(),t&&i.showModal(),{inspect:()=>({selected:a.id,level:s?.level??null,nick:s?.nick||"",loading:o})}}var ff=["\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430"],Te=r=>document.getElementById(r);function mf({move:r,room:e}){let t=0,n="",i=null,s=!1;function a(){return{discipline:Te("discipline").value,color:Te("ballSet").value}}function o(){let g=Te("discipline").value==="pyramid";Te("ballSet").replaceChildren(...(g?[["yellow","\u0411\u0435\u043B\u044B\u0435 + \u0436\u0451\u043B\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"],["red","\u0411\u0435\u043B\u044B\u0435 + \u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"]]:[["standard","\u0426\u0432\u0435\u0442\u043D\u044B\u0435: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \u0438 \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435"]]).map(([f,_])=>new Option(_,f))),Te("disciplineInfo").textContent=g?"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430: \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u0442\u044C 8 \u0448\u0430\u0440\u043E\u0432. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0431\u0438\u0442\u043A\u043E\u043C \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440.":"\u041F\u0443\u043B \xAB\u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430\xBB: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0432\u043E\u044F \u0433\u0440\u0443\u043F\u043F\u0430, \u0437\u0430\u0442\u0435\u043C \u2116 8. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F."}Te("placeBreak").onclick=()=>s=!s,Te("discipline").onchange=o,o(),ff.forEach((g,f)=>Te("callPocket").add(new Option(f+1+" \xB7 "+g,String(f)))),Te("callBall").onchange=Te("callPocket").onchange=Te("safety").onchange=()=>{},Te("decisionButtons").onclick=g=>{let f=g.target.closest("[data-decision]")?.dataset.decision;f&&r({type:"decision",choice:f,ballId:Number(Te("penaltyBall").value)})},Te("pocketMarkers").replaceChildren(...ff.map((g,f)=>{let _=document.createElement("button");return _.type="button",_.textContent=f+1,_.title=g,_.setAttribute("aria-label","\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0443\u0437\u0443 "+(f+1)+" \xB7 "+g),_.onclick=()=>Te("callPocket").value=String(f),_}));function l(g,f){let _=document.createElement("span");return _.className="potted-ball"+(f.discipline!=="pyramid"&&g>8?" striped":""),_.style.setProperty("--ball-color",$r(g,f)),_.textContent=g||"",_.title=g?"\u0428\u0430\u0440 "+g:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439 \u0448\u0430\u0440",g===8&&f.discipline==="pool8"&&f.winner!==null&&f.winner!==f.lastShooter&&(_.classList.add("invalid-eight"),_.title="\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435\u043C \u2014 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0448 \u043F\u0430\u0440\u0442\u0438\u0438"),_}function c(g,f,_){let v=g.value;g.replaceChildren(new Option(_,""),...f.map(x=>new Option(x.id?"\u2116 "+x.id:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439",String(x.id)))),f.some(x=>String(x.id)===v)&&(g.value=v)}function h(g){return{cueId:t,callBall:Te("callBall").value===""?null:Number(Te("callBall").value),callPocket:Te("callPocket").value===""?null:Number(Te("callPocket").value),safety:Te("safety").checked}}function u(g,f){if(g.discipline!=="pyramid"||g.breakPending||g.inHand)return!1;let _=g.balls.filter(v=>!v.pocket).map(v=>({ball:v,distance:Math.hypot(v.x-f.x,v.y-f.y)})).filter(v=>v.distance<22).sort((v,x)=>v.distance-x.distance)[0]?.ball;return _?(t=_.id,!0):!1}function p(g,{player:f,mode:_,tableView:v,can:x}){i=g,Te("matchDiscipline").textContent=g.discipline==="pyramid"?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",(!g.balls.some(D=>D.id===t&&!D.pocket)||g.breakPending||g.discipline!=="pyramid")&&(t=g.discipline==="pyramid"&&!g.breakPending?g.balls.find(D=>!D.pocket)?.id??0:0);let y=g.discipline==="pyramid",w=JSON.stringify([g.shot,g.turn,g.discipline,g.color,g.groups,g.balls.map(D=>D.pocket),g.pending,g.winner,f,_]);Te("placeBreak").hidden=!g.breakPending||!x,Te("placeBreak").textContent=s?"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432 \u0434\u043E\u043C\u0435 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435":"\u041F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435",Te("ballShelves").hidden=!v,Te("callControls").hidden=!v||y||g.breakPending||g.moving||!!g.pending||!x,Te("cuePickHint").hidden=!v||!y||g.breakPending,Te("cuePickHint").textContent="\u0411\u0438\u0442\u043E\u043A: "+(t?"\u2116 "+t:"\u0446\u0432\u0435\u0442\u043D\u043E\u0439")+" \xB7 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0448\u0430\u0440 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",Te("decisionPanel").hidden=!g.pending||!x;let R=h(g),N=!y&&!g.breakPending&&!d()&&(R.callBall===null||R.callPocket===null);if(x&&g.pending?Te("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438 \u043D\u0438\u0436\u0435":x&&g.inHand?Te("hint").textContent=g.handZone==="head"?"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435 \u2014 \u0432 \u043D\u0438\u0436\u043D\u0435\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438 \u0441\u0442\u043E\u043B\u0430":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0431\u0438\u0442\u043A\u0430":x&&N&&(Te("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 \u043B\u0438\u0431\u043E \u043E\u0442\u044B\u0433\u0440\u044B\u0448"),Te("shoot").disabled=!x||g.inHand||!v||!!g.pending||N||s,Te("pocketMarkers").hidden=!v||y||g.breakPending||!x||!!g.pending,Te("pocketMarkers").hidden||Array.from(Te("pocketMarkers").children).forEach((D,C)=>{let B=e.projectPocket?.(C);B&&(D.style.left=B.x+"px",D.style.top=B.y+"px"),D.classList.toggle("chosen",Te("callPocket").value===String(C))}),w!==n){n=w,c(Te("callBall"),Pi({...g,cueId:t}),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440");for(let C=0;C<2;C++){let B=C===0,G=B?f:1-f,O=B?"\u0412\u044B":_==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433",Y=g.groups[G];Te("shelfName"+C).textContent=O,Te("shelfGroup"+C).textContent=y?"\u0414\u043E 8 \u0448\u0430\u0440\u043E\u0432":Y===null?"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":Y===0?"\u0421\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \xB7 1\u20137":"\u041F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 \xB7 9\u201315";let k=[...g.captured?.[G]||g.balls.filter(X=>X.pocket&&X.id&&X.id!==8&&Y!==null&&(X.id<8?0:1)===Y).map(X=>X.id)];!y&&g.winner!==null&&g.lastShooter===G&&g.balls.some(X=>X.id===8&&X.pocket)&&k.push(8),Te("shelfBalls"+C).replaceChildren(...k.map(X=>l(X,g))),Te("shelfCount"+C).textContent=(y?k.length:k.filter(X=>X!==8).length)+" / "+(y?8:7),Te("shelf"+C).classList.toggle("active",g.turn===G&&g.winner===null)}let D=!y&&g.groups[0]===null?g.balls.filter(C=>C.pocket&&C.id&&C.id!==8):[];if(Te("unassignedBalls").replaceChildren(...D.map(C=>l(C.id,g))),Te("unassignedTray").hidden=!D.length,g.pending){let C=g.pending,B=C.type==="pyramid-foul";Te("penaltyLabel").hidden=!B,B&&c(Te("penaltyBall"),g.balls.filter(O=>!O.pocket),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440");let G=B?[["play","\u0421\u043D\u044F\u0442\u044C \u0448\u0430\u0440 \u0438 \u0438\u0433\u0440\u0430\u0442\u044C"],["pass","\u0421\u043D\u044F\u0442\u044C \u0448\u0430\u0440 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0445\u043E\u0434"],...C.illegalBreak?[["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:[]]:C.illegal?[["accept","\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"],...C.foul?[["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]]:[],["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:C.eight?[["accept",C.foul?"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \xB7 \u0431\u0438\u0442\u043E\u043A \u0438\u0437 \u0434\u043E\u043C\u0430":"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"],["rerack-self","\u0420\u0430\u0437\u0431\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E"]]:[["accept","\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"],["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]];Te("decisionButtons").replaceChildren(...G.map(([O,Y])=>{let k=document.createElement("button");return k.type="button",k.dataset.decision=O,k.textContent=Y,k}))}}if(g.pending?.type==="pyramid-foul")for(let D of Te("decisionButtons").children)D.disabled=Te("penaltyBall").value==="";return{...g,cueId:t}}function d(){return Te("safety").checked}function m(){let g=(i?.discipline||a().discipline)==="pyramid";Te("rulesTitle").textContent=g?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",Te("rulesText").replaceChildren(...(g?["15 \u0431\u0435\u043B\u044B\u0445 \u0448\u0430\u0440\u043E\u0432 \u0438 \u043E\u0434\u0438\u043D \u0446\u0432\u0435\u0442\u043D\u043E\u0439. \u041F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0442\u043E\u0442, \u043A\u0442\u043E \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u043B 8 \u0448\u0430\u0440\u043E\u0432. \u0428\u0430\u0440\u044B \u043D\u0435 \u0434\u0435\u043B\u044F\u0442\u0441\u044F \u043D\u0430 \u0441\u0432\u043E\u0438 \u0438 \u0447\u0443\u0436\u0438\u0435.","\u0420\u0430\u0437\u0431\u043E\u0439 \u2014 \u0446\u0432\u0435\u0442\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u0438\u0437 \u0434\u043E\u043C\u0430. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0435\u0433\u043E \u0431\u0438\u0442\u043A\u043E\u043C. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u0431\u0438\u0432\u0430\u0442\u044C \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440, \u0438 \u0441\u0430\u043C \u0431\u0438\u0442\u043E\u043A \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0448\u0430\u0440\u0430. \u0417\u0430\u043A\u0430\u0437 \u043B\u0443\u0437\u044B \u043D\u0435 \u043D\u0443\u0436\u0435\u043D.","\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439: \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0437\u0430\u0431\u0438\u0442 \u0448\u0430\u0440, \u043B\u0438\u0431\u043E 3 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430, \u043B\u0438\u0431\u043E 2 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430 \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u043F\u0435\u0440\u0435\u0441\u0451\u043A \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0443 \u0441\u0442\u043E\u043B\u0430.","\u0415\u0441\u043B\u0438 \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442, \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u043D\u044B \u0434\u0432\u0430 \u0440\u0430\u0437\u043D\u044B\u0445 \u0431\u043E\u0440\u0442\u0430 \u043B\u0438\u0431\u043E \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u044B \u0438 \u0431\u043E\u0440\u0442. \u042D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0447\u0435\u0440\u0435\u0437 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u0438\u043C \u0448\u0430\u0440\u0430\u043C. \u041E\u0434\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0433\u043E \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0431\u043E\u0440\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E.","\u0417\u0430 \u0444\u043E\u043B \u0432\u0441\u0435 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u0435 \u0448\u0430\u0440\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043B\u044E\u0431\u043E\u0439 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443, \u0437\u0430\u0442\u0435\u043C \u0438\u0433\u0440\u0430\u0435\u0442 \u0441\u0430\u043C \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442 \u0445\u043E\u0434. \u041F\u0440\u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u043C \u0440\u0430\u0437\u0431\u043E\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0430\u043A\u0436\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443 \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C \u0441\u0447\u0451\u0442\u0430."]:["\u0411\u0435\u043B\u044B\u0439 \u0431\u0438\u0442\u043E\u043A \u0438 15 \u0446\u0432\u0435\u0442\u043D\u044B\u0445: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 1\u20137, \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 9\u201315, \u0447\u0451\u0440\u043D\u044B\u0439 \u2116 8. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u0433\u0440\u0443\u043F\u043F\u0443, \u0437\u0430\u0442\u0435\u043C \u0437\u0430\u0431\u0435\u0439\u0442\u0435 \u2116 8 \u0432 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u043B\u0443\u0437\u0443.","\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430. \u0411\u0435\u0437 \u0437\u0430\u0431\u0438\u0442\u043E\u0433\u043E \u0448\u0430\u0440\u0430 \u043C\u0438\u043D\u0438\u043C\u0443\u043C 4 \u0440\u0430\u0437\u043D\u044B\u0445 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u0434\u043E\u043B\u0436\u043D\u044B \u043A\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F \u0431\u043E\u0440\u0442\u0430. \u0421\u0442\u043E\u043B \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.","\u041F\u0435\u0440\u0435\u0434 \u043A\u0430\u0436\u0434\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 (\u043D\u043E\u043C\u0435\u0440\u0430 \u043B\u0443\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u043D\u0430 \u0441\u0442\u043E\u043B\u0435). \u0417\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0443\u0434\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441\u0435\u0440\u0438\u044E. \u041C\u043E\u0436\u043D\u043E \u043E\u0431\u044A\u044F\u0432\u0438\u0442\u044C \u043E\u0442\u044B\u0433\u0440\u044B\u0448 \u2014 \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0433\u043E \u0445\u043E\u0434 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0443.","\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0448\u0430\u0440\u0430 \u0441\u0432\u043E\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B; \u043D\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043C \u0441\u0442\u043E\u043B\u0435 \u2014 \u043B\u044E\u0431\u043E\u0433\u043E, \u043A\u0440\u043E\u043C\u0435 \u2116 8, \u043F\u043E\u043A\u0430 \u043D\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u0430 \u043E\u0434\u043D\u0430 \u0438\u0437 \u0433\u0440\u0443\u043F\u043F. \u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u0435\u043D \u0437\u0430\u0431\u0438\u0442\u044B\u0439 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438\u043B\u0438 \u043A\u0430\u0441\u0430\u043D\u0438\u0435 \u0431\u043E\u0440\u0442\u0430 \u043B\u044E\u0431\u044B\u043C \u0448\u0430\u0440\u043E\u043C.","\u0417\u0430\u0431\u0438\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A, \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0440 \u2014 \u0444\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0441\u0442\u0430\u0432\u0438\u0442 \u0431\u0438\u0442\u043E\u043A \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435; \u043F\u043E\u0441\u043B\u0435 \u0444\u043E\u043B\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u2014 \u0432 \u0434\u043E\u043C\u0435. \u0420\u0430\u043D\u043D\u044F\u044F \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430, \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u0444\u043E\u043B\u043E\u043C \u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043B\u0443\u0437\u0435 \u2014 \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435. \u041D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438\u0431\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439."]).map(f=>{let _=document.createElement("p");return _.textContent=f,_})),Te("rules").showModal()}return Te("rulesButton").onclick=m,{settings:a,options:h,render:p,chooseCue:u,isPlacing:g=>g.inHand||g.breakPending&&s,placed(){s=!1},reset(){t=0,s=!1,n="",Te("callBall").value="",Te("callPocket").value="",Te("safety").checked=!1},inspect:()=>({selectedCue:t,call:h(i||{})})}}var Qe=r=>document.getElementById(r),gf=r=>Math.abs(r)<.005?0:Math.round(r*100)/100;function _f({adjust:r}){let e={x:0,y:0},t=!1,n=-1;function i(){let o=[];return e.y&&o.push(e.y>0?"\u043D\u0430\u043A\u0430\u0442":"\u043E\u0442\u0442\u044F\u0436\u043A\u0430"),e.x&&o.push(e.x>0?"\u043F\u0440\u0430\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A":"\u043B\u0435\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A"),o.join(" + ")||"\u0446\u0435\u043D\u0442\u0440"}function s(){let o=i();Qe("spinDot").style.left=50+e.x*43+"%",Qe("spinDot").style.top=50-e.y*43+"%",Qe("spinX").value=Math.round(e.x*100),Qe("spinY").value=Math.round(e.y*100),Qe("spinXValue").textContent=Math.round(e.x*100)+"%",Qe("spinYValue").textContent=Math.round(e.y*100)+"%",Qe("spinLabel").textContent=o,Qe("spinButton").textContent="\u042D\u0444\u0444\u0435\u043A\u0442 \xB7 "+o,Qe("spinPad").setAttribute("aria-label","\u0422\u043E\u0447\u043A\u0430 \u0443\u0434\u0430\u0440\u0430: "+o)}function a(o){let l=Qe("spinPad").getBoundingClientRect(),c=(o.clientX-l.left-l.width/2)/(l.width*.43),h=(l.top+l.height/2-o.clientY)/(l.height*.43),u=Math.max(1,Math.hypot(c,h));e={x:gf(c/u),y:gf(h/u)};let p=Math.hypot(e.x,e.y);p>1&&(e.x/=p,e.y/=p),s()}Qe("spinPad").onpointerdown=o=>{o.preventDefault(),Qe("spinPad").setPointerCapture(o.pointerId),a(o)},Qe("spinPad").onpointermove=o=>{Qe("spinPad").hasPointerCapture(o.pointerId)&&a(o)},Qe("spinPad").onpointerup=Qe("spinPad").onpointercancel=o=>{Qe("spinPad").hasPointerCapture(o.pointerId)&&Qe("spinPad").releasePointerCapture(o.pointerId)};for(let[o,l,c]of[["spinX","x","y"],["spinY","y","x"]])Qe(o).oninput=()=>{let h=Math.sqrt(Math.max(0,1-e[c]**2));e[l]=Math.max(-h,Math.min(h,Number(Qe(o).value)/100)),s()};return Qe("spinButton").onclick=()=>{t&&Qe("spinDialog").showModal()},Qe("spinClose").onclick=()=>Qe("spinDialog").close(),Qe("spinReset").onclick=()=>{e={x:0,y:0},s()},Qe("aimLeft").onclick=()=>{t&&r(-.2*Math.PI/180)},Qe("aimRight").onclick=()=>{t&&r(.2*Math.PI/180)},s(),{value:()=>({...e}),reset(){e={x:0,y:0},s(),n=-1},render(o,l){t=l&&!o.pending&&!o.inHand;for(let u of["spinButton","aimLeft","aimRight"])Qe(u).disabled=!t;o.moving&&o.shot!==n&&(n=o.shot,e={x:0,y:0},s());let c=Ii(o);Qe("tableDimensions").textContent=c.name+" \xB7 \u0448\u0430\u0440\u044B "+c.ball+" \u043C\u043C \xB7 \u0441\u0442\u0432\u043E\u0440\u044B "+c.corner+" / "+c.side+" \u043C\u043C";let h=o.lastShot;Qe("lastShotSummary").hidden=!h,Qe("lastShotSummary").textContent=h?"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0443\u0434\u0430\u0440: \u0432 \u043B\u0443\u0437\u044B "+h.potted.length+" \xB7 \u0431\u043E\u0440\u0442\u0430 "+(h.contacts.rails||0)+" \xB7 \u0433\u0443\u0431\u043A\u0438 "+(h.contacts.jaws||0):""},inspect:()=>({spin:{...e}})}}var we=r=>document.getElementById(r),xe=pa(),al=xe,Yt=0,Ei=!1,ts=null,wi=0,ii=!1,ol=performance.now(),ni=0,su=0,ru=-1,wt=null,aa=0,ll="",Ht=null,es=0,Ai;try{Ai=hf(we("room"))}catch{we("connection").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C 3D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.",we("create").disabled=we("join").disabled=we("solo").disabled=!0}var vf=window;try{parent!==window&&parent.location.origin===location.origin&&(vf=parent)}catch{}var cl=_f({adjust:r=>{wi=Math.atan2(Math.sin(wi+r),Math.cos(wi+r))}}),On=mf({move:r=>au(r),room:Ai}),g0=pf({source:vf,room:Ai,openInitially:new URLSearchParams(location.search).get("mode")==="cues"});async function _0(r){let e=window;try{parent!==window&&parent.location.origin===location.origin&&(e=parent)}catch{}let t=e.pokerApiAuthJsonBody?.({})||{},n=e.getApiBase?.()||location.origin,i=await fetch(n+"/api/billiards",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",cache:"no-store",body:JSON.stringify({...t,...r}),signal:AbortSignal.timeout(1e4)}),s=await i.json();if(!i.ok||!s.ok)throw Error(s.error||"\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.");return s}function nr(r){we("connection").textContent=r}function hl(r){ii=r,Ai?.setView(r?"table":"room"),document.body.classList.toggle("billiards-table-view",r),we("view").textContent=r?"\u0412 \u043A\u043E\u043C\u043D\u0430\u0442\u0443":"\u041A \u0441\u0442\u043E\u043B\u0443"}function oa(){Ei=!1,Ht=null,es=0,wt=null,ts?.close(),ts=null,ll="",we("create").disabled=we("join").disabled=!1,we("lobby").hidden=!1,we("game").hidden=!0,hl(!1)}function xf(){if(!Ai)return;let r=Ht==="solo"&&xe.winner!==null?xe:null,e=r?{discipline:r.discipline,color:r.color,breaker:1-(r.breaker||0)}:On.settings();oa(),Ht="solo",xe=pa({...e,seed:Math.floor(Math.random()*4294967296)}),On.reset(),cl.reset(),al=xe,Yt=0,Ei=!0,wi=0,ni=0,xe.message=xe.turn===0?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443 \xB7 \u0431\u0438\u0442\u043E\u043A \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043C\u0430":"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443",we("lobby").hidden=!0,we("game").hidden=!1,we("matchMode").textContent="\u041E\u0414\u0418\u041D\u041E\u0427\u041D\u0410\u042F \u041F\u0410\u0420\u0422\u0418\u042F \xB7 \u041A\u041E\u041C\u041F\u042C\u042E\u0422\u0415\u0420",hl(!0),ol=performance.now()}function au(r){return Ht==="solo"?ga(xe,Yt,r):ts?.move(r)}function v0(r){if(Tl(r.state)&&(ll="",aa=r.serverNow-Date.now(),Yt=r.player,Ei=r.ready,we("roomCode").textContent=r.roomId,we("invite").hidden=r.player!==0,we("create").disabled=we("join").disabled=!1,r.ready?(we("lobby").hidden=!0,we("game").hidden=!1,we("matchMode").textContent="\u041F\u0410\u0420\u0422\u0418\u042F \u0421 \u0414\u0420\u0423\u0413\u041E\u041C \xB7 \u041E\u041D\u041B\u0410\u0419\u041D"):nr("\u041A\u043E\u043C\u043D\u0430\u0442\u0430 "+r.roomId+" \xB7 \u0436\u0434\u0451\u043C \u0434\u0440\u0443\u0433\u0430"),r.revision!==ru)){if(ru=r.revision,al=r.state,wt=r.playback,wt&&Tl(wt.before)&&Date.now()+aa<wt.startedAt+wt.durationMs){xe=structuredClone(wt.before),wt.move?ga(xe,xe.turn,wt.move):Sl(xe,wt.angle,wt.power);let e=Math.max(0,Date.now()+aa-wt.startedAt);for(let t=0;t<Math.floor(e/1e3*120)&&xe.moving;t++)ma(xe)}else xe=al,wt=null;r.ready&&!ii&&hl(!0),ni=0,ol=performance.now()}}function ou(r){let e=we("code").value.toUpperCase().replace(/\s/g,"");if(!r&&!/^[A-HJ-NP-Z2-9]{10}$/.test(e)){nr("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u0441\u043B\u0430\u043B \u0434\u0440\u0443\u0433.");return}oa(),Ht="online",ru=-1,we("create").disabled=we("join").disabled=!0,nr(r?"\u0421\u043E\u0437\u0434\u0430\u0451\u043C \u043A\u043E\u043C\u043D\u0430\u0442\u0443\u2026":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F\u2026"),ts=Fu({request:_0,onUpdate:v0,onError(t,n){ll=t,Ei=!1,nr(t),n?we("create").disabled=we("join").disabled=!1:we("hint").textContent=t}}),ts.start(r,e,On.settings())}we("solo").onclick=xf;we("create").onclick=()=>ou(!0);we("join").onclick=()=>ou(!1);we("code").onkeydown=r=>{r.key==="Enter"&&ou(!1)};we("copy").onclick=async()=>{try{await navigator.clipboard.writeText(we("roomCode").textContent),nr("\u041A\u043E\u0434 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0434\u0440\u0443\u0433\u0443.")}catch{nr("\u041A\u043E\u0434 \u043A\u043E\u043C\u043D\u0430\u0442\u044B: "+we("roomCode").textContent)}};we("view").onclick=()=>hl(!ii);we("power").oninput=()=>{we("powerValue").textContent=we("power").value+"%"};we("shoot").onclick=()=>au({type:"shot",angle:wi,power:Number(we("power").value)/100,...On.options(xe),spin:cl.value()});we("again").onclick=()=>Ht==="solo"?xf():ts?.move(null,!0);we("modes").onclick=()=>{oa(),nr("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u0443\u044E \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0438\u0433\u0440\u0443 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C.")};var lu=!1;function yf(r){if(!ii||!Ei||xe.turn!==Yt||xe.moving||xe.winner!==null)return;let e=Ai.point(r.clientX,r.clientY);if(!e)return;if(On.isPlacing(xe)||xe.breakPending&&r.shiftKey){r.type==="pointerdown"&&(au({type:"place",x:e.x,y:e.y}),On.placed());return}if(r.type==="pointerdown"&&On.chooseCue(xe,e))return;let t=On.options(xe).cueId,n=xe.balls.find(i=>i.id===t&&!i.pocket);n&&(wi=Math.atan2(e.y-n.y,e.x-n.x))}we("room").onpointerdown=r=>{lu=!0,we("room").setPointerCapture(r.pointerId),yf(r)};we("room").onpointermove=r=>{lu&&yf(r)};we("room").onpointerup=we("room").onpointercancel=()=>lu=!1;we("closeRules").onclick=()=>we("rules").close();we("back").onclick=()=>{oa(),parent!==window?parent.postMessage({type:"p21-billiards-close"},location.origin):location.assign("./")};function Mf(r){let e=Math.min((r-ol)/1e3,.1);if(ol=r,Ht==="solo"){for(ni+=e;ni>=1/120&&xe.moving;)ma(xe),ni-=1/120;if(xe.moving||(ni=0),xe.turn===1&&!xe.moving&&xe.winner===null){if(es||(es=r+650),r>=es){let s=df(xe);s&&ga(xe,1,s),es=0}}else es=0}else if(wt&&Date.now()+aa>=wt.startedAt){for(ni+=e;ni>=1/120&&xe.moving;)ma(xe),ni-=1/120;Date.now()+aa>=wt.startedAt+wt.durationMs&&(xe=al,wt=null)}let t=Ei&&xe.turn===Yt&&!xe.moving&&xe.winner===null,n=xe.turn===Yt?"\u0412\u0430\u0448 \u0445\u043E\u0434":Ht==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430";we("status").textContent=xe.moving?"\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438":xe.winner!==null?xe.winner===Yt?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 \u043F\u0430\u0440\u0442\u0438\u044E":Ht==="solo"?"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u0434\u0440\u0443\u0433":xe.pending?(xe.turn===Yt?"\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440":"\u0412\u044B\u0431\u043E\u0440 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430")+" \xB7 "+xe.message:xe.inHand?n+" \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438"+(xe.handZone==="head"?" \u0438\u0437 \u0434\u043E\u043C\u0430":""):xe.breakPending?xe.turn===Yt?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":Ht==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":"\u0414\u0440\u0443\u0433 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":n,we("hint").textContent=ll||(Ei?xe.winner!==null?"\u041F\u0430\u0440\u0442\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430":xe.moving?"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0448\u0430\u0440\u043E\u0432":xe.turn!==Yt?Ht==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430":xe.inHand?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u0431\u0438\u0442\u043A\u0430":ii?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438 \u0441\u0438\u043B\u0443 \u0443\u0434\u0430\u0440\u0430":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041A \u0441\u0442\u043E\u043B\u0443\xBB, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0443\u0434\u0430\u0440":"");for(let s=0;s<2;s++){let a=xe.groups[s];we("p"+(s+1)).textContent=(s===Yt?"\u0412\u044B":Ht==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 "+(xe.discipline==="pyramid"?"\u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":a===null?"\u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":a===0?"\u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435":"\u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435")+" \xB7 "+xe.scores[s]+"/"+(xe.discipline==="pyramid"?8:7),we("p"+(s+1)).className=xe.turn===s?"active":""}we("again").hidden=xe.winner===null||Yt!==0,cl.render(xe,t&&ii);let i=On.render(xe,{player:Yt,mode:Ht,tableView:ii,can:t});ii&&Ai?.render(i,wi,t&&!xe.inHand&&!xe.pending),su=requestAnimationFrame(Mf)}var Sf=new ResizeObserver(()=>{let r=we("game").getBoundingClientRect().height;r&&document.body.style.setProperty("--billiards-controls-height",Math.ceil(r+16)+"px")});Sf.observe(we("game"));su=requestAnimationFrame(Mf);window.PokerBilliards={inspect:()=>({mode:Ht,ready:Ei,tableView:ii,equipment:g0.inspect(),rules:On.inspect(),shotTools:cl.inspect(),angle:wi,state:structuredClone(xe)})};window.addEventListener("pagehide",()=>{cancelAnimationFrame(su),Sf.disconnect(),oa(),Ai?.dispose()});})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
