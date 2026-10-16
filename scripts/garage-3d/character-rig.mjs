import * as T from '../../vendor/three/three.module.min.js';
const smooth=(a,b,v)=>{const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t);};
// One shared rest-pose skeleton drives body, garments and attached accessories.
export function createCharacterRig(root){
 const bones=[],byName={};
 function bone(name,parent,x,y,z=0){const b=new T.Bone();b.name=name;const origin=parent?parent.userData.rest:[0,0,0];b.position.set(x-origin[0],y-origin[1],z-origin[2]);b.userData.rest=[x,y,z];(parent||root).add(b);bones.push(b);byName[name]=b;return b;}
 const pelvis=bone('pelvis',null,0,0),spine=bone('spine',pelvis,0,.30),chest=bone('chest',spine,0,.91),neck=bone('neck',chest,0,1.18),head=bone('head',neck,0,1.40,.10);
 for(const [side,sign]of [['left',-1],['right',1]]){const shoulder=bone(side+'Shoulder',chest,sign*.49,1.09),elbow=bone(side+'Elbow',shoulder,sign*.66,.57),wrist=bone(side+'Wrist',elbow,sign*.78,.04,.035);const hand=bone(side+'Hand',wrist,sign*.79,-.15,.07);for(let n=0;n<4;n++)bone(side+'Finger'+n,hand,sign*(.5-(.175+n*.019))*2.55,-.17-n*.007,.07);bone(side+'Thumb',hand,sign*.63,-.13,.11);const hip=bone(side+'Hip',pelvis,sign*.23,-.20,-.01),knee=bone(side+'Knee',hip,sign*.34,-.77,-.01);bone(side+'Ankle',knee,sign*.44,-1.30,.08);}
 root.updateMatrixWorld(true);const skeleton=new T.Skeleton(bones);
 function weights(surface,x,y){const side=x<.5?'left':'right';let a=pelvis,b=pelvis,w=0;
  if(surface===1){a=spine;b=chest;w=1-smooth(.25,.44,y);}
  else if(surface===2||surface===9){if(y<.25){a=chest;b=byName[side+'Shoulder'];w=smooth(.175,.245,y);}else if(y<.40){a=byName[side+'Shoulder'];b=byName[side+'Elbow'];w=smooth(.29,.38,y);}else{a=byName[side+'Elbow'];b=byName[side+'Wrist'];w=smooth(.43,.49,y);}}
  else if(surface===3){const local=x<.5?x:1-x;if(y>.54){a=byName[side+'Hand'];b=byName[side+(local>.239?'Thumb':'Finger'+Math.max(0,Math.min(3,Math.round((local-.175)/.019))))];w=smooth(.54,.566,y);}else{a=byName[side+'Wrist'];b=byName[side+'Hand'];w=smooth(.49,.53,y);}}
  else if(surface===4){if(y<.57){a=pelvis;b=byName[side+'Hip'];w=smooth(.50,.57,y);}else if(y<.76){a=byName[side+'Hip'];b=byName[side+'Knee'];w=smooth(.66,.74,y);}else{a=byName[side+'Knee'];b=byName[side+'Ankle'];w=smooth(.79,.84,y);}}
  else if(surface===5||surface===8)a=b=byName[side+'Ankle'];
  else if(surface===6||surface===10)a=b=head;
  else if(surface===7){a=chest;b=neck;w=1-smooth(.17,.225,y);}
  return {indices:[bones.indexOf(a),bones.indexOf(b),0,0],weights:[1-w,w,0,0]};
 }
 function mesh(geometry,material){const uv=geometry.getAttribute('bodyUv'),surfaces=geometry.getAttribute('surface'),indices=[],values=[];for(let i=0;i<uv.count;i++){const v=weights(surfaces.getX(i),uv.getX(i),uv.getY(i));indices.push(...v.indices);values.push(...v.weights);}geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(values,4));const m=new T.SkinnedMesh(geometry,material);root.add(m);m.bind(skeleton,new T.Matrix4());m.frustumCulled=false;return m;}
 let strength=0,relaxed=false;
 function update(time,active,dt){strength+=(Number(active)-strength)*(1-Math.exp(-Math.min(.1,dt)*9));const breath=Math.sin(time*1.55)*strength;chest.scale.set(1+breath*.003,1+breath*.003,1+breath*.007);head.rotation.set(Math.sin(time*.57)*.010*strength,(relaxed?.025:0)+Math.sin(time*.36)*.024*strength,(relaxed?-.016:0)+Math.sin(time*.41)*.008*strength);for(const [side,sign]of [['left',-1],['right',1]]){byName[side+'Shoulder'].rotation.z=(relaxed?sign*.026:0)+(Math.sin(time*.79+sign*.5)*.009+sign*.005)*strength;byName[side+'Elbow'].rotation.x=(relaxed?(sign<0?-.045:-.085):0)+(Math.sin(time*.67+sign*.4)*.012-.025)*strength;byName[side+'Hand'].rotation.x=(relaxed?.025:0)+Math.sin(time*.61+sign)*.010*strength;for(let n=0;n<4;n++)byName[side+'Finger'+n].rotation.x=(.035+Math.sin(time*.53+n*.25+sign)*.012)*strength;}root.updateMatrixWorld(true);skeleton.update();}
 function attach(object,name){root.updateMatrixWorld(true);byName[name].attach(object);}
 return {skeleton,bones:byName,mesh,update,attach,weights,setRelaxedPose(value){relaxed=!!value;},dispose(){skeleton.dispose();}};
}
