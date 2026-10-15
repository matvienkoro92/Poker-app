const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
async function create(look={}){
 const listeners={},frames=[],meshes=[],state={};
 const actual=await import('../vendor/three/three.module.min.js');
 const {createCharacterRig}=await import('../scripts/garage-3d/character-rig.mjs');
 const {characterShape}=await import('../scripts/garage-3d/character-shape.mjs');
 const pixels=new Uint8ClampedArray(1024*1536*4).fill(255),draws=[];
 const context={drawImage(...v){draws.push(v);},getImageData(){return {data:pixels};}};
 const host={isConnected:true,clientWidth:300,clientHeight:600,dataset:{},append(){},setPointerCapture(){},addEventListener(k,v){listeners[k]=v;},removeEventListener(k){delete listeners[k];}};
 class Renderer{constructor(){this.domElement={setAttribute(){},remove(){}};}setPixelRatio(){}setSize(){}render(scene){meshes.length=0;scene.traverse(o=>{if(o.isSkinnedMesh&&o.geometry.getAttribute('surface')){o.geometry.indices=Array.from(o.geometry.index.array);meshes.push(o);}});}dispose(){}forceContextLoss(){}}
 const scope={createCharacterRig,characterShape,addCharacterHair:()=>({dispose(){}}),addCharacterTailoring:()=>({dispose(){}}),T:{...actual,WebGLRenderer:Renderer},Image:class{async decode(){}},document:{createElement(){return {getContext(){return context;}};}},window:{PokerGarage:{loadWardrobe:async()=>{},loadHelmet:()=>({naturalWidth:500}),renderCharacter:()=>({width:1024,height:1600}),item:()=>({color:'#123456'}),wardrobeSubcategory:(_,v)=>v==='sandShorts'?'shorts':'all'}},devicePixelRatio:1,ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame(fn){frames.push(fn);return frames.length;},cancelAnimationFrame(){}};
 let source=fs.readFileSync('scripts/garage-3d/character-reconstruction.mjs','utf8').replace(/^import .*\n/gm,'').replace('export async function','async function');
 vm.runInNewContext(source+'\nthis.factory=createCharacterStudy;',scope);
 const viewer=await scope.factory(host,{helmet:'none',...look},state);
 return {viewer,host,state,listeners,frames,meshes,draws};
}
test('volumetric mesh rotates fully with pointer and preserves its orbit',async()=>{
 const v=await create();assert.ok(v.meshes.length>20);assert.ok(v.meshes[0].geometry.attributes.position.array.some((_,i,a)=>i%3===2&&a[i]>.1));
 v.listeners.pointerdown({pointerId:1,clientX:0,clientY:0,preventDefault(){}});
 v.listeners.pointermove({pointerId:1,clientX:600,clientY:30});v.frames.at(-1)(20);
 assert.ok(v.state.yaw>Math.PI*2);assert.equal(v.state.pitch,.18);v.viewer.dispose();assert.equal(Object.keys(v.listeners).length,0);
});
test('headroom keeps portrait body registration and selected shorts narrow calves',async()=>{
 const long=await create(),short=await create({pants:'sandShorts'});
 assert.equal(long.draws[0][2],-64);
 assert.equal(short.meshes[0].material.uniforms.shorts.value,1);
 assert.notDeepEqual(short.meshes.filter(m=>m.geometry.attributes.surface.array[0]===4).at(-1).geometry.attributes.position.array,long.meshes.filter(m=>m.geometry.attributes.surface.array[0]===4).at(-1).geometry.attributes.position.array);
 long.viewer.dispose();short.viewer.dispose();
});
test('detached viewer releases its pointer listeners',async()=>{const v=await create();v.host.isConnected=false;v.frames.at(-1)(20);assert.equal(Object.keys(v.listeners).length,0);});

test('watch close-up faces the wrist and restores the previous orbit on exit',async()=>{
 const v=await create();v.viewer.setYaw(1.3);v.frames.at(-1)(20);v.viewer.setFocus('watch');v.frames.at(-1)(40);assert.equal(v.host.dataset.focus,'watch');assert.equal(v.state.yaw,0);assert.equal(v.state.focusOrbit.yaw,1.3);v.viewer.setFocus('full');assert.equal(v.state.yaw,1.3);assert.equal(v.state.focusOrbit,undefined);v.viewer.dispose();
});

