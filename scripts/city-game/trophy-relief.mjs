import * as T from '../../vendor/three/three.module.min.js';

// Trace the actual alpha boundary, including holes, rather than inventing a cup shape.
export function trophyRelief(map,width,height){
 const c=document.createElement('canvas'),resolution=96;c.width=resolution;c.height=resolution;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(map.image,0,0,resolution,resolution);const data=g.getImageData(0,0,resolution,resolution).data;
 const filled=(x,y)=>x>=0&&y>=0&&x<resolution&&y<resolution&&data[(y*resolution+x)*4+3]>90,edges=new Map();
 const edge=(x,y,a,b)=>{const k=x+','+y;if(!edges.has(k))edges.set(k,[]);edges.get(k).push([a,b]);};
 for(let y=0;y<resolution;y++)for(let x=0;x<resolution;x++)if(filled(x,y)){if(!filled(x,y-1))edge(x,y,x+1,y);if(!filled(x+1,y))edge(x+1,y,x+1,y+1);if(!filled(x,y+1))edge(x+1,y+1,x,y+1);if(!filled(x-1,y))edge(x,y+1,x,y);}
 const loops=[];while(edges.size){const start=edges.keys().next().value,points=[],[sx,sy]=start.split(',').map(Number);let x=sx,y=sy;
  for(let i=0;i<resolution*resolution*4;i++){points.push(new T.Vector2((x/resolution-.5)*width,(.5-y/resolution)*height));const key=x+','+y,list=edges.get(key);if(!list?.length)break;[x,y]=list.pop();if(!list.length)edges.delete(key);if(x===sx&&y===sy)break;}
  if(points.length>5&&Math.abs(T.ShapeUtils.area(points))>width*height*.001)loops.push(points);
 }
 const outer=loops.filter(p=>T.ShapeUtils.isClockWise(p)),holes=loops.filter(p=>!T.ShapeUtils.isClockWise(p));
 const contains=(points,p)=>{let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++)if((points[i].y>p.y)!==(points[j].y>p.y)&&p.x<(points[j].x-points[i].x)*(p.y-points[i].y)/(points[j].y-points[i].y)+points[i].x)inside=!inside;return inside;};
 const shapes=outer.map(points=>{const s=new T.Shape(points);for(const hole of holes)if(contains(points,hole[0]))s.holes.push(new T.Path(hole));return s;});
 if(!shapes.length)return null;
 const geometry=new T.ExtrudeGeometry(shapes,{depth:.07,bevelEnabled:false,curveSegments:1}),material=new T.MeshStandardMaterial({color:'#bc9850',metalness:.78,roughness:.3});geometry.translate(0,0,-.075);const mesh=new T.Mesh(geometry,material);mesh.castShadow=mesh.receiveShadow=true;mesh.name='Owned award silhouette relief';return mesh;
}
