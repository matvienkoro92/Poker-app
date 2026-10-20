import {VILLA,villaPoint} from './world.mjs';
// The same room arrangement as coastal-house-map-v6, rotated towards the coast.
export function buildVilla({box,cylinder,batch,label}){
 const B=(c,x,y,z,w,h,d)=>{const p=villaPoint(x,z);box(c,p.x,y,p.z,d,h,w);};
 const C=(c,x,y,z,r,h)=>{const p=villaPoint(x,z);cylinder(c,p.x,y,p.z,r,h);};
 const sign=(t,x,y,z,w,h=1)=>{const p=villaPoint(x,z);return label(t,p.x,y,p.z,w,h,-Math.PI/2,'#193a35','#e7cc8a');};
 const plant=(x,z)=>{C('#bca77b',x,.5,z,.65,1);for(let i=0;i<7;i++){const a=i*Math.PI*2/7,p=villaPoint(x+Math.sin(a)*.55,z+Math.cos(a)*.55);batch('ball','#517b4b',p.x,1.3+Math.sin(i)*.25,p.z,.4,.8,.4,i,0);}};
 B('#d7c7aa',0,-.12,0,44,.24,32);B('#756554',0,-.07,-18.2,44,.14,4.4);
 // Exterior with a central entrance and a real opening for the two-bay garage.
 for(const [x,z,w,d]of [[-22,0,.55,32],[22,0,.55,32],[-13,-16,18,.55],[13,-16,18,.55],[-12.5,16,19,.55],[5,16,4,.55],[21,16,2,.55]]){B('#273b39',x,2.7,z,w,5.4,d);B('#c2a262',x,5.5,z,w+.08,.2,d+.08);}
 for(const [x,z,w,d]of [[6,4,.35,6],[6,14,.35,4],[-6,2.5,.35,5],[-6,14,.35,4],[-4,0,4,.35],[4,0,4,.35],[-18,1,8,.35],[-9,1,2,.35],[9.5,1,3,.35],[19.5,1,5,.35]]){B('#38514a',x,1.5,z,w,3,d);B('#b69a63',x,3.1,z,w+.08,.13,d+.08);}
 // Hall, award shelves and the recognizable red leather chair.
 B('#4c3330',0,.015,8,10,.025,14);B('#7e3d32',0,.035,8,9.7,.025,13.7);B('#ad9a68',0,.05,8,9.3,.015,13.3);B('#754134',0,.06,8,9.15,.015,13.15);
 B('#783b33',0,.65,6,3,1.3,3);B('#9e5141',0,1.5,4.7,3.1,2.1,.5);for(const x of [-1.35,1.35])B('#95503f',x,1,6,.4,1.4,3.1);C('#443830',0,.55,9,.08,1.1);C('#3a4a41',0,1.12,9,1.1,.12);
 B('#253d38',0,2.5,.3,9,3,.3);for(const x of [-3,-1.5,0,1.5,3]){C('#d3b271',x,2.3,.65,.22,.6);C('#d3b271',x,2.65,.65,.38,.18);B('#e9bb67',x,3.8,.8,.6,.08,.3);}
 sign('TWO ACES · ДОМ У ОКЕАНА',0,4.45,.6,9,1.15);
 // Poker room to the left of the entrance.
 B('#784535',-14,.02,9,13,.03,12);B('#b29b66',-14,.04,9,12.5,.02,11.5);B('#643f35',-14,.055,9,12.25,.02,11.25);
 C('#514331',-14,.55,9,.4,1.1);C('#c2a566',-14,1.2,9,4.2,.2);C('#1d654e',-14,1.32,9,4,.14);for(let i=0;i<6;i++){const a=i*Math.PI/3,x=-14+Math.sin(a)*5,z=9+Math.cos(a)*5;B('#7d3d32',x,.5,z,1.3,1,1.4);B('#a45343',x,1.2,z+.5,1.4,1.5,.25);}for(let i=0;i<3;i++){B('#eee2c4',-15+i*.7,1.41,9,.5,.02,.8);C(['#bf6852','#cfb672','#4f8a80'][i],-14+i*.6,1.47,7,.21,.22);}
 // Living room, kitchen and bar facing the terrace.
 B('#bfb59b',0,.5,-8,7,1,3);B('#e2d5b5',0,1,-9.5,7,1.8,.6);for(const x of [-3.5,3.5])B('#e2d5b5',x,.9,-8,.6,1.2,3);C('#534737',0,.6,-4.7,1.55,.1);C('#c4a467',0,.67,-4.7,1.5,.06);
 B('#a4906a',-2,1.05,-14,9,2.1,1.7);B('#38473e',-2,2.15,-14,9.2,.12,1.85);for(const x of [-5,-2,1])C('#a45343',x,.65,-11.6,.5,1.3);
 // Garage: open drive-through door, two gold parking bays, shelves and spare wheels.
 B('#4e5650',14,.01,8.5,15.5,.02,14.5);for(const x of [10,18]){for(const edge of [-3.2,3.2])B('#c5aa6d',x+edge,.035,9,.07,.025,12.5);B('#c5aa6d',x,.035,2.8,6.5,.025,.08);}
 sign('ГАРАЖ · МАНКИCAR',13,5.75,16.35,12,1.2);sign('ВИЛЛА TWO ACES',-10,4.1,16.35,12,1.3);
 B('#574e3b',14,1.4,1.8,13,2.8,.8);for(const x of [9,12,15,18]){C('#384438',x,2.9,2.2,.35,.2);C('#d1ac65',x,3.12,2.2,.24,.25);B('#b3975d',x,1.1,2.3,.45,.65,.5);}
 // Lounge and billiards behind the garage, gym and sauna on the other side.
 B('#786747',14,.03,-7,13,.03,13);B('#38534a',14,1.25,-7,8,.3,4);B('#d1b471',14,1.13,-7,8.35,.12,4.35);for(const x of [10.7,17.3])for(const z of [-8.2,-5.8])B('#5a4833',x,.55,z,.3,1.1,.3);
 sign('СВОИ · БИЛЬЯРД',14,4,-15.6,11,1.1);B('#745c3d',-18,1.35,-8,6,2.7,9);sign('БАНЯ / КРОССФИТ',-14,4,-15.6,12,1.1);for(const x of [-10,-7]){B('#3a4240',x,.15,-8,1,.3,5);B('#444f4c',x,.55,-8,1,.35,2);}
 // Ocean-facing terrace, pool and hot tub.
 B('#e4d7b6',8,.03,-18,15,.09,4.2);B('#408e92',8,.09,-18,14,.07,3.35);for(const x of [1,15])B('#e7d5ab',x,.17,-18,.3,.16,4.2);B('#e7d5ab',8,.17,-16.1,14,.16,.3);B('#e7d5ab',8,.17,-19.9,14,.16,.3);
 C('#d8ccac',-16,.15,-18,2.1,.3);C('#3e9299',-16,.32,-18,1.75,.04);B('#8c7150',-6,.7,-18,6,1.4,2.1);for(const x of [-9.6,-2.4])B('#bca783',x,.5,-18,.9,1,1.7);
 for(const x of [-21,21])for(const z of [-14,13])plant(x,z);for(const x of [-5,5])plant(x,14);
 // Short driveway to the coastal road, and the villa's own pier and yacht.
 B('#c2b398',12,-.02,18,16,.04,4);for(const x of [4,21]){B('#52634d',x,.5,18,.5,1,4);C('#eac67e',x,1.1,18,.15,.25);}
 box('#8f7856',133,.12,57,22,.28,2.8);for(let x=124;x<145;x+=2.5)box('#69543d',x,-.9,57,.3,2.1,2.8);
 batch('ball','#d8ded2',149,.6,57,3,.9,8.5);box('#f0ebd8',149,1.35,56,4.6,.6,11);box('#b5c3bd',149,2.1,55,3.6,1.2,4.5);box('#3f666c',149,2.6,56.3,3.8,.7,.12);box('#ece4ca',149,3.05,55,4.2,.18,5);cylinder('#c7cbbb',149,4.1,54.5,.05,2.1);
 return VILLA;
}
