(()=>{function lh({render:r,active:e=()=>!1,fps:t=30,document:n=document,requestFrame:i=requestAnimationFrame,cancelFrame:s=cancelAnimationFrame}){let a=0,o=!1,c=!1,l=-1/0;function h(){c||(o=!0,!n.hidden&&!a&&(a=i(u)))}function u(p){if(a=0,c||n.hidden)return;let v=e();(o||v)&&p-l>=1e3/t-.1&&(o=!1,l=p,r(p)),!a&&!c&&(o||e())&&(a=i(u))}function d(){n.hidden?(s(a),a=0):h()}return n.addEventListener("visibilitychange",d),{request:h,dispose(){c=!0,s(a),a=0,n.removeEventListener("visibilitychange",d)}}}function ch(r){let e=new Set,t=new Set,n=new Set,i=s=>{Array.isArray(s)?s.forEach(i):s?.isMaterial&&t.add(s)};r.traverse(s=>{s.geometry&&e.add(s.geometry),i(s.material),i(s.customDepthMaterial),i(s.customDistanceMaterial)});for(let s of t){for(let a of Object.values(s))a?.isTexture&&n.add(a);s.dispose()}n.forEach(s=>s.dispose()),e.forEach(s=>s.dispose())}function hh(r,e,t=.18){return Math.max(0,r+t-e)}var Zh=0,Yl=1,Jh=2;var Zl=1,cs=2,Ei=3,hs=0,ei=1,Wt=2,rr=0,oa=1,Jl=2,Kl=3,$l=4,Kh=5,us=100,$h=101,Qh=102,eu=103,tu=104,nu=200,iu=201,ru=202,su=203,au=204,ou=205,lu=206,cu=207,hu=208,uu=209,du=210,pu=211,fu=212,mu=213,gu=214,Io=0,Lo=1,Do=2,la=3,Uo=4,No=5,Bo=6,Fo=7,vu=0,yu=1,_u=2,Hi=0,xu=1,Mu=2,Tu=3,ai=4,bu=5,Su=6,wu=7,Bl="attached",Eu="detached",Ql=300,ds=301,br=302,Oo=303,zo=304,ca=306,An=1e3,Jr=1001,Za=1002,Si=1003,Au=1004;var ha=1005;var Hn=1006,Go=1007;var vi=1008;var Ai=1009,ec=1010,tc=1011,ps=1012,ko=1013,Sr=1014,oi=1015,sr=1016,Vo=1017,Ho=1018,fs=1020,nc=35902,ic=35899,Cu=1021,Ru=1022,li=1023,ua=1026,da=1027,Wo=1028,Xo=1029,Pu=1030,rc=1031;var sc=1033,jo=33776,qo=33777,Yo=33778,Zo=33779,ac=35840,oc=35841,lc=35842,cc=35843,hc=36196,uc=37492,dc=37496,pc=37808,fc=37809,mc=37810,gc=37811,vc=37812,yc=37813,_c=37814,xc=37815,Mc=37816,Tc=37817,bc=37818,Sc=37819,wc=37820,Ec=37821,Ac=36492,Cc=36494,Rc=36495,Pc=36283,Ic=36284,Lc=36285,Dc=36286;var Ds=2300,Ja=2301,ja=2302,Fl=2400,Ol=2401,zl=2402;var ms=3201;var Iu=0,Lu=1,wr="",bt="srgb",mr="srgb-linear",Us="linear",Qt="srgb";var fr=7680;var Du=512,Uu=513,Nu=514,Uc=515,Bu=516,Fu=517,Ou=518,zu=519,Gl=35044;var Nc="300 es",Oi=2e3,Ns=2001;var zi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var qa=Math.PI/180,Bs=180/Math.PI;function Er(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(In[255&r]+In[r>>8&255]+In[r>>16&255]+In[r>>24&255]+"-"+In[255&e]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[63&t|128]+In[t>>8&255]+"-"+In[t>>16&255]+In[t>>24&255]+In[255&n]+In[n>>8&255]+In[n>>16&255]+In[n>>24&255]).toLowerCase()}function Ut(r,e,t){return Math.max(e,Math.min(t,r))}function Vd(r,e){return(r%e+e)%e}function rl(r,e,t){return(1-t)*r+t*e}function Ms(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Vn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var Me=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Un=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],v=s[a+2],m=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=v,void(e[t+3]=m);if(u!==m||c!==d||l!==p||h!==v){let f=1-o,g=c*d+l*p+h*v+u*m,y=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){let T=Math.sqrt(_),b=Math.atan2(T,g*y);f=Math.sin(f*b)/T,o=Math.sin(o*b)/T}let x=o*y;if(c=c*f+d*x,l=l*f+p*x,h=h*f+v*x,u=u*f+m*x,f===1-o){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],v=s[a+3];return e[t]=o*v+h*u+c*p-l*d,e[t+1]=c*v+h*d+l*u-o*p,e[t+2]=l*v+h*p+o*d-c*u,e[t+3]=h*v-o*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),p=c(i/2),v=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*p*v,this._y=l*p*u-d*h*v,this._z=l*h*v+d*p*u,this._w=l*h*u-d*p*v;break;case"YXZ":this._x=d*h*u+l*p*v,this._y=l*p*u-d*h*v,this._z=l*h*v-d*p*u,this._w=l*h*u+d*p*v;break;case"ZXY":this._x=d*h*u-l*p*v,this._y=l*p*u+d*h*v,this._z=l*h*v+d*p*u,this._w=l*h*u-d*p*v;break;case"ZYX":this._x=d*h*u-l*p*v,this._y=l*p*u+d*h*v,this._z=l*h*v-d*p*u,this._w=l*h*u+d*p*v;break;case"YZX":this._x=d*h*u+l*p*v,this._y=l*p*u+d*h*v,this._z=l*h*v-d*p*u,this._w=l*h*u-d*p*v;break;case"XZY":this._x=d*h*u-l*p*v,this._y=l*p*u-d*h*v,this._z=l*h*v+d*p*u,this._w=l*h*u+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sl.copy(this).projectOnVector(e),this.sub(sl)}reflect(e){return this.sub(sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},sl=new w,uh=new Un,At=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],v=n[8],m=i[0],f=i[3],g=i[6],y=i[1],_=i[4],x=i[7],T=i[2],b=i[5],I=i[8];return s[0]=a*m+o*y+c*T,s[3]=a*f+o*_+c*b,s[6]=a*g+o*x+c*I,s[1]=l*m+h*y+u*T,s[4]=l*f+h*_+u*b,s[7]=l*g+h*x+u*I,s[2]=d*m+p*y+v*T,s[5]=d*f+p*_+v*b,s[8]=d*g+p*x+v*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,p=l*s-a*c,v=t*u+n*d+i*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/v;return e[0]=u*m,e[1]=(i*l-h*n)*m,e[2]=(o*n-i*a)*m,e[3]=d*m,e[4]=(h*t-i*c)*m,e[5]=(i*s-o*t)*m,e[6]=p*m,e[7]=(n*c-l*t)*m,e[8]=(a*t-n*s)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(al.makeScale(e,t)),this}rotate(e){return this.premultiply(al.makeRotation(-e)),this}translate(e,t){return this.premultiply(al.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},al=new At;function Bc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Kr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Gu(){let r=Kr("canvas");return r.style.display="block",r}var dh={};function $r(r){r in dh||(dh[r]=!0,console.warn(r))}function ku(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var ph=new At().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fh=new At().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hd(){let r={enabled:!0,workingColorSpace:mr,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Qt&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(i.r=Zr(i.r),i.g=Zr(i.g),i.b=Zr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Us:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return $r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return $r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[mr]:{primaries:e,whitePoint:n,transfer:Us,toXYZ:ph,fromXYZ:fh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:n,transfer:Qt,toXYZ:ph,fromXYZ:fh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),r}var jt=Hd();function Fi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Zr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var Br,Ka=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Br===void 0&&(Br=Kr("canvas")),Br.width=e.width,Br.height=e.height;let i=Br.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Br}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Kr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*Fi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Fi(t[n]/255)):t[n]=Fi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wd=0,Qr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=Er(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ol(i[a].image)):s.push(ol(i[a]))}else s=ol(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function ol(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ka.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xd=0,ll=new w,Dn=class r extends zi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Er(),this.name="",this.source=new Qr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new At,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ll).x}get height(){return this.source.getSize(ll).y}get depth(){return this.source.getSize(ll).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ql)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case An:e.x=e.x-Math.floor(e.x);break;case Jr:e.x=e.x<0?0:1;break;case Za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case An:e.y=e.y-Math.floor(e.y);break;case Jr:e.y=e.y<0?0:1;break;case Za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Dn.DEFAULT_IMAGE=null,Dn.DEFAULT_MAPPING=Ql,Dn.DEFAULT_ANISOTROPY=1;var qt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],v=c[9],m=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(v-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(v+f)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,x=(p+1)/2,T=(g+1)/2,b=(h+d)/4,I=(u+m)/4,O=(v+f)/4;return _>x&&_>T?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=I/n):x>T?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=O/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=I/s,i=O/s),this.set(n,i,s,t),this}let y=Math.sqrt((f-v)*(f-v)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(f-v)/y,this.y=(u-m)/y,this.z=(d-h)/y,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this.w=Ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this.w=Ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$a=class extends zi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Dn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Qr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},si=class extends $a{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Fs=class extends Dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Si,this.minFilter=Si,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qa=class extends Dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Si,this.minFilter=Si,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pi):pi.fromBufferAttribute(s,a),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ya.copy(n.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),_a.subVectors(this.max,Ts),Fr.subVectors(e.a,Ts),Or.subVectors(e.b,Ts),zr.subVectors(e.c,Ts),qi.subVectors(Or,Fr),Yi.subVectors(zr,Or),hr.subVectors(Fr,zr);let t=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-hr.z,hr.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,hr.z,0,-hr.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-hr.y,hr.x,0];return!!cl(t,Fr,Or,zr,_a)&&(t=[1,0,0,0,1,0,0,0,1],!!cl(t,Fr,Or,zr,_a)&&(xa.crossVectors(qi,Yi),t=[xa.x,xa.y,xa.z],cl(t,Fr,Or,zr,_a)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(pi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ii=[new w,new w,new w,new w,new w,new w,new w,new w],pi=new w,ya=new Mn,Fr=new w,Or=new w,zr=new w,qi=new w,Yi=new w,hr=new w,Ts=new w,_a=new w,xa=new w,ur=new w;function cl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ur.fromArray(r,s);let o=i.x*Math.abs(ur.x)+i.y*Math.abs(ur.y)+i.z*Math.abs(ur.z),c=e.dot(ur),l=t.dot(ur),h=n.dot(ur);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var jd=new Mn,bs=new w,hl=new w,Kn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):jd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bs.subVectors(e,this.center);let t=bs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(bs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bs.copy(e.center).add(hl)),this.expandByPoint(bs.copy(e.center).sub(hl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Li=new w,ul=new w,Ma=new w,Zi=new w,dl=new w,Ta=new w,pl=new w,gr=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ul.copy(e).add(t).multiplyScalar(.5),Ma.copy(t).sub(e).normalize(),Zi.copy(this.origin).sub(ul);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ma),o=Zi.dot(this.direction),c=-Zi.dot(Ma),l=Zi.lengthSq(),h=Math.abs(1-a*a),u,d,p,v;if(h>0)if(u=a*c-o,d=a*o-c,v=s*h,u>=0)if(d>=-v)if(d<=v){let m=1/h;u*=m,d*=m,p=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d<=-v?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=v?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ul).addScaledVector(Ma,d),p}intersectSphere(e,t){Li.subVectors(e.center,this.origin);let n=Li.dot(this.direction),i=Li.dot(Li)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,n,i,s){dl.subVectors(t,e),Ta.subVectors(n,e),pl.crossVectors(dl,Ta);let a,o=this.direction.dot(pl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Zi.subVectors(this.origin,e);let c=a*this.direction.dot(Ta.crossVectors(Zi,Ta));if(c<0)return null;let l=a*this.direction.dot(dl.cross(Zi));if(l<0||c+l>o)return null;let h=-a*Zi.dot(pl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ht=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,p,v,m,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,p,v,m,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,p,v,m,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=v,g[11]=m,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Gr.setFromMatrixColumn(e,0).length(),s=1/Gr.setFromMatrixColumn(e,1).length(),a=1/Gr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,v=o*h,m=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+v*l,t[5]=d-m*l,t[9]=-o*c,t[2]=m-d*l,t[6]=v+p*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,v=l*h,m=l*u;t[0]=d+m*o,t[4]=v*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-v,t[6]=m+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,v=l*h,m=l*u;t[0]=d-m*o,t[4]=-a*u,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*h,t[9]=m-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,p=a*u,v=o*h,m=o*u;t[0]=c*h,t[4]=v*l-p,t[8]=d*l+m,t[1]=c*u,t[5]=m*l+d,t[9]=p*l-v,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,p=a*l,v=o*c,m=o*l;t[0]=c*h,t[4]=m-d*u,t[8]=v*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*u+v,t[10]=d-m*u}else if(e.order==="XZY"){let d=a*c,p=a*l,v=o*c,m=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+m,t[5]=a*h,t[9]=p*u-v,t[2]=v*u-p,t[6]=o*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qd,e,Yd)}lookAt(e,t,n){let i=this.elements;return Yn.subVectors(e,t),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),Ji.crossVectors(n,Yn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),Ji.crossVectors(n,Yn)),Ji.normalize(),ba.crossVectors(Yn,Ji),i[0]=Ji.x,i[4]=ba.x,i[8]=Yn.x,i[1]=Ji.y,i[5]=ba.y,i[9]=Yn.y,i[2]=Ji.z,i[6]=ba.z,i[10]=Yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],v=n[2],m=n[6],f=n[10],g=n[14],y=n[3],_=n[7],x=n[11],T=n[15],b=i[0],I=i[4],O=i[8],N=i[12],F=i[1],P=i[5],L=i[9],q=i[13],W=i[2],$=i[6],ae=i[10],Z=i[14],oe=i[3],Ue=i[7],Fe=i[11],Te=i[15];return s[0]=a*b+o*F+c*W+l*oe,s[4]=a*I+o*P+c*$+l*Ue,s[8]=a*O+o*L+c*ae+l*Fe,s[12]=a*N+o*q+c*Z+l*Te,s[1]=h*b+u*F+d*W+p*oe,s[5]=h*I+u*P+d*$+p*Ue,s[9]=h*O+u*L+d*ae+p*Fe,s[13]=h*N+u*q+d*Z+p*Te,s[2]=v*b+m*F+f*W+g*oe,s[6]=v*I+m*P+f*$+g*Ue,s[10]=v*O+m*L+f*ae+g*Fe,s[14]=v*N+m*q+f*Z+g*Te,s[3]=y*b+_*F+x*W+T*oe,s[7]=y*I+_*P+x*$+T*Ue,s[11]=y*O+_*L+x*ae+T*Fe,s[15]=y*N+_*q+x*Z+T*Te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*p-n*c*p)+e[7]*(+t*c*p-t*l*d+s*a*d-i*a*p+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*p-s*a*u+n*a*p+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],v=e[12],m=e[13],f=e[14],g=e[15],y=u*f*l-m*d*l+m*c*p-o*f*p-u*c*g+o*d*g,_=v*d*l-h*f*l-v*c*p+a*f*p+h*c*g-a*d*g,x=h*m*l-v*u*l+v*o*p-a*m*p-h*o*g+a*u*g,T=v*u*c-h*m*c-v*o*d+a*m*d+h*o*f-a*u*f,b=t*y+n*_+i*x+s*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/b;return e[0]=y*I,e[1]=(m*d*s-u*f*s-m*i*p+n*f*p+u*i*g-n*d*g)*I,e[2]=(o*f*s-m*c*s+m*i*l-n*f*l-o*i*g+n*c*g)*I,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*p-n*c*p)*I,e[4]=_*I,e[5]=(h*f*s-v*d*s+v*i*p-t*f*p-h*i*g+t*d*g)*I,e[6]=(v*c*s-a*f*s-v*i*l+t*f*l+a*i*g-t*c*g)*I,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*p+t*c*p)*I,e[8]=x*I,e[9]=(v*u*s-h*m*s-v*n*p+t*m*p+h*n*g-t*u*g)*I,e[10]=(a*m*s-v*o*s+v*n*l-t*m*l-a*n*g+t*o*g)*I,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*p-t*o*p)*I,e[12]=T*I,e[13]=(h*m*i-v*u*i+v*n*d-t*m*d-h*n*f+t*u*f)*I,e[14]=(v*o*i-a*m*i-v*n*c+t*m*c+a*n*f-t*o*f)*I,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*I,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,p=s*h,v=s*u,m=a*h,f=a*u,g=o*u,y=c*l,_=c*h,x=c*u,T=n.x,b=n.y,I=n.z;return i[0]=(1-(m+g))*T,i[1]=(p+x)*T,i[2]=(v-_)*T,i[3]=0,i[4]=(p-x)*b,i[5]=(1-(d+g))*b,i[6]=(f+y)*b,i[7]=0,i[8]=(v+_)*I,i[9]=(f-y)*I,i[10]=(1-(d+m))*I,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Gr.set(i[0],i[1],i[2]).length(),a=Gr.set(i[4],i[5],i[6]).length(),o=Gr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],fi.copy(this);let c=1/s,l=1/a,h=1/o;return fi.elements[0]*=c,fi.elements[1]*=c,fi.elements[2]*=c,fi.elements[4]*=l,fi.elements[5]*=l,fi.elements[6]*=l,fi.elements[8]*=h,fi.elements[9]*=h,fi.elements[10]*=h,t.setFromRotationMatrix(fi),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),v,m;if(c)v=s/(a-s),m=a*s/(a-s);else if(o===Oi)v=-(a+s)/(a-s),m=-2*a*s/(a-s);else{if(o!==Ns)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);v=-a/(a-s),m=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),v,m;if(c)v=1/(a-s),m=a/(a-s);else if(o===Oi)v=-2/(a-s),m=-(a+s)/(a-s);else{if(o!==Ns)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);v=-1/(a-s),m=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=v,l[14]=m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Gr=new w,fi=new ht,qd=new w(0,0,0),Yd=new w(1,1,1),Ji=new w,ba=new w,Yn=new w,mh=new ht,gh=new Un,gi=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gh.setFromEuler(this),this.setFromQuaternion(gh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gi.DEFAULT_ORDER="XYZ";var Os=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Zd=0,vh=new w,kr=new Un,Di=new ht,Sa=new w,Ss=new w,Jd=new w,Kd=new Un,yh=new w(1,0,0),_h=new w(0,1,0),xh=new w(0,0,1),Mh={type:"added"},$d={type:"removed"},Vr={type:"childadded",child:null},fl={type:"childremoved",child:null},gn=class r extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new gi,n=new Un,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new At}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return kr.setFromAxisAngle(e,t),this.quaternion.multiply(kr),this}rotateOnWorldAxis(e,t){return kr.setFromAxisAngle(e,t),this.quaternion.premultiply(kr),this}rotateX(e){return this.rotateOnAxis(yh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(xh,e)}translateOnAxis(e,t){return vh.copy(e).applyQuaternion(this.quaternion),this.position.add(vh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(xh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Sa.copy(e):Sa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(Ss,Sa,this.up):Di.lookAt(Sa,Ss,this.up),this.quaternion.setFromRotationMatrix(Di),i&&(Di.extractRotation(i.matrixWorld),kr.setFromRotationMatrix(Di),this.quaternion.premultiply(kr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mh),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($d),fl.child=e,this.dispatchEvent(fl),fl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Di.multiply(e.parent.matrixWorld)),e.applyMatrix4(Di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mh),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,e,Jd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Kd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};gn.DEFAULT_UP=new w(0,1,0),gn.DEFAULT_MATRIX_AUTO_UPDATE=!0,gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mi=new w,Ui=new w,ml=new w,Ni=new w,Hr=new w,Wr=new w,Th=new w,gl=new w,vl=new w,yl=new w,_l=new qt,xl=new qt,Ml=new qt,Bi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),mi.subVectors(e,t),i.cross(mi);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){mi.subVectors(i,t),Ui.subVectors(n,t),ml.subVectors(e,t);let a=mi.dot(mi),o=mi.dot(Ui),c=mi.dot(ml),l=Ui.dot(Ui),h=Ui.dot(ml),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(l*c-o*h)*d,v=(a*h-o*c)*d;return s.set(1-p-v,v,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ni)!==null&&Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,Ni)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ni.x),c.addScaledVector(a,Ni.y),c.addScaledVector(o,Ni.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return _l.setScalar(0),xl.setScalar(0),Ml.setScalar(0),_l.fromBufferAttribute(e,t),xl.fromBufferAttribute(e,n),Ml.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(_l,s.x),a.addScaledVector(xl,s.y),a.addScaledVector(Ml,s.z),a}static isFrontFacing(e,t,n,i){return mi.subVectors(n,t),Ui.subVectors(e,t),mi.cross(Ui).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mi.subVectors(this.c,this.b),Ui.subVectors(this.a,this.b),.5*mi.cross(Ui).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Hr.subVectors(i,n),Wr.subVectors(s,n),gl.subVectors(e,n);let c=Hr.dot(gl),l=Wr.dot(gl);if(c<=0&&l<=0)return t.copy(n);vl.subVectors(e,i);let h=Hr.dot(vl),u=Wr.dot(vl);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Hr,a);yl.subVectors(e,s);let p=Hr.dot(yl),v=Wr.dot(yl);if(v>=0&&p<=v)return t.copy(s);let m=p*l-c*v;if(m<=0&&l>=0&&v<=0)return o=l/(l-v),t.copy(n).addScaledVector(Wr,o);let f=h*v-p*u;if(f<=0&&u-h>=0&&p-v>=0)return Th.subVectors(s,i),o=(u-h)/(u-h+(p-v)),t.copy(i).addScaledVector(Th,o);let g=1/(f+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Hr,a).addScaledVector(Wr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},wa={h:0,s:0,l:0};function Tl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var lt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,jt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,jt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=jt.workingColorSpace){if(e=Vd(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Tl(a,s,e+1/3),this.g=Tl(a,s,e),this.b=Tl(a,s,e-1/3)}return jt.colorSpaceToWorking(this,i),this}setStyle(e,t=bt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let n=Vu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=Zr(e.r),this.g=Zr(e.g),this.b=Zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return jt.workingToColorSpace(Ln.copy(this),e),65536*Math.round(Ut(255*Ln.r,0,255))+256*Math.round(Ut(255*Ln.g,0,255))+Math.round(Ut(255*Ln.b,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jt.workingColorSpace){jt.workingToColorSpace(Ln.copy(this),t);let n=Ln.r,i=Ln.g,s=Ln.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=jt.workingColorSpace){return jt.workingToColorSpace(Ln.copy(this),t),e.r=Ln.r,e.g=Ln.g,e.b=Ln.b,e}getStyle(e=bt){jt.workingToColorSpace(Ln.copy(this),e);let t=Ln.r,n=Ln.g,i=Ln.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+t,Ki.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ki),e.getHSL(wa);let n=rl(Ki.h,wa.h,t),i=rl(Ki.s,wa.s,t),s=rl(Ki.l,wa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ln=new lt;lt.NAMES=Vu;var Qd=0,wi=class extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Er(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Wn=class extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},lm=ep();function ep(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var mn=new w,Ea=new Me,tp=0,En=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gl,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ea.fromBufferAttribute(this,t),Ea.applyMatrix3(e),this.setXY(t,Ea.x,Ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix3(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ms(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ms(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ms(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ms(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ms(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array),i=Vn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Vn(t,this.array),n=Vn(n,this.array),i=Vn(i,this.array),s=Vn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gl&&(e.usage=this.usage),e}};var vr=class extends En{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var zs=class extends En{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Re=class extends En{constructor(e,t,n){super(new Float32Array(e),t,n)}},np=0,ri=new ht,bl=new gn,Xr=new w,Zn=new Mn,ws=new Mn,wn=new w,ut=class r extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bc(e)?zs:vr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new At().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ri.makeRotationFromQuaternion(e),this.applyMatrix4(ri),this}rotateX(e){return ri.makeRotationX(e),this.applyMatrix4(ri),this}rotateY(e){return ri.makeRotationY(e),this.applyMatrix4(ri),this}rotateZ(e){return ri.makeRotationZ(e),this.applyMatrix4(ri),this}translate(e,t,n){return ri.makeTranslation(e,t,n),this.applyMatrix4(ri),this}scale(e,t,n){return ri.makeScale(e,t,n),this.applyMatrix4(ri),this}lookAt(e){return bl.lookAt(e),bl.updateMatrix(),this.applyMatrix4(bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xr).negate(),this.translate(Xr.x,Xr.y,Xr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Re(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Zn.setFromBufferAttribute(s),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ws.setFromBufferAttribute(o),this.morphTargetsRelative?(wn.addVectors(Zn.min,ws.min),Zn.expandByPoint(wn),wn.addVectors(Zn.max,ws.max),Zn.expandByPoint(wn)):(Zn.expandByPoint(ws.min),Zn.expandByPoint(ws.max))}Zn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)wn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(wn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)wn.fromBufferAttribute(o,l),c&&(Xr.fromBufferAttribute(e,l),wn.add(Xr)),i=Math.max(i,n.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new w,c[O]=new w;let l=new w,h=new w,u=new w,d=new Me,p=new Me,v=new Me,m=new w,f=new w;function g(O,N,F){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,F),d.fromBufferAttribute(s,O),p.fromBufferAttribute(s,N),v.fromBufferAttribute(s,F),h.sub(l),u.sub(l),p.sub(d),v.sub(d);let P=1/(p.x*v.y-v.x*p.y);isFinite(P)&&(m.copy(h).multiplyScalar(v.y).addScaledVector(u,-p.y).multiplyScalar(P),f.copy(u).multiplyScalar(p.x).addScaledVector(h,-v.x).multiplyScalar(P),o[O].add(m),o[N].add(m),o[F].add(m),c[O].add(f),c[N].add(f),c[F].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let O=0,N=y.length;O<N;++O){let F=y[O],P=F.start;for(let L=P,q=P+F.count;L<q;L+=3)g(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let _=new w,x=new w,T=new w,b=new w;function I(O){T.fromBufferAttribute(i,O),b.copy(T);let N=o[O];_.copy(N),_.sub(T.multiplyScalar(T.dot(N))).normalize(),x.crossVectors(b,N);let F=x.dot(c[O])<0?-1:1;a.setXYZW(O,_.x,_.y,_.z,F)}for(let O=0,N=y.length;O<N;++O){let F=y[O],P=F.start;for(let L=P,q=P+F.count;L<q;L+=3)I(e.getX(L+0)),I(e.getX(L+1)),I(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new En(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){let v=e.getX(d+0),m=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,v),s.fromBufferAttribute(t,m),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wn.fromBufferAttribute(e,t),wn.normalize(),e.setXYZ(t,wn.x,wn.y,wn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),p=0,v=0;for(let m=0,f=c.length;m<f;m++){p=o.isInterleavedBufferAttribute?c[m]*o.data.stride+o.offset:c[m]*h;for(let g=0;g<h;g++)d[v++]=l[p++]}return new En(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bh=new ht,dr=new gr,Aa=new Kn,Sh=new w,Ca=new w,Ra=new w,Pa=new w,Sl=new w,Ia=new w,wh=new w,La=new w,ct=class extends gn{constructor(e=new ut,t=new Wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Ia.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Sl.fromBufferAttribute(u,e),a?Ia.addScaledVector(Sl,h):Ia.addScaledVector(Sl.sub(t),h))}t.add(Ia)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(s),dr.copy(e.ray).recast(e.near),Aa.containsPoint(dr.origin)===!1&&(dr.intersectSphere(Aa,Sh)===null||dr.origin.distanceToSquared(Sh)>(e.far-e.near)**2))return;bh.copy(s).invert(),dr.copy(e.ray).applyMatrix4(bh),n.boundingBox!==null&&dr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,dr)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,m=d.length;v<m;v++){let f=d[v],g=a[f.materialIndex];for(let y=Math.max(f.start,p.start),_=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));y<_;y+=3)i=Da(this,g,e,n,l,h,u,o.getX(y),o.getX(y+1),o.getX(y+2)),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let v=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);v<m;v+=3)i=Da(this,a,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let v=0,m=d.length;v<m;v++){let f=d[v],g=a[f.materialIndex];for(let y=Math.max(f.start,p.start),_=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));y<_;y+=3)i=Da(this,g,e,n,l,h,u,y,y+1,y+2),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let v=Math.max(0,p.start),m=Math.min(c.count,p.start+p.count);v<m;v+=3)i=Da(this,a,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),t.push(i))}};function Da(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Ca),r.getVertexPosition(c,Ra),r.getVertexPosition(l,Pa);let h=(function(u,d,p,v,m,f,g,y){let _;if(_=d.side===1?v.intersectTriangle(g,f,m,!0,y):v.intersectTriangle(m,f,g,d.side===0,y),_===null)return null;La.copy(y),La.applyMatrix4(u.matrixWorld);let x=p.ray.origin.distanceTo(La);return x<p.near||x>p.far?null:{distance:x,point:La.clone(),object:u}})(r,e,t,n,Ca,Ra,Pa,wh);if(h){let u=new w;Bi.getBarycoord(wh,Ca,Ra,Pa,u),i&&(h.uv=Bi.getInterpolatedAttribute(i,o,c,l,u,new Me)),s&&(h.uv1=Bi.getInterpolatedAttribute(s,o,c,l,u,new Me)),a&&(h.normal=Bi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};Bi.getNormal(Ca,Ra,Pa,d.normal),h.face=d,h.barycoord=u}return h}var tt=class r extends ut{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,p=0;function v(m,f,g,y,_,x,T,b,I,O,N){let F=x/I,P=T/O,L=x/2,q=T/2,W=b/2,$=I+1,ae=O+1,Z=0,oe=0,Ue=new w;for(let Fe=0;Fe<ae;Fe++){let Te=Fe*P-q;for(let ze=0;ze<$;ze++){let Ce=ze*F-L;Ue[m]=Ce*y,Ue[f]=Te*_,Ue[g]=W,l.push(Ue.x,Ue.y,Ue.z),Ue[m]=0,Ue[f]=0,Ue[g]=b>0?1:-1,h.push(Ue.x,Ue.y,Ue.z),u.push(ze/I),u.push(1-Fe/O),Z+=1}}for(let Fe=0;Fe<O;Fe++)for(let Te=0;Te<I;Te++){let ze=d+Te+$*Fe,Ce=d+Te+$*(Fe+1),ne=d+(Te+1)+$*(Fe+1),_e=d+(Te+1)+$*Fe;c.push(ze,Ce,_e),c.push(Ce,ne,_e),oe+=6}o.addGroup(p,oe,N),p+=oe,d+=Z}v("z","y","x",-1,-1,n,t,e,a,s,0),v("z","y","x",1,-1,n,t,-e,a,s,1),v("x","z","y",1,1,e,n,t,i,a,2),v("x","z","y",1,-1,e,n,-t,i,a,3),v("x","y","z",1,-1,e,t,n,i,s,4),v("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ar(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Fn(r){let e={};for(let t=0;t<r.length;t++){let n=Ar(r[t]);for(let i in n)e[i]=n[i]}return e}function Fc(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:jt.workingColorSpace}var Hu={clone:Ar,merge:Fn},Xn=class extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},es=class extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=Oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$i=new w,Eh=new Me,Ah=new Me,an=class extends es{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Bs*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*qa*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Bs*Math.atan(Math.tan(.5*qa*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,Eh,Ah),t.subVectors(Ah,Eh)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*qa*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},jr=-90,eo=class extends gn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new an(jr,1,e,t);i.layers=this.layers,this.add(i);let s=new an(jr,1,e,t);s.layers=this.layers,this.add(s);let a=new an(jr,1,e,t);a.layers=this.layers,this.add(a);let o=new an(jr,1,e,t);o.layers=this.layers,this.add(o);let c=new an(jr,1,e,t);c.layers=this.layers,this.add(c);let l=new an(jr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===Oi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Ns)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},Gs=class extends Dn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},to=class extends si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Gs(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new tt(5,5,5),s=new Xn({name:"CubemapFromEquirect",uniforms:Ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ct(i,s),o=t.minFilter;return t.minFilter===vi&&(t.minFilter=Hn),new eo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Xe=class extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}},ip={type:"move"},ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let m of e.hand.values()){let f=t.getJointPose(m,n),g=this._getHandJoint(l,m);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,v=.005;l.inputState.pinching&&d>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ip)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Nn=class extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var cm=new w;var hm=new w,um=new w,dm=new w,pm=new Me,fm=new Me,mm=new ht,gm=new w,vm=new w,ym=new w,_m=new Me,xm=new Me,Mm=new Me;var Tm=new w,bm=new w;var Ch=new w,Rh=new qt,Ph=new qt,rp=new w,Ih=new ht,Ua=new w,wl=new Kn,Lh=new ht,El=new gr,ks=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Bl,this.bindMatrix=new ht,this.bindMatrixInverse=new ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ua),this.boundingBox.expandByPoint(Ua)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Kn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ua),this.boundingSphere.expandByPoint(Ua)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wl.copy(this.boundingSphere),wl.applyMatrix4(i),e.ray.intersectsSphere(wl)!==!1&&(Lh.copy(i).invert(),El.copy(e.ray).applyMatrix4(Lh),this.boundingBox!==null&&El.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,El)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new qt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Bl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Eu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Rh.fromBufferAttribute(i.attributes.skinIndex,e),Ph.fromBufferAttribute(i.attributes.skinWeight,e),Ch.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Ph.getComponent(s);if(a!==0){let o=Rh.getComponent(s);Ih.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(rp.copy(Ch).applyMatrix4(Ih),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},ns=class extends gn{constructor(){super(),this.isBone=!0,this.type="Bone"}},Gi=class extends Dn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Dh=new ht,sp=new ht,Vs=class r{constructor(e=[],t=[]){this.uuid=Er(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ht)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ht;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:sp;Dh.multiplyMatrices(o,t[s]),Dh.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Gi(t,e,e,li,oi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new ns),this.bones.push(a),this.boneInverses.push(new ht().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Hs=class extends En{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},qr=new ht,Uh=new ht,Na=[],Nh=new Mn,ap=new ht,Es=new ct,As=new Kn,Ws=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Hs(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ap)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qr),Nh.copy(e.boundingBox).applyMatrix4(qr),this.boundingBox.union(Nh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Kn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qr),As.copy(e.boundingSphere).applyMatrix4(qr),this.boundingSphere.union(As)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(n),e.ray.intersectsSphere(As)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,qr),Uh.multiplyMatrices(n,qr),Es.matrixWorld=Uh,Es.raycast(e,Na);for(let a=0,o=Na.length;a<o;a++){let c=Na[a];c.instanceId=s,c.object=this,t.push(c)}Na.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Hs(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gi(new Float32Array(i*this.count),i,this.count,Wo,oi));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Al=new w,op=new w,lp=new At,Ti=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Al.subVectors(n,t).cross(op.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Al),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||lp.getNormalMatrix(e),i=this.coplanarPoint(Al).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},pr=new Kn,cp=new Me(.5,.5),Ba=new w,tr=class{constructor(e=new Ti,t=new Ti,n=new Ti,i=new Ti,s=new Ti,a=new Ti){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],p=s[7],v=s[8],m=s[9],f=s[10],g=s[11],y=s[12],_=s[13],x=s[14],T=s[15];if(i[0].setComponents(l-a,p-h,g-v,T-y).normalize(),i[1].setComponents(l+a,p+h,g+v,T+y).normalize(),i[2].setComponents(l+o,p+u,g+m,T+_).normalize(),i[3].setComponents(l-o,p-u,g-m,T-_).normalize(),n)i[4].setComponents(c,d,f,x).normalize(),i[5].setComponents(l-c,p-d,g-f,T-x).normalize();else if(i[4].setComponents(l-c,p-d,g-f,T-x).normalize(),t===Oi)i[5].setComponents(l+c,p+d,g+f,T+x).normalize();else{if(t!==Ns)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pr)}intersectsSprite(e){pr.center.set(0,0,0);let t=cp.distanceTo(e.center);return pr.radius=.7071067811865476+t,pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(pr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ba.x=i.normal.x>0?e.max.x:e.min.x,Ba.y=i.normal.y>0?e.max.y:e.min.y,Ba.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ba)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},xi=new ht,Mi=new tr,no=class r{constructor(){this.coordinateSystem=Oi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Mi.setFromProjectionMatrix(xi,i.coordinateSystem,i.reversedDepth),Mi.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Mi.setFromProjectionMatrix(xi,i.coordinateSystem,i.reversedDepth),Mi.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Mi.setFromProjectionMatrix(xi,i.coordinateSystem,i.reversedDepth),Mi.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Mi.setFromProjectionMatrix(xi,i.coordinateSystem,i.reversedDepth),Mi.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(xi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Mi.setFromProjectionMatrix(xi,i.coordinateSystem,i.reversedDepth),Mi.containsPoint(e))return!0}return!1}clone(){return new r}};var kl=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Sm=new ht,wm=new lt(1,1,1),Em=new tr,Am=new no,Cm=new Mn,Rm=new Kn,Pm=new w,Im=new w,Lm=new w,Dm=new kl,Um=new ct;var is=class extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},io=new w,ro=new w,Bh=new ht,Cs=new gr,Fa=new Kn,Cl=new w,Fh=new w,so=class extends gn{constructor(e=new ut,t=new is){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)io.fromBufferAttribute(t,i-1),ro.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=io.distanceTo(ro);e.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fa.copy(n.boundingSphere),Fa.applyMatrix4(i),Fa.radius+=s,e.ray.intersectsSphere(Fa)===!1)return;Bh.copy(i).invert(),Cs.copy(e.ray).applyMatrix4(Bh);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=d,m=p-1;v<m;v+=l){let f=h.getX(v),g=h.getX(v+1),y=Oa(this,e,Cs,c,f,g,v);y&&t.push(y)}if(this.isLineLoop){let v=h.getX(p-1),m=h.getX(d),f=Oa(this,e,Cs,c,v,m,p-1);f&&t.push(f)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let v=d,m=p-1;v<m;v+=l){let f=Oa(this,e,Cs,c,v,v+1,v);f&&t.push(f)}if(this.isLineLoop){let v=Oa(this,e,Cs,c,p-1,d,p-1);v&&t.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Oa(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(io.fromBufferAttribute(o,i),ro.fromBufferAttribute(o,s),t.distanceSqToSegment(io,ro,Cl,Fh)>n)return;Cl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Cl);return c<e.near||c>e.far?void 0:{distance:c,point:Fh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var Oh=new w,zh=new w,Xs=class extends so{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Oh.fromBufferAttribute(t,i),zh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Oh.distanceTo(zh);e.setAttribute("lineDistance",new Re(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Nm=new ht,Bm=new gr,Fm=new Kn,Om=new w;var Vt=class extends Dn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},js=class extends Dn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==ua&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},qs=class extends Dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},rs=class r extends ut{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,v=2*n+s,m=i+1,f=new w,g=new w;for(let y=0;y<=v;y++){let _=0,x=0,T=0,b=0;if(y<=n){let N=y/n,F=N*Math.PI/2;x=-h-e*Math.cos(F),T=e*Math.sin(F),b=-e*Math.cos(F),_=N*u}else if(y<=n+s){let N=(y-n)/s;x=N*t-h,T=e,b=0,_=u+N*d}else{let N=(y-n-s)/n,F=N*Math.PI/2;x=h+e*Math.sin(F),T=e*Math.cos(F),b=e*Math.sin(F),_=u+d+N*u}let I=Math.max(0,Math.min(1,_/p)),O=0;y===0?O=.5/i:y===v&&(O=-.5/i);for(let N=0;N<=i;N++){let F=N/i,P=F*Math.PI*2,L=Math.sin(P),q=Math.cos(P);g.x=-T*q,g.y=x,g.z=T*L,o.push(g.x,g.y,g.z),f.set(-T*q,b,T*L),f.normalize(),c.push(f.x,f.y,f.z),l.push(F+O,I)}if(y>0){let N=(y-1)*m;for(let F=0;F<i;F++){let P=N+F,L=N+F+1,q=y*m+F,W=y*m+F+1;a.push(P,L,q),a.push(L,W,q)}}}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},jn=class r extends ut{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new Me;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("normal",new Re(o,3)),this.setAttribute("uv",new Re(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$e=class r extends ut{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],v=0,m=[],f=n/2,g=0;function y(_){let x=v,T=new Me,b=new w,I=0,O=_===!0?e:t,N=_===!0?1:-1;for(let P=1;P<=i;P++)u.push(0,f*N,0),d.push(0,N,0),p.push(.5,.5),v++;let F=v;for(let P=0;P<=i;P++){let L=P/i*c+o,q=Math.cos(L),W=Math.sin(L);b.x=O*W,b.y=f*N,b.z=O*q,u.push(b.x,b.y,b.z),d.push(0,N,0),T.x=.5*q+.5,T.y=.5*W*N+.5,p.push(T.x,T.y),v++}for(let P=0;P<i;P++){let L=x+P,q=F+P;_===!0?h.push(q,q+1,L):h.push(q+1,q,L),I+=3}l.addGroup(g,I,_===!0?1:2),g+=I}(function(){let _=new w,x=new w,T=0,b=(t-e)/n;for(let I=0;I<=s;I++){let O=[],N=I/s,F=N*(t-e)+e;for(let P=0;P<=i;P++){let L=P/i,q=L*c+o,W=Math.sin(q),$=Math.cos(q);x.x=F*W,x.y=-N*n+f,x.z=F*$,u.push(x.x,x.y,x.z),_.set(W,b,$).normalize(),d.push(_.x,_.y,_.z),p.push(L,1-N),O.push(v++)}m.push(O)}for(let I=0;I<i;I++)for(let O=0;O<s;O++){let N=m[O][I],F=m[O+1][I],P=m[O+1][I+1],L=m[O][I+1];(e>0||O!==0)&&(h.push(N,F,L),T+=3),(t>0||O!==s-1)&&(h.push(F,P,L),T+=3)}l.addGroup(g,T,0),g+=T})(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ao=class r extends $e{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},nr=class r extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(p,v,m,f){let g=f+1,y=[];for(let _=0;_<=g;_++){y[_]=[];let x=p.clone().lerp(m,_/g),T=v.clone().lerp(m,_/g),b=g-_;for(let I=0;I<=b;I++)y[_][I]=I===0&&_===g?x:x.clone().lerp(T,I/b)}for(let _=0;_<g;_++)for(let x=0;x<2*(g-_)-1;x++){let T=Math.floor(x/2);x%2==0?(c(y[_][T+1]),c(y[_+1][T]),c(y[_][T])):(c(y[_][T+1]),c(y[_+1][T+1]),c(y[_+1][T]))}}function c(p){s.push(p.x,p.y,p.z)}function l(p,v){let m=3*p;v.x=e[m+0],v.y=e[m+1],v.z=e[m+2]}function h(p,v,m,f){f<0&&p.x===1&&(a[v]=p.x-1),m.x===0&&m.z===0&&(a[v]=f/2/Math.PI+.5)}function u(p){return Math.atan2(p.z,-p.x)}function d(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let v=new w,m=new w,f=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],v),l(t[g+1],m),l(t[g+2],f),o(v,m,f,p)})(i),(function(p){let v=new w;for(let m=0;m<s.length;m+=3)v.x=s[m+0],v.y=s[m+1],v.z=s[m+2],v.normalize().multiplyScalar(p),s[m+0]=v.x,s[m+1]=v.y,s[m+2]=v.z})(n),(function(){let p=new w;for(let v=0;v<s.length;v+=3){p.x=s[v+0],p.y=s[v+1],p.z=s[v+2];let m=u(p)/2/Math.PI+.5,f=d(p)/Math.PI+.5;a.push(m,1-f)}(function(){let v=new w,m=new w,f=new w,g=new w,y=new Me,_=new Me,x=new Me;for(let T=0,b=0;T<s.length;T+=9,b+=6){v.set(s[T+0],s[T+1],s[T+2]),m.set(s[T+3],s[T+4],s[T+5]),f.set(s[T+6],s[T+7],s[T+8]),y.set(a[b+0],a[b+1]),_.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),g.copy(v).add(m).add(f).divideScalar(3);let I=u(g);h(y,b+0,v,I),h(_,b+2,m,I),h(x,b+4,f,I)}})(),(function(){for(let v=0;v<a.length;v+=6){let m=a[v+0],f=a[v+2],g=a[v+4],y=Math.max(m,f,g),_=Math.min(m,f,g);y>.9&&_<.1&&(m<.2&&(a[v+0]+=1),f<.2&&(a[v+2]+=1),g<.2&&(a[v+4]+=1))}})()})(),this.setAttribute("position",new Re(s,3)),this.setAttribute("normal",new Re(s.slice(),3)),this.setAttribute("uv",new Re(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},oo=class r extends nr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},za=new w,Ga=new w,Rl=new w,ka=new Bi,lo=class extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(qa*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let v=0;v<c;v+=3){a?(l[0]=a.getX(v),l[1]=a.getX(v+1),l[2]=a.getX(v+2)):(l[0]=v,l[1]=v+1,l[2]=v+2);let{a:m,b:f,c:g}=ka;if(m.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),ka.getNormal(Rl),u[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let y=0;y<3;y++){let _=(y+1)%3,x=u[y],T=u[_],b=ka[h[y]],I=ka[h[_]],O=`${x}_${T}`,N=`${T}_${x}`;N in d&&d[N]?(Rl.dot(d[N].normal)<=s&&(p.push(b.x,b.y,b.z),p.push(I.x,I.y,I.z)),d[N]=null):O in d||(d[O]={index0:l[y],index1:l[_],normal:Rl.clone()})}}for(let v in d)if(d[v]){let{index0:m,index1:f}=d[v];za.fromBufferAttribute(o,m),Ga.fromBufferAttribute(o,f),p.push(za.x,za.y,za.z),p.push(Ga.x,Ga.y,Ga.z)}this.setAttribute("position",new Re(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},$n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new Me:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new ht;for(let p=0;p<=e;p++){let v=p/e;i[p]=this.getTangentAt(v,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let v=Math.acos(Ut(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(o,v))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(Ut(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(c.makeRotationAxis(i[v],p*v)),a[v].crossVectors(i[v],s[v])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ss=class extends $n{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Me){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},co=class extends ss{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Oc(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Va=new w,Pl=new Oc,Il=new Oc,Ll=new Oc,wt=class extends $n{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Va.subVectors(i[0],i[1]).add(i[0]),o=Va);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Va.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Va),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,v=Math.pow(o.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(d),p),f=Math.pow(d.distanceToSquared(c),p);m<1e-4&&(m=1),v<1e-4&&(v=m),f<1e-4&&(f=m),Pl.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,v,m,f),Il.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,v,m,f),Ll.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,v,m,f)}else this.curveType==="catmullrom"&&(Pl.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Il.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Ll.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(Pl.calc(h),Il.calc(h),Ll.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Gh(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Is(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Ls(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Ys=class extends $n{constructor(e=new Me,t=new Me,n=new Me,i=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Me){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ls(e,i.x,s.x,a.x,o.x),Ls(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ho=class extends $n{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ls(e,i.x,s.x,a.x,o.x),Ls(e,i.y,s.y,a.y,o.y),Ls(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Zs=class extends $n{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},uo=class extends $n{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Js=class extends $n{constructor(e=new Me,t=new Me,n=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Me){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Is(e,i.x,s.x,a.x),Is(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ks=class extends $n{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Is(e,i.x,s.x,a.x),Is(e,i.y,s.y,a.y),Is(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$s=class extends $n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Gh(o,c.x,l.x,h.x,u.x),Gh(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Me().fromArray(i))}return this}},po=Object.freeze({__proto__:null,ArcCurve:co,CatmullRomCurve3:wt,CubicBezierCurve:Ys,CubicBezierCurve3:ho,EllipseCurve:ss,LineCurve:Zs,LineCurve3:uo,QuadraticBezierCurve:Js,QuadraticBezierCurve3:Ks,SplineCurve:$s}),fo=class extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new po[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new po[i.type]().fromJSON(i))}return this}},Bn=class extends fo{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Zs(this.currentPoint.clone(),new Me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Js(this.currentPoint.clone(),new Me(e,t),new Me(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Ys(this.currentPoint.clone(),new Me(e,t),new Me(n,i),new Me(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new $s(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new ss(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ht=class extends Bn{constructor(e){super(e),this.uuid=Er(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Bn().fromJSON(i))}return this}};function hp(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=kh(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,p){let v=[];for(let m=0,f=u.length;m<f;m++){let g=kh(h,u[m]*p,m<f-1?u[m+1]*p:h.length,p,!1);g===g.next&&(g.steiner=!0),v.push(yp(g))}v.sort(mp);for(let m=0;m<v.length;m++)d=gp(v[m],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let p=r[d],v=r[d+1];p<o&&(o=p),v<c&&(c=v),p>h&&(h=p),v>u&&(u=v)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Qs(s,a,t,o,c,l,0),a}function kh(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Vh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Vh(a/n|0,r[a],r[a+1],s);return s&&as(s,s.next)&&(ta(s),s=s.next),s}function yr(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!as(n,n.next)&&hn(n.prev,n,n.next)!==0)n=n.next;else{if(ta(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Qs(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Vl(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(p){let v,m=1;do{let f,g=p;p=null;let y=null;for(v=0;g;){v++;let _=g,x=0;for(let b=0;b<m&&(x++,_=_.nextZ,_);b++);let T=m;for(;x>0||T>0&&_;)x!==0&&(T===0||!_||g.z<=_.z)?(f=g,g=g.nextZ,x--):(f=_,_=_.nextZ,T--),y?y.nextZ=f:p=f,f.prevZ=y,y=f;g=_}y.nextZ=null,m*=2}while(v>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?dp(r,n,i,s):up(r))e.push(c.i,r.i,l.i),ta(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?Qs(r=pp(yr(r),e),e,t,n,i,s,2):a===2&&fp(r,e,t,n,i,s):Qs(yr(r),e,t,n,i,s,1);break}}}function up(r){let e=r.prev,t=r,n=r.next;if(hn(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),p=Math.max(o,c,l),v=n.next;for(;v!==e;){if(v.x>=h&&v.x<=d&&v.y>=u&&v.y<=p&&Ps(i,o,s,c,a,l,v.x,v.y)&&hn(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function dp(r,e,t,n){let i=r.prev,s=r,a=r.next;if(hn(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,p=Math.min(o,c,l),v=Math.min(h,u,d),m=Math.max(o,c,l),f=Math.max(h,u,d),g=Vl(p,v,e,t,n),y=Vl(m,f,e,t,n),_=r.prevZ,x=r.nextZ;for(;_&&_.z>=g&&x&&x.z<=y;){if(_.x>=p&&_.x<=m&&_.y>=v&&_.y<=f&&_!==i&&_!==a&&Ps(o,h,c,u,l,d,_.x,_.y)&&hn(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=p&&x.x<=m&&x.y>=v&&x.y<=f&&x!==i&&x!==a&&Ps(o,h,c,u,l,d,x.x,x.y)&&hn(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=g;){if(_.x>=p&&_.x<=m&&_.y>=v&&_.y<=f&&_!==i&&_!==a&&Ps(o,h,c,u,l,d,_.x,_.y)&&hn(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=p&&x.x<=m&&x.y>=v&&x.y<=f&&x!==i&&x!==a&&Ps(o,h,c,u,l,d,x.x,x.y)&&hn(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function pp(r,e){let t=r;do{let n=t.prev,i=t.next.next;!as(n,i)&&Xu(n,t,t.next,i)&&ea(n,i)&&ea(i,n)&&(e.push(n.i,t.i,i.i),ta(t),ta(t.next),t=r=i),t=t.next}while(t!==r);return yr(t)}function fp(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&_p(a,o)){let c=ju(a,o);return a=yr(a,a.next),c=yr(c,c.next),Qs(a,e,t,n,i,s,0),void Qs(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function mp(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function gp(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(as(i,a))return a;do{if(as(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let m=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(m<=o&&m>h&&(h=m,l=a.x<a.next.x?a:a.next,m===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,p=l.y,v=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Wu(c<p?o:h,c,d,p,c<p?h:o,c,a.x,a.y)){let m=Math.abs(c-a.y)/(o-a.x);ea(a,i)&&(m<v||m===v&&(a.x>l.x||a.x===l.x&&vp(l,a)))&&(l=a,v=m)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=ju(t,r);return yr(n,n.next),yr(t,t.next)}function vp(r,e){return hn(r.prev,r,e.prev)<0&&hn(e.next,r,r.next)<0}function Vl(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function yp(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Wu(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Ps(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Wu(r,e,t,n,i,s,a,o)}function _p(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Xu(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(ea(r,e)&&ea(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(hn(r.prev,r,e.prev)||hn(r,e.prev,e))||as(r,e)&&hn(r.prev,r,r.next)>0&&hn(e.prev,e,e.next)>0)}function hn(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function as(r,e){return r.x===e.x&&r.y===e.y}function Xu(r,e,t,n){let i=Wa(hn(r,e,t)),s=Wa(hn(r,e,n)),a=Wa(hn(t,n,r)),o=Wa(hn(t,n,e));return i!==s&&a!==o||!(i!==0||!Ha(r,t,e))||!(s!==0||!Ha(r,n,e))||!(a!==0||!Ha(t,r,n))||!(o!==0||!Ha(t,e,n))}function Ha(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Wa(r){return r>0?1:r<0?-1:0}function ea(r,e){return hn(r.prev,r,r.next)<0?hn(r,e,r.next)>=0&&hn(r,r.prev,e)>=0:hn(r,e,r.prev)<0||hn(r,r.next,e)<0}function ju(r,e){let t=Hl(r.i,r.x,r.y),n=Hl(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Vh(r,e,t,n){let i=Hl(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ta(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Hl(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Wl=class{static triangulate(e,t,n=2){return hp(e,t,n)}},bi=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Hh(e),Wh(n,e);let a=e.length;t.forEach(Hh);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Wh(n,t[c]);let o=Wl.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Hh(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Wh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var zt=class r extends ut{constructor(e=new Ht([new Me(.5,.5),new Me(-.5,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,v=t.bevelSize!==void 0?t.bevelSize:p-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:xp,_,x,T,b,I,O=!1;g&&(_=g.getSpacedPoints(h),O=!0,d=!1,x=g.computeFrenetFrames(h,!1),T=new w,b=new w,I=new w),d||(f=0,p=0,v=0,m=0);let N=o.extractPoints(l),F=N.shape,P=N.holes;if(!bi.isClockWise(F)){F=F.reverse();for(let k=0,S=P.length;k<S;k++){let U=P[k];bi.isClockWise(U)&&(P[k]=U.reverse())}}function L(k){let S=10000000000000001e-36,U=k[0];for(let X=1;X<=k.length;X++){let V=X%k.length,pe=k[V],te=pe.x-U.x,ie=pe.y-U.y,Ee=te*te+ie*ie,He=Math.max(Math.abs(pe.x),Math.abs(pe.y),Math.abs(U.x),Math.abs(U.y));Ee<=S*He*He?(k.splice(V,1),X--):U=pe}}L(F),P.forEach(L);let q=P.length,W=F;for(let k=0;k<q;k++){let S=P[k];F=F.concat(S)}function $(k,S,U){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),k.clone().addScaledVector(S,U)}let ae=F.length;function Z(k,S,U){let X,V,pe,te=k.x-S.x,ie=k.y-S.y,Ee=U.x-k.x,He=U.y-k.y,Pe=te*te+ie*ie,Je=te*He-ie*Ee;if(Math.abs(Je)>Number.EPSILON){let ot=Math.sqrt(Pe),ft=Math.sqrt(Ee*Ee+He*He),Rt=S.x-ie/ot,St=S.y+te/ot,yt=((U.x-He/ft-Rt)*He-(U.y+Ee/ft-St)*Ee)/(te*He-ie*Ee);X=Rt+te*yt-k.x,V=St+ie*yt-k.y;let z=X*X+V*V;if(z<=2)return new Me(X,V);pe=Math.sqrt(z/2)}else{let ot=!1;te>Number.EPSILON?Ee>Number.EPSILON&&(ot=!0):te<-Number.EPSILON?Ee<-Number.EPSILON&&(ot=!0):Math.sign(ie)===Math.sign(He)&&(ot=!0),ot?(X=-ie,V=te,pe=Math.sqrt(Pe)):(X=te,V=ie,pe=Math.sqrt(Pe/2))}return new Me(X/pe,V/pe)}let oe=[];for(let k=0,S=W.length,U=S-1,X=k+1;k<S;k++,U++,X++)U===S&&(U=0),X===S&&(X=0),oe[k]=Z(W[k],W[U],W[X]);let Ue=[],Fe,Te,ze=oe.concat();for(let k=0,S=q;k<S;k++){let U=P[k];Fe=[];for(let X=0,V=U.length,pe=V-1,te=X+1;X<V;X++,pe++,te++)pe===V&&(pe=0),te===V&&(te=0),Fe[X]=Z(U[X],U[pe],U[te]);Ue.push(Fe),ze=ze.concat(Fe)}if(f===0)Te=bi.triangulateShape(W,P);else{let k=[],S=[];for(let U=0;U<f;U++){let X=U/f,V=p*Math.cos(X*Math.PI/2),pe=v*Math.sin(X*Math.PI/2)+m;for(let te=0,ie=W.length;te<ie;te++){let Ee=$(W[te],oe[te],pe);H(Ee.x,Ee.y,-V),X===0&&k.push(Ee)}for(let te=0,ie=q;te<ie;te++){let Ee=P[te];Fe=Ue[te];let He=[];for(let Pe=0,Je=Ee.length;Pe<Je;Pe++){let ot=$(Ee[Pe],Fe[Pe],pe);H(ot.x,ot.y,-V),X===0&&He.push(ot)}X===0&&S.push(He)}}Te=bi.triangulateShape(k,S)}let Ce=Te.length,ne=v+m;for(let k=0;k<ae;k++){let S=d?$(F[k],ze[k],ne):F[k];O?(b.copy(x.normals[0]).multiplyScalar(S.x),T.copy(x.binormals[0]).multiplyScalar(S.y),I.copy(_[0]).add(b).add(T),H(I.x,I.y,I.z)):H(S.x,S.y,0)}for(let k=1;k<=h;k++)for(let S=0;S<ae;S++){let U=d?$(F[S],ze[S],ne):F[S];O?(b.copy(x.normals[k]).multiplyScalar(U.x),T.copy(x.binormals[k]).multiplyScalar(U.y),I.copy(_[k]).add(b).add(T),H(I.x,I.y,I.z)):H(U.x,U.y,u/h*k)}for(let k=f-1;k>=0;k--){let S=k/f,U=p*Math.cos(S*Math.PI/2),X=v*Math.sin(S*Math.PI/2)+m;for(let V=0,pe=W.length;V<pe;V++){let te=$(W[V],oe[V],X);H(te.x,te.y,u+U)}for(let V=0,pe=P.length;V<pe;V++){let te=P[V];Fe=Ue[V];for(let ie=0,Ee=te.length;ie<Ee;ie++){let He=$(te[ie],Fe[ie],X);O?H(He.x,He.y+_[h-1].y,_[h-1].x+U):H(He.x,He.y,u+U)}}}function _e(k,S){let U=k.length;for(;--U>=0;){let X=U,V=U-1;V<0&&(V=k.length-1);for(let pe=0,te=h+2*f;pe<te;pe++){let ie=ae*pe,Ee=ae*(pe+1);A(S+X+ie,S+V+ie,S+V+Ee,S+X+Ee)}}}function H(k,S,U){c.push(k),c.push(S),c.push(U)}function Le(k,S,U){R(k),R(S),R(U);let X=i.length/3,V=y.generateTopUV(n,i,X-3,X-2,X-1);j(V[0]),j(V[1]),j(V[2])}function A(k,S,U,X){R(k),R(S),R(X),R(S),R(U),R(X);let V=i.length/3,pe=y.generateSideWallUV(n,i,V-6,V-3,V-2,V-1);j(pe[0]),j(pe[1]),j(pe[3]),j(pe[1]),j(pe[2]),j(pe[3])}function R(k){i.push(c[3*k+0]),i.push(c[3*k+1]),i.push(c[3*k+2])}function j(k){s.push(k.x),s.push(k.y)}(function(){let k=i.length/3;if(d){let S=0,U=ae*S;for(let X=0;X<Ce;X++){let V=Te[X];Le(V[2]+U,V[1]+U,V[0]+U)}S=h+2*f,U=ae*S;for(let X=0;X<Ce;X++){let V=Te[X];Le(V[0]+U,V[1]+U,V[2]+U)}}else{for(let S=0;S<Ce;S++){let U=Te[S];Le(U[2],U[1],U[0])}for(let S=0;S<Ce;S++){let U=Te[S];Le(U[0]+ae*h,U[1]+ae*h,U[2]+ae*h)}}n.addGroup(k,i.length/3-k,0)})(),(function(){let k=i.length/3,S=0;_e(W,S),S+=W.length;for(let U=0,X=P.length;U<X;U++){let V=P[U];_e(V,S),S+=V.length}n.addGroup(k,i.length/3-k,1)})()}this.setAttribute("position",new Re(i,3)),this.setAttribute("uv",new Re(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new po[i.type]().fromJSON(i)),new r(n,e.options)}},xp={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new Me(s,a),new Me(o,c),new Me(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],v=e[3*i+2],m=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new Me(a,1-c),new Me(l,1-u),new Me(d,1-v),new Me(m,1-g)]:[new Me(o,1-c),new Me(h,1-u),new Me(p,1-v),new Me(f,1-g)]}},mo=class r extends nr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},ki=class r extends ut{constructor(e=[new Me(0,-.5),new Me(.5,0),new Me(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ut(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new Me,p=new w,v=new w,m=new w,f=0,g=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:f=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,p.x=1*g,p.y=-f,p.z=0*g,m.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(m.x,m.y,m.z);break;default:f=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,p.x=1*g,p.y=-f,p.z=0*g,v.copy(p),p.x+=m.x,p.y+=m.y,p.z+=m.z,p.normalize(),c.push(p.x,p.y,p.z),m.copy(v)}for(let y=0;y<=t;y++){let _=n+y*h*i,x=Math.sin(_),T=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*T,a.push(u.x,u.y,u.z),d.x=y/t,d.y=b/(e.length-1),o.push(d.x,d.y);let I=c[3*b+0]*x,O=c[3*b+1],N=c[3*b+0]*T;l.push(I,O,N)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){let x=_+y*e.length,T=x,b=x+e.length,I=x+e.length+1,O=x+1;s.push(T,b,O),s.push(I,O,b)}this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("uv",new Re(o,2)),this.setAttribute("normal",new Re(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},os=class r extends nr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Yt=class r extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,p=[],v=[],m=[],f=[];for(let g=0;g<h;g++){let y=g*d-a;for(let _=0;_<l;_++){let x=_*u-s;v.push(x,-y,0),m.push(0,0,1),f.push(_/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let y=0;y<o;y++){let _=y+l*g,x=y+l*(g+1),T=y+1+l*(g+1),b=y+1+l*g;p.push(_,x,b),p.push(x,T,b)}this.setIndex(p),this.setAttribute("position",new Re(v,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},go=class r extends ut{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new w,v=new Me;for(let m=0;m<=i;m++){for(let f=0;f<=n;f++){let g=s+f/n*a;p.x=u*Math.cos(g),p.y=u*Math.sin(g),c.push(p.x,p.y,p.z),l.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,h.push(v.x,v.y)}u+=d}for(let m=0;m<i;m++){let f=m*(n+1);for(let g=0;g<n;g++){let y=g+f,_=y,x=y+n+1,T=y+n+2,b=y+1;o.push(_,x,b),o.push(x,T,b)}}this.setIndex(o),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Vi=class r extends ut{constructor(e=new Ht([new Me(0,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,v=d.holes;bi.isClockWise(p)===!1&&(p=p.reverse());for(let f=0,g=v.length;f<g;f++){let y=v[f];bi.isClockWise(y)===!0&&(v[f]=y.reverse())}let m=bi.triangulateShape(p,v);for(let f=0,g=v.length;f<g;f++){let y=v[f];p=p.concat(y)}for(let f=0,g=p.length;f<g;f++){let y=p[f];i.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let f=0,g=m.length;f<g;f++){let y=m[f],_=y[0]+u,x=y[1]+u,T=y[2]+u;n.push(_,x,T),c+=3}}this.setIndex(n),this.setAttribute("position",new Re(i,3)),this.setAttribute("normal",new Re(s,3)),this.setAttribute("uv",new Re(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Gt=class r extends ut{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,p=[],v=[],m=[],f=[];for(let g=0;g<=n;g++){let y=[],_=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let b=T/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+_*o),v.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),f.push(b+x,1-_),y.push(l++)}h.push(y)}for(let g=0;g<n;g++)for(let y=0;y<t;y++){let _=h[g][y+1],x=h[g][y],T=h[g+1][y],b=h[g+1][y+1];(g!==0||a>0)&&p.push(_,x,b),(g!==n-1||c<Math.PI)&&p.push(x,T,b)}this.setIndex(p),this.setAttribute("position",new Re(v,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},vo=class r extends nr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ft=class r extends ut{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let p=0;p<=n;p++)for(let v=0;v<=i;v++){let m=v/i*s,f=p/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(m),u.y=(e+t*Math.cos(f))*Math.sin(m),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(m),h.y=e*Math.sin(m),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(v/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let v=1;v<=i;v++){let m=(i+1)*p+v-1,f=(i+1)*(p-1)+v-1,g=(i+1)*(p-1)+v,y=(i+1)*p+v;a.push(m,f,y),a.push(f,g,y)}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},yo=class r extends ut{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,p=new w,v=new w,m=new w,f=new w,g=new w;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;y(x,s,a,e,p),y(x+.01,s,a,e,v),f.subVectors(v,p),g.addVectors(v,p),m.crossVectors(f,g),g.crossVectors(m,f),m.normalize(),g.normalize();for(let T=0;T<=i;++T){let b=T/i*Math.PI*2,I=-t*Math.cos(b),O=t*Math.sin(b);u.x=p.x+(I*g.x+O*m.x),u.y=p.y+(I*g.y+O*m.y),u.z=p.z+(I*g.z+O*m.z),c.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),l.push(d.x,d.y,d.z),h.push(_/n),h.push(T/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){let T=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),I=(i+1)*_+x,O=(i+1)*(_-1)+x;o.push(T,b,O),o.push(b,I,O)}function y(_,x,T,b,I){let O=Math.cos(_),N=Math.sin(_),F=T/x*_,P=Math.cos(F);I.x=b*(2+P)*.5*O,I.y=b*(2+P)*N*.5,I.z=b*Math.sin(F)*.5}this.setIndex(o),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Ct=class r extends ut{constructor(e=new Ks(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new Me,h=new w,u=[],d=[],p=[],v=[];function m(f){h=e.getPointAt(f/t,h);let g=a.normals[f],y=a.binormals[f];for(let _=0;_<=i;_++){let x=_/i*Math.PI*2,T=Math.sin(x),b=-Math.cos(x);c.x=b*g.x+T*y.x,c.y=b*g.y+T*y.y,c.z=b*g.z+T*y.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)m(f);m(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,p.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let y=(i+1)*(f-1)+(g-1),_=(i+1)*f+(g-1),x=(i+1)*f+g,T=(i+1)*(f-1)+g;v.push(y,_,T),v.push(_,x,T)}})()})(),this.setIndex(v),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new po[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},_o=class extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let p=d,v=d+u.count;p<v;p+=3)for(let m=0;m<3;m++){let f=o.getX(p+m),g=o.getX(p+(m+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Xh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Xh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Re(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Xh(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var zm=Object.freeze({__proto__:null,BoxGeometry:tt,CapsuleGeometry:rs,CircleGeometry:jn,ConeGeometry:ao,CylinderGeometry:$e,DodecahedronGeometry:oo,EdgesGeometry:lo,ExtrudeGeometry:zt,IcosahedronGeometry:mo,LatheGeometry:ki,OctahedronGeometry:os,PlaneGeometry:Yt,PolyhedronGeometry:nr,RingGeometry:go,ShapeGeometry:Vi,SphereGeometry:Gt,TetrahedronGeometry:vo,TorusGeometry:Ft,TorusKnotGeometry:yo,TubeGeometry:Ct,WireframeGeometry:_o}),_r=class extends wi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new lt(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Nt=class extends wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},vn=class extends Nt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ir=class extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xo=class extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Xa(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Mp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var xr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Mo=class extends xr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fl,endingEnd:Fl}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ol:s=e,o=2*t-n;break;case zl:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ol:a=e,c=2*n-t;break;case zl:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,v=(n-t)/(i-t),m=v*v,f=m*v,g=-d*f+2*d*m-d*v,y=(1+d)*f+(-1.5-2*d)*m+(-.5+d)*v+1,_=(-1-p)*f+(1.5+p)*m+.5*v,x=p*f-p*m;for(let T=0;T!==o;++T)s[T]=g*a[h+T]+y*a[l+T]+_*a[c+T]+x*a[u+T];return s}},To=class extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},bo=class extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Jn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xa(t,this.TimeBufferType),this.values=Xa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xa(e.times,Array),values:Xa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ds:t=this.InterpolantFactoryMethodDiscrete;break;case Ja:t=this.InterpolantFactoryMethodLinear;break;case ja:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ds;case this.InterpolantFactoryMethodLinear:return Ja;case this.InterpolantFactoryMethodSmooth:return ja}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Mp(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ja,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let v=t[h+p];if(v!==t[u+p]||v!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Jn.prototype.ValueTypeName="",Jn.prototype.TimeBufferType=Float32Array,Jn.prototype.ValueBufferType=Float32Array,Jn.prototype.DefaultInterpolation=Ja;var Qi=class extends Jn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="bool",Qi.prototype.ValueBufferType=Array,Qi.prototype.DefaultInterpolation=Ds,Qi.prototype.InterpolantFactoryMethodLinear=void 0,Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var So=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}};So.prototype.ValueTypeName="color";var wo=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}};wo.prototype.ValueTypeName="number";var Eo=class extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Un.slerpFlat(s,0,a,l-o,a,l,c);return s}},na=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Eo(this.times,this.values,this.getValueSize(),e)}};na.prototype.ValueTypeName="quaternion",na.prototype.InterpolantFactoryMethodSmooth=void 0;var er=class extends Jn{constructor(e,t,n){super(e,t,n)}};er.prototype.ValueTypeName="string",er.prototype.ValueBufferType=Array,er.prototype.DefaultInterpolation=Ds,er.prototype.InterpolantFactoryMethodLinear=void 0,er.prototype.InterpolantFactoryMethodSmooth=void 0;var Ao=class extends Jn{constructor(e,t,n,i){super(e,t,n,i)}};Ao.prototype.ValueTypeName="vector";var Ya={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Co=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],v=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},qu=new Co,ls=class{constructor(e){this.manager=e!==void 0?e:qu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ls.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yr=new WeakMap,Ro=class extends ls{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ya.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Yr.get(a);u===void 0&&(u=[],Yr.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Kr("img");function c(){h(),t&&t(this);let u=Yr.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}Yr.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),Ya.remove(`image:${e}`);let d=Yr.get(this)||[];for(let p=0;p<d.length;p++){let v=d[p];v.onError&&v.onError(u)}Yr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ya.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var ia=class extends ls{constructor(e){super(e)}load(e,t,n,i){let s=new Dn,a=new Ro(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Mr=class extends gn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Qn=class extends Mr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new lt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Dl=new ht,jh=new w,qh=new w,ra=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=Ai,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tr,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;jh.setFromMatrixPosition(e.matrixWorld),t.position.copy(jh),qh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qh),t.updateMatrixWorld(),Dl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xl=class extends ra{constructor(){super(new an(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Bs*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},sa=class extends Mr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gn.DEFAULT_UP),this.updateMatrix(),this.target=new gn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Xl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Yh=new ht,Rs=new w,Ul=new w,jl=class extends ra{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Me(4,2),this._viewportCount=6,this._viewports=[new qt(2,1,1,1),new qt(0,1,1,1),new qt(3,1,1,1),new qt(1,1,1,1),new qt(3,0,1,1),new qt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Rs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rs),Ul.copy(n.position),Ul.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ul),n.updateMatrixWorld(),i.makeTranslation(-Rs.x,-Rs.y,-Rs.z),Yh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yh,n.coordinateSystem,n.reversedDepth)}},aa=class extends Mr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new jl}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Tr=class extends es{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ql=class extends ra{constructor(){super(new Tr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},qn=class extends Mr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gn.DEFAULT_UP),this.updateMatrix(),this.target=new gn,this.shadow=new ql}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Gm=new ht,km=new ht,Vm=new ht;var Po=class extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Hm=new w,Wm=new Un,Xm=new w,jm=new w,qm=new w;var Ym=new w,Zm=new Un,Jm=new w,Km=new w;var zc="\\[\\]\\.:\\/",Tp=new RegExp("["+zc+"]","g"),Nl="[^"+zc+"]",bp="[^"+zc.replace("\\.","")+"]",Sp=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Nl)+/(WCOD+)?/.source.replace("WCOD",bp)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nl)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nl)+"$"),wp=["material","materials","bones","map"],on=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Tp,"")}static parseTrackName(e){let t=Sp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);wp.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};on.Composite=class{constructor(r,e,t){let n=t||on.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},on.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},on.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},on.prototype.GetterByBindingType=[on.prototype._getValue_direct,on.prototype._getValue_array,on.prototype._getValue_arrayElement,on.prototype._getValue_toArray],on.prototype.SetterByBindingTypeAndVersioning=[[on.prototype._setValue_direct,on.prototype._setValue_direct_setNeedsUpdate,on.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[on.prototype._setValue_array,on.prototype._setValue_array_setNeedsUpdate,on.prototype._setValue_array_setMatrixWorldNeedsUpdate],[on.prototype._setValue_arrayElement,on.prototype._setValue_arrayElement_setNeedsUpdate,on.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[on.prototype._setValue_fromArray,on.prototype._setValue_fromArray_setNeedsUpdate,on.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $m=new Float32Array(1);var Qm=new ht;var e0=new Me;var t0=new w,n0=new w,i0=new w,r0=new w,s0=new w,a0=new w,o0=new w;var l0=new w;var c0=new w,h0=new ht,u0=new ht;var d0=new w,p0=new lt,f0=new lt;var m0=new w,g0=new w,v0=new w;var y0=new w,_0=new es;var x0=new Mn;var M0=new w;function Gc(r,e,t,n){let i=(function(s){switch(s){case Ai:case ec:return{byteLength:1,components:1};case ps:case tc:case sr:return{byteLength:2,components:1};case Vo:case Ho:return{byteLength:2,components:4};case Sr:case ko:case oi:return{byteLength:4,components:1};case nc:case ic:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Wo:case Xo:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case li:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function vd(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ap(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],p=l[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,l[h]=p)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let p=l[u];r.bufferSubData(o,p.start*c.BYTES_PER_ELEMENT,c,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Dt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},We={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new At}},envmap:{envMap:{value:null},envMapRotation:{value:new At},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new At}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new At}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new At},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new At},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new At},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new At}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new At}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new At}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0},uvTransform:{value:new At}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}}},Ci={basic:{uniforms:Fn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:Fn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new lt(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:Fn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:Fn([We.common,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.roughnessmap,We.metalnessmap,We.fog,We.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:Fn([We.common,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.gradientmap,We.fog,We.lights,{emissive:{value:new lt(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:Fn([We.common,We.bumpmap,We.normalmap,We.displacementmap,We.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:Fn([We.points,We.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:Fn([We.common,We.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:Fn([We.common,We.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:Fn([We.common,We.bumpmap,We.normalmap,We.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:Fn([We.sprite,We.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new At},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new At}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:Fn([We.common,We.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:Fn([We.lights,We.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};Ci.physical={uniforms:Fn([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new At},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new At},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new At},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new At},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new At},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new At},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new At},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new At},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new At},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new At},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new At},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new At}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};var Jo={r:0,b:0,g:0},Cr=new gi,Cp=new ht;function Rp(r,e,t,n,i,s,a){let o=new lt(0),c,l,h=s===!0?0:1,u=null,d=0,p=null;function v(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function m(f,g){f.getRGB(Jo,Fc(r)),n.buffers.color.setClear(Jo.r,Jo.g,Jo.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,m(o,h)},render:function(f){let g=!1,y=v(f);y===null?m(o,h):y&&y.isColor&&(m(y,1),g=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let y=v(g);y&&(y.isCubeTexture||y.mapping===ca)?(l===void 0&&(l=new ct(new tt(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Ar(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,x,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Cr.copy(g.backgroundRotation),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cp.makeRotationFromEuler(Cr)),l.material.toneMapped=jt.getTransfer(y.colorSpace)!==Qt,u===y&&d===y.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ct(new Yt(2,2),new Xn({name:"BackgroundMaterial",uniforms:Ar(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:hs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=jt.getTransfer(y.colorSpace)!==Qt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),u===y&&d===y.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Pp(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let y=[],_=[],x=[];for(let T=0;T<t;T++)y[T]=0,_[T]=0,x[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:_,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let y=0,_=g.length;y<_;y++)g[y]=0}function u(g){d(g,0)}function d(g,y){let _=s.newAttributes,x=s.enabledAttributes,T=s.attributeDivisors;_[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),T[g]!==y&&(r.vertexAttribDivisor(g,y),T[g]=y)}function p(){let g=s.newAttributes,y=s.enabledAttributes;for(let _=0,x=y.length;_<x;_++)y[_]!==g[_]&&(r.disableVertexAttribArray(_),y[_]=0)}function v(g,y,_,x,T,b,I){I===!0?r.vertexAttribIPointer(g,y,_,T,b):r.vertexAttribPointer(g,y,_,x,T,b)}function m(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,y,_,x,T){let b=!1,I=(function(O,N,F){let P=F.wireframe===!0,L=n[O.id];L===void 0&&(L={},n[O.id]=L);let q=L[N.id];q===void 0&&(q={},L[N.id]=q);let W=q[P];return W===void 0&&(W=l(r.createVertexArray()),q[P]=W),W})(x,_,y);s!==I&&(s=I,o(s.object)),b=(function(O,N,F,P){let L=s.attributes,q=N.attributes,W=0,$=F.getAttributes();for(let ae in $)if($[ae].location>=0){let Z=L[ae],oe=q[ae];if(oe===void 0&&(ae==="instanceMatrix"&&O.instanceMatrix&&(oe=O.instanceMatrix),ae==="instanceColor"&&O.instanceColor&&(oe=O.instanceColor)),Z===void 0||Z.attribute!==oe||oe&&Z.data!==oe.data)return!0;W++}return s.attributesNum!==W||s.index!==P})(g,x,_,T),b&&(function(O,N,F,P){let L={},q=N.attributes,W=0,$=F.getAttributes();for(let ae in $)if($[ae].location>=0){let Z=q[ae];Z===void 0&&(ae==="instanceMatrix"&&O.instanceMatrix&&(Z=O.instanceMatrix),ae==="instanceColor"&&O.instanceColor&&(Z=O.instanceColor));let oe={};oe.attribute=Z,Z&&Z.data&&(oe.data=Z.data),L[ae]=oe,W++}s.attributes=L,s.attributesNum=W,s.index=P})(g,x,_,T),T!==null&&e.update(T,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(O,N,F,P){h();let L=P.attributes,q=F.getAttributes(),W=N.defaultAttributeValues;for(let $ in q){let ae=q[$];if(ae.location>=0){let Z=L[$];if(Z===void 0&&($==="instanceMatrix"&&O.instanceMatrix&&(Z=O.instanceMatrix),$==="instanceColor"&&O.instanceColor&&(Z=O.instanceColor)),Z!==void 0){let oe=Z.normalized,Ue=Z.itemSize,Fe=e.get(Z);if(Fe===void 0)continue;let Te=Fe.buffer,ze=Fe.type,Ce=Fe.bytesPerElement,ne=ze===r.INT||ze===r.UNSIGNED_INT||Z.gpuType===ko;if(Z.isInterleavedBufferAttribute){let _e=Z.data,H=_e.stride,Le=Z.offset;if(_e.isInstancedInterleavedBuffer){for(let A=0;A<ae.locationSize;A++)d(ae.location+A,_e.meshPerAttribute);O.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let A=0;A<ae.locationSize;A++)u(ae.location+A);r.bindBuffer(r.ARRAY_BUFFER,Te);for(let A=0;A<ae.locationSize;A++)v(ae.location+A,Ue/ae.locationSize,ze,oe,H*Ce,(Le+Ue/ae.locationSize*A)*Ce,ne)}else{if(Z.isInstancedBufferAttribute){for(let _e=0;_e<ae.locationSize;_e++)d(ae.location+_e,Z.meshPerAttribute);O.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let _e=0;_e<ae.locationSize;_e++)u(ae.location+_e);r.bindBuffer(r.ARRAY_BUFFER,Te);for(let _e=0;_e<ae.locationSize;_e++)v(ae.location+_e,Ue/ae.locationSize,ze,oe,Ue*Ce,Ue/ae.locationSize*_e*Ce,ne)}}else if(W!==void 0){let oe=W[$];if(oe!==void 0)switch(oe.length){case 2:r.vertexAttrib2fv(ae.location,oe);break;case 3:r.vertexAttrib3fv(ae.location,oe);break;case 4:r.vertexAttrib4fv(ae.location,oe);break;default:r.vertexAttrib1fv(ae.location,oe)}}}}p()})(g,y,_,x),T!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:m,resetDefaultState:f,dispose:function(){m();for(let g in n){let y=n[g];for(let _ in y){let x=y[_];for(let T in x)c(x[T].object),delete x[T];delete y[_]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let y=n[g.id];for(let _ in y){let x=y[_];for(let T in x)c(x[T].object),delete x[T];delete y[_]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let y in n){let _=n[y];if(_[g.id]===void 0)continue;let x=_[g.id];for(let T in x)c(x[T].object),delete x[T];delete _[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function Ip(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Lp(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===li||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===sr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Ai&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==oi&&!p)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Dp(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Ti,o=new At,c={value:null,needsUpdate:!1};function l(h,u,d,p){let v=h!==null?h.length:0,m=null;if(v!==0){if(m=c.value,p!==!0||m===null){let f=d+4*v,g=u.matrixWorldInverse;o.getNormalMatrix(g),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,_=d;y!==v;++y,_+=4)a.copy(h[y]).applyMatrix4(g,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=r.get(h);if(!i||p===null||p.length===0||s&&!m)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,y=4*g,_=f.clippingState||null;c.value=_,_=l(p,u,y,d);for(let x=0;x!==y;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=g}}}function Up(r){let e=new WeakMap;function t(i,s){return s===Oo?i.mapping=ds:s===zo&&(i.mapping=br),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Oo||s===zo){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new to(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Yu=[.125,.215,.35,.446,.526,.582],pa=20,kc=new Tr,Zu=new lt,Vc=null,Hc=0,Wc=0,Xc=!1,Pr=(1+Math.sqrt(5))/2,gs=1/Pr,Ju=[new w(-Pr,gs,0),new w(Pr,gs,0),new w(-gs,0,Pr),new w(gs,0,Pr),new w(0,Pr,-gs),new w(0,Pr,gs),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Np=new w,ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Np}=s;Vc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),Xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vc,Hc,Wc),this._renderer.xr.enabled=Xc,e.scissorTest=!1,Ko(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),Xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:sr,format:li,colorSpace:mr,depthBuffer:!1},i=Ku(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ku(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Yu.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);c.push(p);let v=1/p;d>a-4?v=Yu[d-a+4-1]:d===0&&(v=0),l.push(v);let m=1/(p-2),f=-m,g=1+m,y=[f,f,g,f,g,g,f,f,g,g,f,g],_=6,x=6,T=3,b=2,I=1,O=new Float32Array(T*x*_),N=new Float32Array(b*x*_),F=new Float32Array(I*x*_);for(let L=0;L<_;L++){let q=L%3*2/3-1,W=L>2?0:-1,$=[q,W,0,q+2/3,W,0,q+2/3,W+1,0,q,W,0,q+2/3,W+1,0,q,W+1,0];O.set($,T*x*L),N.set(y,b*x*L);let ae=[L,L,L,L,L,L];F.set(ae,I*x*L)}let P=new ut;P.setAttribute("position",new En(O,T)),P.setAttribute("uv",new En(N,b)),P.setAttribute("faceIndex",new En(F,I)),o.push(P),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(pa),h=new w(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:pa,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:th(),fragmentShader:`

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
		`,blending:rr,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,kc)}_sceneToCubeUV(e,t,n,i,s){let a=new an(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Zu),l.toneMapping=Hi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new Wn({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1}),p=new ct(new tt,d),v=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,v=!0):(d.color.copy(Zu),v=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let y=this._cubeSize;Ko(i,g*y,f>2?y:0,y,y),l.setRenderTarget(i),v&&l.render(p,a),l.render(e,a)}p.geometry.dispose(),p.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ds||e.mapping===br;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$u());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ct(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Ko(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,kc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ju[(i-s-1)%Ju.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ct(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,v=s/p,m=isFinite(s)?1+Math.floor(3*v):pa;m>pa&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let f=[],g=0;for(let x=0;x<pa;++x){let T=x/v,b=Math.exp(-T*T/2);f.push(b),x===0?g+=b:x<m&&(g+=2*b)}for(let x=0;x<f.length;x++)f[x]=f[x]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=p,u.mipInt.value=y-n;let _=this._sizeLods[i];Ko(t,3*_*(i>y-4?i-y+4:0),4*(this._cubeSize-_),3*_,2*_),c.setRenderTarget(t),c.render(h,kc)}};function Ku(r,e,t){let n=new si(r,e,t);return n.texture.mapping=ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ko(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function $u(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:th(),fragmentShader:`

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
		`,blending:rr,depthTest:!1,depthWrite:!1})}function Qu(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function th(){return`

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
	`}function Bp(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Oo||s===zo,o=s===ds||s===br;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new ar(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let v=0;v<p;v++)u[v]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new ar(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Fp(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&$r("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Op(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let m=h.array;d=h.version;for(let f=0,g=m.length;f<g;f+=3){let y=m[f+0],_=m[f+1],x=m[f+2];l.push(y,_,_,x,x,y)}}else{if(u===void 0)return;{let m=u.array;d=u.version;for(let f=0,g=m.length/3-1;f<g;f+=3){let y=f+0,_=f+1,x=f+2;l.push(y,_,_,x,x,y)}}}let p=new(Bc(l)?zs:vr)(l,1);p.version=d;let v=s.get(c);v&&e.remove(v),s.set(c,p)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function zp(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let p=0;p<l;p++)d+=c[p]*h[p];t.update(d,n,1)}}}function Gp(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function kp(r,e,t){let n=new WeakMap,i=new qt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let O=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",O)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),v===!0&&(y=3);let _=a.attributes.position.count*y,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*x*4*h),b=new Fs(T,_,x,h);b.type=oi,b.needsUpdate=!0;let I=4*y;for(let N=0;N<h;N++){let F=m[N],P=f[N],L=g[N],q=_*x*4*N;for(let W=0;W<F.count;W++){let $=W*I;d===!0&&(i.fromBufferAttribute(F,W),T[q+$+0]=i.x,T[q+$+1]=i.y,T[q+$+2]=i.z,T[q+$+3]=0),p===!0&&(i.fromBufferAttribute(P,W),T[q+$+4]=i.x,T[q+$+5]=i.y,T[q+$+6]=i.z,T[q+$+7]=0),v===!0&&(i.fromBufferAttribute(L,W),T[q+$+8]=i.x,T[q+$+9]=i.y,T[q+$+10]=i.z,T[q+$+11]=L.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new Me(_,x)},n.set(a,u),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Vp(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var yd=new Dn,ed=new js(1,1),_d=new Fs,xd=new Qa,Md=new Gs,td=[],nd=[],id=new Float32Array(16),rd=new Float32Array(9),sd=new Float32Array(4);function ys(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=td[i];if(s===void 0&&(s=new Float32Array(i),td[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Tn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function bn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Qo(r,e){let t=nd[e];t===void 0&&(t=new Int32Array(e),nd[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Hp(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Wp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tn(t,e))return;r.uniform2fv(this.addr,e),bn(t,e)}}function Xp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tn(t,e))return;r.uniform3fv(this.addr,e),bn(t,e)}}function jp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tn(t,e))return;r.uniform4fv(this.addr,e),bn(t,e)}}function qp(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Tn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),bn(t,e)}else{if(Tn(t,n))return;sd.set(n),r.uniformMatrix2fv(this.addr,!1,sd),bn(t,n)}}function Yp(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Tn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),bn(t,e)}else{if(Tn(t,n))return;rd.set(n),r.uniformMatrix3fv(this.addr,!1,rd),bn(t,n)}}function Zp(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Tn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),bn(t,e)}else{if(Tn(t,n))return;id.set(n),r.uniformMatrix4fv(this.addr,!1,id),bn(t,n)}}function Jp(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Kp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tn(t,e))return;r.uniform2iv(this.addr,e),bn(t,e)}}function $p(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tn(t,e))return;r.uniform3iv(this.addr,e),bn(t,e)}}function Qp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tn(t,e))return;r.uniform4iv(this.addr,e),bn(t,e)}}function ef(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function tf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tn(t,e))return;r.uniform2uiv(this.addr,e),bn(t,e)}}function nf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tn(t,e))return;r.uniform3uiv(this.addr,e),bn(t,e)}}function rf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tn(t,e))return;r.uniform4uiv(this.addr,e),bn(t,e)}}function sf(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(ed.compareFunction=Uc,s=ed):s=yd,t.setTexture2D(e||s,i)}function af(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||xd,i)}function of(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Md,i)}function lf(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||_d,i)}function cf(r,e){r.uniform1fv(this.addr,e)}function hf(r,e){let t=ys(e,this.size,2);r.uniform2fv(this.addr,t)}function uf(r,e){let t=ys(e,this.size,3);r.uniform3fv(this.addr,t)}function df(r,e){let t=ys(e,this.size,4);r.uniform4fv(this.addr,t)}function pf(r,e){let t=ys(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function ff(r,e){let t=ys(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function mf(r,e){let t=ys(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function gf(r,e){r.uniform1iv(this.addr,e)}function vf(r,e){r.uniform2iv(this.addr,e)}function yf(r,e){r.uniform3iv(this.addr,e)}function _f(r,e){r.uniform4iv(this.addr,e)}function xf(r,e){r.uniform1uiv(this.addr,e)}function Mf(r,e){r.uniform2uiv(this.addr,e)}function Tf(r,e){r.uniform3uiv(this.addr,e)}function bf(r,e){r.uniform4uiv(this.addr,e)}function Sf(r,e,t){let n=this.cache,i=e.length,s=Qo(t,i);Tn(n,s)||(r.uniform1iv(this.addr,s),bn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||yd,s[a])}function wf(r,e,t){let n=this.cache,i=e.length,s=Qo(t,i);Tn(n,s)||(r.uniform1iv(this.addr,s),bn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||xd,s[a])}function Ef(r,e,t){let n=this.cache,i=e.length,s=Qo(t,i);Tn(n,s)||(r.uniform1iv(this.addr,s),bn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Md,s[a])}function Af(r,e,t){let n=this.cache,i=e.length,s=Qo(t,i);Tn(n,s)||(r.uniform1iv(this.addr,s),bn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||_d,s[a])}var qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Hp;case 35664:return Wp;case 35665:return Xp;case 35666:return jp;case 35674:return qp;case 35675:return Yp;case 35676:return Zp;case 5124:case 35670:return Jp;case 35667:case 35671:return Kp;case 35668:case 35672:return $p;case 35669:case 35673:return Qp;case 5125:return ef;case 36294:return tf;case 36295:return nf;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return sf;case 35679:case 36299:case 36307:return af;case 35680:case 36300:case 36308:case 36293:return of;case 36289:case 36303:case 36311:case 36292:return lf}})(t.type)}},Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return cf;case 35664:return hf;case 35665:return uf;case 35666:return df;case 35674:return pf;case 35675:return ff;case 35676:return mf;case 5124:case 35670:return gf;case 35667:case 35671:return vf;case 35668:case 35672:return yf;case 35669:case 35673:return _f;case 5125:return xf;case 36294:return Mf;case 36295:return Tf;case 36296:return bf;case 35678:case 36198:case 36298:case 36306:case 35682:return Sf;case 35679:case 36299:case 36307:return wf;case 35680:case 36300:case 36308:case 36293:return Ef;case 36289:case 36303:case 36311:case 36292:return Af}})(t.type)}},Zc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},jc=/(\w+)(\])?(\[|\.)?/g;function ad(r,e){r.seq.push(e),r.map[e.id]=e}function Cf(r,e,t){let n=r.name,i=n.length;for(jc.lastIndex=0;;){let s=jc.exec(n),a=jc.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){ad(t,l===void 0?new qc(o,r,e):new Yc(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Zc(o),ad(t,h)),t=h}}}var vs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Cf(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function od(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Rf=0,ld=new At;function cd(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let p=u;p<d;p++){let v=p+1;h.push(`${v===c?">":" "} ${v}: ${l[p]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Pf(r,e){let t=(function(n){jt._getMatrix(ld,jt.workingColorSpace,n);let i=`mat3( ${ld.elements.map(s=>s.toFixed(4))} )`;switch(jt.getTransfer(n)){case Us:return[i,"LinearTransferOETF"];case Qt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function If(r,e){let t;switch(e){case xu:t="Linear";break;case Mu:t="Reinhard";break;case Tu:t="Cineon";break;case ai:t="ACESFilmic";break;case Su:t="AgX";break;case wu:t="Neutral";break;case bu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var $o=new w;function Lf(){return jt.getLuminanceCoefficients($o),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${$o.x.toFixed(4)}, ${$o.y.toFixed(4)}, ${$o.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fa(r){return r!==""}function hd(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ud(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Df=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jc(r){return r.replace(Df,Nf)}var Uf=new Map;function Nf(r,e){let t=Dt[e];if(t===void 0){let n=Uf.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Jc(t)}var Bf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dd(r){return r.replace(Bf,Ff)}function Ff(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function pd(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Of(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(P){let L="SHADOWMAP_TYPE_BASIC";return P.shadowMapType===Zl?L="SHADOWMAP_TYPE_PCF":P.shadowMapType===cs?L="SHADOWMAP_TYPE_PCF_SOFT":P.shadowMapType===Ei&&(L="SHADOWMAP_TYPE_VSM"),L})(t),l=(function(P){let L="ENVMAP_TYPE_CUBE";if(P.envMap)switch(P.envMapMode){case ds:case br:L="ENVMAP_TYPE_CUBE";break;case ca:L="ENVMAP_TYPE_CUBE_UV"}return L})(t),h=(function(P){let L="ENVMAP_MODE_REFLECTION";return P.envMap&&P.envMapMode===br&&(L="ENVMAP_MODE_REFRACTION"),L})(t),u=(function(P){let L="ENVMAP_BLENDING_NONE";if(P.envMap)switch(P.combine){case vu:L="ENVMAP_BLENDING_MULTIPLY";break;case yu:L="ENVMAP_BLENDING_MIX";break;case _u:L="ENVMAP_BLENDING_ADD"}return L})(t),d=(function(P){let L=P.envMapCubeUVHeight;if(L===null)return null;let q=Math.log2(L)-2,W=1/L;return{texelWidth:1/(3*Math.max(Math.pow(2,q),112)),texelHeight:W,maxMip:q}})(t),p=(function(P){return[P.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",P.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)})(t),v=(function(P){let L=[];for(let q in P){let W=P[q];W!==!1&&L.push("#define "+q+" "+W)}return L.join(`
`)})(s),m=i.createProgram(),f,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(fa).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(fa).join(`
`),g.length>0&&(g+=`
`)):(f=[pd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),g=[pd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?Dt.tonemapping_pars_fragment:"",t.toneMapping!==Hi?If("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,Pf("linearToOutputTexel",t.outputColorSpace),Lf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fa).join(`
`)),a=Jc(a),a=hd(a,t),a=ud(a,t),o=Jc(o),o=hd(o,t),o=ud(o,t),a=dd(a),o=dd(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=y+f+a,x=y+g+o,T=od(i,i.VERTEX_SHADER,_),b=od(i,i.FRAGMENT_SHADER,x);function I(P){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",q=i.getShaderInfoLog(T)||"",W=i.getShaderInfoLog(b)||"",$=L.trim(),ae=q.trim(),Z=W.trim(),oe=!0,Ue=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(oe=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,T,b);else{let Fe=cd(i,T,"vertex"),Te=cd(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+$+`
`+Fe+`
`+Te)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):ae!==""&&Z!==""||(Ue=!1);Ue&&(P.diagnostics={runnable:oe,programLog:$,vertexShader:{log:ae,prefix:f},fragmentShader:{log:Z,prefix:g}})}i.deleteShader(T),i.deleteShader(b),O=new vs(i,m),N=(function(L,q){let W={},$=L.getProgramParameter(q,L.ACTIVE_ATTRIBUTES);for(let ae=0;ae<$;ae++){let Z=L.getActiveAttrib(q,ae),oe=Z.name,Ue=1;Z.type===L.FLOAT_MAT2&&(Ue=2),Z.type===L.FLOAT_MAT3&&(Ue=3),Z.type===L.FLOAT_MAT4&&(Ue=4),W[oe]={type:Z.type,location:L.getAttribLocation(q,oe),locationSize:Ue}}return W})(i,m)}let O,N;i.attachShader(m,T),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),this.getUniforms=function(){return O===void 0&&I(this),O},this.getAttributes=function(){return N===void 0&&I(this),N};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(m,37297)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rf++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=b,this}var zf=0,Kc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new $c(e),t.set(e,n)),n}},$c=class{constructor(e){this.id=zf++,this.code=e,this.usedTimes=0}};function Gf(r,e,t,n,i,s,a){let o=new Os,c=new Kc,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,y,_,x){let T=_.fog,b=x.geometry,I=f.isMeshStandardMaterial?_.environment:null,O=(f.isMeshStandardMaterial?t:e).get(f.envMap||I),N=O&&O.mapping===ca?O.image.height:null,F=v[f.type];f.precision!==null&&(p=i.getMaxPrecision(f.precision),p!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",p,"instead."));let P=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,L=P!==void 0?P.length:0,q,W,$,ae,Z=0;if(b.morphAttributes.position!==void 0&&(Z=1),b.morphAttributes.normal!==void 0&&(Z=2),b.morphAttributes.color!==void 0&&(Z=3),F){let we=Ci[F];q=we.vertexShader,W=we.fragmentShader}else q=f.vertexShader,W=f.fragmentShader,c.update(f),$=c.getVertexShaderID(f),ae=c.getFragmentShaderID(f);let oe=r.getRenderTarget(),Ue=r.state.buffers.depth.getReversed(),Fe=x.isInstancedMesh===!0,Te=x.isBatchedMesh===!0,ze=!!f.map,Ce=!!f.matcap,ne=!!O,_e=!!f.aoMap,H=!!f.lightMap,Le=!!f.bumpMap,A=!!f.normalMap,R=!!f.displacementMap,j=!!f.emissiveMap,k=!!f.metalnessMap,S=!!f.roughnessMap,U=f.anisotropy>0,X=f.clearcoat>0,V=f.dispersion>0,pe=f.iridescence>0,te=f.sheen>0,ie=f.transmission>0,Ee=U&&!!f.anisotropyMap,He=X&&!!f.clearcoatMap,Pe=X&&!!f.clearcoatNormalMap,Je=X&&!!f.clearcoatRoughnessMap,ot=pe&&!!f.iridescenceMap,ft=pe&&!!f.iridescenceThicknessMap,Rt=te&&!!f.sheenColorMap,St=te&&!!f.sheenRoughnessMap,yt=!!f.specularMap,z=!!f.specularColorMap,ee=!!f.specularIntensityMap,fe=ie&&!!f.transmissionMap,Se=ie&&!!f.thicknessMap,Y=!!f.gradientMap,ce=!!f.alphaMap,de=f.alphaTest>0,be=!!f.alphaHash,xe=!!f.extensions,C=Hi;f.toneMapped&&(oe!==null&&oe.isXRRenderTarget!==!0||(C=r.toneMapping));let le={shaderID:F,shaderType:f.type,shaderName:f.name,vertexShader:q,fragmentShader:W,defines:f.defines,customVertexShaderID:$,customFragmentShaderID:ae,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:p,batching:Te,batchingColor:Te&&x._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&x.instanceColor!==null,instancingMorph:Fe&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?r.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:mr,alphaToCoverage:!!f.alphaToCoverage,map:ze,matcap:Ce,envMap:ne,envMapMode:ne&&O.mapping,envMapCubeUVHeight:N,aoMap:_e,lightMap:H,bumpMap:Le,normalMap:A,displacementMap:d&&R,emissiveMap:j,normalMapObjectSpace:A&&f.normalMapType===Lu,normalMapTangentSpace:A&&f.normalMapType===Iu,metalnessMap:k,roughnessMap:S,anisotropy:U,anisotropyMap:Ee,clearcoat:X,clearcoatMap:He,clearcoatNormalMap:Pe,clearcoatRoughnessMap:Je,dispersion:V,iridescence:pe,iridescenceMap:ot,iridescenceThicknessMap:ft,sheen:te,sheenColorMap:Rt,sheenRoughnessMap:St,specularMap:yt,specularColorMap:z,specularIntensityMap:ee,transmission:ie,transmissionMap:fe,thicknessMap:Se,gradientMap:Y,opaque:f.transparent===!1&&f.blending===oa&&f.alphaToCoverage===!1,alphaMap:ce,alphaTest:de,alphaHash:be,combine:f.combine,mapUv:ze&&m(f.map.channel),aoMapUv:_e&&m(f.aoMap.channel),lightMapUv:H&&m(f.lightMap.channel),bumpMapUv:Le&&m(f.bumpMap.channel),normalMapUv:A&&m(f.normalMap.channel),displacementMapUv:R&&m(f.displacementMap.channel),emissiveMapUv:j&&m(f.emissiveMap.channel),metalnessMapUv:k&&m(f.metalnessMap.channel),roughnessMapUv:S&&m(f.roughnessMap.channel),anisotropyMapUv:Ee&&m(f.anisotropyMap.channel),clearcoatMapUv:He&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Je&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:ot&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:St&&m(f.sheenRoughnessMap.channel),specularMapUv:yt&&m(f.specularMap.channel),specularColorMapUv:z&&m(f.specularColorMap.channel),specularIntensityMapUv:ee&&m(f.specularIntensityMap.channel),transmissionMapUv:fe&&m(f.transmissionMap.channel),thicknessMapUv:Se&&m(f.thicknessMap.channel),alphaMapUv:ce&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(A||U),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(ze||ce),fog:!!T,useFog:f.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ue,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:Z,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&y.length>0,shadowMapType:r.shadowMap.type,toneMapping:C,decodeVideoTexture:ze&&f.map.isVideoTexture===!0&&jt.getTransfer(f.map.colorSpace)===Qt,decodeVideoTextureEmissive:j&&f.emissiveMap.isVideoTexture===!0&&jt.getTransfer(f.emissiveMap.colorSpace)===Qt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Wt,flipSided:f.side===ei,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:xe&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&f.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let y in f.defines)g.push(y),g.push(f.defines[y]);return f.isRawShaderMaterial===!1&&((function(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)})(g,f),(function(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=v[f.type],y;if(g){let _=Ci[g];y=Hu.clone(_.uniforms)}else y=f.uniforms;return y},acquireProgram:function(f,g){let y;for(let _=0,x=h.length;_<x;_++){let T=h[_];if(T.cacheKey===g){y=T,++y.usedTimes;break}}return y===void 0&&(y=new Of(r,g,f,s),h.push(y)),y},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function kf(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Vf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function fd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function md(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Vf),n.length>1&&n.sort(o||fd),i.length>1&&i.sort(o||fd)}}}function Hf(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new md,r.set(e,[i])):t>=n.length?(i=new md,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Wf(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new lt};break;case"SpotLight":t={position:new w,direction:new w,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var Xf=0;function jf(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function qf(r){let e=new Wf,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new ht,a=new ht;return{setup:function(o){let c=0,l=0,h=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let u=0,d=0,p=0,v=0,m=0,f=0,g=0,y=0,_=0,x=0,T=0;o.sort(jf);for(let I=0,O=o.length;I<O;I++){let N=o[I],F=N.color,P=N.intensity,L=N.distance,q=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)c+=F.r*P,l+=F.g*P,h+=F.b*P;else if(N.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(N.sh.coefficients[W],P);T++}else if(N.isDirectionalLight){let W=e.get(N);if(W.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let $=N.shadow,ae=t.get(N);ae.shadowIntensity=$.intensity,ae.shadowBias=$.bias,ae.shadowNormalBias=$.normalBias,ae.shadowRadius=$.radius,ae.shadowMapSize=$.mapSize,n.directionalShadow[u]=ae,n.directionalShadowMap[u]=q,n.directionalShadowMatrix[u]=N.shadow.matrix,f++}n.directional[u]=W,u++}else if(N.isSpotLight){let W=e.get(N);W.position.setFromMatrixPosition(N.matrixWorld),W.color.copy(F).multiplyScalar(P),W.distance=L,W.coneCos=Math.cos(N.angle),W.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),W.decay=N.decay,n.spot[p]=W;let $=N.shadow;if(N.map&&(n.spotLightMap[_]=N.map,_++,$.updateMatrices(N),N.castShadow&&x++),n.spotLightMatrix[p]=$.matrix,N.castShadow){let ae=t.get(N);ae.shadowIntensity=$.intensity,ae.shadowBias=$.bias,ae.shadowNormalBias=$.normalBias,ae.shadowRadius=$.radius,ae.shadowMapSize=$.mapSize,n.spotShadow[p]=ae,n.spotShadowMap[p]=q,y++}p++}else if(N.isRectAreaLight){let W=e.get(N);W.color.copy(F).multiplyScalar(P),W.halfWidth.set(.5*N.width,0,0),W.halfHeight.set(0,.5*N.height,0),n.rectArea[v]=W,v++}else if(N.isPointLight){let W=e.get(N);if(W.color.copy(N.color).multiplyScalar(N.intensity),W.distance=N.distance,W.decay=N.decay,N.castShadow){let $=N.shadow,ae=t.get(N);ae.shadowIntensity=$.intensity,ae.shadowBias=$.bias,ae.shadowNormalBias=$.normalBias,ae.shadowRadius=$.radius,ae.shadowMapSize=$.mapSize,ae.shadowCameraNear=$.camera.near,ae.shadowCameraFar=$.camera.far,n.pointShadow[d]=ae,n.pointShadowMap[d]=q,n.pointShadowMatrix[d]=N.shadow.matrix,g++}n.point[d]=W,d++}else if(N.isHemisphereLight){let W=e.get(N);W.skyColor.copy(N.color).multiplyScalar(P),W.groundColor.copy(N.groundColor).multiplyScalar(P),n.hemi[m]=W,m++}}v>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=We.LTC_FLOAT_1,n.rectAreaLTC2=We.LTC_FLOAT_2):(n.rectAreaLTC1=We.LTC_HALF_1,n.rectAreaLTC2=We.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===p&&b.rectAreaLength===v&&b.hemiLength===m&&b.numDirectionalShadows===f&&b.numPointShadows===g&&b.numSpotShadows===y&&b.numSpotMaps===_&&b.numLightProbes===T||(n.directional.length=u,n.spot.length=p,n.rectArea.length=v,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=y+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=T,b.directionalLength=u,b.pointLength=d,b.spotLength=p,b.rectAreaLength=v,b.hemiLength=m,b.numDirectionalShadows=f,b.numPointShadows=g,b.numSpotShadows=y,b.numSpotMaps=_,b.numLightProbes=T,n.version=Xf++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,p=0,v=c.matrixWorldInverse;for(let m=0,f=o.length;m<f;m++){let g=o[m];if(g.isDirectionalLight){let y=n.directional[l];y.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(v),l++}else if(g.isSpotLight){let y=n.spot[u];y.position.setFromMatrixPosition(g.matrixWorld),y.position.applyMatrix4(v),y.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(v),u++}else if(g.isRectAreaLight){let y=n.rectArea[d];y.position.setFromMatrixPosition(g.matrixWorld),y.position.applyMatrix4(v),a.identity(),s.copy(g.matrixWorld),s.premultiply(v),a.extractRotation(s),y.halfWidth.set(.5*g.width,0,0),y.halfHeight.set(0,.5*g.height,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(g.matrixWorld),y.position.applyMatrix4(v),h++}else if(g.isHemisphereLight){let y=n.hemi[p];y.direction.setFromMatrixPosition(g.matrixWorld),y.direction.transformDirection(v),p++}}},state:n}}function gd(r){let e=new qf(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Yf(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new gd(r),e.set(t,[s])):n>=i.length?(s=new gd(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Zf(r,e,t){let n=new tr,i=new Me,s=new Me,a=new qt,o=new ir({depthPacking:ms}),c=new xo,l={},h=t.maxTextureSize,u={[hs]:ei,[ei]:hs,[Wt]:Wt},d=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let v=new ut;v.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new ct(v,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zl;let g=this.type;function y(b,I){let O=e.update(m);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new si(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(I,null,O,d,m,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(I,null,O,p,m,null)}function _(b,I,O,N){let F=null,P=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)F=P;else if(F=O.isPointLight===!0?c:o,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let L=F.uuid,q=I.uuid,W=l[L];W===void 0&&(W={},l[L]=W);let $=W[q];$===void 0&&($=F.clone(),W[q]=$,I.addEventListener("dispose",T)),F=$}return F.visible=I.visible,F.wireframe=I.wireframe,F.side=N===Ei?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:u[I.side],F.alphaMap=I.alphaMap,F.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,F.map=I.map,F.clipShadows=I.clipShadows,F.clippingPlanes=I.clippingPlanes,F.clipIntersection=I.clipIntersection,F.displacementMap=I.displacementMap,F.displacementScale=I.displacementScale,F.displacementBias=I.displacementBias,F.wireframeLinewidth=I.wireframeLinewidth,F.linewidth=I.linewidth,O.isPointLight===!0&&F.isMeshDistanceMaterial===!0&&(r.properties.get(F).light=O),F}function x(b,I,O,N,F){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&F===Ei)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);let L=e.update(b),q=b.material;if(Array.isArray(q)){let W=L.groups;for(let $=0,ae=W.length;$<ae;$++){let Z=W[$],oe=q[Z.materialIndex];if(oe&&oe.visible){let Ue=_(b,oe,N,F);b.onBeforeShadow(r,b,I,O,L,Ue,Z),r.renderBufferDirect(O,null,L,Ue,b,Z),b.onAfterShadow(r,b,I,O,L,Ue,Z)}}}else if(q.visible){let W=_(b,q,N,F);b.onBeforeShadow(r,b,I,O,L,W,null),r.renderBufferDirect(O,null,L,W,b,null),b.onAfterShadow(r,b,I,O,L,W,null)}}let P=b.children;for(let L=0,q=P.length;L<q;L++)x(P[L],I,O,N,F)}function T(b){b.target.removeEventListener("dispose",T);for(let I in l){let O=l[I],N=b.target.uuid;N in O&&(O[N].dispose(),delete O[N])}}this.render=function(b,I,O){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;let N=r.getRenderTarget(),F=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),L=r.state;L.setBlending(rr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let q=g!==Ei&&this.type===Ei,W=g===Ei&&this.type!==Ei;for(let $=0,ae=b.length;$<ae;$++){let Z=b[$],oe=Z.shadow;if(oe===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(oe.autoUpdate===!1&&oe.needsUpdate===!1)continue;i.copy(oe.mapSize);let Ue=oe.getFrameExtents();if(i.multiply(Ue),s.copy(oe.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Ue.x),i.x=s.x*Ue.x,oe.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Ue.y),i.y=s.y*Ue.y,oe.mapSize.y=s.y)),oe.map===null||q===!0||W===!0){let Te=this.type!==Ei?{minFilter:Si,magFilter:Si}:{};oe.map!==null&&oe.map.dispose(),oe.map=new si(i.x,i.y,Te),oe.map.texture.name=Z.name+".shadowMap",oe.camera.updateProjectionMatrix()}r.setRenderTarget(oe.map),r.clear();let Fe=oe.getViewportCount();for(let Te=0;Te<Fe;Te++){let ze=oe.getViewport(Te);a.set(s.x*ze.x,s.y*ze.y,s.x*ze.z,s.y*ze.w),L.viewport(a),oe.updateMatrices(Z,Te),n=oe.getFrustum(),x(I,O,oe.camera,Z,this.type)}oe.isPointLightShadow!==!0&&this.type===Ei&&y(oe,O),oe.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(N,F,P)}}var Jf={[Io]:Lo,[Do]:Bo,[Uo]:Fo,[la]:No,[Lo]:Io,[Bo]:Do,[Fo]:Uo,[No]:la};function Kf(r,e){let t=new function(){let S=!1,U=new qt,X=null,V=new qt(0,0,0,0);return{setMask:function(pe){X===pe||S||(r.colorMask(pe,pe,pe,pe),X=pe)},setLocked:function(pe){S=pe},setClear:function(pe,te,ie,Ee,He){He===!0&&(pe*=Ee,te*=Ee,ie*=Ee),U.set(pe,te,ie,Ee),V.equals(U)===!1&&(r.clearColor(pe,te,ie,Ee),V.copy(U))},reset:function(){S=!1,X=null,V.set(-1,0,0,0)}}},n=new function(){let S=!1,U=!1,X=null,V=null,pe=null;return{setReversed:function(te){if(U!==te){let ie=e.get("EXT_clip_control");te?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT),U=te;let Ee=pe;pe=null,this.setClear(Ee)}},getReversed:function(){return U},setTest:function(te){te?ne(r.DEPTH_TEST):_e(r.DEPTH_TEST)},setMask:function(te){X===te||S||(r.depthMask(te),X=te)},setFunc:function(te){if(U&&(te=Jf[te]),V!==te){switch(te){case Io:r.depthFunc(r.NEVER);break;case Lo:r.depthFunc(r.ALWAYS);break;case Do:r.depthFunc(r.LESS);break;case la:r.depthFunc(r.LEQUAL);break;case Uo:r.depthFunc(r.EQUAL);break;case No:r.depthFunc(r.GEQUAL);break;case Bo:r.depthFunc(r.GREATER);break;case Fo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}V=te}},setLocked:function(te){S=te},setClear:function(te){pe!==te&&(U&&(te=1-te),r.clearDepth(te),pe=te)},reset:function(){S=!1,X=null,V=null,pe=null,U=!1}}},i=new function(){let S=!1,U=null,X=null,V=null,pe=null,te=null,ie=null,Ee=null,He=null;return{setTest:function(Pe){S||(Pe?ne(r.STENCIL_TEST):_e(r.STENCIL_TEST))},setMask:function(Pe){U===Pe||S||(r.stencilMask(Pe),U=Pe)},setFunc:function(Pe,Je,ot){X===Pe&&V===Je&&pe===ot||(r.stencilFunc(Pe,Je,ot),X=Pe,V=Je,pe=ot)},setOp:function(Pe,Je,ot){te===Pe&&ie===Je&&Ee===ot||(r.stencilOp(Pe,Je,ot),te=Pe,ie=Je,Ee=ot)},setLocked:function(Pe){S=Pe},setClear:function(Pe){He!==Pe&&(r.clearStencil(Pe),He=Pe)},reset:function(){S=!1,U=null,X=null,V=null,pe=null,te=null,ie=null,Ee=null,He=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,v=null,m=null,f=null,g=null,y=null,_=null,x=new lt(0,0,0),T=0,b=!1,I=null,O=null,N=null,F=null,P=null,L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,$=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec($)[1]),q=W>=1):$.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=W>=2);let ae=null,Z={},oe=r.getParameter(r.SCISSOR_BOX),Ue=r.getParameter(r.VIEWPORT),Fe=new qt().fromArray(oe),Te=new qt().fromArray(Ue);function ze(S,U,X,V){let pe=new Uint8Array(4),te=r.createTexture();r.bindTexture(S,te),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ie=0;ie<X;ie++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(U,0,r.RGBA,1,1,V,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(U+ie,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return te}let Ce={};function ne(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function _e(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}Ce[r.TEXTURE_2D]=ze(r.TEXTURE_2D,r.TEXTURE_2D,1),Ce[r.TEXTURE_CUBE_MAP]=ze(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ce[r.TEXTURE_2D_ARRAY]=ze(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ce[r.TEXTURE_3D]=ze(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),ne(r.DEPTH_TEST),n.setFunc(la),R(!1),j(Yl),ne(r.CULL_FACE),A(rr);let H={[us]:r.FUNC_ADD,[$h]:r.FUNC_SUBTRACT,[Qh]:r.FUNC_REVERSE_SUBTRACT};H[eu]=r.MIN,H[tu]=r.MAX;let Le={[nu]:r.ZERO,[iu]:r.ONE,[ru]:r.SRC_COLOR,[au]:r.SRC_ALPHA,[du]:r.SRC_ALPHA_SATURATE,[hu]:r.DST_COLOR,[lu]:r.DST_ALPHA,[su]:r.ONE_MINUS_SRC_COLOR,[ou]:r.ONE_MINUS_SRC_ALPHA,[uu]:r.ONE_MINUS_DST_COLOR,[cu]:r.ONE_MINUS_DST_ALPHA,[pu]:r.CONSTANT_COLOR,[fu]:r.ONE_MINUS_CONSTANT_COLOR,[mu]:r.CONSTANT_ALPHA,[gu]:r.ONE_MINUS_CONSTANT_ALPHA};function A(S,U,X,V,pe,te,ie,Ee,He,Pe){if(S!==rr){if(d===!1&&(ne(r.BLEND),d=!0),S===Kh)pe=pe||U,te=te||X,ie=ie||V,U===v&&pe===g||(r.blendEquationSeparate(H[U],H[pe]),v=U,g=pe),X===m&&V===f&&te===y&&ie===_||(r.blendFuncSeparate(Le[X],Le[V],Le[te],Le[ie]),m=X,f=V,y=te,_=ie),Ee.equals(x)!==!1&&He===T||(r.blendColor(Ee.r,Ee.g,Ee.b,He),x.copy(Ee),T=He),p=S,b=!1;else if(S!==p||Pe!==b){if(v===us&&g===us||(r.blendEquation(r.FUNC_ADD),v=us,g=us),Pe)switch(S){case oa:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Jl:r.blendFunc(r.ONE,r.ONE);break;case Kl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case $l:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case oa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Jl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Kl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $l:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}m=null,f=null,y=null,_=null,x.set(0,0,0),T=0,p=S,b=Pe}}else d===!0&&(_e(r.BLEND),d=!1)}function R(S){I!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),I=S)}function j(S){S!==Zh?(ne(r.CULL_FACE),S!==O&&(S===Yl?r.cullFace(r.BACK):S===Jh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):_e(r.CULL_FACE),O=S}function k(S,U,X){S?(ne(r.POLYGON_OFFSET_FILL),F===U&&P===X||(r.polygonOffset(U,X),F=U,P=X)):_e(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:ne,disable:_e,bindFramebuffer:function(S,U){return c[S]!==U&&(r.bindFramebuffer(S,U),c[S]=U,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=U),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=U),!0)},drawBuffers:function(S,U){let X=h,V=!1;if(S){X=l.get(U),X===void 0&&(X=[],l.set(U,X));let pe=S.textures;if(X.length!==pe.length||X[0]!==r.COLOR_ATTACHMENT0){for(let te=0,ie=pe.length;te<ie;te++)X[te]=r.COLOR_ATTACHMENT0+te;X.length=pe.length,V=!0}}else X[0]!==r.BACK&&(X[0]=r.BACK,V=!0);V&&r.drawBuffers(X)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:A,setMaterial:function(S,U){S.side===Wt?_e(r.CULL_FACE):ne(r.CULL_FACE);let X=S.side===ei;U&&(X=!X),R(X),S.blending===oa&&S.transparent===!1?A(rr):A(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let V=S.stencilWrite;i.setTest(V),V&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),k(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ne(r.SAMPLE_ALPHA_TO_COVERAGE):_e(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:R,setCullFace:j,setLineWidth:function(S){S!==N&&(q&&r.lineWidth(S),N=S)},setPolygonOffset:k,setScissorTest:function(S){S?ne(r.SCISSOR_TEST):_e(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+L-1),ae!==S&&(r.activeTexture(S),ae=S)},bindTexture:function(S,U,X){X===void 0&&(X=ae===null?r.TEXTURE0+L-1:ae);let V=Z[X];V===void 0&&(V={type:void 0,texture:void 0},Z[X]=V),V.type===S&&V.texture===U||(ae!==X&&(r.activeTexture(X),ae=X),r.bindTexture(S,U||Ce[S]),V.type=S,V.texture=U)},unbindTexture:function(){let S=Z[ae];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,U){let X=a.get(U);X===void 0&&(X=new WeakMap,a.set(U,X));let V=X.get(S);V===void 0&&(V=r.getUniformBlockIndex(U,S.name),X.set(S,V))},uniformBlockBinding:function(S,U){let X=a.get(U).get(S);s.get(U)!==X&&(r.uniformBlockBinding(U,X,S.__bindingPointIndex),s.set(U,X))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){Fe.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),Fe.copy(S))},viewport:function(S){Te.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),Te.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ae=null,Z={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,v=null,m=null,f=null,g=null,y=null,_=null,x=new lt(0,0,0),T=0,b=!1,I=null,O=null,N=null,F=null,P=null,Fe.set(0,0,r.canvas.width,r.canvas.height),Te.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function $f(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new Me,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,R){return p?new OffscreenCanvas(A,R):Kr("canvas")}function m(A,R,j){let k=1,S=Le(A);if((S.width>j||S.height>j)&&(k=j/Math.max(S.width,S.height)),k<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let U=Math.floor(k*S.width),X=Math.floor(k*S.height);u===void 0&&(u=v(U,X));let V=R?v(U,X):u;return V.width=U,V.height=X,V.getContext("2d").drawImage(A,0,0,U,X),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+U+"x"+X+")."),V}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),A}return A}function f(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,R,j,k,S=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let U=R;if(R===r.RED&&(j===r.FLOAT&&(U=r.R32F),j===r.HALF_FLOAT&&(U=r.R16F),j===r.UNSIGNED_BYTE&&(U=r.R8)),R===r.RED_INTEGER&&(j===r.UNSIGNED_BYTE&&(U=r.R8UI),j===r.UNSIGNED_SHORT&&(U=r.R16UI),j===r.UNSIGNED_INT&&(U=r.R32UI),j===r.BYTE&&(U=r.R8I),j===r.SHORT&&(U=r.R16I),j===r.INT&&(U=r.R32I)),R===r.RG&&(j===r.FLOAT&&(U=r.RG32F),j===r.HALF_FLOAT&&(U=r.RG16F),j===r.UNSIGNED_BYTE&&(U=r.RG8)),R===r.RG_INTEGER&&(j===r.UNSIGNED_BYTE&&(U=r.RG8UI),j===r.UNSIGNED_SHORT&&(U=r.RG16UI),j===r.UNSIGNED_INT&&(U=r.RG32UI),j===r.BYTE&&(U=r.RG8I),j===r.SHORT&&(U=r.RG16I),j===r.INT&&(U=r.RG32I)),R===r.RGB_INTEGER&&(j===r.UNSIGNED_BYTE&&(U=r.RGB8UI),j===r.UNSIGNED_SHORT&&(U=r.RGB16UI),j===r.UNSIGNED_INT&&(U=r.RGB32UI),j===r.BYTE&&(U=r.RGB8I),j===r.SHORT&&(U=r.RGB16I),j===r.INT&&(U=r.RGB32I)),R===r.RGBA_INTEGER&&(j===r.UNSIGNED_BYTE&&(U=r.RGBA8UI),j===r.UNSIGNED_SHORT&&(U=r.RGBA16UI),j===r.UNSIGNED_INT&&(U=r.RGBA32UI),j===r.BYTE&&(U=r.RGBA8I),j===r.SHORT&&(U=r.RGBA16I),j===r.INT&&(U=r.RGBA32I)),R===r.RGB&&(j===r.UNSIGNED_INT_5_9_9_9_REV&&(U=r.RGB9_E5),j===r.UNSIGNED_INT_10F_11F_11F_REV&&(U=r.R11F_G11F_B10F)),R===r.RGBA){let X=S?Us:jt.getTransfer(k);j===r.FLOAT&&(U=r.RGBA32F),j===r.HALF_FLOAT&&(U=r.RGBA16F),j===r.UNSIGNED_BYTE&&(U=X===Qt?r.SRGB8_ALPHA8:r.RGBA8),j===r.UNSIGNED_SHORT_4_4_4_4&&(U=r.RGBA4),j===r.UNSIGNED_SHORT_5_5_5_1&&(U=r.RGB5_A1)}return U!==r.R16F&&U!==r.R32F&&U!==r.RG16F&&U!==r.RG32F&&U!==r.RGBA16F&&U!==r.RGBA32F||e.get("EXT_color_buffer_float"),U}function x(A,R){let j;return A?R===null||R===Sr||R===fs?j=r.DEPTH24_STENCIL8:R===oi?j=r.DEPTH32F_STENCIL8:R===ps&&(j=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Sr||R===fs?j=r.DEPTH_COMPONENT24:R===oi?j=r.DEPTH_COMPONENT32F:R===ps&&(j=r.DEPTH_COMPONENT16),j}function T(A,R){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==Si&&A.minFilter!==Hn?Math.log2(Math.max(R.width,R.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?R.mipmaps.length:1}function b(A){let R=A.target;R.removeEventListener("dispose",b),(function(j){let k=n.get(j);if(k.__webglInit===void 0)return;let S=j.source,U=d.get(S);if(U){let X=U[k.__cacheKey];X.usedTimes--,X.usedTimes===0&&O(j),Object.keys(U).length===0&&d.delete(S)}n.remove(j)})(R),R.isVideoTexture&&h.delete(R)}function I(A){let R=A.target;R.removeEventListener("dispose",I),(function(j){let k=n.get(j);if(j.depthTexture&&(j.depthTexture.dispose(),n.remove(j.depthTexture)),j.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(k.__webglFramebuffer[U]))for(let X=0;X<k.__webglFramebuffer[U].length;X++)r.deleteFramebuffer(k.__webglFramebuffer[U][X]);else r.deleteFramebuffer(k.__webglFramebuffer[U]);k.__webglDepthbuffer&&r.deleteRenderbuffer(k.__webglDepthbuffer[U])}else{if(Array.isArray(k.__webglFramebuffer))for(let U=0;U<k.__webglFramebuffer.length;U++)r.deleteFramebuffer(k.__webglFramebuffer[U]);else r.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&r.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&r.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let U=0;U<k.__webglColorRenderbuffer.length;U++)k.__webglColorRenderbuffer[U]&&r.deleteRenderbuffer(k.__webglColorRenderbuffer[U]);k.__webglDepthRenderbuffer&&r.deleteRenderbuffer(k.__webglDepthRenderbuffer)}let S=j.textures;for(let U=0,X=S.length;U<X;U++){let V=n.get(S[U]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(S[U])}n.remove(j)})(R)}function O(A){let R=n.get(A);r.deleteTexture(R.__webglTexture);let j=A.source;delete d.get(j)[R.__cacheKey],a.memory.textures--}let N=0;function F(A,R){let j=n.get(A);if(A.isVideoTexture&&(function(k){let S=a.render.frame;h.get(k)!==S&&(h.set(k,S),k.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&j.__version!==A.version){let k=A.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(k.complete!==!1)return void Z(j,A,R);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(j.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,j.__webglTexture,r.TEXTURE0+R)}let P={[An]:r.REPEAT,[Jr]:r.CLAMP_TO_EDGE,[Za]:r.MIRRORED_REPEAT},L={[Si]:r.NEAREST,[Au]:r.NEAREST_MIPMAP_NEAREST,[ha]:r.NEAREST_MIPMAP_LINEAR,[Hn]:r.LINEAR,[Go]:r.LINEAR_MIPMAP_NEAREST,[vi]:r.LINEAR_MIPMAP_LINEAR},q={[Du]:r.NEVER,[zu]:r.ALWAYS,[Uu]:r.LESS,[Uc]:r.LEQUAL,[Nu]:r.EQUAL,[Ou]:r.GEQUAL,[Bu]:r.GREATER,[Fu]:r.NOTEQUAL};function W(A,R){if(R.type!==oi||e.has("OES_texture_float_linear")!==!1||R.magFilter!==Hn&&R.magFilter!==Go&&R.magFilter!==ha&&R.magFilter!==vi&&R.minFilter!==Hn&&R.minFilter!==Go&&R.minFilter!==ha&&R.minFilter!==vi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,P[R.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,P[R.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,P[R.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,L[R.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,L[R.minFilter]),R.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,q[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Si||R.minFilter!==ha&&R.minFilter!==vi||R.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){let j=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,i.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function $(A,R){let j=!1;A.__webglInit===void 0&&(A.__webglInit=!0,R.addEventListener("dispose",b));let k=R.source,S=d.get(k);S===void 0&&(S={},d.set(k,S));let U=(function(X){let V=[];return V.push(X.wrapS),V.push(X.wrapT),V.push(X.wrapR||0),V.push(X.magFilter),V.push(X.minFilter),V.push(X.anisotropy),V.push(X.internalFormat),V.push(X.format),V.push(X.type),V.push(X.generateMipmaps),V.push(X.premultiplyAlpha),V.push(X.flipY),V.push(X.unpackAlignment),V.push(X.colorSpace),V.join()})(R);if(U!==A.__cacheKey){S[U]===void 0&&(S[U]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,j=!0),S[U].usedTimes++;let X=S[A.__cacheKey];X!==void 0&&(S[A.__cacheKey].usedTimes--,X.usedTimes===0&&O(R)),A.__cacheKey=U,A.__webglTexture=S[U].texture}return j}function ae(A,R,j){return Math.floor(Math.floor(A/j)/R)}function Z(A,R,j){let k=r.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(k=r.TEXTURE_2D_ARRAY),R.isData3DTexture&&(k=r.TEXTURE_3D);let S=$(A,R),U=R.source;t.bindTexture(k,A.__webglTexture,r.TEXTURE0+j);let X=n.get(U);if(U.version!==X.__version||S===!0){t.activeTexture(r.TEXTURE0+j);let V=jt.getPrimaries(jt.workingColorSpace),pe=R.colorSpace===wr?null:jt.getPrimaries(R.colorSpace),te=R.colorSpace===wr||V===pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ie=m(R.image,!1,i.maxTextureSize);ie=H(R,ie);let Ee=s.convert(R.format,R.colorSpace),He=s.convert(R.type),Pe,Je=_(R.internalFormat,Ee,He,R.colorSpace,R.isVideoTexture);W(k,R);let ot=R.mipmaps,ft=R.isVideoTexture!==!0,Rt=X.__version===void 0||S===!0,St=U.dataReady,yt=T(R,ie);if(R.isDepthTexture)Je=x(R.format===da,R.type),Rt&&(ft?t.texStorage2D(r.TEXTURE_2D,1,Je,ie.width,ie.height):t.texImage2D(r.TEXTURE_2D,0,Je,ie.width,ie.height,0,Ee,He,null));else if(R.isDataTexture)if(ot.length>0){ft&&Rt&&t.texStorage2D(r.TEXTURE_2D,yt,Je,ot[0].width,ot[0].height);for(let z=0,ee=ot.length;z<ee;z++)Pe=ot[z],ft?St&&t.texSubImage2D(r.TEXTURE_2D,z,0,0,Pe.width,Pe.height,Ee,He,Pe.data):t.texImage2D(r.TEXTURE_2D,z,Je,Pe.width,Pe.height,0,Ee,He,Pe.data);R.generateMipmaps=!1}else ft?(Rt&&t.texStorage2D(r.TEXTURE_2D,yt,Je,ie.width,ie.height),St&&(function(z,ee,fe,Se){let Y=z.updateRanges;if(Y.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee.width,ee.height,fe,Se,ee.data);else{Y.sort((C,le)=>C.start-le.start);let ce=0;for(let C=1;C<Y.length;C++){let le=Y[ce],we=Y[C],ve=le.start+le.count,Oe=ae(we.start,ee.width,4),nt=ae(le.start,ee.width,4);we.start<=ve+1&&Oe===nt&&ae(we.start+we.count-1,ee.width,4)===Oe?le.count=Math.max(le.count,we.start+we.count-le.start):(++ce,Y[ce]=we)}Y.length=ce+1;let de=r.getParameter(r.UNPACK_ROW_LENGTH),be=r.getParameter(r.UNPACK_SKIP_PIXELS),xe=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,ee.width);for(let C=0,le=Y.length;C<le;C++){let we=Y[C],ve=Math.floor(we.start/4),Oe=Math.ceil(we.count/4),nt=ve%ee.width,Be=Math.floor(ve/ee.width),dt=Oe;r.pixelStorei(r.UNPACK_SKIP_PIXELS,nt),r.pixelStorei(r.UNPACK_SKIP_ROWS,Be),t.texSubImage2D(r.TEXTURE_2D,0,nt,Be,dt,1,fe,Se,ee.data)}z.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,de),r.pixelStorei(r.UNPACK_SKIP_PIXELS,be),r.pixelStorei(r.UNPACK_SKIP_ROWS,xe)}})(R,ie,Ee,He)):t.texImage2D(r.TEXTURE_2D,0,Je,ie.width,ie.height,0,Ee,He,ie.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){ft&&Rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,yt,Je,ot[0].width,ot[0].height,ie.depth);for(let z=0,ee=ot.length;z<ee;z++)if(Pe=ot[z],R.format!==li)if(Ee!==null)if(ft){if(St)if(R.layerUpdates.size>0){let fe=Gc(Pe.width,Pe.height,R.format,R.type);for(let Se of R.layerUpdates){let Y=Pe.data.subarray(Se*fe/Pe.data.BYTES_PER_ELEMENT,(Se+1)*fe/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,z,0,0,Se,Pe.width,Pe.height,1,Ee,Y)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,z,0,0,0,Pe.width,Pe.height,ie.depth,Ee,Pe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,z,Je,Pe.width,Pe.height,ie.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?St&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,z,0,0,0,Pe.width,Pe.height,ie.depth,Ee,He,Pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,z,Je,Pe.width,Pe.height,ie.depth,0,Ee,He,Pe.data)}else{ft&&Rt&&t.texStorage2D(r.TEXTURE_2D,yt,Je,ot[0].width,ot[0].height);for(let z=0,ee=ot.length;z<ee;z++)Pe=ot[z],R.format!==li?Ee!==null?ft?St&&t.compressedTexSubImage2D(r.TEXTURE_2D,z,0,0,Pe.width,Pe.height,Ee,Pe.data):t.compressedTexImage2D(r.TEXTURE_2D,z,Je,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?St&&t.texSubImage2D(r.TEXTURE_2D,z,0,0,Pe.width,Pe.height,Ee,He,Pe.data):t.texImage2D(r.TEXTURE_2D,z,Je,Pe.width,Pe.height,0,Ee,He,Pe.data)}else if(R.isDataArrayTexture)if(ft){if(Rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,yt,Je,ie.width,ie.height,ie.depth),St)if(R.layerUpdates.size>0){let z=Gc(ie.width,ie.height,R.format,R.type);for(let ee of R.layerUpdates){let fe=ie.data.subarray(ee*z/ie.data.BYTES_PER_ELEMENT,(ee+1)*z/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ee,ie.width,ie.height,1,Ee,He,fe)}R.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Ee,He,ie.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Je,ie.width,ie.height,ie.depth,0,Ee,He,ie.data);else if(R.isData3DTexture)ft?(Rt&&t.texStorage3D(r.TEXTURE_3D,yt,Je,ie.width,ie.height,ie.depth),St&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Ee,He,ie.data)):t.texImage3D(r.TEXTURE_3D,0,Je,ie.width,ie.height,ie.depth,0,Ee,He,ie.data);else if(R.isFramebufferTexture){if(Rt)if(ft)t.texStorage2D(r.TEXTURE_2D,yt,Je,ie.width,ie.height);else{let z=ie.width,ee=ie.height;for(let fe=0;fe<yt;fe++)t.texImage2D(r.TEXTURE_2D,fe,Je,z,ee,0,Ee,He,null),z>>=1,ee>>=1}}else if(ot.length>0){if(ft&&Rt){let z=Le(ot[0]);t.texStorage2D(r.TEXTURE_2D,yt,Je,z.width,z.height)}for(let z=0,ee=ot.length;z<ee;z++)Pe=ot[z],ft?St&&t.texSubImage2D(r.TEXTURE_2D,z,0,0,Ee,He,Pe):t.texImage2D(r.TEXTURE_2D,z,Je,Ee,He,Pe);R.generateMipmaps=!1}else if(ft){if(Rt){let z=Le(ie);t.texStorage2D(r.TEXTURE_2D,yt,Je,z.width,z.height)}St&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,He,ie)}else t.texImage2D(r.TEXTURE_2D,0,Je,Ee,He,ie);f(R)&&g(k),X.__version=U.version,R.onUpdate&&R.onUpdate(R)}A.__version=R.version}function oe(A,R,j,k,S,U){let X=s.convert(j.format,j.colorSpace),V=s.convert(j.type),pe=_(j.internalFormat,X,V,j.colorSpace),te=n.get(R),ie=n.get(j);if(ie.__renderTarget=R,!te.__hasExternalTextures){let Ee=Math.max(1,R.width>>U),He=Math.max(1,R.height>>U);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,U,pe,Ee,He,R.depth,0,X,V,null):t.texImage2D(S,U,pe,Ee,He,0,X,V,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),_e(R)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,k,S,ie.__webglTexture,0,ne(R)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,k,S,ie.__webglTexture,U),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ue(A,R,j){if(r.bindRenderbuffer(r.RENDERBUFFER,A),R.depthBuffer){let k=R.depthTexture,S=k&&k.isDepthTexture?k.type:null,U=x(R.stencilBuffer,S),X=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=ne(R);_e(R)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,V,U,R.width,R.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,V,U,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,U,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,X,r.RENDERBUFFER,A)}else{let k=R.textures;for(let S=0;S<k.length;S++){let U=k[S],X=s.convert(U.format,U.colorSpace),V=s.convert(U.type),pe=_(U.internalFormat,X,V,U.colorSpace),te=ne(R);j&&_e(R)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,pe,R.width,R.height):_e(R)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,pe,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,pe,R.width,R.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Fe(A,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!R.depthTexture||!R.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(R.depthTexture);j.__renderTarget=R,j.__webglTexture&&R.depthTexture.image.width===R.width&&R.depthTexture.image.height===R.height||(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),F(R.depthTexture,0);let k=j.__webglTexture,S=ne(R);if(R.depthTexture.format===ua)_e(R)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,k,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,k,0);else{if(R.depthTexture.format!==da)throw new Error("Unknown depthTexture format");_e(R)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,k,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,k,0)}}function Te(A){let R=n.get(A),j=A.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==A.depthTexture){let k=A.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),k){let S=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,k.removeEventListener("dispose",S)};k.addEventListener("dispose",S),R.__depthDisposeCallback=S}R.__boundDepthTexture=k}if(A.depthTexture&&!R.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");let k=A.texture.mipmaps;k&&k.length>0?Fe(R.__webglFramebuffer[0],A):Fe(R.__webglFramebuffer,A)}else if(j){R.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer[k]),R.__webglDepthbuffer[k]===void 0)R.__webglDepthbuffer[k]=r.createRenderbuffer(),Ue(R.__webglDepthbuffer[k],A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=R.__webglDepthbuffer[k];r.bindRenderbuffer(r.RENDERBUFFER,U),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,U)}}else{let k=A.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=r.createRenderbuffer(),Ue(R.__webglDepthbuffer,A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=R.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,U),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,U)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let ze=[],Ce=[];function ne(A){return Math.min(i.maxSamples,A.samples)}function _e(A){let R=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function H(A,R){let j=A.colorSpace,k=A.format,S=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||j!==mr&&j!==wr&&(jt.getTransfer(j)===Qt?k===li&&S===Ai||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),R}function Le(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=N;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),N+=1,A},this.resetTextureUnits=function(){N=0},this.setTexture2D=F,this.setTexture2DArray=function(A,R){let j=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&j.__version!==A.version?Z(j,A,R):t.bindTexture(r.TEXTURE_2D_ARRAY,j.__webglTexture,r.TEXTURE0+R)},this.setTexture3D=function(A,R){let j=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&j.__version!==A.version?Z(j,A,R):t.bindTexture(r.TEXTURE_3D,j.__webglTexture,r.TEXTURE0+R)},this.setTextureCube=function(A,R){let j=n.get(A);A.version>0&&j.__version!==A.version?(function(k,S,U){if(S.image.length!==6)return;let X=$(k,S),V=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+U);let pe=n.get(V);if(V.version!==pe.__version||X===!0){t.activeTexture(r.TEXTURE0+U);let te=jt.getPrimaries(jt.workingColorSpace),ie=S.colorSpace===wr?null:jt.getPrimaries(S.colorSpace),Ee=S.colorSpace===wr||te===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let He=S.isCompressedTexture||S.image[0].isCompressedTexture,Pe=S.image[0]&&S.image[0].isDataTexture,Je=[];for(let Y=0;Y<6;Y++)Je[Y]=He||Pe?Pe?S.image[Y].image:S.image[Y]:m(S.image[Y],!0,i.maxCubemapSize),Je[Y]=H(S,Je[Y]);let ot=Je[0],ft=s.convert(S.format,S.colorSpace),Rt=s.convert(S.type),St=_(S.internalFormat,ft,Rt,S.colorSpace),yt=S.isVideoTexture!==!0,z=pe.__version===void 0||X===!0,ee=V.dataReady,fe,Se=T(S,ot);if(W(r.TEXTURE_CUBE_MAP,S),He){yt&&z&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,St,ot.width,ot.height);for(let Y=0;Y<6;Y++){fe=Je[Y].mipmaps;for(let ce=0;ce<fe.length;ce++){let de=fe[ce];S.format!==li?ft!==null?yt?ee&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,de.width,de.height,ft,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,St,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):yt?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,de.width,de.height,ft,Rt,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,St,de.width,de.height,0,ft,Rt,de.data)}}}else{if(fe=S.mipmaps,yt&&z){fe.length>0&&Se++;let Y=Le(Je[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,St,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Pe){yt?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Je[Y].width,Je[Y].height,ft,Rt,Je[Y].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,St,Je[Y].width,Je[Y].height,0,ft,Rt,Je[Y].data);for(let ce=0;ce<fe.length;ce++){let de=fe[ce].image[Y].image;yt?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,de.width,de.height,ft,Rt,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,St,de.width,de.height,0,ft,Rt,de.data)}}else{yt?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ft,Rt,Je[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,St,ft,Rt,Je[Y]);for(let ce=0;ce<fe.length;ce++){let de=fe[ce];yt?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,ft,Rt,de.image[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,St,ft,Rt,de.image[Y])}}}f(S)&&g(r.TEXTURE_CUBE_MAP),pe.__version=V.version,S.onUpdate&&S.onUpdate(S)}k.__version=S.version})(j,A,R):t.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture,r.TEXTURE0+R)},this.rebindTextures=function(A,R,j){let k=n.get(A);R!==void 0&&oe(k.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),j!==void 0&&Te(A)},this.setupRenderTarget=function(A){let R=A.texture,j=n.get(A),k=n.get(R);A.addEventListener("dispose",I);let S=A.textures,U=A.isWebGLCubeRenderTarget===!0,X=S.length>1;if(X||(k.__webglTexture===void 0&&(k.__webglTexture=r.createTexture()),k.__version=R.version,a.memory.textures++),U){j.__webglFramebuffer=[];for(let V=0;V<6;V++)if(R.mipmaps&&R.mipmaps.length>0){j.__webglFramebuffer[V]=[];for(let pe=0;pe<R.mipmaps.length;pe++)j.__webglFramebuffer[V][pe]=r.createFramebuffer()}else j.__webglFramebuffer[V]=r.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){j.__webglFramebuffer=[];for(let V=0;V<R.mipmaps.length;V++)j.__webglFramebuffer[V]=r.createFramebuffer()}else j.__webglFramebuffer=r.createFramebuffer();if(X)for(let V=0,pe=S.length;V<pe;V++){let te=n.get(S[V]);te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&_e(A)===!1){j.__webglMultisampledFramebuffer=r.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let V=0;V<S.length;V++){let pe=S[V];j.__webglColorRenderbuffer[V]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,j.__webglColorRenderbuffer[V]);let te=s.convert(pe.format,pe.colorSpace),ie=s.convert(pe.type),Ee=_(pe.internalFormat,te,ie,pe.colorSpace,A.isXRRenderTarget===!0),He=ne(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,He,Ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.RENDERBUFFER,j.__webglColorRenderbuffer[V])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(j.__webglDepthRenderbuffer=r.createRenderbuffer(),Ue(j.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(U){t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture),W(r.TEXTURE_CUBE_MAP,R);for(let V=0;V<6;V++)if(R.mipmaps&&R.mipmaps.length>0)for(let pe=0;pe<R.mipmaps.length;pe++)oe(j.__webglFramebuffer[V][pe],A,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+V,pe);else oe(j.__webglFramebuffer[V],A,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);f(R)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(X){for(let V=0,pe=S.length;V<pe;V++){let te=S[V],ie=n.get(te),Ee=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ee=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ie.__webglTexture),W(Ee,te),oe(j.__webglFramebuffer,A,te,r.COLOR_ATTACHMENT0+V,Ee,0),f(te)&&g(Ee)}t.unbindTexture()}else{let V=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(V=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(V,k.__webglTexture),W(V,R),R.mipmaps&&R.mipmaps.length>0)for(let pe=0;pe<R.mipmaps.length;pe++)oe(j.__webglFramebuffer[pe],A,R,r.COLOR_ATTACHMENT0,V,pe);else oe(j.__webglFramebuffer,A,R,r.COLOR_ATTACHMENT0,V,0);f(R)&&g(V),t.unbindTexture()}A.depthBuffer&&Te(A)},this.updateRenderTargetMipmap=function(A){let R=A.textures;for(let j=0,k=R.length;j<k;j++){let S=R[j];if(f(S)){let U=y(A),X=n.get(S).__webglTexture;t.bindTexture(U,X),g(U),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(_e(A)===!1){let R=A.textures,j=A.width,k=A.height,S=r.COLOR_BUFFER_BIT,U=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=n.get(A),V=R.length>1;if(V)for(let te=0;te<R.length;te++)t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,X.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer);let pe=A.texture.mipmaps;pe&&pe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,X.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let te=0;te<R.length;te++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),V){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,X.__webglColorRenderbuffer[te]);let ie=n.get(R[te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ie,0)}r.blitFramebuffer(0,0,j,k,0,0,j,k,S,r.NEAREST),c===!0&&(ze.length=0,Ce.length=0,ze.push(r.COLOR_ATTACHMENT0+te),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ze.push(U),Ce.push(U),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ce)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),V)for(let te=0;te<R.length;te++){t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.RENDERBUFFER,X.__webglColorRenderbuffer[te]);let ie=n.get(R[te]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,X.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.TEXTURE_2D,ie,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let R=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[R])}}},this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=_e}function Qf(r,e){return{convert:function(t,n=wr){let i,s=jt.getTransfer(n);if(t===Ai)return r.UNSIGNED_BYTE;if(t===Vo)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Ho)return r.UNSIGNED_SHORT_5_5_5_1;if(t===nc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===ic)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===ec)return r.BYTE;if(t===tc)return r.SHORT;if(t===ps)return r.UNSIGNED_SHORT;if(t===ko)return r.INT;if(t===Sr)return r.UNSIGNED_INT;if(t===oi)return r.FLOAT;if(t===sr)return r.HALF_FLOAT;if(t===Cu)return r.ALPHA;if(t===Ru)return r.RGB;if(t===li)return r.RGBA;if(t===ua)return r.DEPTH_COMPONENT;if(t===da)return r.DEPTH_STENCIL;if(t===Wo)return r.RED;if(t===Xo)return r.RED_INTEGER;if(t===Pu)return r.RG;if(t===rc)return r.RG_INTEGER;if(t===sc)return r.RGBA_INTEGER;if(t===jo||t===qo||t===Yo||t===Zo)if(s===Qt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===jo)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===qo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Yo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Zo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===jo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===qo)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Yo)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Zo)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===ac||t===oc||t===lc||t===cc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===ac)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===oc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===lc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===cc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===hc||t===uc||t===dc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===hc||t===uc)return s===Qt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===dc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===pc||t===fc||t===mc||t===gc||t===vc||t===yc||t===_c||t===xc||t===Mc||t===Tc||t===bc||t===Sc||t===wc||t===Ec){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===pc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===fc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===mc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===gc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===vc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===yc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===_c)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===xc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Mc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Tc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===bc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Sc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===wc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Ec)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ac||t===Cc||t===Rc){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Ac)return s===Qt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Cc)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Rc)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Pc||t===Ic||t===Lc||t===Dc){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Pc)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Ic)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Lc)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Dc)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===fs?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Qc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Xn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},eh=class extends zi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,v=null,m=typeof XRWebGLBinding<"u",f=new Qc,g={},y=t.getContextAttributes(),_=null,x=null,T=[],b=[],I=new Me,O=null,N=new an;N.viewport=new qt;let F=new an;F.viewport=new qt;let P=[N,F],L=new Po,q=null,W=null;function $(Ce){let ne=b.indexOf(Ce.inputSource);if(ne===-1)return;let _e=T[ne];_e!==void 0&&(_e.update(Ce.inputSource,Ce.frame,l||a),_e.dispatchEvent({type:Ce.type,data:Ce.inputSource}))}function ae(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",ae),i.removeEventListener("inputsourceschange",Z);for(let Ce=0;Ce<T.length;Ce++){let ne=b[Ce];ne!==null&&(b[Ce]=null,T[Ce].disconnect(ne))}q=null,W=null,f.reset();for(let Ce in g)delete g[Ce];e.setRenderTarget(_),p=null,d=null,u=null,i=null,x=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}function Z(Ce){for(let ne=0;ne<Ce.removed.length;ne++){let _e=Ce.removed[ne],H=b.indexOf(_e);H>=0&&(b[H]=null,T[H].disconnect(_e))}for(let ne=0;ne<Ce.added.length;ne++){let _e=Ce.added[ne],H=b.indexOf(_e);if(H===-1){for(let A=0;A<T.length;A++){if(A>=b.length){b.push(_e),H=A;break}if(b[A]===null){b[A]=_e,H=A;break}}if(H===-1)break}let Le=T[H];Le&&Le.connect(_e)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Ce){let ne=T[Ce];return ne===void 0&&(ne=new ts,T[Ce]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Ce){let ne=T[Ce];return ne===void 0&&(ne=new ts,T[Ce]=ne),ne.getGripSpace()},this.getHand=function(Ce){let ne=T[Ce];return ne===void 0&&(ne=new ts,T[Ce]=ne),ne.getHandSpace()},this.setFramebufferScaleFactor=function(Ce){s=Ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Ce){o=Ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Ce){l=Ce},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(Ce){if(i=Ce,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",ae),i.addEventListener("inputsourceschange",Z),y.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(I),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,_e=null,H=null;y.depth&&(H=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=y.stencil?da:ua,_e=y.stencil?fs:Sr);let Le={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Le),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new si(d.textureWidth,d.textureHeight,{format:li,type:Ai,depthTexture:new js(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ne={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,ne),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new si(p.framebufferWidth,p.framebufferHeight,{format:li,type:Ai,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ze.setContext(i),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let oe=new w,Ue=new w;function Fe(Ce,ne){ne===null?Ce.matrixWorld.copy(Ce.matrix):Ce.matrixWorld.multiplyMatrices(ne.matrixWorld,Ce.matrix),Ce.matrixWorldInverse.copy(Ce.matrixWorld).invert()}this.updateCamera=function(Ce){if(i===null)return;let ne=Ce.near,_e=Ce.far;f.texture!==null&&(f.depthNear>0&&(ne=f.depthNear),f.depthFar>0&&(_e=f.depthFar)),L.near=F.near=N.near=ne,L.far=F.far=N.far=_e,q===L.near&&W===L.far||(i.updateRenderState({depthNear:L.near,depthFar:L.far}),q=L.near,W=L.far),L.layers.mask=6|Ce.layers.mask,N.layers.mask=3&L.layers.mask,F.layers.mask=5&L.layers.mask;let H=Ce.parent,Le=L.cameras;Fe(L,H);for(let A=0;A<Le.length;A++)Fe(Le[A],H);Le.length===2?(function(A,R,j){oe.setFromMatrixPosition(R.matrixWorld),Ue.setFromMatrixPosition(j.matrixWorld);let k=oe.distanceTo(Ue),S=R.projectionMatrix.elements,U=j.projectionMatrix.elements,X=S[14]/(S[10]-1),V=S[14]/(S[10]+1),pe=(S[9]+1)/S[5],te=(S[9]-1)/S[5],ie=(S[8]-1)/S[0],Ee=(U[8]+1)/U[0],He=X*ie,Pe=X*Ee,Je=k/(-ie+Ee),ot=Je*-ie;if(R.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(ot),A.translateZ(Je),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),S[10]===-1)A.projectionMatrix.copy(R.projectionMatrix),A.projectionMatrixInverse.copy(R.projectionMatrixInverse);else{let ft=X+Je,Rt=V+Je,St=He-ot,yt=Pe+(k-ot),z=pe*V/Rt*ft,ee=te*V/Rt*ft;A.projectionMatrix.makePerspective(St,yt,z,ee,ft,Rt),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(L,N,F):L.projectionMatrix.copy(N.projectionMatrix),(function(A,R,j){j===null?A.matrix.copy(R.matrixWorld):(A.matrix.copy(j.matrixWorld),A.matrix.invert(),A.matrix.multiply(R.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(R.projectionMatrix),A.projectionMatrixInverse.copy(R.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Bs*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(Ce,L,H)},this.getCamera=function(){return L},this.getFoveation=function(){if(d!==null||p!==null)return c},this.setFoveation=function(Ce){c=Ce,d!==null&&(d.fixedFoveation=Ce),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Ce)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(L)},this.getCameraTexture=function(Ce){return g[Ce]};let Te=null,ze=new vd;ze.setAnimationLoop(function(Ce,ne){if(h=ne.getViewerPose(l||a),v=ne,h!==null){let _e=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let H=!1;_e.length!==L.cameras.length&&(L.cameras.length=0,H=!0);for(let A=0;A<_e.length;A++){let R=_e[A],j=null;if(p!==null)j=p.getViewport(R);else{let S=u.getViewSubImage(d,R);j=S.viewport,A===0&&(e.setRenderTargetTextures(x,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(x))}let k=P[A];k===void 0&&(k=new an,k.layers.enable(A),k.viewport=new qt,P[A]=k),k.matrix.fromArray(R.transform.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale),k.projectionMatrix.fromArray(R.projectionMatrix),k.projectionMatrixInverse.copy(k.projectionMatrix).invert(),k.viewport.set(j.x,j.y,j.width,j.height),A===0&&(L.matrix.copy(k.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),H===!0&&L.cameras.push(k)}let Le=i.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){u=n.getBinding();let A=u.getDepthInformation(_e[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(Le&&Le.includes("camera-access")&&m){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<_e.length;A++){let R=_e[A].camera;if(R){let j=g[R];j||(j=new qs,g[R]=j);let k=u.getCameraImage(R);j.sourceTexture=k}}}}for(let _e=0;_e<T.length;_e++){let H=b[_e],Le=T[_e];H!==null&&Le!==void 0&&Le.update(H,ne,l||a)}Te&&Te(Ce,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),v=null}),this.setAnimationLoop=function(Ce){Te=Ce},this.dispose=function(){}}},Rr=new gi,em=new ht;function tm(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===ei&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===ei&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Rr.copy(c),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),i.envMapRotation.value.setFromMatrix4(em.makeRotationFromEuler(Rr)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Fc(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ei&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function nm(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,p,v){let m=u.value,f=d+"_"+p;if(v[f]===void 0)return v[f]=typeof m=="number"||typeof m=="boolean"?m:m.clone(),!0;{let g=v[f];if(typeof m=="number"||typeof m=="boolean"){if(g!==m)return v[f]=m,!0}else if(g.equals(m)===!1)return g.copy(m),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&((function(f){let g=f.uniforms,y=0,_=16;for(let T=0,b=g.length;T<b;T++){let I=Array.isArray(g[T])?g[T]:[g[T]];for(let O=0,N=I.length;O<N;O++){let F=I[O],P=Array.isArray(F.value)?F.value:[F.value];for(let L=0,q=P.length;L<q;L++){let W=l(P[L]),$=y%_,ae=$%W.boundary,Z=$+ae;y+=ae,Z!==0&&_-Z<W.storage&&(y+=_-Z),F.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=W.storage}}}let x=y%_;x>0&&(y+=_-x),f.__size=y,f.__cache={}})(u),p=(function(f){let g=(function(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let y=r.createBuffer(),_=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,_,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,y),y})(u),i[u.id]=p,u.addEventListener("dispose",h));let v=d.program;n.updateUBOMapping(u,v);let m=e.render.frame;s[u.id]!==m&&((function(f){let g=i[f.id],y=f.uniforms,_=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,T=y.length;x<T;x++){let b=Array.isArray(y[x])?y[x]:[y[x]];for(let I=0,O=b.length;I<O;I++){let N=b[I];if(c(N,x,I,_)===!0){let F=N.__offset,P=Array.isArray(N.value)?N.value:[N.value],L=0;for(let q=0;q<P.length;q++){let W=P[q],$=l(W);typeof W=="number"||typeof W=="boolean"?(N.__data[0]=W,r.bufferSubData(r.UNIFORM_BUFFER,F+L,N.__data)):W.isMatrix3?(N.__data[0]=W.elements[0],N.__data[1]=W.elements[1],N.__data[2]=W.elements[2],N.__data[3]=0,N.__data[4]=W.elements[3],N.__data[5]=W.elements[4],N.__data[6]=W.elements[5],N.__data[7]=0,N.__data[8]=W.elements[6],N.__data[9]=W.elements[7],N.__data[10]=W.elements[8],N.__data[11]=0):(W.toArray(N.__data,L),L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,N.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=m)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var ci=class{constructor(e={}){let{canvas:t=Gu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let v=new Uint32Array(4),m=new Int32Array(4),f=null,g=null,y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=bt;let b=0,I=0,O=null,N=-1,F=null,P=new qt,L=new qt,q=null,W=new lt(0),$=0,ae=t.width,Z=t.height,oe=1,Ue=null,Fe=null,Te=new qt(0,0,ae,Z),ze=new qt(0,0,ae,Z),Ce=!1,ne=new tr,_e=!1,H=!1,Le=new ht,A=new w,R=new qt,j={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},k=!1;function S(){return O===null?oe:1}let U,X,V,pe,te,ie,Ee,He,Pe,Je,ot,ft,Rt,St,yt,z,ee,fe,Se,Y,ce,de,be,xe,C=n;function le(D,re){return t.getContext(D,re)}try{let D={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Oe,!1),t.addEventListener("webglcontextrestored",nt,!1),t.addEventListener("webglcontextcreationerror",Be,!1),C===null){let re="webgl2";if(C=le(re,D),C===null)throw le(re)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}function we(){U=new Fp(C),U.init(),de=new Qf(C,U),X=new Lp(C,U,e,de),V=new Kf(C,U),X.reversedDepthBuffer&&d&&V.buffers.depth.setReversed(!0),pe=new Gp(C),te=new kf,ie=new $f(C,U,V,te,X,de,pe),Ee=new Up(x),He=new Bp(x),Pe=new Ap(C),be=new Pp(C,Pe),Je=new Op(C,Pe,pe,be),ot=new Vp(C,Je,Pe,pe),Se=new kp(C,X,ie),z=new Dp(te),ft=new Gf(x,Ee,He,U,X,be,z),Rt=new tm(x,te),St=new Hf,yt=new Yf(U),fe=new Rp(x,Ee,He,V,ot,p,c),ee=new Zf(x,ot,X),xe=new nm(C,pe,X,V),Y=new Ip(C,U,pe),ce=new zp(C,U,pe),pe.programs=ft.programs,x.capabilities=X,x.extensions=U,x.properties=te,x.renderLists=St,x.shadowMap=ee,x.state=V,x.info=pe}we();let ve=new eh(x,C);function Oe(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let D=pe.autoReset,re=ee.enabled,ge=ee.autoUpdate,Ae=ee.needsUpdate,ue=ee.type;we(),pe.autoReset=D,ee.enabled=re,ee.autoUpdate=ge,ee.needsUpdate=Ae,ee.type=ue}function Be(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function dt(D){let re=D.target;re.removeEventListener("dispose",dt),(function(ge){(function(Ae){let ue=te.get(Ae).programs;ue!==void 0&&(ue.forEach(function(De){ft.releaseProgram(De)}),Ae.isShaderMaterial&&ft.releaseShaderCache(Ae))})(ge),te.remove(ge)})(re)}function rt(D,re,ge){D.transparent===!0&&D.side===Wt&&D.forceSinglePass===!1?(D.side=ei,D.needsUpdate=!0,Rn(D,re,ge),D.side=hs,D.needsUpdate=!0,Rn(D,re,ge),D.side=Wt):Rn(D,re,ge)}this.xr=ve,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let D=U.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=U.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(D){D!==void 0&&(oe=D,this.setSize(ae,Z,!1))},this.getSize=function(D){return D.set(ae,Z)},this.setSize=function(D,re,ge=!0){ve.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ae=D,Z=re,t.width=Math.floor(D*oe),t.height=Math.floor(re*oe),ge===!0&&(t.style.width=D+"px",t.style.height=re+"px"),this.setViewport(0,0,D,re))},this.getDrawingBufferSize=function(D){return D.set(ae*oe,Z*oe).floor()},this.setDrawingBufferSize=function(D,re,ge){ae=D,Z=re,oe=ge,t.width=Math.floor(D*ge),t.height=Math.floor(re*ge),this.setViewport(0,0,D,re)},this.getCurrentViewport=function(D){return D.copy(P)},this.getViewport=function(D){return D.copy(Te)},this.setViewport=function(D,re,ge,Ae){D.isVector4?Te.set(D.x,D.y,D.z,D.w):Te.set(D,re,ge,Ae),V.viewport(P.copy(Te).multiplyScalar(oe).round())},this.getScissor=function(D){return D.copy(ze)},this.setScissor=function(D,re,ge,Ae){D.isVector4?ze.set(D.x,D.y,D.z,D.w):ze.set(D,re,ge,Ae),V.scissor(L.copy(ze).multiplyScalar(oe).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(D){V.setScissorTest(Ce=D)},this.setOpaqueSort=function(D){Ue=D},this.setTransparentSort=function(D){Fe=D},this.getClearColor=function(D){return D.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor(...arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha(...arguments)},this.clear=function(D=!0,re=!0,ge=!0){let Ae=0;if(D){let ue=!1;if(O!==null){let De=O.texture.format;ue=De===sc||De===rc||De===Xo}if(ue){let De=O.texture.type,Ye=De===Ai||De===Sr||De===ps||De===fs||De===Vo||De===Ho,Ie=fe.getClearColor(),ke=fe.getClearAlpha(),qe=Ie.r,Mt=Ie.g,Ve=Ie.b;Ye?(v[0]=qe,v[1]=Mt,v[2]=Ve,v[3]=ke,C.clearBufferuiv(C.COLOR,0,v)):(m[0]=qe,m[1]=Mt,m[2]=Ve,m[3]=ke,C.clearBufferiv(C.COLOR,0,m))}else Ae|=C.COLOR_BUFFER_BIT}re&&(Ae|=C.DEPTH_BUFFER_BIT),ge&&(Ae|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(Ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Oe,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),fe.dispose(),St.dispose(),yt.dispose(),te.dispose(),Ee.dispose(),He.dispose(),ot.dispose(),be.dispose(),xe.dispose(),ft.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",mt),ve.removeEventListener("sessionend",gt),pt.stop()},this.renderBufferDirect=function(D,re,ge,Ae,ue,De){re===null&&(re=j);let Ye=ue.isMesh&&ue.matrixWorld.determinant()<0,Ie=(function(Pt,sn,en,Et,xt){sn.isScene!==!0&&(sn=j),ie.resetTextureUnits();let zn=sn.fog,Xi=Et.isMeshStandardMaterial?sn.environment:null,fn=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:mr,ti=(Et.isMeshStandardMaterial?He:Ee).get(Et.envMap||Xi),On=Et.vertexColors===!0&&!!en.attributes.color&&en.attributes.color.itemSize===4,Jt=!!en.attributes.tangent&&(!!Et.normalMap||Et.anisotropy>0),ni=!!en.morphAttributes.position,_s=!!en.morphAttributes.normal,ii=!!en.morphAttributes.color,ga=Hi;Et.toneMapped&&(O!==null&&O.isXRRenderTarget!==!0||(ga=x.toneMapping));let Dr=en.morphAttributes.position||en.morphAttributes.normal||en.morphAttributes.color,ji=Dr!==void 0?Dr.length:0,It=te.get(Et),Gn=g.state.lights;if(_e===!0&&(H===!0||Pt!==F)){let _n=Pt===F&&Et.id===N;z.setState(Et,Pt,_n)}let Sn=!1;Et.version===It.__version?It.needsLights&&It.lightsStateVersion!==Gn.state.version||It.outputColorSpace!==fn||xt.isBatchedMesh&&It.batching===!1?Sn=!0:xt.isBatchedMesh||It.batching!==!0?xt.isBatchedMesh&&It.batchingColor===!0&&xt.colorTexture===null||xt.isBatchedMesh&&It.batchingColor===!1&&xt.colorTexture!==null||xt.isInstancedMesh&&It.instancing===!1?Sn=!0:xt.isInstancedMesh||It.instancing!==!0?xt.isSkinnedMesh&&It.skinning===!1?Sn=!0:xt.isSkinnedMesh||It.skinning!==!0?xt.isInstancedMesh&&It.instancingColor===!0&&xt.instanceColor===null||xt.isInstancedMesh&&It.instancingColor===!1&&xt.instanceColor!==null||xt.isInstancedMesh&&It.instancingMorph===!0&&xt.morphTexture===null||xt.isInstancedMesh&&It.instancingMorph===!1&&xt.morphTexture!==null||It.envMap!==ti||Et.fog===!0&&It.fog!==zn?Sn=!0:It.numClippingPlanes===void 0||It.numClippingPlanes===z.numPlanes&&It.numIntersection===z.numIntersection?(It.vertexAlphas!==On||It.vertexTangents!==Jt||It.morphTargets!==ni||It.morphNormals!==_s||It.morphColors!==ii||It.toneMapping!==ga||It.morphTargetsCount!==ji)&&(Sn=!0):Sn=!0:Sn=!0:Sn=!0:Sn=!0:(Sn=!0,It.__version=Et.version);let Pi=It.currentProgram;Sn===!0&&(Pi=Rn(Et,sn,xt));let cr=!1,Ur=!1,xs=!1,tn=Pi.getUniforms(),_i=It.uniforms;if(V.useProgram(Pi.program)&&(cr=!0,Ur=!0,xs=!0),Et.id!==N&&(N=Et.id,Ur=!0),cr||F!==Pt){V.buffers.depth.getReversed()&&Pt.reversedDepth!==!0&&(Pt._reversedDepth=!0,Pt.updateProjectionMatrix()),tn.setValue(C,"projectionMatrix",Pt.projectionMatrix),tn.setValue(C,"viewMatrix",Pt.matrixWorldInverse);let _n=tn.map.cameraPosition;_n!==void 0&&_n.setValue(C,A.setFromMatrixPosition(Pt.matrixWorld)),X.logarithmicDepthBuffer&&tn.setValue(C,"logDepthBufFC",2/(Math.log(Pt.far+1)/Math.LN2)),(Et.isMeshPhongMaterial||Et.isMeshToonMaterial||Et.isMeshLambertMaterial||Et.isMeshBasicMaterial||Et.isMeshStandardMaterial||Et.isShaderMaterial)&&tn.setValue(C,"isOrthographic",Pt.isOrthographicCamera===!0),F!==Pt&&(F=Pt,Ur=!0,xs=!0)}if(xt.isSkinnedMesh){tn.setOptional(C,xt,"bindMatrix"),tn.setOptional(C,xt,"bindMatrixInverse");let _n=xt.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),tn.setValue(C,"boneTexture",_n.boneTexture,ie))}xt.isBatchedMesh&&(tn.setOptional(C,xt,"batchingTexture"),tn.setValue(C,"batchingTexture",xt._matricesTexture,ie),tn.setOptional(C,xt,"batchingIdTexture"),tn.setValue(C,"batchingIdTexture",xt._indirectTexture,ie),tn.setOptional(C,xt,"batchingColorTexture"),xt._colorsTexture!==null&&tn.setValue(C,"batchingColorTexture",xt._colorsTexture,ie));let Pn=en.morphAttributes;Pn.position===void 0&&Pn.normal===void 0&&Pn.color===void 0||Se.update(xt,en,Pi),(Ur||It.receiveShadow!==xt.receiveShadow)&&(It.receiveShadow=xt.receiveShadow,tn.setValue(C,"receiveShadow",xt.receiveShadow)),Et.isMeshGouraudMaterial&&Et.envMap!==null&&(_i.envMap.value=ti,_i.flipEnvMap.value=ti.isCubeTexture&&ti.isRenderTargetTexture===!1?-1:1),Et.isMeshStandardMaterial&&Et.envMap===null&&sn.environment!==null&&(_i.envMapIntensity.value=sn.environmentIntensity),Ur&&(tn.setValue(C,"toneMappingExposure",x.toneMappingExposure),It.needsLights&&(kn=xs,(cn=_i).ambientLightColor.needsUpdate=kn,cn.lightProbe.needsUpdate=kn,cn.directionalLights.needsUpdate=kn,cn.directionalLightShadows.needsUpdate=kn,cn.pointLights.needsUpdate=kn,cn.pointLightShadows.needsUpdate=kn,cn.spotLights.needsUpdate=kn,cn.spotLightShadows.needsUpdate=kn,cn.rectAreaLights.needsUpdate=kn,cn.hemisphereLights.needsUpdate=kn),zn&&Et.fog===!0&&Rt.refreshFogUniforms(_i,zn),Rt.refreshMaterialUniforms(_i,Et,oe,Z,g.state.transmissionRenderTarget[Pt.id]),vs.upload(C,or(It),_i,ie));var cn,kn;if(Et.isShaderMaterial&&Et.uniformsNeedUpdate===!0&&(vs.upload(C,or(It),_i,ie),Et.uniformsNeedUpdate=!1),Et.isSpriteMaterial&&tn.setValue(C,"center",xt.center),tn.setValue(C,"modelViewMatrix",xt.modelViewMatrix),tn.setValue(C,"normalMatrix",xt.normalMatrix),tn.setValue(C,"modelMatrix",xt.matrixWorld),Et.isShaderMaterial||Et.isRawShaderMaterial){let _n=Et.uniformsGroups;for(let va=0,Nr=_n.length;va<Nr;va++){let il=_n[va];xe.update(il,Pi),xe.bind(il,Pi)}}return Pi})(D,re,ge,Ae,ue);V.setMaterial(Ae,Ye);let ke=ge.index,qe=1;if(Ae.wireframe===!0){if(ke=Je.getWireframeAttribute(ge),ke===void 0)return;qe=2}let Mt=ge.drawRange,Ve=ge.attributes.position,Ne=Mt.start*qe,Qe=(Mt.start+Mt.count)*qe;De!==null&&(Ne=Math.max(Ne,De.start*qe),Qe=Math.min(Qe,(De.start+De.count)*qe)),ke!==null?(Ne=Math.max(Ne,0),Qe=Math.min(Qe,ke.count)):Ve!=null&&(Ne=Math.max(Ne,0),Qe=Math.min(Qe,Ve.count));let rn=Qe-Ne;if(rn<0||rn===1/0)return;let dn;be.setup(ue,Ae,Ie,ge,ke);let Zt=Y;if(ke!==null&&(dn=Pe.get(ke),Zt=ce,Zt.setIndex(dn)),ue.isMesh)Ae.wireframe===!0?(V.setLineWidth(Ae.wireframeLinewidth*S()),Zt.setMode(C.LINES)):Zt.setMode(C.TRIANGLES);else if(ue.isLine){let Pt=Ae.linewidth;Pt===void 0&&(Pt=1),V.setLineWidth(Pt*S()),ue.isLineSegments?Zt.setMode(C.LINES):ue.isLineLoop?Zt.setMode(C.LINE_LOOP):Zt.setMode(C.LINE_STRIP)}else ue.isPoints?Zt.setMode(C.POINTS):ue.isSprite&&Zt.setMode(C.TRIANGLES);if(ue.isBatchedMesh)if(ue._multiDrawInstances!==null)$r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Zt.renderMultiDrawInstances(ue._multiDrawStarts,ue._multiDrawCounts,ue._multiDrawCount,ue._multiDrawInstances);else if(U.get("WEBGL_multi_draw"))Zt.renderMultiDraw(ue._multiDrawStarts,ue._multiDrawCounts,ue._multiDrawCount);else{let Pt=ue._multiDrawStarts,sn=ue._multiDrawCounts,en=ue._multiDrawCount,Et=ke?Pe.get(ke).bytesPerElement:1,xt=te.get(Ae).currentProgram.getUniforms();for(let zn=0;zn<en;zn++)xt.setValue(C,"_gl_DrawID",zn),Zt.render(Pt[zn]/Et,sn[zn])}else if(ue.isInstancedMesh)Zt.renderInstances(Ne,rn,ue.count);else if(ge.isInstancedBufferGeometry){let Pt=ge._maxInstanceCount!==void 0?ge._maxInstanceCount:1/0,sn=Math.min(ge.instanceCount,Pt);Zt.renderInstances(Ne,rn,sn)}else Zt.render(Ne,rn)},this.compile=function(D,re,ge=null){ge===null&&(ge=D),g=yt.get(ge),g.init(re),_.push(g),ge.traverseVisible(function(ue){ue.isLight&&ue.layers.test(re.layers)&&(g.pushLight(ue),ue.castShadow&&g.pushShadow(ue))}),D!==ge&&D.traverseVisible(function(ue){ue.isLight&&ue.layers.test(re.layers)&&(g.pushLight(ue),ue.castShadow&&g.pushShadow(ue))}),g.setupLights();let Ae=new Set;return D.traverse(function(ue){if(!(ue.isMesh||ue.isPoints||ue.isLine||ue.isSprite))return;let De=ue.material;if(De)if(Array.isArray(De))for(let Ye=0;Ye<De.length;Ye++){let Ie=De[Ye];rt(Ie,ge,ue),Ae.add(Ie)}else rt(De,ge,ue),Ae.add(De)}),g=_.pop(),Ae},this.compileAsync=function(D,re,ge=null){let Ae=this.compile(D,re,ge);return new Promise(ue=>{function De(){Ae.forEach(function(Ye){te.get(Ye).currentProgram.isReady()&&Ae.delete(Ye)}),Ae.size!==0?setTimeout(De,10):ue(D)}U.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let je=null;function mt(){pt.stop()}function gt(){pt.start()}let pt=new vd;function _t(D,re,ge,Ae){if(D.visible===!1)return;if(D.layers.test(re.layers)){if(D.isGroup)ge=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(re);else if(D.isLight)g.pushLight(D),D.castShadow&&g.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||ne.intersectsSprite(D)){Ae&&R.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Le);let De=ot.update(D),Ye=D.material;Ye.visible&&f.push(D,De,Ye,ge,R.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||ne.intersectsObject(D))){let De=ot.update(D),Ye=D.material;if(Ae&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),R.copy(D.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),R.copy(De.boundingSphere.center)),R.applyMatrix4(D.matrixWorld).applyMatrix4(Le)),Array.isArray(Ye)){let Ie=De.groups;for(let ke=0,qe=Ie.length;ke<qe;ke++){let Mt=Ie[ke],Ve=Ye[Mt.materialIndex];Ve&&Ve.visible&&f.push(D,De,Ve,ge,R.z,Mt)}}else Ye.visible&&f.push(D,De,Ye,ge,R.z,null)}}let ue=D.children;for(let De=0,Ye=ue.length;De<Ye;De++)_t(ue[De],re,ge,Ae)}function Ot(D,re,ge,Ae){let ue=D.opaque,De=D.transmissive,Ye=D.transparent;g.setupLightsView(ge),_e===!0&&z.setGlobalState(x.clippingPlanes,ge),Ae&&V.viewport(P.copy(Ae)),ue.length>0&&Kt(ue,re,ge),De.length>0&&Kt(De,re,ge),Ye.length>0&&Kt(Ye,re,ge),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function kt(D,re,ge,Ae){if((ge.isScene===!0?ge.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[Ae.id]===void 0&&(g.state.transmissionRenderTarget[Ae.id]=new si(1,1,{generateMipmaps:!0,type:U.has("EXT_color_buffer_half_float")||U.has("EXT_color_buffer_float")?sr:Ai,minFilter:vi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let ue=g.state.transmissionRenderTarget[Ae.id],De=Ae.viewport||P;ue.setSize(De.z*x.transmissionResolutionScale,De.w*x.transmissionResolutionScale);let Ye=x.getRenderTarget(),Ie=x.getActiveCubeFace(),ke=x.getActiveMipmapLevel();x.setRenderTarget(ue),x.getClearColor(W),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),k&&fe.render(ge);let qe=x.toneMapping;x.toneMapping=Hi;let Mt=Ae.viewport;if(Ae.viewport!==void 0&&(Ae.viewport=void 0),g.setupLightsView(Ae),_e===!0&&z.setGlobalState(x.clippingPlanes,Ae),Kt(D,ge,Ae),ie.updateMultisampleRenderTarget(ue),ie.updateRenderTargetMipmap(ue),U.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Ne=0,Qe=re.length;Ne<Qe;Ne++){let rn=re[Ne],dn=rn.object,Zt=rn.geometry,Pt=rn.material,sn=rn.group;if(Pt.side===Wt&&dn.layers.test(Ae.layers)){let en=Pt.side;Pt.side=ei,Pt.needsUpdate=!0,ln(dn,ge,Ae,Zt,Pt,sn),Pt.side=en,Pt.needsUpdate=!0,Ve=!0}}Ve===!0&&(ie.updateMultisampleRenderTarget(ue),ie.updateRenderTargetMipmap(ue))}x.setRenderTarget(Ye,Ie,ke),x.setClearColor(W,$),Mt!==void 0&&(Ae.viewport=Mt),x.toneMapping=qe}function Kt(D,re,ge){let Ae=re.isScene===!0?re.overrideMaterial:null;for(let ue=0,De=D.length;ue<De;ue++){let Ye=D[ue],Ie=Ye.object,ke=Ye.geometry,qe=Ye.group,Mt=Ye.material;Mt.allowOverride===!0&&Ae!==null&&(Mt=Ae),Ie.layers.test(ge.layers)&&ln(Ie,re,ge,ke,Mt,qe)}}function ln(D,re,ge,Ae,ue,De){D.onBeforeRender(x,re,ge,Ae,ue,De),D.modelViewMatrix.multiplyMatrices(ge.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ue.onBeforeRender(x,re,ge,Ae,D,De),ue.transparent===!0&&ue.side===Wt&&ue.forceSinglePass===!1?(ue.side=ei,ue.needsUpdate=!0,x.renderBufferDirect(ge,re,Ae,ue,D,De),ue.side=hs,ue.needsUpdate=!0,x.renderBufferDirect(ge,re,Ae,ue,D,De),ue.side=Wt):x.renderBufferDirect(ge,re,Ae,ue,D,De),D.onAfterRender(x,re,ge,Ae,ue,De)}function Rn(D,re,ge){re.isScene!==!0&&(re=j);let Ae=te.get(D),ue=g.state.lights,De=g.state.shadowsArray,Ye=ue.state.version,Ie=ft.getParameters(D,ue.state,De,re,ge),ke=ft.getProgramCacheKey(Ie),qe=Ae.programs;Ae.environment=D.isMeshStandardMaterial?re.environment:null,Ae.fog=re.fog,Ae.envMap=(D.isMeshStandardMaterial?He:Ee).get(D.envMap||Ae.environment),Ae.envMapRotation=Ae.environment!==null&&D.envMap===null?re.environmentRotation:D.envMapRotation,qe===void 0&&(D.addEventListener("dispose",dt),qe=new Map,Ae.programs=qe);let Mt=qe.get(ke);if(Mt!==void 0){if(Ae.currentProgram===Mt&&Ae.lightsStateVersion===Ye)return yn(D,Ie),Mt}else Ie.uniforms=ft.getUniforms(D),D.onBeforeCompile(Ie,x),Mt=ft.acquireProgram(Ie,ke),qe.set(ke,Mt),Ae.uniforms=Ie.uniforms;let Ve=Ae.uniforms;return(D.isShaderMaterial||D.isRawShaderMaterial)&&D.clipping!==!0||(Ve.clippingPlanes=z.uniform),yn(D,Ie),Ae.needsLights=(function(Ne){return Ne.isMeshLambertMaterial||Ne.isMeshToonMaterial||Ne.isMeshPhongMaterial||Ne.isMeshStandardMaterial||Ne.isShadowMaterial||Ne.isShaderMaterial&&Ne.lights===!0})(D),Ae.lightsStateVersion=Ye,Ae.needsLights&&(Ve.ambientLightColor.value=ue.state.ambient,Ve.lightProbe.value=ue.state.probe,Ve.directionalLights.value=ue.state.directional,Ve.directionalLightShadows.value=ue.state.directionalShadow,Ve.spotLights.value=ue.state.spot,Ve.spotLightShadows.value=ue.state.spotShadow,Ve.rectAreaLights.value=ue.state.rectArea,Ve.ltc_1.value=ue.state.rectAreaLTC1,Ve.ltc_2.value=ue.state.rectAreaLTC2,Ve.pointLights.value=ue.state.point,Ve.pointLightShadows.value=ue.state.pointShadow,Ve.hemisphereLights.value=ue.state.hemi,Ve.directionalShadowMap.value=ue.state.directionalShadowMap,Ve.directionalShadowMatrix.value=ue.state.directionalShadowMatrix,Ve.spotShadowMap.value=ue.state.spotShadowMap,Ve.spotLightMatrix.value=ue.state.spotLightMatrix,Ve.spotLightMap.value=ue.state.spotLightMap,Ve.pointShadowMap.value=ue.state.pointShadowMap,Ve.pointShadowMatrix.value=ue.state.pointShadowMatrix),Ae.currentProgram=Mt,Ae.uniformsList=null,Mt}function or(D){if(D.uniformsList===null){let re=D.currentProgram.getUniforms();D.uniformsList=vs.seqWithValue(re.seq,D.uniforms)}return D.uniformsList}function yn(D,re){let ge=te.get(D);ge.outputColorSpace=re.outputColorSpace,ge.batching=re.batching,ge.batchingColor=re.batchingColor,ge.instancing=re.instancing,ge.instancingColor=re.instancingColor,ge.instancingMorph=re.instancingMorph,ge.skinning=re.skinning,ge.morphTargets=re.morphTargets,ge.morphNormals=re.morphNormals,ge.morphColors=re.morphColors,ge.morphTargetsCount=re.morphTargetsCount,ge.numClippingPlanes=re.numClippingPlanes,ge.numIntersection=re.numClipIntersection,ge.vertexAlphas=re.vertexAlphas,ge.vertexTangents=re.vertexTangents,ge.toneMapping=re.toneMapping}pt.setAnimationLoop(function(D){je&&je(D)}),typeof self<"u"&&pt.setContext(self),this.setAnimationLoop=function(D){je=D,ve.setAnimationLoop(D),D===null?pt.stop():pt.start()},ve.addEventListener("sessionstart",mt),ve.addEventListener("sessionend",gt),this.render=function(D,re){if(re!==void 0&&re.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(T===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),re.parent===null&&re.matrixWorldAutoUpdate===!0&&re.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(re),re=ve.getCamera()),D.isScene===!0&&D.onBeforeRender(x,D,re,O),g=yt.get(D,_.length),g.init(re),_.push(g),Le.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),ne.setFromProjectionMatrix(Le,Oi,re.reversedDepth),H=this.localClippingEnabled,_e=z.init(this.clippingPlanes,H),f=St.get(D,y.length),f.init(),y.push(f),ve.enabled===!0&&ve.isPresenting===!0){let De=x.xr.getDepthSensingMesh();De!==null&&_t(De,re,-1/0,x.sortObjects)}_t(D,re,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(Ue,Fe),k=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,k&&fe.addToRenderList(f,D),this.info.render.frame++,_e===!0&&z.beginShadows();let ge=g.state.shadowsArray;ee.render(ge,D,re),_e===!0&&z.endShadows(),this.info.autoReset===!0&&this.info.reset();let Ae=f.opaque,ue=f.transmissive;if(g.setupLights(),re.isArrayCamera){let De=re.cameras;if(ue.length>0)for(let Ye=0,Ie=De.length;Ye<Ie;Ye++)kt(Ae,ue,D,De[Ye]);k&&fe.render(D);for(let Ye=0,Ie=De.length;Ye<Ie;Ye++){let ke=De[Ye];Ot(f,D,ke,ke.viewport)}}else ue.length>0&&kt(Ae,ue,D,re),k&&fe.render(D),Ot(f,D,re);O!==null&&I===0&&(ie.updateMultisampleRenderTarget(O),ie.updateRenderTargetMipmap(O)),D.isScene===!0&&D.onAfterRender(x,D,re),be.resetDefaultState(),N=-1,F=null,_.pop(),_.length>0?(g=_[_.length-1],_e===!0&&z.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,y.pop(),f=y.length>0?y[y.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(D,re,ge){let Ae=te.get(D);Ae.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Ae.__autoAllocateDepthBuffer===!1&&(Ae.__useRenderToTexture=!1),te.get(D.texture).__webglTexture=re,te.get(D.depthTexture).__webglTexture=Ae.__autoAllocateDepthBuffer?void 0:ge,Ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,re){let ge=te.get(D);ge.__webglFramebuffer=re,ge.__useDefaultFramebuffer=re===void 0};let yi=C.createFramebuffer();this.setRenderTarget=function(D,re=0,ge=0){O=D,b=re,I=ge;let Ae=!0,ue=null,De=!1,Ye=!1;if(D){let Ie=te.get(D);if(Ie.__useDefaultFramebuffer!==void 0)V.bindFramebuffer(C.FRAMEBUFFER,null),Ae=!1;else if(Ie.__webglFramebuffer===void 0)ie.setupRenderTarget(D);else if(Ie.__hasExternalTextures)ie.rebindTextures(D,te.get(D.texture).__webglTexture,te.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let Mt=D.depthTexture;if(Ie.__boundDepthTexture!==Mt){if(Mt!==null&&te.has(Mt)&&(D.width!==Mt.image.width||D.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(D)}}let ke=D.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ye=!0);let qe=te.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(ue=Array.isArray(qe[re])?qe[re][ge]:qe[re],De=!0):ue=D.samples>0&&ie.useMultisampledRTT(D)===!1?te.get(D).__webglMultisampledFramebuffer:Array.isArray(qe)?qe[ge]:qe,P.copy(D.viewport),L.copy(D.scissor),q=D.scissorTest}else P.copy(Te).multiplyScalar(oe).floor(),L.copy(ze).multiplyScalar(oe).floor(),q=Ce;if(ge!==0&&(ue=yi),V.bindFramebuffer(C.FRAMEBUFFER,ue)&&Ae&&V.drawBuffers(D,ue),V.viewport(P),V.scissor(L),V.setScissorTest(q),De){let Ie=te.get(D.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie.__webglTexture,ge)}else if(Ye){let Ie=re;for(let ke=0;ke<D.textures.length;ke++){let qe=te.get(D.textures[ke]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+ke,qe.__webglTexture,ge,Ie)}}else if(D!==null&&ge!==0){let Ie=te.get(D.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ie.__webglTexture,ge)}N=-1},this.readRenderTargetPixels=function(D,re,ge,Ae,ue,De,Ye,Ie=0){if(!D||!D.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=te.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ye!==void 0&&(ke=ke[Ye]),ke){V.bindFramebuffer(C.FRAMEBUFFER,ke);try{let qe=D.textures[Ie],Mt=qe.format,Ve=qe.type;if(!X.textureFormatReadable(Mt))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!X.textureTypeReadable(Ve))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");re>=0&&re<=D.width-Ae&&ge>=0&&ge<=D.height-ue&&(D.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ie),C.readPixels(re,ge,Ae,ue,de.convert(Mt),de.convert(Ve),De))}finally{let qe=O!==null?te.get(O).__webglFramebuffer:null;V.bindFramebuffer(C.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(D,re,ge,Ae,ue,De,Ye,Ie=0){if(!D||!D.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=te.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ye!==void 0&&(ke=ke[Ye]),ke){if(re>=0&&re<=D.width-Ae&&ge>=0&&ge<=D.height-ue){V.bindFramebuffer(C.FRAMEBUFFER,ke);let qe=D.textures[Ie],Mt=qe.format,Ve=qe.type;if(!X.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!X.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ne=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ne),C.bufferData(C.PIXEL_PACK_BUFFER,De.byteLength,C.STREAM_READ),D.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ie),C.readPixels(re,ge,Ae,ue,de.convert(Mt),de.convert(Ve),0);let Qe=O!==null?te.get(O).__webglFramebuffer:null;V.bindFramebuffer(C.FRAMEBUFFER,Qe);let rn=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await ku(C,rn,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ne),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,De),C.deleteBuffer(Ne),C.deleteSync(rn),De}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,re=null,ge=0){let Ae=Math.pow(2,-ge),ue=Math.floor(D.image.width*Ae),De=Math.floor(D.image.height*Ae),Ye=re!==null?re.x:0,Ie=re!==null?re.y:0;ie.setTexture2D(D,0),C.copyTexSubImage2D(C.TEXTURE_2D,ge,0,0,Ye,Ie,ue,De),V.unbindTexture()};let lr=C.createFramebuffer(),Wi=C.createFramebuffer();this.copyTextureToTexture=function(D,re,ge=null,Ae=null,ue=0,De=null){let Ye,Ie,ke,qe,Mt,Ve,Ne,Qe,rn;De===null&&(ue!==0?($r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),De=ue,ue=0):De=0);let dn=D.isCompressedTexture?D.mipmaps[De]:D.image;if(ge!==null)Ye=ge.max.x-ge.min.x,Ie=ge.max.y-ge.min.y,ke=ge.isBox3?ge.max.z-ge.min.z:1,qe=ge.min.x,Mt=ge.min.y,Ve=ge.isBox3?ge.min.z:0;else{let On=Math.pow(2,-ue);Ye=Math.floor(dn.width*On),Ie=Math.floor(dn.height*On),ke=D.isDataArrayTexture?dn.depth:D.isData3DTexture?Math.floor(dn.depth*On):1,qe=0,Mt=0,Ve=0}Ae!==null?(Ne=Ae.x,Qe=Ae.y,rn=Ae.z):(Ne=0,Qe=0,rn=0);let Zt=de.convert(re.format),Pt=de.convert(re.type),sn;re.isData3DTexture?(ie.setTexture3D(re,0),sn=C.TEXTURE_3D):re.isDataArrayTexture||re.isCompressedArrayTexture?(ie.setTexture2DArray(re,0),sn=C.TEXTURE_2D_ARRAY):(ie.setTexture2D(re,0),sn=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,re.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,re.unpackAlignment);let en=C.getParameter(C.UNPACK_ROW_LENGTH),Et=C.getParameter(C.UNPACK_IMAGE_HEIGHT),xt=C.getParameter(C.UNPACK_SKIP_PIXELS),zn=C.getParameter(C.UNPACK_SKIP_ROWS),Xi=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,dn.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,dn.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,qe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Mt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ve);let fn=D.isDataArrayTexture||D.isData3DTexture,ti=re.isDataArrayTexture||re.isData3DTexture;if(D.isDepthTexture){let On=te.get(D),Jt=te.get(re),ni=te.get(On.__renderTarget),_s=te.get(Jt.__renderTarget);V.bindFramebuffer(C.READ_FRAMEBUFFER,ni.__webglFramebuffer),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,_s.__webglFramebuffer);for(let ii=0;ii<ke;ii++)fn&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,te.get(D).__webglTexture,ue,Ve+ii),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,te.get(re).__webglTexture,De,rn+ii)),C.blitFramebuffer(qe,Mt,Ye,Ie,Ne,Qe,Ye,Ie,C.DEPTH_BUFFER_BIT,C.NEAREST);V.bindFramebuffer(C.READ_FRAMEBUFFER,null),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(ue!==0||D.isRenderTargetTexture||te.has(D)){let On=te.get(D),Jt=te.get(re);V.bindFramebuffer(C.READ_FRAMEBUFFER,lr),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,Wi);for(let ni=0;ni<ke;ni++)fn?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,On.__webglTexture,ue,Ve+ni):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,On.__webglTexture,ue),ti?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Jt.__webglTexture,De,rn+ni):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Jt.__webglTexture,De),ue!==0?C.blitFramebuffer(qe,Mt,Ye,Ie,Ne,Qe,Ye,Ie,C.COLOR_BUFFER_BIT,C.NEAREST):ti?C.copyTexSubImage3D(sn,De,Ne,Qe,rn+ni,qe,Mt,Ye,Ie):C.copyTexSubImage2D(sn,De,Ne,Qe,qe,Mt,Ye,Ie);V.bindFramebuffer(C.READ_FRAMEBUFFER,null),V.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else ti?D.isDataTexture||D.isData3DTexture?C.texSubImage3D(sn,De,Ne,Qe,rn,Ye,Ie,ke,Zt,Pt,dn.data):re.isCompressedArrayTexture?C.compressedTexSubImage3D(sn,De,Ne,Qe,rn,Ye,Ie,ke,Zt,dn.data):C.texSubImage3D(sn,De,Ne,Qe,rn,Ye,Ie,ke,Zt,Pt,dn):D.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,De,Ne,Qe,Ye,Ie,Zt,Pt,dn.data):D.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,De,Ne,Qe,dn.width,dn.height,Zt,dn.data):C.texSubImage2D(C.TEXTURE_2D,De,Ne,Qe,Ye,Ie,Zt,Pt,dn);C.pixelStorei(C.UNPACK_ROW_LENGTH,en),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Et),C.pixelStorei(C.UNPACK_SKIP_PIXELS,xt),C.pixelStorei(C.UNPACK_SKIP_ROWS,zn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Xi),De===0&&re.generateMipmaps&&C.generateMipmap(sn),V.unbindTexture()},this.initRenderTarget=function(D){te.get(D).__webglFramebuffer===void 0&&ie.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?ie.setTextureCube(D,0):D.isData3DTexture?ie.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?ie.setTexture2DArray(D,0):ie.setTexture2D(D,0),V.unbindTexture()},this.resetState=function(){b=0,I=0,O=null,V.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=jt._getUnpackColorSpace()}};function el(r){let e=[[-2.6,.22],[-1.8,.42],[-1.3,.76],[-.65,.94],[-.1,.91],[.35,.68],[.8,.3],[1.25,.19],[1.65,.17]];if(r<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++){let[n,i]=e[t],[s,a]=e[t-1];if(r<=n){let o=(r-s)/(n-s),c=o*o*(3-2*o);return a+(i-a)*c}}return e.at(-1)[1]}function Td(r,e=[]){let t=!1,n=new Map,i=new Set(e),s=new w;function a(o){for(let c=o;c&&c!==r;c=c.parent)if(i.has(c)||c.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(c.name)||c.name.startsWith("front-wing-")&&o.name!=="tapered-nose")return!0;return!1}return{set(o){o=!!o;let c=o!==t;if(!c&&!o)return;t=o,r.updateWorldMatrix(!0,!0);let l=r.matrixWorld.clone().invert();r.traverse(h=>{if(!h.geometry||a(h))return;let u=h.geometry,d=u.getAttribute("position");if(!d||!c&&n.has(u))return;n.has(u)||n.set(u,new Float32Array(d.array));let p=n.get(u);if(d.array.set(p),o){let v=new ht().multiplyMatrices(l,h.matrixWorld),m=v.clone().invert();for(let f=0;f<d.count;f++)s.fromBufferAttribute(d,f).applyMatrix4(v),s.z*=el(s.x),s.y>1.08&&(s.y=1.08+(s.y-1.08)*.68),s.applyMatrix4(m),d.setXYZ(f,s.x,s.y,s.z)}d.needsUpdate=!0,u.computeVertexNormals(),u.computeBoundingBox(),u.computeBoundingSphere()})}}}function bd({paint:r,carbon:e,metal:t}){let n=new Xe;n.name="formula-cockpit";function i(d,p,v,m){let f=new ct(new Ct(new wt(d.map(g=>new w(...g))),40,p,10,!1),v);return f.name=m,f.castShadow=f.receiveShadow=!0,n.add(f),f}i([[-1.03,1.47,-.64],[-.99,2.48,-.64],[-.38,2.55,-.65],[.53,2.49,-.46],[1,2.4,0],[.53,2.49,.46],[-.38,2.55,.65],[-.99,2.48,.64],[-1.03,1.47,.64]],.043,e,"halo-ring"),i([[1,2.4,0],[1.13,1.93,0],[1.22,1.44,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.34],[-1.27,2.53,-.28],[-1.22,2.65,0],[-1.27,2.53,.28],[-1.25,1.4,.34]],.048,e,"roll-hoop");for(let d of[-1,1])for(let p of[.67,.94])i([[1.19,p,d*.34],[1.92,p-.12,d*1.24],[2.22,p,d*.31]],.024,e,"front-wishbone");let s=new Xe;s.name="formula-engine-cover";let a=[],o=[],c=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],l=32;c.forEach(([d,p,v,m],f)=>{for(let g=0;g<=l;g++){let y=g/l*Math.PI*2;if(a.push(d,p+Math.sin(y)*m,Math.cos(y)*v),f<c.length-1&&g<l){let _=f*(l+1)+g,x=_+l+1;o.push(_,x,_+1,_+1,x,x+1)}}});for(let d of[0,c.length-1])for(let p=1;p<l-1;p++){let v=d*(l+1);d===0?o.push(v,v+p,v+p+1):o.push(v,v+p+1,v+p)}let h=new ut;h.setAttribute("position",new Re(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new ct(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let p=0;p<5;p++){let v=new ct(new tt(.025,.07,.19),e);v.position.set(-1.48-p*.13,1.57-p*.055,d*.31),v.rotation.z=-.2,s.add(v)}return n.add(s),{group:n,engine:s}}function Sd(r,e,t){let n=e.hat,i=new Xe,s=[],a=[],o=[];if(!n||n==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};i.name="headwear:"+n;let c=(g,y=.88,_=0)=>{let x=new Nt({color:g,roughness:y,metalness:_,side:Wt});return a.push(x),x},l=c(t.item("hat",n).color),h=c(new lt(t.item("hat",n).color).multiplyScalar(.66)),u=c("#a79672"),d=c("#242422"),p=(g,y)=>{s.push(g);let _=new ct(g,y);return _.castShadow=_.receiveShadow=!0,i.add(_),_},v=(g,y,_,x=!1)=>p(new Ct(new wt(g.map(T=>new w(...T)),x),64,y,8,x),_);function m(g,y,_,x,T){let b=[];for(let I=0;I<64;I++){let O=I/64*Math.PI*2;b.push([Math.cos(O)*y,g,.015+Math.sin(O)*_])}v(b,x,T,!0)}function f(g,y,_,x,T){let b=[],I=[],O=[];for(let L=0;L<=12;L++)for(let q=0;q<=96;q++){let W=q/96*Math.PI*2,$=L/12,ae=g+(y-g)*$;if(b.push(ae*Math.cos(W),_-x*$*$,.015+ae*.92*Math.sin(W)),I.push(q/96,L/12),L<12&&q<96){let Z=L*97+q;O.push(Z,Z+1,Z+96+1,Z+1,Z+96+2,Z+96+1)}}let P=new ut;P.setAttribute("position",new Re(b,3)),P.setAttribute("uv",new Re(I,2)),P.setIndex(O),P.computeVertexNormals(),p(P,T),m(_-x,y,y*.92,.004,h)}if(/straw/i.test(n)){let g=new $e(.245,.282,.245,64,8);g.translate(0,1.955,.015),p(g,l),f(.27,.48,1.836,.03,l),m(1.854,.285,.269,.017,d);for(let y=1.86;y<2.075;y+=.012)m(y,.282-(y-1.83)*.14,.26-(y-1.83)*.12,.0014,u);for(let y=.3;y<.48;y+=.013)m(1.836-.03*((y-.27)/.21)**2,y,y*.92,.0012,u)}else if(/bucket|duck/i.test(n)){let g=new $e(.255,.293,.215,64,8);g.translate(0,1.952,.015),p(g,l),f(.29,.363,1.845,.053,l),m(1.85,.294,.276,.0025,h),m(2.054,.255,.245,.002,h);let y=document.createElement("canvas");y.width=y.height=256;let _=y.getContext("2d");_.fillStyle=t.item("hat",n).color,_.fillRect(0,0,256,256);for(let T=30;T<256;T+=70)for(let b=20;b<256;b+=80)_.fillStyle="#d9ad42",_.beginPath(),_.ellipse(b,T,12,8,0,0,Math.PI*2),_.fill(),_.beginPath(),_.arc(b+9,T-7,6,0,Math.PI*2),_.fill(),_.fillStyle="#e89c34",_.fillRect(b+13,T-8,6,3),_.fillStyle="#201a13",_.fillRect(b+10,T-9,2,2);let x=new Vt(y);x.colorSpace=bt,x.wrapS=x.wrapT=An,x.repeat.set(4,1),o.push(x),l.map=x}else{let g=new Gt(1,64,36,0,Math.PI*2,0,Math.PI*.51);g.scale(.305,.235,.288),g.translate(0,1.82,.015),p(g,l),m(1.818,.305,.288,.007,h);let y=[],_=[],x=[],T=32,b=16;for(let F=0;F<=b;F++)for(let P=0;P<=T;P++){let L=P/T*2-1,q=F/b,W=L*(.292-.018*q),$=.17+.4*Math.sqrt(Math.max(.08,1-L*L))*q,ae=1.814-.028*q-.027*L*L*q;if(y.push(W,ae,$),_.push(P/T,F/b),P<T&&F<b){let Z=F*(T+1)+P;x.push(Z,Z+1,Z+T+1,Z+1,Z+T+2,Z+T+1)}}let I=new ut;I.setAttribute("position",new Re(y,3)),I.setAttribute("uv",new Re(_,2)),I.setIndex(x),I.computeVertexNormals(),p(I,l);let O=[];for(let F=0;F<=T;F++){let P=F/T*2-1;O.push([P*.274,1.786-.027*P*P,.17+.4*Math.sqrt(Math.max(.08,1-P*P))])}v(O,.004,h);for(let F=0;F<6;F++){let P=F/6*Math.PI*2,L=[];for(let q=0;q<=24;q++){let W=q/24*Math.PI/2;L.push([.307*Math.sin(W)*Math.cos(P),1.82+.237*Math.cos(W),.015+.29*Math.sin(W)*Math.sin(P)])}v(L,.0017,h)}let N=new Gt(.015,20,12);if(N.translate(0,2.058,.015),p(N,h),/propeller/i.test(n)){let F=c("#c7c4b9",.35,.8),P=new $e(.006,.006,.065,12);P.translate(0,2.09,.015),p(P,F);for(let L=0;L<3;L++){let q=new Gt(1,20,12);q.scale(.115,.007,.027),q.translate(.086,0,0),q.rotateY(L/3*Math.PI*2),q.translate(0,2.126,.015),p(q,c(["#ba3847","#3e83ae","#d4b74a"][L]))}}else{let F=document.createElement("canvas");F.width=256,F.height=128;let P=F.getContext("2d");P.clearRect(0,0,256,128),P.fillStyle="#d0b77a",P.font="bold 62px Arial",P.textAlign="center",P.fillText("P21",128,88);let L=new Vt(F);L.colorSpace=bt,o.push(L);let q=new Nt({map:L,transparent:!0,alphaTest:.1,roughness:.9});a.push(q);let W=new Yt(.12,.06);W.translate(0,1.945,.265),p(W,q)}}return r.bones.head.add(i),i.position.copy(new w(...r.bones.head.userData.rest).negate()),{dispose(){i.removeFromParent(),s.forEach(g=>g.dispose()),a.forEach(g=>g.dispose()),o.forEach(g=>g.dispose())}}}var Ri=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function wd(r){let e=[],t={};function n(f,g,y,_,x=0){let T=new ns;T.name=f;let b=g?g.userData.rest:[0,0,0];return T.position.set(y-b[0],_-b[1],x-b[2]),T.userData.rest=[y,_,x],(g||r).add(T),e.push(T),t[f]=T,T}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[f,g]of[["left",-1],["right",1]]){let y=n(f+"Shoulder",a,g*.49,1.09),_=n(f+"Elbow",y,g*.66,.57),x=n(f+"Wrist",_,g*.78,.04,.035),T=n(f+"Hand",x,g*.79,-.15,.07);for(let O=0;O<4;O++)n(f+"Finger"+O,T,g*(.5-(.175+O*.019))*2.55,-.17-O*.007,.07);n(f+"Thumb",T,g*.63,-.13,.11);let b=n(f+"Hip",i,g*.23,-.2,-.01),I=n(f+"Knee",b,g*.34,-.77,-.01);n(f+"Ankle",I,g*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new Vs(e);function h(f,g,y){let _=g<.5?"left":"right",x=i,T=i,b=0;if(f===1)x=s,T=a,b=1-Ri(.25,.44,y);else if(f===2||f===9)y<.25?(x=a,T=t[_+"Shoulder"],b=Ri(.175,.245,y)):y<.4?(x=t[_+"Shoulder"],T=t[_+"Elbow"],b=Ri(.29,.38,y)):(x=t[_+"Elbow"],T=t[_+"Wrist"],b=Ri(.43,.49,y));else if(f===3){let I=g<.5?g:1-g;y>.54?(x=t[_+"Hand"],T=t[_+(I>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((I-.175)/.019))))],b=Ri(.54,.566,y)):(x=t[_+"Wrist"],T=t[_+"Hand"],b=Ri(.49,.53,y))}else f===4?y<.57?(x=i,T=t[_+"Hip"],b=Ri(.5,.57,y)):y<.76?(x=t[_+"Hip"],T=t[_+"Knee"],b=Ri(.66,.74,y)):(x=t[_+"Knee"],T=t[_+"Ankle"],b=Ri(.79,.84,y)):f===5||f===8?x=T=t[_+"Ankle"]:f===6||f===10?x=T=c:f===7&&(x=a,T=o,b=1-Ri(.17,.225,y));return{indices:[e.indexOf(x),e.indexOf(T),0,0],weights:[1-b,b,0,0]}}function u(f,g){let y=f.getAttribute("bodyUv"),_=f.getAttribute("surface"),x=[],T=[];for(let I=0;I<y.count;I++){let O=h(_.getX(I),y.getX(I),y.getY(I));x.push(...O.indices),T.push(...O.weights)}f.setAttribute("skinIndex",new vr(x,4)),f.setAttribute("skinWeight",new Re(T,4));let b=new ks(f,g);return r.add(b),b.bind(l,new ht),b.frustumCulled=!1,b}let d=0,p=!1;function v(f,g,y){d+=(Number(g)-d)*(1-Math.exp(-Math.min(.1,y)*9));let _=Math.sin(f*1.55)*d;a.scale.set(1+_*.003,1+_*.003,1+_*.007),c.rotation.set(Math.sin(f*.57)*.01*d,(p?.025:0)+Math.sin(f*.36)*.024*d,(p?-.016:0)+Math.sin(f*.41)*.008*d);for(let[x,T]of[["left",-1],["right",1]]){t[x+"Shoulder"].rotation.z=(p?T*.026:0)+(Math.sin(f*.79+T*.5)*.009+T*.005)*d,t[x+"Elbow"].rotation.x=(p?T<0?-.045:-.085:0)+(Math.sin(f*.67+T*.4)*.012-.025)*d,t[x+"Hand"].rotation.x=(p?.025:0)+Math.sin(f*.61+T)*.01*d;for(let b=0;b<4;b++)t[x+"Finger"+b].rotation.x=(.035+Math.sin(f*.53+b*.25+T)*.012)*d}r.updateMatrixWorld(!0),l.update()}function m(f,g){r.updateMatrixWorld(!0),t[g].attach(f)}return{skeleton:l,bones:t,mesh:u,update:v,attach:m,weights:h,setRelaxedPose(f){p=!!f},dispose(){l.dispose()}}}var tl=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function Ed(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,c,l)=>{if(l===1){let h=tl(o,.25,.12),u=tl(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,c*=n,c+=s*u*(c>0?1:.15)}if(l===2){let h=(i-1)*tl(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),c*=1+h}if(l===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*tl(o,.69,.16);a=h+(a-h)*(1+u),c*=1+u}return[a,o,c]}}function Ad(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new Nt({color:i[t]||"#30241d",roughness:.96}),a=new Uint8Array(16384*4);for(let u=0;u<128;u++)for(let d=0;d<128;d++){let p=(u*128+d)*4,v=Math.sin(d*127.1+u*311.7)*43758.5453,m=128+Math.round(28*Math.sin(u*1.7)+28*(v-Math.floor(v)-.5));a[p]=a[p+1]=a[p+2]=m,a[p+3]=255}let o=new Gi(a,128,128);o.wrapS=o.wrapT=An,o.repeat.set(3,3),o.magFilter=Hn,o.minFilter=vi,o.generateMipmaps=!0,o.needsUpdate=!0,s.bumpMap=o,s.bumpScale=.002;let c=e.sculptHairTexture?.clone();c&&(c.center.set(.5,.5),c.rotation=Math.PI/2,c.repeat.set(2,2),c.needsUpdate=!0,s.bumpMap=c,s.bumpScale=.0024,i[t]||(s.map=c,s.color.set("#c7b9a4")));let l=new Xe;l.name="hairstyle:"+t;function h(u,d,p,v,m,f,g=0){let y=new Gt(1,12,10);n.push(y);let _=new ct(y,s);_.position.set(u,d,p),_.scale.set(v,m,f),_.rotation.z=g,l.add(_)}if(t==="hairDreads"){let u=new Gt(1,48,24,0,Math.PI*2,0,Math.PI*.62);u.scale(.275,.292,.278),u.translate(0,1.62,.1),n.push(u),l.add(new ct(u,s));for(let d=0;d<5;d++)for(let p=0;p<11;p++){let v=(p+d%2*.5)/11*Math.PI*2,m=.3+d*.28,f=Math.cos(v)*Math.sin(m)*.278,g=.1+Math.sin(v)*Math.sin(m)*.285,y=1.62+Math.cos(m)*.299;if(Math.sin(v)>.25&&d===4)continue;let _=Math.sin(v)>.25?Math.min(.1+d*.035,Math.max(.035,y-1.7)):.1+d*.035,x=[new w(f,y,g),new w(f*1.1,y-.035,.1+(g-.1)*1.12),new w(f*1.16,y-_*.65,.1+(g-.1)*1.17),new w(f*1.12,y-_,.1+(g-.1)*1.18)],T=new Ct(new wt(x),16,.02,8,!1),b=T.getAttribute("position");for(let I=0;I<=16;I++){let O=new w;for(let F=0;F<=8;F++)O.add(new w().fromBufferAttribute(b,I*9+F));O.multiplyScalar(1/9);let N=(1-.6*Math.pow(I/16,5))*(1+.045*Math.sin(I*2.4+p));for(let F=0;F<=8;F++){let P=I*9+F,L=new w().fromBufferAttribute(b,P).sub(O).multiplyScalar(N).add(O);b.setXYZ(P,L.x,L.y,L.z)}}T.computeVertexNormals(),n.push(T),l.add(new ct(T,s))}}else if(t!=="hairBald"){let u=t==="hairBuzz",d=t==="hairAfro",p=t==="hairMohawk"||t==="hairBlue",v=t==="hairDreads",m=t==="hairRocker";for(let f=0;f<7;f++)for(let g=0;g<12;g++){let y=g/12*Math.PI*2,_=f/7*Math.PI*.57;if(p&&Math.abs(Math.cos(y))>.27)continue;let x=Math.cos(y)*Math.sin(_)*.23,T=.1+Math.sin(y)*Math.sin(_)*.24,b=t==="hairCurly"||d,I=u?.026:b?.067:.045,O=u?.018:d?.12:p?.16:b?.065:.075,N=1.62+Math.cos(_)*.29;t==="hairPompadour"&&(O+=Math.max(0,Math.sin(y))*.1,N+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(N+=x*.16),(v||m)&&(O=f>3?.18:.065,N-=f>3?.07:0),h(x,N,T,I,O,I,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(l),l.position.copy(r.bones.head.userData.rest?new w(...r.bones.head.userData.rest).negate():new w),l.position.y+=e.sculptHairOffset||0,l.position.z+=e.sculptHairDepth||0,{dispose(){l.removeFromParent(),n.forEach(u=>u.dispose()),s.dispose(),o.dispose(),c?.dispose()}}}function Cd(r,e,t){let n=[],i=[],s=new Xe;if(!e.glasses||e.glasses==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};s.name="eyewear:"+e.glasses;let a=e.glasses,o=/round|rimless/.test(a),c=/sport/.test(a),l=/Gold|Silver|browline/.test(a),h=new Nt({color:t.item("glasses",a).color,metalness:l?.85:.08,roughness:l?.28:.38}),u=new vn({color:c?"#406d80":"#182322",metalness:c?.65:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.08,transparent:!0,opacity:.94,side:Wt});i.push(h,u);let d=(v,m)=>{n.push(v);let f=new ct(v,m);return s.add(f),f},p=(v,m)=>d(new Ct(new wt(v.map(f=>new w(...f))),32,m,8,!1),h);for(let v of[-1,1]){let m=v*.125,f=1.63,g=.391,y=c?.127:.112,_=o?.079:c?.06:.067,x=[],T=new Ht;for(let O=0;O<=64;O++){let N=O/64*Math.PI*2,F=Math.cos(N),P=Math.sin(N),L=y*(o?F:Math.sign(F)*Math.pow(Math.abs(F),.65)),q=_*(o?P:Math.sign(P)*Math.pow(Math.abs(P),.65));O===0?T.moveTo(L,q):T.lineTo(L,q),x.push(new w(m+L,f+q,g-Math.abs(L)*.16))}let b=new Vi(T,32);b.translate(m,f,g-.005),d(b,u),d(new Ct(new wt(x,!0),64,l?.0045:.0085,8,!0),h),p([[v*.233,f+.008,.376],[v*.256,f+.004,.3],[v*.273,f-.005,.17],[v*.282,f-.024,.085]],l?.0045:.008);let I=new Gt(.011,16,10);I.translate(v*.237,f+.009,.374),d(I,h)}return p([[-.025,1.644,.389],[0,1.655,.404],[.025,1.644,.389]],l?.004:.006),r.bones.head.add(s),s.position.copy(new w(...r.bones.head.userData.rest).negate()),s.position.z+=e.sculptEyewearDepth||0,{dispose(){s.removeFromParent(),n.forEach(v=>v.dispose()),i.forEach(v=>v.dispose())}}}function Rd(r,e="#c5b899"){let t=new Xe;t.name="wardrobe-wrist-watch",t.position.set(.744,.015,.026),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Nt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Nt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,T,b,I,O)=>{let N=new ct(x,T);return N.position.set(b,I,O),t.add(N),N},o=a(new Ft(.072,.012,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.9,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let T=x*Math.PI/9,b=a(new tt(.026,.049,.016),i,Math.cos(T)*.065,0,Math.sin(T)*.072);b.rotation.y=-T}let c=/square|smart/i.test(r),l=a(c?new tt(.147,.153,.022):new $e(.078,.073,.022,64),i,0,0,.078);if(c||(l.rotation.x=Math.PI/2),!c)a(new Ft(.069,.006,12,64),i,0,0,.095);else for(let[x,T,b,I]of[[-.071,0,.008,.15],[.071,0,.008,.15],[0,.071,.14,.008],[0,-.071,.14,.008]])a(new tt(b,I,.009),i,x,T,.095);let h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),p=/Daytona|square|rose/i.test(r),v=u.createRadialGradient(190,170,20,256,256,256);v.addColorStop(0,d?"#237050":p?"#fff7db":"#294559"),v.addColorStop(1,d?"#072b20":p?"#c7c4b4":"#06121c"),u.fillStyle=v,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=p?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let m=(x,T,b)=>{u.save(),u.rotate(x),u.strokeStyle=p?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-T),u.stroke(),u.restore()};if(m(-Math.PI/3,112,13),m(Math.PI/3,168,9),m(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=p?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80),/GMT/i.test(r)){for(let x=0;x<24;x++)u.beginPath(),u.strokeStyle=x<12?"#a52d40":"#274e9a",u.lineWidth=24,u.arc(0,0,240,x*Math.PI/12,(x+1)*Math.PI/12),u.stroke();m(-Math.PI*.55,172,6)}if(/Daytona/i.test(r))for(let[x,T]of[[-91,35],[91,35],[0,128]])u.fillStyle="#182027",u.beginPath(),u.arc(x,T,48,0,Math.PI*2),u.fill(),u.strokeStyle="#e3dfd3",u.lineWidth=3,u.beginPath(),u.moveTo(x,T),u.lineTo(x+17,T-28),u.stroke();if(/Skeleton/i.test(r))for(let[x,T,b]of[[-60,60,65],[80,45,43],[15,-115,40]]){u.strokeStyle="#d6b783",u.lineWidth=9,u.beginPath(),u.arc(x,T,b,0,Math.PI*2),u.stroke();for(let I=0;I<8;I++){let O=I*Math.PI/4;u.beginPath(),u.moveTo(x+Math.cos(O)*15,T+Math.sin(O)*15),u.lineTo(x+Math.cos(O)*b,T+Math.sin(O)*b),u.stroke()}}/smart/i.test(r)&&(u.fillStyle="#06131d",u.fillRect(-256,-256,512,512),u.fillStyle="#8ae9c7",u.font="bold 100px Arial",u.fillText("10:10",0,10),u.font="32px Arial",u.fillText("POKER21",0,88));let f=new Vt(h);f.colorSpace=bt,f.anisotropy=4;let g=a(c?new Yt(.13,.13):new jn(.066,64),new Nt({map:f,roughness:.34,metalness:.1}),0,0,.098),y=a(c?new Yt(.13,.13):new jn(.066,64),new vn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.101),_=a(new $e(.012,.012,.019,16),i,.085,0,.08);return _.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(T=>{T.geometry?.dispose(),T.material&&x.add(T.material)});for(let T of x)T.dispose();f.dispose()}}}function Pd(r="#d3b15b",e="rubyLion"){let t=new Xe;t.name="wardrobe-finger-ring",t.position.set(.731,-.225,.07);let n=["silverSpade","clubSignet","diamondKing"].includes(e),i=new Nt({color:n?"#c6d3df":"#c5a14d",metalness:.9,roughness:.24}),s=new vn({color:e==="rubyLion"?"#a51c39":e==="emeraldCrown"?"#167953":e==="diamondKing"?"#e8f7ff":r,metalness:.08,roughness:.1,clearcoat:1}),a=new ct(new Ft(.026,.006,12,48),i);a.name="ring-band",a.rotation.x=Math.PI/2,t.add(a);let o=new ct(e==="clubSignet"?new $e(.021,.019,.012,8):new tt(.029,.029,.012),i);e==="clubSignet"&&(o.rotation.x=Math.PI/2),o.name="ring-bezel",o.position.z=.028,t.add(o);let c;if(e==="silverSpade"){let h=new Ht;h.moveTo(0,.019),h.bezierCurveTo(-.008,.007,-.022,-.002,-.012,-.009),h.quadraticCurveTo(-.004,-.014,0,-.006),h.quadraticCurveTo(.004,-.014,.012,-.009),h.bezierCurveTo(.022,-.002,.008,.007,0,.019),h.lineTo(.006,-.017),h.lineTo(-.006,-.017),h.closePath(),c=new zt(h,{depth:.003,bevelEnabled:!1})}else e==="clubSignet"||e==="goldAces"?c=new tt(.022,.025,.004):c=e==="emeraldCrown"?new tt(.02,.024,.012):new os(e==="diamondKing"?.021:.017);let l=new ct(c,e==="silverSpade"||e==="goldAces"?i:s);if(l.name="ring-face:"+e,l.scale.z=.5,l.position.z=.039,t.add(l),["clubSignet","goldAces"].includes(e)){let h=document.createElement("canvas");h.width=h.height=128;let u=h.getContext("2d");u.fillStyle=n?"#24343d":"#45341a",u.fillRect(0,0,128,128),u.fillStyle=n?"#e1eaf1":"#edce83",u.font="bold 48px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText(e==="goldAces"?"AA":"P21",64,66,116),s.map=new Vt(h),s.map.colorSpace=bt,l.material=s}return{group:t,dispose(){t.traverse(h=>h.geometry?.dispose()),s.map?.dispose(),i.dispose(),s.dispose()}}}var nl=new Map;async function im(r){nl.has(r)||nl.set(r,fetch("./assets/player-hall/character-3d/sculpt/"+r+".bin").then(a=>{if(!a.ok)throw Error("Character anatomy: "+a.status);return a.arrayBuffer()}).catch(a=>{throw nl.delete(r),a}));let e=await nl.get(r),t=new DataView(e).getUint32(0,!0),n=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,t))),i=4+t,s=new ut;return s.setAttribute("position",new En(new Float32Array(e.slice(i,i+n.vertices*12)),3)),s.setAttribute("normal",new En(new Float32Array(e.slice(i+n.vertices*12,i+n.vertices*24)),3)),s.setIndex(new En(new Uint32Array(e.slice(i+n.vertices*24)),1)),s}var ma=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},Ir=r=>{let e=Math.sin(r*127.1+311.7)*43758.5453;return e-Math.floor(e)};async function Id(r,e){let t=new Xe,n=wd(t),i=[],s=[],a=[],o=Ed(e.body),c=r.wardrobeSubcategory("pants",e.pants)==="shorts",l=e.suit?.endsWith("Tee"),h=e.suit?.endsWith("Tank"),u=e.helmet&&e.helmet!=="none",d=!u||e.visor==="open",p=Promise.all(["head","face","hand-left","hand-right","shirt-"+(h?"tank":l?"tee":"jacket"),c?"shorts":"pants",...u?["helmet-shell"]:[]].map(im)),v=(z,ee=.8,fe=0,Se=!1)=>{let Y=Se?vn:Nt,ce=new Y({color:z,roughness:ee,metalness:fe});return s.push(ce),ce},m=v("#ffffff",.96),f=v("#ffffff",.73),g=v("#6b4735",.84),y=v("#73503c",.59),_=v("#453127",.51),x=v("#241b14",.21),T=v("#433627",.55),b=v("#0b0908",.15),I=v("#efe6d2",.32),O=v("#6e5341",.42),N=v(r.item("suit",e.suit).color,.94,0,!0),F=v(new lt(r.item("suit",e.suit).color).multiplyScalar(.7),.92),P=v(r.item("pants",e.pants).color,.96),L=v(new lt(r.item("pants",e.pants).color).multiplyScalar(.68),.94),q=v(r.item("shoes",e.shoes).color,.49,0,!0),W=v(new lt(r.item("shoes",e.shoes).color).multiplyScalar(.78),.64),$=v("#dedbd3",.84),ae=v("#b1afa8",.93),Z=v("#c5a259",.3,.88);N.clearcoat=/leather|Biker/i.test(e.suit)?.25:0,N.roughness=/leather|Biker/i.test(e.suit)?.46:.94,N.sheen=/Knit|velvet/i.test(e.suit)?.65:.12,N.sheenRoughness=.85,q.clearcoat=.18,q.clearcoatRoughness=.48,q.color.r>q.color.g*1.8&&q.color.r>q.color.b*1.4&&(q.color.multiplyScalar(.62),W.color.multiplyScalar(.62));let oe=["classic","ruby","midnight"].includes(e.pants);oe&&(P.color.set("#171b20"),L.color.set("#101317"));let Ue=v("#ffffff",.97);Ue.vertexColors=!0,Ue.side=Wt;function Fe(z){let ee=new Uint8Array(65536);for(let Se=0;Se<128;Se++)for(let Y=0;Y<128;Y++){let ce=(Se*128+Y)*4,de=z==="cloth"?128+24*Math.cos(Y*Math.PI)+20*Math.sin(Se*Math.PI/2)+Ir(ce)*15:128+(Ir(ce)-.5)*48;ee[ce]=ee[ce+1]=ee[ce+2]=de,ee[ce+3]=255}let fe=new Gi(ee,128,128);return fe.wrapS=fe.wrapT=An,fe.repeat.set(z==="cloth"?4:8,z==="cloth"?4:8),fe.magFilter=Hn,fe.minFilter=vi,fe.generateMipmaps=!0,fe.anisotropy=4,fe.needsUpdate=!0,a.push(fe),fe}let[Te,[ze,Ce]]=await Promise.all([p,Promise.all(["fur","skin"].map(z=>new ia().loadAsync("./assets/player-hall/character-3d/sculpt/"+z+"-albedo-v1.webp")))]);for(let z of[ze,Ce])z.colorSpace=bt,z.wrapS=z.wrapT=An,z.anisotropy=4,a.push(z);ze.repeat.set(2,3),Ce.repeat.set(2,2),m.map=ze,m.bumpMap=ze,m.bumpScale=.0024,f.map=Ce,m.onBeforeCompile=z=>{z.vertexShader=`attribute float surface;varying float furRegion;varying float furHeight;
`+z.vertexShader,z.vertexShader=z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
furRegion=surface;furHeight=position.y;`),z.fragmentShader=`varying float furRegion;varying float furHeight;
`+z.fragmentShader,z.fragmentShader=z.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
   float beard=step(5.5,furRegion)*(1.-step(6.5,furRegion))*(1.-smoothstep(1.42,1.62,furHeight));float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(grey*1.6),beard*.72);
  `)},m.customProgramCacheKey=()=>"sculpted-chimp-beard-v1";let ne=Fe("cloth"),_e=Fe("skin");for(let z of[N,F,P,L])z.bumpMap=ne,z.bumpScale=8e-4;for(let z of[f,y,_])z.bumpMap=_e,z.bumpScale=65e-5;function H(z,ee,fe,Se,Y=!0){let ce=z.getAttribute("position"),de=[],be=[];for(let C=0;C<ce.count;C++){let le=ce.getX(C),we=ce.getY(C),ve=ce.getZ(C),Oe=typeof fe=="function"?fe(le,we,ve):fe;if(Y){let nt=o(le,.5-we/3.825,ve,Oe);if(Se==="shirt-body"){let Be=o(le,.5-we/3.825,ve,1),dt=o(le,.5-we/3.825,ve,2),rt=ma(.45,.6,Math.abs(le));nt=Be.map((je,mt)=>je+(dt[mt]-je)*rt)}le=nt[0],we=(.5-nt[1])*3.825,ve=nt[2],ce.setXYZ(C,le,we,ve)}de.push(.5+le/2.55,.5-we/3.825),be.push(Oe)}z.setAttribute("bodyUv",new Re(de,2)),z.setAttribute("surface",new Re(be,1)),z.getAttribute("uv")||z.setAttribute("uv",new Re(de,2)),(!z.getAttribute("normal")||Y&&e.body&&e.body!=="bodyNormal")&&z.computeVertexNormals(),i.push(z);let xe=n.mesh(z,ee);return xe.name=Se||"",xe.castShadow=xe.receiveShadow=!0,xe}function Le(z,ee,fe,Se,Y){let ce=new Gt(1,40,28);return ce.scale(...fe),ce.translate(...ee),H(ce,z,Se,Y)}function A(z,ee,fe,Se,Y,ce=!1){return H(new Ct(new wt(z.map(de=>new w(...de)),ce),Math.max(24,z.length*5),ee,8,ce),fe,Se,Y)}function R(z,ee,fe,Se,Y,ce,de,be,xe){let C=[];for(let le=0;le<64;le++){let we=le/64*Math.PI*2;C.push([z+Se*Math.cos(we),ee,fe+Y*Math.sin(we)])}return A(C,ce,de,be,xe,!0)}function j(z,ee,fe,Se,Y,ce,de,be,xe=.023){k([[z,ee+xe,fe,Se+.003,Y+.003],[z,ee+.007,fe,Se+.001,Y+.001],[z,ee,fe,Se,Y]],ce,de,be,{rings:12,sides:64,capTop:!1,capBottom:!1});let C=[],le=[],we=64;for(let Oe=0;Oe<=we;Oe++){let nt=Oe/we*Math.PI*2;if(C.push(z+Se*Math.cos(nt),ee,fe+Y*Math.sin(nt),z+(Se-.011)*Math.cos(nt),ee+.001,fe+(Y-.011)*Math.sin(nt)),Oe<we){let Be=Oe*2;le.push(Be,Be+2,Be+1,Be+2,Be+3,Be+1)}}let ve=new ut;ve.setAttribute("position",new Re(C,3)),ve.setIndex(le),ve.computeVertexNormals(),H(ve,ce,de,be+"-inside")}function k(z,ee,fe,Se,{sides:Y=64,rings:ce=80,clothFolds:de=0,capTop:be=!0,capBottom:xe=!0,fork:C=!1}={}){let le=[],we=[],ve=[],Oe=z[0][1],nt=z.at(-1)[1];function Be(je){let mt=0;for(;mt<z.length-2&&z[mt+1][1]>je;)mt++;let gt=z[mt],pt=z[mt+1],_t=Math.max(0,Math.min(1,(gt[1]-je)/(gt[1]-pt[1])));return gt.map((Ot,kt)=>{if(kt===1)return je;let Kt=z[Math.max(0,mt-1)][kt],ln=z[Math.min(z.length-1,mt+2)][kt];return .5*(2*Ot+(-Kt+pt[kt])*_t+(2*Kt-5*Ot+4*pt[kt]-ln)*_t*_t+(-Kt+3*Ot-3*pt[kt]+ln)*_t*_t*_t)})}for(let je=0;je<=ce;je++){let mt=Oe+(nt-Oe)*je/ce,[gt,,pt,_t,Ot]=Be(mt);for(let kt=0;kt<=Y;kt++){let Kt=kt/Y*Math.PI*2+(C?Math.PI/2:0),ln=gt+_t*Math.cos(Kt),Rn=pt+Ot*Math.sin(Kt),or=mt;if(C){let yn=kt/Y,yi=yn<=.5,lr=yi?yn*4*Math.PI:Math.PI+(yn-.5)*4*Math.PI,Wi=gt+(yi?-1:1)*_t/2+_t/2*Math.cos(lr),D=pt+Ot*Math.sin(lr),re=ma(.02,-.28,mt);ln+=(Wi-ln)*re,Rn+=(D-Rn)*re}if(de){let yn=Math.sin(Math.PI*je/ce)*(.25+.75*Math.exp(-Math.pow((mt-.3)/.24,2))),yi=Math.sin(mt*26+Kt*3)*Math.sin(Kt*2+.4)*yn;Rn+=de*yi*Math.sin(Kt),ln+=de*yi*Math.cos(Kt),or+=de*.35*Math.sin(Kt*5+mt*10)*yn}if(le.push(ln,or,Rn),we.push(kt/Y,je/ce),je<ce&&kt<Y){let yn=je*(Y+1)+kt;ve.push(yn,yn+1,yn+Y+1,yn+1,yn+Y+2,yn+Y+1)}}}for(let je of[0,ce]){if(je===0&&!be||je===ce&&!xe)continue;let mt=je*(Y+1),gt=le.length/3,pt=new w;for(let _t=0;_t<Y;_t++)pt.add(new w(...le.slice((mt+_t)*3,(mt+_t)*3+3)));pt.multiplyScalar(1/Y),le.push(pt.x,pt.y,pt.z),we.push(.5,je/ce);for(let _t=0;_t<Y;_t++)ve.push(gt,mt+_t+(je===0?1:0),mt+_t+(je===0?0:1))}let dt=new ut;dt.setAttribute("position",new Re(le,3)),dt.setAttribute("uv",new Re(we,2)),dt.setIndex(ve),dt.computeVertexNormals();let rt=dt.getAttribute("normal");for(let je=0;je<=ce;je++){let mt=je*(Y+1),gt=mt+Y,pt=new w().fromBufferAttribute(rt,mt).add(new w().fromBufferAttribute(rt,gt)).normalize();rt.setXYZ(mt,pt.x,pt.y,pt.z),rt.setXYZ(gt,pt.x,pt.y,pt.z)}return H(dt,ee,fe,Se)}if(d){let z=[],ee=[],fe=Te[0].getAttribute("position"),Se=Te[1].getAttribute("position");for(let Y=0;Y<fe.count;Y++)z.push((Math.atan2(fe.getZ(Y)-.015,fe.getX(Y))+Math.PI)/(2*Math.PI),(fe.getY(Y)-1.17)/.84);for(let Y=0;Y<Se.count;Y++)ee.push((Se.getX(Y)+.26)/.52,(Se.getY(Y)-1.29)/.48);Te[0].setAttribute("uv",new Re(z,2)),Te[1].setAttribute("uv",new Re(ee,2)),H(Te[0],m,6,"sculpt-cranium",!1),H(Te[1],f,6,"sculpt-facial-mask",!1)}else Te[0].dispose(),Te[1].dispose();for(let z=0;z<2;z++)H(Te[z+2],f,3,z?"sculpt-right-hand":"sculpt-left-hand",!1);if(d){for(let ee of[-1,1]){Le(x,[ee*.112,1.64,.277],[.04,.022,.032],6,"eye-socket"),Le(T,[ee*.112,1.641,.311],[.015,.016,.008],6,"amber-iris"),Le(b,[ee*.112,1.642,.32],[.009,.012,.003],6,"pupil"),Le(I,[ee*.104,1.65,.324],[.002,.002,.001],6,"eye-catchlight");let fe=[];for(let Se=0;Se<=36;Se++){let Y=Se/36*Math.PI*2;fe.push([ee*.112+.044*Math.cos(Y),1.64+.025*Math.sin(Y),.281+.017*Math.sin(Y)**2])}A(fe,.0035,f,6,"eyelid",!0),A([[ee*.045,1.688,.273],[ee*.09,1.689,.281],[ee*.14,1.693,.265],[ee*.185,1.68,.238]],.03,m,6,"brow-ridge"),A([[ee*.059,1.597,.31],[ee*.103,1.593,.304],[ee*.151,1.61,.276]],.0016,g,6,"orbital-fold"),Le(b,[ee*.029,1.55,.369],[.012,.007,.004],6,"nostril-cavity"),A([[ee*.075,1.515,.34],[ee*.116,1.49,.34],[ee*.139,1.453,.323]],.0016,g,6,"muzzle-fold")}let z=[[-.15,1.438,.32],[-.086,1.431,.353],[0,1.429,.37],[.086,1.431,.353],[.15,1.438,.32]];A(z,.008,y,6,"upper-lip"),A(z.map(([ee,fe,Se])=>[ee,fe-.012,Se-.003]),.009,y,6,"lower-lip"),A(z.map(([ee,fe,Se])=>[ee,fe-.004,Se+.005]),.0026,g,6,"mouth-opening"),A([[-.076,1.375,.292],[0,1.362,.302],[.076,1.375,.292]],.0017,g,6,"chin-fold");for(let ee of[-1,1]){let fe=[],Se=[],Y=[];for(let le=0;le<=16;le++)for(let we=0;we<=64;we++){let ve=le/16,Oe=we/64*Math.PI*2,nt=ee*(.295+.082*ve*Math.cos(Oe)),Be=1.674+.119*ve*Math.sin(Oe),dt=.035+.04*ve*ve+.009*Math.cos(Oe)*ve;fe.push(nt,Be,dt);let rt=new lt("#8e6045").lerp(new lt("#b18361"),ve*ve);if(Se.push(rt.r,rt.g,rt.b),le<16&&we<64){let je=le*65+we;Y.push(je,je+1,je+64+1,je+1,je+64+2,je+64+1)}}let be=new ut;be.setAttribute("position",new Re(fe,3)),be.setAttribute("color",new Re(Se,3)),be.setIndex(Y);let xe=v("#ffffff",.78);xe.vertexColors=!0,xe.side=Wt,H(be,xe,10,"ear-bowl");let C=[];for(let le=0;le<64;le++){let we=le/64*Math.PI*2;C.push([ee*(.295+.082*Math.cos(we)),1.674+.119*Math.sin(we),.075+.009*Math.cos(we)])}A(C,.011,f,10,"ear-helix",!0),A([[ee*.311,1.607,.056],[ee*.332,1.649,.057],[ee*.323,1.697,.057],[ee*.294,1.716,.052]],.007,g,10,"ear-antihelix"),Le(f,[ee*.307,1.562,.047],[.035,.032,.027],10,"ear-lobe")}}k([[0,1.43,0,.12,.13],[0,1.3,0,.15,.145],[0,1.15,0,.18,.155]],m,7,"fur-neck");for(let z of[-1,1]){let ee=h?[[z*.44,1.15,-.015,.11,.13],[z*.51,1.04,-.012,.16,.155]]:l?[[z*.57,.83,-.005,.134,.132]]:[[z*.744,.07,.026,.065,.061]];(h||l)&&ee.push([z*.57,.8,-.005,.134,.132],[z*.64,.59,.01,.116,.122],[z*.675,.43,.025,.139,.132],[z*.714,.22,.035,.116,.105]),ee.push([z*.744,.015,.026,.066,.061]),k(ee,m,2,"fur-arm-"+z);let fe=c?[[z*.285,-.655,-.02,.126,.125],[z*.315,-.74,-.02,.135,.13],[z*.34,-.91,-.008,.119,.112],[z*.37,-1.09,-.01,.127,.106],[z*.395,-1.34,-.015,.087,.081],[z*.41,-1.61,.01,.061,.064]]:[[z*.41,-1.52,.01,.061,.064],[z*.41,-1.61,.01,.061,.064]];k(fe,m,4,"fur-leg-"+z);for(let Se=0;Se<4;Se++){let Y=[-.06,-.02,.022,.06][Se],ce=[.139,.178,.167,.127][Se],de=z*(.755+Y*1.12),be=-.245-ce*.84,xe=new Gt(1,20,14);xe.scale(.01,.018,.0035),xe.translate(de,be,.124),H(xe,O,3,"fingernail"),A([[de-.014,be+.049,.107],[de,be+.051,.111],[de+.014,be+.049,.107]],.0013,g,3,"finger-crease")}A([[z*.71,-.032,.071],[z*.75,-.039,.077],[z*.794,-.032,.068]],.0016,g,3,"wrist-fold")}let S=[],U=Te[4].getAttribute("position");for(let z=0;z<U.count;z++)S.push(Math.abs(U.getX(z))>.49?1:0);Te[4].setAttribute("seamRegion",new Re(S,1));let X=N.clone(),V=new ir({depthPacking:ms});s.push(X,V);let pe=z=>{z.vertexShader=`attribute float seamRegion;varying vec2 garmentHemCoords;
`+z.vertexShader,z.vertexShader=z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
garmentHemCoords=vec2(seamRegion,position.y);`),z.fragmentShader=`varying vec2 garmentHemCoords;
`+z.fragmentShader,z.fragmentShader=z.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if((garmentHemCoords.x<.5&&garmentHemCoords.y<.118)||(garmentHemCoords.x>=.5&&garmentHemCoords.y<`+(l?.798:.033).toFixed(3)+"))discard;")};X.onBeforeCompile=pe,V.onBeforeCompile=pe,X.customProgramCacheKey=()=>"sculpt-sewn-hem-"+(l?"tee":h?"tank":"jacket"),V.customProgramCacheKey=()=>"sculpt-sewn-depth-"+(l?"tee":h?"tank":"jacket");let te=H(Te[4],X,(z,ee)=>Math.abs(z)>.52&&ee>.015?2:1,"shirt-body");te.customDepthMaterial=V;for(let z of[-1,1])h||j(z*(l?.57:.744),l?.773:.014,l?.01:.026,l?.165:.08,l?.161:.076,F,2,"sewn-sleeve-hem",l?.026:.019);let ie=[];for(let z=0;z<64;z++){let ee=z/64*Math.PI*2;ie.push([.183*Math.cos(ee),1.234-.034*Math.sin(ee)**2,.132*Math.sin(ee)])}A(ie,.012,F,1,"ribbed-collar",!0),j(0,.097,.006,.415,.229,F,1,"sewn-shirt-hem",.021);function Ee(z,ee,fe=!0){let Se=fe?-1/0:1/0;for(let Y of t.children){if(!Y.name.startsWith("pants-")&&Y.name!=="shirt-body")continue;let ce=Y.geometry.getAttribute("position"),de=Y.geometry.index.array;for(let be=0;be<de.length;be+=3){let xe=de[be],C=de[be+1],le=de[be+2],we=ce.getX(xe),ve=ce.getY(xe),Oe=ce.getX(C),nt=ce.getY(C),Be=ce.getX(le),dt=ce.getY(le),rt=(nt-dt)*(we-Be)+(Be-Oe)*(ve-dt);if(Math.abs(rt)<1e-10)continue;let je=((nt-dt)*(z-Be)+(Be-Oe)*(ee-dt))/rt,mt=((dt-ve)*(z-Be)+(we-Be)*(ee-dt))/rt,gt=1-je-mt;if(je<-1e-4||mt<-1e-4||gt<-1e-4)continue;let pt=ce.getZ(xe)*je+ce.getZ(C)*mt+ce.getZ(le)*gt;(fe?pt>Se:pt<Se)&&(Se=pt)}}return Number.isFinite(Se)?Se:fe?.2:-.2}function He(z,ee,fe,Se=!0,Y=.0016){return A(z.map(([ce,de])=>[ce,de,Ee(ce,de,Se)+(Se?.0025:-.0065)]),Y,ee,4,fe)}H(Te[5],P,4,"pants-body");for(let z of[-1,1]){c?j(z*.245,-.676,-.02,.183,.174,P,4,"sewn-shorts-hem",.018):j(z*.41,-1.548,-.02,.102,.092,L,4,"sewn-pants-hem",.02),He([[z*.32,-.035],[z*.36,-.13],[z*.392,-.23]],L,"front-pocket");let ee=[],fe=[],Se=[],Y=12,ce=12;for(let xe=0;xe<=ce;xe++)for(let C=0;C<=Y;C++){let le=C/Y,we=xe/ce,ve=z*.24+(le-.5)*.15,Oe=-.055-we*(.155+.022*(1-Math.abs(le-.5)*2)),nt=Ee(ve,Oe,!1)-.002-.003*Math.sin(le*Math.PI)*Math.sin(we*Math.PI);if(ee.push(ve,Oe,nt),fe.push(le,we),C<Y&&xe<ce){let Be=xe*(Y+1)+C;Se.push(Be,Be+1,Be+Y+1,Be+1,Be+Y+2,Be+Y+1)}}let de=new ut;de.setAttribute("position",new Re(ee,3)),de.setAttribute("uv",new Re(fe,2)),de.setIndex(Se),H(de,P,4,"rear-pocket-patch",!1);let be=[[-.068,0],[.068,0],[.068,-.142],[0,-.163],[-.068,-.142],[-.068,0]].map(([xe,C])=>[z*.24+xe,-.061+C]);He(be,L,"rear-pocket-stitch",!1,.0012)}if(He([[0,.08],[0,-.06],[.019,-.19]],L,"fly-stitch"),!l&&!h&&!/Knit|Puffer|Hoodie/i.test(e.suit)){let z=v("#171b1d",.92),ee=v("#303432",.84),fe=[],Se=[],Y=[],ce=8,de=36;for(let xe=0;xe<=de;xe++)for(let C=0;C<=ce;C++){let le=.2+xe/de*.96,we=(C/ce-.5)*(.15+.055*xe/de);if(fe.push(we,le,Ee(we,le,!0)+.002),Se.push(C/ce,xe/de),C<ce&&xe<de){let ve=xe*(ce+1)+C;Y.push(ve,ve+1,ve+ce+1,ve+1,ve+ce+2,ve+ce+1)}}let be=new ut;be.setAttribute("position",new Re(fe,3)),be.setAttribute("uv",new Re(Se,2)),be.setIndex(Y),H(be,z,1,"jacket-inner-shirt",!1);for(let xe of[-1,1]){let C=[[xe*.092,1.16],[xe*.11,.95],[xe*.105,.6],[xe*.075,.2]].map(([we,ve])=>[we,ve,Ee(we,ve,!0)+.005]);A(C,.004,F,1,"jacket-front-edge");let le=[[xe*.27,.59],[xe*.35,.44]].map(([we,ve])=>[we,ve,Ee(we,ve,!0)+.003]);A(le,.003,F,1,"jacket-pocket-welt")}if(/Blazer|Dinner|Biker/i.test(e.suit)){for(let xe of[-1,1]){let C=[[xe*.1,1.19],[xe*.2,1.02],[xe*.105,.77],[xe*.067,1.02]],le=C.flatMap(([ve,Oe])=>[ve,Oe,Ee(ve,Oe,!0)+.012]),we=new ut;we.setAttribute("position",new Re(le,3)),we.setIndex([0,1,2,0,2,3]),we.computeVertexNormals(),H(we,N,1,"folded-lapel",!1),A(C.map(([ve,Oe])=>[ve,Oe,Ee(ve,Oe,!0)+.014]),.0014,F,1,"lapel-stitch")}for(let xe of[.48,.31]){let C=new $e(.009,.009,.006,20);C.rotateX(Math.PI/2),C.translate(.1,xe,Ee(.1,xe,!0)+.008),H(C,Z,1,"jacket-button",!1)}}else{if(["classic","ruby","midnight"].includes(e.suit))for(let xe of[-1,1])A([[xe*.53,1.04,.16],[xe*.6,.8,.15],[xe*.65,.56,.14],[xe*.7,.28,.12]],.008,$,2,"racing-sleeve-piping");for(let xe=.25;xe<1.15;xe+=.026){let C=new tt(.008,.008,.004);C.translate(.08,xe,Ee(.08,xe,!0)+.007),H(C,Z,1,"zipper-tooth",!1)}if(["classic","ruby","midnight"].includes(e.suit))for(let xe=0;xe<3;xe++)for(let C=0;C<4;C++){let le=-.32+C*.033,we=.92+xe*.033,ve=new Yt(.032,.032);ve.translate(le,we,Ee(le,we,!0)+.004),H(ve,(xe+C)%2?z:$,1,"club-checker-patch",!1)}}}if(/Hoodie/i.test(e.suit)){let z=new Gt(1,48,32,0,Math.PI*2,0,Math.PI*.68);z.scale(.24,.24,.16),z.rotateX(Math.PI/2),z.translate(0,1.08,-.2);let ee=N.clone();ee.side=Wt,s.push(ee),H(z,ee,1,"folded-hood");for(let fe of[-1,1])A([[fe*.1,1.17,.16],[fe*.09,1.04,.23],[fe*.11,.88,.235]],.0035,$,1,"hood-drawstring")}if(/Puffer/i.test(e.suit))for(let z=.26;z<1.17;z+=.14){let ee=[];for(let Se=0;Se<=24;Se++){let Y=-.37+Se*.74/24;ee.push([Y,z,Ee(Y,z,!0)+.004])}let fe=new Ct(new wt(ee.map(Se=>new w(...Se))),32,.004,6,!1);H(fe,F,1,"quilted-puffer-seam",!1)}if(e.necklace&&e.necklace!=="none"){let z=v(r.item("necklace",e.necklace).color,.26,.88),ee=new wt([[-.16,1.24,.04],[-.16,1.14,.2],[-.13,.93,.26],[0,.82,.275],[.13,.93,.26],[.16,1.14,.2],[.16,1.24,.04],[0,1.25,-.145]].map(de=>new w(...de)),!0),fe=[],Se=[],Y=[];for(let de=0;de<56;de++){let be=de/56,xe=ee.getPointAt(be),C=ee.getTangentAt(be).normalize(),le=new w(xe.x,0,xe.z).normalize(),we=new w().crossVectors(le,C).normalize();le.crossVectors(C,we).normalize();let ve=new ht().makeBasis(C,we,le),Oe=new Un().setFromRotationMatrix(ve);de%2&&Oe.multiply(new Un().setFromAxisAngle(new w(1,0,0),Math.PI/2));let nt=/Beads|pearl/.test(e.necklace),Be=nt?new Gt(.01,12,8):new Ft(.0105,.003,6,12);nt||Be.scale(1.2,.8,1),Be.applyQuaternion(Oe),Be.translate(xe.x,xe.y,xe.z);let dt=Be.getAttribute("position"),rt=Be.getAttribute("normal"),je=fe.length/3;fe.push(...dt.array),Se.push(...rt.array),Y.push(...Array.from(Be.index.array,mt=>mt+je)),Be.dispose()}let ce=new ut;if(ce.setAttribute("position",new Re(fe,3)),ce.setAttribute("normal",new Re(Se,3)),ce.setIndex(Y),H(ce,z,1,"interlocked-necklace-links"),!["silverChain","goldChain","blackBeads","pearl"].includes(e.necklace)){let de=e.necklace,be=new Ht,xe=de==="nicknameBling",C=xe?.11:.045,le=xe?.032:.055;de==="spadeDiamond"?(be.moveTo(0,le),be.bezierCurveTo(-.016,.028,-.069,0,-.041,-.026),be.quadraticCurveTo(-.016,-.04,0,-.018),be.quadraticCurveTo(.016,-.04,.041,-.026),be.bezierCurveTo(.069,0,.016,.028,0,le),be.lineTo(.016,-le),be.lineTo(-.016,-le),be.closePath()):de==="crownPendant"?(be.moveTo(-C,-le),be.lineTo(C,-le),be.lineTo(C,le*.55),be.lineTo(C*.48,0),be.lineTo(0,le),be.lineTo(-C*.48,0),be.lineTo(-C,le*.55),be.closePath()):(be.moveTo(-C,-le),be.lineTo(C,-le),be.lineTo(C,le),be.lineTo(-C,le),be.closePath());let we=new zt(be,{depth:.008,bevelEnabled:!0,bevelSize:.003,bevelThickness:.002,bevelSegments:3});if(we.translate(0,.755,.279),H(we,z,1,"necklace-pendant:"+de),["silverTag","acesPendant","poker21Pendant","nicknameBling"].includes(de)){let ve=document.createElement("canvas");ve.width=512,ve.height=192;let Oe=ve.getContext("2d");Oe.clearRect(0,0,512,192),Oe.fillStyle="#f7e7b5",Oe.font="bold 100px Arial",Oe.textAlign="center",Oe.textBaseline="middle",Oe.fillText(de==="nicknameBling"?e.patchText||"POKER21":de==="acesPendant"?"A\u2660 A\u2665":de==="silverTag"?"\u2660":"P21",256,100,480);let nt=new Vt(ve);nt.colorSpace=bt,a.push(nt);let Be=new Nt({map:nt,transparent:!0,alphaTest:.1,roughness:.32,metalness:.3});s.push(Be);let dt=new Yt(C*1.85,le*1.7);dt.translate(0,.755,.291),H(dt,Be,1,"pendant-engraving:"+de)}}}if(oe&&!c){let de=function(be,xe,C){let le=C>0?-1/0:1/0;for(let we=0;we<ce.length;we+=3){let ve=ce[we],Oe=ce[we+1],nt=ce[we+2],Be=Y.getY(ve),dt=Y.getZ(ve),rt=Y.getY(Oe),je=Y.getZ(Oe),mt=Y.getY(nt),gt=Y.getZ(nt),pt=(je-gt)*(Be-mt)+(mt-rt)*(dt-gt);if(Math.abs(pt)<1e-10)continue;let _t=((je-gt)*(be-mt)+(mt-rt)*(xe-gt))/pt,Ot=((gt-dt)*(be-mt)+(Be-mt)*(xe-gt))/pt,kt=1-_t-Ot;if(_t<-1e-4||Ot<-1e-4||kt<-1e-4)continue;let Kt=Y.getX(ve)*_t+Y.getX(Oe)*Ot+Y.getX(nt)*kt;(C>0?Kt>le:Kt<le)&&(le=Kt)}return Number.isFinite(le)?le:C*.42},z=v("#ffffff",.93);z.vertexColors=!0;let ee=new lt(r.item("pants",e.pants).color),fe=new lt("#e5e1d7"),Se=t.children.find(be=>be.name==="pants-body"),Y=Se.geometry.getAttribute("position"),ce=Se.geometry.index.array;for(let be of[-1,1]){let xe=[],C=[],le=[];for(let nt=0;nt<=64;nt++)for(let Be=0;Be<=6;Be++){let dt=Be/6*2-1,rt=.05-nt/64*1.58,je=-.02+dt*.041,mt=de(rt,je,be)+be*.0025,gt=Math.abs(dt)<.5?ee:fe;if(xe.push(mt,rt,je),C.push(gt.r,gt.g,gt.b),nt<64&&Be<6){let pt=nt*7+Be;le.push(pt,pt+1,pt+6+1,pt+1,pt+6+2,pt+6+1)}}let Oe=new ut;Oe.setAttribute("position",new Re(xe,3)),Oe.setAttribute("color",new Re(C,3)),Oe.setIndex(le),Oe.computeVertexNormals(),z.side=Wt,H(Oe,z,4,"club-pants-side-stripe",!1)}}if(/Cargo/i.test(e.pants))for(let z of[-1,1]){let ee=z*.3,fe=-.43,Se=Ee(ee,fe,!0)+.023,Y=new tt(.15,.19,.035);Y.translate(ee,fe,Se),H(Y,P,4,"cargo-thigh-pocket",!1);let ce=new tt(.17,.045,.015);ce.translate(ee,fe+.08,Se+.024),H(ce,L,4,"cargo-pocket-flap",!1)}if(e.patch&&e.patch!=="none"){let z=new Vt(r.patchCanvas(e));z.colorSpace=bt,a.push(z);let ee=new Nt({map:z,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(ee);let fe=[],Se=[],Y=[],ce=12,de=6;for(let xe=0;xe<=de;xe++)for(let C=0;C<=ce;C++){let le=-.285+C/ce*.235,we=.91-xe/de*.088;if(fe.push(le,we,Ee(le,we,!0)+.004),Se.push(C/ce,1-xe/de),C<ce&&xe<de){let ve=xe*(ce+1)+C;Y.push(ve,ve+ce+1,ve+1,ve+1,ve+ce+1,ve+ce+2)}}let be=new ut;be.setAttribute("position",new Re(fe,3)),be.setAttribute("uv",new Re(Se,2)),be.setIndex(Y),be.computeVertexNormals(),H(be,ee,1,"sewn-word-patch",!1)}for(let z of[-1,1]){let de=function(C,le,we){let ve=[],Oe=[],nt=[];for(let rt=0;rt<C.length;rt++){let[je,mt,gt,pt]=C[rt];for(let _t=0;_t<=48;_t++){let Ot=_t/48*Math.PI*2;if(ve.push(Y+mt*Math.cos(Ot),we==="leather-sneaker"?gt+(pt-gt)*Math.max(0,Math.sin(Ot)):(gt+pt)/2+(pt-gt)/2*Math.sin(Ot),je),Oe.push(_t/48,rt/(C.length-1)),rt<C.length-1&&_t<48){let kt=rt*49+_t;nt.push(kt,kt+1,kt+48+1,kt+1,kt+48+2,kt+48+1)}}}for(let rt of[0,C.length-1]){let[je,,mt,gt]=C[rt],pt=rt*49,_t=ve.length/3;ve.push(Y,(mt+gt)/2,je),Oe.push(.5,rt/(C.length-1));for(let Ot=0;Ot<48;Ot++)nt.push(_t,pt+(rt===0?Ot+1:Ot),pt+(rt===0?Ot:Ot+1))}let dt=new ut;return dt.setAttribute("position",new Re(ve,3)),dt.setAttribute("uv",new Re(Oe,2)),dt.setIndex(nt),dt.computeVertexNormals(),H(dt,le,5,we,!1)},be=function(C,le=0){let we=0;for(;we<ce.length-2&&ce[we+1][0]<C;)we++;let ve=ce[we],Oe=ce[we+1],nt=Math.max(0,Math.min(1,(C-ve[0])/(Oe[0]-ve[0]))),Be=ve[1]+(Oe[1]-ve[1])*nt,dt=ve[2]+(Oe[2]-ve[2])*nt,rt=ve[3]+(Oe[3]-ve[3])*nt;return dt+(rt-dt)*Math.sqrt(Math.max(0,1-(le/Be)**2))},ee=/Chelsea|combat|desert|hiking|canvasHigh/i.test(e.shoes),fe=/Oxford|Loafer|Brogue/i.test(e.shoes),Se=/Chelsea|Loafer/i.test(e.shoes),Y=z*.41,ce=[[-.115,.06,-1.8,-1.61],[-.09,.112,-1.815,-1.54],[-.035,.132,-1.815,-1.53],[.04,.138,-1.815,-1.56],[.115,.145,-1.815,-1.615],[.2,.152,-1.815,-1.665],[.28,.156,-1.815,-1.686],[.36,.149,-1.815,-1.699],[.415,.115,-1.81,-1.72],[.443,.058,-1.8,-1.755],[.448,.004,-1.785,-1.78]];if(ee)for(let C of ce)C[0]<.06&&(C[3]+=.19*(1-Math.max(0,C[0])/.12));fe&&($.color.set("#302923"),ae.color.set("#1b1918")),de(ce,q,"leather-sneaker"),de([[-.124,.065,-1.848,-1.805],[-.1,.124,-1.853,-1.798],[-.02,.145,-1.855,-1.798],[.16,.158,-1.855,-1.798],[.32,.164,-1.855,-1.798],[.4,.137,-1.85,-1.798],[.445,.078,-1.835,-1.805],[.459,.004,-1.822,-1.817]],$,"rubber-midsole"),de([[-.122,.065,-1.865,-1.845],[-.09,.124,-1.87,-1.846],[.02,.145,-1.87,-1.846],[.2,.156,-1.87,-1.846],[.34,.158,-1.867,-1.846],[.42,.125,-1.856,-1.841],[.453,.055,-1.837,-1.824],[.458,.003,-1.826,-1.821]],ae,"outsole");for(let C of[-1,1]){A([[Y+C*.098,-1.558,-.045],[Y+C*.135,-1.63,.08],[Y+C*.154,-1.735,.275],[Y+C*.125,-1.765,.392]],.003,W,5,"quarter-panel-seam"),A([[Y+C*.093,-1.579,-.04],[Y+C*.131,-1.65,.1],[Y+C*.148,-1.752,.275]],.0013,$,5,"quarter-stitch");for(let le=0;le<(Se?0:6);le++){let we=.06+le*.042,ve=be(we,.06)+.002,Oe=new Ft(.0055,.0018,6,12);Oe.rotateX(-.95),Oe.translate(Y+C*.06,ve,we),H(Oe,W,5,"lace-eyelet",!1)}}for(let C=0;C<(Se?0:6);C++){let le=.062+C*.042;A([[Y-.06,be(le,.06)+.004,le],[Y,be(le+.009)+.005,le+.009],[Y+.06,be(le,.06)+.004,le]],.0032,$,5,"woven-lace"),A([[Y+.06,be(le+.004,.06)+.005,le+.004],[Y,be(le+.012)+.006,le+.012],[Y-.06,be(le+.004,.06)+.005,le+.004]],.0032,$,5,"woven-lace-cross")}Se&&A([[Y-.1,be(.14,.1)+.006,.14],[Y,be(.14)+.009,.14],[Y+.1,be(.14,.1)+.006,.14]],.008,W,5,"slip-on-vamp-band"),A([[Y-.108,-1.777,.29],[Y-.12,-1.762,.36],[Y,-1.749,.421],[Y+.12,-1.762,.36],[Y+.108,-1.777,.29]],.0018,$,5,"toe-stitch");let xe=new tt(.065,.1,.018);xe.translate(Y,-1.6,-.107),H(xe,W,5,"heel-pull-tab",!1);for(let C=0;C<12;C++)for(let le of[-1,1])A([[Y+le*.15,-1.827,.02+C*.027],[Y+le*.15,-1.842,.02+C*.027]],.0013,ae,5,"sole-groove")}function Pe(z,ee,fe,Se,Y=.024){let ce=z.geometry.getAttribute("position"),de=z.geometry.getAttribute("normal"),be=[],xe=[],C=[];for(let ve=0;ve<ee;ve++){let Oe=Math.floor(Ir(ve+fe*521)*ce.count),nt=new w().fromBufferAttribute(ce,Oe),Be=new w().fromBufferAttribute(de,Oe);if(Se&&!Se(nt,Be))continue;let dt=new w(.08*Math.sin(ve*2.1),-1,.1*Math.cos(ve*1.3));dt.addScaledVector(Be,-dt.dot(Be)).normalize();let rt=new w().crossVectors(Be,dt).normalize(),je=Y*(.65+Ir(ve*2.7)*.75),mt=35e-5+Ir(ve*3.1)*4e-4,gt=be.length/3,pt=nt.y<1.53&&fe===6?Ir(ve*2.2)>.5:!1,_t=new lt(pt?"#5d554b":"#362b23").multiplyScalar(.75+Ir(ve*8.7)*.35);for(let Ot=0;Ot<4;Ot++){let kt=Ot/3,Kt=nt.clone().addScaledVector(Be,.001+je*.3*Math.sin(kt*Math.PI/2)).addScaledVector(dt,je*kt);for(let ln of[-1,1]){let Rn=Kt.clone().addScaledVector(rt,ln*mt*(1-kt*.92));be.push(Rn.x,Rn.y,Rn.z),xe.push(_t.r,_t.g,_t.b)}if(Ot<3){let ln=gt+Ot*2;C.push(ln,ln+1,ln+2,ln+1,ln+3,ln+2)}}}if(!be.length)return;let le=new ut;le.setAttribute("position",new Re(be,3)),le.setAttribute("color",new Re(xe,3)),le.setIndex(C),le.computeVertexNormals();let we=H(le,Ue,fe,"individual-fur-strands",!1);we.castShadow=!1}if(d){let z=t.children.find(ee=>ee.name==="sculpt-cranium");Pe(z,3800,6,(ee,fe)=>!(ee.z>.12&&ee.y>1.33&&ee.y<1.78&&Math.abs(ee.x)<.235)&&(!e.hair||e.hair==="hairNatural"||ee.y<1.76),.027)}if(d)for(let z of t.children.filter(ee=>ee.name==="brow-ridge"))Pe(z,300,6,null,.01);let Je=t.children.filter(z=>z.name.startsWith("fur-arm-")||z.name.startsWith("fur-leg-"));for(let z of Je){let ee=z.name.startsWith("fur-arm");Pe(z,1800,ee?2:4,fe=>ee?fe.y<(h?1.1:l?.8:.015):c&&fe.y<-.68,.021)}if(l||h){let z={...e,hair:"hairNatural",glasses:"none",watch:"none",ring:"none",necklace:"none",body:"bodyNormal",helmet:"none",hat:"none",patch:"none"};await r.loadWardrobe(z);let ee=new Image;ee.src="./assets/player-hall/standing-monkey-v1.webp",await ee.decode();let fe=r.renderCharacter(ee,z),Se=document.createElement("canvas");Se.width=1024,Se.height=1536;let Y=Se.getContext("2d",{willReadFrequently:!0});Y.drawImage(fe,0,1536-fe.height);let ce=Y.getImageData(0,0,1024,1536);for(let Be=0;Be<1536;Be++)for(let dt=0;dt<1024;dt++){let rt=(Be*1024+dt)*4,je=ce.data[rt]/255,mt=ce.data[rt+1]/255,gt=ce.data[rt+2]/255,pt=(je+mt+gt)/3,_t=Math.max(ma(.23,.5,pt),ma(.15,.3,je)*ma(.02,.12,je-mt));ce.data[rt+3]*=dt>340&&dt<684&&Be>315&&Be<663?_t:0}Y.putImageData(ce,0,0);let de=new Vt(Se);de.colorSpace=bt,de.anisotropy=4,a.push(de);let be=new Nt({map:de,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:.96,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(be);let xe=t.children.find(Be=>Be.name==="shirt-body"),C=xe.geometry.clone(),le=C.getAttribute("position"),we=C.getAttribute("normal"),ve=[],Oe=[];for(let Be=0;Be<le.count;Be++)ve.push(.5+le.getX(Be)/2.55,.5+le.getY(Be)/3.825),le.setXYZ(Be,le.getX(Be)+we.getX(Be)*.001,le.getY(Be)+we.getY(Be)*.001,le.getZ(Be)+we.getZ(Be)*.001);let nt=C.index.array;for(let Be=0;Be<nt.length;Be+=3)nt.slice(Be,Be+3).every(dt=>le.getZ(dt)>.03)&&Oe.push(...nt.slice(Be,Be+3));C.setAttribute("uv",new Re(ve,2)),C.setIndex(Oe),H(C,be,1,"screen-printed-shirt",!1)}if(u){for(let xe of[...t.children])xe.name.startsWith("ear-")&&xe.removeFromParent();let z=v(r.item("helmet",e.helmet).color,.25,.45,!0);z.clearcoat=.7,z.clearcoatRoughness=.16;let ee=v("#152731",.1,.55,!0);ee.clearcoat=1,ee.transparent=!0,ee.opacity=.91,ee.side=Wt,H(Te[6],z,6,"helmet-shell",!1),A([[-.28,1.43,.16],[-.2,1.39,.3],[0,1.36,.36],[.2,1.39,.3],[.28,1.43,.16]],.03,z,6,"helmet-chin-bar");let fe=[],Se=[],Y=[],ce=48,de=20;for(let xe=0;xe<=de;xe++)for(let C=0;C<=ce;C++){let le=(C/ce-.5)*1.9,we=(xe/de-.5)*2.4,ve=new w(.35*Math.sin(le),1.665+.26*Math.sin(we),.2+.19*Math.cos(le)*Math.cos(we));if(e.visor==="open"&&ve.sub(new w(0,1.84,.13)).applyAxisAngle(new w(1,0,0),-1.1).add(new w(0,1.84,.13)),fe.push(ve.x,ve.y,ve.z),Se.push(C/ce,xe/de),C<ce&&xe<de){let Oe=xe*(ce+1)+C;Y.push(Oe,Oe+1,Oe+ce+1,Oe+1,Oe+ce+2,Oe+ce+1)}}let be=new ut;be.setAttribute("position",new Re(fe,3)),be.setAttribute("uv",new Re(Se,2)),be.setIndex(Y),be.computeVertexNormals(),H(be,ee,6,"hinged-helmet-visor",!1);for(let xe of[-1,1]){let C=new $e(.027,.027,.012,32);C.rotateZ(Math.PI/2),C.translate(xe*.327,1.73,.035),H(C,Z,6,"visor-hinge",!1);for(let le=0;le<4;le++)Le(_,[xe*.322,1.48+le*.022,-.02],[.007,.006,.036],6,"helmet-vent")}A([[0,1.9,-.2],[0,2.007,-.05],[0,1.995,.15],[0,1.91,.245]],.015,Z,6,"helmet-racing-stripe")}let ot=Sd(n,e,r),ft=Ad(n,{...e,sculptHairOffset:.025,sculptHairDepth:-.075,sculptHairTexture:ze}),Rt=Cd(n,{...e,helmet:d?"none":e.helmet,sculptEyewearDepth:-.025},r),St=e.watch&&e.watch!=="none"?Rd(e.watch,r.item("watch",e.watch).color):null;St&&(t.add(St.group),n.attach(St.group,"rightWrist"));let yt=e.ring&&e.ring!=="none"?Pd(r.item("ring",e.ring).color,e.ring):null;return yt&&(t.add(yt.group),n.attach(yt.group,"rightHand")),n.setRelaxedPose(!0),{root:t,rig:n,geometries:i,materials:s,textures:a,dispose(){ot.dispose(),ft.dispose(),Rt.dispose(),St?.dispose(),yt?.dispose(),i.forEach(z=>z.dispose()),s.forEach(z=>z.dispose()),a.forEach(z=>z.dispose()),n.dispose()}}}async function Ld(r,e,t={}){let n=await Id(window.PokerGarage,e),{root:i,rig:s}=n,a=new Nn;a.add(i);{a.add(new Qn("#fff0d4","#283849",2.1));let Z=new qn("#fff0dc",3.5);Z.position.set(-2,4,5),a.add(Z);let oe=new qn("#9cc3ed",1.2);oe.position.set(3,1,-2),a.add(oe)}let o=new ci({alpha:!0,antialias:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.outputColorSpace=bt,o.toneMapping=ai,o.toneMappingExposure=1.05;let c=null;if(o.shadowMap){o.shadowMap.enabled=!0,o.shadowMap.type=cs;let Z=a.children.find(Te=>Te.isDirectionalLight);Z.castShadow=!0,Z.shadow.mapSize.set(1024,1024),Z.shadow.normalBias=.012,Z.shadow.bias=-15e-5,Z.shadow.camera.left=-2,Z.shadow.camera.right=2,Z.shadow.camera.top=2.2,Z.shadow.camera.bottom=-2.2;let oe=new ct(new Yt(8,8),new _r({opacity:.2}));oe.rotation.x=-Math.PI/2,oe.position.y=-1.875,oe.receiveShadow=!0,a.add(oe),n.geometries.push(oe.geometry),n.materials.push(oe.material);let Ue=new Nn;Ue.background=new lt("#333842");for(let[Te,ze,Ce,ne,_e,H]of[[0,4,0,5,.1,3],[-3,2,2,.1,3,2],[3,1,-2,.1,2,3]]){let Le=new ct(new tt(ne,_e,H),new Wn({color:"#ffffff"}));Le.position.set(Te,ze,Ce),Ue.add(Le)}let Fe=new ar(o);c=Fe.fromScene(Ue,.05),a.environment=c.texture,a.environmentIntensity=.55,Fe.dispose(),Ue.traverse(Te=>{Te.geometry?.dispose(),Te.material?.dispose()})}r.append(o.domElement),o.domElement.setAttribute("role","img"),o.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let l=new an(30,1,.1,30);l.position.set(0,0,9);let h=t.yaw||0,u=t.pitch||0,d=null,p,v=!1,m=!1,f=0,g=window.matchMedia?.("(prefers-reduced-motion: reduce)"),y="full",_=t.focusOrbit||null,x=2.05,T=0,b=0;function I(Z){Z=["watch","ring"].includes(Z)?Z:"full",Z!==y&&(Z!=="full"?(_=_||{yaw:h,pitch:u},t.focusOrbit=_,h=0,u=0):_&&(h=_.yaw,u=_.pitch,_=null,delete t.focusOrbit),t.yaw=h,t.pitch=u,y=Z,r.dataset.focus=y)}function O(Z){let oe=r.clientWidth/Math.max(1,r.clientHeight),Ue=y!=="full",Fe=y==="ring",Te=Ue?Math.max(Fe?.25:.4,(Fe?.18:.3)/oe):Math.max(2.4,1.17/oe),ze=Ue?.76*Math.cos(h)+.1*Math.sin(h):0,Ce=Ue?(Fe?-.27:.04)*Math.cos(u)-(.1*Math.cos(h)-.76*Math.sin(h))*Math.sin(u):-.22,ne=1-Math.exp(-Z*12);x+=(Te-x)*ne,T+=(ze-T)*ne,b+=(Ce-b)*ne,l.aspect=oe;let _e=x/Math.tan(l.fov*Math.PI/360);l.position.set(T,b+x*.16,_e),l.lookAt(T,b,0),l.updateProjectionMatrix()}let N=()=>{!r.clientWidth||!r.clientHeight||(O(1),o.setSize(r.clientWidth,r.clientHeight,!1))},F=new ResizeObserver(N);F.observe(r),N();let P=Z=>{m=!1,d={id:Z.pointerId,x:Z.clientX,y:Z.clientY},r.setPointerCapture(Z.pointerId),Z.preventDefault()},L=Z=>{!d||d.id!==Z.pointerId||(h+=(Z.clientX-d.x)*.012,u=Math.max(-.35,Math.min(.35,u+(Z.clientY-d.y)*.006)),d.x=Z.clientX,d.y=Z.clientY)},q=()=>{d=null},W=Z=>{["ArrowLeft","ArrowRight"].includes(Z.key)&&(h+=Z.key==="ArrowLeft"?-.15:.15,Z.preventDefault())};r.addEventListener("pointerdown",P),r.addEventListener("pointermove",L),r.addEventListener("pointerup",q),r.addEventListener("pointercancel",q),r.addEventListener("keydown",W);function $(Z=0){if(v)return;if(!r.isConnected){ae();return}m&&!d&&f&&(h+=Math.min(.05,(Z-f)/1e3)*.35);let oe=!g?.matches&&!d&&y==="full"?1:0,Ue=f?Math.min(.05,(Z-f)/1e3):.016;s.update(Z/1e3,oe,Ue),O(Ue),f=Z,i.rotation.set(u,h,0),t.yaw=h,t.pitch=u,r.dataset.yaw=String(h),o.render(a,l),t.snapshotOnly||(p=requestAnimationFrame($))}return $(),{state:t,setFocus:I,snapshot(){O(1),i.rotation.set(u,h,0),o.render(a,l);let Z=document.createElement("canvas");return Z.width=o.domElement.width,Z.height=o.domElement.height,Z.getContext("2d").drawImage(o.domElement,0,0),Z},setYaw(Z){h=Z,t.snapshotOnly&&(O(1),$())},setAutoRotate(Z){m=!!Z},dispose:ae};function ae(){if(!v){v=!0,cancelAnimationFrame(p),F.disconnect();for(let[Z,oe]of[["pointerdown",P],["pointermove",L],["pointerup",q],["pointercancel",q],["keydown",W]])r.removeEventListener(Z,oe);n.dispose(),c?.dispose(),o.dispose(),o.forceContextLoss(),o.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new Nn,s=new Xe;i.add(s);let a=new ci({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=bt,a.toneMapping=ai,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new an(34,1,.1,40);i.add(new Qn("#dcecff","#50402b",2));for(let[H,Le,A,R]of[[3,6,5,4],[-3,3,-3,3]]){let j=new qn("#fff0dd",R);j.position.set(H,Le,A),i.add(j)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let H=0;H<128;H+=2)l.fillStyle=H%4?"#808080":"#b0b0b0",l.fillRect(0,H,128,1);for(let H=0;H<128;H+=3)l.fillStyle="#888888",l.fillRect(H,0,1,128);let h=new Vt(c);h.wrapS=h.wrapT=An,h.repeat.set(8,8);let u=(H,Le=0,A=.7)=>new Nt({color:H,metalness:Le,roughness:A}),d=u("#32251d"),p=u("#96715a"),v=u("#11161b"),m=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),y=u("#171b20"),_=u("#171b20"),x=u("#826222",.9,.18);for(let H of[g,y,v])H.bumpMap=h,H.bumpScale=.012;function T(H,Le,A,R,j,k,S,U=s){let X=new ct(new Gt(1,40,28),H);return X.position.set(Le,A,R),X.scale.set(j,k,S),U.add(X),X}function b(H,Le,A,R,j=R){let k=new w(...Le),S=new w(...A),U=S.clone().sub(k),X=new ct(R>.1?new rs((R+j)/2,Math.max(.01,U.length()-(R+j)),10,32):new $e(j,R,U.length(),16),H);return X.position.copy(k.add(S).multiplyScalar(.5)),X.quaternion.setFromUnitVectors(new w(0,1,0),U.normalize()),s.add(X),X}T(y,0,1.64,0,.47,.36,.26),T(g,0,2.32,0,.59,.65,.32),T(v,0,2.35,.29,.27,.49,.055);for(let H of[-1,1]){b(y,[H*.27,1.67,0],[H*.29,.92,.015],.23,.25),T(y,H*.29,.92,.015,.23,.24,.24),b(y,[H*.29,.94,.015],[H*.32,.28,0],.16,.22),b(m,[H*.45,1.55,.03],[H*.48,.36,.03],.025,.032),T(_,H*.32,.18,.15,.22,.19,.39),T(m,H*.32,.075,.15,.235,.065,.4),T(m,H*.32,.27,.12,.135,.08,.2);for(let Le=0;Le<5;Le++)b(m,[H*.32-.1,.29,.08+Le*.04],[H*.32+.1,.29,.08+Le*.04],.009);T(g,H*.55,2.63,0,.26,.27,.29),b(g,[H*.57,2.63,0],[H*.76,2.12,.02],.19,.23),T(g,H*.76,2.12,.02,.19,.2,.2),b(g,[H*.76,2.12,.02],[H*.88,1.65,.08],.13,.18),b(m,[H*.71,2.6,.15],[H*.99,1.72,.15],.035),T(v,H*.88,1.67,.08,.145,.09,.15),T(d,H*.89,1.48,.1,.16,.22,.12);for(let Le=0;Le<4;Le++)T(p,H*(.79+Le*.065),1.36,.15,.035,.13,.045);T(p,H*.75,1.48,.2,.06,.12,.06)}T(d,0,3.04,0,.25,.27,.24),T(d,0,3.39,0,.36,.43,.31);for(let H of[-1,1])T(p,H*.36,3.4,.01,.12,.17,.09),T(d,H*.36,3.4,.065,.065,.1,.035),T(p,H*.15,3.43,.258,.15,.12,.075),T(v,H*.14,3.44,.32,.045,.035,.02),T(m,H*.13,3.45,.335,.009,.01,.006),T(d,H*.15,3.53,.28,.18,.05,.07);T(p,0,3.23,.27,.26,.18,.13),T(p,0,3.34,.34,.14,.08,.08),T(v,0,3.17,.375,.17,.017,.018),T(p,0,3.13,.36,.17,.035,.025);let I=new Xe;s.add(I),T(v,0,3.51,-.02,.41,.42,.35,I),T(f,0,3.64,.015,.07,.3,.36,I);for(let H of[-1,1])T(v,H*.32,3.29,.015,.1,.31,.24,I),T(f,H*.39,3.43,.07,.025,.05,.05,I);let O=T(x,0,3.44,.27,.38,.19,.14,I);for(let H of[-1,1])b(v,[H*.28,2.88,.25],[H*.1,2.58,.33],.035),b(v,[H*.3,2.28,.3],[H*.39,2.09,.26],.018);for(let H=0;H<6;H++)T(f,0,2.03+H*.14,.35,.015,.015,.01);let N=document.createElement("canvas");N.width=512,N.height=256;let F=N.getContext("2d"),P=new Vt(N);P.colorSpace=bt;let L=new ct(new Yt(.28,.12),new Nt({map:P,roughness:.9}));L.position.set(-.27,2.46,.317),s.add(L);let q=new Xe;for(let H=0;H<3;H++)for(let Le=0;Le<5;Le++){let A=new ct(new Yt(.048,.048),(Le+H)%2?v:m);A.position.set(-.36+Le*.048,2.62+H*.048,.318),q.add(A)}s.add(q);function W(H){g.color.set(n.item("suit",H.suit).color),y.color.set(n.item("pants",H.pants).color),_.color.set(n.item("shoes",H.shoes).color),I.visible=H.helmet!=="none",O.position.y=H.visor==="open"?3.71:3.44,O.rotation.x=H.visor==="open"?-.8:0,L.visible=H.patch!=="none",F.fillStyle="#22282b",F.fillRect(0,0,512,256),F.strokeStyle="#c9af74",F.lineWidth=12,F.strokeRect(8,8,496,240),F.fillStyle="#eee0b5",F.font="bold 72px Arial",F.textAlign="center",F.fillText(H.patch==="name"?H.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":H.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),P.needsUpdate=!0}W(e),t.yaw??=0,t.pitch??=.07;let $=null,ae,Z=!1;function oe(){let H=r.clientWidth,Le=r.clientHeight;!H||!Le||(a.setSize(H,Le,!1),o.aspect=H/Le,o.updateProjectionMatrix())}let Ue=new ResizeObserver(oe);Ue.observe(r),oe();let Fe=H=>{$={id:H.pointerId,x:H.clientX,y:H.clientY},r.setPointerCapture(H.pointerId),H.preventDefault()},Te=H=>{!$||$.id!==H.pointerId||(t.yaw-=(H.clientX-$.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(H.clientY-$.y)*.006)),$.x=H.clientX,$.y=H.clientY)},ze=()=>{$=null},Ce=H=>{(H.key==="ArrowLeft"||H.key==="ArrowRight")&&(t.yaw+=H.key==="ArrowLeft"?.15:-.15,H.preventDefault())};r.addEventListener("pointerdown",Fe),r.addEventListener("pointermove",Te),r.addEventListener("pointerup",ze),r.addEventListener("pointercancel",ze),r.addEventListener("keydown",Ce);function ne(){if(Z)return;Z=!0,cancelAnimationFrame(ae),Ue.disconnect();for(let[Le,A]of[["pointerdown",Fe],["pointermove",Te],["pointerup",ze],["pointercancel",ze],["keydown",Ce]])r.removeEventListener(Le,A);let H=new Set;i.traverse(Le=>{Le.geometry?.dispose(),Le.material&&H.add(Le.material)});for(let Le of H)Le.dispose();P.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function _e(){if(Z)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){ne();return}let H=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*H,1.95+Math.sin(t.pitch)*H,Math.cos(t.yaw)*Math.cos(t.pitch)*H),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ae=requestAnimationFrame(_e)}return _e(),{update:W,dispose:ne,state:t}};function ih(r){let e=new Xe;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(N,F,P)=>new vn({color:N,metalness:F,roughness:P,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(N,F,P=0,L=0,q=0)=>{let W=new ct(N,F);return W.position.set(P,L,q),W.castShadow=W.receiveShadow=!0,e.add(W),W},h=(N,F,P,L=!0)=>{let q=new Bn;return q.absarc(F,P,N,0,Math.PI*2,L),q},u=t?.395:.437,d=new Ht;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let N=0;N<24;N++)for(let[F,P]of[[.28,0],[.36,.045]]){let L=N*Math.PI/12+P;d.holes.push(h(n?.009:.011,Math.cos(L)*F,Math.sin(L)*F))}for(let N of[0,.033])l(new zt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,N);let p=new tt(.22,.014,.025),v=new Ws(p,a,32),m=new ht;for(let N=0;N<32;N++){let F=N*Math.PI/16;m.compose(new w(Math.cos(F)*.31,Math.sin(F)*.31,.021),new Un().setFromAxisAngle(new w(0,0,1),F+.18),new w(1,1,1)),v.setMatrixAt(N,m)}e.add(v);let f=l(new $e(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new $e(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let N=0;N<10;N++){let F=N*Math.PI/5,P=l(new $e(.017,.017,.015,12),s,Math.cos(F)*.18,Math.sin(F)*.18,.05);P.rotation.x=Math.PI/2;let L=l(new $e(.009,.009,.018,6),a,Math.cos(F)*.18,Math.sin(F)*.18,.058);L.rotation.x=Math.PI/2}for(let N of[.235,.26,.31,.335,.39,.414])if(N<u){let F=l(new Ft(N,.0012,3,96),a,0,0,.042);F.castShadow=!1}if(!t)for(let N=0;N<8;N++){let F=N*Math.PI/4,P=[.25,.29,.34,.395].map((q,W)=>new w(Math.cos(F+W*.075)*q,Math.sin(F+W*.075)*q,.043)),L=l(new Ct(new wt(P),12,.0024,3,!1),a);L.castShadow=!1}let y=new Ht;y.moveTo(-.08,-.2),y.quadraticCurveTo(-.13,-.15,-.115,-.06),y.lineTo(-.115,.1),y.quadraticCurveTo(-.12,.19,-.05,.215),y.lineTo(.055,.19),y.quadraticCurveTo(.11,.14,.105,.06),y.lineTo(.105,-.1),y.quadraticCurveTo(.1,-.19,.04,-.21),y.closePath();let _=l(new zt(y,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&_.scale.set(.8,.8,.8),l(new tt(.09,.31,.032),a,.27,0,.005);for(let N of[-.125,0,.125]){let F=l(new $e(.055,.055,.028,24),c,.354,N,.07);F.rotation.x=Math.PI/2}for(let N of[-.155,.155]){let F=l(new $e(.014,.014,.025,6),s,.325,N,.094);F.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let T=x.getContext("2d");T.fillStyle="#f5f0df",T.translate(64,192),T.rotate(-Math.PI/2),T.textAlign="center",T.font="italic bold 60px Arial",T.fillText(t?"P21":"P21 SPORT",0,20);let b=new Vt(x);b.colorSpace=bt;let I=l(new Yt(.075,.24),new Wn({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);I.castShadow=!1;let O=l(new $e(.012,.014,.047,6),s,.36,.217,.042);return O.rotation.z=.2,e}var nh;function Dd(r,e){if(!r.isConnected)return;if(!nh){let a=new ci({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=bt,a.toneMapping=ai,a.toneMappingExposure=1.15;let o=new Nn;o.add(new Qn("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let p=new qn("#ffffff",d);p.position.set(l,h,u),o.add(p)}let c=new an(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),nh={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=nh;s[e]||(s[e]=ih(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Ud(r){let e=new Xe;e.name="tyre-"+r;let t=new Nt({color:"#15181b",roughness:.86}),n=new Nt({color:"#050708",roughness:.96}),i=new Nt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new ct(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new ki([new Me(.56,-.19),new Me(.63,-.25),new Me(.72,-.23),new Me(.79,-.15),new Me(.8,-.1),new Me(.8,.1),new Me(.79,.15),new Me(.72,.23),new Me(.63,.25),new Me(.56,.19)],96),t);if(a.rotation.x=Math.PI/2,r!=="semi")for(let l of[-1,1]){let h=s(new Ft(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,p=s(new tt(.018,.036,.006),i);p.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),p.rotation.z=-d}}let o=r==="wet",c=r==="semi";if(o||c){let l=o?34:14;for(let h=0;h<l;h++)for(let u of[-1,1]){let d=h*2*Math.PI/l+(u<0?Math.PI/l*.45:0),p=Array.from({length:23},(m,f)=>{let g=f/22,y=u*((c?.035:.012)+g*(c?.175:.198)),_=.8-.045*(Math.abs(y)/.2)**3,x=d+(c?.25:.19)*(1-g)*(1-g);return new w(Math.sin(x)*_,Math.cos(x)*_,y)}),v=s(new Ct(new wt(p),28,o?.008:.009,6,!1),n);v.name="tread-shoulder-groove"}if(o)for(let h of[-.14,-.045,.045,.14]){let u=s(new Ft(.798,.007,8,96),n);u.position.z=h,u.name="tread-water-channel"}}return e}function Nd(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new w;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Re(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new ir({depthPacking:ms});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Bd(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new Xe;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(T,b,I)=>{let O=new ct(T,b);return O.name=I,O.castShadow=O.receiveShadow=!0,c.add(O),O};for(let T=0;T<h;T++){let b=[],I=[];for(let P=0;P<=72;P++){let L=P/72*2-1,q=L*l/2,W=(T?a?.36:.46:.76)*(1-.22*L*L),$=(T?2.86+T*.055:3.02)-.13*L*L,ae=.43+T*.095+.1*Math.pow(Math.abs(L),3);for(let Z=0;Z<=28;Z++){let oe=Z/28*Math.PI*2,Ue=Math.cos(oe);b.push($+Ue*W/2,ae+.035*(1-Ue*Ue)+Math.sin(oe)*(T?.024:.035),q)}if(P<72)for(let Z=0;Z<28;Z++){let oe=P*29+Z,Ue=oe+28+1;I.push(oe,oe+1,Ue,oe+1,Ue+1,Ue)}}let F=new ut;F.setAttribute("position",new Re(b,3)),F.setIndex(I),F.computeVertexNormals(),u(F,T===0?n:t,"wing-element-"+T)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],p=[0,1,2,3].map(T=>new wt(d.map((b,I)=>new w(b[T],I,0)),!1,"catmullrom",.35)),v=[],m=[],f=96,g=48;for(let T=0;T<=f;T++){let b=T/f,[I,O,N,F]=p.map(P=>P.getPoint(b).x);for(let P=0;P<=g;P++){let L=P/g*Math.PI*2,q=Math.cos(L),W=Math.sin(L),$=a?.7:.82;v.push(I,O+Math.sign(W)*Math.pow(Math.abs(W),$)*F,Math.sign(q)*Math.pow(Math.abs(q),$)*N)}if(T<f)for(let P=0;P<g;P++){let L=T*(g+1)+P,q=L+1;m.push(L,L+g+1,q,q,L+g+1,q+g+1)}}let y=m.length;for(let T of[0,f]){let b=T*(g+1);for(let I=1;I<g-1;I++)T===0?m.push(b,b+I,b+I+1):m.push(b,b+I+1,b+I)}let _=new ut;_.setAttribute("position",new Re(v,3)),_.setIndex(m),_.computeVertexNormals();let x=Math.floor(f*.89)*g*6;_.addGroup(0,x,0),_.addGroup(x,y-x,a?1:0),_.addGroup(y,m.length-y,0),u(_,[t,s],"tapered-nose");for(let T of[-1,1]){let b=u(new tt(.15,.4,.035),n,"nose-pylon");b.position.set(2.94,.69,T*.1),b.rotation.z=-.15;let I=new Ht;I.moveTo(2.57,.38),I.lineTo(3.43,.38),I.quadraticCurveTo(3.53,.42,3.43,.61),I.lineTo(3.14,a?.69:.64),I.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),I.closePath();let O=u(new zt(I,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");O.position.z=T*l/2-.017,u(new tt(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,T*(l/2+.055));let F=new wt([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([P,L])=>new w(P,L,T*(l/2+.025))));if(u(new Ct(F,28,.009,6,!1),s,"endplate-trim"),a)for(let P=0;P<3;P++){let L=u(new tt(.27,.075,.018),n,"flow-fin");L.position.set(2.86+P*.07,.54+P*.045,T*(1.1+P*.1)),L.rotation.z=.15}}for(let T of c.children){let b=T.geometry?.getAttribute("position");if(b){for(let I=0;I<b.count;I++)b.setX(I,b.getX(I)*.78);T.geometry.computeVertexNormals()}T.position.x=.2332+T.position.x*.78}return c}function Lr(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new Mn;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new ht().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function rh(r,{paint:e,carbon:t,metal:n}){let i=new Xe;i.name="rear-wing-"+r;let s=new Xe;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(g,y,_,x,T,b,I=i){let O=new ct(g,y);return O.name=_,O.position.set(x,T,b),O.castShadow=O.receiveShadow=!0,I.add(O),O}function p(g,y,_,x,T){let b=new Ht;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let I=new zt(b,{depth:_,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});I.translate(0,0,-_/2);let O=d(I,T,"rear-wing-blade",g,y,0,s);O.rotation.z=-.08}if(p(0,l,h,u,o||r==="sport"?t:n),c&&p(.025,l+.23,h*.96,u*.7,t),a&&p(-.05,l-.18,h,.3,e),r!=="lip")for(let g of[-1,1])d(new tt(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),g*h/2,s);let v=[];for(let g of[-.72,.72]){d(new tt(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,g);for(let x of[-2.36,-2.22])d(new $e(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,g);let y=d(new tt(1,.075,.085),t,"rearward-mount-arm",0,1.015,g),_=d(new tt(.085,1,.075),t,"rear-wing-upright",0,0,g);v.push({lower:y,post:_,z:g})}let m=Lr([s],i).max.x;function f(g){let y=Math.min(-2.85,g&&!g.isEmpty()?g.min.x-.24-m:-2.85);s.position.x=y;for(let{lower:_,post:x}of v)_.position.x=(-2.29+y)/2,_.scale.x=Math.abs(y+2.29),x.position.set(y,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=y,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function Fd(r="classic"){let e=new Xe;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new Nt({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new Nt({color:"#161d23",roughness:.83,metalness:.15}),a=new Nt({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,p,v=e){let m=new ct(c,l);return m.name=h,m.position.set(u,d,p),m.castShadow=m.receiveShadow=!0,v.add(m),m}o(new tt(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new $e(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new $e(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new w(.72,1.09,l),p=new w(1.1,1.31,l),v=p.clone().sub(d),m=d.clone().add(p).multiplyScalar(.5);o(new tt(.055,v.length(),.035),i,c+"-lever",...m.toArray()).quaternion.setFromUnitVectors(new w(0,1,0),v.normalize());let g=c==="brake"?.24:.32,y=new Ht,_=h/2,x=g/2,T=.025;if(y.moveTo(-_+T,-x),y.lineTo(_-T,-x),y.quadraticCurveTo(_,-x,_,-x+T),y.lineTo(_,x-T),y.quadraticCurveTo(_,x,_-T,x),y.lineTo(-_+T,x),y.quadraticCurveTo(-_,x,-_,x-T),y.lineTo(-_,-x+T),y.quadraticCurveTo(-_,-x,-_+T,-x),n)for(let O of[-.065,0,.065])for(let N of c==="brake"?[-.055,.055]:[0]){let F=new Bn;F.absarc(N,O,.014,0,Math.PI*2,!0),y.holes.push(F)}let b=o(new zt(y,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let O of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new tt(h*.76,.009,.007),n?a:i,c+"-grip",0,O,-.007,b);let I=Array.from({length:65},(O,N)=>{let F=N/64,P=F*Math.PI*12;return new w(.77+F*.23,1.095+F*.15+Math.sin(P)*.018,l+.045+Math.cos(P)*.018)});if(o(new Ct(new wt(I),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let O=o(new $e(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);O.rotation.z=-1.05}}return e}function ah(r){let e=new Xe;e.name="sport-seat-"+r;let t=(P,L=.8,q=0)=>new vn({color:P,roughness:L,metalness:q,clearcoat:q?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),p=document.createElement("canvas");p.width=p.height=64;let v=p.getContext("2d");v.fillStyle="#30343b",v.fillRect(0,0,64,64);for(let P=0;P<64;P+=8)for(let L=0;L<64;L+=8)v.fillStyle=(L+P)%16?"#121820":"#626973",v.fillRect(L,P,7,3),v.fillStyle="#252b33",v.fillRect(L,P+4,3,4);let m=new Vt(p);m.wrapS=m.wrapT=An,m.repeat.set(3,5),m.colorSpace=bt,c.map=m,c.bumpMap=m,c.bumpScale=.004;let f=(P,L,q=0,W=0,$=0,ae=e)=>{let Z=new ct(P,L);return Z.position.set(q,W,$),Z.castShadow=Z.receiveShadow=!0,ae.add(Z),Z},g=(P,L,q,W,$,ae,Z,oe,Ue=e)=>{let Fe=new Ht,Te=-P/2,ze=-L/2;return W=Math.min(W,P/2,L/2,q/2),Fe.moveTo(Te+W,ze),Fe.lineTo(Te+P-W,ze),Fe.quadraticCurveTo(Te+P,ze,Te+P,ze+W),Fe.lineTo(Te+P,ze+L-W),Fe.quadraticCurveTo(Te+P,ze+L,Te+P-W,ze+L),Fe.lineTo(Te+W,ze+L),Fe.quadraticCurveTo(Te,ze+L,Te,ze+L-W),Fe.lineTo(Te,ze+W),Fe.quadraticCurveTo(Te,ze,Te+W,ze),f(new zt(Fe,{depth:q-2*W,bevelEnabled:!0,bevelSize:W,bevelThickness:W,bevelSegments:4,curveSegments:12}),$,ae,Z,oe-q/2+W,Ue)},y=(P,L,q,W=e)=>f(new Ct(new wt(P.map($=>new w(...$))),32,L,6,!1),q,0,0,0,W),_=new Xe;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let x=new Ht;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let P of[-.135,.135]){let L=new Bn;L.moveTo(P-.075,1.24),L.lineTo(P+.075,1.24),L.lineTo(P+.075,1.34),L.lineTo(P-.075,1.34),L.closePath(),x.holes.push(L)}f(new zt(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,_),f(new zt(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,_),g(.46,.5,.12,.035,o,0,.85,.065,_),g(.45,.31,.17,.04,o,0,.4,.1,_);for(let P of[-1,1]){let L=g(.17,.42,.19,.055,a,P*.34,.98,.1,_);L.rotation.z=P*.28,L.rotation.y=-P*.25;let q=g(.13,.55,.23,.045,a,P*.3,.49,.14,_);q.rotation.z=-P*.12,y([[P*.27,.18,.28],[P*.34,.52,.28],[P*.4,.93,.24],[P*.3,1.17,.2]],.005,l,_);let W=P*.135;for(let $ of[1.235,1.345])g(.16,.014,.022,.004,h,W,$,.015,_);for(let $ of[W-.08,W+.08])g(.014,.12,.022,.004,h,$,1.29,.015,_)}let b=g(n?.86:.77,.045,.84,.012,c,0,.435,.34);b.name="seat-base";let I=g(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);I.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let P of[.2,.33,.46,.59])y([[-.23,.625,P],[0,.635,P+.015],[.23,.625,P]],.003,l);if(n){for(let P of[-1,1])g(.14,.13,.64,.04,a,P*.45,.65,.32),g(.045,.23,.1,.01,h,P*.45,.48,.16);for(let P=.45;P<1.1;P+=.15)for(let L of[-.1,.1])y([[L-.1,P,.18],[L,P+.07,.18],[L+.1,P,.18]],.003,l,_)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),y([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let P of[-1,1]){let L=g(.16,.26,.74,.055,a,P*(n?.365:.325),.54,.39);L.rotation.z=-P*.12,y([[P*.26,.63,.03],[P*.26,.66,.35],[P*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,P*.28,-.015,.34);for(let q of[.02,.65])g(.13,.09,.12,.015,c,P*.28,-.055,q),f(new $e(.022,.022,.015,12),h,P*.28,-.002,q)}for(let P=.3;P<1.08;P+=.11)y([[-.19,P,.16],[0,P-.015,.17],[.19,P,.16]],.0025,l,_);for(let P of[-1,1]){let L=[[P*.135,1.5,-.13],[P*.135,1.15,-.03],[P*.13,.78,.08],[P*.1,.66,.4]],q=[],W=[];L.forEach(([oe,Ue,Fe],Te)=>{q.push(oe-.033,Ue,Fe,oe+.033,Ue,Fe),Te&&W.push(Te*2-2,Te*2-1,Te*2,Te*2-1,Te*2+1,Te*2)});let $=new ut;$.setAttribute("position",new Re(q,3)),$.setIndex(W),$.computeVertexNormals();let ae=u.clone();ae.side=Wt,f($,ae);let Z=g(.27,.055,.025,.008,u,P*.18,.64,.45);Z.rotation.z=-P*.2}let O=f(new $e(.065,.065,.035,24),h,0,.66,.48);O.rotation.x=Math.PI/2;let N=f(new $e(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);N.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let F=new Mn().setFromObject(b).min.y;for(let P of e.children)P.position.y-=F;return e.userData.floorContact=0,e}var sh;function Od(r,e){if(!r.isConnected||e==="none")return;if(!sh){let a=new ci({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=bt,a.toneMapping=ai,a.toneMappingExposure=1.25;let o=new Nn;o.add(new Qn("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let p=new qn("#ffffff",d);p.position.set(l,h,u),o.add(p)}let c=new an(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),sh={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=sh;s[e]||(s[e]=ah(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Ld;window.pokerPaintBrakePreview=Dd;window.pokerPaintSeatPreview=Od;var zd=(r,e,t)=>Math.max(e,Math.min(t,r));function rm(r,e,t={}){let n=window.PokerGarage,i=new Xe;r.add(i),i.scale.set(1.24,.86,.95);let s=(M,E,G)=>new vn({color:M,metalness:E,roughness:G,clearcoat:E>.3?.65:.12,clearcoatRoughness:.12}),a=s(n.item("paint",e.paint).color,.55,.24),o=s(n.item("paint",e.paint).color,0,.93),c=s("#e5aa28",1,.135),l=s("#171a1e",.04,.76),h=s(n.wheelPaintColor(e),.86,.25),u=s("#0d1417",.35,.3),d=s("#060809",.12,.36),p=s(n.item("light",e.light).color,.45,.2),v=s("#123e47",.86,.22);p.emissive.copy(p.color),p.emissiveIntensity=2;function m(M,E,G=0,Q=0,B=0,he=i){if(t.prepareGeometry){let se=t.prepareGeometry(M);se!==M&&(M.dispose(),M=se)}let J=new ct(M,E);return J.position.set(G,Q,B),J.castShadow=!0,J.receiveShadow=!0,he.add(J),J}let f=(M,E,G,Q,B,he,J)=>m(new tt(M,E,G),Q,B,he,J);function g(M,E,G,Q,B,he,J="y"){let se=m(new $e(M,M,E,64),G,Q,B,he);return J==="z"&&(se.rotation.x=Math.PI/2),J==="x"&&(se.rotation.z=Math.PI/2),se}function y(M,E,G,Q,B,he,J="z"){let se=m(new Ft(M,E,12,80),G,Q,B,he);return J==="y"&&(se.rotation.x=Math.PI/2),J==="x"&&(se.rotation.y=Math.PI/2),se}function _(M,E,G,Q=Ht){let B=new Q,he=-M/2,J=-E/2;return G=Math.min(G,E/2-.001),B.moveTo(he+G,J),B.lineTo(he+M-G,J),B.quadraticCurveTo(he+M,J,he+M,J+G),B.lineTo(he+M,J+E-G),B.quadraticCurveTo(he+M,J+E,he+M-G,J+E),B.lineTo(he+G,J+E),B.quadraticCurveTo(he,J+E,he,J+E-G),B.lineTo(he,J+G),B.quadraticCurveTo(he,J,he+G,J),B}function x(M,E,G,Q,B,he,J=null,se=.025){let me=_(M,E,Q);if(J){let vt=_(J[0],J[1],J[2],Bn),it=new Bn(vt.getPoints(40).map(K=>new Me(K.x+(J[3]||0),K.y)));me.holes.push(it)}let st=m(new zt(me,{depth:G,bevelEnabled:se>0,bevelSize:se,bevelThickness:se,bevelSegments:4,curveSegments:40}),B,0,he,0);return st.rotation.x=-Math.PI/2,st}let T=[],b=i.children.length,I=[3.02,1.51,.65,-.28],O=_(4.96,2.44,1.15).getSpacedPoints(128),N=[],F=[],P=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,E]of P)for(let G=0;G<128;G++){let Q=O[G];N.push(Q.x*E,M,-Q.y*E)}for(let M=0;M<3;M++)for(let E=0;E<128;E++){let G=M*128+E,Q=M*128+(E+1)%128;F.push(G,Q,G+128,Q,Q+128,G+128)}let L=new ut;L.setAttribute("position",new Re(N,3)),L.setIndex(F),L.computeVertexNormals(),a.side=Wt,m(L,a);let q=x(5.03,2.51,.065,1.19,c,.58,null,.035);x(5.1,2.58,.09,1.22,c,1.25,I,.035);let W=new wt(_(4.94,2.42,1.15).getPoints(40).map(M=>new w(M.x,1.44,-M.y)),!0,"centripetal");m(new Ct(W,240,.125,16,!0),d);for(let M of[-1,1]){let E=Array.from({length:21},(G,Q)=>{let B=.26+Q*.25/20;return new w(1.32+1.15*Math.cos(B),1.44,M*(.06+1.15*Math.sin(B)))});m(new Ct(new wt(E),32,.132,20,!1),c)}x(4.65,2.14,.035,1.03,c,1.39,I,.015),x(4.52,2.01,.025,.97,o,1.43,I,.01),T.push(...i.children.slice(b));let $=x(2.98,1.47,.025,.63,o,.94);$.position.x=-.28;let ae=new vn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Wt,polygonOffset:!0,polygonOffsetFactor:-1}),Z=new Vi(_(2.9,1.4,.6)),oe=Z.attributes.position,Ue=Z.attributes.uv;for(let M=0;M<oe.count;M++)Ue.setXY(M,(oe.getX(M)+1.45)/2.9,(oe.getY(M)+.7)/1.4);let Fe=m(Z,ae,-.28,1.005,0);Fe.rotation.x=-Math.PI/2,Fe.castShadow=!1;let Te=ae.clone(),ze=[];for(let M of[-1,1]){let E=m(new Yt(3.05,.3),Te,0,1.04,M*1.329);M<0&&(E.rotation.y=Math.PI),E.castShadow=!1,ze.push(E)}function Ce(M){let E=M.vinyl||"none";Fe.visible=E!=="none",ze.forEach(Q=>Q.visible=E!=="none");let G=E+":"+(M.vinylText||"");if(ae.userData.id!==G){ae.map?.dispose(),Te.map?.dispose(),ae.map=new Vt(n.vinylCanvas(E,!1,M.vinylText)),Te.map=new Vt(n.vinylCanvas(E,!0,M.vinylText));for(let Q of[ae,Te]){Q.map.colorSpace=bt,Q.map.anisotropy=16;let B=Q.map;B.image.addEventListener("vinyl-ready",()=>{B.needsUpdate=!0},{once:!0}),Q.needsUpdate=!0,Q.userData.id=G}}}let ne=x(3.13,1.62,.018,.7,c,1.46,[3.02,1.51,.65,0],.006);ne.position.x=-.28;let _e=x(3.08,1.57,.46,.68,a,.96,[3.02,1.51,.65,0],.005);_e.position.x=-.28;for(let M of[-1,-.35,.35])for(let E of[-.75,.75])f(.011,.4,.009,u,M,1.2,E);function H(M,E){let G=document.createElement("canvas");G.width=G.height=256;let Q=G.getContext("2d");Q.fillStyle=M,Q.fillRect(0,0,256,256);let B=17;for(let J=0;J<18e3;J++)B=B*1664525+1013904223>>>0,Q.fillStyle="rgba(0,0,0,"+E+")",Q.fillRect(B%256,(B>>>8)%256,1,1);let he=new Vt(G);return he.colorSpace=bt,he.wrapS=he.wrapT=An,he}o.map=H("#e8e8e8",.035),o.bumpMap=H("#888888",.5),o.bumpScale=.0015,o.clearcoat=0,l.bumpMap=H("#888888",.12),l.bumpScale=.003,d.bumpMap=H("#888888",.3),d.bumpScale=.001;function Le(M,E,G,Q,B,he=!1,J=i){let se=new Ht;se.moveTo(0,.5),se.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),se.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),se.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),se.bezierCurveTo(.48,.12,.12,.28,0,.5),se.moveTo(-.12,-.3),se.lineTo(0,-.06),se.lineTo(.12,-.3),se.closePath();let me=m(new zt(se,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),E,G,Q,B,J);return me.scale.setScalar(M),he&&(me.rotation.y=Math.PI),me}let A=[],R=[],j=[],k=null;for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=E*1.36,Q=E*1.57,B=new Xe;B.position.set(M,.81,G),i.add(B),B.userData.groundWheel=!0;let he=i.children.length,J=m(new ki([new Me(.56,-.19),new Me(.61,-.245),new Me(.67,-.25),new Me(.76,-.19),new Me(.8,-.1),new Me(.8,.1),new Me(.76,.19),new Me(.67,.25),new Me(.61,.245),new Me(.56,.19)],80),l,M,.81,G);J.rotation.x=Math.PI/2;for(let K=-2;K<=2;K++)y(.798-Math.abs(K)*.012,.0035,u,M,.81,G+K*.071);for(let K=0;K<28;K++){let ye=K*Math.PI/14,Ge=Array.from({length:17},(Ke,et)=>{let Lt=et/16,Xt=-.205+Lt*.41,at=.799-.044*Math.pow(Math.abs(Xt)/.205,3),Ze=ye+.13*Math.sin(Lt*Math.PI);return new w(M+Math.sin(Ze)*at,.81+Math.cos(Ze)*at,G+Xt)});m(new Ct(new wt(Ge),20,.0045,5,!1),u)}for(let K of[-1,1])for(let ye of[.625,.654,.681])y(ye,.0035,u,M,.81,G+K*.244);let se=i.children.slice(he);y(.548,.023,h,M,.81,Q+E*.035),y(.505,.016,h,M,.81,Q+E*.043),g(.14,.045,u,M,.81,Q+E*.045,"z"),y(.14,.012,h,M,.81,Q+E*.069);let me=s("#39434a",.78,.28);me.side=Wt;let st=m(new $e(.544,.544,.44,64,1,!0),me,M,.81,G);st.rotation.x=Math.PI/2,y(.548,.025,h,M,.81,G-E*.245),y(.505,.013,h,M,.81,G-E*.253),g(.16,.1,me,M,.81,G-E*.22,"z"),y(.16,.012,h,M,.81,G-E*.275),g(.075,.13,u,M,.81,G-E*.28,"z");for(let K=0;K<5;K++){let ye=K*Math.PI*2/5;g(.018,.024,h,M+Math.sin(ye)*.115,.81+Math.cos(ye)*.115,G-E*.282,"z")}let vt=Le(.2,h,M,.8,Q+E*.075,E<0);R.push(vt);for(let K of n.wheelDesign()){let ye=new wt(K.map(([Ge,Ke])=>new w(M+Ge,.81+Ke,Q+E*(.04+.025*(1-Math.hypot(Ge,Ke)/.51)))));A.push(m(new Ct(ye,20,.007,6,!1),h))}for(let K=0;K<20;K++){let ye=K*Math.PI/10;g(.006,.009,h,M+Math.sin(ye)*.526,.81+Math.cos(ye)*.526,Q+E*.06,"z")}i.updateMatrixWorld(!0);for(let K of i.children.slice(he))B.attach(K);B.scale.set(.88/1.24,.88/.86,1/.95),B.position.y=.715/.86;let it={standard:se};for(let K of["soft","medium","hard","semi","wet"]){let ye=Ud(K);ye.visible=!1,B.add(ye),it[K]=[ye]}j.push({wheelGroup:B,x:M,out:Q,sign:E,tyres:it})}let S=[];for(let M of[-1,1])S.push(f(1.35,.43,.04,c,.05,.94,M*1.3));let U=[];for(let M of[-1,1])U.push(g(.275,.27,u,2.16,.945,M*.97,"z"),y(.278,.035,c,2.16,.945,M*1.11));for(let M of[-1.72,1.72]){let E=g(.07,2.8,u,M,.7,0,"z");E.userData.groundWheel=!0}f(3.6,.08,.8,u,0,.57,0);let X=[];function V(M,E,G){let Q=document.createElement("canvas");Q.width=M,Q.height=E,G(Q.getContext("2d"),M,E);let B=new Vt(Q);return B.colorSpace=bt,B.anisotropy=8,X.push(B),B}let pe=V(768,256,(M,E,G)=>{M.fillStyle="#101b18",M.fillRect(0,0,E,G),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,E-20,G-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",E/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",E/2,209)}),te=[];for(let M of[-1,1]){let E=new vn({map:pe,metalness:.55,roughness:.2,clearcoat:1});te.push(E);let G=m(new Yt(1.28,.4),E,.05,.94,M*1.326);E.userData.plane=G,M<0&&(G.rotation.y=Math.PI)}let ie=[];for(let M of[-1,1])for(let E=0;E<3;E++){let G=new Xe;G.position.set((E-1)*.82+.05,1,M*1.39),G.userData.side=M,G.scale.setScalar(1.17),M<0&&(G.rotation.y=Math.PI),i.add(G);let Q=m(new tt(.1,.1,.025),c,0,0,0,G),B=new Nt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),he=m(new Yt(.65,.65,32,8),B,0,0,.047,G);he.castShadow=!1,he.receiveShadow=!1,ie.push({group:G,mat:B,back:Q,n:E})}for(let M of[-1,1])for(let E of[-.54,.64])for(let G of[.78,1.1]){let Q=g(.014,.018,c,E,G,M*1.35,"z")}let Ee=i.children.length;for(let M of[-1.7,-.35,1.48])for(let E of[-1.21,1.21]){let G=g(.128,.13,c,M,1.44,E,"x")}for(let M of[-1.7,-.35,1.48])for(let E of[-1,1])y(.125,.004,u,M+.08,1.44,E*1.21,"x"),y(.125,.004,u,M-.08,1.44,E*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let E of[-.96,.96])g(.135,.08,c,M,1.49,E),g(.108,.082,u,M,1.498,E),y(.125,.015,c,M,1.54,E,"y"),y(.111,.006,c,M,1.535,E,"y");let He=[],Pe=[],Je=["#ab2338","#1b684b","#2455a5"].map(M=>s(M,.08,.55)),ot=s("#eee9d6",.04,.6),ft=i.children.length;for(let[M,E,G,Q]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let B=0;B<Q;B++){g(.104,.033,Je[G],M,1.49+B*.037,E);for(let he=0;he<6;he++){let J=he*Math.PI/3,se=f(.024,.021,.012,ot.clone(),M+Math.cos(J)*.103,1.49+B*.037,E+Math.sin(J)*.103);se.rotation.y=Math.PI/2-J,se.castShadow=!1,se.receiveShadow=!1,se.userData.edgeIndex=he,He.push(se)}if(B===Q-1){let he=new Nt({transparent:!0,alphaTest:.1,roughness:.65}),J=m(new Yt(.208,.208),he,M,1.511+B*.037,E);J.rotation.x=-Math.PI/2,J.castShadow=!1,J.receiveShadow=!1,Pe.push({mat:he,n:G})}}let Rt=i.children.slice(ft);T.push(...i.children.slice(Ee));let St=new Xe;St.position.set(.47,1.78,0),St.scale.set(.82/1.24,.82/.86,.82/.95),i.add(St);let yt=new Xe;St.add(yt);let z=new w((.47-.96)*1.24,(1.78-1.42)*.86,0).normalize(),ee=new w(0,0,1),fe=new w().crossVectors(z,ee).normalize();yt.quaternion.setFromRotationMatrix(new ht().makeBasis(ee,fe,z));let Se=d.clone();m(new Ft(.53,.06,16,80),Se,0,0,0,yt),m(new Ft(.473,.014,10,64),c,0,0,-.02,yt);for(let M of[Math.PI]){let E=m(new tt(.09,.39,.045),c,Math.sin(M)*.26,Math.cos(M)*.26,0,yt);E.rotation.z=-M}for(let M of[-1,1]){let E=m(new tt(.35,.075,.06),c,M*.265,0,0,yt);m(new tt(.32,.035,.064),u,M*.265,0,.006,yt)}let Y=m(new $e(.195,.195,.075,64),c,0,0,.035,yt);Y.rotation.x=Math.PI/2;let ce=m(new jn(.177,64),new Nt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,yt);ce.receiveShadow=!1,Le(.38,c,0,-.025,.105,!1,yt);let de={classic:new Xe,sport:new Xe,formula:new Xe};for(let M of yt.children.slice())de.classic.add(M);Object.values(de).forEach(M=>yt.add(M));function be(M,E,G,Q){let B=new wt(E.map(([he,J])=>new w(he,J,0)),!0);m(new Ct(B,72,G,12,!0),Q,0,0,0,M)}be(de.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Se);for(let M of[-1,1])m(new tt(.35,.065,.045),h,M*.27,0,0,de.sport),m(new tt(.065,.3,.045),h,M*.12,-.22,0,de.sport);m(new Ft(.5,.018,8,64,.22),p,0,0,.005,de.sport),be(de.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Se),m(new tt(.6,.23,.065),u,0,0,0,de.formula);for(let M of[-1,1])m(new Gt(.035,12,8),p,M*.25,.055,.06,de.formula),m(new tt(.08,.29,.025),h,M*.37,0,-.07,de.formula);for(let M of["sport","formula"]){let E=m(new $e(.15,.15,.07,48),h,0,0,.035,de[M]);E.rotation.x=Math.PI/2,m(new jn(.13,48),u,0,0,.078,de[M]),Le(.25,h,0,-.018,.09,!1,de[M])}for(let[M,E]of Object.entries(n.steeringDesigns)){let G=new Xe;yt.add(G),de[M]=G;let Q=s(M==="woodHeritage"?E.color:"#14191d",M==="woodHeritage"?.35:.04,M==="woodHeritage"?.24:.82),B=s(M==="drift"?"#c5a14f":M==="rallySuede"?"#292e33":"#b8c2c9",.85,.25);if(M==="trackYoke"){Qe([[-.43,.39,0],[-.51,.12,0],[-.47,-.26,0],[0,-.39,0],[.47,-.26,0],[.51,.12,0],[.43,.39,0]],.065,Q,G);for(let se of[-1,1])m(new Gt(1,24,16),Q,se*.46,.15,.01,G).scale.set(.085,.28,.09),m(new tt(.25,.1,.055),B,se*.23,-.07,.015,G);let J=m(new tt(.45,.28,.085),s("#20282e",.45,.35),0,-.02,.03,G);m(new tt(.2,.085,.012),u,0,.035,.08,G);for(let se of[-1,1])for(let me of[-.08,.05])m(new Gt(.023,12,8),B,se*.15,me,.085,G);continue}E.shape==="round"?m(new Ft(.53,.065,16,80),Q,0,0,0,G):E.shape==="flat"?be(G,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Q):Qe([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Q,G);for(let J=0;J<E.spokes;J++){let se=J*Math.PI*2/E.spokes,me=m(new tt(.39,.065,.05),B,Math.cos(se)*.25,Math.sin(se)*.25,.015,G);me.rotation.z=se}let he=m(new $e(.15,.15,.075,40),u,0,0,.05,G);he.rotation.x=Math.PI/2,Le(.23,h,0,-.015,.095,!1,G),(M==="rallySuede"||M==="carbonD")&&m(new tt(.045,.09,.025),s("#ed5555",.1,.6),0,.51,.06,G)}let xe=s("#b9ab8a",.15,.8),C=s("#171c20",.02,.85);for(let[M,E]of Object.entries(de)){if(M==="trackYoke")continue;let G=M==="classic"?.53:M==="sport"?.51:.47;for(let B of[-1,1]){if(M!=="formula"){let he=m(new Ft(G,.072,12,30,.64),C,0,0,.003,E);he.rotation.z=B<0?Math.PI-.32:-.32}for(let he=0;he<9;he++){let J=(B<0?Math.PI:0)-.28+he*.07;m(new Gt(.007,6,4),xe,Math.cos(J)*(G-.045),Math.sin(J)*(G-.045),.063,E)}}let Q=m(new tt(.065,.1,.035),M==="classic"?c:p,0,M==="formula"?.16:.51,.045,E);for(let B=0;B<6;B++){let he=B*Math.PI/3,J=m(new $e(.012,.012,.012,6),h,Math.cos(he)*.13,Math.sin(he)*.13,.099,E);J.rotation.x=Math.PI/2}}let le=new w(.96,1.32,0),we=new w(.47,1.78,0),ve=we.clone().sub(le),Oe=le.clone().add(we).multiplyScalar(.5),nt=f(.12,ve.length(),.095,c,...Oe.toArray());nt.quaternion.setFromUnitVectors(new w(0,1,0),ve.normalize());let Be=Ne(.26,.08,.66,.035,u,.96,1.3,0);for(let M of[-1,1])Ne(.16,.16,.09,.02,u,.96,1.22,M*.26),g(.014,.012,c,.96,1.347,M*.24);Be.name="steering-chassis-mount",f(.075,nt.geometry.parameters.height-.04,.1,u,...Oe.toArray()).quaternion.copy(nt.quaternion);let rt=-1.84,je=1.99,mt=.74,gt=new Xe;gt.name="garage-turbine-primary",gt.position.set(rt,je,0),i.add(gt);let pt=i.children.length;g(mt,.51,c,rt,je,0,"z"),g(.67,.54,u,rt,je,0,"z");for(let M of[-1,1]){let E=M*.29;y(.72,.055,u,rt,je,E),y(.75,.022,c,rt,je,E+M*.03),y(.665,.012,p,rt,je,E+M*.025);for(let G=0;G<14;G++){let Q=G*Math.PI/7,B=[],he=[];for(let me=0;me<=16;me++){let st=me/16,vt=.22+st*.44,it=Q+.55*st;for(let K of[-.15,.15])B.push(rt+Math.sin(it+K)*vt,je+Math.cos(it+K)*vt,E+M*(.018+Math.sin(st*Math.PI)*.12))}for(let me=0;me<16;me++){let st=me*2;he.push(st,st+1,st+2,st+1,st+3,st+2)}let J=new ut;J.setAttribute("position",new Re(B,3)),J.setIndex(he),J.computeVertexNormals(),v.side=Wt,m(J,v);let se=new wt(Array.from({length:17},(me,st)=>{let vt=st/16,it=.22+vt*.44,K=Q+.55*vt-.15;return new w(rt+Math.sin(K)*it,je+Math.cos(K)*it,E+M*(.025+Math.sin(vt*Math.PI)*.12))}));m(new Ct(se,20,.009,6,!1),p)}g(.215,.07,c,rt,je,E+M*.085,"z"),g(.18,.085,u,rt,je,E+M*.11,"z")}for(let M=0;M<12;M++){let E=M*Math.PI/6,G=f(.045,.15,.2,u,rt+Math.cos(E)*.735,je+Math.sin(E)*.735,0);G.rotation.z=E}i.updateMatrixWorld(!0);for(let M of i.children.slice(pt))gt.attach(M);gt.rotation.set(0,Math.PI/2,0),gt.scale.set(.96/1.24,.96/.86,.96/.95);let _t=gt.clone(!0);_t.name="garage-turbine-secondary",i.add(_t);let Ot=new Xe;gt.add(Ot);let kt=s("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])m(new Ft(.765,.028,10,80),kt,0,0,M,Ot);for(let M=0;M<8;M++){let E=M*Math.PI/4,G=m(new $e(.025,.025,.025,6),kt,Math.sin(E)*.73,Math.cos(E)*.73,.35,Ot);G.rotation.x=Math.PI/2}let Kt={classic:new Xe,dual:new Xe,titanium:new Xe},ln=s("#a9b7c4",.92,.23),Rn=s("#668bb5",.88,.25);Object.values(Kt).forEach(M=>i.add(M));for(let[M,E]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let G of E){let Q=M==="titanium"?Rn:ln,B=m(new $e(.105,.105,.5,32),Q,-2.42,.76,G,Kt[M]);B.rotation.z=Math.PI/2;let he=m(new $e(.079,.079,.012,32),u,-2.678,.76,G,Kt[M]);he.rotation.z=Math.PI/2;let J=m(new Ft(.094,.012,8,32),Q,-2.69,.76,G,Kt[M]);J.rotation.y=Math.PI/2}for(let[M,E]of Object.entries(Kt)){let G=M==="classic"?[0]:[-.67,.67];for(let B of G){let he=m(new $e(.18,.18,.52,40),ln,-2.19,.76,B,E);he.rotation.z=Math.PI/2;for(let J of[-2.36,-2.04]){let se=m(new Ft(.184,.016,8,40),u,J,.76,B,E);se.rotation.y=Math.PI/2,m(new tt(.07,.19,.07),ln,J,.94,B,E)}}let Q=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let B of Q){let he=m(new $e(.077,.077,.11,32,1,!0),s("#151c23",.35,.65),-2.63,.76,B,E);he.rotation.z=Math.PI/2;let J=m(new Ft(.107,.018,10,40),M==="titanium"?Rn:ln,-2.57,.76,B,E);if(J.rotation.y=Math.PI/2,M==="titanium")for(let[se,me]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let st=m(new Ft(.106,.008,6,40),s(me,.85,.3),se,.76,B,E);st.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let E=new wt([new w(-2.16,1.46,M*.65),new w(-1.94,1.66,M*.69),new w(-1.3,1.59,M*.64),new w(-.98,1.47,M*.7)]);m(new Ct(E,32,.022,8,!1),c),f(.34,.06,.14,c,-1.84,1.48,M*.4)}for(let M of[-1,1]){let E=new wt([new w(-2.45,1.1,M*.7),new w(-2.43,1.36,M*.72),new w(-2.19,1.55,M*.7),new w(-1.9,1.55,M*.68)]);m(new Ct(E,40,.075,14,!1),u),m(new Ct(E,40,.019,10,!1),c);for(let G of[-2.2,-1.96]){let Q=new wt([new w(G,1.43,M*.48),new w(G,1.63,M*.6),new w(G+.24,1.57,M*.82)]);m(new Ct(Q,24,.017,8,!1),c)}}let or=i.children.length,yn=[],yi=[],lr=[];for(let M=0;M<=48;M++){let E=-.92+M*1.84/48;for(let G of[.64,1.23])yi.push(2.57-.28*(Math.sin(E)*1.25/1.1)**2,G,Math.sin(E)*1.25)}for(let M=0;M<48;M++){let E=M*2;lr.push(E,E+2,E+1,E+1,E+2,E+3)}let Wi=new ut;Wi.setAttribute("position",new Re(yi,3)),Wi.setIndex(lr),Wi.computeVertexNormals();let D=s("#00453f",.72,.14);D.clearcoat=1,D.side=Wt,m(Wi,D);for(let M of[.635,1.225]){let E=Array.from({length:65},(G,Q)=>{let B=-1.04+Q*2.08/64;return new w(2.57-.28*(B/1.1)**2,M,B)});m(new Ct(new wt(E),80,.034,12,!1),c)}for(let M of[-1,1]){let E=M*1,G=2.57-.28*(E/1.1)**2,Q=new wt([new w(G-.04,.635,E),new w(G+.05,.78,E),new w(G+.065,1.12,E),new w(G-.04,1.25,E)]);m(new Ct(Q,32,.065,12,!1),c);for(let B of[.91,1.065]){let he=Array.from({length:16},(J,se)=>{let me=M*(.51+se*.41/15);return new w(2.57-.28*(me/1.1)**2+.018,B,me)});yn.push(m(new Ct(new wt(he),24,.017,8,!1),p))}}let re=i.children.length,ge=[];for(let M=0;M<2;M++){let E=new Xe;E.name="hood-playing-card-"+M,E.position.set(1.66+M*.08,1.495+M*.014,M?.23:-.23),E.rotation.set(-Math.PI/2,0,M?-.18:.18),i.add(E);let G=_(.54,.76,.035),Q=new zt(G,{depth:.004,bevelEnabled:!1,curveSegments:10});Q.translate(0,0,-.004);let B=m(Q,new Nt({color:"#e1d8c4",roughness:.94,metalness:0}),0,0,0,E);B.castShadow=!1,B.receiveShadow=!1;let he=new Vt(n.cardCanvas(e.cards,M));he.colorSpace=bt,he.anisotropy=16;let J=new Wn({map:he,transparent:!0,alphaTest:.1,toneMapped:!1,side:Wt,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});J.userData.style=e.cards,ge.push(J);let se=m(new Yt(.54,.76),J,0,0,.0015,E);se.name="printed-card-face-"+M,se.castShadow=!1,se.receiveShadow=!1}let Ae=i.children.slice(re);T.push(...i.children.slice(or));let ue=new Nt({map:new Vt(n.plateCanvas(e)),roughness:.6}),De=[];for(let M of[-1,1]){let E=m(new Yt(.79,.463),ue,M*2.605,1.01,0);E.rotation.y=M*Math.PI/2,De.push({plate:E,sign:M}),M>0&&T.push(E)}let Ye=[],Ie={},ke=s("#7d8c98",.82,.28),qe=s("#202a32",.45,.38),Mt=s("#a7c6d5",.98,.055),Ve=s("#182029",.35,.48);Ve.bumpMap=H("#888888",.2),Ve.bumpScale=.001;function Ne(M,E,G,Q,B,he,J,se,me){let st=new zt(_(M,E,Q),{depth:G,bevelEnabled:!0,bevelSize:Math.min(.012,G*.2),bevelThickness:Math.min(.012,G*.2),bevelSegments:3,curveSegments:12});return st.translate(0,0,-G/2),m(st,B,he,J,se,me)}function Qe(M,E,G,Q){return m(new Ct(new wt(M.map(B=>new w(...B))),40,E,12,!1),G,0,0,0,Q)}function rn(M,E,G,Q){let B=m(new $e(.014,.014,.014,6),ke,M,E,G,Q);B.rotation.x=Math.PI/2}function dn(M,E,G,Q,B,he){let J=new Ht;J.moveTo(-Q*.5,0),J.bezierCurveTo(-Q*.52,.055,-Q*.12,.07,Q*.5,.008),J.quadraticCurveTo(Q*.05,-.025,-Q*.5,0);let se=new zt(J,{depth:G,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});se.translate(0,0,-G/2);let me=m(se,B,M,E,0,he);return me.rotation.z=-.08,me}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Ie[M]={};for(let E of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let G=new Xe;i.add(G),Ie[M][E]=G;let Q=["sport","aero"].includes(E)?Ve:ke;if(M==="spoiler"){i.remove(G);let B=rh(E,{paint:a,carbon:Ve,metal:ke});i.add(B),Ie.spoiler[E]=B;continue}if(M==="mirrors")for(let B of[-1,1]){let he=new Xe;G.add(he),Ye.push({group:he,sign:B});let J=E==="aero",se=J?1.68:E==="round"?1.96:1.86,me=B*(J?1.47:1.53),st=.77;Ne(.18,.08,.15,.035,qe,.64,1.46,B*1.19,he),Qe([[.64,1.47,B*1.19],[.62,1.62,B*1.32],[st,se-.07,me]],J?.023:.029,Q,he);let vt=m(new Gt(.046,16,12),qe,st,se-.065,me,he);if(E==="round"){m(new Gt(1,32,20),ke,st,se,me,he).scale.set(.065,.15,.15);let K=m(new jn(.13,48),Mt,st-.056,se,me,he);K.rotation.y=-Math.PI/2,K.castShadow=!1;let ye=m(new Ft(.136,.009,8,48),ke,st-.06,se,me,he);ye.rotation.y=Math.PI/2}else{let it=J?.52:E==="sport"?.43:.38,K=J?.11:E==="sport"?.26:.22,ye=Ne(it,K,.095,E==="sport"?.018:J?.045:.075,E==="club"?ke:Ve,st,se,me,he);ye.rotation.y=Math.PI/2;let Ge=m(new Vi(_(it-.045,K-.035,.05)),Mt,st-.061,se,me,he);Ge.rotation.y=-Math.PI/2,Ge.castShadow=!1,Ge.receiveShadow=!1;let Ke=_(it-.028,K-.018,.055).getPoints(24).map(et=>[st-.058,se+et.y,me+et.x]);Ke.push(Ke[0]),Qe(Ke,.006,ke,he)}}else if(M==="sideSkirts")for(let B of[-1,1]){let he=Ne(E==="aero"?2.75:2.3,E==="aero"?.27:E==="sport"?.19:.12,E==="rally"?.48:E==="aero"?.32:E==="sport"?.23:.13,.05,E==="club"||E==="rally"?Q:Ve,0,.59,B*1.24,G);if(E==="rally")for(let J of[-.84,-.42,0,.42,.84]){let se=Ne(.13,.018,.25,.018,qe,J,.67,B*1.24,G)}else Qe([[-1.08,.54,B*1.3],[0,.53,B*1.32],[1.08,.54,B*1.3]],.009,p,G);for(let J of[-.87,.87])Ne(.12,.14,.16,.025,qe,J,.65,B*1.2,G),rn(J,.61,B*1.33,G);if(E==="sport"){let J=Ne(.46,.24,.035,.02,Ve,-.96,.69,B*1.4,G);J.rotation.z=-.25}if(E==="aero")for(let J of[-.95,-.4,.25,.95]){let se=Ne(.24,.12,.025,.025,Ve,J,.57,B*1.35,G);se.rotation.z=J>0?.2:-.2}}else{let B=M==="frontBumper"?1:-1,he=[[B*2.26,.66,-.92],[B*2.58,.65,-.7],[B*2.67,.65,0],[B*2.58,.65,.7],[B*2.26,.66,.92]];E!=="aero"&&Qe(he,E==="sport"?.061:.047,Q,G);for(let J of[-.67,.67]){Qe([[B*2.31,.74,J],[B*2.5,.68,J]],.032,qe,G);let se=Ne(.16,.12,.13,.035,qe,B*2.51,.67,J,G)}if(E==="aero"){let J=Ne(.38,.045,1.94,.07,Ve,B*2.48,.5,0,G);for(let se of[-.7,-.27,.27,.7])Ne(.27,.12,.022,.025,qe,B*2.48,.55,se,G);Qe([[B*2.4,.52,-.91],[B*2.64,.52,0],[B*2.4,.52,.91]],.008,ke,G)}if(E==="club"||E==="rally"){Qe([[B*2.5,.67,-.59],[B*2.58,1.08,-.48],[B*2.61,1.14,.48],[B*2.5,.67,.59]],.04,ke,G);let J=Ne(.1,.28,E==="rally"?1.12:.79,.04,Q,B*2.6,.64,0,G);for(let se of[-.3,-.1,.1,.3]){let me=m(new jn(.035,16),u,B*2.66,.64,se,G);me.rotation.y=B*Math.PI/2}}if(E==="rally")for(let J of[-.72,.72])Qe([[B*2.53,.65,J-.14],[B*2.56,.94,J-.14],[B*2.55,1.04,J],[B*2.56,.94,J+.14],[B*2.53,.65,J+.14]],.036,ke,G);if(E==="sport")for(let J of[-.67,.67]){let se=Ne(.2,.13,.14,.045,qe,B*2.56,.66,J,G)}if(M==="rearBumper"&&E==="aero")for(let J of[-.7,-.35,0,.35,.7]){let se=Ne(.27,.15,.025,.025,Ve,-2.46,.48,J,G);se.rotation.z=.12}}}}let Zt=s("#b9e4f5",.28,.17);Zt.emissive.set("#b9e4f5"),Zt.emissiveIntensity=1.8;let Pt=s("#ffdda0",.2,.2);Pt.emissive.set("#ffe0a8"),Pt.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[E,G,Q]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.36,.22],["sport",2.24,.18]]){let B=new Xe;Ie[M][E]&&i.remove(Ie[M][E]),i.add(B),Ie[M][E]=B;let he=M==="frontBumper"?1:-1,J=M==="rearBumper",se=E==="trackGT"?.6:E==="driftWide"?.58:.49,me=.82,st=J?[[0,E==="trackGT"?1.36:1.08]]:E==="driftWide"?[[0,1.2],[-.94,.32],[.94,.32]]:E==="trackGT"?[[0,1.08],[-.91,.35],[.91,.35]]:[[0,.98],[-.79,.31],[.79,.31]],vt=E==="driftWide"?.35:E==="trackGT"?.33:.27,it=_(G,se,.1);for(let[at,Ze]of st){let Tt=_(Ze,vt,.045,Bn);it.holes.push(new Bn(Tt.getPoints(24).map(Bt=>new Me(Bt.x+at,Bt.y))))}let K=new zt(it,{depth:Q,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),ye=K.attributes.position;for(let at=0;at<ye.count;at++){let Ze=ye.getX(at),Tt=ye.getY(at),Bt=ye.getZ(at);ye.setXYZ(at,he*(2.64+Bt-.34*(Ze/(G/2))**2),me+Tt,Ze)}K.computeVertexNormals(),m(K,a,0,0,0,B);for(let[at,Ze]of st){let Tt=_(Ze+.025,vt+.025,.045).getPoints(48).map(pn=>{let nn=pn.x+at;return[he*(2.64+Q+.022-.34*(nn/(G/2))**2),me+pn.y,nn]});Tt.push(Tt[0]),Qe(Tt,.014,c,B);let Bt=[];for(let pn of[-1,1])for(let nn=-Ze;nn<Ze;nn+=.055){let hi=[];for(let $t=0;$t<=20;$t++){let xn=-vt*.43+$t*vt*.86/20,ui=nn+pn*xn;Math.abs(ui)<Ze/2-.035&&hi.push([he*(2.665-.34*((at+ui)/(G/2))**2),me+xn,at+ui])}for(let $t=1;$t<hi.length;$t++)Bt.push(...hi[$t-1],...hi[$t])}let un=new ut;un.setAttribute("position",new Re(Bt,3)),B.add(new Xs(un,new is({color:"#7d8c98"})))}let Ge=Array.from({length:41},(at,Ze)=>{let Tt=-G/2+.04+Ze*(G-.08)/40;return[he*(2.64+Q+.018-.34*(Tt/(G/2))**2),me+se/2-.02,Tt]});Qe(Ge,.018,c,B);for(let[at,Ze]of st){let Tt=[],Bt=[];for(let pn=0;pn<=24;pn++){let nn=at-Ze/2-.01+pn*(Ze+.02)/24,hi=he*(2.64-.34*(nn/(G/2))**2);for(let $t of[-vt/2-.01,vt/2+.01])Tt.push(hi,me+$t,nn)}for(let pn=0;pn<24;pn++){let nn=pn*2;Bt.push(...he>0?[nn,nn+1,nn+2,nn+1,nn+3,nn+2]:[nn,nn+2,nn+1,nn+1,nn+2,nn+3])}let un=new ut;un.setAttribute("position",new Re(Tt,3)),un.setIndex(Bt),un.computeVertexNormals(),m(un,u,0,0,0,B)}let Ke=Array.from({length:41},(at,Ze)=>{let Tt=-G/2+Ze*G/40;return[he*(2.65+Q+.045-.34*(Tt/(G/2))**2),me-se/2-.025,Tt]});Qe(Ke,E==="trackGT"?.028:.019,Ve,B);let et=new ut,Lt=[],Xt=[];for(let[at,Ze,Tt]of Ke)Lt.push(at,Ze,Tt,at-he*.17,Ze+.005,Tt);for(let at=0;at<40;at++){let Ze=at*2;Xt.push(Ze,Ze+1,Ze+2,Ze+1,Ze+3,Ze+2)}if(et.setAttribute("position",new Re(Lt,3)),et.setIndex(Xt),et.computeVertexNormals(),m(et,Ve,0,0,0,B),M==="rearBumper")for(let at=0;at<(E==="trackGT"?5:3);at++){let Ze=(at-(E==="trackGT"?2:1))*.3,Tt=Ne(.46,.19,.025,.008,Ve,-2.76,me-se/2-.035,Ze,B);Tt.rotation.z=-.12}else if(E==="trackGT"){for(let at of[-.36,.36]){let Ze=Ne(.38,.27,.035,.012,Ve,2.94,me-se/2+.045,at,B);Ze.rotation.z=-.32,Ne(.27,.027,.13,.008,Ve,3.02,me-se/2-.075,at,B)}for(let at of[-.96,.96]){let Ze=Ne(.29,.16,.025,.008,Ve,2.78,me-se/2+.01,at,B);Ze.rotation.z=.08}}if(J)for(let at of[-1,1])for(let Ze=0;Ze<(E==="sport"?2:1);Ze++){let Tt=at*(.78+Ze*.15),Bt=m(new $e(.067,.067,.16,32,1,!0),ke,-2.77,.77,Tt,B);Bt.rotation.z=Math.PI/2;let un=m(new jn(.056,24),u,-2.86,.77,Tt,B);un.rotation.y=-Math.PI/2}for(let at of[-1,1]){let Ze=at*(G/2-.055),Tt=he*(2.64+Q-.3);Qe([[Tt,me-se/2+.065,Ze],[Tt-he*.1,me,Ze+at*.035],[Tt-he*.2,me+se/2-.065,Ze-at*.015]],.043,a,B),Qe([[Tt+he*.025,me-se/2+.04,Ze-at*.025],[Tt+he*.035,me,Ze-at*.025],[Tt+he*.025,me+se/2-.04,Ze-at*.025]],.012,c,B)}}for(let M of["formula","formulaPro","formulaElite"]){let E=Bd(M,{paint:a,carbon:Ve,metal:ke,accent:c});i.add(E),Ie.frontBumper[M]=E}for(let M of["rearBumper","sideSkirts","spoiler"])for(let E of["formula","formulaPro"]){let G=new Xe;G.name=M+"-"+E,i.add(G),Ie[M][E]=G;let Q=E==="formulaPro";if(M==="rearBumper"){Ne(.48,.16,Q?2.3:2.05,.03,Ve,-2.47,.45,0,G);for(let B=-3;B<=3;B++){let he=Ne(.64,.23,.025,.01,Ve,-2.48,.44,B*.3,G);he.rotation.z=-.15}for(let B of[-1,1])Qe([[-2.2,.54,B*1],[-2.65,.62,B*1.1]],.025,a,G)}else if(M==="sideSkirts")for(let B of[-1,1]){let he=Ne(2.35,Q?.42:.33,.34,.08,a,-.15,.83,B*1.3,G);he.rotation.z=-.045,Ne(2.65,.055,.48,.025,Ve,-.06,.58,B*1.3,G),Ne(.07,.21,.24,.035,u,.96,.87,B*1.3,G);for(let J=0;J<(Q?3:1);J++)Ne(.35,.11,.025,.01,Ve,.48-J*.32,.65,B*1.53,G)}else{i.remove(G);let B=rh(E,{paint:a,carbon:Ve,metal:ke});i.add(B),Ie.spoiler[E]=B}}Ie.headlights={};for(let M of["round","projector","rally","matrix"]){let E=new Xe;i.add(E),Ie.headlights[M]=E;for(let G of[-1,1]){let Q=G*.74,B=2.57-.28*(Q/1.1)**2+.07,he=1.075;if(M==="matrix"){let J=Ne(.4,.2,.075,.045,qe,B,he,Q,E);J.rotation.y=Math.PI/2;let se=Ne(.35,.15,.01,.035,u,B+.05,he,Q,E);se.rotation.y=Math.PI/2;for(let me=0;me<4;me++){let st=Ne(.06,.1,.012,.017,Zt,B+.065,he,Q-.128+me*.085,E);st.rotation.y=Math.PI/2,st.castShadow=!1}}else{let J=M==="rally"?.16:M==="round"?.14:.135,se=m(new $e(J+.027,J+.02,.095,48),qe,B,he,Q,E);se.rotation.z=Math.PI/2;let me=m(new Ft(J+.008,.01,10,48),ke,B+.054,he,Q,E);me.rotation.y=Math.PI/2;let st=m(new Gt(1,32,20),M==="round"||M==="rally"?Pt:Zt,B+.055,he,Q,E);if(st.scale.set(.025,J,J),st.castShadow=!1,M==="projector"){let vt=m(new Ft(J*.8,.008,8,48),Zt,B+.076,he,Q,E);vt.rotation.y=Math.PI/2,m(new Gt(1,24,16),Mt,B+.081,he,Q,E).scale.set(.022,J*.53,J*.53)}if(M==="rally")for(let vt of[-.07,0,.07]){let it=Math.sqrt(J*J-vt*vt);Qe([[B+.09,he-it,Q+vt],[B+.1,he,Q+vt],[B+.09,he+it,Q+vt]],.009,qe,E)}}}}for(let[M,E]of Object.entries(n.streetHeadlights)){let G=new Xe;i.add(G),Ie.headlights[M]=G;let Q=s(E.color,.12,.22);Q.emissive.set(E.color),Q.emissiveIntensity=E.smoke?.35:1.1;let B=s(E.smoke?"#1c3348":"#83b6d5",.45,.12);for(let he of[-1,1]){let J=he*.72,se=2.57-.28*(J/1.1)**2+.07,me=1.075;if(E.shape==="sportHousing"){let it=new Ht;it.moveTo(-.29,.12),it.lineTo(.23,.09),it.quadraticCurveTo(.32,.02,.26,-.13),it.lineTo(-.25,-.14),it.closePath();let K=m(new zt(it,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),qe,se+.02,me,J,G);K.rotation.y=Math.PI/2;for(let ye=0;ye<2;ye++){let Ge=J+(ye-.5)*.24;if(m(new Gt(1,24,16),B,se+.13,me,Ge,G).scale.set(.022,.067,.067),E.signature==="rings"){let et=m(new Ft(.086,.01,10,48),Q,se+.155,me,Ge,G);et.rotation.y=Math.PI/2}if(E.signature==="doubleL"&&Qe([[se+.155,me+.075,Ge-.085],[se+.155,me-.075,Ge-.085],[se+.155,me-.075,Ge+.075]],.012,Q,G),E.signature==="pixels")for(let et=0;et<3;et++)m(new tt(.014,.026,.026),Q,se+.155,me+.09,Ge-.055+et*.055,G)}E.signature==="arc"&&Qe([[se+.155,me-.09,J-.25],[se+.155,me+.1,J-.25],[se+.155,me+.12,J],[se+.155,me+.07,J+.25]],.012,Q,G);continue}let st=Ne(.47,.25,.1,.04,qe,se,me,J,G);st.rotation.y=Math.PI/2;for(let it of[-.18,.18]){m(new tt(.1,.07,.035),ke,se-.035,me-.15,J+it,G);let K=m(new $e(.012,.012,.018,12),c,se+.02,me-.13,J+it,G);K.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(E.shape)){let it=E.shape==="doubleU"?2:1;for(let K=0;K<it;K++){let ye=J+(K-(it-1)/2)*.21;if(m(new Gt(1,24,16),B,se+.073,me,ye,G).scale.set(.019,.067,.067),E.shape==="doubleU")Qe([[se+.1,me+.075,ye-.08],[se+.1,me-.04,ye-.08],[se+.1,me-.08,ye-.045],[se+.1,me-.08,ye+.045],[se+.1,me-.04,ye+.08],[se+.1,me+.075,ye+.08]],.01,Q,G);else if(E.shape==="brow"){Qe([[se+.1,me+.055,ye-.19],[se+.1,me+.093,ye-.14],[se+.1,me+.093,ye+.19]],.011,Q,G);let Ke=m(new Ft(.068,.006,8,32),Q,se+.095,me-.015,ye,G);Ke.rotation.y=Math.PI/2}else for(let Ke=0;Ke<3;Ke++){let et=Ke*Math.PI*2/3-Math.PI/2;Qe([[se+.102,me+Math.sin(et)*.025,ye+Math.cos(et)*.025],[se+.102,me+Math.sin(et)*.1,ye+Math.cos(et)*.1]],.011,Q,G)}}continue}if(E.shape==="bar"){for(let[it,K,ye]of[[.035,.41,.025],[-.045,.33,.012]]){let Ge=Ne(K,ye,.014,.006,Q,se+.064,me+it,J,G);Ge.rotation.y=Math.PI/2,Ge.castShadow=!1}continue}if(E.shape==="square"){let it=Ne(.37,.17,.024,.015,Q,se+.065,me,J,G);it.rotation.y=Math.PI/2;for(let K=0;K<7;K++)m(new tt(.006,.16,.004),B,se+.082,me,J-.15+K*.05,G);continue}let vt=E.count===3?.062:E.count===2?.087:.106;for(let it=0;it<E.count;it++){let K=J+(it-(E.count-1)/2)*(E.count===3?.14:.205),ye=m(new $e(vt+.014,vt+.02,.09,E.shape==="hex"?6:40),u,se+.035,me,K,G);ye.rotation.z=Math.PI/2;let Ge=m(new Ft(vt,.009,8,E.shape==="hex"?6:48),Q,se+.09,me,K,G);Ge.rotation.y=Math.PI/2,Ge.castShadow=!1;let Ke=m(new Gt(1,24,16),E.projector?B:Q,se+.077,me,K,G);if(Ke.scale.set(.018,vt*.74,vt*.74),Ke.castShadow=!1,E.projector&&m(new Gt(1,16,12),Q,se+.092,me,K,G).scale.set(.006,vt*.31,vt*.31),E.cross||E.guard)for(let et of[-1,1])Qe([[se+.11,me-vt*.74,K-et*vt*.74],[se+.115,me,K],[se+.11,me+vt*.74,K+et*vt*.74]],.009,qe,G)}}}let sn={};for(let M of["club","sport","rally","chrome","aero"]){let E=[];sn[M]=E;for(let{wheelGroup:G,sign:Q}of j){let B=new Xe;G.add(B),E.push(B);let he=M==="aero"?.94:M==="rally"?1.02:M==="chrome"?.85:.88,J=M==="aero"||M==="rally"?.9:M==="sport"?.48:M==="chrome"?.38:.62,se=M==="aero"?1.65:M==="rally"?1.4:M==="sport"?.66:M==="chrome"?1.03:1.2,me=[],st=[];for(let ye=0;ye<=48;ye++){let Ge=-se+ye*se*2/48;for(let Ke of[-J/2,J/2])me.push(Math.sin(Ge)*he,Math.cos(Ge)*he,Ke)}for(let ye=0;ye<48;ye++){let Ge=ye*2;st.push(Ge,Ge+1,Ge+2,Ge+1,Ge+3,Ge+2)}let vt=new ut;vt.setAttribute("position",new Re(me,3)),vt.setIndex(st),vt.computeVertexNormals();let K=(M==="chrome"?ke:M==="club"?a:Ve).clone();K.side=Wt,m(vt,K,0,0,0,B);for(let ye of[-1,1]){let Ge=Array.from({length:49},(Ke,et)=>{let Lt=-se+et*se*2/48;return[Math.sin(Lt)*he,Math.cos(Lt)*he,ye*J/2]});Qe(Ge,.012,M==="aero"?c:M==="chrome"?ke:qe,B)}for(let ye of[-1,1])Qe([[0,0,-Q*.28],[ye*.28,.42,-Q*.31],[ye*.49,.68,-Q*.31]],.022,qe,B),rn(ye*.49,.68,-Q*.32,B);if(M==="rally"){Ne(.12,.52,J,.025,qe,-.97,.12,0,B);for(let ye of[-1,1])for(let Ge of[-J/2,J/2])rn(ye*.64,.76,Ge,B)}if(M==="sport")for(let ye of[-J/2,J/2])Qe([[-.5,.73,ye],[0,.9,ye],[.5,.73,ye]],.018,c,B);if(M==="aero"){for(let ye of[-1,1]){let Ge=new Ht;Ge.moveTo(-.91,.1),Ge.quadraticCurveTo(-.97,.94,0,.98),Ge.quadraticCurveTo(.97,.94,.91,.1),Ge.lineTo(.7,.1),Ge.quadraticCurveTo(.66,.72,0,.75),Ge.quadraticCurveTo(-.66,.72,-.7,.1),Ge.closePath(),m(new zt(Ge,{depth:.025,bevelEnabled:!1}),Ve,0,0,ye*J/2,B)}for(let ye=0;ye<4;ye++)Ne(.045,.025,J*.65,.006,u,-.28+ye*.18,.948,0,B)}B.userData.shell=K}}Ie.windshield={};for(let[M,E,G,Q]of[["deflector",.42,"#b6e3eb",.18],["sport",.82,"#a9d5e7",.23],["touring",1.08,"#c1e3ed",.17],["smoke",.96,"#455f7a",.4],["iridium",1.08,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let he=function(Ke,et){let Lt=["touring","grandTour"].includes(M),Xt=["sport","iridium"].includes(M),at=(Lt?1.1:M==="deflector"?.78:Xt?.88:.94)*(1-(Xt?.28:Lt?.04:.13)*et),Ze=1-Ke*Ke;return[1.32+(Lt?.34:.23)*Ze-E*(Xt?.48:.32)*et,1.5+E*et*(Xt?.72+.28*Ze:.84+.16*Ze),Ke*at]},B=new Xe;i.add(B),Ie.windshield[M]=B;let J=[],se=[],me=40,st=16;for(let Ke=0;Ke<=st;Ke++)for(let et=0;et<=me;et++)J.push(...he(-1+et*2/me,Ke/st));for(let Ke=0;Ke<st;Ke++)for(let et=0;et<me;et++){let Lt=Ke*(me+1)+et;se.push(Lt,Lt+1,Lt+me+1,Lt+1,Lt+me+2,Lt+me+1)}let vt=new ut;vt.setAttribute("position",new Re(J,3)),vt.setIndex(se),vt.computeVertexNormals();let it=new vn({color:G,metalness:.05,roughness:.075,transparent:!0,opacity:Q,depthWrite:!1,side:Wt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});B.userData.glass=it,B.userData.originalTint={color:G,opacity:Q};let K=m(vt,it,0,0,0,B);K.castShadow=!1,K.receiveShadow=!1,K.renderOrder=3;let ye=["smoke","highSmoke"].includes(M)?qe:ke;Qe(Array.from({length:41},(Ke,et)=>{let Lt=he(-1+et/20,0);return Lt[1]-=.04,Lt}),.045,qe,B);for(let Ke of[0,1])Qe(Array.from({length:41},(et,Lt)=>he(-1+Lt/20,Ke)),Ke===0?.017:.009,ye,B);for(let Ke of[-1,1]){Qe(Array.from({length:17},(Xt,at)=>he(Ke,at/16)),.011,ye,B);let et=he(Ke,0);Ne(.26,.12,.23,.025,qe,et[0],et[1]-.06,et[2],B),Qe([[.99,1.44,Ke*1.12],[1.18,1.44,Ke*1.02],et],.032,ye,B);let Lt=m(new $e(.013,.013,.018,6),ke,et[0]+.04,et[1]+.014,et[2],B)}let Ge=new Wn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let Ke of[-.77,-.69]){let et=Array.from({length:13},(Xt,at)=>{let Ze=he(Ke,.18+at*.058);return Ze[0]+=.004,Ze}),Lt=Qe(et,.003,Ge,B);Lt.castShadow=!1,Lt.receiveShadow=!1,Lt.renderOrder=4}}for(let M of Object.values(Ie.windshield))M.userData.mountRearX=Lr([M],M).min.x;let en=new Xe;for(let M of i.children.slice())M.userData.groundWheel||en.add(M);i.add(en);let Et=s("#b8c7d6",.72,.27),xt=new Xe,zn=[];i.add(xt);for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=new Xe;G.position.set(M,.52,E*1.12),xt.add(G);let Q=Array.from({length:193},(it,K)=>{let ye=K/192,Ge=ye*Math.PI*14;return new w(Math.cos(Ge)*.071,.055+ye*.36,Math.sin(Ge)*.071)}),B=m(new Ct(new wt(Q),192,.014,10,!1),Et,0,0,0,G);m(new $e(.039,.039,.23,24),qe,0,.14,0,G);let he=m(new $e(.018,.018,.28,20),ke,0,.34,0,G),J=new Xe;J.position.y=.47,G.add(J);for(let[it,K]of[[G,.04],[J,-.015]])m(new $e(.095,.095,.026,32),ke,0,K,0,it),m(new $e(.068,.068,.018,24),qe,0,K+.02,0,it);m(new tt(.14,.075,.18),qe,0,.025,E*.035,G),m(new tt(.16,.075,.22),qe,0,0,-E*.075,J);let se=new w(M,.56,E*1.12),me=new w(M,.81,E*1.43),st=me.clone().sub(se);m(new $e(.026,.026,st.length(),16),qe,...se.clone().add(me).multiplyScalar(.5).toArray(),xt).quaternion.setFromUnitVectors(new w(0,1,0),st.normalize()),zn.push({coil:B,rod:he,upper:J})}Ie.brakes={};for(let M of["stock","red","gold","ceramic"]){let E=new Xe;i.add(E),Ie.brakes[M]=E;for(let{wheelGroup:G,sign:Q}of j){let B=ih(M);B.position.z=Q*.165,Q<0&&(B.rotation.y=Math.PI),G.add(B),E.userData.brakeAssemblies??=[],E.userData.brakeAssemblies.push(B)}}Ie.nitrous={};let Xi=document.createElement("canvas");Xi.width=512,Xi.height=256;let fn=Xi.getContext("2d");fn.fillStyle="#101923",fn.fillRect(0,0,512,256),fn.strokeStyle="#e8e1cc",fn.lineWidth=8,fn.strokeRect(10,10,492,236),fn.fillStyle="#f5f2e8",fn.textAlign="center",fn.font="italic bold 106px Arial",fn.fillText("N\u2082O",256,117),fn.font="bold 24px Arial",fn.fillText("NITROUS OXIDE",256,159),fn.fillStyle="#d9b36b",fn.font="bold 18px Arial",fn.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)fn.fillRect(165+M*4,212,M%3+1,17);let ti=new Vt(Xi);ti.colorSpace=bt,ti.anisotropy=8;let On=document.createElement("canvas");On.width=On.height=128;let Jt=On.getContext("2d");Jt.fillStyle="#eee9dc",Jt.fillRect(0,0,128,128),Jt.translate(64,64),Jt.strokeStyle="#17202a";for(let M=0;M<=20;M++){let E=-Math.PI*.8+M*Math.PI*1.6/20;Jt.lineWidth=M%5?2:4,Jt.beginPath(),Jt.moveTo(Math.sin(E)*43,-Math.cos(E)*43),Jt.lineTo(Math.sin(E)*(M%5?49:53),-Math.cos(E)*(M%5?49:53)),Jt.stroke()}Jt.fillStyle="#293541",Jt.textAlign="center",Jt.font="bold 14px Arial",Jt.fillText("PSI",0,30),Jt.strokeStyle="#c92737",Jt.lineWidth=4,Jt.beginPath(),Jt.moveTo(-9,12),Jt.lineTo(26,-31),Jt.stroke(),Jt.fillStyle="#25313a",Jt.beginPath(),Jt.arc(0,0,6,0,Math.PI*2),Jt.fill();let ni=new Vt(On);ni.colorSpace=bt;for(let M of["blue","twin","triple"]){let E=new Xe;E.name="nitrous-"+M,i.add(E),Ie.nitrous[M]=E;let G=s(n.item("nitrous",M).color,.65,.27),Q=M==="triple"?3:M==="twin"?2:1,B=1.49,he=-1.3,J=.37,se=s("#b4924f",.8,.3),me=s("#a5b2bd",.85,.24),st=s("#1b2028",.08,.85),vt=s("#ab2635",.35,.4);for(let it of[-1.52,-1.13]){Ne(.095,.05,Q*J+.04,.015,u,it,1.29,0,E);for(let K of[-1,1]){let ye=K*(Q*J/2-.02);m(new $e(.024,.024,.023,6),me,it,1.327,ye,E)}}for(let it=0;it<Q;it++){let K=(it-(Q-1)/2)*J,ye=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([$t,xn])=>new Me($t,xn)),Ge=m(new ki(ye,40),G,he,B,K,E);Ge.rotation.z=-Math.PI/2;for(let $t of[-1.52,-1.13]){Ne(.11,.095,.27,.025,st,$t,1.35,K,E);let xn=m(new Ft(.152,.013,8,40),me,$t,B,K,E);xn.rotation.y=Math.PI/2,Ne(.08,.025,.055,.008,me,$t,B+.155,K,E),m(new $e(.013,.013,.018,6),u,$t,B+.179,K,E)}let Ke=[],et=[],Lt=[];for(let $t=0;$t<2;$t++)for(let xn=0;xn<=16;xn++){let ui=-.91+xn*1.82/16;if(Ke.push(he+($t?.12:-.12),B+Math.cos(ui)*.147,K+Math.sin(ui)*.147),et.push($t,xn/16),$t&&xn){let di=17+xn;Lt.push(di-18,di-17,di,di-18,di,di-1)}}let Xt=new ut;Xt.setAttribute("position",new Re(Ke,3)),Xt.setAttribute("uv",new Re(et,2)),Xt.setIndex(Lt),Xt.computeVertexNormals();let at=new vn({map:ti,roughness:.55,metalness:.05,side:Wt});m(Xt,at,0,0,0,E);let Ze=m(new $e(.046,.046,.055,24),se,-.89,B,K,E);Ze.rotation.z=Math.PI/2,Ne(.075,.07,.065,.012,se,-.845,B,K,E),m(new $e(.016,.016,.065,16),me,-.845,B+.045,K,E);let Tt=m(new Ft(.052,.012,8,24),vt,-.845,B+.092,K,E);Tt.rotation.x=Math.PI/2;for(let $t of[0,Math.PI/3,Math.PI*2/3]){let xn=Ne(.106,.014,.014,.004,vt,-.845,B+.092,K,E);xn.rotation.y=$t}let Bt=new Xe;Bt.position.set(-.84,B+.065,K+.075),Bt.rotation.x=-Math.PI*.32,E.add(Bt);let un=m(new $e(.057,.057,.03,32),me,0,0,0,Bt);un.rotation.x=Math.PI/2;let pn=m(new jn(.047,32),new Wn({map:ni}),0,0,.017,Bt),nn=m(new $e(.024,.024,.055,6),se,-.79,B,K,E);nn.rotation.z=Math.PI/2,Qe([[-.76,B,K],[-.7,B-.02,K],[-.71,1.3,K],[-.91,1.24,K]],.014,st,E);let hi=m(new $e(.021,.021,.055,12),me,-.74,B,K,E);hi.rotation.z=Math.PI/2}Ne(.07,.07,Q*J,.015,se,-.91,1.24,0,E),Qe([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,st,E)}Ie.pedals={};for(let M of["classic","aluminium","formula"]){let E=Fd(M);i.add(E),Ie.pedals[M]=E}Ie.seat={};for(let M of["red","carbon","emerald","ivory"]){let E=ah(M);E.rotation.y=Math.PI/2,E.position.set(-.8,1,0),i.add(E),Ie.seat[M]=E}let _s=Nd(T),ii=bd({paint:a,carbon:Ve,metal:ke});i.add(ii.group);function ga(M){for(let{plate:K,sign:ye}of De){let Ge=M[ye>0?"frontBumper":"rearBumper"],Ke={streetLow:.12,driftWide:.16,trackGT:.22,sport:.18}[Ge];K.position.x=ye*(Ke===void 0?["club","rally"].includes(Ge)?2.72:2.605:2.64+Ke+.055),K.scale.setScalar(Ke===void 0?1:.72),K.position.y=Ke===void 0?1.01:1.3}let E=["formula","formulaPro","formulaElite"].includes(M.frontBumper);_s.set(E),U.forEach(K=>K.visible=!E),ii.group.visible=E||M.turbine==="formula",ii.engine.visible=M.turbine==="formula",Ce(M);let G=n.glassTints[M.glassTint]||n.glassTints.original;for(let K of Object.values(Ie.windshield)){let ye=K.userData.originalTint;K.userData.glass.color.set(G.opacity===null?ye.color:G.color),K.userData.glass.opacity=G.opacity??ye.opacity,K.userData.glass.iridescence=M.glassTint==="violet"?1:0,K.userData.glass.iridescenceIOR=1.35,K.userData.glass.iridescenceThicknessRange=[180,420],K.userData.glass.roughness=M.glassTint==="black"?.2:.075}let Q=(n.wheelDiameters[M.wheelSize]||16)/16,B=(Q-1)*(.715/.86),he={standard:1,wide:1.25,ultra:1.45}[M.tyreWidth]||1;for(let{wheelGroup:K,sign:ye,tyres:Ge}of j){K.scale.set(.88/1.24*Q,.88/.86*Q,he/.95),K.position.y=.715/.86*Q,K.position.z=ye*(1.36+.25*(he-1));for(let[Ke,et]of Object.entries(Ge))for(let Lt of et)Lt.visible=Ke===(M.tyres||"standard")}let J=B+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0);for(let[K,ye]of Object.entries(Ie))if(K!=="brakes")for(let Ge of Object.values(ye))Ge.parent===i&&(Ge.userData.mountBaseY??=Ge.position.y,Ge.position.y=Ge.userData.mountBaseY+J);yn.forEach(K=>K.visible=!M.headlights||M.headlights==="classic");for(let[K,ye]of Object.entries(sn))for(let Ge of ye)Ge.visible=M.fenders===K,K==="club"&&Ge.userData.shell.color.set(n.item("paint",M.paint).color);Et.color.set(n.item("suspension",M.suspension).color),en.position.y=J,ii.group.position.y=J-(["formula","aeroPrototype"].includes(M.chassis)?.18:0),xt.visible=J>0,zn.forEach(({coil:K,rod:ye,upper:Ge})=>{K.scale.y=1+J/.415,ye.scale.y=1+J/.28,ye.position.y=.34+J/2,Ge.position.y=.47+J});for(let[K,ye]of Object.entries(Ie))for(let[Ge,Ke]of Object.entries(ye))Ke.visible=(K==="pedals"?M.pedals||"classic":M[K])===Ge;E&&Object.values(Ie.headlights).forEach(K=>K.visible=!1);for(let[K,ye]of Object.entries(Ie.brakes))for(let Ge of ye.userData.brakeAssemblies||[])Ge.visible=(M.brakes||"stock")===K;Object.entries(de).forEach(([K,ye])=>ye.visible=K===(M.steering||"classic")),Object.entries(Kt).forEach(([K,ye])=>ye.visible=K===(M.exhaust||"classic")),Ot.visible=M.turbine==="boost",gt.visible=M.turbine!=="formula";let se=["twin","twinBig"].includes(M.turbine),me=M.turbine==="twinBig",st=me?.9:se?.52:M.turbine==="boost"?.96:.9;gt.scale.set(st/1.24,st/.86,st/.95),gt.position.set(rt,je+(me?.06:se?-.2:-.04),se?me?-.7:-.44:0),_t.visible=se,_t.scale.copy(gt.scale),_t.position.set(rt,je+(me?.06:-.2),me?.7:.44);let vt=Lr(M.turbine==="formula"?[ii.engine]:[gt,_t],en);for(let K of Object.values(Ie.spoiler))K.userData.fitTurbines(vt);let it=M.badges||[];if(S.forEach(K=>K.visible=!it.length&&(!M.vinyl||M.vinyl==="none")),te.forEach(K=>K.userData.plane.visible=!it.length&&(!M.vinyl||M.vinyl==="none")),ie.forEach(({group:K,mat:ye,back:Ge,n:Ke})=>{let et=it[Ke];K.position.x=(Ke-(it.length-1)/2)*.82+.05,K.visible=!!et;let Lt=et+":"+(M.prizeTotal||0);if(!et||ye.userData.badge===Lt)return;let Xt=new Ht,at=.65/512,Ze=(Tt,Bt)=>[(Tt-256)*at,(256-Bt)*at];if(et==="millionaire"||et==="day-hero")Xt.absarc(0,0,204*at,0,Math.PI*2,!1);else if(et==="rating-top10"){for(let Tt=0;Tt<6;Tt++){let Bt=Tt*Math.PI/3-Math.PI/2,un=Ze(256+Math.cos(Bt)*215,256+Math.sin(Bt)*215);Tt?Xt.lineTo(...un):Xt.moveTo(...un)}Xt.closePath()}else Xt.moveTo(...Ze(80,88)),Xt.quadraticCurveTo(...Ze(256,0),...Ze(432,88)),Xt.lineTo(...Ze(420,296)),Xt.quadraticCurveTo(...Ze(390,400),...Ze(256,465)),Xt.quadraticCurveTo(...Ze(122,400),...Ze(92,296)),Xt.closePath();Ge.geometry.dispose(),Ge.geometry=new zt(Xt,{depth:.035,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.014,bevelThickness:.012,curveSegments:24}),ye.map?.dispose(),ye.map=new Vt(n.badgeCanvas(et,M)),ye.map.colorSpace=bt,ye.map.anisotropy=16,ye.emissive.set("#ffffff"),ye.emissiveMap=ye.map,ye.emissiveIntensity=.35,ye.userData.badge=Lt,ye.needsUpdate=!0}),a.color.set(n.item("paint",M.paint).color),o.color.copy(a.color).multiplyScalar(.45),h.color.set(n.wheelPaintColor(M)),k!==M.wheels){for(let K of A)K.removeFromParent(),K.geometry.dispose();A.length=0;for(let{wheelGroup:K,sign:ye}of j)for(let Ge of[1,-1])for(let Ke of n.wheelDesign(M.wheels)){let et={bronzeSix:.029,deepFive:.048,muscleFive:.06,triBlade:.105,turbofan:.037,fiveSpoke:.049,legend:.034,splitY:.024,concaveTen:.026,rallyMulti:.02,crossMesh:.014,copper:.015,splitStar:.022,splitSix:.025,forged:.025}[M.wheels]||.02,Lt=[],Xt=[];Ke.forEach(([Bt,un],pn)=>{let nn=Ke[Math.max(0,pn-1)],hi=Ke[Math.min(Ke.length-1,pn+1)],$t=hi[0]-nn[0],xn=hi[1]-nn[1],ui=Math.hypot($t,xn)||1,di=et*(.65+.35*pn/(Ke.length-1));Lt.push([Bt-xn/ui*di,un+$t/ui*di]),Xt.push([Bt+xn/ui*di,un-$t/ui*di])});let at=new Ht;[...Lt,...Xt.reverse()].forEach(([Bt,un],pn)=>pn?at.lineTo(Bt,un):at.moveTo(Bt,un)),at.closePath();let Ze=new zt(at,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1}),Tt=Ze.attributes.position;for(let Bt=0;Bt<Tt.count;Bt++){let un=Math.hypot(Tt.getX(Bt),Tt.getY(Bt)),pn=(M.wheels==="deepFive"?.095:M.wheels==="concaveTen"?.075:.025)*(1-Math.min(1,un/.51));Tt.setZ(Bt,ye*Ge*((Ge===1?.255:.235)-pn+Tt.getZ(Bt)))}Tt.needsUpdate=!0,Ze.computeVertexNormals(),A.push(m(Ze,h,0,0,0,K))}k=M.wheels}c.color.set(n.item("trim",M.trim).color),c.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,c.metalness=.95,d.userData.style!==M.upholstery&&(d.map?.dispose(),d.map=new Vt(n.upholsteryCanvas(M.upholstery)),d.map.colorSpace=bt,d.map.wrapS=d.map.wrapT=An,d.map.repeat.set(12,2),d.color.set("#ffffff"),d.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,d.userData.style=M.upholstery,d.needsUpdate=!0),n.chipPalette(M.chips).forEach((K,ye)=>{Je[ye].color.set(K),Je[ye].roughness=M.chips==="ceramic"?.25:.55}),ot.color.set(n.chipEdgeColor(M.chips)),He.forEach(K=>{K.visible=!0,K.material.color.set(M.chips==="tournament"?["#c6414f","#e1bc3e","#5b9c69","#4c73c5"][K.userData.edgeIndex%4]:n.chipEdgeColor(M.chips))}),Pe.forEach(({mat:K,n:ye})=>{K.userData.style!==M.chips&&(K.map?.dispose(),K.map=new Vt(n.chipCanvas(M.chips,ye)),K.map.colorSpace=bt,K.map.anisotropy=8,K.userData.style=M.chips,K.needsUpdate=!0)}),ge.forEach((K,ye)=>{K.userData.style!==M.cards&&(K.map?.dispose(),K.map=new Vt(n.cardCanvas(M.cards,ye)),K.map.colorSpace=bt,K.map.anisotropy=16,K.userData.style=M.cards,K.needsUpdate=!0)}),A.forEach(K=>K.visible=!0),R.forEach(K=>K.visible=!0),p.color.set(n.item("light",M.light).color),p.emissive.copy(p.color),v.color.copy(p.color).multiplyScalar(.075),v.emissive.copy(p.color),v.emissiveIntensity=.045,ue.userData.number!==M.number+M.region&&(ue.map?.dispose(),ue.map=new Vt(n.plateCanvas(M)),ue.userData.number=M.number+M.region,ue.needsUpdate=!0)}let Dr=new Nt({color:p.color.clone(),emissive:p.color.clone(),emissiveIntensity:.65,roughness:.5}),ji=new Xe;en.add(ji);for(let M of[-1,1]){Ne(2.62,.09,.12,.025,u,-.03,.47,M*.76,ji);let E=m(new tt(2.48,.018,.075),Dr,-.03,.417,M*.76,ji);for(let G of[-1.13,1.06])Ne(.12,.16,.18,.018,u,G,.53,M*.76,ji)}let It=new aa(p.color,.45,2,2);It.position.set(-1.9,2,.48),en.add(It);let Gn=new Xe;i.add(Gn);let Sn=s("#161d22",.34,.56),Pi=s("#917252",.05,.86),cr=new Ht;[[-2.55,-.72],[-1.55,-1.03],[.25,-1.1],[.8,-.67],[1.42,-.24],[2.38,-.17],[2.38,.17],[1.42,.24],[.8,.67],[.25,1.1],[-1.55,1.03],[-2.55,.72]].forEach(([M,E],G)=>G?cr.lineTo(M,E):cr.moveTo(M,E)),cr.closePath();let xs=m(new zt(cr,{depth:.055,bevelEnabled:!0,bevelThickness:.008,bevelSize:.012,bevelSegments:2}),Sn,0,.48,0,Gn);xs.rotation.x=Math.PI/2,Ne(3.85,.035,.24,.025,Pi,-.08,.395,0,Gn);for(let M of[-1.65,-.8,.15,1.2])for(let E of[-.075,.075]){let G=m(new $e(.018,.018,.008,12),ke,M,.373,E,Gn)}for(let M of[-1,1]){Qe([[-1.85,.4,M*.68],[-.8,.38,M*.79],[.3,.4,M*.82],[.8,.44,M*.51]],.025,Sn,Gn),Qe([[-1.85,.4,M*.33],[-.8,.37,M*.37],[.3,.4,M*.39],[.8,.44,M*.27]],.022,Sn,Gn);for(let E=0;E<3;E++){let G=Ne(.32,.11,.022,.008,Sn,.25+E*.19,.44,M*(.98-E*.1),Gn);G.rotation.y=M*-.24}}let tn=new Ht;tn.moveTo(-2.65,.78),tn.lineTo(-1.65,.44),tn.lineTo(-1.65,.36),tn.lineTo(-2.65,.53),tn.closePath();for(let M=-3;M<=3;M++)m(new zt(tn,{depth:.022,bevelEnabled:!1}),Sn,0,0,M*.205,Gn);let _i=m(new tt(1.04,.035,1.4),Sn,-2.15,.6,0,Gn);_i.rotation.z=-.32;let Pn=new Xe;i.add(Pn);for(let M of[-1,1]){Ne(2.8,.4,.42,.12,a,-.16,.91,M*1.17,Pn),Ne(2.95,.075,.55,.035,Ve,-.12,.65,M*1.17,Pn),Qe([[-1.55,1.14,M*1.28],[-.2,1.17,M*1.35],[1.15,1.1,M*1.13]],.055,c,Pn),Ne(.1,.24,.27,.035,u,1.16,.94,M*1.18,Pn);for(let E=0;E<3;E++)Ne(.025,.19,.29,.008,c,.82-E*.16,1.1,M*1.39,Pn);Qe([[1.87,.65,M*.84],[2.18,.78,M*.74],[2.25,.84,0]],.06,c,Pn),Ne(.09,.48,.08,.025,ke,-1.95,1.08,M*.67,Pn)}Ne(.48,.08,1.98,.035,Ve,-1.96,1.35,0,Pn),Qe([[-2.17,1.4,-.97],[-2.17,1.4,.97]],.025,c,Pn);let cn=new Xe;i.add(cn);let kn=s("#e9bd68",.72,.25);for(let M of[-1,1]){m(new Gt(1,32,20),Ve,-.55,1.01,M*.88,cn).scale.set(1.15,.28,.34);let G=Ne(.12,.32,.45,.07,u,.42,1.04,M*.89,cn);for(let Q=0;Q<5;Q++)Ne(.23,.025,.35,.01,qe,-.4-Q*.16,1.27,M*.88,cn);Qe([[-1.62,.72,M*.95],[-.8,.69,M*1.22],[.35,.72,M*1.12],[.65,.79,M*.89]],.025,kn,cn);for(let Q=0;Q<3;Q++){let B=Ne(.55,.035,.35,.02,Ve,1.58+Q*.17,.55+Q*.12,M*(.82+Q*.12),cn);B.rotation.z=-.2}}let _n=new Ht;_n.moveTo(-1.9,1.2),_n.lineTo(-1.6,1.92),_n.lineTo(-.82,1.6),_n.lineTo(-.6,1.23),_n.closePath();let va=m(new zt(_n,{depth:.045,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:2,steps:1}),Ve,0,0,-.022,cn);Qe([[-1.9,1.2,0],[-1.6,1.92,0],[-.82,1.6,0]],.018,kn,cn);let Nr=s("#597480",.35,.13);Nr.transparent=!0,Nr.opacity=.42,Nr.side=Wt,m(new Gt(1,48,24,0,Math.PI*2,0,Math.PI/2),Nr,-.3,1.42,0,cn).scale.set(1.25,.52,.46);for(let M of[-1,1])Qe([[-1.48,1.43,M*.12],[-1,1.68,M*.39],[-.25,1.94,M*.33],[.6,1.64,M*.28],[.93,1.43,M*.12]],.025,Ve,cn);let Gd=Td(i,[Gn,...Object.values(Ie.windshield),...Object.values(Ie.mirrors),...ie.map(M=>M.group),ji,...Object.values(Ie.pedals),cn,St,gt,_t,xt,...Object.values(Ie.seat)]),kd=ga;function oh(M){kd(M),Pn.visible=M.chassis==="club",Pn.position.y=en.position.y,cn.visible=M.chassis==="aeroPrototype",cn.position.y=en.position.y;let E=["formula","aeroPrototype"].includes(M.chassis),G=E?1.13:1;Gd.set(E);let Q=Lr([St],i);for(let B of Object.values(Ie.windshield))B.scale.z=E?.72:1,B.position.x=hh(Q.max.x,B.userData.mountRearX),B.position.y=E?-.135:0;for(let{group:B,sign:he}of Ye)B.position.z=E?he*1.19*(el(.64)-1):0,B.position.y=E?-.122:0;q.visible=!E,Gn.visible=E,Gn.position.y=en.position.y;for(let{group:B}of ie)B.position.z=B.userData.side*(E?1.365*el(B.position.x)+.045:M.chassis==="club"?1.44:1.39);ji.scale.z=E?.65:1,Dr.color.copy(p.color),Dr.emissive.copy(p.color);for(let B of[...Rt,...Ae])B.visible=!E;for(let B of Object.values(Ie.pedals))B.position.x=E?-.65:0,B.position.y=en.position.y-.06;i.scale.x=1.24*G;for(let{wheelGroup:B}of j)B.scale.x/=G;It.color.copy(p.color)}return oh(e),{car:i,update:oh,measureClearance(){let M=Lr([St],i),E=Object.values(Ie.windshield).find(G=>G.visible);return E?Lr([E],i).min.x-M.max.x:null}}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new ci({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=bt,n.toneMapping=ai,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=cs,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new Nn,s=new an(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Qn("#c6d9ef","#44311e",1.25));for(let[ne,_e,H,Le,A]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let R=new qn(ne,_e);R.position.set(H,Le,A),R.castShadow=ne==="#fff0d0",R.shadow.bias=-2e-4,R.shadow.normalBias=.025,R.shadow.mapSize.set(2048,2048),R.shadow.camera.left=-5,R.shadow.camera.right=5,R.shadow.camera.top=5,R.shadow.camera.bottom=-5,i.add(R)}let a=new Nn;a.background=new lt("#48505b");for(let[ne,_e,H,Le,A,R]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let j=new ct(new tt(Le,A,R),new Wn({color:"#ffffff"}));j.position.set(ne,_e,H),a.add(j)}let o=new ar(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(ne=>{ne.geometry?.dispose(),ne.material?.dispose()}),o.dispose();let l=new ct(new Yt(30,30),new _r({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=rm(i,e),u=new Xn({transparent:!0,depthWrite:!1,side:Wt,toneMapped:!1,uniforms:{color:{value:new lt(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=p.x*p.x+p.y*p.y;float halo=exp(-d*3.5);float core=exp(-d*11.);float a=(halo*.42+core*.20)*strength;gl_FragColor=vec4(color,a);}"}),d=new ct(new Yt(7.2,3.8),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let p=[];for(let ne of[-1.15,1.15])for(let _e of[-.68,.68]){let H=new sa(u.uniforms.color.value,3.5,3.4,Math.PI*.42,.9,1.5);H.position.set(ne,.36,_e),H.target.position.set(ne,0,_e),i.add(H,H.target),p.push(H)}let v=r.closest(".player-hall__room");t.night??=v?.dataset.theme==="midnight";function m(ne){t.night=!!ne;for(let H of i.children)H.isHemisphereLight&&(H.intensity=ne?.26:1.25),H.isDirectionalLight&&(H.userData.dayIntensity??=H.intensity,H.intensity=H.userData.dayIntensity*(ne?.13:1));i.environmentIntensity=ne?.24:1.5;let _e=t.neon??window.pokerGarageNeonBrightness?.()??1.5;u.uniforms.strength.value=(ne?2.1:.95)*_e,p.forEach(H=>{H.intensity=3.5*_e*(ne?1.6:1)}),t.snapshotOnly||I?.request()}let f=ne=>{v&&(t.neon=window.pokerGarageNeonBrightness?.()??1.5,m(v.dataset.theme==="midnight"))};window.addEventListener("poker-garage-lighting",f);let g=null;function y(){if(!g){g=new Mn,h.car.updateWorldMatrix(!0,!0);let j=k=>{if(k.visible){k.geometry&&(k.geometry.computeBoundingBox(),g.union(k.geometry.boundingBox.clone().applyMatrix4(k.matrixWorld)));for(let S of k.children)j(S)}};j(h.car)}let ne=g.getCenter(new w),_e=new w(Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),Math.cos(t.yaw)*Math.cos(t.pitch)),H=new w(Math.cos(t.yaw),0,-Math.sin(t.yaw)),Le=new w().crossVectors(_e,H),A=Math.tan(s.fov*Math.PI/360),R=0;for(let j of[g.min.x,g.max.x])for(let k of[g.min.y,g.max.y])for(let S of[g.min.z,g.max.z]){let U=new w(j,k,S).sub(ne);R=Math.max(R,Math.abs(U.dot(H))/(A*s.aspect)+U.dot(_e),Math.abs(U.dot(Le))/A+U.dot(_e))}R=Math.max(R*1.1,t.snapshotOnly?_?15:13:_?10.4:9),s.position.copy(ne).addScaledVector(_e,R),s.lookAt(ne)}let _=["formula","formulaPro","formulaElite"].includes(e.frontBumper),x=ne=>{_=["formula","formulaPro","formulaElite"].includes(ne.frontBumper),h.update(ne),g=null,u.uniforms.color.value.set(window.PokerGarage.item("light",ne.light).color),p.forEach(_e=>{_e.color.copy(u.uniforms.color.value),_e.position.y=.36+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[ne.suspension]||0)*.86}),t.snapshotOnly||I?.request()};t.yaw??=.9,t.pitch??=.25,t.manual??=!0;let T=!1,b=null,I=null,O=()=>{let ne=r.clientWidth,_e=r.clientHeight;ne&&_e?(n.setSize(ne,_e,!1),s.aspect=ne/_e,s.updateProjectionMatrix(),t.snapshotOnly||I?.request()):r.isConnected||Fe()},N=new ResizeObserver(O);N.observe(r),O();let F=new si(1,1,{type:sr,depthBuffer:!0});F.samples=4;let P=new Nn,L=new Tr(-1,1,1,-1,0,1),q=new Xn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:F.texture},stepSize:{value:new Me}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),W=new ct(new Yt(2,2),q);P.add(W);function $(){let ne=n.getDrawingBufferSize(new Me);(F.width!==ne.x||F.height!==ne.y)&&F.setSize(ne.x,ne.y),q.uniforms.stepSize.value.set(3/ne.x,3/ne.y),n.setRenderTarget(F),n.render(i,s),n.setRenderTarget(null),n.render(P,L)}let ae=ne=>{ne.button&&ne.button!==0||(t.manual=!0,b={id:ne.pointerId,x:ne.clientX,y:ne.clientY},r.setPointerCapture(ne.pointerId),ne.preventDefault())},Z=ne=>{!b||b.id!==ne.pointerId||(t.yaw-=(ne.clientX-b.x)*.011,t.pitch=zd(t.pitch+(ne.clientY-b.y)*.009,-.24,1.35),b.x=ne.clientX,b.y=ne.clientY,I.request(),ne.preventDefault())},oe=ne=>{b&&b.id===ne.pointerId&&(b=null,r.hasPointerCapture(ne.pointerId)&&r.releasePointerCapture(ne.pointerId))},Ue=ne=>{let _e={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};_e[ne.key]&&(t.manual=!0,t.yaw+=_e[ne.key][0],t.pitch=zd(t.pitch+_e[ne.key][1],-.24,1.35),I.request(),ne.preventDefault())};r.addEventListener("keydown",Ue),r.addEventListener("pointerdown",ae),r.addEventListener("pointermove",Z),r.addEventListener("pointerup",oe),r.addEventListener("pointercancel",oe),r.addEventListener("lostpointercapture",oe);function Fe(){T||(T=!0,window.removeEventListener("poker-garage-lighting",f),I?.dispose(),Ce.disconnect(),Te?.removeEventListener("close",Fe),N.disconnect(),r.removeEventListener("keydown",Ue),r.removeEventListener("pointerdown",ae),r.removeEventListener("pointermove",Z),r.removeEventListener("pointerup",oe),r.removeEventListener("pointercancel",oe),r.removeEventListener("lostpointercapture",oe),ch(i),c.dispose(),F.dispose(),q.dispose(),W.geometry.dispose(),n.dispose(),n.forceContextLoss(),n.domElement.remove())}let Te=r.closest("dialog");Te?.addEventListener("close",Fe);function ze(){if(T)return;if(!r.isConnected||Te&&!Te.open){Fe();return}s.zoom=(t.previewScale||1)*(t.zoom||1),s.updateProjectionMatrix();let ne=r.getBoundingClientRect();ne.bottom>0&&ne.top<innerHeight&&ne.right>0&&ne.left<innerWidth&&(y(),$(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual))}let Ce=new IntersectionObserver(ne=>{ne.some(_e=>_e.isIntersecting)&&!t.snapshotOnly&&I?.request()});return Ce.observe(r),I=lh({render:ze}),m(t.night),t.snapshotOnly||I.request(),{update:x,setNight:m,dispose:Fe,state:t,invalidate:()=>I.request(),measureClearance:()=>h.measureClearance(),snapshot(){y(),$();let ne=document.createElement("canvas");return ne.width=n.domElement.width,ne.height=n.domElement.height,ne.getContext("2d").drawImage(n.domElement,0,0),ne}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
