const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
async function create(look={}){
 const T=await import('../vendor/three/three.module.min.js'),{buildSculptedCharacter}=await import('../scripts/garage-3d/character-atelier.mjs');
 const saved={fetch:global.fetch,document:global.document,Image:global.Image,load:T.TextureLoader.prototype.loadAsync};
 global.fetch=async url=>{const b=fs.readFileSync(String(url).replace(/^\.\//,''));return {ok:true,arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)};};
 T.TextureLoader.prototype.loadAsync=async()=>new T.DataTexture(new Uint8Array([128,128,128,255]),1,1);
 const ctx={drawImage(){},clearRect(){},fillRect(){},fillText(){},beginPath(){},ellipse(){},arc(){},fill(){},putImageData(){},getImageData(){return {data:new Uint8ClampedArray(1024*1536*4)};}};
 global.document={createElement(){return {width:1024,height:1536,getContext:()=>ctx};}};global.Image=class{async decode(){}};
 const G={loadWardrobe:async()=>{},renderCharacter:()=>({width:1024,height:1536}),item:kind=>({color:{suit:'#171a1c',pants:'#b8a785',shoes:'#a7312d',helmet:'#bbc4c9',hat:'#273d5c',necklace:'#bda15c'}[kind]||'#b8a785'}),wardrobeSubcategory:(_,id)=>/Shorts$/.test(id)?'shorts':'all'};
 const values={helmet:'none',visor:'open',hat:'none',hair:'hairNatural',glasses:'none',suit:'classic',pants:'sandShorts',shoes:'ruby',body:'bodyNormal',watch:'none',ring:'none',necklace:'none',...look},listeners={},frames=[],state={};let scene;
 class Renderer{constructor(){this.domElement={setAttribute(){},remove(){}};}setPixelRatio(){}setSize(){}render(v){scene=v;}dispose(){}forceContextLoss(){}}
 const host={isConnected:true,clientWidth:390,clientHeight:844,dataset:{},append(){},setPointerCapture(){},addEventListener(k,v){listeners[k]=v;},removeEventListener(k){delete listeners[k];}};
 const scope={buildSculptedCharacter,T:{...T,WebGLRenderer:Renderer},window:{PokerGarage:G,matchMedia:()=>({matches:false})},devicePixelRatio:1,ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame(fn){frames.push(fn);return frames.length;},cancelAnimationFrame(){}};
 try{const source=fs.readFileSync('scripts/garage-3d/character-sculpted-view.mjs','utf8').replace(/^import .*\n/gm,'').replace('export async function','async function');vm.runInNewContext(source+'\nthis.factory=createSculptedCharacter;',scope);const viewer=await scope.factory(host,values,state);const meshes=[];scene.traverse(o=>{if(o.isMesh)meshes.push(o);});return {viewer,meshes,host,listeners,frames,state,scene};}finally{global.fetch=saved.fetch;global.document=saved.document;global.Image=saved.Image;T.TextureLoader.prototype.loadAsync=saved.load;}
}
const named=(v,name)=>v.meshes.find(m=>m.name===name);
test('the production viewer uses independent sculpted anatomy and physically lit surfaces',async()=>{
 const v=await create();for(const name of ['sculpt-cranium','sculpt-facial-mask','sculpt-left-hand','sculpt-right-hand','shirt-body','pants-body']){const m=named(v,name);assert.ok(m,name);assert.ok(m.material.isMeshStandardMaterial);assert.ok(m.geometry.getAttribute('normal'));assert.ok(m.geometry.getAttribute('skinWeight'));}
 assert.ok(named(v,'sculpt-cranium').material.map,'real fur albedo');assert.ok(named(v,'sculpt-facial-mask').material.map,'skin albedo');assert.equal(v.meshes.filter(m=>m.name==='shirt-body').length,1);assert.equal(v.meshes.filter(m=>m.name==='pants-body').length,1);v.viewer.dispose();
});
test('sculpted surfaces have finite unit normals, valid topology and normalized skeleton weights',async()=>{
 const v=await create();for(const mesh of v.meshes){const g=mesh.geometry,p=g.getAttribute('position'),n=g.getAttribute('normal');assert.ok([...p.array].every(Number.isFinite),mesh.name);assert.ok([...n.array].every(Number.isFinite),mesh.name);if(g.index)assert.ok([...g.index.array].every(i=>i>=0&&i<p.count),mesh.name);if(mesh.isSkinnedMesh){const w=g.getAttribute('skinWeight');for(let i=0;i<w.count;i++)assert.ok(Math.abs(w.getX(i)+w.getY(i)+w.getZ(i)+w.getW(i)-1)<1e-5);}}
 v.viewer.dispose();
});
test('the sculpted hand is a closed joined mesh rather than separate palm and finger capsules',async()=>{
 const v=await create();for(const name of ['sculpt-left-hand','sculpt-right-hand']){const g=named(v,name).geometry,edges=new Map();for(let i=0;i<g.index.count;i+=3){const tri=[g.index.getX(i),g.index.getX(i+1),g.index.getX(i+2)];for(let k=0;k<3;k++){const a=tri[k],b=tri[(k+1)%3],key=Math.min(a,b)+':'+Math.max(a,b);edges.set(key,(edges.get(key)||0)+1);}}assert.ok([...edges.values()].every(n=>n===2),name+' must have no open seams');}v.viewer.dispose();
});
test('hidden limbs cannot poke through shorts or full-length clothes',async()=>{
 const shorts=await create(),long=await create({pants:'classic'});for(const v of [shorts,long])for(const m of v.meshes.filter(m=>m.name.startsWith('fur-leg-'))){m.geometry.computeBoundingBox();assert.ok(m.geometry.boundingBox.max.y<=(v===shorts?-.65:-1.51));}assert.equal(long.meshes.filter(m=>m.name==='individual-fur-strands'&&m.geometry.getAttribute('surface').getX(0)===4).length,0);shorts.viewer.dispose();long.viewer.dispose();
});
test('drag, keyboard orbit and wrist inspection preserve the users camera state',async()=>{
 const v=await create();v.listeners.pointerdown({pointerId:1,clientX:10,clientY:10,preventDefault(){}});v.listeners.pointermove({pointerId:1,clientX:110,clientY:30});v.frames.at(-1)(100);assert.ok(Math.abs(v.state.yaw-1.2)<1e-8);assert.ok(Math.abs(v.state.pitch-.12)<1e-8);v.listeners.pointerup();const orbit={...v.state};v.viewer.setFocus('watch');v.frames.at(-1)(150);assert.equal(v.state.yaw,0);v.viewer.setFocus('full');assert.equal(v.state.yaw,orbit.yaw);assert.equal(v.state.pitch,orbit.pitch);v.viewer.dispose();assert.equal(Object.keys(v.listeners).length,0);
});
test('all body choices deform actual garment volume while preserving shoe registration',async()=>{
 const normal=await create(),beast=await create({body:'bodyBeast'});for(const name of ['shirt-body','pants-body']){const a=named(normal,name),b=named(beast,name);a.geometry.computeBoundingBox();b.geometry.computeBoundingBox();assert.ok(b.geometry.boundingBox.max.x-b.geometry.boundingBox.min.x>a.geometry.boundingBox.max.x-a.geometry.boundingBox.min.x);}
 assert.deepEqual(named(normal,'leather-sneaker').geometry.getAttribute('position').array,named(beast,'leather-sneaker').geometry.getAttribute('position').array);normal.viewer.dispose();beast.viewer.dispose();
});
test('opening the hinged visor reveals anatomy, closing it removes exposed face and ears',async()=>{
 const closed=await create({helmet:'formulaCrimson',visor:'closed'}),open=await create({helmet:'formulaCrimson',visor:'open'});assert.ok(!named(closed,'sculpt-facial-mask'));assert.ok(named(open,'sculpt-facial-mask'));for(const v of [open,closed]){assert.ok(named(v,'helmet-shell'));assert.ok(named(v,'hinged-helmet-visor'));assert.ok(!v.meshes.some(m=>m.name.startsWith('ear-')));}assert.notDeepEqual(named(closed,'hinged-helmet-visor').geometry.getAttribute('position').array,named(open,'hinged-helmet-visor').geometry.getAttribute('position').array);closed.viewer.dispose();open.viewer.dispose();
});
test('all owned anatomy buffers and textures are released on removal',async()=>{
 const v=await create();let geometry=0,texture=0;named(v,'sculpt-cranium').geometry.addEventListener('dispose',()=>geometry++);named(v,'sculpt-cranium').material.map.addEventListener('dispose',()=>texture++);v.host.isConnected=false;v.frames.at(-1)(200);assert.equal(geometry,1);assert.equal(texture,1);assert.equal(Object.keys(v.listeners).length,0);v.viewer.dispose();assert.equal(geometry,1);
});
test('the mobile anatomy and active garments stay inside their geometry download budget',()=>{
 let bytes=0;for(const name of ['head','face','hand-left','hand-right','shirt-tee','shorts']){const b=fs.readFileSync('assets/player-hall/character-3d/sculpt/'+name+'.bin'),size=b.readUInt32LE(0),meta=JSON.parse(b.subarray(4,4+size).toString());assert.ok(meta.error<.003);assert.ok(meta.vertices<15000);bytes+=b.length;}assert.ok(bytes<2500000);
 const copy=fs.readFileSync('scripts/copy-to-public.js','utf8');for(const name of ['head','face','hand-left','hand-right','shirt-tee','shirt-jacket','shirt-tank','shorts','pants','helmet-shell'])assert.ok(copy.includes("'"+name+"'"));
});
test('every headwear family is real head-bound geometry and helmets suppress hats',async()=>{
 for(const hat of ['pokerClassicCap','pokerFlatCap','strawSun','duckBucket','propellerCap']){const v=await create({hat}),group=v.scene.getObjectByName('headwear:'+hat);assert.ok(group,hat);assert.equal(group.parent.name,'head');assert.ok(group.children.some(m=>m.isMesh&&m.geometry.getAttribute('position').count>100));v.viewer.dispose();}
 const helmet=await create({hat:'strawSun',helmet:'formulaCrimson',visor:'closed'});assert.ok(!helmet.scene.getObjectByName('headwear:strawSun'));helmet.viewer.dispose();
});
test('boots and slip-ons have their own uppers and fastening',async()=>{const sneaker=await create({shoes:'ivoryLow'}),boot=await create({shoes:'combatBlack'}),loafer=await create({shoes:'brownLoafers'});for(const v of [sneaker,boot])named(v,'leather-sneaker').geometry.computeBoundingBox();assert.ok(named(boot,'leather-sneaker').geometry.boundingBox.max.y>named(sneaker,'leather-sneaker').geometry.boundingBox.max.y+.1);assert.ok(named(sneaker,'woven-lace'));assert.ok(!named(loafer,'woven-lace'));assert.ok(named(loafer,'slip-on-vamp-band'));for(const v of [sneaker,boot,loafer])v.viewer.dispose();});
test('previously missing pendant types now have visible head-independent jewelry',async()=>{for(const necklace of ['spadeDiamond','crownPendant']){const v=await create({necklace});assert.ok(named(v,'necklace-pendant:'+necklace));assert.ok(named(v,'interlocked-necklace-links'));v.viewer.dispose();}});
test('slim torso blends into sleeves without a discontinuity at the old arm boundary',async()=>{const normal=await create({body:'bodyNormal'}),slim=await create({body:'bodySlim'}),a=named(normal,'shirt-body').geometry,b=named(slim,'shirt-body').geometry,p=a.getAttribute('position'),q=b.getAttribute('position');let checked=0;for(let i=0;i<a.index.count;i+=3){const tri=[a.index.getX(i),a.index.getX(i+1),a.index.getX(i+2)];for(let j=0;j<3;j++){const u=tri[j],v=tri[(j+1)%3];if(Math.abs(p.getX(u))<.41||Math.abs(p.getX(u))>.47)continue;const old=Math.abs(p.getX(u)-p.getX(v));if(old<.03){assert.ok(Math.abs(q.getX(u)-q.getX(v))<.09);checked++;}}}assert.ok(checked>20);normal.viewer.dispose();slim.viewer.dispose();});
