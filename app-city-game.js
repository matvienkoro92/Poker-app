(()=>{var _u={x:-24,z:-23,w:30,d:24},Jn={x:86,z:-70,w:22,d:24},fs={x:98,z:40,w:32,d:44},rc={x:81,z:40},Br={x:87,z:43},Mu={x:87,z:53,yaw:-Math.PI/2},ms=(r,e)=>({x:fs.x-e,z:fs.z+r}),Fr={x:85,z:-53},Fn={x:-24,z:-8},lo={minX:-98,maxX:118,minZ:-109,maxZ:91},Ui=[-64,0,72],Yi=[-75,0,70],Or=[{x:-43,z:-53,w:23,d:24,h:18,color:"#cba28a",name:"RIVER HOTEL"},{x:-18,z:-52,w:19,d:23,h:29,color:"#b9c9bc"},{x:26,z:-31,w:27,d:29,h:25,color:"#dcc7ab",name:"POKER RADIO"},{x:49,z:-48,w:16,d:23,h:18,color:"#d69c85"},{x:30,z:-96,w:36,d:17,h:22,color:"#aac4c8"},{x:-31,z:-97,w:42,d:16,h:18,color:"#c2ae9e"},{x:-83,z:-43,w:15,d:39,h:28,color:"#a0b7b4"},{x:-83,z:24,w:15,d:32,h:22,color:"#dcba97"},{x:-43,z:30,w:22,d:34,h:19,color:"#e2bd93",name:"CHECK / COFFEE"},{x:-17,z:29,w:18,d:32,h:25,color:"#9bbcb4"},{x:29,z:28,w:30,d:28,h:23,color:"#d4a590",name:"ALL IN RECORDS"},{x:54,z:33,w:15,d:34,h:16,color:"#b2bbcd"},{x:-33,z:84,w:41,d:14,h:20,color:"#b6c9c3"},{x:32,z:85,w:42,d:14,h:18,color:"#cbb59d"}],mn=(r,e,t,n)=>{let i=ms(r,e);return vi(i.x,i.z,n,t)},vi=(r,e,t,n)=>({minX:r-t/2,maxX:r+t/2,minZ:e-n/2,maxZ:e+n/2}),sc=[...Or.map(r=>vi(r.x,r.z,r.w,r.d)),vi(Jn.x,Jn.z,Jn.w,Jn.d),vi(-39,-23,.65,24),vi(-9,-23,.65,24),vi(-24,-35,30,.65),vi(-33,-11,12,.65),vi(-15,-11,12,.65),vi(-32,-28,9,2),vi(-17,-27,4,5),vi(89,-33,10,10),vi(88,-14,12,12),mn(-22,0,.5,32),mn(22,0,.5,32),mn(-13,-16,18,.5),mn(13,-16,18,.5),mn(-12.5,16,19,.5),mn(5,16,4,.5),mn(21,16,2,.5),mn(6,4,.4,6),mn(6,14,.4,4),mn(-6,2.5,.4,5),mn(-6,14,.4,4),mn(-4,0,4,.4),mn(4,0,4,.4),mn(-18,1,8,.4),mn(-9,1,2,.4),mn(9.5,1,3,.4),mn(19.5,1,5,.4),mn(-18,-8,6,9),mn(0,6,3,3),mn(-14,9,8,5),mn(0,-8,7,3),mn(8,-18,14,4)];function ta(r,e,t=.45){return r-t<lo.minX||r+t>lo.maxX||e-t<lo.minZ||e+t>lo.maxZ||sc.some(n=>r+t>n.minX&&r-t<n.maxX&&e+t>n.minZ&&e-t<n.maxZ)}function na(r,e,t,n){let i=!1;return ta(r.x+e,r.z,n)?i=!0:r.x+=e,ta(r.x,r.z+t,n)?i=!0:r.z+=t,i}function co(r){let e=Ui.reduce((n,i)=>Math.abs(r.x-n)<Math.abs(r.x-i)?n:i),t=Yi.reduce((n,i)=>Math.abs(r.z-n)<Math.abs(r.z-i)?n:i);return Math.abs(e-r.x)<Math.abs(t-r.z)?{x:e,z:Math.max(-100,Math.min(84,r.z))}:{x:Math.max(-92,Math.min(90,r.x)),z:t}}function ho(r,e){let t=co(r),n=co(e),i=Ui.includes(t.x),s=Ui.includes(n.x);if(i&&s)return[{...t},{x:t.x,z:Yi.reduce((c,h)=>Math.abs(h-t.z)+Math.abs(h-n.z)<Math.abs(c-t.z)+Math.abs(c-n.z)?h:c)},{x:n.x,z:Yi.reduce((c,h)=>Math.abs(h-t.z)+Math.abs(h-n.z)<Math.abs(c-t.z)+Math.abs(c-n.z)?h:c)},{...n}];if(!i&&!s){let c=Ui.reduce((h,u)=>Math.abs(u-t.x)+Math.abs(u-n.x)<Math.abs(h-t.x)+Math.abs(h-n.x)?u:h);return[t,{x:c,z:t.z},{x:c,z:n.z},n]}let a=i?t:n,o=i?n:t,l={x:a.x,z:o.z};return[t,l,n]}var ac=(r,e,t)=>Math.max(e,Math.min(t,r)),Nn=(r,e)=>Math.hypot(r.x-e.x,r.z-e.z);function ia(r=null){let e=r?.carrying===!0,t=e||r?.briefed===!0||r?.completed===!0;return{player:e?{x:79,z:-49,yaw:0}:{...Br,yaw:0},car:e?{x:72,z:-49,yaw:Math.PI,speed:0}:{...Mu,speed:0},driving:!1,phase:e?"escape":"car",carrying:e,briefed:t,health:100,heat:e?1:0,escape:0,elapsed:0,time:0,completed:r?.completed===!0,missionActive:!0,police:{x:0,z:-75,yaw:Math.PI/2,speed:0,route:[],retarget:0},traffic:[{x:2.8,z:-34,yaw:0,speed:7,route:0},{x:45,z:-72.2,yaw:-Math.PI/2,speed:8,route:1},{x:69.2,z:-22,yaw:Math.PI,speed:6.5,route:2},{x:31,z:-2.8,yaw:Math.PI/2,speed:7,route:3}],notice:e?"\u041A\u0435\u0439\u0441 \u0443 \u0442\u0435\u0431\u044F. \u041E\u0442\u043E\u0440\u0432\u0438\u0441\u044C \u043E\u0442 \u043F\u0430\u0442\u0440\u0443\u043B\u044F \u0438 \u0432\u0435\u0440\u043D\u0438\u0441\u044C \u0432 TWO ACES.":"\u0420\u043E\u043C\u0430: \xAB\u041C\u0430\u043D\u043A\u0438, \u043F\u0440\u0438\u0435\u0437\u0436\u0430\u0439 \u0438\u0437 \u0432\u0438\u043B\u043B\u044B \u0432 TWO ACES. \u0415\u0441\u0442\u044C \u0434\u0435\u043B\u043E. \u0422\u0432\u043E\u0439 \u043A\u0430\u0440\u0442 \u0436\u0434\u0451\u0442 \u0432 \u0433\u0430\u0440\u0430\u0436\u0435\xBB.",noticeTime:7,crashCooldown:0,rescueCooldown:0,failed:!1,win:!1}}function uo(r){return r.driving?r.car:r.player}function po(r){return r.failed?"":!r.driving&&r.phase==="club"&&Nn(r.player,Fn)<3?"\u041F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u0441 \u0420\u043E\u043C\u043E\u0439":!r.driving&&r.carrying&&Nn(r.player,Fn)<3?r.heat?"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0442\u043E\u0440\u0432\u0438\u0441\u044C \u043E\u0442 \u0445\u0432\u043E\u0441\u0442\u0430":"\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u043A\u0435\u0439\u0441 \u0432 TWO ACES":!r.driving&&!r.carrying&&r.briefed&&Nn(r.player,Fr)<3?"\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u043A\u0435\u0439\u0441 \u0441 \u0431\u0438\u043B\u0435\u0442\u0430\u043C\u0438":r.driving?Math.abs(r.car.speed)>2?"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0439\u0442\u0438":"\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043C\u0430\u0448\u0438\u043D\u044B":Nn(r.player,r.car)<4?"\u0421\u0435\u0441\u0442\u044C \u0437\u0430 \u0440\u0443\u043B\u044C":Nn(r.player,rc)<3?"\u0412\u043E\u0439\u0442\u0438 \u043D\u0430 \u0432\u0438\u043B\u043B\u0443":!r.missionActive&&Nn(r.player,Fn)<4?"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443":""}function bu(r){if(r.failed)return!1;if(!r.driving&&r.phase==="club"&&Nn(r.player,Fn)<3)return r.briefed=!0,r.phase="port",Zi(r,"\u0420\u043E\u043C\u0430: \xAB\u0417\u0430\u0431\u0435\u0440\u0438 \u043A\u0435\u0439\u0441 \u0441 \u0431\u0438\u043B\u0435\u0442\u0430\u043C\u0438 \u0443 \u0441\u043A\u043B\u0430\u0434\u0430 04 \u0432 \u0432\u043E\u0441\u0442\u043E\u0447\u043D\u043E\u043C \u043F\u043E\u0440\u0442\u0443. \u0415\u0437\u0436\u0430\u0439 \u043D\u0430 \u0441\u0432\u043E\u0451\u043C \u043A\u0430\u0440\u0442\u0435\xBB.",7),!0;if(!r.driving&&r.carrying&&Nn(r.player,Fn)<3&&!r.heat)return r.phase="complete",r.win=!0,r.completed=!0,r.carrying=!1,r.missionActive=!1,Zi(r,"\u0420\u043E\u043C\u0430: \xAB\u0412\u0441\u0435 \u0431\u0438\u043B\u0435\u0442\u044B \u043D\u0430 \u043C\u0435\u0441\u0442\u0435. \u041E\u0442\u043B\u0438\u0447\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430, \u041C\u0430\u043D\u043A\u0438!\xBB",8),!0;if(!r.driving&&!r.carrying&&r.briefed&&r.missionActive&&Nn(r.player,Fr)<3)return r.carrying=!0,r.phase="escape",r.heat=1,r.escape=0,r.police={x:15,z:-72.2,yaw:Math.PI/2,speed:10,route:[],retarget:0},Zi(r,"\u041D\u0438\u0442 \u0437\u0430\u043C\u0435\u0442\u0438\u043B \u043A\u0435\u0439\u0441! \u0423\u0435\u0437\u0436\u0430\u0439 \u0438 \u0434\u0435\u0440\u0436\u0438\u0441\u044C \u043F\u043E\u0434\u0430\u043B\u044C\u0448\u0435 \u043E\u0442 \u043F\u0430\u0442\u0440\u0443\u043B\u044F 12 \u0441\u0435\u043A\u0443\u043D\u0434.",7),!0;if(r.driving){if(Math.abs(r.car.speed)>2)return Zi(r,"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438 \u043C\u0430\u0448\u0438\u043D\u0443.",2),!1;for(let e of[-1,1,2]){let t=r.car.x+Math.cos(r.car.yaw)*2.7*e,n=r.car.z-Math.sin(r.car.yaw)*2.7*e;if(!ta(t,n,.5)&&!r.traffic.some(i=>Math.hypot(i.x-t,i.z-n)<2.7))return r.player={x:t,z:n,yaw:r.car.yaw},r.driving=!1,!0}return Zi(r,"\u0414\u0432\u0435\u0440\u044C \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0430. \u041E\u0442\u044A\u0435\u0434\u044C \u043E\u0442 \u0441\u0442\u0435\u043D\u044B.",3),!1}if(Nn(r.player,r.car)<4)return r.driving=!0,r.car.speed=0,r.phase==="car"&&(r.phase=r.briefed?"port":"club",Zi(r,r.briefed?"\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043A \u043F\u043E\u0440\u0442\u0443 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D. \u0422\u0432\u043E\u0439 \u043A\u0430\u0440\u0442 \u0433\u043E\u0442\u043E\u0432.":"\u0421\u0432\u043E\u0439 \u043A\u0430\u0440\u0442 \u2014 \u0441\u0432\u043E\u044F \u0434\u043E\u0440\u043E\u0433\u0430. \u0420\u043E\u043C\u0430 \u0436\u0434\u0451\u0442 \u0443 \u0432\u0445\u043E\u0434\u0430 \u0432 TWO ACES.",5)),!0;if(Nn(r.player,rc)<3)return r.openVilla=!0,!0;if(!r.missionActive&&Nn(r.player,Fn)<4){let e=ia();return Object.assign(r,e),!0}return!1}function Zi(r,e,t=3){r.notice=e,r.noticeTime=t}function lc(r){if(r.rescueCooldown>0)return;let e=co(r.car);ta(e.x,e.z,1.6)||(r.car.x=e.x,r.car.z=e.z,r.car.speed=0,r.car.yaw=[-64,0,72].includes(e.x)?Math.PI:Math.PI/2,r.rescueCooldown=8,Zi(r,"\u041C\u0430\u0448\u0438\u043D\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0430 \u043D\u0430 \u0434\u043E\u0440\u043E\u0433\u0443.",3))}function oc(r,e){r.crashCooldown>0||(r.health=Math.max(0,r.health-e),r.crashCooldown=1.2,r.health||(r.failed=!0,Zi(r,"\u041C\u0430\u0448\u0438\u043D\u0430 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430. \u0420\u043E\u043C\u0430 \u043F\u0440\u0438\u0448\u043B\u0451\u0442 \u0434\u0440\u0443\u0433\u0443\u044E.",5)))}var xf=[{x:2.8,z:-72.2},{x:69.2,z:-72.2},{x:69.2,z:-2.8},{x:2.8,z:-2.8}];function Tu(r,e,t=1/60){if(!(r.failed||r.win)){if(r.time+=t,r.missionActive&&(r.elapsed+=t),r.crashCooldown=Math.max(0,r.crashCooldown-t),r.rescueCooldown=Math.max(0,r.rescueCooldown-t),r.noticeTime=Math.max(0,r.noticeTime-t),r.driving){let n=r.car,i=ac(e.forward||0,-1,1),s=ac(e.turn||0,-1,1),a=i>0?10:i<0?n.speed>1?-20:-6:0;n.speed+=a*t,e.brake&&(n.speed*=Math.exp(-6*t)),n.speed*=Math.exp(-.36*t),i||(n.speed*=Math.exp(-.8*t)),n.speed=ac(n.speed,-7,24),Math.abs(n.speed)<.06&&(n.speed=0),n.yaw-=s*t*Math.min(1.7,Math.abs(n.speed)*.17)*Math.sign(n.speed||1)*(e.brake?1.3:1),na(n,Math.sin(n.yaw)*n.speed*t,Math.cos(n.yaw)*n.speed*t,1.6)&&Math.abs(n.speed)>3&&(oc(r,Math.min(15,Math.abs(n.speed)*.7)),n.speed*=-.2),r.player.x=n.x,r.player.z=n.z,r.player.yaw=n.yaw}else{let n=e.x||0,i=e.z||0,s=Math.hypot(n,i);s>1&&(n/=s,i/=s);let a=e.run?7:4.5;na(r.player,n*a*t,i*a*t,.45),Math.hypot(n,i)>.1&&(r.player.yaw=Math.atan2(n,i))}for(let n of r.traffic){let i=xf[n.route];Nn(n,i)<n.speed*t+.2?n.route=(n.route+1)%4:(n.yaw=Math.atan2(i.x-n.x,i.z-n.z),n.x+=Math.sin(n.yaw)*n.speed*t,n.z+=Math.cos(n.yaw)*n.speed*t),r.driving&&Nn(n,r.car)<2.9?(oc(r,8),r.car.speed*=-.35,na(r.car,Math.sin(n.yaw)*.2,Math.cos(n.yaw)*.2,1.6)):!r.driving&&Nn(n,r.player)<1.9&&na(r.player,Math.cos(n.yaw)*2*t*8,-Math.sin(n.yaw)*2*t*8,.45)}if(r.heat){let n=r.police,i=uo(r);n.retarget-=t,n.retarget<=0&&(n.route=ho(n,i).filter(o=>Nn(o,n)>2),n.retarget=1);let s=n.route[0];if(s){let o=Nn(n,s);n.yaw=Math.atan2(s.x-n.x,s.z-n.z);let l=Math.min(13,o/t);n.x+=Math.sin(n.yaw)*l*t,n.z+=Math.cos(n.yaw)*l*t,o<2&&n.route.shift()}let a=Nn(n,i);a<4&&r.driving&&(oc(r,5),r.car.speed*=.96),r.escape=a>25?Math.min(12,r.escape+t):Math.max(0,r.escape-t*1.5),r.escape>=12&&(r.heat=0,r.phase="return",Zi(r,"\u0425\u0432\u043E\u0441\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D. \u0412\u0435\u0440\u043D\u0438 \u043A\u0435\u0439\u0441 \u0420\u043E\u043C\u0435 \u0443 \u0432\u0445\u043E\u0434\u0430 \u0432 TWO ACES.",6))}}}function ra(r){return r.failed?{title:"\u041D\u0443\u0436\u043D\u0430 \u043D\u043E\u0432\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430",detail:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438 \u0441 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u044D\u0442\u0430\u043F\u0430"}:r.missionActive?r.phase==="car"?{title:"\u0421\u044F\u0434\u044C \u0432 \u0441\u0432\u043E\u0439 \u043A\u0430\u0440\u0442 \u043D\u0430 \u0432\u0438\u043B\u043B\u0435",detail:"\u0413\u0430\u0440\u0430\u0436 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u0437\u0430\u043B\u0430 \xB7 \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435\xBB",target:r.car}:r.phase==="club"?{title:"\u0414\u043E\u0435\u0434\u044C \u043E\u0442 \u0432\u0438\u043B\u043B\u044B \u0434\u043E TWO ACES",detail:"\u041F\u0440\u0438\u043F\u0430\u0440\u043A\u0443\u0439 \u0441\u0432\u043E\u0439 \u043A\u0430\u0440\u0442, \u0432\u044B\u0439\u0434\u0438 \u0438 \u043F\u043E\u0433\u043E\u0432\u043E\u0440\u0438 \u0441 \u0420\u043E\u043C\u043E\u0439 \u0443 \u0432\u0445\u043E\u0434\u0430",target:Fn}:r.phase==="port"?{title:"\u0417\u0430\u0431\u0435\u0440\u0438 \u0431\u0438\u043B\u0435\u0442\u044B \u0432 \u043F\u043E\u0440\u0442\u0443",detail:"\u0414\u043E\u0435\u0434\u044C \u0434\u043E \u043C\u0435\u0442\u043A\u0438, \u0432\u044B\u0439\u0434\u0438 \u0438\u0437 \u043C\u0430\u0448\u0438\u043D\u044B \u0438 \u0437\u0430\u0431\u0435\u0440\u0438 \u043A\u0435\u0439\u0441",target:Fr}:r.phase==="escape"?{title:"\u041E\u0442\u043E\u0440\u0432\u0438\u0441\u044C \u043E\u0442 \u043F\u0430\u0442\u0440\u0443\u043B\u044F",detail:"\u0414\u0435\u0440\u0436\u0438\u0441\u044C \u0434\u0430\u043B\u044C\u0448\u0435 25 \u043C \xB7 "+Math.floor(r.escape)+" / 12 \u0441",target:Fn}:{title:"\u0412\u0435\u0440\u043D\u0438\u0441\u044C \u0432 TWO ACES",detail:"\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0441\u044C \u0443 \u043A\u043B\u0443\u0431\u0430 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0439 \u043A\u0435\u0439\u0441 \u0420\u043E\u043C\u0435 \u043F\u0435\u0448\u043A\u043E\u043C",target:Fn}:{title:"\u0413\u043E\u0440\u043E\u0434 \u0432 \u0442\u0432\u043E\u0451\u043C \u0440\u0430\u0441\u043F\u043E\u0440\u044F\u0436\u0435\u043D\u0438\u0438",detail:"\u0413\u0443\u043B\u044F\u0439, \u043A\u0430\u0442\u0430\u0439\u0441\u044F \u0438\u043B\u0438 \u0432\u0435\u0440\u043D\u0438\u0441\u044C \u043A \u043A\u043B\u0443\u0431\u0443 \u0437\u0430 \u043D\u043E\u0432\u043E\u0439 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u043E\u0439"}}function cc(r){return{carrying:r.carrying,completed:r.completed,briefed:r.briefed}}async function Su(){let r=window.PokerGarage,e=window.pokerReadCityGarage?.(),t=window.pokerApiAuthJsonBody?.({action:"get"})||{};if(t.pwaSession||t.pwaVkSession||t.initData)try{let n=typeof window.getApiBase=="function"?window.getApiBase():location.origin,i=await fetch(n+"/api/player-hall",{method:"POST",headers:{"Content-Type":"application/json"},cache:"no-store",body:JSON.stringify(t),signal:AbortSignal.timeout(8e3)});if(!i.ok)throw Error("Garage unavailable");let s=await i.json(),a=s.hall;if(s.ok&&a?.self&&a.garage?.loadout){let o=window.pokerCaptureCityGarage?.(a);return{look:r.savedLoadout(a.garage.loadout,a.garage.stats||{}),source:"saved",owner:a.accountId,returnUrl:e?.returnUrl||o?.returnUrl}}throw Error("Own garage not available")}catch{if(!e){let i=Error("Saved garage unavailable");throw i.userMessage="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u0430\u0448\u0443 \u043C\u0430\u0448\u0438\u043D\u043A\u0443. \u041F\u0440\u043E\u0432\u0435\u0440\u044C \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0443 \u2014 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0433\u0430\u0440\u0430\u0436 \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0451\u043D.",i}}return e?{look:r.savedLoadout(e.loadout,e.stats),source:"villa",owner:e.accountId,returnUrl:e.returnUrl}:{look:{...r.defaults},source:"preview",owner:null}}var ud=0,th=1,dd=2;var nh=1,wr=2,ki=3,Ws=0,$n=1,Yt=2,Er=0,Xa=1,ih=2,rh=3,sh=4,pd=5,Xs=100,fd=101,md=102,gd=103,vd=104,yd=200,xd=201,_d=202,Md=203,bd=204,Td=205,Sd=206,wd=207,Ed=208,Ad=209,Cd=210,Rd=211,Pd=212,Id=213,Ld=214,wl=0,El=1,Al=2,ja=3,Cl=4,Rl=5,Pl=6,Il=7,Dd=0,Ud=1,Nd=2,or=0,Bd=1,Fd=2,Od=3,ri=4,zd=5,Gd=6,kd=7,Vc="attached",Vd="detached",ah=300,js=301,Qr=302,Ll=303,Dl=304,qa=306,bn=1e3,Ps=1001,Xo=1002,zi=1003,Hd=1004;var Ya=1005;var ii=1006,Ul=1007;var Pi=1008;var Vi=1009,oh=1010,lh=1011,qs=1012,Nl=1013,es=1014,_i=1015,Ar=1016,Bl=1017,Fl=1018,Ys=1020,ch=35902,hh=35899,Wd=1021,Xd=1022,Mi=1023,Za=1026,Ja=1027,Ol=1028,zl=1029,jd=1030,uh=1031;var dh=1033,Gl=33776,kl=33777,Vl=33778,Hl=33779,ph=35840,fh=35841,mh=35842,gh=35843,vh=36196,yh=37492,xh=37496,_h=37808,Mh=37809,bh=37810,Th=37811,Sh=37812,wh=37813,Eh=37814,Ah=37815,Ch=37816,Rh=37817,Ph=37818,Ih=37819,Lh=37820,Dh=37821,Uh=36492,Nh=36494,Bh=36495,Fh=36283,Oh=36284,zh=36285,Gh=36286;var va=2300,jo=2301,Vo=2302,Hc=2400,Wc=2401,Xc=2402;var Zs=3201;var qd=0,Yd=1,ts="",bt="srgb",Wr="srgb-linear",ya="linear",nn="srgb";var Hr=7680;var Zd=512,Jd=513,Kd=514,kh=515,$d=516,Qd=517,ep=518,tp=519,jc=35044;var Vh="300 es",ir=2e3,xa=2001;var rr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ho=Math.PI/180,_a=180/Math.PI;function ns(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Gn[255&r]+Gn[r>>8&255]+Gn[r>>16&255]+Gn[r>>24&255]+"-"+Gn[255&e]+Gn[e>>8&255]+"-"+Gn[e>>16&15|64]+Gn[e>>24&255]+"-"+Gn[63&t|128]+Gn[t>>8&255]+"-"+Gn[t>>16&255]+Gn[t>>24&255]+Gn[255&n]+Gn[n>>8&255]+Gn[n>>16&255]+Gn[n>>24&255]).toLowerCase()}function Gt(r,e,t){return Math.max(e,Math.min(t,r))}function _f(r,e){return(r%e+e)%e}function hc(r,e,t){return(1-t)*r+t*e}function sa(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ni(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var Ee=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Gt(this.x,e.x,t.x),this.y=Gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Gt(this.x,e,t),this.y=Gt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Hn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],g=s[a+2],m=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=f,e[t+2]=g,void(e[t+3]=m);if(u!==m||l!==d||c!==f||h!==g){let p=1-o,v=l*d+c*f+h*g+u*m,y=v>=0?1:-1,x=1-v*v;if(x>Number.EPSILON){let b=Math.sqrt(x),S=Math.atan2(b,v*y);p=Math.sin(p*S)/b,o=Math.sin(o*S)/b}let _=o*y;if(l=l*p+d*_,c=c*p+f*_,h=h*p+g*_,u=u*p+m*_,p===1-o){let b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Gt(this.x,e.x,t.x),this.y=Gt(this.y,e.y,t.y),this.z=Gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Gt(this.x,e,t),this.y=Gt(this.y,e,t),this.z=Gt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uc.copy(this).projectOnVector(e),this.sub(uc)}reflect(e){return this.sub(uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uc=new A,wu=new Hn,Lt=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],m=i[0],p=i[3],v=i[6],y=i[1],x=i[4],_=i[7],b=i[2],S=i[5],D=i[8];return s[0]=a*m+o*y+l*b,s[3]=a*p+o*x+l*S,s[6]=a*v+o*_+l*D,s[1]=c*m+h*y+u*b,s[4]=c*p+h*x+u*S,s[7]=c*v+h*_+u*D,s[2]=d*m+f*y+g*b,s[5]=d*p+f*x+g*S,s[8]=d*v+f*_+g*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/g;return e[0]=u*m,e[1]=(i*c-h*n)*m,e[2]=(o*n-i*a)*m,e[3]=d*m,e[4]=(h*t-i*l)*m,e[5]=(i*s-o*t)*m,e[6]=f*m,e[7]=(n*l-c*t)*m,e[8]=(a*t-n*s)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(dc.makeScale(e,t)),this}rotate(e){return this.premultiply(dc.makeRotation(-e)),this}translate(e,t){return this.premultiply(dc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},dc=new Lt;function Hh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Is(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function np(){let r=Is("canvas");return r.style.display="block",r}var Eu={};function Ls(r){r in Eu||(Eu[r]=!0,console.warn(r))}function ip(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Au=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cu=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mf(){let r={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===nn&&(i.r=nr(i.r),i.g=nr(i.g),i.b=nr(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nn&&(i.r=Rs(i.r),i.g=Rs(i.g),i.b=Rs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?ya:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ls("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ls("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Wr]:{primaries:e,whitePoint:n,transfer:ya,toXYZ:Au,fromXYZ:Cu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:n,transfer:nn,toXYZ:Au,fromXYZ:Cu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),r}var Jt=Mf();function nr(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Rs(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var gs,qo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=Is("canvas")),gs.width=e.width,gs.height=e.height;let i=gs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Is("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*nr(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*nr(t[n]/255)):t[n]=nr(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},bf=0,Ds=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=ns(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(pc(i[a].image)):s.push(pc(i[a]))}else s=pc(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function pc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?qo.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tf=0,fc=new A,Vn=class r extends rr{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,l=1009,c=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=ns(),this.name="",this.source=new Ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fc).x}get height(){return this.source.getSize(fc).y}get depth(){return this.source.getSize(fc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bn:e.x=e.x-Math.floor(e.x);break;case Ps:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case bn:e.y=e.y-Math.floor(e.y);break;case Ps:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Vn.DEFAULT_IMAGE=null,Vn.DEFAULT_MAPPING=ah,Vn.DEFAULT_ANISOTROPY=1;var Kt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],m=l[2],p=l[6],v=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,_=(f+1)/2,b=(v+1)/2,S=(h+d)/4,D=(u+m)/4,O=(g+p)/4;return x>_&&x>b?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=S/n,s=D/n):_>b?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=S/i,s=O/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=D/s,i=O/s),this.set(n,i,s,t),this}let y=Math.sqrt((p-g)*(p-g)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-m)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+v-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Gt(this.x,e.x,t.x),this.y=Gt(this.y,e.y,t.y),this.z=Gt(this.z,e.z,t.z),this.w=Gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Gt(this.x,e,t),this.y=Gt(this.y,e,t),this.z=Gt(this.z,e,t),this.w=Gt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yo=class extends rr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Kt(0,0,e,t),this.scissorTest=!1,this.viewport=new Kt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Vn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ds(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},xi=class extends Yo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ma=class extends Vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zi,this.minFilter=zi,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Zo=class extends Vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zi,this.minFilter=zi,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pn=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=wi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,wi):wi.fromBufferAttribute(s,a),wi.applyMatrix4(e.matrixWorld),this.expandByPoint(wi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fo.copy(n.boundingBox)),fo.applyMatrix4(e.matrixWorld),this.union(fo)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wi),wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(aa),mo.subVectors(this.max,aa),vs.subVectors(e.a,aa),ys.subVectors(e.b,aa),xs.subVectors(e.c,aa),pr.subVectors(ys,vs),fr.subVectors(xs,ys),zr.subVectors(vs,xs);let t=[0,-pr.z,pr.y,0,-fr.z,fr.y,0,-zr.z,zr.y,pr.z,0,-pr.x,fr.z,0,-fr.x,zr.z,0,-zr.x,-pr.y,pr.x,0,-fr.y,fr.x,0,-zr.y,zr.x,0];return!!mc(t,vs,ys,xs,mo)&&(t=[1,0,0,0,1,0,0,0,1],!!mc(t,vs,ys,xs,mo)&&(go.crossVectors(pr,fr),t=[go.x,go.y,go.z],mc(t,vs,ys,xs,mo)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(wi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Ji[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ji[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ji[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ji[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ji[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ji[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ji[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ji[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ji)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ji=[new A,new A,new A,new A,new A,new A,new A,new A],wi=new A,fo=new Pn,vs=new A,ys=new A,xs=new A,pr=new A,fr=new A,zr=new A,aa=new A,mo=new A,go=new A,Gr=new A;function mc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Gr.fromArray(r,s);let o=i.x*Math.abs(Gr.x)+i.y*Math.abs(Gr.y)+i.z*Math.abs(Gr.z),l=e.dot(Gr),c=t.dot(Gr),h=n.dot(Gr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Sf=new Pn,oa=new A,gc=new A,ui=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Sf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;oa.subVectors(e,this.center);let t=oa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(oa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(oa.copy(e.center).add(gc)),this.expandByPoint(oa.copy(e.center).sub(gc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ki=new A,vc=new A,vo=new A,mr=new A,yc=new A,yo=new A,xc=new A,Mr=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ki)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ki.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ki.copy(this.origin).addScaledVector(this.direction,t),Ki.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){vc.copy(e).add(t).multiplyScalar(.5),vo.copy(t).sub(e).normalize(),mr.copy(this.origin).sub(vc);let s=.5*e.distanceTo(t),a=-this.direction.dot(vo),o=mr.dot(this.direction),l=-mr.dot(vo),c=mr.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let m=1/h;u*=m,d*=m,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(vc).addScaledVector(vo,d),f}intersectSphere(e,t){Ki.subVectors(e.center,this.origin);let n=Ki.dot(this.direction),i=Ki.dot(Ki)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i?null:((o>n||n!=n)&&(n=o),(l<i||i!=i)&&(i=l),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Ki)!==null}intersectTriangle(e,t,n,i,s){yc.subVectors(t,e),yo.subVectors(n,e),xc.crossVectors(yc,yo);let a,o=this.direction.dot(xc);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}mr.subVectors(this.origin,e);let l=a*this.direction.dot(yo.crossVectors(mr,yo));if(l<0)return null;let c=a*this.direction.dot(yc.cross(mr));if(c<0||l+c>o)return null;let h=-a*mr.dot(xc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vt=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,g,m,p){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,g,m,p)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,g,m,p){let v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=a,v[9]=o,v[13]=l,v[2]=c,v[6]=h,v[10]=u,v[14]=d,v[3]=f,v[7]=g,v[11]=m,v[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/_s.setFromMatrixColumn(e,0).length(),s=1/_s.setFromMatrixColumn(e,1).length(),a=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,m=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-m*c,t[9]=-o*l,t[2]=m-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,m=c*u;t[0]=d+m*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=m+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,m=c*u;t[0]=d-m*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=m-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,m=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+m,t[1]=l*u,t[5]=m*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,g=o*l,m=o*c;t[0]=l*h,t[4]=m-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-m*u}else if(e.order==="XZY"){let d=a*l,f=a*c,g=o*l,m=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+m,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wf,e,Ef)}lookAt(e,t,n){let i=this.elements;return li.subVectors(e,t),li.lengthSq()===0&&(li.z=1),li.normalize(),gr.crossVectors(n,li),gr.lengthSq()===0&&(Math.abs(n.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),gr.crossVectors(n,li)),gr.normalize(),xo.crossVectors(li,gr),i[0]=gr.x,i[4]=xo.x,i[8]=li.x,i[1]=gr.y,i[5]=xo.y,i[9]=li.y,i[2]=gr.z,i[6]=xo.z,i[10]=li.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],m=n[6],p=n[10],v=n[14],y=n[3],x=n[7],_=n[11],b=n[15],S=i[0],D=i[4],O=i[8],F=i[12],k=i[1],I=i[5],U=i[9],K=i[13],j=i[2],re=i[6],ge=i[10],Q=i[14],de=i[3],Ie=i[7],ze=i[11],Ae=i[15];return s[0]=a*S+o*k+l*j+c*de,s[4]=a*D+o*I+l*re+c*Ie,s[8]=a*O+o*U+l*ge+c*ze,s[12]=a*F+o*K+l*Q+c*Ae,s[1]=h*S+u*k+d*j+f*de,s[5]=h*D+u*I+d*re+f*Ie,s[9]=h*O+u*U+d*ge+f*ze,s[13]=h*F+u*K+d*Q+f*Ae,s[2]=g*S+m*k+p*j+v*de,s[6]=g*D+m*I+p*re+v*Ie,s[10]=g*O+m*U+p*ge+v*ze,s[14]=g*F+m*K+p*Q+v*Ae,s[3]=y*S+x*k+_*j+b*de,s[7]=y*D+x*I+_*re+b*Ie,s[11]=y*O+x*U+_*ge+b*ze,s[15]=y*F+x*K+_*Q+b*Ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14];return e[3]*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+e[7]*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+e[11]*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+e[15]*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],m=e[13],p=e[14],v=e[15],y=u*p*c-m*d*c+m*l*f-o*p*f-u*l*v+o*d*v,x=g*d*c-h*p*c-g*l*f+a*p*f+h*l*v-a*d*v,_=h*m*c-g*u*c+g*o*f-a*m*f-h*o*v+a*u*v,b=g*u*l-h*m*l-g*o*d+a*m*d+h*o*p-a*u*p,S=t*y+n*x+i*_+s*b;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/S;return e[0]=y*D,e[1]=(m*d*s-u*p*s-m*i*f+n*p*f+u*i*v-n*d*v)*D,e[2]=(o*p*s-m*l*s+m*i*c-n*p*c-o*i*v+n*l*v)*D,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*D,e[4]=x*D,e[5]=(h*p*s-g*d*s+g*i*f-t*p*f-h*i*v+t*d*v)*D,e[6]=(g*l*s-a*p*s-g*i*c+t*p*c+a*i*v-t*l*v)*D,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*D,e[8]=_*D,e[9]=(g*u*s-h*m*s-g*n*f+t*m*f+h*n*v-t*u*v)*D,e[10]=(a*m*s-g*o*s+g*n*c-t*m*c-a*n*v+t*o*v)*D,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*D,e[12]=b*D,e[13]=(h*m*i-g*u*i+g*n*d-t*m*d-h*n*p+t*u*p)*D,e[14]=(g*o*i-a*m*i-g*n*l+t*m*l+a*n*p-t*o*p)*D,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*D,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,g=s*u,m=a*h,p=a*u,v=o*u,y=l*c,x=l*h,_=l*u,b=n.x,S=n.y,D=n.z;return i[0]=(1-(m+v))*b,i[1]=(f+_)*b,i[2]=(g-x)*b,i[3]=0,i[4]=(f-_)*S,i[5]=(1-(d+v))*S,i[6]=(p+y)*S,i[7]=0,i[8]=(g+x)*D,i[9]=(p-y)*D,i[10]=(1-(d+m))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=_s.set(i[0],i[1],i[2]).length(),a=_s.set(i[4],i[5],i[6]).length(),o=_s.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Ei.copy(this);let l=1/s,c=1/a,h=1/o;return Ei.elements[0]*=l,Ei.elements[1]*=l,Ei.elements[2]*=l,Ei.elements[4]*=c,Ei.elements[5]*=c,Ei.elements[6]*=c,Ei.elements[8]*=h,Ei.elements[9]*=h,Ei.elements[10]*=h,t.setFromRotationMatrix(Ei),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),g,m;if(l)g=s/(a-s),m=a*s/(a-s);else if(o===ir)g=-(a+s)/(a-s),m=-2*a*s/(a-s);else{if(o!==xa)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);g=-a/(a-s),m=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),g,m;if(l)g=1/(a-s),m=a/(a-s);else if(o===ir)g=-2/(a-s),m=-(a+s)/(a-s);else{if(o!==xa)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);g=-1/(a-s),m=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_s=new A,Ei=new vt,wf=new A(0,0,0),Ef=new A(1,1,1),gr=new A,xo=new A,li=new A,Ru=new vt,Pu=new Hn,Ci=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ru.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ru,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pu.setFromEuler(this),this.setFromQuaternion(Pu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ci.DEFAULT_ORDER="XYZ";var Us=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Af=0,Iu=new A,Ms=new Hn,$i=new vt,_o=new A,la=new A,Cf=new A,Rf=new Hn,Lu=new A(1,0,0),Du=new A(0,1,0),Uu=new A(0,0,1),Nu={type:"added"},Pf={type:"removed"},bs={type:"childadded",child:null},_c={type:"childremoved",child:null},gn=class r extends rr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new A,t=new Ci,n=new Hn,i=new A(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vt},normalMatrix:{value:new Lt}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Us,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(Lu,e)}rotateY(e){return this.rotateOnAxis(Du,e)}rotateZ(e){return this.rotateOnAxis(Uu,e)}translateOnAxis(e,t){return Iu.copy(e).applyQuaternion(this.quaternion),this.position.add(Iu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lu,e)}translateY(e){return this.translateOnAxis(Du,e)}translateZ(e){return this.translateOnAxis(Uu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($i.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_o.copy(e):_o.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),la.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$i.lookAt(la,_o,this.up):$i.lookAt(_o,la,this.up),this.quaternion.setFromRotationMatrix($i),i&&($i.extractRotation(i.matrixWorld),Ms.setFromRotationMatrix($i),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nu),bs.child=e,this.dispatchEvent(bs),bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pf),_c.child=e,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$i.multiply(e.parent.matrixWorld)),e.applyMatrix4($i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nu),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,e,Cf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,Rf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};gn.DEFAULT_UP=new A(0,1,0),gn.DEFAULT_MATRIX_AUTO_UPDATE=!0,gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ai=new A,Qi=new A,Mc=new A,er=new A,Ts=new A,Ss=new A,Bu=new A,bc=new A,Tc=new A,Sc=new A,wc=new Kt,Ec=new Kt,Ac=new Kt,tr=class r{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ai.subVectors(e,t),i.cross(Ai);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ai.subVectors(i,t),Qi.subVectors(n,t),Mc.subVectors(e,t);let a=Ai.dot(Ai),o=Ai.dot(Qi),l=Ai.dot(Mc),c=Qi.dot(Qi),h=Qi.dot(Mc),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,er)!==null&&er.x>=0&&er.y>=0&&er.x+er.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,er)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,er.x),l.addScaledVector(a,er.y),l.addScaledVector(o,er.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return wc.setScalar(0),Ec.setScalar(0),Ac.setScalar(0),wc.fromBufferAttribute(e,t),Ec.fromBufferAttribute(e,n),Ac.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(wc,s.x),a.addScaledVector(Ec,s.y),a.addScaledVector(Ac,s.z),a}static isFrontFacing(e,t,n,i){return Ai.subVectors(n,t),Qi.subVectors(e,t),Ai.cross(Qi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),Qi.subVectors(this.a,this.b),.5*Ai.cross(Qi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Ts.subVectors(i,n),Ss.subVectors(s,n),bc.subVectors(e,n);let l=Ts.dot(bc),c=Ss.dot(bc);if(l<=0&&c<=0)return t.copy(n);Tc.subVectors(e,i);let h=Ts.dot(Tc),u=Ss.dot(Tc);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ts,a);Sc.subVectors(e,s);let f=Ts.dot(Sc),g=Ss.dot(Sc);if(g>=0&&f<=g)return t.copy(s);let m=f*c-l*g;if(m<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ss,o);let p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Bu.subVectors(s,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Bu,o);let v=1/(p+m+d);return a=m*v,o=d*v,t.copy(n).addScaledVector(Ts,a).addScaledVector(Ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function Cc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var dt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Jt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Jt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Jt.workingColorSpace){if(e=_f(e,1),t=Gt(t,0,1),n=Gt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Cc(a,s,e+1/3),this.g=Cc(a,s,e),this.b=Cc(a,s,e-1/3)}return Jt.colorSpaceToWorking(this,i),this}setStyle(e,t=bt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let n=rp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}copyLinearToSRGB(e){return this.r=Rs(e.r),this.g=Rs(e.g),this.b=Rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return Jt.workingToColorSpace(kn.copy(this),e),65536*Math.round(Gt(255*kn.r,0,255))+256*Math.round(Gt(255*kn.g,0,255))+Math.round(Gt(255*kn.b,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Jt.workingColorSpace){Jt.workingToColorSpace(kn.copy(this),t);let n=kn.r,i=kn.g,s=kn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Jt.workingColorSpace){return Jt.workingToColorSpace(kn.copy(this),t),e.r=kn.r,e.g=kn.g,e.b=kn.b,e}getStyle(e=bt){Jt.workingToColorSpace(kn.copy(this),e);let t=kn.r,n=kn.g,i=kn.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+t,vr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vr),e.getHSL(Mo);let n=hc(vr.h,Mo.h,t),i=hc(vr.s,Mo.s,t),s=hc(vr.l,Mo.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},kn=new dt;dt.NAMES=rp;var If=0,Gi=class extends rr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=ns(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},In=class extends Gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},W0=Lf();function Lf(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,i[l]=24,i[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,i[l]=-c-1,i[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,i[l]=13,i[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,i[l]=24,i[256|l]=24):(n[l]=31744,n[256|l]=64512,i[l]=13,i[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Mn=new A,bo=new Ee,Df=0,vn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Df++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jc,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix3(e),this.setXY(t,bo.x,bo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix3(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sa(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ni(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sa(t,this.array)),t}setX(e,t){return this.normalized&&(t=ni(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sa(t,this.array)),t}setY(e,t){return this.normalized&&(t=ni(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ni(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sa(t,this.array)),t}setW(e,t){return this.normalized&&(t=ni(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ni(t,this.array),n=ni(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ni(t,this.array),n=ni(n,this.array),i=ni(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ni(t,this.array),n=ni(n,this.array),i=ni(i,this.array),s=ni(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jc&&(e.usage=this.usage),e}};var Xr=class extends vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ba=class extends vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Re=class extends vn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Uf=0,yi=new vt,Rc=new gn,ws=new A,ci=new Pn,ca=new Pn,Bn=new A,pt=class r extends rr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hh(e)?ba:Xr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Lt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yi.makeRotationFromQuaternion(e),this.applyMatrix4(yi),this}rotateX(e){return yi.makeRotationX(e),this.applyMatrix4(yi),this}rotateY(e){return yi.makeRotationY(e),this.applyMatrix4(yi),this}rotateZ(e){return yi.makeRotationZ(e),this.applyMatrix4(yi),this}translate(e,t,n){return yi.makeTranslation(e,t,n),this.applyMatrix4(yi),this}scale(e,t,n){return yi.makeScale(e,t,n),this.applyMatrix4(yi),this}lookAt(e){return Rc.lookAt(e),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Re(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];ci.setFromBufferAttribute(s),this.morphTargetsRelative?(Bn.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Bn),Bn.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Bn)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new A,1/0);if(e){let n=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ca.setFromBufferAttribute(o),this.morphTargetsRelative?(Bn.addVectors(ci.min,ca.min),ci.expandByPoint(Bn),Bn.addVectors(ci.max,ca.max),ci.expandByPoint(Bn)):(ci.expandByPoint(ca.min),ci.expandByPoint(ca.max))}ci.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Bn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Bn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Bn.fromBufferAttribute(o,c),l&&(ws.fromBufferAttribute(e,c),Bn.add(ws)),i=Math.max(i,n.distanceToSquared(Bn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new A,l[O]=new A;let c=new A,h=new A,u=new A,d=new Ee,f=new Ee,g=new Ee,m=new A,p=new A;function v(O,F,k){c.fromBufferAttribute(n,O),h.fromBufferAttribute(n,F),u.fromBufferAttribute(n,k),d.fromBufferAttribute(s,O),f.fromBufferAttribute(s,F),g.fromBufferAttribute(s,k),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(m.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),o[O].add(m),o[F].add(m),o[k].add(m),l[O].add(p),l[F].add(p),l[k].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let O=0,F=y.length;O<F;++O){let k=y[O],I=k.start;for(let U=I,K=I+k.count;U<K;U+=3)v(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let x=new A,_=new A,b=new A,S=new A;function D(O){b.fromBufferAttribute(i,O),S.copy(b);let F=o[O];x.copy(F),x.sub(b.multiplyScalar(b.dot(F))).normalize(),_.crossVectors(S,F);let k=_.dot(l[O])<0?-1:1;a.setXYZW(O,x.x,x.y,x.z,k)}for(let O=0,F=y.length;O<F;++O){let k=y[O],I=k.start;for(let U=I,K=I+k.count;U<K;U+=3)D(e.getX(U+0)),D(e.getX(U+1)),D(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new vn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new A,s=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),m=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),a.fromBufferAttribute(t,p),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bn.fromBufferAttribute(e,t),Bn.normalize(),e.setXYZ(t,Bn.x,Bn.y,Bn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let m=0,p=l.length;m<p;m++){f=o.isInterleavedBufferAttribute?l[m]*o.data.stride+o.offset:l[m]*h;for(let v=0;v<h;v++)d[g++]=c[f++]}return new vn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=e(i[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fu=new vt,kr=new Mr,To=new ui,Ou=new A,So=new A,wo=new A,Eo=new A,Pc=new A,Ao=new A,zu=new A,Co=new A,qe=class extends gn{constructor(e=new pt,t=new In){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Ao.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(Pc.fromBufferAttribute(u,e),a?Ao.addScaledVector(Pc,h):Ao.addScaledVector(Pc.sub(t),h))}t.add(Ao)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(s),kr.copy(e.ray).recast(e.near),To.containsPoint(kr.origin)===!1&&(kr.intersectSphere(To,Ou)===null||kr.origin.distanceToSquared(Ou)>(e.far-e.near)**2))return;Fu.copy(s).invert(),kr.copy(e.ray).applyMatrix4(Fu),n.boundingBox!==null&&kr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,kr)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let p=d[g],v=a[p.materialIndex];for(let y=Math.max(p.start,f.start),x=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));y<x;y+=3)i=Ro(this,v,e,n,c,h,u,o.getX(y),o.getX(y+1),o.getX(y+2)),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}else for(let g=Math.max(0,f.start),m=Math.min(o.count,f.start+f.count);g<m;g+=3)i=Ro(this,a,e,n,c,h,u,o.getX(g),o.getX(g+1),o.getX(g+2)),i&&(i.faceIndex=Math.floor(g/3),t.push(i));else if(l!==void 0)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let p=d[g],v=a[p.materialIndex];for(let y=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));y<x;y+=3)i=Ro(this,v,e,n,c,h,u,y,y+1,y+2),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}else for(let g=Math.max(0,f.start),m=Math.min(l.count,f.start+f.count);g<m;g+=3)i=Ro(this,a,e,n,c,h,u,g,g+1,g+2),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}};function Ro(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,So),r.getVertexPosition(l,wo),r.getVertexPosition(c,Eo);let h=(function(u,d,f,g,m,p,v,y){let x;if(x=d.side===1?g.intersectTriangle(v,p,m,!0,y):g.intersectTriangle(m,p,v,d.side===0,y),x===null)return null;Co.copy(y),Co.applyMatrix4(u.matrixWorld);let _=f.ray.origin.distanceTo(Co);return _<f.near||_>f.far?null:{distance:_,point:Co.clone(),object:u}})(r,e,t,n,So,wo,Eo,zu);if(h){let u=new A;tr.getBarycoord(zu,So,wo,Eo,u),i&&(h.uv=tr.getInterpolatedAttribute(i,o,l,c,u,new Ee)),s&&(h.uv1=tr.getInterpolatedAttribute(s,o,l,c,u,new Ee)),a&&(h.normal=tr.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new A,materialIndex:0};tr.getNormal(So,wo,Eo,d.normal),h.face=d,h.barycoord=u}return h}var nt=class r extends pt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;function g(m,p,v,y,x,_,b,S,D,O,F){let k=_/D,I=b/O,U=_/2,K=b/2,j=S/2,re=D+1,ge=O+1,Q=0,de=0,Ie=new A;for(let ze=0;ze<ge;ze++){let Ae=ze*I-K;for(let Ve=0;Ve<re;Ve++){let ie=Ve*k-U;Ie[m]=ie*y,Ie[p]=Ae*x,Ie[v]=j,c.push(Ie.x,Ie.y,Ie.z),Ie[m]=0,Ie[p]=0,Ie[v]=S>0?1:-1,h.push(Ie.x,Ie.y,Ie.z),u.push(Ve/D),u.push(1-ze/O),Q+=1}}for(let ze=0;ze<O;ze++)for(let Ae=0;Ae<D;Ae++){let Ve=d+Ae+re*ze,ie=d+Ae+re*(ze+1),Te=d+(Ae+1)+re*(ze+1),we=d+(Ae+1)+re*ze;l.push(Ve,ie,we),l.push(ie,Te,we),de+=6}o.addGroup(f,de,F),f+=de,d+=Q}g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function is(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Yn(r){let e={};for(let t=0;t<r.length;t++){let n=is(r[t]);for(let i in n)e[i]=n[i]}return e}function Wh(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Jt.workingColorSpace}var sp={clone:is,merge:Yn},Wn=class extends Gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=is(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ns=class extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=ir,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},yr=new A,Gu=new Ee,ku=new Ee,sn=class extends Ns{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*_a*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Ho*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*_a*Math.atan(Math.tan(.5*Ho*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yr.x,yr.y).multiplyScalar(-e/yr.z),yr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yr.x,yr.y).multiplyScalar(-e/yr.z)}getViewSize(e,t){return this.getViewBounds(e,Gu,ku),t.subVectors(ku,Gu)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Ho*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Es=-90,Jo=class extends gn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new sn(Es,1,e,t);i.layers=this.layers,this.add(i);let s=new sn(Es,1,e,t);s.layers=this.layers,this.add(s);let a=new sn(Es,1,e,t);a.layers=this.layers,this.add(a);let o=new sn(Es,1,e,t);o.layers=this.layers,this.add(o);let l=new sn(Es,1,e,t);l.layers=this.layers,this.add(l);let c=new sn(Es,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===ir)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==xa)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ta=class extends Vn{constructor(e=[],t=301,n,i,s,a,o,l,c,h){super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ko=class extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ta(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new nt(5,5,5),s=new Wn({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new qe(i,s),o=t.minFilter;return t.minFilter===Pi&&(t.minFilter=ii),new Jo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},ke=class extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Nf={type:"move"},Bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let m of e.hand.values()){let p=t.getJointPose(m,n),v=this._getHandJoint(c,m);p!==null&&(v.matrix.fromArray(p.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=p.radius),v.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Sa=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new dt(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Tn=class extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ci,this.environmentIntensity=1,this.environmentRotation=new Ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var X0=new A;var j0=new A,q0=new A,Y0=new A,Z0=new Ee,J0=new Ee,K0=new vt,$0=new A,Q0=new A,eg=new A,tg=new Ee,ng=new Ee,ig=new Ee;var rg=new A,sg=new A;var Vu=new A,Hu=new Kt,Wu=new Kt,Bf=new A,Xu=new vt,Po=new A,Ic=new ui,ju=new vt,Lc=new Mr,wa=class extends qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vc,this.bindMatrix=new vt,this.bindMatrixInverse=new vt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingBox.expandByPoint(Po)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ui),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingSphere.expandByPoint(Po)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ic.copy(this.boundingSphere),Ic.applyMatrix4(i),e.ray.intersectsSphere(Ic)!==!1&&(ju.copy(i).invert(),Lc.copy(e.ray).applyMatrix4(ju),this.boundingBox!==null&&Lc.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Lc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Kt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Vc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Hu.fromBufferAttribute(i.attributes.skinIndex,e),Wu.fromBufferAttribute(i.attributes.skinWeight,e),Vu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Wu.getComponent(s);if(a!==0){let o=Hu.getComponent(s);Xu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Bf.copy(Vu).applyMatrix4(Xu),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Fs=class extends gn{constructor(){super(),this.isBone=!0,this.type="Bone"}},sr=class extends Vn{constructor(e=null,t=1,n=1,i,s,a,o,l,c=1003,h=1003,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},qu=new vt,Ff=new vt,Ea=class r{constructor(e=[],t=[]){this.uuid=ns(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new vt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new vt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Ff;qu.multiplyMatrices(o,t[s]),qu.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new sr(t,e,e,Mi,_i);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Fs),this.bones.push(a),this.boneInverses.push(new vt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Aa=class extends vn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},As=new vt,Yu=new vt,Io=[],Zu=new Pn,Of=new vt,ha=new qe,ua=new ui,jr=class extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Aa(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Of)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),Zu.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(Zu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),ua.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(ua)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ha.geometry=this.geometry,ha.material=this.material,ha.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ua.copy(this.boundingSphere),ua.applyMatrix4(n),e.ray.intersectsSphere(ua)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,As),Yu.multiplyMatrices(n,As),ha.matrixWorld=Yu,ha.raycast(e,Io);for(let a=0,o=Io.length;a<o;a++){let l=Io[a];l.instanceId=s,l.object=this,t.push(l)}Io.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Aa(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new sr(new Float32Array(i*this.count),i,this.count,Ol,_i));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Dc=new A,zf=new A,Gf=new Lt,Fi=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Dc.subVectors(n,t).cross(zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Dc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Gf.getNormalMatrix(e),i=this.coplanarPoint(Dc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vr=new ui,kf=new Ee(.5,.5),Lo=new A,br=class{constructor(e=new Fi,t=new Fi,n=new Fi,i=new Fi,s=new Fi,a=new Fi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],m=s[9],p=s[10],v=s[11],y=s[12],x=s[13],_=s[14],b=s[15];if(i[0].setComponents(c-a,f-h,v-g,b-y).normalize(),i[1].setComponents(c+a,f+h,v+g,b+y).normalize(),i[2].setComponents(c+o,f+u,v+m,b+x).normalize(),i[3].setComponents(c-o,f-u,v-m,b-x).normalize(),n)i[4].setComponents(l,d,p,_).normalize(),i[5].setComponents(c-l,f-d,v-p,b-_).normalize();else if(i[4].setComponents(c-l,f-d,v-p,b-_).normalize(),t===ir)i[5].setComponents(c+l,f+d,v+p,b+_).normalize();else{if(t!==xa)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(l,d,p,_).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vr)}intersectsSprite(e){Vr.center.set(0,0,0);let t=kf.distanceTo(e.center);return Vr.radius=.7071067811865476+t,Vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Lo.x=i.normal.x>0?e.max.x:e.min.x,Lo.y=i.normal.y>0?e.max.y:e.min.y,Lo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ni=new vt,Bi=new br,$o=class r{constructor(){this.coordinateSystem=ir}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ni.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Bi.setFromProjectionMatrix(Ni,i.coordinateSystem,i.reversedDepth),Bi.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ni.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Bi.setFromProjectionMatrix(Ni,i.coordinateSystem,i.reversedDepth),Bi.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ni.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Bi.setFromProjectionMatrix(Ni,i.coordinateSystem,i.reversedDepth),Bi.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ni.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Bi.setFromProjectionMatrix(Ni,i.coordinateSystem,i.reversedDepth),Bi.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ni.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Bi.setFromProjectionMatrix(Ni,i.coordinateSystem,i.reversedDepth),Bi.containsPoint(e))return!0}return!1}clone(){return new r}};var qc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},ag=new vt,og=new dt(1,1,1),lg=new br,cg=new $o,hg=new Pn,ug=new ui,dg=new A,pg=new A,fg=new A,mg=new qc,gg=new qe;var Os=class extends Gi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Qo=new A,el=new A,Ju=new vt,da=new Mr,Do=new ui,Uc=new A,Ku=new A,tl=class extends gn{constructor(e=new pt,t=new Os){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Qo.fromBufferAttribute(t,i-1),el.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Qo.distanceTo(el);e.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(i),Do.radius+=s,e.ray.intersectsSphere(Do)===!1)return;Ju.copy(i).invert(),da.copy(e.ray).applyMatrix4(Ju);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,m=f-1;g<m;g+=c){let p=h.getX(g),v=h.getX(g+1),y=Uo(this,e,da,l,p,v,g);y&&t.push(y)}if(this.isLineLoop){let g=h.getX(f-1),m=h.getX(d),p=Uo(this,e,da,l,g,m,f-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,m=f-1;g<m;g+=c){let p=Uo(this,e,da,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){let g=Uo(this,e,da,l,f-1,d,f-1);g&&t.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Uo(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(Qo.fromBufferAttribute(o,i),el.fromBufferAttribute(o,s),t.distanceSqToSegment(Qo,el,Uc,Ku)>n)return;Uc.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(Uc);return l<e.near||l>e.far?void 0:{distance:l,point:Ku.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var $u=new A,Qu=new A,Ca=class extends tl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)$u.fromBufferAttribute(t,i),Qu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+$u.distanceTo(Qu);e.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var vg=new vt,yg=new Mr,xg=new ui,_g=new A;var kt=class extends Vn{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ra=class extends Vn{constructor(e,t,n=1014,i,s,a,o=1003,l=1003,c,h=1026,u=1){if(h!==Za&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ds(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Pa=class extends Vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},zs=class r extends pt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,g=2*n+s,m=i+1,p=new A,v=new A;for(let y=0;y<=g;y++){let x=0,_=0,b=0,S=0;if(y<=n){let F=y/n,k=F*Math.PI/2;_=-h-e*Math.cos(k),b=e*Math.sin(k),S=-e*Math.cos(k),x=F*u}else if(y<=n+s){let F=(y-n)/s;_=F*t-h,b=e,S=0,x=u+F*d}else{let F=(y-n-s)/n,k=F*Math.PI/2;_=h+e*Math.sin(k),b=e*Math.cos(k),S=e*Math.sin(k),x=u+d+F*u}let D=Math.max(0,Math.min(1,x/f)),O=0;y===0?O=.5/i:y===g&&(O=-.5/i);for(let F=0;F<=i;F++){let k=F/i,I=k*Math.PI*2,U=Math.sin(I),K=Math.cos(I);v.x=-b*K,v.y=_,v.z=b*U,o.push(v.x,v.y,v.z),p.set(-b*K,S,b*U),p.normalize(),l.push(p.x,p.y,p.z),c.push(k+O,D)}if(y>0){let F=(y-1)*m;for(let k=0;k<i;k++){let I=F+k,U=F+k+1,K=y*m+k,j=y*m+k+1;a.push(I,U,K),a.push(U,j,K)}}}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Xn=class r extends pt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new A,h=new Ee;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("normal",new Re(o,3)),this.setAttribute("uv",new Re(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$e=class r extends pt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],g=0,m=[],p=n/2,v=0;function y(x){let _=g,b=new Ee,S=new A,D=0,O=x===!0?e:t,F=x===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,p*F,0),d.push(0,F,0),f.push(.5,.5),g++;let k=g;for(let I=0;I<=i;I++){let U=I/i*l+o,K=Math.cos(U),j=Math.sin(U);S.x=O*j,S.y=p*F,S.z=O*K,u.push(S.x,S.y,S.z),d.push(0,F,0),b.x=.5*K+.5,b.y=.5*j*F+.5,f.push(b.x,b.y),g++}for(let I=0;I<i;I++){let U=_+I,K=k+I;x===!0?h.push(K,K+1,U):h.push(K+1,K,U),D+=3}c.addGroup(v,D,x===!0?1:2),v+=D}(function(){let x=new A,_=new A,b=0,S=(t-e)/n;for(let D=0;D<=s;D++){let O=[],F=D/s,k=F*(t-e)+e;for(let I=0;I<=i;I++){let U=I/i,K=U*l+o,j=Math.sin(K),re=Math.cos(K);_.x=k*j,_.y=-F*n+p,_.z=k*re,u.push(_.x,_.y,_.z),x.set(j,S,re).normalize(),d.push(x.x,x.y,x.z),f.push(U,1-F),O.push(g++)}m.push(O)}for(let D=0;D<i;D++)for(let O=0;O<s;O++){let F=m[O][D],k=m[O+1][D],I=m[O+1][D+1],U=m[O][D+1];(e>0||O!==0)&&(h.push(F,k,U),b+=3),(t>0||O!==s-1)&&(h.push(k,I,U),b+=3)}c.addGroup(v,b,0),v+=b})(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},qr=class r extends $e{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Tr=class r extends pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(f,g,m,p){let v=p+1,y=[];for(let x=0;x<=v;x++){y[x]=[];let _=f.clone().lerp(m,x/v),b=g.clone().lerp(m,x/v),S=v-x;for(let D=0;D<=S;D++)y[x][D]=D===0&&x===v?_:_.clone().lerp(b,D/S)}for(let x=0;x<v;x++)for(let _=0;_<2*(v-x)-1;_++){let b=Math.floor(_/2);_%2==0?(l(y[x][b+1]),l(y[x+1][b]),l(y[x][b])):(l(y[x][b+1]),l(y[x+1][b+1]),l(y[x+1][b]))}}function l(f){s.push(f.x,f.y,f.z)}function c(f,g){let m=3*f;g.x=e[m+0],g.y=e[m+1],g.z=e[m+2]}function h(f,g,m,p){p<0&&f.x===1&&(a[g]=f.x-1),m.x===0&&m.z===0&&(a[g]=p/2/Math.PI+.5)}function u(f){return Math.atan2(f.z,-f.x)}function d(f){return Math.atan2(-f.y,Math.sqrt(f.x*f.x+f.z*f.z))}(function(f){let g=new A,m=new A,p=new A;for(let v=0;v<t.length;v+=3)c(t[v+0],g),c(t[v+1],m),c(t[v+2],p),o(g,m,p,f)})(i),(function(f){let g=new A;for(let m=0;m<s.length;m+=3)g.x=s[m+0],g.y=s[m+1],g.z=s[m+2],g.normalize().multiplyScalar(f),s[m+0]=g.x,s[m+1]=g.y,s[m+2]=g.z})(n),(function(){let f=new A;for(let g=0;g<s.length;g+=3){f.x=s[g+0],f.y=s[g+1],f.z=s[g+2];let m=u(f)/2/Math.PI+.5,p=d(f)/Math.PI+.5;a.push(m,1-p)}(function(){let g=new A,m=new A,p=new A,v=new A,y=new Ee,x=new Ee,_=new Ee;for(let b=0,S=0;b<s.length;b+=9,S+=6){g.set(s[b+0],s[b+1],s[b+2]),m.set(s[b+3],s[b+4],s[b+5]),p.set(s[b+6],s[b+7],s[b+8]),y.set(a[S+0],a[S+1]),x.set(a[S+2],a[S+3]),_.set(a[S+4],a[S+5]),v.copy(g).add(m).add(p).divideScalar(3);let D=u(v);h(y,S+0,g,D),h(x,S+2,m,D),h(_,S+4,p,D)}})(),(function(){for(let g=0;g<a.length;g+=6){let m=a[g+0],p=a[g+2],v=a[g+4],y=Math.max(m,p,v),x=Math.min(m,p,v);y>.9&&x<.1&&(m<.2&&(a[g+0]+=1),p<.2&&(a[g+2]+=1),v<.2&&(a[g+4]+=1))}})()})(),this.setAttribute("position",new Re(s,3)),this.setAttribute("normal",new Re(s.slice(),3)),this.setAttribute("uv",new Re(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},nl=class r extends Tr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},No=new A,Bo=new A,Nc=new A,Fo=new tr,il=class extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Ho*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:m,b:p,c:v}=Fo;if(m.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),v.fromBufferAttribute(o,c[2]),Fo.getNormal(Nc),u[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,u[2]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let y=0;y<3;y++){let x=(y+1)%3,_=u[y],b=u[x],S=Fo[h[y]],D=Fo[h[x]],O=`${_}_${b}`,F=`${b}_${_}`;F in d&&d[F]?(Nc.dot(d[F].normal)<=s&&(f.push(S.x,S.y,S.z),f.push(D.x,D.y,D.z)),d[F]=null):O in d||(d[O]={index0:c[y],index1:c[x],normal:Nc.clone()})}}for(let g in d)if(d[g]){let{index0:m,index1:p}=d[g];No.fromBufferAttribute(o,m),Bo.fromBufferAttribute(o,p),f.push(No.x,No.y,No.z),f.push(Bo.x,Bo.y,Bo.z)}this.setAttribute("position",new Re(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},di=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(i=Math.floor(l+(c-l)/2),o=n[i]-a,o<0)l=i+1;else{if(!(o>0)){c=i;break}c=i-1}if(i=c,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new Ee:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new A,i=[],s=[],a=[],o=new A,l=new vt;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new A)}s[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Gt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Gt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Gs=class extends di{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ee){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},rl=class extends Gs{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Xh(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Oo=new A,Bc=new Xh,Fc=new Xh,Oc=new Xh,Rt=class extends di{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new A){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=i[(c-1)%s]:(Oo.subVectors(i[0],i[1]).add(i[0]),o=Oo);let u=i[c%s],d=i[(c+1)%s];if(this.closed||c+2<s?l=i[(c+2)%s]:(Oo.subVectors(i[s-1],i[s-2]).add(i[s-1]),l=Oo),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(o.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(l),f);m<1e-4&&(m=1),g<1e-4&&(g=m),p<1e-4&&(p=m),Bc.initNonuniformCatmullRom(o.x,u.x,d.x,l.x,g,m,p),Fc.initNonuniformCatmullRom(o.y,u.y,d.y,l.y,g,m,p),Oc.initNonuniformCatmullRom(o.z,u.z,d.z,l.z,g,m,p)}else this.curveType==="catmullrom"&&(Bc.initCatmullRom(o.x,u.x,d.x,l.x,this.tension),Fc.initCatmullRom(o.y,u.y,d.y,l.y,this.tension),Oc.initCatmullRom(o.z,u.z,d.z,l.z,this.tension));return n.set(Bc.calc(h),Fc.calc(h),Oc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new A().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ed(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function ma(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function ga(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Ia=class extends di{constructor(e=new Ee,t=new Ee,n=new Ee,i=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Ee){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ga(e,i.x,s.x,a.x,o.x),ga(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sl=class extends di{constructor(e=new A,t=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new A){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ga(e,i.x,s.x,a.x,o.x),ga(e,i.y,s.y,a.y,o.y),ga(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},La=class extends di{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},al=class extends di{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends di{constructor(e=new Ee,t=new Ee,n=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ee){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ma(e,i.x,s.x,a.x),ma(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ua=class extends di{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ma(e,i.x,s.x,a.x),ma(e,i.y,s.y,a.y),ma(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Na=class extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(ed(o,l.x,c.x,h.x,u.x),ed(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Ee().fromArray(i))}return this}},ol=Object.freeze({__proto__:null,ArcCurve:rl,CatmullRomCurve3:Rt,CubicBezierCurve:Ia,CubicBezierCurve3:sl,EllipseCurve:Gs,LineCurve:La,LineCurve3:al,QuadraticBezierCurve:Da,QuadraticBezierCurve3:Ua,SplineCurve:Na}),ll=class extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ol[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ol[i.type]().fromJSON(i))}return this}},jn=class extends ll{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new La(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Da(this.currentPoint.clone(),new Ee(e,t),new Ee(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Ia(this.currentPoint.clone(),new Ee(e,t),new Ee(n,i),new Ee(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Na(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new Gs(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Wt=class extends jn{constructor(e){super(e),this.uuid=ns(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new jn().fromJSON(i))}return this}};function Vf(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=td(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,u,d,f){let g=[];for(let m=0,p=u.length;m<p;m++){let v=td(h,u[m]*f,m<p-1?u[m+1]*f:h.length,f,!1);v===v.next&&(v.steiner=!0),g.push(Jf(v))}g.sort(qf);for(let m=0;m<g.length;m++)d=Yf(g[m],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=r[d],g=r[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Ba(s,a,t,o,l,c,0),a}function td(r,e,t,n,i){let s;if(i===(function(a,o,l,c){let h=0;for(let u=o,d=l-c;u<l;u+=c)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=nd(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=nd(a/n|0,r[a],r[a+1],s);return s&&ks(s,s.next)&&(Oa(s),s=s.next),s}function Yr(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!ks(n,n.next)&&pn(n.prev,n,n.next)!==0)n=n.next;else{if(Oa(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Ba(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(l,c,h,u){let d=l;do d.z===0&&(d.z=Yc(d.x,d.y,c,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==l);d.prevZ.nextZ=null,d.prevZ=null,(function(f){let g,m=1;do{let p,v=f;f=null;let y=null;for(g=0;v;){g++;let x=v,_=0;for(let S=0;S<m&&(_++,x=x.nextZ,x);S++);let b=m;for(;_>0||b>0&&x;)_!==0&&(b===0||!x||v.z<=x.z)?(p=v,v=v.nextZ,_--):(p=x,x=x.nextZ,b--),y?y.nextZ=p:f=p,p.prevZ=y,y=p;v=x}y.nextZ=null,m*=2}while(g>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?Wf(r,n,i,s):Hf(r))e.push(l.i,r.i,c.i),Oa(r),r=c.next,o=c.next;else if((r=c)===o){a?a===1?Ba(r=Xf(Yr(r),e),e,t,n,i,s,2):a===2&&jf(r,e,t,n,i,s):Ba(Yr(r),e,t,n,i,s,1);break}}}function Hf(r){let e=r.prev,t=r,n=r.next;if(pn(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,s,a),u=Math.min(o,l,c),d=Math.max(i,s,a),f=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&fa(i,o,s,l,a,c,g.x,g.y)&&pn(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Wf(r,e,t,n){let i=r.prev,s=r,a=r.next;if(pn(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),m=Math.max(o,l,c),p=Math.max(h,u,d),v=Yc(f,g,e,t,n),y=Yc(m,p,e,t,n),x=r.prevZ,_=r.nextZ;for(;x&&x.z>=v&&_&&_.z<=y;){if(x.x>=f&&x.x<=m&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&fa(o,h,l,u,c,d,x.x,x.y)&&pn(x.prev,x,x.next)>=0||(x=x.prevZ,_.x>=f&&_.x<=m&&_.y>=g&&_.y<=p&&_!==i&&_!==a&&fa(o,h,l,u,c,d,_.x,_.y)&&pn(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;x&&x.z>=v;){if(x.x>=f&&x.x<=m&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&fa(o,h,l,u,c,d,x.x,x.y)&&pn(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;_&&_.z<=y;){if(_.x>=f&&_.x<=m&&_.y>=g&&_.y<=p&&_!==i&&_!==a&&fa(o,h,l,u,c,d,_.x,_.y)&&pn(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Xf(r,e){let t=r;do{let n=t.prev,i=t.next.next;!ks(n,i)&&op(n,t,t.next,i)&&Fa(n,i)&&Fa(i,n)&&(e.push(n.i,t.i,i.i),Oa(t),Oa(t.next),t=r=i),t=t.next}while(t!==r);return Yr(t)}function jf(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Kf(a,o)){let l=lp(a,o);return a=Yr(a,a.next),l=Yr(l,l.next),Ba(a,e,t,n,i,s,0),void Ba(l,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function qf(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Yf(r,e){let t=(function(i,s){let a=s,o=i.x,l=i.y,c,h=-1/0;if(ks(i,a))return a;do{if(ks(i,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let m=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(m<=o&&m>h&&(h=m,c=a.x<a.next.x?a:a.next,m===o))return c}a=a.next}while(a!==s);if(!c)return null;let u=c,d=c.x,f=c.y,g=1/0;a=c;do{if(o>=a.x&&a.x>=d&&o!==a.x&&ap(l<f?o:h,l,d,f,l<f?h:o,l,a.x,a.y)){let m=Math.abs(l-a.y)/(o-a.x);Fa(a,i)&&(m<g||m===g&&(a.x>c.x||a.x===c.x&&Zf(c,a)))&&(c=a,g=m)}a=a.next}while(a!==u);return c})(r,e);if(!t)return e;let n=lp(t,r);return Yr(n,n.next),Yr(t,t.next)}function Zf(r,e){return pn(r.prev,r,e.prev)<0&&pn(e.next,r,r.next)<0}function Yc(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Jf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function ap(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function fa(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&ap(r,e,t,n,i,s,a,o)}function Kf(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&op(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(Fa(r,e)&&Fa(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(pn(r.prev,r,e.prev)||pn(r,e.prev,e))||ks(r,e)&&pn(r.prev,r,r.next)>0&&pn(e.prev,e,e.next)>0)}function pn(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ks(r,e){return r.x===e.x&&r.y===e.y}function op(r,e,t,n){let i=Go(pn(r,e,t)),s=Go(pn(r,e,n)),a=Go(pn(t,n,r)),o=Go(pn(t,n,e));return i!==s&&a!==o||!(i!==0||!zo(r,t,e))||!(s!==0||!zo(r,n,e))||!(a!==0||!zo(t,r,n))||!(o!==0||!zo(t,e,n))}function zo(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Go(r){return r>0?1:r<0?-1:0}function Fa(r,e){return pn(r.prev,r,r.next)<0?pn(r,e,r.next)>=0&&pn(r,r.prev,e)>=0:pn(r,e,r.prev)<0||pn(r,r.next,e)<0}function lp(r,e){let t=Zc(r.i,r.x,r.y),n=Zc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function nd(r,e,t,n){let i=Zc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Oa(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Zc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Jc=class{static triangulate(e,t,n=2){return Vf(e,t,n)}},Oi=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];id(e),rd(n,e);let a=e.length;t.forEach(id);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,rd(n,t[l]);let o=Jc.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function id(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function rd(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Vt=class r extends pt{constructor(e=new Wt([new Ee(.5,.5),new Ee(-.5,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,v=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:$f,x,_,b,S,D,O=!1;v&&(x=v.getSpacedPoints(h),O=!0,d=!1,_=v.computeFrenetFrames(h,!1),b=new A,S=new A,D=new A),d||(p=0,f=0,g=0,m=0);let F=o.extractPoints(c),k=F.shape,I=F.holes;if(!Oi.isClockWise(k)){k=k.reverse();for(let X=0,E=I.length;X<E;X++){let N=I[X];Oi.isClockWise(N)&&(I[X]=N.reverse())}}function U(X){let E=10000000000000001e-36,N=X[0];for(let q=1;q<=X.length;q++){let W=q%X.length,_e=X[W],oe=_e.x-N.x,ce=_e.y-N.y,Pe=oe*oe+ce*ce,Ye=Math.max(Math.abs(_e.x),Math.abs(_e.y),Math.abs(N.x),Math.abs(N.y));Pe<=E*Ye*Ye?(X.splice(W,1),q--):N=_e}}U(k),I.forEach(U);let K=I.length,j=k;for(let X=0;X<K;X++){let E=I[X];k=k.concat(E)}function re(X,E,N){return E||console.error("THREE.ExtrudeGeometry: vec does not exist"),X.clone().addScaledVector(E,N)}let ge=k.length;function Q(X,E,N){let q,W,_e,oe=X.x-E.x,ce=X.y-E.y,Pe=N.x-X.x,Ye=N.y-X.y,Ue=oe*oe+ce*ce,tt=oe*Ye-ce*Pe;if(Math.abs(tt)>Number.EPSILON){let ct=Math.sqrt(Ue),yt=Math.sqrt(Pe*Pe+Ye*Ye),Pt=E.x-ce/ct,Et=E.y+oe/ct,Mt=((N.x-Ye/yt-Pt)*Ye-(N.y+Pe/yt-Et)*Pe)/(oe*Ye-ce*Pe);q=Pt+oe*Mt-X.x,W=Et+ce*Mt-X.y;let T=q*q+W*W;if(T<=2)return new Ee(q,W);_e=Math.sqrt(T/2)}else{let ct=!1;oe>Number.EPSILON?Pe>Number.EPSILON&&(ct=!0):oe<-Number.EPSILON?Pe<-Number.EPSILON&&(ct=!0):Math.sign(ce)===Math.sign(Ye)&&(ct=!0),ct?(q=-ce,W=oe,_e=Math.sqrt(Ue)):(q=oe,W=ce,_e=Math.sqrt(Ue/2))}return new Ee(q/_e,W/_e)}let de=[];for(let X=0,E=j.length,N=E-1,q=X+1;X<E;X++,N++,q++)N===E&&(N=0),q===E&&(q=0),de[X]=Q(j[X],j[N],j[q]);let Ie=[],ze,Ae,Ve=de.concat();for(let X=0,E=K;X<E;X++){let N=I[X];ze=[];for(let q=0,W=N.length,_e=W-1,oe=q+1;q<W;q++,_e++,oe++)_e===W&&(_e=0),oe===W&&(oe=0),ze[q]=Q(N[q],N[_e],N[oe]);Ie.push(ze),Ve=Ve.concat(ze)}if(p===0)Ae=Oi.triangulateShape(j,I);else{let X=[],E=[];for(let N=0;N<p;N++){let q=N/p,W=f*Math.cos(q*Math.PI/2),_e=g*Math.sin(q*Math.PI/2)+m;for(let oe=0,ce=j.length;oe<ce;oe++){let Pe=re(j[oe],de[oe],_e);J(Pe.x,Pe.y,-W),q===0&&X.push(Pe)}for(let oe=0,ce=K;oe<ce;oe++){let Pe=I[oe];ze=Ie[oe];let Ye=[];for(let Ue=0,tt=Pe.length;Ue<tt;Ue++){let ct=re(Pe[Ue],ze[Ue],_e);J(ct.x,ct.y,-W),q===0&&Ye.push(ct)}q===0&&E.push(Ye)}}Ae=Oi.triangulateShape(X,E)}let ie=Ae.length,Te=g+m;for(let X=0;X<ge;X++){let E=d?re(k[X],Ve[X],Te):k[X];O?(S.copy(_.normals[0]).multiplyScalar(E.x),b.copy(_.binormals[0]).multiplyScalar(E.y),D.copy(x[0]).add(S).add(b),J(D.x,D.y,D.z)):J(E.x,E.y,0)}for(let X=1;X<=h;X++)for(let E=0;E<ge;E++){let N=d?re(k[E],Ve[E],Te):k[E];O?(S.copy(_.normals[X]).multiplyScalar(N.x),b.copy(_.binormals[X]).multiplyScalar(N.y),D.copy(x[X]).add(S).add(b),J(D.x,D.y,D.z)):J(N.x,N.y,u/h*X)}for(let X=p-1;X>=0;X--){let E=X/p,N=f*Math.cos(E*Math.PI/2),q=g*Math.sin(E*Math.PI/2)+m;for(let W=0,_e=j.length;W<_e;W++){let oe=re(j[W],de[W],q);J(oe.x,oe.y,u+N)}for(let W=0,_e=I.length;W<_e;W++){let oe=I[W];ze=Ie[W];for(let ce=0,Pe=oe.length;ce<Pe;ce++){let Ye=re(oe[ce],ze[ce],q);O?J(Ye.x,Ye.y+x[h-1].y,x[h-1].x+N):J(Ye.x,Ye.y,u+N)}}}function we(X,E){let N=X.length;for(;--N>=0;){let q=N,W=N-1;W<0&&(W=X.length-1);for(let _e=0,oe=h+2*p;_e<oe;_e++){let ce=ge*_e,Pe=ge*(_e+1);R(E+q+ce,E+W+ce,E+W+Pe,E+q+Pe)}}}function J(X,E,N){l.push(X),l.push(E),l.push(N)}function De(X,E,N){P(X),P(E),P(N);let q=i.length/3,W=y.generateTopUV(n,i,q-3,q-2,q-1);Y(W[0]),Y(W[1]),Y(W[2])}function R(X,E,N,q){P(X),P(E),P(q),P(E),P(N),P(q);let W=i.length/3,_e=y.generateSideWallUV(n,i,W-6,W-3,W-2,W-1);Y(_e[0]),Y(_e[1]),Y(_e[3]),Y(_e[1]),Y(_e[2]),Y(_e[3])}function P(X){i.push(l[3*X+0]),i.push(l[3*X+1]),i.push(l[3*X+2])}function Y(X){s.push(X.x),s.push(X.y)}(function(){let X=i.length/3;if(d){let E=0,N=ge*E;for(let q=0;q<ie;q++){let W=Ae[q];De(W[2]+N,W[1]+N,W[0]+N)}E=h+2*p,N=ge*E;for(let q=0;q<ie;q++){let W=Ae[q];De(W[0]+N,W[1]+N,W[2]+N)}}else{for(let E=0;E<ie;E++){let N=Ae[E];De(N[2],N[1],N[0])}for(let E=0;E<ie;E++){let N=Ae[E];De(N[0]+ge*h,N[1]+ge*h,N[2]+ge*h)}}n.addGroup(X,i.length/3-X,0)})(),(function(){let X=i.length/3,E=0;we(j,E),E+=j.length;for(let N=0,q=I.length;N<q;N++){let W=I[N];we(W,E),E+=W.length}n.addGroup(X,i.length/3-X,1)})()}this.setAttribute("position",new Re(i,3)),this.setAttribute("uv",new Re(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ol[i.type]().fromJSON(i)),new r(n,e.options)}},$f={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*i],h=e[3*i+1];return[new Ee(s,a),new Ee(o,l),new Ee(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],f=e[3*i+1],g=e[3*i+2],m=e[3*s],p=e[3*s+1],v=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new Ee(a,1-l),new Ee(c,1-u),new Ee(d,1-g),new Ee(m,1-v)]:[new Ee(o,1-l),new Ee(h,1-u),new Ee(f,1-g),new Ee(p,1-v)]}},cl=class r extends Tr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ri=class r extends pt{constructor(e=[new Ee(0,-.5),new Ee(.5,0),new Ee(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Gt(i,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new A,d=new Ee,f=new A,g=new A,m=new A,p=0,v=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,f.x=1*v,f.y=-p,f.z=0*v,m.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(m.x,m.y,m.z);break;default:p=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,f.x=1*v,f.y=-p,f.z=0*v,g.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),l.push(f.x,f.y,f.z),m.copy(g)}for(let y=0;y<=t;y++){let x=n+y*h*i,_=Math.sin(x),b=Math.cos(x);for(let S=0;S<=e.length-1;S++){u.x=e[S].x*_,u.y=e[S].y,u.z=e[S].x*b,a.push(u.x,u.y,u.z),d.x=y/t,d.y=S/(e.length-1),o.push(d.x,d.y);let D=l[3*S+0]*_,O=l[3*S+1],F=l[3*S+0]*b;c.push(D,O,F)}}for(let y=0;y<t;y++)for(let x=0;x<e.length-1;x++){let _=x+y*e.length,b=_,S=_+e.length,D=_+e.length+1,O=_+1;s.push(b,S,O),s.push(D,O,S)}this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("uv",new Re(o,2)),this.setAttribute("normal",new Re(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Vs=class r extends Tr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Xt=class r extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],m=[],p=[];for(let v=0;v<h;v++){let y=v*d-a;for(let x=0;x<c;x++){let _=x*u-s;g.push(_,-y,0),m.push(0,0,1),p.push(x/o),p.push(1-v/l)}}for(let v=0;v<l;v++)for(let y=0;y<o;y++){let x=y+c*v,_=y+c*(v+1),b=y+1+c*(v+1),S=y+1+c*v;f.push(x,_,S),f.push(_,b,S)}this.setIndex(f),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},hl=class r extends pt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),f=new A,g=new Ee;for(let m=0;m<=i;m++){for(let p=0;p<=n;p++){let v=s+p/n*a;f.x=u*Math.cos(v),f.y=u*Math.sin(v),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let m=0;m<i;m++){let p=m*(n+1);for(let v=0;v<n;v++){let y=v+p,x=y,_=y+n+1,b=y+n+2,S=y+1;o.push(x,_,S),o.push(_,b,S)}}this.setIndex(o),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ar=class r extends pt{constructor(e=new Wt([new Ee(0,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,g=d.holes;Oi.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,v=g.length;p<v;p++){let y=g[p];Oi.isClockWise(y)===!0&&(g[p]=y.reverse())}let m=Oi.triangulateShape(f,g);for(let p=0,v=g.length;p<v;p++){let y=g[p];f=f.concat(y)}for(let p=0,v=f.length;p<v;p++){let y=f[p];i.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let p=0,v=m.length;p<v;p++){let y=m[p],x=y[0]+u,_=y[1]+u,b=y[2]+u;n.push(x,_,b),l+=3}}this.setIndex(n),this.setAttribute("position",new Re(i,3)),this.setAttribute("normal",new Re(s,3)),this.setAttribute("uv",new Re(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Ot=class r extends pt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new A,d=new A,f=[],g=[],m=[],p=[];for(let v=0;v<=n;v++){let y=[],x=v/n,_=0;v===0&&a===0?_=.5/t:v===n&&l===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){let S=b/t;u.x=-e*Math.cos(i+S*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+S*s)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),p.push(S+_,1-x),y.push(c++)}h.push(y)}for(let v=0;v<n;v++)for(let y=0;y<t;y++){let x=h[v][y+1],_=h[v][y],b=h[v+1][y],S=h[v+1][y+1];(v!==0||a>0)&&f.push(x,_,S),(v!==n-1||l<Math.PI)&&f.push(_,b,S)}this.setIndex(f),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},ul=class r extends Tr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ut=class r extends pt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new A,u=new A,d=new A;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let m=g/i*s,p=f/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(m),u.y=(e+t*Math.cos(p))*Math.sin(m),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(m),h.y=e*Math.sin(m),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let m=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,v=(i+1)*(f-1)+g,y=(i+1)*f+g;a.push(m,p,y),a.push(p,v,y)}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},dl=class r extends pt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new A,d=new A,f=new A,g=new A,m=new A,p=new A,v=new A;for(let x=0;x<=n;++x){let _=x/n*s*Math.PI*2;y(_,s,a,e,f),y(_+.01,s,a,e,g),p.subVectors(g,f),v.addVectors(g,f),m.crossVectors(p,v),v.crossVectors(m,p),m.normalize(),v.normalize();for(let b=0;b<=i;++b){let S=b/i*Math.PI*2,D=-t*Math.cos(S),O=t*Math.sin(S);u.x=f.x+(D*v.x+O*m.x),u.y=f.y+(D*v.y+O*m.y),u.z=f.z+(D*v.z+O*m.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(x/n),h.push(b/i)}}for(let x=1;x<=n;x++)for(let _=1;_<=i;_++){let b=(i+1)*(x-1)+(_-1),S=(i+1)*x+(_-1),D=(i+1)*x+_,O=(i+1)*(x-1)+_;o.push(b,S,O),o.push(S,D,O)}function y(x,_,b,S,D){let O=Math.cos(x),F=Math.sin(x),k=b/_*x,I=Math.cos(k);D.x=S*(2+I)*.5*O,D.y=S*(2+I)*F*.5,D.z=S*Math.sin(k)*.5}this.setIndex(o),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Ct=class r extends pt{constructor(e=new Ua(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new A,l=new A,c=new Ee,h=new A,u=[],d=[],f=[],g=[];function m(p){h=e.getPointAt(p/t,h);let v=a.normals[p],y=a.binormals[p];for(let x=0;x<=i;x++){let _=x/i*Math.PI*2,b=Math.sin(_),S=-Math.cos(_);l.x=S*v.x+b*y.x,l.y=S*v.y+b*y.y,l.z=S*v.z+b*y.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let p=0;p<t;p++)m(p);m(s===!1?t:0),(function(){for(let p=0;p<=t;p++)for(let v=0;v<=i;v++)c.x=p/t,c.y=v/i,f.push(c.x,c.y)})(),(function(){for(let p=1;p<=t;p++)for(let v=1;v<=i;v++){let y=(i+1)*(p-1)+(v-1),x=(i+1)*p+(v-1),_=(i+1)*p+v,b=(i+1)*(p-1)+v;g.push(y,x,b),g.push(x,_,b)}})()})(),this.setIndex(g),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ol[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},pl=class extends pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new A,s=new A;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start;for(let f=d,g=d+u.count;f<g;f+=3)for(let m=0;m<3;m++){let p=o.getX(f+m),v=o.getX(f+(m+1)%3);i.fromBufferAttribute(a,p),s.fromBufferAttribute(a,v),sd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),sd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Re(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function sd(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var Mg=Object.freeze({__proto__:null,BoxGeometry:nt,CapsuleGeometry:zs,CircleGeometry:Xn,ConeGeometry:qr,CylinderGeometry:$e,DodecahedronGeometry:nl,EdgesGeometry:il,ExtrudeGeometry:Vt,IcosahedronGeometry:cl,LatheGeometry:Ri,OctahedronGeometry:Vs,PlaneGeometry:Xt,PolyhedronGeometry:Tr,RingGeometry:hl,ShapeGeometry:ar,SphereGeometry:Ot,TetrahedronGeometry:ul,TorusGeometry:Ut,TorusKnotGeometry:dl,TubeGeometry:Ct,WireframeGeometry:pl}),Zr=class extends Gi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new dt(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var wt=class extends Gi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Sn=class extends wt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Sr=class extends Gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},fl=class extends Gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ko(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Qf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Jr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ml=class extends Jr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hc,endingEnd:Hc}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Wc:s=e,o=2*t-n;break;case Xc:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Wc:a=e,l=2*n-t;break;case Xc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),m=g*g,p=m*g,v=-d*p+2*d*m-d*g,y=(1+d)*p+(-1.5-2*d)*m+(-.5+d)*g+1,x=(-1-f)*p+(1.5+f)*m+.5*g,_=f*p-f*m;for(let b=0;b!==o;++b)s[b]=v*a[h+b]+y*a[c+b]+x*a[l+b]+_*a[u+b];return s}},gl=class extends Jr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},vl=class extends Jr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},hi=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ko(t,this.TimeBufferType),this.values=ko(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ko(e.times,Array),values:ko(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new gl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ml(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case va:t=this.InterpolantFactoryMethodDiscrete;break;case jo:t=this.InterpolantFactoryMethodLinear;break;case Vo:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return va;case this.InterpolantFactoryMethodLinear:return jo;case this.InterpolantFactoryMethodSmooth:return Vo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Qf(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Vo,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,u=h-n,d=h+n;for(let f=0;f!==n;++f){let g=t[h+f];if(g!==t[u+f]||g!==t[d+f]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};hi.prototype.ValueTypeName="",hi.prototype.TimeBufferType=Float32Array,hi.prototype.ValueBufferType=Float32Array,hi.prototype.DefaultInterpolation=jo;var xr=class extends hi{constructor(e,t,n){super(e,t,n)}};xr.prototype.ValueTypeName="bool",xr.prototype.ValueBufferType=Array,xr.prototype.DefaultInterpolation=va,xr.prototype.InterpolantFactoryMethodLinear=void 0,xr.prototype.InterpolantFactoryMethodSmooth=void 0;var yl=class extends hi{constructor(e,t,n,i){super(e,t,n,i)}};yl.prototype.ValueTypeName="color";var xl=class extends hi{constructor(e,t,n,i){super(e,t,n,i)}};xl.prototype.ValueTypeName="number";var _l=class extends Jr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Hn.slerpFlat(s,0,a,c-o,a,c,l);return s}},za=class extends hi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new _l(this.times,this.values,this.getValueSize(),e)}};za.prototype.ValueTypeName="quaternion",za.prototype.InterpolantFactoryMethodSmooth=void 0;var _r=class extends hi{constructor(e,t,n){super(e,t,n)}};_r.prototype.ValueTypeName="string",_r.prototype.ValueBufferType=Array,_r.prototype.DefaultInterpolation=va,_r.prototype.InterpolantFactoryMethodLinear=void 0,_r.prototype.InterpolantFactoryMethodSmooth=void 0;var Ml=class extends hi{constructor(e,t,n,i){super(e,t,n,i)}};Ml.prototype.ValueTypeName="vector";var Wo={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},bl=class{constructor(e,t,n){let i=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,l),o===l&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},cp=new bl,Hs=class{constructor(e){this.manager=e!==void 0?e:cp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Hs.DEFAULT_MATERIAL_NAME="__DEFAULT";var Cs=new WeakMap,Tl=class extends Hs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Wo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Cs.get(a);u===void 0&&(u=[],Cs.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Is("img");function l(){h(),t&&t(this);let u=Cs.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Cs.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),Wo.remove(`image:${e}`);let d=Cs.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}Cs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Wo.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Ga=class extends Hs{constructor(e){super(e)}load(e,t,n,i){let s=new Vn,a=new Tl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Kr=class extends gn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Kn=class extends Kr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new dt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},zc=new vt,ad=new A,od=new A,ka=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=Vi,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new br,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ad.setFromMatrixPosition(e.matrixWorld),t.position.copy(ad),od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(od),t.updateMatrixWorld(),zc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Kc=class extends ka{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*_a*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Va=class extends Kr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gn.DEFAULT_UP),this.updateMatrix(),this.target=new gn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Kc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ld=new vt,pa=new A,Gc=new A,$c=class extends ka{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Kt(2,1,1,1),new Kt(0,1,1,1),new Kt(3,1,1,1),new Kt(1,1,1,1),new Kt(3,0,1,1),new Kt(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),pa.setFromMatrixPosition(e.matrixWorld),n.position.copy(pa),Gc.copy(n.position),Gc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Gc),n.updateMatrixWorld(),i.makeTranslation(-pa.x,-pa.y,-pa.z),ld.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ld,n.coordinateSystem,n.reversedDepth)}},Ha=class extends Kr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new $c}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},$r=class extends Ns{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Qc=class extends ka{constructor(){super(new $r(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},qn=class extends Kr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gn.DEFAULT_UP),this.updateMatrix(),this.target=new gn,this.shadow=new Qc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var bg=new vt,Tg=new vt,Sg=new vt;var Sl=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var wg=new A,Eg=new Hn,Ag=new A,Cg=new A,Rg=new A;var Pg=new A,Ig=new Hn,Lg=new A,Dg=new A;var jh="\\[\\]\\.:\\/",em=new RegExp("["+jh+"]","g"),kc="[^"+jh+"]",tm="[^"+jh.replace("\\.","")+"]",nm=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",kc)+/(WCOD+)?/.source.replace("WCOD",tm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kc)+"$"),im=["material","materials","bones","map"],hn=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(em,"")}static parseTrackName(e){let t=nm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);im.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};hn.Composite=class{constructor(r,e,t){let n=t||hn.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},hn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},hn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},hn.prototype.GetterByBindingType=[hn.prototype._getValue_direct,hn.prototype._getValue_array,hn.prototype._getValue_arrayElement,hn.prototype._getValue_toArray],hn.prototype.SetterByBindingTypeAndVersioning=[[hn.prototype._setValue_direct,hn.prototype._setValue_direct_setNeedsUpdate,hn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[hn.prototype._setValue_array,hn.prototype._setValue_array_setNeedsUpdate,hn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[hn.prototype._setValue_arrayElement,hn.prototype._setValue_arrayElement_setNeedsUpdate,hn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[hn.prototype._setValue_fromArray,hn.prototype._setValue_fromArray_setNeedsUpdate,hn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ug=new Float32Array(1);var cd=new vt,Wa=class{constructor(e,t,n=0,i=1/0){this.ray=new Mr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Us,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return cd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cd),this}intersectObject(e,t=!0,n=[]){return eh(e,this,n,t),n.sort(hd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)eh(e[i],this,n,t);return n.sort(hd),n}};function hd(r,e){return r.distance-e.distance}function eh(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)eh(s[a],e,t,!0)}}var Ng=new Ee;var Bg=new A,Fg=new A,Og=new A,zg=new A,Gg=new A,kg=new A,Vg=new A;var Hg=new A;var Wg=new A,Xg=new vt,jg=new vt;var qg=new A,Yg=new dt,Zg=new dt;var Jg=new A,Kg=new A,$g=new A;var Qg=new A,e1=new Ns;var t1=new Pn;var n1=new A;function qh(r,e,t,n){let i=(function(s){switch(s){case Vi:case oh:return{byteLength:1,components:1};case qs:case lh:case Ar:return{byteLength:2,components:1};case Bl:case Fl:return{byteLength:2,components:4};case es:case Nl:case _i:return{byteLength:4,components:1};case ch:case hh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Ol:case zl:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Mi:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Dp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function sm(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(r.bindBuffer(o,s),c.length===0)r.bufferSubData(o,0,l);else{c.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<c.length;u++){let d=c[h],f=c[u];f.start<=d.start+d.count+1?d.count=Math.max(d.count,f.start+f.count-d.start):(++h,c[h]=f)}c.length=h+1;for(let u=0,d=c.length;u<d;u++){let f=c[u];r.bufferSubData(o,f.start*l.BYTES_PER_ELEMENT,l,f.start,f.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var zt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ke={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Hi={basic:{uniforms:Yn([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Yn([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,Ke.lights,{emissive:{value:new dt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Yn([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,Ke.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Yn([Ke.common,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.roughnessmap,Ke.metalnessmap,Ke.fog,Ke.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Yn([Ke.common,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.gradientmap,Ke.fog,Ke.lights,{emissive:{value:new dt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Yn([Ke.common,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Yn([Ke.points,Ke.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Yn([Ke.common,Ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Yn([Ke.common,Ke.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Yn([Ke.common,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Yn([Ke.sprite,Ke.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Yn([Ke.common,Ke.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Yn([Ke.lights,Ke.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};Hi.physical={uniforms:Yn([Hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var Wl={r:0,b:0,g:0},rs=new Ci,am=new vt;function om(r,e,t,n,i,s,a){let o=new dt(0),l,c,h=s===!0?0:1,u=null,d=0,f=null;function g(p){let v=p.isScene===!0?p.background:null;return v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v}function m(p,v){p.getRGB(Wl,Wh(r)),n.buffers.color.setClear(Wl.r,Wl.g,Wl.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(p,v=1){o.set(p),h=v,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(p){h=p,m(o,h)},render:function(p){let v=!1,y=g(p);y===null?m(o,h):y&&y.isColor&&(m(y,1),v=!0);let x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(p,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===qa)?(c===void 0&&(c=new qe(new nt(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:is(Hi.backgroundCube.uniforms),vertexShader:Hi.backgroundCube.vertexShader,fragmentShader:Hi.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,_,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),rs.copy(v.backgroundRotation),rs.x*=-1,rs.y*=-1,rs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(rs.y*=-1,rs.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(am.makeRotationFromEuler(rs)),c.material.toneMapped=Jt.getTransfer(y.colorSpace)!==nn,u===y&&d===y.version&&f===r.toneMapping||(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new qe(new Xt(2,2),new Wn({name:"BackgroundMaterial",uniforms:is(Hi.background.uniforms),vertexShader:Hi.background.vertexShader,fragmentShader:Hi.background.fragmentShader,side:Ws,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(y.colorSpace)!==nn,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),u===y&&d===y.version&&f===r.toneMapping||(l.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function lm(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null),s=i,a=!1;function o(v){return r.bindVertexArray(v)}function l(v){return r.deleteVertexArray(v)}function c(v){let y=[],x=[],_=[];for(let b=0;b<t;b++)y[b]=0,x[b]=0,_[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:x,attributeDivisors:_,object:v,attributes:{},index:null}}function h(){let v=s.newAttributes;for(let y=0,x=v.length;y<x;y++)v[y]=0}function u(v){d(v,0)}function d(v,y){let x=s.newAttributes,_=s.enabledAttributes,b=s.attributeDivisors;x[v]=1,_[v]===0&&(r.enableVertexAttribArray(v),_[v]=1),b[v]!==y&&(r.vertexAttribDivisor(v,y),b[v]=y)}function f(){let v=s.newAttributes,y=s.enabledAttributes;for(let x=0,_=y.length;x<_;x++)y[x]!==v[x]&&(r.disableVertexAttribArray(x),y[x]=0)}function g(v,y,x,_,b,S,D){D===!0?r.vertexAttribIPointer(v,y,x,b,S):r.vertexAttribPointer(v,y,x,_,b,S)}function m(){p(),a=!0,s!==i&&(s=i,o(s.object))}function p(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(v,y,x,_,b){let S=!1,D=(function(O,F,k){let I=k.wireframe===!0,U=n[O.id];U===void 0&&(U={},n[O.id]=U);let K=U[F.id];K===void 0&&(K={},U[F.id]=K);let j=K[I];return j===void 0&&(j=c(r.createVertexArray()),K[I]=j),j})(_,x,y);s!==D&&(s=D,o(s.object)),S=(function(O,F,k,I){let U=s.attributes,K=F.attributes,j=0,re=k.getAttributes();for(let ge in re)if(re[ge].location>=0){let Q=U[ge],de=K[ge];if(de===void 0&&(ge==="instanceMatrix"&&O.instanceMatrix&&(de=O.instanceMatrix),ge==="instanceColor"&&O.instanceColor&&(de=O.instanceColor)),Q===void 0||Q.attribute!==de||de&&Q.data!==de.data)return!0;j++}return s.attributesNum!==j||s.index!==I})(v,_,x,b),S&&(function(O,F,k,I){let U={},K=F.attributes,j=0,re=k.getAttributes();for(let ge in re)if(re[ge].location>=0){let Q=K[ge];Q===void 0&&(ge==="instanceMatrix"&&O.instanceMatrix&&(Q=O.instanceMatrix),ge==="instanceColor"&&O.instanceColor&&(Q=O.instanceColor));let de={};de.attribute=Q,Q&&Q.data&&(de.data=Q.data),U[ge]=de,j++}s.attributes=U,s.attributesNum=j,s.index=I})(v,_,x,b),b!==null&&e.update(b,r.ELEMENT_ARRAY_BUFFER),(S||a)&&(a=!1,(function(O,F,k,I){h();let U=I.attributes,K=k.getAttributes(),j=F.defaultAttributeValues;for(let re in K){let ge=K[re];if(ge.location>=0){let Q=U[re];if(Q===void 0&&(re==="instanceMatrix"&&O.instanceMatrix&&(Q=O.instanceMatrix),re==="instanceColor"&&O.instanceColor&&(Q=O.instanceColor)),Q!==void 0){let de=Q.normalized,Ie=Q.itemSize,ze=e.get(Q);if(ze===void 0)continue;let Ae=ze.buffer,Ve=ze.type,ie=ze.bytesPerElement,Te=Ve===r.INT||Ve===r.UNSIGNED_INT||Q.gpuType===Nl;if(Q.isInterleavedBufferAttribute){let we=Q.data,J=we.stride,De=Q.offset;if(we.isInstancedInterleavedBuffer){for(let R=0;R<ge.locationSize;R++)d(ge.location+R,we.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=we.meshPerAttribute*we.count)}else for(let R=0;R<ge.locationSize;R++)u(ge.location+R);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let R=0;R<ge.locationSize;R++)g(ge.location+R,Ie/ge.locationSize,Ve,de,J*ie,(De+Ie/ge.locationSize*R)*ie,Te)}else{if(Q.isInstancedBufferAttribute){for(let we=0;we<ge.locationSize;we++)d(ge.location+we,Q.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let we=0;we<ge.locationSize;we++)u(ge.location+we);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let we=0;we<ge.locationSize;we++)g(ge.location+we,Ie/ge.locationSize,Ve,de,Ie*ie,Ie/ge.locationSize*we*ie,Te)}}else if(j!==void 0){let de=j[re];if(de!==void 0)switch(de.length){case 2:r.vertexAttrib2fv(ge.location,de);break;case 3:r.vertexAttrib3fv(ge.location,de);break;case 4:r.vertexAttrib4fv(ge.location,de);break;default:r.vertexAttrib1fv(ge.location,de)}}}}f()})(v,y,x,_),b!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(b).buffer))},reset:m,resetDefaultState:p,dispose:function(){m();for(let v in n){let y=n[v];for(let x in y){let _=y[x];for(let b in _)l(_[b].object),delete _[b];delete y[x]}delete n[v]}},releaseStatesOfGeometry:function(v){if(n[v.id]===void 0)return;let y=n[v.id];for(let x in y){let _=y[x];for(let b in _)l(_[b].object),delete _[b];delete y[x]}delete n[v.id]},releaseStatesOfProgram:function(v){for(let y in n){let x=n[y];if(x[v.id]===void 0)continue;let _=x[v.id];for(let b in _)l(_[b].object),delete _[b];delete x[v.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:f}}function cm(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)i(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function hm(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Mi||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let f=d===Ar&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Vi&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==_i&&!f)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function um(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Fi,o=new Lt,l={value:null,needsUpdate:!1};function c(h,u,d,f){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=l.value,f!==!0||m===null){let p=d+4*g,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==g;++y,x+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,d){let f=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||f===null||f.length===0||s&&!m)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let v=s?0:n,y=4*v,x=p.clippingState||null;l.value=x,x=c(f,u,y,d);for(let _=0;_!==y;++_)x[_]=t[_];p.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}}}function dm(r){let e=new WeakMap;function t(i,s){return s===Ll?i.mapping=js:s===Dl&&(i.mapping=Qr),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Ll||s===Dl){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new Ko(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var hp=[.125,.215,.35,.446,.526,.582],Ka=20,Yh=new $r,up=new dt,Zh=null,Jh=0,Kh=0,$h=!1,as=(1+Math.sqrt(5))/2,Js=1/as,dp=[new A(-as,Js,0),new A(as,Js,0),new A(-Js,0,as),new A(Js,0,as),new A(0,as,-Js),new A(0,as,Js),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],pm=new A,Cr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=pm}=s;Zh=this._renderer.getRenderTarget(),Jh=this._renderer.getActiveCubeFace(),Kh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zh,Jh,Kh),this._renderer.xr.enabled=$h,e.scissorTest=!1,Xl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===Qr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zh=this._renderer.getRenderTarget(),Jh=this._renderer.getActiveCubeFace(),Kh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:Ar,format:Mi,colorSpace:Wr,depthBuffer:!1},i=pp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pp(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,u=a-4+1+hp.length;for(let d=0;d<u;d++){let f=Math.pow(2,h);l.push(f);let g=1/f;d>a-4?g=hp[d-a+4-1]:d===0&&(g=0),c.push(g);let m=1/(f-2),p=-m,v=1+m,y=[p,p,v,p,v,v,p,p,v,v,p,v],x=6,_=6,b=3,S=2,D=1,O=new Float32Array(b*_*x),F=new Float32Array(S*_*x),k=new Float32Array(D*_*x);for(let U=0;U<x;U++){let K=U%3*2/3-1,j=U>2?0:-1,re=[K,j,0,K+2/3,j,0,K+2/3,j+1,0,K,j,0,K+2/3,j+1,0,K,j+1,0];O.set(re,b*_*U),F.set(y,S*_*U);let ge=[U,U,U,U,U,U];k.set(ge,D*_*U)}let I=new pt;I.setAttribute("position",new vn(O,b)),I.setAttribute("uv",new vn(F,S)),I.setAttribute("faceIndex",new vn(k,D)),o.push(I),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(Ka),h=new A(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Ka,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:lu(),fragmentShader:`

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
		`,blending:Er,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new qe(this._lodPlanes[0],e);this._renderer.compile(t,Yh)}_sceneToCubeUV(e,t,n,i,s){let a=new sn(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(up),c.toneMapping=or,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(i),c.clearDepth(),c.setRenderTarget(null));let d=new In({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1}),f=new qe(new nt,d),g=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,g=!0):(d.color.copy(up),g=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,o[p],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[p],s.y,s.z)):v===1?(a.up.set(0,0,o[p]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[p],s.z)):(a.up.set(0,o[p],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[p]));let y=this._cubeSize;Xl(i,v*y,p>2?y:0,y,y),c.setRenderTarget(i),g&&c.render(f,a),c.render(e,a)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===js||e.mapping===Qr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new qe(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Xl(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Yh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=dp[(i-s-1)%dp.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new qe(this._lodPlanes[i],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,g=s/f,m=isFinite(s)?1+Math.floor(3*g):Ka;m>Ka&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let p=[],v=0;for(let _=0;_<Ka;++_){let b=_/g,S=Math.exp(-b*b/2);p.push(S),_===0?v+=S:_<m&&(v+=2*S)}for(let _=0;_<p.length;_++)p[_]=p[_]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=f,u.mipInt.value=y-n;let x=this._sizeLods[i];Xl(t,3*x*(i>y-4?i-y+4:0),4*(this._cubeSize-x),3*x,2*x),l.setRenderTarget(t),l.render(h,Yh)}};function pp(r,e,t){let n=new xi(r,e,t);return n.texture.mapping=qa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function fp(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lu(),fragmentShader:`

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
		`,blending:Er,depthTest:!1,depthWrite:!1})}function mp(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function lu(){return`

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
	`}function fm(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Ll||s===Dl,o=s===js||s===Qr;if(a||o){let l=e.get(i),c=l!==void 0?l.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==c)return t===null&&(t=new Cr(r)),l=a?t.fromEquirectangular(i,l):t.fromCubemap(i,l),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),l.texture;if(l!==void 0)return l.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,f=6;for(let g=0;g<f;g++)u[g]!==void 0&&d++;return d===f})(h)?(t===null&&(t=new Cr(r)),l=a?t.fromEquirectangular(i):t.fromCubemap(i),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),i.addEventListener("dispose",n),l.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function mm(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Ls("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function gm(r,e,t,n){let i={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",a),delete i[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,d=0;if(h!==null){let m=h.array;d=h.version;for(let p=0,v=m.length;p<v;p+=3){let y=m[p+0],x=m[p+1],_=m[p+2];c.push(y,x,x,_,_,y)}}else{if(u===void 0)return;{let m=u.array;d=u.version;for(let p=0,v=m.length/3-1;p<v;p+=3){let y=p+0,x=p+1,_=p+2;c.push(y,x,x,_,_,y)}}}let f=new(Hh(c)?ba:Xr)(c,1);f.version=d;let g=s.get(l);g&&e.remove(g),s.set(l,f)}return{get:function(l,c){return i[c.id]===!0||(c.addEventListener("dispose",a),i[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function vm(r,e,t){let n,i,s;function a(o,l,c){c!==0&&(r.drawElementsInstanced(n,l,i,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,l){r.drawElements(n,l,i,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,i,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,l[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,i,o,0,h,0,c);let d=0;for(let f=0;f<c;f++)d+=l[f]*h[f];t.update(d,n,1)}}}function ym(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function xm(r,e,t){let n=new WeakMap,i=new Kt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let O=function(){S.dispose(),n.delete(a),a.removeEventListener("dispose",O)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;d===!0&&(y=1),f===!0&&(y=2),g===!0&&(y=3);let x=a.attributes.position.count*y,_=1;x>e.maxTextureSize&&(_=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let b=new Float32Array(x*_*4*h),S=new Ma(b,x,_,h);S.type=_i,S.needsUpdate=!0;let D=4*y;for(let F=0;F<h;F++){let k=m[F],I=p[F],U=v[F],K=x*_*4*F;for(let j=0;j<k.count;j++){let re=j*D;d===!0&&(i.fromBufferAttribute(k,j),b[K+re+0]=i.x,b[K+re+1]=i.y,b[K+re+2]=i.z,b[K+re+3]=0),f===!0&&(i.fromBufferAttribute(I,j),b[K+re+4]=i.x,b[K+re+5]=i.y,b[K+re+6]=i.z,b[K+re+7]=0),g===!0&&(i.fromBufferAttribute(U,j),b[K+re+8]=i.x,b[K+re+9]=i.y,b[K+re+10]=i.z,b[K+re+11]=U.itemSize===4?i.w:1)}}u={count:h,texture:S,size:new Ee(x,_)},n.set(a,u),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let g=0;g<l.length;g++)d+=l[g];let f=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",f),o.getUniforms().setValue(r,"morphTargetInfluences",l)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function _m(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(i.get(c)!==o&&(e.update(c),i.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return c},dispose:function(){i=new WeakMap}}}var Up=new Vn,gp=new Ra(1,1),Np=new Ma,Bp=new Zo,Fp=new Ta,vp=[],yp=[],xp=new Float32Array(16),_p=new Float32Array(9),Mp=new Float32Array(4);function $s(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=vp[i];if(s===void 0&&(s=new Float32Array(i),vp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Ln(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Dn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ql(r,e){let t=yp[e];t===void 0&&(t=new Int32Array(e),yp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Mm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function bm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ln(t,e))return;r.uniform2fv(this.addr,e),Dn(t,e)}}function Tm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ln(t,e))return;r.uniform3fv(this.addr,e),Dn(t,e)}}function Sm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ln(t,e))return;r.uniform4fv(this.addr,e),Dn(t,e)}}function wm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ln(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Dn(t,e)}else{if(Ln(t,n))return;Mp.set(n),r.uniformMatrix2fv(this.addr,!1,Mp),Dn(t,n)}}function Em(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ln(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Dn(t,e)}else{if(Ln(t,n))return;_p.set(n),r.uniformMatrix3fv(this.addr,!1,_p),Dn(t,n)}}function Am(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ln(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Dn(t,e)}else{if(Ln(t,n))return;xp.set(n),r.uniformMatrix4fv(this.addr,!1,xp),Dn(t,n)}}function Cm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Rm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ln(t,e))return;r.uniform2iv(this.addr,e),Dn(t,e)}}function Pm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ln(t,e))return;r.uniform3iv(this.addr,e),Dn(t,e)}}function Im(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ln(t,e))return;r.uniform4iv(this.addr,e),Dn(t,e)}}function Lm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Dm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ln(t,e))return;r.uniform2uiv(this.addr,e),Dn(t,e)}}function Um(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ln(t,e))return;r.uniform3uiv(this.addr,e),Dn(t,e)}}function Nm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ln(t,e))return;r.uniform4uiv(this.addr,e),Dn(t,e)}}function Bm(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(gp.compareFunction=kh,s=gp):s=Up,t.setTexture2D(e||s,i)}function Fm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Bp,i)}function Om(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Fp,i)}function zm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Np,i)}function Gm(r,e){r.uniform1fv(this.addr,e)}function km(r,e){let t=$s(e,this.size,2);r.uniform2fv(this.addr,t)}function Vm(r,e){let t=$s(e,this.size,3);r.uniform3fv(this.addr,t)}function Hm(r,e){let t=$s(e,this.size,4);r.uniform4fv(this.addr,t)}function Wm(r,e){let t=$s(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Xm(r,e){let t=$s(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function jm(r,e){let t=$s(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function qm(r,e){r.uniform1iv(this.addr,e)}function Ym(r,e){r.uniform2iv(this.addr,e)}function Zm(r,e){r.uniform3iv(this.addr,e)}function Jm(r,e){r.uniform4iv(this.addr,e)}function Km(r,e){r.uniform1uiv(this.addr,e)}function $m(r,e){r.uniform2uiv(this.addr,e)}function Qm(r,e){r.uniform3uiv(this.addr,e)}function e0(r,e){r.uniform4uiv(this.addr,e)}function t0(r,e,t){let n=this.cache,i=e.length,s=ql(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Up,s[a])}function n0(r,e,t){let n=this.cache,i=e.length,s=ql(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Bp,s[a])}function i0(r,e,t){let n=this.cache,i=e.length,s=ql(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Fp,s[a])}function r0(r,e,t){let n=this.cache,i=e.length,s=ql(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Np,s[a])}var eu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Mm;case 35664:return bm;case 35665:return Tm;case 35666:return Sm;case 35674:return wm;case 35675:return Em;case 35676:return Am;case 5124:case 35670:return Cm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Im;case 5125:return Lm;case 36294:return Dm;case 36295:return Um;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return zm}})(t.type)}},tu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Gm;case 35664:return km;case 35665:return Vm;case 35666:return Hm;case 35674:return Wm;case 35675:return Xm;case 35676:return jm;case 5124:case 35670:return qm;case 35667:case 35671:return Ym;case 35668:case 35672:return Zm;case 35669:case 35673:return Jm;case 5125:return Km;case 36294:return $m;case 36295:return Qm;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return r0}})(t.type)}},nu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Qh=/(\w+)(\])?(\[|\.)?/g;function bp(r,e){r.seq.push(e),r.map[e.id]=e}function s0(r,e,t){let n=r.name,i=n.length;for(Qh.lastIndex=0;;){let s=Qh.exec(n),a=Qh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===i){bp(t,c===void 0?new eu(o,r,e):new tu(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new nu(o),bp(t,h)),t=h}}}var Ks=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);s0(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Tp(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var a0=0,Sp=new Lt;function wp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),d=Math.min(l+6,c.length);for(let f=u;f<d;f++){let g=f+1;h.push(`${g===l?">":" "} ${g}: ${c[f]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function o0(r,e){let t=(function(n){Jt._getMatrix(Sp,Jt.workingColorSpace,n);let i=`mat3( ${Sp.elements.map(s=>s.toFixed(4))} )`;switch(Jt.getTransfer(n)){case ya:return[i,"LinearTransferOETF"];case nn:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function l0(r,e){let t;switch(e){case Bd:t="Linear";break;case Fd:t="Reinhard";break;case Od:t="Cineon";break;case ri:t="ACESFilmic";break;case Gd:t="AgX";break;case kd:t="Neutral";break;case zd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var jl=new A;function c0(){return Jt.getLuminanceCoefficients(jl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${jl.x.toFixed(4)}, ${jl.y.toFixed(4)}, ${jl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $a(r){return r!==""}function Ep(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ap(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var h0=/^[ \t]*#include +<([\w\d./]+)>/gm;function iu(r){return r.replace(h0,d0)}var u0=new Map;function d0(r,e){let t=zt[e];if(t===void 0){let n=u0.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return iu(t)}var p0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cp(r){return r.replace(p0,f0)}function f0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Rp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function m0(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(I){let U="SHADOWMAP_TYPE_BASIC";return I.shadowMapType===nh?U="SHADOWMAP_TYPE_PCF":I.shadowMapType===wr?U="SHADOWMAP_TYPE_PCF_SOFT":I.shadowMapType===ki&&(U="SHADOWMAP_TYPE_VSM"),U})(t),c=(function(I){let U="ENVMAP_TYPE_CUBE";if(I.envMap)switch(I.envMapMode){case js:case Qr:U="ENVMAP_TYPE_CUBE";break;case qa:U="ENVMAP_TYPE_CUBE_UV"}return U})(t),h=(function(I){let U="ENVMAP_MODE_REFLECTION";return I.envMap&&I.envMapMode===Qr&&(U="ENVMAP_MODE_REFRACTION"),U})(t),u=(function(I){let U="ENVMAP_BLENDING_NONE";if(I.envMap)switch(I.combine){case Dd:U="ENVMAP_BLENDING_MULTIPLY";break;case Ud:U="ENVMAP_BLENDING_MIX";break;case Nd:U="ENVMAP_BLENDING_ADD"}return U})(t),d=(function(I){let U=I.envMapCubeUVHeight;if(U===null)return null;let K=Math.log2(U)-2,j=1/U;return{texelWidth:1/(3*Math.max(Math.pow(2,K),112)),texelHeight:j,maxMip:K}})(t),f=(function(I){return[I.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",I.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($a).join(`
`)})(t),g=(function(I){let U=[];for(let K in I){let j=I[K];j!==!1&&U.push("#define "+K+" "+j)}return U.join(`
`)})(s),m=i.createProgram(),p,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($a).join(`
`),p.length>0&&(p+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($a).join(`
`),v.length>0&&(v+=`
`)):(p=[Rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($a).join(`
`),v=[Rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==or?"#define TONE_MAPPING":"",t.toneMapping!==or?zt.tonemapping_pars_fragment:"",t.toneMapping!==or?l0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,o0("linearToOutputTexel",t.outputColorSpace),c0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($a).join(`
`)),a=iu(a),a=Ep(a,t),a=Ap(a,t),o=iu(o),o=Ep(o,t),o=Ap(o,t),a=Cp(a),o=Cp(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["#define varying in",t.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let x=y+p+a,_=y+v+o,b=Tp(i,i.VERTEX_SHADER,x),S=Tp(i,i.FRAGMENT_SHADER,_);function D(I){if(r.debug.checkShaderErrors){let U=i.getProgramInfoLog(m)||"",K=i.getShaderInfoLog(b)||"",j=i.getShaderInfoLog(S)||"",re=U.trim(),ge=K.trim(),Q=j.trim(),de=!0,Ie=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(de=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,b,S);else{let ze=wp(i,b,"vertex"),Ae=wp(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+re+`
`+ze+`
`+Ae)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):ge!==""&&Q!==""||(Ie=!1);Ie&&(I.diagnostics={runnable:de,programLog:re,vertexShader:{log:ge,prefix:p},fragmentShader:{log:Q,prefix:v}})}i.deleteShader(b),i.deleteShader(S),O=new Ks(i,m),F=(function(U,K){let j={},re=U.getProgramParameter(K,U.ACTIVE_ATTRIBUTES);for(let ge=0;ge<re;ge++){let Q=U.getActiveAttrib(K,ge),de=Q.name,Ie=1;Q.type===U.FLOAT_MAT2&&(Ie=2),Q.type===U.FLOAT_MAT3&&(Ie=3),Q.type===U.FLOAT_MAT4&&(Ie=4),j[de]={type:Q.type,location:U.getAttribLocation(K,de),locationSize:Ie}}return j})(i,m)}let O,F;i.attachShader(m,b),i.attachShader(m,S),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),this.getUniforms=function(){return O===void 0&&D(this),O},this.getAttributes=function(){return F===void 0&&D(this),F};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(m,37297)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=a0++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=S,this}var g0=0,ru=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new su(e),t.set(e,n)),n}},su=class{constructor(e){this.id=g0++,this.code=e,this.usedTimes=0}};function v0(r,e,t,n,i,s,a){let o=new Us,l=new ru,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(p){return c.add(p),p===0?"uv":`uv${p}`}return{getParameters:function(p,v,y,x,_){let b=x.fog,S=_.geometry,D=p.isMeshStandardMaterial?x.environment:null,O=(p.isMeshStandardMaterial?t:e).get(p.envMap||D),F=O&&O.mapping===qa?O.image.height:null,k=g[p.type];p.precision!==null&&(f=i.getMaxPrecision(p.precision),f!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",f,"instead."));let I=S.morphAttributes.position||S.morphAttributes.normal||S.morphAttributes.color,U=I!==void 0?I.length:0,K,j,re,ge,Q=0;if(S.morphAttributes.position!==void 0&&(Q=1),S.morphAttributes.normal!==void 0&&(Q=2),S.morphAttributes.color!==void 0&&(Q=3),k){let se=Hi[k];K=se.vertexShader,j=se.fragmentShader}else K=p.vertexShader,j=p.fragmentShader,l.update(p),re=l.getVertexShaderID(p),ge=l.getFragmentShaderID(p);let de=r.getRenderTarget(),Ie=r.state.buffers.depth.getReversed(),ze=_.isInstancedMesh===!0,Ae=_.isBatchedMesh===!0,Ve=!!p.map,ie=!!p.matcap,Te=!!O,we=!!p.aoMap,J=!!p.lightMap,De=!!p.bumpMap,R=!!p.normalMap,P=!!p.displacementMap,Y=!!p.emissiveMap,X=!!p.metalnessMap,E=!!p.roughnessMap,N=p.anisotropy>0,q=p.clearcoat>0,W=p.dispersion>0,_e=p.iridescence>0,oe=p.sheen>0,ce=p.transmission>0,Pe=N&&!!p.anisotropyMap,Ye=q&&!!p.clearcoatMap,Ue=q&&!!p.clearcoatNormalMap,tt=q&&!!p.clearcoatRoughnessMap,ct=_e&&!!p.iridescenceMap,yt=_e&&!!p.iridescenceThicknessMap,Pt=oe&&!!p.sheenColorMap,Et=oe&&!!p.sheenRoughnessMap,Mt=!!p.specularMap,T=!!p.specularColorMap,L=!!p.specularIntensityMap,H=ce&&!!p.transmissionMap,ne=ce&&!!p.thicknessMap,G=!!p.gradientMap,Z=!!p.alphaMap,ee=p.alphaTest>0,ue=!!p.alphaHash,me=!!p.extensions,w=or;p.toneMapped&&(de!==null&&de.isXRRenderTarget!==!0||(w=r.toneMapping));let $={shaderID:k,shaderType:p.type,shaderName:p.name,vertexShader:K,fragmentShader:j,defines:p.defines,customVertexShaderID:re,customFragmentShaderID:ge,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&_._colorsTexture!==null,instancing:ze,instancingColor:ze&&_.instanceColor!==null,instancingMorph:ze&&_.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:de===null?r.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Wr,alphaToCoverage:!!p.alphaToCoverage,map:Ve,matcap:ie,envMap:Te,envMapMode:Te&&O.mapping,envMapCubeUVHeight:F,aoMap:we,lightMap:J,bumpMap:De,normalMap:R,displacementMap:d&&P,emissiveMap:Y,normalMapObjectSpace:R&&p.normalMapType===Yd,normalMapTangentSpace:R&&p.normalMapType===qd,metalnessMap:X,roughnessMap:E,anisotropy:N,anisotropyMap:Pe,clearcoat:q,clearcoatMap:Ye,clearcoatNormalMap:Ue,clearcoatRoughnessMap:tt,dispersion:W,iridescence:_e,iridescenceMap:ct,iridescenceThicknessMap:yt,sheen:oe,sheenColorMap:Pt,sheenRoughnessMap:Et,specularMap:Mt,specularColorMap:T,specularIntensityMap:L,transmission:ce,transmissionMap:H,thicknessMap:ne,gradientMap:G,opaque:p.transparent===!1&&p.blending===Xa&&p.alphaToCoverage===!1,alphaMap:Z,alphaTest:ee,alphaHash:ue,combine:p.combine,mapUv:Ve&&m(p.map.channel),aoMapUv:we&&m(p.aoMap.channel),lightMapUv:J&&m(p.lightMap.channel),bumpMapUv:De&&m(p.bumpMap.channel),normalMapUv:R&&m(p.normalMap.channel),displacementMapUv:P&&m(p.displacementMap.channel),emissiveMapUv:Y&&m(p.emissiveMap.channel),metalnessMapUv:X&&m(p.metalnessMap.channel),roughnessMapUv:E&&m(p.roughnessMap.channel),anisotropyMapUv:Pe&&m(p.anisotropyMap.channel),clearcoatMapUv:Ye&&m(p.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&m(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&m(p.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&m(p.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&m(p.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&m(p.sheenColorMap.channel),sheenRoughnessMapUv:Et&&m(p.sheenRoughnessMap.channel),specularMapUv:Mt&&m(p.specularMap.channel),specularColorMapUv:T&&m(p.specularColorMap.channel),specularIntensityMapUv:L&&m(p.specularIntensityMap.channel),transmissionMapUv:H&&m(p.transmissionMap.channel),thicknessMapUv:ne&&m(p.thicknessMap.channel),alphaMapUv:Z&&m(p.alphaMap.channel),vertexTangents:!!S.attributes.tangent&&(R||N),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!S.attributes.color&&S.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!S.attributes.uv&&(Ve||Z),fog:!!b,useFog:p.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:p.flatShading===!0&&p.wireframe===!1,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ie,skinning:_.isSkinnedMesh===!0,morphTargets:S.morphAttributes.position!==void 0,morphNormals:S.morphAttributes.normal!==void 0,morphColors:S.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:Q,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:p.dithering,shadowMapEnabled:r.shadowMap.enabled&&y.length>0,shadowMapType:r.shadowMap.type,toneMapping:w,decodeVideoTexture:Ve&&p.map.isVideoTexture===!0&&Jt.getTransfer(p.map.colorSpace)===nn,decodeVideoTextureEmissive:Y&&p.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(p.emissiveMap.colorSpace)===nn,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Yt,flipSided:p.side===$n,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:me&&p.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&p.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return $.vertexUv1s=c.has(1),$.vertexUv2s=c.has(2),$.vertexUv3s=c.has(3),c.clear(),$},getProgramCacheKey:function(p){let v=[];if(p.shaderID?v.push(p.shaderID):(v.push(p.customVertexShaderID),v.push(p.customFragmentShaderID)),p.defines!==void 0)for(let y in p.defines)v.push(y),v.push(p.defines[y]);return p.isRawShaderMaterial===!1&&((function(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)})(v,p),(function(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)})(v,p),v.push(r.outputColorSpace)),v.push(p.customProgramCacheKey),v.join()},getUniforms:function(p){let v=g[p.type],y;if(v){let x=Hi[v];y=sp.clone(x.uniforms)}else y=p.uniforms;return y},acquireProgram:function(p,v){let y;for(let x=0,_=h.length;x<_;x++){let b=h[x];if(b.cacheKey===v){y=b,++y.usedTimes;break}}return y===void 0&&(y=new m0(r,v,p,s),h.push(y)),y},releaseProgram:function(p){if(--p.usedTimes===0){let v=h.indexOf(p);h[v]=h[h.length-1],h.pop(),p.destroy()}},releaseShaderCache:function(p){l.remove(p)},programs:h,dispose:function(){l.dispose()}}}function y0(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function x0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Pp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ip(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,l,c,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=l,d.groupOrder=c,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.push(d):l.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.unshift(d):l.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let l=r[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||x0),n.length>1&&n.sort(o||Pp),i.length>1&&i.sort(o||Pp)}}}function _0(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Ip,r.set(e,[i])):t>=n.length?(i=new Ip,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function M0(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new dt};break;case"SpotLight":t={position:new A,direction:new A,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new dt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":t={color:new dt,position:new A,halfWidth:new A,halfHeight:new A}}return r[e.id]=t,t}}}var b0=0;function T0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function S0(r){let e=new M0,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new A);let i=new A,s=new vt,a=new vt;return{setup:function(o){let l=0,c=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let u=0,d=0,f=0,g=0,m=0,p=0,v=0,y=0,x=0,_=0,b=0;o.sort(T0);for(let D=0,O=o.length;D<O;D++){let F=o[D],k=F.color,I=F.intensity,U=F.distance,K=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)l+=k.r*I,c+=k.g*I,h+=k.b*I;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],I);b++}else if(F.isDirectionalLight){let j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let re=F.shadow,ge=t.get(F);ge.shadowIntensity=re.intensity,ge.shadowBias=re.bias,ge.shadowNormalBias=re.normalBias,ge.shadowRadius=re.radius,ge.shadowMapSize=re.mapSize,n.directionalShadow[u]=ge,n.directionalShadowMap[u]=K,n.directionalShadowMatrix[u]=F.shadow.matrix,p++}n.directional[u]=j,u++}else if(F.isSpotLight){let j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(k).multiplyScalar(I),j.distance=U,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[f]=j;let re=F.shadow;if(F.map&&(n.spotLightMap[x]=F.map,x++,re.updateMatrices(F),F.castShadow&&_++),n.spotLightMatrix[f]=re.matrix,F.castShadow){let ge=t.get(F);ge.shadowIntensity=re.intensity,ge.shadowBias=re.bias,ge.shadowNormalBias=re.normalBias,ge.shadowRadius=re.radius,ge.shadowMapSize=re.mapSize,n.spotShadow[f]=ge,n.spotShadowMap[f]=K,y++}f++}else if(F.isRectAreaLight){let j=e.get(F);j.color.copy(k).multiplyScalar(I),j.halfWidth.set(.5*F.width,0,0),j.halfHeight.set(0,.5*F.height,0),n.rectArea[g]=j,g++}else if(F.isPointLight){let j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){let re=F.shadow,ge=t.get(F);ge.shadowIntensity=re.intensity,ge.shadowBias=re.bias,ge.shadowNormalBias=re.normalBias,ge.shadowRadius=re.radius,ge.shadowMapSize=re.mapSize,ge.shadowCameraNear=re.camera.near,ge.shadowCameraFar=re.camera.far,n.pointShadow[d]=ge,n.pointShadowMap[d]=K,n.pointShadowMatrix[d]=F.shadow.matrix,v++}n.point[d]=j,d++}else if(F.isHemisphereLight){let j=e.get(F);j.skyColor.copy(F.color).multiplyScalar(I),j.groundColor.copy(F.groundColor).multiplyScalar(I),n.hemi[m]=j,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ke.LTC_FLOAT_1,n.rectAreaLTC2=Ke.LTC_FLOAT_2):(n.rectAreaLTC1=Ke.LTC_HALF_1,n.rectAreaLTC2=Ke.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let S=n.hash;S.directionalLength===u&&S.pointLength===d&&S.spotLength===f&&S.rectAreaLength===g&&S.hemiLength===m&&S.numDirectionalShadows===p&&S.numPointShadows===v&&S.numSpotShadows===y&&S.numSpotMaps===x&&S.numLightProbes===b||(n.directional.length=u,n.spot.length=f,n.rectArea.length=g,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=p,n.directionalShadowMap.length=p,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=p,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+x-_,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=b,S.directionalLength=u,S.pointLength=d,S.spotLength=f,S.rectAreaLength=g,S.hemiLength=m,S.numDirectionalShadows=p,S.numPointShadows=v,S.numSpotShadows=y,S.numSpotMaps=x,S.numLightProbes=b,n.version=b0++)},setupView:function(o,l){let c=0,h=0,u=0,d=0,f=0,g=l.matrixWorldInverse;for(let m=0,p=o.length;m<p;m++){let v=o[m];if(v.isDirectionalLight){let y=n.directional[c];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),c++}else if(v.isSpotLight){let y=n.spot[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(v.isRectAreaLight){let y=n.rectArea[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(.5*v.width,0,0),y.halfHeight.set(0,.5*v.height,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),d++}else if(v.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){let y=n.hemi[f];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),f++}}},state:n}}function Lp(r){let e=new S0(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function w0(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Lp(r),e.set(t,[s])):n>=i.length?(s=new Lp(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function E0(r,e,t){let n=new br,i=new Ee,s=new Ee,a=new Kt,o=new Sr({depthPacking:Zs}),l=new fl,c={},h=t.maxTextureSize,u={[Ws]:$n,[$n]:Ws,[Yt]:Yt},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:`void main() {
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
}`}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new pt;g.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new qe(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nh;let v=this.type;function y(S,D){let O=e.update(m);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new xi(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(D,null,O,d,m,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(D,null,O,f,m,null)}function x(S,D,O,F){let k=null,I=O.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)k=I;else if(k=O.isPointLight===!0?l:o,r.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let U=k.uuid,K=D.uuid,j=c[U];j===void 0&&(j={},c[U]=j);let re=j[K];re===void 0&&(re=k.clone(),j[K]=re,D.addEventListener("dispose",b)),k=re}return k.visible=D.visible,k.wireframe=D.wireframe,k.side=F===ki?D.shadowSide!==null?D.shadowSide:D.side:D.shadowSide!==null?D.shadowSide:u[D.side],k.alphaMap=D.alphaMap,k.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,k.map=D.map,k.clipShadows=D.clipShadows,k.clippingPlanes=D.clippingPlanes,k.clipIntersection=D.clipIntersection,k.displacementMap=D.displacementMap,k.displacementScale=D.displacementScale,k.displacementBias=D.displacementBias,k.wireframeLinewidth=D.wireframeLinewidth,k.linewidth=D.linewidth,O.isPointLight===!0&&k.isMeshDistanceMaterial===!0&&(r.properties.get(k).light=O),k}function _(S,D,O,F,k){if(S.visible===!1)return;if(S.layers.test(D.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&k===ki)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld);let U=e.update(S),K=S.material;if(Array.isArray(K)){let j=U.groups;for(let re=0,ge=j.length;re<ge;re++){let Q=j[re],de=K[Q.materialIndex];if(de&&de.visible){let Ie=x(S,de,F,k);S.onBeforeShadow(r,S,D,O,U,Ie,Q),r.renderBufferDirect(O,null,U,Ie,S,Q),S.onAfterShadow(r,S,D,O,U,Ie,Q)}}}else if(K.visible){let j=x(S,K,F,k);S.onBeforeShadow(r,S,D,O,U,j,null),r.renderBufferDirect(O,null,U,j,S,null),S.onAfterShadow(r,S,D,O,U,j,null)}}let I=S.children;for(let U=0,K=I.length;U<K;U++)_(I[U],D,O,F,k)}function b(S){S.target.removeEventListener("dispose",b);for(let D in c){let O=c[D],F=S.target.uuid;F in O&&(O[F].dispose(),delete O[F])}}this.render=function(S,D,O){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;let F=r.getRenderTarget(),k=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Er),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let K=v!==ki&&this.type===ki,j=v===ki&&this.type!==ki;for(let re=0,ge=S.length;re<ge;re++){let Q=S[re],de=Q.shadow;if(de===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(de.autoUpdate===!1&&de.needsUpdate===!1)continue;i.copy(de.mapSize);let Ie=de.getFrameExtents();if(i.multiply(Ie),s.copy(de.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Ie.x),i.x=s.x*Ie.x,de.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Ie.y),i.y=s.y*Ie.y,de.mapSize.y=s.y)),de.map===null||K===!0||j===!0){let Ae=this.type!==ki?{minFilter:zi,magFilter:zi}:{};de.map!==null&&de.map.dispose(),de.map=new xi(i.x,i.y,Ae),de.map.texture.name=Q.name+".shadowMap",de.camera.updateProjectionMatrix()}r.setRenderTarget(de.map),r.clear();let ze=de.getViewportCount();for(let Ae=0;Ae<ze;Ae++){let Ve=de.getViewport(Ae);a.set(s.x*Ve.x,s.y*Ve.y,s.x*Ve.z,s.y*Ve.w),U.viewport(a),de.updateMatrices(Q,Ae),n=de.getFrustum(),_(D,O,de.camera,Q,this.type)}de.isPointLightShadow!==!0&&this.type===ki&&y(de,O),de.needsUpdate=!1}v=this.type,p.needsUpdate=!1,r.setRenderTarget(F,k,I)}}var A0={[wl]:El,[Al]:Pl,[Cl]:Il,[ja]:Rl,[El]:wl,[Pl]:Al,[Il]:Cl,[Rl]:ja};function C0(r,e){let t=new function(){let E=!1,N=new Kt,q=null,W=new Kt(0,0,0,0);return{setMask:function(_e){q===_e||E||(r.colorMask(_e,_e,_e,_e),q=_e)},setLocked:function(_e){E=_e},setClear:function(_e,oe,ce,Pe,Ye){Ye===!0&&(_e*=Pe,oe*=Pe,ce*=Pe),N.set(_e,oe,ce,Pe),W.equals(N)===!1&&(r.clearColor(_e,oe,ce,Pe),W.copy(N))},reset:function(){E=!1,q=null,W.set(-1,0,0,0)}}},n=new function(){let E=!1,N=!1,q=null,W=null,_e=null;return{setReversed:function(oe){if(N!==oe){let ce=e.get("EXT_clip_control");oe?ce.clipControlEXT(ce.LOWER_LEFT_EXT,ce.ZERO_TO_ONE_EXT):ce.clipControlEXT(ce.LOWER_LEFT_EXT,ce.NEGATIVE_ONE_TO_ONE_EXT),N=oe;let Pe=_e;_e=null,this.setClear(Pe)}},getReversed:function(){return N},setTest:function(oe){oe?Te(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(oe){q===oe||E||(r.depthMask(oe),q=oe)},setFunc:function(oe){if(N&&(oe=A0[oe]),W!==oe){switch(oe){case wl:r.depthFunc(r.NEVER);break;case El:r.depthFunc(r.ALWAYS);break;case Al:r.depthFunc(r.LESS);break;case ja:r.depthFunc(r.LEQUAL);break;case Cl:r.depthFunc(r.EQUAL);break;case Rl:r.depthFunc(r.GEQUAL);break;case Pl:r.depthFunc(r.GREATER);break;case Il:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}W=oe}},setLocked:function(oe){E=oe},setClear:function(oe){_e!==oe&&(N&&(oe=1-oe),r.clearDepth(oe),_e=oe)},reset:function(){E=!1,q=null,W=null,_e=null,N=!1}}},i=new function(){let E=!1,N=null,q=null,W=null,_e=null,oe=null,ce=null,Pe=null,Ye=null;return{setTest:function(Ue){E||(Ue?Te(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(Ue){N===Ue||E||(r.stencilMask(Ue),N=Ue)},setFunc:function(Ue,tt,ct){q===Ue&&W===tt&&_e===ct||(r.stencilFunc(Ue,tt,ct),q=Ue,W=tt,_e=ct)},setOp:function(Ue,tt,ct){oe===Ue&&ce===tt&&Pe===ct||(r.stencilOp(Ue,tt,ct),oe=Ue,ce=tt,Pe=ct)},setLocked:function(Ue){E=Ue},setClear:function(Ue){Ye!==Ue&&(r.clearStencil(Ue),Ye=Ue)},reset:function(){E=!1,N=null,q=null,W=null,_e=null,oe=null,ce=null,Pe=null,Ye=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,d=!1,f=null,g=null,m=null,p=null,v=null,y=null,x=null,_=new dt(0,0,0),b=0,S=!1,D=null,O=null,F=null,k=null,I=null,U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,j=0,re=r.getParameter(r.VERSION);re.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(re)[1]),K=j>=1):re.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),K=j>=2);let ge=null,Q={},de=r.getParameter(r.SCISSOR_BOX),Ie=r.getParameter(r.VIEWPORT),ze=new Kt().fromArray(de),Ae=new Kt().fromArray(Ie);function Ve(E,N,q,W){let _e=new Uint8Array(4),oe=r.createTexture();r.bindTexture(E,oe),r.texParameteri(E,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(E,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ce=0;ce<q;ce++)E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY?r.texImage3D(N,0,r.RGBA,1,1,W,0,r.RGBA,r.UNSIGNED_BYTE,_e):r.texImage2D(N+ce,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,_e);return oe}let ie={};function Te(E){o[E]!==!0&&(r.enable(E),o[E]=!0)}function we(E){o[E]!==!1&&(r.disable(E),o[E]=!1)}ie[r.TEXTURE_2D]=Ve(r.TEXTURE_2D,r.TEXTURE_2D,1),ie[r.TEXTURE_CUBE_MAP]=Ve(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[r.TEXTURE_2D_ARRAY]=Ve(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ie[r.TEXTURE_3D]=Ve(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Te(r.DEPTH_TEST),n.setFunc(ja),P(!1),Y(th),Te(r.CULL_FACE),R(Er);let J={[Xs]:r.FUNC_ADD,[fd]:r.FUNC_SUBTRACT,[md]:r.FUNC_REVERSE_SUBTRACT};J[gd]=r.MIN,J[vd]=r.MAX;let De={[yd]:r.ZERO,[xd]:r.ONE,[_d]:r.SRC_COLOR,[bd]:r.SRC_ALPHA,[Cd]:r.SRC_ALPHA_SATURATE,[Ed]:r.DST_COLOR,[Sd]:r.DST_ALPHA,[Md]:r.ONE_MINUS_SRC_COLOR,[Td]:r.ONE_MINUS_SRC_ALPHA,[Ad]:r.ONE_MINUS_DST_COLOR,[wd]:r.ONE_MINUS_DST_ALPHA,[Rd]:r.CONSTANT_COLOR,[Pd]:r.ONE_MINUS_CONSTANT_COLOR,[Id]:r.CONSTANT_ALPHA,[Ld]:r.ONE_MINUS_CONSTANT_ALPHA};function R(E,N,q,W,_e,oe,ce,Pe,Ye,Ue){if(E!==Er){if(d===!1&&(Te(r.BLEND),d=!0),E===pd)_e=_e||N,oe=oe||q,ce=ce||W,N===g&&_e===v||(r.blendEquationSeparate(J[N],J[_e]),g=N,v=_e),q===m&&W===p&&oe===y&&ce===x||(r.blendFuncSeparate(De[q],De[W],De[oe],De[ce]),m=q,p=W,y=oe,x=ce),Pe.equals(_)!==!1&&Ye===b||(r.blendColor(Pe.r,Pe.g,Pe.b,Ye),_.copy(Pe),b=Ye),f=E,S=!1;else if(E!==f||Ue!==S){if(g===Xs&&v===Xs||(r.blendEquation(r.FUNC_ADD),g=Xs,v=Xs),Ue)switch(E){case Xa:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ih:r.blendFunc(r.ONE,r.ONE);break;case rh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case sh:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",E)}else switch(E){case Xa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ih:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case rh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",E)}m=null,p=null,y=null,x=null,_.set(0,0,0),b=0,f=E,S=Ue}}else d===!0&&(we(r.BLEND),d=!1)}function P(E){D!==E&&(E?r.frontFace(r.CW):r.frontFace(r.CCW),D=E)}function Y(E){E!==ud?(Te(r.CULL_FACE),E!==O&&(E===th?r.cullFace(r.BACK):E===dd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),O=E}function X(E,N,q){E?(Te(r.POLYGON_OFFSET_FILL),k===N&&I===q||(r.polygonOffset(N,q),k=N,I=q)):we(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Te,disable:we,bindFramebuffer:function(E,N){return l[E]!==N&&(r.bindFramebuffer(E,N),l[E]=N,E===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=N),E===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=N),!0)},drawBuffers:function(E,N){let q=h,W=!1;if(E){q=c.get(N),q===void 0&&(q=[],c.set(N,q));let _e=E.textures;if(q.length!==_e.length||q[0]!==r.COLOR_ATTACHMENT0){for(let oe=0,ce=_e.length;oe<ce;oe++)q[oe]=r.COLOR_ATTACHMENT0+oe;q.length=_e.length,W=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,W=!0);W&&r.drawBuffers(q)},useProgram:function(E){return u!==E&&(r.useProgram(E),u=E,!0)},setBlending:R,setMaterial:function(E,N){E.side===Yt?we(r.CULL_FACE):Te(r.CULL_FACE);let q=E.side===$n;N&&(q=!q),P(q),E.blending===Xa&&E.transparent===!1?R(Er):R(E.blending,E.blendEquation,E.blendSrc,E.blendDst,E.blendEquationAlpha,E.blendSrcAlpha,E.blendDstAlpha,E.blendColor,E.blendAlpha,E.premultipliedAlpha),n.setFunc(E.depthFunc),n.setTest(E.depthTest),n.setMask(E.depthWrite),t.setMask(E.colorWrite);let W=E.stencilWrite;i.setTest(W),W&&(i.setMask(E.stencilWriteMask),i.setFunc(E.stencilFunc,E.stencilRef,E.stencilFuncMask),i.setOp(E.stencilFail,E.stencilZFail,E.stencilZPass)),X(E.polygonOffset,E.polygonOffsetFactor,E.polygonOffsetUnits),E.alphaToCoverage===!0?Te(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:P,setCullFace:Y,setLineWidth:function(E){E!==F&&(K&&r.lineWidth(E),F=E)},setPolygonOffset:X,setScissorTest:function(E){E?Te(r.SCISSOR_TEST):we(r.SCISSOR_TEST)},activeTexture:function(E){E===void 0&&(E=r.TEXTURE0+U-1),ge!==E&&(r.activeTexture(E),ge=E)},bindTexture:function(E,N,q){q===void 0&&(q=ge===null?r.TEXTURE0+U-1:ge);let W=Q[q];W===void 0&&(W={type:void 0,texture:void 0},Q[q]=W),W.type===E&&W.texture===N||(ge!==q&&(r.activeTexture(q),ge=q),r.bindTexture(E,N||ie[E]),W.type=E,W.texture=N)},unbindTexture:function(){let E=Q[ge];E!==void 0&&E.type!==void 0&&(r.bindTexture(E.type,null),E.type=void 0,E.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},updateUBOMapping:function(E,N){let q=a.get(N);q===void 0&&(q=new WeakMap,a.set(N,q));let W=q.get(E);W===void 0&&(W=r.getUniformBlockIndex(N,E.name),q.set(E,W))},uniformBlockBinding:function(E,N){let q=a.get(N).get(E);s.get(N)!==q&&(r.uniformBlockBinding(N,q,E.__bindingPointIndex),s.set(N,q))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}},scissor:function(E){ze.equals(E)===!1&&(r.scissor(E.x,E.y,E.z,E.w),ze.copy(E))},viewport:function(E){Ae.equals(E)===!1&&(r.viewport(E.x,E.y,E.z,E.w),Ae.copy(E))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ge=null,Q={},l={},c=new WeakMap,h=[],u=null,d=!1,f=null,g=null,m=null,p=null,v=null,y=null,x=null,_=new dt(0,0,0),b=0,S=!1,D=null,O=null,F=null,k=null,I=null,ze.set(0,0,r.canvas.width,r.canvas.height),Ae.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function R0(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new Ee,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,P){return f?new OffscreenCanvas(R,P):Is("canvas")}function m(R,P,Y){let X=1,E=De(R);if((E.width>Y||E.height>Y)&&(X=Y/Math.max(E.width,E.height)),X<1){if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let N=Math.floor(X*E.width),q=Math.floor(X*E.height);u===void 0&&(u=g(N,q));let W=P?g(N,q):u;return W.width=N,W.height=q,W.getContext("2d").drawImage(R,0,0,N,q),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+N+"x"+q+")."),W}return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),R}return R}function p(R){return R.generateMipmaps}function v(R){r.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(R,P,Y,X,E=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let N=P;if(P===r.RED&&(Y===r.FLOAT&&(N=r.R32F),Y===r.HALF_FLOAT&&(N=r.R16F),Y===r.UNSIGNED_BYTE&&(N=r.R8)),P===r.RED_INTEGER&&(Y===r.UNSIGNED_BYTE&&(N=r.R8UI),Y===r.UNSIGNED_SHORT&&(N=r.R16UI),Y===r.UNSIGNED_INT&&(N=r.R32UI),Y===r.BYTE&&(N=r.R8I),Y===r.SHORT&&(N=r.R16I),Y===r.INT&&(N=r.R32I)),P===r.RG&&(Y===r.FLOAT&&(N=r.RG32F),Y===r.HALF_FLOAT&&(N=r.RG16F),Y===r.UNSIGNED_BYTE&&(N=r.RG8)),P===r.RG_INTEGER&&(Y===r.UNSIGNED_BYTE&&(N=r.RG8UI),Y===r.UNSIGNED_SHORT&&(N=r.RG16UI),Y===r.UNSIGNED_INT&&(N=r.RG32UI),Y===r.BYTE&&(N=r.RG8I),Y===r.SHORT&&(N=r.RG16I),Y===r.INT&&(N=r.RG32I)),P===r.RGB_INTEGER&&(Y===r.UNSIGNED_BYTE&&(N=r.RGB8UI),Y===r.UNSIGNED_SHORT&&(N=r.RGB16UI),Y===r.UNSIGNED_INT&&(N=r.RGB32UI),Y===r.BYTE&&(N=r.RGB8I),Y===r.SHORT&&(N=r.RGB16I),Y===r.INT&&(N=r.RGB32I)),P===r.RGBA_INTEGER&&(Y===r.UNSIGNED_BYTE&&(N=r.RGBA8UI),Y===r.UNSIGNED_SHORT&&(N=r.RGBA16UI),Y===r.UNSIGNED_INT&&(N=r.RGBA32UI),Y===r.BYTE&&(N=r.RGBA8I),Y===r.SHORT&&(N=r.RGBA16I),Y===r.INT&&(N=r.RGBA32I)),P===r.RGB&&(Y===r.UNSIGNED_INT_5_9_9_9_REV&&(N=r.RGB9_E5),Y===r.UNSIGNED_INT_10F_11F_11F_REV&&(N=r.R11F_G11F_B10F)),P===r.RGBA){let q=E?ya:Jt.getTransfer(X);Y===r.FLOAT&&(N=r.RGBA32F),Y===r.HALF_FLOAT&&(N=r.RGBA16F),Y===r.UNSIGNED_BYTE&&(N=q===nn?r.SRGB8_ALPHA8:r.RGBA8),Y===r.UNSIGNED_SHORT_4_4_4_4&&(N=r.RGBA4),Y===r.UNSIGNED_SHORT_5_5_5_1&&(N=r.RGB5_A1)}return N!==r.R16F&&N!==r.R32F&&N!==r.RG16F&&N!==r.RG32F&&N!==r.RGBA16F&&N!==r.RGBA32F||e.get("EXT_color_buffer_float"),N}function _(R,P){let Y;return R?P===null||P===es||P===Ys?Y=r.DEPTH24_STENCIL8:P===_i?Y=r.DEPTH32F_STENCIL8:P===qs&&(Y=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===es||P===Ys?Y=r.DEPTH_COMPONENT24:P===_i?Y=r.DEPTH_COMPONENT32F:P===qs&&(Y=r.DEPTH_COMPONENT16),Y}function b(R,P){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==zi&&R.minFilter!==ii?Math.log2(Math.max(P.width,P.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?P.mipmaps.length:1}function S(R){let P=R.target;P.removeEventListener("dispose",S),(function(Y){let X=n.get(Y);if(X.__webglInit===void 0)return;let E=Y.source,N=d.get(E);if(N){let q=N[X.__cacheKey];q.usedTimes--,q.usedTimes===0&&O(Y),Object.keys(N).length===0&&d.delete(E)}n.remove(Y)})(P),P.isVideoTexture&&h.delete(P)}function D(R){let P=R.target;P.removeEventListener("dispose",D),(function(Y){let X=n.get(Y);if(Y.depthTexture&&(Y.depthTexture.dispose(),n.remove(Y.depthTexture)),Y.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(X.__webglFramebuffer[N]))for(let q=0;q<X.__webglFramebuffer[N].length;q++)r.deleteFramebuffer(X.__webglFramebuffer[N][q]);else r.deleteFramebuffer(X.__webglFramebuffer[N]);X.__webglDepthbuffer&&r.deleteRenderbuffer(X.__webglDepthbuffer[N])}else{if(Array.isArray(X.__webglFramebuffer))for(let N=0;N<X.__webglFramebuffer.length;N++)r.deleteFramebuffer(X.__webglFramebuffer[N]);else r.deleteFramebuffer(X.__webglFramebuffer);if(X.__webglDepthbuffer&&r.deleteRenderbuffer(X.__webglDepthbuffer),X.__webglMultisampledFramebuffer&&r.deleteFramebuffer(X.__webglMultisampledFramebuffer),X.__webglColorRenderbuffer)for(let N=0;N<X.__webglColorRenderbuffer.length;N++)X.__webglColorRenderbuffer[N]&&r.deleteRenderbuffer(X.__webglColorRenderbuffer[N]);X.__webglDepthRenderbuffer&&r.deleteRenderbuffer(X.__webglDepthRenderbuffer)}let E=Y.textures;for(let N=0,q=E.length;N<q;N++){let W=n.get(E[N]);W.__webglTexture&&(r.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(E[N])}n.remove(Y)})(P)}function O(R){let P=n.get(R);r.deleteTexture(P.__webglTexture);let Y=R.source;delete d.get(Y)[P.__cacheKey],a.memory.textures--}let F=0;function k(R,P){let Y=n.get(R);if(R.isVideoTexture&&(function(X){let E=a.render.frame;h.get(X)!==E&&(h.set(X,E),X.update())})(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&Y.__version!==R.version){let X=R.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(X.complete!==!1)return void Q(Y,R,P);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else R.isExternalTexture&&(Y.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,Y.__webglTexture,r.TEXTURE0+P)}let I={[bn]:r.REPEAT,[Ps]:r.CLAMP_TO_EDGE,[Xo]:r.MIRRORED_REPEAT},U={[zi]:r.NEAREST,[Hd]:r.NEAREST_MIPMAP_NEAREST,[Ya]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[Ul]:r.LINEAR_MIPMAP_NEAREST,[Pi]:r.LINEAR_MIPMAP_LINEAR},K={[Zd]:r.NEVER,[tp]:r.ALWAYS,[Jd]:r.LESS,[kh]:r.LEQUAL,[Kd]:r.EQUAL,[ep]:r.GEQUAL,[$d]:r.GREATER,[Qd]:r.NOTEQUAL};function j(R,P){if(P.type!==_i||e.has("OES_texture_float_linear")!==!1||P.magFilter!==ii&&P.magFilter!==Ul&&P.magFilter!==Ya&&P.magFilter!==Pi&&P.minFilter!==ii&&P.minFilter!==Ul&&P.minFilter!==Ya&&P.minFilter!==Pi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,I[P.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,I[P.wrapT]),R!==r.TEXTURE_3D&&R!==r.TEXTURE_2D_ARRAY||r.texParameteri(R,r.TEXTURE_WRAP_R,I[P.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,U[P.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,U[P.minFilter]),P.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,K[P.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===zi||P.minFilter!==Ya&&P.minFilter!==Pi||P.type===_i&&e.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||n.get(P).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,i.getMaxAnisotropy())),n.get(P).__currentAnisotropy=P.anisotropy}}}function re(R,P){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,P.addEventListener("dispose",S));let X=P.source,E=d.get(X);E===void 0&&(E={},d.set(X,E));let N=(function(q){let W=[];return W.push(q.wrapS),W.push(q.wrapT),W.push(q.wrapR||0),W.push(q.magFilter),W.push(q.minFilter),W.push(q.anisotropy),W.push(q.internalFormat),W.push(q.format),W.push(q.type),W.push(q.generateMipmaps),W.push(q.premultiplyAlpha),W.push(q.flipY),W.push(q.unpackAlignment),W.push(q.colorSpace),W.join()})(P);if(N!==R.__cacheKey){E[N]===void 0&&(E[N]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),E[N].usedTimes++;let q=E[R.__cacheKey];q!==void 0&&(E[R.__cacheKey].usedTimes--,q.usedTimes===0&&O(P)),R.__cacheKey=N,R.__webglTexture=E[N].texture}return Y}function ge(R,P,Y){return Math.floor(Math.floor(R/Y)/P)}function Q(R,P,Y){let X=r.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),P.isData3DTexture&&(X=r.TEXTURE_3D);let E=re(R,P),N=P.source;t.bindTexture(X,R.__webglTexture,r.TEXTURE0+Y);let q=n.get(N);if(N.version!==q.__version||E===!0){t.activeTexture(r.TEXTURE0+Y);let W=Jt.getPrimaries(Jt.workingColorSpace),_e=P.colorSpace===ts?null:Jt.getPrimaries(P.colorSpace),oe=P.colorSpace===ts||W===_e?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,P.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,P.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let ce=m(P.image,!1,i.maxTextureSize);ce=J(P,ce);let Pe=s.convert(P.format,P.colorSpace),Ye=s.convert(P.type),Ue,tt=x(P.internalFormat,Pe,Ye,P.colorSpace,P.isVideoTexture);j(X,P);let ct=P.mipmaps,yt=P.isVideoTexture!==!0,Pt=q.__version===void 0||E===!0,Et=N.dataReady,Mt=b(P,ce);if(P.isDepthTexture)tt=_(P.format===Ja,P.type),Pt&&(yt?t.texStorage2D(r.TEXTURE_2D,1,tt,ce.width,ce.height):t.texImage2D(r.TEXTURE_2D,0,tt,ce.width,ce.height,0,Pe,Ye,null));else if(P.isDataTexture)if(ct.length>0){yt&&Pt&&t.texStorage2D(r.TEXTURE_2D,Mt,tt,ct[0].width,ct[0].height);for(let T=0,L=ct.length;T<L;T++)Ue=ct[T],yt?Et&&t.texSubImage2D(r.TEXTURE_2D,T,0,0,Ue.width,Ue.height,Pe,Ye,Ue.data):t.texImage2D(r.TEXTURE_2D,T,tt,Ue.width,Ue.height,0,Pe,Ye,Ue.data);P.generateMipmaps=!1}else yt?(Pt&&t.texStorage2D(r.TEXTURE_2D,Mt,tt,ce.width,ce.height),Et&&(function(T,L,H,ne){let G=T.updateRanges;if(G.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,L.width,L.height,H,ne,L.data);else{G.sort((w,$)=>w.start-$.start);let Z=0;for(let w=1;w<G.length;w++){let $=G[Z],se=G[w],he=$.start+$.count,xe=ge(se.start,L.width,4),Ge=ge($.start,L.width,4);se.start<=he+1&&xe===Ge&&ge(se.start+se.count-1,L.width,4)===xe?$.count=Math.max($.count,se.start+se.count-$.start):(++Z,G[Z]=se)}G.length=Z+1;let ee=r.getParameter(r.UNPACK_ROW_LENGTH),ue=r.getParameter(r.UNPACK_SKIP_PIXELS),me=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,L.width);for(let w=0,$=G.length;w<$;w++){let se=G[w],he=Math.floor(se.start/4),xe=Math.ceil(se.count/4),Ge=he%L.width,Ce=Math.floor(he/L.width),Xe=xe;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ge),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ce),t.texSubImage2D(r.TEXTURE_2D,0,Ge,Ce,Xe,1,H,ne,L.data)}T.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ee),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ue),r.pixelStorei(r.UNPACK_SKIP_ROWS,me)}})(P,ce,Pe,Ye)):t.texImage2D(r.TEXTURE_2D,0,tt,ce.width,ce.height,0,Pe,Ye,ce.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){yt&&Pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Mt,tt,ct[0].width,ct[0].height,ce.depth);for(let T=0,L=ct.length;T<L;T++)if(Ue=ct[T],P.format!==Mi)if(Pe!==null)if(yt){if(Et)if(P.layerUpdates.size>0){let H=qh(Ue.width,Ue.height,P.format,P.type);for(let ne of P.layerUpdates){let G=Ue.data.subarray(ne*H/Ue.data.BYTES_PER_ELEMENT,(ne+1)*H/Ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,T,0,0,ne,Ue.width,Ue.height,1,Pe,G)}P.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,T,0,0,0,Ue.width,Ue.height,ce.depth,Pe,Ue.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,T,tt,Ue.width,Ue.height,ce.depth,0,Ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else yt?Et&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,T,0,0,0,Ue.width,Ue.height,ce.depth,Pe,Ye,Ue.data):t.texImage3D(r.TEXTURE_2D_ARRAY,T,tt,Ue.width,Ue.height,ce.depth,0,Pe,Ye,Ue.data)}else{yt&&Pt&&t.texStorage2D(r.TEXTURE_2D,Mt,tt,ct[0].width,ct[0].height);for(let T=0,L=ct.length;T<L;T++)Ue=ct[T],P.format!==Mi?Pe!==null?yt?Et&&t.compressedTexSubImage2D(r.TEXTURE_2D,T,0,0,Ue.width,Ue.height,Pe,Ue.data):t.compressedTexImage2D(r.TEXTURE_2D,T,tt,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):yt?Et&&t.texSubImage2D(r.TEXTURE_2D,T,0,0,Ue.width,Ue.height,Pe,Ye,Ue.data):t.texImage2D(r.TEXTURE_2D,T,tt,Ue.width,Ue.height,0,Pe,Ye,Ue.data)}else if(P.isDataArrayTexture)if(yt){if(Pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Mt,tt,ce.width,ce.height,ce.depth),Et)if(P.layerUpdates.size>0){let T=qh(ce.width,ce.height,P.format,P.type);for(let L of P.layerUpdates){let H=ce.data.subarray(L*T/ce.data.BYTES_PER_ELEMENT,(L+1)*T/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,L,ce.width,ce.height,1,Pe,Ye,H)}P.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Pe,Ye,ce.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,tt,ce.width,ce.height,ce.depth,0,Pe,Ye,ce.data);else if(P.isData3DTexture)yt?(Pt&&t.texStorage3D(r.TEXTURE_3D,Mt,tt,ce.width,ce.height,ce.depth),Et&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Pe,Ye,ce.data)):t.texImage3D(r.TEXTURE_3D,0,tt,ce.width,ce.height,ce.depth,0,Pe,Ye,ce.data);else if(P.isFramebufferTexture){if(Pt)if(yt)t.texStorage2D(r.TEXTURE_2D,Mt,tt,ce.width,ce.height);else{let T=ce.width,L=ce.height;for(let H=0;H<Mt;H++)t.texImage2D(r.TEXTURE_2D,H,tt,T,L,0,Pe,Ye,null),T>>=1,L>>=1}}else if(ct.length>0){if(yt&&Pt){let T=De(ct[0]);t.texStorage2D(r.TEXTURE_2D,Mt,tt,T.width,T.height)}for(let T=0,L=ct.length;T<L;T++)Ue=ct[T],yt?Et&&t.texSubImage2D(r.TEXTURE_2D,T,0,0,Pe,Ye,Ue):t.texImage2D(r.TEXTURE_2D,T,tt,Pe,Ye,Ue);P.generateMipmaps=!1}else if(yt){if(Pt){let T=De(ce);t.texStorage2D(r.TEXTURE_2D,Mt,tt,T.width,T.height)}Et&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Pe,Ye,ce)}else t.texImage2D(r.TEXTURE_2D,0,tt,Pe,Ye,ce);p(P)&&v(X),q.__version=N.version,P.onUpdate&&P.onUpdate(P)}R.__version=P.version}function de(R,P,Y,X,E,N){let q=s.convert(Y.format,Y.colorSpace),W=s.convert(Y.type),_e=x(Y.internalFormat,q,W,Y.colorSpace),oe=n.get(P),ce=n.get(Y);if(ce.__renderTarget=P,!oe.__hasExternalTextures){let Pe=Math.max(1,P.width>>N),Ye=Math.max(1,P.height>>N);E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY?t.texImage3D(E,N,_e,Pe,Ye,P.depth,0,q,W,null):t.texImage2D(E,N,_e,Pe,Ye,0,q,W,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),we(P)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,E,ce.__webglTexture,0,Te(P)):(E===r.TEXTURE_2D||E>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&E<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,E,ce.__webglTexture,N),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(R,P,Y){if(r.bindRenderbuffer(r.RENDERBUFFER,R),P.depthBuffer){let X=P.depthTexture,E=X&&X.isDepthTexture?X.type:null,N=_(P.stencilBuffer,E),q=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,W=Te(P);we(P)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,W,N,P.width,P.height):Y?r.renderbufferStorageMultisample(r.RENDERBUFFER,W,N,P.width,P.height):r.renderbufferStorage(r.RENDERBUFFER,N,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,R)}else{let X=P.textures;for(let E=0;E<X.length;E++){let N=X[E],q=s.convert(N.format,N.colorSpace),W=s.convert(N.type),_e=x(N.internalFormat,q,W,N.colorSpace),oe=Te(P);Y&&we(P)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,oe,_e,P.width,P.height):we(P)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,oe,_e,P.width,P.height):r.renderbufferStorage(r.RENDERBUFFER,_e,P.width,P.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ze(R,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!P.depthTexture||!P.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(P.depthTexture);Y.__renderTarget=P,Y.__webglTexture&&P.depthTexture.image.width===P.width&&P.depthTexture.image.height===P.height||(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),k(P.depthTexture,0);let X=Y.__webglTexture,E=Te(P);if(P.depthTexture.format===Za)we(P)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,E):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else{if(P.depthTexture.format!==Ja)throw new Error("Unknown depthTexture format");we(P)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,E):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0)}}function Ae(R){let P=n.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==R.depthTexture){let X=R.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),X){let E=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,X.removeEventListener("dispose",E)};X.addEventListener("dispose",E),P.__depthDisposeCallback=E}P.__boundDepthTexture=X}if(R.depthTexture&&!P.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");let X=R.texture.mipmaps;X&&X.length>0?ze(P.__webglFramebuffer[0],R):ze(P.__webglFramebuffer,R)}else if(Y){P.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(r.FRAMEBUFFER,P.__webglFramebuffer[X]),P.__webglDepthbuffer[X]===void 0)P.__webglDepthbuffer[X]=r.createRenderbuffer(),Ie(P.__webglDepthbuffer[X],R,!1);else{let E=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=P.__webglDepthbuffer[X];r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,E,r.RENDERBUFFER,N)}}else{let X=R.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(r.FRAMEBUFFER,P.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=r.createRenderbuffer(),Ie(P.__webglDepthbuffer,R,!1);else{let E=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=P.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,E,r.RENDERBUFFER,N)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ve=[],ie=[];function Te(R){return Math.min(i.maxSamples,R.samples)}function we(R){let P=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function J(R,P){let Y=R.colorSpace,X=R.format,E=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Y!==Wr&&Y!==ts&&(Jt.getTransfer(Y)===nn?X===Mi&&E===Vi||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),P}function De(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=function(){let R=F;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),F+=1,R},this.resetTextureUnits=function(){F=0},this.setTexture2D=k,this.setTexture2DArray=function(R,P){let Y=n.get(R);R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version?Q(Y,R,P):t.bindTexture(r.TEXTURE_2D_ARRAY,Y.__webglTexture,r.TEXTURE0+P)},this.setTexture3D=function(R,P){let Y=n.get(R);R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version?Q(Y,R,P):t.bindTexture(r.TEXTURE_3D,Y.__webglTexture,r.TEXTURE0+P)},this.setTextureCube=function(R,P){let Y=n.get(R);R.version>0&&Y.__version!==R.version?(function(X,E,N){if(E.image.length!==6)return;let q=re(X,E),W=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+N);let _e=n.get(W);if(W.version!==_e.__version||q===!0){t.activeTexture(r.TEXTURE0+N);let oe=Jt.getPrimaries(Jt.workingColorSpace),ce=E.colorSpace===ts?null:Jt.getPrimaries(E.colorSpace),Pe=E.colorSpace===ts||oe===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let Ye=E.isCompressedTexture||E.image[0].isCompressedTexture,Ue=E.image[0]&&E.image[0].isDataTexture,tt=[];for(let G=0;G<6;G++)tt[G]=Ye||Ue?Ue?E.image[G].image:E.image[G]:m(E.image[G],!0,i.maxCubemapSize),tt[G]=J(E,tt[G]);let ct=tt[0],yt=s.convert(E.format,E.colorSpace),Pt=s.convert(E.type),Et=x(E.internalFormat,yt,Pt,E.colorSpace),Mt=E.isVideoTexture!==!0,T=_e.__version===void 0||q===!0,L=W.dataReady,H,ne=b(E,ct);if(j(r.TEXTURE_CUBE_MAP,E),Ye){Mt&&T&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ne,Et,ct.width,ct.height);for(let G=0;G<6;G++){H=tt[G].mipmaps;for(let Z=0;Z<H.length;Z++){let ee=H[Z];E.format!==Mi?yt!==null?Mt?L&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z,0,0,ee.width,ee.height,yt,ee.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z,Et,ee.width,ee.height,0,ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Mt?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z,0,0,ee.width,ee.height,yt,Pt,ee.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z,Et,ee.width,ee.height,0,yt,Pt,ee.data)}}}else{if(H=E.mipmaps,Mt&&T){H.length>0&&ne++;let G=De(tt[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ne,Et,G.width,G.height)}for(let G=0;G<6;G++)if(Ue){Mt?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,tt[G].width,tt[G].height,yt,Pt,tt[G].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Et,tt[G].width,tt[G].height,0,yt,Pt,tt[G].data);for(let Z=0;Z<H.length;Z++){let ee=H[Z].image[G].image;Mt?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z+1,0,0,ee.width,ee.height,yt,Pt,ee.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z+1,Et,ee.width,ee.height,0,yt,Pt,ee.data)}}else{Mt?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,yt,Pt,tt[G]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Et,yt,Pt,tt[G]);for(let Z=0;Z<H.length;Z++){let ee=H[Z];Mt?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z+1,0,0,yt,Pt,ee.image[G]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+G,Z+1,Et,yt,Pt,ee.image[G])}}}p(E)&&v(r.TEXTURE_CUBE_MAP),_e.__version=W.version,E.onUpdate&&E.onUpdate(E)}X.__version=E.version})(Y,R,P):t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture,r.TEXTURE0+P)},this.rebindTextures=function(R,P,Y){let X=n.get(R);P!==void 0&&de(X.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Y!==void 0&&Ae(R)},this.setupRenderTarget=function(R){let P=R.texture,Y=n.get(R),X=n.get(P);R.addEventListener("dispose",D);let E=R.textures,N=R.isWebGLCubeRenderTarget===!0,q=E.length>1;if(q||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=P.version,a.memory.textures++),N){Y.__webglFramebuffer=[];for(let W=0;W<6;W++)if(P.mipmaps&&P.mipmaps.length>0){Y.__webglFramebuffer[W]=[];for(let _e=0;_e<P.mipmaps.length;_e++)Y.__webglFramebuffer[W][_e]=r.createFramebuffer()}else Y.__webglFramebuffer[W]=r.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){Y.__webglFramebuffer=[];for(let W=0;W<P.mipmaps.length;W++)Y.__webglFramebuffer[W]=r.createFramebuffer()}else Y.__webglFramebuffer=r.createFramebuffer();if(q)for(let W=0,_e=E.length;W<_e;W++){let oe=n.get(E[W]);oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&we(R)===!1){Y.__webglMultisampledFramebuffer=r.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let W=0;W<E.length;W++){let _e=E[W];Y.__webglColorRenderbuffer[W]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Y.__webglColorRenderbuffer[W]);let oe=s.convert(_e.format,_e.colorSpace),ce=s.convert(_e.type),Pe=x(_e.internalFormat,oe,ce,_e.colorSpace,R.isXRRenderTarget===!0),Ye=Te(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ye,Pe,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+W,r.RENDERBUFFER,Y.__webglColorRenderbuffer[W])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=r.createRenderbuffer(),Ie(Y.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(N){t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),j(r.TEXTURE_CUBE_MAP,P);for(let W=0;W<6;W++)if(P.mipmaps&&P.mipmaps.length>0)for(let _e=0;_e<P.mipmaps.length;_e++)de(Y.__webglFramebuffer[W][_e],R,P,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+W,_e);else de(Y.__webglFramebuffer[W],R,P,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);p(P)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(q){for(let W=0,_e=E.length;W<_e;W++){let oe=E[W],ce=n.get(oe),Pe=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Pe=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Pe,ce.__webglTexture),j(Pe,oe),de(Y.__webglFramebuffer,R,oe,r.COLOR_ATTACHMENT0+W,Pe,0),p(oe)&&v(Pe)}t.unbindTexture()}else{let W=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(W=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(W,X.__webglTexture),j(W,P),P.mipmaps&&P.mipmaps.length>0)for(let _e=0;_e<P.mipmaps.length;_e++)de(Y.__webglFramebuffer[_e],R,P,r.COLOR_ATTACHMENT0,W,_e);else de(Y.__webglFramebuffer,R,P,r.COLOR_ATTACHMENT0,W,0);p(P)&&v(W),t.unbindTexture()}R.depthBuffer&&Ae(R)},this.updateRenderTargetMipmap=function(R){let P=R.textures;for(let Y=0,X=P.length;Y<X;Y++){let E=P[Y];if(p(E)){let N=y(R),q=n.get(E).__webglTexture;t.bindTexture(N,q),v(N),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(R){if(R.samples>0){if(we(R)===!1){let P=R.textures,Y=R.width,X=R.height,E=r.COLOR_BUFFER_BIT,N=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=n.get(R),W=P.length>1;if(W)for(let oe=0;oe<P.length;oe++)t.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,q.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,q.__webglMultisampledFramebuffer);let _e=R.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,q.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,q.__webglFramebuffer);for(let oe=0;oe<P.length;oe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(E|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(E|=r.STENCIL_BUFFER_BIT)),W){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,q.__webglColorRenderbuffer[oe]);let ce=n.get(P[oe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ce,0)}r.blitFramebuffer(0,0,Y,X,0,0,Y,X,E,r.NEAREST),l===!0&&(Ve.length=0,ie.length=0,Ve.push(r.COLOR_ATTACHMENT0+oe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ve.push(N),ie.push(N),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ie)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),W)for(let oe=0;oe<P.length;oe++){t.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.RENDERBUFFER,q.__webglColorRenderbuffer[oe]);let ce=n.get(P[oe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,q.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.TEXTURE_2D,ce,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,q.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let P=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[P])}}},this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=de,this.useMultisampledRTT=we}function P0(r,e){return{convert:function(t,n=ts){let i,s=Jt.getTransfer(n);if(t===Vi)return r.UNSIGNED_BYTE;if(t===Bl)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Fl)return r.UNSIGNED_SHORT_5_5_5_1;if(t===ch)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===hh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===oh)return r.BYTE;if(t===lh)return r.SHORT;if(t===qs)return r.UNSIGNED_SHORT;if(t===Nl)return r.INT;if(t===es)return r.UNSIGNED_INT;if(t===_i)return r.FLOAT;if(t===Ar)return r.HALF_FLOAT;if(t===Wd)return r.ALPHA;if(t===Xd)return r.RGB;if(t===Mi)return r.RGBA;if(t===Za)return r.DEPTH_COMPONENT;if(t===Ja)return r.DEPTH_STENCIL;if(t===Ol)return r.RED;if(t===zl)return r.RED_INTEGER;if(t===jd)return r.RG;if(t===uh)return r.RG_INTEGER;if(t===dh)return r.RGBA_INTEGER;if(t===Gl||t===kl||t===Vl||t===Hl)if(s===nn){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===Gl)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===kl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Vl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Hl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===Gl)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===kl)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Vl)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Hl)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===ph||t===fh||t===mh||t===gh){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===ph)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===fh)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===mh)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===gh)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===vh||t===yh||t===xh){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===vh||t===yh)return s===nn?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===xh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===_h||t===Mh||t===bh||t===Th||t===Sh||t===wh||t===Eh||t===Ah||t===Ch||t===Rh||t===Ph||t===Ih||t===Lh||t===Dh){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===_h)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Mh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===bh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Th)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Sh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===wh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Eh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ah)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Ch)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Rh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Ph)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Ih)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Lh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Dh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Uh||t===Nh||t===Bh){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Uh)return s===nn?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Nh)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Bh)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Fh||t===Oh||t===zh||t===Gh){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Fh)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Oh)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===zh)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Gh)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ys?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var au=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Pa(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Wn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qe(new Xt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ou=class extends rr{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,m=typeof XRWebGLBinding<"u",p=new au,v={},y=t.getContextAttributes(),x=null,_=null,b=[],S=[],D=new Ee,O=null,F=new sn;F.viewport=new Kt;let k=new sn;k.viewport=new Kt;let I=[F,k],U=new Sl,K=null,j=null;function re(ie){let Te=S.indexOf(ie.inputSource);if(Te===-1)return;let we=b[Te];we!==void 0&&(we.update(ie.inputSource,ie.frame,c||a),we.dispatchEvent({type:ie.type,data:ie.inputSource}))}function ge(){i.removeEventListener("select",re),i.removeEventListener("selectstart",re),i.removeEventListener("selectend",re),i.removeEventListener("squeeze",re),i.removeEventListener("squeezestart",re),i.removeEventListener("squeezeend",re),i.removeEventListener("end",ge),i.removeEventListener("inputsourceschange",Q);for(let ie=0;ie<b.length;ie++){let Te=S[ie];Te!==null&&(S[ie]=null,b[ie].disconnect(Te))}K=null,j=null,p.reset();for(let ie in v)delete v[ie];e.setRenderTarget(x),f=null,d=null,u=null,i=null,_=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}function Q(ie){for(let Te=0;Te<ie.removed.length;Te++){let we=ie.removed[Te],J=S.indexOf(we);J>=0&&(S[J]=null,b[J].disconnect(we))}for(let Te=0;Te<ie.added.length;Te++){let we=ie.added[Te],J=S.indexOf(we);if(J===-1){for(let R=0;R<b.length;R++){if(R>=S.length){S.push(we),J=R;break}if(S[R]===null){S[R]=we,J=R;break}}if(J===-1)break}let De=b[J];De&&De.connect(we)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let Te=b[ie];return Te===void 0&&(Te=new Bs,b[ie]=Te),Te.getTargetRaySpace()},this.getControllerGrip=function(ie){let Te=b[ie];return Te===void 0&&(Te=new Bs,b[ie]=Te),Te.getGripSpace()},this.getHand=function(ie){let Te=b[ie];return Te===void 0&&(Te=new Bs,b[ie]=Te),Te.getHandSpace()},this.setFramebufferScaleFactor=function(ie){s=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ie){if(i=ie,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",re),i.addEventListener("selectstart",re),i.addEventListener("selectend",re),i.addEventListener("squeeze",re),i.addEventListener("squeezestart",re),i.addEventListener("squeezeend",re),i.addEventListener("end",ge),i.addEventListener("inputsourceschange",Q),y.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(D),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,we=null,J=null;y.depth&&(J=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=y.stencil?Ja:Za,we=y.stencil?Ys:es);let De={colorFormat:t.RGBA8,depthFormat:J,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(De),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new xi(d.textureWidth,d.textureHeight,{format:Mi,type:Vi,depthTexture:new Ra(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new xi(f.framebufferWidth,f.framebufferHeight,{format:Mi,type:Vi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ve.setContext(i),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};let de=new A,Ie=new A;function ze(ie,Te){Te===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(Te.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(i===null)return;let Te=ie.near,we=ie.far;p.texture!==null&&(p.depthNear>0&&(Te=p.depthNear),p.depthFar>0&&(we=p.depthFar)),U.near=k.near=F.near=Te,U.far=k.far=F.far=we,K===U.near&&j===U.far||(i.updateRenderState({depthNear:U.near,depthFar:U.far}),K=U.near,j=U.far),U.layers.mask=6|ie.layers.mask,F.layers.mask=3&U.layers.mask,k.layers.mask=5&U.layers.mask;let J=ie.parent,De=U.cameras;ze(U,J);for(let R=0;R<De.length;R++)ze(De[R],J);De.length===2?(function(R,P,Y){de.setFromMatrixPosition(P.matrixWorld),Ie.setFromMatrixPosition(Y.matrixWorld);let X=de.distanceTo(Ie),E=P.projectionMatrix.elements,N=Y.projectionMatrix.elements,q=E[14]/(E[10]-1),W=E[14]/(E[10]+1),_e=(E[9]+1)/E[5],oe=(E[9]-1)/E[5],ce=(E[8]-1)/E[0],Pe=(N[8]+1)/N[0],Ye=q*ce,Ue=q*Pe,tt=X/(-ce+Pe),ct=tt*-ce;if(P.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(ct),R.translateZ(tt),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),E[10]===-1)R.projectionMatrix.copy(P.projectionMatrix),R.projectionMatrixInverse.copy(P.projectionMatrixInverse);else{let yt=q+tt,Pt=W+tt,Et=Ye-ct,Mt=Ue+(X-ct),T=_e*W/Pt*yt,L=oe*W/Pt*yt;R.projectionMatrix.makePerspective(Et,Mt,T,L,yt,Pt),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}})(U,F,k):U.projectionMatrix.copy(F.projectionMatrix),(function(R,P,Y){Y===null?R.matrix.copy(P.matrixWorld):(R.matrix.copy(Y.matrixWorld),R.matrix.invert(),R.matrix.multiply(P.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(P.projectionMatrix),R.projectionMatrixInverse.copy(P.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=2*_a*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)})(ie,U,J)},this.getCamera=function(){return U},this.getFoveation=function(){if(d!==null||f!==null)return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ie)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(ie){return v[ie]};let Ae=null,Ve=new Dp;Ve.setAnimationLoop(function(ie,Te){if(h=Te.getViewerPose(c||a),g=Te,h!==null){let we=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let J=!1;we.length!==U.cameras.length&&(U.cameras.length=0,J=!0);for(let R=0;R<we.length;R++){let P=we[R],Y=null;if(f!==null)Y=f.getViewport(P);else{let E=u.getViewSubImage(d,P);Y=E.viewport,R===0&&(e.setRenderTargetTextures(_,E.colorTexture,E.depthStencilTexture),e.setRenderTarget(_))}let X=I[R];X===void 0&&(X=new sn,X.layers.enable(R),X.viewport=new Kt,I[R]=X),X.matrix.fromArray(P.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(P.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(Y.x,Y.y,Y.width,Y.height),R===0&&(U.matrix.copy(X.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),J===!0&&U.cameras.push(X)}let De=i.enabledFeatures;if(De&&De.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){u=n.getBinding();let R=u.getDepthInformation(we[0]);R&&R.isValid&&R.texture&&p.init(R,i.renderState)}if(De&&De.includes("camera-access")&&m){e.state.unbindTexture(),u=n.getBinding();for(let R=0;R<we.length;R++){let P=we[R].camera;if(P){let Y=v[P];Y||(Y=new Pa,v[P]=Y);let X=u.getCameraImage(P);Y.sourceTexture=X}}}}for(let we=0;we<b.length;we++){let J=S[we],De=b[we];J!==null&&De!==void 0&&De.update(J,Te,c||a)}Ae&&Ae(ie,Te),Te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Te}),g=null}),this.setAnimationLoop=function(ie){Ae=ie},this.dispose=function(){}}},ss=new Ci,I0=new vt;function L0(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===$n&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===$n&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(i.envMap.value=o,ss.copy(l),ss.x*=-1,ss.y*=-1,ss.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),i.envMapRotation.value.setFromMatrix4(I0.makeRotationFromEuler(ss)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Wh(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===$n&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(i,s,l)):s.isMeshMatcapMaterial?(n(i,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(c,h,u,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function D0(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,d,f,g){let m=u.value,p=d+"_"+f;if(g[p]===void 0)return g[p]=typeof m=="number"||typeof m=="boolean"?m:m.clone(),!0;{let v=g[p];if(typeof m=="number"||typeof m=="boolean"){if(v!==m)return g[p]=m,!0}else if(v.equals(m)===!1)return v.copy(m),!0}return!1}function c(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let f=a.indexOf(d.__bindingPointIndex);a.splice(f,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let f=d.program;n.uniformBlockBinding(u,f)},update:function(u,d){let f=i[u.id];f===void 0&&((function(p){let v=p.uniforms,y=0,x=16;for(let b=0,S=v.length;b<S;b++){let D=Array.isArray(v[b])?v[b]:[v[b]];for(let O=0,F=D.length;O<F;O++){let k=D[O],I=Array.isArray(k.value)?k.value:[k.value];for(let U=0,K=I.length;U<K;U++){let j=c(I[U]),re=y%x,ge=re%j.boundary,Q=re+ge;y+=ge,Q!==0&&x-Q<j.storage&&(y+=x-Q),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=j.storage}}}let _=y%x;_>0&&(y+=x-_),p.__size=y,p.__cache={}})(u),f=(function(p){let v=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();p.__bindingPointIndex=v;let y=r.createBuffer(),x=p.__size,_=p.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,x,_),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y})(u),i[u.id]=f,u.addEventListener("dispose",h));let g=d.program;n.updateUBOMapping(u,g);let m=e.render.frame;s[u.id]!==m&&((function(p){let v=i[p.id],y=p.uniforms,x=p.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let _=0,b=y.length;_<b;_++){let S=Array.isArray(y[_])?y[_]:[y[_]];for(let D=0,O=S.length;D<O;D++){let F=S[D];if(l(F,_,D,x)===!0){let k=F.__offset,I=Array.isArray(F.value)?F.value:[F.value],U=0;for(let K=0;K<I.length;K++){let j=I[K],re=c(j);typeof j=="number"||typeof j=="boolean"?(F.__data[0]=j,r.bufferSubData(r.UNIFORM_BUFFER,k+U,F.__data)):j.isMatrix3?(F.__data[0]=j.elements[0],F.__data[1]=j.elements[1],F.__data[2]=j.elements[2],F.__data[3]=0,F.__data[4]=j.elements[3],F.__data[5]=j.elements[4],F.__data[6]=j.elements[5],F.__data[7]=0,F.__data[8]=j.elements[6],F.__data[9]=j.elements[7],F.__data[10]=j.elements[8],F.__data[11]=0):(j.toArray(F.__data,U),U+=re.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=m)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var si=class{constructor(e={}){let{canvas:t=np(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,f;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let g=new Uint32Array(4),m=new Int32Array(4),p=null,v=null,y=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=or,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,b=!1;this._outputColorSpace=bt;let S=0,D=0,O=null,F=-1,k=null,I=new Kt,U=new Kt,K=null,j=new dt(0),re=0,ge=t.width,Q=t.height,de=1,Ie=null,ze=null,Ae=new Kt(0,0,ge,Q),Ve=new Kt(0,0,ge,Q),ie=!1,Te=new br,we=!1,J=!1,De=new vt,R=new A,P=new Kt,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},X=!1;function E(){return O===null?de:1}let N,q,W,_e,oe,ce,Pe,Ye,Ue,tt,ct,yt,Pt,Et,Mt,T,L,H,ne,G,Z,ee,ue,me,w=n;function $(B,pe){return t.getContext(B,pe)}try{let B={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ge,!1),t.addEventListener("webglcontextcreationerror",Ce,!1),w===null){let pe="webgl2";if(w=$(pe,B),w===null)throw $(pe)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(B){throw console.error("THREE.WebGLRenderer: "+B.message),B}function se(){N=new mm(w),N.init(),ee=new P0(w,N),q=new hm(w,N,e,ee),W=new C0(w,N),q.reversedDepthBuffer&&d&&W.buffers.depth.setReversed(!0),_e=new ym(w),oe=new y0,ce=new R0(w,N,W,oe,q,ee,_e),Pe=new dm(_),Ye=new fm(_),Ue=new sm(w),ue=new lm(w,Ue),tt=new gm(w,Ue,_e,ue),ct=new _m(w,tt,Ue,_e),ne=new xm(w,q,ce),T=new um(oe),yt=new v0(_,Pe,Ye,N,q,ue,T),Pt=new L0(_,oe),Et=new _0,Mt=new w0(N),H=new om(_,Pe,Ye,W,ct,f,l),L=new E0(_,ct,q),me=new D0(w,_e,q,W),G=new cm(w,N,_e),Z=new vm(w,N,_e),_e.programs=yt.programs,_.capabilities=q,_.extensions=N,_.properties=oe,_.renderLists=Et,_.shadowMap=L,_.state=W,_.info=_e}se();let he=new ou(_,w);function xe(B){B.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function Ge(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let B=_e.autoReset,pe=L.enabled,be=L.autoUpdate,Le=L.needsUpdate,ye=L.type;se(),_e.autoReset=B,L.enabled=pe,L.autoUpdate=be,L.needsUpdate=Le,L.type=ye}function Ce(B){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",B.statusMessage)}function Xe(B){let pe=B.target;pe.removeEventListener("dispose",Xe),(function(be){(function(Le){let ye=oe.get(Le).programs;ye!==void 0&&(ye.forEach(function(Be){yt.releaseProgram(Be)}),Le.isShaderMaterial&&yt.releaseShaderCache(Le))})(be),oe.remove(be)})(pe)}function Qe(B,pe,be){B.transparent===!0&&B.side===Yt&&B.forceSinglePass===!1?(B.side=$n,B.needsUpdate=!0,On(B,pe,be),B.side=Ws,B.needsUpdate=!0,On(B,pe,be),B.side=Yt):On(B,pe,be)}this.xr=he,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let B=N.get("WEBGL_lose_context");B&&B.loseContext()},this.forceContextRestore=function(){let B=N.get("WEBGL_lose_context");B&&B.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(B){B!==void 0&&(de=B,this.setSize(ge,Q,!1))},this.getSize=function(B){return B.set(ge,Q)},this.setSize=function(B,pe,be=!0){he.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ge=B,Q=pe,t.width=Math.floor(B*de),t.height=Math.floor(pe*de),be===!0&&(t.style.width=B+"px",t.style.height=pe+"px"),this.setViewport(0,0,B,pe))},this.getDrawingBufferSize=function(B){return B.set(ge*de,Q*de).floor()},this.setDrawingBufferSize=function(B,pe,be){ge=B,Q=pe,de=be,t.width=Math.floor(B*be),t.height=Math.floor(pe*be),this.setViewport(0,0,B,pe)},this.getCurrentViewport=function(B){return B.copy(I)},this.getViewport=function(B){return B.copy(Ae)},this.setViewport=function(B,pe,be,Le){B.isVector4?Ae.set(B.x,B.y,B.z,B.w):Ae.set(B,pe,be,Le),W.viewport(I.copy(Ae).multiplyScalar(de).round())},this.getScissor=function(B){return B.copy(Ve)},this.setScissor=function(B,pe,be,Le){B.isVector4?Ve.set(B.x,B.y,B.z,B.w):Ve.set(B,pe,be,Le),W.scissor(U.copy(Ve).multiplyScalar(de).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(B){W.setScissorTest(ie=B)},this.setOpaqueSort=function(B){Ie=B},this.setTransparentSort=function(B){ze=B},this.getClearColor=function(B){return B.copy(H.getClearColor())},this.setClearColor=function(){H.setClearColor(...arguments)},this.getClearAlpha=function(){return H.getClearAlpha()},this.setClearAlpha=function(){H.setClearAlpha(...arguments)},this.clear=function(B=!0,pe=!0,be=!0){let Le=0;if(B){let ye=!1;if(O!==null){let Be=O.texture.format;ye=Be===dh||Be===uh||Be===zl}if(ye){let Be=O.texture.type,it=Be===Vi||Be===es||Be===qs||Be===Ys||Be===Bl||Be===Fl,Ne=H.getClearColor(),Ze=H.getClearAlpha(),et=Ne.r,St=Ne.g,Je=Ne.b;it?(g[0]=et,g[1]=St,g[2]=Je,g[3]=Ze,w.clearBufferuiv(w.COLOR,0,g)):(m[0]=et,m[1]=St,m[2]=Je,m[3]=Ze,w.clearBufferiv(w.COLOR,0,m))}else Le|=w.COLOR_BUFFER_BIT}pe&&(Le|=w.DEPTH_BUFFER_BIT),be&&(Le|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(Le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",Ce,!1),H.dispose(),Et.dispose(),Mt.dispose(),oe.dispose(),Pe.dispose(),Ye.dispose(),ct.dispose(),ue.dispose(),me.dispose(),yt.dispose(),he.dispose(),he.removeEventListener("sessionstart",ut),he.removeEventListener("sessionend",at),ft.stop()},this.renderBufferDirect=function(B,pe,be,Le,ye,Be){pe===null&&(pe=Y);let it=ye.isMesh&&ye.matrixWorld.determinant()<0,Ne=(function(Nt,cn,rn,It,Tt){cn.isScene!==!0&&(cn=Y),ce.resetTextureUnits();let Qn=cn.fog,ur=It.isMeshStandardMaterial?cn.environment:null,_n=O===null?_.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Wr,fi=(It.isMeshStandardMaterial?Ye:Pe).get(It.envMap||ur),Zn=It.vertexColors===!0&&!!rn.attributes.color&&rn.attributes.color.itemSize===4,Qt=!!rn.attributes.tangent&&(!!It.normalMap||It.anisotropy>0),mi=!!rn.morphAttributes.position,Qs=!!rn.morphAttributes.normal,gi=!!rn.morphAttributes.color,ao=or;It.toneMapped&&(O!==null&&O.isXRRenderTarget!==!0||(ao=_.toneMapping));let us=rn.morphAttributes.position||rn.morphAttributes.normal||rn.morphAttributes.color,dr=us!==void 0?us.length:0,Bt=oe.get(It),ei=v.state.lights;if(we===!0&&(J===!0||Nt!==k)){let Cn=Nt===k&&It.id===F;T.setState(It,Nt,Cn)}let Un=!1;It.version===Bt.__version?Bt.needsLights&&Bt.lightsStateVersion!==ei.state.version||Bt.outputColorSpace!==_n||Tt.isBatchedMesh&&Bt.batching===!1?Un=!0:Tt.isBatchedMesh||Bt.batching!==!0?Tt.isBatchedMesh&&Bt.batchingColor===!0&&Tt.colorTexture===null||Tt.isBatchedMesh&&Bt.batchingColor===!1&&Tt.colorTexture!==null||Tt.isInstancedMesh&&Bt.instancing===!1?Un=!0:Tt.isInstancedMesh||Bt.instancing!==!0?Tt.isSkinnedMesh&&Bt.skinning===!1?Un=!0:Tt.isSkinnedMesh||Bt.skinning!==!0?Tt.isInstancedMesh&&Bt.instancingColor===!0&&Tt.instanceColor===null||Tt.isInstancedMesh&&Bt.instancingColor===!1&&Tt.instanceColor!==null||Tt.isInstancedMesh&&Bt.instancingMorph===!0&&Tt.morphTexture===null||Tt.isInstancedMesh&&Bt.instancingMorph===!1&&Tt.morphTexture!==null||Bt.envMap!==fi||It.fog===!0&&Bt.fog!==Qn?Un=!0:Bt.numClippingPlanes===void 0||Bt.numClippingPlanes===T.numPlanes&&Bt.numIntersection===T.numIntersection?(Bt.vertexAlphas!==Zn||Bt.vertexTangents!==Qt||Bt.morphTargets!==mi||Bt.morphNormals!==Qs||Bt.morphColors!==gi||Bt.toneMapping!==ao||Bt.morphTargetsCount!==dr)&&(Un=!0):Un=!0:Un=!0:Un=!0:Un=!0:(Un=!0,Bt.__version=It.version);let qi=Bt.currentProgram;Un===!0&&(qi=On(It,cn,Tt));let Nr=!1,ds=!1,ea=!1,an=qi.getUniforms(),Di=Bt.uniforms;if(W.useProgram(qi.program)&&(Nr=!0,ds=!0,ea=!0),It.id!==F&&(F=It.id,ds=!0),Nr||k!==Nt){W.buffers.depth.getReversed()&&Nt.reversedDepth!==!0&&(Nt._reversedDepth=!0,Nt.updateProjectionMatrix()),an.setValue(w,"projectionMatrix",Nt.projectionMatrix),an.setValue(w,"viewMatrix",Nt.matrixWorldInverse);let Cn=an.map.cameraPosition;Cn!==void 0&&Cn.setValue(w,R.setFromMatrixPosition(Nt.matrixWorld)),q.logarithmicDepthBuffer&&an.setValue(w,"logDepthBufFC",2/(Math.log(Nt.far+1)/Math.LN2)),(It.isMeshPhongMaterial||It.isMeshToonMaterial||It.isMeshLambertMaterial||It.isMeshBasicMaterial||It.isMeshStandardMaterial||It.isShaderMaterial)&&an.setValue(w,"isOrthographic",Nt.isOrthographicCamera===!0),k!==Nt&&(k=Nt,ds=!0,ea=!0)}if(Tt.isSkinnedMesh){an.setOptional(w,Tt,"bindMatrix"),an.setOptional(w,Tt,"bindMatrixInverse");let Cn=Tt.skeleton;Cn&&(Cn.boneTexture===null&&Cn.computeBoneTexture(),an.setValue(w,"boneTexture",Cn.boneTexture,ce))}Tt.isBatchedMesh&&(an.setOptional(w,Tt,"batchingTexture"),an.setValue(w,"batchingTexture",Tt._matricesTexture,ce),an.setOptional(w,Tt,"batchingIdTexture"),an.setValue(w,"batchingIdTexture",Tt._indirectTexture,ce),an.setOptional(w,Tt,"batchingColorTexture"),Tt._colorsTexture!==null&&an.setValue(w,"batchingColorTexture",Tt._colorsTexture,ce));let zn=rn.morphAttributes;zn.position===void 0&&zn.normal===void 0&&zn.color===void 0||ne.update(Tt,rn,qi),(ds||Bt.receiveShadow!==Tt.receiveShadow)&&(Bt.receiveShadow=Tt.receiveShadow,an.setValue(w,"receiveShadow",Tt.receiveShadow)),It.isMeshGouraudMaterial&&It.envMap!==null&&(Di.envMap.value=fi,Di.flipEnvMap.value=fi.isCubeTexture&&fi.isRenderTargetTexture===!1?-1:1),It.isMeshStandardMaterial&&It.envMap===null&&cn.environment!==null&&(Di.envMapIntensity.value=cn.environmentIntensity),ds&&(an.setValue(w,"toneMappingExposure",_.toneMappingExposure),Bt.needsLights&&(ti=ea,(dn=Di).ambientLightColor.needsUpdate=ti,dn.lightProbe.needsUpdate=ti,dn.directionalLights.needsUpdate=ti,dn.directionalLightShadows.needsUpdate=ti,dn.pointLights.needsUpdate=ti,dn.pointLightShadows.needsUpdate=ti,dn.spotLights.needsUpdate=ti,dn.spotLightShadows.needsUpdate=ti,dn.rectAreaLights.needsUpdate=ti,dn.hemisphereLights.needsUpdate=ti),Qn&&It.fog===!0&&Pt.refreshFogUniforms(Di,Qn),Pt.refreshMaterialUniforms(Di,It,de,Q,v.state.transmissionRenderTarget[Nt.id]),Ks.upload(w,Dr(Bt),Di,ce));var dn,ti;if(It.isShaderMaterial&&It.uniformsNeedUpdate===!0&&(Ks.upload(w,Dr(Bt),Di,ce),It.uniformsNeedUpdate=!1),It.isSpriteMaterial&&an.setValue(w,"center",Tt.center),an.setValue(w,"modelViewMatrix",Tt.modelViewMatrix),an.setValue(w,"normalMatrix",Tt.normalMatrix),an.setValue(w,"modelMatrix",Tt.matrixWorld),It.isShaderMaterial||It.isRawShaderMaterial){let Cn=It.uniformsGroups;for(let oo=0,ps=Cn.length;oo<ps;oo++){let ic=Cn[oo];me.update(ic,qi),me.bind(ic,qi)}}return qi})(B,pe,be,Le,ye);W.setMaterial(Le,it);let Ze=be.index,et=1;if(Le.wireframe===!0){if(Ze=tt.getWireframeAttribute(be),Ze===void 0)return;et=2}let St=be.drawRange,Je=be.attributes.position,Fe=St.start*et,ot=(St.start+St.count)*et;Be!==null&&(Fe=Math.max(Fe,Be.start*et),ot=Math.min(ot,(Be.start+Be.count)*et)),Ze!==null?(Fe=Math.max(Fe,0),ot=Math.min(ot,Ze.count)):Je!=null&&(Fe=Math.max(Fe,0),ot=Math.min(ot,Je.count));let ln=ot-Fe;if(ln<0||ln===1/0)return;let yn;ue.setup(ye,Le,Ne,be,Ze);let $t=G;if(Ze!==null&&(yn=Ue.get(Ze),$t=Z,$t.setIndex(yn)),ye.isMesh)Le.wireframe===!0?(W.setLineWidth(Le.wireframeLinewidth*E()),$t.setMode(w.LINES)):$t.setMode(w.TRIANGLES);else if(ye.isLine){let Nt=Le.linewidth;Nt===void 0&&(Nt=1),W.setLineWidth(Nt*E()),ye.isLineSegments?$t.setMode(w.LINES):ye.isLineLoop?$t.setMode(w.LINE_LOOP):$t.setMode(w.LINE_STRIP)}else ye.isPoints?$t.setMode(w.POINTS):ye.isSprite&&$t.setMode(w.TRIANGLES);if(ye.isBatchedMesh)if(ye._multiDrawInstances!==null)Ls("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),$t.renderMultiDrawInstances(ye._multiDrawStarts,ye._multiDrawCounts,ye._multiDrawCount,ye._multiDrawInstances);else if(N.get("WEBGL_multi_draw"))$t.renderMultiDraw(ye._multiDrawStarts,ye._multiDrawCounts,ye._multiDrawCount);else{let Nt=ye._multiDrawStarts,cn=ye._multiDrawCounts,rn=ye._multiDrawCount,It=Ze?Ue.get(Ze).bytesPerElement:1,Tt=oe.get(Le).currentProgram.getUniforms();for(let Qn=0;Qn<rn;Qn++)Tt.setValue(w,"_gl_DrawID",Qn),$t.render(Nt[Qn]/It,cn[Qn])}else if(ye.isInstancedMesh)$t.renderInstances(Fe,ln,ye.count);else if(be.isInstancedBufferGeometry){let Nt=be._maxInstanceCount!==void 0?be._maxInstanceCount:1/0,cn=Math.min(be.instanceCount,Nt);$t.renderInstances(Fe,ln,cn)}else $t.render(Fe,ln)},this.compile=function(B,pe,be=null){be===null&&(be=B),v=Mt.get(be),v.init(pe),x.push(v),be.traverseVisible(function(ye){ye.isLight&&ye.layers.test(pe.layers)&&(v.pushLight(ye),ye.castShadow&&v.pushShadow(ye))}),B!==be&&B.traverseVisible(function(ye){ye.isLight&&ye.layers.test(pe.layers)&&(v.pushLight(ye),ye.castShadow&&v.pushShadow(ye))}),v.setupLights();let Le=new Set;return B.traverse(function(ye){if(!(ye.isMesh||ye.isPoints||ye.isLine||ye.isSprite))return;let Be=ye.material;if(Be)if(Array.isArray(Be))for(let it=0;it<Be.length;it++){let Ne=Be[it];Qe(Ne,be,ye),Le.add(Ne)}else Qe(Be,be,ye),Le.add(Be)}),v=x.pop(),Le},this.compileAsync=function(B,pe,be=null){let Le=this.compile(B,pe,be);return new Promise(ye=>{function Be(){Le.forEach(function(it){oe.get(it).currentProgram.isReady()&&Le.delete(it)}),Le.size!==0?setTimeout(Be,10):ye(B)}N.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let Oe=null;function ut(){ft.stop()}function at(){ft.start()}let ft=new Dp;function xt(B,pe,be,Le){if(B.visible===!1)return;if(B.layers.test(pe.layers)){if(B.isGroup)be=B.renderOrder;else if(B.isLOD)B.autoUpdate===!0&&B.update(pe);else if(B.isLight)v.pushLight(B),B.castShadow&&v.pushShadow(B);else if(B.isSprite){if(!B.frustumCulled||Te.intersectsSprite(B)){Le&&P.setFromMatrixPosition(B.matrixWorld).applyMatrix4(De);let Be=ct.update(B),it=B.material;it.visible&&p.push(B,Be,it,be,P.z,null)}}else if((B.isMesh||B.isLine||B.isPoints)&&(!B.frustumCulled||Te.intersectsObject(B))){let Be=ct.update(B),it=B.material;if(Le&&(B.boundingSphere!==void 0?(B.boundingSphere===null&&B.computeBoundingSphere(),P.copy(B.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),P.copy(Be.boundingSphere.center)),P.applyMatrix4(B.matrixWorld).applyMatrix4(De)),Array.isArray(it)){let Ne=Be.groups;for(let Ze=0,et=Ne.length;Ze<et;Ze++){let St=Ne[Ze],Je=it[St.materialIndex];Je&&Je.visible&&p.push(B,Be,Je,be,P.z,St)}}else it.visible&&p.push(B,Be,it,be,P.z,null)}}let ye=B.children;for(let Be=0,it=ye.length;Be<it;Be++)xt(ye[Be],pe,be,Le)}function Dt(B,pe,be,Le){let ye=B.opaque,Be=B.transmissive,it=B.transparent;v.setupLightsView(be),we===!0&&T.setGlobalState(_.clippingPlanes,be),Le&&W.viewport(I.copy(Le)),ye.length>0&&en(ye,pe,be),Be.length>0&&en(Be,pe,be),it.length>0&&en(it,pe,be),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function qt(B,pe,be,Le){if((be.isScene===!0?be.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[Le.id]===void 0&&(v.state.transmissionRenderTarget[Le.id]=new xi(1,1,{generateMipmaps:!0,type:N.has("EXT_color_buffer_half_float")||N.has("EXT_color_buffer_float")?Ar:Vi,minFilter:Pi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let ye=v.state.transmissionRenderTarget[Le.id],Be=Le.viewport||I;ye.setSize(Be.z*_.transmissionResolutionScale,Be.w*_.transmissionResolutionScale);let it=_.getRenderTarget(),Ne=_.getActiveCubeFace(),Ze=_.getActiveMipmapLevel();_.setRenderTarget(ye),_.getClearColor(j),re=_.getClearAlpha(),re<1&&_.setClearColor(16777215,.5),_.clear(),X&&H.render(be);let et=_.toneMapping;_.toneMapping=or;let St=Le.viewport;if(Le.viewport!==void 0&&(Le.viewport=void 0),v.setupLightsView(Le),we===!0&&T.setGlobalState(_.clippingPlanes,Le),en(B,be,Le),ce.updateMultisampleRenderTarget(ye),ce.updateRenderTargetMipmap(ye),N.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Fe=0,ot=pe.length;Fe<ot;Fe++){let ln=pe[Fe],yn=ln.object,$t=ln.geometry,Nt=ln.material,cn=ln.group;if(Nt.side===Yt&&yn.layers.test(Le.layers)){let rn=Nt.side;Nt.side=$n,Nt.needsUpdate=!0,un(yn,be,Le,$t,Nt,cn),Nt.side=rn,Nt.needsUpdate=!0,Je=!0}}Je===!0&&(ce.updateMultisampleRenderTarget(ye),ce.updateRenderTargetMipmap(ye))}_.setRenderTarget(it,Ne,Ze),_.setClearColor(j,re),St!==void 0&&(Le.viewport=St),_.toneMapping=et}function en(B,pe,be){let Le=pe.isScene===!0?pe.overrideMaterial:null;for(let ye=0,Be=B.length;ye<Be;ye++){let it=B[ye],Ne=it.object,Ze=it.geometry,et=it.group,St=it.material;St.allowOverride===!0&&Le!==null&&(St=Le),Ne.layers.test(be.layers)&&un(Ne,pe,be,Ze,St,et)}}function un(B,pe,be,Le,ye,Be){B.onBeforeRender(_,pe,be,Le,ye,Be),B.modelViewMatrix.multiplyMatrices(be.matrixWorldInverse,B.matrixWorld),B.normalMatrix.getNormalMatrix(B.modelViewMatrix),ye.onBeforeRender(_,pe,be,Le,B,Be),ye.transparent===!0&&ye.side===Yt&&ye.forceSinglePass===!1?(ye.side=$n,ye.needsUpdate=!0,_.renderBufferDirect(be,pe,Le,ye,B,Be),ye.side=Ws,ye.needsUpdate=!0,_.renderBufferDirect(be,pe,Le,ye,B,Be),ye.side=Yt):_.renderBufferDirect(be,pe,Le,ye,B,Be),B.onAfterRender(_,pe,be,Le,ye,Be)}function On(B,pe,be){pe.isScene!==!0&&(pe=Y);let Le=oe.get(B),ye=v.state.lights,Be=v.state.shadowsArray,it=ye.state.version,Ne=yt.getParameters(B,ye.state,Be,pe,be),Ze=yt.getProgramCacheKey(Ne),et=Le.programs;Le.environment=B.isMeshStandardMaterial?pe.environment:null,Le.fog=pe.fog,Le.envMap=(B.isMeshStandardMaterial?Ye:Pe).get(B.envMap||Le.environment),Le.envMapRotation=Le.environment!==null&&B.envMap===null?pe.environmentRotation:B.envMapRotation,et===void 0&&(B.addEventListener("dispose",Xe),et=new Map,Le.programs=et);let St=et.get(Ze);if(St!==void 0){if(Le.currentProgram===St&&Le.lightsStateVersion===it)return An(B,Ne),St}else Ne.uniforms=yt.getUniforms(B),B.onBeforeCompile(Ne,_),St=yt.acquireProgram(Ne,Ze),et.set(Ze,St),Le.uniforms=Ne.uniforms;let Je=Le.uniforms;return(B.isShaderMaterial||B.isRawShaderMaterial)&&B.clipping!==!0||(Je.clippingPlanes=T.uniform),An(B,Ne),Le.needsLights=(function(Fe){return Fe.isMeshLambertMaterial||Fe.isMeshToonMaterial||Fe.isMeshPhongMaterial||Fe.isMeshStandardMaterial||Fe.isShadowMaterial||Fe.isShaderMaterial&&Fe.lights===!0})(B),Le.lightsStateVersion=it,Le.needsLights&&(Je.ambientLightColor.value=ye.state.ambient,Je.lightProbe.value=ye.state.probe,Je.directionalLights.value=ye.state.directional,Je.directionalLightShadows.value=ye.state.directionalShadow,Je.spotLights.value=ye.state.spot,Je.spotLightShadows.value=ye.state.spotShadow,Je.rectAreaLights.value=ye.state.rectArea,Je.ltc_1.value=ye.state.rectAreaLTC1,Je.ltc_2.value=ye.state.rectAreaLTC2,Je.pointLights.value=ye.state.point,Je.pointLightShadows.value=ye.state.pointShadow,Je.hemisphereLights.value=ye.state.hemi,Je.directionalShadowMap.value=ye.state.directionalShadowMap,Je.directionalShadowMatrix.value=ye.state.directionalShadowMatrix,Je.spotShadowMap.value=ye.state.spotShadowMap,Je.spotLightMatrix.value=ye.state.spotLightMatrix,Je.spotLightMap.value=ye.state.spotLightMap,Je.pointShadowMap.value=ye.state.pointShadowMap,Je.pointShadowMatrix.value=ye.state.pointShadowMatrix),Le.currentProgram=St,Le.uniformsList=null,St}function Dr(B){if(B.uniformsList===null){let pe=B.currentProgram.getUniforms();B.uniformsList=Ks.seqWithValue(pe.seq,B.uniforms)}return B.uniformsList}function An(B,pe){let be=oe.get(B);be.outputColorSpace=pe.outputColorSpace,be.batching=pe.batching,be.batchingColor=pe.batchingColor,be.instancing=pe.instancing,be.instancingColor=pe.instancingColor,be.instancingMorph=pe.instancingMorph,be.skinning=pe.skinning,be.morphTargets=pe.morphTargets,be.morphNormals=pe.morphNormals,be.morphColors=pe.morphColors,be.morphTargetsCount=pe.morphTargetsCount,be.numClippingPlanes=pe.numClippingPlanes,be.numIntersection=pe.numClipIntersection,be.vertexAlphas=pe.vertexAlphas,be.vertexTangents=pe.vertexTangents,be.toneMapping=pe.toneMapping}ft.setAnimationLoop(function(B){Oe&&Oe(B)}),typeof self<"u"&&ft.setContext(self),this.setAnimationLoop=function(B){Oe=B,he.setAnimationLoop(B),B===null?ft.stop():ft.start()},he.addEventListener("sessionstart",ut),he.addEventListener("sessionend",at),this.render=function(B,pe){if(pe!==void 0&&pe.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(b===!0)return;if(B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),pe.parent===null&&pe.matrixWorldAutoUpdate===!0&&pe.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(pe),pe=he.getCamera()),B.isScene===!0&&B.onBeforeRender(_,B,pe,O),v=Mt.get(B,x.length),v.init(pe),x.push(v),De.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),Te.setFromProjectionMatrix(De,ir,pe.reversedDepth),J=this.localClippingEnabled,we=T.init(this.clippingPlanes,J),p=Et.get(B,y.length),p.init(),y.push(p),he.enabled===!0&&he.isPresenting===!0){let Be=_.xr.getDepthSensingMesh();Be!==null&&xt(Be,pe,-1/0,_.sortObjects)}xt(B,pe,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(Ie,ze),X=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,X&&H.addToRenderList(p,B),this.info.render.frame++,we===!0&&T.beginShadows();let be=v.state.shadowsArray;L.render(be,B,pe),we===!0&&T.endShadows(),this.info.autoReset===!0&&this.info.reset();let Le=p.opaque,ye=p.transmissive;if(v.setupLights(),pe.isArrayCamera){let Be=pe.cameras;if(ye.length>0)for(let it=0,Ne=Be.length;it<Ne;it++)qt(Le,ye,B,Be[it]);X&&H.render(B);for(let it=0,Ne=Be.length;it<Ne;it++){let Ze=Be[it];Dt(p,B,Ze,Ze.viewport)}}else ye.length>0&&qt(Le,ye,B,pe),X&&H.render(B),Dt(p,B,pe);O!==null&&D===0&&(ce.updateMultisampleRenderTarget(O),ce.updateRenderTargetMipmap(O)),B.isScene===!0&&B.onAfterRender(_,B,pe),ue.resetDefaultState(),F=-1,k=null,x.pop(),x.length>0?(v=x[x.length-1],we===!0&&T.setGlobalState(_.clippingPlanes,v.state.camera)):v=null,y.pop(),p=y.length>0?y[y.length-1]:null},this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(B,pe,be){let Le=oe.get(B);Le.__autoAllocateDepthBuffer=B.resolveDepthBuffer===!1,Le.__autoAllocateDepthBuffer===!1&&(Le.__useRenderToTexture=!1),oe.get(B.texture).__webglTexture=pe,oe.get(B.depthTexture).__webglTexture=Le.__autoAllocateDepthBuffer?void 0:be,Le.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(B,pe){let be=oe.get(B);be.__webglFramebuffer=pe,be.__useDefaultFramebuffer=pe===void 0};let Li=w.createFramebuffer();this.setRenderTarget=function(B,pe=0,be=0){O=B,S=pe,D=be;let Le=!0,ye=null,Be=!1,it=!1;if(B){let Ne=oe.get(B);if(Ne.__useDefaultFramebuffer!==void 0)W.bindFramebuffer(w.FRAMEBUFFER,null),Le=!1;else if(Ne.__webglFramebuffer===void 0)ce.setupRenderTarget(B);else if(Ne.__hasExternalTextures)ce.rebindTextures(B,oe.get(B.texture).__webglTexture,oe.get(B.depthTexture).__webglTexture);else if(B.depthBuffer){let St=B.depthTexture;if(Ne.__boundDepthTexture!==St){if(St!==null&&oe.has(St)&&(B.width!==St.image.width||B.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ce.setupDepthRenderbuffer(B)}}let Ze=B.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(it=!0);let et=oe.get(B).__webglFramebuffer;B.isWebGLCubeRenderTarget?(ye=Array.isArray(et[pe])?et[pe][be]:et[pe],Be=!0):ye=B.samples>0&&ce.useMultisampledRTT(B)===!1?oe.get(B).__webglMultisampledFramebuffer:Array.isArray(et)?et[be]:et,I.copy(B.viewport),U.copy(B.scissor),K=B.scissorTest}else I.copy(Ae).multiplyScalar(de).floor(),U.copy(Ve).multiplyScalar(de).floor(),K=ie;if(be!==0&&(ye=Li),W.bindFramebuffer(w.FRAMEBUFFER,ye)&&Le&&W.drawBuffers(B,ye),W.viewport(I),W.scissor(U),W.setScissorTest(K),Be){let Ne=oe.get(B.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ne.__webglTexture,be)}else if(it){let Ne=pe;for(let Ze=0;Ze<B.textures.length;Ze++){let et=oe.get(B.textures[Ze]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Ze,et.__webglTexture,be,Ne)}}else if(B!==null&&be!==0){let Ne=oe.get(B.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ne.__webglTexture,be)}F=-1},this.readRenderTargetPixels=function(B,pe,be,Le,ye,Be,it,Ne=0){if(!B||!B.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ze=oe.get(B).__webglFramebuffer;if(B.isWebGLCubeRenderTarget&&it!==void 0&&(Ze=Ze[it]),Ze){W.bindFramebuffer(w.FRAMEBUFFER,Ze);try{let et=B.textures[Ne],St=et.format,Je=et.type;if(!q.textureFormatReadable(St))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!q.textureTypeReadable(Je))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");pe>=0&&pe<=B.width-Le&&be>=0&&be<=B.height-ye&&(B.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ne),w.readPixels(pe,be,Le,ye,ee.convert(St),ee.convert(Je),Be))}finally{let et=O!==null?oe.get(O).__webglFramebuffer:null;W.bindFramebuffer(w.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(B,pe,be,Le,ye,Be,it,Ne=0){if(!B||!B.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ze=oe.get(B).__webglFramebuffer;if(B.isWebGLCubeRenderTarget&&it!==void 0&&(Ze=Ze[it]),Ze){if(pe>=0&&pe<=B.width-Le&&be>=0&&be<=B.height-ye){W.bindFramebuffer(w.FRAMEBUFFER,Ze);let et=B.textures[Ne],St=et.format,Je=et.type;if(!q.textureFormatReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!q.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Fe=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Fe),w.bufferData(w.PIXEL_PACK_BUFFER,Be.byteLength,w.STREAM_READ),B.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ne),w.readPixels(pe,be,Le,ye,ee.convert(St),ee.convert(Je),0);let ot=O!==null?oe.get(O).__webglFramebuffer:null;W.bindFramebuffer(w.FRAMEBUFFER,ot);let ln=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await ip(w,ln,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Fe),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,Be),w.deleteBuffer(Fe),w.deleteSync(ln),Be}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(B,pe=null,be=0){let Le=Math.pow(2,-be),ye=Math.floor(B.image.width*Le),Be=Math.floor(B.image.height*Le),it=pe!==null?pe.x:0,Ne=pe!==null?pe.y:0;ce.setTexture2D(B,0),w.copyTexSubImage2D(w.TEXTURE_2D,be,0,0,it,Ne,ye,Be),W.unbindTexture()};let Ur=w.createFramebuffer(),hr=w.createFramebuffer();this.copyTextureToTexture=function(B,pe,be=null,Le=null,ye=0,Be=null){let it,Ne,Ze,et,St,Je,Fe,ot,ln;Be===null&&(ye!==0?(Ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Be=ye,ye=0):Be=0);let yn=B.isCompressedTexture?B.mipmaps[Be]:B.image;if(be!==null)it=be.max.x-be.min.x,Ne=be.max.y-be.min.y,Ze=be.isBox3?be.max.z-be.min.z:1,et=be.min.x,St=be.min.y,Je=be.isBox3?be.min.z:0;else{let Zn=Math.pow(2,-ye);it=Math.floor(yn.width*Zn),Ne=Math.floor(yn.height*Zn),Ze=B.isDataArrayTexture?yn.depth:B.isData3DTexture?Math.floor(yn.depth*Zn):1,et=0,St=0,Je=0}Le!==null?(Fe=Le.x,ot=Le.y,ln=Le.z):(Fe=0,ot=0,ln=0);let $t=ee.convert(pe.format),Nt=ee.convert(pe.type),cn;pe.isData3DTexture?(ce.setTexture3D(pe,0),cn=w.TEXTURE_3D):pe.isDataArrayTexture||pe.isCompressedArrayTexture?(ce.setTexture2DArray(pe,0),cn=w.TEXTURE_2D_ARRAY):(ce.setTexture2D(pe,0),cn=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,pe.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pe.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,pe.unpackAlignment);let rn=w.getParameter(w.UNPACK_ROW_LENGTH),It=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Tt=w.getParameter(w.UNPACK_SKIP_PIXELS),Qn=w.getParameter(w.UNPACK_SKIP_ROWS),ur=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,yn.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,yn.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,et),w.pixelStorei(w.UNPACK_SKIP_ROWS,St),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Je);let _n=B.isDataArrayTexture||B.isData3DTexture,fi=pe.isDataArrayTexture||pe.isData3DTexture;if(B.isDepthTexture){let Zn=oe.get(B),Qt=oe.get(pe),mi=oe.get(Zn.__renderTarget),Qs=oe.get(Qt.__renderTarget);W.bindFramebuffer(w.READ_FRAMEBUFFER,mi.__webglFramebuffer),W.bindFramebuffer(w.DRAW_FRAMEBUFFER,Qs.__webglFramebuffer);for(let gi=0;gi<Ze;gi++)_n&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,oe.get(B).__webglTexture,ye,Je+gi),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,oe.get(pe).__webglTexture,Be,ln+gi)),w.blitFramebuffer(et,St,it,Ne,Fe,ot,it,Ne,w.DEPTH_BUFFER_BIT,w.NEAREST);W.bindFramebuffer(w.READ_FRAMEBUFFER,null),W.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(ye!==0||B.isRenderTargetTexture||oe.has(B)){let Zn=oe.get(B),Qt=oe.get(pe);W.bindFramebuffer(w.READ_FRAMEBUFFER,Ur),W.bindFramebuffer(w.DRAW_FRAMEBUFFER,hr);for(let mi=0;mi<Ze;mi++)_n?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Zn.__webglTexture,ye,Je+mi):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Zn.__webglTexture,ye),fi?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Qt.__webglTexture,Be,ln+mi):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Qt.__webglTexture,Be),ye!==0?w.blitFramebuffer(et,St,it,Ne,Fe,ot,it,Ne,w.COLOR_BUFFER_BIT,w.NEAREST):fi?w.copyTexSubImage3D(cn,Be,Fe,ot,ln+mi,et,St,it,Ne):w.copyTexSubImage2D(cn,Be,Fe,ot,et,St,it,Ne);W.bindFramebuffer(w.READ_FRAMEBUFFER,null),W.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else fi?B.isDataTexture||B.isData3DTexture?w.texSubImage3D(cn,Be,Fe,ot,ln,it,Ne,Ze,$t,Nt,yn.data):pe.isCompressedArrayTexture?w.compressedTexSubImage3D(cn,Be,Fe,ot,ln,it,Ne,Ze,$t,yn.data):w.texSubImage3D(cn,Be,Fe,ot,ln,it,Ne,Ze,$t,Nt,yn):B.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,Be,Fe,ot,it,Ne,$t,Nt,yn.data):B.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,Be,Fe,ot,yn.width,yn.height,$t,yn.data):w.texSubImage2D(w.TEXTURE_2D,Be,Fe,ot,it,Ne,$t,Nt,yn);w.pixelStorei(w.UNPACK_ROW_LENGTH,rn),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,It),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Tt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Qn),w.pixelStorei(w.UNPACK_SKIP_IMAGES,ur),Be===0&&pe.generateMipmaps&&w.generateMipmap(cn),W.unbindTexture()},this.initRenderTarget=function(B){oe.get(B).__webglFramebuffer===void 0&&ce.setupRenderTarget(B)},this.initTexture=function(B){B.isCubeTexture?ce.setTextureCube(B,0):B.isData3DTexture?ce.setTexture3D(B,0):B.isDataArrayTexture||B.isCompressedArrayTexture?ce.setTexture2DArray(B,0):ce.setTexture2D(B,0),W.unbindTexture()},this.resetState=function(){S=0,D=0,O=null,W.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ir}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Jt._getUnpackColorSpace()}};function Qa(r){let e=new Set,t=new Set,n=new Set,i=s=>{Array.isArray(s)?s.forEach(i):s?.isMaterial&&t.add(s)};r.traverse(s=>{s.geometry&&e.add(s.geometry),i(s.material),i(s.customDepthMaterial),i(s.customDistanceMaterial)});for(let s of t){for(let a of Object.values(s))a?.isTexture&&n.add(a);s.dispose()}n.forEach(s=>s.dispose()),e.forEach(s=>s.dispose())}function Op(r,e,t=.18){return Math.max(0,r+t-e)}function Yl(r){let e=[[-2.6,.22],[-1.8,.42],[-1.3,.76],[-.65,.94],[-.1,.91],[.35,.68],[.8,.3],[1.25,.19],[1.65,.17]];if(r<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++){let[n,i]=e[t],[s,a]=e[t-1];if(r<=n){let o=(r-s)/(n-s),l=o*o*(3-2*o);return a+(i-a)*l}}return e.at(-1)[1]}function zp(r,e=[]){let t=!1,n=new Map,i=new Set(e),s=new A;function a(o){for(let l=o;l&&l!==r;l=l.parent)if(i.has(l)||l.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(l.name)||l.name.startsWith("front-wing-")&&o.name!=="tapered-nose")return!0;return!1}return{set(o){o=!!o;let l=o!==t;if(!l&&!o)return;t=o,r.updateWorldMatrix(!0,!0);let c=r.matrixWorld.clone().invert();r.traverse(h=>{if(!h.geometry||a(h))return;let u=h.geometry,d=u.getAttribute("position");if(!d||!l&&n.has(u))return;n.has(u)||n.set(u,new Float32Array(d.array));let f=n.get(u);if(d.array.set(f),o){let g=new vt().multiplyMatrices(c,h.matrixWorld),m=g.clone().invert();for(let p=0;p<d.count;p++)s.fromBufferAttribute(d,p).applyMatrix4(g),s.z*=Yl(s.x),s.y>1.08&&(s.y=1.08+(s.y-1.08)*.68),s.applyMatrix4(m),d.setXYZ(p,s.x,s.y,s.z)}d.needsUpdate=!0,u.computeVertexNormals(),u.computeBoundingBox(),u.computeBoundingSphere()})}}}function Gp({paint:r,carbon:e,metal:t}){let n=new ke;n.name="formula-cockpit";function i(d,f,g,m){let p=new qe(new Ct(new Rt(d.map(v=>new A(...v))),40,f,10,!1),g);return p.name=m,p.castShadow=p.receiveShadow=!0,n.add(p),p}i([[-1.03,1.47,-.64],[-.99,2.48,-.64],[-.38,2.55,-.65],[.53,2.49,-.46],[1,2.4,0],[.53,2.49,.46],[-.38,2.55,.65],[-.99,2.48,.64],[-1.03,1.47,.64]],.043,e,"halo-ring"),i([[1,2.4,0],[1.13,1.93,0],[1.22,1.44,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.34],[-1.27,2.53,-.28],[-1.22,2.65,0],[-1.27,2.53,.28],[-1.25,1.4,.34]],.048,e,"roll-hoop");for(let d of[-1,1])for(let f of[.67,.94])i([[1.19,f,d*.34],[1.92,f-.12,d*1.24],[2.22,f,d*.31]],.024,e,"front-wishbone");let s=new ke;s.name="formula-engine-cover";let a=[],o=[],l=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],c=32;l.forEach(([d,f,g,m],p)=>{for(let v=0;v<=c;v++){let y=v/c*Math.PI*2;if(a.push(d,f+Math.sin(y)*m,Math.cos(y)*g),p<l.length-1&&v<c){let x=p*(c+1)+v,_=x+c+1;o.push(x,_,x+1,x+1,_,_+1)}}});for(let d of[0,l.length-1])for(let f=1;f<c-1;f++){let g=d*(c+1);d===0?o.push(g,g+f,g+f+1):o.push(g,g+f+1,g+f)}let h=new pt;h.setAttribute("position",new Re(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new qe(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let f=0;f<5;f++){let g=new qe(new nt(.025,.07,.19),e);g.position.set(-1.48-f*.13,1.57-f*.055,d*.31),g.rotation.z=-.2,s.add(g)}return n.add(s),{group:n,engine:s}}function kp(r,e,t){let n=e.hat,i=new ke,s=[],a=[],o=[];if(!n||n==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};i.name="headwear:"+n;let l=(v,y=.88,x=0)=>{let _=new wt({color:v,roughness:y,metalness:x,side:Yt});return a.push(_),_},c=l(t.item("hat",n).color),h=l(new dt(t.item("hat",n).color).multiplyScalar(.66)),u=l("#a79672"),d=l("#242422"),f=(v,y)=>{s.push(v);let x=new qe(v,y);return x.castShadow=x.receiveShadow=!0,i.add(x),x},g=(v,y,x,_=!1)=>f(new Ct(new Rt(v.map(b=>new A(...b)),_),64,y,8,_),x);function m(v,y,x,_,b){let S=[];for(let D=0;D<64;D++){let O=D/64*Math.PI*2;S.push([Math.cos(O)*y,v,.015+Math.sin(O)*x])}g(S,_,b,!0)}function p(v,y,x,_,b){let S=[],D=[],O=[];for(let U=0;U<=12;U++)for(let K=0;K<=96;K++){let j=K/96*Math.PI*2,re=U/12,ge=v+(y-v)*re;if(S.push(ge*Math.cos(j),x-_*re*re,.015+ge*.92*Math.sin(j)),D.push(K/96,U/12),U<12&&K<96){let Q=U*97+K;O.push(Q,Q+1,Q+96+1,Q+1,Q+96+2,Q+96+1)}}let I=new pt;I.setAttribute("position",new Re(S,3)),I.setAttribute("uv",new Re(D,2)),I.setIndex(O),I.computeVertexNormals(),f(I,b),m(x-_,y,y*.92,.004,h)}if(/straw/i.test(n)){let v=new $e(.245,.282,.245,64,8);v.translate(0,1.955,.015),f(v,c),p(.27,.48,1.836,.03,c),m(1.854,.285,.269,.017,d);for(let y=1.86;y<2.075;y+=.012)m(y,.282-(y-1.83)*.14,.26-(y-1.83)*.12,.0014,u);for(let y=.3;y<.48;y+=.013)m(1.836-.03*((y-.27)/.21)**2,y,y*.92,.0012,u)}else if(/bucket|duck/i.test(n)){let v=new $e(.255,.293,.215,64,8);v.translate(0,1.952,.015),f(v,c),p(.29,.363,1.845,.053,c),m(1.85,.294,.276,.0025,h),m(2.054,.255,.245,.002,h);let y=document.createElement("canvas");y.width=y.height=256;let x=y.getContext("2d");x.fillStyle=t.item("hat",n).color,x.fillRect(0,0,256,256);for(let b=30;b<256;b+=70)for(let S=20;S<256;S+=80)x.fillStyle="#d9ad42",x.beginPath(),x.ellipse(S,b,12,8,0,0,Math.PI*2),x.fill(),x.beginPath(),x.arc(S+9,b-7,6,0,Math.PI*2),x.fill(),x.fillStyle="#e89c34",x.fillRect(S+13,b-8,6,3),x.fillStyle="#201a13",x.fillRect(S+10,b-9,2,2);let _=new kt(y);_.colorSpace=bt,_.wrapS=_.wrapT=bn,_.repeat.set(4,1),o.push(_),c.map=_}else{let v=new Ot(1,64,36,0,Math.PI*2,0,Math.PI*.51);v.scale(.305,.235,.288),v.translate(0,1.82,.015),f(v,c),m(1.818,.305,.288,.007,h);let y=[],x=[],_=[],b=32,S=16;for(let k=0;k<=S;k++)for(let I=0;I<=b;I++){let U=I/b*2-1,K=k/S,j=U*(.292-.018*K),re=.17+.4*Math.sqrt(Math.max(.08,1-U*U))*K,ge=1.814-.028*K-.027*U*U*K;if(y.push(j,ge,re),x.push(I/b,k/S),I<b&&k<S){let Q=k*(b+1)+I;_.push(Q,Q+1,Q+b+1,Q+1,Q+b+2,Q+b+1)}}let D=new pt;D.setAttribute("position",new Re(y,3)),D.setAttribute("uv",new Re(x,2)),D.setIndex(_),D.computeVertexNormals(),f(D,c);let O=[];for(let k=0;k<=b;k++){let I=k/b*2-1;O.push([I*.274,1.786-.027*I*I,.17+.4*Math.sqrt(Math.max(.08,1-I*I))])}g(O,.004,h);for(let k=0;k<6;k++){let I=k/6*Math.PI*2,U=[];for(let K=0;K<=24;K++){let j=K/24*Math.PI/2;U.push([.307*Math.sin(j)*Math.cos(I),1.82+.237*Math.cos(j),.015+.29*Math.sin(j)*Math.sin(I)])}g(U,.0017,h)}let F=new Ot(.015,20,12);if(F.translate(0,2.058,.015),f(F,h),/propeller/i.test(n)){let k=l("#c7c4b9",.35,.8),I=new $e(.006,.006,.065,12);I.translate(0,2.09,.015),f(I,k);for(let U=0;U<3;U++){let K=new Ot(1,20,12);K.scale(.115,.007,.027),K.translate(.086,0,0),K.rotateY(U/3*Math.PI*2),K.translate(0,2.126,.015),f(K,l(["#ba3847","#3e83ae","#d4b74a"][U]))}}else{let k=document.createElement("canvas");k.width=256,k.height=128;let I=k.getContext("2d");I.clearRect(0,0,256,128),I.fillStyle="#d0b77a",I.font="bold 62px Arial",I.textAlign="center",I.fillText("P21",128,88);let U=new kt(k);U.colorSpace=bt,o.push(U);let K=new wt({map:U,transparent:!0,alphaTest:.1,roughness:.9});a.push(K);let j=new Xt(.12,.06);j.translate(0,1.945,.265),f(j,K)}}return r.bones.head.add(i),i.position.copy(new A(...r.bones.head.userData.rest).negate()),{dispose(){i.removeFromParent(),s.forEach(v=>v.dispose()),a.forEach(v=>v.dispose()),o.forEach(v=>v.dispose())}}}var Wi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Vp(r){let e=[],t={};function n(p,v,y,x,_=0){let b=new Fs;b.name=p;let S=v?v.userData.rest:[0,0,0];return b.position.set(y-S[0],x-S[1],_-S[2]),b.userData.rest=[y,x,_],(v||r).add(b),e.push(b),t[p]=b,b}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),l=n("head",o,0,1.4,.1);for(let[p,v]of[["left",-1],["right",1]]){let y=n(p+"Shoulder",a,v*.49,1.09),x=n(p+"Elbow",y,v*.66,.57),_=n(p+"Wrist",x,v*.78,.04,.035),b=n(p+"Hand",_,v*.79,-.15,.07);for(let O=0;O<4;O++)n(p+"Finger"+O,b,v*(.5-(.175+O*.019))*2.55,-.17-O*.007,.07);n(p+"Thumb",b,v*.63,-.13,.11);let S=n(p+"Hip",i,v*.23,-.2,-.01),D=n(p+"Knee",S,v*.34,-.77,-.01);n(p+"Ankle",D,v*.44,-1.3,.08)}r.updateMatrixWorld(!0);let c=new Ea(e);function h(p,v,y){let x=v<.5?"left":"right",_=i,b=i,S=0;if(p===1)_=s,b=a,S=1-Wi(.25,.44,y);else if(p===2||p===9)y<.25?(_=a,b=t[x+"Shoulder"],S=Wi(.175,.245,y)):y<.4?(_=t[x+"Shoulder"],b=t[x+"Elbow"],S=Wi(.29,.38,y)):(_=t[x+"Elbow"],b=t[x+"Wrist"],S=Wi(.43,.49,y));else if(p===3){let D=v<.5?v:1-v;y>.54?(_=t[x+"Hand"],b=t[x+(D>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((D-.175)/.019))))],S=Wi(.54,.566,y)):(_=t[x+"Wrist"],b=t[x+"Hand"],S=Wi(.49,.53,y))}else p===4?y<.57?(_=i,b=t[x+"Hip"],S=Wi(.5,.57,y)):y<.76?(_=t[x+"Hip"],b=t[x+"Knee"],S=Wi(.66,.74,y)):(_=t[x+"Knee"],b=t[x+"Ankle"],S=Wi(.79,.84,y)):p===5||p===8?_=b=t[x+"Ankle"]:p===6||p===10?_=b=l:p===7&&(_=a,b=o,S=1-Wi(.17,.225,y));return{indices:[e.indexOf(_),e.indexOf(b),0,0],weights:[1-S,S,0,0]}}function u(p,v){let y=p.getAttribute("bodyUv"),x=p.getAttribute("surface"),_=[],b=[];for(let D=0;D<y.count;D++){let O=h(x.getX(D),y.getX(D),y.getY(D));_.push(...O.indices),b.push(...O.weights)}p.setAttribute("skinIndex",new Xr(_,4)),p.setAttribute("skinWeight",new Re(b,4));let S=new wa(p,v);return r.add(S),S.bind(c,new vt),S.frustumCulled=!1,S}let d=0,f=!1;function g(p,v,y){d+=(Number(v)-d)*(1-Math.exp(-Math.min(.1,y)*9));let x=Math.sin(p*1.55)*d;a.scale.set(1+x*.003,1+x*.003,1+x*.007),l.rotation.set(Math.sin(p*.57)*.01*d,(f?.025:0)+Math.sin(p*.36)*.024*d,(f?-.016:0)+Math.sin(p*.41)*.008*d);for(let[_,b]of[["left",-1],["right",1]]){t[_+"Shoulder"].rotation.z=(f?b*.026:0)+(Math.sin(p*.79+b*.5)*.009+b*.005)*d,t[_+"Elbow"].rotation.x=(f?b<0?-.045:-.085:0)+(Math.sin(p*.67+b*.4)*.012-.025)*d,t[_+"Hand"].rotation.x=(f?.025:0)+Math.sin(p*.61+b)*.01*d;for(let S=0;S<4;S++)t[_+"Finger"+S].rotation.x=(.035+Math.sin(p*.53+S*.25+b)*.012)*d}r.updateMatrixWorld(!0),c.update()}function m(p,v){r.updateMatrixWorld(!0),t[v].attach(p)}return{skeleton:c,bones:t,mesh:u,update:g,attach:m,weights:h,setRelaxedPose(p){f=!!p},dispose(){c.dispose()}}}var Zl=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function Hp(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,l,c)=>{if(c===1){let h=Zl(o,.25,.12),u=Zl(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,l*=n,l+=s*u*(l>0?1:.15)}if(c===2){let h=(i-1)*Zl(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),l*=1+h}if(c===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*Zl(o,.69,.16);a=h+(a-h)*(1+u),l*=1+u}return[a,o,l]}}function Wp(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new wt({color:i[t]||"#30241d",roughness:.96}),a=new Uint8Array(16384*4);for(let u=0;u<128;u++)for(let d=0;d<128;d++){let f=(u*128+d)*4,g=Math.sin(d*127.1+u*311.7)*43758.5453,m=128+Math.round(28*Math.sin(u*1.7)+28*(g-Math.floor(g)-.5));a[f]=a[f+1]=a[f+2]=m,a[f+3]=255}let o=new sr(a,128,128);o.wrapS=o.wrapT=bn,o.repeat.set(3,3),o.magFilter=ii,o.minFilter=Pi,o.generateMipmaps=!0,o.needsUpdate=!0,s.bumpMap=o,s.bumpScale=.002;let l=e.sculptHairTexture?.clone();l&&(l.center.set(.5,.5),l.rotation=Math.PI/2,l.repeat.set(2,2),l.needsUpdate=!0,s.bumpMap=l,s.bumpScale=.0024,i[t]||(s.map=l,s.color.set("#c7b9a4")));let c=new ke;c.name="hairstyle:"+t;function h(u,d,f,g,m,p,v=0){let y=new Ot(1,12,10);n.push(y);let x=new qe(y,s);x.position.set(u,d,f),x.scale.set(g,m,p),x.rotation.z=v,c.add(x)}if(t==="hairDreads"){let u=new Ot(1,48,24,0,Math.PI*2,0,Math.PI*.62);u.scale(.275,.292,.278),u.translate(0,1.62,.1),n.push(u),c.add(new qe(u,s));for(let d=0;d<5;d++)for(let f=0;f<11;f++){let g=(f+d%2*.5)/11*Math.PI*2,m=.3+d*.28,p=Math.cos(g)*Math.sin(m)*.278,v=.1+Math.sin(g)*Math.sin(m)*.285,y=1.62+Math.cos(m)*.299;if(Math.sin(g)>.25&&d===4)continue;let x=Math.sin(g)>.25?Math.min(.1+d*.035,Math.max(.035,y-1.7)):.1+d*.035,_=[new A(p,y,v),new A(p*1.1,y-.035,.1+(v-.1)*1.12),new A(p*1.16,y-x*.65,.1+(v-.1)*1.17),new A(p*1.12,y-x,.1+(v-.1)*1.18)],b=new Ct(new Rt(_),16,.02,8,!1),S=b.getAttribute("position");for(let D=0;D<=16;D++){let O=new A;for(let k=0;k<=8;k++)O.add(new A().fromBufferAttribute(S,D*9+k));O.multiplyScalar(1/9);let F=(1-.6*Math.pow(D/16,5))*(1+.045*Math.sin(D*2.4+f));for(let k=0;k<=8;k++){let I=D*9+k,U=new A().fromBufferAttribute(S,I).sub(O).multiplyScalar(F).add(O);S.setXYZ(I,U.x,U.y,U.z)}}b.computeVertexNormals(),n.push(b),c.add(new qe(b,s))}}else if(t!=="hairBald"){let u=t==="hairBuzz",d=t==="hairAfro",f=t==="hairMohawk"||t==="hairBlue",g=t==="hairDreads",m=t==="hairRocker";for(let p=0;p<7;p++)for(let v=0;v<12;v++){let y=v/12*Math.PI*2,x=p/7*Math.PI*.57;if(f&&Math.abs(Math.cos(y))>.27)continue;let _=Math.cos(y)*Math.sin(x)*.23,b=.1+Math.sin(y)*Math.sin(x)*.24,S=t==="hairCurly"||d,D=u?.026:S?.067:.045,O=u?.018:d?.12:f?.16:S?.065:.075,F=1.62+Math.cos(x)*.29;t==="hairPompadour"&&(O+=Math.max(0,Math.sin(y))*.1,F+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(F+=_*.16),(g||m)&&(O=p>3?.18:.065,F-=p>3?.07:0),h(_,F,b,D,O,D,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(c),c.position.copy(r.bones.head.userData.rest?new A(...r.bones.head.userData.rest).negate():new A),c.position.y+=e.sculptHairOffset||0,c.position.z+=e.sculptHairDepth||0,{dispose(){c.removeFromParent(),n.forEach(u=>u.dispose()),s.dispose(),o.dispose(),l?.dispose()}}}function Xp(r,e,t){let n=[],i=[],s=new ke;if(!e.glasses||e.glasses==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};s.name="eyewear:"+e.glasses;let a=e.glasses,o=/round|rimless/.test(a),l=/sport/.test(a),c=/Gold|Silver|browline/.test(a),h=new wt({color:t.item("glasses",a).color,metalness:c?.85:.08,roughness:c?.28:.38}),u=new Sn({color:l?"#406d80":"#182322",metalness:l?.65:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.08,transparent:!0,opacity:.94,side:Yt});i.push(h,u);let d=(g,m)=>{n.push(g);let p=new qe(g,m);return s.add(p),p},f=(g,m)=>d(new Ct(new Rt(g.map(p=>new A(...p))),32,m,8,!1),h);for(let g of[-1,1]){let m=g*.125,p=1.63,v=.391,y=l?.127:.112,x=o?.079:l?.06:.067,_=[],b=new Wt;for(let O=0;O<=64;O++){let F=O/64*Math.PI*2,k=Math.cos(F),I=Math.sin(F),U=y*(o?k:Math.sign(k)*Math.pow(Math.abs(k),.65)),K=x*(o?I:Math.sign(I)*Math.pow(Math.abs(I),.65));O===0?b.moveTo(U,K):b.lineTo(U,K),_.push(new A(m+U,p+K,v-Math.abs(U)*.16))}let S=new ar(b,32);S.translate(m,p,v-.005),d(S,u),d(new Ct(new Rt(_,!0),64,c?.0045:.0085,8,!0),h),f([[g*.233,p+.008,.376],[g*.256,p+.004,.3],[g*.273,p-.005,.17],[g*.282,p-.024,.085]],c?.0045:.008);let D=new Ot(.011,16,10);D.translate(g*.237,p+.009,.374),d(D,h)}return f([[-.025,1.644,.389],[0,1.655,.404],[.025,1.644,.389]],c?.004:.006),r.bones.head.add(s),s.position.copy(new A(...r.bones.head.userData.rest).negate()),s.position.z+=e.sculptEyewearDepth||0,{dispose(){s.removeFromParent(),n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}function jp(r,e="#c5b899"){let t=new ke;t.name="wardrobe-wrist-watch",t.position.set(.744,.015,.026),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new wt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new wt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(_,b,S,D,O)=>{let F=new qe(_,b);return F.position.set(S,D,O),t.add(F),F},o=a(new Ut(.072,.012,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.9,!/Dress|Pilot|smart/i.test(r))for(let _=0;_<18;_++){let b=_*Math.PI/9,S=a(new nt(.026,.049,.016),i,Math.cos(b)*.065,0,Math.sin(b)*.072);S.rotation.y=-b}let l=/square|smart/i.test(r),c=a(l?new nt(.147,.153,.022):new $e(.078,.073,.022,64),i,0,0,.078);if(l||(c.rotation.x=Math.PI/2),!l)a(new Ut(.069,.006,12,64),i,0,0,.095);else for(let[_,b,S,D]of[[-.071,0,.008,.15],[.071,0,.008,.15],[0,.071,.14,.008],[0,-.071,.14,.008]])a(new nt(S,D,.009),i,_,b,.095);let h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),f=/Daytona|square|rose/i.test(r),g=u.createRadialGradient(190,170,20,256,256,256);g.addColorStop(0,d?"#237050":f?"#fff7db":"#294559"),g.addColorStop(1,d?"#072b20":f?"#c7c4b4":"#06121c"),u.fillStyle=g,u.fillRect(0,0,512,512),u.translate(256,256);for(let _=0;_<60;_++)u.save(),u.rotate(_*Math.PI/30),u.strokeStyle=f?"#283333":"#f2dfb3",u.lineWidth=_%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,_%5?-207:-184),u.stroke(),u.restore();let m=(_,b,S)=>{u.save(),u.rotate(_),u.strokeStyle=f?"#203337":"#f4e4bb",u.lineWidth=S,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-b),u.stroke(),u.restore()};if(m(-Math.PI/3,112,13),m(Math.PI/3,168,9),m(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=f?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80),/GMT/i.test(r)){for(let _=0;_<24;_++)u.beginPath(),u.strokeStyle=_<12?"#a52d40":"#274e9a",u.lineWidth=24,u.arc(0,0,240,_*Math.PI/12,(_+1)*Math.PI/12),u.stroke();m(-Math.PI*.55,172,6)}if(/Daytona/i.test(r))for(let[_,b]of[[-91,35],[91,35],[0,128]])u.fillStyle="#182027",u.beginPath(),u.arc(_,b,48,0,Math.PI*2),u.fill(),u.strokeStyle="#e3dfd3",u.lineWidth=3,u.beginPath(),u.moveTo(_,b),u.lineTo(_+17,b-28),u.stroke();if(/Skeleton/i.test(r))for(let[_,b,S]of[[-60,60,65],[80,45,43],[15,-115,40]]){u.strokeStyle="#d6b783",u.lineWidth=9,u.beginPath(),u.arc(_,b,S,0,Math.PI*2),u.stroke();for(let D=0;D<8;D++){let O=D*Math.PI/4;u.beginPath(),u.moveTo(_+Math.cos(O)*15,b+Math.sin(O)*15),u.lineTo(_+Math.cos(O)*S,b+Math.sin(O)*S),u.stroke()}}/smart/i.test(r)&&(u.fillStyle="#06131d",u.fillRect(-256,-256,512,512),u.fillStyle="#8ae9c7",u.font="bold 100px Arial",u.fillText("10:10",0,10),u.font="32px Arial",u.fillText("POKER21",0,88));let p=new kt(h);p.colorSpace=bt,p.anisotropy=4;let v=a(l?new Xt(.13,.13):new Xn(.066,64),new wt({map:p,roughness:.34,metalness:.1}),0,0,.098),y=a(l?new Xt(.13,.13):new Xn(.066,64),new Sn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.101),x=a(new $e(.012,.012,.019,16),i,.085,0,.08);return x.rotation.z=Math.PI/2,{group:t,dispose(){let _=new Set;t.traverse(b=>{b.geometry?.dispose(),b.material&&_.add(b.material)});for(let b of _)b.dispose();p.dispose()}}}function qp(r="#d3b15b",e="rubyLion"){let t=new ke;t.name="wardrobe-finger-ring",t.position.set(.731,-.225,.07);let n=["silverSpade","clubSignet","diamondKing"].includes(e),i=new wt({color:n?"#c6d3df":"#c5a14d",metalness:.9,roughness:.24}),s=new Sn({color:e==="rubyLion"?"#a51c39":e==="emeraldCrown"?"#167953":e==="diamondKing"?"#e8f7ff":r,metalness:.08,roughness:.1,clearcoat:1}),a=new qe(new Ut(.026,.006,12,48),i);a.name="ring-band",a.rotation.x=Math.PI/2,t.add(a);let o=new qe(e==="clubSignet"?new $e(.021,.019,.012,8):new nt(.029,.029,.012),i);e==="clubSignet"&&(o.rotation.x=Math.PI/2),o.name="ring-bezel",o.position.z=.028,t.add(o);let l;if(e==="silverSpade"){let h=new Wt;h.moveTo(0,.019),h.bezierCurveTo(-.008,.007,-.022,-.002,-.012,-.009),h.quadraticCurveTo(-.004,-.014,0,-.006),h.quadraticCurveTo(.004,-.014,.012,-.009),h.bezierCurveTo(.022,-.002,.008,.007,0,.019),h.lineTo(.006,-.017),h.lineTo(-.006,-.017),h.closePath(),l=new Vt(h,{depth:.003,bevelEnabled:!1})}else e==="clubSignet"||e==="goldAces"?l=new nt(.022,.025,.004):l=e==="emeraldCrown"?new nt(.02,.024,.012):new Vs(e==="diamondKing"?.021:.017);let c=new qe(l,e==="silverSpade"||e==="goldAces"?i:s);if(c.name="ring-face:"+e,c.scale.z=.5,c.position.z=.039,t.add(c),["clubSignet","goldAces"].includes(e)){let h=document.createElement("canvas");h.width=h.height=128;let u=h.getContext("2d");u.fillStyle=n?"#24343d":"#45341a",u.fillRect(0,0,128,128),u.fillStyle=n?"#e1eaf1":"#edce83",u.font="bold 48px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText(e==="goldAces"?"AA":"P21",64,66,116),s.map=new kt(h),s.map.colorSpace=bt,c.material=s}return{group:t,dispose(){t.traverse(h=>h.geometry?.dispose()),s.map?.dispose(),i.dispose(),s.dispose()}}}var Jl=new Map;async function U0(r){Jl.has(r)||Jl.set(r,fetch("./assets/player-hall/character-3d/sculpt/"+r+".bin").then(a=>{if(!a.ok)throw Error("Character anatomy: "+a.status);return a.arrayBuffer()}).catch(a=>{throw Jl.delete(r),a}));let e=await Jl.get(r),t=new DataView(e).getUint32(0,!0),n=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,t))),i=4+t,s=new pt;return s.setAttribute("position",new vn(new Float32Array(e.slice(i,i+n.vertices*12)),3)),s.setAttribute("normal",new vn(new Float32Array(e.slice(i+n.vertices*12,i+n.vertices*24)),3)),s.setIndex(new vn(new Uint32Array(e.slice(i+n.vertices*24)),1)),s}var eo=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},os=r=>{let e=Math.sin(r*127.1+311.7)*43758.5453;return e-Math.floor(e)};async function Kl(r,e){let t=new ke,n=Vp(t),i=[],s=[],a=[],o=Hp(e.body),l=r.wardrobeSubcategory("pants",e.pants)==="shorts",c=e.suit?.endsWith("Tee"),h=e.suit?.endsWith("Tank"),u=e.helmet&&e.helmet!=="none",d=!u||e.visor==="open",f=Promise.all(["head","face","hand-left","hand-right","shirt-"+(h?"tank":c?"tee":"jacket"),l?"shorts":"pants",...u?["helmet-shell"]:[]].map(U0)),g=(T,L=.8,H=0,ne=!1)=>{let G=ne?Sn:wt,Z=new G({color:T,roughness:L,metalness:H});return s.push(Z),Z},m=g("#ffffff",.96),p=g("#ffffff",.73),v=g("#6b4735",.84),y=g("#73503c",.59),x=g("#453127",.51),_=g("#241b14",.21),b=g("#433627",.55),S=g("#0b0908",.15),D=g("#efe6d2",.32),O=g("#6e5341",.42),F=g(r.item("suit",e.suit).color,.94,0,!0),k=g(new dt(r.item("suit",e.suit).color).multiplyScalar(.7),.92),I=g(r.item("pants",e.pants).color,.96),U=g(new dt(r.item("pants",e.pants).color).multiplyScalar(.68),.94),K=g(r.item("shoes",e.shoes).color,.49,0,!0),j=g(new dt(r.item("shoes",e.shoes).color).multiplyScalar(.78),.64),re=g("#dedbd3",.84),ge=g("#b1afa8",.93),Q=g("#c5a259",.3,.88);F.clearcoat=/leather|Biker/i.test(e.suit)?.25:0,F.roughness=/leather|Biker/i.test(e.suit)?.46:.94,F.sheen=/Knit|velvet/i.test(e.suit)?.65:.12,F.sheenRoughness=.85,K.clearcoat=.18,K.clearcoatRoughness=.48,K.color.r>K.color.g*1.8&&K.color.r>K.color.b*1.4&&(K.color.multiplyScalar(.62),j.color.multiplyScalar(.62));let de=["classic","ruby","midnight"].includes(e.pants);de&&(I.color.set("#171b20"),U.color.set("#101317"));let Ie=g("#ffffff",.97);Ie.vertexColors=!0,Ie.side=Yt;function ze(T){let L=new Uint8Array(65536);for(let ne=0;ne<128;ne++)for(let G=0;G<128;G++){let Z=(ne*128+G)*4,ee=T==="cloth"?128+24*Math.cos(G*Math.PI)+20*Math.sin(ne*Math.PI/2)+os(Z)*15:128+(os(Z)-.5)*48;L[Z]=L[Z+1]=L[Z+2]=ee,L[Z+3]=255}let H=new sr(L,128,128);return H.wrapS=H.wrapT=bn,H.repeat.set(T==="cloth"?4:8,T==="cloth"?4:8),H.magFilter=ii,H.minFilter=Pi,H.generateMipmaps=!0,H.anisotropy=4,H.needsUpdate=!0,a.push(H),H}let[Ae,[Ve,ie]]=await Promise.all([f,Promise.all(["fur","skin"].map(T=>new Ga().loadAsync("./assets/player-hall/character-3d/sculpt/"+T+"-albedo-v1.webp")))]);for(let T of[Ve,ie])T.colorSpace=bt,T.wrapS=T.wrapT=bn,T.anisotropy=4,a.push(T);Ve.repeat.set(2,3),ie.repeat.set(2,2),m.map=Ve,m.bumpMap=Ve,m.bumpScale=.0024,p.map=ie,m.onBeforeCompile=T=>{T.vertexShader=`attribute float surface;varying float furRegion;varying float furHeight;
`+T.vertexShader,T.vertexShader=T.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
furRegion=surface;furHeight=position.y;`),T.fragmentShader=`varying float furRegion;varying float furHeight;
`+T.fragmentShader,T.fragmentShader=T.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
   float beard=step(5.5,furRegion)*(1.-step(6.5,furRegion))*(1.-smoothstep(1.42,1.62,furHeight));float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(grey*1.6),beard*.72);
  `)},m.customProgramCacheKey=()=>"sculpted-chimp-beard-v1";let Te=ze("cloth"),we=ze("skin");for(let T of[F,k,I,U])T.bumpMap=Te,T.bumpScale=8e-4;for(let T of[p,y,x])T.bumpMap=we,T.bumpScale=65e-5;function J(T,L,H,ne,G=!0){let Z=T.getAttribute("position"),ee=[],ue=[];for(let w=0;w<Z.count;w++){let $=Z.getX(w),se=Z.getY(w),he=Z.getZ(w),xe=typeof H=="function"?H($,se,he):H;if(G){let Ge=o($,.5-se/3.825,he,xe);if(ne==="shirt-body"){let Ce=o($,.5-se/3.825,he,1),Xe=o($,.5-se/3.825,he,2),Qe=eo(.45,.6,Math.abs($));Ge=Ce.map((Oe,ut)=>Oe+(Xe[ut]-Oe)*Qe)}$=Ge[0],se=(.5-Ge[1])*3.825,he=Ge[2],Z.setXYZ(w,$,se,he)}ee.push(.5+$/2.55,.5-se/3.825),ue.push(xe)}T.setAttribute("bodyUv",new Re(ee,2)),T.setAttribute("surface",new Re(ue,1)),T.getAttribute("uv")||T.setAttribute("uv",new Re(ee,2)),(!T.getAttribute("normal")||G&&e.body&&e.body!=="bodyNormal")&&T.computeVertexNormals(),i.push(T);let me=n.mesh(T,L);return me.name=ne||"",me.castShadow=me.receiveShadow=!0,me}function De(T,L,H,ne,G){let Z=new Ot(1,40,28);return Z.scale(...H),Z.translate(...L),J(Z,T,ne,G)}function R(T,L,H,ne,G,Z=!1){return J(new Ct(new Rt(T.map(ee=>new A(...ee)),Z),Math.max(24,T.length*5),L,8,Z),H,ne,G)}function P(T,L,H,ne,G,Z,ee,ue,me){let w=[];for(let $=0;$<64;$++){let se=$/64*Math.PI*2;w.push([T+ne*Math.cos(se),L,H+G*Math.sin(se)])}return R(w,Z,ee,ue,me,!0)}function Y(T,L,H,ne,G,Z,ee,ue,me=.023){X([[T,L+me,H,ne+.003,G+.003],[T,L+.007,H,ne+.001,G+.001],[T,L,H,ne,G]],Z,ee,ue,{rings:12,sides:64,capTop:!1,capBottom:!1});let w=[],$=[],se=64;for(let xe=0;xe<=se;xe++){let Ge=xe/se*Math.PI*2;if(w.push(T+ne*Math.cos(Ge),L,H+G*Math.sin(Ge),T+(ne-.011)*Math.cos(Ge),L+.001,H+(G-.011)*Math.sin(Ge)),xe<se){let Ce=xe*2;$.push(Ce,Ce+2,Ce+1,Ce+2,Ce+3,Ce+1)}}let he=new pt;he.setAttribute("position",new Re(w,3)),he.setIndex($),he.computeVertexNormals(),J(he,Z,ee,ue+"-inside")}function X(T,L,H,ne,{sides:G=64,rings:Z=80,clothFolds:ee=0,capTop:ue=!0,capBottom:me=!0,fork:w=!1}={}){let $=[],se=[],he=[],xe=T[0][1],Ge=T.at(-1)[1];function Ce(Oe){let ut=0;for(;ut<T.length-2&&T[ut+1][1]>Oe;)ut++;let at=T[ut],ft=T[ut+1],xt=Math.max(0,Math.min(1,(at[1]-Oe)/(at[1]-ft[1])));return at.map((Dt,qt)=>{if(qt===1)return Oe;let en=T[Math.max(0,ut-1)][qt],un=T[Math.min(T.length-1,ut+2)][qt];return .5*(2*Dt+(-en+ft[qt])*xt+(2*en-5*Dt+4*ft[qt]-un)*xt*xt+(-en+3*Dt-3*ft[qt]+un)*xt*xt*xt)})}for(let Oe=0;Oe<=Z;Oe++){let ut=xe+(Ge-xe)*Oe/Z,[at,,ft,xt,Dt]=Ce(ut);for(let qt=0;qt<=G;qt++){let en=qt/G*Math.PI*2+(w?Math.PI/2:0),un=at+xt*Math.cos(en),On=ft+Dt*Math.sin(en),Dr=ut;if(w){let An=qt/G,Li=An<=.5,Ur=Li?An*4*Math.PI:Math.PI+(An-.5)*4*Math.PI,hr=at+(Li?-1:1)*xt/2+xt/2*Math.cos(Ur),B=ft+Dt*Math.sin(Ur),pe=eo(.02,-.28,ut);un+=(hr-un)*pe,On+=(B-On)*pe}if(ee){let An=Math.sin(Math.PI*Oe/Z)*(.25+.75*Math.exp(-Math.pow((ut-.3)/.24,2))),Li=Math.sin(ut*26+en*3)*Math.sin(en*2+.4)*An;On+=ee*Li*Math.sin(en),un+=ee*Li*Math.cos(en),Dr+=ee*.35*Math.sin(en*5+ut*10)*An}if($.push(un,Dr,On),se.push(qt/G,Oe/Z),Oe<Z&&qt<G){let An=Oe*(G+1)+qt;he.push(An,An+1,An+G+1,An+1,An+G+2,An+G+1)}}}for(let Oe of[0,Z]){if(Oe===0&&!ue||Oe===Z&&!me)continue;let ut=Oe*(G+1),at=$.length/3,ft=new A;for(let xt=0;xt<G;xt++)ft.add(new A(...$.slice((ut+xt)*3,(ut+xt)*3+3)));ft.multiplyScalar(1/G),$.push(ft.x,ft.y,ft.z),se.push(.5,Oe/Z);for(let xt=0;xt<G;xt++)he.push(at,ut+xt+(Oe===0?1:0),ut+xt+(Oe===0?0:1))}let Xe=new pt;Xe.setAttribute("position",new Re($,3)),Xe.setAttribute("uv",new Re(se,2)),Xe.setIndex(he),Xe.computeVertexNormals();let Qe=Xe.getAttribute("normal");for(let Oe=0;Oe<=Z;Oe++){let ut=Oe*(G+1),at=ut+G,ft=new A().fromBufferAttribute(Qe,ut).add(new A().fromBufferAttribute(Qe,at)).normalize();Qe.setXYZ(ut,ft.x,ft.y,ft.z),Qe.setXYZ(at,ft.x,ft.y,ft.z)}return J(Xe,L,H,ne)}if(d){let T=[],L=[],H=Ae[0].getAttribute("position"),ne=Ae[1].getAttribute("position");for(let G=0;G<H.count;G++)T.push((Math.atan2(H.getZ(G)-.015,H.getX(G))+Math.PI)/(2*Math.PI),(H.getY(G)-1.17)/.84);for(let G=0;G<ne.count;G++)L.push((ne.getX(G)+.26)/.52,(ne.getY(G)-1.29)/.48);Ae[0].setAttribute("uv",new Re(T,2)),Ae[1].setAttribute("uv",new Re(L,2)),J(Ae[0],m,6,"sculpt-cranium",!1),J(Ae[1],p,6,"sculpt-facial-mask",!1)}else Ae[0].dispose(),Ae[1].dispose();for(let T=0;T<2;T++)J(Ae[T+2],p,3,T?"sculpt-right-hand":"sculpt-left-hand",!1);if(d){for(let L of[-1,1]){De(_,[L*.112,1.64,.277],[.04,.022,.032],6,"eye-socket"),De(b,[L*.112,1.641,.311],[.015,.016,.008],6,"amber-iris"),De(S,[L*.112,1.642,.32],[.009,.012,.003],6,"pupil"),De(D,[L*.104,1.65,.324],[.002,.002,.001],6,"eye-catchlight");let H=[];for(let ne=0;ne<=36;ne++){let G=ne/36*Math.PI*2;H.push([L*.112+.044*Math.cos(G),1.64+.025*Math.sin(G),.281+.017*Math.sin(G)**2])}R(H,.0035,p,6,"eyelid",!0),R([[L*.045,1.688,.273],[L*.09,1.689,.281],[L*.14,1.693,.265],[L*.185,1.68,.238]],.03,m,6,"brow-ridge"),R([[L*.059,1.597,.31],[L*.103,1.593,.304],[L*.151,1.61,.276]],.0016,v,6,"orbital-fold"),De(S,[L*.029,1.55,.369],[.012,.007,.004],6,"nostril-cavity"),R([[L*.075,1.515,.34],[L*.116,1.49,.34],[L*.139,1.453,.323]],.0016,v,6,"muzzle-fold")}let T=[[-.15,1.438,.32],[-.086,1.431,.353],[0,1.429,.37],[.086,1.431,.353],[.15,1.438,.32]];R(T,.008,y,6,"upper-lip"),R(T.map(([L,H,ne])=>[L,H-.012,ne-.003]),.009,y,6,"lower-lip"),R(T.map(([L,H,ne])=>[L,H-.004,ne+.005]),.0026,v,6,"mouth-opening"),R([[-.076,1.375,.292],[0,1.362,.302],[.076,1.375,.292]],.0017,v,6,"chin-fold");for(let L of[-1,1]){let H=[],ne=[],G=[];for(let $=0;$<=16;$++)for(let se=0;se<=64;se++){let he=$/16,xe=se/64*Math.PI*2,Ge=L*(.295+.082*he*Math.cos(xe)),Ce=1.674+.119*he*Math.sin(xe),Xe=.035+.04*he*he+.009*Math.cos(xe)*he;H.push(Ge,Ce,Xe);let Qe=new dt("#8e6045").lerp(new dt("#b18361"),he*he);if(ne.push(Qe.r,Qe.g,Qe.b),$<16&&se<64){let Oe=$*65+se;G.push(Oe,Oe+1,Oe+64+1,Oe+1,Oe+64+2,Oe+64+1)}}let ue=new pt;ue.setAttribute("position",new Re(H,3)),ue.setAttribute("color",new Re(ne,3)),ue.setIndex(G);let me=g("#ffffff",.78);me.vertexColors=!0,me.side=Yt,J(ue,me,10,"ear-bowl");let w=[];for(let $=0;$<64;$++){let se=$/64*Math.PI*2;w.push([L*(.295+.082*Math.cos(se)),1.674+.119*Math.sin(se),.075+.009*Math.cos(se)])}R(w,.011,p,10,"ear-helix",!0),R([[L*.311,1.607,.056],[L*.332,1.649,.057],[L*.323,1.697,.057],[L*.294,1.716,.052]],.007,v,10,"ear-antihelix"),De(p,[L*.307,1.562,.047],[.035,.032,.027],10,"ear-lobe")}}X([[0,1.43,0,.12,.13],[0,1.3,0,.15,.145],[0,1.15,0,.18,.155]],m,7,"fur-neck");for(let T of[-1,1]){let L=h?[[T*.44,1.15,-.015,.11,.13],[T*.51,1.04,-.012,.16,.155]]:c?[[T*.57,.83,-.005,.134,.132]]:[[T*.744,.07,.026,.065,.061]];(h||c)&&L.push([T*.57,.8,-.005,.134,.132],[T*.64,.59,.01,.116,.122],[T*.675,.43,.025,.139,.132],[T*.714,.22,.035,.116,.105]),L.push([T*.744,.015,.026,.066,.061]),X(L,m,2,"fur-arm-"+T);let H=l?[[T*.285,-.655,-.02,.126,.125],[T*.315,-.74,-.02,.135,.13],[T*.34,-.91,-.008,.119,.112],[T*.37,-1.09,-.01,.127,.106],[T*.395,-1.34,-.015,.087,.081],[T*.41,-1.61,.01,.061,.064]]:[[T*.41,-1.52,.01,.061,.064],[T*.41,-1.61,.01,.061,.064]];X(H,m,4,"fur-leg-"+T);for(let ne=0;ne<4;ne++){let G=[-.06,-.02,.022,.06][ne],Z=[.139,.178,.167,.127][ne],ee=T*(.755+G*1.12),ue=-.245-Z*.84,me=new Ot(1,20,14);me.scale(.01,.018,.0035),me.translate(ee,ue,.124),J(me,O,3,"fingernail"),R([[ee-.014,ue+.049,.107],[ee,ue+.051,.111],[ee+.014,ue+.049,.107]],.0013,v,3,"finger-crease")}R([[T*.71,-.032,.071],[T*.75,-.039,.077],[T*.794,-.032,.068]],.0016,v,3,"wrist-fold")}let E=[],N=Ae[4].getAttribute("position");for(let T=0;T<N.count;T++)E.push(Math.abs(N.getX(T))>.49?1:0);Ae[4].setAttribute("seamRegion",new Re(E,1));let q=F.clone(),W=new Sr({depthPacking:Zs});s.push(q,W);let _e=T=>{T.vertexShader=`attribute float seamRegion;varying vec2 garmentHemCoords;
`+T.vertexShader,T.vertexShader=T.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
garmentHemCoords=vec2(seamRegion,position.y);`),T.fragmentShader=`varying vec2 garmentHemCoords;
`+T.fragmentShader,T.fragmentShader=T.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if((garmentHemCoords.x<.5&&garmentHemCoords.y<.118)||(garmentHemCoords.x>=.5&&garmentHemCoords.y<`+(c?.798:.033).toFixed(3)+"))discard;")};q.onBeforeCompile=_e,W.onBeforeCompile=_e,q.customProgramCacheKey=()=>"sculpt-sewn-hem-"+(c?"tee":h?"tank":"jacket"),W.customProgramCacheKey=()=>"sculpt-sewn-depth-"+(c?"tee":h?"tank":"jacket");let oe=J(Ae[4],q,(T,L)=>Math.abs(T)>.52&&L>.015?2:1,"shirt-body");oe.customDepthMaterial=W;for(let T of[-1,1])h||Y(T*(c?.57:.744),c?.773:.014,c?.01:.026,c?.165:.08,c?.161:.076,k,2,"sewn-sleeve-hem",c?.026:.019);let ce=[];for(let T=0;T<64;T++){let L=T/64*Math.PI*2;ce.push([.183*Math.cos(L),1.234-.034*Math.sin(L)**2,.132*Math.sin(L)])}R(ce,.012,k,1,"ribbed-collar",!0),Y(0,.097,.006,.415,.229,k,1,"sewn-shirt-hem",.021);function Pe(T,L,H=!0){let ne=H?-1/0:1/0;for(let G of t.children){if(!G.name.startsWith("pants-")&&G.name!=="shirt-body")continue;let Z=G.geometry.getAttribute("position"),ee=G.geometry.index.array;for(let ue=0;ue<ee.length;ue+=3){let me=ee[ue],w=ee[ue+1],$=ee[ue+2],se=Z.getX(me),he=Z.getY(me),xe=Z.getX(w),Ge=Z.getY(w),Ce=Z.getX($),Xe=Z.getY($),Qe=(Ge-Xe)*(se-Ce)+(Ce-xe)*(he-Xe);if(Math.abs(Qe)<1e-10)continue;let Oe=((Ge-Xe)*(T-Ce)+(Ce-xe)*(L-Xe))/Qe,ut=((Xe-he)*(T-Ce)+(se-Ce)*(L-Xe))/Qe,at=1-Oe-ut;if(Oe<-1e-4||ut<-1e-4||at<-1e-4)continue;let ft=Z.getZ(me)*Oe+Z.getZ(w)*ut+Z.getZ($)*at;(H?ft>ne:ft<ne)&&(ne=ft)}}return Number.isFinite(ne)?ne:H?.2:-.2}function Ye(T,L,H,ne=!0,G=.0016){return R(T.map(([Z,ee])=>[Z,ee,Pe(Z,ee,ne)+(ne?.0025:-.0065)]),G,L,4,H)}J(Ae[5],I,4,"pants-body");for(let T of[-1,1]){l?Y(T*.245,-.676,-.02,.183,.174,I,4,"sewn-shorts-hem",.018):Y(T*.41,-1.548,-.02,.102,.092,U,4,"sewn-pants-hem",.02),Ye([[T*.32,-.035],[T*.36,-.13],[T*.392,-.23]],U,"front-pocket");let L=[],H=[],ne=[],G=12,Z=12;for(let me=0;me<=Z;me++)for(let w=0;w<=G;w++){let $=w/G,se=me/Z,he=T*.24+($-.5)*.15,xe=-.055-se*(.155+.022*(1-Math.abs($-.5)*2)),Ge=Pe(he,xe,!1)-.002-.003*Math.sin($*Math.PI)*Math.sin(se*Math.PI);if(L.push(he,xe,Ge),H.push($,se),w<G&&me<Z){let Ce=me*(G+1)+w;ne.push(Ce,Ce+1,Ce+G+1,Ce+1,Ce+G+2,Ce+G+1)}}let ee=new pt;ee.setAttribute("position",new Re(L,3)),ee.setAttribute("uv",new Re(H,2)),ee.setIndex(ne),J(ee,I,4,"rear-pocket-patch",!1);let ue=[[-.068,0],[.068,0],[.068,-.142],[0,-.163],[-.068,-.142],[-.068,0]].map(([me,w])=>[T*.24+me,-.061+w]);Ye(ue,U,"rear-pocket-stitch",!1,.0012)}if(Ye([[0,.08],[0,-.06],[.019,-.19]],U,"fly-stitch"),!c&&!h&&!/Knit|Puffer|Hoodie/i.test(e.suit)){let T=g("#171b1d",.92),L=g("#303432",.84),H=[],ne=[],G=[],Z=8,ee=36;for(let me=0;me<=ee;me++)for(let w=0;w<=Z;w++){let $=.2+me/ee*.96,se=(w/Z-.5)*(.15+.055*me/ee);if(H.push(se,$,Pe(se,$,!0)+.002),ne.push(w/Z,me/ee),w<Z&&me<ee){let he=me*(Z+1)+w;G.push(he,he+1,he+Z+1,he+1,he+Z+2,he+Z+1)}}let ue=new pt;ue.setAttribute("position",new Re(H,3)),ue.setAttribute("uv",new Re(ne,2)),ue.setIndex(G),J(ue,T,1,"jacket-inner-shirt",!1);for(let me of[-1,1]){let w=[[me*.092,1.16],[me*.11,.95],[me*.105,.6],[me*.075,.2]].map(([se,he])=>[se,he,Pe(se,he,!0)+.005]);R(w,.004,k,1,"jacket-front-edge");let $=[[me*.27,.59],[me*.35,.44]].map(([se,he])=>[se,he,Pe(se,he,!0)+.003]);R($,.003,k,1,"jacket-pocket-welt")}if(/Blazer|Dinner|Biker/i.test(e.suit)){for(let me of[-1,1]){let w=[[me*.1,1.19],[me*.2,1.02],[me*.105,.77],[me*.067,1.02]],$=w.flatMap(([he,xe])=>[he,xe,Pe(he,xe,!0)+.012]),se=new pt;se.setAttribute("position",new Re($,3)),se.setIndex([0,1,2,0,2,3]),se.computeVertexNormals(),J(se,F,1,"folded-lapel",!1),R(w.map(([he,xe])=>[he,xe,Pe(he,xe,!0)+.014]),.0014,k,1,"lapel-stitch")}for(let me of[.48,.31]){let w=new $e(.009,.009,.006,20);w.rotateX(Math.PI/2),w.translate(.1,me,Pe(.1,me,!0)+.008),J(w,Q,1,"jacket-button",!1)}}else{if(["classic","ruby","midnight"].includes(e.suit))for(let me of[-1,1])R([[me*.53,1.04,.16],[me*.6,.8,.15],[me*.65,.56,.14],[me*.7,.28,.12]],.008,re,2,"racing-sleeve-piping");for(let me=.25;me<1.15;me+=.026){let w=new nt(.008,.008,.004);w.translate(.08,me,Pe(.08,me,!0)+.007),J(w,Q,1,"zipper-tooth",!1)}if(["classic","ruby","midnight"].includes(e.suit))for(let me=0;me<3;me++)for(let w=0;w<4;w++){let $=-.32+w*.033,se=.92+me*.033,he=new Xt(.032,.032);he.translate($,se,Pe($,se,!0)+.004),J(he,(me+w)%2?T:re,1,"club-checker-patch",!1)}}}if(/Hoodie/i.test(e.suit)){let T=new Ot(1,48,32,0,Math.PI*2,0,Math.PI*.68);T.scale(.24,.24,.16),T.rotateX(Math.PI/2),T.translate(0,1.08,-.2);let L=F.clone();L.side=Yt,s.push(L),J(T,L,1,"folded-hood");for(let H of[-1,1])R([[H*.1,1.17,.16],[H*.09,1.04,.23],[H*.11,.88,.235]],.0035,re,1,"hood-drawstring")}if(/Puffer/i.test(e.suit))for(let T=.26;T<1.17;T+=.14){let L=[];for(let ne=0;ne<=24;ne++){let G=-.37+ne*.74/24;L.push([G,T,Pe(G,T,!0)+.004])}let H=new Ct(new Rt(L.map(ne=>new A(...ne))),32,.004,6,!1);J(H,k,1,"quilted-puffer-seam",!1)}if(e.necklace&&e.necklace!=="none"){let T=g(r.item("necklace",e.necklace).color,.26,.88),L=new Rt([[-.16,1.24,.04],[-.16,1.14,.2],[-.13,.93,.26],[0,.82,.275],[.13,.93,.26],[.16,1.14,.2],[.16,1.24,.04],[0,1.25,-.145]].map(ee=>new A(...ee)),!0),H=[],ne=[],G=[];for(let ee=0;ee<56;ee++){let ue=ee/56,me=L.getPointAt(ue),w=L.getTangentAt(ue).normalize(),$=new A(me.x,0,me.z).normalize(),se=new A().crossVectors($,w).normalize();$.crossVectors(w,se).normalize();let he=new vt().makeBasis(w,se,$),xe=new Hn().setFromRotationMatrix(he);ee%2&&xe.multiply(new Hn().setFromAxisAngle(new A(1,0,0),Math.PI/2));let Ge=/Beads|pearl/.test(e.necklace),Ce=Ge?new Ot(.01,12,8):new Ut(.0105,.003,6,12);Ge||Ce.scale(1.2,.8,1),Ce.applyQuaternion(xe),Ce.translate(me.x,me.y,me.z);let Xe=Ce.getAttribute("position"),Qe=Ce.getAttribute("normal"),Oe=H.length/3;H.push(...Xe.array),ne.push(...Qe.array),G.push(...Array.from(Ce.index.array,ut=>ut+Oe)),Ce.dispose()}let Z=new pt;if(Z.setAttribute("position",new Re(H,3)),Z.setAttribute("normal",new Re(ne,3)),Z.setIndex(G),J(Z,T,1,"interlocked-necklace-links"),!["silverChain","goldChain","blackBeads","pearl"].includes(e.necklace)){let ee=e.necklace,ue=new Wt,me=ee==="nicknameBling",w=me?.11:.045,$=me?.032:.055;ee==="spadeDiamond"?(ue.moveTo(0,$),ue.bezierCurveTo(-.016,.028,-.069,0,-.041,-.026),ue.quadraticCurveTo(-.016,-.04,0,-.018),ue.quadraticCurveTo(.016,-.04,.041,-.026),ue.bezierCurveTo(.069,0,.016,.028,0,$),ue.lineTo(.016,-$),ue.lineTo(-.016,-$),ue.closePath()):ee==="crownPendant"?(ue.moveTo(-w,-$),ue.lineTo(w,-$),ue.lineTo(w,$*.55),ue.lineTo(w*.48,0),ue.lineTo(0,$),ue.lineTo(-w*.48,0),ue.lineTo(-w,$*.55),ue.closePath()):(ue.moveTo(-w,-$),ue.lineTo(w,-$),ue.lineTo(w,$),ue.lineTo(-w,$),ue.closePath());let se=new Vt(ue,{depth:.008,bevelEnabled:!0,bevelSize:.003,bevelThickness:.002,bevelSegments:3});if(se.translate(0,.755,.279),J(se,T,1,"necklace-pendant:"+ee),["silverTag","acesPendant","poker21Pendant","nicknameBling"].includes(ee)){let he=document.createElement("canvas");he.width=512,he.height=192;let xe=he.getContext("2d");xe.clearRect(0,0,512,192),xe.fillStyle="#f7e7b5",xe.font="bold 100px Arial",xe.textAlign="center",xe.textBaseline="middle",xe.fillText(ee==="nicknameBling"?e.patchText||"POKER21":ee==="acesPendant"?"A\u2660 A\u2665":ee==="silverTag"?"\u2660":"P21",256,100,480);let Ge=new kt(he);Ge.colorSpace=bt,a.push(Ge);let Ce=new wt({map:Ge,transparent:!0,alphaTest:.1,roughness:.32,metalness:.3});s.push(Ce);let Xe=new Xt(w*1.85,$*1.7);Xe.translate(0,.755,.291),J(Xe,Ce,1,"pendant-engraving:"+ee)}}}if(de&&!l){let ee=function(ue,me,w){let $=w>0?-1/0:1/0;for(let se=0;se<Z.length;se+=3){let he=Z[se],xe=Z[se+1],Ge=Z[se+2],Ce=G.getY(he),Xe=G.getZ(he),Qe=G.getY(xe),Oe=G.getZ(xe),ut=G.getY(Ge),at=G.getZ(Ge),ft=(Oe-at)*(Ce-ut)+(ut-Qe)*(Xe-at);if(Math.abs(ft)<1e-10)continue;let xt=((Oe-at)*(ue-ut)+(ut-Qe)*(me-at))/ft,Dt=((at-Xe)*(ue-ut)+(Ce-ut)*(me-at))/ft,qt=1-xt-Dt;if(xt<-1e-4||Dt<-1e-4||qt<-1e-4)continue;let en=G.getX(he)*xt+G.getX(xe)*Dt+G.getX(Ge)*qt;(w>0?en>$:en<$)&&($=en)}return Number.isFinite($)?$:w*.42},T=g("#ffffff",.93);T.vertexColors=!0;let L=new dt(r.item("pants",e.pants).color),H=new dt("#e5e1d7"),ne=t.children.find(ue=>ue.name==="pants-body"),G=ne.geometry.getAttribute("position"),Z=ne.geometry.index.array;for(let ue of[-1,1]){let me=[],w=[],$=[];for(let Ge=0;Ge<=64;Ge++)for(let Ce=0;Ce<=6;Ce++){let Xe=Ce/6*2-1,Qe=.05-Ge/64*1.58,Oe=-.02+Xe*.041,ut=ee(Qe,Oe,ue)+ue*.0025,at=Math.abs(Xe)<.5?L:H;if(me.push(ut,Qe,Oe),w.push(at.r,at.g,at.b),Ge<64&&Ce<6){let ft=Ge*7+Ce;$.push(ft,ft+1,ft+6+1,ft+1,ft+6+2,ft+6+1)}}let xe=new pt;xe.setAttribute("position",new Re(me,3)),xe.setAttribute("color",new Re(w,3)),xe.setIndex($),xe.computeVertexNormals(),T.side=Yt,J(xe,T,4,"club-pants-side-stripe",!1)}}if(/Cargo/i.test(e.pants))for(let T of[-1,1]){let L=T*.3,H=-.43,ne=Pe(L,H,!0)+.023,G=new nt(.15,.19,.035);G.translate(L,H,ne),J(G,I,4,"cargo-thigh-pocket",!1);let Z=new nt(.17,.045,.015);Z.translate(L,H+.08,ne+.024),J(Z,U,4,"cargo-pocket-flap",!1)}if(e.patch&&e.patch!=="none"){let T=new kt(r.patchCanvas(e));T.colorSpace=bt,a.push(T);let L=new wt({map:T,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(L);let H=[],ne=[],G=[],Z=12,ee=6;for(let me=0;me<=ee;me++)for(let w=0;w<=Z;w++){let $=-.285+w/Z*.235,se=.91-me/ee*.088;if(H.push($,se,Pe($,se,!0)+.004),ne.push(w/Z,1-me/ee),w<Z&&me<ee){let he=me*(Z+1)+w;G.push(he,he+Z+1,he+1,he+1,he+Z+1,he+Z+2)}}let ue=new pt;ue.setAttribute("position",new Re(H,3)),ue.setAttribute("uv",new Re(ne,2)),ue.setIndex(G),ue.computeVertexNormals(),J(ue,L,1,"sewn-word-patch",!1)}for(let T of[-1,1]){let ee=function(w,$,se){let he=[],xe=[],Ge=[];for(let Qe=0;Qe<w.length;Qe++){let[Oe,ut,at,ft]=w[Qe];for(let xt=0;xt<=48;xt++){let Dt=xt/48*Math.PI*2;if(he.push(G+ut*Math.cos(Dt),se==="leather-sneaker"?at+(ft-at)*Math.max(0,Math.sin(Dt)):(at+ft)/2+(ft-at)/2*Math.sin(Dt),Oe),xe.push(xt/48,Qe/(w.length-1)),Qe<w.length-1&&xt<48){let qt=Qe*49+xt;Ge.push(qt,qt+1,qt+48+1,qt+1,qt+48+2,qt+48+1)}}}for(let Qe of[0,w.length-1]){let[Oe,,ut,at]=w[Qe],ft=Qe*49,xt=he.length/3;he.push(G,(ut+at)/2,Oe),xe.push(.5,Qe/(w.length-1));for(let Dt=0;Dt<48;Dt++)Ge.push(xt,ft+(Qe===0?Dt+1:Dt),ft+(Qe===0?Dt:Dt+1))}let Xe=new pt;return Xe.setAttribute("position",new Re(he,3)),Xe.setAttribute("uv",new Re(xe,2)),Xe.setIndex(Ge),Xe.computeVertexNormals(),J(Xe,$,5,se,!1)},ue=function(w,$=0){let se=0;for(;se<Z.length-2&&Z[se+1][0]<w;)se++;let he=Z[se],xe=Z[se+1],Ge=Math.max(0,Math.min(1,(w-he[0])/(xe[0]-he[0]))),Ce=he[1]+(xe[1]-he[1])*Ge,Xe=he[2]+(xe[2]-he[2])*Ge,Qe=he[3]+(xe[3]-he[3])*Ge;return Xe+(Qe-Xe)*Math.sqrt(Math.max(0,1-($/Ce)**2))},L=/Chelsea|combat|desert|hiking|canvasHigh/i.test(e.shoes),H=/Oxford|Loafer|Brogue/i.test(e.shoes),ne=/Chelsea|Loafer/i.test(e.shoes),G=T*.41,Z=[[-.115,.06,-1.8,-1.61],[-.09,.112,-1.815,-1.54],[-.035,.132,-1.815,-1.53],[.04,.138,-1.815,-1.56],[.115,.145,-1.815,-1.615],[.2,.152,-1.815,-1.665],[.28,.156,-1.815,-1.686],[.36,.149,-1.815,-1.699],[.415,.115,-1.81,-1.72],[.443,.058,-1.8,-1.755],[.448,.004,-1.785,-1.78]];if(L)for(let w of Z)w[0]<.06&&(w[3]+=.19*(1-Math.max(0,w[0])/.12));H&&(re.color.set("#302923"),ge.color.set("#1b1918")),ee(Z,K,"leather-sneaker"),ee([[-.124,.065,-1.848,-1.805],[-.1,.124,-1.853,-1.798],[-.02,.145,-1.855,-1.798],[.16,.158,-1.855,-1.798],[.32,.164,-1.855,-1.798],[.4,.137,-1.85,-1.798],[.445,.078,-1.835,-1.805],[.459,.004,-1.822,-1.817]],re,"rubber-midsole"),ee([[-.122,.065,-1.865,-1.845],[-.09,.124,-1.87,-1.846],[.02,.145,-1.87,-1.846],[.2,.156,-1.87,-1.846],[.34,.158,-1.867,-1.846],[.42,.125,-1.856,-1.841],[.453,.055,-1.837,-1.824],[.458,.003,-1.826,-1.821]],ge,"outsole");for(let w of[-1,1]){R([[G+w*.098,-1.558,-.045],[G+w*.135,-1.63,.08],[G+w*.154,-1.735,.275],[G+w*.125,-1.765,.392]],.003,j,5,"quarter-panel-seam"),R([[G+w*.093,-1.579,-.04],[G+w*.131,-1.65,.1],[G+w*.148,-1.752,.275]],.0013,re,5,"quarter-stitch");for(let $=0;$<(ne?0:6);$++){let se=.06+$*.042,he=ue(se,.06)+.002,xe=new Ut(.0055,.0018,6,12);xe.rotateX(-.95),xe.translate(G+w*.06,he,se),J(xe,j,5,"lace-eyelet",!1)}}for(let w=0;w<(ne?0:6);w++){let $=.062+w*.042;R([[G-.06,ue($,.06)+.004,$],[G,ue($+.009)+.005,$+.009],[G+.06,ue($,.06)+.004,$]],.0032,re,5,"woven-lace"),R([[G+.06,ue($+.004,.06)+.005,$+.004],[G,ue($+.012)+.006,$+.012],[G-.06,ue($+.004,.06)+.005,$+.004]],.0032,re,5,"woven-lace-cross")}ne&&R([[G-.1,ue(.14,.1)+.006,.14],[G,ue(.14)+.009,.14],[G+.1,ue(.14,.1)+.006,.14]],.008,j,5,"slip-on-vamp-band"),R([[G-.108,-1.777,.29],[G-.12,-1.762,.36],[G,-1.749,.421],[G+.12,-1.762,.36],[G+.108,-1.777,.29]],.0018,re,5,"toe-stitch");let me=new nt(.065,.1,.018);me.translate(G,-1.6,-.107),J(me,j,5,"heel-pull-tab",!1);for(let w=0;w<12;w++)for(let $ of[-1,1])R([[G+$*.15,-1.827,.02+w*.027],[G+$*.15,-1.842,.02+w*.027]],.0013,ge,5,"sole-groove")}function Ue(T,L,H,ne,G=.024){let Z=T.geometry.getAttribute("position"),ee=T.geometry.getAttribute("normal"),ue=[],me=[],w=[];for(let he=0;he<L;he++){let xe=Math.floor(os(he+H*521)*Z.count),Ge=new A().fromBufferAttribute(Z,xe),Ce=new A().fromBufferAttribute(ee,xe);if(ne&&!ne(Ge,Ce))continue;let Xe=new A(.08*Math.sin(he*2.1),-1,.1*Math.cos(he*1.3));Xe.addScaledVector(Ce,-Xe.dot(Ce)).normalize();let Qe=new A().crossVectors(Ce,Xe).normalize(),Oe=G*(.65+os(he*2.7)*.75),ut=35e-5+os(he*3.1)*4e-4,at=ue.length/3,ft=Ge.y<1.53&&H===6?os(he*2.2)>.5:!1,xt=new dt(ft?"#5d554b":"#362b23").multiplyScalar(.75+os(he*8.7)*.35);for(let Dt=0;Dt<4;Dt++){let qt=Dt/3,en=Ge.clone().addScaledVector(Ce,.001+Oe*.3*Math.sin(qt*Math.PI/2)).addScaledVector(Xe,Oe*qt);for(let un of[-1,1]){let On=en.clone().addScaledVector(Qe,un*ut*(1-qt*.92));ue.push(On.x,On.y,On.z),me.push(xt.r,xt.g,xt.b)}if(Dt<3){let un=at+Dt*2;w.push(un,un+1,un+2,un+1,un+3,un+2)}}}if(!ue.length)return;let $=new pt;$.setAttribute("position",new Re(ue,3)),$.setAttribute("color",new Re(me,3)),$.setIndex(w),$.computeVertexNormals();let se=J($,Ie,H,"individual-fur-strands",!1);se.castShadow=!1}if(d){let T=t.children.find(L=>L.name==="sculpt-cranium");Ue(T,3800,6,(L,H)=>!(L.z>.12&&L.y>1.33&&L.y<1.78&&Math.abs(L.x)<.235)&&(!e.hair||e.hair==="hairNatural"||L.y<1.76),.027)}if(d)for(let T of t.children.filter(L=>L.name==="brow-ridge"))Ue(T,300,6,null,.01);let tt=t.children.filter(T=>T.name.startsWith("fur-arm-")||T.name.startsWith("fur-leg-"));for(let T of tt){let L=T.name.startsWith("fur-arm");Ue(T,1800,L?2:4,H=>L?H.y<(h?1.1:c?.8:.015):l&&H.y<-.68,.021)}if(c||h){let T={...e,hair:"hairNatural",glasses:"none",watch:"none",ring:"none",necklace:"none",body:"bodyNormal",helmet:"none",hat:"none",patch:"none"};await r.loadWardrobe(T);let L=new Image;L.src="./assets/player-hall/standing-monkey-v1.webp",await L.decode();let H=r.renderCharacter(L,T),ne=document.createElement("canvas");ne.width=1024,ne.height=1536;let G=ne.getContext("2d",{willReadFrequently:!0});G.drawImage(H,0,1536-H.height);let Z=G.getImageData(0,0,1024,1536);for(let Ce=0;Ce<1536;Ce++)for(let Xe=0;Xe<1024;Xe++){let Qe=(Ce*1024+Xe)*4,Oe=Z.data[Qe]/255,ut=Z.data[Qe+1]/255,at=Z.data[Qe+2]/255,ft=(Oe+ut+at)/3,xt=Math.max(eo(.23,.5,ft),eo(.15,.3,Oe)*eo(.02,.12,Oe-ut));Z.data[Qe+3]*=Xe>340&&Xe<684&&Ce>315&&Ce<663?xt:0}G.putImageData(Z,0,0);let ee=new kt(ne);ee.colorSpace=bt,ee.anisotropy=4,a.push(ee);let ue=new wt({map:ee,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:.96,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(ue);let me=t.children.find(Ce=>Ce.name==="shirt-body"),w=me.geometry.clone(),$=w.getAttribute("position"),se=w.getAttribute("normal"),he=[],xe=[];for(let Ce=0;Ce<$.count;Ce++)he.push(.5+$.getX(Ce)/2.55,.5+$.getY(Ce)/3.825),$.setXYZ(Ce,$.getX(Ce)+se.getX(Ce)*.001,$.getY(Ce)+se.getY(Ce)*.001,$.getZ(Ce)+se.getZ(Ce)*.001);let Ge=w.index.array;for(let Ce=0;Ce<Ge.length;Ce+=3)Ge.slice(Ce,Ce+3).every(Xe=>$.getZ(Xe)>.03)&&xe.push(...Ge.slice(Ce,Ce+3));w.setAttribute("uv",new Re(he,2)),w.setIndex(xe),J(w,ue,1,"screen-printed-shirt",!1)}if(u){for(let me of[...t.children])me.name.startsWith("ear-")&&me.removeFromParent();let T=g(r.item("helmet",e.helmet).color,.25,.45,!0);T.clearcoat=.7,T.clearcoatRoughness=.16;let L=g("#152731",.1,.55,!0);L.clearcoat=1,L.transparent=!0,L.opacity=.91,L.side=Yt,J(Ae[6],T,6,"helmet-shell",!1),R([[-.28,1.43,.16],[-.2,1.39,.3],[0,1.36,.36],[.2,1.39,.3],[.28,1.43,.16]],.03,T,6,"helmet-chin-bar");let H=[],ne=[],G=[],Z=48,ee=20;for(let me=0;me<=ee;me++)for(let w=0;w<=Z;w++){let $=(w/Z-.5)*1.9,se=(me/ee-.5)*2.4,he=new A(.35*Math.sin($),1.665+.26*Math.sin(se),.2+.19*Math.cos($)*Math.cos(se));if(e.visor==="open"&&he.sub(new A(0,1.84,.13)).applyAxisAngle(new A(1,0,0),-1.1).add(new A(0,1.84,.13)),H.push(he.x,he.y,he.z),ne.push(w/Z,me/ee),w<Z&&me<ee){let xe=me*(Z+1)+w;G.push(xe,xe+1,xe+Z+1,xe+1,xe+Z+2,xe+Z+1)}}let ue=new pt;ue.setAttribute("position",new Re(H,3)),ue.setAttribute("uv",new Re(ne,2)),ue.setIndex(G),ue.computeVertexNormals(),J(ue,L,6,"hinged-helmet-visor",!1);for(let me of[-1,1]){let w=new $e(.027,.027,.012,32);w.rotateZ(Math.PI/2),w.translate(me*.327,1.73,.035),J(w,Q,6,"visor-hinge",!1);for(let $=0;$<4;$++)De(x,[me*.322,1.48+$*.022,-.02],[.007,.006,.036],6,"helmet-vent")}R([[0,1.9,-.2],[0,2.007,-.05],[0,1.995,.15],[0,1.91,.245]],.015,Q,6,"helmet-racing-stripe")}let ct=kp(n,e,r),yt=Wp(n,{...e,sculptHairOffset:.025,sculptHairDepth:-.075,sculptHairTexture:Ve}),Pt=Xp(n,{...e,helmet:d?"none":e.helmet,sculptEyewearDepth:-.025},r),Et=e.watch&&e.watch!=="none"?jp(e.watch,r.item("watch",e.watch).color):null;Et&&(t.add(Et.group),n.attach(Et.group,"rightWrist"));let Mt=e.ring&&e.ring!=="none"?qp(r.item("ring",e.ring).color,e.ring):null;return Mt&&(t.add(Mt.group),n.attach(Mt.group,"rightHand")),n.setRelaxedPose(!0),{root:t,rig:n,geometries:i,materials:s,textures:a,dispose(){ct.dispose(),yt.dispose(),Pt.dispose(),Et?.dispose(),Mt?.dispose(),i.forEach(T=>T.dispose()),s.forEach(T=>T.dispose()),a.forEach(T=>T.dispose()),n.dispose()}}}async function Yp(r,e,t={}){let n=await Kl(window.PokerGarage,e),{root:i,rig:s}=n,a=new Tn;a.add(i);{a.add(new Kn("#fff0d4","#283849",2.1));let Q=new qn("#fff0dc",3.5);Q.position.set(-2,4,5),a.add(Q);let de=new qn("#9cc3ed",1.2);de.position.set(3,1,-2),a.add(de)}let o=new si({alpha:!0,antialias:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.outputColorSpace=bt,o.toneMapping=ri,o.toneMappingExposure=1.05;let l=null;if(o.shadowMap){o.shadowMap.enabled=!0,o.shadowMap.type=wr;let Q=a.children.find(Ae=>Ae.isDirectionalLight);Q.castShadow=!0,Q.shadow.mapSize.set(1024,1024),Q.shadow.normalBias=.012,Q.shadow.bias=-15e-5,Q.shadow.camera.left=-2,Q.shadow.camera.right=2,Q.shadow.camera.top=2.2,Q.shadow.camera.bottom=-2.2;let de=new qe(new Xt(8,8),new Zr({opacity:.2}));de.rotation.x=-Math.PI/2,de.position.y=-1.875,de.receiveShadow=!0,a.add(de),n.geometries.push(de.geometry),n.materials.push(de.material);let Ie=new Tn;Ie.background=new dt("#333842");for(let[Ae,Ve,ie,Te,we,J]of[[0,4,0,5,.1,3],[-3,2,2,.1,3,2],[3,1,-2,.1,2,3]]){let De=new qe(new nt(Te,we,J),new In({color:"#ffffff"}));De.position.set(Ae,Ve,ie),Ie.add(De)}let ze=new Cr(o);l=ze.fromScene(Ie,.05),a.environment=l.texture,a.environmentIntensity=.55,ze.dispose(),Ie.traverse(Ae=>{Ae.geometry?.dispose(),Ae.material?.dispose()})}r.append(o.domElement),o.domElement.setAttribute("role","img"),o.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let c=new sn(30,1,.1,30);c.position.set(0,0,9);let h=t.yaw||0,u=t.pitch||0,d=null,f,g=!1,m=!1,p=0,v=window.matchMedia?.("(prefers-reduced-motion: reduce)"),y="full",x=t.focusOrbit||null,_=2.05,b=0,S=0;function D(Q){Q=["watch","ring"].includes(Q)?Q:"full",Q!==y&&(Q!=="full"?(x=x||{yaw:h,pitch:u},t.focusOrbit=x,h=0,u=0):x&&(h=x.yaw,u=x.pitch,x=null,delete t.focusOrbit),t.yaw=h,t.pitch=u,y=Q,r.dataset.focus=y)}function O(Q){let de=r.clientWidth/Math.max(1,r.clientHeight),Ie=y!=="full",ze=y==="ring",Ae=Ie?Math.max(ze?.25:.4,(ze?.18:.3)/de):Math.max(2.4,1.17/de),Ve=Ie?.76*Math.cos(h)+.1*Math.sin(h):0,ie=Ie?(ze?-.27:.04)*Math.cos(u)-(.1*Math.cos(h)-.76*Math.sin(h))*Math.sin(u):-.22,Te=1-Math.exp(-Q*12);_+=(Ae-_)*Te,b+=(Ve-b)*Te,S+=(ie-S)*Te,c.aspect=de;let we=_/Math.tan(c.fov*Math.PI/360);c.position.set(b,S+_*.16,we),c.lookAt(b,S,0),c.updateProjectionMatrix()}let F=()=>{!r.clientWidth||!r.clientHeight||(O(1),o.setSize(r.clientWidth,r.clientHeight,!1))},k=new ResizeObserver(F);k.observe(r),F();let I=Q=>{m=!1,d={id:Q.pointerId,x:Q.clientX,y:Q.clientY},r.setPointerCapture(Q.pointerId),Q.preventDefault()},U=Q=>{!d||d.id!==Q.pointerId||(h+=(Q.clientX-d.x)*.012,u=Math.max(-.35,Math.min(.35,u+(Q.clientY-d.y)*.006)),d.x=Q.clientX,d.y=Q.clientY)},K=()=>{d=null},j=Q=>{["ArrowLeft","ArrowRight"].includes(Q.key)&&(h+=Q.key==="ArrowLeft"?-.15:.15,Q.preventDefault())};r.addEventListener("pointerdown",I),r.addEventListener("pointermove",U),r.addEventListener("pointerup",K),r.addEventListener("pointercancel",K),r.addEventListener("keydown",j);function re(Q=0){if(g)return;if(!r.isConnected){ge();return}m&&!d&&p&&(h+=Math.min(.05,(Q-p)/1e3)*.35);let de=!v?.matches&&!d&&y==="full"?1:0,Ie=p?Math.min(.05,(Q-p)/1e3):.016;s.update(Q/1e3,de,Ie),O(Ie),p=Q,i.rotation.set(u,h,0),t.yaw=h,t.pitch=u,r.dataset.yaw=String(h),o.render(a,c),t.snapshotOnly||(f=requestAnimationFrame(re))}return re(),{state:t,setFocus:D,snapshot(){O(1),i.rotation.set(u,h,0),o.render(a,c);let Q=document.createElement("canvas");return Q.width=o.domElement.width,Q.height=o.domElement.height,Q.getContext("2d").drawImage(o.domElement,0,0),Q},setYaw(Q){h=Q,t.snapshotOnly&&(O(1),re())},setAutoRotate(Q){m=!!Q},dispose:ge};function ge(){if(!g){g=!0,cancelAnimationFrame(f),k.disconnect();for(let[Q,de]of[["pointerdown",I],["pointermove",U],["pointerup",K],["pointercancel",K],["keydown",j]])r.removeEventListener(Q,de);n.dispose(),l?.dispose(),o.dispose(),o.forceContextLoss(),o.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new Tn,s=new ke;i.add(s);let a=new si({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=bt,a.toneMapping=ri,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new sn(34,1,.1,40);i.add(new Kn("#dcecff","#50402b",2));for(let[J,De,R,P]of[[3,6,5,4],[-3,3,-3,3]]){let Y=new qn("#fff0dd",P);Y.position.set(J,De,R),i.add(Y)}let l=document.createElement("canvas");l.width=l.height=128;let c=l.getContext("2d");c.fillStyle="#999999",c.fillRect(0,0,128,128);for(let J=0;J<128;J+=2)c.fillStyle=J%4?"#808080":"#b0b0b0",c.fillRect(0,J,128,1);for(let J=0;J<128;J+=3)c.fillStyle="#888888",c.fillRect(J,0,1,128);let h=new kt(l);h.wrapS=h.wrapT=bn,h.repeat.set(8,8);let u=(J,De=0,R=.7)=>new wt({color:J,metalness:De,roughness:R}),d=u("#32251d"),f=u("#96715a"),g=u("#11161b"),m=u("#e0dfd4"),p=u("#d9ac4c",.8,.25),v=u("#a22c3b"),y=u("#171b20"),x=u("#171b20"),_=u("#826222",.9,.18);for(let J of[v,y,g])J.bumpMap=h,J.bumpScale=.012;function b(J,De,R,P,Y,X,E,N=s){let q=new qe(new Ot(1,40,28),J);return q.position.set(De,R,P),q.scale.set(Y,X,E),N.add(q),q}function S(J,De,R,P,Y=P){let X=new A(...De),E=new A(...R),N=E.clone().sub(X),q=new qe(P>.1?new zs((P+Y)/2,Math.max(.01,N.length()-(P+Y)),10,32):new $e(Y,P,N.length(),16),J);return q.position.copy(X.add(E).multiplyScalar(.5)),q.quaternion.setFromUnitVectors(new A(0,1,0),N.normalize()),s.add(q),q}b(y,0,1.64,0,.47,.36,.26),b(v,0,2.32,0,.59,.65,.32),b(g,0,2.35,.29,.27,.49,.055);for(let J of[-1,1]){S(y,[J*.27,1.67,0],[J*.29,.92,.015],.23,.25),b(y,J*.29,.92,.015,.23,.24,.24),S(y,[J*.29,.94,.015],[J*.32,.28,0],.16,.22),S(m,[J*.45,1.55,.03],[J*.48,.36,.03],.025,.032),b(x,J*.32,.18,.15,.22,.19,.39),b(m,J*.32,.075,.15,.235,.065,.4),b(m,J*.32,.27,.12,.135,.08,.2);for(let De=0;De<5;De++)S(m,[J*.32-.1,.29,.08+De*.04],[J*.32+.1,.29,.08+De*.04],.009);b(v,J*.55,2.63,0,.26,.27,.29),S(v,[J*.57,2.63,0],[J*.76,2.12,.02],.19,.23),b(v,J*.76,2.12,.02,.19,.2,.2),S(v,[J*.76,2.12,.02],[J*.88,1.65,.08],.13,.18),S(m,[J*.71,2.6,.15],[J*.99,1.72,.15],.035),b(g,J*.88,1.67,.08,.145,.09,.15),b(d,J*.89,1.48,.1,.16,.22,.12);for(let De=0;De<4;De++)b(f,J*(.79+De*.065),1.36,.15,.035,.13,.045);b(f,J*.75,1.48,.2,.06,.12,.06)}b(d,0,3.04,0,.25,.27,.24),b(d,0,3.39,0,.36,.43,.31);for(let J of[-1,1])b(f,J*.36,3.4,.01,.12,.17,.09),b(d,J*.36,3.4,.065,.065,.1,.035),b(f,J*.15,3.43,.258,.15,.12,.075),b(g,J*.14,3.44,.32,.045,.035,.02),b(m,J*.13,3.45,.335,.009,.01,.006),b(d,J*.15,3.53,.28,.18,.05,.07);b(f,0,3.23,.27,.26,.18,.13),b(f,0,3.34,.34,.14,.08,.08),b(g,0,3.17,.375,.17,.017,.018),b(f,0,3.13,.36,.17,.035,.025);let D=new ke;s.add(D),b(g,0,3.51,-.02,.41,.42,.35,D),b(p,0,3.64,.015,.07,.3,.36,D);for(let J of[-1,1])b(g,J*.32,3.29,.015,.1,.31,.24,D),b(p,J*.39,3.43,.07,.025,.05,.05,D);let O=b(_,0,3.44,.27,.38,.19,.14,D);for(let J of[-1,1])S(g,[J*.28,2.88,.25],[J*.1,2.58,.33],.035),S(g,[J*.3,2.28,.3],[J*.39,2.09,.26],.018);for(let J=0;J<6;J++)b(p,0,2.03+J*.14,.35,.015,.015,.01);let F=document.createElement("canvas");F.width=512,F.height=256;let k=F.getContext("2d"),I=new kt(F);I.colorSpace=bt;let U=new qe(new Xt(.28,.12),new wt({map:I,roughness:.9}));U.position.set(-.27,2.46,.317),s.add(U);let K=new ke;for(let J=0;J<3;J++)for(let De=0;De<5;De++){let R=new qe(new Xt(.048,.048),(De+J)%2?g:m);R.position.set(-.36+De*.048,2.62+J*.048,.318),K.add(R)}s.add(K);function j(J){v.color.set(n.item("suit",J.suit).color),y.color.set(n.item("pants",J.pants).color),x.color.set(n.item("shoes",J.shoes).color),D.visible=J.helmet!=="none",O.position.y=J.visor==="open"?3.71:3.44,O.rotation.x=J.visor==="open"?-.8:0,U.visible=J.patch!=="none",k.fillStyle="#22282b",k.fillRect(0,0,512,256),k.strokeStyle="#c9af74",k.lineWidth=12,k.strokeRect(8,8,496,240),k.fillStyle="#eee0b5",k.font="bold 72px Arial",k.textAlign="center",k.fillText(J.patch==="name"?J.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":J.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),I.needsUpdate=!0}j(e),t.yaw??=0,t.pitch??=.07;let re=null,ge,Q=!1;function de(){let J=r.clientWidth,De=r.clientHeight;!J||!De||(a.setSize(J,De,!1),o.aspect=J/De,o.updateProjectionMatrix())}let Ie=new ResizeObserver(de);Ie.observe(r),de();let ze=J=>{re={id:J.pointerId,x:J.clientX,y:J.clientY},r.setPointerCapture(J.pointerId),J.preventDefault()},Ae=J=>{!re||re.id!==J.pointerId||(t.yaw-=(J.clientX-re.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(J.clientY-re.y)*.006)),re.x=J.clientX,re.y=J.clientY)},Ve=()=>{re=null},ie=J=>{(J.key==="ArrowLeft"||J.key==="ArrowRight")&&(t.yaw+=J.key==="ArrowLeft"?.15:-.15,J.preventDefault())};r.addEventListener("pointerdown",ze),r.addEventListener("pointermove",Ae),r.addEventListener("pointerup",Ve),r.addEventListener("pointercancel",Ve),r.addEventListener("keydown",ie);function Te(){if(Q)return;Q=!0,cancelAnimationFrame(ge),Ie.disconnect();for(let[De,R]of[["pointerdown",ze],["pointermove",Ae],["pointerup",Ve],["pointercancel",Ve],["keydown",ie]])r.removeEventListener(De,R);let J=new Set;i.traverse(De=>{De.geometry?.dispose(),De.material&&J.add(De.material)});for(let De of J)De.dispose();I.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function we(){if(Q)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Te();return}let J=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*J,1.95+Math.sin(t.pitch)*J,Math.cos(t.yaw)*Math.cos(t.pitch)*J),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ge=requestAnimationFrame(we)}return we(),{update:j,dispose:Te,state:t}};function hu(r){let e=new ke;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(F,k,I)=>new Sn({color:F,metalness:k,roughness:I,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),l=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),c=(F,k,I=0,U=0,K=0)=>{let j=new qe(F,k);return j.position.set(I,U,K),j.castShadow=j.receiveShadow=!0,e.add(j),j},h=(F,k,I,U=!0)=>{let K=new jn;return K.absarc(k,I,F,0,Math.PI*2,U),K},u=t?.395:.437,d=new Wt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let F=0;F<24;F++)for(let[k,I]of[[.28,0],[.36,.045]]){let U=F*Math.PI/12+I;d.holes.push(h(n?.009:.011,Math.cos(U)*k,Math.sin(U)*k))}for(let F of[0,.033])c(new Vt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,F);let f=new nt(.22,.014,.025),g=new jr(f,a,32),m=new vt;for(let F=0;F<32;F++){let k=F*Math.PI/16;m.compose(new A(Math.cos(k)*.31,Math.sin(k)*.31,.021),new Hn().setFromAxisAngle(new A(0,0,1),k+.18),new A(1,1,1)),g.setMatrixAt(F,m)}e.add(g);let p=c(new $e(.184,.16,.045,48),a,0,0,.018);p.rotation.x=Math.PI/2;let v=c(new $e(.095,.11,.055,32),s,0,0,.035);v.rotation.x=Math.PI/2;for(let F=0;F<10;F++){let k=F*Math.PI/5,I=c(new $e(.017,.017,.015,12),s,Math.cos(k)*.18,Math.sin(k)*.18,.05);I.rotation.x=Math.PI/2;let U=c(new $e(.009,.009,.018,6),a,Math.cos(k)*.18,Math.sin(k)*.18,.058);U.rotation.x=Math.PI/2}for(let F of[.235,.26,.31,.335,.39,.414])if(F<u){let k=c(new Ut(F,.0012,3,96),a,0,0,.042);k.castShadow=!1}if(!t)for(let F=0;F<8;F++){let k=F*Math.PI/4,I=[.25,.29,.34,.395].map((K,j)=>new A(Math.cos(k+j*.075)*K,Math.sin(k+j*.075)*K,.043)),U=c(new Ct(new Rt(I),12,.0024,3,!1),a);U.castShadow=!1}let y=new Wt;y.moveTo(-.08,-.2),y.quadraticCurveTo(-.13,-.15,-.115,-.06),y.lineTo(-.115,.1),y.quadraticCurveTo(-.12,.19,-.05,.215),y.lineTo(.055,.19),y.quadraticCurveTo(.11,.14,.105,.06),y.lineTo(.105,-.1),y.quadraticCurveTo(.1,-.19,.04,-.21),y.closePath();let x=c(new Vt(y,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),l,.323,.005,.011);t&&x.scale.set(.8,.8,.8),c(new nt(.09,.31,.032),a,.27,0,.005);for(let F of[-.125,0,.125]){let k=c(new $e(.055,.055,.028,24),l,.354,F,.07);k.rotation.x=Math.PI/2}for(let F of[-.155,.155]){let k=c(new $e(.014,.014,.025,6),s,.325,F,.094);k.rotation.x=Math.PI/2}let _=document.createElement("canvas");_.width=128,_.height=384;let b=_.getContext("2d");b.fillStyle="#f5f0df",b.translate(64,192),b.rotate(-Math.PI/2),b.textAlign="center",b.font="italic bold 60px Arial",b.fillText(t?"P21":"P21 SPORT",0,20);let S=new kt(_);S.colorSpace=bt;let D=c(new Xt(.075,.24),new In({map:S,transparent:!0,depthWrite:!1}),.329,0,.1);D.castShadow=!1;let O=c(new $e(.012,.014,.047,6),s,.36,.217,.042);return O.rotation.z=.2,e}var cu;function Zp(r,e){if(!r.isConnected)return;if(!cu){let a=new si({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=bt,a.toneMapping=ri,a.toneMappingExposure=1.15;let o=new Tn;o.add(new Kn("#eaf1ff","#342a22",2));for(let[c,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let f=new qn("#ffffff",d);f.position.set(c,h,u),o.add(f)}let l=new sn(30,1,.1,10);l.position.set(.65,.35,2.1),l.lookAt(.025,0,0),cu={renderer:a,scene:o,camera:l,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=cu;s[e]||(s[e]=hu(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Jp(r){let e=new ke;e.name="tyre-"+r;let t=new wt({color:"#15181b",roughness:.86}),n=new wt({color:"#050708",roughness:.96}),i=new wt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(c,h)=>{let u=new qe(c,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new Ri([new Ee(.56,-.19),new Ee(.63,-.25),new Ee(.72,-.23),new Ee(.79,-.15),new Ee(.8,-.1),new Ee(.8,.1),new Ee(.79,.15),new Ee(.72,.23),new Ee(.63,.25),new Ee(.56,.19)],96),t);if(a.rotation.x=Math.PI/2,r!=="semi")for(let c of[-1,1]){let h=s(new Ut(.69,.009,8,80),i);h.position.z=c*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,f=s(new nt(.018,.036,.006),i);f.position.set(Math.sin(d)*.71,Math.cos(d)*.71,c*.246),f.rotation.z=-d}}let o=r==="wet",l=r==="semi";if(o||l){let c=o?34:14;for(let h=0;h<c;h++)for(let u of[-1,1]){let d=h*2*Math.PI/c+(u<0?Math.PI/c*.45:0),f=Array.from({length:23},(m,p)=>{let v=p/22,y=u*((l?.035:.012)+v*(l?.175:.198)),x=.8-.045*(Math.abs(y)/.2)**3,_=d+(l?.25:.19)*(1-v)*(1-v);return new A(Math.sin(_)*x,Math.cos(_)*x,y)}),g=s(new Ct(new Rt(f),28,o?.008:.009,6,!1),n);g.name="tread-shoulder-groove"}if(o)for(let h of[-.14,-.045,.045,.14]){let u=s(new Ut(.798,.007,8,96),n);u.position.z=h,u.name="tread-water-channel"}}return e}function Kp(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new A;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Re(a,1));let l=i.material,c=l.clone();for(let u of["color","emissive"])l[u]&&(c[u]=l[u]);c.onBeforeCompile=n,c.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=c,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])c[u]!==l[u]&&(c[u]=l[u],(u.endsWith("Map")||u==="map")&&(c.needsUpdate=!0))};let h=new Sr({depthPacking:Zs});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function $p(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",l=new ke;l.name="front-wing-"+r;let c=o?3.56:a?3.32:3.1,h=a?4:2,u=(b,S,D)=>{let O=new qe(b,S);return O.name=D,O.castShadow=O.receiveShadow=!0,l.add(O),O};for(let b=0;b<h;b++){let S=[],D=[];for(let I=0;I<=72;I++){let U=I/72*2-1,K=U*c/2,j=(b?a?.36:.46:.76)*(1-.22*U*U),re=(b?2.86+b*.055:3.02)-.13*U*U,ge=.43+b*.095+.1*Math.pow(Math.abs(U),3);for(let Q=0;Q<=28;Q++){let de=Q/28*Math.PI*2,Ie=Math.cos(de);S.push(re+Ie*j/2,ge+.035*(1-Ie*Ie)+Math.sin(de)*(b?.024:.035),K)}if(I<72)for(let Q=0;Q<28;Q++){let de=I*29+Q,Ie=de+28+1;D.push(de,de+1,Ie,de+1,Ie+1,Ie)}}let k=new pt;k.setAttribute("position",new Re(S,3)),k.setIndex(D),k.computeVertexNormals(),u(k,b===0?n:t,"wing-element-"+b)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],f=[0,1,2,3].map(b=>new Rt(d.map((S,D)=>new A(S[b],D,0)),!1,"catmullrom",.35)),g=[],m=[],p=96,v=48;for(let b=0;b<=p;b++){let S=b/p,[D,O,F,k]=f.map(I=>I.getPoint(S).x);for(let I=0;I<=v;I++){let U=I/v*Math.PI*2,K=Math.cos(U),j=Math.sin(U),re=a?.7:.82;g.push(D,O+Math.sign(j)*Math.pow(Math.abs(j),re)*k,Math.sign(K)*Math.pow(Math.abs(K),re)*F)}if(b<p)for(let I=0;I<v;I++){let U=b*(v+1)+I,K=U+1;m.push(U,U+v+1,K,K,U+v+1,K+v+1)}}let y=m.length;for(let b of[0,p]){let S=b*(v+1);for(let D=1;D<v-1;D++)b===0?m.push(S,S+D,S+D+1):m.push(S,S+D+1,S+D)}let x=new pt;x.setAttribute("position",new Re(g,3)),x.setIndex(m),x.computeVertexNormals();let _=Math.floor(p*.89)*v*6;x.addGroup(0,_,0),x.addGroup(_,y-_,a?1:0),x.addGroup(y,m.length-y,0),u(x,[t,s],"tapered-nose");for(let b of[-1,1]){let S=u(new nt(.15,.4,.035),n,"nose-pylon");S.position.set(2.94,.69,b*.1),S.rotation.z=-.15;let D=new Wt;D.moveTo(2.57,.38),D.lineTo(3.43,.38),D.quadraticCurveTo(3.53,.42,3.43,.61),D.lineTo(3.14,a?.69:.64),D.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),D.closePath();let O=u(new Vt(D,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");O.position.z=b*c/2-.017,u(new nt(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,b*(c/2+.055));let k=new Rt([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([I,U])=>new A(I,U,b*(c/2+.025))));if(u(new Ct(k,28,.009,6,!1),s,"endplate-trim"),a)for(let I=0;I<3;I++){let U=u(new nt(.27,.075,.018),n,"flow-fin");U.position.set(2.86+I*.07,.54+I*.045,b*(1.1+I*.1)),U.rotation.z=.15}}for(let b of l.children){let S=b.geometry?.getAttribute("position");if(S){for(let D=0;D<S.count;D++)S.setX(D,S.getX(D)*.78);b.geometry.computeVertexNormals()}b.position.x=.2332+b.position.x*.78}return l}function ls(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new Pn;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new vt().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function uu(r,{paint:e,carbon:t,metal:n}){let i=new ke;i.name="rear-wing-"+r;let s=new ke;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),l=r==="double"||a,c=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||l?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(v,y,x,_,b,S,D=i){let O=new qe(v,y);return O.name=x,O.position.set(_,b,S),O.castShadow=O.receiveShadow=!0,D.add(O),O}function f(v,y,x,_,b){let S=new Wt;S.moveTo(-_*.5,0),S.bezierCurveTo(-_*.52,.055,-_*.12,.07,_*.5,.008),S.quadraticCurveTo(_*.05,-.025,-_*.5,0);let D=new Vt(S,{depth:x,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});D.translate(0,0,-x/2);let O=d(D,b,"rear-wing-blade",v,y,0,s);O.rotation.z=-.08}if(f(0,c,h,u,o||r==="sport"?t:n),l&&f(.025,c+.23,h*.96,u*.7,t),a&&f(-.05,c-.18,h,.3,e),r!=="lip")for(let v of[-1,1])d(new nt(u+.1,l?.42:.24,.035),o?e:t,"rear-wing-endplate",0,c+(l?.11:.05),v*h/2,s);let g=[];for(let v of[-.72,.72]){d(new nt(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,v);for(let _ of[-2.36,-2.22])d(new $e(.018,.018,.012,6),n,"rear-frame-bolt",_,1.034,v);let y=d(new nt(1,.075,.085),t,"rearward-mount-arm",0,1.015,v),x=d(new nt(.085,1,.075),t,"rear-wing-upright",0,0,v);g.push({lower:y,post:x,z:v})}let m=ls([s],i).max.x;function p(v){let y=Math.min(-2.85,v&&!v.isEmpty()?v.min.x-.24-m:-2.85);s.position.x=y;for(let{lower:x,post:_}of g)x.position.x=(-2.29+y)/2,x.scale.x=Math.abs(y+2.29),_.position.set(y,(c-.04+1.015)/2,_.position.z),_.scale.y=c-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=y,i.updateMatrixWorld(!0)}return p(),i.userData.fitTurbines=p,i}function Qp(r="classic"){let e=new ke;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new wt({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new wt({color:"#161d23",roughness:.83,metalness:.15}),a=new wt({color:"#0c1116",roughness:.95});function o(l,c,h,u,d,f,g=e){let m=new qe(l,c);return m.name=h,m.position.set(u,d,f),m.castShadow=m.receiveShadow=!0,g.add(m),m}o(new nt(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let l of[.67,1.2])for(let c of[-.32,.32])o(new $e(.016,.016,.012,6),i,"mount-bolt",l,1.058,c);for(let[l,c,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new $e(.037,.037,h+.06,20),i,l+"-hinge",.72,1.09,c);u.rotation.x=Math.PI/2;let d=new A(.72,1.09,c),f=new A(1.1,1.31,c),g=f.clone().sub(d),m=d.clone().add(f).multiplyScalar(.5);o(new nt(.055,g.length(),.035),i,l+"-lever",...m.toArray()).quaternion.setFromUnitVectors(new A(0,1,0),g.normalize());let v=l==="brake"?.24:.32,y=new Wt,x=h/2,_=v/2,b=.025;if(y.moveTo(-x+b,-_),y.lineTo(x-b,-_),y.quadraticCurveTo(x,-_,x,-_+b),y.lineTo(x,_-b),y.quadraticCurveTo(x,_,x-b,_),y.lineTo(-x+b,_),y.quadraticCurveTo(-x,_,-x,_-b),y.lineTo(-x,-_+b),y.quadraticCurveTo(-x,-_,-x+b,-_),n)for(let O of[-.065,0,.065])for(let F of l==="brake"?[-.055,.055]:[0]){let k=new jn;k.absarc(F,O,.014,0,Math.PI*2,!0),y.holes.push(k)}let S=o(new Vt(y,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,l+"-face",1.115,1.32,c);S.rotation.y=-Math.PI/2,S.rotation.z=-.18;for(let O of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new nt(h*.76,.009,.007),n?a:i,l+"-grip",0,O,-.007,S);let D=Array.from({length:65},(O,F)=>{let k=F/64,I=k*Math.PI*12;return new A(.77+k*.23,1.095+k*.15+Math.sin(I)*.018,c+.045+Math.cos(I)*.018)});if(o(new Ct(new Rt(D),64,.004,6,!1),i,l+"-return-spring",0,0,0),t){let O=o(new $e(.025,.025,.25,16),s,l+"-hydraulic-cylinder",.95,1.14,c-.055);O.rotation.z=-1.05}}return e}function pu(r){let e=new ke;e.name="sport-seat-"+r;let t=(I,U=.8,K=0)=>new Sn({color:I,roughness:U,metalness:K,clearcoat:K?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),l=t("#10151c",.32,.35),c=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),f=document.createElement("canvas");f.width=f.height=64;let g=f.getContext("2d");g.fillStyle="#30343b",g.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let U=0;U<64;U+=8)g.fillStyle=(U+I)%16?"#121820":"#626973",g.fillRect(U,I,7,3),g.fillStyle="#252b33",g.fillRect(U,I+4,3,4);let m=new kt(f);m.wrapS=m.wrapT=bn,m.repeat.set(3,5),m.colorSpace=bt,l.map=m,l.bumpMap=m,l.bumpScale=.004;let p=(I,U,K=0,j=0,re=0,ge=e)=>{let Q=new qe(I,U);return Q.position.set(K,j,re),Q.castShadow=Q.receiveShadow=!0,ge.add(Q),Q},v=(I,U,K,j,re,ge,Q,de,Ie=e)=>{let ze=new Wt,Ae=-I/2,Ve=-U/2;return j=Math.min(j,I/2,U/2,K/2),ze.moveTo(Ae+j,Ve),ze.lineTo(Ae+I-j,Ve),ze.quadraticCurveTo(Ae+I,Ve,Ae+I,Ve+j),ze.lineTo(Ae+I,Ve+U-j),ze.quadraticCurveTo(Ae+I,Ve+U,Ae+I-j,Ve+U),ze.lineTo(Ae+j,Ve+U),ze.quadraticCurveTo(Ae,Ve+U,Ae,Ve+U-j),ze.lineTo(Ae,Ve+j),ze.quadraticCurveTo(Ae,Ve,Ae+j,Ve),p(new Vt(ze,{depth:K-2*j,bevelEnabled:!0,bevelSize:j,bevelThickness:j,bevelSegments:4,curveSegments:12}),re,ge,Q,de-K/2+j,Ie)},y=(I,U,K,j=e)=>p(new Ct(new Rt(I.map(re=>new A(...re))),32,U,6,!1),K,0,0,0,j),x=new ke;x.rotation.x=-.14,x.position.set(0,.2,0),e.add(x);let _=new Wt;_.moveTo(-.29,0),_.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),_.lineTo(-.47,.92),_.quadraticCurveTo(-.46,1.02,-.34,1.11),_.lineTo(-.28,1.21),_.lineTo(-.26,1.48),_.quadraticCurveTo(0,1.62,.26,1.48),_.lineTo(.28,1.21),_.lineTo(.34,1.11),_.quadraticCurveTo(.46,1.02,.47,.92),_.lineTo(.43,.65),_.bezierCurveTo(.39,.42,.38,.2,.29,0),_.closePath();for(let I of[-.135,.135]){let U=new jn;U.moveTo(I-.075,1.24),U.lineTo(I+.075,1.24),U.lineTo(I+.075,1.34),U.lineTo(I-.075,1.34),U.closePath(),_.holes.push(U)}p(new Vt(_,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),l,0,0,-.09,x),p(new Vt(_,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,x).scale.set(.96,.97,1),v(.41,.18,.095,.025,a,0,1.43,.035,x),v(.46,.5,.12,.035,o,0,.85,.065,x),v(.45,.31,.17,.04,o,0,.4,.1,x);for(let I of[-1,1]){let U=v(.17,.42,.19,.055,a,I*.34,.98,.1,x);U.rotation.z=I*.28,U.rotation.y=-I*.25;let K=v(.13,.55,.23,.045,a,I*.3,.49,.14,x);K.rotation.z=-I*.12,y([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,c,x);let j=I*.135;for(let re of[1.235,1.345])v(.16,.014,.022,.004,h,j,re,.015,x);for(let re of[j-.08,j+.08])v(.014,.12,.022,.004,h,re,1.29,.015,x)}let S=v(n?.86:.77,.045,.84,.012,l,0,.435,.34);S.name="seat-base";let D=v(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);D.name="seat-cushion",v(.54,.15,.17,.045,a,0,.52,.77);for(let I of[.2,.33,.46,.59])y([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,c);if(n){for(let I of[-1,1])v(.14,.13,.64,.04,a,I*.45,.65,.32),v(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let U of[-.1,.1])y([[U-.1,I,.18],[U,I+.07,.18],[U+.1,I,.18]],.003,c,x)}i&&(v(.47,.1,.22,.035,a,0,.56,.86),y([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,c));for(let I of[-1,1]){let U=v(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);U.rotation.z=-I*.12,y([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,c),v(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let K of[.02,.65])v(.13,.09,.12,.015,l,I*.28,-.055,K),p(new $e(.022,.022,.015,12),h,I*.28,-.002,K)}for(let I=.3;I<1.08;I+=.11)y([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,c,x);for(let I of[-1,1]){let U=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],K=[],j=[];U.forEach(([de,Ie,ze],Ae)=>{K.push(de-.033,Ie,ze,de+.033,Ie,ze),Ae&&j.push(Ae*2-2,Ae*2-1,Ae*2,Ae*2-1,Ae*2+1,Ae*2)});let re=new pt;re.setAttribute("position",new Re(K,3)),re.setIndex(j),re.computeVertexNormals();let ge=u.clone();ge.side=Yt,p(re,ge);let Q=v(.27,.055,.025,.008,u,I*.18,.64,.45);Q.rotation.z=-I*.2}let O=p(new $e(.065,.065,.035,24),h,0,.66,.48);O.rotation.x=Math.PI/2;let F=p(new $e(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);F.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let k=new Pn().setFromObject(S).min.y;for(let I of e.children)I.position.y-=k;return e.userData.floorContact=0,e}var du;function ef(r,e){if(!r.isConnected||e==="none")return;if(!du){let a=new si({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=bt,a.toneMapping=ri,a.toneMappingExposure=1.25;let o=new Tn;o.add(new Kn("#eaf1ff","#3e3028",2));for(let[c,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let f=new qn("#ffffff",d);f.position.set(c,h,u),o.add(f)}let l=new sn(30,1,.1,20);l.position.set(1.8,1.55,3.6),l.lookAt(0,.78,.12),du={renderer:a,scene:o,camera:l,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=du;s[e]||(s[e]=pu(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Yp;window.pokerPaintBrakePreview=Zp;window.pokerPaintSeatPreview=ef;var tf=(r,e,t)=>Math.max(e,Math.min(t,r));function fu(r,e,t={}){let n=window.PokerGarage,i=new ke;r.add(i),i.scale.set(1.24,.86,.95);let s=(M,C,V)=>new Sn({color:M,metalness:C,roughness:V,clearcoat:C>.3?.65:.12,clearcoatRoughness:.12}),a=s(n.item("paint",e.paint).color,.55,.24),o=s(n.item("paint",e.paint).color,0,.93),l=s("#e5aa28",1,.135),c=s("#171a1e",.04,.76),h=s(n.wheelPaintColor(e),.86,.25),u=s("#0d1417",.35,.3),d=s("#060809",.12,.36),f=s(n.item("light",e.light).color,.45,.2),g=s("#123e47",.86,.22);f.emissive.copy(f.color),f.emissiveIntensity=2;function m(M,C,V=0,le=0,z=0,ve=i){if(t.prepareGeometry){let fe=t.prepareGeometry(M);fe!==M&&(M.dispose(),M=fe)}let te=new qe(M,C);return te.position.set(V,le,z),te.castShadow=!0,te.receiveShadow=!0,ve.add(te),te}let p=(M,C,V,le,z,ve,te)=>m(new nt(M,C,V),le,z,ve,te);function v(M,C,V,le,z,ve,te="y"){let fe=m(new $e(M,M,C,64),V,le,z,ve);return te==="z"&&(fe.rotation.x=Math.PI/2),te==="x"&&(fe.rotation.z=Math.PI/2),fe}function y(M,C,V,le,z,ve,te="z"){let fe=m(new Ut(M,C,12,80),V,le,z,ve);return te==="y"&&(fe.rotation.x=Math.PI/2),te==="x"&&(fe.rotation.y=Math.PI/2),fe}function x(M,C,V,le=Wt){let z=new le,ve=-M/2,te=-C/2;return V=Math.min(V,C/2-.001),z.moveTo(ve+V,te),z.lineTo(ve+M-V,te),z.quadraticCurveTo(ve+M,te,ve+M,te+V),z.lineTo(ve+M,te+C-V),z.quadraticCurveTo(ve+M,te+C,ve+M-V,te+C),z.lineTo(ve+V,te+C),z.quadraticCurveTo(ve,te+C,ve,te+C-V),z.lineTo(ve,te+V),z.quadraticCurveTo(ve,te,ve+V,te),z}function _(M,C,V,le,z,ve,te=null,fe=.025){let Me=x(M,C,le);if(te){let _t=x(te[0],te[1],te[2],jn),ht=new jn(_t.getPoints(40).map(ae=>new Ee(ae.x+(te[3]||0),ae.y)));Me.holes.push(ht)}let mt=m(new Vt(Me,{depth:V,bevelEnabled:fe>0,bevelSize:fe,bevelThickness:fe,bevelSegments:4,curveSegments:40}),z,0,ve,0);return mt.rotation.x=-Math.PI/2,mt}let b=[],S=i.children.length,D=[3.02,1.51,.65,-.28],O=x(4.96,2.44,1.15).getSpacedPoints(128),F=[],k=[],I=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,C]of I)for(let V=0;V<128;V++){let le=O[V];F.push(le.x*C,M,-le.y*C)}for(let M=0;M<3;M++)for(let C=0;C<128;C++){let V=M*128+C,le=M*128+(C+1)%128;k.push(V,le,V+128,le,le+128,V+128)}let U=new pt;U.setAttribute("position",new Re(F,3)),U.setIndex(k),U.computeVertexNormals(),a.side=Yt,m(U,a);let K=_(5.03,2.51,.065,1.19,l,.58,null,.035);_(5.1,2.58,.09,1.22,l,1.25,D,.035);let j=new Rt(x(4.94,2.42,1.15).getPoints(40).map(M=>new A(M.x,1.44,-M.y)),!0,"centripetal");m(new Ct(j,240,.125,16,!0),d);for(let M of[-1,1]){let C=Array.from({length:21},(V,le)=>{let z=.26+le*.25/20;return new A(1.32+1.15*Math.cos(z),1.44,M*(.06+1.15*Math.sin(z)))});m(new Ct(new Rt(C),32,.132,20,!1),l)}_(4.65,2.14,.035,1.03,l,1.39,D,.015),_(4.52,2.01,.025,.97,o,1.43,D,.01),b.push(...i.children.slice(S));let re=_(2.98,1.47,.025,.63,o,.94);re.position.x=-.28;let ge=new Sn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Yt,polygonOffset:!0,polygonOffsetFactor:-1}),Q=new ar(x(2.9,1.4,.6)),de=Q.attributes.position,Ie=Q.attributes.uv;for(let M=0;M<de.count;M++)Ie.setXY(M,(de.getX(M)+1.45)/2.9,(de.getY(M)+.7)/1.4);let ze=m(Q,ge,-.28,1.005,0);ze.rotation.x=-Math.PI/2,ze.castShadow=!1;let Ae=ge.clone(),Ve=[];for(let M of[-1,1]){let C=m(new Xt(3.05,.3),Ae,0,1.04,M*1.329);M<0&&(C.rotation.y=Math.PI),C.castShadow=!1,Ve.push(C)}function ie(M){let C=M.vinyl||"none";ze.visible=C!=="none",Ve.forEach(le=>le.visible=C!=="none");let V=C+":"+(M.vinylText||"");if(ge.userData.id!==V){ge.map?.dispose(),Ae.map?.dispose(),ge.map=new kt(n.vinylCanvas(C,!1,M.vinylText)),Ae.map=new kt(n.vinylCanvas(C,!0,M.vinylText));for(let le of[ge,Ae]){le.map.colorSpace=bt,le.map.anisotropy=16;let z=le.map;z.image.addEventListener("vinyl-ready",()=>{z.needsUpdate=!0},{once:!0}),le.needsUpdate=!0,le.userData.id=V}}}let Te=_(3.13,1.62,.018,.7,l,1.46,[3.02,1.51,.65,0],.006);Te.position.x=-.28;let we=_(3.08,1.57,.46,.68,a,.96,[3.02,1.51,.65,0],.005);we.position.x=-.28;for(let M of[-1,-.35,.35])for(let C of[-.75,.75])p(.011,.4,.009,u,M,1.2,C);function J(M,C){let V=document.createElement("canvas");V.width=V.height=256;let le=V.getContext("2d");le.fillStyle=M,le.fillRect(0,0,256,256);let z=17;for(let te=0;te<18e3;te++)z=z*1664525+1013904223>>>0,le.fillStyle="rgba(0,0,0,"+C+")",le.fillRect(z%256,(z>>>8)%256,1,1);let ve=new kt(V);return ve.colorSpace=bt,ve.wrapS=ve.wrapT=bn,ve}o.map=J("#e8e8e8",.035),o.bumpMap=J("#888888",.5),o.bumpScale=.0015,o.clearcoat=0,c.bumpMap=J("#888888",.12),c.bumpScale=.003,d.bumpMap=J("#888888",.3),d.bumpScale=.001;function De(M,C,V,le,z,ve=!1,te=i){let fe=new Wt;fe.moveTo(0,.5),fe.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),fe.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),fe.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),fe.bezierCurveTo(.48,.12,.12,.28,0,.5),fe.moveTo(-.12,-.3),fe.lineTo(0,-.06),fe.lineTo(.12,-.3),fe.closePath();let Me=m(new Vt(fe,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),C,V,le,z,te);return Me.scale.setScalar(M),ve&&(Me.rotation.y=Math.PI),Me}let R=[],P=[],Y=[],X=null;for(let M of[-1.72,1.72])for(let C of[-1,1]){let V=C*1.36,le=C*1.57,z=new ke;z.position.set(M,.81,V),i.add(z),z.userData.groundWheel=!0;let ve=i.children.length,te=m(new Ri([new Ee(.56,-.19),new Ee(.61,-.245),new Ee(.67,-.25),new Ee(.76,-.19),new Ee(.8,-.1),new Ee(.8,.1),new Ee(.76,.19),new Ee(.67,.25),new Ee(.61,.245),new Ee(.56,.19)],80),c,M,.81,V);te.rotation.x=Math.PI/2;for(let ae=-2;ae<=2;ae++)y(.798-Math.abs(ae)*.012,.0035,u,M,.81,V+ae*.071);for(let ae=0;ae<28;ae++){let Se=ae*Math.PI/14,je=Array.from({length:17},(st,lt)=>{let Ft=lt/16,Zt=-.205+Ft*.41,gt=.799-.044*Math.pow(Math.abs(Zt)/.205,3),rt=Se+.13*Math.sin(Ft*Math.PI);return new A(M+Math.sin(rt)*gt,.81+Math.cos(rt)*gt,V+Zt)});m(new Ct(new Rt(je),20,.0045,5,!1),u)}for(let ae of[-1,1])for(let Se of[.625,.654,.681])y(Se,.0035,u,M,.81,V+ae*.244);let fe=i.children.slice(ve);y(.548,.023,h,M,.81,le+C*.035),y(.505,.016,h,M,.81,le+C*.043),v(.14,.045,u,M,.81,le+C*.045,"z"),y(.14,.012,h,M,.81,le+C*.069);let Me=s("#39434a",.78,.28);Me.side=Yt;let mt=m(new $e(.544,.544,.44,64,1,!0),Me,M,.81,V);mt.rotation.x=Math.PI/2,y(.548,.025,h,M,.81,V-C*.245),y(.505,.013,h,M,.81,V-C*.253),v(.16,.1,Me,M,.81,V-C*.22,"z"),y(.16,.012,h,M,.81,V-C*.275),v(.075,.13,u,M,.81,V-C*.28,"z");for(let ae=0;ae<5;ae++){let Se=ae*Math.PI*2/5;v(.018,.024,h,M+Math.sin(Se)*.115,.81+Math.cos(Se)*.115,V-C*.282,"z")}let _t=De(.2,h,M,.8,le+C*.075,C<0);P.push(_t);for(let ae of n.wheelDesign()){let Se=new Rt(ae.map(([je,st])=>new A(M+je,.81+st,le+C*(.04+.025*(1-Math.hypot(je,st)/.51)))));R.push(m(new Ct(Se,20,.007,6,!1),h))}for(let ae=0;ae<20;ae++){let Se=ae*Math.PI/10;v(.006,.009,h,M+Math.sin(Se)*.526,.81+Math.cos(Se)*.526,le+C*.06,"z")}i.updateMatrixWorld(!0);for(let ae of i.children.slice(ve))z.attach(ae);z.scale.set(.88/1.24,.88/.86,1/.95),z.position.y=.715/.86;let ht={standard:fe};for(let ae of["soft","medium","hard","semi","wet"]){let Se=Jp(ae);Se.visible=!1,z.add(Se),ht[ae]=[Se]}Y.push({wheelGroup:z,x:M,out:le,sign:C,tyres:ht})}let E=[];for(let M of[-1,1])E.push(p(1.35,.43,.04,l,.05,.94,M*1.3));let N=[];for(let M of[-1,1])N.push(v(.275,.27,u,2.16,.945,M*.97,"z"),y(.278,.035,l,2.16,.945,M*1.11));for(let M of[-1.72,1.72]){let C=v(.07,2.8,u,M,.7,0,"z");C.userData.groundWheel=!0}p(3.6,.08,.8,u,0,.57,0);let q=[];function W(M,C,V){let le=document.createElement("canvas");le.width=M,le.height=C,V(le.getContext("2d"),M,C);let z=new kt(le);return z.colorSpace=bt,z.anisotropy=8,q.push(z),z}let _e=W(768,256,(M,C,V)=>{M.fillStyle="#101b18",M.fillRect(0,0,C,V),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,C-20,V-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",C/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",C/2,209)}),oe=[];for(let M of[-1,1]){let C=new Sn({map:_e,metalness:.55,roughness:.2,clearcoat:1});oe.push(C);let V=m(new Xt(1.28,.4),C,.05,.94,M*1.326);C.userData.plane=V,M<0&&(V.rotation.y=Math.PI)}let ce=[];for(let M of[-1,1])for(let C=0;C<3;C++){let V=new ke;V.position.set((C-1)*.82+.05,1,M*1.39),V.userData.side=M,V.scale.setScalar(1.17),M<0&&(V.rotation.y=Math.PI),i.add(V);let le=m(new nt(.1,.1,.025),l,0,0,0,V),z=new wt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ve=m(new Xt(.65,.65,32,8),z,0,0,.047,V);ve.castShadow=!1,ve.receiveShadow=!1,ce.push({group:V,mat:z,back:le,n:C})}for(let M of[-1,1])for(let C of[-.54,.64])for(let V of[.78,1.1]){let le=v(.014,.018,l,C,V,M*1.35,"z")}let Pe=i.children.length;for(let M of[-1.7,-.35,1.48])for(let C of[-1.21,1.21]){let V=v(.128,.13,l,M,1.44,C,"x")}for(let M of[-1.7,-.35,1.48])for(let C of[-1,1])y(.125,.004,u,M+.08,1.44,C*1.21,"x"),y(.125,.004,u,M-.08,1.44,C*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let C of[-.96,.96])v(.135,.08,l,M,1.49,C),v(.108,.082,u,M,1.498,C),y(.125,.015,l,M,1.54,C,"y"),y(.111,.006,l,M,1.535,C,"y");let Ye=[],Ue=[],tt=["#ab2338","#1b684b","#2455a5"].map(M=>s(M,.08,.55)),ct=s("#eee9d6",.04,.6),yt=i.children.length;for(let[M,C,V,le]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let z=0;z<le;z++){v(.104,.033,tt[V],M,1.49+z*.037,C);for(let ve=0;ve<6;ve++){let te=ve*Math.PI/3,fe=p(.024,.021,.012,ct.clone(),M+Math.cos(te)*.103,1.49+z*.037,C+Math.sin(te)*.103);fe.rotation.y=Math.PI/2-te,fe.castShadow=!1,fe.receiveShadow=!1,fe.userData.edgeIndex=ve,Ye.push(fe)}if(z===le-1){let ve=new wt({transparent:!0,alphaTest:.1,roughness:.65}),te=m(new Xt(.208,.208),ve,M,1.511+z*.037,C);te.rotation.x=-Math.PI/2,te.castShadow=!1,te.receiveShadow=!1,Ue.push({mat:ve,n:V})}}let Pt=i.children.slice(yt);b.push(...i.children.slice(Pe));let Et=new ke;Et.position.set(.47,1.78,0),Et.scale.set(.82/1.24,.82/.86,.82/.95),i.add(Et);let Mt=new ke;Et.add(Mt);let T=new A((.47-.96)*1.24,(1.78-1.42)*.86,0).normalize(),L=new A(0,0,1),H=new A().crossVectors(T,L).normalize();Mt.quaternion.setFromRotationMatrix(new vt().makeBasis(L,H,T));let ne=d.clone();m(new Ut(.53,.06,16,80),ne,0,0,0,Mt),m(new Ut(.473,.014,10,64),l,0,0,-.02,Mt);for(let M of[Math.PI]){let C=m(new nt(.09,.39,.045),l,Math.sin(M)*.26,Math.cos(M)*.26,0,Mt);C.rotation.z=-M}for(let M of[-1,1]){let C=m(new nt(.35,.075,.06),l,M*.265,0,0,Mt);m(new nt(.32,.035,.064),u,M*.265,0,.006,Mt)}let G=m(new $e(.195,.195,.075,64),l,0,0,.035,Mt);G.rotation.x=Math.PI/2;let Z=m(new Xn(.177,64),new wt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Mt);Z.receiveShadow=!1,De(.38,l,0,-.025,.105,!1,Mt);let ee={classic:new ke,sport:new ke,formula:new ke};for(let M of Mt.children.slice())ee.classic.add(M);Object.values(ee).forEach(M=>Mt.add(M));function ue(M,C,V,le){let z=new Rt(C.map(([ve,te])=>new A(ve,te,0)),!0);m(new Ct(z,72,V,12,!0),le,0,0,0,M)}ue(ee.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,ne);for(let M of[-1,1])m(new nt(.35,.065,.045),h,M*.27,0,0,ee.sport),m(new nt(.065,.3,.045),h,M*.12,-.22,0,ee.sport);m(new Ut(.5,.018,8,64,.22),f,0,0,.005,ee.sport),ue(ee.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,ne),m(new nt(.6,.23,.065),u,0,0,0,ee.formula);for(let M of[-1,1])m(new Ot(.035,12,8),f,M*.25,.055,.06,ee.formula),m(new nt(.08,.29,.025),h,M*.37,0,-.07,ee.formula);for(let M of["sport","formula"]){let C=m(new $e(.15,.15,.07,48),h,0,0,.035,ee[M]);C.rotation.x=Math.PI/2,m(new Xn(.13,48),u,0,0,.078,ee[M]),De(.25,h,0,-.018,.09,!1,ee[M])}for(let[M,C]of Object.entries(n.steeringDesigns)){let V=new ke;Mt.add(V),ee[M]=V;let le=s(M==="woodHeritage"?C.color:"#14191d",M==="woodHeritage"?.35:.04,M==="woodHeritage"?.24:.82),z=s(M==="drift"?"#c5a14f":M==="rallySuede"?"#292e33":"#b8c2c9",.85,.25);if(M==="trackYoke"){ot([[-.43,.39,0],[-.51,.12,0],[-.47,-.26,0],[0,-.39,0],[.47,-.26,0],[.51,.12,0],[.43,.39,0]],.065,le,V);for(let fe of[-1,1])m(new Ot(1,24,16),le,fe*.46,.15,.01,V).scale.set(.085,.28,.09),m(new nt(.25,.1,.055),z,fe*.23,-.07,.015,V);let te=m(new nt(.45,.28,.085),s("#20282e",.45,.35),0,-.02,.03,V);m(new nt(.2,.085,.012),u,0,.035,.08,V);for(let fe of[-1,1])for(let Me of[-.08,.05])m(new Ot(.023,12,8),z,fe*.15,Me,.085,V);continue}C.shape==="round"?m(new Ut(.53,.065,16,80),le,0,0,0,V):C.shape==="flat"?ue(V,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,le):ot([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,le,V);for(let te=0;te<C.spokes;te++){let fe=te*Math.PI*2/C.spokes,Me=m(new nt(.39,.065,.05),z,Math.cos(fe)*.25,Math.sin(fe)*.25,.015,V);Me.rotation.z=fe}let ve=m(new $e(.15,.15,.075,40),u,0,0,.05,V);ve.rotation.x=Math.PI/2,De(.23,h,0,-.015,.095,!1,V),(M==="rallySuede"||M==="carbonD")&&m(new nt(.045,.09,.025),s("#ed5555",.1,.6),0,.51,.06,V)}let me=s("#b9ab8a",.15,.8),w=s("#171c20",.02,.85);for(let[M,C]of Object.entries(ee)){if(M==="trackYoke")continue;let V=M==="classic"?.53:M==="sport"?.51:.47;for(let z of[-1,1]){if(M!=="formula"){let ve=m(new Ut(V,.072,12,30,.64),w,0,0,.003,C);ve.rotation.z=z<0?Math.PI-.32:-.32}for(let ve=0;ve<9;ve++){let te=(z<0?Math.PI:0)-.28+ve*.07;m(new Ot(.007,6,4),me,Math.cos(te)*(V-.045),Math.sin(te)*(V-.045),.063,C)}}let le=m(new nt(.065,.1,.035),M==="classic"?l:f,0,M==="formula"?.16:.51,.045,C);for(let z=0;z<6;z++){let ve=z*Math.PI/3,te=m(new $e(.012,.012,.012,6),h,Math.cos(ve)*.13,Math.sin(ve)*.13,.099,C);te.rotation.x=Math.PI/2}}let $=new A(.96,1.32,0),se=new A(.47,1.78,0),he=se.clone().sub($),xe=$.clone().add(se).multiplyScalar(.5),Ge=p(.12,he.length(),.095,l,...xe.toArray());Ge.quaternion.setFromUnitVectors(new A(0,1,0),he.normalize());let Ce=Fe(.26,.08,.66,.035,u,.96,1.3,0);for(let M of[-1,1])Fe(.16,.16,.09,.02,u,.96,1.22,M*.26),v(.014,.012,l,.96,1.347,M*.24);Ce.name="steering-chassis-mount",p(.075,Ge.geometry.parameters.height-.04,.1,u,...xe.toArray()).quaternion.copy(Ge.quaternion);let Qe=-1.84,Oe=1.99,ut=.74,at=new ke;at.name="garage-turbine-primary",at.position.set(Qe,Oe,0),i.add(at);let ft=i.children.length;v(ut,.51,l,Qe,Oe,0,"z"),v(.67,.54,u,Qe,Oe,0,"z");for(let M of[-1,1]){let C=M*.29;y(.72,.055,u,Qe,Oe,C),y(.75,.022,l,Qe,Oe,C+M*.03),y(.665,.012,f,Qe,Oe,C+M*.025);for(let V=0;V<14;V++){let le=V*Math.PI/7,z=[],ve=[];for(let Me=0;Me<=16;Me++){let mt=Me/16,_t=.22+mt*.44,ht=le+.55*mt;for(let ae of[-.15,.15])z.push(Qe+Math.sin(ht+ae)*_t,Oe+Math.cos(ht+ae)*_t,C+M*(.018+Math.sin(mt*Math.PI)*.12))}for(let Me=0;Me<16;Me++){let mt=Me*2;ve.push(mt,mt+1,mt+2,mt+1,mt+3,mt+2)}let te=new pt;te.setAttribute("position",new Re(z,3)),te.setIndex(ve),te.computeVertexNormals(),g.side=Yt,m(te,g);let fe=new Rt(Array.from({length:17},(Me,mt)=>{let _t=mt/16,ht=.22+_t*.44,ae=le+.55*_t-.15;return new A(Qe+Math.sin(ae)*ht,Oe+Math.cos(ae)*ht,C+M*(.025+Math.sin(_t*Math.PI)*.12))}));m(new Ct(fe,20,.009,6,!1),f)}v(.215,.07,l,Qe,Oe,C+M*.085,"z"),v(.18,.085,u,Qe,Oe,C+M*.11,"z")}for(let M=0;M<12;M++){let C=M*Math.PI/6,V=p(.045,.15,.2,u,Qe+Math.cos(C)*.735,Oe+Math.sin(C)*.735,0);V.rotation.z=C}i.updateMatrixWorld(!0);for(let M of i.children.slice(ft))at.attach(M);at.rotation.set(0,Math.PI/2,0),at.scale.set(.96/1.24,.96/.86,.96/.95);let xt=at.clone(!0);xt.name="garage-turbine-secondary",i.add(xt);let Dt=new ke;at.add(Dt);let qt=s("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])m(new Ut(.765,.028,10,80),qt,0,0,M,Dt);for(let M=0;M<8;M++){let C=M*Math.PI/4,V=m(new $e(.025,.025,.025,6),qt,Math.sin(C)*.73,Math.cos(C)*.73,.35,Dt);V.rotation.x=Math.PI/2}let en={classic:new ke,dual:new ke,titanium:new ke},un=s("#a9b7c4",.92,.23),On=s("#668bb5",.88,.25);Object.values(en).forEach(M=>i.add(M));for(let[M,C]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let V of C){let le=M==="titanium"?On:un,z=m(new $e(.105,.105,.5,32),le,-2.42,.76,V,en[M]);z.rotation.z=Math.PI/2;let ve=m(new $e(.079,.079,.012,32),u,-2.678,.76,V,en[M]);ve.rotation.z=Math.PI/2;let te=m(new Ut(.094,.012,8,32),le,-2.69,.76,V,en[M]);te.rotation.y=Math.PI/2}for(let[M,C]of Object.entries(en)){let V=M==="classic"?[0]:[-.67,.67];for(let z of V){let ve=m(new $e(.18,.18,.52,40),un,-2.19,.76,z,C);ve.rotation.z=Math.PI/2;for(let te of[-2.36,-2.04]){let fe=m(new Ut(.184,.016,8,40),u,te,.76,z,C);fe.rotation.y=Math.PI/2,m(new nt(.07,.19,.07),un,te,.94,z,C)}}let le=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let z of le){let ve=m(new $e(.077,.077,.11,32,1,!0),s("#151c23",.35,.65),-2.63,.76,z,C);ve.rotation.z=Math.PI/2;let te=m(new Ut(.107,.018,10,40),M==="titanium"?On:un,-2.57,.76,z,C);if(te.rotation.y=Math.PI/2,M==="titanium")for(let[fe,Me]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let mt=m(new Ut(.106,.008,6,40),s(Me,.85,.3),fe,.76,z,C);mt.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let C=new Rt([new A(-2.16,1.46,M*.65),new A(-1.94,1.66,M*.69),new A(-1.3,1.59,M*.64),new A(-.98,1.47,M*.7)]);m(new Ct(C,32,.022,8,!1),l),p(.34,.06,.14,l,-1.84,1.48,M*.4)}for(let M of[-1,1]){let C=new Rt([new A(-2.45,1.1,M*.7),new A(-2.43,1.36,M*.72),new A(-2.19,1.55,M*.7),new A(-1.9,1.55,M*.68)]);m(new Ct(C,40,.075,14,!1),u),m(new Ct(C,40,.019,10,!1),l);for(let V of[-2.2,-1.96]){let le=new Rt([new A(V,1.43,M*.48),new A(V,1.63,M*.6),new A(V+.24,1.57,M*.82)]);m(new Ct(le,24,.017,8,!1),l)}}let Dr=i.children.length,An=[],Li=[],Ur=[];for(let M=0;M<=48;M++){let C=-.92+M*1.84/48;for(let V of[.64,1.23])Li.push(2.57-.28*(Math.sin(C)*1.25/1.1)**2,V,Math.sin(C)*1.25)}for(let M=0;M<48;M++){let C=M*2;Ur.push(C,C+2,C+1,C+1,C+2,C+3)}let hr=new pt;hr.setAttribute("position",new Re(Li,3)),hr.setIndex(Ur),hr.computeVertexNormals();let B=s("#00453f",.72,.14);B.clearcoat=1,B.side=Yt,m(hr,B);for(let M of[.635,1.225]){let C=Array.from({length:65},(V,le)=>{let z=-1.04+le*2.08/64;return new A(2.57-.28*(z/1.1)**2,M,z)});m(new Ct(new Rt(C),80,.034,12,!1),l)}for(let M of[-1,1]){let C=M*1,V=2.57-.28*(C/1.1)**2,le=new Rt([new A(V-.04,.635,C),new A(V+.05,.78,C),new A(V+.065,1.12,C),new A(V-.04,1.25,C)]);m(new Ct(le,32,.065,12,!1),l);for(let z of[.91,1.065]){let ve=Array.from({length:16},(te,fe)=>{let Me=M*(.51+fe*.41/15);return new A(2.57-.28*(Me/1.1)**2+.018,z,Me)});An.push(m(new Ct(new Rt(ve),24,.017,8,!1),f))}}let pe=i.children.length,be=[];for(let M=0;M<2;M++){let C=new ke;C.name="hood-playing-card-"+M,C.position.set(1.66+M*.08,1.495+M*.014,M?.23:-.23),C.rotation.set(-Math.PI/2,0,M?-.18:.18),i.add(C);let V=x(.54,.76,.035),le=new Vt(V,{depth:.004,bevelEnabled:!1,curveSegments:10});le.translate(0,0,-.004);let z=m(le,new wt({color:"#e1d8c4",roughness:.94,metalness:0}),0,0,0,C);z.castShadow=!1,z.receiveShadow=!1;let ve=new kt(n.cardCanvas(e.cards,M));ve.colorSpace=bt,ve.anisotropy=16;let te=new In({map:ve,transparent:!0,alphaTest:.1,toneMapped:!1,side:Yt,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});te.userData.style=e.cards,be.push(te);let fe=m(new Xt(.54,.76),te,0,0,.0015,C);fe.name="printed-card-face-"+M,fe.castShadow=!1,fe.receiveShadow=!1}let Le=i.children.slice(pe);b.push(...i.children.slice(Dr));let ye=new wt({map:new kt(n.plateCanvas(e)),roughness:.6}),Be=[];for(let M of[-1,1]){let C=m(new Xt(.79,.463),ye,M*2.605,1.01,0);C.rotation.y=M*Math.PI/2,Be.push({plate:C,sign:M}),M>0&&b.push(C)}let it=[],Ne={},Ze=s("#7d8c98",.82,.28),et=s("#202a32",.45,.38),St=s("#a7c6d5",.98,.055),Je=s("#182029",.35,.48);Je.bumpMap=J("#888888",.2),Je.bumpScale=.001;function Fe(M,C,V,le,z,ve,te,fe,Me){let mt=new Vt(x(M,C,le),{depth:V,bevelEnabled:!0,bevelSize:Math.min(.012,V*.2),bevelThickness:Math.min(.012,V*.2),bevelSegments:3,curveSegments:12});return mt.translate(0,0,-V/2),m(mt,z,ve,te,fe,Me)}function ot(M,C,V,le){return m(new Ct(new Rt(M.map(z=>new A(...z))),40,C,12,!1),V,0,0,0,le)}function ln(M,C,V,le){let z=m(new $e(.014,.014,.014,6),Ze,M,C,V,le);z.rotation.x=Math.PI/2}function yn(M,C,V,le,z,ve){let te=new Wt;te.moveTo(-le*.5,0),te.bezierCurveTo(-le*.52,.055,-le*.12,.07,le*.5,.008),te.quadraticCurveTo(le*.05,-.025,-le*.5,0);let fe=new Vt(te,{depth:V,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});fe.translate(0,0,-V/2);let Me=m(fe,z,M,C,0,ve);return Me.rotation.z=-.08,Me}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Ne[M]={};for(let C of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let V=new ke;i.add(V),Ne[M][C]=V;let le=["sport","aero"].includes(C)?Je:Ze;if(M==="spoiler"){i.remove(V);let z=uu(C,{paint:a,carbon:Je,metal:Ze});i.add(z),Ne.spoiler[C]=z;continue}if(M==="mirrors")for(let z of[-1,1]){let ve=new ke;V.add(ve),it.push({group:ve,sign:z});let te=C==="aero",fe=te?1.68:C==="round"?1.96:1.86,Me=z*(te?1.47:1.53),mt=.77;Fe(.18,.08,.15,.035,et,.64,1.46,z*1.19,ve),ot([[.64,1.47,z*1.19],[.62,1.62,z*1.32],[mt,fe-.07,Me]],te?.023:.029,le,ve);let _t=m(new Ot(.046,16,12),et,mt,fe-.065,Me,ve);if(C==="round"){m(new Ot(1,32,20),Ze,mt,fe,Me,ve).scale.set(.065,.15,.15);let ae=m(new Xn(.13,48),St,mt-.056,fe,Me,ve);ae.rotation.y=-Math.PI/2,ae.castShadow=!1;let Se=m(new Ut(.136,.009,8,48),Ze,mt-.06,fe,Me,ve);Se.rotation.y=Math.PI/2}else{let ht=te?.52:C==="sport"?.43:.38,ae=te?.11:C==="sport"?.26:.22,Se=Fe(ht,ae,.095,C==="sport"?.018:te?.045:.075,C==="club"?Ze:Je,mt,fe,Me,ve);Se.rotation.y=Math.PI/2;let je=m(new ar(x(ht-.045,ae-.035,.05)),St,mt-.061,fe,Me,ve);je.rotation.y=-Math.PI/2,je.castShadow=!1,je.receiveShadow=!1;let st=x(ht-.028,ae-.018,.055).getPoints(24).map(lt=>[mt-.058,fe+lt.y,Me+lt.x]);st.push(st[0]),ot(st,.006,Ze,ve)}}else if(M==="sideSkirts")for(let z of[-1,1]){let ve=Fe(C==="aero"?2.75:2.3,C==="aero"?.27:C==="sport"?.19:.12,C==="rally"?.48:C==="aero"?.32:C==="sport"?.23:.13,.05,C==="club"||C==="rally"?le:Je,0,.59,z*1.24,V);if(C==="rally")for(let te of[-.84,-.42,0,.42,.84]){let fe=Fe(.13,.018,.25,.018,et,te,.67,z*1.24,V)}else ot([[-1.08,.54,z*1.3],[0,.53,z*1.32],[1.08,.54,z*1.3]],.009,f,V);for(let te of[-.87,.87])Fe(.12,.14,.16,.025,et,te,.65,z*1.2,V),ln(te,.61,z*1.33,V);if(C==="sport"){let te=Fe(.46,.24,.035,.02,Je,-.96,.69,z*1.4,V);te.rotation.z=-.25}if(C==="aero")for(let te of[-.95,-.4,.25,.95]){let fe=Fe(.24,.12,.025,.025,Je,te,.57,z*1.35,V);fe.rotation.z=te>0?.2:-.2}}else{let z=M==="frontBumper"?1:-1,ve=[[z*2.26,.66,-.92],[z*2.58,.65,-.7],[z*2.67,.65,0],[z*2.58,.65,.7],[z*2.26,.66,.92]];C!=="aero"&&ot(ve,C==="sport"?.061:.047,le,V);for(let te of[-.67,.67]){ot([[z*2.31,.74,te],[z*2.5,.68,te]],.032,et,V);let fe=Fe(.16,.12,.13,.035,et,z*2.51,.67,te,V)}if(C==="aero"){let te=Fe(.38,.045,1.94,.07,Je,z*2.48,.5,0,V);for(let fe of[-.7,-.27,.27,.7])Fe(.27,.12,.022,.025,et,z*2.48,.55,fe,V);ot([[z*2.4,.52,-.91],[z*2.64,.52,0],[z*2.4,.52,.91]],.008,Ze,V)}if(C==="club"||C==="rally"){ot([[z*2.5,.67,-.59],[z*2.58,1.08,-.48],[z*2.61,1.14,.48],[z*2.5,.67,.59]],.04,Ze,V);let te=Fe(.1,.28,C==="rally"?1.12:.79,.04,le,z*2.6,.64,0,V);for(let fe of[-.3,-.1,.1,.3]){let Me=m(new Xn(.035,16),u,z*2.66,.64,fe,V);Me.rotation.y=z*Math.PI/2}}if(C==="rally")for(let te of[-.72,.72])ot([[z*2.53,.65,te-.14],[z*2.56,.94,te-.14],[z*2.55,1.04,te],[z*2.56,.94,te+.14],[z*2.53,.65,te+.14]],.036,Ze,V);if(C==="sport")for(let te of[-.67,.67]){let fe=Fe(.2,.13,.14,.045,et,z*2.56,.66,te,V)}if(M==="rearBumper"&&C==="aero")for(let te of[-.7,-.35,0,.35,.7]){let fe=Fe(.27,.15,.025,.025,Je,-2.46,.48,te,V);fe.rotation.z=.12}}}}let $t=s("#b9e4f5",.28,.17);$t.emissive.set("#b9e4f5"),$t.emissiveIntensity=1.8;let Nt=s("#ffdda0",.2,.2);Nt.emissive.set("#ffe0a8"),Nt.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[C,V,le]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.36,.22],["sport",2.24,.18]]){let z=new ke;Ne[M][C]&&i.remove(Ne[M][C]),i.add(z),Ne[M][C]=z;let ve=M==="frontBumper"?1:-1,te=M==="rearBumper",fe=C==="trackGT"?.6:C==="driftWide"?.58:.49,Me=.82,mt=te?[[0,C==="trackGT"?1.36:1.08]]:C==="driftWide"?[[0,1.2],[-.94,.32],[.94,.32]]:C==="trackGT"?[[0,1.08],[-.91,.35],[.91,.35]]:[[0,.98],[-.79,.31],[.79,.31]],_t=C==="driftWide"?.35:C==="trackGT"?.33:.27,ht=x(V,fe,.1);for(let[gt,rt]of mt){let At=x(rt,_t,.045,jn);ht.holes.push(new jn(At.getPoints(24).map(Ht=>new Ee(Ht.x+gt,Ht.y))))}let ae=new Vt(ht,{depth:le,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),Se=ae.attributes.position;for(let gt=0;gt<Se.count;gt++){let rt=Se.getX(gt),At=Se.getY(gt),Ht=Se.getZ(gt);Se.setXYZ(gt,ve*(2.64+Ht-.34*(rt/(V/2))**2),Me+At,rt)}ae.computeVertexNormals(),m(ae,a,0,0,0,z);for(let[gt,rt]of mt){let At=x(rt+.025,_t+.025,.045).getPoints(48).map(xn=>{let on=xn.x+gt;return[ve*(2.64+le+.022-.34*(on/(V/2))**2),Me+xn.y,on]});At.push(At[0]),ot(At,.014,l,z);let Ht=[];for(let xn of[-1,1])for(let on=-rt;on<rt;on+=.055){let bi=[];for(let tn=0;tn<=20;tn++){let Rn=-_t*.43+tn*_t*.86/20,Ti=on+xn*Rn;Math.abs(Ti)<rt/2-.035&&bi.push([ve*(2.665-.34*((gt+Ti)/(V/2))**2),Me+Rn,gt+Ti])}for(let tn=1;tn<bi.length;tn++)Ht.push(...bi[tn-1],...bi[tn])}let fn=new pt;fn.setAttribute("position",new Re(Ht,3)),z.add(new Ca(fn,new Os({color:"#7d8c98"})))}let je=Array.from({length:41},(gt,rt)=>{let At=-V/2+.04+rt*(V-.08)/40;return[ve*(2.64+le+.018-.34*(At/(V/2))**2),Me+fe/2-.02,At]});ot(je,.018,l,z);for(let[gt,rt]of mt){let At=[],Ht=[];for(let xn=0;xn<=24;xn++){let on=gt-rt/2-.01+xn*(rt+.02)/24,bi=ve*(2.64-.34*(on/(V/2))**2);for(let tn of[-_t/2-.01,_t/2+.01])At.push(bi,Me+tn,on)}for(let xn=0;xn<24;xn++){let on=xn*2;Ht.push(...ve>0?[on,on+1,on+2,on+1,on+3,on+2]:[on,on+2,on+1,on+1,on+2,on+3])}let fn=new pt;fn.setAttribute("position",new Re(At,3)),fn.setIndex(Ht),fn.computeVertexNormals(),m(fn,u,0,0,0,z)}let st=Array.from({length:41},(gt,rt)=>{let At=-V/2+rt*V/40;return[ve*(2.65+le+.045-.34*(At/(V/2))**2),Me-fe/2-.025,At]});ot(st,C==="trackGT"?.028:.019,Je,z);let lt=new pt,Ft=[],Zt=[];for(let[gt,rt,At]of st)Ft.push(gt,rt,At,gt-ve*.17,rt+.005,At);for(let gt=0;gt<40;gt++){let rt=gt*2;Zt.push(rt,rt+1,rt+2,rt+1,rt+3,rt+2)}if(lt.setAttribute("position",new Re(Ft,3)),lt.setIndex(Zt),lt.computeVertexNormals(),m(lt,Je,0,0,0,z),M==="rearBumper")for(let gt=0;gt<(C==="trackGT"?5:3);gt++){let rt=(gt-(C==="trackGT"?2:1))*.3,At=Fe(.46,.19,.025,.008,Je,-2.76,Me-fe/2-.035,rt,z);At.rotation.z=-.12}else if(C==="trackGT"){for(let gt of[-.36,.36]){let rt=Fe(.38,.27,.035,.012,Je,2.94,Me-fe/2+.045,gt,z);rt.rotation.z=-.32,Fe(.27,.027,.13,.008,Je,3.02,Me-fe/2-.075,gt,z)}for(let gt of[-.96,.96]){let rt=Fe(.29,.16,.025,.008,Je,2.78,Me-fe/2+.01,gt,z);rt.rotation.z=.08}}if(te)for(let gt of[-1,1])for(let rt=0;rt<(C==="sport"?2:1);rt++){let At=gt*(.78+rt*.15),Ht=m(new $e(.067,.067,.16,32,1,!0),Ze,-2.77,.77,At,z);Ht.rotation.z=Math.PI/2;let fn=m(new Xn(.056,24),u,-2.86,.77,At,z);fn.rotation.y=-Math.PI/2}for(let gt of[-1,1]){let rt=gt*(V/2-.055),At=ve*(2.64+le-.3);ot([[At,Me-fe/2+.065,rt],[At-ve*.1,Me,rt+gt*.035],[At-ve*.2,Me+fe/2-.065,rt-gt*.015]],.043,a,z),ot([[At+ve*.025,Me-fe/2+.04,rt-gt*.025],[At+ve*.035,Me,rt-gt*.025],[At+ve*.025,Me+fe/2-.04,rt-gt*.025]],.012,l,z)}}for(let M of["formula","formulaPro","formulaElite"]){let C=$p(M,{paint:a,carbon:Je,metal:Ze,accent:l});i.add(C),Ne.frontBumper[M]=C}for(let M of["rearBumper","sideSkirts","spoiler"])for(let C of["formula","formulaPro"]){let V=new ke;V.name=M+"-"+C,i.add(V),Ne[M][C]=V;let le=C==="formulaPro";if(M==="rearBumper"){Fe(.48,.16,le?2.3:2.05,.03,Je,-2.47,.45,0,V);for(let z=-3;z<=3;z++){let ve=Fe(.64,.23,.025,.01,Je,-2.48,.44,z*.3,V);ve.rotation.z=-.15}for(let z of[-1,1])ot([[-2.2,.54,z*1],[-2.65,.62,z*1.1]],.025,a,V)}else if(M==="sideSkirts")for(let z of[-1,1]){let ve=Fe(2.35,le?.42:.33,.34,.08,a,-.15,.83,z*1.3,V);ve.rotation.z=-.045,Fe(2.65,.055,.48,.025,Je,-.06,.58,z*1.3,V),Fe(.07,.21,.24,.035,u,.96,.87,z*1.3,V);for(let te=0;te<(le?3:1);te++)Fe(.35,.11,.025,.01,Je,.48-te*.32,.65,z*1.53,V)}else{i.remove(V);let z=uu(C,{paint:a,carbon:Je,metal:Ze});i.add(z),Ne.spoiler[C]=z}}Ne.headlights={};for(let M of["round","projector","rally","matrix"]){let C=new ke;i.add(C),Ne.headlights[M]=C;for(let V of[-1,1]){let le=V*.74,z=2.57-.28*(le/1.1)**2+.07,ve=1.075;if(M==="matrix"){let te=Fe(.4,.2,.075,.045,et,z,ve,le,C);te.rotation.y=Math.PI/2;let fe=Fe(.35,.15,.01,.035,u,z+.05,ve,le,C);fe.rotation.y=Math.PI/2;for(let Me=0;Me<4;Me++){let mt=Fe(.06,.1,.012,.017,$t,z+.065,ve,le-.128+Me*.085,C);mt.rotation.y=Math.PI/2,mt.castShadow=!1}}else{let te=M==="rally"?.16:M==="round"?.14:.135,fe=m(new $e(te+.027,te+.02,.095,48),et,z,ve,le,C);fe.rotation.z=Math.PI/2;let Me=m(new Ut(te+.008,.01,10,48),Ze,z+.054,ve,le,C);Me.rotation.y=Math.PI/2;let mt=m(new Ot(1,32,20),M==="round"||M==="rally"?Nt:$t,z+.055,ve,le,C);if(mt.scale.set(.025,te,te),mt.castShadow=!1,M==="projector"){let _t=m(new Ut(te*.8,.008,8,48),$t,z+.076,ve,le,C);_t.rotation.y=Math.PI/2,m(new Ot(1,24,16),St,z+.081,ve,le,C).scale.set(.022,te*.53,te*.53)}if(M==="rally")for(let _t of[-.07,0,.07]){let ht=Math.sqrt(te*te-_t*_t);ot([[z+.09,ve-ht,le+_t],[z+.1,ve,le+_t],[z+.09,ve+ht,le+_t]],.009,et,C)}}}}for(let[M,C]of Object.entries(n.streetHeadlights)){let V=new ke;i.add(V),Ne.headlights[M]=V;let le=s(C.color,.12,.22);le.emissive.set(C.color),le.emissiveIntensity=C.smoke?.35:1.1;let z=s(C.smoke?"#1c3348":"#83b6d5",.45,.12);for(let ve of[-1,1]){let te=ve*.72,fe=2.57-.28*(te/1.1)**2+.07,Me=1.075;if(C.shape==="sportHousing"){let ht=new Wt;ht.moveTo(-.29,.12),ht.lineTo(.23,.09),ht.quadraticCurveTo(.32,.02,.26,-.13),ht.lineTo(-.25,-.14),ht.closePath();let ae=m(new Vt(ht,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),et,fe+.02,Me,te,V);ae.rotation.y=Math.PI/2;for(let Se=0;Se<2;Se++){let je=te+(Se-.5)*.24;if(m(new Ot(1,24,16),z,fe+.13,Me,je,V).scale.set(.022,.067,.067),C.signature==="rings"){let lt=m(new Ut(.086,.01,10,48),le,fe+.155,Me,je,V);lt.rotation.y=Math.PI/2}if(C.signature==="doubleL"&&ot([[fe+.155,Me+.075,je-.085],[fe+.155,Me-.075,je-.085],[fe+.155,Me-.075,je+.075]],.012,le,V),C.signature==="pixels")for(let lt=0;lt<3;lt++)m(new nt(.014,.026,.026),le,fe+.155,Me+.09,je-.055+lt*.055,V)}C.signature==="arc"&&ot([[fe+.155,Me-.09,te-.25],[fe+.155,Me+.1,te-.25],[fe+.155,Me+.12,te],[fe+.155,Me+.07,te+.25]],.012,le,V);continue}let mt=Fe(.47,.25,.1,.04,et,fe,Me,te,V);mt.rotation.y=Math.PI/2;for(let ht of[-.18,.18]){m(new nt(.1,.07,.035),Ze,fe-.035,Me-.15,te+ht,V);let ae=m(new $e(.012,.012,.018,12),l,fe+.02,Me-.13,te+ht,V);ae.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(C.shape)){let ht=C.shape==="doubleU"?2:1;for(let ae=0;ae<ht;ae++){let Se=te+(ae-(ht-1)/2)*.21;if(m(new Ot(1,24,16),z,fe+.073,Me,Se,V).scale.set(.019,.067,.067),C.shape==="doubleU")ot([[fe+.1,Me+.075,Se-.08],[fe+.1,Me-.04,Se-.08],[fe+.1,Me-.08,Se-.045],[fe+.1,Me-.08,Se+.045],[fe+.1,Me-.04,Se+.08],[fe+.1,Me+.075,Se+.08]],.01,le,V);else if(C.shape==="brow"){ot([[fe+.1,Me+.055,Se-.19],[fe+.1,Me+.093,Se-.14],[fe+.1,Me+.093,Se+.19]],.011,le,V);let st=m(new Ut(.068,.006,8,32),le,fe+.095,Me-.015,Se,V);st.rotation.y=Math.PI/2}else for(let st=0;st<3;st++){let lt=st*Math.PI*2/3-Math.PI/2;ot([[fe+.102,Me+Math.sin(lt)*.025,Se+Math.cos(lt)*.025],[fe+.102,Me+Math.sin(lt)*.1,Se+Math.cos(lt)*.1]],.011,le,V)}}continue}if(C.shape==="bar"){for(let[ht,ae,Se]of[[.035,.41,.025],[-.045,.33,.012]]){let je=Fe(ae,Se,.014,.006,le,fe+.064,Me+ht,te,V);je.rotation.y=Math.PI/2,je.castShadow=!1}continue}if(C.shape==="square"){let ht=Fe(.37,.17,.024,.015,le,fe+.065,Me,te,V);ht.rotation.y=Math.PI/2;for(let ae=0;ae<7;ae++)m(new nt(.006,.16,.004),z,fe+.082,Me,te-.15+ae*.05,V);continue}let _t=C.count===3?.062:C.count===2?.087:.106;for(let ht=0;ht<C.count;ht++){let ae=te+(ht-(C.count-1)/2)*(C.count===3?.14:.205),Se=m(new $e(_t+.014,_t+.02,.09,C.shape==="hex"?6:40),u,fe+.035,Me,ae,V);Se.rotation.z=Math.PI/2;let je=m(new Ut(_t,.009,8,C.shape==="hex"?6:48),le,fe+.09,Me,ae,V);je.rotation.y=Math.PI/2,je.castShadow=!1;let st=m(new Ot(1,24,16),C.projector?z:le,fe+.077,Me,ae,V);if(st.scale.set(.018,_t*.74,_t*.74),st.castShadow=!1,C.projector&&m(new Ot(1,16,12),le,fe+.092,Me,ae,V).scale.set(.006,_t*.31,_t*.31),C.cross||C.guard)for(let lt of[-1,1])ot([[fe+.11,Me-_t*.74,ae-lt*_t*.74],[fe+.115,Me,ae],[fe+.11,Me+_t*.74,ae+lt*_t*.74]],.009,et,V)}}}let cn={};for(let M of["club","sport","rally","chrome","aero"]){let C=[];cn[M]=C;for(let{wheelGroup:V,sign:le}of Y){let z=new ke;V.add(z),C.push(z);let ve=M==="aero"?.94:M==="rally"?1.02:M==="chrome"?.85:.88,te=M==="aero"||M==="rally"?.9:M==="sport"?.48:M==="chrome"?.38:.62,fe=M==="aero"?1.65:M==="rally"?1.4:M==="sport"?.66:M==="chrome"?1.03:1.2,Me=[],mt=[];for(let Se=0;Se<=48;Se++){let je=-fe+Se*fe*2/48;for(let st of[-te/2,te/2])Me.push(Math.sin(je)*ve,Math.cos(je)*ve,st)}for(let Se=0;Se<48;Se++){let je=Se*2;mt.push(je,je+1,je+2,je+1,je+3,je+2)}let _t=new pt;_t.setAttribute("position",new Re(Me,3)),_t.setIndex(mt),_t.computeVertexNormals();let ae=(M==="chrome"?Ze:M==="club"?a:Je).clone();ae.side=Yt,m(_t,ae,0,0,0,z);for(let Se of[-1,1]){let je=Array.from({length:49},(st,lt)=>{let Ft=-fe+lt*fe*2/48;return[Math.sin(Ft)*ve,Math.cos(Ft)*ve,Se*te/2]});ot(je,.012,M==="aero"?l:M==="chrome"?Ze:et,z)}for(let Se of[-1,1])ot([[0,0,-le*.28],[Se*.28,.42,-le*.31],[Se*.49,.68,-le*.31]],.022,et,z),ln(Se*.49,.68,-le*.32,z);if(M==="rally"){Fe(.12,.52,te,.025,et,-.97,.12,0,z);for(let Se of[-1,1])for(let je of[-te/2,te/2])ln(Se*.64,.76,je,z)}if(M==="sport")for(let Se of[-te/2,te/2])ot([[-.5,.73,Se],[0,.9,Se],[.5,.73,Se]],.018,l,z);if(M==="aero"){for(let Se of[-1,1]){let je=new Wt;je.moveTo(-.91,.1),je.quadraticCurveTo(-.97,.94,0,.98),je.quadraticCurveTo(.97,.94,.91,.1),je.lineTo(.7,.1),je.quadraticCurveTo(.66,.72,0,.75),je.quadraticCurveTo(-.66,.72,-.7,.1),je.closePath(),m(new Vt(je,{depth:.025,bevelEnabled:!1}),Je,0,0,Se*te/2,z)}for(let Se=0;Se<4;Se++)Fe(.045,.025,te*.65,.006,u,-.28+Se*.18,.948,0,z)}z.userData.shell=ae}}Ne.windshield={};for(let[M,C,V,le]of[["deflector",.42,"#b6e3eb",.18],["sport",.82,"#a9d5e7",.23],["touring",1.08,"#c1e3ed",.17],["smoke",.96,"#455f7a",.4],["iridium",1.08,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let ve=function(st,lt){let Ft=["touring","grandTour"].includes(M),Zt=["sport","iridium"].includes(M),gt=(Ft?1.1:M==="deflector"?.78:Zt?.88:.94)*(1-(Zt?.28:Ft?.04:.13)*lt),rt=1-st*st;return[1.32+(Ft?.34:.23)*rt-C*(Zt?.48:.32)*lt,1.5+C*lt*(Zt?.72+.28*rt:.84+.16*rt),st*gt]},z=new ke;i.add(z),Ne.windshield[M]=z;let te=[],fe=[],Me=40,mt=16;for(let st=0;st<=mt;st++)for(let lt=0;lt<=Me;lt++)te.push(...ve(-1+lt*2/Me,st/mt));for(let st=0;st<mt;st++)for(let lt=0;lt<Me;lt++){let Ft=st*(Me+1)+lt;fe.push(Ft,Ft+1,Ft+Me+1,Ft+1,Ft+Me+2,Ft+Me+1)}let _t=new pt;_t.setAttribute("position",new Re(te,3)),_t.setIndex(fe),_t.computeVertexNormals();let ht=new Sn({color:V,metalness:.05,roughness:.075,transparent:!0,opacity:le,depthWrite:!1,side:Yt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});z.userData.glass=ht,z.userData.originalTint={color:V,opacity:le};let ae=m(_t,ht,0,0,0,z);ae.castShadow=!1,ae.receiveShadow=!1,ae.renderOrder=3;let Se=["smoke","highSmoke"].includes(M)?et:Ze;ot(Array.from({length:41},(st,lt)=>{let Ft=ve(-1+lt/20,0);return Ft[1]-=.04,Ft}),.045,et,z);for(let st of[0,1])ot(Array.from({length:41},(lt,Ft)=>ve(-1+Ft/20,st)),st===0?.017:.009,Se,z);for(let st of[-1,1]){ot(Array.from({length:17},(Zt,gt)=>ve(st,gt/16)),.011,Se,z);let lt=ve(st,0);Fe(.26,.12,.23,.025,et,lt[0],lt[1]-.06,lt[2],z),ot([[.99,1.44,st*1.12],[1.18,1.44,st*1.02],lt],.032,Se,z);let Ft=m(new $e(.013,.013,.018,6),Ze,lt[0]+.04,lt[1]+.014,lt[2],z)}let je=new In({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let st of[-.77,-.69]){let lt=Array.from({length:13},(Zt,gt)=>{let rt=ve(st,.18+gt*.058);return rt[0]+=.004,rt}),Ft=ot(lt,.003,je,z);Ft.castShadow=!1,Ft.receiveShadow=!1,Ft.renderOrder=4}}for(let M of Object.values(Ne.windshield))M.userData.mountRearX=ls([M],M).min.x;let rn=new ke;for(let M of i.children.slice())M.userData.groundWheel||rn.add(M);i.add(rn);let It=s("#b8c7d6",.72,.27),Tt=new ke,Qn=[];i.add(Tt);for(let M of[-1.72,1.72])for(let C of[-1,1]){let V=new ke;V.position.set(M,.52,C*1.12),Tt.add(V);let le=Array.from({length:193},(ht,ae)=>{let Se=ae/192,je=Se*Math.PI*14;return new A(Math.cos(je)*.071,.055+Se*.36,Math.sin(je)*.071)}),z=m(new Ct(new Rt(le),192,.014,10,!1),It,0,0,0,V);m(new $e(.039,.039,.23,24),et,0,.14,0,V);let ve=m(new $e(.018,.018,.28,20),Ze,0,.34,0,V),te=new ke;te.position.y=.47,V.add(te);for(let[ht,ae]of[[V,.04],[te,-.015]])m(new $e(.095,.095,.026,32),Ze,0,ae,0,ht),m(new $e(.068,.068,.018,24),et,0,ae+.02,0,ht);m(new nt(.14,.075,.18),et,0,.025,C*.035,V),m(new nt(.16,.075,.22),et,0,0,-C*.075,te);let fe=new A(M,.56,C*1.12),Me=new A(M,.81,C*1.43),mt=Me.clone().sub(fe);m(new $e(.026,.026,mt.length(),16),et,...fe.clone().add(Me).multiplyScalar(.5).toArray(),Tt).quaternion.setFromUnitVectors(new A(0,1,0),mt.normalize()),Qn.push({coil:z,rod:ve,upper:te})}Ne.brakes={};for(let M of["stock","red","gold","ceramic"]){let C=new ke;i.add(C),Ne.brakes[M]=C;for(let{wheelGroup:V,sign:le}of Y){let z=hu(M);z.position.z=le*.165,le<0&&(z.rotation.y=Math.PI),V.add(z),C.userData.brakeAssemblies??=[],C.userData.brakeAssemblies.push(z)}}Ne.nitrous={};let ur=document.createElement("canvas");ur.width=512,ur.height=256;let _n=ur.getContext("2d");_n.fillStyle="#101923",_n.fillRect(0,0,512,256),_n.strokeStyle="#e8e1cc",_n.lineWidth=8,_n.strokeRect(10,10,492,236),_n.fillStyle="#f5f2e8",_n.textAlign="center",_n.font="italic bold 106px Arial",_n.fillText("N\u2082O",256,117),_n.font="bold 24px Arial",_n.fillText("NITROUS OXIDE",256,159),_n.fillStyle="#d9b36b",_n.font="bold 18px Arial",_n.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)_n.fillRect(165+M*4,212,M%3+1,17);let fi=new kt(ur);fi.colorSpace=bt,fi.anisotropy=8;let Zn=document.createElement("canvas");Zn.width=Zn.height=128;let Qt=Zn.getContext("2d");Qt.fillStyle="#eee9dc",Qt.fillRect(0,0,128,128),Qt.translate(64,64),Qt.strokeStyle="#17202a";for(let M=0;M<=20;M++){let C=-Math.PI*.8+M*Math.PI*1.6/20;Qt.lineWidth=M%5?2:4,Qt.beginPath(),Qt.moveTo(Math.sin(C)*43,-Math.cos(C)*43),Qt.lineTo(Math.sin(C)*(M%5?49:53),-Math.cos(C)*(M%5?49:53)),Qt.stroke()}Qt.fillStyle="#293541",Qt.textAlign="center",Qt.font="bold 14px Arial",Qt.fillText("PSI",0,30),Qt.strokeStyle="#c92737",Qt.lineWidth=4,Qt.beginPath(),Qt.moveTo(-9,12),Qt.lineTo(26,-31),Qt.stroke(),Qt.fillStyle="#25313a",Qt.beginPath(),Qt.arc(0,0,6,0,Math.PI*2),Qt.fill();let mi=new kt(Zn);mi.colorSpace=bt;for(let M of["blue","twin","triple"]){let C=new ke;C.name="nitrous-"+M,i.add(C),Ne.nitrous[M]=C;let V=s(n.item("nitrous",M).color,.65,.27),le=M==="triple"?3:M==="twin"?2:1,z=1.49,ve=-1.3,te=.37,fe=s("#b4924f",.8,.3),Me=s("#a5b2bd",.85,.24),mt=s("#1b2028",.08,.85),_t=s("#ab2635",.35,.4);for(let ht of[-1.52,-1.13]){Fe(.095,.05,le*te+.04,.015,u,ht,1.29,0,C);for(let ae of[-1,1]){let Se=ae*(le*te/2-.02);m(new $e(.024,.024,.023,6),Me,ht,1.327,Se,C)}}for(let ht=0;ht<le;ht++){let ae=(ht-(le-1)/2)*te,Se=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([tn,Rn])=>new Ee(tn,Rn)),je=m(new Ri(Se,40),V,ve,z,ae,C);je.rotation.z=-Math.PI/2;for(let tn of[-1.52,-1.13]){Fe(.11,.095,.27,.025,mt,tn,1.35,ae,C);let Rn=m(new Ut(.152,.013,8,40),Me,tn,z,ae,C);Rn.rotation.y=Math.PI/2,Fe(.08,.025,.055,.008,Me,tn,z+.155,ae,C),m(new $e(.013,.013,.018,6),u,tn,z+.179,ae,C)}let st=[],lt=[],Ft=[];for(let tn=0;tn<2;tn++)for(let Rn=0;Rn<=16;Rn++){let Ti=-.91+Rn*1.82/16;if(st.push(ve+(tn?.12:-.12),z+Math.cos(Ti)*.147,ae+Math.sin(Ti)*.147),lt.push(tn,Rn/16),tn&&Rn){let Si=17+Rn;Ft.push(Si-18,Si-17,Si,Si-18,Si,Si-1)}}let Zt=new pt;Zt.setAttribute("position",new Re(st,3)),Zt.setAttribute("uv",new Re(lt,2)),Zt.setIndex(Ft),Zt.computeVertexNormals();let gt=new Sn({map:fi,roughness:.55,metalness:.05,side:Yt});m(Zt,gt,0,0,0,C);let rt=m(new $e(.046,.046,.055,24),fe,-.89,z,ae,C);rt.rotation.z=Math.PI/2,Fe(.075,.07,.065,.012,fe,-.845,z,ae,C),m(new $e(.016,.016,.065,16),Me,-.845,z+.045,ae,C);let At=m(new Ut(.052,.012,8,24),_t,-.845,z+.092,ae,C);At.rotation.x=Math.PI/2;for(let tn of[0,Math.PI/3,Math.PI*2/3]){let Rn=Fe(.106,.014,.014,.004,_t,-.845,z+.092,ae,C);Rn.rotation.y=tn}let Ht=new ke;Ht.position.set(-.84,z+.065,ae+.075),Ht.rotation.x=-Math.PI*.32,C.add(Ht);let fn=m(new $e(.057,.057,.03,32),Me,0,0,0,Ht);fn.rotation.x=Math.PI/2;let xn=m(new Xn(.047,32),new In({map:mi}),0,0,.017,Ht),on=m(new $e(.024,.024,.055,6),fe,-.79,z,ae,C);on.rotation.z=Math.PI/2,ot([[-.76,z,ae],[-.7,z-.02,ae],[-.71,1.3,ae],[-.91,1.24,ae]],.014,mt,C);let bi=m(new $e(.021,.021,.055,12),Me,-.74,z,ae,C);bi.rotation.z=Math.PI/2}Fe(.07,.07,le*te,.015,fe,-.91,1.24,0,C),ot([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,mt,C)}Ne.pedals={};for(let M of["classic","aluminium","formula"]){let C=Qp(M);i.add(C),Ne.pedals[M]=C}Ne.seat={};for(let M of["red","carbon","emerald","ivory"]){let C=pu(M);C.rotation.y=Math.PI/2,C.position.set(-.8,1,0),i.add(C),Ne.seat[M]=C}let Qs=Kp(b),gi=Gp({paint:a,carbon:Je,metal:Ze});i.add(gi.group);function ao(M){for(let{plate:ae,sign:Se}of Be){let je=M[Se>0?"frontBumper":"rearBumper"],st={streetLow:.12,driftWide:.16,trackGT:.22,sport:.18}[je];ae.position.x=Se*(st===void 0?["club","rally"].includes(je)?2.72:2.605:2.64+st+.055),ae.scale.setScalar(st===void 0?1:.72),ae.position.y=st===void 0?1.01:1.3}let C=["formula","formulaPro","formulaElite"].includes(M.frontBumper);Qs.set(C),N.forEach(ae=>ae.visible=!C),gi.group.visible=C||M.turbine==="formula",gi.engine.visible=M.turbine==="formula",ie(M);let V=n.glassTints[M.glassTint]||n.glassTints.original;for(let ae of Object.values(Ne.windshield)){let Se=ae.userData.originalTint;ae.userData.glass.color.set(V.opacity===null?Se.color:V.color),ae.userData.glass.opacity=V.opacity??Se.opacity,ae.userData.glass.iridescence=M.glassTint==="violet"?1:0,ae.userData.glass.iridescenceIOR=1.35,ae.userData.glass.iridescenceThicknessRange=[180,420],ae.userData.glass.roughness=M.glassTint==="black"?.2:.075}let le=(n.wheelDiameters[M.wheelSize]||16)/16,z=(le-1)*(.715/.86),ve={standard:1,wide:1.25,ultra:1.45}[M.tyreWidth]||1;for(let{wheelGroup:ae,sign:Se,tyres:je}of Y){ae.scale.set(.88/1.24*le,.88/.86*le,ve/.95),ae.position.y=.715/.86*le,ae.position.z=Se*(1.36+.25*(ve-1));for(let[st,lt]of Object.entries(je))for(let Ft of lt)Ft.visible=st===(M.tyres||"standard")}let te=z+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0);for(let[ae,Se]of Object.entries(Ne))if(ae!=="brakes")for(let je of Object.values(Se))je.parent===i&&(je.userData.mountBaseY??=je.position.y,je.position.y=je.userData.mountBaseY+te);An.forEach(ae=>ae.visible=!M.headlights||M.headlights==="classic");for(let[ae,Se]of Object.entries(cn))for(let je of Se)je.visible=M.fenders===ae,ae==="club"&&je.userData.shell.color.set(n.item("paint",M.paint).color);It.color.set(n.item("suspension",M.suspension).color),rn.position.y=te,gi.group.position.y=te-(["formula","aeroPrototype"].includes(M.chassis)?.18:0),Tt.visible=te>0,Qn.forEach(({coil:ae,rod:Se,upper:je})=>{ae.scale.y=1+te/.415,Se.scale.y=1+te/.28,Se.position.y=.34+te/2,je.position.y=.47+te});for(let[ae,Se]of Object.entries(Ne))for(let[je,st]of Object.entries(Se))st.visible=(ae==="pedals"?M.pedals||"classic":M[ae])===je;C&&Object.values(Ne.headlights).forEach(ae=>ae.visible=!1);for(let[ae,Se]of Object.entries(Ne.brakes))for(let je of Se.userData.brakeAssemblies||[])je.visible=(M.brakes||"stock")===ae;Object.entries(ee).forEach(([ae,Se])=>Se.visible=ae===(M.steering||"classic")),Object.entries(en).forEach(([ae,Se])=>Se.visible=ae===(M.exhaust||"classic")),Dt.visible=M.turbine==="boost",at.visible=M.turbine!=="formula";let fe=["twin","twinBig"].includes(M.turbine),Me=M.turbine==="twinBig",mt=Me?.9:fe?.52:M.turbine==="boost"?.96:.9;at.scale.set(mt/1.24,mt/.86,mt/.95),at.position.set(Qe,Oe+(Me?.06:fe?-.2:-.04),fe?Me?-.7:-.44:0),xt.visible=fe,xt.scale.copy(at.scale),xt.position.set(Qe,Oe+(Me?.06:-.2),Me?.7:.44);let _t=ls(M.turbine==="formula"?[gi.engine]:[at,xt],rn);for(let ae of Object.values(Ne.spoiler))ae.userData.fitTurbines(_t);let ht=M.badges||[];if(E.forEach(ae=>ae.visible=!ht.length&&(!M.vinyl||M.vinyl==="none")),oe.forEach(ae=>ae.userData.plane.visible=!ht.length&&(!M.vinyl||M.vinyl==="none")),ce.forEach(({group:ae,mat:Se,back:je,n:st})=>{let lt=ht[st];ae.position.x=(st-(ht.length-1)/2)*.82+.05,ae.visible=!!lt;let Ft=lt+":"+(M.prizeTotal||0);if(!lt||Se.userData.badge===Ft)return;let Zt=new Wt,gt=.65/512,rt=(At,Ht)=>[(At-256)*gt,(256-Ht)*gt];if(lt==="millionaire"||lt==="day-hero")Zt.absarc(0,0,204*gt,0,Math.PI*2,!1);else if(lt==="rating-top10"){for(let At=0;At<6;At++){let Ht=At*Math.PI/3-Math.PI/2,fn=rt(256+Math.cos(Ht)*215,256+Math.sin(Ht)*215);At?Zt.lineTo(...fn):Zt.moveTo(...fn)}Zt.closePath()}else Zt.moveTo(...rt(80,88)),Zt.quadraticCurveTo(...rt(256,0),...rt(432,88)),Zt.lineTo(...rt(420,296)),Zt.quadraticCurveTo(...rt(390,400),...rt(256,465)),Zt.quadraticCurveTo(...rt(122,400),...rt(92,296)),Zt.closePath();je.geometry.dispose(),je.geometry=new Vt(Zt,{depth:.035,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.014,bevelThickness:.012,curveSegments:24}),Se.map?.dispose(),Se.map=new kt(n.badgeCanvas(lt,M)),Se.map.colorSpace=bt,Se.map.anisotropy=16,Se.emissive.set("#ffffff"),Se.emissiveMap=Se.map,Se.emissiveIntensity=.35,Se.userData.badge=Ft,Se.needsUpdate=!0}),a.color.set(n.item("paint",M.paint).color),o.color.copy(a.color).multiplyScalar(.45),h.color.set(n.wheelPaintColor(M)),X!==M.wheels){for(let ae of R)ae.removeFromParent(),ae.geometry.dispose();R.length=0;for(let{wheelGroup:ae,sign:Se}of Y)for(let je of[1,-1])for(let st of n.wheelDesign(M.wheels)){let lt={bronzeSix:.029,deepFive:.048,muscleFive:.06,triBlade:.105,turbofan:.037,fiveSpoke:.049,legend:.034,splitY:.024,concaveTen:.026,rallyMulti:.02,crossMesh:.014,copper:.015,splitStar:.022,splitSix:.025,forged:.025}[M.wheels]||.02,Ft=[],Zt=[];st.forEach(([Ht,fn],xn)=>{let on=st[Math.max(0,xn-1)],bi=st[Math.min(st.length-1,xn+1)],tn=bi[0]-on[0],Rn=bi[1]-on[1],Ti=Math.hypot(tn,Rn)||1,Si=lt*(.65+.35*xn/(st.length-1));Ft.push([Ht-Rn/Ti*Si,fn+tn/Ti*Si]),Zt.push([Ht+Rn/Ti*Si,fn-tn/Ti*Si])});let gt=new Wt;[...Ft,...Zt.reverse()].forEach(([Ht,fn],xn)=>xn?gt.lineTo(Ht,fn):gt.moveTo(Ht,fn)),gt.closePath();let rt=new Vt(gt,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1}),At=rt.attributes.position;for(let Ht=0;Ht<At.count;Ht++){let fn=Math.hypot(At.getX(Ht),At.getY(Ht)),xn=(M.wheels==="deepFive"?.095:M.wheels==="concaveTen"?.075:.025)*(1-Math.min(1,fn/.51));At.setZ(Ht,Se*je*((je===1?.255:.235)-xn+At.getZ(Ht)))}At.needsUpdate=!0,rt.computeVertexNormals(),R.push(m(rt,h,0,0,0,ae))}X=M.wheels}l.color.set(n.item("trim",M.trim).color),l.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,l.metalness=.95,d.userData.style!==M.upholstery&&(d.map?.dispose(),d.map=new kt(n.upholsteryCanvas(M.upholstery)),d.map.colorSpace=bt,d.map.wrapS=d.map.wrapT=bn,d.map.repeat.set(12,2),d.color.set("#ffffff"),d.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,d.userData.style=M.upholstery,d.needsUpdate=!0),n.chipPalette(M.chips).forEach((ae,Se)=>{tt[Se].color.set(ae),tt[Se].roughness=M.chips==="ceramic"?.25:.55}),ct.color.set(n.chipEdgeColor(M.chips)),Ye.forEach(ae=>{ae.visible=!0,ae.material.color.set(M.chips==="tournament"?["#c6414f","#e1bc3e","#5b9c69","#4c73c5"][ae.userData.edgeIndex%4]:n.chipEdgeColor(M.chips))}),Ue.forEach(({mat:ae,n:Se})=>{ae.userData.style!==M.chips&&(ae.map?.dispose(),ae.map=new kt(n.chipCanvas(M.chips,Se)),ae.map.colorSpace=bt,ae.map.anisotropy=8,ae.userData.style=M.chips,ae.needsUpdate=!0)}),be.forEach((ae,Se)=>{ae.userData.style!==M.cards&&(ae.map?.dispose(),ae.map=new kt(n.cardCanvas(M.cards,Se)),ae.map.colorSpace=bt,ae.map.anisotropy=16,ae.userData.style=M.cards,ae.needsUpdate=!0)}),R.forEach(ae=>ae.visible=!0),P.forEach(ae=>ae.visible=!0),f.color.set(n.item("light",M.light).color),f.emissive.copy(f.color),g.color.copy(f.color).multiplyScalar(.075),g.emissive.copy(f.color),g.emissiveIntensity=.045,ye.userData.number!==M.number+M.region&&(ye.map?.dispose(),ye.map=new kt(n.plateCanvas(M)),ye.userData.number=M.number+M.region,ye.needsUpdate=!0)}let us=new wt({color:f.color.clone(),emissive:f.color.clone(),emissiveIntensity:.65,roughness:.5}),dr=new ke;rn.add(dr);for(let M of[-1,1]){Fe(2.62,.09,.12,.025,u,-.03,.47,M*.76,dr);let C=m(new nt(2.48,.018,.075),us,-.03,.417,M*.76,dr);for(let V of[-1.13,1.06])Fe(.12,.16,.18,.018,u,V,.53,M*.76,dr)}let Bt=new Ha(f.color,.45,2,2);Bt.position.set(-1.9,2,.48),rn.add(Bt);let ei=new ke;i.add(ei);let Un=s("#161d22",.34,.56),qi=s("#917252",.05,.86),Nr=new Wt;[[-2.55,-.72],[-1.55,-1.03],[.25,-1.1],[.8,-.67],[1.42,-.24],[2.38,-.17],[2.38,.17],[1.42,.24],[.8,.67],[.25,1.1],[-1.55,1.03],[-2.55,.72]].forEach(([M,C],V)=>V?Nr.lineTo(M,C):Nr.moveTo(M,C)),Nr.closePath();let ea=m(new Vt(Nr,{depth:.055,bevelEnabled:!0,bevelThickness:.008,bevelSize:.012,bevelSegments:2}),Un,0,.48,0,ei);ea.rotation.x=Math.PI/2,Fe(3.85,.035,.24,.025,qi,-.08,.395,0,ei);for(let M of[-1.65,-.8,.15,1.2])for(let C of[-.075,.075]){let V=m(new $e(.018,.018,.008,12),Ze,M,.373,C,ei)}for(let M of[-1,1]){ot([[-1.85,.4,M*.68],[-.8,.38,M*.79],[.3,.4,M*.82],[.8,.44,M*.51]],.025,Un,ei),ot([[-1.85,.4,M*.33],[-.8,.37,M*.37],[.3,.4,M*.39],[.8,.44,M*.27]],.022,Un,ei);for(let C=0;C<3;C++){let V=Fe(.32,.11,.022,.008,Un,.25+C*.19,.44,M*(.98-C*.1),ei);V.rotation.y=M*-.24}}let an=new Wt;an.moveTo(-2.65,.78),an.lineTo(-1.65,.44),an.lineTo(-1.65,.36),an.lineTo(-2.65,.53),an.closePath();for(let M=-3;M<=3;M++)m(new Vt(an,{depth:.022,bevelEnabled:!1}),Un,0,0,M*.205,ei);let Di=m(new nt(1.04,.035,1.4),Un,-2.15,.6,0,ei);Di.rotation.z=-.32;let zn=new ke;i.add(zn);for(let M of[-1,1]){Fe(2.8,.4,.42,.12,a,-.16,.91,M*1.17,zn),Fe(2.95,.075,.55,.035,Je,-.12,.65,M*1.17,zn),ot([[-1.55,1.14,M*1.28],[-.2,1.17,M*1.35],[1.15,1.1,M*1.13]],.055,l,zn),Fe(.1,.24,.27,.035,u,1.16,.94,M*1.18,zn);for(let C=0;C<3;C++)Fe(.025,.19,.29,.008,l,.82-C*.16,1.1,M*1.39,zn);ot([[1.87,.65,M*.84],[2.18,.78,M*.74],[2.25,.84,0]],.06,l,zn),Fe(.09,.48,.08,.025,Ze,-1.95,1.08,M*.67,zn)}Fe(.48,.08,1.98,.035,Je,-1.96,1.35,0,zn),ot([[-2.17,1.4,-.97],[-2.17,1.4,.97]],.025,l,zn);let dn=new ke;i.add(dn);let ti=s("#e9bd68",.72,.25);for(let M of[-1,1]){m(new Ot(1,32,20),Je,-.55,1.01,M*.88,dn).scale.set(1.15,.28,.34);let V=Fe(.12,.32,.45,.07,u,.42,1.04,M*.89,dn);for(let le=0;le<5;le++)Fe(.23,.025,.35,.01,et,-.4-le*.16,1.27,M*.88,dn);ot([[-1.62,.72,M*.95],[-.8,.69,M*1.22],[.35,.72,M*1.12],[.65,.79,M*.89]],.025,ti,dn);for(let le=0;le<3;le++){let z=Fe(.55,.035,.35,.02,Je,1.58+le*.17,.55+le*.12,M*(.82+le*.12),dn);z.rotation.z=-.2}}let Cn=new Wt;Cn.moveTo(-1.9,1.2),Cn.lineTo(-1.6,1.92),Cn.lineTo(-.82,1.6),Cn.lineTo(-.6,1.23),Cn.closePath();let oo=m(new Vt(Cn,{depth:.045,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:2,steps:1}),Je,0,0,-.022,dn);ot([[-1.9,1.2,0],[-1.6,1.92,0],[-.82,1.6,0]],.018,ti,dn);let ps=s("#597480",.35,.13);ps.transparent=!0,ps.opacity=.42,ps.side=Yt,m(new Ot(1,48,24,0,Math.PI*2,0,Math.PI/2),ps,-.3,1.42,0,dn).scale.set(1.25,.52,.46);for(let M of[-1,1])ot([[-1.48,1.43,M*.12],[-1,1.68,M*.39],[-.25,1.94,M*.33],[.6,1.64,M*.28],[.93,1.43,M*.12]],.025,Je,dn);let vf=zp(i,[ei,...Object.values(Ne.windshield),...Object.values(Ne.mirrors),...ce.map(M=>M.group),dr,...Object.values(Ne.pedals),dn,Et,at,xt,Tt,...Object.values(Ne.seat)]),yf=ao;function xu(M){yf(M),zn.visible=M.chassis==="club",zn.position.y=rn.position.y,dn.visible=M.chassis==="aeroPrototype",dn.position.y=rn.position.y;let C=["formula","aeroPrototype"].includes(M.chassis),V=C?1.13:1;vf.set(C);let le=ls([Et],i);for(let z of Object.values(Ne.windshield))z.scale.z=C?.72:1,z.position.x=Op(le.max.x,z.userData.mountRearX),z.position.y=C?-.135:0;for(let{group:z,sign:ve}of it)z.position.z=C?ve*1.19*(Yl(.64)-1):0,z.position.y=C?-.122:0;K.visible=!C,ei.visible=C,ei.position.y=rn.position.y;for(let{group:z}of ce)z.position.z=z.userData.side*(C?1.365*Yl(z.position.x)+.045:M.chassis==="club"?1.44:1.39);dr.scale.z=C?.65:1,us.color.copy(f.color),us.emissive.copy(f.color);for(let z of[...Pt,...Le])z.visible=!C;for(let z of Object.values(Ne.pedals))z.position.x=C?-.65:0,z.position.y=rn.position.y-.06;i.scale.x=1.24*V;for(let{wheelGroup:z}of Y)z.scale.x/=V;Bt.color.copy(f.color)}return xu(e),{car:i,update:xu,measureClearance(){let M=ls([Et],i),C=Object.values(Ne.windshield).find(V=>V.visible);return C?ls([C],i).min.x-M.max.x:null}}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new si({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=bt,n.toneMapping=ri,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=wr,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new Tn,s=new sn(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Kn("#c6d9ef","#44311e",1.25));for(let[ie,Te,we,J,De]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let R=new qn(ie,Te);R.position.set(we,J,De),R.castShadow=ie==="#fff0d0",R.shadow.bias=-2e-4,R.shadow.normalBias=.025,R.shadow.mapSize.set(2048,2048),R.shadow.camera.left=-5,R.shadow.camera.right=5,R.shadow.camera.top=5,R.shadow.camera.bottom=-5,i.add(R)}let a=new Tn;a.background=new dt("#48505b");for(let[ie,Te,we,J,De,R]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let P=new qe(new nt(J,De,R),new In({color:"#ffffff"}));P.position.set(ie,Te,we),a.add(P)}let o=new Cr(n),l=o.fromScene(a,.05);i.environment=l.texture,i.environmentIntensity=1.5,a.traverse(ie=>{ie.geometry?.dispose(),ie.material?.dispose()}),o.dispose();let c=new qe(new Xt(30,30),new Zr({opacity:.34}));c.rotation.x=-Math.PI/2,c.receiveShadow=!0,i.add(c);let h=fu(i,e),u=new Wn({transparent:!0,depthWrite:!1,side:Yt,toneMapped:!1,uniforms:{color:{value:new dt(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=p.x*p.x+p.y*p.y;float halo=exp(-d*3.5);float core=exp(-d*11.);float a=(halo*.42+core*.20)*strength;gl_FragColor=vec4(color,a);}"}),d=new qe(new Xt(7.2,3.8),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let f=[];for(let ie of[-1.15,1.15])for(let Te of[-.68,.68]){let we=new Va(u.uniforms.color.value,3.5,3.4,Math.PI*.42,.9,1.5);we.position.set(ie,.36,Te),we.target.position.set(ie,0,Te),i.add(we,we.target),f.push(we)}let g=r.closest(".player-hall__room");t.night??=g?.dataset.theme==="midnight";function m(ie){t.night=!!ie;for(let we of i.children)we.isHemisphereLight&&(we.intensity=ie?.26:1.25),we.isDirectionalLight&&(we.userData.dayIntensity??=we.intensity,we.intensity=we.userData.dayIntensity*(ie?.13:1));i.environmentIntensity=ie?.24:1.5;let Te=t.neon??window.pokerGarageNeonBrightness?.()??1.5;u.uniforms.strength.value=(ie?2.1:.95)*Te,f.forEach(we=>{we.intensity=3.5*Te*(ie?1.6:1)})}m(t.night);let p=ie=>{g&&(t.neon=window.pokerGarageNeonBrightness?.()??1.5,m(g.dataset.theme==="midnight"))};window.addEventListener("poker-garage-lighting",p);let v=null;function y(){if(!v){v=new Pn,h.car.updateWorldMatrix(!0,!0);let P=Y=>{if(Y.visible){Y.geometry&&(Y.geometry.computeBoundingBox(),v.union(Y.geometry.boundingBox.clone().applyMatrix4(Y.matrixWorld)));for(let X of Y.children)P(X)}};P(h.car)}let ie=v.getCenter(new A),Te=new A(Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),Math.cos(t.yaw)*Math.cos(t.pitch)),we=new A(Math.cos(t.yaw),0,-Math.sin(t.yaw)),J=new A().crossVectors(Te,we),De=Math.tan(s.fov*Math.PI/360),R=0;for(let P of[v.min.x,v.max.x])for(let Y of[v.min.y,v.max.y])for(let X of[v.min.z,v.max.z]){let E=new A(P,Y,X).sub(ie);R=Math.max(R,Math.abs(E.dot(we))/(De*s.aspect)+E.dot(Te),Math.abs(E.dot(J))/De+E.dot(Te))}R=Math.max(R*1.1,t.snapshotOnly?x?15:13:x?10.4:9),s.position.copy(ie).addScaledVector(Te,R),s.lookAt(ie)}let x=["formula","formulaPro","formulaElite"].includes(e.frontBumper),_=ie=>{x=["formula","formulaPro","formulaElite"].includes(ie.frontBumper),h.update(ie),v=null,u.uniforms.color.value.set(window.PokerGarage.item("light",ie.light).color),f.forEach(Te=>{Te.color.copy(u.uniforms.color.value),Te.position.y=.36+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[ie.suspension]||0)*.86})};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let b=!1,S=null,D=0,O=0,F=()=>{let ie=r.clientWidth,Te=r.clientHeight;ie&&Te&&(n.setSize(ie,Te,!1),s.aspect=ie/Te,s.updateProjectionMatrix())},k=new ResizeObserver(F);k.observe(r),F();let I=new xi(1,1,{type:Ar,depthBuffer:!0});I.samples=4;let U=new Tn,K=new $r(-1,1,1,-1,0,1),j=new Wn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:I.texture},stepSize:{value:new Ee}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),re=new qe(new Xt(2,2),j);U.add(re);function ge(){let ie=n.getDrawingBufferSize(new Ee);(I.width!==ie.x||I.height!==ie.y)&&I.setSize(ie.x,ie.y),j.uniforms.stepSize.value.set(3/ie.x,3/ie.y),n.setRenderTarget(I),n.render(i,s),n.setRenderTarget(null),n.render(U,K)}let Q=ie=>{ie.button&&ie.button!==0||(t.manual=!0,S={id:ie.pointerId,x:ie.clientX,y:ie.clientY},r.setPointerCapture(ie.pointerId),ie.preventDefault())},de=ie=>{!S||S.id!==ie.pointerId||(t.yaw-=(ie.clientX-S.x)*.011,t.pitch=tf(t.pitch+(ie.clientY-S.y)*.009,-.24,1.35),S.x=ie.clientX,S.y=ie.clientY,ie.preventDefault())},Ie=ie=>{S&&S.id===ie.pointerId&&(S=null,r.hasPointerCapture(ie.pointerId)&&r.releasePointerCapture(ie.pointerId))},ze=ie=>{let Te={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};Te[ie.key]&&(t.manual=!0,t.yaw+=Te[ie.key][0],t.pitch=tf(t.pitch+Te[ie.key][1],-.24,1.35),ie.preventDefault())};r.addEventListener("keydown",ze),r.addEventListener("pointerdown",Q),r.addEventListener("pointermove",de),r.addEventListener("pointerup",Ie),r.addEventListener("pointercancel",Ie),r.addEventListener("lostpointercapture",Ie);function Ae(){b||(b=!0,window.removeEventListener("poker-garage-lighting",p),cancelAnimationFrame(D),k.disconnect(),r.removeEventListener("keydown",ze),r.removeEventListener("pointerdown",Q),r.removeEventListener("pointermove",de),r.removeEventListener("pointerup",Ie),r.removeEventListener("pointercancel",Ie),r.removeEventListener("lostpointercapture",Ie),Qa(i),l.dispose(),I.dispose(),j.dispose(),re.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove())}function Ve(ie){if(b)return;if(s.zoom=(t.previewScale||1)*(t.zoom||1),s.updateProjectionMatrix(),!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Ae();return}let Te=O?Math.min(.05,(ie-O)/1e3):0;O=ie,!document.hidden&&r.getBoundingClientRect().bottom>0&&(t.manual||(t.yaw+=Te*.13),y(),ge(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)),D=requestAnimationFrame(Ve)}return t.snapshotOnly||(D=requestAnimationFrame(Ve)),{update:_,setNight:m,dispose:Ae,state:t,measureClearance:()=>h.measureClearance(),snapshot(){y(),ge();let ie=document.createElement("canvas");return ie.width=n.domElement.width,ie.height=n.domElement.height,ie.getContext("2d").drawImage(n.domElement,0,0),ie}}};function N0(r){let e=r.parameters,t=null;if(!e)return r;switch(r.type){case"SphereGeometry":t=new Ot(e.radius,Math.max(12,Math.round(e.widthSegments*.4)),Math.max(8,Math.round(e.heightSegments*.4)),e.phiStart,e.phiLength,e.thetaStart,e.thetaLength);break;case"CylinderGeometry":t=new $e(e.radiusTop,e.radiusBottom,e.height,Math.max(12,Math.round(e.radialSegments*.4)),e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength);break;case"TorusGeometry":t=new Ut(e.radius,e.tube,Math.max(6,Math.round(e.radialSegments*.4)),Math.max(20,Math.round(e.tubularSegments*.4)),e.arc);break;case"TubeGeometry":t=new Ct(e.path,Math.max(12,Math.round(e.tubularSegments*.4)),e.radius,Math.max(5,Math.round(e.radialSegments*.4)),e.closed);break;case"LatheGeometry":t=new Ri(e.points,Math.max(16,Math.round(e.segments*.4)),e.phiStart,e.phiLength);break}return t||r}function B0(r){return Object.assign(Object.create(Object.getPrototypeOf(r)),r,{userData:{}}).clone()}function nf(r){let e=new Tn,t=fu(e,r,{prepareGeometry:N0});e.updateMatrixWorld(!0);let n=new ke,i=new ke;i.rotation.y=-Math.PI/2,i.scale.setScalar(.72),n.add(i);let s=[],a=[],o=new Map,l=new Map,c=[];e.traverse(g=>{g.isGroup&&g.userData.groundWheel&&c.push(g)});let h=new Map(c.map(g=>{let m=new ke;return m.position.copy(g.getWorldPosition(new A)),m.userData.spinAxis="z",m.userData.spinSign=-1,i.add(m),s.push(m),g.position.x>0&&a.push(m),[g,m]}));function u(g){for(;g;){if(!g.visible)return!1;g=g.parent}return!0}function d(g){return g.isShaderMaterial?g.uuid:Object.keys(g).sort().filter(m=>!["id","uuid","name","userData","version","_listeners"].includes(m)).flatMap(m=>{let p=g[m];return p===null||["string","number","boolean"].includes(typeof p)?[[m,p]]:p?.isColor?[[m,p.getHexString()]]:p?.isTexture?[[m,p.uuid]]:p?.toArray?[[m,p.toArray()]]:[]}).map(m=>JSON.stringify(m)).join("|")}function f(g){let m=d(g);if(!l.has(m)){let p=B0(g);p.map&&(p.map=g.map.clone()),p.map&&(p.map.needsUpdate=!0,p.map.image?.addEventListener?.("vinyl-ready",()=>p.map.needsUpdate=!0,{once:!0}));for(let v of["normalMap","bumpMap","emissiveMap","roughnessMap","metalnessMap","alphaMap"])g[v]&&(p[v]=g[v].clone(),p[v].needsUpdate=!0);l.set(m,p)}return l.get(m)}e.traverse(g=>{if(!g.isMesh||!u(g))return;let m=g;for(;m&&!h.has(m);)m=m.parent;let p=m?h.get(m):i,v=(m?.uuid||"body")+":"+[].concat(g.material).map(d).join(",");if(Array.isArray(g.material)){let x=g.geometry.clone().applyMatrix4(g.matrixWorld);m&&x.translate(-p.position.x,-p.position.y,-p.position.z);let _=new qe(x,g.material.map(f));_.castShadow=_.receiveShadow=!0,p.add(_);return}o.has(v)||o.set(v,{parent:p,material:f(g.material),parts:[]});let y=g.geometry.clone().applyMatrix4(g.matrixWorld);m&&y.translate(-p.position.x,-p.position.y,-p.position.z),o.get(v).parts.push(y)});for(let g of o.values()){let m=0;for(let D of g.parts)m+=D.attributes.position.count;let p=new Float32Array(m*3),v=new Float32Array(m*3),y=new Float32Array(m*2),x=[],_=0;for(let D of g.parts){if(p.set(D.attributes.position.array,_*3),v.set(D.attributes.normal.array,_*3),D.attributes.uv&&y.set(D.attributes.uv.array,_*2),D.index)for(let O of D.index.array)x.push(_+O);else for(let O=0;O<D.attributes.position.count;O++)x.push(_+O);_+=D.attributes.position.count,D.dispose()}let b=new pt;b.setAttribute("position",new vn(p,3)),b.setAttribute("normal",new vn(v,3)),b.setAttribute("uv",new vn(y,2)),b.setIndex(x),b.computeBoundingSphere();let S=new qe(b,g.material);S.castShadow=S.receiveShadow=!0,g.parent.add(S)}return Qa(e),n.userData.garageLook={...r},{root:n,wheels:s,frontWheels:a,seat:{side:0,forward:-.55,height:.94,scale:.49},dispose(){Qa(n)}}}function rf({box:r,cylinder:e,batch:t,label:n}){let i=(l,c,h,u,d,f,g)=>{let m=ms(c,u);r(l,m.x,h,m.z,g,f,d)},s=(l,c,h,u,d,f)=>{let g=ms(c,u);e(l,g.x,h,g.z,d,f)},a=(l,c,h,u,d,f=1)=>{let g=ms(c,u);return n(l,g.x,h,g.z,d,f,-Math.PI/2,"#193a35","#e7cc8a")},o=(l,c)=>{s("#bca77b",l,.5,c,.65,1);for(let h=0;h<7;h++){let u=h*Math.PI*2/7,d=ms(l+Math.sin(u)*.55,c+Math.cos(u)*.55);t("ball","#517b4b",d.x,1.3+Math.sin(h)*.25,d.z,.4,.8,.4,h,0)}};i("#d7c7aa",0,-.12,0,44,.24,32),i("#756554",0,-.07,-18.2,44,.14,4.4);for(let[l,c,h,u]of[[-22,0,.55,32],[22,0,.55,32],[-13,-16,18,.55],[13,-16,18,.55],[-12.5,16,19,.55],[5,16,4,.55],[21,16,2,.55]])i("#273b39",l,2.7,c,h,5.4,u),i("#c2a262",l,5.5,c,h+.08,.2,u+.08);for(let[l,c,h,u]of[[6,4,.35,6],[6,14,.35,4],[-6,2.5,.35,5],[-6,14,.35,4],[-4,0,4,.35],[4,0,4,.35],[-18,1,8,.35],[-9,1,2,.35],[9.5,1,3,.35],[19.5,1,5,.35]])i("#38514a",l,1.5,c,h,3,u),i("#b69a63",l,3.1,c,h+.08,.13,u+.08);i("#4c3330",0,.015,8,10,.025,14),i("#7e3d32",0,.035,8,9.7,.025,13.7),i("#ad9a68",0,.05,8,9.3,.015,13.3),i("#754134",0,.06,8,9.15,.015,13.15),i("#783b33",0,.65,6,3,1.3,3),i("#9e5141",0,1.5,4.7,3.1,2.1,.5);for(let l of[-1.35,1.35])i("#95503f",l,1,6,.4,1.4,3.1);s("#443830",0,.55,9,.08,1.1),s("#3a4a41",0,1.12,9,1.1,.12),i("#253d38",0,2.5,.3,9,3,.3);for(let l of[-3,-1.5,0,1.5,3])s("#d3b271",l,2.3,.65,.22,.6),s("#d3b271",l,2.65,.65,.38,.18),i("#e9bb67",l,3.8,.8,.6,.08,.3);a("TWO ACES \xB7 \u0414\u041E\u041C \u0423 \u041E\u041A\u0415\u0410\u041D\u0410",0,4.45,.6,9,1.15),i("#784535",-14,.02,9,13,.03,12),i("#b29b66",-14,.04,9,12.5,.02,11.5),i("#643f35",-14,.055,9,12.25,.02,11.25),s("#514331",-14,.55,9,.4,1.1),s("#c2a566",-14,1.2,9,4.2,.2),s("#1d654e",-14,1.32,9,4,.14);for(let l=0;l<6;l++){let c=l*Math.PI/3,h=-14+Math.sin(c)*5,u=9+Math.cos(c)*5;i("#7d3d32",h,.5,u,1.3,1,1.4),i("#a45343",h,1.2,u+.5,1.4,1.5,.25)}for(let l=0;l<3;l++)i("#eee2c4",-15+l*.7,1.41,9,.5,.02,.8),s(["#bf6852","#cfb672","#4f8a80"][l],-14+l*.6,1.47,7,.21,.22);i("#bfb59b",0,.5,-8,7,1,3),i("#e2d5b5",0,1,-9.5,7,1.8,.6);for(let l of[-3.5,3.5])i("#e2d5b5",l,.9,-8,.6,1.2,3);s("#534737",0,.6,-4.7,1.55,.1),s("#c4a467",0,.67,-4.7,1.5,.06),i("#a4906a",-2,1.05,-14,9,2.1,1.7),i("#38473e",-2,2.15,-14,9.2,.12,1.85);for(let l of[-5,-2,1])s("#a45343",l,.65,-11.6,.5,1.3);i("#4e5650",14,.01,8.5,15.5,.02,14.5);for(let l of[10,18]){for(let c of[-3.2,3.2])i("#c5aa6d",l+c,.035,9,.07,.025,12.5);i("#c5aa6d",l,.035,2.8,6.5,.025,.08)}a("\u0413\u0410\u0420\u0410\u0416 \xB7 \u041C\u0410\u041D\u041A\u0418CAR",13,5.75,16.35,12,1.2),a("\u0412\u0418\u041B\u041B\u0410 TWO ACES",-10,4.1,16.35,12,1.3),i("#574e3b",14,1.4,1.8,13,2.8,.8);for(let l of[9,12,15,18])s("#384438",l,2.9,2.2,.35,.2),s("#d1ac65",l,3.12,2.2,.24,.25),i("#b3975d",l,1.1,2.3,.45,.65,.5);i("#786747",14,.03,-7,13,.03,13),i("#38534a",14,1.25,-7,8,.3,4),i("#d1b471",14,1.13,-7,8.35,.12,4.35);for(let l of[10.7,17.3])for(let c of[-8.2,-5.8])i("#5a4833",l,.55,c,.3,1.1,.3);a("\u0421\u0412\u041E\u0418 \xB7 \u0411\u0418\u041B\u042C\u042F\u0420\u0414",14,4,-15.6,11,1.1),i("#745c3d",-18,1.35,-8,6,2.7,9),a("\u0411\u0410\u041D\u042F / \u041A\u0420\u041E\u0421\u0421\u0424\u0418\u0422",-14,4,-15.6,12,1.1);for(let l of[-10,-7])i("#3a4240",l,.15,-8,1,.3,5),i("#444f4c",l,.55,-8,1,.35,2);i("#e4d7b6",8,.03,-18,15,.09,4.2),i("#408e92",8,.09,-18,14,.07,3.35);for(let l of[1,15])i("#e7d5ab",l,.17,-18,.3,.16,4.2);i("#e7d5ab",8,.17,-16.1,14,.16,.3),i("#e7d5ab",8,.17,-19.9,14,.16,.3),s("#d8ccac",-16,.15,-18,2.1,.3),s("#3e9299",-16,.32,-18,1.75,.04),i("#8c7150",-6,.7,-18,6,1.4,2.1);for(let l of[-9.6,-2.4])i("#bca783",l,.5,-18,.9,1,1.7);for(let l of[-21,21])for(let c of[-14,13])o(l,c);for(let l of[-5,5])o(l,14);i("#c2b398",12,-.02,18,16,.04,4);for(let l of[4,21])i("#52634d",l,.5,18,.5,1,4),s("#eac67e",l,1.1,18,.15,.25);r("#8f7856",133,.12,57,22,.28,2.8);for(let l=124;l<145;l+=2.5)r("#69543d",l,-.9,57,.3,2.1,2.8);return t("ball","#d8ded2",149,.6,57,3,.9,8.5),r("#f0ebd8",149,1.35,56,4.6,.6,11),r("#b5c3bd",149,2.1,55,3.6,1.2,4.5),r("#3f666c",149,2.6,56.3,3.8,.7,.12),r("#ece4ca",149,3.05,55,4.2,.18,5),e("#c7cbbb",149,4.1,54.5,.05,2.1),fs}var ai=Math.PI;async function sf(r,e,t={}){let n=new si({canvas:r,antialias:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(devicePixelRatio,1.5)),n.outputColorSpace=bt,n.toneMapping=ri,n.toneMappingExposure=1.15,n.shadowMap.enabled=!0,n.shadowMap.type=wr;let i=new Tn;i.background=new dt("#dbbca7"),i.fog=new Sa("#dbbca7",85,260);let s=new qe(new Ot(360,24,16),new Wn({side:$n,depthWrite:!1,uniforms:{},vertexShader:"varying vec3 vSky;void main(){vSky=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 vSky;void main(){float h=normalize(vSky).y;vec3 horizon=vec3(.88,.72,.59),zenith=vec3(.36,.62,.70);gl_FragColor=vec4(mix(horizon,zenith,smoothstep(0.,.8,h)),1.);}"}));i.add(s);let a=new sn(59,1,.15,420),o=new Kn("#d6ebff","#b7a080",2.35);i.add(o);let l=new qn("#ffdb9e",3);l.position.set(-55,75,-40),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=l.shadow.camera.bottom=-42,l.shadow.camera.right=l.shadow.camera.top=42,l.shadow.camera.far=150,l.shadow.normalBias=.055,l.shadow.bias=-2e-4,i.add(l,l.target);let c=new Map,h=new Map,u=[],d=[],f=[];function g(T,L=!1){let H=new Map;for(let ne of[...T.children]){if(!ne.isMesh)continue;let G=L?"all":ne.material.uuid;H.has(G)||H.set(G,[]),H.get(G).push(ne)}for(let ne of H.values()){if(ne.length<2)continue;let G=[],Z=[],ee=[],ue=[],me=[],w=0;for(let xe of ne){xe.updateMatrix();let Ge=xe.geometry.clone().applyMatrix4(xe.matrix),Ce=Ge.attributes.position,Xe=Ge.attributes.normal,Qe=Ge.attributes.uv;G.push(...Ce.array),Z.push(...Xe.array),Qe&&ue.push(...Qe.array);for(let Oe=0;Oe<Ce.count;Oe++)ee.push(xe.material.color.r,xe.material.color.g,xe.material.color.b);if(Ge.index)for(let Oe of Ge.index.array)me.push(w+Oe);else for(let Oe=0;Oe<Ce.count;Oe++)me.push(w+Oe);w+=Ce.count,Ge.dispose(),T.remove(xe),Object.values(v).includes(xe.geometry)||xe.geometry.dispose()}let $=new pt;$.setAttribute("position",new Re(G,3)),$.setAttribute("normal",new Re(Z,3)),ue.length===w*2&&$.setAttribute("uv",new Re(ue,2)),L&&$.setAttribute("color",new Re(ee,3)),$.setIndex(me);let se=L?m:ne[0].material,he=new qe($,se);he.castShadow=he.receiveShadow=!0,T.add(he)}}let m=new wt({vertexColors:!0,roughness:.85}),p=(T,L=!1)=>{let H=T+L;return c.has(H)||c.set(H,new wt({color:T,roughness:.82,metalness:.03,...L?{emissive:T,emissiveIntensity:.6}:{}})),c.get(H)},v={box:new nt(1,1,1),cyl:new $e(1,1,1,10),cone:new qr(1,1,7),ball:new Ot(1,10,7)},y=new gn;function x(T,L,H,ne,G,Z,ee,ue,me=0,w=0,$=!1){let se=T+L+$;h.has(se)||h.set(se,{type:T,color:L,emissive:$,items:[]}),h.get(se).items.push([H,ne,G,Z,ee,ue,me,w])}let _=(T,L,H,ne,G,Z,ee,ue=0)=>x("box",T,L,H,ne,G,Z,ee,ue),b=(T,L,H,ne,G,Z,ee=0,ue=0)=>x("cyl",T,L,H,ne,G,Z,G,ee,ue);function S(T,L,H,ne,G=8,Z=2,ee=0,ue="#123b3e",me="#f2d294"){let w=document.createElement("canvas");w.width=1024,w.height=256;let $=w.getContext("2d");$.fillStyle=ue,$.fillRect(0,0,1024,256),$.strokeStyle=me,$.lineWidth=8,$.strokeRect(12,12,1e3,232),$.fillStyle=me,$.textAlign="center",$.textBaseline="middle",$.font="800 105px Arial",$.fillText(T,512,137,950);let se=new kt(w);se.colorSpace=bt,se.anisotropy=4,u.push(se);let he=new wt({map:se,emissive:"#ffffff",emissiveMap:se,emissiveIntensity:.3,roughness:.7}),xe=new qe(new Xt(G,Z),he);return xe.position.set(L,H,ne),xe.rotation.y=ee,i.add(xe),d.push(xe),xe}function D(T){let L=document.createElement("canvas");L.width=L.height=256;let H=L.getContext("2d");H.fillStyle=T==="road"?"#4a5154":"#c7bca7",H.fillRect(0,0,256,256);let ne=77;for(let Z=0;Z<12e3;Z++)ne=ne*1664525+1013904223>>>0,H.fillStyle=ne%2?"#ffffff0a":"#0000000c",H.fillRect(ne%256,(ne>>>8)%256,1,1);if(T==="pave"){H.strokeStyle="#968e7d66",H.lineWidth=2;for(let Z=0;Z<256;Z+=32)H.beginPath(),H.moveTo(Z,0),H.lineTo(Z,256),H.moveTo(0,Z),H.lineTo(256,Z),H.stroke()}let G=new kt(L);return G.wrapS=G.wrapT=bn,G.colorSpace=bt,G.repeat.set(T==="road"?4:36,T==="road"?45:36),u.push(G),G}let O=new qe(new Xt(232,220),new wt({map:D("pave"),roughness:1}));O.rotation.x=-ai/2,O.position.set(6,-.04,-10),O.receiveShadow=!0,i.add(O),d.push(O);let F=D("road");function k(T,L,H,ne){let G=new qe(new nt(H,.05,ne),new wt({map:F,roughness:1}));G.position.set(T,0,L),G.receiveShadow=!0,i.add(G),d.push(G)}for(let T of Ui){k(T,-9,14,208);for(let L of[-1,1])_("#d8cbb2",T+L*7.3,.08,-9,.4,.2,208);for(let L=-105;L<91;L+=8)Yi.some(H=>Math.abs(L-H)<10)||_("#f0dfb5",T,.033,L,.12,.012,3.7)}for(let T of Yi){k(-1,T,192,14);for(let L of[-1,1])_("#d8cbb2",-1,.08,T+L*7.3,192,.2,.4);for(let L=-90;L<93;L+=8)Ui.some(H=>Math.abs(L-H)<10)||_("#f0dfb5",L,.04,T,3.7,.012,.12)}for(let T of Ui)for(let L of Yi){k(T,L,16,16);for(let H=-5;H<=5;H+=2)_("#e9e1cf",T+H,.05,L+10,1.1,.02,3),_("#e9e1cf",T+10,.05,L+H,3,.02,1.1)}for(let[T,L]of Or.entries()){_(L.color,L.x,L.h/2,L.z,L.w,L.h,L.d),_("#7f8b84",L.x,.6,L.z,L.w+.4,1.2,L.d+.4),_("#f3deba",L.x,L.h-.35,L.z,L.w+.7,.7,L.d+.7),_("#8b9692",L.x,L.h+.35,L.z,L.w*.85,.5,L.d*.85);let H=Math.floor(L.h/3.7);for(let ne=0;ne<H;ne++){let G=2.6+ne*3.7;for(let Z=0;Z<4;Z++){let ee=Z<2,ue=Z%2===0?1:-1,me=Math.floor((ee?L.w:L.d)/3.5);for(let w=0;w<me;w++){let $=(w-(me-1)/2)*3.5,se=ee?L.x+$:L.x+ue*(L.w/2+.04),he=ee?L.z+ue*(L.d/2+.04):L.z+$,xe=(w+ne+T)%5===0;_(xe?"#e7b86c":"#345b65",se,G,he,ee?1.65:.09,1.9,ee?.09:1.65),_("#e2d1b7",se,G-1.05,he,ee?1.95:.2,.15,ee?.2:1.95),_("#9baba2",se,G,he,ee?.055:.11,1.88,ee?.11:.055),ne%2===1&&w%2===0&&(_("#bdb8a5",ee?se:se+ue*.5,G-.85,ee?he+ue*.5:he,ee?2.3:1.2,.16,ee?1.2:2.3),_("#405553",ee?se:se+ue*1,G-.3,ee?he+ue*1:he,ee?2.25:.08,.1,ee?.08:2.25))}}}L.name&&S(L.name,L.x,3.1,L.z+L.d/2+.12,Math.min(L.w-2,16),1.8);for(let ne=0;ne<2;ne++)_("#7c8d89",L.x-3+ne*6,L.h+1,L.z,3,1.2,3)}e("\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C TWO ACES\u2026"),_("#234d49",-24,.13,-23,30,.25,24);for(let[T,L,H,ne]of[[-39,-23,.55,24],[-9,-23,.55,24],[-24,-35,30,.55],[-33,-11,12,.55],[-15,-11,12,.55]])_("#1c4945",T,3.6,L,H,7.2,ne),_("#d4ae62",T,7.3,L,H+.1,.25,ne+.1);for(let T of[-36,-30,-18,-12])_("#d4ae62",T,3.5,-10.65,.28,7,.4),_("#163b3b",T,2.9,-10.8,3.5,4,.14);_("#184840",-24,6.5,-10.5,10,2,.6),S("\u2660 TWO ACES \u2660",-24,6.5,-10.17,9,1.8),_("#e1bf79",-24,5.4,-8.5,13,.2,5);for(let T of[-29.8,-18.2])b("#d5ba7e",T,2.7,-7,.18,5.4);_("#755444",-32,1.1,-28,9,2.2,2),_("#d2af68",-32,2.25,-28,9.4,.14,2.3),_("#3d6560",-32,3.8,-34.6,10,2.5,.3),S("POKER21 \xB7 \u0420\u041E\u041C\u0410",-30,4.2,-34.2,10,2),_("#315550",-17,1.1,-27,4,2.2,5),_("#bfa36b",-24,.27,-23,3,.015,22),_("#244b44",-24,.28,-23,2.84,.015,22);for(let[T,L]of[[-30,-20],[-16,-19]]){b("#3e2f23",T,.6,L,.3,1.2),b("#183d36",T,1.3,L,2,.2),b("#d2b46e",T,1.22,L,2.12,.12);for(let H=0;H<4;H++){let ne=H*ai/2,G=T+Math.sin(ne)*2.7,Z=L+Math.cos(ne)*2.7;_("#4b3830",G,.55,Z,.9,1,.9),_("#7e5143",G,1,Z,.82,.16,.82),_("#7e5143",G+Math.sin(ne)*.32,1.4,Z+Math.cos(ne)*.32,.95,.75,.16,ne),_("#f3e4c2",T+.5,1.42,L,.42,.015,.62,.25);for(let ee=0;ee<3;ee++)b("#cea55e",T-.6,1.43+ee*.07,L+.3,.17,.06)}}for(let T of[-35,-13])_("#b49350",T,1,-7,2,2,2),re(T,-7,6);_("#768f8e",Jn.x,5,Jn.z,Jn.w,10,Jn.d),_("#566e70",Jn.x,10.2,Jn.z,Jn.w+1,.45,Jn.d+1),_("#3c5556",85,2.6,-57.8,8,5.2,.2),S("PORT 21 \xB7 \u0421\u041A\u041B\u0410\u0414 04",85,7.5,-57.7,17,2);for(let[T,L]of[-33,-14].entries()){let H=T===1?88:89,ne=T===1?12:10,G=T===2?13:10;_(["#9a5147","#2a7377","#b28d4d"][T],H,2,L,ne,4,G);for(let Z=H-ne/2+.5;Z<H+ne/2;Z+=.8)_("#b7b0a0",Z,2,L+G/2+.02,.08,3.6,.04)}for(let T=-100;T<=83;T+=5)b("#536c6d",118.5,.8,T,.09,1.6),_("#657b79",118.5,1.4,T+2.5,.1,.09,5);_("#bcaa8b",120,.04,-8,4,.6,220),_("#4e7174",123,-1.2,-8,2,3,222);for(let T of[108,117])b("#d4a257",T,10,-98,.6,20),_("#d4a257",T,15,-95,.55,.5,17);_("#d4a257",112.5,20,-99,15,.8,1),_("#617a7a",112.5,17,-88,.1,6,.1);let I=new Xt(440,550,40,35);I.rotateX(-ai/2);let U=new qe(I,new wt({color:"#368b91",roughness:.27,metalness:.42,transparent:!0,opacity:.92}));U.position.set(344,-.8,-30),i.add(U),d.push(U);let K=I.attributes.position,j=Float32Array.from(K.array);for(let T=0;T<16;T++){let L=151+T%5*21,H=-95+Math.floor(T/5)*61;_("#dbe4ce",L,1,H,2,.5,6),_("#436b77",L,1.7,H-1,1.5,1.2,2),b("#cbb993",L,4,H,.06,6)}_("#8d9c76",-47,.03,55,20,.1,13),_("#85a47e",31,.03,54,31,.1,12);function re(T,L,H=8){b("#8d6b45",T,H*.48,L,.22,H*.96,0,.07);for(let ne=0;ne<7;ne++){let G=ne*ai*2/7;x("ball","#476f4a",T+Math.sin(G)*1.7,H,L+Math.cos(G)*1.7,2.6,.24,.65,G,.18),x("ball","#68834d",T+Math.sin(G)*3.3,H-.5,L+Math.cos(G)*3.3,1.7,.2,.5,G,-.2)}}for(let T=-97;T<90;T+=21)for(let L of[11,60,94])!(L===94&&T<-45)&&!Or.some(H=>Math.abs(L-H.x)<H.w/2+2&&Math.abs(T-H.z)<H.d/2+2)&&re(L,T,7+Math.sin(T)*1.5);for(let[T,L]of[[-54,14],[-53,45],[-53,60],[-14,54],[18,53],[42,54],[-51,-64],[53,-88]])re(T,L,8);for(let T=-97;T<84;T+=27)for(let L of[-10,82])b("#496465",L,3.4,T,.09,6.8),_("#496465",L+1,6.7,T,2,.12,.12),x("box","#ffe1a3",L+1.7,6.62,T,.65,.12,.35,0,0,!0);for(let T of[-48,-18,25,46]){_("#745b48",T,.7,54,4,.2,1),_("#745b48",T,1.1,54.5,4,.8,.12);for(let L of[-1.5,1.5])_("#3c5555",T+L,.35,54,.12,.7,.7)}for(let[T,L]of[[-51,11],[11,-13],[62,14],[11,60]])b("#284e4b",T,.65,L,.35,1.3),b("#daa759",T,1.33,L,.39,.08);S("\u041F\u041E\u0420\u0422 \u2192",11,3.4,-72,6,1.3,0,"#235963","#f3e0b4"),S("\u041D\u0410\u0411\u0415\u0420\u0415\u0416\u041D\u0410\u042F",117,3.4,79,14,1.8,-ai/2);for(let T=0;T<30;T++){let L=12+T*13%37;_("#a8afa9",-170+T*12,L/2,-150,7+T%3*3,L,12)}x("ball","#ffdfaa",140,45,-170,13,13,13,0,0,!0),rf({box:_,cylinder:b,batch:x,label:S});let ge=[];for(let T of h.values()){let L=new jr(v[T.type],p(T.color,T.emissive),T.items.length);for(let H=0;H<T.items.length;H++){let[ne,G,Z,ee,ue,me,w,$]=T.items[H];y.position.set(ne,G,Z),y.scale.set(ee,ue,me),y.rotation.set(0,w,$),y.updateMatrix(),L.setMatrixAt(H,y.matrix)}L.castShadow=!0,L.receiveShadow=!0,L.computeBoundingSphere(),i.add(L),ge.push(L)}e("\u041C\u0430\u043D\u043A\u0438 \u0432\u044B\u0445\u043E\u0434\u0438\u0442 \u0432 \u0433\u043E\u0440\u043E\u0434\u2026");let Q=t.owner?t.look:{...window.PokerGarage.defaults,body:"bodyNormal",suit:"emeraldBomber",pants:"blackDenim",shoes:"ivoryLow",helmet:"none",hair:"hairNatural",patch:"aces",glasses:"none"},de=await Kl(window.PokerGarage,Q),Ie=new ke;de.root.scale.setScalar(.57),de.root.position.y=1.08,Ie.add(de.root),i.add(Ie),f.push(()=>de.dispose());function ze(T){let L=new ke,H={};function ne(G,Z,ee,ue,me,w=1,$=1,se=1,he=L){let xe=new qe(G,p(Z));return xe.position.set(ee,ue,me),xe.scale.set(w,$,se),xe.castShadow=!0,he.add(xe),xe}ne(v.ball,T,0,1.05,0,.32,.45,.2),ne(v.ball,"#58402e",0,1.67,0,.24,.27,.21),ne(v.ball,"#b9956f",0,1.59,.18,.19,.12,.12);for(let G of[-1,1]){ne(v.ball,"#a68564",G*.25,1.67,0,.09,.12,.07),ne(v.ball,"#161e1c",G*.085,1.72,.195,.028,.03,.025);let Z=new ke;Z.position.set(G*.15,.82,0),L.add(Z),ne(v.box,"#2b3839",0,-.32,0,.2,.65,.2,Z),ne(v.box,"#e0d2ae",0,-.65,.07,.23,.12,.34,Z),H[G<0?"leftLeg":"rightLeg"]=Z;let ee=new ke;ee.position.set(G*.34,1.3,0),L.add(ee),ne(v.ball,T,0,-.18,0,.12,.29,.12,ee),ne(v.ball,"#a68564",0,-.45,.03,.1,.12,.09,ee),H[G<0?"leftArm":"rightArm"]=ee}g(L,!0);for(let G of Object.values(H))g(G,!0);return{root:L,parts:H}}let Ae=ze("#e4d4ae");Ae.root.position.set(Fn.x-3,0,Fn.z+.2),Ae.root.rotation.y=0,i.add(Ae.root),S("\u0420\u041E\u041C\u0410",Fn.x-3,2.45,Fn.z+.3,2.1,.55);let Ve=[];for(let T=0;T<10;T++){let L=ze(["#416b71","#c18961","#a6b589","#624e64"][T%4]);L.root.position.set(T<5?10:61,0,-62+T%5*27),L.offset=T*3,Ve.push(L),i.add(L.root)}function ie(T,L=!1){let H=new ke,ne=[],G=[],Z=new wt({color:T,metalness:.42,roughness:.3}),ee=new wt({color:"#365c61",metalness:.15,roughness:.18,transparent:!0,opacity:.58,depthWrite:!1});d.push({material:Z},{material:ee});function ue(Xe,Qe,Oe,ut,at,ft,xt){let Dt=new qe(new nt(Xe,Qe,Oe),ut);return Dt.position.set(at,ft,xt),Dt.castShadow=Dt.receiveShadow=!0,H.add(Dt),Dt}let me=new Wt,w=2.16,$=4.6,se=.28;me.moveTo(-w/2+se,-$/2),me.lineTo(w/2-se,-$/2),me.quadraticCurveTo(w/2,-$/2,w/2,-$/2+se),me.lineTo(w/2,$/2-se),me.quadraticCurveTo(w/2,$/2,w/2-se,$/2),me.lineTo(-w/2+se,$/2),me.quadraticCurveTo(-w/2,$/2,-w/2,$/2-se),me.lineTo(-w/2,-$/2+se),me.quadraticCurveTo(-w/2,-$/2,-w/2+se,-$/2);let he=new qe(new Vt(me,{depth:.36,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:2,curveSegments:4}),Z);he.rotation.x=-ai/2,he.position.y=.55,he.castShadow=!0,H.add(he),ue(2.05,.16,4.5,p("#c8a66a"),0,.48,0);let xe=new pt,Ge=[-.98,.93,-1.65,.98,.93,-1.65,.98,.93,1,-.98,.93,1,-.79,1.55,-1.15,.79,1.55,-1.15,.79,1.55,.25,-.79,1.55,.25];xe.setAttribute("position",new Re(Ge,3)),xe.setIndex([0,4,5,0,5,1,1,5,6,1,6,2,2,6,7,2,7,3,3,7,4,3,4,0,4,7,6,4,6,5]),xe.computeVertexNormals();let Ce=new qe(xe,ee);Ce.castShadow=!0,H.add(Ce),ue(1.66,.12,1.5,Z,0,1.56,-.45),ue(2.06,.17,1.5,Z,0,.98,1.45),ue(2.06,.17,.7,Z,0,.98,-1.95);for(let Xe of[-1,1]){ue(.08,.56,.1,Z,Xe*.87,1.25,-.25);let Qe=ue(.085,.77,.095,Z,Xe*.87,1.25,-1.42);Qe.rotation.x=.66;let Oe=ue(.085,.96,.095,Z,Xe*.87,1.25,.63);Oe.rotation.x=-.88,ue(.1,.06,.28,p("#decba1"),Xe*1.12,.9,-.15),ue(.25,.14,.35,Z,Xe*1.19,1.11,.58),ue(.65,.16,.06,p("#ffe6b1",!0),Xe*.68,.8,2.33),ue(.67,.13,.06,p("#d45945",!0),Xe*.68,.8,-2.33);for(let ut of[-1.42,1.42]){let at=new ke;at.position.set(Xe*1.09,.43,ut),H.add(at);let ft=new qe(new $e(.43,.43,.27,16),p("#222b2c"));ft.rotation.z=ai/2,at.add(ft);let xt=new qe(new $e(.27,.27,.282,12),p("#d9b572"));xt.rotation.z=ai/2,at.add(xt),ne.push(at),ut>0&&G.push(at)}}for(let Xe of[-.47,.47])ue(.62,.3,.65,p("#263d3b"),Xe,.68,-.25),ue(.62,.6,.16,p("#263d3b"),Xe,.96,-.62),ue(.4,.18,.14,p("#263d3b"),Xe,1.3,-.62);if(ue(1.1,.18,.07,p("#1f2b2d"),0,.77,2.36),ue(.6,.13,.07,p("#e3d8b6"),0,.62,-2.37),L){ue(1.4,.12,.35,p("#273c44"),0,1.62,-.3);for(let Xe of[-1,1])ue(.55,.18,.35,p(Xe<0?"#477ee8":"#f75a53",!0),Xe*.4,1.76,-.3)}g(H);for(let Xe of ne)g(Xe,!0);return{root:H,wheels:ne,frontWheels:G}}e("\u0412\u044B\u0432\u043E\u0437\u0438\u043C \u0432\u0430\u0448 \u043A\u0430\u0440\u0442 \u0438\u0437 \u0433\u0430\u0440\u0430\u0436\u0430\u2026");let Te=nf(t.look||window.PokerGarage.defaults),we=[ie("#cdab71"),ie("#9c6256"),ie("#758b9c"),ie("#d3c9ae")],J=ie("#dce4de",!0);i.add(Te.root,J.root,...we.map(T=>T.root));let De=new ke;De.position.set(Fr.x,.7,Fr.z),i.add(De);function R(T,L,H,ne,G,Z,ee){let ue=new qe(new nt(T,L,H),p(ne));ue.position.set(G,Z,ee),ue.castShadow=!0,De.add(ue)}R(1.2,.7,.45,"#28544a",0,0,0),R(1.23,.08,.48,"#dcba78",0,.16,0);for(let T of[-.4,.4])R(.09,.22,.48,"#d6b574",T,.02,0);R(.4,.08,.08,"#dcba78",0,.51,0);for(let T of[-.2,.2])R(.06,.16,.08,"#dcba78",T,.43,0);let P=new ke,Y=new qe(new Ut(2,.085,8,48),new In({color:"#ffd27c",transparent:!0,opacity:.85}));Y.rotation.x=-ai/2,Y.position.y=.14,P.add(Y);let X=new qe(new qr(.45,.8,4),new In({color:"#ffe0a1"}));X.rotation.z=ai,X.position.y=3.5,P.add(X),i.add(P);let E=new qe(new Ut(2,.06,6,40),new In({color:"#80c9bc",transparent:!0,opacity:.65}));E.rotation.x=-ai/2,E.position.set(Fn.x,.12,Fn.z),i.add(E),d.push(Y,X,E);let N=new qe(new Xn(.53,20),new In({color:"#142e2d",transparent:!0,opacity:.16,depthWrite:!1}));N.rotation.x=-ai/2,N.position.y=.1,i.add(N),d.push(N);let q=new Wa,W=new A,_e=new A,oe=new A,ce={yaw:0,pitch:.2,distance:6.2},Pe=0,Ye=Br.x,Ue=Br.z,tt=0,ct=!1;function yt(){let T=r.clientWidth,L=r.clientHeight;n.setSize(T,L,!1),a.aspect=T/L,a.fov=T<L?64:58,a.updateProjectionMatrix()}yt();let Pt=0,Et=0;function Mt(T,L,H,ne=!1){if(ct)return;let G=Math.max(0,T.time-tt);tt=T.time;let Z=T.driving?T.car:T.player,ee=Math.hypot(Z.x-Ye,Z.z-Ue)/Math.max(L,.001);if(Ye=Z.x,Ue=Z.z,Pe+=Math.min(ee,8)*G*2.2,Ie.visible=!0,Ie.position.set(T.player.x,0,T.player.z),Ie.rotation.y=T.player.yaw,de.root.scale.setScalar(T.driving?Te.seat.scale:.57),de.root.position.y=T.driving?Te.seat.height:1.08,T.driving&&(Ie.position.set(T.car.x+Math.cos(T.car.yaw)*Te.seat.side+Math.sin(T.car.yaw)*Te.seat.forward,0,T.car.z-Math.sin(T.car.yaw)*Te.seat.side+Math.cos(T.car.yaw)*Te.seat.forward),Ie.rotation.y=T.car.yaw),N.visible=!T.driving,N.position.x=T.player.x,N.position.z=T.player.z,G>0){de.rig.update(T.time,.35,G);for(let[se,he]of[["left",1],["right",-1]]){let xe=de.rig.bones,Ge=T.driving?0:Math.min(1,ee/4.5),Ce=Pe+(he<0?ai:0);xe[se+"Hip"].rotation.x=Math.sin(Ce)*.6*Ge,xe[se+"Knee"].rotation.x=-Math.max(0,-Math.sin(Ce))*.8*Ge,xe[se+"Shoulder"].rotation.x=-Math.sin(Ce)*.45*Ge,xe[se+"Elbow"].rotation.x=-.18-Math.max(0,Math.sin(Ce))*.24*Ge,T.driving&&(xe[se+"Hip"].rotation.x=-1.3,xe[se+"Knee"].rotation.x=1.45,xe[se+"Shoulder"].rotation.x=-1.05,xe[se+"Elbow"].rotation.x=-.5)}}de.root.updateMatrixWorld(!0),de.rig.skeleton.update();for(let[se,he]of[[Te,T.car],...we.map((xe,Ge)=>[xe,T.traffic[Ge]]),[J,T.police]]){se.root.position.set(he.x,Math.sin(T.time*5)*.012,he.z),se.root.rotation.y=he.yaw;for(let xe of se.wheels)xe.rotation[xe.userData.spinAxis||"x"]+=he.speed*G/.43*(xe.userData.spinSign||1);for(let xe of se.frontWheels)xe.rotation.y=he===T.car?-(T.steer||0)*.28:0}J.root.visible=!!T.heat,De.visible=!T.carrying&&T.missionActive,Ve.forEach((se,he)=>{let xe=-60+(T.time*1.05+se.offset*7)%135;se.root.position.z=he%2?65-(xe+60):xe,se.root.rotation.y=he%2?ai:0;for(let Ge of["left","right"]){let Ce=Ge==="left"?1:-1;se.parts[Ge+"Leg"].rotation.x=Math.sin(T.time*3.4+se.offset)*.4*Ce,se.parts[Ge+"Arm"].rotation.x=-Math.sin(T.time*3.4+se.offset)*.3*Ce}}),P.visible=!!H.target&&T.missionActive;let ue=H.target;if(ue&&(P.position.set(ue.x,0,ue.z),X.position.y=3.2+Math.sin(T.time*2.8)*.28,X.rotation.y=T.time*.8),Y.material.opacity=.6+Math.sin(T.time*2)*.2,Pt++%3===0){for(let se=0;se<K.count;se++)K.setY(se,j[se*3+1]+Math.sin(j[se*3]*.12+T.time*.65)*.18+Math.cos(j[se*3+2]*.15+T.time*.5)*.1);K.needsUpdate=!0}W.set(Z.x,T.driving?1.6:1.55,Z.z);let me=T.driving?ce.distance+3.5:ce.distance;_e.set(Z.x-Math.sin(ce.yaw)*me,W.y+1.8+ce.pitch*5,Z.z-Math.cos(ce.yaw)*me);let w=_e.clone().sub(W);q.set(W,w.clone().normalize()),q.far=w.length();let $=1;for(let se of sc){let he=Or.find(Ce=>Math.abs(Ce.x-(se.minX+se.maxX)/2)<.1&&Math.abs(Ce.z-(se.minZ+se.maxZ)/2)<.1)?.h||7,xe=0,Ge=1;for(let[Ce,Xe,Qe,Oe]of[[W.x,w.x,se.minX,se.maxX],[W.z,w.z,se.minZ,se.maxZ],[W.y,w.y,0,he]])if(Math.abs(Xe)<1e-5){if(Ce<Qe||Ce>Oe){xe=2;break}}else{let ut=(Qe-Ce)/Xe,at=(Oe-Ce)/Xe;xe=Math.max(xe,Math.min(ut,at)),Ge=Math.min(Ge,Math.max(ut,at))}xe<=Ge&&xe>0&&($=Math.min($,xe))}$<1&&_e.copy(W).addScaledVector(w,Math.max(.12,$-.05)),a.position.lerp(_e,1-Math.exp(-L*9)),oe.copy(W),oe.y+=T.driving?.1:.15,a.lookAt(oe),ne&&(a.position.set(65,24,78),a.lookAt(98,2,40)),l.target.position.set(Z.x,0,Z.z),l.position.set(Z.x-40,70,Z.z-35),n.render(i,a),Et+=L}return a.position.set(Br.x,4.3,Br.z-6.2),{renderer:n,scene:i,camera:a,orbit:ce,fit:yt,render:Mt,get metrics(){return{calls:n.info.render.calls,triangles:n.info.render.triangles}},dispose(){if(ct)return;ct=!0,f.forEach(H=>H());let T=new Set,L=new Set;i.traverse(H=>{if(H.geometry&&T.add(H.geometry),H.material)for(let ne of[].concat(H.material))L.add(ne)}),T.forEach(H=>H.dispose()),L.forEach(H=>H.dispose()),c.forEach(H=>H.dispose()),i.traverse(H=>{H.isInstancedMesh&&H.dispose()}),u.forEach(H=>H.dispose()),n.dispose(),n.forceContextLoss()}}}var Rr=null,We=r=>document.getElementById(r),lf="poker21-city:v1",hs={};try{hs=JSON.parse(localStorage.getItem(lf)||"{}")||{}}catch{}var He=ia(hs),En=null,cr=!1,ji=!0,$l=!1,no=0,io=0,mu=0,Ql=He.phase,ro=!1,to="standard",Xi=hs.sound===!0,F0=0,oi=new Set,pi={x:0,y:0,id:null},cs={gas:!1,brake:!1},cf=[],Ii=null,hf=-10,af=100;function jt(r,e,t,n){r.addEventListener(e,t,n),cf.push(()=>r.removeEventListener(e,t,n))}function Pr(){try{localStorage.setItem(lf,JSON.stringify({...cc(He),sound:Xi,best:hs.best||null}))}catch{}}function ec(){oi.clear(),cs.gas=cs.brake=!1,pi.x=pi.y=0,pi.id=null,Ii=null,We("cityStick").querySelector("i").style.transform="translate(-50%,-50%)"}function so(){ji=!0,ec(),Lr.silence(),no=0,io=0}function Ir(){!cr||He.failed||(ji=!1,no=0,io=0)}function tc(){!cr||We("cityPauseDialog").open||We("cityResult").open||We("cityMapDialog").open||(so(),We("cityPauseDialog").showModal())}function uf(){He=ia({completed:He.completed}),Ql=He.phase,ro=!1,Pr(),We("cityResult").close(),We("cityPauseDialog").close(),document.body.classList.remove("city-failed"),En.orbit.yaw=0,En.orbit.pitch=.24,Ir(),nc()}var Lr={context:null,engine:null,gain:null,enabled:!1,start(){if(Xi)try{if(!this.context){let r=window.AudioContext||window.webkitAudioContext;this.context=new r,this.engine=this.context.createOscillator(),this.gain=this.context.createGain();let e=this.context.createBiquadFilter();e.type="lowpass",e.frequency.value=420,this.engine.type="sawtooth",this.engine.frequency.value=48,this.gain.gain.value=0,this.engine.connect(e).connect(this.gain).connect(this.context.destination),this.engine.start()}this.context.resume().catch(()=>{})}catch{Xi=!1}},update(){if(!this.context||!this.gain)return;let r=Xi&&!ji&&He.driving;this.gain.gain.setTargetAtTime(r?.018:0,this.context.currentTime,.12),this.engine.frequency.setTargetAtTime(42+Math.abs(He.car.speed)*4,this.context.currentTime,.08)},silence(){this.gain&&(this.gain.gain.value=0)},beep(r=500){if(!Xi||(this.start(),!this.context))return;let e=this.context.createOscillator(),t=this.context.createGain(),n=this.context.currentTime;e.frequency.value=r,t.gain.setValueAtTime(.035,n),t.gain.exponentialRampToValueAtTime(.001,n+.16),e.connect(t).connect(this.context.destination),e.start(n),e.stop(n+.18),e.onended=()=>{e.disconnect(),t.disconnect()}}};function df(){We("citySound").setAttribute("aria-pressed",String(Xi)),We("citySound").setAttribute("aria-label",Xi?"\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A":"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A"),We("citySound").style.opacity=Xi?"1":".55"}jt(We("citySound"),"click",()=>{Xi=!Xi,Lr.start(),df(),Pr()});df();jt(We("cityStart"),"click",()=>{En&&(cr=!0,We("cityIntro").hidden=!0,document.body.classList.add("city-started"),We("cityControls").hidden=!1,Lr.start(),Ir())});jt(We("cityPause"),"click",tc);jt(We("cityResume"),"click",()=>{We("cityPauseDialog").close(),Ir()});jt(We("cityPauseDialog"),"cancel",r=>{r.preventDefault(),We("cityPauseDialog").close(),Ir()});jt(We("cityRescue"),"click",()=>{lc(He),We("cityPauseDialog").close(),Ir()});jt(We("cityRestart"),"click",uf);jt(We("cityQuality"),"click",()=>{to=to==="standard"?"low":"standard",En.renderer.setPixelRatio(Math.min(devicePixelRatio,to==="low"?1:1.5)),En.renderer.shadowMap.enabled=to!=="low",En.fit(),We("cityQuality").textContent="\u0413\u0440\u0430\u0444\u0438\u043A\u0430: "+(to==="low"?"\u044D\u043A\u043E\u043D\u043E\u043C\u043D\u0430\u044F":"\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442")});jt(We("cityMapButton"),"click",()=>{!cr||We("cityPauseDialog").open||We("cityResult").open||(so(),mf(We("cityFullMap"),!0),We("cityMapDialog").showModal())});function gu(){We("cityMapDialog").close(),Ir()}jt(We("cityMapClose"),"click",gu);jt(We("cityMapDialog"),"cancel",r=>{r.preventDefault(),gu()});jt(We("cityResult"),"cancel",r=>r.preventDefault());jt(We("cityResultRestart"),"click",uf);jt(We("cityResultContinue"),"click",()=>{let r=He.failed;We("cityResult").close(),r?(He=ia(cc(He)),ro=!1,document.body.classList.remove("city-failed"),En.orbit.yaw=He.carrying?Math.PI:0,Ql=He.phase,Pr()):(He.win=!1,ro=!1),Ir(),nc()});function pf(){if(!(ji||!cr)){if(bu(He)){if(He.openVilla){He.openVilla=!1,yu();return}Lr.beep(He.carrying?660:420),ec(),Pr()}nc()}}jt(We("cityAction"),"click",pf);jt(window,"keydown",r=>{if(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","ShiftLeft","ShiftRight","KeyE","KeyR","Escape"].includes(r.code)&&r.preventDefault(),r.code==="Escape"&&!r.repeat){We("cityPauseDialog").open?(We("cityPauseDialog").close(),Ir()):We("cityMapDialog").open?gu():tc();return}if(!ji){if(r.code==="KeyE"&&!r.repeat){pf();return}if(r.code==="KeyR"&&!r.repeat){lc(He);return}oi.add(r.code)}});jt(window,"keyup",r=>oi.delete(r.code));var lr=We("cityStick");jt(lr,"pointerdown",r=>{ji||(pi.id=r.pointerId,lr.setPointerCapture(r.pointerId),ff(r),r.preventDefault())});function ff(r){if(pi.id!==r.pointerId)return;let e=lr.getBoundingClientRect(),t=e.width*.34,n=r.clientX-e.left-e.width/2,i=r.clientY-e.top-e.height/2,s=Math.max(1,Math.hypot(n,i)/t);pi.x=n/s/t,pi.y=i/s/t,lr.querySelector("i").style.transform="translate(calc(-50% + "+n/s+"px),calc(-50% + "+i/s+"px))"}jt(lr,"pointermove",ff);function vu(r){r.pointerId===pi.id&&(pi.id=null,pi.x=pi.y=0,lr.querySelector("i").style.transform="translate(-50%,-50%)")}jt(lr,"pointerup",vu);jt(lr,"pointercancel",vu);jt(lr,"lostpointercapture",vu);for(let[r,e]of[["cityGas","gas"],["cityBrake","brake"]]){let t=We(r);jt(t,"pointerdown",n=>{ji||(cs[e]=!0,t.setPointerCapture(n.pointerId),n.preventDefault())});for(let n of["pointerup","pointercancel","lostpointercapture"])jt(t,n,()=>cs[e]=!1)}jt(We("cityCanvas"),"pointerdown",r=>{ji||!cr||(Ii={id:r.pointerId,x:r.clientX,y:r.clientY},We("cityCanvas").setPointerCapture(r.pointerId))});jt(We("cityCanvas"),"pointermove",r=>{!Ii||Ii.id!==r.pointerId||(En.orbit.yaw-=(r.clientX-Ii.x)*.006,En.orbit.pitch=Math.max(-.25,Math.min(.7,En.orbit.pitch+(r.clientY-Ii.y)*.004)),Ii.x=r.clientX,Ii.y=r.clientY,hf=He.time)});for(let r of["pointerup","pointercancel","lostpointercapture"])jt(We("cityCanvas"),r,e=>{Ii?.id===e.pointerId&&(Ii=null)});jt(window,"blur",()=>{cr&&tc(),ec()});jt(document,"visibilitychange",()=>{document.hidden&&(cr&&tc(),ec(),Lr.silence())});jt(window,"resize",()=>En?.fit());jt(We("cityCanvas"),"contextmenu",r=>r.preventDefault());jt(We("cityCanvas"),"webglcontextlost",r=>{r.preventDefault(),so(),We("cityIntro").hidden=!1,We("cityLoading").textContent="\u0413\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u043F\u0440\u0435\u0440\u0432\u0430\u043D. \u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438 \u0441\u0446\u0435\u043D\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C.",We("cityStart").disabled=!1,We("cityStart").textContent="\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0433\u043E\u0440\u043E\u0434",We("cityStart").onclick=()=>location.reload()});function yu(){Pr(),so();let r=new URL("./?startapp=profile&cityVilla=1",location.href);try{let e=new URL(Rr?.returnUrl||r.href);e.origin===location.origin&&!e.pathname.endsWith("city-play.html")&&(r=e)}catch{}try{sessionStorage.setItem("poker21-city:restore-villa","1")}catch{}location.assign(r.href)}jt(We("cityExit"),"click",r=>{r.preventDefault(),yu()});jt(document.querySelector("[data-city-villa-return]"),"click",r=>{r.preventDefault(),yu()});jt(window,"pagehide",()=>{Pr(),z0()});window.addEventListener("pageshow",r=>{r.persisted&&location.reload()});function O0(){let r=(oi.has("KeyW")||oi.has("ArrowUp")?1:0)-(oi.has("KeyS")||oi.has("ArrowDown")?1:0)-pi.y,e=(oi.has("KeyD")||oi.has("ArrowRight")?1:0)-(oi.has("KeyA")||oi.has("ArrowLeft")?1:0)+pi.x,t=Math.max(-1,Math.min(1,r+(He.driving&&cs.gas?1:0))),n=Math.max(-1,Math.min(1,e));He.steer=n;let i=En.orbit.yaw;return{forward:t,turn:n,brake:cs.brake||oi.has("Space"),x:Math.sin(i)*t-Math.cos(i)*n,z:Math.cos(i)*t+Math.sin(i)*n,run:cs.gas||oi.has("ShiftLeft")||oi.has("ShiftRight")}}var of="";function nc(){let r=ra(He),e=uo(He),t=r.target?Math.round(Math.hypot(e.x-r.target.x,e.z-r.target.z)):0,n=[r.title,r.detail,t,He.driving,Math.round(He.health),Math.round(Math.abs(He.car.speed)),He.heat,Math.floor(He.escape),po(He),Math.ceil(He.noticeTime)].join("|");if(n===of)return;of=n,We("cityObjective").textContent=r.title,We("cityObjectiveDetail").textContent=r.detail,We("cityDistrict").textContent=e.x>80&&e.z>15&&e.z<65?"\u0412\u0410\u0428\u0410 \u0412\u0418\u041B\u041B\u0410 / \u0414\u041E\u041C \u0423 \u041E\u041A\u0415\u0410\u041D\u0410":e.x>59&&e.z<0?"\u0412\u041E\u0421\u0422\u041E\u0427\u041D\u042B\u0419 \u041F\u041E\u0420\u0422 / \u041D\u0410\u0411\u0415\u0420\u0415\u0416\u041D\u0410\u042F":e.x>59?"\u041D\u0410\u0411\u0415\u0420\u0415\u0416\u041D\u0410\u042F / POKER21":e.z>20?"\u042E\u0416\u041D\u042B\u0419 \u041A\u0412\u0410\u0420\u0422\u0410\u041B / \u041F\u0420\u041E\u041C\u0415\u041D\u0410\u0414":"TWO ACES / \u041A\u041B\u0423\u0411\u041D\u042B\u0419 \u041A\u0412\u0410\u0420\u0422\u0410\u041B",We("cityDistance").textContent=r.target?"\u25C6 "+t+" \u043C \u0434\u043E \u0446\u0435\u043B\u0438":"",We("cityHeat").hidden=!He.heat,We("cityHeat").querySelector("progress").value=He.escape;let i=We("cityRadio");i.classList.toggle("is-hidden",He.noticeTime<=0),i.querySelector("p").textContent=He.notice,i.style.bottom=He.driving?"350px":"";let s=document.querySelector(".city-drive-info");s.hidden=!He.driving,We("citySpeed").textContent=Math.round(Math.abs(He.car.speed)*3.6),We("cityCondition").style.width=He.health+"%",We("cityCondition").style.background=He.health<35?"#ed9a74":"#d3d9ad",We("cityConditionText").textContent="\u041A\u0423\u0417\u041E\u0412 "+Math.round(He.health)+"%";let a=po(He),o=We("cityAction");if(o.classList.toggle("is-ready",!!a),o.disabled=!a||Math.abs(He.driving?He.car.speed:0)>2,o.querySelector("span").textContent=a?a.includes("\u0412\u044B\u0439\u0442\u0438")?"\u0412\u044B\u0439\u0442\u0438":a.includes("\u0440\u0443\u043B\u044C")?"\u0412 \u043C\u0430\u0448\u0438\u043D\u0443":a.includes("\u0420\u043E\u043C\u043E\u0439")?"\u0420\u043E\u043C\u0430":a.includes("\u0432\u0438\u043B\u043B\u0443")?"\u0414\u043E\u043C\u043E\u0439":a.includes("\u0412\u0435\u0440\u043D\u0443\u0442\u044C")?"\u041F\u0435\u0440\u0435\u0434\u0430\u0442\u044C":a.includes("\u043A\u0435\u0439\u0441")?"\u041A\u0435\u0439\u0441":"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435":"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435",o.setAttribute("aria-label",a||"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E"),We("cityGas").querySelector("span").textContent=He.driving?"\u0413\u0430\u0437":"\u0411\u0435\u0436\u0430\u0442\u044C",We("cityBrake").hidden=!He.driving,He.phase!==Ql&&(Ql=He.phase,Pr()),(He.win||He.failed)&&!ro){ro=!0,so();let l=He.win;We("cityResultBadge").textContent=l?"\u0414\u041E\u0421\u0422\u0410\u0412\u041A\u0410 / \u0412\u042B\u041F\u041E\u041B\u041D\u0415\u041D\u041E":"\u0414\u041E\u0421\u0422\u0410\u0412\u041A\u0410 / \u0415\u0429\u0401 \u041F\u041E\u041F\u042B\u0422\u041A\u0410",We("cityResultTitle").textContent=l?"\u0412\u0441\u0435 \u0441\u0432\u043E\u0438 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435.":"\u0420\u043E\u043C\u0430 \u0443\u0436\u0435 \u0432\u044B\u0435\u0437\u0436\u0430\u0435\u0442.";let c=Math.floor(He.elapsed);l&&(hs.best=Math.min(hs.best||1/0,c),Pr()),We("cityResultText").textContent=l?"\u041A\u0435\u0439\u0441 \u0441 \u0431\u0438\u043B\u0435\u0442\u0430\u043C\u0438 \u0432\u0435\u0440\u043D\u0443\u043B\u0441\u044F \u0432 TWO ACES. \u0412\u0440\u0435\u043C\u044F: "+Math.floor(c/60)+" \u043C\u0438\u043D "+c%60+" \u0441. \u041C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0432 \u0433\u043E\u0440\u043E\u0434\u0435 \u0438 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u043F\u043E\u043A\u0430\u0442\u0430\u0442\u044C\u0441\u044F.":"\u041C\u0430\u0448\u0438\u043D\u0430 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0432\u0435\u0440\u043D\u0451\u0442 \u0442\u0435\u0431\u044F \u043A \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u043C\u0443 \u044D\u0442\u0430\u043F\u0443 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0441 \u0446\u0435\u043B\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u043E\u0439.",We("cityResultContinue").textContent=l?"\u041E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0432 \u0433\u043E\u0440\u043E\u0434\u0435":"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443",document.body.classList.toggle("city-failed",!l),We("cityResult").showModal(),Lr.beep(l?880:180)}}function mf(r,e=!1){let t=r.getContext("2d"),n=r.width,i=n/236,s=c=>(c+105)*i,a=c=>(c+118)*i;t.fillStyle="#153c43",t.fillRect(0,0,n,n),t.fillStyle="#6b8275",t.fillRect(s(-100),a(-110),218*i,201*i),t.fillStyle="#819085";for(let c of Ui)t.fillRect(s(c-7),a(-110),14*i,201*i);for(let c of Yi)t.fillRect(s(-100),a(c-7),197*i,14*i);t.fillStyle="#d6c8ac";for(let c of Or)t.fillRect(s(c.x-c.w/2),a(c.z-c.d/2),c.w*i,c.d*i);for(let[c,h]of[[_u,"#315d52"],[Jn,"#4d686c"],[fs,"#e3c992"]])t.fillStyle=h,t.fillRect(s(c.x-c.w/2),a(c.z-c.d/2),c.w*i,c.d*i);let o=ra(He),l=uo(He);if(o.target){let c=ho(l,o.target);t.strokeStyle="#ffda8d",t.lineWidth=e?3:2,t.setLineDash(e?[5,4]:[3,3]),t.beginPath(),t.moveTo(s(l.x),a(l.z));for(let h of c)t.lineTo(s(h.x),a(h.z));t.lineTo(s(o.target.x),a(o.target.z)),t.stroke(),t.setLineDash([]),t.fillStyle="#ffe6a4",t.save(),t.translate(s(o.target.x),a(o.target.z)),t.rotate(Math.PI/4),t.fillRect(-4,-4,8,8),t.restore()}if(t.fillStyle="#a8e8d5",t.beginPath(),t.arc(s(He.car.x),a(He.car.z),e?5:3.5,0,Math.PI*2),t.fill(),He.heat&&(t.fillStyle="#f79778",t.font="bold "+(e?20:13)+"px Arial",t.fillText("\u2605",s(He.police.x)-5,a(He.police.z)+5)),t.save(),t.translate(s(l.x),a(l.z)),t.rotate(-l.yaw),t.fillStyle="#fff2cd",t.strokeStyle="#214348",t.lineWidth=2,t.beginPath(),t.moveTo(0,e?9:6),t.lineTo(e?-6:-5,e?-6:-4),t.lineTo(e?6:5,e?-6:-4),t.closePath(),t.fill(),t.stroke(),t.restore(),t.font="bold "+(e?15:10)+"px Arial",t.fillStyle="#eff0d7",t.textAlign="center",t.fillText("N \u2191",n-20,17),e)for(let[c,h,u]of[["\u0412\u0418\u041B\u041B\u0410",98,14],["TWO ACES",-24,-38],["\u041F\u041E\u0420\u0422",84,-90],["\u041D\u0410\u0411\u0415\u0420\u0415\u0416\u041D\u0410\u042F",85,54],["\u041F\u0420\u041E\u041C\u0415\u041D\u0410\u0414",-26,59]])t.font="bold 11px Arial",t.fillStyle="#17383c",t.fillText(c,s(h),a(u))}function gf(r){if($l)return;let e=no?Math.min(.05,(r-no)/1e3):1/60;if(no=r,!ji){for(io+=e;io>=1/60&&(Tu(He,O0(),1/60),io-=1/60,!(He.failed||He.win)););if(He.driving&&!Ii&&He.time-hf>2){let t=Math.atan2(Math.sin(He.car.yaw-En.orbit.yaw),Math.cos(He.car.yaw-En.orbit.yaw));En.orbit.yaw+=t*(1-Math.exp(-e*2))}}En.render(He,e,ra(He),!cr),nc(),F0++%4===0&&mf(We("cityMinimap")),Lr.update(),af>He.health&&(document.body.classList.add("city-result-effect"),setTimeout(()=>document.body.classList.remove("city-result-effect"),250)),af=He.health,mu=requestAnimationFrame(gf)}function z0(){$l||($l=!0,cancelAnimationFrame(mu),cf.forEach(r=>r()),En?.dispose(),Lr.context?.close().catch(()=>{}))}window.PokerCity={inspect(){return{player:{...He.player},car:{...He.car},phase:He.phase,carrying:He.carrying,driving:He.driving,paused:ji,health:He.health,heat:He.heat,escape:He.escape,elapsed:He.elapsed,completed:He.completed,objective:ra(He),prompt:po(He),metrics:En?.metrics,garage:Rr?{source:Rr.source,owner:Rr.owner,look:{...Rr.look}}:null}}};(async()=>{try{if(Rr=await Su(),En=await sf(We("cityCanvas"),r=>We("cityLoading").textContent=r,Rr),$l){En.dispose();return}We("cityLoading").textContent=(Rr.owner?"\u0412\u0430\u0448 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u041C\u0430\u043D\u043A\u0438Car Two ACES":"\u041A\u043B\u0443\u0431\u043D\u044B\u0439 \u041C\u0430\u043D\u043A\u0438Car \xB7 \u0433\u043E\u0441\u0442\u0435\u0432\u043E\u0439 \u0437\u0430\u0435\u0437\u0434")+" \xB7 WASD \u0438\u043B\u0438 \u0434\u0436\u043E\u0439\u0441\u0442\u0438\u043A",We("cityStart").textContent=hs.carrying?"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443":"\u041D\u0430\u0447\u0430\u0442\u044C \u0441 \u0432\u0438\u043B\u043B\u044B \u2192",We("cityStart").disabled=!1,mu=requestAnimationFrame(gf)}catch(r){console.error("City failed to load",r),We("cityLoading").textContent=r.userMessage||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C 3D-\u0441\u0446\u0435\u043D\u0443. \u041F\u0440\u043E\u0432\u0435\u0440\u044C \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 WebGL \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.",We("cityStart").textContent="\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0443",We("cityStart").disabled=!1,We("cityStart").onclick=()=>location.reload()}})();})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
