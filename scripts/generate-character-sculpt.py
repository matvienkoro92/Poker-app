"""Author the smooth anatomical meshes used by the wardrobe (requires numpy).
Run with the bundled workspace Python. No Blender or remote model is required.
"""
import json, math, struct, sys
from pathlib import Path
import numpy as np
OUT=Path(__file__).resolve().parents[1]/'assets/player-hall/character-3d/sculpt'

def ell(p,c,r):
 q=(p-np.array(c))/np.array(r)
 k0=np.linalg.norm(q,axis=-1);k1=np.linalg.norm(q/np.array(r),axis=-1)
 return k0*(k0-1)/np.maximum(k1,1e-8)
def join(a,b,k=.035):
 h=np.clip(.5+.5*(b-a)/k,0,1)
 return b*(1-h)+a*h-k*h*(1-h)
def union(p,forms,k=.035):
 d=ell(p,*forms[0])
 for c,r in forms[1:]:d=join(d,ell(p,c,r),k)
 return d

def head(p):
 return union(p,[((0,1.66,.015),(.292,.280,.245)),((0,1.46,.035),(.265,.220,.250)),((-.18,1.51,.10),(.13,.17,.18)),((.18,1.51,.10),(.13,.17,.18)),((0,1.33,.025),(.16,.12,.16))],.065)
def face(p):
 d=union(p,[((0,1.485,.245),(.195,.155,.120)),((0,1.555,.258),(.119,.135,.106)),((-.112,1.644,.237),(.122,.096,.055)),((.112,1.644,.237),(.122,.096,.055)),((0,1.39,.24),(.160,.066,.090))],.025)
 d=join(d,ell(p,(0,1.585,.346),(.060,.050,.032)),.015)
 for side in [-1,1]:d=join(d,ell(p,(side*.034,1.560,.347),(.034,.026,.031)),.012)
 for side in [-1,1]:d=-join(-d,ell(p,(side*.029,1.550,.373),(.014,.008,.012)),.003)
 # Actual concave eye sockets, rather than eyes painted on a spherical head.
 for s in [-1,1]:d=-join(-d,ell(p,(s*.112,1.64,.285),(.052,.034,.045)),.009)
 return d

def hand(p,side):
 q=p.copy();q[...,0]*=side
 forms=[((.755,-.115,.045),(.086,.120,.048)),((.753,-.030,.025),(.063,.065,.052)),((.765,-.185,.048),(.088,.068,.045))]
 # Metacarpals and curved phalanges; finger lengths differ anatomically.
 for i,(offset,length) in enumerate([(-.060,.139),(-.020,.178),(.022,.167),(.060,.127)]):
  x=.755+offset
  forms.extend([((x,-.205,.053),(.023,.046,.033)),((x+offset*.08,-.242-length*.15,.066),(.022,length*.32,.030)),((x+offset*.12,-.247-length*.56,.089),(.019,length*.27,.027)),((x+offset*.12,-.245-length*.84,.105),(.015,length*.18,.020))])
 forms.extend([((.668,-.104,.045),(.041,.064,.039)),((.641,-.160,.065),(.034,.064,.033)),((.651,-.208,.086),(.026,.042,.026))])
 return union(q,forms,.014)

def profile(y,knots,values):
 knots=np.array(knots);values=np.array(values);slope=np.gradient(values,knots);k=np.clip(np.searchsorted(knots,y)-1,0,len(knots)-2);span=knots[k+1]-knots[k];t=np.clip((y-knots[k])/span,0,1)
 return (2*t**3-3*t**2+1)*values[k]+(t**3-2*t**2+t)*span*slope[k]+(-2*t**3+3*t**2)*values[k+1]+(t**3-t**2)*span*slope[k+1]

def ellipse2(p,cx,cz,rx,rz):
 qx=(p[...,0]-cx)/rx;qz=(p[...,2]-cz)/rz
 return (np.sqrt(qx*qx+qz*qz)-1)*np.minimum(rx,rz)
