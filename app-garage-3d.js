(()=>{var od=0,Ac=1,ld=2;var Cc=1,Ws=2,Oi=3,Sr=0,ai=1,Bt=2,wr=0,Fa=1,za=2,Rc=3,Ic=4,cd=5,Xs=100,hd=101,ud=102,dd=103,pd=104,fd=200,md=201,gd=202,vd=203,yd=204,_d=205,xd=206,Md=207,Td=208,bd=209,Sd=210,wd=211,Ed=212,Ad=213,Cd=214,rl=0,sl=1,al=2,Ga=3,ol=4,ll=5,cl=6,hl=7,Rd=0,Id=1,Pd=2,or=0,Ld=1,Dd=2,Nd=3,pi=4,Ud=5,Bd=6,Od=7,pc="attached",Fd="detached",Pc=300,js=301,es=302,ul=303,dl=304,ka=306,vn=1e3,vr=1001,Rs=1002,ii=1003,pl=1004;var ts=1005;var Nn=1006,qs=1007;var ei=1008;var Fi=1009,Lc=1010,Dc=1011,Ys=1012,fl=1013,ns=1014,fi=1015,Er=1016,ml=1017,gl=1018,Zs=1020,Nc=35902,Uc=35899,zd=1021,Gd=1022,mi=1023,Va=1026,Ha=1027,vl=1028,yl=1029,kd=1030,Bc=1031;var Oc=1033,_l=33776,xl=33777,Ml=33778,Tl=33779,Fc=35840,zc=35841,Gc=35842,kc=35843,Vc=36196,Hc=37492,Wc=37496,Xc=37808,jc=37809,qc=37810,Yc=37811,Zc=37812,Kc=37813,Jc=37814,$c=37815,Qc=37816,eh=37817,th=37818,nh=37819,ih=37820,rh=37821,sh=36492,ah=36494,oh=36495,lh=36283,ch=36284,hh=36285,uh=36286;var Fr=2300,zr=2301,Co=2302,fc=2400,mc=2401,gc=2402;var dh=0,Wa=1,Ks=2;var Js=3201;var Vd=0,Hd=1,is="",yt="srgb",Un="srgb-linear",ga="linear",nn="srgb";var Or=7680;var Wd=512,Xd=513,jd=514,ph=515,qd=516,Yd=517,Zd=518,Kd=519,Ro=35044;var fh="300 es",Qi=2e3,va=2001;var er=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_u=1234567,As=Math.PI/180,Gr=180/Math.PI;function ui(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Fn[255&r]+Fn[r>>8&255]+Fn[r>>16&255]+Fn[r>>24&255]+"-"+Fn[255&e]+Fn[e>>8&255]+"-"+Fn[e>>16&15|64]+Fn[e>>24&255]+"-"+Fn[63&t|128]+Fn[t>>8&255]+"-"+Fn[t>>16&255]+Fn[t>>24&255]+Fn[255&n]+Fn[n>>8&255]+Fn[n>>16&255]+Fn[n>>24&255]).toLowerCase()}function Nt(r,e,t){return Math.max(e,Math.min(t,r))}function vc(r,e){return(r%e+e)%e}function pa(r,e,t){return(1-t)*r+t*e}function Si(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function tn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var mh={DEG2RAD:As,RAD2DEG:Gr,generateUUID:ui,clamp:Nt,euclideanModulo:vc,mapLinear:function(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)},inverseLerp:function(r,e,t){return r!==e?(t-r)/(e-r):0},lerp:pa,damp:function(r,e,t,n){return pa(r,e,1-Math.exp(-t*n))},pingpong:function(r,e=1){return e-Math.abs(vc(r,2*e)-e)},smoothstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*(3-2*r)},smootherstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*r*(r*(6*r-15)+10)},randInt:function(r,e){return r+Math.floor(Math.random()*(e-r+1))},randFloat:function(r,e){return r+Math.random()*(e-r)},randFloatSpread:function(r){return r*(.5-Math.random())},seededRandom:function(r){r!==void 0&&(_u=r);let e=_u+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(r){return r*As},radToDeg:function(r){return r*Gr},isPowerOfTwo:function(r){return!(r&r-1)&&r!==0},ceilPowerOfTwo:function(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))},floorPowerOfTwo:function(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))},setQuaternionFromProperEuler:function(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*g,l*p,o*c);break;case"YXY":r.set(l*p,o*h,l*g,o*c);break;case"ZYZ":r.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}},normalize:tn,denormalize:Si},_e=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Nt(this.x,e.x,t.x),this.y=Nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Nt(this.x,e,t),this.y=Nt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Rn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],g=s[a+2],m=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=g,void(e[t+3]=m);if(u!==m||l!==d||c!==p||h!==g){let f=1-o,v=l*d+c*p+h*g+u*m,y=v>=0?1:-1,_=1-v*v;if(_>Number.EPSILON){let T=Math.sqrt(_),b=Math.atan2(T,v*y);f=Math.sin(f*b)/T,o=Math.sin(o*b)/T}let x=o*y;if(l=l*f+d*x,c=c*f+p*x,h=h*f+g*x,u=u*f+m*x,f===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-o*p,e[t+2]=c*g+h*p+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),p=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},S=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Nt(this.x,e.x,t.x),this.y=Nt(this.y,e.y,t.y),this.z=Nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Nt(this.x,e,t),this.y=Nt(this.y,e,t),this.z=Nt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ul.copy(this).projectOnVector(e),this.sub(Ul)}reflect(e){return this.sub(Ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ul=new S,xu=new Rn,At=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],m=i[0],f=i[3],v=i[6],y=i[1],_=i[4],x=i[7],T=i[2],b=i[5],P=i[8];return s[0]=a*m+o*y+l*T,s[3]=a*f+o*_+l*b,s[6]=a*v+o*x+l*P,s[1]=c*m+h*y+u*T,s[4]=c*f+h*_+u*b,s[7]=c*v+h*x+u*P,s[2]=d*m+p*y+g*T,s[5]=d*f+p*_+g*b,s[8]=d*v+p*x+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,p=c*s-a*l,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/g;return e[0]=u*m,e[1]=(i*c-h*n)*m,e[2]=(o*n-i*a)*m,e[3]=d*m,e[4]=(h*t-i*l)*m,e[5]=(i*s-o*t)*m,e[6]=p*m,e[7]=(n*l-c*t)*m,e[8]=(a*t-n*s)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Bl.makeScale(e,t)),this}rotate(e){return this.premultiply(Bl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Bl=new At;function gh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Is(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Jd(){let r=Is("canvas");return r.style.display="block",r}var Mu={};function Ps(r){r in Mu||(Mu[r]=!0,console.warn(r))}function $d(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Tu=new At().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bu=new At().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vf(){let r={enabled:!0,workingColorSpace:Un,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===nn&&(i.r=$i(i.r),i.g=$i(i.g),i.b=$i(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nn&&(i.r=Cs(i.r),i.g=Cs(i.g),i.b=Cs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?ga:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ps("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ps("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Un]:{primaries:e,whitePoint:n,transfer:ga,toXYZ:Tu,fromXYZ:bu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:nn,toXYZ:Tu,fromXYZ:bu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),r}var zt=vf();function $i(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Cs(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var fs,Io=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fs===void 0&&(fs=Is("canvas")),fs.width=e.width,fs.height=e.height;let i=fs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=fs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Is("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*$i(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*$i(t[n]/255)):t[n]=$i(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},yf=0,Ls=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ol(i[a].image)):s.push(Ol(i[a]))}else s=Ol(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ol(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Io.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var _f=0,Fl=new S,Cn=class r extends er{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,l=1009,c=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=ui(),this.name="",this.source=new Ls(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new At,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fl).x}get height(){return this.source.getSize(Fl).y}get depth(){return this.source.getSize(Fl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vn:e.x=e.x-Math.floor(e.x);break;case vr:e.x=e.x<0?0:1;break;case Rs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case vn:e.y=e.y-Math.floor(e.y);break;case vr:e.y=e.y<0?0:1;break;case Rs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Cn.DEFAULT_IMAGE=null,Cn.DEFAULT_MAPPING=Pc,Cn.DEFAULT_ANISOTROPY=1;var Yt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],m=l[2],f=l[6],v=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(g+f)<.1&&Math.abs(c+p+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,x=(p+1)/2,T=(v+1)/2,b=(h+d)/4,P=(u+m)/4,B=(g+f)/4;return _>x&&_>T?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=P/n):x>T?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=B/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=P/s,i=B/s),this.set(n,i,s,t),this}let y=Math.sqrt((f-g)*(f-g)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(u-m)/y,this.z=(d-h)/y,this.w=Math.acos((c+p+v-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Nt(this.x,e.x,t.x),this.y=Nt(this.y,e.y,t.y),this.z=Nt(this.z,e.z,t.z),this.w=Nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Nt(this.x,e,t),this.y=Nt(this.y,e,t),this.z=Nt(this.z,e,t),this.w=Nt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Po=class extends er{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Cn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ls(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},di=class extends Po{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ya=class extends Cn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ii,this.minFilter=ii,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Lo=class extends Cn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ii,this.minFilter=ii,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mn=class{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mi):Mi.fromBufferAttribute(s,a),Mi.applyMatrix4(e.matrixWorld),this.expandByPoint(Mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ja.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ja.copy(n.boundingBox)),Ja.applyMatrix4(e.matrixWorld),this.union(Ja)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mi),Mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ra),$a.subVectors(this.max,ra),ms.subVectors(e.a,ra),gs.subVectors(e.b,ra),vs.subVectors(e.c,ra),ur.subVectors(gs,ms),dr.subVectors(vs,gs),Dr.subVectors(ms,vs);let t=[0,-ur.z,ur.y,0,-dr.z,dr.y,0,-Dr.z,Dr.y,ur.z,0,-ur.x,dr.z,0,-dr.x,Dr.z,0,-Dr.x,-ur.y,ur.x,0,-dr.y,dr.x,0,-Dr.y,Dr.x,0];return!!zl(t,ms,gs,vs,$a)&&(t=[1,0,0,0,1,0,0,0,1],!!zl(t,ms,gs,vs,$a)&&(Qa.crossVectors(ur,dr),t=[Qa.x,Qa.y,Qa.z],zl(t,ms,gs,vs,$a)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Mi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Hi=[new S,new S,new S,new S,new S,new S,new S,new S],Mi=new S,Ja=new Mn,ms=new S,gs=new S,vs=new S,ur=new S,dr=new S,Dr=new S,ra=new S,$a=new S,Qa=new S,Nr=new S;function zl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Nr.fromArray(r,s);let o=i.x*Math.abs(Nr.x)+i.y*Math.abs(Nr.y)+i.z*Math.abs(Nr.z),l=e.dot(Nr),c=t.dot(Nr),h=n.dot(Nr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var xf=new Mn,sa=new S,Gl=new S,jn=class{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):xf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sa.subVectors(e,this.center);let t=sa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(sa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sa.copy(e.center).add(Gl)),this.expandByPoint(sa.copy(e.center).sub(Gl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wi=new S,kl=new S,eo=new S,pr=new S,Vl=new S,to=new S,Hl=new S,kr=class{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){kl.copy(e).add(t).multiplyScalar(.5),eo.copy(t).sub(e).normalize(),pr.copy(this.origin).sub(kl);let s=.5*e.distanceTo(t),a=-this.direction.dot(eo),o=pr.dot(this.direction),l=-pr.dot(eo),c=pr.lengthSq(),h=Math.abs(1-a*a),u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let m=1/h;u*=m,d*=m,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(kl).addScaledVector(eo,d),p}intersectSphere(e,t){Wi.subVectors(e.center,this.origin);let n=Wi.dot(this.direction),i=Wi.dot(Wi)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i?null:((o>n||n!=n)&&(n=o),(l<i||i!=i)&&(i=l),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,n,i,s){Vl.subVectors(t,e),to.subVectors(n,e),Hl.crossVectors(Vl,to);let a,o=this.direction.dot(Hl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}pr.subVectors(this.origin,e);let l=a*this.direction.dot(to.crossVectors(pr,to));if(l<0)return null;let c=a*this.direction.dot(Vl.cross(pr));if(c<0||l+c>o)return null;let h=-a*pr.dot(Hl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},st=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,d,p,g,m,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,p,g,m,f)}set(e,t,n,i,s,a,o,l,c,h,u,d,p,g,m,f){let v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=a,v[9]=o,v[13]=l,v[2]=c,v[6]=h,v[10]=u,v[14]=d,v[3]=p,v[7]=g,v[11]=m,v[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/ys.setFromMatrixColumn(e,0).length(),s=1/ys.setFromMatrixColumn(e,1).length(),a=1/ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,g=o*h,m=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-m*c,t[9]=-o*l,t[2]=m-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,p=l*u,g=c*h,m=c*u;t[0]=d+m*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=m+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,p=l*u,g=c*h,m=c*u;t[0]=d-m*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=m-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,p=a*u,g=o*h,m=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+m,t[1]=l*u,t[5]=m*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,g=o*l,m=o*c;t[0]=l*h,t[4]=m-d*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-m*u}else if(e.order==="XZY"){let d=a*l,p=a*c,g=o*l,m=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+m,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mf,e,Tf)}lookAt(e,t,n){let i=this.elements;return ti.subVectors(e,t),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),fr.crossVectors(n,ti),fr.lengthSq()===0&&(Math.abs(n.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),fr.crossVectors(n,ti)),fr.normalize(),no.crossVectors(ti,fr),i[0]=fr.x,i[4]=no.x,i[8]=ti.x,i[1]=fr.y,i[5]=no.y,i[9]=ti.y,i[2]=fr.z,i[6]=no.z,i[10]=ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],m=n[6],f=n[10],v=n[14],y=n[3],_=n[7],x=n[11],T=n[15],b=i[0],P=i[4],B=i[8],U=i[12],F=i[1],R=i[5],L=i[9],q=i[13],W=i[2],$=i[6],ae=i[10],Z=i[14],oe=i[3],De=i[7],Oe=i[11],Me=i[15];return s[0]=a*b+o*F+l*W+c*oe,s[4]=a*P+o*R+l*$+c*De,s[8]=a*B+o*L+l*ae+c*Oe,s[12]=a*U+o*q+l*Z+c*Me,s[1]=h*b+u*F+d*W+p*oe,s[5]=h*P+u*R+d*$+p*De,s[9]=h*B+u*L+d*ae+p*Oe,s[13]=h*U+u*q+d*Z+p*Me,s[2]=g*b+m*F+f*W+v*oe,s[6]=g*P+m*R+f*$+v*De,s[10]=g*B+m*L+f*ae+v*Oe,s[14]=g*U+m*q+f*Z+v*Me,s[3]=y*b+_*F+x*W+T*oe,s[7]=y*P+_*R+x*$+T*De,s[11]=y*B+_*L+x*ae+T*Oe,s[15]=y*U+_*q+x*Z+T*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*p-n*l*p)+e[7]*(+t*l*p-t*c*d+s*a*d-i*a*p+i*c*h-s*l*h)+e[11]*(+t*c*u-t*o*p-s*a*u+n*a*p+s*o*h-n*c*h)+e[15]*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],m=e[13],f=e[14],v=e[15],y=u*f*c-m*d*c+m*l*p-o*f*p-u*l*v+o*d*v,_=g*d*c-h*f*c-g*l*p+a*f*p+h*l*v-a*d*v,x=h*m*c-g*u*c+g*o*p-a*m*p-h*o*v+a*u*v,T=g*u*l-h*m*l-g*o*d+a*m*d+h*o*f-a*u*f,b=t*y+n*_+i*x+s*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/b;return e[0]=y*P,e[1]=(m*d*s-u*f*s-m*i*p+n*f*p+u*i*v-n*d*v)*P,e[2]=(o*f*s-m*l*s+m*i*c-n*f*c-o*i*v+n*l*v)*P,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*p-n*l*p)*P,e[4]=_*P,e[5]=(h*f*s-g*d*s+g*i*p-t*f*p-h*i*v+t*d*v)*P,e[6]=(g*l*s-a*f*s-g*i*c+t*f*c+a*i*v-t*l*v)*P,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*p+t*l*p)*P,e[8]=x*P,e[9]=(g*u*s-h*m*s-g*n*p+t*m*p+h*n*v-t*u*v)*P,e[10]=(a*m*s-g*o*s+g*n*c-t*m*c-a*n*v+t*o*v)*P,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*p-t*o*p)*P,e[12]=T*P,e[13]=(h*m*i-g*u*i+g*n*d-t*m*d-h*n*f+t*u*f)*P,e[14]=(g*o*i-a*m*i-g*n*l+t*m*l+a*n*f-t*o*f)*P,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,p=s*h,g=s*u,m=a*h,f=a*u,v=o*u,y=l*c,_=l*h,x=l*u,T=n.x,b=n.y,P=n.z;return i[0]=(1-(m+v))*T,i[1]=(p+x)*T,i[2]=(g-_)*T,i[3]=0,i[4]=(p-x)*b,i[5]=(1-(d+v))*b,i[6]=(f+y)*b,i[7]=0,i[8]=(g+_)*P,i[9]=(f-y)*P,i[10]=(1-(d+m))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=ys.set(i[0],i[1],i[2]).length(),a=ys.set(i[4],i[5],i[6]).length(),o=ys.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Ti.copy(this);let l=1/s,c=1/a,h=1/o;return Ti.elements[0]*=l,Ti.elements[1]*=l,Ti.elements[2]*=l,Ti.elements[4]*=c,Ti.elements[5]*=c,Ti.elements[6]*=c,Ti.elements[8]*=h,Ti.elements[9]*=h,Ti.elements[10]*=h,t.setFromRotationMatrix(Ti),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),g,m;if(l)g=s/(a-s),m=a*s/(a-s);else if(o===Qi)g=-(a+s)/(a-s),m=-2*a*s/(a-s);else{if(o!==va)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);g=-a/(a-s),m=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),g,m;if(l)g=1/(a-s),m=a/(a-s);else if(o===Qi)g=-2/(a-s),m=-(a+s)/(a-s);else{if(o!==va)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);g=-1/(a-s),m=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ys=new S,Ti=new st,Mf=new S(0,0,0),Tf=new S(1,1,1),fr=new S,no=new S,ti=new S,Su=new st,wu=new Rn,wi=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Su,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wu.setFromEuler(this),this.setFromQuaternion(wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wi.DEFAULT_ORDER="XYZ";var _a=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},bf=0,Eu=new S,_s=new Rn,Xi=new st,io=new S,aa=new S,Sf=new S,wf=new Rn,Au=new S(1,0,0),Cu=new S(0,1,0),Ru=new S(0,0,1),Iu={type:"added"},Ef={type:"removed"},xs={type:"childadded",child:null},Wl={type:"childremoved",child:null},pn=class r extends er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new S,t=new wi,n=new Rn,i=new S(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new st},normalMatrix:{value:new At}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(Au,e)}rotateY(e){return this.rotateOnAxis(Cu,e)}rotateZ(e){return this.rotateOnAxis(Ru,e)}translateOnAxis(e,t){return Eu.copy(e).applyQuaternion(this.quaternion),this.position.add(Eu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Au,e)}translateY(e){return this.translateOnAxis(Cu,e)}translateZ(e){return this.translateOnAxis(Ru,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?io.copy(e):io.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),aa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(aa,io,this.up):Xi.lookAt(io,aa,this.up),this.quaternion.setFromRotationMatrix(Xi),i&&(Xi.extractRotation(i.matrixWorld),_s.setFromRotationMatrix(Xi),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Iu),xs.child=e,this.dispatchEvent(xs),xs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ef),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Iu),xs.child=e,this.dispatchEvent(xs),xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(aa,e,Sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(aa,wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};pn.DEFAULT_UP=new S(0,1,0),pn.DEFAULT_MATRIX_AUTO_UPDATE=!0,pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bi=new S,ji=new S,Xl=new S,qi=new S,Ms=new S,Ts=new S,Pu=new S,jl=new S,ql=new S,Yl=new S,Zl=new Yt,Kl=new Yt,Jl=new Yt,Zi=class r{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),bi.subVectors(e,t),i.cross(bi);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){bi.subVectors(i,t),ji.subVectors(n,t),Xl.subVectors(e,t);let a=bi.dot(bi),o=bi.dot(ji),l=bi.dot(Xl),c=ji.dot(ji),h=ji.dot(Xl),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,qi)!==null&&qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,qi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,qi.x),l.addScaledVector(a,qi.y),l.addScaledVector(o,qi.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Zl.setScalar(0),Kl.setScalar(0),Jl.setScalar(0),Zl.fromBufferAttribute(e,t),Kl.fromBufferAttribute(e,n),Jl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Zl,s.x),a.addScaledVector(Kl,s.y),a.addScaledVector(Jl,s.z),a}static isFrontFacing(e,t,n,i){return bi.subVectors(n,t),ji.subVectors(e,t),bi.cross(ji).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),.5*bi.cross(ji).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Ms.subVectors(i,n),Ts.subVectors(s,n),jl.subVectors(e,n);let l=Ms.dot(jl),c=Ts.dot(jl);if(l<=0&&c<=0)return t.copy(n);ql.subVectors(e,i);let h=Ms.dot(ql),u=Ts.dot(ql);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ms,a);Yl.subVectors(e,s);let p=Ms.dot(Yl),g=Ts.dot(Yl);if(g>=0&&p<=g)return t.copy(s);let m=p*c-l*g;if(m<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ts,o);let f=h*g-p*u;if(f<=0&&u-h>=0&&p-g>=0)return Pu.subVectors(s,i),o=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(Pu,o);let v=1/(f+m+d);return a=m*v,o=d*v,t.copy(n).addScaledVector(Ms,a).addScaledVector(Ts,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mr={h:0,s:0,l:0},ro={h:0,s:0,l:0};function $l(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,zt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=zt.workingColorSpace){return this.r=e,this.g=t,this.b=n,zt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=zt.workingColorSpace){if(e=vc(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=$l(a,s,e+1/3),this.g=$l(a,s,e),this.b=$l(a,s,e-1/3)}return zt.colorSpaceToWorking(this,i),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=Qd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=Cs(e.r),this.g=Cs(e.g),this.b=Cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return zt.workingToColorSpace(zn.copy(this),e),65536*Math.round(Nt(255*zn.r,0,255))+256*Math.round(Nt(255*zn.g,0,255))+Math.round(Nt(255*zn.b,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zt.workingColorSpace){zt.workingToColorSpace(zn.copy(this),t);let n=zn.r,i=zn.g,s=zn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=zt.workingColorSpace){return zt.workingToColorSpace(zn.copy(this),t),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=yt){zt.workingToColorSpace(zn.copy(this),e);let t=zn.r,n=zn.g,i=zn.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(mr),this.setHSL(mr.h+e,mr.s+t,mr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mr),e.getHSL(ro);let n=pa(mr.h,ro.h,t),i=pa(mr.s,ro.s,t),s=pa(mr.l,ro.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zn=new Ye;Ye.NAMES=Qd;var Af=0,qn=class extends er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Or,this.stencilZFail=Or,this.stencilZPass=Or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Or&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Or&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Or&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},yn=class extends qn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},q0=Cf();function Cf(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,i[l]=24,i[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,i[l]=-c-1,i[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,i[l]=13,i[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,i[l]=24,i[256|l]=24):(n[l]=31744,n[256|l]=64512,i[l]=13,i[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Sn=new S,so=new _e,Rf=0,fn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ro,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)so.fromBufferAttribute(this,t),so.applyMatrix3(e),this.setXY(t,so.x,so.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix3(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Si(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Si(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Si(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Si(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),e}};var Vr=class extends fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var xa=class extends fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Re=class extends fn{constructor(e,t,n){super(new Float32Array(e),t,n)}},If=0,hi=new st,Ql=new pn,bs=new S,ni=new Mn,oa=new Mn,Dn=new S,ht=class r extends er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?xa:Vr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new At().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Re(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];ni.setFromBufferAttribute(s),this.morphTargetsRelative?(Dn.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(Dn),Dn.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(Dn)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new S,1/0);if(e){let n=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];oa.setFromBufferAttribute(o),this.morphTargetsRelative?(Dn.addVectors(ni.min,oa.min),ni.expandByPoint(Dn),Dn.addVectors(ni.max,oa.max),ni.expandByPoint(Dn)):(ni.expandByPoint(oa.min),ni.expandByPoint(oa.max))}ni.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Dn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Dn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Dn.fromBufferAttribute(o,c),l&&(bs.fromBufferAttribute(e,c),Dn.add(bs)),i=Math.max(i,n.distanceToSquared(Dn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let B=0;B<n.count;B++)o[B]=new S,l[B]=new S;let c=new S,h=new S,u=new S,d=new _e,p=new _e,g=new _e,m=new S,f=new S;function v(B,U,F){c.fromBufferAttribute(n,B),h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,F),d.fromBufferAttribute(s,B),p.fromBufferAttribute(s,U),g.fromBufferAttribute(s,F),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(m.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(R),f.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),o[B].add(m),o[U].add(m),o[F].add(m),l[B].add(f),l[U].add(f),l[F].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let B=0,U=y.length;B<U;++B){let F=y[B],R=F.start;for(let L=R,q=R+F.count;L<q;L+=3)v(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let _=new S,x=new S,T=new S,b=new S;function P(B){T.fromBufferAttribute(i,B),b.copy(T);let U=o[B];_.copy(U),_.sub(T.multiplyScalar(T.dot(U))).normalize(),x.crossVectors(b,U);let F=x.dot(l[B])<0?-1:1;a.setXYZW(B,_.x,_.y,_.z,F)}for(let B=0,U=y.length;B<U;++B){let F=y[B],R=F.start;for(let L=R,q=R+F.count;L<q;L+=3)P(e.getX(L+0)),P(e.getX(L+1)),P(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new S,s=new S,a=new S,o=new S,l=new S,c=new S,h=new S,u=new S;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),m=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dn.fromBufferAttribute(e,t),Dn.normalize(),e.setXYZ(t,Dn.x,Dn.y,Dn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let m=0,f=l.length;m<f;m++){p=o.isInterleavedBufferAttribute?l[m]*o.data.stride+o.offset:l[m]*h;for(let v=0;v<h;v++)d[g++]=c[p++]}return new fn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=e(i[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lu=new st,Ur=new kr,ao=new jn,Du=new S,oo=new S,lo=new S,co=new S,ec=new S,ho=new S,Nu=new S,uo=new S,at=class extends pn{constructor(e=new ht,t=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){ho.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(ec.fromBufferAttribute(u,e),a?ho.addScaledVector(ec,h):ho.addScaledVector(ec.sub(t),h))}t.add(ho)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(s),Ur.copy(e.ray).recast(e.near),ao.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(ao,Du)===null||Ur.origin.distanceToSquared(Du)>(e.far-e.near)**2))return;Lu.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Lu),n.boundingBox!==null&&Ur.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Ur)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let f=d[g],v=a[f.materialIndex];for(let y=Math.max(f.start,p.start),_=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));y<_;y+=3)i=po(this,v,e,n,c,h,u,o.getX(y),o.getX(y+1),o.getX(y+2)),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);g<m;g+=3)i=po(this,a,e,n,c,h,u,o.getX(g),o.getX(g+1),o.getX(g+2)),i&&(i.faceIndex=Math.floor(g/3),t.push(i));else if(l!==void 0)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let f=d[g],v=a[f.materialIndex];for(let y=Math.max(f.start,p.start),_=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));y<_;y+=3)i=po(this,v,e,n,c,h,u,y,y+1,y+2),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let g=Math.max(0,p.start),m=Math.min(l.count,p.start+p.count);g<m;g+=3)i=po(this,a,e,n,c,h,u,g,g+1,g+2),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}};function po(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,oo),r.getVertexPosition(l,lo),r.getVertexPosition(c,co);let h=(function(u,d,p,g,m,f,v,y){let _;if(_=d.side===1?g.intersectTriangle(v,f,m,!0,y):g.intersectTriangle(m,f,v,d.side===0,y),_===null)return null;uo.copy(y),uo.applyMatrix4(u.matrixWorld);let x=p.ray.origin.distanceTo(uo);return x<p.near||x>p.far?null:{distance:x,point:uo.clone(),object:u}})(r,e,t,n,oo,lo,co,Nu);if(h){let u=new S;Zi.getBarycoord(Nu,oo,lo,co,u),i&&(h.uv=Zi.getInterpolatedAttribute(i,o,l,c,u,new _e)),s&&(h.uv1=Zi.getInterpolatedAttribute(s,o,l,c,u,new _e)),a&&(h.normal=Zi.getInterpolatedAttribute(a,o,l,c,u,new S),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new S,materialIndex:0};Zi.getNormal(oo,lo,co,d.normal),h.face=d,h.barycoord=u}return h}var nt=class r extends ht{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;function g(m,f,v,y,_,x,T,b,P,B,U){let F=x/P,R=T/B,L=x/2,q=T/2,W=b/2,$=P+1,ae=B+1,Z=0,oe=0,De=new S;for(let Oe=0;Oe<ae;Oe++){let Me=Oe*R-q;for(let Ge=0;Ge<$;Ge++){let Ce=Ge*F-L;De[m]=Ce*y,De[f]=Me*_,De[v]=W,c.push(De.x,De.y,De.z),De[m]=0,De[f]=0,De[v]=b>0?1:-1,h.push(De.x,De.y,De.z),u.push(Ge/P),u.push(1-Oe/B),Z+=1}}for(let Oe=0;Oe<B;Oe++)for(let Me=0;Me<P;Me++){let Ge=d+Me+$*Oe,Ce=d+Me+$*(Oe+1),Ne=d+(Me+1)+$*(Oe+1),te=d+(Me+1)+$*Oe;l.push(Ge,Ce,te),l.push(Ce,Ne,te),oe+=6}o.addGroup(p,oe,U),p+=oe,d+=Z}g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function rs(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Hn(r){let e={};for(let t=0;t<r.length;t++){let n=rs(r[t]);for(let i in n)e[i]=n[i]}return e}function vh(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:zt.workingColorSpace}var ep={clone:rs,merge:Hn},$n=class extends qn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ds=class extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},gr=new S,Uu=new _e,Bu=new _e,sn=class extends Ds{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Gr*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*As*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Gr*Math.atan(Math.tan(.5*As*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gr.x,gr.y).multiplyScalar(-e/gr.z),gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gr.x,gr.y).multiplyScalar(-e/gr.z)}getViewSize(e,t){return this.getViewBounds(e,Uu,Bu),t.subVectors(Bu,Uu)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*As*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ss=-90,Do=class extends pn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new sn(Ss,1,e,t);i.layers=this.layers,this.add(i);let s=new sn(Ss,1,e,t);s.layers=this.layers,this.add(s);let a=new sn(Ss,1,e,t);a.layers=this.layers,this.add(a);let o=new sn(Ss,1,e,t);o.layers=this.layers,this.add(o);let l=new sn(Ss,1,e,t);l.layers=this.layers,this.add(l);let c=new sn(Ss,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Qi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==va)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ma=class extends Cn{constructor(e=[],t=301,n,i,s,a,o,l,c,h){super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},No=class extends di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ma(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new nt(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new at(i,s),o=t.minFilter;return t.minFilter===ei&&(t.minFilter=Nn),new Do(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Fe=class extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Pf={type:"move"},Ns=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let m of e.hand.values()){let f=t.getJointPose(m,n),v=this._getHandJoint(c,m);f!==null&&(v.matrix.fromArray(f.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=f.radius),v.visible=f!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Fe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Gn=class extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Us=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ro,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xn=new S,Bs=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix4(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyNormalMatrix(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.transformDirection(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Si(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Si(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Si(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Si(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),i=tn(i,this.array),s=tn(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new fn(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Y0=new S,Z0=new S,K0=new S,J0=new _e,$0=new _e,Q0=new st,eg=new S,tg=new S,ng=new S,ig=new _e,rg=new _e,sg=new _e;var ag=new S,og=new S;var Ou=new S,Fu=new Yt,zu=new Yt,Lf=new S,Gu=new st,fo=new S,tc=new jn,ku=new st,nc=new kr,Hr=class extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=pc,this.bindMatrix=new st,this.bindMatrixInverse=new st,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fo),this.boundingBox.expandByPoint(fo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fo),this.boundingSphere.expandByPoint(fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tc.copy(this.boundingSphere),tc.applyMatrix4(i),e.ray.intersectsSphere(tc)!==!1&&(ku.copy(i).invert(),nc.copy(e.ray).applyMatrix4(ku),this.boundingBox!==null&&nc.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,nc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===pc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Fu.fromBufferAttribute(i.attributes.skinIndex,e),zu.fromBufferAttribute(i.attributes.skinWeight,e),Ou.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=zu.getComponent(s);if(a!==0){let o=Fu.getComponent(s);Gu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Lf.copy(Ou).applyMatrix4(Gu),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},yr=class extends pn{constructor(){super(),this.isBone=!0,this.type="Bone"}},tr=class extends Cn{constructor(e=null,t=1,n=1,i,s,a,o,l,c=1003,h=1003,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vu=new st,Df=new st,Wr=class r{constructor(e=[],t=[]){this.uuid=ui(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new st)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new st;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Df;Vu.multiplyMatrices(o,t[s]),Vu.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new tr(t,e,e,mi,fi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new yr),this.bones.push(a),this.boneInverses.push(new st().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},_r=class extends fn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ws=new st,Hu=new st,mo=[],Wu=new Mn,Nf=new st,la=new at,ca=new jn,Xr=class extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _r(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Nf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ws),Wu.copy(e.boundingBox).applyMatrix4(ws),this.boundingBox.union(Wu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ws),ca.copy(e.boundingSphere).applyMatrix4(ws),this.boundingSphere.union(ca)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(la.geometry=this.geometry,la.material=this.material,la.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ca.copy(this.boundingSphere),ca.applyMatrix4(n),e.ray.intersectsSphere(ca)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ws),Hu.multiplyMatrices(n,ws),la.matrixWorld=Hu,la.raycast(e,mo);for(let a=0,o=mo.length;a<o;a++){let l=mo[a];l.instanceId=s,l.object=this,t.push(l)}mo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _r(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new tr(new Float32Array(i*this.count),i,this.count,vl,fi));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ic=new S,Uf=new S,Bf=new At,Ii=class{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ic.subVectors(n,t).cross(Uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ic),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Bf.getNormalMatrix(e),i=this.coplanarPoint(ic).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Br=new jn,Of=new _e(.5,.5),go=new S,xr=class{constructor(e=new Ii,t=new Ii,n=new Ii,i=new Ii,s=new Ii,a=new Ii){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],p=s[7],g=s[8],m=s[9],f=s[10],v=s[11],y=s[12],_=s[13],x=s[14],T=s[15];if(i[0].setComponents(c-a,p-h,v-g,T-y).normalize(),i[1].setComponents(c+a,p+h,v+g,T+y).normalize(),i[2].setComponents(c+o,p+u,v+m,T+_).normalize(),i[3].setComponents(c-o,p-u,v-m,T-_).normalize(),n)i[4].setComponents(l,d,f,x).normalize(),i[5].setComponents(c-l,p-d,v-f,T-x).normalize();else if(i[4].setComponents(c-l,p-d,v-f,T-x).normalize(),t===Qi)i[5].setComponents(c+l,p+d,v+f,T+x).normalize();else{if(t!==va)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(l,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Br.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Br)}intersectsSprite(e){Br.center.set(0,0,0);let t=Of.distanceTo(e.center);return Br.radius=.7071067811865476+t,Br.applyMatrix4(e.matrixWorld),this.intersectsSphere(Br)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(go.x=i.normal.x>0?e.max.x:e.min.x,go.y=i.normal.y>0?e.max.y:e.min.y,go.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ci=new st,Ri=new xr,Uo=class r{constructor(){this.coordinateSystem=Qi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ri.setFromProjectionMatrix(Ci,i.coordinateSystem,i.reversedDepth),Ri.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ri.setFromProjectionMatrix(Ci,i.coordinateSystem,i.reversedDepth),Ri.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ri.setFromProjectionMatrix(Ci,i.coordinateSystem,i.reversedDepth),Ri.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ri.setFromProjectionMatrix(Ci,i.coordinateSystem,i.reversedDepth),Ri.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ci.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ri.setFromProjectionMatrix(Ci,i.coordinateSystem,i.reversedDepth),Ri.containsPoint(e))return!0}return!1}clone(){return new r}};var yc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},lg=new st,cg=new Ye(1,1,1),hg=new xr,ug=new Uo,dg=new Mn,pg=new jn,fg=new S,mg=new S,gg=new S,vg=new yc,yg=new at;var Mr=class extends qn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Bo=new S,Oo=new S,Xu=new st,ha=new kr,vo=new jn,rc=new S,ju=new S,jr=class extends pn{constructor(e=new ht,t=new Mr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Bo.fromBufferAttribute(t,i-1),Oo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Bo.distanceTo(Oo);e.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(i),vo.radius+=s,e.ray.intersectsSphere(vo)===!1)return;Xu.copy(i).invert(),ha.copy(e.ray).applyMatrix4(Xu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,m=p-1;g<m;g+=c){let f=h.getX(g),v=h.getX(g+1),y=yo(this,e,ha,l,f,v,g);y&&t.push(y)}if(this.isLineLoop){let g=h.getX(p-1),m=h.getX(d),f=yo(this,e,ha,l,g,m,p-1);f&&t.push(f)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,m=p-1;g<m;g+=c){let f=yo(this,e,ha,l,g,g+1,g);f&&t.push(f)}if(this.isLineLoop){let g=yo(this,e,ha,l,p-1,d,p-1);g&&t.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function yo(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(Bo.fromBufferAttribute(o,i),Oo.fromBufferAttribute(o,s),t.distanceSqToSegment(Bo,Oo,rc,ju)>n)return;rc.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(rc);return l<e.near||l>e.far?void 0:{distance:l,point:ju.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var qu=new S,Yu=new S,qr=class extends jr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)qu.fromBufferAttribute(t,i),Yu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+qu.distanceTo(Yu);e.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ta=class extends jr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Os=class extends qn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Zu=new st,_c=new kr,_o=new jn,xo=new S,ba=class extends pn{constructor(e=new ht,t=new Os){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(i),_o.radius+=s,e.ray.intersectsSphere(_o)===!1)return;Zu.copy(i).invert(),_c.copy(e.ray).applyMatrix4(Zu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);u<d;u++){let p=c.getX(u);xo.fromBufferAttribute(h,p),Ku(xo,p,l,i,e,t,this)}else for(let u=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);u<d;u++)xo.fromBufferAttribute(h,u),Ku(xo,u,l,i,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Ku(r,e,t,n,i,s,a){let o=_c.distanceSqToPoint(r);if(o<t){let l=new S;_c.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Xt=class extends Cn{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sa=class extends Cn{constructor(e,t,n=1014,i,s,a,o=1003,l=1003,c,h=1026,u=1){if(h!==Va&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ls(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},wa=class extends Cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Fs=class r extends ht{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,g=2*n+s,m=i+1,f=new S,v=new S;for(let y=0;y<=g;y++){let _=0,x=0,T=0,b=0;if(y<=n){let U=y/n,F=U*Math.PI/2;x=-h-e*Math.cos(F),T=e*Math.sin(F),b=-e*Math.cos(F),_=U*u}else if(y<=n+s){let U=(y-n)/s;x=U*t-h,T=e,b=0,_=u+U*d}else{let U=(y-n-s)/n,F=U*Math.PI/2;x=h+e*Math.sin(F),T=e*Math.cos(F),b=e*Math.sin(F),_=u+d+U*u}let P=Math.max(0,Math.min(1,_/p)),B=0;y===0?B=.5/i:y===g&&(B=-.5/i);for(let U=0;U<=i;U++){let F=U/i,R=F*Math.PI*2,L=Math.sin(R),q=Math.cos(R);v.x=-T*q,v.y=x,v.z=T*L,o.push(v.x,v.y,v.z),f.set(-T*q,b,T*L),f.normalize(),l.push(f.x,f.y,f.z),c.push(F+B,P)}if(y>0){let U=(y-1)*m;for(let F=0;F<i;F++){let R=U+F,L=U+F+1,q=y*m+F,W=y*m+F+1;a.push(R,L,q),a.push(L,W,q)}}}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Qn=class r extends ht{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new S,h=new _e;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("normal",new Re(o,3)),this.setAttribute("uv",new Re(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Qe=class r extends ht{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],g=0,m=[],f=n/2,v=0;function y(_){let x=g,T=new _e,b=new S,P=0,B=_===!0?e:t,U=_===!0?1:-1;for(let R=1;R<=i;R++)u.push(0,f*U,0),d.push(0,U,0),p.push(.5,.5),g++;let F=g;for(let R=0;R<=i;R++){let L=R/i*l+o,q=Math.cos(L),W=Math.sin(L);b.x=B*W,b.y=f*U,b.z=B*q,u.push(b.x,b.y,b.z),d.push(0,U,0),T.x=.5*q+.5,T.y=.5*W*U+.5,p.push(T.x,T.y),g++}for(let R=0;R<i;R++){let L=x+R,q=F+R;_===!0?h.push(q,q+1,L):h.push(q+1,q,L),P+=3}c.addGroup(v,P,_===!0?1:2),v+=P}(function(){let _=new S,x=new S,T=0,b=(t-e)/n;for(let P=0;P<=s;P++){let B=[],U=P/s,F=U*(t-e)+e;for(let R=0;R<=i;R++){let L=R/i,q=L*l+o,W=Math.sin(q),$=Math.cos(q);x.x=F*W,x.y=-U*n+f,x.z=F*$,u.push(x.x,x.y,x.z),_.set(W,b,$).normalize(),d.push(_.x,_.y,_.z),p.push(L,1-U),B.push(g++)}m.push(B)}for(let P=0;P<i;P++)for(let B=0;B<s;B++){let U=m[B][P],F=m[B+1][P],R=m[B+1][P+1],L=m[B][P+1];(e>0||B!==0)&&(h.push(U,F,L),T+=3),(t>0||B!==s-1)&&(h.push(F,R,L),T+=3)}c.addGroup(v,T,0),v+=T})(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},zs=class r extends Qe{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Tr=class r extends ht{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(p,g,m,f){let v=f+1,y=[];for(let _=0;_<=v;_++){y[_]=[];let x=p.clone().lerp(m,_/v),T=g.clone().lerp(m,_/v),b=v-_;for(let P=0;P<=b;P++)y[_][P]=P===0&&_===v?x:x.clone().lerp(T,P/b)}for(let _=0;_<v;_++)for(let x=0;x<2*(v-_)-1;x++){let T=Math.floor(x/2);x%2==0?(l(y[_][T+1]),l(y[_+1][T]),l(y[_][T])):(l(y[_][T+1]),l(y[_+1][T+1]),l(y[_+1][T]))}}function l(p){s.push(p.x,p.y,p.z)}function c(p,g){let m=3*p;g.x=e[m+0],g.y=e[m+1],g.z=e[m+2]}function h(p,g,m,f){f<0&&p.x===1&&(a[g]=p.x-1),m.x===0&&m.z===0&&(a[g]=f/2/Math.PI+.5)}function u(p){return Math.atan2(p.z,-p.x)}function d(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let g=new S,m=new S,f=new S;for(let v=0;v<t.length;v+=3)c(t[v+0],g),c(t[v+1],m),c(t[v+2],f),o(g,m,f,p)})(i),(function(p){let g=new S;for(let m=0;m<s.length;m+=3)g.x=s[m+0],g.y=s[m+1],g.z=s[m+2],g.normalize().multiplyScalar(p),s[m+0]=g.x,s[m+1]=g.y,s[m+2]=g.z})(n),(function(){let p=new S;for(let g=0;g<s.length;g+=3){p.x=s[g+0],p.y=s[g+1],p.z=s[g+2];let m=u(p)/2/Math.PI+.5,f=d(p)/Math.PI+.5;a.push(m,1-f)}(function(){let g=new S,m=new S,f=new S,v=new S,y=new _e,_=new _e,x=new _e;for(let T=0,b=0;T<s.length;T+=9,b+=6){g.set(s[T+0],s[T+1],s[T+2]),m.set(s[T+3],s[T+4],s[T+5]),f.set(s[T+6],s[T+7],s[T+8]),y.set(a[b+0],a[b+1]),_.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),v.copy(g).add(m).add(f).divideScalar(3);let P=u(v);h(y,b+0,g,P),h(_,b+2,m,P),h(x,b+4,f,P)}})(),(function(){for(let g=0;g<a.length;g+=6){let m=a[g+0],f=a[g+2],v=a[g+4],y=Math.max(m,f,v),_=Math.min(m,f,v);y>.9&&_<.1&&(m<.2&&(a[g+0]+=1),f<.2&&(a[g+2]+=1),v<.2&&(a[g+4]+=1))}})()})(),this.setAttribute("position",new Re(s,3)),this.setAttribute("normal",new Re(s.slice(),3)),this.setAttribute("uv",new Re(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},Fo=class r extends Tr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Mo=new S,To=new S,sc=new S,bo=new Zi,zo=class extends ht{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(As*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:m,b:f,c:v}=bo;if(m.fromBufferAttribute(o,c[0]),f.fromBufferAttribute(o,c[1]),v.fromBufferAttribute(o,c[2]),bo.getNormal(sc),u[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let y=0;y<3;y++){let _=(y+1)%3,x=u[y],T=u[_],b=bo[h[y]],P=bo[h[_]],B=`${x}_${T}`,U=`${T}_${x}`;U in d&&d[U]?(sc.dot(d[U].normal)<=s&&(p.push(b.x,b.y,b.z),p.push(P.x,P.y,P.z)),d[U]=null):B in d||(d[B]={index0:c[y],index1:c[_],normal:sc.clone()})}}for(let g in d)if(d[g]){let{index0:m,index1:f}=d[g];Mo.fromBufferAttribute(o,m),To.fromBufferAttribute(o,f),p.push(Mo.x,Mo.y,Mo.z),p.push(To.x,To.y,To.z)}this.setAttribute("position",new Re(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},ri=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(i=Math.floor(l+(c-l)/2),o=n[i]-a,o<0)l=i+1;else{if(!(o>0)){c=i;break}c=i-1}if(i=c,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new _e:new S);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new S,i=[],s=[],a=[],o=new S,l=new st;for(let p=0;p<=e;p++){let g=p/e;i[p]=this.getTangentAt(g,new S)}s[0]=new S,a[0]=new S;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Nt(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(Nt(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Gs=class extends ri{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new _e){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Go=class extends Gs{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function yh(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var So=new S,ac=new yh,oc=new yh,lc=new yh,wt=class extends ri{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new S){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=i[(c-1)%s]:(So.subVectors(i[0],i[1]).add(i[0]),o=So);let u=i[c%s],d=i[(c+1)%s];if(this.closed||c+2<s?l=i[(c+2)%s]:(So.subVectors(i[s-1],i[s-2]).add(i[s-1]),l=So),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(o.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(d),p),f=Math.pow(d.distanceToSquared(l),p);m<1e-4&&(m=1),g<1e-4&&(g=m),f<1e-4&&(f=m),ac.initNonuniformCatmullRom(o.x,u.x,d.x,l.x,g,m,f),oc.initNonuniformCatmullRom(o.y,u.y,d.y,l.y,g,m,f),lc.initNonuniformCatmullRom(o.z,u.z,d.z,l.z,g,m,f)}else this.curveType==="catmullrom"&&(ac.initCatmullRom(o.x,u.x,d.x,l.x,this.tension),oc.initCatmullRom(o.y,u.y,d.y,l.y,this.tension),lc.initCatmullRom(o.z,u.z,d.z,l.z,this.tension));return n.set(ac.calc(h),oc.calc(h),lc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new S().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ju(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function fa(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function ma(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Ea=class extends ri{constructor(e=new _e,t=new _e,n=new _e,i=new _e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new _e){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ma(e,i.x,s.x,a.x,o.x),ma(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ko=class extends ri{constructor(e=new S,t=new S,n=new S,i=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new S){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ma(e,i.x,s.x,a.x,o.x),ma(e,i.y,s.y,a.y,o.y),ma(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Aa=class extends ri{constructor(e=new _e,t=new _e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new _e){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vo=class extends ri{constructor(e=new S,t=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new S){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends ri{constructor(e=new _e,t=new _e,n=new _e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new _e){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(fa(e,i.x,s.x,a.x),fa(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ra=class extends ri{constructor(e=new S,t=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(fa(e,i.x,s.x,a.x),fa(e,i.y,s.y,a.y),fa(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ia=class extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new _e){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Ju(o,l.x,c.x,h.x,u.x),Ju(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new _e().fromArray(i))}return this}},Ho=Object.freeze({__proto__:null,ArcCurve:Go,CatmullRomCurve3:wt,CubicBezierCurve:Ea,CubicBezierCurve3:ko,EllipseCurve:Gs,LineCurve:Aa,LineCurve3:Vo,QuadraticBezierCurve:Ca,QuadraticBezierCurve3:Ra,SplineCurve:Ia}),Wo=class extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ho[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ho[i.type]().fromJSON(i))}return this}},kn=class extends Wo{constructor(e){super(),this.type="Path",this.currentPoint=new _e,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Aa(this.currentPoint.clone(),new _e(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Ca(this.currentPoint.clone(),new _e(e,t),new _e(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Ea(this.currentPoint.clone(),new _e(e,t),new _e(n,i),new _e(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ia(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new Gs(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},jt=class extends kn{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new kn().fromJSON(i))}return this}};function Ff(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=$u(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,u,d,p){let g=[];for(let m=0,f=u.length;m<f;m++){let v=$u(h,u[m]*p,m<f-1?u[m+1]*p:h.length,p,!1);v===v.next&&(v.steiner=!0),g.push(jf(v))}g.sort(Hf);for(let m=0;m<g.length;m++)d=Wf(g[m],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let p=r[d],g=r[d+1];p<o&&(o=p),g<l&&(l=g),p>h&&(h=p),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Pa(s,a,t,o,l,c,0),a}function $u(r,e,t,n,i){let s;if(i===(function(a,o,l,c){let h=0;for(let u=o,d=l-c;u<l;u+=c)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Qu(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Qu(a/n|0,r[a],r[a+1],s);return s&&ks(s,s.next)&&(Da(s),s=s.next),s}function Yr(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!ks(n,n.next)&&mn(n.prev,n,n.next)!==0)n=n.next;else{if(Da(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Pa(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(l,c,h,u){let d=l;do d.z===0&&(d.z=xc(d.x,d.y,c,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==l);d.prevZ.nextZ=null,d.prevZ=null,(function(p){let g,m=1;do{let f,v=p;p=null;let y=null;for(g=0;v;){g++;let _=v,x=0;for(let b=0;b<m&&(x++,_=_.nextZ,_);b++);let T=m;for(;x>0||T>0&&_;)x!==0&&(T===0||!_||v.z<=_.z)?(f=v,v=v.nextZ,x--):(f=_,_=_.nextZ,T--),y?y.nextZ=f:p=f,f.prevZ=y,y=f;v=_}y.nextZ=null,m*=2}while(g>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let l=r.prev,c=r.next;if(s?Gf(r,n,i,s):zf(r))e.push(l.i,r.i,c.i),Da(r),r=c.next,o=c.next;else if((r=c)===o){a?a===1?Pa(r=kf(Yr(r),e),e,t,n,i,s,2):a===2&&Vf(r,e,t,n,i,s):Pa(Yr(r),e,t,n,i,s,1);break}}}function zf(r){let e=r.prev,t=r,n=r.next;if(mn(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,s,a),u=Math.min(o,l,c),d=Math.max(i,s,a),p=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&da(i,o,s,l,a,c,g.x,g.y)&&mn(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Gf(r,e,t,n){let i=r.prev,s=r,a=r.next;if(mn(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,p=Math.min(o,l,c),g=Math.min(h,u,d),m=Math.max(o,l,c),f=Math.max(h,u,d),v=xc(p,g,e,t,n),y=xc(m,f,e,t,n),_=r.prevZ,x=r.nextZ;for(;_&&_.z>=v&&x&&x.z<=y;){if(_.x>=p&&_.x<=m&&_.y>=g&&_.y<=f&&_!==i&&_!==a&&da(o,h,l,u,c,d,_.x,_.y)&&mn(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=p&&x.x<=m&&x.y>=g&&x.y<=f&&x!==i&&x!==a&&da(o,h,l,u,c,d,x.x,x.y)&&mn(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=v;){if(_.x>=p&&_.x<=m&&_.y>=g&&_.y<=f&&_!==i&&_!==a&&da(o,h,l,u,c,d,_.x,_.y)&&mn(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=p&&x.x<=m&&x.y>=g&&x.y<=f&&x!==i&&x!==a&&da(o,h,l,u,c,d,x.x,x.y)&&mn(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function kf(r,e){let t=r;do{let n=t.prev,i=t.next.next;!ks(n,i)&&np(n,t,t.next,i)&&La(n,i)&&La(i,n)&&(e.push(n.i,t.i,i.i),Da(t),Da(t.next),t=r=i),t=t.next}while(t!==r);return Yr(t)}function Vf(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qf(a,o)){let l=ip(a,o);return a=Yr(a,a.next),l=Yr(l,l.next),Pa(a,e,t,n,i,s,0),void Pa(l,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function Hf(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Wf(r,e){let t=(function(i,s){let a=s,o=i.x,l=i.y,c,h=-1/0;if(ks(i,a))return a;do{if(ks(i,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let m=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(m<=o&&m>h&&(h=m,c=a.x<a.next.x?a:a.next,m===o))return c}a=a.next}while(a!==s);if(!c)return null;let u=c,d=c.x,p=c.y,g=1/0;a=c;do{if(o>=a.x&&a.x>=d&&o!==a.x&&tp(l<p?o:h,l,d,p,l<p?h:o,l,a.x,a.y)){let m=Math.abs(l-a.y)/(o-a.x);La(a,i)&&(m<g||m===g&&(a.x>c.x||a.x===c.x&&Xf(c,a)))&&(c=a,g=m)}a=a.next}while(a!==u);return c})(r,e);if(!t)return e;let n=ip(t,r);return Yr(n,n.next),Yr(t,t.next)}function Xf(r,e){return mn(r.prev,r,e.prev)<0&&mn(e.next,r,r.next)<0}function xc(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function jf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function tp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function da(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&tp(r,e,t,n,i,s,a,o)}function qf(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&np(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(La(r,e)&&La(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(mn(r.prev,r,e.prev)||mn(r,e.prev,e))||ks(r,e)&&mn(r.prev,r,r.next)>0&&mn(e.prev,e,e.next)>0)}function mn(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ks(r,e){return r.x===e.x&&r.y===e.y}function np(r,e,t,n){let i=Eo(mn(r,e,t)),s=Eo(mn(r,e,n)),a=Eo(mn(t,n,r)),o=Eo(mn(t,n,e));return i!==s&&a!==o||!(i!==0||!wo(r,t,e))||!(s!==0||!wo(r,n,e))||!(a!==0||!wo(t,r,n))||!(o!==0||!wo(t,e,n))}function wo(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Eo(r){return r>0?1:r<0?-1:0}function La(r,e){return mn(r.prev,r,r.next)<0?mn(r,e,r.next)>=0&&mn(r,r.prev,e)>=0:mn(r,e,r.prev)<0||mn(r,r.next,e)<0}function ip(r,e){let t=Mc(r.i,r.x,r.y),n=Mc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Qu(r,e,t,n){let i=Mc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Da(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Mc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Tc=class{static triangulate(e,t,n=2){return Ff(e,t,n)}},Pi=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];ed(e),td(n,e);let a=e.length;t.forEach(ed);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,td(n,t[l]);let o=Tc.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function ed(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function td(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Vt=class r extends ht{constructor(e=new jt([new _e(.5,.5),new _e(-.5,.5),new _e(-.5,-.5),new _e(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,v=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Yf,_,x,T,b,P,B=!1;v&&(_=v.getSpacedPoints(h),B=!0,d=!1,x=v.computeFrenetFrames(h,!1),T=new S,b=new S,P=new S),d||(f=0,p=0,g=0,m=0);let U=o.extractPoints(c),F=U.shape,R=U.holes;if(!Pi.isClockWise(F)){F=F.reverse();for(let H=0,w=R.length;H<w;H++){let N=R[H];Pi.isClockWise(N)&&(R[H]=N.reverse())}}function L(H){let w=10000000000000001e-36,N=H[0];for(let j=1;j<=H.length;j++){let V=j%H.length,pe=H[V],ne=pe.x-N.x,ie=pe.y-N.y,Ee=ne*ne+ie*ie,We=Math.max(Math.abs(pe.x),Math.abs(pe.y),Math.abs(N.x),Math.abs(N.y));Ee<=w*We*We?(H.splice(V,1),j--):N=pe}}L(F),R.forEach(L);let q=R.length,W=F;for(let H=0;H<q;H++){let w=R[H];F=F.concat(w)}function $(H,w,N){return w||console.error("THREE.ExtrudeGeometry: vec does not exist"),H.clone().addScaledVector(w,N)}let ae=F.length;function Z(H,w,N){let j,V,pe,ne=H.x-w.x,ie=H.y-w.y,Ee=N.x-H.x,We=N.y-H.y,Ie=ne*ne+ie*ie,Je=ne*We-ie*Ee;if(Math.abs(Je)>Number.EPSILON){let ut=Math.sqrt(Ie),ft=Math.sqrt(Ee*Ee+We*We),It=w.x-ie/ut,St=w.y+ne/ut,_t=((N.x-We/ft-It)*We-(N.y+Ee/ft-St)*Ee)/(ne*We-ie*Ee);j=It+ne*_t-H.x,V=St+ie*_t-H.y;let z=j*j+V*V;if(z<=2)return new _e(j,V);pe=Math.sqrt(z/2)}else{let ut=!1;ne>Number.EPSILON?Ee>Number.EPSILON&&(ut=!0):ne<-Number.EPSILON?Ee<-Number.EPSILON&&(ut=!0):Math.sign(ie)===Math.sign(We)&&(ut=!0),ut?(j=-ie,V=ne,pe=Math.sqrt(Ie)):(j=ne,V=ie,pe=Math.sqrt(Ie/2))}return new _e(j/pe,V/pe)}let oe=[];for(let H=0,w=W.length,N=w-1,j=H+1;H<w;H++,N++,j++)N===w&&(N=0),j===w&&(j=0),oe[H]=Z(W[H],W[N],W[j]);let De=[],Oe,Me,Ge=oe.concat();for(let H=0,w=q;H<w;H++){let N=R[H];Oe=[];for(let j=0,V=N.length,pe=V-1,ne=j+1;j<V;j++,pe++,ne++)pe===V&&(pe=0),ne===V&&(ne=0),Oe[j]=Z(N[j],N[pe],N[ne]);De.push(Oe),Ge=Ge.concat(Oe)}if(f===0)Me=Pi.triangulateShape(W,R);else{let H=[],w=[];for(let N=0;N<f;N++){let j=N/f,V=p*Math.cos(j*Math.PI/2),pe=g*Math.sin(j*Math.PI/2)+m;for(let ne=0,ie=W.length;ne<ie;ne++){let Ee=$(W[ne],oe[ne],pe);k(Ee.x,Ee.y,-V),j===0&&H.push(Ee)}for(let ne=0,ie=q;ne<ie;ne++){let Ee=R[ne];Oe=De[ne];let We=[];for(let Ie=0,Je=Ee.length;Ie<Je;Ie++){let ut=$(Ee[Ie],Oe[Ie],pe);k(ut.x,ut.y,-V),j===0&&We.push(ut)}j===0&&w.push(We)}}Me=Pi.triangulateShape(H,w)}let Ce=Me.length,Ne=g+m;for(let H=0;H<ae;H++){let w=d?$(F[H],Ge[H],Ne):F[H];B?(b.copy(x.normals[0]).multiplyScalar(w.x),T.copy(x.binormals[0]).multiplyScalar(w.y),P.copy(_[0]).add(b).add(T),k(P.x,P.y,P.z)):k(w.x,w.y,0)}for(let H=1;H<=h;H++)for(let w=0;w<ae;w++){let N=d?$(F[w],Ge[w],Ne):F[w];B?(b.copy(x.normals[H]).multiplyScalar(N.x),T.copy(x.binormals[H]).multiplyScalar(N.y),P.copy(_[H]).add(b).add(T),k(P.x,P.y,P.z)):k(N.x,N.y,u/h*H)}for(let H=f-1;H>=0;H--){let w=H/f,N=p*Math.cos(w*Math.PI/2),j=g*Math.sin(w*Math.PI/2)+m;for(let V=0,pe=W.length;V<pe;V++){let ne=$(W[V],oe[V],j);k(ne.x,ne.y,u+N)}for(let V=0,pe=R.length;V<pe;V++){let ne=R[V];Oe=De[V];for(let ie=0,Ee=ne.length;ie<Ee;ie++){let We=$(ne[ie],Oe[ie],j);B?k(We.x,We.y+_[h-1].y,_[h-1].x+N):k(We.x,We.y,u+N)}}}function te(H,w){let N=H.length;for(;--N>=0;){let j=N,V=N-1;V<0&&(V=H.length-1);for(let pe=0,ne=h+2*f;pe<ne;pe++){let ie=ae*pe,Ee=ae*(pe+1);A(w+j+ie,w+V+ie,w+V+Ee,w+j+Ee)}}}function k(H,w,N){l.push(H),l.push(w),l.push(N)}function Te(H,w,N){I(H),I(w),I(N);let j=i.length/3,V=y.generateTopUV(n,i,j-3,j-2,j-1);X(V[0]),X(V[1]),X(V[2])}function A(H,w,N,j){I(H),I(w),I(j),I(w),I(N),I(j);let V=i.length/3,pe=y.generateSideWallUV(n,i,V-6,V-3,V-2,V-1);X(pe[0]),X(pe[1]),X(pe[3]),X(pe[1]),X(pe[2]),X(pe[3])}function I(H){i.push(l[3*H+0]),i.push(l[3*H+1]),i.push(l[3*H+2])}function X(H){s.push(H.x),s.push(H.y)}(function(){let H=i.length/3;if(d){let w=0,N=ae*w;for(let j=0;j<Ce;j++){let V=Me[j];Te(V[2]+N,V[1]+N,V[0]+N)}w=h+2*f,N=ae*w;for(let j=0;j<Ce;j++){let V=Me[j];Te(V[0]+N,V[1]+N,V[2]+N)}}else{for(let w=0;w<Ce;w++){let N=Me[w];Te(N[2],N[1],N[0])}for(let w=0;w<Ce;w++){let N=Me[w];Te(N[0]+ae*h,N[1]+ae*h,N[2]+ae*h)}}n.addGroup(H,i.length/3-H,0)})(),(function(){let H=i.length/3,w=0;te(W,w),w+=W.length;for(let N=0,j=R.length;N<j;N++){let V=R[N];te(V,w),w+=V.length}n.addGroup(H,i.length/3-H,1)})()}this.setAttribute("position",new Re(i,3)),this.setAttribute("uv",new Re(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ho[i.type]().fromJSON(i)),new r(n,e.options)}},Yf={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*i],h=e[3*i+1];return[new _e(s,a),new _e(o,l),new _e(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],g=e[3*i+2],m=e[3*s],f=e[3*s+1],v=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new _e(a,1-l),new _e(c,1-u),new _e(d,1-g),new _e(m,1-v)]:[new _e(o,1-l),new _e(h,1-u),new _e(p,1-g),new _e(f,1-v)]}},Xo=class r extends Tr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},nr=class r extends ht{constructor(e=[new _e(0,-.5),new _e(.5,0),new _e(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Nt(i,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new S,d=new _e,p=new S,g=new S,m=new S,f=0,v=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:f=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,p.x=1*v,p.y=-f,p.z=0*v,m.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(m.x,m.y,m.z);break;default:f=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,p.x=1*v,p.y=-f,p.z=0*v,g.copy(p),p.x+=m.x,p.y+=m.y,p.z+=m.z,p.normalize(),l.push(p.x,p.y,p.z),m.copy(g)}for(let y=0;y<=t;y++){let _=n+y*h*i,x=Math.sin(_),T=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*T,a.push(u.x,u.y,u.z),d.x=y/t,d.y=b/(e.length-1),o.push(d.x,d.y);let P=l[3*b+0]*x,B=l[3*b+1],U=l[3*b+0]*T;c.push(P,B,U)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){let x=_+y*e.length,T=x,b=x+e.length,P=x+e.length+1,B=x+1;s.push(T,b,B),s.push(P,B,b)}this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("uv",new Re(o,2)),this.setAttribute("normal",new Re(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Vs=class r extends Tr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Zt=class r extends ht{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,p=[],g=[],m=[],f=[];for(let v=0;v<h;v++){let y=v*d-a;for(let _=0;_<c;_++){let x=_*u-s;g.push(x,-y,0),m.push(0,0,1),f.push(_/o),f.push(1-v/l)}}for(let v=0;v<l;v++)for(let y=0;y<o;y++){let _=y+c*v,x=y+c*(v+1),T=y+1+c*(v+1),b=y+1+c*v;p.push(_,x,b),p.push(x,T,b)}this.setIndex(p),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},jo=class r extends ht{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new S,g=new _e;for(let m=0;m<=i;m++){for(let f=0;f<=n;f++){let v=s+f/n*a;p.x=u*Math.cos(v),p.y=u*Math.sin(v),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let m=0;m<i;m++){let f=m*(n+1);for(let v=0;v<n;v++){let y=v+f,_=y,x=y+n+1,T=y+n+2,b=y+1;o.push(_,x,b),o.push(x,T,b)}}this.setIndex(o),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ir=class r extends ht{constructor(e=new jt([new _e(0,.5),new _e(-.5,-.5),new _e(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,g=d.holes;Pi.isClockWise(p)===!1&&(p=p.reverse());for(let f=0,v=g.length;f<v;f++){let y=g[f];Pi.isClockWise(y)===!0&&(g[f]=y.reverse())}let m=Pi.triangulateShape(p,g);for(let f=0,v=g.length;f<v;f++){let y=g[f];p=p.concat(y)}for(let f=0,v=p.length;f<v;f++){let y=p[f];i.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let f=0,v=m.length;f<v;f++){let y=m[f],_=y[0]+u,x=y[1]+u,T=y[2]+u;n.push(_,x,T),l+=3}}this.setIndex(n),this.setAttribute("position",new Re(i,3)),this.setAttribute("normal",new Re(s,3)),this.setAttribute("uv",new Re(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Ht=class r extends ht{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new S,d=new S,p=[],g=[],m=[],f=[];for(let v=0;v<=n;v++){let y=[],_=v/n,x=0;v===0&&a===0?x=.5/t:v===n&&l===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let b=T/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),f.push(b+x,1-_),y.push(c++)}h.push(y)}for(let v=0;v<n;v++)for(let y=0;y<t;y++){let _=h[v][y+1],x=h[v][y],T=h[v+1][y],b=h[v+1][y+1];(v!==0||a>0)&&p.push(_,x,b),(v!==n-1||l<Math.PI)&&p.push(x,T,b)}this.setIndex(p),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},qo=class r extends Tr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Gt=class r extends ht{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new S,u=new S,d=new S;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){let m=g/i*s,f=p/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(m),u.y=(e+t*Math.cos(f))*Math.sin(m),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(m),h.y=e*Math.sin(m),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){let m=(i+1)*p+g-1,f=(i+1)*(p-1)+g-1,v=(i+1)*(p-1)+g,y=(i+1)*p+g;a.push(m,f,y),a.push(f,v,y)}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Yo=class r extends ht{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new S,d=new S,p=new S,g=new S,m=new S,f=new S,v=new S;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;y(x,s,a,e,p),y(x+.01,s,a,e,g),f.subVectors(g,p),v.addVectors(g,p),m.crossVectors(f,v),v.crossVectors(m,f),m.normalize(),v.normalize();for(let T=0;T<=i;++T){let b=T/i*Math.PI*2,P=-t*Math.cos(b),B=t*Math.sin(b);u.x=p.x+(P*v.x+B*m.x),u.y=p.y+(P*v.y+B*m.y),u.z=p.z+(P*v.z+B*m.z),l.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),c.push(d.x,d.y,d.z),h.push(_/n),h.push(T/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){let T=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),P=(i+1)*_+x,B=(i+1)*(_-1)+x;o.push(T,b,B),o.push(b,P,B)}function y(_,x,T,b,P){let B=Math.cos(_),U=Math.sin(_),F=T/x*_,R=Math.cos(F);P.x=b*(2+R)*.5*B,P.y=b*(2+R)*U*.5,P.z=b*Math.sin(F)*.5}this.setIndex(o),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Ct=class r extends ht{constructor(e=new Ra(new S(-1,-1,0),new S(-1,1,0),new S(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new S,l=new S,c=new _e,h=new S,u=[],d=[],p=[],g=[];function m(f){h=e.getPointAt(f/t,h);let v=a.normals[f],y=a.binormals[f];for(let _=0;_<=i;_++){let x=_/i*Math.PI*2,T=Math.sin(x),b=-Math.cos(x);l.x=b*v.x+T*y.x,l.y=b*v.y+T*y.y,l.z=b*v.z+T*y.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)m(f);m(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let v=0;v<=i;v++)c.x=f/t,c.y=v/i,p.push(c.x,c.y)})(),(function(){for(let f=1;f<=t;f++)for(let v=1;v<=i;v++){let y=(i+1)*(f-1)+(v-1),_=(i+1)*f+(v-1),x=(i+1)*f+v,T=(i+1)*(f-1)+v;g.push(y,_,T),g.push(_,x,T)}})()})(),this.setIndex(g),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Ho[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Zo=class extends ht{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new S,s=new S;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start;for(let p=d,g=d+u.count;p<g;p+=3)for(let m=0;m<3;m++){let f=o.getX(p+m),v=o.getX(p+(m+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,v),nd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),nd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Re(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function nd(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var _g=Object.freeze({__proto__:null,BoxGeometry:nt,CapsuleGeometry:Fs,CircleGeometry:Qn,ConeGeometry:zs,CylinderGeometry:Qe,DodecahedronGeometry:Fo,EdgesGeometry:zo,ExtrudeGeometry:Vt,IcosahedronGeometry:Xo,LatheGeometry:nr,OctahedronGeometry:Vs,PlaneGeometry:Zt,PolyhedronGeometry:Tr,RingGeometry:jo,ShapeGeometry:ir,SphereGeometry:Ht,TetrahedronGeometry:qo,TorusGeometry:Gt,TorusKnotGeometry:Yo,TubeGeometry:Ct,WireframeGeometry:Zo}),Zr=class extends qn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Rt=class extends qn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Kt=class extends Rt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _e(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var br=class extends qn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ko=class extends qn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ao(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Zf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Kf(r){let e=r.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,i){return r[n]-r[i]}),t}function id(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function rp(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var rr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jo=class extends rr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fc,endingEnd:fc}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case mc:s=e,o=2*t-n;break;case gc:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case mc:a=e,l=2*n-t;break;case gc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),m=g*g,f=m*g,v=-d*f+2*d*m-d*g,y=(1+d)*f+(-1.5-2*d)*m+(-.5+d)*g+1,_=(-1-p)*f+(1.5+p)*m+.5*g,x=p*f-p*m;for(let T=0;T!==o;++T)s[T]=v*a[h+T]+y*a[c+T]+_*a[l+T]+x*a[u+T];return s}},$o=class extends rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},Qo=class extends rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Jn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fr:t=this.InterpolantFactoryMethodDiscrete;break;case zr:t=this.InterpolantFactoryMethodLinear;break;case Co:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return zr;case this.InterpolantFactoryMethodSmooth:return Co}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Zf(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Co,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let g=t[h+p];if(g!==t[u+p]||g!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Jn.prototype.ValueTypeName="",Jn.prototype.TimeBufferType=Float32Array,Jn.prototype.ValueBufferType=Float32Array,Jn.prototype.DefaultInterpolation=zr;var Ki=class extends Jn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="bool",Ki.prototype.ValueBufferType=Array,Ki.prototype.DefaultInterpolation=Fr,Ki.prototype.InterpolantFactoryMethodLinear=void 0,Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}};Na.prototype.ValueTypeName="color";var Di=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}};Di.prototype.ValueTypeName="number";var el=class extends rr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Rn.slerpFlat(s,0,a,c-o,a,c,l);return s}},Ni=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new el(this.times,this.values,this.getValueSize(),e)}};Ni.prototype.ValueTypeName="quaternion",Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends Jn{constructor(e,t,n){super(e,t,n)}};Ji.prototype.ValueTypeName="string",Ji.prototype.ValueBufferType=Array,Ji.prototype.DefaultInterpolation=Fr,Ji.prototype.InterpolantFactoryMethodLinear=void 0,Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}};Ui.prototype.ValueTypeName="vector";var Ua=class{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ui(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Jf(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Jn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=Kf(l);l=id(l,1,h),c=id(c,1,h),i||l[0]!==0||(l.push(s),c.push(c[0])),a.push(new Di(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,p,g){if(d.length!==0){let m=[],f=[];rp(d,m,f,p),m.length!==0&&g.push(new h(u,m,f))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let u=c[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let d={},p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let g=0;g<u[p].morphTargets.length;g++)d[u[p].morphTargets[g]]=-1;for(let g in d){let m=[],f=[];for(let v=0;v!==u[p].morphTargets.length;++v){let y=u[p];m.push(y.time),f.push(y.morphTarget===g?1:0)}i.push(new Di(".morphTargetInfluence["+g+"]",m,f))}l=d.length*a}else{let d=".bones["+t[h].name+"]";n(Ui,d+".position",u,"pos",i),n(Ni,d+".quaternion",u,"rot",i),n(Ui,d+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let i=this.tracks[t];e=Math.max(e,i.times[i.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Jf(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Di;case"vector":case"vector2":case"vector3":case"vector4":return Ui;case"color":return Na;case"quaternion":return Ni;case"bool":case"boolean":return Ki;case"string":return Ji}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(r.type);if(r.times===void 0){let t=[],n=[];rp(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var Li={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},tl=class{constructor(e,t,n){let i=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,l),o===l&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},sp=new tl,Bi=class{constructor(e){this.manager=e!==void 0?e:sp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yi={},bc=class extends Error{constructor(e,t){super(e),this.response=t}},Hs=class extends Bi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Li.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Yi[e]!==void 0)return void Yi[e].push({onLoad:t,onProgress:n,onError:i});Yi[e]=[],Yi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Yi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0,m=0,f=new ReadableStream({start(v){(function y(){u.read().then(({done:_,value:x})=>{if(_)v.close();else{m+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:p});for(let b=0,P=h.length;b<P;b++){let B=h[b];B.onProgress&&B.onProgress(T)}v.enqueue(x),y()}},_=>{v.error(_)})})()}});return new Response(f)}throw new bc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Li.add(`file:${e}`,c);let h=Yi[e];delete Yi[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{let h=Yi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Yi[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Es=new WeakMap,nl=class extends Bi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Li.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Es.get(a);u===void 0&&(u=[],Es.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Is("img");function l(){h(),t&&t(this);let u=Es.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}Es.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),Li.remove(`image:${e}`);let d=Es.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u)}Es.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Li.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Kr=class extends Bi{constructor(e){super(e)}load(e,t,n,i){let s=new Cn,a=new nl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Jr=class extends pn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},si=class extends Jr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},cc=new st,rd=new S,sd=new S,Ba=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.mapType=Fi,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xr,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new Yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(rd),sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sd),t.updateMatrixWorld(),cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sc=class extends Ba{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Gr*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},$r=class extends Jr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Sc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ad=new st,ua=new S,hc=new S,wc=class extends Ba{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _e(4,2),this._viewportCount=6,this._viewports=[new Yt(2,1,1,1),new Yt(0,1,1,1),new Yt(3,1,1,1),new Yt(1,1,1,1),new Yt(3,0,1,1),new Yt(1,0,1,1)],this._cubeDirections=[new S(1,0,0),new S(-1,0,0),new S(0,0,1),new S(0,0,-1),new S(0,1,0),new S(0,-1,0)],this._cubeUps=[new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,0,1),new S(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ua.setFromMatrixPosition(e.matrixWorld),n.position.copy(ua),hc.copy(n.position),hc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(hc),n.updateMatrixWorld(),i.makeTranslation(-ua.x,-ua.y,-ua.z),ad.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ad,n.coordinateSystem,n.reversedDepth)}},Qr=class extends Jr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},sr=class extends Ds{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ec=class extends Ba{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vn=class extends Jr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new Ec}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ar=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var uc=new WeakMap,Oa=class extends Bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Li.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(c=>{if(uc.has(a)!==!0)return t&&t(c),s.manager.itemEnd(e),c;i&&i(uc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Li.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),uc.set(l,c),Li.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Li.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var xg=new st,Mg=new st,Tg=new st;var il=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bg=new S,Sg=new Rn,wg=new S,Eg=new S,Ag=new S;var Cg=new S,Rg=new Rn,Ig=new S,Pg=new S;var _h="\\[\\]\\.:\\/",$f=new RegExp("["+_h+"]","g"),dc="[^"+_h+"]",Qf="[^"+_h.replace("\\.","")+"]",em=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",dc)+/(WCOD+)?/.source.replace("WCOD",Qf)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dc)+"$"),tm=["material","materials","bones","map"],ln=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($f,"")}static parseTrackName(e){let t=em.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);tm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ln.Composite=class{constructor(r,e,t){let n=t||ln.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},ln.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ln.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ln.prototype.GetterByBindingType=[ln.prototype._getValue_direct,ln.prototype._getValue_array,ln.prototype._getValue_arrayElement,ln.prototype._getValue_toArray],ln.prototype.SetterByBindingTypeAndVersioning=[[ln.prototype._setValue_direct,ln.prototype._setValue_direct_setNeedsUpdate,ln.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ln.prototype._setValue_array,ln.prototype._setValue_array_setNeedsUpdate,ln.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ln.prototype._setValue_arrayElement,ln.prototype._setValue_arrayElement_setNeedsUpdate,ln.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ln.prototype._setValue_fromArray,ln.prototype._setValue_fromArray_setNeedsUpdate,ln.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Lg=new Float32Array(1);var Dg=new st;var Ng=new _e;var Ug=new S,Bg=new S,Og=new S,Fg=new S,zg=new S,Gg=new S,kg=new S;var Vg=new S;var Hg=new S,Wg=new st,Xg=new st;var jg=new S,qg=new Ye,Yg=new Ye;var Zg=new S,Kg=new S,Jg=new S;var $g=new S,Qg=new Ds;var e1=new Mn;var t1=new S;function xh(r,e,t,n){let i=(function(s){switch(s){case Fi:case Lc:return{byteLength:1,components:1};case Ys:case Dc:case Er:return{byteLength:2,components:1};case ml:case gl:return{byteLength:2,components:4};case ns:case fl:case fi:return{byteLength:4,components:1};case Nc:case Uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case vl:case yl:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case mi:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Rp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function im(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(r.bindBuffer(o,s),c.length===0)r.bufferSubData(o,0,l);else{c.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<c.length;u++){let d=c[h],p=c[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,c[h]=p)}c.length=h+1;for(let u=0,d=c.length;u<d;u++){let p=c[u];r.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Ut={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Xe={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new At}},envmap:{envMap:{value:null},envMapRotation:{value:new At},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new At}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new At}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new At},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new At},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new At},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new At}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new At}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new At}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0},uvTransform:{value:new At}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}}},zi={basic:{uniforms:Hn([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Hn([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Hn([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Hn([Xe.common,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.roughnessmap,Xe.metalnessmap,Xe.fog,Xe.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Hn([Xe.common,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.gradientmap,Xe.fog,Xe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Hn([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Hn([Xe.points,Xe.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Hn([Xe.common,Xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Hn([Xe.common,Xe.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Hn([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Hn([Xe.sprite,Xe.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new At},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new At}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:Hn([Xe.common,Xe.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:Hn([Xe.lights,Xe.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};zi.physical={uniforms:Hn([zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new At},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new At},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new At},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new At},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new At},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new At},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new At},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new At},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new At},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new At},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new At},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new At}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};var bl={r:0,b:0,g:0},ss=new wi,rm=new st;function sm(r,e,t,n,i,s,a){let o=new Ye(0),l,c,h=s===!0?0:1,u=null,d=0,p=null;function g(f){let v=f.isScene===!0?f.background:null;return v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v}function m(f,v){f.getRGB(bl,vh(r)),n.buffers.color.setClear(bl.r,bl.g,bl.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(f,v=1){o.set(f),h=v,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,m(o,h)},render:function(f){let v=!1,y=g(f);y===null?m(o,h):y&&y.isColor&&(m(y,1),v=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===ka)?(c===void 0&&(c=new at(new nt(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:rs(zi.backgroundCube.uniforms),vertexShader:zi.backgroundCube.vertexShader,fragmentShader:zi.backgroundCube.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,x,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ss.copy(v.backgroundRotation),ss.x*=-1,ss.y*=-1,ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(rm.makeRotationFromEuler(ss)),c.material.toneMapped=zt.getTransfer(y.colorSpace)!==nn,u===y&&d===y.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new at(new Zt(2,2),new $n({name:"BackgroundMaterial",uniforms:rs(zi.background.uniforms),vertexShader:zi.background.vertexShader,fragmentShader:zi.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=zt.getTransfer(y.colorSpace)!==nn,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),u===y&&d===y.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function am(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null),s=i,a=!1;function o(v){return r.bindVertexArray(v)}function l(v){return r.deleteVertexArray(v)}function c(v){let y=[],_=[],x=[];for(let T=0;T<t;T++)y[T]=0,_[T]=0,x[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:_,attributeDivisors:x,object:v,attributes:{},index:null}}function h(){let v=s.newAttributes;for(let y=0,_=v.length;y<_;y++)v[y]=0}function u(v){d(v,0)}function d(v,y){let _=s.newAttributes,x=s.enabledAttributes,T=s.attributeDivisors;_[v]=1,x[v]===0&&(r.enableVertexAttribArray(v),x[v]=1),T[v]!==y&&(r.vertexAttribDivisor(v,y),T[v]=y)}function p(){let v=s.newAttributes,y=s.enabledAttributes;for(let _=0,x=y.length;_<x;_++)y[_]!==v[_]&&(r.disableVertexAttribArray(_),y[_]=0)}function g(v,y,_,x,T,b,P){P===!0?r.vertexAttribIPointer(v,y,_,T,b):r.vertexAttribPointer(v,y,_,x,T,b)}function m(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(v,y,_,x,T){let b=!1,P=(function(B,U,F){let R=F.wireframe===!0,L=n[B.id];L===void 0&&(L={},n[B.id]=L);let q=L[U.id];q===void 0&&(q={},L[U.id]=q);let W=q[R];return W===void 0&&(W=c(r.createVertexArray()),q[R]=W),W})(x,_,y);s!==P&&(s=P,o(s.object)),b=(function(B,U,F,R){let L=s.attributes,q=U.attributes,W=0,$=F.getAttributes();for(let ae in $)if($[ae].location>=0){let Z=L[ae],oe=q[ae];if(oe===void 0&&(ae==="instanceMatrix"&&B.instanceMatrix&&(oe=B.instanceMatrix),ae==="instanceColor"&&B.instanceColor&&(oe=B.instanceColor)),Z===void 0||Z.attribute!==oe||oe&&Z.data!==oe.data)return!0;W++}return s.attributesNum!==W||s.index!==R})(v,x,_,T),b&&(function(B,U,F,R){let L={},q=U.attributes,W=0,$=F.getAttributes();for(let ae in $)if($[ae].location>=0){let Z=q[ae];Z===void 0&&(ae==="instanceMatrix"&&B.instanceMatrix&&(Z=B.instanceMatrix),ae==="instanceColor"&&B.instanceColor&&(Z=B.instanceColor));let oe={};oe.attribute=Z,Z&&Z.data&&(oe.data=Z.data),L[ae]=oe,W++}s.attributes=L,s.attributesNum=W,s.index=R})(v,x,_,T),T!==null&&e.update(T,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(B,U,F,R){h();let L=R.attributes,q=F.getAttributes(),W=U.defaultAttributeValues;for(let $ in q){let ae=q[$];if(ae.location>=0){let Z=L[$];if(Z===void 0&&($==="instanceMatrix"&&B.instanceMatrix&&(Z=B.instanceMatrix),$==="instanceColor"&&B.instanceColor&&(Z=B.instanceColor)),Z!==void 0){let oe=Z.normalized,De=Z.itemSize,Oe=e.get(Z);if(Oe===void 0)continue;let Me=Oe.buffer,Ge=Oe.type,Ce=Oe.bytesPerElement,Ne=Ge===r.INT||Ge===r.UNSIGNED_INT||Z.gpuType===fl;if(Z.isInterleavedBufferAttribute){let te=Z.data,k=te.stride,Te=Z.offset;if(te.isInstancedInterleavedBuffer){for(let A=0;A<ae.locationSize;A++)d(ae.location+A,te.meshPerAttribute);B.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let A=0;A<ae.locationSize;A++)u(ae.location+A);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let A=0;A<ae.locationSize;A++)g(ae.location+A,De/ae.locationSize,Ge,oe,k*Ce,(Te+De/ae.locationSize*A)*Ce,Ne)}else{if(Z.isInstancedBufferAttribute){for(let te=0;te<ae.locationSize;te++)d(ae.location+te,Z.meshPerAttribute);B.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let te=0;te<ae.locationSize;te++)u(ae.location+te);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let te=0;te<ae.locationSize;te++)g(ae.location+te,De/ae.locationSize,Ge,oe,De*Ce,De/ae.locationSize*te*Ce,Ne)}}else if(W!==void 0){let oe=W[$];if(oe!==void 0)switch(oe.length){case 2:r.vertexAttrib2fv(ae.location,oe);break;case 3:r.vertexAttrib3fv(ae.location,oe);break;case 4:r.vertexAttrib4fv(ae.location,oe);break;default:r.vertexAttrib1fv(ae.location,oe)}}}}p()})(v,y,_,x),T!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:m,resetDefaultState:f,dispose:function(){m();for(let v in n){let y=n[v];for(let _ in y){let x=y[_];for(let T in x)l(x[T].object),delete x[T];delete y[_]}delete n[v]}},releaseStatesOfGeometry:function(v){if(n[v.id]===void 0)return;let y=n[v.id];for(let _ in y){let x=y[_];for(let T in x)l(x[T].object),delete x[T];delete y[_]}delete n[v.id]},releaseStatesOfProgram:function(v){for(let y in n){let _=n[y];if(_[v.id]===void 0)continue;let x=_[v.id];for(let T in x)l(x[T].object),delete x[T];delete _[v.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function om(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)i(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function lm(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===mi||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===Er&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Fi&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==fi&&!p)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function cm(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Ii,o=new At,l={value:null,needsUpdate:!1};function c(h,u,d,p){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=l.value,p!==!0||m===null){let f=d+4*g,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,_=d;y!==g;++y,_+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,f=r.get(h);if(!i||p===null||p.length===0||s&&!m)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let v=s?0:n,y=4*v,_=f.clippingState||null;l.value=_,_=c(p,u,y,d);for(let x=0;x!==y;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}}}function hm(r){let e=new WeakMap;function t(i,s){return s===ul?i.mapping=js:s===dl&&(i.mapping=es),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===ul||s===dl){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new No(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var ap=[.125,.215,.35,.446,.526,.582],Xa=20,Mh=new sr,op=new Ye,Th=null,bh=0,Sh=0,wh=!1,os=(1+Math.sqrt(5))/2,$s=1/os,lp=[new S(-os,$s,0),new S(os,$s,0),new S(-$s,0,os),new S($s,0,os),new S(0,os,-$s),new S(0,os,$s),new S(-1,1,-1),new S(1,1,-1),new S(-1,1,1),new S(1,1,1)],um=new S,Ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=um}=s;Th=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Th,bh,Sh),this._renderer.xr.enabled=wh,e.scissorTest=!1,Sl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Th=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:Er,format:mi,colorSpace:Un,depthBuffer:!1},i=cp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cp(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,u=a-4+1+ap.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);l.push(p);let g=1/p;d>a-4?g=ap[d-a+4-1]:d===0&&(g=0),c.push(g);let m=1/(p-2),f=-m,v=1+m,y=[f,f,v,f,v,v,f,f,v,v,f,v],_=6,x=6,T=3,b=2,P=1,B=new Float32Array(T*x*_),U=new Float32Array(b*x*_),F=new Float32Array(P*x*_);for(let L=0;L<_;L++){let q=L%3*2/3-1,W=L>2?0:-1,$=[q,W,0,q+2/3,W,0,q+2/3,W+1,0,q,W,0,q+2/3,W+1,0,q,W+1,0];B.set($,T*x*L),U.set(y,b*x*L);let ae=[L,L,L,L,L,L];F.set(ae,P*x*L)}let R=new ht;R.setAttribute("position",new fn(B,T)),R.setAttribute("uv",new fn(U,b)),R.setAttribute("faceIndex",new fn(F,P)),o.push(R),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(Xa),h=new S(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Xa,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Uh(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new at(this._lodPlanes[0],e);this._renderer.compile(t,Mh)}_sceneToCubeUV(e,t,n,i,s){let a=new sn(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,u=c.toneMapping;c.getClearColor(op),c.toneMapping=or,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(i),c.clearDepth(),c.setRenderTarget(null));let d=new yn({name:"PMREM.Background",side:ai,depthWrite:!1,depthTest:!1}),p=new at(new nt,d),g=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,g=!0):(d.color.copy(op),g=!0);for(let f=0;f<6;f++){let v=f%3;v===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[f],s.y,s.z)):v===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[f]));let y=this._cubeSize;Sl(i,v*y,f>2?y:0,y,y),c.setRenderTarget(i),g&&c.render(p,a),c.render(e,a)}p.geometry.dispose(),p.material.dispose(),c.toneMapping=u,c.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===js||e.mapping===es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=up()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new at(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Sl(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Mh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=lp[(i-s-1)%lp.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new at(this._lodPlanes[i],c),u=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,g=s/p,m=isFinite(s)?1+Math.floor(3*g):Xa;m>Xa&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let f=[],v=0;for(let x=0;x<Xa;++x){let T=x/g,b=Math.exp(-T*T/2);f.push(b),x===0?v+=b:x<m&&(v+=2*b)}for(let x=0;x<f.length;x++)f[x]=f[x]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=p,u.mipInt.value=y-n;let _=this._sizeLods[i];Sl(t,3*_*(i>y-4?i-y+4:0),4*(this._cubeSize-_),3*_,2*_),l.setRenderTarget(t),l.render(h,Mh)}};function cp(r,e,t){let n=new di(r,e,t);return n.texture.mapping=ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function hp(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uh(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function up(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Uh(){return`

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
	`}function dm(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===ul||s===dl,o=s===js||s===es;if(a||o){let l=e.get(i),c=l!==void 0?l.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==c)return t===null&&(t=new Ar(r)),l=a?t.fromEquirectangular(i,l):t.fromCubemap(i,l),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),l.texture;if(l!==void 0)return l.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let g=0;g<p;g++)u[g]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new Ar(r)),l=a?t.fromEquirectangular(i):t.fromCubemap(i),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),i.addEventListener("dispose",n),l.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function pm(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Ps("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function fm(r,e,t,n){let i={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",a),delete i[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,d=0;if(h!==null){let m=h.array;d=h.version;for(let f=0,v=m.length;f<v;f+=3){let y=m[f+0],_=m[f+1],x=m[f+2];c.push(y,_,_,x,x,y)}}else{if(u===void 0)return;{let m=u.array;d=u.version;for(let f=0,v=m.length/3-1;f<v;f+=3){let y=f+0,_=f+1,x=f+2;c.push(y,_,_,x,x,y)}}}let p=new(gh(c)?xa:Vr)(c,1);p.version=d;let g=s.get(l);g&&e.remove(g),s.set(l,p)}return{get:function(l,c){return i[c.id]===!0||(c.addEventListener("dispose",a),i[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function mm(r,e,t){let n,i,s;function a(o,l,c){c!==0&&(r.drawElementsInstanced(n,l,i,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,l){r.drawElements(n,l,i,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,i,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,l[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,i,o,0,h,0,c);let d=0;for(let p=0;p<c;p++)d+=l[p]*h[p];t.update(d,n,1)}}}function gm(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function vm(r,e,t){let n=new WeakMap,i=new Yt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let B=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",B)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),g===!0&&(y=3);let _=a.attributes.position.count*y,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*x*4*h),b=new ya(T,_,x,h);b.type=fi,b.needsUpdate=!0;let P=4*y;for(let U=0;U<h;U++){let F=m[U],R=f[U],L=v[U],q=_*x*4*U;for(let W=0;W<F.count;W++){let $=W*P;d===!0&&(i.fromBufferAttribute(F,W),T[q+$+0]=i.x,T[q+$+1]=i.y,T[q+$+2]=i.z,T[q+$+3]=0),p===!0&&(i.fromBufferAttribute(R,W),T[q+$+4]=i.x,T[q+$+5]=i.y,T[q+$+6]=i.z,T[q+$+7]=0),g===!0&&(i.fromBufferAttribute(L,W),T[q+$+8]=i.x,T[q+$+9]=i.y,T[q+$+10]=i.z,T[q+$+11]=L.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new _e(_,x)},n.set(a,u),a.addEventListener("dispose",B)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let g=0;g<l.length;g++)d+=l[g];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",l)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function ym(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(i.get(c)!==o&&(e.update(c),i.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return c},dispose:function(){i=new WeakMap}}}var Ip=new Cn,dp=new Sa(1,1),Pp=new ya,Lp=new Lo,Dp=new Ma,pp=[],fp=[],mp=new Float32Array(16),gp=new Float32Array(9),vp=new Float32Array(4);function ea(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=pp[i];if(s===void 0&&(s=new Float32Array(i),pp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function In(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Pn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function El(r,e){let t=fp[e];t===void 0&&(t=new Int32Array(e),fp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function _m(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function xm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(In(t,e))return;r.uniform2fv(this.addr,e),Pn(t,e)}}function Mm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(In(t,e))return;r.uniform3fv(this.addr,e),Pn(t,e)}}function Tm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(In(t,e))return;r.uniform4fv(this.addr,e),Pn(t,e)}}function bm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(In(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Pn(t,e)}else{if(In(t,n))return;vp.set(n),r.uniformMatrix2fv(this.addr,!1,vp),Pn(t,n)}}function Sm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(In(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Pn(t,e)}else{if(In(t,n))return;gp.set(n),r.uniformMatrix3fv(this.addr,!1,gp),Pn(t,n)}}function wm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(In(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Pn(t,e)}else{if(In(t,n))return;mp.set(n),r.uniformMatrix4fv(this.addr,!1,mp),Pn(t,n)}}function Em(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Am(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(In(t,e))return;r.uniform2iv(this.addr,e),Pn(t,e)}}function Cm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(In(t,e))return;r.uniform3iv(this.addr,e),Pn(t,e)}}function Rm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(In(t,e))return;r.uniform4iv(this.addr,e),Pn(t,e)}}function Im(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Pm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(In(t,e))return;r.uniform2uiv(this.addr,e),Pn(t,e)}}function Lm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(In(t,e))return;r.uniform3uiv(this.addr,e),Pn(t,e)}}function Dm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(In(t,e))return;r.uniform4uiv(this.addr,e),Pn(t,e)}}function Nm(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(dp.compareFunction=ph,s=dp):s=Ip,t.setTexture2D(e||s,i)}function Um(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Lp,i)}function Bm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Dp,i)}function Om(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Pp,i)}function Fm(r,e){r.uniform1fv(this.addr,e)}function zm(r,e){let t=ea(e,this.size,2);r.uniform2fv(this.addr,t)}function Gm(r,e){let t=ea(e,this.size,3);r.uniform3fv(this.addr,t)}function km(r,e){let t=ea(e,this.size,4);r.uniform4fv(this.addr,t)}function Vm(r,e){let t=ea(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Hm(r,e){let t=ea(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Wm(r,e){let t=ea(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Xm(r,e){r.uniform1iv(this.addr,e)}function jm(r,e){r.uniform2iv(this.addr,e)}function qm(r,e){r.uniform3iv(this.addr,e)}function Ym(r,e){r.uniform4iv(this.addr,e)}function Zm(r,e){r.uniform1uiv(this.addr,e)}function Km(r,e){r.uniform2uiv(this.addr,e)}function Jm(r,e){r.uniform3uiv(this.addr,e)}function $m(r,e){r.uniform4uiv(this.addr,e)}function Qm(r,e,t){let n=this.cache,i=e.length,s=El(t,i);In(n,s)||(r.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Ip,s[a])}function e0(r,e,t){let n=this.cache,i=e.length,s=El(t,i);In(n,s)||(r.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Lp,s[a])}function t0(r,e,t){let n=this.cache,i=e.length,s=El(t,i);In(n,s)||(r.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Dp,s[a])}function n0(r,e,t){let n=this.cache,i=e.length,s=El(t,i);In(n,s)||(r.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Pp,s[a])}var Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return _m;case 35664:return xm;case 35665:return Mm;case 35666:return Tm;case 35674:return bm;case 35675:return Sm;case 35676:return wm;case 5124:case 35670:return Em;case 35667:case 35671:return Am;case 35668:case 35672:return Cm;case 35669:case 35673:return Rm;case 5125:return Im;case 36294:return Pm;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return Om}})(t.type)}},Ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Fm;case 35664:return zm;case 35665:return Gm;case 35666:return km;case 35674:return Vm;case 35675:return Hm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return jm;case 35668:case 35672:return qm;case 35669:case 35673:return Ym;case 5125:return Zm;case 36294:return Km;case 36295:return Jm;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return e0;case 35680:case 36300:case 36308:case 36293:return t0;case 36289:case 36303:case 36311:case 36292:return n0}})(t.type)}},Rh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Eh=/(\w+)(\])?(\[|\.)?/g;function yp(r,e){r.seq.push(e),r.map[e.id]=e}function i0(r,e,t){let n=r.name,i=n.length;for(Eh.lastIndex=0;;){let s=Eh.exec(n),a=Eh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===i){yp(t,c===void 0?new Ah(o,r,e):new Ch(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Rh(o),yp(t,h)),t=h}}}var Qs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);i0(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function _p(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var r0=0,xp=new At;function Mp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),d=Math.min(l+6,c.length);for(let p=u;p<d;p++){let g=p+1;h.push(`${g===l?">":" "} ${g}: ${c[p]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function s0(r,e){let t=(function(n){zt._getMatrix(xp,zt.workingColorSpace,n);let i=`mat3( ${xp.elements.map(s=>s.toFixed(4))} )`;switch(zt.getTransfer(n)){case ga:return[i,"LinearTransferOETF"];case nn:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function a0(r,e){let t;switch(e){case Ld:t="Linear";break;case Dd:t="Reinhard";break;case Nd:t="Cineon";break;case pi:t="ACESFilmic";break;case Bd:t="AgX";break;case Od:t="Neutral";break;case Ud:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var wl=new S;function o0(){return zt.getLuminanceCoefficients(wl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${wl.x.toFixed(4)}, ${wl.y.toFixed(4)}, ${wl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ja(r){return r!==""}function Tp(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var l0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(r){return r.replace(l0,h0)}var c0=new Map;function h0(r,e){let t=Ut[e];if(t===void 0){let n=c0.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Ih(t)}var u0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sp(r){return r.replace(u0,d0)}function d0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function wp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function p0(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(R){let L="SHADOWMAP_TYPE_BASIC";return R.shadowMapType===Cc?L="SHADOWMAP_TYPE_PCF":R.shadowMapType===Ws?L="SHADOWMAP_TYPE_PCF_SOFT":R.shadowMapType===Oi&&(L="SHADOWMAP_TYPE_VSM"),L})(t),c=(function(R){let L="ENVMAP_TYPE_CUBE";if(R.envMap)switch(R.envMapMode){case js:case es:L="ENVMAP_TYPE_CUBE";break;case ka:L="ENVMAP_TYPE_CUBE_UV"}return L})(t),h=(function(R){let L="ENVMAP_MODE_REFLECTION";return R.envMap&&R.envMapMode===es&&(L="ENVMAP_MODE_REFRACTION"),L})(t),u=(function(R){let L="ENVMAP_BLENDING_NONE";if(R.envMap)switch(R.combine){case Rd:L="ENVMAP_BLENDING_MULTIPLY";break;case Id:L="ENVMAP_BLENDING_MIX";break;case Pd:L="ENVMAP_BLENDING_ADD"}return L})(t),d=(function(R){let L=R.envMapCubeUVHeight;if(L===null)return null;let q=Math.log2(L)-2,W=1/L;return{texelWidth:1/(3*Math.max(Math.pow(2,q),112)),texelHeight:W,maxMip:q}})(t),p=(function(R){return[R.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",R.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ja).join(`
`)})(t),g=(function(R){let L=[];for(let q in R){let W=R[q];W!==!1&&L.push("#define "+q+" "+W)}return L.join(`
`)})(s),m=i.createProgram(),f,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ja).join(`
`),f.length>0&&(f+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ja).join(`
`),v.length>0&&(v+=`
`)):(f=[wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ja).join(`
`),v=[wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==or?"#define TONE_MAPPING":"",t.toneMapping!==or?Ut.tonemapping_pars_fragment:"",t.toneMapping!==or?a0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,s0("linearToOutputTexel",t.outputColorSpace),o0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ja).join(`
`)),a=Ih(a),a=Tp(a,t),a=bp(a,t),o=Ih(o),o=Tp(o,t),o=bp(o,t),a=Sp(a),o=Sp(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,v=["#define varying in",t.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let _=y+f+a,x=y+v+o,T=_p(i,i.VERTEX_SHADER,_),b=_p(i,i.FRAGMENT_SHADER,x);function P(R){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",q=i.getShaderInfoLog(T)||"",W=i.getShaderInfoLog(b)||"",$=L.trim(),ae=q.trim(),Z=W.trim(),oe=!0,De=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(oe=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,T,b);else{let Oe=Mp(i,T,"vertex"),Me=Mp(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+$+`
`+Oe+`
`+Me)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):ae!==""&&Z!==""||(De=!1);De&&(R.diagnostics={runnable:oe,programLog:$,vertexShader:{log:ae,prefix:f},fragmentShader:{log:Z,prefix:v}})}i.deleteShader(T),i.deleteShader(b),B=new Qs(i,m),U=(function(L,q){let W={},$=L.getProgramParameter(q,L.ACTIVE_ATTRIBUTES);for(let ae=0;ae<$;ae++){let Z=L.getActiveAttrib(q,ae),oe=Z.name,De=1;Z.type===L.FLOAT_MAT2&&(De=2),Z.type===L.FLOAT_MAT3&&(De=3),Z.type===L.FLOAT_MAT4&&(De=4),W[oe]={type:Z.type,location:L.getAttribLocation(q,oe),locationSize:De}}return W})(i,m)}let B,U;i.attachShader(m,T),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),this.getUniforms=function(){return B===void 0&&P(this),B},this.getAttributes=function(){return U===void 0&&P(this),U};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(m,37297)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r0++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=b,this}var f0=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Lh(e),t.set(e,n)),n}},Lh=class{constructor(e){this.id=f0++,this.code=e,this.usedTimes=0}};function m0(r,e,t,n,i,s,a){let o=new _a,l=new Ph,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,y,_,x){let T=_.fog,b=x.geometry,P=f.isMeshStandardMaterial?_.environment:null,B=(f.isMeshStandardMaterial?t:e).get(f.envMap||P),U=B&&B.mapping===ka?B.image.height:null,F=g[f.type];f.precision!==null&&(p=i.getMaxPrecision(f.precision),p!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",p,"instead."));let R=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,L=R!==void 0?R.length:0,q,W,$,ae,Z=0;if(b.morphAttributes.position!==void 0&&(Z=1),b.morphAttributes.normal!==void 0&&(Z=2),b.morphAttributes.color!==void 0&&(Z=3),F){let we=zi[F];q=we.vertexShader,W=we.fragmentShader}else q=f.vertexShader,W=f.fragmentShader,l.update(f),$=l.getVertexShaderID(f),ae=l.getFragmentShaderID(f);let oe=r.getRenderTarget(),De=r.state.buffers.depth.getReversed(),Oe=x.isInstancedMesh===!0,Me=x.isBatchedMesh===!0,Ge=!!f.map,Ce=!!f.matcap,Ne=!!B,te=!!f.aoMap,k=!!f.lightMap,Te=!!f.bumpMap,A=!!f.normalMap,I=!!f.displacementMap,X=!!f.emissiveMap,H=!!f.metalnessMap,w=!!f.roughnessMap,N=f.anisotropy>0,j=f.clearcoat>0,V=f.dispersion>0,pe=f.iridescence>0,ne=f.sheen>0,ie=f.transmission>0,Ee=N&&!!f.anisotropyMap,We=j&&!!f.clearcoatMap,Ie=j&&!!f.clearcoatNormalMap,Je=j&&!!f.clearcoatRoughnessMap,ut=pe&&!!f.iridescenceMap,ft=pe&&!!f.iridescenceThicknessMap,It=ne&&!!f.sheenColorMap,St=ne&&!!f.sheenRoughnessMap,_t=!!f.specularMap,z=!!f.specularColorMap,ee=!!f.specularIntensityMap,fe=ie&&!!f.transmissionMap,Se=ie&&!!f.thicknessMap,Y=!!f.gradientMap,ce=!!f.alphaMap,de=f.alphaTest>0,be=!!f.alphaHash,xe=!!f.extensions,C=or;f.toneMapped&&(oe!==null&&oe.isXRRenderTarget!==!0||(C=r.toneMapping));let le={shaderID:F,shaderType:f.type,shaderName:f.name,vertexShader:q,fragmentShader:W,defines:f.defines,customVertexShaderID:$,customFragmentShaderID:ae,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:p,batching:Me,batchingColor:Me&&x._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&x.instanceColor!==null,instancingMorph:Oe&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?r.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Un,alphaToCoverage:!!f.alphaToCoverage,map:Ge,matcap:Ce,envMap:Ne,envMapMode:Ne&&B.mapping,envMapCubeUVHeight:U,aoMap:te,lightMap:k,bumpMap:Te,normalMap:A,displacementMap:d&&I,emissiveMap:X,normalMapObjectSpace:A&&f.normalMapType===Hd,normalMapTangentSpace:A&&f.normalMapType===Vd,metalnessMap:H,roughnessMap:w,anisotropy:N,anisotropyMap:Ee,clearcoat:j,clearcoatMap:We,clearcoatNormalMap:Ie,clearcoatRoughnessMap:Je,dispersion:V,iridescence:pe,iridescenceMap:ut,iridescenceThicknessMap:ft,sheen:ne,sheenColorMap:It,sheenRoughnessMap:St,specularMap:_t,specularColorMap:z,specularIntensityMap:ee,transmission:ie,transmissionMap:fe,thicknessMap:Se,gradientMap:Y,opaque:f.transparent===!1&&f.blending===Fa&&f.alphaToCoverage===!1,alphaMap:ce,alphaTest:de,alphaHash:be,combine:f.combine,mapUv:Ge&&m(f.map.channel),aoMapUv:te&&m(f.aoMap.channel),lightMapUv:k&&m(f.lightMap.channel),bumpMapUv:Te&&m(f.bumpMap.channel),normalMapUv:A&&m(f.normalMap.channel),displacementMapUv:I&&m(f.displacementMap.channel),emissiveMapUv:X&&m(f.emissiveMap.channel),metalnessMapUv:H&&m(f.metalnessMap.channel),roughnessMapUv:w&&m(f.roughnessMap.channel),anisotropyMapUv:Ee&&m(f.anisotropyMap.channel),clearcoatMapUv:We&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Je&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:It&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:St&&m(f.sheenRoughnessMap.channel),specularMapUv:_t&&m(f.specularMap.channel),specularColorMapUv:z&&m(f.specularColorMap.channel),specularIntensityMapUv:ee&&m(f.specularIntensityMap.channel),transmissionMapUv:fe&&m(f.transmissionMap.channel),thicknessMapUv:Se&&m(f.thicknessMap.channel),alphaMapUv:ce&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(A||N),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(Ge||ce),fog:!!T,useFog:f.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:De,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:Z,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&y.length>0,shadowMapType:r.shadowMap.type,toneMapping:C,decodeVideoTexture:Ge&&f.map.isVideoTexture===!0&&zt.getTransfer(f.map.colorSpace)===nn,decodeVideoTextureEmissive:X&&f.emissiveMap.isVideoTexture===!0&&zt.getTransfer(f.emissiveMap.colorSpace)===nn,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Bt,flipSided:f.side===ai,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:xe&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&f.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let y in f.defines)v.push(y),v.push(f.defines[y]);return f.isRawShaderMaterial===!1&&((function(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)})(v,f),(function(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)})(v,f),v.push(r.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=g[f.type],y;if(v){let _=zi[v];y=ep.clone(_.uniforms)}else y=f.uniforms;return y},acquireProgram:function(f,v){let y;for(let _=0,x=h.length;_<x;_++){let T=h[_];if(T.cacheKey===v){y=T,++y.usedTimes;break}}return y===void 0&&(y=new p0(r,v,f,s),h.push(y)),y},releaseProgram:function(f){if(--f.usedTimes===0){let v=h.indexOf(f);h[v]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){l.remove(f)},programs:h,dispose:function(){l.dispose()}}}function g0(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function v0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Ep(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ap(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,l,c,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=l,d.groupOrder=c,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.push(d):l.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.unshift(d):l.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let l=r[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||v0),n.length>1&&n.sort(o||Ep),i.length>1&&i.sort(o||Ep)}}}function y0(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Ap,r.set(e,[i])):t>=n.length?(i=new Ap,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function _0(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new S,color:new Ye};break;case"SpotLight":t={position:new S,direction:new S,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new S,halfWidth:new S,halfHeight:new S}}return r[e.id]=t,t}}}var x0=0;function M0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function T0(r){let e=new _0,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new S);let i=new S,s=new st,a=new st;return{setup:function(o){let l=0,c=0,h=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let u=0,d=0,p=0,g=0,m=0,f=0,v=0,y=0,_=0,x=0,T=0;o.sort(M0);for(let P=0,B=o.length;P<B;P++){let U=o[P],F=U.color,R=U.intensity,L=U.distance,q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)l+=F.r*R,c+=F.g*R,h+=F.b*R;else if(U.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(U.sh.coefficients[W],R);T++}else if(U.isDirectionalLight){let W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let $=U.shadow,ae=t.get(U);ae.shadowIntensity=$.intensity,ae.shadowBias=$.bias,ae.shadowNormalBias=$.normalBias,ae.shadowRadius=$.radius,ae.shadowMapSize=$.mapSize,n.directionalShadow[u]=ae,n.directionalShadowMap[u]=q,n.directionalShadowMatrix[u]=U.shadow.matrix,f++}n.directional[u]=W,u++}else if(U.isSpotLight){let W=e.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(F).multiplyScalar(R),W.distance=L,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,n.spot[p]=W;let $=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,$.updateMatrices(U),U.castShadow&&x++),n.spotLightMatrix[p]=$.matrix,U.castShadow){let ae=t.get(U);ae.shadowIntensity=$.intensity,ae.shadowBias=$.bias,ae.shadowNormalBias=$.normalBias,ae.shadowRadius=$.radius,ae.shadowMapSize=$.mapSize,n.spotShadow[p]=ae,n.spotShadowMap[p]=q,y++}p++}else if(U.isRectAreaLight){let W=e.get(U);W.color.copy(F).multiplyScalar(R),W.halfWidth.set(.5*U.width,0,0),W.halfHeight.set(0,.5*U.height,0),n.rectArea[g]=W,g++}else if(U.isPointLight){let W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){let $=U.shadow,ae=t.get(U);ae.shadowIntensity=$.intensity,ae.shadowBias=$.bias,ae.shadowNormalBias=$.normalBias,ae.shadowRadius=$.radius,ae.shadowMapSize=$.mapSize,ae.shadowCameraNear=$.camera.near,ae.shadowCameraFar=$.camera.far,n.pointShadow[d]=ae,n.pointShadowMap[d]=q,n.pointShadowMatrix[d]=U.shadow.matrix,v++}n.point[d]=W,d++}else if(U.isHemisphereLight){let W=e.get(U);W.skyColor.copy(U.color).multiplyScalar(R),W.groundColor.copy(U.groundColor).multiplyScalar(R),n.hemi[m]=W,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Xe.LTC_FLOAT_1,n.rectAreaLTC2=Xe.LTC_FLOAT_2):(n.rectAreaLTC1=Xe.LTC_HALF_1,n.rectAreaLTC2=Xe.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===p&&b.rectAreaLength===g&&b.hemiLength===m&&b.numDirectionalShadows===f&&b.numPointShadows===v&&b.numSpotShadows===y&&b.numSpotMaps===_&&b.numLightProbes===T||(n.directional.length=u,n.spot.length=p,n.rectArea.length=g,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=T,b.directionalLength=u,b.pointLength=d,b.spotLength=p,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=f,b.numPointShadows=v,b.numSpotShadows=y,b.numSpotMaps=_,b.numLightProbes=T,n.version=x0++)},setupView:function(o,l){let c=0,h=0,u=0,d=0,p=0,g=l.matrixWorldInverse;for(let m=0,f=o.length;m<f;m++){let v=o[m];if(v.isDirectionalLight){let y=n.directional[c];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),c++}else if(v.isSpotLight){let y=n.spot[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(v.isRectAreaLight){let y=n.rectArea[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(.5*v.width,0,0),y.halfHeight.set(0,.5*v.height,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),d++}else if(v.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){let y=n.hemi[p];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),p++}}},state:n}}function Cp(r){let e=new T0(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function b0(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Cp(r),e.set(t,[s])):n>=i.length?(s=new Cp(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function S0(r,e,t){let n=new xr,i=new _e,s=new _e,a=new Yt,o=new br({depthPacking:Js}),l=new Ko,c={},h=t.maxTextureSize,u={[Sr]:ai,[ai]:Sr,[Bt]:Bt},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new ht;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new at(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cc;let v=this.type;function y(b,P){let B=e.update(m);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new di(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(P,null,B,d,m,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(P,null,B,p,m,null)}function _(b,P,B,U){let F=null,R=B.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)F=R;else if(F=B.isPointLight===!0?l:o,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let L=F.uuid,q=P.uuid,W=c[L];W===void 0&&(W={},c[L]=W);let $=W[q];$===void 0&&($=F.clone(),W[q]=$,P.addEventListener("dispose",T)),F=$}return F.visible=P.visible,F.wireframe=P.wireframe,F.side=U===Oi?P.shadowSide!==null?P.shadowSide:P.side:P.shadowSide!==null?P.shadowSide:u[P.side],F.alphaMap=P.alphaMap,F.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,F.map=P.map,F.clipShadows=P.clipShadows,F.clippingPlanes=P.clippingPlanes,F.clipIntersection=P.clipIntersection,F.displacementMap=P.displacementMap,F.displacementScale=P.displacementScale,F.displacementBias=P.displacementBias,F.wireframeLinewidth=P.wireframeLinewidth,F.linewidth=P.linewidth,B.isPointLight===!0&&F.isMeshDistanceMaterial===!0&&(r.properties.get(F).light=B),F}function x(b,P,B,U,F){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&F===Oi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld);let L=e.update(b),q=b.material;if(Array.isArray(q)){let W=L.groups;for(let $=0,ae=W.length;$<ae;$++){let Z=W[$],oe=q[Z.materialIndex];if(oe&&oe.visible){let De=_(b,oe,U,F);b.onBeforeShadow(r,b,P,B,L,De,Z),r.renderBufferDirect(B,null,L,De,b,Z),b.onAfterShadow(r,b,P,B,L,De,Z)}}}else if(q.visible){let W=_(b,q,U,F);b.onBeforeShadow(r,b,P,B,L,W,null),r.renderBufferDirect(B,null,L,W,b,null),b.onAfterShadow(r,b,P,B,L,W,null)}}let R=b.children;for(let L=0,q=R.length;L<q;L++)x(R[L],P,B,U,F)}function T(b){b.target.removeEventListener("dispose",T);for(let P in c){let B=c[P],U=b.target.uuid;U in B&&(B[U].dispose(),delete B[U])}}this.render=function(b,P,B){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;let U=r.getRenderTarget(),F=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),L=r.state;L.setBlending(wr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let q=v!==Oi&&this.type===Oi,W=v===Oi&&this.type!==Oi;for(let $=0,ae=b.length;$<ae;$++){let Z=b[$],oe=Z.shadow;if(oe===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(oe.autoUpdate===!1&&oe.needsUpdate===!1)continue;i.copy(oe.mapSize);let De=oe.getFrameExtents();if(i.multiply(De),s.copy(oe.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/De.x),i.x=s.x*De.x,oe.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/De.y),i.y=s.y*De.y,oe.mapSize.y=s.y)),oe.map===null||q===!0||W===!0){let Me=this.type!==Oi?{minFilter:ii,magFilter:ii}:{};oe.map!==null&&oe.map.dispose(),oe.map=new di(i.x,i.y,Me),oe.map.texture.name=Z.name+".shadowMap",oe.camera.updateProjectionMatrix()}r.setRenderTarget(oe.map),r.clear();let Oe=oe.getViewportCount();for(let Me=0;Me<Oe;Me++){let Ge=oe.getViewport(Me);a.set(s.x*Ge.x,s.y*Ge.y,s.x*Ge.z,s.y*Ge.w),L.viewport(a),oe.updateMatrices(Z,Me),n=oe.getFrustum(),x(P,B,oe.camera,Z,this.type)}oe.isPointLightShadow!==!0&&this.type===Oi&&y(oe,B),oe.needsUpdate=!1}v=this.type,f.needsUpdate=!1,r.setRenderTarget(U,F,R)}}var w0={[rl]:sl,[al]:cl,[ol]:hl,[Ga]:ll,[sl]:rl,[cl]:al,[hl]:ol,[ll]:Ga};function E0(r,e){let t=new function(){let w=!1,N=new Yt,j=null,V=new Yt(0,0,0,0);return{setMask:function(pe){j===pe||w||(r.colorMask(pe,pe,pe,pe),j=pe)},setLocked:function(pe){w=pe},setClear:function(pe,ne,ie,Ee,We){We===!0&&(pe*=Ee,ne*=Ee,ie*=Ee),N.set(pe,ne,ie,Ee),V.equals(N)===!1&&(r.clearColor(pe,ne,ie,Ee),V.copy(N))},reset:function(){w=!1,j=null,V.set(-1,0,0,0)}}},n=new function(){let w=!1,N=!1,j=null,V=null,pe=null;return{setReversed:function(ne){if(N!==ne){let ie=e.get("EXT_clip_control");ne?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT),N=ne;let Ee=pe;pe=null,this.setClear(Ee)}},getReversed:function(){return N},setTest:function(ne){ne?Ne(r.DEPTH_TEST):te(r.DEPTH_TEST)},setMask:function(ne){j===ne||w||(r.depthMask(ne),j=ne)},setFunc:function(ne){if(N&&(ne=w0[ne]),V!==ne){switch(ne){case rl:r.depthFunc(r.NEVER);break;case sl:r.depthFunc(r.ALWAYS);break;case al:r.depthFunc(r.LESS);break;case Ga:r.depthFunc(r.LEQUAL);break;case ol:r.depthFunc(r.EQUAL);break;case ll:r.depthFunc(r.GEQUAL);break;case cl:r.depthFunc(r.GREATER);break;case hl:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}V=ne}},setLocked:function(ne){w=ne},setClear:function(ne){pe!==ne&&(N&&(ne=1-ne),r.clearDepth(ne),pe=ne)},reset:function(){w=!1,j=null,V=null,pe=null,N=!1}}},i=new function(){let w=!1,N=null,j=null,V=null,pe=null,ne=null,ie=null,Ee=null,We=null;return{setTest:function(Ie){w||(Ie?Ne(r.STENCIL_TEST):te(r.STENCIL_TEST))},setMask:function(Ie){N===Ie||w||(r.stencilMask(Ie),N=Ie)},setFunc:function(Ie,Je,ut){j===Ie&&V===Je&&pe===ut||(r.stencilFunc(Ie,Je,ut),j=Ie,V=Je,pe=ut)},setOp:function(Ie,Je,ut){ne===Ie&&ie===Je&&Ee===ut||(r.stencilOp(Ie,Je,ut),ne=Ie,ie=Je,Ee=ut)},setLocked:function(Ie){w=Ie},setClear:function(Ie){We!==Ie&&(r.clearStencil(Ie),We=Ie)},reset:function(){w=!1,N=null,j=null,V=null,pe=null,ne=null,ie=null,Ee=null,We=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,g=null,m=null,f=null,v=null,y=null,_=null,x=new Ye(0,0,0),T=0,b=!1,P=null,B=null,U=null,F=null,R=null,L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,$=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec($)[1]),q=W>=1):$.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=W>=2);let ae=null,Z={},oe=r.getParameter(r.SCISSOR_BOX),De=r.getParameter(r.VIEWPORT),Oe=new Yt().fromArray(oe),Me=new Yt().fromArray(De);function Ge(w,N,j,V){let pe=new Uint8Array(4),ne=r.createTexture();r.bindTexture(w,ne),r.texParameteri(w,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(w,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ie=0;ie<j;ie++)w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY?r.texImage3D(N,0,r.RGBA,1,1,V,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(N+ie,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return ne}let Ce={};function Ne(w){o[w]!==!0&&(r.enable(w),o[w]=!0)}function te(w){o[w]!==!1&&(r.disable(w),o[w]=!1)}Ce[r.TEXTURE_2D]=Ge(r.TEXTURE_2D,r.TEXTURE_2D,1),Ce[r.TEXTURE_CUBE_MAP]=Ge(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ce[r.TEXTURE_2D_ARRAY]=Ge(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ce[r.TEXTURE_3D]=Ge(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Ne(r.DEPTH_TEST),n.setFunc(Ga),I(!1),X(Ac),Ne(r.CULL_FACE),A(wr);let k={[Xs]:r.FUNC_ADD,[hd]:r.FUNC_SUBTRACT,[ud]:r.FUNC_REVERSE_SUBTRACT};k[dd]=r.MIN,k[pd]=r.MAX;let Te={[fd]:r.ZERO,[md]:r.ONE,[gd]:r.SRC_COLOR,[yd]:r.SRC_ALPHA,[Sd]:r.SRC_ALPHA_SATURATE,[Td]:r.DST_COLOR,[xd]:r.DST_ALPHA,[vd]:r.ONE_MINUS_SRC_COLOR,[_d]:r.ONE_MINUS_SRC_ALPHA,[bd]:r.ONE_MINUS_DST_COLOR,[Md]:r.ONE_MINUS_DST_ALPHA,[wd]:r.CONSTANT_COLOR,[Ed]:r.ONE_MINUS_CONSTANT_COLOR,[Ad]:r.CONSTANT_ALPHA,[Cd]:r.ONE_MINUS_CONSTANT_ALPHA};function A(w,N,j,V,pe,ne,ie,Ee,We,Ie){if(w!==wr){if(d===!1&&(Ne(r.BLEND),d=!0),w===cd)pe=pe||N,ne=ne||j,ie=ie||V,N===g&&pe===v||(r.blendEquationSeparate(k[N],k[pe]),g=N,v=pe),j===m&&V===f&&ne===y&&ie===_||(r.blendFuncSeparate(Te[j],Te[V],Te[ne],Te[ie]),m=j,f=V,y=ne,_=ie),Ee.equals(x)!==!1&&We===T||(r.blendColor(Ee.r,Ee.g,Ee.b,We),x.copy(Ee),T=We),p=w,b=!1;else if(w!==p||Ie!==b){if(g===Xs&&v===Xs||(r.blendEquation(r.FUNC_ADD),g=Xs,v=Xs),Ie)switch(w){case Fa:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case za:r.blendFunc(r.ONE,r.ONE);break;case Rc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ic:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",w)}else switch(w){case Fa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case za:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Rc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ic:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",w)}m=null,f=null,y=null,_=null,x.set(0,0,0),T=0,p=w,b=Ie}}else d===!0&&(te(r.BLEND),d=!1)}function I(w){P!==w&&(w?r.frontFace(r.CW):r.frontFace(r.CCW),P=w)}function X(w){w!==od?(Ne(r.CULL_FACE),w!==B&&(w===Ac?r.cullFace(r.BACK):w===ld?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):te(r.CULL_FACE),B=w}function H(w,N,j){w?(Ne(r.POLYGON_OFFSET_FILL),F===N&&R===j||(r.polygonOffset(N,j),F=N,R=j)):te(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Ne,disable:te,bindFramebuffer:function(w,N){return l[w]!==N&&(r.bindFramebuffer(w,N),l[w]=N,w===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=N),w===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=N),!0)},drawBuffers:function(w,N){let j=h,V=!1;if(w){j=c.get(N),j===void 0&&(j=[],c.set(N,j));let pe=w.textures;if(j.length!==pe.length||j[0]!==r.COLOR_ATTACHMENT0){for(let ne=0,ie=pe.length;ne<ie;ne++)j[ne]=r.COLOR_ATTACHMENT0+ne;j.length=pe.length,V=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,V=!0);V&&r.drawBuffers(j)},useProgram:function(w){return u!==w&&(r.useProgram(w),u=w,!0)},setBlending:A,setMaterial:function(w,N){w.side===Bt?te(r.CULL_FACE):Ne(r.CULL_FACE);let j=w.side===ai;N&&(j=!j),I(j),w.blending===Fa&&w.transparent===!1?A(wr):A(w.blending,w.blendEquation,w.blendSrc,w.blendDst,w.blendEquationAlpha,w.blendSrcAlpha,w.blendDstAlpha,w.blendColor,w.blendAlpha,w.premultipliedAlpha),n.setFunc(w.depthFunc),n.setTest(w.depthTest),n.setMask(w.depthWrite),t.setMask(w.colorWrite);let V=w.stencilWrite;i.setTest(V),V&&(i.setMask(w.stencilWriteMask),i.setFunc(w.stencilFunc,w.stencilRef,w.stencilFuncMask),i.setOp(w.stencilFail,w.stencilZFail,w.stencilZPass)),H(w.polygonOffset,w.polygonOffsetFactor,w.polygonOffsetUnits),w.alphaToCoverage===!0?Ne(r.SAMPLE_ALPHA_TO_COVERAGE):te(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:I,setCullFace:X,setLineWidth:function(w){w!==U&&(q&&r.lineWidth(w),U=w)},setPolygonOffset:H,setScissorTest:function(w){w?Ne(r.SCISSOR_TEST):te(r.SCISSOR_TEST)},activeTexture:function(w){w===void 0&&(w=r.TEXTURE0+L-1),ae!==w&&(r.activeTexture(w),ae=w)},bindTexture:function(w,N,j){j===void 0&&(j=ae===null?r.TEXTURE0+L-1:ae);let V=Z[j];V===void 0&&(V={type:void 0,texture:void 0},Z[j]=V),V.type===w&&V.texture===N||(ae!==j&&(r.activeTexture(j),ae=j),r.bindTexture(w,N||Ce[w]),V.type=w,V.texture=N)},unbindTexture:function(){let w=Z[ae];w!==void 0&&w.type!==void 0&&(r.bindTexture(w.type,null),w.type=void 0,w.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},updateUBOMapping:function(w,N){let j=a.get(N);j===void 0&&(j=new WeakMap,a.set(N,j));let V=j.get(w);V===void 0&&(V=r.getUniformBlockIndex(N,w.name),j.set(w,V))},uniformBlockBinding:function(w,N){let j=a.get(N).get(w);s.get(N)!==j&&(r.uniformBlockBinding(N,j,w.__bindingPointIndex),s.set(N,j))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(w){console.error("THREE.WebGLState:",w)}},scissor:function(w){Oe.equals(w)===!1&&(r.scissor(w.x,w.y,w.z,w.w),Oe.copy(w))},viewport:function(w){Me.equals(w)===!1&&(r.viewport(w.x,w.y,w.z,w.w),Me.copy(w))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ae=null,Z={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,g=null,m=null,f=null,v=null,y=null,_=null,x=new Ye(0,0,0),T=0,b=!1,P=null,B=null,U=null,F=null,R=null,Oe.set(0,0,r.canvas.width,r.canvas.height),Me.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function A0(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new _e,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,I){return p?new OffscreenCanvas(A,I):Is("canvas")}function m(A,I,X){let H=1,w=Te(A);if((w.width>X||w.height>X)&&(H=X/Math.max(w.width,w.height)),H<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let N=Math.floor(H*w.width),j=Math.floor(H*w.height);u===void 0&&(u=g(N,j));let V=I?g(N,j):u;return V.width=N,V.height=j,V.getContext("2d").drawImage(A,0,0,N,j),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+N+"x"+j+")."),V}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),A}return A}function f(A){return A.generateMipmaps}function v(A){r.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,I,X,H,w=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let N=I;if(I===r.RED&&(X===r.FLOAT&&(N=r.R32F),X===r.HALF_FLOAT&&(N=r.R16F),X===r.UNSIGNED_BYTE&&(N=r.R8)),I===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(N=r.R8UI),X===r.UNSIGNED_SHORT&&(N=r.R16UI),X===r.UNSIGNED_INT&&(N=r.R32UI),X===r.BYTE&&(N=r.R8I),X===r.SHORT&&(N=r.R16I),X===r.INT&&(N=r.R32I)),I===r.RG&&(X===r.FLOAT&&(N=r.RG32F),X===r.HALF_FLOAT&&(N=r.RG16F),X===r.UNSIGNED_BYTE&&(N=r.RG8)),I===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(N=r.RG8UI),X===r.UNSIGNED_SHORT&&(N=r.RG16UI),X===r.UNSIGNED_INT&&(N=r.RG32UI),X===r.BYTE&&(N=r.RG8I),X===r.SHORT&&(N=r.RG16I),X===r.INT&&(N=r.RG32I)),I===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(N=r.RGB8UI),X===r.UNSIGNED_SHORT&&(N=r.RGB16UI),X===r.UNSIGNED_INT&&(N=r.RGB32UI),X===r.BYTE&&(N=r.RGB8I),X===r.SHORT&&(N=r.RGB16I),X===r.INT&&(N=r.RGB32I)),I===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(N=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(N=r.RGBA16UI),X===r.UNSIGNED_INT&&(N=r.RGBA32UI),X===r.BYTE&&(N=r.RGBA8I),X===r.SHORT&&(N=r.RGBA16I),X===r.INT&&(N=r.RGBA32I)),I===r.RGB&&(X===r.UNSIGNED_INT_5_9_9_9_REV&&(N=r.RGB9_E5),X===r.UNSIGNED_INT_10F_11F_11F_REV&&(N=r.R11F_G11F_B10F)),I===r.RGBA){let j=w?ga:zt.getTransfer(H);X===r.FLOAT&&(N=r.RGBA32F),X===r.HALF_FLOAT&&(N=r.RGBA16F),X===r.UNSIGNED_BYTE&&(N=j===nn?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(N=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(N=r.RGB5_A1)}return N!==r.R16F&&N!==r.R32F&&N!==r.RG16F&&N!==r.RG32F&&N!==r.RGBA16F&&N!==r.RGBA32F||e.get("EXT_color_buffer_float"),N}function x(A,I){let X;return A?I===null||I===ns||I===Zs?X=r.DEPTH24_STENCIL8:I===fi?X=r.DEPTH32F_STENCIL8:I===Ys&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):I===null||I===ns||I===Zs?X=r.DEPTH_COMPONENT24:I===fi?X=r.DEPTH_COMPONENT32F:I===Ys&&(X=r.DEPTH_COMPONENT16),X}function T(A,I){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==ii&&A.minFilter!==Nn?Math.log2(Math.max(I.width,I.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?I.mipmaps.length:1}function b(A){let I=A.target;I.removeEventListener("dispose",b),(function(X){let H=n.get(X);if(H.__webglInit===void 0)return;let w=X.source,N=d.get(w);if(N){let j=N[H.__cacheKey];j.usedTimes--,j.usedTimes===0&&B(X),Object.keys(N).length===0&&d.delete(w)}n.remove(X)})(I),I.isVideoTexture&&h.delete(I)}function P(A){let I=A.target;I.removeEventListener("dispose",P),(function(X){let H=n.get(X);if(X.depthTexture&&(X.depthTexture.dispose(),n.remove(X.depthTexture)),X.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(H.__webglFramebuffer[N]))for(let j=0;j<H.__webglFramebuffer[N].length;j++)r.deleteFramebuffer(H.__webglFramebuffer[N][j]);else r.deleteFramebuffer(H.__webglFramebuffer[N]);H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer[N])}else{if(Array.isArray(H.__webglFramebuffer))for(let N=0;N<H.__webglFramebuffer.length;N++)r.deleteFramebuffer(H.__webglFramebuffer[N]);else r.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&r.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let N=0;N<H.__webglColorRenderbuffer.length;N++)H.__webglColorRenderbuffer[N]&&r.deleteRenderbuffer(H.__webglColorRenderbuffer[N]);H.__webglDepthRenderbuffer&&r.deleteRenderbuffer(H.__webglDepthRenderbuffer)}let w=X.textures;for(let N=0,j=w.length;N<j;N++){let V=n.get(w[N]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(w[N])}n.remove(X)})(I)}function B(A){let I=n.get(A);r.deleteTexture(I.__webglTexture);let X=A.source;delete d.get(X)[I.__cacheKey],a.memory.textures--}let U=0;function F(A,I){let X=n.get(A);if(A.isVideoTexture&&(function(H){let w=a.render.frame;h.get(H)!==w&&(h.set(H,w),H.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&X.__version!==A.version){let H=A.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(H.complete!==!1)return void Z(X,A,I);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+I)}let R={[vn]:r.REPEAT,[vr]:r.CLAMP_TO_EDGE,[Rs]:r.MIRRORED_REPEAT},L={[ii]:r.NEAREST,[pl]:r.NEAREST_MIPMAP_NEAREST,[ts]:r.NEAREST_MIPMAP_LINEAR,[Nn]:r.LINEAR,[qs]:r.LINEAR_MIPMAP_NEAREST,[ei]:r.LINEAR_MIPMAP_LINEAR},q={[Wd]:r.NEVER,[Kd]:r.ALWAYS,[Xd]:r.LESS,[ph]:r.LEQUAL,[jd]:r.EQUAL,[Zd]:r.GEQUAL,[qd]:r.GREATER,[Yd]:r.NOTEQUAL};function W(A,I){if(I.type!==fi||e.has("OES_texture_float_linear")!==!1||I.magFilter!==Nn&&I.magFilter!==qs&&I.magFilter!==ts&&I.magFilter!==ei&&I.minFilter!==Nn&&I.minFilter!==qs&&I.minFilter!==ts&&I.minFilter!==ei||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,R[I.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,R[I.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,R[I.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,L[I.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,L[I.minFilter]),I.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,q[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(I.magFilter===ii||I.minFilter!==ts&&I.minFilter!==ei||I.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(I.anisotropy>1||n.get(I).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,i.getMaxAnisotropy())),n.get(I).__currentAnisotropy=I.anisotropy}}}function $(A,I){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,I.addEventListener("dispose",b));let H=I.source,w=d.get(H);w===void 0&&(w={},d.set(H,w));let N=(function(j){let V=[];return V.push(j.wrapS),V.push(j.wrapT),V.push(j.wrapR||0),V.push(j.magFilter),V.push(j.minFilter),V.push(j.anisotropy),V.push(j.internalFormat),V.push(j.format),V.push(j.type),V.push(j.generateMipmaps),V.push(j.premultiplyAlpha),V.push(j.flipY),V.push(j.unpackAlignment),V.push(j.colorSpace),V.join()})(I);if(N!==A.__cacheKey){w[N]===void 0&&(w[N]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),w[N].usedTimes++;let j=w[A.__cacheKey];j!==void 0&&(w[A.__cacheKey].usedTimes--,j.usedTimes===0&&B(I)),A.__cacheKey=N,A.__webglTexture=w[N].texture}return X}function ae(A,I,X){return Math.floor(Math.floor(A/X)/I)}function Z(A,I,X){let H=r.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(H=r.TEXTURE_2D_ARRAY),I.isData3DTexture&&(H=r.TEXTURE_3D);let w=$(A,I),N=I.source;t.bindTexture(H,A.__webglTexture,r.TEXTURE0+X);let j=n.get(N);if(N.version!==j.__version||w===!0){t.activeTexture(r.TEXTURE0+X);let V=zt.getPrimaries(zt.workingColorSpace),pe=I.colorSpace===is?null:zt.getPrimaries(I.colorSpace),ne=I.colorSpace===is||V===pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,I.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,I.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let ie=m(I.image,!1,i.maxTextureSize);ie=k(I,ie);let Ee=s.convert(I.format,I.colorSpace),We=s.convert(I.type),Ie,Je=_(I.internalFormat,Ee,We,I.colorSpace,I.isVideoTexture);W(H,I);let ut=I.mipmaps,ft=I.isVideoTexture!==!0,It=j.__version===void 0||w===!0,St=N.dataReady,_t=T(I,ie);if(I.isDepthTexture)Je=x(I.format===Ha,I.type),It&&(ft?t.texStorage2D(r.TEXTURE_2D,1,Je,ie.width,ie.height):t.texImage2D(r.TEXTURE_2D,0,Je,ie.width,ie.height,0,Ee,We,null));else if(I.isDataTexture)if(ut.length>0){ft&&It&&t.texStorage2D(r.TEXTURE_2D,_t,Je,ut[0].width,ut[0].height);for(let z=0,ee=ut.length;z<ee;z++)Ie=ut[z],ft?St&&t.texSubImage2D(r.TEXTURE_2D,z,0,0,Ie.width,Ie.height,Ee,We,Ie.data):t.texImage2D(r.TEXTURE_2D,z,Je,Ie.width,Ie.height,0,Ee,We,Ie.data);I.generateMipmaps=!1}else ft?(It&&t.texStorage2D(r.TEXTURE_2D,_t,Je,ie.width,ie.height),St&&(function(z,ee,fe,Se){let Y=z.updateRanges;if(Y.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee.width,ee.height,fe,Se,ee.data);else{Y.sort((C,le)=>C.start-le.start);let ce=0;for(let C=1;C<Y.length;C++){let le=Y[ce],we=Y[C],ve=le.start+le.count,ze=ae(we.start,ee.width,4),it=ae(le.start,ee.width,4);we.start<=ve+1&&ze===it&&ae(we.start+we.count-1,ee.width,4)===ze?le.count=Math.max(le.count,we.start+we.count-le.start):(++ce,Y[ce]=we)}Y.length=ce+1;let de=r.getParameter(r.UNPACK_ROW_LENGTH),be=r.getParameter(r.UNPACK_SKIP_PIXELS),xe=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,ee.width);for(let C=0,le=Y.length;C<le;C++){let we=Y[C],ve=Math.floor(we.start/4),ze=Math.ceil(we.count/4),it=ve%ee.width,Be=Math.floor(ve/ee.width),dt=ze;r.pixelStorei(r.UNPACK_SKIP_PIXELS,it),r.pixelStorei(r.UNPACK_SKIP_ROWS,Be),t.texSubImage2D(r.TEXTURE_2D,0,it,Be,dt,1,fe,Se,ee.data)}z.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,de),r.pixelStorei(r.UNPACK_SKIP_PIXELS,be),r.pixelStorei(r.UNPACK_SKIP_ROWS,xe)}})(I,ie,Ee,We)):t.texImage2D(r.TEXTURE_2D,0,Je,ie.width,ie.height,0,Ee,We,ie.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){ft&&It&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_t,Je,ut[0].width,ut[0].height,ie.depth);for(let z=0,ee=ut.length;z<ee;z++)if(Ie=ut[z],I.format!==mi)if(Ee!==null)if(ft){if(St)if(I.layerUpdates.size>0){let fe=xh(Ie.width,Ie.height,I.format,I.type);for(let Se of I.layerUpdates){let Y=Ie.data.subarray(Se*fe/Ie.data.BYTES_PER_ELEMENT,(Se+1)*fe/Ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,z,0,0,Se,Ie.width,Ie.height,1,Ee,Y)}I.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,z,0,0,0,Ie.width,Ie.height,ie.depth,Ee,Ie.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,z,Je,Ie.width,Ie.height,ie.depth,0,Ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?St&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,z,0,0,0,Ie.width,Ie.height,ie.depth,Ee,We,Ie.data):t.texImage3D(r.TEXTURE_2D_ARRAY,z,Je,Ie.width,Ie.height,ie.depth,0,Ee,We,Ie.data)}else{ft&&It&&t.texStorage2D(r.TEXTURE_2D,_t,Je,ut[0].width,ut[0].height);for(let z=0,ee=ut.length;z<ee;z++)Ie=ut[z],I.format!==mi?Ee!==null?ft?St&&t.compressedTexSubImage2D(r.TEXTURE_2D,z,0,0,Ie.width,Ie.height,Ee,Ie.data):t.compressedTexImage2D(r.TEXTURE_2D,z,Je,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?St&&t.texSubImage2D(r.TEXTURE_2D,z,0,0,Ie.width,Ie.height,Ee,We,Ie.data):t.texImage2D(r.TEXTURE_2D,z,Je,Ie.width,Ie.height,0,Ee,We,Ie.data)}else if(I.isDataArrayTexture)if(ft){if(It&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_t,Je,ie.width,ie.height,ie.depth),St)if(I.layerUpdates.size>0){let z=xh(ie.width,ie.height,I.format,I.type);for(let ee of I.layerUpdates){let fe=ie.data.subarray(ee*z/ie.data.BYTES_PER_ELEMENT,(ee+1)*z/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ee,ie.width,ie.height,1,Ee,We,fe)}I.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Ee,We,ie.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Je,ie.width,ie.height,ie.depth,0,Ee,We,ie.data);else if(I.isData3DTexture)ft?(It&&t.texStorage3D(r.TEXTURE_3D,_t,Je,ie.width,ie.height,ie.depth),St&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Ee,We,ie.data)):t.texImage3D(r.TEXTURE_3D,0,Je,ie.width,ie.height,ie.depth,0,Ee,We,ie.data);else if(I.isFramebufferTexture){if(It)if(ft)t.texStorage2D(r.TEXTURE_2D,_t,Je,ie.width,ie.height);else{let z=ie.width,ee=ie.height;for(let fe=0;fe<_t;fe++)t.texImage2D(r.TEXTURE_2D,fe,Je,z,ee,0,Ee,We,null),z>>=1,ee>>=1}}else if(ut.length>0){if(ft&&It){let z=Te(ut[0]);t.texStorage2D(r.TEXTURE_2D,_t,Je,z.width,z.height)}for(let z=0,ee=ut.length;z<ee;z++)Ie=ut[z],ft?St&&t.texSubImage2D(r.TEXTURE_2D,z,0,0,Ee,We,Ie):t.texImage2D(r.TEXTURE_2D,z,Je,Ee,We,Ie);I.generateMipmaps=!1}else if(ft){if(It){let z=Te(ie);t.texStorage2D(r.TEXTURE_2D,_t,Je,z.width,z.height)}St&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,We,ie)}else t.texImage2D(r.TEXTURE_2D,0,Je,Ee,We,ie);f(I)&&v(H),j.__version=N.version,I.onUpdate&&I.onUpdate(I)}A.__version=I.version}function oe(A,I,X,H,w,N){let j=s.convert(X.format,X.colorSpace),V=s.convert(X.type),pe=_(X.internalFormat,j,V,X.colorSpace),ne=n.get(I),ie=n.get(X);if(ie.__renderTarget=I,!ne.__hasExternalTextures){let Ee=Math.max(1,I.width>>N),We=Math.max(1,I.height>>N);w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY?t.texImage3D(w,N,pe,Ee,We,I.depth,0,j,V,null):t.texImage2D(w,N,pe,Ee,We,0,j,V,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),te(I)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,H,w,ie.__webglTexture,0,Ne(I)):(w===r.TEXTURE_2D||w>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&w<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,H,w,ie.__webglTexture,N),t.bindFramebuffer(r.FRAMEBUFFER,null)}function De(A,I,X){if(r.bindRenderbuffer(r.RENDERBUFFER,A),I.depthBuffer){let H=I.depthTexture,w=H&&H.isDepthTexture?H.type:null,N=x(I.stencilBuffer,w),j=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=Ne(I);te(I)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,V,N,I.width,I.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,V,N,I.width,I.height):r.renderbufferStorage(r.RENDERBUFFER,N,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,A)}else{let H=I.textures;for(let w=0;w<H.length;w++){let N=H[w],j=s.convert(N.format,N.colorSpace),V=s.convert(N.type),pe=_(N.internalFormat,j,V,N.colorSpace),ne=Ne(I);X&&te(I)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,pe,I.width,I.height):te(I)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,pe,I.width,I.height):r.renderbufferStorage(r.RENDERBUFFER,pe,I.width,I.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Oe(A,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!I.depthTexture||!I.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(I.depthTexture);X.__renderTarget=I,X.__webglTexture&&I.depthTexture.image.width===I.width&&I.depthTexture.image.height===I.height||(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),F(I.depthTexture,0);let H=X.__webglTexture,w=Ne(I);if(I.depthTexture.format===Va)te(I)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,H,0,w):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,H,0);else{if(I.depthTexture.format!==Ha)throw new Error("Unknown depthTexture format");te(I)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,H,0,w):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,H,0)}}function Me(A){let I=n.get(A),X=A.isWebGLCubeRenderTarget===!0;if(I.__boundDepthTexture!==A.depthTexture){let H=A.depthTexture;if(I.__depthDisposeCallback&&I.__depthDisposeCallback(),H){let w=()=>{delete I.__boundDepthTexture,delete I.__depthDisposeCallback,H.removeEventListener("dispose",w)};H.addEventListener("dispose",w),I.__depthDisposeCallback=w}I.__boundDepthTexture=H}if(A.depthTexture&&!I.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");let H=A.texture.mipmaps;H&&H.length>0?Oe(I.__webglFramebuffer[0],A):Oe(I.__webglFramebuffer,A)}else if(X){I.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer[H]),I.__webglDepthbuffer[H]===void 0)I.__webglDepthbuffer[H]=r.createRenderbuffer(),De(I.__webglDepthbuffer[H],A,!1);else{let w=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=I.__webglDepthbuffer[H];r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,w,r.RENDERBUFFER,N)}}else{let H=A.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer===void 0)I.__webglDepthbuffer=r.createRenderbuffer(),De(I.__webglDepthbuffer,A,!1);else{let w=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=I.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,w,r.RENDERBUFFER,N)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ge=[],Ce=[];function Ne(A){return Math.min(i.maxSamples,A.samples)}function te(A){let I=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function k(A,I){let X=A.colorSpace,H=A.format,w=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==Un&&X!==is&&(zt.getTransfer(X)===nn?H===mi&&w===Fi||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),I}function Te(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=function(){let A=U;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),U+=1,A},this.resetTextureUnits=function(){U=0},this.setTexture2D=F,this.setTexture2DArray=function(A,I){let X=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version?Z(X,A,I):t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+I)},this.setTexture3D=function(A,I){let X=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version?Z(X,A,I):t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+I)},this.setTextureCube=function(A,I){let X=n.get(A);A.version>0&&X.__version!==A.version?(function(H,w,N){if(w.image.length!==6)return;let j=$(H,w),V=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+N);let pe=n.get(V);if(V.version!==pe.__version||j===!0){t.activeTexture(r.TEXTURE0+N);let ne=zt.getPrimaries(zt.workingColorSpace),ie=w.colorSpace===is?null:zt.getPrimaries(w.colorSpace),Ee=w.colorSpace===is||ne===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let We=w.isCompressedTexture||w.image[0].isCompressedTexture,Ie=w.image[0]&&w.image[0].isDataTexture,Je=[];for(let Y=0;Y<6;Y++)Je[Y]=We||Ie?Ie?w.image[Y].image:w.image[Y]:m(w.image[Y],!0,i.maxCubemapSize),Je[Y]=k(w,Je[Y]);let ut=Je[0],ft=s.convert(w.format,w.colorSpace),It=s.convert(w.type),St=_(w.internalFormat,ft,It,w.colorSpace),_t=w.isVideoTexture!==!0,z=pe.__version===void 0||j===!0,ee=V.dataReady,fe,Se=T(w,ut);if(W(r.TEXTURE_CUBE_MAP,w),We){_t&&z&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,St,ut.width,ut.height);for(let Y=0;Y<6;Y++){fe=Je[Y].mipmaps;for(let ce=0;ce<fe.length;ce++){let de=fe[ce];w.format!==mi?ft!==null?_t?ee&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,de.width,de.height,ft,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,St,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):_t?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,de.width,de.height,ft,It,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,St,de.width,de.height,0,ft,It,de.data)}}}else{if(fe=w.mipmaps,_t&&z){fe.length>0&&Se++;let Y=Te(Je[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,St,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Ie){_t?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Je[Y].width,Je[Y].height,ft,It,Je[Y].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,St,Je[Y].width,Je[Y].height,0,ft,It,Je[Y].data);for(let ce=0;ce<fe.length;ce++){let de=fe[ce].image[Y].image;_t?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,de.width,de.height,ft,It,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,St,de.width,de.height,0,ft,It,de.data)}}else{_t?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ft,It,Je[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,St,ft,It,Je[Y]);for(let ce=0;ce<fe.length;ce++){let de=fe[ce];_t?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,ft,It,de.image[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,St,ft,It,de.image[Y])}}}f(w)&&v(r.TEXTURE_CUBE_MAP),pe.__version=V.version,w.onUpdate&&w.onUpdate(w)}H.__version=w.version})(X,A,I):t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+I)},this.rebindTextures=function(A,I,X){let H=n.get(A);I!==void 0&&oe(H.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&Me(A)},this.setupRenderTarget=function(A){let I=A.texture,X=n.get(A),H=n.get(I);A.addEventListener("dispose",P);let w=A.textures,N=A.isWebGLCubeRenderTarget===!0,j=w.length>1;if(j||(H.__webglTexture===void 0&&(H.__webglTexture=r.createTexture()),H.__version=I.version,a.memory.textures++),N){X.__webglFramebuffer=[];for(let V=0;V<6;V++)if(I.mipmaps&&I.mipmaps.length>0){X.__webglFramebuffer[V]=[];for(let pe=0;pe<I.mipmaps.length;pe++)X.__webglFramebuffer[V][pe]=r.createFramebuffer()}else X.__webglFramebuffer[V]=r.createFramebuffer()}else{if(I.mipmaps&&I.mipmaps.length>0){X.__webglFramebuffer=[];for(let V=0;V<I.mipmaps.length;V++)X.__webglFramebuffer[V]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(j)for(let V=0,pe=w.length;V<pe;V++){let ne=n.get(w[V]);ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&te(A)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let V=0;V<w.length;V++){let pe=w[V];X.__webglColorRenderbuffer[V]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[V]);let ne=s.convert(pe.format,pe.colorSpace),ie=s.convert(pe.type),Ee=_(pe.internalFormat,ne,ie,pe.colorSpace,A.isXRRenderTarget===!0),We=Ne(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,We,Ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.RENDERBUFFER,X.__webglColorRenderbuffer[V])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),De(X.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(N){t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture),W(r.TEXTURE_CUBE_MAP,I);for(let V=0;V<6;V++)if(I.mipmaps&&I.mipmaps.length>0)for(let pe=0;pe<I.mipmaps.length;pe++)oe(X.__webglFramebuffer[V][pe],A,I,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+V,pe);else oe(X.__webglFramebuffer[V],A,I,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);f(I)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(j){for(let V=0,pe=w.length;V<pe;V++){let ne=w[V],ie=n.get(ne),Ee=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ee=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ie.__webglTexture),W(Ee,ne),oe(X.__webglFramebuffer,A,ne,r.COLOR_ATTACHMENT0+V,Ee,0),f(ne)&&v(Ee)}t.unbindTexture()}else{let V=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(V=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(V,H.__webglTexture),W(V,I),I.mipmaps&&I.mipmaps.length>0)for(let pe=0;pe<I.mipmaps.length;pe++)oe(X.__webglFramebuffer[pe],A,I,r.COLOR_ATTACHMENT0,V,pe);else oe(X.__webglFramebuffer,A,I,r.COLOR_ATTACHMENT0,V,0);f(I)&&v(V),t.unbindTexture()}A.depthBuffer&&Me(A)},this.updateRenderTargetMipmap=function(A){let I=A.textures;for(let X=0,H=I.length;X<H;X++){let w=I[X];if(f(w)){let N=y(A),j=n.get(w).__webglTexture;t.bindTexture(N,j),v(N),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(te(A)===!1){let I=A.textures,X=A.width,H=A.height,w=r.COLOR_BUFFER_BIT,N=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=n.get(A),V=I.length>1;if(V)for(let ne=0;ne<I.length;ne++)t.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,j.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,j.__webglMultisampledFramebuffer);let pe=A.texture.mipmaps;pe&&pe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,j.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,j.__webglFramebuffer);for(let ne=0;ne<I.length;ne++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(w|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(w|=r.STENCIL_BUFFER_BIT)),V){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,j.__webglColorRenderbuffer[ne]);let ie=n.get(I[ne]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ie,0)}r.blitFramebuffer(0,0,X,H,0,0,X,H,w,r.NEAREST),l===!0&&(Ge.length=0,Ce.length=0,Ge.push(r.COLOR_ATTACHMENT0+ne),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ge.push(N),Ce.push(N),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ce)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),V)for(let ne=0;ne<I.length;ne++){t.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.RENDERBUFFER,j.__webglColorRenderbuffer[ne]);let ie=n.get(I[ne]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,j.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.TEXTURE_2D,ie,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,j.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let I=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[I])}}},this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=te}function C0(r,e){return{convert:function(t,n=is){let i,s=zt.getTransfer(n);if(t===Fi)return r.UNSIGNED_BYTE;if(t===ml)return r.UNSIGNED_SHORT_4_4_4_4;if(t===gl)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Nc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Uc)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Lc)return r.BYTE;if(t===Dc)return r.SHORT;if(t===Ys)return r.UNSIGNED_SHORT;if(t===fl)return r.INT;if(t===ns)return r.UNSIGNED_INT;if(t===fi)return r.FLOAT;if(t===Er)return r.HALF_FLOAT;if(t===zd)return r.ALPHA;if(t===Gd)return r.RGB;if(t===mi)return r.RGBA;if(t===Va)return r.DEPTH_COMPONENT;if(t===Ha)return r.DEPTH_STENCIL;if(t===vl)return r.RED;if(t===yl)return r.RED_INTEGER;if(t===kd)return r.RG;if(t===Bc)return r.RG_INTEGER;if(t===Oc)return r.RGBA_INTEGER;if(t===_l||t===xl||t===Ml||t===Tl)if(s===nn){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===_l)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===xl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Ml)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Tl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===_l)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===xl)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Ml)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Tl)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Fc||t===zc||t===Gc||t===kc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Fc)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===zc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Gc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===kc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Vc||t===Hc||t===Wc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Vc||t===Hc)return s===nn?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Wc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Xc||t===jc||t===qc||t===Yc||t===Zc||t===Kc||t===Jc||t===$c||t===Qc||t===eh||t===th||t===nh||t===ih||t===rh){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Xc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===jc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===qc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Yc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Zc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Kc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Jc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===$c)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Qc)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===eh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===th)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===nh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===ih)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===rh)return s===nn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===sh||t===ah||t===oh){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===sh)return s===nn?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ah)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===oh)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===lh||t===ch||t===hh||t===uh){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===lh)return i.COMPRESSED_RED_RGTC1_EXT;if(t===ch)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===hh)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===uh)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Zs?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new wa(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new $n({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new Zt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nh=class extends er{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,m=typeof XRWebGLBinding<"u",f=new Dh,v={},y=t.getContextAttributes(),_=null,x=null,T=[],b=[],P=new _e,B=null,U=new sn;U.viewport=new Yt;let F=new sn;F.viewport=new Yt;let R=[U,F],L=new il,q=null,W=null;function $(Ce){let Ne=b.indexOf(Ce.inputSource);if(Ne===-1)return;let te=T[Ne];te!==void 0&&(te.update(Ce.inputSource,Ce.frame,c||a),te.dispatchEvent({type:Ce.type,data:Ce.inputSource}))}function ae(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",ae),i.removeEventListener("inputsourceschange",Z);for(let Ce=0;Ce<T.length;Ce++){let Ne=b[Ce];Ne!==null&&(b[Ce]=null,T[Ce].disconnect(Ne))}q=null,W=null,f.reset();for(let Ce in v)delete v[Ce];e.setRenderTarget(_),p=null,d=null,u=null,i=null,x=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(B),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}function Z(Ce){for(let Ne=0;Ne<Ce.removed.length;Ne++){let te=Ce.removed[Ne],k=b.indexOf(te);k>=0&&(b[k]=null,T[k].disconnect(te))}for(let Ne=0;Ne<Ce.added.length;Ne++){let te=Ce.added[Ne],k=b.indexOf(te);if(k===-1){for(let A=0;A<T.length;A++){if(A>=b.length){b.push(te),k=A;break}if(b[A]===null){b[A]=te,k=A;break}}if(k===-1)break}let Te=T[k];Te&&Te.connect(te)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Ce){let Ne=T[Ce];return Ne===void 0&&(Ne=new Ns,T[Ce]=Ne),Ne.getTargetRaySpace()},this.getControllerGrip=function(Ce){let Ne=T[Ce];return Ne===void 0&&(Ne=new Ns,T[Ce]=Ne),Ne.getGripSpace()},this.getHand=function(Ce){let Ne=T[Ce];return Ne===void 0&&(Ne=new Ns,T[Ce]=Ne),Ne.getHandSpace()},this.setFramebufferScaleFactor=function(Ce){s=Ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Ce){o=Ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Ce){c=Ce},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Ce){if(i=Ce,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",ae),i.addEventListener("inputsourceschange",Z),y.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(P),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ne=null,te=null,k=null;y.depth&&(k=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ne=y.stencil?Ha:Va,te=y.stencil?Zs:ns);let Te={colorFormat:t.RGBA8,depthFormat:k,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new di(d.textureWidth,d.textureHeight,{format:mi,type:Fi,depthTexture:new Sa(d.textureWidth,d.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Ne),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Ne={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,Ne),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new di(p.framebufferWidth,p.framebufferHeight,{format:mi,type:Fi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ge.setContext(i),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let oe=new S,De=new S;function Oe(Ce,Ne){Ne===null?Ce.matrixWorld.copy(Ce.matrix):Ce.matrixWorld.multiplyMatrices(Ne.matrixWorld,Ce.matrix),Ce.matrixWorldInverse.copy(Ce.matrixWorld).invert()}this.updateCamera=function(Ce){if(i===null)return;let Ne=Ce.near,te=Ce.far;f.texture!==null&&(f.depthNear>0&&(Ne=f.depthNear),f.depthFar>0&&(te=f.depthFar)),L.near=F.near=U.near=Ne,L.far=F.far=U.far=te,q===L.near&&W===L.far||(i.updateRenderState({depthNear:L.near,depthFar:L.far}),q=L.near,W=L.far),L.layers.mask=6|Ce.layers.mask,U.layers.mask=3&L.layers.mask,F.layers.mask=5&L.layers.mask;let k=Ce.parent,Te=L.cameras;Oe(L,k);for(let A=0;A<Te.length;A++)Oe(Te[A],k);Te.length===2?(function(A,I,X){oe.setFromMatrixPosition(I.matrixWorld),De.setFromMatrixPosition(X.matrixWorld);let H=oe.distanceTo(De),w=I.projectionMatrix.elements,N=X.projectionMatrix.elements,j=w[14]/(w[10]-1),V=w[14]/(w[10]+1),pe=(w[9]+1)/w[5],ne=(w[9]-1)/w[5],ie=(w[8]-1)/w[0],Ee=(N[8]+1)/N[0],We=j*ie,Ie=j*Ee,Je=H/(-ie+Ee),ut=Je*-ie;if(I.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(ut),A.translateZ(Je),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),w[10]===-1)A.projectionMatrix.copy(I.projectionMatrix),A.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{let ft=j+Je,It=V+Je,St=We-ut,_t=Ie+(H-ut),z=pe*V/It*ft,ee=ne*V/It*ft;A.projectionMatrix.makePerspective(St,_t,z,ee,ft,It),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(L,U,F):L.projectionMatrix.copy(U.projectionMatrix),(function(A,I,X){X===null?A.matrix.copy(I.matrixWorld):(A.matrix.copy(X.matrixWorld),A.matrix.invert(),A.matrix.multiply(I.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(I.projectionMatrix),A.projectionMatrixInverse.copy(I.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Gr*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(Ce,L,k)},this.getCamera=function(){return L},this.getFoveation=function(){if(d!==null||p!==null)return l},this.setFoveation=function(Ce){l=Ce,d!==null&&(d.fixedFoveation=Ce),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Ce)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(L)},this.getCameraTexture=function(Ce){return v[Ce]};let Me=null,Ge=new Rp;Ge.setAnimationLoop(function(Ce,Ne){if(h=Ne.getViewerPose(c||a),g=Ne,h!==null){let te=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let k=!1;te.length!==L.cameras.length&&(L.cameras.length=0,k=!0);for(let A=0;A<te.length;A++){let I=te[A],X=null;if(p!==null)X=p.getViewport(I);else{let w=u.getViewSubImage(d,I);X=w.viewport,A===0&&(e.setRenderTargetTextures(x,w.colorTexture,w.depthStencilTexture),e.setRenderTarget(x))}let H=R[A];H===void 0&&(H=new sn,H.layers.enable(A),H.viewport=new Yt,R[A]=H),H.matrix.fromArray(I.transform.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale),H.projectionMatrix.fromArray(I.projectionMatrix),H.projectionMatrixInverse.copy(H.projectionMatrix).invert(),H.viewport.set(X.x,X.y,X.width,X.height),A===0&&(L.matrix.copy(H.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),k===!0&&L.cameras.push(H)}let Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){u=n.getBinding();let A=u.getDepthInformation(te[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(Te&&Te.includes("camera-access")&&m){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<te.length;A++){let I=te[A].camera;if(I){let X=v[I];X||(X=new wa,v[I]=X);let H=u.getCameraImage(I);X.sourceTexture=H}}}}for(let te=0;te<T.length;te++){let k=b[te],Te=T[te];k!==null&&Te!==void 0&&Te.update(k,Ne,c||a)}Me&&Me(Ce,Ne),Ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ne}),g=null}),this.setAnimationLoop=function(Ce){Me=Ce},this.dispose=function(){}}},as=new wi,R0=new st;function I0(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===ai&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===ai&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(i.envMap.value=o,as.copy(l),as.x*=-1,as.y*=-1,as.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),i.envMapRotation.value.setFromMatrix4(R0.makeRotationFromEuler(as)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,vh(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ai&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(i,s,l)):s.isMeshMatcapMaterial?(n(i,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(c,h,u,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function P0(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,d,p,g){let m=u.value,f=d+"_"+p;if(g[f]===void 0)return g[f]=typeof m=="number"||typeof m=="boolean"?m:m.clone(),!0;{let v=g[f];if(typeof m=="number"||typeof m=="boolean"){if(v!==m)return g[f]=m,!0}else if(v.equals(m)===!1)return v.copy(m),!0}return!1}function c(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&((function(f){let v=f.uniforms,y=0,_=16;for(let T=0,b=v.length;T<b;T++){let P=Array.isArray(v[T])?v[T]:[v[T]];for(let B=0,U=P.length;B<U;B++){let F=P[B],R=Array.isArray(F.value)?F.value:[F.value];for(let L=0,q=R.length;L<q;L++){let W=c(R[L]),$=y%_,ae=$%W.boundary,Z=$+ae;y+=ae,Z!==0&&_-Z<W.storage&&(y+=_-Z),F.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=W.storage}}}let x=y%_;x>0&&(y+=_-x),f.__size=y,f.__cache={}})(u),p=(function(f){let v=(function(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=v;let y=r.createBuffer(),_=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,_,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y})(u),i[u.id]=p,u.addEventListener("dispose",h));let g=d.program;n.updateUBOMapping(u,g);let m=e.render.frame;s[u.id]!==m&&((function(f){let v=i[f.id],y=f.uniforms,_=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let x=0,T=y.length;x<T;x++){let b=Array.isArray(y[x])?y[x]:[y[x]];for(let P=0,B=b.length;P<B;P++){let U=b[P];if(l(U,x,P,_)===!0){let F=U.__offset,R=Array.isArray(U.value)?U.value:[U.value],L=0;for(let q=0;q<R.length;q++){let W=R[q],$=c(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,F+L,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,L),L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=m)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var gi=class{constructor(e={}){let{canvas:t=Jd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),m=new Int32Array(4),f=null,v=null,y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=or,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=yt;let b=0,P=0,B=null,U=-1,F=null,R=new Yt,L=new Yt,q=null,W=new Ye(0),$=0,ae=t.width,Z=t.height,oe=1,De=null,Oe=null,Me=new Yt(0,0,ae,Z),Ge=new Yt(0,0,ae,Z),Ce=!1,Ne=new xr,te=!1,k=!1,Te=new st,A=new S,I=new Yt,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},H=!1;function w(){return B===null?oe:1}let N,j,V,pe,ne,ie,Ee,We,Ie,Je,ut,ft,It,St,_t,z,ee,fe,Se,Y,ce,de,be,xe,C=n;function le(D,re){return t.getContext(D,re)}try{let D={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",Be,!1),C===null){let re="webgl2";if(C=le(re,D),C===null)throw le(re)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}function we(){N=new pm(C),N.init(),de=new C0(C,N),j=new lm(C,N,e,de),V=new E0(C,N),j.reversedDepthBuffer&&d&&V.buffers.depth.setReversed(!0),pe=new gm(C),ne=new g0,ie=new A0(C,N,V,ne,j,de,pe),Ee=new hm(x),We=new dm(x),Ie=new im(C),be=new am(C,Ie),Je=new fm(C,Ie,pe,be),ut=new ym(C,Je,Ie,pe),Se=new vm(C,j,ie),z=new cm(ne),ft=new m0(x,Ee,We,N,j,be,z),It=new I0(x,ne),St=new y0,_t=new b0(N),fe=new sm(x,Ee,We,V,ut,p,l),ee=new S0(x,ut,j),xe=new P0(C,pe,j,V),Y=new om(C,N,pe),ce=new mm(C,N,pe),pe.programs=ft.programs,x.capabilities=j,x.extensions=N,x.properties=ne,x.renderLists=St,x.shadowMap=ee,x.state=V,x.info=pe}we();let ve=new Nh(x,C);function ze(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function it(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let D=pe.autoReset,re=ee.enabled,ge=ee.autoUpdate,Ae=ee.needsUpdate,ue=ee.type;we(),pe.autoReset=D,ee.enabled=re,ee.autoUpdate=ge,ee.needsUpdate=Ae,ee.type=ue}function Be(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function dt(D){let re=D.target;re.removeEventListener("dispose",dt),(function(ge){(function(Ae){let ue=ne.get(Ae).programs;ue!==void 0&&(ue.forEach(function(Le){ft.releaseProgram(Le)}),Ae.isShaderMaterial&&ft.releaseShaderCache(Ae))})(ge),ne.remove(ge)})(re)}function ot(D,re,ge){D.transparent===!0&&D.side===Bt&&D.forceSinglePass===!1?(D.side=ai,D.needsUpdate=!0,Bn(D,re,ge),D.side=Sr,D.needsUpdate=!0,Bn(D,re,ge),D.side=Bt):Bn(D,re,ge)}this.xr=ve,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let D=N.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=N.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(D){D!==void 0&&(oe=D,this.setSize(ae,Z,!1))},this.getSize=function(D){return D.set(ae,Z)},this.setSize=function(D,re,ge=!0){ve.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ae=D,Z=re,t.width=Math.floor(D*oe),t.height=Math.floor(re*oe),ge===!0&&(t.style.width=D+"px",t.style.height=re+"px"),this.setViewport(0,0,D,re))},this.getDrawingBufferSize=function(D){return D.set(ae*oe,Z*oe).floor()},this.setDrawingBufferSize=function(D,re,ge){ae=D,Z=re,oe=ge,t.width=Math.floor(D*ge),t.height=Math.floor(re*ge),this.setViewport(0,0,D,re)},this.getCurrentViewport=function(D){return D.copy(R)},this.getViewport=function(D){return D.copy(Me)},this.setViewport=function(D,re,ge,Ae){D.isVector4?Me.set(D.x,D.y,D.z,D.w):Me.set(D,re,ge,Ae),V.viewport(R.copy(Me).multiplyScalar(oe).round())},this.getScissor=function(D){return D.copy(Ge)},this.setScissor=function(D,re,ge,Ae){D.isVector4?Ge.set(D.x,D.y,D.z,D.w):Ge.set(D,re,ge,Ae),V.scissor(L.copy(Ge).multiplyScalar(oe).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(D){V.setScissorTest(Ce=D)},this.setOpaqueSort=function(D){De=D},this.setTransparentSort=function(D){Oe=D},this.getClearColor=function(D){return D.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor(...arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha(...arguments)},this.clear=function(D=!0,re=!0,ge=!0){let Ae=0;if(D){let ue=!1;if(B!==null){let Le=B.texture.format;ue=Le===Oc||Le===Bc||Le===yl}if(ue){let Le=B.texture.type,Ze=Le===Fi||Le===ns||Le===Ys||Le===Zs||Le===ml||Le===gl,Pe=fe.getClearColor(),Ve=fe.getClearAlpha(),qe=Pe.r,Tt=Pe.g,He=Pe.b;Ze?(g[0]=qe,g[1]=Tt,g[2]=He,g[3]=Ve,C.clearBufferuiv(C.COLOR,0,g)):(m[0]=qe,m[1]=Tt,m[2]=He,m[3]=Ve,C.clearBufferiv(C.COLOR,0,m))}else Ae|=C.COLOR_BUFFER_BIT}re&&(Ae|=C.DEPTH_BUFFER_BIT),ge&&(Ae|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(Ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),fe.dispose(),St.dispose(),_t.dispose(),ne.dispose(),Ee.dispose(),We.dispose(),ut.dispose(),be.dispose(),xe.dispose(),ft.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",mt),ve.removeEventListener("sessionend",gt),pt.stop()},this.renderBufferDirect=function(D,re,ge,Ae,ue,Le){re===null&&(re=X);let Ze=ue.isMesh&&ue.matrixWorld.determinant()<0,Pe=(function(Pt,hn,rn,Et,Mt){hn.isScene!==!0&&(hn=X),ie.resetTextureUnits();let Yn=hn.fog,cr=Et.isMeshStandardMaterial?hn.environment:null,bn=B===null?x.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Un,oi=(Et.isMeshStandardMaterial?We:Ee).get(Et.envMap||cr),Wn=Et.vertexColors===!0&&!!rn.attributes.color&&rn.attributes.color.itemSize===4,$t=!!rn.attributes.tangent&&(!!Et.normalMap||Et.anisotropy>0),li=!!rn.morphAttributes.position,na=!!rn.morphAttributes.normal,ci=!!rn.morphAttributes.color,Za=or;Et.toneMapped&&(B!==null&&B.isXRRenderTarget!==!0||(Za=x.toneMapping));let us=rn.morphAttributes.position||rn.morphAttributes.normal||rn.morphAttributes.color,hr=us!==void 0?us.length:0,Lt=ne.get(Et),Zn=v.state.lights;if(te===!0&&(k===!0||Pt!==F)){let En=Pt===F&&Et.id===U;z.setState(Et,Pt,En)}let Ln=!1;Et.version===Lt.__version?Lt.needsLights&&Lt.lightsStateVersion!==Zn.state.version||Lt.outputColorSpace!==bn||Mt.isBatchedMesh&&Lt.batching===!1?Ln=!0:Mt.isBatchedMesh||Lt.batching!==!0?Mt.isBatchedMesh&&Lt.batchingColor===!0&&Mt.colorTexture===null||Mt.isBatchedMesh&&Lt.batchingColor===!1&&Mt.colorTexture!==null||Mt.isInstancedMesh&&Lt.instancing===!1?Ln=!0:Mt.isInstancedMesh||Lt.instancing!==!0?Mt.isSkinnedMesh&&Lt.skinning===!1?Ln=!0:Mt.isSkinnedMesh||Lt.skinning!==!0?Mt.isInstancedMesh&&Lt.instancingColor===!0&&Mt.instanceColor===null||Mt.isInstancedMesh&&Lt.instancingColor===!1&&Mt.instanceColor!==null||Mt.isInstancedMesh&&Lt.instancingMorph===!0&&Mt.morphTexture===null||Mt.isInstancedMesh&&Lt.instancingMorph===!1&&Mt.morphTexture!==null||Lt.envMap!==oi||Et.fog===!0&&Lt.fog!==Yn?Ln=!0:Lt.numClippingPlanes===void 0||Lt.numClippingPlanes===z.numPlanes&&Lt.numIntersection===z.numIntersection?(Lt.vertexAlphas!==Wn||Lt.vertexTangents!==$t||Lt.morphTargets!==li||Lt.morphNormals!==na||Lt.morphColors!==ci||Lt.toneMapping!==Za||Lt.morphTargetsCount!==hr)&&(Ln=!0):Ln=!0:Ln=!0:Ln=!0:Ln=!0:(Ln=!0,Lt.__version=Et.version);let Vi=Lt.currentProgram;Ln===!0&&(Vi=Bn(Et,hn,Mt));let Lr=!1,ds=!1,ia=!1,an=Vi.getUniforms(),Ai=Lt.uniforms;if(V.useProgram(Vi.program)&&(Lr=!0,ds=!0,ia=!0),Et.id!==U&&(U=Et.id,ds=!0),Lr||F!==Pt){V.buffers.depth.getReversed()&&Pt.reversedDepth!==!0&&(Pt._reversedDepth=!0,Pt.updateProjectionMatrix()),an.setValue(C,"projectionMatrix",Pt.projectionMatrix),an.setValue(C,"viewMatrix",Pt.matrixWorldInverse);let En=an.map.cameraPosition;En!==void 0&&En.setValue(C,A.setFromMatrixPosition(Pt.matrixWorld)),j.logarithmicDepthBuffer&&an.setValue(C,"logDepthBufFC",2/(Math.log(Pt.far+1)/Math.LN2)),(Et.isMeshPhongMaterial||Et.isMeshToonMaterial||Et.isMeshLambertMaterial||Et.isMeshBasicMaterial||Et.isMeshStandardMaterial||Et.isShaderMaterial)&&an.setValue(C,"isOrthographic",Pt.isOrthographicCamera===!0),F!==Pt&&(F=Pt,ds=!0,ia=!0)}if(Mt.isSkinnedMesh){an.setOptional(C,Mt,"bindMatrix"),an.setOptional(C,Mt,"bindMatrixInverse");let En=Mt.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),an.setValue(C,"boneTexture",En.boneTexture,ie))}Mt.isBatchedMesh&&(an.setOptional(C,Mt,"batchingTexture"),an.setValue(C,"batchingTexture",Mt._matricesTexture,ie),an.setOptional(C,Mt,"batchingIdTexture"),an.setValue(C,"batchingIdTexture",Mt._indirectTexture,ie),an.setOptional(C,Mt,"batchingColorTexture"),Mt._colorsTexture!==null&&an.setValue(C,"batchingColorTexture",Mt._colorsTexture,ie));let On=rn.morphAttributes;On.position===void 0&&On.normal===void 0&&On.color===void 0||Se.update(Mt,rn,Vi),(ds||Lt.receiveShadow!==Mt.receiveShadow)&&(Lt.receiveShadow=Mt.receiveShadow,an.setValue(C,"receiveShadow",Mt.receiveShadow)),Et.isMeshGouraudMaterial&&Et.envMap!==null&&(Ai.envMap.value=oi,Ai.flipEnvMap.value=oi.isCubeTexture&&oi.isRenderTargetTexture===!1?-1:1),Et.isMeshStandardMaterial&&Et.envMap===null&&hn.environment!==null&&(Ai.envMapIntensity.value=hn.environmentIntensity),ds&&(an.setValue(C,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&(Kn=ia,(dn=Ai).ambientLightColor.needsUpdate=Kn,dn.lightProbe.needsUpdate=Kn,dn.directionalLights.needsUpdate=Kn,dn.directionalLightShadows.needsUpdate=Kn,dn.pointLights.needsUpdate=Kn,dn.pointLightShadows.needsUpdate=Kn,dn.spotLights.needsUpdate=Kn,dn.spotLightShadows.needsUpdate=Kn,dn.rectAreaLights.needsUpdate=Kn,dn.hemisphereLights.needsUpdate=Kn),Yn&&Et.fog===!0&&It.refreshFogUniforms(Ai,Yn),It.refreshMaterialUniforms(Ai,Et,oe,Z,v.state.transmissionRenderTarget[Pt.id]),Qs.upload(C,Ir(Lt),Ai,ie));var dn,Kn;if(Et.isShaderMaterial&&Et.uniformsNeedUpdate===!0&&(Qs.upload(C,Ir(Lt),Ai,ie),Et.uniformsNeedUpdate=!1),Et.isSpriteMaterial&&an.setValue(C,"center",Mt.center),an.setValue(C,"modelViewMatrix",Mt.modelViewMatrix),an.setValue(C,"normalMatrix",Mt.normalMatrix),an.setValue(C,"modelMatrix",Mt.matrixWorld),Et.isShaderMaterial||Et.isRawShaderMaterial){let En=Et.uniformsGroups;for(let Ka=0,ps=En.length;Ka<ps;Ka++){let Nl=En[Ka];xe.update(Nl,Vi),xe.bind(Nl,Vi)}}return Vi})(D,re,ge,Ae,ue);V.setMaterial(Ae,Ze);let Ve=ge.index,qe=1;if(Ae.wireframe===!0){if(Ve=Je.getWireframeAttribute(ge),Ve===void 0)return;qe=2}let Tt=ge.drawRange,He=ge.attributes.position,Ue=Tt.start*qe,et=(Tt.start+Tt.count)*qe;Le!==null&&(Ue=Math.max(Ue,Le.start*qe),et=Math.min(et,(Le.start+Le.count)*qe)),Ve!==null?(Ue=Math.max(Ue,0),et=Math.min(et,Ve.count)):He!=null&&(Ue=Math.max(Ue,0),et=Math.min(et,He.count));let cn=et-Ue;if(cn<0||cn===1/0)return;let _n;be.setup(ue,Ae,Pe,ge,Ve);let Jt=Y;if(Ve!==null&&(_n=Ie.get(Ve),Jt=ce,Jt.setIndex(_n)),ue.isMesh)Ae.wireframe===!0?(V.setLineWidth(Ae.wireframeLinewidth*w()),Jt.setMode(C.LINES)):Jt.setMode(C.TRIANGLES);else if(ue.isLine){let Pt=Ae.linewidth;Pt===void 0&&(Pt=1),V.setLineWidth(Pt*w()),ue.isLineSegments?Jt.setMode(C.LINES):ue.isLineLoop?Jt.setMode(C.LINE_LOOP):Jt.setMode(C.LINE_STRIP)}else ue.isPoints?Jt.setMode(C.POINTS):ue.isSprite&&Jt.setMode(C.TRIANGLES);if(ue.isBatchedMesh)if(ue._multiDrawInstances!==null)Ps("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(ue._multiDrawStarts,ue._multiDrawCounts,ue._multiDrawCount,ue._multiDrawInstances);else if(N.get("WEBGL_multi_draw"))Jt.renderMultiDraw(ue._multiDrawStarts,ue._multiDrawCounts,ue._multiDrawCount);else{let Pt=ue._multiDrawStarts,hn=ue._multiDrawCounts,rn=ue._multiDrawCount,Et=Ve?Ie.get(Ve).bytesPerElement:1,Mt=ne.get(Ae).currentProgram.getUniforms();for(let Yn=0;Yn<rn;Yn++)Mt.setValue(C,"_gl_DrawID",Yn),Jt.render(Pt[Yn]/Et,hn[Yn])}else if(ue.isInstancedMesh)Jt.renderInstances(Ue,cn,ue.count);else if(ge.isInstancedBufferGeometry){let Pt=ge._maxInstanceCount!==void 0?ge._maxInstanceCount:1/0,hn=Math.min(ge.instanceCount,Pt);Jt.renderInstances(Ue,cn,hn)}else Jt.render(Ue,cn)},this.compile=function(D,re,ge=null){ge===null&&(ge=D),v=_t.get(ge),v.init(re),_.push(v),ge.traverseVisible(function(ue){ue.isLight&&ue.layers.test(re.layers)&&(v.pushLight(ue),ue.castShadow&&v.pushShadow(ue))}),D!==ge&&D.traverseVisible(function(ue){ue.isLight&&ue.layers.test(re.layers)&&(v.pushLight(ue),ue.castShadow&&v.pushShadow(ue))}),v.setupLights();let Ae=new Set;return D.traverse(function(ue){if(!(ue.isMesh||ue.isPoints||ue.isLine||ue.isSprite))return;let Le=ue.material;if(Le)if(Array.isArray(Le))for(let Ze=0;Ze<Le.length;Ze++){let Pe=Le[Ze];ot(Pe,ge,ue),Ae.add(Pe)}else ot(Le,ge,ue),Ae.add(Le)}),v=_.pop(),Ae},this.compileAsync=function(D,re,ge=null){let Ae=this.compile(D,re,ge);return new Promise(ue=>{function Le(){Ae.forEach(function(Ze){ne.get(Ze).currentProgram.isReady()&&Ae.delete(Ze)}),Ae.size!==0?setTimeout(Le,10):ue(D)}N.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let je=null;function mt(){pt.stop()}function gt(){pt.start()}let pt=new Rp;function xt(D,re,ge,Ae){if(D.visible===!1)return;if(D.layers.test(re.layers)){if(D.isGroup)ge=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(re);else if(D.isLight)v.pushLight(D),D.castShadow&&v.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||Ne.intersectsSprite(D)){Ae&&I.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Te);let Le=ut.update(D),Ze=D.material;Ze.visible&&f.push(D,Le,Ze,ge,I.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||Ne.intersectsObject(D))){let Le=ut.update(D),Ze=D.material;if(Ae&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),I.copy(D.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),I.copy(Le.boundingSphere.center)),I.applyMatrix4(D.matrixWorld).applyMatrix4(Te)),Array.isArray(Ze)){let Pe=Le.groups;for(let Ve=0,qe=Pe.length;Ve<qe;Ve++){let Tt=Pe[Ve],He=Ze[Tt.materialIndex];He&&He.visible&&f.push(D,Le,He,ge,I.z,Tt)}}else Ze.visible&&f.push(D,Le,Ze,ge,I.z,null)}}let ue=D.children;for(let Le=0,Ze=ue.length;Le<Ze;Le++)xt(ue[Le],re,ge,Ae)}function kt(D,re,ge,Ae){let ue=D.opaque,Le=D.transmissive,Ze=D.transparent;v.setupLightsView(ge),te===!0&&z.setGlobalState(x.clippingPlanes,ge),Ae&&V.viewport(R.copy(Ae)),ue.length>0&&Qt(ue,re,ge),Le.length>0&&Qt(Le,re,ge),Ze.length>0&&Qt(Ze,re,ge),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function Wt(D,re,ge,Ae){if((ge.isScene===!0?ge.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[Ae.id]===void 0&&(v.state.transmissionRenderTarget[Ae.id]=new di(1,1,{generateMipmaps:!0,type:N.has("EXT_color_buffer_half_float")||N.has("EXT_color_buffer_float")?Er:Fi,minFilter:ei,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:zt.workingColorSpace}));let ue=v.state.transmissionRenderTarget[Ae.id],Le=Ae.viewport||R;ue.setSize(Le.z*x.transmissionResolutionScale,Le.w*x.transmissionResolutionScale);let Ze=x.getRenderTarget(),Pe=x.getActiveCubeFace(),Ve=x.getActiveMipmapLevel();x.setRenderTarget(ue),x.getClearColor(W),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),H&&fe.render(ge);let qe=x.toneMapping;x.toneMapping=or;let Tt=Ae.viewport;if(Ae.viewport!==void 0&&(Ae.viewport=void 0),v.setupLightsView(Ae),te===!0&&z.setGlobalState(x.clippingPlanes,Ae),Qt(D,ge,Ae),ie.updateMultisampleRenderTarget(ue),ie.updateRenderTargetMipmap(ue),N.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Ue=0,et=re.length;Ue<et;Ue++){let cn=re[Ue],_n=cn.object,Jt=cn.geometry,Pt=cn.material,hn=cn.group;if(Pt.side===Bt&&_n.layers.test(Ae.layers)){let rn=Pt.side;Pt.side=ai,Pt.needsUpdate=!0,un(_n,ge,Ae,Jt,Pt,hn),Pt.side=rn,Pt.needsUpdate=!0,He=!0}}He===!0&&(ie.updateMultisampleRenderTarget(ue),ie.updateRenderTargetMipmap(ue))}x.setRenderTarget(Ze,Pe,Ve),x.setClearColor(W,$),Tt!==void 0&&(Ae.viewport=Tt),x.toneMapping=qe}function Qt(D,re,ge){let Ae=re.isScene===!0?re.overrideMaterial:null;for(let ue=0,Le=D.length;ue<Le;ue++){let Ze=D[ue],Pe=Ze.object,Ve=Ze.geometry,qe=Ze.group,Tt=Ze.material;Tt.allowOverride===!0&&Ae!==null&&(Tt=Ae),Pe.layers.test(ge.layers)&&un(Pe,re,ge,Ve,Tt,qe)}}function un(D,re,ge,Ae,ue,Le){D.onBeforeRender(x,re,ge,Ae,ue,Le),D.modelViewMatrix.multiplyMatrices(ge.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ue.onBeforeRender(x,re,ge,Ae,D,Le),ue.transparent===!0&&ue.side===Bt&&ue.forceSinglePass===!1?(ue.side=ai,ue.needsUpdate=!0,x.renderBufferDirect(ge,re,Ae,ue,D,Le),ue.side=Sr,ue.needsUpdate=!0,x.renderBufferDirect(ge,re,Ae,ue,D,Le),ue.side=Bt):x.renderBufferDirect(ge,re,Ae,ue,D,Le),D.onAfterRender(x,re,ge,Ae,ue,Le)}function Bn(D,re,ge){re.isScene!==!0&&(re=X);let Ae=ne.get(D),ue=v.state.lights,Le=v.state.shadowsArray,Ze=ue.state.version,Pe=ft.getParameters(D,ue.state,Le,re,ge),Ve=ft.getProgramCacheKey(Pe),qe=Ae.programs;Ae.environment=D.isMeshStandardMaterial?re.environment:null,Ae.fog=re.fog,Ae.envMap=(D.isMeshStandardMaterial?We:Ee).get(D.envMap||Ae.environment),Ae.envMapRotation=Ae.environment!==null&&D.envMap===null?re.environmentRotation:D.envMapRotation,qe===void 0&&(D.addEventListener("dispose",dt),qe=new Map,Ae.programs=qe);let Tt=qe.get(Ve);if(Tt!==void 0){if(Ae.currentProgram===Tt&&Ae.lightsStateVersion===Ze)return wn(D,Pe),Tt}else Pe.uniforms=ft.getUniforms(D),D.onBeforeCompile(Pe,x),Tt=ft.acquireProgram(Pe,Ve),qe.set(Ve,Tt),Ae.uniforms=Pe.uniforms;let He=Ae.uniforms;return(D.isShaderMaterial||D.isRawShaderMaterial)&&D.clipping!==!0||(He.clippingPlanes=z.uniform),wn(D,Pe),Ae.needsLights=(function(Ue){return Ue.isMeshLambertMaterial||Ue.isMeshToonMaterial||Ue.isMeshPhongMaterial||Ue.isMeshStandardMaterial||Ue.isShadowMaterial||Ue.isShaderMaterial&&Ue.lights===!0})(D),Ae.lightsStateVersion=Ze,Ae.needsLights&&(He.ambientLightColor.value=ue.state.ambient,He.lightProbe.value=ue.state.probe,He.directionalLights.value=ue.state.directional,He.directionalLightShadows.value=ue.state.directionalShadow,He.spotLights.value=ue.state.spot,He.spotLightShadows.value=ue.state.spotShadow,He.rectAreaLights.value=ue.state.rectArea,He.ltc_1.value=ue.state.rectAreaLTC1,He.ltc_2.value=ue.state.rectAreaLTC2,He.pointLights.value=ue.state.point,He.pointLightShadows.value=ue.state.pointShadow,He.hemisphereLights.value=ue.state.hemi,He.directionalShadowMap.value=ue.state.directionalShadowMap,He.directionalShadowMatrix.value=ue.state.directionalShadowMatrix,He.spotShadowMap.value=ue.state.spotShadowMap,He.spotLightMatrix.value=ue.state.spotLightMatrix,He.spotLightMap.value=ue.state.spotLightMap,He.pointShadowMap.value=ue.state.pointShadowMap,He.pointShadowMatrix.value=ue.state.pointShadowMatrix),Ae.currentProgram=Tt,Ae.uniformsList=null,Tt}function Ir(D){if(D.uniformsList===null){let re=D.currentProgram.getUniforms();D.uniformsList=Qs.seqWithValue(re.seq,D.uniforms)}return D.uniformsList}function wn(D,re){let ge=ne.get(D);ge.outputColorSpace=re.outputColorSpace,ge.batching=re.batching,ge.batchingColor=re.batchingColor,ge.instancing=re.instancing,ge.instancingColor=re.instancingColor,ge.instancingMorph=re.instancingMorph,ge.skinning=re.skinning,ge.morphTargets=re.morphTargets,ge.morphNormals=re.morphNormals,ge.morphColors=re.morphColors,ge.morphTargetsCount=re.morphTargetsCount,ge.numClippingPlanes=re.numClippingPlanes,ge.numIntersection=re.numClipIntersection,ge.vertexAlphas=re.vertexAlphas,ge.vertexTangents=re.vertexTangents,ge.toneMapping=re.toneMapping}pt.setAnimationLoop(function(D){je&&je(D)}),typeof self<"u"&&pt.setContext(self),this.setAnimationLoop=function(D){je=D,ve.setAnimationLoop(D),D===null?pt.stop():pt.start()},ve.addEventListener("sessionstart",mt),ve.addEventListener("sessionend",gt),this.render=function(D,re){if(re!==void 0&&re.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(T===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),re.parent===null&&re.matrixWorldAutoUpdate===!0&&re.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(re),re=ve.getCamera()),D.isScene===!0&&D.onBeforeRender(x,D,re,B),v=_t.get(D,_.length),v.init(re),_.push(v),Te.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),Ne.setFromProjectionMatrix(Te,Qi,re.reversedDepth),k=this.localClippingEnabled,te=z.init(this.clippingPlanes,k),f=St.get(D,y.length),f.init(),y.push(f),ve.enabled===!0&&ve.isPresenting===!0){let Le=x.xr.getDepthSensingMesh();Le!==null&&xt(Le,re,-1/0,x.sortObjects)}xt(D,re,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(De,Oe),H=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,H&&fe.addToRenderList(f,D),this.info.render.frame++,te===!0&&z.beginShadows();let ge=v.state.shadowsArray;ee.render(ge,D,re),te===!0&&z.endShadows(),this.info.autoReset===!0&&this.info.reset();let Ae=f.opaque,ue=f.transmissive;if(v.setupLights(),re.isArrayCamera){let Le=re.cameras;if(ue.length>0)for(let Ze=0,Pe=Le.length;Ze<Pe;Ze++)Wt(Ae,ue,D,Le[Ze]);H&&fe.render(D);for(let Ze=0,Pe=Le.length;Ze<Pe;Ze++){let Ve=Le[Ze];kt(f,D,Ve,Ve.viewport)}}else ue.length>0&&Wt(Ae,ue,D,re),H&&fe.render(D),kt(f,D,re);B!==null&&P===0&&(ie.updateMultisampleRenderTarget(B),ie.updateRenderTargetMipmap(B)),D.isScene===!0&&D.onAfterRender(x,D,re),be.resetDefaultState(),U=-1,F=null,_.pop(),_.length>0?(v=_[_.length-1],te===!0&&z.setGlobalState(x.clippingPlanes,v.state.camera)):v=null,y.pop(),f=y.length>0?y[y.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(D,re,ge){let Ae=ne.get(D);Ae.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Ae.__autoAllocateDepthBuffer===!1&&(Ae.__useRenderToTexture=!1),ne.get(D.texture).__webglTexture=re,ne.get(D.depthTexture).__webglTexture=Ae.__autoAllocateDepthBuffer?void 0:ge,Ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,re){let ge=ne.get(D);ge.__webglFramebuffer=re,ge.__useDefaultFramebuffer=re===void 0};let Ei=C.createFramebuffer();this.setRenderTarget=function(D,re=0,ge=0){B=D,b=re,P=ge;let Ae=!0,ue=null,Le=!1,Ze=!1;if(D){let Pe=ne.get(D);if(Pe.__useDefaultFramebuffer!==void 0)V.bindFramebuffer(C.FRAMEBUFFER,null),Ae=!1;else if(Pe.__webglFramebuffer===void 0)ie.setupRenderTarget(D);else if(Pe.__hasExternalTextures)ie.rebindTextures(D,ne.get(D.texture).__webglTexture,ne.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let Tt=D.depthTexture;if(Pe.__boundDepthTexture!==Tt){if(Tt!==null&&ne.has(Tt)&&(D.width!==Tt.image.width||D.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(D)}}let Ve=D.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ze=!0);let qe=ne.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(ue=Array.isArray(qe[re])?qe[re][ge]:qe[re],Le=!0):ue=D.samples>0&&ie.useMultisampledRTT(D)===!1?ne.get(D).__webglMultisampledFramebuffer:Array.isArray(qe)?qe[ge]:qe,R.copy(D.viewport),L.copy(D.scissor),q=D.scissorTest}else R.copy(Me).multiplyScalar(oe).floor(),L.copy(Ge).multiplyScalar(oe).floor(),q=Ce;if(ge!==0&&(ue=Ei),V.bindFramebuffer(C.FRAMEBUFFER,ue)&&Ae&&V.drawBuffers(D,ue),V.viewport(R),V.scissor(L),V.setScissorTest(q),Le){let Pe=ne.get(D.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe.__webglTexture,ge)}else if(Ze){let Pe=re;for(let Ve=0;Ve<D.textures.length;Ve++){let qe=ne.get(D.textures[Ve]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ve,qe.__webglTexture,ge,Pe)}}else if(D!==null&&ge!==0){let Pe=ne.get(D.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Pe.__webglTexture,ge)}U=-1},this.readRenderTargetPixels=function(D,re,ge,Ae,ue,Le,Ze,Pe=0){if(!D||!D.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=ne.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ze!==void 0&&(Ve=Ve[Ze]),Ve){V.bindFramebuffer(C.FRAMEBUFFER,Ve);try{let qe=D.textures[Pe],Tt=qe.format,He=qe.type;if(!j.textureFormatReadable(Tt))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(He))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");re>=0&&re<=D.width-Ae&&ge>=0&&ge<=D.height-ue&&(D.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Pe),C.readPixels(re,ge,Ae,ue,de.convert(Tt),de.convert(He),Le))}finally{let qe=B!==null?ne.get(B).__webglFramebuffer:null;V.bindFramebuffer(C.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(D,re,ge,Ae,ue,Le,Ze,Pe=0){if(!D||!D.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=ne.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ze!==void 0&&(Ve=Ve[Ze]),Ve){if(re>=0&&re<=D.width-Ae&&ge>=0&&ge<=D.height-ue){V.bindFramebuffer(C.FRAMEBUFFER,Ve);let qe=D.textures[Pe],Tt=qe.format,He=qe.type;if(!j.textureFormatReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ue=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ue),C.bufferData(C.PIXEL_PACK_BUFFER,Le.byteLength,C.STREAM_READ),D.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Pe),C.readPixels(re,ge,Ae,ue,de.convert(Tt),de.convert(He),0);let et=B!==null?ne.get(B).__webglFramebuffer:null;V.bindFramebuffer(C.FRAMEBUFFER,et);let cn=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await $d(C,cn,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ue),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,Le),C.deleteBuffer(Ue),C.deleteSync(cn),Le}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,re=null,ge=0){let Ae=Math.pow(2,-ge),ue=Math.floor(D.image.width*Ae),Le=Math.floor(D.image.height*Ae),Ze=re!==null?re.x:0,Pe=re!==null?re.y:0;ie.setTexture2D(D,0),C.copyTexSubImage2D(C.TEXTURE_2D,ge,0,0,Ze,Pe,ue,Le),V.unbindTexture()};let Pr=C.createFramebuffer(),lr=C.createFramebuffer();this.copyTextureToTexture=function(D,re,ge=null,Ae=null,ue=0,Le=null){let Ze,Pe,Ve,qe,Tt,He,Ue,et,cn;Le===null&&(ue!==0?(Ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Le=ue,ue=0):Le=0);let _n=D.isCompressedTexture?D.mipmaps[Le]:D.image;if(ge!==null)Ze=ge.max.x-ge.min.x,Pe=ge.max.y-ge.min.y,Ve=ge.isBox3?ge.max.z-ge.min.z:1,qe=ge.min.x,Tt=ge.min.y,He=ge.isBox3?ge.min.z:0;else{let Wn=Math.pow(2,-ue);Ze=Math.floor(_n.width*Wn),Pe=Math.floor(_n.height*Wn),Ve=D.isDataArrayTexture?_n.depth:D.isData3DTexture?Math.floor(_n.depth*Wn):1,qe=0,Tt=0,He=0}Ae!==null?(Ue=Ae.x,et=Ae.y,cn=Ae.z):(Ue=0,et=0,cn=0);let Jt=de.convert(re.format),Pt=de.convert(re.type),hn;re.isData3DTexture?(ie.setTexture3D(re,0),hn=C.TEXTURE_3D):re.isDataArrayTexture||re.isCompressedArrayTexture?(ie.setTexture2DArray(re,0),hn=C.TEXTURE_2D_ARRAY):(ie.setTexture2D(re,0),hn=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,re.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,re.unpackAlignment);let rn=C.getParameter(C.UNPACK_ROW_LENGTH),Et=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Mt=C.getParameter(C.UNPACK_SKIP_PIXELS),Yn=C.getParameter(C.UNPACK_SKIP_ROWS),cr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,_n.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,_n.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,qe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Tt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,He);let bn=D.isDataArrayTexture||D.isData3DTexture,oi=re.isDataArrayTexture||re.isData3DTexture;if(D.isDepthTexture){let Wn=ne.get(D),$t=ne.get(re),li=ne.get(Wn.__renderTarget),na=ne.get($t.__renderTarget);V.bindFramebuffer(C.READ_FRAMEBUFFER,li.__webglFramebuffer),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,na.__webglFramebuffer);for(let ci=0;ci<Ve;ci++)bn&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ne.get(D).__webglTexture,ue,He+ci),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ne.get(re).__webglTexture,Le,cn+ci)),C.blitFramebuffer(qe,Tt,Ze,Pe,Ue,et,Ze,Pe,C.DEPTH_BUFFER_BIT,C.NEAREST);V.bindFramebuffer(C.READ_FRAMEBUFFER,null),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(ue!==0||D.isRenderTargetTexture||ne.has(D)){let Wn=ne.get(D),$t=ne.get(re);V.bindFramebuffer(C.READ_FRAMEBUFFER,Pr),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,lr);for(let li=0;li<Ve;li++)bn?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Wn.__webglTexture,ue,He+li):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Wn.__webglTexture,ue),oi?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,$t.__webglTexture,Le,cn+li):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,$t.__webglTexture,Le),ue!==0?C.blitFramebuffer(qe,Tt,Ze,Pe,Ue,et,Ze,Pe,C.COLOR_BUFFER_BIT,C.NEAREST):oi?C.copyTexSubImage3D(hn,Le,Ue,et,cn+li,qe,Tt,Ze,Pe):C.copyTexSubImage2D(hn,Le,Ue,et,qe,Tt,Ze,Pe);V.bindFramebuffer(C.READ_FRAMEBUFFER,null),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else oi?D.isDataTexture||D.isData3DTexture?C.texSubImage3D(hn,Le,Ue,et,cn,Ze,Pe,Ve,Jt,Pt,_n.data):re.isCompressedArrayTexture?C.compressedTexSubImage3D(hn,Le,Ue,et,cn,Ze,Pe,Ve,Jt,_n.data):C.texSubImage3D(hn,Le,Ue,et,cn,Ze,Pe,Ve,Jt,Pt,_n):D.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,Le,Ue,et,Ze,Pe,Jt,Pt,_n.data):D.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,Le,Ue,et,_n.width,_n.height,Jt,_n.data):C.texSubImage2D(C.TEXTURE_2D,Le,Ue,et,Ze,Pe,Jt,Pt,_n);C.pixelStorei(C.UNPACK_ROW_LENGTH,rn),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Et),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Mt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Yn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,cr),Le===0&&re.generateMipmaps&&C.generateMipmap(hn),V.unbindTexture()},this.initRenderTarget=function(D){ne.get(D).__webglFramebuffer===void 0&&ie.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?ie.setTextureCube(D,0):D.isData3DTexture?ie.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?ie.setTexture2DArray(D,0):ie.setTexture2D(D,0),V.unbindTexture()},this.resetState=function(){b=0,P=0,B=null,V.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=zt._getDrawingBufferColorSpace(e),t.unpackColorSpace=zt._getUnpackColorSpace()}};function Bh(r,e){if(e===dh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Ks||e===Wa){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===Ks)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var Rr=class extends Bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=ar.extractUrlBase(e);a=ar.resolveURL(c,this.path)}else a=ar.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Hs(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Fp){try{a[Ot.KHR_BINARY_GLTF]=new ru(e)}catch(u){i&&i(u);return}s=JSON.parse(a[Ot.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new uu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Ot.KHR_MATERIALS_UNLIT:a[u]=new kh;break;case Ot.KHR_DRACO_MESH_COMPRESSION:a[u]=new su(s,this.dracoLoader);break;case Ot.KHR_TEXTURE_TRANSFORM:a[u]=new au;break;case Ot.KHR_MESH_QUANTIZATION:a[u]=new ou;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function L0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var Ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gh=class{constructor(e){this.parser=e,this.name=Ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new Ye(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Un);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Vn(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Qr(h),c.distance=u;break;case"spot":c=new $r(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Gi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},kh=class{constructor(){this.name=Ot.KHR_MATERIALS_UNLIT}getMaterialType(){return yn}extendParams(e,t,n){let i=[];e.color=new Ye(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Un),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(i)}},Vh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Hh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new _e(o,o)}return Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Ye(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Un)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},qh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ye().setRGB(o[0],o[1],o[2],Un),Promise.all(s)}},Zh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ye().setRGB(o[0],o[1],o[2],Un),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=Ot.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},$h=class{constructor(e){this.parser=e,this.name=Ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Kt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Qh=class{constructor(e){this.parser=e,this.name=Ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},eu=class{constructor(e){this.parser=e,this.name=Ot.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},tu=class{constructor(e){this.parser=e,this.name=Ot.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},nu=class{constructor(e){this.name=Ot.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}},iu=class{constructor(e){this.name=Ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==vi.TRIANGLES&&c.mode!==vi.TRIANGLE_STRIP&&c.mode!==vi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(let g of u){let m=new st,f=new S,v=new Rn,y=new S(1,1,1),_=new Xr(g.geometry,g.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&v.fromBufferAttribute(l.ROTATION,x),l.SCALE&&y.fromBufferAttribute(l.SCALE,x),_.setMatrixAt(x,m.compose(f,v,y));for(let x in l)if(x==="_COLOR_0"){let T=l[x];_.instanceColor=new _r(T.array,T.itemSize,T.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);pn.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),p.push(_)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Fp="glTF",qa=12,Np={JSON:1313821514,BIN:5130562},ru=class{constructor(e){this.name=Ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,qa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Fp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-qa,s=new DataView(e,qa),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===Np.JSON){let c=new Uint8Array(e,qa+a,o);this.content=n.decode(c)}else if(l===Np.BIN){let c=qa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},su=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=cu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=cu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],p=ta[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(let g in p.attributes){let m=p.attributes[g],f=l[g];f!==void 0&&(m.normalized=f)}u(p)},o,c,Un,d)})})}},au=class{constructor(){this.name=Ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ou=class{constructor(){this.name=Ot.KHR_MESH_QUANTIZATION}},Al=class extends rr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*c,m=g-c,f=-2*p+3*d,v=p-d,y=1-f,_=v-d+u;for(let x=0;x!==o;x++){let T=a[m+x+o],b=a[m+x+l]*h,P=a[g+x+o],B=a[g+x]*h;s[x]=y*T+_*b+f*P+v*B}return s}},D0=new Rn,lu=class extends Al{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return D0.fromArray(s).normalize().toArray(s),s}},vi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ta={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Up={9728:ii,9729:Nn,9984:pl,9985:qs,9986:ts,9987:ei},Bp={33071:vr,33648:Rs,10497:vn},Oh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Cr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},N0={CUBICSPLINE:void 0,LINEAR:zr,STEP:Fr},Fh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function U0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Rt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Sr})),r.DefaultMaterial}function ls(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Gi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function B0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function O0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function F0(r){let e,t=r.extensions&&r.extensions[Ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zh(t.attributes):e=r.indices+":"+zh(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+zh(r.targets[n]);return e}function zh(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function hu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function z0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var G0=new st,uu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new L0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Kr(this.options.manager):this.textureLoader=new Oa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Hs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ls(s,o,i),Gi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ot.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(ar.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Oh[i.type],o=ta[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new fn(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Oh[i.type],c=ta[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,m,f;if(p&&p!==u){let v=Math.floor(d/p),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+v+":"+i.count,_=t.cache.get(y);_||(m=new c(o,v*p,i.count*p/h),_=new Us(m,p/h),t.cache.add(y,_)),f=new Bs(_,l,d%p/h,g)}else o===null?m=new c(i.count*l):m=new c(o,d,i.count*l),f=new fn(m,l,g);if(i.sparse!==void 0){let v=Oh.SCALAR,y=ta[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,T=new y(a[1],_,i.sparse.count*v),b=new c(a[2],x,i.sparse.count*l);o!==null&&(f=new fn(f.array.slice(),f.itemSize,f.normalized)),f.normalized=!1;for(let P=0,B=T.length;P<B;P++){let U=T[P];if(f.setX(U,b[P*l]),l>=2&&f.setY(U,b[P*l+1]),l>=3&&f.setZ(U,b[P*l+2]),l>=4&&f.setW(U,b[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}f.normalized=g}return f})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Up[d.magFilter]||Nn,h.minFilter=Up[d.minFilter]||ei,h.wrapS=Bp[d.wrapS]||vn,h.wrapT=Bp[d.wrapT]||vn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==ii&&h.minFilter!==Nn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(m){let f=new Cn(m);f.needsUpdate=!0,d(f)}),t.load(ar.resolveURL(u,s.path),g,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Gi(u,a),u.userData.mimeType=a.mimeType||z0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Ot.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ot.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[Ot.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Os,qn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Mr,qn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Rt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[Ot.KHR_MATERIALS_UNLIT]){let u=i[Ot.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new Ye(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Un),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Bt);let h=s.alphaMode||Fh.OPAQUE;if(h===Fh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Fh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==yn&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new _e(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==yn&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==yn){let u=s.emissiveFactor;o.emissive=new Ye().setRGB(u[0],u[1],u[2],Un)}return s.emissiveTexture!==void 0&&a!==yn&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,yt)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),Gi(u,s),t.associations.set(u,{materials:e}),s.extensions&&ls(i,u,s),u})}createUniqueName(e){let t=ln.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Op(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=F0(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Ot.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Op(new ht,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?U0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let m=h[p],f=a[p],v,y=c[p];if(f.mode===vi.TRIANGLES||f.mode===vi.TRIANGLE_STRIP||f.mode===vi.TRIANGLE_FAN||f.mode===void 0)v=s.isSkinnedMesh===!0?new Hr(m,y):new at(m,y),v.isSkinnedMesh===!0&&v.normalizeSkinWeights(),f.mode===vi.TRIANGLE_STRIP?v.geometry=Bh(v.geometry,Wa):f.mode===vi.TRIANGLE_FAN&&(v.geometry=Bh(v.geometry,Ks));else if(f.mode===vi.LINES)v=new qr(m,y);else if(f.mode===vi.LINE_STRIP)v=new jr(m,y);else if(f.mode===vi.LINE_LOOP)v=new Ta(m,y);else if(f.mode===vi.POINTS)v=new ba(m,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(v.geometry.morphAttributes).length>0&&O0(v,s),v.name=t.createUniqueName(s.name||"mesh_"+e),Gi(v,s),f.extensions&&ls(i,v,f),t.assignFinalMaterial(v),u.push(v)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&ls(i,u[0],s),u[0];let d=new Fe;s.extensions&&ls(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(mh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new sr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Gi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new st;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Wr(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let p=i.channels[u],g=i.samplers[p.sampler],m=p.target,f=m.node,v=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;m.node!==void 0&&(a.push(this.getDependency("node",f)),o.push(this.getDependency("accessor",v)),l.push(this.getDependency("accessor",y)),c.push(g),h.push(m))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],m=u[3],f=u[4],v=[];for(let _=0,x=d.length;_<x;_++){let T=d[_],b=p[_],P=g[_],B=m[_],U=f[_];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let F=n._createAnimationTracks(T,b,P,B,U);if(F)for(let R=0;R<F.length;R++)v.push(F[R])}let y=new Ua(s,void 0,v);return Gi(y,i),y})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,G0)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new yr:c.length>1?h=new Fe:c.length===1?h=c[0]:h=new pn,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Gi(h,s),s.extensions&&ls(n,h,s),s.matrix!==void 0){let u=new st;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Fe;n.name&&(s.name=i.createUniqueName(n.name)),Gi(s,n),n.extensions&&ls(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[d,p]of i.associations)(d instanceof qn||d instanceof Cn)&&u.set(d,p);return h.traverse(d=>{let p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];Cr[s.path]===Cr.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Cr[s.path]){case Cr.weights:c=Di;break;case Cr.rotation:c=Ni;break;case Cr.translation:case Cr.scale:c=Ui;break;default:n.itemSize===1?c=Di:c=Ui;break}let h=i.interpolation!==void 0?N0[i.interpolation]:zr,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){let g=new c(l[d]+"."+Cr[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=hu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Ni?lu:Al;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function k0(r,e,t){let n=e.attributes,i=new Mn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),o.normalized){let h=hu(ta[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new S,l=new S;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let m=hu(ta[d.componentType]);l.multiplyScalar(m)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new jn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Op(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=cu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return zt.workingColorSpace!==Un&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${zt.workingColorSpace}" not supported.`),Gi(r,e),k0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?B0(r,e.targets,t):r})}var zp=document.currentScript?.src||location.href,V0={scooter:new URL("./assets/garage/models/scooter-v1.glb",zp).href,hoverboard:new URL("./assets/garage/models/skyboard-v1.glb",zp).href},Cl={},du={};function Gp(r){return Cl[r]?Promise.resolve():du[r]||(du[r]=new Rr().loadAsync(V0[r]).then(e=>{Cl[r]=e.scene}).catch(e=>{throw delete du[r],e}))}function kp(r,e){let t=e.transport;if(!Cl[t])throw Error("\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");let n=new Fe;n.name=t==="scooter"?"Hyper scooter":"Skyboard",n.scale.setScalar(t==="scooter"?1.9:2.4);let i=Cl[t].clone(!0);n.add(i),r.add(n),i.traverse(o=>{o.isMesh&&(o.geometry=o.geometry.clone(),o.material=o.material.clone(),o.castShadow=!0,o.receiveShadow=!0)});let s=[];if(t==="hoverboard")for(let o of[-.36,.36])for(let l of[-.21,.21]){let c=new Fe;c.position.set(o,.245,l),n.add(c);for(let[h,u,d,p]of[[.056,.22,"#ff7718",.65],[.036,.17,"#ffc74a",.85],[.02,.11,"#fff5cf",1]]){let g=new zs(h,u,12,1,!0);g.rotateZ(Math.PI),g.translate(0,-u/2,0);let m=new yn({color:d,transparent:!0,opacity:p,depthWrite:!1,side:Bt,blending:za}),f=new at(g,m);f.name="Skyboard exhaust flame",c.add(f)}s.push(c)}function a(o){if(t!=="scooter")return;let l={...window.PokerScooter.defaults,...o.scooter};i.traverse(c=>{let h=/^sc__([a-z]+)__([a-z]+)$/.exec(c.name);h&&(c.visible=h[2]==="always"||l[h[1]]===h[2]),c.isMesh&&c.material.name==="Scooter frame"&&c.material.color.set(l.frame==="gold"?"#d4a13c":"#475560")})}return a(e),{car:n,update:a,measureClearance:()=>null,animate:t==="hoverboard"?o=>{s.forEach((l,c)=>{l.scale.y=1+Math.sin(o*.021+c*1.7)*.12}),n.position.y=Math.sin(o*.0018)*.065,n.rotation.x=Math.sin(o*.0011)*.018,n.rotation.z=Math.sin(o*.0014)*.015}:void 0}}var H0=new URL("./assets/garage/models/bicycle-v1.glb",document.currentScript?.src||location.href).href,Il,Rl;function Vp(){return Il?Promise.resolve():(Rl||(Rl=new Rr().loadAsync(H0).then(r=>{Il=r.scene}).catch(r=>{throw Rl=null,r})),Rl)}function Hp(r,e){if(!Il)throw Error("\u0412\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434 \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");let t=new Fe;t.name="Club bicycle",t.scale.setScalar(1.75);let n=Il.clone(!0);t.add(n),r.add(t),n.traverse(s=>{s.isMesh&&(s.geometry=s.geometry.clone(),s.material=s.material.clone(),s.castShadow=!0,s.receiveShadow=!0)});function i(s){let a={...window.PokerBicycle.defaults,...s.bicycle};n.traverse(o=>{let l=/^bike__([a-z]+)__([a-z]+)$/.exec(o.name);l&&(o.visible=l[2]==="always"||a[l[1]]===l[2]),o.isMesh&&o.material.name==="Bicycle frame"&&o.material.color.set(a.frame==="ruby"?"#b91c32":"#126aa0"),o.isMesh&&o.material.name==="Headlight lens"&&(o.material.emissive.set("#e7f5ff"),o.material.emissiveIntensity=.6)})}return i(e),{car:t,update:i,measureClearance:()=>null}}var W0=document.currentScript?.src||location.href,Wp={"bmw-e60":{file:"./assets/garage/models/bmw-m5-e60-v5.glb?v=20261108-admin-e60",paint:"E60_00"},"mustang-gt500":{file:"./assets/garage/models/mustang-shelby-gt500-v1.glb",paint:"carpaint"}};function Xp(r){let e=Wp[r];if(!e.pending){let t=new URL(e.file,W0).href;e.pending=new Rr().loadAsync(t).then(n=>{e.template=n.scene}).catch(n=>{throw e.pending=null,n})}return e.pending}function jp(r,e){let t=Wp[e.transport];if(!t.template)throw Error("\u041C\u0430\u0448\u0438\u043D\u0430 \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");let n=new Fe;n.name=e.transport,n.scale.setScalar(1.22);let i=t.template.clone(!0),s=[];i.traverse(l=>{l.isMesh&&(l.geometry=l.geometry.clone(),l.material=l.material.clone(),l.castShadow=!0,l.receiveShadow=!0,l.material.name===t.paint&&s.push(l.material))}),n.add(i),r.add(n);let a=s.map(l=>l.color.clone());function o(l){s.forEach((c,h)=>{c.color.copy(l.paint==="classic"?a[h]:new Ye(window.PokerGarage.item("paint",l.paint).color))})}return o(e),{car:n,update:o,measureClearance:()=>null}}function qp({render:r,active:e=()=>!1,fps:t=30,document:n=document,requestFrame:i=requestAnimationFrame,cancelFrame:s=cancelAnimationFrame}){let a=0,o=!1,l=!1,c=-1/0;function h(){l||(o=!0,!n.hidden&&!a&&(a=i(u)))}function u(p){if(a=0,l||n.hidden)return;let g=e();(o||g)&&p-c>=1e3/t-.1&&(o=!1,c=p,r(p)),!a&&!l&&(o||e())&&(a=i(u))}function d(){n.hidden?(s(a),a=0):h()}return n.addEventListener("visibilitychange",d),{request:h,dispose(){l=!0,s(a),a=0,n.removeEventListener("visibilitychange",d)}}}function Yp(r){let e=new Set,t=new Set,n=new Set,i=s=>{Array.isArray(s)?s.forEach(i):s?.isMaterial&&t.add(s)};r.traverse(s=>{s.geometry&&e.add(s.geometry),i(s.material),i(s.customDepthMaterial),i(s.customDistanceMaterial)});for(let s of t){for(let a of Object.values(s))a?.isTexture&&n.add(a);s.dispose()}n.forEach(s=>s.dispose()),e.forEach(s=>s.dispose())}function Zp(r,e,t=.18){return Math.max(0,r+t-e)}function Pl(r){let e=[[-2.6,.22],[-1.8,.42],[-1.3,.76],[-.65,.94],[-.1,.91],[.35,.68],[.8,.3],[1.25,.19],[1.65,.17]];if(r<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++){let[n,i]=e[t],[s,a]=e[t-1];if(r<=n){let o=(r-s)/(n-s),l=o*o*(3-2*o);return a+(i-a)*l}}return e.at(-1)[1]}function Kp(r,e=[]){let t=!1,n=new Map,i=new Set(e),s=new S;function a(o){for(let l=o;l&&l!==r;l=l.parent)if(i.has(l)||l.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(l.name)||l.name.startsWith("front-wing-")&&o.name!=="tapered-nose")return!0;return!1}return{set(o){o=!!o;let l=o!==t;if(!l&&!o)return;t=o,r.updateWorldMatrix(!0,!0);let c=r.matrixWorld.clone().invert();r.traverse(h=>{if(!h.geometry||a(h))return;let u=h.geometry,d=u.getAttribute("position");if(!d||!l&&n.has(u))return;n.has(u)||n.set(u,new Float32Array(d.array));let p=n.get(u);if(d.array.set(p),o){let g=new st().multiplyMatrices(c,h.matrixWorld),m=g.clone().invert();for(let f=0;f<d.count;f++)s.fromBufferAttribute(d,f).applyMatrix4(g),s.z*=Pl(s.x),s.y>1.08&&(s.y=1.08+(s.y-1.08)*.68),s.applyMatrix4(m),d.setXYZ(f,s.x,s.y,s.z)}d.needsUpdate=!0,u.computeVertexNormals(),u.computeBoundingBox(),u.computeBoundingSphere()})}}}function Jp({paint:r,carbon:e,metal:t}){let n=new Fe;n.name="formula-cockpit";function i(d,p,g,m){let f=new at(new Ct(new wt(d.map(v=>new S(...v))),40,p,10,!1),g);return f.name=m,f.castShadow=f.receiveShadow=!0,n.add(f),f}i([[-1.03,1.47,-.64],[-.99,2.48,-.64],[-.38,2.55,-.65],[.53,2.49,-.46],[1,2.4,0],[.53,2.49,.46],[-.38,2.55,.65],[-.99,2.48,.64],[-1.03,1.47,.64]],.043,e,"halo-ring"),i([[1,2.4,0],[1.13,1.93,0],[1.22,1.44,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.34],[-1.27,2.53,-.28],[-1.22,2.65,0],[-1.27,2.53,.28],[-1.25,1.4,.34]],.048,e,"roll-hoop");for(let d of[-1,1])for(let p of[.67,.94])i([[1.19,p,d*.34],[1.92,p-.12,d*1.24],[2.22,p,d*.31]],.024,e,"front-wishbone");let s=new Fe;s.name="formula-engine-cover";let a=[],o=[],l=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],c=32;l.forEach(([d,p,g,m],f)=>{for(let v=0;v<=c;v++){let y=v/c*Math.PI*2;if(a.push(d,p+Math.sin(y)*m,Math.cos(y)*g),f<l.length-1&&v<c){let _=f*(c+1)+v,x=_+c+1;o.push(_,x,_+1,_+1,x,x+1)}}});for(let d of[0,l.length-1])for(let p=1;p<c-1;p++){let g=d*(c+1);d===0?o.push(g,g+p,g+p+1):o.push(g,g+p+1,g+p)}let h=new ht;h.setAttribute("position",new Re(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new at(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let p=0;p<5;p++){let g=new at(new nt(.025,.07,.19),e);g.position.set(-1.48-p*.13,1.57-p*.055,d*.31),g.rotation.z=-.2,s.add(g)}return n.add(s),{group:n,engine:s}}function $p(r,e,t){let n=e.hat,i=new Fe,s=[],a=[],o=[];if(!n||n==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};i.name="headwear:"+n;let l=(v,y=.88,_=0)=>{let x=new Rt({color:v,roughness:y,metalness:_,side:Bt});return a.push(x),x},c=l(t.item("hat",n).color),h=l(new Ye(t.item("hat",n).color).multiplyScalar(.66)),u=l("#a79672"),d=l("#242422"),p=(v,y)=>{s.push(v);let _=new at(v,y);return _.castShadow=_.receiveShadow=!0,i.add(_),_},g=(v,y,_,x=!1)=>p(new Ct(new wt(v.map(T=>new S(...T)),x),64,y,8,x),_);function m(v,y,_,x,T){let b=[];for(let P=0;P<64;P++){let B=P/64*Math.PI*2;b.push([Math.cos(B)*y,v,.015+Math.sin(B)*_])}g(b,x,T,!0)}function f(v,y,_,x,T){let b=[],P=[],B=[];for(let L=0;L<=12;L++)for(let q=0;q<=96;q++){let W=q/96*Math.PI*2,$=L/12,ae=v+(y-v)*$;if(b.push(ae*Math.cos(W),_-x*$*$,.015+ae*.92*Math.sin(W)),P.push(q/96,L/12),L<12&&q<96){let Z=L*97+q;B.push(Z,Z+1,Z+96+1,Z+1,Z+96+2,Z+96+1)}}let R=new ht;R.setAttribute("position",new Re(b,3)),R.setAttribute("uv",new Re(P,2)),R.setIndex(B),R.computeVertexNormals(),p(R,T),m(_-x,y,y*.92,.004,h)}if(/straw/i.test(n)){let v=new Qe(.245,.282,.245,64,8);v.translate(0,1.955,.015),p(v,c),f(.27,.48,1.836,.03,c),m(1.854,.285,.269,.017,d);for(let y=1.86;y<2.075;y+=.012)m(y,.282-(y-1.83)*.14,.26-(y-1.83)*.12,.0014,u);for(let y=.3;y<.48;y+=.013)m(1.836-.03*((y-.27)/.21)**2,y,y*.92,.0012,u)}else if(/bucket|duck/i.test(n)){let v=new Qe(.255,.293,.215,64,8);v.translate(0,1.952,.015),p(v,c),f(.29,.363,1.845,.053,c),m(1.85,.294,.276,.0025,h),m(2.054,.255,.245,.002,h);let y=document.createElement("canvas");y.width=y.height=256;let _=y.getContext("2d");_.fillStyle=t.item("hat",n).color,_.fillRect(0,0,256,256);for(let T=30;T<256;T+=70)for(let b=20;b<256;b+=80)_.fillStyle="#d9ad42",_.beginPath(),_.ellipse(b,T,12,8,0,0,Math.PI*2),_.fill(),_.beginPath(),_.arc(b+9,T-7,6,0,Math.PI*2),_.fill(),_.fillStyle="#e89c34",_.fillRect(b+13,T-8,6,3),_.fillStyle="#201a13",_.fillRect(b+10,T-9,2,2);let x=new Xt(y);x.colorSpace=yt,x.wrapS=x.wrapT=vn,x.repeat.set(4,1),o.push(x),c.map=x}else{let v=new Ht(1,64,36,0,Math.PI*2,0,Math.PI*.51);v.scale(.305,.235,.288),v.translate(0,1.82,.015),p(v,c),m(1.818,.305,.288,.007,h);let y=[],_=[],x=[],T=32,b=16;for(let F=0;F<=b;F++)for(let R=0;R<=T;R++){let L=R/T*2-1,q=F/b,W=L*(.292-.018*q),$=.17+.4*Math.sqrt(Math.max(.08,1-L*L))*q,ae=1.814-.028*q-.027*L*L*q;if(y.push(W,ae,$),_.push(R/T,F/b),R<T&&F<b){let Z=F*(T+1)+R;x.push(Z,Z+1,Z+T+1,Z+1,Z+T+2,Z+T+1)}}let P=new ht;P.setAttribute("position",new Re(y,3)),P.setAttribute("uv",new Re(_,2)),P.setIndex(x),P.computeVertexNormals(),p(P,c);let B=[];for(let F=0;F<=T;F++){let R=F/T*2-1;B.push([R*.274,1.786-.027*R*R,.17+.4*Math.sqrt(Math.max(.08,1-R*R))])}g(B,.004,h);for(let F=0;F<6;F++){let R=F/6*Math.PI*2,L=[];for(let q=0;q<=24;q++){let W=q/24*Math.PI/2;L.push([.307*Math.sin(W)*Math.cos(R),1.82+.237*Math.cos(W),.015+.29*Math.sin(W)*Math.sin(R)])}g(L,.0017,h)}let U=new Ht(.015,20,12);if(U.translate(0,2.058,.015),p(U,h),/propeller/i.test(n)){let F=l("#c7c4b9",.35,.8),R=new Qe(.006,.006,.065,12);R.translate(0,2.09,.015),p(R,F);for(let L=0;L<3;L++){let q=new Ht(1,20,12);q.scale(.115,.007,.027),q.translate(.086,0,0),q.rotateY(L/3*Math.PI*2),q.translate(0,2.126,.015),p(q,l(["#ba3847","#3e83ae","#d4b74a"][L]))}}else{let F=document.createElement("canvas");F.width=256,F.height=128;let R=F.getContext("2d");R.clearRect(0,0,256,128),R.fillStyle="#d0b77a",R.font="bold 62px Arial",R.textAlign="center",R.fillText("P21",128,88);let L=new Xt(F);L.colorSpace=yt,o.push(L);let q=new Rt({map:L,transparent:!0,alphaTest:.1,roughness:.9});a.push(q);let W=new Zt(.12,.06);W.translate(0,1.945,.265),p(W,q)}}return r.bones.head.add(i),i.position.copy(new S(...r.bones.head.userData.rest).negate()),{dispose(){i.removeFromParent(),s.forEach(v=>v.dispose()),a.forEach(v=>v.dispose()),o.forEach(v=>v.dispose())}}}var ki=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Qp(r){let e=[],t={};function n(f,v,y,_,x=0){let T=new yr;T.name=f;let b=v?v.userData.rest:[0,0,0];return T.position.set(y-b[0],_-b[1],x-b[2]),T.userData.rest=[y,_,x],(v||r).add(T),e.push(T),t[f]=T,T}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),l=n("head",o,0,1.4,.1);for(let[f,v]of[["left",-1],["right",1]]){let y=n(f+"Shoulder",a,v*.49,1.09),_=n(f+"Elbow",y,v*.66,.57),x=n(f+"Wrist",_,v*.78,.04,.035),T=n(f+"Hand",x,v*.79,-.15,.07);for(let B=0;B<4;B++)n(f+"Finger"+B,T,v*(.5-(.175+B*.019))*2.55,-.17-B*.007,.07);n(f+"Thumb",T,v*.63,-.13,.11);let b=n(f+"Hip",i,v*.23,-.2,-.01),P=n(f+"Knee",b,v*.34,-.77,-.01);n(f+"Ankle",P,v*.44,-1.3,.08)}r.updateMatrixWorld(!0);let c=new Wr(e);function h(f,v,y){let _=v<.5?"left":"right",x=i,T=i,b=0;if(f===1)x=s,T=a,b=1-ki(.25,.44,y);else if(f===2||f===9)y<.25?(x=a,T=t[_+"Shoulder"],b=ki(.175,.245,y)):y<.4?(x=t[_+"Shoulder"],T=t[_+"Elbow"],b=ki(.29,.38,y)):(x=t[_+"Elbow"],T=t[_+"Wrist"],b=ki(.43,.49,y));else if(f===3){let P=v<.5?v:1-v;y>.54?(x=t[_+"Hand"],T=t[_+(P>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((P-.175)/.019))))],b=ki(.54,.566,y)):(x=t[_+"Wrist"],T=t[_+"Hand"],b=ki(.49,.53,y))}else f===4?y<.57?(x=i,T=t[_+"Hip"],b=ki(.5,.57,y)):y<.76?(x=t[_+"Hip"],T=t[_+"Knee"],b=ki(.66,.74,y)):(x=t[_+"Knee"],T=t[_+"Ankle"],b=ki(.79,.84,y)):f===5||f===8?x=T=t[_+"Ankle"]:f===6||f===10?x=T=l:f===7&&(x=a,T=o,b=1-ki(.17,.225,y));return{indices:[e.indexOf(x),e.indexOf(T),0,0],weights:[1-b,b,0,0]}}function u(f,v){let y=f.getAttribute("bodyUv"),_=f.getAttribute("surface"),x=[],T=[];for(let P=0;P<y.count;P++){let B=h(_.getX(P),y.getX(P),y.getY(P));x.push(...B.indices),T.push(...B.weights)}f.setAttribute("skinIndex",new Vr(x,4)),f.setAttribute("skinWeight",new Re(T,4));let b=new Hr(f,v);return r.add(b),b.bind(c,new st),b.frustumCulled=!1,b}let d=0,p=!1;function g(f,v,y){d+=(Number(v)-d)*(1-Math.exp(-Math.min(.1,y)*9));let _=Math.sin(f*1.55)*d;a.scale.set(1+_*.003,1+_*.003,1+_*.007),l.rotation.set(Math.sin(f*.57)*.01*d,(p?.025:0)+Math.sin(f*.36)*.024*d,(p?-.016:0)+Math.sin(f*.41)*.008*d);for(let[x,T]of[["left",-1],["right",1]]){t[x+"Shoulder"].rotation.z=(p?T*.026:0)+(Math.sin(f*.79+T*.5)*.009+T*.005)*d,t[x+"Elbow"].rotation.x=(p?T<0?-.045:-.085:0)+(Math.sin(f*.67+T*.4)*.012-.025)*d,t[x+"Hand"].rotation.x=(p?.025:0)+Math.sin(f*.61+T)*.01*d;for(let b=0;b<4;b++)t[x+"Finger"+b].rotation.x=(.035+Math.sin(f*.53+b*.25+T)*.012)*d}r.updateMatrixWorld(!0),c.update()}function m(f,v){r.updateMatrixWorld(!0),t[v].attach(f)}return{skeleton:c,bones:t,mesh:u,update:g,attach:m,weights:h,setRelaxedPose(f){p=!!f},dispose(){c.dispose()}}}var Ll=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function ef(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,l,c)=>{if(c===1){let h=Ll(o,.25,.12),u=Ll(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,l*=n,l+=s*u*(l>0?1:.15)}if(c===2){let h=(i-1)*Ll(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),l*=1+h}if(c===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*Ll(o,.69,.16);a=h+(a-h)*(1+u),l*=1+u}return[a,o,l]}}function tf(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new Rt({color:i[t]||"#30241d",roughness:.96}),a=new Uint8Array(16384*4);for(let u=0;u<128;u++)for(let d=0;d<128;d++){let p=(u*128+d)*4,g=Math.sin(d*127.1+u*311.7)*43758.5453,m=128+Math.round(28*Math.sin(u*1.7)+28*(g-Math.floor(g)-.5));a[p]=a[p+1]=a[p+2]=m,a[p+3]=255}let o=new tr(a,128,128);o.wrapS=o.wrapT=vn,o.repeat.set(3,3),o.magFilter=Nn,o.minFilter=ei,o.generateMipmaps=!0,o.needsUpdate=!0,s.bumpMap=o,s.bumpScale=.002;let l=e.sculptHairTexture?.clone();l&&(l.center.set(.5,.5),l.rotation=Math.PI/2,l.repeat.set(2,2),l.needsUpdate=!0,s.bumpMap=l,s.bumpScale=.0024,i[t]||(s.map=l,s.color.set("#c7b9a4")));let c=new Fe;c.name="hairstyle:"+t;function h(u,d,p,g,m,f,v=0){let y=new Ht(1,12,10);n.push(y);let _=new at(y,s);_.position.set(u,d,p),_.scale.set(g,m,f),_.rotation.z=v,c.add(_)}if(t==="hairDreads"){let u=new Ht(1,48,24,0,Math.PI*2,0,Math.PI*.62);u.scale(.275,.292,.278),u.translate(0,1.62,.1),n.push(u),c.add(new at(u,s));for(let d=0;d<5;d++)for(let p=0;p<11;p++){let g=(p+d%2*.5)/11*Math.PI*2,m=.3+d*.28,f=Math.cos(g)*Math.sin(m)*.278,v=.1+Math.sin(g)*Math.sin(m)*.285,y=1.62+Math.cos(m)*.299;if(Math.sin(g)>.25&&d===4)continue;let _=Math.sin(g)>.25?Math.min(.1+d*.035,Math.max(.035,y-1.7)):.1+d*.035,x=[new S(f,y,v),new S(f*1.1,y-.035,.1+(v-.1)*1.12),new S(f*1.16,y-_*.65,.1+(v-.1)*1.17),new S(f*1.12,y-_,.1+(v-.1)*1.18)],T=new Ct(new wt(x),16,.02,8,!1),b=T.getAttribute("position");for(let P=0;P<=16;P++){let B=new S;for(let F=0;F<=8;F++)B.add(new S().fromBufferAttribute(b,P*9+F));B.multiplyScalar(1/9);let U=(1-.6*Math.pow(P/16,5))*(1+.045*Math.sin(P*2.4+p));for(let F=0;F<=8;F++){let R=P*9+F,L=new S().fromBufferAttribute(b,R).sub(B).multiplyScalar(U).add(B);b.setXYZ(R,L.x,L.y,L.z)}}T.computeVertexNormals(),n.push(T),c.add(new at(T,s))}}else if(t!=="hairBald"){let u=t==="hairBuzz",d=t==="hairAfro",p=t==="hairMohawk"||t==="hairBlue",g=t==="hairDreads",m=t==="hairRocker";for(let f=0;f<7;f++)for(let v=0;v<12;v++){let y=v/12*Math.PI*2,_=f/7*Math.PI*.57;if(p&&Math.abs(Math.cos(y))>.27)continue;let x=Math.cos(y)*Math.sin(_)*.23,T=.1+Math.sin(y)*Math.sin(_)*.24,b=t==="hairCurly"||d,P=u?.026:b?.067:.045,B=u?.018:d?.12:p?.16:b?.065:.075,U=1.62+Math.cos(_)*.29;t==="hairPompadour"&&(B+=Math.max(0,Math.sin(y))*.1,U+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(U+=x*.16),(g||m)&&(B=f>3?.18:.065,U-=f>3?.07:0),h(x,U,T,P,B,P,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(c),c.position.copy(r.bones.head.userData.rest?new S(...r.bones.head.userData.rest).negate():new S),c.position.y+=e.sculptHairOffset||0,c.position.z+=e.sculptHairDepth||0,{dispose(){c.removeFromParent(),n.forEach(u=>u.dispose()),s.dispose(),o.dispose(),l?.dispose()}}}function nf(r,e,t){let n=[],i=[],s=new Fe;if(!e.glasses||e.glasses==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};s.name="eyewear:"+e.glasses;let a=e.glasses,o=/round|rimless/.test(a),l=/sport/.test(a),c=/Gold|Silver|browline/.test(a),h=new Rt({color:t.item("glasses",a).color,metalness:c?.85:.08,roughness:c?.28:.38}),u=new Kt({color:l?"#406d80":"#182322",metalness:l?.65:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.08,transparent:!0,opacity:.94,side:Bt});i.push(h,u);let d=(g,m)=>{n.push(g);let f=new at(g,m);return s.add(f),f},p=(g,m)=>d(new Ct(new wt(g.map(f=>new S(...f))),32,m,8,!1),h);for(let g of[-1,1]){let m=g*.125,f=1.63,v=.391,y=l?.127:.112,_=o?.079:l?.06:.067,x=[],T=new jt;for(let B=0;B<=64;B++){let U=B/64*Math.PI*2,F=Math.cos(U),R=Math.sin(U),L=y*(o?F:Math.sign(F)*Math.pow(Math.abs(F),.65)),q=_*(o?R:Math.sign(R)*Math.pow(Math.abs(R),.65));B===0?T.moveTo(L,q):T.lineTo(L,q),x.push(new S(m+L,f+q,v-Math.abs(L)*.16))}let b=new ir(T,32);b.translate(m,f,v-.005),d(b,u),d(new Ct(new wt(x,!0),64,c?.0045:.0085,8,!0),h),p([[g*.233,f+.008,.376],[g*.256,f+.004,.3],[g*.273,f-.005,.17],[g*.282,f-.024,.085]],c?.0045:.008);let P=new Ht(.011,16,10);P.translate(g*.237,f+.009,.374),d(P,h)}return p([[-.025,1.644,.389],[0,1.655,.404],[.025,1.644,.389]],c?.004:.006),r.bones.head.add(s),s.position.copy(new S(...r.bones.head.userData.rest).negate()),s.position.z+=e.sculptEyewearDepth||0,{dispose(){s.removeFromParent(),n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}function rf(r,e="#c5b899"){let t=new Fe;t.name="wardrobe-wrist-watch",t.position.set(.744,.015,.026),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Rt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Rt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,T,b,P,B)=>{let U=new at(x,T);return U.position.set(b,P,B),t.add(U),U},o=a(new Gt(.072,.012,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.9,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let T=x*Math.PI/9,b=a(new nt(.026,.049,.016),i,Math.cos(T)*.065,0,Math.sin(T)*.072);b.rotation.y=-T}let l=/square|smart/i.test(r),c=a(l?new nt(.147,.153,.022):new Qe(.078,.073,.022,64),i,0,0,.078);if(l||(c.rotation.x=Math.PI/2),!l)a(new Gt(.069,.006,12,64),i,0,0,.095);else for(let[x,T,b,P]of[[-.071,0,.008,.15],[.071,0,.008,.15],[0,.071,.14,.008],[0,-.071,.14,.008]])a(new nt(b,P,.009),i,x,T,.095);let h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),p=/Daytona|square|rose/i.test(r),g=u.createRadialGradient(190,170,20,256,256,256);g.addColorStop(0,d?"#237050":p?"#fff7db":"#294559"),g.addColorStop(1,d?"#072b20":p?"#c7c4b4":"#06121c"),u.fillStyle=g,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=p?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let m=(x,T,b)=>{u.save(),u.rotate(x),u.strokeStyle=p?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-T),u.stroke(),u.restore()};if(m(-Math.PI/3,112,13),m(Math.PI/3,168,9),m(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=p?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80),/GMT/i.test(r)){for(let x=0;x<24;x++)u.beginPath(),u.strokeStyle=x<12?"#a52d40":"#274e9a",u.lineWidth=24,u.arc(0,0,240,x*Math.PI/12,(x+1)*Math.PI/12),u.stroke();m(-Math.PI*.55,172,6)}if(/Daytona/i.test(r))for(let[x,T]of[[-91,35],[91,35],[0,128]])u.fillStyle="#182027",u.beginPath(),u.arc(x,T,48,0,Math.PI*2),u.fill(),u.strokeStyle="#e3dfd3",u.lineWidth=3,u.beginPath(),u.moveTo(x,T),u.lineTo(x+17,T-28),u.stroke();if(/Skeleton/i.test(r))for(let[x,T,b]of[[-60,60,65],[80,45,43],[15,-115,40]]){u.strokeStyle="#d6b783",u.lineWidth=9,u.beginPath(),u.arc(x,T,b,0,Math.PI*2),u.stroke();for(let P=0;P<8;P++){let B=P*Math.PI/4;u.beginPath(),u.moveTo(x+Math.cos(B)*15,T+Math.sin(B)*15),u.lineTo(x+Math.cos(B)*b,T+Math.sin(B)*b),u.stroke()}}/smart/i.test(r)&&(u.fillStyle="#06131d",u.fillRect(-256,-256,512,512),u.fillStyle="#8ae9c7",u.font="bold 100px Arial",u.fillText("10:10",0,10),u.font="32px Arial",u.fillText("POKER21",0,88));let f=new Xt(h);f.colorSpace=yt,f.anisotropy=4;let v=a(l?new Zt(.13,.13):new Qn(.066,64),new Rt({map:f,roughness:.34,metalness:.1}),0,0,.098),y=a(l?new Zt(.13,.13):new Qn(.066,64),new Kt({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.101),_=a(new Qe(.012,.012,.019,16),i,.085,0,.08);return _.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(T=>{T.geometry?.dispose(),T.material&&x.add(T.material)});for(let T of x)T.dispose();f.dispose()}}}function sf(r="#d3b15b",e="rubyLion"){let t=new Fe;t.name="wardrobe-finger-ring",t.position.set(.731,-.225,.07);let n=["silverSpade","clubSignet","diamondKing"].includes(e),i=new Rt({color:n?"#c6d3df":"#c5a14d",metalness:.9,roughness:.24}),s=new Kt({color:e==="rubyLion"?"#a51c39":e==="emeraldCrown"?"#167953":e==="diamondKing"?"#e8f7ff":r,metalness:.08,roughness:.1,clearcoat:1}),a=new at(new Gt(.026,.006,12,48),i);a.name="ring-band",a.rotation.x=Math.PI/2,t.add(a);let o=new at(e==="clubSignet"?new Qe(.021,.019,.012,8):new nt(.029,.029,.012),i);e==="clubSignet"&&(o.rotation.x=Math.PI/2),o.name="ring-bezel",o.position.z=.028,t.add(o);let l;if(e==="silverSpade"){let h=new jt;h.moveTo(0,.019),h.bezierCurveTo(-.008,.007,-.022,-.002,-.012,-.009),h.quadraticCurveTo(-.004,-.014,0,-.006),h.quadraticCurveTo(.004,-.014,.012,-.009),h.bezierCurveTo(.022,-.002,.008,.007,0,.019),h.lineTo(.006,-.017),h.lineTo(-.006,-.017),h.closePath(),l=new Vt(h,{depth:.003,bevelEnabled:!1})}else e==="clubSignet"||e==="goldAces"?l=new nt(.022,.025,.004):l=e==="emeraldCrown"?new nt(.02,.024,.012):new Vs(e==="diamondKing"?.021:.017);let c=new at(l,e==="silverSpade"||e==="goldAces"?i:s);if(c.name="ring-face:"+e,c.scale.z=.5,c.position.z=.039,t.add(c),["clubSignet","goldAces"].includes(e)){let h=document.createElement("canvas");h.width=h.height=128;let u=h.getContext("2d");u.fillStyle=n?"#24343d":"#45341a",u.fillRect(0,0,128,128),u.fillStyle=n?"#e1eaf1":"#edce83",u.font="bold 48px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText(e==="goldAces"?"AA":"P21",64,66,116),s.map=new Xt(h),s.map.colorSpace=yt,c.material=s}return{group:t,dispose(){t.traverse(h=>h.geometry?.dispose()),s.map?.dispose(),i.dispose(),s.dispose()}}}var Dl=new Map;async function X0(r){Dl.has(r)||Dl.set(r,fetch("./assets/player-hall/character-3d/sculpt/"+r+".bin").then(a=>{if(!a.ok)throw Error("Character anatomy: "+a.status);return a.arrayBuffer()}).catch(a=>{throw Dl.delete(r),a}));let e=await Dl.get(r),t=new DataView(e).getUint32(0,!0),n=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,t))),i=4+t,s=new ht;return s.setAttribute("position",new fn(new Float32Array(e.slice(i,i+n.vertices*12)),3)),s.setAttribute("normal",new fn(new Float32Array(e.slice(i+n.vertices*12,i+n.vertices*24)),3)),s.setIndex(new fn(new Uint32Array(e.slice(i+n.vertices*24)),1)),s}var Ya=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},cs=r=>{let e=Math.sin(r*127.1+311.7)*43758.5453;return e-Math.floor(e)};async function af(r,e){let t=new Fe,n=Qp(t),i=[],s=[],a=[],o=ef(e.body),l=r.wardrobeSubcategory("pants",e.pants)==="shorts",c=e.suit?.endsWith("Tee"),h=e.suit?.endsWith("Tank"),u=e.helmet&&e.helmet!=="none",d=!u||e.visor==="open",p=Promise.all(["head","face","hand-left","hand-right","shirt-"+(h?"tank":c?"tee":"jacket"),l?"shorts":"pants",...u?["helmet-shell"]:[]].map(X0)),g=(z,ee=.8,fe=0,Se=!1)=>{let Y=Se?Kt:Rt,ce=new Y({color:z,roughness:ee,metalness:fe});return s.push(ce),ce},m=g("#ffffff",.96),f=g("#ffffff",.73),v=g("#6b4735",.84),y=g("#73503c",.59),_=g("#453127",.51),x=g("#241b14",.21),T=g("#433627",.55),b=g("#0b0908",.15),P=g("#efe6d2",.32),B=g("#6e5341",.42),U=g(r.item("suit",e.suit).color,.94,0,!0),F=g(new Ye(r.item("suit",e.suit).color).multiplyScalar(.7),.92),R=g(r.item("pants",e.pants).color,.96),L=g(new Ye(r.item("pants",e.pants).color).multiplyScalar(.68),.94),q=g(r.item("shoes",e.shoes).color,.49,0,!0),W=g(new Ye(r.item("shoes",e.shoes).color).multiplyScalar(.78),.64),$=g("#dedbd3",.84),ae=g("#b1afa8",.93),Z=g("#c5a259",.3,.88);U.clearcoat=/leather|Biker/i.test(e.suit)?.25:0,U.roughness=/leather|Biker/i.test(e.suit)?.46:.94,U.sheen=/Knit|velvet/i.test(e.suit)?.65:.12,U.sheenRoughness=.85,q.clearcoat=.18,q.clearcoatRoughness=.48,q.color.r>q.color.g*1.8&&q.color.r>q.color.b*1.4&&(q.color.multiplyScalar(.62),W.color.multiplyScalar(.62));let oe=["classic","ruby","midnight"].includes(e.pants);oe&&(R.color.set("#171b20"),L.color.set("#101317"));let De=g("#ffffff",.97);De.vertexColors=!0,De.side=Bt;function Oe(z){let ee=new Uint8Array(65536);for(let Se=0;Se<128;Se++)for(let Y=0;Y<128;Y++){let ce=(Se*128+Y)*4,de=z==="cloth"?128+24*Math.cos(Y*Math.PI)+20*Math.sin(Se*Math.PI/2)+cs(ce)*15:128+(cs(ce)-.5)*48;ee[ce]=ee[ce+1]=ee[ce+2]=de,ee[ce+3]=255}let fe=new tr(ee,128,128);return fe.wrapS=fe.wrapT=vn,fe.repeat.set(z==="cloth"?4:8,z==="cloth"?4:8),fe.magFilter=Nn,fe.minFilter=ei,fe.generateMipmaps=!0,fe.anisotropy=4,fe.needsUpdate=!0,a.push(fe),fe}let[Me,[Ge,Ce]]=await Promise.all([p,Promise.all(["fur","skin"].map(z=>new Kr().loadAsync("./assets/player-hall/character-3d/sculpt/"+z+"-albedo-v1.webp")))]);for(let z of[Ge,Ce])z.colorSpace=yt,z.wrapS=z.wrapT=vn,z.anisotropy=4,a.push(z);Ge.repeat.set(2,3),Ce.repeat.set(2,2),m.map=Ge,m.bumpMap=Ge,m.bumpScale=.0024,f.map=Ce,m.onBeforeCompile=z=>{z.vertexShader=`attribute float surface;varying float furRegion;varying float furHeight;
`+z.vertexShader,z.vertexShader=z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
furRegion=surface;furHeight=position.y;`),z.fragmentShader=`varying float furRegion;varying float furHeight;
`+z.fragmentShader,z.fragmentShader=z.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
   float beard=step(5.5,furRegion)*(1.-step(6.5,furRegion))*(1.-smoothstep(1.42,1.62,furHeight));float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(grey*1.6),beard*.72);
  `)},m.customProgramCacheKey=()=>"sculpted-chimp-beard-v1";let Ne=Oe("cloth"),te=Oe("skin");for(let z of[U,F,R,L])z.bumpMap=Ne,z.bumpScale=8e-4;for(let z of[f,y,_])z.bumpMap=te,z.bumpScale=65e-5;function k(z,ee,fe,Se,Y=!0){let ce=z.getAttribute("position"),de=[],be=[];for(let C=0;C<ce.count;C++){let le=ce.getX(C),we=ce.getY(C),ve=ce.getZ(C),ze=typeof fe=="function"?fe(le,we,ve):fe;if(Y){let it=o(le,.5-we/3.825,ve,ze);if(Se==="shirt-body"){let Be=o(le,.5-we/3.825,ve,1),dt=o(le,.5-we/3.825,ve,2),ot=Ya(.45,.6,Math.abs(le));it=Be.map((je,mt)=>je+(dt[mt]-je)*ot)}le=it[0],we=(.5-it[1])*3.825,ve=it[2],ce.setXYZ(C,le,we,ve)}de.push(.5+le/2.55,.5-we/3.825),be.push(ze)}z.setAttribute("bodyUv",new Re(de,2)),z.setAttribute("surface",new Re(be,1)),z.getAttribute("uv")||z.setAttribute("uv",new Re(de,2)),(!z.getAttribute("normal")||Y&&e.body&&e.body!=="bodyNormal")&&z.computeVertexNormals(),i.push(z);let xe=n.mesh(z,ee);return xe.name=Se||"",xe.castShadow=xe.receiveShadow=!0,xe}function Te(z,ee,fe,Se,Y){let ce=new Ht(1,40,28);return ce.scale(...fe),ce.translate(...ee),k(ce,z,Se,Y)}function A(z,ee,fe,Se,Y,ce=!1){return k(new Ct(new wt(z.map(de=>new S(...de)),ce),Math.max(24,z.length*5),ee,8,ce),fe,Se,Y)}function I(z,ee,fe,Se,Y,ce,de,be,xe){let C=[];for(let le=0;le<64;le++){let we=le/64*Math.PI*2;C.push([z+Se*Math.cos(we),ee,fe+Y*Math.sin(we)])}return A(C,ce,de,be,xe,!0)}function X(z,ee,fe,Se,Y,ce,de,be,xe=.023){H([[z,ee+xe,fe,Se+.003,Y+.003],[z,ee+.007,fe,Se+.001,Y+.001],[z,ee,fe,Se,Y]],ce,de,be,{rings:12,sides:64,capTop:!1,capBottom:!1});let C=[],le=[],we=64;for(let ze=0;ze<=we;ze++){let it=ze/we*Math.PI*2;if(C.push(z+Se*Math.cos(it),ee,fe+Y*Math.sin(it),z+(Se-.011)*Math.cos(it),ee+.001,fe+(Y-.011)*Math.sin(it)),ze<we){let Be=ze*2;le.push(Be,Be+2,Be+1,Be+2,Be+3,Be+1)}}let ve=new ht;ve.setAttribute("position",new Re(C,3)),ve.setIndex(le),ve.computeVertexNormals(),k(ve,ce,de,be+"-inside")}function H(z,ee,fe,Se,{sides:Y=64,rings:ce=80,clothFolds:de=0,capTop:be=!0,capBottom:xe=!0,fork:C=!1}={}){let le=[],we=[],ve=[],ze=z[0][1],it=z.at(-1)[1];function Be(je){let mt=0;for(;mt<z.length-2&&z[mt+1][1]>je;)mt++;let gt=z[mt],pt=z[mt+1],xt=Math.max(0,Math.min(1,(gt[1]-je)/(gt[1]-pt[1])));return gt.map((kt,Wt)=>{if(Wt===1)return je;let Qt=z[Math.max(0,mt-1)][Wt],un=z[Math.min(z.length-1,mt+2)][Wt];return .5*(2*kt+(-Qt+pt[Wt])*xt+(2*Qt-5*kt+4*pt[Wt]-un)*xt*xt+(-Qt+3*kt-3*pt[Wt]+un)*xt*xt*xt)})}for(let je=0;je<=ce;je++){let mt=ze+(it-ze)*je/ce,[gt,,pt,xt,kt]=Be(mt);for(let Wt=0;Wt<=Y;Wt++){let Qt=Wt/Y*Math.PI*2+(C?Math.PI/2:0),un=gt+xt*Math.cos(Qt),Bn=pt+kt*Math.sin(Qt),Ir=mt;if(C){let wn=Wt/Y,Ei=wn<=.5,Pr=Ei?wn*4*Math.PI:Math.PI+(wn-.5)*4*Math.PI,lr=gt+(Ei?-1:1)*xt/2+xt/2*Math.cos(Pr),D=pt+kt*Math.sin(Pr),re=Ya(.02,-.28,mt);un+=(lr-un)*re,Bn+=(D-Bn)*re}if(de){let wn=Math.sin(Math.PI*je/ce)*(.25+.75*Math.exp(-Math.pow((mt-.3)/.24,2))),Ei=Math.sin(mt*26+Qt*3)*Math.sin(Qt*2+.4)*wn;Bn+=de*Ei*Math.sin(Qt),un+=de*Ei*Math.cos(Qt),Ir+=de*.35*Math.sin(Qt*5+mt*10)*wn}if(le.push(un,Ir,Bn),we.push(Wt/Y,je/ce),je<ce&&Wt<Y){let wn=je*(Y+1)+Wt;ve.push(wn,wn+1,wn+Y+1,wn+1,wn+Y+2,wn+Y+1)}}}for(let je of[0,ce]){if(je===0&&!be||je===ce&&!xe)continue;let mt=je*(Y+1),gt=le.length/3,pt=new S;for(let xt=0;xt<Y;xt++)pt.add(new S(...le.slice((mt+xt)*3,(mt+xt)*3+3)));pt.multiplyScalar(1/Y),le.push(pt.x,pt.y,pt.z),we.push(.5,je/ce);for(let xt=0;xt<Y;xt++)ve.push(gt,mt+xt+(je===0?1:0),mt+xt+(je===0?0:1))}let dt=new ht;dt.setAttribute("position",new Re(le,3)),dt.setAttribute("uv",new Re(we,2)),dt.setIndex(ve),dt.computeVertexNormals();let ot=dt.getAttribute("normal");for(let je=0;je<=ce;je++){let mt=je*(Y+1),gt=mt+Y,pt=new S().fromBufferAttribute(ot,mt).add(new S().fromBufferAttribute(ot,gt)).normalize();ot.setXYZ(mt,pt.x,pt.y,pt.z),ot.setXYZ(gt,pt.x,pt.y,pt.z)}return k(dt,ee,fe,Se)}if(d){let z=[],ee=[],fe=Me[0].getAttribute("position"),Se=Me[1].getAttribute("position");for(let Y=0;Y<fe.count;Y++)z.push((Math.atan2(fe.getZ(Y)-.015,fe.getX(Y))+Math.PI)/(2*Math.PI),(fe.getY(Y)-1.17)/.84);for(let Y=0;Y<Se.count;Y++)ee.push((Se.getX(Y)+.26)/.52,(Se.getY(Y)-1.29)/.48);Me[0].setAttribute("uv",new Re(z,2)),Me[1].setAttribute("uv",new Re(ee,2)),k(Me[0],m,6,"sculpt-cranium",!1),k(Me[1],f,6,"sculpt-facial-mask",!1)}else Me[0].dispose(),Me[1].dispose();for(let z=0;z<2;z++)k(Me[z+2],f,3,z?"sculpt-right-hand":"sculpt-left-hand",!1);if(d){for(let ee of[-1,1]){Te(x,[ee*.112,1.64,.277],[.04,.022,.032],6,"eye-socket"),Te(T,[ee*.112,1.641,.311],[.015,.016,.008],6,"amber-iris"),Te(b,[ee*.112,1.642,.32],[.009,.012,.003],6,"pupil"),Te(P,[ee*.104,1.65,.324],[.002,.002,.001],6,"eye-catchlight");let fe=[];for(let Se=0;Se<=36;Se++){let Y=Se/36*Math.PI*2;fe.push([ee*.112+.044*Math.cos(Y),1.64+.025*Math.sin(Y),.281+.017*Math.sin(Y)**2])}A(fe,.0035,f,6,"eyelid",!0),A([[ee*.045,1.688,.273],[ee*.09,1.689,.281],[ee*.14,1.693,.265],[ee*.185,1.68,.238]],.03,m,6,"brow-ridge"),A([[ee*.059,1.597,.31],[ee*.103,1.593,.304],[ee*.151,1.61,.276]],.0016,v,6,"orbital-fold"),Te(b,[ee*.029,1.55,.369],[.012,.007,.004],6,"nostril-cavity"),A([[ee*.075,1.515,.34],[ee*.116,1.49,.34],[ee*.139,1.453,.323]],.0016,v,6,"muzzle-fold")}let z=[[-.15,1.438,.32],[-.086,1.431,.353],[0,1.429,.37],[.086,1.431,.353],[.15,1.438,.32]];A(z,.008,y,6,"upper-lip"),A(z.map(([ee,fe,Se])=>[ee,fe-.012,Se-.003]),.009,y,6,"lower-lip"),A(z.map(([ee,fe,Se])=>[ee,fe-.004,Se+.005]),.0026,v,6,"mouth-opening"),A([[-.076,1.375,.292],[0,1.362,.302],[.076,1.375,.292]],.0017,v,6,"chin-fold");for(let ee of[-1,1]){let fe=[],Se=[],Y=[];for(let le=0;le<=16;le++)for(let we=0;we<=64;we++){let ve=le/16,ze=we/64*Math.PI*2,it=ee*(.295+.082*ve*Math.cos(ze)),Be=1.674+.119*ve*Math.sin(ze),dt=.035+.04*ve*ve+.009*Math.cos(ze)*ve;fe.push(it,Be,dt);let ot=new Ye("#8e6045").lerp(new Ye("#b18361"),ve*ve);if(Se.push(ot.r,ot.g,ot.b),le<16&&we<64){let je=le*65+we;Y.push(je,je+1,je+64+1,je+1,je+64+2,je+64+1)}}let be=new ht;be.setAttribute("position",new Re(fe,3)),be.setAttribute("color",new Re(Se,3)),be.setIndex(Y);let xe=g("#ffffff",.78);xe.vertexColors=!0,xe.side=Bt,k(be,xe,10,"ear-bowl");let C=[];for(let le=0;le<64;le++){let we=le/64*Math.PI*2;C.push([ee*(.295+.082*Math.cos(we)),1.674+.119*Math.sin(we),.075+.009*Math.cos(we)])}A(C,.011,f,10,"ear-helix",!0),A([[ee*.311,1.607,.056],[ee*.332,1.649,.057],[ee*.323,1.697,.057],[ee*.294,1.716,.052]],.007,v,10,"ear-antihelix"),Te(f,[ee*.307,1.562,.047],[.035,.032,.027],10,"ear-lobe")}}H([[0,1.43,0,.12,.13],[0,1.3,0,.15,.145],[0,1.15,0,.18,.155]],m,7,"fur-neck");for(let z of[-1,1]){let ee=h?[[z*.44,1.15,-.015,.11,.13],[z*.51,1.04,-.012,.16,.155]]:c?[[z*.57,.83,-.005,.134,.132]]:[[z*.744,.07,.026,.065,.061]];(h||c)&&ee.push([z*.57,.8,-.005,.134,.132],[z*.64,.59,.01,.116,.122],[z*.675,.43,.025,.139,.132],[z*.714,.22,.035,.116,.105]),ee.push([z*.744,.015,.026,.066,.061]),H(ee,m,2,"fur-arm-"+z);let fe=l?[[z*.285,-.655,-.02,.126,.125],[z*.315,-.74,-.02,.135,.13],[z*.34,-.91,-.008,.119,.112],[z*.37,-1.09,-.01,.127,.106],[z*.395,-1.34,-.015,.087,.081],[z*.41,-1.61,.01,.061,.064]]:[[z*.41,-1.52,.01,.061,.064],[z*.41,-1.61,.01,.061,.064]];H(fe,m,4,"fur-leg-"+z);for(let Se=0;Se<4;Se++){let Y=[-.06,-.02,.022,.06][Se],ce=[.139,.178,.167,.127][Se],de=z*(.755+Y*1.12),be=-.245-ce*.84,xe=new Ht(1,20,14);xe.scale(.01,.018,.0035),xe.translate(de,be,.124),k(xe,B,3,"fingernail"),A([[de-.014,be+.049,.107],[de,be+.051,.111],[de+.014,be+.049,.107]],.0013,v,3,"finger-crease")}A([[z*.71,-.032,.071],[z*.75,-.039,.077],[z*.794,-.032,.068]],.0016,v,3,"wrist-fold")}let w=[],N=Me[4].getAttribute("position");for(let z=0;z<N.count;z++)w.push(Math.abs(N.getX(z))>.49?1:0);Me[4].setAttribute("seamRegion",new Re(w,1));let j=U.clone(),V=new br({depthPacking:Js});s.push(j,V);let pe=z=>{z.vertexShader=`attribute float seamRegion;varying vec2 garmentHemCoords;
`+z.vertexShader,z.vertexShader=z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
garmentHemCoords=vec2(seamRegion,position.y);`),z.fragmentShader=`varying vec2 garmentHemCoords;
`+z.fragmentShader,z.fragmentShader=z.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if((garmentHemCoords.x<.5&&garmentHemCoords.y<.118)||(garmentHemCoords.x>=.5&&garmentHemCoords.y<`+(c?.798:.033).toFixed(3)+"))discard;")};j.onBeforeCompile=pe,V.onBeforeCompile=pe,j.customProgramCacheKey=()=>"sculpt-sewn-hem-"+(c?"tee":h?"tank":"jacket"),V.customProgramCacheKey=()=>"sculpt-sewn-depth-"+(c?"tee":h?"tank":"jacket");let ne=k(Me[4],j,(z,ee)=>Math.abs(z)>.52&&ee>.015?2:1,"shirt-body");ne.customDepthMaterial=V;for(let z of[-1,1])h||X(z*(c?.57:.744),c?.773:.014,c?.01:.026,c?.165:.08,c?.161:.076,F,2,"sewn-sleeve-hem",c?.026:.019);let ie=[];for(let z=0;z<64;z++){let ee=z/64*Math.PI*2;ie.push([.183*Math.cos(ee),1.234-.034*Math.sin(ee)**2,.132*Math.sin(ee)])}A(ie,.012,F,1,"ribbed-collar",!0),X(0,.097,.006,.415,.229,F,1,"sewn-shirt-hem",.021);function Ee(z,ee,fe=!0){let Se=fe?-1/0:1/0;for(let Y of t.children){if(!Y.name.startsWith("pants-")&&Y.name!=="shirt-body")continue;let ce=Y.geometry.getAttribute("position"),de=Y.geometry.index.array;for(let be=0;be<de.length;be+=3){let xe=de[be],C=de[be+1],le=de[be+2],we=ce.getX(xe),ve=ce.getY(xe),ze=ce.getX(C),it=ce.getY(C),Be=ce.getX(le),dt=ce.getY(le),ot=(it-dt)*(we-Be)+(Be-ze)*(ve-dt);if(Math.abs(ot)<1e-10)continue;let je=((it-dt)*(z-Be)+(Be-ze)*(ee-dt))/ot,mt=((dt-ve)*(z-Be)+(we-Be)*(ee-dt))/ot,gt=1-je-mt;if(je<-1e-4||mt<-1e-4||gt<-1e-4)continue;let pt=ce.getZ(xe)*je+ce.getZ(C)*mt+ce.getZ(le)*gt;(fe?pt>Se:pt<Se)&&(Se=pt)}}return Number.isFinite(Se)?Se:fe?.2:-.2}function We(z,ee,fe,Se=!0,Y=.0016){return A(z.map(([ce,de])=>[ce,de,Ee(ce,de,Se)+(Se?.0025:-.0065)]),Y,ee,4,fe)}k(Me[5],R,4,"pants-body");for(let z of[-1,1]){l?X(z*.245,-.676,-.02,.183,.174,R,4,"sewn-shorts-hem",.018):X(z*.41,-1.548,-.02,.102,.092,L,4,"sewn-pants-hem",.02),We([[z*.32,-.035],[z*.36,-.13],[z*.392,-.23]],L,"front-pocket");let ee=[],fe=[],Se=[],Y=12,ce=12;for(let xe=0;xe<=ce;xe++)for(let C=0;C<=Y;C++){let le=C/Y,we=xe/ce,ve=z*.24+(le-.5)*.15,ze=-.055-we*(.155+.022*(1-Math.abs(le-.5)*2)),it=Ee(ve,ze,!1)-.002-.003*Math.sin(le*Math.PI)*Math.sin(we*Math.PI);if(ee.push(ve,ze,it),fe.push(le,we),C<Y&&xe<ce){let Be=xe*(Y+1)+C;Se.push(Be,Be+1,Be+Y+1,Be+1,Be+Y+2,Be+Y+1)}}let de=new ht;de.setAttribute("position",new Re(ee,3)),de.setAttribute("uv",new Re(fe,2)),de.setIndex(Se),k(de,R,4,"rear-pocket-patch",!1);let be=[[-.068,0],[.068,0],[.068,-.142],[0,-.163],[-.068,-.142],[-.068,0]].map(([xe,C])=>[z*.24+xe,-.061+C]);We(be,L,"rear-pocket-stitch",!1,.0012)}if(We([[0,.08],[0,-.06],[.019,-.19]],L,"fly-stitch"),!c&&!h&&!/Knit|Puffer|Hoodie/i.test(e.suit)){let z=g("#171b1d",.92),ee=g("#303432",.84),fe=[],Se=[],Y=[],ce=8,de=36;for(let xe=0;xe<=de;xe++)for(let C=0;C<=ce;C++){let le=.2+xe/de*.96,we=(C/ce-.5)*(.15+.055*xe/de);if(fe.push(we,le,Ee(we,le,!0)+.002),Se.push(C/ce,xe/de),C<ce&&xe<de){let ve=xe*(ce+1)+C;Y.push(ve,ve+1,ve+ce+1,ve+1,ve+ce+2,ve+ce+1)}}let be=new ht;be.setAttribute("position",new Re(fe,3)),be.setAttribute("uv",new Re(Se,2)),be.setIndex(Y),k(be,z,1,"jacket-inner-shirt",!1);for(let xe of[-1,1]){let C=[[xe*.092,1.16],[xe*.11,.95],[xe*.105,.6],[xe*.075,.2]].map(([we,ve])=>[we,ve,Ee(we,ve,!0)+.005]);A(C,.004,F,1,"jacket-front-edge");let le=[[xe*.27,.59],[xe*.35,.44]].map(([we,ve])=>[we,ve,Ee(we,ve,!0)+.003]);A(le,.003,F,1,"jacket-pocket-welt")}if(/Blazer|Dinner|Biker/i.test(e.suit)){for(let xe of[-1,1]){let C=[[xe*.1,1.19],[xe*.2,1.02],[xe*.105,.77],[xe*.067,1.02]],le=C.flatMap(([ve,ze])=>[ve,ze,Ee(ve,ze,!0)+.012]),we=new ht;we.setAttribute("position",new Re(le,3)),we.setIndex([0,1,2,0,2,3]),we.computeVertexNormals(),k(we,U,1,"folded-lapel",!1),A(C.map(([ve,ze])=>[ve,ze,Ee(ve,ze,!0)+.014]),.0014,F,1,"lapel-stitch")}for(let xe of[.48,.31]){let C=new Qe(.009,.009,.006,20);C.rotateX(Math.PI/2),C.translate(.1,xe,Ee(.1,xe,!0)+.008),k(C,Z,1,"jacket-button",!1)}}else{if(["classic","ruby","midnight"].includes(e.suit))for(let xe of[-1,1])A([[xe*.53,1.04,.16],[xe*.6,.8,.15],[xe*.65,.56,.14],[xe*.7,.28,.12]],.008,$,2,"racing-sleeve-piping");for(let xe=.25;xe<1.15;xe+=.026){let C=new nt(.008,.008,.004);C.translate(.08,xe,Ee(.08,xe,!0)+.007),k(C,Z,1,"zipper-tooth",!1)}if(["classic","ruby","midnight"].includes(e.suit))for(let xe=0;xe<3;xe++)for(let C=0;C<4;C++){let le=-.32+C*.033,we=.92+xe*.033,ve=new Zt(.032,.032);ve.translate(le,we,Ee(le,we,!0)+.004),k(ve,(xe+C)%2?z:$,1,"club-checker-patch",!1)}}}if(/Hoodie/i.test(e.suit)){let z=new Ht(1,48,32,0,Math.PI*2,0,Math.PI*.68);z.scale(.24,.24,.16),z.rotateX(Math.PI/2),z.translate(0,1.08,-.2);let ee=U.clone();ee.side=Bt,s.push(ee),k(z,ee,1,"folded-hood");for(let fe of[-1,1])A([[fe*.1,1.17,.16],[fe*.09,1.04,.23],[fe*.11,.88,.235]],.0035,$,1,"hood-drawstring")}if(/Puffer/i.test(e.suit))for(let z=.26;z<1.17;z+=.14){let ee=[];for(let Se=0;Se<=24;Se++){let Y=-.37+Se*.74/24;ee.push([Y,z,Ee(Y,z,!0)+.004])}let fe=new Ct(new wt(ee.map(Se=>new S(...Se))),32,.004,6,!1);k(fe,F,1,"quilted-puffer-seam",!1)}if(e.necklace&&e.necklace!=="none"){let z=g(r.item("necklace",e.necklace).color,.26,.88),ee=new wt([[-.16,1.24,.04],[-.16,1.14,.2],[-.13,.93,.26],[0,.82,.275],[.13,.93,.26],[.16,1.14,.2],[.16,1.24,.04],[0,1.25,-.145]].map(de=>new S(...de)),!0),fe=[],Se=[],Y=[];for(let de=0;de<56;de++){let be=de/56,xe=ee.getPointAt(be),C=ee.getTangentAt(be).normalize(),le=new S(xe.x,0,xe.z).normalize(),we=new S().crossVectors(le,C).normalize();le.crossVectors(C,we).normalize();let ve=new st().makeBasis(C,we,le),ze=new Rn().setFromRotationMatrix(ve);de%2&&ze.multiply(new Rn().setFromAxisAngle(new S(1,0,0),Math.PI/2));let it=/Beads|pearl/.test(e.necklace),Be=it?new Ht(.01,12,8):new Gt(.0105,.003,6,12);it||Be.scale(1.2,.8,1),Be.applyQuaternion(ze),Be.translate(xe.x,xe.y,xe.z);let dt=Be.getAttribute("position"),ot=Be.getAttribute("normal"),je=fe.length/3;fe.push(...dt.array),Se.push(...ot.array),Y.push(...Array.from(Be.index.array,mt=>mt+je)),Be.dispose()}let ce=new ht;if(ce.setAttribute("position",new Re(fe,3)),ce.setAttribute("normal",new Re(Se,3)),ce.setIndex(Y),k(ce,z,1,"interlocked-necklace-links"),!["silverChain","goldChain","blackBeads","pearl"].includes(e.necklace)){let de=e.necklace,be=new jt,xe=de==="nicknameBling",C=xe?.11:.045,le=xe?.032:.055;de==="spadeDiamond"?(be.moveTo(0,le),be.bezierCurveTo(-.016,.028,-.069,0,-.041,-.026),be.quadraticCurveTo(-.016,-.04,0,-.018),be.quadraticCurveTo(.016,-.04,.041,-.026),be.bezierCurveTo(.069,0,.016,.028,0,le),be.lineTo(.016,-le),be.lineTo(-.016,-le),be.closePath()):de==="crownPendant"?(be.moveTo(-C,-le),be.lineTo(C,-le),be.lineTo(C,le*.55),be.lineTo(C*.48,0),be.lineTo(0,le),be.lineTo(-C*.48,0),be.lineTo(-C,le*.55),be.closePath()):(be.moveTo(-C,-le),be.lineTo(C,-le),be.lineTo(C,le),be.lineTo(-C,le),be.closePath());let we=new Vt(be,{depth:.008,bevelEnabled:!0,bevelSize:.003,bevelThickness:.002,bevelSegments:3});if(we.translate(0,.755,.279),k(we,z,1,"necklace-pendant:"+de),["silverTag","acesPendant","poker21Pendant","nicknameBling"].includes(de)){let ve=document.createElement("canvas");ve.width=512,ve.height=192;let ze=ve.getContext("2d");ze.clearRect(0,0,512,192),ze.fillStyle="#f7e7b5",ze.font="bold 100px Arial",ze.textAlign="center",ze.textBaseline="middle",ze.fillText(de==="nicknameBling"?e.patchText||"POKER21":de==="acesPendant"?"A\u2660 A\u2665":de==="silverTag"?"\u2660":"P21",256,100,480);let it=new Xt(ve);it.colorSpace=yt,a.push(it);let Be=new Rt({map:it,transparent:!0,alphaTest:.1,roughness:.32,metalness:.3});s.push(Be);let dt=new Zt(C*1.85,le*1.7);dt.translate(0,.755,.291),k(dt,Be,1,"pendant-engraving:"+de)}}}if(oe&&!l){let de=function(be,xe,C){let le=C>0?-1/0:1/0;for(let we=0;we<ce.length;we+=3){let ve=ce[we],ze=ce[we+1],it=ce[we+2],Be=Y.getY(ve),dt=Y.getZ(ve),ot=Y.getY(ze),je=Y.getZ(ze),mt=Y.getY(it),gt=Y.getZ(it),pt=(je-gt)*(Be-mt)+(mt-ot)*(dt-gt);if(Math.abs(pt)<1e-10)continue;let xt=((je-gt)*(be-mt)+(mt-ot)*(xe-gt))/pt,kt=((gt-dt)*(be-mt)+(Be-mt)*(xe-gt))/pt,Wt=1-xt-kt;if(xt<-1e-4||kt<-1e-4||Wt<-1e-4)continue;let Qt=Y.getX(ve)*xt+Y.getX(ze)*kt+Y.getX(it)*Wt;(C>0?Qt>le:Qt<le)&&(le=Qt)}return Number.isFinite(le)?le:C*.42},z=g("#ffffff",.93);z.vertexColors=!0;let ee=new Ye(r.item("pants",e.pants).color),fe=new Ye("#e5e1d7"),Se=t.children.find(be=>be.name==="pants-body"),Y=Se.geometry.getAttribute("position"),ce=Se.geometry.index.array;for(let be of[-1,1]){let xe=[],C=[],le=[];for(let it=0;it<=64;it++)for(let Be=0;Be<=6;Be++){let dt=Be/6*2-1,ot=.05-it/64*1.58,je=-.02+dt*.041,mt=de(ot,je,be)+be*.0025,gt=Math.abs(dt)<.5?ee:fe;if(xe.push(mt,ot,je),C.push(gt.r,gt.g,gt.b),it<64&&Be<6){let pt=it*7+Be;le.push(pt,pt+1,pt+6+1,pt+1,pt+6+2,pt+6+1)}}let ze=new ht;ze.setAttribute("position",new Re(xe,3)),ze.setAttribute("color",new Re(C,3)),ze.setIndex(le),ze.computeVertexNormals(),z.side=Bt,k(ze,z,4,"club-pants-side-stripe",!1)}}if(/Cargo/i.test(e.pants))for(let z of[-1,1]){let ee=z*.3,fe=-.43,Se=Ee(ee,fe,!0)+.023,Y=new nt(.15,.19,.035);Y.translate(ee,fe,Se),k(Y,R,4,"cargo-thigh-pocket",!1);let ce=new nt(.17,.045,.015);ce.translate(ee,fe+.08,Se+.024),k(ce,L,4,"cargo-pocket-flap",!1)}if(e.patch&&e.patch!=="none"){let z=new Xt(r.patchCanvas(e));z.colorSpace=yt,a.push(z);let ee=new Rt({map:z,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(ee);let fe=[],Se=[],Y=[],ce=12,de=6;for(let xe=0;xe<=de;xe++)for(let C=0;C<=ce;C++){let le=-.285+C/ce*.235,we=.91-xe/de*.088;if(fe.push(le,we,Ee(le,we,!0)+.004),Se.push(C/ce,1-xe/de),C<ce&&xe<de){let ve=xe*(ce+1)+C;Y.push(ve,ve+ce+1,ve+1,ve+1,ve+ce+1,ve+ce+2)}}let be=new ht;be.setAttribute("position",new Re(fe,3)),be.setAttribute("uv",new Re(Se,2)),be.setIndex(Y),be.computeVertexNormals(),k(be,ee,1,"sewn-word-patch",!1)}for(let z of[-1,1]){let de=function(C,le,we){let ve=[],ze=[],it=[];for(let ot=0;ot<C.length;ot++){let[je,mt,gt,pt]=C[ot];for(let xt=0;xt<=48;xt++){let kt=xt/48*Math.PI*2;if(ve.push(Y+mt*Math.cos(kt),we==="leather-sneaker"?gt+(pt-gt)*Math.max(0,Math.sin(kt)):(gt+pt)/2+(pt-gt)/2*Math.sin(kt),je),ze.push(xt/48,ot/(C.length-1)),ot<C.length-1&&xt<48){let Wt=ot*49+xt;it.push(Wt,Wt+1,Wt+48+1,Wt+1,Wt+48+2,Wt+48+1)}}}for(let ot of[0,C.length-1]){let[je,,mt,gt]=C[ot],pt=ot*49,xt=ve.length/3;ve.push(Y,(mt+gt)/2,je),ze.push(.5,ot/(C.length-1));for(let kt=0;kt<48;kt++)it.push(xt,pt+(ot===0?kt+1:kt),pt+(ot===0?kt:kt+1))}let dt=new ht;return dt.setAttribute("position",new Re(ve,3)),dt.setAttribute("uv",new Re(ze,2)),dt.setIndex(it),dt.computeVertexNormals(),k(dt,le,5,we,!1)},be=function(C,le=0){let we=0;for(;we<ce.length-2&&ce[we+1][0]<C;)we++;let ve=ce[we],ze=ce[we+1],it=Math.max(0,Math.min(1,(C-ve[0])/(ze[0]-ve[0]))),Be=ve[1]+(ze[1]-ve[1])*it,dt=ve[2]+(ze[2]-ve[2])*it,ot=ve[3]+(ze[3]-ve[3])*it;return dt+(ot-dt)*Math.sqrt(Math.max(0,1-(le/Be)**2))},ee=/Chelsea|combat|desert|hiking|canvasHigh/i.test(e.shoes),fe=/Oxford|Loafer|Brogue/i.test(e.shoes),Se=/Chelsea|Loafer/i.test(e.shoes),Y=z*.41,ce=[[-.115,.06,-1.8,-1.61],[-.09,.112,-1.815,-1.54],[-.035,.132,-1.815,-1.53],[.04,.138,-1.815,-1.56],[.115,.145,-1.815,-1.615],[.2,.152,-1.815,-1.665],[.28,.156,-1.815,-1.686],[.36,.149,-1.815,-1.699],[.415,.115,-1.81,-1.72],[.443,.058,-1.8,-1.755],[.448,.004,-1.785,-1.78]];if(ee)for(let C of ce)C[0]<.06&&(C[3]+=.19*(1-Math.max(0,C[0])/.12));fe&&($.color.set("#302923"),ae.color.set("#1b1918")),de(ce,q,"leather-sneaker"),de([[-.124,.065,-1.848,-1.805],[-.1,.124,-1.853,-1.798],[-.02,.145,-1.855,-1.798],[.16,.158,-1.855,-1.798],[.32,.164,-1.855,-1.798],[.4,.137,-1.85,-1.798],[.445,.078,-1.835,-1.805],[.459,.004,-1.822,-1.817]],$,"rubber-midsole"),de([[-.122,.065,-1.865,-1.845],[-.09,.124,-1.87,-1.846],[.02,.145,-1.87,-1.846],[.2,.156,-1.87,-1.846],[.34,.158,-1.867,-1.846],[.42,.125,-1.856,-1.841],[.453,.055,-1.837,-1.824],[.458,.003,-1.826,-1.821]],ae,"outsole");for(let C of[-1,1]){A([[Y+C*.098,-1.558,-.045],[Y+C*.135,-1.63,.08],[Y+C*.154,-1.735,.275],[Y+C*.125,-1.765,.392]],.003,W,5,"quarter-panel-seam"),A([[Y+C*.093,-1.579,-.04],[Y+C*.131,-1.65,.1],[Y+C*.148,-1.752,.275]],.0013,$,5,"quarter-stitch");for(let le=0;le<(Se?0:6);le++){let we=.06+le*.042,ve=be(we,.06)+.002,ze=new Gt(.0055,.0018,6,12);ze.rotateX(-.95),ze.translate(Y+C*.06,ve,we),k(ze,W,5,"lace-eyelet",!1)}}for(let C=0;C<(Se?0:6);C++){let le=.062+C*.042;A([[Y-.06,be(le,.06)+.004,le],[Y,be(le+.009)+.005,le+.009],[Y+.06,be(le,.06)+.004,le]],.0032,$,5,"woven-lace"),A([[Y+.06,be(le+.004,.06)+.005,le+.004],[Y,be(le+.012)+.006,le+.012],[Y-.06,be(le+.004,.06)+.005,le+.004]],.0032,$,5,"woven-lace-cross")}Se&&A([[Y-.1,be(.14,.1)+.006,.14],[Y,be(.14)+.009,.14],[Y+.1,be(.14,.1)+.006,.14]],.008,W,5,"slip-on-vamp-band"),A([[Y-.108,-1.777,.29],[Y-.12,-1.762,.36],[Y,-1.749,.421],[Y+.12,-1.762,.36],[Y+.108,-1.777,.29]],.0018,$,5,"toe-stitch");let xe=new nt(.065,.1,.018);xe.translate(Y,-1.6,-.107),k(xe,W,5,"heel-pull-tab",!1);for(let C=0;C<12;C++)for(let le of[-1,1])A([[Y+le*.15,-1.827,.02+C*.027],[Y+le*.15,-1.842,.02+C*.027]],.0013,ae,5,"sole-groove")}function Ie(z,ee,fe,Se,Y=.024){let ce=z.geometry.getAttribute("position"),de=z.geometry.getAttribute("normal"),be=[],xe=[],C=[];for(let ve=0;ve<ee;ve++){let ze=Math.floor(cs(ve+fe*521)*ce.count),it=new S().fromBufferAttribute(ce,ze),Be=new S().fromBufferAttribute(de,ze);if(Se&&!Se(it,Be))continue;let dt=new S(.08*Math.sin(ve*2.1),-1,.1*Math.cos(ve*1.3));dt.addScaledVector(Be,-dt.dot(Be)).normalize();let ot=new S().crossVectors(Be,dt).normalize(),je=Y*(.65+cs(ve*2.7)*.75),mt=35e-5+cs(ve*3.1)*4e-4,gt=be.length/3,pt=it.y<1.53&&fe===6?cs(ve*2.2)>.5:!1,xt=new Ye(pt?"#5d554b":"#362b23").multiplyScalar(.75+cs(ve*8.7)*.35);for(let kt=0;kt<4;kt++){let Wt=kt/3,Qt=it.clone().addScaledVector(Be,.001+je*.3*Math.sin(Wt*Math.PI/2)).addScaledVector(dt,je*Wt);for(let un of[-1,1]){let Bn=Qt.clone().addScaledVector(ot,un*mt*(1-Wt*.92));be.push(Bn.x,Bn.y,Bn.z),xe.push(xt.r,xt.g,xt.b)}if(kt<3){let un=gt+kt*2;C.push(un,un+1,un+2,un+1,un+3,un+2)}}}if(!be.length)return;let le=new ht;le.setAttribute("position",new Re(be,3)),le.setAttribute("color",new Re(xe,3)),le.setIndex(C),le.computeVertexNormals();let we=k(le,De,fe,"individual-fur-strands",!1);we.castShadow=!1}if(d){let z=t.children.find(ee=>ee.name==="sculpt-cranium");Ie(z,3800,6,(ee,fe)=>!(ee.z>.12&&ee.y>1.33&&ee.y<1.78&&Math.abs(ee.x)<.235)&&(!e.hair||e.hair==="hairNatural"||ee.y<1.76),.027)}if(d)for(let z of t.children.filter(ee=>ee.name==="brow-ridge"))Ie(z,300,6,null,.01);let Je=t.children.filter(z=>z.name.startsWith("fur-arm-")||z.name.startsWith("fur-leg-"));for(let z of Je){let ee=z.name.startsWith("fur-arm");Ie(z,1800,ee?2:4,fe=>ee?fe.y<(h?1.1:c?.8:.015):l&&fe.y<-.68,.021)}if(c||h){let z={...e,hair:"hairNatural",glasses:"none",watch:"none",ring:"none",necklace:"none",body:"bodyNormal",helmet:"none",hat:"none",patch:"none"};await r.loadWardrobe(z);let ee=new Image;ee.src="./assets/player-hall/standing-monkey-v1.webp",await ee.decode();let fe=r.renderCharacter(ee,z),Se=document.createElement("canvas");Se.width=1024,Se.height=1536;let Y=Se.getContext("2d",{willReadFrequently:!0});Y.drawImage(fe,0,1536-fe.height);let ce=Y.getImageData(0,0,1024,1536);for(let Be=0;Be<1536;Be++)for(let dt=0;dt<1024;dt++){let ot=(Be*1024+dt)*4,je=ce.data[ot]/255,mt=ce.data[ot+1]/255,gt=ce.data[ot+2]/255,pt=(je+mt+gt)/3,xt=Math.max(Ya(.23,.5,pt),Ya(.15,.3,je)*Ya(.02,.12,je-mt));ce.data[ot+3]*=dt>340&&dt<684&&Be>315&&Be<663?xt:0}Y.putImageData(ce,0,0);let de=new Xt(Se);de.colorSpace=yt,de.anisotropy=4,a.push(de);let be=new Rt({map:de,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:.96,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(be);let xe=t.children.find(Be=>Be.name==="shirt-body"),C=xe.geometry.clone(),le=C.getAttribute("position"),we=C.getAttribute("normal"),ve=[],ze=[];for(let Be=0;Be<le.count;Be++)ve.push(.5+le.getX(Be)/2.55,.5+le.getY(Be)/3.825),le.setXYZ(Be,le.getX(Be)+we.getX(Be)*.001,le.getY(Be)+we.getY(Be)*.001,le.getZ(Be)+we.getZ(Be)*.001);let it=C.index.array;for(let Be=0;Be<it.length;Be+=3)it.slice(Be,Be+3).every(dt=>le.getZ(dt)>.03)&&ze.push(...it.slice(Be,Be+3));C.setAttribute("uv",new Re(ve,2)),C.setIndex(ze),k(C,be,1,"screen-printed-shirt",!1)}if(u){for(let xe of[...t.children])xe.name.startsWith("ear-")&&xe.removeFromParent();let z=g(r.item("helmet",e.helmet).color,.25,.45,!0);z.clearcoat=.7,z.clearcoatRoughness=.16;let ee=g("#152731",.1,.55,!0);ee.clearcoat=1,ee.transparent=!0,ee.opacity=.91,ee.side=Bt,k(Me[6],z,6,"helmet-shell",!1),A([[-.28,1.43,.16],[-.2,1.39,.3],[0,1.36,.36],[.2,1.39,.3],[.28,1.43,.16]],.03,z,6,"helmet-chin-bar");let fe=[],Se=[],Y=[],ce=48,de=20;for(let xe=0;xe<=de;xe++)for(let C=0;C<=ce;C++){let le=(C/ce-.5)*1.9,we=(xe/de-.5)*2.4,ve=new S(.35*Math.sin(le),1.665+.26*Math.sin(we),.2+.19*Math.cos(le)*Math.cos(we));if(e.visor==="open"&&ve.sub(new S(0,1.84,.13)).applyAxisAngle(new S(1,0,0),-1.1).add(new S(0,1.84,.13)),fe.push(ve.x,ve.y,ve.z),Se.push(C/ce,xe/de),C<ce&&xe<de){let ze=xe*(ce+1)+C;Y.push(ze,ze+1,ze+ce+1,ze+1,ze+ce+2,ze+ce+1)}}let be=new ht;be.setAttribute("position",new Re(fe,3)),be.setAttribute("uv",new Re(Se,2)),be.setIndex(Y),be.computeVertexNormals(),k(be,ee,6,"hinged-helmet-visor",!1);for(let xe of[-1,1]){let C=new Qe(.027,.027,.012,32);C.rotateZ(Math.PI/2),C.translate(xe*.327,1.73,.035),k(C,Z,6,"visor-hinge",!1);for(let le=0;le<4;le++)Te(_,[xe*.322,1.48+le*.022,-.02],[.007,.006,.036],6,"helmet-vent")}A([[0,1.9,-.2],[0,2.007,-.05],[0,1.995,.15],[0,1.91,.245]],.015,Z,6,"helmet-racing-stripe")}let ut=$p(n,e,r),ft=tf(n,{...e,sculptHairOffset:.025,sculptHairDepth:-.075,sculptHairTexture:Ge}),It=nf(n,{...e,helmet:d?"none":e.helmet,sculptEyewearDepth:-.025},r),St=e.watch&&e.watch!=="none"?rf(e.watch,r.item("watch",e.watch).color):null;St&&(t.add(St.group),n.attach(St.group,"rightWrist"));let _t=e.ring&&e.ring!=="none"?sf(r.item("ring",e.ring).color,e.ring):null;return _t&&(t.add(_t.group),n.attach(_t.group,"rightHand")),n.setRelaxedPose(!0),{root:t,rig:n,geometries:i,materials:s,textures:a,dispose(){ut.dispose(),ft.dispose(),It.dispose(),St?.dispose(),_t?.dispose(),i.forEach(z=>z.dispose()),s.forEach(z=>z.dispose()),a.forEach(z=>z.dispose()),n.dispose()}}}async function of(r,e,t={}){let n=await af(window.PokerGarage,e),{root:i,rig:s}=n,a=new Gn;a.add(i);{a.add(new si("#fff0d4","#283849",2.1));let Z=new Vn("#fff0dc",3.5);Z.position.set(-2,4,5),a.add(Z);let oe=new Vn("#9cc3ed",1.2);oe.position.set(3,1,-2),a.add(oe)}let o=new gi({alpha:!0,antialias:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.outputColorSpace=yt,o.toneMapping=pi,o.toneMappingExposure=1.05;let l=null;if(o.shadowMap){o.shadowMap.enabled=!0,o.shadowMap.type=Ws;let Z=a.children.find(Me=>Me.isDirectionalLight);Z.castShadow=!0,Z.shadow.mapSize.set(1024,1024),Z.shadow.normalBias=.012,Z.shadow.bias=-15e-5,Z.shadow.camera.left=-2,Z.shadow.camera.right=2,Z.shadow.camera.top=2.2,Z.shadow.camera.bottom=-2.2;let oe=new at(new Zt(8,8),new Zr({opacity:.2}));oe.rotation.x=-Math.PI/2,oe.position.y=-1.875,oe.receiveShadow=!0,a.add(oe),n.geometries.push(oe.geometry),n.materials.push(oe.material);let De=new Gn;De.background=new Ye("#333842");for(let[Me,Ge,Ce,Ne,te,k]of[[0,4,0,5,.1,3],[-3,2,2,.1,3,2],[3,1,-2,.1,2,3]]){let Te=new at(new nt(Ne,te,k),new yn({color:"#ffffff"}));Te.position.set(Me,Ge,Ce),De.add(Te)}let Oe=new Ar(o);l=Oe.fromScene(De,.05),a.environment=l.texture,a.environmentIntensity=.55,Oe.dispose(),De.traverse(Me=>{Me.geometry?.dispose(),Me.material?.dispose()})}r.append(o.domElement),o.domElement.setAttribute("role","img"),o.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let c=new sn(30,1,.1,30);c.position.set(0,0,9);let h=t.yaw||0,u=t.pitch||0,d=null,p,g=!1,m=!1,f=0,v=window.matchMedia?.("(prefers-reduced-motion: reduce)"),y="full",_=t.focusOrbit||null,x=2.05,T=0,b=0;function P(Z){Z=["watch","ring"].includes(Z)?Z:"full",Z!==y&&(Z!=="full"?(_=_||{yaw:h,pitch:u},t.focusOrbit=_,h=0,u=0):_&&(h=_.yaw,u=_.pitch,_=null,delete t.focusOrbit),t.yaw=h,t.pitch=u,y=Z,r.dataset.focus=y)}function B(Z){let oe=r.clientWidth/Math.max(1,r.clientHeight),De=y!=="full",Oe=y==="ring",Me=De?Math.max(Oe?.25:.4,(Oe?.18:.3)/oe):Math.max(2.4,1.17/oe),Ge=De?.76*Math.cos(h)+.1*Math.sin(h):0,Ce=De?(Oe?-.27:.04)*Math.cos(u)-(.1*Math.cos(h)-.76*Math.sin(h))*Math.sin(u):-.22,Ne=1-Math.exp(-Z*12);x+=(Me-x)*Ne,T+=(Ge-T)*Ne,b+=(Ce-b)*Ne,c.aspect=oe;let te=x/Math.tan(c.fov*Math.PI/360);c.position.set(T,b+x*.16,te),c.lookAt(T,b,0),c.updateProjectionMatrix()}let U=()=>{!r.clientWidth||!r.clientHeight||(B(1),o.setSize(r.clientWidth,r.clientHeight,!1))},F=new ResizeObserver(U);F.observe(r),U();let R=Z=>{m=!1,d={id:Z.pointerId,x:Z.clientX,y:Z.clientY},r.setPointerCapture(Z.pointerId),Z.preventDefault()},L=Z=>{!d||d.id!==Z.pointerId||(h+=(Z.clientX-d.x)*.012,u=Math.max(-.35,Math.min(.35,u+(Z.clientY-d.y)*.006)),d.x=Z.clientX,d.y=Z.clientY)},q=()=>{d=null},W=Z=>{["ArrowLeft","ArrowRight"].includes(Z.key)&&(h+=Z.key==="ArrowLeft"?-.15:.15,Z.preventDefault())};r.addEventListener("pointerdown",R),r.addEventListener("pointermove",L),r.addEventListener("pointerup",q),r.addEventListener("pointercancel",q),r.addEventListener("keydown",W);function $(Z=0){if(g)return;if(!r.isConnected){ae();return}m&&!d&&f&&(h+=Math.min(.05,(Z-f)/1e3)*.35);let oe=!v?.matches&&!d&&y==="full"?1:0,De=f?Math.min(.05,(Z-f)/1e3):.016;s.update(Z/1e3,oe,De),B(De),f=Z,i.rotation.set(u,h,0),t.yaw=h,t.pitch=u,r.dataset.yaw=String(h),o.render(a,c),t.snapshotOnly||(p=requestAnimationFrame($))}return $(),{state:t,setFocus:P,snapshot(){B(1),i.rotation.set(u,h,0),o.render(a,c);let Z=document.createElement("canvas");return Z.width=o.domElement.width,Z.height=o.domElement.height,Z.getContext("2d").drawImage(o.domElement,0,0),Z},setYaw(Z){h=Z,t.snapshotOnly&&(B(1),$())},setAutoRotate(Z){m=!!Z},dispose:ae};function ae(){if(!g){g=!0,cancelAnimationFrame(p),F.disconnect();for(let[Z,oe]of[["pointerdown",R],["pointermove",L],["pointerup",q],["pointercancel",q],["keydown",W]])r.removeEventListener(Z,oe);n.dispose(),l?.dispose(),o.dispose(),o.forceContextLoss(),o.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new Gn,s=new Fe;i.add(s);let a=new gi({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=yt,a.toneMapping=pi,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new sn(34,1,.1,40);i.add(new si("#dcecff","#50402b",2));for(let[k,Te,A,I]of[[3,6,5,4],[-3,3,-3,3]]){let X=new Vn("#fff0dd",I);X.position.set(k,Te,A),i.add(X)}let l=document.createElement("canvas");l.width=l.height=128;let c=l.getContext("2d");c.fillStyle="#999999",c.fillRect(0,0,128,128);for(let k=0;k<128;k+=2)c.fillStyle=k%4?"#808080":"#b0b0b0",c.fillRect(0,k,128,1);for(let k=0;k<128;k+=3)c.fillStyle="#888888",c.fillRect(k,0,1,128);let h=new Xt(l);h.wrapS=h.wrapT=vn,h.repeat.set(8,8);let u=(k,Te=0,A=.7)=>new Rt({color:k,metalness:Te,roughness:A}),d=u("#32251d"),p=u("#96715a"),g=u("#11161b"),m=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),v=u("#a22c3b"),y=u("#171b20"),_=u("#171b20"),x=u("#826222",.9,.18);for(let k of[v,y,g])k.bumpMap=h,k.bumpScale=.012;function T(k,Te,A,I,X,H,w,N=s){let j=new at(new Ht(1,40,28),k);return j.position.set(Te,A,I),j.scale.set(X,H,w),N.add(j),j}function b(k,Te,A,I,X=I){let H=new S(...Te),w=new S(...A),N=w.clone().sub(H),j=new at(I>.1?new Fs((I+X)/2,Math.max(.01,N.length()-(I+X)),10,32):new Qe(X,I,N.length(),16),k);return j.position.copy(H.add(w).multiplyScalar(.5)),j.quaternion.setFromUnitVectors(new S(0,1,0),N.normalize()),s.add(j),j}T(y,0,1.64,0,.47,.36,.26),T(v,0,2.32,0,.59,.65,.32),T(g,0,2.35,.29,.27,.49,.055);for(let k of[-1,1]){b(y,[k*.27,1.67,0],[k*.29,.92,.015],.23,.25),T(y,k*.29,.92,.015,.23,.24,.24),b(y,[k*.29,.94,.015],[k*.32,.28,0],.16,.22),b(m,[k*.45,1.55,.03],[k*.48,.36,.03],.025,.032),T(_,k*.32,.18,.15,.22,.19,.39),T(m,k*.32,.075,.15,.235,.065,.4),T(m,k*.32,.27,.12,.135,.08,.2);for(let Te=0;Te<5;Te++)b(m,[k*.32-.1,.29,.08+Te*.04],[k*.32+.1,.29,.08+Te*.04],.009);T(v,k*.55,2.63,0,.26,.27,.29),b(v,[k*.57,2.63,0],[k*.76,2.12,.02],.19,.23),T(v,k*.76,2.12,.02,.19,.2,.2),b(v,[k*.76,2.12,.02],[k*.88,1.65,.08],.13,.18),b(m,[k*.71,2.6,.15],[k*.99,1.72,.15],.035),T(g,k*.88,1.67,.08,.145,.09,.15),T(d,k*.89,1.48,.1,.16,.22,.12);for(let Te=0;Te<4;Te++)T(p,k*(.79+Te*.065),1.36,.15,.035,.13,.045);T(p,k*.75,1.48,.2,.06,.12,.06)}T(d,0,3.04,0,.25,.27,.24),T(d,0,3.39,0,.36,.43,.31);for(let k of[-1,1])T(p,k*.36,3.4,.01,.12,.17,.09),T(d,k*.36,3.4,.065,.065,.1,.035),T(p,k*.15,3.43,.258,.15,.12,.075),T(g,k*.14,3.44,.32,.045,.035,.02),T(m,k*.13,3.45,.335,.009,.01,.006),T(d,k*.15,3.53,.28,.18,.05,.07);T(p,0,3.23,.27,.26,.18,.13),T(p,0,3.34,.34,.14,.08,.08),T(g,0,3.17,.375,.17,.017,.018),T(p,0,3.13,.36,.17,.035,.025);let P=new Fe;s.add(P),T(g,0,3.51,-.02,.41,.42,.35,P),T(f,0,3.64,.015,.07,.3,.36,P);for(let k of[-1,1])T(g,k*.32,3.29,.015,.1,.31,.24,P),T(f,k*.39,3.43,.07,.025,.05,.05,P);let B=T(x,0,3.44,.27,.38,.19,.14,P);for(let k of[-1,1])b(g,[k*.28,2.88,.25],[k*.1,2.58,.33],.035),b(g,[k*.3,2.28,.3],[k*.39,2.09,.26],.018);for(let k=0;k<6;k++)T(f,0,2.03+k*.14,.35,.015,.015,.01);let U=document.createElement("canvas");U.width=512,U.height=256;let F=U.getContext("2d"),R=new Xt(U);R.colorSpace=yt;let L=new at(new Zt(.28,.12),new Rt({map:R,roughness:.9}));L.position.set(-.27,2.46,.317),s.add(L);let q=new Fe;for(let k=0;k<3;k++)for(let Te=0;Te<5;Te++){let A=new at(new Zt(.048,.048),(Te+k)%2?g:m);A.position.set(-.36+Te*.048,2.62+k*.048,.318),q.add(A)}s.add(q);function W(k){v.color.set(n.item("suit",k.suit).color),y.color.set(n.item("pants",k.pants).color),_.color.set(n.item("shoes",k.shoes).color),P.visible=k.helmet!=="none",B.position.y=k.visor==="open"?3.71:3.44,B.rotation.x=k.visor==="open"?-.8:0,L.visible=k.patch!=="none",F.fillStyle="#22282b",F.fillRect(0,0,512,256),F.strokeStyle="#c9af74",F.lineWidth=12,F.strokeRect(8,8,496,240),F.fillStyle="#eee0b5",F.font="bold 72px Arial",F.textAlign="center",F.fillText(k.patch==="name"?k.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":k.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),R.needsUpdate=!0}W(e),t.yaw??=0,t.pitch??=.07;let $=null,ae,Z=!1;function oe(){let k=r.clientWidth,Te=r.clientHeight;!k||!Te||(a.setSize(k,Te,!1),o.aspect=k/Te,o.updateProjectionMatrix())}let De=new ResizeObserver(oe);De.observe(r),oe();let Oe=k=>{$={id:k.pointerId,x:k.clientX,y:k.clientY},r.setPointerCapture(k.pointerId),k.preventDefault()},Me=k=>{!$||$.id!==k.pointerId||(t.yaw-=(k.clientX-$.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(k.clientY-$.y)*.006)),$.x=k.clientX,$.y=k.clientY)},Ge=()=>{$=null},Ce=k=>{(k.key==="ArrowLeft"||k.key==="ArrowRight")&&(t.yaw+=k.key==="ArrowLeft"?.15:-.15,k.preventDefault())};r.addEventListener("pointerdown",Oe),r.addEventListener("pointermove",Me),r.addEventListener("pointerup",Ge),r.addEventListener("pointercancel",Ge),r.addEventListener("keydown",Ce);function Ne(){if(Z)return;Z=!0,cancelAnimationFrame(ae),De.disconnect();for(let[Te,A]of[["pointerdown",Oe],["pointermove",Me],["pointerup",Ge],["pointercancel",Ge],["keydown",Ce]])r.removeEventListener(Te,A);let k=new Set;i.traverse(Te=>{Te.geometry?.dispose(),Te.material&&k.add(Te.material)});for(let Te of k)Te.dispose();R.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function te(){if(Z)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Ne();return}let k=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*k,1.95+Math.sin(t.pitch)*k,Math.cos(t.yaw)*Math.cos(t.pitch)*k),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ae=requestAnimationFrame(te)}return te(),{update:W,dispose:Ne,state:t}};function fu(r){let e=new Fe;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(U,F,R)=>new Kt({color:U,metalness:F,roughness:R,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),l=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),c=(U,F,R=0,L=0,q=0)=>{let W=new at(U,F);return W.position.set(R,L,q),W.castShadow=W.receiveShadow=!0,e.add(W),W},h=(U,F,R,L=!0)=>{let q=new kn;return q.absarc(F,R,U,0,Math.PI*2,L),q},u=t?.395:.437,d=new jt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let U=0;U<24;U++)for(let[F,R]of[[.28,0],[.36,.045]]){let L=U*Math.PI/12+R;d.holes.push(h(n?.009:.011,Math.cos(L)*F,Math.sin(L)*F))}for(let U of[0,.033])c(new Vt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,U);let p=new nt(.22,.014,.025),g=new Xr(p,a,32),m=new st;for(let U=0;U<32;U++){let F=U*Math.PI/16;m.compose(new S(Math.cos(F)*.31,Math.sin(F)*.31,.021),new Rn().setFromAxisAngle(new S(0,0,1),F+.18),new S(1,1,1)),g.setMatrixAt(U,m)}e.add(g);let f=c(new Qe(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let v=c(new Qe(.095,.11,.055,32),s,0,0,.035);v.rotation.x=Math.PI/2;for(let U=0;U<10;U++){let F=U*Math.PI/5,R=c(new Qe(.017,.017,.015,12),s,Math.cos(F)*.18,Math.sin(F)*.18,.05);R.rotation.x=Math.PI/2;let L=c(new Qe(.009,.009,.018,6),a,Math.cos(F)*.18,Math.sin(F)*.18,.058);L.rotation.x=Math.PI/2}for(let U of[.235,.26,.31,.335,.39,.414])if(U<u){let F=c(new Gt(U,.0012,3,96),a,0,0,.042);F.castShadow=!1}if(!t)for(let U=0;U<8;U++){let F=U*Math.PI/4,R=[.25,.29,.34,.395].map((q,W)=>new S(Math.cos(F+W*.075)*q,Math.sin(F+W*.075)*q,.043)),L=c(new Ct(new wt(R),12,.0024,3,!1),a);L.castShadow=!1}let y=new jt;y.moveTo(-.08,-.2),y.quadraticCurveTo(-.13,-.15,-.115,-.06),y.lineTo(-.115,.1),y.quadraticCurveTo(-.12,.19,-.05,.215),y.lineTo(.055,.19),y.quadraticCurveTo(.11,.14,.105,.06),y.lineTo(.105,-.1),y.quadraticCurveTo(.1,-.19,.04,-.21),y.closePath();let _=c(new Vt(y,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),l,.323,.005,.011);t&&_.scale.set(.8,.8,.8),c(new nt(.09,.31,.032),a,.27,0,.005);for(let U of[-.125,0,.125]){let F=c(new Qe(.055,.055,.028,24),l,.354,U,.07);F.rotation.x=Math.PI/2}for(let U of[-.155,.155]){let F=c(new Qe(.014,.014,.025,6),s,.325,U,.094);F.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let T=x.getContext("2d");T.fillStyle="#f5f0df",T.translate(64,192),T.rotate(-Math.PI/2),T.textAlign="center",T.font="italic bold 60px Arial",T.fillText(t?"P21":"P21 SPORT",0,20);let b=new Xt(x);b.colorSpace=yt;let P=c(new Zt(.075,.24),new yn({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);P.castShadow=!1;let B=c(new Qe(.012,.014,.047,6),s,.36,.217,.042);return B.rotation.z=.2,e}var pu;function lf(r,e){if(!r.isConnected)return;if(!pu){let a=new gi({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=yt,a.toneMapping=pi,a.toneMappingExposure=1.15;let o=new Gn;o.add(new si("#eaf1ff","#342a22",2));for(let[c,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let p=new Vn("#ffffff",d);p.position.set(c,h,u),o.add(p)}let l=new sn(30,1,.1,10);l.position.set(.65,.35,2.1),l.lookAt(.025,0,0),pu={renderer:a,scene:o,camera:l,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=pu;s[e]||(s[e]=fu(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function cf(r){let e=new Fe;e.name="tyre-"+r;let t=new Rt({color:"#15181b",roughness:.86}),n=new Rt({color:"#050708",roughness:.96}),i=new Rt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(c,h)=>{let u=new at(c,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new nr([new _e(.56,-.19),new _e(.63,-.25),new _e(.72,-.23),new _e(.79,-.15),new _e(.8,-.1),new _e(.8,.1),new _e(.79,.15),new _e(.72,.23),new _e(.63,.25),new _e(.56,.19)],96),t);if(a.rotation.x=Math.PI/2,r!=="semi")for(let c of[-1,1]){let h=s(new Gt(.69,.009,8,80),i);h.position.z=c*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,p=s(new nt(.018,.036,.006),i);p.position.set(Math.sin(d)*.71,Math.cos(d)*.71,c*.246),p.rotation.z=-d}}let o=r==="wet",l=r==="semi";if(o||l){let c=o?34:14;for(let h=0;h<c;h++)for(let u of[-1,1]){let d=h*2*Math.PI/c+(u<0?Math.PI/c*.45:0),p=Array.from({length:23},(m,f)=>{let v=f/22,y=u*((l?.035:.012)+v*(l?.175:.198)),_=.8-.045*(Math.abs(y)/.2)**3,x=d+(l?.25:.19)*(1-v)*(1-v);return new S(Math.sin(x)*_,Math.cos(x)*_,y)}),g=s(new Ct(new wt(p),28,o?.008:.009,6,!1),n);g.name="tread-shoulder-groove"}if(o)for(let h of[-.14,-.045,.045,.14]){let u=s(new Gt(.798,.007,8,96),n);u.position.z=h,u.name="tread-water-channel"}}return e}function hf(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new S;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Re(a,1));let l=i.material,c=l.clone();for(let u of["color","emissive"])l[u]&&(c[u]=l[u]);c.onBeforeCompile=n,c.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=c,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])c[u]!==l[u]&&(c[u]=l[u],(u.endsWith("Map")||u==="map")&&(c.needsUpdate=!0))};let h=new br({depthPacking:Js});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function uf(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",l=new Fe;l.name="front-wing-"+r;let c=o?3.56:a?3.32:3.1,h=a?4:2,u=(T,b,P)=>{let B=new at(T,b);return B.name=P,B.castShadow=B.receiveShadow=!0,l.add(B),B};for(let T=0;T<h;T++){let b=[],P=[];for(let R=0;R<=72;R++){let L=R/72*2-1,q=L*c/2,W=(T?a?.36:.46:.76)*(1-.22*L*L),$=(T?2.86+T*.055:3.02)-.13*L*L,ae=.43+T*.095+.1*Math.pow(Math.abs(L),3);for(let Z=0;Z<=28;Z++){let oe=Z/28*Math.PI*2,De=Math.cos(oe);b.push($+De*W/2,ae+.035*(1-De*De)+Math.sin(oe)*(T?.024:.035),q)}if(R<72)for(let Z=0;Z<28;Z++){let oe=R*29+Z,De=oe+28+1;P.push(oe,oe+1,De,oe+1,De+1,De)}}let F=new ht;F.setAttribute("position",new Re(b,3)),F.setIndex(P),F.computeVertexNormals(),u(F,T===0?n:t,"wing-element-"+T)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],p=[0,1,2,3].map(T=>new wt(d.map((b,P)=>new S(b[T],P,0)),!1,"catmullrom",.35)),g=[],m=[],f=96,v=48;for(let T=0;T<=f;T++){let b=T/f,[P,B,U,F]=p.map(R=>R.getPoint(b).x);for(let R=0;R<=v;R++){let L=R/v*Math.PI*2,q=Math.cos(L),W=Math.sin(L),$=a?.7:.82;g.push(P,B+Math.sign(W)*Math.pow(Math.abs(W),$)*F,Math.sign(q)*Math.pow(Math.abs(q),$)*U)}if(T<f)for(let R=0;R<v;R++){let L=T*(v+1)+R,q=L+1;m.push(L,L+v+1,q,q,L+v+1,q+v+1)}}let y=m.length;for(let T of[0,f]){let b=T*(v+1);for(let P=1;P<v-1;P++)T===0?m.push(b,b+P,b+P+1):m.push(b,b+P+1,b+P)}let _=new ht;_.setAttribute("position",new Re(g,3)),_.setIndex(m),_.computeVertexNormals();let x=Math.floor(f*.89)*v*6;_.addGroup(0,x,0),_.addGroup(x,y-x,a?1:0),_.addGroup(y,m.length-y,0),u(_,[t,s],"tapered-nose");for(let T of[-1,1]){let b=u(new nt(.15,.4,.035),n,"nose-pylon");b.position.set(2.94,.69,T*.1),b.rotation.z=-.15;let P=new jt;P.moveTo(2.57,.38),P.lineTo(3.43,.38),P.quadraticCurveTo(3.53,.42,3.43,.61),P.lineTo(3.14,a?.69:.64),P.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),P.closePath();let B=u(new Vt(P,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");B.position.z=T*c/2-.017,u(new nt(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,T*(c/2+.055));let F=new wt([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([R,L])=>new S(R,L,T*(c/2+.025))));if(u(new Ct(F,28,.009,6,!1),s,"endplate-trim"),a)for(let R=0;R<3;R++){let L=u(new nt(.27,.075,.018),n,"flow-fin");L.position.set(2.86+R*.07,.54+R*.045,T*(1.1+R*.1)),L.rotation.z=.15}}for(let T of l.children){let b=T.geometry?.getAttribute("position");if(b){for(let P=0;P<b.count;P++)b.setX(P,b.getX(P)*.78);T.geometry.computeVertexNormals()}T.position.x=.2332+T.position.x*.78}return l}function hs(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new Mn;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new st().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function mu(r,{paint:e,carbon:t,metal:n}){let i=new Fe;i.name="rear-wing-"+r;let s=new Fe;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),l=r==="double"||a,c=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||l?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(v,y,_,x,T,b,P=i){let B=new at(v,y);return B.name=_,B.position.set(x,T,b),B.castShadow=B.receiveShadow=!0,P.add(B),B}function p(v,y,_,x,T){let b=new jt;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let P=new Vt(b,{depth:_,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});P.translate(0,0,-_/2);let B=d(P,T,"rear-wing-blade",v,y,0,s);B.rotation.z=-.08}if(p(0,c,h,u,o||r==="sport"?t:n),l&&p(.025,c+.23,h*.96,u*.7,t),a&&p(-.05,c-.18,h,.3,e),r!=="lip")for(let v of[-1,1])d(new nt(u+.1,l?.42:.24,.035),o?e:t,"rear-wing-endplate",0,c+(l?.11:.05),v*h/2,s);let g=[];for(let v of[-.72,.72]){d(new nt(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,v);for(let x of[-2.36,-2.22])d(new Qe(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,v);let y=d(new nt(1,.075,.085),t,"rearward-mount-arm",0,1.015,v),_=d(new nt(.085,1,.075),t,"rear-wing-upright",0,0,v);g.push({lower:y,post:_,z:v})}let m=hs([s],i).max.x;function f(v){let y=Math.min(-2.85,v&&!v.isEmpty()?v.min.x-.24-m:-2.85);s.position.x=y;for(let{lower:_,post:x}of g)_.position.x=(-2.29+y)/2,_.scale.x=Math.abs(y+2.29),x.position.set(y,(c-.04+1.015)/2,x.position.z),x.scale.y=c-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=y,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function df(r="classic"){let e=new Fe;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new Rt({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new Rt({color:"#161d23",roughness:.83,metalness:.15}),a=new Rt({color:"#0c1116",roughness:.95});function o(l,c,h,u,d,p,g=e){let m=new at(l,c);return m.name=h,m.position.set(u,d,p),m.castShadow=m.receiveShadow=!0,g.add(m),m}o(new nt(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let l of[.67,1.2])for(let c of[-.32,.32])o(new Qe(.016,.016,.012,6),i,"mount-bolt",l,1.058,c);for(let[l,c,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new Qe(.037,.037,h+.06,20),i,l+"-hinge",.72,1.09,c);u.rotation.x=Math.PI/2;let d=new S(.72,1.09,c),p=new S(1.1,1.31,c),g=p.clone().sub(d),m=d.clone().add(p).multiplyScalar(.5);o(new nt(.055,g.length(),.035),i,l+"-lever",...m.toArray()).quaternion.setFromUnitVectors(new S(0,1,0),g.normalize());let v=l==="brake"?.24:.32,y=new jt,_=h/2,x=v/2,T=.025;if(y.moveTo(-_+T,-x),y.lineTo(_-T,-x),y.quadraticCurveTo(_,-x,_,-x+T),y.lineTo(_,x-T),y.quadraticCurveTo(_,x,_-T,x),y.lineTo(-_+T,x),y.quadraticCurveTo(-_,x,-_,x-T),y.lineTo(-_,-x+T),y.quadraticCurveTo(-_,-x,-_+T,-x),n)for(let B of[-.065,0,.065])for(let U of l==="brake"?[-.055,.055]:[0]){let F=new kn;F.absarc(U,B,.014,0,Math.PI*2,!0),y.holes.push(F)}let b=o(new Vt(y,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,l+"-face",1.115,1.32,c);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let B of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new nt(h*.76,.009,.007),n?a:i,l+"-grip",0,B,-.007,b);let P=Array.from({length:65},(B,U)=>{let F=U/64,R=F*Math.PI*12;return new S(.77+F*.23,1.095+F*.15+Math.sin(R)*.018,c+.045+Math.cos(R)*.018)});if(o(new Ct(new wt(P),64,.004,6,!1),i,l+"-return-spring",0,0,0),t){let B=o(new Qe(.025,.025,.25,16),s,l+"-hydraulic-cylinder",.95,1.14,c-.055);B.rotation.z=-1.05}}return e}function vu(r){let e=new Fe;e.name="sport-seat-"+r;let t=(R,L=.8,q=0)=>new Kt({color:R,roughness:L,metalness:q,clearcoat:q?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),l=t("#10151c",.32,.35),c=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),p=document.createElement("canvas");p.width=p.height=64;let g=p.getContext("2d");g.fillStyle="#30343b",g.fillRect(0,0,64,64);for(let R=0;R<64;R+=8)for(let L=0;L<64;L+=8)g.fillStyle=(L+R)%16?"#121820":"#626973",g.fillRect(L,R,7,3),g.fillStyle="#252b33",g.fillRect(L,R+4,3,4);let m=new Xt(p);m.wrapS=m.wrapT=vn,m.repeat.set(3,5),m.colorSpace=yt,l.map=m,l.bumpMap=m,l.bumpScale=.004;let f=(R,L,q=0,W=0,$=0,ae=e)=>{let Z=new at(R,L);return Z.position.set(q,W,$),Z.castShadow=Z.receiveShadow=!0,ae.add(Z),Z},v=(R,L,q,W,$,ae,Z,oe,De=e)=>{let Oe=new jt,Me=-R/2,Ge=-L/2;return W=Math.min(W,R/2,L/2,q/2),Oe.moveTo(Me+W,Ge),Oe.lineTo(Me+R-W,Ge),Oe.quadraticCurveTo(Me+R,Ge,Me+R,Ge+W),Oe.lineTo(Me+R,Ge+L-W),Oe.quadraticCurveTo(Me+R,Ge+L,Me+R-W,Ge+L),Oe.lineTo(Me+W,Ge+L),Oe.quadraticCurveTo(Me,Ge+L,Me,Ge+L-W),Oe.lineTo(Me,Ge+W),Oe.quadraticCurveTo(Me,Ge,Me+W,Ge),f(new Vt(Oe,{depth:q-2*W,bevelEnabled:!0,bevelSize:W,bevelThickness:W,bevelSegments:4,curveSegments:12}),$,ae,Z,oe-q/2+W,De)},y=(R,L,q,W=e)=>f(new Ct(new wt(R.map($=>new S(...$))),32,L,6,!1),q,0,0,0,W),_=new Fe;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let x=new jt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let R of[-.135,.135]){let L=new kn;L.moveTo(R-.075,1.24),L.lineTo(R+.075,1.24),L.lineTo(R+.075,1.34),L.lineTo(R-.075,1.34),L.closePath(),x.holes.push(L)}f(new Vt(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),l,0,0,-.09,_),f(new Vt(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),v(.41,.18,.095,.025,a,0,1.43,.035,_),v(.46,.5,.12,.035,o,0,.85,.065,_),v(.45,.31,.17,.04,o,0,.4,.1,_);for(let R of[-1,1]){let L=v(.17,.42,.19,.055,a,R*.34,.98,.1,_);L.rotation.z=R*.28,L.rotation.y=-R*.25;let q=v(.13,.55,.23,.045,a,R*.3,.49,.14,_);q.rotation.z=-R*.12,y([[R*.27,.18,.28],[R*.34,.52,.28],[R*.4,.93,.24],[R*.3,1.17,.2]],.005,c,_);let W=R*.135;for(let $ of[1.235,1.345])v(.16,.014,.022,.004,h,W,$,.015,_);for(let $ of[W-.08,W+.08])v(.014,.12,.022,.004,h,$,1.29,.015,_)}let b=v(n?.86:.77,.045,.84,.012,l,0,.435,.34);b.name="seat-base";let P=v(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);P.name="seat-cushion",v(.54,.15,.17,.045,a,0,.52,.77);for(let R of[.2,.33,.46,.59])y([[-.23,.625,R],[0,.635,R+.015],[.23,.625,R]],.003,c);if(n){for(let R of[-1,1])v(.14,.13,.64,.04,a,R*.45,.65,.32),v(.045,.23,.1,.01,h,R*.45,.48,.16);for(let R=.45;R<1.1;R+=.15)for(let L of[-.1,.1])y([[L-.1,R,.18],[L,R+.07,.18],[L+.1,R,.18]],.003,c,_)}i&&(v(.47,.1,.22,.035,a,0,.56,.86),y([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,c));for(let R of[-1,1]){let L=v(.16,.26,.74,.055,a,R*(n?.365:.325),.54,.39);L.rotation.z=-R*.12,y([[R*.26,.63,.03],[R*.26,.66,.35],[R*.26,.63,.73]],.005,c),v(.075,.075,.82,.015,h,R*.28,-.015,.34);for(let q of[.02,.65])v(.13,.09,.12,.015,l,R*.28,-.055,q),f(new Qe(.022,.022,.015,12),h,R*.28,-.002,q)}for(let R=.3;R<1.08;R+=.11)y([[-.19,R,.16],[0,R-.015,.17],[.19,R,.16]],.0025,c,_);for(let R of[-1,1]){let L=[[R*.135,1.5,-.13],[R*.135,1.15,-.03],[R*.13,.78,.08],[R*.1,.66,.4]],q=[],W=[];L.forEach(([oe,De,Oe],Me)=>{q.push(oe-.033,De,Oe,oe+.033,De,Oe),Me&&W.push(Me*2-2,Me*2-1,Me*2,Me*2-1,Me*2+1,Me*2)});let $=new ht;$.setAttribute("position",new Re(q,3)),$.setIndex(W),$.computeVertexNormals();let ae=u.clone();ae.side=Bt,f($,ae);let Z=v(.27,.055,.025,.008,u,R*.18,.64,.45);Z.rotation.z=-R*.2}let B=f(new Qe(.065,.065,.035,24),h,0,.66,.48);B.rotation.x=Math.PI/2;let U=f(new Qe(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);U.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let F=new Mn().setFromObject(b).min.y;for(let R of e.children)R.position.y-=F;return e.userData.floorContact=0,e}var gu;function pf(r,e){if(!r.isConnected||e==="none")return;if(!gu){let a=new gi({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=yt,a.toneMapping=pi,a.toneMappingExposure=1.25;let o=new Gn;o.add(new si("#eaf1ff","#3e3028",2));for(let[c,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let p=new Vn("#ffffff",d);p.position.set(c,h,u),o.add(p)}let l=new sn(30,1,.1,20);l.position.set(1.8,1.55,3.6),l.lookAt(0,.78,.12),gu={renderer:a,scene:o,camera:l,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=gu;s[e]||(s[e]=vu(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerPrepareGarageVehicle=r=>window.PokerGarage.adminTransport(r?.transport)?Xp(r.transport):r?.transport==="bicycle"?Vp():["scooter","hoverboard"].includes(r?.transport)?Gp(r.transport):Promise.resolve();window.pokerCreateReferenceCharacter3D=of;window.pokerPaintBrakePreview=lf;window.pokerPaintSeatPreview=pf;var ff=(r,e,t)=>Math.max(e,Math.min(t,r));function j0(r,e,t={}){if(["scooter","hoverboard"].includes(e.transport))return kp(r,e);if(e.transport==="bicycle")return Hp(r,e);if(window.PokerGarage.adminTransport(e.transport))return jp(r,e);let n=window.PokerGarage,i=new Fe;r.add(i),i.scale.set(1.24,.86,.95);let s=(M,E,G)=>new Kt({color:M,metalness:E,roughness:G,clearcoat:E>.3?.65:.12,clearcoatRoughness:.12}),a=s(n.item("paint",e.paint).color,.55,.24),o=s(n.item("paint",e.paint).color,0,.93),l=s("#e5aa28",1,.135),c=s("#171a1e",.04,.76),h=s(n.wheelPaintColor(e),.86,.25),u=s("#0d1417",.35,.3),d=s("#060809",.12,.36),p=s(n.item("light",e.light).color,.45,.2),g=s("#123e47",.86,.22);p.emissive.copy(p.color),p.emissiveIntensity=2;function m(M,E,G=0,Q=0,O=0,he=i){if(t.prepareGeometry){let se=t.prepareGeometry(M);se!==M&&(M.dispose(),M=se)}let K=new at(M,E);return K.position.set(G,Q,O),K.castShadow=!0,K.receiveShadow=!0,he.add(K),K}let f=(M,E,G,Q,O,he,K)=>m(new nt(M,E,G),Q,O,he,K);function v(M,E,G,Q,O,he,K="y"){let se=m(new Qe(M,M,E,64),G,Q,O,he);return K==="z"&&(se.rotation.x=Math.PI/2),K==="x"&&(se.rotation.z=Math.PI/2),se}function y(M,E,G,Q,O,he,K="z"){let se=m(new Gt(M,E,12,80),G,Q,O,he);return K==="y"&&(se.rotation.x=Math.PI/2),K==="x"&&(se.rotation.y=Math.PI/2),se}function _(M,E,G,Q=jt){let O=new Q,he=-M/2,K=-E/2;return G=Math.min(G,E/2-.001),O.moveTo(he+G,K),O.lineTo(he+M-G,K),O.quadraticCurveTo(he+M,K,he+M,K+G),O.lineTo(he+M,K+E-G),O.quadraticCurveTo(he+M,K+E,he+M-G,K+E),O.lineTo(he+G,K+E),O.quadraticCurveTo(he,K+E,he,K+E-G),O.lineTo(he,K+G),O.quadraticCurveTo(he,K,he+G,K),O}function x(M,E,G,Q,O,he,K=null,se=.025){let me=_(M,E,Q);if(K){let vt=_(K[0],K[1],K[2],kn),rt=new kn(vt.getPoints(40).map(J=>new _e(J.x+(K[3]||0),J.y)));me.holes.push(rt)}let lt=m(new Vt(me,{depth:G,bevelEnabled:se>0,bevelSize:se,bevelThickness:se,bevelSegments:4,curveSegments:40}),O,0,he,0);return lt.rotation.x=-Math.PI/2,lt}let T=[],b=i.children.length,P=[3.02,1.51,.65,-.28],B=_(4.96,2.44,1.15).getSpacedPoints(128),U=[],F=[],R=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,E]of R)for(let G=0;G<128;G++){let Q=B[G];U.push(Q.x*E,M,-Q.y*E)}for(let M=0;M<3;M++)for(let E=0;E<128;E++){let G=M*128+E,Q=M*128+(E+1)%128;F.push(G,Q,G+128,Q,Q+128,G+128)}let L=new ht;L.setAttribute("position",new Re(U,3)),L.setIndex(F),L.computeVertexNormals(),a.side=Bt,m(L,a);let q=x(5.03,2.51,.065,1.19,l,.58,null,.035);x(5.1,2.58,.09,1.22,l,1.25,P,.035);let W=new wt(_(4.94,2.42,1.15).getPoints(40).map(M=>new S(M.x,1.44,-M.y)),!0,"centripetal");m(new Ct(W,240,.125,16,!0),d);for(let M of[-1,1]){let E=Array.from({length:21},(G,Q)=>{let O=.26+Q*.25/20;return new S(1.32+1.15*Math.cos(O),1.44,M*(.06+1.15*Math.sin(O)))});m(new Ct(new wt(E),32,.132,20,!1),l)}x(4.65,2.14,.035,1.03,l,1.39,P,.015),x(4.52,2.01,.025,.97,o,1.43,P,.01),T.push(...i.children.slice(b));let $=x(2.98,1.47,.025,.63,o,.94);$.position.x=-.28;let ae=new Kt({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Bt,polygonOffset:!0,polygonOffsetFactor:-1}),Z=new ir(_(2.9,1.4,.6)),oe=Z.attributes.position,De=Z.attributes.uv;for(let M=0;M<oe.count;M++)De.setXY(M,(oe.getX(M)+1.45)/2.9,(oe.getY(M)+.7)/1.4);let Oe=m(Z,ae,-.28,1.005,0);Oe.rotation.x=-Math.PI/2,Oe.castShadow=!1;let Me=ae.clone(),Ge=[];for(let M of[-1,1]){let E=m(new Zt(3.05,.3),Me,0,1.04,M*1.329);M<0&&(E.rotation.y=Math.PI),E.castShadow=!1,Ge.push(E)}function Ce(M){let E=M.vinyl||"none";Oe.visible=E!=="none",Ge.forEach(Q=>Q.visible=E!=="none");let G=E+":"+(M.vinylText||"");if(ae.userData.id!==G){ae.map?.dispose(),Me.map?.dispose(),ae.map=new Xt(n.vinylCanvas(E,!1,M.vinylText)),Me.map=new Xt(n.vinylCanvas(E,!0,M.vinylText));for(let Q of[ae,Me]){Q.map.colorSpace=yt,Q.map.anisotropy=16;let O=Q.map;O.image.addEventListener("vinyl-ready",()=>{O.needsUpdate=!0},{once:!0}),Q.needsUpdate=!0,Q.userData.id=G}}}let Ne=x(3.13,1.62,.018,.7,l,1.46,[3.02,1.51,.65,0],.006);Ne.position.x=-.28;let te=x(3.08,1.57,.46,.68,a,.96,[3.02,1.51,.65,0],.005);te.position.x=-.28;for(let M of[-1,-.35,.35])for(let E of[-.75,.75])f(.011,.4,.009,u,M,1.2,E);function k(M,E){let G=document.createElement("canvas");G.width=G.height=256;let Q=G.getContext("2d");Q.fillStyle=M,Q.fillRect(0,0,256,256);let O=17;for(let K=0;K<18e3;K++)O=O*1664525+1013904223>>>0,Q.fillStyle="rgba(0,0,0,"+E+")",Q.fillRect(O%256,(O>>>8)%256,1,1);let he=new Xt(G);return he.colorSpace=yt,he.wrapS=he.wrapT=vn,he}o.map=k("#e8e8e8",.035),o.bumpMap=k("#888888",.5),o.bumpScale=.0015,o.clearcoat=0,c.bumpMap=k("#888888",.12),c.bumpScale=.003,d.bumpMap=k("#888888",.3),d.bumpScale=.001;function Te(M,E,G,Q,O,he=!1,K=i){let se=new jt;se.moveTo(0,.5),se.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),se.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),se.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),se.bezierCurveTo(.48,.12,.12,.28,0,.5),se.moveTo(-.12,-.3),se.lineTo(0,-.06),se.lineTo(.12,-.3),se.closePath();let me=m(new Vt(se,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),E,G,Q,O,K);return me.scale.setScalar(M),he&&(me.rotation.y=Math.PI),me}let A=[],I=[],X=[],H=null;for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=E*1.36,Q=E*1.57,O=new Fe;O.position.set(M,.81,G),i.add(O),O.userData.groundWheel=!0;let he=i.children.length,K=m(new nr([new _e(.56,-.19),new _e(.61,-.245),new _e(.67,-.25),new _e(.76,-.19),new _e(.8,-.1),new _e(.8,.1),new _e(.76,.19),new _e(.67,.25),new _e(.61,.245),new _e(.56,.19)],80),c,M,.81,G);K.rotation.x=Math.PI/2;for(let J=-2;J<=2;J++)y(.798-Math.abs(J)*.012,.0035,u,M,.81,G+J*.071);for(let J=0;J<28;J++){let ye=J*Math.PI/14,ke=Array.from({length:17},($e,tt)=>{let Dt=tt/16,qt=-.205+Dt*.41,ct=.799-.044*Math.pow(Math.abs(qt)/.205,3),Ke=ye+.13*Math.sin(Dt*Math.PI);return new S(M+Math.sin(Ke)*ct,.81+Math.cos(Ke)*ct,G+qt)});m(new Ct(new wt(ke),20,.0045,5,!1),u)}for(let J of[-1,1])for(let ye of[.625,.654,.681])y(ye,.0035,u,M,.81,G+J*.244);let se=i.children.slice(he);y(.548,.023,h,M,.81,Q+E*.035),y(.505,.016,h,M,.81,Q+E*.043),v(.14,.045,u,M,.81,Q+E*.045,"z"),y(.14,.012,h,M,.81,Q+E*.069);let me=s("#39434a",.78,.28);me.side=Bt;let lt=m(new Qe(.544,.544,.44,64,1,!0),me,M,.81,G);lt.rotation.x=Math.PI/2,y(.548,.025,h,M,.81,G-E*.245),y(.505,.013,h,M,.81,G-E*.253),v(.16,.1,me,M,.81,G-E*.22,"z"),y(.16,.012,h,M,.81,G-E*.275),v(.075,.13,u,M,.81,G-E*.28,"z");for(let J=0;J<5;J++){let ye=J*Math.PI*2/5;v(.018,.024,h,M+Math.sin(ye)*.115,.81+Math.cos(ye)*.115,G-E*.282,"z")}let vt=Te(.2,h,M,.8,Q+E*.075,E<0);I.push(vt);for(let J of n.wheelDesign()){let ye=new wt(J.map(([ke,$e])=>new S(M+ke,.81+$e,Q+E*(.04+.025*(1-Math.hypot(ke,$e)/.51)))));A.push(m(new Ct(ye,20,.007,6,!1),h))}for(let J=0;J<20;J++){let ye=J*Math.PI/10;v(.006,.009,h,M+Math.sin(ye)*.526,.81+Math.cos(ye)*.526,Q+E*.06,"z")}i.updateMatrixWorld(!0);for(let J of i.children.slice(he))O.attach(J);O.scale.set(.88/1.24,.88/.86,1/.95),O.position.y=.715/.86;let rt={standard:se};for(let J of["soft","medium","hard","semi","wet"]){let ye=cf(J);ye.visible=!1,O.add(ye),rt[J]=[ye]}X.push({wheelGroup:O,x:M,out:Q,sign:E,tyres:rt})}let w=[];for(let M of[-1,1])w.push(f(1.35,.43,.04,l,.05,.94,M*1.3));let N=[];for(let M of[-1,1])N.push(v(.275,.27,u,2.16,.945,M*.97,"z"),y(.278,.035,l,2.16,.945,M*1.11));for(let M of[-1.72,1.72]){let E=v(.07,2.8,u,M,.7,0,"z");E.userData.groundWheel=!0}f(3.6,.08,.8,u,0,.57,0);let j=[];function V(M,E,G){let Q=document.createElement("canvas");Q.width=M,Q.height=E,G(Q.getContext("2d"),M,E);let O=new Xt(Q);return O.colorSpace=yt,O.anisotropy=8,j.push(O),O}let pe=V(768,256,(M,E,G)=>{M.fillStyle="#101b18",M.fillRect(0,0,E,G),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,E-20,G-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",E/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",E/2,209)}),ne=[];for(let M of[-1,1]){let E=new Kt({map:pe,metalness:.55,roughness:.2,clearcoat:1});ne.push(E);let G=m(new Zt(1.28,.4),E,.05,.94,M*1.326);E.userData.plane=G,M<0&&(G.rotation.y=Math.PI)}let ie=[];for(let M of[-1,1])for(let E=0;E<3;E++){let G=new Fe;G.position.set((E-1)*.82+.05,1,M*1.39),G.userData.side=M,G.scale.setScalar(1.17),M<0&&(G.rotation.y=Math.PI),i.add(G);let Q=m(new nt(.1,.1,.025),l,0,0,0,G),O=new Rt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),he=m(new Zt(.65,.65,32,8),O,0,0,.047,G);he.castShadow=!1,he.receiveShadow=!1,ie.push({group:G,mat:O,back:Q,n:E})}for(let M of[-1,1])for(let E of[-.54,.64])for(let G of[.78,1.1]){let Q=v(.014,.018,l,E,G,M*1.35,"z")}let Ee=i.children.length;for(let M of[-1.7,-.35,1.48])for(let E of[-1.21,1.21]){let G=v(.128,.13,l,M,1.44,E,"x")}for(let M of[-1.7,-.35,1.48])for(let E of[-1,1])y(.125,.004,u,M+.08,1.44,E*1.21,"x"),y(.125,.004,u,M-.08,1.44,E*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let E of[-.96,.96])v(.135,.08,l,M,1.49,E),v(.108,.082,u,M,1.498,E),y(.125,.015,l,M,1.54,E,"y"),y(.111,.006,l,M,1.535,E,"y");let We=[],Ie=[],Je=["#ab2338","#1b684b","#2455a5"].map(M=>s(M,.08,.55)),ut=s("#eee9d6",.04,.6),ft=i.children.length;for(let[M,E,G,Q]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let O=0;O<Q;O++){v(.104,.033,Je[G],M,1.49+O*.037,E);for(let he=0;he<6;he++){let K=he*Math.PI/3,se=f(.024,.021,.012,ut.clone(),M+Math.cos(K)*.103,1.49+O*.037,E+Math.sin(K)*.103);se.rotation.y=Math.PI/2-K,se.castShadow=!1,se.receiveShadow=!1,se.userData.edgeIndex=he,We.push(se)}if(O===Q-1){let he=new Rt({transparent:!0,alphaTest:.1,roughness:.65}),K=m(new Zt(.208,.208),he,M,1.511+O*.037,E);K.rotation.x=-Math.PI/2,K.castShadow=!1,K.receiveShadow=!1,Ie.push({mat:he,n:G})}}let It=i.children.slice(ft);T.push(...i.children.slice(Ee));let St=new Fe;St.position.set(.47,1.78,0),St.scale.set(.82/1.24,.82/.86,.82/.95),i.add(St);let _t=new Fe;St.add(_t);let z=new S((.47-.96)*1.24,(1.78-1.42)*.86,0).normalize(),ee=new S(0,0,1),fe=new S().crossVectors(z,ee).normalize();_t.quaternion.setFromRotationMatrix(new st().makeBasis(ee,fe,z));let Se=d.clone();m(new Gt(.53,.06,16,80),Se,0,0,0,_t),m(new Gt(.473,.014,10,64),l,0,0,-.02,_t);for(let M of[Math.PI]){let E=m(new nt(.09,.39,.045),l,Math.sin(M)*.26,Math.cos(M)*.26,0,_t);E.rotation.z=-M}for(let M of[-1,1]){let E=m(new nt(.35,.075,.06),l,M*.265,0,0,_t);m(new nt(.32,.035,.064),u,M*.265,0,.006,_t)}let Y=m(new Qe(.195,.195,.075,64),l,0,0,.035,_t);Y.rotation.x=Math.PI/2;let ce=m(new Qn(.177,64),new Rt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,_t);ce.receiveShadow=!1,Te(.38,l,0,-.025,.105,!1,_t);let de={classic:new Fe,sport:new Fe,formula:new Fe};for(let M of _t.children.slice())de.classic.add(M);Object.values(de).forEach(M=>_t.add(M));function be(M,E,G,Q){let O=new wt(E.map(([he,K])=>new S(he,K,0)),!0);m(new Ct(O,72,G,12,!0),Q,0,0,0,M)}be(de.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Se);for(let M of[-1,1])m(new nt(.35,.065,.045),h,M*.27,0,0,de.sport),m(new nt(.065,.3,.045),h,M*.12,-.22,0,de.sport);m(new Gt(.5,.018,8,64,.22),p,0,0,.005,de.sport),be(de.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Se),m(new nt(.6,.23,.065),u,0,0,0,de.formula);for(let M of[-1,1])m(new Ht(.035,12,8),p,M*.25,.055,.06,de.formula),m(new nt(.08,.29,.025),h,M*.37,0,-.07,de.formula);for(let M of["sport","formula"]){let E=m(new Qe(.15,.15,.07,48),h,0,0,.035,de[M]);E.rotation.x=Math.PI/2,m(new Qn(.13,48),u,0,0,.078,de[M]),Te(.25,h,0,-.018,.09,!1,de[M])}for(let[M,E]of Object.entries(n.steeringDesigns)){let G=new Fe;_t.add(G),de[M]=G;let Q=s(M==="woodHeritage"?E.color:"#14191d",M==="woodHeritage"?.35:.04,M==="woodHeritage"?.24:.82),O=s(M==="drift"?"#c5a14f":M==="rallySuede"?"#292e33":"#b8c2c9",.85,.25);if(M==="trackYoke"){et([[-.43,.39,0],[-.51,.12,0],[-.47,-.26,0],[0,-.39,0],[.47,-.26,0],[.51,.12,0],[.43,.39,0]],.065,Q,G);for(let se of[-1,1])m(new Ht(1,24,16),Q,se*.46,.15,.01,G).scale.set(.085,.28,.09),m(new nt(.25,.1,.055),O,se*.23,-.07,.015,G);let K=m(new nt(.45,.28,.085),s("#20282e",.45,.35),0,-.02,.03,G);m(new nt(.2,.085,.012),u,0,.035,.08,G);for(let se of[-1,1])for(let me of[-.08,.05])m(new Ht(.023,12,8),O,se*.15,me,.085,G);continue}E.shape==="round"?m(new Gt(.53,.065,16,80),Q,0,0,0,G):E.shape==="flat"?be(G,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Q):et([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Q,G);for(let K=0;K<E.spokes;K++){let se=K*Math.PI*2/E.spokes,me=m(new nt(.39,.065,.05),O,Math.cos(se)*.25,Math.sin(se)*.25,.015,G);me.rotation.z=se}let he=m(new Qe(.15,.15,.075,40),u,0,0,.05,G);he.rotation.x=Math.PI/2,Te(.23,h,0,-.015,.095,!1,G),(M==="rallySuede"||M==="carbonD")&&m(new nt(.045,.09,.025),s("#ed5555",.1,.6),0,.51,.06,G)}let xe=s("#b9ab8a",.15,.8),C=s("#171c20",.02,.85);for(let[M,E]of Object.entries(de)){if(M==="trackYoke")continue;let G=M==="classic"?.53:M==="sport"?.51:.47;for(let O of[-1,1]){if(M!=="formula"){let he=m(new Gt(G,.072,12,30,.64),C,0,0,.003,E);he.rotation.z=O<0?Math.PI-.32:-.32}for(let he=0;he<9;he++){let K=(O<0?Math.PI:0)-.28+he*.07;m(new Ht(.007,6,4),xe,Math.cos(K)*(G-.045),Math.sin(K)*(G-.045),.063,E)}}let Q=m(new nt(.065,.1,.035),M==="classic"?l:p,0,M==="formula"?.16:.51,.045,E);for(let O=0;O<6;O++){let he=O*Math.PI/3,K=m(new Qe(.012,.012,.012,6),h,Math.cos(he)*.13,Math.sin(he)*.13,.099,E);K.rotation.x=Math.PI/2}}let le=new S(.96,1.32,0),we=new S(.47,1.78,0),ve=we.clone().sub(le),ze=le.clone().add(we).multiplyScalar(.5),it=f(.12,ve.length(),.095,l,...ze.toArray());it.quaternion.setFromUnitVectors(new S(0,1,0),ve.normalize());let Be=Ue(.26,.08,.66,.035,u,.96,1.3,0);for(let M of[-1,1])Ue(.16,.16,.09,.02,u,.96,1.22,M*.26),v(.014,.012,l,.96,1.347,M*.24);Be.name="steering-chassis-mount",f(.075,it.geometry.parameters.height-.04,.1,u,...ze.toArray()).quaternion.copy(it.quaternion);let ot=-1.84,je=1.99,mt=.74,gt=new Fe;gt.name="garage-turbine-primary",gt.position.set(ot,je,0),i.add(gt);let pt=i.children.length;v(mt,.51,l,ot,je,0,"z"),v(.67,.54,u,ot,je,0,"z");for(let M of[-1,1]){let E=M*.29;y(.72,.055,u,ot,je,E),y(.75,.022,l,ot,je,E+M*.03),y(.665,.012,p,ot,je,E+M*.025);for(let G=0;G<14;G++){let Q=G*Math.PI/7,O=[],he=[];for(let me=0;me<=16;me++){let lt=me/16,vt=.22+lt*.44,rt=Q+.55*lt;for(let J of[-.15,.15])O.push(ot+Math.sin(rt+J)*vt,je+Math.cos(rt+J)*vt,E+M*(.018+Math.sin(lt*Math.PI)*.12))}for(let me=0;me<16;me++){let lt=me*2;he.push(lt,lt+1,lt+2,lt+1,lt+3,lt+2)}let K=new ht;K.setAttribute("position",new Re(O,3)),K.setIndex(he),K.computeVertexNormals(),g.side=Bt,m(K,g);let se=new wt(Array.from({length:17},(me,lt)=>{let vt=lt/16,rt=.22+vt*.44,J=Q+.55*vt-.15;return new S(ot+Math.sin(J)*rt,je+Math.cos(J)*rt,E+M*(.025+Math.sin(vt*Math.PI)*.12))}));m(new Ct(se,20,.009,6,!1),p)}v(.215,.07,l,ot,je,E+M*.085,"z"),v(.18,.085,u,ot,je,E+M*.11,"z")}for(let M=0;M<12;M++){let E=M*Math.PI/6,G=f(.045,.15,.2,u,ot+Math.cos(E)*.735,je+Math.sin(E)*.735,0);G.rotation.z=E}i.updateMatrixWorld(!0);for(let M of i.children.slice(pt))gt.attach(M);gt.rotation.set(0,Math.PI/2,0),gt.scale.set(.96/1.24,.96/.86,.96/.95);let xt=gt.clone(!0);xt.name="garage-turbine-secondary",i.add(xt);let kt=new Fe;gt.add(kt);let Wt=s("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])m(new Gt(.765,.028,10,80),Wt,0,0,M,kt);for(let M=0;M<8;M++){let E=M*Math.PI/4,G=m(new Qe(.025,.025,.025,6),Wt,Math.sin(E)*.73,Math.cos(E)*.73,.35,kt);G.rotation.x=Math.PI/2}let Qt={classic:new Fe,dual:new Fe,titanium:new Fe},un=s("#a9b7c4",.92,.23),Bn=s("#668bb5",.88,.25);Object.values(Qt).forEach(M=>i.add(M));for(let[M,E]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let G of E){let Q=M==="titanium"?Bn:un,O=m(new Qe(.105,.105,.5,32),Q,-2.42,.76,G,Qt[M]);O.rotation.z=Math.PI/2;let he=m(new Qe(.079,.079,.012,32),u,-2.678,.76,G,Qt[M]);he.rotation.z=Math.PI/2;let K=m(new Gt(.094,.012,8,32),Q,-2.69,.76,G,Qt[M]);K.rotation.y=Math.PI/2}for(let[M,E]of Object.entries(Qt)){let G=M==="classic"?[0]:[-.67,.67];for(let O of G){let he=m(new Qe(.18,.18,.52,40),un,-2.19,.76,O,E);he.rotation.z=Math.PI/2;for(let K of[-2.36,-2.04]){let se=m(new Gt(.184,.016,8,40),u,K,.76,O,E);se.rotation.y=Math.PI/2,m(new nt(.07,.19,.07),un,K,.94,O,E)}}let Q=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let O of Q){let he=m(new Qe(.077,.077,.11,32,1,!0),s("#151c23",.35,.65),-2.63,.76,O,E);he.rotation.z=Math.PI/2;let K=m(new Gt(.107,.018,10,40),M==="titanium"?Bn:un,-2.57,.76,O,E);if(K.rotation.y=Math.PI/2,M==="titanium")for(let[se,me]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let lt=m(new Gt(.106,.008,6,40),s(me,.85,.3),se,.76,O,E);lt.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let E=new wt([new S(-2.16,1.46,M*.65),new S(-1.94,1.66,M*.69),new S(-1.3,1.59,M*.64),new S(-.98,1.47,M*.7)]);m(new Ct(E,32,.022,8,!1),l),f(.34,.06,.14,l,-1.84,1.48,M*.4)}for(let M of[-1,1]){let E=new wt([new S(-2.45,1.1,M*.7),new S(-2.43,1.36,M*.72),new S(-2.19,1.55,M*.7),new S(-1.9,1.55,M*.68)]);m(new Ct(E,40,.075,14,!1),u),m(new Ct(E,40,.019,10,!1),l);for(let G of[-2.2,-1.96]){let Q=new wt([new S(G,1.43,M*.48),new S(G,1.63,M*.6),new S(G+.24,1.57,M*.82)]);m(new Ct(Q,24,.017,8,!1),l)}}let Ir=i.children.length,wn=[],Ei=[],Pr=[];for(let M=0;M<=48;M++){let E=-.92+M*1.84/48;for(let G of[.64,1.23])Ei.push(2.57-.28*(Math.sin(E)*1.25/1.1)**2,G,Math.sin(E)*1.25)}for(let M=0;M<48;M++){let E=M*2;Pr.push(E,E+2,E+1,E+1,E+2,E+3)}let lr=new ht;lr.setAttribute("position",new Re(Ei,3)),lr.setIndex(Pr),lr.computeVertexNormals();let D=s("#00453f",.72,.14);D.clearcoat=1,D.side=Bt,m(lr,D);for(let M of[.635,1.225]){let E=Array.from({length:65},(G,Q)=>{let O=-1.04+Q*2.08/64;return new S(2.57-.28*(O/1.1)**2,M,O)});m(new Ct(new wt(E),80,.034,12,!1),l)}for(let M of[-1,1]){let E=M*1,G=2.57-.28*(E/1.1)**2,Q=new wt([new S(G-.04,.635,E),new S(G+.05,.78,E),new S(G+.065,1.12,E),new S(G-.04,1.25,E)]);m(new Ct(Q,32,.065,12,!1),l);for(let O of[.91,1.065]){let he=Array.from({length:16},(K,se)=>{let me=M*(.51+se*.41/15);return new S(2.57-.28*(me/1.1)**2+.018,O,me)});wn.push(m(new Ct(new wt(he),24,.017,8,!1),p))}}let re=i.children.length,ge=[];for(let M=0;M<2;M++){let E=new Fe;E.name="hood-playing-card-"+M,E.position.set(1.66+M*.08,1.495+M*.014,M?.23:-.23),E.rotation.set(-Math.PI/2,0,M?-.18:.18),i.add(E);let G=_(.54,.76,.035),Q=new Vt(G,{depth:.004,bevelEnabled:!1,curveSegments:10});Q.translate(0,0,-.004);let O=m(Q,new Rt({color:"#e1d8c4",roughness:.94,metalness:0}),0,0,0,E);O.castShadow=!1,O.receiveShadow=!1;let he=new Xt(n.cardCanvas(e.cards,M));he.colorSpace=yt,he.anisotropy=16;let K=new yn({map:he,transparent:!0,alphaTest:.1,toneMapped:!1,side:Bt,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});K.userData.style=e.cards,ge.push(K);let se=m(new Zt(.54,.76),K,0,0,.0015,E);se.name="printed-card-face-"+M,se.castShadow=!1,se.receiveShadow=!1}let Ae=i.children.slice(re);T.push(...i.children.slice(Ir));let ue=new Rt({map:new Xt(n.plateCanvas(e)),roughness:.6}),Le=[];for(let M of[-1,1]){let E=m(new Zt(.79,.463),ue,M*2.605,1.01,0);E.rotation.y=M*Math.PI/2,Le.push({plate:E,sign:M}),M>0&&T.push(E)}let Ze=[],Pe={},Ve=s("#7d8c98",.82,.28),qe=s("#202a32",.45,.38),Tt=s("#a7c6d5",.98,.055),He=s("#182029",.35,.48);He.bumpMap=k("#888888",.2),He.bumpScale=.001;function Ue(M,E,G,Q,O,he,K,se,me){let lt=new Vt(_(M,E,Q),{depth:G,bevelEnabled:!0,bevelSize:Math.min(.012,G*.2),bevelThickness:Math.min(.012,G*.2),bevelSegments:3,curveSegments:12});return lt.translate(0,0,-G/2),m(lt,O,he,K,se,me)}function et(M,E,G,Q){return m(new Ct(new wt(M.map(O=>new S(...O))),40,E,12,!1),G,0,0,0,Q)}function cn(M,E,G,Q){let O=m(new Qe(.014,.014,.014,6),Ve,M,E,G,Q);O.rotation.x=Math.PI/2}function _n(M,E,G,Q,O,he){let K=new jt;K.moveTo(-Q*.5,0),K.bezierCurveTo(-Q*.52,.055,-Q*.12,.07,Q*.5,.008),K.quadraticCurveTo(Q*.05,-.025,-Q*.5,0);let se=new Vt(K,{depth:G,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});se.translate(0,0,-G/2);let me=m(se,O,M,E,0,he);return me.rotation.z=-.08,me}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Pe[M]={};for(let E of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let G=new Fe;i.add(G),Pe[M][E]=G;let Q=["sport","aero"].includes(E)?He:Ve;if(M==="spoiler"){i.remove(G);let O=mu(E,{paint:a,carbon:He,metal:Ve});i.add(O),Pe.spoiler[E]=O;continue}if(M==="mirrors")for(let O of[-1,1]){let he=new Fe;G.add(he),Ze.push({group:he,sign:O});let K=E==="aero",se=K?1.68:E==="round"?1.96:1.86,me=O*(K?1.47:1.53),lt=.77;Ue(.18,.08,.15,.035,qe,.64,1.46,O*1.19,he),et([[.64,1.47,O*1.19],[.62,1.62,O*1.32],[lt,se-.07,me]],K?.023:.029,Q,he);let vt=m(new Ht(.046,16,12),qe,lt,se-.065,me,he);if(E==="round"){m(new Ht(1,32,20),Ve,lt,se,me,he).scale.set(.065,.15,.15);let J=m(new Qn(.13,48),Tt,lt-.056,se,me,he);J.rotation.y=-Math.PI/2,J.castShadow=!1;let ye=m(new Gt(.136,.009,8,48),Ve,lt-.06,se,me,he);ye.rotation.y=Math.PI/2}else{let rt=K?.52:E==="sport"?.43:.38,J=K?.11:E==="sport"?.26:.22,ye=Ue(rt,J,.095,E==="sport"?.018:K?.045:.075,E==="club"?Ve:He,lt,se,me,he);ye.rotation.y=Math.PI/2;let ke=m(new ir(_(rt-.045,J-.035,.05)),Tt,lt-.061,se,me,he);ke.rotation.y=-Math.PI/2,ke.castShadow=!1,ke.receiveShadow=!1;let $e=_(rt-.028,J-.018,.055).getPoints(24).map(tt=>[lt-.058,se+tt.y,me+tt.x]);$e.push($e[0]),et($e,.006,Ve,he)}}else if(M==="sideSkirts")for(let O of[-1,1]){let he=Ue(E==="aero"?2.75:2.3,E==="aero"?.27:E==="sport"?.19:.12,E==="rally"?.48:E==="aero"?.32:E==="sport"?.23:.13,.05,E==="club"||E==="rally"?Q:He,0,.59,O*1.24,G);if(E==="rally")for(let K of[-.84,-.42,0,.42,.84]){let se=Ue(.13,.018,.25,.018,qe,K,.67,O*1.24,G)}else et([[-1.08,.54,O*1.3],[0,.53,O*1.32],[1.08,.54,O*1.3]],.009,p,G);for(let K of[-.87,.87])Ue(.12,.14,.16,.025,qe,K,.65,O*1.2,G),cn(K,.61,O*1.33,G);if(E==="sport"){let K=Ue(.46,.24,.035,.02,He,-.96,.69,O*1.4,G);K.rotation.z=-.25}if(E==="aero")for(let K of[-.95,-.4,.25,.95]){let se=Ue(.24,.12,.025,.025,He,K,.57,O*1.35,G);se.rotation.z=K>0?.2:-.2}}else{let O=M==="frontBumper"?1:-1,he=[[O*2.26,.66,-.92],[O*2.58,.65,-.7],[O*2.67,.65,0],[O*2.58,.65,.7],[O*2.26,.66,.92]];E!=="aero"&&et(he,E==="sport"?.061:.047,Q,G);for(let K of[-.67,.67]){et([[O*2.31,.74,K],[O*2.5,.68,K]],.032,qe,G);let se=Ue(.16,.12,.13,.035,qe,O*2.51,.67,K,G)}if(E==="aero"){let K=Ue(.38,.045,1.94,.07,He,O*2.48,.5,0,G);for(let se of[-.7,-.27,.27,.7])Ue(.27,.12,.022,.025,qe,O*2.48,.55,se,G);et([[O*2.4,.52,-.91],[O*2.64,.52,0],[O*2.4,.52,.91]],.008,Ve,G)}if(E==="club"||E==="rally"){et([[O*2.5,.67,-.59],[O*2.58,1.08,-.48],[O*2.61,1.14,.48],[O*2.5,.67,.59]],.04,Ve,G);let K=Ue(.1,.28,E==="rally"?1.12:.79,.04,Q,O*2.6,.64,0,G);for(let se of[-.3,-.1,.1,.3]){let me=m(new Qn(.035,16),u,O*2.66,.64,se,G);me.rotation.y=O*Math.PI/2}}if(E==="rally")for(let K of[-.72,.72])et([[O*2.53,.65,K-.14],[O*2.56,.94,K-.14],[O*2.55,1.04,K],[O*2.56,.94,K+.14],[O*2.53,.65,K+.14]],.036,Ve,G);if(E==="sport")for(let K of[-.67,.67]){let se=Ue(.2,.13,.14,.045,qe,O*2.56,.66,K,G)}if(M==="rearBumper"&&E==="aero")for(let K of[-.7,-.35,0,.35,.7]){let se=Ue(.27,.15,.025,.025,He,-2.46,.48,K,G);se.rotation.z=.12}}}}let Jt=s("#b9e4f5",.28,.17);Jt.emissive.set("#b9e4f5"),Jt.emissiveIntensity=1.8;let Pt=s("#ffdda0",.2,.2);Pt.emissive.set("#ffe0a8"),Pt.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[E,G,Q]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.36,.22],["sport",2.24,.18]]){let O=new Fe;Pe[M][E]&&i.remove(Pe[M][E]),i.add(O),Pe[M][E]=O;let he=M==="frontBumper"?1:-1,K=M==="rearBumper",se=E==="trackGT"?.6:E==="driftWide"?.58:.49,me=.82,lt=K?[[0,E==="trackGT"?1.36:1.08]]:E==="driftWide"?[[0,1.2],[-.94,.32],[.94,.32]]:E==="trackGT"?[[0,1.08],[-.91,.35],[.91,.35]]:[[0,.98],[-.79,.31],[.79,.31]],vt=E==="driftWide"?.35:E==="trackGT"?.33:.27,rt=_(G,se,.1);for(let[ct,Ke]of lt){let bt=_(Ke,vt,.045,kn);rt.holes.push(new kn(bt.getPoints(24).map(Ft=>new _e(Ft.x+ct,Ft.y))))}let J=new Vt(rt,{depth:Q,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),ye=J.attributes.position;for(let ct=0;ct<ye.count;ct++){let Ke=ye.getX(ct),bt=ye.getY(ct),Ft=ye.getZ(ct);ye.setXYZ(ct,he*(2.64+Ft-.34*(Ke/(G/2))**2),me+bt,Ke)}J.computeVertexNormals(),m(J,a,0,0,0,O);for(let[ct,Ke]of lt){let bt=_(Ke+.025,vt+.025,.045).getPoints(48).map(xn=>{let on=xn.x+ct;return[he*(2.64+Q+.022-.34*(on/(G/2))**2),me+xn.y,on]});bt.push(bt[0]),et(bt,.014,l,O);let Ft=[];for(let xn of[-1,1])for(let on=-Ke;on<Ke;on+=.055){let yi=[];for(let en=0;en<=20;en++){let An=-vt*.43+en*vt*.86/20,_i=on+xn*An;Math.abs(_i)<Ke/2-.035&&yi.push([he*(2.665-.34*((ct+_i)/(G/2))**2),me+An,ct+_i])}for(let en=1;en<yi.length;en++)Ft.push(...yi[en-1],...yi[en])}let gn=new ht;gn.setAttribute("position",new Re(Ft,3)),O.add(new qr(gn,new Mr({color:"#7d8c98"})))}let ke=Array.from({length:41},(ct,Ke)=>{let bt=-G/2+.04+Ke*(G-.08)/40;return[he*(2.64+Q+.018-.34*(bt/(G/2))**2),me+se/2-.02,bt]});et(ke,.018,l,O);for(let[ct,Ke]of lt){let bt=[],Ft=[];for(let xn=0;xn<=24;xn++){let on=ct-Ke/2-.01+xn*(Ke+.02)/24,yi=he*(2.64-.34*(on/(G/2))**2);for(let en of[-vt/2-.01,vt/2+.01])bt.push(yi,me+en,on)}for(let xn=0;xn<24;xn++){let on=xn*2;Ft.push(...he>0?[on,on+1,on+2,on+1,on+3,on+2]:[on,on+2,on+1,on+1,on+2,on+3])}let gn=new ht;gn.setAttribute("position",new Re(bt,3)),gn.setIndex(Ft),gn.computeVertexNormals(),m(gn,u,0,0,0,O)}let $e=Array.from({length:41},(ct,Ke)=>{let bt=-G/2+Ke*G/40;return[he*(2.65+Q+.045-.34*(bt/(G/2))**2),me-se/2-.025,bt]});et($e,E==="trackGT"?.028:.019,He,O);let tt=new ht,Dt=[],qt=[];for(let[ct,Ke,bt]of $e)Dt.push(ct,Ke,bt,ct-he*.17,Ke+.005,bt);for(let ct=0;ct<40;ct++){let Ke=ct*2;qt.push(Ke,Ke+1,Ke+2,Ke+1,Ke+3,Ke+2)}if(tt.setAttribute("position",new Re(Dt,3)),tt.setIndex(qt),tt.computeVertexNormals(),m(tt,He,0,0,0,O),M==="rearBumper")for(let ct=0;ct<(E==="trackGT"?5:3);ct++){let Ke=(ct-(E==="trackGT"?2:1))*.3,bt=Ue(.46,.19,.025,.008,He,-2.76,me-se/2-.035,Ke,O);bt.rotation.z=-.12}else if(E==="trackGT"){for(let ct of[-.36,.36]){let Ke=Ue(.38,.27,.035,.012,He,2.94,me-se/2+.045,ct,O);Ke.rotation.z=-.32,Ue(.27,.027,.13,.008,He,3.02,me-se/2-.075,ct,O)}for(let ct of[-.96,.96]){let Ke=Ue(.29,.16,.025,.008,He,2.78,me-se/2+.01,ct,O);Ke.rotation.z=.08}}if(K)for(let ct of[-1,1])for(let Ke=0;Ke<(E==="sport"?2:1);Ke++){let bt=ct*(.78+Ke*.15),Ft=m(new Qe(.067,.067,.16,32,1,!0),Ve,-2.77,.77,bt,O);Ft.rotation.z=Math.PI/2;let gn=m(new Qn(.056,24),u,-2.86,.77,bt,O);gn.rotation.y=-Math.PI/2}for(let ct of[-1,1]){let Ke=ct*(G/2-.055),bt=he*(2.64+Q-.3);et([[bt,me-se/2+.065,Ke],[bt-he*.1,me,Ke+ct*.035],[bt-he*.2,me+se/2-.065,Ke-ct*.015]],.043,a,O),et([[bt+he*.025,me-se/2+.04,Ke-ct*.025],[bt+he*.035,me,Ke-ct*.025],[bt+he*.025,me+se/2-.04,Ke-ct*.025]],.012,l,O)}}for(let M of["formula","formulaPro","formulaElite"]){let E=uf(M,{paint:a,carbon:He,metal:Ve,accent:l});i.add(E),Pe.frontBumper[M]=E}for(let M of["rearBumper","sideSkirts","spoiler"])for(let E of["formula","formulaPro"]){let G=new Fe;G.name=M+"-"+E,i.add(G),Pe[M][E]=G;let Q=E==="formulaPro";if(M==="rearBumper"){Ue(.48,.16,Q?2.3:2.05,.03,He,-2.47,.45,0,G);for(let O=-3;O<=3;O++){let he=Ue(.64,.23,.025,.01,He,-2.48,.44,O*.3,G);he.rotation.z=-.15}for(let O of[-1,1])et([[-2.2,.54,O*1],[-2.65,.62,O*1.1]],.025,a,G)}else if(M==="sideSkirts")for(let O of[-1,1]){let he=Ue(2.35,Q?.42:.33,.34,.08,a,-.15,.83,O*1.3,G);he.rotation.z=-.045,Ue(2.65,.055,.48,.025,He,-.06,.58,O*1.3,G),Ue(.07,.21,.24,.035,u,.96,.87,O*1.3,G);for(let K=0;K<(Q?3:1);K++)Ue(.35,.11,.025,.01,He,.48-K*.32,.65,O*1.53,G)}else{i.remove(G);let O=mu(E,{paint:a,carbon:He,metal:Ve});i.add(O),Pe.spoiler[E]=O}}Pe.headlights={};for(let M of["round","projector","rally","matrix"]){let E=new Fe;i.add(E),Pe.headlights[M]=E;for(let G of[-1,1]){let Q=G*.74,O=2.57-.28*(Q/1.1)**2+.07,he=1.075;if(M==="matrix"){let K=Ue(.4,.2,.075,.045,qe,O,he,Q,E);K.rotation.y=Math.PI/2;let se=Ue(.35,.15,.01,.035,u,O+.05,he,Q,E);se.rotation.y=Math.PI/2;for(let me=0;me<4;me++){let lt=Ue(.06,.1,.012,.017,Jt,O+.065,he,Q-.128+me*.085,E);lt.rotation.y=Math.PI/2,lt.castShadow=!1}}else{let K=M==="rally"?.16:M==="round"?.14:.135,se=m(new Qe(K+.027,K+.02,.095,48),qe,O,he,Q,E);se.rotation.z=Math.PI/2;let me=m(new Gt(K+.008,.01,10,48),Ve,O+.054,he,Q,E);me.rotation.y=Math.PI/2;let lt=m(new Ht(1,32,20),M==="round"||M==="rally"?Pt:Jt,O+.055,he,Q,E);if(lt.scale.set(.025,K,K),lt.castShadow=!1,M==="projector"){let vt=m(new Gt(K*.8,.008,8,48),Jt,O+.076,he,Q,E);vt.rotation.y=Math.PI/2,m(new Ht(1,24,16),Tt,O+.081,he,Q,E).scale.set(.022,K*.53,K*.53)}if(M==="rally")for(let vt of[-.07,0,.07]){let rt=Math.sqrt(K*K-vt*vt);et([[O+.09,he-rt,Q+vt],[O+.1,he,Q+vt],[O+.09,he+rt,Q+vt]],.009,qe,E)}}}}for(let[M,E]of Object.entries(n.streetHeadlights)){let G=new Fe;i.add(G),Pe.headlights[M]=G;let Q=s(E.color,.12,.22);Q.emissive.set(E.color),Q.emissiveIntensity=E.smoke?.35:1.1;let O=s(E.smoke?"#1c3348":"#83b6d5",.45,.12);for(let he of[-1,1]){let K=he*.72,se=2.57-.28*(K/1.1)**2+.07,me=1.075;if(E.shape==="sportHousing"){let rt=new jt;rt.moveTo(-.29,.12),rt.lineTo(.23,.09),rt.quadraticCurveTo(.32,.02,.26,-.13),rt.lineTo(-.25,-.14),rt.closePath();let J=m(new Vt(rt,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),qe,se+.02,me,K,G);J.rotation.y=Math.PI/2;for(let ye=0;ye<2;ye++){let ke=K+(ye-.5)*.24;if(m(new Ht(1,24,16),O,se+.13,me,ke,G).scale.set(.022,.067,.067),E.signature==="rings"){let tt=m(new Gt(.086,.01,10,48),Q,se+.155,me,ke,G);tt.rotation.y=Math.PI/2}if(E.signature==="doubleL"&&et([[se+.155,me+.075,ke-.085],[se+.155,me-.075,ke-.085],[se+.155,me-.075,ke+.075]],.012,Q,G),E.signature==="pixels")for(let tt=0;tt<3;tt++)m(new nt(.014,.026,.026),Q,se+.155,me+.09,ke-.055+tt*.055,G)}E.signature==="arc"&&et([[se+.155,me-.09,K-.25],[se+.155,me+.1,K-.25],[se+.155,me+.12,K],[se+.155,me+.07,K+.25]],.012,Q,G);continue}let lt=Ue(.47,.25,.1,.04,qe,se,me,K,G);lt.rotation.y=Math.PI/2;for(let rt of[-.18,.18]){m(new nt(.1,.07,.035),Ve,se-.035,me-.15,K+rt,G);let J=m(new Qe(.012,.012,.018,12),l,se+.02,me-.13,K+rt,G);J.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(E.shape)){let rt=E.shape==="doubleU"?2:1;for(let J=0;J<rt;J++){let ye=K+(J-(rt-1)/2)*.21;if(m(new Ht(1,24,16),O,se+.073,me,ye,G).scale.set(.019,.067,.067),E.shape==="doubleU")et([[se+.1,me+.075,ye-.08],[se+.1,me-.04,ye-.08],[se+.1,me-.08,ye-.045],[se+.1,me-.08,ye+.045],[se+.1,me-.04,ye+.08],[se+.1,me+.075,ye+.08]],.01,Q,G);else if(E.shape==="brow"){et([[se+.1,me+.055,ye-.19],[se+.1,me+.093,ye-.14],[se+.1,me+.093,ye+.19]],.011,Q,G);let $e=m(new Gt(.068,.006,8,32),Q,se+.095,me-.015,ye,G);$e.rotation.y=Math.PI/2}else for(let $e=0;$e<3;$e++){let tt=$e*Math.PI*2/3-Math.PI/2;et([[se+.102,me+Math.sin(tt)*.025,ye+Math.cos(tt)*.025],[se+.102,me+Math.sin(tt)*.1,ye+Math.cos(tt)*.1]],.011,Q,G)}}continue}if(E.shape==="bar"){for(let[rt,J,ye]of[[.035,.41,.025],[-.045,.33,.012]]){let ke=Ue(J,ye,.014,.006,Q,se+.064,me+rt,K,G);ke.rotation.y=Math.PI/2,ke.castShadow=!1}continue}if(E.shape==="square"){let rt=Ue(.37,.17,.024,.015,Q,se+.065,me,K,G);rt.rotation.y=Math.PI/2;for(let J=0;J<7;J++)m(new nt(.006,.16,.004),O,se+.082,me,K-.15+J*.05,G);continue}let vt=E.count===3?.062:E.count===2?.087:.106;for(let rt=0;rt<E.count;rt++){let J=K+(rt-(E.count-1)/2)*(E.count===3?.14:.205),ye=m(new Qe(vt+.014,vt+.02,.09,E.shape==="hex"?6:40),u,se+.035,me,J,G);ye.rotation.z=Math.PI/2;let ke=m(new Gt(vt,.009,8,E.shape==="hex"?6:48),Q,se+.09,me,J,G);ke.rotation.y=Math.PI/2,ke.castShadow=!1;let $e=m(new Ht(1,24,16),E.projector?O:Q,se+.077,me,J,G);if($e.scale.set(.018,vt*.74,vt*.74),$e.castShadow=!1,E.projector&&m(new Ht(1,16,12),Q,se+.092,me,J,G).scale.set(.006,vt*.31,vt*.31),E.cross||E.guard)for(let tt of[-1,1])et([[se+.11,me-vt*.74,J-tt*vt*.74],[se+.115,me,J],[se+.11,me+vt*.74,J+tt*vt*.74]],.009,qe,G)}}}let hn={};for(let M of["club","sport","rally","chrome","aero"]){let E=[];hn[M]=E;for(let{wheelGroup:G,sign:Q}of X){let O=new Fe;G.add(O),E.push(O);let he=M==="aero"?.94:M==="rally"?1.02:M==="chrome"?.85:.88,K=M==="aero"||M==="rally"?.9:M==="sport"?.48:M==="chrome"?.38:.62,se=M==="aero"?1.65:M==="rally"?1.4:M==="sport"?.66:M==="chrome"?1.03:1.2,me=[],lt=[];for(let ye=0;ye<=48;ye++){let ke=-se+ye*se*2/48;for(let $e of[-K/2,K/2])me.push(Math.sin(ke)*he,Math.cos(ke)*he,$e)}for(let ye=0;ye<48;ye++){let ke=ye*2;lt.push(ke,ke+1,ke+2,ke+1,ke+3,ke+2)}let vt=new ht;vt.setAttribute("position",new Re(me,3)),vt.setIndex(lt),vt.computeVertexNormals();let J=(M==="chrome"?Ve:M==="club"?a:He).clone();J.side=Bt,m(vt,J,0,0,0,O);for(let ye of[-1,1]){let ke=Array.from({length:49},($e,tt)=>{let Dt=-se+tt*se*2/48;return[Math.sin(Dt)*he,Math.cos(Dt)*he,ye*K/2]});et(ke,.012,M==="aero"?l:M==="chrome"?Ve:qe,O)}for(let ye of[-1,1])et([[0,0,-Q*.28],[ye*.28,.42,-Q*.31],[ye*.49,.68,-Q*.31]],.022,qe,O),cn(ye*.49,.68,-Q*.32,O);if(M==="rally"){Ue(.12,.52,K,.025,qe,-.97,.12,0,O);for(let ye of[-1,1])for(let ke of[-K/2,K/2])cn(ye*.64,.76,ke,O)}if(M==="sport")for(let ye of[-K/2,K/2])et([[-.5,.73,ye],[0,.9,ye],[.5,.73,ye]],.018,l,O);if(M==="aero"){for(let ye of[-1,1]){let ke=new jt;ke.moveTo(-.91,.1),ke.quadraticCurveTo(-.97,.94,0,.98),ke.quadraticCurveTo(.97,.94,.91,.1),ke.lineTo(.7,.1),ke.quadraticCurveTo(.66,.72,0,.75),ke.quadraticCurveTo(-.66,.72,-.7,.1),ke.closePath(),m(new Vt(ke,{depth:.025,bevelEnabled:!1}),He,0,0,ye*K/2,O)}for(let ye=0;ye<4;ye++)Ue(.045,.025,K*.65,.006,u,-.28+ye*.18,.948,0,O)}O.userData.shell=J}}Pe.windshield={};for(let[M,E,G,Q]of[["deflector",.42,"#b6e3eb",.18],["sport",.82,"#a9d5e7",.23],["touring",1.08,"#c1e3ed",.17],["smoke",.96,"#455f7a",.4],["iridium",1.08,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let he=function($e,tt){let Dt=["touring","grandTour"].includes(M),qt=["sport","iridium"].includes(M),ct=(Dt?1.1:M==="deflector"?.78:qt?.88:.94)*(1-(qt?.28:Dt?.04:.13)*tt),Ke=1-$e*$e;return[1.32+(Dt?.34:.23)*Ke-E*(qt?.48:.32)*tt,1.5+E*tt*(qt?.72+.28*Ke:.84+.16*Ke),$e*ct]},O=new Fe;i.add(O),Pe.windshield[M]=O;let K=[],se=[],me=40,lt=16;for(let $e=0;$e<=lt;$e++)for(let tt=0;tt<=me;tt++)K.push(...he(-1+tt*2/me,$e/lt));for(let $e=0;$e<lt;$e++)for(let tt=0;tt<me;tt++){let Dt=$e*(me+1)+tt;se.push(Dt,Dt+1,Dt+me+1,Dt+1,Dt+me+2,Dt+me+1)}let vt=new ht;vt.setAttribute("position",new Re(K,3)),vt.setIndex(se),vt.computeVertexNormals();let rt=new Kt({color:G,metalness:.05,roughness:.075,transparent:!0,opacity:Q,depthWrite:!1,side:Bt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});O.userData.glass=rt,O.userData.originalTint={color:G,opacity:Q};let J=m(vt,rt,0,0,0,O);J.castShadow=!1,J.receiveShadow=!1,J.renderOrder=3;let ye=["smoke","highSmoke"].includes(M)?qe:Ve;et(Array.from({length:41},($e,tt)=>{let Dt=he(-1+tt/20,0);return Dt[1]-=.04,Dt}),.045,qe,O);for(let $e of[0,1])et(Array.from({length:41},(tt,Dt)=>he(-1+Dt/20,$e)),$e===0?.017:.009,ye,O);for(let $e of[-1,1]){et(Array.from({length:17},(qt,ct)=>he($e,ct/16)),.011,ye,O);let tt=he($e,0);Ue(.26,.12,.23,.025,qe,tt[0],tt[1]-.06,tt[2],O),et([[.99,1.44,$e*1.12],[1.18,1.44,$e*1.02],tt],.032,ye,O);let Dt=m(new Qe(.013,.013,.018,6),Ve,tt[0]+.04,tt[1]+.014,tt[2],O)}let ke=new yn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let $e of[-.77,-.69]){let tt=Array.from({length:13},(qt,ct)=>{let Ke=he($e,.18+ct*.058);return Ke[0]+=.004,Ke}),Dt=et(tt,.003,ke,O);Dt.castShadow=!1,Dt.receiveShadow=!1,Dt.renderOrder=4}}for(let M of Object.values(Pe.windshield))M.userData.mountRearX=hs([M],M).min.x;let rn=new Fe;for(let M of i.children.slice())M.userData.groundWheel||rn.add(M);i.add(rn);let Et=s("#b8c7d6",.72,.27),Mt=new Fe,Yn=[];i.add(Mt);for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=new Fe;G.position.set(M,.52,E*1.12),Mt.add(G);let Q=Array.from({length:193},(rt,J)=>{let ye=J/192,ke=ye*Math.PI*14;return new S(Math.cos(ke)*.071,.055+ye*.36,Math.sin(ke)*.071)}),O=m(new Ct(new wt(Q),192,.014,10,!1),Et,0,0,0,G);m(new Qe(.039,.039,.23,24),qe,0,.14,0,G);let he=m(new Qe(.018,.018,.28,20),Ve,0,.34,0,G),K=new Fe;K.position.y=.47,G.add(K);for(let[rt,J]of[[G,.04],[K,-.015]])m(new Qe(.095,.095,.026,32),Ve,0,J,0,rt),m(new Qe(.068,.068,.018,24),qe,0,J+.02,0,rt);m(new nt(.14,.075,.18),qe,0,.025,E*.035,G),m(new nt(.16,.075,.22),qe,0,0,-E*.075,K);let se=new S(M,.56,E*1.12),me=new S(M,.81,E*1.43),lt=me.clone().sub(se);m(new Qe(.026,.026,lt.length(),16),qe,...se.clone().add(me).multiplyScalar(.5).toArray(),Mt).quaternion.setFromUnitVectors(new S(0,1,0),lt.normalize()),Yn.push({coil:O,rod:he,upper:K})}Pe.brakes={};for(let M of["stock","red","gold","ceramic"]){let E=new Fe;i.add(E),Pe.brakes[M]=E;for(let{wheelGroup:G,sign:Q}of X){let O=fu(M);O.position.z=Q*.165,Q<0&&(O.rotation.y=Math.PI),G.add(O),E.userData.brakeAssemblies??=[],E.userData.brakeAssemblies.push(O)}}Pe.nitrous={};let cr=document.createElement("canvas");cr.width=512,cr.height=256;let bn=cr.getContext("2d");bn.fillStyle="#101923",bn.fillRect(0,0,512,256),bn.strokeStyle="#e8e1cc",bn.lineWidth=8,bn.strokeRect(10,10,492,236),bn.fillStyle="#f5f2e8",bn.textAlign="center",bn.font="italic bold 106px Arial",bn.fillText("N\u2082O",256,117),bn.font="bold 24px Arial",bn.fillText("NITROUS OXIDE",256,159),bn.fillStyle="#d9b36b",bn.font="bold 18px Arial",bn.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)bn.fillRect(165+M*4,212,M%3+1,17);let oi=new Xt(cr);oi.colorSpace=yt,oi.anisotropy=8;let Wn=document.createElement("canvas");Wn.width=Wn.height=128;let $t=Wn.getContext("2d");$t.fillStyle="#eee9dc",$t.fillRect(0,0,128,128),$t.translate(64,64),$t.strokeStyle="#17202a";for(let M=0;M<=20;M++){let E=-Math.PI*.8+M*Math.PI*1.6/20;$t.lineWidth=M%5?2:4,$t.beginPath(),$t.moveTo(Math.sin(E)*43,-Math.cos(E)*43),$t.lineTo(Math.sin(E)*(M%5?49:53),-Math.cos(E)*(M%5?49:53)),$t.stroke()}$t.fillStyle="#293541",$t.textAlign="center",$t.font="bold 14px Arial",$t.fillText("PSI",0,30),$t.strokeStyle="#c92737",$t.lineWidth=4,$t.beginPath(),$t.moveTo(-9,12),$t.lineTo(26,-31),$t.stroke(),$t.fillStyle="#25313a",$t.beginPath(),$t.arc(0,0,6,0,Math.PI*2),$t.fill();let li=new Xt(Wn);li.colorSpace=yt;for(let M of["blue","twin","triple"]){let E=new Fe;E.name="nitrous-"+M,i.add(E),Pe.nitrous[M]=E;let G=s(n.item("nitrous",M).color,.65,.27),Q=M==="triple"?3:M==="twin"?2:1,O=1.49,he=-1.3,K=.37,se=s("#b4924f",.8,.3),me=s("#a5b2bd",.85,.24),lt=s("#1b2028",.08,.85),vt=s("#ab2635",.35,.4);for(let rt of[-1.52,-1.13]){Ue(.095,.05,Q*K+.04,.015,u,rt,1.29,0,E);for(let J of[-1,1]){let ye=J*(Q*K/2-.02);m(new Qe(.024,.024,.023,6),me,rt,1.327,ye,E)}}for(let rt=0;rt<Q;rt++){let J=(rt-(Q-1)/2)*K,ye=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([en,An])=>new _e(en,An)),ke=m(new nr(ye,40),G,he,O,J,E);ke.rotation.z=-Math.PI/2;for(let en of[-1.52,-1.13]){Ue(.11,.095,.27,.025,lt,en,1.35,J,E);let An=m(new Gt(.152,.013,8,40),me,en,O,J,E);An.rotation.y=Math.PI/2,Ue(.08,.025,.055,.008,me,en,O+.155,J,E),m(new Qe(.013,.013,.018,6),u,en,O+.179,J,E)}let $e=[],tt=[],Dt=[];for(let en=0;en<2;en++)for(let An=0;An<=16;An++){let _i=-.91+An*1.82/16;if($e.push(he+(en?.12:-.12),O+Math.cos(_i)*.147,J+Math.sin(_i)*.147),tt.push(en,An/16),en&&An){let xi=17+An;Dt.push(xi-18,xi-17,xi,xi-18,xi,xi-1)}}let qt=new ht;qt.setAttribute("position",new Re($e,3)),qt.setAttribute("uv",new Re(tt,2)),qt.setIndex(Dt),qt.computeVertexNormals();let ct=new Kt({map:oi,roughness:.55,metalness:.05,side:Bt});m(qt,ct,0,0,0,E);let Ke=m(new Qe(.046,.046,.055,24),se,-.89,O,J,E);Ke.rotation.z=Math.PI/2,Ue(.075,.07,.065,.012,se,-.845,O,J,E),m(new Qe(.016,.016,.065,16),me,-.845,O+.045,J,E);let bt=m(new Gt(.052,.012,8,24),vt,-.845,O+.092,J,E);bt.rotation.x=Math.PI/2;for(let en of[0,Math.PI/3,Math.PI*2/3]){let An=Ue(.106,.014,.014,.004,vt,-.845,O+.092,J,E);An.rotation.y=en}let Ft=new Fe;Ft.position.set(-.84,O+.065,J+.075),Ft.rotation.x=-Math.PI*.32,E.add(Ft);let gn=m(new Qe(.057,.057,.03,32),me,0,0,0,Ft);gn.rotation.x=Math.PI/2;let xn=m(new Qn(.047,32),new yn({map:li}),0,0,.017,Ft),on=m(new Qe(.024,.024,.055,6),se,-.79,O,J,E);on.rotation.z=Math.PI/2,et([[-.76,O,J],[-.7,O-.02,J],[-.71,1.3,J],[-.91,1.24,J]],.014,lt,E);let yi=m(new Qe(.021,.021,.055,12),me,-.74,O,J,E);yi.rotation.z=Math.PI/2}Ue(.07,.07,Q*K,.015,se,-.91,1.24,0,E),et([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,lt,E)}Pe.pedals={};for(let M of["classic","aluminium","formula"]){let E=df(M);i.add(E),Pe.pedals[M]=E}Pe.seat={};for(let M of["red","carbon","emerald","ivory"]){let E=vu(M);E.rotation.y=Math.PI/2,E.position.set(-.8,1,0),i.add(E),Pe.seat[M]=E}let na=hf(T),ci=Jp({paint:a,carbon:He,metal:Ve});i.add(ci.group);function Za(M){for(let{plate:J,sign:ye}of Le){let ke=M[ye>0?"frontBumper":"rearBumper"],$e={streetLow:.12,driftWide:.16,trackGT:.22,sport:.18}[ke];J.position.x=ye*($e===void 0?["club","rally"].includes(ke)?2.72:2.605:2.64+$e+.055),J.scale.setScalar($e===void 0?1:.72),J.position.y=$e===void 0?1.01:1.3}let E=["formula","formulaPro","formulaElite"].includes(M.frontBumper);na.set(E),N.forEach(J=>J.visible=!E),ci.group.visible=E||M.turbine==="formula",ci.engine.visible=M.turbine==="formula",Ce(M);let G=n.glassTints[M.glassTint]||n.glassTints.original;for(let J of Object.values(Pe.windshield)){let ye=J.userData.originalTint;J.userData.glass.color.set(G.opacity===null?ye.color:G.color),J.userData.glass.opacity=G.opacity??ye.opacity,J.userData.glass.iridescence=M.glassTint==="violet"?1:0,J.userData.glass.iridescenceIOR=1.35,J.userData.glass.iridescenceThicknessRange=[180,420],J.userData.glass.roughness=M.glassTint==="black"?.2:.075}let Q=(n.wheelDiameters[M.wheelSize]||16)/16,O=(Q-1)*(.715/.86),he={standard:1,wide:1.25,ultra:1.45}[M.tyreWidth]||1;for(let{wheelGroup:J,sign:ye,tyres:ke}of X){J.scale.set(.88/1.24*Q,.88/.86*Q,he/.95),J.position.y=.715/.86*Q,J.position.z=ye*(1.36+.25*(he-1));for(let[$e,tt]of Object.entries(ke))for(let Dt of tt)Dt.visible=$e===(M.tyres||"standard")}let K=O+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0);for(let[J,ye]of Object.entries(Pe))if(J!=="brakes")for(let ke of Object.values(ye))ke.parent===i&&(ke.userData.mountBaseY??=ke.position.y,ke.position.y=ke.userData.mountBaseY+K);wn.forEach(J=>J.visible=!M.headlights||M.headlights==="classic");for(let[J,ye]of Object.entries(hn))for(let ke of ye)ke.visible=M.fenders===J,J==="club"&&ke.userData.shell.color.set(n.item("paint",M.paint).color);Et.color.set(n.item("suspension",M.suspension).color),rn.position.y=K,ci.group.position.y=K-(["formula","aeroPrototype"].includes(M.chassis)?.18:0),Mt.visible=K>0,Yn.forEach(({coil:J,rod:ye,upper:ke})=>{J.scale.y=1+K/.415,ye.scale.y=1+K/.28,ye.position.y=.34+K/2,ke.position.y=.47+K});for(let[J,ye]of Object.entries(Pe))for(let[ke,$e]of Object.entries(ye))$e.visible=(J==="pedals"?M.pedals||"classic":M[J])===ke;E&&Object.values(Pe.headlights).forEach(J=>J.visible=!1);for(let[J,ye]of Object.entries(Pe.brakes))for(let ke of ye.userData.brakeAssemblies||[])ke.visible=(M.brakes||"stock")===J;Object.entries(de).forEach(([J,ye])=>ye.visible=J===(M.steering||"classic")),Object.entries(Qt).forEach(([J,ye])=>ye.visible=J===(M.exhaust||"classic")),kt.visible=M.turbine==="boost",gt.visible=M.turbine!=="formula";let se=["twin","twinBig"].includes(M.turbine),me=M.turbine==="twinBig",lt=me?.9:se?.52:M.turbine==="boost"?.96:.9;gt.scale.set(lt/1.24,lt/.86,lt/.95),gt.position.set(ot,je+(me?.06:se?-.2:-.04),se?me?-.7:-.44:0),xt.visible=se,xt.scale.copy(gt.scale),xt.position.set(ot,je+(me?.06:-.2),me?.7:.44);let vt=hs(M.turbine==="formula"?[ci.engine]:[gt,xt],rn);for(let J of Object.values(Pe.spoiler))J.userData.fitTurbines(vt);let rt=M.badges||[];if(w.forEach(J=>J.visible=!rt.length&&(!M.vinyl||M.vinyl==="none")),ne.forEach(J=>J.userData.plane.visible=!rt.length&&(!M.vinyl||M.vinyl==="none")),ie.forEach(({group:J,mat:ye,back:ke,n:$e})=>{let tt=rt[$e];J.position.x=($e-(rt.length-1)/2)*.82+.05,J.visible=!!tt;let Dt=tt+":"+(M.prizeTotal||0);if(!tt||ye.userData.badge===Dt)return;let qt=new jt,ct=.65/512,Ke=(bt,Ft)=>[(bt-256)*ct,(256-Ft)*ct];if(tt==="millionaire"||tt==="day-hero")qt.absarc(0,0,204*ct,0,Math.PI*2,!1);else if(tt==="rating-top10"){for(let bt=0;bt<6;bt++){let Ft=bt*Math.PI/3-Math.PI/2,gn=Ke(256+Math.cos(Ft)*215,256+Math.sin(Ft)*215);bt?qt.lineTo(...gn):qt.moveTo(...gn)}qt.closePath()}else qt.moveTo(...Ke(80,88)),qt.quadraticCurveTo(...Ke(256,0),...Ke(432,88)),qt.lineTo(...Ke(420,296)),qt.quadraticCurveTo(...Ke(390,400),...Ke(256,465)),qt.quadraticCurveTo(...Ke(122,400),...Ke(92,296)),qt.closePath();ke.geometry.dispose(),ke.geometry=new Vt(qt,{depth:.035,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.014,bevelThickness:.012,curveSegments:24}),ye.map?.dispose(),ye.map=new Xt(n.badgeCanvas(tt,M)),ye.map.colorSpace=yt,ye.map.anisotropy=16,ye.emissive.set("#ffffff"),ye.emissiveMap=ye.map,ye.emissiveIntensity=.35,ye.userData.badge=Dt,ye.needsUpdate=!0}),a.color.set(n.item("paint",M.paint).color),o.color.copy(a.color).multiplyScalar(.45),h.color.set(n.wheelPaintColor(M)),H!==M.wheels){for(let J of A)J.removeFromParent(),J.geometry.dispose();A.length=0;for(let{wheelGroup:J,sign:ye}of X)for(let ke of[1,-1])for(let $e of n.wheelDesign(M.wheels)){let tt={bronzeSix:.029,deepFive:.048,muscleFive:.06,triBlade:.105,turbofan:.037,fiveSpoke:.049,legend:.034,splitY:.024,concaveTen:.026,rallyMulti:.02,crossMesh:.014,copper:.015,splitStar:.022,splitSix:.025,forged:.025}[M.wheels]||.02,Dt=[],qt=[];$e.forEach(([Ft,gn],xn)=>{let on=$e[Math.max(0,xn-1)],yi=$e[Math.min($e.length-1,xn+1)],en=yi[0]-on[0],An=yi[1]-on[1],_i=Math.hypot(en,An)||1,xi=tt*(.65+.35*xn/($e.length-1));Dt.push([Ft-An/_i*xi,gn+en/_i*xi]),qt.push([Ft+An/_i*xi,gn-en/_i*xi])});let ct=new jt;[...Dt,...qt.reverse()].forEach(([Ft,gn],xn)=>xn?ct.lineTo(Ft,gn):ct.moveTo(Ft,gn)),ct.closePath();let Ke=new Vt(ct,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1}),bt=Ke.attributes.position;for(let Ft=0;Ft<bt.count;Ft++){let gn=Math.hypot(bt.getX(Ft),bt.getY(Ft)),xn=(M.wheels==="deepFive"?.095:M.wheels==="concaveTen"?.075:.025)*(1-Math.min(1,gn/.51));bt.setZ(Ft,ye*ke*((ke===1?.255:.235)-xn+bt.getZ(Ft)))}bt.needsUpdate=!0,Ke.computeVertexNormals(),A.push(m(Ke,h,0,0,0,J))}H=M.wheels}l.color.set(n.item("trim",M.trim).color),l.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,l.metalness=.95,d.userData.style!==M.upholstery&&(d.map?.dispose(),d.map=new Xt(n.upholsteryCanvas(M.upholstery)),d.map.colorSpace=yt,d.map.wrapS=d.map.wrapT=vn,d.map.repeat.set(12,2),d.color.set("#ffffff"),d.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,d.userData.style=M.upholstery,d.needsUpdate=!0),n.chipPalette(M.chips).forEach((J,ye)=>{Je[ye].color.set(J),Je[ye].roughness=M.chips==="ceramic"?.25:.55}),ut.color.set(n.chipEdgeColor(M.chips)),We.forEach(J=>{J.visible=!0,J.material.color.set(M.chips==="tournament"?["#c6414f","#e1bc3e","#5b9c69","#4c73c5"][J.userData.edgeIndex%4]:n.chipEdgeColor(M.chips))}),Ie.forEach(({mat:J,n:ye})=>{J.userData.style!==M.chips&&(J.map?.dispose(),J.map=new Xt(n.chipCanvas(M.chips,ye)),J.map.colorSpace=yt,J.map.anisotropy=8,J.userData.style=M.chips,J.needsUpdate=!0)}),ge.forEach((J,ye)=>{J.userData.style!==M.cards&&(J.map?.dispose(),J.map=new Xt(n.cardCanvas(M.cards,ye)),J.map.colorSpace=yt,J.map.anisotropy=16,J.userData.style=M.cards,J.needsUpdate=!0)}),A.forEach(J=>J.visible=!0),I.forEach(J=>J.visible=!0),p.color.set(n.item("light",M.light).color),p.emissive.copy(p.color),g.color.copy(p.color).multiplyScalar(.075),g.emissive.copy(p.color),g.emissiveIntensity=.045,ue.userData.number!==M.number+M.region&&(ue.map?.dispose(),ue.map=new Xt(n.plateCanvas(M)),ue.userData.number=M.number+M.region,ue.needsUpdate=!0)}let us=new Rt({color:p.color.clone(),emissive:p.color.clone(),emissiveIntensity:.65,roughness:.5}),hr=new Fe;rn.add(hr);for(let M of[-1,1]){Ue(2.62,.09,.12,.025,u,-.03,.47,M*.76,hr);let E=m(new nt(2.48,.018,.075),us,-.03,.417,M*.76,hr);for(let G of[-1.13,1.06])Ue(.12,.16,.18,.018,u,G,.53,M*.76,hr)}let Lt=new Qr(p.color,.45,2,2);Lt.position.set(-1.9,2,.48),rn.add(Lt);let Zn=new Fe;i.add(Zn);let Ln=s("#161d22",.34,.56),Vi=s("#917252",.05,.86),Lr=new jt;[[-2.55,-.72],[-1.55,-1.03],[.25,-1.1],[.8,-.67],[1.42,-.24],[2.38,-.17],[2.38,.17],[1.42,.24],[.8,.67],[.25,1.1],[-1.55,1.03],[-2.55,.72]].forEach(([M,E],G)=>G?Lr.lineTo(M,E):Lr.moveTo(M,E)),Lr.closePath();let ia=m(new Vt(Lr,{depth:.055,bevelEnabled:!0,bevelThickness:.008,bevelSize:.012,bevelSegments:2}),Ln,0,.48,0,Zn);ia.rotation.x=Math.PI/2,Ue(3.85,.035,.24,.025,Vi,-.08,.395,0,Zn);for(let M of[-1.65,-.8,.15,1.2])for(let E of[-.075,.075]){let G=m(new Qe(.018,.018,.008,12),Ve,M,.373,E,Zn)}for(let M of[-1,1]){et([[-1.85,.4,M*.68],[-.8,.38,M*.79],[.3,.4,M*.82],[.8,.44,M*.51]],.025,Ln,Zn),et([[-1.85,.4,M*.33],[-.8,.37,M*.37],[.3,.4,M*.39],[.8,.44,M*.27]],.022,Ln,Zn);for(let E=0;E<3;E++){let G=Ue(.32,.11,.022,.008,Ln,.25+E*.19,.44,M*(.98-E*.1),Zn);G.rotation.y=M*-.24}}let an=new jt;an.moveTo(-2.65,.78),an.lineTo(-1.65,.44),an.lineTo(-1.65,.36),an.lineTo(-2.65,.53),an.closePath();for(let M=-3;M<=3;M++)m(new Vt(an,{depth:.022,bevelEnabled:!1}),Ln,0,0,M*.205,Zn);let Ai=m(new nt(1.04,.035,1.4),Ln,-2.15,.6,0,Zn);Ai.rotation.z=-.32;let On=new Fe;i.add(On);for(let M of[-1,1]){Ue(2.8,.4,.42,.12,a,-.16,.91,M*1.17,On),Ue(2.95,.075,.55,.035,He,-.12,.65,M*1.17,On),et([[-1.55,1.14,M*1.28],[-.2,1.17,M*1.35],[1.15,1.1,M*1.13]],.055,l,On),Ue(.1,.24,.27,.035,u,1.16,.94,M*1.18,On);for(let E=0;E<3;E++)Ue(.025,.19,.29,.008,l,.82-E*.16,1.1,M*1.39,On);et([[1.87,.65,M*.84],[2.18,.78,M*.74],[2.25,.84,0]],.06,l,On),Ue(.09,.48,.08,.025,Ve,-1.95,1.08,M*.67,On)}Ue(.48,.08,1.98,.035,He,-1.96,1.35,0,On),et([[-2.17,1.4,-.97],[-2.17,1.4,.97]],.025,l,On);let dn=new Fe;i.add(dn);let Kn=s("#e9bd68",.72,.25);for(let M of[-1,1]){m(new Ht(1,32,20),He,-.55,1.01,M*.88,dn).scale.set(1.15,.28,.34);let G=Ue(.12,.32,.45,.07,u,.42,1.04,M*.89,dn);for(let Q=0;Q<5;Q++)Ue(.23,.025,.35,.01,qe,-.4-Q*.16,1.27,M*.88,dn);et([[-1.62,.72,M*.95],[-.8,.69,M*1.22],[.35,.72,M*1.12],[.65,.79,M*.89]],.025,Kn,dn);for(let Q=0;Q<3;Q++){let O=Ue(.55,.035,.35,.02,He,1.58+Q*.17,.55+Q*.12,M*(.82+Q*.12),dn);O.rotation.z=-.2}}let En=new jt;En.moveTo(-1.9,1.2),En.lineTo(-1.6,1.92),En.lineTo(-.82,1.6),En.lineTo(-.6,1.23),En.closePath();let Ka=m(new Vt(En,{depth:.045,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:2,steps:1}),He,0,0,-.022,dn);et([[-1.9,1.2,0],[-1.6,1.92,0],[-.82,1.6,0]],.018,Kn,dn);let ps=s("#597480",.35,.13);ps.transparent=!0,ps.opacity=.42,ps.side=Bt,m(new Ht(1,48,24,0,Math.PI*2,0,Math.PI/2),ps,-.3,1.42,0,dn).scale.set(1.25,.52,.46);for(let M of[-1,1])et([[-1.48,1.43,M*.12],[-1,1.68,M*.39],[-.25,1.94,M*.33],[.6,1.64,M*.28],[.93,1.43,M*.12]],.025,He,dn);let mf=Kp(i,[Zn,...Object.values(Pe.windshield),...Object.values(Pe.mirrors),...ie.map(M=>M.group),hr,...Object.values(Pe.pedals),dn,St,gt,xt,Mt,...Object.values(Pe.seat)]),gf=Za;function yu(M){gf(M),On.visible=M.chassis==="club",On.position.y=rn.position.y,dn.visible=M.chassis==="aeroPrototype",dn.position.y=rn.position.y;let E=["formula","aeroPrototype"].includes(M.chassis),G=E?1.13:1;mf.set(E);let Q=hs([St],i);for(let O of Object.values(Pe.windshield))O.scale.z=E?.72:1,O.position.x=Zp(Q.max.x,O.userData.mountRearX),O.position.y=E?-.135:0;for(let{group:O,sign:he}of Ze)O.position.z=E?he*1.19*(Pl(.64)-1):0,O.position.y=E?-.122:0;q.visible=!E,Zn.visible=E,Zn.position.y=rn.position.y;for(let{group:O}of ie)O.position.z=O.userData.side*(E?1.365*Pl(O.position.x)+.045:M.chassis==="club"?1.44:1.39);hr.scale.z=E?.65:1,us.color.copy(p.color),us.emissive.copy(p.color);for(let O of[...It,...Ae])O.visible=!E;for(let O of Object.values(Pe.pedals))O.position.x=E?-.65:0,O.position.y=rn.position.y-.06;i.scale.x=1.24*G;for(let{wheelGroup:O}of X)O.scale.x/=G;Lt.color.copy(p.color)}return yu(e),{car:i,update:yu,measureClearance(){let M=hs([St],i),E=Object.values(Pe.windshield).find(G=>G.visible);return E?hs([E],i).min.x-M.max.x:null}}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new gi({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=yt,n.toneMapping=pi,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ws,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label",e.transport==="bicycle"?"\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u0432\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C":"\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new Gn,s=new sn(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new si("#c6d9ef","#44311e",1.25));for(let[te,k,Te,A,I]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let X=new Vn(te,k);X.position.set(Te,A,I),X.castShadow=te==="#fff0d0",X.shadow.bias=-2e-4,X.shadow.normalBias=.025,X.shadow.mapSize.set(2048,2048),X.shadow.camera.left=-5,X.shadow.camera.right=5,X.shadow.camera.top=5,X.shadow.camera.bottom=-5,i.add(X)}let a=new Gn;a.background=new Ye("#48505b");for(let[te,k,Te,A,I,X]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let H=new at(new nt(A,I,X),new yn({color:"#ffffff"}));H.position.set(te,k,Te),a.add(H)}let o=new Ar(n),l=o.fromScene(a,.05);i.environment=l.texture,i.environmentIntensity=1.5,a.traverse(te=>{te.geometry?.dispose(),te.material?.dispose()}),o.dispose();let c=new at(new Zt(30,30),new Zr({opacity:.34}));c.rotation.x=-Math.PI/2,c.receiveShadow=!0,i.add(c);let h=j0(i,e),u=new $n({transparent:!0,depthWrite:!1,side:Bt,toneMapped:!1,uniforms:{color:{value:new Ye(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=p.x*p.x+p.y*p.y;float halo=exp(-d*3.5);float core=exp(-d*11.);float a=(halo*.42+core*.20)*strength;gl_FragColor=vec4(color,a);}"}),d=new at(new Zt(7.2,3.8),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let p=[];for(let te of[-1.15,1.15])for(let k of[-.68,.68]){let Te=new $r(u.uniforms.color.value,3.5,3.4,Math.PI*.42,.9,1.5);Te.position.set(te,.36,k),Te.target.position.set(te,0,k),i.add(Te,Te.target),p.push(Te)}["bicycle","scooter","hoverboard"].includes(e.transport)&&(d.visible=!1,p.forEach(te=>te.visible=!1));let g=r.closest(".player-hall__room");t.night??=g?.dataset.theme==="midnight";function m(te){t.night=!!te;for(let Te of i.children)Te.isHemisphereLight&&(Te.intensity=te?.26:1.25),Te.isDirectionalLight&&(Te.userData.dayIntensity??=Te.intensity,Te.intensity=Te.userData.dayIntensity*(te?.13:1));i.environmentIntensity=te?.24:1.5;let k=t.neon??window.pokerGarageNeonBrightness?.()??1.5;u.uniforms.strength.value=(te?2.1:.95)*k,p.forEach(Te=>{Te.intensity=3.5*k*(te?1.6:1)}),t.snapshotOnly||P?.request()}let f=te=>{g&&(t.neon=window.pokerGarageNeonBrightness?.()??1.5,m(g.dataset.theme==="midnight"))};window.addEventListener("poker-garage-lighting",f);let v=null;function y(){if(!v){v=new Mn,h.car.updateWorldMatrix(!0,!0);let H=w=>{if(w.visible){w.geometry&&(w.geometry.computeBoundingBox(),v.union(w.geometry.boundingBox.clone().applyMatrix4(w.matrixWorld)));for(let N of w.children)H(N)}};H(h.car)}let te=v.getCenter(new S),k=new S(Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),Math.cos(t.yaw)*Math.cos(t.pitch)),Te=new S(Math.cos(t.yaw),0,-Math.sin(t.yaw)),A=new S().crossVectors(k,Te),I=Math.tan(s.fov*Math.PI/360),X=0;for(let H of[v.min.x,v.max.x])for(let w of[v.min.y,v.max.y])for(let N of[v.min.z,v.max.z]){let j=new S(H,w,N).sub(te);X=Math.max(X,Math.abs(j.dot(Te))/(I*s.aspect)+j.dot(k),Math.abs(j.dot(A))/I+j.dot(k))}X=Math.max(X*1.1,["bicycle","scooter","hoverboard"].includes(e.transport)?t.snapshotOnly?6.8:5.2:t.snapshotOnly?_?15:13:_?10.4:9),s.position.copy(te).addScaledVector(k,X),s.lookAt(te)}let _=["formula","formulaPro","formulaElite"].includes(e.frontBumper),x=te=>{_=["formula","formulaPro","formulaElite"].includes(te.frontBumper),h.update(te),v=null,u.uniforms.color.value.set(window.PokerGarage.item("light",te.light).color),p.forEach(k=>{k.color.copy(u.uniforms.color.value),k.position.y=.36+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[te.suspension]||0)*.86}),t.snapshotOnly||P?.request()};t.yaw??=.9,t.pitch??=.25,t.manual??=!0;let T=!1,b=null,P=null,B=()=>{let te=r.clientWidth,k=r.clientHeight;te&&k?(n.setSize(te,k,!1),s.aspect=te/k,s.updateProjectionMatrix(),t.snapshotOnly||P?.request()):r.isConnected||Oe()},U=new ResizeObserver(B);U.observe(r),B();let F=new di(1,1,{type:Er,depthBuffer:!0});F.samples=4;let R=new Gn,L=new sr(-1,1,1,-1,0,1),q=new $n({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:F.texture},stepSize:{value:new _e}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),W=new at(new Zt(2,2),q);R.add(W);function $(){let te=n.getDrawingBufferSize(new _e);(F.width!==te.x||F.height!==te.y)&&F.setSize(te.x,te.y),q.uniforms.stepSize.value.set(3/te.x,3/te.y),n.setRenderTarget(F),n.render(i,s),n.setRenderTarget(null),n.render(R,L)}let ae=te=>{te.button&&te.button!==0||(t.manual=!0,b={id:te.pointerId,x:te.clientX,y:te.clientY},r.setPointerCapture(te.pointerId),te.preventDefault())},Z=te=>{!b||b.id!==te.pointerId||(t.yaw-=(te.clientX-b.x)*.011,t.pitch=ff(t.pitch+(te.clientY-b.y)*.009,-.24,1.35),b.x=te.clientX,b.y=te.clientY,P.request(),te.preventDefault())},oe=te=>{b&&b.id===te.pointerId&&(b=null,r.hasPointerCapture(te.pointerId)&&r.releasePointerCapture(te.pointerId))},De=te=>{let k={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};k[te.key]&&(t.manual=!0,t.yaw+=k[te.key][0],t.pitch=ff(t.pitch+k[te.key][1],-.24,1.35),P.request(),te.preventDefault())};r.addEventListener("keydown",De),r.addEventListener("pointerdown",ae),r.addEventListener("pointermove",Z),r.addEventListener("pointerup",oe),r.addEventListener("pointercancel",oe),r.addEventListener("lostpointercapture",oe);function Oe(){T||(T=!0,window.removeEventListener("poker-garage-lighting",f),P?.dispose(),Ne.disconnect(),Me?.removeEventListener("close",Oe),U.disconnect(),r.removeEventListener("keydown",De),r.removeEventListener("pointerdown",ae),r.removeEventListener("pointermove",Z),r.removeEventListener("pointerup",oe),r.removeEventListener("pointercancel",oe),r.removeEventListener("lostpointercapture",oe),Yp(i),l.dispose(),F.dispose(),q.dispose(),W.geometry.dispose(),n.dispose(),n.forceContextLoss(),n.domElement.remove())}let Me=r.closest("dialog");Me?.addEventListener("close",Oe);function Ge(te){if(T)return;if(!r.isConnected||Me&&!Me.open){Oe();return}s.zoom=(t.previewScale||1)*(t.zoom||1),s.updateProjectionMatrix();let k=r.getBoundingClientRect();k.bottom>0&&k.top<innerHeight&&k.right>0&&k.left<innerWidth&&(h.animate?.(te),y(),$(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual))}let Ce=!0,Ne=new IntersectionObserver(te=>{Ce=te.some(k=>k.isIntersecting),Ce&&!t.snapshotOnly&&P?.request()});return Ne.observe(r),P=qp({render:Ge,active:()=>!!h.animate&&!t.snapshotOnly&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!T&&r.isConnected&&Ce&&(!Me||Me.open)}),m(t.night),t.snapshotOnly||P.request(),{update:x,setNight:m,dispose:Oe,state:t,invalidate:()=>P.request(),measureClearance:()=>h.measureClearance(),snapshot(){y(),$();let te=document.createElement("canvas");return te.width=n.domElement.width,te.height=n.domElement.height,te.getContext("2d").drawImage(n.domElement,0,0),te}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
