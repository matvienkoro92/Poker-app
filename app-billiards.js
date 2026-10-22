(()=>{var um=Object.create;var zu=Object.defineProperty;var dm=Object.getOwnPropertyDescriptor;var pm=Object.getOwnPropertyNames;var fm=Object.getPrototypeOf,mm=Object.prototype.hasOwnProperty;var Gu=(i,e)=>()=>{try{return e||i((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var gm=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of pm(e))!mm.call(i,r)&&r!==t&&zu(i,r,{get:()=>e[r],enumerable:!(n=dm(e,r))||n.enumerable});return i};var Hu=(i,e,t)=>(t=i!=null?um(fm(i)):{},gm(e||!i||!i.__esModule?zu(t,"default",{value:i,enumerable:!0}):t,i));var Ff=Gu((Bf,Rl)=>{(function(i,e){let t=e();typeof Rl=="object"&&Rl.exports?Rl.exports=t:i.PokerBilliardsCues=t})(typeof globalThis<"u"?globalThis:Bf,function(){"use strict";let i=Object.freeze([{id:"maple",name:"\u041F\u0435\u0440\u0432\u044B\u0439 \u0443\u0434\u0430\u0440",level:0,color:"#dec18d",grip:"#62452e",metal:"#b6a38a",art:"./assets/player-hall/billiards-cue-maple-v2.webp"},{id:"walnut",name:"\u041E\u0440\u0435\u0445\u043E\u0432\u044B\u0439 \u043A\u043B\u0443\u0431",level:10,color:"#633a23",grip:"#453024",metal:"#d5ae60",art:"./assets/player-hall/billiards-cue-walnut-v2.webp"},{id:"aces",name:"\u0414\u0432\u0430 \u0442\u0443\u0437\u0430",level:20,color:"#124e3c",grip:"#173c30",metal:"#e7bb61",art:"./assets/player-hall/billiards-cue-aces-v2.webp"},{id:"ocean",name:"\u041E\u043A\u0435\u0430\u043D",level:35,color:"#226b96",grip:"#203f56",metal:"#cad7df",art:"./assets/player-hall/billiards-cue-ocean-v2.webp"},{id:"carbon",name:"\u041A\u0430\u0440\u0431\u043E\u043D",level:50,color:"#242b30",grip:"#161d21",metal:"#d6dee3",art:"./assets/player-hall/billiards-cue-carbon-v2.webp"},{id:"ruby",name:"\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0439",level:65,color:"#6d1726",grip:"#3c1720",metal:"#edbf65",art:"./assets/player-hall/billiards-cue-ruby-v2.webp"},{id:"signature",name:"\u0418\u043C\u0435\u043D\u043D\u043E\u0439",level:80,color:"#eee0b2",grip:"#171b1a",metal:"#e5bf68",named:!0,art:"./assets/player-hall/billiards-cue-signature-v2.webp"},{id:"sovereign",name:"\u041F\u043E\u0432\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0441\u0442\u043E\u043B\u0430",level:100,color:"#122d27",grip:"#12201c",metal:"#f4cc71",art:"./assets/player-hall/billiards-cue-sovereign-v2.webp"}].map(Object.freeze));function e(n,r){return i.find(s=>s.id===n&&Number.isFinite(r)&&r>=s.level)||i[0]}function t(n,r,s){if(!n)return;let a=Array.from(n.children).find(l=>l.classList.contains("billiards-cue-preview"));if(a||(a=document.createElement("div"),a.className="billiards-cue-preview",n.prepend(a)),a.dataset.previewCue!==r.id||a.dataset.nick!==(s||"")){a.dataset.previewCue=r.id,a.dataset.nick=s||"",a.replaceChildren();let l=document.createElement("div");l.className="billiards-cue-preview__lean";let c=document.createElement("img");c.src=r.art,c.alt="\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u043A\u0438\u0439 \xAB"+r.name+"\xBB, \u043F\u0440\u0438\u0441\u043B\u043E\u043D\u0451\u043D\u043D\u044B\u0439 \u043A \u0441\u0442\u043E\u043B\u0443",c.draggable=!1,l.append(c);let h=document.createElement("img");if(h.src="./assets/player-hall/billiards-club-slippers-v1.png",h.alt="\u0422\u0430\u043F\u043E\u0447\u043A\u0438 \u043A\u043B\u0443\u0431\u0430 \xAB2 \u0442\u0443\u0437\u0430\xBB",h.style.cssText="position:absolute;left:22%;top:84%;width:20%;height:10%;object-fit:fill;pointer-events:none",a.append(h),r.named&&s){let u=document.createElement("small");u.className="billiards-cue-preview__name",u.textContent=s,l.append(u)}a.append(l)}function o(){if(!n.isConnected){n._billiardsCueObserver?.disconnect(),delete n._billiardsCueObserver;return}let l=Array.from(n.children).find(h=>h.classList.contains("billiards-cue-preview"));if(!l)return;let c=Math.max(n.clientWidth/1122,n.clientHeight/1402);l.style.width=1122*c+"px",l.style.height=1402*c+"px"}o(),!n._billiardsCueObserver&&typeof ResizeObserver<"u"&&(n._billiardsCueObserver=new ResizeObserver(o),n._billiardsCueObserver.observe(n))}return{cues:i,available:e,paintPreview:t}})});var Gf=Gu((zf,Pl)=>{(function(i,e){let t=e();typeof Pl=="object"&&Pl.exports?Pl.exports=t:i.PokerBilliardsTables=t})(typeof globalThis<"u"?globalThis:zf,function(){"use strict";let i=Object.freeze([{id:"classic",name:"\u041F\u0435\u0440\u0432\u044B\u0439 \u0441\u0442\u043E\u043B",level:0,felt:"#42835a",wood:"#c9ad80",metal:"#987d55",body:"#8b6d47",description:"\u041C\u0430\u0442\u043E\u0432\u044B\u0439 \u0434\u0443\u0431 \xB7 \u0437\u0435\u043B\u0451\u043D\u043E\u0435 \u0441\u0443\u043A\u043D\u043E",ornament:0,image:"./assets/player-hall/billiards-table-classic-v2.webp"},{id:"oak",name:"\u0422\u0451\u043F\u043B\u044B\u0439 \u0434\u0443\u0431",level:5,felt:"#528a57",wood:"#d9af72",metal:"#77786d",body:"#9b7549",description:"\u041C\u0435\u0434\u043E\u0432\u044B\u0439 \u0434\u0443\u0431 \xB7 \u043A\u043E\u0436\u0430\u043D\u044B\u0435 \u043B\u0443\u0437\u044B",ornament:0,image:"./assets/player-hall/billiards-table-oak-v2.webp"},{id:"walnut",name:"\u041E\u0440\u0435\u0445\u043E\u0432\u044B\u0439 \u043A\u043B\u0443\u0431",level:10,felt:"#367650",wood:"#b28b65",metal:"#a3aaa7",body:"#593a25",description:"\u041E\u0440\u0435\u0445 \xB7 \u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0435\u0442\u0430\u043B\u0438",ornament:0,image:"./assets/player-hall/billiards-table-walnut-v2.webp"},{id:"sport",name:"\u0421\u043F\u043E\u0440\u0442",level:15,felt:"#258f89",wood:"#4c5b60",metal:"#c4cdcb",body:"#283134",description:"\u0411\u0438\u0440\u044E\u0437\u043E\u0432\u043E\u0435 \u0441\u0443\u043A\u043D\u043E \xB7 \u0433\u0440\u0430\u0444\u0438\u0442",ornament:0,image:"./assets/player-hall/billiards-table-sport-v2.webp"},{id:"midnight",name:"\u041F\u043E\u043B\u043D\u043E\u0447\u044C",level:20,felt:"#236773",wood:"#655248",metal:"#b9c9cd",body:"#242d32",description:"\u0422\u0451\u043C\u043D\u044B\u0439 \u043E\u0440\u0435\u0445 \xB7 \u043D\u0438\u043A\u0435\u043B\u044C \xB7 \u043F\u0435\u0440\u043B\u0430\u043C\u0443\u0442\u0440",ornament:1,image:"./assets/player-hall/billiards-table-midnight-v2.webp"},{id:"ocean",name:"\u0421\u0430\u043F\u0444\u0438\u0440\u043E\u0432\u044B\u0439 \u043E\u043A\u0435\u0430\u043D",level:25,felt:"#3275c9",wood:"#243c65",metal:"#d1e0e8",body:"#122237",description:"\u0421\u0438\u043D\u0435\u0435 \u0441\u0443\u043A\u043D\u043E \xB7 \u0442\u0451\u043C\u043D\u044B\u0439 \u043B\u0430\u043A \xB7 \u043F\u043B\u0430\u0442\u0438\u043D\u0430",ornament:1,image:"./assets/player-hall/billiards-table-ocean-v1.webp"},{id:"silver",name:"\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u0430\u044F \u043B\u0438\u0433\u0430",level:30,felt:"#458eb5",wood:"#a8b3b5",metal:"#e2e8e8",body:"#7d898d",description:"\u0421\u0435\u0440\u044B\u0439 \u044F\u0441\u0435\u043D\u044C \xB7 \u0441\u0430\u0442\u0438\u043D\u043E\u0432\u044B\u0439 \u0445\u0440\u043E\u043C",ornament:1,image:"./assets/player-hall/billiards-table-silver-v2.webp"},{id:"carbon",name:"\u041A\u0430\u0440\u0431\u043E\u043D",level:35,felt:"#267b82",wood:"#29383b",metal:"#a0b1bb",body:"#17272c",description:"\u041A\u0430\u0440\u0431\u043E\u043D \xB7 \u0442\u0438\u0442\u0430\u043D \xB7 \u0441\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439 \u043A\u0430\u043D\u0442",ornament:1,image:"./assets/player-hall/billiards-table-carbon-v2.webp"},{id:"bronze",name:"\u0411\u0440\u043E\u043D\u0437\u043E\u0432\u0430\u044F \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F",level:40,felt:"#26815b",wood:"#84563c",metal:"#c48c55",body:"#4c3020",description:"\u0414\u044B\u043C\u0447\u0430\u0442\u044B\u0439 \u043E\u0440\u0435\u0445 \xB7 \u0431\u0440\u043E\u043D\u0437\u0430",ornament:2,image:"./assets/player-hall/billiards-table-bronze-v2.webp"},{id:"obsidian",name:"\u041E\u0431\u0441\u0438\u0434\u0438\u0430\u043D",level:45,felt:"#73487f",wood:"#24252e",metal:"#ccd4de",body:"#13171c",description:"\u0420\u043E\u044F\u043B\u044C\u043D\u044B\u0439 \u043B\u0430\u043A \xB7 \u0441\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u0430\u044F \u0438\u043D\u043A\u0440\u0443\u0441\u0442\u0430\u0446\u0438\u044F",ornament:2,image:"./assets/player-hall/billiards-table-obsidian-v2.webp"},{id:"ruby",name:"\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0439 \u043A\u043B\u0443\u0431",level:50,felt:"#a13451",wood:"#45222c",metal:"#e8bb61",body:"#25131a",description:"\u0411\u043E\u0440\u0434\u043E\u0432\u043E\u0435 \u0441\u0443\u043A\u043D\u043E \xB7 \u043C\u0430\u0445\u0430\u0433\u043E\u043D \xB7 \u0437\u043E\u043B\u043E\u0442\u043E",ornament:2,image:"./assets/player-hall/billiards-table-ruby-v1.webp"},{id:"sapphire",name:"\u0421\u0430\u043F\u0444\u0438\u0440\u043E\u0432\u044B\u0439 \u043F\u0440\u0435\u0441\u0442\u0438\u0436",level:55,felt:"#285ac2",wood:"#1b243b",metal:"#e2e6ed",body:"#13192c",description:"\u0421\u0430\u043F\u0444\u0438\u0440 \xB7 \u043F\u043B\u0430\u0442\u0438\u043D\u0430 \xB7 \u0434\u0432\u043E\u0439\u043D\u043E\u0439 \u043A\u0430\u043D\u0442",ornament:3,image:"./assets/player-hall/billiards-table-sapphire-v2.webp"},{id:"emerald",name:"\u0418\u0437\u0443\u043C\u0440\u0443\u0434\u043D\u044B\u0439 \u043F\u0440\u0435\u0441\u0442\u0438\u0436",level:60,felt:"#278d62",wood:"#254d37",metal:"#f0c76d",body:"#132d20",description:"\u0417\u0435\u043B\u0451\u043D\u044B\u0439 \u043B\u0430\u043A \xB7 \u0437\u043E\u043B\u043E\u0442\u0430\u044F \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F",ornament:3,image:"./assets/player-hall/billiards-table-emerald-v2.webp"},{id:"ivory",name:"\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C",level:65,felt:"#398b93",wood:"#f1e2bc",metal:"#edc478",body:"#c8b78d",description:"\u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u043B\u0430\u043A \xB7 \u0437\u043E\u043B\u043E\u0442\u0430\u044F \u043E\u043A\u0430\u043D\u0442\u043E\u0432\u043A\u0430",ornament:3,image:"./assets/player-hall/billiards-table-ivory-v2.webp"},{id:"imperialRuby",name:"\u0418\u043C\u043F\u0435\u0440\u0441\u043A\u0438\u0439 \u0440\u0443\u0431\u0438\u043D",level:70,felt:"#a02b4d",wood:"#6a2638",metal:"#f4c76d",body:"#371722",description:"\u0412\u0438\u043D\u043D\u044B\u0439 \u043B\u0430\u043A \xB7 \u0437\u043E\u043B\u043E\u0442\u0430\u044F \u043C\u0430\u0440\u043A\u0435\u0442\u0440\u0438",ornament:4,image:"./assets/player-hall/billiards-table-imperialRuby-v2.webp"},{id:"platinum",name:"\u041F\u043B\u0430\u0442\u0438\u043D\u043E\u0432\u044B\u0439 \u043C\u0430\u0441\u0442\u0435\u0440",level:75,felt:"#316fb7",wood:"#b6c2cc",metal:"#e8f0f4",body:"#728392",description:"\u041F\u0435\u0440\u043B\u0430\u043C\u0443\u0442\u0440 \xB7 \u043A\u0430\u0440\u0431\u043E\u043D \xB7 \u043F\u043B\u0430\u0442\u0438\u043D\u0430",ornament:4,image:"./assets/player-hall/billiards-table-platinum-v2.webp"},{id:"royal",name:"\u0414\u0432\u0430 \u0442\u0443\u0437\u0430 \xB7 \u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440",level:80,felt:"#369773",wood:"#1c2420",metal:"#ffce6b",body:"#0b1712",description:"\u0418\u0437\u0443\u043C\u0440\u0443\u0434 \xB7 \u0440\u043E\u044F\u043B\u044C\u043D\u044B\u0439 \u043B\u0430\u043A \xB7 \u0437\u043E\u043B\u043E\u0442\u043E",ornament:4,image:"./assets/player-hall/billiards-table-royal-v1.webp"},{id:"crown",name:"\u041A\u043E\u0440\u043E\u043D\u0430",level:85,felt:"#784b9b",wood:"#ded5bc",metal:"#ffcf72",body:"#171820",description:"\u041A\u043E\u0440\u043E\u043B\u0435\u0432\u0441\u043A\u0438\u0439 \u0444\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439 \xB7 \u0437\u043E\u043B\u043E\u0442\u043E\u0435 \u0430\u0440-\u0434\u0435\u043A\u043E",ornament:5,image:"./assets/player-hall/billiards-table-crown-v2.webp"},{id:"celestial",name:"\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439 \u043C\u0430\u0441\u0442\u0435\u0440",level:90,felt:"#244d88",wood:"#263654",metal:"#e5edff",body:"#101c34",description:"\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439 \xB7 \u043F\u043B\u0430\u0442\u0438\u043D\u0430 \xB7 \u0441\u0430\u043F\u0444\u0438\u0440\u044B",ornament:5,image:"./assets/player-hall/billiards-table-celestial-v2.webp"},{id:"sovereign",name:"\u0421\u0443\u0432\u0435\u0440\u0435\u043D",level:95,felt:"#267954",wood:"#ebddba",metal:"#ffd16e",body:"#151f18",description:"\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C \xB7 \u0437\u043E\u043B\u043E\u0442\u0430\u044F \u0444\u0438\u043B\u0438\u0433\u0440\u0430\u043D\u044C",ornament:6,image:"./assets/player-hall/billiards-table-sovereign-v2.webp"},{id:"legend",name:"\u0414\u0432\u0430 \u0442\u0443\u0437\u0430 \xB7 \u041B\u0435\u0433\u0435\u043D\u0434\u0430",level:100,felt:"#21805b",wood:"#171d1a",metal:"#ffdb83",body:"#eadbbc",description:"\u0427\u0451\u0440\u043D\u044B\u0439 \u043B\u0430\u043A \xB7 \u0437\u043E\u043B\u043E\u0442\u043E \xB7 \u0434\u0440\u0430\u0433\u043E\u0446\u0435\u043D\u043D\u044B\u0435 \u0430\u043A\u0446\u0435\u043D\u0442\u044B",ornament:7,image:"./assets/player-hall/billiards-table-legend-v2.webp"}].map(Object.freeze));function e(t,n){return i.find(r=>r.id===t&&Number.isFinite(n)&&n>=r.level)||i[0]}return Object.freeze({skins:i,available:e})})});var Vu=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],Ps=Number.isFinite,Cr=i=>i===8?null:i<8?0:1;function kl(i,e,t){return!i.inHand||i.moving||i.winner!==null||!Ps(e)||!Ps(t)||e<15||e>985||t<15||t>485||i.balls.some(n=>n.id&&!n.pocket&&Math.hypot(n.x-e,n.y-t)<21)||Vu.some(n=>Math.hypot(n[0]-e,n[1]-t)<28)?!1:(Object.assign(i.balls[0],{x:e,y:t,vx:0,vy:0,pocket:!1}),i.inHand=!1,i.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function zl(i,e,t){if(i.moving||i.inHand||i.winner!==null||!Ps(e)||!Ps(t)||t<.05||t>1)return!1;Object.assign(i.balls[0],{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),i.moving=!0,i.firstHit=null,i.sunk=[],i.scratch=!1;let n=i.groups[i.turn];return i.eightReady=n!==null&&!i.balls.some(r=>r.id&&r.id!==8&&!r.pocket&&Cr(r.id)===n),i.legalFirst=i.eightReady?[8]:i.balls.filter(r=>r.id&&r.id!==8&&!r.pocket&&(n===null||Cr(r.id)===n)).map(r=>r.id),i.shot++,i.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0}function vm(i){i.moving=!1;let e=i.turn,t=i.groups[e],n=i.balls.some(a=>!a.pocket&&a.id&&a.id!==8&&Cr(a.id)===t),r=i.scratch||i.firstHit===null||!i.legalFirst.includes(i.firstHit);if(i.sunk.includes(8)){i.winner=!r&&i.eightReady?e:1-e,i.message="\u0418\u0433\u0440\u043E\u043A "+(i.winner+1)+" \u043F\u043E\u0431\u0435\u0434\u0438\u043B"+(i.winner!==e?" \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0437\u0430\u0431\u0438\u0442\u0430 \u0440\u0430\u043D\u044C\u0448\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0438\u043B\u0438 \u0441 \u0444\u043E\u043B\u043E\u043C":"");return}!r&&t===null&&i.sunk.some(a=>a!==8)&&(i.groups[e]=Cr(i.sunk.find(a=>a!==8)),i.groups[1-e]=1-i.groups[e]),i.scores=[0,1].map(a=>i.balls.filter(o=>o.id&&o.id!==8&&o.pocket&&Cr(o.id)===i.groups[a]).length);let s=!r&&i.sunk.some(a=>Cr(a)===i.groups[e]);s||(i.turn=1-e),r?(i.inHand=!0,i.balls[0].pocket=!0,i.message="\u0424\u043E\u043B \xB7 \u0438\u0433\u0440\u043E\u043A "+(i.turn+1)+" \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0431\u0438\u0442\u043E\u043A"):i.message="\u0425\u043E\u0434 \u0438\u0433\u0440\u043E\u043A\u0430 "+(i.turn+1)+(s?" \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":"")}function Wu(i,e=1/120){if(i.moving){e=Math.min(Math.max(e,0),1/120);for(let t of i.balls){if(t.pocket)continue;t.x+=t.vx*e,t.y+=t.vy*e;let n=Math.hypot(t.vx,t.vy),r=Math.max(0,n-135*e);if(n&&(t.vx*=r/n,t.vy*=r/n),Vu.some(([s,a])=>Math.hypot(t.x-s,t.y-a)<24)){t.pocket=!0,t.vx=t.vy=0,t.id===0?i.scratch=!0:i.sunk.push(t.id);continue}t.x<10&&(t.x=10,t.vx=Math.abs(t.vx)*.84),t.x>990&&(t.x=990,t.vx=-Math.abs(t.vx)*.84),t.y<10&&(t.y=10,t.vy=Math.abs(t.vy)*.84),t.y>490&&(t.y=490,t.vy=-Math.abs(t.vy)*.84)}for(let t=0;t<i.balls.length;t++)for(let n=t+1;n<i.balls.length;n++){let r=i.balls[t],s=i.balls[n];if(r.pocket||s.pocket)continue;let a=s.x-r.x,o=s.y-r.y,l=Math.hypot(a,o);if(l>=20)continue;l=Math.max(l,.001);let c=a/l,h=o/l,u=(20-l)/2+.001;r.x-=c*u,r.y-=h*u,s.x+=c*u,s.y+=h*u;let p=(r.vx-s.vx)*c+(r.vy-s.vy)*h;if(p>0){r.id===0&&i.firstHit===null&&(i.firstHit=s.id),s.id===0&&i.firstHit===null&&(i.firstHit=r.id);let d=p*.98;r.vx-=d*c,r.vy-=d*h,s.vx+=d*c,s.vy+=d*h}}i.balls.every(t=>t.pocket||Math.hypot(t.vx,t.vy)<1)&&(i.balls.forEach(t=>t.vx=t.vy=0),vm(i))}}function Xu(i,e,t){return e!==i.turn||!t||typeof t!="object"?!1:t.type==="shot"?zl(i,t.angle,t.power):t.type==="place"?kl(i,t.x,t.y):!1}function ju(i){return!!i&&[0,1].includes(i.turn)&&Array.isArray(i.balls)&&i.balls.length===16&&new Set(i.balls.map(e=>e.id)).size===16&&i.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(Ps)&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3)&&Array.isArray(i.groups)&&i.groups.length===2&&i.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(i.scores)&&i.scores.length===2&&i.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=7)&&(i.winner===null||i.winner===0||i.winner===1)&&typeof i.message=="string"&&i.message.length<250}var qu=Object.freeze({pool8:Object.freeze({name:"\u041F\u0443\u043B \xB7 9 \u0444\u0443\u0442\u043E\u0432",length:2540,ball:57.15,corner:114.3,side:127,cornerShelf:38.1,sideShelf:6.35,cornerFlare:7,sideFlare:14,restitution:.86}),pyramid:Object.freeze({name:"\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430 \xB7 12 \u0444\u0443\u0442\u043E\u0432",length:3560,ball:68,corner:72.5,side:82.5,cornerShelf:5.5,sideShelf:0,cornerFlare:0,sideFlare:0,restitution:.84})}),ji=i=>qu[typeof i=="string"?i:i.discipline]||qu.pool8,Gl=new Map;function Ir(i){let e=ji(i),t=e.name;if(Gl.has(t))return Gl.get(t);let n=1e3/e.length,r=e.ball/2*n,s=e.corner*n,a=e.side*n,o=s/Math.SQRT2,l=a/2,c=[[[o,0],[500-l,0],2],[[500+l,0],[1e3-o,0],2],[[o,500],[500-l,500],3],[[500+l,500],[1e3-o,500],3],[[0,o],[0,500-o],0],[[1e3,o],[1e3,500-o],1]].map(([d,f,v])=>({a:d,b:f,side:v,jaw:!1})),h=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],u=h.map(([d,f],v)=>{let m=v%3===1,g=m?[0,f===0?1:-1]:[d===0?Math.SQRT1_2:-Math.SQRT1_2,f===0?Math.SQRT1_2:-Math.SQRT1_2],_=[-g[1],g[0]],y=m?a:s,M=m?[d,f]:[d+g[0]*o/Math.SQRT2,f+g[1]*o/Math.SQRT2],E=(m?e.sideShelf:e.cornerShelf)*n,R=E+r*1.4,b=Math.tan((m?e.sideFlare:e.cornerFlare)*Math.PI/180),I=[-1,1].map(B=>M.map((F,N)=>F+_[N]*y/2*B));for(let[B,F]of I.entries()){let N=B===0?-1:1,K=F.map((H,Z)=>H-g[Z]*R-_[Z]*N*b*R);c.push({a:F,b:K,side:m?f===0?2:3:Math.abs(F[0]-d)<.01?d===0?0:1:f===0?2:3,jaw:!0})}let P=I.map((B,F)=>B.map((N,K)=>N-g[K]*E+_[K]*(F===0?-1:1)*b*E));return{index:v,center:M,n:g,t:_,mouth:y,shelf:E,ends:I,lip:P,drop:M.map((B,F)=>B-g[F]*(E+r*.7))}}),p={spec:e,scale:n,r,rails:c,pockets:u};return Gl.set(t,p),p}function Yu(i,e){for(let t of e.pockets){let n=i.x-t.center[0],r=i.y-t.center[1],s=n*t.n[0]+r*t.n[1],a=n*t.t[0]+r*t.t[1];if(s<-t.shelf-1e-6&&Math.abs(a)<t.mouth/2-e.r*.99)return t.index}return-1}function Zu(i,e){let t=e.b[0]-e.a[0],n=e.b[1]-e.a[1],r=t*t+n*n,s=Math.max(0,Math.min(1,((i.x-e.a[0])*t+(i.y-e.a[1])*n)/r));return{x:e.a[0]+t*s,y:e.a[1]+n*s}}var Ku=(i,e)=>Math.max(-e,Math.min(e,i));function Ju(i){return i===void 0||!!i&&typeof i=="object"&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&Math.hypot(i.x,i.y)<=1.000001}function $u(i,e,t,n={x:0,y:0}){let r=1.625*n.y*t;i.rollX=Math.cos(e)*r,i.rollY=Math.sin(e)*r,i.side=-1.625*n.x*t}function Qu(i,e,t){let n=981e4/ji(t).length,r=i.vx-(i.rollX||0),s=i.vy-(i.rollY||0),a=Math.hypot(r,s);if(a>.05){let o=Math.min(.2*n*e,a/3.5),l=r/a*o,c=s/a*o;i.vx-=l,i.vy-=c,i.rollX=(i.rollX||0)+2.5*l,i.rollY=(i.rollY||0)+2.5*c}else{let o=Math.hypot(i.vx,i.vy),l=Math.max(0,o-.018*n*e);o&&(i.vx*=l/o,i.vy*=l/o),i.rollX=i.vx,i.rollY=i.vy}i.side=Math.sign(i.side||0)*Math.max(0,Math.abs(i.side||0)-.018*n*e)}function ed(i,e,t,n){let r=i.vx*e+i.vy*t;if(r>=0)return!1;let s=-(1+n)*r,a=-t,o=e,l=i.vx*a+i.vy*o-(i.side||0),c=Ku(-l/3.5,.14*s);return i.vx+=s*e+c*a,i.vy+=s*t+c*o,i.side=(i.side||0)-2.5*c,!0}function td(i,e,t,n,r){let s=-n,a=t,o=(i.vx-e.vx)*s+(i.vy-e.vy)*a+(i.side||0)+(e.side||0),l=Ku(o/7,.04*r);i.vx-=l*s,i.vy-=l*a,e.vx+=l*s,e.vy+=l*a,i.side=(i.side||0)-2.5*l,e.side=(e.side||0)-2.5*l}function ka(i){i.rollX=i.rollY=i.side=0}function nd(i){return Math.hypot(i.vx-(i.rollX||0),i.vy-(i.rollY||0))>1}var wi=1e3,Ei=500,Hl=10,Vl=[[0,0],[500,0],[1e3,0],[0,500],[500,500],[1e3,500]],rd=["pool8","pyramid"],Ls=i=>i===8||i===0?null:i<8?0:1,Vt=i=>Ir(i).r,ym=i=>i.balls.find(e=>e.id===(i.cueId??0));function Ds(i={}){let e=i.discipline||"pool8";if(!rd.includes(e))throw Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0430");let t=e==="pyramid"&&i.color==="red"?"red":e==="pyramid"?"yellow":"standard",n=Vt({discipline:e}),r=(Number(i.seed)||1)>>>0,s=()=>(r=r*1664525+1013904223>>>0,r/4294967296),a=Array.from({length:15},(c,h)=>h+1);for(let c=14;c>0;c--){let h=Math.floor(s()*(c+1));[a[c],a[h]]=[a[h],a[c]]}if(e==="pool8"){let c=a.indexOf(8);[a[4],a[c]]=[8,a[4]];let h=a.find(p=>p<8),u=a.find(p=>p>8);for(let[p,d]of[[h,10],[u,14]]){let f=a.indexOf(p);[a[d],a[f]]=[p,a[d]]}}let o=[{id:0,x:230,y:250,vx:0,vy:0,pocket:!1}],l=0;for(let c=0;c<5;c++)for(let h=0;h<=c;h++)o.push({id:a[l++],x:750+c*(2*n+.05)*Math.sqrt(3)/2,y:250+(h-c/2)*(2*n+.05),vx:0,vy:0,pocket:!1});return{rulesVersion:2,discipline:e,color:t,seed:Number(i.seed)||1,balls:o,turn:i.breaker===1?1:0,breaker:i.breaker===1?1:0,cueId:0,groups:[null,null],scores:[0,0],captured:[[],[]],moving:!1,inHand:!1,handZone:null,winner:null,shot:0,breakPending:!0,message:"\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430 \xB7 \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A",firstHit:null,sunk:[],scratch:!1,pending:null}}function sd(i){return!i.moving&&i.winner===null&&!i.pending}function Ga(i,e,t){if(!i.rulesVersion)return kl(i,e,t);let n=Vt(i),r=ym(i);return!sd(i)||!i.inHand&&!i.breakPending||!r||![e,t].every(Number.isFinite)||e<n||e>wi-n||t<n||t>Ei-n||(i.handZone==="head"||i.breakPending)&&e>=250||i.balls.some(s=>s.id!==r.id&&!s.pocket&&Math.hypot(s.x-e,s.y-t)<n*2+.05)||Vl.some(s=>Math.hypot(s[0]-e,s[1]-t)<25)?!1:(Object.assign(r,{x:e,y:t,vx:0,vy:0,pocket:!1}),i.nextHeadShot=i.handZone==="head",i.inHand=!1,i.handZone=null,ka(r),i.message="\u0411\u0438\u0442\u043E\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \xB7 \u043C\u043E\u0436\u043D\u043E \u0431\u0438\u0442\u044C",!0)}function xm(i,e){let t=[];return i.x<=e+.2&&t.push(0),i.x>=wi-e-.2&&t.push(1),i.y<=e+.2&&t.push(2),i.y>=Ei-e-.2&&t.push(3),t}function qi(i){if(i.discipline==="pyramid")return i.balls.filter(n=>!n.pocket&&n.id!==(i.cueId??0));let e=i.groups[i.turn],t=i.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||Ls(n.id)===e));return e===null&&[0,1].some(n=>!i.balls.some(r=>!r.pocket&&Ls(r.id)===n))?[...t,...i.balls.filter(n=>n.id===8&&!n.pocket)]:t.length?t:i.balls.filter(n=>n.id===8&&!n.pocket)}function Wl(i,e,t,n={}){if(!i.rulesVersion)return zl(i,e,t);if(!Ju(n.spin)||!sd(i)||i.inHand||![e,t].every(Number.isFinite)||t<.05||t>1)return!1;let r=i.discipline==="pyramid"&&!i.breakPending?n.cueId??i.cueId:0,s=i.balls.find(c=>c.id===r&&!c.pocket);if(!s||i.breakPending&&s.x>=250)return!1;i.cueId=r;let a=qi(i).map(c=>c.id),o=i.breakPending,l=n.safety===!0;return i.discipline==="pool8"&&!o&&!l&&(!a.includes(n.callBall)||!Number.isInteger(n.callPocket)||n.callPocket<0||n.callPocket>5)?!1:(i.headShot=!!i.nextHeadShot||o,i.nextHeadShot=!1,i.headExited=s.x>=250,i.illegalHead=!1,i.lastShooter=i.turn,i.call=o?null:{ball:n.callBall,pocket:n.callPocket,safety:l},i.legalFirst=o?i.balls.filter(c=>c.id).map(c=>c.id):a,i.eightReady=i.discipline==="pool8"&&a.includes(8),Object.assign(s,{vx:Math.cos(e)*(180+t*1250),vy:Math.sin(e)*(180+t*1250)}),i.spin=n.spin?{x:n.spin.x,y:n.spin.y}:{x:0,y:0},$u(s,e,180+t*1250,i.spin),i.contacts={balls:0,rails:0,jaws:0},i.moving=!0,i.firstHit=null,i.sunk=[],i.pots=[],i.scratch=!1,i.railAfter=!1,i.breakRails=[],i.breakCross=[],i.tracks=Object.fromEntries(i.balls.map(c=>[c.id,{rails:[],cross:!1,frozen:xm(c,Vt(i))}])),i.pyramidLegal=!1,i.wasBreak=o,i.breakPending=!1,i.shot++,i.message="\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",!0)}function ad(i,e){let t=i.balls.find(r=>r.id===e),n=Vt(i);if(t){for(let r of[1,-1])for(let s=750;r>0?s<wi-n:s>n;s+=r*(2*n+.1))if(!i.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-s,a.y-250)<2*n+.05)){Object.assign(t,{x:s,y:250,vx:0,vy:0,pocket:!1});return}for(let r=n+1;r<wi-n;r+=2*n+1)for(let s=n+1;s<Ei-n;s+=2*n+1)if(!i.balls.some(a=>a.id!==e&&!a.pocket&&Math.hypot(a.x-r,a.y-s)<2*n+.05)){Object.assign(t,{x:r,y:s,vx:0,vy:0,pocket:!1});return}}}function za(i){i.captured=i.groups.map(e=>e===null?[]:i.balls.filter(t=>t.pocket&&Ls(t.id)===e).map(t=>t.id).sort((t,n)=>t-n)),i.scores=i.captured.map(e=>e.length)}function Xl(i,e){i.winner=e,i.message="\u0418\u0433\u0440\u043E\u043A "+(e+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B \u043F\u0430\u0440\u0442\u0438\u044E"}function Mm(i){let e=i.turn,t=i.wasBreak,n=i.scratch||i.illegalHead||i.firstHit===null||!i.legalFirst.includes(i.firstHit)||!t&&!i.sunk.length&&!i.railAfter,r=i.sunk.includes(8);if(t){r&&ad(i,8);let o=!i.sunk.length&&i.breakRails.length<4;if(n||o||r){let l=n||o?1-e:e;i.turn=l,i.pending={type:"pool-break",offender:e,foul:n,illegal:o,eight:r},i.message=n?"\u0424\u043E\u043B \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":o?"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":"\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \xB7 \u0432\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",za(i);return}i.turn=i.sunk.length?e:1-e,i.message=i.sunk.length?"\u0420\u0430\u0437\u0431\u043E\u0439 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \xB7 \u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430",za(i);return}let s=i.call&&!i.call.safety&&(i.pots||[]).some(o=>o.id===i.call.ball&&o.pocket===i.call.pocket);if(r){if(i.groups[e]===null&&i.eightReady&&!n&&s){let o=[0,1].find(l=>!i.balls.some(c=>!c.pocket&&Ls(c.id)===l));i.groups[e]=o,i.groups[1-e]=1-o}za(i),Xl(i,!n&&i.eightReady&&s?e:1-e);return}!n&&s&&i.groups[e]===null&&(i.groups[e]=Ls(i.call.ball),i.groups[1-e]=1-i.groups[e]),za(i);let a=!n&&s;a||(i.turn=1-e),n?(i.inHand=!0,i.handZone="any",i.cueId=0,i.balls.find(o=>o.id===0).pocket=!0,i.message="\u0424\u043E\u043B \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435"):i.message=a?"\u0428\u0430\u0440 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D \xB7 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0438\u044E":i.call?.safety?"\u041E\u0442\u044B\u0433\u0440\u044B\u0448 \xB7 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"}function bm(i){let e=i.turn,t=i.wasBreak,n=i.sunk.length>0||i.breakRails.length>=3||i.breakRails.length>=2&&i.breakCross.length>0;if(i.firstHit===null||t&&!n||!t&&!i.sunk.length&&!i.pyramidLegal){for(let s of i.sunk)ad(i,s);i.turn=1-e,i.pending={type:"pyramid-foul",offender:e,illegalBreak:t&&!n},i.message="\u0428\u0442\u0440\u0430\u0444 \xB7 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443";return}for(let s of i.sunk)i.captured[e].includes(s)||i.captured[e].push(s);if(i.scores=i.captured.map(s=>s.length),i.scores[e]>=8){Xl(i,e);return}i.sunk.length||(i.turn=1-e),i.cueId=i.balls.find(s=>!s.pocket)?.id??0,i.message=i.sunk.length?"\u0428\u0430\u0440\u044B \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D\u044B \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A":"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430 \xB7 \u0431\u0438\u0442\u043E\u043A \u2014 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440"}function Sm(i){i.moving=!1;for(let e of i.balls)ka(e);i.lastShot={player:i.lastShooter,potted:[...i.sunk],contacts:{...i.contacts},spin:{...i.spin}},i.discipline==="pyramid"?bm(i):Mm(i),delete i.tracks}function Tm(i,e,t){if(i.firstHit===null)return;i.railAfter=!0,e.id!==i.cueId&&!i.breakRails.includes(e.id)&&i.breakRails.push(e.id);let n=i.tracks[e.id];(n.cross||n.rails.some(r=>r!==t))&&(i.pyramidLegal=!0),n.rails.includes(t)||n.rails.push(t)}function wm(i,e){if(i.firstHit===null)return;let t=i.tracks[e.id];t.rails.length&&(i.pyramidLegal=!0),t.cross=!0,e.id!==i.cueId&&!i.breakCross.includes(e.id)&&i.breakCross.push(e.id)}function Em(i,e,t){if(i.firstHit===null&&(e.id===i.cueId?(i.firstHit=t.id,i.headShot&&!i.headExited&&t.x<250&&(i.illegalHead=!0)):t.id===i.cueId&&(i.firstHit=e.id,i.headShot&&!i.headExited&&e.x<250&&(i.illegalHead=!0))),i.firstHit===null)return;let n=i.tracks[e.id],r=i.tracks[t.id];for(let[o,l]of[[n,r],[r,n]])l.frozen.some(c=>o.cross||o.rails.some(h=>h!==c))&&(i.pyramidLegal=!0);let s=[...new Set([...n.rails,...r.rails])],a=n.cross||r.cross;n.rails=[...s],r.rails=[...s],n.cross=r.cross=a}function Ha(i,e=1/120){if(!i.rulesVersion)return Wu(i,e);if(!i.moving)return;e=Math.min(Math.max(e,0),1/120);let t=Ir(i),n=t.r,r=Math.max(...i.balls.map(o=>Math.hypot(o.vx,o.vy))),s=Math.max(1,Math.min(12,Math.ceil(r*e/(n*.3)))),a=e/s;for(let o=0;o<s;o++){for(let l of i.balls){if(l.pocket)continue;let c=l.x;l.x+=l.vx*a,l.y+=l.vy*a,l.id===i.cueId&&l.x>=250&&(i.headExited=!0),(c-500)*(l.x-500)<0&&wm(i,l),Qu(l,a,i);for(let u of t.rails){let p=Zu(l,u),d=l.x-p.x,f=l.y-p.y,v=Math.hypot(d,f);if(v>=n||v<1e-5)continue;let m=d/v,g=f/v;l.x=p.x+m*(n+1e-4),l.y=p.y+g*(n+1e-4),ed(l,m,g,t.spec.restitution)&&(Tm(i,l,u.side),i.contacts&&i.contacts[u.jaw||Math.hypot(p.x-u.a[0],p.y-u.a[1])<.001||Math.hypot(p.x-u.b[0],p.y-u.b[1])<.001?"jaws":"rails"]++)}let h=Yu(l,t);h>=0&&(l.pocket=!0,l.vx=l.vy=0,ka(l),i.pots.push({id:l.id,pocket:h}),l.id===i.cueId&&(i.scratch=!0),(i.discipline==="pyramid"||l.id!==0)&&i.sunk.push(l.id))}for(let l=0;l<i.balls.length;l++)for(let c=l+1;c<i.balls.length;c++){let h=i.balls[l],u=i.balls[c];if(h.pocket||u.pocket)continue;let p=u.x-h.x,d=u.y-h.y,f=Math.hypot(p,d);if(f>=n*2)continue;f=Math.max(f,.001);let v=p/f,m=d/f,g=(n*2-f)/2+.001;h.x-=v*g,h.y-=m*g,u.x+=v*g,u.y+=m*g;let _=(h.vx-u.vx)*v+(h.vy-u.vy)*m;if(_>0){Em(i,h,u),i.contacts&&i.contacts.balls++;let y=_*.98;h.vx-=y*v,h.vy-=y*m,u.vx+=y*v,u.vy+=y*m,td(h,u,v,m,y)}}}i.balls.every(o=>o.pocket||Math.hypot(o.vx,o.vy)<1&&!nd(o))&&(i.balls.forEach(o=>o.vx=o.vy=0),Sm(i))}function id(i,e,t=!1){let n={scores:i.scores,captured:i.captured},r=Ds({discipline:i.discipline,color:i.color,seed:i.seed+1,breaker:e});if(t){r.scores=n.scores,r.captured=n.captured;for(let l of n.captured.flat())r.balls.find(c=>c.id===l).pocket=!0;let s=r.balls.filter(l=>!l.pocket),a=s.find(l=>l.id===0);if(!a){a=s[0];let l=r.captured.find(c=>c.includes(0));l[l.indexOf(0)]=a.id,a.pocket=!0,a=r.balls.find(c=>c.id===0),a.pocket=!1}Object.assign(a,{x:230,y:250});let o=0;for(let l=0;l<5;l++)for(let c=0;c<=l;c++){let h=s.filter(u=>u.id!==a.id&&!u.pocket)[o++];h&&Object.assign(h,{x:750+l*(Vt(r)*2+.05)*Math.sqrt(3)/2,y:250+(c-l/2)*(Vt(r)*2+.05)})}}Object.keys(i).forEach(s=>delete i[s]),Object.assign(i,r)}function Am(i,e){let t=i.pending;if(!t||i.moving||i.winner!==null)return!1;if(t.type==="pool-break"){if(!(t.illegal?["accept",...t.foul?["hand"]:[],"rerack-self","rerack-opponent"]:t.eight?["accept","rerack-self"]:["accept","hand"]).includes(e.choice))return!1;let r=i.turn;return i.pending=null,e.choice.startsWith("rerack")?(id(i,e.choice==="rerack-self"?r:1-r),!0):((e.choice==="hand"||t.eight&&t.foul||i.balls.find(s=>s.id===0).pocket)&&(i.inHand=!0,i.handZone="head",i.cueId=0),i.message=i.inHand?"\u0420\u0430\u0437\u0431\u043E\u0439 \xB7 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435":"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437",!0)}if(t.type==="pyramid-foul"){if(!["play","pass",...t.illegalBreak?["rerack-self","rerack-opponent"]:[]].includes(e.choice))return!1;let n=i.balls.find(s=>s.id===e.ballId&&!s.pocket);if(!n)return!1;let r=i.turn;return n.pocket=!0,i.captured[r].push(n.id),i.scores=i.captured.map(s=>s.length),i.pending=null,i.scores[r]>=8?(Xl(i,r),!0):e.choice.startsWith("rerack")?(id(i,e.choice==="rerack-self"?r:1-r,!0),!0):(i.turn=e.choice==="pass"?t.offender:r,i.cueId=i.balls.find(s=>!s.pocket)?.id??0,i.message="\u0428\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440 \u0441\u043D\u044F\u0442 \xB7 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0431\u0438\u0442\u043E\u043A",!0)}return!1}function Yi(i,e,t){return i.rulesVersion?e!==i.turn||!t||typeof t!="object"?!1:t.type==="decision"?Am(i,t):t.type==="shot"?Wl(i,t.angle,t.power,t):t.type==="place"?Ga(i,t.x,t.y):!1:Xu(i,e,t)}function jl(i){return i?.rulesVersion?i.rulesVersion===2&&rd.includes(i.discipline)&&[0,1].includes(i.turn)&&Array.isArray(i.balls)&&i.balls.length===16&&new Set(i.balls.map(e=>e.id)).size===16&&i.balls.every(e=>Number.isInteger(e.id)&&e.id>=0&&e.id<16&&[e.x,e.y,e.vx,e.vy].every(Number.isFinite)&&["rollX","rollY","side"].every(t=>e[t]===void 0||Number.isFinite(e[t]))&&Math.abs(e.x)<2e3&&Math.abs(e.y)<2e3&&typeof e.pocket=="boolean")&&Array.isArray(i.groups)&&i.groups.length===2&&i.groups.every(e=>e===null||e===0||e===1)&&Array.isArray(i.scores)&&i.scores.length===2&&i.scores.every(e=>Number.isInteger(e)&&e>=0&&e<=16)&&Array.isArray(i.captured)&&i.captured.length===2&&i.captured.every(e=>Array.isArray(e)&&e.every(t=>Number.isInteger(t)&&t>=0&&t<16))&&(i.winner===null||i.winner===0||i.winner===1)&&typeof i.message=="string"&&i.message.length<250:ju(i)}function od({request:i,onUpdate:e,onError:t}){let n=!1,r=null,s="",a=0,o=!1;function l(h){n||h.revision<a||(s=h.roomId,a=h.revision,e(h))}async function c(){if(clearTimeout(r),!(n||!s))try{l(await i({action:"room",roomId:s}))}catch(h){n||t(h.message)}finally{n||(clearTimeout(r),r=setTimeout(c,800))}}return{async start(h,u,p={}){try{let d=await i(h?{action:"create",...p}:{action:"join",roomId:u});if(l(d),h&&p.challenge)try{await i({action:"challenge",roomId:d.roomId}),n||e({...d,challengeSent:!0})}catch(f){n||t(f.message)}n||(clearTimeout(r),r=setTimeout(c,800))}catch(d){n||t(d.message,!0)}},async move(h,u=!1){if(!(n||o||!s)){o=!0;try{l(await i({action:u?"rematch":"move",roomId:s,revision:a,...u?{}:{move:h}}))}catch(p){n||(t(p.message),c())}finally{o=!1}}},close(){n=!0,clearTimeout(r)}}}var $d=0,zc=1,Qd=2;var Gc=1,el=2,$n=3,Fi=0,dn=1,_n=2,ki=0,wa=1,Hc=2,Vc=3,Wc=4,ep=5,hs=100,tp=101,np=102,ip=103,rp=104,sp=200,ap=201,op=202,lp=203,cp=204,hp=205,up=206,dp=207,pp=208,fp=209,mp=210,gp=211,vp=212,_p=213,yp=214,tl=0,nl=1,il=2,Ea=3,rl=4,sl=5,al=6,ol=7,xp=0,Mp=1,bp=2,bi=0,Sp=1,Tp=2,wp=3,ll=4,Ep=5,Ap=6,Rp=7,wc="attached",Cp="detached",Xc=300,us=301,pr=302,zi=303,cl=304,Aa=306,Qt=1e3,Di=1001,jr=1002,hn=1003,hl=1004;var fr=1005;var rn=1006,ds=1007;var Qn=1008;var ei=1009,jc=1010,qc=1011,ps=1012,ul=1013,mr=1014,yn=1015,fs=1016,dl=1017,pl=1018,ms=1020,Yc=35902,Zc=35899,Ip=1021,Pp=1022,xn=1023,Ra=1026,Ca=1027,fl=1028,ml=1029,Lp=1030,Kc=1031;var Jc=1033,gl=33776,vl=33777,_l=33778,yl=33779,$c=35840,Qc=35841,eh=35842,th=35843,nh=36196,ih=37492,rh=37496,sh=37808,ah=37809,oh=37810,lh=37811,ch=37812,hh=37813,uh=37814,dh=37815,ph=37816,fh=37817,mh=37818,gh=37819,vh=37820,_h=37821,yh=36492,xh=36494,Mh=36495,bh=36283,Sh=36284,Th=36285,wh=36286;var er=2300,tr=2301,xo=2302,Ec=2400,Ac=2401,Rc=2402;var Eh=0,Ia=1,gs=2;var Dp=3201;var Np=0,Up=1,gr="",ct="srgb",Wt="srgb-linear",js="linear",ft="srgb";var Qi=7680;var Op=512,Bp=513,Fp=514,Ah=515,kp=516,zp=517,Gp=518,Hp=519,Mo=35044;var Rh="300 es",vi=2e3,qs=2001;var _i=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ld=1234567,Wr=Math.PI/180,nr=180/Math.PI;function vn(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(qt[255&i]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[255&e]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[63&t|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[255&n]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Cc(i,e){return(i%e+e)%e}function Vs(i,e,t){return(1-t)*i+t*e}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}var Ch={DEG2RAD:Wr,RAD2DEG:nr,generateUUID:vn,clamp:Ze,euclideanModulo:Cc,mapLinear:function(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)},inverseLerp:function(i,e,t){return i!==e?(t-i)/(e-i):0},lerp:Vs,damp:function(i,e,t,n){return Vs(i,e,1-Math.exp(-t*n))},pingpong:function(i,e=1){return e-Math.abs(Cc(i,2*e)-e)},smoothstep:function(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e))*i*(3-2*i)},smootherstep:function(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e))*i*i*(i*(6*i-15)+10)},randInt:function(i,e){return i+Math.floor(Math.random()*(e-i+1))},randFloat:function(i,e){return i+Math.random()*(e-i)},randFloatSpread:function(i){return i*(.5-Math.random())},seededRandom:function(i){i!==void 0&&(ld=i);let e=ld+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(i){return i*Wr},radToDeg:function(i){return i*nr},isPowerOfTwo:function(i){return!(i&i-1)&&i!==0},ceilPowerOfTwo:function(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))},floorPowerOfTwo:function(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))},setQuaternionFromProperEuler:function(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),p=a((e-n)/2),d=s((n-e)/2),f=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*u,l*p,o*c);break;case"YZY":i.set(l*p,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*p,o*h,o*c);break;case"XZX":i.set(o*h,l*f,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*f,o*c);break;case"ZYZ":i.set(l*f,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}},normalize:pt,denormalize:Cn},oe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},sn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3],p=s[a+0],d=s[a+1],f=s[a+2],v=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=p,e[t+1]=d,e[t+2]=f,void(e[t+3]=v);if(u!==v||l!==p||c!==d||h!==f){let m=1-o,g=l*p+c*d+h*f+u*v,_=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let E=Math.sqrt(y),R=Math.atan2(E,g*_);m=Math.sin(m*R)/E,o=Math.sin(o*R)/E}let M=o*_;if(l=l*m+p*M,c=c*m+d*M,h=h*m+f*M,u=u*m+v*M,m===1-o){let E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[a],p=s[a+1],d=s[a+2],f=s[a+3];return e[t]=o*f+h*u+l*d-c*p,e[t+1]=l*f+h*p+c*u-o*d,e[t+2]=c*f+h*d+o*p-l*u,e[t+3]=h*f-o*u-l*p-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),u=o(s/2),p=l(n/2),d=l(r/2),f=l(s/2);switch(a){case"XYZ":this._x=p*h*u+c*d*f,this._y=c*d*u-p*h*f,this._z=c*h*f+p*d*u,this._w=c*h*u-p*d*f;break;case"YXZ":this._x=p*h*u+c*d*f,this._y=c*d*u-p*h*f,this._z=c*h*f-p*d*u,this._w=c*h*u+p*d*f;break;case"ZXY":this._x=p*h*u-c*d*f,this._y=c*d*u+p*h*f,this._z=c*h*f+p*d*u,this._w=c*h*u-p*d*f;break;case"ZYX":this._x=p*h*u-c*d*f,this._y=c*d*u+p*h*f,this._z=c*h*f-p*d*u,this._w=c*h*u+p*d*f;break;case"YZX":this._x=p*h*u+c*d*f,this._y=c*d*u+p*h*f,this._z=c*h*f-p*d*u,this._w=c*h*u-p*d*f;break;case"XZY":this._x=p*h*u-c*d*f,this._y=c*d*u-p*h*f,this._z=c*h*f+p*d*u,this._w=c*h*u+p*d*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],p=n+o+u;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=r*u+this._y*p,this._z=s*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=r+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ql.copy(this).projectOnVector(e),this.sub(ql)}reflect(e){return this.sub(ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ql=new A,cd=new sn,je=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],d=n[5],f=n[8],v=r[0],m=r[3],g=r[6],_=r[1],y=r[4],M=r[7],E=r[2],R=r[5],b=r[8];return s[0]=a*v+o*_+l*E,s[3]=a*m+o*y+l*R,s[6]=a*g+o*M+l*b,s[1]=c*v+h*_+u*E,s[4]=c*m+h*y+u*R,s[7]=c*g+h*M+u*b,s[2]=p*v+d*_+f*E,s[5]=p*m+d*y+f*R,s[8]=p*g+d*M+f*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,p=o*l-h*s,d=c*s-a*l,f=t*u+n*p+r*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/f;return e[0]=u*v,e[1]=(r*c-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=p*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Yl.makeScale(e,t)),this}rotate(e){return this.premultiply(Yl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yl=new je;function Ih(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vp(){let i=qr("canvas");return i.style.display="block",i}var hd={};function Yr(i){i in hd||(hd[i]=!0,console.warn(i))}function Wp(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var ud=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dd=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rm(){let i={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===ft&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ft&&(r.r=Xr(r.r),r.g=Xr(r.g),r.b=Xr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?js:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Yr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Yr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wt]:{primaries:e,whitePoint:n,transfer:js,toXYZ:ud,fromXYZ:dd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ct},outputColorSpaceConfig:{drawingBufferColorSpace:ct}},[ct]:{primaries:e,whitePoint:n,transfer:ft,toXYZ:ud,fromXYZ:dd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ct}}}),i}var ot=Rm();function gi(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Xr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var Pr,bo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Pr===void 0&&(Pr=qr("canvas")),Pr.width=e.width,Pr.height=e.height;let r=Pr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Pr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*gi(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*gi(t[n]/255)):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cm=0,Zr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=vn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Zl(r[a].image)):s.push(Zl(r[a]))}else s=Zl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Zl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Im=0,Kl=new A,Bt=class i extends _i{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=vn(),this.name="",this.source=new Zr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Kl).x}get height(){return this.source.getSize(Kl).y}get depth(){return this.source.getSize(Kl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qt:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case jr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Qt:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case jr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bt.DEFAULT_IMAGE=null,Bt.DEFAULT_MAPPING=Xc,Bt.DEFAULT_ANISOTROPY=1;var lt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],u=l[8],p=l[1],d=l[5],f=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-v)<.01&&Math.abs(f-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+v)<.1&&Math.abs(f+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,M=(d+1)/2,E=(g+1)/2,R=(h+p)/4,b=(u+v)/4,I=(f+m)/4;return y>M&&y>E?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=R/n,s=b/n):M>E?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=R/r,s=I/r):E<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),n=b/s,r=I/s),this.set(n,r,s,t),this}let _=Math.sqrt((m-f)*(m-f)+(u-v)*(u-v)+(p-h)*(p-h));return Math.abs(_)<.001&&(_=1),this.x=(m-f)/_,this.y=(u-v)/_,this.z=(p-h)/_,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},So=class extends _i{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new Bt(r);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Zr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends So{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ys=class extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var To=class extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xt=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(s,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Va.copy(n.boundingBox)),Va.applyMatrix4(e.matrixWorld),this.union(Va)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ns),Wa.subVectors(this.max,Ns),Lr.subVectors(e.a,Ns),Dr.subVectors(e.b,Ns),Nr.subVectors(e.c,Ns),Ai.subVectors(Dr,Lr),Ri.subVectors(Nr,Dr),Zi.subVectors(Lr,Nr);let t=[0,-Ai.z,Ai.y,0,-Ri.z,Ri.y,0,-Zi.z,Zi.y,Ai.z,0,-Ai.x,Ri.z,0,-Ri.x,Zi.z,0,-Zi.x,-Ai.y,Ai.x,0,-Ri.y,Ri.x,0,-Zi.y,Zi.x,0];return!!Jl(t,Lr,Dr,Nr,Wa)&&(t=[1,0,0,0,1,0,0,0,1],!!Jl(t,Lr,Dr,Nr,Wa)&&(Xa.crossVectors(Ai,Ri),t=[Xa.x,Xa.y,Xa.z],Jl(t,Lr,Dr,Nr,Wa)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(En).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},oi=[new A,new A,new A,new A,new A,new A,new A,new A],En=new A,Va=new Xt,Lr=new A,Dr=new A,Nr=new A,Ai=new A,Ri=new A,Zi=new A,Ns=new A,Wa=new A,Xa=new A,Ki=new A;function Jl(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ki.fromArray(i,s);let o=r.x*Math.abs(Ki.x)+r.y*Math.abs(Ki.y)+r.z*Math.abs(Ki.z),l=e.dot(Ki),c=t.dot(Ki),h=n.dot(Ki);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Pm=new Xt,Us=new A,$l=new A,en=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Pm.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);let t=Us.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Us,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add($l)),this.expandByPoint(Us.copy(e.center).sub($l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},li=new A,Ql=new A,ja=new A,Ci=new A,ec=new A,qa=new A,tc=new A,Ni=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ql.copy(e).add(t).multiplyScalar(.5),ja.copy(t).sub(e).normalize(),Ci.copy(this.origin).sub(Ql);let s=.5*e.distanceTo(t),a=-this.direction.dot(ja),o=Ci.dot(this.direction),l=-Ci.dot(ja),c=Ci.lengthSq(),h=Math.abs(1-a*a),u,p,d,f;if(h>0)if(u=a*l-o,p=a*o-l,f=s*h,u>=0)if(p>=-f)if(p<=f){let v=1/h;u*=v,p*=v,d=u*(u+a*p+2*o)+p*(a*u+p+2*l)+c}else p=s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p=-s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p<=-f?(u=Math.max(0,-(-a*s+o)),p=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c):p<=f?(u=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+c):(u=Math.max(0,-(a*s+o)),p=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c);else p=a>0?-s:s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ql).addScaledVector(ja,p),d}intersectSphere(e,t){li.subVectors(e.center,this.origin);let n=li.dot(this.direction),r=li.dot(li)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),h>=0?(s=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,r,s){ec.subVectors(t,e),qa.subVectors(n,e),tc.crossVectors(ec,qa);let a,o=this.direction.dot(tc);if(o>0){if(r)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Ci.subVectors(this.origin,e);let l=a*this.direction.dot(qa.crossVectors(Ci,qa));if(l<0)return null;let c=a*this.direction.dot(ec.cross(Ci));if(c<0||l+c>o)return null;let h=-a*Ci.dot(tc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ue=class i{constructor(e,t,n,r,s,a,o,l,c,h,u,p,d,f,v,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,u,p,d,f,v,m)}set(e,t,n,r,s,a,o,l,c,h,u,p,d,f,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=p,g[3]=d,g[7]=f,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Ur.setFromMatrixColumn(e,0).length(),s=1/Ur.setFromMatrixColumn(e,1).length(),a=1/Ur.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let p=a*h,d=a*u,f=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+f*c,t[5]=p-v*c,t[9]=-o*l,t[2]=v-p*c,t[6]=f+d*c,t[10]=a*l}else if(e.order==="YXZ"){let p=l*h,d=l*u,f=c*h,v=c*u;t[0]=p+v*o,t[4]=f*o-d,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-f,t[6]=v+p*o,t[10]=a*l}else if(e.order==="ZXY"){let p=l*h,d=l*u,f=c*h,v=c*u;t[0]=p-v*o,t[4]=-a*u,t[8]=f+d*o,t[1]=d+f*o,t[5]=a*h,t[9]=v-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let p=a*h,d=a*u,f=o*h,v=o*u;t[0]=l*h,t[4]=f*c-d,t[8]=p*c+v,t[1]=l*u,t[5]=v*c+p,t[9]=d*c-f,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let p=a*l,d=a*c,f=o*l,v=o*c;t[0]=l*h,t[4]=v-p*u,t[8]=f*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*u+f,t[10]=p-v*u}else if(e.order==="XZY"){let p=a*l,d=a*c,f=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=p*u+v,t[5]=a*h,t[9]=d*u-f,t[2]=f*u-d,t[6]=o*h,t[10]=v*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lm,e,Dm)}lookAt(e,t,n){let r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Ii.crossVectors(n,ln),Ii.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Ii.crossVectors(n,ln)),Ii.normalize(),Ya.crossVectors(ln,Ii),r[0]=Ii.x,r[4]=Ya.x,r[8]=ln.x,r[1]=Ii.y,r[5]=Ya.y,r[9]=ln.y,r[2]=Ii.z,r[6]=Ya.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],d=n[13],f=n[2],v=n[6],m=n[10],g=n[14],_=n[3],y=n[7],M=n[11],E=n[15],R=r[0],b=r[4],I=r[8],P=r[12],B=r[1],F=r[5],N=r[9],K=r[13],H=r[2],Z=r[6],Q=r[10],ce=r[14],J=r[3],de=r[7],ve=r[11],be=r[15];return s[0]=a*R+o*B+l*H+c*J,s[4]=a*b+o*F+l*Z+c*de,s[8]=a*I+o*N+l*Q+c*ve,s[12]=a*P+o*K+l*ce+c*be,s[1]=h*R+u*B+p*H+d*J,s[5]=h*b+u*F+p*Z+d*de,s[9]=h*I+u*N+p*Q+d*ve,s[13]=h*P+u*K+p*ce+d*be,s[2]=f*R+v*B+m*H+g*J,s[6]=f*b+v*F+m*Z+g*de,s[10]=f*I+v*N+m*Q+g*ve,s[14]=f*P+v*K+m*ce+g*be,s[3]=_*R+y*B+M*H+E*J,s[7]=_*b+y*F+M*Z+E*de,s[11]=_*I+y*N+M*Q+E*ve,s[15]=_*P+y*K+M*ce+E*be,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],p=e[10],d=e[14];return e[3]*(+s*l*u-r*c*u-s*o*p+n*c*p+r*o*d-n*l*d)+e[7]*(+t*l*d-t*c*p+s*a*p-r*a*d+r*c*h-s*l*h)+e[11]*(+t*c*u-t*o*d-s*a*u+n*a*d+s*o*h-n*c*h)+e[15]*(-r*o*h-t*l*u+t*o*p+r*a*u-n*a*p+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],p=e[10],d=e[11],f=e[12],v=e[13],m=e[14],g=e[15],_=u*m*c-v*p*c+v*l*d-o*m*d-u*l*g+o*p*g,y=f*p*c-h*m*c-f*l*d+a*m*d+h*l*g-a*p*g,M=h*v*c-f*u*c+f*o*d-a*v*d-h*o*g+a*u*g,E=f*u*l-h*v*l-f*o*p+a*v*p+h*o*m-a*u*m,R=t*_+n*y+r*M+s*E;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/R;return e[0]=_*b,e[1]=(v*p*s-u*m*s-v*r*d+n*m*d+u*r*g-n*p*g)*b,e[2]=(o*m*s-v*l*s+v*r*c-n*m*c-o*r*g+n*l*g)*b,e[3]=(u*l*s-o*p*s-u*r*c+n*p*c+o*r*d-n*l*d)*b,e[4]=y*b,e[5]=(h*m*s-f*p*s+f*r*d-t*m*d-h*r*g+t*p*g)*b,e[6]=(f*l*s-a*m*s-f*r*c+t*m*c+a*r*g-t*l*g)*b,e[7]=(a*p*s-h*l*s+h*r*c-t*p*c-a*r*d+t*l*d)*b,e[8]=M*b,e[9]=(f*u*s-h*v*s-f*n*d+t*v*d+h*n*g-t*u*g)*b,e[10]=(a*v*s-f*o*s+f*n*c-t*v*c-a*n*g+t*o*g)*b,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*d-t*o*d)*b,e[12]=E*b,e[13]=(h*v*r-f*u*r+f*n*p-t*v*p-h*n*m+t*u*m)*b,e[14]=(f*o*r-a*v*r-f*n*l+t*v*l+a*n*m-t*o*m)*b,e[15]=(a*u*r-h*o*r+h*n*l-t*u*l-a*n*p+t*o*p)*b,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,p=s*c,d=s*h,f=s*u,v=a*h,m=a*u,g=o*u,_=l*c,y=l*h,M=l*u,E=n.x,R=n.y,b=n.z;return r[0]=(1-(v+g))*E,r[1]=(d+M)*E,r[2]=(f-y)*E,r[3]=0,r[4]=(d-M)*R,r[5]=(1-(p+g))*R,r[6]=(m+_)*R,r[7]=0,r[8]=(f+y)*b,r[9]=(m-_)*b,r[10]=(1-(p+v))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=Ur.set(r[0],r[1],r[2]).length(),a=Ur.set(r[4],r[5],r[6]).length(),o=Ur.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);let l=1/s,c=1/a,h=1/o;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=c,An.elements[5]*=c,An.elements[6]*=c,An.elements[8]*=h,An.elements[9]*=h,An.elements[10]*=h,t.setFromRotationMatrix(An),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-r),p=(t+e)/(t-e),d=(n+r)/(n-r),f,v;if(l)f=s/(a-s),v=a*s/(a-s);else if(o===vi)f=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==qs)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);f=-a/(a-s),v=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-r),p=-(t+e)/(t-e),d=-(n+r)/(n-r),f,v;if(l)f=1/(a-s),v=a/(a-s);else if(o===vi)f=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==qs)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);f=-1/(a-s),v=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=f,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ur=new A,An=new Ue,Lm=new A(0,0,0),Dm=new A(1,1,1),Ii=new A,Ya=new A,ln=new A,pd=new Ue,fd=new sn,In=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],p=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fd.setFromEuler(this),this.setFromQuaternion(fd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Nm=0,md=new A,Or=new sn,ci=new Ue,Za=new A,Os=new A,Um=new A,Om=new sn,gd=new A(1,0,0),vd=new A(0,1,0),_d=new A(0,0,1),yd={type:"added"},Bm={type:"removed"},Br={type:"childadded",child:null},nc={type:"childremoved",child:null},Mt=class i extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new A,t=new In,n=new sn,r=new A(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ue},normalMatrix:{value:new je}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Or.setFromAxisAngle(e,t),this.quaternion.multiply(Or),this}rotateOnWorldAxis(e,t){return Or.setFromAxisAngle(e,t),this.quaternion.premultiply(Or),this}rotateX(e){return this.rotateOnAxis(gd,e)}rotateY(e){return this.rotateOnAxis(vd,e)}rotateZ(e){return this.rotateOnAxis(_d,e)}translateOnAxis(e,t){return md.copy(e).applyQuaternion(this.quaternion),this.position.add(md.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gd,e)}translateY(e){return this.translateOnAxis(vd,e)}translateZ(e){return this.translateOnAxis(_d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Za.copy(e):Za.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Os,Za,this.up):ci.lookAt(Za,Os,this.up),this.quaternion.setFromRotationMatrix(ci),r&&(ci.extractRotation(r.matrixWorld),Or.setFromRotationMatrix(ci),this.quaternion.premultiply(Or.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yd),Br.child=e,this.dispatchEvent(Br),Br.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bm),nc.child=e,this.dispatchEvent(nc),nc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yd),Br.child=e,this.dispatchEvent(Br),Br.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,Um),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,Om,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),d=a(e.animations),f=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),f.length>0&&(n.nodes=f)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Mt.DEFAULT_UP=new A(0,1,0),Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=new A,hi=new A,ic=new A,ui=new A,Fr=new A,kr=new A,xd=new A,rc=new A,sc=new A,ac=new A,oc=new lt,lc=new lt,cc=new lt,pi=class i{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rn.subVectors(e,t),r.cross(Rn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Rn.subVectors(r,t),hi.subVectors(n,t),ic.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(hi),l=Rn.dot(ic),c=hi.dot(hi),h=hi.dot(ic),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let p=1/u,d=(c*l-o*h)*p,f=(a*h-o*l)*p;return s.set(1-d-f,f,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ui)!==null&&ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ui.x),l.addScaledVector(a,ui.y),l.addScaledVector(o,ui.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return oc.setScalar(0),lc.setScalar(0),cc.setScalar(0),oc.fromBufferAttribute(e,t),lc.fromBufferAttribute(e,n),cc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(oc,s.x),a.addScaledVector(lc,s.y),a.addScaledVector(cc,s.z),a}static isFrontFacing(e,t,n,r){return Rn.subVectors(n,t),hi.subVectors(e,t),Rn.cross(hi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),.5*Rn.cross(hi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Fr.subVectors(r,n),kr.subVectors(s,n),rc.subVectors(e,n);let l=Fr.dot(rc),c=kr.dot(rc);if(l<=0&&c<=0)return t.copy(n);sc.subVectors(e,r);let h=Fr.dot(sc),u=kr.dot(sc);if(h>=0&&u<=h)return t.copy(r);let p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Fr,a);ac.subVectors(e,s);let d=Fr.dot(ac),f=kr.dot(ac);if(f>=0&&d<=f)return t.copy(s);let v=d*c-l*f;if(v<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(kr,o);let m=h*f-d*u;if(m<=0&&u-h>=0&&d-f>=0)return xd.subVectors(s,r),o=(u-h)/(u-h+(d-f)),t.copy(r).addScaledVector(xd,o);let g=1/(m+v+p);return a=v*g,o=p*g,t.copy(n).addScaledVector(Fr,a).addScaledVector(kr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Ka={h:0,s:0,l:0};function hc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var Le=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ot.workingColorSpace){if(e=Cc(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=hc(a,s,e+1/3),this.g=hc(a,s,e),this.b=hc(a,s,e-1/3)}return ot.colorSpaceToWorking(this,r),this}setStyle(e,t=ct){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ct){let n=Xp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ct){return ot.workingToColorSpace(Yt.copy(this),e),65536*Math.round(Ze(255*Yt.r,0,255))+256*Math.round(Ze(255*Yt.g,0,255))+Math.round(Ze(255*Yt.b,0,255))}getHexString(e=ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,r=Yt.g,s=Yt.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=ct){ot.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,r=Yt.b;return e!==ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Ka);let n=Vs(Pi.h,Ka.h,t),r=Vs(Pi.s,Ka.s,t),s=Vs(Pi.l,Ka.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Le;Le.NAMES=Xp;var Fm=0,an=class extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=vn(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},jt=class extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},vv=km();function km(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var Pt=new A,Ja=new oe,zm=0,Dt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Mo,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ja.fromBufferAttribute(this,t),Ja.applyMatrix3(e),this.setXY(t,Ja.x,Ja.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mo&&(e.usage=this.usage),e}};var Zs=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ks=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Oe=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Gm=0,mn=new Ue,uc=new Mt,zr=new A,cn=new Xt,Bs=new Xt,zt=new A,ut=class i extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ih(e)?Ks:Zs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return uc.lookAt(e),uc.updateMatrix(),this.applyMatrix4(uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zr).negate(),this.translate(zr.x,zr.y,zr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Oe(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new A,1/0);if(e){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Bs.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(cn.min,Bs.min),cn.expandByPoint(zt),zt.addVectors(cn.max,Bs.max),cn.expandByPoint(zt)):(cn.expandByPoint(Bs.min),cn.expandByPoint(Bs.max))}cn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)zt.fromBufferAttribute(o,c),l&&(zr.fromBufferAttribute(e,c),zt.add(zr)),r=Math.max(r,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new A,l[I]=new A;let c=new A,h=new A,u=new A,p=new oe,d=new oe,f=new oe,v=new A,m=new A;function g(I,P,B){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,P),u.fromBufferAttribute(n,B),p.fromBufferAttribute(s,I),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,B),h.sub(c),u.sub(c),d.sub(p),f.sub(p);let F=1/(d.x*f.y-f.x*d.y);isFinite(F)&&(v.copy(h).multiplyScalar(f.y).addScaledVector(u,-d.y).multiplyScalar(F),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-f.x).multiplyScalar(F),o[I].add(v),o[P].add(v),o[B].add(v),l[I].add(m),l[P].add(m),l[B].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let I=0,P=_.length;I<P;++I){let B=_[I],F=B.start;for(let N=F,K=F+B.count;N<K;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let y=new A,M=new A,E=new A,R=new A;function b(I){E.fromBufferAttribute(r,I),R.copy(E);let P=o[I];y.copy(P),y.sub(E.multiplyScalar(E.dot(P))).normalize(),M.crossVectors(R,P);let B=M.dot(l[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,B)}for(let I=0,P=_.length;I<P;++I){let B=_[I],F=B.start;for(let N=F,K=F+B.count;N<K;N+=3)b(e.getX(N+0)),b(e.getX(N+1)),b(e.getX(N+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);let r=new A,s=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(e)for(let p=0,d=e.count;p<d;p+=3){let f=e.getX(p+0),v=e.getX(p+1),m=e.getX(p+2);r.fromBufferAttribute(t,f),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,d=t.count;p<d;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,p=new c.constructor(l.length*h),d=0,f=0;for(let v=0,m=l.length;v<m;v++){d=o.isInterleavedBufferAttribute?l[v]*o.data.stride+o.offset:l[v]*h;for(let g=0;g<h;g++)p[f++]=c[d++]}return new Dt(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let p=e(c[h],n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Md=new Ue,Ji=new Ni,$a=new en,bd=new A,Qa=new A,eo=new A,to=new A,dc=new A,no=new A,Sd=new A,io=new A,ht=class extends Mt{constructor(e=new ut,t=new jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){no.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(dc.fromBufferAttribute(u,e),a?no.addScaledVector(dc,h):no.addScaledVector(dc.sub(t),h))}t.add(no)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(s),Ji.copy(e.ray).recast(e.near),$a.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere($a,bd)===null||Ji.origin.distanceToSquared(bd)>(e.far-e.near)**2))return;Md.copy(s).invert(),Ji.copy(e.ray).applyMatrix4(Md),n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Ji)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let f=0,v=p.length;f<v;f++){let m=p[f],g=a[m.materialIndex];for(let _=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));_<y;_+=3)r=ro(this,g,e,n,c,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}else for(let f=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);f<v;f+=3)r=ro(this,a,e,n,c,h,u,o.getX(f),o.getX(f+1),o.getX(f+2)),r&&(r.faceIndex=Math.floor(f/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let f=0,v=p.length;f<v;f++){let m=p[f],g=a[m.materialIndex];for(let _=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));_<y;_+=3)r=ro(this,g,e,n,c,h,u,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}else for(let f=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);f<v;f+=3)r=ro(this,a,e,n,c,h,u,f,f+1,f+2),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}};function ro(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Qa),i.getVertexPosition(l,eo),i.getVertexPosition(c,to);let h=(function(u,p,d,f,v,m,g,_){let y;if(y=p.side===1?f.intersectTriangle(g,m,v,!0,_):f.intersectTriangle(v,m,g,p.side===0,_),y===null)return null;io.copy(_),io.applyMatrix4(u.matrixWorld);let M=d.ray.origin.distanceTo(io);return M<d.near||M>d.far?null:{distance:M,point:io.clone(),object:u}})(i,e,t,n,Qa,eo,to,Sd);if(h){let u=new A;pi.getBarycoord(Sd,Qa,eo,to,u),r&&(h.uv=pi.getInterpolatedAttribute(r,o,l,c,u,new oe)),s&&(h.uv1=pi.getInterpolatedAttribute(s,o,l,c,u,new oe)),a&&(h.normal=pi.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new A,materialIndex:0};pi.getNormal(Qa,eo,to,p.normal),h.face=p,h.barycoord=u}return h}var Pn=class i extends ut{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],p=0,d=0;function f(v,m,g,_,y,M,E,R,b,I,P){let B=M/b,F=E/I,N=M/2,K=E/2,H=R/2,Z=b+1,Q=I+1,ce=0,J=0,de=new A;for(let ve=0;ve<Q;ve++){let be=ve*F-K;for(let we=0;we<Z;we++){let re=we*B-N;de[v]=re*_,de[m]=be*y,de[g]=H,c.push(de.x,de.y,de.z),de[v]=0,de[m]=0,de[g]=R>0?1:-1,h.push(de.x,de.y,de.z),u.push(we/b),u.push(1-ve/I),ce+=1}}for(let ve=0;ve<I;ve++)for(let be=0;be<b;be++){let we=p+be+Z*ve,re=p+be+Z*(ve+1),ue=p+(be+1)+Z*(ve+1),ne=p+(be+1)+Z*ve;l.push(we,re,ne),l.push(re,ue,ne),J+=6}o.addGroup(d,J,P),d+=J,p+=ce}f("z","y","x",-1,-1,n,t,e,a,s,0),f("z","y","x",1,-1,n,t,-e,a,s,1),f("x","z","y",1,1,e,n,t,r,a,2),f("x","z","y",1,-1,e,n,-t,r,a,3),f("x","y","z",1,-1,e,t,n,r,s,4),f("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function vr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Kt(i){let e={};for(let t=0;t<i.length;t++){let n=vr(i[t]);for(let r in n)e[r]=n[r]}return e}function Ph(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var jp={clone:vr,merge:Kt},Ln=class extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Jr=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Li=new A,Td=new oe,wd=new oe,Lt=class extends Jr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*nr*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Wr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*nr*Math.atan(Math.tan(.5*Wr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Li.x,Li.y).multiplyScalar(-e/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Li.x,Li.y).multiplyScalar(-e/Li.z)}getViewSize(e,t){return this.getViewBounds(e,Td,wd),t.subVectors(wd,Td)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Wr*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Gr=-90,wo=class extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Lt(Gr,1,e,t);r.layers=this.layers,this.add(r);let s=new Lt(Gr,1,e,t);s.layers=this.layers,this.add(s);let a=new Lt(Gr,1,e,t);a.layers=this.layers,this.add(a);let o=new Lt(Gr,1,e,t);o.layers=this.layers,this.add(o);let l=new Lt(Gr,1,e,t);l.layers=this.layers,this.add(l);let c=new Lt(Gr,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===vi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==qs)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,p,d),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},Js=class extends Bt{constructor(e=[],t=301,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Eo=class extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Js(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Pn(5,5,5),s=new Ln({name:"CubemapFromEquirect",uniforms:vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ht(r,s),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=rn),new wo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},Zt=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Hm={type:"move"},$r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(c,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,f=.005;c.inputState.pinching&&p>d+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=d-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hm)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var $s=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Le(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Qr=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},es=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Mo,this.updateRanges=[],this.version=0,this.uuid=vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},$t=new A,ts=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var _v=new A,yv=new A,xv=new A,Mv=new oe,bv=new oe,Sv=new Ue,Tv=new A,wv=new A,Ev=new A,Av=new oe,Rv=new oe,Cv=new oe;var Iv=new A,Pv=new A;var Ed=new A,Ad=new lt,Rd=new lt,Vm=new A,Cd=new Ue,so=new A,pc=new en,Id=new Ue,fc=new Ni,Qs=class extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=wc,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,so),this.boundingBox.expandByPoint(so)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new en),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,so),this.boundingSphere.expandByPoint(so)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pc.copy(this.boundingSphere),pc.applyMatrix4(r),e.ray.intersectsSphere(pc)!==!1&&(Id.copy(r).invert(),fc.copy(e.ray).applyMatrix4(Id),this.boundingBox!==null&&fc.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,fc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===wc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Cp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Ad.fromBufferAttribute(r.attributes.skinIndex,e),Rd.fromBufferAttribute(r.attributes.skinWeight,e),Ed.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Rd.getComponent(s);if(a!==0){let o=Ad.getComponent(s);Cd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Vm.copy(Ed).applyMatrix4(Cd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},ns=class extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ea=class extends Bt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,u,p){super(null,a,o,l,c,h,r,s,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Pd=new Ue,Wm=new Ue,ta=class i{constructor(e=[],t=[]){this.uuid=vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Wm;Pd.multiplyMatrices(o,t[s]),Pd.toArray(n,16*s)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ea(t,e,e,xn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new ns),this.bones.push(a),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=n[r];e.boneInverses.push(o.toArray())}return e}},Ui=class extends Dt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Hr=new Ue,Ld=new Ue,ao=[],Dd=new Xt,Xm=new Ue,Fs=new ht,ks=new en,na=class extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ui(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Xm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hr),Dd.copy(e.boundingBox).applyMatrix4(Hr),this.boundingBox.union(Dd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new en),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hr),ks.copy(e.boundingSphere).applyMatrix4(Hr),this.boundingSphere.union(ks)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=r[s+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),e.ray.intersectsSphere(ks)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Hr),Ld.multiplyMatrices(n,Hr),Fs.matrixWorld=Ld,Fs.raycast(e,ao);for(let a=0,o=ao.length;a<o;a++){let l=ao[a];l.instanceId=s,l.object=this,t.push(l)}ao.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ui(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ea(new Float32Array(r*this.count),r,this.count,fl,yn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},mc=new A,jm=new A,qm=new je,gn=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=mc.subVectors(n,t).cross(jm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(mc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qm.getNormalMatrix(e),r=this.coplanarPoint(mc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},$i=new en,Ym=new oe(.5,.5),oo=new A,Oi=class{constructor(e=new gn,t=new gn,n=new gn,r=new gn,s=new gn,a=new gn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],p=s[6],d=s[7],f=s[8],v=s[9],m=s[10],g=s[11],_=s[12],y=s[13],M=s[14],E=s[15];if(r[0].setComponents(c-a,d-h,g-f,E-_).normalize(),r[1].setComponents(c+a,d+h,g+f,E+_).normalize(),r[2].setComponents(c+o,d+u,g+v,E+y).normalize(),r[3].setComponents(c-o,d-u,g-v,E-y).normalize(),n)r[4].setComponents(l,p,m,M).normalize(),r[5].setComponents(c-l,d-p,g-m,E-M).normalize();else if(r[4].setComponents(c-l,d-p,g-m,E-M).normalize(),t===vi)r[5].setComponents(c+l,d+p,g+m,E+M).normalize();else{if(t!==qs)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,p,m,M).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){$i.center.set(0,0,0);let t=Ym.distanceTo(e.center);return $i.radius=.7071067811865476+t,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(oo.x=r.normal.x>0?e.max.x:e.min.x,oo.y=r.normal.y>0?e.max.y:e.min.y,oo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},kn=new Ue,zn=new Oi,Ao=class i{constructor(){this.coordinateSystem=vi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(kn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),zn.setFromProjectionMatrix(kn,r.coordinateSystem,r.reversedDepth),zn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(kn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),zn.setFromProjectionMatrix(kn,r.coordinateSystem,r.reversedDepth),zn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(kn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),zn.setFromProjectionMatrix(kn,r.coordinateSystem,r.reversedDepth),zn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(kn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),zn.setFromProjectionMatrix(kn,r.coordinateSystem,r.reversedDepth),zn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(kn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),zn.setFromProjectionMatrix(kn,r.coordinateSystem,r.reversedDepth),zn.containsPoint(e))return!0}return!1}clone(){return new i}};var Ic=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},Lv=new Ue,Dv=new Le(1,1,1),Nv=new Oi,Uv=new Ao,Ov=new Xt,Bv=new en,Fv=new A,kv=new A,zv=new A,Gv=new Ic,Hv=new ht;var yi=class extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ro=new A,Co=new A,Nd=new Ue,zs=new Ni,lo=new en,gc=new A,Ud=new A,Wn=class extends Mt{constructor(e=new ut,t=new yi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ro.fromBufferAttribute(t,r-1),Co.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ro.distanceTo(Co);e.setAttribute("lineDistance",new Oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(r),lo.radius+=s,e.ray.intersectsSphere(lo)===!1)return;Nd.copy(r).invert(),zs.copy(e.ray).applyMatrix4(Nd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let f=p,v=d-1;f<v;f+=c){let m=h.getX(f),g=h.getX(f+1),_=co(this,e,zs,l,m,g,f);_&&t.push(_)}if(this.isLineLoop){let f=h.getX(d-1),v=h.getX(p),m=co(this,e,zs,l,f,v,d-1);m&&t.push(m)}}else{let p=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let f=p,v=d-1;f<v;f+=c){let m=co(this,e,zs,l,f,f+1,f);m&&t.push(m)}if(this.isLineLoop){let f=co(this,e,zs,l,d-1,p,d-1);f&&t.push(f)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function co(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Ro.fromBufferAttribute(o,r),Co.fromBufferAttribute(o,s),t.distanceSqToSegment(Ro,Co,gc,Ud)>n)return;gc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(gc);return l<e.near||l>e.far?void 0:{distance:l,point:Ud.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Od=new A,Bd=new A,ia=class extends Wn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Od.fromBufferAttribute(t,r),Bd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Od.distanceTo(Bd);e.setAttribute("lineDistance",new Oe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ra=class extends Wn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},is=class extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fd=new Ue,Pc=new Ni,ho=new en,uo=new A,sa=class extends Mt{constructor(e=new ut,t=new is){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(r),ho.radius+=s,e.ray.intersectsSphere(ho)===!1)return;Fd.copy(r).invert(),Pc.copy(e.ray).applyMatrix4(Fd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);u<p;u++){let d=c.getX(u);uo.fromBufferAttribute(h,d),kd(uo,d,l,r,e,t,this)}else for(let u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);u<p;u++)uo.fromBufferAttribute(h,u),kd(uo,u,l,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function kd(i,e,t,n,r,s,a){let o=Pc.distanceSqToPoint(i);if(o<t){let l=new A;Pc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var tn=class extends Bt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},aa=class extends Bt{constructor(e,t,n=1014,r,s,a,o=1003,l=1003,c,h=1026,u=1){if(h!==Ra&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},oa=class extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Io=class i extends ut{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,p=t,d=2*u+p,f=2*n+s,v=r+1,m=new A,g=new A;for(let _=0;_<=f;_++){let y=0,M=0,E=0,R=0;if(_<=n){let P=_/n,B=P*Math.PI/2;M=-h-e*Math.cos(B),E=e*Math.sin(B),R=-e*Math.cos(B),y=P*u}else if(_<=n+s){let P=(_-n)/s;M=P*t-h,E=e,R=0,y=u+P*p}else{let P=(_-n-s)/n,B=P*Math.PI/2;M=h+e*Math.sin(B),E=e*Math.cos(B),R=e*Math.sin(B),y=u+p+P*u}let b=Math.max(0,Math.min(1,y/d)),I=0;_===0?I=.5/r:_===f&&(I=-.5/r);for(let P=0;P<=r;P++){let B=P/r,F=B*Math.PI*2,N=Math.sin(F),K=Math.cos(F);g.x=-E*K,g.y=M,g.z=E*N,o.push(g.x,g.y,g.z),m.set(-E*K,R,E*N),m.normalize(),l.push(m.x,m.y,m.z),c.push(B+I,b)}if(_>0){let P=(_-1)*v;for(let B=0;B<r;B++){let F=P+B,N=P+B+1,K=_*v+B,H=_*v+B+1;a.push(F,N,K),a.push(N,H,K)}}}this.setIndex(a),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},rs=class i extends ut{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new A,h=new oe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){let d=n+u/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(o,3)),this.setAttribute("uv",new Oe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Xn=class i extends ut{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],u=[],p=[],d=[],f=0,v=[],m=n/2,g=0;function _(y){let M=f,E=new oe,R=new A,b=0,I=y===!0?e:t,P=y===!0?1:-1;for(let F=1;F<=r;F++)u.push(0,m*P,0),p.push(0,P,0),d.push(.5,.5),f++;let B=f;for(let F=0;F<=r;F++){let N=F/r*l+o,K=Math.cos(N),H=Math.sin(N);R.x=I*H,R.y=m*P,R.z=I*K,u.push(R.x,R.y,R.z),p.push(0,P,0),E.x=.5*K+.5,E.y=.5*H*P+.5,d.push(E.x,E.y),f++}for(let F=0;F<r;F++){let N=M+F,K=B+F;y===!0?h.push(K,K+1,N):h.push(K+1,K,N),b+=3}c.addGroup(g,b,y===!0?1:2),g+=b}(function(){let y=new A,M=new A,E=0,R=(t-e)/n;for(let b=0;b<=s;b++){let I=[],P=b/s,B=P*(t-e)+e;for(let F=0;F<=r;F++){let N=F/r,K=N*l+o,H=Math.sin(K),Z=Math.cos(K);M.x=B*H,M.y=-P*n+m,M.z=B*Z,u.push(M.x,M.y,M.z),y.set(H,R,Z).normalize(),p.push(y.x,y.y,y.z),d.push(N,1-P),I.push(f++)}v.push(I)}for(let b=0;b<r;b++)for(let I=0;I<s;I++){let P=v[I][b],B=v[I+1][b],F=v[I+1][b+1],N=v[I][b+1];(e>0||I!==0)&&(h.push(P,B,N),E+=3),(t>0||I!==s-1)&&(h.push(B,F,N),E+=3)}c.addGroup(g,E,0),g+=E})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(p,3)),this.setAttribute("uv",new Oe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Po=class i extends Xn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Bi=class i extends ut{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(d,f,v,m){let g=m+1,_=[];for(let y=0;y<=g;y++){_[y]=[];let M=d.clone().lerp(v,y/g),E=f.clone().lerp(v,y/g),R=g-y;for(let b=0;b<=R;b++)_[y][b]=b===0&&y===g?M:M.clone().lerp(E,b/R)}for(let y=0;y<g;y++)for(let M=0;M<2*(g-y)-1;M++){let E=Math.floor(M/2);M%2==0?(l(_[y][E+1]),l(_[y+1][E]),l(_[y][E])):(l(_[y][E+1]),l(_[y+1][E+1]),l(_[y+1][E]))}}function l(d){s.push(d.x,d.y,d.z)}function c(d,f){let v=3*d;f.x=e[v+0],f.y=e[v+1],f.z=e[v+2]}function h(d,f,v,m){m<0&&d.x===1&&(a[f]=d.x-1),v.x===0&&v.z===0&&(a[f]=m/2/Math.PI+.5)}function u(d){return Math.atan2(d.z,-d.x)}function p(d){return Math.atan2(-d.y,Math.sqrt(d.x*d.x+d.z*d.z))}(function(d){let f=new A,v=new A,m=new A;for(let g=0;g<t.length;g+=3)c(t[g+0],f),c(t[g+1],v),c(t[g+2],m),o(f,v,m,d)})(r),(function(d){let f=new A;for(let v=0;v<s.length;v+=3)f.x=s[v+0],f.y=s[v+1],f.z=s[v+2],f.normalize().multiplyScalar(d),s[v+0]=f.x,s[v+1]=f.y,s[v+2]=f.z})(n),(function(){let d=new A;for(let f=0;f<s.length;f+=3){d.x=s[f+0],d.y=s[f+1],d.z=s[f+2];let v=u(d)/2/Math.PI+.5,m=p(d)/Math.PI+.5;a.push(v,1-m)}(function(){let f=new A,v=new A,m=new A,g=new A,_=new oe,y=new oe,M=new oe;for(let E=0,R=0;E<s.length;E+=9,R+=6){f.set(s[E+0],s[E+1],s[E+2]),v.set(s[E+3],s[E+4],s[E+5]),m.set(s[E+6],s[E+7],s[E+8]),_.set(a[R+0],a[R+1]),y.set(a[R+2],a[R+3]),M.set(a[R+4],a[R+5]),g.copy(f).add(v).add(m).divideScalar(3);let b=u(g);h(_,R+0,f,b),h(y,R+2,v,b),h(M,R+4,m,b)}})(),(function(){for(let f=0;f<a.length;f+=6){let v=a[f+0],m=a[f+2],g=a[f+4],_=Math.max(v,m,g),y=Math.min(v,m,g);_>.9&&y<.1&&(v<.2&&(a[f+0]+=1),m<.2&&(a[f+2]+=1),g<.2&&(a[f+4]+=1))}})()})(),this.setAttribute("position",new Oe(s,3)),this.setAttribute("normal",new Oe(s.slice(),3)),this.setAttribute("uv",new Oe(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},Lo=class i extends Bi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},po=new A,fo=new A,vc=new A,mo=new pi,Do=class extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Wr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),p={},d=[];for(let f=0;f<l;f+=3){a?(c[0]=a.getX(f),c[1]=a.getX(f+1),c[2]=a.getX(f+2)):(c[0]=f,c[1]=f+1,c[2]=f+2);let{a:v,b:m,c:g}=mo;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),mo.getNormal(vc),u[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let y=(_+1)%3,M=u[_],E=u[y],R=mo[h[_]],b=mo[h[y]],I=`${M}_${E}`,P=`${E}_${M}`;P in p&&p[P]?(vc.dot(p[P].normal)<=s&&(d.push(R.x,R.y,R.z),d.push(b.x,b.y,b.z)),p[P]=null):I in p||(p[I]={index0:c[_],index1:c[y],normal:vc.clone()})}}for(let f in p)if(p[f]){let{index0:v,index1:m}=p[f];po.fromBufferAttribute(o,v),fo.fromBufferAttribute(o,m),d.push(po.x,po.y,po.z),d.push(fo.x,fo.y,fo.z)}this.setAttribute("position",new Oe(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new oe:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new A,r=[],s=[],a=[],o=new A,l=new Ue;for(let d=0;d<=e;d++){let f=d/e;r[d]=this.getTangentAt(f,new A)}s[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),p=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(Ze(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,f))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Ze(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let f=1;f<=e;f++)s[f].applyMatrix4(l.makeRotationAxis(r[f],d*f)),a[f].crossVectors(r[f],s[f])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ss=class extends un{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new oe){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*h-d*u+this.aX,c=p*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},No=class extends ss{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Lh(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let p=(a-s)/c-(o-s)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;p*=h,d*=h,r(a,o,p,d)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var go=new A,_c=new Lh,yc=new Lh,xc=new Lh,as=class extends un{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new A){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:(go.subVectors(r[0],r[1]).add(r[0]),o=go);let u=r[c%s],p=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:(go.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=go),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,f=Math.pow(o.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(l),d);v<1e-4&&(v=1),f<1e-4&&(f=v),m<1e-4&&(m=v),_c.initNonuniformCatmullRom(o.x,u.x,p.x,l.x,f,v,m),yc.initNonuniformCatmullRom(o.y,u.y,p.y,l.y,f,v,m),xc.initNonuniformCatmullRom(o.z,u.z,p.z,l.z,f,v,m)}else this.curveType==="catmullrom"&&(_c.initCatmullRom(o.x,u.x,p.x,l.x,this.tension),yc.initCatmullRom(o.y,u.y,p.y,l.y,this.tension),xc.initCatmullRom(o.z,u.z,p.z,l.z,this.tension));return n.set(_c.calc(h),yc.calc(h),xc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new A().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function zd(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function Ws(i,e,t,n){return(function(r,s){let a=1-r;return a*a*s})(i,e)+(function(r,s){return 2*(1-r)*r*s})(i,t)+(function(r,s){return r*r*s})(i,n)}function Xs(i,e,t,n,r){return(function(s,a){let o=1-s;return o*o*o*a})(i,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(i,t)+(function(s,a){return 3*(1-s)*s*s*a})(i,n)+(function(s,a){return s*s*s*a})(i,r)}var la=class extends un{constructor(e=new oe,t=new oe,n=new oe,r=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new oe){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Xs(e,r.x,s.x,a.x,o.x),Xs(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Uo=class extends un{constructor(e=new A,t=new A,n=new A,r=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new A){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Xs(e,r.x,s.x,a.x,o.x),Xs(e,r.y,s.y,a.y,o.y),Xs(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ca=class extends un{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oo=class extends un{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends un{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ws(e,r.x,s.x,a.x),Ws(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ua=class extends un{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ws(e,r.x,s.x,a.x),Ws(e,r.y,s.y,a.y),Ws(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},da=class extends un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(zd(o,l.x,c.x,h.x,u.x),zd(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new oe().fromArray(r))}return this}},Bo=Object.freeze({__proto__:null,ArcCurve:No,CatmullRomCurve3:as,CubicBezierCurve:la,CubicBezierCurve3:Uo,EllipseCurve:ss,LineCurve:ca,LineCurve3:Oo,QuadraticBezierCurve:ha,QuadraticBezierCurve3:ua,SplineCurve:da}),Fo=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Bo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Bo[r.type]().fromJSON(r))}return this}},pa=class extends Fo{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ca(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new ha(this.currentPoint.clone(),new oe(e,t),new oe(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new la(this.currentPoint.clone(),new oe(e,t),new oe(n,r),new oe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new da(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new ss(e,t,n,r,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},jn=class extends pa{constructor(e){super(e),this.uuid=vn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new pa().fromJSON(r))}return this}};function Zm(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Gd(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,u,p,d){let f=[];for(let v=0,m=u.length;v<m;v++){let g=Gd(h,u[v]*d,v<m-1?u[v+1]*d:h.length,d,!1);g===g.next&&(g.steiner=!0),f.push(ig(g))}f.sort(eg);for(let v=0;v<f.length;v++)p=tg(f[v],p);return p})(i,e,s,t)),i.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let p=t;p<r;p+=t){let d=i[p],f=i[p+1];d<o&&(o=d),f<l&&(l=f),d>h&&(h=d),f>u&&(u=f)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return fa(s,a,t,o,l,c,0),a}function Gd(i,e,t,n,r){let s;if(r===(function(a,o,l,c){let h=0;for(let u=o,p=l-c;u<l;u+=c)h+=(a[p]-a[u])*(a[u+1]+a[p+1]),p=u;return h})(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Hd(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Hd(a/n|0,i[a],i[a+1],s);return s&&os(s,s.next)&&(ga(s),s=s.next),s}function ir(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!os(n,n.next)&&Tt(n.prev,n,n.next)!==0)n=n.next;else{if(ga(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function fa(i,e,t,n,r,s,a){if(!i)return;!a&&s&&(function(l,c,h,u){let p=l;do p.z===0&&(p.z=Lc(p.x,p.y,c,h,u)),p.prevZ=p.prev,p.nextZ=p.next,p=p.next;while(p!==l);p.prevZ.nextZ=null,p.prevZ=null,(function(d){let f,v=1;do{let m,g=d;d=null;let _=null;for(f=0;g;){f++;let y=g,M=0;for(let R=0;R<v&&(M++,y=y.nextZ,y);R++);let E=v;for(;M>0||E>0&&y;)M!==0&&(E===0||!y||g.z<=y.z)?(m=g,g=g.nextZ,M--):(m=y,y=y.nextZ,E--),_?_.nextZ=m:d=m,m.prevZ=_,_=m;g=y}_.nextZ=null,v*=2}while(f>1)})(p)})(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?Jm(i,n,r,s):Km(i))e.push(l.i,i.i,c.i),ga(i),i=c.next,o=c.next;else if((i=c)===o){a?a===1?fa(i=$m(ir(i),e),e,t,n,r,s,2):a===2&&Qm(i,e,t,n,r,s):fa(ir(i),e,t,n,r,s,1);break}}}function Km(i){let e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),u=Math.min(o,l,c),p=Math.max(r,s,a),d=Math.max(o,l,c),f=n.next;for(;f!==e;){if(f.x>=h&&f.x<=p&&f.y>=u&&f.y<=d&&Hs(r,o,s,l,a,c,f.x,f.y)&&Tt(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function Jm(i,e,t,n){let r=i.prev,s=i,a=i.next;if(Tt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,u=s.y,p=a.y,d=Math.min(o,l,c),f=Math.min(h,u,p),v=Math.max(o,l,c),m=Math.max(h,u,p),g=Lc(d,f,e,t,n),_=Lc(v,m,e,t,n),y=i.prevZ,M=i.nextZ;for(;y&&y.z>=g&&M&&M.z<=_;){if(y.x>=d&&y.x<=v&&y.y>=f&&y.y<=m&&y!==r&&y!==a&&Hs(o,h,l,u,c,p,y.x,y.y)&&Tt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=d&&M.x<=v&&M.y>=f&&M.y<=m&&M!==r&&M!==a&&Hs(o,h,l,u,c,p,M.x,M.y)&&Tt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=g;){if(y.x>=d&&y.x<=v&&y.y>=f&&y.y<=m&&y!==r&&y!==a&&Hs(o,h,l,u,c,p,y.x,y.y)&&Tt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=_;){if(M.x>=d&&M.x<=v&&M.y>=f&&M.y<=m&&M!==r&&M!==a&&Hs(o,h,l,u,c,p,M.x,M.y)&&Tt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function $m(i,e){let t=i;do{let n=t.prev,r=t.next.next;!os(n,r)&&Yp(n,t,t.next,r)&&ma(n,r)&&ma(r,n)&&(e.push(n.i,t.i,r.i),ga(t),ga(t.next),t=i=r),t=t.next}while(t!==i);return ir(t)}function Qm(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&rg(a,o)){let l=Zp(a,o);return a=ir(a,a.next),l=ir(l,l.next),fa(a,e,t,n,r,s,0),void fa(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function eg(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function tg(i,e){let t=(function(r,s){let a=s,o=r.x,l=r.y,c,h=-1/0;if(os(r,a))return a;do{if(os(r,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let v=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,c=a.x<a.next.x?a:a.next,v===o))return c}a=a.next}while(a!==s);if(!c)return null;let u=c,p=c.x,d=c.y,f=1/0;a=c;do{if(o>=a.x&&a.x>=p&&o!==a.x&&qp(l<d?o:h,l,p,d,l<d?h:o,l,a.x,a.y)){let v=Math.abs(l-a.y)/(o-a.x);ma(a,r)&&(v<f||v===f&&(a.x>c.x||a.x===c.x&&ng(c,a)))&&(c=a,f=v)}a=a.next}while(a!==u);return c})(i,e);if(!t)return e;let n=Zp(t,i);return ir(n,n.next),ir(t,t.next)}function ng(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function Lc(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function ig(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function qp(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Hs(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&qp(i,e,t,n,r,s,a,o)}function rg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!(function(t,n){let r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==n.i&&r.next.i!==n.i&&Yp(r,r.next,t,n))return!0;r=r.next}while(r!==t);return!1})(i,e)&&(ma(i,e)&&ma(e,i)&&(function(t,n){let r=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&a<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(s=!s),r=r.next;while(r!==t);return s})(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||os(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function os(i,e){return i.x===e.x&&i.y===e.y}function Yp(i,e,t,n){let r=_o(Tt(i,e,t)),s=_o(Tt(i,e,n)),a=_o(Tt(t,n,i)),o=_o(Tt(t,n,e));return r!==s&&a!==o||!(r!==0||!vo(i,t,e))||!(s!==0||!vo(i,n,e))||!(a!==0||!vo(t,i,n))||!(o!==0||!vo(t,e,n))}function vo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function _o(i){return i>0?1:i<0?-1:0}function ma(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function Zp(i,e){let t=Dc(i.i,i.x,i.y),n=Dc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Hd(i,e,t,n){let r=Dc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ga(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Dc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Nc=class{static triangulate(e,t,n=2){return Zm(e,t,n)}},Gn=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Vd(e),Wd(n,e);let a=e.length;t.forEach(Vd);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Wd(n,t[l]);let o=Nc.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Vd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Wd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var rr=class i extends ut{constructor(e=new jn([new oe(.5,.5),new oe(-.5,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,p=t.bevelEnabled===void 0||t.bevelEnabled,d=t.bevelThickness!==void 0?t.bevelThickness:.2,f=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:sg,y,M,E,R,b,I=!1;g&&(y=g.getSpacedPoints(h),I=!0,p=!1,M=g.computeFrenetFrames(h,!1),E=new A,R=new A,b=new A),p||(m=0,d=0,f=0,v=0);let P=o.extractPoints(c),B=P.shape,F=P.holes;if(!Gn.isClockWise(B)){B=B.reverse();for(let D=0,x=F.length;D<x;D++){let C=F[D];Gn.isClockWise(C)&&(F[D]=C.reverse())}}function N(D){let x=10000000000000001e-36,C=D[0];for(let U=1;U<=D.length;U++){let L=U%D.length,q=D[L],G=q.x-C.x,W=q.y-C.y,se=G*G+W*W,ge=Math.max(Math.abs(q.x),Math.abs(q.y),Math.abs(C.x),Math.abs(C.y));se<=x*ge*ge?(D.splice(L,1),U--):C=q}}N(B),F.forEach(N);let K=F.length,H=B;for(let D=0;D<K;D++){let x=F[D];B=B.concat(x)}function Z(D,x,C){return x||console.error("THREE.ExtrudeGeometry: vec does not exist"),D.clone().addScaledVector(x,C)}let Q=B.length;function ce(D,x,C){let U,L,q,G=D.x-x.x,W=D.y-x.y,se=C.x-D.x,ge=C.y-D.y,he=G*G+W*W,Ee=G*ge-W*se;if(Math.abs(Ee)>Number.EPSILON){let Ae=Math.sqrt(he),Ce=Math.sqrt(se*se+ge*ge),We=x.x-W/Ae,qe=x.y+G/Ae,rt=((C.x-ge/Ce-We)*ge-(C.y+se/Ce-qe)*se)/(G*ge-W*se);U=We+G*rt-D.x,L=qe+W*rt-D.y;let _e=U*U+L*L;if(_e<=2)return new oe(U,L);q=Math.sqrt(_e/2)}else{let Ae=!1;G>Number.EPSILON?se>Number.EPSILON&&(Ae=!0):G<-Number.EPSILON?se<-Number.EPSILON&&(Ae=!0):Math.sign(W)===Math.sign(ge)&&(Ae=!0),Ae?(U=-W,L=G,q=Math.sqrt(he)):(U=G,L=W,q=Math.sqrt(he/2))}return new oe(U/q,L/q)}let J=[];for(let D=0,x=H.length,C=x-1,U=D+1;D<x;D++,C++,U++)C===x&&(C=0),U===x&&(U=0),J[D]=ce(H[D],H[C],H[U]);let de=[],ve,be,we=J.concat();for(let D=0,x=K;D<x;D++){let C=F[D];ve=[];for(let U=0,L=C.length,q=L-1,G=U+1;U<L;U++,q++,G++)q===L&&(q=0),G===L&&(G=0),ve[U]=ce(C[U],C[q],C[G]);de.push(ve),we=we.concat(ve)}if(m===0)be=Gn.triangulateShape(H,F);else{let D=[],x=[];for(let C=0;C<m;C++){let U=C/m,L=d*Math.cos(U*Math.PI/2),q=f*Math.sin(U*Math.PI/2)+v;for(let G=0,W=H.length;G<W;G++){let se=Z(H[G],J[G],q);De(se.x,se.y,-L),U===0&&D.push(se)}for(let G=0,W=K;G<W;G++){let se=F[G];ve=de[G];let ge=[];for(let he=0,Ee=se.length;he<Ee;he++){let Ae=Z(se[he],ve[he],q);De(Ae.x,Ae.y,-L),U===0&&ge.push(Ae)}U===0&&x.push(ge)}}be=Gn.triangulateShape(D,x)}let re=be.length,ue=f+v;for(let D=0;D<Q;D++){let x=p?Z(B[D],we[D],ue):B[D];I?(R.copy(M.normals[0]).multiplyScalar(x.x),E.copy(M.binormals[0]).multiplyScalar(x.y),b.copy(y[0]).add(R).add(E),De(b.x,b.y,b.z)):De(x.x,x.y,0)}for(let D=1;D<=h;D++)for(let x=0;x<Q;x++){let C=p?Z(B[x],we[x],ue):B[x];I?(R.copy(M.normals[D]).multiplyScalar(C.x),E.copy(M.binormals[D]).multiplyScalar(C.y),b.copy(y[D]).add(R).add(E),De(b.x,b.y,b.z)):De(C.x,C.y,u/h*D)}for(let D=m-1;D>=0;D--){let x=D/m,C=d*Math.cos(x*Math.PI/2),U=f*Math.sin(x*Math.PI/2)+v;for(let L=0,q=H.length;L<q;L++){let G=Z(H[L],J[L],U);De(G.x,G.y,u+C)}for(let L=0,q=F.length;L<q;L++){let G=F[L];ve=de[L];for(let W=0,se=G.length;W<se;W++){let ge=Z(G[W],ve[W],U);I?De(ge.x,ge.y+y[h-1].y,y[h-1].x+C):De(ge.x,ge.y,u+C)}}}function ne(D,x){let C=D.length;for(;--C>=0;){let U=C,L=C-1;L<0&&(L=D.length-1);for(let q=0,G=h+2*m;q<G;q++){let W=Q*q,se=Q*(q+1);T(x+U+W,x+L+W,x+L+se,x+U+se)}}}function De(D,x,C){l.push(D),l.push(x),l.push(C)}function He(D,x,C){S(D),S(x),S(C);let U=r.length/3,L=_.generateTopUV(n,r,U-3,U-2,U-1);z(L[0]),z(L[1]),z(L[2])}function T(D,x,C,U){S(D),S(x),S(U),S(x),S(C),S(U);let L=r.length/3,q=_.generateSideWallUV(n,r,L-6,L-3,L-2,L-1);z(q[0]),z(q[1]),z(q[3]),z(q[1]),z(q[2]),z(q[3])}function S(D){r.push(l[3*D+0]),r.push(l[3*D+1]),r.push(l[3*D+2])}function z(D){s.push(D.x),s.push(D.y)}(function(){let D=r.length/3;if(p){let x=0,C=Q*x;for(let U=0;U<re;U++){let L=be[U];He(L[2]+C,L[1]+C,L[0]+C)}x=h+2*m,C=Q*x;for(let U=0;U<re;U++){let L=be[U];He(L[0]+C,L[1]+C,L[2]+C)}}else{for(let x=0;x<re;x++){let C=be[x];He(C[2],C[1],C[0])}for(let x=0;x<re;x++){let C=be[x];He(C[0]+Q*h,C[1]+Q*h,C[2]+Q*h)}}n.addGroup(D,r.length/3-D,0)})(),(function(){let D=r.length/3,x=0;ne(H,x),x+=H.length;for(let C=0,U=F.length;C<U;C++){let L=F[C];ne(L,x),x+=L.length}n.addGroup(D,r.length/3-D,1)})()}this.setAttribute("position",new Oe(r,3)),this.setAttribute("uv",new Oe(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,r){if(r.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];r.shapes.push(o.uuid)}else r.shapes.push(t.uuid);return r.options=Object.assign({},n),n.extrudePath!==void 0&&(r.options.extrudePath=n.extrudePath.toJSON()),r})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Bo[r.type]().fromJSON(r)),new i(n,e.options)}},sg={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new oe(s,a),new oe(o,l),new oe(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],p=e[3*r],d=e[3*r+1],f=e[3*r+2],v=e[3*s],m=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new oe(a,1-l),new oe(c,1-u),new oe(p,1-f),new oe(v,1-g)]:[new oe(o,1-l),new oe(h,1-u),new oe(d,1-f),new oe(m,1-g)]}},ko=class i extends Bi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},zo=class i extends ut{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Ze(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new A,p=new oe,d=new A,f=new A,v=new A,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=1*g,d.y=-m,d.z=0*g,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=1*g,d.y=-m,d.z=0*g,f.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(f)}for(let _=0;_<=t;_++){let y=n+_*h*r,M=Math.sin(y),E=Math.cos(y);for(let R=0;R<=e.length-1;R++){u.x=e[R].x*M,u.y=e[R].y,u.z=e[R].x*E,a.push(u.x,u.y,u.z),p.x=_/t,p.y=R/(e.length-1),o.push(p.x,p.y);let b=l[3*R+0]*M,I=l[3*R+1],P=l[3*R+0]*E;c.push(b,I,P)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let M=y+_*e.length,E=M,R=M+e.length,b=M+e.length+1,I=M+1;s.push(E,R,I),s.push(b,I,R)}this.setIndex(s),this.setAttribute("position",new Oe(a,3)),this.setAttribute("uv",new Oe(o,2)),this.setAttribute("normal",new Oe(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},qn=class i extends Bi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},on=class i extends ut{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,u=e/o,p=t/l,d=[],f=[],v=[],m=[];for(let g=0;g<h;g++){let _=g*p-a;for(let y=0;y<c;y++){let M=y*u-s;f.push(M,-_,0),v.push(0,0,1),m.push(y/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let y=_+c*g,M=_+c*(g+1),E=_+1+c*(g+1),R=_+1+c*g;d.push(y,M,R),d.push(M,E,R)}this.setIndex(d),this.setAttribute("position",new Oe(f,3)),this.setAttribute("normal",new Oe(v,3)),this.setAttribute("uv",new Oe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Go=class i extends ut{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,p=(t-e)/(r=Math.max(1,r)),d=new A,f=new oe;for(let v=0;v<=r;v++){for(let m=0;m<=n;m++){let g=s+m/n*a;d.x=u*Math.cos(g),d.y=u*Math.sin(g),l.push(d.x,d.y,d.z),c.push(0,0,1),f.x=(d.x/t+1)/2,f.y=(d.y/t+1)/2,h.push(f.x,f.y)}u+=p}for(let v=0;v<r;v++){let m=v*(n+1);for(let g=0;g<n;g++){let _=g+m,y=_,M=_+n+1,E=_+n+2,R=_+1;o.push(y,M,R),o.push(M,E,R)}}this.setIndex(o),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},sr=class i extends ut{constructor(e=new jn([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=r.length/3,p=h.extractPoints(t),d=p.shape,f=p.holes;Gn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=f.length;m<g;m++){let _=f[m];Gn.isClockWise(_)===!0&&(f[m]=_.reverse())}let v=Gn.triangulateShape(d,f);for(let m=0,g=f.length;m<g;m++){let _=f[m];d=d.concat(_)}for(let m=0,g=d.length;m<g;m++){let _=d[m];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=v.length;m<g;m++){let _=v[m],y=_[0]+u,M=_[1]+u,E=_[2]+u;n.push(y,M,E),l+=3}}this.setIndex(n),this.setAttribute("position",new Oe(r,3)),this.setAttribute("normal",new Oe(s,3)),this.setAttribute("uv",new Oe(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let r=0,s=t.length;r<s;r++){let a=t[r];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}},ar=class i extends ut{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new A,p=new A,d=[],f=[],v=[],m=[];for(let g=0;g<=n;g++){let _=[],y=g/n,M=0;g===0&&a===0?M=.5/t:g===n&&l===Math.PI&&(M=-.5/t);for(let E=0;E<=t;E++){let R=E/t;u.x=-e*Math.cos(r+R*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(r+R*s)*Math.sin(a+y*o),f.push(u.x,u.y,u.z),p.copy(u).normalize(),v.push(p.x,p.y,p.z),m.push(R+M,1-y),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],M=h[g][_],E=h[g+1][_],R=h[g+1][_+1];(g!==0||a>0)&&d.push(y,M,R),(g!==n-1||l<Math.PI)&&d.push(M,E,R)}this.setIndex(d),this.setAttribute("position",new Oe(f,3)),this.setAttribute("normal",new Oe(v,3)),this.setAttribute("uv",new Oe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ho=class i extends Bi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},or=class i extends ut{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],h=new A,u=new A,p=new A;for(let d=0;d<=n;d++)for(let f=0;f<=r;f++){let v=f/r*s,m=d/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(f/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let f=1;f<=r;f++){let v=(r+1)*d+f-1,m=(r+1)*(d-1)+f-1,g=(r+1)*(d-1)+f,_=(r+1)*d+f;a.push(v,m,_),a.push(m,g,_)}this.setIndex(a),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Vo=class i extends ut{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],u=new A,p=new A,d=new A,f=new A,v=new A,m=new A,g=new A;for(let y=0;y<=n;++y){let M=y/n*s*Math.PI*2;_(M,s,a,e,d),_(M+.01,s,a,e,f),m.subVectors(f,d),g.addVectors(f,d),v.crossVectors(m,g),g.crossVectors(v,m),v.normalize(),g.normalize();for(let E=0;E<=r;++E){let R=E/r*Math.PI*2,b=-t*Math.cos(R),I=t*Math.sin(R);u.x=d.x+(b*g.x+I*v.x),u.y=d.y+(b*g.y+I*v.y),u.z=d.z+(b*g.z+I*v.z),l.push(u.x,u.y,u.z),p.subVectors(u,d).normalize(),c.push(p.x,p.y,p.z),h.push(y/n),h.push(E/r)}}for(let y=1;y<=n;y++)for(let M=1;M<=r;M++){let E=(r+1)*(y-1)+(M-1),R=(r+1)*y+(M-1),b=(r+1)*y+M,I=(r+1)*(y-1)+M;o.push(E,R,I),o.push(R,b,I)}function _(y,M,E,R,b){let I=Math.cos(y),P=Math.sin(y),B=E/M*y,F=Math.cos(B);b.x=R*(2+F)*.5*I,b.y=R*(2+F)*P*.5,b.z=R*Math.sin(B)*.5}this.setIndex(o),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},ls=class i extends ut{constructor(e=new ua(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new A,l=new A,c=new oe,h=new A,u=[],p=[],d=[],f=[];function v(m){h=e.getPointAt(m/t,h);let g=a.normals[m],_=a.binormals[m];for(let y=0;y<=r;y++){let M=y/r*Math.PI*2,E=Math.sin(M),R=-Math.cos(M);l.x=R*g.x+E*_.x,l.y=R*g.y+E*_.y,l.z=R*g.z+E*_.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let m=0;m<t;m++)v(m);v(s===!1?t:0),(function(){for(let m=0;m<=t;m++)for(let g=0;g<=r;g++)c.x=m/t,c.y=g/r,d.push(c.x,c.y)})(),(function(){for(let m=1;m<=t;m++)for(let g=1;g<=r;g++){let _=(r+1)*(m-1)+(g-1),y=(r+1)*m+(g-1),M=(r+1)*m+g,E=(r+1)*(m-1)+g;f.push(_,y,E),f.push(y,M,E)}})()})(),this.setIndex(f),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(p,3)),this.setAttribute("uv",new Oe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Bo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Wo=class extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new A,s=new A;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],p=u.start;for(let d=p,f=p+u.count;d<f;d+=3)for(let v=0;v<3;v++){let m=o.getX(d+v),g=o.getX(d+(v+1)%3);r.fromBufferAttribute(a,m),s.fromBufferAttribute(a,g),Xd(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Xd(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Oe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Xd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var Vv=Object.freeze({__proto__:null,BoxGeometry:Pn,CapsuleGeometry:Io,CircleGeometry:rs,ConeGeometry:Po,CylinderGeometry:Xn,DodecahedronGeometry:Lo,EdgesGeometry:Do,ExtrudeGeometry:rr,IcosahedronGeometry:ko,LatheGeometry:zo,OctahedronGeometry:qn,PlaneGeometry:on,PolyhedronGeometry:Bi,RingGeometry:Go,ShapeGeometry:sr,SphereGeometry:ar,TetrahedronGeometry:Ho,TorusGeometry:or,TorusKnotGeometry:Vo,TubeGeometry:ls,WireframeGeometry:Wo});var _t=class extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},gt=class extends _t{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Xo=class extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jo=class extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var va=class extends yi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function yo(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function ag(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function og(i){let e=i.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,r){return i[n]-i[r]}),t}function jd(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function Kp(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}var xi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},qo=class extends xi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ec,endingEnd:Ec}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ac:s=e,o=2*t-n;break;case Rc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ac:a=e,l=2*n-t;break;case Rc:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,d=this._weightNext,f=(n-t)/(r-t),v=f*f,m=v*f,g=-p*m+2*p*v-p*f,_=(1+p)*m+(-1.5-2*p)*v+(-.5+p)*f+1,y=(-1-d)*m+(1.5+d)*v+.5*f,M=d*m-d*v;for(let E=0;E!==o;++E)s[E]=g*a[h+E]+_*a[c+E]+y*a[l+E]+M*a[u+E];return s}},Yo=class extends xi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),u=1-h;for(let p=0;p!==o;++p)s[p]=a[c+p]*u+a[l+p]*h;return s}},Zo=class extends xi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},nn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=yo(t,this.TimeBufferType),this.values=yo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:yo(e.times,Array),values:yo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case er:t=this.InterpolantFactoryMethodDiscrete;break;case tr:t=this.InterpolantFactoryMethodLinear;break;case xo:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return er;case this.InterpolantFactoryMethodLinear:return tr;case this.InterpolantFactoryMethodSmooth:return xo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&ag(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===xo,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,u=h-n,p=h+n;for(let d=0;d!==n;++d){let f=t[h+d];if(f!==t[u+d]||f!==t[p+d]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};nn.prototype.ValueTypeName="",nn.prototype.TimeBufferType=Float32Array,nn.prototype.ValueBufferType=Float32Array,nn.prototype.DefaultInterpolation=tr;var fi=class extends nn{constructor(e,t,n){super(e,t,n)}};fi.prototype.ValueTypeName="bool",fi.prototype.ValueBufferType=Array,fi.prototype.DefaultInterpolation=er,fi.prototype.InterpolantFactoryMethodLinear=void 0,fi.prototype.InterpolantFactoryMethodSmooth=void 0;var _a=class extends nn{constructor(e,t,n,r){super(e,t,n,r)}};_a.prototype.ValueTypeName="color";var Yn=class extends nn{constructor(e,t,n,r){super(e,t,n,r)}};Yn.prototype.ValueTypeName="number";var Ko=class extends xi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)sn.slerpFlat(s,0,a,c-o,a,c,l);return s}},Zn=class extends nn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ko(this.times,this.values,this.getValueSize(),e)}};Zn.prototype.ValueTypeName="quaternion",Zn.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends nn{constructor(e,t,n){super(e,t,n)}};mi.prototype.ValueTypeName="string",mi.prototype.ValueBufferType=Array,mi.prototype.DefaultInterpolation=er,mi.prototype.InterpolantFactoryMethodLinear=void 0,mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends nn{constructor(e,t,n,r){super(e,t,n,r)}};Kn.prototype.ValueTypeName="vector";var ya=class{constructor(e="",t=-1,n=[],r=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=vn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(lg(n[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(nn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=og(l);l=jd(l,1,h),c=jd(c,1,h),r||l[0]!==0||(l.push(s),c.push(c[0])),a.push(new Yn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],p=r[u];p||(r[u]=p=[]),p.push(c)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,p,d,f){if(p.length!==0){let v=[],m=[];Kp(p,v,m,d),v.length!==0&&f.push(new h(u,v,m))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let u=c[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let p={},d;for(d=0;d<u.length;d++)if(u[d].morphTargets)for(let f=0;f<u[d].morphTargets.length;f++)p[u[d].morphTargets[f]]=-1;for(let f in p){let v=[],m=[];for(let g=0;g!==u[d].morphTargets.length;++g){let _=u[d];v.push(_.time),m.push(_.morphTarget===f?1:0)}r.push(new Yn(".morphTargetInfluence["+f+"]",v,m))}l=p.length*a}else{let p=".bones["+t[h].name+"]";n(Kn,p+".position",u,"pos",r),n(Zn,p+".quaternion",u,"rot",r),n(Kn,p+".scale",u,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let r=this.tracks[t];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function lg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Yn;case"vector":case"vector2":case"vector3":case"vector4":return Kn;case"color":return _a;case"quaternion":return Zn;case"bool":case"boolean":return fi;case"string":return mi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(i.type);if(i.times===void 0){let t=[],n=[];Kp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Hn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Jo=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=c.length;u<p;u+=2){let d=c[u],f=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return f}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Jp=new Jo,Jn=class{constructor(e){this.manager=e!==void 0?e:Jp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Jn.DEFAULT_MATERIAL_NAME="__DEFAULT";var di={},Uc=class extends Error{constructor(e,t){super(e),this.response=t}},cs=class extends Jn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Hn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(di[e]!==void 0)return void di[e].push({onLoad:t,onProgress:n,onError:r});di[e]=[],di[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=di[e],u=c.body.getReader(),p=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=p?parseInt(p):0,f=d!==0,v=0,m=new ReadableStream({start(g){(function _(){u.read().then(({done:y,value:M})=>{if(y)g.close();else{v+=M.byteLength;let E=new ProgressEvent("progress",{lengthComputable:f,loaded:v,total:d});for(let R=0,b=h.length;R<b;R++){let I=h[R];I.onProgress&&I.onProgress(E)}g.enqueue(M),_()}},y=>{g.error(y)})})()}});return new Response(m)}throw new Uc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(u);return c.arrayBuffer().then(d=>p.decode(d))}}}).then(c=>{Hn.add(`file:${e}`,c);let h=di[e];delete di[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=di[e];if(h===void 0)throw this.manager.itemError(e),c;delete di[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Vr=new WeakMap,$o=class extends Jn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Hn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Vr.get(a);u===void 0&&(u=[],Vr.set(a,u)),u.push({onLoad:t,onError:r})}return a}let o=qr("img");function l(){h(),t&&t(this);let u=Vr.get(this)||[];for(let p=0;p<u.length;p++){let d=u[p];d.onLoad&&d.onLoad(this)}Vr.delete(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),Hn.remove(`image:${e}`);let p=Vr.get(this)||[];for(let d=0;d<p.length;d++){let f=p[d];f.onError&&f.onError(u)}Vr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Hn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var lr=class extends Jn{constructor(e){super(e)}load(e,t,n,r){let s=new Bt,a=new $o(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},cr=class extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},xa=class extends cr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Mc=new Ue,qd=new A,Yd=new A,Ma=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=ei,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Oi,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;qd.setFromMatrixPosition(e.matrixWorld),t.position.copy(qd),Yd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yd),t.updateMatrixWorld(),Mc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Oc=class extends Ma{constructor(){super(new Lt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*nr*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&r===t.aspect&&s===t.far||(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ba=class extends cr{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Oc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Zd=new Ue,Gs=new A,bc=new A,Bc=class extends Ma{constructor(){super(new Lt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new oe(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Gs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gs),bc.copy(n.position),bc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(bc),n.updateMatrixWorld(),r.makeTranslation(-Gs.x,-Gs.y,-Gs.z),Zd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zd,n.coordinateSystem,n.reversedDepth)}},hr=class extends cr{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Bc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ur=class extends Jr{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fc=class extends Ma{constructor(){super(new ur(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},dr=class extends cr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Fc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Mi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Sc=new WeakMap,Sa=class extends Jn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Hn.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(c=>{if(Sc.has(a)!==!0)return t&&t(c),s.manager.itemEnd(e),c;r&&r(Sc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Hn.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){r&&r(c),Sc.set(l,c),Hn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Hn.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Wv=new Ue,Xv=new Ue,jv=new Ue;var Qo=class extends Lt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var qv=new A,Yv=new sn,Zv=new A,Kv=new A,Jv=new A;var $v=new A,Qv=new sn,e_=new A,t_=new A;var Dh="\\[\\]\\.:\\/",cg=new RegExp("["+Dh+"]","g"),Tc="[^"+Dh+"]",hg="[^"+Dh.replace("\\.","")+"]",ug=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Tc)+/(WCOD+)?/.source.replace("WCOD",hg)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tc)+"$"),dg=["material","materials","bones","map"],mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(cg,"")}static parseTrackName(e){let t=ug.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);dg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=class{constructor(i,e,t){let n=t||mt.parseTrackName(e);this._targetGroup=i,this._bindings=i.subscribe_(e,n)}getValue(i,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(i,e)}setValue(i,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=t.length;n!==r;++n)t[n].setValue(i,e)}bind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].bind()}unbind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].unbind()}},mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray],mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var n_=new Float32Array(1);var Kd=new Ue,Ta=class{constructor(e,t,n=0,r=1/0){this.ray=new Ni(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Kd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Kd),this}intersectObject(e,t=!0,n=[]){return kc(e,this,n,t),n.sort(Jd),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)kc(e[r],this,n,t);return n.sort(Jd),n}};function Jd(i,e){return i.distance-e.distance}function kc(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)kc(s[a],e,t,!0)}}var i_=new oe;var r_=new A,s_=new A,a_=new A,o_=new A,l_=new A,c_=new A,h_=new A;var u_=new A;var d_=new A,p_=new Ue,f_=new Ue;var m_=new A,g_=new Le,v_=new Le;var __=new A,y_=new A,x_=new A;var M_=new A,b_=new Jr;var S_=new Xt;var T_=new A;function Nh(i,e,t,n){let r=(function(s){switch(s){case ei:case jc:return{byteLength:1,components:1};case ps:case qc:case fs:return{byteLength:2,components:1};case dl:case pl:return{byteLength:2,components:4};case mr:case ul:case yn:return{byteLength:4,components:1};case Yc:case Zc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return i*e;case fl:case ml:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case xn:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function bf(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function fg(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),u;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=i.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=i.SHORT;else if(o instanceof Uint32Array)u=i.UNSIGNED_INT;else if(o instanceof Int32Array)u=i.INT;else if(o instanceof Int8Array)u=i.BYTE;else if(o instanceof Uint8Array)u=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=i.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort((u,p)=>u.start-p.start);let h=0;for(let u=1;u<c.length;u++){let p=c[h],d=c[u];d.start<=p.start+p.count+1?p.count=Math.max(p.count,d.start+d.count-p.start):(++h,c[h]=d)}c.length=h+1;for(let u=0,p=c.length;u<p;u++){let d=c[u];i.bufferSubData(o,d.start*l.BYTES_PER_ELEMENT,l,d.start,d.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var Ke={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},me={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},ti={basic:{uniforms:Kt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Kt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Kt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Kt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Kt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Kt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Kt([me.points,me.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Kt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Kt([me.common,me.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Kt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Kt([me.sprite,me.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Kt([me.common,me.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Kt([me.lights,me.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};ti.physical={uniforms:Kt([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};var xl={r:0,b:0,g:0},_r=new In,mg=new Ue;function gg(i,e,t,n,r,s,a){let o=new Le(0),l,c,h=s===!0?0:1,u=null,p=0,d=null;function f(m){let g=m.isScene===!0?m.background:null;return g&&g.isTexture&&(g=(m.backgroundBlurriness>0?t:e).get(g)),g}function v(m,g){m.getRGB(xl,Ph(i)),n.buffers.color.setClear(xl.r,xl.g,xl.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(m,g=1){o.set(m),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,v(o,h)},render:function(m){let g=!1,_=f(m);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(m,g){let _=f(g);_&&(_.isCubeTexture||_.mapping===Aa)?(c===void 0&&(c=new ht(new Pn(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:vr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,M,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),_r.copy(g.backgroundRotation),_r.x*=-1,_r.y*=-1,_r.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(_r.y*=-1,_r.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mg.makeRotationFromEuler(_r)),c.material.toneMapped=ot.getTransfer(_.colorSpace)!==ft,u===_&&p===_.version&&d===i.toneMapping||(c.material.needsUpdate=!0,u=_,p=_.version,d=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ht(new on(2,2),new Ln({name:"BackgroundMaterial",uniforms:vr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=ot.getTransfer(_.colorSpace)!==ft,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&p===_.version&&d===i.toneMapping||(l.material.needsUpdate=!0,u=_,p=_.version,d=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function vg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let _=[],y=[],M=[];for(let E=0;E<t;E++)_[E]=0,y[E]=0,M[E]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:y,attributeDivisors:M,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,y=g.length;_<y;_++)g[_]=0}function u(g){p(g,0)}function p(g,_){let y=s.newAttributes,M=s.enabledAttributes,E=s.attributeDivisors;y[g]=1,M[g]===0&&(i.enableVertexAttribArray(g),M[g]=1),E[g]!==_&&(i.vertexAttribDivisor(g,_),E[g]=_)}function d(){let g=s.newAttributes,_=s.enabledAttributes;for(let y=0,M=_.length;y<M;y++)_[y]!==g[y]&&(i.disableVertexAttribArray(y),_[y]=0)}function f(g,_,y,M,E,R,b){b===!0?i.vertexAttribIPointer(g,_,y,E,R):i.vertexAttribPointer(g,_,y,M,E,R)}function v(){m(),a=!0,s!==r&&(s=r,o(s.object))}function m(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,y,M,E){let R=!1,b=(function(I,P,B){let F=B.wireframe===!0,N=n[I.id];N===void 0&&(N={},n[I.id]=N);let K=N[P.id];K===void 0&&(K={},N[P.id]=K);let H=K[F];return H===void 0&&(H=c(i.createVertexArray()),K[F]=H),H})(M,y,_);s!==b&&(s=b,o(s.object)),R=(function(I,P,B,F){let N=s.attributes,K=P.attributes,H=0,Z=B.getAttributes();for(let Q in Z)if(Z[Q].location>=0){let ce=N[Q],J=K[Q];if(J===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(J=I.instanceColor)),ce===void 0||ce.attribute!==J||J&&ce.data!==J.data)return!0;H++}return s.attributesNum!==H||s.index!==F})(g,M,y,E),R&&(function(I,P,B,F){let N={},K=P.attributes,H=0,Z=B.getAttributes();for(let Q in Z)if(Z[Q].location>=0){let ce=K[Q];ce===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(ce=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(ce=I.instanceColor));let J={};J.attribute=ce,ce&&ce.data&&(J.data=ce.data),N[Q]=J,H++}s.attributes=N,s.attributesNum=H,s.index=F})(g,M,y,E),E!==null&&e.update(E,i.ELEMENT_ARRAY_BUFFER),(R||a)&&(a=!1,(function(I,P,B,F){h();let N=F.attributes,K=B.getAttributes(),H=P.defaultAttributeValues;for(let Z in K){let Q=K[Z];if(Q.location>=0){let ce=N[Z];if(ce===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(ce=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(ce=I.instanceColor)),ce!==void 0){let J=ce.normalized,de=ce.itemSize,ve=e.get(ce);if(ve===void 0)continue;let be=ve.buffer,we=ve.type,re=ve.bytesPerElement,ue=we===i.INT||we===i.UNSIGNED_INT||ce.gpuType===ul;if(ce.isInterleavedBufferAttribute){let ne=ce.data,De=ne.stride,He=ce.offset;if(ne.isInstancedInterleavedBuffer){for(let T=0;T<Q.locationSize;T++)p(Q.location+T,ne.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let T=0;T<Q.locationSize;T++)u(Q.location+T);i.bindBuffer(i.ARRAY_BUFFER,be);for(let T=0;T<Q.locationSize;T++)f(Q.location+T,de/Q.locationSize,we,J,De*re,(He+de/Q.locationSize*T)*re,ue)}else{if(ce.isInstancedBufferAttribute){for(let ne=0;ne<Q.locationSize;ne++)p(Q.location+ne,ce.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ne=0;ne<Q.locationSize;ne++)u(Q.location+ne);i.bindBuffer(i.ARRAY_BUFFER,be);for(let ne=0;ne<Q.locationSize;ne++)f(Q.location+ne,de/Q.locationSize,we,J,de*re,de/Q.locationSize*ne*re,ue)}}else if(H!==void 0){let J=H[Z];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(Q.location,J);break;case 3:i.vertexAttrib3fv(Q.location,J);break;case 4:i.vertexAttrib4fv(Q.location,J);break;default:i.vertexAttrib1fv(Q.location,J)}}}}d()})(g,_,y,M),E!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(E).buffer))},reset:v,resetDefaultState:m,dispose:function(){v();for(let g in n){let _=n[g];for(let y in _){let M=_[y];for(let E in M)l(M[E].object),delete M[E];delete _[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let y in _){let M=_[y];for(let E in M)l(M[E].object),delete M[E];delete _[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let y=n[_];if(y[g.id]===void 0)continue;let M=y[g.id];for(let E in M)l(M[E].object),delete M[E];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:d}}function _g(i,e,t){let n;function r(s,a,o){o!==0&&(i.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){i.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=r,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)r(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function yg(i,e,t,n){let r;function s(p){if(p==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";p="mediump"}return p==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let p=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(p.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(p){return p===xn||n.convert(p)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(p){let d=p===fs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(p!==ei&&n.convert(p)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&p!==yn&&!d)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function xg(i){let e=this,t=null,n=0,r=!1,s=!1,a=new gn,o=new je,l={value:null,needsUpdate:!1};function c(h,u,p,d){let f=h!==null?h.length:0,v=null;if(f!==0){if(v=l.value,d!==!0||v===null){let m=p+4*f,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<m)&&(v=new Float32Array(m));for(let _=0,y=p;_!==f;++_,y+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,y),v[y+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=f,e.numIntersection=0,v}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||n!==0||r;return r=u,n=h.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,p){let d=h.clippingPlanes,f=h.clipIntersection,v=h.clipShadows,m=i.get(h);if(!r||d===null||d.length===0||s&&!v)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,y=m.clippingState||null;l.value=y,y=c(d,u,_,p);for(let M=0;M!==_;++M)y[M]=t[M];m.clippingState=y,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=g}}}function Mg(i){let e=new WeakMap;function t(r,s){return s===zi?r.mapping=us:s===cl&&(r.mapping=pr),r}function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping;if(s===zi||s===cl){if(e.has(r))return t(e.get(r).texture,r.mapping);{let a=r.image;if(a&&a.height>0){let o=new Eo(a.height);return o.fromEquirectangularTexture(i,r),e.set(r,o),r.addEventListener("dispose",n),t(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}var $p=[.125,.215,.35,.446,.526,.582],Pa=20,Uh=new ur,Qp=new Le,Oh=null,Bh=0,Fh=0,kh=!1,xr=(1+Math.sqrt(5))/2,vs=1/xr,ef=[new A(-xr,vs,0),new A(xr,vs,0),new A(-vs,0,xr),new A(vs,0,xr),new A(0,xr,-vs),new A(0,xr,vs),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],bg=new A,ys=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=bg}=s;Oh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),Fh=this._renderer.getActiveMipmapLevel(),kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Oh,Bh,Fh),this._renderer.xr.enabled=kh,e.scissorTest=!1,Ml(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),Fh=this._renderer.getActiveMipmapLevel(),kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:fs,format:xn,colorSpace:Wt,depthBuffer:!1},r=tf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tf(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,u=a-4+1+$p.length;for(let p=0;p<u;p++){let d=Math.pow(2,h);l.push(d);let f=1/d;p>a-4?f=$p[p-a+4-1]:p===0&&(f=0),c.push(f);let v=1/(d-2),m=-v,g=1+v,_=[m,m,g,m,g,g,m,m,g,g,m,g],y=6,M=6,E=3,R=2,b=1,I=new Float32Array(E*M*y),P=new Float32Array(R*M*y),B=new Float32Array(b*M*y);for(let N=0;N<y;N++){let K=N%3*2/3-1,H=N>2?0:-1,Z=[K,H,0,K+2/3,H,0,K+2/3,H+1,0,K,H,0,K+2/3,H+1,0,K,H+1,0];I.set(Z,E*M*N),P.set(_,R*M*N);let Q=[N,N,N,N,N,N];B.set(Q,b*M*N)}let F=new ut;F.setAttribute("position",new Dt(I,E)),F.setAttribute("uv",new Dt(P,R)),F.setAttribute("faceIndex",new Dt(B,b)),o.push(F),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(Pa),h=new A(0,1,0);return new Ln({name:"SphericalGaussianBlur",defines:{n:Pa,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Zh(),fragmentShader:`

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
		`,blending:ki,depthTest:!1,depthWrite:!1})})(s,e,t)}return r}_compileMaterial(e){let t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,Uh)}_sceneToCubeUV(e,t,n,r,s){let a=new Lt(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(Qp),c.toneMapping=bi,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let p=new jt({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),d=new ht(new Pn,p),f=!1,v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,f=!0):(p.color.copy(Qp),f=!0);for(let m=0;m<6;m++){let g=m%3;g===0?(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[m],s.y,s.z)):g===1?(a.up.set(0,0,o[m]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[m],s.z)):(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[m]));let _=this._cubeSize;Ml(r,g*_,m>2?_:0,_,_),c.setRenderTarget(r),f&&c.render(d,a),c.render(e,a)}d.geometry.dispose(),d.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===us||e.mapping===pr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=rf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nf());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new ht(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Ml(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Uh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=ef[(r-s-1)%ef.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ht(this._lodPlanes[r],c),u=c.uniforms,p=this._sizeLods[n]-1,d=isFinite(s)?Math.PI/(2*p):2*Math.PI/39,f=s/d,v=isFinite(s)?1+Math.floor(3*f):Pa;v>Pa&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let m=[],g=0;for(let M=0;M<Pa;++M){let E=M/f,R=Math.exp(-E*E/2);m.push(R),M===0?g+=R:M<v&&(g+=2*R)}for(let M=0;M<m.length;M++)m[M]=m[M]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=d,u.mipInt.value=_-n;let y=this._sizeLods[r];Ml(t,3*y*(r>_-4?r-_+4:0),4*(this._cubeSize-y),3*y,2*y),l.setRenderTarget(t),l.render(h,Uh)}};function tf(i,e,t){let n=new Vn(i,e,t);return n.texture.mapping=Aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ml(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function nf(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zh(),fragmentShader:`

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
		`,blending:ki,depthTest:!1,depthWrite:!1})}function rf(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Zh(){return`

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
	`}function Sg(i){let e=new WeakMap,t=null;function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping,a=s===zi||s===cl,o=s===us||s===pr;if(a||o){let l=e.get(r),c=l!==void 0?l.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new ys(i)),l=a?t.fromEquirectangular(r,l):t.fromCubemap(r,l),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),l.texture;if(l!==void 0)return l.texture;{let h=r.image;return a&&h&&h.height>0||o&&h&&(function(u){let p=0,d=6;for(let f=0;f<d;f++)u[f]!==void 0&&p++;return p===d})(h)?(t===null&&(t=new ys(i)),l=a?t.fromEquirectangular(r):t.fromCubemap(r),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),r.addEventListener("dispose",n),l.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Tg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Yr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function wg(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,p=0;if(h!==null){let v=h.array;p=h.version;for(let m=0,g=v.length;m<g;m+=3){let _=v[m+0],y=v[m+1],M=v[m+2];c.push(_,y,y,M,M,_)}}else{if(u===void 0)return;{let v=u.array;p=u.version;for(let m=0,g=v.length/3-1;m<g;m+=3){let _=m+0,y=m+1,M=m+2;c.push(_,y,y,M,M,_)}}}let d=new(Ih(c)?Ks:Zs)(c,1);d.version=p;let f=s.get(l);f&&e.remove(f),s.set(l,d)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Eg(i,e,t){let n,r,s;function a(o,l,c){c!==0&&(i.drawElementsInstanced(n,l,r,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){r=o.type,s=o.bytesPerElement},this.render=function(o,l){i.drawElements(n,l,r,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let p=0;p<o.length;p++)a(o[p]/s,l[p],h[p]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,r,o,0,h,0,c);let p=0;for(let d=0;d<c;d++)p+=l[d]*h[d];t.update(p,n,1)}}}function Ag(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Rg(i,e,t){let n=new WeakMap,r=new lt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let I=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",I)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,d=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;p===!0&&(_=1),d===!0&&(_=2),f===!0&&(_=3);let y=a.attributes.position.count*_,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let E=new Float32Array(y*M*4*h),R=new Ys(E,y,M,h);R.type=yn,R.needsUpdate=!0;let b=4*_;for(let P=0;P<h;P++){let B=v[P],F=m[P],N=g[P],K=y*M*4*P;for(let H=0;H<B.count;H++){let Z=H*b;p===!0&&(r.fromBufferAttribute(B,H),E[K+Z+0]=r.x,E[K+Z+1]=r.y,E[K+Z+2]=r.z,E[K+Z+3]=0),d===!0&&(r.fromBufferAttribute(F,H),E[K+Z+4]=r.x,E[K+Z+5]=r.y,E[K+Z+6]=r.z,E[K+Z+7]=0),f===!0&&(r.fromBufferAttribute(N,H),E[K+Z+8]=r.x,E[K+Z+9]=r.y,E[K+Z+10]=r.z,E[K+Z+11]=N.itemSize===4?r.w:1)}}u={count:h,texture:R,size:new oe(y,M)},n.set(a,u),a.addEventListener("dispose",I)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let p=0;for(let f=0;f<l.length;f++)p+=l[f];let d=a.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",d),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}}}function Cg(i,e,t,n){let r=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(r.get(c)!==o&&(e.update(c),r.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),r.get(a)!==o&&(t.update(a.instanceMatrix,i.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,i.ARRAY_BUFFER),r.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;r.get(h)!==o&&(h.update(),r.set(h,o))}return c},dispose:function(){r=new WeakMap}}}var Sf=new Bt,sf=new aa(1,1),Tf=new Ys,wf=new To,Ef=new Js,af=[],of=[],lf=new Float32Array(16),cf=new Float32Array(9),hf=new Float32Array(4);function xs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=af[r];if(s===void 0&&(s=new Float32Array(r),af[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Tl(i,e){let t=of[e];t===void 0&&(t=new Int32Array(e),of[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ig(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Pg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function Lg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function Dg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function Ng(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,n))return;hf.set(n),i.uniformMatrix2fv(this.addr,!1,hf),kt(t,n)}}function Ug(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,n))return;cf.set(n),i.uniformMatrix3fv(this.addr,!1,cf),kt(t,n)}}function Og(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,n))return;lf.set(n),i.uniformMatrix4fv(this.addr,!1,lf),kt(t,n)}}function Bg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function kg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function zg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function Gg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Hg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function Vg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function Wg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function Xg(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(sf.compareFunction=Ah,s=sf):s=Sf,t.setTexture2D(e||s,r)}function jg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||wf,r)}function qg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Ef,r)}function Yg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Tf,r)}function Zg(i,e){i.uniform1fv(this.addr,e)}function Kg(i,e){let t=xs(e,this.size,2);i.uniform2fv(this.addr,t)}function Jg(i,e){let t=xs(e,this.size,3);i.uniform3fv(this.addr,t)}function $g(i,e){let t=xs(e,this.size,4);i.uniform4fv(this.addr,t)}function Qg(i,e){let t=xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function e0(i,e){let t=xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function t0(i,e){let t=xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function n0(i,e){i.uniform1iv(this.addr,e)}function i0(i,e){i.uniform2iv(this.addr,e)}function r0(i,e){i.uniform3iv(this.addr,e)}function s0(i,e){i.uniform4iv(this.addr,e)}function a0(i,e){i.uniform1uiv(this.addr,e)}function o0(i,e){i.uniform2uiv(this.addr,e)}function l0(i,e){i.uniform3uiv(this.addr,e)}function c0(i,e){i.uniform4uiv(this.addr,e)}function h0(i,e,t){let n=this.cache,r=e.length,s=Tl(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Sf,s[a])}function u0(i,e,t){let n=this.cache,r=e.length,s=Tl(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||wf,s[a])}function d0(i,e,t){let n=this.cache,r=e.length,s=Tl(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ef,s[a])}function p0(i,e,t){let n=this.cache,r=e.length,s=Tl(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Tf,s[a])}var Gh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(r){switch(r){case 5126:return Ig;case 35664:return Pg;case 35665:return Lg;case 35666:return Dg;case 35674:return Ng;case 35675:return Ug;case 35676:return Og;case 5124:case 35670:return Bg;case 35667:case 35671:return Fg;case 35668:case 35672:return kg;case 35669:case 35673:return zg;case 5125:return Gg;case 36294:return Hg;case 36295:return Vg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Xg;case 35679:case 36299:case 36307:return jg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}})(t.type)}},Hh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(r){switch(r){case 5126:return Zg;case 35664:return Kg;case 35665:return Jg;case 35666:return $g;case 35674:return Qg;case 35675:return e0;case 35676:return t0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return r0;case 35669:case 35673:return s0;case 5125:return a0;case 36294:return o0;case 36295:return l0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return h0;case 35679:case 36299:case 36307:return u0;case 35680:case 36300:case 36308:case 36293:return d0;case 36289:case 36303:case 36311:case 36292:return p0}})(t.type)}},Vh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},zh=/(\w+)(\])?(\[|\.)?/g;function uf(i,e){i.seq.push(e),i.map[e.id]=e}function f0(i,e,t){let n=i.name,r=n.length;for(zh.lastIndex=0;;){let s=zh.exec(n),a=zh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){uf(t,c===void 0?new Gh(o,i,e):new Hh(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new Vh(o),uf(t,h)),t=h}}}var _s=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r);f0(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function df(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var m0=0,pf=new je;function ff(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),p=Math.min(l+6,c.length);for(let d=u;d<p;d++){let f=d+1;h.push(`${f===l?">":" "} ${f}: ${c[d]}`)}return h.join(`
`)})(i.getShaderSource(e),a)}return r}function g0(i,e){let t=(function(n){ot._getMatrix(pf,ot.workingColorSpace,n);let r=`mat3( ${pf.elements.map(s=>s.toFixed(4))} )`;switch(ot.getTransfer(n)){case js:return[r,"LinearTransferOETF"];case ft:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[r,"LinearTransferOETF"]}})(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function v0(i,e){let t;switch(e){case Sp:t="Linear";break;case Tp:t="Reinhard";break;case wp:t="Cineon";break;case ll:t="ACESFilmic";break;case Ap:t="AgX";break;case Rp:t="Neutral";break;case Ep:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bl=new A;function _0(){return ot.getLuminanceCoefficients(bl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${bl.x.toFixed(4)}, ${bl.y.toFixed(4)}, ${bl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function La(i){return i!==""}function mf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wh(i){return i.replace(y0,M0)}var x0=new Map;function M0(i,e){let t=Ke[e];if(t===void 0){let n=x0.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Wh(t)}var b0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vf(i){return i.replace(b0,S0)}function S0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function _f(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function T0(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(F){let N="SHADOWMAP_TYPE_BASIC";return F.shadowMapType===Gc?N="SHADOWMAP_TYPE_PCF":F.shadowMapType===el?N="SHADOWMAP_TYPE_PCF_SOFT":F.shadowMapType===$n&&(N="SHADOWMAP_TYPE_VSM"),N})(t),c=(function(F){let N="ENVMAP_TYPE_CUBE";if(F.envMap)switch(F.envMapMode){case us:case pr:N="ENVMAP_TYPE_CUBE";break;case Aa:N="ENVMAP_TYPE_CUBE_UV"}return N})(t),h=(function(F){let N="ENVMAP_MODE_REFLECTION";return F.envMap&&F.envMapMode===pr&&(N="ENVMAP_MODE_REFRACTION"),N})(t),u=(function(F){let N="ENVMAP_BLENDING_NONE";if(F.envMap)switch(F.combine){case xp:N="ENVMAP_BLENDING_MULTIPLY";break;case Mp:N="ENVMAP_BLENDING_MIX";break;case bp:N="ENVMAP_BLENDING_ADD"}return N})(t),p=(function(F){let N=F.envMapCubeUVHeight;if(N===null)return null;let K=Math.log2(N)-2,H=1/N;return{texelWidth:1/(3*Math.max(Math.pow(2,K),112)),texelHeight:H,maxMip:K}})(t),d=(function(F){return[F.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",F.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(La).join(`
`)})(t),f=(function(F){let N=[];for(let K in F){let H=F[K];H!==!1&&N.push("#define "+K+" "+H)}return N.join(`
`)})(s),v=r.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(La).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(La).join(`
`),g.length>0&&(g+=`
`)):(m=[_f(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(La).join(`
`),g=[_f(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==bi?v0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,g0("linearToOutputTexel",t.outputColorSpace),_0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(La).join(`
`)),a=Wh(a),a=mf(a,t),a=gf(a,t),o=Wh(o),o=mf(o,t),o=gf(o,t),a=vf(a),o=vf(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+m+a,M=_+g+o,E=df(r,r.VERTEX_SHADER,y),R=df(r,r.FRAGMENT_SHADER,M);function b(F){if(i.debug.checkShaderErrors){let N=r.getProgramInfoLog(v)||"",K=r.getShaderInfoLog(E)||"",H=r.getShaderInfoLog(R)||"",Z=N.trim(),Q=K.trim(),ce=H.trim(),J=!0,de=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,E,R);else{let ve=ff(r,E,"vertex"),be=ff(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+Z+`
`+ve+`
`+be)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):Q!==""&&ce!==""||(de=!1);de&&(F.diagnostics={runnable:J,programLog:Z,vertexShader:{log:Q,prefix:m},fragmentShader:{log:ce,prefix:g}})}r.deleteShader(E),r.deleteShader(R),I=new _s(r,v),P=(function(N,K){let H={},Z=N.getProgramParameter(K,N.ACTIVE_ATTRIBUTES);for(let Q=0;Q<Z;Q++){let ce=N.getActiveAttrib(K,Q),J=ce.name,de=1;ce.type===N.FLOAT_MAT2&&(de=2),ce.type===N.FLOAT_MAT3&&(de=3),ce.type===N.FLOAT_MAT4&&(de=4),H[J]={type:ce.type,location:N.getAttribLocation(K,J),locationSize:de}}return H})(r,v)}let I,P;r.attachShader(v,E),r.attachShader(v,R),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),this.getUniforms=function(){return I===void 0&&b(this),I},this.getAttributes=function(){return P===void 0&&b(this),P};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(v,37297)),B},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=m0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=R,this}var w0=0,Xh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new jh(e),t.set(e,n)),n}},jh=class{constructor(e){this.id=w0++,this.code=e,this.usedTimes=0}};function E0(i,e,t,n,r,s,a){let o=new Kr,l=new Xh,c=new Set,h=[],u=r.logarithmicDepthBuffer,p=r.vertexTextures,d=r.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return c.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,g,_,y,M){let E=y.fog,R=M.geometry,b=m.isMeshStandardMaterial?y.environment:null,I=(m.isMeshStandardMaterial?t:e).get(m.envMap||b),P=I&&I.mapping===Aa?I.image.height:null,B=f[m.type];m.precision!==null&&(d=r.getMaxPrecision(m.precision),d!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",d,"instead."));let F=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,N=F!==void 0?F.length:0,K,H,Z,Q,ce=0;if(R.morphAttributes.position!==void 0&&(ce=1),R.morphAttributes.normal!==void 0&&(ce=2),R.morphAttributes.color!==void 0&&(ce=3),B){let Ot=ti[B];K=Ot.vertexShader,H=Ot.fragmentShader}else K=m.vertexShader,H=m.fragmentShader,l.update(m),Z=l.getVertexShaderID(m),Q=l.getFragmentShaderID(m);let J=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),ve=M.isInstancedMesh===!0,be=M.isBatchedMesh===!0,we=!!m.map,re=!!m.matcap,ue=!!I,ne=!!m.aoMap,De=!!m.lightMap,He=!!m.bumpMap,T=!!m.normalMap,S=!!m.displacementMap,z=!!m.emissiveMap,D=!!m.metalnessMap,x=!!m.roughnessMap,C=m.anisotropy>0,U=m.clearcoat>0,L=m.dispersion>0,q=m.iridescence>0,G=m.sheen>0,W=m.transmission>0,se=C&&!!m.anisotropyMap,ge=U&&!!m.clearcoatMap,he=U&&!!m.clearcoatNormalMap,Ee=U&&!!m.clearcoatRoughnessMap,Ae=q&&!!m.iridescenceMap,Ce=q&&!!m.iridescenceThicknessMap,We=G&&!!m.sheenColorMap,qe=G&&!!m.sheenRoughnessMap,rt=!!m.specularMap,_e=!!m.specularColorMap,Ne=!!m.specularIntensityMap,Xe=W&&!!m.transmissionMap,bt=W&&!!m.thicknessMap,Re=!!m.gradientMap,tt=!!m.alphaMap,$e=m.alphaTest>0,Ut=!!m.alphaHash,pn=!!m.extensions,O=bi;m.toneMapped&&(J!==null&&J.isXRRenderTarget!==!0||(O=i.toneMapping));let Et={shaderID:B,shaderType:m.type,shaderName:m.name,vertexShader:K,fragmentShader:H,defines:m.defines,customVertexShaderID:Z,customFragmentShaderID:Q,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:d,batching:be,batchingColor:be&&M._colorsTexture!==null,instancing:ve,instancingColor:ve&&M.instanceColor!==null,instancingMorph:ve&&M.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Wt,alphaToCoverage:!!m.alphaToCoverage,map:we,matcap:re,envMap:ue,envMapMode:ue&&I.mapping,envMapCubeUVHeight:P,aoMap:ne,lightMap:De,bumpMap:He,normalMap:T,displacementMap:p&&S,emissiveMap:z,normalMapObjectSpace:T&&m.normalMapType===Up,normalMapTangentSpace:T&&m.normalMapType===Np,metalnessMap:D,roughnessMap:x,anisotropy:C,anisotropyMap:se,clearcoat:U,clearcoatMap:ge,clearcoatNormalMap:he,clearcoatRoughnessMap:Ee,dispersion:L,iridescence:q,iridescenceMap:Ae,iridescenceThicknessMap:Ce,sheen:G,sheenColorMap:We,sheenRoughnessMap:qe,specularMap:rt,specularColorMap:_e,specularIntensityMap:Ne,transmission:W,transmissionMap:Xe,thicknessMap:bt,gradientMap:Re,opaque:m.transparent===!1&&m.blending===wa&&m.alphaToCoverage===!1,alphaMap:tt,alphaTest:$e,alphaHash:Ut,combine:m.combine,mapUv:we&&v(m.map.channel),aoMapUv:ne&&v(m.aoMap.channel),lightMapUv:De&&v(m.lightMap.channel),bumpMapUv:He&&v(m.bumpMap.channel),normalMapUv:T&&v(m.normalMap.channel),displacementMapUv:S&&v(m.displacementMap.channel),emissiveMapUv:z&&v(m.emissiveMap.channel),metalnessMapUv:D&&v(m.metalnessMap.channel),roughnessMapUv:x&&v(m.roughnessMap.channel),anisotropyMapUv:se&&v(m.anisotropyMap.channel),clearcoatMapUv:ge&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:he&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:We&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:qe&&v(m.sheenRoughnessMap.channel),specularMapUv:rt&&v(m.specularMap.channel),specularColorMapUv:_e&&v(m.specularColorMap.channel),specularIntensityMapUv:Ne&&v(m.specularIntensityMap.channel),transmissionMapUv:Xe&&v(m.transmissionMap.channel),thicknessMapUv:bt&&v(m.thicknessMap.channel),alphaMapUv:tt&&v(m.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(T||C),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!R.attributes.uv&&(we||tt),fog:!!E,useFog:m.fog===!0,fogExp2:!!E&&E.isFogExp2,flatShading:m.flatShading===!0&&m.wireframe===!1,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:M.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:ce,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:i.shadowMap.enabled&&_.length>0,shadowMapType:i.shadowMap.type,toneMapping:O,decodeVideoTexture:we&&m.map.isVideoTexture===!0&&ot.getTransfer(m.map.colorSpace)===ft,decodeVideoTextureEmissive:z&&m.emissiveMap.isVideoTexture===!0&&ot.getTransfer(m.emissiveMap.colorSpace)===ft,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===_n,flipSided:m.side===dn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:pn&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pn&&m.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et},getProgramCacheKey:function(m){let g=[];if(m.shaderID?g.push(m.shaderID):(g.push(m.customVertexShaderID),g.push(m.customFragmentShaderID)),m.defines!==void 0)for(let _ in m.defines)g.push(_),g.push(m.defines[_]);return m.isRawShaderMaterial===!1&&((function(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)})(g,m),(function(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,m),g.push(i.outputColorSpace)),g.push(m.customProgramCacheKey),g.join()},getUniforms:function(m){let g=f[m.type],_;if(g){let y=ti[g];_=jp.clone(y.uniforms)}else _=m.uniforms;return _},acquireProgram:function(m,g){let _;for(let y=0,M=h.length;y<M;y++){let E=h[y];if(E.cacheKey===g){_=E,++_.usedTimes;break}}return _===void 0&&(_=new T0(i,g,m,s),h.push(_)),_},releaseProgram:function(m){if(--m.usedTimes===0){let g=h.indexOf(m);h[g]=h[h.length-1],h.pop(),m.destroy()}},releaseShaderCache:function(m){l.remove(m)},programs:h,dispose:function(){l.dispose()}}}function A0(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function R0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function yf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xf(){let i=[],e=0,t=[],n=[],r=[];function s(a,o,l,c,h,u){let p=i[e];return p===void 0?(p={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},i[e]=p):(p.id=a.id,p.object=a,p.geometry=o,p.material=l,p.groupOrder=c,p.renderOrder=a.renderOrder,p.z=h,p.group=u),e++,p}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(a,o,l,c,h,u){let p=s(a,o,l,c,h,u);l.transmission>0?n.push(p):l.transparent===!0?r.push(p):t.push(p)},unshift:function(a,o,l,c,h,u){let p=s(a,o,l,c,h,u);l.transmission>0?n.unshift(p):l.transparent===!0?r.unshift(p):t.unshift(p)},finish:function(){for(let a=e,o=i.length;a<o;a++){let l=i[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||R0),n.length>1&&n.sort(o||yf),r.length>1&&r.sort(o||yf)}}}function C0(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new xf,i.set(e,[r])):t>=n.length?(r=new xf,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function I0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new Le};break;case"SpotLight":t={position:new A,direction:new A,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new A,halfWidth:new A,halfHeight:new A}}return i[e.id]=t,t}}}var P0=0;function L0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function D0(i){let e=new I0,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new A);let r=new A,s=new Ue,a=new Ue;return{setup:function(o){let l=0,c=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,p=0,d=0,f=0,v=0,m=0,g=0,_=0,y=0,M=0,E=0;o.sort(L0);for(let b=0,I=o.length;b<I;b++){let P=o[b],B=P.color,F=P.intensity,N=P.distance,K=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)l+=B.r*F,c+=B.g*F,h+=B.b*F;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],F);E++}else if(P.isDirectionalLight){let H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Z=P.shadow,Q=t.get(P);Q.shadowIntensity=Z.intensity,Q.shadowBias=Z.bias,Q.shadowNormalBias=Z.normalBias,Q.shadowRadius=Z.radius,Q.shadowMapSize=Z.mapSize,n.directionalShadow[u]=Q,n.directionalShadowMap[u]=K,n.directionalShadowMatrix[u]=P.shadow.matrix,m++}n.directional[u]=H,u++}else if(P.isSpotLight){let H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(B).multiplyScalar(F),H.distance=N,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[d]=H;let Z=P.shadow;if(P.map&&(n.spotLightMap[y]=P.map,y++,Z.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[d]=Z.matrix,P.castShadow){let Q=t.get(P);Q.shadowIntensity=Z.intensity,Q.shadowBias=Z.bias,Q.shadowNormalBias=Z.normalBias,Q.shadowRadius=Z.radius,Q.shadowMapSize=Z.mapSize,n.spotShadow[d]=Q,n.spotShadowMap[d]=K,_++}d++}else if(P.isRectAreaLight){let H=e.get(P);H.color.copy(B).multiplyScalar(F),H.halfWidth.set(.5*P.width,0,0),H.halfHeight.set(0,.5*P.height,0),n.rectArea[f]=H,f++}else if(P.isPointLight){let H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){let Z=P.shadow,Q=t.get(P);Q.shadowIntensity=Z.intensity,Q.shadowBias=Z.bias,Q.shadowNormalBias=Z.normalBias,Q.shadowRadius=Z.radius,Q.shadowMapSize=Z.mapSize,Q.shadowCameraNear=Z.camera.near,Q.shadowCameraFar=Z.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=K,n.pointShadowMatrix[p]=P.shadow.matrix,g++}n.point[p]=H,p++}else if(P.isHemisphereLight){let H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(F),H.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[v]=H,v++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let R=n.hash;R.directionalLength===u&&R.pointLength===p&&R.spotLength===d&&R.rectAreaLength===f&&R.hemiLength===v&&R.numDirectionalShadows===m&&R.numPointShadows===g&&R.numSpotShadows===_&&R.numSpotMaps===y&&R.numLightProbes===E||(n.directional.length=u,n.spot.length=d,n.rectArea.length=f,n.point.length=p,n.hemi.length=v,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+y-M,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=E,R.directionalLength=u,R.pointLength=p,R.spotLength=d,R.rectAreaLength=f,R.hemiLength=v,R.numDirectionalShadows=m,R.numPointShadows=g,R.numSpotShadows=_,R.numSpotMaps=y,R.numLightProbes=E,n.version=P0++)},setupView:function(o,l){let c=0,h=0,u=0,p=0,d=0,f=l.matrixWorldInverse;for(let v=0,m=o.length;v<m;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[c];_.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(f),c++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(f),u++}else if(g.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),a.identity(),s.copy(g.matrixWorld),s.premultiply(f),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),h++}else if(g.isHemisphereLight){let _=n.hemi[d];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(f),d++}}},state:n}}function Mf(i){let e=new D0(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){r.camera=s,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function N0(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new Mf(i),e.set(t,[s])):n>=r.length?(s=new Mf(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}function U0(i,e,t){let n=new Oi,r=new oe,s=new oe,a=new lt,o=new Xo({depthPacking:Dp}),l=new jo,c={},h=t.maxTextureSize,u={[Fi]:dn,[dn]:Fi,[_n]:_n},p=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:`void main() {
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
}`}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let f=new ut;f.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ht(f,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gc;let g=this.type;function _(R,b){let I=e.update(v);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Vn(r.x,r.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(b,null,I,p,v,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(b,null,I,d,v,null)}function y(R,b,I,P){let B=null,F=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(F!==void 0)B=F;else if(B=I.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let N=B.uuid,K=b.uuid,H=c[N];H===void 0&&(H={},c[N]=H);let Z=H[K];Z===void 0&&(Z=B.clone(),H[K]=Z,b.addEventListener("dispose",E)),B=Z}return B.visible=b.visible,B.wireframe=b.wireframe,B.side=P===$n?b.shadowSide!==null?b.shadowSide:b.side:b.shadowSide!==null?b.shadowSide:u[b.side],B.alphaMap=b.alphaMap,B.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,B.map=b.map,B.clipShadows=b.clipShadows,B.clippingPlanes=b.clippingPlanes,B.clipIntersection=b.clipIntersection,B.displacementMap=b.displacementMap,B.displacementScale=b.displacementScale,B.displacementBias=b.displacementBias,B.wireframeLinewidth=b.wireframeLinewidth,B.linewidth=b.linewidth,I.isPointLight===!0&&B.isMeshDistanceMaterial===!0&&(i.properties.get(B).light=I),B}function M(R,b,I,P,B){if(R.visible===!1)return;if(R.layers.test(b.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&B===$n)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);let N=e.update(R),K=R.material;if(Array.isArray(K)){let H=N.groups;for(let Z=0,Q=H.length;Z<Q;Z++){let ce=H[Z],J=K[ce.materialIndex];if(J&&J.visible){let de=y(R,J,P,B);R.onBeforeShadow(i,R,b,I,N,de,ce),i.renderBufferDirect(I,null,N,de,R,ce),R.onAfterShadow(i,R,b,I,N,de,ce)}}}else if(K.visible){let H=y(R,K,P,B);R.onBeforeShadow(i,R,b,I,N,H,null),i.renderBufferDirect(I,null,N,H,R,null),R.onAfterShadow(i,R,b,I,N,H,null)}}let F=R.children;for(let N=0,K=F.length;N<K;N++)M(F[N],b,I,P,B)}function E(R){R.target.removeEventListener("dispose",E);for(let b in c){let I=c[b],P=R.target.uuid;P in I&&(I[P].dispose(),delete I[P])}}this.render=function(R,b,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let P=i.getRenderTarget(),B=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),N=i.state;N.setBlending(ki),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let K=g!==$n&&this.type===$n,H=g===$n&&this.type!==$n;for(let Z=0,Q=R.length;Z<Q;Z++){let ce=R[Z],J=ce.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",ce,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;r.copy(J.mapSize);let de=J.getFrameExtents();if(r.multiply(de),s.copy(J.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/de.x),r.x=s.x*de.x,J.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/de.y),r.y=s.y*de.y,J.mapSize.y=s.y)),J.map===null||K===!0||H===!0){let be=this.type!==$n?{minFilter:hn,magFilter:hn}:{};J.map!==null&&J.map.dispose(),J.map=new Vn(r.x,r.y,be),J.map.texture.name=ce.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();let ve=J.getViewportCount();for(let be=0;be<ve;be++){let we=J.getViewport(be);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),N.viewport(a),J.updateMatrices(ce,be),n=J.getFrustum(),M(b,I,J.camera,ce,this.type)}J.isPointLightShadow!==!0&&this.type===$n&&_(J,I),J.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(P,B,F)}}var O0={[tl]:nl,[il]:al,[rl]:ol,[Ea]:sl,[nl]:tl,[al]:il,[ol]:rl,[sl]:Ea};function B0(i,e){let t=new function(){let x=!1,C=new lt,U=null,L=new lt(0,0,0,0);return{setMask:function(q){U===q||x||(i.colorMask(q,q,q,q),U=q)},setLocked:function(q){x=q},setClear:function(q,G,W,se,ge){ge===!0&&(q*=se,G*=se,W*=se),C.set(q,G,W,se),L.equals(C)===!1&&(i.clearColor(q,G,W,se),L.copy(C))},reset:function(){x=!1,U=null,L.set(-1,0,0,0)}}},n=new function(){let x=!1,C=!1,U=null,L=null,q=null;return{setReversed:function(G){if(C!==G){let W=e.get("EXT_clip_control");G?W.clipControlEXT(W.LOWER_LEFT_EXT,W.ZERO_TO_ONE_EXT):W.clipControlEXT(W.LOWER_LEFT_EXT,W.NEGATIVE_ONE_TO_ONE_EXT),C=G;let se=q;q=null,this.setClear(se)}},getReversed:function(){return C},setTest:function(G){G?ue(i.DEPTH_TEST):ne(i.DEPTH_TEST)},setMask:function(G){U===G||x||(i.depthMask(G),U=G)},setFunc:function(G){if(C&&(G=O0[G]),L!==G){switch(G){case tl:i.depthFunc(i.NEVER);break;case nl:i.depthFunc(i.ALWAYS);break;case il:i.depthFunc(i.LESS);break;case Ea:i.depthFunc(i.LEQUAL);break;case rl:i.depthFunc(i.EQUAL);break;case sl:i.depthFunc(i.GEQUAL);break;case al:i.depthFunc(i.GREATER);break;case ol:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}L=G}},setLocked:function(G){x=G},setClear:function(G){q!==G&&(C&&(G=1-G),i.clearDepth(G),q=G)},reset:function(){x=!1,U=null,L=null,q=null,C=!1}}},r=new function(){let x=!1,C=null,U=null,L=null,q=null,G=null,W=null,se=null,ge=null;return{setTest:function(he){x||(he?ue(i.STENCIL_TEST):ne(i.STENCIL_TEST))},setMask:function(he){C===he||x||(i.stencilMask(he),C=he)},setFunc:function(he,Ee,Ae){U===he&&L===Ee&&q===Ae||(i.stencilFunc(he,Ee,Ae),U=he,L=Ee,q=Ae)},setOp:function(he,Ee,Ae){G===he&&W===Ee&&se===Ae||(i.stencilOp(he,Ee,Ae),G=he,W=Ee,se=Ae)},setLocked:function(he){x=he},setClear:function(he){ge!==he&&(i.clearStencil(he),ge=he)},reset:function(){x=!1,C=null,U=null,L=null,q=null,G=null,W=null,se=null,ge=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,p=!1,d=null,f=null,v=null,m=null,g=null,_=null,y=null,M=new Le(0,0,0),E=0,R=!1,b=null,I=null,P=null,B=null,F=null,N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,H=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(Z)[1]),K=H>=1):Z.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),K=H>=2);let Q=null,ce={},J=i.getParameter(i.SCISSOR_BOX),de=i.getParameter(i.VIEWPORT),ve=new lt().fromArray(J),be=new lt().fromArray(de);function we(x,C,U,L){let q=new Uint8Array(4),G=i.createTexture();i.bindTexture(x,G),i.texParameteri(x,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(x,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let W=0;W<U;W++)x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY?i.texImage3D(C,0,i.RGBA,1,1,L,0,i.RGBA,i.UNSIGNED_BYTE,q):i.texImage2D(C+W,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,q);return G}let re={};function ue(x){o[x]!==!0&&(i.enable(x),o[x]=!0)}function ne(x){o[x]!==!1&&(i.disable(x),o[x]=!1)}re[i.TEXTURE_2D]=we(i.TEXTURE_2D,i.TEXTURE_2D,1),re[i.TEXTURE_CUBE_MAP]=we(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[i.TEXTURE_2D_ARRAY]=we(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),re[i.TEXTURE_3D]=we(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ue(i.DEPTH_TEST),n.setFunc(Ea),S(!1),z(zc),ue(i.CULL_FACE),T(ki);let De={[hs]:i.FUNC_ADD,[tp]:i.FUNC_SUBTRACT,[np]:i.FUNC_REVERSE_SUBTRACT};De[ip]=i.MIN,De[rp]=i.MAX;let He={[sp]:i.ZERO,[ap]:i.ONE,[op]:i.SRC_COLOR,[cp]:i.SRC_ALPHA,[mp]:i.SRC_ALPHA_SATURATE,[pp]:i.DST_COLOR,[up]:i.DST_ALPHA,[lp]:i.ONE_MINUS_SRC_COLOR,[hp]:i.ONE_MINUS_SRC_ALPHA,[fp]:i.ONE_MINUS_DST_COLOR,[dp]:i.ONE_MINUS_DST_ALPHA,[gp]:i.CONSTANT_COLOR,[vp]:i.ONE_MINUS_CONSTANT_COLOR,[_p]:i.CONSTANT_ALPHA,[yp]:i.ONE_MINUS_CONSTANT_ALPHA};function T(x,C,U,L,q,G,W,se,ge,he){if(x!==ki){if(p===!1&&(ue(i.BLEND),p=!0),x===ep)q=q||C,G=G||U,W=W||L,C===f&&q===g||(i.blendEquationSeparate(De[C],De[q]),f=C,g=q),U===v&&L===m&&G===_&&W===y||(i.blendFuncSeparate(He[U],He[L],He[G],He[W]),v=U,m=L,_=G,y=W),se.equals(M)!==!1&&ge===E||(i.blendColor(se.r,se.g,se.b,ge),M.copy(se),E=ge),d=x,R=!1;else if(x!==d||he!==R){if(f===hs&&g===hs||(i.blendEquation(i.FUNC_ADD),f=hs,g=hs),he)switch(x){case wa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hc:i.blendFunc(i.ONE,i.ONE);break;case Vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",x)}else switch(x){case wa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Vc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",x)}v=null,m=null,_=null,y=null,M.set(0,0,0),E=0,d=x,R=he}}else p===!0&&(ne(i.BLEND),p=!1)}function S(x){b!==x&&(x?i.frontFace(i.CW):i.frontFace(i.CCW),b=x)}function z(x){x!==$d?(ue(i.CULL_FACE),x!==I&&(x===zc?i.cullFace(i.BACK):x===Qd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ne(i.CULL_FACE),I=x}function D(x,C,U){x?(ue(i.POLYGON_OFFSET_FILL),B===C&&F===U||(i.polygonOffset(C,U),B=C,F=U)):ne(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:ue,disable:ne,bindFramebuffer:function(x,C){return l[x]!==C&&(i.bindFramebuffer(x,C),l[x]=C,x===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=C),x===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=C),!0)},drawBuffers:function(x,C){let U=h,L=!1;if(x){U=c.get(C),U===void 0&&(U=[],c.set(C,U));let q=x.textures;if(U.length!==q.length||U[0]!==i.COLOR_ATTACHMENT0){for(let G=0,W=q.length;G<W;G++)U[G]=i.COLOR_ATTACHMENT0+G;U.length=q.length,L=!0}}else U[0]!==i.BACK&&(U[0]=i.BACK,L=!0);L&&i.drawBuffers(U)},useProgram:function(x){return u!==x&&(i.useProgram(x),u=x,!0)},setBlending:T,setMaterial:function(x,C){x.side===_n?ne(i.CULL_FACE):ue(i.CULL_FACE);let U=x.side===dn;C&&(U=!U),S(U),x.blending===wa&&x.transparent===!1?T(ki):T(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),n.setFunc(x.depthFunc),n.setTest(x.depthTest),n.setMask(x.depthWrite),t.setMask(x.colorWrite);let L=x.stencilWrite;r.setTest(L),L&&(r.setMask(x.stencilWriteMask),r.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),r.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass)),D(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):ne(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:S,setCullFace:z,setLineWidth:function(x){x!==P&&(K&&i.lineWidth(x),P=x)},setPolygonOffset:D,setScissorTest:function(x){x?ue(i.SCISSOR_TEST):ne(i.SCISSOR_TEST)},activeTexture:function(x){x===void 0&&(x=i.TEXTURE0+N-1),Q!==x&&(i.activeTexture(x),Q=x)},bindTexture:function(x,C,U){U===void 0&&(U=Q===null?i.TEXTURE0+N-1:Q);let L=ce[U];L===void 0&&(L={type:void 0,texture:void 0},ce[U]=L),L.type===x&&L.texture===C||(Q!==U&&(i.activeTexture(U),Q=U),i.bindTexture(x,C||re[x]),L.type=x,L.texture=C)},unbindTexture:function(){let x=ce[Q];x!==void 0&&x.type!==void 0&&(i.bindTexture(x.type,null),x.type=void 0,x.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},updateUBOMapping:function(x,C){let U=a.get(C);U===void 0&&(U=new WeakMap,a.set(C,U));let L=U.get(x);L===void 0&&(L=i.getUniformBlockIndex(C,x.name),U.set(x,L))},uniformBlockBinding:function(x,C){let U=a.get(C).get(x);s.get(C)!==U&&(i.uniformBlockBinding(C,U,x.__bindingPointIndex),s.set(C,U))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},scissor:function(x){ve.equals(x)===!1&&(i.scissor(x.x,x.y,x.z,x.w),ve.copy(x))},viewport:function(x){be.equals(x)===!1&&(i.viewport(x.x,x.y,x.z,x.w),be.copy(x))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},Q=null,ce={},l={},c=new WeakMap,h=[],u=null,p=!1,d=null,f=null,v=null,m=null,g=null,_=null,y=null,M=new Le(0,0,0),E=0,R=!1,b=null,I=null,P=null,B=null,F=null,ve.set(0,0,i.canvas.width,i.canvas.height),be.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function F0(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new oe,h=new WeakMap,u,p=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(T,S){return d?new OffscreenCanvas(T,S):qr("canvas")}function v(T,S,z){let D=1,x=He(T);if((x.width>z||x.height>z)&&(D=z/Math.max(x.width,x.height)),D<1){if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let C=Math.floor(D*x.width),U=Math.floor(D*x.height);u===void 0&&(u=f(C,U));let L=S?f(C,U):u;return L.width=C,L.height=U,L.getContext("2d").drawImage(T,0,0,C,U),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+C+"x"+U+")."),L}return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),T}return T}function m(T){return T.generateMipmaps}function g(T){i.generateMipmap(T)}function _(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(T,S,z,D,x=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let C=S;if(S===i.RED&&(z===i.FLOAT&&(C=i.R32F),z===i.HALF_FLOAT&&(C=i.R16F),z===i.UNSIGNED_BYTE&&(C=i.R8)),S===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(C=i.R8UI),z===i.UNSIGNED_SHORT&&(C=i.R16UI),z===i.UNSIGNED_INT&&(C=i.R32UI),z===i.BYTE&&(C=i.R8I),z===i.SHORT&&(C=i.R16I),z===i.INT&&(C=i.R32I)),S===i.RG&&(z===i.FLOAT&&(C=i.RG32F),z===i.HALF_FLOAT&&(C=i.RG16F),z===i.UNSIGNED_BYTE&&(C=i.RG8)),S===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(C=i.RG8UI),z===i.UNSIGNED_SHORT&&(C=i.RG16UI),z===i.UNSIGNED_INT&&(C=i.RG32UI),z===i.BYTE&&(C=i.RG8I),z===i.SHORT&&(C=i.RG16I),z===i.INT&&(C=i.RG32I)),S===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(C=i.RGB8UI),z===i.UNSIGNED_SHORT&&(C=i.RGB16UI),z===i.UNSIGNED_INT&&(C=i.RGB32UI),z===i.BYTE&&(C=i.RGB8I),z===i.SHORT&&(C=i.RGB16I),z===i.INT&&(C=i.RGB32I)),S===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(C=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(C=i.RGBA16UI),z===i.UNSIGNED_INT&&(C=i.RGBA32UI),z===i.BYTE&&(C=i.RGBA8I),z===i.SHORT&&(C=i.RGBA16I),z===i.INT&&(C=i.RGBA32I)),S===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(C=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(C=i.R11F_G11F_B10F)),S===i.RGBA){let U=x?js:ot.getTransfer(D);z===i.FLOAT&&(C=i.RGBA32F),z===i.HALF_FLOAT&&(C=i.RGBA16F),z===i.UNSIGNED_BYTE&&(C=U===ft?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(C=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(C=i.RGB5_A1)}return C!==i.R16F&&C!==i.R32F&&C!==i.RG16F&&C!==i.RG32F&&C!==i.RGBA16F&&C!==i.RGBA32F||e.get("EXT_color_buffer_float"),C}function M(T,S){let z;return T?S===null||S===mr||S===ms?z=i.DEPTH24_STENCIL8:S===yn?z=i.DEPTH32F_STENCIL8:S===ps&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===mr||S===ms?z=i.DEPTH_COMPONENT24:S===yn?z=i.DEPTH_COMPONENT32F:S===ps&&(z=i.DEPTH_COMPONENT16),z}function E(T,S){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==hn&&T.minFilter!==rn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function R(T){let S=T.target;S.removeEventListener("dispose",R),(function(z){let D=n.get(z);if(D.__webglInit===void 0)return;let x=z.source,C=p.get(x);if(C){let U=C[D.__cacheKey];U.usedTimes--,U.usedTimes===0&&I(z),Object.keys(C).length===0&&p.delete(x)}n.remove(z)})(S),S.isVideoTexture&&h.delete(S)}function b(T){let S=T.target;S.removeEventListener("dispose",b),(function(z){let D=n.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),n.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let C=0;C<6;C++){if(Array.isArray(D.__webglFramebuffer[C]))for(let U=0;U<D.__webglFramebuffer[C].length;U++)i.deleteFramebuffer(D.__webglFramebuffer[C][U]);else i.deleteFramebuffer(D.__webglFramebuffer[C]);D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer[C])}else{if(Array.isArray(D.__webglFramebuffer))for(let C=0;C<D.__webglFramebuffer.length;C++)i.deleteFramebuffer(D.__webglFramebuffer[C]);else i.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&i.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let C=0;C<D.__webglColorRenderbuffer.length;C++)D.__webglColorRenderbuffer[C]&&i.deleteRenderbuffer(D.__webglColorRenderbuffer[C]);D.__webglDepthRenderbuffer&&i.deleteRenderbuffer(D.__webglDepthRenderbuffer)}let x=z.textures;for(let C=0,U=x.length;C<U;C++){let L=n.get(x[C]);L.__webglTexture&&(i.deleteTexture(L.__webglTexture),a.memory.textures--),n.remove(x[C])}n.remove(z)})(S)}function I(T){let S=n.get(T);i.deleteTexture(S.__webglTexture);let z=T.source;delete p.get(z)[S.__cacheKey],a.memory.textures--}let P=0;function B(T,S){let z=n.get(T);if(T.isVideoTexture&&(function(D){let x=a.render.frame;h.get(D)!==x&&(h.set(D,x),D.update())})(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){let D=T.image;if(D===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(D.complete!==!1)return void ce(z,T,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+S)}let F={[Qt]:i.REPEAT,[Di]:i.CLAMP_TO_EDGE,[jr]:i.MIRRORED_REPEAT},N={[hn]:i.NEAREST,[hl]:i.NEAREST_MIPMAP_NEAREST,[fr]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[ds]:i.LINEAR_MIPMAP_NEAREST,[Qn]:i.LINEAR_MIPMAP_LINEAR},K={[Op]:i.NEVER,[Hp]:i.ALWAYS,[Bp]:i.LESS,[Ah]:i.LEQUAL,[Fp]:i.EQUAL,[Gp]:i.GEQUAL,[kp]:i.GREATER,[zp]:i.NOTEQUAL};function H(T,S){if(S.type!==yn||e.has("OES_texture_float_linear")!==!1||S.magFilter!==rn&&S.magFilter!==ds&&S.magFilter!==fr&&S.magFilter!==Qn&&S.minFilter!==rn&&S.minFilter!==ds&&S.minFilter!==fr&&S.minFilter!==Qn||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,F[S.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,F[S.wrapT]),T!==i.TEXTURE_3D&&T!==i.TEXTURE_2D_ARRAY||i.texParameteri(T,i.TEXTURE_WRAP_R,F[S.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,N[S.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,N[S.minFilter]),S.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,K[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===hn||S.minFilter!==fr&&S.minFilter!==Qn||S.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Z(T,S){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",R));let D=S.source,x=p.get(D);x===void 0&&(x={},p.set(D,x));let C=(function(U){let L=[];return L.push(U.wrapS),L.push(U.wrapT),L.push(U.wrapR||0),L.push(U.magFilter),L.push(U.minFilter),L.push(U.anisotropy),L.push(U.internalFormat),L.push(U.format),L.push(U.type),L.push(U.generateMipmaps),L.push(U.premultiplyAlpha),L.push(U.flipY),L.push(U.unpackAlignment),L.push(U.colorSpace),L.join()})(S);if(C!==T.__cacheKey){x[C]===void 0&&(x[C]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),x[C].usedTimes++;let U=x[T.__cacheKey];U!==void 0&&(x[T.__cacheKey].usedTimes--,U.usedTimes===0&&I(S)),T.__cacheKey=C,T.__webglTexture=x[C].texture}return z}function Q(T,S,z){return Math.floor(Math.floor(T/z)/S)}function ce(T,S,z){let D=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(D=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(D=i.TEXTURE_3D);let x=Z(T,S),C=S.source;t.bindTexture(D,T.__webglTexture,i.TEXTURE0+z);let U=n.get(C);if(C.version!==U.__version||x===!0){t.activeTexture(i.TEXTURE0+z);let L=ot.getPrimaries(ot.workingColorSpace),q=S.colorSpace===gr?null:ot.getPrimaries(S.colorSpace),G=S.colorSpace===gr||L===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);let W=v(S.image,!1,r.maxTextureSize);W=De(S,W);let se=s.convert(S.format,S.colorSpace),ge=s.convert(S.type),he,Ee=y(S.internalFormat,se,ge,S.colorSpace,S.isVideoTexture);H(D,S);let Ae=S.mipmaps,Ce=S.isVideoTexture!==!0,We=U.__version===void 0||x===!0,qe=C.dataReady,rt=E(S,W);if(S.isDepthTexture)Ee=M(S.format===Ca,S.type),We&&(Ce?t.texStorage2D(i.TEXTURE_2D,1,Ee,W.width,W.height):t.texImage2D(i.TEXTURE_2D,0,Ee,W.width,W.height,0,se,ge,null));else if(S.isDataTexture)if(Ae.length>0){Ce&&We&&t.texStorage2D(i.TEXTURE_2D,rt,Ee,Ae[0].width,Ae[0].height);for(let _e=0,Ne=Ae.length;_e<Ne;_e++)he=Ae[_e],Ce?qe&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,he.width,he.height,se,ge,he.data):t.texImage2D(i.TEXTURE_2D,_e,Ee,he.width,he.height,0,se,ge,he.data);S.generateMipmaps=!1}else Ce?(We&&t.texStorage2D(i.TEXTURE_2D,rt,Ee,W.width,W.height),qe&&(function(_e,Ne,Xe,bt){let Re=_e.updateRanges;if(Re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ne.width,Ne.height,Xe,bt,Ne.data);else{Re.sort((O,Et)=>O.start-Et.start);let tt=0;for(let O=1;O<Re.length;O++){let Et=Re[tt],Ot=Re[O],vt=Et.start+Et.count,ii=Q(Ot.start,Ne.width,4),ri=Q(Et.start,Ne.width,4);Ot.start<=vt+1&&ii===ri&&Q(Ot.start+Ot.count-1,Ne.width,4)===ii?Et.count=Math.max(Et.count,Ot.start+Ot.count-Et.start):(++tt,Re[tt]=Ot)}Re.length=tt+1;let $e=i.getParameter(i.UNPACK_ROW_LENGTH),Ut=i.getParameter(i.UNPACK_SKIP_PIXELS),pn=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,Ne.width);for(let O=0,Et=Re.length;O<Et;O++){let Ot=Re[O],vt=Math.floor(Ot.start/4),ii=Math.ceil(Ot.count/4),ri=vt%Ne.width,Wi=Math.floor(vt/Ne.width),si=ii;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ri),i.pixelStorei(i.UNPACK_SKIP_ROWS,Wi),t.texSubImage2D(i.TEXTURE_2D,0,ri,Wi,si,1,Xe,bt,Ne.data)}_e.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,$e),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ut),i.pixelStorei(i.UNPACK_SKIP_ROWS,pn)}})(S,W,se,ge)):t.texImage2D(i.TEXTURE_2D,0,Ee,W.width,W.height,0,se,ge,W.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ce&&We&&t.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Ee,Ae[0].width,Ae[0].height,W.depth);for(let _e=0,Ne=Ae.length;_e<Ne;_e++)if(he=Ae[_e],S.format!==xn)if(se!==null)if(Ce){if(qe)if(S.layerUpdates.size>0){let Xe=Nh(he.width,he.height,S.format,S.type);for(let bt of S.layerUpdates){let Re=he.data.subarray(bt*Xe/he.data.BYTES_PER_ELEMENT,(bt+1)*Xe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,bt,he.width,he.height,1,se,Re)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,he.width,he.height,W.depth,se,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,_e,Ee,he.width,he.height,W.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?qe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,he.width,he.height,W.depth,se,ge,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,_e,Ee,he.width,he.height,W.depth,0,se,ge,he.data)}else{Ce&&We&&t.texStorage2D(i.TEXTURE_2D,rt,Ee,Ae[0].width,Ae[0].height);for(let _e=0,Ne=Ae.length;_e<Ne;_e++)he=Ae[_e],S.format!==xn?se!==null?Ce?qe&&t.compressedTexSubImage2D(i.TEXTURE_2D,_e,0,0,he.width,he.height,se,he.data):t.compressedTexImage2D(i.TEXTURE_2D,_e,Ee,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?qe&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,he.width,he.height,se,ge,he.data):t.texImage2D(i.TEXTURE_2D,_e,Ee,he.width,he.height,0,se,ge,he.data)}else if(S.isDataArrayTexture)if(Ce){if(We&&t.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Ee,W.width,W.height,W.depth),qe)if(S.layerUpdates.size>0){let _e=Nh(W.width,W.height,S.format,S.type);for(let Ne of S.layerUpdates){let Xe=W.data.subarray(Ne*_e/W.data.BYTES_PER_ELEMENT,(Ne+1)*_e/W.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ne,W.width,W.height,1,se,ge,Xe)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,se,ge,W.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,W.width,W.height,W.depth,0,se,ge,W.data);else if(S.isData3DTexture)Ce?(We&&t.texStorage3D(i.TEXTURE_3D,rt,Ee,W.width,W.height,W.depth),qe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,se,ge,W.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,W.width,W.height,W.depth,0,se,ge,W.data);else if(S.isFramebufferTexture){if(We)if(Ce)t.texStorage2D(i.TEXTURE_2D,rt,Ee,W.width,W.height);else{let _e=W.width,Ne=W.height;for(let Xe=0;Xe<rt;Xe++)t.texImage2D(i.TEXTURE_2D,Xe,Ee,_e,Ne,0,se,ge,null),_e>>=1,Ne>>=1}}else if(Ae.length>0){if(Ce&&We){let _e=He(Ae[0]);t.texStorage2D(i.TEXTURE_2D,rt,Ee,_e.width,_e.height)}for(let _e=0,Ne=Ae.length;_e<Ne;_e++)he=Ae[_e],Ce?qe&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,se,ge,he):t.texImage2D(i.TEXTURE_2D,_e,Ee,se,ge,he);S.generateMipmaps=!1}else if(Ce){if(We){let _e=He(W);t.texStorage2D(i.TEXTURE_2D,rt,Ee,_e.width,_e.height)}qe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,ge,W)}else t.texImage2D(i.TEXTURE_2D,0,Ee,se,ge,W);m(S)&&g(D),U.__version=C.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function J(T,S,z,D,x,C){let U=s.convert(z.format,z.colorSpace),L=s.convert(z.type),q=y(z.internalFormat,U,L,z.colorSpace),G=n.get(S),W=n.get(z);if(W.__renderTarget=S,!G.__hasExternalTextures){let se=Math.max(1,S.width>>C),ge=Math.max(1,S.height>>C);x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY?t.texImage3D(x,C,q,se,ge,S.depth,0,U,L,null):t.texImage2D(x,C,q,se,ge,0,U,L,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,D,x,W.__webglTexture,0,ue(S)):(x===i.TEXTURE_2D||x>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&x<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,D,x,W.__webglTexture,C),t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(T,S,z){if(i.bindRenderbuffer(i.RENDERBUFFER,T),S.depthBuffer){let D=S.depthTexture,x=D&&D.isDepthTexture?D.type:null,C=M(S.stencilBuffer,x),U=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,L=ue(S);ne(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L,C,S.width,S.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,L,C,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,C,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,T)}else{let D=S.textures;for(let x=0;x<D.length;x++){let C=D[x],U=s.convert(C.format,C.colorSpace),L=s.convert(C.type),q=y(C.internalFormat,U,L,C.colorSpace),G=ue(S);z&&ne(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,G,q,S.width,S.height):ne(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,G,q,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,q,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!S.depthTexture||!S.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let z=n.get(S.depthTexture);z.__renderTarget=S,z.__webglTexture&&S.depthTexture.image.width===S.width&&S.depthTexture.image.height===S.height||(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),B(S.depthTexture,0);let D=z.__webglTexture,x=ue(S);if(S.depthTexture.format===Ra)ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,D,0,x):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,D,0);else{if(S.depthTexture.format!==Ca)throw new Error("Unknown depthTexture format");ne(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,D,0,x):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,D,0)}}function be(T){let S=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){let D=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),D){let x=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,D.removeEventListener("dispose",x)};D.addEventListener("dispose",x),S.__depthDisposeCallback=x}S.__boundDepthTexture=D}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let D=T.texture.mipmaps;D&&D.length>0?ve(S.__webglFramebuffer[0],T):ve(S.__webglFramebuffer,T)}else if(z){S.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[D]),S.__webglDepthbuffer[D]===void 0)S.__webglDepthbuffer[D]=i.createRenderbuffer(),de(S.__webglDepthbuffer[D],T,!1);else{let x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,C=S.__webglDepthbuffer[D];i.bindRenderbuffer(i.RENDERBUFFER,C),i.framebufferRenderbuffer(i.FRAMEBUFFER,x,i.RENDERBUFFER,C)}}else{let D=T.texture.mipmaps;if(D&&D.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),de(S.__webglDepthbuffer,T,!1);else{let x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,C=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,C),i.framebufferRenderbuffer(i.FRAMEBUFFER,x,i.RENDERBUFFER,C)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let we=[],re=[];function ue(T){return Math.min(r.maxSamples,T.samples)}function ne(T){let S=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function De(T,S){let z=T.colorSpace,D=T.format,x=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Wt&&z!==gr&&(ot.getTransfer(z)===ft?D===xn&&x===ei||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function He(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=function(){let T=P;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),P+=1,T},this.resetTextureUnits=function(){P=0},this.setTexture2D=B,this.setTexture2DArray=function(T,S){let z=n.get(T);T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version?ce(z,T,S):t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+S)},this.setTexture3D=function(T,S){let z=n.get(T);T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version?ce(z,T,S):t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+S)},this.setTextureCube=function(T,S){let z=n.get(T);T.version>0&&z.__version!==T.version?(function(D,x,C){if(x.image.length!==6)return;let U=Z(D,x),L=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+C);let q=n.get(L);if(L.version!==q.__version||U===!0){t.activeTexture(i.TEXTURE0+C);let G=ot.getPrimaries(ot.workingColorSpace),W=x.colorSpace===gr?null:ot.getPrimaries(x.colorSpace),se=x.colorSpace===gr||G===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ge=x.isCompressedTexture||x.image[0].isCompressedTexture,he=x.image[0]&&x.image[0].isDataTexture,Ee=[];for(let Re=0;Re<6;Re++)Ee[Re]=ge||he?he?x.image[Re].image:x.image[Re]:v(x.image[Re],!0,r.maxCubemapSize),Ee[Re]=De(x,Ee[Re]);let Ae=Ee[0],Ce=s.convert(x.format,x.colorSpace),We=s.convert(x.type),qe=y(x.internalFormat,Ce,We,x.colorSpace),rt=x.isVideoTexture!==!0,_e=q.__version===void 0||U===!0,Ne=L.dataReady,Xe,bt=E(x,Ae);if(H(i.TEXTURE_CUBE_MAP,x),ge){rt&&_e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,bt,qe,Ae.width,Ae.height);for(let Re=0;Re<6;Re++){Xe=Ee[Re].mipmaps;for(let tt=0;tt<Xe.length;tt++){let $e=Xe[tt];x.format!==xn?Ce!==null?rt?Ne&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,0,0,$e.width,$e.height,Ce,$e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,qe,$e.width,$e.height,0,$e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):rt?Ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,0,0,$e.width,$e.height,Ce,We,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt,qe,$e.width,$e.height,0,Ce,We,$e.data)}}}else{if(Xe=x.mipmaps,rt&&_e){Xe.length>0&&bt++;let Re=He(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,bt,qe,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(he){rt?Ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Ee[Re].width,Ee[Re].height,Ce,We,Ee[Re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,qe,Ee[Re].width,Ee[Re].height,0,Ce,We,Ee[Re].data);for(let tt=0;tt<Xe.length;tt++){let $e=Xe[tt].image[Re].image;rt?Ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,0,0,$e.width,$e.height,Ce,We,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,qe,$e.width,$e.height,0,Ce,We,$e.data)}}else{rt?Ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Ce,We,Ee[Re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,qe,Ce,We,Ee[Re]);for(let tt=0;tt<Xe.length;tt++){let $e=Xe[tt];rt?Ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,0,0,Ce,We,$e.image[Re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,tt+1,qe,Ce,We,$e.image[Re])}}}m(x)&&g(i.TEXTURE_CUBE_MAP),q.__version=L.version,x.onUpdate&&x.onUpdate(x)}D.__version=x.version})(z,T,S):t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+S)},this.rebindTextures=function(T,S,z){let D=n.get(T);S!==void 0&&J(D.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&be(T)},this.setupRenderTarget=function(T){let S=T.texture,z=n.get(T),D=n.get(S);T.addEventListener("dispose",b);let x=T.textures,C=T.isWebGLCubeRenderTarget===!0,U=x.length>1;if(U||(D.__webglTexture===void 0&&(D.__webglTexture=i.createTexture()),D.__version=S.version,a.memory.textures++),C){z.__webglFramebuffer=[];for(let L=0;L<6;L++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[L]=[];for(let q=0;q<S.mipmaps.length;q++)z.__webglFramebuffer[L][q]=i.createFramebuffer()}else z.__webglFramebuffer[L]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let L=0;L<S.mipmaps.length;L++)z.__webglFramebuffer[L]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(U)for(let L=0,q=x.length;L<q;L++){let G=n.get(x[L]);G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&ne(T)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let L=0;L<x.length;L++){let q=x[L];z.__webglColorRenderbuffer[L]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[L]);let G=s.convert(q.format,q.colorSpace),W=s.convert(q.type),se=y(q.internalFormat,G,W,q.colorSpace,T.isXRRenderTarget===!0),ge=ue(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,se,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+L,i.RENDERBUFFER,z.__webglColorRenderbuffer[L])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),de(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(C){t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture),H(i.TEXTURE_CUBE_MAP,S);for(let L=0;L<6;L++)if(S.mipmaps&&S.mipmaps.length>0)for(let q=0;q<S.mipmaps.length;q++)J(z.__webglFramebuffer[L][q],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,q);else J(z.__webglFramebuffer[L],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);m(S)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(U){for(let L=0,q=x.length;L<q;L++){let G=x[L],W=n.get(G),se=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(se=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,W.__webglTexture),H(se,G),J(z.__webglFramebuffer,T,G,i.COLOR_ATTACHMENT0+L,se,0),m(G)&&g(se)}t.unbindTexture()}else{let L=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(L=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(L,D.__webglTexture),H(L,S),S.mipmaps&&S.mipmaps.length>0)for(let q=0;q<S.mipmaps.length;q++)J(z.__webglFramebuffer[q],T,S,i.COLOR_ATTACHMENT0,L,q);else J(z.__webglFramebuffer,T,S,i.COLOR_ATTACHMENT0,L,0);m(S)&&g(L),t.unbindTexture()}T.depthBuffer&&be(T)},this.updateRenderTargetMipmap=function(T){let S=T.textures;for(let z=0,D=S.length;z<D;z++){let x=S[z];if(m(x)){let C=_(T),U=n.get(x).__webglTexture;t.bindTexture(C,U),g(C),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(T){if(T.samples>0){if(ne(T)===!1){let S=T.textures,z=T.width,D=T.height,x=i.COLOR_BUFFER_BIT,C=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,U=n.get(T),L=S.length>1;if(L)for(let G=0;G<S.length;G++)t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,U.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,U.__webglMultisampledFramebuffer);let q=T.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglFramebuffer);for(let G=0;G<S.length;G++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(x|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(x|=i.STENCIL_BUFFER_BIT)),L){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,U.__webglColorRenderbuffer[G]);let W=n.get(S[G]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,W,0)}i.blitFramebuffer(0,0,z,D,0,0,z,D,x,i.NEAREST),l===!0&&(we.length=0,re.length=0,we.push(i.COLOR_ATTACHMENT0+G),T.depthBuffer&&T.resolveDepthBuffer===!1&&(we.push(C),re.push(C),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),L)for(let G=0;G<S.length;G++){t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.RENDERBUFFER,U.__webglColorRenderbuffer[G]);let W=n.get(S[G]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,U.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.TEXTURE_2D,W,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let S=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=J,this.useMultisampledRTT=ne}function k0(i,e){return{convert:function(t,n=gr){let r,s=ot.getTransfer(n);if(t===ei)return i.UNSIGNED_BYTE;if(t===dl)return i.UNSIGNED_SHORT_4_4_4_4;if(t===pl)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Yc)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Zc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===jc)return i.BYTE;if(t===qc)return i.SHORT;if(t===ps)return i.UNSIGNED_SHORT;if(t===ul)return i.INT;if(t===mr)return i.UNSIGNED_INT;if(t===yn)return i.FLOAT;if(t===fs)return i.HALF_FLOAT;if(t===Ip)return i.ALPHA;if(t===Pp)return i.RGB;if(t===xn)return i.RGBA;if(t===Ra)return i.DEPTH_COMPONENT;if(t===Ca)return i.DEPTH_STENCIL;if(t===fl)return i.RED;if(t===ml)return i.RED_INTEGER;if(t===Lp)return i.RG;if(t===Kc)return i.RG_INTEGER;if(t===Jc)return i.RGBA_INTEGER;if(t===gl||t===vl||t===_l||t===yl)if(s===ft){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===gl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===vl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===_l)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===yl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===gl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===vl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===_l)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===yl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===$c||t===Qc||t===eh||t===th){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===$c)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Qc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===eh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===th)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===nh||t===ih||t===rh){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===nh||t===ih)return s===ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===rh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===sh||t===ah||t===oh||t===lh||t===ch||t===hh||t===uh||t===dh||t===ph||t===fh||t===mh||t===gh||t===vh||t===_h){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===sh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ah)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===oh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===lh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===ch)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===hh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===uh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===dh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===ph)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===fh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===mh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===gh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===vh)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===_h)return s===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===yh||t===xh||t===Mh){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===yh)return s===ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===xh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Mh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===bh||t===Sh||t===Th||t===wh){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===bh)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Sh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Th)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===wh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===ms?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var qh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new oa(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ln({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new on(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yh=class extends _i{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,p=null,d=null,f=null,v=typeof XRWebGLBinding<"u",m=new qh,g={},_=t.getContextAttributes(),y=null,M=null,E=[],R=[],b=new oe,I=null,P=new Lt;P.viewport=new lt;let B=new Lt;B.viewport=new lt;let F=[P,B],N=new Qo,K=null,H=null;function Z(re){let ue=R.indexOf(re.inputSource);if(ue===-1)return;let ne=E[ue];ne!==void 0&&(ne.update(re.inputSource,re.frame,c||a),ne.dispatchEvent({type:re.type,data:re.inputSource}))}function Q(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",ce);for(let re=0;re<E.length;re++){let ue=R[re];ue!==null&&(R[re]=null,E[re].disconnect(ue))}K=null,H=null,m.reset();for(let re in g)delete g[re];e.setRenderTarget(y),d=null,p=null,u=null,r=null,M=null,we.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}function ce(re){for(let ue=0;ue<re.removed.length;ue++){let ne=re.removed[ue],De=R.indexOf(ne);De>=0&&(R[De]=null,E[De].disconnect(ne))}for(let ue=0;ue<re.added.length;ue++){let ne=re.added[ue],De=R.indexOf(ne);if(De===-1){for(let T=0;T<E.length;T++){if(T>=R.length){R.push(ne),De=T;break}if(R[T]===null){R[T]=ne,De=T;break}}if(De===-1)break}let He=E[De];He&&He.connect(ne)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ue=E[re];return ue===void 0&&(ue=new $r,E[re]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(re){let ue=E[re];return ue===void 0&&(ue=new $r,E[re]=ue),ue.getGripSpace()},this.getHand=function(re){let ue=E[re];return ue===void 0&&(ue=new $r,E[re]=ue),ue.getHandSpace()},this.setFramebufferScaleFactor=function(re){s=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return f},this.getSession=function(){return r},this.setSession=async function(re){if(r=re,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",ce),_.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(b),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ne=null,De=null;_.depth&&(De=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=_.stencil?Ca:Ra,ne=_.stencil?ms:mr);let He={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:s};u=this.getBinding(),p=u.createProjectionLayer(He),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),M=new Vn(p.textureWidth,p.textureHeight,{format:xn,type:ei,depthTexture:new aa(p.textureWidth,p.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let ue={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ue),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Vn(d.framebufferWidth,d.framebufferHeight,{format:xn,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),we.setContext(r),we.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};let J=new A,de=new A;function ve(re,ue){ue===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ue.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(r===null)return;let ue=re.near,ne=re.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(ne=m.depthFar)),N.near=B.near=P.near=ue,N.far=B.far=P.far=ne,K===N.near&&H===N.far||(r.updateRenderState({depthNear:N.near,depthFar:N.far}),K=N.near,H=N.far),N.layers.mask=6|re.layers.mask,P.layers.mask=3&N.layers.mask,B.layers.mask=5&N.layers.mask;let De=re.parent,He=N.cameras;ve(N,De);for(let T=0;T<He.length;T++)ve(He[T],De);He.length===2?(function(T,S,z){J.setFromMatrixPosition(S.matrixWorld),de.setFromMatrixPosition(z.matrixWorld);let D=J.distanceTo(de),x=S.projectionMatrix.elements,C=z.projectionMatrix.elements,U=x[14]/(x[10]-1),L=x[14]/(x[10]+1),q=(x[9]+1)/x[5],G=(x[9]-1)/x[5],W=(x[8]-1)/x[0],se=(C[8]+1)/C[0],ge=U*W,he=U*se,Ee=D/(-W+se),Ae=Ee*-W;if(S.matrixWorld.decompose(T.position,T.quaternion,T.scale),T.translateX(Ae),T.translateZ(Ee),T.matrixWorld.compose(T.position,T.quaternion,T.scale),T.matrixWorldInverse.copy(T.matrixWorld).invert(),x[10]===-1)T.projectionMatrix.copy(S.projectionMatrix),T.projectionMatrixInverse.copy(S.projectionMatrixInverse);else{let Ce=U+Ee,We=L+Ee,qe=ge-Ae,rt=he+(D-Ae),_e=q*L/We*Ce,Ne=G*L/We*Ce;T.projectionMatrix.makePerspective(qe,rt,_e,Ne,Ce,We),T.projectionMatrixInverse.copy(T.projectionMatrix).invert()}})(N,P,B):N.projectionMatrix.copy(P.projectionMatrix),(function(T,S,z){z===null?T.matrix.copy(S.matrixWorld):(T.matrix.copy(z.matrixWorld),T.matrix.invert(),T.matrix.multiply(S.matrixWorld)),T.matrix.decompose(T.position,T.quaternion,T.scale),T.updateMatrixWorld(!0),T.projectionMatrix.copy(S.projectionMatrix),T.projectionMatrixInverse.copy(S.projectionMatrixInverse),T.isPerspectiveCamera&&(T.fov=2*nr*Math.atan(1/T.projectionMatrix.elements[5]),T.zoom=1)})(re,N,De)},this.getCamera=function(){return N},this.getFoveation=function(){if(p!==null||d!==null)return l},this.setFoveation=function(re){l=re,p!==null&&(p.fixedFoveation=re),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(re){return g[re]};let be=null,we=new bf;we.setAnimationLoop(function(re,ue){if(h=ue.getViewerPose(c||a),f=ue,h!==null){let ne=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let De=!1;ne.length!==N.cameras.length&&(N.cameras.length=0,De=!0);for(let T=0;T<ne.length;T++){let S=ne[T],z=null;if(d!==null)z=d.getViewport(S);else{let x=u.getViewSubImage(p,S);z=x.viewport,T===0&&(e.setRenderTargetTextures(M,x.colorTexture,x.depthStencilTexture),e.setRenderTarget(M))}let D=F[T];D===void 0&&(D=new Lt,D.layers.enable(T),D.viewport=new lt,F[T]=D),D.matrix.fromArray(S.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(S.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(z.x,z.y,z.width,z.height),T===0&&(N.matrix.copy(D.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),De===!0&&N.cameras.push(D)}let He=r.enabledFeatures;if(He&&He.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let T=u.getDepthInformation(ne[0]);T&&T.isValid&&T.texture&&m.init(T,r.renderState)}if(He&&He.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let T=0;T<ne.length;T++){let S=ne[T].camera;if(S){let z=g[S];z||(z=new oa,g[S]=z);let D=u.getCameraImage(S);z.sourceTexture=D}}}}for(let ne=0;ne<E.length;ne++){let De=R[ne],He=E[ne];De!==null&&He!==void 0&&He.update(De,ue,c||a)}be&&be(re,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),f=null}),this.setAnimationLoop=function(re){be=re},this.dispose=function(){}}},yr=new In,z0=new Ue;function G0(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===dn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===dn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,yr.copy(l),yr.x*=-1,yr.y*=-1,yr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(yr.y*=-1,yr.z*=-1),r.envMapRotation.value.setFromMatrix4(z0.makeRotationFromEuler(yr)),r.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,Ph(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(r,s):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===dn&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,u,p){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*p,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function H0(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,p,d,f){let v=u.value,m=p+"_"+d;if(f[m]===void 0)return f[m]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=f[m];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return f[m]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function c(u){let p={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(p.boundary=4,p.storage=4):u.isVector2?(p.boundary=8,p.storage=8):u.isVector3||u.isColor?(p.boundary=16,p.storage=12):u.isVector4?(p.boundary=16,p.storage=16):u.isMatrix3?(p.boundary=48,p.storage=48):u.isMatrix4?(p.boundary=64,p.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),p}function h(u){let p=u.target;p.removeEventListener("dispose",h);let d=a.indexOf(p.__bindingPointIndex);a.splice(d,1),i.deleteBuffer(r[p.id]),delete r[p.id],delete s[p.id]}return{bind:function(u,p){let d=p.program;n.uniformBlockBinding(u,d)},update:function(u,p){let d=r[u.id];d===void 0&&((function(m){let g=m.uniforms,_=0,y=16;for(let E=0,R=g.length;E<R;E++){let b=Array.isArray(g[E])?g[E]:[g[E]];for(let I=0,P=b.length;I<P;I++){let B=b[I],F=Array.isArray(B.value)?B.value:[B.value];for(let N=0,K=F.length;N<K;N++){let H=c(F[N]),Z=_%y,Q=Z%H.boundary,ce=Z+Q;_+=Q,ce!==0&&y-ce<H.storage&&(_+=y-ce),B.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=_,_+=H.storage}}}let M=_%y;M>0&&(_+=y-M),m.__size=_,m.__cache={}})(u),d=(function(m){let g=(function(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();m.__bindingPointIndex=g;let _=i.createBuffer(),y=m.__size,M=m.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,y,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,_),_})(u),r[u.id]=d,u.addEventListener("dispose",h));let f=p.program;n.updateUBOMapping(u,f);let v=e.render.frame;s[u.id]!==v&&((function(m){let g=r[m.id],_=m.uniforms,y=m.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let M=0,E=_.length;M<E;M++){let R=Array.isArray(_[M])?_[M]:[_[M]];for(let b=0,I=R.length;b<I;b++){let P=R[b];if(l(P,M,b,y)===!0){let B=P.__offset,F=Array.isArray(P.value)?P.value:[P.value],N=0;for(let K=0;K<F.length;K++){let H=F[K],Z=c(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+N,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,N),N+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in r)i.deleteBuffer(r[u]);a=[],r={},s={}}}}var Sl=class{constructor(e={}){let{canvas:t=Vp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e,d;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let f=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,_=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,E=!1;this._outputColorSpace=ct;let R=0,b=0,I=null,P=-1,B=null,F=new lt,N=new lt,K=null,H=new Le(0),Z=0,Q=t.width,ce=t.height,J=1,de=null,ve=null,be=new lt(0,0,Q,ce),we=new lt(0,0,Q,ce),re=!1,ue=new Oi,ne=!1,De=!1,He=new Ue,T=new A,S=new lt,z={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},D=!1;function x(){return I===null?J:1}let C,U,L,q,G,W,se,ge,he,Ee,Ae,Ce,We,qe,rt,_e,Ne,Xe,bt,Re,tt,$e,Ut,pn,O=n;function Et(w,V){return t.getContext(w,V)}try{let w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ii,!1),t.addEventListener("webglcontextrestored",ri,!1),t.addEventListener("webglcontextcreationerror",Wi,!1),O===null){let V="webgl2";if(O=Et(V,w),O===null)throw Et(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}function Ot(){C=new Tg(O),C.init(),$e=new k0(O,C),U=new yg(O,C,e,$e),L=new B0(O,C),U.reversedDepthBuffer&&p&&L.buffers.depth.setReversed(!0),q=new Ag(O),G=new A0,W=new F0(O,C,L,G,U,$e,q),se=new Mg(M),ge=new Sg(M),he=new fg(O),Ut=new vg(O,he),Ee=new wg(O,he,q,Ut),Ae=new Cg(O,Ee,he,q),bt=new Rg(O,U,W),_e=new xg(G),Ce=new E0(M,se,ge,C,U,Ut,_e),We=new G0(M,G),qe=new C0,rt=new N0(C),Xe=new gg(M,se,ge,L,Ae,d,l),Ne=new U0(M,Ae,U),pn=new H0(O,q,U,L),Re=new _g(O,C,q),tt=new Eg(O,C,q),q.programs=Ce.programs,M.capabilities=U,M.extensions=C,M.properties=G,M.renderLists=qe,M.shadowMap=Ne,M.state=L,M.info=q}Ot();let vt=new Yh(M,O);function ii(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ri(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let w=q.autoReset,V=Ne.enabled,X=Ne.autoUpdate,te=Ne.needsUpdate,j=Ne.type;Ot(),q.autoReset=w,Ne.enabled=V,Ne.autoUpdate=X,Ne.needsUpdate=te,Ne.type=j}function Wi(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function si(w){let V=w.target;V.removeEventListener("dispose",si),(function(X){(function(te){let j=G.get(te).programs;j!==void 0&&(j.forEach(function(ae){Ce.releaseProgram(ae)}),te.isShaderMaterial&&Ce.releaseShaderCache(te))})(X),G.remove(X)})(V)}function Cs(w,V,X){w.transparent===!0&&w.side===_n&&w.forceSinglePass===!1?(w.side=dn,w.needsUpdate=!0,Ie(w,V,X),w.side=Fi,w.needsUpdate=!0,Ie(w,V,X),w.side=_n):Ie(w,V,X)}this.xr=vt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=C.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=C.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(w){w!==void 0&&(J=w,this.setSize(Q,ce,!1))},this.getSize=function(w){return w.set(Q,ce)},this.setSize=function(w,V,X=!0){vt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(Q=w,ce=V,t.width=Math.floor(w*J),t.height=Math.floor(V*J),X===!0&&(t.style.width=w+"px",t.style.height=V+"px"),this.setViewport(0,0,w,V))},this.getDrawingBufferSize=function(w){return w.set(Q*J,ce*J).floor()},this.setDrawingBufferSize=function(w,V,X){Q=w,ce=V,J=X,t.width=Math.floor(w*X),t.height=Math.floor(V*X),this.setViewport(0,0,w,V)},this.getCurrentViewport=function(w){return w.copy(F)},this.getViewport=function(w){return w.copy(be)},this.setViewport=function(w,V,X,te){w.isVector4?be.set(w.x,w.y,w.z,w.w):be.set(w,V,X,te),L.viewport(F.copy(be).multiplyScalar(J).round())},this.getScissor=function(w){return w.copy(we)},this.setScissor=function(w,V,X,te){w.isVector4?we.set(w.x,w.y,w.z,w.w):we.set(w,V,X,te),L.scissor(N.copy(we).multiplyScalar(J).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(w){L.setScissorTest(re=w)},this.setOpaqueSort=function(w){de=w},this.setTransparentSort=function(w){ve=w},this.getClearColor=function(w){return w.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,X=!0){let te=0;if(w){let j=!1;if(I!==null){let ae=I.texture.format;j=ae===Jc||ae===Kc||ae===ml}if(j){let ae=I.texture.type,ye=ae===ei||ae===mr||ae===ps||ae===ms||ae===dl||ae===pl,Se=Xe.getClearColor(),Pe=Xe.getClearAlpha(),ke=Se.r,Ge=Se.g,ze=Se.b;ye?(f[0]=ke,f[1]=Ge,f[2]=ze,f[3]=Pe,O.clearBufferuiv(O.COLOR,0,f)):(v[0]=ke,v[1]=Ge,v[2]=ze,v[3]=Pe,O.clearBufferiv(O.COLOR,0,v))}else te|=O.COLOR_BUFFER_BIT}V&&(te|=O.DEPTH_BUFFER_BIT),X&&(te|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ii,!1),t.removeEventListener("webglcontextrestored",ri,!1),t.removeEventListener("webglcontextcreationerror",Wi,!1),Xe.dispose(),qe.dispose(),rt.dispose(),G.dispose(),se.dispose(),ge.dispose(),Ae.dispose(),Ut.dispose(),pn.dispose(),Ce.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",k),vt.removeEventListener("sessionend",$),ie.stop()},this.renderBufferDirect=function(w,V,X,te,j,ae){V===null&&(V=z);let ye=j.isMesh&&j.matrixWorld.determinant()<0,Se=(function(st,St,Ht,et,Ve){St.isScene!==!0&&(St=z),W.resetTextureUnits();let Sn=St.fog,Nl=et.isMeshStandardMaterial?St.environment:null,Fa=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Wt,Si=(et.isMeshStandardMaterial?ge:se).get(et.envMap||Nl),Bn=et.vertexColors===!0&&!!Ht.attributes.color&&Ht.attributes.color.itemSize===4,Ar=!!Ht.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),ai=!!Ht.morphAttributes.position,Ul=!!Ht.morphAttributes.normal,Rr=!!Ht.morphAttributes.color,Ou=bi;et.toneMapped&&(I!==null&&I.isXRRenderTarget!==!0||(Ou=M.toneMapping));let Bu=Ht.morphAttributes.position||Ht.morphAttributes.normal||Ht.morphAttributes.color,lm=Bu!==void 0?Bu.length:0,at=G.get(et),cm=g.state.lights;if(ne===!0&&(De===!0||st!==B)){let fn=st===B&&et.id===P;_e.setState(et,st,fn)}let Tn=!1;et.version===at.__version?at.needsLights&&at.lightsStateVersion!==cm.state.version||at.outputColorSpace!==Fa||Ve.isBatchedMesh&&at.batching===!1?Tn=!0:Ve.isBatchedMesh||at.batching!==!0?Ve.isBatchedMesh&&at.batchingColor===!0&&Ve.colorTexture===null||Ve.isBatchedMesh&&at.batchingColor===!1&&Ve.colorTexture!==null||Ve.isInstancedMesh&&at.instancing===!1?Tn=!0:Ve.isInstancedMesh||at.instancing!==!0?Ve.isSkinnedMesh&&at.skinning===!1?Tn=!0:Ve.isSkinnedMesh||at.skinning!==!0?Ve.isInstancedMesh&&at.instancingColor===!0&&Ve.instanceColor===null||Ve.isInstancedMesh&&at.instancingColor===!1&&Ve.instanceColor!==null||Ve.isInstancedMesh&&at.instancingMorph===!0&&Ve.morphTexture===null||Ve.isInstancedMesh&&at.instancingMorph===!1&&Ve.morphTexture!==null||at.envMap!==Si||et.fog===!0&&at.fog!==Sn?Tn=!0:at.numClippingPlanes===void 0||at.numClippingPlanes===_e.numPlanes&&at.numIntersection===_e.numIntersection?(at.vertexAlphas!==Bn||at.vertexTangents!==Ar||at.morphTargets!==ai||at.morphNormals!==Ul||at.morphColors!==Rr||at.toneMapping!==Ou||at.morphTargetsCount!==lm)&&(Tn=!0):Tn=!0:Tn=!0:Tn=!0:Tn=!0:(Tn=!0,at.__version=et.version);let Xi=at.currentProgram;Tn===!0&&(Xi=Ie(et,St,Ve));let Fu=!1,Is=!1,Ol=!1,It=Xi.getUniforms(),Ti=at.uniforms;if(L.useProgram(Xi.program)&&(Fu=!0,Is=!0,Ol=!0),et.id!==P&&(P=et.id,Is=!0),Fu||B!==st){L.buffers.depth.getReversed()&&st.reversedDepth!==!0&&(st._reversedDepth=!0,st.updateProjectionMatrix()),It.setValue(O,"projectionMatrix",st.projectionMatrix),It.setValue(O,"viewMatrix",st.matrixWorldInverse);let fn=It.map.cameraPosition;fn!==void 0&&fn.setValue(O,T.setFromMatrixPosition(st.matrixWorld)),U.logarithmicDepthBuffer&&It.setValue(O,"logDepthBufFC",2/(Math.log(st.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&It.setValue(O,"isOrthographic",st.isOrthographicCamera===!0),B!==st&&(B=st,Is=!0,Ol=!0)}if(Ve.isSkinnedMesh){It.setOptional(O,Ve,"bindMatrix"),It.setOptional(O,Ve,"bindMatrixInverse");let fn=Ve.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),It.setValue(O,"boneTexture",fn.boneTexture,W))}Ve.isBatchedMesh&&(It.setOptional(O,Ve,"batchingTexture"),It.setValue(O,"batchingTexture",Ve._matricesTexture,W),It.setOptional(O,Ve,"batchingIdTexture"),It.setValue(O,"batchingIdTexture",Ve._indirectTexture,W),It.setOptional(O,Ve,"batchingColorTexture"),Ve._colorsTexture!==null&&It.setValue(O,"batchingColorTexture",Ve._colorsTexture,W));let Bl=Ht.morphAttributes;Bl.position===void 0&&Bl.normal===void 0&&Bl.color===void 0||bt.update(Ve,Ht,Xi),(Is||at.receiveShadow!==Ve.receiveShadow)&&(at.receiveShadow=Ve.receiveShadow,It.setValue(O,"receiveShadow",Ve.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(Ti.envMap.value=Si,Ti.flipEnvMap.value=Si.isCubeTexture&&Si.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&St.environment!==null&&(Ti.envMapIntensity.value=St.environmentIntensity),Is&&(It.setValue(O,"toneMappingExposure",M.toneMappingExposure),at.needsLights&&(wn=Ol,(Fn=Ti).ambientLightColor.needsUpdate=wn,Fn.lightProbe.needsUpdate=wn,Fn.directionalLights.needsUpdate=wn,Fn.directionalLightShadows.needsUpdate=wn,Fn.pointLights.needsUpdate=wn,Fn.pointLightShadows.needsUpdate=wn,Fn.spotLights.needsUpdate=wn,Fn.spotLightShadows.needsUpdate=wn,Fn.rectAreaLights.needsUpdate=wn,Fn.hemisphereLights.needsUpdate=wn),Sn&&et.fog===!0&&We.refreshFogUniforms(Ti,Sn),We.refreshMaterialUniforms(Ti,et,J,ce,g.state.transmissionRenderTarget[st.id]),_s.upload(O,Be(at),Ti,W));var Fn,wn;if(et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(_s.upload(O,Be(at),Ti,W),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&It.setValue(O,"center",Ve.center),It.setValue(O,"modelViewMatrix",Ve.modelViewMatrix),It.setValue(O,"normalMatrix",Ve.normalMatrix),It.setValue(O,"modelMatrix",Ve.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){let fn=et.uniformsGroups;for(let Fl=0,hm=fn.length;Fl<hm;Fl++){let ku=fn[Fl];pn.update(ku,Xi),pn.bind(ku,Xi)}}return Xi})(w,V,X,te,j);L.setMaterial(te,ye);let Pe=X.index,ke=1;if(te.wireframe===!0){if(Pe=Ee.getWireframeAttribute(X),Pe===void 0)return;ke=2}let Ge=X.drawRange,ze=X.attributes.position,Qe=Ge.start*ke,yt=(Ge.start+Ge.count)*ke;ae!==null&&(Qe=Math.max(Qe,ae.start*ke),yt=Math.min(yt,(ae.start+ae.count)*ke)),Pe!==null?(Qe=Math.max(Qe,0),yt=Math.min(yt,Pe.count)):ze!=null&&(Qe=Math.max(Qe,0),yt=Math.min(yt,ze.count));let wt=yt-Qe;if(wt<0||wt===1/0)return;let Ct;Ut.setup(j,te,Se,X,Pe);let xt=Re;if(Pe!==null&&(Ct=he.get(Pe),xt=tt,xt.setIndex(Ct)),j.isMesh)te.wireframe===!0?(L.setLineWidth(te.wireframeLinewidth*x()),xt.setMode(O.LINES)):xt.setMode(O.TRIANGLES);else if(j.isLine){let st=te.linewidth;st===void 0&&(st=1),L.setLineWidth(st*x()),j.isLineSegments?xt.setMode(O.LINES):j.isLineLoop?xt.setMode(O.LINE_LOOP):xt.setMode(O.LINE_STRIP)}else j.isPoints?xt.setMode(O.POINTS):j.isSprite&&xt.setMode(O.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)Yr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),xt.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(C.get("WEBGL_multi_draw"))xt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let st=j._multiDrawStarts,St=j._multiDrawCounts,Ht=j._multiDrawCount,et=Pe?he.get(Pe).bytesPerElement:1,Ve=G.get(te).currentProgram.getUniforms();for(let Sn=0;Sn<Ht;Sn++)Ve.setValue(O,"_gl_DrawID",Sn),xt.render(st[Sn]/et,St[Sn])}else if(j.isInstancedMesh)xt.renderInstances(Qe,wt,j.count);else if(X.isInstancedBufferGeometry){let st=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,St=Math.min(X.instanceCount,st);xt.renderInstances(Qe,wt,St)}else xt.render(Qe,wt)},this.compile=function(w,V,X=null){X===null&&(X=w),g=rt.get(X),g.init(V),y.push(g),X.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))}),w!==X&&w.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))}),g.setupLights();let te=new Set;return w.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let ae=j.material;if(ae)if(Array.isArray(ae))for(let ye=0;ye<ae.length;ye++){let Se=ae[ye];Cs(Se,X,j),te.add(Se)}else Cs(ae,X,j),te.add(ae)}),g=y.pop(),te},this.compileAsync=function(w,V,X=null){let te=this.compile(w,V,X);return new Promise(j=>{function ae(){te.forEach(function(ye){G.get(ye).currentProgram.isReady()&&te.delete(ye)}),te.size!==0?setTimeout(ae,10):j(w)}C.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Er=null;function k(){ie.stop()}function $(){ie.start()}let ie=new bf;function Y(w,V,X,te){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ue.intersectsSprite(w)){te&&S.setFromMatrixPosition(w.matrixWorld).applyMatrix4(He);let ae=Ae.update(w),ye=w.material;ye.visible&&m.push(w,ae,ye,X,S.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ue.intersectsObject(w))){let ae=Ae.update(w),ye=w.material;if(te&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),S.copy(w.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),S.copy(ae.boundingSphere.center)),S.applyMatrix4(w.matrixWorld).applyMatrix4(He)),Array.isArray(ye)){let Se=ae.groups;for(let Pe=0,ke=Se.length;Pe<ke;Pe++){let Ge=Se[Pe],ze=ye[Ge.materialIndex];ze&&ze.visible&&m.push(w,ae,ze,X,S.z,Ge)}}else ye.visible&&m.push(w,ae,ye,X,S.z,null)}}let j=w.children;for(let ae=0,ye=j.length;ae<ye;ae++)Y(j[ae],V,X,te)}function xe(w,V,X,te){let j=w.opaque,ae=w.transmissive,ye=w.transparent;g.setupLightsView(X),ne===!0&&_e.setGlobalState(M.clippingPlanes,X),te&&L.viewport(F.copy(te)),j.length>0&&Me(j,V,X),ae.length>0&&Me(ae,V,X),ye.length>0&&Me(ye,V,X),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function fe(w,V,X,te){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[te.id]===void 0&&(g.state.transmissionRenderTarget[te.id]=new Vn(1,1,{generateMipmaps:!0,type:C.has("EXT_color_buffer_half_float")||C.has("EXT_color_buffer_float")?fs:ei,minFilter:Qn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));let j=g.state.transmissionRenderTarget[te.id],ae=te.viewport||F;j.setSize(ae.z*M.transmissionResolutionScale,ae.w*M.transmissionResolutionScale);let ye=M.getRenderTarget(),Se=M.getActiveCubeFace(),Pe=M.getActiveMipmapLevel();M.setRenderTarget(j),M.getClearColor(H),Z=M.getClearAlpha(),Z<1&&M.setClearColor(16777215,.5),M.clear(),D&&Xe.render(X);let ke=M.toneMapping;M.toneMapping=bi;let Ge=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),g.setupLightsView(te),ne===!0&&_e.setGlobalState(M.clippingPlanes,te),Me(w,X,te),W.updateMultisampleRenderTarget(j),W.updateRenderTargetMipmap(j),C.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let Qe=0,yt=V.length;Qe<yt;Qe++){let wt=V[Qe],Ct=wt.object,xt=wt.geometry,st=wt.material,St=wt.group;if(st.side===_n&&Ct.layers.test(te.layers)){let Ht=st.side;st.side=dn,st.needsUpdate=!0,Te(Ct,X,te,xt,st,St),st.side=Ht,st.needsUpdate=!0,ze=!0}}ze===!0&&(W.updateMultisampleRenderTarget(j),W.updateRenderTargetMipmap(j))}M.setRenderTarget(ye,Se,Pe),M.setClearColor(H,Z),Ge!==void 0&&(te.viewport=Ge),M.toneMapping=ke}function Me(w,V,X){let te=V.isScene===!0?V.overrideMaterial:null;for(let j=0,ae=w.length;j<ae;j++){let ye=w[j],Se=ye.object,Pe=ye.geometry,ke=ye.group,Ge=ye.material;Ge.allowOverride===!0&&te!==null&&(Ge=te),Se.layers.test(X.layers)&&Te(Se,V,X,Pe,Ge,ke)}}function Te(w,V,X,te,j,ae){w.onBeforeRender(M,V,X,te,j,ae),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),j.onBeforeRender(M,V,X,te,w,ae),j.transparent===!0&&j.side===_n&&j.forceSinglePass===!1?(j.side=dn,j.needsUpdate=!0,M.renderBufferDirect(X,V,te,j,w,ae),j.side=Fi,j.needsUpdate=!0,M.renderBufferDirect(X,V,te,j,w,ae),j.side=_n):M.renderBufferDirect(X,V,te,j,w,ae),w.onAfterRender(M,V,X,te,j,ae)}function Ie(w,V,X){V.isScene!==!0&&(V=z);let te=G.get(w),j=g.state.lights,ae=g.state.shadowsArray,ye=j.state.version,Se=Ce.getParameters(w,j.state,ae,V,X),Pe=Ce.getProgramCacheKey(Se),ke=te.programs;te.environment=w.isMeshStandardMaterial?V.environment:null,te.fog=V.fog,te.envMap=(w.isMeshStandardMaterial?ge:se).get(w.envMap||te.environment),te.envMapRotation=te.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,ke===void 0&&(w.addEventListener("dispose",si),ke=new Map,te.programs=ke);let Ge=ke.get(Pe);if(Ge!==void 0){if(te.currentProgram===Ge&&te.lightsStateVersion===ye)return Fe(w,Se),Ge}else Se.uniforms=Ce.getUniforms(w),w.onBeforeCompile(Se,M),Ge=Ce.acquireProgram(Se,Pe),ke.set(Pe,Ge),te.uniforms=Se.uniforms;let ze=te.uniforms;return(w.isShaderMaterial||w.isRawShaderMaterial)&&w.clipping!==!0||(ze.clippingPlanes=_e.uniform),Fe(w,Se),te.needsLights=(function(Qe){return Qe.isMeshLambertMaterial||Qe.isMeshToonMaterial||Qe.isMeshPhongMaterial||Qe.isMeshStandardMaterial||Qe.isShadowMaterial||Qe.isShaderMaterial&&Qe.lights===!0})(w),te.lightsStateVersion=ye,te.needsLights&&(ze.ambientLightColor.value=j.state.ambient,ze.lightProbe.value=j.state.probe,ze.directionalLights.value=j.state.directional,ze.directionalLightShadows.value=j.state.directionalShadow,ze.spotLights.value=j.state.spot,ze.spotLightShadows.value=j.state.spotShadow,ze.rectAreaLights.value=j.state.rectArea,ze.ltc_1.value=j.state.rectAreaLTC1,ze.ltc_2.value=j.state.rectAreaLTC2,ze.pointLights.value=j.state.point,ze.pointLightShadows.value=j.state.pointShadow,ze.hemisphereLights.value=j.state.hemi,ze.directionalShadowMap.value=j.state.directionalShadowMap,ze.directionalShadowMatrix.value=j.state.directionalShadowMatrix,ze.spotShadowMap.value=j.state.spotShadowMap,ze.spotLightMatrix.value=j.state.spotLightMatrix,ze.spotLightMap.value=j.state.spotLightMap,ze.pointShadowMap.value=j.state.pointShadowMap,ze.pointShadowMatrix.value=j.state.pointShadowMatrix),te.currentProgram=Ge,te.uniformsList=null,Ge}function Be(w){if(w.uniformsList===null){let V=w.currentProgram.getUniforms();w.uniformsList=_s.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function Fe(w,V){let X=G.get(w);X.outputColorSpace=V.outputColorSpace,X.batching=V.batching,X.batchingColor=V.batchingColor,X.instancing=V.instancing,X.instancingColor=V.instancingColor,X.instancingMorph=V.instancingMorph,X.skinning=V.skinning,X.morphTargets=V.morphTargets,X.morphNormals=V.morphNormals,X.morphColors=V.morphColors,X.morphTargetsCount=V.morphTargetsCount,X.numClippingPlanes=V.numClippingPlanes,X.numIntersection=V.numClipIntersection,X.vertexAlphas=V.vertexAlphas,X.vertexTangents=V.vertexTangents,X.toneMapping=V.toneMapping}ie.setAnimationLoop(function(w){Er&&Er(w)}),typeof self<"u"&&ie.setContext(self),this.setAnimationLoop=function(w){Er=w,vt.setAnimationLoop(w),w===null?ie.stop():ie.start()},vt.addEventListener("sessionstart",k),vt.addEventListener("sessionend",$),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(V),V=vt.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,V,I),g=rt.get(w,y.length),g.init(V),y.push(g),He.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ue.setFromProjectionMatrix(He,vi,V.reversedDepth),De=this.localClippingEnabled,ne=_e.init(this.clippingPlanes,De),m=qe.get(w,_.length),m.init(),_.push(m),vt.enabled===!0&&vt.isPresenting===!0){let ae=M.xr.getDepthSensingMesh();ae!==null&&Y(ae,V,-1/0,M.sortObjects)}Y(w,V,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(de,ve),D=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,D&&Xe.addToRenderList(m,w),this.info.render.frame++,ne===!0&&_e.beginShadows();let X=g.state.shadowsArray;Ne.render(X,w,V),ne===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();let te=m.opaque,j=m.transmissive;if(g.setupLights(),V.isArrayCamera){let ae=V.cameras;if(j.length>0)for(let ye=0,Se=ae.length;ye<Se;ye++)fe(te,j,w,ae[ye]);D&&Xe.render(w);for(let ye=0,Se=ae.length;ye<Se;ye++){let Pe=ae[ye];xe(m,w,Pe,Pe.viewport)}}else j.length>0&&fe(te,j,w,V),D&&Xe.render(w),xe(m,w,V);I!==null&&b===0&&(W.updateMultisampleRenderTarget(I),W.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(M,w,V),Ut.resetDefaultState(),P=-1,B=null,y.pop(),y.length>0?(g=y[y.length-1],ne===!0&&_e.setGlobalState(M.clippingPlanes,g.state.camera)):g=null,_.pop(),m=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,V,X){let te=G.get(w);te.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),G.get(w.texture).__webglTexture=V,G.get(w.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:X,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){let X=G.get(w);X.__webglFramebuffer=V,X.__useDefaultFramebuffer=V===void 0};let dt=O.createFramebuffer();this.setRenderTarget=function(w,V=0,X=0){I=w,R=V,b=X;let te=!0,j=null,ae=!1,ye=!1;if(w){let Se=G.get(w);if(Se.__useDefaultFramebuffer!==void 0)L.bindFramebuffer(O.FRAMEBUFFER,null),te=!1;else if(Se.__webglFramebuffer===void 0)W.setupRenderTarget(w);else if(Se.__hasExternalTextures)W.rebindTextures(w,G.get(w.texture).__webglTexture,G.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Ge=w.depthTexture;if(Se.__boundDepthTexture!==Ge){if(Ge!==null&&G.has(Ge)&&(w.width!==Ge.image.width||w.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(w)}}let Pe=w.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(ye=!0);let ke=G.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(j=Array.isArray(ke[V])?ke[V][X]:ke[V],ae=!0):j=w.samples>0&&W.useMultisampledRTT(w)===!1?G.get(w).__webglMultisampledFramebuffer:Array.isArray(ke)?ke[X]:ke,F.copy(w.viewport),N.copy(w.scissor),K=w.scissorTest}else F.copy(be).multiplyScalar(J).floor(),N.copy(we).multiplyScalar(J).floor(),K=re;if(X!==0&&(j=dt),L.bindFramebuffer(O.FRAMEBUFFER,j)&&te&&L.drawBuffers(w,j),L.viewport(F),L.scissor(N),L.setScissorTest(K),ae){let Se=G.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+V,Se.__webglTexture,X)}else if(ye){let Se=V;for(let Pe=0;Pe<w.textures.length;Pe++){let ke=G.get(w.textures[Pe]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Pe,ke.__webglTexture,X,Se)}}else if(w!==null&&X!==0){let Se=G.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Se.__webglTexture,X)}P=-1},this.readRenderTargetPixels=function(w,V,X,te,j,ae,ye,Se=0){if(!w||!w.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=G.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){L.bindFramebuffer(O.FRAMEBUFFER,Pe);try{let ke=w.textures[Se],Ge=ke.format,ze=ke.type;if(!U.textureFormatReadable(Ge))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(ze))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");V>=0&&V<=w.width-te&&X>=0&&X<=w.height-j&&(w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Se),O.readPixels(V,X,te,j,$e.convert(Ge),$e.convert(ze),ae))}finally{let ke=I!==null?G.get(I).__webglFramebuffer:null;L.bindFramebuffer(O.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(w,V,X,te,j,ae,ye,Se=0){if(!w||!w.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=G.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){if(V>=0&&V<=w.width-te&&X>=0&&X<=w.height-j){L.bindFramebuffer(O.FRAMEBUFFER,Pe);let ke=w.textures[Se],Ge=ke.format,ze=ke.type;if(!U.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Qe),O.bufferData(O.PIXEL_PACK_BUFFER,ae.byteLength,O.STREAM_READ),w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Se),O.readPixels(V,X,te,j,$e.convert(Ge),$e.convert(ze),0);let yt=I!==null?G.get(I).__webglFramebuffer:null;L.bindFramebuffer(O.FRAMEBUFFER,yt);let wt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Wp(O,wt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Qe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ae),O.deleteBuffer(Qe),O.deleteSync(wt),ae}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,V=null,X=0){let te=Math.pow(2,-X),j=Math.floor(w.image.width*te),ae=Math.floor(w.image.height*te),ye=V!==null?V.x:0,Se=V!==null?V.y:0;W.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,X,0,0,ye,Se,j,ae),L.unbindTexture()};let Ye=O.createFramebuffer(),Jt=O.createFramebuffer();this.copyTextureToTexture=function(w,V,X=null,te=null,j=0,ae=null){let ye,Se,Pe,ke,Ge,ze,Qe,yt,wt;ae===null&&(j!==0?(Yr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=j,j=0):ae=0);let Ct=w.isCompressedTexture?w.mipmaps[ae]:w.image;if(X!==null)ye=X.max.x-X.min.x,Se=X.max.y-X.min.y,Pe=X.isBox3?X.max.z-X.min.z:1,ke=X.min.x,Ge=X.min.y,ze=X.isBox3?X.min.z:0;else{let Bn=Math.pow(2,-j);ye=Math.floor(Ct.width*Bn),Se=Math.floor(Ct.height*Bn),Pe=w.isDataArrayTexture?Ct.depth:w.isData3DTexture?Math.floor(Ct.depth*Bn):1,ke=0,Ge=0,ze=0}te!==null?(Qe=te.x,yt=te.y,wt=te.z):(Qe=0,yt=0,wt=0);let xt=$e.convert(V.format),st=$e.convert(V.type),St;V.isData3DTexture?(W.setTexture3D(V,0),St=O.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(W.setTexture2DArray(V,0),St=O.TEXTURE_2D_ARRAY):(W.setTexture2D(V,0),St=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);let Ht=O.getParameter(O.UNPACK_ROW_LENGTH),et=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ve=O.getParameter(O.UNPACK_SKIP_PIXELS),Sn=O.getParameter(O.UNPACK_SKIP_ROWS),Nl=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Ct.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ct.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ke),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ge),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ze);let Fa=w.isDataArrayTexture||w.isData3DTexture,Si=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){let Bn=G.get(w),Ar=G.get(V),ai=G.get(Bn.__renderTarget),Ul=G.get(Ar.__renderTarget);L.bindFramebuffer(O.READ_FRAMEBUFFER,ai.__webglFramebuffer),L.bindFramebuffer(O.DRAW_FRAMEBUFFER,Ul.__webglFramebuffer);for(let Rr=0;Rr<Pe;Rr++)Fa&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,G.get(w).__webglTexture,j,ze+Rr),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,G.get(V).__webglTexture,ae,wt+Rr)),O.blitFramebuffer(ke,Ge,ye,Se,Qe,yt,ye,Se,O.DEPTH_BUFFER_BIT,O.NEAREST);L.bindFramebuffer(O.READ_FRAMEBUFFER,null),L.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(j!==0||w.isRenderTargetTexture||G.has(w)){let Bn=G.get(w),Ar=G.get(V);L.bindFramebuffer(O.READ_FRAMEBUFFER,Ye),L.bindFramebuffer(O.DRAW_FRAMEBUFFER,Jt);for(let ai=0;ai<Pe;ai++)Fa?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Bn.__webglTexture,j,ze+ai):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Bn.__webglTexture,j),Si?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ar.__webglTexture,ae,wt+ai):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ar.__webglTexture,ae),j!==0?O.blitFramebuffer(ke,Ge,ye,Se,Qe,yt,ye,Se,O.COLOR_BUFFER_BIT,O.NEAREST):Si?O.copyTexSubImage3D(St,ae,Qe,yt,wt+ai,ke,Ge,ye,Se):O.copyTexSubImage2D(St,ae,Qe,yt,ke,Ge,ye,Se);L.bindFramebuffer(O.READ_FRAMEBUFFER,null),L.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Si?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(St,ae,Qe,yt,wt,ye,Se,Pe,xt,st,Ct.data):V.isCompressedArrayTexture?O.compressedTexSubImage3D(St,ae,Qe,yt,wt,ye,Se,Pe,xt,Ct.data):O.texSubImage3D(St,ae,Qe,yt,wt,ye,Se,Pe,xt,st,Ct):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ae,Qe,yt,ye,Se,xt,st,Ct.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ae,Qe,yt,Ct.width,Ct.height,xt,Ct.data):O.texSubImage2D(O.TEXTURE_2D,ae,Qe,yt,ye,Se,xt,st,Ct);O.pixelStorei(O.UNPACK_ROW_LENGTH,Ht),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,et),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ve),O.pixelStorei(O.UNPACK_SKIP_ROWS,Sn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Nl),ae===0&&V.generateMipmaps&&O.generateMipmap(St),L.unbindTexture()},this.initRenderTarget=function(w){G.get(w).__webglFramebuffer===void 0&&W.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?W.setTextureCube(w,0):w.isData3DTexture?W.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?W.setTexture2DArray(w,0):W.setTexture2D(w,0),L.unbindTexture()},this.resetState=function(){R=0,b=0,I=null,L.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};function Kh(i,e){if(e===Eh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===gs||e===Ia){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===gs)for(let a=1;a<=n;a++)r.push(t.getX(0)),r.push(t.getX(a)),r.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(r.push(t.getX(a)),r.push(t.getX(a+1)),r.push(t.getX(a+2))):(r.push(t.getX(a+2)),r.push(t.getX(a+1)),r.push(t.getX(a)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var wl=class extends Jn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new iu(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new vu(t)})}load(e,t,n,r){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Mi.extractUrlBase(e);a=Mi.resolveURL(c,this.path)}else a=Mi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new cs(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Lf){try{a[nt.KHR_BINARY_GLTF]=new _u(e)}catch(u){r&&r(u);return}s=JSON.parse(a[nt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new wu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],p=s.extensionsRequired||[];switch(u){case nt.KHR_MATERIALS_UNLIT:a[u]=new tu;break;case nt.KHR_DRACO_MESH_COMPRESSION:a[u]=new yu(s,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:a[u]=new xu;break;case nt.KHR_MESH_QUANTIZATION:a[u]=new Mu;break;default:p.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}};function V0(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},eu=class{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new Le(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Wt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new dr(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new hr(h),c.distance=u;break;case"spot":c=new ba(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ni(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},tu=class{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return jt}extendParams(e,t,n){let r=[];e.color=new Le(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Wt),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,ct))}return Promise.all(r)}},nu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},iu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(o,o)}return Promise.all(s)}},ru=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},su=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},au=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=r.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ct)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},ou=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},lu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(o[0],o[1],o[2],Wt),Promise.all(s)}},cu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},hu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(o[0],o[1],o[2],Wt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ct)),Promise.all(s)}},uu=class{constructor(e){this.parser=e,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},du=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gt}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},pu=class{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},fu=class{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},mu=class{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},gu=class{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=r.byteOffset||0,c=r.byteLength||0,h=r.count,u=r.byteStride,p=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,p,r.mode,r.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,p,r.mode,r.filter),d})})}else return null}},vu=class{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let c of r.primitives)if(c.mode!==Mn.TRIANGLES&&c.mode!==Mn.TRIANGLE_STRIP&&c.mode!==Mn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],p=c[0].count,d=[];for(let f of u){let v=new Ue,m=new A,g=new sn,_=new A(1,1,1),y=new na(f.geometry,f.material,p);for(let M=0;M<p;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,M),l.SCALE&&_.fromBufferAttribute(l.SCALE,M),y.setMatrixAt(M,v.compose(m,g,_));for(let M in l)if(M==="_COLOR_0"){let E=l[M];y.instanceColor=new Ui(E.array,E.itemSize,E.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&f.geometry.setAttribute(M,l[M]);Mt.prototype.copy.call(y,f),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Lf="glTF",Da=12,Rf={JSON:1313821514,BIN:5130562},_u=class{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Da),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Lf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Da,s=new DataView(e,Da),a=0;for(;a<r;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===Rf.JSON){let c=new Uint8Array(e,Da+a,o);this.content=n.decode(c)}else if(l===Rf.BIN){let c=Da+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},yu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Su[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Su[h]||h.toLowerCase();if(a[h]!==void 0){let p=n.accessors[e.attributes[h]],d=Ms[p.componentType];c[u]=d.name,l[u]=p.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,p){r.decodeDracoFile(h,function(d){for(let f in d.attributes){let v=d.attributes[f],m=l[f];m!==void 0&&(v.normalized=m)}u(d)},o,c,Wt,p)})})}},xu=class{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Mu=class{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}},El=class extends xi{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=r-t,u=(n-t)/h,p=u*u,d=p*u,f=e*c,v=f-c,m=-2*d+3*p,g=d-p,_=1-m,y=g-p+u;for(let M=0;M!==o;M++){let E=a[v+M+o],R=a[v+M+l]*h,b=a[f+M+o],I=a[f+M]*h;s[M]=_*E+y*R+m*b+g*I}return s}},W0=new sn,bu=class extends El{interpolate_(e,t,n,r){let s=super.interpolate_(e,t,n,r);return W0.fromArray(s).normalize().toArray(s),s}},Mn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Cf={9728:hn,9729:rn,9984:hl,9985:ds,9986:fr,9987:Qn},If={33071:Di,33648:jr,10497:Qt},Jh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Su={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Gi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},X0={CUBICSPLINE:void 0,LINEAR:tr,STEP:er},$h={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function j0(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new _t({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Fi})),i.DefaultMaterial}function Mr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ni(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function q0(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(r=!0),u.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let p=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(p)}if(r){let p=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(p)}if(s){let p=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(p)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],p=c[2];return n&&(i.morphAttributes.position=h),r&&(i.morphAttributes.normal=u),s&&(i.morphAttributes.color=p),i.morphTargetsRelative=!0,i})}function Y0(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Z0(i){let e,t=i.extensions&&i.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Qh(t.attributes):e=i.indices+":"+Qh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Qh(i.targets[n]);return e}function Qh(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Tu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function K0(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var J0=new Ue,wu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new V0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);r=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&a<98?this.textureLoader=new lr(this.options.manager):this.textureLoader=new Sa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new cs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:n,userData:{}};return Mr(s,o,r),ni(o,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let a=t[r].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,a){n.load(Mi.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let a=Jh[r.type],o=Ms[r.componentType],l=r.normalized===!0,c=new o(r.count*a);return Promise.resolve(new Dt(c,a,l))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Jh[r.type],c=Ms[r.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,p=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,f=r.normalized===!0,v,m;if(d&&d!==u){let g=Math.floor(p/d),_="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+g+":"+r.count,y=t.cache.get(_);y||(v=new c(o,g*d,r.count*d/h),y=new es(v,d/h),t.cache.add(_,y)),m=new ts(y,l,p%d/h,f)}else o===null?v=new c(r.count*l):v=new c(o,p,r.count*l),m=new Dt(v,l,f);if(r.sparse!==void 0){let g=Jh.SCALAR,_=Ms[r.sparse.indices.componentType],y=r.sparse.indices.byteOffset||0,M=r.sparse.values.byteOffset||0,E=new _(a[1],y,r.sparse.count*g),R=new c(a[2],M,r.sparse.count*l);o!==null&&(m=new Dt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let b=0,I=E.length;b<I;b++){let P=E[b];if(m.setX(P,R[b*l]),l>=2&&m.setY(P,R[b*l+1]),l>=3&&m.setZ(P,R[b*l+2]),l>=4&&m.setW(P,R[b*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=f}return m})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let r=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let p=(s.samplers||{})[a.sampler]||{};return h.magFilter=Cf[p.magFilter]||rn,h.minFilter=Cf[p.minFilter]||Qn,h.wrapS=If[p.wrapS]||Qt,h.wrapT=If[p.wrapT]||Qt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==hn&&h.minFilter!==rn,r.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=r.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let p=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(p),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(p,d){let f=p;t.isImageBitmapLoader===!0&&(f=function(v){let m=new Bt(v);m.needsUpdate=!0,p(m)}),t.load(Mi.resolveURL(u,s.path),f,void 0,d)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),ni(u,a),u.userData.mimeType=a.mimeType||K0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,r){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[nt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new is,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new yi,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(r||s||a){let o="ClonedMaterial:"+n.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return _t}loadMaterial(e){let t=this,n=this.json,r=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[nt.KHR_MATERIALS_UNLIT]){let u=r[nt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new Le(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let p=u.baseColorFactor;o.color.setRGB(p[0],p[1],p[2],Wt),o.opacity=p[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,ct)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(p){return p.getMaterialType&&p.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(p){return p.extendMaterialParams&&p.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=_n);let h=s.alphaMode||$h.OPAQUE;if(h===$h.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===$h.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==jt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new oe(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==jt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==jt){let u=s.emissiveFactor;o.emissive=new Le().setRGB(u[0],u[1],u[2],Wt)}return s.emissiveTexture!==void 0&&a!==jt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ct)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),ni(u,s),t.associations.set(u,{materials:e}),s.extensions&&Mr(r,u,s),u})}createUniqueName(e){let t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function s(o){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Pf(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=Z0(c),u=r[h];if(u)a.push(u.promise);else{let p;c.extensions&&c.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?p=s(c):p=Pf(new ut,c,t),r[h]={primitive:c,promise:p},a.push(p)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?j0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,f=h.length;d<f;d++){let v=h[d],m=a[d],g,_=c[d];if(m.mode===Mn.TRIANGLES||m.mode===Mn.TRIANGLE_STRIP||m.mode===Mn.TRIANGLE_FAN||m.mode===void 0)g=s.isSkinnedMesh===!0?new Qs(v,_):new ht(v,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Mn.TRIANGLE_STRIP?g.geometry=Kh(g.geometry,Ia):m.mode===Mn.TRIANGLE_FAN&&(g.geometry=Kh(g.geometry,gs));else if(m.mode===Mn.LINES)g=new ia(v,_);else if(m.mode===Mn.LINE_STRIP)g=new Wn(v,_);else if(m.mode===Mn.LINE_LOOP)g=new ra(v,_);else if(m.mode===Mn.POINTS)g=new sa(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&Y0(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),ni(g,s),m.extensions&&Mr(r,g,m),t.assignFinalMaterial(g),u.push(g)}for(let d=0,f=u.length;d<f;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return s.extensions&&Mr(r,u[0],s),u[0];let p=new Zt;s.extensions&&Mr(r,p,s),t.associations.set(p,{meshes:e});for(let d=0,f=u.length;d<f;d++)p.add(u[d]);return p})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Lt(Ch.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new ur(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ni(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let s=r.pop(),a=r,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let p=new Ue;s!==null&&p.fromArray(s.array,c*16),l.push(p)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ta(o,l)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,p=r.channels.length;u<p;u++){let d=r.channels[u],f=r.samplers[d.sampler],v=d.target,m=v.node,g=r.parameters!==void 0?r.parameters[f.input]:f.input,_=r.parameters!==void 0?r.parameters[f.output]:f.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",_)),c.push(f),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let p=u[0],d=u[1],f=u[2],v=u[3],m=u[4],g=[];for(let y=0,M=p.length;y<M;y++){let E=p[y],R=d[y],b=f[y],I=v[y],P=m[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let B=n._createAnimationTracks(E,R,b,I,P);if(B)for(let F=0;F<B.length;F++)g.push(B[F])}let _=new ya(s,void 0,g);return ni(_,r),_})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=r.weights.length;l<c;l++)o.morphTargetInfluences[l]=r.weights[l]}),a})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=r.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],p=c[2];p!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(p,J0)});for(let d=0,f=u.length;d<f;d++)h.add(u[d]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new ns:c.length>1?h=new Zt:c.length===1?h=c[0]:h=new Mt,h!==c[0])for(let u=0,p=c.length;u<p;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),ni(h,s),s.extensions&&Mr(n,h,s),s.matrix!==void 0){let u=new Ue;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!r.associations.has(h))r.associations.set(h,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let u=r.associations.get(h);r.associations.set(h,{...u})}return r.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,s=new Zt;n.name&&(s.name=r.createUniqueName(n.name)),ni(s,n),n.extensions&&Mr(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(r.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[p,d]of r.associations)(p instanceof an||p instanceof Bt)&&u.set(p,d);return h.traverse(p=>{let d=r.associations.get(p);d!=null&&u.set(p,d)}),u};return r.associations=c(s),s})}_createAnimationTracks(e,t,n,r,s){let a=[],o=e.name?e.name:e.uuid,l=[];Gi[s.path]===Gi.weights?e.traverse(function(p){p.morphTargetInfluences&&l.push(p.name?p.name:p.uuid)}):l.push(o);let c;switch(Gi[s.path]){case Gi.weights:c=Yn;break;case Gi.rotation:c=Zn;break;case Gi.translation:case Gi.scale:c=Kn;break;default:n.itemSize===1?c=Yn:c=Kn;break}let h=r.interpolation!==void 0?X0[r.interpolation]:tr,u=this._getArrayFromAccessor(n);for(let p=0,d=l.length;p<d;p++){let f=new c(l[p]+"."+Gi[s.path],t.array,u,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(f),a.push(f)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Tu(t.constructor),r=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof Zn?bu:El;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function $0(i,e,t){let n=e.attributes,r=new Xt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(r.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){let h=Tu(Ms[o.componentType]);r.min.multiplyScalar(h),r.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new A,l=new A;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let p=t.json.accessors[u.POSITION],d=p.min,f=p.max;if(d!==void 0&&f!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(f[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(f[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(f[2]))),p.normalized){let v=Tu(Ms[p.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}i.boundingBox=r;let a=new en;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=a}function Pf(i,e,t){let n=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=Su[a]||a.toLowerCase();o in i.attributes||r.push(s(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});r.push(a)}return ot.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ot.workingColorSpace}" not supported.`),ni(i,e),$0(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?q0(i,e.targets,t):i})}function Df(i){let e=91,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296);function n(l){let c=document.createElement("canvas");c.width=c.height=512;let h=c.getContext("2d"),u={stone:"#795437",wood:"#35271f",felt:"#144333",leather:"#8d201b",rug:"#782e25",roof:"#263532",plaster:"#303235",cabinet:"#202225",deck:"#846449"};h.fillStyle=u[l],h.fillRect(0,0,512,512);for(let d=0;d<14e3;d++){let f=t()*512,v=t()*512;h.fillStyle=t()>.5?"#ffffff0a":"#00000010",h.fillRect(f,v,l==="wood"||l==="deck"?40:2,1)}if(l==="stone"){for(let d=0;d<28;d++){let f=t()*512,v=t()*512;h.beginPath(),h.moveTo(f,v);for(let m=0;m<18;m++)f+=12+t()*14,v+=Math.sin(m*.7+d)*8+(t()-.5)*20,h.lineTo(f,v);h.strokeStyle=d%4?"#d7ad7830":"#f0ce9750",h.lineWidth=d%4?.65:1.5,h.stroke()}h.strokeStyle="#141518",h.lineWidth=5,h.strokeRect(0,0,512,512),h.strokeStyle="#d4a04e",h.lineWidth=1.8,h.strokeRect(2,2,508,508)}if(l==="wood"||l==="deck")for(let d=0;d<512;d+=64){h.fillStyle="#00000026",h.fillRect(0,d,512,2);for(let f=d%128?128:0;f<512;f+=256)h.fillRect(f,d,1,64),h.fillStyle="#c5916330",h.fillRect(f+3,d+3,250,1),h.fillStyle="#00000026"}if(l==="rug"){h.fillStyle="#7d2225",h.fillRect(0,0,512,512);for(let d=0;d<12e3;d++)h.fillStyle=d%2?"#e4b48718":"#0000000d",h.fillRect(t()*512,t()*512,1,2);for(let[d,f,v]of[[12,3,"#3c2626"],[21,1,"#b07058"],[35,2,"#242322"],[45,1,"#b07058"]])h.strokeStyle=v,h.lineWidth=f,h.strokeRect(d,d,512-d*2,512-d*2);h.strokeStyle="#a8946155",h.lineWidth=1;for(let d=65;d<460;d+=32)for(let f=65;f<460;f+=32)h.beginPath(),h.moveTo(f-5,d),h.quadraticCurveTo(f,d-9,f+5,d),h.quadraticCurveTo(f,d+9,f-5,d),h.stroke();h.save(),h.translate(256,256);for(let d=0;d<16;d++)h.rotate(Math.PI/8),h.strokeStyle="#b6a16c",h.beginPath(),h.moveTo(0,0),h.bezierCurveTo(25,-26,65,-23,88,0),h.bezierCurveTo(65,23,25,26,0,0),h.stroke();for(let d of[28,94,104])h.beginPath(),h.arc(0,0,d,0,Math.PI*2),h.stroke();h.fillStyle="#c2ac78",h.font="44px Georgia",h.textAlign="center",h.fillText("\u2660",0,16),h.restore()}if(l==="plaster")for(let d=-64;d<600;d+=128)for(let f=-64;f<600;f+=128)h.beginPath(),h.moveTo(f,d-64),h.bezierCurveTo(f+9,d-31,f+47,d-28,f+64,d),h.bezierCurveTo(f+47,d+28,f+9,d+31,f,d+64),h.bezierCurveTo(f-9,d+31,f-47,d+28,f-64,d),h.bezierCurveTo(f-47,d-28,f-9,d-31,f,d-64),h.strokeStyle="#a599784e",h.lineWidth=2.2,h.stroke(),h.fillStyle="#b39157",h.beginPath(),h.arc(f,d-64,2,0,Math.PI*2),h.fill(),h.strokeStyle="#10131880",h.lineWidth=1,h.strokeRect(f-6,d-6,12,12);if(l==="cabinet"){h.fillStyle="#ffffff06";for(let d=0;d<512;d+=4)h.fillRect(0,d,512,1);h.strokeStyle="#0b0e10",h.lineWidth=12,h.strokeRect(18,18,476,476),h.strokeStyle="#947547",h.lineWidth=2,h.strokeRect(27,27,458,458),h.strokeStyle="#4b4b45",h.lineWidth=1,h.strokeRect(32,32,448,448)}if(l==="roof"){h.strokeStyle="#83908644";for(let d=0;d<512;d+=32){h.fillStyle="#00000040",h.fillRect(0,d,512,3);for(let f=d%64?32:0;f<512;f+=64)h.strokeRect(f,d,64,32)}}if(l==="leather")for(let d=0;d<512;d+=128)for(let f=0;f<512;f+=128)h.beginPath(),h.moveTo(f,d),h.lineTo(f+64,d+64),h.lineTo(f+128,d),h.strokeStyle="#31171055",h.lineWidth=4,h.stroke(),h.fillStyle="#d38d5866",h.beginPath(),h.arc(f+64,d+64,5,0,Math.PI*2),h.fill();let p=new tn(c);return p.colorSpace=ct,p.wrapS=p.wrapT=Qt,p.anisotropy=4,i.push(p),p}let r={};for(let l of["stone","wood","felt","leather","rug","roof","plaster","cabinet","deck"]){let c=n(l);r[l]=new(l==="stone"?gt:_t)({map:c,bumpMap:c,bumpScale:{stone:.004,wood:.012,leather:.025,rug:.018,plaster:.012}[l]||.01,roughness:{stone:.18,wood:.4,leather:.38,roof:.8}[l]||.86,metalness:l==="stone"?.3:0})}let s=document.createElement("canvas");s.width=512,s.height=256;let a=s.getContext("2d");a.fillStyle="#29241d",a.fillRect(0,0,512,256);for(let l of[40,168,296,424]){let c=a.createRadialGradient(l,86,2,l,86,43);c.addColorStop(0,"#ffe4a8"),c.addColorStop(.2,"#d59345"),c.addColorStop(1,"#29241d"),a.fillStyle=c,a.fillRect(l-43,43,86,86),a.fillStyle="#ffe5b3",a.fillRect(l-3,60,6,43)}let o=new tn(s);return o.colorSpace=ct,o.mapping=zi,i.push(o),r.stone.envMap=o,r.stone.clearcoat=.85,r.stone.clearcoatRoughness=.12,r.stone.envMapIntensity=.9,r.gold=new _t({color:"#b99958",metalness:.78,roughness:.29}),r.dark=new _t({color:"#182421",metalness:.55,roughness:.35}),r.cream=new _t({color:"#d7c5a1",roughness:.85}),r.rubber=new _t({color:"#171d1c",roughness:.95}),r.red=new _t({color:"#a04730",metalness:.25,roughness:.4}),r.green=new _t({color:"#346044",roughness:.8}),r.light=new _t({color:"#ffe2a8",emissive:"#ffc46a",emissiveIntensity:2.1,roughness:.4}),r.water=new gt({color:"#398b8c",roughness:.16,metalness:.25,clearcoat:1,transparent:!0,opacity:.82}),r.glass=new gt({color:"#a7c4bc",roughness:.13,metalness:.2,transparent:!0,opacity:.2,depthWrite:!1}),r}var Q0=["#f5ecd5","#ffd21a","#1755d9","#dc1727","#7022b9","#ff7815","#087b43","#751b30","#080c15"];function bs(i,e){return e.discipline==="pyramid"?i===0?e.color==="red"?"#ac2838":"#e6b735":"#fff3d9":Q0[i>8?i-8:i]}function Nf(i){let e=new Sl({canvas:i,antialias:!0,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.toneMapping=ll,e.toneMappingExposure=1.02,e.shadowMap.enabled=!0,e.shadowMap.type=el;let t=new Qr;t.background=new Le("#91c7cf"),t.fog=new $s("#91c7cf",45,180);let n=new Lt(47,1,.1,250),r=[],s=Df(r),a=new Map,o=[],l="room",c="",h=document.createElement("canvas");h.width=128,h.height=64;let u=h.getContext("2d"),p=u.createLinearGradient(0,0,0,64);p.addColorStop(0,"#e3dfce"),p.addColorStop(.48,"#9aa49c"),p.addColorStop(1,"#42352a"),u.fillStyle=p,u.fillRect(0,0,128,64);let d=new tn(h);d.colorSpace=ct,d.mapping=zi,r.push(d),t.environment=d,t.environmentIntensity=.55,t.add(new xa("#f3f5ed","#34322c",1.6));let f=new dr("#fff0d6",2.1);f.position.set(-8,18,-15),f.castShadow=!0,f.shadow.mapSize.set(2048,2048),Object.assign(f.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.5,far:50}),f.shadow.bias=-15e-5,f.shadow.normalBias=.015,t.add(f);let v=new hr("#fff1d5",42,25,2);v.position.set(0,6,0),t.add(v);function m(k,$,ie,Y,xe,fe=0,Me=0){let Te=new ht(k,$);return Te.position.set(ie,Y,xe),Te.rotation.set(fe,Me,0),Te.castShadow=Te.receiveShadow=!0,t.add(Te),Te}function g(k,$,ie,Y,xe,fe,Me){return m(new Pn(k,$,ie),Y,xe,fe,Me)}function _(k,$,ie,Y,xe,fe,Me,Te=.045){let Ie=new jn,Be=-k/2,Fe=-ie/2;Ie.moveTo(Be+Te,Fe),Ie.lineTo(Be+k-Te,Fe),Ie.quadraticCurveTo(Be+k,Fe,Be+k,Fe+Te),Ie.lineTo(Be+k,Fe+ie-Te),Ie.quadraticCurveTo(Be+k,Fe+ie,Be+k-Te,Fe+ie),Ie.lineTo(Be+Te,Fe+ie),Ie.quadraticCurveTo(Be,Fe+ie,Be,Fe+ie-Te),Ie.lineTo(Be,Fe+Te),Ie.quadraticCurveTo(Be,Fe,Be+Te,Fe);let dt=Math.min(.018,$/4,Te/2),Ye=new rr(Ie,{depth:$-dt*2,bevelEnabled:!0,bevelThickness:dt,bevelSize:dt,bevelSegments:3,curveSegments:8,steps:1});return Ye.center(),m(Ye,Y,xe,fe,Me,-Math.PI/2)}let y=new Qr;y.background=new Le("#222a2b");for(let[k,$,ie,Y,xe,fe,Me]of[[0,8,0,12,.05,4,"#fff8e8"],[-7,4,1,.05,5,8,"#a6cbd5"],[7,4,-1,.05,4,7,"#e6d1ae"],[0,3,-8,9,5,.05,"#96b6c2"]]){let Te=new ht(new Pn(Y,xe,fe),new jt({color:Me}));Te.position.set(k,$,ie),y.add(Te)}let M=new ys(e),E=M.fromScene(y,.06);t.environment=E.texture,t.environmentIntensity=.65,M.dispose(),y.traverse(k=>{k.geometry?.dispose(),k.material?.dispose()});let R=s.stone.map.clone();R.repeat.set(6,6),R.needsUpdate=!0,r.push(R);let b=new gt({color:"#ffffff",roughness:.4,clearcoat:.22,clearcoatRoughness:.4,metalness:.02});b.map=b.bumpMap=R,b.color.set("#59635b"),b.roughness=.32,b.bumpScale=.012,m(new on(24,24),b,0,0,0,-Math.PI/2);let I=s.plaster.map.clone();I.repeat.set(5,2),I.needsUpdate=!0,r.push(I);let P=s.plaster.clone();P.map=I,g(.25,7,23,P,-11,3.5,0),g(.25,7,23,P,11,3.5,0),g(22,7,.2,P,0,3.5,11);for(let k of[-10.8,10.8])g(.12,.1,22,s.gold,k,1.8,0),g(.12,1.7,22,s.cabinet,k,.9,0);let B=new _t({color:"#34322f",roughness:.9});for(let k=-12;k<=12;k+=2){m(new on(24,.012),B,0,.003,k,-Math.PI/2);let $=m(new on(24,.012),B,k,.003,0,-Math.PI/2);$.rotation.z=Math.PI/2}for(let k of[-10.5,-5.25,0,5.25,10.5])g(.12,6.7,.15,s.dark,k,3.35,-10),g(.025,6,.18,s.gold,k,3.35,-9.98);g(21,.12,.15,s.dark,0,6.6,-10),g(21,.12,.15,s.dark,0,.12,-10),m(new on(28,8),s.deck,0,-.03,-14,-Math.PI/2),g(15,.15,4.6,s.cream,0,.03,-14),g(14.2,.1,3.8,s.water,0,.13,-14);for(let k of[-7.4,7.4])g(.2,.2,4.6,s.gold,k,.15,-14);m(new on(220,160),new _t({color:"#237b8b",metalness:.4,roughness:.2}),0,-.4,-97,-Math.PI/2);for(let k of[-9,9]){g(1.5,.25,3,s.cream,k,.3,-14),g(1.5,.8,.2,s.wood,k,.7,-15.3);let $=m(new Xn(.5,.4,.8,24),s.dark,k,.4,-9);for(let ie=0;ie<9;ie++){let Y=m(new ar(.35,10,8),s.green,k+Math.sin(ie*2)*.45,1.3+ie%3*.35,-9+Math.cos(ie*2)*.4);Y.scale.set(.5,2.2,.3),Y.rotation.z=Math.sin(ie)*.55}}function F(k){let $=document.createElement("canvas");$.width=$.height=1024;let ie=$.getContext("2d");if(ie.fillStyle="#eeeeee",ie.fillRect(0,0,1024,1024),k==="cloth")for(let xe=0;xe<1024;xe+=4)ie.fillStyle="#e7e7e7",ie.fillRect(xe,0,1,1024),ie.fillStyle="#f4f4f4",ie.fillRect(0,xe,1024,1);else for(let xe=0;xe<1024;xe+=3){ie.strokeStyle=xe%9?"#e9e9e9":"#e1e1e1",ie.lineWidth=.7,ie.beginPath(),ie.moveTo(0,xe);for(let fe=0;fe<=1024;fe+=16)ie.lineTo(fe,xe+Math.sin(fe*.012+xe*.025)*1.3);ie.stroke()}let Y=new tn($);return Y.colorSpace=ct,Y.wrapS=Y.wrapT=Qt,Y.anisotropy=Math.min(16,e.capabilities.getMaxAnisotropy()),r.push(Y),Y}let N=F("cloth");N.repeat.set(4,4),s.felt=new _t({map:N,bumpMap:N,bumpScale:12e-5,roughness:.92,color:"#17634f"});let K=F("wood");s.wood=new gt({map:K,bumpMap:K,bumpScale:15e-5,color:"#382016",roughness:.28,clearcoat:.65,clearcoatRoughness:.22});let H=s.gold.clone(),Z=s.dark.clone(),Q=null;function ce(k){Q=k;let $=k.level||0,ie=k.ornament||0;s.felt.color.set(k.felt),s.felt.map=N,s.felt.needsUpdate=!0,s.wood.map=K,s.wood.color.set(k.wood),s.wood.roughness=$<10?.72:$<25?.4:$<50?.26:.16,s.wood.clearcoat=$<10?.06:$<25?.3:$<50?.65:1,s.wood.needsUpdate=!0,H.color.set(k.metal),H.metalness=$<10?0:.86,H.roughness=$<10?.8:$<30?.4:.2,Z.color.set(k.body),Z.map=$<15?s.wood.map:null,Z.roughness=$<10?.8:$<30?.4:.22,Z.needsUpdate=!0,ne.visible=ie>0;for(let Y of ne.children)Y.visible=ie>=Y.userData.tier}let J=new lr;function de(k,$,{repeat:ie=1,bump:Y=.004,preserveColor:xe=!1}={}){J.load(k,fe=>{if(si){fe.dispose();return}if(fe.colorSpace=ct,fe.wrapS=fe.wrapT=Qt,fe.repeat.set(ie,ie),fe.anisotropy=Math.min(16,e.capabilities.getMaxAnisotropy()),r.push(fe),$.map=fe,$.bumpMap=fe,$.bumpScale=Y,k.includes("cloth")){let Me=document.createElement("canvas");Me.width=Me.height=512;let Te=Me.getContext("2d");Te.fillStyle="#155b43",Te.fillRect(0,0,512,512),Te.globalAlpha=.16,Te.filter="blur(1px)",Te.drawImage(fe.image,0,0,512,512);let Ie=new tn(Me);Ie.colorSpace=ct,Ie.wrapS=Ie.wrapT=Qt,Ie.repeat.copy(fe.repeat),Ie.anisotropy=fe.anisotropy,r.push(Ie),$.map=Ie}xe||$.color.set(k.includes("floor")?"#b0a89c":"#ffffff"),($===s.felt||$===s.wood)&&($.userData.originalMap=$.map,$.userData.neutralMap=null),Q&&ce(Q),$.needsUpdate=!0},void 0,()=>{})}de("./assets/player-hall/billiards-floor-v2.webp",b,{repeat:6,bump:.001});let ve=new gt({color:"#15100c",roughness:.82,clearcoat:.08}),be=new _t({color:"#020403",roughness:1});_(10.9,.6,5.9,Z,0,1.75,0,.16),_(10.95,.045,5.95,H,0,1.95,0,.16),_(10.7,.28,5.7,s.wood,0,2.1,0,.12),g(10,.08,5,s.felt,0,2.23,0);let we=new Zt;t.add(we);let re="";function ue(k){let $=Ir(k);if(re===$.spec.name)return;re=$.spec.name;for(let Y of[...we.children])Y.geometry?.dispose(),Y.isLine&&Y.material.dispose(),we.remove(Y);let ie=(Y,xe=2.37)=>new A((Y[0]-500)/100,xe,(Y[1]-250)/100);for(let Y of $.rails){let xe=Y.b[0]-Y.a[0],fe=Y.b[1]-Y.a[1],Me=Math.hypot(xe,fe),Te=[(Y.a[0]+Y.b[0])/2,(Y.a[1]+Y.b[1])/2],Ie=-fe/Me,Be=xe/Me,Fe=[500,250];Y.jaw&&(Fe=$.pockets.slice().sort((V,X)=>Math.hypot(V.center[0]-Te[0],V.center[1]-Te[1])-Math.hypot(X.center[0]-Te[0],X.center[1]-Te[1]))[0].drop),(Fe[0]-Te[0])*Ie+(Fe[1]-Te[1])*Be<0&&(Ie=-Ie,Be=-Be);let dt=new jn;dt.moveTo(-Me/200+.012,-.075),dt.lineTo(Me/200-.012,-.075),dt.lineTo(Me/200-.012,.075),dt.lineTo(-Me/200+.012,.075),dt.closePath();let Ye=new rr(dt,{depth:.15,bevelEnabled:!0,bevelThickness:.015,bevelSize:.012,bevelSegments:3,steps:1});Ye.rotateX(-Math.PI/2),Ye.center();let Jt=new ht(Ye,s.felt);Jt.position.copy(ie([Te[0]-Ie*8.7,Te[1]-Be*8.7],2.36)),Jt.rotation.y=-Math.atan2(fe,xe),Jt.castShadow=Jt.receiveShadow=!0,we.add(Jt)}for(let Y of $.pockets){let xe=[$.rails[6+Y.index*2].b,$.rails[7+Y.index*2].b],fe=[Y.lip[0],Y.lip[1],xe[1],xe[0]],Me=new jn;fe.forEach((Ye,Jt)=>{let w=(Ye[0]-500)/100,V=-(Ye[1]-250)/100;Jt?Me.lineTo(w,V):Me.moveTo(w,V)}),Me.closePath();let Te=new ht(new sr(Me),ve);Te.rotation.x=-Math.PI/2,Te.position.y=2.278,we.add(Te);let Ie=new ht(new ls(new as([Y.ends[0],xe[0],xe[1],Y.ends[1]].map(Ye=>ie(Ye,2.295)),!1,"centripetal"),24,.014,8,!1),ve);Ie.castShadow=!0,we.add(Ie);let Be=new Wn(new ut().setFromPoints([Y.ends[0],xe[0],xe[1],Y.ends[1]].map(Ye=>ie(Ye,2.285))),new yi({color:"#b09562"}));we.add(Be);let Fe=new jn;fe.forEach((Ye,Jt)=>{let w=(Ye[0]-500)/100,V=-(Ye[1]-250)/100;Jt?Fe.lineTo(w,V):Fe.moveTo(w,V)}),Fe.closePath();let dt=new ht(new sr(Fe),be);dt.rotation.x=-Math.PI/2,dt.position.y=2.281,we.add(dt)}}ue({discipline:"pool8"});for(let k of[-4.2,4.2])for(let $ of[-1.9,1.9])g(.5,1.7,.5,Z,k,.85,$),g(.54,.12,.54,H,k,.15,$);for(let k of[-2.69,2.69])for(let $ of[-3.75,-2.5,-1.25,1.25,2.5,3.75]){let ie=m(new qn(.035),s.cream,$,2.252,k);ie.scale.y=.18}for(let k of[-5.2,5.2])for(let $ of[-1.25,1.25]){let ie=m(new qn(.035),s.cream,k,2.252,$);ie.scale.y=.18}let ne=new Zt;t.add(ne),ne.visible=!1;function De(k,$,ie,Y,xe){let fe=new ht(new Pn(k,.008,$),H);fe.position.set(ie,2.25,Y),fe.userData.tier=xe,ne.add(fe)}for(let k of[-2.76,2.76])for(let $ of[-2.65,2.65])De(4.65,.018,$,k,1);for(let k of[-5.28,5.28])De(.018,4.7,k,0,2);for(let k of[-2.63,2.63])for(let $ of[-3.8,-2.5,-1.2,1.2,2.5,3.8]){let ie=new ht(new qn(.055),H);ie.position.set($,2.258,k),ie.scale.y=.18,ie.userData.tier=3,ne.add(ie)}for(let k of[-2.83,2.83])for(let $ of[-2.65,2.65])De(4.65,.012,$,k,4);for(let k of[-5.36,5.36])De(.012,4.7,k,0,5);let He=[new gt({color:"#d52b54",metalness:.3,roughness:.12,clearcoat:1}),new gt({color:"#337be0",metalness:.3,roughness:.12,clearcoat:1})];for(let k of[-2.7,2.7])for(let $ of[-3.15,-1.75,1.75,3.15]){let ie=new ht(new qn(.04),He[$>0?1:0]);ie.position.set($,2.265,k),ie.scale.y=.3,ie.userData.tier=6,ne.add(ie)}for(let k of[-2.69,2.69])for(let $ of[-.32,.32]){let ie=new ht(new qn(.09),H);ie.position.set($,2.26,k),ie.scale.set(1,.15,1.4),ie.userData.tier=7,ne.add(ie)}for(let k of[-2.6,2.6])o.push(m(new Xn(.025,.025,1.5,8),s.dark,k,6,0)),o.push(m(new Xn(.12,.6,.42,32),s.dark,k,5.1,0)),o.push(m(new rs(.53,32),s.light,k,4.87,0,Math.PI/2));function T(k,$={discipline:"pool8"}){let ie=document.createElement("canvas");ie.width=512,ie.height=256;let Y=ie.getContext("2d");if(Y.scale(2,2),Y.fillStyle=$.discipline==="pyramid"?bs(k,$):k>8?"#fff5db":bs(k,$),Y.fillRect(0,0,256,128),k>8&&$.discipline!=="pyramid"&&(Y.fillStyle=bs(k,$),Y.fillRect(0,25,256,78)),k)for(let fe of[64,192])Y.fillStyle=$.discipline==="pool8"?"#ffffff":"#fff9e6",Y.beginPath(),Y.arc(fe,64,$.discipline==="pyramid"?20:19,0,Math.PI*2),Y.fill(),Y.fillStyle="#050708",Y.font=$.discipline==="pyramid"?"bold 27px Arial":"900 34px Arial",Y.textAlign="center",Y.textBaseline="middle",Y.fillText(k,fe,65);let xe=new tn(ie);return xe.colorSpace=ct,r.push(xe),xe}for(let k=0;k<16;k++){let $=m(new ar(.1,64,48),new gt({map:T(k),roughness:.19,metalness:0,clearcoat:.8,clearcoatRoughness:.13,ior:1.52,envMapIntensity:.65}),0,2.37,0);$.rotation.x=-Math.PI/2,a.set(k,$)}let S=document.createElement("canvas");S.width=S.height=64;let z=S.getContext("2d"),D=z.createRadialGradient(32,32,3,32,32,32);D.addColorStop(0,"#00000099"),D.addColorStop(1,"#00000000"),z.fillStyle=D,z.fillRect(0,0,64,64);let x=new tn(S);r.push(x);let C=new Map;for(let k=0;k<16;k++){let $=m(new on(.31,.31),new jt({map:x,transparent:!0,depthWrite:!1}),0,2.277,0,-Math.PI/2);$.castShadow=!1,C.set(k,$)}let U=new ut().setFromPoints([new A,new A]),L=new Wn(U,new va({color:"#f9e3a6",dashSize:.13,gapSize:.08}));t.add(L);let q=new Zt;t.add(q);let G=new gt({color:"#dec18d",roughness:.24,clearcoat:1}),W=new _t({color:"#b6a38a",metalness:.8,roughness:.24}),se=new gt({color:"#e4c390",roughness:.28,clearcoat:.65}),ge=new _t({color:"#182c28",roughness:.65}),he=new _t({color:"#fff0cb",roughness:.3}),Ee=new _t({color:"#497e94",roughness:.9});de("./assets/player-hall/billiards-leather-v2.webp",ge,{repeat:3,bump:.001,preserveColor:!0});let Ae=document.createElement("canvas");Ae.width=128,Ae.height=512;let Ce=Ae.getContext("2d");Ce.fillStyle="#f2dfb9",Ce.fillRect(0,0,128,512);for(let k=0;k<90;k++)Ce.strokeStyle=k%3?"#8061370c":"#fff7dc28",Ce.lineWidth=.5,Ce.beginPath(),Ce.moveTo(k*1.43,0),Ce.bezierCurveTo(k*1.43+1,170,k*1.43-1,340,k*1.43,512),Ce.stroke();let We=new tn(Ae);We.colorSpace=ct,r.push(We),se.map=We,se.bumpMap=We,se.bumpScale=5e-4;function qe(k,$,ie,Y,xe){let fe=new ht(new Xn(ie,Y,$-k,48),xe);fe.rotation.z=Math.PI/2,fe.position.x=-(k+$)/2,fe.castShadow=!0,q.add(fe)}qe(.15,1.1,.014,.022,se),qe(1.1,2.15,.022,.029,G),qe(2.15,2.85,.029,.034,ge),qe(2.85,3,.034,.035,G),qe(.11,.15,.015,.015,he),qe(.09,.11,.015,.015,Ee);for(let k of[1.85,2.15,2.85])qe(k-.012,k+.012,.033,.033,W);for(let k=0;k<40;k++)qe(2.16+k*.017,2.164+k*.017,.03,.03,ge);let rt=new Map;function _e(k,$){if(rt.has(k.id))return rt.get(k.id);let ie=document.createElement("canvas");ie.width=512,ie.height=1024;let Y=ie.getContext("2d");Y.fillStyle=k.color,Y.fillRect(0,0,512,1024);for(let fe=0;fe<160;fe++)Y.strokeStyle=fe%3?"#ffffff08":"#0000000d",Y.lineWidth=.7,Y.beginPath(),Y.moveTo(fe*3.2,0),Y.bezierCurveTo(fe*3.2+2,320,fe*3.2-2,690,fe*3.2,1024),Y.stroke();if(k.id==="carbon")for(let fe=0;fe<1024;fe+=16)for(let Me=0;Me<512;Me+=16)Y.fillStyle=(Me/16+fe/16)%2?"#a7b4bd22":"#00000055",Y.fillRect(Me,fe,14,14);if($>0){for(let fe=0;fe<4;fe++){let Me=64+fe*128;Y.fillStyle=k.metal,Y.beginPath(),Y.moveTo(Me,70),Y.lineTo(Me+25,700),Y.lineTo(Me,850),Y.lineTo(Me-25,700),Y.closePath(),Y.fill(),Y.fillStyle=$>=5?"#f0dfb7":k.id==="ocean"?"#c4dfef":"#d4bb8b",Y.beginPath(),Y.moveTo(Me,160),Y.lineTo(Me+12,680),Y.lineTo(Me,760),Y.lineTo(Me-12,680),Y.closePath(),Y.fill(),$>=5&&(Y.strokeStyle=k.metal,Y.lineWidth=2,Y.beginPath(),Y.moveTo(Me-43,120),Y.bezierCurveTo(Me+38,280,Me-50,410,Me+35,570),Y.stroke()),$>=6&&(Y.fillStyle=k.id==="sovereign"?"#39b990":"#f5d99b",Y.beginPath(),Y.moveTo(Me,870),Y.lineTo(Me+16,910),Y.lineTo(Me,950),Y.lineTo(Me-16,910),Y.closePath(),Y.fill())}for(let fe of[12,28,986,1002])Y.fillStyle=k.metal,Y.fillRect(0,fe,512,$>=5?5:3)}let xe=new tn(ie);return xe.colorSpace=ct,xe.wrapS=Qt,xe.anisotropy=Math.min(16,e.capabilities.getMaxAnisotropy()),r.push(xe),rt.set(k.id,xe),xe}let Ne=document.createElement("canvas");Ne.width=512,Ne.height=64;let Xe=new tn(Ne);Xe.colorSpace=ct,r.push(Xe);let bt=new ht(new on(.52,.055),new jt({map:Xe,transparent:!0}));bt.rotation.x=-Math.PI/2,bt.position.set(-1.65,.032,0),bt.visible=!1,q.add(bt),q.traverse(k=>{if(k.isMesh){k.renderOrder=k===bt?101:100,k.castShadow=!1;for(let $ of[].concat(k.material))$.depthTest=!1,$.depthWrite=!1}});function Re(k,$){let ie=["maple","walnut","aces","ocean","carbon","ruby","signature","sovereign"],Y=Math.max(0,ie.indexOf(k.id));if(G.color.set("#ffffff"),G.map=_e(k,Y),G.roughness=Y?.2:.4,G.clearcoat=Y?.95:.3,G.needsUpdate=!0,se.color.set(k.id==="carbon"?"#303b40":"#f4dfb8"),se.map=k.id==="carbon"?G.map:We,se.needsUpdate=!0,ge.color.set(k.grip),W.color.set(k.metal),bt.visible=!!k.named,k.named){let xe=Ne.getContext("2d");xe.clearRect(0,0,512,64),xe.fillStyle="#c9a34f",xe.fillRect(0,0,512,64),xe.fillStyle="#171a16",xe.font="bold 39px sans-serif",xe.textAlign="center",xe.textBaseline="middle",xe.fillText(String($||"\u0413\u0435\u0440\u043E\u0439").slice(0,28),256,34,490),Xe.needsUpdate=!0}}let tt=m(new or(.1,.008,8,48),new jt({color:"#f6dfac",transparent:!0,opacity:.8}),0,2.285,0,Math.PI/2);tt.castShadow=!1;let $e=performance.now(),Ut=m(new or(.16,.014,8,64),new jt({color:"#ffd775",depthTest:!1,transparent:!0,opacity:.95}),0,2.29,0,Math.PI/2);Ut.castShadow=Ut.receiveShadow=!1,Ut.renderOrder=10,Ut.visible=!1;let pn=new Ta,O=new gn(new A(0,1,0),-2.37);function Et(){let k=i.getBoundingClientRect();e.setSize(k.width,k.height,!1),n.aspect=k.width/k.height,n.updateProjectionMatrix(),Ot(l)}function Ot(k){if(l=k,o.forEach($=>$.visible=k!=="table"),n.up.set(k==="table"?1:0,k==="table"?0:1,0),k==="table"){let $=i.getBoundingClientRect(),ie=Number.parseFloat(getComputedStyle(document.body).getPropertyValue("--billiards-controls-height"))||170,Y=66,xe=Math.min(ie+12,$.height*.48),fe=Math.max(180,$.height-Y-xe),Me=$.width>$.height,Te=Math.max((Me?6.1:11.5)*$.height/fe,(Me?11.5:6.1)*$.height/Math.max(180,$.width-88));n.up.set(Me?0:1,0,Me?-1:0),n.setViewOffset($.width,$.height,0,(xe-Y)/2,$.width,$.height),n.position.set(0,2.3+Te/(2*Math.tan(n.fov*Math.PI/360)),.01),n.lookAt(0,2.25,0)}else n.clearViewOffset(),n.position.set(9,7.2,10),n.lookAt(0,2,-4)}function vt(k,$){let ie=i.getBoundingClientRect();pn.setFromCamera(new oe((k-ie.left)/ie.width*2-1,1-($-ie.top)/ie.height*2),n);let Y=new A;return pn.ray.intersectPlane(O,Y)?{x:Y.x*100+500,y:Y.z*100+250}:null}function ii(k){let $=Ir({discipline:re.includes("\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430")?"pyramid":"pool8"}).pockets[k].center,ie=new A(($[0]-500)/100,2.37,($[1]-250)/100).project(n),Y=i.getBoundingClientRect();return{x:Y.left+(ie.x+1)*Y.width/2,y:Y.top+(1-ie.y)*Y.height/2}}function ri(k,$,ie){let Y=performance.now(),xe=Math.min(.05,(Y-$e)/1e3);$e=Y;let fe=k.discipline+":"+k.color;if(fe!==c){c=fe;for(let[Te,Ie]of a){let Be=Ie.material.map;Ie.material.map=T(Te,k),Ie.material.needsUpdate=!0,Be?.dispose();let Fe=r.indexOf(Be);Fe>=0&&r.splice(Fe,1)}ue(k)}for(let Te of k.balls){let Ie=a.get(Te.id);if(Ie.visible=!Te.pocket,Ie.position.set((Te.x-500)/100,2.27+Vt(k)/100,(Te.y-250)/100),Ie.scale.setScalar(Vt(k)/10),k.moving&&!Te.pocket){let Fe=new A((Te.rollY||0)/Vt(k),-(Te.side||0)/Vt(k),-(Te.rollX||0)/Vt(k)),dt=Fe.length();dt&&Ie.rotateOnWorldAxis(Fe.normalize(),dt*xe)}let Be=C.get(Te.id);Be.visible=Ie.visible,Be.position.set(Ie.position.x+.025,2.277,Ie.position.z+.025)}let Me=!k.moving&&k.selectedTarget!=null?k.balls.find(Te=>Te.id===k.selectedTarget&&!Te.pocket):null;if(Ut.visible=!!Me&&(ie||k.pending?.type==="pyramid-foul")&&l==="table",Me&&(Ut.position.set((Me.x-500)/100,2.29,(Me.y-250)/100),Ut.scale.setScalar(Vt(k)/10)),tt.visible=!1,L.visible=q.visible=ie&&l==="table",L.visible){let Te=k.balls.find(X=>X.id===(k.cueId??0))||k.balls[0],Ie=(Te.x-500)/100,Be=(Te.y-250)/100,Fe=Math.cos($),dt=Math.sin($),Ye=12,Jt=null,w=1/0;for(let X of k.balls){if(X.id===Te.id||X.pocket)continue;let te=(X.x-500)/100-Ie,j=(X.y-250)/100-Be,ae=te*Fe+j*dt,ye=te*te+j*j-ae*ae,Se=Vt(k)*2/100;if(ae>0&&ye<Se*Se){let Pe=Math.max(0,ae-Math.sqrt(Se*Se-ye));Pe<Ye&&(Ye=Pe,Jt=X,w=Pe)}}Fe>0&&(Ye=Math.min(Ye,(4.9-Ie)/Fe)),Fe<0&&(Ye=Math.min(Ye,(-4.9-Ie)/Fe)),dt>0&&(Ye=Math.min(Ye,(2.4-Be)/dt)),dt<0&&(Ye=Math.min(Ye,(-2.4-Be)/dt)),Jt&&Math.abs(Ye-w)<1e-5&&(tt.visible=!0,tt.position.set(Ie+Fe*Ye,2.285,Be+dt*Ye),tt.scale.setScalar(Vt(k)/10),tt.material.color.set(qi(k).some(X=>X.id===Jt.id)?"#dfefca":"#ed7770"));let V=U.attributes.position;V.setXYZ(0,Ie,2.38,Be),V.setXYZ(1,Ie+Fe*Ye,2.38,Be+dt*Ye),V.needsUpdate=!0,L.computeLineDistances(),q.position.set(Ie,2.4,Be),q.rotation.set(0,-$,0)}e.render(t,n)}let Wi=new wl,si=!1,Cs=Promise.allSettled([["armchair/ArmChair_01_1k.gltf",2.4,[[8,.08,4,-Math.PI/2],[-8,.08,4,Math.PI/2]],!0],["plant/potted_plant_01-mobile.gltf",2.8,[[9,.08,-8,0],[-9,.08,-8,1]],!1]].map(async([k,$,ie,Y])=>{let xe=await Wi.loadAsync("assets/city-interior/"+k),fe=xe.scene,Me=new Xt().setFromObject(fe),Te=Me.getSize(new A);if(si){fe.traverse(Ie=>{Ie.geometry?.dispose();for(let Be of[].concat(Ie.material||[])){for(let Fe of Object.values(Be))Fe?.isTexture&&Fe.dispose();Be.dispose()}});return}fe.position.set(-(Me.min.x+Me.max.x)/2,-Me.min.y,-(Me.min.z+Me.max.z)/2),fe.traverse(Ie=>{if(Ie.isMesh)for(let Be of[].concat(Ie.material)){Y&&(Be.color.set("#a52721"),Be.roughnessMap=null,Be.roughness=.33);for(let Fe of Object.values(Be))Fe?.isTexture&&r.push(Fe)}});for(let[Ie,Be,Fe,dt]of ie){if(si)return;let Ye=new Zt;Ye.add(fe.clone()),Ye.scale.setScalar($/Te.y),Ye.position.set(Ie,Be,Fe),Ye.rotation.y=dt,t.add(Ye)}})),Er=new ResizeObserver(Et);return Er.observe(i),Et(),{render:ri,point:vt,projectPocket:ii,setView:Ot,setCue:Re,setTableSkin:ce,ready:Cs,dispose(){si=!0,Er.disconnect(),t.traverse(k=>{k.geometry?.dispose();for(let $ of[].concat(k.material||[]))$.dispose()}),r.forEach(k=>k.dispose()),E.dispose(),e.dispose()}}}var ev=i=>i===8?null:i<8?0:1;function tv(i){if(i.rulesVersion)return qi(i);let e=i.groups[i.turn],t=i.balls.filter(n=>n.id&&n.id!==8&&!n.pocket&&(e===null||ev(n.id)===e));return t.length?t:i.balls.filter(n=>n.id===8&&!n.pocket)}function Uf(i,e,t,n,r=Hl){let s=e.x-i.x,a=e.y-i.y,o=s*s+a*a;return!t.some(l=>!l.pocket&&!n.includes(l.id)&&(()=>{let c=((l.x-i.x)*s+(l.y-i.y)*a)/o;return c<=0||c>=1?!1:Math.hypot(l.x-i.x-s*c,l.y-i.y-a*c)<r*2+1})())}function Of(i){if(i.moving||i.winner!==null)return null;if(i.pending){let o=i.pending;return o.type==="pyramid-foul"?{type:"decision",choice:"play",ballId:i.balls.find(l=>!l.pocket).id}:{type:"decision",choice:o.illegal?"rerack-self":"accept"}}if(i.inHand){for(let o=180;o<wi-30;o+=45)for(let l=Ei/2;l<Ei-25;l+=30){let c=structuredClone(i);if(Ga(c,o,l))return{type:"place",x:o,y:l}}for(let o=30;o<wi-25;o+=25)for(let l=30;l<Ei-25;l+=25){let c=structuredClone(i);if(Ga(c,o,l))return{type:"place",x:o,y:l}}return null}let e=i.discipline==="pyramid"?i.balls.find(o=>o.id===i.cueId&&!o.pocket)||i.balls.find(o=>!o.pocket):i.balls[0],t=i.rulesVersion?Vt(i):Hl,n={...i,cueId:e.id},r=tv(n),s=null;for(let o of r)for(let[l,[c,h]]of Vl.entries()){let u=Math.hypot(c-o.x,h-o.y);if(u<1)continue;let p=(c-o.x)/u,d=(h-o.y)/u,f={x:o.x-p*t*2,y:o.y-d*t*2};if(f.x<t||f.x>wi-t||f.y<t||f.y>Ei-t)continue;let v=Math.hypot(f.x-e.x,f.y-e.y),m=((f.x-e.x)*p+(f.y-e.y)*d)/Math.max(1,v);if(m<.25||!Uf(e,f,i.balls,[e.id,o.id],t)||!Uf(o,{x:c,y:h},i.balls,[e.id,o.id],t))continue;let g=m*700-v*.25-u*.4;s&&s.score>=g||(s={score:g,type:"shot",cueId:e.id,callBall:o.id,callPocket:l,angle:Math.atan2(f.y-e.y,f.x-e.x),power:Math.max(.15,Math.min(.85,(Math.sqrt(2*.018*9810*1e3/ji(i).length*(v+u/Math.max(.3,m)))/.714-180)/1250+.05))})}if(s)return delete s.score,s;let a=r.slice().sort((o,l)=>Math.hypot(o.x-e.x,o.y-e.y)-Math.hypot(l.x-e.x,l.y-e.y))[0];return a?{type:"shot",cueId:e.id,callBall:a.id,callPocket:0,angle:Math.atan2(a.y-e.y,a.x-e.x),power:.4}:null}function Al(i,e,t){let n=document.createElement("small");n.className="room-control__label",n.textContent=e;let r=document.createElement("strong");r.className="room-control__value",r.textContent=e==="\u041A\u0438\u0439"?"\u041A\u0438\u0439":t,i.replaceChildren(n,r),i.title=e+" \xB7 "+t,i.setAttribute("aria-label","\u0412\u044B\u0431\u0440\u0430\u0442\u044C "+e.toLowerCase()+". \u0412\u044B\u0431\u0440\u0430\u043D: "+t)}var Il=Hu(Ff(),1),Cl=Il.default.cues,nv=Il.default.available;function Eu(i){if(!i?.self||!i.accountId)throw Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u0433\u0435\u0440\u043E\u044F.");let e=Number(i.garage?.stats?.level);if(!Number.isFinite(e)||e<0)throw Error("\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.");return{accountId:String(i.accountId),level:Math.floor(e),nick:String(i.nick||i.name||"\u0413\u0435\u0440\u043E\u0439").trim().slice(0,28)}}function kf({source:i,room:e,openInitially:t=!1}){let n=d=>document.getElementById(d),r=n("cueDialog"),s=null,a=Cl[0],o=!1;function l(){return"p21:billiards:cue:v1:"+s.accountId}function c(d){a=d,e?.setCue(d,s?.nick||""),Al(n("cueButton"),"\u041A\u0438\u0439",d.name),Il.default.paintPreview(document.querySelector("main"),d,s?.nick||"")}function h(){let d=document.activeElement?.dataset?.cue;if(n("cueSave").disabled=o,n("cueHero").textContent=o?"\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F\u2026":s?"\u0412\u0430\u0448 \u0433\u0435\u0440\u043E\u0439 \xB7 \u0443\u0440\u043E\u0432\u0435\u043D\u044C "+s.level:"\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u0438\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C",n("cueList").replaceChildren(),Cl.forEach((f,v)=>{let m=!!s&&s.level>=f.level||f.level===0,g=document.createElement("button");g.type="button",g.className="cue-card",g.dataset.cue=f.id,g.setAttribute("aria-pressed",String(a.id===f.id)),g.disabled=!m||o;let _=document.createElement("img");_.className="cue-card__art",_.src=f.art,_.alt="\u041A\u0438\u0439 \xAB"+f.name+"\xBB",_.loading="lazy",_.decoding="async";let y=document.createElement("strong");y.textContent=f.name;let M=document.createElement("small");M.textContent=f.level?"\u0421 "+f.level+" \u0443\u0440\u043E\u0432\u043D\u044F":"\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C";let E=document.createElement("span");if(E.className="cue-card__state",E.textContent=m?a.id===f.id?"\u2713 \u0412\u044B\u0431\u0440\u0430\u043D":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C":"\u{1F512} \u0415\u0449\u0451 "+Math.max(0,f.level-(s?.level||0))+" \u0443\u0440.",g.append(_,y,M),f.named){let R=document.createElement("span");R.className="cue-card__name",R.textContent=s?.level>=f.level?s.nick:"\u0412\u0430\u0448 \u043D\u0438\u043A \u043D\u0430 \u043A\u0438\u0435",g.append(R)}g.append(E),g.onclick=()=>{if(!(o||!m)){c(f);try{s&&(localStorage.setItem(l(),f.id),parent!==window&&parent.postMessage({type:"p21-billiards-cue-saved"},location.origin))}catch{}h(),n("cueFeedback").textContent="\u0412\u044B\u0431\u0440\u0430\u043D \u043A\u0438\u0439 \xAB"+f.name+"\xBB"+(f.named?" \xB7 "+s.nick:"")+"."}},n("cueList").append(g)}),d){let f=Array.from(n("cueList").children).find(v=>v.dataset.cue===d);f&&!f.disabled&&f.focus({preventScroll:!0})}}async function u(){if(!o){o=!0,h(),n("cueError").textContent="";try{if(typeof i.pokerSocialRequest!="function")throw Error("\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0438\u043B\u044C\u044F\u0440\u0434 \u0438\u0437 \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u043E\u043C\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F.");let d=await i.pokerSocialRequest("player-hall",{action:"get"});s=Eu(d.hall);let f;try{f=localStorage.getItem(l())}catch{}c(nv(f,s.level))}catch(d){s=null,c(Cl[0]),n("cueError").textContent=d.message||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0433\u0435\u0440\u043E\u044F."}finally{o=!1,h()}}}n("cueSave").onclick=()=>{if(!o)try{s&&localStorage.setItem(l(),a.id),c(a),parent!==window&&parent.postMessage({type:"p21-billiards-cue-saved"},location.origin),r.close()}catch{n("cueError").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."}},n("cueRetry").onclick=u,n("cueClose").onclick=()=>r.close(),r.addEventListener("click",d=>{if(d.target===r){let f=r.getBoundingClientRect();(d.clientX<f.left||d.clientX>f.right||d.clientY<f.top||d.clientY>f.bottom)&&r.close()}});function p(){r.open||r.showModal(),u()}return n("cueButton").onclick=p,c(Cl[0]),h(),u(),t&&p(),{open:p,inspect:()=>({selected:a.id,level:s?.level??null,nick:s?.nick||"",loading:o})}}var Au=Hu(Gf(),1),Ss=Au.default.skins,iv=Au.default.available;function Hf({source:i,room:e,openInitially:t=!1}){let n=document.createElement("button");n.id="tableSkinButton",n.className="table-skin-button",n.textContent="\u0421\u0442\u043E\u043B \xB7 \u041A\u043B\u0430\u0441\u0441\u0438\u043A\u0430",document.querySelector("main").append(n);let r=document.createElement("dialog");r.className="table-skin-dialog",r.setAttribute("aria-label","\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F \u0431\u0438\u043B\u044C\u044F\u0440\u0434\u043D\u044B\u0445 \u0441\u0442\u043E\u043B\u043E\u0432"),r.innerHTML='<div class="cue-dialog__heading"><div><small>TWO ACES \xB7 \u041A\u041E\u041B\u041B\u0415\u041A\u0426\u0418\u042F</small><h2>\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u043E\u043B</h2></div><button type="button" data-close aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C">\u2715</button></div><p data-hero></p><div class="table-skin-list"></div><p data-error role="status"></p><div class="cue-dialog__footer"><button class="primary" data-save>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button><small>\u041C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434. \u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438 \u0444\u0438\u0437\u0438\u043A\u0430 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435.</small></div>',document.querySelector("main").append(r);let s=null,a=Ss[0],o=!1;function l(d){a=d,e?.setTableSkin(d),document.body.style.backgroundImage='url("'+d.image+'")',Al(n,"\u0421\u0442\u043E\u043B",d.name)}function c(d){return d.level===0||!!s&&s.level>=d.level?a.id===d.id?"\u2713 \u0412\u044B\u0431\u0440\u0430\u043D":d.level?"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \xB7 \u0441 "+d.level+" \u0443\u0440\u043E\u0432\u043D\u044F":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \xB7 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C":"\u{1F512} \u0421 "+d.level+" \u0443\u0440\u043E\u0432\u043D\u044F"}function h(){let d=r.querySelector(".table-skin-list").scrollTop;r.querySelector("[data-hero]").textContent=o?"\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F\u2026":s?"\u0423\u0440\u043E\u0432\u0435\u043D\u044C "+s.level+" \xB7 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E "+Ss.filter(v=>v.level<=s.level).length+" \u0438\u0437 "+Ss.length+" \u0441\u0442\u043E\u043B\u043E\u0432":"\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u0441\u0442\u043E\u043B \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0432\u0441\u0435\u043C",r.querySelector("[data-save]").disabled=o;let f=r.querySelector(".table-skin-list");f.replaceChildren();for(let v of Ss){let m=v.level===0||!!s&&s.level>=v.level,g=document.createElement("button");g.type="button",g.className="table-skin-card",g.dataset.skin=v.id,g.disabled=o||!m,g.setAttribute("aria-pressed",String(a.id===v.id));let _=document.createElement("img");_.loading="lazy",_.decoding="async",_.src=v.image,_.alt=v.name;let y=document.createElement("strong");y.textContent=v.name;let M=document.createElement("small");M.textContent=v.description;let E=document.createElement("span");E.textContent=c(v),g.append(_,y,M,E),g.onclick=()=>{if(m&&!o){l(v);for(let R of f.children){let b=Ss.find(I=>I.id===R.dataset.skin);R.setAttribute("aria-pressed",String(b.id===a.id)),R.lastElementChild.textContent=c(b)}}},f.append(g)}f.scrollTop=d}async function u(){if(!o){o=!0,h(),r.querySelector("[data-error]").textContent="";try{let d=await i.pokerSocialRequest("player-hall",{action:"get"});s=Eu(d.hall);let f;try{f=localStorage.getItem("p21:billiards:table:v1:"+s.accountId)}catch{}l(iv(f,s.level))}catch{s=null,l(Ss[0]),r.querySelector("[data-error]").textContent="\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0432\u043E\u0439 \u0434\u043E\u043C, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u044F \u0438 \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u043E\u043B\u044B."}finally{o=!1,h()}}}function p(){r.open||r.showModal(),u()}return n.onclick=p,r.querySelector("[data-close]").onclick=()=>r.close(),r.querySelector("[data-save]").onclick=()=>{try{s&&localStorage.setItem("p21:billiards:table:v1:"+s.accountId,a.id),parent!==window&&parent.postMessage({type:"p21-billiards-table-saved"},location.origin),r.close()}catch{r.querySelector("[data-error]").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435."}},l(a),h(),u(),t&&p(),{open:p,inspect:()=>({selected:a.id,level:s?.level??null})}}function rv(i,{player:e,ready:t,call:n={},placing:r=!1,penaltyPicking:s=!1}){return t?i.winner!==null?null:i.moving?{kind:"waiting",title:"\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438",detail:"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0448\u0430\u0440\u043E\u0432."}:i.turn===e?i.pending&&s?{kind:"mine",title:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0448\u0430\u0440",detail:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0448\u0430\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435 \u2014 \u0432\u044B \u0437\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0435\u0433\u043E \u0441\u0435\u0431\u0435."}:i.pending?{kind:"mine",title:"\u0412\u0430\u0448\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435",detail:"\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435\xBB \u0438 \u0440\u0435\u0448\u0438\u0442\u0435, \u043A\u0430\u043A \u0438\u0433\u0440\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435."}:i.inHand||r?{kind:"mine",title:"\u0412\u0430\u0448 \u0445\u043E\u0434",detail:"\u041A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0431\u0438\u0442\u043E\u043A."}:i.breakPending?{kind:"mine",title:"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u0432\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435",detail:"\u041F\u0440\u0438\u0446\u0435\u043B\u044C\u0442\u0435\u0441\u044C \u043A\u0438\u0435\u043C, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043B\u0443 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0423\u0434\u0430\u0440\xBB."}:i.discipline==="pool8"&&!n.safety&&(n.callBall===null||n.callPocket===null)?{kind:"mine",title:"\u0412\u0430\u0448 \u0445\u043E\u0434",detail:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443, \u0437\u0430\u0442\u0435\u043C \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u0442\u0435\u0441\u044C \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0423\u0434\u0430\u0440\xBB."}:{kind:"mine",title:"\u0412\u0430\u0448 \u0445\u043E\u0434",detail:"\u041F\u0440\u0438\u0446\u0435\u043B\u044C\u0442\u0435\u0441\u044C \u043A\u0438\u0435\u043C, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043B\u0443 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0423\u0434\u0430\u0440\xBB."}:{kind:"waiting",title:"\u0425\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430",detail:i.pending?"\u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438.":i.breakPending?"\u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442. \u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0435\u0433\u043E \u0443\u0434\u0430\u0440\u0430.":"\u0412\u0430\u043C \u043F\u043E\u043A\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0430\u0436\u0438\u043C\u0430\u0442\u044C \u043D\u0435 \u043D\u0443\u0436\u043D\u043E \u2014 \u0434\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0443\u0434\u0430\u0440\u0430."}:{kind:"waiting",title:"\u0421\u0432\u044F\u0437\u044C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F",detail:"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F. \u0423\u0434\u0430\u0440 \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D."}}function Vf(){let i=document.createElement("aside");i.id="turnGuide",i.className="turn-guide",i.hidden=!0,i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.innerHTML="<strong></strong><span></span>",document.querySelector("main").append(i);let e=i.querySelector("strong"),t=i.querySelector("span"),n=s=>document.getElementById(s),r=(s,a)=>{s.textContent!==a&&(s.textContent=a)};return{render(s,a){let o=(a.mode==="online"||a.penaltyPicking)&&a.tableView,l=o?rv(s,a):null;i.hidden=!l,l&&(i.dataset.kind=l.kind,r(e,l.title),r(t,l.detail),s.winner===null&&r(n("status"),l.title));let c=a.mode==="online"&&s.winner===null&&(!a.ready||s.turn!==a.player);r(n("shoot"),c?"\u0416\u0434\u0438\u0442\u0435":"\u0423\u0434\u0430\u0440"),n("shoot").title=c?a.ready?"\u0421\u0435\u0439\u0447\u0430\u0441 \u0445\u043E\u0434 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430. \u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0435\u0433\u043E \u0445\u043E\u0434\u0430.":"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0432\u044F\u0437\u0438.":"\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0443\u0434\u0430\u0440",n("power").disabled=!a.ready||s.turn!==a.player||s.moving||s.winner!==null||!!s.pending}}}function Ru(i,e=!0){let t=i.pending||{},n=t.type==="pyramid-foul",r=e?"\u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A":"\u0412\u044B",s,a;i.firstHit===null?(s=r+(e?" \u043D\u0435 \u043F\u043E\u043F\u0430\u043B \u043F\u043E \u0448\u0430\u0440\u0430\u043C":" \u043D\u0435 \u043F\u043E\u043F\u0430\u043B\u0438 \u043F\u043E \u0448\u0430\u0440\u0430\u043C"),a="\u0411\u0438\u0442\u043E\u043A \u043D\u0435 \u043A\u043E\u0441\u043D\u0443\u043B\u0441\u044F \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0448\u0430\u0440\u0430."):!n&&i.scratch?(s=r+(e?" \u0437\u0430\u0431\u0438\u043B \u0431\u0438\u0442\u043E\u043A":" \u0437\u0430\u0431\u0438\u043B\u0438 \u0431\u0438\u0442\u043E\u043A"),a="\u0411\u0435\u043B\u044B\u0439 \u0448\u0430\u0440 \u043F\u043E\u043F\u0430\u043B \u0432 \u043B\u0443\u0437\u0443."):!n&&i.illegalHead?(s=r+(e?" \u0443\u0434\u0430\u0440\u0438\u043B \u043F\u043E \u0448\u0430\u0440\u0443 \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043C\u0430":" \u0443\u0434\u0430\u0440\u0438\u043B\u0438 \u043F\u043E \u0448\u0430\u0440\u0443 \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043C\u0430"),a="\u041F\u0440\u0438 \u0443\u0434\u0430\u0440\u0435 \u0438\u0437 \u0434\u043E\u043C\u0430 \u0431\u0438\u0442\u043E\u043A \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0439\u0442\u0438 \u0437\u0430 \u043B\u0438\u043D\u0438\u044E \u0434\u043E\u043C\u0430."):!n&&Array.isArray(i.legalFirst)&&!i.legalFirst.includes(i.firstHit)?(s=r+(i.firstHit===8?e?" \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0440\u0430\u043D\u043E \u0437\u0430\u0434\u0435\u043B \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0443":" \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0440\u0430\u043D\u043E \u0437\u0430\u0434\u0435\u043B\u0438 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0443":e?" \u043F\u0435\u0440\u0432\u044B\u043C \u0437\u0430\u0434\u0435\u043B \u0447\u0443\u0436\u043E\u0439 \u0448\u0430\u0440":" \u043F\u0435\u0440\u0432\u044B\u043C\u0438 \u0437\u0430\u0434\u0435\u043B\u0438 \u0447\u0443\u0436\u043E\u0439 \u0448\u0430\u0440"),a="\u041F\u0435\u0440\u0432\u044B\u043C \u043A\u0430\u0441\u0430\u043D\u0438\u0435\u043C \u043D\u0443\u0436\u043D\u043E \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u043F\u043E \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u043C\u0443 \u0448\u0430\u0440\u0443 \u0441\u0432\u043E\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B."):t.illegalBreak||t.illegal?(s=r+(e?" \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043B \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0440\u0430\u0437\u0431\u043E\u044F":" \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043B\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0440\u0430\u0437\u0431\u043E\u044F"),a=n?"\u041D\u0438 \u043E\u0434\u0438\u043D \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442. \u041D\u0443\u0436\u043D\u043E, \u0447\u0442\u043E\u0431\u044B \u0442\u0440\u0438 \u0448\u0430\u0440\u0430 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u043E\u0432, \u043B\u0438\u0431\u043E \u0434\u0432\u0430 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u043E\u0432 \u0438 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043F\u0435\u0440\u0435\u0441\u0451\u043A \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0443 \u0441\u0442\u043E\u043B\u0430.":"\u041D\u0438 \u043E\u0434\u0438\u043D \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442, \u0438 \u043C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u0442\u044B\u0440\u0451\u0445 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u043E\u0432 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u043E\u0432."):n?(s=r+(e?" \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043B \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0443\u0434\u0430\u0440\u0430":" \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u043B\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0443\u0434\u0430\u0440\u0430"),a="\u041D\u0438 \u043E\u0434\u0438\u043D \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442. \u041F\u043E\u0441\u043B\u0435 \u0441\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u0448\u0430\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u043A\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F \u0434\u0432\u0443\u0445 \u0440\u0430\u0437\u043D\u044B\u0445 \u0431\u043E\u0440\u0442\u043E\u0432 \u043B\u0438\u0431\u043E \u043A\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F \u0431\u043E\u0440\u0442\u0430 \u0438 \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u044C \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0443 \u0441\u0442\u043E\u043B\u0430."):t.eight&&!t.foul?(s="\u041D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u0437\u0430\u0431\u0438\u0442\u0430 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",a="\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0430 \u043D\u0430 \u0441\u0442\u043E\u043B."):t.foul&&!i.sunk?.length&&!i.railAfter?(s=r+(e?" \u043D\u0435 \u0434\u043E\u0432\u0451\u043B \u0448\u0430\u0440 \u0434\u043E \u0431\u043E\u0440\u0442\u0430":" \u043D\u0435 \u0434\u043E\u0432\u0435\u043B\u0438 \u0448\u0430\u0440 \u0434\u043E \u0431\u043E\u0440\u0442\u0430"),a="\u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0435 \u0437\u0430\u0431\u0438\u0442 \u043D\u0438 \u043E\u0434\u0438\u043D \u0448\u0430\u0440 \u0438 \u043D\u0438 \u043E\u0434\u0438\u043D \u0448\u0430\u0440 \u043D\u0435 \u043A\u043E\u0441\u043D\u0443\u043B\u0441\u044F \u0431\u043E\u0440\u0442\u0430."):(s="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438",a="\u0423\u0434\u0430\u0440 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D, \u0438 \u043D\u0443\u0436\u043D\u043E \u0440\u0435\u0448\u0438\u0442\u044C, \u043A\u0430\u043A \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0438\u0433\u0440\u0443.");let o=e?n?"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430 \u0441\u0442\u043E\u043B\u0435\xBB \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0448\u0430\u0440. \u0415\u0433\u043E \u0441\u043D\u0438\u043C\u0443\u0442 \u0441\u043E \u0441\u0442\u043E\u043B\u0430 \u0438 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u044E\u0442 \u0432\u0430\u043C. \u041F\u043E\u0434 \u0441\u0442\u043E\u043B\u043E\u043C \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043A\u043D\u043E\u043F\u043A\u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F \u0438\u0433\u0440\u044B.":t.illegal?"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435: \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439 \u0438\u043B\u0438 \u0440\u0430\u0441\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0448\u0430\u0440\u044B \u0437\u0430\u043D\u043E\u0432\u043E. \u0412 \u043A\u043D\u043E\u043F\u043A\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E, \u043A\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0442\u044C.":t.eight?"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435 \u0438\u0433\u0440\u0443 \u0441 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0439 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u043E\u0439 \u0438\u043B\u0438 \u0440\u0430\u0437\u0431\u0435\u0439\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443 \u0437\u0430\u043D\u043E\u0432\u043E.":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435: \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439 \u0438\u043B\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0432 \u0434\u043E\u043C\u0435. \u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u0442\u0435\u0441\u044C \u0438 \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u0443\u0434\u0430\u0440.":"\u0422\u0435\u043F\u0435\u0440\u044C \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435. \u0412\u0430\u043C \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0430\u0436\u0438\u043C\u0430\u0442\u044C \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.";return{title:s,reason:a,next:o}}var Wf=["\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043B\u0435\u0432\u0430","\u041D\u0438\u0436\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430","\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0441\u043F\u0440\u0430\u0432\u0430"],ee=i=>document.getElementById(i);function Xf({move:i,room:e}){let t=0,n="",r=null,s=!1,a="",o=!1,l=null;function c(){return{discipline:ee("discipline").value,color:ee("ballSet").value,raceTo:Number(ee("raceTo").value)}}function h(b){let I=ee(b);ee(b+"Buttons").replaceChildren(...Array.from(I.options,P=>{let B=document.createElement("button");return B.type="button",B.dataset.value=P.value,B.textContent=P.text,B.setAttribute("aria-pressed",String(I.value===P.value)),B.onclick=()=>{I.value=P.value,I.dispatchEvent(new Event("change"))},B}))}function u(){let b=ee("discipline").value==="pyramid";ee("ballSet").replaceChildren(...(b?[["yellow","\u0411\u0435\u043B\u044B\u0435 + \u0436\u0451\u043B\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"],["red","\u0411\u0435\u043B\u044B\u0435 + \u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0431\u0438\u0442\u043E\u043A"]]:[["standard","\u0426\u0432\u0435\u0442\u043D\u044B\u0435: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \u0438 \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435"]]).map(([P,B])=>new Option(B,P))),ee("disciplineInfo").textContent=b?"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430: \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u0442\u044C 8 \u0448\u0430\u0440\u043E\u0432. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0431\u0438\u0442\u043A\u043E\u043C \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440.":"\u041F\u0443\u043B \xAB\u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430\xBB: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0432\u043E\u044F \u0433\u0440\u0443\u043F\u043F\u0430, \u0437\u0430\u0442\u0435\u043C \u2116 8. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.";let I=ji(ee("discipline").value);ee("tableDimensions").textContent=I.name+" \xB7 \u0448\u0430\u0440\u044B "+I.ball+" \u043C\u043C \xB7 \u0441\u0442\u0432\u043E\u0440\u044B "+I.corner+" / "+I.side+" \u043C\u043C",h("discipline"),h("ballSet")}ee("penaltyLabel").firstChild.textContent="\u0428\u0430\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u043D \u0432\u0430\u043C:",ee("callBall").parentElement.firstChild.textContent="\u041A\u0430\u043A\u043E\u0439 \u0448\u0430\u0440 \u0437\u0430\u0431\u0438\u0442\u044C",ee("callPocket").parentElement.firstChild.textContent="\u0412 \u043A\u0430\u043A\u0443\u044E \u043B\u0443\u0437\u0443";let p=document.createElement("button");p.id="penaltyPick",p.type="button",p.textContent="\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430 \u0441\u0442\u043E\u043B\u0435",p.className="primary",ee("penaltyLabel").after(p),p.onclick=()=>{o=!0,ee("decisionDialog").close()},ee("decisionClose").onclick=()=>{l||ee("decisionDialog").close()},ee("decisionOk").onclick=()=>{l=null,ee("decisionDialog").close()},ee("decisionDialog").addEventListener("cancel",b=>{l&&b.preventDefault()}),ee("decisionOpen").onclick=()=>{o=!1,ee("decisionDialog").open||ee("decisionDialog").showModal()};let d=document.createElement("div");d.id="penaltyConfirm",d.hidden=!0,d.innerHTML='<button type="button" class="primary" data-penalty-play></button><button type="button" data-penalty-pass>\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0448\u0430\u0440 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0445\u043E\u0434</button>',ee("decisionOpen").after(d);function f(b){let I=Number(ee("penaltyBall").value);ee("penaltyBall").value===""||r?.pending?.type!=="pyramid-foul"||(o=!1,d.hidden=!0,i({type:"decision",choice:b,ballId:I}))}d.querySelector("[data-penalty-play]").onclick=()=>f("play"),d.querySelector("[data-penalty-pass]").onclick=()=>f("pass"),ee("placeBreak").onclick=()=>s=!s,ee("discipline").onchange=u,ee("ballSet").onchange=()=>h("ballSet"),u(),Wf.forEach((b,I)=>ee("callPocket").add(new Option(I+1+" \xB7 "+b,String(I)))),ee("callBall").onchange=ee("callPocket").onchange=ee("safety").onchange=()=>{},ee("decisionButtons").onclick=b=>{let I=b.target.closest("[data-decision]")?.dataset.decision;I&&(ee("decisionDialog").close(),i({type:"decision",choice:I,ballId:Number(ee("penaltyBall").value)}))},ee("pocketMarkers").replaceChildren(...Wf.map((b,I)=>{let P=document.createElement("button");return P.type="button",P.textContent=I+1,P.title=b,P.setAttribute("aria-label","\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0443\u0437\u0443 "+(I+1)+" \xB7 "+b),P.onclick=()=>ee("callPocket").value=String(I),P}));function v(b,I){let P=document.createElement("span");return P.className="potted-ball"+(I.discipline!=="pyramid"&&b>8?" striped":""),P.style.setProperty("--ball-color",bs(b,I)),P.textContent=b||"",P.title=b?"\u0428\u0430\u0440 "+b:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439 \u0448\u0430\u0440",b===8&&I.discipline==="pool8"&&I.winner!==null&&I.winner!==I.lastShooter&&(P.classList.add("invalid-eight"),P.title="\u0412\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435\u043C \u2014 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0448 \u043F\u0430\u0440\u0442\u0438\u0438"),P}function m(b){if(!b)return"\u0411\u0438\u0442\u043E\u043A";let I=["","\u0436\u0451\u043B\u0442\u044B\u0439","\u0441\u0438\u043D\u0438\u0439","\u043A\u0440\u0430\u0441\u043D\u044B\u0439","\u0444\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439","\u043E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439","\u0437\u0435\u043B\u0451\u043D\u044B\u0439","\u0431\u043E\u0440\u0434\u043E\u0432\u044B\u0439","\u0447\u0451\u0440\u043D\u044B\u0439"];return"\u2116 "+b+" \xB7 "+I[b>8?b-8:b]+(b===8?"":b>8?" \xB7 \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0439":" \xB7 \u0441\u043F\u043B\u043E\u0448\u043D\u043E\u0439")}function g(b,I,P){let B=b.value;if(b.id==="callBall"&&r?.discipline==="pool8"){let F=N=>N===8?99:(N>8?N-8:N)*2+(N>8?1:0);I=I.slice().sort((N,K)=>F(N.id)-F(K.id))}b.replaceChildren(new Option(P,""),...I.map(F=>new Option(b.id==="callBall"&&r?.discipline==="pool8"?m(F.id):b.id==="penaltyBall"?F.id?"\u2116 "+F.id+" \xB7 \u0431\u0435\u043B\u044B\u0439":r?.color==="red"?"\u041A\u0440\u0430\u0441\u043D\u044B\u0439 \u0448\u0430\u0440":"\u0416\u0451\u043B\u0442\u044B\u0439 \u0448\u0430\u0440":F.id?"\u2116 "+F.id:"\u0426\u0432\u0435\u0442\u043D\u043E\u0439",String(F.id)))),I.some(F=>String(F.id)===B)&&(b.value=B)}function _(b){return{cueId:t,callBall:ee("callBall").value===""?null:Number(ee("callBall").value),callPocket:ee("callPocket").value===""?null:Number(ee("callPocket").value),safety:ee("safety").checked}}function y(b,I){if(o&&b.pending?.type==="pyramid-foul"){let B=b.balls.filter(F=>!F.pocket).map(F=>({b:F,d:Math.hypot(F.x-I.x,F.y-I.y)})).filter(F=>F.d<22).sort((F,N)=>F.d-N.d)[0]?.b;return B&&(ee("penaltyBall").value=String(B.id),o=!0),!0}if(b.discipline!=="pyramid"||b.breakPending||b.inHand)return!1;let P=b.balls.filter(B=>!B.pocket).map(B=>({ball:B,distance:Math.hypot(B.x-I.x,B.y-I.y)})).filter(B=>B.distance<22).sort((B,F)=>B.distance-F.distance)[0]?.ball;return P?(t=P.id,!0):!1}function M(b,{player:I,mode:P,tableView:B,can:F}){r=b,ee("matchDiscipline").textContent=b.discipline==="pyramid"?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",(!b.balls.some(J=>J.id===t&&!J.pocket)||b.breakPending||b.discipline!=="pyramid")&&(t=b.discipline==="pyramid"&&!b.breakPending?b.balls.find(J=>!J.pocket)?.id??0:0);let N=b.discipline==="pyramid",K=JSON.stringify([b.shot,b.turn,b.discipline,b.color,b.groups,b.balls.map(J=>J.pocket),b.pending,b.winner,I,P]);if(ee("placeBreak").hidden=!b.breakPending||!F,ee("placeBreak").textContent=s?"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432 \u0434\u043E\u043C\u0435 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435":"\u041F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435",ee("ballShelves").hidden=!B,ee("callControls").hidden=!B||N||b.breakPending||b.moving||!!b.pending||!F,ee("cuePickHint").hidden=!B||!N||b.breakPending||!!b.pending||!F||b.moving,ee("cuePickHint").textContent="\u0411\u0438\u0442\u043E\u043A: "+(t?"\u2116 "+t:"\u0446\u0432\u0435\u0442\u043D\u043E\u0439")+" \xB7 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0448\u0430\u0440 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",ee("decisionPanel").hidden=!b.pending||!F,ee("decisionOk").textContent=b.pending?"\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443":"\u041F\u043E\u043D\u044F\u0442\u043D\u043E",ee("decisionOk").classList.toggle("primary",!b.pending),ee("decisionOpen").hidden=!B||!b.pending,b.pending){ee("decisionResolved").hidden=!0;let J=b.turn===I||P==="training",de=b.pending.type==="pyramid-foul",ve=Ru(b,J);ee("decisionTitle").textContent=ve.title,ee("decisionExplanation").textContent=ve.reason+`

`+ve.next,p.hidden=!J||!de,ee("decisionOpen").textContent=o?"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435":J?"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435":"\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u043E?";let be=[b.shot,b.turn,b.pending.type,P].join(":");B&&a!==be&&(a=be,!J&&!l&&(l=ve),ee("decisionDialog").open||ee("decisionDialog").showModal())}else o=!1,a="",ee("decisionResolved").hidden=!1,!B&&!l&&ee("decisionDialog").open&&ee("decisionDialog").close();ee("decisionClose").hidden=!!l,l&&(ee("decisionTitle").textContent=l.title,ee("decisionExplanation").textContent=l.reason+`

`+l.next,ee("decisionPanel").hidden=!0,ee("decisionResolved").hidden=!0,ee("decisionOk").textContent="\u041E\u041A",ee("decisionOk").classList.add("primary"));let H=b.pending?.type==="pyramid-foul"&&F&&!l;if(ee("decisionDialog").classList.toggle("table-penalty-dialog",H),ee("decisionOk").hidden=H,H){let J=Ru(b,!0);ee("decisionExplanation").textContent=J.reason+`

\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0435\u0433\u043E \u0441\u0435\u0431\u0435. \u0417\u0430\u0442\u0435\u043C \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435: \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0438\u0433\u0440\u0443 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0445\u043E\u0434.`}document.body.classList.toggle("billiards-penalty-picking",B&&H&&!ee("decisionDialog").open);let Z=b.pending?.type==="pyramid-foul"&&F&&ee("penaltyBall").value!=="";if(d.hidden=!B||!Z||ee("decisionDialog").open,!d.hidden){let J=ee("penaltyBall").value;d.querySelector("[data-penalty-play]").textContent="\u0417\u0430\u0431\u0440\u0430\u0442\u044C "+(J==="0"?"\u0446\u0432\u0435\u0442\u043D\u043E\u0439 \u0448\u0430\u0440":"\u0448\u0430\u0440 \u2116 "+J)+" \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"}let Q=_(b),ce=!N&&!b.breakPending&&!E()&&(Q.callBall===null||Q.callPocket===null);if(F&&b.pending?ee("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438 \u043D\u0438\u0436\u0435":F&&b.inHand?ee("hint").textContent=b.handZone==="head"?"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0431\u0438\u0442\u043E\u043A \u0432 \u0434\u043E\u043C\u0435 \u2014 \u0432 \u043D\u0438\u0436\u043D\u0435\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438 \u0441\u0442\u043E\u043B\u0430":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0431\u0438\u0442\u043A\u0430":F&&ce&&(ee("hint").textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 \u043B\u0438\u0431\u043E \u043E\u0442\u044B\u0433\u0440\u044B\u0448"),ee("shoot").disabled=!F||b.inHand||!B||!!b.pending||ce||s,ee("pocketMarkers").hidden=!B||N||b.breakPending||!F||!!b.pending,ee("pocketMarkers").hidden||Array.from(ee("pocketMarkers").children).forEach((J,de)=>{let ve=e.projectPocket?.(de);ve&&(J.style.left=ve.x+"px",J.style.top=ve.y+"px"),J.classList.toggle("chosen",ee("callPocket").value===String(de))}),K!==n){n=K,g(ee("callBall"),qi({...b,cueId:t}),"\u0428\u0430\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0431\u0438\u0442\u044C");for(let de=0;de<2;de++){let ve=de===0,be=P==="training"?de:ve?I:1-I,we=P==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(de+1):ve?"\u0412\u044B":P==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433",re=b.groups[be];ee("shelfName"+de).textContent=we,ee("shelfGroup"+de).textContent=N?"\u0414\u043E 8 \u0448\u0430\u0440\u043E\u0432":re===null?"\u0421\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":re===0?"\u0421\u043F\u043B\u043E\u0448\u043D\u044B\u0435 \xB7 1\u20137":"\u041F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 \xB7 9\u201315";let ue=[...b.captured?.[be]||b.balls.filter(ne=>ne.pocket&&ne.id&&ne.id!==8&&re!==null&&(ne.id<8?0:1)===re).map(ne=>ne.id)];!N&&b.winner!==null&&b.lastShooter===be&&b.balls.some(ne=>ne.id===8&&ne.pocket)&&ue.push(8),ee("shelfBalls"+de).replaceChildren(...ue.map(ne=>v(ne,b))),ee("shelfCount"+de).textContent=(N?ue.length:ue.filter(ne=>ne!==8).length)+" / "+(N?8:7),ee("shelf"+de).classList.toggle("active",b.turn===be&&b.winner===null)}let J=!N&&b.groups[0]===null?b.balls.filter(de=>de.pocket&&de.id&&de.id!==8):[];if(ee("unassignedBalls").replaceChildren(...J.map(de=>v(de.id,b))),ee("unassignedTray").hidden=!J.length,b.pending){let de=b.pending,ve=de.type==="pyramid-foul";ee("penaltyLabel").hidden=!0,ve&&g(ee("penaltyBall"),b.balls.filter(we=>!we.pocket),"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0441\u0435\u0431\u0435");let be=ve?de.illegalBreak?[["rerack-self","\u0420\u0430\u0437\u0431\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u0420\u0430\u0437\u0431\u043E\u0439 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:[]:de.illegal?[["accept","\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438"],...de.foul?[["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]]:[],["rerack-self","\u041F\u0435\u0440\u0435\u0440\u0430\u0437\u0431\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043C\u0443"],["rerack-opponent","\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A"]]:de.eight?[["accept",de.foul?"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \xB7 \u0431\u0438\u0442\u043E\u043A \u0438\u0437 \u0434\u043E\u043C\u0430":"\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u2116 8 \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"],["rerack-self","\u0420\u0430\u0437\u0431\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E"]]:[["accept","\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438"],["hand","\u0411\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438 \u0438\u0437 \u0434\u043E\u043C\u0430"]];ee("decisionButtons").replaceChildren(...be.map(([we,re])=>{let ue=document.createElement("button");return ue.type="button",ue.dataset.decision=we,ue.textContent=re,(we==="play"||we==="accept")&&(ue.className="primary"),ue}))}}if(b.pending?.type==="pyramid-foul")for(let J of ee("decisionButtons").children)J.disabled=ee("penaltyBall").value==="";return{...b,cueId:t,selectedTarget:b.pending?.type==="pyramid-foul"&&ee("penaltyBall").value!==""?Number(ee("penaltyBall").value):Q.callBall}}function E(){return ee("safety").checked}function R(){let b=(r?.discipline||c().discipline)==="pyramid";ee("rulesTitle").textContent=b?"\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \xB7 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0430\u044F \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":"\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u043F\u0443\u043B \xB7 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430",ee("rulesText").replaceChildren(...(b?["15 \u0431\u0435\u043B\u044B\u0445 \u0448\u0430\u0440\u043E\u0432 \u0438 \u043E\u0434\u0438\u043D \u0446\u0432\u0435\u0442\u043D\u043E\u0439. \u041F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0442\u043E\u0442, \u043A\u0442\u043E \u043F\u0435\u0440\u0432\u044B\u043C \u043D\u0430\u0431\u0440\u0430\u043B 8 \u0448\u0430\u0440\u043E\u0432. \u0428\u0430\u0440\u044B \u043D\u0435 \u0434\u0435\u043B\u044F\u0442\u0441\u044F \u043D\u0430 \u0441\u0432\u043E\u0438 \u0438 \u0447\u0443\u0436\u0438\u0435.","\u0420\u0430\u0437\u0431\u043E\u0439 \u2014 \u0446\u0432\u0435\u0442\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u0438\u0437 \u0434\u043E\u043C\u0430. \u041F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0448\u0430\u0440 \u043D\u0430 \u0441\u0442\u043E\u043B\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0435\u0433\u043E \u0431\u0438\u0442\u043A\u043E\u043C. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u0431\u0438\u0432\u0430\u0442\u044C \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440, \u0438 \u0441\u0430\u043C \u0431\u0438\u0442\u043E\u043A \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0448\u0430\u0440\u0430. \u0417\u0430\u043A\u0430\u0437 \u043B\u0443\u0437\u044B \u043D\u0435 \u043D\u0443\u0436\u0435\u043D.","\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439: \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0437\u0430\u0431\u0438\u0442 \u0448\u0430\u0440, \u043B\u0438\u0431\u043E 3 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430, \u043B\u0438\u0431\u043E 2 \u043A\u043E\u0441\u043D\u0443\u043B\u0438\u0441\u044C \u0431\u043E\u0440\u0442\u0430 \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u043F\u0435\u0440\u0435\u0441\u0451\u043A \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0443 \u0441\u0442\u043E\u043B\u0430.","\u0415\u0441\u043B\u0438 \u0448\u0430\u0440 \u043D\u0435 \u0437\u0430\u0431\u0438\u0442, \u043F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u043D\u044B \u0434\u0432\u0430 \u0440\u0430\u0437\u043D\u044B\u0445 \u0431\u043E\u0440\u0442\u0430 \u043B\u0438\u0431\u043E \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u0435\u0434\u0438\u043D\u044B \u0438 \u0431\u043E\u0440\u0442. \u042D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0447\u0435\u0440\u0435\u0437 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0434\u0440\u0443\u0433\u0438\u043C \u0448\u0430\u0440\u0430\u043C. \u041E\u0434\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0433\u043E \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0431\u043E\u0440\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E.","\u0417\u0430 \u0444\u043E\u043B \u0432\u0441\u0435 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u0435 \u0448\u0430\u0440\u044B \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043B\u044E\u0431\u043E\u0439 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0448\u0430\u0440 \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u043B\u043A\u0443, \u0437\u0430\u0442\u0435\u043C \u0438\u0433\u0440\u0430\u0435\u0442 \u0441\u0430\u043C \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442 \u0445\u043E\u0434. \u041F\u0440\u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u043C \u0440\u0430\u0437\u0431\u043E\u0435 \u043C\u043E\u0436\u043D\u043E \u0442\u0430\u043A\u0436\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443 \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u043C \u0441\u0447\u0451\u0442\u0430."]:["\u0411\u0435\u043B\u044B\u0439 \u0431\u0438\u0442\u043E\u043A \u0438 15 \u0446\u0432\u0435\u0442\u043D\u044B\u0445: \u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435 1\u20137, \u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435 9\u201315, \u0447\u0451\u0440\u043D\u044B\u0439 \u2116 8. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u0433\u0440\u0443\u043F\u043F\u0443, \u0437\u0430\u0442\u0435\u043C \u0437\u0430\u0431\u0435\u0439\u0442\u0435 \u2116 8 \u0432 \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u043B\u0443\u0437\u0443.","\u0420\u0430\u0437\u0431\u043E\u0439 \u0438\u0437 \u0434\u043E\u043C\u0430. \u0411\u0435\u0437 \u0437\u0430\u0431\u0438\u0442\u043E\u0433\u043E \u0448\u0430\u0440\u0430 \u043C\u0438\u043D\u0438\u043C\u0443\u043C 4 \u0440\u0430\u0437\u043D\u044B\u0445 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0440\u0430 \u0434\u043E\u043B\u0436\u043D\u044B \u043A\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F \u0431\u043E\u0440\u0442\u0430. \u0421\u0442\u043E\u043B \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C. \u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0437\u0430\u0431\u0438\u0442\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F.","\u041F\u0435\u0440\u0435\u0434 \u043A\u0430\u0436\u0434\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043E\u044F \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440 \u0438 \u043B\u0443\u0437\u0443 (\u043D\u043E\u043C\u0435\u0440\u0430 \u043B\u0443\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u043D\u0430 \u0441\u0442\u043E\u043B\u0435). \u0417\u0430\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0443\u0434\u0430, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441\u0435\u0440\u0438\u044E. \u041C\u043E\u0436\u043D\u043E \u043E\u0431\u044A\u044F\u0432\u0438\u0442\u044C \u043E\u0442\u044B\u0433\u0440\u044B\u0448 \u2014 \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0433\u043E \u0445\u043E\u0434 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0443.","\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0448\u0430\u0440\u0430 \u0441\u0432\u043E\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B; \u043D\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043C \u0441\u0442\u043E\u043B\u0435 \u2014 \u043B\u044E\u0431\u043E\u0433\u043E, \u043A\u0440\u043E\u043C\u0435 \u2116 8, \u043F\u043E\u043A\u0430 \u043D\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u0430 \u043E\u0434\u043D\u0430 \u0438\u0437 \u0433\u0440\u0443\u043F\u043F. \u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u043D\u0443\u0436\u0435\u043D \u0437\u0430\u0431\u0438\u0442\u044B\u0439 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0440 \u0438\u043B\u0438 \u043A\u0430\u0441\u0430\u043D\u0438\u0435 \u0431\u043E\u0440\u0442\u0430 \u043B\u044E\u0431\u044B\u043C \u0448\u0430\u0440\u043E\u043C.","\u0417\u0430\u0431\u0438\u0442\u044B\u0439 \u0431\u0438\u0442\u043E\u043A, \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0440 \u2014 \u0444\u043E\u043B. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0441\u0442\u0430\u0432\u0438\u0442 \u0431\u0438\u0442\u043E\u043A \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435; \u043F\u043E\u0441\u043B\u0435 \u0444\u043E\u043B\u0430 \u043D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u2014 \u0432 \u0434\u043E\u043C\u0435. \u0420\u0430\u043D\u043D\u044F\u044F \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430, \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0441 \u0444\u043E\u043B\u043E\u043C \u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043B\u0443\u0437\u0435 \u2014 \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435. \u041D\u0430 \u0440\u0430\u0437\u0431\u043E\u0435 \u0432\u043E\u0441\u044C\u043C\u0451\u0440\u043A\u0430 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438\u0431\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0440\u0430\u0437\u0431\u043E\u0439."]).map(I=>{let P=document.createElement("p");return P.textContent=I,P})),ee("rules").showModal()}return ee("rulesButton").onclick=R,{settings:c,options:_,render:M,chooseCue:y,isChoosingPenalty:()=>o,restoreControls(b){t=b.cueId??0,n="",s=!1,ee("callBall").replaceChildren(new Option("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0440",""),new Option("\u2116 "+b.callBall,String(b.callBall))),ee("callBall").value=b.callBall==null?"":String(b.callBall),ee("callPocket").value=b.callPocket==null?"":String(b.callPocket),ee("safety").checked=!!b.safety},isPlacing:b=>b.inHand||b.breakPending&&s,placed(){s=!1},reset(){l=null,o=!1,t=0,s=!1,n="",ee("callBall").value="",ee("callPocket").value="",ee("safety").checked=!1},inspect:()=>({selectedCue:t,call:_(r||{})})}}var it=i=>document.getElementById(i),jf=i=>Math.abs(i)<.005?0:Math.round(i*100)/100;function qf({adjust:i}){it("spinButton").after(document.querySelector(".fine-aim"));let e={x:0,y:0},t=!1,n=-1;function r(){let o=[];return e.y&&o.push(e.y>0?"\u043D\u0430\u043A\u0430\u0442":"\u043E\u0442\u0442\u044F\u0436\u043A\u0430"),e.x&&o.push(e.x>0?"\u043F\u0440\u0430\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A":"\u043B\u0435\u0432\u044B\u0439 \u0431\u043E\u043A\u043E\u0432\u0438\u043A"),o.join(" + ")||"\u0446\u0435\u043D\u0442\u0440"}function s(){let o=r();it("spinDot").style.left=50+e.x*43+"%",it("spinDot").style.top=50-e.y*43+"%",it("spinX").value=Math.round(e.x*100),it("spinY").value=Math.round(e.y*100),it("spinXValue").textContent=Math.round(e.x*100)+"%",it("spinYValue").textContent=Math.round(e.y*100)+"%",it("spinLabel").textContent=o,it("spinButton").textContent=e.x||e.y?"\u042D\u0444\u0444\u0435\u043A\u0442 \u2713":"\u042D\u0444\u0444\u0435\u043A\u0442",it("spinButton").title="\u042D\u0444\u0444\u0435\u043A\u0442 \xB7 "+o,it("spinButton").setAttribute("aria-label","\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u044D\u0444\u0444\u0435\u043A\u0442: "+o),it("spinButton").classList.toggle("spin-active",!!(e.x||e.y)),it("spinPad").setAttribute("aria-label","\u0422\u043E\u0447\u043A\u0430 \u0443\u0434\u0430\u0440\u0430: "+o)}function a(o){let l=it("spinPad").getBoundingClientRect(),c=(o.clientX-l.left-l.width/2)/(l.width*.43),h=(l.top+l.height/2-o.clientY)/(l.height*.43),u=Math.max(1,Math.hypot(c,h));e={x:jf(c/u),y:jf(h/u)};let p=Math.hypot(e.x,e.y);p>1&&(e.x/=p,e.y/=p),s()}it("spinPad").onpointerdown=o=>{o.preventDefault(),it("spinPad").setPointerCapture(o.pointerId),a(o)},it("spinPad").onpointermove=o=>{it("spinPad").hasPointerCapture(o.pointerId)&&a(o)},it("spinPad").onpointerup=it("spinPad").onpointercancel=o=>{it("spinPad").hasPointerCapture(o.pointerId)&&it("spinPad").releasePointerCapture(o.pointerId)};for(let[o,l,c]of[["spinX","x","y"],["spinY","y","x"]])it(o).oninput=()=>{let h=Math.sqrt(Math.max(0,1-e[c]**2));e[l]=Math.max(-h,Math.min(h,Number(it(o).value)/100)),s()};return it("spinButton").onclick=()=>{t&&it("spinDialog").showModal()},it("spinClose").onclick=()=>it("spinDialog").close(),it("spinOk").onclick=()=>{it("spinDialog").close(),it("spinButton").focus({preventScroll:!0})},it("spinReset").onclick=()=>{e={x:0,y:0},s()},it("aimLeft").onclick=()=>{t&&i(-.2*Math.PI/180)},it("aimRight").onclick=()=>{t&&i(.2*Math.PI/180)},s(),{value:()=>({...e}),restore(o){e=o?{...o}:{x:0,y:0},n=-1,s()},reset(){e={x:0,y:0},s(),n=-1},render(o,l){t=l&&!o.pending&&!o.inHand;for(let h of["spinButton","aimLeft","aimRight"])it(h).disabled=!t;o.moving&&o.shot!==n&&(n=o.shot,e={x:0,y:0},s());let c=o.lastShot;it("lastShotSummary").hidden=!c,it("lastShotSummary").textContent=c?"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0443\u0434\u0430\u0440: \u0432 \u043B\u0443\u0437\u044B "+c.potted.length+" \xB7 \u0431\u043E\u0440\u0442\u0430 "+(c.contacts.rails||0)+" \xB7 \u0433\u0443\u0431\u043A\u0438 "+(c.contacts.jaws||0):""},inspect:()=>({spin:{...e}})}}function Ts(i=1,e=1){if(i!==1&&i!==3)throw Error("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u043D\u0443 \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0441\u0435\u0440\u0438\u044E \u0434\u043E 3 \u043F\u043E\u0431\u0435\u0434.");return{target:i,wins:[0,0],round:1,creditedRound:0,winner:null,number:e}}function Cu(i,e){return![0,1].includes(e)||i.winner!==null||i.creditedRound===i.round?!1:(i.wins[e]++,i.creditedRound=i.round,i.wins[e]>=i.target&&(i.winner=e),!0)}function Yf(i){if(i.creditedRound!==i.round)throw Error("\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043F\u0430\u0440\u0442\u0438\u044E.");return i.winner!==null?Ts(i.target,i.number+1):{...i,wins:[...i.wins],round:i.round+1}}function Zf({launch:i,back:e}){let t=h=>document.getElementById(h),n=0,r="solo",s=!1,a={solo:["\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440","\u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A \u0432\u0441\u0435\u0433\u0434\u0430 \u0433\u043E\u0442\u043E\u0432 \u043A \u043F\u0430\u0440\u0442\u0438\u0438",'<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M8 20h8M12 16v4M8 9h.01M16 9h.01M9 12h6"/>'],training:["\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430","\u041F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u0434\u0430\u0440\u044B \u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u044E",'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>'],create:["\u0421 \u0434\u0440\u0443\u0433\u043E\u043C","\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043A\u043E\u043C\u043D\u0430\u0442\u0443 \u0438 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u0435\u0441\u044C \u043A\u043E\u0434\u043E\u043C",'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0112 0v3M16 5a3 3 0 010 6M18 15a5 5 0 013 4v2"/>'],challenge:["\u0412\u044B\u0437\u043E\u0432 \u0432 \u0447\u0430\u0442","\u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u0435 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430 \u0438\u0437 \u0447\u0430\u0442\u0430 \u0438\u0433\u0440\u043E\u043A\u043E\u0432",'<path d="M21 11a8 8 0 01-8 8H5l-3 3V11a9 9 0 0118 0zM8 10h8M8 14h5"/>'],join:["\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F \u043A \u0438\u0433\u0440\u0435 \u0434\u0440\u0443\u0433\u0430","\u041F\u043E \u043A\u043E\u0434\u0443 \u043A\u043E\u043C\u043D\u0430\u0442\u044B",'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M8 9l-2 3 2 3M16 9l2 3-2 3M13 8l-2 8"/>']};for(let h of t("modeButtons").children){let[u,p,d]=a[h.dataset.mode];h.classList.add("mode-card"),h.innerHTML='<span class="mode-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg></span><span class="mode-card__copy"><strong>'+u+"</strong><small>"+p+'</small></span><span class="mode-card__check" aria-hidden="true">\u2713</span>'}for(let h of t("formatButtons").children){let u=h.dataset.format==="3";h.innerHTML='<span class="format-card__number" aria-hidden="true">'+(u?"3":"1")+"</span><span><strong>"+(u?"\u0414\u043E \u0442\u0440\u0451\u0445 \u043F\u043E\u0431\u0435\u0434":"\u041E\u0434\u043D\u0430 \u043F\u0430\u0440\u0442\u0438\u044F")+"</strong><small>"+(u?"\u0421\u0435\u0440\u0438\u044F \u0438\u0433\u0440 \u0441 \u043E\u0431\u0449\u0438\u043C \u0441\u0447\u0451\u0442\u043E\u043C":"\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043C\u0430\u0442\u0447 \u0434\u043E \u043F\u043E\u0431\u0435\u0434\u044B")+"</small></span>"}let o=document.createElement("small");o.className="setup-brand",o.textContent="TWO ACES \xB7 \u0411\u0418\u041B\u042C\u042F\u0420\u0414",t("setupTitle").before(o);let l=document.createElement("div");l.className="setup-step-track",l.setAttribute("aria-hidden","true"),l.innerHTML="<i></i><i></i><i></i>",t("setupTitle").closest(".lobby-wizard__heading").append(l);function c(){Array.from(l.children).forEach((p,d)=>{p.classList.toggle("is-current",d===n),p.classList.toggle("is-done",d<n)});let h=r==="join",u=r==="training";["setupMode","setupDiscipline","setupFormat"].forEach((p,d)=>t(p).hidden=s||d!==n),t("setupWaiting").hidden=!s,t("setupProgress").textContent=s?"\u0418\u0433\u0440\u0430 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C":"\u0428\u0430\u0433 "+(n+1)+" \u0438\u0437 3",t("setupTitle").textContent=s?"\u0416\u0434\u0451\u043C \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":["\u0420\u0435\u0436\u0438\u043C \u0438\u0433\u0440\u044B","\u0414\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0430","\u0424\u043E\u0440\u043C\u0430\u0442 \u043C\u0430\u0442\u0447\u0430"][n],t("setupNext").hidden=s,t("setupNext").textContent=n<2?"\u0414\u0430\u043B\u0435\u0435 \u2192":{solo:"\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443",training:"\u041D\u0430\u0447\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443",create:"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043C\u043D\u0430\u0442\u0443",challenge:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u044B\u0437\u043E\u0432 \u0432 \u0447\u0430\u0442",join:"\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F"}[r],t("formatButtons").hidden=h||u,t("setupCode").hidden=!h,t("setupTrainingNote").hidden=!u,t("setupHostRules").hidden=!h;for(let p of t("setupDiscipline").children)p.id!=="setupHostRules"&&(p.hidden=h||p.tagName==="LABEL")}return t("modeButtons").onclick=h=>{let u=h.target.closest("[data-mode]");if(u){r=u.dataset.mode;for(let p of t("modeButtons").children)p.setAttribute("aria-pressed",String(p===u))}},t("formatButtons").onclick=h=>{let u=h.target.closest("[data-format]");if(u){t("raceTo").value=u.dataset.format;for(let p of t("formatButtons").children)p.setAttribute("aria-pressed",String(p===u))}},t("setupNext").onclick=()=>{n<2?(n++,c()):i(r)},t("setupBack").onclick=()=>{if(s)return e();n>0?(n--,c()):e()},c(),{waiting(){s=!0,c()},reset(){s=!1,n=0,c()}}}function Kf(){let i=null;return{move(e,t,n){let r=structuredClone(e);return Yi(e,e.turn,t)?(t.type==="shot"&&(i={before:r,move:structuredClone(t),controls:structuredClone(n)}),!0):!1},restore(){return i?{state:structuredClone(i.before),controls:structuredClone(i.controls),move:structuredClone(i.move)}:null},replay(){let e=this.restore();return!e||!Yi(e.state,e.state.turn,e.move)?null:e},clear(){i=null},inspect:()=>({available:!!i})}}var le=i=>document.getElementById(i),pe=Ds(),ws=pe,At=0,bn=!1,Es=null,Un=0,Nn=!1,As=performance.now(),Dn=0,Lu=0,Iu=-1,Nt=null,Na=0,Ll="",Je=null,br=0,Rt=Ts(),Ua=Rt,Rs=Kf(),On;try{On=Nf(le("room"))}catch{le("connection").textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C 3D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.",le("create").disabled=le("join").disabled=le("solo").disabled=le("training").disabled=!0}var Du=window;try{parent!==window&&parent.location.origin===location.origin&&(Du=parent)}catch{}var Tr=qf({adjust:i=>{Un=Math.atan2(Math.sin(Un+i),Math.cos(Un+i))}}),sv=Vf(),Gt=Xf({move:i=>Nu(i),room:On}),Oa=document.createElement("section");Oa.id="tableDock";Oa.append(le("turnGuide"),le("game"),le("decisionOpen"),le("penaltyConfirm"));document.querySelector("main").append(Oa);var Sr=new URLSearchParams(location.search).get("mode")||"lobby";try{parent!==window&&window.frameElement?.dataset.billiardsEntry&&(Sr=window.frameElement.dataset.billiardsEntry)}catch{}["tables","cues","lobby"].includes(Sr)||(Sr="lobby");Sr!=="lobby"&&(le("lobby").hidden=!0);var av=Hf({source:Du,room:On}),Qf=kf({source:Du,room:On}),Dl=document.createElement("nav");Dl.className="room-toolbar";Dl.setAttribute("aria-label","\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u0438\u043B\u044C\u044F\u0440\u0434\u043D\u043E\u0439");Dl.append(le("cueButton"),le("tableSkinButton"),le("rulesButton"));document.querySelector("main").append(Dl);var Jf=!1,Pu="";function em(i){if(!(!["tables","cues","lobby"].includes(i)||Je!==null||Jf&&Pu===i)){Jf=!0,Pu=i;for(let e of document.querySelectorAll("dialog[open]"))e.close();Vi(!1),le("lobby").hidden=i!=="lobby",i==="tables"&&av.open(),i==="cues"&&Qf.open()}}for(let i of[le("cueDialog"),document.querySelector(".table-skin-dialog")])i.addEventListener("close",()=>{parent!==window&&["tables","cues"].includes(Sr)&&Pu===Sr&&parent.postMessage({type:"p21-billiards-close"},location.origin)});window.addEventListener("message",i=>{parent!==window&&i.source===parent&&i.origin===location.origin&&i.data?.type==="p21-billiards-open-entry"&&em(i.data.entry)});async function ov(i){let e=window;try{parent!==window&&parent.location.origin===location.origin&&(e=parent)}catch{}let t=e.pokerApiAuthJsonBody?.({})||{},n=e.getApiBase?.()||location.origin,r=await fetch(n+"/api/billiards",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",cache:"no-store",body:JSON.stringify({...t,...i}),signal:AbortSignal.timeout(1e4)}),s=await r.json();if(!r.ok||!s.ok)throw Error(s.error||"\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.");return s}var tm=Zf({launch:i=>le(i).click(),back:()=>{wr(),tm.reset(),le("lobby").hidden=!0,Vi(!1),parent!==window&&parent.postMessage({type:"p21-billiards-close"},location.origin)}});function Hi(i){le("connection").textContent=i}function Vi(i){Je===null&&(le("lobby").hidden=!i),Nn=i,On?.setView(i?"table":"room"),document.body.classList.toggle("billiards-table-view",i),le("view").textContent=i?"\u0412 \u043A\u043E\u043C\u043D\u0430\u0442\u0443":Je?"\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0438\u0433\u0440\u0435":"\u041A \u0441\u0442\u043E\u043B\u0443",le("resumeGame").hidden=!Je||i,Je&&(le("game").hidden=!i)}function wr(){Rs.clear(),bn=!1,Je=null,br=0,Nt=null,Es?.close(),Es=null,Ll="",le("create").disabled=le("join").disabled=!1,le("lobby").hidden=!1,le("game").hidden=!0,Vi(!1),le("lobby").hidden=!1}function nm(i=!1){if(!On)return;Cu(Rt,pe.winner);let e=i&&Je==="solo"&&pe.winner!==null?pe:null,t=e?Yf(Rt):Ts(Gt.settings().raceTo),n=e?{discipline:e.discipline,color:e.color,breaker:1-(e.breaker||0)}:Gt.settings();wr(),Je="solo",Rt=t,Ua=Rt,pe=Ds({...n,seed:Math.floor(Math.random()*4294967296)}),Gt.reset(),Tr.reset(),ws=pe,At=0,bn=!0,Un=0,Dn=0,pe.message=pe.turn===0?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443 \xB7 \u0431\u0438\u0442\u043E\u043A \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0432\u0438\u043D\u0443\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043C\u0430":"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443",le("lobby").hidden=!0,le("game").hidden=!1,le("matchMode").textContent="\u041E\u0414\u0418\u041D\u041E\u0427\u041D\u0410\u042F \u041F\u0410\u0420\u0422\u0418\u042F \xB7 \u041A\u041E\u041C\u041F\u042C\u042E\u0422\u0415\u0420",Vi(!0),As=performance.now()}function im(){On&&(wr(),Je="training",pe=Ds({...Gt.settings(),seed:Math.floor(Math.random()*4294967296)}),ws=pe,Rt=Ts(),Gt.reset(),Tr.reset(),At=0,bn=!0,Un=0,Dn=0,le("lobby").hidden=!0,le("game").hidden=!1,le("matchMode").textContent="\u0422\u0420\u0415\u041D\u0418\u0420\u041E\u0412\u041A\u0410 \xB7 \u0412\u042B \u0423\u041F\u0420\u0410\u0412\u041B\u042F\u0415\u0422\u0415 \u041E\u0411\u0415\u0418\u041C\u0418 \u0421\u0422\u041E\u0420\u041E\u041D\u0410\u041C\u0418",Vi(!0),As=performance.now())}function Nu(i){return Je==="training"?Rs.move(pe,i,{angle:Un,power:Number(le("power").value),rules:Gt.options(pe),spin:Tr.value()}):Je==="solo"?Yi(pe,At,i):Es?.move(i)}function rm(i){if(Je!=="training")return;let e=i?Rs.replay():Rs.restore();e&&(pe=e.state,ws=pe,At=pe.turn,Un=e.controls.angle,le("power").value=e.controls.power,le("powerValue").textContent=e.controls.power+"%",Gt.restoreControls(e.controls.rules),Tr.restore(e.controls.spin),Dn=0,As=performance.now(),br=0)}function lv(i){if(!jl(i.state))return;let e=bn;if(Ll="",Na=i.serverNow-Date.now(),At=i.player,bn=i.ready,le("roomCode").textContent=i.roomId,le("invite").hidden=i.player!==0,le("create").disabled=le("join").disabled=!1,i.challengeSent&&Hi("\u0412\u044B\u0437\u043E\u0432 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 \u0447\u0430\u0442 \u0438\u0433\u0440\u043E\u043A\u043E\u0432 \xB7 \u0436\u0434\u0451\u043C \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430"),i.ready?(le("lobby").hidden=!0,le("game").hidden=!Nn,le("matchMode").textContent="\u041F\u0410\u0420\u0422\u0418\u042F \u0421 \u0414\u0420\u0423\u0413\u041E\u041C \xB7 \u041E\u041D\u041B\u0410\u0419\u041D"):(tm.waiting(),i.challengeSent||Hi("\u041A\u043E\u043C\u043D\u0430\u0442\u0430 "+i.roomId+" \xB7 \u0436\u0434\u0451\u043C \u0434\u0440\u0443\u0433\u0430")),i.revision!==Iu){if(Iu=i.revision,ws=i.state,Ua=i.match||Ts(),Nt=i.playback,Rt=Nt?.matchBefore?structuredClone(Nt.matchBefore):structuredClone(Ua),Nt&&jl(Nt.before)&&Date.now()+Na<Nt.startedAt+Nt.durationMs){pe=structuredClone(Nt.before),Nt.move?Yi(pe,pe.turn,Nt.move):Wl(pe,Nt.angle,Nt.power);let t=Math.max(0,Date.now()+Na-Nt.startedAt);for(let n=0;n<Math.floor(t/1e3*120)&&pe.moving;n++)Ha(pe)}else pe=ws,Rt=structuredClone(Ua),Nt=null;i.ready&&!e&&Vi(!0),Dn=0,As=performance.now()}}function Ba(i,e=!1){let t=le("code").value.toUpperCase().replace(/\s/g,"");if(!i&&!/^[A-HJ-NP-Z2-9]{10}$/.test(t)){Hi("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u0441\u043B\u0430\u043B \u0434\u0440\u0443\u0433.");return}wr(),Je="online",Iu=-1,le("create").disabled=le("join").disabled=!0,Hi(i?"\u0421\u043E\u0437\u0434\u0430\u0451\u043C \u043A\u043E\u043C\u043D\u0430\u0442\u0443\u2026":"\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F\u2026"),Es=od({request:ov,onUpdate:lv,onError(n,r){Ll=n,bn=!1,Hi(n),r?le("create").disabled=le("join").disabled=!1:le("hint").textContent=n}}),Es.start(i,t,{...Gt.settings(),challenge:e})}le("challenge").onclick=()=>{le("create").disabled||Ba(!0,!0)};le("solo").onclick=()=>nm();le("training").onclick=im;le("restoreShot").onclick=()=>rm(!1);le("repeatShot").onclick=()=>rm(!0);le("create").onclick=()=>Ba(!0);le("join").onclick=()=>Ba(!1);le("code").onkeydown=i=>{i.key==="Enter"&&Ba(!1)};le("copy").onclick=async()=>{try{await navigator.clipboard.writeText(le("roomCode").textContent),Hi("\u041A\u043E\u0434 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0434\u0440\u0443\u0433\u0443.")}catch{Hi("\u041A\u043E\u0434 \u043A\u043E\u043C\u043D\u0430\u0442\u044B: "+le("roomCode").textContent)}};le("resumeTable").onclick=()=>Vi(!0);le("view").onclick=()=>Vi(!Nn);le("power").oninput=()=>{le("powerValue").textContent=le("power").value+"%"};le("shoot").onclick=()=>Nu({type:"shot",angle:Un,power:Number(le("power").value)/100,...Gt.options(pe),spin:Tr.value()});le("again").onclick=()=>Je==="training"?im():Je==="solo"?nm(!0):Es?.move(null,!0);le("modes").onclick=()=>{wr(),Hi("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u0443\u044E \u043F\u0430\u0440\u0442\u0438\u044E \u0438\u043B\u0438 \u0438\u0433\u0440\u0443 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C.")};var Uu=!1;function sm(i){if(!Nn||!bn||pe.turn!==At||pe.moving||pe.winner!==null)return;let e=On.point(i.clientX,i.clientY);if(!e)return;if(Gt.isPlacing(pe)||pe.breakPending&&i.shiftKey){i.type==="pointerdown"&&(Nu({type:"place",x:e.x,y:e.y}),Gt.placed());return}if(i.type==="pointerdown"&&Gt.chooseCue(pe,e))return;let t=Gt.options(pe).cueId,n=pe.balls.find(r=>r.id===t&&!r.pocket);n&&(Math.hypot(e.x-n.x,e.y-n.y)<18||(Un=Math.atan2(n.y-e.y,n.x-e.x)))}le("room").onselectstart=le("room").oncontextmenu=i=>i.preventDefault();le("room").onpointerdown=i=>{i.preventDefault(),window.getSelection()?.removeAllRanges(),Uu=!0,le("room").setPointerCapture(i.pointerId),sm(i)};le("room").onpointermove=i=>{Uu&&sm(i)};le("room").onpointerup=le("room").onpointercancel=()=>Uu=!1;le("closeRules").onclick=()=>le("rules").close();le("back").onclick=()=>{wr(),parent!==window?parent.postMessage({type:"p21-billiards-close"},location.origin):location.assign("./")};function am(i){let e=Math.min((i-As)/1e3,.1);if(As=i,Je==="solo"||Je==="training"){for(Dn+=e;Dn>=1/120&&pe.moving;)Ha(pe),Dn-=1/120;if(pe.moving||(Dn=0),Je==="solo"&&pe.turn===1&&!pe.moving&&pe.winner===null){if(br||(br=i+650),i>=br){let a=Of(pe);a&&Yi(pe,1,a),br=0}}else br=0}else if(Nt&&Date.now()+Na>=Nt.startedAt){for(Dn+=e;Dn>=1/120&&pe.moving;)Ha(pe),Dn-=1/120;Date.now()+Na>=Nt.startedAt+Nt.durationMs&&(pe=ws,Rt=structuredClone(Ua),Nt=null)}Je==="solo"&&Cu(Rt,pe.winner),Je==="training"&&(At=pe.turn);let t=bn&&pe.turn===At&&!pe.moving&&pe.winner===null,n=Je==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(pe.turn+1):pe.turn===At?"\u0412\u0430\u0448 \u0445\u043E\u0434":Je==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430";le("status").textContent=Je==="training"&&pe.winner!==null?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(pe.winner+1)+" \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0430 \u043F\u0430\u0440\u0442\u0438\u044E":Je!=="training"&&Rt.winner!==null&&pe.winner!==null?Rt.winner===At?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 "+(Rt.target===3?"\u0441\u0435\u0440\u0438\u044E":"\u043F\u0430\u0440\u0442\u0438\u044E"):"\u041F\u043E\u0431\u0435\u0434\u0438\u043B "+(Je==="solo"?"\u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0434\u0440\u0443\u0433"):pe.moving?"\u0428\u0430\u0440\u044B \u0432 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438":pe.winner!==null?pe.winner===At?"\u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438 \u043F\u0430\u0440\u0442\u0438\u044E":Je==="solo"?"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u041F\u043E\u0431\u0435\u0434\u0438\u043B \u0434\u0440\u0443\u0433":pe.pending?pe.turn===At?"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438":"\u0416\u0434\u0451\u043C \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":pe.inHand?n+" \xB7 \u0431\u0438\u0442\u043E\u043A \u0441 \u0440\u0443\u043A\u0438"+(pe.handZone==="head"?" \u0438\u0437 \u0434\u043E\u043C\u0430":""):pe.breakPending?pe.turn===At?"\u0412\u044B \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":Je==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":"\u0414\u0440\u0443\u0433 \u0440\u0430\u0437\u0431\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0443":n,le("hint").textContent=Ll||(bn?pe.winner!==null?"\u041F\u0430\u0440\u0442\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430":pe.moving?"\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0448\u0430\u0440\u043E\u0432":pe.turn!==At?Je==="solo"?"\u0425\u043E\u0434 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430":"\u0425\u043E\u0434 \u0434\u0440\u0443\u0433\u0430":pe.inHand?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u043A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u0431\u0438\u0442\u043A\u0430":Nn?"\u0412\u0430\u0448 \u0445\u043E\u0434 \xB7 \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043A\u0438\u0439 \u0437\u0430 \u0437\u0430\u0434\u043D\u044E\u044E \u0447\u0430\u0441\u0442\u044C \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043B\u0443":"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041A \u0441\u0442\u043E\u043B\u0443\xBB, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0443\u0434\u0430\u0440":"");for(let a=0;a<2;a++){let o=pe.groups[a];le("p"+(a+1)).textContent=(Je==="training"?"\u0421\u0442\u043E\u0440\u043E\u043D\u0430 "+(a+1):a===At?"\u0412\u044B":Je==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 "+(pe.discipline==="pyramid"?"\u043F\u0438\u0440\u0430\u043C\u0438\u0434\u0430":o===null?"\u0441\u0442\u043E\u043B \u043E\u0442\u043A\u0440\u044B\u0442":o===0?"\u0441\u043F\u043B\u043E\u0448\u043D\u044B\u0435":"\u043F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0435")+" \xB7 "+pe.scores[a]+"/"+(pe.discipline==="pyramid"?8:7),le("p"+(a+1)).className=pe.turn===a?"active":""}le("seriesScore").hidden=Je==="training"||!bn||Rt.target===1,le("seriesScore").textContent=Rt.target===3?"\u0414\u043E 3 \u043F\u043E\u0431\u0435\u0434 \xB7 \u0412\u044B "+Rt.wins[At]+" : "+Rt.wins[1-At]+" "+(Je==="solo"?"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440":"\u0414\u0440\u0443\u0433")+" \xB7 \u043F\u0430\u0440\u0442\u0438\u044F "+Rt.round:"\u041E\u0434\u043D\u0430 \u043F\u0430\u0440\u0442\u0438\u044F",le("trainingControls").hidden=Je!=="training";let r=Rs.inspect().available;le("restoreShot").disabled=le("repeatShot").disabled=!r,le("again").hidden=Je!=="training"&&(pe.winner===null||At!==0),le("again").textContent=Je==="training"?"\u041D\u043E\u0432\u0430\u044F \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430":Rt.target===3?Rt.winner!==null?"\u041D\u043E\u0432\u0430\u044F \u0441\u0435\u0440\u0438\u044F \u0434\u043E 3 \u043F\u043E\u0431\u0435\u0434":"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F":"\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u0440\u0442\u0438\u044F",Je==="training"?le("hint").textContent=pe.moving?"\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0439\u0442\u0435 \u0443\u0434\u0430\u0440 \u0438\u043B\u0438 \u0432\u0435\u0440\u043D\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u0443\u044E \u043F\u043E\u0437\u0438\u0446\u0438\u044E":"\u0411\u0435\u0437 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430: \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043E\u0431\u0435\u0438\u043C\u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u0430\u043C\u0438 \u0438 \u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u0434\u0430\u0440 \u0437\u0430\u043D\u043E\u0432\u043E":pe.winner!==null&&Je==="online"&&At!==0&&(le("hint").textContent="\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u044C \u043A\u043E\u043C\u043D\u0430\u0442\u044B"),Tr.render(pe,t&&Nn);let s=Gt.render(pe,{player:At,mode:Je,tableView:Nn,can:t});sv.render(pe,{player:At,mode:Je,tableView:Nn,ready:bn,call:Gt.options(pe),placing:Gt.isPlacing(pe),penaltyPicking:Gt.isChoosingPenalty()}),Nn&&On?.render(s,Un,t&&!pe.inHand&&!pe.pending),Lu=requestAnimationFrame(am)}var om=new ResizeObserver(()=>{let i=Oa.getBoundingClientRect().height;i&&(document.body.style.setProperty("--billiards-controls-height",Math.ceil(i)+"px"),Nn&&On?.setView("table"))});om.observe(Oa);em(Sr);document.body.classList.add("billiards-entry-ready");parent!==window&&parent.postMessage({type:"p21-billiards-ready"},location.origin);var $f=new URLSearchParams(location.search).get("room");/^[A-HJ-NP-Z2-9]{10}$/.test($f||"")&&(le("code").value=$f,Ba(!1));Lu=requestAnimationFrame(am);window.PokerBilliards={inspect:()=>({mode:Je,ready:bn,tableView:Nn,equipment:Qf.inspect(),rules:Gt.inspect(),shotTools:Tr.inspect(),training:Rs.inspect(),series:structuredClone(Rt),angle:Un,state:structuredClone(pe)})};window.addEventListener("pagehide",()=>{cancelAnimationFrame(Lu),om.disconnect(),wr(),On?.dispose()});})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