def shirt(p,kind='tee'):
 y=p[...,1]
 rx=profile(y,[.10,.22,.50,.85,1.05,1.15,1.235],[.412,.430,.445,.473,.480,.40,.182])
 rz=profile(y,[.10,.22,.50,.85,1.05,1.15,1.235],[.225,.240,.250,.263,.260,.225,.125])
 d=np.maximum(ellipse2(p,0,0,rx,rz),np.maximum(.10-y,y-1.235))
 # One continuous cloth surface across shoulder and sleeve junctions.
 for side in [-1,1]:
  if kind!='tank':
   q=p-np.array([side*.445,1.06,0]);a=side*.46;c=np.cos(a);sn=np.sin(a)
   rotated=np.stack([q[...,0]*c+q[...,1]*sn,-q[...,0]*sn+q[...,1]*c,q[...,2]],axis=-1)
   sleeve=join(ell(rotated,(0,0,0),(.185,.285,.183)),ell(p,(side*.57,.89,0),(.17,.29,.17)),.04)
   sleeve=np.maximum(sleeve,.775-y)
   d=join(d,sleeve,.065)
   if kind=='jacket':
    q=p-np.array([side*.66,.52,.025]);a=side*.17;c=np.cos(a);sn=np.sin(a)
    rotated=np.stack([q[...,0]*c+q[...,1]*sn,-q[...,0]*sn+q[...,1]*c,q[...,2]],axis=-1)
    lower=np.maximum(ell(rotated,(0,0,0),(.14,.60,.142)),.015-y)
    d=join(d,lower,.045)
    hole=np.maximum(ellipse2(p,side*.744,.026,.067,.062),y-.10)
   else:hole=np.maximum(ellipse2(p,side*.57,.010,.145,.14),y-.845)
   d=np.maximum(d,-hole)
  else:
   opening=ell(p,(side*.40,1.09,.025),(.12,.25,.34));d=np.maximum(d,-opening)
 ax=np.abs(p[...,0]);u=np.clip((ax-.20)/.30,0,1);v=np.clip((ax-.50)/.22,0,1);roof=1.235-.10*u*u*(3-2*u)-.13*v*v*(3-2*v)-.075*(p[...,2]/.22)**2
 d=-join(-d,-(y-roof),.018)
 neck=np.maximum(ellipse2(p,0,0,.175,.120),1.17-y)
 d=np.maximum(d,-neck)
 # Fine compression folds collect at the hem and armpits.
 d+=.0035*np.sin(y*30+p[...,0]*11)*np.exp(-((y-.27)/.18)**2)
 d+=.0015*np.sin(y*45+np.abs(p[...,0])*18)*np.exp(-((np.abs(p[...,0])-.40)/.12)**2)
 return d

def trousers(p,short=True):
 y=p[...,1]
 d=ell(p,(0,-.105,-.028),(.440,.315,.245))
 for side in [-1,1]:
  if short:leg=ell(p,(side*.245,-.435,-.02),(.226,.395,.214))
  else:
   cy=profile(y,[-1.55,-1.30,-.90,-.50,-.25],[.41,.39,.34,.27,.24])*side
   rx=profile(y,[-1.55,-1.30,-.90,-.50,-.25],[.10,.13,.17,.213,.227])
   rz=profile(y,[-1.55,-1.30,-.90,-.50,-.25],[.09,.12,.16,.20,.214])
   cap=np.sin(np.clip((.015-y)/.24,0,1)*np.pi/2);rx=np.maximum(.002,rx*cap);rz=np.maximum(.002,rz*cap)
   leg=np.maximum(ellipse2(p,cy,-.02,rx,rz),y-.015)
  d=join(d,leg,.055)
 d=np.maximum(d,y-.115)
 bottom=-.675 if short else -1.55;d=np.maximum(d,bottom-y)
 for side in [-1,1]:
  hole=np.maximum(ellipse2(p,side*(.245 if short else .41),-.02,.152 if short else .072,.145 if short else .068),y-(bottom+.045));d=np.maximum(d,-hole)
 d+=.0028*np.sin(y*37+np.abs(p[...,0])*17)*np.exp(-((y+.48)/.19)**2)
 if not short:d+=.005*np.sin(y*42+p[...,0]*15)*np.exp(-((y+1.34)/.23)**2)
 return d

def helmet_shell(p):
 outer=ell(p,(0,1.665,.015),(.335,.345,.295));inner=ell(p,(0,1.665,.015),(.318,.328,.278));d=np.maximum(outer,-inner)
 q=np.abs((p-np.array([0,1.640,.30]))/np.array([.270,.215,.260]));window=(np.sum(q**4,axis=-1)**.25-1)*.215
 return -join(-d,window,.002)

