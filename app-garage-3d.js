(()=>{var od=0,Ac=1,ld=2;var Cc=1,Xs=2,zi=3,Ar=0,si=1,Ot=2,Cr=0,za=1,Ga=2,Rc=3,Ic=4,cd=5,js=100,hd=101,ud=102,dd=103,pd=104,fd=200,md=201,gd=202,vd=203,yd=204,_d=205,xd=206,Md=207,Td=208,bd=209,Sd=210,wd=211,Ed=212,Ad=213,Cd=214,rl=0,sl=1,al=2,ka=3,ol=4,ll=5,cl=6,hl=7,Rd=0,Id=1,Pd=2,cr=0,Ld=1,Dd=2,Nd=3,pi=4,Ud=5,Bd=6,Od=7,pc="attached",Fd="detached",Pc=300,qs=301,ts=302,ul=303,dl=304,Va=306,vn=1e3,_r=1001,Is=1002,ni=1003,pl=1004;var ns=1005;var Nn=1006,Ys=1007;var Qn=1008;var Gi=1009,Lc=1010,Dc=1011,Zs=1012,fl=1013,is=1014,fi=1015,Rr=1016,ml=1017,gl=1018,Ks=1020,Nc=35902,Uc=35899,zd=1021,Gd=1022,mi=1023,Ha=1026,Wa=1027,vl=1028,yl=1029,kd=1030,Bc=1031;var Oc=1033,_l=33776,xl=33777,Ml=33778,Tl=33779,Fc=35840,zc=35841,Gc=35842,kc=35843,Vc=36196,Hc=37492,Wc=37496,Xc=37808,jc=37809,qc=37810,Yc=37811,Zc=37812,Kc=37813,Jc=37814,$c=37815,Qc=37816,eh=37817,th=37818,nh=37819,ih=37820,rh=37821,sh=36492,ah=36494,oh=36495,lh=36283,ch=36284,hh=36285,uh=36286;var Gr=2300,kr=2301,Co=2302,fc=2400,mc=2401,gc=2402;var dh=0,Xa=1,Js=2;var $s=3201;var Vd=0,Hd=1,rs="",yt="srgb",Un="srgb-linear",va="linear",tn="srgb";var zr=7680;var Wd=512,Xd=513,jd=514,ph=515,qd=516,Yd=517,Zd=518,Kd=519,Ro=35044;var fh="300 es",tr=2e3,ya=2001;var nr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},On=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_u=1234567,Cs=Math.PI/180,Vr=180/Math.PI;function ui(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(On[255&r]+On[r>>8&255]+On[r>>16&255]+On[r>>24&255]+"-"+On[255&e]+On[e>>8&255]+"-"+On[e>>16&15|64]+On[e>>24&255]+"-"+On[63&t|128]+On[t>>8&255]+"-"+On[t>>16&255]+On[t>>24&255]+On[255&n]+On[n>>8&255]+On[n>>16&255]+On[n>>24&255]).toLowerCase()}function Ut(r,e,t){return Math.max(e,Math.min(t,r))}function vc(r,e){return(r%e+e)%e}function fa(r,e,t){return(1-t)*r+t*e}function Ei(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function en(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var mh={DEG2RAD:Cs,RAD2DEG:Vr,generateUUID:ui,clamp:Ut,euclideanModulo:vc,mapLinear:function(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)},inverseLerp:function(r,e,t){return r!==e?(t-r)/(e-r):0},lerp:fa,damp:function(r,e,t,n){return fa(r,e,1-Math.exp(-t*n))},pingpong:function(r,e=1){return e-Math.abs(vc(r,2*e)-e)},smoothstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*(3-2*r)},smootherstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*r*(r*(6*r-15)+10)},randInt:function(r,e){return r+Math.floor(Math.random()*(e-r+1))},randFloat:function(r,e){return r+Math.random()*(e-r)},randFloatSpread:function(r){return r*(.5-Math.random())},seededRandom:function(r){r!==void 0&&(_u=r);let e=_u+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(r){return r*Cs},radToDeg:function(r){return r*Vr},isPowerOfTwo:function(r){return!(r&r-1)&&r!==0},ceilPowerOfTwo:function(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))},floorPowerOfTwo:function(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))},setQuaternionFromProperEuler:function(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*h,c*u,c*d,o*l);break;case"YZY":r.set(c*d,o*h,c*u,o*l);break;case"ZXZ":r.set(c*u,c*d,o*h,o*l);break;case"XZX":r.set(o*h,c*g,c*p,o*l);break;case"YXY":r.set(c*p,o*h,c*g,o*l);break;case"ZYZ":r.set(c*g,c*p,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}},normalize:en,denormalize:Ei},be=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Cn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],g=s[a+2],m=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=g,void(e[t+3]=m);if(u!==m||c!==d||l!==p||h!==g){let f=1-o,v=c*d+l*p+h*g+u*m,y=v>=0?1:-1,_=1-v*v;if(_>Number.EPSILON){let T=Math.sqrt(_),b=Math.atan2(T,v*y);f=Math.sin(f*b)/T,o=Math.sin(o*b)/T}let x=o*y;if(c=c*f+d*x,l=l*f+p*x,h=h*f+g*x,u=u*f+m*x,f===1-o){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-o*p,e[t+2]=l*g+h*p+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),p=c(i/2),g=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ul.copy(this).projectOnVector(e),this.sub(Ul)}reflect(e){return this.sub(Ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ul=new w,xu=new Cn,Rt=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],m=i[0],f=i[3],v=i[6],y=i[1],_=i[4],x=i[7],T=i[2],b=i[5],R=i[8];return s[0]=a*m+o*y+c*T,s[3]=a*f+o*_+c*b,s[6]=a*v+o*x+c*R,s[1]=l*m+h*y+u*T,s[4]=l*f+h*_+u*b,s[7]=l*v+h*x+u*R,s[2]=d*m+p*y+g*T,s[5]=d*f+p*_+g*b,s[8]=d*v+p*x+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,p=l*s-a*c,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/g;return e[0]=u*m,e[1]=(i*l-h*n)*m,e[2]=(o*n-i*a)*m,e[3]=d*m,e[4]=(h*t-i*c)*m,e[5]=(i*s-o*t)*m,e[6]=p*m,e[7]=(n*c-l*t)*m,e[8]=(a*t-n*s)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Bl.makeScale(e,t)),this}rotate(e){return this.premultiply(Bl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Bl=new Rt;function gh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ps(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Jd(){let r=Ps("canvas");return r.style.display="block",r}var Mu={};function Ls(r){r in Mu||(Mu[r]=!0,console.warn(r))}function $d(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Tu=new Rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bu=new Rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vf(){let r={enabled:!0,workingColorSpace:Un,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===tn&&(i.r=er(i.r),i.g=er(i.g),i.b=er(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tn&&(i.r=Rs(i.r),i.g=Rs(i.g),i.b=Rs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?va:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ls("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ls("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Un]:{primaries:e,whitePoint:n,transfer:va,toXYZ:Tu,fromXYZ:bu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:tn,toXYZ:Tu,fromXYZ:bu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),r}var kt=vf();function er(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Rs(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var ms,Io=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ms===void 0&&(ms=Ps("canvas")),ms.width=e.width,ms.height=e.height;let i=ms.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ps("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*er(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*er(t[n]/255)):t[n]=er(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},yf=0,Ds=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ol(i[a].image)):s.push(Ol(i[a]))}else s=Ol(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ol(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Io.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var _f=0,Fl=new w,An=class r extends nr{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=ui(),this.name="",this.source=new Ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fl).x}get height(){return this.source.getSize(Fl).y}get depth(){return this.source.getSize(Fl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vn:e.x=e.x-Math.floor(e.x);break;case _r:e.x=e.x<0?0:1;break;case Is:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case vn:e.y=e.y-Math.floor(e.y);break;case _r:e.y=e.y<0?0:1;break;case Is:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};An.DEFAULT_IMAGE=null,An.DEFAULT_MAPPING=Pc,An.DEFAULT_ANISOTROPY=1;var qt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],m=c[2],f=c[6],v=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(g+f)<.1&&Math.abs(l+p+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,x=(p+1)/2,T=(v+1)/2,b=(h+d)/4,R=(u+m)/4,B=(g+f)/4;return _>x&&_>T?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=R/n):x>T?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=B/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=R/s,i=B/s),this.set(n,i,s,t),this}let y=Math.sqrt((f-g)*(f-g)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(u-m)/y,this.z=(d-h)/y,this.w=Math.acos((l+p+v-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this.w=Ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this.w=Ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Po=class extends nr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new An(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ds(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},di=class extends Po{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_a=class extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Lo=class extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bi):bi.fromBufferAttribute(s,a),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ja.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ja.copy(n.boundingBox)),Ja.applyMatrix4(e.matrixWorld),this.union(Ja)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sa),$a.subVectors(this.max,sa),gs.subVectors(e.a,sa),vs.subVectors(e.b,sa),ys.subVectors(e.c,sa),pr.subVectors(vs,gs),fr.subVectors(ys,vs),Ur.subVectors(gs,ys);let t=[0,-pr.z,pr.y,0,-fr.z,fr.y,0,-Ur.z,Ur.y,pr.z,0,-pr.x,fr.z,0,-fr.x,Ur.z,0,-Ur.x,-pr.y,pr.x,0,-fr.y,fr.x,0,-Ur.y,Ur.x,0];return!!zl(t,gs,vs,ys,$a)&&(t=[1,0,0,0,1,0,0,0,1],!!zl(t,gs,vs,ys,$a)&&(Qa.crossVectors(pr,fr),t=[Qa.x,Qa.y,Qa.z],zl(t,gs,vs,ys,$a)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(bi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Xi=[new w,new w,new w,new w,new w,new w,new w,new w],bi=new w,Ja=new Mn,gs=new w,vs=new w,ys=new w,pr=new w,fr=new w,Ur=new w,sa=new w,$a=new w,Qa=new w,Br=new w;function zl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Br.fromArray(r,s);let o=i.x*Math.abs(Br.x)+i.y*Math.abs(Br.y)+i.z*Math.abs(Br.z),c=e.dot(Br),l=t.dot(Br),h=n.dot(Br);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var xf=new Mn,aa=new w,Gl=new w,Xn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):xf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);let t=aa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(aa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(Gl)),this.expandByPoint(aa.copy(e.center).sub(Gl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ji=new w,kl=new w,eo=new w,mr=new w,Vl=new w,to=new w,Hl=new w,Hr=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ji.copy(this.origin).addScaledVector(this.direction,t),ji.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){kl.copy(e).add(t).multiplyScalar(.5),eo.copy(t).sub(e).normalize(),mr.copy(this.origin).sub(kl);let s=.5*e.distanceTo(t),a=-this.direction.dot(eo),o=mr.dot(this.direction),c=-mr.dot(eo),l=mr.lengthSq(),h=Math.abs(1-a*a),u,d,p,g;if(h>0)if(u=a*c-o,d=a*o-c,g=s*h,u>=0)if(d>=-g)if(d<=g){let m=1/h;u*=m,d*=m,p=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(kl).addScaledVector(eo,d),p}intersectSphere(e,t){ji.subVectors(e.center,this.origin);let n=ji.dot(this.direction),i=ji.dot(ji)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,ji)!==null}intersectTriangle(e,t,n,i,s){Vl.subVectors(t,e),to.subVectors(n,e),Hl.crossVectors(Vl,to);let a,o=this.direction.dot(Hl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}mr.subVectors(this.origin,e);let c=a*this.direction.dot(to.crossVectors(mr,to));if(c<0)return null;let l=a*this.direction.dot(Vl.cross(mr));if(l<0||c+l>o)return null;let h=-a*mr.dot(Hl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ct=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,p,g,m,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,p,g,m,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,p,g,m,f){let v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=a,v[9]=o,v[13]=c,v[2]=l,v[6]=h,v[10]=u,v[14]=d,v[3]=p,v[7]=g,v[11]=m,v[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/_s.setFromMatrixColumn(e,0).length(),s=1/_s.setFromMatrixColumn(e,1).length(),a=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,g=o*h,m=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-m*l,t[9]=-o*c,t[2]=m-d*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,g=l*h,m=l*u;t[0]=d+m*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=m+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,g=l*h,m=l*u;t[0]=d-m*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=m-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,p=a*u,g=o*h,m=o*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+m,t[1]=c*u,t[5]=m*l+d,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,p=a*l,g=o*c,m=o*l;t[0]=c*h,t[4]=m-d*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-m*u}else if(e.order==="XZY"){let d=a*c,p=a*l,g=o*c,m=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+m,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mf,e,Tf)}lookAt(e,t,n){let i=this.elements;return ei.subVectors(e,t),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),gr.crossVectors(n,ei),gr.lengthSq()===0&&(Math.abs(n.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),gr.crossVectors(n,ei)),gr.normalize(),no.crossVectors(ei,gr),i[0]=gr.x,i[4]=no.x,i[8]=ei.x,i[1]=gr.y,i[5]=no.y,i[9]=ei.y,i[2]=gr.z,i[6]=no.z,i[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],m=n[6],f=n[10],v=n[14],y=n[3],_=n[7],x=n[11],T=n[15],b=i[0],R=i[4],B=i[8],U=i[12],F=i[1],I=i[5],L=i[9],q=i[13],W=i[2],re=i[6],ce=i[10],Y=i[14],he=i[3],Ae=i[7],ze=i[11],Pe=i[15];return s[0]=a*b+o*F+c*W+l*he,s[4]=a*R+o*I+c*re+l*Ae,s[8]=a*B+o*L+c*ce+l*ze,s[12]=a*U+o*q+c*Y+l*Pe,s[1]=h*b+u*F+d*W+p*he,s[5]=h*R+u*I+d*re+p*Ae,s[9]=h*B+u*L+d*ce+p*ze,s[13]=h*U+u*q+d*Y+p*Pe,s[2]=g*b+m*F+f*W+v*he,s[6]=g*R+m*I+f*re+v*Ae,s[10]=g*B+m*L+f*ce+v*ze,s[14]=g*U+m*q+f*Y+v*Pe,s[3]=y*b+_*F+x*W+T*he,s[7]=y*R+_*I+x*re+T*Ae,s[11]=y*B+_*L+x*ce+T*ze,s[15]=y*U+_*q+x*Y+T*Pe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*p-n*c*p)+e[7]*(+t*c*p-t*l*d+s*a*d-i*a*p+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*p-s*a*u+n*a*p+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],m=e[13],f=e[14],v=e[15],y=u*f*l-m*d*l+m*c*p-o*f*p-u*c*v+o*d*v,_=g*d*l-h*f*l-g*c*p+a*f*p+h*c*v-a*d*v,x=h*m*l-g*u*l+g*o*p-a*m*p-h*o*v+a*u*v,T=g*u*c-h*m*c-g*o*d+a*m*d+h*o*f-a*u*f,b=t*y+n*_+i*x+s*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/b;return e[0]=y*R,e[1]=(m*d*s-u*f*s-m*i*p+n*f*p+u*i*v-n*d*v)*R,e[2]=(o*f*s-m*c*s+m*i*l-n*f*l-o*i*v+n*c*v)*R,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*p-n*c*p)*R,e[4]=_*R,e[5]=(h*f*s-g*d*s+g*i*p-t*f*p-h*i*v+t*d*v)*R,e[6]=(g*c*s-a*f*s-g*i*l+t*f*l+a*i*v-t*c*v)*R,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*p+t*c*p)*R,e[8]=x*R,e[9]=(g*u*s-h*m*s-g*n*p+t*m*p+h*n*v-t*u*v)*R,e[10]=(a*m*s-g*o*s+g*n*l-t*m*l-a*n*v+t*o*v)*R,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*p-t*o*p)*R,e[12]=T*R,e[13]=(h*m*i-g*u*i+g*n*d-t*m*d-h*n*f+t*u*f)*R,e[14]=(g*o*i-a*m*i-g*n*c+t*m*c+a*n*f-t*o*f)*R,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,p=s*h,g=s*u,m=a*h,f=a*u,v=o*u,y=c*l,_=c*h,x=c*u,T=n.x,b=n.y,R=n.z;return i[0]=(1-(m+v))*T,i[1]=(p+x)*T,i[2]=(g-_)*T,i[3]=0,i[4]=(p-x)*b,i[5]=(1-(d+v))*b,i[6]=(f+y)*b,i[7]=0,i[8]=(g+_)*R,i[9]=(f-y)*R,i[10]=(1-(d+m))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=_s.set(i[0],i[1],i[2]).length(),a=_s.set(i[4],i[5],i[6]).length(),o=_s.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Si.copy(this);let c=1/s,l=1/a,h=1/o;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=l,Si.elements[5]*=l,Si.elements[6]*=l,Si.elements[8]*=h,Si.elements[9]*=h,Si.elements[10]*=h,t.setFromRotationMatrix(Si),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),g,m;if(c)g=s/(a-s),m=a*s/(a-s);else if(o===tr)g=-(a+s)/(a-s),m=-2*a*s/(a-s);else{if(o!==ya)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);g=-a/(a-s),m=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),g,m;if(c)g=1/(a-s),m=a/(a-s);else if(o===tr)g=-2/(a-s),m=-(a+s)/(a-s);else{if(o!==ya)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);g=-1/(a-s),m=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_s=new w,Si=new ct,Mf=new w(0,0,0),Tf=new w(1,1,1),gr=new w,no=new w,ei=new w,Su=new ct,wu=new Cn,Ai=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Su,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wu.setFromEuler(this),this.setFromQuaternion(wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ai.DEFAULT_ORDER="XYZ";var xa=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},bf=0,Eu=new w,xs=new Cn,qi=new ct,io=new w,oa=new w,Sf=new w,wf=new Cn,Au=new w(1,0,0),Cu=new w(0,1,0),Ru=new w(0,0,1),Iu={type:"added"},Ef={type:"removed"},Ms={type:"childadded",child:null},Wl={type:"childremoved",child:null},dn=class r extends nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new Ai,n=new Cn,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new Rt}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Au,e)}rotateY(e){return this.rotateOnAxis(Cu,e)}rotateZ(e){return this.rotateOnAxis(Ru,e)}translateOnAxis(e,t){return Eu.copy(e).applyQuaternion(this.quaternion),this.position.add(Eu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Au,e)}translateY(e){return this.translateOnAxis(Cu,e)}translateZ(e){return this.translateOnAxis(Ru,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?io.copy(e):io.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qi.lookAt(oa,io,this.up):qi.lookAt(io,oa,this.up),this.quaternion.setFromRotationMatrix(qi),i&&(qi.extractRotation(i.matrixWorld),xs.setFromRotationMatrix(qi),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Iu),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ef),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qi.multiply(e.parent.matrixWorld)),e.applyMatrix4(qi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Iu),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,e,Sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};dn.DEFAULT_UP=new w(0,1,0),dn.DEFAULT_MATRIX_AUTO_UPDATE=!0,dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wi=new w,Yi=new w,Xl=new w,Zi=new w,Ts=new w,bs=new w,Pu=new w,jl=new w,ql=new w,Yl=new w,Zl=new qt,Kl=new qt,Jl=new qt,Ji=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),wi.subVectors(e,t),i.cross(wi);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){wi.subVectors(i,t),Yi.subVectors(n,t),Xl.subVectors(e,t);let a=wi.dot(wi),o=wi.dot(Yi),c=wi.dot(Xl),l=Yi.dot(Yi),h=Yi.dot(Xl),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(l*c-o*h)*d,g=(a*h-o*c)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Zi)!==null&&Zi.x>=0&&Zi.y>=0&&Zi.x+Zi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,Zi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zi.x),c.addScaledVector(a,Zi.y),c.addScaledVector(o,Zi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Zl.setScalar(0),Kl.setScalar(0),Jl.setScalar(0),Zl.fromBufferAttribute(e,t),Kl.fromBufferAttribute(e,n),Jl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Zl,s.x),a.addScaledVector(Kl,s.y),a.addScaledVector(Jl,s.z),a}static isFrontFacing(e,t,n,i){return wi.subVectors(n,t),Yi.subVectors(e,t),wi.cross(Yi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wi.subVectors(this.c,this.b),Yi.subVectors(this.a,this.b),.5*wi.cross(Yi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Ts.subVectors(i,n),bs.subVectors(s,n),jl.subVectors(e,n);let c=Ts.dot(jl),l=bs.dot(jl);if(c<=0&&l<=0)return t.copy(n);ql.subVectors(e,i);let h=Ts.dot(ql),u=bs.dot(ql);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ts,a);Yl.subVectors(e,s);let p=Ts.dot(Yl),g=bs.dot(Yl);if(g>=0&&p<=g)return t.copy(s);let m=p*l-c*g;if(m<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(bs,o);let f=h*g-p*u;if(f<=0&&u-h>=0&&p-g>=0)return Pu.subVectors(s,i),o=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(Pu,o);let v=1/(f+m+d);return a=m*v,o=d*v,t.copy(n).addScaledVector(Ts,a).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},ro={h:0,s:0,l:0};function $l(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,kt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=kt.workingColorSpace){return this.r=e,this.g=t,this.b=n,kt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=kt.workingColorSpace){if(e=vc(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=$l(a,s,e+1/3),this.g=$l(a,s,e),this.b=$l(a,s,e-1/3)}return kt.colorSpaceToWorking(this,i),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=Qd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}copyLinearToSRGB(e){return this.r=Rs(e.r),this.g=Rs(e.g),this.b=Rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return kt.workingToColorSpace(Fn.copy(this),e),65536*Math.round(Ut(255*Fn.r,0,255))+256*Math.round(Ut(255*Fn.g,0,255))+Math.round(Ut(255*Fn.b,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt.workingColorSpace){kt.workingToColorSpace(Fn.copy(this),t);let n=Fn.r,i=Fn.g,s=Fn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=kt.workingColorSpace){return kt.workingToColorSpace(Fn.copy(this),t),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=yt){kt.workingToColorSpace(Fn.copy(this),e);let t=Fn.r,n=Fn.g,i=Fn.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+t,vr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vr),e.getHSL(ro);let n=fa(vr.h,ro.h,t),i=fa(vr.s,ro.s,t),s=fa(vr.l,ro.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fn=new Je;Je.NAMES=Qd;var Af=0,jn=class extends nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zr,this.stencilZFail=zr,this.stencilZPass=zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},yn=class extends jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},q0=Cf();function Cf(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Sn=new w,so=new be,Rf=0,pn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ro,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)so.fromBufferAttribute(this,t),so.applyMatrix3(e),this.setXY(t,so.x,so.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix3(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),i=en(i,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),e}};var Wr=class extends pn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ma=class extends pn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ee=class extends pn{constructor(e,t,n){super(new Float32Array(e),t,n)}},If=0,hi=new ct,Ql=new dn,Ss=new w,ti=new Mn,la=new Mn,Dn=new w,ut=class r extends nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?Ma:Wr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Rt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ee(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];ti.setFromBufferAttribute(s),this.morphTargetsRelative?(Dn.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(Dn),Dn.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(Dn)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(ti.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];la.setFromBufferAttribute(o),this.morphTargetsRelative?(Dn.addVectors(ti.min,la.min),ti.expandByPoint(Dn),Dn.addVectors(ti.max,la.max),ti.expandByPoint(Dn)):(ti.expandByPoint(la.min),ti.expandByPoint(la.max))}ti.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Dn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Dn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Dn.fromBufferAttribute(o,l),c&&(Ss.fromBufferAttribute(e,l),Dn.add(Ss)),i=Math.max(i,n.distanceToSquared(Dn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let B=0;B<n.count;B++)o[B]=new w,c[B]=new w;let l=new w,h=new w,u=new w,d=new be,p=new be,g=new be,m=new w,f=new w;function v(B,U,F){l.fromBufferAttribute(n,B),h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,F),d.fromBufferAttribute(s,B),p.fromBufferAttribute(s,U),g.fromBufferAttribute(s,F),h.sub(l),u.sub(l),p.sub(d),g.sub(d);let I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(m.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(I),f.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),o[B].add(m),o[U].add(m),o[F].add(m),c[B].add(f),c[U].add(f),c[F].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let B=0,U=y.length;B<U;++B){let F=y[B],I=F.start;for(let L=I,q=I+F.count;L<q;L+=3)v(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let _=new w,x=new w,T=new w,b=new w;function R(B){T.fromBufferAttribute(i,B),b.copy(T);let U=o[B];_.copy(U),_.sub(T.multiplyScalar(T.dot(U))).normalize(),x.crossVectors(b,U);let F=x.dot(c[B])<0?-1:1;a.setXYZW(B,_.x,_.y,_.z,F)}for(let B=0,U=y.length;B<U;++B){let F=y[B],I=F.start;for(let L=I,q=I+F.count;L<q;L+=3)R(e.getX(L+0)),R(e.getX(L+1)),R(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),m=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dn.fromBufferAttribute(e,t),Dn.normalize(),e.setXYZ(t,Dn.x,Dn.y,Dn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let m=0,f=c.length;m<f;m++){p=o.isInterleavedBufferAttribute?c[m]*o.data.stride+o.offset:c[m]*h;for(let v=0;v<h;v++)d[g++]=l[p++]}return new pn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lu=new ct,Or=new Hr,ao=new Xn,Du=new w,oo=new w,lo=new w,co=new w,ec=new w,ho=new w,Nu=new w,uo=new w,ht=class extends dn{constructor(e=new ut,t=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){ho.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(ec.fromBufferAttribute(u,e),a?ho.addScaledVector(ec,h):ho.addScaledVector(ec.sub(t),h))}t.add(ho)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(s),Or.copy(e.ray).recast(e.near),ao.containsPoint(Or.origin)===!1&&(Or.intersectSphere(ao,Du)===null||Or.origin.distanceToSquared(Du)>(e.far-e.near)**2))return;Lu.copy(s).invert(),Or.copy(e.ray).applyMatrix4(Lu),n.boundingBox!==null&&Or.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Or)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let f=d[g],v=a[f.materialIndex];for(let y=Math.max(f.start,p.start),_=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));y<_;y+=3)i=po(this,v,e,n,l,h,u,o.getX(y),o.getX(y+1),o.getX(y+2)),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);g<m;g+=3)i=po(this,a,e,n,l,h,u,o.getX(g),o.getX(g+1),o.getX(g+2)),i&&(i.faceIndex=Math.floor(g/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let f=d[g],v=a[f.materialIndex];for(let y=Math.max(f.start,p.start),_=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));y<_;y+=3)i=po(this,v,e,n,l,h,u,y,y+1,y+2),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let g=Math.max(0,p.start),m=Math.min(c.count,p.start+p.count);g<m;g+=3)i=po(this,a,e,n,l,h,u,g,g+1,g+2),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}};function po(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,oo),r.getVertexPosition(c,lo),r.getVertexPosition(l,co);let h=(function(u,d,p,g,m,f,v,y){let _;if(_=d.side===1?g.intersectTriangle(v,f,m,!0,y):g.intersectTriangle(m,f,v,d.side===0,y),_===null)return null;uo.copy(y),uo.applyMatrix4(u.matrixWorld);let x=p.ray.origin.distanceTo(uo);return x<p.near||x>p.far?null:{distance:x,point:uo.clone(),object:u}})(r,e,t,n,oo,lo,co,Nu);if(h){let u=new w;Ji.getBarycoord(Nu,oo,lo,co,u),i&&(h.uv=Ji.getInterpolatedAttribute(i,o,c,l,u,new be)),s&&(h.uv1=Ji.getInterpolatedAttribute(s,o,c,l,u,new be)),a&&(h.normal=Ji.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};Ji.getNormal(oo,lo,co,d.normal),h.face=d,h.barycoord=u}return h}var at=class r extends ut{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,p=0;function g(m,f,v,y,_,x,T,b,R,B,U){let F=x/R,I=T/B,L=x/2,q=T/2,W=b/2,re=R+1,ce=B+1,Y=0,he=0,Ae=new w;for(let ze=0;ze<ce;ze++){let Pe=ze*I-q;for(let We=0;We<re;We++){let Le=We*F-L;Ae[m]=Le*y,Ae[f]=Pe*_,Ae[v]=W,l.push(Ae.x,Ae.y,Ae.z),Ae[m]=0,Ae[f]=0,Ae[v]=b>0?1:-1,h.push(Ae.x,Ae.y,Ae.z),u.push(We/R),u.push(1-ze/B),Y+=1}}for(let ze=0;ze<B;ze++)for(let Pe=0;Pe<R;Pe++){let We=d+Pe+re*ze,Le=d+Pe+re*(ze+1),_e=d+(Pe+1)+re*(ze+1),$=d+(Pe+1)+re*ze;c.push(We,Le,$),c.push(Le,_e,$),he+=6}o.addGroup(p,he,U),p+=he,d+=Y}g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ee(l,3)),this.setAttribute("normal",new Ee(h,3)),this.setAttribute("uv",new Ee(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ss(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vn(r){let e={};for(let t=0;t<r.length;t++){let n=ss(r[t]);for(let i in n)e[i]=n[i]}return e}function vh(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:kt.workingColorSpace}var ep={clone:ss,merge:Vn},Jn=class extends jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ns=class extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=tr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},yr=new w,Uu=new be,Bu=new be,rn=class extends Ns{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Vr*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Cs*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Vr*Math.atan(Math.tan(.5*Cs*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yr.x,yr.y).multiplyScalar(-e/yr.z),yr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yr.x,yr.y).multiplyScalar(-e/yr.z)}getViewSize(e,t){return this.getViewBounds(e,Uu,Bu),t.subVectors(Bu,Uu)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Cs*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ws=-90,Do=class extends dn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new rn(ws,1,e,t);i.layers=this.layers,this.add(i);let s=new rn(ws,1,e,t);s.layers=this.layers,this.add(s);let a=new rn(ws,1,e,t);a.layers=this.layers,this.add(a);let o=new rn(ws,1,e,t);o.layers=this.layers,this.add(o);let c=new rn(ws,1,e,t);c.layers=this.layers,this.add(c);let l=new rn(ws,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===tr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==ya)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ta=class extends An{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},No=class extends di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ta(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new at(5,5,5),s=new Jn({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ht(i,s),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=Nn),new Do(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ge=class extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Pf={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let m of e.hand.values()){let f=t.getJointPose(m,n),v=this._getHandJoint(l,m);f!==null&&(v.matrix.fromArray(f.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=f.radius),v.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pf)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ge;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var zn=class extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ro,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Wn=new w,Os=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyMatrix4(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyNormalMatrix(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.transformDirection(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array),i=en(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array),i=en(i,this.array),s=en(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new pn(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Y0=new w,Z0=new w,K0=new w,J0=new be,$0=new be,Q0=new ct,eg=new w,tg=new w,ng=new w,ig=new be,rg=new be,sg=new be;var ag=new w,og=new w;var Ou=new w,Fu=new qt,zu=new qt,Lf=new w,Gu=new ct,fo=new w,tc=new Xn,ku=new ct,nc=new Hr,Xr=class extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=pc,this.bindMatrix=new ct,this.bindMatrixInverse=new ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fo),this.boundingBox.expandByPoint(fo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Xn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fo),this.boundingSphere.expandByPoint(fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tc.copy(this.boundingSphere),tc.applyMatrix4(i),e.ray.intersectsSphere(tc)!==!1&&(ku.copy(i).invert(),nc.copy(e.ray).applyMatrix4(ku),this.boundingBox!==null&&nc.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,nc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new qt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===pc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Fu.fromBufferAttribute(i.attributes.skinIndex,e),zu.fromBufferAttribute(i.attributes.skinWeight,e),Ou.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=zu.getComponent(s);if(a!==0){let o=Fu.getComponent(s);Gu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Lf.copy(Ou).applyMatrix4(Gu),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},xr=class extends dn{constructor(){super(),this.isBone=!0,this.type="Bone"}},ir=class extends An{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vu=new ct,Df=new ct,jr=class r{constructor(e=[],t=[]){this.uuid=ui(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ct)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ct;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Df;Vu.multiplyMatrices(o,t[s]),Vu.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ir(t,e,e,mi,fi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new xr),this.bones.push(a),this.boneInverses.push(new ct().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Mr=class extends pn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Es=new ct,Hu=new ct,mo=[],Wu=new Mn,Nf=new ct,ca=new ht,ha=new Xn,qr=class extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mr(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Nf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),Wu.copy(e.boundingBox).applyMatrix4(Es),this.boundingBox.union(Wu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),ha.copy(e.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(ha)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ca.geometry=this.geometry,ca.material=this.material,ca.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ha.copy(this.boundingSphere),ha.applyMatrix4(n),e.ray.intersectsSphere(ha)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Es),Hu.multiplyMatrices(n,Es),ca.matrixWorld=Hu,ca.raycast(e,mo);for(let a=0,o=mo.length;a<o;a++){let c=mo[a];c.instanceId=s,c.object=this,t.push(c)}mo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Mr(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ir(new Float32Array(i*this.count),i,this.count,vl,fi));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ic=new w,Uf=new w,Bf=new Rt,Li=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ic.subVectors(n,t).cross(Uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ic),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Bf.getNormalMatrix(e),i=this.coplanarPoint(ic).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fr=new Xn,Of=new be(.5,.5),go=new w,Tr=class{constructor(e=new Li,t=new Li,n=new Li,i=new Li,s=new Li,a=new Li){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],p=s[7],g=s[8],m=s[9],f=s[10],v=s[11],y=s[12],_=s[13],x=s[14],T=s[15];if(i[0].setComponents(l-a,p-h,v-g,T-y).normalize(),i[1].setComponents(l+a,p+h,v+g,T+y).normalize(),i[2].setComponents(l+o,p+u,v+m,T+_).normalize(),i[3].setComponents(l-o,p-u,v-m,T-_).normalize(),n)i[4].setComponents(c,d,f,x).normalize(),i[5].setComponents(l-c,p-d,v-f,T-x).normalize();else if(i[4].setComponents(l-c,p-d,v-f,T-x).normalize(),t===tr)i[5].setComponents(l+c,p+d,v+f,T+x).normalize();else{if(t!==ya)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fr)}intersectsSprite(e){Fr.center.set(0,0,0);let t=Of.distanceTo(e.center);return Fr.radius=.7071067811865476+t,Fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(go.x=i.normal.x>0?e.max.x:e.min.x,go.y=i.normal.y>0?e.max.y:e.min.y,go.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ii=new ct,Pi=new Tr,Uo=class r{constructor(){this.coordinateSystem=tr}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ii.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Pi.setFromProjectionMatrix(Ii,i.coordinateSystem,i.reversedDepth),Pi.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ii.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Pi.setFromProjectionMatrix(Ii,i.coordinateSystem,i.reversedDepth),Pi.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ii.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Pi.setFromProjectionMatrix(Ii,i.coordinateSystem,i.reversedDepth),Pi.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ii.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Pi.setFromProjectionMatrix(Ii,i.coordinateSystem,i.reversedDepth),Pi.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Ii.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Pi.setFromProjectionMatrix(Ii,i.coordinateSystem,i.reversedDepth),Pi.containsPoint(e))return!0}return!1}clone(){return new r}};var yc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},lg=new ct,cg=new Je(1,1,1),hg=new Tr,ug=new Uo,dg=new Mn,pg=new Xn,fg=new w,mg=new w,gg=new w,vg=new yc,yg=new ht;var br=class extends jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Bo=new w,Oo=new w,Xu=new ct,ua=new Hr,vo=new Xn,rc=new w,ju=new w,Yr=class extends dn{constructor(e=new ut,t=new br){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Bo.fromBufferAttribute(t,i-1),Oo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Bo.distanceTo(Oo);e.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(i),vo.radius+=s,e.ray.intersectsSphere(vo)===!1)return;Xu.copy(i).invert(),ua.copy(e.ray).applyMatrix4(Xu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,m=p-1;g<m;g+=l){let f=h.getX(g),v=h.getX(g+1),y=yo(this,e,ua,c,f,v,g);y&&t.push(y)}if(this.isLineLoop){let g=h.getX(p-1),m=h.getX(d),f=yo(this,e,ua,c,g,m,p-1);f&&t.push(f)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,m=p-1;g<m;g+=l){let f=yo(this,e,ua,c,g,g+1,g);f&&t.push(f)}if(this.isLineLoop){let g=yo(this,e,ua,c,p-1,d,p-1);g&&t.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function yo(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(Bo.fromBufferAttribute(o,i),Oo.fromBufferAttribute(o,s),t.distanceSqToSegment(Bo,Oo,rc,ju)>n)return;rc.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(rc);return c<e.near||c>e.far?void 0:{distance:c,point:ju.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var qu=new w,Yu=new w,Zr=class extends Yr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)qu.fromBufferAttribute(t,i),Yu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+qu.distanceTo(Yu);e.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ba=class extends Yr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Fs=class extends jn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Zu=new ct,_c=new Hr,_o=new Xn,xo=new w,Sa=class extends dn{constructor(e=new ut,t=new Fs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(i),_o.radius+=s,e.ray.intersectsSphere(_o)===!1)return;Zu.copy(i).invert(),_c.copy(e.ray).applyMatrix4(Zu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);u<d;u++){let p=l.getX(u);xo.fromBufferAttribute(h,p),Ku(xo,p,c,i,e,t,this)}else for(let u=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);u<d;u++)xo.fromBufferAttribute(h,u),Ku(xo,u,c,i,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Ku(r,e,t,n,i,s,a){let o=_c.distanceSqToPoint(r);if(o<t){let c=new w;_c.closestPointToPoint(r,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Wt=class extends An{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},wa=class extends An{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==Ha&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ds(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ea=class extends An{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},zs=class r extends ut{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,g=2*n+s,m=i+1,f=new w,v=new w;for(let y=0;y<=g;y++){let _=0,x=0,T=0,b=0;if(y<=n){let U=y/n,F=U*Math.PI/2;x=-h-e*Math.cos(F),T=e*Math.sin(F),b=-e*Math.cos(F),_=U*u}else if(y<=n+s){let U=(y-n)/s;x=U*t-h,T=e,b=0,_=u+U*d}else{let U=(y-n-s)/n,F=U*Math.PI/2;x=h+e*Math.sin(F),T=e*Math.cos(F),b=e*Math.sin(F),_=u+d+U*u}let R=Math.max(0,Math.min(1,_/p)),B=0;y===0?B=.5/i:y===g&&(B=-.5/i);for(let U=0;U<=i;U++){let F=U/i,I=F*Math.PI*2,L=Math.sin(I),q=Math.cos(I);v.x=-T*q,v.y=x,v.z=T*L,o.push(v.x,v.y,v.z),f.set(-T*q,b,T*L),f.normalize(),c.push(f.x,f.y,f.z),l.push(F+B,R)}if(y>0){let U=(y-1)*m;for(let F=0;F<i;F++){let I=U+F,L=U+F+1,q=y*m+F,W=y*m+F+1;a.push(I,L,q),a.push(L,W,q)}}}this.setIndex(a),this.setAttribute("position",new Ee(o,3)),this.setAttribute("normal",new Ee(c,3)),this.setAttribute("uv",new Ee(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},$n=class r extends ut{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new be;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ee(a,3)),this.setAttribute("normal",new Ee(o,3)),this.setAttribute("uv",new Ee(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},it=class r extends ut{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],g=0,m=[],f=n/2,v=0;function y(_){let x=g,T=new be,b=new w,R=0,B=_===!0?e:t,U=_===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,f*U,0),d.push(0,U,0),p.push(.5,.5),g++;let F=g;for(let I=0;I<=i;I++){let L=I/i*c+o,q=Math.cos(L),W=Math.sin(L);b.x=B*W,b.y=f*U,b.z=B*q,u.push(b.x,b.y,b.z),d.push(0,U,0),T.x=.5*q+.5,T.y=.5*W*U+.5,p.push(T.x,T.y),g++}for(let I=0;I<i;I++){let L=x+I,q=F+I;_===!0?h.push(q,q+1,L):h.push(q+1,q,L),R+=3}l.addGroup(v,R,_===!0?1:2),v+=R}(function(){let _=new w,x=new w,T=0,b=(t-e)/n;for(let R=0;R<=s;R++){let B=[],U=R/s,F=U*(t-e)+e;for(let I=0;I<=i;I++){let L=I/i,q=L*c+o,W=Math.sin(q),re=Math.cos(q);x.x=F*W,x.y=-U*n+f,x.z=F*re,u.push(x.x,x.y,x.z),_.set(W,b,re).normalize(),d.push(_.x,_.y,_.z),p.push(L,1-U),B.push(g++)}m.push(B)}for(let R=0;R<i;R++)for(let B=0;B<s;B++){let U=m[B][R],F=m[B+1][R],I=m[B+1][R+1],L=m[B][R+1];(e>0||B!==0)&&(h.push(U,F,L),T+=3),(t>0||B!==s-1)&&(h.push(F,I,L),T+=3)}l.addGroup(v,T,0),v+=T})(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ee(u,3)),this.setAttribute("normal",new Ee(d,3)),this.setAttribute("uv",new Ee(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Gs=class r extends it{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Sr=class r extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(p,g,m,f){let v=f+1,y=[];for(let _=0;_<=v;_++){y[_]=[];let x=p.clone().lerp(m,_/v),T=g.clone().lerp(m,_/v),b=v-_;for(let R=0;R<=b;R++)y[_][R]=R===0&&_===v?x:x.clone().lerp(T,R/b)}for(let _=0;_<v;_++)for(let x=0;x<2*(v-_)-1;x++){let T=Math.floor(x/2);x%2==0?(c(y[_][T+1]),c(y[_+1][T]),c(y[_][T])):(c(y[_][T+1]),c(y[_+1][T+1]),c(y[_+1][T]))}}function c(p){s.push(p.x,p.y,p.z)}function l(p,g){let m=3*p;g.x=e[m+0],g.y=e[m+1],g.z=e[m+2]}function h(p,g,m,f){f<0&&p.x===1&&(a[g]=p.x-1),m.x===0&&m.z===0&&(a[g]=f/2/Math.PI+.5)}function u(p){return Math.atan2(p.z,-p.x)}function d(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let g=new w,m=new w,f=new w;for(let v=0;v<t.length;v+=3)l(t[v+0],g),l(t[v+1],m),l(t[v+2],f),o(g,m,f,p)})(i),(function(p){let g=new w;for(let m=0;m<s.length;m+=3)g.x=s[m+0],g.y=s[m+1],g.z=s[m+2],g.normalize().multiplyScalar(p),s[m+0]=g.x,s[m+1]=g.y,s[m+2]=g.z})(n),(function(){let p=new w;for(let g=0;g<s.length;g+=3){p.x=s[g+0],p.y=s[g+1],p.z=s[g+2];let m=u(p)/2/Math.PI+.5,f=d(p)/Math.PI+.5;a.push(m,1-f)}(function(){let g=new w,m=new w,f=new w,v=new w,y=new be,_=new be,x=new be;for(let T=0,b=0;T<s.length;T+=9,b+=6){g.set(s[T+0],s[T+1],s[T+2]),m.set(s[T+3],s[T+4],s[T+5]),f.set(s[T+6],s[T+7],s[T+8]),y.set(a[b+0],a[b+1]),_.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),v.copy(g).add(m).add(f).divideScalar(3);let R=u(v);h(y,b+0,g,R),h(_,b+2,m,R),h(x,b+4,f,R)}})(),(function(){for(let g=0;g<a.length;g+=6){let m=a[g+0],f=a[g+2],v=a[g+4],y=Math.max(m,f,v),_=Math.min(m,f,v);y>.9&&_<.1&&(m<.2&&(a[g+0]+=1),f<.2&&(a[g+2]+=1),v<.2&&(a[g+4]+=1))}})()})(),this.setAttribute("position",new Ee(s,3)),this.setAttribute("normal",new Ee(s.slice(),3)),this.setAttribute("uv",new Ee(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},Fo=class r extends Sr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Mo=new w,To=new w,sc=new w,bo=new Ji,zo=class extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Cs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:m,b:f,c:v}=bo;if(m.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),v.fromBufferAttribute(o,l[2]),bo.getNormal(sc),u[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let y=0;y<3;y++){let _=(y+1)%3,x=u[y],T=u[_],b=bo[h[y]],R=bo[h[_]],B=`${x}_${T}`,U=`${T}_${x}`;U in d&&d[U]?(sc.dot(d[U].normal)<=s&&(p.push(b.x,b.y,b.z),p.push(R.x,R.y,R.z)),d[U]=null):B in d||(d[B]={index0:l[y],index1:l[_],normal:sc.clone()})}}for(let g in d)if(d[g]){let{index0:m,index1:f}=d[g];Mo.fromBufferAttribute(o,m),To.fromBufferAttribute(o,f),p.push(Mo.x,Mo.y,Mo.z),p.push(To.x,To.y,To.z)}this.setAttribute("position",new Ee(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},ii=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new be:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new ct;for(let p=0;p<=e;p++){let g=p/e;i[p]=this.getTangentAt(g,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ut(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(Ut(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ks=class extends ii{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new be){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Go=class extends ks{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function yh(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var So=new w,ac=new yh,oc=new yh,lc=new yh,At=class extends ii{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(So.subVectors(i[0],i[1]).add(i[0]),o=So);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(So.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=So),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(o.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(d),p),f=Math.pow(d.distanceToSquared(c),p);m<1e-4&&(m=1),g<1e-4&&(g=m),f<1e-4&&(f=m),ac.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,g,m,f),oc.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,g,m,f),lc.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,g,m,f)}else this.curveType==="catmullrom"&&(ac.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),oc.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),lc.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(ac.calc(h),oc.calc(h),lc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ju(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function ma(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function ga(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Aa=class extends ii{constructor(e=new be,t=new be,n=new be,i=new be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new be){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ga(e,i.x,s.x,a.x,o.x),ga(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ko=class extends ii{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ga(e,i.x,s.x,a.x,o.x),ga(e,i.y,s.y,a.y,o.y),ga(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ca=class extends ii{constructor(e=new be,t=new be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new be){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vo=class extends ii{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ra=class extends ii{constructor(e=new be,t=new be,n=new be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new be){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ma(e,i.x,s.x,a.x),ma(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ia=class extends ii{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(ma(e,i.x,s.x,a.x),ma(e,i.y,s.y,a.y),ma(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Pa=class extends ii{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new be){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Ju(o,c.x,l.x,h.x,u.x),Ju(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new be().fromArray(i))}return this}},Ho=Object.freeze({__proto__:null,ArcCurve:Go,CatmullRomCurve3:At,CubicBezierCurve:Aa,CubicBezierCurve3:ko,EllipseCurve:ks,LineCurve:Ca,LineCurve3:Vo,QuadraticBezierCurve:Ra,QuadraticBezierCurve3:Ia,SplineCurve:Pa}),Wo=class extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ho[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ho[i.type]().fromJSON(i))}return this}},Gn=class extends Wo{constructor(e){super(),this.type="Path",this.currentPoint=new be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ca(this.currentPoint.clone(),new be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Ra(this.currentPoint.clone(),new be(e,t),new be(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Aa(this.currentPoint.clone(),new be(e,t),new be(n,i),new be(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Pa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new ks(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Xt=class extends Gn{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Gn().fromJSON(i))}return this}};function Ff(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=$u(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,p){let g=[];for(let m=0,f=u.length;m<f;m++){let v=$u(h,u[m]*p,m<f-1?u[m+1]*p:h.length,p,!1);v===v.next&&(v.steiner=!0),g.push(jf(v))}g.sort(Hf);for(let m=0;m<g.length;m++)d=Wf(g[m],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let p=r[d],g=r[d+1];p<o&&(o=p),g<c&&(c=g),p>h&&(h=p),g>u&&(u=g)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return La(s,a,t,o,c,l,0),a}function $u(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Qu(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Qu(a/n|0,r[a],r[a+1],s);return s&&Vs(s,s.next)&&(Na(s),s=s.next),s}function Kr(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Vs(n,n.next)&&fn(n.prev,n,n.next)!==0)n=n.next;else{if(Na(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function La(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=xc(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(p){let g,m=1;do{let f,v=p;p=null;let y=null;for(g=0;v;){g++;let _=v,x=0;for(let b=0;b<m&&(x++,_=_.nextZ,_);b++);let T=m;for(;x>0||T>0&&_;)x!==0&&(T===0||!_||v.z<=_.z)?(f=v,v=v.nextZ,x--):(f=_,_=_.nextZ,T--),y?y.nextZ=f:p=f,f.prevZ=y,y=f;v=_}y.nextZ=null,m*=2}while(g>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?Gf(r,n,i,s):zf(r))e.push(c.i,r.i,l.i),Na(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?La(r=kf(Kr(r),e),e,t,n,i,s,2):a===2&&Vf(r,e,t,n,i,s):La(Kr(r),e,t,n,i,s,1);break}}}function zf(r){let e=r.prev,t=r,n=r.next;if(fn(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),p=Math.max(o,c,l),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&pa(i,o,s,c,a,l,g.x,g.y)&&fn(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Gf(r,e,t,n){let i=r.prev,s=r,a=r.next;if(fn(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,p=Math.min(o,c,l),g=Math.min(h,u,d),m=Math.max(o,c,l),f=Math.max(h,u,d),v=xc(p,g,e,t,n),y=xc(m,f,e,t,n),_=r.prevZ,x=r.nextZ;for(;_&&_.z>=v&&x&&x.z<=y;){if(_.x>=p&&_.x<=m&&_.y>=g&&_.y<=f&&_!==i&&_!==a&&pa(o,h,c,u,l,d,_.x,_.y)&&fn(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=p&&x.x<=m&&x.y>=g&&x.y<=f&&x!==i&&x!==a&&pa(o,h,c,u,l,d,x.x,x.y)&&fn(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=v;){if(_.x>=p&&_.x<=m&&_.y>=g&&_.y<=f&&_!==i&&_!==a&&pa(o,h,c,u,l,d,_.x,_.y)&&fn(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=p&&x.x<=m&&x.y>=g&&x.y<=f&&x!==i&&x!==a&&pa(o,h,c,u,l,d,x.x,x.y)&&fn(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function kf(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Vs(n,i)&&np(n,t,t.next,i)&&Da(n,i)&&Da(i,n)&&(e.push(n.i,t.i,i.i),Na(t),Na(t.next),t=r=i),t=t.next}while(t!==r);return Kr(t)}function Vf(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qf(a,o)){let c=ip(a,o);return a=Kr(a,a.next),c=Kr(c,c.next),La(a,e,t,n,i,s,0),void La(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function Hf(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Wf(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Vs(i,a))return a;do{if(Vs(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let m=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(m<=o&&m>h&&(h=m,l=a.x<a.next.x?a:a.next,m===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,p=l.y,g=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&tp(c<p?o:h,c,d,p,c<p?h:o,c,a.x,a.y)){let m=Math.abs(c-a.y)/(o-a.x);Da(a,i)&&(m<g||m===g&&(a.x>l.x||a.x===l.x&&Xf(l,a)))&&(l=a,g=m)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=ip(t,r);return Kr(n,n.next),Kr(t,t.next)}function Xf(r,e){return fn(r.prev,r,e.prev)<0&&fn(e.next,r,r.next)<0}function xc(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function jf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function tp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function pa(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&tp(r,e,t,n,i,s,a,o)}function qf(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&np(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(Da(r,e)&&Da(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(fn(r.prev,r,e.prev)||fn(r,e.prev,e))||Vs(r,e)&&fn(r.prev,r,r.next)>0&&fn(e.prev,e,e.next)>0)}function fn(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Vs(r,e){return r.x===e.x&&r.y===e.y}function np(r,e,t,n){let i=Eo(fn(r,e,t)),s=Eo(fn(r,e,n)),a=Eo(fn(t,n,r)),o=Eo(fn(t,n,e));return i!==s&&a!==o||!(i!==0||!wo(r,t,e))||!(s!==0||!wo(r,n,e))||!(a!==0||!wo(t,r,n))||!(o!==0||!wo(t,e,n))}function wo(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Eo(r){return r>0?1:r<0?-1:0}function Da(r,e){return fn(r.prev,r,r.next)<0?fn(r,e,r.next)>=0&&fn(r,r.prev,e)>=0:fn(r,e,r.prev)<0||fn(r,r.next,e)<0}function ip(r,e){let t=Mc(r.i,r.x,r.y),n=Mc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Qu(r,e,t,n){let i=Mc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Na(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Mc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Tc=class{static triangulate(e,t,n=2){return Ff(e,t,n)}},Di=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];ed(e),td(n,e);let a=e.length;t.forEach(ed);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,td(n,t[c]);let o=Tc.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function ed(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function td(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Ht=class r extends ut{constructor(e=new Xt([new be(.5,.5),new be(-.5,.5),new be(-.5,-.5),new be(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,v=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Yf,_,x,T,b,R,B=!1;v&&(_=v.getSpacedPoints(h),B=!0,d=!1,x=v.computeFrenetFrames(h,!1),T=new w,b=new w,R=new w),d||(f=0,p=0,g=0,m=0);let U=o.extractPoints(l),F=U.shape,I=U.holes;if(!Di.isClockWise(F)){F=F.reverse();for(let k=0,S=I.length;k<S;k++){let D=I[k];Di.isClockWise(D)&&(I[k]=D.reverse())}}function L(k){let S=10000000000000001e-36,D=k[0];for(let j=1;j<=k.length;j++){let V=j%k.length,me=k[V],ie=me.x-D.x,Q=me.y-D.y,Ne=ie*ie+Q*Q,qe=Math.max(Math.abs(me.x),Math.abs(me.y),Math.abs(D.x),Math.abs(D.y));Ne<=S*qe*qe?(k.splice(V,1),j--):D=me}}L(F),I.forEach(L);let q=I.length,W=F;for(let k=0;k<q;k++){let S=I[k];F=F.concat(S)}function re(k,S,D){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),k.clone().addScaledVector(S,D)}let ce=F.length;function Y(k,S,D){let j,V,me,ie=k.x-S.x,Q=k.y-S.y,Ne=D.x-k.x,qe=D.y-k.y,Be=ie*ie+Q*Q,tt=ie*qe-Q*Ne;if(Math.abs(tt)>Number.EPSILON){let ft=Math.sqrt(Be),gt=Math.sqrt(Ne*Ne+qe*qe),Et=S.x-Q/ft,bt=S.y+ie/ft,z=((D.x-qe/gt-Et)*qe-(D.y+Ne/gt-bt)*Ne)/(ie*qe-Q*Ne);j=Et+ie*z-k.x,V=bt+Q*z-k.y;let ne=j*j+V*V;if(ne<=2)return new be(j,V);me=Math.sqrt(ne/2)}else{let ft=!1;ie>Number.EPSILON?Ne>Number.EPSILON&&(ft=!0):ie<-Number.EPSILON?Ne<-Number.EPSILON&&(ft=!0):Math.sign(Q)===Math.sign(qe)&&(ft=!0),ft?(j=-Q,V=ie,me=Math.sqrt(Be)):(j=ie,V=Q,me=Math.sqrt(Be/2))}return new be(j/me,V/me)}let he=[];for(let k=0,S=W.length,D=S-1,j=k+1;k<S;k++,D++,j++)D===S&&(D=0),j===S&&(j=0),he[k]=Y(W[k],W[D],W[j]);let Ae=[],ze,Pe,We=he.concat();for(let k=0,S=q;k<S;k++){let D=I[k];ze=[];for(let j=0,V=D.length,me=V-1,ie=j+1;j<V;j++,me++,ie++)me===V&&(me=0),ie===V&&(ie=0),ze[j]=Y(D[j],D[me],D[ie]);Ae.push(ze),We=We.concat(ze)}if(f===0)Pe=Di.triangulateShape(W,I);else{let k=[],S=[];for(let D=0;D<f;D++){let j=D/f,V=p*Math.cos(j*Math.PI/2),me=g*Math.sin(j*Math.PI/2)+m;for(let ie=0,Q=W.length;ie<Q;ie++){let Ne=re(W[ie],he[ie],me);H(Ne.x,Ne.y,-V),j===0&&k.push(Ne)}for(let ie=0,Q=q;ie<Q;ie++){let Ne=I[ie];ze=Ae[ie];let qe=[];for(let Be=0,tt=Ne.length;Be<tt;Be++){let ft=re(Ne[Be],ze[Be],me);H(ft.x,ft.y,-V),j===0&&qe.push(ft)}j===0&&S.push(qe)}}Pe=Di.triangulateShape(k,S)}let Le=Pe.length,_e=g+m;for(let k=0;k<ce;k++){let S=d?re(F[k],We[k],_e):F[k];B?(b.copy(x.normals[0]).multiplyScalar(S.x),T.copy(x.binormals[0]).multiplyScalar(S.y),R.copy(_[0]).add(b).add(T),H(R.x,R.y,R.z)):H(S.x,S.y,0)}for(let k=1;k<=h;k++)for(let S=0;S<ce;S++){let D=d?re(F[S],We[S],_e):F[S];B?(b.copy(x.normals[k]).multiplyScalar(D.x),T.copy(x.binormals[k]).multiplyScalar(D.y),R.copy(_[k]).add(b).add(T),H(R.x,R.y,R.z)):H(D.x,D.y,u/h*k)}for(let k=f-1;k>=0;k--){let S=k/f,D=p*Math.cos(S*Math.PI/2),j=g*Math.sin(S*Math.PI/2)+m;for(let V=0,me=W.length;V<me;V++){let ie=re(W[V],he[V],j);H(ie.x,ie.y,u+D)}for(let V=0,me=I.length;V<me;V++){let ie=I[V];ze=Ae[V];for(let Q=0,Ne=ie.length;Q<Ne;Q++){let qe=re(ie[Q],ze[Q],j);B?H(qe.x,qe.y+_[h-1].y,_[h-1].x+D):H(qe.x,qe.y,u+D)}}}function $(k,S){let D=k.length;for(;--D>=0;){let j=D,V=D-1;V<0&&(V=k.length-1);for(let me=0,ie=h+2*f;me<ie;me++){let Q=ce*me,Ne=ce*(me+1);P(S+j+Q,S+V+Q,S+V+Ne,S+j+Ne)}}}function H(k,S,D){c.push(k),c.push(S),c.push(D)}function Ie(k,S,D){C(k),C(S),C(D);let j=i.length/3,V=y.generateTopUV(n,i,j-3,j-2,j-1);X(V[0]),X(V[1]),X(V[2])}function P(k,S,D,j){C(k),C(S),C(j),C(S),C(D),C(j);let V=i.length/3,me=y.generateSideWallUV(n,i,V-6,V-3,V-2,V-1);X(me[0]),X(me[1]),X(me[3]),X(me[1]),X(me[2]),X(me[3])}function C(k){i.push(c[3*k+0]),i.push(c[3*k+1]),i.push(c[3*k+2])}function X(k){s.push(k.x),s.push(k.y)}(function(){let k=i.length/3;if(d){let S=0,D=ce*S;for(let j=0;j<Le;j++){let V=Pe[j];Ie(V[2]+D,V[1]+D,V[0]+D)}S=h+2*f,D=ce*S;for(let j=0;j<Le;j++){let V=Pe[j];Ie(V[0]+D,V[1]+D,V[2]+D)}}else{for(let S=0;S<Le;S++){let D=Pe[S];Ie(D[2],D[1],D[0])}for(let S=0;S<Le;S++){let D=Pe[S];Ie(D[0]+ce*h,D[1]+ce*h,D[2]+ce*h)}}n.addGroup(k,i.length/3-k,0)})(),(function(){let k=i.length/3,S=0;$(W,S),S+=W.length;for(let D=0,j=I.length;D<j;D++){let V=I[D];$(V,S),S+=V.length}n.addGroup(k,i.length/3-k,1)})()}this.setAttribute("position",new Ee(i,3)),this.setAttribute("uv",new Ee(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ho[i.type]().fromJSON(i)),new r(n,e.options)}},Yf={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new be(s,a),new be(o,c),new be(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],g=e[3*i+2],m=e[3*s],f=e[3*s+1],v=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new be(a,1-c),new be(l,1-u),new be(d,1-g),new be(m,1-v)]:[new be(o,1-c),new be(h,1-u),new be(p,1-g),new be(f,1-v)]}},Xo=class r extends Sr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},rr=class r extends ut{constructor(e=[new be(0,-.5),new be(.5,0),new be(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ut(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new be,p=new w,g=new w,m=new w,f=0,v=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:f=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,p.x=1*v,p.y=-f,p.z=0*v,m.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(m.x,m.y,m.z);break;default:f=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,p.x=1*v,p.y=-f,p.z=0*v,g.copy(p),p.x+=m.x,p.y+=m.y,p.z+=m.z,p.normalize(),c.push(p.x,p.y,p.z),m.copy(g)}for(let y=0;y<=t;y++){let _=n+y*h*i,x=Math.sin(_),T=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*T,a.push(u.x,u.y,u.z),d.x=y/t,d.y=b/(e.length-1),o.push(d.x,d.y);let R=c[3*b+0]*x,B=c[3*b+1],U=c[3*b+0]*T;l.push(R,B,U)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){let x=_+y*e.length,T=x,b=x+e.length,R=x+e.length+1,B=x+1;s.push(T,b,B),s.push(R,B,b)}this.setIndex(s),this.setAttribute("position",new Ee(a,3)),this.setAttribute("uv",new Ee(o,2)),this.setAttribute("normal",new Ee(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Hs=class r extends Sr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Yt=class r extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,p=[],g=[],m=[],f=[];for(let v=0;v<h;v++){let y=v*d-a;for(let _=0;_<l;_++){let x=_*u-s;g.push(x,-y,0),m.push(0,0,1),f.push(_/o),f.push(1-v/c)}}for(let v=0;v<c;v++)for(let y=0;y<o;y++){let _=y+l*v,x=y+l*(v+1),T=y+1+l*(v+1),b=y+1+l*v;p.push(_,x,b),p.push(x,T,b)}this.setIndex(p),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(m,3)),this.setAttribute("uv",new Ee(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},jo=class r extends ut{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new w,g=new be;for(let m=0;m<=i;m++){for(let f=0;f<=n;f++){let v=s+f/n*a;p.x=u*Math.cos(v),p.y=u*Math.sin(v),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let m=0;m<i;m++){let f=m*(n+1);for(let v=0;v<n;v++){let y=v+f,_=y,x=y+n+1,T=y+n+2,b=y+1;o.push(_,x,b),o.push(x,T,b)}}this.setIndex(o),this.setAttribute("position",new Ee(c,3)),this.setAttribute("normal",new Ee(l,3)),this.setAttribute("uv",new Ee(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},sr=class r extends ut{constructor(e=new Xt([new be(0,.5),new be(-.5,-.5),new be(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,g=d.holes;Di.isClockWise(p)===!1&&(p=p.reverse());for(let f=0,v=g.length;f<v;f++){let y=g[f];Di.isClockWise(y)===!0&&(g[f]=y.reverse())}let m=Di.triangulateShape(p,g);for(let f=0,v=g.length;f<v;f++){let y=g[f];p=p.concat(y)}for(let f=0,v=p.length;f<v;f++){let y=p[f];i.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let f=0,v=m.length;f<v;f++){let y=m[f],_=y[0]+u,x=y[1]+u,T=y[2]+u;n.push(_,x,T),c+=3}}this.setIndex(n),this.setAttribute("position",new Ee(i,3)),this.setAttribute("normal",new Ee(s,3)),this.setAttribute("uv",new Ee(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Vt=class r extends ut{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,p=[],g=[],m=[],f=[];for(let v=0;v<=n;v++){let y=[],_=v/n,x=0;v===0&&a===0?x=.5/t:v===n&&c===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let b=T/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),f.push(b+x,1-_),y.push(l++)}h.push(y)}for(let v=0;v<n;v++)for(let y=0;y<t;y++){let _=h[v][y+1],x=h[v][y],T=h[v+1][y],b=h[v+1][y+1];(v!==0||a>0)&&p.push(_,x,b),(v!==n-1||c<Math.PI)&&p.push(x,T,b)}this.setIndex(p),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(m,3)),this.setAttribute("uv",new Ee(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},qo=class r extends Sr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ft=class r extends ut{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){let m=g/i*s,f=p/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(m),u.y=(e+t*Math.cos(f))*Math.sin(m),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(m),h.y=e*Math.sin(m),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){let m=(i+1)*p+g-1,f=(i+1)*(p-1)+g-1,v=(i+1)*(p-1)+g,y=(i+1)*p+g;a.push(m,f,y),a.push(f,v,y)}this.setIndex(a),this.setAttribute("position",new Ee(o,3)),this.setAttribute("normal",new Ee(c,3)),this.setAttribute("uv",new Ee(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Yo=class r extends ut{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,p=new w,g=new w,m=new w,f=new w,v=new w;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;y(x,s,a,e,p),y(x+.01,s,a,e,g),f.subVectors(g,p),v.addVectors(g,p),m.crossVectors(f,v),v.crossVectors(m,f),m.normalize(),v.normalize();for(let T=0;T<=i;++T){let b=T/i*Math.PI*2,R=-t*Math.cos(b),B=t*Math.sin(b);u.x=p.x+(R*v.x+B*m.x),u.y=p.y+(R*v.y+B*m.y),u.z=p.z+(R*v.z+B*m.z),c.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),l.push(d.x,d.y,d.z),h.push(_/n),h.push(T/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){let T=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),R=(i+1)*_+x,B=(i+1)*(_-1)+x;o.push(T,b,B),o.push(b,R,B)}function y(_,x,T,b,R){let B=Math.cos(_),U=Math.sin(_),F=T/x*_,I=Math.cos(F);R.x=b*(2+I)*.5*B,R.y=b*(2+I)*U*.5,R.z=b*Math.sin(F)*.5}this.setIndex(o),this.setAttribute("position",new Ee(c,3)),this.setAttribute("normal",new Ee(l,3)),this.setAttribute("uv",new Ee(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},It=class r extends ut{constructor(e=new Ia(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new be,h=new w,u=[],d=[],p=[],g=[];function m(f){h=e.getPointAt(f/t,h);let v=a.normals[f],y=a.binormals[f];for(let _=0;_<=i;_++){let x=_/i*Math.PI*2,T=Math.sin(x),b=-Math.cos(x);c.x=b*v.x+T*y.x,c.y=b*v.y+T*y.y,c.z=b*v.z+T*y.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)m(f);m(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let v=0;v<=i;v++)l.x=f/t,l.y=v/i,p.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let v=1;v<=i;v++){let y=(i+1)*(f-1)+(v-1),_=(i+1)*f+(v-1),x=(i+1)*f+v,T=(i+1)*(f-1)+v;g.push(y,_,T),g.push(_,x,T)}})()})(),this.setIndex(g),this.setAttribute("position",new Ee(u,3)),this.setAttribute("normal",new Ee(d,3)),this.setAttribute("uv",new Ee(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Ho[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Zo=class extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let p=d,g=d+u.count;p<g;p+=3)for(let m=0;m<3;m++){let f=o.getX(p+m),v=o.getX(p+(m+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,v),nd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),nd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ee(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function nd(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var _g=Object.freeze({__proto__:null,BoxGeometry:at,CapsuleGeometry:zs,CircleGeometry:$n,ConeGeometry:Gs,CylinderGeometry:it,DodecahedronGeometry:Fo,EdgesGeometry:zo,ExtrudeGeometry:Ht,IcosahedronGeometry:Xo,LatheGeometry:rr,OctahedronGeometry:Hs,PlaneGeometry:Yt,PolyhedronGeometry:Sr,RingGeometry:jo,ShapeGeometry:sr,SphereGeometry:Vt,TetrahedronGeometry:qo,TorusGeometry:Ft,TorusKnotGeometry:Yo,TubeGeometry:It,WireframeGeometry:Zo}),Jr=class extends jn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Je(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Pt=class extends jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zt=class extends Pt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var wr=class extends jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ko=class extends jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ao(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Zf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Kf(r){let e=r.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,i){return r[n]-r[i]}),t}function id(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function rp(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var ar=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jo=class extends ar{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fc,endingEnd:fc}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case mc:s=e,o=2*t-n;break;case gc:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case mc:a=e,c=2*n-t;break;case gc:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),m=g*g,f=m*g,v=-d*f+2*d*m-d*g,y=(1+d)*f+(-1.5-2*d)*m+(-.5+d)*g+1,_=(-1-p)*f+(1.5+p)*m+.5*g,x=p*f-p*m;for(let T=0;T!==o;++T)s[T]=v*a[h+T]+y*a[l+T]+_*a[c+T]+x*a[u+T];return s}},$o=class extends ar{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Qo=class extends ar{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Kn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Gr:t=this.InterpolantFactoryMethodDiscrete;break;case kr:t=this.InterpolantFactoryMethodLinear;break;case Co:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gr;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return Co}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Zf(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Co,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let g=t[h+p];if(g!==t[u+p]||g!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Kn.prototype.ValueTypeName="",Kn.prototype.TimeBufferType=Float32Array,Kn.prototype.ValueBufferType=Float32Array,Kn.prototype.DefaultInterpolation=kr;var $i=class extends Kn{constructor(e,t,n){super(e,t,n)}};$i.prototype.ValueTypeName="bool",$i.prototype.ValueBufferType=Array,$i.prototype.DefaultInterpolation=Gr,$i.prototype.InterpolantFactoryMethodLinear=void 0,$i.prototype.InterpolantFactoryMethodSmooth=void 0;var Ua=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}};Ua.prototype.ValueTypeName="color";var Ui=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}};Ui.prototype.ValueTypeName="number";var el=class extends ar{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Cn.slerpFlat(s,0,a,l-o,a,l,c);return s}},Bi=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new el(this.times,this.values,this.getValueSize(),e)}};Bi.prototype.ValueTypeName="quaternion",Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Qi=class extends Kn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="string",Qi.prototype.ValueBufferType=Array,Qi.prototype.DefaultInterpolation=Gr,Qi.prototype.InterpolantFactoryMethodLinear=void 0,Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Oi=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}};Oi.prototype.ValueTypeName="vector";var Ba=class{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ui(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Jf(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Kn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let h=Kf(c);c=id(c,1,h),l=id(l,1,h),i||c[0]!==0||(c.push(s),l.push(l[0])),a.push(new Ui(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,p,g){if(d.length!==0){let m=[],f=[];rp(d,m,f,p),m.length!==0&&g.push(new h(u,m,f))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let u=l[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let d={},p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let g=0;g<u[p].morphTargets.length;g++)d[u[p].morphTargets[g]]=-1;for(let g in d){let m=[],f=[];for(let v=0;v!==u[p].morphTargets.length;++v){let y=u[p];m.push(y.time),f.push(y.morphTarget===g?1:0)}i.push(new Ui(".morphTargetInfluence["+g+"]",m,f))}c=d.length*a}else{let d=".bones["+t[h].name+"]";n(Oi,d+".position",u,"pos",i),n(Bi,d+".quaternion",u,"rot",i),n(Oi,d+".scale",u,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let i=this.tracks[t];e=Math.max(e,i.times[i.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Jf(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ui;case"vector":case"vector2":case"vector3":case"vector4":return Oi;case"color":return Ua;case"quaternion":return Bi;case"bool":case"boolean":return $i;case"string":return Qi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(r.type);if(r.times===void 0){let t=[],n=[];rp(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var Ni={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},tl=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},sp=new tl,Fi=class{constructor(e){this.manager=e!==void 0?e:sp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Fi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ki={},bc=class extends Error{constructor(e,t){super(e),this.response=t}},Ws=class extends Fi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Ni.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ki[e]!==void 0)return void Ki[e].push({onLoad:t,onProgress:n,onError:i});Ki[e]=[],Ki[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Ki[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0,m=0,f=new ReadableStream({start(v){(function y(){u.read().then(({done:_,value:x})=>{if(_)v.close();else{m+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:p});for(let b=0,R=h.length;b<R;b++){let B=h[b];B.onProgress&&B.onProgress(T)}v.enqueue(x),y()}},_=>{v.error(_)})})()}});return new Response(f)}throw new bc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{Ni.add(`file:${e}`,l);let h=Ki[e];delete Ki[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=Ki[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ki[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var As=new WeakMap,nl=class extends Fi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ni.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=As.get(a);u===void 0&&(u=[],As.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Ps("img");function c(){h(),t&&t(this);let u=As.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}As.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),Ni.remove(`image:${e}`);let d=As.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u)}As.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ni.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Er=class extends Fi{constructor(e){super(e)}load(e,t,n,i){let s=new An,a=new nl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},$r=class extends dn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ri=class extends $r{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},cc=new ct,rd=new w,sd=new w,Oa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=Gi,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tr,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(rd),sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sd),t.updateMatrixWorld(),cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sc=class extends Oa{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Vr*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Qr=class extends $r{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Sc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ad=new ct,da=new w,hc=new w,wc=class extends Oa{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new be(4,2),this._viewportCount=6,this._viewports=[new qt(2,1,1,1),new qt(0,1,1,1),new qt(3,1,1,1),new qt(1,1,1,1),new qt(3,0,1,1),new qt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),da.setFromMatrixPosition(e.matrixWorld),n.position.copy(da),hc.copy(n.position),hc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(hc),n.updateMatrixWorld(),i.makeTranslation(-da.x,-da.y,-da.z),ad.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ad,n.coordinateSystem,n.reversedDepth)}},es=class extends $r{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},or=class extends Ns{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ec=class extends Oa{constructor(){super(new or(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},kn=class extends $r{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.shadow=new Ec}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var lr=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var uc=new WeakMap,Fa=class extends Fi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ni.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(l=>{if(uc.has(a)!==!0)return t&&t(l),s.manager.itemEnd(e),l;i&&i(uc.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ni.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),uc.set(c,l),Ni.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Ni.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var xg=new ct,Mg=new ct,Tg=new ct;var il=class extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bg=new w,Sg=new Cn,wg=new w,Eg=new w,Ag=new w;var Cg=new w,Rg=new Cn,Ig=new w,Pg=new w;var _h="\\[\\]\\.:\\/",$f=new RegExp("["+_h+"]","g"),dc="[^"+_h+"]",Qf="[^"+_h.replace("\\.","")+"]",em=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",dc)+/(WCOD+)?/.source.replace("WCOD",Qf)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dc)+"$"),tm=["material","materials","bones","map"],on=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($f,"")}static parseTrackName(e){let t=em.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);tm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};on.Composite=class{constructor(r,e,t){let n=t||on.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},on.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},on.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},on.prototype.GetterByBindingType=[on.prototype._getValue_direct,on.prototype._getValue_array,on.prototype._getValue_arrayElement,on.prototype._getValue_toArray],on.prototype.SetterByBindingTypeAndVersioning=[[on.prototype._setValue_direct,on.prototype._setValue_direct_setNeedsUpdate,on.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[on.prototype._setValue_array,on.prototype._setValue_array_setNeedsUpdate,on.prototype._setValue_array_setMatrixWorldNeedsUpdate],[on.prototype._setValue_arrayElement,on.prototype._setValue_arrayElement_setNeedsUpdate,on.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[on.prototype._setValue_fromArray,on.prototype._setValue_fromArray_setNeedsUpdate,on.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Lg=new Float32Array(1);var Dg=new ct;var Ng=new be;var Ug=new w,Bg=new w,Og=new w,Fg=new w,zg=new w,Gg=new w,kg=new w;var Vg=new w;var Hg=new w,Wg=new ct,Xg=new ct;var jg=new w,qg=new Je,Yg=new Je;var Zg=new w,Kg=new w,Jg=new w;var $g=new w,Qg=new Ns;var e1=new Mn;var t1=new w;function xh(r,e,t,n){let i=(function(s){switch(s){case Gi:case Lc:return{byteLength:1,components:1};case Zs:case Dc:case Rr:return{byteLength:2,components:1};case ml:case gl:return{byteLength:2,components:4};case is:case fl:case fi:return{byteLength:4,components:1};case Nc:case Uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case vl:case yl:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case mi:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Rp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function im(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],p=l[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,l[h]=p)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let p=l[u];r.bufferSubData(o,p.start*c.BYTES_PER_ELEMENT,c,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Bt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ye={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Rt},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Rt}},envmap:{envMap:{value:null},envMapRotation:{value:new Rt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Rt},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0},uvTransform:{value:new Rt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Rt},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0}}},ki={basic:{uniforms:Vn([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Vn([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Je(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Vn([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Vn([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Vn([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new Je(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Vn([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Vn([Ye.points,Ye.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Vn([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Vn([Ye.common,Ye.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Vn([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Vn([Ye.sprite,Ye.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Rt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Vn([Ye.common,Ye.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Vn([Ye.lights,Ye.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};ki.physical={uniforms:Vn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Rt},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Rt},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Rt},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Rt},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Rt},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Rt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};var bl={r:0,b:0,g:0},as=new Ai,rm=new ct;function sm(r,e,t,n,i,s,a){let o=new Je(0),c,l,h=s===!0?0:1,u=null,d=0,p=null;function g(f){let v=f.isScene===!0?f.background:null;return v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v}function m(f,v){f.getRGB(bl,vh(r)),n.buffers.color.setClear(bl.r,bl.g,bl.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(f,v=1){o.set(f),h=v,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,m(o,h)},render:function(f){let v=!1,y=g(f);y===null?m(o,h):y&&y.isColor&&(m(y,1),v=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===Va)?(l===void 0&&(l=new ht(new at(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:ss(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,x,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),as.copy(v.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(rm.makeRotationFromEuler(as)),l.material.toneMapped=kt.getTransfer(y.colorSpace)!==tn,u===y&&d===y.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ht(new Yt(2,2),new Jn({name:"BackgroundMaterial",uniforms:ss(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:Ar,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=kt.getTransfer(y.colorSpace)!==tn,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),u===y&&d===y.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function am(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(v){return r.bindVertexArray(v)}function c(v){return r.deleteVertexArray(v)}function l(v){let y=[],_=[],x=[];for(let T=0;T<t;T++)y[T]=0,_[T]=0,x[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:_,attributeDivisors:x,object:v,attributes:{},index:null}}function h(){let v=s.newAttributes;for(let y=0,_=v.length;y<_;y++)v[y]=0}function u(v){d(v,0)}function d(v,y){let _=s.newAttributes,x=s.enabledAttributes,T=s.attributeDivisors;_[v]=1,x[v]===0&&(r.enableVertexAttribArray(v),x[v]=1),T[v]!==y&&(r.vertexAttribDivisor(v,y),T[v]=y)}function p(){let v=s.newAttributes,y=s.enabledAttributes;for(let _=0,x=y.length;_<x;_++)y[_]!==v[_]&&(r.disableVertexAttribArray(_),y[_]=0)}function g(v,y,_,x,T,b,R){R===!0?r.vertexAttribIPointer(v,y,_,T,b):r.vertexAttribPointer(v,y,_,x,T,b)}function m(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(v,y,_,x,T){let b=!1,R=(function(B,U,F){let I=F.wireframe===!0,L=n[B.id];L===void 0&&(L={},n[B.id]=L);let q=L[U.id];q===void 0&&(q={},L[U.id]=q);let W=q[I];return W===void 0&&(W=l(r.createVertexArray()),q[I]=W),W})(x,_,y);s!==R&&(s=R,o(s.object)),b=(function(B,U,F,I){let L=s.attributes,q=U.attributes,W=0,re=F.getAttributes();for(let ce in re)if(re[ce].location>=0){let Y=L[ce],he=q[ce];if(he===void 0&&(ce==="instanceMatrix"&&B.instanceMatrix&&(he=B.instanceMatrix),ce==="instanceColor"&&B.instanceColor&&(he=B.instanceColor)),Y===void 0||Y.attribute!==he||he&&Y.data!==he.data)return!0;W++}return s.attributesNum!==W||s.index!==I})(v,x,_,T),b&&(function(B,U,F,I){let L={},q=U.attributes,W=0,re=F.getAttributes();for(let ce in re)if(re[ce].location>=0){let Y=q[ce];Y===void 0&&(ce==="instanceMatrix"&&B.instanceMatrix&&(Y=B.instanceMatrix),ce==="instanceColor"&&B.instanceColor&&(Y=B.instanceColor));let he={};he.attribute=Y,Y&&Y.data&&(he.data=Y.data),L[ce]=he,W++}s.attributes=L,s.attributesNum=W,s.index=I})(v,x,_,T),T!==null&&e.update(T,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(B,U,F,I){h();let L=I.attributes,q=F.getAttributes(),W=U.defaultAttributeValues;for(let re in q){let ce=q[re];if(ce.location>=0){let Y=L[re];if(Y===void 0&&(re==="instanceMatrix"&&B.instanceMatrix&&(Y=B.instanceMatrix),re==="instanceColor"&&B.instanceColor&&(Y=B.instanceColor)),Y!==void 0){let he=Y.normalized,Ae=Y.itemSize,ze=e.get(Y);if(ze===void 0)continue;let Pe=ze.buffer,We=ze.type,Le=ze.bytesPerElement,_e=We===r.INT||We===r.UNSIGNED_INT||Y.gpuType===fl;if(Y.isInterleavedBufferAttribute){let $=Y.data,H=$.stride,Ie=Y.offset;if($.isInstancedInterleavedBuffer){for(let P=0;P<ce.locationSize;P++)d(ce.location+P,$.meshPerAttribute);B.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let P=0;P<ce.locationSize;P++)u(ce.location+P);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let P=0;P<ce.locationSize;P++)g(ce.location+P,Ae/ce.locationSize,We,he,H*Le,(Ie+Ae/ce.locationSize*P)*Le,_e)}else{if(Y.isInstancedBufferAttribute){for(let $=0;$<ce.locationSize;$++)d(ce.location+$,Y.meshPerAttribute);B.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let $=0;$<ce.locationSize;$++)u(ce.location+$);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let $=0;$<ce.locationSize;$++)g(ce.location+$,Ae/ce.locationSize,We,he,Ae*Le,Ae/ce.locationSize*$*Le,_e)}}else if(W!==void 0){let he=W[re];if(he!==void 0)switch(he.length){case 2:r.vertexAttrib2fv(ce.location,he);break;case 3:r.vertexAttrib3fv(ce.location,he);break;case 4:r.vertexAttrib4fv(ce.location,he);break;default:r.vertexAttrib1fv(ce.location,he)}}}}p()})(v,y,_,x),T!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:m,resetDefaultState:f,dispose:function(){m();for(let v in n){let y=n[v];for(let _ in y){let x=y[_];for(let T in x)c(x[T].object),delete x[T];delete y[_]}delete n[v]}},releaseStatesOfGeometry:function(v){if(n[v.id]===void 0)return;let y=n[v.id];for(let _ in y){let x=y[_];for(let T in x)c(x[T].object),delete x[T];delete y[_]}delete n[v.id]},releaseStatesOfProgram:function(v){for(let y in n){let _=n[y];if(_[v.id]===void 0)continue;let x=_[v.id];for(let T in x)c(x[T].object),delete x[T];delete _[v.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function om(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function lm(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===mi||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===Rr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Gi&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==fi&&!p)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function cm(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Li,o=new Rt,c={value:null,needsUpdate:!1};function l(h,u,d,p){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=c.value,p!==!0||m===null){let f=d+4*g,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,_=d;y!==g;++y,_+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,f=r.get(h);if(!i||p===null||p.length===0||s&&!m)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let v=s?0:n,y=4*v,_=f.clippingState||null;c.value=_,_=l(p,u,y,d);for(let x=0;x!==y;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}}}function hm(r){let e=new WeakMap;function t(i,s){return s===ul?i.mapping=qs:s===dl&&(i.mapping=ts),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===ul||s===dl){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new No(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var ap=[.125,.215,.35,.446,.526,.582],ja=20,Mh=new or,op=new Je,Th=null,bh=0,Sh=0,wh=!1,ls=(1+Math.sqrt(5))/2,Qs=1/ls,lp=[new w(-ls,Qs,0),new w(ls,Qs,0),new w(-Qs,0,ls),new w(Qs,0,ls),new w(0,ls,-Qs),new w(0,ls,Qs),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],um=new w,Ir=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=um}=s;Th=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Th,bh,Sh),this._renderer.xr.enabled=wh,e.scissorTest=!1,Sl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qs||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Th=this._renderer.getRenderTarget(),bh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:Rr,format:mi,colorSpace:Un,depthBuffer:!1},i=cp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cp(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+ap.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);c.push(p);let g=1/p;d>a-4?g=ap[d-a+4-1]:d===0&&(g=0),l.push(g);let m=1/(p-2),f=-m,v=1+m,y=[f,f,v,f,v,v,f,f,v,v,f,v],_=6,x=6,T=3,b=2,R=1,B=new Float32Array(T*x*_),U=new Float32Array(b*x*_),F=new Float32Array(R*x*_);for(let L=0;L<_;L++){let q=L%3*2/3-1,W=L>2?0:-1,re=[q,W,0,q+2/3,W,0,q+2/3,W+1,0,q,W,0,q+2/3,W+1,0,q,W+1,0];B.set(re,T*x*L),U.set(y,b*x*L);let ce=[L,L,L,L,L,L];F.set(ce,R*x*L)}let I=new ut;I.setAttribute("position",new pn(B,T)),I.setAttribute("uv",new pn(U,b)),I.setAttribute("faceIndex",new pn(F,R)),o.push(I),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(ja),h=new w(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:ja,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Uh(),fragmentShader:`

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
		`,blending:Cr,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,Mh)}_sceneToCubeUV(e,t,n,i,s){let a=new rn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(op),l.toneMapping=cr,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new yn({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1}),p=new ht(new at,d),g=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,g=!0):(d.color.copy(op),g=!0);for(let f=0;f<6;f++){let v=f%3;v===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):v===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let y=this._cubeSize;Sl(i,v*y,f>2?y:0,y,y),l.setRenderTarget(i),g&&l.render(p,a),l.render(e,a)}p.geometry.dispose(),p.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===qs||e.mapping===ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=up()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ht(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Sl(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Mh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=lp[(i-s-1)%lp.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ht(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,g=s/p,m=isFinite(s)?1+Math.floor(3*g):ja;m>ja&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let f=[],v=0;for(let x=0;x<ja;++x){let T=x/g,b=Math.exp(-T*T/2);f.push(b),x===0?v+=b:x<m&&(v+=2*b)}for(let x=0;x<f.length;x++)f[x]=f[x]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=p,u.mipInt.value=y-n;let _=this._sizeLods[i];Sl(t,3*_*(i>y-4?i-y+4:0),4*(this._cubeSize-_),3*_,2*_),c.setRenderTarget(t),c.render(h,Mh)}};function cp(r,e,t){let n=new di(r,e,t);return n.texture.mapping=Va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function hp(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uh(),fragmentShader:`

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
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function up(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cr,depthTest:!1,depthWrite:!1})}function Uh(){return`

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
	`}function dm(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===ul||s===dl,o=s===qs||s===ts;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Ir(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let g=0;g<p;g++)u[g]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new Ir(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function pm(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Ls("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function fm(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let m=h.array;d=h.version;for(let f=0,v=m.length;f<v;f+=3){let y=m[f+0],_=m[f+1],x=m[f+2];l.push(y,_,_,x,x,y)}}else{if(u===void 0)return;{let m=u.array;d=u.version;for(let f=0,v=m.length/3-1;f<v;f+=3){let y=f+0,_=f+1,x=f+2;l.push(y,_,_,x,x,y)}}}let p=new(gh(l)?Ma:Wr)(l,1);p.version=d;let g=s.get(c);g&&e.remove(g),s.set(c,p)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function mm(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let p=0;p<l;p++)d+=c[p]*h[p];t.update(d,n,1)}}}function gm(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function vm(r,e,t){let n=new WeakMap,i=new qt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let B=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",B)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),g===!0&&(y=3);let _=a.attributes.position.count*y,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*x*4*h),b=new _a(T,_,x,h);b.type=fi,b.needsUpdate=!0;let R=4*y;for(let U=0;U<h;U++){let F=m[U],I=f[U],L=v[U],q=_*x*4*U;for(let W=0;W<F.count;W++){let re=W*R;d===!0&&(i.fromBufferAttribute(F,W),T[q+re+0]=i.x,T[q+re+1]=i.y,T[q+re+2]=i.z,T[q+re+3]=0),p===!0&&(i.fromBufferAttribute(I,W),T[q+re+4]=i.x,T[q+re+5]=i.y,T[q+re+6]=i.z,T[q+re+7]=0),g===!0&&(i.fromBufferAttribute(L,W),T[q+re+8]=i.x,T[q+re+9]=i.y,T[q+re+10]=i.z,T[q+re+11]=L.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new be(_,x)},n.set(a,u),a.addEventListener("dispose",B)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let g=0;g<c.length;g++)d+=c[g];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function ym(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Ip=new An,dp=new wa(1,1),Pp=new _a,Lp=new Lo,Dp=new Ta,pp=[],fp=[],mp=new Float32Array(16),gp=new Float32Array(9),vp=new Float32Array(4);function ta(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=pp[i];if(s===void 0&&(s=new Float32Array(i),pp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Rn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function In(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function El(r,e){let t=fp[e];t===void 0&&(t=new Int32Array(e),fp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function _m(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function xm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;r.uniform2fv(this.addr,e),In(t,e)}}function Mm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rn(t,e))return;r.uniform3fv(this.addr,e),In(t,e)}}function Tm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;r.uniform4fv(this.addr,e),In(t,e)}}function bm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),In(t,e)}else{if(Rn(t,n))return;vp.set(n),r.uniformMatrix2fv(this.addr,!1,vp),In(t,n)}}function Sm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),In(t,e)}else{if(Rn(t,n))return;gp.set(n),r.uniformMatrix3fv(this.addr,!1,gp),In(t,n)}}function wm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),In(t,e)}else{if(Rn(t,n))return;mp.set(n),r.uniformMatrix4fv(this.addr,!1,mp),In(t,n)}}function Em(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Am(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;r.uniform2iv(this.addr,e),In(t,e)}}function Cm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rn(t,e))return;r.uniform3iv(this.addr,e),In(t,e)}}function Rm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;r.uniform4iv(this.addr,e),In(t,e)}}function Im(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Pm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rn(t,e))return;r.uniform2uiv(this.addr,e),In(t,e)}}function Lm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rn(t,e))return;r.uniform3uiv(this.addr,e),In(t,e)}}function Dm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rn(t,e))return;r.uniform4uiv(this.addr,e),In(t,e)}}function Nm(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(dp.compareFunction=ph,s=dp):s=Ip,t.setTexture2D(e||s,i)}function Um(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Lp,i)}function Bm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Dp,i)}function Om(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Pp,i)}function Fm(r,e){r.uniform1fv(this.addr,e)}function zm(r,e){let t=ta(e,this.size,2);r.uniform2fv(this.addr,t)}function Gm(r,e){let t=ta(e,this.size,3);r.uniform3fv(this.addr,t)}function km(r,e){let t=ta(e,this.size,4);r.uniform4fv(this.addr,t)}function Vm(r,e){let t=ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Hm(r,e){let t=ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Wm(r,e){let t=ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Xm(r,e){r.uniform1iv(this.addr,e)}function jm(r,e){r.uniform2iv(this.addr,e)}function qm(r,e){r.uniform3iv(this.addr,e)}function Ym(r,e){r.uniform4iv(this.addr,e)}function Zm(r,e){r.uniform1uiv(this.addr,e)}function Km(r,e){r.uniform2uiv(this.addr,e)}function Jm(r,e){r.uniform3uiv(this.addr,e)}function $m(r,e){r.uniform4uiv(this.addr,e)}function Qm(r,e,t){let n=this.cache,i=e.length,s=El(t,i);Rn(n,s)||(r.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Ip,s[a])}function e0(r,e,t){let n=this.cache,i=e.length,s=El(t,i);Rn(n,s)||(r.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Lp,s[a])}function t0(r,e,t){let n=this.cache,i=e.length,s=El(t,i);Rn(n,s)||(r.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Dp,s[a])}function n0(r,e,t){let n=this.cache,i=e.length,s=El(t,i);Rn(n,s)||(r.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Pp,s[a])}var Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return _m;case 35664:return xm;case 35665:return Mm;case 35666:return Tm;case 35674:return bm;case 35675:return Sm;case 35676:return wm;case 5124:case 35670:return Em;case 35667:case 35671:return Am;case 35668:case 35672:return Cm;case 35669:case 35673:return Rm;case 5125:return Im;case 36294:return Pm;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return Om}})(t.type)}},Ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Fm;case 35664:return zm;case 35665:return Gm;case 35666:return km;case 35674:return Vm;case 35675:return Hm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return jm;case 35668:case 35672:return qm;case 35669:case 35673:return Ym;case 5125:return Zm;case 36294:return Km;case 36295:return Jm;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return e0;case 35680:case 36300:case 36308:case 36293:return t0;case 36289:case 36303:case 36311:case 36292:return n0}})(t.type)}},Rh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Eh=/(\w+)(\])?(\[|\.)?/g;function yp(r,e){r.seq.push(e),r.map[e.id]=e}function i0(r,e,t){let n=r.name,i=n.length;for(Eh.lastIndex=0;;){let s=Eh.exec(n),a=Eh.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){yp(t,l===void 0?new Ah(o,r,e):new Ch(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Rh(o),yp(t,h)),t=h}}}var ea=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);i0(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function _p(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var r0=0,xp=new Rt;function Mp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let p=u;p<d;p++){let g=p+1;h.push(`${g===c?">":" "} ${g}: ${l[p]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function s0(r,e){let t=(function(n){kt._getMatrix(xp,kt.workingColorSpace,n);let i=`mat3( ${xp.elements.map(s=>s.toFixed(4))} )`;switch(kt.getTransfer(n)){case va:return[i,"LinearTransferOETF"];case tn:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function a0(r,e){let t;switch(e){case Ld:t="Linear";break;case Dd:t="Reinhard";break;case Nd:t="Cineon";break;case pi:t="ACESFilmic";break;case Bd:t="AgX";break;case Od:t="Neutral";break;case Ud:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var wl=new w;function o0(){return kt.getLuminanceCoefficients(wl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${wl.x.toFixed(4)}, ${wl.y.toFixed(4)}, ${wl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qa(r){return r!==""}function Tp(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var l0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(r){return r.replace(l0,h0)}var c0=new Map;function h0(r,e){let t=Bt[e];if(t===void 0){let n=c0.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Ih(t)}var u0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sp(r){return r.replace(u0,d0)}function d0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function wp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function p0(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(I){let L="SHADOWMAP_TYPE_BASIC";return I.shadowMapType===Cc?L="SHADOWMAP_TYPE_PCF":I.shadowMapType===Xs?L="SHADOWMAP_TYPE_PCF_SOFT":I.shadowMapType===zi&&(L="SHADOWMAP_TYPE_VSM"),L})(t),l=(function(I){let L="ENVMAP_TYPE_CUBE";if(I.envMap)switch(I.envMapMode){case qs:case ts:L="ENVMAP_TYPE_CUBE";break;case Va:L="ENVMAP_TYPE_CUBE_UV"}return L})(t),h=(function(I){let L="ENVMAP_MODE_REFLECTION";return I.envMap&&I.envMapMode===ts&&(L="ENVMAP_MODE_REFRACTION"),L})(t),u=(function(I){let L="ENVMAP_BLENDING_NONE";if(I.envMap)switch(I.combine){case Rd:L="ENVMAP_BLENDING_MULTIPLY";break;case Id:L="ENVMAP_BLENDING_MIX";break;case Pd:L="ENVMAP_BLENDING_ADD"}return L})(t),d=(function(I){let L=I.envMapCubeUVHeight;if(L===null)return null;let q=Math.log2(L)-2,W=1/L;return{texelWidth:1/(3*Math.max(Math.pow(2,q),112)),texelHeight:W,maxMip:q}})(t),p=(function(I){return[I.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",I.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qa).join(`
`)})(t),g=(function(I){let L=[];for(let q in I){let W=I[q];W!==!1&&L.push("#define "+q+" "+W)}return L.join(`
`)})(s),m=i.createProgram(),f,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qa).join(`
`),f.length>0&&(f+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qa).join(`
`),v.length>0&&(v+=`
`)):(f=[wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qa).join(`
`),v=[wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==cr?"#define TONE_MAPPING":"",t.toneMapping!==cr?Bt.tonemapping_pars_fragment:"",t.toneMapping!==cr?a0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,s0("linearToOutputTexel",t.outputColorSpace),o0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qa).join(`
`)),a=Ih(a),a=Tp(a,t),a=bp(a,t),o=Ih(o),o=Tp(o,t),o=bp(o,t),a=Sp(a),o=Sp(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,v=["#define varying in",t.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let _=y+f+a,x=y+v+o,T=_p(i,i.VERTEX_SHADER,_),b=_p(i,i.FRAGMENT_SHADER,x);function R(I){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",q=i.getShaderInfoLog(T)||"",W=i.getShaderInfoLog(b)||"",re=L.trim(),ce=q.trim(),Y=W.trim(),he=!0,Ae=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(he=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,T,b);else{let ze=Mp(i,T,"vertex"),Pe=Mp(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+re+`
`+ze+`
`+Pe)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):ce!==""&&Y!==""||(Ae=!1);Ae&&(I.diagnostics={runnable:he,programLog:re,vertexShader:{log:ce,prefix:f},fragmentShader:{log:Y,prefix:v}})}i.deleteShader(T),i.deleteShader(b),B=new ea(i,m),U=(function(L,q){let W={},re=L.getProgramParameter(q,L.ACTIVE_ATTRIBUTES);for(let ce=0;ce<re;ce++){let Y=L.getActiveAttrib(q,ce),he=Y.name,Ae=1;Y.type===L.FLOAT_MAT2&&(Ae=2),Y.type===L.FLOAT_MAT3&&(Ae=3),Y.type===L.FLOAT_MAT4&&(Ae=4),W[he]={type:Y.type,location:L.getAttribLocation(q,he),locationSize:Ae}}return W})(i,m)}let B,U;i.attachShader(m,T),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),this.getUniforms=function(){return B===void 0&&R(this),B},this.getAttributes=function(){return U===void 0&&R(this),U};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(m,37297)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r0++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=b,this}var f0=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Lh(e),t.set(e,n)),n}},Lh=class{constructor(e){this.id=f0++,this.code=e,this.usedTimes=0}};function m0(r,e,t,n,i,s,a){let o=new xa,c=new Ph,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,y,_,x){let T=_.fog,b=x.geometry,R=f.isMeshStandardMaterial?_.environment:null,B=(f.isMeshStandardMaterial?t:e).get(f.envMap||R),U=B&&B.mapping===Va?B.image.height:null,F=g[f.type];f.precision!==null&&(p=i.getMaxPrecision(f.precision),p!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",p,"instead."));let I=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,L=I!==void 0?I.length:0,q,W,re,ce,Y=0;if(b.morphAttributes.position!==void 0&&(Y=1),b.morphAttributes.normal!==void 0&&(Y=2),b.morphAttributes.color!==void 0&&(Y=3),F){let Te=ki[F];q=Te.vertexShader,W=Te.fragmentShader}else q=f.vertexShader,W=f.fragmentShader,c.update(f),re=c.getVertexShaderID(f),ce=c.getFragmentShaderID(f);let he=r.getRenderTarget(),Ae=r.state.buffers.depth.getReversed(),ze=x.isInstancedMesh===!0,Pe=x.isBatchedMesh===!0,We=!!f.map,Le=!!f.matcap,_e=!!B,$=!!f.aoMap,H=!!f.lightMap,Ie=!!f.bumpMap,P=!!f.normalMap,C=!!f.displacementMap,X=!!f.emissiveMap,k=!!f.metalnessMap,S=!!f.roughnessMap,D=f.anisotropy>0,j=f.clearcoat>0,V=f.dispersion>0,me=f.iridescence>0,ie=f.sheen>0,Q=f.transmission>0,Ne=D&&!!f.anisotropyMap,qe=j&&!!f.clearcoatMap,Be=j&&!!f.clearcoatNormalMap,tt=j&&!!f.clearcoatRoughnessMap,ft=me&&!!f.iridescenceMap,gt=me&&!!f.iridescenceThicknessMap,Et=ie&&!!f.sheenColorMap,bt=ie&&!!f.sheenRoughnessMap,z=!!f.specularMap,ne=!!f.specularColorMap,le=!!f.specularIntensityMap,ge=Q&&!!f.transmissionMap,de=Q&&!!f.thicknessMap,ee=!!f.gradientMap,fe=!!f.alphaMap,se=f.alphaTest>0,De=!!f.alphaHash,Z=!!f.extensions,A=cr;f.toneMapped&&(he!==null&&he.isXRRenderTarget!==!0||(A=r.toneMapping));let Se={shaderID:F,shaderType:f.type,shaderName:f.name,vertexShader:q,fragmentShader:W,defines:f.defines,customVertexShaderID:re,customFragmentShaderID:ce,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:p,batching:Pe,batchingColor:Pe&&x._colorsTexture!==null,instancing:ze,instancingColor:ze&&x.instanceColor!==null,instancingMorph:ze&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?r.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Un,alphaToCoverage:!!f.alphaToCoverage,map:We,matcap:Le,envMap:_e,envMapMode:_e&&B.mapping,envMapCubeUVHeight:U,aoMap:$,lightMap:H,bumpMap:Ie,normalMap:P,displacementMap:d&&C,emissiveMap:X,normalMapObjectSpace:P&&f.normalMapType===Hd,normalMapTangentSpace:P&&f.normalMapType===Vd,metalnessMap:k,roughnessMap:S,anisotropy:D,anisotropyMap:Ne,clearcoat:j,clearcoatMap:qe,clearcoatNormalMap:Be,clearcoatRoughnessMap:tt,dispersion:V,iridescence:me,iridescenceMap:ft,iridescenceThicknessMap:gt,sheen:ie,sheenColorMap:Et,sheenRoughnessMap:bt,specularMap:z,specularColorMap:ne,specularIntensityMap:le,transmission:Q,transmissionMap:ge,thicknessMap:de,gradientMap:ee,opaque:f.transparent===!1&&f.blending===za&&f.alphaToCoverage===!1,alphaMap:fe,alphaTest:se,alphaHash:De,combine:f.combine,mapUv:We&&m(f.map.channel),aoMapUv:$&&m(f.aoMap.channel),lightMapUv:H&&m(f.lightMap.channel),bumpMapUv:Ie&&m(f.bumpMap.channel),normalMapUv:P&&m(f.normalMap.channel),displacementMapUv:C&&m(f.displacementMap.channel),emissiveMapUv:X&&m(f.emissiveMap.channel),metalnessMapUv:k&&m(f.metalnessMap.channel),roughnessMapUv:S&&m(f.roughnessMap.channel),anisotropyMapUv:Ne&&m(f.anisotropyMap.channel),clearcoatMapUv:qe&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:Be&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:bt&&m(f.sheenRoughnessMap.channel),specularMapUv:z&&m(f.specularMap.channel),specularColorMapUv:ne&&m(f.specularColorMap.channel),specularIntensityMapUv:le&&m(f.specularIntensityMap.channel),transmissionMapUv:ge&&m(f.transmissionMap.channel),thicknessMapUv:de&&m(f.thicknessMap.channel),alphaMapUv:fe&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(P||D),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(We||fe),fog:!!T,useFog:f.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ae,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:Y,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&y.length>0,shadowMapType:r.shadowMap.type,toneMapping:A,decodeVideoTexture:We&&f.map.isVideoTexture===!0&&kt.getTransfer(f.map.colorSpace)===tn,decodeVideoTextureEmissive:X&&f.emissiveMap.isVideoTexture===!0&&kt.getTransfer(f.emissiveMap.colorSpace)===tn,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Ot,flipSided:f.side===si,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Z&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Z&&f.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let y in f.defines)v.push(y),v.push(f.defines[y]);return f.isRawShaderMaterial===!1&&((function(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)})(v,f),(function(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)})(v,f),v.push(r.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=g[f.type],y;if(v){let _=ki[v];y=ep.clone(_.uniforms)}else y=f.uniforms;return y},acquireProgram:function(f,v){let y;for(let _=0,x=h.length;_<x;_++){let T=h[_];if(T.cacheKey===v){y=T,++y.usedTimes;break}}return y===void 0&&(y=new p0(r,v,f,s),h.push(y)),y},releaseProgram:function(f){if(--f.usedTimes===0){let v=h.indexOf(f);h[v]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function g0(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function v0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Ep(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ap(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||v0),n.length>1&&n.sort(o||Ep),i.length>1&&i.sort(o||Ep)}}}function y0(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Ap,r.set(e,[i])):t>=n.length?(i=new Ap,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function _0(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Je};break;case"SpotLight":t={position:new w,direction:new w,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var x0=0;function M0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function T0(r){let e=new _0,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new ct,a=new ct;return{setup:function(o){let c=0,l=0,h=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let u=0,d=0,p=0,g=0,m=0,f=0,v=0,y=0,_=0,x=0,T=0;o.sort(M0);for(let R=0,B=o.length;R<B;R++){let U=o[R],F=U.color,I=U.intensity,L=U.distance,q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)c+=F.r*I,l+=F.g*I,h+=F.b*I;else if(U.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(U.sh.coefficients[W],I);T++}else if(U.isDirectionalLight){let W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let re=U.shadow,ce=t.get(U);ce.shadowIntensity=re.intensity,ce.shadowBias=re.bias,ce.shadowNormalBias=re.normalBias,ce.shadowRadius=re.radius,ce.shadowMapSize=re.mapSize,n.directionalShadow[u]=ce,n.directionalShadowMap[u]=q,n.directionalShadowMatrix[u]=U.shadow.matrix,f++}n.directional[u]=W,u++}else if(U.isSpotLight){let W=e.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(F).multiplyScalar(I),W.distance=L,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,n.spot[p]=W;let re=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,re.updateMatrices(U),U.castShadow&&x++),n.spotLightMatrix[p]=re.matrix,U.castShadow){let ce=t.get(U);ce.shadowIntensity=re.intensity,ce.shadowBias=re.bias,ce.shadowNormalBias=re.normalBias,ce.shadowRadius=re.radius,ce.shadowMapSize=re.mapSize,n.spotShadow[p]=ce,n.spotShadowMap[p]=q,y++}p++}else if(U.isRectAreaLight){let W=e.get(U);W.color.copy(F).multiplyScalar(I),W.halfWidth.set(.5*U.width,0,0),W.halfHeight.set(0,.5*U.height,0),n.rectArea[g]=W,g++}else if(U.isPointLight){let W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){let re=U.shadow,ce=t.get(U);ce.shadowIntensity=re.intensity,ce.shadowBias=re.bias,ce.shadowNormalBias=re.normalBias,ce.shadowRadius=re.radius,ce.shadowMapSize=re.mapSize,ce.shadowCameraNear=re.camera.near,ce.shadowCameraFar=re.camera.far,n.pointShadow[d]=ce,n.pointShadowMap[d]=q,n.pointShadowMatrix[d]=U.shadow.matrix,v++}n.point[d]=W,d++}else if(U.isHemisphereLight){let W=e.get(U);W.skyColor.copy(U.color).multiplyScalar(I),W.groundColor.copy(U.groundColor).multiplyScalar(I),n.hemi[m]=W,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ye.LTC_FLOAT_1,n.rectAreaLTC2=Ye.LTC_FLOAT_2):(n.rectAreaLTC1=Ye.LTC_HALF_1,n.rectAreaLTC2=Ye.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===p&&b.rectAreaLength===g&&b.hemiLength===m&&b.numDirectionalShadows===f&&b.numPointShadows===v&&b.numSpotShadows===y&&b.numSpotMaps===_&&b.numLightProbes===T||(n.directional.length=u,n.spot.length=p,n.rectArea.length=g,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=T,b.directionalLength=u,b.pointLength=d,b.spotLength=p,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=f,b.numPointShadows=v,b.numSpotShadows=y,b.numSpotMaps=_,b.numLightProbes=T,n.version=x0++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,p=0,g=c.matrixWorldInverse;for(let m=0,f=o.length;m<f;m++){let v=o[m];if(v.isDirectionalLight){let y=n.directional[l];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),l++}else if(v.isSpotLight){let y=n.spot[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(v.isRectAreaLight){let y=n.rectArea[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(.5*v.width,0,0),y.halfHeight.set(0,.5*v.height,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),d++}else if(v.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){let y=n.hemi[p];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),p++}}},state:n}}function Cp(r){let e=new T0(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function b0(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Cp(r),e.set(t,[s])):n>=i.length?(s=new Cp(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function S0(r,e,t){let n=new Tr,i=new be,s=new be,a=new qt,o=new wr({depthPacking:$s}),c=new Ko,l={},h=t.maxTextureSize,u={[Ar]:si,[si]:Ar,[Ot]:Ot},d=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new ut;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new ht(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cc;let v=this.type;function y(b,R){let B=e.update(m);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new di(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(R,null,B,d,m,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(R,null,B,p,m,null)}function _(b,R,B,U){let F=null,I=B.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)F=I;else if(F=B.isPointLight===!0?c:o,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let L=F.uuid,q=R.uuid,W=l[L];W===void 0&&(W={},l[L]=W);let re=W[q];re===void 0&&(re=F.clone(),W[q]=re,R.addEventListener("dispose",T)),F=re}return F.visible=R.visible,F.wireframe=R.wireframe,F.side=U===zi?R.shadowSide!==null?R.shadowSide:R.side:R.shadowSide!==null?R.shadowSide:u[R.side],F.alphaMap=R.alphaMap,F.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,F.map=R.map,F.clipShadows=R.clipShadows,F.clippingPlanes=R.clippingPlanes,F.clipIntersection=R.clipIntersection,F.displacementMap=R.displacementMap,F.displacementScale=R.displacementScale,F.displacementBias=R.displacementBias,F.wireframeLinewidth=R.wireframeLinewidth,F.linewidth=R.linewidth,B.isPointLight===!0&&F.isMeshDistanceMaterial===!0&&(r.properties.get(F).light=B),F}function x(b,R,B,U,F){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&F===zi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld);let L=e.update(b),q=b.material;if(Array.isArray(q)){let W=L.groups;for(let re=0,ce=W.length;re<ce;re++){let Y=W[re],he=q[Y.materialIndex];if(he&&he.visible){let Ae=_(b,he,U,F);b.onBeforeShadow(r,b,R,B,L,Ae,Y),r.renderBufferDirect(B,null,L,Ae,b,Y),b.onAfterShadow(r,b,R,B,L,Ae,Y)}}}else if(q.visible){let W=_(b,q,U,F);b.onBeforeShadow(r,b,R,B,L,W,null),r.renderBufferDirect(B,null,L,W,b,null),b.onAfterShadow(r,b,R,B,L,W,null)}}let I=b.children;for(let L=0,q=I.length;L<q;L++)x(I[L],R,B,U,F)}function T(b){b.target.removeEventListener("dispose",T);for(let R in l){let B=l[R],U=b.target.uuid;U in B&&(B[U].dispose(),delete B[U])}}this.render=function(b,R,B){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;let U=r.getRenderTarget(),F=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Cr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let q=v!==zi&&this.type===zi,W=v===zi&&this.type!==zi;for(let re=0,ce=b.length;re<ce;re++){let Y=b[re],he=Y.shadow;if(he===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(he.autoUpdate===!1&&he.needsUpdate===!1)continue;i.copy(he.mapSize);let Ae=he.getFrameExtents();if(i.multiply(Ae),s.copy(he.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Ae.x),i.x=s.x*Ae.x,he.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Ae.y),i.y=s.y*Ae.y,he.mapSize.y=s.y)),he.map===null||q===!0||W===!0){let Pe=this.type!==zi?{minFilter:ni,magFilter:ni}:{};he.map!==null&&he.map.dispose(),he.map=new di(i.x,i.y,Pe),he.map.texture.name=Y.name+".shadowMap",he.camera.updateProjectionMatrix()}r.setRenderTarget(he.map),r.clear();let ze=he.getViewportCount();for(let Pe=0;Pe<ze;Pe++){let We=he.getViewport(Pe);a.set(s.x*We.x,s.y*We.y,s.x*We.z,s.y*We.w),L.viewport(a),he.updateMatrices(Y,Pe),n=he.getFrustum(),x(R,B,he.camera,Y,this.type)}he.isPointLightShadow!==!0&&this.type===zi&&y(he,B),he.needsUpdate=!1}v=this.type,f.needsUpdate=!1,r.setRenderTarget(U,F,I)}}var w0={[rl]:sl,[al]:cl,[ol]:hl,[ka]:ll,[sl]:rl,[cl]:al,[hl]:ol,[ll]:ka};function E0(r,e){let t=new function(){let S=!1,D=new qt,j=null,V=new qt(0,0,0,0);return{setMask:function(me){j===me||S||(r.colorMask(me,me,me,me),j=me)},setLocked:function(me){S=me},setClear:function(me,ie,Q,Ne,qe){qe===!0&&(me*=Ne,ie*=Ne,Q*=Ne),D.set(me,ie,Q,Ne),V.equals(D)===!1&&(r.clearColor(me,ie,Q,Ne),V.copy(D))},reset:function(){S=!1,j=null,V.set(-1,0,0,0)}}},n=new function(){let S=!1,D=!1,j=null,V=null,me=null;return{setReversed:function(ie){if(D!==ie){let Q=e.get("EXT_clip_control");ie?Q.clipControlEXT(Q.LOWER_LEFT_EXT,Q.ZERO_TO_ONE_EXT):Q.clipControlEXT(Q.LOWER_LEFT_EXT,Q.NEGATIVE_ONE_TO_ONE_EXT),D=ie;let Ne=me;me=null,this.setClear(Ne)}},getReversed:function(){return D},setTest:function(ie){ie?_e(r.DEPTH_TEST):$(r.DEPTH_TEST)},setMask:function(ie){j===ie||S||(r.depthMask(ie),j=ie)},setFunc:function(ie){if(D&&(ie=w0[ie]),V!==ie){switch(ie){case rl:r.depthFunc(r.NEVER);break;case sl:r.depthFunc(r.ALWAYS);break;case al:r.depthFunc(r.LESS);break;case ka:r.depthFunc(r.LEQUAL);break;case ol:r.depthFunc(r.EQUAL);break;case ll:r.depthFunc(r.GEQUAL);break;case cl:r.depthFunc(r.GREATER);break;case hl:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}V=ie}},setLocked:function(ie){S=ie},setClear:function(ie){me!==ie&&(D&&(ie=1-ie),r.clearDepth(ie),me=ie)},reset:function(){S=!1,j=null,V=null,me=null,D=!1}}},i=new function(){let S=!1,D=null,j=null,V=null,me=null,ie=null,Q=null,Ne=null,qe=null;return{setTest:function(Be){S||(Be?_e(r.STENCIL_TEST):$(r.STENCIL_TEST))},setMask:function(Be){D===Be||S||(r.stencilMask(Be),D=Be)},setFunc:function(Be,tt,ft){j===Be&&V===tt&&me===ft||(r.stencilFunc(Be,tt,ft),j=Be,V=tt,me=ft)},setOp:function(Be,tt,ft){ie===Be&&Q===tt&&Ne===ft||(r.stencilOp(Be,tt,ft),ie=Be,Q=tt,Ne=ft)},setLocked:function(Be){S=Be},setClear:function(Be){qe!==Be&&(r.clearStencil(Be),qe=Be)},reset:function(){S=!1,D=null,j=null,V=null,me=null,ie=null,Q=null,Ne=null,qe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,g=null,m=null,f=null,v=null,y=null,_=null,x=new Je(0,0,0),T=0,b=!1,R=null,B=null,U=null,F=null,I=null,L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,re=r.getParameter(r.VERSION);re.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(re)[1]),q=W>=1):re.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),q=W>=2);let ce=null,Y={},he=r.getParameter(r.SCISSOR_BOX),Ae=r.getParameter(r.VIEWPORT),ze=new qt().fromArray(he),Pe=new qt().fromArray(Ae);function We(S,D,j,V){let me=new Uint8Array(4),ie=r.createTexture();r.bindTexture(S,ie),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Q=0;Q<j;Q++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(D,0,r.RGBA,1,1,V,0,r.RGBA,r.UNSIGNED_BYTE,me):r.texImage2D(D+Q,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,me);return ie}let Le={};function _e(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function $(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}Le[r.TEXTURE_2D]=We(r.TEXTURE_2D,r.TEXTURE_2D,1),Le[r.TEXTURE_CUBE_MAP]=We(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[r.TEXTURE_2D_ARRAY]=We(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Le[r.TEXTURE_3D]=We(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),_e(r.DEPTH_TEST),n.setFunc(ka),C(!1),X(Ac),_e(r.CULL_FACE),P(Cr);let H={[js]:r.FUNC_ADD,[hd]:r.FUNC_SUBTRACT,[ud]:r.FUNC_REVERSE_SUBTRACT};H[dd]=r.MIN,H[pd]=r.MAX;let Ie={[fd]:r.ZERO,[md]:r.ONE,[gd]:r.SRC_COLOR,[yd]:r.SRC_ALPHA,[Sd]:r.SRC_ALPHA_SATURATE,[Td]:r.DST_COLOR,[xd]:r.DST_ALPHA,[vd]:r.ONE_MINUS_SRC_COLOR,[_d]:r.ONE_MINUS_SRC_ALPHA,[bd]:r.ONE_MINUS_DST_COLOR,[Md]:r.ONE_MINUS_DST_ALPHA,[wd]:r.CONSTANT_COLOR,[Ed]:r.ONE_MINUS_CONSTANT_COLOR,[Ad]:r.CONSTANT_ALPHA,[Cd]:r.ONE_MINUS_CONSTANT_ALPHA};function P(S,D,j,V,me,ie,Q,Ne,qe,Be){if(S!==Cr){if(d===!1&&(_e(r.BLEND),d=!0),S===cd)me=me||D,ie=ie||j,Q=Q||V,D===g&&me===v||(r.blendEquationSeparate(H[D],H[me]),g=D,v=me),j===m&&V===f&&ie===y&&Q===_||(r.blendFuncSeparate(Ie[j],Ie[V],Ie[ie],Ie[Q]),m=j,f=V,y=ie,_=Q),Ne.equals(x)!==!1&&qe===T||(r.blendColor(Ne.r,Ne.g,Ne.b,qe),x.copy(Ne),T=qe),p=S,b=!1;else if(S!==p||Be!==b){if(g===js&&v===js||(r.blendEquation(r.FUNC_ADD),g=js,v=js),Be)switch(S){case za:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ga:r.blendFunc(r.ONE,r.ONE);break;case Rc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ic:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case za:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ga:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Rc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ic:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}m=null,f=null,y=null,_=null,x.set(0,0,0),T=0,p=S,b=Be}}else d===!0&&($(r.BLEND),d=!1)}function C(S){R!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),R=S)}function X(S){S!==od?(_e(r.CULL_FACE),S!==B&&(S===Ac?r.cullFace(r.BACK):S===ld?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):$(r.CULL_FACE),B=S}function k(S,D,j){S?(_e(r.POLYGON_OFFSET_FILL),F===D&&I===j||(r.polygonOffset(D,j),F=D,I=j)):$(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:_e,disable:$,bindFramebuffer:function(S,D){return c[S]!==D&&(r.bindFramebuffer(S,D),c[S]=D,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=D),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=D),!0)},drawBuffers:function(S,D){let j=h,V=!1;if(S){j=l.get(D),j===void 0&&(j=[],l.set(D,j));let me=S.textures;if(j.length!==me.length||j[0]!==r.COLOR_ATTACHMENT0){for(let ie=0,Q=me.length;ie<Q;ie++)j[ie]=r.COLOR_ATTACHMENT0+ie;j.length=me.length,V=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,V=!0);V&&r.drawBuffers(j)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:P,setMaterial:function(S,D){S.side===Ot?$(r.CULL_FACE):_e(r.CULL_FACE);let j=S.side===si;D&&(j=!j),C(j),S.blending===za&&S.transparent===!1?P(Cr):P(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let V=S.stencilWrite;i.setTest(V),V&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),k(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?_e(r.SAMPLE_ALPHA_TO_COVERAGE):$(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:C,setCullFace:X,setLineWidth:function(S){S!==U&&(q&&r.lineWidth(S),U=S)},setPolygonOffset:k,setScissorTest:function(S){S?_e(r.SCISSOR_TEST):$(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+L-1),ce!==S&&(r.activeTexture(S),ce=S)},bindTexture:function(S,D,j){j===void 0&&(j=ce===null?r.TEXTURE0+L-1:ce);let V=Y[j];V===void 0&&(V={type:void 0,texture:void 0},Y[j]=V),V.type===S&&V.texture===D||(ce!==j&&(r.activeTexture(j),ce=j),r.bindTexture(S,D||Le[S]),V.type=S,V.texture=D)},unbindTexture:function(){let S=Y[ce];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,D){let j=a.get(D);j===void 0&&(j=new WeakMap,a.set(D,j));let V=j.get(S);V===void 0&&(V=r.getUniformBlockIndex(D,S.name),j.set(S,V))},uniformBlockBinding:function(S,D){let j=a.get(D).get(S);s.get(D)!==j&&(r.uniformBlockBinding(D,j,S.__bindingPointIndex),s.set(D,j))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){ze.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),ze.copy(S))},viewport:function(S){Pe.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),Pe.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ce=null,Y={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,g=null,m=null,f=null,v=null,y=null,_=null,x=new Je(0,0,0),T=0,b=!1,R=null,B=null,U=null,F=null,I=null,ze.set(0,0,r.canvas.width,r.canvas.height),Pe.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function A0(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new be,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,C){return p?new OffscreenCanvas(P,C):Ps("canvas")}function m(P,C,X){let k=1,S=Ie(P);if((S.width>X||S.height>X)&&(k=X/Math.max(S.width,S.height)),k<1){if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let D=Math.floor(k*S.width),j=Math.floor(k*S.height);u===void 0&&(u=g(D,j));let V=C?g(D,j):u;return V.width=D,V.height=j,V.getContext("2d").drawImage(P,0,0,D,j),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+D+"x"+j+")."),V}return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),P}return P}function f(P){return P.generateMipmaps}function v(P){r.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(P,C,X,k,S=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let D=C;if(C===r.RED&&(X===r.FLOAT&&(D=r.R32F),X===r.HALF_FLOAT&&(D=r.R16F),X===r.UNSIGNED_BYTE&&(D=r.R8)),C===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(D=r.R8UI),X===r.UNSIGNED_SHORT&&(D=r.R16UI),X===r.UNSIGNED_INT&&(D=r.R32UI),X===r.BYTE&&(D=r.R8I),X===r.SHORT&&(D=r.R16I),X===r.INT&&(D=r.R32I)),C===r.RG&&(X===r.FLOAT&&(D=r.RG32F),X===r.HALF_FLOAT&&(D=r.RG16F),X===r.UNSIGNED_BYTE&&(D=r.RG8)),C===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(D=r.RG8UI),X===r.UNSIGNED_SHORT&&(D=r.RG16UI),X===r.UNSIGNED_INT&&(D=r.RG32UI),X===r.BYTE&&(D=r.RG8I),X===r.SHORT&&(D=r.RG16I),X===r.INT&&(D=r.RG32I)),C===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(D=r.RGB8UI),X===r.UNSIGNED_SHORT&&(D=r.RGB16UI),X===r.UNSIGNED_INT&&(D=r.RGB32UI),X===r.BYTE&&(D=r.RGB8I),X===r.SHORT&&(D=r.RGB16I),X===r.INT&&(D=r.RGB32I)),C===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(D=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(D=r.RGBA16UI),X===r.UNSIGNED_INT&&(D=r.RGBA32UI),X===r.BYTE&&(D=r.RGBA8I),X===r.SHORT&&(D=r.RGBA16I),X===r.INT&&(D=r.RGBA32I)),C===r.RGB&&(X===r.UNSIGNED_INT_5_9_9_9_REV&&(D=r.RGB9_E5),X===r.UNSIGNED_INT_10F_11F_11F_REV&&(D=r.R11F_G11F_B10F)),C===r.RGBA){let j=S?va:kt.getTransfer(k);X===r.FLOAT&&(D=r.RGBA32F),X===r.HALF_FLOAT&&(D=r.RGBA16F),X===r.UNSIGNED_BYTE&&(D=j===tn?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(D=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(D=r.RGB5_A1)}return D!==r.R16F&&D!==r.R32F&&D!==r.RG16F&&D!==r.RG32F&&D!==r.RGBA16F&&D!==r.RGBA32F||e.get("EXT_color_buffer_float"),D}function x(P,C){let X;return P?C===null||C===is||C===Ks?X=r.DEPTH24_STENCIL8:C===fi?X=r.DEPTH32F_STENCIL8:C===Zs&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===is||C===Ks?X=r.DEPTH_COMPONENT24:C===fi?X=r.DEPTH_COMPONENT32F:C===Zs&&(X=r.DEPTH_COMPONENT16),X}function T(P,C){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==ni&&P.minFilter!==Nn?Math.log2(Math.max(C.width,C.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?C.mipmaps.length:1}function b(P){let C=P.target;C.removeEventListener("dispose",b),(function(X){let k=n.get(X);if(k.__webglInit===void 0)return;let S=X.source,D=d.get(S);if(D){let j=D[k.__cacheKey];j.usedTimes--,j.usedTimes===0&&B(X),Object.keys(D).length===0&&d.delete(S)}n.remove(X)})(C),C.isVideoTexture&&h.delete(C)}function R(P){let C=P.target;C.removeEventListener("dispose",R),(function(X){let k=n.get(X);if(X.depthTexture&&(X.depthTexture.dispose(),n.remove(X.depthTexture)),X.isWebGLCubeRenderTarget)for(let D=0;D<6;D++){if(Array.isArray(k.__webglFramebuffer[D]))for(let j=0;j<k.__webglFramebuffer[D].length;j++)r.deleteFramebuffer(k.__webglFramebuffer[D][j]);else r.deleteFramebuffer(k.__webglFramebuffer[D]);k.__webglDepthbuffer&&r.deleteRenderbuffer(k.__webglDepthbuffer[D])}else{if(Array.isArray(k.__webglFramebuffer))for(let D=0;D<k.__webglFramebuffer.length;D++)r.deleteFramebuffer(k.__webglFramebuffer[D]);else r.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&r.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&r.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let D=0;D<k.__webglColorRenderbuffer.length;D++)k.__webglColorRenderbuffer[D]&&r.deleteRenderbuffer(k.__webglColorRenderbuffer[D]);k.__webglDepthRenderbuffer&&r.deleteRenderbuffer(k.__webglDepthRenderbuffer)}let S=X.textures;for(let D=0,j=S.length;D<j;D++){let V=n.get(S[D]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(S[D])}n.remove(X)})(C)}function B(P){let C=n.get(P);r.deleteTexture(C.__webglTexture);let X=P.source;delete d.get(X)[C.__cacheKey],a.memory.textures--}let U=0;function F(P,C){let X=n.get(P);if(P.isVideoTexture&&(function(k){let S=a.render.frame;h.get(k)!==S&&(h.set(k,S),k.update())})(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&X.__version!==P.version){let k=P.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(k.complete!==!1)return void Y(X,P,C);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+C)}let I={[vn]:r.REPEAT,[_r]:r.CLAMP_TO_EDGE,[Is]:r.MIRRORED_REPEAT},L={[ni]:r.NEAREST,[pl]:r.NEAREST_MIPMAP_NEAREST,[ns]:r.NEAREST_MIPMAP_LINEAR,[Nn]:r.LINEAR,[Ys]:r.LINEAR_MIPMAP_NEAREST,[Qn]:r.LINEAR_MIPMAP_LINEAR},q={[Wd]:r.NEVER,[Kd]:r.ALWAYS,[Xd]:r.LESS,[ph]:r.LEQUAL,[jd]:r.EQUAL,[Zd]:r.GEQUAL,[qd]:r.GREATER,[Yd]:r.NOTEQUAL};function W(P,C){if(C.type!==fi||e.has("OES_texture_float_linear")!==!1||C.magFilter!==Nn&&C.magFilter!==Ys&&C.magFilter!==ns&&C.magFilter!==Qn&&C.minFilter!==Nn&&C.minFilter!==Ys&&C.minFilter!==ns&&C.minFilter!==Qn||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,I[C.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,I[C.wrapT]),P!==r.TEXTURE_3D&&P!==r.TEXTURE_2D_ARRAY||r.texParameteri(P,r.TEXTURE_WRAP_R,I[C.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,L[C.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,L[C.minFilter]),C.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,q[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===ni||C.minFilter!==ns&&C.minFilter!==Qn||C.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function re(P,C){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,C.addEventListener("dispose",b));let k=C.source,S=d.get(k);S===void 0&&(S={},d.set(k,S));let D=(function(j){let V=[];return V.push(j.wrapS),V.push(j.wrapT),V.push(j.wrapR||0),V.push(j.magFilter),V.push(j.minFilter),V.push(j.anisotropy),V.push(j.internalFormat),V.push(j.format),V.push(j.type),V.push(j.generateMipmaps),V.push(j.premultiplyAlpha),V.push(j.flipY),V.push(j.unpackAlignment),V.push(j.colorSpace),V.join()})(C);if(D!==P.__cacheKey){S[D]===void 0&&(S[D]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),S[D].usedTimes++;let j=S[P.__cacheKey];j!==void 0&&(S[P.__cacheKey].usedTimes--,j.usedTimes===0&&B(C)),P.__cacheKey=D,P.__webglTexture=S[D].texture}return X}function ce(P,C,X){return Math.floor(Math.floor(P/X)/C)}function Y(P,C,X){let k=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(k=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(k=r.TEXTURE_3D);let S=re(P,C),D=C.source;t.bindTexture(k,P.__webglTexture,r.TEXTURE0+X);let j=n.get(D);if(D.version!==j.__version||S===!0){t.activeTexture(r.TEXTURE0+X);let V=kt.getPrimaries(kt.workingColorSpace),me=C.colorSpace===rs?null:kt.getPrimaries(C.colorSpace),ie=C.colorSpace===rs||V===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let Q=m(C.image,!1,i.maxTextureSize);Q=H(C,Q);let Ne=s.convert(C.format,C.colorSpace),qe=s.convert(C.type),Be,tt=_(C.internalFormat,Ne,qe,C.colorSpace,C.isVideoTexture);W(k,C);let ft=C.mipmaps,gt=C.isVideoTexture!==!0,Et=j.__version===void 0||S===!0,bt=D.dataReady,z=T(C,Q);if(C.isDepthTexture)tt=x(C.format===Wa,C.type),Et&&(gt?t.texStorage2D(r.TEXTURE_2D,1,tt,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,tt,Q.width,Q.height,0,Ne,qe,null));else if(C.isDataTexture)if(ft.length>0){gt&&Et&&t.texStorage2D(r.TEXTURE_2D,z,tt,ft[0].width,ft[0].height);for(let ne=0,le=ft.length;ne<le;ne++)Be=ft[ne],gt?bt&&t.texSubImage2D(r.TEXTURE_2D,ne,0,0,Be.width,Be.height,Ne,qe,Be.data):t.texImage2D(r.TEXTURE_2D,ne,tt,Be.width,Be.height,0,Ne,qe,Be.data);C.generateMipmaps=!1}else gt?(Et&&t.texStorage2D(r.TEXTURE_2D,z,tt,Q.width,Q.height),bt&&(function(ne,le,ge,de){let ee=ne.updateRanges;if(ee.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,le.width,le.height,ge,de,le.data);else{ee.sort((A,Se)=>A.start-Se.start);let fe=0;for(let A=1;A<ee.length;A++){let Se=ee[fe],Te=ee[A],xe=Se.start+Se.count,Ce=ce(Te.start,le.width,4),we=ce(Se.start,le.width,4);Te.start<=xe+1&&Ce===we&&ce(Te.start+Te.count-1,le.width,4)===Ce?Se.count=Math.max(Se.count,Te.start+Te.count-Se.start):(++fe,ee[fe]=Te)}ee.length=fe+1;let se=r.getParameter(r.UNPACK_ROW_LENGTH),De=r.getParameter(r.UNPACK_SKIP_PIXELS),Z=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,le.width);for(let A=0,Se=ee.length;A<Se;A++){let Te=ee[A],xe=Math.floor(Te.start/4),Ce=Math.ceil(Te.count/4),we=xe%le.width,ke=Math.floor(xe/le.width),ot=Ce;r.pixelStorei(r.UNPACK_SKIP_PIXELS,we),r.pixelStorei(r.UNPACK_SKIP_ROWS,ke),t.texSubImage2D(r.TEXTURE_2D,0,we,ke,ot,1,ge,de,le.data)}ne.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,se),r.pixelStorei(r.UNPACK_SKIP_PIXELS,De),r.pixelStorei(r.UNPACK_SKIP_ROWS,Z)}})(C,Q,Ne,qe)):t.texImage2D(r.TEXTURE_2D,0,tt,Q.width,Q.height,0,Ne,qe,Q.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){gt&&Et&&t.texStorage3D(r.TEXTURE_2D_ARRAY,z,tt,ft[0].width,ft[0].height,Q.depth);for(let ne=0,le=ft.length;ne<le;ne++)if(Be=ft[ne],C.format!==mi)if(Ne!==null)if(gt){if(bt)if(C.layerUpdates.size>0){let ge=xh(Be.width,Be.height,C.format,C.type);for(let de of C.layerUpdates){let ee=Be.data.subarray(de*ge/Be.data.BYTES_PER_ELEMENT,(de+1)*ge/Be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,de,Be.width,Be.height,1,Ne,ee)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,Be.width,Be.height,Q.depth,Ne,Be.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ne,tt,Be.width,Be.height,Q.depth,0,Be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?bt&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,Be.width,Be.height,Q.depth,Ne,qe,Be.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ne,tt,Be.width,Be.height,Q.depth,0,Ne,qe,Be.data)}else{gt&&Et&&t.texStorage2D(r.TEXTURE_2D,z,tt,ft[0].width,ft[0].height);for(let ne=0,le=ft.length;ne<le;ne++)Be=ft[ne],C.format!==mi?Ne!==null?gt?bt&&t.compressedTexSubImage2D(r.TEXTURE_2D,ne,0,0,Be.width,Be.height,Ne,Be.data):t.compressedTexImage2D(r.TEXTURE_2D,ne,tt,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?bt&&t.texSubImage2D(r.TEXTURE_2D,ne,0,0,Be.width,Be.height,Ne,qe,Be.data):t.texImage2D(r.TEXTURE_2D,ne,tt,Be.width,Be.height,0,Ne,qe,Be.data)}else if(C.isDataArrayTexture)if(gt){if(Et&&t.texStorage3D(r.TEXTURE_2D_ARRAY,z,tt,Q.width,Q.height,Q.depth),bt)if(C.layerUpdates.size>0){let ne=xh(Q.width,Q.height,C.format,C.type);for(let le of C.layerUpdates){let ge=Q.data.subarray(le*ne/Q.data.BYTES_PER_ELEMENT,(le+1)*ne/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,le,Q.width,Q.height,1,Ne,qe,ge)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Ne,qe,Q.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,tt,Q.width,Q.height,Q.depth,0,Ne,qe,Q.data);else if(C.isData3DTexture)gt?(Et&&t.texStorage3D(r.TEXTURE_3D,z,tt,Q.width,Q.height,Q.depth),bt&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Ne,qe,Q.data)):t.texImage3D(r.TEXTURE_3D,0,tt,Q.width,Q.height,Q.depth,0,Ne,qe,Q.data);else if(C.isFramebufferTexture){if(Et)if(gt)t.texStorage2D(r.TEXTURE_2D,z,tt,Q.width,Q.height);else{let ne=Q.width,le=Q.height;for(let ge=0;ge<z;ge++)t.texImage2D(r.TEXTURE_2D,ge,tt,ne,le,0,Ne,qe,null),ne>>=1,le>>=1}}else if(ft.length>0){if(gt&&Et){let ne=Ie(ft[0]);t.texStorage2D(r.TEXTURE_2D,z,tt,ne.width,ne.height)}for(let ne=0,le=ft.length;ne<le;ne++)Be=ft[ne],gt?bt&&t.texSubImage2D(r.TEXTURE_2D,ne,0,0,Ne,qe,Be):t.texImage2D(r.TEXTURE_2D,ne,tt,Ne,qe,Be);C.generateMipmaps=!1}else if(gt){if(Et){let ne=Ie(Q);t.texStorage2D(r.TEXTURE_2D,z,tt,ne.width,ne.height)}bt&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ne,qe,Q)}else t.texImage2D(r.TEXTURE_2D,0,tt,Ne,qe,Q);f(C)&&v(k),j.__version=D.version,C.onUpdate&&C.onUpdate(C)}P.__version=C.version}function he(P,C,X,k,S,D){let j=s.convert(X.format,X.colorSpace),V=s.convert(X.type),me=_(X.internalFormat,j,V,X.colorSpace),ie=n.get(C),Q=n.get(X);if(Q.__renderTarget=C,!ie.__hasExternalTextures){let Ne=Math.max(1,C.width>>D),qe=Math.max(1,C.height>>D);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,D,me,Ne,qe,C.depth,0,j,V,null):t.texImage2D(S,D,me,Ne,qe,0,j,V,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),$(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,k,S,Q.__webglTexture,0,_e(C)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,k,S,Q.__webglTexture,D),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(P,C,X){if(r.bindRenderbuffer(r.RENDERBUFFER,P),C.depthBuffer){let k=C.depthTexture,S=k&&k.isDepthTexture?k.type:null,D=x(C.stencilBuffer,S),j=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=_e(C);$(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,V,D,C.width,C.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,V,D,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,D,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,P)}else{let k=C.textures;for(let S=0;S<k.length;S++){let D=k[S],j=s.convert(D.format,D.colorSpace),V=s.convert(D.type),me=_(D.internalFormat,j,V,D.colorSpace),ie=_e(C);X&&$(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,me,C.width,C.height):$(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,me,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,me,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ze(P,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!C.depthTexture||!C.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(C.depthTexture);X.__renderTarget=C,X.__webglTexture&&C.depthTexture.image.width===C.width&&C.depthTexture.image.height===C.height||(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),F(C.depthTexture,0);let k=X.__webglTexture,S=_e(C);if(C.depthTexture.format===Ha)$(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,k,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,k,0);else{if(C.depthTexture.format!==Wa)throw new Error("Unknown depthTexture format");$(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,k,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,k,0)}}function Pe(P){let C=n.get(P),X=P.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==P.depthTexture){let k=P.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),k){let S=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,k.removeEventListener("dispose",S)};k.addEventListener("dispose",S),C.__depthDisposeCallback=S}C.__boundDepthTexture=k}if(P.depthTexture&&!C.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");let k=P.texture.mipmaps;k&&k.length>0?ze(C.__webglFramebuffer[0],P):ze(C.__webglFramebuffer,P)}else if(X){C.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[k]),C.__webglDepthbuffer[k]===void 0)C.__webglDepthbuffer[k]=r.createRenderbuffer(),Ae(C.__webglDepthbuffer[k],P,!1);else{let S=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,D=C.__webglDepthbuffer[k];r.bindRenderbuffer(r.RENDERBUFFER,D),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,D)}}else{let k=P.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),Ae(C.__webglDepthbuffer,P,!1);else{let S=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,D=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,D),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,D)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let We=[],Le=[];function _e(P){return Math.min(i.maxSamples,P.samples)}function $(P){let C=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function H(P,C){let X=P.colorSpace,k=P.format,S=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==Un&&X!==rs&&(kt.getTransfer(X)===tn?k===mi&&S===Gi||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),C}function Ie(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=function(){let P=U;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),U+=1,P},this.resetTextureUnits=function(){U=0},this.setTexture2D=F,this.setTexture2DArray=function(P,C){let X=n.get(P);P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version?Y(X,P,C):t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+C)},this.setTexture3D=function(P,C){let X=n.get(P);P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version?Y(X,P,C):t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+C)},this.setTextureCube=function(P,C){let X=n.get(P);P.version>0&&X.__version!==P.version?(function(k,S,D){if(S.image.length!==6)return;let j=re(k,S),V=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+D);let me=n.get(V);if(V.version!==me.__version||j===!0){t.activeTexture(r.TEXTURE0+D);let ie=kt.getPrimaries(kt.workingColorSpace),Q=S.colorSpace===rs?null:kt.getPrimaries(S.colorSpace),Ne=S.colorSpace===rs||ie===Q?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let qe=S.isCompressedTexture||S.image[0].isCompressedTexture,Be=S.image[0]&&S.image[0].isDataTexture,tt=[];for(let ee=0;ee<6;ee++)tt[ee]=qe||Be?Be?S.image[ee].image:S.image[ee]:m(S.image[ee],!0,i.maxCubemapSize),tt[ee]=H(S,tt[ee]);let ft=tt[0],gt=s.convert(S.format,S.colorSpace),Et=s.convert(S.type),bt=_(S.internalFormat,gt,Et,S.colorSpace),z=S.isVideoTexture!==!0,ne=me.__version===void 0||j===!0,le=V.dataReady,ge,de=T(S,ft);if(W(r.TEXTURE_CUBE_MAP,S),qe){z&&ne&&t.texStorage2D(r.TEXTURE_CUBE_MAP,de,bt,ft.width,ft.height);for(let ee=0;ee<6;ee++){ge=tt[ee].mipmaps;for(let fe=0;fe<ge.length;fe++){let se=ge[fe];S.format!==mi?gt!==null?z?le&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe,0,0,se.width,se.height,gt,se.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe,bt,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe,0,0,se.width,se.height,gt,Et,se.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe,bt,se.width,se.height,0,gt,Et,se.data)}}}else{if(ge=S.mipmaps,z&&ne){ge.length>0&&de++;let ee=Ie(tt[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,de,bt,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(Be){z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,tt[ee].width,tt[ee].height,gt,Et,tt[ee].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,bt,tt[ee].width,tt[ee].height,0,gt,Et,tt[ee].data);for(let fe=0;fe<ge.length;fe++){let se=ge[fe].image[ee].image;z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe+1,0,0,se.width,se.height,gt,Et,se.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe+1,bt,se.width,se.height,0,gt,Et,se.data)}}else{z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,gt,Et,tt[ee]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,bt,gt,Et,tt[ee]);for(let fe=0;fe<ge.length;fe++){let se=ge[fe];z?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe+1,0,0,gt,Et,se.image[ee]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,fe+1,bt,gt,Et,se.image[ee])}}}f(S)&&v(r.TEXTURE_CUBE_MAP),me.__version=V.version,S.onUpdate&&S.onUpdate(S)}k.__version=S.version})(X,P,C):t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+C)},this.rebindTextures=function(P,C,X){let k=n.get(P);C!==void 0&&he(k.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&Pe(P)},this.setupRenderTarget=function(P){let C=P.texture,X=n.get(P),k=n.get(C);P.addEventListener("dispose",R);let S=P.textures,D=P.isWebGLCubeRenderTarget===!0,j=S.length>1;if(j||(k.__webglTexture===void 0&&(k.__webglTexture=r.createTexture()),k.__version=C.version,a.memory.textures++),D){X.__webglFramebuffer=[];for(let V=0;V<6;V++)if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer[V]=[];for(let me=0;me<C.mipmaps.length;me++)X.__webglFramebuffer[V][me]=r.createFramebuffer()}else X.__webglFramebuffer[V]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer=[];for(let V=0;V<C.mipmaps.length;V++)X.__webglFramebuffer[V]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(j)for(let V=0,me=S.length;V<me;V++){let ie=n.get(S[V]);ie.__webglTexture===void 0&&(ie.__webglTexture=r.createTexture(),a.memory.textures++)}if(P.samples>0&&$(P)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let V=0;V<S.length;V++){let me=S[V];X.__webglColorRenderbuffer[V]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[V]);let ie=s.convert(me.format,me.colorSpace),Q=s.convert(me.type),Ne=_(me.internalFormat,ie,Q,me.colorSpace,P.isXRRenderTarget===!0),qe=_e(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,qe,Ne,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.RENDERBUFFER,X.__webglColorRenderbuffer[V])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(X.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(D){t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture),W(r.TEXTURE_CUBE_MAP,C);for(let V=0;V<6;V++)if(C.mipmaps&&C.mipmaps.length>0)for(let me=0;me<C.mipmaps.length;me++)he(X.__webglFramebuffer[V][me],P,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+V,me);else he(X.__webglFramebuffer[V],P,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);f(C)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(j){for(let V=0,me=S.length;V<me;V++){let ie=S[V],Q=n.get(ie),Ne=r.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ne=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ne,Q.__webglTexture),W(Ne,ie),he(X.__webglFramebuffer,P,ie,r.COLOR_ATTACHMENT0+V,Ne,0),f(ie)&&v(Ne)}t.unbindTexture()}else{let V=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(V=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(V,k.__webglTexture),W(V,C),C.mipmaps&&C.mipmaps.length>0)for(let me=0;me<C.mipmaps.length;me++)he(X.__webglFramebuffer[me],P,C,r.COLOR_ATTACHMENT0,V,me);else he(X.__webglFramebuffer,P,C,r.COLOR_ATTACHMENT0,V,0);f(C)&&v(V),t.unbindTexture()}P.depthBuffer&&Pe(P)},this.updateRenderTargetMipmap=function(P){let C=P.textures;for(let X=0,k=C.length;X<k;X++){let S=C[X];if(f(S)){let D=y(P),j=n.get(S).__webglTexture;t.bindTexture(D,j),v(D),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(P){if(P.samples>0){if($(P)===!1){let C=P.textures,X=P.width,k=P.height,S=r.COLOR_BUFFER_BIT,D=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=n.get(P),V=C.length>1;if(V)for(let ie=0;ie<C.length;ie++)t.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,j.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,j.__webglMultisampledFramebuffer);let me=P.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,j.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,j.__webglFramebuffer);for(let ie=0;ie<C.length;ie++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),V){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,j.__webglColorRenderbuffer[ie]);let Q=n.get(C[ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,X,k,0,0,X,k,S,r.NEAREST),c===!0&&(We.length=0,Le.length=0,We.push(r.COLOR_ATTACHMENT0+ie),P.depthBuffer&&P.resolveDepthBuffer===!1&&(We.push(D),Le.push(D),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Le)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,We))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),V)for(let ie=0;ie<C.length;ie++){t.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,j.__webglColorRenderbuffer[ie]);let Q=n.get(C[ie]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,j.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,Q,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,j.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let C=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}},this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=he,this.useMultisampledRTT=$}function C0(r,e){return{convert:function(t,n=rs){let i,s=kt.getTransfer(n);if(t===Gi)return r.UNSIGNED_BYTE;if(t===ml)return r.UNSIGNED_SHORT_4_4_4_4;if(t===gl)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Nc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Uc)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Lc)return r.BYTE;if(t===Dc)return r.SHORT;if(t===Zs)return r.UNSIGNED_SHORT;if(t===fl)return r.INT;if(t===is)return r.UNSIGNED_INT;if(t===fi)return r.FLOAT;if(t===Rr)return r.HALF_FLOAT;if(t===zd)return r.ALPHA;if(t===Gd)return r.RGB;if(t===mi)return r.RGBA;if(t===Ha)return r.DEPTH_COMPONENT;if(t===Wa)return r.DEPTH_STENCIL;if(t===vl)return r.RED;if(t===yl)return r.RED_INTEGER;if(t===kd)return r.RG;if(t===Bc)return r.RG_INTEGER;if(t===Oc)return r.RGBA_INTEGER;if(t===_l||t===xl||t===Ml||t===Tl)if(s===tn){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===_l)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===xl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Ml)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Tl)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===_l)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===xl)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Ml)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Tl)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Fc||t===zc||t===Gc||t===kc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Fc)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===zc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Gc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===kc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Vc||t===Hc||t===Wc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Vc||t===Hc)return s===tn?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Wc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Xc||t===jc||t===qc||t===Yc||t===Zc||t===Kc||t===Jc||t===$c||t===Qc||t===eh||t===th||t===nh||t===ih||t===rh){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Xc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===jc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===qc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Yc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Zc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Kc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Jc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===$c)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Qc)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===eh)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===th)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===nh)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===ih)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===rh)return s===tn?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===sh||t===ah||t===oh){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===sh)return s===tn?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ah)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===oh)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===lh||t===ch||t===hh||t===uh){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===lh)return i.COMPRESSED_RED_RGTC1_EXT;if(t===ch)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===hh)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===uh)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ks?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ea(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nh=class extends nr{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,m=typeof XRWebGLBinding<"u",f=new Dh,v={},y=t.getContextAttributes(),_=null,x=null,T=[],b=[],R=new be,B=null,U=new rn;U.viewport=new qt;let F=new rn;F.viewport=new qt;let I=[U,F],L=new il,q=null,W=null;function re(Le){let _e=b.indexOf(Le.inputSource);if(_e===-1)return;let $=T[_e];$!==void 0&&($.update(Le.inputSource,Le.frame,l||a),$.dispatchEvent({type:Le.type,data:Le.inputSource}))}function ce(){i.removeEventListener("select",re),i.removeEventListener("selectstart",re),i.removeEventListener("selectend",re),i.removeEventListener("squeeze",re),i.removeEventListener("squeezestart",re),i.removeEventListener("squeezeend",re),i.removeEventListener("end",ce),i.removeEventListener("inputsourceschange",Y);for(let Le=0;Le<T.length;Le++){let _e=b[Le];_e!==null&&(b[Le]=null,T[Le].disconnect(_e))}q=null,W=null,f.reset();for(let Le in v)delete v[Le];e.setRenderTarget(_),p=null,d=null,u=null,i=null,x=null,We.stop(),n.isPresenting=!1,e.setPixelRatio(B),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}function Y(Le){for(let _e=0;_e<Le.removed.length;_e++){let $=Le.removed[_e],H=b.indexOf($);H>=0&&(b[H]=null,T[H].disconnect($))}for(let _e=0;_e<Le.added.length;_e++){let $=Le.added[_e],H=b.indexOf($);if(H===-1){for(let P=0;P<T.length;P++){if(P>=b.length){b.push($),H=P;break}if(b[P]===null){b[P]=$,H=P;break}}if(H===-1)break}let Ie=T[H];Ie&&Ie.connect($)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Le){let _e=T[Le];return _e===void 0&&(_e=new Us,T[Le]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(Le){let _e=T[Le];return _e===void 0&&(_e=new Us,T[Le]=_e),_e.getGripSpace()},this.getHand=function(Le){let _e=T[Le];return _e===void 0&&(_e=new Us,T[Le]=_e),_e.getHandSpace()},this.setFramebufferScaleFactor=function(Le){s=Le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Le){o=Le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Le){l=Le},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Le){if(i=Le,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",re),i.addEventListener("selectstart",re),i.addEventListener("selectend",re),i.addEventListener("squeeze",re),i.addEventListener("squeezestart",re),i.addEventListener("squeezeend",re),i.addEventListener("end",ce),i.addEventListener("inputsourceschange",Y),y.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(R),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,$=null,H=null;y.depth&&(H=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=y.stencil?Wa:Ha,$=y.stencil?Ks:is);let Ie={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ie),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new di(d.textureWidth,d.textureHeight,{format:mi,type:Gi,depthTexture:new wa(d.textureWidth,d.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let _e={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,_e),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new di(p.framebufferWidth,p.framebufferHeight,{format:mi,type:Gi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),We.setContext(i),We.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let he=new w,Ae=new w;function ze(Le,_e){_e===null?Le.matrixWorld.copy(Le.matrix):Le.matrixWorld.multiplyMatrices(_e.matrixWorld,Le.matrix),Le.matrixWorldInverse.copy(Le.matrixWorld).invert()}this.updateCamera=function(Le){if(i===null)return;let _e=Le.near,$=Le.far;f.texture!==null&&(f.depthNear>0&&(_e=f.depthNear),f.depthFar>0&&($=f.depthFar)),L.near=F.near=U.near=_e,L.far=F.far=U.far=$,q===L.near&&W===L.far||(i.updateRenderState({depthNear:L.near,depthFar:L.far}),q=L.near,W=L.far),L.layers.mask=6|Le.layers.mask,U.layers.mask=3&L.layers.mask,F.layers.mask=5&L.layers.mask;let H=Le.parent,Ie=L.cameras;ze(L,H);for(let P=0;P<Ie.length;P++)ze(Ie[P],H);Ie.length===2?(function(P,C,X){he.setFromMatrixPosition(C.matrixWorld),Ae.setFromMatrixPosition(X.matrixWorld);let k=he.distanceTo(Ae),S=C.projectionMatrix.elements,D=X.projectionMatrix.elements,j=S[14]/(S[10]-1),V=S[14]/(S[10]+1),me=(S[9]+1)/S[5],ie=(S[9]-1)/S[5],Q=(S[8]-1)/S[0],Ne=(D[8]+1)/D[0],qe=j*Q,Be=j*Ne,tt=k/(-Q+Ne),ft=tt*-Q;if(C.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(ft),P.translateZ(tt),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert(),S[10]===-1)P.projectionMatrix.copy(C.projectionMatrix),P.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{let gt=j+tt,Et=V+tt,bt=qe-ft,z=Be+(k-ft),ne=me*V/Et*gt,le=ie*V/Et*gt;P.projectionMatrix.makePerspective(bt,z,ne,le,gt,Et),P.projectionMatrixInverse.copy(P.projectionMatrix).invert()}})(L,U,F):L.projectionMatrix.copy(U.projectionMatrix),(function(P,C,X){X===null?P.matrix.copy(C.matrixWorld):(P.matrix.copy(X.matrixWorld),P.matrix.invert(),P.matrix.multiply(C.matrixWorld)),P.matrix.decompose(P.position,P.quaternion,P.scale),P.updateMatrixWorld(!0),P.projectionMatrix.copy(C.projectionMatrix),P.projectionMatrixInverse.copy(C.projectionMatrixInverse),P.isPerspectiveCamera&&(P.fov=2*Vr*Math.atan(1/P.projectionMatrix.elements[5]),P.zoom=1)})(Le,L,H)},this.getCamera=function(){return L},this.getFoveation=function(){if(d!==null||p!==null)return c},this.setFoveation=function(Le){c=Le,d!==null&&(d.fixedFoveation=Le),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Le)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(L)},this.getCameraTexture=function(Le){return v[Le]};let Pe=null,We=new Rp;We.setAnimationLoop(function(Le,_e){if(h=_e.getViewerPose(l||a),g=_e,h!==null){let $=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let H=!1;$.length!==L.cameras.length&&(L.cameras.length=0,H=!0);for(let P=0;P<$.length;P++){let C=$[P],X=null;if(p!==null)X=p.getViewport(C);else{let S=u.getViewSubImage(d,C);X=S.viewport,P===0&&(e.setRenderTargetTextures(x,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(x))}let k=I[P];k===void 0&&(k=new rn,k.layers.enable(P),k.viewport=new qt,I[P]=k),k.matrix.fromArray(C.transform.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale),k.projectionMatrix.fromArray(C.projectionMatrix),k.projectionMatrixInverse.copy(k.projectionMatrix).invert(),k.viewport.set(X.x,X.y,X.width,X.height),P===0&&(L.matrix.copy(k.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),H===!0&&L.cameras.push(k)}let Ie=i.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){u=n.getBinding();let P=u.getDepthInformation($[0]);P&&P.isValid&&P.texture&&f.init(P,i.renderState)}if(Ie&&Ie.includes("camera-access")&&m){e.state.unbindTexture(),u=n.getBinding();for(let P=0;P<$.length;P++){let C=$[P].camera;if(C){let X=v[C];X||(X=new Ea,v[C]=X);let k=u.getCameraImage(C);X.sourceTexture=k}}}}for(let $=0;$<T.length;$++){let H=b[$],Ie=T[$];H!==null&&Ie!==void 0&&Ie.update(H,_e,l||a)}Pe&&Pe(Le,_e),_e.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_e}),g=null}),this.setAnimationLoop=function(Le){Pe=Le},this.dispose=function(){}}},os=new Ai,R0=new ct;function I0(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===si&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===si&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,os.copy(c),os.x*=-1,os.y*=-1,os.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),i.envMapRotation.value.setFromMatrix4(R0.makeRotationFromEuler(os)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,vh(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===si&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function P0(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,p,g){let m=u.value,f=d+"_"+p;if(g[f]===void 0)return g[f]=typeof m=="number"||typeof m=="boolean"?m:m.clone(),!0;{let v=g[f];if(typeof m=="number"||typeof m=="boolean"){if(v!==m)return g[f]=m,!0}else if(v.equals(m)===!1)return v.copy(m),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&((function(f){let v=f.uniforms,y=0,_=16;for(let T=0,b=v.length;T<b;T++){let R=Array.isArray(v[T])?v[T]:[v[T]];for(let B=0,U=R.length;B<U;B++){let F=R[B],I=Array.isArray(F.value)?F.value:[F.value];for(let L=0,q=I.length;L<q;L++){let W=l(I[L]),re=y%_,ce=re%W.boundary,Y=re+ce;y+=ce,Y!==0&&_-Y<W.storage&&(y+=_-Y),F.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=W.storage}}}let x=y%_;x>0&&(y+=_-x),f.__size=y,f.__cache={}})(u),p=(function(f){let v=(function(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=v;let y=r.createBuffer(),_=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,_,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y})(u),i[u.id]=p,u.addEventListener("dispose",h));let g=d.program;n.updateUBOMapping(u,g);let m=e.render.frame;s[u.id]!==m&&((function(f){let v=i[f.id],y=f.uniforms,_=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let x=0,T=y.length;x<T;x++){let b=Array.isArray(y[x])?y[x]:[y[x]];for(let R=0,B=b.length;R<B;R++){let U=b[R];if(c(U,x,R,_)===!0){let F=U.__offset,I=Array.isArray(U.value)?U.value:[U.value],L=0;for(let q=0;q<I.length;q++){let W=I[q],re=l(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,F+L,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,L),L+=re.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=m)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var gi=class{constructor(e={}){let{canvas:t=Jd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),m=new Int32Array(4),f=null,v=null,y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=yt;let b=0,R=0,B=null,U=-1,F=null,I=new qt,L=new qt,q=null,W=new Je(0),re=0,ce=t.width,Y=t.height,he=1,Ae=null,ze=null,Pe=new qt(0,0,ce,Y),We=new qt(0,0,ce,Y),Le=!1,_e=new Tr,$=!1,H=!1,Ie=new ct,P=new w,C=new qt,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},k=!1;function S(){return B===null?he:1}let D,j,V,me,ie,Q,Ne,qe,Be,tt,ft,gt,Et,bt,z,ne,le,ge,de,ee,fe,se,De,Z,A=n;function Se(N,oe){return t.getContext(N,oe)}try{let N={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",ke,!1),A===null){let oe="webgl2";if(A=Se(oe,N),A===null)throw Se(oe)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}function Te(){D=new pm(A),D.init(),se=new C0(A,D),j=new lm(A,D,e,se),V=new E0(A,D),j.reversedDepthBuffer&&d&&V.buffers.depth.setReversed(!0),me=new gm(A),ie=new g0,Q=new A0(A,D,V,ie,j,se,me),Ne=new hm(x),qe=new dm(x),Be=new im(A),De=new am(A,Be),tt=new fm(A,Be,me,De),ft=new ym(A,tt,Be,me),de=new vm(A,j,Q),ne=new cm(ie),gt=new m0(x,Ne,qe,D,j,De,ne),Et=new I0(x,ie),bt=new y0,z=new b0(D),ge=new sm(x,Ne,qe,V,ft,p,c),le=new S0(x,ft,j),Z=new P0(A,me,j,V),ee=new om(A,D,me),fe=new mm(A,D,me),me.programs=gt.programs,x.capabilities=j,x.extensions=D,x.properties=ie,x.renderLists=bt,x.shadowMap=le,x.state=V,x.info=me}Te();let xe=new Nh(x,A);function Ce(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let N=me.autoReset,oe=le.enabled,ye=le.autoUpdate,Re=le.needsUpdate,pe=le.type;Te(),me.autoReset=N,le.enabled=oe,le.autoUpdate=ye,le.needsUpdate=Re,le.type=pe}function ke(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function ot(N){let oe=N.target;oe.removeEventListener("dispose",ot),(function(ye){(function(Re){let pe=ie.get(Re).programs;pe!==void 0&&(pe.forEach(function(Oe){gt.releaseProgram(Oe)}),Re.isShaderMaterial&&gt.releaseShaderCache(Re))})(ye),ie.remove(ye)})(oe)}function Ze(N,oe,ye){N.transparent===!0&&N.side===Ot&&N.forceSinglePass===!1?(N.side=si,N.needsUpdate=!0,ai(N,oe,ye),N.side=Ar,N.needsUpdate=!0,ai(N,oe,ye),N.side=Ot):ai(N,oe,ye)}this.xr=xe,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let N=D.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){let N=D.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(N){N!==void 0&&(he=N,this.setSize(ce,Y,!1))},this.getSize=function(N){return N.set(ce,Y)},this.setSize=function(N,oe,ye=!0){xe.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ce=N,Y=oe,t.width=Math.floor(N*he),t.height=Math.floor(oe*he),ye===!0&&(t.style.width=N+"px",t.style.height=oe+"px"),this.setViewport(0,0,N,oe))},this.getDrawingBufferSize=function(N){return N.set(ce*he,Y*he).floor()},this.setDrawingBufferSize=function(N,oe,ye){ce=N,Y=oe,he=ye,t.width=Math.floor(N*ye),t.height=Math.floor(oe*ye),this.setViewport(0,0,N,oe)},this.getCurrentViewport=function(N){return N.copy(I)},this.getViewport=function(N){return N.copy(Pe)},this.setViewport=function(N,oe,ye,Re){N.isVector4?Pe.set(N.x,N.y,N.z,N.w):Pe.set(N,oe,ye,Re),V.viewport(I.copy(Pe).multiplyScalar(he).round())},this.getScissor=function(N){return N.copy(We)},this.setScissor=function(N,oe,ye,Re){N.isVector4?We.set(N.x,N.y,N.z,N.w):We.set(N,oe,ye,Re),V.scissor(L.copy(We).multiplyScalar(he).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(N){V.setScissorTest(Le=N)},this.setOpaqueSort=function(N){Ae=N},this.setTransparentSort=function(N){ze=N},this.getClearColor=function(N){return N.copy(ge.getClearColor())},this.setClearColor=function(){ge.setClearColor(...arguments)},this.getClearAlpha=function(){return ge.getClearAlpha()},this.setClearAlpha=function(){ge.setClearAlpha(...arguments)},this.clear=function(N=!0,oe=!0,ye=!0){let Re=0;if(N){let pe=!1;if(B!==null){let Oe=B.texture.format;pe=Oe===Oc||Oe===Bc||Oe===yl}if(pe){let Oe=B.texture.type,Qe=Oe===Gi||Oe===is||Oe===Zs||Oe===Ks||Oe===ml||Oe===gl,Ue=ge.getClearColor(),He=ge.getClearAlpha(),Ke=Ue.r,xt=Ue.g,Xe=Ue.b;Qe?(g[0]=Ke,g[1]=xt,g[2]=Xe,g[3]=He,A.clearBufferuiv(A.COLOR,0,g)):(m[0]=Ke,m[1]=xt,m[2]=Xe,m[3]=He,A.clearBufferiv(A.COLOR,0,m))}else Re|=A.COLOR_BUFFER_BIT}oe&&(Re|=A.DEPTH_BUFFER_BIT),ye&&(Re|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(Re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),ge.dispose(),bt.dispose(),z.dispose(),ie.dispose(),Ne.dispose(),qe.dispose(),ft.dispose(),De.dispose(),Z.dispose(),gt.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Mt),xe.removeEventListener("sessionend",$e),mt.stop()},this.renderBufferDirect=function(N,oe,ye,Re,pe,Oe){oe===null&&(oe=X);let Qe=pe.isMesh&&pe.matrixWorld.determinant()<0,Ue=(function(Lt,cn,nn,Ct,_t){cn.isScene!==!0&&(cn=X),Q.resetTextureUnits();let qn=cn.fog,ur=Ct.isMeshStandardMaterial?cn.environment:null,bn=B===null?x.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Un,oi=(Ct.isMeshStandardMaterial?qe:Ne).get(Ct.envMap||ur),Hn=Ct.vertexColors===!0&&!!nn.attributes.color&&nn.attributes.color.itemSize===4,$t=!!nn.attributes.tangent&&(!!Ct.normalMap||Ct.anisotropy>0),li=!!nn.morphAttributes.position,ia=!!nn.morphAttributes.normal,ci=!!nn.morphAttributes.color,Za=cr;Ct.toneMapped&&(B!==null&&B.isXRRenderTarget!==!0||(Za=x.toneMapping));let ds=nn.morphAttributes.position||nn.morphAttributes.normal||nn.morphAttributes.color,dr=ds!==void 0?ds.length:0,Dt=ie.get(Ct),Yn=v.state.lights;if($===!0&&(H===!0||Lt!==F)){let wn=Lt===F&&Ct.id===U;ne.setState(Ct,Lt,wn)}let Ln=!1;Ct.version===Dt.__version?Dt.needsLights&&Dt.lightsStateVersion!==Yn.state.version||Dt.outputColorSpace!==bn||_t.isBatchedMesh&&Dt.batching===!1?Ln=!0:_t.isBatchedMesh||Dt.batching!==!0?_t.isBatchedMesh&&Dt.batchingColor===!0&&_t.colorTexture===null||_t.isBatchedMesh&&Dt.batchingColor===!1&&_t.colorTexture!==null||_t.isInstancedMesh&&Dt.instancing===!1?Ln=!0:_t.isInstancedMesh||Dt.instancing!==!0?_t.isSkinnedMesh&&Dt.skinning===!1?Ln=!0:_t.isSkinnedMesh||Dt.skinning!==!0?_t.isInstancedMesh&&Dt.instancingColor===!0&&_t.instanceColor===null||_t.isInstancedMesh&&Dt.instancingColor===!1&&_t.instanceColor!==null||_t.isInstancedMesh&&Dt.instancingMorph===!0&&_t.morphTexture===null||_t.isInstancedMesh&&Dt.instancingMorph===!1&&_t.morphTexture!==null||Dt.envMap!==oi||Ct.fog===!0&&Dt.fog!==qn?Ln=!0:Dt.numClippingPlanes===void 0||Dt.numClippingPlanes===ne.numPlanes&&Dt.numIntersection===ne.numIntersection?(Dt.vertexAlphas!==Hn||Dt.vertexTangents!==$t||Dt.morphTargets!==li||Dt.morphNormals!==ia||Dt.morphColors!==ci||Dt.toneMapping!==Za||Dt.morphTargetsCount!==dr)&&(Ln=!0):Ln=!0:Ln=!0:Ln=!0:Ln=!0:(Ln=!0,Dt.__version=Ct.version);let Wi=Dt.currentProgram;Ln===!0&&(Wi=ai(Ct,cn,_t));let Nr=!1,ps=!1,ra=!1,sn=Wi.getUniforms(),Ri=Dt.uniforms;if(V.useProgram(Wi.program)&&(Nr=!0,ps=!0,ra=!0),Ct.id!==U&&(U=Ct.id,ps=!0),Nr||F!==Lt){V.buffers.depth.getReversed()&&Lt.reversedDepth!==!0&&(Lt._reversedDepth=!0,Lt.updateProjectionMatrix()),sn.setValue(A,"projectionMatrix",Lt.projectionMatrix),sn.setValue(A,"viewMatrix",Lt.matrixWorldInverse);let wn=sn.map.cameraPosition;wn!==void 0&&wn.setValue(A,P.setFromMatrixPosition(Lt.matrixWorld)),j.logarithmicDepthBuffer&&sn.setValue(A,"logDepthBufFC",2/(Math.log(Lt.far+1)/Math.LN2)),(Ct.isMeshPhongMaterial||Ct.isMeshToonMaterial||Ct.isMeshLambertMaterial||Ct.isMeshBasicMaterial||Ct.isMeshStandardMaterial||Ct.isShaderMaterial)&&sn.setValue(A,"isOrthographic",Lt.isOrthographicCamera===!0),F!==Lt&&(F=Lt,ps=!0,ra=!0)}if(_t.isSkinnedMesh){sn.setOptional(A,_t,"bindMatrix"),sn.setOptional(A,_t,"bindMatrixInverse");let wn=_t.skeleton;wn&&(wn.boneTexture===null&&wn.computeBoneTexture(),sn.setValue(A,"boneTexture",wn.boneTexture,Q))}_t.isBatchedMesh&&(sn.setOptional(A,_t,"batchingTexture"),sn.setValue(A,"batchingTexture",_t._matricesTexture,Q),sn.setOptional(A,_t,"batchingIdTexture"),sn.setValue(A,"batchingIdTexture",_t._indirectTexture,Q),sn.setOptional(A,_t,"batchingColorTexture"),_t._colorsTexture!==null&&sn.setValue(A,"batchingColorTexture",_t._colorsTexture,Q));let Bn=nn.morphAttributes;Bn.position===void 0&&Bn.normal===void 0&&Bn.color===void 0||de.update(_t,nn,Wi),(ps||Dt.receiveShadow!==_t.receiveShadow)&&(Dt.receiveShadow=_t.receiveShadow,sn.setValue(A,"receiveShadow",_t.receiveShadow)),Ct.isMeshGouraudMaterial&&Ct.envMap!==null&&(Ri.envMap.value=oi,Ri.flipEnvMap.value=oi.isCubeTexture&&oi.isRenderTargetTexture===!1?-1:1),Ct.isMeshStandardMaterial&&Ct.envMap===null&&cn.environment!==null&&(Ri.envMapIntensity.value=cn.environmentIntensity),ps&&(sn.setValue(A,"toneMappingExposure",x.toneMappingExposure),Dt.needsLights&&(Zn=ra,(un=Ri).ambientLightColor.needsUpdate=Zn,un.lightProbe.needsUpdate=Zn,un.directionalLights.needsUpdate=Zn,un.directionalLightShadows.needsUpdate=Zn,un.pointLights.needsUpdate=Zn,un.pointLightShadows.needsUpdate=Zn,un.spotLights.needsUpdate=Zn,un.spotLightShadows.needsUpdate=Zn,un.rectAreaLights.needsUpdate=Zn,un.hemisphereLights.needsUpdate=Zn),qn&&Ct.fog===!0&&Et.refreshFogUniforms(Ri,qn),Et.refreshMaterialUniforms(Ri,Ct,he,Y,v.state.transmissionRenderTarget[Lt.id]),ea.upload(A,mn(Dt),Ri,Q));var un,Zn;if(Ct.isShaderMaterial&&Ct.uniformsNeedUpdate===!0&&(ea.upload(A,mn(Dt),Ri,Q),Ct.uniformsNeedUpdate=!1),Ct.isSpriteMaterial&&sn.setValue(A,"center",_t.center),sn.setValue(A,"modelViewMatrix",_t.modelViewMatrix),sn.setValue(A,"normalMatrix",_t.normalMatrix),sn.setValue(A,"modelMatrix",_t.matrixWorld),Ct.isShaderMaterial||Ct.isRawShaderMaterial){let wn=Ct.uniformsGroups;for(let Ka=0,fs=wn.length;Ka<fs;Ka++){let Nl=wn[Ka];Z.update(Nl,Wi),Z.bind(Nl,Wi)}}return Wi})(N,oe,ye,Re,pe);V.setMaterial(Re,Qe);let He=ye.index,Ke=1;if(Re.wireframe===!0){if(He=tt.getWireframeAttribute(ye),He===void 0)return;Ke=2}let xt=ye.drawRange,Xe=ye.attributes.position,Fe=xt.start*Ke,rt=(xt.start+xt.count)*Ke;Oe!==null&&(Fe=Math.max(Fe,Oe.start*Ke),rt=Math.min(rt,(Oe.start+Oe.count)*Ke)),He!==null?(Fe=Math.max(Fe,0),rt=Math.min(rt,He.count)):Xe!=null&&(Fe=Math.max(Fe,0),rt=Math.min(rt,Xe.count));let ln=rt-Fe;if(ln<0||ln===1/0)return;let _n;De.setup(pe,Re,Ue,ye,He);let Jt=ee;if(He!==null&&(_n=Be.get(He),Jt=fe,Jt.setIndex(_n)),pe.isMesh)Re.wireframe===!0?(V.setLineWidth(Re.wireframeLinewidth*S()),Jt.setMode(A.LINES)):Jt.setMode(A.TRIANGLES);else if(pe.isLine){let Lt=Re.linewidth;Lt===void 0&&(Lt=1),V.setLineWidth(Lt*S()),pe.isLineSegments?Jt.setMode(A.LINES):pe.isLineLoop?Jt.setMode(A.LINE_LOOP):Jt.setMode(A.LINE_STRIP)}else pe.isPoints?Jt.setMode(A.POINTS):pe.isSprite&&Jt.setMode(A.TRIANGLES);if(pe.isBatchedMesh)if(pe._multiDrawInstances!==null)Ls("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(pe._multiDrawStarts,pe._multiDrawCounts,pe._multiDrawCount,pe._multiDrawInstances);else if(D.get("WEBGL_multi_draw"))Jt.renderMultiDraw(pe._multiDrawStarts,pe._multiDrawCounts,pe._multiDrawCount);else{let Lt=pe._multiDrawStarts,cn=pe._multiDrawCounts,nn=pe._multiDrawCount,Ct=He?Be.get(He).bytesPerElement:1,_t=ie.get(Re).currentProgram.getUniforms();for(let qn=0;qn<nn;qn++)_t.setValue(A,"_gl_DrawID",qn),Jt.render(Lt[qn]/Ct,cn[qn])}else if(pe.isInstancedMesh)Jt.renderInstances(Fe,ln,pe.count);else if(ye.isInstancedBufferGeometry){let Lt=ye._maxInstanceCount!==void 0?ye._maxInstanceCount:1/0,cn=Math.min(ye.instanceCount,Lt);Jt.renderInstances(Fe,ln,cn)}else Jt.render(Fe,ln)},this.compile=function(N,oe,ye=null){ye===null&&(ye=N),v=z.get(ye),v.init(oe),_.push(v),ye.traverseVisible(function(pe){pe.isLight&&pe.layers.test(oe.layers)&&(v.pushLight(pe),pe.castShadow&&v.pushShadow(pe))}),N!==ye&&N.traverseVisible(function(pe){pe.isLight&&pe.layers.test(oe.layers)&&(v.pushLight(pe),pe.castShadow&&v.pushShadow(pe))}),v.setupLights();let Re=new Set;return N.traverse(function(pe){if(!(pe.isMesh||pe.isPoints||pe.isLine||pe.isSprite))return;let Oe=pe.material;if(Oe)if(Array.isArray(Oe))for(let Qe=0;Qe<Oe.length;Qe++){let Ue=Oe[Qe];Ze(Ue,ye,pe),Re.add(Ue)}else Ze(Oe,ye,pe),Re.add(Oe)}),v=_.pop(),Re},this.compileAsync=function(N,oe,ye=null){let Re=this.compile(N,oe,ye);return new Promise(pe=>{function Oe(){Re.forEach(function(Qe){ie.get(Qe).currentProgram.isReady()&&Re.delete(Qe)}),Re.size!==0?setTimeout(Oe,10):pe(N)}D.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let je=null;function Mt(){mt.stop()}function $e(){mt.start()}let mt=new Rp;function St(N,oe,ye,Re){if(N.visible===!1)return;if(N.layers.test(oe.layers)){if(N.isGroup)ye=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(oe);else if(N.isLight)v.pushLight(N),N.castShadow&&v.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||_e.intersectsSprite(N)){Re&&C.setFromMatrixPosition(N.matrixWorld).applyMatrix4(Ie);let Oe=ft.update(N),Qe=N.material;Qe.visible&&f.push(N,Oe,Qe,ye,C.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||_e.intersectsObject(N))){let Oe=ft.update(N),Qe=N.material;if(Re&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),C.copy(N.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),C.copy(Oe.boundingSphere.center)),C.applyMatrix4(N.matrixWorld).applyMatrix4(Ie)),Array.isArray(Qe)){let Ue=Oe.groups;for(let He=0,Ke=Ue.length;He<Ke;He++){let xt=Ue[He],Xe=Qe[xt.materialIndex];Xe&&Xe.visible&&f.push(N,Oe,Xe,ye,C.z,xt)}}else Qe.visible&&f.push(N,Oe,Qe,ye,C.z,null)}}let pe=N.children;for(let Oe=0,Qe=pe.length;Oe<Qe;Oe++)St(pe[Oe],oe,ye,Re)}function wt(N,oe,ye,Re){let pe=N.opaque,Oe=N.transmissive,Qe=N.transparent;v.setupLightsView(ye),$===!0&&ne.setGlobalState(x.clippingPlanes,ye),Re&&V.viewport(I.copy(Re)),pe.length>0&&Kt(pe,oe,ye),Oe.length>0&&Kt(Oe,oe,ye),Qe.length>0&&Kt(Qe,oe,ye),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function hn(N,oe,ye,Re){if((ye.isScene===!0?ye.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[Re.id]===void 0&&(v.state.transmissionRenderTarget[Re.id]=new di(1,1,{generateMipmaps:!0,type:D.has("EXT_color_buffer_half_float")||D.has("EXT_color_buffer_float")?Rr:Gi,minFilter:Qn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:kt.workingColorSpace}));let pe=v.state.transmissionRenderTarget[Re.id],Oe=Re.viewport||I;pe.setSize(Oe.z*x.transmissionResolutionScale,Oe.w*x.transmissionResolutionScale);let Qe=x.getRenderTarget(),Ue=x.getActiveCubeFace(),He=x.getActiveMipmapLevel();x.setRenderTarget(pe),x.getClearColor(W),re=x.getClearAlpha(),re<1&&x.setClearColor(16777215,.5),x.clear(),k&&ge.render(ye);let Ke=x.toneMapping;x.toneMapping=cr;let xt=Re.viewport;if(Re.viewport!==void 0&&(Re.viewport=void 0),v.setupLightsView(Re),$===!0&&ne.setGlobalState(x.clippingPlanes,Re),Kt(N,ye,Re),Q.updateMultisampleRenderTarget(pe),Q.updateRenderTargetMipmap(pe),D.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Fe=0,rt=oe.length;Fe<rt;Fe++){let ln=oe[Fe],_n=ln.object,Jt=ln.geometry,Lt=ln.material,cn=ln.group;if(Lt.side===Ot&&_n.layers.test(Re.layers)){let nn=Lt.side;Lt.side=si,Lt.needsUpdate=!0,Pn(_n,ye,Re,Jt,Lt,cn),Lt.side=nn,Lt.needsUpdate=!0,Xe=!0}}Xe===!0&&(Q.updateMultisampleRenderTarget(pe),Q.updateRenderTargetMipmap(pe))}x.setRenderTarget(Qe,Ue,He),x.setClearColor(W,re),xt!==void 0&&(Re.viewport=xt),x.toneMapping=Ke}function Kt(N,oe,ye){let Re=oe.isScene===!0?oe.overrideMaterial:null;for(let pe=0,Oe=N.length;pe<Oe;pe++){let Qe=N[pe],Ue=Qe.object,He=Qe.geometry,Ke=Qe.group,xt=Qe.material;xt.allowOverride===!0&&Re!==null&&(xt=Re),Ue.layers.test(ye.layers)&&Pn(Ue,oe,ye,He,xt,Ke)}}function Pn(N,oe,ye,Re,pe,Oe){N.onBeforeRender(x,oe,ye,Re,pe,Oe),N.modelViewMatrix.multiplyMatrices(ye.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),pe.onBeforeRender(x,oe,ye,Re,N,Oe),pe.transparent===!0&&pe.side===Ot&&pe.forceSinglePass===!1?(pe.side=si,pe.needsUpdate=!0,x.renderBufferDirect(ye,oe,Re,pe,N,Oe),pe.side=Ar,pe.needsUpdate=!0,x.renderBufferDirect(ye,oe,Re,pe,N,Oe),pe.side=Ot):x.renderBufferDirect(ye,oe,Re,pe,N,Oe),N.onAfterRender(x,oe,ye,Re,pe,Oe)}function ai(N,oe,ye){oe.isScene!==!0&&(oe=X);let Re=ie.get(N),pe=v.state.lights,Oe=v.state.shadowsArray,Qe=pe.state.version,Ue=gt.getParameters(N,pe.state,Oe,oe,ye),He=gt.getProgramCacheKey(Ue),Ke=Re.programs;Re.environment=N.isMeshStandardMaterial?oe.environment:null,Re.fog=oe.fog,Re.envMap=(N.isMeshStandardMaterial?qe:Ne).get(N.envMap||Re.environment),Re.envMapRotation=Re.environment!==null&&N.envMap===null?oe.environmentRotation:N.envMapRotation,Ke===void 0&&(N.addEventListener("dispose",ot),Ke=new Map,Re.programs=Ke);let xt=Ke.get(He);if(xt!==void 0){if(Re.currentProgram===xt&&Re.lightsStateVersion===Qe)return _i(N,Ue),xt}else Ue.uniforms=gt.getUniforms(N),N.onBeforeCompile(Ue,x),xt=gt.acquireProgram(Ue,He),Ke.set(He,xt),Re.uniforms=Ue.uniforms;let Xe=Re.uniforms;return(N.isShaderMaterial||N.isRawShaderMaterial)&&N.clipping!==!0||(Xe.clippingPlanes=ne.uniform),_i(N,Ue),Re.needsLights=(function(Fe){return Fe.isMeshLambertMaterial||Fe.isMeshToonMaterial||Fe.isMeshPhongMaterial||Fe.isMeshStandardMaterial||Fe.isShadowMaterial||Fe.isShaderMaterial&&Fe.lights===!0})(N),Re.lightsStateVersion=Qe,Re.needsLights&&(Xe.ambientLightColor.value=pe.state.ambient,Xe.lightProbe.value=pe.state.probe,Xe.directionalLights.value=pe.state.directional,Xe.directionalLightShadows.value=pe.state.directionalShadow,Xe.spotLights.value=pe.state.spot,Xe.spotLightShadows.value=pe.state.spotShadow,Xe.rectAreaLights.value=pe.state.rectArea,Xe.ltc_1.value=pe.state.rectAreaLTC1,Xe.ltc_2.value=pe.state.rectAreaLTC2,Xe.pointLights.value=pe.state.point,Xe.pointLightShadows.value=pe.state.pointShadow,Xe.hemisphereLights.value=pe.state.hemi,Xe.directionalShadowMap.value=pe.state.directionalShadowMap,Xe.directionalShadowMatrix.value=pe.state.directionalShadowMatrix,Xe.spotShadowMap.value=pe.state.spotShadowMap,Xe.spotLightMatrix.value=pe.state.spotLightMatrix,Xe.spotLightMap.value=pe.state.spotLightMap,Xe.pointShadowMap.value=pe.state.pointShadowMap,Xe.pointShadowMatrix.value=pe.state.pointShadowMatrix),Re.currentProgram=xt,Re.uniformsList=null,xt}function mn(N){if(N.uniformsList===null){let oe=N.currentProgram.getUniforms();N.uniformsList=ea.seqWithValue(oe.seq,N.uniforms)}return N.uniformsList}function _i(N,oe){let ye=ie.get(N);ye.outputColorSpace=oe.outputColorSpace,ye.batching=oe.batching,ye.batchingColor=oe.batchingColor,ye.instancing=oe.instancing,ye.instancingColor=oe.instancingColor,ye.instancingMorph=oe.instancingMorph,ye.skinning=oe.skinning,ye.morphTargets=oe.morphTargets,ye.morphNormals=oe.morphNormals,ye.morphColors=oe.morphColors,ye.morphTargetsCount=oe.morphTargetsCount,ye.numClippingPlanes=oe.numClippingPlanes,ye.numIntersection=oe.numClipIntersection,ye.vertexAlphas=oe.vertexAlphas,ye.vertexTangents=oe.vertexTangents,ye.toneMapping=oe.toneMapping}mt.setAnimationLoop(function(N){je&&je(N)}),typeof self<"u"&&mt.setContext(self),this.setAnimationLoop=function(N){je=N,xe.setAnimationLoop(N),N===null?mt.stop():mt.start()},xe.addEventListener("sessionstart",Mt),xe.addEventListener("sessionend",$e),this.render=function(N,oe){if(oe!==void 0&&oe.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(T===!0)return;if(N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),oe.parent===null&&oe.matrixWorldAutoUpdate===!0&&oe.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(oe),oe=xe.getCamera()),N.isScene===!0&&N.onBeforeRender(x,N,oe,B),v=z.get(N,_.length),v.init(oe),_.push(v),Ie.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),_e.setFromProjectionMatrix(Ie,tr,oe.reversedDepth),H=this.localClippingEnabled,$=ne.init(this.clippingPlanes,H),f=bt.get(N,y.length),f.init(),y.push(f),xe.enabled===!0&&xe.isPresenting===!0){let Oe=x.xr.getDepthSensingMesh();Oe!==null&&St(Oe,oe,-1/0,x.sortObjects)}St(N,oe,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(Ae,ze),k=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,k&&ge.addToRenderList(f,N),this.info.render.frame++,$===!0&&ne.beginShadows();let ye=v.state.shadowsArray;le.render(ye,N,oe),$===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();let Re=f.opaque,pe=f.transmissive;if(v.setupLights(),oe.isArrayCamera){let Oe=oe.cameras;if(pe.length>0)for(let Qe=0,Ue=Oe.length;Qe<Ue;Qe++)hn(Re,pe,N,Oe[Qe]);k&&ge.render(N);for(let Qe=0,Ue=Oe.length;Qe<Ue;Qe++){let He=Oe[Qe];wt(f,N,He,He.viewport)}}else pe.length>0&&hn(Re,pe,N,oe),k&&ge.render(N),wt(f,N,oe);B!==null&&R===0&&(Q.updateMultisampleRenderTarget(B),Q.updateRenderTargetMipmap(B)),N.isScene===!0&&N.onAfterRender(x,N,oe),De.resetDefaultState(),U=-1,F=null,_.pop(),_.length>0?(v=_[_.length-1],$===!0&&ne.setGlobalState(x.clippingPlanes,v.state.camera)):v=null,y.pop(),f=y.length>0?y[y.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(N,oe,ye){let Re=ie.get(N);Re.__autoAllocateDepthBuffer=N.resolveDepthBuffer===!1,Re.__autoAllocateDepthBuffer===!1&&(Re.__useRenderToTexture=!1),ie.get(N.texture).__webglTexture=oe,ie.get(N.depthTexture).__webglTexture=Re.__autoAllocateDepthBuffer?void 0:ye,Re.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(N,oe){let ye=ie.get(N);ye.__webglFramebuffer=oe,ye.__useDefaultFramebuffer=oe===void 0};let Dr=A.createFramebuffer();this.setRenderTarget=function(N,oe=0,ye=0){B=N,b=oe,R=ye;let Re=!0,pe=null,Oe=!1,Qe=!1;if(N){let Ue=ie.get(N);if(Ue.__useDefaultFramebuffer!==void 0)V.bindFramebuffer(A.FRAMEBUFFER,null),Re=!1;else if(Ue.__webglFramebuffer===void 0)Q.setupRenderTarget(N);else if(Ue.__hasExternalTextures)Q.rebindTextures(N,ie.get(N.texture).__webglTexture,ie.get(N.depthTexture).__webglTexture);else if(N.depthBuffer){let xt=N.depthTexture;if(Ue.__boundDepthTexture!==xt){if(xt!==null&&ie.has(xt)&&(N.width!==xt.image.width||N.height!==xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(N)}}let He=N.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Qe=!0);let Ke=ie.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(pe=Array.isArray(Ke[oe])?Ke[oe][ye]:Ke[oe],Oe=!0):pe=N.samples>0&&Q.useMultisampledRTT(N)===!1?ie.get(N).__webglMultisampledFramebuffer:Array.isArray(Ke)?Ke[ye]:Ke,I.copy(N.viewport),L.copy(N.scissor),q=N.scissorTest}else I.copy(Pe).multiplyScalar(he).floor(),L.copy(We).multiplyScalar(he).floor(),q=Le;if(ye!==0&&(pe=Dr),V.bindFramebuffer(A.FRAMEBUFFER,pe)&&Re&&V.drawBuffers(N,pe),V.viewport(I),V.scissor(L),V.setScissorTest(q),Oe){let Ue=ie.get(N.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue.__webglTexture,ye)}else if(Qe){let Ue=oe;for(let He=0;He<N.textures.length;He++){let Ke=ie.get(N.textures[He]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+He,Ke.__webglTexture,ye,Ue)}}else if(N!==null&&ye!==0){let Ue=ie.get(N.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ue.__webglTexture,ye)}U=-1},this.readRenderTargetPixels=function(N,oe,ye,Re,pe,Oe,Qe,Ue=0){if(!N||!N.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=ie.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&Qe!==void 0&&(He=He[Qe]),He){V.bindFramebuffer(A.FRAMEBUFFER,He);try{let Ke=N.textures[Ue],xt=Ke.format,Xe=Ke.type;if(!j.textureFormatReadable(xt))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Xe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");oe>=0&&oe<=N.width-Re&&ye>=0&&ye<=N.height-pe&&(N.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Ue),A.readPixels(oe,ye,Re,pe,se.convert(xt),se.convert(Xe),Oe))}finally{let Ke=B!==null?ie.get(B).__webglFramebuffer:null;V.bindFramebuffer(A.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(N,oe,ye,Re,pe,Oe,Qe,Ue=0){if(!N||!N.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=ie.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&Qe!==void 0&&(He=He[Qe]),He){if(oe>=0&&oe<=N.width-Re&&ye>=0&&ye<=N.height-pe){V.bindFramebuffer(A.FRAMEBUFFER,He);let Ke=N.textures[Ue],xt=Ke.format,Xe=Ke.type;if(!j.textureFormatReadable(xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Fe=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Fe),A.bufferData(A.PIXEL_PACK_BUFFER,Oe.byteLength,A.STREAM_READ),N.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Ue),A.readPixels(oe,ye,Re,pe,se.convert(xt),se.convert(Xe),0);let rt=B!==null?ie.get(B).__webglFramebuffer:null;V.bindFramebuffer(A.FRAMEBUFFER,rt);let ln=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await $d(A,ln,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Fe),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Oe),A.deleteBuffer(Fe),A.deleteSync(ln),Oe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(N,oe=null,ye=0){let Re=Math.pow(2,-ye),pe=Math.floor(N.image.width*Re),Oe=Math.floor(N.image.height*Re),Qe=oe!==null?oe.x:0,Ue=oe!==null?oe.y:0;Q.setTexture2D(N,0),A.copyTexSubImage2D(A.TEXTURE_2D,ye,0,0,Qe,Ue,pe,Oe),V.unbindTexture()};let us=A.createFramebuffer(),hr=A.createFramebuffer();this.copyTextureToTexture=function(N,oe,ye=null,Re=null,pe=0,Oe=null){let Qe,Ue,He,Ke,xt,Xe,Fe,rt,ln;Oe===null&&(pe!==0?(Ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Oe=pe,pe=0):Oe=0);let _n=N.isCompressedTexture?N.mipmaps[Oe]:N.image;if(ye!==null)Qe=ye.max.x-ye.min.x,Ue=ye.max.y-ye.min.y,He=ye.isBox3?ye.max.z-ye.min.z:1,Ke=ye.min.x,xt=ye.min.y,Xe=ye.isBox3?ye.min.z:0;else{let Hn=Math.pow(2,-pe);Qe=Math.floor(_n.width*Hn),Ue=Math.floor(_n.height*Hn),He=N.isDataArrayTexture?_n.depth:N.isData3DTexture?Math.floor(_n.depth*Hn):1,Ke=0,xt=0,Xe=0}Re!==null?(Fe=Re.x,rt=Re.y,ln=Re.z):(Fe=0,rt=0,ln=0);let Jt=se.convert(oe.format),Lt=se.convert(oe.type),cn;oe.isData3DTexture?(Q.setTexture3D(oe,0),cn=A.TEXTURE_3D):oe.isDataArrayTexture||oe.isCompressedArrayTexture?(Q.setTexture2DArray(oe,0),cn=A.TEXTURE_2D_ARRAY):(Q.setTexture2D(oe,0),cn=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,oe.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,oe.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,oe.unpackAlignment);let nn=A.getParameter(A.UNPACK_ROW_LENGTH),Ct=A.getParameter(A.UNPACK_IMAGE_HEIGHT),_t=A.getParameter(A.UNPACK_SKIP_PIXELS),qn=A.getParameter(A.UNPACK_SKIP_ROWS),ur=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,_n.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,_n.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ke),A.pixelStorei(A.UNPACK_SKIP_ROWS,xt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Xe);let bn=N.isDataArrayTexture||N.isData3DTexture,oi=oe.isDataArrayTexture||oe.isData3DTexture;if(N.isDepthTexture){let Hn=ie.get(N),$t=ie.get(oe),li=ie.get(Hn.__renderTarget),ia=ie.get($t.__renderTarget);V.bindFramebuffer(A.READ_FRAMEBUFFER,li.__webglFramebuffer),V.bindFramebuffer(A.DRAW_FRAMEBUFFER,ia.__webglFramebuffer);for(let ci=0;ci<He;ci++)bn&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ie.get(N).__webglTexture,pe,Xe+ci),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ie.get(oe).__webglTexture,Oe,ln+ci)),A.blitFramebuffer(Ke,xt,Qe,Ue,Fe,rt,Qe,Ue,A.DEPTH_BUFFER_BIT,A.NEAREST);V.bindFramebuffer(A.READ_FRAMEBUFFER,null),V.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(pe!==0||N.isRenderTargetTexture||ie.has(N)){let Hn=ie.get(N),$t=ie.get(oe);V.bindFramebuffer(A.READ_FRAMEBUFFER,us),V.bindFramebuffer(A.DRAW_FRAMEBUFFER,hr);for(let li=0;li<He;li++)bn?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Hn.__webglTexture,pe,Xe+li):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Hn.__webglTexture,pe),oi?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,$t.__webglTexture,Oe,ln+li):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,$t.__webglTexture,Oe),pe!==0?A.blitFramebuffer(Ke,xt,Qe,Ue,Fe,rt,Qe,Ue,A.COLOR_BUFFER_BIT,A.NEAREST):oi?A.copyTexSubImage3D(cn,Oe,Fe,rt,ln+li,Ke,xt,Qe,Ue):A.copyTexSubImage2D(cn,Oe,Fe,rt,Ke,xt,Qe,Ue);V.bindFramebuffer(A.READ_FRAMEBUFFER,null),V.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else oi?N.isDataTexture||N.isData3DTexture?A.texSubImage3D(cn,Oe,Fe,rt,ln,Qe,Ue,He,Jt,Lt,_n.data):oe.isCompressedArrayTexture?A.compressedTexSubImage3D(cn,Oe,Fe,rt,ln,Qe,Ue,He,Jt,_n.data):A.texSubImage3D(cn,Oe,Fe,rt,ln,Qe,Ue,He,Jt,Lt,_n):N.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Oe,Fe,rt,Qe,Ue,Jt,Lt,_n.data):N.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Oe,Fe,rt,_n.width,_n.height,Jt,_n.data):A.texSubImage2D(A.TEXTURE_2D,Oe,Fe,rt,Qe,Ue,Jt,Lt,_n);A.pixelStorei(A.UNPACK_ROW_LENGTH,nn),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Ct),A.pixelStorei(A.UNPACK_SKIP_PIXELS,_t),A.pixelStorei(A.UNPACK_SKIP_ROWS,qn),A.pixelStorei(A.UNPACK_SKIP_IMAGES,ur),Oe===0&&oe.generateMipmaps&&A.generateMipmap(cn),V.unbindTexture()},this.initRenderTarget=function(N){ie.get(N).__webglFramebuffer===void 0&&Q.setupRenderTarget(N)},this.initTexture=function(N){N.isCubeTexture?Q.setTextureCube(N,0):N.isData3DTexture?Q.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?Q.setTexture2DArray(N,0):Q.setTexture2D(N,0),V.unbindTexture()},this.resetState=function(){b=0,R=0,B=null,V.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}};function Bh(r,e){if(e===dh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Js||e===Xa){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===Js)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var Lr=class extends Fi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new iu(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=lr.extractUrlBase(e);a=lr.resolveURL(l,this.path)}else a=lr.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Ws(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Fp){try{a[zt.KHR_BINARY_GLTF]=new ru(e)}catch(u){i&&i(u);return}s=JSON.parse(a[zt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new uu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case zt.KHR_MATERIALS_UNLIT:a[u]=new kh;break;case zt.KHR_DRACO_MESH_COMPRESSION:a[u]=new su(s,this.dracoLoader);break;case zt.KHR_TEXTURE_TRANSFORM:a[u]=new au;break;case zt.KHR_MESH_QUANTIZATION:a[u]=new ou;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function L0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var zt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gh=class{constructor(e){this.parser=e,this.name=zt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,h=new Je(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Un);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new kn(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new es(h),l.distance=u;break;case"spot":l=new Qr(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Vi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},kh=class{constructor(){this.name=zt.KHR_MATERIALS_UNLIT}getMaterialType(){return yn}extendParams(e,t,n){let i=[];e.color=new Je(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Un),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(i)}},Vh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Hh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(o,o)}return Promise.all(s)}},Wh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Je(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Un)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},qh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Je().setRGB(o[0],o[1],o[2],Un),Promise.all(s)}},Zh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Je().setRGB(o[0],o[1],o[2],Un),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=zt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},$h=class{constructor(e){this.parser=e,this.name=zt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Qh=class{constructor(e){this.parser=e,this.name=zt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},eu=class{constructor(e){this.parser=e,this.name=zt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},tu=class{constructor(e){this.parser=e,this.name=zt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},nu=class{constructor(e){this.name=zt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}},iu=class{constructor(e){this.name=zt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==vi.TRIANGLES&&l.mode!==vi.TRIANGLE_STRIP&&l.mode!==vi.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(let g of u){let m=new ct,f=new w,v=new Cn,y=new w(1,1,1),_=new qr(g.geometry,g.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&f.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&v.fromBufferAttribute(c.ROTATION,x),c.SCALE&&y.fromBufferAttribute(c.SCALE,x),_.setMatrixAt(x,m.compose(f,v,y));for(let x in c)if(x==="_COLOR_0"){let T=c[x];_.instanceColor=new Mr(T.array,T.itemSize,T.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);dn.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),p.push(_)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Fp="glTF",Ya=12,Np={JSON:1313821514,BIN:5130562},ru=class{constructor(e){this.name=zt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ya),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Fp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Ya,s=new DataView(e,Ya),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let c=s.getUint32(a,!0);if(a+=4,c===Np.JSON){let l=new Uint8Array(e,Ya+a,o);this.content=n.decode(l)}else if(c===Np.BIN){let l=Ya+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},su=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=zt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=cu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=cu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],p=na[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(let g in p.attributes){let m=p.attributes[g],f=c[g];f!==void 0&&(m.normalized=f)}u(p)},o,l,Un,d)})})}},au=class{constructor(){this.name=zt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ou=class{constructor(){this.name=zt.KHR_MESH_QUANTIZATION}},Al=class extends ar{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,m=g-l,f=-2*p+3*d,v=p-d,y=1-f,_=v-d+u;for(let x=0;x!==o;x++){let T=a[m+x+o],b=a[m+x+c]*h,R=a[g+x+o],B=a[g+x]*h;s[x]=y*T+_*b+f*R+v*B}return s}},D0=new Cn,lu=class extends Al{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return D0.fromArray(s).normalize().toArray(s),s}},vi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},na={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Up={9728:ni,9729:Nn,9984:pl,9985:Ys,9986:ns,9987:Qn},Bp={33071:_r,33648:Is,10497:vn},Oh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Pr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},N0={CUBICSPLINE:void 0,LINEAR:kr,STEP:Gr},Fh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function U0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Pt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ar})),r.DefaultMaterial}function cs(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Vi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function B0(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function O0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function F0(r){let e,t=r.extensions&&r.extensions[zt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zh(t.attributes):e=r.indices+":"+zh(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+zh(r.targets[n]);return e}function zh(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function hu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function z0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var G0=new ct,uu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new L0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Er(this.options.manager):this.textureLoader=new Fa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ws(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return cs(s,o,i),Vi(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())s(h,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[zt.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(lr.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Oh[i.type],o=na[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new pn(l,a,c))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],c=Oh[i.type],l=na[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,m,f;if(p&&p!==u){let v=Math.floor(d/p),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+v+":"+i.count,_=t.cache.get(y);_||(m=new l(o,v*p,i.count*p/h),_=new Bs(m,p/h),t.cache.add(y,_)),f=new Os(_,c,d%p/h,g)}else o===null?m=new l(i.count*c):m=new l(o,d,i.count*c),f=new pn(m,c,g);if(i.sparse!==void 0){let v=Oh.SCALAR,y=na[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,T=new y(a[1],_,i.sparse.count*v),b=new l(a[2],x,i.sparse.count*c);o!==null&&(f=new pn(f.array.slice(),f.itemSize,f.normalized)),f.normalized=!1;for(let R=0,B=T.length;R<B;R++){let U=T[R];if(f.setX(U,b[R*c]),c>=2&&f.setY(U,b[R*c+1]),c>=3&&f.setZ(U,b[R*c+2]),c>=4&&f.setW(U,b[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}f.normalized=g}return f})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Up[d.magFilter]||Nn,h.minFilter=Up[d.minFilter]||Qn,h.wrapS=Bp[d.wrapS]||vn,h.wrapT=Bp[d.wrapT]||vn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==ni&&h.minFilter!==Nn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(m){let f=new An(m);f.needsUpdate=!0,d(f)}),t.load(lr.resolveURL(u,s.path),g,void 0,p)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Vi(u,a),u.userData.mimeType=a.mimeType||z0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[zt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[zt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(a);a=s.extensions[zt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Fs,jn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new br,jn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Pt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},c=s.extensions||{},l=[];if(c[zt.KHR_MATERIALS_UNLIT]){let u=i[zt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new Je(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Un),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Ot);let h=s.alphaMode||Fh.OPAQUE;if(h===Fh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Fh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==yn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new be(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==yn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==yn){let u=s.emissiveFactor;o.emissive=new Je().setRGB(u[0],u[1],u[2],Un)}return s.emissiveTexture!==void 0&&a!==yn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,yt)),Promise.all(l).then(function(){let u=new a(o);return s.name&&(u.name=s.name),Vi(u,s),t.associations.set(u,{materials:e}),s.extensions&&cs(i,u,s),u})}createUniqueName(e){let t=on.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[zt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Op(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=F0(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[zt.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=Op(new ut,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?U0(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let m=h[p],f=a[p],v,y=l[p];if(f.mode===vi.TRIANGLES||f.mode===vi.TRIANGLE_STRIP||f.mode===vi.TRIANGLE_FAN||f.mode===void 0)v=s.isSkinnedMesh===!0?new Xr(m,y):new ht(m,y),v.isSkinnedMesh===!0&&v.normalizeSkinWeights(),f.mode===vi.TRIANGLE_STRIP?v.geometry=Bh(v.geometry,Xa):f.mode===vi.TRIANGLE_FAN&&(v.geometry=Bh(v.geometry,Js));else if(f.mode===vi.LINES)v=new Zr(m,y);else if(f.mode===vi.LINE_STRIP)v=new Yr(m,y);else if(f.mode===vi.LINE_LOOP)v=new ba(m,y);else if(f.mode===vi.POINTS)v=new Sa(m,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(v.geometry.morphAttributes).length>0&&O0(v,s),v.name=t.createUniqueName(s.name||"mesh_"+e),Vi(v,s),f.extensions&&cs(i,v,f),t.assignFinalMaterial(v),u.push(v)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&cs(i,u[0],s),u[0];let d=new Ge;s.extensions&&cs(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new rn(mh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new or(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let d=new ct;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new jr(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let p=i.channels[u],g=i.samplers[p.sampler],m=p.target,f=m.node,v=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;m.node!==void 0&&(a.push(this.getDependency("node",f)),o.push(this.getDependency("accessor",v)),c.push(this.getDependency("accessor",y)),l.push(g),h.push(m))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],m=u[3],f=u[4],v=[];for(let _=0,x=d.length;_<x;_++){let T=d[_],b=p[_],R=g[_],B=m[_],U=f[_];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let F=n._createAnimationTracks(T,b,R,B,U);if(F)for(let I=0;I<F.length;I++)v.push(F[I])}let y=new Ba(s,void 0,v);return Vi(y,i),y})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,G0)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(s.isBone===!0?h=new xr:l.length>1?h=new Ge:l.length===1?h=l[0]:h=new dn,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Vi(h,s),s.extensions&&cs(n,h,s),s.matrix!==void 0){let u=new ct;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Ge;n.name&&(s.name=i.createUniqueName(n.name)),Vi(s,n),n.extensions&&cs(t,s,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);let l=h=>{let u=new Map;for(let[d,p]of i.associations)(d instanceof jn||d instanceof An)&&u.set(d,p);return h.traverse(d=>{let p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,c=[];Pr[s.path]===Pr.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Pr[s.path]){case Pr.weights:l=Ui;break;case Pr.rotation:l=Bi;break;case Pr.translation:case Pr.scale:l=Oi;break;default:n.itemSize===1?l=Ui:l=Oi;break}let h=i.interpolation!==void 0?N0[i.interpolation]:kr,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let g=new l(c[d]+"."+Pr[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=hu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Bi?lu:Al;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function k0(r,e,t){let n=e.attributes,i=new Mn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new w(c[0],c[1],c[2]),new w(l[0],l[1],l[2])),o.normalized){let h=hu(na[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new w,c=new w;for(let l=0,h=s.length;l<h;l++){let u=s[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let m=hu(na[d.componentType]);c.multiplyScalar(m)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new Xn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Op(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(let a in n){let o=cu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return kt.workingColorSpace!==Un&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${kt.workingColorSpace}" not supported.`),Vi(r,e),k0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?B0(r,e.targets,t):r})}var zp=document.currentScript?.src||location.href,V0={scooter:new URL("./assets/garage/models/scooter-v1.glb",zp).href,hoverboard:new URL("./assets/garage/models/skyboard-v1.glb",zp).href},Cl={},du={};function Gp(r){return Cl[r]?Promise.resolve():du[r]||(du[r]=new Lr().loadAsync(V0[r]).then(e=>{Cl[r]=e.scene}).catch(e=>{throw delete du[r],e}))}function kp(r,e){let t=e.transport;if(!Cl[t])throw Error("\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");let n=new Ge;n.name=t==="scooter"?"Hyper scooter":"Skyboard",n.scale.setScalar(t==="scooter"?1.9:2.4);let i=Cl[t].clone(!0);n.add(i),r.add(n),i.traverse(o=>{o.isMesh&&(o.geometry=o.geometry.clone(),o.material=o.material.clone(),o.castShadow=!0,o.receiveShadow=!0)});let s=[];if(t==="hoverboard")for(let o of[-.36,.36])for(let c of[-.21,.21]){let l=new Ge;l.position.set(o,.245,c),n.add(l);for(let[h,u,d,p]of[[.056,.22,"#ff7718",.65],[.036,.17,"#ffc74a",.85],[.02,.11,"#fff5cf",1]]){let g=new Gs(h,u,12,1,!0);g.rotateZ(Math.PI),g.translate(0,-u/2,0);let m=new yn({color:d,transparent:!0,opacity:p,depthWrite:!1,side:Ot,blending:Ga}),f=new ht(g,m);f.name="Skyboard exhaust flame",l.add(f)}s.push(l)}function a(o){if(t!=="scooter")return;let c={...window.PokerScooter.defaults,...o.scooter};i.traverse(l=>{let h=/^sc__([a-z]+)__([a-z]+)$/.exec(l.name);h&&(l.visible=h[2]==="always"||c[h[1]]===h[2]),l.isMesh&&l.material.name==="Scooter frame"&&l.material.color.set(c.frame==="gold"?"#d4a13c":"#475560")})}return a(e),{car:n,update:a,measureClearance:()=>null,animate:t==="hoverboard"?o=>{s.forEach((c,l)=>{c.scale.y=1+Math.sin(o*.021+l*1.7)*.12}),n.position.y=Math.sin(o*.0018)*.065,n.rotation.x=Math.sin(o*.0011)*.018,n.rotation.z=Math.sin(o*.0014)*.015}:void 0}}var H0=new URL("./assets/garage/models/bicycle-v1.glb",document.currentScript?.src||location.href).href,Il,Rl;function Vp(){return Il?Promise.resolve():(Rl||(Rl=new Lr().loadAsync(H0).then(r=>{Il=r.scene}).catch(r=>{throw Rl=null,r})),Rl)}function Hp(r,e){if(!Il)throw Error("\u0412\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434 \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");let t=new Ge;t.name="Club bicycle",t.scale.setScalar(1.75);let n=Il.clone(!0);t.add(n),r.add(t),n.traverse(s=>{s.isMesh&&(s.geometry=s.geometry.clone(),s.material=s.material.clone(),s.castShadow=!0,s.receiveShadow=!0)});function i(s){let a={...window.PokerBicycle.defaults,...s.bicycle};n.traverse(o=>{let c=/^bike__([a-z]+)__([a-z]+)$/.exec(o.name);c&&(o.visible=c[2]==="always"||a[c[1]]===c[2]),o.isMesh&&o.material.name==="Bicycle frame"&&o.material.color.set(a.frame==="ruby"?"#b91c32":"#126aa0"),o.isMesh&&o.material.name==="Headlight lens"&&(o.material.emissive.set("#e7f5ff"),o.material.emissiveIntensity=.6)})}return i(e),{car:t,update:i,measureClearance:()=>null}}var W0=document.currentScript?.src||location.href,Wp={"bmw-e60":{file:"./assets/garage/models/bmw-m5-e60-v5.glb?v=20261108-admin-e60",paint:"E60_00",glass:"Tinted windows",wheels:"Anthracite alloy"},"mustang-gt500":{file:"./assets/garage/models/mustang-shelby-gt500-v1.glb",paint:"carpaint",glass:"tinted_glass",yaw:Math.PI/2,scale:4.812/4.85}};function Xp(r){let e=Wp[r];if(!e.pending){let t=new URL(e.file,W0).href;e.pending=new Lr().loadAsync(t).then(n=>{e.template=n.scene}).catch(n=>{throw e.pending=null,n})}return e.pending}function jp(r,e){let t=Wp[e.transport];if(!t.template)throw Error("\u041C\u0430\u0448\u0438\u043D\u0430 \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");let n=new Ge;n.name=e.transport,n.rotation.y=t.yaw||0,n.scale.setScalar(1.22*(t.scale||1));let i=window.PokerGarage,s={paint:l=>l.paint==="classic"?null:i.item("paint",l.paint).color,wheels:l=>l.wheels==="classic"?null:i.wheelPaintColor(l),glass:l=>l.glassTint==="original"?null:i.glassTints[l.glassTint]?.color},a=t.template.clone(!0),o=[];a.traverse(l=>{if(!l.isMesh)return;l.geometry=l.geometry.clone(),l.material=l.material.clone(),l.castShadow=!0,l.receiveShadow=!0;let h=Object.keys(s).find(u=>t[u]===l.material.name);h&&o.push({kind:h,material:l.material,original:l.material.color.clone()})}),n.add(a),r.add(n);function c(l){for(let{kind:h,material:u,original:d}of o){let p=s[h](l);p?u.color.set(p):u.color.copy(d)}}return c(e),{car:n,update:c,measureClearance:()=>null}}function qp({render:r,active:e=()=>!1,fps:t=30,document:n=document,requestFrame:i=requestAnimationFrame,cancelFrame:s=cancelAnimationFrame}){let a=0,o=!1,c=!1,l=-1/0;function h(){c||(o=!0,!n.hidden&&!a&&(a=i(u)))}function u(p){if(a=0,c||n.hidden)return;let g=e();(o||g)&&p-l>=1e3/t-.1&&(o=!1,l=p,r(p)),!a&&!c&&(o||e())&&(a=i(u))}function d(){n.hidden?(s(a),a=0):h()}return n.addEventListener("visibilitychange",d),{request:h,dispose(){c=!0,s(a),a=0,n.removeEventListener("visibilitychange",d)}}}function Yp(r){let e=new Set,t=new Set,n=new Set,i=s=>{Array.isArray(s)?s.forEach(i):s?.isMaterial&&t.add(s)};r.traverse(s=>{s.geometry&&e.add(s.geometry),i(s.material),i(s.customDepthMaterial),i(s.customDistanceMaterial)});for(let s of t){for(let a of Object.values(s))a?.isTexture&&n.add(a);s.dispose()}n.forEach(s=>s.dispose()),e.forEach(s=>s.dispose())}function Zp(r,e,t=.18){return Math.max(0,r+t-e)}function Pl(r){let e=[[-2.6,.22],[-1.8,.42],[-1.3,.76],[-.65,.94],[-.1,.91],[.35,.68],[.8,.3],[1.25,.19],[1.65,.17]];if(r<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++){let[n,i]=e[t],[s,a]=e[t-1];if(r<=n){let o=(r-s)/(n-s),c=o*o*(3-2*o);return a+(i-a)*c}}return e.at(-1)[1]}function Kp(r,e=[]){let t=!1,n=new Map,i=new Set(e),s=new w;function a(o){for(let c=o;c&&c!==r;c=c.parent)if(i.has(c)||c.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(c.name)||c.name.startsWith("front-wing-")&&o.name!=="tapered-nose")return!0;return!1}return{set(o){o=!!o;let c=o!==t;if(!c&&!o)return;t=o,r.updateWorldMatrix(!0,!0);let l=r.matrixWorld.clone().invert();r.traverse(h=>{if(!h.geometry||a(h))return;let u=h.geometry,d=u.getAttribute("position");if(!d||!c&&n.has(u))return;n.has(u)||n.set(u,new Float32Array(d.array));let p=n.get(u);if(d.array.set(p),o){let g=new ct().multiplyMatrices(l,h.matrixWorld),m=g.clone().invert();for(let f=0;f<d.count;f++)s.fromBufferAttribute(d,f).applyMatrix4(g),s.z*=Pl(s.x),s.y>1.08&&(s.y=1.08+(s.y-1.08)*.68),s.applyMatrix4(m),d.setXYZ(f,s.x,s.y,s.z)}d.needsUpdate=!0,u.computeVertexNormals(),u.computeBoundingBox(),u.computeBoundingSphere()})}}}function Jp({paint:r,carbon:e,metal:t}){let n=new Ge;n.name="formula-cockpit";function i(d,p,g,m){let f=new ht(new It(new At(d.map(v=>new w(...v))),40,p,10,!1),g);return f.name=m,f.castShadow=f.receiveShadow=!0,n.add(f),f}i([[-1.03,1.47,-.64],[-.99,2.48,-.64],[-.38,2.55,-.65],[.53,2.49,-.46],[1,2.4,0],[.53,2.49,.46],[-.38,2.55,.65],[-.99,2.48,.64],[-1.03,1.47,.64]],.043,e,"halo-ring"),i([[1,2.4,0],[1.13,1.93,0],[1.22,1.44,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.34],[-1.27,2.53,-.28],[-1.22,2.65,0],[-1.27,2.53,.28],[-1.25,1.4,.34]],.048,e,"roll-hoop");for(let d of[-1,1])for(let p of[.67,.94])i([[1.19,p,d*.34],[1.92,p-.12,d*1.24],[2.22,p,d*.31]],.024,e,"front-wishbone");let s=new Ge;s.name="formula-engine-cover";let a=[],o=[],c=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],l=32;c.forEach(([d,p,g,m],f)=>{for(let v=0;v<=l;v++){let y=v/l*Math.PI*2;if(a.push(d,p+Math.sin(y)*m,Math.cos(y)*g),f<c.length-1&&v<l){let _=f*(l+1)+v,x=_+l+1;o.push(_,x,_+1,_+1,x,x+1)}}});for(let d of[0,c.length-1])for(let p=1;p<l-1;p++){let g=d*(l+1);d===0?o.push(g,g+p,g+p+1):o.push(g,g+p+1,g+p)}let h=new ut;h.setAttribute("position",new Ee(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new ht(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let p=0;p<5;p++){let g=new ht(new at(.025,.07,.19),e);g.position.set(-1.48-p*.13,1.57-p*.055,d*.31),g.rotation.z=-.2,s.add(g)}return n.add(s),{group:n,engine:s}}function $p(r,e,t){let n=e.hat,i=new Ge,s=[],a=[],o=[];if(!n||n==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};i.name="headwear:"+n;let c=(v,y=.88,_=0)=>{let x=new Pt({color:v,roughness:y,metalness:_,side:Ot});return a.push(x),x},l=c(t.item("hat",n).color),h=c(new Je(t.item("hat",n).color).multiplyScalar(.66)),u=c("#a79672"),d=c("#242422"),p=(v,y)=>{s.push(v);let _=new ht(v,y);return _.castShadow=_.receiveShadow=!0,i.add(_),_},g=(v,y,_,x=!1)=>p(new It(new At(v.map(T=>new w(...T)),x),64,y,8,x),_);function m(v,y,_,x,T){let b=[];for(let R=0;R<64;R++){let B=R/64*Math.PI*2;b.push([Math.cos(B)*y,v,.015+Math.sin(B)*_])}g(b,x,T,!0)}function f(v,y,_,x,T){let b=[],R=[],B=[];for(let L=0;L<=12;L++)for(let q=0;q<=96;q++){let W=q/96*Math.PI*2,re=L/12,ce=v+(y-v)*re;if(b.push(ce*Math.cos(W),_-x*re*re,.015+ce*.92*Math.sin(W)),R.push(q/96,L/12),L<12&&q<96){let Y=L*97+q;B.push(Y,Y+1,Y+96+1,Y+1,Y+96+2,Y+96+1)}}let I=new ut;I.setAttribute("position",new Ee(b,3)),I.setAttribute("uv",new Ee(R,2)),I.setIndex(B),I.computeVertexNormals(),p(I,T),m(_-x,y,y*.92,.004,h)}if(/straw/i.test(n)){let v=new it(.245,.282,.245,64,8);v.translate(0,1.955,.015),p(v,l),f(.27,.48,1.836,.03,l),m(1.854,.285,.269,.017,d);for(let y=1.86;y<2.075;y+=.012)m(y,.282-(y-1.83)*.14,.26-(y-1.83)*.12,.0014,u);for(let y=.3;y<.48;y+=.013)m(1.836-.03*((y-.27)/.21)**2,y,y*.92,.0012,u)}else if(/bucket|duck/i.test(n)){let v=new it(.255,.293,.215,64,8);v.translate(0,1.952,.015),p(v,l),f(.29,.363,1.845,.053,l),m(1.85,.294,.276,.0025,h),m(2.054,.255,.245,.002,h);let y=document.createElement("canvas");y.width=y.height=256;let _=y.getContext("2d");_.fillStyle=t.item("hat",n).color,_.fillRect(0,0,256,256);for(let T=30;T<256;T+=70)for(let b=20;b<256;b+=80)_.fillStyle="#d9ad42",_.beginPath(),_.ellipse(b,T,12,8,0,0,Math.PI*2),_.fill(),_.beginPath(),_.arc(b+9,T-7,6,0,Math.PI*2),_.fill(),_.fillStyle="#e89c34",_.fillRect(b+13,T-8,6,3),_.fillStyle="#201a13",_.fillRect(b+10,T-9,2,2);let x=new Wt(y);x.colorSpace=yt,x.wrapS=x.wrapT=vn,x.repeat.set(4,1),o.push(x),l.map=x}else{let v=new Vt(1,64,36,0,Math.PI*2,0,Math.PI*.51);v.scale(.305,.235,.288),v.translate(0,1.82,.015),p(v,l),m(1.818,.305,.288,.007,h);let y=[],_=[],x=[],T=32,b=16;for(let F=0;F<=b;F++)for(let I=0;I<=T;I++){let L=I/T*2-1,q=F/b,W=L*(.292-.018*q),re=.17+.4*Math.sqrt(Math.max(.08,1-L*L))*q,ce=1.814-.028*q-.027*L*L*q;if(y.push(W,ce,re),_.push(I/T,F/b),I<T&&F<b){let Y=F*(T+1)+I;x.push(Y,Y+1,Y+T+1,Y+1,Y+T+2,Y+T+1)}}let R=new ut;R.setAttribute("position",new Ee(y,3)),R.setAttribute("uv",new Ee(_,2)),R.setIndex(x),R.computeVertexNormals(),p(R,l);let B=[];for(let F=0;F<=T;F++){let I=F/T*2-1;B.push([I*.274,1.786-.027*I*I,.17+.4*Math.sqrt(Math.max(.08,1-I*I))])}g(B,.004,h);for(let F=0;F<6;F++){let I=F/6*Math.PI*2,L=[];for(let q=0;q<=24;q++){let W=q/24*Math.PI/2;L.push([.307*Math.sin(W)*Math.cos(I),1.82+.237*Math.cos(W),.015+.29*Math.sin(W)*Math.sin(I)])}g(L,.0017,h)}let U=new Vt(.015,20,12);if(U.translate(0,2.058,.015),p(U,h),/propeller/i.test(n)){let F=c("#c7c4b9",.35,.8),I=new it(.006,.006,.065,12);I.translate(0,2.09,.015),p(I,F);for(let L=0;L<3;L++){let q=new Vt(1,20,12);q.scale(.115,.007,.027),q.translate(.086,0,0),q.rotateY(L/3*Math.PI*2),q.translate(0,2.126,.015),p(q,c(["#ba3847","#3e83ae","#d4b74a"][L]))}}else{let F=document.createElement("canvas");F.width=256,F.height=128;let I=F.getContext("2d");I.clearRect(0,0,256,128),I.fillStyle="#d0b77a",I.font="bold 62px Arial",I.textAlign="center",I.fillText("P21",128,88);let L=new Wt(F);L.colorSpace=yt,o.push(L);let q=new Pt({map:L,transparent:!0,alphaTest:.1,roughness:.9});a.push(q);let W=new Yt(.12,.06);W.translate(0,1.945,.265),p(W,q)}}return r.bones.head.add(i),i.position.copy(new w(...r.bones.head.userData.rest).negate()),{dispose(){i.removeFromParent(),s.forEach(v=>v.dispose()),a.forEach(v=>v.dispose()),o.forEach(v=>v.dispose())}}}var Hi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Qp(r){let e=[],t={};function n(f,v,y,_,x=0){let T=new xr;T.name=f;let b=v?v.userData.rest:[0,0,0];return T.position.set(y-b[0],_-b[1],x-b[2]),T.userData.rest=[y,_,x],(v||r).add(T),e.push(T),t[f]=T,T}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[f,v]of[["left",-1],["right",1]]){let y=n(f+"Shoulder",a,v*.49,1.09),_=n(f+"Elbow",y,v*.66,.57),x=n(f+"Wrist",_,v*.78,.04,.035),T=n(f+"Hand",x,v*.79,-.15,.07);for(let B=0;B<4;B++)n(f+"Finger"+B,T,v*(.5-(.175+B*.019))*2.55,-.17-B*.007,.07);n(f+"Thumb",T,v*.63,-.13,.11);let b=n(f+"Hip",i,v*.23,-.2,-.01),R=n(f+"Knee",b,v*.34,-.77,-.01);n(f+"Ankle",R,v*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new jr(e);function h(f,v,y){let _=v<.5?"left":"right",x=i,T=i,b=0;if(f===1)x=s,T=a,b=1-Hi(.25,.44,y);else if(f===2||f===9)y<.25?(x=a,T=t[_+"Shoulder"],b=Hi(.175,.245,y)):y<.4?(x=t[_+"Shoulder"],T=t[_+"Elbow"],b=Hi(.29,.38,y)):(x=t[_+"Elbow"],T=t[_+"Wrist"],b=Hi(.43,.49,y));else if(f===3){let R=v<.5?v:1-v;y>.54?(x=t[_+"Hand"],T=t[_+(R>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((R-.175)/.019))))],b=Hi(.54,.566,y)):(x=t[_+"Wrist"],T=t[_+"Hand"],b=Hi(.49,.53,y))}else f===4?y<.57?(x=i,T=t[_+"Hip"],b=Hi(.5,.57,y)):y<.76?(x=t[_+"Hip"],T=t[_+"Knee"],b=Hi(.66,.74,y)):(x=t[_+"Knee"],T=t[_+"Ankle"],b=Hi(.79,.84,y)):f===5||f===8?x=T=t[_+"Ankle"]:f===6||f===10?x=T=c:f===7&&(x=a,T=o,b=1-Hi(.17,.225,y));return{indices:[e.indexOf(x),e.indexOf(T),0,0],weights:[1-b,b,0,0]}}function u(f,v){let y=f.getAttribute("bodyUv"),_=f.getAttribute("surface"),x=[],T=[];for(let R=0;R<y.count;R++){let B=h(_.getX(R),y.getX(R),y.getY(R));x.push(...B.indices),T.push(...B.weights)}f.setAttribute("skinIndex",new Wr(x,4)),f.setAttribute("skinWeight",new Ee(T,4));let b=new Xr(f,v);return r.add(b),b.bind(l,new ct),b.frustumCulled=!1,b}let d=0,p=!1;function g(f,v,y){d+=(Number(v)-d)*(1-Math.exp(-Math.min(.1,y)*9));let _=Math.sin(f*1.55)*d;a.scale.set(1+_*.003,1+_*.003,1+_*.007),c.rotation.set(Math.sin(f*.57)*.01*d,(p?.025:0)+Math.sin(f*.36)*.024*d,(p?-.016:0)+Math.sin(f*.41)*.008*d);for(let[x,T]of[["left",-1],["right",1]]){t[x+"Shoulder"].rotation.z=(p?T*.026:0)+(Math.sin(f*.79+T*.5)*.009+T*.005)*d,t[x+"Elbow"].rotation.x=(p?T<0?-.045:-.085:0)+(Math.sin(f*.67+T*.4)*.012-.025)*d,t[x+"Hand"].rotation.x=(p?.025:0)+Math.sin(f*.61+T)*.01*d;for(let b=0;b<4;b++)t[x+"Finger"+b].rotation.x=(p?-.14-b*.042:0)+(.035+Math.sin(f*.53+b*.25+T)*.012)*d}r.updateMatrixWorld(!0),l.update()}function m(f,v){r.updateMatrixWorld(!0),t[v].attach(f)}return{skeleton:l,bones:t,mesh:u,update:g,attach:m,weights:h,setRelaxedPose(f){p=!!f},dispose(){l.dispose()}}}var Ll=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function ef(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,c,l)=>{if(l===1){let h=Ll(o,.25,.12),u=Ll(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,c*=n,c+=s*u*(c>0?1:.15)}if(l===2){let h=(i-1)*Ll(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),c*=1+h}if(l===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*Ll(o,.69,.16);a=h+(a-h)*(1+u),c*=1+u}return[a,o,c]}}function tf(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new Pt({color:i[t]||"#30241d",roughness:.96}),a=new Uint8Array(16384*4);for(let u=0;u<128;u++)for(let d=0;d<128;d++){let p=(u*128+d)*4,g=Math.sin(d*127.1+u*311.7)*43758.5453,m=128+Math.round(28*Math.sin(u*1.7)+28*(g-Math.floor(g)-.5));a[p]=a[p+1]=a[p+2]=m,a[p+3]=255}let o=new ir(a,128,128);o.wrapS=o.wrapT=vn,o.repeat.set(3,3),o.magFilter=Nn,o.minFilter=Qn,o.generateMipmaps=!0,o.needsUpdate=!0,s.bumpMap=o,s.bumpScale=.002;let c=e.sculptHairTexture?.clone();c&&(c.center.set(.5,.5),c.rotation=Math.PI/2,c.repeat.set(2,2),c.needsUpdate=!0,s.bumpMap=c,s.bumpScale=.0024,i[t]||(s.map=c,s.color.set("#c7b9a4")));let l=new Ge;l.name="hairstyle:"+t;function h(u,d,p,g,m,f,v=0){let y=new Vt(1,12,10);n.push(y);let _=new ht(y,s);_.position.set(u,d,p),_.scale.set(g,m,f),_.rotation.z=v,l.add(_)}if(t==="hairDreads"){let u=new Vt(1,48,24,0,Math.PI*2,0,Math.PI*.62);u.scale(.275,.292,.278),u.translate(0,1.62,.1),n.push(u),l.add(new ht(u,s));for(let d=0;d<5;d++)for(let p=0;p<11;p++){let g=(p+d%2*.5)/11*Math.PI*2,m=.3+d*.28,f=Math.cos(g)*Math.sin(m)*.278,v=.1+Math.sin(g)*Math.sin(m)*.285,y=1.62+Math.cos(m)*.299;if(Math.sin(g)>.25&&d===4)continue;let _=Math.sin(g)>.25?Math.min(.1+d*.035,Math.max(.035,y-1.7)):.1+d*.035,x=[new w(f,y,v),new w(f*1.1,y-.035,.1+(v-.1)*1.12),new w(f*1.16,y-_*.65,.1+(v-.1)*1.17),new w(f*1.12,y-_,.1+(v-.1)*1.18)],T=new It(new At(x),16,.02,8,!1),b=T.getAttribute("position");for(let R=0;R<=16;R++){let B=new w;for(let F=0;F<=8;F++)B.add(new w().fromBufferAttribute(b,R*9+F));B.multiplyScalar(1/9);let U=(1-.6*Math.pow(R/16,5))*(1+.045*Math.sin(R*2.4+p));for(let F=0;F<=8;F++){let I=R*9+F,L=new w().fromBufferAttribute(b,I).sub(B).multiplyScalar(U).add(B);b.setXYZ(I,L.x,L.y,L.z)}}T.computeVertexNormals(),n.push(T),l.add(new ht(T,s))}}else if(t!=="hairBald"){let u=t==="hairBuzz",d=t==="hairAfro",p=t==="hairMohawk"||t==="hairBlue",g=t==="hairDreads",m=t==="hairRocker";for(let f=0;f<7;f++)for(let v=0;v<12;v++){let y=v/12*Math.PI*2,_=f/7*Math.PI*.57;if(p&&Math.abs(Math.cos(y))>.27)continue;let x=Math.cos(y)*Math.sin(_)*.23,T=.1+Math.sin(y)*Math.sin(_)*.24,b=t==="hairCurly"||d,R=u?.026:b?.067:.045,B=u?.018:d?.12:p?.16:b?.065:.075,U=1.62+Math.cos(_)*.29;t==="hairPompadour"&&(B+=Math.max(0,Math.sin(y))*.1,U+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(U+=x*.16),(g||m)&&(B=f>3?.18:.065,U-=f>3?.07:0),h(x,U,T,R,B,R,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(l),l.position.copy(r.bones.head.userData.rest?new w(...r.bones.head.userData.rest).negate():new w),l.position.y+=e.sculptHairOffset||0,l.position.z+=e.sculptHairDepth||0,{dispose(){l.removeFromParent(),n.forEach(u=>u.dispose()),s.dispose(),o.dispose(),c?.dispose()}}}function nf(r,e,t){let n=[],i=[],s=new Ge;if(!e.glasses||e.glasses==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};s.name="eyewear:"+e.glasses;let a=e.glasses,o=/round|rimless/.test(a),c=/sport/.test(a),l=/Gold|Silver|browline/.test(a),h=new Pt({color:t.item("glasses",a).color,metalness:l?.85:.08,roughness:l?.28:.38}),u=new Zt({color:c?"#406d80":"#182322",metalness:c?.65:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.08,transparent:!0,opacity:.94,side:Ot});i.push(h,u);let d=(g,m)=>{n.push(g);let f=new ht(g,m);return s.add(f),f},p=(g,m)=>d(new It(new At(g.map(f=>new w(...f))),32,m,8,!1),h);for(let g of[-1,1]){let m=g*.125,f=1.63,v=.391,y=c?.127:.112,_=o?.079:c?.06:.067,x=[],T=new Xt;for(let B=0;B<=64;B++){let U=B/64*Math.PI*2,F=Math.cos(U),I=Math.sin(U),L=y*(o?F:Math.sign(F)*Math.pow(Math.abs(F),.65)),q=_*(o?I:Math.sign(I)*Math.pow(Math.abs(I),.65));B===0?T.moveTo(L,q):T.lineTo(L,q),x.push(new w(m+L,f+q,v-Math.abs(L)*.16))}let b=new sr(T,32);b.translate(m,f,v-.005),d(b,u),d(new It(new At(x,!0),64,l?.0045:.0085,8,!0),h),p([[g*.233,f+.008,.376],[g*.256,f+.004,.3],[g*.273,f-.005,.17],[g*.282,f-.024,.085]],l?.0045:.008);let R=new Vt(.011,16,10);R.translate(g*.237,f+.009,.374),d(R,h)}return p([[-.025,1.644,.389],[0,1.655,.404],[.025,1.644,.389]],l?.004:.006),r.bones.head.add(s),s.position.copy(new w(...r.bones.head.userData.rest).negate()),s.position.z+=e.sculptEyewearDepth||0,{dispose(){s.removeFromParent(),n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}function rf(r,e="#c5b899"){let t=new Ge;t.name="wardrobe-wrist-watch",t.position.set(.744,.015,.026),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Pt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Pt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,T,b,R,B)=>{let U=new ht(x,T);return U.position.set(b,R,B),t.add(U),U},o=a(new Ft(.072,.012,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.9,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let T=x*Math.PI/9,b=a(new at(.026,.049,.016),i,Math.cos(T)*.065,0,Math.sin(T)*.072);b.rotation.y=-T}let c=/square|smart/i.test(r),l=a(c?new at(.147,.153,.022):new it(.078,.073,.022,64),i,0,0,.078);if(c||(l.rotation.x=Math.PI/2),!c)a(new Ft(.069,.006,12,64),i,0,0,.095);else for(let[x,T,b,R]of[[-.071,0,.008,.15],[.071,0,.008,.15],[0,.071,.14,.008],[0,-.071,.14,.008]])a(new at(b,R,.009),i,x,T,.095);let h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),p=/Daytona|square|rose/i.test(r),g=u.createRadialGradient(190,170,20,256,256,256);g.addColorStop(0,d?"#237050":p?"#fff7db":"#294559"),g.addColorStop(1,d?"#072b20":p?"#c7c4b4":"#06121c"),u.fillStyle=g,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=p?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let m=(x,T,b)=>{u.save(),u.rotate(x),u.strokeStyle=p?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-T),u.stroke(),u.restore()};if(m(-Math.PI/3,112,13),m(Math.PI/3,168,9),m(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=p?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80),/GMT/i.test(r)){for(let x=0;x<24;x++)u.beginPath(),u.strokeStyle=x<12?"#a52d40":"#274e9a",u.lineWidth=24,u.arc(0,0,240,x*Math.PI/12,(x+1)*Math.PI/12),u.stroke();m(-Math.PI*.55,172,6)}if(/Daytona/i.test(r))for(let[x,T]of[[-91,35],[91,35],[0,128]])u.fillStyle="#182027",u.beginPath(),u.arc(x,T,48,0,Math.PI*2),u.fill(),u.strokeStyle="#e3dfd3",u.lineWidth=3,u.beginPath(),u.moveTo(x,T),u.lineTo(x+17,T-28),u.stroke();if(/Skeleton/i.test(r))for(let[x,T,b]of[[-60,60,65],[80,45,43],[15,-115,40]]){u.strokeStyle="#d6b783",u.lineWidth=9,u.beginPath(),u.arc(x,T,b,0,Math.PI*2),u.stroke();for(let R=0;R<8;R++){let B=R*Math.PI/4;u.beginPath(),u.moveTo(x+Math.cos(B)*15,T+Math.sin(B)*15),u.lineTo(x+Math.cos(B)*b,T+Math.sin(B)*b),u.stroke()}}/smart/i.test(r)&&(u.fillStyle="#06131d",u.fillRect(-256,-256,512,512),u.fillStyle="#8ae9c7",u.font="bold 100px Arial",u.fillText("10:10",0,10),u.font="32px Arial",u.fillText("POKER21",0,88));let f=new Wt(h);f.colorSpace=yt,f.anisotropy=4;let v=a(c?new Yt(.13,.13):new $n(.066,64),new Pt({map:f,roughness:.34,metalness:.1}),0,0,.098),y=a(c?new Yt(.13,.13):new $n(.066,64),new Zt({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.101),_=a(new it(.012,.012,.019,16),i,.085,0,.08);return _.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(T=>{T.geometry?.dispose(),T.material&&x.add(T.material)});for(let T of x)T.dispose();f.dispose()}}}function sf(r="#d3b15b",e="rubyLion"){let t=new Ge;t.name="wardrobe-finger-ring",t.position.set(.731,-.225,.07);let n=["silverSpade","clubSignet","diamondKing"].includes(e),i=new Pt({color:n?"#c6d3df":"#c5a14d",metalness:.9,roughness:.24}),s=new Zt({color:e==="rubyLion"?"#a51c39":e==="emeraldCrown"?"#167953":e==="diamondKing"?"#e8f7ff":r,metalness:.08,roughness:.1,clearcoat:1}),a=new ht(new Ft(.026,.006,12,48),i);a.name="ring-band",a.rotation.x=Math.PI/2,t.add(a);let o=new ht(e==="clubSignet"?new it(.021,.019,.012,8):new at(.029,.029,.012),i);e==="clubSignet"&&(o.rotation.x=Math.PI/2),o.name="ring-bezel",o.position.z=.028,t.add(o);let c;if(e==="silverSpade"){let h=new Xt;h.moveTo(0,.019),h.bezierCurveTo(-.008,.007,-.022,-.002,-.012,-.009),h.quadraticCurveTo(-.004,-.014,0,-.006),h.quadraticCurveTo(.004,-.014,.012,-.009),h.bezierCurveTo(.022,-.002,.008,.007,0,.019),h.lineTo(.006,-.017),h.lineTo(-.006,-.017),h.closePath(),c=new Ht(h,{depth:.003,bevelEnabled:!1})}else e==="clubSignet"||e==="goldAces"?c=new at(.022,.025,.004):c=e==="emeraldCrown"?new at(.02,.024,.012):new Hs(e==="diamondKing"?.021:.017);let l=new ht(c,e==="silverSpade"||e==="goldAces"?i:s);if(l.name="ring-face:"+e,l.scale.z=.5,l.position.z=.039,t.add(l),["clubSignet","goldAces"].includes(e)){let h=document.createElement("canvas");h.width=h.height=128;let u=h.getContext("2d");u.fillStyle=n?"#24343d":"#45341a",u.fillRect(0,0,128,128),u.fillStyle=n?"#e1eaf1":"#edce83",u.font="bold 48px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText(e==="goldAces"?"AA":"P21",64,66,116),s.map=new Wt(h),s.map.colorSpace=yt,l.material=s}return{group:t,dispose(){t.traverse(h=>h.geometry?.dispose()),s.map?.dispose(),i.dispose(),s.dispose()}}}var Dl=new Map;async function X0(r){Dl.has(r)||Dl.set(r,fetch("./assets/player-hall/character-3d/sculpt/"+r+".bin").then(a=>{if(!a.ok)throw Error("Character anatomy: "+a.status);return a.arrayBuffer()}).catch(a=>{throw Dl.delete(r),a}));let e=await Dl.get(r),t=new DataView(e).getUint32(0,!0),n=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,t))),i=4+t,s=new ut;return s.setAttribute("position",new pn(new Float32Array(e.slice(i,i+n.vertices*12)),3)),s.setAttribute("normal",new pn(new Float32Array(e.slice(i+n.vertices*12,i+n.vertices*24)),3)),s.setIndex(new pn(new Uint32Array(e.slice(i+n.vertices*24)),1)),s}var yi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},Ci=r=>{let e=Math.sin(r*127.1+311.7)*43758.5453;return e-Math.floor(e)};async function af(r,e){let t=new Ge,n=Qp(t),i=[],s=[],a=[],o=ef(e.body),c=r.wardrobeSubcategory("pants",e.pants)==="shorts",l=e.suit?.endsWith("Tee"),h=e.suit?.endsWith("Tank"),u=e.helmet&&e.helmet!=="none",d=!u||e.visor==="open",p=Promise.all(["head","face-v2","hand-left","hand-right","shirt-"+(h?"tank":l?"tee":"jacket"),c?"shorts":"pants",...u?["helmet-shell"]:[]].map(X0)),g=(z,ne=.8,le=0,ge=!1)=>{let de=ge?Zt:Pt,ee=new de({color:z,roughness:ne,metalness:le});return s.push(ee),ee},m=g("#ffffff",.96),f=g("#ffffff",.73),v=g("#6b4735",.84),y=g("#73503c",.59),_=g("#453127",.51),x=g("#0b0908",.15),T=g("#efe6d2",.32),b=g("#6e5341",.42),R=g(r.item("suit",e.suit).color,.94,0,!0),B=g(new Je(r.item("suit",e.suit).color).multiplyScalar(.7),.92),U=g(r.item("pants",e.pants).color,.96),F=g(new Je(r.item("pants",e.pants).color).multiplyScalar(.68),.94),I=g(r.item("shoes",e.shoes).color,.49,0,!0),L=g(new Je(r.item("shoes",e.shoes).color).multiplyScalar(.78),.64),q=g("#dedbd3",.84),W=g("#b1afa8",.93),re=g("#c5a259",.3,.88);R.clearcoat=/leather|Biker/i.test(e.suit)?.25:0,R.roughness=/leather|Biker/i.test(e.suit)?.46:.94,R.sheen=/Knit|velvet/i.test(e.suit)?.65:.12,R.sheenRoughness=.85,I.clearcoat=.18,I.clearcoatRoughness=.48,I.color.r>I.color.g*1.8&&I.color.r>I.color.b*1.4&&(I.color.multiplyScalar(.62),L.color.multiplyScalar(.62));let ce=["classic","ruby","midnight"].includes(e.pants);ce&&(U.color.set("#171b20"),F.color.set("#101317"));let Y=g("#ffffff",.97);Y.vertexColors=!0,Y.side=Ot;function he(z){let ne=new Uint8Array(65536);for(let ge=0;ge<128;ge++)for(let de=0;de<128;de++){let ee=(ge*128+de)*4,fe=z==="cloth"?128+24*Math.cos(de*Math.PI)+20*Math.sin(ge*Math.PI/2)+Ci(ee)*15:128+(Ci(ee)-.5)*48;ne[ee]=ne[ee+1]=ne[ee+2]=fe,ne[ee+3]=255}let le=new ir(ne,128,128);return le.wrapS=le.wrapT=vn,le.repeat.set(z==="cloth"?4:8,z==="cloth"?4:8),le.magFilter=Nn,le.minFilter=Qn,le.generateMipmaps=!0,le.anisotropy=4,le.needsUpdate=!0,a.push(le),le}let[Ae,[ze,Pe]]=await Promise.all([p,Promise.all(["fur","skin"].map(z=>new Er().loadAsync("./assets/player-hall/character-3d/sculpt/"+z+"-albedo-v1.webp")))]);for(let z of[ze,Pe])z.colorSpace=yt,z.wrapS=z.wrapT=vn,z.anisotropy=4,a.push(z);ze.repeat.set(2,3),Pe.repeat.set(2,2),m.map=ze,m.bumpMap=ze,m.bumpScale=.0024,f.map=Pe,m.onBeforeCompile=z=>{z.vertexShader=`attribute float surface;varying float furRegion;varying float furHeight;
`+z.vertexShader,z.vertexShader=z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
furRegion=surface;furHeight=position.y;`),z.fragmentShader=`varying float furRegion;varying float furHeight;
`+z.fragmentShader,z.fragmentShader=z.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
   float beard=step(5.5,furRegion)*(1.-step(6.5,furRegion))*(1.-smoothstep(1.42,1.62,furHeight));float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(grey*1.6),beard*.72);
  `)},m.customProgramCacheKey=()=>"sculpted-chimp-beard-v1";let We=he("cloth"),Le=he("skin");for(let z of[R,B,U,F])z.bumpMap=We,z.bumpScale=8e-4;for(let z of[f,y,_])z.bumpMap=Le,z.bumpScale=65e-5;function _e(z,ne,le,ge,de=!0){let ee=z.getAttribute("position"),fe=[],se=[];for(let Z=0;Z<ee.count;Z++){let A=ee.getX(Z),Se=ee.getY(Z),Te=ee.getZ(Z),xe=typeof le=="function"?le(A,Se,Te):le;if(de){let Ce=o(A,.5-Se/3.825,Te,xe);if(ge==="shirt-body"){let we=o(A,.5-Se/3.825,Te,1),ke=o(A,.5-Se/3.825,Te,2),ot=yi(.45,.6,Math.abs(A));Ce=we.map((Ze,je)=>Ze+(ke[je]-Ze)*ot)}A=Ce[0],Se=(.5-Ce[1])*3.825,Te=Ce[2],ee.setXYZ(Z,A,Se,Te)}fe.push(.5+A/2.55,.5-Se/3.825),se.push(xe)}z.setAttribute("bodyUv",new Ee(fe,2)),z.setAttribute("surface",new Ee(se,1)),z.getAttribute("uv")||z.setAttribute("uv",new Ee(fe,2)),(!z.getAttribute("normal")||de&&e.body&&e.body!=="bodyNormal")&&z.computeVertexNormals(),i.push(z);let De=n.mesh(z,ne);return De.name=ge||"",De.castShadow=De.receiveShadow=!0,De}function $(z,ne,le,ge,de){let ee=new Vt(1,40,28);return ee.scale(...le),ee.translate(...ne),_e(ee,z,ge,de)}function H(z,ne,le,ge,de,ee=!1){return _e(new It(new At(z.map(fe=>new w(...fe)),ee),Math.max(24,z.length*5),ne,8,ee),le,ge,de)}function Ie(z,ne,le,ge,de,ee,fe,se,De){let Z=[];for(let A=0;A<64;A++){let Se=A/64*Math.PI*2;Z.push([z+ge*Math.cos(Se),ne,le+de*Math.sin(Se)])}return H(Z,ee,fe,se,De,!0)}function P(z,ne,le,ge,de,ee,fe,se,De=.023){C([[z,ne+De,le,ge+.003,de+.003],[z,ne+.007,le,ge+.001,de+.001],[z,ne,le,ge,de]],ee,fe,se,{rings:12,sides:64,capTop:!1,capBottom:!1});let Z=[],A=[],Se=64;for(let xe=0;xe<=Se;xe++){let Ce=xe/Se*Math.PI*2;if(Z.push(z+ge*Math.cos(Ce),ne,le+de*Math.sin(Ce),z+(ge-.011)*Math.cos(Ce),ne+.001,le+(de-.011)*Math.sin(Ce)),xe<Se){let we=xe*2;A.push(we,we+2,we+1,we+2,we+3,we+1)}}let Te=new ut;Te.setAttribute("position",new Ee(Z,3)),Te.setIndex(A),Te.computeVertexNormals(),_e(Te,ee,fe,se+"-inside")}function C(z,ne,le,ge,{sides:de=64,rings:ee=80,clothFolds:fe=0,capTop:se=!0,capBottom:De=!0,fork:Z=!1}={}){let A=[],Se=[],Te=[],xe=z[0][1],Ce=z.at(-1)[1];function we(Ze){let je=0;for(;je<z.length-2&&z[je+1][1]>Ze;)je++;let Mt=z[je],$e=z[je+1],mt=Math.max(0,Math.min(1,(Mt[1]-Ze)/(Mt[1]-$e[1])));return Mt.map((St,wt)=>{if(wt===1)return Ze;let hn=z[Math.max(0,je-1)][wt],Kt=z[Math.min(z.length-1,je+2)][wt];return .5*(2*St+(-hn+$e[wt])*mt+(2*hn-5*St+4*$e[wt]-Kt)*mt*mt+(-hn+3*St-3*$e[wt]+Kt)*mt*mt*mt)})}for(let Ze=0;Ze<=ee;Ze++){let je=xe+(Ce-xe)*Ze/ee,[Mt,,$e,mt,St]=we(je);for(let wt=0;wt<=de;wt++){let hn=wt/de*Math.PI*2+(Z?Math.PI/2:0),Kt=Mt+mt*Math.cos(hn),Pn=$e+St*Math.sin(hn),ai=je;if(Z){let mn=wt/de,_i=mn<=.5,Dr=_i?mn*4*Math.PI:Math.PI+(mn-.5)*4*Math.PI,us=Mt+(_i?-1:1)*mt/2+mt/2*Math.cos(Dr),hr=$e+St*Math.sin(Dr),N=yi(.02,-.28,je);Kt+=(us-Kt)*N,Pn+=(hr-Pn)*N}if(fe){let mn=Math.sin(Math.PI*Ze/ee)*(.25+.75*Math.exp(-Math.pow((je-.3)/.24,2))),_i=Math.sin(je*26+hn*3)*Math.sin(hn*2+.4)*mn;Pn+=fe*_i*Math.sin(hn),Kt+=fe*_i*Math.cos(hn),ai+=fe*.35*Math.sin(hn*5+je*10)*mn}if(A.push(Kt,ai,Pn),Se.push(wt/de,Ze/ee),Ze<ee&&wt<de){let mn=Ze*(de+1)+wt;Te.push(mn,mn+1,mn+de+1,mn+1,mn+de+2,mn+de+1)}}}for(let Ze of[0,ee]){if(Ze===0&&!se||Ze===ee&&!De)continue;let je=Ze*(de+1),Mt=A.length/3,$e=new w;for(let mt=0;mt<de;mt++)$e.add(new w(...A.slice((je+mt)*3,(je+mt)*3+3)));$e.multiplyScalar(1/de),A.push($e.x,$e.y,$e.z),Se.push(.5,Ze/ee);for(let mt=0;mt<de;mt++)Te.push(Mt,je+mt+(Ze===0?1:0),je+mt+(Ze===0?0:1))}let ke=new ut;ke.setAttribute("position",new Ee(A,3)),ke.setAttribute("uv",new Ee(Se,2)),ke.setIndex(Te),ke.computeVertexNormals();let ot=ke.getAttribute("normal");for(let Ze=0;Ze<=ee;Ze++){let je=Ze*(de+1),Mt=je+de,$e=new w().fromBufferAttribute(ot,je).add(new w().fromBufferAttribute(ot,Mt)).normalize();ot.setXYZ(je,$e.x,$e.y,$e.z),ot.setXYZ(Mt,$e.x,$e.y,$e.z)}return _e(ke,ne,le,ge)}if(d){let Z=function(Ce){let we=Ce.clone();return s.push(we),we.onBeforeCompile=ke=>{ke.uniforms.chimpPortrait={value:De},ke.vertexShader=`varying vec3 facialPoint;
`+ke.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
facialPoint=position;`),ke.fragmentShader=`uniform sampler2D chimpPortrait;varying vec3 facialPoint;
`+ke.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
     vec3 p=facialPoint;
     float imageY=.3475+(1.64-p.y)*mix(1.72,1.10,smoothstep(1.64,1.78,p.y));
     float width=mix(1.01,1.20,smoothstep(1.45,1.62,p.y));
     vec2 uv=vec2(.505+p.x*width,1.-imageY);
     float mixAmount=smoothstep(-.03,.16,p.z)*smoothstep(.008,.09,uv.y)*smoothstep(.006,.07,1.-uv.y);
     vec3 pigment=texture2D(chimpPortrait,clamp(uv,0.,1.)).rgb;
     diffuseColor.rgb=mix(diffuseColor.rgb,pigment*1.13,mixAmount);
    `)},we.customProgramCacheKey=()=>"chimp-facial-projection-v2",we},z=[],ne=[],le=Ae[0].getAttribute("position"),ge=Ae[1].getAttribute("position");for(let Ce=0;Ce<le.count;Ce++)z.push((Math.atan2(le.getZ(Ce)-.015,le.getX(Ce))+Math.PI)/(2*Math.PI),(le.getY(Ce)-1.17)/.84);for(let Ce=0;Ce<ge.count;Ce++)ne.push((ge.getX(Ce)+.26)/.52,(ge.getY(Ce)-1.29)/.48);Ae[0].setAttribute("uv",new Ee(z,2)),Ae[1].setAttribute("uv",new Ee(ne,2));let de=Ae[1],ee=[],fe=Ce=>Math.exp(-Ce*Ce);for(let Ce=0;Ce<ge.count;Ce++){let we=ge.getX(Ce),ke=ge.getY(Ce),ot=ge.getZ(Ce),Ze=Math.abs(we),je=yi(.24,.31,ot),Mt=1.43+.012*(we/.15)**2+.029*we,$e=fe((we/.139)**2),mt=ke-Mt,St=$e*(.012*fe((mt-.011)/.011)+.017*fe((mt+.013)/.012)-.009*fe(mt/.005)),wt=fe((Ze-.036)/.033)*fe((ke-1.563)/.029),hn=fe((we/.069)**2)*fe(((ke-1.565)/.039)**2),Kt=fe((Ze-.112)/.067)*fe((ke-1.644)/.047),Pn=fe((Ze-.147)/.023)*fe((ke-Mt)/.017);ge.setXYZ(Ce,we+Math.sign(we)*.008*wt*je,ke,ot+je*(St+.009*wt-.008*Pn));let ai=yi(.135,.225,Ze)*(.35+.65*yi(1.53,1.7,ke)),mn=(1-.76*hn*je-.29*Kt-.54*$e*fe(mt/.006)*je)*(1-.32*ai);ee.push(mn,mn*(1-.1*wt),mn*(1-.15*wt))}de.setAttribute("color",new Ee(ee,3)),de.computeVertexNormals();let se=f.clone();se.vertexColors=!0,s.push(se);let De=await new Er().loadAsync("./assets/player-hall/character-3d/sculpt/chimp-facial-albedo-v2.webp");De.colorSpace=yt,De.anisotropy=4,a.push(De);let A=[],Se=[],Te=Ae[0].attributes.normal;for(let Ce=0;Ce<le.count;Ce+=3){let we=le.getX(Ce),ke=le.getY(Ce),ot=le.getZ(Ce);if(Math.abs(we)<.17||ke<1.28||ke>1.6||ot<-.13||Te.getX(Ce)*we<.04)continue;let Ze=.012+.019*Ci(Ce),je=.0018+.0027*Ci(Ce+1),Mt=Math.sign(we),$e=we+Mt*(.002+.006*Ci(Ce+2)),mt=ot-.01;A.push(we,ke,ot-je,we,ke,ot+je,$e,ke-Ze,mt,we,ke,ot+je,we+Mt*.0025,ke+.002,ot,$e,ke-Ze,mt);let St=.68+.32*Ci(Ce+3);for(let wt of[1,.92,.74,.92,1,.74])Se.push(.064*St*wt,.041*St*wt,.03*St*wt)}let xe=new ut;xe.setAttribute("position",new Ee(A,3)),xe.setAttribute("color",new Ee(Se,3)),xe.computeVertexNormals(),_e(xe,Y,6,"cheek-whiskers",!1),_e(Ae[0],Z(m),6,"sculpt-cranium",!1),_e(Ae[1],Z(se),6,"sculpt-facial-mask",!1)}else Ae[0].dispose(),Ae[1].dispose();for(let z=0;z<2;z++)_e(Ae[z+2],f,3,z?"sculpt-right-hand":"sculpt-left-hand",!1);if(d){for(let z of[-1,1]){let ne=new Vt(1,64,40),le=ne.attributes.position,ge=[],de=new Je("#564235"),ee=new Je("#946330"),fe=new Je("#372b20"),se=new Je("#100e0c");for(let Z=0;Z<le.count;Z++){let A=le.getX(Z),Se=le.getY(Z),Te=le.getZ(Z),xe=Math.hypot(A/.48,Se/.78),Ce=de.clone();Te>0&&(Ce.lerp(fe,1-yi(.94,1.08,xe)),Ce.lerp(ee,(1-yi(.79,.96,xe))*(.82+.12*Math.sin(27*Math.atan2(Se,A)))),Ce.lerp(se,1-yi(.39,.51,xe))),ge.push(Ce.r,Ce.g,Ce.b),le.setXYZ(Z,z*.112+A*.036,1.64+Se*.023,.287+Te*.03)}ne.setAttribute("color",new Ee(ge,3));let De=g("#ffffff",.19,0,!0);De.vertexColors=!0,De.clearcoat=1,De.clearcoatRoughness=.1,_e(ne,De,6,"eye-socket",!1),$(T,[z*.112-.005,1.647,.315],[.0027,.002,.0015],6,"eye-catchlight");for(let Z of[!0,!1]){let A=[];for(let Se=0;Se<=16;Se++){let Te=Se/16,xe=Math.PI*Te;A.push([z*(.112-.037*Math.cos(xe)),1.64+(Z?.013:-.015)*Math.sin(xe)+.002*(Te-.5),.29+.023*Math.sin(xe)])}H(A,Z?.005:.0035,v,6,"eyelid")}H([[z*.059,1.597,.31],[z*.103,1.593,.304],[z*.151,1.61,.276]],.0016,v,6,"orbital-fold"),$(x,[z*.045,1.552,.39],[.013,.008,.005],6,"nostril-cavity"),H([[z*.075,1.515,.34],[z*.116,1.49,.34],[z*.139,1.453,.323]],.0016,v,6,"muzzle-fold")}H([[-.076,1.375,.292],[0,1.362,.302],[.076,1.375,.292]],.0017,v,6,"chin-fold");for(let z of[-1,1]){let ne=[],le=[],ge=[];for(let Z=0;Z<=16;Z++)for(let A=0;A<=64;A++){let Se=Z/16,Te=A/64*Math.PI*2,xe=z*(.295+.082*Se*Math.cos(Te)),Ce=1.674+.119*Se*Math.sin(Te),we=.035+.04*Se*Se+.009*Math.cos(Te)*Se;ne.push(xe,Ce,we);let ke=new Je("#462e24").lerp(new Je("#87664d"),Se*Se);if(le.push(ke.r,ke.g,ke.b),Z<16&&A<64){let ot=Z*65+A;ge.push(ot,ot+1,ot+64+1,ot+1,ot+64+2,ot+64+1)}}let fe=new ut;fe.setAttribute("position",new Ee(ne,3)),fe.setAttribute("color",new Ee(le,3)),fe.setIndex(ge);let se=g("#ffffff",.78);se.vertexColors=!0,se.side=Ot,_e(fe,se,10,"ear-bowl");let De=[];for(let Z=0;Z<64;Z++){let A=Z/64*Math.PI*2;De.push([z*(.295+.082*Math.cos(A)),1.674+.119*Math.sin(A),.075+.009*Math.cos(A)])}H(De,.007,g("#81634d",.87),10,"ear-helix",!0),H([[z*.311,1.607,.056],[z*.332,1.649,.057],[z*.323,1.697,.057],[z*.294,1.716,.052]],.007,v,10,"ear-antihelix"),$(g("#71503d",.87),[z*.307,1.562,.047],[.035,.032,.027],10,"ear-lobe")}}C([[0,1.43,0,.12,.13],[0,1.3,0,.15,.145],[0,1.15,0,.18,.155]],m,7,"fur-neck");for(let z of[-1,1]){let ne=h?[[z*.44,1.15,-.015,.11,.13],[z*.51,1.04,-.012,.16,.155]]:l?[[z*.57,.83,-.005,.134,.132]]:[[z*.744,.07,.026,.065,.061]];(h||l)&&ne.push([z*.57,.8,-.005,.134,.132],[z*.64,.59,.01,.116,.122],[z*.675,.43,.025,.139,.132],[z*.714,.22,.035,.116,.105]),ne.push([z*.744,.015,.026,.066,.061]),C(ne,m,2,"fur-arm-"+z);let le=c?[[z*.285,-.655,-.02,.126,.125],[z*.315,-.74,-.02,.135,.13],[z*.34,-.91,-.008,.119,.112],[z*.37,-1.09,-.01,.127,.106],[z*.395,-1.34,-.015,.087,.081],[z*.41,-1.61,.01,.061,.064]]:[[z*.41,-1.52,.01,.061,.064],[z*.41,-1.61,.01,.061,.064]];C(le,m,4,"fur-leg-"+z);for(let ge=0;ge<4;ge++){let de=[-.06,-.02,.022,.06][ge],ee=[.139,.178,.167,.127][ge],fe=z*(.755+de*1.12),se=-.245-ee*.84,De=new Vt(1,20,14);De.scale(.01,.018,.0035),De.translate(fe,se,.124),_e(De,b,3,"fingernail"),H([[fe-.014,se+.049,.107],[fe,se+.051,.111],[fe+.014,se+.049,.107]],.0013,v,3,"finger-crease")}H([[z*.71,-.032,.071],[z*.75,-.039,.077],[z*.794,-.032,.068]],.0016,v,3,"wrist-fold")}let X=[],k=Ae[4].getAttribute("position");for(let z=0;z<k.count;z++)X.push(Math.abs(k.getX(z))>.49?1:0);Ae[4].setAttribute("seamRegion",new Ee(X,1));let S=R.clone(),D=new wr({depthPacking:$s});s.push(S,D);let j=z=>{z.vertexShader=`attribute float seamRegion;varying vec2 garmentHemCoords;
`+z.vertexShader,z.vertexShader=z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
garmentHemCoords=vec2(seamRegion,position.y);`),z.fragmentShader=`varying vec2 garmentHemCoords;
`+z.fragmentShader,z.fragmentShader=z.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if((garmentHemCoords.x<.5&&garmentHemCoords.y<.118)||(garmentHemCoords.x>=.5&&garmentHemCoords.y<`+(l?.798:.033).toFixed(3)+"))discard;")};S.onBeforeCompile=j,D.onBeforeCompile=j,S.customProgramCacheKey=()=>"sculpt-sewn-hem-"+(l?"tee":h?"tank":"jacket"),D.customProgramCacheKey=()=>"sculpt-sewn-depth-"+(l?"tee":h?"tank":"jacket");let V=[];for(let z=0;z<k.count;z++){let ne=k.getX(z),le=k.getY(z),ge=k.getZ(z),de=.5+.5*Math.sin(27*le+6*ne+2*Math.sin(17*ne+11*ge)),ee=Math.exp(-((le-.54)**2)/.034)*yi(.48,.68,Math.abs(ne)),fe=.89+.055*de+.13*ee;V.push(fe,fe,fe*(1+.06*ee))}Ae[4].setAttribute("color",new Ee(V,3)),S.vertexColors=!0;let me=_e(Ae[4],S,(z,ne)=>Math.abs(z)>.52&&ne>.015?2:1,"shirt-body");me.customDepthMaterial=D;for(let z of[-1,1])h||P(z*(l?.57:.744),l?.773:.014,l?.01:.026,l?.165:.08,l?.161:.076,B,2,"sewn-sleeve-hem",l?.026:.019);let ie=[];for(let z=0;z<64;z++){let ne=z/64*Math.PI*2;ie.push([.183*Math.cos(ne),1.234-.034*Math.sin(ne)**2,.132*Math.sin(ne)])}H(ie,.012,B,1,"ribbed-collar",!0),P(0,.097,.006,.415,.229,B,1,"sewn-shirt-hem",.021);function Q(z,ne,le=!0){let ge=le?-1/0:1/0;for(let de of t.children){if(!de.name.startsWith("pants-")&&de.name!=="shirt-body")continue;let ee=de.geometry.getAttribute("position"),fe=de.geometry.index.array;for(let se=0;se<fe.length;se+=3){let De=fe[se],Z=fe[se+1],A=fe[se+2],Se=ee.getX(De),Te=ee.getY(De),xe=ee.getX(Z),Ce=ee.getY(Z),we=ee.getX(A),ke=ee.getY(A),ot=(Ce-ke)*(Se-we)+(we-xe)*(Te-ke);if(Math.abs(ot)<1e-10)continue;let Ze=((Ce-ke)*(z-we)+(we-xe)*(ne-ke))/ot,je=((ke-Te)*(z-we)+(Se-we)*(ne-ke))/ot,Mt=1-Ze-je;if(Ze<-1e-4||je<-1e-4||Mt<-1e-4)continue;let $e=ee.getZ(De)*Ze+ee.getZ(Z)*je+ee.getZ(A)*Mt;(le?$e>ge:$e<ge)&&(ge=$e)}}return Number.isFinite(ge)?ge:le?.2:-.2}function Ne(z,ne,le,ge=!0,de=.0016){return H(z.map(([ee,fe])=>[ee,fe,Q(ee,fe,ge)+(ge?.0025:-.0065)]),de,ne,4,le)}_e(Ae[5],U,4,"pants-body");for(let z of[-1,1]){c?P(z*.245,-.676,-.02,.183,.174,U,4,"sewn-shorts-hem",.018):P(z*.41,-1.548,-.02,.102,.092,F,4,"sewn-pants-hem",.02),Ne([[z*.32,-.035],[z*.36,-.13],[z*.392,-.23]],F,"front-pocket");let ne=[],le=[],ge=[],de=12,ee=12;for(let De=0;De<=ee;De++)for(let Z=0;Z<=de;Z++){let A=Z/de,Se=De/ee,Te=z*.24+(A-.5)*.15,xe=-.055-Se*(.155+.022*(1-Math.abs(A-.5)*2)),Ce=Q(Te,xe,!1)-.002-.003*Math.sin(A*Math.PI)*Math.sin(Se*Math.PI);if(ne.push(Te,xe,Ce),le.push(A,Se),Z<de&&De<ee){let we=De*(de+1)+Z;ge.push(we,we+1,we+de+1,we+1,we+de+2,we+de+1)}}let fe=new ut;fe.setAttribute("position",new Ee(ne,3)),fe.setAttribute("uv",new Ee(le,2)),fe.setIndex(ge),_e(fe,U,4,"rear-pocket-patch",!1);let se=[[-.068,0],[.068,0],[.068,-.142],[0,-.163],[-.068,-.142],[-.068,0]].map(([De,Z])=>[z*.24+De,-.061+Z]);Ne(se,F,"rear-pocket-stitch",!1,.0012)}if(Ne([[0,.08],[0,-.06],[.019,-.19]],F,"fly-stitch"),!l&&!h&&!/Knit|Puffer|Hoodie/i.test(e.suit)){let z=/Bomber/i.test(e.suit),ne=z?B:g("#171b1d",.92),le=g("#303432",.84),ge=[],de=[],ee=[],fe=8,se=36;for(let Z=0;Z<=se;Z++)for(let A=0;A<=fe;A++){let Se=.2+Z/se*.96,Te=(A/fe-.5)*(z?.031:.15+.055*Z/se);if(ge.push(Te,Se,Q(Te,Se,!0)+.006),de.push(A/fe,Z/se),A<fe&&Z<se){let xe=Z*(fe+1)+A;ee.push(xe,xe+1,xe+fe+1,xe+1,xe+fe+2,xe+fe+1)}}let De=new ut;De.setAttribute("position",new Ee(ge,3)),De.setAttribute("uv",new Ee(de,2)),De.setIndex(ee),_e(De,ne,1,"jacket-inner-shirt",!1);for(let Z of[-1,1]){let A=[[Z*.092,1.16],[Z*.11,.95],[Z*.105,.6],[Z*.075,.2]].map(([Te,xe])=>[Te,xe,Q(Te,xe,!0)+.005]);H(A,.004,B,1,"jacket-front-edge");let Se=[[Z*.27,.59],[Z*.35,.44]].map(([Te,xe])=>[Te,xe,Q(Te,xe,!0)+.003]);H(Se,.003,B,1,"jacket-pocket-welt")}if(/Blazer|Dinner|Biker/i.test(e.suit)){for(let Z of[-1,1]){let A=[[Z*.1,1.19],[Z*.2,1.02],[Z*.105,.77],[Z*.067,1.02]],Se=A.flatMap(([xe,Ce])=>[xe,Ce,Q(xe,Ce,!0)+.012]),Te=new ut;Te.setAttribute("position",new Ee(Se,3)),Te.setIndex([0,1,2,0,2,3]),Te.computeVertexNormals(),_e(Te,R,1,"folded-lapel",!1),H(A.map(([xe,Ce])=>[xe,Ce,Q(xe,Ce,!0)+.014]),.0014,B,1,"lapel-stitch")}for(let Z of[.48,.31]){let A=new it(.009,.009,.006,20);A.rotateX(Math.PI/2),A.translate(.1,Z,Q(.1,Z,!0)+.008),_e(A,re,1,"jacket-button",!1)}}else{if(["classic","ruby","midnight"].includes(e.suit))for(let Z of[-1,1])H([[Z*.53,1.04,.16],[Z*.6,.8,.15],[Z*.65,.56,.14],[Z*.7,.28,.12]],.008,q,2,"racing-sleeve-piping");for(let Z=.22;Z<1.15;Z+=.026){let A=z?0:.08,Se=new at(z?.015:.008,.008,.005);Se.translate(A,Z,Q(A,Z,!0)+.011),_e(Se,re,1,"zipper-tooth",!1)}if(z){for(let A of[-1,1]){let Se=[[.16,1.16],[.25,1.1],[.35,1.01],[.42,.91]].map(([Te,xe])=>[A*Te,xe,Q(A*Te,xe,!0)+.004]);H(Se,.0035,B,1,"raglan-seam")}let Z=new Ft(.155,.023,12,64);Z.rotateX(Math.PI/2),Z.scale(1.16,1,.88),Z.translate(0,1.218,.004),_e(Z,B,1,"bomber-collar")}if(["classic","ruby","midnight"].includes(e.suit))for(let Z=0;Z<3;Z++)for(let A=0;A<4;A++){let Se=-.32+A*.033,Te=.92+Z*.033,xe=new Yt(.032,.032);xe.translate(Se,Te,Q(Se,Te,!0)+.004),_e(xe,(Z+A)%2?ne:q,1,"club-checker-patch",!1)}}}if(/Hoodie/i.test(e.suit)){let z=new Vt(1,48,32,0,Math.PI*2,0,Math.PI*.68);z.scale(.24,.24,.16),z.rotateX(Math.PI/2),z.translate(0,1.08,-.2);let ne=R.clone();ne.side=Ot,s.push(ne),_e(z,ne,1,"folded-hood");for(let le of[-1,1])H([[le*.1,1.17,.16],[le*.09,1.04,.23],[le*.11,.88,.235]],.0035,q,1,"hood-drawstring")}if(/Puffer/i.test(e.suit))for(let z=.26;z<1.17;z+=.14){let ne=[];for(let ge=0;ge<=24;ge++){let de=-.37+ge*.74/24;ne.push([de,z,Q(de,z,!0)+.004])}let le=new It(new At(ne.map(ge=>new w(...ge))),32,.004,6,!1);_e(le,B,1,"quilted-puffer-seam",!1)}if(e.necklace&&e.necklace!=="none"){let z=g(r.item("necklace",e.necklace).color,.26,.88),ne=new At([[-.16,1.24,.04],[-.16,1.14,.2],[-.13,.93,.26],[0,.82,.275],[.13,.93,.26],[.16,1.14,.2],[.16,1.24,.04],[0,1.25,-.145]].map(fe=>new w(...fe)),!0),le=[],ge=[],de=[];for(let fe=0;fe<56;fe++){let se=fe/56,De=ne.getPointAt(se),Z=ne.getTangentAt(se).normalize(),A=new w(De.x,0,De.z).normalize(),Se=new w().crossVectors(A,Z).normalize();A.crossVectors(Z,Se).normalize();let Te=new ct().makeBasis(Z,Se,A),xe=new Cn().setFromRotationMatrix(Te);fe%2&&xe.multiply(new Cn().setFromAxisAngle(new w(1,0,0),Math.PI/2));let Ce=/Beads|pearl/.test(e.necklace),we=Ce?new Vt(.01,12,8):new Ft(.0105,.003,6,12);Ce||we.scale(1.2,.8,1),we.applyQuaternion(xe),we.translate(De.x,De.y,De.z);let ke=we.getAttribute("position"),ot=we.getAttribute("normal"),Ze=le.length/3;le.push(...ke.array),ge.push(...ot.array),de.push(...Array.from(we.index.array,je=>je+Ze)),we.dispose()}let ee=new ut;if(ee.setAttribute("position",new Ee(le,3)),ee.setAttribute("normal",new Ee(ge,3)),ee.setIndex(de),_e(ee,z,1,"interlocked-necklace-links"),!["silverChain","goldChain","blackBeads","pearl"].includes(e.necklace)){let fe=e.necklace,se=new Xt,De=fe==="nicknameBling",Z=De?.11:.045,A=De?.032:.055;fe==="spadeDiamond"?(se.moveTo(0,A),se.bezierCurveTo(-.016,.028,-.069,0,-.041,-.026),se.quadraticCurveTo(-.016,-.04,0,-.018),se.quadraticCurveTo(.016,-.04,.041,-.026),se.bezierCurveTo(.069,0,.016,.028,0,A),se.lineTo(.016,-A),se.lineTo(-.016,-A),se.closePath()):fe==="crownPendant"?(se.moveTo(-Z,-A),se.lineTo(Z,-A),se.lineTo(Z,A*.55),se.lineTo(Z*.48,0),se.lineTo(0,A),se.lineTo(-Z*.48,0),se.lineTo(-Z,A*.55),se.closePath()):(se.moveTo(-Z,-A),se.lineTo(Z,-A),se.lineTo(Z,A),se.lineTo(-Z,A),se.closePath());let Se=new Ht(se,{depth:.008,bevelEnabled:!0,bevelSize:.003,bevelThickness:.002,bevelSegments:3});if(Se.translate(0,.755,.279),_e(Se,z,1,"necklace-pendant:"+fe),["silverTag","acesPendant","poker21Pendant","nicknameBling"].includes(fe)){let Te=document.createElement("canvas");Te.width=512,Te.height=192;let xe=Te.getContext("2d");xe.clearRect(0,0,512,192),xe.fillStyle="#f7e7b5",xe.font="bold 100px Arial",xe.textAlign="center",xe.textBaseline="middle",xe.fillText(fe==="nicknameBling"?e.patchText||"POKER21":fe==="acesPendant"?"A\u2660 A\u2665":fe==="silverTag"?"\u2660":"P21",256,100,480);let Ce=new Wt(Te);Ce.colorSpace=yt,a.push(Ce);let we=new Pt({map:Ce,transparent:!0,alphaTest:.1,roughness:.32,metalness:.3});s.push(we);let ke=new Yt(Z*1.85,A*1.7);ke.translate(0,.755,.291),_e(ke,we,1,"pendant-engraving:"+fe)}}}if(ce&&!c){let fe=function(se,De,Z){let A=Z>0?-1/0:1/0;for(let Se=0;Se<ee.length;Se+=3){let Te=ee[Se],xe=ee[Se+1],Ce=ee[Se+2],we=de.getY(Te),ke=de.getZ(Te),ot=de.getY(xe),Ze=de.getZ(xe),je=de.getY(Ce),Mt=de.getZ(Ce),$e=(Ze-Mt)*(we-je)+(je-ot)*(ke-Mt);if(Math.abs($e)<1e-10)continue;let mt=((Ze-Mt)*(se-je)+(je-ot)*(De-Mt))/$e,St=((Mt-ke)*(se-je)+(we-je)*(De-Mt))/$e,wt=1-mt-St;if(mt<-1e-4||St<-1e-4||wt<-1e-4)continue;let hn=de.getX(Te)*mt+de.getX(xe)*St+de.getX(Ce)*wt;(Z>0?hn>A:hn<A)&&(A=hn)}return Number.isFinite(A)?A:Z*.42},z=g("#ffffff",.93);z.vertexColors=!0;let ne=new Je(r.item("pants",e.pants).color),le=new Je("#e5e1d7"),ge=t.children.find(se=>se.name==="pants-body"),de=ge.geometry.getAttribute("position"),ee=ge.geometry.index.array;for(let se of[-1,1]){let De=[],Z=[],A=[];for(let Ce=0;Ce<=64;Ce++)for(let we=0;we<=6;we++){let ke=we/6*2-1,ot=.05-Ce/64*1.58,Ze=-.02+ke*.041,je=fe(ot,Ze,se)+se*.0025,Mt=Math.abs(ke)<.5?ne:le;if(De.push(je,ot,Ze),Z.push(Mt.r,Mt.g,Mt.b),Ce<64&&we<6){let $e=Ce*7+we;A.push($e,$e+1,$e+6+1,$e+1,$e+6+2,$e+6+1)}}let xe=new ut;xe.setAttribute("position",new Ee(De,3)),xe.setAttribute("color",new Ee(Z,3)),xe.setIndex(A),xe.computeVertexNormals(),z.side=Ot,_e(xe,z,4,"club-pants-side-stripe",!1)}}if(/Cargo/i.test(e.pants))for(let z of[-1,1]){let ne=z*.3,le=-.43,ge=Q(ne,le,!0)+.023,de=new at(.15,.19,.035);de.translate(ne,le,ge),_e(de,U,4,"cargo-thigh-pocket",!1);let ee=new at(.17,.045,.015);ee.translate(ne,le+.08,ge+.024),_e(ee,F,4,"cargo-pocket-flap",!1)}if(e.patch&&e.patch!=="none"){let z=new Wt(r.patchCanvas(e));z.colorSpace=yt,a.push(z);let ne=new Pt({map:z,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(ne);let le=[],ge=[],de=[],ee=12,fe=6;for(let De=0;De<=fe;De++)for(let Z=0;Z<=ee;Z++){let A=-.285+Z/ee*.235,Se=.91-De/fe*.088;if(le.push(A,Se,Q(A,Se,!0)+.004),ge.push(Z/ee,1-De/fe),Z<ee&&De<fe){let Te=De*(ee+1)+Z;de.push(Te,Te+ee+1,Te+1,Te+1,Te+ee+1,Te+ee+2)}}let se=new ut;se.setAttribute("position",new Ee(le,3)),se.setAttribute("uv",new Ee(ge,2)),se.setIndex(de),se.computeVertexNormals(),_e(se,ne,1,"sewn-word-patch",!1)}for(let z of[-1,1]){let fe=function(Z,A,Se){let Te=[],xe=[],Ce=[];for(let ot=0;ot<Z.length;ot++){let[Ze,je,Mt,$e]=Z[ot];for(let mt=0;mt<=48;mt++){let St=mt/48*Math.PI*2;if(Te.push(de+je*Math.cos(St),Se==="leather-sneaker"?Mt+($e-Mt)*Math.max(0,Math.sin(St)):(Mt+$e)/2+($e-Mt)/2*Math.sin(St),Ze),xe.push(mt/48,ot/(Z.length-1)),ot<Z.length-1&&mt<48){let wt=ot*49+mt;Ce.push(wt,wt+1,wt+48+1,wt+1,wt+48+2,wt+48+1)}}}for(let ot of[0,Z.length-1]){let[Ze,,je,Mt]=Z[ot],$e=ot*49,mt=Te.length/3;Te.push(de,(je+Mt)/2,Ze),xe.push(.5,ot/(Z.length-1));for(let St=0;St<48;St++)Ce.push(mt,$e+(ot===0?St+1:St),$e+(ot===0?St:St+1))}let ke=new ut;return ke.setAttribute("position",new Ee(Te,3)),ke.setAttribute("uv",new Ee(xe,2)),ke.setIndex(Ce),ke.computeVertexNormals(),_e(ke,A,5,Se,!1)},se=function(Z,A=0){let Se=0;for(;Se<ee.length-2&&ee[Se+1][0]<Z;)Se++;let Te=ee[Se],xe=ee[Se+1],Ce=Math.max(0,Math.min(1,(Z-Te[0])/(xe[0]-Te[0]))),we=Te[1]+(xe[1]-Te[1])*Ce,ke=Te[2]+(xe[2]-Te[2])*Ce,ot=Te[3]+(xe[3]-Te[3])*Ce;return ke+(ot-ke)*Math.sqrt(Math.max(0,1-(A/we)**2))},ne=/Chelsea|combat|desert|hiking|canvasHigh/i.test(e.shoes),le=/Oxford|Loafer|Brogue/i.test(e.shoes),ge=/Chelsea|Loafer/i.test(e.shoes),de=z*.41,ee=[[-.115,.06,-1.8,-1.61],[-.09,.112,-1.815,-1.54],[-.035,.132,-1.815,-1.53],[.04,.138,-1.815,-1.56],[.115,.145,-1.815,-1.615],[.2,.152,-1.815,-1.665],[.28,.156,-1.815,-1.686],[.36,.149,-1.815,-1.699],[.415,.115,-1.81,-1.72],[.443,.058,-1.8,-1.755],[.448,.004,-1.785,-1.78]];if(ne)for(let Z of ee)Z[0]<.06&&(Z[3]+=.19*(1-Math.max(0,Z[0])/.12));le&&(q.color.set("#302923"),W.color.set("#1b1918")),fe(ee,I,"leather-sneaker"),fe([[-.124,.065,-1.848,-1.805],[-.1,.124,-1.853,-1.798],[-.02,.145,-1.855,-1.798],[.16,.158,-1.855,-1.798],[.32,.164,-1.855,-1.798],[.4,.137,-1.85,-1.798],[.445,.078,-1.835,-1.805],[.459,.004,-1.822,-1.817]],q,"rubber-midsole"),fe([[-.122,.065,-1.865,-1.845],[-.09,.124,-1.87,-1.846],[.02,.145,-1.87,-1.846],[.2,.156,-1.87,-1.846],[.34,.158,-1.867,-1.846],[.42,.125,-1.856,-1.841],[.453,.055,-1.837,-1.824],[.458,.003,-1.826,-1.821]],W,"outsole");for(let Z of[-1,1]){H([[de+Z*.098,-1.558,-.045],[de+Z*.135,-1.63,.08],[de+Z*.154,-1.735,.275],[de+Z*.125,-1.765,.392]],.003,L,5,"quarter-panel-seam"),H([[de+Z*.093,-1.579,-.04],[de+Z*.131,-1.65,.1],[de+Z*.148,-1.752,.275]],.0013,q,5,"quarter-stitch");for(let A=0;A<(ge?0:6);A++){let Se=.06+A*.042,Te=se(Se,.06)+.002,xe=new Ft(.0055,.0018,6,12);xe.rotateX(-.95),xe.translate(de+Z*.06,Te,Se),_e(xe,L,5,"lace-eyelet",!1)}}for(let Z=0;Z<(ge?0:6);Z++){let A=.062+Z*.042;H([[de-.06,se(A,.06)+.004,A],[de,se(A+.009)+.005,A+.009],[de+.06,se(A,.06)+.004,A]],.0032,q,5,"woven-lace"),H([[de+.06,se(A+.004,.06)+.005,A+.004],[de,se(A+.012)+.006,A+.012],[de-.06,se(A+.004,.06)+.005,A+.004]],.0032,q,5,"woven-lace-cross")}ge&&H([[de-.1,se(.14,.1)+.006,.14],[de,se(.14)+.009,.14],[de+.1,se(.14,.1)+.006,.14]],.008,L,5,"slip-on-vamp-band"),H([[de-.108,-1.777,.29],[de-.12,-1.762,.36],[de,-1.749,.421],[de+.12,-1.762,.36],[de+.108,-1.777,.29]],.0018,q,5,"toe-stitch");let De=new at(.065,.1,.018);De.translate(de,-1.6,-.107),_e(De,L,5,"heel-pull-tab",!1);for(let Z=0;Z<12;Z++)for(let A of[-1,1])H([[de+A*.15,-1.827,.02+Z*.027],[de+A*.15,-1.842,.02+Z*.027]],.0013,W,5,"sole-groove")}function qe(z,ne,le,ge,de=.024){let ee=z.geometry.getAttribute("position"),fe=z.geometry.getAttribute("normal"),se=[],De=[],Z=[];for(let Te=0;Te<ne;Te++){let xe=Math.floor(Ci(Te+le*521)*ee.count),Ce=new w().fromBufferAttribute(ee,xe),we=new w().fromBufferAttribute(fe,xe);if(ge&&!ge(Ce,we))continue;let ke=new w(.08*Math.sin(Te*2.1),-1,.1*Math.cos(Te*1.3));ke.addScaledVector(we,-ke.dot(we)).normalize();let ot=new w().crossVectors(we,ke).normalize(),Ze=de*(.65+Ci(Te*2.7)*.75),je=35e-5+Ci(Te*3.1)*4e-4,Mt=se.length/3,$e=Ce.y<1.53&&le===6?Ci(Te*2.2)>.5:!1,mt=new Je($e?"#5d554b":"#362b23").multiplyScalar(.75+Ci(Te*8.7)*.35);for(let St=0;St<4;St++){let wt=St/3,hn=Ce.clone().addScaledVector(we,.001+Ze*.3*Math.sin(wt*Math.PI/2)).addScaledVector(ke,Ze*wt);for(let Kt of[-1,1]){let Pn=hn.clone().addScaledVector(ot,Kt*je*(1-wt*.92));se.push(Pn.x,Pn.y,Pn.z),De.push(mt.r,mt.g,mt.b)}if(St<3){let Kt=Mt+St*2;Z.push(Kt,Kt+1,Kt+2,Kt+1,Kt+3,Kt+2)}}}if(!se.length)return;let A=new ut;A.setAttribute("position",new Ee(se,3)),A.setAttribute("color",new Ee(De,3)),A.setIndex(Z),A.computeVertexNormals();let Se=_e(A,Y,le,"individual-fur-strands",!1);Se.castShadow=!1}if(d){let z=t.children.find(ne=>ne.name==="sculpt-cranium");qe(z,3800,6,(ne,le)=>!(ne.z>.12&&ne.y>1.33&&ne.y<1.78&&Math.abs(ne.x)<.235)&&(!e.hair||e.hair==="hairNatural"||ne.y<1.76),.027)}let Be=t.children.filter(z=>z.name.startsWith("fur-arm-")||z.name.startsWith("fur-leg-"));for(let z of Be){let ne=z.name.startsWith("fur-arm");qe(z,1800,ne?2:4,le=>ne?le.y<(h?1.1:l?.8:.015):c&&le.y<-.68,.021)}if(l||h){let z={...e,hair:"hairNatural",glasses:"none",watch:"none",ring:"none",necklace:"none",body:"bodyNormal",helmet:"none",hat:"none",patch:"none"};await r.loadWardrobe(z);let ne=new Image;ne.src="./assets/player-hall/standing-monkey-v1.webp",await ne.decode();let le=r.renderCharacter(ne,z),ge=document.createElement("canvas");ge.width=1024,ge.height=1536;let de=ge.getContext("2d",{willReadFrequently:!0});de.drawImage(le,0,1536-le.height);let ee=de.getImageData(0,0,1024,1536);for(let we=0;we<1536;we++)for(let ke=0;ke<1024;ke++){let ot=(we*1024+ke)*4,Ze=ee.data[ot]/255,je=ee.data[ot+1]/255,Mt=ee.data[ot+2]/255,$e=(Ze+je+Mt)/3,mt=Math.max(yi(.23,.5,$e),yi(.15,.3,Ze)*yi(.02,.12,Ze-je));ee.data[ot+3]*=ke>340&&ke<684&&we>315&&we<663?mt:0}de.putImageData(ee,0,0);let fe=new Wt(ge);fe.colorSpace=yt,fe.anisotropy=4,a.push(fe);let se=new Pt({map:fe,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:.96,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(se);let De=t.children.find(we=>we.name==="shirt-body"),Z=De.geometry.clone(),A=Z.getAttribute("position"),Se=Z.getAttribute("normal"),Te=[],xe=[];for(let we=0;we<A.count;we++)Te.push(.5+A.getX(we)/2.55,.5+A.getY(we)/3.825),A.setXYZ(we,A.getX(we)+Se.getX(we)*.001,A.getY(we)+Se.getY(we)*.001,A.getZ(we)+Se.getZ(we)*.001);let Ce=Z.index.array;for(let we=0;we<Ce.length;we+=3)Ce.slice(we,we+3).every(ke=>A.getZ(ke)>.03)&&xe.push(...Ce.slice(we,we+3));Z.setAttribute("uv",new Ee(Te,2)),Z.setIndex(xe),_e(Z,se,1,"screen-printed-shirt",!1)}if(u){for(let De of[...t.children])De.name.startsWith("ear-")&&De.removeFromParent();let z=g(r.item("helmet",e.helmet).color,.25,.45,!0);z.clearcoat=.7,z.clearcoatRoughness=.16;let ne=g("#152731",.1,.55,!0);ne.clearcoat=1,ne.transparent=!0,ne.opacity=.91,ne.side=Ot,_e(Ae[6],z,6,"helmet-shell",!1),H([[-.28,1.43,.16],[-.2,1.39,.3],[0,1.36,.36],[.2,1.39,.3],[.28,1.43,.16]],.03,z,6,"helmet-chin-bar");let le=[],ge=[],de=[],ee=48,fe=20;for(let De=0;De<=fe;De++)for(let Z=0;Z<=ee;Z++){let A=(Z/ee-.5)*1.9,Se=(De/fe-.5)*2.4,Te=new w(.35*Math.sin(A),1.665+.26*Math.sin(Se),.2+.19*Math.cos(A)*Math.cos(Se));if(e.visor==="open"&&Te.sub(new w(0,1.84,.13)).applyAxisAngle(new w(1,0,0),-1.1).add(new w(0,1.84,.13)),le.push(Te.x,Te.y,Te.z),ge.push(Z/ee,De/fe),Z<ee&&De<fe){let xe=De*(ee+1)+Z;de.push(xe,xe+1,xe+ee+1,xe+1,xe+ee+2,xe+ee+1)}}let se=new ut;se.setAttribute("position",new Ee(le,3)),se.setAttribute("uv",new Ee(ge,2)),se.setIndex(de),se.computeVertexNormals(),_e(se,ne,6,"hinged-helmet-visor",!1);for(let De of[-1,1]){let Z=new it(.027,.027,.012,32);Z.rotateZ(Math.PI/2),Z.translate(De*.327,1.73,.035),_e(Z,re,6,"visor-hinge",!1);for(let A=0;A<4;A++)$(_,[De*.322,1.48+A*.022,-.02],[.007,.006,.036],6,"helmet-vent")}H([[0,1.9,-.2],[0,2.007,-.05],[0,1.995,.15],[0,1.91,.245]],.015,re,6,"helmet-racing-stripe")}let tt=$p(n,e,r),ft=tf(n,{...e,sculptHairOffset:.025,sculptHairDepth:-.075,sculptHairTexture:ze}),gt=nf(n,{...e,helmet:d?"none":e.helmet,sculptEyewearDepth:-.025},r),Et=e.watch&&e.watch!=="none"?rf(e.watch,r.item("watch",e.watch).color):null;Et&&(t.add(Et.group),n.attach(Et.group,"rightWrist"));let bt=e.ring&&e.ring!=="none"?sf(r.item("ring",e.ring).color,e.ring):null;return bt&&(t.add(bt.group),n.attach(bt.group,"rightHand")),n.setRelaxedPose(!0),{root:t,rig:n,geometries:i,materials:s,textures:a,dispose(){tt.dispose(),ft.dispose(),gt.dispose(),Et?.dispose(),bt?.dispose(),i.forEach(z=>z.dispose()),s.forEach(z=>z.dispose()),a.forEach(z=>z.dispose()),n.dispose()}}}async function of(r,e,t={}){let n=await af(window.PokerGarage,e),{root:i,rig:s}=n,a=new zn;a.add(i);{a.add(new ri("#fff0d4","#283849",2.1));let Y=new kn("#fff0dc",3.5);Y.position.set(-2,4,5),a.add(Y);let he=new kn("#9cc3ed",1.2);he.position.set(3,1,-2),a.add(he)}let o=new gi({alpha:!0,antialias:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.outputColorSpace=yt,o.toneMapping=pi,o.toneMappingExposure=1.05;let c=null;if(o.shadowMap){o.shadowMap.enabled=!0,o.shadowMap.type=Xs;let Y=a.children.find(Pe=>Pe.isDirectionalLight);Y.castShadow=!0,Y.shadow.mapSize.set(1024,1024),Y.shadow.normalBias=.012,Y.shadow.bias=-15e-5,Y.shadow.camera.left=-2,Y.shadow.camera.right=2,Y.shadow.camera.top=2.2,Y.shadow.camera.bottom=-2.2;let he=new ht(new Yt(8,8),new Jr({opacity:.2}));he.rotation.x=-Math.PI/2,he.position.y=-1.875,he.receiveShadow=!0,a.add(he),n.geometries.push(he.geometry),n.materials.push(he.material);let Ae=new zn;Ae.background=new Je("#333842");for(let[Pe,We,Le,_e,$,H]of[[0,4,0,5,.1,3],[-3,2,2,.1,3,2],[3,1,-2,.1,2,3]]){let Ie=new ht(new at(_e,$,H),new yn({color:"#ffffff"}));Ie.position.set(Pe,We,Le),Ae.add(Ie)}let ze=new Ir(o);c=ze.fromScene(Ae,.05),a.environment=c.texture,a.environmentIntensity=.55,ze.dispose(),Ae.traverse(Pe=>{Pe.geometry?.dispose(),Pe.material?.dispose()})}r.append(o.domElement),o.domElement.setAttribute("role","img"),o.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let l=new rn(30,1,.1,30);l.position.set(0,0,9);let h=t.yaw||0,u=t.pitch||0,d=null,p,g=!1,m=!1,f=0,v=window.matchMedia?.("(prefers-reduced-motion: reduce)"),y="full",_=t.focusOrbit||null,x=2.05,T=0,b=0;function R(Y){Y=["watch","ring"].includes(Y)?Y:"full",Y!==y&&(Y!=="full"?(_=_||{yaw:h,pitch:u},t.focusOrbit=_,h=0,u=0):_&&(h=_.yaw,u=_.pitch,_=null,delete t.focusOrbit),t.yaw=h,t.pitch=u,y=Y,r.dataset.focus=y)}function B(Y){let he=r.clientWidth/Math.max(1,r.clientHeight),Ae=y!=="full",ze=y==="ring",Pe=Ae?Math.max(ze?.25:.4,(ze?.18:.3)/he):Math.max(2.4,1.17/he),We=Ae?.76*Math.cos(h)+.1*Math.sin(h):0,Le=Ae?(ze?-.27:.04)*Math.cos(u)-(.1*Math.cos(h)-.76*Math.sin(h))*Math.sin(u):-.22,_e=1-Math.exp(-Y*12);x+=(Pe-x)*_e,T+=(We-T)*_e,b+=(Le-b)*_e,l.aspect=he;let $=x/Math.tan(l.fov*Math.PI/360);l.position.set(T,b+x*.16,$),l.lookAt(T,b,0),l.updateProjectionMatrix()}let U=()=>{!r.clientWidth||!r.clientHeight||(B(1),o.setSize(r.clientWidth,r.clientHeight,!1))},F=new ResizeObserver(U);F.observe(r),U();let I=Y=>{m=!1,d={id:Y.pointerId,x:Y.clientX,y:Y.clientY},r.setPointerCapture(Y.pointerId),Y.preventDefault()},L=Y=>{!d||d.id!==Y.pointerId||(h+=(Y.clientX-d.x)*.012,u=Math.max(-.35,Math.min(.35,u+(Y.clientY-d.y)*.006)),d.x=Y.clientX,d.y=Y.clientY)},q=()=>{d=null},W=Y=>{["ArrowLeft","ArrowRight"].includes(Y.key)&&(h+=Y.key==="ArrowLeft"?-.15:.15,Y.preventDefault())};r.addEventListener("pointerdown",I),r.addEventListener("pointermove",L),r.addEventListener("pointerup",q),r.addEventListener("pointercancel",q),r.addEventListener("keydown",W);function re(Y=0){if(g)return;if(!r.isConnected){ce();return}m&&!d&&f&&(h+=Math.min(.05,(Y-f)/1e3)*.35);let he=!v?.matches&&!d&&y==="full"?1:0,Ae=f?Math.min(.05,(Y-f)/1e3):.016;s.update(Y/1e3,he,Ae),B(Ae),f=Y,i.rotation.set(u,h,0),t.yaw=h,t.pitch=u,r.dataset.yaw=String(h),o.render(a,l),t.snapshotOnly||(p=requestAnimationFrame(re))}return re(),{state:t,setFocus:R,snapshot(){B(1),i.rotation.set(u,h,0),o.render(a,l);let Y=document.createElement("canvas");return Y.width=o.domElement.width,Y.height=o.domElement.height,Y.getContext("2d").drawImage(o.domElement,0,0),Y},setYaw(Y){h=Y,t.snapshotOnly&&(B(1),re())},setAutoRotate(Y){m=!!Y},dispose:ce};function ce(){if(!g){g=!0,cancelAnimationFrame(p),F.disconnect();for(let[Y,he]of[["pointerdown",I],["pointermove",L],["pointerup",q],["pointercancel",q],["keydown",W]])r.removeEventListener(Y,he);n.dispose(),c?.dispose(),o.dispose(),o.forceContextLoss(),o.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new zn,s=new Ge;i.add(s);let a=new gi({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=yt,a.toneMapping=pi,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new rn(34,1,.1,40);i.add(new ri("#dcecff","#50402b",2));for(let[H,Ie,P,C]of[[3,6,5,4],[-3,3,-3,3]]){let X=new kn("#fff0dd",C);X.position.set(H,Ie,P),i.add(X)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let H=0;H<128;H+=2)l.fillStyle=H%4?"#808080":"#b0b0b0",l.fillRect(0,H,128,1);for(let H=0;H<128;H+=3)l.fillStyle="#888888",l.fillRect(H,0,1,128);let h=new Wt(c);h.wrapS=h.wrapT=vn,h.repeat.set(8,8);let u=(H,Ie=0,P=.7)=>new Pt({color:H,metalness:Ie,roughness:P}),d=u("#32251d"),p=u("#96715a"),g=u("#11161b"),m=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),v=u("#a22c3b"),y=u("#171b20"),_=u("#171b20"),x=u("#826222",.9,.18);for(let H of[v,y,g])H.bumpMap=h,H.bumpScale=.012;function T(H,Ie,P,C,X,k,S,D=s){let j=new ht(new Vt(1,40,28),H);return j.position.set(Ie,P,C),j.scale.set(X,k,S),D.add(j),j}function b(H,Ie,P,C,X=C){let k=new w(...Ie),S=new w(...P),D=S.clone().sub(k),j=new ht(C>.1?new zs((C+X)/2,Math.max(.01,D.length()-(C+X)),10,32):new it(X,C,D.length(),16),H);return j.position.copy(k.add(S).multiplyScalar(.5)),j.quaternion.setFromUnitVectors(new w(0,1,0),D.normalize()),s.add(j),j}T(y,0,1.64,0,.47,.36,.26),T(v,0,2.32,0,.59,.65,.32),T(g,0,2.35,.29,.27,.49,.055);for(let H of[-1,1]){b(y,[H*.27,1.67,0],[H*.29,.92,.015],.23,.25),T(y,H*.29,.92,.015,.23,.24,.24),b(y,[H*.29,.94,.015],[H*.32,.28,0],.16,.22),b(m,[H*.45,1.55,.03],[H*.48,.36,.03],.025,.032),T(_,H*.32,.18,.15,.22,.19,.39),T(m,H*.32,.075,.15,.235,.065,.4),T(m,H*.32,.27,.12,.135,.08,.2);for(let Ie=0;Ie<5;Ie++)b(m,[H*.32-.1,.29,.08+Ie*.04],[H*.32+.1,.29,.08+Ie*.04],.009);T(v,H*.55,2.63,0,.26,.27,.29),b(v,[H*.57,2.63,0],[H*.76,2.12,.02],.19,.23),T(v,H*.76,2.12,.02,.19,.2,.2),b(v,[H*.76,2.12,.02],[H*.88,1.65,.08],.13,.18),b(m,[H*.71,2.6,.15],[H*.99,1.72,.15],.035),T(g,H*.88,1.67,.08,.145,.09,.15),T(d,H*.89,1.48,.1,.16,.22,.12);for(let Ie=0;Ie<4;Ie++)T(p,H*(.79+Ie*.065),1.36,.15,.035,.13,.045);T(p,H*.75,1.48,.2,.06,.12,.06)}T(d,0,3.04,0,.25,.27,.24),T(d,0,3.39,0,.36,.43,.31);for(let H of[-1,1])T(p,H*.36,3.4,.01,.12,.17,.09),T(d,H*.36,3.4,.065,.065,.1,.035),T(p,H*.15,3.43,.258,.15,.12,.075),T(g,H*.14,3.44,.32,.045,.035,.02),T(m,H*.13,3.45,.335,.009,.01,.006),T(d,H*.15,3.53,.28,.18,.05,.07);T(p,0,3.23,.27,.26,.18,.13),T(p,0,3.34,.34,.14,.08,.08),T(g,0,3.17,.375,.17,.017,.018),T(p,0,3.13,.36,.17,.035,.025);let R=new Ge;s.add(R),T(g,0,3.51,-.02,.41,.42,.35,R),T(f,0,3.64,.015,.07,.3,.36,R);for(let H of[-1,1])T(g,H*.32,3.29,.015,.1,.31,.24,R),T(f,H*.39,3.43,.07,.025,.05,.05,R);let B=T(x,0,3.44,.27,.38,.19,.14,R);for(let H of[-1,1])b(g,[H*.28,2.88,.25],[H*.1,2.58,.33],.035),b(g,[H*.3,2.28,.3],[H*.39,2.09,.26],.018);for(let H=0;H<6;H++)T(f,0,2.03+H*.14,.35,.015,.015,.01);let U=document.createElement("canvas");U.width=512,U.height=256;let F=U.getContext("2d"),I=new Wt(U);I.colorSpace=yt;let L=new ht(new Yt(.28,.12),new Pt({map:I,roughness:.9}));L.position.set(-.27,2.46,.317),s.add(L);let q=new Ge;for(let H=0;H<3;H++)for(let Ie=0;Ie<5;Ie++){let P=new ht(new Yt(.048,.048),(Ie+H)%2?g:m);P.position.set(-.36+Ie*.048,2.62+H*.048,.318),q.add(P)}s.add(q);function W(H){v.color.set(n.item("suit",H.suit).color),y.color.set(n.item("pants",H.pants).color),_.color.set(n.item("shoes",H.shoes).color),R.visible=H.helmet!=="none",B.position.y=H.visor==="open"?3.71:3.44,B.rotation.x=H.visor==="open"?-.8:0,L.visible=H.patch!=="none",F.fillStyle="#22282b",F.fillRect(0,0,512,256),F.strokeStyle="#c9af74",F.lineWidth=12,F.strokeRect(8,8,496,240),F.fillStyle="#eee0b5",F.font="bold 72px Arial",F.textAlign="center",F.fillText(H.patch==="name"?H.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":H.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),I.needsUpdate=!0}W(e),t.yaw??=0,t.pitch??=.07;let re=null,ce,Y=!1;function he(){let H=r.clientWidth,Ie=r.clientHeight;!H||!Ie||(a.setSize(H,Ie,!1),o.aspect=H/Ie,o.updateProjectionMatrix())}let Ae=new ResizeObserver(he);Ae.observe(r),he();let ze=H=>{re={id:H.pointerId,x:H.clientX,y:H.clientY},r.setPointerCapture(H.pointerId),H.preventDefault()},Pe=H=>{!re||re.id!==H.pointerId||(t.yaw-=(H.clientX-re.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(H.clientY-re.y)*.006)),re.x=H.clientX,re.y=H.clientY)},We=()=>{re=null},Le=H=>{(H.key==="ArrowLeft"||H.key==="ArrowRight")&&(t.yaw+=H.key==="ArrowLeft"?.15:-.15,H.preventDefault())};r.addEventListener("pointerdown",ze),r.addEventListener("pointermove",Pe),r.addEventListener("pointerup",We),r.addEventListener("pointercancel",We),r.addEventListener("keydown",Le);function _e(){if(Y)return;Y=!0,cancelAnimationFrame(ce),Ae.disconnect();for(let[Ie,P]of[["pointerdown",ze],["pointermove",Pe],["pointerup",We],["pointercancel",We],["keydown",Le]])r.removeEventListener(Ie,P);let H=new Set;i.traverse(Ie=>{Ie.geometry?.dispose(),Ie.material&&H.add(Ie.material)});for(let Ie of H)Ie.dispose();I.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function $(){if(Y)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){_e();return}let H=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*H,1.95+Math.sin(t.pitch)*H,Math.cos(t.yaw)*Math.cos(t.pitch)*H),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ce=requestAnimationFrame($)}return $(),{update:W,dispose:_e,state:t}};function fu(r){let e=new Ge;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(U,F,I)=>new Zt({color:U,metalness:F,roughness:I,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(U,F,I=0,L=0,q=0)=>{let W=new ht(U,F);return W.position.set(I,L,q),W.castShadow=W.receiveShadow=!0,e.add(W),W},h=(U,F,I,L=!0)=>{let q=new Gn;return q.absarc(F,I,U,0,Math.PI*2,L),q},u=t?.395:.437,d=new Xt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let U=0;U<24;U++)for(let[F,I]of[[.28,0],[.36,.045]]){let L=U*Math.PI/12+I;d.holes.push(h(n?.009:.011,Math.cos(L)*F,Math.sin(L)*F))}for(let U of[0,.033])l(new Ht(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,U);let p=new at(.22,.014,.025),g=new qr(p,a,32),m=new ct;for(let U=0;U<32;U++){let F=U*Math.PI/16;m.compose(new w(Math.cos(F)*.31,Math.sin(F)*.31,.021),new Cn().setFromAxisAngle(new w(0,0,1),F+.18),new w(1,1,1)),g.setMatrixAt(U,m)}e.add(g);let f=l(new it(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let v=l(new it(.095,.11,.055,32),s,0,0,.035);v.rotation.x=Math.PI/2;for(let U=0;U<10;U++){let F=U*Math.PI/5,I=l(new it(.017,.017,.015,12),s,Math.cos(F)*.18,Math.sin(F)*.18,.05);I.rotation.x=Math.PI/2;let L=l(new it(.009,.009,.018,6),a,Math.cos(F)*.18,Math.sin(F)*.18,.058);L.rotation.x=Math.PI/2}for(let U of[.235,.26,.31,.335,.39,.414])if(U<u){let F=l(new Ft(U,.0012,3,96),a,0,0,.042);F.castShadow=!1}if(!t)for(let U=0;U<8;U++){let F=U*Math.PI/4,I=[.25,.29,.34,.395].map((q,W)=>new w(Math.cos(F+W*.075)*q,Math.sin(F+W*.075)*q,.043)),L=l(new It(new At(I),12,.0024,3,!1),a);L.castShadow=!1}let y=new Xt;y.moveTo(-.08,-.2),y.quadraticCurveTo(-.13,-.15,-.115,-.06),y.lineTo(-.115,.1),y.quadraticCurveTo(-.12,.19,-.05,.215),y.lineTo(.055,.19),y.quadraticCurveTo(.11,.14,.105,.06),y.lineTo(.105,-.1),y.quadraticCurveTo(.1,-.19,.04,-.21),y.closePath();let _=l(new Ht(y,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&_.scale.set(.8,.8,.8),l(new at(.09,.31,.032),a,.27,0,.005);for(let U of[-.125,0,.125]){let F=l(new it(.055,.055,.028,24),c,.354,U,.07);F.rotation.x=Math.PI/2}for(let U of[-.155,.155]){let F=l(new it(.014,.014,.025,6),s,.325,U,.094);F.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let T=x.getContext("2d");T.fillStyle="#f5f0df",T.translate(64,192),T.rotate(-Math.PI/2),T.textAlign="center",T.font="italic bold 60px Arial",T.fillText(t?"P21":"P21 SPORT",0,20);let b=new Wt(x);b.colorSpace=yt;let R=l(new Yt(.075,.24),new yn({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);R.castShadow=!1;let B=l(new it(.012,.014,.047,6),s,.36,.217,.042);return B.rotation.z=.2,e}var pu;function lf(r,e){if(!r.isConnected)return;if(!pu){let a=new gi({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=yt,a.toneMapping=pi,a.toneMappingExposure=1.15;let o=new zn;o.add(new ri("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let p=new kn("#ffffff",d);p.position.set(l,h,u),o.add(p)}let c=new rn(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),pu={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=pu;s[e]||(s[e]=fu(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function cf(r){let e=new Ge;e.name="tyre-"+r;let t=new Pt({color:"#15181b",roughness:.86}),n=new Pt({color:"#050708",roughness:.96}),i=new Pt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new ht(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new rr([new be(.56,-.19),new be(.63,-.25),new be(.72,-.23),new be(.79,-.15),new be(.8,-.1),new be(.8,.1),new be(.79,.15),new be(.72,.23),new be(.63,.25),new be(.56,.19)],96),t);if(a.rotation.x=Math.PI/2,r!=="semi")for(let l of[-1,1]){let h=s(new Ft(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,p=s(new at(.018,.036,.006),i);p.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),p.rotation.z=-d}}let o=r==="wet",c=r==="semi";if(o||c){let l=o?34:14;for(let h=0;h<l;h++)for(let u of[-1,1]){let d=h*2*Math.PI/l+(u<0?Math.PI/l*.45:0),p=Array.from({length:23},(m,f)=>{let v=f/22,y=u*((c?.035:.012)+v*(c?.175:.198)),_=.8-.045*(Math.abs(y)/.2)**3,x=d+(c?.25:.19)*(1-v)*(1-v);return new w(Math.sin(x)*_,Math.cos(x)*_,y)}),g=s(new It(new At(p),28,o?.008:.009,6,!1),n);g.name="tread-shoulder-groove"}if(o)for(let h of[-.14,-.045,.045,.14]){let u=s(new Ft(.798,.007,8,96),n);u.position.z=h,u.name="tread-water-channel"}}return e}function hf(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new w;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Ee(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new wr({depthPacking:$s});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function uf(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new Ge;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(T,b,R)=>{let B=new ht(T,b);return B.name=R,B.castShadow=B.receiveShadow=!0,c.add(B),B};for(let T=0;T<h;T++){let b=[],R=[];for(let I=0;I<=72;I++){let L=I/72*2-1,q=L*l/2,W=(T?a?.36:.46:.76)*(1-.22*L*L),re=(T?2.86+T*.055:3.02)-.13*L*L,ce=.43+T*.095+.1*Math.pow(Math.abs(L),3);for(let Y=0;Y<=28;Y++){let he=Y/28*Math.PI*2,Ae=Math.cos(he);b.push(re+Ae*W/2,ce+.035*(1-Ae*Ae)+Math.sin(he)*(T?.024:.035),q)}if(I<72)for(let Y=0;Y<28;Y++){let he=I*29+Y,Ae=he+28+1;R.push(he,he+1,Ae,he+1,Ae+1,Ae)}}let F=new ut;F.setAttribute("position",new Ee(b,3)),F.setIndex(R),F.computeVertexNormals(),u(F,T===0?n:t,"wing-element-"+T)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],p=[0,1,2,3].map(T=>new At(d.map((b,R)=>new w(b[T],R,0)),!1,"catmullrom",.35)),g=[],m=[],f=96,v=48;for(let T=0;T<=f;T++){let b=T/f,[R,B,U,F]=p.map(I=>I.getPoint(b).x);for(let I=0;I<=v;I++){let L=I/v*Math.PI*2,q=Math.cos(L),W=Math.sin(L),re=a?.7:.82;g.push(R,B+Math.sign(W)*Math.pow(Math.abs(W),re)*F,Math.sign(q)*Math.pow(Math.abs(q),re)*U)}if(T<f)for(let I=0;I<v;I++){let L=T*(v+1)+I,q=L+1;m.push(L,L+v+1,q,q,L+v+1,q+v+1)}}let y=m.length;for(let T of[0,f]){let b=T*(v+1);for(let R=1;R<v-1;R++)T===0?m.push(b,b+R,b+R+1):m.push(b,b+R+1,b+R)}let _=new ut;_.setAttribute("position",new Ee(g,3)),_.setIndex(m),_.computeVertexNormals();let x=Math.floor(f*.89)*v*6;_.addGroup(0,x,0),_.addGroup(x,y-x,a?1:0),_.addGroup(y,m.length-y,0),u(_,[t,s],"tapered-nose");for(let T of[-1,1]){let b=u(new at(.15,.4,.035),n,"nose-pylon");b.position.set(2.94,.69,T*.1),b.rotation.z=-.15;let R=new Xt;R.moveTo(2.57,.38),R.lineTo(3.43,.38),R.quadraticCurveTo(3.53,.42,3.43,.61),R.lineTo(3.14,a?.69:.64),R.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),R.closePath();let B=u(new Ht(R,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");B.position.z=T*l/2-.017,u(new at(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,T*(l/2+.055));let F=new At([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([I,L])=>new w(I,L,T*(l/2+.025))));if(u(new It(F,28,.009,6,!1),s,"endplate-trim"),a)for(let I=0;I<3;I++){let L=u(new at(.27,.075,.018),n,"flow-fin");L.position.set(2.86+I*.07,.54+I*.045,T*(1.1+I*.1)),L.rotation.z=.15}}for(let T of c.children){let b=T.geometry?.getAttribute("position");if(b){for(let R=0;R<b.count;R++)b.setX(R,b.getX(R)*.78);T.geometry.computeVertexNormals()}T.position.x=.2332+T.position.x*.78}return c}function hs(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new Mn;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new ct().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function mu(r,{paint:e,carbon:t,metal:n}){let i=new Ge;i.name="rear-wing-"+r;let s=new Ge;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(v,y,_,x,T,b,R=i){let B=new ht(v,y);return B.name=_,B.position.set(x,T,b),B.castShadow=B.receiveShadow=!0,R.add(B),B}function p(v,y,_,x,T){let b=new Xt;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let R=new Ht(b,{depth:_,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});R.translate(0,0,-_/2);let B=d(R,T,"rear-wing-blade",v,y,0,s);B.rotation.z=-.08}if(p(0,l,h,u,o||r==="sport"?t:n),c&&p(.025,l+.23,h*.96,u*.7,t),a&&p(-.05,l-.18,h,.3,e),r!=="lip")for(let v of[-1,1])d(new at(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),v*h/2,s);let g=[];for(let v of[-.72,.72]){d(new at(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,v);for(let x of[-2.36,-2.22])d(new it(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,v);let y=d(new at(1,.075,.085),t,"rearward-mount-arm",0,1.015,v),_=d(new at(.085,1,.075),t,"rear-wing-upright",0,0,v);g.push({lower:y,post:_,z:v})}let m=hs([s],i).max.x;function f(v){let y=Math.min(-2.85,v&&!v.isEmpty()?v.min.x-.24-m:-2.85);s.position.x=y;for(let{lower:_,post:x}of g)_.position.x=(-2.29+y)/2,_.scale.x=Math.abs(y+2.29),x.position.set(y,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=y,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function df(r="classic"){let e=new Ge;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new Pt({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new Pt({color:"#161d23",roughness:.83,metalness:.15}),a=new Pt({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,p,g=e){let m=new ht(c,l);return m.name=h,m.position.set(u,d,p),m.castShadow=m.receiveShadow=!0,g.add(m),m}o(new at(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new it(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new it(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new w(.72,1.09,l),p=new w(1.1,1.31,l),g=p.clone().sub(d),m=d.clone().add(p).multiplyScalar(.5);o(new at(.055,g.length(),.035),i,c+"-lever",...m.toArray()).quaternion.setFromUnitVectors(new w(0,1,0),g.normalize());let v=c==="brake"?.24:.32,y=new Xt,_=h/2,x=v/2,T=.025;if(y.moveTo(-_+T,-x),y.lineTo(_-T,-x),y.quadraticCurveTo(_,-x,_,-x+T),y.lineTo(_,x-T),y.quadraticCurveTo(_,x,_-T,x),y.lineTo(-_+T,x),y.quadraticCurveTo(-_,x,-_,x-T),y.lineTo(-_,-x+T),y.quadraticCurveTo(-_,-x,-_+T,-x),n)for(let B of[-.065,0,.065])for(let U of c==="brake"?[-.055,.055]:[0]){let F=new Gn;F.absarc(U,B,.014,0,Math.PI*2,!0),y.holes.push(F)}let b=o(new Ht(y,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let B of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new at(h*.76,.009,.007),n?a:i,c+"-grip",0,B,-.007,b);let R=Array.from({length:65},(B,U)=>{let F=U/64,I=F*Math.PI*12;return new w(.77+F*.23,1.095+F*.15+Math.sin(I)*.018,l+.045+Math.cos(I)*.018)});if(o(new It(new At(R),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let B=o(new it(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);B.rotation.z=-1.05}}return e}function vu(r){let e=new Ge;e.name="sport-seat-"+r;let t=(I,L=.8,q=0)=>new Zt({color:I,roughness:L,metalness:q,clearcoat:q?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),p=document.createElement("canvas");p.width=p.height=64;let g=p.getContext("2d");g.fillStyle="#30343b",g.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let L=0;L<64;L+=8)g.fillStyle=(L+I)%16?"#121820":"#626973",g.fillRect(L,I,7,3),g.fillStyle="#252b33",g.fillRect(L,I+4,3,4);let m=new Wt(p);m.wrapS=m.wrapT=vn,m.repeat.set(3,5),m.colorSpace=yt,c.map=m,c.bumpMap=m,c.bumpScale=.004;let f=(I,L,q=0,W=0,re=0,ce=e)=>{let Y=new ht(I,L);return Y.position.set(q,W,re),Y.castShadow=Y.receiveShadow=!0,ce.add(Y),Y},v=(I,L,q,W,re,ce,Y,he,Ae=e)=>{let ze=new Xt,Pe=-I/2,We=-L/2;return W=Math.min(W,I/2,L/2,q/2),ze.moveTo(Pe+W,We),ze.lineTo(Pe+I-W,We),ze.quadraticCurveTo(Pe+I,We,Pe+I,We+W),ze.lineTo(Pe+I,We+L-W),ze.quadraticCurveTo(Pe+I,We+L,Pe+I-W,We+L),ze.lineTo(Pe+W,We+L),ze.quadraticCurveTo(Pe,We+L,Pe,We+L-W),ze.lineTo(Pe,We+W),ze.quadraticCurveTo(Pe,We,Pe+W,We),f(new Ht(ze,{depth:q-2*W,bevelEnabled:!0,bevelSize:W,bevelThickness:W,bevelSegments:4,curveSegments:12}),re,ce,Y,he-q/2+W,Ae)},y=(I,L,q,W=e)=>f(new It(new At(I.map(re=>new w(...re))),32,L,6,!1),q,0,0,0,W),_=new Ge;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let x=new Xt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let I of[-.135,.135]){let L=new Gn;L.moveTo(I-.075,1.24),L.lineTo(I+.075,1.24),L.lineTo(I+.075,1.34),L.lineTo(I-.075,1.34),L.closePath(),x.holes.push(L)}f(new Ht(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,_),f(new Ht(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),v(.41,.18,.095,.025,a,0,1.43,.035,_),v(.46,.5,.12,.035,o,0,.85,.065,_),v(.45,.31,.17,.04,o,0,.4,.1,_);for(let I of[-1,1]){let L=v(.17,.42,.19,.055,a,I*.34,.98,.1,_);L.rotation.z=I*.28,L.rotation.y=-I*.25;let q=v(.13,.55,.23,.045,a,I*.3,.49,.14,_);q.rotation.z=-I*.12,y([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,l,_);let W=I*.135;for(let re of[1.235,1.345])v(.16,.014,.022,.004,h,W,re,.015,_);for(let re of[W-.08,W+.08])v(.014,.12,.022,.004,h,re,1.29,.015,_)}let b=v(n?.86:.77,.045,.84,.012,c,0,.435,.34);b.name="seat-base";let R=v(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);R.name="seat-cushion",v(.54,.15,.17,.045,a,0,.52,.77);for(let I of[.2,.33,.46,.59])y([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,l);if(n){for(let I of[-1,1])v(.14,.13,.64,.04,a,I*.45,.65,.32),v(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let L of[-.1,.1])y([[L-.1,I,.18],[L,I+.07,.18],[L+.1,I,.18]],.003,l,_)}i&&(v(.47,.1,.22,.035,a,0,.56,.86),y([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let I of[-1,1]){let L=v(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);L.rotation.z=-I*.12,y([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,l),v(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let q of[.02,.65])v(.13,.09,.12,.015,c,I*.28,-.055,q),f(new it(.022,.022,.015,12),h,I*.28,-.002,q)}for(let I=.3;I<1.08;I+=.11)y([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,l,_);for(let I of[-1,1]){let L=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],q=[],W=[];L.forEach(([he,Ae,ze],Pe)=>{q.push(he-.033,Ae,ze,he+.033,Ae,ze),Pe&&W.push(Pe*2-2,Pe*2-1,Pe*2,Pe*2-1,Pe*2+1,Pe*2)});let re=new ut;re.setAttribute("position",new Ee(q,3)),re.setIndex(W),re.computeVertexNormals();let ce=u.clone();ce.side=Ot,f(re,ce);let Y=v(.27,.055,.025,.008,u,I*.18,.64,.45);Y.rotation.z=-I*.2}let B=f(new it(.065,.065,.035,24),h,0,.66,.48);B.rotation.x=Math.PI/2;let U=f(new it(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);U.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let F=new Mn().setFromObject(b).min.y;for(let I of e.children)I.position.y-=F;return e.userData.floorContact=0,e}var gu;function pf(r,e){if(!r.isConnected||e==="none")return;if(!gu){let a=new gi({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=yt,a.toneMapping=pi,a.toneMappingExposure=1.25;let o=new zn;o.add(new ri("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let p=new kn("#ffffff",d);p.position.set(l,h,u),o.add(p)}let c=new rn(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),gu={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=gu;s[e]||(s[e]=vu(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerPrepareGarageVehicle=r=>window.PokerGarage.adminTransport(r?.transport)?Xp(r.transport):r?.transport==="bicycle"?Vp():["scooter","hoverboard"].includes(r?.transport)?Gp(r.transport):Promise.resolve();window.pokerCreateReferenceCharacter3D=of;window.pokerPaintBrakePreview=lf;window.pokerPaintSeatPreview=pf;var ff=(r,e,t)=>Math.max(e,Math.min(t,r));function j0(r,e,t={}){if(["scooter","hoverboard"].includes(e.transport))return kp(r,e);if(e.transport==="bicycle")return Hp(r,e);if(window.PokerGarage.adminTransport(e.transport))return jp(r,e);let n=window.PokerGarage,i=new Ge;r.add(i),i.scale.set(1.24,.86,.95);let s=(M,E,G)=>new Zt({color:M,metalness:E,roughness:G,clearcoat:E>.3?.65:.12,clearcoatRoughness:.12}),a=s(n.item("paint",e.paint).color,.55,.24),o=s(n.item("paint",e.paint).color,0,.93),c=s("#e5aa28",1,.135),l=s("#171a1e",.04,.76),h=s(n.wheelPaintColor(e),.86,.25),u=s("#0d1417",.35,.3),d=s("#060809",.12,.36),p=s(n.item("light",e.light).color,.45,.2),g=s("#123e47",.86,.22);p.emissive.copy(p.color),p.emissiveIntensity=2;function m(M,E,G=0,te=0,O=0,ue=i){if(t.prepareGeometry){let ae=t.prepareGeometry(M);ae!==M&&(M.dispose(),M=ae)}let K=new ht(M,E);return K.position.set(G,te,O),K.castShadow=!0,K.receiveShadow=!0,ue.add(K),K}let f=(M,E,G,te,O,ue,K)=>m(new at(M,E,G),te,O,ue,K);function v(M,E,G,te,O,ue,K="y"){let ae=m(new it(M,M,E,64),G,te,O,ue);return K==="z"&&(ae.rotation.x=Math.PI/2),K==="x"&&(ae.rotation.z=Math.PI/2),ae}function y(M,E,G,te,O,ue,K="z"){let ae=m(new Ft(M,E,12,80),G,te,O,ue);return K==="y"&&(ae.rotation.x=Math.PI/2),K==="x"&&(ae.rotation.y=Math.PI/2),ae}function _(M,E,G,te=Xt){let O=new te,ue=-M/2,K=-E/2;return G=Math.min(G,E/2-.001),O.moveTo(ue+G,K),O.lineTo(ue+M-G,K),O.quadraticCurveTo(ue+M,K,ue+M,K+G),O.lineTo(ue+M,K+E-G),O.quadraticCurveTo(ue+M,K+E,ue+M-G,K+E),O.lineTo(ue+G,K+E),O.quadraticCurveTo(ue,K+E,ue,K+E-G),O.lineTo(ue,K+G),O.quadraticCurveTo(ue,K,ue+G,K),O}function x(M,E,G,te,O,ue,K=null,ae=.025){let ve=_(M,E,te);if(K){let vt=_(K[0],K[1],K[2],Gn),lt=new Gn(vt.getPoints(40).map(J=>new be(J.x+(K[3]||0),J.y)));ve.holes.push(lt)}let dt=m(new Ht(ve,{depth:G,bevelEnabled:ae>0,bevelSize:ae,bevelThickness:ae,bevelSegments:4,curveSegments:40}),O,0,ue,0);return dt.rotation.x=-Math.PI/2,dt}let T=[],b=i.children.length,R=[3.02,1.51,.65,-.28],B=_(4.96,2.44,1.15).getSpacedPoints(128),U=[],F=[],I=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,E]of I)for(let G=0;G<128;G++){let te=B[G];U.push(te.x*E,M,-te.y*E)}for(let M=0;M<3;M++)for(let E=0;E<128;E++){let G=M*128+E,te=M*128+(E+1)%128;F.push(G,te,G+128,te,te+128,G+128)}let L=new ut;L.setAttribute("position",new Ee(U,3)),L.setIndex(F),L.computeVertexNormals(),a.side=Ot,m(L,a);let q=x(5.03,2.51,.065,1.19,c,.58,null,.035);x(5.1,2.58,.09,1.22,c,1.25,R,.035);let W=new At(_(4.94,2.42,1.15).getPoints(40).map(M=>new w(M.x,1.44,-M.y)),!0,"centripetal");m(new It(W,240,.125,16,!0),d);for(let M of[-1,1]){let E=Array.from({length:21},(G,te)=>{let O=.26+te*.25/20;return new w(1.32+1.15*Math.cos(O),1.44,M*(.06+1.15*Math.sin(O)))});m(new It(new At(E),32,.132,20,!1),c)}x(4.65,2.14,.035,1.03,c,1.39,R,.015),x(4.52,2.01,.025,.97,o,1.43,R,.01),T.push(...i.children.slice(b));let re=x(2.98,1.47,.025,.63,o,.94);re.position.x=-.28;let ce=new Zt({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Ot,polygonOffset:!0,polygonOffsetFactor:-1}),Y=new sr(_(2.9,1.4,.6)),he=Y.attributes.position,Ae=Y.attributes.uv;for(let M=0;M<he.count;M++)Ae.setXY(M,(he.getX(M)+1.45)/2.9,(he.getY(M)+.7)/1.4);let ze=m(Y,ce,-.28,1.005,0);ze.rotation.x=-Math.PI/2,ze.castShadow=!1;let Pe=ce.clone(),We=[];for(let M of[-1,1]){let E=m(new Yt(3.05,.3),Pe,0,1.04,M*1.329);M<0&&(E.rotation.y=Math.PI),E.castShadow=!1,We.push(E)}function Le(M){let E=M.vinyl||"none";ze.visible=E!=="none",We.forEach(te=>te.visible=E!=="none");let G=E+":"+(M.vinylText||"");if(ce.userData.id!==G){ce.map?.dispose(),Pe.map?.dispose(),ce.map=new Wt(n.vinylCanvas(E,!1,M.vinylText)),Pe.map=new Wt(n.vinylCanvas(E,!0,M.vinylText));for(let te of[ce,Pe]){te.map.colorSpace=yt,te.map.anisotropy=16;let O=te.map;O.image.addEventListener("vinyl-ready",()=>{O.needsUpdate=!0},{once:!0}),te.needsUpdate=!0,te.userData.id=G}}}let _e=x(3.13,1.62,.018,.7,c,1.46,[3.02,1.51,.65,0],.006);_e.position.x=-.28;let $=x(3.08,1.57,.46,.68,a,.96,[3.02,1.51,.65,0],.005);$.position.x=-.28;for(let M of[-1,-.35,.35])for(let E of[-.75,.75])f(.011,.4,.009,u,M,1.2,E);function H(M,E){let G=document.createElement("canvas");G.width=G.height=256;let te=G.getContext("2d");te.fillStyle=M,te.fillRect(0,0,256,256);let O=17;for(let K=0;K<18e3;K++)O=O*1664525+1013904223>>>0,te.fillStyle="rgba(0,0,0,"+E+")",te.fillRect(O%256,(O>>>8)%256,1,1);let ue=new Wt(G);return ue.colorSpace=yt,ue.wrapS=ue.wrapT=vn,ue}o.map=H("#e8e8e8",.035),o.bumpMap=H("#888888",.5),o.bumpScale=.0015,o.clearcoat=0,l.bumpMap=H("#888888",.12),l.bumpScale=.003,d.bumpMap=H("#888888",.3),d.bumpScale=.001;function Ie(M,E,G,te,O,ue=!1,K=i){let ae=new Xt;ae.moveTo(0,.5),ae.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),ae.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),ae.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),ae.bezierCurveTo(.48,.12,.12,.28,0,.5),ae.moveTo(-.12,-.3),ae.lineTo(0,-.06),ae.lineTo(.12,-.3),ae.closePath();let ve=m(new Ht(ae,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),E,G,te,O,K);return ve.scale.setScalar(M),ue&&(ve.rotation.y=Math.PI),ve}let P=[],C=[],X=[],k=null;for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=E*1.36,te=E*1.57,O=new Ge;O.position.set(M,.81,G),i.add(O),O.userData.groundWheel=!0;let ue=i.children.length,K=m(new rr([new be(.56,-.19),new be(.61,-.245),new be(.67,-.25),new be(.76,-.19),new be(.8,-.1),new be(.8,.1),new be(.76,.19),new be(.67,.25),new be(.61,.245),new be(.56,.19)],80),l,M,.81,G);K.rotation.x=Math.PI/2;for(let J=-2;J<=2;J++)y(.798-Math.abs(J)*.012,.0035,u,M,.81,G+J*.071);for(let J=0;J<28;J++){let Me=J*Math.PI/14,Ve=Array.from({length:17},(nt,st)=>{let Nt=st/16,jt=-.205+Nt*.41,pt=.799-.044*Math.pow(Math.abs(jt)/.205,3),et=Me+.13*Math.sin(Nt*Math.PI);return new w(M+Math.sin(et)*pt,.81+Math.cos(et)*pt,G+jt)});m(new It(new At(Ve),20,.0045,5,!1),u)}for(let J of[-1,1])for(let Me of[.625,.654,.681])y(Me,.0035,u,M,.81,G+J*.244);let ae=i.children.slice(ue);y(.548,.023,h,M,.81,te+E*.035),y(.505,.016,h,M,.81,te+E*.043),v(.14,.045,u,M,.81,te+E*.045,"z"),y(.14,.012,h,M,.81,te+E*.069);let ve=s("#39434a",.78,.28);ve.side=Ot;let dt=m(new it(.544,.544,.44,64,1,!0),ve,M,.81,G);dt.rotation.x=Math.PI/2,y(.548,.025,h,M,.81,G-E*.245),y(.505,.013,h,M,.81,G-E*.253),v(.16,.1,ve,M,.81,G-E*.22,"z"),y(.16,.012,h,M,.81,G-E*.275),v(.075,.13,u,M,.81,G-E*.28,"z");for(let J=0;J<5;J++){let Me=J*Math.PI*2/5;v(.018,.024,h,M+Math.sin(Me)*.115,.81+Math.cos(Me)*.115,G-E*.282,"z")}let vt=Ie(.2,h,M,.8,te+E*.075,E<0);C.push(vt);for(let J of n.wheelDesign()){let Me=new At(J.map(([Ve,nt])=>new w(M+Ve,.81+nt,te+E*(.04+.025*(1-Math.hypot(Ve,nt)/.51)))));P.push(m(new It(Me,20,.007,6,!1),h))}for(let J=0;J<20;J++){let Me=J*Math.PI/10;v(.006,.009,h,M+Math.sin(Me)*.526,.81+Math.cos(Me)*.526,te+E*.06,"z")}i.updateMatrixWorld(!0);for(let J of i.children.slice(ue))O.attach(J);O.scale.set(.88/1.24,.88/.86,1/.95),O.position.y=.715/.86;let lt={standard:ae};for(let J of["soft","medium","hard","semi","wet"]){let Me=cf(J);Me.visible=!1,O.add(Me),lt[J]=[Me]}X.push({wheelGroup:O,x:M,out:te,sign:E,tyres:lt})}let S=[];for(let M of[-1,1])S.push(f(1.35,.43,.04,c,.05,.94,M*1.3));let D=[];for(let M of[-1,1])D.push(v(.275,.27,u,2.16,.945,M*.97,"z"),y(.278,.035,c,2.16,.945,M*1.11));for(let M of[-1.72,1.72]){let E=v(.07,2.8,u,M,.7,0,"z");E.userData.groundWheel=!0}f(3.6,.08,.8,u,0,.57,0);let j=[];function V(M,E,G){let te=document.createElement("canvas");te.width=M,te.height=E,G(te.getContext("2d"),M,E);let O=new Wt(te);return O.colorSpace=yt,O.anisotropy=8,j.push(O),O}let me=V(768,256,(M,E,G)=>{M.fillStyle="#101b18",M.fillRect(0,0,E,G),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,E-20,G-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",E/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",E/2,209)}),ie=[];for(let M of[-1,1]){let E=new Zt({map:me,metalness:.55,roughness:.2,clearcoat:1});ie.push(E);let G=m(new Yt(1.28,.4),E,.05,.94,M*1.326);E.userData.plane=G,M<0&&(G.rotation.y=Math.PI)}let Q=[];for(let M of[-1,1])for(let E=0;E<3;E++){let G=new Ge;G.position.set((E-1)*.82+.05,1,M*1.39),G.userData.side=M,G.scale.setScalar(1.17),M<0&&(G.rotation.y=Math.PI),i.add(G);let te=m(new at(.1,.1,.025),c,0,0,0,G),O=new Pt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ue=m(new Yt(.65,.65,32,8),O,0,0,.047,G);ue.castShadow=!1,ue.receiveShadow=!1,Q.push({group:G,mat:O,back:te,n:E})}for(let M of[-1,1])for(let E of[-.54,.64])for(let G of[.78,1.1]){let te=v(.014,.018,c,E,G,M*1.35,"z")}let Ne=i.children.length;for(let M of[-1.7,-.35,1.48])for(let E of[-1.21,1.21]){let G=v(.128,.13,c,M,1.44,E,"x")}for(let M of[-1.7,-.35,1.48])for(let E of[-1,1])y(.125,.004,u,M+.08,1.44,E*1.21,"x"),y(.125,.004,u,M-.08,1.44,E*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let E of[-.96,.96])v(.135,.08,c,M,1.49,E),v(.108,.082,u,M,1.498,E),y(.125,.015,c,M,1.54,E,"y"),y(.111,.006,c,M,1.535,E,"y");let qe=[],Be=[],tt=["#ab2338","#1b684b","#2455a5"].map(M=>s(M,.08,.55)),ft=s("#eee9d6",.04,.6),gt=i.children.length;for(let[M,E,G,te]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let O=0;O<te;O++){v(.104,.033,tt[G],M,1.49+O*.037,E);for(let ue=0;ue<6;ue++){let K=ue*Math.PI/3,ae=f(.024,.021,.012,ft.clone(),M+Math.cos(K)*.103,1.49+O*.037,E+Math.sin(K)*.103);ae.rotation.y=Math.PI/2-K,ae.castShadow=!1,ae.receiveShadow=!1,ae.userData.edgeIndex=ue,qe.push(ae)}if(O===te-1){let ue=new Pt({transparent:!0,alphaTest:.1,roughness:.65}),K=m(new Yt(.208,.208),ue,M,1.511+O*.037,E);K.rotation.x=-Math.PI/2,K.castShadow=!1,K.receiveShadow=!1,Be.push({mat:ue,n:G})}}let Et=i.children.slice(gt);T.push(...i.children.slice(Ne));let bt=new Ge;bt.position.set(.47,1.78,0),bt.scale.set(.82/1.24,.82/.86,.82/.95),i.add(bt);let z=new Ge;bt.add(z);let ne=new w((.47-.96)*1.24,(1.78-1.42)*.86,0).normalize(),le=new w(0,0,1),ge=new w().crossVectors(ne,le).normalize();z.quaternion.setFromRotationMatrix(new ct().makeBasis(le,ge,ne));let de=d.clone();m(new Ft(.53,.06,16,80),de,0,0,0,z),m(new Ft(.473,.014,10,64),c,0,0,-.02,z);for(let M of[Math.PI]){let E=m(new at(.09,.39,.045),c,Math.sin(M)*.26,Math.cos(M)*.26,0,z);E.rotation.z=-M}for(let M of[-1,1]){let E=m(new at(.35,.075,.06),c,M*.265,0,0,z);m(new at(.32,.035,.064),u,M*.265,0,.006,z)}let ee=m(new it(.195,.195,.075,64),c,0,0,.035,z);ee.rotation.x=Math.PI/2;let fe=m(new $n(.177,64),new Pt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,z);fe.receiveShadow=!1,Ie(.38,c,0,-.025,.105,!1,z);let se={classic:new Ge,sport:new Ge,formula:new Ge};for(let M of z.children.slice())se.classic.add(M);Object.values(se).forEach(M=>z.add(M));function De(M,E,G,te){let O=new At(E.map(([ue,K])=>new w(ue,K,0)),!0);m(new It(O,72,G,12,!0),te,0,0,0,M)}De(se.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,de);for(let M of[-1,1])m(new at(.35,.065,.045),h,M*.27,0,0,se.sport),m(new at(.065,.3,.045),h,M*.12,-.22,0,se.sport);m(new Ft(.5,.018,8,64,.22),p,0,0,.005,se.sport),De(se.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,de),m(new at(.6,.23,.065),u,0,0,0,se.formula);for(let M of[-1,1])m(new Vt(.035,12,8),p,M*.25,.055,.06,se.formula),m(new at(.08,.29,.025),h,M*.37,0,-.07,se.formula);for(let M of["sport","formula"]){let E=m(new it(.15,.15,.07,48),h,0,0,.035,se[M]);E.rotation.x=Math.PI/2,m(new $n(.13,48),u,0,0,.078,se[M]),Ie(.25,h,0,-.018,.09,!1,se[M])}for(let[M,E]of Object.entries(n.steeringDesigns)){let G=new Ge;z.add(G),se[M]=G;let te=s(M==="woodHeritage"?E.color:"#14191d",M==="woodHeritage"?.35:.04,M==="woodHeritage"?.24:.82),O=s(M==="drift"?"#c5a14f":M==="rallySuede"?"#292e33":"#b8c2c9",.85,.25);if(M==="trackYoke"){rt([[-.43,.39,0],[-.51,.12,0],[-.47,-.26,0],[0,-.39,0],[.47,-.26,0],[.51,.12,0],[.43,.39,0]],.065,te,G);for(let ae of[-1,1])m(new Vt(1,24,16),te,ae*.46,.15,.01,G).scale.set(.085,.28,.09),m(new at(.25,.1,.055),O,ae*.23,-.07,.015,G);let K=m(new at(.45,.28,.085),s("#20282e",.45,.35),0,-.02,.03,G);m(new at(.2,.085,.012),u,0,.035,.08,G);for(let ae of[-1,1])for(let ve of[-.08,.05])m(new Vt(.023,12,8),O,ae*.15,ve,.085,G);continue}E.shape==="round"?m(new Ft(.53,.065,16,80),te,0,0,0,G):E.shape==="flat"?De(G,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,te):rt([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,te,G);for(let K=0;K<E.spokes;K++){let ae=K*Math.PI*2/E.spokes,ve=m(new at(.39,.065,.05),O,Math.cos(ae)*.25,Math.sin(ae)*.25,.015,G);ve.rotation.z=ae}let ue=m(new it(.15,.15,.075,40),u,0,0,.05,G);ue.rotation.x=Math.PI/2,Ie(.23,h,0,-.015,.095,!1,G),(M==="rallySuede"||M==="carbonD")&&m(new at(.045,.09,.025),s("#ed5555",.1,.6),0,.51,.06,G)}let Z=s("#b9ab8a",.15,.8),A=s("#171c20",.02,.85);for(let[M,E]of Object.entries(se)){if(M==="trackYoke")continue;let G=M==="classic"?.53:M==="sport"?.51:.47;for(let O of[-1,1]){if(M!=="formula"){let ue=m(new Ft(G,.072,12,30,.64),A,0,0,.003,E);ue.rotation.z=O<0?Math.PI-.32:-.32}for(let ue=0;ue<9;ue++){let K=(O<0?Math.PI:0)-.28+ue*.07;m(new Vt(.007,6,4),Z,Math.cos(K)*(G-.045),Math.sin(K)*(G-.045),.063,E)}}let te=m(new at(.065,.1,.035),M==="classic"?c:p,0,M==="formula"?.16:.51,.045,E);for(let O=0;O<6;O++){let ue=O*Math.PI/3,K=m(new it(.012,.012,.012,6),h,Math.cos(ue)*.13,Math.sin(ue)*.13,.099,E);K.rotation.x=Math.PI/2}}let Se=new w(.96,1.32,0),Te=new w(.47,1.78,0),xe=Te.clone().sub(Se),Ce=Se.clone().add(Te).multiplyScalar(.5),we=f(.12,xe.length(),.095,c,...Ce.toArray());we.quaternion.setFromUnitVectors(new w(0,1,0),xe.normalize());let ke=Fe(.26,.08,.66,.035,u,.96,1.3,0);for(let M of[-1,1])Fe(.16,.16,.09,.02,u,.96,1.22,M*.26),v(.014,.012,c,.96,1.347,M*.24);ke.name="steering-chassis-mount",f(.075,we.geometry.parameters.height-.04,.1,u,...Ce.toArray()).quaternion.copy(we.quaternion);let Ze=-1.84,je=1.99,Mt=.74,$e=new Ge;$e.name="garage-turbine-primary",$e.position.set(Ze,je,0),i.add($e);let mt=i.children.length;v(Mt,.51,c,Ze,je,0,"z"),v(.67,.54,u,Ze,je,0,"z");for(let M of[-1,1]){let E=M*.29;y(.72,.055,u,Ze,je,E),y(.75,.022,c,Ze,je,E+M*.03),y(.665,.012,p,Ze,je,E+M*.025);for(let G=0;G<14;G++){let te=G*Math.PI/7,O=[],ue=[];for(let ve=0;ve<=16;ve++){let dt=ve/16,vt=.22+dt*.44,lt=te+.55*dt;for(let J of[-.15,.15])O.push(Ze+Math.sin(lt+J)*vt,je+Math.cos(lt+J)*vt,E+M*(.018+Math.sin(dt*Math.PI)*.12))}for(let ve=0;ve<16;ve++){let dt=ve*2;ue.push(dt,dt+1,dt+2,dt+1,dt+3,dt+2)}let K=new ut;K.setAttribute("position",new Ee(O,3)),K.setIndex(ue),K.computeVertexNormals(),g.side=Ot,m(K,g);let ae=new At(Array.from({length:17},(ve,dt)=>{let vt=dt/16,lt=.22+vt*.44,J=te+.55*vt-.15;return new w(Ze+Math.sin(J)*lt,je+Math.cos(J)*lt,E+M*(.025+Math.sin(vt*Math.PI)*.12))}));m(new It(ae,20,.009,6,!1),p)}v(.215,.07,c,Ze,je,E+M*.085,"z"),v(.18,.085,u,Ze,je,E+M*.11,"z")}for(let M=0;M<12;M++){let E=M*Math.PI/6,G=f(.045,.15,.2,u,Ze+Math.cos(E)*.735,je+Math.sin(E)*.735,0);G.rotation.z=E}i.updateMatrixWorld(!0);for(let M of i.children.slice(mt))$e.attach(M);$e.rotation.set(0,Math.PI/2,0),$e.scale.set(.96/1.24,.96/.86,.96/.95);let St=$e.clone(!0);St.name="garage-turbine-secondary",i.add(St);let wt=new Ge;$e.add(wt);let hn=s("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])m(new Ft(.765,.028,10,80),hn,0,0,M,wt);for(let M=0;M<8;M++){let E=M*Math.PI/4,G=m(new it(.025,.025,.025,6),hn,Math.sin(E)*.73,Math.cos(E)*.73,.35,wt);G.rotation.x=Math.PI/2}let Kt={classic:new Ge,dual:new Ge,titanium:new Ge},Pn=s("#a9b7c4",.92,.23),ai=s("#668bb5",.88,.25);Object.values(Kt).forEach(M=>i.add(M));for(let[M,E]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let G of E){let te=M==="titanium"?ai:Pn,O=m(new it(.105,.105,.5,32),te,-2.42,.76,G,Kt[M]);O.rotation.z=Math.PI/2;let ue=m(new it(.079,.079,.012,32),u,-2.678,.76,G,Kt[M]);ue.rotation.z=Math.PI/2;let K=m(new Ft(.094,.012,8,32),te,-2.69,.76,G,Kt[M]);K.rotation.y=Math.PI/2}for(let[M,E]of Object.entries(Kt)){let G=M==="classic"?[0]:[-.67,.67];for(let O of G){let ue=m(new it(.18,.18,.52,40),Pn,-2.19,.76,O,E);ue.rotation.z=Math.PI/2;for(let K of[-2.36,-2.04]){let ae=m(new Ft(.184,.016,8,40),u,K,.76,O,E);ae.rotation.y=Math.PI/2,m(new at(.07,.19,.07),Pn,K,.94,O,E)}}let te=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let O of te){let ue=m(new it(.077,.077,.11,32,1,!0),s("#151c23",.35,.65),-2.63,.76,O,E);ue.rotation.z=Math.PI/2;let K=m(new Ft(.107,.018,10,40),M==="titanium"?ai:Pn,-2.57,.76,O,E);if(K.rotation.y=Math.PI/2,M==="titanium")for(let[ae,ve]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let dt=m(new Ft(.106,.008,6,40),s(ve,.85,.3),ae,.76,O,E);dt.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let E=new At([new w(-2.16,1.46,M*.65),new w(-1.94,1.66,M*.69),new w(-1.3,1.59,M*.64),new w(-.98,1.47,M*.7)]);m(new It(E,32,.022,8,!1),c),f(.34,.06,.14,c,-1.84,1.48,M*.4)}for(let M of[-1,1]){let E=new At([new w(-2.45,1.1,M*.7),new w(-2.43,1.36,M*.72),new w(-2.19,1.55,M*.7),new w(-1.9,1.55,M*.68)]);m(new It(E,40,.075,14,!1),u),m(new It(E,40,.019,10,!1),c);for(let G of[-2.2,-1.96]){let te=new At([new w(G,1.43,M*.48),new w(G,1.63,M*.6),new w(G+.24,1.57,M*.82)]);m(new It(te,24,.017,8,!1),c)}}let mn=i.children.length,_i=[],Dr=[],us=[];for(let M=0;M<=48;M++){let E=-.92+M*1.84/48;for(let G of[.64,1.23])Dr.push(2.57-.28*(Math.sin(E)*1.25/1.1)**2,G,Math.sin(E)*1.25)}for(let M=0;M<48;M++){let E=M*2;us.push(E,E+2,E+1,E+1,E+2,E+3)}let hr=new ut;hr.setAttribute("position",new Ee(Dr,3)),hr.setIndex(us),hr.computeVertexNormals();let N=s("#00453f",.72,.14);N.clearcoat=1,N.side=Ot,m(hr,N);for(let M of[.635,1.225]){let E=Array.from({length:65},(G,te)=>{let O=-1.04+te*2.08/64;return new w(2.57-.28*(O/1.1)**2,M,O)});m(new It(new At(E),80,.034,12,!1),c)}for(let M of[-1,1]){let E=M*1,G=2.57-.28*(E/1.1)**2,te=new At([new w(G-.04,.635,E),new w(G+.05,.78,E),new w(G+.065,1.12,E),new w(G-.04,1.25,E)]);m(new It(te,32,.065,12,!1),c);for(let O of[.91,1.065]){let ue=Array.from({length:16},(K,ae)=>{let ve=M*(.51+ae*.41/15);return new w(2.57-.28*(ve/1.1)**2+.018,O,ve)});_i.push(m(new It(new At(ue),24,.017,8,!1),p))}}let oe=i.children.length,ye=[];for(let M=0;M<2;M++){let E=new Ge;E.name="hood-playing-card-"+M,E.position.set(1.66+M*.08,1.495+M*.014,M?.23:-.23),E.rotation.set(-Math.PI/2,0,M?-.18:.18),i.add(E);let G=_(.54,.76,.035),te=new Ht(G,{depth:.004,bevelEnabled:!1,curveSegments:10});te.translate(0,0,-.004);let O=m(te,new Pt({color:"#e1d8c4",roughness:.94,metalness:0}),0,0,0,E);O.castShadow=!1,O.receiveShadow=!1;let ue=new Wt(n.cardCanvas(e.cards,M));ue.colorSpace=yt,ue.anisotropy=16;let K=new yn({map:ue,transparent:!0,alphaTest:.1,toneMapped:!1,side:Ot,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});K.userData.style=e.cards,ye.push(K);let ae=m(new Yt(.54,.76),K,0,0,.0015,E);ae.name="printed-card-face-"+M,ae.castShadow=!1,ae.receiveShadow=!1}let Re=i.children.slice(oe);T.push(...i.children.slice(mn));let pe=new Pt({map:new Wt(n.plateCanvas(e)),roughness:.6}),Oe=[];for(let M of[-1,1]){let E=m(new Yt(.79,.463),pe,M*2.605,1.01,0);E.rotation.y=M*Math.PI/2,Oe.push({plate:E,sign:M}),M>0&&T.push(E)}let Qe=[],Ue={},He=s("#7d8c98",.82,.28),Ke=s("#202a32",.45,.38),xt=s("#a7c6d5",.98,.055),Xe=s("#182029",.35,.48);Xe.bumpMap=H("#888888",.2),Xe.bumpScale=.001;function Fe(M,E,G,te,O,ue,K,ae,ve){let dt=new Ht(_(M,E,te),{depth:G,bevelEnabled:!0,bevelSize:Math.min(.012,G*.2),bevelThickness:Math.min(.012,G*.2),bevelSegments:3,curveSegments:12});return dt.translate(0,0,-G/2),m(dt,O,ue,K,ae,ve)}function rt(M,E,G,te){return m(new It(new At(M.map(O=>new w(...O))),40,E,12,!1),G,0,0,0,te)}function ln(M,E,G,te){let O=m(new it(.014,.014,.014,6),He,M,E,G,te);O.rotation.x=Math.PI/2}function _n(M,E,G,te,O,ue){let K=new Xt;K.moveTo(-te*.5,0),K.bezierCurveTo(-te*.52,.055,-te*.12,.07,te*.5,.008),K.quadraticCurveTo(te*.05,-.025,-te*.5,0);let ae=new Ht(K,{depth:G,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});ae.translate(0,0,-G/2);let ve=m(ae,O,M,E,0,ue);return ve.rotation.z=-.08,ve}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Ue[M]={};for(let E of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let G=new Ge;i.add(G),Ue[M][E]=G;let te=["sport","aero"].includes(E)?Xe:He;if(M==="spoiler"){i.remove(G);let O=mu(E,{paint:a,carbon:Xe,metal:He});i.add(O),Ue.spoiler[E]=O;continue}if(M==="mirrors")for(let O of[-1,1]){let ue=new Ge;G.add(ue),Qe.push({group:ue,sign:O});let K=E==="aero",ae=K?1.68:E==="round"?1.96:1.86,ve=O*(K?1.47:1.53),dt=.77;Fe(.18,.08,.15,.035,Ke,.64,1.46,O*1.19,ue),rt([[.64,1.47,O*1.19],[.62,1.62,O*1.32],[dt,ae-.07,ve]],K?.023:.029,te,ue);let vt=m(new Vt(.046,16,12),Ke,dt,ae-.065,ve,ue);if(E==="round"){m(new Vt(1,32,20),He,dt,ae,ve,ue).scale.set(.065,.15,.15);let J=m(new $n(.13,48),xt,dt-.056,ae,ve,ue);J.rotation.y=-Math.PI/2,J.castShadow=!1;let Me=m(new Ft(.136,.009,8,48),He,dt-.06,ae,ve,ue);Me.rotation.y=Math.PI/2}else{let lt=K?.52:E==="sport"?.43:.38,J=K?.11:E==="sport"?.26:.22,Me=Fe(lt,J,.095,E==="sport"?.018:K?.045:.075,E==="club"?He:Xe,dt,ae,ve,ue);Me.rotation.y=Math.PI/2;let Ve=m(new sr(_(lt-.045,J-.035,.05)),xt,dt-.061,ae,ve,ue);Ve.rotation.y=-Math.PI/2,Ve.castShadow=!1,Ve.receiveShadow=!1;let nt=_(lt-.028,J-.018,.055).getPoints(24).map(st=>[dt-.058,ae+st.y,ve+st.x]);nt.push(nt[0]),rt(nt,.006,He,ue)}}else if(M==="sideSkirts")for(let O of[-1,1]){let ue=Fe(E==="aero"?2.75:2.3,E==="aero"?.27:E==="sport"?.19:.12,E==="rally"?.48:E==="aero"?.32:E==="sport"?.23:.13,.05,E==="club"||E==="rally"?te:Xe,0,.59,O*1.24,G);if(E==="rally")for(let K of[-.84,-.42,0,.42,.84]){let ae=Fe(.13,.018,.25,.018,Ke,K,.67,O*1.24,G)}else rt([[-1.08,.54,O*1.3],[0,.53,O*1.32],[1.08,.54,O*1.3]],.009,p,G);for(let K of[-.87,.87])Fe(.12,.14,.16,.025,Ke,K,.65,O*1.2,G),ln(K,.61,O*1.33,G);if(E==="sport"){let K=Fe(.46,.24,.035,.02,Xe,-.96,.69,O*1.4,G);K.rotation.z=-.25}if(E==="aero")for(let K of[-.95,-.4,.25,.95]){let ae=Fe(.24,.12,.025,.025,Xe,K,.57,O*1.35,G);ae.rotation.z=K>0?.2:-.2}}else{let O=M==="frontBumper"?1:-1,ue=[[O*2.26,.66,-.92],[O*2.58,.65,-.7],[O*2.67,.65,0],[O*2.58,.65,.7],[O*2.26,.66,.92]];E!=="aero"&&rt(ue,E==="sport"?.061:.047,te,G);for(let K of[-.67,.67]){rt([[O*2.31,.74,K],[O*2.5,.68,K]],.032,Ke,G);let ae=Fe(.16,.12,.13,.035,Ke,O*2.51,.67,K,G)}if(E==="aero"){let K=Fe(.38,.045,1.94,.07,Xe,O*2.48,.5,0,G);for(let ae of[-.7,-.27,.27,.7])Fe(.27,.12,.022,.025,Ke,O*2.48,.55,ae,G);rt([[O*2.4,.52,-.91],[O*2.64,.52,0],[O*2.4,.52,.91]],.008,He,G)}if(E==="club"||E==="rally"){rt([[O*2.5,.67,-.59],[O*2.58,1.08,-.48],[O*2.61,1.14,.48],[O*2.5,.67,.59]],.04,He,G);let K=Fe(.1,.28,E==="rally"?1.12:.79,.04,te,O*2.6,.64,0,G);for(let ae of[-.3,-.1,.1,.3]){let ve=m(new $n(.035,16),u,O*2.66,.64,ae,G);ve.rotation.y=O*Math.PI/2}}if(E==="rally")for(let K of[-.72,.72])rt([[O*2.53,.65,K-.14],[O*2.56,.94,K-.14],[O*2.55,1.04,K],[O*2.56,.94,K+.14],[O*2.53,.65,K+.14]],.036,He,G);if(E==="sport")for(let K of[-.67,.67]){let ae=Fe(.2,.13,.14,.045,Ke,O*2.56,.66,K,G)}if(M==="rearBumper"&&E==="aero")for(let K of[-.7,-.35,0,.35,.7]){let ae=Fe(.27,.15,.025,.025,Xe,-2.46,.48,K,G);ae.rotation.z=.12}}}}let Jt=s("#b9e4f5",.28,.17);Jt.emissive.set("#b9e4f5"),Jt.emissiveIntensity=1.8;let Lt=s("#ffdda0",.2,.2);Lt.emissive.set("#ffe0a8"),Lt.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[E,G,te]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.36,.22],["sport",2.24,.18]]){let O=new Ge;Ue[M][E]&&i.remove(Ue[M][E]),i.add(O),Ue[M][E]=O;let ue=M==="frontBumper"?1:-1,K=M==="rearBumper",ae=E==="trackGT"?.6:E==="driftWide"?.58:.49,ve=.82,dt=K?[[0,E==="trackGT"?1.36:1.08]]:E==="driftWide"?[[0,1.2],[-.94,.32],[.94,.32]]:E==="trackGT"?[[0,1.08],[-.91,.35],[.91,.35]]:[[0,.98],[-.79,.31],[.79,.31]],vt=E==="driftWide"?.35:E==="trackGT"?.33:.27,lt=_(G,ae,.1);for(let[pt,et]of dt){let Tt=_(et,vt,.045,Gn);lt.holes.push(new Gn(Tt.getPoints(24).map(Gt=>new be(Gt.x+pt,Gt.y))))}let J=new Ht(lt,{depth:te,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),Me=J.attributes.position;for(let pt=0;pt<Me.count;pt++){let et=Me.getX(pt),Tt=Me.getY(pt),Gt=Me.getZ(pt);Me.setXYZ(pt,ue*(2.64+Gt-.34*(et/(G/2))**2),ve+Tt,et)}J.computeVertexNormals(),m(J,a,0,0,0,O);for(let[pt,et]of dt){let Tt=_(et+.025,vt+.025,.045).getPoints(48).map(xn=>{let an=xn.x+pt;return[ue*(2.64+te+.022-.34*(an/(G/2))**2),ve+xn.y,an]});Tt.push(Tt[0]),rt(Tt,.014,c,O);let Gt=[];for(let xn of[-1,1])for(let an=-et;an<et;an+=.055){let xi=[];for(let Qt=0;Qt<=20;Qt++){let En=-vt*.43+Qt*vt*.86/20,Mi=an+xn*En;Math.abs(Mi)<et/2-.035&&xi.push([ue*(2.665-.34*((pt+Mi)/(G/2))**2),ve+En,pt+Mi])}for(let Qt=1;Qt<xi.length;Qt++)Gt.push(...xi[Qt-1],...xi[Qt])}let gn=new ut;gn.setAttribute("position",new Ee(Gt,3)),O.add(new Zr(gn,new br({color:"#7d8c98"})))}let Ve=Array.from({length:41},(pt,et)=>{let Tt=-G/2+.04+et*(G-.08)/40;return[ue*(2.64+te+.018-.34*(Tt/(G/2))**2),ve+ae/2-.02,Tt]});rt(Ve,.018,c,O);for(let[pt,et]of dt){let Tt=[],Gt=[];for(let xn=0;xn<=24;xn++){let an=pt-et/2-.01+xn*(et+.02)/24,xi=ue*(2.64-.34*(an/(G/2))**2);for(let Qt of[-vt/2-.01,vt/2+.01])Tt.push(xi,ve+Qt,an)}for(let xn=0;xn<24;xn++){let an=xn*2;Gt.push(...ue>0?[an,an+1,an+2,an+1,an+3,an+2]:[an,an+2,an+1,an+1,an+2,an+3])}let gn=new ut;gn.setAttribute("position",new Ee(Tt,3)),gn.setIndex(Gt),gn.computeVertexNormals(),m(gn,u,0,0,0,O)}let nt=Array.from({length:41},(pt,et)=>{let Tt=-G/2+et*G/40;return[ue*(2.65+te+.045-.34*(Tt/(G/2))**2),ve-ae/2-.025,Tt]});rt(nt,E==="trackGT"?.028:.019,Xe,O);let st=new ut,Nt=[],jt=[];for(let[pt,et,Tt]of nt)Nt.push(pt,et,Tt,pt-ue*.17,et+.005,Tt);for(let pt=0;pt<40;pt++){let et=pt*2;jt.push(et,et+1,et+2,et+1,et+3,et+2)}if(st.setAttribute("position",new Ee(Nt,3)),st.setIndex(jt),st.computeVertexNormals(),m(st,Xe,0,0,0,O),M==="rearBumper")for(let pt=0;pt<(E==="trackGT"?5:3);pt++){let et=(pt-(E==="trackGT"?2:1))*.3,Tt=Fe(.46,.19,.025,.008,Xe,-2.76,ve-ae/2-.035,et,O);Tt.rotation.z=-.12}else if(E==="trackGT"){for(let pt of[-.36,.36]){let et=Fe(.38,.27,.035,.012,Xe,2.94,ve-ae/2+.045,pt,O);et.rotation.z=-.32,Fe(.27,.027,.13,.008,Xe,3.02,ve-ae/2-.075,pt,O)}for(let pt of[-.96,.96]){let et=Fe(.29,.16,.025,.008,Xe,2.78,ve-ae/2+.01,pt,O);et.rotation.z=.08}}if(K)for(let pt of[-1,1])for(let et=0;et<(E==="sport"?2:1);et++){let Tt=pt*(.78+et*.15),Gt=m(new it(.067,.067,.16,32,1,!0),He,-2.77,.77,Tt,O);Gt.rotation.z=Math.PI/2;let gn=m(new $n(.056,24),u,-2.86,.77,Tt,O);gn.rotation.y=-Math.PI/2}for(let pt of[-1,1]){let et=pt*(G/2-.055),Tt=ue*(2.64+te-.3);rt([[Tt,ve-ae/2+.065,et],[Tt-ue*.1,ve,et+pt*.035],[Tt-ue*.2,ve+ae/2-.065,et-pt*.015]],.043,a,O),rt([[Tt+ue*.025,ve-ae/2+.04,et-pt*.025],[Tt+ue*.035,ve,et-pt*.025],[Tt+ue*.025,ve+ae/2-.04,et-pt*.025]],.012,c,O)}}for(let M of["formula","formulaPro","formulaElite"]){let E=uf(M,{paint:a,carbon:Xe,metal:He,accent:c});i.add(E),Ue.frontBumper[M]=E}for(let M of["rearBumper","sideSkirts","spoiler"])for(let E of["formula","formulaPro"]){let G=new Ge;G.name=M+"-"+E,i.add(G),Ue[M][E]=G;let te=E==="formulaPro";if(M==="rearBumper"){Fe(.48,.16,te?2.3:2.05,.03,Xe,-2.47,.45,0,G);for(let O=-3;O<=3;O++){let ue=Fe(.64,.23,.025,.01,Xe,-2.48,.44,O*.3,G);ue.rotation.z=-.15}for(let O of[-1,1])rt([[-2.2,.54,O*1],[-2.65,.62,O*1.1]],.025,a,G)}else if(M==="sideSkirts")for(let O of[-1,1]){let ue=Fe(2.35,te?.42:.33,.34,.08,a,-.15,.83,O*1.3,G);ue.rotation.z=-.045,Fe(2.65,.055,.48,.025,Xe,-.06,.58,O*1.3,G),Fe(.07,.21,.24,.035,u,.96,.87,O*1.3,G);for(let K=0;K<(te?3:1);K++)Fe(.35,.11,.025,.01,Xe,.48-K*.32,.65,O*1.53,G)}else{i.remove(G);let O=mu(E,{paint:a,carbon:Xe,metal:He});i.add(O),Ue.spoiler[E]=O}}Ue.headlights={};for(let M of["round","projector","rally","matrix"]){let E=new Ge;i.add(E),Ue.headlights[M]=E;for(let G of[-1,1]){let te=G*.74,O=2.57-.28*(te/1.1)**2+.07,ue=1.075;if(M==="matrix"){let K=Fe(.4,.2,.075,.045,Ke,O,ue,te,E);K.rotation.y=Math.PI/2;let ae=Fe(.35,.15,.01,.035,u,O+.05,ue,te,E);ae.rotation.y=Math.PI/2;for(let ve=0;ve<4;ve++){let dt=Fe(.06,.1,.012,.017,Jt,O+.065,ue,te-.128+ve*.085,E);dt.rotation.y=Math.PI/2,dt.castShadow=!1}}else{let K=M==="rally"?.16:M==="round"?.14:.135,ae=m(new it(K+.027,K+.02,.095,48),Ke,O,ue,te,E);ae.rotation.z=Math.PI/2;let ve=m(new Ft(K+.008,.01,10,48),He,O+.054,ue,te,E);ve.rotation.y=Math.PI/2;let dt=m(new Vt(1,32,20),M==="round"||M==="rally"?Lt:Jt,O+.055,ue,te,E);if(dt.scale.set(.025,K,K),dt.castShadow=!1,M==="projector"){let vt=m(new Ft(K*.8,.008,8,48),Jt,O+.076,ue,te,E);vt.rotation.y=Math.PI/2,m(new Vt(1,24,16),xt,O+.081,ue,te,E).scale.set(.022,K*.53,K*.53)}if(M==="rally")for(let vt of[-.07,0,.07]){let lt=Math.sqrt(K*K-vt*vt);rt([[O+.09,ue-lt,te+vt],[O+.1,ue,te+vt],[O+.09,ue+lt,te+vt]],.009,Ke,E)}}}}for(let[M,E]of Object.entries(n.streetHeadlights)){let G=new Ge;i.add(G),Ue.headlights[M]=G;let te=s(E.color,.12,.22);te.emissive.set(E.color),te.emissiveIntensity=E.smoke?.35:1.1;let O=s(E.smoke?"#1c3348":"#83b6d5",.45,.12);for(let ue of[-1,1]){let K=ue*.72,ae=2.57-.28*(K/1.1)**2+.07,ve=1.075;if(E.shape==="sportHousing"){let lt=new Xt;lt.moveTo(-.29,.12),lt.lineTo(.23,.09),lt.quadraticCurveTo(.32,.02,.26,-.13),lt.lineTo(-.25,-.14),lt.closePath();let J=m(new Ht(lt,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),Ke,ae+.02,ve,K,G);J.rotation.y=Math.PI/2;for(let Me=0;Me<2;Me++){let Ve=K+(Me-.5)*.24;if(m(new Vt(1,24,16),O,ae+.13,ve,Ve,G).scale.set(.022,.067,.067),E.signature==="rings"){let st=m(new Ft(.086,.01,10,48),te,ae+.155,ve,Ve,G);st.rotation.y=Math.PI/2}if(E.signature==="doubleL"&&rt([[ae+.155,ve+.075,Ve-.085],[ae+.155,ve-.075,Ve-.085],[ae+.155,ve-.075,Ve+.075]],.012,te,G),E.signature==="pixels")for(let st=0;st<3;st++)m(new at(.014,.026,.026),te,ae+.155,ve+.09,Ve-.055+st*.055,G)}E.signature==="arc"&&rt([[ae+.155,ve-.09,K-.25],[ae+.155,ve+.1,K-.25],[ae+.155,ve+.12,K],[ae+.155,ve+.07,K+.25]],.012,te,G);continue}let dt=Fe(.47,.25,.1,.04,Ke,ae,ve,K,G);dt.rotation.y=Math.PI/2;for(let lt of[-.18,.18]){m(new at(.1,.07,.035),He,ae-.035,ve-.15,K+lt,G);let J=m(new it(.012,.012,.018,12),c,ae+.02,ve-.13,K+lt,G);J.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(E.shape)){let lt=E.shape==="doubleU"?2:1;for(let J=0;J<lt;J++){let Me=K+(J-(lt-1)/2)*.21;if(m(new Vt(1,24,16),O,ae+.073,ve,Me,G).scale.set(.019,.067,.067),E.shape==="doubleU")rt([[ae+.1,ve+.075,Me-.08],[ae+.1,ve-.04,Me-.08],[ae+.1,ve-.08,Me-.045],[ae+.1,ve-.08,Me+.045],[ae+.1,ve-.04,Me+.08],[ae+.1,ve+.075,Me+.08]],.01,te,G);else if(E.shape==="brow"){rt([[ae+.1,ve+.055,Me-.19],[ae+.1,ve+.093,Me-.14],[ae+.1,ve+.093,Me+.19]],.011,te,G);let nt=m(new Ft(.068,.006,8,32),te,ae+.095,ve-.015,Me,G);nt.rotation.y=Math.PI/2}else for(let nt=0;nt<3;nt++){let st=nt*Math.PI*2/3-Math.PI/2;rt([[ae+.102,ve+Math.sin(st)*.025,Me+Math.cos(st)*.025],[ae+.102,ve+Math.sin(st)*.1,Me+Math.cos(st)*.1]],.011,te,G)}}continue}if(E.shape==="bar"){for(let[lt,J,Me]of[[.035,.41,.025],[-.045,.33,.012]]){let Ve=Fe(J,Me,.014,.006,te,ae+.064,ve+lt,K,G);Ve.rotation.y=Math.PI/2,Ve.castShadow=!1}continue}if(E.shape==="square"){let lt=Fe(.37,.17,.024,.015,te,ae+.065,ve,K,G);lt.rotation.y=Math.PI/2;for(let J=0;J<7;J++)m(new at(.006,.16,.004),O,ae+.082,ve,K-.15+J*.05,G);continue}let vt=E.count===3?.062:E.count===2?.087:.106;for(let lt=0;lt<E.count;lt++){let J=K+(lt-(E.count-1)/2)*(E.count===3?.14:.205),Me=m(new it(vt+.014,vt+.02,.09,E.shape==="hex"?6:40),u,ae+.035,ve,J,G);Me.rotation.z=Math.PI/2;let Ve=m(new Ft(vt,.009,8,E.shape==="hex"?6:48),te,ae+.09,ve,J,G);Ve.rotation.y=Math.PI/2,Ve.castShadow=!1;let nt=m(new Vt(1,24,16),E.projector?O:te,ae+.077,ve,J,G);if(nt.scale.set(.018,vt*.74,vt*.74),nt.castShadow=!1,E.projector&&m(new Vt(1,16,12),te,ae+.092,ve,J,G).scale.set(.006,vt*.31,vt*.31),E.cross||E.guard)for(let st of[-1,1])rt([[ae+.11,ve-vt*.74,J-st*vt*.74],[ae+.115,ve,J],[ae+.11,ve+vt*.74,J+st*vt*.74]],.009,Ke,G)}}}let cn={};for(let M of["club","sport","rally","chrome","aero"]){let E=[];cn[M]=E;for(let{wheelGroup:G,sign:te}of X){let O=new Ge;G.add(O),E.push(O);let ue=M==="aero"?.94:M==="rally"?1.02:M==="chrome"?.85:.88,K=M==="aero"||M==="rally"?.9:M==="sport"?.48:M==="chrome"?.38:.62,ae=M==="aero"?1.65:M==="rally"?1.4:M==="sport"?.66:M==="chrome"?1.03:1.2,ve=[],dt=[];for(let Me=0;Me<=48;Me++){let Ve=-ae+Me*ae*2/48;for(let nt of[-K/2,K/2])ve.push(Math.sin(Ve)*ue,Math.cos(Ve)*ue,nt)}for(let Me=0;Me<48;Me++){let Ve=Me*2;dt.push(Ve,Ve+1,Ve+2,Ve+1,Ve+3,Ve+2)}let vt=new ut;vt.setAttribute("position",new Ee(ve,3)),vt.setIndex(dt),vt.computeVertexNormals();let J=(M==="chrome"?He:M==="club"?a:Xe).clone();J.side=Ot,m(vt,J,0,0,0,O);for(let Me of[-1,1]){let Ve=Array.from({length:49},(nt,st)=>{let Nt=-ae+st*ae*2/48;return[Math.sin(Nt)*ue,Math.cos(Nt)*ue,Me*K/2]});rt(Ve,.012,M==="aero"?c:M==="chrome"?He:Ke,O)}for(let Me of[-1,1])rt([[0,0,-te*.28],[Me*.28,.42,-te*.31],[Me*.49,.68,-te*.31]],.022,Ke,O),ln(Me*.49,.68,-te*.32,O);if(M==="rally"){Fe(.12,.52,K,.025,Ke,-.97,.12,0,O);for(let Me of[-1,1])for(let Ve of[-K/2,K/2])ln(Me*.64,.76,Ve,O)}if(M==="sport")for(let Me of[-K/2,K/2])rt([[-.5,.73,Me],[0,.9,Me],[.5,.73,Me]],.018,c,O);if(M==="aero"){for(let Me of[-1,1]){let Ve=new Xt;Ve.moveTo(-.91,.1),Ve.quadraticCurveTo(-.97,.94,0,.98),Ve.quadraticCurveTo(.97,.94,.91,.1),Ve.lineTo(.7,.1),Ve.quadraticCurveTo(.66,.72,0,.75),Ve.quadraticCurveTo(-.66,.72,-.7,.1),Ve.closePath(),m(new Ht(Ve,{depth:.025,bevelEnabled:!1}),Xe,0,0,Me*K/2,O)}for(let Me=0;Me<4;Me++)Fe(.045,.025,K*.65,.006,u,-.28+Me*.18,.948,0,O)}O.userData.shell=J}}Ue.windshield={};for(let[M,E,G,te]of[["deflector",.42,"#b6e3eb",.18],["sport",.82,"#a9d5e7",.23],["touring",1.08,"#c1e3ed",.17],["smoke",.96,"#455f7a",.4],["iridium",1.08,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let ue=function(nt,st){let Nt=["touring","grandTour"].includes(M),jt=["sport","iridium"].includes(M),pt=(Nt?1.1:M==="deflector"?.78:jt?.88:.94)*(1-(jt?.28:Nt?.04:.13)*st),et=1-nt*nt;return[1.32+(Nt?.34:.23)*et-E*(jt?.48:.32)*st,1.5+E*st*(jt?.72+.28*et:.84+.16*et),nt*pt]},O=new Ge;i.add(O),Ue.windshield[M]=O;let K=[],ae=[],ve=40,dt=16;for(let nt=0;nt<=dt;nt++)for(let st=0;st<=ve;st++)K.push(...ue(-1+st*2/ve,nt/dt));for(let nt=0;nt<dt;nt++)for(let st=0;st<ve;st++){let Nt=nt*(ve+1)+st;ae.push(Nt,Nt+1,Nt+ve+1,Nt+1,Nt+ve+2,Nt+ve+1)}let vt=new ut;vt.setAttribute("position",new Ee(K,3)),vt.setIndex(ae),vt.computeVertexNormals();let lt=new Zt({color:G,metalness:.05,roughness:.075,transparent:!0,opacity:te,depthWrite:!1,side:Ot,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});O.userData.glass=lt,O.userData.originalTint={color:G,opacity:te};let J=m(vt,lt,0,0,0,O);J.castShadow=!1,J.receiveShadow=!1,J.renderOrder=3;let Me=["smoke","highSmoke"].includes(M)?Ke:He;rt(Array.from({length:41},(nt,st)=>{let Nt=ue(-1+st/20,0);return Nt[1]-=.04,Nt}),.045,Ke,O);for(let nt of[0,1])rt(Array.from({length:41},(st,Nt)=>ue(-1+Nt/20,nt)),nt===0?.017:.009,Me,O);for(let nt of[-1,1]){rt(Array.from({length:17},(jt,pt)=>ue(nt,pt/16)),.011,Me,O);let st=ue(nt,0);Fe(.26,.12,.23,.025,Ke,st[0],st[1]-.06,st[2],O),rt([[.99,1.44,nt*1.12],[1.18,1.44,nt*1.02],st],.032,Me,O);let Nt=m(new it(.013,.013,.018,6),He,st[0]+.04,st[1]+.014,st[2],O)}let Ve=new yn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let nt of[-.77,-.69]){let st=Array.from({length:13},(jt,pt)=>{let et=ue(nt,.18+pt*.058);return et[0]+=.004,et}),Nt=rt(st,.003,Ve,O);Nt.castShadow=!1,Nt.receiveShadow=!1,Nt.renderOrder=4}}for(let M of Object.values(Ue.windshield))M.userData.mountRearX=hs([M],M).min.x;let nn=new Ge;for(let M of i.children.slice())M.userData.groundWheel||nn.add(M);i.add(nn);let Ct=s("#b8c7d6",.72,.27),_t=new Ge,qn=[];i.add(_t);for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=new Ge;G.position.set(M,.52,E*1.12),_t.add(G);let te=Array.from({length:193},(lt,J)=>{let Me=J/192,Ve=Me*Math.PI*14;return new w(Math.cos(Ve)*.071,.055+Me*.36,Math.sin(Ve)*.071)}),O=m(new It(new At(te),192,.014,10,!1),Ct,0,0,0,G);m(new it(.039,.039,.23,24),Ke,0,.14,0,G);let ue=m(new it(.018,.018,.28,20),He,0,.34,0,G),K=new Ge;K.position.y=.47,G.add(K);for(let[lt,J]of[[G,.04],[K,-.015]])m(new it(.095,.095,.026,32),He,0,J,0,lt),m(new it(.068,.068,.018,24),Ke,0,J+.02,0,lt);m(new at(.14,.075,.18),Ke,0,.025,E*.035,G),m(new at(.16,.075,.22),Ke,0,0,-E*.075,K);let ae=new w(M,.56,E*1.12),ve=new w(M,.81,E*1.43),dt=ve.clone().sub(ae);m(new it(.026,.026,dt.length(),16),Ke,...ae.clone().add(ve).multiplyScalar(.5).toArray(),_t).quaternion.setFromUnitVectors(new w(0,1,0),dt.normalize()),qn.push({coil:O,rod:ue,upper:K})}Ue.brakes={};for(let M of["stock","red","gold","ceramic"]){let E=new Ge;i.add(E),Ue.brakes[M]=E;for(let{wheelGroup:G,sign:te}of X){let O=fu(M);O.position.z=te*.165,te<0&&(O.rotation.y=Math.PI),G.add(O),E.userData.brakeAssemblies??=[],E.userData.brakeAssemblies.push(O)}}Ue.nitrous={};let ur=document.createElement("canvas");ur.width=512,ur.height=256;let bn=ur.getContext("2d");bn.fillStyle="#101923",bn.fillRect(0,0,512,256),bn.strokeStyle="#e8e1cc",bn.lineWidth=8,bn.strokeRect(10,10,492,236),bn.fillStyle="#f5f2e8",bn.textAlign="center",bn.font="italic bold 106px Arial",bn.fillText("N\u2082O",256,117),bn.font="bold 24px Arial",bn.fillText("NITROUS OXIDE",256,159),bn.fillStyle="#d9b36b",bn.font="bold 18px Arial",bn.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)bn.fillRect(165+M*4,212,M%3+1,17);let oi=new Wt(ur);oi.colorSpace=yt,oi.anisotropy=8;let Hn=document.createElement("canvas");Hn.width=Hn.height=128;let $t=Hn.getContext("2d");$t.fillStyle="#eee9dc",$t.fillRect(0,0,128,128),$t.translate(64,64),$t.strokeStyle="#17202a";for(let M=0;M<=20;M++){let E=-Math.PI*.8+M*Math.PI*1.6/20;$t.lineWidth=M%5?2:4,$t.beginPath(),$t.moveTo(Math.sin(E)*43,-Math.cos(E)*43),$t.lineTo(Math.sin(E)*(M%5?49:53),-Math.cos(E)*(M%5?49:53)),$t.stroke()}$t.fillStyle="#293541",$t.textAlign="center",$t.font="bold 14px Arial",$t.fillText("PSI",0,30),$t.strokeStyle="#c92737",$t.lineWidth=4,$t.beginPath(),$t.moveTo(-9,12),$t.lineTo(26,-31),$t.stroke(),$t.fillStyle="#25313a",$t.beginPath(),$t.arc(0,0,6,0,Math.PI*2),$t.fill();let li=new Wt(Hn);li.colorSpace=yt;for(let M of["blue","twin","triple"]){let E=new Ge;E.name="nitrous-"+M,i.add(E),Ue.nitrous[M]=E;let G=s(n.item("nitrous",M).color,.65,.27),te=M==="triple"?3:M==="twin"?2:1,O=1.49,ue=-1.3,K=.37,ae=s("#b4924f",.8,.3),ve=s("#a5b2bd",.85,.24),dt=s("#1b2028",.08,.85),vt=s("#ab2635",.35,.4);for(let lt of[-1.52,-1.13]){Fe(.095,.05,te*K+.04,.015,u,lt,1.29,0,E);for(let J of[-1,1]){let Me=J*(te*K/2-.02);m(new it(.024,.024,.023,6),ve,lt,1.327,Me,E)}}for(let lt=0;lt<te;lt++){let J=(lt-(te-1)/2)*K,Me=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Qt,En])=>new be(Qt,En)),Ve=m(new rr(Me,40),G,ue,O,J,E);Ve.rotation.z=-Math.PI/2;for(let Qt of[-1.52,-1.13]){Fe(.11,.095,.27,.025,dt,Qt,1.35,J,E);let En=m(new Ft(.152,.013,8,40),ve,Qt,O,J,E);En.rotation.y=Math.PI/2,Fe(.08,.025,.055,.008,ve,Qt,O+.155,J,E),m(new it(.013,.013,.018,6),u,Qt,O+.179,J,E)}let nt=[],st=[],Nt=[];for(let Qt=0;Qt<2;Qt++)for(let En=0;En<=16;En++){let Mi=-.91+En*1.82/16;if(nt.push(ue+(Qt?.12:-.12),O+Math.cos(Mi)*.147,J+Math.sin(Mi)*.147),st.push(Qt,En/16),Qt&&En){let Ti=17+En;Nt.push(Ti-18,Ti-17,Ti,Ti-18,Ti,Ti-1)}}let jt=new ut;jt.setAttribute("position",new Ee(nt,3)),jt.setAttribute("uv",new Ee(st,2)),jt.setIndex(Nt),jt.computeVertexNormals();let pt=new Zt({map:oi,roughness:.55,metalness:.05,side:Ot});m(jt,pt,0,0,0,E);let et=m(new it(.046,.046,.055,24),ae,-.89,O,J,E);et.rotation.z=Math.PI/2,Fe(.075,.07,.065,.012,ae,-.845,O,J,E),m(new it(.016,.016,.065,16),ve,-.845,O+.045,J,E);let Tt=m(new Ft(.052,.012,8,24),vt,-.845,O+.092,J,E);Tt.rotation.x=Math.PI/2;for(let Qt of[0,Math.PI/3,Math.PI*2/3]){let En=Fe(.106,.014,.014,.004,vt,-.845,O+.092,J,E);En.rotation.y=Qt}let Gt=new Ge;Gt.position.set(-.84,O+.065,J+.075),Gt.rotation.x=-Math.PI*.32,E.add(Gt);let gn=m(new it(.057,.057,.03,32),ve,0,0,0,Gt);gn.rotation.x=Math.PI/2;let xn=m(new $n(.047,32),new yn({map:li}),0,0,.017,Gt),an=m(new it(.024,.024,.055,6),ae,-.79,O,J,E);an.rotation.z=Math.PI/2,rt([[-.76,O,J],[-.7,O-.02,J],[-.71,1.3,J],[-.91,1.24,J]],.014,dt,E);let xi=m(new it(.021,.021,.055,12),ve,-.74,O,J,E);xi.rotation.z=Math.PI/2}Fe(.07,.07,te*K,.015,ae,-.91,1.24,0,E),rt([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,dt,E)}Ue.pedals={};for(let M of["classic","aluminium","formula"]){let E=df(M);i.add(E),Ue.pedals[M]=E}Ue.seat={};for(let M of["red","carbon","emerald","ivory"]){let E=vu(M);E.rotation.y=Math.PI/2,E.position.set(-.8,1,0),i.add(E),Ue.seat[M]=E}let ia=hf(T),ci=Jp({paint:a,carbon:Xe,metal:He});i.add(ci.group);function Za(M){for(let{plate:J,sign:Me}of Oe){let Ve=M[Me>0?"frontBumper":"rearBumper"],nt={streetLow:.12,driftWide:.16,trackGT:.22,sport:.18}[Ve];J.position.x=Me*(nt===void 0?["club","rally"].includes(Ve)?2.72:2.605:2.64+nt+.055),J.scale.setScalar(nt===void 0?1:.72),J.position.y=nt===void 0?1.01:1.3}let E=["formula","formulaPro","formulaElite"].includes(M.frontBumper);ia.set(E),D.forEach(J=>J.visible=!E),ci.group.visible=E||M.turbine==="formula",ci.engine.visible=M.turbine==="formula",Le(M);let G=n.glassTints[M.glassTint]||n.glassTints.original;for(let J of Object.values(Ue.windshield)){let Me=J.userData.originalTint;J.userData.glass.color.set(G.opacity===null?Me.color:G.color),J.userData.glass.opacity=G.opacity??Me.opacity,J.userData.glass.iridescence=M.glassTint==="violet"?1:0,J.userData.glass.iridescenceIOR=1.35,J.userData.glass.iridescenceThicknessRange=[180,420],J.userData.glass.roughness=M.glassTint==="black"?.2:.075}let te=(n.wheelDiameters[M.wheelSize]||16)/16,O=(te-1)*(.715/.86),ue={standard:1,wide:1.25,ultra:1.45}[M.tyreWidth]||1;for(let{wheelGroup:J,sign:Me,tyres:Ve}of X){J.scale.set(.88/1.24*te,.88/.86*te,ue/.95),J.position.y=.715/.86*te,J.position.z=Me*(1.36+.25*(ue-1));for(let[nt,st]of Object.entries(Ve))for(let Nt of st)Nt.visible=nt===(M.tyres||"standard")}let K=O+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0);for(let[J,Me]of Object.entries(Ue))if(J!=="brakes")for(let Ve of Object.values(Me))Ve.parent===i&&(Ve.userData.mountBaseY??=Ve.position.y,Ve.position.y=Ve.userData.mountBaseY+K);_i.forEach(J=>J.visible=!M.headlights||M.headlights==="classic");for(let[J,Me]of Object.entries(cn))for(let Ve of Me)Ve.visible=M.fenders===J,J==="club"&&Ve.userData.shell.color.set(n.item("paint",M.paint).color);Ct.color.set(n.item("suspension",M.suspension).color),nn.position.y=K,ci.group.position.y=K-(["formula","aeroPrototype"].includes(M.chassis)?.18:0),_t.visible=K>0,qn.forEach(({coil:J,rod:Me,upper:Ve})=>{J.scale.y=1+K/.415,Me.scale.y=1+K/.28,Me.position.y=.34+K/2,Ve.position.y=.47+K});for(let[J,Me]of Object.entries(Ue))for(let[Ve,nt]of Object.entries(Me))nt.visible=(J==="pedals"?M.pedals||"classic":M[J])===Ve;E&&Object.values(Ue.headlights).forEach(J=>J.visible=!1);for(let[J,Me]of Object.entries(Ue.brakes))for(let Ve of Me.userData.brakeAssemblies||[])Ve.visible=(M.brakes||"stock")===J;Object.entries(se).forEach(([J,Me])=>Me.visible=J===(M.steering||"classic")),Object.entries(Kt).forEach(([J,Me])=>Me.visible=J===(M.exhaust||"classic")),wt.visible=M.turbine==="boost",$e.visible=M.turbine!=="formula";let ae=["twin","twinBig"].includes(M.turbine),ve=M.turbine==="twinBig",dt=ve?.9:ae?.52:M.turbine==="boost"?.96:.9;$e.scale.set(dt/1.24,dt/.86,dt/.95),$e.position.set(Ze,je+(ve?.06:ae?-.2:-.04),ae?ve?-.7:-.44:0),St.visible=ae,St.scale.copy($e.scale),St.position.set(Ze,je+(ve?.06:-.2),ve?.7:.44);let vt=hs(M.turbine==="formula"?[ci.engine]:[$e,St],nn);for(let J of Object.values(Ue.spoiler))J.userData.fitTurbines(vt);let lt=M.badges||[];if(S.forEach(J=>J.visible=!lt.length&&(!M.vinyl||M.vinyl==="none")),ie.forEach(J=>J.userData.plane.visible=!lt.length&&(!M.vinyl||M.vinyl==="none")),Q.forEach(({group:J,mat:Me,back:Ve,n:nt})=>{let st=lt[nt];J.position.x=(nt-(lt.length-1)/2)*.82+.05,J.visible=!!st;let Nt=st+":"+(M.prizeTotal||0);if(!st||Me.userData.badge===Nt)return;let jt=new Xt,pt=.65/512,et=(Tt,Gt)=>[(Tt-256)*pt,(256-Gt)*pt];if(st==="millionaire"||st==="day-hero")jt.absarc(0,0,204*pt,0,Math.PI*2,!1);else if(st==="rating-top10"){for(let Tt=0;Tt<6;Tt++){let Gt=Tt*Math.PI/3-Math.PI/2,gn=et(256+Math.cos(Gt)*215,256+Math.sin(Gt)*215);Tt?jt.lineTo(...gn):jt.moveTo(...gn)}jt.closePath()}else jt.moveTo(...et(80,88)),jt.quadraticCurveTo(...et(256,0),...et(432,88)),jt.lineTo(...et(420,296)),jt.quadraticCurveTo(...et(390,400),...et(256,465)),jt.quadraticCurveTo(...et(122,400),...et(92,296)),jt.closePath();Ve.geometry.dispose(),Ve.geometry=new Ht(jt,{depth:.035,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.014,bevelThickness:.012,curveSegments:24}),Me.map?.dispose(),Me.map=new Wt(n.badgeCanvas(st,M)),Me.map.colorSpace=yt,Me.map.anisotropy=16,Me.emissive.set("#ffffff"),Me.emissiveMap=Me.map,Me.emissiveIntensity=.35,Me.userData.badge=Nt,Me.needsUpdate=!0}),a.color.set(n.item("paint",M.paint).color),o.color.copy(a.color).multiplyScalar(.45),h.color.set(n.wheelPaintColor(M)),k!==M.wheels){for(let J of P)J.removeFromParent(),J.geometry.dispose();P.length=0;for(let{wheelGroup:J,sign:Me}of X)for(let Ve of[1,-1])for(let nt of n.wheelDesign(M.wheels)){let st={bronzeSix:.029,deepFive:.048,muscleFive:.06,triBlade:.105,turbofan:.037,fiveSpoke:.049,legend:.034,splitY:.024,concaveTen:.026,rallyMulti:.02,crossMesh:.014,copper:.015,splitStar:.022,splitSix:.025,forged:.025}[M.wheels]||.02,Nt=[],jt=[];nt.forEach(([Gt,gn],xn)=>{let an=nt[Math.max(0,xn-1)],xi=nt[Math.min(nt.length-1,xn+1)],Qt=xi[0]-an[0],En=xi[1]-an[1],Mi=Math.hypot(Qt,En)||1,Ti=st*(.65+.35*xn/(nt.length-1));Nt.push([Gt-En/Mi*Ti,gn+Qt/Mi*Ti]),jt.push([Gt+En/Mi*Ti,gn-Qt/Mi*Ti])});let pt=new Xt;[...Nt,...jt.reverse()].forEach(([Gt,gn],xn)=>xn?pt.lineTo(Gt,gn):pt.moveTo(Gt,gn)),pt.closePath();let et=new Ht(pt,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1}),Tt=et.attributes.position;for(let Gt=0;Gt<Tt.count;Gt++){let gn=Math.hypot(Tt.getX(Gt),Tt.getY(Gt)),xn=(M.wheels==="deepFive"?.095:M.wheels==="concaveTen"?.075:.025)*(1-Math.min(1,gn/.51));Tt.setZ(Gt,Me*Ve*((Ve===1?.255:.235)-xn+Tt.getZ(Gt)))}Tt.needsUpdate=!0,et.computeVertexNormals(),P.push(m(et,h,0,0,0,J))}k=M.wheels}c.color.set(n.item("trim",M.trim).color),c.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,c.metalness=.95,d.userData.style!==M.upholstery&&(d.map?.dispose(),d.map=new Wt(n.upholsteryCanvas(M.upholstery)),d.map.colorSpace=yt,d.map.wrapS=d.map.wrapT=vn,d.map.repeat.set(12,2),d.color.set("#ffffff"),d.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,d.userData.style=M.upholstery,d.needsUpdate=!0),n.chipPalette(M.chips).forEach((J,Me)=>{tt[Me].color.set(J),tt[Me].roughness=M.chips==="ceramic"?.25:.55}),ft.color.set(n.chipEdgeColor(M.chips)),qe.forEach(J=>{J.visible=!0,J.material.color.set(M.chips==="tournament"?["#c6414f","#e1bc3e","#5b9c69","#4c73c5"][J.userData.edgeIndex%4]:n.chipEdgeColor(M.chips))}),Be.forEach(({mat:J,n:Me})=>{J.userData.style!==M.chips&&(J.map?.dispose(),J.map=new Wt(n.chipCanvas(M.chips,Me)),J.map.colorSpace=yt,J.map.anisotropy=8,J.userData.style=M.chips,J.needsUpdate=!0)}),ye.forEach((J,Me)=>{J.userData.style!==M.cards&&(J.map?.dispose(),J.map=new Wt(n.cardCanvas(M.cards,Me)),J.map.colorSpace=yt,J.map.anisotropy=16,J.userData.style=M.cards,J.needsUpdate=!0)}),P.forEach(J=>J.visible=!0),C.forEach(J=>J.visible=!0),p.color.set(n.item("light",M.light).color),p.emissive.copy(p.color),g.color.copy(p.color).multiplyScalar(.075),g.emissive.copy(p.color),g.emissiveIntensity=.045,pe.userData.number!==M.number+M.region&&(pe.map?.dispose(),pe.map=new Wt(n.plateCanvas(M)),pe.userData.number=M.number+M.region,pe.needsUpdate=!0)}let ds=new Pt({color:p.color.clone(),emissive:p.color.clone(),emissiveIntensity:.65,roughness:.5}),dr=new Ge;nn.add(dr);for(let M of[-1,1]){Fe(2.62,.09,.12,.025,u,-.03,.47,M*.76,dr);let E=m(new at(2.48,.018,.075),ds,-.03,.417,M*.76,dr);for(let G of[-1.13,1.06])Fe(.12,.16,.18,.018,u,G,.53,M*.76,dr)}let Dt=new es(p.color,.45,2,2);Dt.position.set(-1.9,2,.48),nn.add(Dt);let Yn=new Ge;i.add(Yn);let Ln=s("#161d22",.34,.56),Wi=s("#917252",.05,.86),Nr=new Xt;[[-2.55,-.72],[-1.55,-1.03],[.25,-1.1],[.8,-.67],[1.42,-.24],[2.38,-.17],[2.38,.17],[1.42,.24],[.8,.67],[.25,1.1],[-1.55,1.03],[-2.55,.72]].forEach(([M,E],G)=>G?Nr.lineTo(M,E):Nr.moveTo(M,E)),Nr.closePath();let ra=m(new Ht(Nr,{depth:.055,bevelEnabled:!0,bevelThickness:.008,bevelSize:.012,bevelSegments:2}),Ln,0,.48,0,Yn);ra.rotation.x=Math.PI/2,Fe(3.85,.035,.24,.025,Wi,-.08,.395,0,Yn);for(let M of[-1.65,-.8,.15,1.2])for(let E of[-.075,.075]){let G=m(new it(.018,.018,.008,12),He,M,.373,E,Yn)}for(let M of[-1,1]){rt([[-1.85,.4,M*.68],[-.8,.38,M*.79],[.3,.4,M*.82],[.8,.44,M*.51]],.025,Ln,Yn),rt([[-1.85,.4,M*.33],[-.8,.37,M*.37],[.3,.4,M*.39],[.8,.44,M*.27]],.022,Ln,Yn);for(let E=0;E<3;E++){let G=Fe(.32,.11,.022,.008,Ln,.25+E*.19,.44,M*(.98-E*.1),Yn);G.rotation.y=M*-.24}}let sn=new Xt;sn.moveTo(-2.65,.78),sn.lineTo(-1.65,.44),sn.lineTo(-1.65,.36),sn.lineTo(-2.65,.53),sn.closePath();for(let M=-3;M<=3;M++)m(new Ht(sn,{depth:.022,bevelEnabled:!1}),Ln,0,0,M*.205,Yn);let Ri=m(new at(1.04,.035,1.4),Ln,-2.15,.6,0,Yn);Ri.rotation.z=-.32;let Bn=new Ge;i.add(Bn);for(let M of[-1,1]){Fe(2.8,.4,.42,.12,a,-.16,.91,M*1.17,Bn),Fe(2.95,.075,.55,.035,Xe,-.12,.65,M*1.17,Bn),rt([[-1.55,1.14,M*1.28],[-.2,1.17,M*1.35],[1.15,1.1,M*1.13]],.055,c,Bn),Fe(.1,.24,.27,.035,u,1.16,.94,M*1.18,Bn);for(let E=0;E<3;E++)Fe(.025,.19,.29,.008,c,.82-E*.16,1.1,M*1.39,Bn);rt([[1.87,.65,M*.84],[2.18,.78,M*.74],[2.25,.84,0]],.06,c,Bn),Fe(.09,.48,.08,.025,He,-1.95,1.08,M*.67,Bn)}Fe(.48,.08,1.98,.035,Xe,-1.96,1.35,0,Bn),rt([[-2.17,1.4,-.97],[-2.17,1.4,.97]],.025,c,Bn);let un=new Ge;i.add(un);let Zn=s("#e9bd68",.72,.25);for(let M of[-1,1]){m(new Vt(1,32,20),Xe,-.55,1.01,M*.88,un).scale.set(1.15,.28,.34);let G=Fe(.12,.32,.45,.07,u,.42,1.04,M*.89,un);for(let te=0;te<5;te++)Fe(.23,.025,.35,.01,Ke,-.4-te*.16,1.27,M*.88,un);rt([[-1.62,.72,M*.95],[-.8,.69,M*1.22],[.35,.72,M*1.12],[.65,.79,M*.89]],.025,Zn,un);for(let te=0;te<3;te++){let O=Fe(.55,.035,.35,.02,Xe,1.58+te*.17,.55+te*.12,M*(.82+te*.12),un);O.rotation.z=-.2}}let wn=new Xt;wn.moveTo(-1.9,1.2),wn.lineTo(-1.6,1.92),wn.lineTo(-.82,1.6),wn.lineTo(-.6,1.23),wn.closePath();let Ka=m(new Ht(wn,{depth:.045,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:2,steps:1}),Xe,0,0,-.022,un);rt([[-1.9,1.2,0],[-1.6,1.92,0],[-.82,1.6,0]],.018,Zn,un);let fs=s("#597480",.35,.13);fs.transparent=!0,fs.opacity=.42,fs.side=Ot,m(new Vt(1,48,24,0,Math.PI*2,0,Math.PI/2),fs,-.3,1.42,0,un).scale.set(1.25,.52,.46);for(let M of[-1,1])rt([[-1.48,1.43,M*.12],[-1,1.68,M*.39],[-.25,1.94,M*.33],[.6,1.64,M*.28],[.93,1.43,M*.12]],.025,Xe,un);let mf=Kp(i,[Yn,...Object.values(Ue.windshield),...Object.values(Ue.mirrors),...Q.map(M=>M.group),dr,...Object.values(Ue.pedals),un,bt,$e,St,_t,...Object.values(Ue.seat)]),gf=Za;function yu(M){gf(M),Bn.visible=M.chassis==="club",Bn.position.y=nn.position.y,un.visible=M.chassis==="aeroPrototype",un.position.y=nn.position.y;let E=["formula","aeroPrototype"].includes(M.chassis),G=E?1.13:1;mf.set(E);let te=hs([bt],i);for(let O of Object.values(Ue.windshield))O.scale.z=E?.72:1,O.position.x=Zp(te.max.x,O.userData.mountRearX),O.position.y=E?-.135:0;for(let{group:O,sign:ue}of Qe)O.position.z=E?ue*1.19*(Pl(.64)-1):0,O.position.y=E?-.122:0;q.visible=!E,Yn.visible=E,Yn.position.y=nn.position.y;for(let{group:O}of Q)O.position.z=O.userData.side*(E?1.365*Pl(O.position.x)+.045:M.chassis==="club"?1.44:1.39);dr.scale.z=E?.65:1,ds.color.copy(p.color),ds.emissive.copy(p.color);for(let O of[...Et,...Re])O.visible=!E;for(let O of Object.values(Ue.pedals))O.position.x=E?-.65:0,O.position.y=nn.position.y-.06;i.scale.x=1.24*G;for(let{wheelGroup:O}of X)O.scale.x/=G;Dt.color.copy(p.color)}return yu(e),{car:i,update:yu,measureClearance(){let M=hs([bt],i),E=Object.values(Ue.windshield).find(G=>G.visible);return E?hs([E],i).min.x-M.max.x:null}}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new gi({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=yt,n.toneMapping=pi,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Xs,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label",e.transport==="bicycle"?"\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u0432\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C":"\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new zn,s=new rn(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new ri("#c6d9ef","#44311e",1.25));for(let[$,H,Ie,P,C]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let X=new kn($,H);X.position.set(Ie,P,C),X.castShadow=$==="#fff0d0",X.shadow.bias=-2e-4,X.shadow.normalBias=.025,X.shadow.mapSize.set(2048,2048),X.shadow.camera.left=-5,X.shadow.camera.right=5,X.shadow.camera.top=5,X.shadow.camera.bottom=-5,i.add(X)}let a=new zn;a.background=new Je("#48505b");for(let[$,H,Ie,P,C,X]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let k=new ht(new at(P,C,X),new yn({color:"#ffffff"}));k.position.set($,H,Ie),a.add(k)}let o=new Ir(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse($=>{$.geometry?.dispose(),$.material?.dispose()}),o.dispose();let l=new ht(new Yt(30,30),new Jr({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=j0(i,e),u=new Jn({transparent:!0,depthWrite:!1,side:Ot,toneMapped:!1,uniforms:{color:{value:new Je(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=p.x*p.x+p.y*p.y;float halo=exp(-d*3.5);float core=exp(-d*11.);float a=(halo*.42+core*.20)*strength;gl_FragColor=vec4(color,a);}"}),d=new ht(new Yt(7.2,3.8),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let p=[];for(let $ of[-1.15,1.15])for(let H of[-.68,.68]){let Ie=new Qr(u.uniforms.color.value,3.5,3.4,Math.PI*.42,.9,1.5);Ie.position.set($,.36,H),Ie.target.position.set($,0,H),i.add(Ie,Ie.target),p.push(Ie)}["bicycle","scooter","hoverboard"].includes(e.transport)&&(d.visible=!1,p.forEach($=>$.visible=!1));let g=r.closest(".player-hall__room");t.night??=g?.dataset.theme==="midnight";function m($){t.night=!!$;for(let Ie of i.children)Ie.isHemisphereLight&&(Ie.intensity=$?.26:1.25),Ie.isDirectionalLight&&(Ie.userData.dayIntensity??=Ie.intensity,Ie.intensity=Ie.userData.dayIntensity*($?.13:1));i.environmentIntensity=$?.24:1.5;let H=t.neon??window.pokerGarageNeonBrightness?.()??1.5;u.uniforms.strength.value=($?2.1:.95)*H,p.forEach(Ie=>{Ie.intensity=3.5*H*($?1.6:1)}),t.snapshotOnly||R?.request()}let f=$=>{g&&(t.neon=window.pokerGarageNeonBrightness?.()??1.5,m(g.dataset.theme==="midnight"))};window.addEventListener("poker-garage-lighting",f);let v=null;function y(){if(!v){v=new Mn,h.car.updateWorldMatrix(!0,!0);let k=S=>{if(S.visible){S.geometry&&(S.geometry.computeBoundingBox(),v.union(S.geometry.boundingBox.clone().applyMatrix4(S.matrixWorld)));for(let D of S.children)k(D)}};k(h.car)}let $=v.getCenter(new w),H=new w(Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),Math.cos(t.yaw)*Math.cos(t.pitch)),Ie=new w(Math.cos(t.yaw),0,-Math.sin(t.yaw)),P=new w().crossVectors(H,Ie),C=Math.tan(s.fov*Math.PI/360),X=0;for(let k of[v.min.x,v.max.x])for(let S of[v.min.y,v.max.y])for(let D of[v.min.z,v.max.z]){let j=new w(k,S,D).sub($);X=Math.max(X,Math.abs(j.dot(Ie))/(C*s.aspect)+j.dot(H),Math.abs(j.dot(P))/C+j.dot(H))}if(t.parking){let k={"bmw-e60":4.81,"mustang-gt500":4.85,bicycle:1.85,scooter:1.52,hoverboard:1.24},S=v.getSize(new w),D=Math.max(S.x,S.z)/(k[e.transport]||3.1);$.y=v.min.y+.7*D,s.position.copy($).addScaledVector(H,10.5*D),s.lookAt($);return}X=Math.max(X*1.1,["bicycle","scooter","hoverboard"].includes(e.transport)?t.snapshotOnly?6.8:5.2:t.snapshotOnly?_?15:13:_?10.4:9),s.position.copy($).addScaledVector(H,X),s.lookAt($)}let _=["formula","formulaPro","formulaElite"].includes(e.frontBumper),x=$=>{_=["formula","formulaPro","formulaElite"].includes($.frontBumper),h.update($),v=null,u.uniforms.color.value.set(window.PokerGarage.item("light",$.light).color),p.forEach(H=>{H.color.copy(u.uniforms.color.value),H.position.y=.36+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[$.suspension]||0)*.86}),t.snapshotOnly||R?.request()};t.yaw??=.9,t.pitch??=.25,t.manual??=!0;let T=!1,b=null,R=null,B=()=>{let $=r.clientWidth,H=r.clientHeight;$&&H?(n.setSize($,H,!1),s.aspect=$/H,s.updateProjectionMatrix(),t.snapshotOnly||R?.request()):r.isConnected||ze()},U=new ResizeObserver(B);U.observe(r),B();let F=new di(1,1,{type:Rr,depthBuffer:!0});F.samples=4;let I=new zn,L=new or(-1,1,1,-1,0,1),q=new Jn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:F.texture},stepSize:{value:new be}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),W=new ht(new Yt(2,2),q);I.add(W);function re(){let $=n.getDrawingBufferSize(new be);(F.width!==$.x||F.height!==$.y)&&F.setSize($.x,$.y),q.uniforms.stepSize.value.set(3/$.x,3/$.y),n.setRenderTarget(F),n.render(i,s),n.setRenderTarget(null),n.render(I,L)}let ce=$=>{$.button&&$.button!==0||(t.manual=!0,b={id:$.pointerId,x:$.clientX,y:$.clientY},r.setPointerCapture($.pointerId),$.preventDefault())},Y=$=>{!b||b.id!==$.pointerId||(t.yaw-=($.clientX-b.x)*.011,t.pitch=ff(t.pitch+($.clientY-b.y)*.009,-.24,1.35),b.x=$.clientX,b.y=$.clientY,R.request(),$.preventDefault())},he=$=>{b&&b.id===$.pointerId&&(b=null,r.hasPointerCapture($.pointerId)&&r.releasePointerCapture($.pointerId))},Ae=$=>{let H={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};H[$.key]&&(t.manual=!0,t.yaw+=H[$.key][0],t.pitch=ff(t.pitch+H[$.key][1],-.24,1.35),R.request(),$.preventDefault())};r.addEventListener("keydown",Ae),r.addEventListener("pointerdown",ce),r.addEventListener("pointermove",Y),r.addEventListener("pointerup",he),r.addEventListener("pointercancel",he),r.addEventListener("lostpointercapture",he);function ze(){T||(T=!0,window.removeEventListener("poker-garage-lighting",f),R?.dispose(),_e.disconnect(),Pe?.removeEventListener("close",ze),U.disconnect(),r.removeEventListener("keydown",Ae),r.removeEventListener("pointerdown",ce),r.removeEventListener("pointermove",Y),r.removeEventListener("pointerup",he),r.removeEventListener("pointercancel",he),r.removeEventListener("lostpointercapture",he),Yp(i),c.dispose(),F.dispose(),q.dispose(),W.geometry.dispose(),n.dispose(),n.forceContextLoss(),n.domElement.remove())}let Pe=r.closest("dialog");Pe?.addEventListener("close",ze);function We($){if(T)return;if(!r.isConnected||Pe&&!Pe.open){ze();return}s.zoom=(t.previewScale||1)*(t.zoom||1),s.updateProjectionMatrix();let H=r.getBoundingClientRect();H.bottom>0&&H.top<innerHeight&&H.right>0&&H.left<innerWidth&&(h.animate?.($),y(),re(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual))}let Le=!0,_e=new IntersectionObserver($=>{Le=$.some(H=>H.isIntersecting),Le&&!t.snapshotOnly&&R?.request()});return _e.observe(r),R=qp({render:We,active:()=>!!h.animate&&!t.snapshotOnly&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!T&&r.isConnected&&Le&&(!Pe||Pe.open)}),m(t.night),t.snapshotOnly||R.request(),{update:x,setNight:m,dispose:ze,state:t,invalidate:()=>R.request(),measureClearance:()=>h.measureClearance(),snapshot(){y(),re();let $=document.createElement("canvas");return $.width=n.domElement.width,$.height=n.domElement.height,$.getContext("2d").drawImage(n.domElement,0,0),$}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
