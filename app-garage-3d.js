(()=>{var hc=0,wo=1,uc=2;var Eo=1,ha=2,yn=3,er=0,kt=1,Ct=2,ti=0,jr=1,Ao=2,Co=3,Ro=4,dc=5,tr=100,pc=101,mc=102,fc=103,gc=104,_c=200,vc=201,yc=202,xc=203,Mc=204,Sc=205,bc=206,Tc=207,wc=208,Ec=209,Ac=210,Cc=211,Rc=212,Ic=213,Pc=214,ua=0,da=1,pa=2,qr=3,ma=4,fa=5,ga=6,_a=7,Lc=0,Dc=1,Uc=2,Gn=0,Nc=1,Fc=2,Oc=3,va=4,Bc=5,zc=6,Gc=7;var Io=300,nr=301,xi=302,ya=303,xa=304,Yr=306,di=1e3,Wi=1001,As=1002,_n=1003,Vc=1004;var Zr=1005;var vn=1006,Ma=1007;var Mi=1008;var xn=1009,Po=1010,Lo=1011,ir=1012,Sa=1013,Si=1014,Mn=1015,ni=1016,ba=1017,Ta=1018,rr=1020,Do=35902,Uo=35899,kc=1021,Hc=1022,an=1023,Jr=1026,Kr=1027,No=1028,wa=1029,Wc=1030,Fo=1031;var Oo=1033,Ea=33776,Aa=33777,Ca=33778,Ra=33779,Bo=35840,zo=35841,Go=35842,Vo=35843,ko=36196,Ho=37492,Wo=37496,Xo=37808,jo=37809,qo=37810,Yo=37811,Zo=37812,Jo=37813,Ko=37814,$o=37815,Qo=37816,el=37817,tl=37818,nl=37819,il=37820,rl=37821,sl=36492,al=36494,ol=36495,ll=36283,cl=36284,hl=36285,ul=36286;var Sr=2300,Cs=2301,ws=2302,fo=2400,go=2401,_o=2402;var Xc=3201;var jc=0,qc=1,bi="",at="srgb",pi="srgb-linear",br="linear",Ke="srgb";var ui=7680;var Yc=512,Zc=513,Jc=514,dl=515,Kc=516,$c=517,Qc=518,eh=519,vo=35044;var pl="300 es",Dn=2e3,Tr=2001;var Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Es=Math.PI/180,Rs=180/Math.PI;function sr(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(wt[255&r]+wt[r>>8&255]+wt[r>>16&255]+wt[r>>24&255]+"-"+wt[255&e]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[63&t|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[255&n]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function We(r,e,t){return Math.max(e,Math.min(t,r))}function Vh(r,e){return(r%e+e)%e}function za(r,e,t){return(1-t)*r+t*e}function pr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Pt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ae=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},en=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],m=s[a+2],y=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=m,void(e[t+3]=y);if(u!==y||c!==d||l!==p||h!==m){let f=1-o,g=c*d+l*p+h*m+u*y,v=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let R=Math.sqrt(x),I=Math.atan2(R,g*v);f=Math.sin(f*I)/R,o=Math.sin(o*I)/R}let S=o*v;if(c=c*f+d*S,l=l*f+p*S,h=h*f+m*S,u=u*f+y*S,f===1-o){let R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+h*u+c*p-l*d,e[t+1]=c*m+h*d+l*u-o*p,e[t+2]=l*m+h*p+o*d-c*u,e[t+3]=h*m-o*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),p=c(i/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*p*m,this._y=l*p*u-d*h*m,this._z=l*h*m+d*p*u,this._w=l*h*u-d*p*m;break;case"YXZ":this._x=d*h*u+l*p*m,this._y=l*p*u-d*h*m,this._z=l*h*m-d*p*u,this._w=l*h*u+d*p*m;break;case"ZXY":this._x=d*h*u-l*p*m,this._y=l*p*u+d*h*m,this._z=l*h*m+d*p*u,this._w=l*h*u-d*p*m;break;case"ZYX":this._x=d*h*u-l*p*m,this._y=l*p*u+d*h*m,this._z=l*h*m-d*p*u,this._w=l*h*u+d*p*m;break;case"YZX":this._x=d*h*u+l*p*m,this._y=l*p*u+d*h*m,this._z=l*h*m-d*p*u,this._w=l*h*u-d*p*m;break;case"XZY":this._x=d*h*u-l*p*m,this._y=l*p*u-d*h*m,this._z=l*h*m+d*p*u,this._w=l*h*u+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ga.copy(this).projectOnVector(e),this.sub(Ga)}reflect(e){return this.sub(Ga.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ga=new w,Bl=new en,ze=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],m=n[8],y=i[0],f=i[3],g=i[6],v=i[1],x=i[4],S=i[7],R=i[2],I=i[5],G=i[8];return s[0]=a*y+o*v+c*R,s[3]=a*f+o*x+c*I,s[6]=a*g+o*S+c*G,s[1]=l*y+h*v+u*R,s[4]=l*f+h*x+u*I,s[7]=l*g+h*S+u*G,s[2]=d*y+p*v+m*R,s[5]=d*f+p*x+m*I,s[8]=d*g+p*S+m*G,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,p=l*s-a*c,m=t*u+n*d+i*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=u*y,e[1]=(i*l-h*n)*y,e[2]=(o*n-i*a)*y,e[3]=d*y,e[4]=(h*t-i*c)*y,e[5]=(i*s-o*t)*y,e[6]=p*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Va.makeScale(e,t)),this}rotate(e){return this.premultiply(Va.makeRotation(-e)),this}translate(e,t){return this.premultiply(Va.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Va=new ze;function ml(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function wr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function th(){let r=wr("canvas");return r.style.display="block",r}var zl={};function Xi(r){r in zl||(zl[r]=!0,console.warn(r))}function nh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Gl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kh(){let r={enabled:!0,workingColorSpace:pi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Ke&&(i.r=Ln(i.r),i.g=Ln(i.g),i.b=Ln(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(i.r=Hi(i.r),i.g=Hi(i.g),i.b=Hi(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?br:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Xi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Xi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[pi]:{primaries:e,whitePoint:n,transfer:br,toXYZ:Gl,fromXYZ:Vl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:at},outputColorSpaceConfig:{drawingBufferColorSpace:at}},[at]:{primaries:e,whitePoint:n,transfer:Ke,toXYZ:Gl,fromXYZ:Vl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:at}}}),r}var Ze=kh();function Ln(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Hi(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var Li,Is=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=wr("canvas")),Li.width=e.width,Li.height=e.height;let i=Li.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*Ln(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Ln(t[n]/255)):t[n]=Ln(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Hh=0,ji=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=sr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ka(i[a].image)):s.push(ka(i[a]))}else s=ka(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function ka(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Is.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Wh=0,Ha=new w,Lt=class r extends Un{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=sr(),this.name="",this.source=new ji(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ha).x}get height(){return this.source.getSize(Ha).y}get depth(){return this.source.getSize(Ha).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Io)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case di:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case As:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case di:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case As:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Lt.DEFAULT_IMAGE=null,Lt.DEFAULT_MAPPING=Io,Lt.DEFAULT_ANISOTROPY=1;var Je=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],m=c[9],y=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+f)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(l+1)/2,S=(p+1)/2,R=(g+1)/2,I=(h+d)/4,G=(u+y)/4,H=(m+f)/4;return x>S&&x>R?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=I/n,s=G/n):S>R?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=I/i,s=H/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=G/s,i=H/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-m)*(f-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-m)/v,this.y=(u-y)/v,this.z=(d-h)/v,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ps=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Lt(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ji(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends Ps{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Er=class extends Lt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=_n,this.minFilter=_n,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ls=class extends Lt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=_n,this.minFilter=_n,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kt):Kt.fromBufferAttribute(s,a),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),ns.subVectors(this.max,mr),Di.subVectors(e.a,mr),Ui.subVectors(e.b,mr),Ni.subVectors(e.c,mr),Hn.subVectors(Ui,Di),Wn.subVectors(Ni,Ui),oi.subVectors(Di,Ni);let t=[0,-Hn.z,Hn.y,0,-Wn.z,Wn.y,0,-oi.z,oi.y,Hn.z,0,-Hn.x,Wn.z,0,-Wn.x,oi.z,0,-oi.x,-Hn.y,Hn.x,0,-Wn.y,Wn.x,0,-oi.y,oi.x,0];return!!Wa(t,Di,Ui,Ni,ns)&&(t=[1,0,0,0,1,0,0,0,1],!!Wa(t,Di,Ui,Ni,ns)&&(is.crossVectors(Hn,Wn),t=[is.x,is.y,is.z],Wa(t,Di,Ui,Ni,ns)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Kt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},En=[new w,new w,new w,new w,new w,new w,new w,new w],Kt=new w,ts=new tn,Di=new w,Ui=new w,Ni=new w,Hn=new w,Wn=new w,oi=new w,mr=new w,ns=new w,is=new w,li=new w;function Wa(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){li.fromArray(r,s);let o=i.x*Math.abs(li.x)+i.y*Math.abs(li.y)+i.z*Math.abs(li.z),c=e.dot(li),l=t.dot(li),h=n.dot(li);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Xh=new tn,fr=new w,Xa=new w,nn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xh.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);let t=fr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(fr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(Xa)),this.expandByPoint(fr.copy(e.center).sub(Xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},An=new w,ja=new w,rs=new w,Xn=new w,qa=new w,ss=new w,Ya=new w,mi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ja.copy(e).add(t).multiplyScalar(.5),rs.copy(t).sub(e).normalize(),Xn.copy(this.origin).sub(ja);let s=.5*e.distanceTo(t),a=-this.direction.dot(rs),o=Xn.dot(this.direction),c=-Xn.dot(rs),l=Xn.lengthSq(),h=Math.abs(1-a*a),u,d,p,m;if(h>0)if(u=a*c-o,d=a*o-c,m=s*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,p=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ja).addScaledVector(rs,d),p}intersectSphere(e,t){An.subVectors(e.center,this.origin);let n=An.dot(this.direction),i=An.dot(An)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,n,i,s){qa.subVectors(t,e),ss.subVectors(n,e),Ya.crossVectors(qa,ss);let a,o=this.direction.dot(Ya);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Xn.subVectors(this.origin,e);let c=a*this.direction.dot(ss.crossVectors(Xn,ss));if(c<0)return null;let l=a*this.direction.dot(qa.cross(Xn));if(l<0||c+l>o)return null;let h=-a*Xn.dot(Ya);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Be=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,p,m,y,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,p,m,y,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,p,m,y,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=m,g[11]=y,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Fi.setFromMatrixColumn(e,0).length(),s=1/Fi.setFromMatrixColumn(e,1).length(),a=1/Fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,m=o*h,y=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+m*l,t[5]=d-y*l,t[9]=-o*c,t[2]=y-d*l,t[6]=m+p*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,m=l*h,y=l*u;t[0]=d+y*o,t[4]=m*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-m,t[6]=y+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,m=l*h,y=l*u;t[0]=d-y*o,t[4]=-a*u,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*h,t[9]=y-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,p=a*u,m=o*h,y=o*u;t[0]=c*h,t[4]=m*l-p,t[8]=d*l+y,t[1]=c*u,t[5]=y*l+d,t[9]=p*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,p=a*l,m=o*c,y=o*l;t[0]=c*h,t[4]=y-d*u,t[8]=m*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*u+m,t[10]=d-y*u}else if(e.order==="XZY"){let d=a*c,p=a*l,m=o*c,y=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+y,t[5]=a*h,t[9]=p*u-m,t[2]=m*u-p,t[6]=o*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jh,e,qh)}lookAt(e,t,n){let i=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),jn.crossVectors(n,Nt),jn.lengthSq()===0&&(Math.abs(n.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),jn.crossVectors(n,Nt)),jn.normalize(),as.crossVectors(Nt,jn),i[0]=jn.x,i[4]=as.x,i[8]=Nt.x,i[1]=jn.y,i[5]=as.y,i[9]=Nt.y,i[2]=jn.z,i[6]=as.z,i[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],m=n[2],y=n[6],f=n[10],g=n[14],v=n[3],x=n[7],S=n[11],R=n[15],I=i[0],G=i[4],H=i[8],O=i[12],J=i[1],K=i[5],k=i[9],q=i[13],X=i[2],$=i[6],Q=i[10],oe=i[14],re=i[3],ve=i[7],Ae=i[11],Ee=i[15];return s[0]=a*I+o*J+c*X+l*re,s[4]=a*G+o*K+c*$+l*ve,s[8]=a*H+o*k+c*Q+l*Ae,s[12]=a*O+o*q+c*oe+l*Ee,s[1]=h*I+u*J+d*X+p*re,s[5]=h*G+u*K+d*$+p*ve,s[9]=h*H+u*k+d*Q+p*Ae,s[13]=h*O+u*q+d*oe+p*Ee,s[2]=m*I+y*J+f*X+g*re,s[6]=m*G+y*K+f*$+g*ve,s[10]=m*H+y*k+f*Q+g*Ae,s[14]=m*O+y*q+f*oe+g*Ee,s[3]=v*I+x*J+S*X+R*re,s[7]=v*G+x*K+S*$+R*ve,s[11]=v*H+x*k+S*Q+R*Ae,s[15]=v*O+x*q+S*oe+R*Ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*p-n*c*p)+e[7]*(+t*c*p-t*l*d+s*a*d-i*a*p+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*p-s*a*u+n*a*p+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],m=e[12],y=e[13],f=e[14],g=e[15],v=u*f*l-y*d*l+y*c*p-o*f*p-u*c*g+o*d*g,x=m*d*l-h*f*l-m*c*p+a*f*p+h*c*g-a*d*g,S=h*y*l-m*u*l+m*o*p-a*y*p-h*o*g+a*u*g,R=m*u*c-h*y*c-m*o*d+a*y*d+h*o*f-a*u*f,I=t*v+n*x+i*S+s*R;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return e[0]=v*G,e[1]=(y*d*s-u*f*s-y*i*p+n*f*p+u*i*g-n*d*g)*G,e[2]=(o*f*s-y*c*s+y*i*l-n*f*l-o*i*g+n*c*g)*G,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*p-n*c*p)*G,e[4]=x*G,e[5]=(h*f*s-m*d*s+m*i*p-t*f*p-h*i*g+t*d*g)*G,e[6]=(m*c*s-a*f*s-m*i*l+t*f*l+a*i*g-t*c*g)*G,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*p+t*c*p)*G,e[8]=S*G,e[9]=(m*u*s-h*y*s-m*n*p+t*y*p+h*n*g-t*u*g)*G,e[10]=(a*y*s-m*o*s+m*n*l-t*y*l-a*n*g+t*o*g)*G,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*p-t*o*p)*G,e[12]=R*G,e[13]=(h*y*i-m*u*i+m*n*d-t*y*d-h*n*f+t*u*f)*G,e[14]=(m*o*i-a*y*i-m*n*c+t*y*c+a*n*f-t*o*f)*G,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*G,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,p=s*h,m=s*u,y=a*h,f=a*u,g=o*u,v=c*l,x=c*h,S=c*u,R=n.x,I=n.y,G=n.z;return i[0]=(1-(y+g))*R,i[1]=(p+S)*R,i[2]=(m-x)*R,i[3]=0,i[4]=(p-S)*I,i[5]=(1-(d+g))*I,i[6]=(f+v)*I,i[7]=0,i[8]=(m+x)*G,i[9]=(f-v)*G,i[10]=(1-(d+y))*G,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Fi.set(i[0],i[1],i[2]).length(),a=Fi.set(i[4],i[5],i[6]).length(),o=Fi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],$t.copy(this);let c=1/s,l=1/a,h=1/o;return $t.elements[0]*=c,$t.elements[1]*=c,$t.elements[2]*=c,$t.elements[4]*=l,$t.elements[5]*=l,$t.elements[6]*=l,$t.elements[8]*=h,$t.elements[9]*=h,$t.elements[10]*=h,t.setFromRotationMatrix($t),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),m,y;if(c)m=s/(a-s),y=a*s/(a-s);else if(o===Dn)m=-(a+s)/(a-s),y=-2*a*s/(a-s);else{if(o!==Tr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),y=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),m,y;if(c)m=1/(a-s),y=a/(a-s);else if(o===Dn)m=-2/(a-s),y=-(a+s)/(a-s);else{if(o!==Tr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),y=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Fi=new w,$t=new Be,jh=new w(0,0,0),qh=new w(1,1,1),jn=new w,as=new w,Nt=new w,kl=new Be,Hl=new en,rn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rn.DEFAULT_ORDER="XYZ";var Ar=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Yh=0,Wl=new w,Oi=new en,Cn=new Be,os=new w,gr=new w,Zh=new w,Jh=new en,Xl=new w(1,0,0),jl=new w(0,1,0),ql=new w(0,0,1),Yl={type:"added"},Kh={type:"removed"},Bi={type:"childadded",child:null},Za={type:"childremoved",child:null},At=class r extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new rn,n=new en,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Be},normalMatrix:{value:new ze}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(Xl,e)}rotateY(e){return this.rotateOnAxis(jl,e)}rotateZ(e){return this.rotateOnAxis(ql,e)}translateOnAxis(e,t){return Wl.copy(e).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xl,e)}translateY(e){return this.translateOnAxis(jl,e)}translateZ(e){return this.translateOnAxis(ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?os.copy(e):os.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(gr,os,this.up):Cn.lookAt(os,gr,this.up),this.quaternion.setFromRotationMatrix(Cn),i&&(Cn.extractRotation(i.matrixWorld),Oi.setFromRotationMatrix(Cn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yl),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kh),Za.child=e,this.dispatchEvent(Za),Za.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yl),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,Zh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,Jh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};At.DEFAULT_UP=new w(0,1,0),At.DEFAULT_MATRIX_AUTO_UPDATE=!0,At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qt=new w,Rn=new w,Ja=new w,In=new w,zi=new w,Gi=new w,Zl=new w,Ka=new w,$a=new w,Qa=new w,eo=new Je,to=new Je,no=new Je,Pn=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Qt.subVectors(e,t),i.cross(Qt);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Qt.subVectors(i,t),Rn.subVectors(n,t),Ja.subVectors(e,t);let a=Qt.dot(Qt),o=Qt.dot(Rn),c=Qt.dot(Ja),l=Rn.dot(Rn),h=Rn.dot(Ja),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-p-m,m,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,In)!==null&&In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,In)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,In.x),c.addScaledVector(a,In.y),c.addScaledVector(o,In.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return eo.setScalar(0),to.setScalar(0),no.setScalar(0),eo.fromBufferAttribute(e,t),to.fromBufferAttribute(e,n),no.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(eo,s.x),a.addScaledVector(to,s.y),a.addScaledVector(no,s.z),a}static isFrontFacing(e,t,n,i){return Qt.subVectors(n,t),Rn.subVectors(e,t),Qt.cross(Rn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),.5*Qt.cross(Rn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;zi.subVectors(i,n),Gi.subVectors(s,n),Ka.subVectors(e,n);let c=zi.dot(Ka),l=Gi.dot(Ka);if(c<=0&&l<=0)return t.copy(n);$a.subVectors(e,i);let h=zi.dot($a),u=Gi.dot($a);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(zi,a);Qa.subVectors(e,s);let p=zi.dot(Qa),m=Gi.dot(Qa);if(m>=0&&p<=m)return t.copy(s);let y=p*l-c*m;if(y<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Gi,o);let f=h*m-p*u;if(f<=0&&u-h>=0&&p-m>=0)return Zl.subVectors(s,i),o=(u-h)/(u-h+(p-m)),t.copy(i).addScaledVector(Zl,o);let g=1/(f+y+d);return a=y*g,o=d*g,t.copy(n).addScaledVector(zi,a).addScaledVector(Gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ih={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},ls={h:0,s:0,l:0};function io(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=at){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=Vh(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=io(a,s,e+1/3),this.g=io(a,s,e),this.b=io(a,s,e-1/3)}return Ze.colorSpaceToWorking(this,i),this}setStyle(e,t=at){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=at){let n=ih[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ln(e.r),this.g=Ln(e.g),this.b=Ln(e.b),this}copyLinearToSRGB(e){return this.r=Hi(e.r),this.g=Hi(e.g),this.b=Hi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=at){return Ze.workingToColorSpace(Et.copy(this),e),65536*Math.round(We(255*Et.r,0,255))+256*Math.round(We(255*Et.g,0,255))+Math.round(We(255*Et.b,0,255))}getHexString(e=at){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Et.copy(this),t);let n=Et.r,i=Et.g,s=Et.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=at){Ze.workingToColorSpace(Et.copy(this),e);let t=Et.r,n=Et.g,i=Et.b;return e!==at?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(qn),this.setHSL(qn.h+e,qn.s+t,qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qn),e.getHSL(ls);let n=za(qn.h,ls.h,t),i=za(qn.s,ls.s,t),s=za(qn.l,ls.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Et=new Oe;Oe.NAMES=ih;var $h=0,Nn=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=sr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ui,this.stencilZFail=ui,this.stencilZPass=ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Fn=class extends Nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ep=Qh();function Qh(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var ut=new w,cs=new ae,eu=0,Bt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vo,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cs.fromBufferAttribute(this,t),cs.applyMatrix3(e),this.setXY(t,cs.x,cs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vo&&(e.usage=this.usage),e}};var Cr=class extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Rr=class extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Re=class extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}},tu=0,Xt=new Be,ro=new At,Vi=new w,Ft=new tn,_r=new tn,vt=new w,$e=class r extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=sr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ml(e)?Rr:Cr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return ro.lookAt(e),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Re(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Ft.setFromBufferAttribute(s),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Ft.min,_r.min),Ft.expandByPoint(vt),vt.addVectors(Ft.max,_r.max),Ft.expandByPoint(vt)):(Ft.expandByPoint(_r.min),Ft.expandByPoint(_r.max))}Ft.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)vt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(vt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)vt.fromBufferAttribute(o,l),c&&(Vi.fromBufferAttribute(e,l),vt.add(Vi)),i=Math.max(i,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let H=0;H<n.count;H++)o[H]=new w,c[H]=new w;let l=new w,h=new w,u=new w,d=new ae,p=new ae,m=new ae,y=new w,f=new w;function g(H,O,J){l.fromBufferAttribute(n,H),h.fromBufferAttribute(n,O),u.fromBufferAttribute(n,J),d.fromBufferAttribute(s,H),p.fromBufferAttribute(s,O),m.fromBufferAttribute(s,J),h.sub(l),u.sub(l),p.sub(d),m.sub(d);let K=1/(p.x*m.y-m.x*p.y);isFinite(K)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(u,-p.y).multiplyScalar(K),f.copy(u).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(K),o[H].add(y),o[O].add(y),o[J].add(y),c[H].add(f),c[O].add(f),c[J].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let H=0,O=v.length;H<O;++H){let J=v[H],K=J.start;for(let k=K,q=K+J.count;k<q;k+=3)g(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let x=new w,S=new w,R=new w,I=new w;function G(H){R.fromBufferAttribute(i,H),I.copy(R);let O=o[H];x.copy(O),x.sub(R.multiplyScalar(R.dot(O))).normalize(),S.crossVectors(I,O);let J=S.dot(c[H])<0?-1:1;a.setXYZW(H,x.x,x.y,x.z,J)}for(let H=0,O=v.length;H<O;++H){let J=v[H],K=J.start;for(let k=K,q=K+J.count;k<q;k+=3)G(e.getX(k+0)),G(e.getX(k+1)),G(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){let m=e.getX(d+0),y=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),p=0,m=0;for(let y=0,f=c.length;y<f;y++){p=o.isInterleavedBufferAttribute?c[y]*o.data.stride+o.offset:c[y]*h;for(let g=0;g<h;g++)d[m++]=l[p++]}return new Bt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jl=new Be,ci=new mi,hs=new nn,Kl=new w,us=new w,ds=new w,ps=new w,so=new w,ms=new w,$l=new w,fs=new w,ft=class extends At{constructor(e=new $e,t=new Fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){ms.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(so.fromBufferAttribute(u,e),a?ms.addScaledVector(so,h):ms.addScaledVector(so.sub(t),h))}t.add(ms)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),hs.copy(n.boundingSphere),hs.applyMatrix4(s),ci.copy(e.ray).recast(e.near),hs.containsPoint(ci.origin)===!1&&(ci.intersectSphere(hs,Kl)===null||ci.origin.distanceToSquared(Kl)>(e.far-e.near)**2))return;Jl.copy(s).invert(),ci.copy(e.ray).applyMatrix4(Jl),n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,ci)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let f=d[m],g=a[f.materialIndex];for(let v=Math.max(f.start,p.start),x=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));v<x;v+=3)i=gs(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let m=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);m<y;m+=3)i=gs(this,a,e,n,l,h,u,o.getX(m),o.getX(m+1),o.getX(m+2)),i&&(i.faceIndex=Math.floor(m/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let f=d[m],g=a[f.materialIndex];for(let v=Math.max(f.start,p.start),x=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));v<x;v+=3)i=gs(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let m=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);m<y;m+=3)i=gs(this,a,e,n,l,h,u,m,m+1,m+2),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}};function gs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,us),r.getVertexPosition(c,ds),r.getVertexPosition(l,ps);let h=(function(u,d,p,m,y,f,g,v){let x;if(x=d.side===1?m.intersectTriangle(g,f,y,!0,v):m.intersectTriangle(y,f,g,d.side===0,v),x===null)return null;fs.copy(v),fs.applyMatrix4(u.matrixWorld);let S=p.ray.origin.distanceTo(fs);return S<p.near||S>p.far?null:{distance:S,point:fs.clone(),object:u}})(r,e,t,n,us,ds,ps,$l);if(h){let u=new w;Pn.getBarycoord($l,us,ds,ps,u),i&&(h.uv=Pn.getInterpolatedAttribute(i,o,c,l,u,new ae)),s&&(h.uv1=Pn.getInterpolatedAttribute(s,o,c,l,u,new ae)),a&&(h.normal=Pn.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};Pn.getNormal(us,ds,ps,d.normal),h.face=d,h.barycoord=u}return h}var dt=class r extends $e{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,p=0;function m(y,f,g,v,x,S,R,I,G,H,O){let J=S/G,K=R/H,k=S/2,q=R/2,X=I/2,$=G+1,Q=H+1,oe=0,re=0,ve=new w;for(let Ae=0;Ae<Q;Ae++){let Ee=Ae*K-q;for(let Le=0;Le<$;Le++){let he=Le*J-k;ve[y]=he*v,ve[f]=Ee*x,ve[g]=X,l.push(ve.x,ve.y,ve.z),ve[y]=0,ve[f]=0,ve[g]=I>0?1:-1,h.push(ve.x,ve.y,ve.z),u.push(Le/G),u.push(1-Ae/H),oe+=1}}for(let Ae=0;Ae<H;Ae++)for(let Ee=0;Ee<G;Ee++){let Le=d+Ee+$*Ae,he=d+Ee+$*(Ae+1),de=d+(Ee+1)+$*(Ae+1),ue=d+(Ee+1)+$*Ae;c.push(Le,he,ue),c.push(he,de,ue),re+=6}o.addGroup(p,re,O),p+=re,d+=oe}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ti(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Rt(r){let e={};for(let t=0;t<r.length;t++){let n=Ti(r[t]);for(let i in n)e[i]=n[i]}return e}function fl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var rh={clone:Ti,merge:Rt},zt=class extends Nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ti(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},qi=class extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Yn=new w,Ql=new ae,ec=new ae,Mt=class extends qi{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Rs*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Es*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Rs*Math.atan(Math.tan(.5*Es*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z)}getViewSize(e,t){return this.getViewBounds(e,Ql,ec),t.subVectors(ec,Ql)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Es*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ki=-90,Ds=class extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Mt(ki,1,e,t);i.layers=this.layers,this.add(i);let s=new Mt(ki,1,e,t);s.layers=this.layers,this.add(s);let a=new Mt(ki,1,e,t);a.layers=this.layers,this.add(a);let o=new Mt(ki,1,e,t);o.layers=this.layers,this.add(o);let c=new Mt(ki,1,e,t);c.layers=this.layers,this.add(c);let l=new Mt(ki,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Tr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ir=class extends Lt{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Us=class extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ir(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new dt(5,5,5),s=new zt({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ft(i,s),o=t.minFilter;return t.minFilter===Mi&&(t.minFilter=vn),new Ds(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},et=class extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}},nu={type:"move"},Yi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,n),g=this._getHandJoint(l,y);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,m=.005;l.inputState.pinching&&d>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new et;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var fi=class extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var tp=new w;var np=new w,ip=new w,rp=new w,sp=new ae,ap=new ae,op=new Be,lp=new w,cp=new w,hp=new w,up=new ae,dp=new ae,pp=new ae;var mp=new w,fp=new w;var gp=new w,_p=new Je,vp=new Je,yp=new w,xp=new Be,Mp=new w,Sp=new nn,bp=new Be,Tp=new mi;var wp=new Be,Ep=new Be;var Ap=new Be,Cp=new Be;var Rp=new tn,Ip=new Be,Pp=new ft,Lp=new nn;var ao=new w,iu=new w,ru=new ze,fn=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ao.subVectors(n,t).cross(iu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ao),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ru.getNormalMatrix(e),i=this.coplanarPoint(ao).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},hi=new nn,su=new ae(.5,.5),_s=new w,Kn=class{constructor(e=new fn,t=new fn,n=new fn,i=new fn,s=new fn,a=new fn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],p=s[7],m=s[8],y=s[9],f=s[10],g=s[11],v=s[12],x=s[13],S=s[14],R=s[15];if(i[0].setComponents(l-a,p-h,g-m,R-v).normalize(),i[1].setComponents(l+a,p+h,g+m,R+v).normalize(),i[2].setComponents(l+o,p+u,g+y,R+x).normalize(),i[3].setComponents(l-o,p-u,g-y,R-x).normalize(),n)i[4].setComponents(c,d,f,S).normalize(),i[5].setComponents(l-c,p-d,g-f,R-S).normalize();else if(i[4].setComponents(l-c,p-d,g-f,R-S).normalize(),t===Dn)i[5].setComponents(l+c,p+d,g+f,R+S).normalize();else{if(t!==Tr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,S).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){hi.center.set(0,0,0);let t=su.distanceTo(e.center);return hi.radius=.7071067811865476+t,hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(_s.x=i.normal.x>0?e.max.x:e.min.x,_s.y=i.normal.y>0?e.max.y:e.min.y,_s.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(_s)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},pn=new Be,mn=new Kn,Ns=class r{constructor(){this.coordinateSystem=Dn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(pn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),mn.setFromProjectionMatrix(pn,i.coordinateSystem,i.reversedDepth),mn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(pn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),mn.setFromProjectionMatrix(pn,i.coordinateSystem,i.reversedDepth),mn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(pn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),mn.setFromProjectionMatrix(pn,i.coordinateSystem,i.reversedDepth),mn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(pn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),mn.setFromProjectionMatrix(pn,i.coordinateSystem,i.reversedDepth),mn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(pn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),mn.setFromProjectionMatrix(pn,i.coordinateSystem,i.reversedDepth),mn.containsPoint(e))return!0}return!1}clone(){return new r}};var yo=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Dp=new Be,Up=new Oe(1,1,1),Np=new Kn,Fp=new Ns,Op=new tn,Bp=new nn,zp=new w,Gp=new w,Vp=new w,kp=new yo,Hp=new ft;var Wp=new w,Xp=new w,jp=new Be,qp=new mi,Yp=new nn,Zp=new w,Jp=new w;var Kp=new w,$p=new w;var Qp=new Be,em=new mi,tm=new nn,nm=new w;var Gt=class extends Lt{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Pr=class extends Lt{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==Jr&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ji(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Lr=class extends Lt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Fs=class r extends $e{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,m=2*n+s,y=i+1,f=new w,g=new w;for(let v=0;v<=m;v++){let x=0,S=0,R=0,I=0;if(v<=n){let O=v/n,J=O*Math.PI/2;S=-h-e*Math.cos(J),R=e*Math.sin(J),I=-e*Math.cos(J),x=O*u}else if(v<=n+s){let O=(v-n)/s;S=O*t-h,R=e,I=0,x=u+O*d}else{let O=(v-n-s)/n,J=O*Math.PI/2;S=h+e*Math.sin(J),R=e*Math.cos(J),I=e*Math.sin(J),x=u+d+O*u}let G=Math.max(0,Math.min(1,x/p)),H=0;v===0?H=.5/i:v===m&&(H=-.5/i);for(let O=0;O<=i;O++){let J=O/i,K=J*Math.PI*2,k=Math.sin(K),q=Math.cos(K);g.x=-R*q,g.y=S,g.z=R*k,o.push(g.x,g.y,g.z),f.set(-R*q,I,R*k),f.normalize(),c.push(f.x,f.y,f.z),l.push(J+H,G)}if(v>0){let O=(v-1)*y;for(let J=0;J<i;J++){let K=O+J,k=O+J+1,q=v*y+J,X=v*y+J+1;a.push(K,k,q),a.push(k,X,q)}}}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},$n=class r extends $e{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new ae;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("normal",new Re(o,3)),this.setAttribute("uv",new Re(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ot=class r extends $e{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],m=0,y=[],f=n/2,g=0;function v(x){let S=m,R=new ae,I=new w,G=0,H=x===!0?e:t,O=x===!0?1:-1;for(let K=1;K<=i;K++)u.push(0,f*O,0),d.push(0,O,0),p.push(.5,.5),m++;let J=m;for(let K=0;K<=i;K++){let k=K/i*c+o,q=Math.cos(k),X=Math.sin(k);I.x=H*X,I.y=f*O,I.z=H*q,u.push(I.x,I.y,I.z),d.push(0,O,0),R.x=.5*q+.5,R.y=.5*X*O+.5,p.push(R.x,R.y),m++}for(let K=0;K<i;K++){let k=S+K,q=J+K;x===!0?h.push(q,q+1,k):h.push(q+1,q,k),G+=3}l.addGroup(g,G,x===!0?1:2),g+=G}(function(){let x=new w,S=new w,R=0,I=(t-e)/n;for(let G=0;G<=s;G++){let H=[],O=G/s,J=O*(t-e)+e;for(let K=0;K<=i;K++){let k=K/i,q=k*c+o,X=Math.sin(q),$=Math.cos(q);S.x=J*X,S.y=-O*n+f,S.z=J*$,u.push(S.x,S.y,S.z),x.set(X,I,$).normalize(),d.push(x.x,x.y,x.z),p.push(k,1-O),H.push(m++)}y.push(H)}for(let G=0;G<i;G++)for(let H=0;H<s;H++){let O=y[H][G],J=y[H+1][G],K=y[H+1][G+1],k=y[H][G+1];(e>0||H!==0)&&(h.push(O,J,k),R+=3),(t>0||H!==s-1)&&(h.push(J,K,k),R+=3)}l.addGroup(g,R,0),g+=R})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Os=class r extends ot{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Qn=class r extends $e{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(p,m,y,f){let g=f+1,v=[];for(let x=0;x<=g;x++){v[x]=[];let S=p.clone().lerp(y,x/g),R=m.clone().lerp(y,x/g),I=g-x;for(let G=0;G<=I;G++)v[x][G]=G===0&&x===g?S:S.clone().lerp(R,G/I)}for(let x=0;x<g;x++)for(let S=0;S<2*(g-x)-1;S++){let R=Math.floor(S/2);S%2==0?(c(v[x][R+1]),c(v[x+1][R]),c(v[x][R])):(c(v[x][R+1]),c(v[x+1][R+1]),c(v[x+1][R]))}}function c(p){s.push(p.x,p.y,p.z)}function l(p,m){let y=3*p;m.x=e[y+0],m.y=e[y+1],m.z=e[y+2]}function h(p,m,y,f){f<0&&p.x===1&&(a[m]=p.x-1),y.x===0&&y.z===0&&(a[m]=f/2/Math.PI+.5)}function u(p){return Math.atan2(p.z,-p.x)}function d(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let m=new w,y=new w,f=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],y),l(t[g+2],f),o(m,y,f,p)})(i),(function(p){let m=new w;for(let y=0;y<s.length;y+=3)m.x=s[y+0],m.y=s[y+1],m.z=s[y+2],m.normalize().multiplyScalar(p),s[y+0]=m.x,s[y+1]=m.y,s[y+2]=m.z})(n),(function(){let p=new w;for(let m=0;m<s.length;m+=3){p.x=s[m+0],p.y=s[m+1],p.z=s[m+2];let y=u(p)/2/Math.PI+.5,f=d(p)/Math.PI+.5;a.push(y,1-f)}(function(){let m=new w,y=new w,f=new w,g=new w,v=new ae,x=new ae,S=new ae;for(let R=0,I=0;R<s.length;R+=9,I+=6){m.set(s[R+0],s[R+1],s[R+2]),y.set(s[R+3],s[R+4],s[R+5]),f.set(s[R+6],s[R+7],s[R+8]),v.set(a[I+0],a[I+1]),x.set(a[I+2],a[I+3]),S.set(a[I+4],a[I+5]),g.copy(m).add(y).add(f).divideScalar(3);let G=u(g);h(v,I+0,m,G),h(x,I+2,y,G),h(S,I+4,f,G)}})(),(function(){for(let m=0;m<a.length;m+=6){let y=a[m+0],f=a[m+2],g=a[m+4],v=Math.max(y,f,g),x=Math.min(y,f,g);v>.9&&x<.1&&(y<.2&&(a[m+0]+=1),f<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new Re(s,3)),this.setAttribute("normal",new Re(s.slice(),3)),this.setAttribute("uv",new Re(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},Bs=class r extends Qn{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},vs=new w,ys=new w,oo=new w,xs=new Pn,zs=class extends $e{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Es*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:y,b:f,c:g}=xs;if(y.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),xs.getNormal(oo),u[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let x=(v+1)%3,S=u[v],R=u[x],I=xs[h[v]],G=xs[h[x]],H=`${S}_${R}`,O=`${R}_${S}`;O in d&&d[O]?(oo.dot(d[O].normal)<=s&&(p.push(I.x,I.y,I.z),p.push(G.x,G.y,G.z)),d[O]=null):H in d||(d[H]={index0:l[v],index1:l[x],normal:oo.clone()})}}for(let m in d)if(d[m]){let{index0:y,index1:f}=d[m];vs.fromBufferAttribute(o,y),ys.fromBufferAttribute(o,f),p.push(vs.x,vs.y,vs.z),p.push(ys.x,ys.y,ys.z)}this.setAttribute("position",new Re(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Vt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ae:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new Be;for(let p=0;p<=e;p++){let m=p/e;i[p]=this.getTangentAt(m,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(We(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(o,m))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(We(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],p*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Zi=class extends Vt{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ae){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Gs=class extends Zi{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function gl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Ms=new w,lo=new gl,co=new gl,ho=new gl,pt=class extends Vt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Ms.subVectors(i[0],i[1]).add(i[0]),o=Ms);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Ms.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Ms),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(u),p),y=Math.pow(u.distanceToSquared(d),p),f=Math.pow(d.distanceToSquared(c),p);y<1e-4&&(y=1),m<1e-4&&(m=y),f<1e-4&&(f=y),lo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,m,y,f),co.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,m,y,f),ho.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,m,y,f)}else this.curveType==="catmullrom"&&(lo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),co.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),ho.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(lo.calc(h),co.calc(h),ho.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function tc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function xr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Mr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Dr=class extends Vt{constructor(e=new ae,t=new ae,n=new ae,i=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ae){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Mr(e,i.x,s.x,a.x,o.x),Mr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Vs=class extends Vt{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Mr(e,i.x,s.x,a.x,o.x),Mr(e,i.y,s.y,a.y,o.y),Mr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ur=class extends Vt{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ks=class extends Vt{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Nr=class extends Vt{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(xr(e,i.x,s.x,a.x),xr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fr=class extends Vt{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(xr(e,i.x,s.x,a.x),xr(e,i.y,s.y,a.y),xr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Or=class extends Vt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(tc(o,c.x,l.x,h.x,u.x),tc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ae().fromArray(i))}return this}},Hs=Object.freeze({__proto__:null,ArcCurve:Gs,CatmullRomCurve3:pt,CubicBezierCurve:Dr,CubicBezierCurve3:Vs,EllipseCurve:Zi,LineCurve:Ur,LineCurve3:ks,QuadraticBezierCurve:Nr,QuadraticBezierCurve3:Fr,SplineCurve:Or}),Ws=class extends Vt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hs[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Hs[i.type]().fromJSON(i))}return this}},ei=class extends Ws{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ur(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Nr(this.currentPoint.clone(),new ae(e,t),new ae(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Dr(this.currentPoint.clone(),new ae(e,t),new ae(n,i),new ae(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Or(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Zi(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},On=class extends ei{constructor(e){super(e),this.uuid=sr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new ei().fromJSON(i))}return this}};function au(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=nc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,p){let m=[];for(let y=0,f=u.length;y<f;y++){let g=nc(h,u[y]*p,y<f-1?u[y+1]*p:h.length,p,!1);g===g.next&&(g.steiner=!0),m.push(mu(g))}m.sort(uu);for(let y=0;y<m.length;y++)d=du(m[y],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let p=r[d],m=r[d+1];p<o&&(o=p),m<c&&(c=m),p>h&&(h=p),m>u&&(u=m)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Br(s,a,t,o,c,l,0),a}function nc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=ic(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=ic(a/n|0,r[a],r[a+1],s);return s&&Ji(s,s.next)&&(Gr(s),s=s.next),s}function gi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Ji(n,n.next)&&st(n.prev,n,n.next)!==0)n=n.next;else{if(Gr(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Br(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=xo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(p){let m,y=1;do{let f,g=p;p=null;let v=null;for(m=0;g;){m++;let x=g,S=0;for(let I=0;I<y&&(S++,x=x.nextZ,x);I++);let R=y;for(;S>0||R>0&&x;)S!==0&&(R===0||!x||g.z<=x.z)?(f=g,g=g.nextZ,S--):(f=x,x=x.nextZ,R--),v?v.nextZ=f:p=f,f.prevZ=v,v=f;g=x}v.nextZ=null,y*=2}while(m>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?lu(r,n,i,s):ou(r))e.push(c.i,r.i,l.i),Gr(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?Br(r=cu(gi(r),e),e,t,n,i,s,2):a===2&&hu(r,e,t,n,i,s):Br(gi(r),e,t,n,i,s,1);break}}}function ou(r){let e=r.prev,t=r,n=r.next;if(st(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),p=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=p&&yr(i,o,s,c,a,l,m.x,m.y)&&st(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function lu(r,e,t,n){let i=r.prev,s=r,a=r.next;if(st(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,p=Math.min(o,c,l),m=Math.min(h,u,d),y=Math.max(o,c,l),f=Math.max(h,u,d),g=xo(p,m,e,t,n),v=xo(y,f,e,t,n),x=r.prevZ,S=r.nextZ;for(;x&&x.z>=g&&S&&S.z<=v;){if(x.x>=p&&x.x<=y&&x.y>=m&&x.y<=f&&x!==i&&x!==a&&yr(o,h,c,u,l,d,x.x,x.y)&&st(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=p&&S.x<=y&&S.y>=m&&S.y<=f&&S!==i&&S!==a&&yr(o,h,c,u,l,d,S.x,S.y)&&st(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=g;){if(x.x>=p&&x.x<=y&&x.y>=m&&x.y<=f&&x!==i&&x!==a&&yr(o,h,c,u,l,d,x.x,x.y)&&st(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=v;){if(S.x>=p&&S.x<=y&&S.y>=m&&S.y<=f&&S!==i&&S!==a&&yr(o,h,c,u,l,d,S.x,S.y)&&st(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function cu(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Ji(n,i)&&ah(n,t,t.next,i)&&zr(n,i)&&zr(i,n)&&(e.push(n.i,t.i,i.i),Gr(t),Gr(t.next),t=r=i),t=t.next}while(t!==r);return gi(t)}function hu(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&fu(a,o)){let c=oh(a,o);return a=gi(a,a.next),c=gi(c,c.next),Br(a,e,t,n,i,s,0),void Br(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function uu(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function du(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Ji(i,a))return a;do{if(Ji(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let y=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(y<=o&&y>h&&(h=y,l=a.x<a.next.x?a:a.next,y===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,p=l.y,m=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&sh(c<p?o:h,c,d,p,c<p?h:o,c,a.x,a.y)){let y=Math.abs(c-a.y)/(o-a.x);zr(a,i)&&(y<m||y===m&&(a.x>l.x||a.x===l.x&&pu(l,a)))&&(l=a,m=y)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=oh(t,r);return gi(n,n.next),gi(t,t.next)}function pu(r,e){return st(r.prev,r,e.prev)<0&&st(e.next,r,r.next)<0}function xo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function mu(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function sh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function yr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&sh(r,e,t,n,i,s,a,o)}function fu(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&ah(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(zr(r,e)&&zr(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(st(r.prev,r,e.prev)||st(r,e.prev,e))||Ji(r,e)&&st(r.prev,r,r.next)>0&&st(e.prev,e,e.next)>0)}function st(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ji(r,e){return r.x===e.x&&r.y===e.y}function ah(r,e,t,n){let i=bs(st(r,e,t)),s=bs(st(r,e,n)),a=bs(st(t,n,r)),o=bs(st(t,n,e));return i!==s&&a!==o||!(i!==0||!Ss(r,t,e))||!(s!==0||!Ss(r,n,e))||!(a!==0||!Ss(t,r,n))||!(o!==0||!Ss(t,e,n))}function Ss(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function bs(r){return r>0?1:r<0?-1:0}function zr(r,e){return st(r.prev,r,r.next)<0?st(r,e,r.next)>=0&&st(r,r.prev,e)>=0:st(r,e,r.prev)<0||st(r,r.next,e)<0}function oh(r,e){let t=Mo(r.i,r.x,r.y),n=Mo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function ic(r,e,t,n){let i=Mo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Gr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Mo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var So=class{static triangulate(e,t,n=2){return au(e,t,n)}},gn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];rc(e),sc(n,e);let a=e.length;t.forEach(rc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,sc(n,t[c]);let o=So.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function rc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function sc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Bn=class r extends $e{constructor(e=new On([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:gu,x,S,R,I,G,H=!1;g&&(x=g.getSpacedPoints(h),H=!0,d=!1,S=g.computeFrenetFrames(h,!1),R=new w,I=new w,G=new w),d||(f=0,p=0,m=0,y=0);let O=o.extractPoints(l),J=O.shape,K=O.holes;if(!gn.isClockWise(J)){J=J.reverse();for(let U=0,M=K.length;U<M;U++){let C=K[U];gn.isClockWise(C)&&(K[U]=C.reverse())}}function k(U){let M=10000000000000001e-36,C=U[0];for(let z=1;z<=U.length;z++){let L=z%U.length,te=U[L],Y=te.x-C.x,j=te.y-C.y,le=Y*Y+j*j,fe=Math.max(Math.abs(te.x),Math.abs(te.y),Math.abs(C.x),Math.abs(C.y));le<=M*fe*fe?(U.splice(L,1),z--):C=te}}k(J),K.forEach(k);let q=K.length,X=J;for(let U=0;U<q;U++){let M=K[U];J=J.concat(M)}function $(U,M,C){return M||console.error("THREE.ExtrudeGeometry: vec does not exist"),U.clone().addScaledVector(M,C)}let Q=J.length;function oe(U,M,C){let z,L,te,Y=U.x-M.x,j=U.y-M.y,le=C.x-U.x,fe=C.y-U.y,ce=Y*Y+j*j,ye=Y*fe-j*le;if(Math.abs(ye)>Number.EPSILON){let we=Math.sqrt(ce),Ce=Math.sqrt(le*le+fe*fe),ke=M.x-j/we,Xe=M.y+Y/we,Ye=((C.x-fe/Ce-ke)*fe-(C.y+le/Ce-Xe)*le)/(Y*fe-j*le);z=ke+Y*Ye-U.x,L=Xe+j*Ye-U.y;let pe=z*z+L*L;if(pe<=2)return new ae(z,L);te=Math.sqrt(pe/2)}else{let we=!1;Y>Number.EPSILON?le>Number.EPSILON&&(we=!0):Y<-Number.EPSILON?le<-Number.EPSILON&&(we=!0):Math.sign(j)===Math.sign(fe)&&(we=!0),we?(z=-j,L=Y,te=Math.sqrt(ce)):(z=Y,L=j,te=Math.sqrt(ce/2))}return new ae(z/te,L/te)}let re=[];for(let U=0,M=X.length,C=M-1,z=U+1;U<M;U++,C++,z++)C===M&&(C=0),z===M&&(z=0),re[U]=oe(X[U],X[C],X[z]);let ve=[],Ae,Ee,Le=re.concat();for(let U=0,M=q;U<M;U++){let C=K[U];Ae=[];for(let z=0,L=C.length,te=L-1,Y=z+1;z<L;z++,te++,Y++)te===L&&(te=0),Y===L&&(Y=0),Ae[z]=oe(C[z],C[te],C[Y]);ve.push(Ae),Le=Le.concat(Ae)}if(f===0)Ee=gn.triangulateShape(X,K);else{let U=[],M=[];for(let C=0;C<f;C++){let z=C/f,L=p*Math.cos(z*Math.PI/2),te=m*Math.sin(z*Math.PI/2)+y;for(let Y=0,j=X.length;Y<j;Y++){let le=$(X[Y],re[Y],te);Ie(le.x,le.y,-L),z===0&&U.push(le)}for(let Y=0,j=q;Y<j;Y++){let le=K[Y];Ae=ve[Y];let fe=[];for(let ce=0,ye=le.length;ce<ye;ce++){let we=$(le[ce],Ae[ce],te);Ie(we.x,we.y,-L),z===0&&fe.push(we)}z===0&&M.push(fe)}}Ee=gn.triangulateShape(U,M)}let he=Ee.length,de=m+y;for(let U=0;U<Q;U++){let M=d?$(J[U],Le[U],de):J[U];H?(I.copy(S.normals[0]).multiplyScalar(M.x),R.copy(S.binormals[0]).multiplyScalar(M.y),G.copy(x[0]).add(I).add(R),Ie(G.x,G.y,G.z)):Ie(M.x,M.y,0)}for(let U=1;U<=h;U++)for(let M=0;M<Q;M++){let C=d?$(J[M],Le[M],de):J[M];H?(I.copy(S.normals[U]).multiplyScalar(C.x),R.copy(S.binormals[U]).multiplyScalar(C.y),G.copy(x[U]).add(I).add(R),Ie(G.x,G.y,G.z)):Ie(C.x,C.y,u/h*U)}for(let U=f-1;U>=0;U--){let M=U/f,C=p*Math.cos(M*Math.PI/2),z=m*Math.sin(M*Math.PI/2)+y;for(let L=0,te=X.length;L<te;L++){let Y=$(X[L],re[L],z);Ie(Y.x,Y.y,u+C)}for(let L=0,te=K.length;L<te;L++){let Y=K[L];Ae=ve[L];for(let j=0,le=Y.length;j<le;j++){let fe=$(Y[j],Ae[j],z);H?Ie(fe.x,fe.y+x[h-1].y,x[h-1].x+C):Ie(fe.x,fe.y,u+C)}}}function ue(U,M){let C=U.length;for(;--C>=0;){let z=C,L=C-1;L<0&&(L=U.length-1);for(let te=0,Y=h+2*f;te<Y;te++){let j=Q*te,le=Q*(te+1);E(M+z+j,M+L+j,M+L+le,M+z+le)}}}function Ie(U,M,C){c.push(U),c.push(M),c.push(C)}function Ne(U,M,C){T(U),T(M),T(C);let z=i.length/3,L=v.generateTopUV(n,i,z-3,z-2,z-1);V(L[0]),V(L[1]),V(L[2])}function E(U,M,C,z){T(U),T(M),T(z),T(M),T(C),T(z);let L=i.length/3,te=v.generateSideWallUV(n,i,L-6,L-3,L-2,L-1);V(te[0]),V(te[1]),V(te[3]),V(te[1]),V(te[2]),V(te[3])}function T(U){i.push(c[3*U+0]),i.push(c[3*U+1]),i.push(c[3*U+2])}function V(U){s.push(U.x),s.push(U.y)}(function(){let U=i.length/3;if(d){let M=0,C=Q*M;for(let z=0;z<he;z++){let L=Ee[z];Ne(L[2]+C,L[1]+C,L[0]+C)}M=h+2*f,C=Q*M;for(let z=0;z<he;z++){let L=Ee[z];Ne(L[0]+C,L[1]+C,L[2]+C)}}else{for(let M=0;M<he;M++){let C=Ee[M];Ne(C[2],C[1],C[0])}for(let M=0;M<he;M++){let C=Ee[M];Ne(C[0]+Q*h,C[1]+Q*h,C[2]+Q*h)}}n.addGroup(U,i.length/3-U,0)})(),(function(){let U=i.length/3,M=0;ue(X,M),M+=X.length;for(let C=0,z=K.length;C<z;C++){let L=K[C];ue(L,M),M+=L.length}n.addGroup(U,i.length/3-U,1)})()}this.setAttribute("position",new Re(i,3)),this.setAttribute("uv",new Re(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Hs[i.type]().fromJSON(i)),new r(n,e.options)}},gu={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ae(s,a),new ae(o,c),new ae(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],m=e[3*i+2],y=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ae(a,1-c),new ae(l,1-u),new ae(d,1-m),new ae(y,1-g)]:[new ae(o,1-c),new ae(h,1-u),new ae(p,1-m),new ae(f,1-g)]}},Xs=class r extends Qn{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ki=class r extends $e{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=We(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new ae,p=new w,m=new w,y=new w,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,p.x=1*g,p.y=-f,p.z=0*g,y.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(y.x,y.y,y.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,p.x=1*g,p.y=-f,p.z=0*g,m.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),c.push(p.x,p.y,p.z),y.copy(m)}for(let v=0;v<=t;v++){let x=n+v*h*i,S=Math.sin(x),R=Math.cos(x);for(let I=0;I<=e.length-1;I++){u.x=e[I].x*S,u.y=e[I].y,u.z=e[I].x*R,a.push(u.x,u.y,u.z),d.x=v/t,d.y=I/(e.length-1),o.push(d.x,d.y);let G=c[3*I+0]*S,H=c[3*I+1],O=c[3*I+0]*R;l.push(G,H,O)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){let S=x+v*e.length,R=S,I=S+e.length,G=S+e.length+1,H=S+1;s.push(R,I,H),s.push(G,H,I)}this.setIndex(s),this.setAttribute("position",new Re(a,3)),this.setAttribute("uv",new Re(o,2)),this.setAttribute("normal",new Re(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},js=class r extends Qn{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Dt=class r extends $e{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,p=[],m=[],y=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let x=0;x<l;x++){let S=x*u-s;m.push(S,-v,0),y.push(0,0,1),f.push(x/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let x=v+l*g,S=v+l*(g+1),R=v+1+l*(g+1),I=v+1+l*g;p.push(x,S,I),p.push(S,R,I)}this.setIndex(p),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(y,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},qs=class r extends $e{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new w,m=new ae;for(let y=0;y<=i;y++){for(let f=0;f<=n;f++){let g=s+f/n*a;p.x=u*Math.cos(g),p.y=u*Math.sin(g),c.push(p.x,p.y,p.z),l.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let y=0;y<i;y++){let f=y*(n+1);for(let g=0;g<n;g++){let v=g+f,x=v,S=v+n+1,R=v+n+2,I=v+1;o.push(x,S,I),o.push(S,R,I)}}this.setIndex(o),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},$i=class r extends $e{constructor(e=new On([new ae(0,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,m=d.holes;gn.isClockWise(p)===!1&&(p=p.reverse());for(let f=0,g=m.length;f<g;f++){let v=m[f];gn.isClockWise(v)===!0&&(m[f]=v.reverse())}let y=gn.triangulateShape(p,m);for(let f=0,g=m.length;f<g;f++){let v=m[f];p=p.concat(v)}for(let f=0,g=p.length;f<g;f++){let v=p[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=y.length;f<g;f++){let v=y[f],x=v[0]+u,S=v[1]+u,R=v[2]+u;n.push(x,S,R),c+=3}}this.setIndex(n),this.setAttribute("position",new Re(i,3)),this.setAttribute("normal",new Re(s,3)),this.setAttribute("uv",new Re(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},sn=class r extends $e{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,p=[],m=[],y=[],f=[];for(let g=0;g<=n;g++){let v=[],x=g/n,S=0;g===0&&a===0?S=.5/t:g===n&&c===Math.PI&&(S=-.5/t);for(let R=0;R<=t;R++){let I=R/t;u.x=-e*Math.cos(i+I*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+I*s)*Math.sin(a+x*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),f.push(I+S,1-x),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let x=h[g][v+1],S=h[g][v],R=h[g+1][v],I=h[g+1][v+1];(g!==0||a>0)&&p.push(x,S,I),(g!==n-1||c<Math.PI)&&p.push(S,R,I)}this.setIndex(p),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(y,3)),this.setAttribute("uv",new Re(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ys=class r extends Qn{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},yt=class r extends $e{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let p=0;p<=n;p++)for(let m=0;m<=i;m++){let y=m/i*s,f=p/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(y),u.y=(e+t*Math.cos(f))*Math.sin(y),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=i;m++){let y=(i+1)*p+m-1,f=(i+1)*(p-1)+m-1,g=(i+1)*(p-1)+m,v=(i+1)*p+m;a.push(y,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Zs=class r extends $e{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,p=new w,m=new w,y=new w,f=new w,g=new w;for(let x=0;x<=n;++x){let S=x/n*s*Math.PI*2;v(S,s,a,e,p),v(S+.01,s,a,e,m),f.subVectors(m,p),g.addVectors(m,p),y.crossVectors(f,g),g.crossVectors(y,f),y.normalize(),g.normalize();for(let R=0;R<=i;++R){let I=R/i*Math.PI*2,G=-t*Math.cos(I),H=t*Math.sin(I);u.x=p.x+(G*g.x+H*y.x),u.y=p.y+(G*g.y+H*y.y),u.z=p.z+(G*g.z+H*y.z),c.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),l.push(d.x,d.y,d.z),h.push(x/n),h.push(R/i)}}for(let x=1;x<=n;x++)for(let S=1;S<=i;S++){let R=(i+1)*(x-1)+(S-1),I=(i+1)*x+(S-1),G=(i+1)*x+S,H=(i+1)*(x-1)+S;o.push(R,I,H),o.push(I,G,H)}function v(x,S,R,I,G){let H=Math.cos(x),O=Math.sin(x),J=R/S*x,K=Math.cos(J);G.x=I*(2+K)*.5*H,G.y=I*(2+K)*O*.5,G.z=I*Math.sin(J)*.5}this.setIndex(o),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},ct=class r extends $e{constructor(e=new Fr(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new ae,h=new w,u=[],d=[],p=[],m=[];function y(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let x=0;x<=i;x++){let S=x/i*Math.PI*2,R=Math.sin(S),I=-Math.cos(S);c.x=I*g.x+R*v.x,c.y=I*g.y+R*v.y,c.z=I*g.z+R*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)y(f);y(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,p.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),x=(i+1)*f+(g-1),S=(i+1)*f+g,R=(i+1)*(f-1)+g;m.push(v,x,R),m.push(x,S,R)}})()})(),this.setIndex(m),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Hs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Js=class extends $e{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let p=d,m=d+u.count;p<m;p+=3)for(let y=0;y<3;y++){let f=o.getX(p+y),g=o.getX(p+(y+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),ac(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),ac(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Re(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function ac(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var im=Object.freeze({__proto__:null,BoxGeometry:dt,CapsuleGeometry:Fs,CircleGeometry:$n,ConeGeometry:Os,CylinderGeometry:ot,DodecahedronGeometry:Bs,EdgesGeometry:zs,ExtrudeGeometry:Bn,IcosahedronGeometry:Xs,LatheGeometry:Ki,OctahedronGeometry:js,PlaneGeometry:Dt,PolyhedronGeometry:Qn,RingGeometry:qs,ShapeGeometry:$i,SphereGeometry:sn,TetrahedronGeometry:Ys,TorusGeometry:yt,TorusKnotGeometry:Zs,TubeGeometry:ct,WireframeGeometry:Js}),Vr=class extends Nn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Oe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var zn=class extends Nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_i=class extends zn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ks=class extends Nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},$s=class extends Nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ts(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function _u(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var vi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qs=class extends vi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fo,endingEnd:fo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case go:s=e,o=2*t-n;break;case _o:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case go:a=e,c=2*n-t;break;case _o:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,m=(n-t)/(i-t),y=m*m,f=y*m,g=-d*f+2*d*y-d*m,v=(1+d)*f+(-1.5-2*d)*y+(-.5+d)*m+1,x=(-1-p)*f+(1.5+p)*y+.5*m,S=p*f-p*y;for(let R=0;R!==o;++R)s[R]=g*a[h+R]+v*a[l+R]+x*a[c+R]+S*a[u+R];return s}},ea=class extends vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},ta=class extends vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ot=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ts(t,this.TimeBufferType),this.values=Ts(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ts(e.times,Array),values:Ts(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ta(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ea(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qs(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Sr:t=this.InterpolantFactoryMethodDiscrete;break;case Cs:t=this.InterpolantFactoryMethodLinear;break;case ws:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sr;case this.InterpolantFactoryMethodLinear:return Cs;case this.InterpolantFactoryMethodSmooth:return ws}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&_u(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ws,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let m=t[h+p];if(m!==t[u+p]||m!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Ot.prototype.ValueTypeName="",Ot.prototype.TimeBufferType=Float32Array,Ot.prototype.ValueBufferType=Float32Array,Ot.prototype.DefaultInterpolation=Cs;var Zn=class extends Ot{constructor(e,t,n){super(e,t,n)}};Zn.prototype.ValueTypeName="bool",Zn.prototype.ValueBufferType=Array,Zn.prototype.DefaultInterpolation=Sr,Zn.prototype.InterpolantFactoryMethodLinear=void 0,Zn.prototype.InterpolantFactoryMethodSmooth=void 0;var na=class extends Ot{constructor(e,t,n,i){super(e,t,n,i)}};na.prototype.ValueTypeName="color";var ia=class extends Ot{constructor(e,t,n,i){super(e,t,n,i)}};ia.prototype.ValueTypeName="number";var ra=class extends vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)en.slerpFlat(s,0,a,l-o,a,l,c);return s}},kr=class extends Ot{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ra(this.times,this.values,this.getValueSize(),e)}};kr.prototype.ValueTypeName="quaternion",kr.prototype.InterpolantFactoryMethodSmooth=void 0;var Jn=class extends Ot{constructor(e,t,n){super(e,t,n)}};Jn.prototype.ValueTypeName="string",Jn.prototype.ValueBufferType=Array,Jn.prototype.DefaultInterpolation=Sr,Jn.prototype.InterpolantFactoryMethodLinear=void 0,Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var sa=class extends Ot{constructor(e,t,n,i){super(e,t,n,i)}};sa.prototype.ValueTypeName="vector";var aa=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],m=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},lh=new aa,oa=class{constructor(e){this.manager=e!==void 0?e:lh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};oa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Qi=class extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Hr=class extends Qi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},uo=new Be,oc=new w,lc=new w,la=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kn,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;oc.setFromMatrixPosition(e.matrixWorld),t.position.copy(oc),lc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lc),t.updateMatrixWorld(),uo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var cc=new Be,vr=new w,po=new w,bo=class extends la{constructor(){super(new Mt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),vr.setFromMatrixPosition(e.matrixWorld),n.position.copy(vr),po.copy(n.position),po.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(po),n.updateMatrixWorld(),i.makeTranslation(-vr.x,-vr.y,-vr.z),cc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cc,n.coordinateSystem,n.reversedDepth)}},Wr=class extends Qi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new bo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},yi=class extends qi{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},To=class extends la{constructor(){super(new yi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xr=class extends Qi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new To}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var rm=new Be,sm=new Be,am=new Be;var ca=class extends Mt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var om=new w,lm=new en,cm=new w,hm=new w,um=new w;var dm=new w,pm=new en,mm=new w,fm=new w;var _l="\\[\\]\\.:\\/",vu=new RegExp("["+_l+"]","g"),mo="[^"+_l+"]",yu="[^"+_l.replace("\\.","")+"]",xu=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",mo)+/(WCOD+)?/.source.replace("WCOD",yu)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mo)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mo)+"$"),Mu=["material","materials","bones","map"],it=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vu,"")}static parseTrackName(e){let t=xu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Mu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};it.Composite=class{constructor(r,e,t){let n=t||it.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray],it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gm=new Float32Array(1);var _m=new Be;var vm=new ae;var ym=new w,xm=new w,Mm=new w,Sm=new w,bm=new w,Tm=new w,wm=new w;var Em=new w;var Am=new w,Cm=new Be,Rm=new Be;var Im=new w,Pm=new Oe,Lm=new Oe;var Dm=new w,Um=new w,Nm=new w;var Fm=new w,Om=new qi;var Bm=new tn;var zm=new w;function vl(r,e,t,n){let i=(function(s){switch(s){case xn:case Po:return{byteLength:1,components:1};case ir:case Lo:case ni:return{byteLength:2,components:1};case ba:case Ta:return{byteLength:2,components:4};case Si:case Sa:case Mn:return{byteLength:4,components:1};case Do:case Uo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case No:case wa:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case an:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Lh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function bu(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],p=l[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,l[h]=p)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let p=l[u];r.bufferSubData(o,p.start*c.BYTES_PER_ELEMENT,c,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Ve={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},me={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Sn={basic:{uniforms:Rt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Rt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Rt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Rt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Rt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Rt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Rt([me.points,me.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Rt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Rt([me.common,me.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Rt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Rt([me.sprite,me.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Rt([me.common,me.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Rt([me.lights,me.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Sn.physical={uniforms:Rt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};var Ia={r:0,b:0,g:0},wi=new rn,Tu=new Be;function wu(r,e,t,n,i,s,a){let o=new Oe(0),c,l,h=s===!0?0:1,u=null,d=0,p=null;function m(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function y(f,g){f.getRGB(Ia,fl(r)),n.buffers.color.setClear(Ia.r,Ia.g,Ia.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,y(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,y(o,h)},render:function(f){let g=!1,v=m(f);v===null?y(o,h):v&&v.isColor&&(y(v,1),g=!0);let x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=m(g);v&&(v.isCubeTexture||v.mapping===Yr)?(l===void 0&&(l=new ft(new dt(1,1,1),new zt({name:"BackgroundCubeMaterial",uniforms:Ti(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(x,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),wi.copy(g.backgroundRotation),wi.x*=-1,wi.y*=-1,wi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tu.makeRotationFromEuler(wi)),l.material.toneMapped=Ze.getTransfer(v.colorSpace)!==Ke,u===v&&d===v.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,p=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ft(new Dt(2,2),new zt({name:"BackgroundMaterial",uniforms:Ti(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(v.colorSpace)!==Ke,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,p=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Eu(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],x=[],S=[];for(let R=0;R<t;R++)v[R]=0,x[R]=0,S[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:x,attributeDivisors:S,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,x=g.length;v<x;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let x=s.newAttributes,S=s.enabledAttributes,R=s.attributeDivisors;x[g]=1,S[g]===0&&(r.enableVertexAttribArray(g),S[g]=1),R[g]!==v&&(r.vertexAttribDivisor(g,v),R[g]=v)}function p(){let g=s.newAttributes,v=s.enabledAttributes;for(let x=0,S=v.length;x<S;x++)v[x]!==g[x]&&(r.disableVertexAttribArray(x),v[x]=0)}function m(g,v,x,S,R,I,G){G===!0?r.vertexAttribIPointer(g,v,x,R,I):r.vertexAttribPointer(g,v,x,S,R,I)}function y(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,x,S,R){let I=!1,G=(function(H,O,J){let K=J.wireframe===!0,k=n[H.id];k===void 0&&(k={},n[H.id]=k);let q=k[O.id];q===void 0&&(q={},k[O.id]=q);let X=q[K];return X===void 0&&(X=l(r.createVertexArray()),q[K]=X),X})(S,x,v);s!==G&&(s=G,o(s.object)),I=(function(H,O,J,K){let k=s.attributes,q=O.attributes,X=0,$=J.getAttributes();for(let Q in $)if($[Q].location>=0){let oe=k[Q],re=q[Q];if(re===void 0&&(Q==="instanceMatrix"&&H.instanceMatrix&&(re=H.instanceMatrix),Q==="instanceColor"&&H.instanceColor&&(re=H.instanceColor)),oe===void 0||oe.attribute!==re||re&&oe.data!==re.data)return!0;X++}return s.attributesNum!==X||s.index!==K})(g,S,x,R),I&&(function(H,O,J,K){let k={},q=O.attributes,X=0,$=J.getAttributes();for(let Q in $)if($[Q].location>=0){let oe=q[Q];oe===void 0&&(Q==="instanceMatrix"&&H.instanceMatrix&&(oe=H.instanceMatrix),Q==="instanceColor"&&H.instanceColor&&(oe=H.instanceColor));let re={};re.attribute=oe,oe&&oe.data&&(re.data=oe.data),k[Q]=re,X++}s.attributes=k,s.attributesNum=X,s.index=K})(g,S,x,R),R!==null&&e.update(R,r.ELEMENT_ARRAY_BUFFER),(I||a)&&(a=!1,(function(H,O,J,K){h();let k=K.attributes,q=J.getAttributes(),X=O.defaultAttributeValues;for(let $ in q){let Q=q[$];if(Q.location>=0){let oe=k[$];if(oe===void 0&&($==="instanceMatrix"&&H.instanceMatrix&&(oe=H.instanceMatrix),$==="instanceColor"&&H.instanceColor&&(oe=H.instanceColor)),oe!==void 0){let re=oe.normalized,ve=oe.itemSize,Ae=e.get(oe);if(Ae===void 0)continue;let Ee=Ae.buffer,Le=Ae.type,he=Ae.bytesPerElement,de=Le===r.INT||Le===r.UNSIGNED_INT||oe.gpuType===Sa;if(oe.isInterleavedBufferAttribute){let ue=oe.data,Ie=ue.stride,Ne=oe.offset;if(ue.isInstancedInterleavedBuffer){for(let E=0;E<Q.locationSize;E++)d(Q.location+E,ue.meshPerAttribute);H.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let E=0;E<Q.locationSize;E++)u(Q.location+E);r.bindBuffer(r.ARRAY_BUFFER,Ee);for(let E=0;E<Q.locationSize;E++)m(Q.location+E,ve/Q.locationSize,Le,re,Ie*he,(Ne+ve/Q.locationSize*E)*he,de)}else{if(oe.isInstancedBufferAttribute){for(let ue=0;ue<Q.locationSize;ue++)d(Q.location+ue,oe.meshPerAttribute);H.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ue=0;ue<Q.locationSize;ue++)u(Q.location+ue);r.bindBuffer(r.ARRAY_BUFFER,Ee);for(let ue=0;ue<Q.locationSize;ue++)m(Q.location+ue,ve/Q.locationSize,Le,re,ve*he,ve/Q.locationSize*ue*he,de)}}else if(X!==void 0){let re=X[$];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(Q.location,re);break;case 3:r.vertexAttrib3fv(Q.location,re);break;case 4:r.vertexAttrib4fv(Q.location,re);break;default:r.vertexAttrib1fv(Q.location,re)}}}}p()})(g,v,x,S),R!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(R).buffer))},reset:y,resetDefaultState:f,dispose:function(){y();for(let g in n){let v=n[g];for(let x in v){let S=v[x];for(let R in S)c(S[R].object),delete S[R];delete v[x]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let x in v){let S=v[x];for(let R in S)c(S[R].object),delete S[R];delete v[x]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let x=n[v];if(x[g.id]===void 0)continue;let S=x[g.id];for(let R in S)c(S[R].object),delete S[R];delete x[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function Au(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Cu(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===an||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==xn&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Mn&&!p)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Ru(r){let e=this,t=null,n=0,i=!1,s=!1,a=new fn,o=new ze,c={value:null,needsUpdate:!1};function l(h,u,d,p){let m=h!==null?h.length:0,y=null;if(m!==0){if(y=c.value,p!==!0||y===null){let f=d+4*m,g=u.matrixWorldInverse;o.getNormalMatrix(g),(y===null||y.length<f)&&(y=new Float32Array(f));for(let v=0,x=d;v!==m;++v,x+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(y,x),y[x+3]=a.constant}c.value=y,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,y}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,m=h.clipIntersection,y=h.clipShadows,f=r.get(h);if(!i||p===null||p.length===0||s&&!y)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,x=f.clippingState||null;c.value=x,x=l(p,u,v,d);for(let S=0;S!==v;++S)x[S]=t[S];f.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}function Iu(r){let e=new WeakMap;function t(i,s){return s===ya?i.mapping=nr:s===xa&&(i.mapping=xi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===ya||s===xa){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new Us(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var ch=[.125,.215,.35,.446,.526,.582],$r=20,yl=new yi,hh=new Oe,xl=null,Ml=0,Sl=0,bl=!1,Ai=(1+Math.sqrt(5))/2,ar=1/Ai,uh=[new w(-Ai,ar,0),new w(Ai,ar,0),new w(-ar,0,Ai),new w(ar,0,Ai),new w(0,Ai,-ar),new w(0,Ai,ar),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Pu=new w,lr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Pu}=s;xl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xl,Ml,Sl),this._renderer.xr.enabled=bl,e.scissorTest=!1,Pa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===nr||e.mapping===xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:ni,format:an,colorSpace:pi,depthBuffer:!1},i=dh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+ch.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);c.push(p);let m=1/p;d>a-4?m=ch[d-a+4-1]:d===0&&(m=0),l.push(m);let y=1/(p-2),f=-y,g=1+y,v=[f,f,g,f,g,g,f,f,g,g,f,g],x=6,S=6,R=3,I=2,G=1,H=new Float32Array(R*S*x),O=new Float32Array(I*S*x),J=new Float32Array(G*S*x);for(let k=0;k<x;k++){let q=k%3*2/3-1,X=k>2?0:-1,$=[q,X,0,q+2/3,X,0,q+2/3,X+1,0,q,X,0,q+2/3,X+1,0,q,X+1,0];H.set($,R*S*k),O.set(v,I*S*k);let Q=[k,k,k,k,k,k];J.set(Q,G*S*k)}let K=new $e;K.setAttribute("position",new Bt(H,R)),K.setAttribute("uv",new Bt(O,I)),K.setAttribute("faceIndex",new Bt(J,G)),o.push(K),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array($r),h=new w(0,1,0);return new zt({name:"SphericalGaussianBlur",defines:{n:$r,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,yl)}_sceneToCubeUV(e,t,n,i,s){let a=new Mt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(hh),l.toneMapping=Gn,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new Fn({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),p=new ft(new dt,d),m=!1,y=e.background;y?y.isColor&&(d.color.copy(y),e.background=null,m=!0):(d.color.copy(hh),m=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;Pa(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),m&&l.render(p,a),l.render(e,a)}p.geometry.dispose(),p.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===nr||e.mapping===xi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ft(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Pa(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,yl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=uh[(i-s-1)%uh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ft(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,m=s/p,y=isFinite(s)?1+Math.floor(3*m):$r;y>$r&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`);let f=[],g=0;for(let S=0;S<$r;++S){let R=S/m,I=Math.exp(-R*R/2);f.push(I),S===0?g+=I:S<y&&(g+=2*I)}for(let S=0;S<f.length;S++)f[S]=f[S]/g;u.envMap.value=e.texture,u.samples.value=y,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=p,u.mipInt.value=v-n;let x=this._sizeLods[i];Pa(t,3*x*(i>v-4?i-v+4:0),4*(this._cubeSize-x),3*x,2*x),c.setRenderTarget(t),c.render(h,yl)}};function dh(r,e,t){let n=new jt(r,e,t);return n.texture.mapping=Yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Pa(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function ph(){return new zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function mh(){return new zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Dl(){return`

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
	`}function Lu(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===ya||s===xa,o=s===nr||s===xi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new lr(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let m=0;m<p;m++)u[m]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new lr(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Du(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Xi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Uu(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let y=h.array;d=h.version;for(let f=0,g=y.length;f<g;f+=3){let v=y[f+0],x=y[f+1],S=y[f+2];l.push(v,x,x,S,S,v)}}else{if(u===void 0)return;{let y=u.array;d=u.version;for(let f=0,g=y.length/3-1;f<g;f+=3){let v=f+0,x=f+1,S=f+2;l.push(v,x,x,S,S,v)}}}let p=new(ml(l)?Rr:Cr)(l,1);p.version=d;let m=s.get(c);m&&e.remove(m),s.set(c,p)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Nu(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let p=0;p<l;p++)d+=c[p]*h[p];t.update(d,n,1)}}}function Fu(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Ou(r,e,t){let n=new WeakMap,i=new Je;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let H=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",H)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,y=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),p===!0&&(v=2),m===!0&&(v=3);let x=a.attributes.position.count*v,S=1;x>e.maxTextureSize&&(S=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let R=new Float32Array(x*S*4*h),I=new Er(R,x,S,h);I.type=Mn,I.needsUpdate=!0;let G=4*v;for(let O=0;O<h;O++){let J=y[O],K=f[O],k=g[O],q=x*S*4*O;for(let X=0;X<J.count;X++){let $=X*G;d===!0&&(i.fromBufferAttribute(J,X),R[q+$+0]=i.x,R[q+$+1]=i.y,R[q+$+2]=i.z,R[q+$+3]=0),p===!0&&(i.fromBufferAttribute(K,X),R[q+$+4]=i.x,R[q+$+5]=i.y,R[q+$+6]=i.z,R[q+$+7]=0),m===!0&&(i.fromBufferAttribute(k,X),R[q+$+8]=i.x,R[q+$+9]=i.y,R[q+$+10]=i.z,R[q+$+11]=k.itemSize===4?i.w:1)}}u={count:h,texture:I,size:new ae(x,S)},n.set(a,u),a.addEventListener("dispose",H)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Bu(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Dh=new Lt,fh=new Pr(1,1),Uh=new Er,Nh=new Ls,Fh=new Ir,gh=[],_h=[],vh=new Float32Array(16),yh=new Float32Array(9),xh=new Float32Array(4);function cr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=gh[i];if(s===void 0&&(s=new Float32Array(i),gh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function gt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function _t(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ua(r,e){let t=_h[e];t===void 0&&(t=new Int32Array(e),_h[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function zu(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Gu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;r.uniform2fv(this.addr,e),_t(t,e)}}function Vu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;r.uniform3fv(this.addr,e),_t(t,e)}}function ku(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;r.uniform4fv(this.addr,e),_t(t,e)}}function Hu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;xh.set(n),r.uniformMatrix2fv(this.addr,!1,xh),_t(t,n)}}function Wu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;yh.set(n),r.uniformMatrix3fv(this.addr,!1,yh),_t(t,n)}}function Xu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;vh.set(n),r.uniformMatrix4fv(this.addr,!1,vh),_t(t,n)}}function ju(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function qu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;r.uniform2iv(this.addr,e),_t(t,e)}}function Yu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;r.uniform3iv(this.addr,e),_t(t,e)}}function Zu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;r.uniform4iv(this.addr,e),_t(t,e)}}function Ju(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Ku(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;r.uniform2uiv(this.addr,e),_t(t,e)}}function $u(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;r.uniform3uiv(this.addr,e),_t(t,e)}}function Qu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;r.uniform4uiv(this.addr,e),_t(t,e)}}function ed(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(fh.compareFunction=dl,s=fh):s=Dh,t.setTexture2D(e||s,i)}function td(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Nh,i)}function nd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Fh,i)}function id(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Uh,i)}function rd(r,e){r.uniform1fv(this.addr,e)}function sd(r,e){let t=cr(e,this.size,2);r.uniform2fv(this.addr,t)}function ad(r,e){let t=cr(e,this.size,3);r.uniform3fv(this.addr,t)}function od(r,e){let t=cr(e,this.size,4);r.uniform4fv(this.addr,t)}function ld(r,e){let t=cr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function cd(r,e){let t=cr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function hd(r,e){let t=cr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ud(r,e){r.uniform1iv(this.addr,e)}function dd(r,e){r.uniform2iv(this.addr,e)}function pd(r,e){r.uniform3iv(this.addr,e)}function md(r,e){r.uniform4iv(this.addr,e)}function fd(r,e){r.uniform1uiv(this.addr,e)}function gd(r,e){r.uniform2uiv(this.addr,e)}function _d(r,e){r.uniform3uiv(this.addr,e)}function vd(r,e){r.uniform4uiv(this.addr,e)}function yd(r,e,t){let n=this.cache,i=e.length,s=Ua(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Dh,s[a])}function xd(r,e,t){let n=this.cache,i=e.length,s=Ua(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Nh,s[a])}function Md(r,e,t){let n=this.cache,i=e.length,s=Ua(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Fh,s[a])}function Sd(r,e,t){let n=this.cache,i=e.length,s=Ua(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Uh,s[a])}var wl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return zu;case 35664:return Gu;case 35665:return Vu;case 35666:return ku;case 35674:return Hu;case 35675:return Wu;case 35676:return Xu;case 5124:case 35670:return ju;case 35667:case 35671:return qu;case 35668:case 35672:return Yu;case 35669:case 35673:return Zu;case 5125:return Ju;case 36294:return Ku;case 36295:return $u;case 36296:return Qu;case 35678:case 36198:case 36298:case 36306:case 35682:return ed;case 35679:case 36299:case 36307:return td;case 35680:case 36300:case 36308:case 36293:return nd;case 36289:case 36303:case 36311:case 36292:return id}})(t.type)}},El=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return rd;case 35664:return sd;case 35665:return ad;case 35666:return od;case 35674:return ld;case 35675:return cd;case 35676:return hd;case 5124:case 35670:return ud;case 35667:case 35671:return dd;case 35668:case 35672:return pd;case 35669:case 35673:return md;case 5125:return fd;case 36294:return gd;case 36295:return _d;case 36296:return vd;case 35678:case 36198:case 36298:case 36306:case 35682:return yd;case 35679:case 36299:case 36307:return xd;case 35680:case 36300:case 36308:case 36293:return Md;case 36289:case 36303:case 36311:case 36292:return Sd}})(t.type)}},Al=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Tl=/(\w+)(\])?(\[|\.)?/g;function Mh(r,e){r.seq.push(e),r.map[e.id]=e}function bd(r,e,t){let n=r.name,i=n.length;for(Tl.lastIndex=0;;){let s=Tl.exec(n),a=Tl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){Mh(t,l===void 0?new wl(o,r,e):new El(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Al(o),Mh(t,h)),t=h}}}var or=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);bd(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Sh(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Td=0,bh=new ze;function Th(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let p=u;p<d;p++){let m=p+1;h.push(`${m===c?">":" "} ${m}: ${l[p]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function wd(r,e){let t=(function(n){Ze._getMatrix(bh,Ze.workingColorSpace,n);let i=`mat3( ${bh.elements.map(s=>s.toFixed(4))} )`;switch(Ze.getTransfer(n)){case br:return[i,"LinearTransferOETF"];case Ke:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ed(r,e){let t;switch(e){case Nc:t="Linear";break;case Fc:t="Reinhard";break;case Oc:t="Cineon";break;case va:t="ACESFilmic";break;case zc:t="AgX";break;case Gc:t="Neutral";break;case Bc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var La=new w;function Ad(){return Ze.getLuminanceCoefficients(La),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${La.x.toFixed(4)}, ${La.y.toFixed(4)}, ${La.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qr(r){return r!==""}function wh(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Eh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(r){return r.replace(Cd,Id)}var Rd=new Map;function Id(r,e){let t=Ve[e];if(t===void 0){let n=Rd.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Cl(t)}var Pd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ah(r){return r.replace(Pd,Ld)}function Ld(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ch(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Dd(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(K){let k="SHADOWMAP_TYPE_BASIC";return K.shadowMapType===Eo?k="SHADOWMAP_TYPE_PCF":K.shadowMapType===ha?k="SHADOWMAP_TYPE_PCF_SOFT":K.shadowMapType===yn&&(k="SHADOWMAP_TYPE_VSM"),k})(t),l=(function(K){let k="ENVMAP_TYPE_CUBE";if(K.envMap)switch(K.envMapMode){case nr:case xi:k="ENVMAP_TYPE_CUBE";break;case Yr:k="ENVMAP_TYPE_CUBE_UV"}return k})(t),h=(function(K){let k="ENVMAP_MODE_REFLECTION";return K.envMap&&K.envMapMode===xi&&(k="ENVMAP_MODE_REFRACTION"),k})(t),u=(function(K){let k="ENVMAP_BLENDING_NONE";if(K.envMap)switch(K.combine){case Lc:k="ENVMAP_BLENDING_MULTIPLY";break;case Dc:k="ENVMAP_BLENDING_MIX";break;case Uc:k="ENVMAP_BLENDING_ADD"}return k})(t),d=(function(K){let k=K.envMapCubeUVHeight;if(k===null)return null;let q=Math.log2(k)-2,X=1/k;return{texelWidth:1/(3*Math.max(Math.pow(2,q),112)),texelHeight:X,maxMip:q}})(t),p=(function(K){return[K.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",K.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qr).join(`
`)})(t),m=(function(K){let k=[];for(let q in K){let X=K[q];X!==!1&&k.push("#define "+q+" "+X)}return k.join(`
`)})(s),y=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Qr).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Qr).join(`
`),g.length>0&&(g+=`
`)):(f=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qr).join(`
`),g=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Ed("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,wd("linearToOutputTexel",t.outputColorSpace),Ad(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qr).join(`
`)),a=Cl(a),a=wh(a,t),a=Eh(a,t),o=Cl(o),o=wh(o,t),o=Eh(o,t),a=Ah(a),o=Ah(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===pl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let x=v+f+a,S=v+g+o,R=Sh(i,i.VERTEX_SHADER,x),I=Sh(i,i.FRAGMENT_SHADER,S);function G(K){if(r.debug.checkShaderErrors){let k=i.getProgramInfoLog(y)||"",q=i.getShaderInfoLog(R)||"",X=i.getShaderInfoLog(I)||"",$=k.trim(),Q=q.trim(),oe=X.trim(),re=!0,ve=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(re=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,R,I);else{let Ae=Th(i,R,"vertex"),Ee=Th(i,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+K.name+`
Material Type: `+K.type+`

Program Info Log: `+$+`
`+Ae+`
`+Ee)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):Q!==""&&oe!==""||(ve=!1);ve&&(K.diagnostics={runnable:re,programLog:$,vertexShader:{log:Q,prefix:f},fragmentShader:{log:oe,prefix:g}})}i.deleteShader(R),i.deleteShader(I),H=new or(i,y),O=(function(k,q){let X={},$=k.getProgramParameter(q,k.ACTIVE_ATTRIBUTES);for(let Q=0;Q<$;Q++){let oe=k.getActiveAttrib(q,Q),re=oe.name,ve=1;oe.type===k.FLOAT_MAT2&&(ve=2),oe.type===k.FLOAT_MAT3&&(ve=3),oe.type===k.FLOAT_MAT4&&(ve=4),X[re]={type:oe.type,location:k.getAttribLocation(q,re),locationSize:ve}}return X})(i,y)}let H,O;i.attachShader(y,R),i.attachShader(y,I),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y),this.getUniforms=function(){return H===void 0&&G(this),H},this.getAttributes=function(){return O===void 0&&G(this),O};let J=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return J===!1&&(J=i.getProgramParameter(y,37297)),J},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Td++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=I,this}var Ud=0,Rl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Il(e),t.set(e,n)),n}},Il=class{constructor(e){this.id=Ud++,this.code=e,this.usedTimes=0}};function Nd(r,e,t,n,i,s,a){let o=new Ar,c=new Rl,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,x,S){let R=x.fog,I=S.geometry,G=f.isMeshStandardMaterial?x.environment:null,H=(f.isMeshStandardMaterial?t:e).get(f.envMap||G),O=H&&H.mapping===Yr?H.image.height:null,J=m[f.type];f.precision!==null&&(p=i.getMaxPrecision(f.precision),p!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",p,"instead."));let K=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,k=K!==void 0?K.length:0,q,X,$,Q,oe=0;if(I.morphAttributes.position!==void 0&&(oe=1),I.morphAttributes.normal!==void 0&&(oe=2),I.morphAttributes.color!==void 0&&(oe=3),J){let mt=Sn[J];q=mt.vertexShader,X=mt.fragmentShader}else q=f.vertexShader,X=f.fragmentShader,c.update(f),$=c.getVertexShaderID(f),Q=c.getFragmentShaderID(f);let re=r.getRenderTarget(),ve=r.state.buffers.depth.getReversed(),Ae=S.isInstancedMesh===!0,Ee=S.isBatchedMesh===!0,Le=!!f.map,he=!!f.matcap,de=!!H,ue=!!f.aoMap,Ie=!!f.lightMap,Ne=!!f.bumpMap,E=!!f.normalMap,T=!!f.displacementMap,V=!!f.emissiveMap,U=!!f.metalnessMap,M=!!f.roughnessMap,C=f.anisotropy>0,z=f.clearcoat>0,L=f.dispersion>0,te=f.iridescence>0,Y=f.sheen>0,j=f.transmission>0,le=C&&!!f.anisotropyMap,fe=z&&!!f.clearcoatMap,ce=z&&!!f.clearcoatNormalMap,ye=z&&!!f.clearcoatRoughnessMap,we=te&&!!f.iridescenceMap,Ce=te&&!!f.iridescenceThicknessMap,ke=Y&&!!f.sheenColorMap,Xe=Y&&!!f.sheenRoughnessMap,Ye=!!f.specularMap,pe=!!f.specularColorMap,Me=!!f.specularIntensityMap,He=j&&!!f.transmissionMap,Qe=j&&!!f.thicknessMap,Te=!!f.gradientMap,je=!!f.alphaMap,Ge=f.alphaTest>0,It=!!f.alphaHash,St=!!f.extensions,F=Gn;f.toneMapped&&(re!==null&&re.isXRRenderTarget!==!0||(F=r.toneMapping));let lt={shaderID:J,shaderType:f.type,shaderName:f.name,vertexShader:q,fragmentShader:X,defines:f.defines,customVertexShaderID:$,customFragmentShaderID:Q,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:p,batching:Ee,batchingColor:Ee&&S._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&S.instanceColor!==null,instancingMorph:Ae&&S.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:pi,alphaToCoverage:!!f.alphaToCoverage,map:Le,matcap:he,envMap:de,envMapMode:de&&H.mapping,envMapCubeUVHeight:O,aoMap:ue,lightMap:Ie,bumpMap:Ne,normalMap:E,displacementMap:d&&T,emissiveMap:V,normalMapObjectSpace:E&&f.normalMapType===qc,normalMapTangentSpace:E&&f.normalMapType===jc,metalnessMap:U,roughnessMap:M,anisotropy:C,anisotropyMap:le,clearcoat:z,clearcoatMap:fe,clearcoatNormalMap:ce,clearcoatRoughnessMap:ye,dispersion:L,iridescence:te,iridescenceMap:we,iridescenceThicknessMap:Ce,sheen:Y,sheenColorMap:ke,sheenRoughnessMap:Xe,specularMap:Ye,specularColorMap:pe,specularIntensityMap:Me,transmission:j,transmissionMap:He,thicknessMap:Qe,gradientMap:Te,opaque:f.transparent===!1&&f.blending===jr&&f.alphaToCoverage===!1,alphaMap:je,alphaTest:Ge,alphaHash:It,combine:f.combine,mapUv:Le&&y(f.map.channel),aoMapUv:ue&&y(f.aoMap.channel),lightMapUv:Ie&&y(f.lightMap.channel),bumpMapUv:Ne&&y(f.bumpMap.channel),normalMapUv:E&&y(f.normalMap.channel),displacementMapUv:T&&y(f.displacementMap.channel),emissiveMapUv:V&&y(f.emissiveMap.channel),metalnessMapUv:U&&y(f.metalnessMap.channel),roughnessMapUv:M&&y(f.roughnessMap.channel),anisotropyMapUv:le&&y(f.anisotropyMap.channel),clearcoatMapUv:fe&&y(f.clearcoatMap.channel),clearcoatNormalMapUv:ce&&y(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&y(f.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&y(f.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&y(f.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&y(f.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&y(f.sheenRoughnessMap.channel),specularMapUv:Ye&&y(f.specularMap.channel),specularColorMapUv:pe&&y(f.specularColorMap.channel),specularIntensityMapUv:Me&&y(f.specularIntensityMap.channel),transmissionMapUv:He&&y(f.transmissionMap.channel),thicknessMapUv:Qe&&y(f.thicknessMap.channel),alphaMapUv:je&&y(f.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(E||C),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!I.attributes.uv&&(Le||je),fog:!!R,useFog:f.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ve,skinning:S.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:oe,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:F,decodeVideoTexture:Le&&f.map.isVideoTexture===!0&&Ze.getTransfer(f.map.colorSpace)===Ke,decodeVideoTextureEmissive:V&&f.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(f.emissiveMap.colorSpace)===Ke,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Ct,flipSided:f.side===kt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:St&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&f.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return lt.vertexUv1s=l.has(1),lt.vertexUv2s=l.has(2),lt.vertexUv3s=l.has(3),l.clear(),lt},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)})(g,f),(function(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=m[f.type],v;if(g){let x=Sn[g];v=rh.clone(x.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let x=0,S=h.length;x<S;x++){let R=h[x];if(R.cacheKey===g){v=R,++v.usedTimes;break}}return v===void 0&&(v=new Dd(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function Fd(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Od(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Rh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ih(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Od),n.length>1&&n.sort(o||Rh),i.length>1&&i.sort(o||Rh)}}}function Bd(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Ih,r.set(e,[i])):t>=n.length?(i=new Ih,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function zd(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Oe};break;case"SpotLight":t={position:new w,direction:new w,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var Gd=0;function Vd(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function kd(r){let e=new zd,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new Be,a=new Be;return{setup:function(o){let c=0,l=0,h=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let u=0,d=0,p=0,m=0,y=0,f=0,g=0,v=0,x=0,S=0,R=0;o.sort(Vd);for(let G=0,H=o.length;G<H;G++){let O=o[G],J=O.color,K=O.intensity,k=O.distance,q=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)c+=J.r*K,l+=J.g*K,h+=J.b*K;else if(O.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(O.sh.coefficients[X],K);R++}else if(O.isDirectionalLight){let X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let $=O.shadow,Q=t.get(O);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,n.directionalShadow[u]=Q,n.directionalShadowMap[u]=q,n.directionalShadowMatrix[u]=O.shadow.matrix,f++}n.directional[u]=X,u++}else if(O.isSpotLight){let X=e.get(O);X.position.setFromMatrixPosition(O.matrixWorld),X.color.copy(J).multiplyScalar(K),X.distance=k,X.coneCos=Math.cos(O.angle),X.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),X.decay=O.decay,n.spot[p]=X;let $=O.shadow;if(O.map&&(n.spotLightMap[x]=O.map,x++,$.updateMatrices(O),O.castShadow&&S++),n.spotLightMatrix[p]=$.matrix,O.castShadow){let Q=t.get(O);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,n.spotShadow[p]=Q,n.spotShadowMap[p]=q,v++}p++}else if(O.isRectAreaLight){let X=e.get(O);X.color.copy(J).multiplyScalar(K),X.halfWidth.set(.5*O.width,0,0),X.halfHeight.set(0,.5*O.height,0),n.rectArea[m]=X,m++}else if(O.isPointLight){let X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),X.distance=O.distance,X.decay=O.decay,O.castShadow){let $=O.shadow,Q=t.get(O);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,Q.shadowCameraNear=$.camera.near,Q.shadowCameraFar=$.camera.far,n.pointShadow[d]=Q,n.pointShadowMap[d]=q,n.pointShadowMatrix[d]=O.shadow.matrix,g++}n.point[d]=X,d++}else if(O.isHemisphereLight){let X=e.get(O);X.skyColor.copy(O.color).multiplyScalar(K),X.groundColor.copy(O.groundColor).multiplyScalar(K),n.hemi[y]=X,y++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let I=n.hash;I.directionalLength===u&&I.pointLength===d&&I.spotLength===p&&I.rectAreaLength===m&&I.hemiLength===y&&I.numDirectionalShadows===f&&I.numPointShadows===g&&I.numSpotShadows===v&&I.numSpotMaps===x&&I.numLightProbes===R||(n.directional.length=u,n.spot.length=p,n.rectArea.length=m,n.point.length=d,n.hemi.length=y,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+x-S,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=R,I.directionalLength=u,I.pointLength=d,I.spotLength=p,I.rectAreaLength=m,I.hemiLength=y,I.numDirectionalShadows=f,I.numPointShadows=g,I.numSpotShadows=v,I.numSpotMaps=x,I.numLightProbes=R,n.version=Gd++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,p=0,m=c.matrixWorldInverse;for(let y=0,f=o.length;y<f;y++){let g=o[y];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(m),a.identity(),s.copy(g.matrixWorld),s.premultiply(m),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(m),h++}else if(g.isHemisphereLight){let v=n.hemi[p];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(m),p++}}},state:n}}function Ph(r){let e=new kd(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Hd(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Ph(r),e.set(t,[s])):n>=i.length?(s=new Ph(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Wd(r,e,t){let n=new Kn,i=new ae,s=new ae,a=new Je,o=new Ks({depthPacking:Xc}),c=new $s,l={},h=t.maxTextureSize,u={[er]:kt,[kt]:er,[Ct]:Ct},d=new zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let m=new $e;m.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ft(m,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eo;let g=this.type;function v(I,G){let H=e.update(y);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new jt(i.x,i.y)),d.uniforms.shadow_pass.value=I.map.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(G,null,H,d,y,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(G,null,H,p,y,null)}function x(I,G,H,O){let J=null,K=H.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(K!==void 0)J=K;else if(J=H.isPointLight===!0?c:o,r.localClippingEnabled&&G.clipShadows===!0&&Array.isArray(G.clippingPlanes)&&G.clippingPlanes.length!==0||G.displacementMap&&G.displacementScale!==0||G.alphaMap&&G.alphaTest>0||G.map&&G.alphaTest>0||G.alphaToCoverage===!0){let k=J.uuid,q=G.uuid,X=l[k];X===void 0&&(X={},l[k]=X);let $=X[q];$===void 0&&($=J.clone(),X[q]=$,G.addEventListener("dispose",R)),J=$}return J.visible=G.visible,J.wireframe=G.wireframe,J.side=O===yn?G.shadowSide!==null?G.shadowSide:G.side:G.shadowSide!==null?G.shadowSide:u[G.side],J.alphaMap=G.alphaMap,J.alphaTest=G.alphaToCoverage===!0?.5:G.alphaTest,J.map=G.map,J.clipShadows=G.clipShadows,J.clippingPlanes=G.clippingPlanes,J.clipIntersection=G.clipIntersection,J.displacementMap=G.displacementMap,J.displacementScale=G.displacementScale,J.displacementBias=G.displacementBias,J.wireframeLinewidth=G.wireframeLinewidth,J.linewidth=G.linewidth,H.isPointLight===!0&&J.isMeshDistanceMaterial===!0&&(r.properties.get(J).light=H),J}function S(I,G,H,O,J){if(I.visible===!1)return;if(I.layers.test(G.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&J===yn)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,I.matrixWorld);let k=e.update(I),q=I.material;if(Array.isArray(q)){let X=k.groups;for(let $=0,Q=X.length;$<Q;$++){let oe=X[$],re=q[oe.materialIndex];if(re&&re.visible){let ve=x(I,re,O,J);I.onBeforeShadow(r,I,G,H,k,ve,oe),r.renderBufferDirect(H,null,k,ve,I,oe),I.onAfterShadow(r,I,G,H,k,ve,oe)}}}else if(q.visible){let X=x(I,q,O,J);I.onBeforeShadow(r,I,G,H,k,X,null),r.renderBufferDirect(H,null,k,X,I,null),I.onAfterShadow(r,I,G,H,k,X,null)}}let K=I.children;for(let k=0,q=K.length;k<q;k++)S(K[k],G,H,O,J)}function R(I){I.target.removeEventListener("dispose",R);for(let G in l){let H=l[G],O=I.target.uuid;O in H&&(H[O].dispose(),delete H[O])}}this.render=function(I,G,H){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||I.length===0)return;let O=r.getRenderTarget(),J=r.getActiveCubeFace(),K=r.getActiveMipmapLevel(),k=r.state;k.setBlending(ti),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let q=g!==yn&&this.type===yn,X=g===yn&&this.type!==yn;for(let $=0,Q=I.length;$<Q;$++){let oe=I[$],re=oe.shadow;if(re===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(re.autoUpdate===!1&&re.needsUpdate===!1)continue;i.copy(re.mapSize);let ve=re.getFrameExtents();if(i.multiply(ve),s.copy(re.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ve.x),i.x=s.x*ve.x,re.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ve.y),i.y=s.y*ve.y,re.mapSize.y=s.y)),re.map===null||q===!0||X===!0){let Ee=this.type!==yn?{minFilter:_n,magFilter:_n}:{};re.map!==null&&re.map.dispose(),re.map=new jt(i.x,i.y,Ee),re.map.texture.name=oe.name+".shadowMap",re.camera.updateProjectionMatrix()}r.setRenderTarget(re.map),r.clear();let Ae=re.getViewportCount();for(let Ee=0;Ee<Ae;Ee++){let Le=re.getViewport(Ee);a.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),k.viewport(a),re.updateMatrices(oe,Ee),n=re.getFrustum(),S(G,H,re.camera,oe,this.type)}re.isPointLightShadow!==!0&&this.type===yn&&v(re,H),re.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(O,J,K)}}var Xd={[ua]:da,[pa]:ga,[ma]:_a,[qr]:fa,[da]:ua,[ga]:pa,[_a]:ma,[fa]:qr};function jd(r,e){let t=new function(){let M=!1,C=new Je,z=null,L=new Je(0,0,0,0);return{setMask:function(te){z===te||M||(r.colorMask(te,te,te,te),z=te)},setLocked:function(te){M=te},setClear:function(te,Y,j,le,fe){fe===!0&&(te*=le,Y*=le,j*=le),C.set(te,Y,j,le),L.equals(C)===!1&&(r.clearColor(te,Y,j,le),L.copy(C))},reset:function(){M=!1,z=null,L.set(-1,0,0,0)}}},n=new function(){let M=!1,C=!1,z=null,L=null,te=null;return{setReversed:function(Y){if(C!==Y){let j=e.get("EXT_clip_control");Y?j.clipControlEXT(j.LOWER_LEFT_EXT,j.ZERO_TO_ONE_EXT):j.clipControlEXT(j.LOWER_LEFT_EXT,j.NEGATIVE_ONE_TO_ONE_EXT),C=Y;let le=te;te=null,this.setClear(le)}},getReversed:function(){return C},setTest:function(Y){Y?de(r.DEPTH_TEST):ue(r.DEPTH_TEST)},setMask:function(Y){z===Y||M||(r.depthMask(Y),z=Y)},setFunc:function(Y){if(C&&(Y=Xd[Y]),L!==Y){switch(Y){case ua:r.depthFunc(r.NEVER);break;case da:r.depthFunc(r.ALWAYS);break;case pa:r.depthFunc(r.LESS);break;case qr:r.depthFunc(r.LEQUAL);break;case ma:r.depthFunc(r.EQUAL);break;case fa:r.depthFunc(r.GEQUAL);break;case ga:r.depthFunc(r.GREATER);break;case _a:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}L=Y}},setLocked:function(Y){M=Y},setClear:function(Y){te!==Y&&(C&&(Y=1-Y),r.clearDepth(Y),te=Y)},reset:function(){M=!1,z=null,L=null,te=null,C=!1}}},i=new function(){let M=!1,C=null,z=null,L=null,te=null,Y=null,j=null,le=null,fe=null;return{setTest:function(ce){M||(ce?de(r.STENCIL_TEST):ue(r.STENCIL_TEST))},setMask:function(ce){C===ce||M||(r.stencilMask(ce),C=ce)},setFunc:function(ce,ye,we){z===ce&&L===ye&&te===we||(r.stencilFunc(ce,ye,we),z=ce,L=ye,te=we)},setOp:function(ce,ye,we){Y===ce&&j===ye&&le===we||(r.stencilOp(ce,ye,we),Y=ce,j=ye,le=we)},setLocked:function(ce){M=ce},setClear:function(ce){fe!==ce&&(r.clearStencil(ce),fe=ce)},reset:function(){M=!1,C=null,z=null,L=null,te=null,Y=null,j=null,le=null,fe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,m=null,y=null,f=null,g=null,v=null,x=null,S=new Oe(0,0,0),R=0,I=!1,G=null,H=null,O=null,J=null,K=null,k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,X=0,$=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec($)[1]),q=X>=1):$.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=X>=2);let Q=null,oe={},re=r.getParameter(r.SCISSOR_BOX),ve=r.getParameter(r.VIEWPORT),Ae=new Je().fromArray(re),Ee=new Je().fromArray(ve);function Le(M,C,z,L){let te=new Uint8Array(4),Y=r.createTexture();r.bindTexture(M,Y),r.texParameteri(M,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(M,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let j=0;j<z;j++)M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?r.texImage3D(C,0,r.RGBA,1,1,L,0,r.RGBA,r.UNSIGNED_BYTE,te):r.texImage2D(C+j,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,te);return Y}let he={};function de(M){o[M]!==!0&&(r.enable(M),o[M]=!0)}function ue(M){o[M]!==!1&&(r.disable(M),o[M]=!1)}he[r.TEXTURE_2D]=Le(r.TEXTURE_2D,r.TEXTURE_2D,1),he[r.TEXTURE_CUBE_MAP]=Le(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[r.TEXTURE_2D_ARRAY]=Le(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),he[r.TEXTURE_3D]=Le(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),de(r.DEPTH_TEST),n.setFunc(qr),T(!1),V(wo),de(r.CULL_FACE),E(ti);let Ie={[tr]:r.FUNC_ADD,[pc]:r.FUNC_SUBTRACT,[mc]:r.FUNC_REVERSE_SUBTRACT};Ie[fc]=r.MIN,Ie[gc]=r.MAX;let Ne={[_c]:r.ZERO,[vc]:r.ONE,[yc]:r.SRC_COLOR,[Mc]:r.SRC_ALPHA,[Ac]:r.SRC_ALPHA_SATURATE,[wc]:r.DST_COLOR,[bc]:r.DST_ALPHA,[xc]:r.ONE_MINUS_SRC_COLOR,[Sc]:r.ONE_MINUS_SRC_ALPHA,[Ec]:r.ONE_MINUS_DST_COLOR,[Tc]:r.ONE_MINUS_DST_ALPHA,[Cc]:r.CONSTANT_COLOR,[Rc]:r.ONE_MINUS_CONSTANT_COLOR,[Ic]:r.CONSTANT_ALPHA,[Pc]:r.ONE_MINUS_CONSTANT_ALPHA};function E(M,C,z,L,te,Y,j,le,fe,ce){if(M!==ti){if(d===!1&&(de(r.BLEND),d=!0),M===dc)te=te||C,Y=Y||z,j=j||L,C===m&&te===g||(r.blendEquationSeparate(Ie[C],Ie[te]),m=C,g=te),z===y&&L===f&&Y===v&&j===x||(r.blendFuncSeparate(Ne[z],Ne[L],Ne[Y],Ne[j]),y=z,f=L,v=Y,x=j),le.equals(S)!==!1&&fe===R||(r.blendColor(le.r,le.g,le.b,fe),S.copy(le),R=fe),p=M,I=!1;else if(M!==p||ce!==I){if(m===tr&&g===tr||(r.blendEquation(r.FUNC_ADD),m=tr,g=tr),ce)switch(M){case jr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ao:r.blendFunc(r.ONE,r.ONE);break;case Co:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ro:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}else switch(M){case jr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ao:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Co:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ro:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}y=null,f=null,v=null,x=null,S.set(0,0,0),R=0,p=M,I=ce}}else d===!0&&(ue(r.BLEND),d=!1)}function T(M){G!==M&&(M?r.frontFace(r.CW):r.frontFace(r.CCW),G=M)}function V(M){M!==hc?(de(r.CULL_FACE),M!==H&&(M===wo?r.cullFace(r.BACK):M===uc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ue(r.CULL_FACE),H=M}function U(M,C,z){M?(de(r.POLYGON_OFFSET_FILL),J===C&&K===z||(r.polygonOffset(C,z),J=C,K=z)):ue(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:de,disable:ue,bindFramebuffer:function(M,C){return c[M]!==C&&(r.bindFramebuffer(M,C),c[M]=C,M===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=C),M===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=C),!0)},drawBuffers:function(M,C){let z=h,L=!1;if(M){z=l.get(C),z===void 0&&(z=[],l.set(C,z));let te=M.textures;if(z.length!==te.length||z[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,j=te.length;Y<j;Y++)z[Y]=r.COLOR_ATTACHMENT0+Y;z.length=te.length,L=!0}}else z[0]!==r.BACK&&(z[0]=r.BACK,L=!0);L&&r.drawBuffers(z)},useProgram:function(M){return u!==M&&(r.useProgram(M),u=M,!0)},setBlending:E,setMaterial:function(M,C){M.side===Ct?ue(r.CULL_FACE):de(r.CULL_FACE);let z=M.side===kt;C&&(z=!z),T(z),M.blending===jr&&M.transparent===!1?E(ti):E(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),n.setFunc(M.depthFunc),n.setTest(M.depthTest),n.setMask(M.depthWrite),t.setMask(M.colorWrite);let L=M.stencilWrite;i.setTest(L),L&&(i.setMask(M.stencilWriteMask),i.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),i.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),U(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?de(r.SAMPLE_ALPHA_TO_COVERAGE):ue(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:T,setCullFace:V,setLineWidth:function(M){M!==O&&(q&&r.lineWidth(M),O=M)},setPolygonOffset:U,setScissorTest:function(M){M?de(r.SCISSOR_TEST):ue(r.SCISSOR_TEST)},activeTexture:function(M){M===void 0&&(M=r.TEXTURE0+k-1),Q!==M&&(r.activeTexture(M),Q=M)},bindTexture:function(M,C,z){z===void 0&&(z=Q===null?r.TEXTURE0+k-1:Q);let L=oe[z];L===void 0&&(L={type:void 0,texture:void 0},oe[z]=L),L.type===M&&L.texture===C||(Q!==z&&(r.activeTexture(z),Q=z),r.bindTexture(M,C||he[M]),L.type=M,L.texture=C)},unbindTexture:function(){let M=oe[Q];M!==void 0&&M.type!==void 0&&(r.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},updateUBOMapping:function(M,C){let z=a.get(C);z===void 0&&(z=new WeakMap,a.set(C,z));let L=z.get(M);L===void 0&&(L=r.getUniformBlockIndex(C,M.name),z.set(M,L))},uniformBlockBinding:function(M,C){let z=a.get(C).get(M);s.get(C)!==z&&(r.uniformBlockBinding(C,z,M.__bindingPointIndex),s.set(C,z))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},scissor:function(M){Ae.equals(M)===!1&&(r.scissor(M.x,M.y,M.z,M.w),Ae.copy(M))},viewport:function(M){Ee.equals(M)===!1&&(r.viewport(M.x,M.y,M.z,M.w),Ee.copy(M))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},Q=null,oe={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,m=null,y=null,f=null,g=null,v=null,x=null,S=new Oe(0,0,0),R=0,I=!1,G=null,H=null,O=null,J=null,K=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Ee.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function qd(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ae,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,T){return p?new OffscreenCanvas(E,T):wr("canvas")}function y(E,T,V){let U=1,M=Ne(E);if((M.width>V||M.height>V)&&(U=V/Math.max(M.width,M.height)),U<1){if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let C=Math.floor(U*M.width),z=Math.floor(U*M.height);u===void 0&&(u=m(C,z));let L=T?m(C,z):u;return L.width=C,L.height=z,L.getContext("2d").drawImage(E,0,0,C,z),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+C+"x"+z+")."),L}return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),E}return E}function f(E){return E.generateMipmaps}function g(E){r.generateMipmap(E)}function v(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(E,T,V,U,M=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let C=T;if(T===r.RED&&(V===r.FLOAT&&(C=r.R32F),V===r.HALF_FLOAT&&(C=r.R16F),V===r.UNSIGNED_BYTE&&(C=r.R8)),T===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(C=r.R8UI),V===r.UNSIGNED_SHORT&&(C=r.R16UI),V===r.UNSIGNED_INT&&(C=r.R32UI),V===r.BYTE&&(C=r.R8I),V===r.SHORT&&(C=r.R16I),V===r.INT&&(C=r.R32I)),T===r.RG&&(V===r.FLOAT&&(C=r.RG32F),V===r.HALF_FLOAT&&(C=r.RG16F),V===r.UNSIGNED_BYTE&&(C=r.RG8)),T===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(C=r.RG8UI),V===r.UNSIGNED_SHORT&&(C=r.RG16UI),V===r.UNSIGNED_INT&&(C=r.RG32UI),V===r.BYTE&&(C=r.RG8I),V===r.SHORT&&(C=r.RG16I),V===r.INT&&(C=r.RG32I)),T===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(C=r.RGB8UI),V===r.UNSIGNED_SHORT&&(C=r.RGB16UI),V===r.UNSIGNED_INT&&(C=r.RGB32UI),V===r.BYTE&&(C=r.RGB8I),V===r.SHORT&&(C=r.RGB16I),V===r.INT&&(C=r.RGB32I)),T===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(C=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(C=r.RGBA16UI),V===r.UNSIGNED_INT&&(C=r.RGBA32UI),V===r.BYTE&&(C=r.RGBA8I),V===r.SHORT&&(C=r.RGBA16I),V===r.INT&&(C=r.RGBA32I)),T===r.RGB&&(V===r.UNSIGNED_INT_5_9_9_9_REV&&(C=r.RGB9_E5),V===r.UNSIGNED_INT_10F_11F_11F_REV&&(C=r.R11F_G11F_B10F)),T===r.RGBA){let z=M?br:Ze.getTransfer(U);V===r.FLOAT&&(C=r.RGBA32F),V===r.HALF_FLOAT&&(C=r.RGBA16F),V===r.UNSIGNED_BYTE&&(C=z===Ke?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(C=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(C=r.RGB5_A1)}return C!==r.R16F&&C!==r.R32F&&C!==r.RG16F&&C!==r.RG32F&&C!==r.RGBA16F&&C!==r.RGBA32F||e.get("EXT_color_buffer_float"),C}function S(E,T){let V;return E?T===null||T===Si||T===rr?V=r.DEPTH24_STENCIL8:T===Mn?V=r.DEPTH32F_STENCIL8:T===ir&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Si||T===rr?V=r.DEPTH_COMPONENT24:T===Mn?V=r.DEPTH_COMPONENT32F:T===ir&&(V=r.DEPTH_COMPONENT16),V}function R(E,T){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==_n&&E.minFilter!==vn?Math.log2(Math.max(T.width,T.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?T.mipmaps.length:1}function I(E){let T=E.target;T.removeEventListener("dispose",I),(function(V){let U=n.get(V);if(U.__webglInit===void 0)return;let M=V.source,C=d.get(M);if(C){let z=C[U.__cacheKey];z.usedTimes--,z.usedTimes===0&&H(V),Object.keys(C).length===0&&d.delete(M)}n.remove(V)})(T),T.isVideoTexture&&h.delete(T)}function G(E){let T=E.target;T.removeEventListener("dispose",G),(function(V){let U=n.get(V);if(V.depthTexture&&(V.depthTexture.dispose(),n.remove(V.depthTexture)),V.isWebGLCubeRenderTarget)for(let C=0;C<6;C++){if(Array.isArray(U.__webglFramebuffer[C]))for(let z=0;z<U.__webglFramebuffer[C].length;z++)r.deleteFramebuffer(U.__webglFramebuffer[C][z]);else r.deleteFramebuffer(U.__webglFramebuffer[C]);U.__webglDepthbuffer&&r.deleteRenderbuffer(U.__webglDepthbuffer[C])}else{if(Array.isArray(U.__webglFramebuffer))for(let C=0;C<U.__webglFramebuffer.length;C++)r.deleteFramebuffer(U.__webglFramebuffer[C]);else r.deleteFramebuffer(U.__webglFramebuffer);if(U.__webglDepthbuffer&&r.deleteRenderbuffer(U.__webglDepthbuffer),U.__webglMultisampledFramebuffer&&r.deleteFramebuffer(U.__webglMultisampledFramebuffer),U.__webglColorRenderbuffer)for(let C=0;C<U.__webglColorRenderbuffer.length;C++)U.__webglColorRenderbuffer[C]&&r.deleteRenderbuffer(U.__webglColorRenderbuffer[C]);U.__webglDepthRenderbuffer&&r.deleteRenderbuffer(U.__webglDepthRenderbuffer)}let M=V.textures;for(let C=0,z=M.length;C<z;C++){let L=n.get(M[C]);L.__webglTexture&&(r.deleteTexture(L.__webglTexture),a.memory.textures--),n.remove(M[C])}n.remove(V)})(T)}function H(E){let T=n.get(E);r.deleteTexture(T.__webglTexture);let V=E.source;delete d.get(V)[T.__cacheKey],a.memory.textures--}let O=0;function J(E,T){let V=n.get(E);if(E.isVideoTexture&&(function(U){let M=a.render.frame;h.get(U)!==M&&(h.set(U,M),U.update())})(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&V.__version!==E.version){let U=E.image;if(U===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(U.complete!==!1)return void oe(V,E,T);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else E.isExternalTexture&&(V.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+T)}let K={[di]:r.REPEAT,[Wi]:r.CLAMP_TO_EDGE,[As]:r.MIRRORED_REPEAT},k={[_n]:r.NEAREST,[Vc]:r.NEAREST_MIPMAP_NEAREST,[Zr]:r.NEAREST_MIPMAP_LINEAR,[vn]:r.LINEAR,[Ma]:r.LINEAR_MIPMAP_NEAREST,[Mi]:r.LINEAR_MIPMAP_LINEAR},q={[Yc]:r.NEVER,[eh]:r.ALWAYS,[Zc]:r.LESS,[dl]:r.LEQUAL,[Jc]:r.EQUAL,[Qc]:r.GEQUAL,[Kc]:r.GREATER,[$c]:r.NOTEQUAL};function X(E,T){if(T.type!==Mn||e.has("OES_texture_float_linear")!==!1||T.magFilter!==vn&&T.magFilter!==Ma&&T.magFilter!==Zr&&T.magFilter!==Mi&&T.minFilter!==vn&&T.minFilter!==Ma&&T.minFilter!==Zr&&T.minFilter!==Mi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,K[T.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,K[T.wrapT]),E!==r.TEXTURE_3D&&E!==r.TEXTURE_2D_ARRAY||r.texParameteri(E,r.TEXTURE_WRAP_R,K[T.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,k[T.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,k[T.minFilter]),T.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,q[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===_n||T.minFilter!==Zr&&T.minFilter!==Mi||T.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function $(E,T){let V=!1;E.__webglInit===void 0&&(E.__webglInit=!0,T.addEventListener("dispose",I));let U=T.source,M=d.get(U);M===void 0&&(M={},d.set(U,M));let C=(function(z){let L=[];return L.push(z.wrapS),L.push(z.wrapT),L.push(z.wrapR||0),L.push(z.magFilter),L.push(z.minFilter),L.push(z.anisotropy),L.push(z.internalFormat),L.push(z.format),L.push(z.type),L.push(z.generateMipmaps),L.push(z.premultiplyAlpha),L.push(z.flipY),L.push(z.unpackAlignment),L.push(z.colorSpace),L.join()})(T);if(C!==E.__cacheKey){M[C]===void 0&&(M[C]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,V=!0),M[C].usedTimes++;let z=M[E.__cacheKey];z!==void 0&&(M[E.__cacheKey].usedTimes--,z.usedTimes===0&&H(T)),E.__cacheKey=C,E.__webglTexture=M[C].texture}return V}function Q(E,T,V){return Math.floor(Math.floor(E/V)/T)}function oe(E,T,V){let U=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(U=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(U=r.TEXTURE_3D);let M=$(E,T),C=T.source;t.bindTexture(U,E.__webglTexture,r.TEXTURE0+V);let z=n.get(C);if(C.version!==z.__version||M===!0){t.activeTexture(r.TEXTURE0+V);let L=Ze.getPrimaries(Ze.workingColorSpace),te=T.colorSpace===bi?null:Ze.getPrimaries(T.colorSpace),Y=T.colorSpace===bi||L===te?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let j=y(T.image,!1,i.maxTextureSize);j=Ie(T,j);let le=s.convert(T.format,T.colorSpace),fe=s.convert(T.type),ce,ye=x(T.internalFormat,le,fe,T.colorSpace,T.isVideoTexture);X(U,T);let we=T.mipmaps,Ce=T.isVideoTexture!==!0,ke=z.__version===void 0||M===!0,Xe=C.dataReady,Ye=R(T,j);if(T.isDepthTexture)ye=S(T.format===Kr,T.type),ke&&(Ce?t.texStorage2D(r.TEXTURE_2D,1,ye,j.width,j.height):t.texImage2D(r.TEXTURE_2D,0,ye,j.width,j.height,0,le,fe,null));else if(T.isDataTexture)if(we.length>0){Ce&&ke&&t.texStorage2D(r.TEXTURE_2D,Ye,ye,we[0].width,we[0].height);for(let pe=0,Me=we.length;pe<Me;pe++)ce=we[pe],Ce?Xe&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,ce.width,ce.height,le,fe,ce.data):t.texImage2D(r.TEXTURE_2D,pe,ye,ce.width,ce.height,0,le,fe,ce.data);T.generateMipmaps=!1}else Ce?(ke&&t.texStorage2D(r.TEXTURE_2D,Ye,ye,j.width,j.height),Xe&&(function(pe,Me,He,Qe){let Te=pe.updateRanges;if(Te.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Me.width,Me.height,He,Qe,Me.data);else{Te.sort((F,lt)=>F.start-lt.start);let je=0;for(let F=1;F<Te.length;F++){let lt=Te[je],mt=Te[F],tt=lt.start+lt.count,on=Q(mt.start,Me.width,4),Ht=Q(lt.start,Me.width,4);mt.start<=tt+1&&on===Ht&&Q(mt.start+mt.count-1,Me.width,4)===on?lt.count=Math.max(lt.count,mt.start+mt.count-lt.start):(++je,Te[je]=mt)}Te.length=je+1;let Ge=r.getParameter(r.UNPACK_ROW_LENGTH),It=r.getParameter(r.UNPACK_SKIP_PIXELS),St=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Me.width);for(let F=0,lt=Te.length;F<lt;F++){let mt=Te[F],tt=Math.floor(mt.start/4),on=Math.ceil(mt.count/4),Ht=tt%Me.width,bn=Math.floor(tt/Me.width),ii=on;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ht),r.pixelStorei(r.UNPACK_SKIP_ROWS,bn),t.texSubImage2D(r.TEXTURE_2D,0,Ht,bn,ii,1,He,Qe,Me.data)}pe.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Ge),r.pixelStorei(r.UNPACK_SKIP_PIXELS,It),r.pixelStorei(r.UNPACK_SKIP_ROWS,St)}})(T,j,le,fe)):t.texImage2D(r.TEXTURE_2D,0,ye,j.width,j.height,0,le,fe,j.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ce&&ke&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ye,ye,we[0].width,we[0].height,j.depth);for(let pe=0,Me=we.length;pe<Me;pe++)if(ce=we[pe],T.format!==an)if(le!==null)if(Ce){if(Xe)if(T.layerUpdates.size>0){let He=vl(ce.width,ce.height,T.format,T.type);for(let Qe of T.layerUpdates){let Te=ce.data.subarray(Qe*He/ce.data.BYTES_PER_ELEMENT,(Qe+1)*He/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,Qe,ce.width,ce.height,1,le,Te)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,ce.width,ce.height,j.depth,le,ce.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,ye,ce.width,ce.height,j.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?Xe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,ce.width,ce.height,j.depth,le,fe,ce.data):t.texImage3D(r.TEXTURE_2D_ARRAY,pe,ye,ce.width,ce.height,j.depth,0,le,fe,ce.data)}else{Ce&&ke&&t.texStorage2D(r.TEXTURE_2D,Ye,ye,we[0].width,we[0].height);for(let pe=0,Me=we.length;pe<Me;pe++)ce=we[pe],T.format!==an?le!==null?Ce?Xe&&t.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(r.TEXTURE_2D,pe,ye,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?Xe&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,ce.width,ce.height,le,fe,ce.data):t.texImage2D(r.TEXTURE_2D,pe,ye,ce.width,ce.height,0,le,fe,ce.data)}else if(T.isDataArrayTexture)if(Ce){if(ke&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ye,ye,j.width,j.height,j.depth),Xe)if(T.layerUpdates.size>0){let pe=vl(j.width,j.height,T.format,T.type);for(let Me of T.layerUpdates){let He=j.data.subarray(Me*pe/j.data.BYTES_PER_ELEMENT,(Me+1)*pe/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Me,j.width,j.height,1,le,fe,He)}T.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,le,fe,j.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ye,j.width,j.height,j.depth,0,le,fe,j.data);else if(T.isData3DTexture)Ce?(ke&&t.texStorage3D(r.TEXTURE_3D,Ye,ye,j.width,j.height,j.depth),Xe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,le,fe,j.data)):t.texImage3D(r.TEXTURE_3D,0,ye,j.width,j.height,j.depth,0,le,fe,j.data);else if(T.isFramebufferTexture){if(ke)if(Ce)t.texStorage2D(r.TEXTURE_2D,Ye,ye,j.width,j.height);else{let pe=j.width,Me=j.height;for(let He=0;He<Ye;He++)t.texImage2D(r.TEXTURE_2D,He,ye,pe,Me,0,le,fe,null),pe>>=1,Me>>=1}}else if(we.length>0){if(Ce&&ke){let pe=Ne(we[0]);t.texStorage2D(r.TEXTURE_2D,Ye,ye,pe.width,pe.height)}for(let pe=0,Me=we.length;pe<Me;pe++)ce=we[pe],Ce?Xe&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,le,fe,ce):t.texImage2D(r.TEXTURE_2D,pe,ye,le,fe,ce);T.generateMipmaps=!1}else if(Ce){if(ke){let pe=Ne(j);t.texStorage2D(r.TEXTURE_2D,Ye,ye,pe.width,pe.height)}Xe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le,fe,j)}else t.texImage2D(r.TEXTURE_2D,0,ye,le,fe,j);f(T)&&g(U),z.__version=C.version,T.onUpdate&&T.onUpdate(T)}E.__version=T.version}function re(E,T,V,U,M,C){let z=s.convert(V.format,V.colorSpace),L=s.convert(V.type),te=x(V.internalFormat,z,L,V.colorSpace),Y=n.get(T),j=n.get(V);if(j.__renderTarget=T,!Y.__hasExternalTextures){let le=Math.max(1,T.width>>C),fe=Math.max(1,T.height>>C);M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?t.texImage3D(M,C,te,le,fe,T.depth,0,z,L,null):t.texImage2D(M,C,te,le,fe,0,z,L,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),ue(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,U,M,j.__webglTexture,0,de(T)):(M===r.TEXTURE_2D||M>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&M<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,U,M,j.__webglTexture,C),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ve(E,T,V){if(r.bindRenderbuffer(r.RENDERBUFFER,E),T.depthBuffer){let U=T.depthTexture,M=U&&U.isDepthTexture?U.type:null,C=S(T.stencilBuffer,M),z=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,L=de(T);ue(T)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L,C,T.width,T.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,L,C,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,C,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,z,r.RENDERBUFFER,E)}else{let U=T.textures;for(let M=0;M<U.length;M++){let C=U[M],z=s.convert(C.format,C.colorSpace),L=s.convert(C.type),te=x(C.internalFormat,z,L,C.colorSpace),Y=de(T);V&&ue(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,te,T.width,T.height):ue(T)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Y,te,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,te,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ae(E,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!T.depthTexture||!T.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let V=n.get(T.depthTexture);V.__renderTarget=T,V.__webglTexture&&T.depthTexture.image.width===T.width&&T.depthTexture.image.height===T.height||(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),J(T.depthTexture,0);let U=V.__webglTexture,M=de(T);if(T.depthTexture.format===Jr)ue(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,U,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,U,0);else{if(T.depthTexture.format!==Kr)throw new Error("Unknown depthTexture format");ue(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,U,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,U,0)}}function Ee(E){let T=n.get(E),V=E.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==E.depthTexture){let U=E.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),U){let M=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,U.removeEventListener("dispose",M)};U.addEventListener("dispose",M),T.__depthDisposeCallback=M}T.__boundDepthTexture=U}if(E.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");let U=E.texture.mipmaps;U&&U.length>0?Ae(T.__webglFramebuffer[0],E):Ae(T.__webglFramebuffer,E)}else if(V){T.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[U]),T.__webglDepthbuffer[U]===void 0)T.__webglDepthbuffer[U]=r.createRenderbuffer(),ve(T.__webglDepthbuffer[U],E,!1);else{let M=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,C=T.__webglDepthbuffer[U];r.bindRenderbuffer(r.RENDERBUFFER,C),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,C)}}else{let U=E.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),ve(T.__webglDepthbuffer,E,!1);else{let M=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,C=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,C),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,C)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Le=[],he=[];function de(E){return Math.min(i.maxSamples,E.samples)}function ue(E){let T=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ie(E,T){let V=E.colorSpace,U=E.format,M=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||V!==pi&&V!==bi&&(Ze.getTransfer(V)===Ke?U===an&&M===xn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function Ne(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=function(){let E=O;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),O+=1,E},this.resetTextureUnits=function(){O=0},this.setTexture2D=J,this.setTexture2DArray=function(E,T){let V=n.get(E);E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version?oe(V,E,T):t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+T)},this.setTexture3D=function(E,T){let V=n.get(E);E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version?oe(V,E,T):t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+T)},this.setTextureCube=function(E,T){let V=n.get(E);E.version>0&&V.__version!==E.version?(function(U,M,C){if(M.image.length!==6)return;let z=$(U,M),L=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+C);let te=n.get(L);if(L.version!==te.__version||z===!0){t.activeTexture(r.TEXTURE0+C);let Y=Ze.getPrimaries(Ze.workingColorSpace),j=M.colorSpace===bi?null:Ze.getPrimaries(M.colorSpace),le=M.colorSpace===bi||Y===j?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let fe=M.isCompressedTexture||M.image[0].isCompressedTexture,ce=M.image[0]&&M.image[0].isDataTexture,ye=[];for(let Te=0;Te<6;Te++)ye[Te]=fe||ce?ce?M.image[Te].image:M.image[Te]:y(M.image[Te],!0,i.maxCubemapSize),ye[Te]=Ie(M,ye[Te]);let we=ye[0],Ce=s.convert(M.format,M.colorSpace),ke=s.convert(M.type),Xe=x(M.internalFormat,Ce,ke,M.colorSpace),Ye=M.isVideoTexture!==!0,pe=te.__version===void 0||z===!0,Me=L.dataReady,He,Qe=R(M,we);if(X(r.TEXTURE_CUBE_MAP,M),fe){Ye&&pe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Qe,Xe,we.width,we.height);for(let Te=0;Te<6;Te++){He=ye[Te].mipmaps;for(let je=0;je<He.length;je++){let Ge=He[je];M.format!==an?Ce!==null?Ye?Me&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je,0,0,Ge.width,Ge.height,Ce,Ge.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je,Xe,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?Me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je,0,0,Ge.width,Ge.height,Ce,ke,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je,Xe,Ge.width,Ge.height,0,Ce,ke,Ge.data)}}}else{if(He=M.mipmaps,Ye&&pe){He.length>0&&Qe++;let Te=Ne(ye[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Qe,Xe,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(ce){Ye?Me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,ye[Te].width,ye[Te].height,Ce,ke,ye[Te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Xe,ye[Te].width,ye[Te].height,0,Ce,ke,ye[Te].data);for(let je=0;je<He.length;je++){let Ge=He[je].image[Te].image;Ye?Me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je+1,0,0,Ge.width,Ge.height,Ce,ke,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je+1,Xe,Ge.width,Ge.height,0,Ce,ke,Ge.data)}}else{Ye?Me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Ce,ke,ye[Te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Xe,Ce,ke,ye[Te]);for(let je=0;je<He.length;je++){let Ge=He[je];Ye?Me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je+1,0,0,Ce,ke,Ge.image[Te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,je+1,Xe,Ce,ke,Ge.image[Te])}}}f(M)&&g(r.TEXTURE_CUBE_MAP),te.__version=L.version,M.onUpdate&&M.onUpdate(M)}U.__version=M.version})(V,E,T):t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+T)},this.rebindTextures=function(E,T,V){let U=n.get(E);T!==void 0&&re(U.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&Ee(E)},this.setupRenderTarget=function(E){let T=E.texture,V=n.get(E),U=n.get(T);E.addEventListener("dispose",G);let M=E.textures,C=E.isWebGLCubeRenderTarget===!0,z=M.length>1;if(z||(U.__webglTexture===void 0&&(U.__webglTexture=r.createTexture()),U.__version=T.version,a.memory.textures++),C){V.__webglFramebuffer=[];for(let L=0;L<6;L++)if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[L]=[];for(let te=0;te<T.mipmaps.length;te++)V.__webglFramebuffer[L][te]=r.createFramebuffer()}else V.__webglFramebuffer[L]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let L=0;L<T.mipmaps.length;L++)V.__webglFramebuffer[L]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(z)for(let L=0,te=M.length;L<te;L++){let Y=n.get(M[L]);Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture(),a.memory.textures++)}if(E.samples>0&&ue(E)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let L=0;L<M.length;L++){let te=M[L];V.__webglColorRenderbuffer[L]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[L]);let Y=s.convert(te.format,te.colorSpace),j=s.convert(te.type),le=x(te.internalFormat,Y,j,te.colorSpace,E.isXRRenderTarget===!0),fe=de(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,fe,le,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.RENDERBUFFER,V.__webglColorRenderbuffer[L])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),ve(V.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(C){t.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture),X(r.TEXTURE_CUBE_MAP,T);for(let L=0;L<6;L++)if(T.mipmaps&&T.mipmaps.length>0)for(let te=0;te<T.mipmaps.length;te++)re(V.__webglFramebuffer[L][te],E,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+L,te);else re(V.__webglFramebuffer[L],E,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);f(T)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(z){for(let L=0,te=M.length;L<te;L++){let Y=M[L],j=n.get(Y),le=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(le,j.__webglTexture),X(le,Y),re(V.__webglFramebuffer,E,Y,r.COLOR_ATTACHMENT0+L,le,0),f(Y)&&g(le)}t.unbindTexture()}else{let L=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(L=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(L,U.__webglTexture),X(L,T),T.mipmaps&&T.mipmaps.length>0)for(let te=0;te<T.mipmaps.length;te++)re(V.__webglFramebuffer[te],E,T,r.COLOR_ATTACHMENT0,L,te);else re(V.__webglFramebuffer,E,T,r.COLOR_ATTACHMENT0,L,0);f(T)&&g(L),t.unbindTexture()}E.depthBuffer&&Ee(E)},this.updateRenderTargetMipmap=function(E){let T=E.textures;for(let V=0,U=T.length;V<U;V++){let M=T[V];if(f(M)){let C=v(E),z=n.get(M).__webglTexture;t.bindTexture(C,z),g(C),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(E){if(E.samples>0){if(ue(E)===!1){let T=E.textures,V=E.width,U=E.height,M=r.COLOR_BUFFER_BIT,C=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=n.get(E),L=T.length>1;if(L)for(let Y=0;Y<T.length;Y++)t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,z.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,z.__webglMultisampledFramebuffer);let te=E.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglFramebuffer);for(let Y=0;Y<T.length;Y++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(M|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(M|=r.STENCIL_BUFFER_BIT)),L){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let j=n.get(T[Y]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,j,0)}r.blitFramebuffer(0,0,V,U,0,0,V,U,M,r.NEAREST),c===!0&&(Le.length=0,he.length=0,Le.push(r.COLOR_ATTACHMENT0+Y),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Le.push(C),he.push(C),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,he)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Le))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),L)for(let Y=0;Y<T.length;Y++){t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let j=n.get(T[Y]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,z.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,j,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let T=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}},this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=re,this.useMultisampledRTT=ue}function Yd(r,e){return{convert:function(t,n=bi){let i,s=Ze.getTransfer(n);if(t===xn)return r.UNSIGNED_BYTE;if(t===ba)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Ta)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Do)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Uo)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Po)return r.BYTE;if(t===Lo)return r.SHORT;if(t===ir)return r.UNSIGNED_SHORT;if(t===Sa)return r.INT;if(t===Si)return r.UNSIGNED_INT;if(t===Mn)return r.FLOAT;if(t===ni)return r.HALF_FLOAT;if(t===kc)return r.ALPHA;if(t===Hc)return r.RGB;if(t===an)return r.RGBA;if(t===Jr)return r.DEPTH_COMPONENT;if(t===Kr)return r.DEPTH_STENCIL;if(t===No)return r.RED;if(t===wa)return r.RED_INTEGER;if(t===Wc)return r.RG;if(t===Fo)return r.RG_INTEGER;if(t===Oo)return r.RGBA_INTEGER;if(t===Ea||t===Aa||t===Ca||t===Ra)if(s===Ke){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===Ea)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Aa)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Ca)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ra)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===Ea)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Aa)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Ca)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ra)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Bo||t===zo||t===Go||t===Vo){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Bo)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===zo)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Go)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Vo)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===ko||t===Ho||t===Wo){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===ko||t===Ho)return s===Ke?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Wo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Xo||t===jo||t===qo||t===Yo||t===Zo||t===Jo||t===Ko||t===$o||t===Qo||t===el||t===tl||t===nl||t===il||t===rl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Xo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===jo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===qo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Yo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Zo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Jo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ko)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===$o)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Qo)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===el)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===tl)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===nl)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===il)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===rl)return s===Ke?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===sl||t===al||t===ol){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===sl)return s===Ke?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===al)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===ol)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===ll||t===cl||t===hl||t===ul){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===ll)return i.COMPRESSED_RED_RGTC1_EXT;if(t===cl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===hl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ul)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===rr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Pl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Lr(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new zt({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Dt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ll=class extends Un{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,m=null,y=typeof XRWebGLBinding<"u",f=new Pl,g={},v=t.getContextAttributes(),x=null,S=null,R=[],I=[],G=new ae,H=null,O=new Mt;O.viewport=new Je;let J=new Mt;J.viewport=new Je;let K=[O,J],k=new ca,q=null,X=null;function $(he){let de=I.indexOf(he.inputSource);if(de===-1)return;let ue=R[de];ue!==void 0&&(ue.update(he.inputSource,he.frame,l||a),ue.dispatchEvent({type:he.type,data:he.inputSource}))}function Q(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",Q),i.removeEventListener("inputsourceschange",oe);for(let he=0;he<R.length;he++){let de=I[he];de!==null&&(I[he]=null,R[he].disconnect(de))}q=null,X=null,f.reset();for(let he in g)delete g[he];e.setRenderTarget(x),p=null,d=null,u=null,i=null,S=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(H),e.setSize(G.width,G.height,!1),n.dispatchEvent({type:"sessionend"})}function oe(he){for(let de=0;de<he.removed.length;de++){let ue=he.removed[de],Ie=I.indexOf(ue);Ie>=0&&(I[Ie]=null,R[Ie].disconnect(ue))}for(let de=0;de<he.added.length;de++){let ue=he.added[de],Ie=I.indexOf(ue);if(Ie===-1){for(let E=0;E<R.length;E++){if(E>=I.length){I.push(ue),Ie=E;break}if(I[E]===null){I[E]=ue,Ie=E;break}}if(Ie===-1)break}let Ne=R[Ie];Ne&&Ne.connect(ue)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let de=R[he];return de===void 0&&(de=new Yi,R[he]=de),de.getTargetRaySpace()},this.getControllerGrip=function(he){let de=R[he];return de===void 0&&(de=new Yi,R[he]=de),de.getGripSpace()},this.getHand=function(he){let de=R[he];return de===void 0&&(de=new Yi,R[he]=de),de.getHandSpace()},this.setFramebufferScaleFactor=function(he){s=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){o=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(he){if(i=he,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",Q),i.addEventListener("inputsourceschange",oe),v.xrCompatible!==!0&&await t.makeXRCompatible(),H=e.getPixelRatio(),e.getSize(G),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,ue=null,Ie=null;v.depth&&(Ie=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=v.stencil?Kr:Jr,ue=v.stencil?rr:Si);let Ne={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ne),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new jt(d.textureWidth,d.textureHeight,{format:an,type:xn,depthTexture:new Pr(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let de={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,de),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new jt(p.framebufferWidth,p.framebufferHeight,{format:an,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Le.setContext(i),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let re=new w,ve=new w;function Ae(he,de){de===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(de.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(i===null)return;let de=he.near,ue=he.far;f.texture!==null&&(f.depthNear>0&&(de=f.depthNear),f.depthFar>0&&(ue=f.depthFar)),k.near=J.near=O.near=de,k.far=J.far=O.far=ue,q===k.near&&X===k.far||(i.updateRenderState({depthNear:k.near,depthFar:k.far}),q=k.near,X=k.far),k.layers.mask=6|he.layers.mask,O.layers.mask=3&k.layers.mask,J.layers.mask=5&k.layers.mask;let Ie=he.parent,Ne=k.cameras;Ae(k,Ie);for(let E=0;E<Ne.length;E++)Ae(Ne[E],Ie);Ne.length===2?(function(E,T,V){re.setFromMatrixPosition(T.matrixWorld),ve.setFromMatrixPosition(V.matrixWorld);let U=re.distanceTo(ve),M=T.projectionMatrix.elements,C=V.projectionMatrix.elements,z=M[14]/(M[10]-1),L=M[14]/(M[10]+1),te=(M[9]+1)/M[5],Y=(M[9]-1)/M[5],j=(M[8]-1)/M[0],le=(C[8]+1)/C[0],fe=z*j,ce=z*le,ye=U/(-j+le),we=ye*-j;if(T.matrixWorld.decompose(E.position,E.quaternion,E.scale),E.translateX(we),E.translateZ(ye),E.matrixWorld.compose(E.position,E.quaternion,E.scale),E.matrixWorldInverse.copy(E.matrixWorld).invert(),M[10]===-1)E.projectionMatrix.copy(T.projectionMatrix),E.projectionMatrixInverse.copy(T.projectionMatrixInverse);else{let Ce=z+ye,ke=L+ye,Xe=fe-we,Ye=ce+(U-we),pe=te*L/ke*Ce,Me=Y*L/ke*Ce;E.projectionMatrix.makePerspective(Xe,Ye,pe,Me,Ce,ke),E.projectionMatrixInverse.copy(E.projectionMatrix).invert()}})(k,O,J):k.projectionMatrix.copy(O.projectionMatrix),(function(E,T,V){V===null?E.matrix.copy(T.matrixWorld):(E.matrix.copy(V.matrixWorld),E.matrix.invert(),E.matrix.multiply(T.matrixWorld)),E.matrix.decompose(E.position,E.quaternion,E.scale),E.updateMatrixWorld(!0),E.projectionMatrix.copy(T.projectionMatrix),E.projectionMatrixInverse.copy(T.projectionMatrixInverse),E.isPerspectiveCamera&&(E.fov=2*Rs*Math.atan(1/E.projectionMatrix.elements[5]),E.zoom=1)})(he,k,Ie)},this.getCamera=function(){return k},this.getFoveation=function(){if(d!==null||p!==null)return c},this.setFoveation=function(he){c=he,d!==null&&(d.fixedFoveation=he),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=he)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(k)},this.getCameraTexture=function(he){return g[he]};let Ee=null,Le=new Lh;Le.setAnimationLoop(function(he,de){if(h=de.getViewerPose(l||a),m=de,h!==null){let ue=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Ie=!1;ue.length!==k.cameras.length&&(k.cameras.length=0,Ie=!0);for(let E=0;E<ue.length;E++){let T=ue[E],V=null;if(p!==null)V=p.getViewport(T);else{let M=u.getViewSubImage(d,T);V=M.viewport,E===0&&(e.setRenderTargetTextures(S,M.colorTexture,M.depthStencilTexture),e.setRenderTarget(S))}let U=K[E];U===void 0&&(U=new Mt,U.layers.enable(E),U.viewport=new Je,K[E]=U),U.matrix.fromArray(T.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(T.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(V.x,V.y,V.width,V.height),E===0&&(k.matrix.copy(U.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ie===!0&&k.cameras.push(U)}let Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let E=u.getDepthInformation(ue[0]);E&&E.isValid&&E.texture&&f.init(E,i.renderState)}if(Ne&&Ne.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let E=0;E<ue.length;E++){let T=ue[E].camera;if(T){let V=g[T];V||(V=new Lr,g[T]=V);let U=u.getCameraImage(T);V.sourceTexture=U}}}}for(let ue=0;ue<R.length;ue++){let Ie=I[ue],Ne=R[ue];Ie!==null&&Ne!==void 0&&Ne.update(Ie,de,l||a)}Ee&&Ee(he,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),m=null}),this.setAnimationLoop=function(he){Ee=he},this.dispose=function(){}}},Ei=new rn,Zd=new Be;function Jd(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===kt&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===kt&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Ei.copy(c),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),i.envMapRotation.value.setFromMatrix4(Zd.makeRotationFromEuler(Ei)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,fl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===kt&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Kd(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,p,m){let y=u.value,f=d+"_"+p;if(m[f]===void 0)return m[f]=typeof y=="number"||typeof y=="boolean"?y:y.clone(),!0;{let g=m[f];if(typeof y=="number"||typeof y=="boolean"){if(g!==y)return m[f]=y,!0}else if(g.equals(y)===!1)return g.copy(y),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&((function(f){let g=f.uniforms,v=0,x=16;for(let R=0,I=g.length;R<I;R++){let G=Array.isArray(g[R])?g[R]:[g[R]];for(let H=0,O=G.length;H<O;H++){let J=G[H],K=Array.isArray(J.value)?J.value:[J.value];for(let k=0,q=K.length;k<q;k++){let X=l(K[k]),$=v%x,Q=$%X.boundary,oe=$+Q;v+=Q,oe!==0&&x-oe<X.storage&&(v+=x-oe),J.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=v,v+=X.storage}}}let S=v%x;S>0&&(v+=x-S),f.__size=v,f.__cache={}})(u),p=(function(f){let g=(function(){for(let R=0;R<o;R++)if(a.indexOf(R)===-1)return a.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),x=f.__size,S=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,x,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=p,u.addEventListener("dispose",h));let m=d.program;n.updateUBOMapping(u,m);let y=e.render.frame;s[u.id]!==y&&((function(f){let g=i[f.id],v=f.uniforms,x=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let S=0,R=v.length;S<R;S++){let I=Array.isArray(v[S])?v[S]:[v[S]];for(let G=0,H=I.length;G<H;G++){let O=I[G];if(c(O,S,G,x)===!0){let J=O.__offset,K=Array.isArray(O.value)?O.value:[O.value],k=0;for(let q=0;q<K.length;q++){let X=K[q],$=l(X);typeof X=="number"||typeof X=="boolean"?(O.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,J+k,O.__data)):X.isMatrix3?(O.__data[0]=X.elements[0],O.__data[1]=X.elements[1],O.__data[2]=X.elements[2],O.__data[3]=0,O.__data[4]=X.elements[3],O.__data[5]=X.elements[4],O.__data[6]=X.elements[5],O.__data[7]=0,O.__data[8]=X.elements[6],O.__data[9]=X.elements[7],O.__data[10]=X.elements[8],O.__data[11]=0):(X.toArray(O.__data,k),k+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,J,O.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=y)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Da=class{constructor(e={}){let{canvas:t=th(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let m=new Uint32Array(4),y=new Int32Array(4),f=null,g=null,v=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,R=!1;this._outputColorSpace=at;let I=0,G=0,H=null,O=-1,J=null,K=new Je,k=new Je,q=null,X=new Oe(0),$=0,Q=t.width,oe=t.height,re=1,ve=null,Ae=null,Ee=new Je(0,0,Q,oe),Le=new Je(0,0,Q,oe),he=!1,de=new Kn,ue=!1,Ie=!1,Ne=new Be,E=new w,T=new Je,V={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},U=!1;function M(){return H===null?re:1}let C,z,L,te,Y,j,le,fe,ce,ye,we,Ce,ke,Xe,Ye,pe,Me,He,Qe,Te,je,Ge,It,St,F=n;function lt(A,Z){return t.getContext(A,Z)}try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",on,!1),t.addEventListener("webglcontextrestored",Ht,!1),t.addEventListener("webglcontextcreationerror",bn,!1),F===null){let Z="webgl2";if(F=lt(Z,A),F===null)throw lt(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}function mt(){C=new Du(F),C.init(),Ge=new Yd(F,C),z=new Cu(F,C,e,Ge),L=new jd(F,C),z.reversedDepthBuffer&&d&&L.buffers.depth.setReversed(!0),te=new Fu(F),Y=new Fd,j=new qd(F,C,L,Y,z,Ge,te),le=new Iu(S),fe=new Lu(S),ce=new bu(F),It=new Eu(F,ce),ye=new Uu(F,ce,te,It),we=new Bu(F,ye,ce,te),Qe=new Ou(F,z,j),pe=new Ru(Y),Ce=new Nd(S,le,fe,C,z,It,pe),ke=new Jd(S,Y),Xe=new Bd,Ye=new Hd(C),He=new wu(S,le,fe,L,we,p,c),Me=new Wd(S,we,z),St=new Kd(F,te,z,L),Te=new Au(F,C,te),je=new Nu(F,C,te),te.programs=Ce.programs,S.capabilities=z,S.extensions=C,S.properties=Y,S.renderLists=Xe,S.shadowMap=Me,S.state=L,S.info=te}mt();let tt=new Ll(S,F);function on(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ht(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let A=te.autoReset,Z=Me.enabled,ne=Me.autoUpdate,se=Me.needsUpdate,_=Me.type;mt(),te.autoReset=A,Me.enabled=Z,Me.autoUpdate=ne,Me.needsUpdate=se,Me.type=_}function bn(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ii(A){let Z=A.target;Z.removeEventListener("dispose",ii),(function(ne){(function(se){let _=Y.get(se).programs;_!==void 0&&(_.forEach(function(b){Ce.releaseProgram(b)}),se.isShaderMaterial&&Ce.releaseShaderCache(se))})(ne),Y.remove(ne)})(Z)}function ln(A,Z,ne){A.transparent===!0&&A.side===Ct&&A.forceSinglePass===!1?(A.side=kt,A.needsUpdate=!0,cn(A,Z,ne),A.side=er,A.needsUpdate=!0,cn(A,Z,ne),A.side=Ct):cn(A,Z,ne)}this.xr=tt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let A=C.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=C.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(A){A!==void 0&&(re=A,this.setSize(Q,oe,!1))},this.getSize=function(A){return A.set(Q,oe)},this.setSize=function(A,Z,ne=!0){tt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(Q=A,oe=Z,t.width=Math.floor(A*re),t.height=Math.floor(Z*re),ne===!0&&(t.style.width=A+"px",t.style.height=Z+"px"),this.setViewport(0,0,A,Z))},this.getDrawingBufferSize=function(A){return A.set(Q*re,oe*re).floor()},this.setDrawingBufferSize=function(A,Z,ne){Q=A,oe=Z,re=ne,t.width=Math.floor(A*ne),t.height=Math.floor(Z*ne),this.setViewport(0,0,A,Z)},this.getCurrentViewport=function(A){return A.copy(K)},this.getViewport=function(A){return A.copy(Ee)},this.setViewport=function(A,Z,ne,se){A.isVector4?Ee.set(A.x,A.y,A.z,A.w):Ee.set(A,Z,ne,se),L.viewport(K.copy(Ee).multiplyScalar(re).round())},this.getScissor=function(A){return A.copy(Le)},this.setScissor=function(A,Z,ne,se){A.isVector4?Le.set(A.x,A.y,A.z,A.w):Le.set(A,Z,ne,se),L.scissor(k.copy(Le).multiplyScalar(re).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(A){L.setScissorTest(he=A)},this.setOpaqueSort=function(A){ve=A},this.setTransparentSort=function(A){Ae=A},this.getClearColor=function(A){return A.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(A=!0,Z=!0,ne=!0){let se=0;if(A){let _=!1;if(H!==null){let b=H.texture.format;_=b===Oo||b===Fo||b===wa}if(_){let b=H.texture.type,P=b===xn||b===Si||b===ir||b===rr||b===ba||b===Ta,W=He.getClearColor(),D=He.getClearAlpha(),B=W.r,N=W.g,ee=W.b;P?(m[0]=B,m[1]=N,m[2]=ee,m[3]=D,F.clearBufferuiv(F.COLOR,0,m)):(y[0]=B,y[1]=N,y[2]=ee,y[3]=D,F.clearBufferiv(F.COLOR,0,y))}else se|=F.COLOR_BUFFER_BIT}Z&&(se|=F.DEPTH_BUFFER_BIT),ne&&(se|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",on,!1),t.removeEventListener("webglcontextrestored",Ht,!1),t.removeEventListener("webglcontextcreationerror",bn,!1),He.dispose(),Xe.dispose(),Ye.dispose(),Y.dispose(),le.dispose(),fe.dispose(),we.dispose(),It.dispose(),St.dispose(),Ce.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",xt),tt.removeEventListener("sessionend",nt),Yt.stop()},this.renderBufferDirect=function(A,Z,ne,se,_,b){Z===null&&(Z=V);let P=_.isMesh&&_.matrixWorld.determinant()<0,W=(function(xe,Fe,Ue,_e,Se){Fe.isScene!==!0&&(Fe=V),j.resetTextureUnits();let Tt=Fe.fog,ri=_e.isMeshStandardMaterial?Fe.environment:null,si=H===null?S.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:pi,Vn=(_e.isMeshStandardMaterial?fe:le).get(_e.envMap||ri),un=_e.vertexColors===!0&&!!Ue.attributes.color&&Ue.attributes.color.itemSize===4,Ii=!!Ue.attributes.tangent&&(!!_e.normalMap||_e.anisotropy>0),wn=!!Ue.morphAttributes.position,Na=!!Ue.morphAttributes.normal,Pi=!!Ue.morphAttributes.color,Ul=Gn;_e.toneMapped&&(H!==null&&H.isXRRenderTarget!==!0||(Ul=S.toneMapping));let Nl=Ue.morphAttributes.position||Ue.morphAttributes.normal||Ue.morphAttributes.color,Bh=Nl!==void 0?Nl.length:0,qe=Y.get(_e),zh=g.state.lights;if(ue===!0&&(Ie===!0||xe!==J)){let Wt=xe===J&&_e.id===O;pe.setState(_e,xe,Wt)}let Zt=!1;_e.version===qe.__version?qe.needsLights&&qe.lightsStateVersion!==zh.state.version||qe.outputColorSpace!==si||Se.isBatchedMesh&&qe.batching===!1?Zt=!0:Se.isBatchedMesh||qe.batching!==!0?Se.isBatchedMesh&&qe.batchingColor===!0&&Se.colorTexture===null||Se.isBatchedMesh&&qe.batchingColor===!1&&Se.colorTexture!==null||Se.isInstancedMesh&&qe.instancing===!1?Zt=!0:Se.isInstancedMesh||qe.instancing!==!0?Se.isSkinnedMesh&&qe.skinning===!1?Zt=!0:Se.isSkinnedMesh||qe.skinning!==!0?Se.isInstancedMesh&&qe.instancingColor===!0&&Se.instanceColor===null||Se.isInstancedMesh&&qe.instancingColor===!1&&Se.instanceColor!==null||Se.isInstancedMesh&&qe.instancingMorph===!0&&Se.morphTexture===null||Se.isInstancedMesh&&qe.instancingMorph===!1&&Se.morphTexture!==null||qe.envMap!==Vn||_e.fog===!0&&qe.fog!==Tt?Zt=!0:qe.numClippingPlanes===void 0||qe.numClippingPlanes===pe.numPlanes&&qe.numIntersection===pe.numIntersection?(qe.vertexAlphas!==un||qe.vertexTangents!==Ii||qe.morphTargets!==wn||qe.morphNormals!==Na||qe.morphColors!==Pi||qe.toneMapping!==Ul||qe.morphTargetsCount!==Bh)&&(Zt=!0):Zt=!0:Zt=!0:Zt=!0:Zt=!0:(Zt=!0,qe.__version=_e.version);let ai=qe.currentProgram;Zt===!0&&(ai=cn(_e,Fe,Se));let Fl=!1,dr=!1,Fa=!1,ht=ai.getUniforms(),kn=qe.uniforms;if(L.useProgram(ai.program)&&(Fl=!0,dr=!0,Fa=!0),_e.id!==O&&(O=_e.id,dr=!0),Fl||J!==xe){L.buffers.depth.getReversed()&&xe.reversedDepth!==!0&&(xe._reversedDepth=!0,xe.updateProjectionMatrix()),ht.setValue(F,"projectionMatrix",xe.projectionMatrix),ht.setValue(F,"viewMatrix",xe.matrixWorldInverse);let Wt=ht.map.cameraPosition;Wt!==void 0&&Wt.setValue(F,E.setFromMatrixPosition(xe.matrixWorld)),z.logarithmicDepthBuffer&&ht.setValue(F,"logDepthBufFC",2/(Math.log(xe.far+1)/Math.LN2)),(_e.isMeshPhongMaterial||_e.isMeshToonMaterial||_e.isMeshLambertMaterial||_e.isMeshBasicMaterial||_e.isMeshStandardMaterial||_e.isShaderMaterial)&&ht.setValue(F,"isOrthographic",xe.isOrthographicCamera===!0),J!==xe&&(J=xe,dr=!0,Fa=!0)}if(Se.isSkinnedMesh){ht.setOptional(F,Se,"bindMatrix"),ht.setOptional(F,Se,"bindMatrixInverse");let Wt=Se.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),ht.setValue(F,"boneTexture",Wt.boneTexture,j))}Se.isBatchedMesh&&(ht.setOptional(F,Se,"batchingTexture"),ht.setValue(F,"batchingTexture",Se._matricesTexture,j),ht.setOptional(F,Se,"batchingIdTexture"),ht.setValue(F,"batchingIdTexture",Se._indirectTexture,j),ht.setOptional(F,Se,"batchingColorTexture"),Se._colorsTexture!==null&&ht.setValue(F,"batchingColorTexture",Se._colorsTexture,j));let Oa=Ue.morphAttributes;Oa.position===void 0&&Oa.normal===void 0&&Oa.color===void 0||Qe.update(Se,Ue,ai),(dr||qe.receiveShadow!==Se.receiveShadow)&&(qe.receiveShadow=Se.receiveShadow,ht.setValue(F,"receiveShadow",Se.receiveShadow)),_e.isMeshGouraudMaterial&&_e.envMap!==null&&(kn.envMap.value=Vn,kn.flipEnvMap.value=Vn.isCubeTexture&&Vn.isRenderTargetTexture===!1?-1:1),_e.isMeshStandardMaterial&&_e.envMap===null&&Fe.environment!==null&&(kn.envMapIntensity.value=Fe.environmentIntensity),dr&&(ht.setValue(F,"toneMappingExposure",S.toneMappingExposure),qe.needsLights&&(Jt=Fa,(dn=kn).ambientLightColor.needsUpdate=Jt,dn.lightProbe.needsUpdate=Jt,dn.directionalLights.needsUpdate=Jt,dn.directionalLightShadows.needsUpdate=Jt,dn.pointLights.needsUpdate=Jt,dn.pointLightShadows.needsUpdate=Jt,dn.spotLights.needsUpdate=Jt,dn.spotLightShadows.needsUpdate=Jt,dn.rectAreaLights.needsUpdate=Jt,dn.hemisphereLights.needsUpdate=Jt),Tt&&_e.fog===!0&&ke.refreshFogUniforms(kn,Tt),ke.refreshMaterialUniforms(kn,_e,re,oe,g.state.transmissionRenderTarget[xe.id]),or.upload(F,Ci(qe),kn,j));var dn,Jt;if(_e.isShaderMaterial&&_e.uniformsNeedUpdate===!0&&(or.upload(F,Ci(qe),kn,j),_e.uniformsNeedUpdate=!1),_e.isSpriteMaterial&&ht.setValue(F,"center",Se.center),ht.setValue(F,"modelViewMatrix",Se.modelViewMatrix),ht.setValue(F,"normalMatrix",Se.normalMatrix),ht.setValue(F,"modelMatrix",Se.matrixWorld),_e.isShaderMaterial||_e.isRawShaderMaterial){let Wt=_e.uniformsGroups;for(let Ba=0,Gh=Wt.length;Ba<Gh;Ba++){let Ol=Wt[Ba];St.update(Ol,ai),St.bind(Ol,ai)}}return ai})(A,Z,ne,se,_);L.setMaterial(se,P);let D=ne.index,B=1;if(se.wireframe===!0){if(D=ye.getWireframeAttribute(ne),D===void 0)return;B=2}let N=ne.drawRange,ee=ne.attributes.position,ie=N.start*B,ge=(N.start+N.count)*B;b!==null&&(ie=Math.max(ie,b.start*B),ge=Math.min(ge,(b.start+b.count)*B)),D!==null?(ie=Math.max(ie,0),ge=Math.min(ge,D.count)):ee!=null&&(ie=Math.max(ie,0),ge=Math.min(ge,ee.count));let be=ge-ie;if(be<0||be===1/0)return;let De;It.setup(_,se,W,ne,D);let Pe=Te;if(D!==null&&(De=ce.get(D),Pe=je,Pe.setIndex(De)),_.isMesh)se.wireframe===!0?(L.setLineWidth(se.wireframeLinewidth*M()),Pe.setMode(F.LINES)):Pe.setMode(F.TRIANGLES);else if(_.isLine){let xe=se.linewidth;xe===void 0&&(xe=1),L.setLineWidth(xe*M()),_.isLineSegments?Pe.setMode(F.LINES):_.isLineLoop?Pe.setMode(F.LINE_LOOP):Pe.setMode(F.LINE_STRIP)}else _.isPoints?Pe.setMode(F.POINTS):_.isSprite&&Pe.setMode(F.TRIANGLES);if(_.isBatchedMesh)if(_._multiDrawInstances!==null)Xi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Pe.renderMultiDrawInstances(_._multiDrawStarts,_._multiDrawCounts,_._multiDrawCount,_._multiDrawInstances);else if(C.get("WEBGL_multi_draw"))Pe.renderMultiDraw(_._multiDrawStarts,_._multiDrawCounts,_._multiDrawCount);else{let xe=_._multiDrawStarts,Fe=_._multiDrawCounts,Ue=_._multiDrawCount,_e=D?ce.get(D).bytesPerElement:1,Se=Y.get(se).currentProgram.getUniforms();for(let Tt=0;Tt<Ue;Tt++)Se.setValue(F,"_gl_DrawID",Tt),Pe.render(xe[Tt]/_e,Fe[Tt])}else if(_.isInstancedMesh)Pe.renderInstances(ie,be,_.count);else if(ne.isInstancedBufferGeometry){let xe=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Fe=Math.min(ne.instanceCount,xe);Pe.renderInstances(ie,be,Fe)}else Pe.render(ie,be)},this.compile=function(A,Z,ne=null){ne===null&&(ne=A),g=Ye.get(ne),g.init(Z),x.push(g),ne.traverseVisible(function(_){_.isLight&&_.layers.test(Z.layers)&&(g.pushLight(_),_.castShadow&&g.pushShadow(_))}),A!==ne&&A.traverseVisible(function(_){_.isLight&&_.layers.test(Z.layers)&&(g.pushLight(_),_.castShadow&&g.pushShadow(_))}),g.setupLights();let se=new Set;return A.traverse(function(_){if(!(_.isMesh||_.isPoints||_.isLine||_.isSprite))return;let b=_.material;if(b)if(Array.isArray(b))for(let P=0;P<b.length;P++){let W=b[P];ln(W,ne,_),se.add(W)}else ln(b,ne,_),se.add(b)}),g=x.pop(),se},this.compileAsync=function(A,Z,ne=null){let se=this.compile(A,Z,ne);return new Promise(_=>{function b(){se.forEach(function(P){Y.get(P).currentProgram.isReady()&&se.delete(P)}),se.size!==0?setTimeout(b,10):_(A)}C.get("KHR_parallel_shader_compile")!==null?b():setTimeout(b,10)})};let qt=null;function xt(){Yt.stop()}function nt(){Yt.start()}let Yt=new Lh;function Ut(A,Z,ne,se){if(A.visible===!1)return;if(A.layers.test(Z.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Z);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||de.intersectsSprite(A)){se&&T.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ne);let b=we.update(A),P=A.material;P.visible&&f.push(A,b,P,ne,T.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||de.intersectsObject(A))){let b=we.update(A),P=A.material;if(se&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),T.copy(A.boundingSphere.center)):(b.boundingSphere===null&&b.computeBoundingSphere(),T.copy(b.boundingSphere.center)),T.applyMatrix4(A.matrixWorld).applyMatrix4(Ne)),Array.isArray(P)){let W=b.groups;for(let D=0,B=W.length;D<B;D++){let N=W[D],ee=P[N.materialIndex];ee&&ee.visible&&f.push(A,b,ee,ne,T.z,N)}}else P.visible&&f.push(A,b,P,ne,T.z,null)}}let _=A.children;for(let b=0,P=_.length;b<P;b++)Ut(_[b],Z,ne,se)}function rt(A,Z,ne,se){let _=A.opaque,b=A.transmissive,P=A.transparent;g.setupLightsView(ne),ue===!0&&pe.setGlobalState(S.clippingPlanes,ne),se&&L.viewport(K.copy(se)),_.length>0&&Tn(_,Z,ne),b.length>0&&Tn(b,Z,ne),P.length>0&&Tn(P,Z,ne),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function bt(A,Z,ne,se){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[se.id]===void 0&&(g.state.transmissionRenderTarget[se.id]=new jt(1,1,{generateMipmaps:!0,type:C.has("EXT_color_buffer_half_float")||C.has("EXT_color_buffer_float")?ni:xn,minFilter:Mi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let _=g.state.transmissionRenderTarget[se.id],b=se.viewport||K;_.setSize(b.z*S.transmissionResolutionScale,b.w*S.transmissionResolutionScale);let P=S.getRenderTarget(),W=S.getActiveCubeFace(),D=S.getActiveMipmapLevel();S.setRenderTarget(_),S.getClearColor(X),$=S.getClearAlpha(),$<1&&S.setClearColor(16777215,.5),S.clear(),U&&He.render(ne);let B=S.toneMapping;S.toneMapping=Gn;let N=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),g.setupLightsView(se),ue===!0&&pe.setGlobalState(S.clippingPlanes,se),Tn(A,ne,se),j.updateMultisampleRenderTarget(_),j.updateRenderTargetMipmap(_),C.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let ie=0,ge=Z.length;ie<ge;ie++){let be=Z[ie],De=be.object,Pe=be.geometry,xe=be.material,Fe=be.group;if(xe.side===Ct&&De.layers.test(se.layers)){let Ue=xe.side;xe.side=kt,xe.needsUpdate=!0,hr(De,ne,se,Pe,xe,Fe),xe.side=Ue,xe.needsUpdate=!0,ee=!0}}ee===!0&&(j.updateMultisampleRenderTarget(_),j.updateRenderTargetMipmap(_))}S.setRenderTarget(P,W,D),S.setClearColor(X,$),N!==void 0&&(se.viewport=N),S.toneMapping=B}function Tn(A,Z,ne){let se=Z.isScene===!0?Z.overrideMaterial:null;for(let _=0,b=A.length;_<b;_++){let P=A[_],W=P.object,D=P.geometry,B=P.group,N=P.material;N.allowOverride===!0&&se!==null&&(N=se),W.layers.test(ne.layers)&&hr(W,Z,ne,D,N,B)}}function hr(A,Z,ne,se,_,b){A.onBeforeRender(S,Z,ne,se,_,b),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),_.onBeforeRender(S,Z,ne,se,A,b),_.transparent===!0&&_.side===Ct&&_.forceSinglePass===!1?(_.side=kt,_.needsUpdate=!0,S.renderBufferDirect(ne,Z,se,_,A,b),_.side=er,_.needsUpdate=!0,S.renderBufferDirect(ne,Z,se,_,A,b),_.side=Ct):S.renderBufferDirect(ne,Z,se,_,A,b),A.onAfterRender(S,Z,ne,se,_,b)}function cn(A,Z,ne){Z.isScene!==!0&&(Z=V);let se=Y.get(A),_=g.state.lights,b=g.state.shadowsArray,P=_.state.version,W=Ce.getParameters(A,_.state,b,Z,ne),D=Ce.getProgramCacheKey(W),B=se.programs;se.environment=A.isMeshStandardMaterial?Z.environment:null,se.fog=Z.fog,se.envMap=(A.isMeshStandardMaterial?fe:le).get(A.envMap||se.environment),se.envMapRotation=se.environment!==null&&A.envMap===null?Z.environmentRotation:A.envMapRotation,B===void 0&&(A.addEventListener("dispose",ii),B=new Map,se.programs=B);let N=B.get(D);if(N!==void 0){if(se.currentProgram===N&&se.lightsStateVersion===P)return ur(A,W),N}else W.uniforms=Ce.getUniforms(A),A.onBeforeCompile(W,S),N=Ce.acquireProgram(W,D),B.set(D,N),se.uniforms=W.uniforms;let ee=se.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(ee.clippingPlanes=pe.uniform),ur(A,W),se.needsLights=(function(ie){return ie.isMeshLambertMaterial||ie.isMeshToonMaterial||ie.isMeshPhongMaterial||ie.isMeshStandardMaterial||ie.isShadowMaterial||ie.isShaderMaterial&&ie.lights===!0})(A),se.lightsStateVersion=P,se.needsLights&&(ee.ambientLightColor.value=_.state.ambient,ee.lightProbe.value=_.state.probe,ee.directionalLights.value=_.state.directional,ee.directionalLightShadows.value=_.state.directionalShadow,ee.spotLights.value=_.state.spot,ee.spotLightShadows.value=_.state.spotShadow,ee.rectAreaLights.value=_.state.rectArea,ee.ltc_1.value=_.state.rectAreaLTC1,ee.ltc_2.value=_.state.rectAreaLTC2,ee.pointLights.value=_.state.point,ee.pointLightShadows.value=_.state.pointShadow,ee.hemisphereLights.value=_.state.hemi,ee.directionalShadowMap.value=_.state.directionalShadowMap,ee.directionalShadowMatrix.value=_.state.directionalShadowMatrix,ee.spotShadowMap.value=_.state.spotShadowMap,ee.spotLightMatrix.value=_.state.spotLightMatrix,ee.spotLightMap.value=_.state.spotLightMap,ee.pointShadowMap.value=_.state.pointShadowMap,ee.pointShadowMatrix.value=_.state.pointShadowMatrix),se.currentProgram=N,se.uniformsList=null,N}function Ci(A){if(A.uniformsList===null){let Z=A.currentProgram.getUniforms();A.uniformsList=or.seqWithValue(Z.seq,A.uniforms)}return A.uniformsList}function ur(A,Z){let ne=Y.get(A);ne.outputColorSpace=Z.outputColorSpace,ne.batching=Z.batching,ne.batchingColor=Z.batchingColor,ne.instancing=Z.instancing,ne.instancingColor=Z.instancingColor,ne.instancingMorph=Z.instancingMorph,ne.skinning=Z.skinning,ne.morphTargets=Z.morphTargets,ne.morphNormals=Z.morphNormals,ne.morphColors=Z.morphColors,ne.morphTargetsCount=Z.morphTargetsCount,ne.numClippingPlanes=Z.numClippingPlanes,ne.numIntersection=Z.numClipIntersection,ne.vertexAlphas=Z.vertexAlphas,ne.vertexTangents=Z.vertexTangents,ne.toneMapping=Z.toneMapping}Yt.setAnimationLoop(function(A){qt&&qt(A)}),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(A){qt=A,tt.setAnimationLoop(A),A===null?Yt.stop():Yt.start()},tt.addEventListener("sessionstart",xt),tt.addEventListener("sessionend",nt),this.render=function(A,Z){if(Z!==void 0&&Z.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(Z),Z=tt.getCamera()),A.isScene===!0&&A.onBeforeRender(S,A,Z,H),g=Ye.get(A,x.length),g.init(Z),x.push(g),Ne.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),de.setFromProjectionMatrix(Ne,Dn,Z.reversedDepth),Ie=this.localClippingEnabled,ue=pe.init(this.clippingPlanes,Ie),f=Xe.get(A,v.length),f.init(),v.push(f),tt.enabled===!0&&tt.isPresenting===!0){let b=S.xr.getDepthSensingMesh();b!==null&&Ut(b,Z,-1/0,S.sortObjects)}Ut(A,Z,0,S.sortObjects),f.finish(),S.sortObjects===!0&&f.sort(ve,Ae),U=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,U&&He.addToRenderList(f,A),this.info.render.frame++,ue===!0&&pe.beginShadows();let ne=g.state.shadowsArray;Me.render(ne,A,Z),ue===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();let se=f.opaque,_=f.transmissive;if(g.setupLights(),Z.isArrayCamera){let b=Z.cameras;if(_.length>0)for(let P=0,W=b.length;P<W;P++)bt(se,_,A,b[P]);U&&He.render(A);for(let P=0,W=b.length;P<W;P++){let D=b[P];rt(f,A,D,D.viewport)}}else _.length>0&&bt(se,_,A,Z),U&&He.render(A),rt(f,A,Z);H!==null&&G===0&&(j.updateMultisampleRenderTarget(H),j.updateRenderTargetMipmap(H)),A.isScene===!0&&A.onAfterRender(S,A,Z),It.resetDefaultState(),O=-1,J=null,x.pop(),x.length>0?(g=x[x.length-1],ue===!0&&pe.setGlobalState(S.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(A,Z,ne){let se=Y.get(A);se.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),Y.get(A.texture).__webglTexture=Z,Y.get(A.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:ne,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Z){let ne=Y.get(A);ne.__webglFramebuffer=Z,ne.__useDefaultFramebuffer=Z===void 0};let Ri=F.createFramebuffer();this.setRenderTarget=function(A,Z=0,ne=0){H=A,I=Z,G=ne;let se=!0,_=null,b=!1,P=!1;if(A){let W=Y.get(A);if(W.__useDefaultFramebuffer!==void 0)L.bindFramebuffer(F.FRAMEBUFFER,null),se=!1;else if(W.__webglFramebuffer===void 0)j.setupRenderTarget(A);else if(W.__hasExternalTextures)j.rebindTextures(A,Y.get(A.texture).__webglTexture,Y.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let N=A.depthTexture;if(W.__boundDepthTexture!==N){if(N!==null&&Y.has(N)&&(A.width!==N.image.width||A.height!==N.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(A)}}let D=A.texture;(D.isData3DTexture||D.isDataArrayTexture||D.isCompressedArrayTexture)&&(P=!0);let B=Y.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(_=Array.isArray(B[Z])?B[Z][ne]:B[Z],b=!0):_=A.samples>0&&j.useMultisampledRTT(A)===!1?Y.get(A).__webglMultisampledFramebuffer:Array.isArray(B)?B[ne]:B,K.copy(A.viewport),k.copy(A.scissor),q=A.scissorTest}else K.copy(Ee).multiplyScalar(re).floor(),k.copy(Le).multiplyScalar(re).floor(),q=he;if(ne!==0&&(_=Ri),L.bindFramebuffer(F.FRAMEBUFFER,_)&&se&&L.drawBuffers(A,_),L.viewport(K),L.scissor(k),L.setScissorTest(q),b){let W=Y.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+Z,W.__webglTexture,ne)}else if(P){let W=Z;for(let D=0;D<A.textures.length;D++){let B=Y.get(A.textures[D]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+D,B.__webglTexture,ne,W)}}else if(A!==null&&ne!==0){let W=Y.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,W.__webglTexture,ne)}O=-1},this.readRenderTargetPixels=function(A,Z,ne,se,_,b,P,W=0){if(!A||!A.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let D=Y.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&P!==void 0&&(D=D[P]),D){L.bindFramebuffer(F.FRAMEBUFFER,D);try{let B=A.textures[W],N=B.format,ee=B.type;if(!z.textureFormatReadable(N))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(ee))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");Z>=0&&Z<=A.width-se&&ne>=0&&ne<=A.height-_&&(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+W),F.readPixels(Z,ne,se,_,Ge.convert(N),Ge.convert(ee),b))}finally{let B=H!==null?Y.get(H).__webglFramebuffer:null;L.bindFramebuffer(F.FRAMEBUFFER,B)}}},this.readRenderTargetPixelsAsync=async function(A,Z,ne,se,_,b,P,W=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let D=Y.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&P!==void 0&&(D=D[P]),D){if(Z>=0&&Z<=A.width-se&&ne>=0&&ne<=A.height-_){L.bindFramebuffer(F.FRAMEBUFFER,D);let B=A.textures[W],N=B.format,ee=B.type;if(!z.textureFormatReadable(N))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ie),F.bufferData(F.PIXEL_PACK_BUFFER,b.byteLength,F.STREAM_READ),A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+W),F.readPixels(Z,ne,se,_,Ge.convert(N),Ge.convert(ee),0);let ge=H!==null?Y.get(H).__webglFramebuffer:null;L.bindFramebuffer(F.FRAMEBUFFER,ge);let be=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await nh(F,be,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ie),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,b),F.deleteBuffer(ie),F.deleteSync(be),b}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,Z=null,ne=0){let se=Math.pow(2,-ne),_=Math.floor(A.image.width*se),b=Math.floor(A.image.height*se),P=Z!==null?Z.x:0,W=Z!==null?Z.y:0;j.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,ne,0,0,P,W,_,b),L.unbindTexture()};let es=F.createFramebuffer(),hn=F.createFramebuffer();this.copyTextureToTexture=function(A,Z,ne=null,se=null,_=0,b=null){let P,W,D,B,N,ee,ie,ge,be;b===null&&(_!==0?(Xi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),b=_,_=0):b=0);let De=A.isCompressedTexture?A.mipmaps[b]:A.image;if(ne!==null)P=ne.max.x-ne.min.x,W=ne.max.y-ne.min.y,D=ne.isBox3?ne.max.z-ne.min.z:1,B=ne.min.x,N=ne.min.y,ee=ne.isBox3?ne.min.z:0;else{let un=Math.pow(2,-_);P=Math.floor(De.width*un),W=Math.floor(De.height*un),D=A.isDataArrayTexture?De.depth:A.isData3DTexture?Math.floor(De.depth*un):1,B=0,N=0,ee=0}se!==null?(ie=se.x,ge=se.y,be=se.z):(ie=0,ge=0,be=0);let Pe=Ge.convert(Z.format),xe=Ge.convert(Z.type),Fe;Z.isData3DTexture?(j.setTexture3D(Z,0),Fe=F.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(j.setTexture2DArray(Z,0),Fe=F.TEXTURE_2D_ARRAY):(j.setTexture2D(Z,0),Fe=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,Z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,Z.unpackAlignment);let Ue=F.getParameter(F.UNPACK_ROW_LENGTH),_e=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Se=F.getParameter(F.UNPACK_SKIP_PIXELS),Tt=F.getParameter(F.UNPACK_SKIP_ROWS),ri=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,De.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,De.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,B),F.pixelStorei(F.UNPACK_SKIP_ROWS,N),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ee);let si=A.isDataArrayTexture||A.isData3DTexture,Vn=Z.isDataArrayTexture||Z.isData3DTexture;if(A.isDepthTexture){let un=Y.get(A),Ii=Y.get(Z),wn=Y.get(un.__renderTarget),Na=Y.get(Ii.__renderTarget);L.bindFramebuffer(F.READ_FRAMEBUFFER,wn.__webglFramebuffer),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,Na.__webglFramebuffer);for(let Pi=0;Pi<D;Pi++)si&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Y.get(A).__webglTexture,_,ee+Pi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Y.get(Z).__webglTexture,b,be+Pi)),F.blitFramebuffer(B,N,P,W,ie,ge,P,W,F.DEPTH_BUFFER_BIT,F.NEAREST);L.bindFramebuffer(F.READ_FRAMEBUFFER,null),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(_!==0||A.isRenderTargetTexture||Y.has(A)){let un=Y.get(A),Ii=Y.get(Z);L.bindFramebuffer(F.READ_FRAMEBUFFER,es),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,hn);for(let wn=0;wn<D;wn++)si?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,un.__webglTexture,_,ee+wn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,un.__webglTexture,_),Vn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ii.__webglTexture,b,be+wn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ii.__webglTexture,b),_!==0?F.blitFramebuffer(B,N,P,W,ie,ge,P,W,F.COLOR_BUFFER_BIT,F.NEAREST):Vn?F.copyTexSubImage3D(Fe,b,ie,ge,be+wn,B,N,P,W):F.copyTexSubImage2D(Fe,b,ie,ge,B,N,P,W);L.bindFramebuffer(F.READ_FRAMEBUFFER,null),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Vn?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(Fe,b,ie,ge,be,P,W,D,Pe,xe,De.data):Z.isCompressedArrayTexture?F.compressedTexSubImage3D(Fe,b,ie,ge,be,P,W,D,Pe,De.data):F.texSubImage3D(Fe,b,ie,ge,be,P,W,D,Pe,xe,De):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,b,ie,ge,P,W,Pe,xe,De.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,b,ie,ge,De.width,De.height,Pe,De.data):F.texSubImage2D(F.TEXTURE_2D,b,ie,ge,P,W,Pe,xe,De);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ue),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_e),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Se),F.pixelStorei(F.UNPACK_SKIP_ROWS,Tt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ri),b===0&&Z.generateMipmaps&&F.generateMipmap(Fe),L.unbindTexture()},this.initRenderTarget=function(A){Y.get(A).__webglFramebuffer===void 0&&j.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?j.setTextureCube(A,0):A.isData3DTexture?j.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?j.setTexture2DArray(A,0):j.setTexture2D(A,0),L.unbindTexture()},this.resetState=function(){I=0,G=0,H=null,L.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};var Oh=(r,e,t)=>Math.max(e,Math.min(t,r));function Qd(r,e){let t=window.PokerGarage,n=new et;r.add(n),n.scale.set(1.24,.86,.95);let i=(_,b,P)=>new _i({color:_,metalness:b,roughness:P,clearcoat:b>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.item("wheels",e.wheels).color,0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),p=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function m(_,b,P=0,W=0,D=0,B=n){let N=new ft(_,b);return N.position.set(P,W,D),N.castShadow=!0,N.receiveShadow=!0,B.add(N),N}let y=(_,b,P,W,D,B,N)=>m(new dt(_,b,P),W,D,B,N);function f(_,b,P,W,D,B,N="y"){let ee=m(new ot(_,_,b,64),P,W,D,B);return N==="z"&&(ee.rotation.x=Math.PI/2),N==="x"&&(ee.rotation.z=Math.PI/2),ee}function g(_,b,P,W,D,B,N="z"){let ee=m(new yt(_,b,12,80),P,W,D,B);return N==="y"&&(ee.rotation.x=Math.PI/2),N==="x"&&(ee.rotation.y=Math.PI/2),ee}function v(_,b,P,W=On){let D=new W,B=-_/2,N=-b/2;return P=Math.min(P,b/2-.001),D.moveTo(B+P,N),D.lineTo(B+_-P,N),D.quadraticCurveTo(B+_,N,B+_,N+P),D.lineTo(B+_,N+b-P),D.quadraticCurveTo(B+_,N+b,B+_-P,N+b),D.lineTo(B+P,N+b),D.quadraticCurveTo(B,N+b,B,N+b-P),D.lineTo(B,N+P),D.quadraticCurveTo(B,N,B+P,N),D}function x(_,b,P,W,D,B,N=null,ee=.025){let ie=v(_,b,W);if(N){let be=v(N[0],N[1],N[2],ei),De=new ei(be.getPoints(40).map(Pe=>new ae(Pe.x+(N[3]||0),Pe.y)));ie.holes.push(De)}let ge=m(new Bn(ie,{depth:P,bevelEnabled:ee>0,bevelSize:ee,bevelThickness:ee,bevelSegments:4,curveSegments:40}),D,0,B,0);return ge.rotation.x=-Math.PI/2,ge}let S=[3.02,1.51,.65,-.28],R=v(4.96,2.44,1.15).getSpacedPoints(128),I=[],G=[],H=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[_,b]of H)for(let P=0;P<128;P++){let W=R[P];I.push(W.x*b,_,-W.y*b)}for(let _=0;_<3;_++)for(let b=0;b<128;b++){let P=_*128+b,W=_*128+(b+1)%128;G.push(P,W,P+128,W,W+128,P+128)}let O=new $e;O.setAttribute("position",new Re(I,3)),O.setIndex(G),O.computeVertexNormals(),s.side=Ct,m(O,s),x(5.03,2.51,.065,1.19,o,.58,null,.035),x(5.1,2.58,.09,1.22,o,1.25,S,.035);let J=new pt(v(4.94,2.42,1.15).getPoints(40).map(_=>new w(_.x,1.44,-_.y)),!0,"centripetal");m(new ct(J,240,.125,16,!0),u);for(let _ of[-1,1]){let b=Array.from({length:21},(P,W)=>{let D=.26+W*.25/20;return new w(1.32+1.15*Math.cos(D),1.44,_*(.06+1.15*Math.sin(D)))});m(new ct(new pt(b),32,.132,20,!1),o)}x(4.65,2.14,.035,1.03,o,1.39,S,.015),x(4.52,2.01,.025,.97,a,1.43,S,.01);let K=x(2.98,1.47,.025,.63,a,.94);K.position.x=-.28;let k=x(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);k.position.x=-.28;let q=x(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);q.position.x=-.28;for(let _ of[-1,-.35,.35])for(let b of[-.75,.75])y(.011,.4,.009,h,_,1.2,b);function X(_,b){let P=document.createElement("canvas");P.width=P.height=256;let W=P.getContext("2d");W.fillStyle=_,W.fillRect(0,0,256,256);let D=17;for(let N=0;N<18e3;N++)D=D*1664525+1013904223>>>0,W.fillStyle="rgba(0,0,0,"+b+")",W.fillRect(D%256,(D>>>8)%256,1,1);let B=new Gt(P);return B.colorSpace=at,B.wrapS=B.wrapT=di,B}a.map=X("#e8e8e8",.035),a.bumpMap=X("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=X("#888888",.12),c.bumpScale=.003,u.bumpMap=X("#888888",.3),u.bumpScale=.001;function $(_,b,P,W,D,B=!1,N=n){let ee=new On;ee.moveTo(0,.5),ee.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),ee.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),ee.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),ee.bezierCurveTo(.48,.12,.12,.28,0,.5),ee.moveTo(-.12,-.3),ee.lineTo(0,-.06),ee.lineTo(.12,-.3),ee.closePath();let ie=m(new Bn(ee,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),b,P,W,D,N);return ie.scale.setScalar(_),B&&(ie.rotation.y=Math.PI),ie}let Q=[],oe=[],re=[],ve=null;for(let _ of[-1.72,1.72])for(let b of[-1,1]){let P=b*1.36,W=b*1.57,D=new et;D.position.set(_,.81,P),n.add(D),D.userData.groundWheel=!0;let B=n.children.length,N=m(new Ki([new ae(.56,-.19),new ae(.61,-.245),new ae(.67,-.25),new ae(.76,-.19),new ae(.8,-.1),new ae(.8,.1),new ae(.76,.19),new ae(.67,.25),new ae(.61,.245),new ae(.56,.19)],80),c,_,.81,P);N.rotation.x=Math.PI/2;for(let ie=-2;ie<=2;ie++)g(.798-Math.abs(ie)*.012,.0035,h,_,.81,P+ie*.071);for(let ie=0;ie<28;ie++){let ge=ie*Math.PI/14,be=Array.from({length:17},(De,Pe)=>{let xe=Pe/16,Fe=-.205+xe*.41,Ue=.799-.044*Math.pow(Math.abs(Fe)/.205,3),_e=ge+.13*Math.sin(xe*Math.PI);return new w(_+Math.sin(_e)*Ue,.81+Math.cos(_e)*Ue,P+Fe)});m(new ct(new pt(be),20,.0045,5,!1),h)}for(let ie of[-1,1])for(let ge of[.625,.654,.681])g(ge,.0035,h,_,.81,P+ie*.244);f(.566,.04,l,_,.81,W,"z"),f(.515,.045,h,_,.81,W+b*.022,"z"),g(.548,.023,l,_,.81,W+b*.035),g(.505,.016,l,_,.81,W+b*.043),f(.14,.045,h,_,.81,W+b*.045,"z"),g(.14,.012,l,_,.81,W+b*.069);let ee=$(.2,l,_,.8,W+b*.075,b<0);oe.push(ee);for(let ie of t.wheelDesign()){let ge=new pt(ie.map(([be,De])=>new w(_+be,.81+De,W+b*(.04+.025*(1-Math.hypot(be,De)/.51)))));Q.push(m(new ct(ge,20,.007,6,!1),l))}for(let ie=0;ie<20;ie++){let ge=ie*Math.PI/10;f(.006,.009,l,_+Math.sin(ge)*.526,.81+Math.cos(ge)*.526,W+b*.06,"z")}n.updateMatrixWorld(!0);for(let ie of n.children.slice(B))D.attach(ie);D.scale.set(.88/1.24,.88/.86,1/.95),D.position.y=.715/.86,re.push({wheelGroup:D,x:_,out:W,sign:b})}let Ae=[];for(let _ of[-1,1])Ae.push($(.65,o,-1.12,.95,_*1.32,_<0)),y(1.35,.43,.04,o,.05,.94,_*1.3);for(let _ of[-1,1]){let b=f(.275,.27,h,2.16,.945,_*.97,"z");g(.278,.035,o,2.16,.945,_*1.11)}for(let _ of[-1.72,1.72])f(.07,2.8,h,_,.7,0,"z");y(3.6,.08,.8,h,0,.57,0);let Ee=[];function Le(_,b,P){let W=document.createElement("canvas");W.width=_,W.height=b,P(W.getContext("2d"),_,b);let D=new Gt(W);return D.colorSpace=at,D.anisotropy=8,Ee.push(D),D}let he=Le(768,256,(_,b,P)=>{_.fillStyle="#101b18",_.fillRect(0,0,b,P),_.strokeStyle="#d9b35b",_.lineWidth=7,_.strokeRect(10,10,b-20,P-20),_.fillStyle="#ebc66c",_.textAlign="center",_.font="italic 116px Georgia",_.fillText("Two Aces",b/2,137),_.font="38px Georgia",_.fillText("\u2660 Poker21 \u2660",b/2,209)}),de=[];for(let _ of[-1,1]){let b=new _i({map:he,metalness:.55,roughness:.2,clearcoat:1});de.push(b);let P=m(new Dt(1.28,.4),b,.05,.94,_*1.326);b.userData.plane=P,_<0&&(P.rotation.y=Math.PI)}let ue=[];for(let _ of[-1,1])for(let b=0;b<3;b++){let P=new et;P.position.set((b-1)*.55+.05,.96,_*1.35),_<0&&(P.rotation.y=Math.PI),n.add(P);let W=m(new dt(.25,.29,.025),o,0,0,0,P),D=new zn({transparent:!0,alphaTest:.15,metalness:0,roughness:.65,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),B=m(new Dt(.49,.49),D,0,0,.035,P);B.castShadow=!1,B.receiveShadow=!1,ue.push({group:P,mat:D,n:b})}for(let _ of[-1,1])for(let b of[-.54,.64])for(let P of[.78,1.1]){let W=f(.014,.018,o,b,P,_*1.35,"z")}for(let _ of[-1.7,-.35,1.48])for(let b of[-1.21,1.21]){let P=f(.128,.13,o,_,1.44,b,"x")}for(let _ of[-1.7,-.35,1.48])for(let b of[-1,1])g(.125,.004,h,_+.08,1.44,b*1.21,"x"),g(.125,.004,h,_-.08,1.44,b*1.21,"x");for(let _ of[-1.7,-.35,1.48])for(let b of[-.96,.96])f(.135,.08,o,_,1.49,b),f(.108,.082,h,_,1.498,b),g(.125,.015,o,_,1.54,b,"y"),g(.111,.006,o,_,1.535,b,"y");let Ie=[],Ne=[],E=["#ab2338","#1b684b","#2455a5"].map(_=>i(_,.08,.55)),T=i("#eee9d6",.04,.6);for(let[_,b,P,W]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let D=0;D<W;D++){f(.104,.033,E[P],_,1.49+D*.037,b);for(let B=0;B<6;B++){let N=B*Math.PI/3,ee=y(.024,.021,.012,T,_+Math.cos(N)*.103,1.49+D*.037,b+Math.sin(N)*.103);ee.rotation.y=Math.PI/2-N,ee.castShadow=!1,ee.receiveShadow=!1,Ie.push(ee)}if(D===W-1){let B=new zn({transparent:!0,alphaTest:.1,roughness:.65}),N=m(new Dt(.208,.208),B,_,1.511+D*.037,b);N.rotation.x=-Math.PI/2,N.castShadow=!1,N.receiveShadow=!1,Ne.push({mat:B,n:P})}}let V=new et;V.position.set(.89,1.96,0),V.scale.set(1/1.24,1/.86,1/.95),n.add(V);let U=new et;V.add(U);let M=new w((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),C=new w(0,0,1),z=new w().crossVectors(M,C).normalize();U.quaternion.setFromRotationMatrix(new Be().makeBasis(C,z,M));let L=u.clone();m(new yt(.53,.06,16,80),L,0,0,0,U),m(new yt(.473,.014,10,64),o,0,0,-.02,U);for(let _ of[Math.PI]){let b=m(new dt(.09,.39,.045),o,Math.sin(_)*.26,Math.cos(_)*.26,0,U);b.rotation.z=-_}for(let _ of[-1,1]){let b=m(new dt(.35,.075,.06),o,_*.265,0,0,U);m(new dt(.32,.035,.064),h,_*.265,0,.006,U)}let te=m(new ot(.195,.195,.075,64),o,0,0,.035,U);te.rotation.x=Math.PI/2;let Y=m(new $n(.177,64),new zn({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,U);Y.receiveShadow=!1,$(.38,o,0,-.025,.105,!1,U);let j={classic:new et,sport:new et,formula:new et};for(let _ of U.children.slice())j.classic.add(_);Object.values(j).forEach(_=>U.add(_));function le(_,b,P,W){let D=new pt(b.map(([B,N])=>new w(B,N,0)),!0);m(new ct(D,72,P,12,!0),W,0,0,0,_)}le(j.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,L);for(let _ of[-1,1])m(new dt(.35,.065,.045),l,_*.27,0,0,j.sport),m(new dt(.065,.3,.045),l,_*.12,-.22,0,j.sport);m(new yt(.5,.018,8,64,.22),d,0,0,.005,j.sport),le(j.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,L),m(new dt(.6,.23,.065),h,0,0,0,j.formula);for(let _ of[-1,1])m(new sn(.035,12,8),d,_*.25,.055,.06,j.formula),m(new dt(.08,.29,.025),l,_*.37,0,-.07,j.formula);for(let _ of["sport","formula"]){let b=m(new ot(.15,.15,.07,48),l,0,0,.035,j[_]);b.rotation.x=Math.PI/2,m(new $n(.13,48),h,0,0,.078,j[_]),$(.25,l,0,-.018,.09,!1,j[_])}let fe=i("#b9ab8a",.15,.8),ce=i("#171c20",.02,.85);for(let[_,b]of Object.entries(j)){let P=_==="classic"?.53:_==="sport"?.51:.47;for(let D of[-1,1]){if(_!=="formula"){let B=m(new yt(P,.072,12,30,.64),ce,0,0,.003,b);B.rotation.z=D<0?Math.PI-.32:-.32}for(let B=0;B<9;B++){let N=(D<0?Math.PI:0)-.28+B*.07;m(new sn(.007,6,4),fe,Math.cos(N)*(P-.045),Math.sin(N)*(P-.045),.063,b)}}let W=m(new dt(.065,.1,.035),_==="classic"?o:d,0,_==="formula"?.16:.51,.045,b);for(let D=0;D<6;D++){let B=D*Math.PI/3,N=m(new ot(.012,.012,.012,6),l,Math.cos(B)*.13,Math.sin(B)*.13,.099,b);N.rotation.x=Math.PI/2}}let ye=new w(1.3,1.48,0),we=new w(.89,1.96,0),Ce=we.clone().sub(ye),ke=ye.clone().add(we).multiplyScalar(.5),Xe=y(.12,Ce.length(),.095,o,...ke.toArray());Xe.quaternion.setFromUnitVectors(new w(0,1,0),Ce.normalize()),y(.075,Xe.geometry.parameters.height-.04,.1,h,...ke.toArray()).quaternion.copy(Xe.quaternion);let pe=-1.84,Me=1.99,He=.74,Qe=new et;Qe.position.set(pe,Me,0),n.add(Qe);let Te=n.children.length;f(He,.51,o,pe,Me,0,"z"),f(.67,.54,h,pe,Me,0,"z");for(let _ of[-1,1]){let b=_*.29;g(.72,.055,h,pe,Me,b),g(.75,.022,o,pe,Me,b+_*.03),g(.665,.012,d,pe,Me,b+_*.025);for(let P=0;P<14;P++){let W=P*Math.PI/7,D=[],B=[];for(let ie=0;ie<=16;ie++){let ge=ie/16,be=.22+ge*.44,De=W+.55*ge;for(let Pe of[-.15,.15])D.push(pe+Math.sin(De+Pe)*be,Me+Math.cos(De+Pe)*be,b+_*(.018+Math.sin(ge*Math.PI)*.12))}for(let ie=0;ie<16;ie++){let ge=ie*2;B.push(ge,ge+1,ge+2,ge+1,ge+3,ge+2)}let N=new $e;N.setAttribute("position",new Re(D,3)),N.setIndex(B),N.computeVertexNormals(),p.side=Ct,m(N,p);let ee=new pt(Array.from({length:17},(ie,ge)=>{let be=ge/16,De=.22+be*.44,Pe=W+.55*be-.15;return new w(pe+Math.sin(Pe)*De,Me+Math.cos(Pe)*De,b+_*(.025+Math.sin(be*Math.PI)*.12))}));m(new ct(ee,20,.009,6,!1),d)}f(.215,.07,o,pe,Me,b+_*.085,"z"),f(.18,.085,h,pe,Me,b+_*.11,"z")}for(let _=0;_<12;_++){let b=_*Math.PI/6,P=y(.045,.15,.2,h,pe+Math.cos(b)*.735,Me+Math.sin(b)*.735,0);P.rotation.z=b}n.updateMatrixWorld(!0);for(let _ of n.children.slice(Te))Qe.attach(_);Qe.rotation.set(0,Math.PI/2,0),Qe.scale.set(.96/1.24,.96/.86,.96/.95);let je=Qe.clone(!0);n.add(je);let Ge=new et;Qe.add(Ge);let It=i("#829aaa",.92,.24);for(let _ of[-.24,-.08,.08,.24])m(new yt(.765,.028,10,80),It,0,0,_,Ge);for(let _=0;_<8;_++){let b=_*Math.PI/4,P=m(new ot(.025,.025,.025,6),It,Math.sin(b)*.73,Math.cos(b)*.73,.35,Ge);P.rotation.x=Math.PI/2}let St={classic:new et,dual:new et,titanium:new et},F=i("#a9b7c4",.92,.23),lt=i("#668bb5",.88,.25);Object.values(St).forEach(_=>n.add(_));for(let[_,b]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let P of b){let W=_==="titanium"?lt:F,D=m(new ot(.105,.105,.5,32),W,-2.42,.76,P,St[_]);D.rotation.z=Math.PI/2;let B=m(new ot(.079,.079,.012,32),h,-2.678,.76,P,St[_]);B.rotation.z=Math.PI/2;let N=m(new yt(.094,.012,8,32),W,-2.69,.76,P,St[_]);N.rotation.y=Math.PI/2}for(let[_,b]of Object.entries(St)){let P=_==="classic"?[0]:[-.67,.67];for(let D of P){let B=m(new ot(.18,.18,.52,40),F,-2.19,.76,D,b);B.rotation.z=Math.PI/2;for(let N of[-2.36,-2.04]){let ee=m(new yt(.184,.016,8,40),h,N,.76,D,b);ee.rotation.y=Math.PI/2,m(new dt(.07,.19,.07),F,N,.94,D,b)}}let W=_==="classic"?[0]:_==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let D of W){let B=m(new ot(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,D,b);B.rotation.z=Math.PI/2;let N=m(new yt(.107,.018,10,40),_==="titanium"?lt:F,-2.57,.76,D,b);if(N.rotation.y=Math.PI/2,_==="titanium")for(let[ee,ie]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let ge=m(new yt(.106,.008,6,40),i(ie,.85,.3),ee,.76,D,b);ge.rotation.y=Math.PI/2}}}for(let _ of[-1,1]){let b=new pt([new w(-2.16,1.46,_*.65),new w(-1.94,1.66,_*.69),new w(-1.3,1.59,_*.64),new w(-.98,1.47,_*.7)]);m(new ct(b,32,.022,8,!1),o),y(.34,.06,.14,o,-1.84,1.48,_*.4)}for(let _ of[-1,1]){let b=new pt([new w(-2.45,1.1,_*.7),new w(-2.43,1.36,_*.72),new w(-2.19,1.55,_*.7),new w(-1.9,1.55,_*.68)]);m(new ct(b,40,.075,14,!1),h),m(new ct(b,40,.019,10,!1),o);for(let P of[-2.2,-1.96]){let W=new pt([new w(P,1.43,_*.48),new w(P,1.63,_*.6),new w(P+.24,1.57,_*.82)]);m(new ct(W,24,.017,8,!1),o)}}let mt=[],tt=[],on=[];for(let _=0;_<=48;_++){let b=-.92+_*1.84/48;for(let P of[.64,1.23])tt.push(2.57-.28*(Math.sin(b)*1.25/1.1)**2,P,Math.sin(b)*1.25)}for(let _=0;_<48;_++){let b=_*2;on.push(b,b+2,b+1,b+1,b+2,b+3)}let Ht=new $e;Ht.setAttribute("position",new Re(tt,3)),Ht.setIndex(on),Ht.computeVertexNormals();let bn=i("#00453f",.72,.14);bn.clearcoat=1,bn.side=Ct,m(Ht,bn);for(let _ of[.635,1.225]){let b=Array.from({length:65},(P,W)=>{let D=-1.04+W*2.08/64;return new w(2.57-.28*(D/1.1)**2,_,D)});m(new ct(new pt(b),80,.034,12,!1),o)}for(let _ of[-1,1]){let b=_*1,P=2.57-.28*(b/1.1)**2,W=new pt([new w(P-.04,.635,b),new w(P+.05,.78,b),new w(P+.065,1.12,b),new w(P-.04,1.25,b)]);m(new ct(W,32,.065,12,!1),o);for(let D of[.91,1.065]){let B=Array.from({length:16},(N,ee)=>{let ie=_*(.51+ee*.41/15);return new w(2.57-.28*(ie/1.1)**2+.018,D,ie)});mt.push(m(new ct(new pt(B),24,.017,8,!1),d))}}let ii=[];for(let _=0;_<2;_++){let b=new Gt(t.cardCanvas(e.cards,_));b.colorSpace=at,b.anisotropy=16;let P=new Fn({map:b,transparent:!0,toneMapped:!1});ii.push(P);let W=1.43+_*.4,D=-.18+_*.23,B=y(.47,.008,.63,i("#ddd9cf",0,.95),W,1.474+_*.004,D);B.rotation.y=_*.13;let N=m(new Dt(.5,.67),P,W,1.48+_*.004,D);N.rotation.x=-Math.PI/2,N.rotation.z=_*.13,N.castShadow=!1,N.receiveShadow=!1}let ln=new zn({map:new Gt(t.plateCanvas(e)),roughness:.6});for(let _ of[-1,1]){let b=m(new Dt(.79,.463),ln,_*2.605,1.01,0);b.rotation.y=_*Math.PI/2}let qt={},xt=i("#7d8c98",.82,.28),nt=i("#202a32",.45,.38),Yt=i("#a7c6d5",.98,.055),Ut=i("#182029",.35,.48);Ut.bumpMap=X("#888888",.2),Ut.bumpScale=.001;function rt(_,b,P,W,D,B,N,ee,ie){let ge=new Bn(v(_,b,W),{depth:P,bevelEnabled:!0,bevelSize:Math.min(.012,P*.2),bevelThickness:Math.min(.012,P*.2),bevelSegments:3,curveSegments:12});return ge.translate(0,0,-P/2),m(ge,D,B,N,ee,ie)}function bt(_,b,P,W){return m(new ct(new pt(_.map(D=>new w(...D))),40,b,12,!1),P,0,0,0,W)}function Tn(_,b,P,W){let D=m(new ot(.014,.014,.014,6),xt,_,b,P,W);D.rotation.x=Math.PI/2}function hr(_,b,P,W,D,B){let N=new On;N.moveTo(-W*.5,0),N.bezierCurveTo(-W*.52,.055,-W*.12,.07,W*.5,.008),N.quadraticCurveTo(W*.05,-.025,-W*.5,0);let ee=new Bn(N,{depth:P,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});ee.translate(0,0,-P/2);let ie=m(ee,D,_,b,0,B);return ie.rotation.z=-.08,ie}for(let _ of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){qt[_]={};for(let b of _==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let P=new et;n.add(P),qt[_][b]=P;let W=["sport","aero"].includes(b)?Ut:xt;if(_==="spoiler"){let D=b==="lip"?1.43:b==="sport"?1.78:2.08,B=b==="gt"||b==="double"?1.98:1.72,N=-2.39;for(let ee of[-.62,.62]){if(rt(.25,.055,.22,.045,nt,-2.24,1.31,ee,P),b!=="lip"){let ie=rt(.15,D-1.32,.065,.035,nt,-2.32,(D+1.32)/2,ee,P);ie.rotation.z=-.19}for(let ie of[-.065,.065]){let ge=m(new ot(.012,.012,.015,6),xt,-2.24,1.35,ee+ie,P)}}if(hr(N,D,B,b==="lip"?.22:.36,W,P),b!=="lip")for(let ee of[-1,1]){let ie=rt(.43,.19,.025,.055,W,N,D+.055,ee*B/2,P);ie.rotation.z=-.12,Tn(N-.1,D+.045,ee*(B/2+.02),P),Tn(N+.1,D+.045,ee*(B/2+.02),P)}if(b==="double"){hr(N+.025,D+.24,B*.94,.27,Ut,P);for(let ee of[-1,1])rt(.08,.28,.025,.02,nt,N,D+.13,ee*B*.47,P)}continue}if(_==="mirrors")for(let D of[-1,1]){let B=b==="aero",N=B?1.77:1.86,ee=D*(B?1.47:1.53),ie=.77;rt(.18,.08,.15,.035,nt,.64,1.46,D*1.19,P),bt([[.64,1.47,D*1.19],[.62,1.62,D*1.32],[ie,N-.07,ee]],B?.023:.029,W,P);let ge=m(new sn(.046,16,12),nt,ie,N-.065,ee,P);if(b==="round"){m(new sn(1,32,20),xt,ie,N,ee,P).scale.set(.065,.15,.15);let De=m(new $n(.13,48),Yt,ie-.056,N,ee,P);De.rotation.y=-Math.PI/2,De.castShadow=!1;let Pe=m(new yt(.136,.009,8,48),xt,ie-.06,N,ee,P);Pe.rotation.y=Math.PI/2}else{let be=B?.31:b==="sport"?.35:.38,De=B?.16:.22,Pe=rt(be,De,.095,.065,b==="club"?nt:Ut,ie,N,ee,P);Pe.rotation.y=Math.PI/2;let xe=m(new $i(v(be-.045,De-.035,.05)),Yt,ie-.061,N,ee,P);xe.rotation.y=-Math.PI/2,xe.castShadow=!1,xe.receiveShadow=!1;let Fe=v(be-.028,De-.018,.055).getPoints(24).map(Ue=>[ie-.058,N+Ue.y,ee+Ue.x]);Fe.push(Fe[0]),bt(Fe,.006,xt,P)}}else if(_==="sideSkirts")for(let D of[-1,1]){let B=rt(2.3,b==="aero"?.17:.12,b==="rally"?.27:.13,.05,W,0,.59,D*1.24,P);if(b==="rally")for(let N of[-.84,-.42,0,.42,.84]){let ee=rt(.13,.018,.25,.018,nt,N,.67,D*1.24,P)}else bt([[-1.08,.54,D*1.3],[0,.53,D*1.32],[1.08,.54,D*1.3]],.009,d,P);for(let N of[-.87,.87])rt(.12,.14,.16,.025,nt,N,.65,D*1.2,P),Tn(N,.61,D*1.33,P);if(b==="aero")for(let N of[-.95,.95]){let ee=rt(.24,.12,.025,.025,Ut,N,.57,D*1.35,P);ee.rotation.z=N>0?.2:-.2}}else{let D=_==="frontBumper"?1:-1,B=[[D*2.26,.66,-.92],[D*2.58,.65,-.7],[D*2.67,.65,0],[D*2.58,.65,.7],[D*2.26,.66,.92]];bt(B,b==="sport"?.061:.047,W,P);for(let N of[-.67,.67]){bt([[D*2.31,.74,N],[D*2.5,.68,N]],.032,nt,P);let ee=rt(.16,.12,.13,.035,nt,D*2.51,.67,N,P)}if(b==="aero"){let N=rt(.38,.045,1.94,.07,Ut,D*2.48,.5,0,P);for(let ee of[-.7,-.27,.27,.7])rt(.27,.12,.022,.025,nt,D*2.48,.55,ee,P);bt([[D*2.4,.52,-.91],[D*2.64,.52,0],[D*2.4,.52,.91]],.008,xt,P)}if(b==="rally")for(let N of[-.72,.72])bt([[D*2.53,.65,N-.14],[D*2.56,.94,N-.14],[D*2.55,1.04,N],[D*2.56,.94,N+.14],[D*2.53,.65,N+.14]],.036,xt,P);if(b==="sport")for(let N of[-.67,.67]){let ee=rt(.2,.13,.14,.045,nt,D*2.56,.66,N,P)}if(_==="rearBumper"&&b==="aero")for(let N of[-.7,-.35,0,.35,.7]){let ee=rt(.27,.15,.025,.025,Ut,-2.46,.48,N,P);ee.rotation.z=.12}}}}let cn=i("#b9e4f5",.28,.17);cn.emissive.set("#b9e4f5"),cn.emissiveIntensity=1.8;let Ci=i("#ffdda0",.2,.2);Ci.emissive.set("#ffe0a8"),Ci.emissiveIntensity=1.25,qt.headlights={};for(let _ of["round","projector","rally","matrix"]){let b=new et;n.add(b),qt.headlights[_]=b;for(let P of[-1,1]){let W=P*.74,D=2.57-.28*(W/1.1)**2+.07,B=1.075;if(_==="matrix"){let N=rt(.4,.2,.075,.045,nt,D,B,W,b);N.rotation.y=Math.PI/2;let ee=rt(.35,.15,.01,.035,h,D+.05,B,W,b);ee.rotation.y=Math.PI/2;for(let ie=0;ie<4;ie++){let ge=rt(.06,.1,.012,.017,cn,D+.065,B,W-.128+ie*.085,b);ge.rotation.y=Math.PI/2,ge.castShadow=!1}}else{let N=_==="rally"?.16:_==="round"?.14:.135,ee=m(new ot(N+.027,N+.02,.095,48),nt,D,B,W,b);ee.rotation.z=Math.PI/2;let ie=m(new yt(N+.008,.01,10,48),xt,D+.054,B,W,b);ie.rotation.y=Math.PI/2;let ge=m(new sn(1,32,20),_==="round"||_==="rally"?Ci:cn,D+.055,B,W,b);if(ge.scale.set(.025,N,N),ge.castShadow=!1,_==="projector"){let be=m(new yt(N*.8,.008,8,48),cn,D+.076,B,W,b);be.rotation.y=Math.PI/2,m(new sn(1,24,16),Yt,D+.081,B,W,b).scale.set(.022,N*.53,N*.53)}if(_==="rally")for(let be of[-.07,0,.07]){let De=Math.sqrt(N*N-be*be);bt([[D+.09,B-De,W+be],[D+.1,B,W+be],[D+.09,B+De,W+be]],.009,nt,b)}}}}let ur={};for(let _ of["club","sport","rally","chrome"]){let b=[];ur[_]=b;for(let{wheelGroup:P,sign:W}of re){let D=new et;P.add(D),b.push(D);let B=_==="rally"?.91:.87,N=_==="rally"?.64:_==="sport"?.49:.57,ee=_==="sport"?1:1.23,ie=[],ge=[];for(let xe=0;xe<=48;xe++){let Fe=-ee+xe*ee*2/48;for(let Ue of[-N/2,N/2])ie.push(Math.sin(Fe)*B,Math.cos(Fe)*B,Ue)}for(let xe=0;xe<48;xe++){let Fe=xe*2;ge.push(Fe,Fe+1,Fe+2,Fe+1,Fe+3,Fe+2)}let be=new $e;be.setAttribute("position",new Re(ie,3)),be.setIndex(ge),be.computeVertexNormals();let Pe=(_==="chrome"?xt:_==="club"?s:Ut).clone();Pe.side=Ct,m(be,Pe,0,0,0,D);for(let xe of[-1,1]){let Fe=Array.from({length:49},(Ue,_e)=>{let Se=-ee+_e*ee*2/48;return[Math.sin(Se)*B,Math.cos(Se)*B,xe*N/2]});bt(Fe,.012,_==="chrome"?xt:nt,D)}for(let xe of[-1,1])bt([[0,0,-W*.28],[xe*.28,.42,-W*.31],[xe*.49,.68,-W*.31]],.022,nt,D),Tn(xe*.49,.68,-W*.32,D);if(_==="rally"){let xe=rt(.13,.25,N*.9,.025,nt,-.83,.2,0,D)}D.userData.shell=Pe}}qt.windshield={};for(let[_,b,P,W]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3]]){let B=function(Ue,_e){let Se=.92*(1-.13*_e),Tt=1-Ue*Ue;return[1.97+.23*Tt-b*.32*_e,1.5+b*_e*(.84+.16*Tt),Ue*Se]},D=new et;n.add(D),qt.windshield[_]=D;let N=[],ee=[],ie=40,ge=16;for(let Ue=0;Ue<=ge;Ue++)for(let _e=0;_e<=ie;_e++)N.push(...B(-1+_e*2/ie,Ue/ge));for(let Ue=0;Ue<ge;Ue++)for(let _e=0;_e<ie;_e++){let Se=Ue*(ie+1)+_e;ee.push(Se,Se+1,Se+ie+1,Se+1,Se+ie+2,Se+ie+1)}let be=new $e;be.setAttribute("position",new Re(N,3)),be.setIndex(ee),be.computeVertexNormals();let De=new _i({color:P,metalness:.05,roughness:.075,transparent:!0,opacity:W,depthWrite:!1,side:Ct,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65}),Pe=m(be,De,0,0,0,D);Pe.castShadow=!1,Pe.receiveShadow=!1,Pe.renderOrder=3;let xe=_==="smoke"?nt:xt;for(let Ue of[0,1])bt(Array.from({length:41},(_e,Se)=>B(-1+Se/20,Ue)),Ue===0?.017:.009,xe,D);for(let Ue of[-1,1]){bt(Array.from({length:17},(Tt,ri)=>B(Ue,ri/16)),.011,xe,D);let _e=B(Ue,0);rt(.19,.055,.14,.025,nt,_e[0],_e[1]-.025,_e[2],D);let Se=m(new ot(.013,.013,.018,6),xt,_e[0]+.04,_e[1]+.014,_e[2],D)}let Fe=new Fn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let Ue of[-.77,-.69]){let _e=Array.from({length:13},(Tt,ri)=>{let si=B(Ue,.18+ri*.058);return si[0]+=.004,si}),Se=bt(_e,.003,Fe,D);Se.castShadow=!1,Se.receiveShadow=!1,Se.renderOrder=4}}let Ri=new et;for(let _ of n.children.slice())_.userData.groundWheel||Ri.add(_);n.add(Ri);let es=i("#b8c7d6",.7,.3),hn=new et;hn.position.y=.45,n.add(hn);for(let _ of[-1.72,1.72])for(let b of[-1,1]){let P=Array.from({length:161},(W,D)=>{let B=D/160,N=B*Math.PI*12;return new w(_+Math.cos(N)*.095,0+B*.43,b*1.05+Math.sin(N)*.095)});m(new ct(new pt(P),160,.018,8,!1),es,0,0,0,hn),m(new ot(.028,.028,.45,16),xt,_,.21,b*1.05,hn),m(new ot(.055,.055,.22,24),nt,_,.11,b*1.05,hn);for(let W of[0,.43])m(new ot(.115,.115,.035,32),nt,_,W,b*1.05,hn)}function A(_){let b={standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[_.suspension]||0;mt.forEach(B=>B.visible=!_.headlights||_.headlights==="classic");for(let[B,N]of Object.entries(ur))for(let ee of N)ee.visible=_.fenders===B,B==="club"&&ee.userData.shell.color.set(t.item("paint",_.paint).color);es.color.set(t.item("suspension",_.suspension).color),Ri.position.y=b,hn.visible=b>0,hn.scale.y=1+b/.43;for(let[B,N]of Object.entries(qt))for(let[ee,ie]of Object.entries(N))ie.visible=_[B]===ee;Object.entries(j).forEach(([B,N])=>N.visible=B===(_.steering||"classic")),Object.entries(St).forEach(([B,N])=>N.visible=B===(_.exhaust||"classic")),Ge.visible=_.turbine==="boost";let P=_.turbine==="twin",W=P?.52:_.turbine==="boost"?.96:.9;Qe.scale.set(W/1.24,W/.86,W/.95),Qe.position.set(pe,Me+(P?-.2:-.04),P?-.44:0),je.visible=P,je.scale.copy(Qe.scale),je.position.set(pe,Me-.2,.44);let D=_.badges||[];if(de.forEach(B=>B.userData.plane.visible=!D.length),ue.forEach(({group:B,mat:N,n:ee})=>{let ie=D[ee];B.visible=!!ie,!(!ie||N.userData.badge===ie)&&(N.map?.dispose(),N.map=new Gt(t.badgeCanvas(ie)),N.map.colorSpace=at,N.map.anisotropy=16,N.emissive.set("#ffffff"),N.emissiveMap=N.map,N.emissiveIntensity=.12,N.userData.badge=ie,N.needsUpdate=!0)}),s.color.set(t.item("paint",_.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.item("wheels",_.wheels).color),ve!==_.wheels){for(let B of Q)B.removeFromParent(),B.geometry.dispose();Q.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:B,x:N,out:ee,sign:ie}of re)for(let ge of t.wheelDesign(_.wheels)){let be=new pt(ge.map(([Pe,xe])=>new w(Pe,xe,ie*(.25+.025*(1-Math.hypot(Pe,xe)/.51))))),De=m(new ct(be,20,["fiveSpoke","legend"].includes(_.wheels)?.023:.009,8,!1),l,0,0,0,B);Q.push(De)}ve=_.wheels}o.color.set(t.item("trim",_.trim).color),u.userData.style!==_.upholstery&&(u.map?.dispose(),u.map=new Gt(t.upholsteryCanvas(_.upholstery)),u.map.colorSpace=at,u.map.wrapS=u.map.wrapT=di,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=_.upholstery==="alcantara"?.9:.38,u.userData.style=_.upholstery,u.needsUpdate=!0),t.chipPalette(_.chips).forEach((B,N)=>{E[N].color.set(B),E[N].roughness=_.chips==="ceramic"?.25:.55}),Ie.forEach(B=>B.visible=_.chips!=="ceramic"),Ne.forEach(({mat:B,n:N})=>{B.userData.style!==_.chips&&(B.map?.dispose(),B.map=new Gt(t.chipCanvas(_.chips,N)),B.map.colorSpace=at,B.map.anisotropy=8,B.userData.style=_.chips,B.needsUpdate=!0)}),ii.forEach((B,N)=>{B.userData.style!==_.cards&&(B.map?.dispose(),B.map=new Gt(t.cardCanvas(_.cards,N)),B.map.colorSpace=at,B.map.anisotropy=16,B.userData.style=_.cards,B.needsUpdate=!0)}),Q.forEach(B=>B.visible=!0),oe.forEach(B=>B.visible=!0),d.color.set(t.item("light",_.light).color),d.emissive.copy(d.color),p.color.copy(d.color).multiplyScalar(.075),p.emissive.copy(d.color),p.emissiveIntensity=.045,ln.userData.number!==_.number+_.region&&(ln.map?.dispose(),ln.map=new Gt(t.plateCanvas(_)),ln.userData.number=_.number+_.region,ln.needsUpdate=!0)}let Z=new Wr(d.color,.45,2,2);Z.position.set(-1.9,2,.48),Ri.add(Z);let ne=A;function se(_){ne(_),Z.color.copy(d.color)}return se(e),{car:n,update:se}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Da({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=at,n.toneMapping=va,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=ha,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new fi,s=new Mt(35,1,.1,60);i.add(new Hr("#c6d9ef","#44311e",1.25));for(let[q,X,$,Q,oe]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let re=new Xr(q,X);re.position.set($,Q,oe),re.castShadow=q==="#fff0d0",re.shadow.bias=-2e-4,re.shadow.normalBias=.025,re.shadow.mapSize.set(2048,2048),re.shadow.camera.left=-5,re.shadow.camera.right=5,re.shadow.camera.top=5,re.shadow.camera.bottom=-5,i.add(re)}let a=new fi;a.background=new Oe("#48505b");for(let[q,X,$,Q,oe,re]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let ve=new ft(new dt(Q,oe,re),new Fn({color:"#ffffff"}));ve.position.set(q,X,$),a.add(ve)}let o=new lr(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(q=>{q.geometry?.dispose(),q.material?.dispose()}),o.dispose();let l=new ft(new Dt(30,30),new Vr({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=Qd(i,e);t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let u=!1,d=null,p=0,m=0,y=()=>{let q=r.clientWidth,X=r.clientHeight;q&&X&&(n.setSize(q,X,!1),s.aspect=q/X,s.updateProjectionMatrix())},f=new ResizeObserver(y);f.observe(r),y();let g=new jt(1,1,{type:ni,depthBuffer:!0});g.samples=4;let v=new fi,x=new yi(-1,1,1,-1,0,1),S=new zt({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:g.texture},stepSize:{value:new ae}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),R=new ft(new Dt(2,2),S);v.add(R);function I(){let q=n.getDrawingBufferSize(new ae);(g.width!==q.x||g.height!==q.y)&&g.setSize(q.x,q.y),S.uniforms.stepSize.value.set(3/q.x,3/q.y),n.setRenderTarget(g),n.render(i,s),n.setRenderTarget(null),n.render(v,x)}let G=q=>{q.button&&q.button!==0||(t.manual=!0,d={id:q.pointerId,x:q.clientX,y:q.clientY},r.setPointerCapture(q.pointerId),q.preventDefault())},H=q=>{!d||d.id!==q.pointerId||(t.yaw-=(q.clientX-d.x)*.011,t.pitch=Oh(t.pitch+(q.clientY-d.y)*.009,-.24,1.35),d.x=q.clientX,d.y=q.clientY,q.preventDefault())},O=q=>{d&&d.id===q.pointerId&&(d=null,r.hasPointerCapture(q.pointerId)&&r.releasePointerCapture(q.pointerId))},J=q=>{let X={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};X[q.key]&&(t.manual=!0,t.yaw+=X[q.key][0],t.pitch=Oh(t.pitch+X[q.key][1],-.24,1.35),q.preventDefault())};r.addEventListener("keydown",J),r.addEventListener("pointerdown",G),r.addEventListener("pointermove",H),r.addEventListener("pointerup",O),r.addEventListener("pointercancel",O),r.addEventListener("lostpointercapture",O);function K(){if(u)return;u=!0,cancelAnimationFrame(p),f.disconnect(),r.removeEventListener("keydown",J),r.removeEventListener("pointerdown",G),r.removeEventListener("pointermove",H),r.removeEventListener("pointerup",O),r.removeEventListener("pointercancel",O),r.removeEventListener("lostpointercapture",O);let q=new Set,X=new Set,$=new Set;i.traverse(Q=>{Q.geometry&&$.add(Q.geometry),Q.material&&X.add(Q.material)}),X.forEach(Q=>{for(let oe of Object.values(Q))oe&&oe.isTexture&&q.add(oe);Q.dispose()}),q.forEach(Q=>Q.dispose()),$.forEach(Q=>Q.dispose()),c.dispose(),g.dispose(),S.dispose(),R.geometry.dispose(),n.dispose(),n.domElement.remove()}function k(q){if(u)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){K();return}let X=m?Math.min(.05,(q-m)/1e3):0;if(m=q,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=X*.13);let $=Math.max(9,3.6/(Math.tan(35*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*$,1.15+Math.sin(t.pitch)*$,Math.cos(t.yaw)*Math.cos(t.pitch)*$),s.lookAt(0,1.2,0),I(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}p=requestAnimationFrame(k)}return p=requestAnimationFrame(k),{update:h.update,dispose:K,state:t}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