test('helmet replaces exposed ears with a closed head volume; hands have their own UV material region',async()=>{const bare=await create(),helmet=await create({helmet:'silver'});assert.equal(helmet.meshes.length,bare.meshes.length-2);const head=helmet.meshes.find(m=>m.geometry.attributes.surface.array[0]===6);assert.equal(head.material.uniforms.helmetOn.value,1);const hands=helmet.meshes.filter(m=>m.geometry.attributes.surface.array[0]===3);assert.equal(hands.length,12);assert.ok(hands.every(m=>m.geometry.attributes.bodyUv.itemSize===2));bare.viewer.dispose();helmet.viewer.dispose();});

test('idle animation advances but stops during wrist inspection and drag',async()=>{const v=await create(),uniforms=v.meshes[0].material.uniforms;v.frames.at(-1)(1000);assert.equal(uniforms.idleTime.value,1);assert.equal(uniforms.idleStrength.value,1);v.viewer.setFocus('watch');v.frames.at(-1)(1500);assert.equal(uniforms.idleStrength.value,0);v.viewer.setFocus('full');v.listeners.pointerdown({pointerId:1,clientX:0,clientY:0,preventDefault(){}});v.frames.at(-1)(2000);assert.equal(uniforms.idleStrength.value,0);v.viewer.dispose();});

test('each body segment has finite geometry and closed end caps',async()=>{const v=await create();for(const mesh of v.meshes){const geo=mesh.geometry,n=geo.attributes.position.array.length/3;assert.ok(geo.attributes.position.array.every(Number.isFinite));assert.ok(geo.indices.includes(n-1));assert.ok(geo.indices.includes(n-2));assert.ok(geo.indices.every(i=>i>=0&&i<n));assert.equal(geo.attributes.uv.array.length,n*2);}v.viewer.dispose();});


test('all anatomical segments share a skeleton with normalized joint weights',async()=>{const v=await create();const skeleton=v.meshes[0].skeleton;assert.ok(skeleton.bones.length>=19);for(const mesh of v.meshes){assert.ok(mesh.isSkinnedMesh);assert.equal(mesh.skeleton,skeleton);const weights=mesh.geometry.getAttribute('skinWeight');for(let i=0;i<weights.count;i++){const sum=weights.getX(i)+weights.getY(i)+weights.getZ(i)+weights.getW(i);assert.ok(Math.abs(sum-1)<1e-6);}}v.viewer.dispose();});

test('separate sneaker soles stay narrower than old photo extrusion',async()=>{const v=await create();const soles=v.meshes.filter(m=>m.geometry.getAttribute('surface').getX(0)===8);assert.equal(soles.length,2);for(const sole of soles){sole.geometry.computeBoundingBox();const box=sole.geometry.boundingBox;assert.ok(box.max.x-box.min.x<.34);assert.ok(box.max.y-box.min.y<.11);}v.viewer.dispose();});

test('torso normals face outward rather than lighting the inside of the jacket',async()=>{const v=await create();const torso=v.meshes.find(m=>m.geometry.getAttribute('surface').getX(0)===1),p=torso.geometry.getAttribute('position'),n=torso.geometry.getAttribute('normal');const ring=35*81,front=ring+20,back=ring+60;assert.ok(n.getZ(front)>0);assert.ok(n.getZ(back)<0);assert.ok(p.getZ(front)>p.getZ(back));v.viewer.dispose();});

test('jacket cuffs are separate volumes bound to the wrists',async()=>{const v=await create({suit:'classic'});const cuffs=v.meshes.filter(m=>m.geometry.getAttribute('surface').getX(0)===9);assert.equal(cuffs.length,2);for(const cuff of cuffs)assert.ok(cuff.geometry.getAttribute('skinWeight').array.some(w=>w>0));v.viewer.dispose();});

test('body selection changes torso and limb volumes while keeping wrist and foot registration',async()=>{
 const normal=await create(),slim=await create({body:'bodySlim'}),beast=await create({body:'bodyBeast'}),belly=await create({body:'bodyBelly'});
 const box=(v,surface)=>{const m=v.meshes.find(m=>m.geometry.getAttribute('surface').getX(0)===surface);m.geometry.computeBoundingBox();return m.geometry.boundingBox;};
 assert.ok(box(slim,1).max.x<box(normal,1).max.x);assert.ok(box(beast,1).max.x>box(normal,1).max.x);assert.ok(box(belly,1).max.z>box(normal,1).max.z);
 for(const v of [slim,beast,belly])assert.deepEqual(box(v,5),box(normal,5));
 for(const v of [normal,slim,beast,belly])v.viewer.dispose();
});
