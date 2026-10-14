(()=>{var Ac=0,ko=1,Cc=2;var Vo=1,Ia=2,ei=3,yr=0,An=1,kt=2,Ci=0,hs=1,Ho=2,Wo=3,Xo=4,Rc=5,xr=100,Pc=101,Ic=102,Lc=103,Dc=104,Uc=200,Nc=201,Fc=202,Oc=203,Bc=204,zc=205,Gc=206,kc=207,Vc=208,Hc=209,Wc=210,Xc=211,jc=212,qc=213,Yc=214,La=0,Da=1,Ua=2,us=3,Na=4,Fa=5,Oa=6,Ba=7,Zc=0,Jc=1,Kc=2,vi=0,$c=1,Qc=2,eh=3,ti=4,th=5,nh=6,ih=7;var jo=300,Mr=301,Vi=302,za=303,Ga=304,ds=306,Gn=1e3,cr=1001,Ys=1002,$n=1003,rh=1004;var ps=1005;var Qn=1006,ka=1007;var Hi=1008;var ni=1009,qo=1010,Yo=1011,Sr=1012,Va=1013,Wi=1014,Wn=1015,Ri=1016,Ha=1017,Wa=1018,Tr=1020,Zo=35902,Jo=35899,sh=1021,ah=1022,Xn=1023,ms=1026,fs=1027,Xa=1028,ja=1029,oh=1030,Ko=1031;var $o=1033,qa=33776,Ya=33777,Za=33778,Ja=33779,Qo=35840,el=35841,tl=35842,nl=35843,il=36196,rl=37492,sl=37496,al=37808,ol=37809,ll=37810,cl=37811,hl=37812,ul=37813,dl=37814,pl=37815,ml=37816,fl=37817,gl=37818,vl=37819,_l=37820,yl=37821,xl=36492,Ml=36494,Sl=36495,Tl=36283,bl=36284,wl=36285,El=36286;var kr=2300,Zs=2301,js=2302,Io=2400,Lo=2401,Do=2402;var lh=3201;var ch=0,hh=1,Xi="",ht="srgb",Fi="srgb-linear",Vr="linear",xt="srgb";var Ni=7680;var uh=512,dh=513,ph=514,Al=515,mh=516,fh=517,gh=518,vh=519,Uo=35044;var Cl="300 es",di=2e3,Hr=2001;var pi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var qs=Math.PI/180,Js=180/Math.PI;function br(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(an[255&r]+an[r>>8&255]+an[r>>16&255]+an[r>>24&255]+"-"+an[255&e]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[63&t|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[255&n]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function ot(r,e,t){return Math.max(e,Math.min(t,r))}function ru(r,e){return(r%e+e)%e}function to(r,e,t){return(1-t)*r+t*e}function Pr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function fn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ve=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},bn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],y=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=y);if(u!==y||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*y,v=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){let E=Math.sqrt(_),P=Math.atan2(E,g*v);f=Math.sin(f*P)/E,o=Math.sin(o*P)/E}let S=o*v;if(c=c*f+d*S,l=l*f+m*S,h=h*f+p*S,u=u*f+y*S,f===1-o){let E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},no=new w,Ql=new bn,rt=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],y=i[0],f=i[3],g=i[6],v=i[1],_=i[4],S=i[7],E=i[2],P=i[5],k=i[8];return s[0]=a*y+o*v+c*E,s[3]=a*f+o*_+c*P,s[6]=a*g+o*S+c*k,s[1]=l*y+h*v+u*E,s[4]=l*f+h*_+u*P,s[7]=l*g+h*S+u*k,s[2]=d*y+m*v+p*E,s[5]=d*f+m*_+p*P,s[8]=d*g+m*S+p*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=u*y,e[1]=(i*l-h*n)*y,e[2]=(o*n-i*a)*y,e[3]=d*y,e[4]=(h*t-i*c)*y,e[5]=(i*s-o*t)*y,e[6]=m*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(io.makeScale(e,t)),this}rotate(e){return this.premultiply(io.makeRotation(-e)),this}translate(e,t){return this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},io=new rt;function Rl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Wr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _h(){let r=Wr("canvas");return r.style.display="block",r}var ec={};function hr(r){r in ec||(ec[r]=!0,console.warn(r))}function yh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var tc=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nc=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function su(){let r={enabled:!0,workingColorSpace:Fi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===xt&&(i.r=ui(i.r),i.g=ui(i.g),i.b=ui(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(i.r=lr(i.r),i.g=lr(i.g),i.b=lr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Vr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return hr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return hr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Fi]:{primaries:e,whitePoint:n,transfer:Vr,toXYZ:tc,fromXYZ:nc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ht},outputColorSpaceConfig:{drawingBufferColorSpace:ht}},[ht]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:tc,fromXYZ:nc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ht}}}),r}var pt=su();function ui(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function lr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var Ji,Ks=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ji===void 0&&(Ji=Wr("canvas")),Ji.width=e.width,Ji.height=e.height;let i=Ji.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*ui(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ui(t[n]/255)):t[n]=ui(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},au=0,ur=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ro(i[a].image)):s.push(ro(i[a]))}else s=ro(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function ro(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ks.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ou=0,so=new w,dn=class r extends pi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=br(),this.name="",this.source=new ur(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(so).x}get height(){return this.source.getSize(so).y}get depth(){return this.source.getSize(so).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gn:e.x=e.x-Math.floor(e.x);break;case cr:e.x=e.x<0?0:1;break;case Ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Gn:e.y=e.y-Math.floor(e.y);break;case cr:e.y=e.y<0?0:1;break;case Ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};dn.DEFAULT_IMAGE=null,dn.DEFAULT_MAPPING=jo,dn.DEFAULT_ANISOTROPY=1;var vt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],y=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,S=(m+1)/2,E=(g+1)/2,P=(h+d)/4,k=(u+y)/4,W=(p+f)/4;return _>S&&_>E?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=P/n,s=k/n):S>E?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=P/i,s=W/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=k/s,i=W/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-p)*(f-p)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(u-y)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$s=class extends pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new dn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Qn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ur(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends $s{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Xr=class extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$n,this.minFilter=$n,this.wrapR=cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qs=class extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$n,this.minFilter=$n,this.wrapR=cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,On):On.fromBufferAttribute(s,a),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ms.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ms.copy(n.boundingBox)),Ms.applyMatrix4(e.matrixWorld),this.union(Ms)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Ss.subVectors(this.max,Ir),Ki.subVectors(e.a,Ir),$i.subVectors(e.b,Ir),Qi.subVectors(e.c,Ir),_i.subVectors($i,Ki),yi.subVectors(Qi,$i),Ii.subVectors(Ki,Qi);let t=[0,-_i.z,_i.y,0,-yi.z,yi.y,0,-Ii.z,Ii.y,_i.z,0,-_i.x,yi.z,0,-yi.x,Ii.z,0,-Ii.x,-_i.y,_i.x,0,-yi.y,yi.x,0,-Ii.y,Ii.x,0];return!!ao(t,Ki,$i,Qi,Ss)&&(t=[1,0,0,0,1,0,0,0,1],!!ao(t,Ki,$i,Qi,Ss)&&(Ts.crossVectors(_i,yi),t=[Ts.x,Ts.y,Ts.z],ao(t,Ki,$i,Qi,Ss)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(On).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},si=[new w,new w,new w,new w,new w,new w,new w,new w],On=new w,Ms=new Ln,Ki=new w,$i=new w,Qi=new w,_i=new w,yi=new w,Ii=new w,Ir=new w,Ss=new w,Ts=new w,Li=new w;function ao(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Li.fromArray(r,s);let o=i.x*Math.abs(Li.x)+i.y*Math.abs(Li.y)+i.z*Math.abs(Li.z),c=e.dot(Li),l=t.dot(Li),h=n.dot(Li);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var lu=new Ln,Lr=new w,oo=new w,Dn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):lu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(oo)),this.expandByPoint(Lr.copy(e.center).sub(oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ai=new w,lo=new w,bs=new w,xi=new w,co=new w,ws=new w,ho=new w,Oi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){lo.copy(e).add(t).multiplyScalar(.5),bs.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(lo);let s=.5*e.distanceTo(t),a=-this.direction.dot(bs),o=xi.dot(this.direction),c=-xi.dot(bs),l=xi.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let y=1/h;u*=y,d*=y,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(lo).addScaledVector(bs,d),m}intersectSphere(e,t){ai.subVectors(e.center,this.origin);let n=ai.dot(this.direction),i=ai.dot(ai)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,i,s){co.subVectors(t,e),ws.subVectors(n,e),ho.crossVectors(co,ws);let a,o=this.direction.dot(ho);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}xi.subVectors(this.origin,e);let c=a*this.direction.dot(ws.crossVectors(xi,ws));if(c<0)return null;let l=a*this.direction.dot(co.cross(xi));if(l<0||c+l>o)return null;let h=-a*xi.dot(ho);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},et=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=y,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/er.setFromMatrixColumn(e,0).length(),s=1/er.setFromMatrixColumn(e,1).length(),a=1/er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,y=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-y*l,t[9]=-o*c,t[2]=y-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,y=l*u;t[0]=d+y*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=y+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,y=l*u;t[0]=d-y*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=y-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,y=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+y,t[1]=c*u,t[5]=y*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,y=o*l;t[0]=c*h,t[4]=y-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-y*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,y=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+y,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cu,e,hu)}lookAt(e,t,n){let i=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Mi.crossVectors(n,Mn),Mi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Mi.crossVectors(n,Mn)),Mi.normalize(),Es.crossVectors(Mn,Mi),i[0]=Mi.x,i[4]=Es.x,i[8]=Mn.x,i[1]=Mi.y,i[5]=Es.y,i[9]=Mn.y,i[2]=Mi.z,i[6]=Es.z,i[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],y=n[6],f=n[10],g=n[14],v=n[3],_=n[7],S=n[11],E=n[15],P=i[0],k=i[4],W=i[8],D=i[12],I=i[1],G=i[5],N=i[9],j=i[13],X=i[2],K=i[6],te=i[10],ue=i[14],le=i[3],Te=i[7],ne=i[11],me=i[15];return s[0]=a*P+o*I+c*X+l*le,s[4]=a*k+o*G+c*K+l*Te,s[8]=a*W+o*N+c*te+l*ne,s[12]=a*D+o*j+c*ue+l*me,s[1]=h*P+u*I+d*X+m*le,s[5]=h*k+u*G+d*K+m*Te,s[9]=h*W+u*N+d*te+m*ne,s[13]=h*D+u*j+d*ue+m*me,s[2]=p*P+y*I+f*X+g*le,s[6]=p*k+y*G+f*K+g*Te,s[10]=p*W+y*N+f*te+g*ne,s[14]=p*D+y*j+f*ue+g*me,s[3]=v*P+_*I+S*X+E*le,s[7]=v*k+_*G+S*K+E*Te,s[11]=v*W+_*N+S*te+E*ne,s[15]=v*D+_*j+S*ue+E*me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],y=e[13],f=e[14],g=e[15],v=u*f*l-y*d*l+y*c*m-o*f*m-u*c*g+o*d*g,_=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,S=h*y*l-p*u*l+p*o*m-a*y*m-h*o*g+a*u*g,E=p*u*c-h*y*c-p*o*d+a*y*d+h*o*f-a*u*f,P=t*v+n*_+i*S+s*E;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/P;return e[0]=v*k,e[1]=(y*d*s-u*f*s-y*i*m+n*f*m+u*i*g-n*d*g)*k,e[2]=(o*f*s-y*c*s+y*i*l-n*f*l-o*i*g+n*c*g)*k,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*k,e[4]=_*k,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*k,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*k,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*k,e[8]=S*k,e[9]=(p*u*s-h*y*s-p*n*m+t*y*m+h*n*g-t*u*g)*k,e[10]=(a*y*s-p*o*s+p*n*l-t*y*l-a*n*g+t*o*g)*k,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*k,e[12]=E*k,e[13]=(h*y*i-p*u*i+p*n*d-t*y*d-h*n*f+t*u*f)*k,e[14]=(p*o*i-a*y*i-p*n*c+t*y*c+a*n*f-t*o*f)*k,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*k,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,y=a*h,f=a*u,g=o*u,v=c*l,_=c*h,S=c*u,E=n.x,P=n.y,k=n.z;return i[0]=(1-(y+g))*E,i[1]=(m+S)*E,i[2]=(p-_)*E,i[3]=0,i[4]=(m-S)*P,i[5]=(1-(d+g))*P,i[6]=(f+v)*P,i[7]=0,i[8]=(p+_)*k,i[9]=(f-v)*k,i[10]=(1-(d+y))*k,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=er.set(i[0],i[1],i[2]).length(),a=er.set(i[4],i[5],i[6]).length(),o=er.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Bn.copy(this);let c=1/s,l=1/a,h=1/o;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=l,Bn.elements[5]*=l,Bn.elements[6]*=l,Bn.elements[8]*=h,Bn.elements[9]*=h,Bn.elements[10]*=h,t.setFromRotationMatrix(Bn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,y;if(c)p=s/(a-s),y=a*s/(a-s);else if(o===di)p=-(a+s)/(a-s),y=-2*a*s/(a-s);else{if(o!==Hr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),y=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,y;if(c)p=1/(a-s),y=a/(a-s);else if(o===di)p=-2/(a-s),y=-(a+s)/(a-s);else{if(o!==Hr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),y=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},er=new w,Bn=new et,cu=new w(0,0,0),hu=new w(1,1,1),Mi=new w,Es=new w,Mn=new w,ic=new et,rc=new bn,kn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ic.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ic,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rc.setFromEuler(this),this.setFromQuaternion(rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";var jr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},uu=0,sc=new w,tr=new bn,oi=new et,As=new w,Dr=new w,du=new w,pu=new bn,ac=new w(1,0,0),oc=new w(0,1,0),lc=new w(0,0,1),cc={type:"added"},mu={type:"removed"},nr={type:"childadded",child:null},uo={type:"childremoved",child:null},ln=class r extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new kn,n=new bn,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new et},normalMatrix:{value:new rt}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.multiply(tr),this}rotateOnWorldAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.premultiply(tr),this}rotateX(e){return this.rotateOnAxis(ac,e)}rotateY(e){return this.rotateOnAxis(oc,e)}rotateZ(e){return this.rotateOnAxis(lc,e)}translateOnAxis(e,t){return sc.copy(e).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ac,e)}translateY(e){return this.translateOnAxis(oc,e)}translateZ(e){return this.translateOnAxis(lc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?As.copy(e):As.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(Dr,As,this.up):oi.lookAt(As,Dr,this.up),this.quaternion.setFromRotationMatrix(oi),i&&(oi.extractRotation(i.matrixWorld),tr.setFromRotationMatrix(oi),this.quaternion.premultiply(tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cc),nr.child=e,this.dispatchEvent(nr),nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mu),uo.child=e,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cc),nr.child=e,this.dispatchEvent(nr),nr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,du),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};ln.DEFAULT_UP=new w(0,1,0),ln.DEFAULT_MATRIX_AUTO_UPDATE=!0,ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var zn=new w,li=new w,po=new w,ci=new w,ir=new w,rr=new w,hc=new w,mo=new w,fo=new w,go=new w,vo=new vt,_o=new vt,yo=new vt,hi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),zn.subVectors(e,t),i.cross(zn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){zn.subVectors(i,t),li.subVectors(n,t),po.subVectors(e,t);let a=zn.dot(zn),o=zn.dot(li),c=zn.dot(po),l=li.dot(li),h=li.dot(po),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ci)!==null&&ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ci.x),c.addScaledVector(a,ci.y),c.addScaledVector(o,ci.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return vo.setScalar(0),_o.setScalar(0),yo.setScalar(0),vo.fromBufferAttribute(e,t),_o.fromBufferAttribute(e,n),yo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(vo,s.x),a.addScaledVector(_o,s.y),a.addScaledVector(yo,s.z),a}static isFrontFacing(e,t,n,i){return zn.subVectors(n,t),li.subVectors(e,t),zn.cross(li).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),.5*zn.cross(li).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;ir.subVectors(i,n),rr.subVectors(s,n),mo.subVectors(e,n);let c=ir.dot(mo),l=rr.dot(mo);if(c<=0&&l<=0)return t.copy(n);fo.subVectors(e,i);let h=ir.dot(fo),u=rr.dot(fo);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ir,a);go.subVectors(e,s);let m=ir.dot(go),p=rr.dot(go);if(p>=0&&m<=p)return t.copy(s);let y=m*l-c*p;if(y<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(rr,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return hc.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(hc,o);let g=1/(f+y+d);return a=y*g,o=d*g,t.copy(n).addScaledVector(ir,a).addScaledVector(rr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function xo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=pt.workingColorSpace){if(e=ru(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=xo(a,s,e+1/3),this.g=xo(a,s,e),this.b=xo(a,s,e-1/3)}return pt.colorSpaceToWorking(this,i),this}setStyle(e,t=ht){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){let n=xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return pt.workingToColorSpace(on.copy(this),e),65536*Math.round(ot(255*on.r,0,255))+256*Math.round(ot(255*on.g,0,255))+Math.round(ot(255*on.b,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(on.copy(this),t);let n=on.r,i=on.g,s=on.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=ht){pt.workingToColorSpace(on.copy(this),e);let t=on.r,n=on.g,i=on.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(Cs);let n=to(Si.h,Cs.h,t),i=to(Si.s,Cs.s,t),s=to(Si.l,Cs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new Ye;Ye.NAMES=xh;var fu=0,mi=class extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=br(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Un=class extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},vp=gu();function gu(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var jt=new w,Rs=new ve,vu=0,gn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Uo,this.updateRanges=[],this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pr(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pr(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pr(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array),i=fn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uo&&(e.usage=this.usage),e}};var qr=class extends gn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Yr=class extends gn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Oe=class extends gn{constructor(e,t,n){super(new Float32Array(e),t,n)}},_u=0,Pn=new et,Mo=new ln,sr=new w,Sn=new Ln,Ur=new Ln,$t=new w,dt=class r extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rl(e)?Yr:qr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new rt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Oe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(Sn.min,Ur.min),Sn.expandByPoint($t),$t.addVectors(Sn.max,Ur.max),Sn.expandByPoint($t)):(Sn.expandByPoint(Ur.min),Sn.expandByPoint(Ur.max))}Sn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)$t.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared($t));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)$t.fromBufferAttribute(o,l),c&&(sr.fromBufferAttribute(e,l),$t.add(sr)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let W=0;W<n.count;W++)o[W]=new w,c[W]=new w;let l=new w,h=new w,u=new w,d=new ve,m=new ve,p=new ve,y=new w,f=new w;function g(W,D,I){l.fromBufferAttribute(n,W),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,I),d.fromBufferAttribute(s,W),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,I),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let G=1/(m.x*p.y-p.x*m.y);isFinite(G)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(G),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(G),o[W].add(y),o[D].add(y),o[I].add(y),c[W].add(f),c[D].add(f),c[I].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let W=0,D=v.length;W<D;++W){let I=v[W],G=I.start;for(let N=G,j=G+I.count;N<j;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let _=new w,S=new w,E=new w,P=new w;function k(W){E.fromBufferAttribute(i,W),P.copy(E);let D=o[W];_.copy(D),_.sub(E.multiplyScalar(E.dot(D))).normalize(),S.crossVectors(P,D);let I=S.dot(c[W])<0?-1:1;a.setXYZW(W,_.x,_.y,_.z,I)}for(let W=0,D=v.length;W<D;++W){let I=v[W],G=I.start;for(let N=G,j=G+I.count;N<j;N+=3)k(e.getX(N+0)),k(e.getX(N+1)),k(e.getX(N+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),y=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let y=0,f=c.length;y<f;y++){m=o.isInterleavedBufferAttribute?c[y]*o.data.stride+o.offset:c[y]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new gn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},uc=new et,Di=new Oi,Ps=new Dn,dc=new w,Is=new w,Ls=new w,Ds=new w,So=new w,Us=new w,pc=new w,Ns=new w,gt=class extends ln{constructor(e=new dt,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(So.fromBufferAttribute(u,e),a?Us.addScaledVector(So,h):Us.addScaledVector(So.sub(t),h))}t.add(Us)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(s),Di.copy(e.ray).recast(e.near),Ps.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Ps,dc)===null||Di.origin.distanceToSquared(dc)>(e.far-e.near)**2))return;uc.copy(s).invert(),Di.copy(e.ray).applyMatrix4(uc),n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Di)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),_=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));v<_;v+=3)i=Fs(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);p<y;p+=3)i=Fs(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),_=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));v<_;v+=3)i=Fs(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);p<y;p+=3)i=Fs(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function Fs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Is),r.getVertexPosition(c,Ls),r.getVertexPosition(l,Ds);let h=(function(u,d,m,p,y,f,g,v){let _;if(_=d.side===1?p.intersectTriangle(g,f,y,!0,v):p.intersectTriangle(y,f,g,d.side===0,v),_===null)return null;Ns.copy(v),Ns.applyMatrix4(u.matrixWorld);let S=m.ray.origin.distanceTo(Ns);return S<m.near||S>m.far?null:{distance:S,point:Ns.clone(),object:u}})(r,e,t,n,Is,Ls,Ds,pc);if(h){let u=new w;hi.getBarycoord(pc,Is,Ls,Ds,u),i&&(h.uv=hi.getInterpolatedAttribute(i,o,c,l,u,new ve)),s&&(h.uv1=hi.getInterpolatedAttribute(s,o,c,l,u,new ve)),a&&(h.normal=hi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};hi.getNormal(Is,Ls,Ds,d.normal),h.face=d,h.barycoord=u}return h}var _t=class r extends dt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(y,f,g,v,_,S,E,P,k,W,D){let I=S/k,G=E/W,N=S/2,j=E/2,X=P/2,K=k+1,te=W+1,ue=0,le=0,Te=new w;for(let ne=0;ne<te;ne++){let me=ne*G-j;for(let Pe=0;Pe<K;Pe++){let de=Pe*I-N;Te[y]=de*v,Te[f]=me*_,Te[g]=X,l.push(Te.x,Te.y,Te.z),Te[y]=0,Te[f]=0,Te[g]=P>0?1:-1,h.push(Te.x,Te.y,Te.z),u.push(Pe/k),u.push(1-ne/W),ue+=1}}for(let ne=0;ne<W;ne++)for(let me=0;me<k;me++){let Pe=d+me+K*ne,de=d+me+K*(ne+1),Me=d+(me+1)+K*(ne+1),fe=d+(me+1)+K*ne;c.push(Pe,de,fe),c.push(de,Me,fe),le+=6}o.addGroup(m,le,D),m+=le,d+=ue}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ji(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function hn(r){let e={};for(let t=0;t<r.length;t++){let n=ji(r[t]);for(let i in n)e[i]=n[i]}return e}function Pl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}var Mh={clone:ji,merge:hn},cn=class extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},dr=class extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ti=new w,mc=new ve,fc=new ve,zt=class extends dr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Js*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*qs*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Js*Math.atan(Math.tan(.5*qs*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,mc,fc),t.subVectors(fc,mc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*qs*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ar=-90,ea=class extends ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new zt(ar,1,e,t);i.layers=this.layers,this.add(i);let s=new zt(ar,1,e,t);s.layers=this.layers,this.add(s);let a=new zt(ar,1,e,t);a.layers=this.layers,this.add(a);let o=new zt(ar,1,e,t);o.layers=this.layers,this.add(o);let c=new zt(ar,1,e,t);c.layers=this.layers,this.add(c);let l=new zt(ar,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===di)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Hr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Zr=class extends dn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ta=class extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Zr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new _t(5,5,5),s=new cn({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new gt(i,s),o=t.minFilter;return t.minFilter===Hi&&(t.minFilter=Qn),new ea(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ke=class extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}},yu={type:"move"},pr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,n),g=this._getHandJoint(l,y);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var pn=class extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var _p=new w;var yp=new w,xp=new w,Mp=new w,Sp=new ve,Tp=new ve,bp=new et,wp=new w,Ep=new w,Ap=new w,Cp=new ve,Rp=new ve,Pp=new ve;var Ip=new w,Lp=new w;var Dp=new w,Up=new vt,Np=new vt,Fp=new w,Op=new et,Bp=new w,zp=new Dn,Gp=new et,kp=new Oi;var na=class extends dn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vp=new et,Hp=new et;var Jr=class extends gn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},or=new et,gc=new et,Os=[],vc=new Ln,xu=new et,Nr=new gt,Fr=new Dn,Kr=class extends gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jr(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,xu)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,or),vc.copy(e.boundingBox).applyMatrix4(or),this.boundingBox.union(vc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,or),Fr.copy(e.boundingSphere).applyMatrix4(or),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Nr.geometry=this.geometry,Nr.material=this.material,Nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),e.ray.intersectsSphere(Fr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,or),gc.multiplyMatrices(n,or),Nr.matrixWorld=gc,Nr.raycast(e,Os);for(let a=0,o=Os.length;a<o;a++){let c=Os[a];c.instanceId=s,c.object=this,t.push(c)}Os.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jr(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new na(new Float32Array(i*this.count),i,this.count,Xa,Wn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},To=new w,Mu=new w,Su=new rt,Jn=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=To.subVectors(n,t).cross(Mu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(To),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Su.getNormalMatrix(e),i=this.coplanarPoint(To).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ui=new Dn,Tu=new ve(.5,.5),Bs=new w,Ei=class{constructor(e=new Jn,t=new Jn,n=new Jn,i=new Jn,s=new Jn,a=new Jn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],y=s[9],f=s[10],g=s[11],v=s[12],_=s[13],S=s[14],E=s[15];if(i[0].setComponents(l-a,m-h,g-p,E-v).normalize(),i[1].setComponents(l+a,m+h,g+p,E+v).normalize(),i[2].setComponents(l+o,m+u,g+y,E+_).normalize(),i[3].setComponents(l-o,m-u,g-y,E-_).normalize(),n)i[4].setComponents(c,d,f,S).normalize(),i[5].setComponents(l-c,m-d,g-f,E-S).normalize();else if(i[4].setComponents(l-c,m-d,g-f,E-S).normalize(),t===di)i[5].setComponents(l+c,m+d,g+f,E+S).normalize();else{if(t!==Hr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,S).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){Ui.center.set(0,0,0);let t=Tu.distanceTo(e.center);return Ui.radius=.7071067811865476+t,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Bs.x=i.normal.x>0?e.max.x:e.min.x,Bs.y=i.normal.y>0?e.max.y:e.min.y,Bs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Yn=new et,Zn=new Ei,ia=class r{constructor(){this.coordinateSystem=di}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Yn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Zn.setFromProjectionMatrix(Yn,i.coordinateSystem,i.reversedDepth),Zn.containsPoint(e))return!0}return!1}clone(){return new r}};var No=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Wp=new et,Xp=new Ye(1,1,1),jp=new Ei,qp=new ia,Yp=new Ln,Zp=new Dn,Jp=new w,Kp=new w,$p=new w,Qp=new No,em=new gt;var tm=new w,nm=new w,im=new et,rm=new Oi,sm=new Dn,am=new w,om=new w;var lm=new w,cm=new w;var hm=new et,um=new Oi,dm=new Dn,pm=new w;var Tt=class extends dn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},$r=class extends dn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==ms&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ur(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Qr=class extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},mr=class r extends dt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,y=i+1,f=new w,g=new w;for(let v=0;v<=p;v++){let _=0,S=0,E=0,P=0;if(v<=n){let D=v/n,I=D*Math.PI/2;S=-h-e*Math.cos(I),E=e*Math.sin(I),P=-e*Math.cos(I),_=D*u}else if(v<=n+s){let D=(v-n)/s;S=D*t-h,E=e,P=0,_=u+D*d}else{let D=(v-n-s)/n,I=D*Math.PI/2;S=h+e*Math.sin(I),E=e*Math.cos(I),P=e*Math.sin(I),_=u+d+D*u}let k=Math.max(0,Math.min(1,_/m)),W=0;v===0?W=.5/i:v===p&&(W=-.5/i);for(let D=0;D<=i;D++){let I=D/i,G=I*Math.PI*2,N=Math.sin(G),j=Math.cos(G);g.x=-E*j,g.y=S,g.z=E*N,o.push(g.x,g.y,g.z),f.set(-E*j,P,E*N),f.normalize(),c.push(f.x,f.y,f.z),l.push(I+W,k)}if(v>0){let D=(v-1)*y;for(let I=0;I<i;I++){let G=D+I,N=D+I+1,j=v*y+I,X=v*y+I+1;a.push(G,N,j),a.push(N,X,j)}}}this.setIndex(a),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},fi=class r extends dt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new ve;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(o,3)),this.setAttribute("uv",new Oe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Je=class r extends dt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,y=[],f=n/2,g=0;function v(_){let S=p,E=new ve,P=new w,k=0,W=_===!0?e:t,D=_===!0?1:-1;for(let G=1;G<=i;G++)u.push(0,f*D,0),d.push(0,D,0),m.push(.5,.5),p++;let I=p;for(let G=0;G<=i;G++){let N=G/i*c+o,j=Math.cos(N),X=Math.sin(N);P.x=W*X,P.y=f*D,P.z=W*j,u.push(P.x,P.y,P.z),d.push(0,D,0),E.x=.5*j+.5,E.y=.5*X*D+.5,m.push(E.x,E.y),p++}for(let G=0;G<i;G++){let N=S+G,j=I+G;_===!0?h.push(j,j+1,N):h.push(j+1,j,N),k+=3}l.addGroup(g,k,_===!0?1:2),g+=k}(function(){let _=new w,S=new w,E=0,P=(t-e)/n;for(let k=0;k<=s;k++){let W=[],D=k/s,I=D*(t-e)+e;for(let G=0;G<=i;G++){let N=G/i,j=N*c+o,X=Math.sin(j),K=Math.cos(j);S.x=I*X,S.y=-D*n+f,S.z=I*K,u.push(S.x,S.y,S.z),_.set(X,P,K).normalize(),d.push(_.x,_.y,_.z),m.push(N,1-D),W.push(p++)}y.push(W)}for(let k=0;k<i;k++)for(let W=0;W<s;W++){let D=y[W][k],I=y[W+1][k],G=y[W+1][k+1],N=y[W][k+1];(e>0||W!==0)&&(h.push(D,I,N),E+=3),(t>0||W!==s-1)&&(h.push(I,G,N),E+=3)}l.addGroup(g,E,0),g+=E})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ra=class r extends Je{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ai=class r extends dt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,y,f){let g=f+1,v=[];for(let _=0;_<=g;_++){v[_]=[];let S=m.clone().lerp(y,_/g),E=p.clone().lerp(y,_/g),P=g-_;for(let k=0;k<=P;k++)v[_][k]=k===0&&_===g?S:S.clone().lerp(E,k/P)}for(let _=0;_<g;_++)for(let S=0;S<2*(g-_)-1;S++){let E=Math.floor(S/2);S%2==0?(c(v[_][E+1]),c(v[_+1][E]),c(v[_][E])):(c(v[_][E+1]),c(v[_+1][E+1]),c(v[_+1][E]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let y=3*m;p.x=e[y+0],p.y=e[y+1],p.z=e[y+2]}function h(m,p,y,f){f<0&&m.x===1&&(a[p]=m.x-1),y.x===0&&y.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new w,y=new w,f=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],y),l(t[g+2],f),o(p,y,f,m)})(i),(function(m){let p=new w;for(let y=0;y<s.length;y+=3)p.x=s[y+0],p.y=s[y+1],p.z=s[y+2],p.normalize().multiplyScalar(m),s[y+0]=p.x,s[y+1]=p.y,s[y+2]=p.z})(n),(function(){let m=new w;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let y=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(y,1-f)}(function(){let p=new w,y=new w,f=new w,g=new w,v=new ve,_=new ve,S=new ve;for(let E=0,P=0;E<s.length;E+=9,P+=6){p.set(s[E+0],s[E+1],s[E+2]),y.set(s[E+3],s[E+4],s[E+5]),f.set(s[E+6],s[E+7],s[E+8]),v.set(a[P+0],a[P+1]),_.set(a[P+2],a[P+3]),S.set(a[P+4],a[P+5]),g.copy(p).add(y).add(f).divideScalar(3);let k=u(g);h(v,P+0,p,k),h(_,P+2,y,k),h(S,P+4,f,k)}})(),(function(){for(let p=0;p<a.length;p+=6){let y=a[p+0],f=a[p+2],g=a[p+4],v=Math.max(y,f,g),_=Math.min(y,f,g);v>.9&&_<.1&&(y<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Oe(s,3)),this.setAttribute("normal",new Oe(s.slice(),3)),this.setAttribute("uv",new Oe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},sa=class r extends Ai{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},zs=new w,Gs=new w,bo=new w,ks=new hi,aa=class extends dt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(qs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:y,b:f,c:g}=ks;if(y.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),ks.getNormal(bo),u[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let _=(v+1)%3,S=u[v],E=u[_],P=ks[h[v]],k=ks[h[_]],W=`${S}_${E}`,D=`${E}_${S}`;D in d&&d[D]?(bo.dot(d[D].normal)<=s&&(m.push(P.x,P.y,P.z),m.push(k.x,k.y,k.z)),d[D]=null):W in d||(d[W]={index0:l[v],index1:l[_],normal:bo.clone()})}}for(let p in d)if(d[p]){let{index0:y,index1:f}=d[p];zs.fromBufferAttribute(o,y),Gs.fromBufferAttribute(o,f),m.push(zs.x,zs.y,zs.z),m.push(Gs.x,Gs.y,Gs.z)}this.setAttribute("position",new Oe(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ve:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new et;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ot(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(ot(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},fr=class extends wn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ve){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},oa=class extends fr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Il(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Vs=new w,wo=new Il,Eo=new Il,Ao=new Il,Nt=class extends wn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Vs.subVectors(i[0],i[1]).add(i[0]),o=Vs);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Vs.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),y=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);y<1e-4&&(y=1),p<1e-4&&(p=y),f<1e-4&&(f=y),wo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,y,f),Eo.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,y,f),Ao.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,y,f)}else this.curveType==="catmullrom"&&(wo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Eo.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Ao.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(wo.calc(h),Eo.calc(h),Ao.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _c(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function zr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Gr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var es=class extends wn{constructor(e=new ve,t=new ve,n=new ve,i=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ve){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Gr(e,i.x,s.x,a.x,o.x),Gr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},la=class extends wn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Gr(e,i.x,s.x,a.x,o.x),Gr(e,i.y,s.y,a.y,o.y),Gr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ts=class extends wn{constructor(e=new ve,t=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ve){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends wn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ns=class extends wn{constructor(e=new ve,t=new ve,n=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ve){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(zr(e,i.x,s.x,a.x),zr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},is=class extends wn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(zr(e,i.x,s.x,a.x),zr(e,i.y,s.y,a.y),zr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rs=class extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ve){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(_c(o,c.x,l.x,h.x,u.x),_c(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ve().fromArray(i))}return this}},ha=Object.freeze({__proto__:null,ArcCurve:oa,CatmullRomCurve3:Nt,CubicBezierCurve:es,CubicBezierCurve3:la,EllipseCurve:fr,LineCurve:ts,LineCurve3:ca,QuadraticBezierCurve:ns,QuadraticBezierCurve3:is,SplineCurve:rs}),ua=class extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ha[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ha[i.type]().fromJSON(i))}return this}},vn=class extends ua{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ts(this.currentPoint.clone(),new ve(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new ns(this.currentPoint.clone(),new ve(e,t),new ve(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new es(this.currentPoint.clone(),new ve(e,t),new ve(n,i),new ve(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new rs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new fr(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Qt=class extends vn{constructor(e){super(e),this.uuid=br(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new vn().fromJSON(i))}return this}};function bu(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=yc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let y=0,f=u.length;y<f;y++){let g=yc(h,u[y]*m,y<f-1?u[y+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(Lu(g))}p.sort(Ru);for(let y=0;y<p.length;y++)d=Pu(p[y],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return ss(s,a,t,o,c,l,0),a}function yc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=xc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=xc(a/n|0,r[a],r[a+1],s);return s&&gr(s,s.next)&&(os(s),s=s.next),s}function Bi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!gr(n,n.next)&&Gt(n.prev,n,n.next)!==0)n=n.next;else{if(os(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ss(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Fo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,y=1;do{let f,g=m;m=null;let v=null;for(p=0;g;){p++;let _=g,S=0;for(let P=0;P<y&&(S++,_=_.nextZ,_);P++);let E=y;for(;S>0||E>0&&_;)S!==0&&(E===0||!_||g.z<=_.z)?(f=g,g=g.nextZ,S--):(f=_,_=_.nextZ,E--),v?v.nextZ=f:m=f,f.prevZ=v,v=f;g=_}v.nextZ=null,y*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?Eu(r,n,i,s):wu(r))e.push(c.i,r.i,l.i),os(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?ss(r=Au(Bi(r),e),e,t,n,i,s,2):a===2&&Cu(r,e,t,n,i,s):ss(Bi(r),e,t,n,i,s,1);break}}}function wu(r){let e=r.prev,t=r,n=r.next;if(Gt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&Br(i,o,s,c,a,l,p.x,p.y)&&Gt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Eu(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Gt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),y=Math.max(o,c,l),f=Math.max(h,u,d),g=Fo(m,p,e,t,n),v=Fo(y,f,e,t,n),_=r.prevZ,S=r.nextZ;for(;_&&_.z>=g&&S&&S.z<=v;){if(_.x>=m&&_.x<=y&&_.y>=p&&_.y<=f&&_!==i&&_!==a&&Br(o,h,c,u,l,d,_.x,_.y)&&Gt(_.prev,_,_.next)>=0||(_=_.prevZ,S.x>=m&&S.x<=y&&S.y>=p&&S.y<=f&&S!==i&&S!==a&&Br(o,h,c,u,l,d,S.x,S.y)&&Gt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;_&&_.z>=g;){if(_.x>=m&&_.x<=y&&_.y>=p&&_.y<=f&&_!==i&&_!==a&&Br(o,h,c,u,l,d,_.x,_.y)&&Gt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;S&&S.z<=v;){if(S.x>=m&&S.x<=y&&S.y>=p&&S.y<=f&&S!==i&&S!==a&&Br(o,h,c,u,l,d,S.x,S.y)&&Gt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Au(r,e){let t=r;do{let n=t.prev,i=t.next.next;!gr(n,i)&&Th(n,t,t.next,i)&&as(n,i)&&as(i,n)&&(e.push(n.i,t.i,i.i),os(t),os(t.next),t=r=i),t=t.next}while(t!==r);return Bi(t)}function Cu(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Du(a,o)){let c=bh(a,o);return a=Bi(a,a.next),c=Bi(c,c.next),ss(a,e,t,n,i,s,0),void ss(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function Ru(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Pu(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(gr(i,a))return a;do{if(gr(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let y=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(y<=o&&y>h&&(h=y,l=a.x<a.next.x?a:a.next,y===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Sh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let y=Math.abs(c-a.y)/(o-a.x);as(a,i)&&(y<p||y===p&&(a.x>l.x||a.x===l.x&&Iu(l,a)))&&(l=a,p=y)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=bh(t,r);return Bi(n,n.next),Bi(t,t.next)}function Iu(r,e){return Gt(r.prev,r,e.prev)<0&&Gt(e.next,r,r.next)<0}function Fo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Lu(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Sh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Br(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Sh(r,e,t,n,i,s,a,o)}function Du(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Th(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(as(r,e)&&as(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Gt(r.prev,r,e.prev)||Gt(r,e.prev,e))||gr(r,e)&&Gt(r.prev,r,r.next)>0&&Gt(e.prev,e,e.next)>0)}function Gt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function gr(r,e){return r.x===e.x&&r.y===e.y}function Th(r,e,t,n){let i=Ws(Gt(r,e,t)),s=Ws(Gt(r,e,n)),a=Ws(Gt(t,n,r)),o=Ws(Gt(t,n,e));return i!==s&&a!==o||!(i!==0||!Hs(r,t,e))||!(s!==0||!Hs(r,n,e))||!(a!==0||!Hs(t,r,n))||!(o!==0||!Hs(t,e,n))}function Hs(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ws(r){return r>0?1:r<0?-1:0}function as(r,e){return Gt(r.prev,r,r.next)<0?Gt(r,e,r.next)>=0&&Gt(r,r.prev,e)>=0:Gt(r,e,r.prev)<0||Gt(r,r.next,e)<0}function bh(r,e){let t=Oo(r.i,r.x,r.y),n=Oo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function xc(r,e,t,n){let i=Oo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function os(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Oo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Bo=class{static triangulate(e,t,n=2){return bu(e,t,n)}},Kn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Mc(e),Sc(n,e);let a=e.length;t.forEach(Mc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Sc(n,t[c]);let o=Bo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Mc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Sc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var qt=class r extends dt{constructor(e=new Qt([new ve(.5,.5),new ve(-.5,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Uu,_,S,E,P,k,W=!1;g&&(_=g.getSpacedPoints(h),W=!0,d=!1,S=g.computeFrenetFrames(h,!1),E=new w,P=new w,k=new w),d||(f=0,m=0,p=0,y=0);let D=o.extractPoints(l),I=D.shape,G=D.holes;if(!Kn.isClockWise(I)){I=I.reverse();for(let O=0,M=G.length;O<M;O++){let R=G[O];Kn.isClockWise(R)&&(G[O]=R.reverse())}}function N(O){let M=10000000000000001e-36,R=O[0];for(let z=1;z<=O.length;z++){let U=z%O.length,se=O[U],Y=se.x-R.x,J=se.y-R.y,_e=Y*Y+J*J,oe=Math.max(Math.abs(se.x),Math.abs(se.y),Math.abs(R.x),Math.abs(R.y));_e<=M*oe*oe?(O.splice(U,1),z--):R=se}}N(I),G.forEach(N);let j=G.length,X=I;for(let O=0;O<j;O++){let M=G[O];I=I.concat(M)}function K(O,M,R){return M||console.error("THREE.ExtrudeGeometry: vec does not exist"),O.clone().addScaledVector(M,R)}let te=I.length;function ue(O,M,R){let z,U,se,Y=O.x-M.x,J=O.y-M.y,_e=R.x-O.x,oe=R.y-O.y,he=Y*Y+J*J,Se=Y*oe-J*_e;if(Math.abs(Se)>Number.EPSILON){let Ae=Math.sqrt(he),Ue=Math.sqrt(_e*_e+oe*oe),We=M.x-J/Ae,Ne=M.y+Y/Ae,$e=((R.x-oe/Ue-We)*oe-(R.y+_e/Ue-Ne)*_e)/(Y*oe-J*_e);z=We+Y*$e-O.x,U=Ne+J*$e-O.y;let Ie=z*z+U*U;if(Ie<=2)return new ve(z,U);se=Math.sqrt(Ie/2)}else{let Ae=!1;Y>Number.EPSILON?_e>Number.EPSILON&&(Ae=!0):Y<-Number.EPSILON?_e<-Number.EPSILON&&(Ae=!0):Math.sign(J)===Math.sign(oe)&&(Ae=!0),Ae?(z=-J,U=Y,se=Math.sqrt(he)):(z=Y,U=J,se=Math.sqrt(he/2))}return new ve(z/se,U/se)}let le=[];for(let O=0,M=X.length,R=M-1,z=O+1;O<M;O++,R++,z++)R===M&&(R=0),z===M&&(z=0),le[O]=ue(X[O],X[R],X[z]);let Te=[],ne,me,Pe=le.concat();for(let O=0,M=j;O<M;O++){let R=G[O];ne=[];for(let z=0,U=R.length,se=U-1,Y=z+1;z<U;z++,se++,Y++)se===U&&(se=0),Y===U&&(Y=0),ne[z]=ue(R[z],R[se],R[Y]);Te.push(ne),Pe=Pe.concat(ne)}if(f===0)me=Kn.triangulateShape(X,G);else{let O=[],M=[];for(let R=0;R<f;R++){let z=R/f,U=m*Math.cos(z*Math.PI/2),se=p*Math.sin(z*Math.PI/2)+y;for(let Y=0,J=X.length;Y<J;Y++){let _e=K(X[Y],le[Y],se);q(_e.x,_e.y,-U),z===0&&O.push(_e)}for(let Y=0,J=j;Y<J;Y++){let _e=G[Y];ne=Te[Y];let oe=[];for(let he=0,Se=_e.length;he<Se;he++){let Ae=K(_e[he],ne[he],se);q(Ae.x,Ae.y,-U),z===0&&oe.push(Ae)}z===0&&M.push(oe)}}me=Kn.triangulateShape(O,M)}let de=me.length,Me=p+y;for(let O=0;O<te;O++){let M=d?K(I[O],Pe[O],Me):I[O];W?(P.copy(S.normals[0]).multiplyScalar(M.x),E.copy(S.binormals[0]).multiplyScalar(M.y),k.copy(_[0]).add(P).add(E),q(k.x,k.y,k.z)):q(M.x,M.y,0)}for(let O=1;O<=h;O++)for(let M=0;M<te;M++){let R=d?K(I[M],Pe[M],Me):I[M];W?(P.copy(S.normals[O]).multiplyScalar(R.x),E.copy(S.binormals[O]).multiplyScalar(R.y),k.copy(_[O]).add(P).add(E),q(k.x,k.y,k.z)):q(R.x,R.y,u/h*O)}for(let O=f-1;O>=0;O--){let M=O/f,R=m*Math.cos(M*Math.PI/2),z=p*Math.sin(M*Math.PI/2)+y;for(let U=0,se=X.length;U<se;U++){let Y=K(X[U],le[U],z);q(Y.x,Y.y,u+R)}for(let U=0,se=G.length;U<se;U++){let Y=G[U];ne=Te[U];for(let J=0,_e=Y.length;J<_e;J++){let oe=K(Y[J],ne[J],z);W?q(oe.x,oe.y+_[h-1].y,_[h-1].x+R):q(oe.x,oe.y,u+R)}}}function fe(O,M){let R=O.length;for(;--R>=0;){let z=R,U=R-1;U<0&&(U=O.length-1);for(let se=0,Y=h+2*f;se<Y;se++){let J=te*se,_e=te*(se+1);A(M+z+J,M+U+J,M+U+_e,M+z+_e)}}}function q(O,M,R){c.push(O),c.push(M),c.push(R)}function we(O,M,R){b(O),b(M),b(R);let z=i.length/3,U=v.generateTopUV(n,i,z-3,z-2,z-1);H(U[0]),H(U[1]),H(U[2])}function A(O,M,R,z){b(O),b(M),b(z),b(M),b(R),b(z);let U=i.length/3,se=v.generateSideWallUV(n,i,U-6,U-3,U-2,U-1);H(se[0]),H(se[1]),H(se[3]),H(se[1]),H(se[2]),H(se[3])}function b(O){i.push(c[3*O+0]),i.push(c[3*O+1]),i.push(c[3*O+2])}function H(O){s.push(O.x),s.push(O.y)}(function(){let O=i.length/3;if(d){let M=0,R=te*M;for(let z=0;z<de;z++){let U=me[z];we(U[2]+R,U[1]+R,U[0]+R)}M=h+2*f,R=te*M;for(let z=0;z<de;z++){let U=me[z];we(U[0]+R,U[1]+R,U[2]+R)}}else{for(let M=0;M<de;M++){let R=me[M];we(R[2],R[1],R[0])}for(let M=0;M<de;M++){let R=me[M];we(R[0]+te*h,R[1]+te*h,R[2]+te*h)}}n.addGroup(O,i.length/3-O,0)})(),(function(){let O=i.length/3,M=0;fe(X,M),M+=X.length;for(let R=0,z=G.length;R<z;R++){let U=G[R];fe(U,M),M+=U.length}n.addGroup(O,i.length/3-O,1)})()}this.setAttribute("position",new Oe(i,3)),this.setAttribute("uv",new Oe(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ha[i.type]().fromJSON(i)),new r(n,e.options)}},Uu={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ve(s,a),new ve(o,c),new ve(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],y=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ve(a,1-c),new ve(l,1-u),new ve(d,1-p),new ve(y,1-g)]:[new ve(o,1-c),new ve(h,1-u),new ve(m,1-p),new ve(f,1-g)]}},da=class r extends Ai{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},zi=class r extends dt{constructor(e=[new ve(0,-.5),new ve(.5,0),new ve(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ot(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new ve,m=new w,p=new w,y=new w,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,y.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(y.x,y.y,y.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),c.push(m.x,m.y,m.z),y.copy(p)}for(let v=0;v<=t;v++){let _=n+v*h*i,S=Math.sin(_),E=Math.cos(_);for(let P=0;P<=e.length-1;P++){u.x=e[P].x*S,u.y=e[P].y,u.z=e[P].x*E,a.push(u.x,u.y,u.z),d.x=v/t,d.y=P/(e.length-1),o.push(d.x,d.y);let k=c[3*P+0]*S,W=c[3*P+1],D=c[3*P+0]*E;l.push(k,W,D)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){let S=_+v*e.length,E=S,P=S+e.length,k=S+e.length+1,W=S+1;s.push(E,P,W),s.push(k,W,P)}this.setIndex(s),this.setAttribute("position",new Oe(a,3)),this.setAttribute("uv",new Oe(o,2)),this.setAttribute("normal",new Oe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},pa=class r extends Ai{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Wt=class r extends dt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],y=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let _=0;_<l;_++){let S=_*u-s;p.push(S,-v,0),y.push(0,0,1),f.push(_/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let _=v+l*g,S=v+l*(g+1),E=v+1+l*(g+1),P=v+1+l*g;m.push(_,S,P),m.push(S,E,P)}this.setIndex(m),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(y,3)),this.setAttribute("uv",new Oe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},ma=class r extends dt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new w,p=new ve;for(let y=0;y<=i;y++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let y=0;y<i;y++){let f=y*(n+1);for(let g=0;g<n;g++){let v=g+f,_=v,S=v+n+1,E=v+n+2,P=v+1;o.push(_,S,P),o.push(S,E,P)}}this.setIndex(o),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Gi=class r extends dt{constructor(e=new Qt([new ve(0,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;Kn.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let v=p[f];Kn.isClockWise(v)===!0&&(p[f]=v.reverse())}let y=Kn.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let v=p[f];m=m.concat(v)}for(let f=0,g=m.length;f<g;f++){let v=m[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=y.length;f<g;f++){let v=y[f],_=v[0]+u,S=v[1]+u,E=v[2]+u;n.push(_,S,E),c+=3}}this.setIndex(n),this.setAttribute("position",new Oe(i,3)),this.setAttribute("normal",new Oe(s,3)),this.setAttribute("uv",new Oe(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},tn=class r extends dt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,m=[],p=[],y=[],f=[];for(let g=0;g<=n;g++){let v=[],_=g/n,S=0;g===0&&a===0?S=.5/t:g===n&&c===Math.PI&&(S=-.5/t);for(let E=0;E<=t;E++){let P=E/t;u.x=-e*Math.cos(i+P*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+P*s)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),f.push(P+S,1-_),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let _=h[g][v+1],S=h[g][v],E=h[g+1][v],P=h[g+1][v+1];(g!==0||a>0)&&m.push(_,S,P),(g!==n-1||c<Math.PI)&&m.push(S,E,P)}this.setIndex(m),this.setAttribute("position",new Oe(p,3)),this.setAttribute("normal",new Oe(y,3)),this.setAttribute("uv",new Oe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},fa=class r extends Ai{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},It=class r extends dt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let y=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(y),u.y=(e+t*Math.cos(f))*Math.sin(y),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let y=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,v=(i+1)*m+p;a.push(y,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},ga=class r extends dt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,m=new w,p=new w,y=new w,f=new w,g=new w;for(let _=0;_<=n;++_){let S=_/n*s*Math.PI*2;v(S,s,a,e,m),v(S+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),y.crossVectors(f,g),g.crossVectors(y,f),y.normalize(),g.normalize();for(let E=0;E<=i;++E){let P=E/i*Math.PI*2,k=-t*Math.cos(P),W=t*Math.sin(P);u.x=m.x+(k*g.x+W*y.x),u.y=m.y+(k*g.y+W*y.y),u.z=m.z+(k*g.z+W*y.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(_/n),h.push(E/i)}}for(let _=1;_<=n;_++)for(let S=1;S<=i;S++){let E=(i+1)*(_-1)+(S-1),P=(i+1)*_+(S-1),k=(i+1)*_+S,W=(i+1)*(_-1)+S;o.push(E,P,W),o.push(P,k,W)}function v(_,S,E,P,k){let W=Math.cos(_),D=Math.sin(_),I=E/S*_,G=Math.cos(I);k.x=P*(2+G)*.5*W,k.y=P*(2+G)*D*.5,k.z=P*Math.sin(I)*.5}this.setIndex(o),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Ut=class r extends dt{constructor(e=new is(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new ve,h=new w,u=[],d=[],m=[],p=[];function y(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let _=0;_<=i;_++){let S=_/i*Math.PI*2,E=Math.sin(S),P=-Math.cos(S);c.x=P*g.x+E*v.x,c.y=P*g.y+E*v.y,c.z=P*g.z+E*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)y(f);y(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),_=(i+1)*f+(g-1),S=(i+1)*f+g,E=(i+1)*(f-1)+g;p.push(v,_,E),p.push(_,S,E)}})()})(),this.setIndex(p),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},va=class extends dt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let y=0;y<3;y++){let f=o.getX(m+y),g=o.getX(m+(y+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Tc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Tc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Oe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Tc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var mm=Object.freeze({__proto__:null,BoxGeometry:_t,CapsuleGeometry:mr,CircleGeometry:fi,ConeGeometry:ra,CylinderGeometry:Je,DodecahedronGeometry:sa,EdgesGeometry:aa,ExtrudeGeometry:qt,IcosahedronGeometry:da,LatheGeometry:zi,OctahedronGeometry:pa,PlaneGeometry:Wt,PolyhedronGeometry:Ai,RingGeometry:ma,ShapeGeometry:Gi,SphereGeometry:tn,TetrahedronGeometry:fa,TorusGeometry:It,TorusKnotGeometry:ga,TubeGeometry:Ut,WireframeGeometry:va}),ls=class extends mi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Nn=class extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},En=class extends Nn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var _a=class extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ya=class extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Xs(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Nu(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ki=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xa=class extends ki{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Io,endingEnd:Io}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Lo:s=e,o=2*t-n;break;case Do:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Lo:a=e,c=2*n-t;break;case Do:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),y=p*p,f=y*p,g=-d*f+2*d*y-d*p,v=(1+d)*f+(-1.5-2*d)*y+(-.5+d)*p+1,_=(-1-m)*f+(1.5+m)*y+.5*p,S=m*f-m*y;for(let E=0;E!==o;++E)s[E]=g*a[h+E]+v*a[l+E]+_*a[c+E]+S*a[u+E];return s}},Ma=class extends ki{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Sa=class extends ki{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Tn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xs(t,this.TimeBufferType),this.values=Xs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xs(e.times,Array),values:Xs(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case Zs:t=this.InterpolantFactoryMethodLinear;break;case js:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return Zs;case this.InterpolantFactoryMethodSmooth:return js}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Nu(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===js,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Tn.prototype.ValueTypeName="",Tn.prototype.TimeBufferType=Float32Array,Tn.prototype.ValueBufferType=Float32Array,Tn.prototype.DefaultInterpolation=Zs;var bi=class extends Tn{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="bool",bi.prototype.ValueBufferType=Array,bi.prototype.DefaultInterpolation=kr,bi.prototype.InterpolantFactoryMethodLinear=void 0,bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends Tn{constructor(e,t,n,i){super(e,t,n,i)}};Ta.prototype.ValueTypeName="color";var ba=class extends Tn{constructor(e,t,n,i){super(e,t,n,i)}};ba.prototype.ValueTypeName="number";var wa=class extends ki{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)bn.slerpFlat(s,0,a,l-o,a,l,c);return s}},cs=class extends Tn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new wa(this.times,this.values,this.getValueSize(),e)}};cs.prototype.ValueTypeName="quaternion",cs.prototype.InterpolantFactoryMethodSmooth=void 0;var wi=class extends Tn{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="string",wi.prototype.ValueBufferType=Array,wi.prototype.DefaultInterpolation=kr,wi.prototype.InterpolantFactoryMethodLinear=void 0,wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends Tn{constructor(e,t,n,i){super(e,t,n,i)}};Ea.prototype.ValueTypeName="vector";var Aa=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},wh=new Aa,Ca=class{constructor(e){this.manager=e!==void 0?e:wh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ca.DEFAULT_MATERIAL_NAME="__DEFAULT";var vr=class extends ln{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Vn=class extends vr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Co=new et,bc=new w,wc=new w,Ra=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.mapType=ni,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ei,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(bc),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),Co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Co)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ec=new et,Or=new w,Ro=new w,zo=class extends Ra{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new vt(2,1,1,1),new vt(0,1,1,1),new vt(3,1,1,1),new vt(1,1,1,1),new vt(3,0,1,1),new vt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Or.setFromMatrixPosition(e.matrixWorld),n.position.copy(Or),Ro.copy(n.position),Ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ro),n.updateMatrixWorld(),i.makeTranslation(-Or.x,-Or.y,-Or.z),Ec.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec,n.coordinateSystem,n.reversedDepth)}},_r=class extends vr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},gi=class extends dr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Go=class extends Ra{constructor(){super(new gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hn=class extends vr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new Go}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var fm=new et,gm=new et,vm=new et;var Pa=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var _m=new w,ym=new bn,xm=new w,Mm=new w,Sm=new w;var Tm=new w,bm=new bn,wm=new w,Em=new w;var Ll="\\[\\]\\.:\\/",Fu=new RegExp("["+Ll+"]","g"),Po="[^"+Ll+"]",Ou="[^"+Ll.replace("\\.","")+"]",Bu=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Po)+/(WCOD+)?/.source.replace("WCOD",Ou)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Po)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Po)+"$"),zu=["material","materials","bones","map"],Dt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fu,"")}static parseTrackName(e){let t=Bu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);zu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Dt.Composite=class{constructor(r,e,t){let n=t||Dt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Dt.prototype.GetterByBindingType=[Dt.prototype._getValue_direct,Dt.prototype._getValue_array,Dt.prototype._getValue_arrayElement,Dt.prototype._getValue_toArray],Dt.prototype.SetterByBindingTypeAndVersioning=[[Dt.prototype._setValue_direct,Dt.prototype._setValue_direct_setNeedsUpdate,Dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_array,Dt.prototype._setValue_array_setNeedsUpdate,Dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_arrayElement,Dt.prototype._setValue_arrayElement_setNeedsUpdate,Dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_fromArray,Dt.prototype._setValue_fromArray_setNeedsUpdate,Dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Am=new Float32Array(1);var Cm=new et;var Rm=new ve;var Pm=new w,Im=new w,Lm=new w,Dm=new w,Um=new w,Nm=new w,Fm=new w;var Om=new w;var Bm=new w,zm=new et,Gm=new et;var km=new w,Vm=new Ye,Hm=new Ye;var Wm=new w,Xm=new w,jm=new w;var qm=new w,Ym=new dr;var Zm=new Ln;var Jm=new w;function Dl(r,e,t,n){let i=(function(s){switch(s){case ni:case qo:return{byteLength:1,components:1};case Sr:case Yo:case Ri:return{byteLength:2,components:1};case Ha:case Wa:return{byteLength:2,components:4};case Wi:case Va:case Wn:return{byteLength:4,components:1};case Zo:case Jo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Xa:case ja:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Xn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Zh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function ku(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var at={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Re={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},ii={basic:{uniforms:hn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:hn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ye(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:hn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:hn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:hn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Ye(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:hn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:hn([Re.points,Re.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:hn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:hn([Re.common,Re.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:hn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:hn([Re.sprite,Re.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:hn([Re.common,Re.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:hn([Re.lights,Re.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};ii.physical={uniforms:hn([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};var Ka={r:0,b:0,g:0},qi=new kn,Vu=new et;function Hu(r,e,t,n,i,s,a){let o=new Ye(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function y(f,g){f.getRGB(Ka,Pl(r)),n.buffers.color.setClear(Ka.r,Ka.g,Ka.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,y(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,y(o,h)},render:function(f){let g=!1,v=p(f);v===null?y(o,h):v&&v.isColor&&(y(v,1),g=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=p(g);v&&(v.isCubeTexture||v.mapping===ds)?(l===void 0&&(l=new gt(new _t(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:ji(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),qi.copy(g.backgroundRotation),qi.x*=-1,qi.y*=-1,qi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vu.makeRotationFromEuler(qi)),l.material.toneMapped=pt.getTransfer(v.colorSpace)!==xt,u===v&&d===v.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new gt(new Wt(2,2),new cn({name:"BackgroundMaterial",uniforms:ji(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:yr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=pt.getTransfer(v.colorSpace)!==xt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Wu(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],_=[],S=[];for(let E=0;E<t;E++)v[E]=0,_[E]=0,S[E]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:_,attributeDivisors:S,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,_=g.length;v<_;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let _=s.newAttributes,S=s.enabledAttributes,E=s.attributeDivisors;_[g]=1,S[g]===0&&(r.enableVertexAttribArray(g),S[g]=1),E[g]!==v&&(r.vertexAttribDivisor(g,v),E[g]=v)}function m(){let g=s.newAttributes,v=s.enabledAttributes;for(let _=0,S=v.length;_<S;_++)v[_]!==g[_]&&(r.disableVertexAttribArray(_),v[_]=0)}function p(g,v,_,S,E,P,k){k===!0?r.vertexAttribIPointer(g,v,_,E,P):r.vertexAttribPointer(g,v,_,S,E,P)}function y(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,_,S,E){let P=!1,k=(function(W,D,I){let G=I.wireframe===!0,N=n[W.id];N===void 0&&(N={},n[W.id]=N);let j=N[D.id];j===void 0&&(j={},N[D.id]=j);let X=j[G];return X===void 0&&(X=l(r.createVertexArray()),j[G]=X),X})(S,_,v);s!==k&&(s=k,o(s.object)),P=(function(W,D,I,G){let N=s.attributes,j=D.attributes,X=0,K=I.getAttributes();for(let te in K)if(K[te].location>=0){let ue=N[te],le=j[te];if(le===void 0&&(te==="instanceMatrix"&&W.instanceMatrix&&(le=W.instanceMatrix),te==="instanceColor"&&W.instanceColor&&(le=W.instanceColor)),ue===void 0||ue.attribute!==le||le&&ue.data!==le.data)return!0;X++}return s.attributesNum!==X||s.index!==G})(g,S,_,E),P&&(function(W,D,I,G){let N={},j=D.attributes,X=0,K=I.getAttributes();for(let te in K)if(K[te].location>=0){let ue=j[te];ue===void 0&&(te==="instanceMatrix"&&W.instanceMatrix&&(ue=W.instanceMatrix),te==="instanceColor"&&W.instanceColor&&(ue=W.instanceColor));let le={};le.attribute=ue,ue&&ue.data&&(le.data=ue.data),N[te]=le,X++}s.attributes=N,s.attributesNum=X,s.index=G})(g,S,_,E),E!==null&&e.update(E,r.ELEMENT_ARRAY_BUFFER),(P||a)&&(a=!1,(function(W,D,I,G){h();let N=G.attributes,j=I.getAttributes(),X=D.defaultAttributeValues;for(let K in j){let te=j[K];if(te.location>=0){let ue=N[K];if(ue===void 0&&(K==="instanceMatrix"&&W.instanceMatrix&&(ue=W.instanceMatrix),K==="instanceColor"&&W.instanceColor&&(ue=W.instanceColor)),ue!==void 0){let le=ue.normalized,Te=ue.itemSize,ne=e.get(ue);if(ne===void 0)continue;let me=ne.buffer,Pe=ne.type,de=ne.bytesPerElement,Me=Pe===r.INT||Pe===r.UNSIGNED_INT||ue.gpuType===Va;if(ue.isInterleavedBufferAttribute){let fe=ue.data,q=fe.stride,we=ue.offset;if(fe.isInstancedInterleavedBuffer){for(let A=0;A<te.locationSize;A++)d(te.location+A,fe.meshPerAttribute);W.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let A=0;A<te.locationSize;A++)u(te.location+A);r.bindBuffer(r.ARRAY_BUFFER,me);for(let A=0;A<te.locationSize;A++)p(te.location+A,Te/te.locationSize,Pe,le,q*de,(we+Te/te.locationSize*A)*de,Me)}else{if(ue.isInstancedBufferAttribute){for(let fe=0;fe<te.locationSize;fe++)d(te.location+fe,ue.meshPerAttribute);W.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let fe=0;fe<te.locationSize;fe++)u(te.location+fe);r.bindBuffer(r.ARRAY_BUFFER,me);for(let fe=0;fe<te.locationSize;fe++)p(te.location+fe,Te/te.locationSize,Pe,le,Te*de,Te/te.locationSize*fe*de,Me)}}else if(X!==void 0){let le=X[K];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(te.location,le);break;case 3:r.vertexAttrib3fv(te.location,le);break;case 4:r.vertexAttrib4fv(te.location,le);break;default:r.vertexAttrib1fv(te.location,le)}}}}m()})(g,v,_,S),E!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(E).buffer))},reset:y,resetDefaultState:f,dispose:function(){y();for(let g in n){let v=n[g];for(let _ in v){let S=v[_];for(let E in S)c(S[E].object),delete S[E];delete v[_]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let _ in v){let S=v[_];for(let E in S)c(S[E].object),delete S[E];delete v[_]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let _=n[v];if(_[g.id]===void 0)continue;let S=_[g.id];for(let E in S)c(S[E].object),delete S[E];delete _[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Xu(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function ju(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Xn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==ni&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Wn&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function qu(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Jn,o=new rt,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,y=null;if(p!==0){if(y=c.value,m!==!0||y===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(y===null||y.length<f)&&(y=new Float32Array(f));for(let v=0,_=d;v!==p;++v,_+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(y,_),y[_+3]=a.constant}c.value=y,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,y}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,y=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!y)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,_=f.clippingState||null;c.value=_,_=l(m,u,v,d);for(let S=0;S!==v;++S)_[S]=t[S];f.clippingState=_,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function Yu(r){let e=new WeakMap;function t(i,s){return s===za?i.mapping=Mr:s===Ga&&(i.mapping=Vi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===za||s===Ga){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new ta(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Eh=[.125,.215,.35,.446,.526,.582],gs=20,Ul=new gi,Ah=new Ye,Nl=null,Fl=0,Ol=0,Bl=!1,Zi=(1+Math.sqrt(5))/2,wr=1/Zi,Ch=[new w(-Zi,wr,0),new w(Zi,wr,0),new w(-wr,0,Zi),new w(wr,0,Zi),new w(0,Zi,-wr),new w(0,Zi,wr),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Zu=new w,Ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Zu}=s;Nl=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),Bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nl,Fl,Ol),this._renderer.xr.enabled=Bl,e.scissorTest=!1,$a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Mr||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nl=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),Bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qn,minFilter:Qn,generateMipmaps:!1,type:Ri,format:Xn,colorSpace:Fi,depthBuffer:!1},i=Rh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Eh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=Eh[d-a+4-1]:d===0&&(p=0),l.push(p);let y=1/(m-2),f=-y,g=1+y,v=[f,f,g,f,g,g,f,f,g,g,f,g],_=6,S=6,E=3,P=2,k=1,W=new Float32Array(E*S*_),D=new Float32Array(P*S*_),I=new Float32Array(k*S*_);for(let N=0;N<_;N++){let j=N%3*2/3-1,X=N>2?0:-1,K=[j,X,0,j+2/3,X,0,j+2/3,X+1,0,j,X,0,j+2/3,X+1,0,j,X+1,0];W.set(K,E*S*N),D.set(v,P*S*N);let te=[N,N,N,N,N,N];I.set(te,k*S*N)}let G=new dt;G.setAttribute("position",new gn(W,E)),G.setAttribute("uv",new gn(D,P)),G.setAttribute("faceIndex",new gn(I,k)),o.push(G),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(gs),h=new w(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,Ul)}_sceneToCubeUV(e,t,n,i,s){let a=new zt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Ah),l.toneMapping=vi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new Un({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1}),m=new gt(new _t,d),p=!1,y=e.background;y?y.isColor&&(d.color.copy(y),e.background=null,p=!0):(d.color.copy(Ah),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;$a(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Mr||e.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new gt(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;$a(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Ul)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ch[(i-s-1)%Ch.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new gt(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,y=isFinite(s)?1+Math.floor(3*p):gs;y>gs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`);let f=[],g=0;for(let S=0;S<gs;++S){let E=S/p,P=Math.exp(-E*E/2);f.push(P),S===0?g+=P:S<y&&(g+=2*P)}for(let S=0;S<f.length;S++)f[S]=f[S]/g;u.envMap.value=e.texture,u.samples.value=y,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let _=this._sizeLods[i];$a(t,3*_*(i>v-4?i-v+4:0),4*(this._cubeSize-_),3*_,2*_),c.setRenderTarget(t),c.render(h,Ul)}};function Rh(r,e,t){let n=new In(r,e,t);return n.texture.mapping=ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $a(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Ph(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Ih(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Yl(){return`

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
	`}function Ju(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===za||s===Ga,o=s===Mr||s===Vi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Ar(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new Ar(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Ku(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&hr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $u(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let y=h.array;d=h.version;for(let f=0,g=y.length;f<g;f+=3){let v=y[f+0],_=y[f+1],S=y[f+2];l.push(v,_,_,S,S,v)}}else{if(u===void 0)return;{let y=u.array;d=u.version;for(let f=0,g=y.length/3-1;f<g;f+=3){let v=f+0,_=f+1,S=f+2;l.push(v,_,_,S,S,v)}}}let m=new(Rl(l)?Yr:qr)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Qu(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function ed(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function td(r,e,t){let n=new WeakMap,i=new vt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let W=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",W)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,y=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),p===!0&&(v=3);let _=a.attributes.position.count*v,S=1;_>e.maxTextureSize&&(S=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*S*4*h),P=new Xr(E,_,S,h);P.type=Wn,P.needsUpdate=!0;let k=4*v;for(let D=0;D<h;D++){let I=y[D],G=f[D],N=g[D],j=_*S*4*D;for(let X=0;X<I.count;X++){let K=X*k;d===!0&&(i.fromBufferAttribute(I,X),E[j+K+0]=i.x,E[j+K+1]=i.y,E[j+K+2]=i.z,E[j+K+3]=0),m===!0&&(i.fromBufferAttribute(G,X),E[j+K+4]=i.x,E[j+K+5]=i.y,E[j+K+6]=i.z,E[j+K+7]=0),p===!0&&(i.fromBufferAttribute(N,X),E[j+K+8]=i.x,E[j+K+9]=i.y,E[j+K+10]=i.z,E[j+K+11]=N.itemSize===4?i.w:1)}}u={count:h,texture:P,size:new ve(_,S)},n.set(a,u),a.addEventListener("dispose",W)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function nd(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Jh=new dn,Lh=new $r(1,1),Kh=new Xr,$h=new Qs,Qh=new Zr,Dh=[],Uh=[],Nh=new Float32Array(16),Fh=new Float32Array(9),Oh=new Float32Array(4);function Cr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Dh[i];if(s===void 0&&(s=new Float32Array(i),Dh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Yt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function eo(r,e){let t=Uh[e];t===void 0&&(t=new Int32Array(e),Uh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function id(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function rd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function sd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function ad(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function od(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;Oh.set(n),r.uniformMatrix2fv(this.addr,!1,Oh),Zt(t,n)}}function ld(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;Fh.set(n),r.uniformMatrix3fv(this.addr,!1,Fh),Zt(t,n)}}function cd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;Nh.set(n),r.uniformMatrix4fv(this.addr,!1,Nh),Zt(t,n)}}function hd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function ud(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function dd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function pd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function md(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function fd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function gd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function vd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function _d(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Lh.compareFunction=Al,s=Lh):s=Jh,t.setTexture2D(e||s,i)}function yd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$h,i)}function xd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Qh,i)}function Md(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kh,i)}function Sd(r,e){r.uniform1fv(this.addr,e)}function Td(r,e){let t=Cr(e,this.size,2);r.uniform2fv(this.addr,t)}function bd(r,e){let t=Cr(e,this.size,3);r.uniform3fv(this.addr,t)}function wd(r,e){let t=Cr(e,this.size,4);r.uniform4fv(this.addr,t)}function Ed(r,e){let t=Cr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Ad(r,e){let t=Cr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Cd(r,e){let t=Cr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Rd(r,e){r.uniform1iv(this.addr,e)}function Pd(r,e){r.uniform2iv(this.addr,e)}function Id(r,e){r.uniform3iv(this.addr,e)}function Ld(r,e){r.uniform4iv(this.addr,e)}function Dd(r,e){r.uniform1uiv(this.addr,e)}function Ud(r,e){r.uniform2uiv(this.addr,e)}function Nd(r,e){r.uniform3uiv(this.addr,e)}function Fd(r,e){r.uniform4uiv(this.addr,e)}function Od(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Jh,s[a])}function Bd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||$h,s[a])}function zd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Qh,s[a])}function Gd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Kh,s[a])}var Gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return id;case 35664:return rd;case 35665:return sd;case 35666:return ad;case 35674:return od;case 35675:return ld;case 35676:return cd;case 5124:case 35670:return hd;case 35667:case 35671:return ud;case 35668:case 35672:return dd;case 35669:case 35673:return pd;case 5125:return md;case 36294:return fd;case 36295:return gd;case 36296:return vd;case 35678:case 36198:case 36298:case 36306:case 35682:return _d;case 35679:case 36299:case 36307:return yd;case 35680:case 36300:case 36308:case 36293:return xd;case 36289:case 36303:case 36311:case 36292:return Md}})(t.type)}},kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Sd;case 35664:return Td;case 35665:return bd;case 35666:return wd;case 35674:return Ed;case 35675:return Ad;case 35676:return Cd;case 5124:case 35670:return Rd;case 35667:case 35671:return Pd;case 35668:case 35672:return Id;case 35669:case 35673:return Ld;case 5125:return Dd;case 36294:return Ud;case 36295:return Nd;case 36296:return Fd;case 35678:case 36198:case 36298:case 36306:case 35682:return Od;case 35679:case 36299:case 36307:return Bd;case 35680:case 36300:case 36308:case 36293:return zd;case 36289:case 36303:case 36311:case 36292:return Gd}})(t.type)}},Vl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},zl=/(\w+)(\])?(\[|\.)?/g;function Bh(r,e){r.seq.push(e),r.map[e.id]=e}function kd(r,e,t){let n=r.name,i=n.length;for(zl.lastIndex=0;;){let s=zl.exec(n),a=zl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){Bh(t,l===void 0?new Gl(o,r,e):new kl(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Vl(o),Bh(t,h)),t=h}}}var Er=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);kd(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function zh(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Vd=0,Gh=new rt;function kh(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Hd(r,e){let t=(function(n){pt._getMatrix(Gh,pt.workingColorSpace,n);let i=`mat3( ${Gh.elements.map(s=>s.toFixed(4))} )`;switch(pt.getTransfer(n)){case Vr:return[i,"LinearTransferOETF"];case xt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Wd(r,e){let t;switch(e){case $c:t="Linear";break;case Qc:t="Reinhard";break;case eh:t="Cineon";break;case ti:t="ACESFilmic";break;case nh:t="AgX";break;case ih:t="Neutral";break;case th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Qa=new w;function Xd(){return pt.getLuminanceCoefficients(Qa),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Qa.x.toFixed(4)}, ${Qa.y.toFixed(4)}, ${Qa.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vs(r){return r!==""}function Vh(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var jd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(r){return r.replace(jd,Yd)}var qd=new Map;function Yd(r,e){let t=at[e];if(t===void 0){let n=qd.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=at[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Hl(t)}var Zd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wh(r){return r.replace(Zd,Jd)}function Jd(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Xh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Kd(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(G){let N="SHADOWMAP_TYPE_BASIC";return G.shadowMapType===Vo?N="SHADOWMAP_TYPE_PCF":G.shadowMapType===Ia?N="SHADOWMAP_TYPE_PCF_SOFT":G.shadowMapType===ei&&(N="SHADOWMAP_TYPE_VSM"),N})(t),l=(function(G){let N="ENVMAP_TYPE_CUBE";if(G.envMap)switch(G.envMapMode){case Mr:case Vi:N="ENVMAP_TYPE_CUBE";break;case ds:N="ENVMAP_TYPE_CUBE_UV"}return N})(t),h=(function(G){let N="ENVMAP_MODE_REFLECTION";return G.envMap&&G.envMapMode===Vi&&(N="ENVMAP_MODE_REFRACTION"),N})(t),u=(function(G){let N="ENVMAP_BLENDING_NONE";if(G.envMap)switch(G.combine){case Zc:N="ENVMAP_BLENDING_MULTIPLY";break;case Jc:N="ENVMAP_BLENDING_MIX";break;case Kc:N="ENVMAP_BLENDING_ADD"}return N})(t),d=(function(G){let N=G.envMapCubeUVHeight;if(N===null)return null;let j=Math.log2(N)-2,X=1/N;return{texelWidth:1/(3*Math.max(Math.pow(2,j),112)),texelHeight:X,maxMip:j}})(t),m=(function(G){return[G.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",G.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vs).join(`
`)})(t),p=(function(G){let N=[];for(let j in G){let X=G[j];X!==!1&&N.push("#define "+j+" "+X)}return N.join(`
`)})(s),y=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(vs).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(vs).join(`
`),g.length>0&&(g+=`
`)):(f=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vs).join(`
`),g=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vi?"#define TONE_MAPPING":"",t.toneMapping!==vi?at.tonemapping_pars_fragment:"",t.toneMapping!==vi?Wd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,Hd("linearToOutputTexel",t.outputColorSpace),Xd(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vs).join(`
`)),a=Hl(a),a=Vh(a,t),a=Hh(a,t),o=Hl(o),o=Vh(o,t),o=Hh(o,t),a=Wh(a),o=Wh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=v+f+a,S=v+g+o,E=zh(i,i.VERTEX_SHADER,_),P=zh(i,i.FRAGMENT_SHADER,S);function k(G){if(r.debug.checkShaderErrors){let N=i.getProgramInfoLog(y)||"",j=i.getShaderInfoLog(E)||"",X=i.getShaderInfoLog(P)||"",K=N.trim(),te=j.trim(),ue=X.trim(),le=!0,Te=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,E,P);else{let ne=kh(i,E,"vertex"),me=kh(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+K+`
`+ne+`
`+me)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):te!==""&&ue!==""||(Te=!1);Te&&(G.diagnostics={runnable:le,programLog:K,vertexShader:{log:te,prefix:f},fragmentShader:{log:ue,prefix:g}})}i.deleteShader(E),i.deleteShader(P),W=new Er(i,y),D=(function(N,j){let X={},K=N.getProgramParameter(j,N.ACTIVE_ATTRIBUTES);for(let te=0;te<K;te++){let ue=N.getActiveAttrib(j,te),le=ue.name,Te=1;ue.type===N.FLOAT_MAT2&&(Te=2),ue.type===N.FLOAT_MAT3&&(Te=3),ue.type===N.FLOAT_MAT4&&(Te=4),X[le]={type:ue.type,location:N.getAttribLocation(j,le),locationSize:Te}}return X})(i,y)}let W,D;i.attachShader(y,E),i.attachShader(y,P),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y),this.getUniforms=function(){return W===void 0&&k(this),W},this.getAttributes=function(){return D===void 0&&k(this),D};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(y,37297)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vd++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=E,this.fragmentShader=P,this}var $d=0,Wl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xl(e),t.set(e,n)),n}},Xl=class{constructor(e){this.id=$d++,this.code=e,this.usedTimes=0}};function Qd(r,e,t,n,i,s,a){let o=new jr,c=new Wl,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,_,S){let E=_.fog,P=S.geometry,k=f.isMeshStandardMaterial?_.environment:null,W=(f.isMeshStandardMaterial?t:e).get(f.envMap||k),D=W&&W.mapping===ds?W.image.height:null,I=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let G=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,N=G!==void 0?G.length:0,j,X,K,te,ue=0;if(P.morphAttributes.position!==void 0&&(ue=1),P.morphAttributes.normal!==void 0&&(ue=2),P.morphAttributes.color!==void 0&&(ue=3),I){let st=ii[I];j=st.vertexShader,X=st.fragmentShader}else j=f.vertexShader,X=f.fragmentShader,c.update(f),K=c.getVertexShaderID(f),te=c.getFragmentShaderID(f);let le=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),ne=S.isInstancedMesh===!0,me=S.isBatchedMesh===!0,Pe=!!f.map,de=!!f.matcap,Me=!!W,fe=!!f.aoMap,q=!!f.lightMap,we=!!f.bumpMap,A=!!f.normalMap,b=!!f.displacementMap,H=!!f.emissiveMap,O=!!f.metalnessMap,M=!!f.roughnessMap,R=f.anisotropy>0,z=f.clearcoat>0,U=f.dispersion>0,se=f.iridescence>0,Y=f.sheen>0,J=f.transmission>0,_e=R&&!!f.anisotropyMap,oe=z&&!!f.clearcoatMap,he=z&&!!f.clearcoatNormalMap,Se=z&&!!f.clearcoatRoughnessMap,Ae=se&&!!f.iridescenceMap,Ue=se&&!!f.iridescenceThicknessMap,We=Y&&!!f.sheenColorMap,Ne=Y&&!!f.sheenRoughnessMap,$e=!!f.specularMap,Ie=!!f.specularColorMap,He=!!f.specularIntensityMap,tt=J&&!!f.transmissionMap,Ft=J&&!!f.thicknessMap,Be=!!f.gradientMap,lt=!!f.alphaMap,Qe=f.alphaTest>0,Jt=!!f.alphaHash,bt=!!f.extensions,B=vi;f.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(B=r.toneMapping));let mt={shaderID:I,shaderType:f.type,shaderName:f.name,vertexShader:j,fragmentShader:X,defines:f.defines,customVertexShaderID:K,customFragmentShaderID:te,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:me,batchingColor:me&&S._colorsTexture!==null,instancing:ne,instancingColor:ne&&S.instanceColor!==null,instancingMorph:ne&&S.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Fi,alphaToCoverage:!!f.alphaToCoverage,map:Pe,matcap:de,envMap:Me,envMapMode:Me&&W.mapping,envMapCubeUVHeight:D,aoMap:fe,lightMap:q,bumpMap:we,normalMap:A,displacementMap:d&&b,emissiveMap:H,normalMapObjectSpace:A&&f.normalMapType===hh,normalMapTangentSpace:A&&f.normalMapType===ch,metalnessMap:O,roughnessMap:M,anisotropy:R,anisotropyMap:_e,clearcoat:z,clearcoatMap:oe,clearcoatNormalMap:he,clearcoatRoughnessMap:Se,dispersion:U,iridescence:se,iridescenceMap:Ae,iridescenceThicknessMap:Ue,sheen:Y,sheenColorMap:We,sheenRoughnessMap:Ne,specularMap:$e,specularColorMap:Ie,specularIntensityMap:He,transmission:J,transmissionMap:tt,thicknessMap:Ft,gradientMap:Be,opaque:f.transparent===!1&&f.blending===hs&&f.alphaToCoverage===!1,alphaMap:lt,alphaTest:Qe,alphaHash:Jt,combine:f.combine,mapUv:Pe&&y(f.map.channel),aoMapUv:fe&&y(f.aoMap.channel),lightMapUv:q&&y(f.lightMap.channel),bumpMapUv:we&&y(f.bumpMap.channel),normalMapUv:A&&y(f.normalMap.channel),displacementMapUv:b&&y(f.displacementMap.channel),emissiveMapUv:H&&y(f.emissiveMap.channel),metalnessMapUv:O&&y(f.metalnessMap.channel),roughnessMapUv:M&&y(f.roughnessMap.channel),anisotropyMapUv:_e&&y(f.anisotropyMap.channel),clearcoatMapUv:oe&&y(f.clearcoatMap.channel),clearcoatNormalMapUv:he&&y(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&y(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&y(f.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&y(f.iridescenceThicknessMap.channel),sheenColorMapUv:We&&y(f.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&y(f.sheenRoughnessMap.channel),specularMapUv:$e&&y(f.specularMap.channel),specularColorMapUv:Ie&&y(f.specularColorMap.channel),specularIntensityMapUv:He&&y(f.specularIntensityMap.channel),transmissionMapUv:tt&&y(f.transmissionMap.channel),thicknessMapUv:Ft&&y(f.thicknessMap.channel),alphaMapUv:lt&&y(f.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(A||R),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!P.attributes.uv&&(Pe||lt),fog:!!E,useFog:f.fog===!0,fogExp2:!!E&&E.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Te,skinning:S.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:ue,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:B,decodeVideoTexture:Pe&&f.map.isVideoTexture===!0&&pt.getTransfer(f.map.colorSpace)===xt,decodeVideoTextureEmissive:H&&f.emissiveMap.isVideoTexture===!0&&pt.getTransfer(f.emissiveMap.colorSpace)===xt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===kt,flipSided:f.side===An,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:bt&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&f.extensions.multiDraw===!0||me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return mt.vertexUv1s=l.has(1),mt.vertexUv2s=l.has(2),mt.vertexUv3s=l.has(3),l.clear(),mt},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)})(g,f),(function(v,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],v;if(g){let _=ii[g];v=Mh.clone(_.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let _=0,S=h.length;_<S;_++){let E=h[_];if(E.cacheKey===g){v=E,++v.usedTimes;break}}return v===void 0&&(v=new Kd(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function ep(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function tp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function jh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function qh(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||tp),n.length>1&&n.sort(o||jh),i.length>1&&i.sort(o||jh)}}}function np(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new qh,r.set(e,[i])):t>=n.length?(i=new qh,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function ip(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ye};break;case"SpotLight":t={position:new w,direction:new w,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var rp=0;function sp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ap(r){let e=new ip,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new et,a=new et;return{setup:function(o){let c=0,l=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let u=0,d=0,m=0,p=0,y=0,f=0,g=0,v=0,_=0,S=0,E=0;o.sort(sp);for(let k=0,W=o.length;k<W;k++){let D=o[k],I=D.color,G=D.intensity,N=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=I.r*G,l+=I.g*G,h+=I.b*G;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],G);E++}else if(D.isDirectionalLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let K=D.shadow,te=t.get(D);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,n.directionalShadow[u]=te,n.directionalShadowMap[u]=j,n.directionalShadowMatrix[u]=D.shadow.matrix,f++}n.directional[u]=X,u++}else if(D.isSpotLight){let X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(I).multiplyScalar(G),X.distance=N,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[m]=X;let K=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,K.updateMatrices(D),D.castShadow&&S++),n.spotLightMatrix[m]=K.matrix,D.castShadow){let te=t.get(D);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,n.spotShadow[m]=te,n.spotShadowMap[m]=j,v++}m++}else if(D.isRectAreaLight){let X=e.get(D);X.color.copy(I).multiplyScalar(G),X.halfWidth.set(.5*D.width,0,0),X.halfHeight.set(0,.5*D.height,0),n.rectArea[p]=X,p++}else if(D.isPointLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let K=D.shadow,te=t.get(D);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,te.shadowCameraNear=K.camera.near,te.shadowCameraFar=K.camera.far,n.pointShadow[d]=te,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=X,d++}else if(D.isHemisphereLight){let X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(G),X.groundColor.copy(D.groundColor).multiplyScalar(G),n.hemi[y]=X,y++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let P=n.hash;P.directionalLength===u&&P.pointLength===d&&P.spotLength===m&&P.rectAreaLength===p&&P.hemiLength===y&&P.numDirectionalShadows===f&&P.numPointShadows===g&&P.numSpotShadows===v&&P.numSpotMaps===_&&P.numLightProbes===E||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=y,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+_-S,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,P.directionalLength=u,P.pointLength=d,P.spotLength=m,P.rectAreaLength=p,P.hemiLength=y,P.numDirectionalShadows=f,P.numPointShadows=g,P.numSpotShadows=v,P.numSpotMaps=_,P.numLightProbes=E,n.version=rp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let y=0,f=o.length;y<f;y++){let g=o[y];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(p),m++}}},state:n}}function Yh(r){let e=new ap(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function op(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Yh(r),e.set(t,[s])):n>=i.length?(s=new Yh(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function lp(r,e,t){let n=new Ei,i=new ve,s=new ve,a=new vt,o=new _a({depthPacking:lh}),c=new ya,l={},h=t.maxTextureSize,u={[yr]:An,[An]:yr,[kt]:kt},d=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new dt;p.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new gt(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo;let g=this.type;function v(P,k){let W=e.update(y);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,m.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new In(i.x,i.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,r.setRenderTarget(P.mapPass),r.clear(),r.renderBufferDirect(k,null,W,d,y,null),m.uniforms.shadow_pass.value=P.mapPass.texture,m.uniforms.resolution.value=P.mapSize,m.uniforms.radius.value=P.radius,r.setRenderTarget(P.map),r.clear(),r.renderBufferDirect(k,null,W,m,y,null)}function _(P,k,W,D){let I=null,G=W.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(G!==void 0)I=G;else if(I=W.isPointLight===!0?c:o,r.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0||k.alphaToCoverage===!0){let N=I.uuid,j=k.uuid,X=l[N];X===void 0&&(X={},l[N]=X);let K=X[j];K===void 0&&(K=I.clone(),X[j]=K,k.addEventListener("dispose",E)),I=K}return I.visible=k.visible,I.wireframe=k.wireframe,I.side=D===ei?k.shadowSide!==null?k.shadowSide:k.side:k.shadowSide!==null?k.shadowSide:u[k.side],I.alphaMap=k.alphaMap,I.alphaTest=k.alphaToCoverage===!0?.5:k.alphaTest,I.map=k.map,I.clipShadows=k.clipShadows,I.clippingPlanes=k.clippingPlanes,I.clipIntersection=k.clipIntersection,I.displacementMap=k.displacementMap,I.displacementScale=k.displacementScale,I.displacementBias=k.displacementBias,I.wireframeLinewidth=k.wireframeLinewidth,I.linewidth=k.linewidth,W.isPointLight===!0&&I.isMeshDistanceMaterial===!0&&(r.properties.get(I).light=W),I}function S(P,k,W,D,I){if(P.visible===!1)return;if(P.layers.test(k.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&I===ei)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,P.matrixWorld);let N=e.update(P),j=P.material;if(Array.isArray(j)){let X=N.groups;for(let K=0,te=X.length;K<te;K++){let ue=X[K],le=j[ue.materialIndex];if(le&&le.visible){let Te=_(P,le,D,I);P.onBeforeShadow(r,P,k,W,N,Te,ue),r.renderBufferDirect(W,null,N,Te,P,ue),P.onAfterShadow(r,P,k,W,N,Te,ue)}}}else if(j.visible){let X=_(P,j,D,I);P.onBeforeShadow(r,P,k,W,N,X,null),r.renderBufferDirect(W,null,N,X,P,null),P.onAfterShadow(r,P,k,W,N,X,null)}}let G=P.children;for(let N=0,j=G.length;N<j;N++)S(G[N],k,W,D,I)}function E(P){P.target.removeEventListener("dispose",E);for(let k in l){let W=l[k],D=P.target.uuid;D in W&&(W[D].dispose(),delete W[D])}}this.render=function(P,k,W){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||P.length===0)return;let D=r.getRenderTarget(),I=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Ci),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let j=g!==ei&&this.type===ei,X=g===ei&&this.type!==ei;for(let K=0,te=P.length;K<te;K++){let ue=P[K],le=ue.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;i.copy(le.mapSize);let Te=le.getFrameExtents();if(i.multiply(Te),s.copy(le.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Te.x),i.x=s.x*Te.x,le.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Te.y),i.y=s.y*Te.y,le.mapSize.y=s.y)),le.map===null||j===!0||X===!0){let me=this.type!==ei?{minFilter:$n,magFilter:$n}:{};le.map!==null&&le.map.dispose(),le.map=new In(i.x,i.y,me),le.map.texture.name=ue.name+".shadowMap",le.camera.updateProjectionMatrix()}r.setRenderTarget(le.map),r.clear();let ne=le.getViewportCount();for(let me=0;me<ne;me++){let Pe=le.getViewport(me);a.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),N.viewport(a),le.updateMatrices(ue,me),n=le.getFrustum(),S(k,W,le.camera,ue,this.type)}le.isPointLightShadow!==!0&&this.type===ei&&v(le,W),le.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(D,I,G)}}var cp={[La]:Da,[Ua]:Oa,[Na]:Ba,[us]:Fa,[Da]:La,[Oa]:Ua,[Ba]:Na,[Fa]:us};function hp(r,e){let t=new function(){let M=!1,R=new vt,z=null,U=new vt(0,0,0,0);return{setMask:function(se){z===se||M||(r.colorMask(se,se,se,se),z=se)},setLocked:function(se){M=se},setClear:function(se,Y,J,_e,oe){oe===!0&&(se*=_e,Y*=_e,J*=_e),R.set(se,Y,J,_e),U.equals(R)===!1&&(r.clearColor(se,Y,J,_e),U.copy(R))},reset:function(){M=!1,z=null,U.set(-1,0,0,0)}}},n=new function(){let M=!1,R=!1,z=null,U=null,se=null;return{setReversed:function(Y){if(R!==Y){let J=e.get("EXT_clip_control");Y?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),R=Y;let _e=se;se=null,this.setClear(_e)}},getReversed:function(){return R},setTest:function(Y){Y?Me(r.DEPTH_TEST):fe(r.DEPTH_TEST)},setMask:function(Y){z===Y||M||(r.depthMask(Y),z=Y)},setFunc:function(Y){if(R&&(Y=cp[Y]),U!==Y){switch(Y){case La:r.depthFunc(r.NEVER);break;case Da:r.depthFunc(r.ALWAYS);break;case Ua:r.depthFunc(r.LESS);break;case us:r.depthFunc(r.LEQUAL);break;case Na:r.depthFunc(r.EQUAL);break;case Fa:r.depthFunc(r.GEQUAL);break;case Oa:r.depthFunc(r.GREATER);break;case Ba:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}U=Y}},setLocked:function(Y){M=Y},setClear:function(Y){se!==Y&&(R&&(Y=1-Y),r.clearDepth(Y),se=Y)},reset:function(){M=!1,z=null,U=null,se=null,R=!1}}},i=new function(){let M=!1,R=null,z=null,U=null,se=null,Y=null,J=null,_e=null,oe=null;return{setTest:function(he){M||(he?Me(r.STENCIL_TEST):fe(r.STENCIL_TEST))},setMask:function(he){R===he||M||(r.stencilMask(he),R=he)},setFunc:function(he,Se,Ae){z===he&&U===Se&&se===Ae||(r.stencilFunc(he,Se,Ae),z=he,U=Se,se=Ae)},setOp:function(he,Se,Ae){Y===he&&J===Se&&_e===Ae||(r.stencilOp(he,Se,Ae),Y=he,J=Se,_e=Ae)},setLocked:function(he){M=he},setClear:function(he){oe!==he&&(r.clearStencil(he),oe=he)},reset:function(){M=!1,R=null,z=null,U=null,se=null,Y=null,J=null,_e=null,oe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,y=null,f=null,g=null,v=null,_=null,S=new Ye(0,0,0),E=0,P=!1,k=null,W=null,D=null,I=null,G=null,N=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,X=0,K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(K)[1]),j=X>=1):K.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),j=X>=2);let te=null,ue={},le=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),ne=new vt().fromArray(le),me=new vt().fromArray(Te);function Pe(M,R,z,U){let se=new Uint8Array(4),Y=r.createTexture();r.bindTexture(M,Y),r.texParameteri(M,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(M,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let J=0;J<z;J++)M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?r.texImage3D(R,0,r.RGBA,1,1,U,0,r.RGBA,r.UNSIGNED_BYTE,se):r.texImage2D(R+J,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,se);return Y}let de={};function Me(M){o[M]!==!0&&(r.enable(M),o[M]=!0)}function fe(M){o[M]!==!1&&(r.disable(M),o[M]=!1)}de[r.TEXTURE_2D]=Pe(r.TEXTURE_2D,r.TEXTURE_2D,1),de[r.TEXTURE_CUBE_MAP]=Pe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[r.TEXTURE_2D_ARRAY]=Pe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),de[r.TEXTURE_3D]=Pe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Me(r.DEPTH_TEST),n.setFunc(us),b(!1),H(ko),Me(r.CULL_FACE),A(Ci);let q={[xr]:r.FUNC_ADD,[Pc]:r.FUNC_SUBTRACT,[Ic]:r.FUNC_REVERSE_SUBTRACT};q[Lc]=r.MIN,q[Dc]=r.MAX;let we={[Uc]:r.ZERO,[Nc]:r.ONE,[Fc]:r.SRC_COLOR,[Bc]:r.SRC_ALPHA,[Wc]:r.SRC_ALPHA_SATURATE,[Vc]:r.DST_COLOR,[Gc]:r.DST_ALPHA,[Oc]:r.ONE_MINUS_SRC_COLOR,[zc]:r.ONE_MINUS_SRC_ALPHA,[Hc]:r.ONE_MINUS_DST_COLOR,[kc]:r.ONE_MINUS_DST_ALPHA,[Xc]:r.CONSTANT_COLOR,[jc]:r.ONE_MINUS_CONSTANT_COLOR,[qc]:r.CONSTANT_ALPHA,[Yc]:r.ONE_MINUS_CONSTANT_ALPHA};function A(M,R,z,U,se,Y,J,_e,oe,he){if(M!==Ci){if(d===!1&&(Me(r.BLEND),d=!0),M===Rc)se=se||R,Y=Y||z,J=J||U,R===p&&se===g||(r.blendEquationSeparate(q[R],q[se]),p=R,g=se),z===y&&U===f&&Y===v&&J===_||(r.blendFuncSeparate(we[z],we[U],we[Y],we[J]),y=z,f=U,v=Y,_=J),_e.equals(S)!==!1&&oe===E||(r.blendColor(_e.r,_e.g,_e.b,oe),S.copy(_e),E=oe),m=M,P=!1;else if(M!==m||he!==P){if(p===xr&&g===xr||(r.blendEquation(r.FUNC_ADD),p=xr,g=xr),he)switch(M){case hs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ho:r.blendFunc(r.ONE,r.ONE);break;case Wo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xo:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}else switch(M){case hs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ho:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Wo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",M)}y=null,f=null,v=null,_=null,S.set(0,0,0),E=0,m=M,P=he}}else d===!0&&(fe(r.BLEND),d=!1)}function b(M){k!==M&&(M?r.frontFace(r.CW):r.frontFace(r.CCW),k=M)}function H(M){M!==Ac?(Me(r.CULL_FACE),M!==W&&(M===ko?r.cullFace(r.BACK):M===Cc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):fe(r.CULL_FACE),W=M}function O(M,R,z){M?(Me(r.POLYGON_OFFSET_FILL),I===R&&G===z||(r.polygonOffset(R,z),I=R,G=z)):fe(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Me,disable:fe,bindFramebuffer:function(M,R){return c[M]!==R&&(r.bindFramebuffer(M,R),c[M]=R,M===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=R),M===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=R),!0)},drawBuffers:function(M,R){let z=h,U=!1;if(M){z=l.get(R),z===void 0&&(z=[],l.set(R,z));let se=M.textures;if(z.length!==se.length||z[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,J=se.length;Y<J;Y++)z[Y]=r.COLOR_ATTACHMENT0+Y;z.length=se.length,U=!0}}else z[0]!==r.BACK&&(z[0]=r.BACK,U=!0);U&&r.drawBuffers(z)},useProgram:function(M){return u!==M&&(r.useProgram(M),u=M,!0)},setBlending:A,setMaterial:function(M,R){M.side===kt?fe(r.CULL_FACE):Me(r.CULL_FACE);let z=M.side===An;R&&(z=!z),b(z),M.blending===hs&&M.transparent===!1?A(Ci):A(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),n.setFunc(M.depthFunc),n.setTest(M.depthTest),n.setMask(M.depthWrite),t.setMask(M.colorWrite);let U=M.stencilWrite;i.setTest(U),U&&(i.setMask(M.stencilWriteMask),i.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),i.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),O(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?Me(r.SAMPLE_ALPHA_TO_COVERAGE):fe(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:b,setCullFace:H,setLineWidth:function(M){M!==D&&(j&&r.lineWidth(M),D=M)},setPolygonOffset:O,setScissorTest:function(M){M?Me(r.SCISSOR_TEST):fe(r.SCISSOR_TEST)},activeTexture:function(M){M===void 0&&(M=r.TEXTURE0+N-1),te!==M&&(r.activeTexture(M),te=M)},bindTexture:function(M,R,z){z===void 0&&(z=te===null?r.TEXTURE0+N-1:te);let U=ue[z];U===void 0&&(U={type:void 0,texture:void 0},ue[z]=U),U.type===M&&U.texture===R||(te!==z&&(r.activeTexture(z),te=z),r.bindTexture(M,R||de[M]),U.type=M,U.texture=R)},unbindTexture:function(){let M=ue[te];M!==void 0&&M.type!==void 0&&(r.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},updateUBOMapping:function(M,R){let z=a.get(R);z===void 0&&(z=new WeakMap,a.set(R,z));let U=z.get(M);U===void 0&&(U=r.getUniformBlockIndex(R,M.name),z.set(M,U))},uniformBlockBinding:function(M,R){let z=a.get(R).get(M);s.get(R)!==z&&(r.uniformBlockBinding(R,z,M.__bindingPointIndex),s.set(R,z))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(M){console.error("THREE.WebGLState:",M)}},scissor:function(M){ne.equals(M)===!1&&(r.scissor(M.x,M.y,M.z,M.w),ne.copy(M))},viewport:function(M){me.equals(M)===!1&&(r.viewport(M.x,M.y,M.z,M.w),me.copy(M))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},te=null,ue={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,y=null,f=null,g=null,v=null,_=null,S=new Ye(0,0,0),E=0,P=!1,k=null,W=null,D=null,I=null,G=null,ne.set(0,0,r.canvas.width,r.canvas.height),me.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function up(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ve,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,b){return m?new OffscreenCanvas(A,b):Wr("canvas")}function y(A,b,H){let O=1,M=we(A);if((M.width>H||M.height>H)&&(O=H/Math.max(M.width,M.height)),O<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let R=Math.floor(O*M.width),z=Math.floor(O*M.height);u===void 0&&(u=p(R,z));let U=b?p(R,z):u;return U.width=R,U.height=z,U.getContext("2d").drawImage(A,0,0,R,z),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+R+"x"+z+")."),U}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),A}return A}function f(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,b,H,O,M=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let R=b;if(b===r.RED&&(H===r.FLOAT&&(R=r.R32F),H===r.HALF_FLOAT&&(R=r.R16F),H===r.UNSIGNED_BYTE&&(R=r.R8)),b===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(R=r.R8UI),H===r.UNSIGNED_SHORT&&(R=r.R16UI),H===r.UNSIGNED_INT&&(R=r.R32UI),H===r.BYTE&&(R=r.R8I),H===r.SHORT&&(R=r.R16I),H===r.INT&&(R=r.R32I)),b===r.RG&&(H===r.FLOAT&&(R=r.RG32F),H===r.HALF_FLOAT&&(R=r.RG16F),H===r.UNSIGNED_BYTE&&(R=r.RG8)),b===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(R=r.RG8UI),H===r.UNSIGNED_SHORT&&(R=r.RG16UI),H===r.UNSIGNED_INT&&(R=r.RG32UI),H===r.BYTE&&(R=r.RG8I),H===r.SHORT&&(R=r.RG16I),H===r.INT&&(R=r.RG32I)),b===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(R=r.RGB8UI),H===r.UNSIGNED_SHORT&&(R=r.RGB16UI),H===r.UNSIGNED_INT&&(R=r.RGB32UI),H===r.BYTE&&(R=r.RGB8I),H===r.SHORT&&(R=r.RGB16I),H===r.INT&&(R=r.RGB32I)),b===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(R=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(R=r.RGBA16UI),H===r.UNSIGNED_INT&&(R=r.RGBA32UI),H===r.BYTE&&(R=r.RGBA8I),H===r.SHORT&&(R=r.RGBA16I),H===r.INT&&(R=r.RGBA32I)),b===r.RGB&&(H===r.UNSIGNED_INT_5_9_9_9_REV&&(R=r.RGB9_E5),H===r.UNSIGNED_INT_10F_11F_11F_REV&&(R=r.R11F_G11F_B10F)),b===r.RGBA){let z=M?Vr:pt.getTransfer(O);H===r.FLOAT&&(R=r.RGBA32F),H===r.HALF_FLOAT&&(R=r.RGBA16F),H===r.UNSIGNED_BYTE&&(R=z===xt?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(R=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(R=r.RGB5_A1)}return R!==r.R16F&&R!==r.R32F&&R!==r.RG16F&&R!==r.RG32F&&R!==r.RGBA16F&&R!==r.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(A,b){let H;return A?b===null||b===Wi||b===Tr?H=r.DEPTH24_STENCIL8:b===Wn?H=r.DEPTH32F_STENCIL8:b===Sr&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Wi||b===Tr?H=r.DEPTH_COMPONENT24:b===Wn?H=r.DEPTH_COMPONENT32F:b===Sr&&(H=r.DEPTH_COMPONENT16),H}function E(A,b){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==$n&&A.minFilter!==Qn?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function P(A){let b=A.target;b.removeEventListener("dispose",P),(function(H){let O=n.get(H);if(O.__webglInit===void 0)return;let M=H.source,R=d.get(M);if(R){let z=R[O.__cacheKey];z.usedTimes--,z.usedTimes===0&&W(H),Object.keys(R).length===0&&d.delete(M)}n.remove(H)})(b),b.isVideoTexture&&h.delete(b)}function k(A){let b=A.target;b.removeEventListener("dispose",k),(function(H){let O=n.get(H);if(H.depthTexture&&(H.depthTexture.dispose(),n.remove(H.depthTexture)),H.isWebGLCubeRenderTarget)for(let R=0;R<6;R++){if(Array.isArray(O.__webglFramebuffer[R]))for(let z=0;z<O.__webglFramebuffer[R].length;z++)r.deleteFramebuffer(O.__webglFramebuffer[R][z]);else r.deleteFramebuffer(O.__webglFramebuffer[R]);O.__webglDepthbuffer&&r.deleteRenderbuffer(O.__webglDepthbuffer[R])}else{if(Array.isArray(O.__webglFramebuffer))for(let R=0;R<O.__webglFramebuffer.length;R++)r.deleteFramebuffer(O.__webglFramebuffer[R]);else r.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&r.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&r.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let R=0;R<O.__webglColorRenderbuffer.length;R++)O.__webglColorRenderbuffer[R]&&r.deleteRenderbuffer(O.__webglColorRenderbuffer[R]);O.__webglDepthRenderbuffer&&r.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let M=H.textures;for(let R=0,z=M.length;R<z;R++){let U=n.get(M[R]);U.__webglTexture&&(r.deleteTexture(U.__webglTexture),a.memory.textures--),n.remove(M[R])}n.remove(H)})(b)}function W(A){let b=n.get(A);r.deleteTexture(b.__webglTexture);let H=A.source;delete d.get(H)[b.__cacheKey],a.memory.textures--}let D=0;function I(A,b){let H=n.get(A);if(A.isVideoTexture&&(function(O){let M=a.render.frame;h.get(O)!==M&&(h.set(O,M),O.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&H.__version!==A.version){let O=A.image;if(O===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(O.complete!==!1)return void ue(H,A,b);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+b)}let G={[Gn]:r.REPEAT,[cr]:r.CLAMP_TO_EDGE,[Ys]:r.MIRRORED_REPEAT},N={[$n]:r.NEAREST,[rh]:r.NEAREST_MIPMAP_NEAREST,[ps]:r.NEAREST_MIPMAP_LINEAR,[Qn]:r.LINEAR,[ka]:r.LINEAR_MIPMAP_NEAREST,[Hi]:r.LINEAR_MIPMAP_LINEAR},j={[uh]:r.NEVER,[vh]:r.ALWAYS,[dh]:r.LESS,[Al]:r.LEQUAL,[ph]:r.EQUAL,[gh]:r.GEQUAL,[mh]:r.GREATER,[fh]:r.NOTEQUAL};function X(A,b){if(b.type!==Wn||e.has("OES_texture_float_linear")!==!1||b.magFilter!==Qn&&b.magFilter!==ka&&b.magFilter!==ps&&b.magFilter!==Hi&&b.minFilter!==Qn&&b.minFilter!==ka&&b.minFilter!==ps&&b.minFilter!==Hi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,G[b.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,G[b.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,G[b.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,N[b.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,N[b.minFilter]),b.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,j[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===$n||b.minFilter!==ps&&b.minFilter!==Hi||b.type===Wn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function K(A,b){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",P));let O=b.source,M=d.get(O);M===void 0&&(M={},d.set(O,M));let R=(function(z){let U=[];return U.push(z.wrapS),U.push(z.wrapT),U.push(z.wrapR||0),U.push(z.magFilter),U.push(z.minFilter),U.push(z.anisotropy),U.push(z.internalFormat),U.push(z.format),U.push(z.type),U.push(z.generateMipmaps),U.push(z.premultiplyAlpha),U.push(z.flipY),U.push(z.unpackAlignment),U.push(z.colorSpace),U.join()})(b);if(R!==A.__cacheKey){M[R]===void 0&&(M[R]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,H=!0),M[R].usedTimes++;let z=M[A.__cacheKey];z!==void 0&&(M[A.__cacheKey].usedTimes--,z.usedTimes===0&&W(b)),A.__cacheKey=R,A.__webglTexture=M[R].texture}return H}function te(A,b,H){return Math.floor(Math.floor(A/H)/b)}function ue(A,b,H){let O=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(O=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(O=r.TEXTURE_3D);let M=K(A,b),R=b.source;t.bindTexture(O,A.__webglTexture,r.TEXTURE0+H);let z=n.get(R);if(R.version!==z.__version||M===!0){t.activeTexture(r.TEXTURE0+H);let U=pt.getPrimaries(pt.workingColorSpace),se=b.colorSpace===Xi?null:pt.getPrimaries(b.colorSpace),Y=b.colorSpace===Xi||U===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let J=y(b.image,!1,i.maxTextureSize);J=q(b,J);let _e=s.convert(b.format,b.colorSpace),oe=s.convert(b.type),he,Se=_(b.internalFormat,_e,oe,b.colorSpace,b.isVideoTexture);X(O,b);let Ae=b.mipmaps,Ue=b.isVideoTexture!==!0,We=z.__version===void 0||M===!0,Ne=R.dataReady,$e=E(b,J);if(b.isDepthTexture)Se=S(b.format===fs,b.type),We&&(Ue?t.texStorage2D(r.TEXTURE_2D,1,Se,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,Se,J.width,J.height,0,_e,oe,null));else if(b.isDataTexture)if(Ae.length>0){Ue&&We&&t.texStorage2D(r.TEXTURE_2D,$e,Se,Ae[0].width,Ae[0].height);for(let Ie=0,He=Ae.length;Ie<He;Ie++)he=Ae[Ie],Ue?Ne&&t.texSubImage2D(r.TEXTURE_2D,Ie,0,0,he.width,he.height,_e,oe,he.data):t.texImage2D(r.TEXTURE_2D,Ie,Se,he.width,he.height,0,_e,oe,he.data);b.generateMipmaps=!1}else Ue?(We&&t.texStorage2D(r.TEXTURE_2D,$e,Se,J.width,J.height),Ne&&(function(Ie,He,tt,Ft){let Be=Ie.updateRanges;if(Be.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,He.width,He.height,tt,Ft,He.data);else{Be.sort((B,mt)=>B.start-mt.start);let lt=0;for(let B=1;B<Be.length;B++){let mt=Be[lt],st=Be[B],Ve=mt.start+mt.count,Ot=te(st.start,He.width,4),yt=te(mt.start,He.width,4);st.start<=Ve+1&&Ot===yt&&te(st.start+st.count-1,He.width,4)===Ot?mt.count=Math.max(mt.count,st.start+st.count-mt.start):(++lt,Be[lt]=st)}Be.length=lt+1;let Qe=r.getParameter(r.UNPACK_ROW_LENGTH),Jt=r.getParameter(r.UNPACK_SKIP_PIXELS),bt=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,He.width);for(let B=0,mt=Be.length;B<mt;B++){let st=Be[B],Ve=Math.floor(st.start/4),Ot=Math.ceil(st.count/4),yt=Ve%He.width,Xt=Math.floor(Ve/He.width),Bt=Ot;r.pixelStorei(r.UNPACK_SKIP_PIXELS,yt),r.pixelStorei(r.UNPACK_SKIP_ROWS,Xt),t.texSubImage2D(r.TEXTURE_2D,0,yt,Xt,Bt,1,tt,Ft,He.data)}Ie.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Qe),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Jt),r.pixelStorei(r.UNPACK_SKIP_ROWS,bt)}})(b,J,_e,oe)):t.texImage2D(r.TEXTURE_2D,0,Se,J.width,J.height,0,_e,oe,J.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ue&&We&&t.texStorage3D(r.TEXTURE_2D_ARRAY,$e,Se,Ae[0].width,Ae[0].height,J.depth);for(let Ie=0,He=Ae.length;Ie<He;Ie++)if(he=Ae[Ie],b.format!==Xn)if(_e!==null)if(Ue){if(Ne)if(b.layerUpdates.size>0){let tt=Dl(he.width,he.height,b.format,b.type);for(let Ft of b.layerUpdates){let Be=he.data.subarray(Ft*tt/he.data.BYTES_PER_ELEMENT,(Ft+1)*tt/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ie,0,0,Ft,he.width,he.height,1,_e,Be)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ie,0,0,0,he.width,he.height,J.depth,_e,he.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ie,Se,he.width,he.height,J.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?Ne&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Ie,0,0,0,he.width,he.height,J.depth,_e,oe,he.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Ie,Se,he.width,he.height,J.depth,0,_e,oe,he.data)}else{Ue&&We&&t.texStorage2D(r.TEXTURE_2D,$e,Se,Ae[0].width,Ae[0].height);for(let Ie=0,He=Ae.length;Ie<He;Ie++)he=Ae[Ie],b.format!==Xn?_e!==null?Ue?Ne&&t.compressedTexSubImage2D(r.TEXTURE_2D,Ie,0,0,he.width,he.height,_e,he.data):t.compressedTexImage2D(r.TEXTURE_2D,Ie,Se,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?Ne&&t.texSubImage2D(r.TEXTURE_2D,Ie,0,0,he.width,he.height,_e,oe,he.data):t.texImage2D(r.TEXTURE_2D,Ie,Se,he.width,he.height,0,_e,oe,he.data)}else if(b.isDataArrayTexture)if(Ue){if(We&&t.texStorage3D(r.TEXTURE_2D_ARRAY,$e,Se,J.width,J.height,J.depth),Ne)if(b.layerUpdates.size>0){let Ie=Dl(J.width,J.height,b.format,b.type);for(let He of b.layerUpdates){let tt=J.data.subarray(He*Ie/J.data.BYTES_PER_ELEMENT,(He+1)*Ie/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,He,J.width,J.height,1,_e,oe,tt)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,_e,oe,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Se,J.width,J.height,J.depth,0,_e,oe,J.data);else if(b.isData3DTexture)Ue?(We&&t.texStorage3D(r.TEXTURE_3D,$e,Se,J.width,J.height,J.depth),Ne&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,_e,oe,J.data)):t.texImage3D(r.TEXTURE_3D,0,Se,J.width,J.height,J.depth,0,_e,oe,J.data);else if(b.isFramebufferTexture){if(We)if(Ue)t.texStorage2D(r.TEXTURE_2D,$e,Se,J.width,J.height);else{let Ie=J.width,He=J.height;for(let tt=0;tt<$e;tt++)t.texImage2D(r.TEXTURE_2D,tt,Se,Ie,He,0,_e,oe,null),Ie>>=1,He>>=1}}else if(Ae.length>0){if(Ue&&We){let Ie=we(Ae[0]);t.texStorage2D(r.TEXTURE_2D,$e,Se,Ie.width,Ie.height)}for(let Ie=0,He=Ae.length;Ie<He;Ie++)he=Ae[Ie],Ue?Ne&&t.texSubImage2D(r.TEXTURE_2D,Ie,0,0,_e,oe,he):t.texImage2D(r.TEXTURE_2D,Ie,Se,_e,oe,he);b.generateMipmaps=!1}else if(Ue){if(We){let Ie=we(J);t.texStorage2D(r.TEXTURE_2D,$e,Se,Ie.width,Ie.height)}Ne&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,_e,oe,J)}else t.texImage2D(r.TEXTURE_2D,0,Se,_e,oe,J);f(b)&&g(O),z.__version=R.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function le(A,b,H,O,M,R){let z=s.convert(H.format,H.colorSpace),U=s.convert(H.type),se=_(H.internalFormat,z,U,H.colorSpace),Y=n.get(b),J=n.get(H);if(J.__renderTarget=b,!Y.__hasExternalTextures){let _e=Math.max(1,b.width>>R),oe=Math.max(1,b.height>>R);M===r.TEXTURE_3D||M===r.TEXTURE_2D_ARRAY?t.texImage3D(M,R,se,_e,oe,b.depth,0,z,U,null):t.texImage2D(M,R,se,_e,oe,0,z,U,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),fe(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,O,M,J.__webglTexture,0,Me(b)):(M===r.TEXTURE_2D||M>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&M<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,O,M,J.__webglTexture,R),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(A,b,H){if(r.bindRenderbuffer(r.RENDERBUFFER,A),b.depthBuffer){let O=b.depthTexture,M=O&&O.isDepthTexture?O.type:null,R=S(b.stencilBuffer,M),z=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=Me(b);fe(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,U,R,b.width,b.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,U,R,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,R,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,z,r.RENDERBUFFER,A)}else{let O=b.textures;for(let M=0;M<O.length;M++){let R=O[M],z=s.convert(R.format,R.colorSpace),U=s.convert(R.type),se=_(R.internalFormat,z,U,R.colorSpace),Y=Me(b);H&&fe(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,se,b.width,b.height):fe(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Y,se,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,se,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ne(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!b.depthTexture||!b.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let H=n.get(b.depthTexture);H.__renderTarget=b,H.__webglTexture&&b.depthTexture.image.width===b.width&&b.depthTexture.image.height===b.height||(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I(b.depthTexture,0);let O=H.__webglTexture,M=Me(b);if(b.depthTexture.format===ms)fe(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,O,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,O,0);else{if(b.depthTexture.format!==fs)throw new Error("Unknown depthTexture format");fe(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,O,0,M):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,O,0)}}function me(A){let b=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){let O=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),O){let M=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,O.removeEventListener("dispose",M)};O.addEventListener("dispose",M),b.__depthDisposeCallback=M}b.__boundDepthTexture=O}if(A.depthTexture&&!b.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let O=A.texture.mipmaps;O&&O.length>0?ne(b.__webglFramebuffer[0],A):ne(b.__webglFramebuffer,A)}else if(H){b.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[O]),b.__webglDepthbuffer[O]===void 0)b.__webglDepthbuffer[O]=r.createRenderbuffer(),Te(b.__webglDepthbuffer[O],A,!1);else{let M=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,R=b.__webglDepthbuffer[O];r.bindRenderbuffer(r.RENDERBUFFER,R),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,R)}}else{let O=A.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),Te(b.__webglDepthbuffer,A,!1);else{let M=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,R=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,R),r.framebufferRenderbuffer(r.FRAMEBUFFER,M,r.RENDERBUFFER,R)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Pe=[],de=[];function Me(A){return Math.min(i.maxSamples,A.samples)}function fe(A){let b=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function q(A,b){let H=A.colorSpace,O=A.format,M=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==Fi&&H!==Xi&&(pt.getTransfer(H)===xt?O===Xn&&M===ni||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),b}function we(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A},this.resetTextureUnits=function(){D=0},this.setTexture2D=I,this.setTexture2DArray=function(A,b){let H=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version?ue(H,A,b):t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+b)},this.setTexture3D=function(A,b){let H=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version?ue(H,A,b):t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+b)},this.setTextureCube=function(A,b){let H=n.get(A);A.version>0&&H.__version!==A.version?(function(O,M,R){if(M.image.length!==6)return;let z=K(O,M),U=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+R);let se=n.get(U);if(U.version!==se.__version||z===!0){t.activeTexture(r.TEXTURE0+R);let Y=pt.getPrimaries(pt.workingColorSpace),J=M.colorSpace===Xi?null:pt.getPrimaries(M.colorSpace),_e=M.colorSpace===Xi||Y===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let oe=M.isCompressedTexture||M.image[0].isCompressedTexture,he=M.image[0]&&M.image[0].isDataTexture,Se=[];for(let Be=0;Be<6;Be++)Se[Be]=oe||he?he?M.image[Be].image:M.image[Be]:y(M.image[Be],!0,i.maxCubemapSize),Se[Be]=q(M,Se[Be]);let Ae=Se[0],Ue=s.convert(M.format,M.colorSpace),We=s.convert(M.type),Ne=_(M.internalFormat,Ue,We,M.colorSpace),$e=M.isVideoTexture!==!0,Ie=se.__version===void 0||z===!0,He=U.dataReady,tt,Ft=E(M,Ae);if(X(r.TEXTURE_CUBE_MAP,M),oe){$e&&Ie&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ft,Ne,Ae.width,Ae.height);for(let Be=0;Be<6;Be++){tt=Se[Be].mipmaps;for(let lt=0;lt<tt.length;lt++){let Qe=tt[lt];M.format!==Xn?Ue!==null?$e?He&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt,0,0,Qe.width,Qe.height,Ue,Qe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt,Ne,Qe.width,Qe.height,0,Qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt,0,0,Qe.width,Qe.height,Ue,We,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt,Ne,Qe.width,Qe.height,0,Ue,We,Qe.data)}}}else{if(tt=M.mipmaps,$e&&Ie){tt.length>0&&Ft++;let Be=we(Se[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ft,Ne,Be.width,Be.height)}for(let Be=0;Be<6;Be++)if(he){$e?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Se[Be].width,Se[Be].height,Ue,We,Se[Be].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Ne,Se[Be].width,Se[Be].height,0,Ue,We,Se[Be].data);for(let lt=0;lt<tt.length;lt++){let Qe=tt[lt].image[Be].image;$e?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt+1,0,0,Qe.width,Qe.height,Ue,We,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt+1,Ne,Qe.width,Qe.height,0,Ue,We,Qe.data)}}else{$e?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Ue,We,Se[Be]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Ne,Ue,We,Se[Be]);for(let lt=0;lt<tt.length;lt++){let Qe=tt[lt];$e?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt+1,0,0,Ue,We,Qe.image[Be]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,lt+1,Ne,Ue,We,Qe.image[Be])}}}f(M)&&g(r.TEXTURE_CUBE_MAP),se.__version=U.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version})(H,A,b):t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+b)},this.rebindTextures=function(A,b,H){let O=n.get(A);b!==void 0&&le(O.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&me(A)},this.setupRenderTarget=function(A){let b=A.texture,H=n.get(A),O=n.get(b);A.addEventListener("dispose",k);let M=A.textures,R=A.isWebGLCubeRenderTarget===!0,z=M.length>1;if(z||(O.__webglTexture===void 0&&(O.__webglTexture=r.createTexture()),O.__version=b.version,a.memory.textures++),R){H.__webglFramebuffer=[];for(let U=0;U<6;U++)if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer[U]=[];for(let se=0;se<b.mipmaps.length;se++)H.__webglFramebuffer[U][se]=r.createFramebuffer()}else H.__webglFramebuffer[U]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer=[];for(let U=0;U<b.mipmaps.length;U++)H.__webglFramebuffer[U]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(z)for(let U=0,se=M.length;U<se;U++){let Y=n.get(M[U]);Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&fe(A)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let U=0;U<M.length;U++){let se=M[U];H.__webglColorRenderbuffer[U]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[U]);let Y=s.convert(se.format,se.colorSpace),J=s.convert(se.type),_e=_(se.internalFormat,Y,J,se.colorSpace,A.isXRRenderTarget===!0),oe=Me(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,oe,_e,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+U,r.RENDERBUFFER,H.__webglColorRenderbuffer[U])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(H.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(R){t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture),X(r.TEXTURE_CUBE_MAP,b);for(let U=0;U<6;U++)if(b.mipmaps&&b.mipmaps.length>0)for(let se=0;se<b.mipmaps.length;se++)le(H.__webglFramebuffer[U][se],A,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+U,se);else le(H.__webglFramebuffer[U],A,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+U,0);f(b)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(z){for(let U=0,se=M.length;U<se;U++){let Y=M[U],J=n.get(Y),_e=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(_e=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(_e,J.__webglTexture),X(_e,Y),le(H.__webglFramebuffer,A,Y,r.COLOR_ATTACHMENT0+U,_e,0),f(Y)&&g(_e)}t.unbindTexture()}else{let U=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(U=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(U,O.__webglTexture),X(U,b),b.mipmaps&&b.mipmaps.length>0)for(let se=0;se<b.mipmaps.length;se++)le(H.__webglFramebuffer[se],A,b,r.COLOR_ATTACHMENT0,U,se);else le(H.__webglFramebuffer,A,b,r.COLOR_ATTACHMENT0,U,0);f(b)&&g(U),t.unbindTexture()}A.depthBuffer&&me(A)},this.updateRenderTargetMipmap=function(A){let b=A.textures;for(let H=0,O=b.length;H<O;H++){let M=b[H];if(f(M)){let R=v(A),z=n.get(M).__webglTexture;t.bindTexture(R,z),g(R),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(fe(A)===!1){let b=A.textures,H=A.width,O=A.height,M=r.COLOR_BUFFER_BIT,R=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=n.get(A),U=b.length>1;if(U)for(let Y=0;Y<b.length;Y++)t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,z.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,z.__webglMultisampledFramebuffer);let se=A.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglFramebuffer);for(let Y=0;Y<b.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(M|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(M|=r.STENCIL_BUFFER_BIT)),U){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let J=n.get(b[Y]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,J,0)}r.blitFramebuffer(0,0,H,O,0,0,H,O,M,r.NEAREST),c===!0&&(Pe.length=0,de.length=0,Pe.push(r.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Pe.push(R),de.push(R),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,de)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),U)for(let Y=0;Y<b.length;Y++){t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let J=n.get(b[Y]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,z.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,J,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let b=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}},this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=le,this.useMultisampledRTT=fe}function dp(r,e){return{convert:function(t,n=Xi){let i,s=pt.getTransfer(n);if(t===ni)return r.UNSIGNED_BYTE;if(t===Ha)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Wa)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Zo)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Jo)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===qo)return r.BYTE;if(t===Yo)return r.SHORT;if(t===Sr)return r.UNSIGNED_SHORT;if(t===Va)return r.INT;if(t===Wi)return r.UNSIGNED_INT;if(t===Wn)return r.FLOAT;if(t===Ri)return r.HALF_FLOAT;if(t===sh)return r.ALPHA;if(t===ah)return r.RGB;if(t===Xn)return r.RGBA;if(t===ms)return r.DEPTH_COMPONENT;if(t===fs)return r.DEPTH_STENCIL;if(t===Xa)return r.RED;if(t===ja)return r.RED_INTEGER;if(t===oh)return r.RG;if(t===Ko)return r.RG_INTEGER;if(t===$o)return r.RGBA_INTEGER;if(t===qa||t===Ya||t===Za||t===Ja)if(s===xt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===qa)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ya)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Za)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ja)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===qa)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ya)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Za)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ja)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Qo||t===el||t===tl||t===nl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Qo)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===el)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===tl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===nl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===il||t===rl||t===sl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===il||t===rl)return s===xt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===sl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===al||t===ol||t===ll||t===cl||t===hl||t===ul||t===dl||t===pl||t===ml||t===fl||t===gl||t===vl||t===_l||t===yl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===al)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ol)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===ll)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===cl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===hl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===ul)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===dl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===pl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===ml)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===fl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===gl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===vl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===_l)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===yl)return s===xt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===xl||t===Ml||t===Sl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===xl)return s===xt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ml)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Sl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Tl||t===bl||t===wl||t===El){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Tl)return i.COMPRESSED_RED_RGTC1_EXT;if(t===bl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===wl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===El)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Tr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var jl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qr(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new cn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new Wt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ql=class extends pi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,y=typeof XRWebGLBinding<"u",f=new jl,g={},v=t.getContextAttributes(),_=null,S=null,E=[],P=[],k=new ve,W=null,D=new zt;D.viewport=new vt;let I=new zt;I.viewport=new vt;let G=[D,I],N=new Pa,j=null,X=null;function K(de){let Me=P.indexOf(de.inputSource);if(Me===-1)return;let fe=E[Me];fe!==void 0&&(fe.update(de.inputSource,de.frame,l||a),fe.dispatchEvent({type:de.type,data:de.inputSource}))}function te(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",ue);for(let de=0;de<E.length;de++){let Me=P[de];Me!==null&&(P[de]=null,E[de].disconnect(Me))}j=null,X=null,f.reset();for(let de in g)delete g[de];e.setRenderTarget(_),m=null,d=null,u=null,i=null,S=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(W),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}function ue(de){for(let Me=0;Me<de.removed.length;Me++){let fe=de.removed[Me],q=P.indexOf(fe);q>=0&&(P[q]=null,E[q].disconnect(fe))}for(let Me=0;Me<de.added.length;Me++){let fe=de.added[Me],q=P.indexOf(fe);if(q===-1){for(let A=0;A<E.length;A++){if(A>=P.length){P.push(fe),q=A;break}if(P[A]===null){P[A]=fe,q=A;break}}if(q===-1)break}let we=E[q];we&&we.connect(fe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(de){let Me=E[de];return Me===void 0&&(Me=new pr,E[de]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(de){let Me=E[de];return Me===void 0&&(Me=new pr,E[de]=Me),Me.getGripSpace()},this.getHand=function(de){let Me=E[de];return Me===void 0&&(Me=new pr,E[de]=Me),Me.getHandSpace()},this.setFramebufferScaleFactor=function(de){s=de,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(de){o=de,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(de){l=de},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(de){if(i=de,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",te),i.addEventListener("inputsourceschange",ue),v.xrCompatible!==!0&&await t.makeXRCompatible(),W=e.getPixelRatio(),e.getSize(k),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,fe=null,q=null;v.depth&&(q=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=v.stencil?fs:ms,fe=v.stencil?Tr:Wi);let we={colorFormat:t.RGBA8,depthFormat:q,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(we),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new In(d.textureWidth,d.textureHeight,{format:Xn,type:ni,depthTexture:new $r(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Me={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new In(m.framebufferWidth,m.framebufferHeight,{format:Xn,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Pe.setContext(i),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let le=new w,Te=new w;function ne(de,Me){Me===null?de.matrixWorld.copy(de.matrix):de.matrixWorld.multiplyMatrices(Me.matrixWorld,de.matrix),de.matrixWorldInverse.copy(de.matrixWorld).invert()}this.updateCamera=function(de){if(i===null)return;let Me=de.near,fe=de.far;f.texture!==null&&(f.depthNear>0&&(Me=f.depthNear),f.depthFar>0&&(fe=f.depthFar)),N.near=I.near=D.near=Me,N.far=I.far=D.far=fe,j===N.near&&X===N.far||(i.updateRenderState({depthNear:N.near,depthFar:N.far}),j=N.near,X=N.far),N.layers.mask=6|de.layers.mask,D.layers.mask=3&N.layers.mask,I.layers.mask=5&N.layers.mask;let q=de.parent,we=N.cameras;ne(N,q);for(let A=0;A<we.length;A++)ne(we[A],q);we.length===2?(function(A,b,H){le.setFromMatrixPosition(b.matrixWorld),Te.setFromMatrixPosition(H.matrixWorld);let O=le.distanceTo(Te),M=b.projectionMatrix.elements,R=H.projectionMatrix.elements,z=M[14]/(M[10]-1),U=M[14]/(M[10]+1),se=(M[9]+1)/M[5],Y=(M[9]-1)/M[5],J=(M[8]-1)/M[0],_e=(R[8]+1)/R[0],oe=z*J,he=z*_e,Se=O/(-J+_e),Ae=Se*-J;if(b.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Ae),A.translateZ(Se),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),M[10]===-1)A.projectionMatrix.copy(b.projectionMatrix),A.projectionMatrixInverse.copy(b.projectionMatrixInverse);else{let Ue=z+Se,We=U+Se,Ne=oe-Ae,$e=he+(O-Ae),Ie=se*U/We*Ue,He=Y*U/We*Ue;A.projectionMatrix.makePerspective(Ne,$e,Ie,He,Ue,We),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(N,D,I):N.projectionMatrix.copy(D.projectionMatrix),(function(A,b,H){H===null?A.matrix.copy(b.matrixWorld):(A.matrix.copy(H.matrixWorld),A.matrix.invert(),A.matrix.multiply(b.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(b.projectionMatrix),A.projectionMatrixInverse.copy(b.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Js*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(de,N,q)},this.getCamera=function(){return N},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(de){c=de,d!==null&&(d.fixedFoveation=de),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=de)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(N)},this.getCameraTexture=function(de){return g[de]};let me=null,Pe=new Zh;Pe.setAnimationLoop(function(de,Me){if(h=Me.getViewerPose(l||a),p=Me,h!==null){let fe=h.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let q=!1;fe.length!==N.cameras.length&&(N.cameras.length=0,q=!0);for(let A=0;A<fe.length;A++){let b=fe[A],H=null;if(m!==null)H=m.getViewport(b);else{let M=u.getViewSubImage(d,b);H=M.viewport,A===0&&(e.setRenderTargetTextures(S,M.colorTexture,M.depthStencilTexture),e.setRenderTarget(S))}let O=G[A];O===void 0&&(O=new zt,O.layers.enable(A),O.viewport=new vt,G[A]=O),O.matrix.fromArray(b.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(b.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(H.x,H.y,H.width,H.height),A===0&&(N.matrix.copy(O.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),q===!0&&N.cameras.push(O)}let we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let A=u.getDepthInformation(fe[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(we&&we.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<fe.length;A++){let b=fe[A].camera;if(b){let H=g[b];H||(H=new Qr,g[b]=H);let O=u.getCameraImage(b);H.sourceTexture=O}}}}for(let fe=0;fe<E.length;fe++){let q=P[fe],we=E[fe];q!==null&&we!==void 0&&we.update(q,Me,l||a)}me&&me(de,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),p=null}),this.setAnimationLoop=function(de){me=de},this.dispose=function(){}}},Yi=new kn,pp=new et;function mp(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===An&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===An&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Yi.copy(c),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),i.envMapRotation.value.setFromMatrix4(pp.makeRotationFromEuler(Yi)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Pl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===An&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function fp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let y=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof y=="number"||typeof y=="boolean"?y:y.clone(),!0;{let g=p[f];if(typeof y=="number"||typeof y=="boolean"){if(g!==y)return p[f]=y,!0}else if(g.equals(y)===!1)return g.copy(y),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,v=0,_=16;for(let E=0,P=g.length;E<P;E++){let k=Array.isArray(g[E])?g[E]:[g[E]];for(let W=0,D=k.length;W<D;W++){let I=k[W],G=Array.isArray(I.value)?I.value:[I.value];for(let N=0,j=G.length;N<j;N++){let X=l(G[N]),K=v%_,te=K%X.boundary,ue=K+te;v+=te,ue!==0&&_-ue<X.storage&&(v+=_-ue),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=X.storage}}}let S=v%_;S>0&&(v+=_-S),f.__size=v,f.__cache={}})(u),m=(function(f){let g=(function(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),_=f.__size,S=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,_,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let y=e.render.frame;s[u.id]!==y&&((function(f){let g=i[f.id],v=f.uniforms,_=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let S=0,E=v.length;S<E;S++){let P=Array.isArray(v[S])?v[S]:[v[S]];for(let k=0,W=P.length;k<W;k++){let D=P[k];if(c(D,S,k,_)===!0){let I=D.__offset,G=Array.isArray(D.value)?D.value:[D.value],N=0;for(let j=0;j<G.length;j++){let X=G[j],K=l(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,I+N,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,N),N+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=y)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Fn=class{constructor(e={}){let{canvas:t=_h(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),y=new Int32Array(4),f=null,g=null,v=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,E=!1;this._outputColorSpace=ht;let P=0,k=0,W=null,D=-1,I=null,G=new vt,N=new vt,j=null,X=new Ye(0),K=0,te=t.width,ue=t.height,le=1,Te=null,ne=null,me=new vt(0,0,te,ue),Pe=new vt(0,0,te,ue),de=!1,Me=new Ei,fe=!1,q=!1,we=new et,A=new w,b=new vt,H={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O=!1;function M(){return W===null?le:1}let R,z,U,se,Y,J,_e,oe,he,Se,Ae,Ue,We,Ne,$e,Ie,He,tt,Ft,Be,lt,Qe,Jt,bt,B=n;function mt(C,$){return t.getContext(C,$)}try{let C={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ot,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",Xt,!1),B===null){let $="webgl2";if(B=mt($,C),B===null)throw mt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}function st(){R=new Ku(B),R.init(),Qe=new dp(B,R),z=new ju(B,R,e,Qe),U=new hp(B,R),z.reversedDepthBuffer&&d&&U.buffers.depth.setReversed(!0),se=new ed(B),Y=new ep,J=new up(B,R,U,Y,z,Qe,se),_e=new Yu(S),oe=new Ju(S),he=new ku(B),Jt=new Wu(B,he),Se=new $u(B,he,se,Jt),Ae=new nd(B,Se,he,se),Ft=new td(B,z,J),Ie=new qu(Y),Ue=new Qd(S,_e,oe,R,z,Jt,Ie),We=new mp(S,Y),Ne=new np,$e=new op(R),tt=new Hu(S,_e,oe,U,Ae,m,c),He=new lp(S,Ae,z),bt=new fp(B,se,z,U),Be=new Xu(B,R,se),lt=new Qu(B,R,se),se.programs=Ue.programs,S.capabilities=z,S.extensions=R,S.properties=Y,S.renderLists=Ne,S.shadowMap=He,S.state=U,S.info=se}st();let Ve=new ql(S,B);function Ot(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let C=se.autoReset,$=He.enabled,ae=He.autoUpdate,ge=He.needsUpdate,ie=He.type;st(),se.autoReset=C,He.enabled=$,He.autoUpdate=ae,He.needsUpdate=ge,He.type=ie}function Xt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Bt(C){let $=C.target;$.removeEventListener("dispose",Bt),(function(ae){(function(ge){let ie=Y.get(ge).programs;ie!==void 0&&(ie.forEach(function(ye){Ue.releaseProgram(ye)}),ge.isShaderMaterial&&Ue.releaseShaderCache(ge))})(ae),Y.remove(ae)})($)}function Vt(C,$,ae){C.transparent===!0&&C.side===kt&&C.forceSinglePass===!1?(C.side=An,C.needsUpdate=!0,At(C,$,ae),C.side=yr,C.needsUpdate=!0,At(C,$,ae),C.side=kt):At(C,$,ae)}this.xr=Ve,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let C=R.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=R.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(C){C!==void 0&&(le=C,this.setSize(te,ue,!1))},this.getSize=function(C){return C.set(te,ue)},this.setSize=function(C,$,ae=!0){Ve.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(te=C,ue=$,t.width=Math.floor(C*le),t.height=Math.floor($*le),ae===!0&&(t.style.width=C+"px",t.style.height=$+"px"),this.setViewport(0,0,C,$))},this.getDrawingBufferSize=function(C){return C.set(te*le,ue*le).floor()},this.setDrawingBufferSize=function(C,$,ae){te=C,ue=$,le=ae,t.width=Math.floor(C*ae),t.height=Math.floor($*ae),this.setViewport(0,0,C,$)},this.getCurrentViewport=function(C){return C.copy(G)},this.getViewport=function(C){return C.copy(me)},this.setViewport=function(C,$,ae,ge){C.isVector4?me.set(C.x,C.y,C.z,C.w):me.set(C,$,ae,ge),U.viewport(G.copy(me).multiplyScalar(le).round())},this.getScissor=function(C){return C.copy(Pe)},this.setScissor=function(C,$,ae,ge){C.isVector4?Pe.set(C.x,C.y,C.z,C.w):Pe.set(C,$,ae,ge),U.scissor(N.copy(Pe).multiplyScalar(le).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(C){U.setScissorTest(de=C)},this.setOpaqueSort=function(C){Te=C},this.setTransparentSort=function(C){ne=C},this.getClearColor=function(C){return C.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(C=!0,$=!0,ae=!0){let ge=0;if(C){let ie=!1;if(W!==null){let ye=W.texture.format;ie=ye===$o||ye===Ko||ye===ja}if(ie){let ye=W.texture.type,Le=ye===ni||ye===Wi||ye===Sr||ye===Tr||ye===Ha||ye===Wa,Fe=tt.getClearColor(),ke=tt.getClearAlpha(),Xe=Fe.r,Ge=Fe.g,je=Fe.b;Le?(p[0]=Xe,p[1]=Ge,p[2]=je,p[3]=ke,B.clearBufferuiv(B.COLOR,0,p)):(y[0]=Xe,y[1]=Ge,y[2]=je,y[3]=ke,B.clearBufferiv(B.COLOR,0,y))}else ge|=B.COLOR_BUFFER_BIT}$&&(ge|=B.DEPTH_BUFFER_BIT),ae&&(ge|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(ge)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ot,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",Xt,!1),tt.dispose(),Ne.dispose(),$e.dispose(),Y.dispose(),_e.dispose(),oe.dispose(),Ae.dispose(),Jt.dispose(),bt.dispose(),Ue.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",mn),Ve.removeEventListener("sessionend",un),Cn.stop()},this.renderBufferDirect=function(C,$,ae,ge,ie,ye){$===null&&($=H);let Le=ie.isMesh&&ie.matrixWorld.determinant()<0,Fe=(function(ct,Rt,x,T,L){Rt.isScene!==!0&&(Rt=H),J.resetTextureUnits();let Z=Rt.fog,F=T.isMeshStandardMaterial?Rt.environment:null,ee=W===null?S.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Fi,V=(T.isMeshStandardMaterial?oe:_e).get(T.envMap||F),Q=T.vertexColors===!0&&!!x.attributes.color&&x.attributes.color.itemSize===4,re=!!x.attributes.tangent&&(!!T.normalMap||T.anisotropy>0),ce=!!x.morphAttributes.position,xe=!!x.morphAttributes.normal,be=!!x.morphAttributes.color,Ee=vi;T.toneMapped&&(W!==null&&W.isXRRenderTarget!==!0||(Ee=S.toneMapping));let De=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,qe=De!==void 0?De.length:0,pe=Y.get(T),Ce=g.state.lights;if(fe===!0&&(q===!0||ct!==I)){let Et=ct===I&&T.id===D;Ie.setState(T,ct,Et)}let ze=!1;T.version===pe.__version?pe.needsLights&&pe.lightsStateVersion!==Ce.state.version||pe.outputColorSpace!==ee||L.isBatchedMesh&&pe.batching===!1?ze=!0:L.isBatchedMesh||pe.batching!==!0?L.isBatchedMesh&&pe.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&pe.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&pe.instancing===!1?ze=!0:L.isInstancedMesh||pe.instancing!==!0?L.isSkinnedMesh&&pe.skinning===!1?ze=!0:L.isSkinnedMesh||pe.skinning!==!0?L.isInstancedMesh&&pe.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&pe.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&pe.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&pe.instancingMorph===!1&&L.morphTexture!==null||pe.envMap!==V||T.fog===!0&&pe.fog!==Z?ze=!0:pe.numClippingPlanes===void 0||pe.numClippingPlanes===Ie.numPlanes&&pe.numIntersection===Ie.numIntersection?(pe.vertexAlphas!==Q||pe.vertexTangents!==re||pe.morphTargets!==ce||pe.morphNormals!==xe||pe.morphColors!==be||pe.toneMapping!==Ee||pe.morphTargetsCount!==qe)&&(ze=!0):ze=!0:ze=!0:ze=!0:ze=!0:(ze=!0,pe.__version=T.version);let ft=pe.currentProgram;ze===!0&&(ft=At(T,Rt,L));let _n=!1,yn=!1,Rr=!1,Pt=ft.getUniforms(),qn=pe.uniforms;if(U.useProgram(ft.program)&&(_n=!0,yn=!0,Rr=!0),T.id!==D&&(D=T.id,yn=!0),_n||I!==ct){U.buffers.depth.getReversed()&&ct.reversedDepth!==!0&&(ct._reversedDepth=!0,ct.updateProjectionMatrix()),Pt.setValue(B,"projectionMatrix",ct.projectionMatrix),Pt.setValue(B,"viewMatrix",ct.matrixWorldInverse);let Et=Pt.map.cameraPosition;Et!==void 0&&Et.setValue(B,A.setFromMatrixPosition(ct.matrixWorld)),z.logarithmicDepthBuffer&&Pt.setValue(B,"logDepthBufFC",2/(Math.log(ct.far+1)/Math.LN2)),(T.isMeshPhongMaterial||T.isMeshToonMaterial||T.isMeshLambertMaterial||T.isMeshBasicMaterial||T.isMeshStandardMaterial||T.isShaderMaterial)&&Pt.setValue(B,"isOrthographic",ct.isOrthographicCamera===!0),I!==ct&&(I=ct,yn=!0,Rr=!0)}if(L.isSkinnedMesh){Pt.setOptional(B,L,"bindMatrix"),Pt.setOptional(B,L,"bindMatrixInverse");let Et=L.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),Pt.setValue(B,"boneTexture",Et.boneTexture,J))}L.isBatchedMesh&&(Pt.setOptional(B,L,"batchingTexture"),Pt.setValue(B,"batchingTexture",L._matricesTexture,J),Pt.setOptional(B,L,"batchingIdTexture"),Pt.setValue(B,"batchingIdTexture",L._indirectTexture,J),Pt.setOptional(B,L,"batchingColorTexture"),L._colorsTexture!==null&&Pt.setValue(B,"batchingColorTexture",L._colorsTexture,J));let ys=x.morphAttributes;ys.position===void 0&&ys.normal===void 0&&ys.color===void 0||Ft.update(L,x,ft),(yn||pe.receiveShadow!==L.receiveShadow)&&(pe.receiveShadow=L.receiveShadow,Pt.setValue(B,"receiveShadow",L.receiveShadow)),T.isMeshGouraudMaterial&&T.envMap!==null&&(qn.envMap.value=V,qn.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1),T.isMeshStandardMaterial&&T.envMap===null&&Rt.environment!==null&&(qn.envMapIntensity.value=Rt.environmentIntensity),yn&&(Pt.setValue(B,"toneMappingExposure",S.toneMappingExposure),pe.needsLights&&(xn=Rr,(Rn=qn).ambientLightColor.needsUpdate=xn,Rn.lightProbe.needsUpdate=xn,Rn.directionalLights.needsUpdate=xn,Rn.directionalLightShadows.needsUpdate=xn,Rn.pointLights.needsUpdate=xn,Rn.pointLightShadows.needsUpdate=xn,Rn.spotLights.needsUpdate=xn,Rn.spotLightShadows.needsUpdate=xn,Rn.rectAreaLights.needsUpdate=xn,Rn.hemisphereLights.needsUpdate=xn),Z&&T.fog===!0&&We.refreshFogUniforms(qn,Z),We.refreshMaterialUniforms(qn,T,le,ue,g.state.transmissionRenderTarget[ct.id]),Er.upload(B,ut(pe),qn,J));var Rn,xn;if(T.isShaderMaterial&&T.uniformsNeedUpdate===!0&&(Er.upload(B,ut(pe),qn,J),T.uniformsNeedUpdate=!1),T.isSpriteMaterial&&Pt.setValue(B,"center",L.center),Pt.setValue(B,"modelViewMatrix",L.modelViewMatrix),Pt.setValue(B,"normalMatrix",L.normalMatrix),Pt.setValue(B,"modelMatrix",L.matrixWorld),T.isShaderMaterial||T.isRawShaderMaterial){let Et=T.uniformsGroups;for(let sn=0,xs=Et.length;sn<xs;sn++){let ri=Et[sn];bt.update(ri,ft),bt.bind(ri,ft)}}return ft})(C,$,ae,ge,ie);U.setMaterial(ge,Le);let ke=ae.index,Xe=1;if(ge.wireframe===!0){if(ke=Se.getWireframeAttribute(ae),ke===void 0)return;Xe=2}let Ge=ae.drawRange,je=ae.attributes.position,nt=Ge.start*Xe,Ze=(Ge.start+Ge.count)*Xe;ye!==null&&(nt=Math.max(nt,ye.start*Xe),Ze=Math.min(Ze,(ye.start+ye.count)*Xe)),ke!==null?(nt=Math.max(nt,0),Ze=Math.min(Ze,ke.count)):je!=null&&(nt=Math.max(nt,0),Ze=Math.min(Ze,je.count));let Lt=Ze-nt;if(Lt<0||Lt===1/0)return;let Ht;Jt.setup(ie,ge,Fe,ae,ke);let St=Be;if(ke!==null&&(Ht=he.get(ke),St=lt,St.setIndex(Ht)),ie.isMesh)ge.wireframe===!0?(U.setLineWidth(ge.wireframeLinewidth*M()),St.setMode(B.LINES)):St.setMode(B.TRIANGLES);else if(ie.isLine){let ct=ge.linewidth;ct===void 0&&(ct=1),U.setLineWidth(ct*M()),ie.isLineSegments?St.setMode(B.LINES):ie.isLineLoop?St.setMode(B.LINE_LOOP):St.setMode(B.LINE_STRIP)}else ie.isPoints?St.setMode(B.POINTS):ie.isSprite&&St.setMode(B.TRIANGLES);if(ie.isBatchedMesh)if(ie._multiDrawInstances!==null)hr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),St.renderMultiDrawInstances(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount,ie._multiDrawInstances);else if(R.get("WEBGL_multi_draw"))St.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let ct=ie._multiDrawStarts,Rt=ie._multiDrawCounts,x=ie._multiDrawCount,T=ke?he.get(ke).bytesPerElement:1,L=Y.get(ge).currentProgram.getUniforms();for(let Z=0;Z<x;Z++)L.setValue(B,"_gl_DrawID",Z),St.render(ct[Z]/T,Rt[Z])}else if(ie.isInstancedMesh)St.renderInstances(nt,Lt,ie.count);else if(ae.isInstancedBufferGeometry){let ct=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Rt=Math.min(ae.instanceCount,ct);St.renderInstances(nt,Lt,Rt)}else St.render(nt,Lt)},this.compile=function(C,$,ae=null){ae===null&&(ae=C),g=$e.get(ae),g.init($),_.push(g),ae.traverseVisible(function(ie){ie.isLight&&ie.layers.test($.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),C!==ae&&C.traverseVisible(function(ie){ie.isLight&&ie.layers.test($.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),g.setupLights();let ge=new Set;return C.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let ye=ie.material;if(ye)if(Array.isArray(ye))for(let Le=0;Le<ye.length;Le++){let Fe=ye[Le];Vt(Fe,ae,ie),ge.add(Fe)}else Vt(ye,ae,ie),ge.add(ye)}),g=_.pop(),ge},this.compileAsync=function(C,$,ae=null){let ge=this.compile(C,$,ae);return new Promise(ie=>{function ye(){ge.forEach(function(Le){Y.get(Le).currentProgram.isReady()&&ge.delete(Le)}),ge.size!==0?setTimeout(ye,10):ie(C)}R.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let nn=null;function mn(){Cn.stop()}function un(){Cn.start()}let Cn=new Zh;function rn(C,$,ae,ge){if(C.visible===!1)return;if(C.layers.test($.layers)){if(C.isGroup)ae=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update($);else if(C.isLight)g.pushLight(C),C.castShadow&&g.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Me.intersectsSprite(C)){ge&&b.setFromMatrixPosition(C.matrixWorld).applyMatrix4(we);let ye=Ae.update(C),Le=C.material;Le.visible&&f.push(C,ye,Le,ae,b.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Me.intersectsObject(C))){let ye=Ae.update(C),Le=C.material;if(ge&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),b.copy(C.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),b.copy(ye.boundingSphere.center)),b.applyMatrix4(C.matrixWorld).applyMatrix4(we)),Array.isArray(Le)){let Fe=ye.groups;for(let ke=0,Xe=Fe.length;ke<Xe;ke++){let Ge=Fe[ke],je=Le[Ge.materialIndex];je&&je.visible&&f.push(C,ye,je,ae,b.z,Ge)}}else Le.visible&&f.push(C,ye,Le,ae,b.z,null)}}let ie=C.children;for(let ye=0,Le=ie.length;ye<Le;ye++)rn(ie[ye],$,ae,ge)}function en(C,$,ae,ge){let ie=C.opaque,ye=C.transmissive,Le=C.transparent;g.setupLightsView(ae),fe===!0&&Ie.setGlobalState(S.clippingPlanes,ae),ge&&U.viewport(G.copy(ge)),ie.length>0&&Kt(ie,$,ae),ye.length>0&&Kt(ye,$,ae),Le.length>0&&Kt(Le,$,ae),U.buffers.depth.setTest(!0),U.buffers.depth.setMask(!0),U.buffers.color.setMask(!0),U.setPolygonOffset(!1)}function Pi(C,$,ae,ge){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ge.id]===void 0&&(g.state.transmissionRenderTarget[ge.id]=new In(1,1,{generateMipmaps:!0,type:R.has("EXT_color_buffer_half_float")||R.has("EXT_color_buffer_float")?Ri:ni,minFilter:Hi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));let ie=g.state.transmissionRenderTarget[ge.id],ye=ge.viewport||G;ie.setSize(ye.z*S.transmissionResolutionScale,ye.w*S.transmissionResolutionScale);let Le=S.getRenderTarget(),Fe=S.getActiveCubeFace(),ke=S.getActiveMipmapLevel();S.setRenderTarget(ie),S.getClearColor(X),K=S.getClearAlpha(),K<1&&S.setClearColor(16777215,.5),S.clear(),O&&tt.render(ae);let Xe=S.toneMapping;S.toneMapping=vi;let Ge=ge.viewport;if(ge.viewport!==void 0&&(ge.viewport=void 0),g.setupLightsView(ge),fe===!0&&Ie.setGlobalState(S.clippingPlanes,ge),Kt(C,ae,ge),J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie),R.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let nt=0,Ze=$.length;nt<Ze;nt++){let Lt=$[nt],Ht=Lt.object,St=Lt.geometry,ct=Lt.material,Rt=Lt.group;if(ct.side===kt&&Ht.layers.test(ge.layers)){let x=ct.side;ct.side=An,ct.needsUpdate=!0,wt(Ht,ae,ge,St,ct,Rt),ct.side=x,ct.needsUpdate=!0,je=!0}}je===!0&&(J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie))}S.setRenderTarget(Le,Fe,ke),S.setClearColor(X,K),Ge!==void 0&&(ge.viewport=Ge),S.toneMapping=Xe}function Kt(C,$,ae){let ge=$.isScene===!0?$.overrideMaterial:null;for(let ie=0,ye=C.length;ie<ye;ie++){let Le=C[ie],Fe=Le.object,ke=Le.geometry,Xe=Le.group,Ge=Le.material;Ge.allowOverride===!0&&ge!==null&&(Ge=ge),Fe.layers.test(ae.layers)&&wt(Fe,$,ae,ke,Ge,Xe)}}function wt(C,$,ae,ge,ie,ye){C.onBeforeRender(S,$,ae,ge,ie,ye),C.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),ie.onBeforeRender(S,$,ae,ge,C,ye),ie.transparent===!0&&ie.side===kt&&ie.forceSinglePass===!1?(ie.side=An,ie.needsUpdate=!0,S.renderBufferDirect(ae,$,ge,ie,C,ye),ie.side=yr,ie.needsUpdate=!0,S.renderBufferDirect(ae,$,ge,ie,C,ye),ie.side=kt):S.renderBufferDirect(ae,$,ge,ie,C,ye),C.onAfterRender(S,$,ae,ge,ie,ye)}function At(C,$,ae){$.isScene!==!0&&($=H);let ge=Y.get(C),ie=g.state.lights,ye=g.state.shadowsArray,Le=ie.state.version,Fe=Ue.getParameters(C,ie.state,ye,$,ae),ke=Ue.getProgramCacheKey(Fe),Xe=ge.programs;ge.environment=C.isMeshStandardMaterial?$.environment:null,ge.fog=$.fog,ge.envMap=(C.isMeshStandardMaterial?oe:_e).get(C.envMap||ge.environment),ge.envMapRotation=ge.environment!==null&&C.envMap===null?$.environmentRotation:C.envMapRotation,Xe===void 0&&(C.addEventListener("dispose",Bt),Xe=new Map,ge.programs=Xe);let Ge=Xe.get(ke);if(Ge!==void 0){if(ge.currentProgram===Ge&&ge.lightsStateVersion===Le)return jn(C,Fe),Ge}else Fe.uniforms=Ue.getUniforms(C),C.onBeforeCompile(Fe,S),Ge=Ue.acquireProgram(Fe,ke),Xe.set(ke,Ge),ge.uniforms=Fe.uniforms;let je=ge.uniforms;return(C.isShaderMaterial||C.isRawShaderMaterial)&&C.clipping!==!0||(je.clippingPlanes=Ie.uniform),jn(C,Fe),ge.needsLights=(function(nt){return nt.isMeshLambertMaterial||nt.isMeshToonMaterial||nt.isMeshPhongMaterial||nt.isMeshStandardMaterial||nt.isShadowMaterial||nt.isShaderMaterial&&nt.lights===!0})(C),ge.lightsStateVersion=Le,ge.needsLights&&(je.ambientLightColor.value=ie.state.ambient,je.lightProbe.value=ie.state.probe,je.directionalLights.value=ie.state.directional,je.directionalLightShadows.value=ie.state.directionalShadow,je.spotLights.value=ie.state.spot,je.spotLightShadows.value=ie.state.spotShadow,je.rectAreaLights.value=ie.state.rectArea,je.ltc_1.value=ie.state.rectAreaLTC1,je.ltc_2.value=ie.state.rectAreaLTC2,je.pointLights.value=ie.state.point,je.pointLightShadows.value=ie.state.pointShadow,je.hemisphereLights.value=ie.state.hemi,je.directionalShadowMap.value=ie.state.directionalShadowMap,je.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,je.spotShadowMap.value=ie.state.spotShadowMap,je.spotLightMatrix.value=ie.state.spotLightMatrix,je.spotLightMap.value=ie.state.spotLightMap,je.pointShadowMap.value=ie.state.pointShadowMap,je.pointShadowMatrix.value=ie.state.pointShadowMatrix),ge.currentProgram=Ge,ge.uniformsList=null,Ge}function ut(C){if(C.uniformsList===null){let $=C.currentProgram.getUniforms();C.uniformsList=Er.seqWithValue($.seq,C.uniforms)}return C.uniformsList}function jn(C,$){let ae=Y.get(C);ae.outputColorSpace=$.outputColorSpace,ae.batching=$.batching,ae.batchingColor=$.batchingColor,ae.instancing=$.instancing,ae.instancingColor=$.instancingColor,ae.instancingMorph=$.instancingMorph,ae.skinning=$.skinning,ae.morphTargets=$.morphTargets,ae.morphNormals=$.morphNormals,ae.morphColors=$.morphColors,ae.morphTargetsCount=$.morphTargetsCount,ae.numClippingPlanes=$.numClippingPlanes,ae.numIntersection=$.numClipIntersection,ae.vertexAlphas=$.vertexAlphas,ae.vertexTangents=$.vertexTangents,ae.toneMapping=$.toneMapping}Cn.setAnimationLoop(function(C){nn&&nn(C)}),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(C){nn=C,Ve.setAnimationLoop(C),C===null?Cn.stop():Cn.start()},Ve.addEventListener("sessionstart",mn),Ve.addEventListener("sessionend",un),this.render=function(C,$){if($!==void 0&&$.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(E===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera($),$=Ve.getCamera()),C.isScene===!0&&C.onBeforeRender(S,C,$,W),g=$e.get(C,_.length),g.init($),_.push(g),we.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),Me.setFromProjectionMatrix(we,di,$.reversedDepth),q=this.localClippingEnabled,fe=Ie.init(this.clippingPlanes,q),f=Ne.get(C,v.length),f.init(),v.push(f),Ve.enabled===!0&&Ve.isPresenting===!0){let ye=S.xr.getDepthSensingMesh();ye!==null&&rn(ye,$,-1/0,S.sortObjects)}rn(C,$,0,S.sortObjects),f.finish(),S.sortObjects===!0&&f.sort(Te,ne),O=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,O&&tt.addToRenderList(f,C),this.info.render.frame++,fe===!0&&Ie.beginShadows();let ae=g.state.shadowsArray;He.render(ae,C,$),fe===!0&&Ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let ge=f.opaque,ie=f.transmissive;if(g.setupLights(),$.isArrayCamera){let ye=$.cameras;if(ie.length>0)for(let Le=0,Fe=ye.length;Le<Fe;Le++)Pi(ge,ie,C,ye[Le]);O&&tt.render(C);for(let Le=0,Fe=ye.length;Le<Fe;Le++){let ke=ye[Le];en(f,C,ke,ke.viewport)}}else ie.length>0&&Pi(ge,ie,C,$),O&&tt.render(C),en(f,C,$);W!==null&&k===0&&(J.updateMultisampleRenderTarget(W),J.updateRenderTargetMipmap(W)),C.isScene===!0&&C.onAfterRender(S,C,$),Jt.resetDefaultState(),D=-1,I=null,_.pop(),_.length>0?(g=_[_.length-1],fe===!0&&Ie.setGlobalState(S.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(C,$,ae){let ge=Y.get(C);ge.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ge.__autoAllocateDepthBuffer===!1&&(ge.__useRenderToTexture=!1),Y.get(C.texture).__webglTexture=$,Y.get(C.depthTexture).__webglTexture=ge.__autoAllocateDepthBuffer?void 0:ae,ge.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,$){let ae=Y.get(C);ae.__webglFramebuffer=$,ae.__useDefaultFramebuffer=$===void 0};let Ct=B.createFramebuffer();this.setRenderTarget=function(C,$=0,ae=0){W=C,P=$,k=ae;let ge=!0,ie=null,ye=!1,Le=!1;if(C){let Fe=Y.get(C);if(Fe.__useDefaultFramebuffer!==void 0)U.bindFramebuffer(B.FRAMEBUFFER,null),ge=!1;else if(Fe.__webglFramebuffer===void 0)J.setupRenderTarget(C);else if(Fe.__hasExternalTextures)J.rebindTextures(C,Y.get(C.texture).__webglTexture,Y.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Ge=C.depthTexture;if(Fe.__boundDepthTexture!==Ge){if(Ge!==null&&Y.has(Ge)&&(C.width!==Ge.image.width||C.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(C)}}let ke=C.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Le=!0);let Xe=Y.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(ie=Array.isArray(Xe[$])?Xe[$][ae]:Xe[$],ye=!0):ie=C.samples>0&&J.useMultisampledRTT(C)===!1?Y.get(C).__webglMultisampledFramebuffer:Array.isArray(Xe)?Xe[ae]:Xe,G.copy(C.viewport),N.copy(C.scissor),j=C.scissorTest}else G.copy(me).multiplyScalar(le).floor(),N.copy(Pe).multiplyScalar(le).floor(),j=de;if(ae!==0&&(ie=Ct),U.bindFramebuffer(B.FRAMEBUFFER,ie)&&ge&&U.drawBuffers(C,ie),U.viewport(G),U.scissor(N),U.setScissorTest(j),ye){let Fe=Y.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+$,Fe.__webglTexture,ae)}else if(Le){let Fe=$;for(let ke=0;ke<C.textures.length;ke++){let Xe=Y.get(C.textures[ke]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+ke,Xe.__webglTexture,ae,Fe)}}else if(C!==null&&ae!==0){let Fe=Y.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Fe.__webglTexture,ae)}D=-1},this.readRenderTargetPixels=function(C,$,ae,ge,ie,ye,Le,Fe=0){if(!C||!C.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){U.bindFramebuffer(B.FRAMEBUFFER,ke);try{let Xe=C.textures[Fe],Ge=Xe.format,je=Xe.type;if(!z.textureFormatReadable(Ge))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(je))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");$>=0&&$<=C.width-ge&&ae>=0&&ae<=C.height-ie&&(C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Fe),B.readPixels($,ae,ge,ie,Qe.convert(Ge),Qe.convert(je),ye))}finally{let Xe=W!==null?Y.get(W).__webglFramebuffer:null;U.bindFramebuffer(B.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(C,$,ae,ge,ie,ye,Le,Fe=0){if(!C||!C.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){if($>=0&&$<=C.width-ge&&ae>=0&&ae<=C.height-ie){U.bindFramebuffer(B.FRAMEBUFFER,ke);let Xe=C.textures[Fe],Ge=Xe.format,je=Xe.type;if(!z.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,nt),B.bufferData(B.PIXEL_PACK_BUFFER,ye.byteLength,B.STREAM_READ),C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Fe),B.readPixels($,ae,ge,ie,Qe.convert(Ge),Qe.convert(je),0);let Ze=W!==null?Y.get(W).__webglFramebuffer:null;U.bindFramebuffer(B.FRAMEBUFFER,Ze);let Lt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await yh(B,Lt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,nt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ye),B.deleteBuffer(nt),B.deleteSync(Lt),ye}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,$=null,ae=0){let ge=Math.pow(2,-ae),ie=Math.floor(C.image.width*ge),ye=Math.floor(C.image.height*ge),Le=$!==null?$.x:0,Fe=$!==null?$.y:0;J.setTexture2D(C,0),B.copyTexSubImage2D(B.TEXTURE_2D,ae,0,0,Le,Fe,ie,ye),U.unbindTexture()};let it=B.createFramebuffer(),Mt=B.createFramebuffer();this.copyTextureToTexture=function(C,$,ae=null,ge=null,ie=0,ye=null){let Le,Fe,ke,Xe,Ge,je,nt,Ze,Lt;ye===null&&(ie!==0?(hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ye=ie,ie=0):ye=0);let Ht=C.isCompressedTexture?C.mipmaps[ye]:C.image;if(ae!==null)Le=ae.max.x-ae.min.x,Fe=ae.max.y-ae.min.y,ke=ae.isBox3?ae.max.z-ae.min.z:1,Xe=ae.min.x,Ge=ae.min.y,je=ae.isBox3?ae.min.z:0;else{let Q=Math.pow(2,-ie);Le=Math.floor(Ht.width*Q),Fe=Math.floor(Ht.height*Q),ke=C.isDataArrayTexture?Ht.depth:C.isData3DTexture?Math.floor(Ht.depth*Q):1,Xe=0,Ge=0,je=0}ge!==null?(nt=ge.x,Ze=ge.y,Lt=ge.z):(nt=0,Ze=0,Lt=0);let St=Qe.convert($.format),ct=Qe.convert($.type),Rt;$.isData3DTexture?(J.setTexture3D($,0),Rt=B.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(J.setTexture2DArray($,0),Rt=B.TEXTURE_2D_ARRAY):(J.setTexture2D($,0),Rt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,$.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,$.unpackAlignment);let x=B.getParameter(B.UNPACK_ROW_LENGTH),T=B.getParameter(B.UNPACK_IMAGE_HEIGHT),L=B.getParameter(B.UNPACK_SKIP_PIXELS),Z=B.getParameter(B.UNPACK_SKIP_ROWS),F=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Ht.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ht.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Xe),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ge),B.pixelStorei(B.UNPACK_SKIP_IMAGES,je);let ee=C.isDataArrayTexture||C.isData3DTexture,V=$.isDataArrayTexture||$.isData3DTexture;if(C.isDepthTexture){let Q=Y.get(C),re=Y.get($),ce=Y.get(Q.__renderTarget),xe=Y.get(re.__renderTarget);U.bindFramebuffer(B.READ_FRAMEBUFFER,ce.__webglFramebuffer),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let be=0;be<ke;be++)ee&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Y.get(C).__webglTexture,ie,je+be),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Y.get($).__webglTexture,ye,Lt+be)),B.blitFramebuffer(Xe,Ge,Le,Fe,nt,Ze,Le,Fe,B.DEPTH_BUFFER_BIT,B.NEAREST);U.bindFramebuffer(B.READ_FRAMEBUFFER,null),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(ie!==0||C.isRenderTargetTexture||Y.has(C)){let Q=Y.get(C),re=Y.get($);U.bindFramebuffer(B.READ_FRAMEBUFFER,it),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,Mt);for(let ce=0;ce<ke;ce++)ee?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Q.__webglTexture,ie,je+ce):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Q.__webglTexture,ie),V?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,re.__webglTexture,ye,Lt+ce):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,re.__webglTexture,ye),ie!==0?B.blitFramebuffer(Xe,Ge,Le,Fe,nt,Ze,Le,Fe,B.COLOR_BUFFER_BIT,B.NEAREST):V?B.copyTexSubImage3D(Rt,ye,nt,Ze,Lt+ce,Xe,Ge,Le,Fe):B.copyTexSubImage2D(Rt,ye,nt,Ze,Xe,Ge,Le,Fe);U.bindFramebuffer(B.READ_FRAMEBUFFER,null),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else V?C.isDataTexture||C.isData3DTexture?B.texSubImage3D(Rt,ye,nt,Ze,Lt,Le,Fe,ke,St,ct,Ht.data):$.isCompressedArrayTexture?B.compressedTexSubImage3D(Rt,ye,nt,Ze,Lt,Le,Fe,ke,St,Ht.data):B.texSubImage3D(Rt,ye,nt,Ze,Lt,Le,Fe,ke,St,ct,Ht):C.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ye,nt,Ze,Le,Fe,St,ct,Ht.data):C.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ye,nt,Ze,Ht.width,Ht.height,St,Ht.data):B.texSubImage2D(B.TEXTURE_2D,ye,nt,Ze,Le,Fe,St,ct,Ht);B.pixelStorei(B.UNPACK_ROW_LENGTH,x),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,T),B.pixelStorei(B.UNPACK_SKIP_PIXELS,L),B.pixelStorei(B.UNPACK_SKIP_ROWS,Z),B.pixelStorei(B.UNPACK_SKIP_IMAGES,F),ye===0&&$.generateMipmaps&&B.generateMipmap(Rt),U.unbindTexture()},this.initRenderTarget=function(C){Y.get(C).__webglFramebuffer===void 0&&J.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?J.setTextureCube(C,0):C.isData3DTexture?J.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?J.setTexture2DArray(C,0):J.setTexture2D(C,0),U.unbindTexture()},this.resetState=function(){P=0,k=0,W=null,U.reset(),Jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}};async function eu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let oe=n.loadHelmet(!0,e.visor,!0,e.helmet);oe.naturalWidth||await new Promise((he,Se)=>{oe.addEventListener("load",he,{once:!0}),oe.addEventListener("error",Se,{once:!0})})}let s=n.renderCharacter(i,e),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let m=d.getContext("2d");m.drawImage(u,0,0,1024,1536);let p=m.getImageData(0,0,1024,1536).data,y=o.getImageData(0,0,1024,1536).data,f=h.getImageData(0,0,1024,1536).data;function g(oe,he,Se){let Ae=Math.max(0,Math.min(1535,Math.round(Se*1535))),Ue=Math.max(0,Math.min(1023,Math.round(he*1023)));if(oe[(Ae*1024+Ue)*4+3]>220)return he;for(let We=1;We<180;We++)for(let Ne of[Ue-We,Ue+We])if(Ne>=0&&Ne<1024&&oe[(Ae*1024+Ne)*4+3]>220)return Ne/1023;return he}let v=new Tt(a),_=new Tt(l),S=new Tt(d);for(let oe of[v,_,S])oe.colorSpace=ht,oe.anisotropy=4;let E=n.wardrobeSubcategory("pants",e.pants)==="shorts",P=e.suit?.endsWith("Tank"),k=e.suit?.endsWith("Tee"),W=["classic","ruby","midnight"].includes(e.suit),D=!!e.helmet&&e.helmet!=="none",I=new cn({uniforms:{idleTime:{value:0},idleStrength:{value:0},helmetOn:{value:D?1:0},shorts:{value:E?1:0},sleeveEnd:{value:P?.19:k?.29:.49},club:{value:W?1:0},portrait:{value:v},rear:{value:_},profile:{value:S},jacketColor:{value:new Ye(n.item("suit",e.suit).color)},pantsColor:{value:new Ye(n.item("pants",e.pants).color)},shoeColor:{value:new Ye(n.item("shoes",e.shoes).color)}},side:kt,vertexShader:`uniform float idleTime;uniform float idleStrength;attribute vec2 bodyUv;attribute float surface;attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;void main(){vBodyUv=bodyUv;vSurface=surface;vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;vNormal=normalMatrix*normal;vec3 p=position;float t=idleTime;float breath=sin(t*1.55)*idleStrength;float upper=1.-smoothstep(.45,.82,bodyUv.y);p.x+=sin(t*.54)*.008*upper*idleStrength;
if(surface>0.5&&surface<1.5){float chest=exp(-pow((bodyUv.y-.30)/.13,2.));p.z+=breath*.012*chest;p.y+=breath*.005*chest;}
if(surface>1.5&&surface<3.5){float a=sin(t*.82+sign(p.x)*.4)*.008*idleStrength;vec2 pivot=vec2(sign(p.x)*.50,1.16);p.xy=pivot+mat2(cos(a),-sin(a),sin(a),cos(a))*(p.xy-pivot);}
if(surface>5.5&&surface<6.5){float a=sin(t*.43)*.018*idleStrength;vec2 pivot=vec2(0.,.10);p.xz=pivot+mat2(cos(a),-sin(a),sin(a),cos(a))*(p.xz-pivot);p.y+=breath*.004;}
gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`uniform float helmetOn;uniform float shorts;uniform float sleeveEnd;uniform float club;uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}vec3 dressed(vec3 c,float y,float x){
 if(vSurface>4.5&&vSurface<5.5){float sole=smoothstep(.959,.968,y);float upperPanel=smoothstep(.85,.89,y)*(1.-smoothstep(.93,.95,y));vec3 leather=mix(shoeColor*.60,vec3(.07,.075,.08),upperPanel);float stitch=1.-.12*exp(-pow((y-.945)/.0025,2.));return mix(leather*stitch,vec3(.78,.79,.77),sole);}
 if(vSurface>6.5&&y>.19)return jacketColor*.75;
 float arm=step(1.5,vSurface)*(1.-step(2.5,vSurface));
 float legs=step(3.5,vSurface)*(1.-step(4.5,vSurface));
 if(vSurface>5.5&&vSurface<6.5&&helmetOn>.5){float stripe=1.-smoothstep(.017,.024,abs(x-.505));vec3 shell=mix(vec3(.80,.82,.83),vec3(.65,.015,.018),stripe);float visorBand=smoothstep(.045,.055,y)*(1.-smoothstep(.098,.112,y))*smoothstep(-.65,.15,vFront);shell=mix(shell,vec3(.025,.035,.045),visorBand);float vent=step(.105,y)*(1.-step(.155,y))*(1.-smoothstep(.08,.11,abs(x-.505)));return shell*(1.-vent*.38);}
 if(vSurface>2.5&&vSurface<3.5){return texture2D(portrait,vUv).rgb;}
 if((legs>.5&&shorts>.5&&y>.65)||(arm>.5&&y>sleeveEnd)){return texture2D(portrait,vUv).rgb*.86;}
 if(vSurface<1.5||(arm>.5&&y<sleeveEnd)){if(club>.5)return c;float weave=.81+.008*sin(y*85.)*sin(x*110.);float seam=1.-.10*exp(-pow((x-.505)/.003,2.));return jacketColor*weave*seam;}
 if(legs>.5&&y<(shorts>.5?.65:.85)){float fold=.78+.04*sin(x*44.+y*14.);return pantsColor*fold;}return c;
}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);b=dressed(b,vBodyUv.y,vBodyUv.x);s=dressed(s,vBodyUv.y,vBodyUv.x);float f=smoothstep(.22,.78,vFront)*a.a;vec3 n=normalize(vNormal);vec3 lamp=normalize(vec3(-.55,.85,1.));float light=.62+.34*max(0.,dot(n,lamp))+.09*max(0.,dot(n,normalize(vec3(.7,.2,-1.))));float underArm=exp(-pow((abs(vBodyUv.x-.5)-.19)/.025,2.))*exp(-pow((vBodyUv.y-.30)/.11,2.));float collar=exp(-pow((vBodyUv.y-.192)/.018,2.))*exp(-pow((vBodyUv.x-.5)/.09,2.));light*=1.-.13*underArm-.12*collar;vec3 color=mix(b,a.rgb,f);float sideAmount=(1.-smoothstep(.05,.72,abs(vFront)))*step(5.5,vSurface)*(1.-helmetOn);color=mix(color,s,sideAmount)*light;float hardSurface=step(4.5,vSurface)*(1.-step(6.5,vSurface));float gloss=mix(.025,.16,hardSurface);float highlight=pow(max(0.,dot(reflect(-lamp,n),vec3(0.,0.,1.))),mix(14.,48.,hardSurface));float rim=pow(1.-abs(n.z),3.)*.045;color+=vec3(1.,.90,.75)*(highlight*gloss+rim);gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`}),G=new Ke,N=[];function j(oe,{rings:he=70,sides:Se=80,muzzle:Ae=!1,folds:Ue=0,z:We=0,surface:Ne=0}={}){let $e=[],Ie=[],He=[],tt=[],Ft=[],Be=[],lt=[],Qe=[],Jt=oe[0][0],bt=oe.at(-1)[0];function B(st){let Ve=0;for(;Ve<oe.length-2&&oe[Ve+1][0]<st;)Ve++;let Ot=oe[Ve],yt=oe[Ve+1],Xt=Math.max(0,Math.min(1,(st-Ot[0])/(yt[0]-Ot[0])));return Ot.map((Bt,Vt)=>{if(Vt===0)return st;let nn=oe[Math.max(0,Ve-1)][Vt]||0,mn=oe[Math.min(oe.length-1,Ve+2)][Vt]||0,un=yt[Vt]||0;return Math.max(Math.min(Bt,un),Math.min(Math.max(Bt,un),.5*(2*Bt+(-nn+un)*Xt+(2*nn-5*Bt+4*un-mn)*Xt*Xt+(-nn+3*Bt-3*un+mn)*Xt*Xt*Xt)))})}for(let st=0;st<=he;st++){let Ve=Jt+(bt-Jt)*st/he,[,Ot,yt,Xt,Bt=0]=B(Ve),Vt=(Ot+yt)/2,nn=(yt-Ot)/2;for(let mn=0;mn<=Se;mn++){let un=2*Math.PI*mn/Se,Cn=Math.cos(un),rn=Math.sin(un),en=Vt+nn*Cn,Pi=Xt*(1+Ue*Math.sin(Ve*260+un*4)*Math.sin(Math.PI*st/he)),Kt=We+Bt+Pi*rn;if(Ae&&rn>0){let Ct=(en-.507)/.085;Kt+=.17*Math.exp(-(Ct*Ct)-((Ve-.126)/.031)**2)*rn*rn,Kt+=.045*Math.exp(-(((en-.505)/.05)**2)-((Ve-.104)/.015)**2)*rn,Kt-=.028*(Math.exp(-(((en-.466)/.024)**2))+Math.exp(-(((en-.55)/.024)**2)))*Math.exp(-(((Ve-.077)/.013)**2))*rn}$e.push(((Ne===5?Vt+(en-Vt)*.88:en)-.5)*2.55,(.5-Ve)*3.825,Ne===5?Kt*.84:Kt),Be.push(en,Ve),lt.push(Ne),Ie.push(g(y,en,Ve),1-Ve);let wt=Ve,At=en;Ae?wt=.008+(Ve-.008)*.74:Jt<.24&&bt>.4&&Ot>.29&&yt<.72&&(wt=.14+(Ve-.165)*1.08),Jt>.82&&(At=Vt+(en-Vt)*.8),He.push(g(f,At,wt),1-wt);let ut=Ae?Ve*.92:Ve,jn=(Ae?.45:.49)+Kt*.4;if(Jt>=.45&&bt>.62&&Ve>.49&&Ve<.62&&(jn=Math.min(jn,.43)),tt.push(g(p,jn,ut),1-ut),Ft.push(rn),st<he&&mn<Se){let Ct=st*(Se+1)+mn,it=Ct+Se+1;Qe.push(Ct,Ct+1,it,Ct+1,it+1,it)}}}for(let st of[0,he]){let Ve=st*(Se+1),Ot=$e.length/3;for(let[yt,Xt]of[[$e,3],[Ie,2],[He,2],[tt,2],[Be,2]])for(let Bt=0;Bt<Xt;Bt++){let Vt=0;for(let nn=0;nn<Se;nn++)Vt+=yt[(Ve+nn)*Xt+Bt];yt.push(Vt/Se)}lt.push(Ne),Ft.push(0);for(let yt=0;yt<Se;yt++)st===0?Qe.push(Ot,Ve+yt+1,Ve+yt):Qe.push(Ot,Ve+yt,Ve+yt+1)}let mt=new dt;mt.setAttribute("bodyUv",new Oe(Be,2)),mt.setAttribute("surface",new Oe(lt,1)),mt.setAttribute("position",new Oe($e,3)),mt.setAttribute("uv",new Oe(Ie,2)),mt.setAttribute("rearUv",new Oe(He,2)),mt.setAttribute("profileUv",new Oe(tt,2)),mt.setAttribute("frontWeight",new Oe(Ft,1)),mt.setIndex(Qe),mt.computeVertexNormals(),G.add(new gt(mt,I)),N.push(mt)}j([[.165,.435,.575,.1],[.19,.35,.65,.21],[.245,.313,.69,.28],[.32,.32,.69,.28],[.4,.31,.69,.255],[.455,.315,.68,.225],[.475,.37,.63,.18]],{folds:.025,surface:1}),j([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),j(D?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!D,z:.1,rings:110,sides:112,surface:6}),D||(j([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),j([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let oe of[-1,1]){let he=Se=>oe<0?Se:Se.map(([Ae,Ue,We,Ne,$e])=>[Ae,1-We,1-Ue,Ne,$e||0]);j(he([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.32,.185,.303,.15],[.37,.167,.276,.135],[.43,.141,.254,.13],[.475,.145,.234,.105],[.49,.153,.23,.085]]),{z:-.025,folds:.025,rings:100,surface:2}),j(he([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}),j(he([[.478,.168,.221,.055],[.493,.151,.23,.08],[.525,.146,.251,.09],[.544,.153,.247,.085],[.56,.166,.241,.065],[.567,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let Se=0;Se<4;Se++){let Ae=.166+Se*.018,Ue=.55+Se*.004;j(he([[Ue,Ae,Ae+.019,.025],[Ue+.025,Ae-.002,Ae+.02,.028],[Ue+.041,Ae+.003,Ae+.017,.007]]),{z:.07,rings:18,sides:24,surface:3})}j(he([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}j([[.454,.36,.65,.17],[.48,.303,.7,.24],[.53,.29,.713,.25],[.58,.3,.7,.23],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let oe of[-1,1]){let he=Se=>oe<0?Se:Se.map(([Ae,Ue,We,Ne,$e])=>[Ae,1-We,1-Ue,Ne,$e||0]);j(he([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,E?.3:.271,E?.425:.44,E?.145:.19],[.74,E?.285:.252,E?.405:.423,E?.14:.185],[.79,E?.275:.242,E?.385:.397,E?.12:.165],[.826,E?.28:.254,E?.375:.39,E?.11:.155],[.843,.283,.372,.105]]),{z:-.01,folds:.012,rings:110,surface:4}),j(he([[.829,.275,.373,.095],[.848,.27,.389,.135],[.875,.25,.394,.19],[.907,.207,.397,.245],[.944,.165,.4,.285],[.966,.154,.393,.255],[.98,.18,.37,.16],[.986,.26,.31,.01]]),{z:.1,folds:.009,rings:85,surface:5})}let X=new pn;X.add(G);let K=new Fn({alpha:!0,antialias:!0});K.setPixelRatio(Math.min(devicePixelRatio,2)),K.outputColorSpace=ht,r.append(K.domElement),K.domElement.setAttribute("role","img"),K.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let te=new gi(-1.5,1.5,2.05,-2.05,.1,30);te.position.set(0,0,8);let ue=t.yaw||0,le=t.pitch||0,Te=null,ne,me=!1,Pe=!1,de=0,Me=window.matchMedia?.("(prefers-reduced-motion: reduce)"),fe="full",q=t.focusOrbit||null,we=2.05,A=0,b=0;function H(oe){oe=oe==="watch"?"watch":"full",oe!==fe&&(oe==="watch"?(q=q||{yaw:ue,pitch:le},t.focusOrbit=q,ue=0,le=0):q&&(ue=q.yaw,le=q.pitch,q=null,delete t.focusOrbit),t.yaw=ue,t.pitch=le,fe=oe,r.dataset.focus=fe)}function O(oe){let he=r.clientWidth/Math.max(1,r.clientHeight),Se=fe==="watch",Ae=Se?Math.max(.4,.3/he):Math.max(2.05,1.17/he),Ue=Se?.76*Math.cos(ue)+.1*Math.sin(ue):0,We=Se?.04*Math.cos(le)-(.1*Math.cos(ue)-.76*Math.sin(ue))*Math.sin(le):0,Ne=1-Math.exp(-oe*12);we+=(Ae-we)*Ne,A+=(Ue-A)*Ne,b+=(We-b)*Ne,te.left=A-we*he,te.right=A+we*he,te.top=b+we,te.bottom=b-we,te.updateProjectionMatrix()}let M=()=>{!r.clientWidth||!r.clientHeight||(O(1),K.setSize(r.clientWidth,r.clientHeight,!1))},R=new ResizeObserver(M);R.observe(r),M();let z=oe=>{Pe=!1,Te={id:oe.pointerId,x:oe.clientX,y:oe.clientY},r.setPointerCapture(oe.pointerId),oe.preventDefault()},U=oe=>{!Te||Te.id!==oe.pointerId||(ue+=(oe.clientX-Te.x)*.012,le=Math.max(-.35,Math.min(.35,le+(oe.clientY-Te.y)*.006)),Te.x=oe.clientX,Te.y=oe.clientY)},se=()=>{Te=null},Y=oe=>{["ArrowLeft","ArrowRight"].includes(oe.key)&&(ue+=oe.key==="ArrowLeft"?-.15:.15,oe.preventDefault())};r.addEventListener("pointerdown",z),r.addEventListener("pointermove",U),r.addEventListener("pointerup",se),r.addEventListener("pointercancel",se),r.addEventListener("keydown",Y);function J(oe=0){if(!me){if(!r.isConnected){_e();return}Pe&&!Te&&de&&(ue+=Math.min(.05,(oe-de)/1e3)*.35),I.uniforms.idleTime.value=oe/1e3,I.uniforms.idleStrength.value=!Me?.matches&&!Te&&fe==="full"?1:0,O(de?Math.min(.05,(oe-de)/1e3):.016),de=oe,G.rotation.set(le,ue,0),t.yaw=ue,t.pitch=le,r.dataset.yaw=String(ue),K.render(X,te),ne=requestAnimationFrame(J)}}return J(),{state:t,setFocus:H,setYaw(oe){ue=oe},setAutoRotate(oe){Pe=!!oe},dispose:_e};function _e(){if(!me){me=!0,cancelAnimationFrame(ne),R.disconnect();for(let[oe,he]of[["pointerdown",z],["pointermove",U],["pointerup",se],["pointercancel",se],["keydown",Y]])r.removeEventListener(oe,he);for(let oe of N)oe.dispose();I.dispose(),v.dispose(),_.dispose(),S.dispose(),K.dispose(),K.forceContextLoss(),K.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new pn,s=new Ke;i.add(s);let a=new Fn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ht,a.toneMapping=ti,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new zt(34,1,.1,40);i.add(new Vn("#dcecff","#50402b",2));for(let[q,we,A,b]of[[3,6,5,4],[-3,3,-3,3]]){let H=new Hn("#fff0dd",b);H.position.set(q,we,A),i.add(H)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let q=0;q<128;q+=2)l.fillStyle=q%4?"#808080":"#b0b0b0",l.fillRect(0,q,128,1);for(let q=0;q<128;q+=3)l.fillStyle="#888888",l.fillRect(q,0,1,128);let h=new Tt(c);h.wrapS=h.wrapT=Gn,h.repeat.set(8,8);let u=(q,we=0,A=.7)=>new Nn({color:q,metalness:we,roughness:A}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),y=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),v=u("#171b20"),_=u("#171b20"),S=u("#826222",.9,.18);for(let q of[g,v,p])q.bumpMap=h,q.bumpScale=.012;function E(q,we,A,b,H,O,M,R=s){let z=new gt(new tn(1,40,28),q);return z.position.set(we,A,b),z.scale.set(H,O,M),R.add(z),z}function P(q,we,A,b,H=b){let O=new w(...we),M=new w(...A),R=M.clone().sub(O),z=new gt(b>.1?new mr((b+H)/2,Math.max(.01,R.length()-(b+H)),10,32):new Je(H,b,R.length(),16),q);return z.position.copy(O.add(M).multiplyScalar(.5)),z.quaternion.setFromUnitVectors(new w(0,1,0),R.normalize()),s.add(z),z}E(v,0,1.64,0,.47,.36,.26),E(g,0,2.32,0,.59,.65,.32),E(p,0,2.35,.29,.27,.49,.055);for(let q of[-1,1]){P(v,[q*.27,1.67,0],[q*.29,.92,.015],.23,.25),E(v,q*.29,.92,.015,.23,.24,.24),P(v,[q*.29,.94,.015],[q*.32,.28,0],.16,.22),P(y,[q*.45,1.55,.03],[q*.48,.36,.03],.025,.032),E(_,q*.32,.18,.15,.22,.19,.39),E(y,q*.32,.075,.15,.235,.065,.4),E(y,q*.32,.27,.12,.135,.08,.2);for(let we=0;we<5;we++)P(y,[q*.32-.1,.29,.08+we*.04],[q*.32+.1,.29,.08+we*.04],.009);E(g,q*.55,2.63,0,.26,.27,.29),P(g,[q*.57,2.63,0],[q*.76,2.12,.02],.19,.23),E(g,q*.76,2.12,.02,.19,.2,.2),P(g,[q*.76,2.12,.02],[q*.88,1.65,.08],.13,.18),P(y,[q*.71,2.6,.15],[q*.99,1.72,.15],.035),E(p,q*.88,1.67,.08,.145,.09,.15),E(d,q*.89,1.48,.1,.16,.22,.12);for(let we=0;we<4;we++)E(m,q*(.79+we*.065),1.36,.15,.035,.13,.045);E(m,q*.75,1.48,.2,.06,.12,.06)}E(d,0,3.04,0,.25,.27,.24),E(d,0,3.39,0,.36,.43,.31);for(let q of[-1,1])E(m,q*.36,3.4,.01,.12,.17,.09),E(d,q*.36,3.4,.065,.065,.1,.035),E(m,q*.15,3.43,.258,.15,.12,.075),E(p,q*.14,3.44,.32,.045,.035,.02),E(y,q*.13,3.45,.335,.009,.01,.006),E(d,q*.15,3.53,.28,.18,.05,.07);E(m,0,3.23,.27,.26,.18,.13),E(m,0,3.34,.34,.14,.08,.08),E(p,0,3.17,.375,.17,.017,.018),E(m,0,3.13,.36,.17,.035,.025);let k=new Ke;s.add(k),E(p,0,3.51,-.02,.41,.42,.35,k),E(f,0,3.64,.015,.07,.3,.36,k);for(let q of[-1,1])E(p,q*.32,3.29,.015,.1,.31,.24,k),E(f,q*.39,3.43,.07,.025,.05,.05,k);let W=E(S,0,3.44,.27,.38,.19,.14,k);for(let q of[-1,1])P(p,[q*.28,2.88,.25],[q*.1,2.58,.33],.035),P(p,[q*.3,2.28,.3],[q*.39,2.09,.26],.018);for(let q=0;q<6;q++)E(f,0,2.03+q*.14,.35,.015,.015,.01);let D=document.createElement("canvas");D.width=512,D.height=256;let I=D.getContext("2d"),G=new Tt(D);G.colorSpace=ht;let N=new gt(new Wt(.28,.12),new Nn({map:G,roughness:.9}));N.position.set(-.27,2.46,.317),s.add(N);let j=new Ke;for(let q=0;q<3;q++)for(let we=0;we<5;we++){let A=new gt(new Wt(.048,.048),(we+q)%2?p:y);A.position.set(-.36+we*.048,2.62+q*.048,.318),j.add(A)}s.add(j);function X(q){g.color.set(n.item("suit",q.suit).color),v.color.set(n.item("pants",q.pants).color),_.color.set(n.item("shoes",q.shoes).color),k.visible=q.helmet!=="none",W.position.y=q.visor==="open"?3.71:3.44,W.rotation.x=q.visor==="open"?-.8:0,N.visible=q.patch!=="none",I.fillStyle="#22282b",I.fillRect(0,0,512,256),I.strokeStyle="#c9af74",I.lineWidth=12,I.strokeRect(8,8,496,240),I.fillStyle="#eee0b5",I.font="bold 72px Arial",I.textAlign="center",I.fillText(q.patch==="name"?q.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":q.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),G.needsUpdate=!0}X(e),t.yaw??=0,t.pitch??=.07;let K=null,te,ue=!1;function le(){let q=r.clientWidth,we=r.clientHeight;!q||!we||(a.setSize(q,we,!1),o.aspect=q/we,o.updateProjectionMatrix())}let Te=new ResizeObserver(le);Te.observe(r),le();let ne=q=>{K={id:q.pointerId,x:q.clientX,y:q.clientY},r.setPointerCapture(q.pointerId),q.preventDefault()},me=q=>{!K||K.id!==q.pointerId||(t.yaw-=(q.clientX-K.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(q.clientY-K.y)*.006)),K.x=q.clientX,K.y=q.clientY)},Pe=()=>{K=null},de=q=>{(q.key==="ArrowLeft"||q.key==="ArrowRight")&&(t.yaw+=q.key==="ArrowLeft"?.15:-.15,q.preventDefault())};r.addEventListener("pointerdown",ne),r.addEventListener("pointermove",me),r.addEventListener("pointerup",Pe),r.addEventListener("pointercancel",Pe),r.addEventListener("keydown",de);function Me(){if(ue)return;ue=!0,cancelAnimationFrame(te),Te.disconnect();for(let[we,A]of[["pointerdown",ne],["pointermove",me],["pointerup",Pe],["pointercancel",Pe],["keydown",de]])r.removeEventListener(we,A);let q=new Set;i.traverse(we=>{we.geometry?.dispose(),we.material&&q.add(we.material)});for(let we of q)we.dispose();G.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function fe(){if(ue)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Me();return}let q=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*q,1.95+Math.sin(t.pitch)*q,Math.cos(t.yaw)*Math.cos(t.pitch)*q),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),te=requestAnimationFrame(fe)}return fe(),{update:X,dispose:Me,state:t}};function Jl(r){let e=new Ke;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(D,I,G)=>new En({color:D,metalness:I,roughness:G,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(D,I,G=0,N=0,j=0)=>{let X=new gt(D,I);return X.position.set(G,N,j),X.castShadow=X.receiveShadow=!0,e.add(X),X},h=(D,I,G,N=!0)=>{let j=new vn;return j.absarc(I,G,D,0,Math.PI*2,N),j},u=t?.395:.437,d=new Qt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let D=0;D<24;D++)for(let[I,G]of[[.28,0],[.36,.045]]){let N=D*Math.PI/12+G;d.holes.push(h(n?.009:.011,Math.cos(N)*I,Math.sin(N)*I))}for(let D of[0,.033])l(new qt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,D);let m=new _t(.22,.014,.025),p=new Kr(m,a,32),y=new et;for(let D=0;D<32;D++){let I=D*Math.PI/16;y.compose(new w(Math.cos(I)*.31,Math.sin(I)*.31,.021),new bn().setFromAxisAngle(new w(0,0,1),I+.18),new w(1,1,1)),p.setMatrixAt(D,y)}e.add(p);let f=l(new Je(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new Je(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let D=0;D<10;D++){let I=D*Math.PI/5,G=l(new Je(.017,.017,.015,12),s,Math.cos(I)*.18,Math.sin(I)*.18,.05);G.rotation.x=Math.PI/2;let N=l(new Je(.009,.009,.018,6),a,Math.cos(I)*.18,Math.sin(I)*.18,.058);N.rotation.x=Math.PI/2}for(let D of[.235,.26,.31,.335,.39,.414])if(D<u){let I=l(new It(D,.0012,3,96),a,0,0,.042);I.castShadow=!1}if(!t)for(let D=0;D<8;D++){let I=D*Math.PI/4,G=[.25,.29,.34,.395].map((j,X)=>new w(Math.cos(I+X*.075)*j,Math.sin(I+X*.075)*j,.043)),N=l(new Ut(new Nt(G),12,.0024,3,!1),a);N.castShadow=!1}let v=new Qt;v.moveTo(-.08,-.2),v.quadraticCurveTo(-.13,-.15,-.115,-.06),v.lineTo(-.115,.1),v.quadraticCurveTo(-.12,.19,-.05,.215),v.lineTo(.055,.19),v.quadraticCurveTo(.11,.14,.105,.06),v.lineTo(.105,-.1),v.quadraticCurveTo(.1,-.19,.04,-.21),v.closePath();let _=l(new qt(v,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&_.scale.set(.8,.8,.8),l(new _t(.09,.31,.032),a,.27,0,.005);for(let D of[-.125,0,.125]){let I=l(new Je(.055,.055,.028,24),c,.354,D,.07);I.rotation.x=Math.PI/2}for(let D of[-.155,.155]){let I=l(new Je(.014,.014,.025,6),s,.325,D,.094);I.rotation.x=Math.PI/2}let S=document.createElement("canvas");S.width=128,S.height=384;let E=S.getContext("2d");E.fillStyle="#f5f0df",E.translate(64,192),E.rotate(-Math.PI/2),E.textAlign="center",E.font="italic bold 60px Arial",E.fillText(t?"P21":"P21 SPORT",0,20);let P=new Tt(S);P.colorSpace=ht;let k=l(new Wt(.075,.24),new Un({map:P,transparent:!0,depthWrite:!1}),.329,0,.1);k.castShadow=!1;let W=l(new Je(.012,.014,.047,6),s,.36,.217,.042);return W.rotation.z=.2,e}var Zl;function tu(r,e){if(!r.isConnected)return;if(!Zl){let a=new Fn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ht,a.toneMapping=ti,a.toneMappingExposure=1.15;let o=new pn;o.add(new Vn("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new Hn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new zt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),Zl={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=Zl;s[e]||(s[e]=Jl(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function $l(r){let e=new Ke;e.name="sport-seat-"+r;let t=(I,G=.8,N=0)=>new En({color:I,roughness:G,metalness:N,clearcoat:N?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),m=document.createElement("canvas");m.width=m.height=64;let p=m.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let G=0;G<64;G+=8)p.fillStyle=(G+I)%16?"#121820":"#626973",p.fillRect(G,I,7,3),p.fillStyle="#252b33",p.fillRect(G,I+4,3,4);let y=new Tt(m);y.wrapS=y.wrapT=Gn,y.repeat.set(3,5),y.colorSpace=ht,c.map=y,c.bumpMap=y,c.bumpScale=.004;let f=(I,G,N=0,j=0,X=0,K=e)=>{let te=new gt(I,G);return te.position.set(N,j,X),te.castShadow=te.receiveShadow=!0,K.add(te),te},g=(I,G,N,j,X,K,te,ue,le=e)=>{let Te=new Qt,ne=-I/2,me=-G/2;return j=Math.min(j,I/2,G/2,N/2),Te.moveTo(ne+j,me),Te.lineTo(ne+I-j,me),Te.quadraticCurveTo(ne+I,me,ne+I,me+j),Te.lineTo(ne+I,me+G-j),Te.quadraticCurveTo(ne+I,me+G,ne+I-j,me+G),Te.lineTo(ne+j,me+G),Te.quadraticCurveTo(ne,me+G,ne,me+G-j),Te.lineTo(ne,me+j),Te.quadraticCurveTo(ne,me,ne+j,me),f(new qt(Te,{depth:N-2*j,bevelEnabled:!0,bevelSize:j,bevelThickness:j,bevelSegments:4,curveSegments:12}),X,K,te,ue-N/2+j,le)},v=(I,G,N,j=e)=>f(new Ut(new Nt(I.map(X=>new w(...X))),32,G,6,!1),N,0,0,0,j),_=new Ke;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let S=new Qt;S.moveTo(-.29,0),S.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),S.lineTo(-.47,.92),S.quadraticCurveTo(-.46,1.02,-.34,1.11),S.lineTo(-.28,1.21),S.lineTo(-.26,1.48),S.quadraticCurveTo(0,1.62,.26,1.48),S.lineTo(.28,1.21),S.lineTo(.34,1.11),S.quadraticCurveTo(.46,1.02,.47,.92),S.lineTo(.43,.65),S.bezierCurveTo(.39,.42,.38,.2,.29,0),S.closePath();for(let I of[-.135,.135]){let G=new vn;G.moveTo(I-.075,1.24),G.lineTo(I+.075,1.24),G.lineTo(I+.075,1.34),G.lineTo(I-.075,1.34),G.closePath(),S.holes.push(G)}f(new qt(S,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,_),f(new qt(S,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,_),g(.46,.5,.12,.035,o,0,.85,.065,_),g(.45,.31,.17,.04,o,0,.4,.1,_);for(let I of[-1,1]){let G=g(.17,.42,.19,.055,a,I*.34,.98,.1,_);G.rotation.z=I*.28,G.rotation.y=-I*.25;let N=g(.13,.55,.23,.045,a,I*.3,.49,.14,_);N.rotation.z=-I*.12,v([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,l,_);let j=I*.135;for(let X of[1.235,1.345])g(.16,.014,.022,.004,h,j,X,.015,_);for(let X of[j-.08,j+.08])g(.014,.12,.022,.004,h,X,1.29,.015,_)}let P=g(n?.86:.77,.18,.84,.055,c,0,.38,.34);P.name="seat-base";let k=g(n?.61:.54,.17,i?.74:.67,.05,o,0,.535,.39);k.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let I of[-.28,.28])g(.07,.3,.65,.018,h,I,.16,.34);for(let I of[.2,.33,.46,.59])v([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,l);if(n){for(let I of[-1,1])g(.14,.13,.64,.04,a,I*.45,.65,.32),g(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let G of[-.1,.1])v([[G-.1,I,.18],[G,I+.07,.18],[G+.1,I,.18]],.003,l,_)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),v([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let I of[-1,1]){let G=g(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);G.rotation.z=-I*.12,v([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let N of[.02,.65])g(.13,.09,.12,.015,c,I*.28,-.055,N),f(new Je(.022,.022,.015,12),h,I*.28,-.002,N)}for(let I=.3;I<1.08;I+=.11)v([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,l,_);for(let I of[-1,1]){let G=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],N=[],j=[];G.forEach(([ue,le,Te],ne)=>{N.push(ue-.033,le,Te,ue+.033,le,Te),ne&&j.push(ne*2-2,ne*2-1,ne*2,ne*2-1,ne*2+1,ne*2)});let X=new dt;X.setAttribute("position",new Oe(N,3)),X.setIndex(j),X.computeVertexNormals();let K=u.clone();K.side=kt,f(X,K);let te=g(.27,.055,.025,.008,u,I*.18,.64,.45);te.rotation.z=-I*.2}let W=f(new Je(.065,.065,.035,24),h,0,.66,.48);W.rotation.x=Math.PI/2;let D=f(new Je(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);return D.rotation.x=Math.PI/2,e}var Kl;function nu(r,e){if(!r.isConnected||e==="none")return;if(!Kl){let a=new Fn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ht,a.toneMapping=ti,a.toneMappingExposure=1.25;let o=new pn;o.add(new Vn("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new Hn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new zt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),Kl={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=Kl;s[e]||(s[e]=$l(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=eu;window.pokerPaintBrakePreview=tu;window.pokerPaintSeatPreview=nu;var iu=(r,e,t)=>Math.max(e,Math.min(t,r));function gp(r,e){let t=window.PokerGarage,n=new Ke;r.add(n),n.scale.set(1.24,.86,.95);let i=(x,T,L)=>new En({color:x,metalness:T,roughness:L,clearcoat:T>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(x,T,L=0,Z=0,F=0,ee=n){let V=new gt(x,T);return V.position.set(L,Z,F),V.castShadow=!0,V.receiveShadow=!0,ee.add(V),V}let y=(x,T,L,Z,F,ee,V)=>p(new _t(x,T,L),Z,F,ee,V);function f(x,T,L,Z,F,ee,V="y"){let Q=p(new Je(x,x,T,64),L,Z,F,ee);return V==="z"&&(Q.rotation.x=Math.PI/2),V==="x"&&(Q.rotation.z=Math.PI/2),Q}function g(x,T,L,Z,F,ee,V="z"){let Q=p(new It(x,T,12,80),L,Z,F,ee);return V==="y"&&(Q.rotation.x=Math.PI/2),V==="x"&&(Q.rotation.y=Math.PI/2),Q}function v(x,T,L,Z=Qt){let F=new Z,ee=-x/2,V=-T/2;return L=Math.min(L,T/2-.001),F.moveTo(ee+L,V),F.lineTo(ee+x-L,V),F.quadraticCurveTo(ee+x,V,ee+x,V+L),F.lineTo(ee+x,V+T-L),F.quadraticCurveTo(ee+x,V+T,ee+x-L,V+T),F.lineTo(ee+L,V+T),F.quadraticCurveTo(ee,V+T,ee,V+T-L),F.lineTo(ee,V+L),F.quadraticCurveTo(ee,V,ee+L,V),F}function _(x,T,L,Z,F,ee,V=null,Q=.025){let re=v(x,T,Z);if(V){let xe=v(V[0],V[1],V[2],vn),be=new vn(xe.getPoints(40).map(Ee=>new ve(Ee.x+(V[3]||0),Ee.y)));re.holes.push(be)}let ce=p(new qt(re,{depth:L,bevelEnabled:Q>0,bevelSize:Q,bevelThickness:Q,bevelSegments:4,curveSegments:40}),F,0,ee,0);return ce.rotation.x=-Math.PI/2,ce}let S=[3.02,1.51,.65,-.28],E=v(4.96,2.44,1.15).getSpacedPoints(128),P=[],k=[],W=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[x,T]of W)for(let L=0;L<128;L++){let Z=E[L];P.push(Z.x*T,x,-Z.y*T)}for(let x=0;x<3;x++)for(let T=0;T<128;T++){let L=x*128+T,Z=x*128+(T+1)%128;k.push(L,Z,L+128,Z,Z+128,L+128)}let D=new dt;D.setAttribute("position",new Oe(P,3)),D.setIndex(k),D.computeVertexNormals(),s.side=kt,p(D,s),_(5.03,2.51,.065,1.19,o,.58,null,.035),_(5.1,2.58,.09,1.22,o,1.25,S,.035);let I=new Nt(v(4.94,2.42,1.15).getPoints(40).map(x=>new w(x.x,1.44,-x.y)),!0,"centripetal");p(new Ut(I,240,.125,16,!0),u);for(let x of[-1,1]){let T=Array.from({length:21},(L,Z)=>{let F=.26+Z*.25/20;return new w(1.32+1.15*Math.cos(F),1.44,x*(.06+1.15*Math.sin(F)))});p(new Ut(new Nt(T),32,.132,20,!1),o)}_(4.65,2.14,.035,1.03,o,1.39,S,.015),_(4.52,2.01,.025,.97,a,1.43,S,.01);let G=_(2.98,1.47,.025,.63,a,.94);G.position.x=-.28;let N=new En({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:kt,polygonOffset:!0,polygonOffsetFactor:-1}),j=new Gi(v(2.9,1.4,.6)),X=j.attributes.position,K=j.attributes.uv;for(let x=0;x<X.count;x++)K.setXY(x,(X.getX(x)+1.45)/2.9,(X.getY(x)+.7)/1.4);let te=p(j,N,-.28,1.005,0);te.rotation.x=-Math.PI/2,te.castShadow=!1;let ue=N.clone(),le=[];for(let x of[-1,1]){let T=p(new Wt(3.05,.3),ue,0,1.04,x*1.329);x<0&&(T.rotation.y=Math.PI),T.castShadow=!1,le.push(T)}function Te(x){let T=x.vinyl||"none";te.visible=T!=="none",le.forEach(Z=>Z.visible=T!=="none");let L=T+":"+(x.vinylText||"");if(N.userData.id!==L){N.map?.dispose(),ue.map?.dispose(),N.map=new Tt(t.vinylCanvas(T,!1,x.vinylText)),ue.map=new Tt(t.vinylCanvas(T,!0,x.vinylText));for(let Z of[N,ue]){Z.map.colorSpace=ht,Z.map.anisotropy=16;let F=Z.map;F.image.addEventListener("vinyl-ready",()=>{F.needsUpdate=!0},{once:!0}),Z.needsUpdate=!0,Z.userData.id=L}}}let ne=_(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);ne.position.x=-.28;let me=_(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);me.position.x=-.28;for(let x of[-1,-.35,.35])for(let T of[-.75,.75])y(.011,.4,.009,h,x,1.2,T);function Pe(x,T){let L=document.createElement("canvas");L.width=L.height=256;let Z=L.getContext("2d");Z.fillStyle=x,Z.fillRect(0,0,256,256);let F=17;for(let V=0;V<18e3;V++)F=F*1664525+1013904223>>>0,Z.fillStyle="rgba(0,0,0,"+T+")",Z.fillRect(F%256,(F>>>8)%256,1,1);let ee=new Tt(L);return ee.colorSpace=ht,ee.wrapS=ee.wrapT=Gn,ee}a.map=Pe("#e8e8e8",.035),a.bumpMap=Pe("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=Pe("#888888",.12),c.bumpScale=.003,u.bumpMap=Pe("#888888",.3),u.bumpScale=.001;function de(x,T,L,Z,F,ee=!1,V=n){let Q=new Qt;Q.moveTo(0,.5),Q.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),Q.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),Q.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),Q.bezierCurveTo(.48,.12,.12,.28,0,.5),Q.moveTo(-.12,-.3),Q.lineTo(0,-.06),Q.lineTo(.12,-.3),Q.closePath();let re=p(new qt(Q,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),T,L,Z,F,V);return re.scale.setScalar(x),ee&&(re.rotation.y=Math.PI),re}let Me=[],fe=[],q=[],we=null;for(let x of[-1.72,1.72])for(let T of[-1,1]){let L=T*1.36,Z=T*1.57,F=new Ke;F.position.set(x,.81,L),n.add(F),F.userData.groundWheel=!0;let ee=n.children.length,V=p(new zi([new ve(.56,-.19),new ve(.61,-.245),new ve(.67,-.25),new ve(.76,-.19),new ve(.8,-.1),new ve(.8,.1),new ve(.76,.19),new ve(.67,.25),new ve(.61,.245),new ve(.56,.19)],80),c,x,.81,L);V.rotation.x=Math.PI/2;for(let re=-2;re<=2;re++)g(.798-Math.abs(re)*.012,.0035,h,x,.81,L+re*.071);for(let re=0;re<28;re++){let ce=re*Math.PI/14,xe=Array.from({length:17},(be,Ee)=>{let De=Ee/16,qe=-.205+De*.41,pe=.799-.044*Math.pow(Math.abs(qe)/.205,3),Ce=ce+.13*Math.sin(De*Math.PI);return new w(x+Math.sin(Ce)*pe,.81+Math.cos(Ce)*pe,L+qe)});p(new Ut(new Nt(xe),20,.0045,5,!1),h)}for(let re of[-1,1])for(let ce of[.625,.654,.681])g(ce,.0035,h,x,.81,L+re*.244);g(.548,.023,l,x,.81,Z+T*.035),g(.505,.016,l,x,.81,Z+T*.043),f(.14,.045,h,x,.81,Z+T*.045,"z"),g(.14,.012,l,x,.81,Z+T*.069);let Q=de(.2,l,x,.8,Z+T*.075,T<0);fe.push(Q);for(let re of t.wheelDesign()){let ce=new Nt(re.map(([xe,be])=>new w(x+xe,.81+be,Z+T*(.04+.025*(1-Math.hypot(xe,be)/.51)))));Me.push(p(new Ut(ce,20,.007,6,!1),l))}for(let re=0;re<20;re++){let ce=re*Math.PI/10;f(.006,.009,l,x+Math.sin(ce)*.526,.81+Math.cos(ce)*.526,Z+T*.06,"z")}n.updateMatrixWorld(!0);for(let re of n.children.slice(ee))F.attach(re);F.scale.set(.88/1.24,.88/.86,1/.95),F.position.y=.715/.86,q.push({wheelGroup:F,x,out:Z,sign:T})}let A=[];for(let x of[-1,1])A.push(y(1.35,.43,.04,o,.05,.94,x*1.3));for(let x of[-1,1]){let T=f(.275,.27,h,2.16,.945,x*.97,"z");g(.278,.035,o,2.16,.945,x*1.11)}for(let x of[-1.72,1.72])f(.07,2.8,h,x,.7,0,"z");y(3.6,.08,.8,h,0,.57,0);let b=[];function H(x,T,L){let Z=document.createElement("canvas");Z.width=x,Z.height=T,L(Z.getContext("2d"),x,T);let F=new Tt(Z);return F.colorSpace=ht,F.anisotropy=8,b.push(F),F}let O=H(768,256,(x,T,L)=>{x.fillStyle="#101b18",x.fillRect(0,0,T,L),x.strokeStyle="#d9b35b",x.lineWidth=7,x.strokeRect(10,10,T-20,L-20),x.fillStyle="#ebc66c",x.textAlign="center",x.font="italic 116px Georgia",x.fillText("Two Aces",T/2,137),x.font="38px Georgia",x.fillText("\u2660 Poker21 \u2660",T/2,209)}),M=[];for(let x of[-1,1]){let T=new En({map:O,metalness:.55,roughness:.2,clearcoat:1});M.push(T);let L=p(new Wt(1.28,.4),T,.05,.94,x*1.326);T.userData.plane=L,x<0&&(L.rotation.y=Math.PI)}let R=[];for(let x of[-1,1])for(let T=0;T<3;T++){let L=new Ke;L.position.set((T-1)*.7+.05,1,x*1.365),x<0&&(L.rotation.y=Math.PI),n.add(L);let Z=p(new _t(.1,.1,.025),o,0,0,0,L),F=new Nn({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ee=p(new Wt(.65,.65),F,0,0,.035,L);ee.castShadow=!1,ee.receiveShadow=!1,R.push({group:L,mat:F,back:Z,n:T})}for(let x of[-1,1])for(let T of[-.54,.64])for(let L of[.78,1.1]){let Z=f(.014,.018,o,T,L,x*1.35,"z")}for(let x of[-1.7,-.35,1.48])for(let T of[-1.21,1.21]){let L=f(.128,.13,o,x,1.44,T,"x")}for(let x of[-1.7,-.35,1.48])for(let T of[-1,1])g(.125,.004,h,x+.08,1.44,T*1.21,"x"),g(.125,.004,h,x-.08,1.44,T*1.21,"x");for(let x of[-1.7,-.35,1.48])for(let T of[-.96,.96])f(.135,.08,o,x,1.49,T),f(.108,.082,h,x,1.498,T),g(.125,.015,o,x,1.54,T,"y"),g(.111,.006,o,x,1.535,T,"y");let z=[],U=[],se=["#ab2338","#1b684b","#2455a5"].map(x=>i(x,.08,.55)),Y=i("#eee9d6",.04,.6);for(let[x,T,L,Z]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let F=0;F<Z;F++){f(.104,.033,se[L],x,1.49+F*.037,T);for(let ee=0;ee<6;ee++){let V=ee*Math.PI/3,Q=y(.024,.021,.012,Y,x+Math.cos(V)*.103,1.49+F*.037,T+Math.sin(V)*.103);Q.rotation.y=Math.PI/2-V,Q.castShadow=!1,Q.receiveShadow=!1,z.push(Q)}if(F===Z-1){let ee=new Nn({transparent:!0,alphaTest:.1,roughness:.65}),V=p(new Wt(.208,.208),ee,x,1.511+F*.037,T);V.rotation.x=-Math.PI/2,V.castShadow=!1,V.receiveShadow=!1,U.push({mat:ee,n:L})}}let J=new Ke;J.position.set(.89,1.96,0),J.scale.set(1/1.24,1/.86,1/.95),n.add(J);let _e=new Ke;J.add(_e);let oe=new w((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),he=new w(0,0,1),Se=new w().crossVectors(oe,he).normalize();_e.quaternion.setFromRotationMatrix(new et().makeBasis(he,Se,oe));let Ae=u.clone();p(new It(.53,.06,16,80),Ae,0,0,0,_e),p(new It(.473,.014,10,64),o,0,0,-.02,_e);for(let x of[Math.PI]){let T=p(new _t(.09,.39,.045),o,Math.sin(x)*.26,Math.cos(x)*.26,0,_e);T.rotation.z=-x}for(let x of[-1,1]){let T=p(new _t(.35,.075,.06),o,x*.265,0,0,_e);p(new _t(.32,.035,.064),h,x*.265,0,.006,_e)}let Ue=p(new Je(.195,.195,.075,64),o,0,0,.035,_e);Ue.rotation.x=Math.PI/2;let We=p(new fi(.177,64),new Nn({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,_e);We.receiveShadow=!1,de(.38,o,0,-.025,.105,!1,_e);let Ne={classic:new Ke,sport:new Ke,formula:new Ke};for(let x of _e.children.slice())Ne.classic.add(x);Object.values(Ne).forEach(x=>_e.add(x));function $e(x,T,L,Z){let F=new Nt(T.map(([ee,V])=>new w(ee,V,0)),!0);p(new Ut(F,72,L,12,!0),Z,0,0,0,x)}$e(Ne.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Ae);for(let x of[-1,1])p(new _t(.35,.065,.045),l,x*.27,0,0,Ne.sport),p(new _t(.065,.3,.045),l,x*.12,-.22,0,Ne.sport);p(new It(.5,.018,8,64,.22),d,0,0,.005,Ne.sport),$e(Ne.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Ae),p(new _t(.6,.23,.065),h,0,0,0,Ne.formula);for(let x of[-1,1])p(new tn(.035,12,8),d,x*.25,.055,.06,Ne.formula),p(new _t(.08,.29,.025),l,x*.37,0,-.07,Ne.formula);for(let x of["sport","formula"]){let T=p(new Je(.15,.15,.07,48),l,0,0,.035,Ne[x]);T.rotation.x=Math.PI/2,p(new fi(.13,48),h,0,0,.078,Ne[x]),de(.25,l,0,-.018,.09,!1,Ne[x])}for(let[x,T]of Object.entries(t.steeringDesigns)){let L=new Ke;_e.add(L),Ne[x]=L;let Z=i(T.color,x==="woodHeritage"?.3:.55,.35);T.shape==="round"?p(new It(.53,.065,16,80),Z,0,0,0,L):T.shape==="flat"?$e(L,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Z):Mt([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Z,L);for(let ee=0;ee<T.spokes;ee++){let V=ee*Math.PI*2/T.spokes,Q=p(new _t(.39,.065,.05),l,Math.cos(V)*.25,Math.sin(V)*.25,.015,L);Q.rotation.z=V}let F=p(new Je(.15,.15,.075,40),h,0,0,.05,L);F.rotation.x=Math.PI/2,de(.23,l,0,-.015,.095,!1,L),p(new _t(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,L)}let Ie=i("#b9ab8a",.15,.8),He=i("#171c20",.02,.85);for(let[x,T]of Object.entries(Ne)){let L=x==="classic"?.53:x==="sport"?.51:.47;for(let F of[-1,1]){if(x!=="formula"){let ee=p(new It(L,.072,12,30,.64),He,0,0,.003,T);ee.rotation.z=F<0?Math.PI-.32:-.32}for(let ee=0;ee<9;ee++){let V=(F<0?Math.PI:0)-.28+ee*.07;p(new tn(.007,6,4),Ie,Math.cos(V)*(L-.045),Math.sin(V)*(L-.045),.063,T)}}let Z=p(new _t(.065,.1,.035),x==="classic"?o:d,0,x==="formula"?.16:.51,.045,T);for(let F=0;F<6;F++){let ee=F*Math.PI/3,V=p(new Je(.012,.012,.012,6),l,Math.cos(ee)*.13,Math.sin(ee)*.13,.099,T);V.rotation.x=Math.PI/2}}let tt=new w(1.3,1.48,0),Ft=new w(.89,1.96,0),Be=Ft.clone().sub(tt),lt=tt.clone().add(Ft).multiplyScalar(.5),Qe=y(.12,Be.length(),.095,o,...lt.toArray());Qe.quaternion.setFromUnitVectors(new w(0,1,0),Be.normalize()),y(.075,Qe.geometry.parameters.height-.04,.1,h,...lt.toArray()).quaternion.copy(Qe.quaternion);let bt=-1.84,B=1.99,mt=.74,st=new Ke;st.position.set(bt,B,0),n.add(st);let Ve=n.children.length;f(mt,.51,o,bt,B,0,"z"),f(.67,.54,h,bt,B,0,"z");for(let x of[-1,1]){let T=x*.29;g(.72,.055,h,bt,B,T),g(.75,.022,o,bt,B,T+x*.03),g(.665,.012,d,bt,B,T+x*.025);for(let L=0;L<14;L++){let Z=L*Math.PI/7,F=[],ee=[];for(let re=0;re<=16;re++){let ce=re/16,xe=.22+ce*.44,be=Z+.55*ce;for(let Ee of[-.15,.15])F.push(bt+Math.sin(be+Ee)*xe,B+Math.cos(be+Ee)*xe,T+x*(.018+Math.sin(ce*Math.PI)*.12))}for(let re=0;re<16;re++){let ce=re*2;ee.push(ce,ce+1,ce+2,ce+1,ce+3,ce+2)}let V=new dt;V.setAttribute("position",new Oe(F,3)),V.setIndex(ee),V.computeVertexNormals(),m.side=kt,p(V,m);let Q=new Nt(Array.from({length:17},(re,ce)=>{let xe=ce/16,be=.22+xe*.44,Ee=Z+.55*xe-.15;return new w(bt+Math.sin(Ee)*be,B+Math.cos(Ee)*be,T+x*(.025+Math.sin(xe*Math.PI)*.12))}));p(new Ut(Q,20,.009,6,!1),d)}f(.215,.07,o,bt,B,T+x*.085,"z"),f(.18,.085,h,bt,B,T+x*.11,"z")}for(let x=0;x<12;x++){let T=x*Math.PI/6,L=y(.045,.15,.2,h,bt+Math.cos(T)*.735,B+Math.sin(T)*.735,0);L.rotation.z=T}n.updateMatrixWorld(!0);for(let x of n.children.slice(Ve))st.attach(x);st.rotation.set(0,Math.PI/2,0),st.scale.set(.96/1.24,.96/.86,.96/.95);let Ot=st.clone(!0);n.add(Ot);let yt=new Ke;st.add(yt);let Xt=i("#829aaa",.92,.24);for(let x of[-.24,-.08,.08,.24])p(new It(.765,.028,10,80),Xt,0,0,x,yt);for(let x=0;x<8;x++){let T=x*Math.PI/4,L=p(new Je(.025,.025,.025,6),Xt,Math.sin(T)*.73,Math.cos(T)*.73,.35,yt);L.rotation.x=Math.PI/2}let Bt={classic:new Ke,dual:new Ke,titanium:new Ke},Vt=i("#a9b7c4",.92,.23),nn=i("#668bb5",.88,.25);Object.values(Bt).forEach(x=>n.add(x));for(let[x,T]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let L of T){let Z=x==="titanium"?nn:Vt,F=p(new Je(.105,.105,.5,32),Z,-2.42,.76,L,Bt[x]);F.rotation.z=Math.PI/2;let ee=p(new Je(.079,.079,.012,32),h,-2.678,.76,L,Bt[x]);ee.rotation.z=Math.PI/2;let V=p(new It(.094,.012,8,32),Z,-2.69,.76,L,Bt[x]);V.rotation.y=Math.PI/2}for(let[x,T]of Object.entries(Bt)){let L=x==="classic"?[0]:[-.67,.67];for(let F of L){let ee=p(new Je(.18,.18,.52,40),Vt,-2.19,.76,F,T);ee.rotation.z=Math.PI/2;for(let V of[-2.36,-2.04]){let Q=p(new It(.184,.016,8,40),h,V,.76,F,T);Q.rotation.y=Math.PI/2,p(new _t(.07,.19,.07),Vt,V,.94,F,T)}}let Z=x==="classic"?[0]:x==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let F of Z){let ee=p(new Je(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,F,T);ee.rotation.z=Math.PI/2;let V=p(new It(.107,.018,10,40),x==="titanium"?nn:Vt,-2.57,.76,F,T);if(V.rotation.y=Math.PI/2,x==="titanium")for(let[Q,re]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let ce=p(new It(.106,.008,6,40),i(re,.85,.3),Q,.76,F,T);ce.rotation.y=Math.PI/2}}}for(let x of[-1,1]){let T=new Nt([new w(-2.16,1.46,x*.65),new w(-1.94,1.66,x*.69),new w(-1.3,1.59,x*.64),new w(-.98,1.47,x*.7)]);p(new Ut(T,32,.022,8,!1),o),y(.34,.06,.14,o,-1.84,1.48,x*.4)}for(let x of[-1,1]){let T=new Nt([new w(-2.45,1.1,x*.7),new w(-2.43,1.36,x*.72),new w(-2.19,1.55,x*.7),new w(-1.9,1.55,x*.68)]);p(new Ut(T,40,.075,14,!1),h),p(new Ut(T,40,.019,10,!1),o);for(let L of[-2.2,-1.96]){let Z=new Nt([new w(L,1.43,x*.48),new w(L,1.63,x*.6),new w(L+.24,1.57,x*.82)]);p(new Ut(Z,24,.017,8,!1),o)}}let mn=[],un=[],Cn=[];for(let x=0;x<=48;x++){let T=-.92+x*1.84/48;for(let L of[.64,1.23])un.push(2.57-.28*(Math.sin(T)*1.25/1.1)**2,L,Math.sin(T)*1.25)}for(let x=0;x<48;x++){let T=x*2;Cn.push(T,T+2,T+1,T+1,T+2,T+3)}let rn=new dt;rn.setAttribute("position",new Oe(un,3)),rn.setIndex(Cn),rn.computeVertexNormals();let en=i("#00453f",.72,.14);en.clearcoat=1,en.side=kt,p(rn,en);for(let x of[.635,1.225]){let T=Array.from({length:65},(L,Z)=>{let F=-1.04+Z*2.08/64;return new w(2.57-.28*(F/1.1)**2,x,F)});p(new Ut(new Nt(T),80,.034,12,!1),o)}for(let x of[-1,1]){let T=x*1,L=2.57-.28*(T/1.1)**2,Z=new Nt([new w(L-.04,.635,T),new w(L+.05,.78,T),new w(L+.065,1.12,T),new w(L-.04,1.25,T)]);p(new Ut(Z,32,.065,12,!1),o);for(let F of[.91,1.065]){let ee=Array.from({length:16},(V,Q)=>{let re=x*(.51+Q*.41/15);return new w(2.57-.28*(re/1.1)**2+.018,F,re)});mn.push(p(new Ut(new Nt(ee),24,.017,8,!1),d))}}let Pi=[];for(let x=0;x<2;x++){let T=new Tt(t.cardCanvas(e.cards,x));T.colorSpace=ht,T.anisotropy=16;let L=new Un({map:T,transparent:!0,toneMapped:!1});Pi.push(L);let Z=1.65,F=x?.34:-.34,ee=y(.47,.008,.63,i("#ddd9cf",0,.95),Z,1.474+x*.003,F);ee.rotation.y=-(x?-.08:.08);let V=p(new Wt(.5,.67),L,Z,1.48+x*.003,F);V.rotation.x=-Math.PI/2,V.rotation.z=x?-.08:.08,V.castShadow=!1,V.receiveShadow=!1}let Kt=new Nn({map:new Tt(t.plateCanvas(e)),roughness:.6});for(let x of[-1,1]){let T=p(new Wt(.79,.463),Kt,x*2.605,1.01,0);T.rotation.y=x*Math.PI/2}let wt={},At=i("#7d8c98",.82,.28),ut=i("#202a32",.45,.38),jn=i("#a7c6d5",.98,.055),Ct=i("#182029",.35,.48);Ct.bumpMap=Pe("#888888",.2),Ct.bumpScale=.001;function it(x,T,L,Z,F,ee,V,Q,re){let ce=new qt(v(x,T,Z),{depth:L,bevelEnabled:!0,bevelSize:Math.min(.012,L*.2),bevelThickness:Math.min(.012,L*.2),bevelSegments:3,curveSegments:12});return ce.translate(0,0,-L/2),p(ce,F,ee,V,Q,re)}function Mt(x,T,L,Z){return p(new Ut(new Nt(x.map(F=>new w(...F))),40,T,12,!1),L,0,0,0,Z)}function C(x,T,L,Z){let F=p(new Je(.014,.014,.014,6),At,x,T,L,Z);F.rotation.x=Math.PI/2}function $(x,T,L,Z,F,ee){let V=new Qt;V.moveTo(-Z*.5,0),V.bezierCurveTo(-Z*.52,.055,-Z*.12,.07,Z*.5,.008),V.quadraticCurveTo(Z*.05,-.025,-Z*.5,0);let Q=new qt(V,{depth:L,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});Q.translate(0,0,-L/2);let re=p(Q,F,x,T,0,ee);return re.rotation.z=-.08,re}for(let x of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){wt[x]={};for(let T of x==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let L=new Ke;n.add(L),wt[x][T]=L;let Z=["sport","aero"].includes(T)?Ct:At;if(x==="spoiler"){let F=T==="lip"?1.43:T==="sport"?1.78:2.08,ee=T==="gt"||T==="double"?1.98:1.72,V=-2.39;for(let Q of[-.62,.62]){if(it(.25,.055,.22,.045,ut,-2.24,1.31,Q,L),T!=="lip"){let re=it(.15,F-1.32,.065,.035,ut,-2.32,(F+1.32)/2,Q,L);re.rotation.z=-.19}for(let re of[-.065,.065]){let ce=p(new Je(.012,.012,.015,6),At,-2.24,1.35,Q+re,L)}}if($(V,F,ee,T==="lip"?.22:.36,Z,L),T!=="lip")for(let Q of[-1,1]){let re=it(.43,.19,.025,.055,Z,V,F+.055,Q*ee/2,L);re.rotation.z=-.12,C(V-.1,F+.045,Q*(ee/2+.02),L),C(V+.1,F+.045,Q*(ee/2+.02),L)}if(T==="double"){$(V+.025,F+.24,ee*.94,.27,Ct,L);for(let Q of[-1,1])it(.08,.28,.025,.02,ut,V,F+.13,Q*ee*.47,L)}continue}if(x==="mirrors")for(let F of[-1,1]){let ee=T==="aero",V=ee?1.77:1.86,Q=F*(ee?1.47:1.53),re=.77;it(.18,.08,.15,.035,ut,.64,1.46,F*1.19,L),Mt([[.64,1.47,F*1.19],[.62,1.62,F*1.32],[re,V-.07,Q]],ee?.023:.029,Z,L);let ce=p(new tn(.046,16,12),ut,re,V-.065,Q,L);if(T==="round"){p(new tn(1,32,20),At,re,V,Q,L).scale.set(.065,.15,.15);let be=p(new fi(.13,48),jn,re-.056,V,Q,L);be.rotation.y=-Math.PI/2,be.castShadow=!1;let Ee=p(new It(.136,.009,8,48),At,re-.06,V,Q,L);Ee.rotation.y=Math.PI/2}else{let xe=ee?.31:T==="sport"?.35:.38,be=ee?.16:.22,Ee=it(xe,be,.095,.065,T==="club"?ut:Ct,re,V,Q,L);Ee.rotation.y=Math.PI/2;let De=p(new Gi(v(xe-.045,be-.035,.05)),jn,re-.061,V,Q,L);De.rotation.y=-Math.PI/2,De.castShadow=!1,De.receiveShadow=!1;let qe=v(xe-.028,be-.018,.055).getPoints(24).map(pe=>[re-.058,V+pe.y,Q+pe.x]);qe.push(qe[0]),Mt(qe,.006,At,L)}}else if(x==="sideSkirts")for(let F of[-1,1]){let ee=it(2.3,T==="aero"?.17:.12,T==="rally"?.27:.13,.05,Z,0,.59,F*1.24,L);if(T==="rally")for(let V of[-.84,-.42,0,.42,.84]){let Q=it(.13,.018,.25,.018,ut,V,.67,F*1.24,L)}else Mt([[-1.08,.54,F*1.3],[0,.53,F*1.32],[1.08,.54,F*1.3]],.009,d,L);for(let V of[-.87,.87])it(.12,.14,.16,.025,ut,V,.65,F*1.2,L),C(V,.61,F*1.33,L);if(T==="aero")for(let V of[-.95,.95]){let Q=it(.24,.12,.025,.025,Ct,V,.57,F*1.35,L);Q.rotation.z=V>0?.2:-.2}}else{let F=x==="frontBumper"?1:-1,ee=[[F*2.26,.66,-.92],[F*2.58,.65,-.7],[F*2.67,.65,0],[F*2.58,.65,.7],[F*2.26,.66,.92]];Mt(ee,T==="sport"?.061:.047,Z,L);for(let V of[-.67,.67]){Mt([[F*2.31,.74,V],[F*2.5,.68,V]],.032,ut,L);let Q=it(.16,.12,.13,.035,ut,F*2.51,.67,V,L)}if(T==="aero"){let V=it(.38,.045,1.94,.07,Ct,F*2.48,.5,0,L);for(let Q of[-.7,-.27,.27,.7])it(.27,.12,.022,.025,ut,F*2.48,.55,Q,L);Mt([[F*2.4,.52,-.91],[F*2.64,.52,0],[F*2.4,.52,.91]],.008,At,L)}if(T==="rally")for(let V of[-.72,.72])Mt([[F*2.53,.65,V-.14],[F*2.56,.94,V-.14],[F*2.55,1.04,V],[F*2.56,.94,V+.14],[F*2.53,.65,V+.14]],.036,At,L);if(T==="sport")for(let V of[-.67,.67]){let Q=it(.2,.13,.14,.045,ut,F*2.56,.66,V,L)}if(x==="rearBumper"&&T==="aero")for(let V of[-.7,-.35,0,.35,.7]){let Q=it(.27,.15,.025,.025,Ct,-2.46,.48,V,L);Q.rotation.z=.12}}}}let ae=i("#b9e4f5",.28,.17);ae.emissive.set("#b9e4f5"),ae.emissiveIntensity=1.8;let ge=i("#ffdda0",.2,.2);ge.emissive.set("#ffe0a8"),ge.emissiveIntensity=1.25;for(let x of["frontBumper","rearBumper"])for(let[T,L,Z]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let F=new Ke;n.add(F),wt[x][T]=F;let ee=x==="frontBumper"?1:-1,V=T==="trackGT"?.34:.29,Q=.59,re=v(L,V,.1);for(let[pe,Ce]of[[0,.94],[-.79,.32],[.79,.32]]){let ze=v(Ce,.115,.045,vn);re.holes.push(new vn(ze.getPoints(24).map(ft=>new ve(ft.x+pe,ft.y))))}let ce=new qt(re,{depth:Z,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),xe=ce.attributes.position;for(let pe=0;pe<xe.count;pe++){let Ce=xe.getX(pe),ze=xe.getY(pe),ft=xe.getZ(pe);xe.setXYZ(pe,ee*(2.43+ft-.24*(Ce/(L/2))**2),Q+ze,Ce)}ce.computeVertexNormals(),p(ce,s,0,0,0,F);for(let[pe,Ce]of[[0,.94],[-.79,.32],[.79,.32]]){let ze=ee*(2.43-.24*(pe/(L/2))**2);it(.025,.14,Ce+.02,.04,h,ze,Q,pe,F);for(let ft of[-.032,.012,.045])it(.012,.006,Ce-.035,.003,ut,ze+ee*.022,Q+ft,pe,F)}let be=Array.from({length:41},(pe,Ce)=>{let ze=-L/2+Ce*L/40;return[ee*(2.44+Z+.045-.24*(ze/(L/2))**2),Q-V/2-.025,ze]});Mt(be,T==="trackGT"?.028:.019,Ct,F);let Ee=new dt,De=[],qe=[];for(let[pe,Ce,ze]of be)De.push(pe,Ce,ze,pe-ee*.17,Ce+.005,ze);for(let pe=0;pe<40;pe++){let Ce=pe*2;qe.push(Ce,Ce+1,Ce+2,Ce+1,Ce+3,Ce+2)}if(Ee.setAttribute("position",new Oe(De,3)),Ee.setIndex(qe),Ee.computeVertexNormals(),p(Ee,Ct,0,0,0,F),x==="rearBumper")for(let pe=0;pe<(T==="trackGT"?5:3);pe++){let Ce=(pe-(T==="trackGT"?2:1))*.3,ze=it(.24,.075,.014,.008,Ct,-2.48,Q-V/2-.035,Ce,F);ze.rotation.z=-.12}else if(T==="trackGT")for(let pe of[-.92,.92]){let Ce=it(.18,.05,.018,.008,Ct,2.43,Q-V/2,pe,F);Ce.rotation.z=.08}}for(let x of["formula","formulaPro"]){let T=new Ke;T.name="front-wing-"+x,n.add(T),wt.frontBumper[x]=T;let L=x==="formulaPro",Z=L?2.8:2.55,F=L?4:2;for(let ee=0;ee<F;ee++){let V=new Qt;V.moveTo(-.23,-.025),V.quadraticCurveTo(-.09,.1,.2,.035),V.lineTo(.23,-.025),V.quadraticCurveTo(0,-.045,-.23,-.025);let Q=new qt(V,{depth:Z,bevelEnabled:!0,bevelThickness:.012,bevelSize:.012,bevelSegments:2,curveSegments:16}),re=p(Q,ee===0?Ct:s,2.48+ee*.07,.43+ee*.09,-Z/2,T);re.name="wing-element"}for(let ee of[-1,1])if(it(.66,.43,.035,.025,L?o:Ct,2.56,.56,ee*(Z/2+.01),T),Mt([[2.48,.36,ee*(Z/2+.03)],[2.81,.42,ee*(Z/2+.03)],[2.85,.7,ee*(Z/2+.03)]],.012,At,T),it(.07,.72,.08,.015,At,2.24,.82,ee*.3,T),L)for(let V of[.75,1.05])it(.25,.17,.018,.008,Ct,2.56,.64,ee*V,T)}wt.headlights={};for(let x of["round","projector","rally","matrix"]){let T=new Ke;n.add(T),wt.headlights[x]=T;for(let L of[-1,1]){let Z=L*.74,F=2.57-.28*(Z/1.1)**2+.07,ee=1.075;if(x==="matrix"){let V=it(.4,.2,.075,.045,ut,F,ee,Z,T);V.rotation.y=Math.PI/2;let Q=it(.35,.15,.01,.035,h,F+.05,ee,Z,T);Q.rotation.y=Math.PI/2;for(let re=0;re<4;re++){let ce=it(.06,.1,.012,.017,ae,F+.065,ee,Z-.128+re*.085,T);ce.rotation.y=Math.PI/2,ce.castShadow=!1}}else{let V=x==="rally"?.16:x==="round"?.14:.135,Q=p(new Je(V+.027,V+.02,.095,48),ut,F,ee,Z,T);Q.rotation.z=Math.PI/2;let re=p(new It(V+.008,.01,10,48),At,F+.054,ee,Z,T);re.rotation.y=Math.PI/2;let ce=p(new tn(1,32,20),x==="round"||x==="rally"?ge:ae,F+.055,ee,Z,T);if(ce.scale.set(.025,V,V),ce.castShadow=!1,x==="projector"){let xe=p(new It(V*.8,.008,8,48),ae,F+.076,ee,Z,T);xe.rotation.y=Math.PI/2,p(new tn(1,24,16),jn,F+.081,ee,Z,T).scale.set(.022,V*.53,V*.53)}if(x==="rally")for(let xe of[-.07,0,.07]){let be=Math.sqrt(V*V-xe*xe);Mt([[F+.09,ee-be,Z+xe],[F+.1,ee,Z+xe],[F+.09,ee+be,Z+xe]],.009,ut,T)}}}}for(let[x,T]of Object.entries(t.streetHeadlights)){let L=new Ke;n.add(L),wt.headlights[x]=L;let Z=i(T.color,.12,.22);Z.emissive.set(T.color),Z.emissiveIntensity=T.smoke?.35:1.1;let F=i(T.smoke?"#1c3348":"#83b6d5",.45,.12);for(let ee of[-1,1]){let V=ee*.72,Q=2.57-.28*(V/1.1)**2+.07,re=1.075;if(T.shape==="sportHousing"){let be=new Qt;be.moveTo(-.29,.12),be.lineTo(.23,.09),be.quadraticCurveTo(.32,.02,.26,-.13),be.lineTo(-.25,-.14),be.closePath();let Ee=p(new qt(be,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),ut,Q+.02,re,V,L);Ee.rotation.y=Math.PI/2;for(let De=0;De<2;De++){let qe=V+(De-.5)*.24;if(p(new tn(1,24,16),F,Q+.13,re,qe,L).scale.set(.022,.067,.067),T.signature==="rings"){let Ce=p(new It(.086,.01,10,48),Z,Q+.155,re,qe,L);Ce.rotation.y=Math.PI/2}if(T.signature==="doubleL"&&Mt([[Q+.155,re+.075,qe-.085],[Q+.155,re-.075,qe-.085],[Q+.155,re-.075,qe+.075]],.012,Z,L),T.signature==="pixels")for(let Ce=0;Ce<3;Ce++)p(new _t(.014,.026,.026),Z,Q+.155,re+.09,qe-.055+Ce*.055,L)}T.signature==="arc"&&Mt([[Q+.155,re-.09,V-.25],[Q+.155,re+.1,V-.25],[Q+.155,re+.12,V],[Q+.155,re+.07,V+.25]],.012,Z,L);continue}let ce=it(.47,.25,.1,.04,ut,Q,re,V,L);ce.rotation.y=Math.PI/2;for(let be of[-.18,.18]){p(new _t(.1,.07,.035),At,Q-.035,re-.15,V+be,L);let Ee=p(new Je(.012,.012,.018,12),o,Q+.02,re-.13,V+be,L);Ee.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(T.shape)){let be=T.shape==="doubleU"?2:1;for(let Ee=0;Ee<be;Ee++){let De=V+(Ee-(be-1)/2)*.21;if(p(new tn(1,24,16),F,Q+.073,re,De,L).scale.set(.019,.067,.067),T.shape==="doubleU")Mt([[Q+.1,re+.075,De-.08],[Q+.1,re-.04,De-.08],[Q+.1,re-.08,De-.045],[Q+.1,re-.08,De+.045],[Q+.1,re-.04,De+.08],[Q+.1,re+.075,De+.08]],.01,Z,L);else if(T.shape==="brow"){Mt([[Q+.1,re+.055,De-.19],[Q+.1,re+.093,De-.14],[Q+.1,re+.093,De+.19]],.011,Z,L);let pe=p(new It(.068,.006,8,32),Z,Q+.095,re-.015,De,L);pe.rotation.y=Math.PI/2}else for(let pe=0;pe<3;pe++){let Ce=pe*Math.PI*2/3-Math.PI/2;Mt([[Q+.102,re+Math.sin(Ce)*.025,De+Math.cos(Ce)*.025],[Q+.102,re+Math.sin(Ce)*.1,De+Math.cos(Ce)*.1]],.011,Z,L)}}continue}if(T.shape==="bar"){for(let[be,Ee,De]of[[.035,.41,.025],[-.045,.33,.012]]){let qe=it(Ee,De,.014,.006,Z,Q+.064,re+be,V,L);qe.rotation.y=Math.PI/2,qe.castShadow=!1}continue}if(T.shape==="square"){let be=it(.37,.17,.024,.015,Z,Q+.065,re,V,L);be.rotation.y=Math.PI/2;for(let Ee=0;Ee<7;Ee++)p(new _t(.006,.16,.004),F,Q+.082,re,V-.15+Ee*.05,L);continue}let xe=T.count===3?.062:T.count===2?.087:.106;for(let be=0;be<T.count;be++){let Ee=V+(be-(T.count-1)/2)*(T.count===3?.14:.205),De=p(new Je(xe+.014,xe+.02,.09,T.shape==="hex"?6:40),h,Q+.035,re,Ee,L);De.rotation.z=Math.PI/2;let qe=p(new It(xe,.009,8,T.shape==="hex"?6:48),Z,Q+.09,re,Ee,L);qe.rotation.y=Math.PI/2,qe.castShadow=!1;let pe=p(new tn(1,24,16),T.projector?F:Z,Q+.077,re,Ee,L);if(pe.scale.set(.018,xe*.74,xe*.74),pe.castShadow=!1,T.projector&&p(new tn(1,16,12),Z,Q+.092,re,Ee,L).scale.set(.006,xe*.31,xe*.31),T.cross||T.guard)for(let Ce of[-1,1])Mt([[Q+.11,re-xe*.74,Ee-Ce*xe*.74],[Q+.115,re,Ee],[Q+.11,re+xe*.74,Ee+Ce*xe*.74]],.009,ut,L)}}}let ie={};for(let x of["club","sport","rally","chrome"]){let T=[];ie[x]=T;for(let{wheelGroup:L,sign:Z}of q){let F=new Ke;L.add(F),T.push(F);let ee=x==="rally"?.91:.87,V=x==="rally"?.64:x==="sport"?.49:.57,Q=x==="sport"?1:1.23,re=[],ce=[];for(let De=0;De<=48;De++){let qe=-Q+De*Q*2/48;for(let pe of[-V/2,V/2])re.push(Math.sin(qe)*ee,Math.cos(qe)*ee,pe)}for(let De=0;De<48;De++){let qe=De*2;ce.push(qe,qe+1,qe+2,qe+1,qe+3,qe+2)}let xe=new dt;xe.setAttribute("position",new Oe(re,3)),xe.setIndex(ce),xe.computeVertexNormals();let Ee=(x==="chrome"?At:x==="club"?s:Ct).clone();Ee.side=kt,p(xe,Ee,0,0,0,F);for(let De of[-1,1]){let qe=Array.from({length:49},(pe,Ce)=>{let ze=-Q+Ce*Q*2/48;return[Math.sin(ze)*ee,Math.cos(ze)*ee,De*V/2]});Mt(qe,.012,x==="chrome"?At:ut,F)}for(let De of[-1,1])Mt([[0,0,-Z*.28],[De*.28,.42,-Z*.31],[De*.49,.68,-Z*.31]],.022,ut,F),C(De*.49,.68,-Z*.32,F);if(x==="rally"){let De=it(.13,.25,V*.9,.025,ut,-.83,.2,0,F)}F.userData.shell=Ee}}wt.windshield={};for(let[x,T,L,Z]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let ee=function(pe,Ce){let ze=.92*(1-.13*Ce),ft=1-pe*pe;return[1.97+.23*ft-T*.32*Ce,1.5+T*Ce*(.84+.16*ft),pe*ze]},F=new Ke;n.add(F),wt.windshield[x]=F;let V=[],Q=[],re=40,ce=16;for(let pe=0;pe<=ce;pe++)for(let Ce=0;Ce<=re;Ce++)V.push(...ee(-1+Ce*2/re,pe/ce));for(let pe=0;pe<ce;pe++)for(let Ce=0;Ce<re;Ce++){let ze=pe*(re+1)+Ce;Q.push(ze,ze+1,ze+re+1,ze+1,ze+re+2,ze+re+1)}let xe=new dt;xe.setAttribute("position",new Oe(V,3)),xe.setIndex(Q),xe.computeVertexNormals();let be=new En({color:L,metalness:.05,roughness:.075,transparent:!0,opacity:Z,depthWrite:!1,side:kt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});F.userData.glass=be,F.userData.originalTint={color:L,opacity:Z};let Ee=p(xe,be,0,0,0,F);Ee.castShadow=!1,Ee.receiveShadow=!1,Ee.renderOrder=3;let De=["smoke","highSmoke"].includes(x)?ut:At;for(let pe of[0,1])Mt(Array.from({length:41},(Ce,ze)=>ee(-1+ze/20,pe)),pe===0?.017:.009,De,F);for(let pe of[-1,1]){Mt(Array.from({length:17},(ft,_n)=>ee(pe,_n/16)),.011,De,F);let Ce=ee(pe,0);it(.19,.055,.14,.025,ut,Ce[0],Ce[1]-.025,Ce[2],F);let ze=p(new Je(.013,.013,.018,6),At,Ce[0]+.04,Ce[1]+.014,Ce[2],F)}let qe=new Un({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let pe of[-.77,-.69]){let Ce=Array.from({length:13},(ft,_n)=>{let yn=ee(pe,.18+_n*.058);return yn[0]+=.004,yn}),ze=Mt(Ce,.003,qe,F);ze.castShadow=!1,ze.receiveShadow=!1,ze.renderOrder=4}}let ye=new Ke;for(let x of n.children.slice())x.userData.groundWheel||ye.add(x);n.add(ye);let Le=i("#b8c7d6",.72,.27),Fe=new Ke,ke=[];n.add(Fe);for(let x of[-1.72,1.72])for(let T of[-1,1]){let L=new Ke;L.position.set(x,.52,T*1.12),Fe.add(L);let Z=Array.from({length:193},(be,Ee)=>{let De=Ee/192,qe=De*Math.PI*14;return new w(Math.cos(qe)*.071,.055+De*.36,Math.sin(qe)*.071)}),F=p(new Ut(new Nt(Z),192,.014,10,!1),Le,0,0,0,L);p(new Je(.039,.039,.23,24),ut,0,.14,0,L);let ee=p(new Je(.018,.018,.28,20),At,0,.34,0,L),V=new Ke;V.position.y=.47,L.add(V);for(let[be,Ee]of[[L,.04],[V,-.015]])p(new Je(.095,.095,.026,32),At,0,Ee,0,be),p(new Je(.068,.068,.018,24),ut,0,Ee+.02,0,be);p(new _t(.14,.075,.18),ut,0,.025,T*.035,L),p(new _t(.16,.075,.22),ut,0,0,-T*.075,V);let Q=new w(x,.56,T*1.12),re=new w(x,.81,T*1.43),ce=re.clone().sub(Q);p(new Je(.026,.026,ce.length(),16),ut,...Q.clone().add(re).multiplyScalar(.5).toArray(),Fe).quaternion.setFromUnitVectors(new w(0,1,0),ce.normalize()),ke.push({coil:F,rod:ee,upper:V})}wt.brakes={};for(let x of["stock","red","gold","ceramic"]){let T=new Ke;n.add(T),wt.brakes[x]=T;for(let{wheelGroup:L,sign:Z}of q){let F=Jl(x);F.position.z=Z*.165,Z<0&&(F.rotation.y=Math.PI),L.add(F),T.userData.brakeAssemblies??=[],T.userData.brakeAssemblies.push(F)}}wt.nitrous={};let Xe=document.createElement("canvas");Xe.width=512,Xe.height=256;let Ge=Xe.getContext("2d");Ge.fillStyle="#101923",Ge.fillRect(0,0,512,256),Ge.strokeStyle="#e8e1cc",Ge.lineWidth=8,Ge.strokeRect(10,10,492,236),Ge.fillStyle="#f5f2e8",Ge.textAlign="center",Ge.font="italic bold 106px Arial",Ge.fillText("N\u2082O",256,117),Ge.font="bold 24px Arial",Ge.fillText("NITROUS OXIDE",256,159),Ge.fillStyle="#d9b36b",Ge.font="bold 18px Arial",Ge.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let x=0;x<42;x++)Ge.fillRect(165+x*4,212,x%3+1,17);let je=new Tt(Xe);je.colorSpace=ht,je.anisotropy=8;let nt=document.createElement("canvas");nt.width=nt.height=128;let Ze=nt.getContext("2d");Ze.fillStyle="#eee9dc",Ze.fillRect(0,0,128,128),Ze.translate(64,64),Ze.strokeStyle="#17202a";for(let x=0;x<=20;x++){let T=-Math.PI*.8+x*Math.PI*1.6/20;Ze.lineWidth=x%5?2:4,Ze.beginPath(),Ze.moveTo(Math.sin(T)*43,-Math.cos(T)*43),Ze.lineTo(Math.sin(T)*(x%5?49:53),-Math.cos(T)*(x%5?49:53)),Ze.stroke()}Ze.fillStyle="#293541",Ze.textAlign="center",Ze.font="bold 14px Arial",Ze.fillText("PSI",0,30),Ze.strokeStyle="#c92737",Ze.lineWidth=4,Ze.beginPath(),Ze.moveTo(-9,12),Ze.lineTo(26,-31),Ze.stroke(),Ze.fillStyle="#25313a",Ze.beginPath(),Ze.arc(0,0,6,0,Math.PI*2),Ze.fill();let Lt=new Tt(nt);Lt.colorSpace=ht;for(let x of["blue","twin","triple"]){let T=new Ke;T.name="nitrous-"+x,n.add(T),wt.nitrous[x]=T;let L=i(t.item("nitrous",x).color,.65,.27),Z=x==="triple"?3:x==="twin"?2:1,F=1.49,ee=-1.3,V=.37,Q=i("#b4924f",.8,.3),re=i("#a5b2bd",.85,.24),ce=i("#1b2028",.08,.85),xe=i("#ab2635",.35,.4);for(let be of[-1.52,-1.13]){it(.095,.05,Z*V+.04,.015,h,be,1.29,0,T);for(let Ee of[-1,1]){let De=Ee*(Z*V/2-.02);p(new Je(.024,.024,.023,6),re,be,1.327,De,T)}}for(let be=0;be<Z;be++){let Ee=(be-(Z-1)/2)*V,De=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Et,sn])=>new ve(Et,sn)),qe=p(new zi(De,40),L,ee,F,Ee,T);qe.rotation.z=-Math.PI/2;for(let Et of[-1.52,-1.13]){it(.11,.095,.27,.025,ce,Et,1.35,Ee,T);let sn=p(new It(.152,.013,8,40),re,Et,F,Ee,T);sn.rotation.y=Math.PI/2,it(.08,.025,.055,.008,re,Et,F+.155,Ee,T),p(new Je(.013,.013,.018,6),h,Et,F+.179,Ee,T)}let pe=[],Ce=[],ze=[];for(let Et=0;Et<2;Et++)for(let sn=0;sn<=16;sn++){let xs=-.91+sn*1.82/16;if(pe.push(ee+(Et?.12:-.12),F+Math.cos(xs)*.147,Ee+Math.sin(xs)*.147),Ce.push(Et,sn/16),Et&&sn){let ri=17+sn;ze.push(ri-18,ri-17,ri,ri-18,ri,ri-1)}}let ft=new dt;ft.setAttribute("position",new Oe(pe,3)),ft.setAttribute("uv",new Oe(Ce,2)),ft.setIndex(ze),ft.computeVertexNormals();let _n=new En({map:je,roughness:.55,metalness:.05,side:kt});p(ft,_n,0,0,0,T);let yn=p(new Je(.046,.046,.055,24),Q,-.89,F,Ee,T);yn.rotation.z=Math.PI/2,it(.075,.07,.065,.012,Q,-.845,F,Ee,T),p(new Je(.016,.016,.065,16),re,-.845,F+.045,Ee,T);let Rr=p(new It(.052,.012,8,24),xe,-.845,F+.092,Ee,T);Rr.rotation.x=Math.PI/2;for(let Et of[0,Math.PI/3,Math.PI*2/3]){let sn=it(.106,.014,.014,.004,xe,-.845,F+.092,Ee,T);sn.rotation.y=Et}let Pt=new Ke;Pt.position.set(-.84,F+.065,Ee+.075),Pt.rotation.x=-Math.PI*.32,T.add(Pt);let qn=p(new Je(.057,.057,.03,32),re,0,0,0,Pt);qn.rotation.x=Math.PI/2;let ys=p(new fi(.047,32),new Un({map:Lt}),0,0,.017,Pt),Rn=p(new Je(.024,.024,.055,6),Q,-.79,F,Ee,T);Rn.rotation.z=Math.PI/2,Mt([[-.76,F,Ee],[-.7,F-.02,Ee],[-.71,1.3,Ee],[-.91,1.24,Ee]],.014,ce,T);let xn=p(new Je(.021,.021,.055,12),re,-.74,F,Ee,T);xn.rotation.z=Math.PI/2}it(.07,.07,Z*V,.015,Q,-.91,1.24,0,T),Mt([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,ce,T)}wt.seat={};for(let x of["red","carbon","emerald","ivory"]){let T=$l(x);T.rotation.y=Math.PI/2,T.position.set(-.8,1.04,0),n.add(T),wt.seat[x]=T}function Ht(x){Te(x);let T=t.glassTints[x.glassTint]||t.glassTints.original;for(let ce of Object.values(wt.windshield)){let xe=ce.userData.originalTint;ce.userData.glass.color.set(T.opacity===null?xe.color:T.color),ce.userData.glass.opacity=T.opacity??xe.opacity}let L={standard:1,large:1.15,max:1.25}[x.wheelSize]||1,Z=(L-1)*(.715/.86);for(let{wheelGroup:ce}of q)ce.scale.set(.88/1.24*L,.88/.86*L,1/.95),ce.position.y=.715/.86*L;let F=Z+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[x.suspension]||0);for(let[ce,xe]of Object.entries(wt))if(ce!=="brakes")for(let be of Object.values(xe))be.parent===n&&(be.userData.mountBaseY??=be.position.y,be.position.y=be.userData.mountBaseY+F);mn.forEach(ce=>ce.visible=!x.headlights||x.headlights==="classic");for(let[ce,xe]of Object.entries(ie))for(let be of xe)be.visible=x.fenders===ce,ce==="club"&&be.userData.shell.color.set(t.item("paint",x.paint).color);Le.color.set(t.item("suspension",x.suspension).color),ye.position.y=F,Fe.visible=F>0,ke.forEach(({coil:ce,rod:xe,upper:be})=>{ce.scale.y=1+F/.415,xe.scale.y=1+F/.28,xe.position.y=.34+F/2,be.position.y=.47+F});for(let[ce,xe]of Object.entries(wt))for(let[be,Ee]of Object.entries(xe))Ee.visible=x[ce]===be;for(let[ce,xe]of Object.entries(wt.brakes))for(let be of xe.userData.brakeAssemblies||[])be.visible=(x.brakes||"stock")===ce;Object.entries(Ne).forEach(([ce,xe])=>xe.visible=ce===(x.steering||"classic")),Object.entries(Bt).forEach(([ce,xe])=>xe.visible=ce===(x.exhaust||"classic")),yt.visible=x.turbine==="boost";let ee=["twin","twinBig"].includes(x.turbine),V=x.turbine==="twinBig",Q=V?.9:ee?.52:x.turbine==="boost"?.96:.9;st.scale.set(Q/1.24,Q/.86,Q/.95),st.position.set(bt,B+(V?.06:ee?-.2:-.04),ee?V?-.7:-.44:0),Ot.visible=ee,Ot.scale.copy(st.scale),Ot.position.set(bt,B+(V?.06:-.2),V?.7:.44);let re=x.badges||[];if(A.forEach(ce=>ce.visible=!re.length),M.forEach(ce=>ce.userData.plane.visible=!re.length),R.forEach(({group:ce,mat:xe,back:be,n:Ee})=>{let De=re[Ee];ce.visible=!!De;let qe=De+":"+(x.prizeTotal||0);if(!De||xe.userData.badge===qe)return;let pe=new Qt,Ce=.65/512,ze=(ft,_n)=>[(ft-256)*Ce,(256-_n)*Ce];if(De==="millionaire"||De==="day-hero")pe.absarc(0,0,204*Ce,0,Math.PI*2,!1);else if(De==="rating-top10"){for(let ft=0;ft<6;ft++){let _n=ft*Math.PI/3-Math.PI/2,yn=ze(256+Math.cos(_n)*215,256+Math.sin(_n)*215);ft?pe.lineTo(...yn):pe.moveTo(...yn)}pe.closePath()}else pe.moveTo(...ze(80,88)),pe.quadraticCurveTo(...ze(256,0),...ze(432,88)),pe.lineTo(...ze(420,296)),pe.quadraticCurveTo(...ze(390,400),...ze(256,465)),pe.quadraticCurveTo(...ze(122,400),...ze(92,296)),pe.closePath();be.geometry.dispose(),be.geometry=new qt(pe,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),xe.map?.dispose(),xe.map=new Tt(t.badgeCanvas(De,x)),xe.map.colorSpace=ht,xe.map.anisotropy=16,xe.emissive.set("#ffffff"),xe.emissiveMap=xe.map,xe.emissiveIntensity=.35,xe.userData.badge=qe,xe.needsUpdate=!0}),s.color.set(t.item("paint",x.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(x)),we!==x.wheels){for(let ce of Me)ce.removeFromParent(),ce.geometry.dispose();Me.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:ce,x:xe,out:be,sign:Ee}of q)for(let De of t.wheelDesign(x.wheels)){let qe=new Nt(De.map(([Ce,ze])=>new w(Ce,ze,Ee*(.25+.025*(1-Math.hypot(Ce,ze)/.51))))),pe=p(new Ut(qe,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[x.wheels]||(["fiveSpoke","legend"].includes(x.wheels)?.023:.009),8,!1),l,0,0,0,ce);Me.push(pe)}we=x.wheels}o.color.set(t.item("trim",x.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(x.trim)?.48:["cobalt","anodizedRed","champagne"].includes(x.trim)?.3:.135,o.metalness=.95,u.userData.style!==x.upholstery&&(u.map?.dispose(),u.map=new Tt(t.upholsteryCanvas(x.upholstery)),u.map.colorSpace=ht,u.map.wrapS=u.map.wrapT=Gn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(x.upholstery)?.95:x.upholstery==="carbonWeave"?.28:.38,u.userData.style=x.upholstery,u.needsUpdate=!0),t.chipPalette(x.chips).forEach((ce,xe)=>{se[xe].color.set(ce),se[xe].roughness=x.chips==="ceramic"?.25:.55}),z.forEach(ce=>ce.visible=x.chips!=="ceramic"),U.forEach(({mat:ce,n:xe})=>{ce.userData.style!==x.chips&&(ce.map?.dispose(),ce.map=new Tt(t.chipCanvas(x.chips,xe)),ce.map.colorSpace=ht,ce.map.anisotropy=8,ce.userData.style=x.chips,ce.needsUpdate=!0)}),Pi.forEach((ce,xe)=>{ce.userData.style!==x.cards&&(ce.map?.dispose(),ce.map=new Tt(t.cardCanvas(x.cards,xe)),ce.map.colorSpace=ht,ce.map.anisotropy=16,ce.userData.style=x.cards,ce.needsUpdate=!0)}),Me.forEach(ce=>ce.visible=!0),fe.forEach(ce=>ce.visible=!0),d.color.set(t.item("light",x.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,Kt.userData.number!==x.number+x.region&&(Kt.map?.dispose(),Kt.map=new Tt(t.plateCanvas(x)),Kt.userData.number=x.number+x.region,Kt.needsUpdate=!0)}for(let x of[-1,1])Mt([[-1.64,.43,x*.94],[0,.4,x*1.02],[1.66,.43,x*.94]],.027,d,ye),Mt([[x*1.91,.43,-.66],[x*2.05,.43,0],[x*1.91,.43,.66]],.023,d,ye);let St=new _r(d.color,.45,2,2);St.position.set(-1.9,2,.48),ye.add(St);let ct=Ht;function Rt(x){ct(x),St.color.copy(d.color)}return Rt(e),{car:n,update:Rt}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Fn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ht,n.toneMapping=ti,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ia,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new pn,s=new zt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Vn("#c6d9ef","#44311e",1.25));for(let[ne,me,Pe,de,Me]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let fe=new Hn(ne,me);fe.position.set(Pe,de,Me),fe.castShadow=ne==="#fff0d0",fe.shadow.bias=-2e-4,fe.shadow.normalBias=.025,fe.shadow.mapSize.set(2048,2048),fe.shadow.camera.left=-5,fe.shadow.camera.right=5,fe.shadow.camera.top=5,fe.shadow.camera.bottom=-5,i.add(fe)}let a=new pn;a.background=new Ye("#48505b");for(let[ne,me,Pe,de,Me,fe]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let q=new gt(new _t(de,Me,fe),new Un({color:"#ffffff"}));q.position.set(ne,me,Pe),a.add(q)}let o=new Ar(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(ne=>{ne.geometry?.dispose(),ne.material?.dispose()}),o.dispose();let l=new gt(new Wt(30,30),new ls({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=gp(i,e),u=new cn({transparent:!0,depthWrite:!1,side:kt,toneMapped:!1,uniforms:{color:{value:new Ye(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new gt(new Wt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let ne of[-.9,.9]){let me=new _r(u.uniforms.color.value,1.8,3,2);me.position.set(0,.32,ne),i.add(me),m.push(me)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function y(ne){t.night=!!ne;for(let me of i.children)me.isHemisphereLight&&(me.intensity=ne?.26:1.25),me.isDirectionalLight&&(me.userData.dayIntensity??=me.intensity,me.intensity=me.userData.dayIntensity*(ne?.13:1));i.environmentIntensity=ne?.24:1.5,u.uniforms.strength.value=ne?1.35:.95}y(t.night);let f=ne=>{p&&y(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=ne=>{h.update(ne),u.uniforms.color.value.set(window.PokerGarage.item("light",ne.light).color),m.forEach(me=>me.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let v=!1,_=null,S=0,E=0,P=()=>{let ne=r.clientWidth,me=r.clientHeight;ne&&me&&(n.setSize(ne,me,!1),s.aspect=ne/me,s.updateProjectionMatrix())},k=new ResizeObserver(P);k.observe(r),P();let W=new In(1,1,{type:Ri,depthBuffer:!0});W.samples=4;let D=new pn,I=new gi(-1,1,1,-1,0,1),G=new cn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:W.texture},stepSize:{value:new ve}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),N=new gt(new Wt(2,2),G);D.add(N);function j(){let ne=n.getDrawingBufferSize(new ve);(W.width!==ne.x||W.height!==ne.y)&&W.setSize(ne.x,ne.y),G.uniforms.stepSize.value.set(3/ne.x,3/ne.y),n.setRenderTarget(W),n.render(i,s),n.setRenderTarget(null),n.render(D,I)}let X=ne=>{ne.button&&ne.button!==0||(t.manual=!0,_={id:ne.pointerId,x:ne.clientX,y:ne.clientY},r.setPointerCapture(ne.pointerId),ne.preventDefault())},K=ne=>{!_||_.id!==ne.pointerId||(t.yaw-=(ne.clientX-_.x)*.011,t.pitch=iu(t.pitch+(ne.clientY-_.y)*.009,-.24,1.35),_.x=ne.clientX,_.y=ne.clientY,ne.preventDefault())},te=ne=>{_&&_.id===ne.pointerId&&(_=null,r.hasPointerCapture(ne.pointerId)&&r.releasePointerCapture(ne.pointerId))},ue=ne=>{let me={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};me[ne.key]&&(t.manual=!0,t.yaw+=me[ne.key][0],t.pitch=iu(t.pitch+me[ne.key][1],-.24,1.35),ne.preventDefault())};r.addEventListener("keydown",ue),r.addEventListener("pointerdown",X),r.addEventListener("pointermove",K),r.addEventListener("pointerup",te),r.addEventListener("pointercancel",te),r.addEventListener("lostpointercapture",te);function le(){if(v)return;v=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(S),k.disconnect(),r.removeEventListener("keydown",ue),r.removeEventListener("pointerdown",X),r.removeEventListener("pointermove",K),r.removeEventListener("pointerup",te),r.removeEventListener("pointercancel",te),r.removeEventListener("lostpointercapture",te);let ne=new Set,me=new Set,Pe=new Set;i.traverse(de=>{de.geometry&&Pe.add(de.geometry),de.material&&me.add(de.material)}),me.forEach(de=>{for(let Me of Object.values(de))Me&&Me.isTexture&&ne.add(Me);de.dispose()}),ne.forEach(de=>de.dispose()),Pe.forEach(de=>de.dispose()),c.dispose(),W.dispose(),G.dispose(),N.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function Te(ne){if(v)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){le();return}let me=E?Math.min(.05,(ne-E)/1e3):0;if(E=ne,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=me*.13);let Pe=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Pe,1.15+Math.sin(t.pitch)*Pe,Math.cos(t.yaw)*Math.cos(t.pitch)*Pe),s.lookAt(0,1.2,0),j(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}S=requestAnimationFrame(Te)}return t.snapshotOnly||(S=requestAnimationFrame(Te)),{update:g,setNight:y,dispose:le,state:t,snapshot(){let ne=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*ne,1.15+Math.sin(t.pitch)*ne,Math.cos(t.yaw)*Math.cos(t.pitch)*ne),s.lookAt(0,1.2,0),j();let me=document.createElement("canvas");return me.width=n.domElement.width,me.height=n.domElement.height,me.getContext("2d").drawImage(n.domElement,0,0),me}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