# Conforming marching tetrahedra. Shared edge IDs weld the mesh exactly.
TETS=[(0,5,1,6),(0,1,2,6),(0,2,3,6),(0,3,7,6),(0,7,4,6),(0,4,5,6)]
CORNERS=np.array([(0,0,0),(1,0,0),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,1,1),(0,1,1)])
def mesh(name,fn,lo,hi,res):
 if len(sys.argv)>1 and name not in sys.argv[1:]:return
 lo=np.array(lo);hi=np.array(hi);shape=np.array(res);step=(hi-lo)/(shape-1)
 grid=np.indices(shape).transpose(1,2,3,0)*step+lo;values=fn(grid)
 cubes=[];samples=[]
 for dx,dy,dz in CORNERS:samples.append(values[dx:shape[0]-1+dx,dy:shape[1]-1+dy,dz:shape[2]-1+dz])
 samples=np.stack(samples,axis=-1);active=np.argwhere((samples.min(-1)<0)&(samples.max(-1)>=0))
 points=[];faces=[];cache={}
 def index(a,b,fa,fb):
  ia=tuple(a);ib=tuple(b);key=tuple(sorted((ia,ib)))
  if key not in cache:
   t=fa/(fa-fb);v=lo+(a+(b-a)*t)*step;cache[key]=len(points);points.append(v)
  return cache[key]
 for base in active:
  nodes=base+CORNERS;v=values[tuple(nodes.T)]
  for tet in TETS:
   inside=[i for i in tet if v[i]<0];outside=[i for i in tet if v[i]>=0]
   if not inside or not outside:continue
   ids=[index(nodes[a],nodes[b],v[a],v[b]) for a in inside for b in outside]
   xyz=np.array([points[i] for i in ids]);center=xyz.mean(0)
   normal=(nodes[outside].mean(0)-nodes[inside].mean(0))*step;normal/=np.linalg.norm(normal)
   tangent=xyz[0]-center;tangent/=np.linalg.norm(tangent);bitangent=np.cross(normal,tangent)
   order=np.argsort(np.arctan2((xyz-center)@bitangent,(xyz-center)@tangent));ids=[ids[i] for i in order]
   for i in range(1,len(ids)-1):faces.append((ids[0],ids[i],ids[i+1]))
 positions=np.array(points,dtype=np.float32);indices=np.array(faces,dtype=np.uint32).ravel()
 eps=.00015;normal=[]
 for axis in range(3):
  delta=np.zeros(3);delta[axis]=eps;normal.append(fn(positions+delta)-fn(positions-delta))
 normals=np.stack(normal,axis=-1);normals/=np.maximum(np.linalg.norm(normals,axis=-1,keepdims=True),1e-12);normals=normals.astype(np.float32)
 header=json.dumps({'vertices':len(positions),'indices':len(indices)},separators=(',',':')).encode();header+=b' '*((-len(header))%4)
 data=struct.pack('<I',len(header))+header+positions.tobytes()+normals.tobytes()+indices.tobytes()
 (OUT/(name+'.bin')).write_bytes(data);print(name,len(positions),len(indices)//3,len(data),flush=True)
OUT.mkdir(parents=True,exist_ok=True)
mesh('head',head,[-.38,1.17,-.29],[.38,2.02,.32],[64,76,56])
mesh('face',face,[-.26,1.29,.13],[.26,1.77,.40],[68,68,44])
for side,name in [(-1,'hand-left'),(1,'hand-right')]:
 lo=[.59,-.46,-.04];hi=[.89,.05,.16]
 if side<0:lo[0],hi[0]=-hi[0],-lo[0]
 mesh(name,lambda p:hand(p,side),lo,hi,[46,84,34])

for kind in ['tee','jacket','tank']:
 mesh('shirt-'+kind,lambda p:shirt(p,kind),[-.90,.00,-.32],[.90,1.35,.34],[112,100,52])
for short,name in [(True,'shorts'),(False,'pants')]:
 mesh(name,lambda p:trousers(p,short),[-.56,-1.62,-.31],[.56,.16,.31],[96,132,56])

mesh('helmet-shell',helmet_shell,[-.38,1.27,-.32],[.38,2.06,.34],[84,104,72])
