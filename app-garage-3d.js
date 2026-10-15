(()=>{var Ac=0,ko=1,Cc=2;var Vo=1,Ia=2,ti=3,Sr=0,In=1,Vt=2,Ii=0,ds=1,Ho=2,Wo=3,Xo=4,Rc=5,Tr=100,Pc=101,Ic=102,Lc=103,Dc=104,Uc=200,Nc=201,Fc=202,Oc=203,Bc=204,zc=205,Gc=206,kc=207,Vc=208,Hc=209,Wc=210,Xc=211,jc=212,qc=213,Yc=214,La=0,Da=1,Ua=2,ps=3,Na=4,Fa=5,Oa=6,Ba=7,Zc=0,Jc=1,Kc=2,_i=0,$c=1,Qc=2,eh=3,ni=4,th=5,nh=6,ih=7;var jo=300,br=301,Wi=302,za=303,Ga=304,ms=306,Hn=1e3,ur=1001,Zs=1002,Qn=1003,rh=1004;var fs=1005;var ei=1006,ka=1007;var Xi=1008;var ii=1009,qo=1010,Yo=1011,wr=1012,Va=1013,ji=1014,Xn=1015,Li=1016,Ha=1017,Wa=1018,Er=1020,Zo=35902,Jo=35899,sh=1021,ah=1022,jn=1023,gs=1026,vs=1027,Xa=1028,ja=1029,oh=1030,Ko=1031;var $o=1033,qa=33776,Ya=33777,Za=33778,Ja=33779,Qo=35840,el=35841,tl=35842,nl=35843,il=36196,rl=37492,sl=37496,al=37808,ol=37809,ll=37810,cl=37811,hl=37812,ul=37813,dl=37814,pl=37815,ml=37816,fl=37817,gl=37818,vl=37819,_l=37820,yl=37821,xl=36492,Ml=36494,Sl=36495,Tl=36283,bl=36284,wl=36285,El=36286;var Hr=2300,Js=2301,qs=2302,Io=2400,Lo=2401,Do=2402;var lh=3201;var ch=0,hh=1,qi="",ct="srgb",zi="srgb-linear",Wr="linear",bt="srgb";var Bi=7680;var uh=512,dh=513,ph=514,Al=515,mh=516,fh=517,gh=518,vh=519,Uo=35044;var Cl="300 es",pi=2e3,Xr=2001;var mi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ys=Math.PI/180,Ks=180/Math.PI;function Ar(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(ln[255&r]+ln[r>>8&255]+ln[r>>16&255]+ln[r>>24&255]+"-"+ln[255&e]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[63&t|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[255&n]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function lt(r,e,t){return Math.max(e,Math.min(t,r))}function lu(r,e){return(r%e+e)%e}function to(r,e,t){return(1-t)*r+t*e}function Lr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function yn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ue=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Cn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],_=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=_);if(u!==_||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*_,v=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let b=Math.sqrt(y),C=Math.atan2(b,g*v);f=Math.sin(f*C)/b,o=Math.sin(o*C)/b}let M=o*v;if(c=c*f+d*M,l=l*f+m*M,h=h*f+p*M,u=u*f+_*M,f===1-o){let b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},no=new E,Ql=new Cn,rt=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],_=i[0],f=i[3],g=i[6],v=i[1],y=i[4],M=i[7],b=i[2],C=i[5],G=i[8];return s[0]=a*_+o*v+c*b,s[3]=a*f+o*y+c*C,s[6]=a*g+o*M+c*G,s[1]=l*_+h*v+u*b,s[4]=l*f+h*y+u*C,s[7]=l*g+h*M+u*G,s[2]=d*_+m*v+p*b,s[5]=d*f+m*y+p*C,s[8]=d*g+m*M+p*G,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-o*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(io.makeScale(e,t)),this}rotate(e){return this.premultiply(io.makeRotation(-e)),this}translate(e,t){return this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},io=new rt;function Rl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function jr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _h(){let r=jr("canvas");return r.style.display="block",r}var ec={};function dr(r){r in ec||(ec[r]=!0,console.warn(r))}function yh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var tc=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nc=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cu(){let r={enabled:!0,workingColorSpace:zi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===bt&&(i.r=di(i.r),i.g=di(i.g),i.b=di(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===bt&&(i.r=hr(i.r),i.g=hr(i.g),i.b=hr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Wr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return dr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return dr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[zi]:{primaries:e,whitePoint:n,transfer:Wr,toXYZ:tc,fromXYZ:nc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ct},outputColorSpaceConfig:{drawingBufferColorSpace:ct}},[ct]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:tc,fromXYZ:nc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ct}}}),r}var gt=cu();function di(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function hr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var $i,$s=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$i===void 0&&($i=jr("canvas")),$i.width=e.width,$i.height=e.height;let i=$i.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=$i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=jr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*di(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*di(t[n]/255)):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},hu=0,pr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Ar(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ro(i[a].image)):s.push(ro(i[a]))}else s=ro(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function ro(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$s.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var uu=0,so=new E,gn=class r extends mi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Ar(),this.name="",this.source=new pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(so).x}get height(){return this.source.getSize(so).y}get depth(){return this.source.getSize(so).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hn:e.x=e.x-Math.floor(e.x);break;case ur:e.x=e.x<0?0:1;break;case Zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Hn:e.y=e.y-Math.floor(e.y);break;case ur:e.y=e.y<0?0:1;break;case Zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null,gn.DEFAULT_MAPPING=jo,gn.DEFAULT_ANISOTROPY=1;var yt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],_=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,M=(m+1)/2,b=(g+1)/2,C=(h+d)/4,G=(u+_)/4,V=(p+f)/4;return y>M&&y>b?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=C/n,s=G/n):M>b?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=C/i,s=V/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=G/s,i=V/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-p)*(f-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qs=class extends mi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new gn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ei,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new pr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Un=class extends Qs{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qr=class extends gn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ea=class extends gn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Nn=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Gn):Gn.fromBufferAttribute(s,a),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ss.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ss.copy(n.boundingBox)),Ss.applyMatrix4(e.matrixWorld),this.union(Ss)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dr),Ts.subVectors(this.max,Dr),Qi.subVectors(e.a,Dr),er.subVectors(e.b,Dr),tr.subVectors(e.c,Dr),Mi.subVectors(er,Qi),Si.subVectors(tr,er),Ui.subVectors(Qi,tr);let t=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-Ui.z,Ui.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,Ui.z,0,-Ui.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-Ui.y,Ui.x,0];return!!ao(t,Qi,er,tr,Ts)&&(t=[1,0,0,0,1,0,0,0,1],!!ao(t,Qi,er,tr,Ts)&&(bs.crossVectors(Mi,Si),t=[bs.x,bs.y,bs.z],ao(t,Qi,er,tr,Ts)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Gn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ai)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ai=[new E,new E,new E,new E,new E,new E,new E,new E],Gn=new E,Ss=new Nn,Qi=new E,er=new E,tr=new E,Mi=new E,Si=new E,Ui=new E,Dr=new E,Ts=new E,bs=new E,Ni=new E;function ao(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ni.fromArray(r,s);let o=i.x*Math.abs(Ni.x)+i.y*Math.abs(Ni.y)+i.z*Math.abs(Ni.z),c=e.dot(Ni),l=t.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var du=new Nn,Ur=new E,oo=new E,Fn=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):du.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);let t=Ur.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Ur,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(oo)),this.expandByPoint(Ur.copy(e.center).sub(oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},oi=new E,lo=new E,ws=new E,Ti=new E,co=new E,Es=new E,ho=new E,Gi=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){lo.copy(e).add(t).multiplyScalar(.5),ws.copy(t).sub(e).normalize(),Ti.copy(this.origin).sub(lo);let s=.5*e.distanceTo(t),a=-this.direction.dot(ws),o=Ti.dot(this.direction),c=-Ti.dot(ws),l=Ti.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let _=1/h;u*=_,d*=_,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(lo).addScaledVector(ws,d),m}intersectSphere(e,t){oi.subVectors(e.center,this.origin);let n=oi.dot(this.direction),i=oi.dot(oi)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,n,i,s){co.subVectors(t,e),Es.subVectors(n,e),ho.crossVectors(co,Es);let a,o=this.direction.dot(ho);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Ti.subVectors(this.origin,e);let c=a*this.direction.dot(Es.crossVectors(Ti,Es));if(c<0)return null;let l=a*this.direction.dot(co.cross(Ti));if(l<0||c+l>o)return null;let h=-a*Ti.dot(ho);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qe=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=_,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/nr.setFromMatrixColumn(e,0).length(),s=1/nr.setFromMatrixColumn(e,1).length(),a=1/nr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,_=l*u;t[0]=d+_*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,_=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pu,e,mu)}lookAt(e,t,n){let i=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),bi.crossVectors(n,wn),bi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),bi.crossVectors(n,wn)),bi.normalize(),As.crossVectors(wn,bi),i[0]=bi.x,i[4]=As.x,i[8]=wn.x,i[1]=bi.y,i[5]=As.y,i[9]=wn.y,i[2]=bi.z,i[6]=As.z,i[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],_=n[6],f=n[10],g=n[14],v=n[3],y=n[7],M=n[11],b=n[15],C=i[0],G=i[4],V=i[8],D=i[12],L=i[1],O=i[5],N=i[9],j=i[13],X=i[2],te=i[6],ne=i[10],me=i[14],le=i[3],Te=i[7],$=i[11],ce=i[15];return s[0]=a*C+o*L+c*X+l*le,s[4]=a*G+o*O+c*te+l*Te,s[8]=a*V+o*N+c*ne+l*$,s[12]=a*D+o*j+c*me+l*ce,s[1]=h*C+u*L+d*X+m*le,s[5]=h*G+u*O+d*te+m*Te,s[9]=h*V+u*N+d*ne+m*$,s[13]=h*D+u*j+d*me+m*ce,s[2]=p*C+_*L+f*X+g*le,s[6]=p*G+_*O+f*te+g*Te,s[10]=p*V+_*N+f*ne+g*$,s[14]=p*D+_*j+f*me+g*ce,s[3]=v*C+y*L+M*X+b*le,s[7]=v*G+y*O+M*te+b*Te,s[11]=v*V+y*N+M*ne+b*$,s[15]=v*D+y*j+M*me+b*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],_=e[13],f=e[14],g=e[15],v=u*f*l-_*d*l+_*c*m-o*f*m-u*c*g+o*d*g,y=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,M=h*_*l-p*u*l+p*o*m-a*_*m-h*o*g+a*u*g,b=p*u*c-h*_*c-p*o*d+a*_*d+h*o*f-a*u*f,C=t*v+n*y+i*M+s*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/C;return e[0]=v*G,e[1]=(_*d*s-u*f*s-_*i*m+n*f*m+u*i*g-n*d*g)*G,e[2]=(o*f*s-_*c*s+_*i*l-n*f*l-o*i*g+n*c*g)*G,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*G,e[4]=y*G,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*G,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*G,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*G,e[8]=M*G,e[9]=(p*u*s-h*_*s-p*n*m+t*_*m+h*n*g-t*u*g)*G,e[10]=(a*_*s-p*o*s+p*n*l-t*_*l-a*n*g+t*o*g)*G,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*G,e[12]=b*G,e[13]=(h*_*i-p*u*i+p*n*d-t*_*d-h*n*f+t*u*f)*G,e[14]=(p*o*i-a*_*i-p*n*c+t*_*c+a*n*f-t*o*f)*G,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*G,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,_=a*h,f=a*u,g=o*u,v=c*l,y=c*h,M=c*u,b=n.x,C=n.y,G=n.z;return i[0]=(1-(_+g))*b,i[1]=(m+M)*b,i[2]=(p-y)*b,i[3]=0,i[4]=(m-M)*C,i[5]=(1-(d+g))*C,i[6]=(f+v)*C,i[7]=0,i[8]=(p+y)*G,i[9]=(f-v)*G,i[10]=(1-(d+_))*G,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=nr.set(i[0],i[1],i[2]).length(),a=nr.set(i[4],i[5],i[6]).length(),o=nr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],kn.copy(this);let c=1/s,l=1/a,h=1/o;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=l,kn.elements[5]*=l,kn.elements[6]*=l,kn.elements[8]*=h,kn.elements[9]*=h,kn.elements[10]*=h,t.setFromRotationMatrix(kn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,_;if(c)p=s/(a-s),_=a*s/(a-s);else if(o===pi)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else{if(o!==Xr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),_=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,_;if(c)p=1/(a-s),_=a/(a-s);else if(o===pi)p=-2/(a-s),_=-(a+s)/(a-s);else{if(o!==Xr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),_=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},nr=new E,kn=new Qe,pu=new E(0,0,0),mu=new E(1,1,1),bi=new E,As=new E,wn=new E,ic=new Qe,rc=new Cn,Wn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ic.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ic,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rc.setFromEuler(this),this.setFromQuaternion(rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wn.DEFAULT_ORDER="XYZ";var Yr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},fu=0,sc=new E,ir=new Cn,li=new Qe,Cs=new E,Nr=new E,gu=new E,vu=new Cn,ac=new E(1,0,0),oc=new E(0,1,0),lc=new E(0,0,1),cc={type:"added"},_u={type:"removed"},rr={type:"childadded",child:null},uo={type:"childremoved",child:null},hn=class r extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Ar(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new E,t=new Wn,n=new Cn,i=new E(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qe},normalMatrix:{value:new rt}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.multiply(ir),this}rotateOnWorldAxis(e,t){return ir.setFromAxisAngle(e,t),this.quaternion.premultiply(ir),this}rotateX(e){return this.rotateOnAxis(ac,e)}rotateY(e){return this.rotateOnAxis(oc,e)}rotateZ(e){return this.rotateOnAxis(lc,e)}translateOnAxis(e,t){return sc.copy(e).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ac,e)}translateY(e){return this.translateOnAxis(oc,e)}translateZ(e){return this.translateOnAxis(lc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cs.copy(e):Cs.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(Nr,Cs,this.up):li.lookAt(Cs,Nr,this.up),this.quaternion.setFromRotationMatrix(li),i&&(li.extractRotation(i.matrixWorld),ir.setFromRotationMatrix(li),this.quaternion.premultiply(ir.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cc),rr.child=e,this.dispatchEvent(rr),rr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_u),uo.child=e,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cc),rr.child=e,this.dispatchEvent(rr),rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,gu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,vu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};hn.DEFAULT_UP=new E(0,1,0),hn.DEFAULT_MATRIX_AUTO_UPDATE=!0,hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vn=new E,ci=new E,po=new E,hi=new E,sr=new E,ar=new E,hc=new E,mo=new E,fo=new E,go=new E,vo=new yt,_o=new yt,yo=new yt,ui=class r{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Vn.subVectors(e,t),i.cross(Vn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Vn.subVectors(i,t),ci.subVectors(n,t),po.subVectors(e,t);let a=Vn.dot(Vn),o=Vn.dot(ci),c=Vn.dot(po),l=ci.dot(ci),h=ci.dot(po),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,hi)!==null&&hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,hi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,hi.x),c.addScaledVector(a,hi.y),c.addScaledVector(o,hi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return vo.setScalar(0),_o.setScalar(0),yo.setScalar(0),vo.fromBufferAttribute(e,t),_o.fromBufferAttribute(e,n),yo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(vo,s.x),a.addScaledVector(_o,s.y),a.addScaledVector(yo,s.z),a}static isFrontFacing(e,t,n,i){return Vn.subVectors(n,t),ci.subVectors(e,t),Vn.cross(ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),.5*Vn.cross(ci).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;sr.subVectors(i,n),ar.subVectors(s,n),mo.subVectors(e,n);let c=sr.dot(mo),l=ar.dot(mo);if(c<=0&&l<=0)return t.copy(n);fo.subVectors(e,i);let h=sr.dot(fo),u=ar.dot(fo);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(sr,a);go.subVectors(e,s);let m=sr.dot(go),p=ar.dot(go);if(p>=0&&m<=p)return t.copy(s);let _=m*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(ar,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return hc.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(hc,o);let g=1/(f+_+d);return a=_*g,o=d*g,t.copy(n).addScaledVector(sr,a).addScaledVector(ar,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function xo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=gt.workingColorSpace){if(e=lu(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=xo(a,s,e+1/3),this.g=xo(a,s,e),this.b=xo(a,s,e-1/3)}return gt.colorSpaceToWorking(this,i),this}setStyle(e,t=ct){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ct){let n=xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ct){return gt.workingToColorSpace(cn.copy(this),e),65536*Math.round(lt(255*cn.r,0,255))+256*Math.round(lt(255*cn.g,0,255))+Math.round(lt(255*cn.b,0,255))}getHexString(e=ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(cn.copy(this),t);let n=cn.r,i=cn.g,s=cn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=ct){gt.workingToColorSpace(cn.copy(this),e);let t=cn.r,n=cn.g,i=cn.b;return e!==ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(Rs);let n=to(wi.h,Rs.h,t),i=to(wi.s,Rs.s,t),s=to(wi.l,Rs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new je;je.NAMES=xh;var yu=0,fi=class extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=Ar(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},On=class extends fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Mp=xu();function xu(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Zt=new E,Ps=new ue,Mu=0,xn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Uo,this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ps.fromBufferAttribute(this,t),Ps.applyMatrix3(e),this.setXY(t,Ps.x,Ps.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Lr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Lr(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Lr(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Lr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Lr(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),i=yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),i=yn(i,this.array),s=yn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uo&&(e.usage=this.usage),e}};var Zr=class extends xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Jr=class extends xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var De=class extends xn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Su=0,Dn=new Qe,Mo=new hn,or=new E,En=new Nn,Fr=new Nn,rn=new E,mt=class r extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Ar(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rl(e)?Jr:Zr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new rt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,n){return Dn.makeTranslation(e,t,n),this.applyMatrix4(Dn),this}scale(e,t,n){return Dn.makeScale(e,t,n),this.applyMatrix4(Dn),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(or).negate(),this.translate(or.x,or.y,or.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];En.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new E,1/0);if(e){let n=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Fr.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(En.min,Fr.min),En.expandByPoint(rn),rn.addVectors(En.max,Fr.max),En.expandByPoint(rn)):(En.expandByPoint(Fr.min),En.expandByPoint(Fr.max))}En.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)rn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)rn.fromBufferAttribute(o,l),c&&(or.fromBufferAttribute(e,l),rn.add(or)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let V=0;V<n.count;V++)o[V]=new E,c[V]=new E;let l=new E,h=new E,u=new E,d=new ue,m=new ue,p=new ue,_=new E,f=new E;function g(V,D,L){l.fromBufferAttribute(n,V),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,L),d.fromBufferAttribute(s,V),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,L),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let O=1/(m.x*p.y-p.x*m.y);isFinite(O)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(O),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(O),o[V].add(_),o[D].add(_),o[L].add(_),c[V].add(f),c[D].add(f),c[L].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let V=0,D=v.length;V<D;++V){let L=v[V],O=L.start;for(let N=O,j=O+L.count;N<j;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let y=new E,M=new E,b=new E,C=new E;function G(V){b.fromBufferAttribute(i,V),C.copy(b);let D=o[V];y.copy(D),y.sub(b.multiplyScalar(b.dot(D))).normalize(),M.crossVectors(C,D);let L=M.dot(c[V])<0?-1:1;a.setXYZW(V,y.x,y.y,y.z,L)}for(let V=0,D=v.length;V<D;++V){let L=v[V],O=L.start;for(let N=O,j=O+L.count;N<j;N+=3)G(e.getX(N+0)),G(e.getX(N+1)),G(e.getX(N+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new E,s=new E,a=new E,o=new E,c=new E,l=new E,h=new E,u=new E;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),_=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let _=0,f=c.length;_<f;_++){m=o.isInterleavedBufferAttribute?c[_]*o.data.stride+o.offset:c[_]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new xn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},uc=new Qe,Fi=new Gi,Is=new Fn,dc=new E,Ls=new E,Ds=new E,Us=new E,So=new E,Ns=new E,pc=new E,Fs=new E,at=class extends hn{constructor(e=new mt,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Ns.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(So.fromBufferAttribute(u,e),a?Ns.addScaledVector(So,h):Ns.addScaledVector(So.sub(t),h))}t.add(Ns)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Is.copy(n.boundingSphere),Is.applyMatrix4(s),Fi.copy(e.ray).recast(e.near),Is.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Is,dc)===null||Fi.origin.distanceToSquared(dc)>(e.far-e.near)**2))return;uc.copy(s).invert(),Fi.copy(e.ray).applyMatrix4(uc),n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Fi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),y=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));v<y;v+=3)i=Os(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);p<_;p+=3)i=Os(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),y=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));v<y;v+=3)i=Os(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);p<_;p+=3)i=Os(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function Os(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Ls),r.getVertexPosition(c,Ds),r.getVertexPosition(l,Us);let h=(function(u,d,m,p,_,f,g,v){let y;if(y=d.side===1?p.intersectTriangle(g,f,_,!0,v):p.intersectTriangle(_,f,g,d.side===0,v),y===null)return null;Fs.copy(v),Fs.applyMatrix4(u.matrixWorld);let M=m.ray.origin.distanceTo(Fs);return M<m.near||M>m.far?null:{distance:M,point:Fs.clone(),object:u}})(r,e,t,n,Ls,Ds,Us,pc);if(h){let u=new E;ui.getBarycoord(pc,Ls,Ds,Us,u),i&&(h.uv=ui.getInterpolatedAttribute(i,o,c,l,u,new ue)),s&&(h.uv1=ui.getInterpolatedAttribute(s,o,c,l,u,new ue)),a&&(h.normal=ui.getInterpolatedAttribute(a,o,c,l,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new E,materialIndex:0};ui.getNormal(Ls,Ds,Us,d.normal),h.face=d,h.barycoord=u}return h}var ht=class r extends mt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(_,f,g,v,y,M,b,C,G,V,D){let L=M/G,O=b/V,N=M/2,j=b/2,X=C/2,te=G+1,ne=V+1,me=0,le=0,Te=new E;for(let $=0;$<ne;$++){let ce=$*O-j;for(let Ie=0;Ie<te;Ie++){let de=Ie*L-N;Te[_]=de*v,Te[f]=ce*y,Te[g]=X,l.push(Te.x,Te.y,Te.z),Te[_]=0,Te[f]=0,Te[g]=C>0?1:-1,h.push(Te.x,Te.y,Te.z),u.push(Ie/G),u.push(1-$/V),me+=1}}for(let $=0;$<V;$++)for(let ce=0;ce<G;ce++){let Ie=d+ce+te*$,de=d+ce+te*($+1),Me=d+(ce+1)+te*($+1),ge=d+(ce+1)+te*$;c.push(Ie,de,ge),c.push(de,Me,ge),le+=6}o.addGroup(m,le,D),m+=le,d+=me}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(h,3)),this.setAttribute("uv",new De(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Yi(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function dn(r){let e={};for(let t=0;t<r.length;t++){let n=Yi(r[t]);for(let i in n)e[i]=n[i]}return e}function Pl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}var Mh={clone:Yi,merge:dn},un=class extends fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},mr=class extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ei=new E,mc=new ue,fc=new ue,Gt=class extends mr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Ks*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Ys*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Ks*Math.atan(Math.tan(.5*Ys*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z)}getViewSize(e,t){return this.getViewBounds(e,mc,fc),t.subVectors(fc,mc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Ys*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},lr=-90,ta=class extends hn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Gt(lr,1,e,t);i.layers=this.layers,this.add(i);let s=new Gt(lr,1,e,t);s.layers=this.layers,this.add(s);let a=new Gt(lr,1,e,t);a.layers=this.layers,this.add(a);let o=new Gt(lr,1,e,t);o.layers=this.layers,this.add(o);let c=new Gt(lr,1,e,t);c.layers=this.layers,this.add(c);let l=new Gt(lr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===pi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Xr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Kr=class extends gn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},na=class extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Kr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ht(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new at(i,s),o=t.minFilter;return t.minFilter===Xi&&(t.minFilter=ei),new ta(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Xe=class extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Tu={type:"move"},fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let f=t.getJointPose(_,n),g=this._getHandJoint(l,_);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var vn=class extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Sp=new E;var Tp=new E,bp=new E,wp=new E,Ep=new ue,Ap=new ue,Cp=new Qe,Rp=new E,Pp=new E,Ip=new E,Lp=new ue,Dp=new ue,Up=new ue;var Np=new E,Fp=new E;var Op=new E,Bp=new yt,zp=new yt,Gp=new E,kp=new Qe,Vp=new E,Hp=new Fn,Wp=new Qe,Xp=new Gi;var ia=class extends gn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},jp=new Qe,qp=new Qe;var $r=class extends xn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},cr=new Qe,gc=new Qe,Bs=[],vc=new Nn,bu=new Qe,Or=new at,Br=new Fn,Qr=class extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $r(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,bu)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cr),vc.copy(e.boundingBox).applyMatrix4(cr),this.boundingBox.union(vc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cr),Br.copy(e.boundingSphere).applyMatrix4(cr),this.boundingSphere.union(Br)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(n),e.ray.intersectsSphere(Br)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,cr),gc.multiplyMatrices(n,cr),Or.matrixWorld=gc,Or.raycast(e,Bs);for(let a=0,o=Bs.length;a<o;a++){let c=Bs[a];c.instanceId=s,c.object=this,t.push(c)}Bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $r(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ia(new Float32Array(i*this.count),i,this.count,Xa,Xn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},To=new E,wu=new E,Eu=new rt,Kn=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=To.subVectors(n,t).cross(wu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(To),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Eu.getNormalMatrix(e),i=this.coplanarPoint(To).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Oi=new Fn,Au=new ue(.5,.5),zs=new E,Ri=class{constructor(e=new Kn,t=new Kn,n=new Kn,i=new Kn,s=new Kn,a=new Kn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],_=s[9],f=s[10],g=s[11],v=s[12],y=s[13],M=s[14],b=s[15];if(i[0].setComponents(l-a,m-h,g-p,b-v).normalize(),i[1].setComponents(l+a,m+h,g+p,b+v).normalize(),i[2].setComponents(l+o,m+u,g+_,b+y).normalize(),i[3].setComponents(l-o,m-u,g-_,b-y).normalize(),n)i[4].setComponents(c,d,f,M).normalize(),i[5].setComponents(l-c,m-d,g-f,b-M).normalize();else if(i[4].setComponents(l-c,m-d,g-f,b-M).normalize(),t===pi)i[5].setComponents(l+c,m+d,g+f,b+M).normalize();else{if(t!==Xr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,M).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){Oi.center.set(0,0,0);let t=Au.distanceTo(e.center);return Oi.radius=.7071067811865476+t,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(zs.x=i.normal.x>0?e.max.x:e.min.x,zs.y=i.normal.y>0?e.max.y:e.min.y,zs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Zn=new Qe,Jn=new Ri,ra=class r{constructor(){this.coordinateSystem=pi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Jn.setFromProjectionMatrix(Zn,i.coordinateSystem,i.reversedDepth),Jn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Jn.setFromProjectionMatrix(Zn,i.coordinateSystem,i.reversedDepth),Jn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Jn.setFromProjectionMatrix(Zn,i.coordinateSystem,i.reversedDepth),Jn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Jn.setFromProjectionMatrix(Zn,i.coordinateSystem,i.reversedDepth),Jn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Jn.setFromProjectionMatrix(Zn,i.coordinateSystem,i.reversedDepth),Jn.containsPoint(e))return!0}return!1}clone(){return new r}};var No=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Yp=new Qe,Zp=new je(1,1,1),Jp=new Ri,Kp=new ra,$p=new Nn,Qp=new Fn,em=new E,tm=new E,nm=new E,im=new No,rm=new at;var sm=new E,am=new E,om=new Qe,lm=new Gi,cm=new Fn,hm=new E,um=new E;var dm=new E,pm=new E;var mm=new Qe,fm=new Gi,gm=new Fn,vm=new E;var xt=class extends gn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},es=class extends gn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==gs&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ts=class extends gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gr=class r extends mt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,_=i+1,f=new E,g=new E;for(let v=0;v<=p;v++){let y=0,M=0,b=0,C=0;if(v<=n){let D=v/n,L=D*Math.PI/2;M=-h-e*Math.cos(L),b=e*Math.sin(L),C=-e*Math.cos(L),y=D*u}else if(v<=n+s){let D=(v-n)/s;M=D*t-h,b=e,C=0,y=u+D*d}else{let D=(v-n-s)/n,L=D*Math.PI/2;M=h+e*Math.sin(L),b=e*Math.cos(L),C=e*Math.sin(L),y=u+d+D*u}let G=Math.max(0,Math.min(1,y/m)),V=0;v===0?V=.5/i:v===p&&(V=-.5/i);for(let D=0;D<=i;D++){let L=D/i,O=L*Math.PI*2,N=Math.sin(O),j=Math.cos(O);g.x=-b*j,g.y=M,g.z=b*N,o.push(g.x,g.y,g.z),f.set(-b*j,C,b*N),f.normalize(),c.push(f.x,f.y,f.z),l.push(L+V,G)}if(v>0){let D=(v-1)*_;for(let L=0;L<i;L++){let O=D+L,N=D+L+1,j=v*_+L,X=v*_+L+1;a.push(O,N,j),a.push(N,X,j)}}}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Bn=class r extends mt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new E,h=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("normal",new De(o,3)),this.setAttribute("uv",new De(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},qe=class r extends mt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,_=[],f=n/2,g=0;function v(y){let M=p,b=new ue,C=new E,G=0,V=y===!0?e:t,D=y===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,f*D,0),d.push(0,D,0),m.push(.5,.5),p++;let L=p;for(let O=0;O<=i;O++){let N=O/i*c+o,j=Math.cos(N),X=Math.sin(N);C.x=V*X,C.y=f*D,C.z=V*j,u.push(C.x,C.y,C.z),d.push(0,D,0),b.x=.5*j+.5,b.y=.5*X*D+.5,m.push(b.x,b.y),p++}for(let O=0;O<i;O++){let N=M+O,j=L+O;y===!0?h.push(j,j+1,N):h.push(j+1,j,N),G+=3}l.addGroup(g,G,y===!0?1:2),g+=G}(function(){let y=new E,M=new E,b=0,C=(t-e)/n;for(let G=0;G<=s;G++){let V=[],D=G/s,L=D*(t-e)+e;for(let O=0;O<=i;O++){let N=O/i,j=N*c+o,X=Math.sin(j),te=Math.cos(j);M.x=L*X,M.y=-D*n+f,M.z=L*te,u.push(M.x,M.y,M.z),y.set(X,C,te).normalize(),d.push(y.x,y.y,y.z),m.push(N,1-D),V.push(p++)}_.push(V)}for(let G=0;G<i;G++)for(let V=0;V<s;V++){let D=_[V][G],L=_[V+1][G],O=_[V+1][G+1],N=_[V][G+1];(e>0||V!==0)&&(h.push(D,L,N),b+=3),(t>0||V!==s-1)&&(h.push(L,O,N),b+=3)}l.addGroup(g,b,0),g+=b})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(d,3)),this.setAttribute("uv",new De(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},sa=class r extends qe{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Pi=class r extends mt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,_,f){let g=f+1,v=[];for(let y=0;y<=g;y++){v[y]=[];let M=m.clone().lerp(_,y/g),b=p.clone().lerp(_,y/g),C=g-y;for(let G=0;G<=C;G++)v[y][G]=G===0&&y===g?M:M.clone().lerp(b,G/C)}for(let y=0;y<g;y++)for(let M=0;M<2*(g-y)-1;M++){let b=Math.floor(M/2);M%2==0?(c(v[y][b+1]),c(v[y+1][b]),c(v[y][b])):(c(v[y][b+1]),c(v[y+1][b+1]),c(v[y+1][b]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let _=3*m;p.x=e[_+0],p.y=e[_+1],p.z=e[_+2]}function h(m,p,_,f){f<0&&m.x===1&&(a[p]=m.x-1),_.x===0&&_.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new E,_=new E,f=new E;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],_),l(t[g+2],f),o(p,_,f,m)})(i),(function(m){let p=new E;for(let _=0;_<s.length;_+=3)p.x=s[_+0],p.y=s[_+1],p.z=s[_+2],p.normalize().multiplyScalar(m),s[_+0]=p.x,s[_+1]=p.y,s[_+2]=p.z})(n),(function(){let m=new E;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let _=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(_,1-f)}(function(){let p=new E,_=new E,f=new E,g=new E,v=new ue,y=new ue,M=new ue;for(let b=0,C=0;b<s.length;b+=9,C+=6){p.set(s[b+0],s[b+1],s[b+2]),_.set(s[b+3],s[b+4],s[b+5]),f.set(s[b+6],s[b+7],s[b+8]),v.set(a[C+0],a[C+1]),y.set(a[C+2],a[C+3]),M.set(a[C+4],a[C+5]),g.copy(p).add(_).add(f).divideScalar(3);let G=u(g);h(v,C+0,p,G),h(y,C+2,_,G),h(M,C+4,f,G)}})(),(function(){for(let p=0;p<a.length;p+=6){let _=a[p+0],f=a[p+2],g=a[p+4],v=Math.max(_,f,g),y=Math.min(_,f,g);v>.9&&y<.1&&(_<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new De(s,3)),this.setAttribute("normal",new De(s.slice(),3)),this.setAttribute("uv",new De(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},aa=class r extends Pi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Gs=new E,ks=new E,bo=new E,Vs=new ui,oa=class extends mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Ys*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:_,b:f,c:g}=Vs;if(_.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Vs.getNormal(bo),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let y=(v+1)%3,M=u[v],b=u[y],C=Vs[h[v]],G=Vs[h[y]],V=`${M}_${b}`,D=`${b}_${M}`;D in d&&d[D]?(bo.dot(d[D].normal)<=s&&(m.push(C.x,C.y,C.z),m.push(G.x,G.y,G.z)),d[D]=null):V in d||(d[V]={index0:l[v],index1:l[y],normal:bo.clone()})}}for(let p in d)if(d[p]){let{index0:_,index1:f}=d[p];Gs.fromBufferAttribute(o,_),ks.fromBufferAttribute(o,f),m.push(Gs.x,Gs.y,Gs.z),m.push(ks.x,ks.y,ks.z)}this.setAttribute("position",new De(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Rn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ue:new E);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,i=[],s=[],a=[],o=new E,c=new Qe;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new E)}s[0]=new E,a[0]=new E;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(lt(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(lt(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vr=class extends Rn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},la=class extends vr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Il(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Hs=new E,wo=new Il,Eo=new Il,Ao=new Il,Rt=class extends Rn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Hs.subVectors(i[0],i[1]).add(i[0]),o=Hs);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Hs.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Hs),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),_=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);_<1e-4&&(_=1),p<1e-4&&(p=_),f<1e-4&&(f=_),wo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,_,f),Eo.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,_,f),Ao.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,_,f)}else this.curveType==="catmullrom"&&(wo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Eo.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Ao.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(wo.calc(h),Eo.calc(h),Ao.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _c(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function kr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Vr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var ns=class extends Rn{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Vr(e,i.x,s.x,a.x,o.x),Vr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ca=class extends Rn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Vr(e,i.x,s.x,a.x,o.x),Vr(e,i.y,s.y,a.y,o.y),Vr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},is=class extends Rn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends Rn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rs=class extends Rn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(kr(e,i.x,s.x,a.x),kr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ss=class extends Rn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(kr(e,i.x,s.x,a.x),kr(e,i.y,s.y,a.y),kr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},as=class extends Rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(_c(o,c.x,l.x,h.x,u.x),_c(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ue().fromArray(i))}return this}},ua=Object.freeze({__proto__:null,ArcCurve:la,CatmullRomCurve3:Rt,CubicBezierCurve:ns,CubicBezierCurve3:ca,EllipseCurve:vr,LineCurve:is,LineCurve3:ha,QuadraticBezierCurve:rs,QuadraticBezierCurve3:ss,SplineCurve:as}),da=class extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ua[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ua[i.type]().fromJSON(i))}return this}},Mn=class extends da{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new is(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new rs(this.currentPoint.clone(),new ue(e,t),new ue(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new ns(this.currentPoint.clone(),new ue(e,t),new ue(n,i),new ue(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new as(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new vr(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},$t=class extends Mn{constructor(e){super(e),this.uuid=Ar(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Mn().fromJSON(i))}return this}};function Cu(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=yc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let _=0,f=u.length;_<f;_++){let g=yc(h,u[_]*m,_<f-1?u[_+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(Fu(g))}p.sort(Du);for(let _=0;_<p.length;_++)d=Uu(p[_],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return os(s,a,t,o,c,l,0),a}function yc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=xc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=xc(a/n|0,r[a],r[a+1],s);return s&&_r(s,s.next)&&(cs(s),s=s.next),s}function ki(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!_r(n,n.next)&&kt(n.prev,n,n.next)!==0)n=n.next;else{if(cs(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function os(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Fo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,_=1;do{let f,g=m;m=null;let v=null;for(p=0;g;){p++;let y=g,M=0;for(let C=0;C<_&&(M++,y=y.nextZ,y);C++);let b=_;for(;M>0||b>0&&y;)M!==0&&(b===0||!y||g.z<=y.z)?(f=g,g=g.nextZ,M--):(f=y,y=y.nextZ,b--),v?v.nextZ=f:m=f,f.prevZ=v,v=f;g=y}v.nextZ=null,_*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?Pu(r,n,i,s):Ru(r))e.push(c.i,r.i,l.i),cs(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?os(r=Iu(ki(r),e),e,t,n,i,s,2):a===2&&Lu(r,e,t,n,i,s):os(ki(r),e,t,n,i,s,1);break}}}function Ru(r){let e=r.prev,t=r,n=r.next;if(kt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&Gr(i,o,s,c,a,l,p.x,p.y)&&kt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Pu(r,e,t,n){let i=r.prev,s=r,a=r.next;if(kt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),_=Math.max(o,c,l),f=Math.max(h,u,d),g=Fo(m,p,e,t,n),v=Fo(_,f,e,t,n),y=r.prevZ,M=r.nextZ;for(;y&&y.z>=g&&M&&M.z<=v;){if(y.x>=m&&y.x<=_&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&Gr(o,h,c,u,l,d,y.x,y.y)&&kt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=m&&M.x<=_&&M.y>=p&&M.y<=f&&M!==i&&M!==a&&Gr(o,h,c,u,l,d,M.x,M.y)&&kt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=g;){if(y.x>=m&&y.x<=_&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&Gr(o,h,c,u,l,d,y.x,y.y)&&kt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=v;){if(M.x>=m&&M.x<=_&&M.y>=p&&M.y<=f&&M!==i&&M!==a&&Gr(o,h,c,u,l,d,M.x,M.y)&&kt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Iu(r,e){let t=r;do{let n=t.prev,i=t.next.next;!_r(n,i)&&Th(n,t,t.next,i)&&ls(n,i)&&ls(i,n)&&(e.push(n.i,t.i,i.i),cs(t),cs(t.next),t=r=i),t=t.next}while(t!==r);return ki(t)}function Lu(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ou(a,o)){let c=bh(a,o);return a=ki(a,a.next),c=ki(c,c.next),os(a,e,t,n,i,s,0),void os(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function Du(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Uu(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(_r(i,a))return a;do{if(_r(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let _=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(_<=o&&_>h&&(h=_,l=a.x<a.next.x?a:a.next,_===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Sh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let _=Math.abs(c-a.y)/(o-a.x);ls(a,i)&&(_<p||_===p&&(a.x>l.x||a.x===l.x&&Nu(l,a)))&&(l=a,p=_)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=bh(t,r);return ki(n,n.next),ki(t,t.next)}function Nu(r,e){return kt(r.prev,r,e.prev)<0&&kt(e.next,r,r.next)<0}function Fo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Fu(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Sh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Gr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Sh(r,e,t,n,i,s,a,o)}function Ou(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Th(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(ls(r,e)&&ls(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(kt(r.prev,r,e.prev)||kt(r,e.prev,e))||_r(r,e)&&kt(r.prev,r,r.next)>0&&kt(e.prev,e,e.next)>0)}function kt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function _r(r,e){return r.x===e.x&&r.y===e.y}function Th(r,e,t,n){let i=Xs(kt(r,e,t)),s=Xs(kt(r,e,n)),a=Xs(kt(t,n,r)),o=Xs(kt(t,n,e));return i!==s&&a!==o||!(i!==0||!Ws(r,t,e))||!(s!==0||!Ws(r,n,e))||!(a!==0||!Ws(t,r,n))||!(o!==0||!Ws(t,e,n))}function Ws(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Xs(r){return r>0?1:r<0?-1:0}function ls(r,e){return kt(r.prev,r,r.next)<0?kt(r,e,r.next)>=0&&kt(r,r.prev,e)>=0:kt(r,e,r.prev)<0||kt(r,r.next,e)<0}function bh(r,e){let t=Oo(r.i,r.x,r.y),n=Oo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function xc(r,e,t,n){let i=Oo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function cs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Oo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Bo=class{static triangulate(e,t,n=2){return Cu(e,t,n)}},$n=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Mc(e),Sc(n,e);let a=e.length;t.forEach(Mc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Sc(n,t[c]);let o=Bo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Mc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Sc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Xt=class r extends mt{constructor(e=new $t([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Bu,y,M,b,C,G,V=!1;g&&(y=g.getSpacedPoints(h),V=!0,d=!1,M=g.computeFrenetFrames(h,!1),b=new E,C=new E,G=new E),d||(f=0,m=0,p=0,_=0);let D=o.extractPoints(l),L=D.shape,O=D.holes;if(!$n.isClockWise(L)){L=L.reverse();for(let B=0,S=O.length;B<S;B++){let P=O[B];$n.isClockWise(P)&&(O[B]=P.reverse())}}function N(B){let S=10000000000000001e-36,P=B[0];for(let k=1;k<=B.length;k++){let F=k%B.length,ae=B[F],q=ae.x-P.x,J=ae.y-P.y,_e=q*q+J*J,Re=Math.max(Math.abs(ae.x),Math.abs(ae.y),Math.abs(P.x),Math.abs(P.y));_e<=S*Re*Re?(B.splice(F,1),k--):P=ae}}N(L),O.forEach(N);let j=O.length,X=L;for(let B=0;B<j;B++){let S=O[B];L=L.concat(S)}function te(B,S,P){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),B.clone().addScaledVector(S,P)}let ne=L.length;function me(B,S,P){let k,F,ae,q=B.x-S.x,J=B.y-S.y,_e=P.x-B.x,Re=P.y-B.y,Se=q*q+J*J,oe=q*Re-J*_e;if(Math.abs(oe)>Number.EPSILON){let be=Math.sqrt(Se),Ce=Math.sqrt(_e*_e+Re*Re),ke=S.x-J/be,Fe=S.y+q/be,Ze=((P.x-Re/Ce-ke)*Re-(P.y+_e/Ce-Fe)*_e)/(q*Re-J*_e);k=ke+q*Ze-B.x,F=Fe+J*Ze-B.y;let we=k*k+F*F;if(we<=2)return new ue(k,F);ae=Math.sqrt(we/2)}else{let be=!1;q>Number.EPSILON?_e>Number.EPSILON&&(be=!0):q<-Number.EPSILON?_e<-Number.EPSILON&&(be=!0):Math.sign(J)===Math.sign(Re)&&(be=!0),be?(k=-J,F=q,ae=Math.sqrt(Se)):(k=q,F=J,ae=Math.sqrt(Se/2))}return new ue(k/ae,F/ae)}let le=[];for(let B=0,S=X.length,P=S-1,k=B+1;B<S;B++,P++,k++)P===S&&(P=0),k===S&&(k=0),le[B]=me(X[B],X[P],X[k]);let Te=[],$,ce,Ie=le.concat();for(let B=0,S=j;B<S;B++){let P=O[B];$=[];for(let k=0,F=P.length,ae=F-1,q=k+1;k<F;k++,ae++,q++)ae===F&&(ae=0),q===F&&(q=0),$[k]=me(P[k],P[ae],P[q]);Te.push($),Ie=Ie.concat($)}if(f===0)ce=$n.triangulateShape(X,O);else{let B=[],S=[];for(let P=0;P<f;P++){let k=P/f,F=m*Math.cos(k*Math.PI/2),ae=p*Math.sin(k*Math.PI/2)+_;for(let q=0,J=X.length;q<J;q++){let _e=te(X[q],le[q],ae);Z(_e.x,_e.y,-F),k===0&&B.push(_e)}for(let q=0,J=j;q<J;q++){let _e=O[q];$=Te[q];let Re=[];for(let Se=0,oe=_e.length;Se<oe;Se++){let be=te(_e[Se],$[Se],ae);Z(be.x,be.y,-F),k===0&&Re.push(be)}k===0&&S.push(Re)}}ce=$n.triangulateShape(B,S)}let de=ce.length,Me=p+_;for(let B=0;B<ne;B++){let S=d?te(L[B],Ie[B],Me):L[B];V?(C.copy(M.normals[0]).multiplyScalar(S.x),b.copy(M.binormals[0]).multiplyScalar(S.y),G.copy(y[0]).add(C).add(b),Z(G.x,G.y,G.z)):Z(S.x,S.y,0)}for(let B=1;B<=h;B++)for(let S=0;S<ne;S++){let P=d?te(L[S],Ie[S],Me):L[S];V?(C.copy(M.normals[B]).multiplyScalar(P.x),b.copy(M.binormals[B]).multiplyScalar(P.y),G.copy(y[B]).add(C).add(b),Z(G.x,G.y,G.z)):Z(P.x,P.y,u/h*B)}for(let B=f-1;B>=0;B--){let S=B/f,P=m*Math.cos(S*Math.PI/2),k=p*Math.sin(S*Math.PI/2)+_;for(let F=0,ae=X.length;F<ae;F++){let q=te(X[F],le[F],k);Z(q.x,q.y,u+P)}for(let F=0,ae=O.length;F<ae;F++){let q=O[F];$=Te[F];for(let J=0,_e=q.length;J<_e;J++){let Re=te(q[J],$[J],k);V?Z(Re.x,Re.y+y[h-1].y,y[h-1].x+P):Z(Re.x,Re.y,u+P)}}}function ge(B,S){let P=B.length;for(;--P>=0;){let k=P,F=P-1;F<0&&(F=B.length-1);for(let ae=0,q=h+2*f;ae<q;ae++){let J=ne*ae,_e=ne*(ae+1);A(S+k+J,S+F+J,S+F+_e,S+k+_e)}}}function Z(B,S,P){c.push(B),c.push(S),c.push(P)}function Ee(B,S,P){w(B),w(S),w(P);let k=i.length/3,F=v.generateTopUV(n,i,k-3,k-2,k-1);H(F[0]),H(F[1]),H(F[2])}function A(B,S,P,k){w(B),w(S),w(k),w(S),w(P),w(k);let F=i.length/3,ae=v.generateSideWallUV(n,i,F-6,F-3,F-2,F-1);H(ae[0]),H(ae[1]),H(ae[3]),H(ae[1]),H(ae[2]),H(ae[3])}function w(B){i.push(c[3*B+0]),i.push(c[3*B+1]),i.push(c[3*B+2])}function H(B){s.push(B.x),s.push(B.y)}(function(){let B=i.length/3;if(d){let S=0,P=ne*S;for(let k=0;k<de;k++){let F=ce[k];Ee(F[2]+P,F[1]+P,F[0]+P)}S=h+2*f,P=ne*S;for(let k=0;k<de;k++){let F=ce[k];Ee(F[0]+P,F[1]+P,F[2]+P)}}else{for(let S=0;S<de;S++){let P=ce[S];Ee(P[2],P[1],P[0])}for(let S=0;S<de;S++){let P=ce[S];Ee(P[0]+ne*h,P[1]+ne*h,P[2]+ne*h)}}n.addGroup(B,i.length/3-B,0)})(),(function(){let B=i.length/3,S=0;ge(X,S),S+=X.length;for(let P=0,k=O.length;P<k;P++){let F=O[P];ge(F,S),S+=F.length}n.addGroup(B,i.length/3-B,1)})()}this.setAttribute("position",new De(i,3)),this.setAttribute("uv",new De(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ua[i.type]().fromJSON(i)),new r(n,e.options)}},Bu={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ue(s,a),new ue(o,c),new ue(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],_=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ue(a,1-c),new ue(l,1-u),new ue(d,1-p),new ue(_,1-g)]:[new ue(o,1-c),new ue(h,1-u),new ue(m,1-p),new ue(f,1-g)]}},pa=class r extends Pi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},gi=class r extends mt{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=lt(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new E,d=new ue,m=new E,p=new E,_=new E,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,_.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=_.x,m.y+=_.y,m.z+=_.z,m.normalize(),c.push(m.x,m.y,m.z),_.copy(p)}for(let v=0;v<=t;v++){let y=n+v*h*i,M=Math.sin(y),b=Math.cos(y);for(let C=0;C<=e.length-1;C++){u.x=e[C].x*M,u.y=e[C].y,u.z=e[C].x*b,a.push(u.x,u.y,u.z),d.x=v/t,d.y=C/(e.length-1),o.push(d.x,d.y);let G=c[3*C+0]*M,V=c[3*C+1],D=c[3*C+0]*b;l.push(G,V,D)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let M=y+v*e.length,b=M,C=M+e.length,G=M+e.length+1,V=M+1;s.push(b,C,V),s.push(G,V,C)}this.setIndex(s),this.setAttribute("position",new De(a,3)),this.setAttribute("uv",new De(o,2)),this.setAttribute("normal",new De(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},yr=class r extends Pi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},jt=class r extends mt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],_=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let y=0;y<l;y++){let M=y*u-s;p.push(M,-v,0),_.push(0,0,1),f.push(y/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let y=v+l*g,M=v+l*(g+1),b=v+1+l*(g+1),C=v+1+l*g;m.push(y,M,C),m.push(M,b,C)}this.setIndex(m),this.setAttribute("position",new De(p,3)),this.setAttribute("normal",new De(_,3)),this.setAttribute("uv",new De(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},ma=class r extends mt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new E,p=new ue;for(let _=0;_<=i;_++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){let f=_*(n+1);for(let g=0;g<n;g++){let v=g+f,y=v,M=v+n+1,b=v+n+2,C=v+1;o.push(y,M,C),o.push(M,b,C)}}this.setIndex(o),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Vi=class r extends mt{constructor(e=new $t([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;$n.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let v=p[f];$n.isClockWise(v)===!0&&(p[f]=v.reverse())}let _=$n.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let v=p[f];m=m.concat(v)}for(let f=0,g=m.length;f<g;f++){let v=m[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=_.length;f<g;f++){let v=_[f],y=v[0]+u,M=v[1]+u,b=v[2]+u;n.push(y,M,b),c+=3}}this.setIndex(n),this.setAttribute("position",new De(i,3)),this.setAttribute("normal",new De(s,3)),this.setAttribute("uv",new De(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},sn=class r extends mt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new E,d=new E,m=[],p=[],_=[],f=[];for(let g=0;g<=n;g++){let v=[],y=g/n,M=0;g===0&&a===0?M=.5/t:g===n&&c===Math.PI&&(M=-.5/t);for(let b=0;b<=t;b++){let C=b/t;u.x=-e*Math.cos(i+C*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+C*s)*Math.sin(a+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),f.push(C+M,1-y),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let y=h[g][v+1],M=h[g][v],b=h[g+1][v],C=h[g+1][v+1];(g!==0||a>0)&&m.push(y,M,C),(g!==n-1||c<Math.PI)&&m.push(M,b,C)}this.setIndex(m),this.setAttribute("position",new De(p,3)),this.setAttribute("normal",new De(_,3)),this.setAttribute("uv",new De(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},fa=class r extends Pi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},vt=class r extends mt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new E,u=new E,d=new E;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let _=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(_),u.y=(e+t*Math.cos(f))*Math.sin(_),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let _=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,v=(i+1)*m+p;a.push(_,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new De(o,3)),this.setAttribute("normal",new De(c,3)),this.setAttribute("uv",new De(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},ga=class r extends mt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new E,d=new E,m=new E,p=new E,_=new E,f=new E,g=new E;for(let y=0;y<=n;++y){let M=y/n*s*Math.PI*2;v(M,s,a,e,m),v(M+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),_.crossVectors(f,g),g.crossVectors(_,f),_.normalize(),g.normalize();for(let b=0;b<=i;++b){let C=b/i*Math.PI*2,G=-t*Math.cos(C),V=t*Math.sin(C);u.x=m.x+(G*g.x+V*_.x),u.y=m.y+(G*g.y+V*_.y),u.z=m.z+(G*g.z+V*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(b/i)}}for(let y=1;y<=n;y++)for(let M=1;M<=i;M++){let b=(i+1)*(y-1)+(M-1),C=(i+1)*y+(M-1),G=(i+1)*y+M,V=(i+1)*(y-1)+M;o.push(b,C,V),o.push(C,G,V)}function v(y,M,b,C,G){let V=Math.cos(y),D=Math.sin(y),L=b/M*y,O=Math.cos(L);G.x=C*(2+O)*.5*V,G.y=C*(2+O)*D*.5,G.z=C*Math.sin(L)*.5}this.setIndex(o),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},wt=class r extends mt{constructor(e=new ss(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new E,c=new E,l=new ue,h=new E,u=[],d=[],m=[],p=[];function _(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let y=0;y<=i;y++){let M=y/i*Math.PI*2,b=Math.sin(M),C=-Math.cos(M);c.x=C*g.x+b*v.x,c.y=C*g.y+b*v.y,c.z=C*g.z+b*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)_(f);_(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),y=(i+1)*f+(g-1),M=(i+1)*f+g,b=(i+1)*(f-1)+g;p.push(v,y,b),p.push(y,M,b)}})()})(),this.setIndex(p),this.setAttribute("position",new De(u,3)),this.setAttribute("normal",new De(d,3)),this.setAttribute("uv",new De(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ua[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},va=class extends mt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,s=new E;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let _=0;_<3;_++){let f=o.getX(m+_),g=o.getX(m+(_+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Tc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Tc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new De(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Tc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var _m=Object.freeze({__proto__:null,BoxGeometry:ht,CapsuleGeometry:gr,CircleGeometry:Bn,ConeGeometry:sa,CylinderGeometry:qe,DodecahedronGeometry:aa,EdgesGeometry:oa,ExtrudeGeometry:Xt,IcosahedronGeometry:pa,LatheGeometry:gi,OctahedronGeometry:yr,PlaneGeometry:jt,PolyhedronGeometry:Pi,RingGeometry:ma,ShapeGeometry:Vi,SphereGeometry:sn,TetrahedronGeometry:fa,TorusGeometry:vt,TorusKnotGeometry:ga,TubeGeometry:wt,WireframeGeometry:va}),hs=class extends fi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new je(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Wt=class extends fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_n=class extends Wt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var _a=class extends fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ya=class extends fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function js(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function zu(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Hi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xa=class extends Hi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Io,endingEnd:Io}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Lo:s=e,o=2*t-n;break;case Do:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Lo:a=e,c=2*n-t;break;case Do:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),_=p*p,f=_*p,g=-d*f+2*d*_-d*p,v=(1+d)*f+(-1.5-2*d)*_+(-.5+d)*p+1,y=(-1-m)*f+(1.5+m)*_+.5*p,M=m*f-m*_;for(let b=0;b!==o;++b)s[b]=g*a[h+b]+v*a[l+b]+y*a[c+b]+M*a[u+b];return s}},Ma=class extends Hi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Sa=class extends Hi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},An=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=js(t,this.TimeBufferType),this.values=js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:js(e.times,Array),values:js(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Hr:t=this.InterpolantFactoryMethodDiscrete;break;case Js:t=this.InterpolantFactoryMethodLinear;break;case qs:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hr;case this.InterpolantFactoryMethodLinear:return Js;case this.InterpolantFactoryMethodSmooth:return qs}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&zu(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qs,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};An.prototype.ValueTypeName="",An.prototype.TimeBufferType=Float32Array,An.prototype.ValueBufferType=Float32Array,An.prototype.DefaultInterpolation=Js;var Ai=class extends An{constructor(e,t,n){super(e,t,n)}};Ai.prototype.ValueTypeName="bool",Ai.prototype.ValueBufferType=Array,Ai.prototype.DefaultInterpolation=Hr,Ai.prototype.InterpolantFactoryMethodLinear=void 0,Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends An{constructor(e,t,n,i){super(e,t,n,i)}};Ta.prototype.ValueTypeName="color";var ba=class extends An{constructor(e,t,n,i){super(e,t,n,i)}};ba.prototype.ValueTypeName="number";var wa=class extends Hi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Cn.slerpFlat(s,0,a,l-o,a,l,c);return s}},us=class extends An{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new wa(this.times,this.values,this.getValueSize(),e)}};us.prototype.ValueTypeName="quaternion",us.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends An{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="string",Ci.prototype.ValueBufferType=Array,Ci.prototype.DefaultInterpolation=Hr,Ci.prototype.InterpolantFactoryMethodLinear=void 0,Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends An{constructor(e,t,n,i){super(e,t,n,i)}};Ea.prototype.ValueTypeName="vector";var Aa=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},wh=new Aa,Ca=class{constructor(e){this.manager=e!==void 0?e:wh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ca.DEFAULT_MATERIAL_NAME="__DEFAULT";var xr=class extends hn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Pn=class extends xr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Co=new Qe,bc=new E,wc=new E,Ra=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=ii,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ri,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(bc),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),Co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Co)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ec=new Qe,zr=new E,Ro=new E,zo=class extends Ra{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),zr.setFromMatrixPosition(e.matrixWorld),n.position.copy(zr),Ro.copy(n.position),Ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ro),n.updateMatrixWorld(),i.makeTranslation(-zr.x,-zr.y,-zr.z),Ec.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec,n.coordinateSystem,n.reversedDepth)}},Mr=class extends xr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},vi=class extends mr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Go=class extends Ra{constructor(){super(new vi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Sn=class extends xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new Go}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ym=new Qe,xm=new Qe,Mm=new Qe;var Pa=class extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Sm=new E,Tm=new Cn,bm=new E,wm=new E,Em=new E;var Am=new E,Cm=new Cn,Rm=new E,Pm=new E;var Ll="\\[\\]\\.:\\/",Gu=new RegExp("["+Ll+"]","g"),Po="[^"+Ll+"]",ku="[^"+Ll.replace("\\.","")+"]",Vu=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Po)+/(WCOD+)?/.source.replace("WCOD",ku)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Po)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Po)+"$"),Hu=["material","materials","bones","map"],Ft=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Gu,"")}static parseTrackName(e){let t=Vu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Hu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=class{constructor(r,e,t){let n=t||Ft.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray],Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Im=new Float32Array(1);var Lm=new Qe;var Dm=new ue;var Um=new E,Nm=new E,Fm=new E,Om=new E,Bm=new E,zm=new E,Gm=new E;var km=new E;var Vm=new E,Hm=new Qe,Wm=new Qe;var Xm=new E,jm=new je,qm=new je;var Ym=new E,Zm=new E,Jm=new E;var Km=new E,$m=new mr;var Qm=new Nn;var ef=new E;function Dl(r,e,t,n){let i=(function(s){switch(s){case ii:case qo:return{byteLength:1,components:1};case wr:case Yo:case Li:return{byteLength:2,components:1};case Ha:case Wa:return{byteLength:2,components:4};case ji:case Va:case Xn:return{byteLength:4,components:1};case Zo:case Jo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Xa:case ja:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case jn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Zh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Xu(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var ot={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Pe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},ri={basic:{uniforms:dn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:dn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new je(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:dn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:dn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:dn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new je(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:dn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:dn([Pe.points,Pe.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:dn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:dn([Pe.common,Pe.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:dn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:dn([Pe.sprite,Pe.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:dn([Pe.common,Pe.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:dn([Pe.lights,Pe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};ri.physical={uniforms:dn([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var Ka={r:0,b:0,g:0},Zi=new Wn,ju=new Qe;function qu(r,e,t,n,i,s,a){let o=new je(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function _(f,g){f.getRGB(Ka,Pl(r)),n.buffers.color.setClear(Ka.r,Ka.g,Ka.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,_(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,_(o,h)},render:function(f){let g=!1,v=p(f);v===null?_(o,h):v&&v.isColor&&(_(v,1),g=!0);let y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=p(g);v&&(v.isCubeTexture||v.mapping===ms)?(l===void 0&&(l=new at(new ht(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Yi(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,M,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Zi.copy(g.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ju.makeRotationFromEuler(Zi)),l.material.toneMapped=gt.getTransfer(v.colorSpace)!==bt,u===v&&d===v.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new at(new jt(2,2),new un({name:"BackgroundMaterial",uniforms:Yi(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=gt.getTransfer(v.colorSpace)!==bt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Yu(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],y=[],M=[];for(let b=0;b<t;b++)v[b]=0,y[b]=0,M[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:y,attributeDivisors:M,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,y=g.length;v<y;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let y=s.newAttributes,M=s.enabledAttributes,b=s.attributeDivisors;y[g]=1,M[g]===0&&(r.enableVertexAttribArray(g),M[g]=1),b[g]!==v&&(r.vertexAttribDivisor(g,v),b[g]=v)}function m(){let g=s.newAttributes,v=s.enabledAttributes;for(let y=0,M=v.length;y<M;y++)v[y]!==g[y]&&(r.disableVertexAttribArray(y),v[y]=0)}function p(g,v,y,M,b,C,G){G===!0?r.vertexAttribIPointer(g,v,y,b,C):r.vertexAttribPointer(g,v,y,M,b,C)}function _(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,y,M,b){let C=!1,G=(function(V,D,L){let O=L.wireframe===!0,N=n[V.id];N===void 0&&(N={},n[V.id]=N);let j=N[D.id];j===void 0&&(j={},N[D.id]=j);let X=j[O];return X===void 0&&(X=l(r.createVertexArray()),j[O]=X),X})(M,y,v);s!==G&&(s=G,o(s.object)),C=(function(V,D,L,O){let N=s.attributes,j=D.attributes,X=0,te=L.getAttributes();for(let ne in te)if(te[ne].location>=0){let me=N[ne],le=j[ne];if(le===void 0&&(ne==="instanceMatrix"&&V.instanceMatrix&&(le=V.instanceMatrix),ne==="instanceColor"&&V.instanceColor&&(le=V.instanceColor)),me===void 0||me.attribute!==le||le&&me.data!==le.data)return!0;X++}return s.attributesNum!==X||s.index!==O})(g,M,y,b),C&&(function(V,D,L,O){let N={},j=D.attributes,X=0,te=L.getAttributes();for(let ne in te)if(te[ne].location>=0){let me=j[ne];me===void 0&&(ne==="instanceMatrix"&&V.instanceMatrix&&(me=V.instanceMatrix),ne==="instanceColor"&&V.instanceColor&&(me=V.instanceColor));let le={};le.attribute=me,me&&me.data&&(le.data=me.data),N[ne]=le,X++}s.attributes=N,s.attributesNum=X,s.index=O})(g,M,y,b),b!==null&&e.update(b,r.ELEMENT_ARRAY_BUFFER),(C||a)&&(a=!1,(function(V,D,L,O){h();let N=O.attributes,j=L.getAttributes(),X=D.defaultAttributeValues;for(let te in j){let ne=j[te];if(ne.location>=0){let me=N[te];if(me===void 0&&(te==="instanceMatrix"&&V.instanceMatrix&&(me=V.instanceMatrix),te==="instanceColor"&&V.instanceColor&&(me=V.instanceColor)),me!==void 0){let le=me.normalized,Te=me.itemSize,$=e.get(me);if($===void 0)continue;let ce=$.buffer,Ie=$.type,de=$.bytesPerElement,Me=Ie===r.INT||Ie===r.UNSIGNED_INT||me.gpuType===Va;if(me.isInterleavedBufferAttribute){let ge=me.data,Z=ge.stride,Ee=me.offset;if(ge.isInstancedInterleavedBuffer){for(let A=0;A<ne.locationSize;A++)d(ne.location+A,ge.meshPerAttribute);V.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let A=0;A<ne.locationSize;A++)u(ne.location+A);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let A=0;A<ne.locationSize;A++)p(ne.location+A,Te/ne.locationSize,Ie,le,Z*de,(Ee+Te/ne.locationSize*A)*de,Me)}else{if(me.isInstancedBufferAttribute){for(let ge=0;ge<ne.locationSize;ge++)d(ne.location+ge,me.meshPerAttribute);V.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ge=0;ge<ne.locationSize;ge++)u(ne.location+ge);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let ge=0;ge<ne.locationSize;ge++)p(ne.location+ge,Te/ne.locationSize,Ie,le,Te*de,Te/ne.locationSize*ge*de,Me)}}else if(X!==void 0){let le=X[te];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(ne.location,le);break;case 3:r.vertexAttrib3fv(ne.location,le);break;case 4:r.vertexAttrib4fv(ne.location,le);break;default:r.vertexAttrib1fv(ne.location,le)}}}}m()})(g,v,y,M),b!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(b).buffer))},reset:_,resetDefaultState:f,dispose:function(){_();for(let g in n){let v=n[g];for(let y in v){let M=v[y];for(let b in M)c(M[b].object),delete M[b];delete v[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let y in v){let M=v[y];for(let b in M)c(M[b].object),delete M[b];delete v[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let y=n[v];if(y[g.id]===void 0)continue;let M=y[g.id];for(let b in M)c(M[b].object),delete M[b];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Zu(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Ju(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===jn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===Li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==ii&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Xn&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Ku(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Kn,o=new rt,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,_=null;if(p!==0){if(_=c.value,m!==!0||_===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(_===null||_.length<f)&&(_=new Float32Array(f));for(let v=0,y=d;v!==p;++v,y+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(_,y),_[y+3]=a.constant}c.value=_,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,_}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,_=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!_)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,y=f.clippingState||null;c.value=y,y=l(m,u,v,d);for(let M=0;M!==v;++M)y[M]=t[M];f.clippingState=y,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function $u(r){let e=new WeakMap;function t(i,s){return s===za?i.mapping=br:s===Ga&&(i.mapping=Wi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===za||s===Ga){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new na(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Eh=[.125,.215,.35,.446,.526,.582],_s=20,Ul=new vi,Ah=new je,Nl=null,Fl=0,Ol=0,Bl=!1,Ki=(1+Math.sqrt(5))/2,Cr=1/Ki,Ch=[new E(-Ki,Cr,0),new E(Ki,Cr,0),new E(-Cr,0,Ki),new E(Cr,0,Ki),new E(0,Ki,-Cr),new E(0,Ki,Cr),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],Qu=new E,Pr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Qu}=s;Nl=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),Bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nl,Fl,Ol),this._renderer.xr.enabled=Bl,e.scissorTest=!1,$a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===Wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nl=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),Bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Li,format:jn,colorSpace:zi,depthBuffer:!1},i=Rh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Eh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=Eh[d-a+4-1]:d===0&&(p=0),l.push(p);let _=1/(m-2),f=-_,g=1+_,v=[f,f,g,f,g,g,f,f,g,g,f,g],y=6,M=6,b=3,C=2,G=1,V=new Float32Array(b*M*y),D=new Float32Array(C*M*y),L=new Float32Array(G*M*y);for(let N=0;N<y;N++){let j=N%3*2/3-1,X=N>2?0:-1,te=[j,X,0,j+2/3,X,0,j+2/3,X+1,0,j,X,0,j+2/3,X+1,0,j,X+1,0];V.set(te,b*M*N),D.set(v,C*M*N);let ne=[N,N,N,N,N,N];L.set(ne,G*M*N)}let O=new mt;O.setAttribute("position",new xn(V,b)),O.setAttribute("uv",new xn(D,C)),O.setAttribute("faceIndex",new xn(L,G)),o.push(O),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(_s),h=new E(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new at(this._lodPlanes[0],e);this._renderer.compile(t,Ul)}_sceneToCubeUV(e,t,n,i,s){let a=new Gt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Ah),l.toneMapping=_i,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new On({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),m=new at(new ht,d),p=!1,_=e.background;_?_.isColor&&(d.color.copy(_),e.background=null,p=!0):(d.color.copy(Ah),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;$a(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=_}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===br||e.mapping===Wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new at(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;$a(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Ul)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ch[(i-s-1)%Ch.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new at(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,_=isFinite(s)?1+Math.floor(3*p):_s;_>_s&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to 20`);let f=[],g=0;for(let M=0;M<_s;++M){let b=M/p,C=Math.exp(-b*b/2);f.push(C),M===0?g+=C:M<_&&(g+=2*C)}for(let M=0;M<f.length;M++)f[M]=f[M]/g;u.envMap.value=e.texture,u.samples.value=_,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let y=this._sizeLods[i];$a(t,3*y*(i>v-4?i-v+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Ul)}};function Rh(r,e,t){let n=new Un(r,e,t);return n.texture.mapping=ms,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $a(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Ph(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Ih(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Yl(){return`

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
	`}function ed(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===za||s===Ga,o=s===br||s===Wi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Pr(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new Pr(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function td(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&dr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function nd(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let _=h.array;d=h.version;for(let f=0,g=_.length;f<g;f+=3){let v=_[f+0],y=_[f+1],M=_[f+2];l.push(v,y,y,M,M,v)}}else{if(u===void 0)return;{let _=u.array;d=u.version;for(let f=0,g=_.length/3-1;f<g;f+=3){let v=f+0,y=f+1,M=f+2;l.push(v,y,y,M,M,v)}}}let m=new(Rl(l)?Jr:Zr)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function id(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function rd(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function sd(r,e,t){let n=new WeakMap,i=new yt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let V=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",V)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),p===!0&&(v=3);let y=a.attributes.position.count*v,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let b=new Float32Array(y*M*4*h),C=new qr(b,y,M,h);C.type=Xn,C.needsUpdate=!0;let G=4*v;for(let D=0;D<h;D++){let L=_[D],O=f[D],N=g[D],j=y*M*4*D;for(let X=0;X<L.count;X++){let te=X*G;d===!0&&(i.fromBufferAttribute(L,X),b[j+te+0]=i.x,b[j+te+1]=i.y,b[j+te+2]=i.z,b[j+te+3]=0),m===!0&&(i.fromBufferAttribute(O,X),b[j+te+4]=i.x,b[j+te+5]=i.y,b[j+te+6]=i.z,b[j+te+7]=0),p===!0&&(i.fromBufferAttribute(N,X),b[j+te+8]=i.x,b[j+te+9]=i.y,b[j+te+10]=i.z,b[j+te+11]=N.itemSize===4?i.w:1)}}u={count:h,texture:C,size:new ue(y,M)},n.set(a,u),a.addEventListener("dispose",V)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function ad(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Jh=new gn,Lh=new es(1,1),Kh=new qr,$h=new ea,Qh=new Kr,Dh=[],Uh=[],Nh=new Float32Array(16),Fh=new Float32Array(9),Oh=new Float32Array(4);function Ir(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Dh[i];if(s===void 0&&(s=new Float32Array(i),Dh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Qt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function en(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function eo(r,e){let t=Uh[e];t===void 0&&(t=new Int32Array(e),Uh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function od(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ld(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2fv(this.addr,e),en(t,e)}}function cd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Qt(t,e))return;r.uniform3fv(this.addr,e),en(t,e)}}function hd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4fv(this.addr,e),en(t,e)}}function ud(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;Oh.set(n),r.uniformMatrix2fv(this.addr,!1,Oh),en(t,n)}}function dd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;Fh.set(n),r.uniformMatrix3fv(this.addr,!1,Fh),en(t,n)}}function pd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;Nh.set(n),r.uniformMatrix4fv(this.addr,!1,Nh),en(t,n)}}function md(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function fd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2iv(this.addr,e),en(t,e)}}function gd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3iv(this.addr,e),en(t,e)}}function vd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4iv(this.addr,e),en(t,e)}}function _d(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function yd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2uiv(this.addr,e),en(t,e)}}function xd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3uiv(this.addr,e),en(t,e)}}function Md(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4uiv(this.addr,e),en(t,e)}}function Sd(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Lh.compareFunction=Al,s=Lh):s=Jh,t.setTexture2D(e||s,i)}function Td(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$h,i)}function bd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Qh,i)}function wd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kh,i)}function Ed(r,e){r.uniform1fv(this.addr,e)}function Ad(r,e){let t=Ir(e,this.size,2);r.uniform2fv(this.addr,t)}function Cd(r,e){let t=Ir(e,this.size,3);r.uniform3fv(this.addr,t)}function Rd(r,e){let t=Ir(e,this.size,4);r.uniform4fv(this.addr,t)}function Pd(r,e){let t=Ir(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Id(r,e){let t=Ir(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ld(r,e){let t=Ir(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Dd(r,e){r.uniform1iv(this.addr,e)}function Ud(r,e){r.uniform2iv(this.addr,e)}function Nd(r,e){r.uniform3iv(this.addr,e)}function Fd(r,e){r.uniform4iv(this.addr,e)}function Od(r,e){r.uniform1uiv(this.addr,e)}function Bd(r,e){r.uniform2uiv(this.addr,e)}function zd(r,e){r.uniform3uiv(this.addr,e)}function Gd(r,e){r.uniform4uiv(this.addr,e)}function kd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Jh,s[a])}function Vd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||$h,s[a])}function Hd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Qh,s[a])}function Wd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Kh,s[a])}var Gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return od;case 35664:return ld;case 35665:return cd;case 35666:return hd;case 35674:return ud;case 35675:return dd;case 35676:return pd;case 5124:case 35670:return md;case 35667:case 35671:return fd;case 35668:case 35672:return gd;case 35669:case 35673:return vd;case 5125:return _d;case 36294:return yd;case 36295:return xd;case 36296:return Md;case 35678:case 36198:case 36298:case 36306:case 35682:return Sd;case 35679:case 36299:case 36307:return Td;case 35680:case 36300:case 36308:case 36293:return bd;case 36289:case 36303:case 36311:case 36292:return wd}})(t.type)}},kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Ed;case 35664:return Ad;case 35665:return Cd;case 35666:return Rd;case 35674:return Pd;case 35675:return Id;case 35676:return Ld;case 5124:case 35670:return Dd;case 35667:case 35671:return Ud;case 35668:case 35672:return Nd;case 35669:case 35673:return Fd;case 5125:return Od;case 36294:return Bd;case 36295:return zd;case 36296:return Gd;case 35678:case 36198:case 36298:case 36306:case 35682:return kd;case 35679:case 36299:case 36307:return Vd;case 35680:case 36300:case 36308:case 36293:return Hd;case 36289:case 36303:case 36311:case 36292:return Wd}})(t.type)}},Vl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},zl=/(\w+)(\])?(\[|\.)?/g;function Bh(r,e){r.seq.push(e),r.map[e.id]=e}function Xd(r,e,t){let n=r.name,i=n.length;for(zl.lastIndex=0;;){let s=zl.exec(n),a=zl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){Bh(t,l===void 0?new Gl(o,r,e):new kl(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Vl(o),Bh(t,h)),t=h}}}var Rr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Xd(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function zh(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var jd=0,Gh=new rt;function kh(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function qd(r,e){let t=(function(n){gt._getMatrix(Gh,gt.workingColorSpace,n);let i=`mat3( ${Gh.elements.map(s=>s.toFixed(4))} )`;switch(gt.getTransfer(n)){case Wr:return[i,"LinearTransferOETF"];case bt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Yd(r,e){let t;switch(e){case $c:t="Linear";break;case Qc:t="Reinhard";break;case eh:t="Cineon";break;case ni:t="ACESFilmic";break;case nh:t="AgX";break;case ih:t="Neutral";break;case th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Qa=new E;function Zd(){return gt.getLuminanceCoefficients(Qa),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Qa.x.toFixed(4)}, ${Qa.y.toFixed(4)}, ${Qa.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ys(r){return r!==""}function Vh(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Jd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(r){return r.replace(Jd,$d)}var Kd=new Map;function $d(r,e){let t=ot[e];if(t===void 0){let n=Kd.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Hl(t)}var Qd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wh(r){return r.replace(Qd,ep)}function ep(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Xh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function tp(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(O){let N="SHADOWMAP_TYPE_BASIC";return O.shadowMapType===Vo?N="SHADOWMAP_TYPE_PCF":O.shadowMapType===Ia?N="SHADOWMAP_TYPE_PCF_SOFT":O.shadowMapType===ti&&(N="SHADOWMAP_TYPE_VSM"),N})(t),l=(function(O){let N="ENVMAP_TYPE_CUBE";if(O.envMap)switch(O.envMapMode){case br:case Wi:N="ENVMAP_TYPE_CUBE";break;case ms:N="ENVMAP_TYPE_CUBE_UV"}return N})(t),h=(function(O){let N="ENVMAP_MODE_REFLECTION";return O.envMap&&O.envMapMode===Wi&&(N="ENVMAP_MODE_REFRACTION"),N})(t),u=(function(O){let N="ENVMAP_BLENDING_NONE";if(O.envMap)switch(O.combine){case Zc:N="ENVMAP_BLENDING_MULTIPLY";break;case Jc:N="ENVMAP_BLENDING_MIX";break;case Kc:N="ENVMAP_BLENDING_ADD"}return N})(t),d=(function(O){let N=O.envMapCubeUVHeight;if(N===null)return null;let j=Math.log2(N)-2,X=1/N;return{texelWidth:1/(3*Math.max(Math.pow(2,j),112)),texelHeight:X,maxMip:j}})(t),m=(function(O){return[O.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",O.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ys).join(`
`)})(t),p=(function(O){let N=[];for(let j in O){let X=O[j];X!==!1&&N.push("#define "+j+" "+X)}return N.join(`
`)})(s),_=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ys).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ys).join(`
`),g.length>0&&(g+=`
`)):(f=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),g=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?ot.tonemapping_pars_fragment:"",t.toneMapping!==_i?Yd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,qd("linearToOutputTexel",t.outputColorSpace),Zd(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ys).join(`
`)),a=Hl(a),a=Vh(a,t),a=Hh(a,t),o=Hl(o),o=Vh(o,t),o=Hh(o,t),a=Wh(a),o=Wh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=v+f+a,M=v+g+o,b=zh(i,i.VERTEX_SHADER,y),C=zh(i,i.FRAGMENT_SHADER,M);function G(O){if(r.debug.checkShaderErrors){let N=i.getProgramInfoLog(_)||"",j=i.getShaderInfoLog(b)||"",X=i.getShaderInfoLog(C)||"",te=N.trim(),ne=j.trim(),me=X.trim(),le=!0,Te=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,b,C);else{let $=kh(i,b,"vertex"),ce=kh(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+te+`
`+$+`
`+ce)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):ne!==""&&me!==""||(Te=!1);Te&&(O.diagnostics={runnable:le,programLog:te,vertexShader:{log:ne,prefix:f},fragmentShader:{log:me,prefix:g}})}i.deleteShader(b),i.deleteShader(C),V=new Rr(i,_),D=(function(N,j){let X={},te=N.getProgramParameter(j,N.ACTIVE_ATTRIBUTES);for(let ne=0;ne<te;ne++){let me=N.getActiveAttrib(j,ne),le=me.name,Te=1;me.type===N.FLOAT_MAT2&&(Te=2),me.type===N.FLOAT_MAT3&&(Te=3),me.type===N.FLOAT_MAT4&&(Te=4),X[le]={type:me.type,location:N.getAttribLocation(j,le),locationSize:Te}}return X})(i,_)}let V,D;i.attachShader(_,b),i.attachShader(_,C),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_),this.getUniforms=function(){return V===void 0&&G(this),V},this.getAttributes=function(){return D===void 0&&G(this),D};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(_,37297)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jd++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=C,this}var np=0,Wl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xl(e),t.set(e,n)),n}},Xl=class{constructor(e){this.id=np++,this.code=e,this.usedTimes=0}};function ip(r,e,t,n,i,s,a){let o=new Yr,c=new Wl,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,y,M){let b=y.fog,C=M.geometry,G=f.isMeshStandardMaterial?y.environment:null,V=(f.isMeshStandardMaterial?t:e).get(f.envMap||G),D=V&&V.mapping===ms?V.image.height:null,L=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let O=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,N=O!==void 0?O.length:0,j,X,te,ne,me=0;if(C.morphAttributes.position!==void 0&&(me=1),C.morphAttributes.normal!==void 0&&(me=2),C.morphAttributes.color!==void 0&&(me=3),L){let Mt=ri[L];j=Mt.vertexShader,X=Mt.fragmentShader}else j=f.vertexShader,X=f.fragmentShader,c.update(f),te=c.getVertexShaderID(f),ne=c.getFragmentShaderID(f);let le=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),$=M.isInstancedMesh===!0,ce=M.isBatchedMesh===!0,Ie=!!f.map,de=!!f.matcap,Me=!!V,ge=!!f.aoMap,Z=!!f.lightMap,Ee=!!f.bumpMap,A=!!f.normalMap,w=!!f.displacementMap,H=!!f.emissiveMap,B=!!f.metalnessMap,S=!!f.roughnessMap,P=f.anisotropy>0,k=f.clearcoat>0,F=f.dispersion>0,ae=f.iridescence>0,q=f.sheen>0,J=f.transmission>0,_e=P&&!!f.anisotropyMap,Re=k&&!!f.clearcoatMap,Se=k&&!!f.clearcoatNormalMap,oe=k&&!!f.clearcoatRoughnessMap,be=ae&&!!f.iridescenceMap,Ce=ae&&!!f.iridescenceThicknessMap,ke=q&&!!f.sheenColorMap,Fe=q&&!!f.sheenRoughnessMap,Ze=!!f.specularMap,we=!!f.specularColorMap,ze=!!f.specularIntensityMap,et=J&&!!f.transmissionMap,zt=J&&!!f.thicknessMap,Oe=!!f.gradientMap,ut=!!f.alphaMap,tt=f.alphaTest>0,an=!!f.alphaHash,Et=!!f.extensions,z=_i;f.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(z=r.toneMapping));let Ot={shaderID:L,shaderType:f.type,shaderName:f.name,vertexShader:j,fragmentShader:X,defines:f.defines,customVertexShaderID:te,customFragmentShaderID:ne,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:ce,batchingColor:ce&&M._colorsTexture!==null,instancing:$,instancingColor:$&&M.instanceColor!==null,instancingMorph:$&&M.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:zi,alphaToCoverage:!!f.alphaToCoverage,map:Ie,matcap:de,envMap:Me,envMapMode:Me&&V.mapping,envMapCubeUVHeight:D,aoMap:ge,lightMap:Z,bumpMap:Ee,normalMap:A,displacementMap:d&&w,emissiveMap:H,normalMapObjectSpace:A&&f.normalMapType===hh,normalMapTangentSpace:A&&f.normalMapType===ch,metalnessMap:B,roughnessMap:S,anisotropy:P,anisotropyMap:_e,clearcoat:k,clearcoatMap:Re,clearcoatNormalMap:Se,clearcoatRoughnessMap:oe,dispersion:F,iridescence:ae,iridescenceMap:be,iridescenceThicknessMap:Ce,sheen:q,sheenColorMap:ke,sheenRoughnessMap:Fe,specularMap:Ze,specularColorMap:we,specularIntensityMap:ze,transmission:J,transmissionMap:et,thicknessMap:zt,gradientMap:Oe,opaque:f.transparent===!1&&f.blending===ds&&f.alphaToCoverage===!1,alphaMap:ut,alphaTest:tt,alphaHash:an,combine:f.combine,mapUv:Ie&&_(f.map.channel),aoMapUv:ge&&_(f.aoMap.channel),lightMapUv:Z&&_(f.lightMap.channel),bumpMapUv:Ee&&_(f.bumpMap.channel),normalMapUv:A&&_(f.normalMap.channel),displacementMapUv:w&&_(f.displacementMap.channel),emissiveMapUv:H&&_(f.emissiveMap.channel),metalnessMapUv:B&&_(f.metalnessMap.channel),roughnessMapUv:S&&_(f.roughnessMap.channel),anisotropyMapUv:_e&&_(f.anisotropyMap.channel),clearcoatMapUv:Re&&_(f.clearcoatMap.channel),clearcoatNormalMapUv:Se&&_(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(f.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&_(f.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&_(f.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(f.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(f.sheenRoughnessMap.channel),specularMapUv:Ze&&_(f.specularMap.channel),specularColorMapUv:we&&_(f.specularColorMap.channel),specularIntensityMapUv:ze&&_(f.specularIntensityMap.channel),transmissionMapUv:et&&_(f.transmissionMap.channel),thicknessMapUv:zt&&_(f.thicknessMap.channel),alphaMapUv:ut&&_(f.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(A||P),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!C.attributes.uv&&(Ie||ut),fog:!!b,useFog:f.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Te,skinning:M.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:me,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:z,decodeVideoTexture:Ie&&f.map.isVideoTexture===!0&&gt.getTransfer(f.map.colorSpace)===bt,decodeVideoTextureEmissive:H&&f.emissiveMap.isVideoTexture===!0&&gt.getTransfer(f.emissiveMap.colorSpace)===bt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Vt,flipSided:f.side===In,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Et&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&f.extensions.multiDraw===!0||ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Ot.vertexUv1s=l.has(1),Ot.vertexUv2s=l.has(2),Ot.vertexUv3s=l.has(3),l.clear(),Ot},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)})(g,f),(function(v,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],v;if(g){let y=ri[g];v=Mh.clone(y.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let y=0,M=h.length;y<M;y++){let b=h[y];if(b.cacheKey===g){v=b,++v.usedTimes;break}}return v===void 0&&(v=new tp(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function rp(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function sp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function jh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function qh(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||sp),n.length>1&&n.sort(o||jh),i.length>1&&i.sort(o||jh)}}}function ap(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new qh,r.set(e,[i])):t>=n.length?(i=new qh,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function op(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new je};break;case"SpotLight":t={position:new E,direction:new E,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new E,halfWidth:new E,halfHeight:new E}}return r[e.id]=t,t}}}var lp=0;function cp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function hp(r){let e=new op,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new E);let i=new E,s=new Qe,a=new Qe;return{setup:function(o){let c=0,l=0,h=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let u=0,d=0,m=0,p=0,_=0,f=0,g=0,v=0,y=0,M=0,b=0;o.sort(cp);for(let G=0,V=o.length;G<V;G++){let D=o[G],L=D.color,O=D.intensity,N=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=L.r*O,l+=L.g*O,h+=L.b*O;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],O);b++}else if(D.isDirectionalLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let te=D.shadow,ne=t.get(D);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,n.directionalShadow[u]=ne,n.directionalShadowMap[u]=j,n.directionalShadowMatrix[u]=D.shadow.matrix,f++}n.directional[u]=X,u++}else if(D.isSpotLight){let X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(L).multiplyScalar(O),X.distance=N,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[m]=X;let te=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,te.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[m]=te.matrix,D.castShadow){let ne=t.get(D);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,n.spotShadow[m]=ne,n.spotShadowMap[m]=j,v++}m++}else if(D.isRectAreaLight){let X=e.get(D);X.color.copy(L).multiplyScalar(O),X.halfWidth.set(.5*D.width,0,0),X.halfHeight.set(0,.5*D.height,0),n.rectArea[p]=X,p++}else if(D.isPointLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let te=D.shadow,ne=t.get(D);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,ne.shadowCameraNear=te.camera.near,ne.shadowCameraFar=te.camera.far,n.pointShadow[d]=ne,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=X,d++}else if(D.isHemisphereLight){let X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(O),X.groundColor.copy(D.groundColor).multiplyScalar(O),n.hemi[_]=X,_++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let C=n.hash;C.directionalLength===u&&C.pointLength===d&&C.spotLength===m&&C.rectAreaLength===p&&C.hemiLength===_&&C.numDirectionalShadows===f&&C.numPointShadows===g&&C.numSpotShadows===v&&C.numSpotMaps===y&&C.numLightProbes===b||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=_,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+y-M,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=b,C.directionalLength=u,C.pointLength=d,C.spotLength=m,C.rectAreaLength=p,C.hemiLength=_,C.numDirectionalShadows=f,C.numPointShadows=g,C.numSpotShadows=v,C.numSpotMaps=y,C.numLightProbes=b,n.version=lp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let _=0,f=o.length;_<f;_++){let g=o[_];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(p),m++}}},state:n}}function Yh(r){let e=new hp(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function up(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Yh(r),e.set(t,[s])):n>=i.length?(s=new Yh(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function dp(r,e,t){let n=new Ri,i=new ue,s=new ue,a=new yt,o=new _a({depthPacking:lh}),c=new ya,l={},h=t.maxTextureSize,u={[Sr]:In,[In]:Sr,[Vt]:Vt},d=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new mt;p.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new at(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo;let g=this.type;function v(C,G){let V=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Un(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(G,null,V,d,_,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(G,null,V,m,_,null)}function y(C,G,V,D){let L=null,O=V.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(O!==void 0)L=O;else if(L=V.isPointLight===!0?c:o,r.localClippingEnabled&&G.clipShadows===!0&&Array.isArray(G.clippingPlanes)&&G.clippingPlanes.length!==0||G.displacementMap&&G.displacementScale!==0||G.alphaMap&&G.alphaTest>0||G.map&&G.alphaTest>0||G.alphaToCoverage===!0){let N=L.uuid,j=G.uuid,X=l[N];X===void 0&&(X={},l[N]=X);let te=X[j];te===void 0&&(te=L.clone(),X[j]=te,G.addEventListener("dispose",b)),L=te}return L.visible=G.visible,L.wireframe=G.wireframe,L.side=D===ti?G.shadowSide!==null?G.shadowSide:G.side:G.shadowSide!==null?G.shadowSide:u[G.side],L.alphaMap=G.alphaMap,L.alphaTest=G.alphaToCoverage===!0?.5:G.alphaTest,L.map=G.map,L.clipShadows=G.clipShadows,L.clippingPlanes=G.clippingPlanes,L.clipIntersection=G.clipIntersection,L.displacementMap=G.displacementMap,L.displacementScale=G.displacementScale,L.displacementBias=G.displacementBias,L.wireframeLinewidth=G.wireframeLinewidth,L.linewidth=G.linewidth,V.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(r.properties.get(L).light=V),L}function M(C,G,V,D,L){if(C.visible===!1)return;if(C.layers.test(G.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&L===ti)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,C.matrixWorld);let N=e.update(C),j=C.material;if(Array.isArray(j)){let X=N.groups;for(let te=0,ne=X.length;te<ne;te++){let me=X[te],le=j[me.materialIndex];if(le&&le.visible){let Te=y(C,le,D,L);C.onBeforeShadow(r,C,G,V,N,Te,me),r.renderBufferDirect(V,null,N,Te,C,me),C.onAfterShadow(r,C,G,V,N,Te,me)}}}else if(j.visible){let X=y(C,j,D,L);C.onBeforeShadow(r,C,G,V,N,X,null),r.renderBufferDirect(V,null,N,X,C,null),C.onAfterShadow(r,C,G,V,N,X,null)}}let O=C.children;for(let N=0,j=O.length;N<j;N++)M(O[N],G,V,D,L)}function b(C){C.target.removeEventListener("dispose",b);for(let G in l){let V=l[G],D=C.target.uuid;D in V&&(V[D].dispose(),delete V[D])}}this.render=function(C,G,V){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;let D=r.getRenderTarget(),L=r.getActiveCubeFace(),O=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Ii),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let j=g!==ti&&this.type===ti,X=g===ti&&this.type!==ti;for(let te=0,ne=C.length;te<ne;te++){let me=C[te],le=me.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",me,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;i.copy(le.mapSize);let Te=le.getFrameExtents();if(i.multiply(Te),s.copy(le.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Te.x),i.x=s.x*Te.x,le.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Te.y),i.y=s.y*Te.y,le.mapSize.y=s.y)),le.map===null||j===!0||X===!0){let ce=this.type!==ti?{minFilter:Qn,magFilter:Qn}:{};le.map!==null&&le.map.dispose(),le.map=new Un(i.x,i.y,ce),le.map.texture.name=me.name+".shadowMap",le.camera.updateProjectionMatrix()}r.setRenderTarget(le.map),r.clear();let $=le.getViewportCount();for(let ce=0;ce<$;ce++){let Ie=le.getViewport(ce);a.set(s.x*Ie.x,s.y*Ie.y,s.x*Ie.z,s.y*Ie.w),N.viewport(a),le.updateMatrices(me,ce),n=le.getFrustum(),M(G,V,le.camera,me,this.type)}le.isPointLightShadow!==!0&&this.type===ti&&v(le,V),le.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(D,L,O)}}var pp={[La]:Da,[Ua]:Oa,[Na]:Ba,[ps]:Fa,[Da]:La,[Oa]:Ua,[Ba]:Na,[Fa]:ps};function mp(r,e){let t=new function(){let S=!1,P=new yt,k=null,F=new yt(0,0,0,0);return{setMask:function(ae){k===ae||S||(r.colorMask(ae,ae,ae,ae),k=ae)},setLocked:function(ae){S=ae},setClear:function(ae,q,J,_e,Re){Re===!0&&(ae*=_e,q*=_e,J*=_e),P.set(ae,q,J,_e),F.equals(P)===!1&&(r.clearColor(ae,q,J,_e),F.copy(P))},reset:function(){S=!1,k=null,F.set(-1,0,0,0)}}},n=new function(){let S=!1,P=!1,k=null,F=null,ae=null;return{setReversed:function(q){if(P!==q){let J=e.get("EXT_clip_control");q?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),P=q;let _e=ae;ae=null,this.setClear(_e)}},getReversed:function(){return P},setTest:function(q){q?Me(r.DEPTH_TEST):ge(r.DEPTH_TEST)},setMask:function(q){k===q||S||(r.depthMask(q),k=q)},setFunc:function(q){if(P&&(q=pp[q]),F!==q){switch(q){case La:r.depthFunc(r.NEVER);break;case Da:r.depthFunc(r.ALWAYS);break;case Ua:r.depthFunc(r.LESS);break;case ps:r.depthFunc(r.LEQUAL);break;case Na:r.depthFunc(r.EQUAL);break;case Fa:r.depthFunc(r.GEQUAL);break;case Oa:r.depthFunc(r.GREATER);break;case Ba:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}F=q}},setLocked:function(q){S=q},setClear:function(q){ae!==q&&(P&&(q=1-q),r.clearDepth(q),ae=q)},reset:function(){S=!1,k=null,F=null,ae=null,P=!1}}},i=new function(){let S=!1,P=null,k=null,F=null,ae=null,q=null,J=null,_e=null,Re=null;return{setTest:function(Se){S||(Se?Me(r.STENCIL_TEST):ge(r.STENCIL_TEST))},setMask:function(Se){P===Se||S||(r.stencilMask(Se),P=Se)},setFunc:function(Se,oe,be){k===Se&&F===oe&&ae===be||(r.stencilFunc(Se,oe,be),k=Se,F=oe,ae=be)},setOp:function(Se,oe,be){q===Se&&J===oe&&_e===be||(r.stencilOp(Se,oe,be),q=Se,J=oe,_e=be)},setLocked:function(Se){S=Se},setClear:function(Se){Re!==Se&&(r.clearStencil(Se),Re=Se)},reset:function(){S=!1,P=null,k=null,F=null,ae=null,q=null,J=null,_e=null,Re=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,_=null,f=null,g=null,v=null,y=null,M=new je(0,0,0),b=0,C=!1,G=null,V=null,D=null,L=null,O=null,N=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,X=0,te=r.getParameter(r.VERSION);te.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(te)[1]),j=X>=1):te.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),j=X>=2);let ne=null,me={},le=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),$=new yt().fromArray(le),ce=new yt().fromArray(Te);function Ie(S,P,k,F){let ae=new Uint8Array(4),q=r.createTexture();r.bindTexture(S,q),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let J=0;J<k;J++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,F,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(P+J,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return q}let de={};function Me(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function ge(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}de[r.TEXTURE_2D]=Ie(r.TEXTURE_2D,r.TEXTURE_2D,1),de[r.TEXTURE_CUBE_MAP]=Ie(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[r.TEXTURE_2D_ARRAY]=Ie(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),de[r.TEXTURE_3D]=Ie(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Me(r.DEPTH_TEST),n.setFunc(ps),w(!1),H(ko),Me(r.CULL_FACE),A(Ii);let Z={[Tr]:r.FUNC_ADD,[Pc]:r.FUNC_SUBTRACT,[Ic]:r.FUNC_REVERSE_SUBTRACT};Z[Lc]=r.MIN,Z[Dc]=r.MAX;let Ee={[Uc]:r.ZERO,[Nc]:r.ONE,[Fc]:r.SRC_COLOR,[Bc]:r.SRC_ALPHA,[Wc]:r.SRC_ALPHA_SATURATE,[Vc]:r.DST_COLOR,[Gc]:r.DST_ALPHA,[Oc]:r.ONE_MINUS_SRC_COLOR,[zc]:r.ONE_MINUS_SRC_ALPHA,[Hc]:r.ONE_MINUS_DST_COLOR,[kc]:r.ONE_MINUS_DST_ALPHA,[Xc]:r.CONSTANT_COLOR,[jc]:r.ONE_MINUS_CONSTANT_COLOR,[qc]:r.CONSTANT_ALPHA,[Yc]:r.ONE_MINUS_CONSTANT_ALPHA};function A(S,P,k,F,ae,q,J,_e,Re,Se){if(S!==Ii){if(d===!1&&(Me(r.BLEND),d=!0),S===Rc)ae=ae||P,q=q||k,J=J||F,P===p&&ae===g||(r.blendEquationSeparate(Z[P],Z[ae]),p=P,g=ae),k===_&&F===f&&q===v&&J===y||(r.blendFuncSeparate(Ee[k],Ee[F],Ee[q],Ee[J]),_=k,f=F,v=q,y=J),_e.equals(M)!==!1&&Re===b||(r.blendColor(_e.r,_e.g,_e.b,Re),M.copy(_e),b=Re),m=S,C=!1;else if(S!==m||Se!==C){if(p===Tr&&g===Tr||(r.blendEquation(r.FUNC_ADD),p=Tr,g=Tr),Se)switch(S){case ds:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ho:r.blendFunc(r.ONE,r.ONE);break;case Wo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xo:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case ds:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ho:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Wo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}_=null,f=null,v=null,y=null,M.set(0,0,0),b=0,m=S,C=Se}}else d===!0&&(ge(r.BLEND),d=!1)}function w(S){G!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),G=S)}function H(S){S!==Ac?(Me(r.CULL_FACE),S!==V&&(S===ko?r.cullFace(r.BACK):S===Cc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ge(r.CULL_FACE),V=S}function B(S,P,k){S?(Me(r.POLYGON_OFFSET_FILL),L===P&&O===k||(r.polygonOffset(P,k),L=P,O=k)):ge(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Me,disable:ge,bindFramebuffer:function(S,P){return c[S]!==P&&(r.bindFramebuffer(S,P),c[S]=P,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(S,P){let k=h,F=!1;if(S){k=l.get(P),k===void 0&&(k=[],l.set(P,k));let ae=S.textures;if(k.length!==ae.length||k[0]!==r.COLOR_ATTACHMENT0){for(let q=0,J=ae.length;q<J;q++)k[q]=r.COLOR_ATTACHMENT0+q;k.length=ae.length,F=!0}}else k[0]!==r.BACK&&(k[0]=r.BACK,F=!0);F&&r.drawBuffers(k)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:A,setMaterial:function(S,P){S.side===Vt?ge(r.CULL_FACE):Me(r.CULL_FACE);let k=S.side===In;P&&(k=!k),w(k),S.blending===ds&&S.transparent===!1?A(Ii):A(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let F=S.stencilWrite;i.setTest(F),F&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),B(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?Me(r.SAMPLE_ALPHA_TO_COVERAGE):ge(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:w,setCullFace:H,setLineWidth:function(S){S!==D&&(j&&r.lineWidth(S),D=S)},setPolygonOffset:B,setScissorTest:function(S){S?Me(r.SCISSOR_TEST):ge(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+N-1),ne!==S&&(r.activeTexture(S),ne=S)},bindTexture:function(S,P,k){k===void 0&&(k=ne===null?r.TEXTURE0+N-1:ne);let F=me[k];F===void 0&&(F={type:void 0,texture:void 0},me[k]=F),F.type===S&&F.texture===P||(ne!==k&&(r.activeTexture(k),ne=k),r.bindTexture(S,P||de[S]),F.type=S,F.texture=P)},unbindTexture:function(){let S=me[ne];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,P){let k=a.get(P);k===void 0&&(k=new WeakMap,a.set(P,k));let F=k.get(S);F===void 0&&(F=r.getUniformBlockIndex(P,S.name),k.set(S,F))},uniformBlockBinding:function(S,P){let k=a.get(P).get(S);s.get(P)!==k&&(r.uniformBlockBinding(P,k,S.__bindingPointIndex),s.set(P,k))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){$.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),$.copy(S))},viewport:function(S){ce.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),ce.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ne=null,me={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,_=null,f=null,g=null,v=null,y=null,M=new je(0,0,0),b=0,C=!1,G=null,V=null,D=null,L=null,O=null,$.set(0,0,r.canvas.width,r.canvas.height),ce.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function fp(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,w){return m?new OffscreenCanvas(A,w):jr("canvas")}function _(A,w,H){let B=1,S=Ee(A);if((S.width>H||S.height>H)&&(B=H/Math.max(S.width,S.height)),B<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let P=Math.floor(B*S.width),k=Math.floor(B*S.height);u===void 0&&(u=p(P,k));let F=w?p(P,k):u;return F.width=P,F.height=k,F.getContext("2d").drawImage(A,0,0,P,k),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+P+"x"+k+")."),F}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),A}return A}function f(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(A,w,H,B,S=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let P=w;if(w===r.RED&&(H===r.FLOAT&&(P=r.R32F),H===r.HALF_FLOAT&&(P=r.R16F),H===r.UNSIGNED_BYTE&&(P=r.R8)),w===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.R8UI),H===r.UNSIGNED_SHORT&&(P=r.R16UI),H===r.UNSIGNED_INT&&(P=r.R32UI),H===r.BYTE&&(P=r.R8I),H===r.SHORT&&(P=r.R16I),H===r.INT&&(P=r.R32I)),w===r.RG&&(H===r.FLOAT&&(P=r.RG32F),H===r.HALF_FLOAT&&(P=r.RG16F),H===r.UNSIGNED_BYTE&&(P=r.RG8)),w===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.RG8UI),H===r.UNSIGNED_SHORT&&(P=r.RG16UI),H===r.UNSIGNED_INT&&(P=r.RG32UI),H===r.BYTE&&(P=r.RG8I),H===r.SHORT&&(P=r.RG16I),H===r.INT&&(P=r.RG32I)),w===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.RGB8UI),H===r.UNSIGNED_SHORT&&(P=r.RGB16UI),H===r.UNSIGNED_INT&&(P=r.RGB32UI),H===r.BYTE&&(P=r.RGB8I),H===r.SHORT&&(P=r.RGB16I),H===r.INT&&(P=r.RGB32I)),w===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),H===r.UNSIGNED_INT&&(P=r.RGBA32UI),H===r.BYTE&&(P=r.RGBA8I),H===r.SHORT&&(P=r.RGBA16I),H===r.INT&&(P=r.RGBA32I)),w===r.RGB&&(H===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),H===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),w===r.RGBA){let k=S?Wr:gt.getTransfer(B);H===r.FLOAT&&(P=r.RGBA32F),H===r.HALF_FLOAT&&(P=r.RGBA16F),H===r.UNSIGNED_BYTE&&(P=k===bt?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function M(A,w){let H;return A?w===null||w===ji||w===Er?H=r.DEPTH24_STENCIL8:w===Xn?H=r.DEPTH32F_STENCIL8:w===wr&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ji||w===Er?H=r.DEPTH_COMPONENT24:w===Xn?H=r.DEPTH_COMPONENT32F:w===wr&&(H=r.DEPTH_COMPONENT16),H}function b(A,w){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==Qn&&A.minFilter!==ei?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function C(A){let w=A.target;w.removeEventListener("dispose",C),(function(H){let B=n.get(H);if(B.__webglInit===void 0)return;let S=H.source,P=d.get(S);if(P){let k=P[B.__cacheKey];k.usedTimes--,k.usedTimes===0&&V(H),Object.keys(P).length===0&&d.delete(S)}n.remove(H)})(w),w.isVideoTexture&&h.delete(w)}function G(A){let w=A.target;w.removeEventListener("dispose",G),(function(H){let B=n.get(H);if(H.depthTexture&&(H.depthTexture.dispose(),n.remove(H.depthTexture)),H.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(B.__webglFramebuffer[P]))for(let k=0;k<B.__webglFramebuffer[P].length;k++)r.deleteFramebuffer(B.__webglFramebuffer[P][k]);else r.deleteFramebuffer(B.__webglFramebuffer[P]);B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer[P])}else{if(Array.isArray(B.__webglFramebuffer))for(let P=0;P<B.__webglFramebuffer.length;P++)r.deleteFramebuffer(B.__webglFramebuffer[P]);else r.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&r.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let P=0;P<B.__webglColorRenderbuffer.length;P++)B.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(B.__webglColorRenderbuffer[P]);B.__webglDepthRenderbuffer&&r.deleteRenderbuffer(B.__webglDepthRenderbuffer)}let S=H.textures;for(let P=0,k=S.length;P<k;P++){let F=n.get(S[P]);F.__webglTexture&&(r.deleteTexture(F.__webglTexture),a.memory.textures--),n.remove(S[P])}n.remove(H)})(w)}function V(A){let w=n.get(A);r.deleteTexture(w.__webglTexture);let H=A.source;delete d.get(H)[w.__cacheKey],a.memory.textures--}let D=0;function L(A,w){let H=n.get(A);if(A.isVideoTexture&&(function(B){let S=a.render.frame;h.get(B)!==S&&(h.set(B,S),B.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&H.__version!==A.version){let B=A.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(B.complete!==!1)return void me(H,A,w);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+w)}let O={[Hn]:r.REPEAT,[ur]:r.CLAMP_TO_EDGE,[Zs]:r.MIRRORED_REPEAT},N={[Qn]:r.NEAREST,[rh]:r.NEAREST_MIPMAP_NEAREST,[fs]:r.NEAREST_MIPMAP_LINEAR,[ei]:r.LINEAR,[ka]:r.LINEAR_MIPMAP_NEAREST,[Xi]:r.LINEAR_MIPMAP_LINEAR},j={[uh]:r.NEVER,[vh]:r.ALWAYS,[dh]:r.LESS,[Al]:r.LEQUAL,[ph]:r.EQUAL,[gh]:r.GEQUAL,[mh]:r.GREATER,[fh]:r.NOTEQUAL};function X(A,w){if(w.type!==Xn||e.has("OES_texture_float_linear")!==!1||w.magFilter!==ei&&w.magFilter!==ka&&w.magFilter!==fs&&w.magFilter!==Xi&&w.minFilter!==ei&&w.minFilter!==ka&&w.minFilter!==fs&&w.minFilter!==Xi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,O[w.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,O[w.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,O[w.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,N[w.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,N[w.minFilter]),w.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,j[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Qn||w.minFilter!==fs&&w.minFilter!==Xi||w.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function te(A,w){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",C));let B=w.source,S=d.get(B);S===void 0&&(S={},d.set(B,S));let P=(function(k){let F=[];return F.push(k.wrapS),F.push(k.wrapT),F.push(k.wrapR||0),F.push(k.magFilter),F.push(k.minFilter),F.push(k.anisotropy),F.push(k.internalFormat),F.push(k.format),F.push(k.type),F.push(k.generateMipmaps),F.push(k.premultiplyAlpha),F.push(k.flipY),F.push(k.unpackAlignment),F.push(k.colorSpace),F.join()})(w);if(P!==A.__cacheKey){S[P]===void 0&&(S[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,H=!0),S[P].usedTimes++;let k=S[A.__cacheKey];k!==void 0&&(S[A.__cacheKey].usedTimes--,k.usedTimes===0&&V(w)),A.__cacheKey=P,A.__webglTexture=S[P].texture}return H}function ne(A,w,H){return Math.floor(Math.floor(A/H)/w)}function me(A,w,H){let B=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(B=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(B=r.TEXTURE_3D);let S=te(A,w),P=w.source;t.bindTexture(B,A.__webglTexture,r.TEXTURE0+H);let k=n.get(P);if(P.version!==k.__version||S===!0){t.activeTexture(r.TEXTURE0+H);let F=gt.getPrimaries(gt.workingColorSpace),ae=w.colorSpace===qi?null:gt.getPrimaries(w.colorSpace),q=w.colorSpace===qi||F===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let J=_(w.image,!1,i.maxTextureSize);J=Z(w,J);let _e=s.convert(w.format,w.colorSpace),Re=s.convert(w.type),Se,oe=y(w.internalFormat,_e,Re,w.colorSpace,w.isVideoTexture);X(B,w);let be=w.mipmaps,Ce=w.isVideoTexture!==!0,ke=k.__version===void 0||S===!0,Fe=P.dataReady,Ze=b(w,J);if(w.isDepthTexture)oe=M(w.format===vs,w.type),ke&&(Ce?t.texStorage2D(r.TEXTURE_2D,1,oe,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,oe,J.width,J.height,0,_e,Re,null));else if(w.isDataTexture)if(be.length>0){Ce&&ke&&t.texStorage2D(r.TEXTURE_2D,Ze,oe,be[0].width,be[0].height);for(let we=0,ze=be.length;we<ze;we++)Se=be[we],Ce?Fe&&t.texSubImage2D(r.TEXTURE_2D,we,0,0,Se.width,Se.height,_e,Re,Se.data):t.texImage2D(r.TEXTURE_2D,we,oe,Se.width,Se.height,0,_e,Re,Se.data);w.generateMipmaps=!1}else Ce?(ke&&t.texStorage2D(r.TEXTURE_2D,Ze,oe,J.width,J.height),Fe&&(function(we,ze,et,zt){let Oe=we.updateRanges;if(Oe.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,ze.width,ze.height,et,zt,ze.data);else{Oe.sort((z,Ot)=>z.start-Ot.start);let ut=0;for(let z=1;z<Oe.length;z++){let Ot=Oe[ut],Mt=Oe[z],pt=Ot.start+Ot.count,It=ne(Mt.start,ze.width,4),it=ne(Ot.start,ze.width,4);Mt.start<=pt+1&&It===it&&ne(Mt.start+Mt.count-1,ze.width,4)===It?Ot.count=Math.max(Ot.count,Mt.start+Mt.count-Ot.start):(++ut,Oe[ut]=Mt)}Oe.length=ut+1;let tt=r.getParameter(r.UNPACK_ROW_LENGTH),an=r.getParameter(r.UNPACK_SKIP_PIXELS),Et=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,ze.width);for(let z=0,Ot=Oe.length;z<Ot;z++){let Mt=Oe[z],pt=Math.floor(Mt.start/4),It=Math.ceil(Mt.count/4),it=pt%ze.width,qt=Math.floor(pt/ze.width),St=It;r.pixelStorei(r.UNPACK_SKIP_PIXELS,it),r.pixelStorei(r.UNPACK_SKIP_ROWS,qt),t.texSubImage2D(r.TEXTURE_2D,0,it,qt,St,1,et,zt,ze.data)}we.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,tt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,an),r.pixelStorei(r.UNPACK_SKIP_ROWS,Et)}})(w,J,_e,Re)):t.texImage2D(r.TEXTURE_2D,0,oe,J.width,J.height,0,_e,Re,J.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ce&&ke&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ze,oe,be[0].width,be[0].height,J.depth);for(let we=0,ze=be.length;we<ze;we++)if(Se=be[we],w.format!==jn)if(_e!==null)if(Ce){if(Fe)if(w.layerUpdates.size>0){let et=Dl(Se.width,Se.height,w.format,w.type);for(let zt of w.layerUpdates){let Oe=Se.data.subarray(zt*et/Se.data.BYTES_PER_ELEMENT,(zt+1)*et/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,we,0,0,zt,Se.width,Se.height,1,_e,Oe)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,we,0,0,0,Se.width,Se.height,J.depth,_e,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,we,oe,Se.width,Se.height,J.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?Fe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,we,0,0,0,Se.width,Se.height,J.depth,_e,Re,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,we,oe,Se.width,Se.height,J.depth,0,_e,Re,Se.data)}else{Ce&&ke&&t.texStorage2D(r.TEXTURE_2D,Ze,oe,be[0].width,be[0].height);for(let we=0,ze=be.length;we<ze;we++)Se=be[we],w.format!==jn?_e!==null?Ce?Fe&&t.compressedTexSubImage2D(r.TEXTURE_2D,we,0,0,Se.width,Se.height,_e,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,we,oe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?Fe&&t.texSubImage2D(r.TEXTURE_2D,we,0,0,Se.width,Se.height,_e,Re,Se.data):t.texImage2D(r.TEXTURE_2D,we,oe,Se.width,Se.height,0,_e,Re,Se.data)}else if(w.isDataArrayTexture)if(Ce){if(ke&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ze,oe,J.width,J.height,J.depth),Fe)if(w.layerUpdates.size>0){let we=Dl(J.width,J.height,w.format,w.type);for(let ze of w.layerUpdates){let et=J.data.subarray(ze*we/J.data.BYTES_PER_ELEMENT,(ze+1)*we/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ze,J.width,J.height,1,_e,Re,et)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,_e,Re,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,oe,J.width,J.height,J.depth,0,_e,Re,J.data);else if(w.isData3DTexture)Ce?(ke&&t.texStorage3D(r.TEXTURE_3D,Ze,oe,J.width,J.height,J.depth),Fe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,_e,Re,J.data)):t.texImage3D(r.TEXTURE_3D,0,oe,J.width,J.height,J.depth,0,_e,Re,J.data);else if(w.isFramebufferTexture){if(ke)if(Ce)t.texStorage2D(r.TEXTURE_2D,Ze,oe,J.width,J.height);else{let we=J.width,ze=J.height;for(let et=0;et<Ze;et++)t.texImage2D(r.TEXTURE_2D,et,oe,we,ze,0,_e,Re,null),we>>=1,ze>>=1}}else if(be.length>0){if(Ce&&ke){let we=Ee(be[0]);t.texStorage2D(r.TEXTURE_2D,Ze,oe,we.width,we.height)}for(let we=0,ze=be.length;we<ze;we++)Se=be[we],Ce?Fe&&t.texSubImage2D(r.TEXTURE_2D,we,0,0,_e,Re,Se):t.texImage2D(r.TEXTURE_2D,we,oe,_e,Re,Se);w.generateMipmaps=!1}else if(Ce){if(ke){let we=Ee(J);t.texStorage2D(r.TEXTURE_2D,Ze,oe,we.width,we.height)}Fe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,_e,Re,J)}else t.texImage2D(r.TEXTURE_2D,0,oe,_e,Re,J);f(w)&&g(B),k.__version=P.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function le(A,w,H,B,S,P){let k=s.convert(H.format,H.colorSpace),F=s.convert(H.type),ae=y(H.internalFormat,k,F,H.colorSpace),q=n.get(w),J=n.get(H);if(J.__renderTarget=w,!q.__hasExternalTextures){let _e=Math.max(1,w.width>>P),Re=Math.max(1,w.height>>P);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,P,ae,_e,Re,w.depth,0,k,F,null):t.texImage2D(S,P,ae,_e,Re,0,k,F,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),ge(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,B,S,J.__webglTexture,0,Me(w)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,B,S,J.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(A,w,H){if(r.bindRenderbuffer(r.RENDERBUFFER,A),w.depthBuffer){let B=w.depthTexture,S=B&&B.isDepthTexture?B.type:null,P=M(w.stencilBuffer,S),k=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,F=Me(w);ge(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,F,P,w.width,w.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,F,P,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,P,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,k,r.RENDERBUFFER,A)}else{let B=w.textures;for(let S=0;S<B.length;S++){let P=B[S],k=s.convert(P.format,P.colorSpace),F=s.convert(P.type),ae=y(P.internalFormat,k,F,P.colorSpace),q=Me(w);H&&ge(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,q,ae,w.width,w.height):ge(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,q,ae,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,ae,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function $(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!w.depthTexture||!w.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let H=n.get(w.depthTexture);H.__renderTarget=w,H.__webglTexture&&w.depthTexture.image.width===w.width&&w.depthTexture.image.height===w.height||(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),L(w.depthTexture,0);let B=H.__webglTexture,S=Me(w);if(w.depthTexture.format===gs)ge(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,B,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,B,0);else{if(w.depthTexture.format!==vs)throw new Error("Unknown depthTexture format");ge(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,B,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,B,0)}}function ce(A){let w=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){let B=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),B){let S=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,B.removeEventListener("dispose",S)};B.addEventListener("dispose",S),w.__depthDisposeCallback=S}w.__boundDepthTexture=B}if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let B=A.texture.mipmaps;B&&B.length>0?$(w.__webglFramebuffer[0],A):$(w.__webglFramebuffer,A)}else if(H){w.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[B]),w.__webglDepthbuffer[B]===void 0)w.__webglDepthbuffer[B]=r.createRenderbuffer(),Te(w.__webglDepthbuffer[B],A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=w.__webglDepthbuffer[B];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}else{let B=A.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),Te(w.__webglDepthbuffer,A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ie=[],de=[];function Me(A){return Math.min(i.maxSamples,A.samples)}function ge(A){let w=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Z(A,w){let H=A.colorSpace,B=A.format,S=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==zi&&H!==qi&&(gt.getTransfer(H)===bt?B===jn&&S===ii||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Ee(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A},this.resetTextureUnits=function(){D=0},this.setTexture2D=L,this.setTexture2DArray=function(A,w){let H=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version?me(H,A,w):t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+w)},this.setTexture3D=function(A,w){let H=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version?me(H,A,w):t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+w)},this.setTextureCube=function(A,w){let H=n.get(A);A.version>0&&H.__version!==A.version?(function(B,S,P){if(S.image.length!==6)return;let k=te(B,S),F=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+P);let ae=n.get(F);if(F.version!==ae.__version||k===!0){t.activeTexture(r.TEXTURE0+P);let q=gt.getPrimaries(gt.workingColorSpace),J=S.colorSpace===qi?null:gt.getPrimaries(S.colorSpace),_e=S.colorSpace===qi||q===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Re=S.isCompressedTexture||S.image[0].isCompressedTexture,Se=S.image[0]&&S.image[0].isDataTexture,oe=[];for(let Oe=0;Oe<6;Oe++)oe[Oe]=Re||Se?Se?S.image[Oe].image:S.image[Oe]:_(S.image[Oe],!0,i.maxCubemapSize),oe[Oe]=Z(S,oe[Oe]);let be=oe[0],Ce=s.convert(S.format,S.colorSpace),ke=s.convert(S.type),Fe=y(S.internalFormat,Ce,ke,S.colorSpace),Ze=S.isVideoTexture!==!0,we=ae.__version===void 0||k===!0,ze=F.dataReady,et,zt=b(S,be);if(X(r.TEXTURE_CUBE_MAP,S),Re){Ze&&we&&t.texStorage2D(r.TEXTURE_CUBE_MAP,zt,Fe,be.width,be.height);for(let Oe=0;Oe<6;Oe++){et=oe[Oe].mipmaps;for(let ut=0;ut<et.length;ut++){let tt=et[ut];S.format!==jn?Ce!==null?Ze?ze&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut,0,0,tt.width,tt.height,Ce,tt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut,Fe,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ze?ze&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut,0,0,tt.width,tt.height,Ce,ke,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut,Fe,tt.width,tt.height,0,Ce,ke,tt.data)}}}else{if(et=S.mipmaps,Ze&&we){et.length>0&&zt++;let Oe=Ee(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,zt,Fe,Oe.width,Oe.height)}for(let Oe=0;Oe<6;Oe++)if(Se){Ze?ze&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,0,0,oe[Oe].width,oe[Oe].height,Ce,ke,oe[Oe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Fe,oe[Oe].width,oe[Oe].height,0,Ce,ke,oe[Oe].data);for(let ut=0;ut<et.length;ut++){let tt=et[ut].image[Oe].image;Ze?ze&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut+1,0,0,tt.width,tt.height,Ce,ke,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut+1,Fe,tt.width,tt.height,0,Ce,ke,tt.data)}}else{Ze?ze&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,0,0,Ce,ke,oe[Oe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Fe,Ce,ke,oe[Oe]);for(let ut=0;ut<et.length;ut++){let tt=et[ut];Ze?ze&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut+1,0,0,Ce,ke,tt.image[Oe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,ut+1,Fe,Ce,ke,tt.image[Oe])}}}f(S)&&g(r.TEXTURE_CUBE_MAP),ae.__version=F.version,S.onUpdate&&S.onUpdate(S)}B.__version=S.version})(H,A,w):t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+w)},this.rebindTextures=function(A,w,H){let B=n.get(A);w!==void 0&&le(B.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&ce(A)},this.setupRenderTarget=function(A){let w=A.texture,H=n.get(A),B=n.get(w);A.addEventListener("dispose",G);let S=A.textures,P=A.isWebGLCubeRenderTarget===!0,k=S.length>1;if(k||(B.__webglTexture===void 0&&(B.__webglTexture=r.createTexture()),B.__version=w.version,a.memory.textures++),P){H.__webglFramebuffer=[];for(let F=0;F<6;F++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[F]=[];for(let ae=0;ae<w.mipmaps.length;ae++)H.__webglFramebuffer[F][ae]=r.createFramebuffer()}else H.__webglFramebuffer[F]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let F=0;F<w.mipmaps.length;F++)H.__webglFramebuffer[F]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(k)for(let F=0,ae=S.length;F<ae;F++){let q=n.get(S[F]);q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&ge(A)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let F=0;F<S.length;F++){let ae=S[F];H.__webglColorRenderbuffer[F]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[F]);let q=s.convert(ae.format,ae.colorSpace),J=s.convert(ae.type),_e=y(ae.internalFormat,q,J,ae.colorSpace,A.isXRRenderTarget===!0),Re=Me(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,_e,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+F,r.RENDERBUFFER,H.__webglColorRenderbuffer[F])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(H.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture),X(r.TEXTURE_CUBE_MAP,w);for(let F=0;F<6;F++)if(w.mipmaps&&w.mipmaps.length>0)for(let ae=0;ae<w.mipmaps.length;ae++)le(H.__webglFramebuffer[F][ae],A,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+F,ae);else le(H.__webglFramebuffer[F],A,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);f(w)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(k){for(let F=0,ae=S.length;F<ae;F++){let q=S[F],J=n.get(q),_e=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(_e=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(_e,J.__webglTexture),X(_e,q),le(H.__webglFramebuffer,A,q,r.COLOR_ATTACHMENT0+F,_e,0),f(q)&&g(_e)}t.unbindTexture()}else{let F=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(F=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(F,B.__webglTexture),X(F,w),w.mipmaps&&w.mipmaps.length>0)for(let ae=0;ae<w.mipmaps.length;ae++)le(H.__webglFramebuffer[ae],A,w,r.COLOR_ATTACHMENT0,F,ae);else le(H.__webglFramebuffer,A,w,r.COLOR_ATTACHMENT0,F,0);f(w)&&g(F),t.unbindTexture()}A.depthBuffer&&ce(A)},this.updateRenderTargetMipmap=function(A){let w=A.textures;for(let H=0,B=w.length;H<B;H++){let S=w[H];if(f(S)){let P=v(A),k=n.get(S).__webglTexture;t.bindTexture(P,k),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(ge(A)===!1){let w=A.textures,H=A.width,B=A.height,S=r.COLOR_BUFFER_BIT,P=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=n.get(A),F=w.length>1;if(F)for(let q=0;q<w.length;q++)t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,k.__webglMultisampledFramebuffer);let ae=A.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer);for(let q=0;q<w.length;q++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),F){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,k.__webglColorRenderbuffer[q]);let J=n.get(w[q]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,J,0)}r.blitFramebuffer(0,0,H,B,0,0,H,B,S,r.NEAREST),c===!0&&(Ie.length=0,de.length=0,Ie.push(r.COLOR_ATTACHMENT0+q),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ie.push(P),de.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,de)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),F)for(let q=0;q<w.length;q++){t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,k.__webglColorRenderbuffer[q]);let J=n.get(w[q]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.TEXTURE_2D,J,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let w=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}},this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ge}function gp(r,e){return{convert:function(t,n=qi){let i,s=gt.getTransfer(n);if(t===ii)return r.UNSIGNED_BYTE;if(t===Ha)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Wa)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Zo)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Jo)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===qo)return r.BYTE;if(t===Yo)return r.SHORT;if(t===wr)return r.UNSIGNED_SHORT;if(t===Va)return r.INT;if(t===ji)return r.UNSIGNED_INT;if(t===Xn)return r.FLOAT;if(t===Li)return r.HALF_FLOAT;if(t===sh)return r.ALPHA;if(t===ah)return r.RGB;if(t===jn)return r.RGBA;if(t===gs)return r.DEPTH_COMPONENT;if(t===vs)return r.DEPTH_STENCIL;if(t===Xa)return r.RED;if(t===ja)return r.RED_INTEGER;if(t===oh)return r.RG;if(t===Ko)return r.RG_INTEGER;if(t===$o)return r.RGBA_INTEGER;if(t===qa||t===Ya||t===Za||t===Ja)if(s===bt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===qa)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ya)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Za)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ja)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===qa)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ya)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Za)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ja)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Qo||t===el||t===tl||t===nl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Qo)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===el)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===tl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===nl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===il||t===rl||t===sl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===il||t===rl)return s===bt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===sl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===al||t===ol||t===ll||t===cl||t===hl||t===ul||t===dl||t===pl||t===ml||t===fl||t===gl||t===vl||t===_l||t===yl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===al)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ol)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===ll)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===cl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===hl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===ul)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===dl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===pl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===ml)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===fl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===gl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===vl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===_l)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===yl)return s===bt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===xl||t===Ml||t===Sl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===xl)return s===bt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ml)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Sl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Tl||t===bl||t===wl||t===El){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Tl)return i.COMPRESSED_RED_RGTC1_EXT;if(t===bl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===wl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===El)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Er?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var jl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ts(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new un({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new jt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ql=class extends mi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,_=typeof XRWebGLBinding<"u",f=new jl,g={},v=t.getContextAttributes(),y=null,M=null,b=[],C=[],G=new ue,V=null,D=new Gt;D.viewport=new yt;let L=new Gt;L.viewport=new yt;let O=[D,L],N=new Pa,j=null,X=null;function te(de){let Me=C.indexOf(de.inputSource);if(Me===-1)return;let ge=b[Me];ge!==void 0&&(ge.update(de.inputSource,de.frame,l||a),ge.dispatchEvent({type:de.type,data:de.inputSource}))}function ne(){i.removeEventListener("select",te),i.removeEventListener("selectstart",te),i.removeEventListener("selectend",te),i.removeEventListener("squeeze",te),i.removeEventListener("squeezestart",te),i.removeEventListener("squeezeend",te),i.removeEventListener("end",ne),i.removeEventListener("inputsourceschange",me);for(let de=0;de<b.length;de++){let Me=C[de];Me!==null&&(C[de]=null,b[de].disconnect(Me))}j=null,X=null,f.reset();for(let de in g)delete g[de];e.setRenderTarget(y),m=null,d=null,u=null,i=null,M=null,Ie.stop(),n.isPresenting=!1,e.setPixelRatio(V),e.setSize(G.width,G.height,!1),n.dispatchEvent({type:"sessionend"})}function me(de){for(let Me=0;Me<de.removed.length;Me++){let ge=de.removed[Me],Z=C.indexOf(ge);Z>=0&&(C[Z]=null,b[Z].disconnect(ge))}for(let Me=0;Me<de.added.length;Me++){let ge=de.added[Me],Z=C.indexOf(ge);if(Z===-1){for(let A=0;A<b.length;A++){if(A>=C.length){C.push(ge),Z=A;break}if(C[A]===null){C[A]=ge,Z=A;break}}if(Z===-1)break}let Ee=b[Z];Ee&&Ee.connect(ge)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(de){let Me=b[de];return Me===void 0&&(Me=new fr,b[de]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(de){let Me=b[de];return Me===void 0&&(Me=new fr,b[de]=Me),Me.getGripSpace()},this.getHand=function(de){let Me=b[de];return Me===void 0&&(Me=new fr,b[de]=Me),Me.getHandSpace()},this.setFramebufferScaleFactor=function(de){s=de,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(de){o=de,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(de){l=de},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(de){if(i=de,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",te),i.addEventListener("selectstart",te),i.addEventListener("selectend",te),i.addEventListener("squeeze",te),i.addEventListener("squeezestart",te),i.addEventListener("squeezeend",te),i.addEventListener("end",ne),i.addEventListener("inputsourceschange",me),v.xrCompatible!==!0&&await t.makeXRCompatible(),V=e.getPixelRatio(),e.getSize(G),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,ge=null,Z=null;v.depth&&(Z=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=v.stencil?vs:gs,ge=v.stencil?Er:ji);let Ee={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ee),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Un(d.textureWidth,d.textureHeight,{format:jn,type:ii,depthTexture:new es(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Me={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new Un(m.framebufferWidth,m.framebufferHeight,{format:jn,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ie.setContext(i),Ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let le=new E,Te=new E;function $(de,Me){Me===null?de.matrixWorld.copy(de.matrix):de.matrixWorld.multiplyMatrices(Me.matrixWorld,de.matrix),de.matrixWorldInverse.copy(de.matrixWorld).invert()}this.updateCamera=function(de){if(i===null)return;let Me=de.near,ge=de.far;f.texture!==null&&(f.depthNear>0&&(Me=f.depthNear),f.depthFar>0&&(ge=f.depthFar)),N.near=L.near=D.near=Me,N.far=L.far=D.far=ge,j===N.near&&X===N.far||(i.updateRenderState({depthNear:N.near,depthFar:N.far}),j=N.near,X=N.far),N.layers.mask=6|de.layers.mask,D.layers.mask=3&N.layers.mask,L.layers.mask=5&N.layers.mask;let Z=de.parent,Ee=N.cameras;$(N,Z);for(let A=0;A<Ee.length;A++)$(Ee[A],Z);Ee.length===2?(function(A,w,H){le.setFromMatrixPosition(w.matrixWorld),Te.setFromMatrixPosition(H.matrixWorld);let B=le.distanceTo(Te),S=w.projectionMatrix.elements,P=H.projectionMatrix.elements,k=S[14]/(S[10]-1),F=S[14]/(S[10]+1),ae=(S[9]+1)/S[5],q=(S[9]-1)/S[5],J=(S[8]-1)/S[0],_e=(P[8]+1)/P[0],Re=k*J,Se=k*_e,oe=B/(-J+_e),be=oe*-J;if(w.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(be),A.translateZ(oe),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),S[10]===-1)A.projectionMatrix.copy(w.projectionMatrix),A.projectionMatrixInverse.copy(w.projectionMatrixInverse);else{let Ce=k+oe,ke=F+oe,Fe=Re-be,Ze=Se+(B-be),we=ae*F/ke*Ce,ze=q*F/ke*Ce;A.projectionMatrix.makePerspective(Fe,Ze,we,ze,Ce,ke),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(N,D,L):N.projectionMatrix.copy(D.projectionMatrix),(function(A,w,H){H===null?A.matrix.copy(w.matrixWorld):(A.matrix.copy(H.matrixWorld),A.matrix.invert(),A.matrix.multiply(w.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(w.projectionMatrix),A.projectionMatrixInverse.copy(w.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Ks*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(de,N,Z)},this.getCamera=function(){return N},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(de){c=de,d!==null&&(d.fixedFoveation=de),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=de)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(N)},this.getCameraTexture=function(de){return g[de]};let ce=null,Ie=new Zh;Ie.setAnimationLoop(function(de,Me){if(h=Me.getViewerPose(l||a),p=Me,h!==null){let ge=h.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let Z=!1;ge.length!==N.cameras.length&&(N.cameras.length=0,Z=!0);for(let A=0;A<ge.length;A++){let w=ge[A],H=null;if(m!==null)H=m.getViewport(w);else{let S=u.getViewSubImage(d,w);H=S.viewport,A===0&&(e.setRenderTargetTextures(M,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(M))}let B=O[A];B===void 0&&(B=new Gt,B.layers.enable(A),B.viewport=new yt,O[A]=B),B.matrix.fromArray(w.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(w.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(H.x,H.y,H.width,H.height),A===0&&(N.matrix.copy(B.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Z===!0&&N.cameras.push(B)}let Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let A=u.getDepthInformation(ge[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(Ee&&Ee.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<ge.length;A++){let w=ge[A].camera;if(w){let H=g[w];H||(H=new ts,g[w]=H);let B=u.getCameraImage(w);H.sourceTexture=B}}}}for(let ge=0;ge<b.length;ge++){let Z=C[ge],Ee=b[ge];Z!==null&&Ee!==void 0&&Ee.update(Z,Me,l||a)}ce&&ce(de,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),p=null}),this.setAnimationLoop=function(de){ce=de},this.dispose=function(){}}},Ji=new Wn,vp=new Qe;function _p(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===In&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===In&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Ji.copy(c),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),i.envMapRotation.value.setFromMatrix4(vp.makeRotationFromEuler(Ji)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Pl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===In&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function yp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let _=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof _=="number"||typeof _=="boolean"?_:_.clone(),!0;{let g=p[f];if(typeof _=="number"||typeof _=="boolean"){if(g!==_)return p[f]=_,!0}else if(g.equals(_)===!1)return g.copy(_),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,v=0,y=16;for(let b=0,C=g.length;b<C;b++){let G=Array.isArray(g[b])?g[b]:[g[b]];for(let V=0,D=G.length;V<D;V++){let L=G[V],O=Array.isArray(L.value)?L.value:[L.value];for(let N=0,j=O.length;N<j;N++){let X=l(O[N]),te=v%y,ne=te%X.boundary,me=te+ne;v+=ne,me!==0&&y-me<X.storage&&(v+=y-me),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=X.storage}}}let M=v%y;M>0&&(v+=y-M),f.__size=v,f.__cache={}})(u),m=(function(f){let g=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),y=f.__size,M=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,y,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let _=e.render.frame;s[u.id]!==_&&((function(f){let g=i[f.id],v=f.uniforms,y=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let M=0,b=v.length;M<b;M++){let C=Array.isArray(v[M])?v[M]:[v[M]];for(let G=0,V=C.length;G<V;G++){let D=C[G];if(c(D,M,G,y)===!0){let L=D.__offset,O=Array.isArray(D.value)?D.value:[D.value],N=0;for(let j=0;j<O.length;j++){let X=O[j],te=l(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,L+N,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,N),N+=te.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=_)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var zn=class{constructor(e={}){let{canvas:t=_h(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),_=new Int32Array(4),f=null,g=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,b=!1;this._outputColorSpace=ct;let C=0,G=0,V=null,D=-1,L=null,O=new yt,N=new yt,j=null,X=new je(0),te=0,ne=t.width,me=t.height,le=1,Te=null,$=null,ce=new yt(0,0,ne,me),Ie=new yt(0,0,ne,me),de=!1,Me=new Ri,ge=!1,Z=!1,Ee=new Qe,A=new E,w=new yt,H={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},B=!1;function S(){return V===null?le:1}let P,k,F,ae,q,J,_e,Re,Se,oe,be,Ce,ke,Fe,Ze,we,ze,et,zt,Oe,ut,tt,an,Et,z=n;function Ot(R,K){return t.getContext(R,K)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",It,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",qt,!1),z===null){let K="webgl2";if(z=Ot(K,R),z===null)throw Ot(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}function Mt(){P=new td(z),P.init(),tt=new gp(z,P),k=new Ju(z,P,e,tt),F=new mp(z,P),k.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),ae=new rd(z),q=new rp,J=new fp(z,P,F,q,k,tt,ae),_e=new $u(M),Re=new ed(M),Se=new Xu(z),an=new Yu(z,Se),oe=new nd(z,Se,ae,an),be=new ad(z,oe,Se,ae),zt=new sd(z,k,J),we=new Ku(q),Ce=new ip(M,_e,Re,P,k,an,we),ke=new _p(M,q),Fe=new ap,Ze=new up(P),et=new qu(M,_e,Re,F,be,m,c),ze=new dp(M,be,k),Et=new yp(z,ae,k,F),Oe=new Zu(z,P,ae),ut=new id(z,P,ae),ae.programs=Ce.programs,M.capabilities=k,M.extensions=P,M.properties=q,M.renderLists=Fe,M.shadowMap=ze,M.state=F,M.info=ae}Mt();let pt=new ql(M,z);function It(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function it(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let R=ae.autoReset,K=ze.enabled,re=ze.autoUpdate,ve=ze.needsUpdate,ie=ze.type;Mt(),ae.autoReset=R,ze.enabled=K,ze.autoUpdate=re,ze.needsUpdate=ve,ze.type=ie}function qt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function St(R){let K=R.target;K.removeEventListener("dispose",St),(function(re){(function(ve){let ie=q.get(ve).programs;ie!==void 0&&(ie.forEach(function(xe){Ce.releaseProgram(xe)}),ve.isShaderMaterial&&Ce.releaseShaderCache(ve))})(re),q.remove(re)})(K)}function Yt(R,K,re){R.transparent===!0&&R.side===Vt&&R.forceSinglePass===!1?(R.side=In,R.needsUpdate=!0,Tt(R,K,re),R.side=Sr,R.needsUpdate=!0,Tt(R,K,re),R.side=Vt):Tt(R,K,re)}this.xr=pt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let R=P.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=P.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(R){R!==void 0&&(le=R,this.setSize(ne,me,!1))},this.getSize=function(R){return R.set(ne,me)},this.setSize=function(R,K,re=!0){pt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ne=R,me=K,t.width=Math.floor(R*le),t.height=Math.floor(K*le),re===!0&&(t.style.width=R+"px",t.style.height=K+"px"),this.setViewport(0,0,R,K))},this.getDrawingBufferSize=function(R){return R.set(ne*le,me*le).floor()},this.setDrawingBufferSize=function(R,K,re){ne=R,me=K,le=re,t.width=Math.floor(R*re),t.height=Math.floor(K*re),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(O)},this.getViewport=function(R){return R.copy(ce)},this.setViewport=function(R,K,re,ve){R.isVector4?ce.set(R.x,R.y,R.z,R.w):ce.set(R,K,re,ve),F.viewport(O.copy(ce).multiplyScalar(le).round())},this.getScissor=function(R){return R.copy(Ie)},this.setScissor=function(R,K,re,ve){R.isVector4?Ie.set(R.x,R.y,R.z,R.w):Ie.set(R,K,re,ve),F.scissor(N.copy(Ie).multiplyScalar(le).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(R){F.setScissorTest(de=R)},this.setOpaqueSort=function(R){Te=R},this.setTransparentSort=function(R){$=R},this.getClearColor=function(R){return R.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(R=!0,K=!0,re=!0){let ve=0;if(R){let ie=!1;if(V!==null){let xe=V.texture.format;ie=xe===$o||xe===Ko||xe===ja}if(ie){let xe=V.texture.type,Le=xe===ii||xe===ji||xe===wr||xe===Er||xe===Ha||xe===Wa,Ne=et.getClearColor(),He=et.getClearAlpha(),Ye=Ne.r,Ge=Ne.g,Je=Ne.b;Le?(p[0]=Ye,p[1]=Ge,p[2]=Je,p[3]=He,z.clearBufferuiv(z.COLOR,0,p)):(_[0]=Ye,_[1]=Ge,_[2]=Je,_[3]=He,z.clearBufferiv(z.COLOR,0,_))}else ve|=z.COLOR_BUFFER_BIT}K&&(ve|=z.DEPTH_BUFFER_BIT),re&&(ve|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(ve)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",It,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",qt,!1),et.dispose(),Fe.dispose(),Ze.dispose(),q.dispose(),_e.dispose(),Re.dispose(),be.dispose(),an.dispose(),Et.dispose(),Ce.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",Jt),pt.removeEventListener("sessionend",pn),Kt.stop()},this.renderBufferDirect=function(R,K,re,ve,ie,xe){K===null&&(K=H);let Le=ie.isMesh&&ie.matrixWorld.determinant()<0,Ne=(function(dt,Lt,x,T,I){Lt.isScene!==!0&&(Lt=H),J.resetTextureUnits();let Y=Lt.fog,U=T.isMeshStandardMaterial?Lt.environment:null,ee=V===null?M.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:zi,W=(T.isMeshStandardMaterial?Re:_e).get(T.envMap||U),Q=T.vertexColors===!0&&!!x.attributes.color&&x.attributes.color.itemSize===4,he=!!x.attributes.tangent&&(!!T.normalMap||T.anisotropy>0),Be=!!x.morphAttributes.position,se=!!x.morphAttributes.normal,pe=!!x.morphAttributes.color,ye=_i;T.toneMapped&&(V!==null&&V.isXRRenderTarget!==!0||(ye=M.toneMapping));let Ue=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,We=Ue!==void 0?Ue.length:0,fe=q.get(T),Ae=g.state.lights;if(ge===!0&&(Z===!0||dt!==L)){let Pt=dt===L&&T.id===D;we.setState(T,dt,Pt)}let Ve=!1;T.version===fe.__version?fe.needsLights&&fe.lightsStateVersion!==Ae.state.version||fe.outputColorSpace!==ee||I.isBatchedMesh&&fe.batching===!1?Ve=!0:I.isBatchedMesh||fe.batching!==!0?I.isBatchedMesh&&fe.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&fe.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&fe.instancing===!1?Ve=!0:I.isInstancedMesh||fe.instancing!==!0?I.isSkinnedMesh&&fe.skinning===!1?Ve=!0:I.isSkinnedMesh||fe.skinning!==!0?I.isInstancedMesh&&fe.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&fe.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&fe.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&fe.instancingMorph===!1&&I.morphTexture!==null||fe.envMap!==W||T.fog===!0&&fe.fog!==Y?Ve=!0:fe.numClippingPlanes===void 0||fe.numClippingPlanes===we.numPlanes&&fe.numIntersection===we.numIntersection?(fe.vertexAlphas!==Q||fe.vertexTangents!==he||fe.morphTargets!==Be||fe.morphNormals!==se||fe.morphColors!==pe||fe.toneMapping!==ye||fe.morphTargetsCount!==We)&&(Ve=!0):Ve=!0:Ve=!0:Ve=!0:Ve=!0:(Ve=!0,fe.__version=T.version);let st=fe.currentProgram;Ve===!0&&(st=Tt(T,Lt,I));let mn=!1,fn=!1,xi=!1,Dt=st.getUniforms(),Yn=fe.uniforms;if(F.useProgram(st.program)&&(mn=!0,fn=!0,xi=!0),T.id!==D&&(D=T.id,fn=!0),mn||L!==dt){F.buffers.depth.getReversed()&&dt.reversedDepth!==!0&&(dt._reversedDepth=!0,dt.updateProjectionMatrix()),Dt.setValue(z,"projectionMatrix",dt.projectionMatrix),Dt.setValue(z,"viewMatrix",dt.matrixWorldInverse);let Pt=Dt.map.cameraPosition;Pt!==void 0&&Pt.setValue(z,A.setFromMatrixPosition(dt.matrixWorld)),k.logarithmicDepthBuffer&&Dt.setValue(z,"logDepthBufFC",2/(Math.log(dt.far+1)/Math.LN2)),(T.isMeshPhongMaterial||T.isMeshToonMaterial||T.isMeshLambertMaterial||T.isMeshBasicMaterial||T.isMeshStandardMaterial||T.isShaderMaterial)&&Dt.setValue(z,"isOrthographic",dt.isOrthographicCamera===!0),L!==dt&&(L=dt,fn=!0,xi=!0)}if(I.isSkinnedMesh){Dt.setOptional(z,I,"bindMatrix"),Dt.setOptional(z,I,"bindMatrixInverse");let Pt=I.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),Dt.setValue(z,"boneTexture",Pt.boneTexture,J))}I.isBatchedMesh&&(Dt.setOptional(z,I,"batchingTexture"),Dt.setValue(z,"batchingTexture",I._matricesTexture,J),Dt.setOptional(z,I,"batchingIdTexture"),Dt.setValue(z,"batchingIdTexture",I._indirectTexture,J),Dt.setOptional(z,I,"batchingColorTexture"),I._colorsTexture!==null&&Dt.setValue(z,"batchingColorTexture",I._colorsTexture,J));let xs=x.morphAttributes;xs.position===void 0&&xs.normal===void 0&&xs.color===void 0||zt.update(I,x,st),(fn||fe.receiveShadow!==I.receiveShadow)&&(fe.receiveShadow=I.receiveShadow,Dt.setValue(z,"receiveShadow",I.receiveShadow)),T.isMeshGouraudMaterial&&T.envMap!==null&&(Yn.envMap.value=W,Yn.flipEnvMap.value=W.isCubeTexture&&W.isRenderTargetTexture===!1?-1:1),T.isMeshStandardMaterial&&T.envMap===null&&Lt.environment!==null&&(Yn.envMapIntensity.value=Lt.environmentIntensity),fn&&(Dt.setValue(z,"toneMappingExposure",M.toneMappingExposure),fe.needsLights&&(bn=xi,(Ln=Yn).ambientLightColor.needsUpdate=bn,Ln.lightProbe.needsUpdate=bn,Ln.directionalLights.needsUpdate=bn,Ln.directionalLightShadows.needsUpdate=bn,Ln.pointLights.needsUpdate=bn,Ln.pointLightShadows.needsUpdate=bn,Ln.spotLights.needsUpdate=bn,Ln.spotLightShadows.needsUpdate=bn,Ln.rectAreaLights.needsUpdate=bn,Ln.hemisphereLights.needsUpdate=bn),Y&&T.fog===!0&&ke.refreshFogUniforms(Yn,Y),ke.refreshMaterialUniforms(Yn,T,le,me,g.state.transmissionRenderTarget[dt.id]),Rr.upload(z,ft(fe),Yn,J));var Ln,bn;if(T.isShaderMaterial&&T.uniformsNeedUpdate===!0&&(Rr.upload(z,ft(fe),Yn,J),T.uniformsNeedUpdate=!1),T.isSpriteMaterial&&Dt.setValue(z,"center",I.center),Dt.setValue(z,"modelViewMatrix",I.modelViewMatrix),Dt.setValue(z,"normalMatrix",I.normalMatrix),Dt.setValue(z,"modelMatrix",I.matrixWorld),T.isShaderMaterial||T.isRawShaderMaterial){let Pt=T.uniformsGroups;for(let on=0,Ms=Pt.length;on<Ms;on++){let si=Pt[on];Et.update(si,st),Et.bind(si,st)}}return st})(R,K,re,ve,ie);F.setMaterial(ve,Le);let He=re.index,Ye=1;if(ve.wireframe===!0){if(He=oe.getWireframeAttribute(re),He===void 0)return;Ye=2}let Ge=re.drawRange,Je=re.attributes.position,nt=Ge.start*Ye,Ke=(Ge.start+Ge.count)*Ye;xe!==null&&(nt=Math.max(nt,xe.start*Ye),Ke=Math.min(Ke,(xe.start+xe.count)*Ye)),He!==null?(nt=Math.max(nt,0),Ke=Math.min(Ke,He.count)):Je!=null&&(nt=Math.max(nt,0),Ke=Math.min(Ke,Je.count));let Nt=Ke-nt;if(Nt<0||Nt===1/0)return;let Ht;an.setup(ie,ve,Ne,re,He);let Ct=Oe;if(He!==null&&(Ht=Se.get(He),Ct=ut,Ct.setIndex(Ht)),ie.isMesh)ve.wireframe===!0?(F.setLineWidth(ve.wireframeLinewidth*S()),Ct.setMode(z.LINES)):Ct.setMode(z.TRIANGLES);else if(ie.isLine){let dt=ve.linewidth;dt===void 0&&(dt=1),F.setLineWidth(dt*S()),ie.isLineSegments?Ct.setMode(z.LINES):ie.isLineLoop?Ct.setMode(z.LINE_LOOP):Ct.setMode(z.LINE_STRIP)}else ie.isPoints?Ct.setMode(z.POINTS):ie.isSprite&&Ct.setMode(z.TRIANGLES);if(ie.isBatchedMesh)if(ie._multiDrawInstances!==null)dr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ct.renderMultiDrawInstances(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount,ie._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))Ct.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let dt=ie._multiDrawStarts,Lt=ie._multiDrawCounts,x=ie._multiDrawCount,T=He?Se.get(He).bytesPerElement:1,I=q.get(ve).currentProgram.getUniforms();for(let Y=0;Y<x;Y++)I.setValue(z,"_gl_DrawID",Y),Ct.render(dt[Y]/T,Lt[Y])}else if(ie.isInstancedMesh)Ct.renderInstances(nt,Nt,ie.count);else if(re.isInstancedBufferGeometry){let dt=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,Lt=Math.min(re.instanceCount,dt);Ct.renderInstances(nt,Nt,Lt)}else Ct.render(nt,Nt)},this.compile=function(R,K,re=null){re===null&&(re=R),g=Ze.get(re),g.init(K),y.push(g),re.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),R!==re&&R.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),g.setupLights();let ve=new Set;return R.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let xe=ie.material;if(xe)if(Array.isArray(xe))for(let Le=0;Le<xe.length;Le++){let Ne=xe[Le];Yt(Ne,re,ie),ve.add(Ne)}else Yt(xe,re,ie),ve.add(xe)}),g=y.pop(),ve},this.compileAsync=function(R,K,re=null){let ve=this.compile(R,K,re);return new Promise(ie=>{function xe(){ve.forEach(function(Le){q.get(Le).currentProgram.isReady()&&ve.delete(Le)}),ve.size!==0?setTimeout(xe,10):ie(R)}P.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let tn=null;function Jt(){Kt.stop()}function pn(){Kt.start()}let Kt=new Zh;function nn(R,K,re,ve){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)re=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Me.intersectsSprite(R)){ve&&w.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ee);let xe=be.update(R),Le=R.material;Le.visible&&f.push(R,xe,Le,re,w.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Me.intersectsObject(R))){let xe=be.update(R),Le=R.material;if(ve&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),w.copy(R.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),w.copy(xe.boundingSphere.center)),w.applyMatrix4(R.matrixWorld).applyMatrix4(Ee)),Array.isArray(Le)){let Ne=xe.groups;for(let He=0,Ye=Ne.length;He<Ye;He++){let Ge=Ne[He],Je=Le[Ge.materialIndex];Je&&Je.visible&&f.push(R,xe,Je,re,w.z,Ge)}}else Le.visible&&f.push(R,xe,Le,re,w.z,null)}}let ie=R.children;for(let xe=0,Le=ie.length;xe<Le;xe++)nn(ie[xe],K,re,ve)}function yi(R,K,re,ve){let ie=R.opaque,xe=R.transmissive,Le=R.transparent;g.setupLightsView(re),ge===!0&&we.setGlobalState(M.clippingPlanes,re),ve&&F.viewport(O.copy(ve)),ie.length>0&&Bt(ie,K,re),xe.length>0&&Bt(xe,K,re),Le.length>0&&Bt(Le,K,re),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Tn(R,K,re,ve){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ve.id]===void 0&&(g.state.transmissionRenderTarget[ve.id]=new Un(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?Li:ii,minFilter:Xi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));let ie=g.state.transmissionRenderTarget[ve.id],xe=ve.viewport||O;ie.setSize(xe.z*M.transmissionResolutionScale,xe.w*M.transmissionResolutionScale);let Le=M.getRenderTarget(),Ne=M.getActiveCubeFace(),He=M.getActiveMipmapLevel();M.setRenderTarget(ie),M.getClearColor(X),te=M.getClearAlpha(),te<1&&M.setClearColor(16777215,.5),M.clear(),B&&et.render(re);let Ye=M.toneMapping;M.toneMapping=_i;let Ge=ve.viewport;if(ve.viewport!==void 0&&(ve.viewport=void 0),g.setupLightsView(ve),ge===!0&&we.setGlobalState(M.clippingPlanes,ve),Bt(R,re,ve),J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie),P.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let nt=0,Ke=K.length;nt<Ke;nt++){let Nt=K[nt],Ht=Nt.object,Ct=Nt.geometry,dt=Nt.material,Lt=Nt.group;if(dt.side===Vt&&Ht.layers.test(ve.layers)){let x=dt.side;dt.side=In,dt.needsUpdate=!0,Ut(Ht,re,ve,Ct,dt,Lt),dt.side=x,dt.needsUpdate=!0,Je=!0}}Je===!0&&(J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie))}M.setRenderTarget(Le,Ne,He),M.setClearColor(X,te),Ge!==void 0&&(ve.viewport=Ge),M.toneMapping=Ye}function Bt(R,K,re){let ve=K.isScene===!0?K.overrideMaterial:null;for(let ie=0,xe=R.length;ie<xe;ie++){let Le=R[ie],Ne=Le.object,He=Le.geometry,Ye=Le.group,Ge=Le.material;Ge.allowOverride===!0&&ve!==null&&(Ge=ve),Ne.layers.test(re.layers)&&Ut(Ne,K,re,He,Ge,Ye)}}function Ut(R,K,re,ve,ie,xe){R.onBeforeRender(M,K,re,ve,ie,xe),R.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ie.onBeforeRender(M,K,re,ve,R,xe),ie.transparent===!0&&ie.side===Vt&&ie.forceSinglePass===!1?(ie.side=In,ie.needsUpdate=!0,M.renderBufferDirect(re,K,ve,ie,R,xe),ie.side=Sr,ie.needsUpdate=!0,M.renderBufferDirect(re,K,ve,ie,R,xe),ie.side=Vt):M.renderBufferDirect(re,K,ve,ie,R,xe),R.onAfterRender(M,K,re,ve,ie,xe)}function Tt(R,K,re){K.isScene!==!0&&(K=H);let ve=q.get(R),ie=g.state.lights,xe=g.state.shadowsArray,Le=ie.state.version,Ne=Ce.getParameters(R,ie.state,xe,K,re),He=Ce.getProgramCacheKey(Ne),Ye=ve.programs;ve.environment=R.isMeshStandardMaterial?K.environment:null,ve.fog=K.fog,ve.envMap=(R.isMeshStandardMaterial?Re:_e).get(R.envMap||ve.environment),ve.envMapRotation=ve.environment!==null&&R.envMap===null?K.environmentRotation:R.envMapRotation,Ye===void 0&&(R.addEventListener("dispose",St),Ye=new Map,ve.programs=Ye);let Ge=Ye.get(He);if(Ge!==void 0){if(ve.currentProgram===Ge&&ve.lightsStateVersion===Le)return qn(R,Ne),Ge}else Ne.uniforms=Ce.getUniforms(R),R.onBeforeCompile(Ne,M),Ge=Ce.acquireProgram(Ne,He),Ye.set(He,Ge),ve.uniforms=Ne.uniforms;let Je=ve.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||(Je.clippingPlanes=we.uniform),qn(R,Ne),ve.needsLights=(function(nt){return nt.isMeshLambertMaterial||nt.isMeshToonMaterial||nt.isMeshPhongMaterial||nt.isMeshStandardMaterial||nt.isShadowMaterial||nt.isShaderMaterial&&nt.lights===!0})(R),ve.lightsStateVersion=Le,ve.needsLights&&(Je.ambientLightColor.value=ie.state.ambient,Je.lightProbe.value=ie.state.probe,Je.directionalLights.value=ie.state.directional,Je.directionalLightShadows.value=ie.state.directionalShadow,Je.spotLights.value=ie.state.spot,Je.spotLightShadows.value=ie.state.spotShadow,Je.rectAreaLights.value=ie.state.rectArea,Je.ltc_1.value=ie.state.rectAreaLTC1,Je.ltc_2.value=ie.state.rectAreaLTC2,Je.pointLights.value=ie.state.point,Je.pointLightShadows.value=ie.state.pointShadow,Je.hemisphereLights.value=ie.state.hemi,Je.directionalShadowMap.value=ie.state.directionalShadowMap,Je.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Je.spotShadowMap.value=ie.state.spotShadowMap,Je.spotLightMatrix.value=ie.state.spotLightMatrix,Je.spotLightMap.value=ie.state.spotLightMap,Je.pointShadowMap.value=ie.state.pointShadowMap,Je.pointShadowMatrix.value=ie.state.pointShadowMatrix),ve.currentProgram=Ge,ve.uniformsList=null,Ge}function ft(R){if(R.uniformsList===null){let K=R.currentProgram.getUniforms();R.uniformsList=Rr.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function qn(R,K){let re=q.get(R);re.outputColorSpace=K.outputColorSpace,re.batching=K.batching,re.batchingColor=K.batchingColor,re.instancing=K.instancing,re.instancingColor=K.instancingColor,re.instancingMorph=K.instancingMorph,re.skinning=K.skinning,re.morphTargets=K.morphTargets,re.morphNormals=K.morphNormals,re.morphColors=K.morphColors,re.morphTargetsCount=K.morphTargetsCount,re.numClippingPlanes=K.numClippingPlanes,re.numIntersection=K.numClipIntersection,re.vertexAlphas=K.vertexAlphas,re.vertexTangents=K.vertexTangents,re.toneMapping=K.toneMapping}Kt.setAnimationLoop(function(R){tn&&tn(R)}),typeof self<"u"&&Kt.setContext(self),this.setAnimationLoop=function(R){tn=R,pt.setAnimationLoop(R),R===null?Kt.stop():Kt.start()},pt.addEventListener("sessionstart",Jt),pt.addEventListener("sessionend",pn),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(b===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),pt.enabled===!0&&pt.isPresenting===!0&&(pt.cameraAutoUpdate===!0&&pt.updateCamera(K),K=pt.getCamera()),R.isScene===!0&&R.onBeforeRender(M,R,K,V),g=Ze.get(R,y.length),g.init(K),y.push(g),Ee.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Me.setFromProjectionMatrix(Ee,pi,K.reversedDepth),Z=this.localClippingEnabled,ge=we.init(this.clippingPlanes,Z),f=Fe.get(R,v.length),f.init(),v.push(f),pt.enabled===!0&&pt.isPresenting===!0){let xe=M.xr.getDepthSensingMesh();xe!==null&&nn(xe,K,-1/0,M.sortObjects)}nn(R,K,0,M.sortObjects),f.finish(),M.sortObjects===!0&&f.sort(Te,$),B=pt.enabled===!1||pt.isPresenting===!1||pt.hasDepthSensing()===!1,B&&et.addToRenderList(f,R),this.info.render.frame++,ge===!0&&we.beginShadows();let re=g.state.shadowsArray;ze.render(re,R,K),ge===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset();let ve=f.opaque,ie=f.transmissive;if(g.setupLights(),K.isArrayCamera){let xe=K.cameras;if(ie.length>0)for(let Le=0,Ne=xe.length;Le<Ne;Le++)Tn(ve,ie,R,xe[Le]);B&&et.render(R);for(let Le=0,Ne=xe.length;Le<Ne;Le++){let He=xe[Le];yi(f,R,He,He.viewport)}}else ie.length>0&&Tn(ve,ie,R,K),B&&et.render(R),yi(f,R,K);V!==null&&G===0&&(J.updateMultisampleRenderTarget(V),J.updateRenderTargetMipmap(V)),R.isScene===!0&&R.onAfterRender(M,R,K),an.resetDefaultState(),D=-1,L=null,y.pop(),y.length>0?(g=y[y.length-1],ge===!0&&we.setGlobalState(M.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(R,K,re){let ve=q.get(R);ve.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ve.__autoAllocateDepthBuffer===!1&&(ve.__useRenderToTexture=!1),q.get(R.texture).__webglTexture=K,q.get(R.depthTexture).__webglTexture=ve.__autoAllocateDepthBuffer?void 0:re,ve.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,K){let re=q.get(R);re.__webglFramebuffer=K,re.__useDefaultFramebuffer=K===void 0};let At=z.createFramebuffer();this.setRenderTarget=function(R,K=0,re=0){V=R,C=K,G=re;let ve=!0,ie=null,xe=!1,Le=!1;if(R){let Ne=q.get(R);if(Ne.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(z.FRAMEBUFFER,null),ve=!1;else if(Ne.__webglFramebuffer===void 0)J.setupRenderTarget(R);else if(Ne.__hasExternalTextures)J.rebindTextures(R,q.get(R.texture).__webglTexture,q.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Ge=R.depthTexture;if(Ne.__boundDepthTexture!==Ge){if(Ge!==null&&q.has(Ge)&&(R.width!==Ge.image.width||R.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(R)}}let He=R.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Le=!0);let Ye=q.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ie=Array.isArray(Ye[K])?Ye[K][re]:Ye[K],xe=!0):ie=R.samples>0&&J.useMultisampledRTT(R)===!1?q.get(R).__webglMultisampledFramebuffer:Array.isArray(Ye)?Ye[re]:Ye,O.copy(R.viewport),N.copy(R.scissor),j=R.scissorTest}else O.copy(ce).multiplyScalar(le).floor(),N.copy(Ie).multiplyScalar(le).floor(),j=de;if(re!==0&&(ie=At),F.bindFramebuffer(z.FRAMEBUFFER,ie)&&ve&&F.drawBuffers(R,ie),F.viewport(O),F.scissor(N),F.setScissorTest(j),xe){let Ne=q.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ne.__webglTexture,re)}else if(Le){let Ne=K;for(let He=0;He<R.textures.length;He++){let Ye=q.get(R.textures[He]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+He,Ye.__webglTexture,re,Ne)}}else if(R!==null&&re!==0){let Ne=q.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ne.__webglTexture,re)}D=-1},this.readRenderTargetPixels=function(R,K,re,ve,ie,xe,Le,Ne=0){if(!R||!R.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(He=He[Le]),He){F.bindFramebuffer(z.FRAMEBUFFER,He);try{let Ye=R.textures[Ne],Ge=Ye.format,Je=Ye.type;if(!k.textureFormatReadable(Ge))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Je))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");K>=0&&K<=R.width-ve&&re>=0&&re<=R.height-ie&&(R.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ne),z.readPixels(K,re,ve,ie,tt.convert(Ge),tt.convert(Je),xe))}finally{let Ye=V!==null?q.get(V).__webglFramebuffer:null;F.bindFramebuffer(z.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(R,K,re,ve,ie,xe,Le,Ne=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(He=He[Le]),He){if(K>=0&&K<=R.width-ve&&re>=0&&re<=R.height-ie){F.bindFramebuffer(z.FRAMEBUFFER,He);let Ye=R.textures[Ne],Ge=Ye.format,Je=Ye.type;if(!k.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,nt),z.bufferData(z.PIXEL_PACK_BUFFER,xe.byteLength,z.STREAM_READ),R.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ne),z.readPixels(K,re,ve,ie,tt.convert(Ge),tt.convert(Je),0);let Ke=V!==null?q.get(V).__webglFramebuffer:null;F.bindFramebuffer(z.FRAMEBUFFER,Ke);let Nt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await yh(z,Nt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,nt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,xe),z.deleteBuffer(nt),z.deleteSync(Nt),xe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,K=null,re=0){let ve=Math.pow(2,-re),ie=Math.floor(R.image.width*ve),xe=Math.floor(R.image.height*ve),Le=K!==null?K.x:0,Ne=K!==null?K.y:0;J.setTexture2D(R,0),z.copyTexSubImage2D(z.TEXTURE_2D,re,0,0,Le,Ne,ie,xe),F.unbindTexture()};let $e=z.createFramebuffer(),_t=z.createFramebuffer();this.copyTextureToTexture=function(R,K,re=null,ve=null,ie=0,xe=null){let Le,Ne,He,Ye,Ge,Je,nt,Ke,Nt;xe===null&&(ie!==0?(dr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=ie,ie=0):xe=0);let Ht=R.isCompressedTexture?R.mipmaps[xe]:R.image;if(re!==null)Le=re.max.x-re.min.x,Ne=re.max.y-re.min.y,He=re.isBox3?re.max.z-re.min.z:1,Ye=re.min.x,Ge=re.min.y,Je=re.isBox3?re.min.z:0;else{let Q=Math.pow(2,-ie);Le=Math.floor(Ht.width*Q),Ne=Math.floor(Ht.height*Q),He=R.isDataArrayTexture?Ht.depth:R.isData3DTexture?Math.floor(Ht.depth*Q):1,Ye=0,Ge=0,Je=0}ve!==null?(nt=ve.x,Ke=ve.y,Nt=ve.z):(nt=0,Ke=0,Nt=0);let Ct=tt.convert(K.format),dt=tt.convert(K.type),Lt;K.isData3DTexture?(J.setTexture3D(K,0),Lt=z.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(J.setTexture2DArray(K,0),Lt=z.TEXTURE_2D_ARRAY):(J.setTexture2D(K,0),Lt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,K.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,K.unpackAlignment);let x=z.getParameter(z.UNPACK_ROW_LENGTH),T=z.getParameter(z.UNPACK_IMAGE_HEIGHT),I=z.getParameter(z.UNPACK_SKIP_PIXELS),Y=z.getParameter(z.UNPACK_SKIP_ROWS),U=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Ht.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ht.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ye),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ge),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Je);let ee=R.isDataArrayTexture||R.isData3DTexture,W=K.isDataArrayTexture||K.isData3DTexture;if(R.isDepthTexture){let Q=q.get(R),he=q.get(K),Be=q.get(Q.__renderTarget),se=q.get(he.__renderTarget);F.bindFramebuffer(z.READ_FRAMEBUFFER,Be.__webglFramebuffer),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let pe=0;pe<He;pe++)ee&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(R).__webglTexture,ie,Je+pe),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(K).__webglTexture,xe,Nt+pe)),z.blitFramebuffer(Ye,Ge,Le,Ne,nt,Ke,Le,Ne,z.DEPTH_BUFFER_BIT,z.NEAREST);F.bindFramebuffer(z.READ_FRAMEBUFFER,null),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(ie!==0||R.isRenderTargetTexture||q.has(R)){let Q=q.get(R),he=q.get(K);F.bindFramebuffer(z.READ_FRAMEBUFFER,$e),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,_t);for(let Be=0;Be<He;Be++)ee?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Q.__webglTexture,ie,Je+Be):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Q.__webglTexture,ie),W?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,he.__webglTexture,xe,Nt+Be):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,he.__webglTexture,xe),ie!==0?z.blitFramebuffer(Ye,Ge,Le,Ne,nt,Ke,Le,Ne,z.COLOR_BUFFER_BIT,z.NEAREST):W?z.copyTexSubImage3D(Lt,xe,nt,Ke,Nt+Be,Ye,Ge,Le,Ne):z.copyTexSubImage2D(Lt,xe,nt,Ke,Ye,Ge,Le,Ne);F.bindFramebuffer(z.READ_FRAMEBUFFER,null),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else W?R.isDataTexture||R.isData3DTexture?z.texSubImage3D(Lt,xe,nt,Ke,Nt,Le,Ne,He,Ct,dt,Ht.data):K.isCompressedArrayTexture?z.compressedTexSubImage3D(Lt,xe,nt,Ke,Nt,Le,Ne,He,Ct,Ht.data):z.texSubImage3D(Lt,xe,nt,Ke,Nt,Le,Ne,He,Ct,dt,Ht):R.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,xe,nt,Ke,Le,Ne,Ct,dt,Ht.data):R.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,xe,nt,Ke,Ht.width,Ht.height,Ct,Ht.data):z.texSubImage2D(z.TEXTURE_2D,xe,nt,Ke,Le,Ne,Ct,dt,Ht);z.pixelStorei(z.UNPACK_ROW_LENGTH,x),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,T),z.pixelStorei(z.UNPACK_SKIP_PIXELS,I),z.pixelStorei(z.UNPACK_SKIP_ROWS,Y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,U),xe===0&&K.generateMipmaps&&z.generateMipmap(Lt),F.unbindTexture()},this.initRenderTarget=function(R){q.get(R).__webglFramebuffer===void 0&&J.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?J.setTextureCube(R,0):R.isData3DTexture?J.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?J.setTexture2DArray(R,0):J.setTexture2D(R,0),F.unbindTexture()},this.resetState=function(){C=0,G=0,V=null,F.reset(),an.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}};function eu(r,e="#c5b899"){let t=new Xe;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Wt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Wt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(M,b,C,G,V)=>{let D=new at(M,b);return D.position.set(C,G,V),t.add(D),D},o=a(new vt(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let M=0;M<18;M++){let b=M*Math.PI/9,C=a(new ht(.026,.049,.016),i,Math.cos(b)*.083,0,Math.sin(b)*.105);C.rotation.y=-b}let c=a(new qe(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new vt(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),m=/Daytona|square|rose/i.test(r),p=u.createRadialGradient(190,170,20,256,256,256);p.addColorStop(0,d?"#237050":m?"#fff7db":"#294559"),p.addColorStop(1,d?"#072b20":m?"#c7c4b4":"#06121c"),u.fillStyle=p,u.fillRect(0,0,512,512),u.translate(256,256);for(let M=0;M<60;M++)u.save(),u.rotate(M*Math.PI/30),u.strokeStyle=m?"#283333":"#f2dfb3",u.lineWidth=M%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,M%5?-207:-184),u.stroke(),u.restore();let _=(M,b,C)=>{u.save(),u.rotate(M),u.strokeStyle=m?"#203337":"#f4e4bb",u.lineWidth=C,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-b),u.stroke(),u.restore()};_(-Math.PI/3,112,13),_(Math.PI/3,168,9),_(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=m?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let f=new xt(h);f.colorSpace=ct,f.anisotropy=4;let g=a(new Bn(.066,64),new Wt({map:f,roughness:.34,metalness:.1}),0,0,.139),v=a(new Bn(.066,64),new _n({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),y=a(new qe(.012,.012,.019,16),i,.085,0,.12);return y.rotation.z=Math.PI/2,{group:t,dispose(){let M=new Set;t.traverse(b=>{b.geometry?.dispose(),b.material&&M.add(b.material)});for(let b of M)b.dispose();f.dispose()}}}function tu(r="#d3b15b"){let e=new Xe;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new Wt({color:"#c5a14d",metalness:.9,roughness:.24}),n=new Wt({color:r,metalness:.25,roughness:.13}),i=new at(new vt(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new at(new ht(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new at(new yr(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function nu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let oe=n.loadHelmet(!0,e.visor,!0,e.helmet);oe.naturalWidth||await new Promise((be,Ce)=>{oe.addEventListener("load",be,{once:!0}),oe.addEventListener("error",Ce,{once:!0})})}let s=n.renderCharacter(i,{...e,watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let m=d.getContext("2d");m.drawImage(u,0,0,1024,1536);let p=m.getImageData(0,0,1024,1536).data,_=o.getImageData(0,0,1024,1536).data,f=h.getImageData(0,0,1024,1536).data;function g(oe,be,Ce){let ke=Math.max(0,Math.min(1535,Math.round(Ce*1535))),Fe=Math.max(0,Math.min(1023,Math.round(be*1023)));if(oe[(ke*1024+Fe)*4+3]>220)return be;for(let Ze=1;Ze<180;Ze++)for(let we of[Fe-Ze,Fe+Ze])if(we>=0&&we<1024&&oe[(ke*1024+we)*4+3]>220)return we/1023;return be}let v=new xt(a),y=new xt(l),M=new xt(d);for(let oe of[v,y,M])oe.colorSpace=ct,oe.anisotropy=4;let b=n.wardrobeSubcategory("pants",e.pants)==="shorts",C=e.suit?.endsWith("Tank"),G=e.suit?.endsWith("Tee"),V=["classic","ruby","midnight"].includes(e.suit),D=!!e.helmet&&e.helmet!=="none",L=new un({uniforms:{helmetColor:{value:new je(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new je(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},helmetOn:{value:D?1:0},shorts:{value:b?1:0},sleeveEnd:{value:C?.19:G?.29:.49},club:{value:V?1:0},portrait:{value:v},rear:{value:y},profile:{value:M},jacketColor:{value:new je(n.item("suit",e.suit).color)},pantsColor:{value:new je(n.item("pants",e.pants).color)},shoeColor:{value:new je(n.item("shoes",e.shoes).color)}},side:Vt,vertexShader:`uniform float idleTime;uniform float idleStrength;attribute vec2 bodyUv;attribute float surface;attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;void main(){vBodyUv=bodyUv;vSurface=surface;vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;vNormal=normalMatrix*normal;vec3 p=position;float t=idleTime;float breath=sin(t*1.55)*idleStrength;float upper=1.-smoothstep(.45,.82,bodyUv.y);p.x+=sin(t*.54)*.008*upper*idleStrength;
if(surface>0.5&&surface<1.5){float chest=exp(-pow((bodyUv.y-.30)/.13,2.));p.z+=breath*.012*chest;p.y+=breath*.005*chest;}
if(surface>1.5&&surface<3.5){float a=sin(t*.82+sign(p.x)*.4)*.008*idleStrength;vec2 pivot=vec2(sign(p.x)*.50,1.16);p.xy=pivot+mat2(cos(a),-sin(a),sin(a),cos(a))*(p.xy-pivot);}
if(surface>5.5&&surface<6.5){float a=sin(t*.43)*.018*idleStrength;vec2 pivot=vec2(0.,.10);p.xz=pivot+mat2(cos(a),-sin(a),sin(a),cos(a))*(p.xz-pivot);p.y+=breath*.004;}
gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`uniform vec3 helmetColor;uniform vec3 helmetStripe;uniform float helmetOn;uniform float shorts;uniform float sleeveEnd;uniform float club;uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}vec3 dressed(vec3 c,float y,float x){
 if(vSurface>4.5&&vSurface<5.5){float sole=smoothstep(.959,.968,y);float upperPanel=smoothstep(.85,.89,y)*(1.-smoothstep(.93,.95,y));vec3 leather=mix(shoeColor*.60,vec3(.07,.075,.08),upperPanel);float stitch=1.-.12*exp(-pow((y-.945)/.0025,2.));return mix(leather*stitch,vec3(.78,.79,.77),sole);}
 if(vSurface>6.5&&y>.19)return jacketColor*.75;
 float arm=step(1.5,vSurface)*(1.-step(2.5,vSurface));
 float legs=step(3.5,vSurface)*(1.-step(4.5,vSurface));
 if(vSurface>5.5&&vSurface<6.5&&helmetOn>.5){float stripe=1.-smoothstep(.017,.024,abs(x-.505));vec3 shell=mix(helmetColor,helmetStripe,stripe);float visorBand=smoothstep(.045,.055,y)*(1.-smoothstep(.098,.112,y))*smoothstep(-.65,.15,vFront);shell=mix(shell,vec3(.025,.035,.045),visorBand);float vent=step(.105,y)*(1.-step(.155,y))*(1.-smoothstep(.08,.11,abs(x-.505)));return shell*(1.-vent*.38);}
 if(vSurface>2.5&&vSurface<3.5){return texture2D(portrait,vUv).rgb;}
 if((legs>.5&&shorts>.5&&y>.65)||(arm>.5&&y>sleeveEnd)){return texture2D(portrait,vUv).rgb*.86;}
 if(vSurface<1.5||(arm>.5&&y<sleeveEnd)){if(club>.5)return c;float weave=.81+.008*sin(y*85.)*sin(x*110.);float seam=1.-.10*exp(-pow((x-.505)/.003,2.));return jacketColor*weave*seam;}
 if(legs>.5&&y<(shorts>.5?.65:.85)){float fold=.78+.04*sin(x*44.+y*14.);return pantsColor*fold;}return c;
}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);b=dressed(b,vBodyUv.y,vBodyUv.x);s=dressed(s,vBodyUv.y,vBodyUv.x);float f=smoothstep(.22,.78,vFront)*a.a;vec3 n=normalize(vNormal);vec3 lamp=normalize(vec3(-.55,.85,1.));float light=.62+.34*max(0.,dot(n,lamp))+.09*max(0.,dot(n,normalize(vec3(.7,.2,-1.))));float underArm=exp(-pow((abs(vBodyUv.x-.5)-.19)/.025,2.))*exp(-pow((vBodyUv.y-.30)/.11,2.));float collar=exp(-pow((vBodyUv.y-.192)/.018,2.))*exp(-pow((vBodyUv.x-.5)/.09,2.));light*=1.-.13*underArm-.12*collar;vec3 color=mix(b,a.rgb,f);float sideAmount=(1.-smoothstep(.05,.72,abs(vFront)))*step(5.5,vSurface)*(1.-helmetOn);color=mix(color,s,sideAmount)*light;float hardSurface=step(4.5,vSurface)*(1.-step(6.5,vSurface));float gloss=mix(.025,.16,hardSurface);float highlight=pow(max(0.,dot(reflect(-lamp,n),vec3(0.,0.,1.))),mix(14.,48.,hardSurface));float rim=pow(1.-abs(n.z),3.)*.045;color+=vec3(1.,.90,.75)*(highlight*gloss+rim);gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`}),O=new Xe,N=[];function j(oe,{rings:be=70,sides:Ce=80,muzzle:ke=!1,folds:Fe=0,z:Ze=0,surface:we=0}={}){let ze=[],et=[],zt=[],Oe=[],ut=[],tt=[],an=[],Et=[],z=oe[0][0],Ot=oe.at(-1)[0];function Mt(It){let it=0;for(;it<oe.length-2&&oe[it+1][0]<It;)it++;let qt=oe[it],St=oe[it+1],Yt=Math.max(0,Math.min(1,(It-qt[0])/(St[0]-qt[0])));return qt.map((tn,Jt)=>{if(Jt===0)return It;let pn=oe[Math.max(0,it-1)][Jt]||0,Kt=oe[Math.min(oe.length-1,it+2)][Jt]||0,nn=St[Jt]||0;return Math.max(Math.min(tn,nn),Math.min(Math.max(tn,nn),.5*(2*tn+(-pn+nn)*Yt+(2*pn-5*tn+4*nn-Kt)*Yt*Yt+(-pn+3*tn-3*nn+Kt)*Yt*Yt*Yt)))})}for(let It=0;It<=be;It++){let it=z+(Ot-z)*It/be,[,qt,St,Yt,tn=0]=Mt(it),Jt=(qt+St)/2,pn=(St-qt)/2;for(let Kt=0;Kt<=Ce;Kt++){let nn=2*Math.PI*Kt/Ce,yi=Math.cos(nn),Tn=Math.sin(nn),Bt=Jt+pn*yi,Ut=Yt*(1+Fe*Math.sin(it*260+nn*4)*Math.sin(Math.PI*It/be)),Tt=Ze+tn+Ut*Tn;if(ke&&Tn>0){let K=(Bt-.507)/.085;Tt+=.17*Math.exp(-(K*K)-((it-.126)/.031)**2)*Tn*Tn,Tt+=.045*Math.exp(-(((Bt-.505)/.05)**2)-((it-.104)/.015)**2)*Tn,Tt-=.028*(Math.exp(-(((Bt-.466)/.024)**2))+Math.exp(-(((Bt-.55)/.024)**2)))*Math.exp(-(((it-.077)/.013)**2))*Tn}ze.push(((we===5?Jt+(Bt-Jt)*.88:Bt)-.5)*2.55,(.5-it)*3.825,we===5?Tt*.84:Tt),tt.push(Bt,it),an.push(we);let ft=Bt,qn=it;we===3&&(ft=(Bt<.5?.2:.8)+(Bt-(qt+St)/2)*.45,qn=Math.min(it,.545)),et.push(g(_,ft,qn),1-qn);let At=it,$e=Bt;ke?At=.008+(it-.008)*.74:z<.24&&Ot>.4&&qt>.29&&St<.72&&(At=.14+(it-.165)*1.08),z>.82&&($e=Jt+(Bt-Jt)*.8),zt.push(g(f,$e,At),1-At);let _t=ke?it*.92:it,R=(ke?.45:.49)+Tt*.4;if(z>=.45&&Ot>.62&&it>.49&&it<.62&&(R=Math.min(R,.43)),Oe.push(g(p,R,_t),1-_t),ut.push(Tn),It<be&&Kt<Ce){let K=It*(Ce+1)+Kt,re=K+Ce+1;Et.push(K,K+1,re,K+1,re+1,re)}}}for(let It of[0,be]){let it=It*(Ce+1),qt=ze.length/3;for(let[St,Yt]of[[ze,3],[et,2],[zt,2],[Oe,2],[tt,2]])for(let tn=0;tn<Yt;tn++){let Jt=0;for(let pn=0;pn<Ce;pn++)Jt+=St[(it+pn)*Yt+tn];St.push(Jt/Ce)}an.push(we),ut.push(0);for(let St=0;St<Ce;St++)It===0?Et.push(qt,it+St+1,it+St):Et.push(qt,it+St,it+St+1)}let pt=new mt;pt.setAttribute("bodyUv",new De(tt,2)),pt.setAttribute("surface",new De(an,1)),pt.setAttribute("position",new De(ze,3)),pt.setAttribute("uv",new De(et,2)),pt.setAttribute("rearUv",new De(zt,2)),pt.setAttribute("profileUv",new De(Oe,2)),pt.setAttribute("frontWeight",new De(ut,1)),pt.setIndex(Et),pt.computeVertexNormals(),O.add(new at(pt,L)),N.push(pt)}j([[.165,.435,.575,.1],[.19,.35,.65,.21],[.245,.313,.69,.28],[.32,.32,.69,.28],[.4,.31,.69,.255],[.455,.315,.68,.225],[.475,.37,.63,.18]],{folds:.025,surface:1}),j([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),j(D?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!D,z:.1,rings:110,sides:112,surface:6}),D||(j([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),j([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let oe of[-1,1]){let be=Ce=>oe<0?Ce:Ce.map(([ke,Fe,Ze,we,ze])=>[ke,1-Ze,1-Fe,we,ze||0]);j(be([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.32,.185,.303,.15],[.37,.167,.276,.135],[.43,.141,.254,.13],[.475,.145,.234,.105],[.49,.153,.23,.085]]),{z:-.025,folds:.025,rings:100,surface:2}),j(be([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}),j(be([[.478,.168,.221,.055],[.493,.151,.23,.08],[.525,.146,.251,.09],[.535,.153,.247,.085],[.548,.166,.241,.065],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let Ce=0;Ce<4;Ce++){let ke=.166+Ce*.019,Fe=.542+Ce*.002;j(be([[Fe,ke,ke+.019,.025],[Fe+.025,ke-.002,ke+.02,.028],[Fe+.041,ke+.003,ke+.017,.007]]),{z:.07,rings:18,sides:24,surface:3})}j(be([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}j([[.454,.36,.65,.17],[.48,.303,.7,.24],[.53,.29,.713,.25],[.58,.3,.7,.23],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let oe of[-1,1]){let be=Ce=>oe<0?Ce:Ce.map(([ke,Fe,Ze,we,ze])=>[ke,1-Ze,1-Fe,we,ze||0]);j(be([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,b?.3:.271,b?.425:.44,b?.145:.19],[.74,b?.285:.252,b?.405:.423,b?.14:.185],[.79,b?.275:.242,b?.385:.397,b?.12:.165],[.826,b?.28:.254,b?.375:.39,b?.11:.155],[.843,.283,.372,.105]]),{z:-.01,folds:.012,rings:110,surface:4}),j(be([[.829,.275,.373,.095],[.848,.27,.389,.135],[.875,.25,.394,.19],[.907,.207,.397,.245],[.944,.165,.4,.285],[.966,.154,.393,.255],[.98,.18,.37,.16],[.986,.26,.31,.01]]),{z:.1,folds:.009,rings:85,surface:5})}let X=e.ring&&e.ring!=="none"?tu(n.item("ring",e.ring).color):null;X&&O.add(X.group);let te=e.watch&&e.watch!=="none"?eu(e.watch,n.item("watch",e.watch).color):null;te&&O.add(te.group);let ne=new vn;if(ne.add(O),te||X){ne.add(new Pn("#fff0d4","#283849",2.1));let oe=new Sn("#fff0dc",3.5);oe.position.set(-2,4,5),ne.add(oe);let be=new Sn("#9cc3ed",1.2);be.position.set(3,1,-2),ne.add(be)}let me=new zn({alpha:!0,antialias:!0});me.setPixelRatio(Math.min(devicePixelRatio,2)),me.outputColorSpace=ct,r.append(me.domElement),me.domElement.setAttribute("role","img"),me.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let le=new vi(-1.5,1.5,2.05,-2.05,.1,30);le.position.set(0,0,8);let Te=t.yaw||0,$=t.pitch||0,ce=null,Ie,de=!1,Me=!1,ge=0,Z=window.matchMedia?.("(prefers-reduced-motion: reduce)"),Ee="full",A=t.focusOrbit||null,w=2.05,H=0,B=0;function S(oe){oe=oe==="watch"?"watch":"full",oe!==Ee&&(oe==="watch"?(A=A||{yaw:Te,pitch:$},t.focusOrbit=A,Te=0,$=0):A&&(Te=A.yaw,$=A.pitch,A=null,delete t.focusOrbit),t.yaw=Te,t.pitch=$,Ee=oe,r.dataset.focus=Ee)}function P(oe){let be=r.clientWidth/Math.max(1,r.clientHeight),Ce=Ee==="watch",ke=Ce?Math.max(.4,.3/be):Math.max(2.05,1.17/be),Fe=Ce?.76*Math.cos(Te)+.1*Math.sin(Te):0,Ze=Ce?.04*Math.cos($)-(.1*Math.cos(Te)-.76*Math.sin(Te))*Math.sin($):0,we=1-Math.exp(-oe*12);w+=(ke-w)*we,H+=(Fe-H)*we,B+=(Ze-B)*we,le.left=H-w*be,le.right=H+w*be,le.top=B+w,le.bottom=B-w,le.updateProjectionMatrix()}let k=()=>{!r.clientWidth||!r.clientHeight||(P(1),me.setSize(r.clientWidth,r.clientHeight,!1))},F=new ResizeObserver(k);F.observe(r),k();let ae=oe=>{Me=!1,ce={id:oe.pointerId,x:oe.clientX,y:oe.clientY},r.setPointerCapture(oe.pointerId),oe.preventDefault()},q=oe=>{!ce||ce.id!==oe.pointerId||(Te+=(oe.clientX-ce.x)*.012,$=Math.max(-.35,Math.min(.35,$+(oe.clientY-ce.y)*.006)),ce.x=oe.clientX,ce.y=oe.clientY)},J=()=>{ce=null},_e=oe=>{["ArrowLeft","ArrowRight"].includes(oe.key)&&(Te+=oe.key==="ArrowLeft"?-.15:.15,oe.preventDefault())};r.addEventListener("pointerdown",ae),r.addEventListener("pointermove",q),r.addEventListener("pointerup",J),r.addEventListener("pointercancel",J),r.addEventListener("keydown",_e);function Re(oe=0){if(!de){if(!r.isConnected){Se();return}Me&&!ce&&ge&&(Te+=Math.min(.05,(oe-ge)/1e3)*.35),L.uniforms.idleTime.value=oe/1e3,L.uniforms.idleStrength.value=!Z?.matches&&!ce&&Ee==="full"?1:0,P(ge?Math.min(.05,(oe-ge)/1e3):.016),ge=oe,O.rotation.set($,Te,0),t.yaw=Te,t.pitch=$,r.dataset.yaw=String(Te),me.render(ne,le),Ie=requestAnimationFrame(Re)}}return Re(),{state:t,setFocus:S,setYaw(oe){Te=oe},setAutoRotate(oe){Me=!!oe},dispose:Se};function Se(){if(!de){de=!0,cancelAnimationFrame(Ie),F.disconnect();for(let[oe,be]of[["pointerdown",ae],["pointermove",q],["pointerup",J],["pointercancel",J],["keydown",_e]])r.removeEventListener(oe,be);for(let oe of N)oe.dispose();te?.dispose(),X?.dispose(),L.dispose(),v.dispose(),y.dispose(),M.dispose(),me.dispose(),me.forceContextLoss(),me.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new vn,s=new Xe;i.add(s);let a=new zn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ct,a.toneMapping=ni,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new Gt(34,1,.1,40);i.add(new Pn("#dcecff","#50402b",2));for(let[Z,Ee,A,w]of[[3,6,5,4],[-3,3,-3,3]]){let H=new Sn("#fff0dd",w);H.position.set(Z,Ee,A),i.add(H)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let Z=0;Z<128;Z+=2)l.fillStyle=Z%4?"#808080":"#b0b0b0",l.fillRect(0,Z,128,1);for(let Z=0;Z<128;Z+=3)l.fillStyle="#888888",l.fillRect(Z,0,1,128);let h=new xt(c);h.wrapS=h.wrapT=Hn,h.repeat.set(8,8);let u=(Z,Ee=0,A=.7)=>new Wt({color:Z,metalness:Ee,roughness:A}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),_=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),v=u("#171b20"),y=u("#171b20"),M=u("#826222",.9,.18);for(let Z of[g,v,p])Z.bumpMap=h,Z.bumpScale=.012;function b(Z,Ee,A,w,H,B,S,P=s){let k=new at(new sn(1,40,28),Z);return k.position.set(Ee,A,w),k.scale.set(H,B,S),P.add(k),k}function C(Z,Ee,A,w,H=w){let B=new E(...Ee),S=new E(...A),P=S.clone().sub(B),k=new at(w>.1?new gr((w+H)/2,Math.max(.01,P.length()-(w+H)),10,32):new qe(H,w,P.length(),16),Z);return k.position.copy(B.add(S).multiplyScalar(.5)),k.quaternion.setFromUnitVectors(new E(0,1,0),P.normalize()),s.add(k),k}b(v,0,1.64,0,.47,.36,.26),b(g,0,2.32,0,.59,.65,.32),b(p,0,2.35,.29,.27,.49,.055);for(let Z of[-1,1]){C(v,[Z*.27,1.67,0],[Z*.29,.92,.015],.23,.25),b(v,Z*.29,.92,.015,.23,.24,.24),C(v,[Z*.29,.94,.015],[Z*.32,.28,0],.16,.22),C(_,[Z*.45,1.55,.03],[Z*.48,.36,.03],.025,.032),b(y,Z*.32,.18,.15,.22,.19,.39),b(_,Z*.32,.075,.15,.235,.065,.4),b(_,Z*.32,.27,.12,.135,.08,.2);for(let Ee=0;Ee<5;Ee++)C(_,[Z*.32-.1,.29,.08+Ee*.04],[Z*.32+.1,.29,.08+Ee*.04],.009);b(g,Z*.55,2.63,0,.26,.27,.29),C(g,[Z*.57,2.63,0],[Z*.76,2.12,.02],.19,.23),b(g,Z*.76,2.12,.02,.19,.2,.2),C(g,[Z*.76,2.12,.02],[Z*.88,1.65,.08],.13,.18),C(_,[Z*.71,2.6,.15],[Z*.99,1.72,.15],.035),b(p,Z*.88,1.67,.08,.145,.09,.15),b(d,Z*.89,1.48,.1,.16,.22,.12);for(let Ee=0;Ee<4;Ee++)b(m,Z*(.79+Ee*.065),1.36,.15,.035,.13,.045);b(m,Z*.75,1.48,.2,.06,.12,.06)}b(d,0,3.04,0,.25,.27,.24),b(d,0,3.39,0,.36,.43,.31);for(let Z of[-1,1])b(m,Z*.36,3.4,.01,.12,.17,.09),b(d,Z*.36,3.4,.065,.065,.1,.035),b(m,Z*.15,3.43,.258,.15,.12,.075),b(p,Z*.14,3.44,.32,.045,.035,.02),b(_,Z*.13,3.45,.335,.009,.01,.006),b(d,Z*.15,3.53,.28,.18,.05,.07);b(m,0,3.23,.27,.26,.18,.13),b(m,0,3.34,.34,.14,.08,.08),b(p,0,3.17,.375,.17,.017,.018),b(m,0,3.13,.36,.17,.035,.025);let G=new Xe;s.add(G),b(p,0,3.51,-.02,.41,.42,.35,G),b(f,0,3.64,.015,.07,.3,.36,G);for(let Z of[-1,1])b(p,Z*.32,3.29,.015,.1,.31,.24,G),b(f,Z*.39,3.43,.07,.025,.05,.05,G);let V=b(M,0,3.44,.27,.38,.19,.14,G);for(let Z of[-1,1])C(p,[Z*.28,2.88,.25],[Z*.1,2.58,.33],.035),C(p,[Z*.3,2.28,.3],[Z*.39,2.09,.26],.018);for(let Z=0;Z<6;Z++)b(f,0,2.03+Z*.14,.35,.015,.015,.01);let D=document.createElement("canvas");D.width=512,D.height=256;let L=D.getContext("2d"),O=new xt(D);O.colorSpace=ct;let N=new at(new jt(.28,.12),new Wt({map:O,roughness:.9}));N.position.set(-.27,2.46,.317),s.add(N);let j=new Xe;for(let Z=0;Z<3;Z++)for(let Ee=0;Ee<5;Ee++){let A=new at(new jt(.048,.048),(Ee+Z)%2?p:_);A.position.set(-.36+Ee*.048,2.62+Z*.048,.318),j.add(A)}s.add(j);function X(Z){g.color.set(n.item("suit",Z.suit).color),v.color.set(n.item("pants",Z.pants).color),y.color.set(n.item("shoes",Z.shoes).color),G.visible=Z.helmet!=="none",V.position.y=Z.visor==="open"?3.71:3.44,V.rotation.x=Z.visor==="open"?-.8:0,N.visible=Z.patch!=="none",L.fillStyle="#22282b",L.fillRect(0,0,512,256),L.strokeStyle="#c9af74",L.lineWidth=12,L.strokeRect(8,8,496,240),L.fillStyle="#eee0b5",L.font="bold 72px Arial",L.textAlign="center",L.fillText(Z.patch==="name"?Z.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":Z.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),O.needsUpdate=!0}X(e),t.yaw??=0,t.pitch??=.07;let te=null,ne,me=!1;function le(){let Z=r.clientWidth,Ee=r.clientHeight;!Z||!Ee||(a.setSize(Z,Ee,!1),o.aspect=Z/Ee,o.updateProjectionMatrix())}let Te=new ResizeObserver(le);Te.observe(r),le();let $=Z=>{te={id:Z.pointerId,x:Z.clientX,y:Z.clientY},r.setPointerCapture(Z.pointerId),Z.preventDefault()},ce=Z=>{!te||te.id!==Z.pointerId||(t.yaw-=(Z.clientX-te.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(Z.clientY-te.y)*.006)),te.x=Z.clientX,te.y=Z.clientY)},Ie=()=>{te=null},de=Z=>{(Z.key==="ArrowLeft"||Z.key==="ArrowRight")&&(t.yaw+=Z.key==="ArrowLeft"?.15:-.15,Z.preventDefault())};r.addEventListener("pointerdown",$),r.addEventListener("pointermove",ce),r.addEventListener("pointerup",Ie),r.addEventListener("pointercancel",Ie),r.addEventListener("keydown",de);function Me(){if(me)return;me=!0,cancelAnimationFrame(ne),Te.disconnect();for(let[Ee,A]of[["pointerdown",$],["pointermove",ce],["pointerup",Ie],["pointercancel",Ie],["keydown",de]])r.removeEventListener(Ee,A);let Z=new Set;i.traverse(Ee=>{Ee.geometry?.dispose(),Ee.material&&Z.add(Ee.material)});for(let Ee of Z)Ee.dispose();O.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function ge(){if(me)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Me();return}let Z=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Z,1.95+Math.sin(t.pitch)*Z,Math.cos(t.yaw)*Math.cos(t.pitch)*Z),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ne=requestAnimationFrame(ge)}return ge(),{update:X,dispose:Me,state:t}};function Jl(r){let e=new Xe;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(D,L,O)=>new _n({color:D,metalness:L,roughness:O,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(D,L,O=0,N=0,j=0)=>{let X=new at(D,L);return X.position.set(O,N,j),X.castShadow=X.receiveShadow=!0,e.add(X),X},h=(D,L,O,N=!0)=>{let j=new Mn;return j.absarc(L,O,D,0,Math.PI*2,N),j},u=t?.395:.437,d=new $t;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let D=0;D<24;D++)for(let[L,O]of[[.28,0],[.36,.045]]){let N=D*Math.PI/12+O;d.holes.push(h(n?.009:.011,Math.cos(N)*L,Math.sin(N)*L))}for(let D of[0,.033])l(new Xt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,D);let m=new ht(.22,.014,.025),p=new Qr(m,a,32),_=new Qe;for(let D=0;D<32;D++){let L=D*Math.PI/16;_.compose(new E(Math.cos(L)*.31,Math.sin(L)*.31,.021),new Cn().setFromAxisAngle(new E(0,0,1),L+.18),new E(1,1,1)),p.setMatrixAt(D,_)}e.add(p);let f=l(new qe(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new qe(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let D=0;D<10;D++){let L=D*Math.PI/5,O=l(new qe(.017,.017,.015,12),s,Math.cos(L)*.18,Math.sin(L)*.18,.05);O.rotation.x=Math.PI/2;let N=l(new qe(.009,.009,.018,6),a,Math.cos(L)*.18,Math.sin(L)*.18,.058);N.rotation.x=Math.PI/2}for(let D of[.235,.26,.31,.335,.39,.414])if(D<u){let L=l(new vt(D,.0012,3,96),a,0,0,.042);L.castShadow=!1}if(!t)for(let D=0;D<8;D++){let L=D*Math.PI/4,O=[.25,.29,.34,.395].map((j,X)=>new E(Math.cos(L+X*.075)*j,Math.sin(L+X*.075)*j,.043)),N=l(new wt(new Rt(O),12,.0024,3,!1),a);N.castShadow=!1}let v=new $t;v.moveTo(-.08,-.2),v.quadraticCurveTo(-.13,-.15,-.115,-.06),v.lineTo(-.115,.1),v.quadraticCurveTo(-.12,.19,-.05,.215),v.lineTo(.055,.19),v.quadraticCurveTo(.11,.14,.105,.06),v.lineTo(.105,-.1),v.quadraticCurveTo(.1,-.19,.04,-.21),v.closePath();let y=l(new Xt(v,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&y.scale.set(.8,.8,.8),l(new ht(.09,.31,.032),a,.27,0,.005);for(let D of[-.125,0,.125]){let L=l(new qe(.055,.055,.028,24),c,.354,D,.07);L.rotation.x=Math.PI/2}for(let D of[-.155,.155]){let L=l(new qe(.014,.014,.025,6),s,.325,D,.094);L.rotation.x=Math.PI/2}let M=document.createElement("canvas");M.width=128,M.height=384;let b=M.getContext("2d");b.fillStyle="#f5f0df",b.translate(64,192),b.rotate(-Math.PI/2),b.textAlign="center",b.font="italic bold 60px Arial",b.fillText(t?"P21":"P21 SPORT",0,20);let C=new xt(M);C.colorSpace=ct;let G=l(new jt(.075,.24),new On({map:C,transparent:!0,depthWrite:!1}),.329,0,.1);G.castShadow=!1;let V=l(new qe(.012,.014,.047,6),s,.36,.217,.042);return V.rotation.z=.2,e}var Zl;function iu(r,e){if(!r.isConnected)return;if(!Zl){let a=new zn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ct,a.toneMapping=ni,a.toneMappingExposure=1.15;let o=new vn;o.add(new Pn("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new Sn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Gt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),Zl={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=Zl;s[e]||(s[e]=Jl(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function ru(r){let e=new Xe;e.name="tyre-"+r;let t=new Wt({color:"#15181b",roughness:.86}),n=new Wt({color:"#050708",roughness:.96}),i=new Wt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new at(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new gi([new ue(.56,-.19),new ue(.63,-.25),new ue(.72,-.23),new ue(.79,-.15),new ue(.8,-.1),new ue(.8,.1),new ue(.79,.15),new ue(.72,.23),new ue(.63,.25),new ue(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new vt(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,m=s(new ht(.018,.036,.006),i);m.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),m.rotation.z=-d}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(d,m)=>{let p=-.2+m/15*.4,_=.8-.045*(Math.abs(p)/.2)**3,f=h+(o?.18:.08)*Math.sin(m/15*Math.PI);return new E(Math.sin(f)*_,Math.cos(f)*_,p)});s(new wt(new Rt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new vt(.798,.004,8,80),n);h.position.z=l}}return e}function su(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r==="formulaPro",o=new Xe;o.name="front-wing-"+r;let c=a?3.32:3.1,l=a?4:2,h=(_,f,g)=>{let v=new at(_,f);return v.name=g,v.castShadow=v.receiveShadow=!0,o.add(v),v};for(let _=0;_<l;_++){let f=[],g=[];for(let b=0;b<=72;b++){let C=b/72*2-1,G=C*c/2,V=(_?a?.36:.46:.76)*(1-.22*C*C),D=(_?2.86+_*.055:3.02)-.13*C*C,L=.43+_*.095+.1*Math.pow(Math.abs(C),3);for(let O=0;O<=28;O++){let N=O/28*Math.PI*2,j=Math.cos(N);f.push(D+j*V/2,L+.035*(1-j*j)+Math.sin(N)*(_?.024:.035),G)}if(b<72)for(let O=0;O<28;O++){let N=b*29+O,j=N+28+1;g.push(N,N+1,j,N+1,j+1,j)}}let M=new mt;M.setAttribute("position",new De(f,3)),M.setIndex(g),M.computeVertexNormals(),h(M,_===0?n:t,"wing-element-"+_)}let u=[],d=[],m=[[2.13,1.04,.33,.13],[2.43,.98,.28,.12],[2.72,.83,.2,.1],[3.02,.7,.115,.075]];for(let[_,f,g,v]of m)for(let y=0;y<24;y++){let M=y/24*Math.PI*2;u.push(_,f+Math.sin(M)*v,Math.cos(M)*g)}for(let _=0;_<m.length-1;_++)for(let f=0;f<24;f++){let g=_*24+f,v=_*24+(f+1)%24;d.push(g,g+24,v,v,g+24,v+24)}for(let _=1;_<23;_++){d.push(0,_,_+1);let f=(m.length-1)*24;d.push(f,f+_+1,f+_)}let p=new mt;p.setAttribute("position",new De(u,3)),p.setIndex(d),p.computeVertexNormals(),h(p,t,"tapered-nose");for(let _ of[-1,1]){let f=h(new ht(.13,.37,.065),n,"nose-pylon");f.position.set(2.9,.61,_*.13),f.rotation.z=-.15;let g=new $t;g.moveTo(2.57,.38),g.lineTo(3.43,.38),g.quadraticCurveTo(3.53,.42,3.43,.61),g.lineTo(3.14,a?.95:.82),g.quadraticCurveTo(2.79,a?.97:.84,2.61,.69),g.closePath();let v=h(new Xt(g,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");v.position.z=_*c/2-.017,h(new ht(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,_*(c/2+.055));let M=new Rt([[2.65,.7],[2.9,a?.94:.81],[3.13,a?.94:.81],[3.4,.61]].map(([b,C])=>new E(b,C,_*(c/2+.025))));if(h(new wt(M,28,.009,6,!1),s,"endplate-trim"),a)for(let b=0;b<3;b++){let C=h(new ht(.27,.13,.018),n,"flow-fin");C.position.set(2.86+b*.07,.58+b*.07,_*(1.1+b*.1)),C.rotation.z=.15}}return o}function $l(r){let e=new Xe;e.name="sport-seat-"+r;let t=(L,O=.8,N=0)=>new _n({color:L,roughness:O,metalness:N,clearcoat:N?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),m=document.createElement("canvas");m.width=m.height=64;let p=m.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let L=0;L<64;L+=8)for(let O=0;O<64;O+=8)p.fillStyle=(O+L)%16?"#121820":"#626973",p.fillRect(O,L,7,3),p.fillStyle="#252b33",p.fillRect(O,L+4,3,4);let _=new xt(m);_.wrapS=_.wrapT=Hn,_.repeat.set(3,5),_.colorSpace=ct,c.map=_,c.bumpMap=_,c.bumpScale=.004;let f=(L,O,N=0,j=0,X=0,te=e)=>{let ne=new at(L,O);return ne.position.set(N,j,X),ne.castShadow=ne.receiveShadow=!0,te.add(ne),ne},g=(L,O,N,j,X,te,ne,me,le=e)=>{let Te=new $t,$=-L/2,ce=-O/2;return j=Math.min(j,L/2,O/2,N/2),Te.moveTo($+j,ce),Te.lineTo($+L-j,ce),Te.quadraticCurveTo($+L,ce,$+L,ce+j),Te.lineTo($+L,ce+O-j),Te.quadraticCurveTo($+L,ce+O,$+L-j,ce+O),Te.lineTo($+j,ce+O),Te.quadraticCurveTo($,ce+O,$,ce+O-j),Te.lineTo($,ce+j),Te.quadraticCurveTo($,ce,$+j,ce),f(new Xt(Te,{depth:N-2*j,bevelEnabled:!0,bevelSize:j,bevelThickness:j,bevelSegments:4,curveSegments:12}),X,te,ne,me-N/2+j,le)},v=(L,O,N,j=e)=>f(new wt(new Rt(L.map(X=>new E(...X))),32,O,6,!1),N,0,0,0,j),y=new Xe;y.rotation.x=-.14,y.position.set(0,.2,0),e.add(y);let M=new $t;M.moveTo(-.29,0),M.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),M.lineTo(-.47,.92),M.quadraticCurveTo(-.46,1.02,-.34,1.11),M.lineTo(-.28,1.21),M.lineTo(-.26,1.48),M.quadraticCurveTo(0,1.62,.26,1.48),M.lineTo(.28,1.21),M.lineTo(.34,1.11),M.quadraticCurveTo(.46,1.02,.47,.92),M.lineTo(.43,.65),M.bezierCurveTo(.39,.42,.38,.2,.29,0),M.closePath();for(let L of[-.135,.135]){let O=new Mn;O.moveTo(L-.075,1.24),O.lineTo(L+.075,1.24),O.lineTo(L+.075,1.34),O.lineTo(L-.075,1.34),O.closePath(),M.holes.push(O)}f(new Xt(M,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,y),f(new Xt(M,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,y).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,y),g(.46,.5,.12,.035,o,0,.85,.065,y),g(.45,.31,.17,.04,o,0,.4,.1,y);for(let L of[-1,1]){let O=g(.17,.42,.19,.055,a,L*.34,.98,.1,y);O.rotation.z=L*.28,O.rotation.y=-L*.25;let N=g(.13,.55,.23,.045,a,L*.3,.49,.14,y);N.rotation.z=-L*.12,v([[L*.27,.18,.28],[L*.34,.52,.28],[L*.4,.93,.24],[L*.3,1.17,.2]],.005,l,y);let j=L*.135;for(let X of[1.235,1.345])g(.16,.014,.022,.004,h,j,X,.015,y);for(let X of[j-.08,j+.08])g(.014,.12,.022,.004,h,X,1.29,.015,y)}let C=g(n?.86:.77,.18,.84,.055,c,0,.38,.34);C.name="seat-base";let G=g(n?.61:.54,.17,i?.74:.67,.05,o,0,.535,.39);G.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let L of[-.28,.28])g(.07,.3,.65,.018,h,L,.16,.34);for(let L of[.2,.33,.46,.59])v([[-.23,.625,L],[0,.635,L+.015],[.23,.625,L]],.003,l);if(n){for(let L of[-1,1])g(.14,.13,.64,.04,a,L*.45,.65,.32),g(.045,.23,.1,.01,h,L*.45,.48,.16);for(let L=.45;L<1.1;L+=.15)for(let O of[-.1,.1])v([[O-.1,L,.18],[O,L+.07,.18],[O+.1,L,.18]],.003,l,y)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),v([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let L of[-1,1]){let O=g(.16,.26,.74,.055,a,L*(n?.365:.325),.54,.39);O.rotation.z=-L*.12,v([[L*.26,.63,.03],[L*.26,.66,.35],[L*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,L*.28,-.015,.34);for(let N of[.02,.65])g(.13,.09,.12,.015,c,L*.28,-.055,N),f(new qe(.022,.022,.015,12),h,L*.28,-.002,N)}for(let L=.3;L<1.08;L+=.11)v([[-.19,L,.16],[0,L-.015,.17],[.19,L,.16]],.0025,l,y);for(let L of[-1,1]){let O=[[L*.135,1.5,-.13],[L*.135,1.15,-.03],[L*.13,.78,.08],[L*.1,.66,.4]],N=[],j=[];O.forEach(([me,le,Te],$)=>{N.push(me-.033,le,Te,me+.033,le,Te),$&&j.push($*2-2,$*2-1,$*2,$*2-1,$*2+1,$*2)});let X=new mt;X.setAttribute("position",new De(N,3)),X.setIndex(j),X.computeVertexNormals();let te=u.clone();te.side=Vt,f(X,te);let ne=g(.27,.055,.025,.008,u,L*.18,.64,.45);ne.rotation.z=-L*.2}let V=f(new qe(.065,.065,.035,24),h,0,.66,.48);V.rotation.x=Math.PI/2;let D=f(new qe(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);return D.rotation.x=Math.PI/2,e}var Kl;function au(r,e){if(!r.isConnected||e==="none")return;if(!Kl){let a=new zn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ct,a.toneMapping=ni,a.toneMappingExposure=1.25;let o=new vn;o.add(new Pn("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new Sn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Gt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),Kl={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=Kl;s[e]||(s[e]=$l(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=nu;window.pokerPaintBrakePreview=iu;window.pokerPaintSeatPreview=au;var ou=(r,e,t)=>Math.max(e,Math.min(t,r));function xp(r,e){let t=window.PokerGarage,n=new Xe;r.add(n),n.scale.set(1.24,.86,.95);let i=(x,T,I)=>new _n({color:x,metalness:T,roughness:I,clearcoat:T>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(x,T,I=0,Y=0,U=0,ee=n){let W=new at(x,T);return W.position.set(I,Y,U),W.castShadow=!0,W.receiveShadow=!0,ee.add(W),W}let _=(x,T,I,Y,U,ee,W)=>p(new ht(x,T,I),Y,U,ee,W);function f(x,T,I,Y,U,ee,W="y"){let Q=p(new qe(x,x,T,64),I,Y,U,ee);return W==="z"&&(Q.rotation.x=Math.PI/2),W==="x"&&(Q.rotation.z=Math.PI/2),Q}function g(x,T,I,Y,U,ee,W="z"){let Q=p(new vt(x,T,12,80),I,Y,U,ee);return W==="y"&&(Q.rotation.x=Math.PI/2),W==="x"&&(Q.rotation.y=Math.PI/2),Q}function v(x,T,I,Y=$t){let U=new Y,ee=-x/2,W=-T/2;return I=Math.min(I,T/2-.001),U.moveTo(ee+I,W),U.lineTo(ee+x-I,W),U.quadraticCurveTo(ee+x,W,ee+x,W+I),U.lineTo(ee+x,W+T-I),U.quadraticCurveTo(ee+x,W+T,ee+x-I,W+T),U.lineTo(ee+I,W+T),U.quadraticCurveTo(ee,W+T,ee,W+T-I),U.lineTo(ee,W+I),U.quadraticCurveTo(ee,W,ee+I,W),U}function y(x,T,I,Y,U,ee,W=null,Q=.025){let he=v(x,T,Y);if(W){let se=v(W[0],W[1],W[2],Mn),pe=new Mn(se.getPoints(40).map(ye=>new ue(ye.x+(W[3]||0),ye.y)));he.holes.push(pe)}let Be=p(new Xt(he,{depth:I,bevelEnabled:Q>0,bevelSize:Q,bevelThickness:Q,bevelSegments:4,curveSegments:40}),U,0,ee,0);return Be.rotation.x=-Math.PI/2,Be}let M=[3.02,1.51,.65,-.28],b=v(4.96,2.44,1.15).getSpacedPoints(128),C=[],G=[],V=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[x,T]of V)for(let I=0;I<128;I++){let Y=b[I];C.push(Y.x*T,x,-Y.y*T)}for(let x=0;x<3;x++)for(let T=0;T<128;T++){let I=x*128+T,Y=x*128+(T+1)%128;G.push(I,Y,I+128,Y,Y+128,I+128)}let D=new mt;D.setAttribute("position",new De(C,3)),D.setIndex(G),D.computeVertexNormals(),s.side=Vt,p(D,s),y(5.03,2.51,.065,1.19,o,.58,null,.035),y(5.1,2.58,.09,1.22,o,1.25,M,.035);let L=new Rt(v(4.94,2.42,1.15).getPoints(40).map(x=>new E(x.x,1.44,-x.y)),!0,"centripetal");p(new wt(L,240,.125,16,!0),u);for(let x of[-1,1]){let T=Array.from({length:21},(I,Y)=>{let U=.26+Y*.25/20;return new E(1.32+1.15*Math.cos(U),1.44,x*(.06+1.15*Math.sin(U)))});p(new wt(new Rt(T),32,.132,20,!1),o)}y(4.65,2.14,.035,1.03,o,1.39,M,.015),y(4.52,2.01,.025,.97,a,1.43,M,.01);let O=y(2.98,1.47,.025,.63,a,.94);O.position.x=-.28;let N=new _n({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Vt,polygonOffset:!0,polygonOffsetFactor:-1}),j=new Vi(v(2.9,1.4,.6)),X=j.attributes.position,te=j.attributes.uv;for(let x=0;x<X.count;x++)te.setXY(x,(X.getX(x)+1.45)/2.9,(X.getY(x)+.7)/1.4);let ne=p(j,N,-.28,1.005,0);ne.rotation.x=-Math.PI/2,ne.castShadow=!1;let me=N.clone(),le=[];for(let x of[-1,1]){let T=p(new jt(3.05,.3),me,0,1.04,x*1.329);x<0&&(T.rotation.y=Math.PI),T.castShadow=!1,le.push(T)}function Te(x){let T=x.vinyl||"none";ne.visible=T!=="none",le.forEach(Y=>Y.visible=T!=="none");let I=T+":"+(x.vinylText||"");if(N.userData.id!==I){N.map?.dispose(),me.map?.dispose(),N.map=new xt(t.vinylCanvas(T,!1,x.vinylText)),me.map=new xt(t.vinylCanvas(T,!0,x.vinylText));for(let Y of[N,me]){Y.map.colorSpace=ct,Y.map.anisotropy=16;let U=Y.map;U.image.addEventListener("vinyl-ready",()=>{U.needsUpdate=!0},{once:!0}),Y.needsUpdate=!0,Y.userData.id=I}}}let $=y(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);$.position.x=-.28;let ce=y(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);ce.position.x=-.28;for(let x of[-1,-.35,.35])for(let T of[-.75,.75])_(.011,.4,.009,h,x,1.2,T);function Ie(x,T){let I=document.createElement("canvas");I.width=I.height=256;let Y=I.getContext("2d");Y.fillStyle=x,Y.fillRect(0,0,256,256);let U=17;for(let W=0;W<18e3;W++)U=U*1664525+1013904223>>>0,Y.fillStyle="rgba(0,0,0,"+T+")",Y.fillRect(U%256,(U>>>8)%256,1,1);let ee=new xt(I);return ee.colorSpace=ct,ee.wrapS=ee.wrapT=Hn,ee}a.map=Ie("#e8e8e8",.035),a.bumpMap=Ie("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=Ie("#888888",.12),c.bumpScale=.003,u.bumpMap=Ie("#888888",.3),u.bumpScale=.001;function de(x,T,I,Y,U,ee=!1,W=n){let Q=new $t;Q.moveTo(0,.5),Q.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),Q.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),Q.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),Q.bezierCurveTo(.48,.12,.12,.28,0,.5),Q.moveTo(-.12,-.3),Q.lineTo(0,-.06),Q.lineTo(.12,-.3),Q.closePath();let he=p(new Xt(Q,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),T,I,Y,U,W);return he.scale.setScalar(x),ee&&(he.rotation.y=Math.PI),he}let Me=[],ge=[],Z=[],Ee=null;for(let x of[-1.72,1.72])for(let T of[-1,1]){let I=T*1.36,Y=T*1.57,U=new Xe;U.position.set(x,.81,I),n.add(U),U.userData.groundWheel=!0;let ee=n.children.length,W=p(new gi([new ue(.56,-.19),new ue(.61,-.245),new ue(.67,-.25),new ue(.76,-.19),new ue(.8,-.1),new ue(.8,.1),new ue(.76,.19),new ue(.67,.25),new ue(.61,.245),new ue(.56,.19)],80),c,x,.81,I);W.rotation.x=Math.PI/2;for(let se=-2;se<=2;se++)g(.798-Math.abs(se)*.012,.0035,h,x,.81,I+se*.071);for(let se=0;se<28;se++){let pe=se*Math.PI/14,ye=Array.from({length:17},(Ue,We)=>{let fe=We/16,Ae=-.205+fe*.41,Ve=.799-.044*Math.pow(Math.abs(Ae)/.205,3),st=pe+.13*Math.sin(fe*Math.PI);return new E(x+Math.sin(st)*Ve,.81+Math.cos(st)*Ve,I+Ae)});p(new wt(new Rt(ye),20,.0045,5,!1),h)}for(let se of[-1,1])for(let pe of[.625,.654,.681])g(pe,.0035,h,x,.81,I+se*.244);let Q=n.children.slice(ee);g(.548,.023,l,x,.81,Y+T*.035),g(.505,.016,l,x,.81,Y+T*.043),f(.14,.045,h,x,.81,Y+T*.045,"z"),g(.14,.012,l,x,.81,Y+T*.069);let he=de(.2,l,x,.8,Y+T*.075,T<0);ge.push(he);for(let se of t.wheelDesign()){let pe=new Rt(se.map(([ye,Ue])=>new E(x+ye,.81+Ue,Y+T*(.04+.025*(1-Math.hypot(ye,Ue)/.51)))));Me.push(p(new wt(pe,20,.007,6,!1),l))}for(let se=0;se<20;se++){let pe=se*Math.PI/10;f(.006,.009,l,x+Math.sin(pe)*.526,.81+Math.cos(pe)*.526,Y+T*.06,"z")}n.updateMatrixWorld(!0);for(let se of n.children.slice(ee))U.attach(se);U.scale.set(.88/1.24,.88/.86,1/.95),U.position.y=.715/.86;let Be={standard:Q};for(let se of["soft","medium","hard","semi","wet"]){let pe=ru(se);pe.visible=!1,U.add(pe),Be[se]=[pe]}Z.push({wheelGroup:U,x,out:Y,sign:T,tyres:Be})}let A=[];for(let x of[-1,1])A.push(_(1.35,.43,.04,o,.05,.94,x*1.3));for(let x of[-1,1]){let T=f(.275,.27,h,2.16,.945,x*.97,"z");g(.278,.035,o,2.16,.945,x*1.11)}for(let x of[-1.72,1.72])f(.07,2.8,h,x,.7,0,"z");_(3.6,.08,.8,h,0,.57,0);let w=[];function H(x,T,I){let Y=document.createElement("canvas");Y.width=x,Y.height=T,I(Y.getContext("2d"),x,T);let U=new xt(Y);return U.colorSpace=ct,U.anisotropy=8,w.push(U),U}let B=H(768,256,(x,T,I)=>{x.fillStyle="#101b18",x.fillRect(0,0,T,I),x.strokeStyle="#d9b35b",x.lineWidth=7,x.strokeRect(10,10,T-20,I-20),x.fillStyle="#ebc66c",x.textAlign="center",x.font="italic 116px Georgia",x.fillText("Two Aces",T/2,137),x.font="38px Georgia",x.fillText("\u2660 Poker21 \u2660",T/2,209)}),S=[];for(let x of[-1,1]){let T=new _n({map:B,metalness:.55,roughness:.2,clearcoat:1});S.push(T);let I=p(new jt(1.28,.4),T,.05,.94,x*1.326);T.userData.plane=I,x<0&&(I.rotation.y=Math.PI)}let P=[];for(let x of[-1,1])for(let T=0;T<3;T++){let I=new Xe;I.position.set((T-1)*.7+.05,1,x*1.365),x<0&&(I.rotation.y=Math.PI),n.add(I);let Y=p(new ht(.1,.1,.025),o,0,0,0,I),U=new Wt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ee=p(new jt(.65,.65),U,0,0,.035,I);ee.castShadow=!1,ee.receiveShadow=!1,P.push({group:I,mat:U,back:Y,n:T})}for(let x of[-1,1])for(let T of[-.54,.64])for(let I of[.78,1.1]){let Y=f(.014,.018,o,T,I,x*1.35,"z")}for(let x of[-1.7,-.35,1.48])for(let T of[-1.21,1.21]){let I=f(.128,.13,o,x,1.44,T,"x")}for(let x of[-1.7,-.35,1.48])for(let T of[-1,1])g(.125,.004,h,x+.08,1.44,T*1.21,"x"),g(.125,.004,h,x-.08,1.44,T*1.21,"x");for(let x of[-1.7,-.35,1.48])for(let T of[-.96,.96])f(.135,.08,o,x,1.49,T),f(.108,.082,h,x,1.498,T),g(.125,.015,o,x,1.54,T,"y"),g(.111,.006,o,x,1.535,T,"y");let k=[],F=[],ae=["#ab2338","#1b684b","#2455a5"].map(x=>i(x,.08,.55)),q=i("#eee9d6",.04,.6);for(let[x,T,I,Y]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let U=0;U<Y;U++){f(.104,.033,ae[I],x,1.49+U*.037,T);for(let ee=0;ee<6;ee++){let W=ee*Math.PI/3,Q=_(.024,.021,.012,q,x+Math.cos(W)*.103,1.49+U*.037,T+Math.sin(W)*.103);Q.rotation.y=Math.PI/2-W,Q.castShadow=!1,Q.receiveShadow=!1,k.push(Q)}if(U===Y-1){let ee=new Wt({transparent:!0,alphaTest:.1,roughness:.65}),W=p(new jt(.208,.208),ee,x,1.511+U*.037,T);W.rotation.x=-Math.PI/2,W.castShadow=!1,W.receiveShadow=!1,F.push({mat:ee,n:I})}}let J=new Xe;J.position.set(.89,1.96,0),J.scale.set(1/1.24,1/.86,1/.95),n.add(J);let _e=new Xe;J.add(_e);let Re=new E((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),Se=new E(0,0,1),oe=new E().crossVectors(Re,Se).normalize();_e.quaternion.setFromRotationMatrix(new Qe().makeBasis(Se,oe,Re));let be=u.clone();p(new vt(.53,.06,16,80),be,0,0,0,_e),p(new vt(.473,.014,10,64),o,0,0,-.02,_e);for(let x of[Math.PI]){let T=p(new ht(.09,.39,.045),o,Math.sin(x)*.26,Math.cos(x)*.26,0,_e);T.rotation.z=-x}for(let x of[-1,1]){let T=p(new ht(.35,.075,.06),o,x*.265,0,0,_e);p(new ht(.32,.035,.064),h,x*.265,0,.006,_e)}let Ce=p(new qe(.195,.195,.075,64),o,0,0,.035,_e);Ce.rotation.x=Math.PI/2;let ke=p(new Bn(.177,64),new Wt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,_e);ke.receiveShadow=!1,de(.38,o,0,-.025,.105,!1,_e);let Fe={classic:new Xe,sport:new Xe,formula:new Xe};for(let x of _e.children.slice())Fe.classic.add(x);Object.values(Fe).forEach(x=>_e.add(x));function Ze(x,T,I,Y){let U=new Rt(T.map(([ee,W])=>new E(ee,W,0)),!0);p(new wt(U,72,I,12,!0),Y,0,0,0,x)}Ze(Fe.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,be);for(let x of[-1,1])p(new ht(.35,.065,.045),l,x*.27,0,0,Fe.sport),p(new ht(.065,.3,.045),l,x*.12,-.22,0,Fe.sport);p(new vt(.5,.018,8,64,.22),d,0,0,.005,Fe.sport),Ze(Fe.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,be),p(new ht(.6,.23,.065),h,0,0,0,Fe.formula);for(let x of[-1,1])p(new sn(.035,12,8),d,x*.25,.055,.06,Fe.formula),p(new ht(.08,.29,.025),l,x*.37,0,-.07,Fe.formula);for(let x of["sport","formula"]){let T=p(new qe(.15,.15,.07,48),l,0,0,.035,Fe[x]);T.rotation.x=Math.PI/2,p(new Bn(.13,48),h,0,0,.078,Fe[x]),de(.25,l,0,-.018,.09,!1,Fe[x])}for(let[x,T]of Object.entries(t.steeringDesigns)){let I=new Xe;_e.add(I),Fe[x]=I;let Y=i(T.color,x==="woodHeritage"?.3:.55,.35);T.shape==="round"?p(new vt(.53,.065,16,80),Y,0,0,0,I):T.shape==="flat"?Ze(I,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Y):_t([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Y,I);for(let ee=0;ee<T.spokes;ee++){let W=ee*Math.PI*2/T.spokes,Q=p(new ht(.39,.065,.05),l,Math.cos(W)*.25,Math.sin(W)*.25,.015,I);Q.rotation.z=W}let U=p(new qe(.15,.15,.075,40),h,0,0,.05,I);U.rotation.x=Math.PI/2,de(.23,l,0,-.015,.095,!1,I),p(new ht(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,I)}let we=i("#b9ab8a",.15,.8),ze=i("#171c20",.02,.85);for(let[x,T]of Object.entries(Fe)){let I=x==="classic"?.53:x==="sport"?.51:.47;for(let U of[-1,1]){if(x!=="formula"){let ee=p(new vt(I,.072,12,30,.64),ze,0,0,.003,T);ee.rotation.z=U<0?Math.PI-.32:-.32}for(let ee=0;ee<9;ee++){let W=(U<0?Math.PI:0)-.28+ee*.07;p(new sn(.007,6,4),we,Math.cos(W)*(I-.045),Math.sin(W)*(I-.045),.063,T)}}let Y=p(new ht(.065,.1,.035),x==="classic"?o:d,0,x==="formula"?.16:.51,.045,T);for(let U=0;U<6;U++){let ee=U*Math.PI/3,W=p(new qe(.012,.012,.012,6),l,Math.cos(ee)*.13,Math.sin(ee)*.13,.099,T);W.rotation.x=Math.PI/2}}let et=new E(1.3,1.48,0),zt=new E(.89,1.96,0),Oe=zt.clone().sub(et),ut=et.clone().add(zt).multiplyScalar(.5),tt=_(.12,Oe.length(),.095,o,...ut.toArray());tt.quaternion.setFromUnitVectors(new E(0,1,0),Oe.normalize()),_(.075,tt.geometry.parameters.height-.04,.1,h,...ut.toArray()).quaternion.copy(tt.quaternion);let Et=-1.84,z=1.99,Ot=.74,Mt=new Xe;Mt.position.set(Et,z,0),n.add(Mt);let pt=n.children.length;f(Ot,.51,o,Et,z,0,"z"),f(.67,.54,h,Et,z,0,"z");for(let x of[-1,1]){let T=x*.29;g(.72,.055,h,Et,z,T),g(.75,.022,o,Et,z,T+x*.03),g(.665,.012,d,Et,z,T+x*.025);for(let I=0;I<14;I++){let Y=I*Math.PI/7,U=[],ee=[];for(let he=0;he<=16;he++){let Be=he/16,se=.22+Be*.44,pe=Y+.55*Be;for(let ye of[-.15,.15])U.push(Et+Math.sin(pe+ye)*se,z+Math.cos(pe+ye)*se,T+x*(.018+Math.sin(Be*Math.PI)*.12))}for(let he=0;he<16;he++){let Be=he*2;ee.push(Be,Be+1,Be+2,Be+1,Be+3,Be+2)}let W=new mt;W.setAttribute("position",new De(U,3)),W.setIndex(ee),W.computeVertexNormals(),m.side=Vt,p(W,m);let Q=new Rt(Array.from({length:17},(he,Be)=>{let se=Be/16,pe=.22+se*.44,ye=Y+.55*se-.15;return new E(Et+Math.sin(ye)*pe,z+Math.cos(ye)*pe,T+x*(.025+Math.sin(se*Math.PI)*.12))}));p(new wt(Q,20,.009,6,!1),d)}f(.215,.07,o,Et,z,T+x*.085,"z"),f(.18,.085,h,Et,z,T+x*.11,"z")}for(let x=0;x<12;x++){let T=x*Math.PI/6,I=_(.045,.15,.2,h,Et+Math.cos(T)*.735,z+Math.sin(T)*.735,0);I.rotation.z=T}n.updateMatrixWorld(!0);for(let x of n.children.slice(pt))Mt.attach(x);Mt.rotation.set(0,Math.PI/2,0),Mt.scale.set(.96/1.24,.96/.86,.96/.95);let It=Mt.clone(!0);n.add(It);let it=new Xe;Mt.add(it);let qt=i("#829aaa",.92,.24);for(let x of[-.24,-.08,.08,.24])p(new vt(.765,.028,10,80),qt,0,0,x,it);for(let x=0;x<8;x++){let T=x*Math.PI/4,I=p(new qe(.025,.025,.025,6),qt,Math.sin(T)*.73,Math.cos(T)*.73,.35,it);I.rotation.x=Math.PI/2}let St={classic:new Xe,dual:new Xe,titanium:new Xe},Yt=i("#a9b7c4",.92,.23),tn=i("#668bb5",.88,.25);Object.values(St).forEach(x=>n.add(x));for(let[x,T]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let I of T){let Y=x==="titanium"?tn:Yt,U=p(new qe(.105,.105,.5,32),Y,-2.42,.76,I,St[x]);U.rotation.z=Math.PI/2;let ee=p(new qe(.079,.079,.012,32),h,-2.678,.76,I,St[x]);ee.rotation.z=Math.PI/2;let W=p(new vt(.094,.012,8,32),Y,-2.69,.76,I,St[x]);W.rotation.y=Math.PI/2}for(let[x,T]of Object.entries(St)){let I=x==="classic"?[0]:[-.67,.67];for(let U of I){let ee=p(new qe(.18,.18,.52,40),Yt,-2.19,.76,U,T);ee.rotation.z=Math.PI/2;for(let W of[-2.36,-2.04]){let Q=p(new vt(.184,.016,8,40),h,W,.76,U,T);Q.rotation.y=Math.PI/2,p(new ht(.07,.19,.07),Yt,W,.94,U,T)}}let Y=x==="classic"?[0]:x==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let U of Y){let ee=p(new qe(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,U,T);ee.rotation.z=Math.PI/2;let W=p(new vt(.107,.018,10,40),x==="titanium"?tn:Yt,-2.57,.76,U,T);if(W.rotation.y=Math.PI/2,x==="titanium")for(let[Q,he]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let Be=p(new vt(.106,.008,6,40),i(he,.85,.3),Q,.76,U,T);Be.rotation.y=Math.PI/2}}}for(let x of[-1,1]){let T=new Rt([new E(-2.16,1.46,x*.65),new E(-1.94,1.66,x*.69),new E(-1.3,1.59,x*.64),new E(-.98,1.47,x*.7)]);p(new wt(T,32,.022,8,!1),o),_(.34,.06,.14,o,-1.84,1.48,x*.4)}for(let x of[-1,1]){let T=new Rt([new E(-2.45,1.1,x*.7),new E(-2.43,1.36,x*.72),new E(-2.19,1.55,x*.7),new E(-1.9,1.55,x*.68)]);p(new wt(T,40,.075,14,!1),h),p(new wt(T,40,.019,10,!1),o);for(let I of[-2.2,-1.96]){let Y=new Rt([new E(I,1.43,x*.48),new E(I,1.63,x*.6),new E(I+.24,1.57,x*.82)]);p(new wt(Y,24,.017,8,!1),o)}}let Jt=[],pn=[],Kt=[];for(let x=0;x<=48;x++){let T=-.92+x*1.84/48;for(let I of[.64,1.23])pn.push(2.57-.28*(Math.sin(T)*1.25/1.1)**2,I,Math.sin(T)*1.25)}for(let x=0;x<48;x++){let T=x*2;Kt.push(T,T+2,T+1,T+1,T+2,T+3)}let nn=new mt;nn.setAttribute("position",new De(pn,3)),nn.setIndex(Kt),nn.computeVertexNormals();let yi=i("#00453f",.72,.14);yi.clearcoat=1,yi.side=Vt,p(nn,yi);for(let x of[.635,1.225]){let T=Array.from({length:65},(I,Y)=>{let U=-1.04+Y*2.08/64;return new E(2.57-.28*(U/1.1)**2,x,U)});p(new wt(new Rt(T),80,.034,12,!1),o)}for(let x of[-1,1]){let T=x*1,I=2.57-.28*(T/1.1)**2,Y=new Rt([new E(I-.04,.635,T),new E(I+.05,.78,T),new E(I+.065,1.12,T),new E(I-.04,1.25,T)]);p(new wt(Y,32,.065,12,!1),o);for(let U of[.91,1.065]){let ee=Array.from({length:16},(W,Q)=>{let he=x*(.51+Q*.41/15);return new E(2.57-.28*(he/1.1)**2+.018,U,he)});Jt.push(p(new wt(new Rt(ee),24,.017,8,!1),d))}}let Tn=[];for(let x=0;x<2;x++){let T=new xt(t.cardCanvas(e.cards,x));T.colorSpace=ct,T.anisotropy=16;let I=new On({map:T,transparent:!0,toneMapped:!1});Tn.push(I);let Y=1.65,U=x?.34:-.34,ee=_(.47,.008,.63,i("#ddd9cf",0,.95),Y,1.474+x*.003,U);ee.rotation.y=-(x?-.08:.08);let W=p(new jt(.5,.67),I,Y,1.48+x*.003,U);W.rotation.x=-Math.PI/2,W.rotation.z=x?-.08:.08,W.castShadow=!1,W.receiveShadow=!1}let Bt=new Wt({map:new xt(t.plateCanvas(e)),roughness:.6});for(let x of[-1,1]){let T=p(new jt(.79,.463),Bt,x*2.605,1.01,0);T.rotation.y=x*Math.PI/2}let Ut={},Tt=i("#7d8c98",.82,.28),ft=i("#202a32",.45,.38),qn=i("#a7c6d5",.98,.055),At=i("#182029",.35,.48);At.bumpMap=Ie("#888888",.2),At.bumpScale=.001;function $e(x,T,I,Y,U,ee,W,Q,he){let Be=new Xt(v(x,T,Y),{depth:I,bevelEnabled:!0,bevelSize:Math.min(.012,I*.2),bevelThickness:Math.min(.012,I*.2),bevelSegments:3,curveSegments:12});return Be.translate(0,0,-I/2),p(Be,U,ee,W,Q,he)}function _t(x,T,I,Y){return p(new wt(new Rt(x.map(U=>new E(...U))),40,T,12,!1),I,0,0,0,Y)}function R(x,T,I,Y){let U=p(new qe(.014,.014,.014,6),Tt,x,T,I,Y);U.rotation.x=Math.PI/2}function K(x,T,I,Y,U,ee){let W=new $t;W.moveTo(-Y*.5,0),W.bezierCurveTo(-Y*.52,.055,-Y*.12,.07,Y*.5,.008),W.quadraticCurveTo(Y*.05,-.025,-Y*.5,0);let Q=new Xt(W,{depth:I,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});Q.translate(0,0,-I/2);let he=p(Q,U,x,T,0,ee);return he.rotation.z=-.08,he}for(let x of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Ut[x]={};for(let T of x==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let I=new Xe;n.add(I),Ut[x][T]=I;let Y=["sport","aero"].includes(T)?At:Tt;if(x==="spoiler"){let U=T==="lip"?1.43:T==="sport"?1.78:2.08,ee=T==="gt"||T==="double"?1.98:1.72,W=-2.39;for(let Q of[-.62,.62]){if($e(.25,.055,.22,.045,ft,-2.24,1.31,Q,I),T!=="lip"){let he=$e(.15,U-1.32,.065,.035,ft,-2.32,(U+1.32)/2,Q,I);he.rotation.z=-.19}for(let he of[-.065,.065]){let Be=p(new qe(.012,.012,.015,6),Tt,-2.24,1.35,Q+he,I)}}if(K(W,U,ee,T==="lip"?.22:.36,Y,I),T!=="lip")for(let Q of[-1,1]){let he=$e(.43,.19,.025,.055,Y,W,U+.055,Q*ee/2,I);he.rotation.z=-.12,R(W-.1,U+.045,Q*(ee/2+.02),I),R(W+.1,U+.045,Q*(ee/2+.02),I)}if(T==="double"){K(W+.025,U+.24,ee*.94,.27,At,I);for(let Q of[-1,1])$e(.08,.28,.025,.02,ft,W,U+.13,Q*ee*.47,I)}continue}if(x==="mirrors")for(let U of[-1,1]){let ee=T==="aero",W=ee?1.77:1.86,Q=U*(ee?1.47:1.53),he=.77;$e(.18,.08,.15,.035,ft,.64,1.46,U*1.19,I),_t([[.64,1.47,U*1.19],[.62,1.62,U*1.32],[he,W-.07,Q]],ee?.023:.029,Y,I);let Be=p(new sn(.046,16,12),ft,he,W-.065,Q,I);if(T==="round"){p(new sn(1,32,20),Tt,he,W,Q,I).scale.set(.065,.15,.15);let pe=p(new Bn(.13,48),qn,he-.056,W,Q,I);pe.rotation.y=-Math.PI/2,pe.castShadow=!1;let ye=p(new vt(.136,.009,8,48),Tt,he-.06,W,Q,I);ye.rotation.y=Math.PI/2}else{let se=ee?.31:T==="sport"?.35:.38,pe=ee?.16:.22,ye=$e(se,pe,.095,.065,T==="club"?ft:At,he,W,Q,I);ye.rotation.y=Math.PI/2;let Ue=p(new Vi(v(se-.045,pe-.035,.05)),qn,he-.061,W,Q,I);Ue.rotation.y=-Math.PI/2,Ue.castShadow=!1,Ue.receiveShadow=!1;let We=v(se-.028,pe-.018,.055).getPoints(24).map(fe=>[he-.058,W+fe.y,Q+fe.x]);We.push(We[0]),_t(We,.006,Tt,I)}}else if(x==="sideSkirts")for(let U of[-1,1]){let ee=$e(2.3,T==="aero"?.17:.12,T==="rally"?.27:.13,.05,Y,0,.59,U*1.24,I);if(T==="rally")for(let W of[-.84,-.42,0,.42,.84]){let Q=$e(.13,.018,.25,.018,ft,W,.67,U*1.24,I)}else _t([[-1.08,.54,U*1.3],[0,.53,U*1.32],[1.08,.54,U*1.3]],.009,d,I);for(let W of[-.87,.87])$e(.12,.14,.16,.025,ft,W,.65,U*1.2,I),R(W,.61,U*1.33,I);if(T==="aero")for(let W of[-.95,.95]){let Q=$e(.24,.12,.025,.025,At,W,.57,U*1.35,I);Q.rotation.z=W>0?.2:-.2}}else{let U=x==="frontBumper"?1:-1,ee=[[U*2.26,.66,-.92],[U*2.58,.65,-.7],[U*2.67,.65,0],[U*2.58,.65,.7],[U*2.26,.66,.92]];_t(ee,T==="sport"?.061:.047,Y,I);for(let W of[-.67,.67]){_t([[U*2.31,.74,W],[U*2.5,.68,W]],.032,ft,I);let Q=$e(.16,.12,.13,.035,ft,U*2.51,.67,W,I)}if(T==="aero"){let W=$e(.38,.045,1.94,.07,At,U*2.48,.5,0,I);for(let Q of[-.7,-.27,.27,.7])$e(.27,.12,.022,.025,ft,U*2.48,.55,Q,I);_t([[U*2.4,.52,-.91],[U*2.64,.52,0],[U*2.4,.52,.91]],.008,Tt,I)}if(T==="rally")for(let W of[-.72,.72])_t([[U*2.53,.65,W-.14],[U*2.56,.94,W-.14],[U*2.55,1.04,W],[U*2.56,.94,W+.14],[U*2.53,.65,W+.14]],.036,Tt,I);if(T==="sport")for(let W of[-.67,.67]){let Q=$e(.2,.13,.14,.045,ft,U*2.56,.66,W,I)}if(x==="rearBumper"&&T==="aero")for(let W of[-.7,-.35,0,.35,.7]){let Q=$e(.27,.15,.025,.025,At,-2.46,.48,W,I);Q.rotation.z=.12}}}}let re=i("#b9e4f5",.28,.17);re.emissive.set("#b9e4f5"),re.emissiveIntensity=1.8;let ve=i("#ffdda0",.2,.2);ve.emissive.set("#ffe0a8"),ve.emissiveIntensity=1.25;for(let x of["frontBumper","rearBumper"])for(let[T,I,Y]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let U=new Xe;n.add(U),Ut[x][T]=U;let ee=x==="frontBumper"?1:-1,W=T==="trackGT"?.34:.29,Q=.59,he=v(I,W,.1);for(let[fe,Ae]of[[0,.94],[-.79,.32],[.79,.32]]){let Ve=v(Ae,.115,.045,Mn);he.holes.push(new Mn(Ve.getPoints(24).map(st=>new ue(st.x+fe,st.y))))}let Be=new Xt(he,{depth:Y,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),se=Be.attributes.position;for(let fe=0;fe<se.count;fe++){let Ae=se.getX(fe),Ve=se.getY(fe),st=se.getZ(fe);se.setXYZ(fe,ee*(2.43+st-.24*(Ae/(I/2))**2),Q+Ve,Ae)}Be.computeVertexNormals(),p(Be,s,0,0,0,U);for(let[fe,Ae]of[[0,.94],[-.79,.32],[.79,.32]]){let Ve=ee*(2.43-.24*(fe/(I/2))**2);$e(.025,.14,Ae+.02,.04,h,Ve,Q,fe,U);for(let st of[-.032,.012,.045])$e(.012,.006,Ae-.035,.003,ft,Ve+ee*.022,Q+st,fe,U)}let pe=Array.from({length:41},(fe,Ae)=>{let Ve=-I/2+Ae*I/40;return[ee*(2.44+Y+.045-.24*(Ve/(I/2))**2),Q-W/2-.025,Ve]});_t(pe,T==="trackGT"?.028:.019,At,U);let ye=new mt,Ue=[],We=[];for(let[fe,Ae,Ve]of pe)Ue.push(fe,Ae,Ve,fe-ee*.17,Ae+.005,Ve);for(let fe=0;fe<40;fe++){let Ae=fe*2;We.push(Ae,Ae+1,Ae+2,Ae+1,Ae+3,Ae+2)}if(ye.setAttribute("position",new De(Ue,3)),ye.setIndex(We),ye.computeVertexNormals(),p(ye,At,0,0,0,U),x==="rearBumper")for(let fe=0;fe<(T==="trackGT"?5:3);fe++){let Ae=(fe-(T==="trackGT"?2:1))*.3,Ve=$e(.24,.075,.014,.008,At,-2.48,Q-W/2-.035,Ae,U);Ve.rotation.z=-.12}else if(T==="trackGT")for(let fe of[-.92,.92]){let Ae=$e(.18,.05,.018,.008,At,2.43,Q-W/2,fe,U);Ae.rotation.z=.08}}for(let x of["formula","formulaPro","formulaElite"]){let T=su(x==="formulaElite"?"formulaPro":x,{paint:s,carbon:At,metal:Tt,accent:o});x==="formulaElite"&&(T.scale.z=1.07,T.scale.x=1.05),n.add(T),Ut.frontBumper[x]=T}for(let x of["rearBumper","sideSkirts","spoiler"])for(let T of["formula","formulaPro"]){let I=new Xe;I.name=x+"-"+T,n.add(I),Ut[x][T]=I;let Y=T==="formulaPro";if(x==="rearBumper"){$e(.48,.16,Y?2.3:2.05,.03,At,-2.47,.45,0,I);for(let U=-3;U<=3;U++){let ee=$e(.64,.23,.025,.01,At,-2.48,.44,U*.3,I);ee.rotation.z=-.15}for(let U of[-1,1])_t([[-2.2,.54,U*1],[-2.65,.62,U*1.1]],.025,s,I)}else if(x==="sideSkirts")for(let U of[-1,1]){let ee=$e(2.35,Y?.42:.33,.34,.08,s,-.15,.83,U*1.3,I);ee.rotation.z=-.045,$e(2.65,.055,.48,.025,At,-.06,.58,U*1.3,I),$e(.07,.21,.24,.035,h,.96,.87,U*1.3,I);for(let W=0;W<(Y?3:1);W++)$e(.35,.11,.025,.01,At,.48-W*.32,.65,U*1.53,I)}else{let U=Y?2.3:2.02,ee=Y?2.36:2.16;for(let W of[-1,1])$e(.1,U-.82,.09,.025,At,-2.23,(U+.82)/2,W*.42,I),$e(.54,.49,.035,.03,s,-2.28,U-.04,W*ee/2,I);K(-2.26,U,ee,.56,At,I),K(-2.36,U-.18,ee,.33,s,I),Y&&K(-2.39,U-.31,ee,.24,At,I)}}Ut.headlights={};for(let x of["round","projector","rally","matrix"]){let T=new Xe;n.add(T),Ut.headlights[x]=T;for(let I of[-1,1]){let Y=I*.74,U=2.57-.28*(Y/1.1)**2+.07,ee=1.075;if(x==="matrix"){let W=$e(.4,.2,.075,.045,ft,U,ee,Y,T);W.rotation.y=Math.PI/2;let Q=$e(.35,.15,.01,.035,h,U+.05,ee,Y,T);Q.rotation.y=Math.PI/2;for(let he=0;he<4;he++){let Be=$e(.06,.1,.012,.017,re,U+.065,ee,Y-.128+he*.085,T);Be.rotation.y=Math.PI/2,Be.castShadow=!1}}else{let W=x==="rally"?.16:x==="round"?.14:.135,Q=p(new qe(W+.027,W+.02,.095,48),ft,U,ee,Y,T);Q.rotation.z=Math.PI/2;let he=p(new vt(W+.008,.01,10,48),Tt,U+.054,ee,Y,T);he.rotation.y=Math.PI/2;let Be=p(new sn(1,32,20),x==="round"||x==="rally"?ve:re,U+.055,ee,Y,T);if(Be.scale.set(.025,W,W),Be.castShadow=!1,x==="projector"){let se=p(new vt(W*.8,.008,8,48),re,U+.076,ee,Y,T);se.rotation.y=Math.PI/2,p(new sn(1,24,16),qn,U+.081,ee,Y,T).scale.set(.022,W*.53,W*.53)}if(x==="rally")for(let se of[-.07,0,.07]){let pe=Math.sqrt(W*W-se*se);_t([[U+.09,ee-pe,Y+se],[U+.1,ee,Y+se],[U+.09,ee+pe,Y+se]],.009,ft,T)}}}}for(let[x,T]of Object.entries(t.streetHeadlights)){let I=new Xe;n.add(I),Ut.headlights[x]=I;let Y=i(T.color,.12,.22);Y.emissive.set(T.color),Y.emissiveIntensity=T.smoke?.35:1.1;let U=i(T.smoke?"#1c3348":"#83b6d5",.45,.12);for(let ee of[-1,1]){let W=ee*.72,Q=2.57-.28*(W/1.1)**2+.07,he=1.075;if(T.shape==="sportHousing"){let pe=new $t;pe.moveTo(-.29,.12),pe.lineTo(.23,.09),pe.quadraticCurveTo(.32,.02,.26,-.13),pe.lineTo(-.25,-.14),pe.closePath();let ye=p(new Xt(pe,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),ft,Q+.02,he,W,I);ye.rotation.y=Math.PI/2;for(let Ue=0;Ue<2;Ue++){let We=W+(Ue-.5)*.24;if(p(new sn(1,24,16),U,Q+.13,he,We,I).scale.set(.022,.067,.067),T.signature==="rings"){let Ae=p(new vt(.086,.01,10,48),Y,Q+.155,he,We,I);Ae.rotation.y=Math.PI/2}if(T.signature==="doubleL"&&_t([[Q+.155,he+.075,We-.085],[Q+.155,he-.075,We-.085],[Q+.155,he-.075,We+.075]],.012,Y,I),T.signature==="pixels")for(let Ae=0;Ae<3;Ae++)p(new ht(.014,.026,.026),Y,Q+.155,he+.09,We-.055+Ae*.055,I)}T.signature==="arc"&&_t([[Q+.155,he-.09,W-.25],[Q+.155,he+.1,W-.25],[Q+.155,he+.12,W],[Q+.155,he+.07,W+.25]],.012,Y,I);continue}let Be=$e(.47,.25,.1,.04,ft,Q,he,W,I);Be.rotation.y=Math.PI/2;for(let pe of[-.18,.18]){p(new ht(.1,.07,.035),Tt,Q-.035,he-.15,W+pe,I);let ye=p(new qe(.012,.012,.018,12),o,Q+.02,he-.13,W+pe,I);ye.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(T.shape)){let pe=T.shape==="doubleU"?2:1;for(let ye=0;ye<pe;ye++){let Ue=W+(ye-(pe-1)/2)*.21;if(p(new sn(1,24,16),U,Q+.073,he,Ue,I).scale.set(.019,.067,.067),T.shape==="doubleU")_t([[Q+.1,he+.075,Ue-.08],[Q+.1,he-.04,Ue-.08],[Q+.1,he-.08,Ue-.045],[Q+.1,he-.08,Ue+.045],[Q+.1,he-.04,Ue+.08],[Q+.1,he+.075,Ue+.08]],.01,Y,I);else if(T.shape==="brow"){_t([[Q+.1,he+.055,Ue-.19],[Q+.1,he+.093,Ue-.14],[Q+.1,he+.093,Ue+.19]],.011,Y,I);let fe=p(new vt(.068,.006,8,32),Y,Q+.095,he-.015,Ue,I);fe.rotation.y=Math.PI/2}else for(let fe=0;fe<3;fe++){let Ae=fe*Math.PI*2/3-Math.PI/2;_t([[Q+.102,he+Math.sin(Ae)*.025,Ue+Math.cos(Ae)*.025],[Q+.102,he+Math.sin(Ae)*.1,Ue+Math.cos(Ae)*.1]],.011,Y,I)}}continue}if(T.shape==="bar"){for(let[pe,ye,Ue]of[[.035,.41,.025],[-.045,.33,.012]]){let We=$e(ye,Ue,.014,.006,Y,Q+.064,he+pe,W,I);We.rotation.y=Math.PI/2,We.castShadow=!1}continue}if(T.shape==="square"){let pe=$e(.37,.17,.024,.015,Y,Q+.065,he,W,I);pe.rotation.y=Math.PI/2;for(let ye=0;ye<7;ye++)p(new ht(.006,.16,.004),U,Q+.082,he,W-.15+ye*.05,I);continue}let se=T.count===3?.062:T.count===2?.087:.106;for(let pe=0;pe<T.count;pe++){let ye=W+(pe-(T.count-1)/2)*(T.count===3?.14:.205),Ue=p(new qe(se+.014,se+.02,.09,T.shape==="hex"?6:40),h,Q+.035,he,ye,I);Ue.rotation.z=Math.PI/2;let We=p(new vt(se,.009,8,T.shape==="hex"?6:48),Y,Q+.09,he,ye,I);We.rotation.y=Math.PI/2,We.castShadow=!1;let fe=p(new sn(1,24,16),T.projector?U:Y,Q+.077,he,ye,I);if(fe.scale.set(.018,se*.74,se*.74),fe.castShadow=!1,T.projector&&p(new sn(1,16,12),Y,Q+.092,he,ye,I).scale.set(.006,se*.31,se*.31),T.cross||T.guard)for(let Ae of[-1,1])_t([[Q+.11,he-se*.74,ye-Ae*se*.74],[Q+.115,he,ye],[Q+.11,he+se*.74,ye+Ae*se*.74]],.009,ft,I)}}}let ie={};for(let x of["club","sport","rally","chrome"]){let T=[];ie[x]=T;for(let{wheelGroup:I,sign:Y}of Z){let U=new Xe;I.add(U),T.push(U);let ee=x==="rally"?.91:.87,W=x==="rally"?.64:x==="sport"?.49:.57,Q=x==="sport"?1:1.23,he=[],Be=[];for(let Ue=0;Ue<=48;Ue++){let We=-Q+Ue*Q*2/48;for(let fe of[-W/2,W/2])he.push(Math.sin(We)*ee,Math.cos(We)*ee,fe)}for(let Ue=0;Ue<48;Ue++){let We=Ue*2;Be.push(We,We+1,We+2,We+1,We+3,We+2)}let se=new mt;se.setAttribute("position",new De(he,3)),se.setIndex(Be),se.computeVertexNormals();let ye=(x==="chrome"?Tt:x==="club"?s:At).clone();ye.side=Vt,p(se,ye,0,0,0,U);for(let Ue of[-1,1]){let We=Array.from({length:49},(fe,Ae)=>{let Ve=-Q+Ae*Q*2/48;return[Math.sin(Ve)*ee,Math.cos(Ve)*ee,Ue*W/2]});_t(We,.012,x==="chrome"?Tt:ft,U)}for(let Ue of[-1,1])_t([[0,0,-Y*.28],[Ue*.28,.42,-Y*.31],[Ue*.49,.68,-Y*.31]],.022,ft,U),R(Ue*.49,.68,-Y*.32,U);if(x==="rally"){let Ue=$e(.13,.25,W*.9,.025,ft,-.83,.2,0,U)}U.userData.shell=ye}}Ut.windshield={};for(let[x,T,I,Y]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let ee=function(fe,Ae){let Ve=.92*(1-.13*Ae),st=1-fe*fe;return[1.97+.23*st-T*.32*Ae,1.5+T*Ae*(.84+.16*st),fe*Ve]},U=new Xe;n.add(U),Ut.windshield[x]=U;let W=[],Q=[],he=40,Be=16;for(let fe=0;fe<=Be;fe++)for(let Ae=0;Ae<=he;Ae++)W.push(...ee(-1+Ae*2/he,fe/Be));for(let fe=0;fe<Be;fe++)for(let Ae=0;Ae<he;Ae++){let Ve=fe*(he+1)+Ae;Q.push(Ve,Ve+1,Ve+he+1,Ve+1,Ve+he+2,Ve+he+1)}let se=new mt;se.setAttribute("position",new De(W,3)),se.setIndex(Q),se.computeVertexNormals();let pe=new _n({color:I,metalness:.05,roughness:.075,transparent:!0,opacity:Y,depthWrite:!1,side:Vt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});U.userData.glass=pe,U.userData.originalTint={color:I,opacity:Y};let ye=p(se,pe,0,0,0,U);ye.castShadow=!1,ye.receiveShadow=!1,ye.renderOrder=3;let Ue=["smoke","highSmoke"].includes(x)?ft:Tt;for(let fe of[0,1])_t(Array.from({length:41},(Ae,Ve)=>ee(-1+Ve/20,fe)),fe===0?.017:.009,Ue,U);for(let fe of[-1,1]){_t(Array.from({length:17},(st,mn)=>ee(fe,mn/16)),.011,Ue,U);let Ae=ee(fe,0);$e(.19,.055,.14,.025,ft,Ae[0],Ae[1]-.025,Ae[2],U);let Ve=p(new qe(.013,.013,.018,6),Tt,Ae[0]+.04,Ae[1]+.014,Ae[2],U)}let We=new On({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let fe of[-.77,-.69]){let Ae=Array.from({length:13},(st,mn)=>{let fn=ee(fe,.18+mn*.058);return fn[0]+=.004,fn}),Ve=_t(Ae,.003,We,U);Ve.castShadow=!1,Ve.receiveShadow=!1,Ve.renderOrder=4}}let xe=new Xe;for(let x of n.children.slice())x.userData.groundWheel||xe.add(x);n.add(xe);let Le=i("#b8c7d6",.72,.27),Ne=new Xe,He=[];n.add(Ne);for(let x of[-1.72,1.72])for(let T of[-1,1]){let I=new Xe;I.position.set(x,.52,T*1.12),Ne.add(I);let Y=Array.from({length:193},(pe,ye)=>{let Ue=ye/192,We=Ue*Math.PI*14;return new E(Math.cos(We)*.071,.055+Ue*.36,Math.sin(We)*.071)}),U=p(new wt(new Rt(Y),192,.014,10,!1),Le,0,0,0,I);p(new qe(.039,.039,.23,24),ft,0,.14,0,I);let ee=p(new qe(.018,.018,.28,20),Tt,0,.34,0,I),W=new Xe;W.position.y=.47,I.add(W);for(let[pe,ye]of[[I,.04],[W,-.015]])p(new qe(.095,.095,.026,32),Tt,0,ye,0,pe),p(new qe(.068,.068,.018,24),ft,0,ye+.02,0,pe);p(new ht(.14,.075,.18),ft,0,.025,T*.035,I),p(new ht(.16,.075,.22),ft,0,0,-T*.075,W);let Q=new E(x,.56,T*1.12),he=new E(x,.81,T*1.43),Be=he.clone().sub(Q);p(new qe(.026,.026,Be.length(),16),ft,...Q.clone().add(he).multiplyScalar(.5).toArray(),Ne).quaternion.setFromUnitVectors(new E(0,1,0),Be.normalize()),He.push({coil:U,rod:ee,upper:W})}Ut.brakes={};for(let x of["stock","red","gold","ceramic"]){let T=new Xe;n.add(T),Ut.brakes[x]=T;for(let{wheelGroup:I,sign:Y}of Z){let U=Jl(x);U.position.z=Y*.165,Y<0&&(U.rotation.y=Math.PI),I.add(U),T.userData.brakeAssemblies??=[],T.userData.brakeAssemblies.push(U)}}Ut.nitrous={};let Ye=document.createElement("canvas");Ye.width=512,Ye.height=256;let Ge=Ye.getContext("2d");Ge.fillStyle="#101923",Ge.fillRect(0,0,512,256),Ge.strokeStyle="#e8e1cc",Ge.lineWidth=8,Ge.strokeRect(10,10,492,236),Ge.fillStyle="#f5f2e8",Ge.textAlign="center",Ge.font="italic bold 106px Arial",Ge.fillText("N\u2082O",256,117),Ge.font="bold 24px Arial",Ge.fillText("NITROUS OXIDE",256,159),Ge.fillStyle="#d9b36b",Ge.font="bold 18px Arial",Ge.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let x=0;x<42;x++)Ge.fillRect(165+x*4,212,x%3+1,17);let Je=new xt(Ye);Je.colorSpace=ct,Je.anisotropy=8;let nt=document.createElement("canvas");nt.width=nt.height=128;let Ke=nt.getContext("2d");Ke.fillStyle="#eee9dc",Ke.fillRect(0,0,128,128),Ke.translate(64,64),Ke.strokeStyle="#17202a";for(let x=0;x<=20;x++){let T=-Math.PI*.8+x*Math.PI*1.6/20;Ke.lineWidth=x%5?2:4,Ke.beginPath(),Ke.moveTo(Math.sin(T)*43,-Math.cos(T)*43),Ke.lineTo(Math.sin(T)*(x%5?49:53),-Math.cos(T)*(x%5?49:53)),Ke.stroke()}Ke.fillStyle="#293541",Ke.textAlign="center",Ke.font="bold 14px Arial",Ke.fillText("PSI",0,30),Ke.strokeStyle="#c92737",Ke.lineWidth=4,Ke.beginPath(),Ke.moveTo(-9,12),Ke.lineTo(26,-31),Ke.stroke(),Ke.fillStyle="#25313a",Ke.beginPath(),Ke.arc(0,0,6,0,Math.PI*2),Ke.fill();let Nt=new xt(nt);Nt.colorSpace=ct;for(let x of["blue","twin","triple"]){let T=new Xe;T.name="nitrous-"+x,n.add(T),Ut.nitrous[x]=T;let I=i(t.item("nitrous",x).color,.65,.27),Y=x==="triple"?3:x==="twin"?2:1,U=1.49,ee=-1.3,W=.37,Q=i("#b4924f",.8,.3),he=i("#a5b2bd",.85,.24),Be=i("#1b2028",.08,.85),se=i("#ab2635",.35,.4);for(let pe of[-1.52,-1.13]){$e(.095,.05,Y*W+.04,.015,h,pe,1.29,0,T);for(let ye of[-1,1]){let Ue=ye*(Y*W/2-.02);p(new qe(.024,.024,.023,6),he,pe,1.327,Ue,T)}}for(let pe=0;pe<Y;pe++){let ye=(pe-(Y-1)/2)*W,Ue=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Pt,on])=>new ue(Pt,on)),We=p(new gi(Ue,40),I,ee,U,ye,T);We.rotation.z=-Math.PI/2;for(let Pt of[-1.52,-1.13]){$e(.11,.095,.27,.025,Be,Pt,1.35,ye,T);let on=p(new vt(.152,.013,8,40),he,Pt,U,ye,T);on.rotation.y=Math.PI/2,$e(.08,.025,.055,.008,he,Pt,U+.155,ye,T),p(new qe(.013,.013,.018,6),h,Pt,U+.179,ye,T)}let fe=[],Ae=[],Ve=[];for(let Pt=0;Pt<2;Pt++)for(let on=0;on<=16;on++){let Ms=-.91+on*1.82/16;if(fe.push(ee+(Pt?.12:-.12),U+Math.cos(Ms)*.147,ye+Math.sin(Ms)*.147),Ae.push(Pt,on/16),Pt&&on){let si=17+on;Ve.push(si-18,si-17,si,si-18,si,si-1)}}let st=new mt;st.setAttribute("position",new De(fe,3)),st.setAttribute("uv",new De(Ae,2)),st.setIndex(Ve),st.computeVertexNormals();let mn=new _n({map:Je,roughness:.55,metalness:.05,side:Vt});p(st,mn,0,0,0,T);let fn=p(new qe(.046,.046,.055,24),Q,-.89,U,ye,T);fn.rotation.z=Math.PI/2,$e(.075,.07,.065,.012,Q,-.845,U,ye,T),p(new qe(.016,.016,.065,16),he,-.845,U+.045,ye,T);let xi=p(new vt(.052,.012,8,24),se,-.845,U+.092,ye,T);xi.rotation.x=Math.PI/2;for(let Pt of[0,Math.PI/3,Math.PI*2/3]){let on=$e(.106,.014,.014,.004,se,-.845,U+.092,ye,T);on.rotation.y=Pt}let Dt=new Xe;Dt.position.set(-.84,U+.065,ye+.075),Dt.rotation.x=-Math.PI*.32,T.add(Dt);let Yn=p(new qe(.057,.057,.03,32),he,0,0,0,Dt);Yn.rotation.x=Math.PI/2;let xs=p(new Bn(.047,32),new On({map:Nt}),0,0,.017,Dt),Ln=p(new qe(.024,.024,.055,6),Q,-.79,U,ye,T);Ln.rotation.z=Math.PI/2,_t([[-.76,U,ye],[-.7,U-.02,ye],[-.71,1.3,ye],[-.91,1.24,ye]],.014,Be,T);let bn=p(new qe(.021,.021,.055,12),he,-.74,U,ye,T);bn.rotation.z=Math.PI/2}$e(.07,.07,Y*W,.015,Q,-.91,1.24,0,T),_t([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,Be,T)}Ut.seat={};for(let x of["red","carbon","emerald","ivory"]){let T=$l(x);T.rotation.y=Math.PI/2,T.position.set(-.8,1.04,0),n.add(T),Ut.seat[x]=T}function Ht(x){Te(x);let T=t.glassTints[x.glassTint]||t.glassTints.original;for(let se of Object.values(Ut.windshield)){let pe=se.userData.originalTint;se.userData.glass.color.set(T.opacity===null?pe.color:T.color),se.userData.glass.opacity=T.opacity??pe.opacity}let I={standard:1,large:1.15,max:1.25}[x.wheelSize]||1,Y=(I-1)*(.715/.86),U={standard:1,wide:1.25,ultra:1.45}[x.tyreWidth]||1;for(let{wheelGroup:se,sign:pe,tyres:ye}of Z){se.scale.set(.88/1.24*I,.88/.86*I,U/.95),se.position.y=.715/.86*I,se.position.z=pe*(1.36+.25*(U-1));for(let[Ue,We]of Object.entries(ye))for(let fe of We)fe.visible=Ue===(x.tyres||"standard")}let ee=Y+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[x.suspension]||0);for(let[se,pe]of Object.entries(Ut))if(se!=="brakes")for(let ye of Object.values(pe))ye.parent===n&&(ye.userData.mountBaseY??=ye.position.y,ye.position.y=ye.userData.mountBaseY+ee);Jt.forEach(se=>se.visible=!x.headlights||x.headlights==="classic");for(let[se,pe]of Object.entries(ie))for(let ye of pe)ye.visible=x.fenders===se,se==="club"&&ye.userData.shell.color.set(t.item("paint",x.paint).color);Le.color.set(t.item("suspension",x.suspension).color),xe.position.y=ee,Ne.visible=ee>0,He.forEach(({coil:se,rod:pe,upper:ye})=>{se.scale.y=1+ee/.415,pe.scale.y=1+ee/.28,pe.position.y=.34+ee/2,ye.position.y=.47+ee});for(let[se,pe]of Object.entries(Ut))for(let[ye,Ue]of Object.entries(pe))Ue.visible=x[se]===ye;for(let[se,pe]of Object.entries(Ut.brakes))for(let ye of pe.userData.brakeAssemblies||[])ye.visible=(x.brakes||"stock")===se;Object.entries(Fe).forEach(([se,pe])=>pe.visible=se===(x.steering||"classic")),Object.entries(St).forEach(([se,pe])=>pe.visible=se===(x.exhaust||"classic")),it.visible=x.turbine==="boost";let W=["twin","twinBig"].includes(x.turbine),Q=x.turbine==="twinBig",he=Q?.9:W?.52:x.turbine==="boost"?.96:.9;Mt.scale.set(he/1.24,he/.86,he/.95),Mt.position.set(Et,z+(Q?.06:W?-.2:-.04),W?Q?-.7:-.44:0),It.visible=W,It.scale.copy(Mt.scale),It.position.set(Et,z+(Q?.06:-.2),Q?.7:.44);let Be=x.badges||[];if(A.forEach(se=>se.visible=!Be.length),S.forEach(se=>se.userData.plane.visible=!Be.length),P.forEach(({group:se,mat:pe,back:ye,n:Ue})=>{let We=Be[Ue];se.visible=!!We;let fe=We+":"+(x.prizeTotal||0);if(!We||pe.userData.badge===fe)return;let Ae=new $t,Ve=.65/512,st=(mn,fn)=>[(mn-256)*Ve,(256-fn)*Ve];if(We==="millionaire"||We==="day-hero")Ae.absarc(0,0,204*Ve,0,Math.PI*2,!1);else if(We==="rating-top10"){for(let mn=0;mn<6;mn++){let fn=mn*Math.PI/3-Math.PI/2,xi=st(256+Math.cos(fn)*215,256+Math.sin(fn)*215);mn?Ae.lineTo(...xi):Ae.moveTo(...xi)}Ae.closePath()}else Ae.moveTo(...st(80,88)),Ae.quadraticCurveTo(...st(256,0),...st(432,88)),Ae.lineTo(...st(420,296)),Ae.quadraticCurveTo(...st(390,400),...st(256,465)),Ae.quadraticCurveTo(...st(122,400),...st(92,296)),Ae.closePath();ye.geometry.dispose(),ye.geometry=new Xt(Ae,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),pe.map?.dispose(),pe.map=new xt(t.badgeCanvas(We,x)),pe.map.colorSpace=ct,pe.map.anisotropy=16,pe.emissive.set("#ffffff"),pe.emissiveMap=pe.map,pe.emissiveIntensity=.35,pe.userData.badge=fe,pe.needsUpdate=!0}),s.color.set(t.item("paint",x.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(x)),Ee!==x.wheels){for(let se of Me)se.removeFromParent(),se.geometry.dispose();Me.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:se,x:pe,out:ye,sign:Ue}of Z)for(let We of t.wheelDesign(x.wheels)){let fe=new Rt(We.map(([Ve,st])=>new E(Ve,st,Ue*(.25+.025*(1-Math.hypot(Ve,st)/.51))))),Ae=p(new wt(fe,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[x.wheels]||(["fiveSpoke","legend"].includes(x.wheels)?.023:.009),8,!1),l,0,0,0,se);Me.push(Ae)}Ee=x.wheels}o.color.set(t.item("trim",x.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(x.trim)?.48:["cobalt","anodizedRed","champagne"].includes(x.trim)?.3:.135,o.metalness=.95,u.userData.style!==x.upholstery&&(u.map?.dispose(),u.map=new xt(t.upholsteryCanvas(x.upholstery)),u.map.colorSpace=ct,u.map.wrapS=u.map.wrapT=Hn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(x.upholstery)?.95:x.upholstery==="carbonWeave"?.28:.38,u.userData.style=x.upholstery,u.needsUpdate=!0),t.chipPalette(x.chips).forEach((se,pe)=>{ae[pe].color.set(se),ae[pe].roughness=x.chips==="ceramic"?.25:.55}),k.forEach(se=>se.visible=x.chips!=="ceramic"),F.forEach(({mat:se,n:pe})=>{se.userData.style!==x.chips&&(se.map?.dispose(),se.map=new xt(t.chipCanvas(x.chips,pe)),se.map.colorSpace=ct,se.map.anisotropy=8,se.userData.style=x.chips,se.needsUpdate=!0)}),Tn.forEach((se,pe)=>{se.userData.style!==x.cards&&(se.map?.dispose(),se.map=new xt(t.cardCanvas(x.cards,pe)),se.map.colorSpace=ct,se.map.anisotropy=16,se.userData.style=x.cards,se.needsUpdate=!0)}),Me.forEach(se=>se.visible=!0),ge.forEach(se=>se.visible=!0),d.color.set(t.item("light",x.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,Bt.userData.number!==x.number+x.region&&(Bt.map?.dispose(),Bt.map=new xt(t.plateCanvas(x)),Bt.userData.number=x.number+x.region,Bt.needsUpdate=!0)}for(let x of[-1,1])_t([[-1.64,.43,x*.94],[0,.4,x*1.02],[1.66,.43,x*.94]],.027,d,xe),_t([[x*1.91,.43,-.66],[x*2.05,.43,0],[x*1.91,.43,.66]],.023,d,xe);let Ct=new Mr(d.color,.45,2,2);Ct.position.set(-1.9,2,.48),xe.add(Ct);let dt=Ht;function Lt(x){dt(x),Ct.color.copy(d.color)}return Lt(e),{car:n,update:Lt}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new zn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ct,n.toneMapping=ni,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ia,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new vn,s=new Gt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Pn("#c6d9ef","#44311e",1.25));for(let[$,ce,Ie,de,Me]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let ge=new Sn($,ce);ge.position.set(Ie,de,Me),ge.castShadow=$==="#fff0d0",ge.shadow.bias=-2e-4,ge.shadow.normalBias=.025,ge.shadow.mapSize.set(2048,2048),ge.shadow.camera.left=-5,ge.shadow.camera.right=5,ge.shadow.camera.top=5,ge.shadow.camera.bottom=-5,i.add(ge)}let a=new vn;a.background=new je("#48505b");for(let[$,ce,Ie,de,Me,ge]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let Z=new at(new ht(de,Me,ge),new On({color:"#ffffff"}));Z.position.set($,ce,Ie),a.add(Z)}let o=new Pr(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse($=>{$.geometry?.dispose(),$.material?.dispose()}),o.dispose();let l=new at(new jt(30,30),new hs({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=xp(i,e),u=new un({transparent:!0,depthWrite:!1,side:Vt,toneMapped:!1,uniforms:{color:{value:new je(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new at(new jt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let $ of[-.9,.9]){let ce=new Mr(u.uniforms.color.value,1.8,3,2);ce.position.set(0,.32,$),i.add(ce),m.push(ce)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function _($){t.night=!!$;for(let ce of i.children)ce.isHemisphereLight&&(ce.intensity=$?.26:1.25),ce.isDirectionalLight&&(ce.userData.dayIntensity??=ce.intensity,ce.intensity=ce.userData.dayIntensity*($?.13:1));i.environmentIntensity=$?.24:1.5,u.uniforms.strength.value=$?1.35:.95}_(t.night);let f=$=>{p&&_(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=$=>{h.update($),u.uniforms.color.value.set(window.PokerGarage.item("light",$.light).color),m.forEach(ce=>ce.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let v=!1,y=null,M=0,b=0,C=()=>{let $=r.clientWidth,ce=r.clientHeight;$&&ce&&(n.setSize($,ce,!1),s.aspect=$/ce,s.updateProjectionMatrix())},G=new ResizeObserver(C);G.observe(r),C();let V=new Un(1,1,{type:Li,depthBuffer:!0});V.samples=4;let D=new vn,L=new vi(-1,1,1,-1,0,1),O=new un({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:V.texture},stepSize:{value:new ue}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),N=new at(new jt(2,2),O);D.add(N);function j(){let $=n.getDrawingBufferSize(new ue);(V.width!==$.x||V.height!==$.y)&&V.setSize($.x,$.y),O.uniforms.stepSize.value.set(3/$.x,3/$.y),n.setRenderTarget(V),n.render(i,s),n.setRenderTarget(null),n.render(D,L)}let X=$=>{$.button&&$.button!==0||(t.manual=!0,y={id:$.pointerId,x:$.clientX,y:$.clientY},r.setPointerCapture($.pointerId),$.preventDefault())},te=$=>{!y||y.id!==$.pointerId||(t.yaw-=($.clientX-y.x)*.011,t.pitch=ou(t.pitch+($.clientY-y.y)*.009,-.24,1.35),y.x=$.clientX,y.y=$.clientY,$.preventDefault())},ne=$=>{y&&y.id===$.pointerId&&(y=null,r.hasPointerCapture($.pointerId)&&r.releasePointerCapture($.pointerId))},me=$=>{let ce={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};ce[$.key]&&(t.manual=!0,t.yaw+=ce[$.key][0],t.pitch=ou(t.pitch+ce[$.key][1],-.24,1.35),$.preventDefault())};r.addEventListener("keydown",me),r.addEventListener("pointerdown",X),r.addEventListener("pointermove",te),r.addEventListener("pointerup",ne),r.addEventListener("pointercancel",ne),r.addEventListener("lostpointercapture",ne);function le(){if(v)return;v=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(M),G.disconnect(),r.removeEventListener("keydown",me),r.removeEventListener("pointerdown",X),r.removeEventListener("pointermove",te),r.removeEventListener("pointerup",ne),r.removeEventListener("pointercancel",ne),r.removeEventListener("lostpointercapture",ne);let $=new Set,ce=new Set,Ie=new Set;i.traverse(de=>{de.geometry&&Ie.add(de.geometry),de.material&&ce.add(de.material)}),ce.forEach(de=>{for(let Me of Object.values(de))Me&&Me.isTexture&&$.add(Me);de.dispose()}),$.forEach(de=>de.dispose()),Ie.forEach(de=>de.dispose()),c.dispose(),V.dispose(),O.dispose(),N.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function Te($){if(v)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){le();return}let ce=b?Math.min(.05,($-b)/1e3):0;if(b=$,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=ce*.13);let Ie=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Ie,1.15+Math.sin(t.pitch)*Ie,Math.cos(t.yaw)*Math.cos(t.pitch)*Ie),s.lookAt(0,1.2,0),j(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}M=requestAnimationFrame(Te)}return t.snapshotOnly||(M=requestAnimationFrame(Te)),{update:g,setNight:_,dispose:le,state:t,snapshot(){let $=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*$,1.15+Math.sin(t.pitch)*$,Math.cos(t.yaw)*Math.cos(t.pitch)*$),s.lookAt(0,1.2,0),j();let ce=document.createElement("canvas");return ce.width=n.domElement.width,ce.height=n.domElement.height,ce.getContext("2d").drawImage(n.domElement,0,0),ce}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
