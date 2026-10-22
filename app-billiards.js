(()=>{var Tu=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],us=Number.isFinite,ur=i=>i===8?null:i<8?0:1;function Sl(i,e,t){return!i.inHand||i.moving||i.winner!==null||!us(e)||!us(t)||e<15||e>985||t<15||t>485||i.balls.some(n=>n.id&&!n.pocket&&Math.hypot(n.x-e,n.y-t)<21)||Tu.some(n=>Math.hypot(n[0]-e,n[1]-t)<28)?!1:(Object.assign(i.balls[0],{x:e,y:t,vx:0,vy:0,pocket:!1}),i.inHand=!1,i.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function bl(i,e,t){if(i.moving||i.inHand||i.winner!==null||!us(e)||!us(t)||t<.05||t>1)return!1;Object.assign(i.balls[0],{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),i.moving=!0,i.firstHit=null,i.sunk=[],i.scratch=!1;let n=i.groups[i.turn];return i.eightReady=n!==null&&!i.balls.some(r=>r.id&&r.id!==8&&!r.pocket&&ur(r.id)===n),i.legalFirst=i.eightReady?[8]:i.balls.filter(r=>r.id&&r.id!==8&&!r.pocket&&(n===null||ur(r.id)===n)).map(r=>r.id),i.shot++,i.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0}function zf(i){i.moving=!1;let e=i.turn,t=i.groups[e],n=i.balls.some(a=>!a.pocket&&a.id&&a.id!==8&&ur(a.id)===t),r=i.scratch||i.firstHit===null||!i.legalFirst.includes(i.firstHit);if(i.sunk.includes(8)){i.winner=!r&&i.eightReady?e:1-e,i.message="\u0418\u0433\u0440\u043E\u043A "+(i.winner+1)+" \u043F\u043E\u0431\u0435\u0434\u0438\u043B"+(i.winner!==e?" \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0437\u0430\u0431\u0438\u0442\u0430 \u0440\u0430\u043D\u044C\u0448\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0438\u043B\u0438 \u0441 \u0444\u043E\u043B\u043E\u043C":"");return}!r&&t===null&&i.sunk.some(a=>a!==8)&&(i.groups[e]=ur(i.sunk.find(a=>a!==8)),i.groups[1-e]=1-i.groups[e]),i.scores=[0,1].map(a=>i.balls.filter(o=>o.id&&o.id!==8&&o.pocket&&ur(o.id)===i.groups[a]).length);let s=!r&&i.sunk.some(a=>ur(a)===i.groups[e]);s||(i.turn=1-e),r?(i.inHand=!0,i.balls[0].pocket=!0,i.message="\u0424\u043E\u043B \xB7 \u0438\u0433\u0440\u043E\u043A "+(i.turn+1)+" \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0431\u0438\u0442\u043E\u043A"):i.message="\u0425\u043E\u0434 \u0438\u0433\u0440\u043E\u043A\u0430 "+(i.turn+1)+(s?" \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":"")}function wu(i,e=1/120){if(i.moving){e=Math.min(Math.max(e,0),1/120);for(let t of i.balls){if(t.pocket)continue;t.x+=t.vx*e,t.y+=t.vy*e;let n=Math.hypot(t.vx,t.vy),r=Math.max(0,n-135*e);if(n&&(t.vx*=r/n,t.vy*=r/n),Tu.some(([s,a])=>Math.hypot(t.x-s,t.y-a)<24)){t.pocket=!0,t.vx=t.vy=0,t.id===0?i.scratch=!0:i.sunk.push(t.id);continue}t.x<10&&(t.x=10,t.vx=Math.abs(t.vx)*.84),t.x>990&&(t.x=990,t.vx=-Math.abs(t.vx)*.84),t.y<10&&(t.y=10,t.vy=Math.abs(t.vy)*.84),t.y>490&&(t.y=490,t.vy=-Math.abs(t.vy)*.84)}for(let t=0;t<i.balls.length;t++)for(let n=t+1;n<i.balls.length;n++){let r=i.balls[t],s=i.balls[n];if(r.pocket||s.pocket)continue;let a=s.x-r.x,o=s.y-r.y,l=Math.hypot(a,o);if(l>=20)continue;l=Math.max(l,.001);let c=a/l,h=o/l,u=(20-l)/2+.001;r.x-=c*u,r.y-=h*u,s.x+=c*u,s.y+=h*u;let p=(r.vx-s.vx)*c+(r.vy-s.vy)*h;if(p>0){r.id===0&&i.firstHit===null&&(i.firstHit=s.id),s.id===0&&i.firstHit===null&&(i.firstHit=r.id);let d=p*.98;r.vx-=d*c,r.vy-=d*h,s.vx+=d*c,s.vy+=d*h}}i.balls.every(t=>t.pocket||Math.hypot(t.vx,t.vy)<1)&&(i.balls.forEach(t=>t.vx=t.vy=0),zf(i))}}function Eu(i,e,t){return e!==i.turn||!t||typeof t!="object"?!1:t.type==="shot"?bl(i,t.angle,t.power):t.type==="place"?Sl(i,t.x,t.y):!1}function Au(i){return!!i&&[0,1].includes(i.turn)&&Array.isArray(i.balls)&&i.balls.length===16&&new Set(i.balls.map(e=>e.id)).size===16&&i.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(us)&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3)&&Array.isArray(i.groups)&&i.groups.length===2&&i.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(i.scores)&&i.scores.length===2&&i.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=7)&&(i.winner===null||i.winner===0||i.winner===1)&&typeof i.message=="string"&&i.message.length<250}var Ru=Object.freeze({pool8:Object.freeze({name:"\u041F\u0443\u043B \xB7 9 \u0444\u0443\u0442\u043E\u0432",length:2540,ball:57.15,corner:114.3,side:127,cornerShelf:38.1,sideShelf:6.35,cornerFlare:7,sideFlare:14,restitution:.86}),pyramid:Object.freeze({name:"\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430 \xB7 12 \u0444\u0443\u0442\u043E\u0432",length:3560,ball:68,corner:72.5,side:82.5,cornerShelf:5.5,sideShelf:0,cornerFlare:0,sideFlare:0,restitution:.84})}),Li=i=>Ru[typeof i=="string"?i:i.discipline]||Ru.pool8,Tl=new Map;function dr(i){let e=Li(i),t=e.name;if(Tl.has(t))return Tl.get(t);let n=1e3/e.length,r=e.ball/2*n,s=e.corner*n,a=e.side*n,o=s/Math.SQRT2,l=a/2,c=[[[o,0],[500-l,0],2],[[500+l,0],[1e3-o,0],2],[[o,500],[500-l,500],3],[[500+l,500],[1e3-o,500],3],[[0,o],[0,500-o],0],[[1e3,o],[1e3,500-o],1]].map(([d,m,v])=>({a:d,b:m,side:v,jaw:!1})),h=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],u=h.map(([d,m],v)=>{let f=v%3===1,g=f?[0,m===0?1:-1]:[d===0?Math.SQRT1_2:-Math.SQRT1_2,m===0?Math.SQRT1_2:-Math.SQRT1_2],_=[-g[1],g[0]],x=f?a:s,y=f?[d,m]:[d+g[0]*o/Math.SQRT2,m+g[1]*o/Math.SQRT2],T=(f?e.sideShelf:e.cornerShelf)*n,R=T+r*1.4,N=Math.tan((f?e.sideFlare:e.cornerFlare)*Math.PI/180),U=[-1,1].map(C=>y.map((O,z)=>O+_[z]*x/2*C));for(let[C,O]of U.entries()){let z=C===0?-1:1,F=O.map((Z,G)=>Z-g[G]*R-_[G]*z*N*R);c.push({a:O,b:F,side:f?m===0?2:3:Math.abs(O[0]-d)<.01?d===0?0:1:m===0?2:3,jaw:!0})}return{index:v,center:y,n:g,t:_,mouth:x,shelf:T,ends:U,drop:y.map((C,O)=>C-g[O]*(T+r*.7))}}),p={spec:e,scale:n,r,rails:c,pockets:u};return Tl.set(t,p),p}function Cu(i,e){for(let t of e.pockets){let n=i.x-t.center[0],r=i.y-t.center[1],s=n*t.n[0]+r*t.n[1],a=n*t.t[0]+r*t.t[1];if(s<-(t.shelf+e.r*.6)&&Math.abs(a)<t.mouth/2-e.r*.99)return t.index}return-1}function Iu(i,e){let t=e.b[0]-e.a[0],n=e.b[1]-e.a[1],r=t*t+n*n,s=Math.max(0,Math.min(1,((i.x-e.a[0])*t+(i.y-e.a[1])*n)/r));return{x:e.a[0]+t*s,y:e.a[1]+n*s}}var Pu=(i,e)=>Math.max(-e,Math.min(e,i));function Lu(i){return i===void 0||!!i&&typeof i=="object"&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&Math.hypot(i.x,i.y)<=1.000001}function Nu(i,e,t,n={x:0,y:0}){let r=1.625*n.y*t;i.rollX=Math.cos(e)*r,i.rollY=Math.sin(e)*r,i.side=-1.625*n.x*t}function Du(i,e,t){let n=981e4/Li(t).length,r=i.vx-(i.rollX||0),s=i.vy-(i.rollY||0),a=Math.hypot(r,s);if(a>.05){let o=Math.min(.2*n*e,a/3.5),l=r/a*o,c=s/a*o;i.vx-=l,i.vy-=c,i.rollX=(i.rollX||0)+2.5*l,i.rollY=(i.rollY||0)+2.5*c}else{let o=Math.hypot(i.vx,i.vy),l=Math.max(0,o-.018*n*e);o&&(i.vx*=l/o,i.vy*=l/o),i.rollX=i.vx,i.rollY=i.vy}i.side=Math.sign(i.side||0)*Math.max(0,Math.abs(i.side||0)-.018*n*e)}function Uu(i,e,t,n){let r=i.vx*e+i.vy*t;if(r>=0)return!1;let s=-(1+n)*r,a=-t,o=e,l=i.vx*a+i.vy*o-(i.side||0),c=Pu(-l/3.5,.14*s);return i.vx+=s*e+c*a,i.vy+=s*t+c*o,i.side=(i.side||0)-2.5*c,!0}function Ou(i,e,t,n,r){let s=-n,a=t,o=(i.vx-e.vx)*s+(i.vy-e.vy)*a+(i.side||0)+(e.side||0),l=Pu(o/7,.04*r);i.vx-=l*s,i.vy-=l*a,e.vx+=l*s,e.vy+=l*a,i.side=(i.side||0)-2.5*l,e.side=(e.side||0)-2.5*l}function Sa(i){i.rollX=i.rollY=i.side=0}function Fu(i){return Math.hypot(i.vx-(i.rollX||0),i.vy-(i.rollY||0))>1}var ui=1e3,di=500,wl=10,El=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],ku=["pool8","pyramid"],ds=i=>i===8||i===0?null:i<8?0:1,Nt=i=>dr(i).r,Hf=i=>i.balls.find(e=>e.id===(i.cueId??0));function ps(i={}){let e=i.discipline||"pool8";if(!ku.includes(e))throw Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0430");let t=e==="pyramid"&&i.color==="red"?"red":e==="pyramid"?"yellow":"standard",n=Nt({discipline:e}),r=(Number(i.seed)||1)>>>0,s=()=>(r=r*1664525+1013904223>>>0,r/4294967296),a=Array.from({length:15},(c,h)=>h+1);for(let c=14;c>0;c--){let h=Math.floor(s()*(c+1));[a[c],a[h]]=[a[h],a[c]]}if(e==="pool8"){let c=a.indexOf(8);[a[4],a[c]]=[8,a[4]];let h=a.find(p=>p<8),u=a.find(p=>p>8);for(let[p,d]of[[h,10],[u,14]]){let m=a.indexOf(p);[a[d],a[m]]=[p,a[d]]}}let o=[{id:0,x:230,y:250,vx:0,vy:0,pocket:!1}],l=0;for(let c=0;c<5;c++)for(let h=0;h<=c;h++)o.push({id:a[l++],x:750+c*(2*n+.05)*Math.sqrt(3)/2,y:250+(h-c/2)*(2*n+.05),vx:0,vy:0,pocket:!1});return{rulesVersion:2,discipline:e,color:t,seed:Number(i.seed)||1,balls:o,turn:i.breaker===1?1:0,breaker:i.breaker===1?1:0,cueId:0,groups:[null,null],scores:[0,0],captured:[[],[]],moving:!1,inHand:!1,handZone:null,winner:null,shot:0,breakPending:!0,message:"\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430 \xB7 \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A",firstHit:null,sunk:[],scratch:!1,pending:null}}function zu(i){return!i.moving&&i.winner===null&&!i.pending}function Ta(i,e,t){if(!i.rulesVersion)return Sl(i,e,t);let n=Nt(i),r=Hf(i);return!zu(i)||!i.inHand&&!i.breakPending||!r||![e,t].every(Number.isFinite)||e<n||e>ui-n||t<n||t>di-n||(i.handZone==="head"||i.breakPending)&&e>=250||i.balls.some(s=>s.id!==r.id&&!s.pocket&&Math.hypot(s.x-e,s.y-t)<n*2+.05)||El.some(s=>Math.hypot(s[0]-e,s[1]-t)<25)?!1:(Object.assign(r,{x:e,y:t,vx:0,vy:0,pocket:!1}),i.nextHeadShot=i.handZone==="head",i.inHand=!1,i.handZone=null,Sa(r),i.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function Vf(i,e){let t=[];return i.x<=e+.2&&t.push(0),i.x>=ui-e-.2&&t.push(1),i.y<=e+.2&&t.push(2),i.y>=di-e-.2&&t.push(3),t}function Ni(i){if(i.discipline==="pyramid")return i.balls.filter(n=>!n.pocket&&n.id!==(i.cueId??0));let e=i.groups[i.turn],t=i.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||ds(n.id)===e));return e===null&&[0,1].some(n=>!i.balls.some(r=>!r.pocket&&ds(r.id)===n))?[...t,...i.balls.filter(n=>n.id===8&&!n.pocket)]:t.length?t:i.balls.filter(n=>n.id===8&&!n.pocket)}function Al(i,e,t,n={}){if(!i.rulesVersion)return bl(i,e,t);if(!Lu(n.spin)||!zu(i)||i.inHand||![e,t].every(Number.isFinite)||t<.05||t>1)return!1;let r=i.discipline==="pyramid"&&!i.breakPending?n.cueId??i.cueId:0,s=i.balls.find(c=>c.id===r&&!c.pocket);if(!s||i.breakPending&&s.x>=250)return!1;i.cueId=r;let a=Ni(i).map(c=>c.id),o=i.breakPending,l=n.safety===!0;return i.discipline==="pool8"&&!o&&!l&&(!a.includes(n.callBall)||!Number.isInteger(n.callPocket)||n.callPocket<0||n.callPocket>5)?!1:(i.headShot=!!i.nextHeadShot||o,i.nextHeadShot=!1,i.headExited=s.x>=250,i.illegalHead=!1,i.lastShooter=i.turn,i.call=o?null:{ball:n.callBall,pocket:n.callPocket,safety:l},i.legalFirst=o?i.balls.filter(c=>c.id).map(c=>c.id):a,i.eightReady=i.discipline==="pool8"&&a.includes(8),Object.assign(s,{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),i.spin=n.spin?{x:n.spin.x,y:n.spin.y}:{x:0,y:0},Nu(s,e,180+t*1250,i.spin),i.contacts={balls:0,rails:0,jaws:0},i.moving=!0,i.firstHit=null,i.sunk=[],i.pots=[],i.scratch=!1,i.railAfter=!1,i.breakRails=[],i.breakCross=[],i.tracks=Object.fromEntries(i.balls.map(c=>[c.id,{rails:[],cross:!1,frozen:Vf(c,Nt(i))}])),i.pyramidLegal=!1,i.wasBreak=o,i.breakPending=!1,i.shot++,i.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0)}function Gu(i,e){let t=i.balls.find(r=>r.id===e),n=Nt(i);if(t){for(let r of[1,-1])for(let s=750;r>0?s<ui-n:s>n;s+=r*(2*n+.1))if(!i.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-s,a.y-250)<2*n+.05)){Object.assign(t,{x:s,y:250,vx:0,vy:0,pocket:!1});return}for(let r=n+1;r<ui-n;r+=2*n+1)for(let s=n+1;s<di-n;s+=2*n+1)if(!i.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-r,a.y-s)<2*n+.05)){Object.assign(t,{x:r,y:s,vx:0,vy:0,pocket:!1});return}}}function ba(i){i.captured=i.groups.map(e=>e===null?[]:i.balls.filter(t=>t.pocket&&ds(t.id)===e).map(t=>t.id).sort((t,n)=>t-n)),i.scores=i.captured.map(e=>e.length)}function Rl(i,e){i.winner=e,i.message="\u0418\u0433\u0440\u043E\u043A "+(e+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B \u043F\u0430\u0440\u0442\u0438\u044E"}function Wf(i){let e=i.turn,t=i.wasBreak,n=i.scratch||i.illegalHead||i.firstHit===null||!i.legalFirst.includes(i.firstHit)||!t&&!i.sunk.length&&!i.railAfter,r=i.sunk.includes(8);if(t){r&&Gu(i,8);let o=!i.sunk.length&&i.breakRails.length<4;if(n||o||r){let l=n||o?1-e:e;i.turn=l,i.pending={type:"pool-break",offender:e,foul:n,illegal:o,eight:r},i.message=n?"\u0424\u043E\u043B \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":o?"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":"\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",ba(i);return}i.turn=i.sunk.length?e:1-e,i.message=i.sunk.length?"\u0420\u0430\u0437\u0431\u043E\u0439 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \xB7 \u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430",ba(i);return}let s=i.call&&!i.call.safety&&(i.pots||[]).some(o=>o.id===i.call.ball&&o.pocket===i.call.pocket);if(r){if(i.groups[e]===null&&i.eightReady&&!n&&s){let o=[0,1].find(l=>!i.balls.some(c=>!c.pocket&&ds(c.id)===l));i.groups[e]=o,i.groups[1-e]=1-o}ba(i),Rl(i,!n&&i.eightReady&&s?e:1-e);return}!n&&s&&i.groups[e]===null&&(i.groups[e]=ds(i.call.ball),i.groups[1-e]=1-i.groups[e]),ba(i);let a=!n&&s;a||(i.turn=1-e),n?(i.inHand=!0,i.handZone="any",i.cueId=0,i.balls.find(o=>o.id===0).pocket=!0,i.message="\u0424\u043E\u043B \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435"):i.message=a?"\u0428\u0430\u0440 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":i.call?.safety?"\u041E\u0442\u044B\u0433\u0440\u044B\u0448 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"}function Xf(i){let e=i.turn,t=i.wasBreak,n=i.sunk.length>0||i.breakRails.length>=3||i.breakRails.length>=2&&i.breakCross.length>0;if(i.firstHit===null||t&&!n||!t&&!i.sunk.length&&!i.pyramidLegal){for(let s of i.sunk)Gu(i,s);i.turn=1-e,i.pending={type:"pyramid-foul",offender:e,illegalBreak:t&&!n},i.message="\u0428\u0442\u0440\u0430\u0444 \xB7 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443";return}for(let s of i.sunk)i.captured[e].includes(s)||i.captured[e].push(s);if(i.scores=i.captured.map(s=>s.length),i.scores[e]>=8){Rl(i,e);return}i.sunk.length||(i.turn=1-e),i.cueId=i.balls.find(s=>!s.pocket)?.id??0,i.message=i.sunk.length?"\u0428\u0430\u0440\u044B \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D\u044B \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430 \xB7 \u0431\u0438\u0442\u043E\u043A \u2014 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440"}function jf(i){i.moving=!1;for(let e of i.balls)Sa(e);i.lastShot={player:i.lastShooter,potted:[...i.sunk],contacts:{...i.contacts},spin:{...i.spin}},i.discipline==="pyramid"?Xf(i):Wf(i),delete i.tracks}function qf(i,e,t){if(i.firstHit===null)return;i.railAfter=!0,e.id!==i.cueId&&!i.breakRails.includes(e.id)&&i.breakRails.push(e.id);let n=i.tracks[e.id];(n.cross||n.rails.some(r=>r!==t))&&(i.pyramidLegal=!0),n.rails.includes(t)||n.rails.push(t)}function Yf(i,e){if(i.firstHit===null)return;let t=i.tracks[e.id];t.rails.length&&(i.pyramidLegal=!0),t.cross=!0,e.id!==i.cueId&&!i.breakCross.includes(e.id)&&i.breakCross.push(e.id)}function Zf(i,e,t){if(i.firstHit===null&&(e.id===i.cueId?(i.firstHit=t.id,i.headShot&&!i.headExited&&t.x<250&&(i.illegalHead=!0)):t.id===i.cueId&&(i.firstHit=e.id,i.headShot&&!i.headExited&&e.x<250&&(i.illegalHead=!0))),i.firstHit===null)return;let n=i.tracks[e.id],r=i.tracks[t.id];for(let[o,l]of[[n,r],[r,n]])l.frozen.some(c=>o.cross||o.rails.some(h=>h!==c))&&(i.pyramidLegal=!0);let s=[...new Set([...n.rails,...r.rails])],a=n.cross||r.cross;n.rails=[...s],r.rails=[...s],n.cross=r.cross=a}function wa(i,e=1/120){if(!i.rulesVersion)return wu(i,e);if(!i.moving)return;e=Math.min(Math.max(e,0),1/120);let t=dr(i),n=t.r,r=Math.max(...i.balls.map(o=>Math.hypot(o.vx,o.vy))),s=Math.max(1,Math.min(12,Math.ceil(r*e/(n*.3)))),a=e/s;for(let o=0;o<s;o++){for(let l of i.balls){if(l.pocket)continue;let c=l.x;l.x+=l.vx*a,l.y+=l.vy*a,l.id===i.cueId&&l.x>=250&&(i.headExited=!0),(c-500)*(l.x-500)<0&&Yf(i,l),Du(l,a,i);for(let u of t.rails){let p=Iu(l,u),d=l.x-p.x,m=l.y-p.y,v=Math.hypot(d,m);if(v>=n||v<1e-5)continue;let f=d/v,g=m/v;l.x=p.x+f*(n+1e-4),l.y=p.y+g*(n+1e-4),Uu(l,f,g,t.spec.restitution)&&(qf(i,l,u.side),i.contacts&&i.contacts[u.jaw||Math.hypot(p.x-u.a[0],p.y-u.a[1])<.001||Math.hypot(p.x-u.b[0],p.y-u.b[1])<.001?"jaws":"rails"]++)}let h=Cu(l,t);h>=0&&(l.pocket=!0,l.vx=l.vy=0,Sa(l),i.pots.push({id:l.id,pocket:h}),l.id===i.cueId&&(i.scratch=!0),(i.discipline==="pyramid"||l.id!==0)&&i.sunk.push(l.id))}for(let l=0;l<i.balls.length;l++)for(let c=l+1;c<i.balls.length;c++){let h=i.balls[l],u=i.balls[c];if(h.pocket||u.pocket)continue;let p=u.x-h.x,d=u.y-h.y,m=Math.hypot(p,d);if(m>=n*2)continue;m=Math.max(m,.001);let v=p/m,f=d/m,g=(n*2-m)/2+.001;h.x-=v*g,h.y-=f*g,u.x+=v*g,u.y+=f*g;let _=(h.vx-u.vx)*v+(h.vy-u.vy)*f;if(_>0){Zf(i,h,u),i.contacts&&i.contacts.balls++;let x=_*.98;h.vx-=x*v,h.vy-=x*f,u.vx+=x*v,u.vy+=x*f,Ou(h,u,v,f,x)}}}i.balls.every(o=>o.pocket||Math.hypot(o.vx,o.vy)<1&&!Fu(o))&&(i.balls.forEach(o=>o.vx=o.vy=0),jf(i))}function Bu(i,e,t=!1){let n={scores:i.scores,captured:i.captured},r=ps({discipline:i.discipline,color:i.color,seed:i.seed+1,breaker:e});if(t){r.scores=n.scores,r.captured=n.captured;for(let l of n.captured.flat())r.balls.find(c=>c.id===l).pocket=!0;let s=r.balls.filter(l=>!l.pocket),a=s.find(l=>l.id===0);if(!a){a=s[0];let l=r.captured.find(c=>c.includes(0));l[l.indexOf(0)]=a.id,a.pocket=!0,a=r.balls.find(c=>c.id===0),a.pocket=!1}Object.assign(a,{x:230,y:250});let o=0;for(let l=0;l<5;l++)for(let c=0;c<=l;c++){let h=s.filter(u=>u.id!==a.id&&!u.pocket)[o++];h&&Object.assign(h,{x:750+l*(Nt(r)*2+.05)*Math.sqrt(3)/2,y:250+(c-l/2)*(Nt(r)*2+.05)})}}Object.keys(i).forEach(s=>delete i[s]),Object.assign(i,r)}function Kf(i,e){let t=i.pending;if(!t||i.moving||i.winner!==null)return!1;if(t.type==="pool-break"){if(!(t.illegal?["accept",...t.foul?["hand"]:[],"rerack-self","rerack-opponent"]:t.eight?["accept","rerack-self"]:["accept","hand"]).includes(e.choice))return!1;let r=i.turn;return i.pending=null,e.choice.startsWith("rerack")?(Bu(i,e.choice==="rerack-self"?r:1-r),!0):((e.choice==="hand"||t.eight&&t.foul||i.balls.find(s=>s.id===0).pocket)&&(i.inHand=!0,i.handZone="head",i.cueId=0),i.message=i.inHand?"\u0420\u0430\u0437\u0431\u043E\u0439 \xB7 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437",!0)}if(t.type==="pyramid-foul"){if(!["play","pass",...t.illegalBreak?["rerack-self","rerack-opponent"]:[]].includes(e.choice))return!1;let n=i.balls.find(s=>s.id===e.ballId&&!s.pocket);if(!n)return!1;let r=i.turn;return n.pocket=!0,i.captured[r].push(n.id),i.scores=i.captured.map(s=>s.length),i.pending=null,i.scores[r]>=8?(Rl(i,r),!0):e.choice.startsWith("rerack")?(Bu(i,e.choice==="rerack-self"?r:1-r,!0),!0):(i.turn=e.choice==="pass"?t.offender:r,i.cueId=i.balls.find(s=>!s.pocket)?.id??0,i.message="\u0428\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440 \u0441\u043D\u044F\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A",!0)}return!1}function Di(i,e,t){return i.rulesVersion?e!==i.turn||!t||typeof t!="object"?!1:t.type==="decision"?Kf(i,t):t.type==="shot"?Al(i,t.angle,t.power,t):t.type==="place"?Ta(i,t.x,t.y):!1:Eu(i,e,t)}function Cl(i){return i?.rulesVersion?i.rulesVersion===2&&ku.includes(i.discipline)&&[0,1].includes(i.turn)&&Array.isArray(i.balls)&&i.balls.length===16&&new Set(i.balls.map(e=>e.id)).size===16&&i.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(Number.isFinite)&&["rollX","rollY","side"].every(t=>e[t]===void 0||Number.isFinite(e[t]))&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3&&typeof e.pocket=="boolean")&&Array.isArray(i.groups)&&i.groups.length===2&&i.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(i.scores)&&i.scores.length===2&&i.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=16)&&Array.isArray(i.captured)&&i.captured.length===2&&i.captured.every(e=>Array.isArray(e)&&e.every(t=>Number.isInteger(t)&&t>=0&&t<16))&&(i.winner===null||i.winner===0||i.winner===1)&&typeof i.message=="string"&&i.message.length<250:Au(i)}function Hu({request:i,onUpdate:e,onError:t}){let n=!1,r=null,s="",a=0,o=!1;function l(h){n||h.revision<a||(s=h.roomId,a=h.revision,e(h))}async function c(){if(clearTimeout(r),!(n||!s))try{l(await i({action:"room",roomId:s}))}catch(h){n||t(h.message)}finally{n||(clearTimeout(r),r=setTimeout(c,800))}}return{async start(h,u,p={}){try{let d=await i(h?{action:"create",...p}:{action:"join",roomId:u});if(l(d),h&&p.challenge)try{await i({action:"challenge",roomId:d.roomId}),n||e({...d,challengeSent:!0})}catch(m){n||t(m.message)}n||(clearTimeout(r),r=setTimeout(c,800))}catch(d){n||t(d.message,!0)}},async move(h,u=!1){if(!(n||o||!s)){o=!0;try{l(await i({action:u?"rematch":"move",roomId:s,revision:a,...u?{}:{move:h}}))}catch(p){n||(t(p.message),c())}finally{o=!1}}},close(){n=!0,clearTimeout(r)}}}var Nd=0,bc=1,Dd=2;var Tc=1,Go=2,Un=3,wi=0,Kt=1,sn=2,Ei=0,aa=1,wc=2,Ec=3,Ac=4,Ud=5,Xr=100,Od=101,Fd=102,Bd=103,kd=104,zd=200,Gd=201,Hd=202,Vd=203,Wd=204,Xd=205,jd=206,qd=207,Yd=208,Zd=209,Kd=210,Jd=211,$d=212,Qd=213,ep=214,Ho=0,Vo=1,Wo=2,oa=3,Xo=4,jo=5,qo=6,Yo=7,tp=0,np=1,ip=2,oi=0,rp=1,sp=2,ap=3,Zo=4,op=5,lp=6,cp=7,lc="attached",hp="detached",Rc=300,jr=301,Ki=302,Ai=303,Ko=304,la=306,tn=1e3,xi=1001,Rr=1002,Yt=1003,Jo=1004;var Ji=1005;var Vt=1006,qr=1007;var On=1008;var Fn=1009,Cc=1010,Ic=1011,Yr=1012,$o=1013,$i=1014,an=1015,Zr=1016,Qo=1017,el=1018,Kr=1020,Pc=35902,Lc=35899,up=1021,dp=1022,on=1023,ca=1026,ha=1027,tl=1028,nl=1029,pp=1030,Nc=1031;var Dc=1033,il=33776,rl=33777,sl=33778,al=33779,Uc=35840,Oc=35841,Fc=35842,Bc=35843,kc=36196,zc=37492,Gc=37496,Hc=37808,Vc=37809,Wc=37810,Xc=37811,jc=37812,qc=37813,Yc=37814,Zc=37815,Kc=37816,Jc=37817,$c=37818,Qc=37819,eh=37820,th=37821,nh=36492,ih=36494,rh=36495,sh=36283,ah=36284,oh=36285,lh=36286;var zi=2300,Gi=2301,no=2302,cc=2400,hc=2401,uc=2402;var ch=0,ua=1,Jr=2;var fp=3201;var mp=0,gp=1,Qi="",st="srgb",Pt="srgb-linear",Es="linear",rt="srgb";var ki=7680;var _p=512,vp=513,xp=514,hh=515,yp=516,Mp=517,Sp=518,bp=519,io=35044;var uh="300 es",ni=2e3,As=2001;var ii=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vu=1234567,Er=Math.PI/180,Hi=180/Math.PI;function en(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Dt[255&i]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[255&e]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[63&t|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[255&n]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function dc(i,e){return(i%e+e)%e}function bs(i,e,t){return(1-t)*i+t*e}function gn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function it(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}var dh={DEG2RAD:Er,RAD2DEG:Hi,generateUUID:en,clamp:Ge,euclideanModulo:dc,mapLinear:function(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)},inverseLerp:function(i,e,t){return i!==e?(t-i)/(e-i):0},lerp:bs,damp:function(i,e,t,n){return bs(i,e,1-Math.exp(-t*n))},pingpong:function(i,e=1){return e-Math.abs(dc(i,2*e)-e)},smoothstep:function(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e))*i*(3-2*i)},smootherstep:function(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e))*i*i*(i*(6*i-15)+10)},randInt:function(i,e){return i+Math.floor(Math.random()*(e-i+1))},randFloat:function(i,e){return i+Math.random()*(e-i)},randFloatSpread:function(i){return i*(.5-Math.random())},seededRandom:function(i){i!==void 0&&(Vu=i);let e=Vu+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(i){return i*Er},radToDeg:function(i){return i*Hi},isPowerOfTwo:function(i){return!(i&i-1)&&i!==0},ceilPowerOfTwo:function(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))},floorPowerOfTwo:function(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))},setQuaternionFromProperEuler:function(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),p=a((e-n)/2),d=s((n-e)/2),m=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*u,l*p,o*c);break;case"YZY":i.set(l*p,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*p,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}},normalize:it,denormalize:gn},ie=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Wt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3],p=s[a+0],d=s[a+1],m=s[a+2],v=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=p,e[t+1]=d,e[t+2]=m,void(e[t+3]=v);if(u!==v||l!==p||c!==d||h!==m){let f=1-o,g=l*p+c*d+h*m+u*v,_=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let T=Math.sqrt(x),R=Math.atan2(T,g*_);f=Math.sin(f*R)/T,o=Math.sin(o*R)/T}let y=o*_;if(l=l*f+p*y,c=c*f+d*y,h=h*f+m*y,u=u*f+v*y,f===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[a],p=s[a+1],d=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*d-c*p,e[t+1]=l*m+h*p+c*u-o*d,e[t+2]=c*m+h*d+o*p-l*u,e[t+3]=h*m-o*u-l*p-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),u=o(s/2),p=l(n/2),d=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=p*h*u+c*d*m,this._y=c*d*u-p*h*m,this._z=c*h*m+p*d*u,this._w=c*h*u-p*d*m;break;case"YXZ":this._x=p*h*u+c*d*m,this._y=c*d*u-p*h*m,this._z=c*h*m-p*d*u,this._w=c*h*u+p*d*m;break;case"ZXY":this._x=p*h*u-c*d*m,this._y=c*d*u+p*h*m,this._z=c*h*m+p*d*u,this._w=c*h*u-p*d*m;break;case"ZYX":this._x=p*h*u-c*d*m,this._y=c*d*u+p*h*m,this._z=c*h*m-p*d*u,this._w=c*h*u+p*d*m;break;case"YZX":this._x=p*h*u+c*d*m,this._y=c*d*u+p*h*m,this._z=c*h*m-p*d*u,this._w=c*h*u-p*d*m;break;case"XZY":this._x=p*h*u-c*d*m,this._y=c*d*u-p*h*m,this._z=c*h*m+p*d*u,this._w=c*h*u+p*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],p=n+o+u;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=r*u+this._y*p,this._z=s*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=r+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Il.copy(this).projectOnVector(e),this.sub(Il)}reflect(e){return this.sub(Il.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Il=new w,Wu=new Wt,ze=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],d=n[5],m=n[8],v=r[0],f=r[3],g=r[6],_=r[1],x=r[4],y=r[7],T=r[2],R=r[5],N=r[8];return s[0]=a*v+o*_+l*T,s[3]=a*f+o*x+l*R,s[6]=a*g+o*y+l*N,s[1]=c*v+h*_+u*T,s[4]=c*f+h*x+u*R,s[7]=c*g+h*y+u*N,s[2]=p*v+d*_+m*T,s[5]=p*f+d*x+m*R,s[8]=p*g+d*y+m*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,p=o*l-h*s,d=c*s-a*l,m=t*u+n*p+r*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=u*v,e[1]=(r*c-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=p*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pl.makeScale(e,t)),this}rotate(e){return this.premultiply(Pl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pl=new ze;function ph(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Tp(){let i=Cr("canvas");return i.style.display="block",i}var Xu={};function Ir(i){i in Xu||(Xu[i]=!0,console.warn(i))}function wp(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var ju=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jf(){let i={enabled:!0,workingColorSpace:Pt,spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===rt&&(r.r=ti(r.r),r.g=ti(r.g),r.b=ti(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=Ar(r.r),r.g=Ar(r.g),r.b=Ar(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?Es:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ir("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ir("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Pt]:{primaries:e,whitePoint:n,transfer:Es,toXYZ:ju,fromXYZ:qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:st},outputColorSpaceConfig:{drawingBufferColorSpace:st}},[st]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:ju,fromXYZ:qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:st}}}),i}var Ze=Jf();function ti(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Ar(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var pr,ro=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{pr===void 0&&(pr=Cr("canvas")),pr.width=e.width,pr.height=e.height;let r=pr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=pr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Cr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*ti(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ti(t[n]/255)):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},$f=0,Pr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=en(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ll(r[a].image)):s.push(Ll(r[a]))}else s=Ll(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ll(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ro.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Qf=0,Nl=new w,wt=class i extends ii{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=en(),this.name="",this.source=new Pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Nl).x}get height(){return this.source.getSize(Nl).y}get depth(){return this.source.getSize(Nl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tn:e.x=e.x-Math.floor(e.x);break;case xi:e.x=e.x<0?0:1;break;case Rr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case tn:e.y=e.y-Math.floor(e.y);break;case xi:e.y=e.y<0?0:1;break;case Rr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};wt.DEFAULT_IMAGE=null,wt.DEFAULT_MAPPING=Rc,wt.DEFAULT_ANISOTROPY=1;var Qe=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],u=l[8],p=l[1],d=l[5],m=l[9],v=l[2],f=l[6],g=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-v)<.01&&Math.abs(m-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+v)<.1&&Math.abs(m+f)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(d+1)/2,T=(g+1)/2,R=(h+p)/4,N=(u+v)/4,U=(m+f)/4;return x>y&&x>T?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=R/n,s=N/n):y>T?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=R/r,s=U/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=N/s,r=U/s),this.set(n,r,s,t),this}let _=Math.sqrt((f-m)*(f-m)+(u-v)*(u-v)+(p-h)*(p-h));return Math.abs(_)<.001&&(_=1),this.x=(f-m)/_,this.y=(u-v)/_,this.z=(p-h)/_,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},so=class extends ii{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new wt(r);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Pr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends so{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Rs=class extends wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ao=class extends wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Lt=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pn):pn.fromBufferAttribute(s,a),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ea.copy(n.boundingBox)),Ea.applyMatrix4(e.matrixWorld),this.union(Ea)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fs),Aa.subVectors(this.max,fs),fr.subVectors(e.a,fs),mr.subVectors(e.b,fs),gr.subVectors(e.c,fs),pi.subVectors(mr,fr),fi.subVectors(gr,mr),Ui.subVectors(fr,gr);let t=[0,-pi.z,pi.y,0,-fi.z,fi.y,0,-Ui.z,Ui.y,pi.z,0,-pi.x,fi.z,0,-fi.x,Ui.z,0,-Ui.x,-pi.y,pi.x,0,-fi.y,fi.x,0,-Ui.y,Ui.x,0];return!!Dl(t,fr,mr,gr,Aa)&&(t=[1,0,0,0,1,0,0,0,1],!!Dl(t,fr,mr,gr,Aa)&&(Ra.crossVectors(pi,fi),t=[Ra.x,Ra.y,Ra.z],Dl(t,fr,mr,gr,Aa)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(pn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},jn=[new w,new w,new w,new w,new w,new w,new w,new w],pn=new w,Ea=new Lt,fr=new w,mr=new w,gr=new w,pi=new w,fi=new w,Ui=new w,fs=new w,Aa=new w,Ra=new w,Oi=new w;function Dl(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Oi.fromArray(i,s);let o=r.x*Math.abs(Oi.x)+r.y*Math.abs(Oi.y)+r.z*Math.abs(Oi.z),l=e.dot(Oi),c=t.dot(Oi),h=n.dot(Oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var em=new Lt,ms=new w,Ul=new w,kt=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):em.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ms.subVectors(e,this.center);let t=ms.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(ms,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ul.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ms.copy(e.center).add(Ul)),this.expandByPoint(ms.copy(e.center).sub(Ul))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},qn=new w,Ol=new w,Ca=new w,mi=new w,Fl=new w,Ia=new w,Bl=new w,yi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ol.copy(e).add(t).multiplyScalar(.5),Ca.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(Ol);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ca),o=mi.dot(this.direction),l=-mi.dot(Ca),c=mi.lengthSq(),h=Math.abs(1-a*a),u,p,d,m;if(h>0)if(u=a*l-o,p=a*o-l,m=s*h,u>=0)if(p>=-m)if(p<=m){let v=1/h;u*=v,p*=v,d=u*(u+a*p+2*o)+p*(a*u+p+2*l)+c}else p=s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p=-s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p<=-m?(u=Math.max(0,-(-a*s+o)),p=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c):p<=m?(u=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+c):(u=Math.max(0,-(a*s+o)),p=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c);else p=a>0?-s:s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ol).addScaledVector(Ca,p),d}intersectSphere(e,t){qn.subVectors(e.center,this.origin);let n=qn.dot(this.direction),r=qn.dot(qn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),h>=0?(s=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,r,s){Fl.subVectors(t,e),Ia.subVectors(n,e),Bl.crossVectors(Fl,Ia);let a,o=this.direction.dot(Bl);if(o>0){if(r)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}mi.subVectors(this.origin,e);let l=a*this.direction.dot(Ia.crossVectors(mi,Ia));if(l<0)return null;let c=a*this.direction.dot(Fl.cross(mi));if(c<0||l+c>o)return null;let h=-a*mi.dot(Bl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pe=class i{constructor(e,t,n,r,s,a,o,l,c,h,u,p,d,m,v,f){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,u,p,d,m,v,f)}set(e,t,n,r,s,a,o,l,c,h,u,p,d,m,v,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=p,g[3]=d,g[7]=m,g[11]=v,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/_r.setFromMatrixColumn(e,0).length(),s=1/_r.setFromMatrixColumn(e,1).length(),a=1/_r.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let p=a*h,d=a*u,m=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+m*c,t[5]=p-v*c,t[9]=-o*l,t[2]=v-p*c,t[6]=m+d*c,t[10]=a*l}else if(e.order==="YXZ"){let p=l*h,d=l*u,m=c*h,v=c*u;t[0]=p+v*o,t[4]=m*o-d,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-m,t[6]=v+p*o,t[10]=a*l}else if(e.order==="ZXY"){let p=l*h,d=l*u,m=c*h,v=c*u;t[0]=p-v*o,t[4]=-a*u,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*h,t[9]=v-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let p=a*h,d=a*u,m=o*h,v=o*u;t[0]=l*h,t[4]=m*c-d,t[8]=p*c+v,t[1]=l*u,t[5]=v*c+p,t[9]=d*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let p=a*l,d=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-p*u,t[8]=m*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*u+m,t[10]=p-v*u}else if(e.order==="XZY"){let p=a*l,d=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=p*u+v,t[5]=a*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=o*h,t[10]=v*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tm,e,nm)}lookAt(e,t,n){let r=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),gi.crossVectors(n,jt),gi.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),gi.crossVectors(n,jt)),gi.normalize(),Pa.crossVectors(jt,gi),r[0]=gi.x,r[4]=Pa.x,r[8]=jt.x,r[1]=gi.y,r[5]=Pa.y,r[9]=jt.y,r[2]=gi.z,r[6]=Pa.z,r[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],d=n[13],m=n[2],v=n[6],f=n[10],g=n[14],_=n[3],x=n[7],y=n[11],T=n[15],R=r[0],N=r[4],U=r[8],C=r[12],O=r[1],z=r[5],F=r[9],Z=r[13],G=r[2],j=r[6],q=r[10],oe=r[14],ee=r[3],ye=r[7],we=r[11],Se=r[15];return s[0]=a*R+o*O+l*G+c*ee,s[4]=a*N+o*z+l*j+c*ye,s[8]=a*U+o*F+l*q+c*we,s[12]=a*C+o*Z+l*oe+c*Se,s[1]=h*R+u*O+p*G+d*ee,s[5]=h*N+u*z+p*j+d*ye,s[9]=h*U+u*F+p*q+d*we,s[13]=h*C+u*Z+p*oe+d*Se,s[2]=m*R+v*O+f*G+g*ee,s[6]=m*N+v*z+f*j+g*ye,s[10]=m*U+v*F+f*q+g*we,s[14]=m*C+v*Z+f*oe+g*Se,s[3]=_*R+x*O+y*G+T*ee,s[7]=_*N+x*z+y*j+T*ye,s[11]=_*U+x*F+y*q+T*we,s[15]=_*C+x*Z+y*oe+T*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],p=e[10],d=e[14];return e[3]*(+s*l*u-r*c*u-s*o*p+n*c*p+r*o*d-n*l*d)+e[7]*(+t*l*d-t*c*p+s*a*p-r*a*d+r*c*h-s*l*h)+e[11]*(+t*c*u-t*o*d-s*a*u+n*a*d+s*o*h-n*c*h)+e[15]*(-r*o*h-t*l*u+t*o*p+r*a*u-n*a*p+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],p=e[10],d=e[11],m=e[12],v=e[13],f=e[14],g=e[15],_=u*f*c-v*p*c+v*l*d-o*f*d-u*l*g+o*p*g,x=m*p*c-h*f*c-m*l*d+a*f*d+h*l*g-a*p*g,y=h*v*c-m*u*c+m*o*d-a*v*d-h*o*g+a*u*g,T=m*u*l-h*v*l-m*o*p+a*v*p+h*o*f-a*u*f,R=t*_+n*x+r*y+s*T;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/R;return e[0]=_*N,e[1]=(v*p*s-u*f*s-v*r*d+n*f*d+u*r*g-n*p*g)*N,e[2]=(o*f*s-v*l*s+v*r*c-n*f*c-o*r*g+n*l*g)*N,e[3]=(u*l*s-o*p*s-u*r*c+n*p*c+o*r*d-n*l*d)*N,e[4]=x*N,e[5]=(h*f*s-m*p*s+m*r*d-t*f*d-h*r*g+t*p*g)*N,e[6]=(m*l*s-a*f*s-m*r*c+t*f*c+a*r*g-t*l*g)*N,e[7]=(a*p*s-h*l*s+h*r*c-t*p*c-a*r*d+t*l*d)*N,e[8]=y*N,e[9]=(m*u*s-h*v*s-m*n*d+t*v*d+h*n*g-t*u*g)*N,e[10]=(a*v*s-m*o*s+m*n*c-t*v*c-a*n*g+t*o*g)*N,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*d-t*o*d)*N,e[12]=T*N,e[13]=(h*v*r-m*u*r+m*n*p-t*v*p-h*n*f+t*u*f)*N,e[14]=(m*o*r-a*v*r-m*n*l+t*v*l+a*n*f-t*o*f)*N,e[15]=(a*u*r-h*o*r+h*n*l-t*u*l-a*n*p+t*o*p)*N,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,p=s*c,d=s*h,m=s*u,v=a*h,f=a*u,g=o*u,_=l*c,x=l*h,y=l*u,T=n.x,R=n.y,N=n.z;return r[0]=(1-(v+g))*T,r[1]=(d+y)*T,r[2]=(m-x)*T,r[3]=0,r[4]=(d-y)*R,r[5]=(1-(p+g))*R,r[6]=(f+_)*R,r[7]=0,r[8]=(m+x)*N,r[9]=(f-_)*N,r[10]=(1-(p+v))*N,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=_r.set(r[0],r[1],r[2]).length(),a=_r.set(r[4],r[5],r[6]).length(),o=_r.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],fn.copy(this);let l=1/s,c=1/a,h=1/o;return fn.elements[0]*=l,fn.elements[1]*=l,fn.elements[2]*=l,fn.elements[4]*=c,fn.elements[5]*=c,fn.elements[6]*=c,fn.elements[8]*=h,fn.elements[9]*=h,fn.elements[10]*=h,t.setFromRotationMatrix(fn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-r),p=(t+e)/(t-e),d=(n+r)/(n-r),m,v;if(l)m=s/(a-s),v=a*s/(a-s);else if(o===ni)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==As)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),v=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-r),p=-(t+e)/(t-e),d=-(n+r)/(n-r),m,v;if(l)m=1/(a-s),v=a/(a-s);else if(o===ni)m=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==As)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),v=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_r=new w,fn=new Pe,tm=new w(0,0,0),nm=new w(1,1,1),gi=new w,Pa=new w,jt=new w,Yu=new Pe,Zu=new Wt,_n=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],p=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zu.setFromEuler(this),this.setFromQuaternion(Zu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER="XYZ";var Lr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},im=0,Ku=new w,vr=new Wt,Yn=new Pe,La=new w,gs=new w,rm=new w,sm=new Wt,Ju=new w(1,0,0),$u=new w(0,1,0),Qu=new w(0,0,1),ed={type:"added"},am={type:"removed"},xr={type:"childadded",child:null},kl={type:"childremoved",child:null},ct=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new w,t=new _n,n=new Wt,r=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pe},normalMatrix:{value:new ze}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vr.setFromAxisAngle(e,t),this.quaternion.multiply(vr),this}rotateOnWorldAxis(e,t){return vr.setFromAxisAngle(e,t),this.quaternion.premultiply(vr),this}rotateX(e){return this.rotateOnAxis(Ju,e)}rotateY(e){return this.rotateOnAxis($u,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ju,e)}translateY(e){return this.translateOnAxis($u,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(gs,La,this.up):Yn.lookAt(La,gs,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),vr.setFromRotationMatrix(Yn),this.quaternion.premultiply(vr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ed),xr.child=e,this.dispatchEvent(xr),xr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(am),kl.child=e,this.dispatchEvent(kl),kl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ed),xr.child=e,this.dispatchEvent(xr),xr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,e,rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,sm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};ct.DEFAULT_UP=new w(0,1,0),ct.DEFAULT_MATRIX_AUTO_UPDATE=!0,ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mn=new w,Zn=new w,zl=new w,Kn=new w,yr=new w,Mr=new w,td=new w,Gl=new w,Hl=new w,Vl=new w,Wl=new Qe,Xl=new Qe,jl=new Qe,$n=class i{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),mn.subVectors(e,t),r.cross(mn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){mn.subVectors(r,t),Zn.subVectors(n,t),zl.subVectors(e,t);let a=mn.dot(mn),o=mn.dot(Zn),l=mn.dot(zl),c=Zn.dot(Zn),h=Zn.dot(zl),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let p=1/u,d=(c*l-o*h)*p,m=(a*h-o*l)*p;return s.set(1-d-m,m,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Kn)!==null&&Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Kn.x),l.addScaledVector(a,Kn.y),l.addScaledVector(o,Kn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Wl.setScalar(0),Xl.setScalar(0),jl.setScalar(0),Wl.fromBufferAttribute(e,t),Xl.fromBufferAttribute(e,n),jl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wl,s.x),a.addScaledVector(Xl,s.y),a.addScaledVector(jl,s.z),a}static isFrontFacing(e,t,n,r){return mn.subVectors(n,t),Zn.subVectors(e,t),mn.cross(Zn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),.5*mn.cross(Zn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;yr.subVectors(r,n),Mr.subVectors(s,n),Gl.subVectors(e,n);let l=yr.dot(Gl),c=Mr.dot(Gl);if(l<=0&&c<=0)return t.copy(n);Hl.subVectors(e,r);let h=yr.dot(Hl),u=Mr.dot(Hl);if(h>=0&&u<=h)return t.copy(r);let p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(yr,a);Vl.subVectors(e,s);let d=yr.dot(Vl),m=Mr.dot(Vl);if(m>=0&&d<=m)return t.copy(s);let v=d*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Mr,o);let f=h*m-d*u;if(f<=0&&u-h>=0&&d-m>=0)return td.subVectors(s,r),o=(u-h)/(u-h+(d-m)),t.copy(r).addScaledVector(td,o);let g=1/(f+v+p);return a=v*g,o=p*g,t.copy(n).addScaledVector(yr,a).addScaledVector(Mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Na={h:0,s:0,l:0};function ql(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var Ae=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=st){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ze.workingColorSpace){if(e=dc(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ql(a,s,e+1/3),this.g=ql(a,s,e),this.b=ql(a,s,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,t=st){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=st){let n=Ep[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=st){return Ze.workingToColorSpace(Ut.copy(this),e),65536*Math.round(Ge(255*Ut.r,0,255))+256*Math.round(Ge(255*Ut.g,0,255))+Math.round(Ge(255*Ut.b,0,255))}getHexString(e=st){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Ut.copy(this),t);let n=Ut.r,r=Ut.g,s=Ut.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=st){Ze.workingToColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,r=Ut.b;return e!==st?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(Na);let n=bs(_i.h,Na.h,t),r=bs(_i.s,Na.s,t),s=bs(_i.l,Na.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new Ae;Ae.NAMES=Ep;var om=0,Xt=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=en(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zt=class extends Xt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},F0=lm();function lm(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var xt=new w,Da=new ie,cm=0,Mt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=io,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==io&&(e.usage=this.usage),e}};var Cs=class extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Is=class extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var De=class extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}},hm=0,$t=new Pe,Yl=new ct,Sr=new w,qt=new Lt,_s=new Lt,Rt=new w,tt=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ph(e)?Is:Cs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Lt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(qt.min,_s.min),qt.expandByPoint(Rt),Rt.addVectors(qt.max,_s.max),qt.expandByPoint(Rt)):(qt.expandByPoint(_s.min),qt.expandByPoint(_s.max))}qt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Rt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Rt.fromBufferAttribute(o,c),l&&(Sr.fromBufferAttribute(e,c),Rt.add(Sr)),r=Math.max(r,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new w,l[U]=new w;let c=new w,h=new w,u=new w,p=new ie,d=new ie,m=new ie,v=new w,f=new w;function g(U,C,O){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,C),u.fromBufferAttribute(n,O),p.fromBufferAttribute(s,U),d.fromBufferAttribute(s,C),m.fromBufferAttribute(s,O),h.sub(c),u.sub(c),d.sub(p),m.sub(p);let z=1/(d.x*m.y-m.x*d.y);isFinite(z)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(z),f.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(z),o[U].add(v),o[C].add(v),o[O].add(v),l[U].add(f),l[C].add(f),l[O].add(f))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let U=0,C=_.length;U<C;++U){let O=_[U],z=O.start;for(let F=z,Z=z+O.count;F<Z;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let x=new w,y=new w,T=new w,R=new w;function N(U){T.fromBufferAttribute(r,U),R.copy(T);let C=o[U];x.copy(C),x.sub(T.multiplyScalar(T.dot(C))).normalize(),y.crossVectors(R,C);let O=y.dot(l[U])<0?-1:1;a.setXYZW(U,x.x,x.y,x.z,O)}for(let U=0,C=_.length;U<C;++U){let O=_[U],z=O.start;for(let F=z,Z=z+O.count;F<Z;F+=3)N(e.getX(F+0)),N(e.getX(F+1)),N(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);let r=new w,s=new w,a=new w,o=new w,l=new w,c=new w,h=new w,u=new w;if(e)for(let p=0,d=e.count;p<d;p+=3){let m=e.getX(p+0),v=e.getX(p+1),f=e.getX(p+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,d=t.count;p<d;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,p=new c.constructor(l.length*h),d=0,m=0;for(let v=0,f=l.length;v<f;v++){d=o.isInterleavedBufferAttribute?l[v]*o.data.stride+o.offset:l[v]*h;for(let g=0;g<h;g++)p[m++]=c[d++]}return new Mt(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let p=e(c[h],n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nd=new Pe,Fi=new yi,Ua=new kt,id=new w,Oa=new w,Fa=new w,Ba=new w,Zl=new w,ka=new w,rd=new w,za=new w,ht=class extends ct{constructor(e=new tt,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){ka.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(Zl.fromBufferAttribute(u,e),a?ka.addScaledVector(Zl,h):ka.addScaledVector(Zl.sub(t),h))}t.add(ka)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(s),Fi.copy(e.ray).recast(e.near),Ua.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Ua,id)===null||Fi.origin.distanceToSquared(id)>(e.far-e.near)**2))return;nd.copy(s).invert(),Fi.copy(e.ray).applyMatrix4(nd),n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Fi)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=p.length;m<v;m++){let f=p[m],g=a[f.materialIndex];for(let _=Math.max(f.start,d.start),x=Math.min(o.count,Math.min(f.start+f.count,d.start+d.count));_<x;_+=3)r=Ga(this,g,e,n,c,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=f.materialIndex,t.push(r))}else for(let m=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);m<v;m+=3)r=Ga(this,a,e,n,c,h,u,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=p.length;m<v;m++){let f=p[m],g=a[f.materialIndex];for(let _=Math.max(f.start,d.start),x=Math.min(l.count,Math.min(f.start+f.count,d.start+d.count));_<x;_+=3)r=Ga(this,g,e,n,c,h,u,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=f.materialIndex,t.push(r))}else for(let m=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);m<v;m+=3)r=Ga(this,a,e,n,c,h,u,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function Ga(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Oa),i.getVertexPosition(l,Fa),i.getVertexPosition(c,Ba);let h=(function(u,p,d,m,v,f,g,_){let x;if(x=p.side===1?m.intersectTriangle(g,f,v,!0,_):m.intersectTriangle(v,f,g,p.side===0,_),x===null)return null;za.copy(_),za.applyMatrix4(u.matrixWorld);let y=d.ray.origin.distanceTo(za);return y<d.near||y>d.far?null:{distance:y,point:za.clone(),object:u}})(i,e,t,n,Oa,Fa,Ba,rd);if(h){let u=new w;$n.getBarycoord(rd,Oa,Fa,Ba,u),r&&(h.uv=$n.getInterpolatedAttribute(r,o,l,c,u,new ie)),s&&(h.uv1=$n.getInterpolatedAttribute(s,o,l,c,u,new ie)),a&&(h.normal=$n.getInterpolatedAttribute(a,o,l,c,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new w,materialIndex:0};$n.getNormal(Oa,Fa,Ba,p.normal),h.face=p,h.barycoord=u}return h}var Rn=class i extends tt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],p=0,d=0;function m(v,f,g,_,x,y,T,R,N,U,C){let O=y/N,z=T/U,F=y/2,Z=T/2,G=R/2,j=N+1,q=U+1,oe=0,ee=0,ye=new w;for(let we=0;we<q;we++){let Se=we*z-Z;for(let Le=0;Le<j;Le++){let le=Le*O-F;ye[v]=le*_,ye[f]=Se*x,ye[g]=G,c.push(ye.x,ye.y,ye.z),ye[v]=0,ye[f]=0,ye[g]=R>0?1:-1,h.push(ye.x,ye.y,ye.z),u.push(Le/N),u.push(1-we/U),oe+=1}}for(let we=0;we<U;we++)for(let Se=0;Se<N;Se++){let Le=p+Se+j*we,le=p+Se+j*(we+1),he=p+(Se+1)+j*(we+1),ce=p+(Se+1)+j*we;l.push(Le,le,ce),l.push(le,he,ce),ee+=6}o.addGroup(d,ee,C),d+=ee,p+=oe}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(h,3)),this.setAttribute("uv",new De(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function er(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Ot(i){let e={};for(let t=0;t<i.length;t++){let n=er(i[t]);for(let r in n)e[r]=n[r]}return e}function fh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var Ap={clone:er,merge:Ot},vn=class extends Xt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Nr=class extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},vi=new w,sd=new ie,ad=new ie,yt=class extends Nr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Hi*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Er*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Hi*Math.atan(Math.tan(.5*Er*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,sd,ad),t.subVectors(ad,sd)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Er*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},br=-90,oo=class extends ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yt(br,1,e,t);r.layers=this.layers,this.add(r);let s=new yt(br,1,e,t);s.layers=this.layers,this.add(s);let a=new yt(br,1,e,t);a.layers=this.layers,this.add(a);let o=new yt(br,1,e,t);o.layers=this.layers,this.add(o);let l=new yt(br,1,e,t);l.layers=this.layers,this.add(l);let c=new yt(br,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==As)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,p,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ps=class extends wt{constructor(e=[],t=301,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},lo=class extends An{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ps(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Rn(5,5,5),s=new vn({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ht(r,s),o=t.minFilter;return t.minFilter===On&&(t.minFilter=Vt),new oo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},Bt=class extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}},um={type:"move"},Dr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let f=t.getJointPose(v,n),g=this._getHandJoint(c,v);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&p>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(um)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Ls=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ae(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ns=class extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ur=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=io,this.updateRanges=[],this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ft=new w,Or=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var B0=new w,k0=new w,z0=new w,G0=new ie,H0=new ie,V0=new Pe,W0=new w,X0=new w,j0=new w,q0=new ie,Y0=new ie,Z0=new ie;var K0=new w,J0=new w;var od=new w,ld=new Qe,cd=new Qe,dm=new w,hd=new Pe,Ha=new w,Kl=new kt,ud=new Pe,Jl=new yi,Ds=class extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=lc,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Lt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ha),this.boundingBox.expandByPoint(Ha)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new kt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ha),this.boundingSphere.expandByPoint(Ha)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kl.copy(this.boundingSphere),Kl.applyMatrix4(r),e.ray.intersectsSphere(Kl)!==!1&&(ud.copy(r).invert(),Jl.copy(e.ray).applyMatrix4(ud),this.boundingBox!==null&&Jl.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Jl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Qe,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===lc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;ld.fromBufferAttribute(r.attributes.skinIndex,e),cd.fromBufferAttribute(r.attributes.skinWeight,e),od.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=cd.getComponent(s);if(a!==0){let o=ld.getComponent(s);hd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(dm.copy(od).applyMatrix4(hd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Fr=class extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}},Us=class extends wt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,u,p){super(null,a,o,l,c,h,r,s,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},dd=new Pe,pm=new Pe,Os=class i{constructor(e=[],t=[]){this.uuid=en(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:pm;dd.multiplyMatrices(o,t[s]),dd.toArray(n,16*s)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Us(t,e,e,on,an);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Fr),this.bones.push(a),this.boneInverses.push(new Pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=n[r];e.boneInverses.push(o.toArray())}return e}},Mi=class extends Mt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Tr=new Pe,pd=new Pe,Va=[],fd=new Lt,fm=new Pe,vs=new ht,xs=new kt,Fs=class extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mi(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,fm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Lt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Tr),fd.copy(e.boundingBox).applyMatrix4(Tr),this.boundingBox.union(fd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new kt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Tr),xs.copy(e.boundingSphere).applyMatrix4(Tr),this.boundingSphere.union(xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=r[s+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(vs.geometry=this.geometry,vs.material=this.material,vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(n),e.ray.intersectsSphere(xs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Tr),pd.multiplyMatrices(n,Tr),vs.matrixWorld=pd,vs.raycast(e,Va);for(let a=0,o=Va.length;a<o;a++){let l=Va[a];l.instanceId=s,l.object=this,t.push(l)}Va.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Mi(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Us(new Float32Array(r*this.count),r,this.count,tl,an));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},$l=new w,mm=new w,gm=new ze,Qt=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=$l.subVectors(n,t).cross(mm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta($l),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||gm.getNormalMatrix(e),r=this.coplanarPoint($l).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new kt,_m=new ie(.5,.5),Wa=new w,Si=class{constructor(e=new Qt,t=new Qt,n=new Qt,r=new Qt,s=new Qt,a=new Qt){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],p=s[6],d=s[7],m=s[8],v=s[9],f=s[10],g=s[11],_=s[12],x=s[13],y=s[14],T=s[15];if(r[0].setComponents(c-a,d-h,g-m,T-_).normalize(),r[1].setComponents(c+a,d+h,g+m,T+_).normalize(),r[2].setComponents(c+o,d+u,g+v,T+x).normalize(),r[3].setComponents(c-o,d-u,g-v,T-x).normalize(),n)r[4].setComponents(l,p,f,y).normalize(),r[5].setComponents(c-l,d-p,g-f,T-y).normalize();else if(r[4].setComponents(c-l,d-p,g-f,T-y).normalize(),t===ni)r[5].setComponents(c+l,d+p,g+f,T+y).normalize();else{if(t!==As)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,p,f,y).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=_m.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Wa.x=r.normal.x>0?e.max.x:e.min.x,Wa.y=r.normal.y>0?e.max.y:e.min.y,Wa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Wa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},bn=new Pe,Tn=new Si,co=class i{constructor(){this.coordinateSystem=ni}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(bn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),Tn.setFromProjectionMatrix(bn,r.coordinateSystem,r.reversedDepth),Tn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(bn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),Tn.setFromProjectionMatrix(bn,r.coordinateSystem,r.reversedDepth),Tn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(bn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),Tn.setFromProjectionMatrix(bn,r.coordinateSystem,r.reversedDepth),Tn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(bn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),Tn.setFromProjectionMatrix(bn,r.coordinateSystem,r.reversedDepth),Tn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(bn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),Tn.setFromProjectionMatrix(bn,r.coordinateSystem,r.reversedDepth),Tn.containsPoint(e))return!0}return!1}clone(){return new i}};var pc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},$0=new Pe,Q0=new Ae(1,1,1),e_=new Si,t_=new co,n_=new Lt,i_=new kt,r_=new w,s_=new w,a_=new w,o_=new pc,l_=new ht;var ri=class extends Xt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ho=new w,uo=new w,md=new Pe,ys=new yi,Xa=new kt,Ql=new w,gd=new w,Cn=class extends ct{constructor(e=new tt,t=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ho.fromBufferAttribute(t,r-1),uo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ho.distanceTo(uo);e.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(r),Xa.radius+=s,e.ray.intersectsSphere(Xa)===!1)return;md.copy(r).invert(),ys.copy(e.ray).applyMatrix4(md);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let m=p,v=d-1;m<v;m+=c){let f=h.getX(m),g=h.getX(m+1),_=ja(this,e,ys,l,f,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(d-1),v=h.getX(p),f=ja(this,e,ys,l,m,v,d-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let m=p,v=d-1;m<v;m+=c){let f=ja(this,e,ys,l,m,m+1,m);f&&t.push(f)}if(this.isLineLoop){let m=ja(this,e,ys,l,d-1,p,d-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ja(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(ho.fromBufferAttribute(o,r),uo.fromBufferAttribute(o,s),t.distanceSqToSegment(ho,uo,Ql,gd)>n)return;Ql.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Ql);return l<e.near||l>e.far?void 0:{distance:l,point:gd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var _d=new w,vd=new w,Bs=class extends Cn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)_d.fromBufferAttribute(t,r),vd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+_d.distanceTo(vd);e.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ks=class extends Cn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Br=class extends Xt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xd=new Pe,fc=new yi,qa=new kt,Ya=new w,zs=class extends ct{constructor(e=new tt,t=new Br){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(r),qa.radius+=s,e.ray.intersectsSphere(qa)===!1)return;xd.copy(r).invert(),fc.copy(e.ray).applyMatrix4(xd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);u<p;u++){let d=c.getX(u);Ya.fromBufferAttribute(h,d),yd(Ya,d,l,r,e,t,this)}else for(let u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);u<p;u++)Ya.fromBufferAttribute(h,u),yd(Ya,u,l,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function yd(i,e,t,n,r,s,a){let o=fc.distanceSqToPoint(i);if(o<t){let l=new w;fc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var nn=class extends wt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Gs=class extends wt{constructor(e,t,n=1014,r,s,a,o=1003,l=1003,c,h=1026,u=1){if(h!==ca&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Hs=class extends wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},po=class i extends tt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,p=t,d=2*u+p,m=2*n+s,v=r+1,f=new w,g=new w;for(let _=0;_<=m;_++){let x=0,y=0,T=0,R=0;if(_<=n){let C=_/n,O=C*Math.PI/2;y=-h-e*Math.cos(O),T=e*Math.sin(O),R=-e*Math.cos(O),x=C*u}else if(_<=n+s){let C=(_-n)/s;y=C*t-h,T=e,R=0,x=u+C*p}else{let C=(_-n-s)/n,O=C*Math.PI/2;y=h+e*Math.sin(O),T=e*Math.cos(O),R=e*Math.sin(O),x=u+p+C*u}let N=Math.max(0,Math.min(1,x/d)),U=0;_===0?U=.5/r:_===m&&(U=-.5/r);for(let C=0;C<=r;C++){let O=C/r,z=O*Math.PI*2,F=Math.sin(z),Z=Math.cos(z);g.x=-T*Z,g.y=y,g.z=T*F,o.push(g.x,g.y,g.z),f.set(-T*Z,R,T*F),f.normalize(),l.push(f.x,f.y,f.z),c.push(O+U,N)}if(_>0){let C=(_-1)*v;for(let O=0;O<r;O++){let z=C+O,F=C+O+1,Z=_*v+O,G=_*v+O+1;a.push(z,F,Z),a.push(F,G,Z)}}}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},kr=class i extends tt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new w,h=new ie;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){let d=n+u/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("normal",new De(o,3)),this.setAttribute("uv",new De(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},In=class i extends tt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],u=[],p=[],d=[],m=0,v=[],f=n/2,g=0;function _(x){let y=m,T=new ie,R=new w,N=0,U=x===!0?e:t,C=x===!0?1:-1;for(let z=1;z<=r;z++)u.push(0,f*C,0),p.push(0,C,0),d.push(.5,.5),m++;let O=m;for(let z=0;z<=r;z++){let F=z/r*l+o,Z=Math.cos(F),G=Math.sin(F);R.x=U*G,R.y=f*C,R.z=U*Z,u.push(R.x,R.y,R.z),p.push(0,C,0),T.x=.5*Z+.5,T.y=.5*G*C+.5,d.push(T.x,T.y),m++}for(let z=0;z<r;z++){let F=y+z,Z=O+z;x===!0?h.push(Z,Z+1,F):h.push(Z+1,Z,F),N+=3}c.addGroup(g,N,x===!0?1:2),g+=N}(function(){let x=new w,y=new w,T=0,R=(t-e)/n;for(let N=0;N<=s;N++){let U=[],C=N/s,O=C*(t-e)+e;for(let z=0;z<=r;z++){let F=z/r,Z=F*l+o,G=Math.sin(Z),j=Math.cos(Z);y.x=O*G,y.y=-C*n+f,y.z=O*j,u.push(y.x,y.y,y.z),x.set(G,R,j).normalize(),p.push(x.x,x.y,x.z),d.push(F,1-C),U.push(m++)}v.push(U)}for(let N=0;N<r;N++)for(let U=0;U<s;U++){let C=v[U][N],O=v[U+1][N],z=v[U+1][N+1],F=v[U][N+1];(e>0||U!==0)&&(h.push(C,O,F),T+=3),(t>0||U!==s-1)&&(h.push(O,z,F),T+=3)}c.addGroup(g,T,0),g+=T})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(p,3)),this.setAttribute("uv",new De(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},fo=class i extends In{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},bi=class i extends tt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(d,m,v,f){let g=f+1,_=[];for(let x=0;x<=g;x++){_[x]=[];let y=d.clone().lerp(v,x/g),T=m.clone().lerp(v,x/g),R=g-x;for(let N=0;N<=R;N++)_[x][N]=N===0&&x===g?y:y.clone().lerp(T,N/R)}for(let x=0;x<g;x++)for(let y=0;y<2*(g-x)-1;y++){let T=Math.floor(y/2);y%2==0?(l(_[x][T+1]),l(_[x+1][T]),l(_[x][T])):(l(_[x][T+1]),l(_[x+1][T+1]),l(_[x+1][T]))}}function l(d){s.push(d.x,d.y,d.z)}function c(d,m){let v=3*d;m.x=e[v+0],m.y=e[v+1],m.z=e[v+2]}function h(d,m,v,f){f<0&&d.x===1&&(a[m]=d.x-1),v.x===0&&v.z===0&&(a[m]=f/2/Math.PI+.5)}function u(d){return Math.atan2(d.z,-d.x)}function p(d){return Math.atan2(-d.y,Math.sqrt(d.x*d.x+d.z*d.z))}(function(d){let m=new w,v=new w,f=new w;for(let g=0;g<t.length;g+=3)c(t[g+0],m),c(t[g+1],v),c(t[g+2],f),o(m,v,f,d)})(r),(function(d){let m=new w;for(let v=0;v<s.length;v+=3)m.x=s[v+0],m.y=s[v+1],m.z=s[v+2],m.normalize().multiplyScalar(d),s[v+0]=m.x,s[v+1]=m.y,s[v+2]=m.z})(n),(function(){let d=new w;for(let m=0;m<s.length;m+=3){d.x=s[m+0],d.y=s[m+1],d.z=s[m+2];let v=u(d)/2/Math.PI+.5,f=p(d)/Math.PI+.5;a.push(v,1-f)}(function(){let m=new w,v=new w,f=new w,g=new w,_=new ie,x=new ie,y=new ie;for(let T=0,R=0;T<s.length;T+=9,R+=6){m.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),f.set(s[T+6],s[T+7],s[T+8]),_.set(a[R+0],a[R+1]),x.set(a[R+2],a[R+3]),y.set(a[R+4],a[R+5]),g.copy(m).add(v).add(f).divideScalar(3);let N=u(g);h(_,R+0,m,N),h(x,R+2,v,N),h(y,R+4,f,N)}})(),(function(){for(let m=0;m<a.length;m+=6){let v=a[m+0],f=a[m+2],g=a[m+4],_=Math.max(v,f,g),x=Math.min(v,f,g);_>.9&&x<.1&&(v<.2&&(a[m+0]+=1),f<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new De(s,3)),this.setAttribute("normal",new De(s.slice(),3)),this.setAttribute("uv",new De(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},mo=class i extends bi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Za=new w,Ka=new w,ec=new w,Ja=new $n,go=class extends tt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Er*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),p={},d=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:v,b:f,c:g}=Ja;if(v.fromBufferAttribute(o,c[0]),f.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),Ja.getNormal(ec),u[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,u[1]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,u[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let x=(_+1)%3,y=u[_],T=u[x],R=Ja[h[_]],N=Ja[h[x]],U=`${y}_${T}`,C=`${T}_${y}`;C in p&&p[C]?(ec.dot(p[C].normal)<=s&&(d.push(R.x,R.y,R.z),d.push(N.x,N.y,N.z)),p[C]=null):U in p||(p[U]={index0:c[_],index1:c[x],normal:ec.clone()})}}for(let m in p)if(p[m]){let{index0:v,index1:f}=p[m];Za.fromBufferAttribute(o,v),Ka.fromBufferAttribute(o,f),d.push(Za.x,Za.y,Za.z),d.push(Ka.x,Ka.y,Ka.z)}this.setAttribute("position",new De(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Zt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ie:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,r=[],s=[],a=[],o=new w,l=new Pe;for(let d=0;d<=e;d++){let m=d/e;r[d]=this.getTangentAt(m,new w)}s[0]=new w,a[0]=new w;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),p=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Ge(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Ge(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],d*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zr=class extends Zt{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ie){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*h-d*u+this.aX,c=p*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},_o=class extends zr{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function mh(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let p=(a-s)/c-(o-s)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;p*=h,d*=h,r(a,o,p,d)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var $a=new w,tc=new mh,nc=new mh,ic=new mh,vo=class extends Zt{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new w){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:($a.subVectors(r[0],r[1]).add(r[0]),o=$a);let u=r[c%s],p=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:($a.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=$a),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(p),d),f=Math.pow(p.distanceToSquared(l),d);v<1e-4&&(v=1),m<1e-4&&(m=v),f<1e-4&&(f=v),tc.initNonuniformCatmullRom(o.x,u.x,p.x,l.x,m,v,f),nc.initNonuniformCatmullRom(o.y,u.y,p.y,l.y,m,v,f),ic.initNonuniformCatmullRom(o.z,u.z,p.z,l.z,m,v,f)}else this.curveType==="catmullrom"&&(tc.initCatmullRom(o.x,u.x,p.x,l.x,this.tension),nc.initCatmullRom(o.y,u.y,p.y,l.y,this.tension),ic.initCatmullRom(o.z,u.z,p.z,l.z,this.tension));return n.set(tc.calc(h),nc.calc(h),ic.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new w().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Md(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function Ts(i,e,t,n){return(function(r,s){let a=1-r;return a*a*s})(i,e)+(function(r,s){return 2*(1-r)*r*s})(i,t)+(function(r,s){return r*r*s})(i,n)}function ws(i,e,t,n,r){return(function(s,a){let o=1-s;return o*o*o*a})(i,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(i,t)+(function(s,a){return 3*(1-s)*s*s*a})(i,n)+(function(s,a){return s*s*s*a})(i,r)}var Vs=class extends Zt{constructor(e=new ie,t=new ie,n=new ie,r=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ie){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,r.x,s.x,a.x,o.x),ws(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xo=class extends Zt{constructor(e=new w,t=new w,n=new w,r=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new w){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,r.x,s.x,a.x,o.x),ws(e,r.y,s.y,a.y,o.y),ws(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ws=class extends Zt{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends Zt{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xs=class extends Zt{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ts(e,r.x,s.x,a.x),Ts(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},js=class extends Zt{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ts(e,r.x,s.x,a.x),Ts(e,r.y,s.y,a.y),Ts(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qs=class extends Zt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Md(o,l.x,c.x,h.x,u.x),Md(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ie().fromArray(r))}return this}},Mo=Object.freeze({__proto__:null,ArcCurve:_o,CatmullRomCurve3:vo,CubicBezierCurve:Vs,CubicBezierCurve3:xo,EllipseCurve:zr,LineCurve:Ws,LineCurve3:yo,QuadraticBezierCurve:Xs,QuadraticBezierCurve3:js,SplineCurve:qs}),So=class extends Zt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Mo[r.type]().fromJSON(r))}return this}},Ys=class extends So{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ws(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Xs(this.currentPoint.clone(),new ie(e,t),new ie(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Vs(this.currentPoint.clone(),new ie(e,t),new ie(n,r),new ie(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new qs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new zr(e,t,n,r,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Vi=class extends Ys{constructor(e){super(e),this.uuid=en(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Ys().fromJSON(r))}return this}};function vm(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Sd(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,u,p,d){let m=[];for(let v=0,f=u.length;v<f;v++){let g=Sd(h,u[v]*d,v<f-1?u[v+1]*d:h.length,d,!1);g===g.next&&(g.steiner=!0),m.push(Em(g))}m.sort(bm);for(let v=0;v<m.length;v++)p=Tm(m[v],p);return p})(i,e,s,t)),i.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let p=t;p<r;p+=t){let d=i[p],m=i[p+1];d<o&&(o=d),m<l&&(l=m),d>h&&(h=d),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Zs(s,a,t,o,l,c,0),a}function Sd(i,e,t,n,r){let s;if(r===(function(a,o,l,c){let h=0;for(let u=o,p=l-c;u<l;u+=c)h+=(a[p]-a[u])*(a[u+1]+a[p+1]),p=u;return h})(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=bd(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=bd(a/n|0,i[a],i[a+1],s);return s&&Gr(s,s.next)&&(Js(s),s=s.next),s}function Wi(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Gr(n,n.next)&&dt(n.prev,n,n.next)!==0)n=n.next;else{if(Js(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Zs(i,e,t,n,r,s,a){if(!i)return;!a&&s&&(function(l,c,h,u){let p=l;do p.z===0&&(p.z=mc(p.x,p.y,c,h,u)),p.prevZ=p.prev,p.nextZ=p.next,p=p.next;while(p!==l);p.prevZ.nextZ=null,p.prevZ=null,(function(d){let m,v=1;do{let f,g=d;d=null;let _=null;for(m=0;g;){m++;let x=g,y=0;for(let R=0;R<v&&(y++,x=x.nextZ,x);R++);let T=v;for(;y>0||T>0&&x;)y!==0&&(T===0||!x||g.z<=x.z)?(f=g,g=g.nextZ,y--):(f=x,x=x.nextZ,T--),_?_.nextZ=f:d=f,f.prevZ=_,_=f;g=x}_.nextZ=null,v*=2}while(m>1)})(p)})(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?ym(i,n,r,s):xm(i))e.push(l.i,i.i,c.i),Js(i),i=c.next,o=c.next;else if((i=c)===o){a?a===1?Zs(i=Mm(Wi(i),e),e,t,n,r,s,2):a===2&&Sm(i,e,t,n,r,s):Zs(Wi(i),e,t,n,r,s,1);break}}}function xm(i){let e=i.prev,t=i,n=i.next;if(dt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),u=Math.min(o,l,c),p=Math.max(r,s,a),d=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=p&&m.y>=u&&m.y<=d&&Ss(r,o,s,l,a,c,m.x,m.y)&&dt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ym(i,e,t,n){let r=i.prev,s=i,a=i.next;if(dt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,u=s.y,p=a.y,d=Math.min(o,l,c),m=Math.min(h,u,p),v=Math.max(o,l,c),f=Math.max(h,u,p),g=mc(d,m,e,t,n),_=mc(v,f,e,t,n),x=i.prevZ,y=i.nextZ;for(;x&&x.z>=g&&y&&y.z<=_;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=f&&x!==r&&x!==a&&Ss(o,h,l,u,c,p,x.x,x.y)&&dt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=d&&y.x<=v&&y.y>=m&&y.y<=f&&y!==r&&y!==a&&Ss(o,h,l,u,c,p,y.x,y.y)&&dt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=g;){if(x.x>=d&&x.x<=v&&x.y>=m&&x.y<=f&&x!==r&&x!==a&&Ss(o,h,l,u,c,p,x.x,x.y)&&dt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=_;){if(y.x>=d&&y.x<=v&&y.y>=m&&y.y<=f&&y!==r&&y!==a&&Ss(o,h,l,u,c,p,y.x,y.y)&&dt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Mm(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Gr(n,r)&&Cp(n,t,t.next,r)&&Ks(n,r)&&Ks(r,n)&&(e.push(n.i,t.i,r.i),Js(t),Js(t.next),t=i=r),t=t.next}while(t!==i);return Wi(t)}function Sm(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Am(a,o)){let l=Ip(a,o);return a=Wi(a,a.next),l=Wi(l,l.next),Zs(a,e,t,n,r,s,0),void Zs(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function bm(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Tm(i,e){let t=(function(r,s){let a=s,o=r.x,l=r.y,c,h=-1/0;if(Gr(r,a))return a;do{if(Gr(r,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let v=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,c=a.x<a.next.x?a:a.next,v===o))return c}a=a.next}while(a!==s);if(!c)return null;let u=c,p=c.x,d=c.y,m=1/0;a=c;do{if(o>=a.x&&a.x>=p&&o!==a.x&&Rp(l<d?o:h,l,p,d,l<d?h:o,l,a.x,a.y)){let v=Math.abs(l-a.y)/(o-a.x);Ks(a,r)&&(v<m||v===m&&(a.x>c.x||a.x===c.x&&wm(c,a)))&&(c=a,m=v)}a=a.next}while(a!==u);return c})(i,e);if(!t)return e;let n=Ip(t,i);return Wi(n,n.next),Wi(t,t.next)}function wm(i,e){return dt(i.prev,i,e.prev)<0&&dt(e.next,i,i.next)<0}function mc(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Em(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Rp(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Ss(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Rp(i,e,t,n,r,s,a,o)}function Am(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!(function(t,n){let r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==n.i&&r.next.i!==n.i&&Cp(r,r.next,t,n))return!0;r=r.next}while(r!==t);return!1})(i,e)&&(Ks(i,e)&&Ks(e,i)&&(function(t,n){let r=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&a<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(s=!s),r=r.next;while(r!==t);return s})(i,e)&&(dt(i.prev,i,e.prev)||dt(i,e.prev,e))||Gr(i,e)&&dt(i.prev,i,i.next)>0&&dt(e.prev,e,e.next)>0)}function dt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Gr(i,e){return i.x===e.x&&i.y===e.y}function Cp(i,e,t,n){let r=eo(dt(i,e,t)),s=eo(dt(i,e,n)),a=eo(dt(t,n,i)),o=eo(dt(t,n,e));return r!==s&&a!==o||!(r!==0||!Qa(i,t,e))||!(s!==0||!Qa(i,n,e))||!(a!==0||!Qa(t,i,n))||!(o!==0||!Qa(t,e,n))}function Qa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function eo(i){return i>0?1:i<0?-1:0}function Ks(i,e){return dt(i.prev,i,i.next)<0?dt(i,e,i.next)>=0&&dt(i,i.prev,e)>=0:dt(i,e,i.prev)<0||dt(i,i.next,e)<0}function Ip(i,e){let t=gc(i.i,i.x,i.y),n=gc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function bd(i,e,t,n){let r=gc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function gc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var _c=class{static triangulate(e,t,n=2){return vm(e,t,n)}},wn=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Td(e),wd(n,e);let a=e.length;t.forEach(Td);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,wd(n,t[l]);let o=_c.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Td(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function wd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var bo=class i extends tt{constructor(e=new Vi([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,p=t.bevelEnabled===void 0||t.bevelEnabled,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Rm,x,y,T,R,N,U=!1;g&&(x=g.getSpacedPoints(h),U=!0,p=!1,y=g.computeFrenetFrames(h,!1),T=new w,R=new w,N=new w),p||(f=0,d=0,m=0,v=0);let C=o.extractPoints(c),O=C.shape,z=C.holes;if(!wn.isClockWise(O)){O=O.reverse();for(let L=0,M=z.length;L<M;L++){let A=z[L];wn.isClockWise(A)&&(z[L]=A.reverse())}}function F(L){let M=10000000000000001e-36,A=L[0];for(let D=1;D<=L.length;D++){let I=D%L.length,Y=L[I],k=Y.x-A.x,H=Y.y-A.y,re=k*k+H*H,ge=Math.max(Math.abs(Y.x),Math.abs(Y.y),Math.abs(A.x),Math.abs(A.y));re<=M*ge*ge?(L.splice(I,1),D--):A=Y}}F(O),z.forEach(F);let Z=z.length,G=O;for(let L=0;L<Z;L++){let M=z[L];O=O.concat(M)}function j(L,M,A){return M||console.error("THREE.ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(M,A)}let q=O.length;function oe(L,M,A){let D,I,Y,k=L.x-M.x,H=L.y-M.y,re=A.x-L.x,ge=A.y-L.y,se=k*k+H*H,Me=k*ge-H*re;if(Math.abs(Me)>Number.EPSILON){let Te=Math.sqrt(se),Re=Math.sqrt(re*re+ge*ge),Ve=M.x-H/Te,W=M.y+k/Te,ne=((A.x-ge/Re-Ve)*ge-(A.y+re/Re-W)*re)/(k*ge-H*re);D=Ve+k*ne-L.x,I=W+H*ne-L.y;let $=D*D+I*I;if($<=2)return new ie(D,I);Y=Math.sqrt($/2)}else{let Te=!1;k>Number.EPSILON?re>Number.EPSILON&&(Te=!0):k<-Number.EPSILON?re<-Number.EPSILON&&(Te=!0):Math.sign(H)===Math.sign(ge)&&(Te=!0),Te?(D=-H,I=k,Y=Math.sqrt(se)):(D=k,I=H,Y=Math.sqrt(se/2))}return new ie(D/Y,I/Y)}let ee=[];for(let L=0,M=G.length,A=M-1,D=L+1;L<M;L++,A++,D++)A===M&&(A=0),D===M&&(D=0),ee[L]=oe(G[L],G[A],G[D]);let ye=[],we,Se,Le=ee.concat();for(let L=0,M=Z;L<M;L++){let A=z[L];we=[];for(let D=0,I=A.length,Y=I-1,k=D+1;D<I;D++,Y++,k++)Y===I&&(Y=0),k===I&&(k=0),we[D]=oe(A[D],A[Y],A[k]);ye.push(we),Le=Le.concat(we)}if(f===0)Se=wn.triangulateShape(G,z);else{let L=[],M=[];for(let A=0;A<f;A++){let D=A/f,I=d*Math.cos(D*Math.PI/2),Y=m*Math.sin(D*Math.PI/2)+v;for(let k=0,H=G.length;k<H;k++){let re=j(G[k],ee[k],Y);Ie(re.x,re.y,-I),D===0&&L.push(re)}for(let k=0,H=Z;k<H;k++){let re=z[k];we=ye[k];let ge=[];for(let se=0,Me=re.length;se<Me;se++){let Te=j(re[se],we[se],Y);Ie(Te.x,Te.y,-I),D===0&&ge.push(Te)}D===0&&M.push(ge)}}Se=wn.triangulateShape(L,M)}let le=Se.length,he=m+v;for(let L=0;L<q;L++){let M=p?j(O[L],Le[L],he):O[L];U?(R.copy(y.normals[0]).multiplyScalar(M.x),T.copy(y.binormals[0]).multiplyScalar(M.y),N.copy(x[0]).add(R).add(T),Ie(N.x,N.y,N.z)):Ie(M.x,M.y,0)}for(let L=1;L<=h;L++)for(let M=0;M<q;M++){let A=p?j(O[M],Le[M],he):O[M];U?(R.copy(y.normals[L]).multiplyScalar(A.x),T.copy(y.binormals[L]).multiplyScalar(A.y),N.copy(x[L]).add(R).add(T),Ie(N.x,N.y,N.z)):Ie(A.x,A.y,u/h*L)}for(let L=f-1;L>=0;L--){let M=L/f,A=d*Math.cos(M*Math.PI/2),D=m*Math.sin(M*Math.PI/2)+v;for(let I=0,Y=G.length;I<Y;I++){let k=j(G[I],ee[I],D);Ie(k.x,k.y,u+A)}for(let I=0,Y=z.length;I<Y;I++){let k=z[I];we=ye[I];for(let H=0,re=k.length;H<re;H++){let ge=j(k[H],we[H],D);U?Ie(ge.x,ge.y+x[h-1].y,x[h-1].x+A):Ie(ge.x,ge.y,u+A)}}}function ce(L,M){let A=L.length;for(;--A>=0;){let D=A,I=A-1;I<0&&(I=L.length-1);for(let Y=0,k=h+2*f;Y<k;Y++){let H=q*Y,re=q*(Y+1);b(M+D+H,M+I+H,M+I+re,M+D+re)}}}function Ie(L,M,A){l.push(L),l.push(M),l.push(A)}function Ne(L,M,A){S(L),S(M),S(A);let D=r.length/3,I=_.generateTopUV(n,r,D-3,D-2,D-1);B(I[0]),B(I[1]),B(I[2])}function b(L,M,A,D){S(L),S(M),S(D),S(M),S(A),S(D);let I=r.length/3,Y=_.generateSideWallUV(n,r,I-6,I-3,I-2,I-1);B(Y[0]),B(Y[1]),B(Y[3]),B(Y[1]),B(Y[2]),B(Y[3])}function S(L){r.push(l[3*L+0]),r.push(l[3*L+1]),r.push(l[3*L+2])}function B(L){s.push(L.x),s.push(L.y)}(function(){let L=r.length/3;if(p){let M=0,A=q*M;for(let D=0;D<le;D++){let I=Se[D];Ne(I[2]+A,I[1]+A,I[0]+A)}M=h+2*f,A=q*M;for(let D=0;D<le;D++){let I=Se[D];Ne(I[0]+A,I[1]+A,I[2]+A)}}else{for(let M=0;M<le;M++){let A=Se[M];Ne(A[2],A[1],A[0])}for(let M=0;M<le;M++){let A=Se[M];Ne(A[0]+q*h,A[1]+q*h,A[2]+q*h)}}n.addGroup(L,r.length/3-L,0)})(),(function(){let L=r.length/3,M=0;ce(G,M),M+=G.length;for(let A=0,D=z.length;A<D;A++){let I=z[A];ce(I,M),M+=I.length}n.addGroup(L,r.length/3-L,1)})()}this.setAttribute("position",new De(r,3)),this.setAttribute("uv",new De(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,r){if(r.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];r.shapes.push(o.uuid)}else r.shapes.push(t.uuid);return r.options=Object.assign({},n),n.extrudePath!==void 0&&(r.options.extrudePath=n.extrudePath.toJSON()),r})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Mo[r.type]().fromJSON(r)),new i(n,e.options)}},Rm={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new ie(s,a),new ie(o,l),new ie(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],p=e[3*r],d=e[3*r+1],m=e[3*r+2],v=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new ie(a,1-l),new ie(c,1-u),new ie(p,1-m),new ie(v,1-g)]:[new ie(o,1-l),new ie(h,1-u),new ie(d,1-m),new ie(f,1-g)]}},To=class i extends bi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},wo=class i extends tt{constructor(e=[new ie(0,-.5),new ie(.5,0),new ie(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Ge(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new w,p=new ie,d=new w,m=new w,v=new w,f=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:f=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=1*g,d.y=-f,d.z=0*g,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:f=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=1*g,d.y=-f,d.z=0*g,m.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(m)}for(let _=0;_<=t;_++){let x=n+_*h*r,y=Math.sin(x),T=Math.cos(x);for(let R=0;R<=e.length-1;R++){u.x=e[R].x*y,u.y=e[R].y,u.z=e[R].x*T,a.push(u.x,u.y,u.z),p.x=_/t,p.y=R/(e.length-1),o.push(p.x,p.y);let N=l[3*R+0]*y,U=l[3*R+1],C=l[3*R+0]*T;c.push(N,U,C)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){let y=x+_*e.length,T=y,R=y+e.length,N=y+e.length+1,U=y+1;s.push(T,R,U),s.push(N,U,R)}this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("uv",new De(o,2)),this.setAttribute("normal",new De(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Eo=class i extends bi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},rn=class i extends tt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,u=e/o,p=t/l,d=[],m=[],v=[],f=[];for(let g=0;g<h;g++){let _=g*p-a;for(let x=0;x<c;x++){let y=x*u-s;m.push(y,-_,0),v.push(0,0,1),f.push(x/o),f.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let x=_+c*g,y=_+c*(g+1),T=_+1+c*(g+1),R=_+1+c*g;d.push(x,y,R),d.push(y,T,R)}this.setIndex(d),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Ao=class i extends tt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,p=(t-e)/(r=Math.max(1,r)),d=new w,m=new ie;for(let v=0;v<=r;v++){for(let f=0;f<=n;f++){let g=s+f/n*a;d.x=u*Math.cos(g),d.y=u*Math.sin(g),l.push(d.x,d.y,d.z),c.push(0,0,1),m.x=(d.x/t+1)/2,m.y=(d.y/t+1)/2,h.push(m.x,m.y)}u+=p}for(let v=0;v<r;v++){let f=v*(n+1);for(let g=0;g<n;g++){let _=g+f,x=_,y=_+n+1,T=_+n+2,R=_+1;o.push(x,y,R),o.push(y,T,R)}}this.setIndex(o),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Hr=class i extends tt{constructor(e=new Vi([new ie(0,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=r.length/3,p=h.extractPoints(t),d=p.shape,m=p.holes;wn.isClockWise(d)===!1&&(d=d.reverse());for(let f=0,g=m.length;f<g;f++){let _=m[f];wn.isClockWise(_)===!0&&(m[f]=_.reverse())}let v=wn.triangulateShape(d,m);for(let f=0,g=m.length;f<g;f++){let _=m[f];d=d.concat(_)}for(let f=0,g=d.length;f<g;f++){let _=d[f];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let f=0,g=v.length;f<g;f++){let _=v[f],x=_[0]+u,y=_[1]+u,T=_[2]+u;n.push(x,y,T),l+=3}}this.setIndex(n),this.setAttribute("position",new De(r,3)),this.setAttribute("normal",new De(s,3)),this.setAttribute("uv",new De(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let r=0,s=t.length;r<s;r++){let a=t[r];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}},Ti=class i extends tt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new w,p=new w,d=[],m=[],v=[],f=[];for(let g=0;g<=n;g++){let _=[],x=g/n,y=0;g===0&&a===0?y=.5/t:g===n&&l===Math.PI&&(y=-.5/t);for(let T=0;T<=t;T++){let R=T/t;u.x=-e*Math.cos(r+R*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(r+R*s)*Math.sin(a+x*o),m.push(u.x,u.y,u.z),p.copy(u).normalize(),v.push(p.x,p.y,p.z),f.push(R+y,1-x),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let x=h[g][_+1],y=h[g][_],T=h[g+1][_],R=h[g+1][_+1];(g!==0||a>0)&&d.push(x,y,R),(g!==n-1||l<Math.PI)&&d.push(y,T,R)}this.setIndex(d),this.setAttribute("position",new De(m,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ro=class i extends bi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Vr=class i extends tt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],h=new w,u=new w,p=new w;for(let d=0;d<=n;d++)for(let m=0;m<=r;m++){let v=m/r*s,f=d/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(v),u.y=(e+t*Math.cos(f))*Math.sin(v),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(m/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=r;m++){let v=(r+1)*d+m-1,f=(r+1)*(d-1)+m-1,g=(r+1)*(d-1)+m,_=(r+1)*d+m;a.push(v,f,_),a.push(f,g,_)}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Co=class i extends tt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],u=new w,p=new w,d=new w,m=new w,v=new w,f=new w,g=new w;for(let x=0;x<=n;++x){let y=x/n*s*Math.PI*2;_(y,s,a,e,d),_(y+.01,s,a,e,m),f.subVectors(m,d),g.addVectors(m,d),v.crossVectors(f,g),g.crossVectors(v,f),v.normalize(),g.normalize();for(let T=0;T<=r;++T){let R=T/r*Math.PI*2,N=-t*Math.cos(R),U=t*Math.sin(R);u.x=d.x+(N*g.x+U*v.x),u.y=d.y+(N*g.y+U*v.y),u.z=d.z+(N*g.z+U*v.z),l.push(u.x,u.y,u.z),p.subVectors(u,d).normalize(),c.push(p.x,p.y,p.z),h.push(x/n),h.push(T/r)}}for(let x=1;x<=n;x++)for(let y=1;y<=r;y++){let T=(r+1)*(x-1)+(y-1),R=(r+1)*x+(y-1),N=(r+1)*x+y,U=(r+1)*(x-1)+y;o.push(T,R,U),o.push(R,N,U)}function _(x,y,T,R,N){let U=Math.cos(x),C=Math.sin(x),O=T/y*x,z=Math.cos(O);N.x=R*(2+z)*.5*U,N.y=R*(2+z)*C*.5,N.z=R*Math.sin(O)*.5}this.setIndex(o),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Io=class i extends tt{constructor(e=new js(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,l=new w,c=new ie,h=new w,u=[],p=[],d=[],m=[];function v(f){h=e.getPointAt(f/t,h);let g=a.normals[f],_=a.binormals[f];for(let x=0;x<=r;x++){let y=x/r*Math.PI*2,T=Math.sin(y),R=-Math.cos(y);l.x=R*g.x+T*_.x,l.y=R*g.y+T*_.y,l.z=R*g.z+T*_.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)v(f);v(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=r;g++)c.x=f/t,c.y=g/r,d.push(c.x,c.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=r;g++){let _=(r+1)*(f-1)+(g-1),x=(r+1)*f+(g-1),y=(r+1)*f+g,T=(r+1)*(f-1)+g;m.push(_,x,T),m.push(x,y,T)}})()})(),this.setIndex(m),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(p,3)),this.setAttribute("uv",new De(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Mo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Po=class extends tt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],p=u.start;for(let d=p,m=p+u.count;d<m;d+=3)for(let v=0;v<3;v++){let f=o.getX(d+v),g=o.getX(d+(v+1)%3);r.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Ed(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Ed(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new De(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Ed(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var c_=Object.freeze({__proto__:null,BoxGeometry:Rn,CapsuleGeometry:po,CircleGeometry:kr,ConeGeometry:fo,CylinderGeometry:In,DodecahedronGeometry:mo,EdgesGeometry:go,ExtrudeGeometry:bo,IcosahedronGeometry:To,LatheGeometry:wo,OctahedronGeometry:Eo,PlaneGeometry:rn,PolyhedronGeometry:bi,RingGeometry:Ao,ShapeGeometry:Hr,SphereGeometry:Ti,TetrahedronGeometry:Ro,TorusGeometry:Vr,TorusKnotGeometry:Co,TubeGeometry:Io,WireframeGeometry:Po});var pt=class extends Xt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ft=class extends pt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Lo=class extends Xt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},No=class extends Xt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var $s=class extends ri{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function to(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function Cm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Im(i){let e=i.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,r){return i[n]-i[r]}),t}function Ad(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function Pp(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}var si=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Do=class extends si{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cc,endingEnd:cc}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case hc:s=e,o=2*t-n;break;case uc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case hc:a=e,l=2*n-t;break;case uc:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,d=this._weightNext,m=(n-t)/(r-t),v=m*m,f=v*m,g=-p*f+2*p*v-p*m,_=(1+p)*f+(-1.5-2*p)*v+(-.5+p)*m+1,x=(-1-d)*f+(1.5+d)*v+.5*m,y=d*f-d*v;for(let T=0;T!==o;++T)s[T]=g*a[h+T]+_*a[c+T]+x*a[l+T]+y*a[u+T];return s}},Uo=class extends si{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),u=1-h;for(let p=0;p!==o;++p)s[p]=a[c+p]*u+a[l+p]*h;return s}},Oo=class extends si{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ht=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=to(t,this.TimeBufferType),this.values=to(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:to(e.times,Array),values:to(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Do(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case zi:t=this.InterpolantFactoryMethodDiscrete;break;case Gi:t=this.InterpolantFactoryMethodLinear;break;case no:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zi;case this.InterpolantFactoryMethodLinear:return Gi;case this.InterpolantFactoryMethodSmooth:return no}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Cm(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===no,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,u=h-n,p=h+n;for(let d=0;d!==n;++d){let m=t[h+d];if(m!==t[u+d]||m!==t[p+d]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Ht.prototype.ValueTypeName="",Ht.prototype.TimeBufferType=Float32Array,Ht.prototype.ValueBufferType=Float32Array,Ht.prototype.DefaultInterpolation=Gi;var Qn=class extends Ht{constructor(e,t,n){super(e,t,n)}};Qn.prototype.ValueTypeName="bool",Qn.prototype.ValueBufferType=Array,Qn.prototype.DefaultInterpolation=zi,Qn.prototype.InterpolantFactoryMethodLinear=void 0,Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Qs=class extends Ht{constructor(e,t,n,r){super(e,t,n,r)}};Qs.prototype.ValueTypeName="color";var Pn=class extends Ht{constructor(e,t,n,r){super(e,t,n,r)}};Pn.prototype.ValueTypeName="number";var Fo=class extends si{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Wt.slerpFlat(s,0,a,c-o,a,c,l);return s}},Ln=class extends Ht{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}};Ln.prototype.ValueTypeName="quaternion",Ln.prototype.InterpolantFactoryMethodSmooth=void 0;var ei=class extends Ht{constructor(e,t,n){super(e,t,n)}};ei.prototype.ValueTypeName="string",ei.prototype.ValueBufferType=Array,ei.prototype.DefaultInterpolation=zi,ei.prototype.InterpolantFactoryMethodLinear=void 0,ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Nn=class extends Ht{constructor(e,t,n,r){super(e,t,n,r)}};Nn.prototype.ValueTypeName="vector";var ea=class{constructor(e="",t=-1,n=[],r=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=en(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Pm(n[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Ht.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=Im(l);l=Ad(l,1,h),c=Ad(c,1,h),r||l[0]!==0||(l.push(s),c.push(c[0])),a.push(new Pn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],p=r[u];p||(r[u]=p=[]),p.push(c)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,p,d,m){if(p.length!==0){let v=[],f=[];Pp(p,v,f,d),v.length!==0&&m.push(new h(u,v,f))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let u=c[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let p={},d;for(d=0;d<u.length;d++)if(u[d].morphTargets)for(let m=0;m<u[d].morphTargets.length;m++)p[u[d].morphTargets[m]]=-1;for(let m in p){let v=[],f=[];for(let g=0;g!==u[d].morphTargets.length;++g){let _=u[d];v.push(_.time),f.push(_.morphTarget===m?1:0)}r.push(new Pn(".morphTargetInfluence["+m+"]",v,f))}l=p.length*a}else{let p=".bones["+t[h].name+"]";n(Nn,p+".position",u,"pos",r),n(Ln,p+".quaternion",u,"rot",r),n(Nn,p+".scale",u,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let r=this.tracks[t];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Pm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Pn;case"vector":case"vector2":case"vector3":case"vector4":return Nn;case"color":return Qs;case"quaternion":return Ln;case"bool":case"boolean":return Qn;case"string":return ei}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(i.type);if(i.times===void 0){let t=[],n=[];Pp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var En={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Bo=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=c.length;u<p;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Lp=new Bo,Dn=class{constructor(e){this.manager=e!==void 0?e:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Dn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Jn={},vc=class extends Error{constructor(e,t){super(e),this.response=t}},Wr=class extends Dn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=En.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Jn[e]!==void 0)return void Jn[e].push({onLoad:t,onProgress:n,onError:r});Jn[e]=[],Jn[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Jn[e],u=c.body.getReader(),p=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=p?parseInt(p):0,m=d!==0,v=0,f=new ReadableStream({start(g){(function _(){u.read().then(({done:x,value:y})=>{if(x)g.close();else{v+=y.byteLength;let T=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:d});for(let R=0,N=h.length;R<N;R++){let U=h[R];U.onProgress&&U.onProgress(T)}g.enqueue(y),_()}},x=>{g.error(x)})})()}});return new Response(f)}throw new vc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(u);return c.arrayBuffer().then(d=>p.decode(d))}}}).then(c=>{En.add(`file:${e}`,c);let h=Jn[e];delete Jn[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=Jn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Jn[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var wr=new WeakMap,ko=class extends Dn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=En.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=wr.get(a);u===void 0&&(u=[],wr.set(a,u)),u.push({onLoad:t,onError:r})}return a}let o=Cr("img");function l(){h(),t&&t(this);let u=wr.get(this)||[];for(let p=0;p<u.length;p++){let d=u[p];d.onLoad&&d.onLoad(this)}wr.delete(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),En.remove(`image:${e}`);let p=wr.get(this)||[];for(let d=0;d<p.length;d++){let m=p[d];m.onError&&m.onError(u)}wr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),En.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Xi=class extends Dn{constructor(e){super(e)}load(e,t,n,r){let s=new wt,a=new ko(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},ji=class extends ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ta=class extends ji{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},rc=new Pe,Rd=new w,Cd=new w,na=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.mapType=Fn,this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Si,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Rd),Cd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cd),t.updateMatrixWorld(),rc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(rc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xc=class extends na{constructor(){super(new yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Hi*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&r===t.aspect&&s===t.far||(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ia=class extends ji{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new xc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Id=new Pe,Ms=new w,sc=new w,yc=class extends na{constructor(){super(new yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ie(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ms.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ms),sc.copy(n.position),sc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(sc),n.updateMatrixWorld(),r.makeTranslation(-Ms.x,-Ms.y,-Ms.z),Id.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Id,n.coordinateSystem,n.reversedDepth)}},qi=class extends ji{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new yc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Yi=class extends Nr{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Mc=class extends na{constructor(){super(new Yi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Zi=class extends ji{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new Mc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ai=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ac=new WeakMap,ra=class extends Dn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=En.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(c=>{if(ac.has(a)!==!0)return t&&t(c),s.manager.itemEnd(e),c;r&&r(ac.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return En.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){r&&r(c),ac.set(l,c),En.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});En.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var h_=new Pe,u_=new Pe,d_=new Pe;var zo=class extends yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var p_=new w,f_=new Wt,m_=new w,g_=new w,__=new w;var v_=new w,x_=new Wt,y_=new w,M_=new w;var gh="\\[\\]\\.:\\/",Lm=new RegExp("["+gh+"]","g"),oc="[^"+gh+"]",Nm="[^"+gh.replace("\\.","")+"]",Dm=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",oc)+/(WCOD+)?/.source.replace("WCOD",Nm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oc)+"$"),Um=["material","materials","bones","map"],at=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lm,"")}static parseTrackName(e){let t=Dm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Um.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};at.Composite=class{constructor(i,e,t){let n=t||at.parseTrackName(e);this._targetGroup=i,this._bindings=i.subscribe_(e,n)}getValue(i,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(i,e)}setValue(i,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=t.length;n!==r;++n)t[n].setValue(i,e)}bind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].bind()}unbind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].unbind()}},at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray],at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var S_=new Float32Array(1);var Pd=new Pe,sa=class{constructor(e,t,n=0,r=1/0){this.ray=new yi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Lr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Pd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pd),this}intersectObject(e,t=!0,n=[]){return Sc(e,this,n,t),n.sort(Ld),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Sc(e[r],this,n,t);return n.sort(Ld),n}};function Ld(i,e){return i.distance-e.distance}function Sc(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)Sc(s[a],e,t,!0)}}var b_=new ie;var T_=new w,w_=new w,E_=new w,A_=new w,R_=new w,C_=new w,I_=new w;var P_=new w;var L_=new w,N_=new Pe,D_=new Pe;var U_=new w,O_=new Ae,F_=new Ae;var B_=new w,k_=new w,z_=new w;var G_=new w,H_=new Nr;var V_=new Lt;var W_=new w;function _h(i,e,t,n){let r=(function(s){switch(s){case Fn:case Cc:return{byteLength:1,components:1};case Yr:case Ic:case Zr:return{byteLength:2,components:1};case Qo:case el:return{byteLength:2,components:4};case $i:case $o:case an:return{byteLength:4,components:1};case Pc:case Lc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return i*e;case tl:case nl:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case on:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function nf(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Fm(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),u;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=i.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=i.SHORT;else if(o instanceof Uint32Array)u=i.UNSIGNED_INT;else if(o instanceof Int32Array)u=i.INT;else if(o instanceof Int8Array)u=i.BYTE;else if(o instanceof Uint8Array)u=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=i.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort((u,p)=>u.start-p.start);let h=0;for(let u=1;u<c.length;u++){let p=c[h],d=c[u];d.start<=p.start+p.count+1?p.count=Math.max(p.count,d.start+d.count-p.start):(++h,c[h]=d)}c.length=h+1;for(let u=0,p=c.length;u<p;u++){let d=c[u];i.bufferSubData(o,d.start*l.BYTES_PER_ELEMENT,l,d.start,d.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var He={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},me={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Bn={basic:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ae(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Ot([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Ot([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ae(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Ot([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Ot([me.points,me.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Ot([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Ot([me.common,me.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Ot([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Ot([me.sprite,me.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Ot([me.common,me.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Ot([me.lights,me.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Bn.physical={uniforms:Ot([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};var ol={r:0,b:0,g:0},tr=new _n,Bm=new Pe;function km(i,e,t,n,r,s,a){let o=new Ae(0),l,c,h=s===!0?0:1,u=null,p=0,d=null;function m(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function v(f,g){f.getRGB(ol,fh(i)),n.buffers.color.setClear(ol.r,ol.g,ol.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,v(o,h)},render:function(f){let g=!1,_=m(f);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let x=i.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,g){let _=m(g);_&&(_.isCubeTexture||_.mapping===la)?(c===void 0&&(c=new ht(new Rn(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:er(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,y,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),tr.copy(g.backgroundRotation),tr.x*=-1,tr.y*=-1,tr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(tr)),c.material.toneMapped=Ze.getTransfer(_.colorSpace)!==rt,u===_&&p===_.version&&d===i.toneMapping||(c.material.needsUpdate=!0,u=_,p=_.version,d=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ht(new rn(2,2),new vn({name:"BackgroundMaterial",uniforms:er(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(_.colorSpace)!==rt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&p===_.version&&d===i.toneMapping||(l.material.needsUpdate=!0,u=_,p=_.version,d=i.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function zm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let _=[],x=[],y=[];for(let T=0;T<t;T++)_[T]=0,x[T]=0,y[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:x,attributeDivisors:y,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,x=g.length;_<x;_++)g[_]=0}function u(g){p(g,0)}function p(g,_){let x=s.newAttributes,y=s.enabledAttributes,T=s.attributeDivisors;x[g]=1,y[g]===0&&(i.enableVertexAttribArray(g),y[g]=1),T[g]!==_&&(i.vertexAttribDivisor(g,_),T[g]=_)}function d(){let g=s.newAttributes,_=s.enabledAttributes;for(let x=0,y=_.length;x<y;x++)_[x]!==g[x]&&(i.disableVertexAttribArray(x),_[x]=0)}function m(g,_,x,y,T,R,N){N===!0?i.vertexAttribIPointer(g,_,x,T,R):i.vertexAttribPointer(g,_,x,y,T,R)}function v(){f(),a=!0,s!==r&&(s=r,o(s.object))}function f(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,x,y,T){let R=!1,N=(function(U,C,O){let z=O.wireframe===!0,F=n[U.id];F===void 0&&(F={},n[U.id]=F);let Z=F[C.id];Z===void 0&&(Z={},F[C.id]=Z);let G=Z[z];return G===void 0&&(G=c(i.createVertexArray()),Z[z]=G),G})(y,x,_);s!==N&&(s=N,o(s.object)),R=(function(U,C,O,z){let F=s.attributes,Z=C.attributes,G=0,j=O.getAttributes();for(let q in j)if(j[q].location>=0){let oe=F[q],ee=Z[q];if(ee===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(ee=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(ee=U.instanceColor)),oe===void 0||oe.attribute!==ee||ee&&oe.data!==ee.data)return!0;G++}return s.attributesNum!==G||s.index!==z})(g,y,x,T),R&&(function(U,C,O,z){let F={},Z=C.attributes,G=0,j=O.getAttributes();for(let q in j)if(j[q].location>=0){let oe=Z[q];oe===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(oe=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(oe=U.instanceColor));let ee={};ee.attribute=oe,oe&&oe.data&&(ee.data=oe.data),F[q]=ee,G++}s.attributes=F,s.attributesNum=G,s.index=z})(g,y,x,T),T!==null&&e.update(T,i.ELEMENT_ARRAY_BUFFER),(R||a)&&(a=!1,(function(U,C,O,z){h();let F=z.attributes,Z=O.getAttributes(),G=C.defaultAttributeValues;for(let j in Z){let q=Z[j];if(q.location>=0){let oe=F[j];if(oe===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(oe=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(oe=U.instanceColor)),oe!==void 0){let ee=oe.normalized,ye=oe.itemSize,we=e.get(oe);if(we===void 0)continue;let Se=we.buffer,Le=we.type,le=we.bytesPerElement,he=Le===i.INT||Le===i.UNSIGNED_INT||oe.gpuType===$o;if(oe.isInterleavedBufferAttribute){let ce=oe.data,Ie=ce.stride,Ne=oe.offset;if(ce.isInstancedInterleavedBuffer){for(let b=0;b<q.locationSize;b++)p(q.location+b,ce.meshPerAttribute);U.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let b=0;b<q.locationSize;b++)u(q.location+b);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let b=0;b<q.locationSize;b++)m(q.location+b,ye/q.locationSize,Le,ee,Ie*le,(Ne+ye/q.locationSize*b)*le,he)}else{if(oe.isInstancedBufferAttribute){for(let ce=0;ce<q.locationSize;ce++)p(q.location+ce,oe.meshPerAttribute);U.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ce=0;ce<q.locationSize;ce++)u(q.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let ce=0;ce<q.locationSize;ce++)m(q.location+ce,ye/q.locationSize,Le,ee,ye*le,ye/q.locationSize*ce*le,he)}}else if(G!==void 0){let ee=G[j];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(q.location,ee);break;case 3:i.vertexAttrib3fv(q.location,ee);break;case 4:i.vertexAttrib4fv(q.location,ee);break;default:i.vertexAttrib1fv(q.location,ee)}}}}d()})(g,_,x,y),T!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:v,resetDefaultState:f,dispose:function(){v();for(let g in n){let _=n[g];for(let x in _){let y=_[x];for(let T in y)l(y[T].object),delete y[T];delete _[x]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let x in _){let y=_[x];for(let T in y)l(y[T].object),delete y[T];delete _[x]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let x=n[_];if(x[g.id]===void 0)continue;let y=x[g.id];for(let T in y)l(y[T].object),delete y[T];delete x[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:d}}function Gm(i,e,t){let n;function r(s,a,o){o!==0&&(i.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){i.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=r,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)r(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function Hm(i,e,t,n){let r;function s(p){if(p==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";p="mediump"}return p==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let p=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(p.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(p){return p===on||n.convert(p)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(p){let d=p===Zr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(p!==Fn&&n.convert(p)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&p!==an&&!d)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function Vm(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Qt,o=new ze,l={value:null,needsUpdate:!1};function c(h,u,p,d){let m=h!==null?h.length:0,v=null;if(m!==0){if(v=l.value,d!==!0||v===null){let f=p+4*m,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<f)&&(v=new Float32Array(f));for(let _=0,x=p;_!==m;++_,x+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,x),v[x+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,v}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||n!==0||r;return r=u,n=h.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,p){let d=h.clippingPlanes,m=h.clipIntersection,v=h.clipShadows,f=i.get(h);if(!r||d===null||d.length===0||s&&!v)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,x=f.clippingState||null;l.value=x,x=c(d,u,_,p);for(let y=0;y!==_;++y)x[y]=t[y];f.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}function Wm(i){let e=new WeakMap;function t(r,s){return s===Ai?r.mapping=jr:s===Ko&&(r.mapping=Ki),r}function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping;if(s===Ai||s===Ko){if(e.has(r))return t(e.get(r).texture,r.mapping);{let a=r.image;if(a&&a.height>0){let o=new lo(a.height);return o.fromEquirectangularTexture(i,r),e.set(r,o),r.addEventListener("dispose",n),t(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}var Np=[.125,.215,.35,.446,.526,.582],da=20,vh=new Yi,Dp=new Ae,xh=null,yh=0,Mh=0,Sh=!1,ir=(1+Math.sqrt(5))/2,$r=1/ir,Up=[new w(-ir,$r,0),new w(ir,$r,0),new w(-$r,0,ir),new w($r,0,ir),new w(0,ir,-$r),new w(0,ir,$r),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Xm=new w,hl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Xm}=s;xh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Mh=this._renderer.getActiveMipmapLevel(),Sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xh,yh,Mh),this._renderer.xr.enabled=Sh,e.scissorTest=!1,ll(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===jr||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Mh=this._renderer.getActiveMipmapLevel(),Sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Zr,format:on,colorSpace:Pt,depthBuffer:!1},r=Op(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Op(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,u=a-4+1+Np.length;for(let p=0;p<u;p++){let d=Math.pow(2,h);l.push(d);let m=1/d;p>a-4?m=Np[p-a+4-1]:p===0&&(m=0),c.push(m);let v=1/(d-2),f=-v,g=1+v,_=[f,f,g,f,g,g,f,f,g,g,f,g],x=6,y=6,T=3,R=2,N=1,U=new Float32Array(T*y*x),C=new Float32Array(R*y*x),O=new Float32Array(N*y*x);for(let F=0;F<x;F++){let Z=F%3*2/3-1,G=F>2?0:-1,j=[Z,G,0,Z+2/3,G,0,Z+2/3,G+1,0,Z,G,0,Z+2/3,G+1,0,Z,G+1,0];U.set(j,T*y*F),C.set(_,R*y*F);let q=[F,F,F,F,F,F];O.set(q,N*y*F)}let z=new tt;z.setAttribute("position",new Mt(U,T)),z.setAttribute("uv",new Mt(C,R)),z.setAttribute("faceIndex",new Mt(O,N)),o.push(z),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(da),h=new w(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:da,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Lh(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})})(s,e,t)}return r}_compileMaterial(e){let t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,vh)}_sceneToCubeUV(e,t,n,r,s){let a=new yt(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(Dp),c.toneMapping=oi,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let p=new zt({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),d=new ht(new Rn,p),m=!1,v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,m=!0):(p.color.copy(Dp),m=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[f]));let _=this._cubeSize;ll(r,g*_,f>2?_:0,_,_),c.setRenderTarget(r),m&&c.render(d,a),c.render(e,a)}d.geometry.dispose(),d.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===jr||e.mapping===Ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fp());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new ht(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;ll(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,vh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Up[(r-s-1)%Up.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ht(this._lodPlanes[r],c),u=c.uniforms,p=this._sizeLods[n]-1,d=isFinite(s)?Math.PI/(2*p):2*Math.PI/39,m=s/d,v=isFinite(s)?1+Math.floor(3*m):da;v>da&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let f=[],g=0;for(let y=0;y<da;++y){let T=y/m,R=Math.exp(-T*T/2);f.push(R),y===0?g+=R:y<v&&(g+=2*R)}for(let y=0;y<f.length;y++)f[y]=f[y]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=d,u.mipInt.value=_-n;let x=this._sizeLods[r];ll(t,3*x*(r>_-4?r-_+4:0),4*(this._cubeSize-x),3*x,2*x),l.setRenderTarget(t),l.render(h,vh)}};function Op(i,e,t){let n=new An(i,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ll(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Fp(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lh(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Bp(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Lh(){return`

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
	`}function jm(i){let e=new WeakMap,t=null;function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping,a=s===Ai||s===Ko,o=s===jr||s===Ki;if(a||o){let l=e.get(r),c=l!==void 0?l.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new hl(i)),l=a?t.fromEquirectangular(r,l):t.fromCubemap(r,l),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),l.texture;if(l!==void 0)return l.texture;{let h=r.image;return a&&h&&h.height>0||o&&h&&(function(u){let p=0,d=6;for(let m=0;m<d;m++)u[m]!==void 0&&p++;return p===d})(h)?(t===null&&(t=new hl(i)),l=a?t.fromEquirectangular(r):t.fromCubemap(r),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),r.addEventListener("dispose",n),l.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function qm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ir("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Ym(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,p=0;if(h!==null){let v=h.array;p=h.version;for(let f=0,g=v.length;f<g;f+=3){let _=v[f+0],x=v[f+1],y=v[f+2];c.push(_,x,x,y,y,_)}}else{if(u===void 0)return;{let v=u.array;p=u.version;for(let f=0,g=v.length/3-1;f<g;f+=3){let _=f+0,x=f+1,y=f+2;c.push(_,x,x,y,y,_)}}}let d=new(ph(c)?Is:Cs)(c,1);d.version=p;let m=s.get(l);m&&e.remove(m),s.set(l,d)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Zm(i,e,t){let n,r,s;function a(o,l,c){c!==0&&(i.drawElementsInstanced(n,l,r,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){r=o.type,s=o.bytesPerElement},this.render=function(o,l){i.drawElements(n,l,r,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let p=0;p<o.length;p++)a(o[p]/s,l[p],h[p]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,r,o,0,h,0,c);let p=0;for(let d=0;d<c;d++)p+=l[d]*h[d];t.update(p,n,1)}}}function Km(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Jm(i,e,t){let n=new WeakMap,r=new Qe;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let U=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",U)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,d=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;p===!0&&(_=1),d===!0&&(_=2),m===!0&&(_=3);let x=a.attributes.position.count*_,y=1;x>e.maxTextureSize&&(y=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let T=new Float32Array(x*y*4*h),R=new Rs(T,x,y,h);R.type=an,R.needsUpdate=!0;let N=4*_;for(let C=0;C<h;C++){let O=v[C],z=f[C],F=g[C],Z=x*y*4*C;for(let G=0;G<O.count;G++){let j=G*N;p===!0&&(r.fromBufferAttribute(O,G),T[Z+j+0]=r.x,T[Z+j+1]=r.y,T[Z+j+2]=r.z,T[Z+j+3]=0),d===!0&&(r.fromBufferAttribute(z,G),T[Z+j+4]=r.x,T[Z+j+5]=r.y,T[Z+j+6]=r.z,T[Z+j+7]=0),m===!0&&(r.fromBufferAttribute(F,G),T[Z+j+8]=r.x,T[Z+j+9]=r.y,T[Z+j+10]=r.z,T[Z+j+11]=F.itemSize===4?r.w:1)}}u={count:h,texture:R,size:new ie(x,y)},n.set(a,u),a.addEventListener("dispose",U)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let p=0;for(let m=0;m<l.length;m++)p+=l[m];let d=a.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",d),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}}}function $m(i,e,t,n){let r=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(r.get(c)!==o&&(e.update(c),r.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),r.get(a)!==o&&(t.update(a.instanceMatrix,i.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,i.ARRAY_BUFFER),r.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;r.get(h)!==o&&(h.update(),r.set(h,o))}return c},dispose:function(){r=new WeakMap}}}var rf=new wt,kp=new Gs(1,1),sf=new Rs,af=new ao,of=new Ps,zp=[],Gp=[],Hp=new Float32Array(16),Vp=new Float32Array(9),Wp=new Float32Array(4);function es(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=zp[r];if(s===void 0&&(s=new Float32Array(r),zp[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function dl(i,e){let t=Gp[e];t===void 0&&(t=new Int32Array(e),Gp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Qm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function eg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function tg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function ng(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function ig(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Wp.set(n),i.uniformMatrix2fv(this.addr,!1,Wp),At(t,n)}}function rg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Vp.set(n),i.uniformMatrix3fv(this.addr,!1,Vp),At(t,n)}}function sg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Hp.set(n),i.uniformMatrix4fv(this.addr,!1,Hp),At(t,n)}}function ag(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function og(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function lg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function cg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function hg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ug(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function dg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function pg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function fg(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(kp.compareFunction=hh,s=kp):s=rf,t.setTexture2D(e||s,r)}function mg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||af,r)}function gg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||of,r)}function _g(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||sf,r)}function vg(i,e){i.uniform1fv(this.addr,e)}function xg(i,e){let t=es(e,this.size,2);i.uniform2fv(this.addr,t)}function yg(i,e){let t=es(e,this.size,3);i.uniform3fv(this.addr,t)}function Mg(i,e){let t=es(e,this.size,4);i.uniform4fv(this.addr,t)}function Sg(i,e){let t=es(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function bg(i,e){let t=es(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tg(i,e){let t=es(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function wg(i,e){i.uniform1iv(this.addr,e)}function Eg(i,e){i.uniform2iv(this.addr,e)}function Ag(i,e){i.uniform3iv(this.addr,e)}function Rg(i,e){i.uniform4iv(this.addr,e)}function Cg(i,e){i.uniform1uiv(this.addr,e)}function Ig(i,e){i.uniform2uiv(this.addr,e)}function Pg(i,e){i.uniform3uiv(this.addr,e)}function Lg(i,e){i.uniform4uiv(this.addr,e)}function Ng(i,e,t){let n=this.cache,r=e.length,s=dl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||rf,s[a])}function Dg(i,e,t){let n=this.cache,r=e.length,s=dl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||af,s[a])}function Ug(i,e,t){let n=this.cache,r=e.length,s=dl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||of,s[a])}function Og(i,e,t){let n=this.cache,r=e.length,s=dl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||sf,s[a])}var Th=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(r){switch(r){case 5126:return Qm;case 35664:return eg;case 35665:return tg;case 35666:return ng;case 35674:return ig;case 35675:return rg;case 35676:return sg;case 5124:case 35670:return ag;case 35667:case 35671:return og;case 35668:case 35672:return lg;case 35669:case 35673:return cg;case 5125:return hg;case 36294:return ug;case 36295:return dg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return _g}})(t.type)}},wh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(r){switch(r){case 5126:return vg;case 35664:return xg;case 35665:return yg;case 35666:return Mg;case 35674:return Sg;case 35675:return bg;case 35676:return Tg;case 5124:case 35670:return wg;case 35667:case 35671:return Eg;case 35668:case 35672:return Ag;case 35669:case 35673:return Rg;case 5125:return Cg;case 36294:return Ig;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Og}})(t.type)}},Eh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},bh=/(\w+)(\])?(\[|\.)?/g;function Xp(i,e){i.seq.push(e),i.map[e.id]=e}function Fg(i,e,t){let n=i.name,r=n.length;for(bh.lastIndex=0;;){let s=bh.exec(n),a=bh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){Xp(t,c===void 0?new Th(o,i,e):new wh(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new Eh(o),Xp(t,h)),t=h}}}var Qr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r);Fg(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function jp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Bg=0,qp=new ze;function Yp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),p=Math.min(l+6,c.length);for(let d=u;d<p;d++){let m=d+1;h.push(`${m===l?">":" "} ${m}: ${c[d]}`)}return h.join(`
`)})(i.getShaderSource(e),a)}return r}function kg(i,e){let t=(function(n){Ze._getMatrix(qp,Ze.workingColorSpace,n);let r=`mat3( ${qp.elements.map(s=>s.toFixed(4))} )`;switch(Ze.getTransfer(n)){case Es:return[r,"LinearTransferOETF"];case rt:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[r,"LinearTransferOETF"]}})(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zg(i,e){let t;switch(e){case rp:t="Linear";break;case sp:t="Reinhard";break;case ap:t="Cineon";break;case Zo:t="ACESFilmic";break;case lp:t="AgX";break;case cp:t="Neutral";break;case op:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var cl=new w;function Gg(){return Ze.getLuminanceCoefficients(cl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${cl.x.toFixed(4)}, ${cl.y.toFixed(4)}, ${cl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pa(i){return i!==""}function Zp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ah(i){return i.replace(Hg,Wg)}var Vg=new Map;function Wg(i,e){let t=He[e];if(t===void 0){let n=Vg.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Ah(t)}var Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jp(i){return i.replace(Xg,jg)}function jg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function $p(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qg(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(z){let F="SHADOWMAP_TYPE_BASIC";return z.shadowMapType===Tc?F="SHADOWMAP_TYPE_PCF":z.shadowMapType===Go?F="SHADOWMAP_TYPE_PCF_SOFT":z.shadowMapType===Un&&(F="SHADOWMAP_TYPE_VSM"),F})(t),c=(function(z){let F="ENVMAP_TYPE_CUBE";if(z.envMap)switch(z.envMapMode){case jr:case Ki:F="ENVMAP_TYPE_CUBE";break;case la:F="ENVMAP_TYPE_CUBE_UV"}return F})(t),h=(function(z){let F="ENVMAP_MODE_REFLECTION";return z.envMap&&z.envMapMode===Ki&&(F="ENVMAP_MODE_REFRACTION"),F})(t),u=(function(z){let F="ENVMAP_BLENDING_NONE";if(z.envMap)switch(z.combine){case tp:F="ENVMAP_BLENDING_MULTIPLY";break;case np:F="ENVMAP_BLENDING_MIX";break;case ip:F="ENVMAP_BLENDING_ADD"}return F})(t),p=(function(z){let F=z.envMapCubeUVHeight;if(F===null)return null;let Z=Math.log2(F)-2,G=1/F;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:G,maxMip:Z}})(t),d=(function(z){return[z.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",z.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)})(t),m=(function(z){let F=[];for(let Z in z){let G=z[Z];G!==!1&&F.push("#define "+Z+" "+G)}return F.join(`
`)})(s),v=r.createProgram(),f,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(pa).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(pa).join(`
`),g.length>0&&(g+=`
`)):(f=[$p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),g=[$p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?He.tonemapping_pars_fragment:"",t.toneMapping!==oi?zg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,kg("linearToOutputTexel",t.outputColorSpace),Gg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pa).join(`
`)),a=Ah(a),a=Zp(a,t),a=Kp(a,t),o=Ah(o),o=Zp(o,t),o=Kp(o,t),a=Jp(a),o=Jp(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,f=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let x=_+f+a,y=_+g+o,T=jp(r,r.VERTEX_SHADER,x),R=jp(r,r.FRAGMENT_SHADER,y);function N(z){if(i.debug.checkShaderErrors){let F=r.getProgramInfoLog(v)||"",Z=r.getShaderInfoLog(T)||"",G=r.getShaderInfoLog(R)||"",j=F.trim(),q=Z.trim(),oe=G.trim(),ee=!0,ye=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(ee=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,T,R);else{let we=Yp(r,T,"vertex"),Se=Yp(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+j+`
`+we+`
`+Se)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):q!==""&&oe!==""||(ye=!1);ye&&(z.diagnostics={runnable:ee,programLog:j,vertexShader:{log:q,prefix:f},fragmentShader:{log:oe,prefix:g}})}r.deleteShader(T),r.deleteShader(R),U=new Qr(r,v),C=(function(F,Z){let G={},j=F.getProgramParameter(Z,F.ACTIVE_ATTRIBUTES);for(let q=0;q<j;q++){let oe=F.getActiveAttrib(Z,q),ee=oe.name,ye=1;oe.type===F.FLOAT_MAT2&&(ye=2),oe.type===F.FLOAT_MAT3&&(ye=3),oe.type===F.FLOAT_MAT4&&(ye=4),G[ee]={type:oe.type,location:F.getAttribLocation(Z,ee),locationSize:ye}}return G})(r,v)}let U,C;r.attachShader(v,T),r.attachShader(v,R),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),this.getUniforms=function(){return U===void 0&&N(this),U},this.getAttributes=function(){return C===void 0&&N(this),C};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(v,37297)),O},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=R,this}var Yg=0,Rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ch(e),t.set(e,n)),n}},Ch=class{constructor(e){this.id=Yg++,this.code=e,this.usedTimes=0}};function Zg(i,e,t,n,r,s,a){let o=new Lr,l=new Rh,c=new Set,h=[],u=r.logarithmicDepthBuffer,p=r.vertexTextures,d=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,_,x,y){let T=x.fog,R=y.geometry,N=f.isMeshStandardMaterial?x.environment:null,U=(f.isMeshStandardMaterial?t:e).get(f.envMap||N),C=U&&U.mapping===la?U.image.height:null,O=m[f.type];f.precision!==null&&(d=r.getMaxPrecision(f.precision),d!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let z=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,F=z!==void 0?z.length:0,Z,G,j,q,oe=0;if(R.morphAttributes.position!==void 0&&(oe=1),R.morphAttributes.normal!==void 0&&(oe=2),R.morphAttributes.color!==void 0&&(oe=3),O){let mt=Bn[O];Z=mt.vertexShader,G=mt.fragmentShader}else Z=f.vertexShader,G=f.fragmentShader,l.update(f),j=l.getVertexShaderID(f),q=l.getFragmentShaderID(f);let ee=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),we=y.isInstancedMesh===!0,Se=y.isBatchedMesh===!0,Le=!!f.map,le=!!f.matcap,he=!!U,ce=!!f.aoMap,Ie=!!f.lightMap,Ne=!!f.bumpMap,b=!!f.normalMap,S=!!f.displacementMap,B=!!f.emissiveMap,L=!!f.metalnessMap,M=!!f.roughnessMap,A=f.anisotropy>0,D=f.clearcoat>0,I=f.dispersion>0,Y=f.iridescence>0,k=f.sheen>0,H=f.transmission>0,re=A&&!!f.anisotropyMap,ge=D&&!!f.clearcoatMap,se=D&&!!f.clearcoatNormalMap,Me=D&&!!f.clearcoatRoughnessMap,Te=Y&&!!f.iridescenceMap,Re=Y&&!!f.iridescenceThicknessMap,Ve=k&&!!f.sheenColorMap,W=k&&!!f.sheenRoughnessMap,ne=!!f.specularMap,$=!!f.specularColorMap,J=!!f.specularIntensityMap,pe=H&&!!f.transmissionMap,Ce=H&&!!f.thicknessMap,te=!!f.gradientMap,fe=!!f.alphaMap,_e=f.alphaTest>0,Ue=!!f.alphaHash,Je=!!f.extensions,P=oi;f.toneMapped&&(ee!==null&&ee.isXRRenderTarget!==!0||(P=i.toneMapping));let $e={shaderID:O,shaderType:f.type,shaderName:f.name,vertexShader:Z,fragmentShader:G,defines:f.defines,customVertexShaderID:j,customFragmentShaderID:q,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:Se,batchingColor:Se&&y._colorsTexture!==null,instancing:we,instancingColor:we&&y.instanceColor!==null,instancingMorph:we&&y.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Pt,alphaToCoverage:!!f.alphaToCoverage,map:Le,matcap:le,envMap:he,envMapMode:he&&U.mapping,envMapCubeUVHeight:C,aoMap:ce,lightMap:Ie,bumpMap:Ne,normalMap:b,displacementMap:p&&S,emissiveMap:B,normalMapObjectSpace:b&&f.normalMapType===gp,normalMapTangentSpace:b&&f.normalMapType===mp,metalnessMap:L,roughnessMap:M,anisotropy:A,anisotropyMap:re,clearcoat:D,clearcoatMap:ge,clearcoatNormalMap:se,clearcoatRoughnessMap:Me,dispersion:I,iridescence:Y,iridescenceMap:Te,iridescenceThicknessMap:Re,sheen:k,sheenColorMap:Ve,sheenRoughnessMap:W,specularMap:ne,specularColorMap:$,specularIntensityMap:J,transmission:H,transmissionMap:pe,thicknessMap:Ce,gradientMap:te,opaque:f.transparent===!1&&f.blending===aa&&f.alphaToCoverage===!1,alphaMap:fe,alphaTest:_e,alphaHash:Ue,combine:f.combine,mapUv:Le&&v(f.map.channel),aoMapUv:ce&&v(f.aoMap.channel),lightMapUv:Ie&&v(f.lightMap.channel),bumpMapUv:Ne&&v(f.bumpMap.channel),normalMapUv:b&&v(f.normalMap.channel),displacementMapUv:S&&v(f.displacementMap.channel),emissiveMapUv:B&&v(f.emissiveMap.channel),metalnessMapUv:L&&v(f.metalnessMap.channel),roughnessMapUv:M&&v(f.roughnessMap.channel),anisotropyMapUv:re&&v(f.anisotropyMap.channel),clearcoatMapUv:ge&&v(f.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&v(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&v(f.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&v(f.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&v(f.sheenColorMap.channel),sheenRoughnessMapUv:W&&v(f.sheenRoughnessMap.channel),specularMapUv:ne&&v(f.specularMap.channel),specularColorMapUv:$&&v(f.specularColorMap.channel),specularIntensityMapUv:J&&v(f.specularIntensityMap.channel),transmissionMapUv:pe&&v(f.transmissionMap.channel),thicknessMapUv:Ce&&v(f.thicknessMap.channel),alphaMapUv:fe&&v(f.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(b||A),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!R.attributes.uv&&(Le||fe),fog:!!T,useFog:f.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ye,skinning:y.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:F,morphTextureStride:oe,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&_.length>0,shadowMapType:i.shadowMap.type,toneMapping:P,decodeVideoTexture:Le&&f.map.isVideoTexture===!0&&Ze.getTransfer(f.map.colorSpace)===rt,decodeVideoTextureEmissive:B&&f.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(f.emissiveMap.colorSpace)===rt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===sn,flipSided:f.side===Kt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Je&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&f.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let _ in f.defines)g.push(_),g.push(f.defines[_]);return f.isRawShaderMaterial===!1&&((function(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapCubeUVHeight),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.morphAttributeCount),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)})(g,f),(function(_,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,f),g.push(i.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=m[f.type],_;if(g){let x=Bn[g];_=Ap.clone(x.uniforms)}else _=f.uniforms;return _},acquireProgram:function(f,g){let _;for(let x=0,y=h.length;x<y;x++){let T=h[x];if(T.cacheKey===g){_=T,++_.usedTimes;break}}return _===void 0&&(_=new qg(i,g,f,s),h.push(_)),_},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){l.remove(f)},programs:h,dispose:function(){l.dispose()}}}function Kg(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Jg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Qp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ef(){let i=[],e=0,t=[],n=[],r=[];function s(a,o,l,c,h,u){let p=i[e];return p===void 0?(p={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},i[e]=p):(p.id=a.id,p.object=a,p.geometry=o,p.material=l,p.groupOrder=c,p.renderOrder=a.renderOrder,p.z=h,p.group=u),e++,p}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(a,o,l,c,h,u){let p=s(a,o,l,c,h,u);l.transmission>0?n.push(p):l.transparent===!0?r.push(p):t.push(p)},unshift:function(a,o,l,c,h,u){let p=s(a,o,l,c,h,u);l.transmission>0?n.unshift(p):l.transparent===!0?r.unshift(p):t.unshift(p)},finish:function(){for(let a=e,o=i.length;a<o;a++){let l=i[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Jg),n.length>1&&n.sort(o||Qp),r.length>1&&r.sort(o||Qp)}}}function $g(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new ef,i.set(e,[r])):t>=n.length?(r=new ef,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Qg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ae};break;case"SpotLight":t={position:new w,direction:new w,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new w,halfWidth:new w,halfHeight:new w}}return i[e.id]=t,t}}}var e0=0;function t0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function n0(i){let e=new Qg,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let r=new w,s=new Pe,a=new Pe;return{setup:function(o){let l=0,c=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let u=0,p=0,d=0,m=0,v=0,f=0,g=0,_=0,x=0,y=0,T=0;o.sort(t0);for(let N=0,U=o.length;N<U;N++){let C=o[N],O=C.color,z=C.intensity,F=C.distance,Z=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)l+=O.r*z,c+=O.g*z,h+=O.b*z;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],z);T++}else if(C.isDirectionalLight){let G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let j=C.shadow,q=t.get(C);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,n.directionalShadow[u]=q,n.directionalShadowMap[u]=Z,n.directionalShadowMatrix[u]=C.shadow.matrix,f++}n.directional[u]=G,u++}else if(C.isSpotLight){let G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(O).multiplyScalar(z),G.distance=F,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[d]=G;let j=C.shadow;if(C.map&&(n.spotLightMap[x]=C.map,x++,j.updateMatrices(C),C.castShadow&&y++),n.spotLightMatrix[d]=j.matrix,C.castShadow){let q=t.get(C);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,n.spotShadow[d]=q,n.spotShadowMap[d]=Z,_++}d++}else if(C.isRectAreaLight){let G=e.get(C);G.color.copy(O).multiplyScalar(z),G.halfWidth.set(.5*C.width,0,0),G.halfHeight.set(0,.5*C.height,0),n.rectArea[m]=G,m++}else if(C.isPointLight){let G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){let j=C.shadow,q=t.get(C);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,q.shadowCameraNear=j.camera.near,q.shadowCameraFar=j.camera.far,n.pointShadow[p]=q,n.pointShadowMap[p]=Z,n.pointShadowMatrix[p]=C.shadow.matrix,g++}n.point[p]=G,p++}else if(C.isHemisphereLight){let G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(z),G.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[v]=G,v++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let R=n.hash;R.directionalLength===u&&R.pointLength===p&&R.spotLength===d&&R.rectAreaLength===m&&R.hemiLength===v&&R.numDirectionalShadows===f&&R.numPointShadows===g&&R.numSpotShadows===_&&R.numSpotMaps===x&&R.numLightProbes===T||(n.directional.length=u,n.spot.length=d,n.rectArea.length=m,n.point.length=p,n.hemi.length=v,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+x-y,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=T,R.directionalLength=u,R.pointLength=p,R.spotLength=d,R.rectAreaLength=m,R.hemiLength=v,R.numDirectionalShadows=f,R.numPointShadows=g,R.numSpotShadows=_,R.numSpotMaps=x,R.numLightProbes=T,n.version=e0++)},setupView:function(o,l){let c=0,h=0,u=0,p=0,d=0,m=l.matrixWorldInverse;for(let v=0,f=o.length;v<f;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[c];_.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),c++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),u++}else if(g.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(m),a.identity(),s.copy(g.matrixWorld),s.premultiply(m),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(m),h++}else if(g.isHemisphereLight){let _=n.hemi[d];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(m),d++}}},state:n}}function tf(i){let e=new n0(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){r.camera=s,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function i0(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new tf(i),e.set(t,[s])):n>=r.length?(s=new tf(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}function r0(i,e,t){let n=new Si,r=new ie,s=new ie,a=new Qe,o=new Lo({depthPacking:fp}),l=new No,c={},h=t.maxTextureSize,u={[wi]:Kt,[Kt]:wi,[sn]:sn},p=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:`void main() {
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
}`}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let m=new tt;m.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ht(m,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tc;let g=this.type;function _(R,N){let U=e.update(v);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new An(r.x,r.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(N,null,U,p,v,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(N,null,U,d,v,null)}function x(R,N,U,C){let O=null,z=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(z!==void 0)O=z;else if(O=U.isPointLight===!0?l:o,i.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){let F=O.uuid,Z=N.uuid,G=c[F];G===void 0&&(G={},c[F]=G);let j=G[Z];j===void 0&&(j=O.clone(),G[Z]=j,N.addEventListener("dispose",T)),O=j}return O.visible=N.visible,O.wireframe=N.wireframe,O.side=C===Un?N.shadowSide!==null?N.shadowSide:N.side:N.shadowSide!==null?N.shadowSide:u[N.side],O.alphaMap=N.alphaMap,O.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,O.map=N.map,O.clipShadows=N.clipShadows,O.clippingPlanes=N.clippingPlanes,O.clipIntersection=N.clipIntersection,O.displacementMap=N.displacementMap,O.displacementScale=N.displacementScale,O.displacementBias=N.displacementBias,O.wireframeLinewidth=N.wireframeLinewidth,O.linewidth=N.linewidth,U.isPointLight===!0&&O.isMeshDistanceMaterial===!0&&(i.properties.get(O).light=U),O}function y(R,N,U,C,O){if(R.visible===!1)return;if(R.layers.test(N.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&O===Un)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);let F=e.update(R),Z=R.material;if(Array.isArray(Z)){let G=F.groups;for(let j=0,q=G.length;j<q;j++){let oe=G[j],ee=Z[oe.materialIndex];if(ee&&ee.visible){let ye=x(R,ee,C,O);R.onBeforeShadow(i,R,N,U,F,ye,oe),i.renderBufferDirect(U,null,F,ye,R,oe),R.onAfterShadow(i,R,N,U,F,ye,oe)}}}else if(Z.visible){let G=x(R,Z,C,O);R.onBeforeShadow(i,R,N,U,F,G,null),i.renderBufferDirect(U,null,F,G,R,null),R.onAfterShadow(i,R,N,U,F,G,null)}}let z=R.children;for(let F=0,Z=z.length;F<Z;F++)y(z[F],N,U,C,O)}function T(R){R.target.removeEventListener("dispose",T);for(let N in c){let U=c[N],C=R.target.uuid;C in U&&(U[C].dispose(),delete U[C])}}this.render=function(R,N,U){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;let C=i.getRenderTarget(),O=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ei),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let Z=g!==Un&&this.type===Un,G=g===Un&&this.type!==Un;for(let j=0,q=R.length;j<q;j++){let oe=R[j],ee=oe.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;r.copy(ee.mapSize);let ye=ee.getFrameExtents();if(r.multiply(ye),s.copy(ee.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ye.x),r.x=s.x*ye.x,ee.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ye.y),r.y=s.y*ye.y,ee.mapSize.y=s.y)),ee.map===null||Z===!0||G===!0){let Se=this.type!==Un?{minFilter:Yt,magFilter:Yt}:{};ee.map!==null&&ee.map.dispose(),ee.map=new An(r.x,r.y,Se),ee.map.texture.name=oe.name+".shadowMap",ee.camera.updateProjectionMatrix()}i.setRenderTarget(ee.map),i.clear();let we=ee.getViewportCount();for(let Se=0;Se<we;Se++){let Le=ee.getViewport(Se);a.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),F.viewport(a),ee.updateMatrices(oe,Se),n=ee.getFrustum(),y(N,U,ee.camera,oe,this.type)}ee.isPointLightShadow!==!0&&this.type===Un&&_(ee,U),ee.needsUpdate=!1}g=this.type,f.needsUpdate=!1,i.setRenderTarget(C,O,z)}}var s0={[Ho]:Vo,[Wo]:qo,[Xo]:Yo,[oa]:jo,[Vo]:Ho,[qo]:Wo,[Yo]:Xo,[jo]:oa};function a0(i,e){let t=new function(){let M=!1,A=new Qe,D=null,I=new Qe(0,0,0,0);return{setMask:function(Y){D===Y||M||(i.colorMask(Y,Y,Y,Y),D=Y)},setLocked:function(Y){M=Y},setClear:function(Y,k,H,re,ge){ge===!0&&(Y*=re,k*=re,H*=re),A.set(Y,k,H,re),I.equals(A)===!1&&(i.clearColor(Y,k,H,re),I.copy(A))},reset:function(){M=!1,D=null,I.set(-1,0,0,0)}}},n=new function(){let M=!1,A=!1,D=null,I=null,Y=null;return{setReversed:function(k){if(A!==k){let H=e.get("EXT_clip_control");k?H.clipControlEXT(H.LOWER_LEFT_EXT,H.ZERO_TO_ONE_EXT):H.clipControlEXT(H.LOWER_LEFT_EXT,H.NEGATIVE_ONE_TO_ONE_EXT),A=k;let re=Y;Y=null,this.setClear(re)}},getReversed:function(){return A},setTest:function(k){k?he(i.DEPTH_TEST):ce(i.DEPTH_TEST)},setMask:function(k){D===k||M||(i.depthMask(k),D=k)},setFunc:function(k){if(A&&(k=s0[k]),I!==k){switch(k){case Ho:i.depthFunc(i.NEVER);break;case Vo:i.depthFunc(i.ALWAYS);break;case Wo:i.depthFunc(i.LESS);break;case oa:i.depthFunc(i.LEQUAL);break;case Xo:i.depthFunc(i.EQUAL);break;case jo:i.depthFunc(i.GEQUAL);break;case qo:i.depthFunc(i.GREATER);break;case Yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}I=k}},setLocked:function(k){M=k},setClear:function(k){Y!==k&&(A&&(k=1-k),i.clearDepth(k),Y=k)},reset:function(){M=!1,D=null,I=null,Y=null,A=!1}}},r=new function(){let M=!1,A=null,D=null,I=null,Y=null,k=null,H=null,re=null,ge=null;return{setTest:function(se){M||(se?he(i.STENCIL_TEST):ce(i.STENCIL_TEST))},setMask:function(se){A===se||M||(i.stencilMask(se),A=se)},setFunc:function(se,Me,Te){D===se&&I===Me&&Y===Te||(i.stencilFunc(se,Me,Te),D=se,I=Me,Y=Te)},setOp:function(se,Me,Te){k===se&&H===Me&&re===Te||(i.stencilOp(se,Me,Te),k=se,H=Me,re=Te)},setLocked:function(se){M=se},setClear:function(se){ge!==se&&(i.clearStencil(se),ge=se)},reset:function(){M=!1,A=null,D=null,I=null,Y=null,k=null,H=null,re=null,ge=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,p=!1,d=null,m=null,v=null,f=null,g=null,_=null,x=null,y=new Ae(0,0,0),T=0,R=!1,N=null,U=null,C=null,O=null,z=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,G=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(j)[1]),Z=G>=1):j.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Z=G>=2);let q=null,oe={},ee=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),we=new Qe().fromArray(ee),Se=new Qe().fromArray(ye);function Le(M,A,D,I){let Y=new Uint8Array(4),k=i.createTexture();i.bindTexture(M,k),i.texParameteri(M,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(M,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let H=0;H<D;H++)M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY?i.texImage3D(A,0,i.RGBA,1,1,I,0,i.RGBA,i.UNSIGNED_BYTE,Y):i.texImage2D(A+H,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Y);return k}let le={};function he(M){o[M]!==!0&&(i.enable(M),o[M]=!0)}function ce(M){o[M]!==!1&&(i.disable(M),o[M]=!1)}le[i.TEXTURE_2D]=Le(i.TEXTURE_2D,i.TEXTURE_2D,1),le[i.TEXTURE_CUBE_MAP]=Le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[i.TEXTURE_2D_ARRAY]=Le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),le[i.TEXTURE_3D]=Le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),he(i.DEPTH_TEST),n.setFunc(oa),S(!1),B(bc),he(i.CULL_FACE),b(Ei);let Ie={[Xr]:i.FUNC_ADD,[Od]:i.FUNC_SUBTRACT,[Fd]:i.FUNC_REVERSE_SUBTRACT};Ie[Bd]=i.MIN,Ie[kd]=i.MAX;let Ne={[zd]:i.ZERO,[Gd]:i.ONE,[Hd]:i.SRC_COLOR,[Wd]:i.SRC_ALPHA,[Kd]:i.SRC_ALPHA_SATURATE,[Yd]:i.DST_COLOR,[jd]:i.DST_ALPHA,[Vd]:i.ONE_MINUS_SRC_COLOR,[Xd]:i.ONE_MINUS_SRC_ALPHA,[Zd]:i.ONE_MINUS_DST_COLOR,[qd]:i.ONE_MINUS_DST_ALPHA,[Jd]:i.CONSTANT_COLOR,[$d]:i.ONE_MINUS_CONSTANT_COLOR,[Qd]:i.CONSTANT_ALPHA,[ep]:i.ONE_MINUS_CONSTANT_ALPHA};function b(M,A,D,I,Y,k,H,re,ge,se){if(M!==Ei){if(p===!1&&(he(i.BLEND),p=!0),M===Ud)Y=Y||A,k=k||D,H=H||I,A===m&&Y===g||(i.blendEquationSeparate(Ie[A],Ie[Y]),m=A,g=Y),D===v&&I===f&&k===_&&H===x||(i.blendFuncSeparate(Ne[D],Ne[I],Ne[k],Ne[H]),v=D,f=I,_=k,x=H),re.equals(y)!==!1&&ge===T||(i.blendColor(re.r,re.g,re.b,ge),y.copy(re),T=ge),d=M,R=!1;else if(M!==d||se!==R){if(m===Xr&&g===Xr||(i.blendEquation(i.FUNC_ADD),m=Xr,g=Xr),se)switch(M){case aa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wc:i.blendFunc(i.ONE,i.ONE);break;case Ec:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ac:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}else switch(M){case aa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ec:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ac:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}v=null,f=null,_=null,x=null,y.set(0,0,0),T=0,d=M,R=se}}else p===!0&&(ce(i.BLEND),p=!1)}function S(M){N!==M&&(M?i.frontFace(i.CW):i.frontFace(i.CCW),N=M)}function B(M){M!==Nd?(he(i.CULL_FACE),M!==U&&(M===bc?i.cullFace(i.BACK):M===Dd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ce(i.CULL_FACE),U=M}function L(M,A,D){M?(he(i.POLYGON_OFFSET_FILL),O===A&&z===D||(i.polygonOffset(A,D),O=A,z=D)):ce(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:he,disable:ce,bindFramebuffer:function(M,A){return l[M]!==A&&(i.bindFramebuffer(M,A),l[M]=A,M===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=A),M===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=A),!0)},drawBuffers:function(M,A){let D=h,I=!1;if(M){D=c.get(A),D===void 0&&(D=[],c.set(A,D));let Y=M.textures;if(D.length!==Y.length||D[0]!==i.COLOR_ATTACHMENT0){for(let k=0,H=Y.length;k<H;k++)D[k]=i.COLOR_ATTACHMENT0+k;D.length=Y.length,I=!0}}else D[0]!==i.BACK&&(D[0]=i.BACK,I=!0);I&&i.drawBuffers(D)},useProgram:function(M){return u!==M&&(i.useProgram(M),u=M,!0)},setBlending:b,setMaterial:function(M,A){M.side===sn?ce(i.CULL_FACE):he(i.CULL_FACE);let D=M.side===Kt;A&&(D=!D),S(D),M.blending===aa&&M.transparent===!1?b(Ei):b(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),n.setFunc(M.depthFunc),n.setTest(M.depthTest),n.setMask(M.depthWrite),t.setMask(M.colorWrite);let I=M.stencilWrite;r.setTest(I),I&&(r.setMask(M.stencilWriteMask),r.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),r.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),L(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):ce(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:S,setCullFace:B,setLineWidth:function(M){M!==C&&(Z&&i.lineWidth(M),C=M)},setPolygonOffset:L,setScissorTest:function(M){M?he(i.SCISSOR_TEST):ce(i.SCISSOR_TEST)},activeTexture:function(M){M===void 0&&(M=i.TEXTURE0+F-1),q!==M&&(i.activeTexture(M),q=M)},bindTexture:function(M,A,D){D===void 0&&(D=q===null?i.TEXTURE0+F-1:q);let I=oe[D];I===void 0&&(I={type:void 0,texture:void 0},oe[D]=I),I.type===M&&I.texture===A||(q!==D&&(i.activeTexture(D),q=D),i.bindTexture(M,A||le[M]),I.type=M,I.texture=A)},unbindTexture:function(){let M=oe[q];M!==void 0&&M.type!==void 0&&(i.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},updateUBOMapping:function(M,A){let D=a.get(A);D===void 0&&(D=new WeakMap,a.set(A,D));let I=D.get(M);I===void 0&&(I=i.getUniformBlockIndex(A,M.name),D.set(M,I))},uniformBlockBinding:function(M,A){let D=a.get(A).get(M);s.get(A)!==D&&(i.uniformBlockBinding(A,D,M.__bindingPointIndex),s.set(A,D))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},scissor:function(M){we.equals(M)===!1&&(i.scissor(M.x,M.y,M.z,M.w),we.copy(M))},viewport:function(M){Se.equals(M)===!1&&(i.viewport(M.x,M.y,M.z,M.w),Se.copy(M))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},q=null,oe={},l={},c=new WeakMap,h=[],u=null,p=!1,d=null,m=null,v=null,f=null,g=null,_=null,x=null,y=new Ae(0,0,0),T=0,R=!1,N=null,U=null,C=null,O=null,z=null,we.set(0,0,i.canvas.width,i.canvas.height),Se.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function o0(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap,u,p=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(b,S){return d?new OffscreenCanvas(b,S):Cr("canvas")}function v(b,S,B){let L=1,M=Ne(b);if((M.width>B||M.height>B)&&(L=B/Math.max(M.width,M.height)),L<1){if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let A=Math.floor(L*M.width),D=Math.floor(L*M.height);u===void 0&&(u=m(A,D));let I=S?m(A,D):u;return I.width=A,I.height=D,I.getContext("2d").drawImage(b,0,0,A,D),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+A+"x"+D+")."),I}return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),b}return b}function f(b){return b.generateMipmaps}function g(b){i.generateMipmap(b)}function _(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(b,S,B,L,M=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let A=S;if(S===i.RED&&(B===i.FLOAT&&(A=i.R32F),B===i.HALF_FLOAT&&(A=i.R16F),B===i.UNSIGNED_BYTE&&(A=i.R8)),S===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(A=i.R8UI),B===i.UNSIGNED_SHORT&&(A=i.R16UI),B===i.UNSIGNED_INT&&(A=i.R32UI),B===i.BYTE&&(A=i.R8I),B===i.SHORT&&(A=i.R16I),B===i.INT&&(A=i.R32I)),S===i.RG&&(B===i.FLOAT&&(A=i.RG32F),B===i.HALF_FLOAT&&(A=i.RG16F),B===i.UNSIGNED_BYTE&&(A=i.RG8)),S===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(A=i.RG8UI),B===i.UNSIGNED_SHORT&&(A=i.RG16UI),B===i.UNSIGNED_INT&&(A=i.RG32UI),B===i.BYTE&&(A=i.RG8I),B===i.SHORT&&(A=i.RG16I),B===i.INT&&(A=i.RG32I)),S===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(A=i.RGB8UI),B===i.UNSIGNED_SHORT&&(A=i.RGB16UI),B===i.UNSIGNED_INT&&(A=i.RGB32UI),B===i.BYTE&&(A=i.RGB8I),B===i.SHORT&&(A=i.RGB16I),B===i.INT&&(A=i.RGB32I)),S===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(A=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(A=i.RGBA16UI),B===i.UNSIGNED_INT&&(A=i.RGBA32UI),B===i.BYTE&&(A=i.RGBA8I),B===i.SHORT&&(A=i.RGBA16I),B===i.INT&&(A=i.RGBA32I)),S===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(A=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(A=i.R11F_G11F_B10F)),S===i.RGBA){let D=M?Es:Ze.getTransfer(L);B===i.FLOAT&&(A=i.RGBA32F),B===i.HALF_FLOAT&&(A=i.RGBA16F),B===i.UNSIGNED_BYTE&&(A=D===rt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(A=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(A=i.RGB5_A1)}return A!==i.R16F&&A!==i.R32F&&A!==i.RG16F&&A!==i.RG32F&&A!==i.RGBA16F&&A!==i.RGBA32F||e.get("EXT_color_buffer_float"),A}function y(b,S){let B;return b?S===null||S===$i||S===Kr?B=i.DEPTH24_STENCIL8:S===an?B=i.DEPTH32F_STENCIL8:S===Yr&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===$i||S===Kr?B=i.DEPTH_COMPONENT24:S===an?B=i.DEPTH_COMPONENT32F:S===Yr&&(B=i.DEPTH_COMPONENT16),B}function T(b,S){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Yt&&b.minFilter!==Vt?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function R(b){let S=b.target;S.removeEventListener("dispose",R),(function(B){let L=n.get(B);if(L.__webglInit===void 0)return;let M=B.source,A=p.get(M);if(A){let D=A[L.__cacheKey];D.usedTimes--,D.usedTimes===0&&U(B),Object.keys(A).length===0&&p.delete(M)}n.remove(B)})(S),S.isVideoTexture&&h.delete(S)}function N(b){let S=b.target;S.removeEventListener("dispose",N),(function(B){let L=n.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),n.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(L.__webglFramebuffer[A]))for(let D=0;D<L.__webglFramebuffer[A].length;D++)i.deleteFramebuffer(L.__webglFramebuffer[A][D]);else i.deleteFramebuffer(L.__webglFramebuffer[A]);L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer[A])}else{if(Array.isArray(L.__webglFramebuffer))for(let A=0;A<L.__webglFramebuffer.length;A++)i.deleteFramebuffer(L.__webglFramebuffer[A]);else i.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&i.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let A=0;A<L.__webglColorRenderbuffer.length;A++)L.__webglColorRenderbuffer[A]&&i.deleteRenderbuffer(L.__webglColorRenderbuffer[A]);L.__webglDepthRenderbuffer&&i.deleteRenderbuffer(L.__webglDepthRenderbuffer)}let M=B.textures;for(let A=0,D=M.length;A<D;A++){let I=n.get(M[A]);I.__webglTexture&&(i.deleteTexture(I.__webglTexture),a.memory.textures--),n.remove(M[A])}n.remove(B)})(S)}function U(b){let S=n.get(b);i.deleteTexture(S.__webglTexture);let B=b.source;delete p.get(B)[S.__cacheKey],a.memory.textures--}let C=0;function O(b,S){let B=n.get(b);if(b.isVideoTexture&&(function(L){let M=a.render.frame;h.get(L)!==M&&(h.set(L,M),L.update())})(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&B.__version!==b.version){let L=b.image;if(L===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(L.complete!==!1)return void oe(B,b,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+S)}let z={[tn]:i.REPEAT,[xi]:i.CLAMP_TO_EDGE,[Rr]:i.MIRRORED_REPEAT},F={[Yt]:i.NEAREST,[Jo]:i.NEAREST_MIPMAP_NEAREST,[Ji]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[On]:i.LINEAR_MIPMAP_LINEAR},Z={[_p]:i.NEVER,[bp]:i.ALWAYS,[vp]:i.LESS,[hh]:i.LEQUAL,[xp]:i.EQUAL,[Sp]:i.GEQUAL,[yp]:i.GREATER,[Mp]:i.NOTEQUAL};function G(b,S){if(S.type!==an||e.has("OES_texture_float_linear")!==!1||S.magFilter!==Vt&&S.magFilter!==qr&&S.magFilter!==Ji&&S.magFilter!==On&&S.minFilter!==Vt&&S.minFilter!==qr&&S.minFilter!==Ji&&S.minFilter!==On||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,z[S.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,z[S.wrapT]),b!==i.TEXTURE_3D&&b!==i.TEXTURE_2D_ARRAY||i.texParameteri(b,i.TEXTURE_WRAP_R,z[S.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,F[S.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,F[S.minFilter]),S.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Z[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Yt||S.minFilter!==Ji&&S.minFilter!==On||S.type===an&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function j(b,S){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",R));let L=S.source,M=p.get(L);M===void 0&&(M={},p.set(L,M));let A=(function(D){let I=[];return I.push(D.wrapS),I.push(D.wrapT),I.push(D.wrapR||0),I.push(D.magFilter),I.push(D.minFilter),I.push(D.anisotropy),I.push(D.internalFormat),I.push(D.format),I.push(D.type),I.push(D.generateMipmaps),I.push(D.premultiplyAlpha),I.push(D.flipY),I.push(D.unpackAlignment),I.push(D.colorSpace),I.join()})(S);if(A!==b.__cacheKey){M[A]===void 0&&(M[A]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),M[A].usedTimes++;let D=M[b.__cacheKey];D!==void 0&&(M[b.__cacheKey].usedTimes--,D.usedTimes===0&&U(S)),b.__cacheKey=A,b.__webglTexture=M[A].texture}return B}function q(b,S,B){return Math.floor(Math.floor(b/B)/S)}function oe(b,S,B){let L=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(L=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(L=i.TEXTURE_3D);let M=j(b,S),A=S.source;t.bindTexture(L,b.__webglTexture,i.TEXTURE0+B);let D=n.get(A);if(A.version!==D.__version||M===!0){t.activeTexture(i.TEXTURE0+B);let I=Ze.getPrimaries(Ze.workingColorSpace),Y=S.colorSpace===Qi?null:Ze.getPrimaries(S.colorSpace),k=S.colorSpace===Qi||I===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,k);let H=v(S.image,!1,r.maxTextureSize);H=Ie(S,H);let re=s.convert(S.format,S.colorSpace),ge=s.convert(S.type),se,Me=x(S.internalFormat,re,ge,S.colorSpace,S.isVideoTexture);G(L,S);let Te=S.mipmaps,Re=S.isVideoTexture!==!0,Ve=D.__version===void 0||M===!0,W=A.dataReady,ne=T(S,H);if(S.isDepthTexture)Me=y(S.format===ha,S.type),Ve&&(Re?t.texStorage2D(i.TEXTURE_2D,1,Me,H.width,H.height):t.texImage2D(i.TEXTURE_2D,0,Me,H.width,H.height,0,re,ge,null));else if(S.isDataTexture)if(Te.length>0){Re&&Ve&&t.texStorage2D(i.TEXTURE_2D,ne,Me,Te[0].width,Te[0].height);for(let $=0,J=Te.length;$<J;$++)se=Te[$],Re?W&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,se.width,se.height,re,ge,se.data):t.texImage2D(i.TEXTURE_2D,$,Me,se.width,se.height,0,re,ge,se.data);S.generateMipmaps=!1}else Re?(Ve&&t.texStorage2D(i.TEXTURE_2D,ne,Me,H.width,H.height),W&&(function($,J,pe,Ce){let te=$.updateRanges;if(te.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,pe,Ce,J.data);else{te.sort((P,$e)=>P.start-$e.start);let fe=0;for(let P=1;P<te.length;P++){let $e=te[fe],mt=te[P],et=$e.start+$e.count,Ct=q(mt.start,J.width,4),cn=q($e.start,J.width,4);mt.start<=et+1&&Ct===cn&&q(mt.start+mt.count-1,J.width,4)===Ct?$e.count=Math.max($e.count,mt.start+mt.count-$e.start):(++fe,te[fe]=mt)}te.length=fe+1;let _e=i.getParameter(i.UNPACK_ROW_LENGTH),Ue=i.getParameter(i.UNPACK_SKIP_PIXELS),Je=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,J.width);for(let P=0,$e=te.length;P<$e;P++){let mt=te[P],et=Math.floor(mt.start/4),Ct=Math.ceil(mt.count/4),cn=et%J.width,Vn=Math.floor(et/J.width),Wn=Ct;i.pixelStorei(i.UNPACK_SKIP_PIXELS,cn),i.pixelStorei(i.UNPACK_SKIP_ROWS,Vn),t.texSubImage2D(i.TEXTURE_2D,0,cn,Vn,Wn,1,pe,Ce,J.data)}$.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,_e),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,Je)}})(S,H,re,ge)):t.texImage2D(i.TEXTURE_2D,0,Me,H.width,H.height,0,re,ge,H.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Re&&Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,Me,Te[0].width,Te[0].height,H.depth);for(let $=0,J=Te.length;$<J;$++)if(se=Te[$],S.format!==on)if(re!==null)if(Re){if(W)if(S.layerUpdates.size>0){let pe=_h(se.width,se.height,S.format,S.type);for(let Ce of S.layerUpdates){let te=se.data.subarray(Ce*pe/se.data.BYTES_PER_ELEMENT,(Ce+1)*pe/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,Ce,se.width,se.height,1,re,te)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,se.width,se.height,H.depth,re,se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Me,se.width,se.height,H.depth,0,se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?W&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,se.width,se.height,H.depth,re,ge,se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,Me,se.width,se.height,H.depth,0,re,ge,se.data)}else{Re&&Ve&&t.texStorage2D(i.TEXTURE_2D,ne,Me,Te[0].width,Te[0].height);for(let $=0,J=Te.length;$<J;$++)se=Te[$],S.format!==on?re!==null?Re?W&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,se.width,se.height,re,se.data):t.compressedTexImage2D(i.TEXTURE_2D,$,Me,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?W&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,se.width,se.height,re,ge,se.data):t.texImage2D(i.TEXTURE_2D,$,Me,se.width,se.height,0,re,ge,se.data)}else if(S.isDataArrayTexture)if(Re){if(Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,Me,H.width,H.height,H.depth),W)if(S.layerUpdates.size>0){let $=_h(H.width,H.height,S.format,S.type);for(let J of S.layerUpdates){let pe=H.data.subarray(J*$/H.data.BYTES_PER_ELEMENT,(J+1)*$/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,H.width,H.height,1,re,ge,pe)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,re,ge,H.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Me,H.width,H.height,H.depth,0,re,ge,H.data);else if(S.isData3DTexture)Re?(Ve&&t.texStorage3D(i.TEXTURE_3D,ne,Me,H.width,H.height,H.depth),W&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,re,ge,H.data)):t.texImage3D(i.TEXTURE_3D,0,Me,H.width,H.height,H.depth,0,re,ge,H.data);else if(S.isFramebufferTexture){if(Ve)if(Re)t.texStorage2D(i.TEXTURE_2D,ne,Me,H.width,H.height);else{let $=H.width,J=H.height;for(let pe=0;pe<ne;pe++)t.texImage2D(i.TEXTURE_2D,pe,Me,$,J,0,re,ge,null),$>>=1,J>>=1}}else if(Te.length>0){if(Re&&Ve){let $=Ne(Te[0]);t.texStorage2D(i.TEXTURE_2D,ne,Me,$.width,$.height)}for(let $=0,J=Te.length;$<J;$++)se=Te[$],Re?W&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,re,ge,se):t.texImage2D(i.TEXTURE_2D,$,Me,re,ge,se);S.generateMipmaps=!1}else if(Re){if(Ve){let $=Ne(H);t.texStorage2D(i.TEXTURE_2D,ne,Me,$.width,$.height)}W&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re,ge,H)}else t.texImage2D(i.TEXTURE_2D,0,Me,re,ge,H);f(S)&&g(L),D.__version=A.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function ee(b,S,B,L,M,A){let D=s.convert(B.format,B.colorSpace),I=s.convert(B.type),Y=x(B.internalFormat,D,I,B.colorSpace),k=n.get(S),H=n.get(B);if(H.__renderTarget=S,!k.__hasExternalTextures){let re=Math.max(1,S.width>>A),ge=Math.max(1,S.height>>A);M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY?t.texImage3D(M,A,Y,re,ge,S.depth,0,D,I,null):t.texImage2D(M,A,Y,re,ge,0,D,I,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ce(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,L,M,H.__webglTexture,0,he(S)):(M===i.TEXTURE_2D||M>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&M<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,L,M,H.__webglTexture,A),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(b,S,B){if(i.bindRenderbuffer(i.RENDERBUFFER,b),S.depthBuffer){let L=S.depthTexture,M=L&&L.isDepthTexture?L.type:null,A=y(S.stencilBuffer,M),D=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,I=he(S);ce(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I,A,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,I,A,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,A,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,D,i.RENDERBUFFER,b)}else{let L=S.textures;for(let M=0;M<L.length;M++){let A=L[M],D=s.convert(A.format,A.colorSpace),I=s.convert(A.type),Y=x(A.internalFormat,D,I,A.colorSpace),k=he(S);B&&ce(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,k,Y,S.width,S.height):ce(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k,Y,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Y,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(b,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!S.depthTexture||!S.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let B=n.get(S.depthTexture);B.__renderTarget=S,B.__webglTexture&&S.depthTexture.image.width===S.width&&S.depthTexture.image.height===S.height||(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),O(S.depthTexture,0);let L=B.__webglTexture,M=he(S);if(S.depthTexture.format===ca)ce(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,L,0,M):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,L,0);else{if(S.depthTexture.format!==ha)throw new Error("Unknown depthTexture format");ce(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,L,0,M):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,L,0)}}function Se(b){let S=n.get(b),B=b.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==b.depthTexture){let L=b.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),L){let M=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,L.removeEventListener("dispose",M)};L.addEventListener("dispose",M),S.__depthDisposeCallback=M}S.__boundDepthTexture=L}if(b.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let L=b.texture.mipmaps;L&&L.length>0?we(S.__webglFramebuffer[0],b):we(S.__webglFramebuffer,b)}else if(B){S.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[L]),S.__webglDepthbuffer[L]===void 0)S.__webglDepthbuffer[L]=i.createRenderbuffer(),ye(S.__webglDepthbuffer[L],b,!1);else{let M=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,A=S.__webglDepthbuffer[L];i.bindRenderbuffer(i.RENDERBUFFER,A),i.framebufferRenderbuffer(i.FRAMEBUFFER,M,i.RENDERBUFFER,A)}}else{let L=b.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ye(S.__webglDepthbuffer,b,!1);else{let M=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,A=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,A),i.framebufferRenderbuffer(i.FRAMEBUFFER,M,i.RENDERBUFFER,A)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let Le=[],le=[];function he(b){return Math.min(r.maxSamples,b.samples)}function ce(b){let S=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ie(b,S){let B=b.colorSpace,L=b.format,M=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||B!==Pt&&B!==Qi&&(Ze.getTransfer(B)===rt?L===on&&M===Fn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function Ne(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=function(){let b=C;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),C+=1,b},this.resetTextureUnits=function(){C=0},this.setTexture2D=O,this.setTexture2DArray=function(b,S){let B=n.get(b);b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version?oe(B,b,S):t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+S)},this.setTexture3D=function(b,S){let B=n.get(b);b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version?oe(B,b,S):t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+S)},this.setTextureCube=function(b,S){let B=n.get(b);b.version>0&&B.__version!==b.version?(function(L,M,A){if(M.image.length!==6)return;let D=j(L,M),I=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+A);let Y=n.get(I);if(I.version!==Y.__version||D===!0){t.activeTexture(i.TEXTURE0+A);let k=Ze.getPrimaries(Ze.workingColorSpace),H=M.colorSpace===Qi?null:Ze.getPrimaries(M.colorSpace),re=M.colorSpace===Qi||k===H?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let ge=M.isCompressedTexture||M.image[0].isCompressedTexture,se=M.image[0]&&M.image[0].isDataTexture,Me=[];for(let te=0;te<6;te++)Me[te]=ge||se?se?M.image[te].image:M.image[te]:v(M.image[te],!0,r.maxCubemapSize),Me[te]=Ie(M,Me[te]);let Te=Me[0],Re=s.convert(M.format,M.colorSpace),Ve=s.convert(M.type),W=x(M.internalFormat,Re,Ve,M.colorSpace),ne=M.isVideoTexture!==!0,$=Y.__version===void 0||D===!0,J=I.dataReady,pe,Ce=T(M,Te);if(G(i.TEXTURE_CUBE_MAP,M),ge){ne&&$&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,W,Te.width,Te.height);for(let te=0;te<6;te++){pe=Me[te].mipmaps;for(let fe=0;fe<pe.length;fe++){let _e=pe[fe];M.format!==on?Re!==null?ne?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe,0,0,_e.width,_e.height,Re,_e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe,W,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ne?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe,0,0,_e.width,_e.height,Re,Ve,_e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe,W,_e.width,_e.height,0,Re,Ve,_e.data)}}}else{if(pe=M.mipmaps,ne&&$){pe.length>0&&Ce++;let te=Ne(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,W,te.width,te.height)}for(let te=0;te<6;te++)if(se){ne?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Me[te].width,Me[te].height,Re,Ve,Me[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,W,Me[te].width,Me[te].height,0,Re,Ve,Me[te].data);for(let fe=0;fe<pe.length;fe++){let _e=pe[fe].image[te].image;ne?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe+1,0,0,_e.width,_e.height,Re,Ve,_e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe+1,W,_e.width,_e.height,0,Re,Ve,_e.data)}}else{ne?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Re,Ve,Me[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,W,Re,Ve,Me[te]);for(let fe=0;fe<pe.length;fe++){let _e=pe[fe];ne?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe+1,0,0,Re,Ve,_e.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,fe+1,W,Re,Ve,_e.image[te])}}}f(M)&&g(i.TEXTURE_CUBE_MAP),Y.__version=I.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version})(B,b,S):t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+S)},this.rebindTextures=function(b,S,B){let L=n.get(b);S!==void 0&&ee(L.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Se(b)},this.setupRenderTarget=function(b){let S=b.texture,B=n.get(b),L=n.get(S);b.addEventListener("dispose",N);let M=b.textures,A=b.isWebGLCubeRenderTarget===!0,D=M.length>1;if(D||(L.__webglTexture===void 0&&(L.__webglTexture=i.createTexture()),L.__version=S.version,a.memory.textures++),A){B.__webglFramebuffer=[];for(let I=0;I<6;I++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[I]=[];for(let Y=0;Y<S.mipmaps.length;Y++)B.__webglFramebuffer[I][Y]=i.createFramebuffer()}else B.__webglFramebuffer[I]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let I=0;I<S.mipmaps.length;I++)B.__webglFramebuffer[I]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(D)for(let I=0,Y=M.length;I<Y;I++){let k=n.get(M[I]);k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&ce(b)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let I=0;I<M.length;I++){let Y=M[I];B.__webglColorRenderbuffer[I]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[I]);let k=s.convert(Y.format,Y.colorSpace),H=s.convert(Y.type),re=x(Y.internalFormat,k,H,Y.colorSpace,b.isXRRenderTarget===!0),ge=he(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,re,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+I,i.RENDERBUFFER,B.__webglColorRenderbuffer[I])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(A){t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture),G(i.TEXTURE_CUBE_MAP,S);for(let I=0;I<6;I++)if(S.mipmaps&&S.mipmaps.length>0)for(let Y=0;Y<S.mipmaps.length;Y++)ee(B.__webglFramebuffer[I][Y],b,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+I,Y);else ee(B.__webglFramebuffer[I],b,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+I,0);f(S)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(D){for(let I=0,Y=M.length;I<Y;I++){let k=M[I],H=n.get(k),re=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,H.__webglTexture),G(re,k),ee(B.__webglFramebuffer,b,k,i.COLOR_ATTACHMENT0+I,re,0),f(k)&&g(re)}t.unbindTexture()}else{let I=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(I=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(I,L.__webglTexture),G(I,S),S.mipmaps&&S.mipmaps.length>0)for(let Y=0;Y<S.mipmaps.length;Y++)ee(B.__webglFramebuffer[Y],b,S,i.COLOR_ATTACHMENT0,I,Y);else ee(B.__webglFramebuffer,b,S,i.COLOR_ATTACHMENT0,I,0);f(S)&&g(I),t.unbindTexture()}b.depthBuffer&&Se(b)},this.updateRenderTargetMipmap=function(b){let S=b.textures;for(let B=0,L=S.length;B<L;B++){let M=S[B];if(f(M)){let A=_(b),D=n.get(M).__webglTexture;t.bindTexture(A,D),g(A),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(b){if(b.samples>0){if(ce(b)===!1){let S=b.textures,B=b.width,L=b.height,M=i.COLOR_BUFFER_BIT,A=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=n.get(b),I=S.length>1;if(I)for(let k=0;k<S.length;k++)t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,D.__webglMultisampledFramebuffer);let Y=b.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglFramebuffer);for(let k=0;k<S.length;k++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(M|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(M|=i.STENCIL_BUFFER_BIT)),I){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,D.__webglColorRenderbuffer[k]);let H=n.get(S[k]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,H,0)}i.blitFramebuffer(0,0,B,L,0,0,B,L,M,i.NEAREST),l===!0&&(Le.length=0,le.length=0,Le.push(i.COLOR_ATTACHMENT0+k),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Le.push(A),le.push(A),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Le))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),I)for(let k=0;k<S.length;k++){t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,D.__webglColorRenderbuffer[k]);let H=n.get(S[k]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,H,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){let S=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=ce}function l0(i,e){return{convert:function(t,n=Qi){let r,s=Ze.getTransfer(n);if(t===Fn)return i.UNSIGNED_BYTE;if(t===Qo)return i.UNSIGNED_SHORT_4_4_4_4;if(t===el)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Pc)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===Cc)return i.BYTE;if(t===Ic)return i.SHORT;if(t===Yr)return i.UNSIGNED_SHORT;if(t===$o)return i.INT;if(t===$i)return i.UNSIGNED_INT;if(t===an)return i.FLOAT;if(t===Zr)return i.HALF_FLOAT;if(t===up)return i.ALPHA;if(t===dp)return i.RGB;if(t===on)return i.RGBA;if(t===ca)return i.DEPTH_COMPONENT;if(t===ha)return i.DEPTH_STENCIL;if(t===tl)return i.RED;if(t===nl)return i.RED_INTEGER;if(t===pp)return i.RG;if(t===Nc)return i.RG_INTEGER;if(t===Dc)return i.RGBA_INTEGER;if(t===il||t===rl||t===sl||t===al)if(s===rt){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===il)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===rl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===sl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===al)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===il)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===rl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===sl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===al)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Uc||t===Oc||t===Fc||t===Bc){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Uc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Fc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Bc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===kc||t===zc||t===Gc){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===kc||t===zc)return s===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Gc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Hc||t===Vc||t===Wc||t===Xc||t===jc||t===qc||t===Yc||t===Zc||t===Kc||t===Jc||t===$c||t===Qc||t===eh||t===th){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Hc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Vc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Wc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Xc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===jc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===qc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Yc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Zc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Kc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Jc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===$c)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Qc)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===eh)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===th)return s===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===nh||t===ih||t===rh){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===nh)return s===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ih)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===rh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===sh||t===ah||t===oh||t===lh){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===sh)return r.COMPRESSED_RED_RGTC1_EXT;if(t===ah)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===oh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===lh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Kr?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var Ih=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new vn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ph=class extends ii{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,p=null,d=null,m=null,v=typeof XRWebGLBinding<"u",f=new Ih,g={},_=t.getContextAttributes(),x=null,y=null,T=[],R=[],N=new ie,U=null,C=new yt;C.viewport=new Qe;let O=new yt;O.viewport=new Qe;let z=[C,O],F=new zo,Z=null,G=null;function j(le){let he=R.indexOf(le.inputSource);if(he===-1)return;let ce=T[he];ce!==void 0&&(ce.update(le.inputSource,le.frame,c||a),ce.dispatchEvent({type:le.type,data:le.inputSource}))}function q(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",oe);for(let le=0;le<T.length;le++){let he=R[le];he!==null&&(R[le]=null,T[le].disconnect(he))}Z=null,G=null,f.reset();for(let le in g)delete g[le];e.setRenderTarget(x),d=null,p=null,u=null,r=null,y=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}function oe(le){for(let he=0;he<le.removed.length;he++){let ce=le.removed[he],Ie=R.indexOf(ce);Ie>=0&&(R[Ie]=null,T[Ie].disconnect(ce))}for(let he=0;he<le.added.length;he++){let ce=le.added[he],Ie=R.indexOf(ce);if(Ie===-1){for(let b=0;b<T.length;b++){if(b>=R.length){R.push(ce),Ie=b;break}if(R[b]===null){R[b]=ce,Ie=b;break}}if(Ie===-1)break}let Ne=T[Ie];Ne&&Ne.connect(ce)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let he=T[le];return he===void 0&&(he=new Dr,T[le]=he),he.getTargetRaySpace()},this.getControllerGrip=function(le){let he=T[le];return he===void 0&&(he=new Dr,T[le]=he),he.getGripSpace()},this.getHand=function(le){let he=T[le];return he===void 0&&(he=new Dr,T[le]=he),he.getHandSpace()},this.setFramebufferScaleFactor=function(le){s=le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){o=le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(le){c=le},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(le){if(r=le,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",q),r.addEventListener("inputsourceschange",oe),_.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(N),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,ce=null,Ie=null;_.depth&&(Ie=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=_.stencil?ha:ca,ce=_.stencil?Kr:$i);let Ne={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:s};u=this.getBinding(),p=u.createProjectionLayer(Ne),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),y=new An(p.textureWidth,p.textureHeight,{format:on,type:Fn,depthTexture:new Gs(p.textureWidth,p.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let he={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,he),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new An(d.framebufferWidth,d.framebufferHeight,{format:on,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Le.setContext(r),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let ee=new w,ye=new w;function we(le,he){he===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(he.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(r===null)return;let he=le.near,ce=le.far;f.texture!==null&&(f.depthNear>0&&(he=f.depthNear),f.depthFar>0&&(ce=f.depthFar)),F.near=O.near=C.near=he,F.far=O.far=C.far=ce,Z===F.near&&G===F.far||(r.updateRenderState({depthNear:F.near,depthFar:F.far}),Z=F.near,G=F.far),F.layers.mask=6|le.layers.mask,C.layers.mask=3&F.layers.mask,O.layers.mask=5&F.layers.mask;let Ie=le.parent,Ne=F.cameras;we(F,Ie);for(let b=0;b<Ne.length;b++)we(Ne[b],Ie);Ne.length===2?(function(b,S,B){ee.setFromMatrixPosition(S.matrixWorld),ye.setFromMatrixPosition(B.matrixWorld);let L=ee.distanceTo(ye),M=S.projectionMatrix.elements,A=B.projectionMatrix.elements,D=M[14]/(M[10]-1),I=M[14]/(M[10]+1),Y=(M[9]+1)/M[5],k=(M[9]-1)/M[5],H=(M[8]-1)/M[0],re=(A[8]+1)/A[0],ge=D*H,se=D*re,Me=L/(-H+re),Te=Me*-H;if(S.matrixWorld.decompose(b.position,b.quaternion,b.scale),b.translateX(Te),b.translateZ(Me),b.matrixWorld.compose(b.position,b.quaternion,b.scale),b.matrixWorldInverse.copy(b.matrixWorld).invert(),M[10]===-1)b.projectionMatrix.copy(S.projectionMatrix),b.projectionMatrixInverse.copy(S.projectionMatrixInverse);else{let Re=D+Me,Ve=I+Me,W=ge-Te,ne=se+(L-Te),$=Y*I/Ve*Re,J=k*I/Ve*Re;b.projectionMatrix.makePerspective(W,ne,$,J,Re,Ve),b.projectionMatrixInverse.copy(b.projectionMatrix).invert()}})(F,C,O):F.projectionMatrix.copy(C.projectionMatrix),(function(b,S,B){B===null?b.matrix.copy(S.matrixWorld):(b.matrix.copy(B.matrixWorld),b.matrix.invert(),b.matrix.multiply(S.matrixWorld)),b.matrix.decompose(b.position,b.quaternion,b.scale),b.updateMatrixWorld(!0),b.projectionMatrix.copy(S.projectionMatrix),b.projectionMatrixInverse.copy(S.projectionMatrixInverse),b.isPerspectiveCamera&&(b.fov=2*Hi*Math.atan(1/b.projectionMatrix.elements[5]),b.zoom=1)})(le,F,Ie)},this.getCamera=function(){return F},this.getFoveation=function(){if(p!==null||d!==null)return l},this.setFoveation=function(le){l=le,p!==null&&(p.fixedFoveation=le),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=le)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(F)},this.getCameraTexture=function(le){return g[le]};let Se=null,Le=new nf;Le.setAnimationLoop(function(le,he){if(h=he.getViewerPose(c||a),m=he,h!==null){let ce=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Ie=!1;ce.length!==F.cameras.length&&(F.cameras.length=0,Ie=!0);for(let b=0;b<ce.length;b++){let S=ce[b],B=null;if(d!==null)B=d.getViewport(S);else{let M=u.getViewSubImage(p,S);B=M.viewport,b===0&&(e.setRenderTargetTextures(y,M.colorTexture,M.depthStencilTexture),e.setRenderTarget(y))}let L=z[b];L===void 0&&(L=new yt,L.layers.enable(b),L.viewport=new Qe,z[b]=L),L.matrix.fromArray(S.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(S.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(B.x,B.y,B.width,B.height),b===0&&(F.matrix.copy(L.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ie===!0&&F.cameras.push(L)}let Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let b=u.getDepthInformation(ce[0]);b&&b.isValid&&b.texture&&f.init(b,r.renderState)}if(Ne&&Ne.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let b=0;b<ce.length;b++){let S=ce[b].camera;if(S){let B=g[S];B||(B=new Hs,g[S]=B);let L=u.getCameraImage(S);B.sourceTexture=L}}}}for(let ce=0;ce<T.length;ce++){let Ie=R[ce],Ne=T[ce];Ie!==null&&Ne!==void 0&&Ne.update(Ie,he,c||a)}Se&&Se(le,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),m=null}),this.setAnimationLoop=function(le){Se=le},this.dispose=function(){}}},nr=new _n,c0=new Pe;function h0(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Kt&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Kt&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,nr.copy(l),nr.x*=-1,nr.y*=-1,nr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(nr.y*=-1,nr.z*=-1),r.envMapRotation.value.setFromMatrix4(c0.makeRotationFromEuler(nr)),r.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,fh(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(r,s):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Kt&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,u,p){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*p,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function u0(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,p,d,m){let v=u.value,f=p+"_"+d;if(m[f]===void 0)return m[f]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=m[f];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return m[f]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function c(u){let p={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(p.boundary=4,p.storage=4):u.isVector2?(p.boundary=8,p.storage=8):u.isVector3||u.isColor?(p.boundary=16,p.storage=12):u.isVector4?(p.boundary=16,p.storage=16):u.isMatrix3?(p.boundary=48,p.storage=48):u.isMatrix4?(p.boundary=64,p.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),p}function h(u){let p=u.target;p.removeEventListener("dispose",h);let d=a.indexOf(p.__bindingPointIndex);a.splice(d,1),i.deleteBuffer(r[p.id]),delete r[p.id],delete s[p.id]}return{bind:function(u,p){let d=p.program;n.uniformBlockBinding(u,d)},update:function(u,p){let d=r[u.id];d===void 0&&((function(f){let g=f.uniforms,_=0,x=16;for(let T=0,R=g.length;T<R;T++){let N=Array.isArray(g[T])?g[T]:[g[T]];for(let U=0,C=N.length;U<C;U++){let O=N[U],z=Array.isArray(O.value)?O.value:[O.value];for(let F=0,Z=z.length;F<Z;F++){let G=c(z[F]),j=_%x,q=j%G.boundary,oe=j+q;_+=q,oe!==0&&x-oe<G.storage&&(_+=x-oe),O.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=_,_+=G.storage}}}let y=_%x;y>0&&(_+=x-y),f.__size=_,f.__cache={}})(u),d=(function(f){let g=(function(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let _=i.createBuffer(),x=f.__size,y=f.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,x,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,_),_})(u),r[u.id]=d,u.addEventListener("dispose",h));let m=p.program;n.updateUBOMapping(u,m);let v=e.render.frame;s[u.id]!==v&&((function(f){let g=r[f.id],_=f.uniforms,x=f.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let y=0,T=_.length;y<T;y++){let R=Array.isArray(_[y])?_[y]:[_[y]];for(let N=0,U=R.length;N<U;N++){let C=R[N];if(l(C,y,N,x)===!0){let O=C.__offset,z=Array.isArray(C.value)?C.value:[C.value],F=0;for(let Z=0;Z<z.length;Z++){let G=z[Z],j=c(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,O+F,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,F),F+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in r)i.deleteBuffer(r[u]);a=[],r={},s={}}}}var ul=class{constructor(e={}){let{canvas:t=Tp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e,d;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let m=new Uint32Array(4),v=new Int32Array(4),f=null,g=null,_=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,T=!1;this._outputColorSpace=st;let R=0,N=0,U=null,C=-1,O=null,z=new Qe,F=new Qe,Z=null,G=new Ae(0),j=0,q=t.width,oe=t.height,ee=1,ye=null,we=null,Se=new Qe(0,0,q,oe),Le=new Qe(0,0,q,oe),le=!1,he=new Si,ce=!1,Ie=!1,Ne=new Pe,b=new w,S=new Qe,B={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},L=!1;function M(){return U===null?ee:1}let A,D,I,Y,k,H,re,ge,se,Me,Te,Re,Ve,W,ne,$,J,pe,Ce,te,fe,_e,Ue,Je,P=n;function $e(E,V){return t.getContext(E,V)}try{let E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ct,!1),t.addEventListener("webglcontextrestored",cn,!1),t.addEventListener("webglcontextcreationerror",Vn,!1),P===null){let V="webgl2";if(P=$e(V,E),P===null)throw $e(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}function mt(){A=new qm(P),A.init(),_e=new l0(P,A),D=new Hm(P,A,e,_e),I=new a0(P,A),D.reversedDepthBuffer&&p&&I.buffers.depth.setReversed(!0),Y=new Km(P),k=new Kg,H=new o0(P,A,I,k,D,_e,Y),re=new Wm(y),ge=new jm(y),se=new Fm(P),Ue=new zm(P,se),Me=new Ym(P,se,Y,Ue),Te=new $m(P,Me,se,Y),Ce=new Jm(P,D,H),$=new Vm(k),Re=new Zg(y,re,ge,A,D,Ue,$),Ve=new h0(y,k),W=new $g,ne=new i0(A),pe=new km(y,re,ge,I,Te,d,l),J=new r0(y,Te,D),Je=new u0(P,Y,D,I),te=new Gm(P,A,Y),fe=new Zm(P,A,Y),Y.programs=Re.programs,y.capabilities=D,y.extensions=A,y.properties=k,y.renderLists=W,y.shadowMap=J,y.state=I,y.info=Y}mt();let et=new Ph(y,P);function Ct(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function cn(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let E=Y.autoReset,V=J.enabled,K=J.autoUpdate,Q=J.needsUpdate,X=J.type;mt(),Y.autoReset=E,J.enabled=V,J.autoUpdate=K,J.needsUpdate=Q,J.type=X}function Vn(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Wn(E){let V=E.target;V.removeEventListener("dispose",Wn),(function(K){(function(Q){let X=k.get(Q).programs;X!==void 0&&(X.forEach(function(ae){Re.releaseProgram(ae)}),Q.isShaderMaterial&&Re.releaseShaderCache(Q))})(K),k.remove(K)})(V)}function or(E,V,K){E.transparent===!0&&E.side===sn&&E.forceSinglePass===!1?(E.side=Kt,E.needsUpdate=!0,ya(E,V,K),E.side=wi,E.needsUpdate=!0,ya(E,V,K),E.side=sn):ya(E,V,K)}this.xr=et,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=A.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=A.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(E){E!==void 0&&(ee=E,this.setSize(q,oe,!1))},this.getSize=function(E){return E.set(q,oe)},this.setSize=function(E,V,K=!0){et.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(q=E,oe=V,t.width=Math.floor(E*ee),t.height=Math.floor(V*ee),K===!0&&(t.style.width=E+"px",t.style.height=V+"px"),this.setViewport(0,0,E,V))},this.getDrawingBufferSize=function(E){return E.set(q*ee,oe*ee).floor()},this.setDrawingBufferSize=function(E,V,K){q=E,oe=V,ee=K,t.width=Math.floor(E*K),t.height=Math.floor(V*K),this.setViewport(0,0,E,V)},this.getCurrentViewport=function(E){return E.copy(z)},this.getViewport=function(E){return E.copy(Se)},this.setViewport=function(E,V,K,Q){E.isVector4?Se.set(E.x,E.y,E.z,E.w):Se.set(E,V,K,Q),I.viewport(z.copy(Se).multiplyScalar(ee).round())},this.getScissor=function(E){return E.copy(Le)},this.setScissor=function(E,V,K,Q){E.isVector4?Le.set(E.x,E.y,E.z,E.w):Le.set(E,V,K,Q),I.scissor(F.copy(Le).multiplyScalar(ee).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(E){I.setScissorTest(le=E)},this.setOpaqueSort=function(E){ye=E},this.setTransparentSort=function(E){we=E},this.getClearColor=function(E){return E.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor(...arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,K=!0){let Q=0;if(E){let X=!1;if(U!==null){let ae=U.texture.format;X=ae===Dc||ae===Nc||ae===nl}if(X){let ae=U.texture.type,xe=ae===Fn||ae===$i||ae===Yr||ae===Kr||ae===Qo||ae===el,be=pe.getClearColor(),Ee=pe.getClearAlpha(),Oe=be.r,Be=be.g,Fe=be.b;xe?(m[0]=Oe,m[1]=Be,m[2]=Fe,m[3]=Ee,P.clearBufferuiv(P.COLOR,0,m)):(v[0]=Oe,v[1]=Be,v[2]=Fe,v[3]=Ee,P.clearBufferiv(P.COLOR,0,v))}else Q|=P.COLOR_BUFFER_BIT}V&&(Q|=P.DEPTH_BUFFER_BIT),K&&(Q|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ct,!1),t.removeEventListener("webglcontextrestored",cn,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),pe.dispose(),W.dispose(),ne.dispose(),k.dispose(),re.dispose(),ge.dispose(),Te.dispose(),Ue.dispose(),Je.dispose(),Re.dispose(),et.dispose(),et.removeEventListener("sessionstart",lr),et.removeEventListener("sessionend",fu),Ii.stop()},this.renderBufferDirect=function(E,V,K,Q,X,ae){V===null&&(V=B);let xe=X.isMesh&&X.matrixWorld.determinant()<0,be=(function(qe,ut,It,Xe,ke){ut.isScene!==!0&&(ut=B),H.resetTextureUnits();let hn=ut.fog,_l=Xe.isMeshStandardMaterial?ut.environment:null,Ma=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Pt,ci=(Xe.isMeshStandardMaterial?ge:re).get(Xe.envMap||_l),Mn=Xe.vertexColors===!0&&!!It.attributes.color&&It.attributes.color.itemSize===4,cr=!!It.attributes.tangent&&(!!Xe.normalMap||Xe.anisotropy>0),Xn=!!It.morphAttributes.position,vl=!!It.morphAttributes.normal,hr=!!It.morphAttributes.color,yu=oi;Xe.toneMapped&&(U!==null&&U.isXRRenderTarget!==!0||(yu=y.toneMapping));let Mu=It.morphAttributes.position||It.morphAttributes.normal||It.morphAttributes.color,Ff=Mu!==void 0?Mu.length:0,Ye=k.get(Xe),Bf=g.state.lights;if(ce===!0&&(Ie===!0||qe!==O)){let Jt=qe===O&&Xe.id===C;$.setState(Xe,qe,Jt)}let un=!1;Xe.version===Ye.__version?Ye.needsLights&&Ye.lightsStateVersion!==Bf.state.version||Ye.outputColorSpace!==Ma||ke.isBatchedMesh&&Ye.batching===!1?un=!0:ke.isBatchedMesh||Ye.batching!==!0?ke.isBatchedMesh&&Ye.batchingColor===!0&&ke.colorTexture===null||ke.isBatchedMesh&&Ye.batchingColor===!1&&ke.colorTexture!==null||ke.isInstancedMesh&&Ye.instancing===!1?un=!0:ke.isInstancedMesh||Ye.instancing!==!0?ke.isSkinnedMesh&&Ye.skinning===!1?un=!0:ke.isSkinnedMesh||Ye.skinning!==!0?ke.isInstancedMesh&&Ye.instancingColor===!0&&ke.instanceColor===null||ke.isInstancedMesh&&Ye.instancingColor===!1&&ke.instanceColor!==null||ke.isInstancedMesh&&Ye.instancingMorph===!0&&ke.morphTexture===null||ke.isInstancedMesh&&Ye.instancingMorph===!1&&ke.morphTexture!==null||Ye.envMap!==ci||Xe.fog===!0&&Ye.fog!==hn?un=!0:Ye.numClippingPlanes===void 0||Ye.numClippingPlanes===$.numPlanes&&Ye.numIntersection===$.numIntersection?(Ye.vertexAlphas!==Mn||Ye.vertexTangents!==cr||Ye.morphTargets!==Xn||Ye.morphNormals!==vl||Ye.morphColors!==hr||Ye.toneMapping!==yu||Ye.morphTargetsCount!==Ff)&&(un=!0):un=!0:un=!0:un=!0:un=!0:(un=!0,Ye.__version=Xe.version);let Pi=Ye.currentProgram;un===!0&&(Pi=ya(Xe,ut,ke));let Su=!1,hs=!1,xl=!1,vt=Pi.getUniforms(),hi=Ye.uniforms;if(I.useProgram(Pi.program)&&(Su=!0,hs=!0,xl=!0),Xe.id!==C&&(C=Xe.id,hs=!0),Su||O!==qe){I.buffers.depth.getReversed()&&qe.reversedDepth!==!0&&(qe._reversedDepth=!0,qe.updateProjectionMatrix()),vt.setValue(P,"projectionMatrix",qe.projectionMatrix),vt.setValue(P,"viewMatrix",qe.matrixWorldInverse);let Jt=vt.map.cameraPosition;Jt!==void 0&&Jt.setValue(P,b.setFromMatrixPosition(qe.matrixWorld)),D.logarithmicDepthBuffer&&vt.setValue(P,"logDepthBufFC",2/(Math.log(qe.far+1)/Math.LN2)),(Xe.isMeshPhongMaterial||Xe.isMeshToonMaterial||Xe.isMeshLambertMaterial||Xe.isMeshBasicMaterial||Xe.isMeshStandardMaterial||Xe.isShaderMaterial)&&vt.setValue(P,"isOrthographic",qe.isOrthographicCamera===!0),O!==qe&&(O=qe,hs=!0,xl=!0)}if(ke.isSkinnedMesh){vt.setOptional(P,ke,"bindMatrix"),vt.setOptional(P,ke,"bindMatrixInverse");let Jt=ke.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),vt.setValue(P,"boneTexture",Jt.boneTexture,H))}ke.isBatchedMesh&&(vt.setOptional(P,ke,"batchingTexture"),vt.setValue(P,"batchingTexture",ke._matricesTexture,H),vt.setOptional(P,ke,"batchingIdTexture"),vt.setValue(P,"batchingIdTexture",ke._indirectTexture,H),vt.setOptional(P,ke,"batchingColorTexture"),ke._colorsTexture!==null&&vt.setValue(P,"batchingColorTexture",ke._colorsTexture,H));let yl=It.morphAttributes;yl.position===void 0&&yl.normal===void 0&&yl.color===void 0||Ce.update(ke,It,Pi),(hs||Ye.receiveShadow!==ke.receiveShadow)&&(Ye.receiveShadow=ke.receiveShadow,vt.setValue(P,"receiveShadow",ke.receiveShadow)),Xe.isMeshGouraudMaterial&&Xe.envMap!==null&&(hi.envMap.value=ci,hi.flipEnvMap.value=ci.isCubeTexture&&ci.isRenderTargetTexture===!1?-1:1),Xe.isMeshStandardMaterial&&Xe.envMap===null&&ut.environment!==null&&(hi.envMapIntensity.value=ut.environmentIntensity),hs&&(vt.setValue(P,"toneMappingExposure",y.toneMappingExposure),Ye.needsLights&&(dn=xl,(Sn=hi).ambientLightColor.needsUpdate=dn,Sn.lightProbe.needsUpdate=dn,Sn.directionalLights.needsUpdate=dn,Sn.directionalLightShadows.needsUpdate=dn,Sn.pointLights.needsUpdate=dn,Sn.pointLightShadows.needsUpdate=dn,Sn.spotLights.needsUpdate=dn,Sn.spotLightShadows.needsUpdate=dn,Sn.rectAreaLights.needsUpdate=dn,Sn.hemisphereLights.needsUpdate=dn),hn&&Xe.fog===!0&&Ve.refreshFogUniforms(hi,hn),Ve.refreshMaterialUniforms(hi,Xe,ee,oe,g.state.transmissionRenderTarget[qe.id]),Qr.upload(P,vu(Ye),hi,H));var Sn,dn;if(Xe.isShaderMaterial&&Xe.uniformsNeedUpdate===!0&&(Qr.upload(P,vu(Ye),hi,H),Xe.uniformsNeedUpdate=!1),Xe.isSpriteMaterial&&vt.setValue(P,"center",ke.center),vt.setValue(P,"modelViewMatrix",ke.modelViewMatrix),vt.setValue(P,"normalMatrix",ke.normalMatrix),vt.setValue(P,"modelMatrix",ke.matrixWorld),Xe.isShaderMaterial||Xe.isRawShaderMaterial){let Jt=Xe.uniformsGroups;for(let Ml=0,kf=Jt.length;Ml<kf;Ml++){let bu=Jt[Ml];Je.update(bu,Pi),Je.bind(bu,Pi)}}return Pi})(E,V,K,Q,X);I.setMaterial(Q,xe);let Ee=K.index,Oe=1;if(Q.wireframe===!0){if(Ee=Me.getWireframeAttribute(K),Ee===void 0)return;Oe=2}let Be=K.drawRange,Fe=K.attributes.position,We=Be.start*Oe,ot=(Be.start+Be.count)*Oe;ae!==null&&(We=Math.max(We,ae.start*Oe),ot=Math.min(ot,(ae.start+ae.count)*Oe)),Ee!==null?(We=Math.max(We,0),ot=Math.min(ot,Ee.count)):Fe!=null&&(We=Math.max(We,0),ot=Math.min(ot,Fe.count));let gt=ot-We;if(gt<0||gt===1/0)return;let _t;Ue.setup(X,Q,be,K,Ee);let lt=te;if(Ee!==null&&(_t=se.get(Ee),lt=fe,lt.setIndex(_t)),X.isMesh)Q.wireframe===!0?(I.setLineWidth(Q.wireframeLinewidth*M()),lt.setMode(P.LINES)):lt.setMode(P.TRIANGLES);else if(X.isLine){let qe=Q.linewidth;qe===void 0&&(qe=1),I.setLineWidth(qe*M()),X.isLineSegments?lt.setMode(P.LINES):X.isLineLoop?lt.setMode(P.LINE_LOOP):lt.setMode(P.LINE_STRIP)}else X.isPoints?lt.setMode(P.POINTS):X.isSprite&&lt.setMode(P.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Ir("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(A.get("WEBGL_multi_draw"))lt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let qe=X._multiDrawStarts,ut=X._multiDrawCounts,It=X._multiDrawCount,Xe=Ee?se.get(Ee).bytesPerElement:1,ke=k.get(Q).currentProgram.getUniforms();for(let hn=0;hn<It;hn++)ke.setValue(P,"_gl_DrawID",hn),lt.render(qe[hn]/Xe,ut[hn])}else if(X.isInstancedMesh)lt.renderInstances(We,gt,X.count);else if(K.isInstancedBufferGeometry){let qe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ut=Math.min(K.instanceCount,qe);lt.renderInstances(We,gt,ut)}else lt.render(We,gt)},this.compile=function(E,V,K=null){K===null&&(K=E),g=ne.get(K),g.init(V),x.push(g),K.traverseVisible(function(X){X.isLight&&X.layers.test(V.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),E!==K&&E.traverseVisible(function(X){X.isLight&&X.layers.test(V.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),g.setupLights();let Q=new Set;return E.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let ae=X.material;if(ae)if(Array.isArray(ae))for(let xe=0;xe<ae.length;xe++){let be=ae[xe];or(be,K,X),Q.add(be)}else or(ae,K,X),Q.add(ae)}),g=x.pop(),Q},this.compileAsync=function(E,V,K=null){let Q=this.compile(E,V,K);return new Promise(X=>{function ae(){Q.forEach(function(xe){k.get(xe).currentProgram.isReady()&&Q.delete(xe)}),Q.size!==0?setTimeout(ae,10):X(E)}A.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let li=null;function lr(){Ii.stop()}function fu(){Ii.start()}let Ii=new nf;function gl(E,V,K,Q){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLight)g.pushLight(E),E.castShadow&&g.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||he.intersectsSprite(E)){Q&&S.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ne);let ae=Te.update(E),xe=E.material;xe.visible&&f.push(E,ae,xe,K,S.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||he.intersectsObject(E))){let ae=Te.update(E),xe=E.material;if(Q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),S.copy(E.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),S.copy(ae.boundingSphere.center)),S.applyMatrix4(E.matrixWorld).applyMatrix4(Ne)),Array.isArray(xe)){let be=ae.groups;for(let Ee=0,Oe=be.length;Ee<Oe;Ee++){let Be=be[Ee],Fe=xe[Be.materialIndex];Fe&&Fe.visible&&f.push(E,ae,Fe,K,S.z,Be)}}else xe.visible&&f.push(E,ae,xe,K,S.z,null)}}let X=E.children;for(let ae=0,xe=X.length;ae<xe;ae++)gl(X[ae],V,K,Q)}function mu(E,V,K,Q){let X=E.opaque,ae=E.transmissive,xe=E.transparent;g.setupLightsView(K),ce===!0&&$.setGlobalState(y.clippingPlanes,K),Q&&I.viewport(z.copy(Q)),X.length>0&&xa(X,V,K),ae.length>0&&xa(ae,V,K),xe.length>0&&xa(xe,V,K),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function gu(E,V,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[Q.id]===void 0&&(g.state.transmissionRenderTarget[Q.id]=new An(1,1,{generateMipmaps:!0,type:A.has("EXT_color_buffer_half_float")||A.has("EXT_color_buffer_float")?Zr:Fn,minFilter:On,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let X=g.state.transmissionRenderTarget[Q.id],ae=Q.viewport||z;X.setSize(ae.z*y.transmissionResolutionScale,ae.w*y.transmissionResolutionScale);let xe=y.getRenderTarget(),be=y.getActiveCubeFace(),Ee=y.getActiveMipmapLevel();y.setRenderTarget(X),y.getClearColor(G),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),L&&pe.render(K);let Oe=y.toneMapping;y.toneMapping=oi;let Be=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),g.setupLightsView(Q),ce===!0&&$.setGlobalState(y.clippingPlanes,Q),xa(E,K,Q),H.updateMultisampleRenderTarget(X),H.updateRenderTargetMipmap(X),A.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let We=0,ot=V.length;We<ot;We++){let gt=V[We],_t=gt.object,lt=gt.geometry,qe=gt.material,ut=gt.group;if(qe.side===sn&&_t.layers.test(Q.layers)){let It=qe.side;qe.side=Kt,qe.needsUpdate=!0,_u(_t,K,Q,lt,qe,ut),qe.side=It,qe.needsUpdate=!0,Fe=!0}}Fe===!0&&(H.updateMultisampleRenderTarget(X),H.updateRenderTargetMipmap(X))}y.setRenderTarget(xe,be,Ee),y.setClearColor(G,j),Be!==void 0&&(Q.viewport=Be),y.toneMapping=Oe}function xa(E,V,K){let Q=V.isScene===!0?V.overrideMaterial:null;for(let X=0,ae=E.length;X<ae;X++){let xe=E[X],be=xe.object,Ee=xe.geometry,Oe=xe.group,Be=xe.material;Be.allowOverride===!0&&Q!==null&&(Be=Q),be.layers.test(K.layers)&&_u(be,V,K,Ee,Be,Oe)}}function _u(E,V,K,Q,X,ae){E.onBeforeRender(y,V,K,Q,X,ae),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),X.onBeforeRender(y,V,K,Q,E,ae),X.transparent===!0&&X.side===sn&&X.forceSinglePass===!1?(X.side=Kt,X.needsUpdate=!0,y.renderBufferDirect(K,V,Q,X,E,ae),X.side=wi,X.needsUpdate=!0,y.renderBufferDirect(K,V,Q,X,E,ae),X.side=sn):y.renderBufferDirect(K,V,Q,X,E,ae),E.onAfterRender(y,V,K,Q,X,ae)}function ya(E,V,K){V.isScene!==!0&&(V=B);let Q=k.get(E),X=g.state.lights,ae=g.state.shadowsArray,xe=X.state.version,be=Re.getParameters(E,X.state,ae,V,K),Ee=Re.getProgramCacheKey(be),Oe=Q.programs;Q.environment=E.isMeshStandardMaterial?V.environment:null,Q.fog=V.fog,Q.envMap=(E.isMeshStandardMaterial?ge:re).get(E.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",Wn),Oe=new Map,Q.programs=Oe);let Be=Oe.get(Ee);if(Be!==void 0){if(Q.currentProgram===Be&&Q.lightsStateVersion===xe)return xu(E,be),Be}else be.uniforms=Re.getUniforms(E),E.onBeforeCompile(be,y),Be=Re.acquireProgram(be,Ee),Oe.set(Ee,Be),Q.uniforms=be.uniforms;let Fe=Q.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(Fe.clippingPlanes=$.uniform),xu(E,be),Q.needsLights=(function(We){return We.isMeshLambertMaterial||We.isMeshToonMaterial||We.isMeshPhongMaterial||We.isMeshStandardMaterial||We.isShadowMaterial||We.isShaderMaterial&&We.lights===!0})(E),Q.lightsStateVersion=xe,Q.needsLights&&(Fe.ambientLightColor.value=X.state.ambient,Fe.lightProbe.value=X.state.probe,Fe.directionalLights.value=X.state.directional,Fe.directionalLightShadows.value=X.state.directionalShadow,Fe.spotLights.value=X.state.spot,Fe.spotLightShadows.value=X.state.spotShadow,Fe.rectAreaLights.value=X.state.rectArea,Fe.ltc_1.value=X.state.rectAreaLTC1,Fe.ltc_2.value=X.state.rectAreaLTC2,Fe.pointLights.value=X.state.point,Fe.pointLightShadows.value=X.state.pointShadow,Fe.hemisphereLights.value=X.state.hemi,Fe.directionalShadowMap.value=X.state.directionalShadowMap,Fe.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Fe.spotShadowMap.value=X.state.spotShadowMap,Fe.spotLightMatrix.value=X.state.spotLightMatrix,Fe.spotLightMap.value=X.state.spotLightMap,Fe.pointShadowMap.value=X.state.pointShadowMap,Fe.pointShadowMatrix.value=X.state.pointShadowMatrix),Q.currentProgram=Be,Q.uniformsList=null,Be}function vu(E){if(E.uniformsList===null){let V=E.currentProgram.getUniforms();E.uniformsList=Qr.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function xu(E,V){let K=k.get(E);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}Ii.setAnimationLoop(function(E){li&&li(E)}),typeof self<"u"&&Ii.setContext(self),this.setAnimationLoop=function(E){li=E,et.setAnimationLoop(E),E===null?Ii.stop():Ii.start()},et.addEventListener("sessionstart",lr),et.addEventListener("sessionend",fu),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(V),V=et.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,V,U),g=ne.get(E,x.length),g.init(V),x.push(g),Ne.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),he.setFromProjectionMatrix(Ne,ni,V.reversedDepth),Ie=this.localClippingEnabled,ce=$.init(this.clippingPlanes,Ie),f=W.get(E,_.length),f.init(),_.push(f),et.enabled===!0&&et.isPresenting===!0){let ae=y.xr.getDepthSensingMesh();ae!==null&&gl(ae,V,-1/0,y.sortObjects)}gl(E,V,0,y.sortObjects),f.finish(),y.sortObjects===!0&&f.sort(ye,we),L=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,L&&pe.addToRenderList(f,E),this.info.render.frame++,ce===!0&&$.beginShadows();let K=g.state.shadowsArray;J.render(K,E,V),ce===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=f.opaque,X=f.transmissive;if(g.setupLights(),V.isArrayCamera){let ae=V.cameras;if(X.length>0)for(let xe=0,be=ae.length;xe<be;xe++)gu(Q,X,E,ae[xe]);L&&pe.render(E);for(let xe=0,be=ae.length;xe<be;xe++){let Ee=ae[xe];mu(f,E,Ee,Ee.viewport)}}else X.length>0&&gu(Q,X,E,V),L&&pe.render(E),mu(f,E,V);U!==null&&N===0&&(H.updateMultisampleRenderTarget(U),H.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(y,E,V),Ue.resetDefaultState(),C=-1,O=null,x.pop(),x.length>0?(g=x[x.length-1],ce===!0&&$.setGlobalState(y.clippingPlanes,g.state.camera)):g=null,_.pop(),f=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,V,K){let Q=k.get(E);Q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),k.get(E.texture).__webglTexture=V,k.get(E.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:K,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){let K=k.get(E);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0};let Df=P.createFramebuffer();this.setRenderTarget=function(E,V=0,K=0){U=E,R=V,N=K;let Q=!0,X=null,ae=!1,xe=!1;if(E){let be=k.get(E);if(be.__useDefaultFramebuffer!==void 0)I.bindFramebuffer(P.FRAMEBUFFER,null),Q=!1;else if(be.__webglFramebuffer===void 0)H.setupRenderTarget(E);else if(be.__hasExternalTextures)H.rebindTextures(E,k.get(E.texture).__webglTexture,k.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Be=E.depthTexture;if(be.__boundDepthTexture!==Be){if(Be!==null&&k.has(Be)&&(E.width!==Be.image.width||E.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(E)}}let Ee=E.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(xe=!0);let Oe=k.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(X=Array.isArray(Oe[V])?Oe[V][K]:Oe[V],ae=!0):X=E.samples>0&&H.useMultisampledRTT(E)===!1?k.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?Oe[K]:Oe,z.copy(E.viewport),F.copy(E.scissor),Z=E.scissorTest}else z.copy(Se).multiplyScalar(ee).floor(),F.copy(Le).multiplyScalar(ee).floor(),Z=le;if(K!==0&&(X=Df),I.bindFramebuffer(P.FRAMEBUFFER,X)&&Q&&I.drawBuffers(E,X),I.viewport(z),I.scissor(F),I.setScissorTest(Z),ae){let be=k.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+V,be.__webglTexture,K)}else if(xe){let be=V;for(let Ee=0;Ee<E.textures.length;Ee++){let Oe=k.get(E.textures[Ee]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ee,Oe.__webglTexture,K,be)}}else if(E!==null&&K!==0){let be=k.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,be.__webglTexture,K)}C=-1},this.readRenderTargetPixels=function(E,V,K,Q,X,ae,xe,be=0){if(!E||!E.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=k.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee){I.bindFramebuffer(P.FRAMEBUFFER,Ee);try{let Oe=E.textures[be],Be=Oe.format,Fe=Oe.type;if(!D.textureFormatReadable(Be))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(Fe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");V>=0&&V<=E.width-Q&&K>=0&&K<=E.height-X&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+be),P.readPixels(V,K,Q,X,_e.convert(Be),_e.convert(Fe),ae))}finally{let Oe=U!==null?k.get(U).__webglFramebuffer:null;I.bindFramebuffer(P.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,V,K,Q,X,ae,xe,be=0){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=k.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee){if(V>=0&&V<=E.width-Q&&K>=0&&K<=E.height-X){I.bindFramebuffer(P.FRAMEBUFFER,Ee);let Oe=E.textures[be],Be=Oe.format,Fe=Oe.type;if(!D.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.bufferData(P.PIXEL_PACK_BUFFER,ae.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+be),P.readPixels(V,K,Q,X,_e.convert(Be),_e.convert(Fe),0);let ot=U!==null?k.get(U).__webglFramebuffer:null;I.bindFramebuffer(P.FRAMEBUFFER,ot);let gt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await wp(P,gt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ae),P.deleteBuffer(We),P.deleteSync(gt),ae}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,V=null,K=0){let Q=Math.pow(2,-K),X=Math.floor(E.image.width*Q),ae=Math.floor(E.image.height*Q),xe=V!==null?V.x:0,be=V!==null?V.y:0;H.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,K,0,0,xe,be,X,ae),I.unbindTexture()};let Uf=P.createFramebuffer(),Of=P.createFramebuffer();this.copyTextureToTexture=function(E,V,K=null,Q=null,X=0,ae=null){let xe,be,Ee,Oe,Be,Fe,We,ot,gt;ae===null&&(X!==0?(Ir("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=X,X=0):ae=0);let _t=E.isCompressedTexture?E.mipmaps[ae]:E.image;if(K!==null)xe=K.max.x-K.min.x,be=K.max.y-K.min.y,Ee=K.isBox3?K.max.z-K.min.z:1,Oe=K.min.x,Be=K.min.y,Fe=K.isBox3?K.min.z:0;else{let Mn=Math.pow(2,-X);xe=Math.floor(_t.width*Mn),be=Math.floor(_t.height*Mn),Ee=E.isDataArrayTexture?_t.depth:E.isData3DTexture?Math.floor(_t.depth*Mn):1,Oe=0,Be=0,Fe=0}Q!==null?(We=Q.x,ot=Q.y,gt=Q.z):(We=0,ot=0,gt=0);let lt=_e.convert(V.format),qe=_e.convert(V.type),ut;V.isData3DTexture?(H.setTexture3D(V,0),ut=P.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(H.setTexture2DArray(V,0),ut=P.TEXTURE_2D_ARRAY):(H.setTexture2D(V,0),ut=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);let It=P.getParameter(P.UNPACK_ROW_LENGTH),Xe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ke=P.getParameter(P.UNPACK_SKIP_PIXELS),hn=P.getParameter(P.UNPACK_SKIP_ROWS),_l=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,_t.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,_t.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Oe),P.pixelStorei(P.UNPACK_SKIP_ROWS,Be),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Fe);let Ma=E.isDataArrayTexture||E.isData3DTexture,ci=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){let Mn=k.get(E),cr=k.get(V),Xn=k.get(Mn.__renderTarget),vl=k.get(cr.__renderTarget);I.bindFramebuffer(P.READ_FRAMEBUFFER,Xn.__webglFramebuffer),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,vl.__webglFramebuffer);for(let hr=0;hr<Ee;hr++)Ma&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,k.get(E).__webglTexture,X,Fe+hr),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,k.get(V).__webglTexture,ae,gt+hr)),P.blitFramebuffer(Oe,Be,xe,be,We,ot,xe,be,P.DEPTH_BUFFER_BIT,P.NEAREST);I.bindFramebuffer(P.READ_FRAMEBUFFER,null),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(X!==0||E.isRenderTargetTexture||k.has(E)){let Mn=k.get(E),cr=k.get(V);I.bindFramebuffer(P.READ_FRAMEBUFFER,Uf),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,Of);for(let Xn=0;Xn<Ee;Xn++)Ma?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Mn.__webglTexture,X,Fe+Xn):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Mn.__webglTexture,X),ci?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,cr.__webglTexture,ae,gt+Xn):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,cr.__webglTexture,ae),X!==0?P.blitFramebuffer(Oe,Be,xe,be,We,ot,xe,be,P.COLOR_BUFFER_BIT,P.NEAREST):ci?P.copyTexSubImage3D(ut,ae,We,ot,gt+Xn,Oe,Be,xe,be):P.copyTexSubImage2D(ut,ae,We,ot,Oe,Be,xe,be);I.bindFramebuffer(P.READ_FRAMEBUFFER,null),I.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ci?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(ut,ae,We,ot,gt,xe,be,Ee,lt,qe,_t.data):V.isCompressedArrayTexture?P.compressedTexSubImage3D(ut,ae,We,ot,gt,xe,be,Ee,lt,_t.data):P.texSubImage3D(ut,ae,We,ot,gt,xe,be,Ee,lt,qe,_t):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ae,We,ot,xe,be,lt,qe,_t.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ae,We,ot,_t.width,_t.height,lt,_t.data):P.texSubImage2D(P.TEXTURE_2D,ae,We,ot,xe,be,lt,qe,_t);P.pixelStorei(P.UNPACK_ROW_LENGTH,It),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Xe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ke),P.pixelStorei(P.UNPACK_SKIP_ROWS,hn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,_l),ae===0&&V.generateMipmaps&&P.generateMipmap(ut),I.unbindTexture()},this.initRenderTarget=function(E){k.get(E).__webglFramebuffer===void 0&&H.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?H.setTextureCube(E,0):E.isData3DTexture?H.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?H.setTexture2DArray(E,0):H.setTexture2D(E,0),I.unbindTexture()},this.resetState=function(){R=0,N=0,U=null,I.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};function Nh(i,e){if(e===ch)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Jr||e===ua){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===Jr)for(let a=1;a<=n;a++)r.push(t.getX(0)),r.push(t.getX(a)),r.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(r.push(t.getX(a)),r.push(t.getX(a+1)),r.push(t.getX(a+2))):(r.push(t.getX(a+2)),r.push(t.getX(a+1)),r.push(t.getX(a)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var pl=class extends Dn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new kh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Fh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new eu(t)})}load(e,t,n,r){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=ai.extractUrlBase(e);a=ai.resolveURL(c,this.path)}else a=ai.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Wr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===pf){try{a[je.KHR_BINARY_GLTF]=new tu(e)}catch(u){r&&r(u);return}s=JSON.parse(a[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new lu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],p=s.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:a[u]=new Bh;break;case je.KHR_DRACO_MESH_COMPRESSION:a[u]=new nu(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:a[u]=new iu;break;case je.KHR_MESH_QUANTIZATION:a[u]=new ru;break;default:p.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}};function d0(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Fh=class{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new Ae(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Pt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Zi(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new qi(h),c.distance=u;break;case"spot":c=new ia(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),kn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Bh=class{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return zt}extendParams(e,t,n){let r=[];e.color=new Ae(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Pt),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,st))}return Promise.all(r)}},kh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},zh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ie(o,o)}return Promise.all(s)}},Gh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Hh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},Vh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=r.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Pt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,st)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},Xh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(o[0],o[1],o[2],Pt),Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},qh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(o[0],o[1],o[2],Pt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,st)),Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},Zh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ft}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Kh=class{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},Jh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},$h=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},Qh=class{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=r.byteOffset||0,c=r.byteLength||0,h=r.count,u=r.byteStride,p=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,p,r.mode,r.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,p,r.mode,r.filter),d})})}else return null}},eu=class{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let c of r.primitives)if(c.mode!==ln.TRIANGLES&&c.mode!==ln.TRIANGLE_STRIP&&c.mode!==ln.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],p=c[0].count,d=[];for(let m of u){let v=new Pe,f=new w,g=new Wt,_=new w(1,1,1),x=new Fs(m.geometry,m.material,p);for(let y=0;y<p;y++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,v.compose(f,g,_));for(let y in l)if(y==="_COLOR_0"){let T=l[y];x.instanceColor=new Mi(T.array,T.itemSize,T.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);ct.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),d.push(x)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},pf="glTF",fa=12,cf={JSON:1313821514,BIN:5130562},tu=class{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,fa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==pf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-fa,s=new DataView(e,fa),a=0;for(;a<r;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===cf.JSON){let c=new Uint8Array(e,fa+a,o);this.content=n.decode(c)}else if(l===cf.BIN){let c=fa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},nu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=au[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=au[h]||h.toLowerCase();if(a[h]!==void 0){let p=n.accessors[e.attributes[h]],d=ts[p.componentType];c[u]=d.name,l[u]=p.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,p){r.decodeDracoFile(h,function(d){for(let m in d.attributes){let v=d.attributes[m],f=l[m];f!==void 0&&(v.normalized=f)}u(d)},o,c,Pt,p)})})}},iu=class{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ru=class{constructor(){this.name=je.KHR_MESH_QUANTIZATION}},fl=class extends si{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=r-t,u=(n-t)/h,p=u*u,d=p*u,m=e*c,v=m-c,f=-2*d+3*p,g=d-p,_=1-f,x=g-p+u;for(let y=0;y!==o;y++){let T=a[v+y+o],R=a[v+y+l]*h,N=a[m+y+o],U=a[m+y]*h;s[y]=_*T+x*R+f*N+g*U}return s}},p0=new Wt,su=class extends fl{interpolate_(e,t,n,r){let s=super.interpolate_(e,t,n,r);return p0.fromArray(s).normalize().toArray(s),s}},ln={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},hf={9728:Yt,9729:Vt,9984:Jo,9985:qr,9986:Ji,9987:On},uf={33071:xi,33648:Rr,10497:tn},Dh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},au={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ri={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},f0={CUBICSPLINE:void 0,LINEAR:Gi,STEP:zi},Uh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function m0(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new pt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:wi})),i.DefaultMaterial}function rr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function kn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function g0(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(r=!0),u.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let p=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(p)}if(r){let p=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(p)}if(s){let p=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(p)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],p=c[2];return n&&(i.morphAttributes.position=h),r&&(i.morphAttributes.normal=u),s&&(i.morphAttributes.color=p),i.morphTargetsRelative=!0,i})}function _0(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function v0(i){let e,t=i.extensions&&i.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Oh(t.attributes):e=i.indices+":"+Oh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Oh(i.targets[n]);return e}function Oh(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ou(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function x0(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var y0=new Pe,lu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new d0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);r=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&a<98?this.textureLoader=new Xi(this.options.manager):this.textureLoader=new ra(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Wr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:n,userData:{}};return rr(s,o,r),kn(o,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let a=t[r].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,a){n.load(ai.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let a=Dh[r.type],o=ts[r.componentType],l=r.normalized===!0,c=new o(r.count*a);return Promise.resolve(new Mt(c,a,l))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Dh[r.type],c=ts[r.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,p=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,m=r.normalized===!0,v,f;if(d&&d!==u){let g=Math.floor(p/d),_="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+g+":"+r.count,x=t.cache.get(_);x||(v=new c(o,g*d,r.count*d/h),x=new Ur(v,d/h),t.cache.add(_,x)),f=new Or(x,l,p%d/h,m)}else o===null?v=new c(r.count*l):v=new c(o,p,r.count*l),f=new Mt(v,l,m);if(r.sparse!==void 0){let g=Dh.SCALAR,_=ts[r.sparse.indices.componentType],x=r.sparse.indices.byteOffset||0,y=r.sparse.values.byteOffset||0,T=new _(a[1],x,r.sparse.count*g),R=new c(a[2],y,r.sparse.count*l);o!==null&&(f=new Mt(f.array.slice(),f.itemSize,f.normalized)),f.normalized=!1;for(let N=0,U=T.length;N<U;N++){let C=T[N];if(f.setX(C,R[N*l]),l>=2&&f.setY(C,R[N*l+1]),l>=3&&f.setZ(C,R[N*l+2]),l>=4&&f.setW(C,R[N*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}f.normalized=m}return f})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let r=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let p=(s.samplers||{})[a.sampler]||{};return h.magFilter=hf[p.magFilter]||Vt,h.minFilter=hf[p.minFilter]||On,h.wrapS=uf[p.wrapS]||tn,h.wrapT=uf[p.wrapT]||tn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Yt&&h.minFilter!==Vt,r.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=r.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let p=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(p),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(p,d){let m=p;t.isImageBitmapLoader===!0&&(m=function(v){let f=new wt(v);f.needsUpdate=!0,p(f)}),t.load(ai.resolveURL(u,s.path),m,void 0,d)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),kn(u,a),u.userData.mimeType=a.mimeType||x0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,r){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Br,Xt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new ri,Xt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(r||s||a){let o="ClonedMaterial:"+n.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return pt}loadMaterial(e){let t=this,n=this.json,r=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){let u=r[je.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new Ae(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let p=u.baseColorFactor;o.color.setRGB(p[0],p[1],p[2],Pt),o.opacity=p[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,st)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(p){return p.getMaterialType&&p.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(p){return p.extendMaterialParams&&p.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=sn);let h=s.alphaMode||Uh.OPAQUE;if(h===Uh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Uh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==zt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ie(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==zt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==zt){let u=s.emissiveFactor;o.emissive=new Ae().setRGB(u[0],u[1],u[2],Pt)}return s.emissiveTexture!==void 0&&a!==zt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,st)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),kn(u,s),t.associations.set(u,{materials:e}),s.extensions&&rr(r,u,s),u})}createUniqueName(e){let t=at.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function s(o){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return df(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=v0(c),u=r[h];if(u)a.push(u.promise);else{let p;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?p=s(c):p=df(new tt,c,t),r[h]={primitive:c,promise:p},a.push(p)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?m0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let v=h[d],f=a[d],g,_=c[d];if(f.mode===ln.TRIANGLES||f.mode===ln.TRIANGLE_STRIP||f.mode===ln.TRIANGLE_FAN||f.mode===void 0)g=s.isSkinnedMesh===!0?new Ds(v,_):new ht(v,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),f.mode===ln.TRIANGLE_STRIP?g.geometry=Nh(g.geometry,ua):f.mode===ln.TRIANGLE_FAN&&(g.geometry=Nh(g.geometry,Jr));else if(f.mode===ln.LINES)g=new Bs(v,_);else if(f.mode===ln.LINE_STRIP)g=new Cn(v,_);else if(f.mode===ln.LINE_LOOP)g=new ks(v,_);else if(f.mode===ln.POINTS)g=new zs(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(g.geometry.morphAttributes).length>0&&_0(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),kn(g,s),f.extensions&&rr(r,g,f),t.assignFinalMaterial(g),u.push(g)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return s.extensions&&rr(r,u[0],s),u[0];let p=new Bt;s.extensions&&rr(r,p,s),t.associations.set(p,{meshes:e});for(let d=0,m=u.length;d<m;d++)p.add(u[d]);return p})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new yt(dh.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Yi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),kn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let s=r.pop(),a=r,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let p=new Pe;s!==null&&p.fromArray(s.array,c*16),l.push(p)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Os(o,l)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,p=r.channels.length;u<p;u++){let d=r.channels[u],m=r.samplers[d.sampler],v=d.target,f=v.node,g=r.parameters!==void 0?r.parameters[m.input]:m.input,_=r.parameters!==void 0?r.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",f)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",_)),c.push(m),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let p=u[0],d=u[1],m=u[2],v=u[3],f=u[4],g=[];for(let x=0,y=p.length;x<y;x++){let T=p[x],R=d[x],N=m[x],U=v[x],C=f[x];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let O=n._createAnimationTracks(T,R,N,U,C);if(O)for(let z=0;z<O.length;z++)g.push(O[z])}let _=new ea(s,void 0,g);return kn(_,r),_})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=r.weights.length;l<c;l++)o.morphTargetInfluences[l]=r.weights[l]}),a})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=r.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],p=c[2];p!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(p,y0)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Fr:c.length>1?h=new Bt:c.length===1?h=c[0]:h=new ct,h!==c[0])for(let u=0,p=c.length;u<p;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),kn(h,s),s.extensions&&rr(n,h,s),s.matrix!==void 0){let u=new Pe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!r.associations.has(h))r.associations.set(h,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let u=r.associations.get(h);r.associations.set(h,{...u})}return r.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,s=new Bt;n.name&&(s.name=r.createUniqueName(n.name)),kn(s,n),n.extensions&&rr(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(r.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[p,d]of r.associations)(p instanceof Xt||p instanceof wt)&&u.set(p,d);return h.traverse(p=>{let d=r.associations.get(p);d!=null&&u.set(p,d)}),u};return r.associations=c(s),s})}_createAnimationTracks(e,t,n,r,s){let a=[],o=e.name?e.name:e.uuid,l=[];Ri[s.path]===Ri.weights?e.traverse(function(p){p.morphTargetInfluences&&l.push(p.name?p.name:p.uuid)}):l.push(o);let c;switch(Ri[s.path]){case Ri.weights:c=Pn;break;case Ri.rotation:c=Ln;break;case Ri.translation:case Ri.scale:c=Nn;break;default:n.itemSize===1?c=Pn:c=Nn;break}let h=r.interpolation!==void 0?f0[r.interpolation]:Gi,u=this._getArrayFromAccessor(n);for(let p=0,d=l.length;p<d;p++){let m=new c(l[p]+"."+Ri[s.path],t.array,u,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ou(t.constructor),r=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof Ln?su:fl;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function M0(i,e,t){let n=e.attributes,r=new Lt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(r.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),o.normalized){let h=ou(ts[o.componentType]);r.min.multiplyScalar(h),r.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new w,l=new w;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let p=t.json.accessors[u.POSITION],d=p.min,m=p.max;if(d!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),p.normalized){let v=ou(ts[p.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}i.boundingBox=r;let a=new kt;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=a}function df(i,e,t){let n=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=au[a]||a.toLowerCase();o in i.attributes||r.push(s(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});r.push(a)}return Ze.workingColorSpace!==Pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),kn(i,e),M0(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?g0(i,e.targets,t):i})}function ff(i){let e=91,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296);function n(l){let c=document.createElement("canvas");c.width=c.height=512;let h=c.getContext("2d"),u={stone:"#795437",wood:"#35271f",felt:"#144333",leather:"#8d201b",rug:"#782e25",roof:"#263532",plaster:"#303235",cabinet:"#202225",deck:"#846449"};h.fillStyle=u[l],h.fillRect(0,0,512,512);for(let d=0;d<14e3;d++){let m=t()*512,v=t()*512;h.fillStyle=t()>.5?"#ffffff0a":"#00000010",h.fillRect(m,v,l==="wood"||l==="deck"?40:2,1)}if(l==="stone"){for(let d=0;d<28;d++){let m=t()*512,v=t()*512;h.beginPath(),h.moveTo(m,v);for(let f=0;f<18;f++)m+=12+t()*14,v+=Math.sin(f*.7+d)*8+(t()-.5)*20,h.lineTo(m,v);h.strokeStyle=d%4?"#d7ad7830":"#f0ce9750",h.lineWidth=d%4?.65:1.5,h.stroke()}h.strokeStyle="#141518",h.lineWidth=5,h.strokeRect(0,0,512,512),h.strokeStyle="#d4a04e",h.lineWidth=1.8,h.strokeRect(2,2,508,508)}if(l==="wood"||l==="deck")for(let d=0;d<512;d+=64){h.fillStyle="#00000026",h.fillRect(0,d,512,2);for(let m=d%128?128:0;m<512;m+=256)h.fillRect(m,d,1,64),h.fillStyle="#c5916330",h.fillRect(m+3,d+3,250,1),h.fillStyle="#00000026"}if(l==="rug"){h.fillStyle="#7d2225",h.fillRect(0,0,512,512);for(let d=0;d<12e3;d++)h.fillStyle=d%2?"#e4b48718":"#0000000d",h.fillRect(t()*512,t()*512,1,2);for(let[d,m,v]of[[12,3,"#3c2626"],[21,1,"#b07058"],[35,2,"#242322"],[45,1,"#b07058"]])h.strokeStyle=v,h.lineWidth=m,h.strokeRect(d,d,512-d*2,512-d*2);h.strokeStyle="#a8946155",h.lineWidth=1;for(let d=65;d<460;d+=32)for(let m=65;m<460;m+=32)h.beginPath(),h.moveTo(m-5,d),h.quadraticCurveTo(m,d-9,m+5,d),h.quadraticCurveTo(m,d+9,m-5,d),h.stroke();h.save(),h.translate(256,256);for(let d=0;d<16;d++)h.rotate(Math.PI/8),h.strokeStyle="#b6a16c",h.beginPath(),h.moveTo(0,0),h.bezierCurveTo(25,-26,65,-23,88,0),h.bezierCurveTo(65,23,25,26,0,0),h.stroke();for(let d of[28,94,104])h.beginPath(),h.arc(0,0,d,0,Math.PI*2),h.stroke();h.fillStyle="#c2ac78",h.font="44px Georgia",h.textAlign="center",h.fillText("\u2660",0,16),h.restore()}if(l==="plaster")for(let d=-64;d<600;d+=128)for(let m=-64;m<600;m+=128)h.beginPath(),h.moveTo(m,d-64),h.bezierCurveTo(m+9,d-31,m+47,d-28,m+64,d),h.bezierCurveTo(m+47,d+28,m+9,d+31,m,d+64),h.bezierCurveTo(m-9,d+31,m-47,d+28,m-64,d),h.bezierCurveTo(m-47,d-28,m-9,d-31,m,d-64),h.strokeStyle="#a599784e",h.lineWidth=2.2,h.stroke(),h.fillStyle="#b39157",h.beginPath(),h.arc(m,d-64,2,0,Math.PI*2),h.fill(),h.strokeStyle="#10131880",h.lineWidth=1,h.strokeRect(m-6,d-6,12,12);if(l==="cabinet"){h.fillStyle="#ffffff06";for(let d=0;d<512;d+=4)h.fillRect(0,d,512,1);h.strokeStyle="#0b0e10",h.lineWidth=12,h.strokeRect(18,18,476,476),h.strokeStyle="#947547",h.lineWidth=2,h.strokeRect(27,27,458,458),h.strokeStyle="#4b4b45",h.lineWidth=1,h.strokeRect(32,32,448,448)}if(l==="roof"){h.strokeStyle="#83908644";for(let d=0;d<512;d+=32){h.fillStyle="#00000040",h.fillRect(0,d,512,3);for(let m=d%64?32:0;m<512;m+=64)h.strokeRect(m,d,64,32)}}if(l==="leather")for(let d=0;d<512;d+=128)for(let m=0;m<512;m+=128)h.beginPath(),h.moveTo(m,d),h.lineTo(m+64,d+64),h.lineTo(m+128,d),h.strokeStyle="#31171055",h.lineWidth=4,h.stroke(),h.fillStyle="#d38d5866",h.beginPath(),h.arc(m+64,d+64,5,0,Math.PI*2),h.fill();let p=new nn(c);return p.colorSpace=st,p.wrapS=p.wrapT=tn,p.anisotropy=4,i.push(p),p}let r={};for(let l of["stone","wood","felt","leather","rug","roof","plaster","cabinet","deck"]){let c=n(l);r[l]=new(l==="stone"?ft:pt)({map:c,bumpMap:c,bumpScale:{stone:.004,wood:.012,leather:.025,rug:.018,plaster:.012}[l]||.01,roughness:{stone:.18,wood:.4,leather:.38,roof:.8}[l]||.86,metalness:l==="stone"?.3:0})}let s=document.createElement("canvas");s.width=512,s.height=256;let a=s.getContext("2d");a.fillStyle="#29241d",a.fillRect(0,0,512,256);for(let l of[40,168,296,424]){let c=a.createRadialGradient(l,86,2,l,86,43);c.addColorStop(0,"#ffe4a8"),c.addColorStop(.2,"#d59345"),c.addColorStop(1,"#29241d"),a.fillStyle=c,a.fillRect(l-43,43,86,86),a.fillStyle="#ffe5b3",a.fillRect(l-3,60,6,43)}let o=new nn(s);return o.colorSpace=st,o.mapping=Ai,i.push(o),r.stone.envMap=o,r.stone.clearcoat=.85,r.stone.clearcoatRoughness=.12,r.stone.envMapIntensity=.9,r.gold=new pt({color:"#b99958",metalness:.78,roughness:.29}),r.dark=new pt({color:"#182421",metalness:.55,roughness:.35}),r.cream=new pt({color:"#d7c5a1",roughness:.85}),r.rubber=new pt({color:"#171d1c",roughness:.95}),r.red=new pt({color:"#a04730",metalness:.25,roughness:.4}),r.green=new pt({color:"#346044",roughness:.8}),r.light=new pt({color:"#ffe2a8",emissive:"#ffc46a",emissiveIntensity:2.1,roughness:.4}),r.water=new ft({color:"#398b8c",roughness:.16,metalness:.25,clearcoat:1,transparent:!0,opacity:.82}),r.glass=new ft({color:"#a7c4bc",roughness:.13,metalness:.2,transparent:!0,opacity:.2,depthWrite:!1}),r}var S0=["#f5ecd5","#e7b12e","#2862bc","#cc3835","#7443a2","#e88328","#26764a","#82322e","#171b23"];function ns(i,e){return e.discipline==="pyramid"?i===0?e.color==="red"?"#ac2838":"#e6b735":"#fff3d9":S0[i>8?i-8:i]}function mf(i){let e=new ul({canvas:i,antialias:!0,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.toneMapping=Zo,e.toneMappingExposure=1.25,e.shadowMap.enabled=!0,e.shadowMap.type=Go;let t=new Ns;t.background=new Ae("#91c7cf"),t.fog=new Ls("#91c7cf",45,180);let n=new yt(47,1,.1,250),r=[],s=ff(r),a=new Map,o=[],l="room",c="",h=document.createElement("canvas");h.width=128,h.height=64;let u=h.getContext("2d"),p=u.createLinearGradient(0,0,0,64);p.addColorStop(0,"#e3dfce"),p.addColorStop(.48,"#9aa49c"),p.addColorStop(1,"#42352a"),u.fillStyle=p,u.fillRect(0,0,128,64);let d=new nn(h);d.colorSpace=st,d.mapping=Ai,r.push(d),t.environment=d,t.environmentIntensity=.55,t.add(new ta("#ffecd1","#3b2d22",2.5));let m=new Zi("#ffe5b7",3);m.position.set(-8,18,-15),m.castShadow=!0,m.shadow.mapSize.set(1024,1024),Object.assign(m.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.5,far:50}),m.shadow.bias=-15e-5,m.shadow.normalBias=.015,t.add(m);let v=new qi("#ffd397",85,25,2);v.position.set(0,6,0),t.add(v);function f(W,ne,$,J,pe,Ce=0,te=0){let fe=new ht(W,ne);return fe.position.set($,J,pe),fe.rotation.set(Ce,te,0),fe.castShadow=fe.receiveShadow=!0,t.add(fe),fe}function g(W,ne,$,J,pe,Ce,te){return f(new Rn(W,ne,$),J,pe,Ce,te)}let _=s.stone.map.clone();_.repeat.set(6,6),_.needsUpdate=!0,r.push(_);let x=s.stone.clone();x.map=x.bumpMap=_,x.color.set("#59635b"),x.roughness=.65,f(new rn(24,24),x,0,0,0,-Math.PI/2);let y=s.plaster.map.clone();y.repeat.set(5,2),y.needsUpdate=!0,r.push(y);let T=s.plaster.clone();T.map=y,g(.25,7,23,T,-11,3.5,0),g(.25,7,23,T,11,3.5,0),g(22,7,.2,T,0,3.5,11);for(let W of[-10.8,10.8])g(.12,.1,22,s.gold,W,1.8,0),g(.12,1.7,22,s.cabinet,W,.9,0);for(let W of[-10.5,-5.25,0,5.25,10.5])g(.12,6.7,.15,s.dark,W,3.35,-10),g(.025,6,.18,s.gold,W,3.35,-9.98);g(21,.12,.15,s.dark,0,6.6,-10),g(21,.12,.15,s.dark,0,.12,-10),f(new rn(28,8),s.deck,0,-.03,-14,-Math.PI/2),g(15,.15,4.6,s.cream,0,.03,-14),g(14.2,.1,3.8,s.water,0,.13,-14);for(let W of[-7.4,7.4])g(.2,.2,4.6,s.gold,W,.15,-14);f(new rn(220,160),new pt({color:"#237b8b",metalness:.4,roughness:.2}),0,-.4,-97,-Math.PI/2);for(let W of[-9,9]){g(1.5,.25,3,s.cream,W,.3,-14),g(1.5,.8,.2,s.wood,W,.7,-15.3);let ne=f(new In(.5,.4,.8,24),s.dark,W,.4,-9);for(let $=0;$<9;$++){let J=f(new Ti(.35,10,8),s.green,W+Math.sin($*2)*.45,1.3+$%3*.35,-9+Math.cos($*2)*.4);J.scale.set(.5,2.2,.3),J.rotation.z=Math.sin($)*.55}}function R(W){let ne=document.createElement("canvas");ne.width=ne.height=1024;let $=ne.getContext("2d"),J=71,pe=()=>(J=J*1664525+1013904223>>>0,J/4294967296);$.fillStyle=W==="cloth"?"#17634f":"#382016",$.fillRect(0,0,1024,1024);for(let te=0;te<18e3;te++){let fe=pe()*1024,_e=pe()*1024;$.strokeStyle=W==="cloth"?te%2?"#ffffff0a":"#00000012":te%2?"#d6a26d24":"#100a062b",$.lineWidth=W==="cloth"?.6:pe()*2+.3,$.beginPath(),$.moveTo(fe,_e),$.lineTo(fe+(W==="cloth"?2:60+pe()*180),_e+(W==="cloth"?2:Math.sin(fe*.01)*4)),$.stroke()}let Ce=new nn(ne);return Ce.colorSpace=st,Ce.wrapS=Ce.wrapT=tn,Ce.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),r.push(Ce),Ce}let N=R("cloth");s.felt=new pt({map:N,bumpMap:N,bumpScale:.008,roughness:.94,color:"#b0d9c4"});let U=R("wood");s.wood=new ft({map:U,roughness:.28,clearcoat:.65,clearcoatRoughness:.22}),g(10.9,.6,5.9,s.dark,0,1.75,0),g(10.95,.07,5.95,s.gold,0,1.95,0),g(10.7,.28,5.7,s.wood,0,2.1,0),g(10,.08,5,s.felt,0,2.23,0);let C=new Bt;t.add(C);let O="";function z(W){let ne=dr(W);if(O===ne.spec.name)return;O=ne.spec.name;for(let J of[...C.children])J.geometry?.dispose(),J.isLine&&J.material.dispose(),C.remove(J);let $=(J,pe=2.37)=>new w((J[0]-500)/100,pe,(J[1]-250)/100);for(let J of ne.rails){let pe=J.b[0]-J.a[0],Ce=J.b[1]-J.a[1],te=Math.hypot(pe,Ce),fe=[(J.a[0]+J.b[0])/2,(J.a[1]+J.b[1])/2],_e=-Ce/te,Ue=pe/te,Je=[500,250];J.jaw&&(Je=ne.pockets.slice().sort((mt,et)=>Math.hypot(mt.center[0]-fe[0],mt.center[1]-fe[1])-Math.hypot(et.center[0]-fe[0],et.center[1]-fe[1]))[0].drop),(Je[0]-fe[0])*_e+(Je[1]-fe[1])*Ue<0&&(_e=-_e,Ue=-Ue);let P=new ht(new Rn(te/100,.2,.12),s.felt);P.position.copy($([fe[0]-_e*6,fe[1]-Ue*6],2.36)),P.rotation.y=-Math.atan2(Ce,pe),P.castShadow=P.receiveShadow=!0,C.add(P)}for(let J of ne.pockets){let pe=[ne.rails[6+J.index*2].b,ne.rails[7+J.index*2].b],Ce=[J.ends[0],J.ends[1],pe[1],pe[0]],te=new Vi;Ce.forEach((Ue,Je)=>{let P=(Ue[0]-500)/100,$e=-(Ue[1]-250)/100;Je?te.lineTo(P,$e):te.moveTo(P,$e)}),te.closePath();let fe=new ht(new Hr(te),s.rubber);fe.rotation.x=-Math.PI/2,fe.position.y=2.278,C.add(fe);let _e=new Cn(new tt().setFromPoints([J.ends[0],pe[0],pe[1],J.ends[1]].map(Ue=>$(Ue,2.285))),new ri({color:"#bca36a"}));C.add(_e)}}z({discipline:"pool8"});for(let W of[-4.2,4.2])for(let ne of[-1.9,1.9])g(.5,1.7,.5,s.dark,W,.85,ne),g(.54,.12,.54,s.gold,W,.15,ne);for(let W of[-2.75,2.75])for(let ne=-4;ne<=4;ne++)f(new Ti(.025,8,6),s.cream,ne,2.26,W);for(let W of[-3.4,0,3.4])o.push(f(new In(.025,.025,1.5,8),s.dark,W,6,0)),o.push(f(new In(.12,.6,.42,32),s.dark,W,5.1,0)),o.push(f(new kr(.53,32),s.light,W,4.87,0,Math.PI/2));function F(W,ne={discipline:"pool8"}){let $=document.createElement("canvas");$.width=256,$.height=128;let J=$.getContext("2d");if(J.fillStyle=ne.discipline==="pyramid"?ns(W,ne):W>8?"#fff5db":ns(W,ne),J.fillRect(0,0,256,128),W>8&&ne.discipline!=="pyramid"&&(J.fillStyle=ns(W,ne),J.fillRect(0,34,256,60)),W)for(let Ce of[64,192])J.fillStyle="#fff9e6",J.beginPath(),J.arc(Ce,64,20,0,Math.PI*2),J.fill(),J.fillStyle="#182328",J.font="bold 27px Arial",J.textAlign="center",J.textBaseline="middle",J.fillText(W,Ce,65);let pe=new nn($);return pe.colorSpace=st,r.push(pe),pe}for(let W=0;W<16;W++){let ne=f(new Ti(.1,48,32),new ft({map:F(W),roughness:.12,metalness:0,clearcoat:1,clearcoatRoughness:.08,ior:1.52}),0,2.37,0);ne.rotation.x=-Math.PI/2,a.set(W,ne)}let Z=document.createElement("canvas");Z.width=Z.height=64;let G=Z.getContext("2d"),j=G.createRadialGradient(32,32,3,32,32,32);j.addColorStop(0,"#00000099"),j.addColorStop(1,"#00000000"),G.fillStyle=j,G.fillRect(0,0,64,64);let q=new nn(Z);r.push(q);let oe=new Map;for(let W=0;W<16;W++){let ne=f(new rn(.31,.31),new zt({map:q,transparent:!0,depthWrite:!1}),0,2.277,0,-Math.PI/2);ne.castShadow=!1,oe.set(W,ne)}let ee=new tt().setFromPoints([new w,new w]),ye=new Cn(ee,new $s({color:"#f9e3a6",dashSize:.13,gapSize:.08}));t.add(ye);let we=new Bt;t.add(we);let Se=new ft({color:"#dec18d",roughness:.24,clearcoat:1}),Le=new pt({color:"#b6a38a",metalness:.8,roughness:.24}),le=new ft({color:"#e4c390",roughness:.28,clearcoat:.65}),he=new pt({color:"#182c28",roughness:.65}),ce=new pt({color:"#fff0cb",roughness:.3}),Ie=new pt({color:"#497e94",roughness:.9});function Ne(W,ne,$,J,pe){let Ce=new ht(new In($,J,ne-W,24),pe);Ce.rotation.z=Math.PI/2,Ce.position.x=-(W+ne)/2,Ce.castShadow=!0,we.add(Ce)}Ne(.15,1.1,.014,.022,le),Ne(1.1,2.15,.022,.029,Se),Ne(2.15,2.85,.029,.034,he),Ne(2.85,3,.034,.035,Se),Ne(.11,.15,.015,.015,ce),Ne(.09,.11,.015,.015,Ie);for(let W of[1.85,2.15,2.85])Ne(W-.012,W+.012,.033,.033,Le);for(let W=0;W<40;W++)Ne(2.16+W*.017,2.164+W*.017,.03,.03,he);let b=new Xi().load("assets/player-hall/billiards-cues-v1.webp");b.colorSpace=st,b.repeat.set(1/8,1),b.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),r.push(b);let S=document.createElement("canvas");S.width=512,S.height=64;let B=new nn(S);B.colorSpace=st,r.push(B);let L=new ht(new rn(.52,.055),new zt({map:B,transparent:!0}));L.rotation.x=-Math.PI/2,L.position.set(-1.65,.032,0),L.visible=!1,we.add(L);function M(W,ne){let $=["maple","walnut","aces","ocean","carbon","ruby","signature","sovereign"],J=Math.max(0,$.indexOf(W.id));if(Se.color.set(J?"#ffffff":W.color),Se.map=J?b:null,Se.needsUpdate=!0,b.offset.x=J/8,b.needsUpdate=!0,he.color.set(W.grip),Le.color.set(W.metal),L.visible=!!W.named,W.named){let pe=S.getContext("2d");pe.clearRect(0,0,512,64),pe.fillStyle="#c9a34f",pe.fillRect(0,0,512,64),pe.fillStyle="#171a16",pe.font="bold 39px sans-serif",pe.textAlign="center",pe.textBaseline="middle",pe.fillText(String(ne||"\u0413\u0435\u0440\u043E\u0439").slice(0,28),256,34,490),B.needsUpdate=!0}}let A=f(new Vr(.1,.008,8,48),new zt({color:"#f6dfac",transparent:!0,opacity:.8}),0,2.285,0,Math.PI/2);A.castShadow=!1;let D=performance.now(),I=new sa,Y=new Qt(new w(0,1,0),-2.37);function k(){let W=i.getBoundingClientRect();e.setSize(W.width,W.height,!1),n.aspect=W.width/W.height,n.updateProjectionMatrix(),H(l)}function H(W){if(l=W,o.forEach(ne=>ne.visible=W!=="table"),n.up.set(W==="table"?1:0,W==="table"?0:1,0),W==="table"){let ne=i.getBoundingClientRect(),$=Number.parseFloat(getComputedStyle(document.body).getPropertyValue("--billiards-controls-height"))||170,J=66,pe=Math.min($+12,ne.height*.48),Ce=Math.max(180,ne.height-J-pe),te=ne.width>ne.height,fe=Math.max((te?6.1:11.5)*ne.height/Ce,(te?11.5:6.1)/n.aspect);n.up.set(te?0:1,0,te?-1:0),n.setViewOffset(ne.width,ne.height,ne.width>700?36:27,(pe-J)/2,ne.width,ne.height),n.position.set(0,2.3+fe/(2*Math.tan(n.fov*Math.PI/360)),.01),n.lookAt(0,2.25,0)}else n.clearViewOffset(),n.position.set(9,7.2,10),n.lookAt(0,2,-4)}function re(W,ne){let $=i.getBoundingClientRect();I.setFromCamera(new ie((W-$.left)/$.width*2-1,1-(ne-$.top)/$.height*2),n);let J=new w;return I.ray.intersectPlane(Y,J)?{x:J.x*100+500,y:J.z*100+250}:null}function ge(W){let ne=dr({discipline:O.includes("\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430")?"pyramid":"pool8"}).pockets[W].center,$=new w((ne[0]-500)/100,2.37,(ne[1]-250)/100).project(n),J=i.getBoundingClientRect();return{x:J.left+($.x+1)*J.width/2,y:J.top+(1-$.y)*J.height/2}}function se(W,ne,$){let J=performance.now(),pe=Math.min(.05,(J-D)/1e3);D=J;let Ce=W.discipline+":"+W.color;if(Ce!==c){c=Ce;for(let[te,fe]of a){let _e=fe.material.map;fe.material.map=F(te,W),fe.material.needsUpdate=!0,_e?.dispose();let Ue=r.indexOf(_e);Ue>=0&&r.splice(Ue,1)}z(W)}for(let te of W.balls){let fe=a.get(te.id);if(fe.visible=!te.pocket,fe.position.set((te.x-500)/100,2.27+Nt(W)/100,(te.y-250)/100),fe.scale.setScalar(Nt(W)/10),W.moving&&!te.pocket){let Ue=new w((te.rollY||0)/Nt(W),-(te.side||0)/Nt(W),-(te.rollX||0)/Nt(W)),Je=Ue.length();Je&&fe.rotateOnWorldAxis(Ue.normalize(),Je*pe)}let _e=oe.get(te.id);_e.visible=fe.visible,_e.position.set(fe.position.x+.025,2.277,fe.position.z+.025)}if(A.visible=!1,ye.visible=we.visible=$&&l==="table",ye.visible){let te=W.balls.find(Ct=>Ct.id===(W.cueId??0))||W.balls[0],fe=(te.x-500)/100,_e=(te.y-250)/100,Ue=Math.cos(ne),Je=Math.sin(ne),P=12,$e=null,mt=1/0;for(let Ct of W.balls){if(Ct.id===te.id||Ct.pocket)continue;let cn=(Ct.x-500)/100-fe,Vn=(Ct.y-250)/100-_e,Wn=cn*Ue+Vn*Je,or=cn*cn+Vn*Vn-Wn*Wn,li=Nt(W)*2/100;if(Wn>0&&or<li*li){let lr=Math.max(0,Wn-Math.sqrt(li*li-or));lr<P&&(P=lr,$e=Ct,mt=lr)}}Ue>0&&(P=Math.min(P,(4.9-fe)/Ue)),Ue<0&&(P=Math.min(P,(-4.9-fe)/Ue)),Je>0&&(P=Math.min(P,(2.4-_e)/Je)),Je<0&&(P=Math.min(P,(-2.4-_e)/Je)),$e&&Math.abs(P-mt)<1e-5&&(A.visible=!0,A.position.set(fe+Ue*P,2.285,_e+Je*P),A.scale.setScalar(Nt(W)/10),A.material.color.set(Ni(W).some(Ct=>Ct.id===$e.id)?"#dfefca":"#ed7770"));let et=ee.attributes.position;et.setXYZ(0,fe,2.38,_e),et.setXYZ(1,fe+Ue*P,2.38,_e+Je*P),et.needsUpdate=!0,ye.computeLineDistances(),we.position.set(fe,2.4,_e),we.rotation.set(0,-ne,0)}e.render(t,n)}let Me=new pl,Te=!1,Re=Promise.allSettled([["armchair/ArmChair_01_1k.gltf",2.4,[[8,.08,4,-Math.PI/2],[-8,.08,4,Math.PI/2]],!0],["plant/potted_plant_01-mobile.gltf",2.8,[[9,.08,-8,0],[-9,.08,-8,1]],!1]].map(async([W,ne,$,J])=>{let pe=await Me.loadAsync("assets/city-interior/"+W),Ce=pe.scene,te=new Lt().setFromObject(Ce),fe=te.getSize(new w);if(Te){Ce.traverse(_e=>{_e.geometry?.dispose();for(let Ue of[].concat(_e.material||[])){for(let Je of Object.values(Ue))Je?.isTexture&&Je.dispose();Ue.dispose()}});return}Ce.position.set(-(te.min.x+te.max.x)/2,-te.min.y,-(te.min.z+te.max.z)/2),Ce.traverse(_e=>{if(_e.isMesh)for(let Ue of[].concat(_e.material)){J&&(Ue.color.set("#a52721"),Ue.roughnessMap=null,Ue.roughness=.33);for(let Je of Object.values(Ue))Je?.isTexture&&r.push(Je)}});for(let[_e,Ue,Je,P]of $){if(Te)return;let $e=new Bt;$e.add(Ce.clone()),$e.scale.setScalar(ne/fe.y),$e.position.set(_e,Ue,Je),$e.rotation.y=P,t.add($e)}})),Ve=new ResizeObserver(k);return Ve.observe(i),k(),{render:se,point:re,projectPocket:ge,setView:H,setCue:M,ready:Re,dispose(){Te=!0,Ve.disconnect(),t.traverse(W=>{W.geometry?.dispose();for(let ne of[].concat(W.material||[]))ne.dispose()}),r.forEach(W=>W.dispose()),e.dispose()}}}var b0=i=>i===8?null:i<8?0:1;function T0(i){if(i.rulesVersion)return Ni(i);let e=i.groups[i.turn],t=i.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||b0(n.id)===e));return t.length?t:i.balls.filter(n=>n.id===8&&!n.pocket)}function gf(i,e,t,n,r=wl){let s=e.x-i.x,a=e.y-i.y,o=s*s+a*a;return!t.some(l=>!l.pocket&&!n.includes(l.id)&&(()=>{let c=((l.x-i.x)*s+(l.y-i.y)*a)/o;return c<=0||c>=1?!1:Math.hypot(l.x-i.x-s*c,l.y-i.y-a*c)<r*2+1})())}function _f(i){if(i.moving||i.winner!==null)return null;if(i.pending){let o=i.pending;return o.type==="pyramid-foul"?{type:"decision",choice:"play",ballId:i.balls.find(l=>!l.pocket).id}:{type:"decision",choice:o.illegal?"rerack-self":"accept"}}if(i.inHand){for(let o=180;o<ui-30;o+=45)for(let l=di/2;l<di-25;l+=30){let c=structuredClone(i);if(Ta(c,o,l))return{type:"place",x:o,y:l}}for(let o=30;o<ui-25;o+=25)for(let l=30;l<di-25;l+=25){let c=structuredClone(i);if(Ta(c,o,l))return{type:"place",x:o,y:l}}return null}let e=i.discipline==="pyramid"?i.balls.find(o=>o.id===i.cueId&&!o.pocket)||i.balls.find(o=>!o.pocket):i.balls[0],t=i.rulesVersion?Nt(i):wl,n={...i,cueId:e.id},r=T0(n),s=null;for(let o of r)for(let[l,[c,h]]of El.entries()){let u=Math.hypot(c-o.x,h-o.y);if(u<1)continue;let p=(c-o.x)/u,d=(h-o.y)/u,m={x:o.x-p*t*2,y:o.y-d*t*2};if(m.x<t||m.x>ui-t||m.y<t||m.y>di-t)continue;let v=Math.hypot(m.x-e.x,m.y-e.y),f=((m.x-e.x)*p+(m.y-e.y)*d)/Math.max(1,v);if(f<.25||!gf(e,m,i.balls,[e.id,o.id],t)||!gf(o,{x:c,y:h},i.balls,[e.id,o.id],t))continue;let g=f*700-v*.25-u*.4;s&&s.score>=g||(s={score:g,type:"shot",cueId:e.id,callBall:o.id,callPocket:l,angle:Math.atan2(m.y-e.y,m.x-e.x),power:Math.max(.15,Math.min(.85,(Math.sqrt(2*.018*9810*1e3/Li(i).length*(v+u/Math.max(.3,f)))/.714-180)/1250+.05))})}if(s)return delete s.score,s;let a=r.slice().sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y)-Math.hypot(l.x-e.x,l.y-e.y))[0];return a?{type:"shot",cueId:e.id,callBall:a.id,callPocket:0,angle:Math.atan2(a.y-e.y,a.x-e.x),power:.4}:null}var is=Object.freeze([{id:"maple",name:"\u041F\u0435\u0440\u0432\u044B\u0439 \u0443\u0434\u0430\u0440",level:0,color:"#dec18d",grip:"#62452e",metal:"#b6a38a"},{id:"walnut",name:"\u041E\u0440\u0435\u0445\u043E\u0432\u044B\u0439 \u043A\u043B\u0443\u0431",level:10,color:"#633a23",grip:"#453024",metal:"#d5ae60"},{id:"aces",name:"\u0414\u0432\u0430 \u0442\u0443\u0437\u0430",level:20,color:"#124e3c",grip:"#173c30",metal:"#e7bb61"},{id:"ocean",name:"\u041E\u043A\u0435\u0430\u043D",level:35,color:"#226b96",grip:"#203f56",metal:"#cad7df"},{id:"carbon",name:"\u041A\u0430\u0440\u0431\u043E\u043D",level:50,color:"#242b30",grip:"#161d21",metal:"#d6dee3"},{id:"ruby",name:"\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0439",level:65,color:"#6d1726",grip:"#3c1720",metal:"#edbf65"},{id:"signature",name:"\u0418\u043C\u0435\u043D\u043D\u043E\u0439",level:80,color:"#eee0b2",grip:"#171b1a",metal:"#e5bf68",named:!0},{id:"sovereign",name:"\u041F\u043E\u0432\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0441\u0442\u043E\u043B\u0430",level:100,color:"#122d27",grip:"#12201c",metal:"#f4cc71"}]);function w0(i,e){let t=is.find(n=>n.id===i);return t&&Number.isFinite(e)&&e>=t.level?t:is[0]}function E0(i){if(!i?.self||!i.accountId)throw Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0433\u0435\u0440\u043E\u044F.");let e=Number(i.garage?.stats?.level);if(!Number.isFinite(e)||e<0)throw Error("\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.");return{accountId:String(i.accountId),level:Math.floor(e),nick:String(i.nick||i.name||"\u0413\u0435\u0440\u043E\u0439").trim().slice(0,28)}}function vf({source:i,room:e,openInitially:t=!1}){let n=p=>document.getElementById(p),r=n("cueDialog"),s=null,a=is[0],o=!1;function l(){return"p21:billiards:cue:v1:"+s.accountId}function c(p){a=p,e?.setCue(p,s?.nick||""),n("cueButton").textContent="\u041A\u0438\u0439 \xB7 "+p.name}function h(){let p=document.activeElement?.dataset?.cue;if(n("cueSave").disabled=o,n("cueHero").textContent=o?"\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F\u2026":s?"\u0412\u0430\u0448 \u0433\u0435\u0440\u043E\u0439 \xB7 \u0443\u0440\u043E\u0432\u0435\u043D\u044C "+s.level:"\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u0438\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C",n("cueList").replaceChildren(),is.forEach((d,m)=>{let v=!!s&&s.level>=d.level||d.level===0,f=document.createElement("button");f.type="button",f.className="cue-card",f.dataset.cue=d.id,f.setAttribute("aria-pressed",String(a.id===d.id)),f.disabled=!v||o;let g=document.createElement("span");g.className="cue-card__art",g.style.backgroundPosition=m/7*100+"% center",g.setAttribute("aria-hidden","true");let _=document.createElement("strong");_.textContent=d.name;let x=document.createElement("small");x.textContent=d.level?"\u0421 "+d.level+" \u0443\u0440\u043E\u0432\u043D\u044F":"\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C";let y=document.createElement("span");if(y.className="cue-card__state",y.textContent=v?a.id===d.id?"\u2713 \u0412\u044B\u0431\u0440\u0430\u043D":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C":"\u{1F512} \u0415\u0449\u0451 "+Math.max(0,d.level-(s?.level||0))+" \u0443\u0440.",f.append(g,_,x),d.named){let T=document.createElement("span");T.className="cue-card__name",T.textContent=s?.level>=d.level?s.nick:"\u0412\u0430\u0448 \u043D\u0438\u043A \u043D\u0430 \u043A\u0438\u0435",f.append(T)}f.append(y),f.onclick=()=>{if(!(o||!v)){c(d);try{s&&localStorage.setItem(l(),d.id)}catch{}h(),n("cueFeedback").textContent="\u0412\u044B\u0431\u0440\u0430\u043D \u043A\u0438\u0439 \xAB"+d.name+"\xBB"+(d.named?" \xB7 "+s.nick:"")+"."}},n("cueList").append(f)}),p){let d=Array.from(n("cueList").children).find(m=>m.dataset.cue===p);d&&!d.disabled&&d.focus({preventScroll:!0})}}async function u(){if(!o){o=!0,h(),n("cueError").textContent="";try{if(typeof i.pokerSocialRequest!="function")throw Error("\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0438\u043B\u044C\u044F\u0440\u0434 \u0438\u0437 \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u043E\u043C\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F.");let p=await i.pokerSocialRequest("player-hall",{action:"get"});s=E0(p.hall);let d;try{d=localStorage.getItem(l())}catch{}c(w0(d,s.level))}catch(p){s=null,c(is[0]),n("cueError").textContent=p.message||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0433\u0435\u0440\u043E\u044F."}finally{o=!1,h()}}}return n("cueSave").onclick=()=>{if(!o)try{s&&localStorage.setItem(l(),a.id),c(a),r.close()}catch{n("cueError").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."}},n("cueRetry").onclick=u,n("cueClose").onclick=()=>r.close(),r.addEventListener("click",p=>{if(p.target===r){let d=r.getBoundingClientRect();(p.clientX<d.left||p.clientX>d.right||p.clientY<d.top||p.clientY>d.bottom)&&r.close()}}),n("cueButton").onclick=()=>{r.showModal(),u()},c(is[0]),h(),u(),t&&r.showModal(),{inspect:()=>({selected:a.id,level:s?.level??null,nick:s?.nick||"",loading:o})}}var xf=["\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430"],ve=i=>document.getElementById(i);function yf({move:i,room:e}){let t=0,n="",r=null,s=!1;function a(){return{discipline:ve("discipline").value,color:ve("ballSet").value,raceTo:Number(ve("raceTo").value)}}function o(f){let g=ve(f);ve(f+"Buttons").replaceChildren(...Array.from(g.options,_=>{let x=document.createElement("button");return x.type="button",x.dataset.value=_.value,x.textContent=_.text,x.setAttribute("aria-pressed",String(g.value===_.value)),x.onclick=()=>{g.value=_.value,g.dispatchEvent(new Event("change"))},x}))}function l(){let f=ve("discipline").value==="pyramid";ve("ballSet").replaceChildren(...(f?[["yellow","\u0411\u0435\u043B\u044B\u0435 + \u0436\u0451\u043B\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"],["red","\u0411\u0435\u043B\u044B\u0435 + \u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"]]:[["standard","\u0426\u0432\u0435\u0442\u043D\u044B\u0435: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \u0438 \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435"]]).map(([_,x])=>new Option(x,_))),ve("disciplineInfo").textContent=f?"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430: \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u0442\u044C 8 \u0448\u0430\u0440\u043E\u0432. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0431\u0438\u0442\u043A\u043E\u043C \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440.":"\u041F\u0443\u043B \xAB\u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430\xBB: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0432\u043E\u044F \u0433\u0440\u0443\u043F\u043F\u0430, \u0437\u0430\u0442\u0435\u043C \u2116 8. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.";let g=Li(ve("discipline").value);ve("tableDimensions").textContent=g.name+" \xB7 \u0448\u0430\u0440\u044B "+g.ball+" \u043C\u043C \xB7 \u0441\u0442\u0432\u043E\u0440\u044B "+g.corner+" / "+g.side+" \u043C\u043C",o("discipline"),o("ballSet")}ve("placeBreak").onclick=()=>s=!s,ve("discipline").onchange=l,ve("ballSet").onchange=()=>o("ballSet"),l(),xf.forEach((f,g)=>ve("callPocket").add(new Option(g+1+" \xB7 "+f,String(g)))),ve("callBall").onchange=ve("callPocket").onchange=ve("safety").onchange=()=>{},ve("decisionButtons").onclick=f=>{let g=f.target.closest("[data-decision]")?.dataset.decision;g&&i({type:"decision",choice:g,ballId:Number(ve("penaltyBall").value)})},ve("pocketMarkers").replaceChildren(...xf.map((f,g)=>{let _=document.createElement("button");return _.type="button",_.textContent=g+1,_.title=f,_.setAttribute("aria-label","\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0443\u0437\u0443 "+(g+1)+" \xB7 "+f),_.onclick=()=>ve("callPocket").value=String(g),_}));function c(f,g){let _=document.createElement("span");return _.className="potted-ball"+(g.discipline!=="pyramid"&&f>8?" striped":""),_.style.setProperty("--ball-color",ns(f,g)),_.textContent=f||"",_.title=f?"\u0428\u0430\u0440 "+f:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439 \u0448\u0430\u0440",f===8&&g.discipline==="pool8"&&g.winner!==null&&g.winner!==g.lastShooter&&(_.classList.add("invalid-eight"),_.title="\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435\u043C \u2014 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0448 \u043F\u0430\u0440\u0442\u0438\u0438"),_}function h(f,g,_){let x=f.value;f.replaceChildren(new Option(_,""),...g.map(y=>new Option(y.id?"\u2116 "+y.id:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439",String(y.id)))),g.some(y=>String(y.id)===x)&&(f.value=x)}function u(f){return{cueId:t,callBall:ve("callBall").value===""?null:Number(ve("callBall").value),callPocket:ve("callPocket").value===""?null:Number(ve("callPocket").value),safety:ve("safety").checked}}function p(f,g){if(f.discipline!=="pyramid"||f.breakPending||f.inHand)return!1;let _=f.balls.filter(x=>!x.pocket).map(x=>({ball:x,distance:Math.hypot(x.x-g.x,x.y-g.y)})).filter(x=>x.distance<22).sort((x,y)=>x.distance-y.distance)[0]?.ball;return _?(t=_.id,!0):!1}function d(f,{player:g,mode:_,tableView:x,can:y}){r=f,ve("matchDiscipline").textContent=f.discipline==="pyramid"?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",(!f.balls.some(C=>C.id===t&&!C.pocket)||f.breakPending||f.discipline!=="pyramid")&&(t=f.discipline==="pyramid"&&!f.breakPending?f.balls.find(C=>!C.pocket)?.id??0:0);let T=f.discipline==="pyramid",R=JSON.stringify([f.shot,f.turn,f.discipline,f.color,f.groups,f.balls.map(C=>C.pocket),f.pending,f.winner,g,_]);ve("placeBreak").hidden=!f.breakPending||!y,ve("placeBreak").textContent=s?"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432 \u0434\u043E\u043C\u0435 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435":"\u041F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435",ve("ballShelves").hidden=!x,ve("callControls").hidden=!x||T||f.breakPending||f.moving||!!f.pending||!y,ve("cuePickHint").hidden=!x||!T||f.breakPending,ve("cuePickHint").textContent="\u0411\u0438\u0442\u043E\u043A: "+(t?"\u2116 "+t:"\u0446\u0432\u0435\u0442\u043D\u043E\u0439")+" \xB7 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0448\u0430\u0440 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",ve("decisionPanel").hidden=!f.pending||!y;let N=u(f),U=!T&&!f.breakPending&&!m()&&(N.callBall===null||N.callPocket===null);if(y&&f.pending?ve("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438 \u043D\u0438\u0436\u0435":y&&f.inHand?ve("hint").textContent=f.handZone==="head"?"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435 \u2014 \u0432 \u043D\u0438\u0436\u043D\u0435\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438 \u0441\u0442\u043E\u043B\u0430":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0431\u0438\u0442\u043A\u0430":y&&U&&(ve("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 \u043B\u0438\u0431\u043E \u043E\u0442\u044B\u0433\u0440\u044B\u0448"),ve("shoot").disabled=!y||f.inHand||!x||!!f.pending||U||s,ve("pocketMarkers").hidden=!x||T||f.breakPending||!y||!!f.pending,ve("pocketMarkers").hidden||Array.from(ve("pocketMarkers").children).forEach((C,O)=>{let z=e.projectPocket?.(O);z&&(C.style.left=z.x+"px",C.style.top=z.y+"px"),C.classList.toggle("chosen",ve("callPocket").value===String(O))}),R!==n){n=R,h(ve("callBall"),Ni({...f,cueId:t}),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440");for(let O=0;O<2;O++){let z=O===0,F=_==="training"?O:z?g:1-g,Z=_==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(O+1):z?"\u0412\u044B":_==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433",G=f.groups[F];ve("shelfName"+O).textContent=Z,ve("shelfGroup"+O).textContent=T?"\u0414\u043E 8 \u0448\u0430\u0440\u043E\u0432":G===null?"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":G===0?"\u0421\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \xB7 1\u20137":"\u041F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 \xB7 9\u201315";let j=[...f.captured?.[F]||f.balls.filter(q=>q.pocket&&q.id&&q.id!==8&&G!==null&&(q.id<8?0:1)===G).map(q=>q.id)];!T&&f.winner!==null&&f.lastShooter===F&&f.balls.some(q=>q.id===8&&q.pocket)&&j.push(8),ve("shelfBalls"+O).replaceChildren(...j.map(q=>c(q,f))),ve("shelfCount"+O).textContent=(T?j.length:j.filter(q=>q!==8).length)+" / "+(T?8:7),ve("shelf"+O).classList.toggle("active",f.turn===F&&f.winner===null)}let C=!T&&f.groups[0]===null?f.balls.filter(O=>O.pocket&&O.id&&O.id!==8):[];if(ve("unassignedBalls").replaceChildren(...C.map(O=>c(O.id,f))),ve("unassignedTray").hidden=!C.length,f.pending){let O=f.pending,z=O.type==="pyramid-foul";ve("penaltyLabel").hidden=!z,z&&h(ve("penaltyBall"),f.balls.filter(Z=>!Z.pocket),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440");let F=z?[["play","\u0421\u043D\u044F\u0442\u044C \u0448\u0430\u0440 \u0438 \u0438\u0433\u0440\u0430\u0442\u044C"],["pass","\u0421\u043D\u044F\u0442\u044C \u0448\u0430\u0440 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0445\u043E\u0434"],...O.illegalBreak?[["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:[]]:O.illegal?[["accept","\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"],...O.foul?[["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]]:[],["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:O.eight?[["accept",O.foul?"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \xB7 \u0431\u0438\u0442\u043E\u043A \u0438\u0437 \u0434\u043E\u043C\u0430":"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"],["rerack-self","\u0420\u0430\u0437\u0431\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E"]]:[["accept","\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E"],["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]];ve("decisionButtons").replaceChildren(...F.map(([Z,G])=>{let j=document.createElement("button");return j.type="button",j.dataset.decision=Z,j.textContent=G,j}))}}if(f.pending?.type==="pyramid-foul")for(let C of ve("decisionButtons").children)C.disabled=ve("penaltyBall").value==="";return{...f,cueId:t}}function m(){return ve("safety").checked}function v(){let f=(r?.discipline||a().discipline)==="pyramid";ve("rulesTitle").textContent=f?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",ve("rulesText").replaceChildren(...(f?["15 \u0431\u0435\u043B\u044B\u0445 \u0448\u0430\u0440\u043E\u0432 \u0438 \u043E\u0434\u0438\u043D \u0446\u0432\u0435\u0442\u043D\u043E\u0439. \u041F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0442\u043E\u0442, \u043A\u0442\u043E \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u043B 8 \u0448\u0430\u0440\u043E\u0432. \u0428\u0430\u0440\u044B \u043D\u0435 \u0434\u0435\u043B\u044F\u0442\u0441\u044F \u043D\u0430 \u0441\u0432\u043E\u0438 \u0438 \u0447\u0443\u0436\u0438\u0435.","\u0420\u0430\u0437\u0431\u043E\u0439 \u2014 \u0446\u0432\u0435\u0442\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u0438\u0437 \u0434\u043E\u043C\u0430. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0435\u0433\u043E \u0431\u0438\u0442\u043A\u043E\u043C. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u0431\u0438\u0432\u0430\u0442\u044C \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440, \u0438 \u0441\u0430\u043C \u0431\u0438\u0442\u043E\u043A \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0448\u0430\u0440\u0430. \u0417\u0430\u043A\u0430\u0437 \u043B\u0443\u0437\u044B \u043D\u0435 \u043D\u0443\u0436\u0435\u043D.","\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439: \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0437\u0430\u0431\u0438\u0442 \u0448\u0430\u0440, \u043B\u0438\u0431\u043E 3 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430, \u043B\u0438\u0431\u043E 2 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430 \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u043F\u0435\u0440\u0435\u0441\u0451\u043A \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0443 \u0441\u0442\u043E\u043B\u0430.","\u0415\u0441\u043B\u0438 \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442, \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u043D\u044B \u0434\u0432\u0430 \u0440\u0430\u0437\u043D\u044B\u0445 \u0431\u043E\u0440\u0442\u0430 \u043B\u0438\u0431\u043E \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u044B \u0438 \u0431\u043E\u0440\u0442. \u042D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0447\u0435\u0440\u0435\u0437 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u0438\u043C \u0448\u0430\u0440\u0430\u043C. \u041E\u0434\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0433\u043E \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0431\u043E\u0440\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E.","\u0417\u0430 \u0444\u043E\u043B \u0432\u0441\u0435 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u0435 \u0448\u0430\u0440\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043B\u044E\u0431\u043E\u0439 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443, \u0437\u0430\u0442\u0435\u043C \u0438\u0433\u0440\u0430\u0435\u0442 \u0441\u0430\u043C \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442 \u0445\u043E\u0434. \u041F\u0440\u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u043C \u0440\u0430\u0437\u0431\u043E\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0430\u043A\u0436\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443 \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C \u0441\u0447\u0451\u0442\u0430."]:["\u0411\u0435\u043B\u044B\u0439 \u0431\u0438\u0442\u043E\u043A \u0438 15 \u0446\u0432\u0435\u0442\u043D\u044B\u0445: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 1\u20137, \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 9\u201315, \u0447\u0451\u0440\u043D\u044B\u0439 \u2116 8. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u0433\u0440\u0443\u043F\u043F\u0443, \u0437\u0430\u0442\u0435\u043C \u0437\u0430\u0431\u0435\u0439\u0442\u0435 \u2116 8 \u0432 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u043B\u0443\u0437\u0443.","\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430. \u0411\u0435\u0437 \u0437\u0430\u0431\u0438\u0442\u043E\u0433\u043E \u0448\u0430\u0440\u0430 \u043C\u0438\u043D\u0438\u043C\u0443\u043C 4 \u0440\u0430\u0437\u043D\u044B\u0445 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u0434\u043E\u043B\u0436\u043D\u044B \u043A\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F \u0431\u043E\u0440\u0442\u0430. \u0421\u0442\u043E\u043B \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.","\u041F\u0435\u0440\u0435\u0434 \u043A\u0430\u0436\u0434\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 (\u043D\u043E\u043C\u0435\u0440\u0430 \u043B\u0443\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u043D\u0430 \u0441\u0442\u043E\u043B\u0435). \u0417\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0443\u0434\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441\u0435\u0440\u0438\u044E. \u041C\u043E\u0436\u043D\u043E \u043E\u0431\u044A\u044F\u0432\u0438\u0442\u044C \u043E\u0442\u044B\u0433\u0440\u044B\u0448 \u2014 \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0433\u043E \u0445\u043E\u0434 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0443.","\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0448\u0430\u0440\u0430 \u0441\u0432\u043E\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B; \u043D\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043C \u0441\u0442\u043E\u043B\u0435 \u2014 \u043B\u044E\u0431\u043E\u0433\u043E, \u043A\u0440\u043E\u043C\u0435 \u2116 8, \u043F\u043E\u043A\u0430 \u043D\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u0430 \u043E\u0434\u043D\u0430 \u0438\u0437 \u0433\u0440\u0443\u043F\u043F. \u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u0435\u043D \u0437\u0430\u0431\u0438\u0442\u044B\u0439 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438\u043B\u0438 \u043A\u0430\u0441\u0430\u043D\u0438\u0435 \u0431\u043E\u0440\u0442\u0430 \u043B\u044E\u0431\u044B\u043C \u0448\u0430\u0440\u043E\u043C.","\u0417\u0430\u0431\u0438\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A, \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0440 \u2014 \u0444\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0441\u0442\u0430\u0432\u0438\u0442 \u0431\u0438\u0442\u043E\u043A \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435; \u043F\u043E\u0441\u043B\u0435 \u0444\u043E\u043B\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u2014 \u0432 \u0434\u043E\u043C\u0435. \u0420\u0430\u043D\u043D\u044F\u044F \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430, \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u0444\u043E\u043B\u043E\u043C \u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043B\u0443\u0437\u0435 \u2014 \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435. \u041D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438\u0431\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439."]).map(g=>{let _=document.createElement("p");return _.textContent=g,_})),ve("rules").showModal()}return ve("rulesButton").onclick=v,{settings:a,options:u,render:d,chooseCue:p,restoreControls(f){t=f.cueId??0,n="",s=!1,ve("callBall").replaceChildren(new Option("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440",""),new Option("\u2116 "+f.callBall,String(f.callBall))),ve("callBall").value=f.callBall==null?"":String(f.callBall),ve("callPocket").value=f.callPocket==null?"":String(f.callPocket),ve("safety").checked=!!f.safety},isPlacing:f=>f.inHand||f.breakPending&&s,placed(){s=!1},reset(){t=0,s=!1,n="",ve("callBall").value="",ve("callPocket").value="",ve("safety").checked=!1},inspect:()=>({selectedCue:t,call:u(r||{})})}}var nt=i=>document.getElementById(i),Mf=i=>Math.abs(i)<.005?0:Math.round(i*100)/100;function Sf({adjust:i}){let e={x:0,y:0},t=!1,n=-1;function r(){let o=[];return e.y&&o.push(e.y>0?"\u043D\u0430\u043A\u0430\u0442":"\u043E\u0442\u0442\u044F\u0436\u043A\u0430"),e.x&&o.push(e.x>0?"\u043F\u0440\u0430\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A":"\u043B\u0435\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A"),o.join(" + ")||"\u0446\u0435\u043D\u0442\u0440"}function s(){let o=r();nt("spinDot").style.left=50+e.x*43+"%",nt("spinDot").style.top=50-e.y*43+"%",nt("spinX").value=Math.round(e.x*100),nt("spinY").value=Math.round(e.y*100),nt("spinXValue").textContent=Math.round(e.x*100)+"%",nt("spinYValue").textContent=Math.round(e.y*100)+"%",nt("spinLabel").textContent=o,nt("spinButton").textContent="\u042D\u0444\u0444\u0435\u043A\u0442 \xB7 "+o,nt("spinPad").setAttribute("aria-label","\u0422\u043E\u0447\u043A\u0430 \u0443\u0434\u0430\u0440\u0430: "+o)}function a(o){let l=nt("spinPad").getBoundingClientRect(),c=(o.clientX-l.left-l.width/2)/(l.width*.43),h=(l.top+l.height/2-o.clientY)/(l.height*.43),u=Math.max(1,Math.hypot(c,h));e={x:Mf(c/u),y:Mf(h/u)};let p=Math.hypot(e.x,e.y);p>1&&(e.x/=p,e.y/=p),s()}nt("spinPad").onpointerdown=o=>{o.preventDefault(),nt("spinPad").setPointerCapture(o.pointerId),a(o)},nt("spinPad").onpointermove=o=>{nt("spinPad").hasPointerCapture(o.pointerId)&&a(o)},nt("spinPad").onpointerup=nt("spinPad").onpointercancel=o=>{nt("spinPad").hasPointerCapture(o.pointerId)&&nt("spinPad").releasePointerCapture(o.pointerId)};for(let[o,l,c]of[["spinX","x","y"],["spinY","y","x"]])nt(o).oninput=()=>{let h=Math.sqrt(Math.max(0,1-e[c]**2));e[l]=Math.max(-h,Math.min(h,Number(nt(o).value)/100)),s()};return nt("spinButton").onclick=()=>{t&&nt("spinDialog").showModal()},nt("spinClose").onclick=()=>nt("spinDialog").close(),nt("spinReset").onclick=()=>{e={x:0,y:0},s()},nt("aimLeft").onclick=()=>{t&&i(-.2*Math.PI/180)},nt("aimRight").onclick=()=>{t&&i(.2*Math.PI/180)},s(),{value:()=>({...e}),restore(o){e=o?{...o}:{x:0,y:0},n=-1,s()},reset(){e={x:0,y:0},s(),n=-1},render(o,l){t=l&&!o.pending&&!o.inHand;for(let h of["spinButton","aimLeft","aimRight"])nt(h).disabled=!t;o.moving&&o.shot!==n&&(n=o.shot,e={x:0,y:0},s());let c=o.lastShot;nt("lastShotSummary").hidden=!c,nt("lastShotSummary").textContent=c?"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0443\u0434\u0430\u0440: \u0432 \u043B\u0443\u0437\u044B "+c.potted.length+" \xB7 \u0431\u043E\u0440\u0442\u0430 "+(c.contacts.rails||0)+" \xB7 \u0433\u0443\u0431\u043A\u0438 "+(c.contacts.jaws||0):""},inspect:()=>({spin:{...e}})}}function rs(i=1,e=1){if(i!==1&&i!==3)throw Error("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u043D\u0443 \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0441\u0435\u0440\u0438\u044E \u0434\u043E 3 \u043F\u043E\u0431\u0435\u0434.");return{target:i,wins:[0,0],round:1,creditedRound:0,winner:null,number:e}}function cu(i,e){return![0,1].includes(e)||i.winner!==null||i.creditedRound===i.round?!1:(i.wins[e]++,i.creditedRound=i.round,i.wins[e]>=i.target&&(i.winner=e),!0)}function bf(i){if(i.creditedRound!==i.round)throw Error("\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043F\u0430\u0440\u0442\u0438\u044E.");return i.winner!==null?rs(i.target,i.number+1):{...i,wins:[...i.wins],round:i.round+1}}function Tf(){let i=null;return{move(e,t,n){let r=structuredClone(e);return Di(e,e.turn,t)?(t.type==="shot"&&(i={before:r,move:structuredClone(t),controls:structuredClone(n)}),!0):!1},restore(){return i?{state:structuredClone(i.before),controls:structuredClone(i.controls),move:structuredClone(i.move)}:null},replay(){let e=this.restore();return!e||!Di(e.state,e.state.turn,e.move)?null:e},clear(){i=null},inspect:()=>({available:!!i})}}var ue=i=>document.getElementById(i),de=ps(),ss=de,St=0,Gn=!1,as=null,yn=0,zn=!1,os=performance.now(),xn=0,uu=0,hu=-1,bt=null,ma=0,ml="",Ke=null,sr=0,Tt=rs(),ga=Tt,ls=Tf(),Hn;try{Hn=mf(ue("room"))}catch{ue("connection").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C 3D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.",ue("create").disabled=ue("join").disabled=ue("solo").disabled=ue("training").disabled=!0}var Ef=window;try{parent!==window&&parent.location.origin===location.origin&&(Ef=parent)}catch{}var ar=Sf({adjust:i=>{yn=Math.atan2(Math.sin(yn+i),Math.cos(yn+i))}}),Gt=yf({move:i=>du(i),room:Hn}),Af=new URLSearchParams(location.search).get("mode")==="cues";Af&&(ue("lobby").hidden=!0);var A0=vf({source:Ef,room:Hn,openInitially:Af});async function R0(i){let e=window;try{parent!==window&&parent.location.origin===location.origin&&(e=parent)}catch{}let t=e.pokerApiAuthJsonBody?.({})||{},n=e.getApiBase?.()||location.origin,r=await fetch(n+"/api/billiards",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",cache:"no-store",body:JSON.stringify({...t,...i}),signal:AbortSignal.timeout(1e4)}),s=await r.json();if(!r.ok||!s.ok)throw Error(s.error||"\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.");return s}function Ci(i){ue("connection").textContent=i}function _a(i){Ke===null&&(ue("lobby").hidden=!i),zn=i,Hn?.setView(i?"table":"room"),document.body.classList.toggle("billiards-table-view",i),ue("view").textContent=i?"\u0412 \u043A\u043E\u043C\u043D\u0430\u0442\u0443":"\u041A \u0441\u0442\u043E\u043B\u0443"}function cs(){ls.clear(),Gn=!1,Ke=null,sr=0,bt=null,as?.close(),as=null,ml="",ue("create").disabled=ue("join").disabled=!1,ue("lobby").hidden=!1,ue("game").hidden=!0,_a(!1),ue("lobby").hidden=!1}function Rf(i=!1){if(!Hn)return;cu(Tt,de.winner);let e=i&&Ke==="solo"&&de.winner!==null?de:null,t=e?bf(Tt):rs(Gt.settings().raceTo),n=e?{discipline:e.discipline,color:e.color,breaker:1-(e.breaker||0)}:Gt.settings();cs(),Ke="solo",Tt=t,ga=Tt,de=ps({...n,seed:Math.floor(Math.random()*4294967296)}),Gt.reset(),ar.reset(),ss=de,St=0,Gn=!0,yn=0,xn=0,de.message=de.turn===0?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443 \xB7 \u0431\u0438\u0442\u043E\u043A \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043C\u0430":"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443",ue("lobby").hidden=!0,ue("game").hidden=!1,ue("matchMode").textContent="\u041E\u0414\u0418\u041D\u041E\u0427\u041D\u0410\u042F \u041F\u0410\u0420\u0422\u0418\u042F \xB7 \u041A\u041E\u041C\u041F\u042C\u042E\u0422\u0415\u0420",_a(!0),os=performance.now()}function Cf(){Hn&&(cs(),Ke="training",de=ps({...Gt.settings(),seed:Math.floor(Math.random()*4294967296)}),ss=de,Tt=rs(),Gt.reset(),ar.reset(),St=0,Gn=!0,yn=0,xn=0,ue("lobby").hidden=!0,ue("game").hidden=!1,ue("matchMode").textContent="\u0422\u0420\u0415\u041D\u0418\u0420\u041E\u0412\u041A\u0410 \xB7 \u0412\u042B \u0423\u041F\u0420\u0410\u0412\u041B\u042F\u0415\u0422\u0415 \u041E\u0411\u0415\u0418\u041C\u0418 \u0421\u0422\u041E\u0420\u041E\u041D\u0410\u041C\u0418",_a(!0),os=performance.now())}function du(i){return Ke==="training"?ls.move(de,i,{angle:yn,power:Number(ue("power").value),rules:Gt.options(de),spin:ar.value()}):Ke==="solo"?Di(de,St,i):as?.move(i)}function If(i){if(Ke!=="training")return;let e=i?ls.replay():ls.restore();e&&(de=e.state,ss=de,St=de.turn,yn=e.controls.angle,ue("power").value=e.controls.power,ue("powerValue").textContent=e.controls.power+"%",Gt.restoreControls(e.controls.rules),ar.restore(e.controls.spin),xn=0,os=performance.now(),sr=0)}function C0(i){if(Cl(i.state)&&(ml="",ma=i.serverNow-Date.now(),St=i.player,Gn=i.ready,ue("roomCode").textContent=i.roomId,ue("invite").hidden=i.player!==0,ue("create").disabled=ue("join").disabled=!1,i.challengeSent&&Ci("\u0412\u044B\u0437\u043E\u0432 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 \u0447\u0430\u0442 \u0438\u0433\u0440\u043E\u043A\u043E\u0432 \xB7 \u0436\u0434\u0451\u043C \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"),i.ready?(ue("lobby").hidden=!0,ue("game").hidden=!1,ue("matchMode").textContent="\u041F\u0410\u0420\u0422\u0418\u042F \u0421 \u0414\u0420\u0423\u0413\u041E\u041C \xB7 \u041E\u041D\u041B\u0410\u0419\u041D"):i.challengeSent||Ci("\u041A\u043E\u043C\u043D\u0430\u0442\u0430 "+i.roomId+" \xB7 \u0436\u0434\u0451\u043C \u0434\u0440\u0443\u0433\u0430"),i.revision!==hu)){if(hu=i.revision,ss=i.state,ga=i.match||rs(),bt=i.playback,Tt=bt?.matchBefore?structuredClone(bt.matchBefore):structuredClone(ga),bt&&Cl(bt.before)&&Date.now()+ma<bt.startedAt+bt.durationMs){de=structuredClone(bt.before),bt.move?Di(de,de.turn,bt.move):Al(de,bt.angle,bt.power);let e=Math.max(0,Date.now()+ma-bt.startedAt);for(let t=0;t<Math.floor(e/1e3*120)&&de.moving;t++)wa(de)}else de=ss,Tt=structuredClone(ga),bt=null;i.ready&&!zn&&_a(!0),xn=0,os=performance.now()}}function va(i,e=!1){let t=ue("code").value.toUpperCase().replace(/\s/g,"");if(!i&&!/^[A-HJ-NP-Z2-9]{10}$/.test(t)){Ci("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u0441\u043B\u0430\u043B \u0434\u0440\u0443\u0433.");return}cs(),Ke="online",hu=-1,ue("create").disabled=ue("join").disabled=!0,Ci(i?"\u0421\u043E\u0437\u0434\u0430\u0451\u043C \u043A\u043E\u043C\u043D\u0430\u0442\u0443\u2026":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F\u2026"),as=Hu({request:R0,onUpdate:C0,onError(n,r){ml=n,Gn=!1,Ci(n),r?ue("create").disabled=ue("join").disabled=!1:ue("hint").textContent=n}}),as.start(i,t,{...Gt.settings(),challenge:e})}ue("challenge").onclick=()=>{ue("create").disabled||va(!0,!0)};ue("solo").onclick=()=>Rf();ue("training").onclick=Cf;ue("restoreShot").onclick=()=>If(!1);ue("repeatShot").onclick=()=>If(!0);ue("create").onclick=()=>va(!0);ue("join").onclick=()=>va(!1);ue("code").onkeydown=i=>{i.key==="Enter"&&va(!1)};ue("copy").onclick=async()=>{try{await navigator.clipboard.writeText(ue("roomCode").textContent),Ci("\u041A\u043E\u0434 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0434\u0440\u0443\u0433\u0443.")}catch{Ci("\u041A\u043E\u0434 \u043A\u043E\u043C\u043D\u0430\u0442\u044B: "+ue("roomCode").textContent)}};ue("view").onclick=()=>_a(!zn);ue("power").oninput=()=>{ue("powerValue").textContent=ue("power").value+"%"};ue("shoot").onclick=()=>du({type:"shot",angle:yn,power:Number(ue("power").value)/100,...Gt.options(de),spin:ar.value()});ue("again").onclick=()=>Ke==="training"?Cf():Ke==="solo"?Rf(!0):as?.move(null,!0);ue("modes").onclick=()=>{cs(),Ci("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u0443\u044E \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0438\u0433\u0440\u0443 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C.")};var pu=!1;function Pf(i){if(!zn||!Gn||de.turn!==St||de.moving||de.winner!==null)return;let e=Hn.point(i.clientX,i.clientY);if(!e)return;if(Gt.isPlacing(de)||de.breakPending&&i.shiftKey){i.type==="pointerdown"&&(du({type:"place",x:e.x,y:e.y}),Gt.placed());return}if(i.type==="pointerdown"&&Gt.chooseCue(de,e))return;let t=Gt.options(de).cueId,n=de.balls.find(r=>r.id===t&&!r.pocket);n&&(Math.hypot(e.x-n.x,e.y-n.y)<18||(yn=Math.atan2(n.y-e.y,n.x-e.x)))}ue("room").onpointerdown=i=>{pu=!0,ue("room").setPointerCapture(i.pointerId),Pf(i)};ue("room").onpointermove=i=>{pu&&Pf(i)};ue("room").onpointerup=ue("room").onpointercancel=()=>pu=!1;ue("closeRules").onclick=()=>ue("rules").close();ue("back").onclick=()=>{cs(),parent!==window?parent.postMessage({type:"p21-billiards-close"},location.origin):location.assign("./")};function Lf(i){let e=Math.min((i-os)/1e3,.1);if(os=i,Ke==="solo"||Ke==="training"){for(xn+=e;xn>=1/120&&de.moving;)wa(de),xn-=1/120;if(de.moving||(xn=0),Ke==="solo"&&de.turn===1&&!de.moving&&de.winner===null){if(sr||(sr=i+650),i>=sr){let a=_f(de);a&&Di(de,1,a),sr=0}}else sr=0}else if(bt&&Date.now()+ma>=bt.startedAt){for(xn+=e;xn>=1/120&&de.moving;)wa(de),xn-=1/120;Date.now()+ma>=bt.startedAt+bt.durationMs&&(de=ss,Tt=structuredClone(ga),bt=null)}Ke==="solo"&&cu(Tt,de.winner),Ke==="training"&&(St=de.turn);let t=Gn&&de.turn===St&&!de.moving&&de.winner===null,n=Ke==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(de.turn+1):de.turn===St?"\u0412\u0430\u0448 \u0445\u043E\u0434":Ke==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430";ue("status").textContent=Ke==="training"&&de.winner!==null?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(de.winner+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0430 \u043F\u0430\u0440\u0442\u0438\u044E":Ke!=="training"&&Tt.winner!==null&&de.winner!==null?Tt.winner===St?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 "+(Tt.target===3?"\u0441\u0435\u0440\u0438\u044E":"\u043F\u0430\u0440\u0442\u0438\u044E"):"\u041F\u043E\u0431\u0435\u0434\u0438\u043B "+(Ke==="solo"?"\u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0434\u0440\u0443\u0433"):de.moving?"\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438":de.winner!==null?de.winner===St?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 \u043F\u0430\u0440\u0442\u0438\u044E":Ke==="solo"?"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u0434\u0440\u0443\u0433":de.pending?(de.turn===St?"\u0412\u0430\u0448 \u0432\u044B\u0431\u043E\u0440":"\u0412\u044B\u0431\u043E\u0440 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430")+" \xB7 "+de.message:de.inHand?n+" \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438"+(de.handZone==="head"?" \u0438\u0437 \u0434\u043E\u043C\u0430":""):de.breakPending?de.turn===St?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":Ke==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":"\u0414\u0440\u0443\u0433 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":n,ue("hint").textContent=ml||(Gn?de.winner!==null?"\u041F\u0430\u0440\u0442\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430":de.moving?"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0448\u0430\u0440\u043E\u0432":de.turn!==St?Ke==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430":de.inHand?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u0431\u0438\u0442\u043A\u0430":zn?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043A\u0438\u0439 \u0437\u0430 \u0437\u0430\u0434\u043D\u044E\u044E \u0447\u0430\u0441\u0442\u044C \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043B\u0443":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041A \u0441\u0442\u043E\u043B\u0443\xBB, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0443\u0434\u0430\u0440":"");for(let a=0;a<2;a++){let o=de.groups[a];ue("p"+(a+1)).textContent=(Ke==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(a+1):a===St?"\u0412\u044B":Ke==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 "+(de.discipline==="pyramid"?"\u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":o===null?"\u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":o===0?"\u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435":"\u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435")+" \xB7 "+de.scores[a]+"/"+(de.discipline==="pyramid"?8:7),ue("p"+(a+1)).className=de.turn===a?"active":""}ue("seriesScore").hidden=Ke==="training"||!Gn,ue("seriesScore").textContent=Tt.target===3?"\u0414\u043E 3 \u043F\u043E\u0431\u0435\u0434 \xB7 \u0412\u044B "+Tt.wins[St]+" : "+Tt.wins[1-St]+" "+(Ke==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 \u043F\u0430\u0440\u0442\u0438\u044F "+Tt.round:"\u041E\u0434\u043D\u0430 \u043F\u0430\u0440\u0442\u0438\u044F",ue("trainingControls").hidden=Ke!=="training";let r=ls.inspect().available;ue("restoreShot").disabled=ue("repeatShot").disabled=!r,ue("again").hidden=Ke!=="training"&&(de.winner===null||St!==0),ue("again").textContent=Ke==="training"?"\u041D\u043E\u0432\u0430\u044F \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430":Tt.target===3?Tt.winner!==null?"\u041D\u043E\u0432\u0430\u044F \u0441\u0435\u0440\u0438\u044F \u0434\u043E 3 \u043F\u043E\u0431\u0435\u0434":"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F":"\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F",Ke==="training"?ue("hint").textContent=de.moving?"\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0439\u0442\u0435 \u0443\u0434\u0430\u0440 \u0438\u043B\u0438 \u0432\u0435\u0440\u043D\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u0443\u044E \u043F\u043E\u0437\u0438\u0446\u0438\u044E":"\u0411\u0435\u0437 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430: \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043E\u0431\u0435\u0438\u043C\u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u0430\u043C\u0438 \u0438 \u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u0434\u0430\u0440 \u0437\u0430\u043D\u043E\u0432\u043E":de.winner!==null&&Ke==="online"&&St!==0&&(ue("hint").textContent="\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u044C \u043A\u043E\u043C\u043D\u0430\u0442\u044B"),ar.render(de,t&&zn);let s=Gt.render(de,{player:St,mode:Ke,tableView:zn,can:t});zn&&Hn?.render(s,yn,t&&!de.inHand&&!de.pending),uu=requestAnimationFrame(Lf)}var Nf=new ResizeObserver(()=>{let i=ue("game").getBoundingClientRect().height;i&&(document.body.style.setProperty("--billiards-controls-height",Math.ceil(i)+"px"),zn&&Hn?.setView("table"))});Nf.observe(ue("game"));var wf=new URLSearchParams(location.search).get("room");/^[A-HJ-NP-Z2-9]{10}$/.test(wf||"")&&(ue("code").value=wf,va(!1));uu=requestAnimationFrame(Lf);window.PokerBilliards={inspect:()=>({mode:Ke,ready:Gn,tableView:zn,equipment:A0.inspect(),rules:Gt.inspect(),shotTools:ar.inspect(),training:ls.inspect(),series:structuredClone(Tt),angle:yn,state:structuredClone(de)})};window.addEventListener("pagehide",()=>{cancelAnimationFrame(uu),Nf.disconnect(),cs(),Hn?.dispose()});})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
