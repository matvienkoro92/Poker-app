const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
async function create(look={}){
 const listeners={},frames=[],meshes=[];
 class Resource{dispose(){this.disposed=true;}}
 class Geometry extends Resource{constructor(){super();this.attributes={};}setAttribute(k,v){this.attributes[k]=v;}setIndex(indices){this.indices=indices;}computeVertexNormals(){}}
 class Group{constructor(){this.rotation={set:(...v)=>this.angles=v};}add(m){meshes.push(m);}}
 class Renderer extends Resource{constructor(){super();this.domElement={setAttribute(){},remove(){}};}setPixelRatio(){}setSize(){}render(){}forceContextLoss(){}}
 const pixels=new Uint8ClampedArray(1024*1536*4).fill(255),draws=[];
 const context={drawImage(...v){draws.push(v);},getImageData(){return {data:pixels};}};
 const host={isConnected:true,clientWidth:300,clientHeight:600,dataset:{},append(){},setPointerCapture(){},addEventListener(k,v){listeners[k]=v;},removeEventListener(k){delete listeners[k];}};
 const state={},scope={T:{CanvasTexture:Resource,Color:class{},ShaderMaterial:class extends Resource{constructor(v){super();Object.assign(this,v);}},Group,BufferGeometry:Geometry,Float32BufferAttribute:class{constructor(array,size){this.array=array;this.itemSize=size;}},Mesh:class{constructor(geometry,material){this.geometry=geometry;this.material=material;}},Scene:class{add(){}},WebGLRenderer:Renderer,OrthographicCamera:class{constructor(){this.position={set(){}};}updateProjectionMatrix(){}}},Image:class{async decode(){}},document:{createElement(){return {getContext(){return context;}};}},window:{PokerGarage:{loadWardrobe:async()=>{},loadHelmet:()=>({naturalWidth:500}),renderCharacter:()=>({width:1024,height:1600}),item:()=>({color:'#123456'}),wardrobeSubcategory:(_,v)=>v==='sandShorts'?'shorts':'all'}},devicePixelRatio:1,ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame(fn){frames.push(fn);return frames.length;},cancelAnimationFrame(){}};
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
 assert.notDeepEqual(short.meshes.at(-2).geometry.attributes.position.array,long.meshes.at(-2).geometry.attributes.position.array);
 long.viewer.dispose();short.viewer.dispose();
});
test('detached viewer releases its pointer listeners',async()=>{const v=await create();v.host.isConnected=false;v.frames.at(-1)(20);assert.equal(Object.keys(v.listeners).length,0);});

test('watch close-up faces the wrist and restores the previous orbit on exit',async()=>{
 const v=await create();v.viewer.setYaw(1.3);v.frames.at(-1)(20);v.viewer.setFocus('watch');v.frames.at(-1)(40);assert.equal(v.host.dataset.focus,'watch');assert.equal(v.state.yaw,0);assert.equal(v.state.focusOrbit.yaw,1.3);v.viewer.setFocus('full');assert.equal(v.state.yaw,1.3);assert.equal(v.state.focusOrbit,undefined);v.viewer.dispose();
});

test('helmet replaces exposed ears with a closed head volume; hands have their own UV material region',async()=>{const bare=await create(),helmet=await create({helmet:'silver'});assert.equal(helmet.meshes.length,bare.meshes.length-2);const head=helmet.meshes.find(m=>m.geometry.attributes.surface.array[0]===6);assert.equal(head.material.uniforms.helmetOn.value,1);const hands=helmet.meshes.filter(m=>m.geometry.attributes.surface.array[0]===3);assert.equal(hands.length,12);assert.ok(hands.every(m=>m.geometry.attributes.bodyUv.itemSize===2));bare.viewer.dispose();helmet.viewer.dispose();});

test('idle animation advances but stops during wrist inspection and drag',async()=>{const v=await create(),uniforms=v.meshes[0].material.uniforms;v.frames.at(-1)(1000);assert.equal(uniforms.idleTime.value,1);assert.equal(uniforms.idleStrength.value,1);v.viewer.setFocus('watch');v.frames.at(-1)(1500);assert.equal(uniforms.idleStrength.value,0);v.viewer.setFocus('full');v.listeners.pointerdown({pointerId:1,clientX:0,clientY:0,preventDefault(){}});v.frames.at(-1)(2000);assert.equal(uniforms.idleStrength.value,0);v.viewer.dispose();});

test('each body segment has finite geometry and closed end caps',async()=>{const v=await create();for(const mesh of v.meshes){const geo=mesh.geometry,n=geo.attributes.position.array.length/3;assert.ok(geo.attributes.position.array.every(Number.isFinite));assert.ok(geo.indices.includes(n-1));assert.ok(geo.indices.includes(n-2));assert.ok(geo.indices.every(i=>i>=0&&i<n));assert.equal(geo.attributes.uv.array.length,n*2);}v.viewer.dispose();});
