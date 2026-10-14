const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
async function create(look={}){
 const listeners={},frames=[],meshes=[];
 class Resource{dispose(){this.disposed=true;}}
 class Geometry extends Resource{constructor(){super();this.attributes={};}setAttribute(k,v){this.attributes[k]=v;}setIndex(){}computeVertexNormals(){}}
 class Group{constructor(){this.rotation={set:(...v)=>this.angles=v};}add(m){meshes.push(m);}}
 class Renderer extends Resource{constructor(){super();this.domElement={setAttribute(){},remove(){}};}setPixelRatio(){}setSize(){}render(){}forceContextLoss(){}}
 const pixels=new Uint8ClampedArray(1024*1536*4).fill(255),draws=[];
 const context={drawImage(...v){draws.push(v);},getImageData(){return {data:pixels};}};
 const host={isConnected:true,clientWidth:300,clientHeight:600,dataset:{},append(){},setPointerCapture(){},addEventListener(k,v){listeners[k]=v;},removeEventListener(k){delete listeners[k];}};
 const state={},scope={T:{CanvasTexture:Resource,Color:class{},ShaderMaterial:class extends Resource{constructor(v){super();Object.assign(this,v);}},Group,BufferGeometry:Geometry,Float32BufferAttribute:class{constructor(array,size){this.array=array;this.itemSize=size;}},Mesh:class{constructor(geometry,material){this.geometry=geometry;this.material=material;}},Scene:class{add(){}},WebGLRenderer:Renderer,OrthographicCamera:class{constructor(){this.position={set(){}};}updateProjectionMatrix(){}}},Image:class{async decode(){}},document:{createElement(){return {getContext(){return context;}};}},window:{PokerGarage:{loadWardrobe:async()=>{},renderCharacter:()=>({width:1024,height:1600}),item:()=>({color:'#123456'}),wardrobeSubcategory:(_,v)=>v==='sandShorts'?'shorts':'all'}},devicePixelRatio:1,ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame(fn){frames.push(fn);return frames.length;},cancelAnimationFrame(){}};
 let source=fs.readFileSync('scripts/garage-3d/character-reconstruction.mjs','utf8').replace(/^import .*\n/,'').replace('export async function','async function');
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
