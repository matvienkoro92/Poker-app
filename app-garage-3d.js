(()=>{var Jc=0,tl=1,Kc=2;var nl=1,za=2,ai=3,Lr=0,Nn=1,Bt=2,Ui=0,Ts=1,il=2,rl=3,sl=4,$c=5,Dr=100,Qc=101,eh=102,th=103,nh=104,ih=200,rh=201,sh=202,ah=203,oh=204,lh=205,ch=206,hh=207,uh=208,dh=209,ph=210,mh=211,fh=212,gh=213,vh=214,Ga=0,ka=1,Va=2,bs=3,Ha=4,Wa=5,Xa=6,ja=7,_h=0,yh=1,xh=2,Ti=0,Mh=1,Sh=2,Th=3,oi=4,bh=5,wh=6,Eh=7,Wo="attached",Ah="detached",al=300,Ur=301,Zi=302,qa=303,Ya=304,ws=306,Kn=1e3,yr=1001,sa=1002,ri=1003,Ch=1004;var Es=1005;var si=1006,Za=1007;var Ji=1008;var li=1009,ol=1010,ll=1011,Nr=1012,Ja=1013,Ki=1014,Hn=1015,Ni=1016,Ka=1017,$a=1018,Fr=1020,cl=35902,hl=35899,Rh=1021,Ph=1022,Wn=1023,As=1026,Cs=1027,Qa=1028,eo=1029,Ih=1030,ul=1031;var dl=1033,to=33776,no=33777,io=33778,ro=33779,pl=35840,ml=35841,fl=35842,gl=35843,vl=36196,_l=37492,yl=37496,xl=37808,Ml=37809,Sl=37810,Tl=37811,bl=37812,wl=37813,El=37814,Al=37815,Cl=37816,Rl=37817,Pl=37818,Il=37819,Ll=37820,Dl=37821,Ul=36492,Nl=36494,Fl=36495,Bl=36283,Ol=36284,zl=36285,Gl=36286;var $r=2300,aa=2301,ia=2302,Xo=2400,jo=2401,qo=2402;var so=3201;var Lh=0,Dh=1,$i="",ft="srgb",Hi="srgb-linear",Qr="linear",At="srgb";var Vi=7680;var Uh=512,Nh=513,Fh=514,kl=515,Bh=516,Oh=517,zh=518,Gh=519,Yo=35044;var Vl="300 es",_i=2e3,es=2001;var yi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ra=Math.PI/180,oa=180/Math.PI;function Qi(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(hn[255&r]+hn[r>>8&255]+hn[r>>16&255]+hn[r>>24&255]+"-"+hn[255&e]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[63&t|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[255&n]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function mt(r,e,t){return Math.max(e,Math.min(t,r))}function zu(r,e){return(r%e+e)%e}function po(r,e,t){return(1-t)*r+t*e}function kr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Tn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var de=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},In=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],y=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=y);if(u!==y||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*y,v=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){let M=Math.sqrt(_),b=Math.atan2(M,g*v);f=Math.sin(f*b)/M,o=Math.sin(o*b)/M}let x=o*v;if(c=c*f+d*x,l=l*f+m*x,h=h*f+p*x,u=u*f+y*x,f===1-o){let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return mo.copy(this).projectOnVector(e),this.sub(mo)}reflect(e){return this.sub(mo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},mo=new w,gc=new In,ct=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],y=i[0],f=i[3],g=i[6],v=i[1],_=i[4],x=i[7],M=i[2],b=i[5],L=i[8];return s[0]=a*y+o*v+c*M,s[3]=a*f+o*_+c*b,s[6]=a*g+o*x+c*L,s[1]=l*y+h*v+u*M,s[4]=l*f+h*_+u*b,s[7]=l*g+h*x+u*L,s[2]=d*y+m*v+p*M,s[5]=d*f+m*_+p*b,s[8]=d*g+m*x+p*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=u*y,e[1]=(i*l-h*n)*y,e[2]=(o*n-i*a)*y,e[3]=d*y,e[4]=(h*t-i*c)*y,e[5]=(i*s-o*t)*y,e[6]=m*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(fo.makeScale(e,t)),this}rotate(e){return this.premultiply(fo.makeRotation(-e)),this}translate(e,t){return this.premultiply(fo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},fo=new ct;function Hl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ts(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function kh(){let r=ts("canvas");return r.style.display="block",r}var vc={};function xr(r){r in vc||(vc[r]=!0,console.warn(r))}function Vh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var _c=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yc=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gu(){let r={enabled:!0,workingColorSpace:Hi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===At&&(i.r=vi(i.r),i.g=vi(i.g),i.b=vi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(i.r=_r(i.r),i.g=_r(i.g),i.b=_r(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Qr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return xr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return xr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Hi]:{primaries:e,whitePoint:n,transfer:Qr,toXYZ:_c,fromXYZ:yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ft},outputColorSpaceConfig:{drawingBufferColorSpace:ft}},[ft]:{primaries:e,whitePoint:n,transfer:At,toXYZ:_c,fromXYZ:yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ft}}}),r}var Mt=Gu();function vi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function _r(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var ar,la=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ar===void 0&&(ar=ts("canvas")),ar.width=e.width,ar.height=e.height;let i=ar.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ar}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ts("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*vi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*vi(t[n]/255)):t[n]=vi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ku=0,Mr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(go(i[a].image)):s.push(go(i[a]))}else s=go(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function go(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?la.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Vu=0,vo=new w,vn=class r extends yi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=Qi(),this.name="",this.source=new Mr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==al)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Kn:e.x=e.x-Math.floor(e.x);break;case yr:e.x=e.x<0?0:1;break;case sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Kn:e.y=e.y-Math.floor(e.y);break;case yr:e.y=e.y<0?0:1;break;case sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null,vn.DEFAULT_MAPPING=al,vn.DEFAULT_ANISOTROPY=1;var Tt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],y=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,x=(m+1)/2,M=(g+1)/2,b=(h+d)/4,L=(u+y)/4,O=(p+f)/4;return _>x&&_>M?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=L/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=O/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=L/s,i=O/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-p)*(f-p)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(u-y)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ca=class extends yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new vn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:si,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Mr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends ca{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ns=class extends vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ri,this.minFilter=ri,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ha=class extends vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ri,this.minFilter=ri,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var on=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yn):Yn.fromBufferAttribute(s,a),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Is.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(e.matrixWorld),this.union(Is)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vr),Ls.subVectors(this.max,Vr),or.subVectors(e.a,Vr),lr.subVectors(e.b,Vr),cr.subVectors(e.c,Vr),bi.subVectors(lr,or),wi.subVectors(cr,lr),Oi.subVectors(or,cr);let t=[0,-bi.z,bi.y,0,-wi.z,wi.y,0,-Oi.z,Oi.y,bi.z,0,-bi.x,wi.z,0,-wi.x,Oi.z,0,-Oi.x,-bi.y,bi.x,0,-wi.y,wi.x,0,-Oi.y,Oi.x,0];return!!_o(t,or,lr,cr,Ls)&&(t=[1,0,0,0,1,0,0,0,1],!!_o(t,or,lr,cr,Ls)&&(Ds.crossVectors(bi,wi),t=[Ds.x,Ds.y,Ds.z],_o(t,or,lr,cr,Ls)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Yn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ui=[new w,new w,new w,new w,new w,new w,new w,new w],Yn=new w,Is=new on,or=new w,lr=new w,cr=new w,bi=new w,wi=new w,Oi=new w,Vr=new w,Ls=new w,Ds=new w,zi=new w;function _o(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){zi.fromArray(r,s);let o=i.x*Math.abs(zi.x)+i.y*Math.abs(zi.y)+i.z*Math.abs(zi.z),c=e.dot(zi),l=t.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Hu=new on,Hr=new w,yo=new w,Ln=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Hu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hr.subVectors(e,this.center);let t=Hr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Hr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hr.copy(e.center).add(yo)),this.expandByPoint(Hr.copy(e.center).sub(yo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},di=new w,xo=new w,Us=new w,Ei=new w,Mo=new w,Ns=new w,So=new w,Wi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,t),di.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xo.copy(e).add(t).multiplyScalar(.5),Us.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(xo);let s=.5*e.distanceTo(t),a=-this.direction.dot(Us),o=Ei.dot(this.direction),c=-Ei.dot(Us),l=Ei.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let y=1/h;u*=y,d*=y,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(xo).addScaledVector(Us,d),m}intersectSphere(e,t){di.subVectors(e.center,this.origin);let n=di.dot(this.direction),i=di.dot(di)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,t,n,i,s){Mo.subVectors(t,e),Ns.subVectors(n,e),So.crossVectors(Mo,Ns);let a,o=this.direction.dot(So);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Ei.subVectors(this.origin,e);let c=a*this.direction.dot(Ns.crossVectors(Ei,Ns));if(c<0)return null;let l=a*this.direction.dot(Mo.cross(Ei));if(l<0||c+l>o)return null;let h=-a*Ei.dot(So);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},je=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=y,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/hr.setFromMatrixColumn(e,0).length(),s=1/hr.setFromMatrixColumn(e,1).length(),a=1/hr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,y=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-y*l,t[9]=-o*c,t[2]=y-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,y=l*u;t[0]=d+y*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=y+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,y=l*u;t[0]=d-y*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=y-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,y=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+y,t[1]=c*u,t[5]=y*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,y=o*l;t[0]=c*h,t[4]=y-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-y*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,y=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+y,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wu,e,Xu)}lookAt(e,t,n){let i=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Ai.crossVectors(n,Cn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Ai.crossVectors(n,Cn)),Ai.normalize(),Fs.crossVectors(Cn,Ai),i[0]=Ai.x,i[4]=Fs.x,i[8]=Cn.x,i[1]=Ai.y,i[5]=Fs.y,i[9]=Cn.y,i[2]=Ai.z,i[6]=Fs.z,i[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],y=n[6],f=n[10],g=n[14],v=n[3],_=n[7],x=n[11],M=n[15],b=i[0],L=i[4],O=i[8],D=i[12],k=i[1],I=i[5],U=i[9],Z=i[13],V=i[2],q=i[6],se=i[10],ue=i[14],ce=i[3],we=i[7],Re=i[11],$=i[15];return s[0]=a*b+o*k+c*V+l*ce,s[4]=a*L+o*I+c*q+l*we,s[8]=a*O+o*U+c*se+l*Re,s[12]=a*D+o*Z+c*ue+l*$,s[1]=h*b+u*k+d*V+m*ce,s[5]=h*L+u*I+d*q+m*we,s[9]=h*O+u*U+d*se+m*Re,s[13]=h*D+u*Z+d*ue+m*$,s[2]=p*b+y*k+f*V+g*ce,s[6]=p*L+y*I+f*q+g*we,s[10]=p*O+y*U+f*se+g*Re,s[14]=p*D+y*Z+f*ue+g*$,s[3]=v*b+_*k+x*V+M*ce,s[7]=v*L+_*I+x*q+M*we,s[11]=v*O+_*U+x*se+M*Re,s[15]=v*D+_*Z+x*ue+M*$,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],y=e[13],f=e[14],g=e[15],v=u*f*l-y*d*l+y*c*m-o*f*m-u*c*g+o*d*g,_=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,x=h*y*l-p*u*l+p*o*m-a*y*m-h*o*g+a*u*g,M=p*u*c-h*y*c-p*o*d+a*y*d+h*o*f-a*u*f,b=t*v+n*_+i*x+s*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/b;return e[0]=v*L,e[1]=(y*d*s-u*f*s-y*i*m+n*f*m+u*i*g-n*d*g)*L,e[2]=(o*f*s-y*c*s+y*i*l-n*f*l-o*i*g+n*c*g)*L,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*L,e[4]=_*L,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*L,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*L,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*L,e[8]=x*L,e[9]=(p*u*s-h*y*s-p*n*m+t*y*m+h*n*g-t*u*g)*L,e[10]=(a*y*s-p*o*s+p*n*l-t*y*l-a*n*g+t*o*g)*L,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*L,e[12]=M*L,e[13]=(h*y*i-p*u*i+p*n*d-t*y*d-h*n*f+t*u*f)*L,e[14]=(p*o*i-a*y*i-p*n*c+t*y*c+a*n*f-t*o*f)*L,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*L,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,y=a*h,f=a*u,g=o*u,v=c*l,_=c*h,x=c*u,M=n.x,b=n.y,L=n.z;return i[0]=(1-(y+g))*M,i[1]=(m+x)*M,i[2]=(p-_)*M,i[3]=0,i[4]=(m-x)*b,i[5]=(1-(d+g))*b,i[6]=(f+v)*b,i[7]=0,i[8]=(p+_)*L,i[9]=(f-v)*L,i[10]=(1-(d+y))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=hr.set(i[0],i[1],i[2]).length(),a=hr.set(i[4],i[5],i[6]).length(),o=hr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Zn.copy(this);let c=1/s,l=1/a,h=1/o;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=l,Zn.elements[5]*=l,Zn.elements[6]*=l,Zn.elements[8]*=h,Zn.elements[9]*=h,Zn.elements[10]*=h,t.setFromRotationMatrix(Zn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,y;if(c)p=s/(a-s),y=a*s/(a-s);else if(o===_i)p=-(a+s)/(a-s),y=-2*a*s/(a-s);else{if(o!==es)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),y=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,y;if(c)p=1/(a-s),y=a/(a-s);else if(o===_i)p=-2/(a-s),y=-(a+s)/(a-s);else{if(o!==es)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),y=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},hr=new w,Zn=new je,Wu=new w(0,0,0),Xu=new w(1,1,1),Ai=new w,Fs=new w,Cn=new w,xc=new je,Mc=new In,$n=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mc.setFromEuler(this),this.setFromQuaternion(Mc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$n.DEFAULT_ORDER="XYZ";var is=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},ju=0,Sc=new w,ur=new In,pi=new je,Bs=new w,Wr=new w,qu=new w,Yu=new In,Tc=new w(1,0,0),bc=new w(0,1,0),wc=new w(0,0,1),Ec={type:"added"},Zu={type:"removed"},dr={type:"childadded",child:null},To={type:"childremoved",child:null},an=class r extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new $n,n=new In,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new je},normalMatrix:{value:new ct}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new is,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ur.setFromAxisAngle(e,t),this.quaternion.multiply(ur),this}rotateOnWorldAxis(e,t){return ur.setFromAxisAngle(e,t),this.quaternion.premultiply(ur),this}rotateX(e){return this.rotateOnAxis(Tc,e)}rotateY(e){return this.rotateOnAxis(bc,e)}rotateZ(e){return this.rotateOnAxis(wc,e)}translateOnAxis(e,t){return Sc.copy(e).applyQuaternion(this.quaternion),this.position.add(Sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tc,e)}translateY(e){return this.translateOnAxis(bc,e)}translateZ(e){return this.translateOnAxis(wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Bs.copy(e):Bs.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Wr,Bs,this.up):pi.lookAt(Bs,Wr,this.up),this.quaternion.setFromRotationMatrix(pi),i&&(pi.extractRotation(i.matrixWorld),ur.setFromRotationMatrix(pi),this.quaternion.premultiply(ur.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ec),dr.child=e,this.dispatchEvent(dr),dr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zu),To.child=e,this.dispatchEvent(To),To.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ec),dr.child=e,this.dispatchEvent(dr),dr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,e,qu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,Yu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};an.DEFAULT_UP=new w(0,1,0),an.DEFAULT_MATRIX_AUTO_UPDATE=!0,an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Jn=new w,mi=new w,bo=new w,fi=new w,pr=new w,mr=new w,Ac=new w,wo=new w,Eo=new w,Ao=new w,Co=new Tt,Ro=new Tt,Po=new Tt,gi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Jn.subVectors(e,t),i.cross(Jn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Jn.subVectors(i,t),mi.subVectors(n,t),bo.subVectors(e,t);let a=Jn.dot(Jn),o=Jn.dot(mi),c=Jn.dot(bo),l=mi.dot(mi),h=mi.dot(bo),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,fi)!==null&&fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,fi.x),c.addScaledVector(a,fi.y),c.addScaledVector(o,fi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Co.setScalar(0),Ro.setScalar(0),Po.setScalar(0),Co.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,n),Po.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Co,s.x),a.addScaledVector(Ro,s.y),a.addScaledVector(Po,s.z),a}static isFrontFacing(e,t,n,i){return Jn.subVectors(n,t),mi.subVectors(e,t),Jn.cross(mi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),.5*Jn.cross(mi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;pr.subVectors(i,n),mr.subVectors(s,n),wo.subVectors(e,n);let c=pr.dot(wo),l=mr.dot(wo);if(c<=0&&l<=0)return t.copy(n);Eo.subVectors(e,i);let h=pr.dot(Eo),u=mr.dot(Eo);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(pr,a);Ao.subVectors(e,s);let m=pr.dot(Ao),p=mr.dot(Ao);if(p>=0&&m<=p)return t.copy(s);let y=m*l-c*p;if(y<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(mr,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return Ac.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(Ac,o);let g=1/(f+y+d);return a=y*g,o=d*g,t.copy(n).addScaledVector(pr,a).addScaledVector(mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Os={h:0,s:0,l:0};function Io(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Mt.workingColorSpace){if(e=zu(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Io(a,s,e+1/3),this.g=Io(a,s,e),this.b=Io(a,s,e-1/3)}return Mt.colorSpaceToWorking(this,i),this}setStyle(e,t=ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){let n=Hh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return Mt.workingToColorSpace(un.copy(this),e),65536*Math.round(mt(255*un.r,0,255))+256*Math.round(mt(255*un.g,0,255))+Math.round(mt(255*un.b,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(un.copy(this),t);let n=un.r,i=un.g,s=un.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=ft){Mt.workingToColorSpace(un.copy(this),e);let t=un.r,n=un.g,i=un.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+t,Ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ci),e.getHSL(Os);let n=po(Ci.h,Os.h,t),i=po(Ci.s,Os.s,t),s=po(Ci.l,Os.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new qe;qe.NAMES=Hh;var Ju=0,xi=class extends yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},kn=class extends xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},tm=Ku();function Ku(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Zt=new w,zs=new de,$u=0,bn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$u++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yo,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zs.fromBufferAttribute(this,t),zs.applyMatrix3(e),this.setXY(t,zs.x,zs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array),i=Tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array),i=Tn(i,this.array),s=Tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yo&&(e.usage=this.usage),e}};var Xi=class extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var rs=class extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ie=class extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Qu=0,zn=new je,Lo=new an,fr=new w,Rn=new on,Xr=new on,rn=new w,dt=class r extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hl(e)?rs:Xi)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ct().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,n){return zn.makeTranslation(e,t,n),this.applyMatrix4(zn),this}scale(e,t,n){return zn.makeScale(e,t,n),this.applyMatrix4(zn),this}lookAt(e){return Lo.lookAt(e),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ie(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Rn.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Xr.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(Rn.min,Xr.min),Rn.expandByPoint(rn),rn.addVectors(Rn.max,Xr.max),Rn.expandByPoint(rn)):(Rn.expandByPoint(Xr.min),Rn.expandByPoint(Xr.max))}Rn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)rn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)rn.fromBufferAttribute(o,l),c&&(fr.fromBufferAttribute(e,l),rn.add(fr)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new w,c[O]=new w;let l=new w,h=new w,u=new w,d=new de,m=new de,p=new de,y=new w,f=new w;function g(O,D,k){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,k),d.fromBufferAttribute(s,O),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,k),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let I=1/(m.x*p.y-p.x*m.y);isFinite(I)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(I),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(I),o[O].add(y),o[D].add(y),o[k].add(y),c[O].add(f),c[D].add(f),c[k].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let O=0,D=v.length;O<D;++O){let k=v[O],I=k.start;for(let U=I,Z=I+k.count;U<Z;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let _=new w,x=new w,M=new w,b=new w;function L(O){M.fromBufferAttribute(i,O),b.copy(M);let D=o[O];_.copy(D),_.sub(M.multiplyScalar(M.dot(D))).normalize(),x.crossVectors(b,D);let k=x.dot(c[O])<0?-1:1;a.setXYZW(O,_.x,_.y,_.z,k)}for(let O=0,D=v.length;O<D;++O){let k=v[O],I=k.start;for(let U=I,Z=I+k.count;U<Z;U+=3)L(e.getX(U+0)),L(e.getX(U+1)),L(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),y=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let y=0,f=c.length;y<f;y++){m=o.isInterleavedBufferAttribute?c[y]*o.data.stride+o.offset:c[y]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new bn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cc=new je,Gi=new Wi,Gs=new Ln,Rc=new w,ks=new w,Vs=new w,Hs=new w,Do=new w,Ws=new w,Pc=new w,Xs=new w,Je=class extends an{constructor(e=new dt,t=new kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Ws.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Do.fromBufferAttribute(u,e),a?Ws.addScaledVector(Do,h):Ws.addScaledVector(Do.sub(t),h))}t.add(Ws)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(s),Gi.copy(e.ray).recast(e.near),Gs.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(Gs,Rc)===null||Gi.origin.distanceToSquared(Rc)>(e.far-e.near)**2))return;Cc.copy(s).invert(),Gi.copy(e.ray).applyMatrix4(Cc),n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Gi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),_=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));v<_;v+=3)i=js(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);p<y;p+=3)i=js(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),_=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));v<_;v+=3)i=js(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);p<y;p+=3)i=js(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function js(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,ks),r.getVertexPosition(c,Vs),r.getVertexPosition(l,Hs);let h=(function(u,d,m,p,y,f,g,v){let _;if(_=d.side===1?p.intersectTriangle(g,f,y,!0,v):p.intersectTriangle(y,f,g,d.side===0,v),_===null)return null;Xs.copy(v),Xs.applyMatrix4(u.matrixWorld);let x=m.ray.origin.distanceTo(Xs);return x<m.near||x>m.far?null:{distance:x,point:Xs.clone(),object:u}})(r,e,t,n,ks,Vs,Hs,Pc);if(h){let u=new w;gi.getBarycoord(Pc,ks,Vs,Hs,u),i&&(h.uv=gi.getInterpolatedAttribute(i,o,c,l,u,new de)),s&&(h.uv1=gi.getInterpolatedAttribute(s,o,c,l,u,new de)),a&&(h.normal=gi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};gi.getNormal(ks,Vs,Hs,d.normal),h.face=d,h.barycoord=u}return h}var Ke=class r extends dt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(y,f,g,v,_,x,M,b,L,O,D){let k=x/L,I=M/O,U=x/2,Z=M/2,V=b/2,q=L+1,se=O+1,ue=0,ce=0,we=new w;for(let Re=0;Re<se;Re++){let $=Re*I-Z;for(let me=0;me<q;me++){let he=me*k-U;we[y]=he*v,we[f]=$*_,we[g]=V,l.push(we.x,we.y,we.z),we[y]=0,we[f]=0,we[g]=b>0?1:-1,h.push(we.x,we.y,we.z),u.push(me/L),u.push(1-Re/O),ue+=1}}for(let Re=0;Re<O;Re++)for(let $=0;$<L;$++){let me=d+$+q*Re,he=d+$+q*(Re+1),pe=d+($+1)+q*(Re+1),fe=d+($+1)+q*Re;c.push(me,he,fe),c.push(he,pe,fe),ce+=6}o.addGroup(m,ce,D),m+=ce,d+=ue}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ie(l,3)),this.setAttribute("normal",new Ie(h,3)),this.setAttribute("uv",new Ie(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function er(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function mn(r){let e={};for(let t=0;t<r.length;t++){let n=er(r[t]);for(let i in n)e[i]=n[i]}return e}function Wl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}var Wh={clone:er,merge:mn},dn=class extends xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Sr=class extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=_i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ri=new w,Ic=new de,Lc=new de,kt=class extends Sr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*oa*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*ra*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*oa*Math.atan(Math.tan(.5*ra*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,t){return this.getViewBounds(e,Ic,Lc),t.subVectors(Lc,Ic)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*ra*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},gr=-90,ua=class extends an{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new kt(gr,1,e,t);i.layers=this.layers,this.add(i);let s=new kt(gr,1,e,t);s.layers=this.layers,this.add(s);let a=new kt(gr,1,e,t);a.layers=this.layers,this.add(a);let o=new kt(gr,1,e,t);o.layers=this.layers,this.add(o);let c=new kt(gr,1,e,t);c.layers=this.layers,this.add(c);let l=new kt(gr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===_i)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==es)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ss=class extends vn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},da=class extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ss(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ke(5,5,5),s=new dn({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new Je(i,s),o=t.minFilter;return t.minFilter===Ji&&(t.minFilter=si),new ua(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},ke=class extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}},ed={type:"move"},Tr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,n),g=this._getHandJoint(l,y);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ed)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var _n=class extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var nm=new w;var im=new w,rm=new w,sm=new w,am=new de,om=new de,lm=new je,cm=new w,hm=new w,um=new w,dm=new de,pm=new de,mm=new de;var fm=new w,gm=new w;var Dc=new w,Uc=new Tt,Nc=new Tt,td=new w,Fc=new je,qs=new w,Uo=new Ln,Bc=new je,No=new Wi,as=class extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wo,this.bindMatrix=new je,this.bindMatrixInverse=new je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qs),this.boundingBox.expandByPoint(qs)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qs),this.boundingSphere.expandByPoint(qs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Uo.copy(this.boundingSphere),Uo.applyMatrix4(i),e.ray.intersectsSphere(Uo)!==!1&&(Bc.copy(i).invert(),No.copy(e.ray).applyMatrix4(Bc),this.boundingBox!==null&&No.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,No)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Wo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ah?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Uc.fromBufferAttribute(i.attributes.skinIndex,e),Nc.fromBufferAttribute(i.attributes.skinWeight,e),Dc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Nc.getComponent(s);if(a!==0){let o=Uc.getComponent(s);Fc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(td.copy(Dc).applyMatrix4(Fc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},br=class extends an{constructor(){super(),this.isBone=!0,this.type="Bone"}},os=class extends vn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oc=new je,nd=new je,ls=class r{constructor(e=[],t=[]){this.uuid=Qi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:nd;Oc.multiplyMatrices(o,t[s]),Oc.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new os(t,e,e,Wn,Hn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new br),this.bones.push(a),this.boneInverses.push(new je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},cs=class extends bn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},vr=new je,zc=new je,Ys=[],Gc=new on,id=new je,jr=new Je,qr=new Ln,hs=class extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cs(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,id)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vr),Gc.copy(e.boundingBox).applyMatrix4(vr),this.boundingBox.union(Gc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vr),qr.copy(e.boundingSphere).applyMatrix4(vr),this.boundingSphere.union(qr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(jr.geometry=this.geometry,jr.material=this.material,jr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(n),e.ray.intersectsSphere(qr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,vr),zc.multiplyMatrices(n,vr),jr.matrixWorld=zc,jr.raycast(e,Ys);for(let a=0,o=Ys.length;a<o;a++){let c=Ys[a];c.instanceId=s,c.object=this,t.push(c)}Ys.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new cs(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new os(new Float32Array(i*this.count),i,this.count,Qa,Hn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Fo=new w,rd=new w,sd=new ct,ni=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Fo.subVectors(n,t).cross(rd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Fo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sd.getNormalMatrix(e),i=this.coplanarPoint(Fo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ki=new Ln,ad=new de(.5,.5),Zs=new w,Li=class{constructor(e=new ni,t=new ni,n=new ni,i=new ni,s=new ni,a=new ni){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],y=s[9],f=s[10],g=s[11],v=s[12],_=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-a,m-h,g-p,M-v).normalize(),i[1].setComponents(l+a,m+h,g+p,M+v).normalize(),i[2].setComponents(l+o,m+u,g+y,M+_).normalize(),i[3].setComponents(l-o,m-u,g-y,M-_).normalize(),n)i[4].setComponents(c,d,f,x).normalize(),i[5].setComponents(l-c,m-d,g-f,M-x).normalize();else if(i[4].setComponents(l-c,m-d,g-f,M-x).normalize(),t===_i)i[5].setComponents(l+c,m+d,g+f,M+x).normalize();else{if(t!==es)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=ad.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Zs.x=i.normal.x>0?e.max.x:e.min.x,Zs.y=i.normal.y>0?e.max.y:e.min.y,Zs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ei=new je,ti=new Li,pa=class r{constructor(){this.coordinateSystem=_i}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(ei.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ti.setFromProjectionMatrix(ei,i.coordinateSystem,i.reversedDepth),ti.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(ei.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ti.setFromProjectionMatrix(ei,i.coordinateSystem,i.reversedDepth),ti.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(ei.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ti.setFromProjectionMatrix(ei,i.coordinateSystem,i.reversedDepth),ti.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(ei.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ti.setFromProjectionMatrix(ei,i.coordinateSystem,i.reversedDepth),ti.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(ei.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),ti.setFromProjectionMatrix(ei,i.coordinateSystem,i.reversedDepth),ti.containsPoint(e))return!0}return!1}clone(){return new r}};var Zo=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},vm=new je,_m=new qe(1,1,1),ym=new Li,xm=new pa,Mm=new on,Sm=new Ln,Tm=new w,bm=new w,wm=new w,Em=new Zo,Am=new Je;var Cm=new w,Rm=new w,Pm=new je,Im=new Wi,Lm=new Ln,Dm=new w,Um=new w;var Nm=new w,Fm=new w;var Bm=new je,Om=new Wi,zm=new Ln,Gm=new w;var Et=class extends vn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},us=class extends vn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==As&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Mr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ds=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},wr=class r extends dt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,y=i+1,f=new w,g=new w;for(let v=0;v<=p;v++){let _=0,x=0,M=0,b=0;if(v<=n){let D=v/n,k=D*Math.PI/2;x=-h-e*Math.cos(k),M=e*Math.sin(k),b=-e*Math.cos(k),_=D*u}else if(v<=n+s){let D=(v-n)/s;x=D*t-h,M=e,b=0,_=u+D*d}else{let D=(v-n-s)/n,k=D*Math.PI/2;x=h+e*Math.sin(k),M=e*Math.cos(k),b=e*Math.sin(k),_=u+d+D*u}let L=Math.max(0,Math.min(1,_/m)),O=0;v===0?O=.5/i:v===p&&(O=-.5/i);for(let D=0;D<=i;D++){let k=D/i,I=k*Math.PI*2,U=Math.sin(I),Z=Math.cos(I);g.x=-M*Z,g.y=x,g.z=M*U,o.push(g.x,g.y,g.z),f.set(-M*Z,b,M*U),f.normalize(),c.push(f.x,f.y,f.z),l.push(k+O,L)}if(v>0){let D=(v-1)*y;for(let k=0;k<i;k++){let I=D+k,U=D+k+1,Z=v*y+k,V=v*y+k+1;a.push(I,U,Z),a.push(U,V,Z)}}}this.setIndex(a),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(c,3)),this.setAttribute("uv",new Ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Vn=class r extends dt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new de;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ie(a,3)),this.setAttribute("normal",new Ie(o,3)),this.setAttribute("uv",new Ie(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},He=class r extends dt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,y=[],f=n/2,g=0;function v(_){let x=p,M=new de,b=new w,L=0,O=_===!0?e:t,D=_===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,f*D,0),d.push(0,D,0),m.push(.5,.5),p++;let k=p;for(let I=0;I<=i;I++){let U=I/i*c+o,Z=Math.cos(U),V=Math.sin(U);b.x=O*V,b.y=f*D,b.z=O*Z,u.push(b.x,b.y,b.z),d.push(0,D,0),M.x=.5*Z+.5,M.y=.5*V*D+.5,m.push(M.x,M.y),p++}for(let I=0;I<i;I++){let U=x+I,Z=k+I;_===!0?h.push(Z,Z+1,U):h.push(Z+1,Z,U),L+=3}l.addGroup(g,L,_===!0?1:2),g+=L}(function(){let _=new w,x=new w,M=0,b=(t-e)/n;for(let L=0;L<=s;L++){let O=[],D=L/s,k=D*(t-e)+e;for(let I=0;I<=i;I++){let U=I/i,Z=U*c+o,V=Math.sin(Z),q=Math.cos(Z);x.x=k*V,x.y=-D*n+f,x.z=k*q,u.push(x.x,x.y,x.z),_.set(V,b,q).normalize(),d.push(_.x,_.y,_.z),m.push(U,1-D),O.push(p++)}y.push(O)}for(let L=0;L<i;L++)for(let O=0;O<s;O++){let D=y[O][L],k=y[O+1][L],I=y[O+1][L+1],U=y[O][L+1];(e>0||O!==0)&&(h.push(D,k,U),M+=3),(t>0||O!==s-1)&&(h.push(k,I,U),M+=3)}l.addGroup(g,M,0),g+=M})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(d,3)),this.setAttribute("uv",new Ie(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ma=class r extends He{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Di=class r extends dt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,y,f){let g=f+1,v=[];for(let _=0;_<=g;_++){v[_]=[];let x=m.clone().lerp(y,_/g),M=p.clone().lerp(y,_/g),b=g-_;for(let L=0;L<=b;L++)v[_][L]=L===0&&_===g?x:x.clone().lerp(M,L/b)}for(let _=0;_<g;_++)for(let x=0;x<2*(g-_)-1;x++){let M=Math.floor(x/2);x%2==0?(c(v[_][M+1]),c(v[_+1][M]),c(v[_][M])):(c(v[_][M+1]),c(v[_+1][M+1]),c(v[_+1][M]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let y=3*m;p.x=e[y+0],p.y=e[y+1],p.z=e[y+2]}function h(m,p,y,f){f<0&&m.x===1&&(a[p]=m.x-1),y.x===0&&y.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new w,y=new w,f=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],y),l(t[g+2],f),o(p,y,f,m)})(i),(function(m){let p=new w;for(let y=0;y<s.length;y+=3)p.x=s[y+0],p.y=s[y+1],p.z=s[y+2],p.normalize().multiplyScalar(m),s[y+0]=p.x,s[y+1]=p.y,s[y+2]=p.z})(n),(function(){let m=new w;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let y=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(y,1-f)}(function(){let p=new w,y=new w,f=new w,g=new w,v=new de,_=new de,x=new de;for(let M=0,b=0;M<s.length;M+=9,b+=6){p.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),f.set(s[M+6],s[M+7],s[M+8]),v.set(a[b+0],a[b+1]),_.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),g.copy(p).add(y).add(f).divideScalar(3);let L=u(g);h(v,b+0,p,L),h(_,b+2,y,L),h(x,b+4,f,L)}})(),(function(){for(let p=0;p<a.length;p+=6){let y=a[p+0],f=a[p+2],g=a[p+4],v=Math.max(y,f,g),_=Math.min(y,f,g);v>.9&&_<.1&&(y<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Ie(s,3)),this.setAttribute("normal",new Ie(s.slice(),3)),this.setAttribute("uv",new Ie(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},fa=class r extends Di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Js=new w,Ks=new w,Bo=new w,$s=new gi,ga=class extends dt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(ra*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:y,b:f,c:g}=$s;if(y.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),$s.getNormal(Bo),u[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let _=(v+1)%3,x=u[v],M=u[_],b=$s[h[v]],L=$s[h[_]],O=`${x}_${M}`,D=`${M}_${x}`;D in d&&d[D]?(Bo.dot(d[D].normal)<=s&&(m.push(b.x,b.y,b.z),m.push(L.x,L.y,L.z)),d[D]=null):O in d||(d[O]={index0:l[v],index1:l[_],normal:Bo.clone()})}}for(let p in d)if(d[p]){let{index0:y,index1:f}=d[p];Js.fromBufferAttribute(o,y),Ks.fromBufferAttribute(o,f),m.push(Js.x,Js.y,Js.z),m.push(Ks.x,Ks.y,Ks.z)}this.setAttribute("position",new Ie(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new de:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new je;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(mt(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(mt(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Er=class extends Dn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new de){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},va=class extends Er{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Xl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Qs=new w,Oo=new Xl,zo=new Xl,Go=new Xl,yt=class extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Qs.subVectors(i[0],i[1]).add(i[0]),o=Qs);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Qs.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Qs),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),y=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);y<1e-4&&(y=1),p<1e-4&&(p=y),f<1e-4&&(f=y),Oo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,y,f),zo.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,y,f),Go.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,y,f)}else this.curveType==="catmullrom"&&(Oo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),zo.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Go.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(Oo.calc(h),zo.calc(h),Go.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function kc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Jr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Kr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var ps=class extends Dn{constructor(e=new de,t=new de,n=new de,i=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new de){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Kr(e,i.x,s.x,a.x,o.x),Kr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},_a=class extends Dn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Kr(e,i.x,s.x,a.x,o.x),Kr(e,i.y,s.y,a.y,o.y),Kr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ms=class extends Dn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ya=class extends Dn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fs=class extends Dn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Jr(e,i.x,s.x,a.x),Jr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},gs=class extends Dn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Jr(e,i.x,s.x,a.x),Jr(e,i.y,s.y,a.y),Jr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vs=class extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(kc(o,c.x,l.x,h.x,u.x),kc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new de().fromArray(i))}return this}},xa=Object.freeze({__proto__:null,ArcCurve:va,CatmullRomCurve3:yt,CubicBezierCurve:ps,CubicBezierCurve3:_a,EllipseCurve:Er,LineCurve:ms,LineCurve3:ya,QuadraticBezierCurve:fs,QuadraticBezierCurve3:gs,SplineCurve:vs}),Ma=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new xa[i.type]().fromJSON(i))}return this}},pn=class extends Ma{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ms(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new fs(this.currentPoint.clone(),new de(e,t),new de(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new ps(this.currentPoint.clone(),new de(e,t),new de(n,i),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new vs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Er(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ht=class extends pn{constructor(e){super(e),this.uuid=Qi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new pn().fromJSON(i))}return this}};function od(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Vc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let y=0,f=u.length;y<f;y++){let g=Vc(h,u[y]*m,y<f-1?u[y+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(fd(g))}p.sort(dd);for(let y=0;y<p.length;y++)d=pd(p[y],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return _s(s,a,t,o,c,l,0),a}function Vc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Hc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Hc(a/n|0,r[a],r[a+1],s);return s&&Ar(s,s.next)&&(xs(s),s=s.next),s}function ji(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Ar(n,n.next)&&Vt(n.prev,n,n.next)!==0)n=n.next;else{if(xs(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function _s(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Jo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,y=1;do{let f,g=m;m=null;let v=null;for(p=0;g;){p++;let _=g,x=0;for(let b=0;b<y&&(x++,_=_.nextZ,_);b++);let M=y;for(;x>0||M>0&&_;)x!==0&&(M===0||!_||g.z<=_.z)?(f=g,g=g.nextZ,x--):(f=_,_=_.nextZ,M--),v?v.nextZ=f:m=f,f.prevZ=v,v=f;g=_}v.nextZ=null,y*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?cd(r,n,i,s):ld(r))e.push(c.i,r.i,l.i),xs(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?_s(r=hd(ji(r),e),e,t,n,i,s,2):a===2&&ud(r,e,t,n,i,s):_s(ji(r),e,t,n,i,s,1);break}}}function ld(r){let e=r.prev,t=r,n=r.next;if(Vt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&Zr(i,o,s,c,a,l,p.x,p.y)&&Vt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function cd(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Vt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),y=Math.max(o,c,l),f=Math.max(h,u,d),g=Jo(m,p,e,t,n),v=Jo(y,f,e,t,n),_=r.prevZ,x=r.nextZ;for(;_&&_.z>=g&&x&&x.z<=v;){if(_.x>=m&&_.x<=y&&_.y>=p&&_.y<=f&&_!==i&&_!==a&&Zr(o,h,c,u,l,d,_.x,_.y)&&Vt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=m&&x.x<=y&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&Zr(o,h,c,u,l,d,x.x,x.y)&&Vt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=g;){if(_.x>=m&&_.x<=y&&_.y>=p&&_.y<=f&&_!==i&&_!==a&&Zr(o,h,c,u,l,d,_.x,_.y)&&Vt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=v;){if(x.x>=m&&x.x<=y&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&Zr(o,h,c,u,l,d,x.x,x.y)&&Vt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function hd(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Ar(n,i)&&jh(n,t,t.next,i)&&ys(n,i)&&ys(i,n)&&(e.push(n.i,t.i,i.i),xs(t),xs(t.next),t=r=i),t=t.next}while(t!==r);return ji(t)}function ud(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&gd(a,o)){let c=qh(a,o);return a=ji(a,a.next),c=ji(c,c.next),_s(a,e,t,n,i,s,0),void _s(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function dd(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function pd(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Ar(i,a))return a;do{if(Ar(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let y=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(y<=o&&y>h&&(h=y,l=a.x<a.next.x?a:a.next,y===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Xh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let y=Math.abs(c-a.y)/(o-a.x);ys(a,i)&&(y<p||y===p&&(a.x>l.x||a.x===l.x&&md(l,a)))&&(l=a,p=y)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=qh(t,r);return ji(n,n.next),ji(t,t.next)}function md(r,e){return Vt(r.prev,r,e.prev)<0&&Vt(e.next,r,r.next)<0}function Jo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function fd(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Xh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Zr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Xh(r,e,t,n,i,s,a,o)}function gd(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&jh(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(ys(r,e)&&ys(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Vt(r.prev,r,e.prev)||Vt(r,e.prev,e))||Ar(r,e)&&Vt(r.prev,r,r.next)>0&&Vt(e.prev,e,e.next)>0)}function Vt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ar(r,e){return r.x===e.x&&r.y===e.y}function jh(r,e,t,n){let i=ta(Vt(r,e,t)),s=ta(Vt(r,e,n)),a=ta(Vt(t,n,r)),o=ta(Vt(t,n,e));return i!==s&&a!==o||!(i!==0||!ea(r,t,e))||!(s!==0||!ea(r,n,e))||!(a!==0||!ea(t,r,n))||!(o!==0||!ea(t,e,n))}function ea(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ta(r){return r>0?1:r<0?-1:0}function ys(r,e){return Vt(r.prev,r,r.next)<0?Vt(r,e,r.next)>=0&&Vt(r,r.prev,e)>=0:Vt(r,e,r.prev)<0||Vt(r,r.next,e)<0}function qh(r,e){let t=Ko(r.i,r.x,r.y),n=Ko(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Hc(r,e,t,n){let i=Ko(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function xs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Ko(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var $o=class{static triangulate(e,t,n=2){return od(e,t,n)}},ii=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Wc(e),Xc(n,e);let a=e.length;t.forEach(Wc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Xc(n,t[c]);let o=$o.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Wc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Xc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Ft=class r extends dt{constructor(e=new Ht([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:vd,_,x,M,b,L,O=!1;g&&(_=g.getSpacedPoints(h),O=!0,d=!1,x=g.computeFrenetFrames(h,!1),M=new w,b=new w,L=new w),d||(f=0,m=0,p=0,y=0);let D=o.extractPoints(l),k=D.shape,I=D.holes;if(!ii.isClockWise(k)){k=k.reverse();for(let z=0,T=I.length;z<T;z++){let P=I[z];ii.isClockWise(P)&&(I[z]=P.reverse())}}function U(z){let T=10000000000000001e-36,P=z[0];for(let G=1;G<=z.length;G++){let N=G%z.length,ae=z[N],Y=ae.x-P.x,K=ae.y-P.y,xe=Y*Y+K*K,Le=Math.max(Math.abs(ae.x),Math.abs(ae.y),Math.abs(P.x),Math.abs(P.y));xe<=T*Le*Le?(z.splice(N,1),G--):P=ae}}U(k),I.forEach(U);let Z=I.length,V=k;for(let z=0;z<Z;z++){let T=I[z];k=k.concat(T)}function q(z,T,P){return T||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(T,P)}let se=k.length;function ue(z,T,P){let G,N,ae,Y=z.x-T.x,K=z.y-T.y,xe=P.x-z.x,Le=P.y-z.y,Me=Y*Y+K*K,Fe=Y*Le-K*xe;if(Math.abs(Fe)>Number.EPSILON){let Be=Math.sqrt(Me),We=Math.sqrt(xe*xe+Le*Le),at=T.x-K/Be,_e=T.y+Y/Be,Ne=((P.x-Le/We-at)*Le-(P.y+xe/We-_e)*xe)/(Y*Le-K*xe);G=at+Y*Ne-z.x,N=_e+K*Ne-z.y;let ye=G*G+N*N;if(ye<=2)return new de(G,N);ae=Math.sqrt(ye/2)}else{let Be=!1;Y>Number.EPSILON?xe>Number.EPSILON&&(Be=!0):Y<-Number.EPSILON?xe<-Number.EPSILON&&(Be=!0):Math.sign(K)===Math.sign(Le)&&(Be=!0),Be?(G=-K,N=Y,ae=Math.sqrt(Me)):(G=Y,N=K,ae=Math.sqrt(Me/2))}return new de(G/ae,N/ae)}let ce=[];for(let z=0,T=V.length,P=T-1,G=z+1;z<T;z++,P++,G++)P===T&&(P=0),G===T&&(G=0),ce[z]=ue(V[z],V[P],V[G]);let we=[],Re,$,me=ce.concat();for(let z=0,T=Z;z<T;z++){let P=I[z];Re=[];for(let G=0,N=P.length,ae=N-1,Y=G+1;G<N;G++,ae++,Y++)ae===N&&(ae=0),Y===N&&(Y=0),Re[G]=ue(P[G],P[ae],P[Y]);we.push(Re),me=me.concat(Re)}if(f===0)$=ii.triangulateShape(V,I);else{let z=[],T=[];for(let P=0;P<f;P++){let G=P/f,N=m*Math.cos(G*Math.PI/2),ae=p*Math.sin(G*Math.PI/2)+y;for(let Y=0,K=V.length;Y<K;Y++){let xe=q(V[Y],ce[Y],ae);j(xe.x,xe.y,-N),G===0&&z.push(xe)}for(let Y=0,K=Z;Y<K;Y++){let xe=I[Y];Re=we[Y];let Le=[];for(let Me=0,Fe=xe.length;Me<Fe;Me++){let Be=q(xe[Me],Re[Me],ae);j(Be.x,Be.y,-N),G===0&&Le.push(Be)}G===0&&T.push(Le)}}$=ii.triangulateShape(z,T)}let he=$.length,pe=p+y;for(let z=0;z<se;z++){let T=d?q(k[z],me[z],pe):k[z];O?(b.copy(x.normals[0]).multiplyScalar(T.x),M.copy(x.binormals[0]).multiplyScalar(T.y),L.copy(_[0]).add(b).add(M),j(L.x,L.y,L.z)):j(T.x,T.y,0)}for(let z=1;z<=h;z++)for(let T=0;T<se;T++){let P=d?q(k[T],me[T],pe):k[T];O?(b.copy(x.normals[z]).multiplyScalar(P.x),M.copy(x.binormals[z]).multiplyScalar(P.y),L.copy(_[z]).add(b).add(M),j(L.x,L.y,L.z)):j(P.x,P.y,u/h*z)}for(let z=f-1;z>=0;z--){let T=z/f,P=m*Math.cos(T*Math.PI/2),G=p*Math.sin(T*Math.PI/2)+y;for(let N=0,ae=V.length;N<ae;N++){let Y=q(V[N],ce[N],G);j(Y.x,Y.y,u+P)}for(let N=0,ae=I.length;N<ae;N++){let Y=I[N];Re=we[N];for(let K=0,xe=Y.length;K<xe;K++){let Le=q(Y[K],Re[K],G);O?j(Le.x,Le.y+_[h-1].y,_[h-1].x+P):j(Le.x,Le.y,u+P)}}}function fe(z,T){let P=z.length;for(;--P>=0;){let G=P,N=P-1;N<0&&(N=z.length-1);for(let ae=0,Y=h+2*f;ae<Y;ae++){let K=se*ae,xe=se*(ae+1);C(T+G+K,T+N+K,T+N+xe,T+G+xe)}}}function j(z,T,P){c.push(z),c.push(T),c.push(P)}function Ee(z,T,P){E(z),E(T),E(P);let G=i.length/3,N=v.generateTopUV(n,i,G-3,G-2,G-1);W(N[0]),W(N[1]),W(N[2])}function C(z,T,P,G){E(z),E(T),E(G),E(T),E(P),E(G);let N=i.length/3,ae=v.generateSideWallUV(n,i,N-6,N-3,N-2,N-1);W(ae[0]),W(ae[1]),W(ae[3]),W(ae[1]),W(ae[2]),W(ae[3])}function E(z){i.push(c[3*z+0]),i.push(c[3*z+1]),i.push(c[3*z+2])}function W(z){s.push(z.x),s.push(z.y)}(function(){let z=i.length/3;if(d){let T=0,P=se*T;for(let G=0;G<he;G++){let N=$[G];Ee(N[2]+P,N[1]+P,N[0]+P)}T=h+2*f,P=se*T;for(let G=0;G<he;G++){let N=$[G];Ee(N[0]+P,N[1]+P,N[2]+P)}}else{for(let T=0;T<he;T++){let P=$[T];Ee(P[2],P[1],P[0])}for(let T=0;T<he;T++){let P=$[T];Ee(P[0]+se*h,P[1]+se*h,P[2]+se*h)}}n.addGroup(z,i.length/3-z,0)})(),(function(){let z=i.length/3,T=0;fe(V,T),T+=V.length;for(let P=0,G=I.length;P<G;P++){let N=I[P];fe(N,T),T+=N.length}n.addGroup(z,i.length/3-z,1)})()}this.setAttribute("position",new Ie(i,3)),this.setAttribute("uv",new Ie(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new xa[i.type]().fromJSON(i)),new r(n,e.options)}},vd={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new de(s,a),new de(o,c),new de(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],y=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new de(a,1-c),new de(l,1-u),new de(d,1-p),new de(y,1-g)]:[new de(o,1-c),new de(h,1-u),new de(m,1-p),new de(f,1-g)]}},Sa=class r extends Di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Mi=class r extends dt{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=mt(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new de,m=new w,p=new w,y=new w,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,y.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(y.x,y.y,y.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),c.push(m.x,m.y,m.z),y.copy(p)}for(let v=0;v<=t;v++){let _=n+v*h*i,x=Math.sin(_),M=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*M,a.push(u.x,u.y,u.z),d.x=v/t,d.y=b/(e.length-1),o.push(d.x,d.y);let L=c[3*b+0]*x,O=c[3*b+1],D=c[3*b+0]*M;l.push(L,O,D)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){let x=_+v*e.length,M=x,b=x+e.length,L=x+e.length+1,O=x+1;s.push(M,b,O),s.push(L,O,b)}this.setIndex(s),this.setAttribute("position",new Ie(a,3)),this.setAttribute("uv",new Ie(o,2)),this.setAttribute("normal",new Ie(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Cr=class r extends Di{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},jt=class r extends dt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],y=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let _=0;_<l;_++){let x=_*u-s;p.push(x,-v,0),y.push(0,0,1),f.push(_/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let _=v+l*g,x=v+l*(g+1),M=v+1+l*(g+1),b=v+1+l*g;m.push(_,x,b),m.push(x,M,b)}this.setIndex(m),this.setAttribute("position",new Ie(p,3)),this.setAttribute("normal",new Ie(y,3)),this.setAttribute("uv",new Ie(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Ta=class r extends dt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new w,p=new de;for(let y=0;y<=i;y++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let y=0;y<i;y++){let f=y*(n+1);for(let g=0;g<n;g++){let v=g+f,_=v,x=v+n+1,M=v+n+2,b=v+1;o.push(_,x,b),o.push(x,M,b)}}this.setIndex(o),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(l,3)),this.setAttribute("uv",new Ie(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},qi=class r extends dt{constructor(e=new Ht([new de(0,.5),new de(-.5,-.5),new de(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;ii.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let v=p[f];ii.isClockWise(v)===!0&&(p[f]=v.reverse())}let y=ii.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let v=p[f];m=m.concat(v)}for(let f=0,g=m.length;f<g;f++){let v=m[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=y.length;f<g;f++){let v=y[f],_=v[0]+u,x=v[1]+u,M=v[2]+u;n.push(_,x,M),c+=3}}this.setIndex(n),this.setAttribute("position",new Ie(i,3)),this.setAttribute("normal",new Ie(s,3)),this.setAttribute("uv",new Ie(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},qt=class r extends dt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,m=[],p=[],y=[],f=[];for(let g=0;g<=n;g++){let v=[],_=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let b=M/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),f.push(b+x,1-_),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let _=h[g][v+1],x=h[g][v],M=h[g+1][v],b=h[g+1][v+1];(g!==0||a>0)&&m.push(_,x,b),(g!==n-1||c<Math.PI)&&m.push(x,M,b)}this.setIndex(m),this.setAttribute("position",new Ie(p,3)),this.setAttribute("normal",new Ie(y,3)),this.setAttribute("uv",new Ie(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},ba=class r extends Di{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},St=class r extends dt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let y=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(y),u.y=(e+t*Math.cos(f))*Math.sin(y),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let y=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,v=(i+1)*m+p;a.push(y,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(c,3)),this.setAttribute("uv",new Ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},wa=class r extends dt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,m=new w,p=new w,y=new w,f=new w,g=new w;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;v(x,s,a,e,m),v(x+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),y.crossVectors(f,g),g.crossVectors(y,f),y.normalize(),g.normalize();for(let M=0;M<=i;++M){let b=M/i*Math.PI*2,L=-t*Math.cos(b),O=t*Math.sin(b);u.x=m.x+(L*g.x+O*y.x),u.y=m.y+(L*g.y+O*y.y),u.z=m.z+(L*g.z+O*y.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(_/n),h.push(M/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){let M=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),L=(i+1)*_+x,O=(i+1)*(_-1)+x;o.push(M,b,O),o.push(b,L,O)}function v(_,x,M,b,L){let O=Math.cos(_),D=Math.sin(_),k=M/x*_,I=Math.cos(k);L.x=b*(2+I)*.5*O,L.y=b*(2+I)*D*.5,L.z=b*Math.sin(k)*.5}this.setIndex(o),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(l,3)),this.setAttribute("uv",new Ie(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},xt=class r extends dt{constructor(e=new gs(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new de,h=new w,u=[],d=[],m=[],p=[];function y(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let _=0;_<=i;_++){let x=_/i*Math.PI*2,M=Math.sin(x),b=-Math.cos(x);c.x=b*g.x+M*v.x,c.y=b*g.y+M*v.y,c.z=b*g.z+M*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)y(f);y(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),_=(i+1)*f+(g-1),x=(i+1)*f+g,M=(i+1)*(f-1)+g;p.push(v,_,M),p.push(_,x,M)}})()})(),this.setIndex(p),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(d,3)),this.setAttribute("uv",new Ie(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new xa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Ea=class extends dt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let y=0;y<3;y++){let f=o.getX(m+y),g=o.getX(m+(y+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),jc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),jc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ie(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function jc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var km=Object.freeze({__proto__:null,BoxGeometry:Ke,CapsuleGeometry:wr,CircleGeometry:Vn,ConeGeometry:ma,CylinderGeometry:He,DodecahedronGeometry:fa,EdgesGeometry:ga,ExtrudeGeometry:Ft,IcosahedronGeometry:Sa,LatheGeometry:Mi,OctahedronGeometry:Cr,PlaneGeometry:jt,PolyhedronGeometry:Di,RingGeometry:Ta,ShapeGeometry:qi,SphereGeometry:qt,TetrahedronGeometry:ba,TorusGeometry:St,TorusKnotGeometry:wa,TubeGeometry:xt,WireframeGeometry:Ea}),Ms=class extends xi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new qe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var _t=class extends xi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yn=class extends _t{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Rr=class extends xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Aa=class extends xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function na(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function _d(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Yi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ca=class extends Yi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xo,endingEnd:Xo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case jo:s=e,o=2*t-n;break;case qo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case jo:a=e,c=2*n-t;break;case qo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),y=p*p,f=y*p,g=-d*f+2*d*y-d*p,v=(1+d)*f+(-1.5-2*d)*y+(-.5+d)*p+1,_=(-1-m)*f+(1.5+m)*y+.5*p,x=m*f-m*y;for(let M=0;M!==o;++M)s[M]=g*a[h+M]+v*a[l+M]+_*a[c+M]+x*a[u+M];return s}},Ra=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Pa=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Pn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=na(t,this.TimeBufferType),this.values=na(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:na(e.times,Array),values:na(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ca(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case $r:t=this.InterpolantFactoryMethodDiscrete;break;case aa:t=this.InterpolantFactoryMethodLinear;break;case ia:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $r;case this.InterpolantFactoryMethodLinear:return aa;case this.InterpolantFactoryMethodSmooth:return ia}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&_d(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ia,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Pn.prototype.ValueTypeName="",Pn.prototype.TimeBufferType=Float32Array,Pn.prototype.ValueBufferType=Float32Array,Pn.prototype.DefaultInterpolation=aa;var Pi=class extends Pn{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="bool",Pi.prototype.ValueBufferType=Array,Pi.prototype.DefaultInterpolation=$r,Pi.prototype.InterpolantFactoryMethodLinear=void 0,Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ia=class extends Pn{constructor(e,t,n,i){super(e,t,n,i)}};Ia.prototype.ValueTypeName="color";var La=class extends Pn{constructor(e,t,n,i){super(e,t,n,i)}};La.prototype.ValueTypeName="number";var Da=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)In.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ss=class extends Pn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Da(this.times,this.values,this.getValueSize(),e)}};Ss.prototype.ValueTypeName="quaternion",Ss.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends Pn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string",Ii.prototype.ValueBufferType=Array,Ii.prototype.DefaultInterpolation=$r,Ii.prototype.InterpolantFactoryMethodLinear=void 0,Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Ua=class extends Pn{constructor(e,t,n,i){super(e,t,n,i)}};Ua.prototype.ValueTypeName="vector";var Na=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Yh=new Na,Fa=class{constructor(e){this.manager=e!==void 0?e:Yh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Fa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pr=class extends an{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Un=class extends Pr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ko=new je,qc=new w,Yc=new w,Ba=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=li,this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Li,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;qc.setFromMatrixPosition(e.matrixWorld),t.position.copy(qc),Yc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yc),t.updateMatrixWorld(),ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ko,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Zc=new je,Yr=new w,Vo=new w,Qo=class extends Ba{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Yr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Yr),Vo.copy(n.position),Vo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Vo),n.updateMatrixWorld(),i.makeTranslation(-Yr.x,-Yr.y,-Yr.z),Zc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zc,n.coordinateSystem,n.reversedDepth)}},Ir=class extends Pr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Qo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Si=class extends Sr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},el=class extends Ba{constructor(){super(new Si(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wn=class extends Pr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new el}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Vm=new je,Hm=new je,Wm=new je;var Oa=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Xm=new w,jm=new In,qm=new w,Ym=new w,Zm=new w;var Jm=new w,Km=new In,$m=new w,Qm=new w;var jl="\\[\\]\\.:\\/",yd=new RegExp("["+jl+"]","g"),Ho="[^"+jl+"]",xd="[^"+jl.replace("\\.","")+"]",Md=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Ho)+/(WCOD+)?/.source.replace("WCOD",xd)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ho)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ho)+"$"),Sd=["material","materials","bones","map"],Nt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(yd,"")}static parseTrackName(e){let t=Md.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Sd.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Nt.Composite=class{constructor(r,e,t){let n=t||Nt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray],Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ef=new Float32Array(1);var tf=new je;var nf=new de;var rf=new w,sf=new w,af=new w,of=new w,lf=new w,cf=new w,hf=new w;var uf=new w;var df=new w,pf=new je,mf=new je;var ff=new w,gf=new qe,vf=new qe;var _f=new w,yf=new w,xf=new w;var Mf=new w,Sf=new Sr;var Tf=new on;var bf=new w;function ql(r,e,t,n){let i=(function(s){switch(s){case li:case ol:return{byteLength:1,components:1};case Nr:case ll:case Ni:return{byteLength:2,components:1};case Ka:case $a:return{byteLength:2,components:4};case Ki:case Ja:case Hn:return{byteLength:4,components:1};case cl:case hl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Qa:case eo:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Wn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function _u(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function bd(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var pt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ue={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},ci={basic:{uniforms:mn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:mn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new qe(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:mn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:mn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:mn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new qe(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:mn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:mn([Ue.points,Ue.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:mn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:mn([Ue.common,Ue.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:mn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:mn([Ue.sprite,Ue.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:mn([Ue.common,Ue.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:mn([Ue.lights,Ue.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};ci.physical={uniforms:mn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var ao={r:0,b:0,g:0},tr=new $n,wd=new je;function Ed(r,e,t,n,i,s,a){let o=new qe(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function y(f,g){f.getRGB(ao,Wl(r)),n.buffers.color.setClear(ao.r,ao.g,ao.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,y(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,y(o,h)},render:function(f){let g=!1,v=p(f);v===null?y(o,h):v&&v.isColor&&(y(v,1),g=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=p(g);v&&(v.isCubeTexture||v.mapping===ws)?(l===void 0&&(l=new Je(new Ke(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:er(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,x,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),tr.copy(g.backgroundRotation),tr.x*=-1,tr.y*=-1,tr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(wd.makeRotationFromEuler(tr)),l.material.toneMapped=Mt.getTransfer(v.colorSpace)!==At,u===v&&d===v.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Je(new jt(2,2),new dn({name:"BackgroundMaterial",uniforms:er(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:Lr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(v.colorSpace)!==At,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Ad(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],_=[],x=[];for(let M=0;M<t;M++)v[M]=0,_[M]=0,x[M]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:_,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,_=g.length;v<_;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let _=s.newAttributes,x=s.enabledAttributes,M=s.attributeDivisors;_[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),M[g]!==v&&(r.vertexAttribDivisor(g,v),M[g]=v)}function m(){let g=s.newAttributes,v=s.enabledAttributes;for(let _=0,x=v.length;_<x;_++)v[_]!==g[_]&&(r.disableVertexAttribArray(_),v[_]=0)}function p(g,v,_,x,M,b,L){L===!0?r.vertexAttribIPointer(g,v,_,M,b):r.vertexAttribPointer(g,v,_,x,M,b)}function y(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,_,x,M){let b=!1,L=(function(O,D,k){let I=k.wireframe===!0,U=n[O.id];U===void 0&&(U={},n[O.id]=U);let Z=U[D.id];Z===void 0&&(Z={},U[D.id]=Z);let V=Z[I];return V===void 0&&(V=l(r.createVertexArray()),Z[I]=V),V})(x,_,v);s!==L&&(s=L,o(s.object)),b=(function(O,D,k,I){let U=s.attributes,Z=D.attributes,V=0,q=k.getAttributes();for(let se in q)if(q[se].location>=0){let ue=U[se],ce=Z[se];if(ce===void 0&&(se==="instanceMatrix"&&O.instanceMatrix&&(ce=O.instanceMatrix),se==="instanceColor"&&O.instanceColor&&(ce=O.instanceColor)),ue===void 0||ue.attribute!==ce||ce&&ue.data!==ce.data)return!0;V++}return s.attributesNum!==V||s.index!==I})(g,x,_,M),b&&(function(O,D,k,I){let U={},Z=D.attributes,V=0,q=k.getAttributes();for(let se in q)if(q[se].location>=0){let ue=Z[se];ue===void 0&&(se==="instanceMatrix"&&O.instanceMatrix&&(ue=O.instanceMatrix),se==="instanceColor"&&O.instanceColor&&(ue=O.instanceColor));let ce={};ce.attribute=ue,ue&&ue.data&&(ce.data=ue.data),U[se]=ce,V++}s.attributes=U,s.attributesNum=V,s.index=I})(g,x,_,M),M!==null&&e.update(M,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(O,D,k,I){h();let U=I.attributes,Z=k.getAttributes(),V=D.defaultAttributeValues;for(let q in Z){let se=Z[q];if(se.location>=0){let ue=U[q];if(ue===void 0&&(q==="instanceMatrix"&&O.instanceMatrix&&(ue=O.instanceMatrix),q==="instanceColor"&&O.instanceColor&&(ue=O.instanceColor)),ue!==void 0){let ce=ue.normalized,we=ue.itemSize,Re=e.get(ue);if(Re===void 0)continue;let $=Re.buffer,me=Re.type,he=Re.bytesPerElement,pe=me===r.INT||me===r.UNSIGNED_INT||ue.gpuType===Ja;if(ue.isInterleavedBufferAttribute){let fe=ue.data,j=fe.stride,Ee=ue.offset;if(fe.isInstancedInterleavedBuffer){for(let C=0;C<se.locationSize;C++)d(se.location+C,fe.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let C=0;C<se.locationSize;C++)u(se.location+C);r.bindBuffer(r.ARRAY_BUFFER,$);for(let C=0;C<se.locationSize;C++)p(se.location+C,we/se.locationSize,me,ce,j*he,(Ee+we/se.locationSize*C)*he,pe)}else{if(ue.isInstancedBufferAttribute){for(let fe=0;fe<se.locationSize;fe++)d(se.location+fe,ue.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let fe=0;fe<se.locationSize;fe++)u(se.location+fe);r.bindBuffer(r.ARRAY_BUFFER,$);for(let fe=0;fe<se.locationSize;fe++)p(se.location+fe,we/se.locationSize,me,ce,we*he,we/se.locationSize*fe*he,pe)}}else if(V!==void 0){let ce=V[q];if(ce!==void 0)switch(ce.length){case 2:r.vertexAttrib2fv(se.location,ce);break;case 3:r.vertexAttrib3fv(se.location,ce);break;case 4:r.vertexAttrib4fv(se.location,ce);break;default:r.vertexAttrib1fv(se.location,ce)}}}}m()})(g,v,_,x),M!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(M).buffer))},reset:y,resetDefaultState:f,dispose:function(){y();for(let g in n){let v=n[g];for(let _ in v){let x=v[_];for(let M in x)c(x[M].object),delete x[M];delete v[_]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let _ in v){let x=v[_];for(let M in x)c(x[M].object),delete x[M];delete v[_]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let _=n[v];if(_[g.id]===void 0)continue;let x=_[g.id];for(let M in x)c(x[M].object),delete x[M];delete _[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Cd(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Rd(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Wn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==li&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Hn&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Pd(r){let e=this,t=null,n=0,i=!1,s=!1,a=new ni,o=new ct,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,y=null;if(p!==0){if(y=c.value,m!==!0||y===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(y===null||y.length<f)&&(y=new Float32Array(f));for(let v=0,_=d;v!==p;++v,_+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(y,_),y[_+3]=a.constant}c.value=y,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,y}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,y=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!y)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,_=f.clippingState||null;c.value=_,_=l(m,u,v,d);for(let x=0;x!==v;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function Id(r){let e=new WeakMap;function t(i,s){return s===qa?i.mapping=Ur:s===Ya&&(i.mapping=Zi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===qa||s===Ya){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new da(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Zh=[.125,.215,.35,.446,.526,.582],Rs=20,Yl=new Si,Jh=new qe,Zl=null,Jl=0,Kl=0,$l=!1,ir=(1+Math.sqrt(5))/2,Br=1/ir,Kh=[new w(-ir,Br,0),new w(ir,Br,0),new w(-Br,0,ir),new w(Br,0,ir),new w(0,ir,-Br),new w(0,ir,Br),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Ld=new w,zr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Ld}=s;Zl=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),$l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zl,Jl,Kl),this._renderer.xr.enabled=$l,e.scissorTest=!1,oo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ur||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zl=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),$l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:si,minFilter:si,generateMipmaps:!1,type:Ni,format:Wn,colorSpace:Hi,depthBuffer:!1},i=$h(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$h(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Zh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=Zh[d-a+4-1]:d===0&&(p=0),l.push(p);let y=1/(m-2),f=-y,g=1+y,v=[f,f,g,f,g,g,f,f,g,g,f,g],_=6,x=6,M=3,b=2,L=1,O=new Float32Array(M*x*_),D=new Float32Array(b*x*_),k=new Float32Array(L*x*_);for(let U=0;U<_;U++){let Z=U%3*2/3-1,V=U>2?0:-1,q=[Z,V,0,Z+2/3,V,0,Z+2/3,V+1,0,Z,V,0,Z+2/3,V+1,0,Z,V+1,0];O.set(q,M*x*U),D.set(v,b*x*U);let se=[U,U,U,U,U,U];k.set(se,L*x*U)}let I=new dt;I.setAttribute("position",new bn(O,M)),I.setAttribute("uv",new bn(D,b)),I.setAttribute("faceIndex",new bn(k,L)),o.push(I),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(Rs),h=new w(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new Je(this._lodPlanes[0],e);this._renderer.compile(t,Yl)}_sceneToCubeUV(e,t,n,i,s){let a=new kt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Jh),l.toneMapping=Ti,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new kn({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),m=new Je(new Ke,d),p=!1,y=e.background;y?y.isColor&&(d.color.copy(y),e.background=null,p=!0):(d.color.copy(Jh),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;oo(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ur||e.mapping===Zi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=eu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Je(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;oo(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Yl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Kh[(i-s-1)%Kh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new Je(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,y=isFinite(s)?1+Math.floor(3*p):Rs;y>Rs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`);let f=[],g=0;for(let x=0;x<Rs;++x){let M=x/p,b=Math.exp(-M*M/2);f.push(b),x===0?g+=b:x<y&&(g+=2*b)}for(let x=0;x<f.length;x++)f[x]=f[x]/g;u.envMap.value=e.texture,u.samples.value=y,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let _=this._sizeLods[i];oo(t,3*_*(i>v-4?i-v+4:0),4*(this._cubeSize-_),3*_,2*_),c.setRenderTarget(t),c.render(h,Yl)}};function $h(r,e,t){let n=new Gn(r,e,t);return n.texture.mapping=ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function oo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Qh(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function eu(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function lc(){return`

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
	`}function Dd(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===qa||s===Ya,o=s===Ur||s===Zi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new zr(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new zr(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Ud(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&xr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Nd(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let y=h.array;d=h.version;for(let f=0,g=y.length;f<g;f+=3){let v=y[f+0],_=y[f+1],x=y[f+2];l.push(v,_,_,x,x,v)}}else{if(u===void 0)return;{let y=u.array;d=u.version;for(let f=0,g=y.length/3-1;f<g;f+=3){let v=f+0,_=f+1,x=f+2;l.push(v,_,_,x,x,v)}}}let m=new(Hl(l)?rs:Xi)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Fd(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function Bd(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Od(r,e,t){let n=new WeakMap,i=new Tt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let O=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",O)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,y=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),p===!0&&(v=3);let _=a.attributes.position.count*v,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let M=new Float32Array(_*x*4*h),b=new ns(M,_,x,h);b.type=Hn,b.needsUpdate=!0;let L=4*v;for(let D=0;D<h;D++){let k=y[D],I=f[D],U=g[D],Z=_*x*4*D;for(let V=0;V<k.count;V++){let q=V*L;d===!0&&(i.fromBufferAttribute(k,V),M[Z+q+0]=i.x,M[Z+q+1]=i.y,M[Z+q+2]=i.z,M[Z+q+3]=0),m===!0&&(i.fromBufferAttribute(I,V),M[Z+q+4]=i.x,M[Z+q+5]=i.y,M[Z+q+6]=i.z,M[Z+q+7]=0),p===!0&&(i.fromBufferAttribute(U,V),M[Z+q+8]=i.x,M[Z+q+9]=i.y,M[Z+q+10]=i.z,M[Z+q+11]=U.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new de(_,x)},n.set(a,u),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function zd(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var yu=new vn,tu=new us(1,1),xu=new ns,Mu=new ha,Su=new ss,nu=[],iu=[],ru=new Float32Array(16),su=new Float32Array(9),au=new Float32Array(4);function Gr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=nu[i];if(s===void 0&&(s=new Float32Array(i),nu[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Jt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Kt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function co(r,e){let t=iu[e];t===void 0&&(t=new Int32Array(e),iu[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Gd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function kd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;r.uniform2fv(this.addr,e),Kt(t,e)}}function Vd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;r.uniform3fv(this.addr,e),Kt(t,e)}}function Hd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;r.uniform4fv(this.addr,e),Kt(t,e)}}function Wd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,n))return;au.set(n),r.uniformMatrix2fv(this.addr,!1,au),Kt(t,n)}}function Xd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,n))return;su.set(n),r.uniformMatrix3fv(this.addr,!1,su),Kt(t,n)}}function jd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Jt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Jt(t,n))return;ru.set(n),r.uniformMatrix4fv(this.addr,!1,ru),Kt(t,n)}}function qd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Yd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;r.uniform2iv(this.addr,e),Kt(t,e)}}function Zd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;r.uniform3iv(this.addr,e),Kt(t,e)}}function Jd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;r.uniform4iv(this.addr,e),Kt(t,e)}}function Kd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function $d(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;r.uniform2uiv(this.addr,e),Kt(t,e)}}function Qd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;r.uniform3uiv(this.addr,e),Kt(t,e)}}function ep(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;r.uniform4uiv(this.addr,e),Kt(t,e)}}function tp(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(tu.compareFunction=kl,s=tu):s=yu,t.setTexture2D(e||s,i)}function np(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Mu,i)}function ip(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Su,i)}function rp(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||xu,i)}function sp(r,e){r.uniform1fv(this.addr,e)}function ap(r,e){let t=Gr(e,this.size,2);r.uniform2fv(this.addr,t)}function op(r,e){let t=Gr(e,this.size,3);r.uniform3fv(this.addr,t)}function lp(r,e){let t=Gr(e,this.size,4);r.uniform4fv(this.addr,t)}function cp(r,e){let t=Gr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function hp(r,e){let t=Gr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function up(r,e){let t=Gr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function dp(r,e){r.uniform1iv(this.addr,e)}function pp(r,e){r.uniform2iv(this.addr,e)}function mp(r,e){r.uniform3iv(this.addr,e)}function fp(r,e){r.uniform4iv(this.addr,e)}function gp(r,e){r.uniform1uiv(this.addr,e)}function vp(r,e){r.uniform2uiv(this.addr,e)}function _p(r,e){r.uniform3uiv(this.addr,e)}function yp(r,e){r.uniform4uiv(this.addr,e)}function xp(r,e,t){let n=this.cache,i=e.length,s=co(t,i);Jt(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||yu,s[a])}function Mp(r,e,t){let n=this.cache,i=e.length,s=co(t,i);Jt(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Mu,s[a])}function Sp(r,e,t){let n=this.cache,i=e.length,s=co(t,i);Jt(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Su,s[a])}function Tp(r,e,t){let n=this.cache,i=e.length,s=co(t,i);Jt(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||xu,s[a])}var ec=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Gd;case 35664:return kd;case 35665:return Vd;case 35666:return Hd;case 35674:return Wd;case 35675:return Xd;case 35676:return jd;case 5124:case 35670:return qd;case 35667:case 35671:return Yd;case 35668:case 35672:return Zd;case 35669:case 35673:return Jd;case 5125:return Kd;case 36294:return $d;case 36295:return Qd;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return tp;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return ip;case 36289:case 36303:case 36311:case 36292:return rp}})(t.type)}},tc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return sp;case 35664:return ap;case 35665:return op;case 35666:return lp;case 35674:return cp;case 35675:return hp;case 35676:return up;case 5124:case 35670:return dp;case 35667:case 35671:return pp;case 35668:case 35672:return mp;case 35669:case 35673:return fp;case 5125:return gp;case 36294:return vp;case 36295:return _p;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return xp;case 35679:case 36299:case 36307:return Mp;case 35680:case 36300:case 36308:case 36293:return Sp;case 36289:case 36303:case 36311:case 36292:return Tp}})(t.type)}},nc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Ql=/(\w+)(\])?(\[|\.)?/g;function ou(r,e){r.seq.push(e),r.map[e.id]=e}function bp(r,e,t){let n=r.name,i=n.length;for(Ql.lastIndex=0;;){let s=Ql.exec(n),a=Ql.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){ou(t,l===void 0?new ec(o,r,e):new tc(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new nc(o),ou(t,h)),t=h}}}var Or=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);bp(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function lu(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var wp=0,cu=new ct;function hu(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Ep(r,e){let t=(function(n){Mt._getMatrix(cu,Mt.workingColorSpace,n);let i=`mat3( ${cu.elements.map(s=>s.toFixed(4))} )`;switch(Mt.getTransfer(n)){case Qr:return[i,"LinearTransferOETF"];case At:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ap(r,e){let t;switch(e){case Mh:t="Linear";break;case Sh:t="Reinhard";break;case Th:t="Cineon";break;case oi:t="ACESFilmic";break;case wh:t="AgX";break;case Eh:t="Neutral";break;case bh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lo=new w;function Cp(){return Mt.getLuminanceCoefficients(lo),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${lo.x.toFixed(4)}, ${lo.y.toFixed(4)}, ${lo.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ps(r){return r!==""}function uu(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function du(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Rp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(r){return r.replace(Rp,Ip)}var Pp=new Map;function Ip(r,e){let t=pt[e];if(t===void 0){let n=Pp.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ic(t)}var Lp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pu(r){return r.replace(Lp,Dp)}function Dp(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function mu(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Up(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(I){let U="SHADOWMAP_TYPE_BASIC";return I.shadowMapType===nl?U="SHADOWMAP_TYPE_PCF":I.shadowMapType===za?U="SHADOWMAP_TYPE_PCF_SOFT":I.shadowMapType===ai&&(U="SHADOWMAP_TYPE_VSM"),U})(t),l=(function(I){let U="ENVMAP_TYPE_CUBE";if(I.envMap)switch(I.envMapMode){case Ur:case Zi:U="ENVMAP_TYPE_CUBE";break;case ws:U="ENVMAP_TYPE_CUBE_UV"}return U})(t),h=(function(I){let U="ENVMAP_MODE_REFLECTION";return I.envMap&&I.envMapMode===Zi&&(U="ENVMAP_MODE_REFRACTION"),U})(t),u=(function(I){let U="ENVMAP_BLENDING_NONE";if(I.envMap)switch(I.combine){case _h:U="ENVMAP_BLENDING_MULTIPLY";break;case yh:U="ENVMAP_BLENDING_MIX";break;case xh:U="ENVMAP_BLENDING_ADD"}return U})(t),d=(function(I){let U=I.envMapCubeUVHeight;if(U===null)return null;let Z=Math.log2(U)-2,V=1/U;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:V,maxMip:Z}})(t),m=(function(I){return[I.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",I.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ps).join(`
`)})(t),p=(function(I){let U=[];for(let Z in I){let V=I[Z];V!==!1&&U.push("#define "+Z+" "+V)}return U.join(`
`)})(s),y=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ps).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ps).join(`
`),g.length>0&&(g+=`
`)):(f=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ps).join(`
`),g=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ti?"#define TONE_MAPPING":"",t.toneMapping!==Ti?pt.tonemapping_pars_fragment:"",t.toneMapping!==Ti?Ap("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,Ep("linearToOutputTexel",t.outputColorSpace),Cp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ps).join(`
`)),a=ic(a),a=uu(a,t),a=du(a,t),o=ic(o),o=uu(o,t),o=du(o,t),a=pu(a),o=pu(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=v+f+a,x=v+g+o,M=lu(i,i.VERTEX_SHADER,_),b=lu(i,i.FRAGMENT_SHADER,x);function L(I){if(r.debug.checkShaderErrors){let U=i.getProgramInfoLog(y)||"",Z=i.getShaderInfoLog(M)||"",V=i.getShaderInfoLog(b)||"",q=U.trim(),se=Z.trim(),ue=V.trim(),ce=!0,we=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(ce=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,M,b);else{let Re=hu(i,M,"vertex"),$=hu(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+q+`
`+Re+`
`+$)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):se!==""&&ue!==""||(we=!1);we&&(I.diagnostics={runnable:ce,programLog:q,vertexShader:{log:se,prefix:f},fragmentShader:{log:ue,prefix:g}})}i.deleteShader(M),i.deleteShader(b),O=new Or(i,y),D=(function(U,Z){let V={},q=U.getProgramParameter(Z,U.ACTIVE_ATTRIBUTES);for(let se=0;se<q;se++){let ue=U.getActiveAttrib(Z,se),ce=ue.name,we=1;ue.type===U.FLOAT_MAT2&&(we=2),ue.type===U.FLOAT_MAT3&&(we=3),ue.type===U.FLOAT_MAT4&&(we=4),V[ce]={type:ue.type,location:U.getAttribLocation(Z,ce),locationSize:we}}return V})(i,y)}let O,D;i.attachShader(y,M),i.attachShader(y,b),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y),this.getUniforms=function(){return O===void 0&&L(this),O},this.getAttributes=function(){return D===void 0&&L(this),D};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(y,37297)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wp++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=b,this}var Np=0,rc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new sc(e),t.set(e,n)),n}},sc=class{constructor(e){this.id=Np++,this.code=e,this.usedTimes=0}};function Fp(r,e,t,n,i,s,a){let o=new is,c=new rc,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,_,x){let M=_.fog,b=x.geometry,L=f.isMeshStandardMaterial?_.environment:null,O=(f.isMeshStandardMaterial?t:e).get(f.envMap||L),D=O&&O.mapping===ws?O.image.height:null,k=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let I=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,U=I!==void 0?I.length:0,Z,V,q,se,ue=0;if(b.morphAttributes.position!==void 0&&(ue=1),b.morphAttributes.normal!==void 0&&(ue=2),b.morphAttributes.color!==void 0&&(ue=3),k){let Wt=ci[k];Z=Wt.vertexShader,V=Wt.fragmentShader}else Z=f.vertexShader,V=f.fragmentShader,c.update(f),q=c.getVertexShaderID(f),se=c.getFragmentShaderID(f);let ce=r.getRenderTarget(),we=r.state.buffers.depth.getReversed(),Re=x.isInstancedMesh===!0,$=x.isBatchedMesh===!0,me=!!f.map,he=!!f.matcap,pe=!!O,fe=!!f.aoMap,j=!!f.lightMap,Ee=!!f.bumpMap,C=!!f.normalMap,E=!!f.displacementMap,W=!!f.emissiveMap,z=!!f.metalnessMap,T=!!f.roughnessMap,P=f.anisotropy>0,G=f.clearcoat>0,N=f.dispersion>0,ae=f.iridescence>0,Y=f.sheen>0,K=f.transmission>0,xe=P&&!!f.anisotropyMap,Le=G&&!!f.clearcoatMap,Me=G&&!!f.clearcoatNormalMap,Fe=G&&!!f.clearcoatRoughnessMap,Be=ae&&!!f.iridescenceMap,We=ae&&!!f.iridescenceThicknessMap,at=Y&&!!f.sheenColorMap,_e=Y&&!!f.sheenRoughnessMap,Ne=!!f.specularMap,ye=!!f.specularColorMap,De=!!f.specularIntensityMap,Oe=K&&!!f.transmissionMap,gt=K&&!!f.thicknessMap,Ae=!!f.gradientMap,ot=!!f.alphaMap,rt=f.alphaTest>0,$t=!!f.alphaHash,ln=!!f.extensions,H=Ti;f.toneMapped&&(ce!==null&&ce.isXRRenderTarget!==!0||(H=r.toneMapping));let Ut={shaderID:k,shaderType:f.type,shaderName:f.name,vertexShader:Z,fragmentShader:V,defines:f.defines,customVertexShaderID:q,customFragmentShaderID:se,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:$,batchingColor:$&&x._colorsTexture!==null,instancing:Re,instancingColor:Re&&x.instanceColor!==null,instancingMorph:Re&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?r.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Hi,alphaToCoverage:!!f.alphaToCoverage,map:me,matcap:he,envMap:pe,envMapMode:pe&&O.mapping,envMapCubeUVHeight:D,aoMap:fe,lightMap:j,bumpMap:Ee,normalMap:C,displacementMap:d&&E,emissiveMap:W,normalMapObjectSpace:C&&f.normalMapType===Dh,normalMapTangentSpace:C&&f.normalMapType===Lh,metalnessMap:z,roughnessMap:T,anisotropy:P,anisotropyMap:xe,clearcoat:G,clearcoatMap:Le,clearcoatNormalMap:Me,clearcoatRoughnessMap:Fe,dispersion:N,iridescence:ae,iridescenceMap:Be,iridescenceThicknessMap:We,sheen:Y,sheenColorMap:at,sheenRoughnessMap:_e,specularMap:Ne,specularColorMap:ye,specularIntensityMap:De,transmission:K,transmissionMap:Oe,thicknessMap:gt,gradientMap:Ae,opaque:f.transparent===!1&&f.blending===Ts&&f.alphaToCoverage===!1,alphaMap:ot,alphaTest:rt,alphaHash:$t,combine:f.combine,mapUv:me&&y(f.map.channel),aoMapUv:fe&&y(f.aoMap.channel),lightMapUv:j&&y(f.lightMap.channel),bumpMapUv:Ee&&y(f.bumpMap.channel),normalMapUv:C&&y(f.normalMap.channel),displacementMapUv:E&&y(f.displacementMap.channel),emissiveMapUv:W&&y(f.emissiveMap.channel),metalnessMapUv:z&&y(f.metalnessMap.channel),roughnessMapUv:T&&y(f.roughnessMap.channel),anisotropyMapUv:xe&&y(f.anisotropyMap.channel),clearcoatMapUv:Le&&y(f.clearcoatMap.channel),clearcoatNormalMapUv:Me&&y(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&y(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Be&&y(f.iridescenceMap.channel),iridescenceThicknessMapUv:We&&y(f.iridescenceThicknessMap.channel),sheenColorMapUv:at&&y(f.sheenColorMap.channel),sheenRoughnessMapUv:_e&&y(f.sheenRoughnessMap.channel),specularMapUv:Ne&&y(f.specularMap.channel),specularColorMapUv:ye&&y(f.specularColorMap.channel),specularIntensityMapUv:De&&y(f.specularIntensityMap.channel),transmissionMapUv:Oe&&y(f.transmissionMap.channel),thicknessMapUv:gt&&y(f.thicknessMap.channel),alphaMapUv:ot&&y(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(C||P),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(me||ot),fog:!!M,useFog:f.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:we,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:ue,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:H,decodeVideoTexture:me&&f.map.isVideoTexture===!0&&Mt.getTransfer(f.map.colorSpace)===At,decodeVideoTextureEmissive:W&&f.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(f.emissiveMap.colorSpace)===At,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Bt,flipSided:f.side===Nn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:ln&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ln&&f.extensions.multiDraw===!0||$)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Ut.vertexUv1s=l.has(1),Ut.vertexUv2s=l.has(2),Ut.vertexUv3s=l.has(3),l.clear(),Ut},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)})(g,f),(function(v,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],v;if(g){let _=ci[g];v=Wh.clone(_.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let _=0,x=h.length;_<x;_++){let M=h[_];if(M.cacheKey===g){v=M,++v.usedTimes;break}}return v===void 0&&(v=new Up(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function Bp(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Op(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function fu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function gu(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Op),n.length>1&&n.sort(o||fu),i.length>1&&i.sort(o||fu)}}}function zp(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new gu,r.set(e,[i])):t>=n.length?(i=new gu,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Gp(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new qe};break;case"SpotLight":t={position:new w,direction:new w,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var kp=0;function Vp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Hp(r){let e=new Gp,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new je,a=new je;return{setup:function(o){let c=0,l=0,h=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let u=0,d=0,m=0,p=0,y=0,f=0,g=0,v=0,_=0,x=0,M=0;o.sort(Vp);for(let L=0,O=o.length;L<O;L++){let D=o[L],k=D.color,I=D.intensity,U=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=k.r*I,l+=k.g*I,h+=k.b*I;else if(D.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(D.sh.coefficients[V],I);M++}else if(D.isDirectionalLight){let V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let q=D.shadow,se=t.get(D);se.shadowIntensity=q.intensity,se.shadowBias=q.bias,se.shadowNormalBias=q.normalBias,se.shadowRadius=q.radius,se.shadowMapSize=q.mapSize,n.directionalShadow[u]=se,n.directionalShadowMap[u]=Z,n.directionalShadowMatrix[u]=D.shadow.matrix,f++}n.directional[u]=V,u++}else if(D.isSpotLight){let V=e.get(D);V.position.setFromMatrixPosition(D.matrixWorld),V.color.copy(k).multiplyScalar(I),V.distance=U,V.coneCos=Math.cos(D.angle),V.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),V.decay=D.decay,n.spot[m]=V;let q=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,q.updateMatrices(D),D.castShadow&&x++),n.spotLightMatrix[m]=q.matrix,D.castShadow){let se=t.get(D);se.shadowIntensity=q.intensity,se.shadowBias=q.bias,se.shadowNormalBias=q.normalBias,se.shadowRadius=q.radius,se.shadowMapSize=q.mapSize,n.spotShadow[m]=se,n.spotShadowMap[m]=Z,v++}m++}else if(D.isRectAreaLight){let V=e.get(D);V.color.copy(k).multiplyScalar(I),V.halfWidth.set(.5*D.width,0,0),V.halfHeight.set(0,.5*D.height,0),n.rectArea[p]=V,p++}else if(D.isPointLight){let V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),V.distance=D.distance,V.decay=D.decay,D.castShadow){let q=D.shadow,se=t.get(D);se.shadowIntensity=q.intensity,se.shadowBias=q.bias,se.shadowNormalBias=q.normalBias,se.shadowRadius=q.radius,se.shadowMapSize=q.mapSize,se.shadowCameraNear=q.camera.near,se.shadowCameraFar=q.camera.far,n.pointShadow[d]=se,n.pointShadowMap[d]=Z,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=V,d++}else if(D.isHemisphereLight){let V=e.get(D);V.skyColor.copy(D.color).multiplyScalar(I),V.groundColor.copy(D.groundColor).multiplyScalar(I),n.hemi[y]=V,y++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===m&&b.rectAreaLength===p&&b.hemiLength===y&&b.numDirectionalShadows===f&&b.numPointShadows===g&&b.numSpotShadows===v&&b.numSpotMaps===_&&b.numLightProbes===M||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=y,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=M,b.directionalLength=u,b.pointLength=d,b.spotLength=m,b.rectAreaLength=p,b.hemiLength=y,b.numDirectionalShadows=f,b.numPointShadows=g,b.numSpotShadows=v,b.numSpotMaps=_,b.numLightProbes=M,n.version=kp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let y=0,f=o.length;y<f;y++){let g=o[y];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(p),m++}}},state:n}}function vu(r){let e=new Hp(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Wp(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new vu(r),e.set(t,[s])):n>=i.length?(s=new vu(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Xp(r,e,t){let n=new Li,i=new de,s=new de,a=new Tt,o=new Rr({depthPacking:so}),c=new Aa,l={},h=t.maxTextureSize,u={[Lr]:Nn,[Nn]:Lr,[Bt]:Bt},d=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new dt;p.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Je(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nl;let g=this.type;function v(b,L){let O=e.update(y);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Gn(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(L,null,O,d,y,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(L,null,O,m,y,null)}function _(b,L,O,D){let k=null,I=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)k=I;else if(k=O.isPointLight===!0?c:o,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let U=k.uuid,Z=L.uuid,V=l[U];V===void 0&&(V={},l[U]=V);let q=V[Z];q===void 0&&(q=k.clone(),V[Z]=q,L.addEventListener("dispose",M)),k=q}return k.visible=L.visible,k.wireframe=L.wireframe,k.side=D===ai?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:u[L.side],k.alphaMap=L.alphaMap,k.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,k.map=L.map,k.clipShadows=L.clipShadows,k.clippingPlanes=L.clippingPlanes,k.clipIntersection=L.clipIntersection,k.displacementMap=L.displacementMap,k.displacementScale=L.displacementScale,k.displacementBias=L.displacementBias,k.wireframeLinewidth=L.wireframeLinewidth,k.linewidth=L.linewidth,O.isPointLight===!0&&k.isMeshDistanceMaterial===!0&&(r.properties.get(k).light=O),k}function x(b,L,O,D,k){if(b.visible===!1)return;if(b.layers.test(L.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&k===ai)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);let U=e.update(b),Z=b.material;if(Array.isArray(Z)){let V=U.groups;for(let q=0,se=V.length;q<se;q++){let ue=V[q],ce=Z[ue.materialIndex];if(ce&&ce.visible){let we=_(b,ce,D,k);b.onBeforeShadow(r,b,L,O,U,we,ue),r.renderBufferDirect(O,null,U,we,b,ue),b.onAfterShadow(r,b,L,O,U,we,ue)}}}else if(Z.visible){let V=_(b,Z,D,k);b.onBeforeShadow(r,b,L,O,U,V,null),r.renderBufferDirect(O,null,U,V,b,null),b.onAfterShadow(r,b,L,O,U,V,null)}}let I=b.children;for(let U=0,Z=I.length;U<Z;U++)x(I[U],L,O,D,k)}function M(b){b.target.removeEventListener("dispose",M);for(let L in l){let O=l[L],D=b.target.uuid;D in O&&(O[D].dispose(),delete O[D])}}this.render=function(b,L,O){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;let D=r.getRenderTarget(),k=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Ui),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let Z=g!==ai&&this.type===ai,V=g===ai&&this.type!==ai;for(let q=0,se=b.length;q<se;q++){let ue=b[q],ce=ue.shadow;if(ce===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(ce.autoUpdate===!1&&ce.needsUpdate===!1)continue;i.copy(ce.mapSize);let we=ce.getFrameExtents();if(i.multiply(we),s.copy(ce.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/we.x),i.x=s.x*we.x,ce.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/we.y),i.y=s.y*we.y,ce.mapSize.y=s.y)),ce.map===null||Z===!0||V===!0){let $=this.type!==ai?{minFilter:ri,magFilter:ri}:{};ce.map!==null&&ce.map.dispose(),ce.map=new Gn(i.x,i.y,$),ce.map.texture.name=ue.name+".shadowMap",ce.camera.updateProjectionMatrix()}r.setRenderTarget(ce.map),r.clear();let Re=ce.getViewportCount();for(let $=0;$<Re;$++){let me=ce.getViewport($);a.set(s.x*me.x,s.y*me.y,s.x*me.z,s.y*me.w),U.viewport(a),ce.updateMatrices(ue,$),n=ce.getFrustum(),x(L,O,ce.camera,ue,this.type)}ce.isPointLightShadow!==!0&&this.type===ai&&v(ce,O),ce.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(D,k,I)}}var jp={[Ga]:ka,[Va]:Xa,[Ha]:ja,[bs]:Wa,[ka]:Ga,[Xa]:Va,[ja]:Ha,[Wa]:bs};function qp(r,e){let t=new function(){let T=!1,P=new Tt,G=null,N=new Tt(0,0,0,0);return{setMask:function(ae){G===ae||T||(r.colorMask(ae,ae,ae,ae),G=ae)},setLocked:function(ae){T=ae},setClear:function(ae,Y,K,xe,Le){Le===!0&&(ae*=xe,Y*=xe,K*=xe),P.set(ae,Y,K,xe),N.equals(P)===!1&&(r.clearColor(ae,Y,K,xe),N.copy(P))},reset:function(){T=!1,G=null,N.set(-1,0,0,0)}}},n=new function(){let T=!1,P=!1,G=null,N=null,ae=null;return{setReversed:function(Y){if(P!==Y){let K=e.get("EXT_clip_control");Y?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),P=Y;let xe=ae;ae=null,this.setClear(xe)}},getReversed:function(){return P},setTest:function(Y){Y?pe(r.DEPTH_TEST):fe(r.DEPTH_TEST)},setMask:function(Y){G===Y||T||(r.depthMask(Y),G=Y)},setFunc:function(Y){if(P&&(Y=jp[Y]),N!==Y){switch(Y){case Ga:r.depthFunc(r.NEVER);break;case ka:r.depthFunc(r.ALWAYS);break;case Va:r.depthFunc(r.LESS);break;case bs:r.depthFunc(r.LEQUAL);break;case Ha:r.depthFunc(r.EQUAL);break;case Wa:r.depthFunc(r.GEQUAL);break;case Xa:r.depthFunc(r.GREATER);break;case ja:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}N=Y}},setLocked:function(Y){T=Y},setClear:function(Y){ae!==Y&&(P&&(Y=1-Y),r.clearDepth(Y),ae=Y)},reset:function(){T=!1,G=null,N=null,ae=null,P=!1}}},i=new function(){let T=!1,P=null,G=null,N=null,ae=null,Y=null,K=null,xe=null,Le=null;return{setTest:function(Me){T||(Me?pe(r.STENCIL_TEST):fe(r.STENCIL_TEST))},setMask:function(Me){P===Me||T||(r.stencilMask(Me),P=Me)},setFunc:function(Me,Fe,Be){G===Me&&N===Fe&&ae===Be||(r.stencilFunc(Me,Fe,Be),G=Me,N=Fe,ae=Be)},setOp:function(Me,Fe,Be){Y===Me&&K===Fe&&xe===Be||(r.stencilOp(Me,Fe,Be),Y=Me,K=Fe,xe=Be)},setLocked:function(Me){T=Me},setClear:function(Me){Le!==Me&&(r.clearStencil(Me),Le=Me)},reset:function(){T=!1,P=null,G=null,N=null,ae=null,Y=null,K=null,xe=null,Le=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,y=null,f=null,g=null,v=null,_=null,x=new qe(0,0,0),M=0,b=!1,L=null,O=null,D=null,k=null,I=null,U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,V=0,q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(q)[1]),Z=V>=1):q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),Z=V>=2);let se=null,ue={},ce=r.getParameter(r.SCISSOR_BOX),we=r.getParameter(r.VIEWPORT),Re=new Tt().fromArray(ce),$=new Tt().fromArray(we);function me(T,P,G,N){let ae=new Uint8Array(4),Y=r.createTexture();r.bindTexture(T,Y),r.texParameteri(T,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(T,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let K=0;K<G;K++)T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,N,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(P+K,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return Y}let he={};function pe(T){o[T]!==!0&&(r.enable(T),o[T]=!0)}function fe(T){o[T]!==!1&&(r.disable(T),o[T]=!1)}he[r.TEXTURE_2D]=me(r.TEXTURE_2D,r.TEXTURE_2D,1),he[r.TEXTURE_CUBE_MAP]=me(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[r.TEXTURE_2D_ARRAY]=me(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),he[r.TEXTURE_3D]=me(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),pe(r.DEPTH_TEST),n.setFunc(bs),E(!1),W(tl),pe(r.CULL_FACE),C(Ui);let j={[Dr]:r.FUNC_ADD,[Qc]:r.FUNC_SUBTRACT,[eh]:r.FUNC_REVERSE_SUBTRACT};j[th]=r.MIN,j[nh]=r.MAX;let Ee={[ih]:r.ZERO,[rh]:r.ONE,[sh]:r.SRC_COLOR,[oh]:r.SRC_ALPHA,[ph]:r.SRC_ALPHA_SATURATE,[uh]:r.DST_COLOR,[ch]:r.DST_ALPHA,[ah]:r.ONE_MINUS_SRC_COLOR,[lh]:r.ONE_MINUS_SRC_ALPHA,[dh]:r.ONE_MINUS_DST_COLOR,[hh]:r.ONE_MINUS_DST_ALPHA,[mh]:r.CONSTANT_COLOR,[fh]:r.ONE_MINUS_CONSTANT_COLOR,[gh]:r.CONSTANT_ALPHA,[vh]:r.ONE_MINUS_CONSTANT_ALPHA};function C(T,P,G,N,ae,Y,K,xe,Le,Me){if(T!==Ui){if(d===!1&&(pe(r.BLEND),d=!0),T===$c)ae=ae||P,Y=Y||G,K=K||N,P===p&&ae===g||(r.blendEquationSeparate(j[P],j[ae]),p=P,g=ae),G===y&&N===f&&Y===v&&K===_||(r.blendFuncSeparate(Ee[G],Ee[N],Ee[Y],Ee[K]),y=G,f=N,v=Y,_=K),xe.equals(x)!==!1&&Le===M||(r.blendColor(xe.r,xe.g,xe.b,Le),x.copy(xe),M=Le),m=T,b=!1;else if(T!==m||Me!==b){if(p===Dr&&g===Dr||(r.blendEquation(r.FUNC_ADD),p=Dr,g=Dr),Me)switch(T){case Ts:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case il:r.blendFunc(r.ONE,r.ONE);break;case rl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case sl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",T)}else switch(T){case Ts:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case il:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case rl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",T)}y=null,f=null,v=null,_=null,x.set(0,0,0),M=0,m=T,b=Me}}else d===!0&&(fe(r.BLEND),d=!1)}function E(T){L!==T&&(T?r.frontFace(r.CW):r.frontFace(r.CCW),L=T)}function W(T){T!==Jc?(pe(r.CULL_FACE),T!==O&&(T===tl?r.cullFace(r.BACK):T===Kc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):fe(r.CULL_FACE),O=T}function z(T,P,G){T?(pe(r.POLYGON_OFFSET_FILL),k===P&&I===G||(r.polygonOffset(P,G),k=P,I=G)):fe(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:pe,disable:fe,bindFramebuffer:function(T,P){return c[T]!==P&&(r.bindFramebuffer(T,P),c[T]=P,T===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),T===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(T,P){let G=h,N=!1;if(T){G=l.get(P),G===void 0&&(G=[],l.set(P,G));let ae=T.textures;if(G.length!==ae.length||G[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,K=ae.length;Y<K;Y++)G[Y]=r.COLOR_ATTACHMENT0+Y;G.length=ae.length,N=!0}}else G[0]!==r.BACK&&(G[0]=r.BACK,N=!0);N&&r.drawBuffers(G)},useProgram:function(T){return u!==T&&(r.useProgram(T),u=T,!0)},setBlending:C,setMaterial:function(T,P){T.side===Bt?fe(r.CULL_FACE):pe(r.CULL_FACE);let G=T.side===Nn;P&&(G=!G),E(G),T.blending===Ts&&T.transparent===!1?C(Ui):C(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),n.setFunc(T.depthFunc),n.setTest(T.depthTest),n.setMask(T.depthWrite),t.setMask(T.colorWrite);let N=T.stencilWrite;i.setTest(N),N&&(i.setMask(T.stencilWriteMask),i.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),i.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),z(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?pe(r.SAMPLE_ALPHA_TO_COVERAGE):fe(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:W,setLineWidth:function(T){T!==D&&(Z&&r.lineWidth(T),D=T)},setPolygonOffset:z,setScissorTest:function(T){T?pe(r.SCISSOR_TEST):fe(r.SCISSOR_TEST)},activeTexture:function(T){T===void 0&&(T=r.TEXTURE0+U-1),se!==T&&(r.activeTexture(T),se=T)},bindTexture:function(T,P,G){G===void 0&&(G=se===null?r.TEXTURE0+U-1:se);let N=ue[G];N===void 0&&(N={type:void 0,texture:void 0},ue[G]=N),N.type===T&&N.texture===P||(se!==G&&(r.activeTexture(G),se=G),r.bindTexture(T,P||he[T]),N.type=T,N.texture=P)},unbindTexture:function(){let T=ue[se];T!==void 0&&T.type!==void 0&&(r.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},updateUBOMapping:function(T,P){let G=a.get(P);G===void 0&&(G=new WeakMap,a.set(P,G));let N=G.get(T);N===void 0&&(N=r.getUniformBlockIndex(P,T.name),G.set(T,N))},uniformBlockBinding:function(T,P){let G=a.get(P).get(T);s.get(P)!==G&&(r.uniformBlockBinding(P,G,T.__bindingPointIndex),s.set(P,G))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},scissor:function(T){Re.equals(T)===!1&&(r.scissor(T.x,T.y,T.z,T.w),Re.copy(T))},viewport:function(T){$.equals(T)===!1&&(r.viewport(T.x,T.y,T.z,T.w),$.copy(T))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},se=null,ue={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,y=null,f=null,g=null,v=null,_=null,x=new qe(0,0,0),M=0,b=!1,L=null,O=null,D=null,k=null,I=null,Re.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function Yp(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new de,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,E){return m?new OffscreenCanvas(C,E):ts("canvas")}function y(C,E,W){let z=1,T=Ee(C);if((T.width>W||T.height>W)&&(z=W/Math.max(T.width,T.height)),z<1){if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let P=Math.floor(z*T.width),G=Math.floor(z*T.height);u===void 0&&(u=p(P,G));let N=E?p(P,G):u;return N.width=P,N.height=G,N.getContext("2d").drawImage(C,0,0,P,G),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+P+"x"+G+")."),N}return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),C}return C}function f(C){return C.generateMipmaps}function g(C){r.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(C,E,W,z,T=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let P=E;if(E===r.RED&&(W===r.FLOAT&&(P=r.R32F),W===r.HALF_FLOAT&&(P=r.R16F),W===r.UNSIGNED_BYTE&&(P=r.R8)),E===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.R8UI),W===r.UNSIGNED_SHORT&&(P=r.R16UI),W===r.UNSIGNED_INT&&(P=r.R32UI),W===r.BYTE&&(P=r.R8I),W===r.SHORT&&(P=r.R16I),W===r.INT&&(P=r.R32I)),E===r.RG&&(W===r.FLOAT&&(P=r.RG32F),W===r.HALF_FLOAT&&(P=r.RG16F),W===r.UNSIGNED_BYTE&&(P=r.RG8)),E===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RG8UI),W===r.UNSIGNED_SHORT&&(P=r.RG16UI),W===r.UNSIGNED_INT&&(P=r.RG32UI),W===r.BYTE&&(P=r.RG8I),W===r.SHORT&&(P=r.RG16I),W===r.INT&&(P=r.RG32I)),E===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RGB8UI),W===r.UNSIGNED_SHORT&&(P=r.RGB16UI),W===r.UNSIGNED_INT&&(P=r.RGB32UI),W===r.BYTE&&(P=r.RGB8I),W===r.SHORT&&(P=r.RGB16I),W===r.INT&&(P=r.RGB32I)),E===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),W===r.UNSIGNED_INT&&(P=r.RGBA32UI),W===r.BYTE&&(P=r.RGBA8I),W===r.SHORT&&(P=r.RGBA16I),W===r.INT&&(P=r.RGBA32I)),E===r.RGB&&(W===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),W===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),E===r.RGBA){let G=T?Qr:Mt.getTransfer(z);W===r.FLOAT&&(P=r.RGBA32F),W===r.HALF_FLOAT&&(P=r.RGBA16F),W===r.UNSIGNED_BYTE&&(P=G===At?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function x(C,E){let W;return C?E===null||E===Ki||E===Fr?W=r.DEPTH24_STENCIL8:E===Hn?W=r.DEPTH32F_STENCIL8:E===Nr&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ki||E===Fr?W=r.DEPTH_COMPONENT24:E===Hn?W=r.DEPTH_COMPONENT32F:E===Nr&&(W=r.DEPTH_COMPONENT16),W}function M(C,E){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==ri&&C.minFilter!==si?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function b(C){let E=C.target;E.removeEventListener("dispose",b),(function(W){let z=n.get(W);if(z.__webglInit===void 0)return;let T=W.source,P=d.get(T);if(P){let G=P[z.__cacheKey];G.usedTimes--,G.usedTimes===0&&O(W),Object.keys(P).length===0&&d.delete(T)}n.remove(W)})(E),E.isVideoTexture&&h.delete(E)}function L(C){let E=C.target;E.removeEventListener("dispose",L),(function(W){let z=n.get(W);if(W.depthTexture&&(W.depthTexture.dispose(),n.remove(W.depthTexture)),W.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(z.__webglFramebuffer[P]))for(let G=0;G<z.__webglFramebuffer[P].length;G++)r.deleteFramebuffer(z.__webglFramebuffer[P][G]);else r.deleteFramebuffer(z.__webglFramebuffer[P]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[P])}else{if(Array.isArray(z.__webglFramebuffer))for(let P=0;P<z.__webglFramebuffer.length;P++)r.deleteFramebuffer(z.__webglFramebuffer[P]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let P=0;P<z.__webglColorRenderbuffer.length;P++)z.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[P]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let T=W.textures;for(let P=0,G=T.length;P<G;P++){let N=n.get(T[P]);N.__webglTexture&&(r.deleteTexture(N.__webglTexture),a.memory.textures--),n.remove(T[P])}n.remove(W)})(E)}function O(C){let E=n.get(C);r.deleteTexture(E.__webglTexture);let W=C.source;delete d.get(W)[E.__cacheKey],a.memory.textures--}let D=0;function k(C,E){let W=n.get(C);if(C.isVideoTexture&&(function(z){let T=a.render.frame;h.get(z)!==T&&(h.set(z,T),z.update())})(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){let z=C.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(z.complete!==!1)return void ue(W,C,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+E)}let I={[Kn]:r.REPEAT,[yr]:r.CLAMP_TO_EDGE,[sa]:r.MIRRORED_REPEAT},U={[ri]:r.NEAREST,[Ch]:r.NEAREST_MIPMAP_NEAREST,[Es]:r.NEAREST_MIPMAP_LINEAR,[si]:r.LINEAR,[Za]:r.LINEAR_MIPMAP_NEAREST,[Ji]:r.LINEAR_MIPMAP_LINEAR},Z={[Uh]:r.NEVER,[Gh]:r.ALWAYS,[Nh]:r.LESS,[kl]:r.LEQUAL,[Fh]:r.EQUAL,[zh]:r.GEQUAL,[Bh]:r.GREATER,[Oh]:r.NOTEQUAL};function V(C,E){if(E.type!==Hn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==si&&E.magFilter!==Za&&E.magFilter!==Es&&E.magFilter!==Ji&&E.minFilter!==si&&E.minFilter!==Za&&E.minFilter!==Es&&E.minFilter!==Ji||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,I[E.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,I[E.wrapT]),C!==r.TEXTURE_3D&&C!==r.TEXTURE_2D_ARRAY||r.texParameteri(C,r.TEXTURE_WRAP_R,I[E.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,U[E.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,U[E.minFilter]),E.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ri||E.minFilter!==Es&&E.minFilter!==Ji||E.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function q(C,E){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",b));let z=E.source,T=d.get(z);T===void 0&&(T={},d.set(z,T));let P=(function(G){let N=[];return N.push(G.wrapS),N.push(G.wrapT),N.push(G.wrapR||0),N.push(G.magFilter),N.push(G.minFilter),N.push(G.anisotropy),N.push(G.internalFormat),N.push(G.format),N.push(G.type),N.push(G.generateMipmaps),N.push(G.premultiplyAlpha),N.push(G.flipY),N.push(G.unpackAlignment),N.push(G.colorSpace),N.join()})(E);if(P!==C.__cacheKey){T[P]===void 0&&(T[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),T[P].usedTimes++;let G=T[C.__cacheKey];G!==void 0&&(T[C.__cacheKey].usedTimes--,G.usedTimes===0&&O(E)),C.__cacheKey=P,C.__webglTexture=T[P].texture}return W}function se(C,E,W){return Math.floor(Math.floor(C/W)/E)}function ue(C,E,W){let z=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(z=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(z=r.TEXTURE_3D);let T=q(C,E),P=E.source;t.bindTexture(z,C.__webglTexture,r.TEXTURE0+W);let G=n.get(P);if(P.version!==G.__version||T===!0){t.activeTexture(r.TEXTURE0+W);let N=Mt.getPrimaries(Mt.workingColorSpace),ae=E.colorSpace===$i?null:Mt.getPrimaries(E.colorSpace),Y=E.colorSpace===$i||N===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let K=y(E.image,!1,i.maxTextureSize);K=j(E,K);let xe=s.convert(E.format,E.colorSpace),Le=s.convert(E.type),Me,Fe=_(E.internalFormat,xe,Le,E.colorSpace,E.isVideoTexture);V(z,E);let Be=E.mipmaps,We=E.isVideoTexture!==!0,at=G.__version===void 0||T===!0,_e=P.dataReady,Ne=M(E,K);if(E.isDepthTexture)Fe=x(E.format===Cs,E.type),at&&(We?t.texStorage2D(r.TEXTURE_2D,1,Fe,K.width,K.height):t.texImage2D(r.TEXTURE_2D,0,Fe,K.width,K.height,0,xe,Le,null));else if(E.isDataTexture)if(Be.length>0){We&&at&&t.texStorage2D(r.TEXTURE_2D,Ne,Fe,Be[0].width,Be[0].height);for(let ye=0,De=Be.length;ye<De;ye++)Me=Be[ye],We?_e&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,Me.width,Me.height,xe,Le,Me.data):t.texImage2D(r.TEXTURE_2D,ye,Fe,Me.width,Me.height,0,xe,Le,Me.data);E.generateMipmaps=!1}else We?(at&&t.texStorage2D(r.TEXTURE_2D,Ne,Fe,K.width,K.height),_e&&(function(ye,De,Oe,gt){let Ae=ye.updateRanges;if(Ae.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,De.width,De.height,Oe,gt,De.data);else{Ae.sort((H,Ut)=>H.start-Ut.start);let ot=0;for(let H=1;H<Ae.length;H++){let Ut=Ae[ot],Wt=Ae[H],lt=Ut.start+Ut.count,Pt=se(Wt.start,De.width,4),En=se(Ut.start,De.width,4);Wt.start<=lt+1&&Pt===En&&se(Wt.start+Wt.count-1,De.width,4)===Pt?Ut.count=Math.max(Ut.count,Wt.start+Wt.count-Ut.start):(++ot,Ae[ot]=Wt)}Ae.length=ot+1;let rt=r.getParameter(r.UNPACK_ROW_LENGTH),$t=r.getParameter(r.UNPACK_SKIP_PIXELS),ln=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,De.width);for(let H=0,Ut=Ae.length;H<Ut;H++){let Wt=Ae[H],lt=Math.floor(Wt.start/4),Pt=Math.ceil(Wt.count/4),En=lt%De.width,Xt=Math.floor(lt/De.width),Qt=Pt;r.pixelStorei(r.UNPACK_SKIP_PIXELS,En),r.pixelStorei(r.UNPACK_SKIP_ROWS,Xt),t.texSubImage2D(r.TEXTURE_2D,0,En,Xt,Qt,1,Oe,gt,De.data)}ye.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,rt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,$t),r.pixelStorei(r.UNPACK_SKIP_ROWS,ln)}})(E,K,xe,Le)):t.texImage2D(r.TEXTURE_2D,0,Fe,K.width,K.height,0,xe,Le,K.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){We&&at&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ne,Fe,Be[0].width,Be[0].height,K.depth);for(let ye=0,De=Be.length;ye<De;ye++)if(Me=Be[ye],E.format!==Wn)if(xe!==null)if(We){if(_e)if(E.layerUpdates.size>0){let Oe=ql(Me.width,Me.height,E.format,E.type);for(let gt of E.layerUpdates){let Ae=Me.data.subarray(gt*Oe/Me.data.BYTES_PER_ELEMENT,(gt+1)*Oe/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,gt,Me.width,Me.height,1,xe,Ae)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,0,Me.width,Me.height,K.depth,xe,Me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ye,Fe,Me.width,Me.height,K.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?_e&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,0,Me.width,Me.height,K.depth,xe,Le,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ye,Fe,Me.width,Me.height,K.depth,0,xe,Le,Me.data)}else{We&&at&&t.texStorage2D(r.TEXTURE_2D,Ne,Fe,Be[0].width,Be[0].height);for(let ye=0,De=Be.length;ye<De;ye++)Me=Be[ye],E.format!==Wn?xe!==null?We?_e&&t.compressedTexSubImage2D(r.TEXTURE_2D,ye,0,0,Me.width,Me.height,xe,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,ye,Fe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?_e&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,Me.width,Me.height,xe,Le,Me.data):t.texImage2D(r.TEXTURE_2D,ye,Fe,Me.width,Me.height,0,xe,Le,Me.data)}else if(E.isDataArrayTexture)if(We){if(at&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ne,Fe,K.width,K.height,K.depth),_e)if(E.layerUpdates.size>0){let ye=ql(K.width,K.height,E.format,E.type);for(let De of E.layerUpdates){let Oe=K.data.subarray(De*ye/K.data.BYTES_PER_ELEMENT,(De+1)*ye/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,De,K.width,K.height,1,xe,Le,Oe)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,xe,Le,K.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,K.width,K.height,K.depth,0,xe,Le,K.data);else if(E.isData3DTexture)We?(at&&t.texStorage3D(r.TEXTURE_3D,Ne,Fe,K.width,K.height,K.depth),_e&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,xe,Le,K.data)):t.texImage3D(r.TEXTURE_3D,0,Fe,K.width,K.height,K.depth,0,xe,Le,K.data);else if(E.isFramebufferTexture){if(at)if(We)t.texStorage2D(r.TEXTURE_2D,Ne,Fe,K.width,K.height);else{let ye=K.width,De=K.height;for(let Oe=0;Oe<Ne;Oe++)t.texImage2D(r.TEXTURE_2D,Oe,Fe,ye,De,0,xe,Le,null),ye>>=1,De>>=1}}else if(Be.length>0){if(We&&at){let ye=Ee(Be[0]);t.texStorage2D(r.TEXTURE_2D,Ne,Fe,ye.width,ye.height)}for(let ye=0,De=Be.length;ye<De;ye++)Me=Be[ye],We?_e&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,xe,Le,Me):t.texImage2D(r.TEXTURE_2D,ye,Fe,xe,Le,Me);E.generateMipmaps=!1}else if(We){if(at){let ye=Ee(K);t.texStorage2D(r.TEXTURE_2D,Ne,Fe,ye.width,ye.height)}_e&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,xe,Le,K)}else t.texImage2D(r.TEXTURE_2D,0,Fe,xe,Le,K);f(E)&&g(z),G.__version=P.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function ce(C,E,W,z,T,P){let G=s.convert(W.format,W.colorSpace),N=s.convert(W.type),ae=_(W.internalFormat,G,N,W.colorSpace),Y=n.get(E),K=n.get(W);if(K.__renderTarget=E,!Y.__hasExternalTextures){let xe=Math.max(1,E.width>>P),Le=Math.max(1,E.height>>P);T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY?t.texImage3D(T,P,ae,xe,Le,E.depth,0,G,N,null):t.texImage2D(T,P,ae,xe,Le,0,G,N,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),fe(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,z,T,K.__webglTexture,0,pe(E)):(T===r.TEXTURE_2D||T>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,z,T,K.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function we(C,E,W){if(r.bindRenderbuffer(r.RENDERBUFFER,C),E.depthBuffer){let z=E.depthTexture,T=z&&z.isDepthTexture?z.type:null,P=x(E.stencilBuffer,T),G=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=pe(E);fe(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,N,P,E.width,E.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,N,P,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,P,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,G,r.RENDERBUFFER,C)}else{let z=E.textures;for(let T=0;T<z.length;T++){let P=z[T],G=s.convert(P.format,P.colorSpace),N=s.convert(P.type),ae=_(P.internalFormat,G,N,P.colorSpace),Y=pe(E);W&&fe(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,ae,E.width,E.height):fe(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Y,ae,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ae,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Re(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(E.depthTexture);W.__renderTarget=E,W.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),k(E.depthTexture,0);let z=W.__webglTexture,T=pe(E);if(E.depthTexture.format===As)fe(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0,T):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0);else{if(E.depthTexture.format!==Cs)throw new Error("Unknown depthTexture format");fe(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0,T):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0)}}function $(C){let E=n.get(C),W=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){let z=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),z){let T=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,z.removeEventListener("dispose",T)};z.addEventListener("dispose",T),E.__depthDisposeCallback=T}E.__boundDepthTexture=z}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");let z=C.texture.mipmaps;z&&z.length>0?Re(E.__webglFramebuffer[0],C):Re(E.__webglFramebuffer,C)}else if(W){E.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[z]),E.__webglDepthbuffer[z]===void 0)E.__webglDepthbuffer[z]=r.createRenderbuffer(),we(E.__webglDepthbuffer[z],C,!1);else{let T=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer[z];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,T,r.RENDERBUFFER,P)}}else{let z=C.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),we(E.__webglDepthbuffer,C,!1);else{let T=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,T,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let me=[],he=[];function pe(C){return Math.min(i.maxSamples,C.samples)}function fe(C){let E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function j(C,E){let W=C.colorSpace,z=C.format,T=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==Hi&&W!==$i&&(Mt.getTransfer(W)===At?z===Wn&&T===li||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),E}function Ee(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=function(){let C=D;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),D+=1,C},this.resetTextureUnits=function(){D=0},this.setTexture2D=k,this.setTexture2DArray=function(C,E){let W=n.get(C);C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version?ue(W,C,E):t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+E)},this.setTexture3D=function(C,E){let W=n.get(C);C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version?ue(W,C,E):t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+E)},this.setTextureCube=function(C,E){let W=n.get(C);C.version>0&&W.__version!==C.version?(function(z,T,P){if(T.image.length!==6)return;let G=q(z,T),N=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+P);let ae=n.get(N);if(N.version!==ae.__version||G===!0){t.activeTexture(r.TEXTURE0+P);let Y=Mt.getPrimaries(Mt.workingColorSpace),K=T.colorSpace===$i?null:Mt.getPrimaries(T.colorSpace),xe=T.colorSpace===$i||Y===K?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Le=T.isCompressedTexture||T.image[0].isCompressedTexture,Me=T.image[0]&&T.image[0].isDataTexture,Fe=[];for(let Ae=0;Ae<6;Ae++)Fe[Ae]=Le||Me?Me?T.image[Ae].image:T.image[Ae]:y(T.image[Ae],!0,i.maxCubemapSize),Fe[Ae]=j(T,Fe[Ae]);let Be=Fe[0],We=s.convert(T.format,T.colorSpace),at=s.convert(T.type),_e=_(T.internalFormat,We,at,T.colorSpace),Ne=T.isVideoTexture!==!0,ye=ae.__version===void 0||G===!0,De=N.dataReady,Oe,gt=M(T,Be);if(V(r.TEXTURE_CUBE_MAP,T),Le){Ne&&ye&&t.texStorage2D(r.TEXTURE_CUBE_MAP,gt,_e,Be.width,Be.height);for(let Ae=0;Ae<6;Ae++){Oe=Fe[Ae].mipmaps;for(let ot=0;ot<Oe.length;ot++){let rt=Oe[ot];T.format!==Wn?We!==null?Ne?De&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot,0,0,rt.width,rt.height,We,rt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot,_e,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?De&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot,0,0,rt.width,rt.height,We,at,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot,_e,rt.width,rt.height,0,We,at,rt.data)}}}else{if(Oe=T.mipmaps,Ne&&ye){Oe.length>0&&gt++;let Ae=Ee(Fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,gt,_e,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(Me){Ne?De&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,Fe[Ae].width,Fe[Ae].height,We,at,Fe[Ae].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,_e,Fe[Ae].width,Fe[Ae].height,0,We,at,Fe[Ae].data);for(let ot=0;ot<Oe.length;ot++){let rt=Oe[ot].image[Ae].image;Ne?De&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot+1,0,0,rt.width,rt.height,We,at,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot+1,_e,rt.width,rt.height,0,We,at,rt.data)}}else{Ne?De&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,We,at,Fe[Ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,_e,We,at,Fe[Ae]);for(let ot=0;ot<Oe.length;ot++){let rt=Oe[ot];Ne?De&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot+1,0,0,We,at,rt.image[Ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ot+1,_e,We,at,rt.image[Ae])}}}f(T)&&g(r.TEXTURE_CUBE_MAP),ae.__version=N.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version})(W,C,E):t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+E)},this.rebindTextures=function(C,E,W){let z=n.get(C);E!==void 0&&ce(z.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&$(C)},this.setupRenderTarget=function(C){let E=C.texture,W=n.get(C),z=n.get(E);C.addEventListener("dispose",L);let T=C.textures,P=C.isWebGLCubeRenderTarget===!0,G=T.length>1;if(G||(z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture()),z.__version=E.version,a.memory.textures++),P){W.__webglFramebuffer=[];for(let N=0;N<6;N++)if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer[N]=[];for(let ae=0;ae<E.mipmaps.length;ae++)W.__webglFramebuffer[N][ae]=r.createFramebuffer()}else W.__webglFramebuffer[N]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer=[];for(let N=0;N<E.mipmaps.length;N++)W.__webglFramebuffer[N]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(G)for(let N=0,ae=T.length;N<ae;N++){let Y=n.get(T[N]);Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&fe(C)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let N=0;N<T.length;N++){let ae=T[N];W.__webglColorRenderbuffer[N]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[N]);let Y=s.convert(ae.format,ae.colorSpace),K=s.convert(ae.type),xe=_(ae.internalFormat,Y,K,ae.colorSpace,C.isXRRenderTarget===!0),Le=pe(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Le,xe,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+N,r.RENDERBUFFER,W.__webglColorRenderbuffer[N])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),we(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture),V(r.TEXTURE_CUBE_MAP,E);for(let N=0;N<6;N++)if(E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ce(W.__webglFramebuffer[N][ae],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+N,ae);else ce(W.__webglFramebuffer[N],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+N,0);f(E)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let N=0,ae=T.length;N<ae;N++){let Y=T[N],K=n.get(Y),xe=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(xe=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(xe,K.__webglTexture),V(xe,Y),ce(W.__webglFramebuffer,C,Y,r.COLOR_ATTACHMENT0+N,xe,0),f(Y)&&g(xe)}t.unbindTexture()}else{let N=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(N=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(N,z.__webglTexture),V(N,E),E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ce(W.__webglFramebuffer[ae],C,E,r.COLOR_ATTACHMENT0,N,ae);else ce(W.__webglFramebuffer,C,E,r.COLOR_ATTACHMENT0,N,0);f(E)&&g(N),t.unbindTexture()}C.depthBuffer&&$(C)},this.updateRenderTargetMipmap=function(C){let E=C.textures;for(let W=0,z=E.length;W<z;W++){let T=E[W];if(f(T)){let P=v(C),G=n.get(T).__webglTexture;t.bindTexture(P,G),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(C){if(C.samples>0){if(fe(C)===!1){let E=C.textures,W=C.width,z=C.height,T=r.COLOR_BUFFER_BIT,P=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,G=n.get(C),N=E.length>1;if(N)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,G.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);let ae=C.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(T|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(T|=r.STENCIL_BUFFER_BIT)),N){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,G.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,W,z,0,0,W,z,T,r.NEAREST),c===!0&&(me.length=0,he.length=0,me.push(r.COLOR_ATTACHMENT0+Y),C.depthBuffer&&C.resolveDepthBuffer===!1&&(me.push(P),he.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,he)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),N)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,G.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,G.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,K,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let E=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=fe}function Zp(r,e){return{convert:function(t,n=$i){let i,s=Mt.getTransfer(n);if(t===li)return r.UNSIGNED_BYTE;if(t===Ka)return r.UNSIGNED_SHORT_4_4_4_4;if(t===$a)return r.UNSIGNED_SHORT_5_5_5_1;if(t===cl)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===hl)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===ol)return r.BYTE;if(t===ll)return r.SHORT;if(t===Nr)return r.UNSIGNED_SHORT;if(t===Ja)return r.INT;if(t===Ki)return r.UNSIGNED_INT;if(t===Hn)return r.FLOAT;if(t===Ni)return r.HALF_FLOAT;if(t===Rh)return r.ALPHA;if(t===Ph)return r.RGB;if(t===Wn)return r.RGBA;if(t===As)return r.DEPTH_COMPONENT;if(t===Cs)return r.DEPTH_STENCIL;if(t===Qa)return r.RED;if(t===eo)return r.RED_INTEGER;if(t===Ih)return r.RG;if(t===ul)return r.RG_INTEGER;if(t===dl)return r.RGBA_INTEGER;if(t===to||t===no||t===io||t===ro)if(s===At){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===to)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===no)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===io)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===ro)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===to)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===no)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===io)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===ro)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===pl||t===ml||t===fl||t===gl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===pl)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===ml)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===fl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===gl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===vl||t===_l||t===yl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===vl||t===_l)return s===At?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===yl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===xl||t===Ml||t===Sl||t===Tl||t===bl||t===wl||t===El||t===Al||t===Cl||t===Rl||t===Pl||t===Il||t===Ll||t===Dl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===xl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Ml)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Sl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Tl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===bl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===wl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===El)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Al)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Cl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Rl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Pl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Il)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Ll)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Dl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ul||t===Nl||t===Fl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Ul)return s===At?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Nl)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Fl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Bl||t===Ol||t===zl||t===Gl){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Bl)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Ol)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===zl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Gl)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Fr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ds(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new jt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oc=class extends yi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,y=typeof XRWebGLBinding<"u",f=new ac,g={},v=t.getContextAttributes(),_=null,x=null,M=[],b=[],L=new de,O=null,D=new kt;D.viewport=new Tt;let k=new kt;k.viewport=new Tt;let I=[D,k],U=new Oa,Z=null,V=null;function q(he){let pe=b.indexOf(he.inputSource);if(pe===-1)return;let fe=M[pe];fe!==void 0&&(fe.update(he.inputSource,he.frame,l||a),fe.dispatchEvent({type:he.type,data:he.inputSource}))}function se(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",se),i.removeEventListener("inputsourceschange",ue);for(let he=0;he<M.length;he++){let pe=b[he];pe!==null&&(b[he]=null,M[he].disconnect(pe))}Z=null,V=null,f.reset();for(let he in g)delete g[he];e.setRenderTarget(_),m=null,d=null,u=null,i=null,x=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}function ue(he){for(let pe=0;pe<he.removed.length;pe++){let fe=he.removed[pe],j=b.indexOf(fe);j>=0&&(b[j]=null,M[j].disconnect(fe))}for(let pe=0;pe<he.added.length;pe++){let fe=he.added[pe],j=b.indexOf(fe);if(j===-1){for(let C=0;C<M.length;C++){if(C>=b.length){b.push(fe),j=C;break}if(b[C]===null){b[C]=fe,j=C;break}}if(j===-1)break}let Ee=M[j];Ee&&Ee.connect(fe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let pe=M[he];return pe===void 0&&(pe=new Tr,M[he]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(he){let pe=M[he];return pe===void 0&&(pe=new Tr,M[he]=pe),pe.getGripSpace()},this.getHand=function(he){let pe=M[he];return pe===void 0&&(pe=new Tr,M[he]=pe),pe.getHandSpace()},this.setFramebufferScaleFactor=function(he){s=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){o=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(he){if(i=he,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",se),i.addEventListener("inputsourceschange",ue),v.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(L),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,fe=null,j=null;v.depth&&(j=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=v.stencil?Cs:As,fe=v.stencil?Fr:Ki);let Ee={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ee),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Gn(d.textureWidth,d.textureHeight,{format:Wn,type:li,depthTexture:new us(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let pe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Gn(m.framebufferWidth,m.framebufferHeight,{format:Wn,type:li,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),me.setContext(i),me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let ce=new w,we=new w;function Re(he,pe){pe===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(pe.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(i===null)return;let pe=he.near,fe=he.far;f.texture!==null&&(f.depthNear>0&&(pe=f.depthNear),f.depthFar>0&&(fe=f.depthFar)),U.near=k.near=D.near=pe,U.far=k.far=D.far=fe,Z===U.near&&V===U.far||(i.updateRenderState({depthNear:U.near,depthFar:U.far}),Z=U.near,V=U.far),U.layers.mask=6|he.layers.mask,D.layers.mask=3&U.layers.mask,k.layers.mask=5&U.layers.mask;let j=he.parent,Ee=U.cameras;Re(U,j);for(let C=0;C<Ee.length;C++)Re(Ee[C],j);Ee.length===2?(function(C,E,W){ce.setFromMatrixPosition(E.matrixWorld),we.setFromMatrixPosition(W.matrixWorld);let z=ce.distanceTo(we),T=E.projectionMatrix.elements,P=W.projectionMatrix.elements,G=T[14]/(T[10]-1),N=T[14]/(T[10]+1),ae=(T[9]+1)/T[5],Y=(T[9]-1)/T[5],K=(T[8]-1)/T[0],xe=(P[8]+1)/P[0],Le=G*K,Me=G*xe,Fe=z/(-K+xe),Be=Fe*-K;if(E.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(Be),C.translateZ(Fe),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert(),T[10]===-1)C.projectionMatrix.copy(E.projectionMatrix),C.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let We=G+Fe,at=N+Fe,_e=Le-Be,Ne=Me+(z-Be),ye=ae*N/at*We,De=Y*N/at*We;C.projectionMatrix.makePerspective(_e,Ne,ye,De,We,at),C.projectionMatrixInverse.copy(C.projectionMatrix).invert()}})(U,D,k):U.projectionMatrix.copy(D.projectionMatrix),(function(C,E,W){W===null?C.matrix.copy(E.matrixWorld):(C.matrix.copy(W.matrixWorld),C.matrix.invert(),C.matrix.multiply(E.matrixWorld)),C.matrix.decompose(C.position,C.quaternion,C.scale),C.updateMatrixWorld(!0),C.projectionMatrix.copy(E.projectionMatrix),C.projectionMatrixInverse.copy(E.projectionMatrixInverse),C.isPerspectiveCamera&&(C.fov=2*oa*Math.atan(1/C.projectionMatrix.elements[5]),C.zoom=1)})(he,U,j)},this.getCamera=function(){return U},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(he){c=he,d!==null&&(d.fixedFoveation=he),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=he)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(U)},this.getCameraTexture=function(he){return g[he]};let $=null,me=new _u;me.setAnimationLoop(function(he,pe){if(h=pe.getViewerPose(l||a),p=pe,h!==null){let fe=h.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let j=!1;fe.length!==U.cameras.length&&(U.cameras.length=0,j=!0);for(let C=0;C<fe.length;C++){let E=fe[C],W=null;if(m!==null)W=m.getViewport(E);else{let T=u.getViewSubImage(d,E);W=T.viewport,C===0&&(e.setRenderTargetTextures(x,T.colorTexture,T.depthStencilTexture),e.setRenderTarget(x))}let z=I[C];z===void 0&&(z=new kt,z.layers.enable(C),z.viewport=new Tt,I[C]=z),z.matrix.fromArray(E.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(E.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(W.x,W.y,W.width,W.height),C===0&&(U.matrix.copy(z.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),j===!0&&U.cameras.push(z)}let Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let C=u.getDepthInformation(fe[0]);C&&C.isValid&&C.texture&&f.init(C,i.renderState)}if(Ee&&Ee.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let C=0;C<fe.length;C++){let E=fe[C].camera;if(E){let W=g[E];W||(W=new ds,g[E]=W);let z=u.getCameraImage(E);W.sourceTexture=z}}}}for(let fe=0;fe<M.length;fe++){let j=b[fe],Ee=M[fe];j!==null&&Ee!==void 0&&Ee.update(j,pe,l||a)}$&&$(he,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),p=null}),this.setAnimationLoop=function(he){$=he},this.dispose=function(){}}},nr=new $n,Jp=new je;function Kp(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Nn&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Nn&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,nr.copy(c),nr.x*=-1,nr.y*=-1,nr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(nr.y*=-1,nr.z*=-1),i.envMapRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(nr)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Wl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Nn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function $p(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let y=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof y=="number"||typeof y=="boolean"?y:y.clone(),!0;{let g=p[f];if(typeof y=="number"||typeof y=="boolean"){if(g!==y)return p[f]=y,!0}else if(g.equals(y)===!1)return g.copy(y),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,v=0,_=16;for(let M=0,b=g.length;M<b;M++){let L=Array.isArray(g[M])?g[M]:[g[M]];for(let O=0,D=L.length;O<D;O++){let k=L[O],I=Array.isArray(k.value)?k.value:[k.value];for(let U=0,Z=I.length;U<Z;U++){let V=l(I[U]),q=v%_,se=q%V.boundary,ue=q+se;v+=se,ue!==0&&_-ue<V.storage&&(v+=_-ue),k.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=V.storage}}}let x=v%_;x>0&&(v+=_-x),f.__size=v,f.__cache={}})(u),m=(function(f){let g=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),_=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,_,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let y=e.render.frame;s[u.id]!==y&&((function(f){let g=i[f.id],v=f.uniforms,_=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,M=v.length;x<M;x++){let b=Array.isArray(v[x])?v[x]:[v[x]];for(let L=0,O=b.length;L<O;L++){let D=b[L];if(c(D,x,L,_)===!0){let k=D.__offset,I=Array.isArray(D.value)?D.value:[D.value],U=0;for(let Z=0;Z<I.length;Z++){let V=I[Z],q=l(V);typeof V=="number"||typeof V=="boolean"?(D.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,k+U,D.__data)):V.isMatrix3?(D.__data[0]=V.elements[0],D.__data[1]=V.elements[1],D.__data[2]=V.elements[2],D.__data[3]=0,D.__data[4]=V.elements[3],D.__data[5]=V.elements[4],D.__data[6]=V.elements[5],D.__data[7]=0,D.__data[8]=V.elements[6],D.__data[9]=V.elements[7],D.__data[10]=V.elements[8],D.__data[11]=0):(V.toArray(D.__data,U),U+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=y)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Xn=class{constructor(e={}){let{canvas:t=kh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),y=new Int32Array(4),f=null,g=null,v=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=ft;let b=0,L=0,O=null,D=-1,k=null,I=new Tt,U=new Tt,Z=null,V=new qe(0),q=0,se=t.width,ue=t.height,ce=1,we=null,Re=null,$=new Tt(0,0,se,ue),me=new Tt(0,0,se,ue),he=!1,pe=new Li,fe=!1,j=!1,Ee=new je,C=new w,E=new Tt,W={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},z=!1;function T(){return O===null?ce:1}let P,G,N,ae,Y,K,xe,Le,Me,Fe,Be,We,at,_e,Ne,ye,De,Oe,gt,Ae,ot,rt,$t,ln,H=n;function Ut(A,ee){return t.getContext(A,ee)}try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",En,!1),t.addEventListener("webglcontextcreationerror",Xt,!1),H===null){let ee="webgl2";if(H=Ut(ee,A),H===null)throw Ut(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}function Wt(){P=new Ud(H),P.init(),rt=new Zp(H,P),G=new Rd(H,P,e,rt),N=new qp(H,P),G.reversedDepthBuffer&&d&&N.buffers.depth.setReversed(!0),ae=new Bd(H),Y=new Bp,K=new Yp(H,P,N,Y,G,rt,ae),xe=new Id(x),Le=new Dd(x),Me=new bd(H),$t=new Ad(H,Me),Fe=new Nd(H,Me,ae,$t),Be=new zd(H,Fe,Me,ae),gt=new Od(H,G,K),ye=new Pd(Y),We=new Fp(x,xe,Le,P,G,$t,ye),at=new Kp(x,Y),_e=new zp,Ne=new Wp(P),Oe=new Ed(x,xe,Le,N,Be,m,c),De=new Xp(x,Be,G),ln=new $p(H,ae,G,N),Ae=new Cd(H,P,ae),ot=new Fd(H,P,ae),ae.programs=We.programs,x.capabilities=G,x.extensions=P,x.properties=Y,x.renderLists=_e,x.shadowMap=De,x.state=N,x.info=ae}Wt();let lt=new oc(x,H);function Pt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function En(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let A=ae.autoReset,ee=De.enabled,te=De.autoUpdate,ie=De.needsUpdate,J=De.type;Wt(),ae.autoReset=A,De.enabled=ee,De.autoUpdate=te,De.needsUpdate=ie,De.type=J}function Xt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Qt(A){let ee=A.target;ee.removeEventListener("dispose",Qt),(function(te){(function(ie){let J=Y.get(ie).programs;J!==void 0&&(J.forEach(function(ve){We.releaseProgram(ve)}),ie.isShaderMaterial&&We.releaseShaderCache(ie))})(te),Y.remove(te)})(ee)}function Ot(A,ee,te){A.transparent===!0&&A.side===Bt&&A.forceSinglePass===!1?(A.side=Nn,A.needsUpdate=!0,jn(A,ee,te),A.side=Lr,A.needsUpdate=!0,jn(A,ee,te),A.side=Bt):jn(A,ee,te)}this.xr=lt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let A=P.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=P.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(A){A!==void 0&&(ce=A,this.setSize(se,ue,!1))},this.getSize=function(A){return A.set(se,ue)},this.setSize=function(A,ee,te=!0){lt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(se=A,ue=ee,t.width=Math.floor(A*ce),t.height=Math.floor(ee*ce),te===!0&&(t.style.width=A+"px",t.style.height=ee+"px"),this.setViewport(0,0,A,ee))},this.getDrawingBufferSize=function(A){return A.set(se*ce,ue*ce).floor()},this.setDrawingBufferSize=function(A,ee,te){se=A,ue=ee,ce=te,t.width=Math.floor(A*te),t.height=Math.floor(ee*te),this.setViewport(0,0,A,ee)},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy($)},this.setViewport=function(A,ee,te,ie){A.isVector4?$.set(A.x,A.y,A.z,A.w):$.set(A,ee,te,ie),N.viewport(I.copy($).multiplyScalar(ce).round())},this.getScissor=function(A){return A.copy(me)},this.setScissor=function(A,ee,te,ie){A.isVector4?me.set(A.x,A.y,A.z,A.w):me.set(A,ee,te,ie),N.scissor(U.copy(me).multiplyScalar(ce).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(A){N.setScissorTest(he=A)},this.setOpaqueSort=function(A){we=A},this.setTransparentSort=function(A){Re=A},this.getClearColor=function(A){return A.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor(...arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha(...arguments)},this.clear=function(A=!0,ee=!0,te=!0){let ie=0;if(A){let J=!1;if(O!==null){let ve=O.texture.format;J=ve===dl||ve===ul||ve===eo}if(J){let ve=O.texture.type,ze=ve===li||ve===Ki||ve===Nr||ve===Fr||ve===Ka||ve===$a,Pe=Oe.getClearColor(),Ve=Oe.getClearAlpha(),Qe=Pe.r,Ye=Pe.g,et=Pe.b;ze?(p[0]=Qe,p[1]=Ye,p[2]=et,p[3]=Ve,H.clearBufferuiv(H.COLOR,0,p)):(y[0]=Qe,y[1]=Ye,y[2]=et,y[3]=Ve,H.clearBufferiv(H.COLOR,0,y))}else ie|=H.COLOR_BUFFER_BIT}ee&&(ie|=H.DEPTH_BUFFER_BIT),te&&(ie|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",En,!1),t.removeEventListener("webglcontextcreationerror",Xt,!1),Oe.dispose(),_e.dispose(),Ne.dispose(),Y.dispose(),xe.dispose(),Le.dispose(),Be.dispose(),$t.dispose(),ln.dispose(),We.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",sn),lt.removeEventListener("sessionend",It),zt.stop()},this.renderBufferDirect=function(A,ee,te,ie,J,ve){ee===null&&(ee=W);let ze=J.isMesh&&J.matrixWorld.determinant()<0,Pe=(function(ht,tt,Yt,ut,$e){tt.isScene!==!0&&(tt=W),K.resetTextureUnits();let An=tt.fog,Fi=ut.isMeshStandardMaterial?tt.environment:null,rr=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Hi,qn=(ut.isMeshStandardMaterial?Le:xe).get(ut.envMap||Fi),S=ut.vertexColors===!0&&!!Yt.attributes.color&&Yt.attributes.color.itemSize===4,R=!!Yt.attributes.tangent&&(!!ut.normalMap||ut.anisotropy>0),F=!!Yt.morphAttributes.position,Q=!!Yt.morphAttributes.normal,B=!!Yt.morphAttributes.color,le=Ti;ut.toneMapped&&(O!==null&&O.isXRRenderTarget!==!0||(le=x.toneMapping));let X=Yt.morphAttributes.position||Yt.morphAttributes.normal||Yt.morphAttributes.color,oe=X!==void 0?X.length:0,re=Y.get(ut),Xe=g.state.lights;if(fe===!0&&(j===!0||ht!==k)){let wt=ht===k&&ut.id===D;ye.setState(ut,ht,wt)}let Te=!1;ut.version===re.__version?re.needsLights&&re.lightsStateVersion!==Xe.state.version||re.outputColorSpace!==rr||$e.isBatchedMesh&&re.batching===!1?Te=!0:$e.isBatchedMesh||re.batching!==!0?$e.isBatchedMesh&&re.batchingColor===!0&&$e.colorTexture===null||$e.isBatchedMesh&&re.batchingColor===!1&&$e.colorTexture!==null||$e.isInstancedMesh&&re.instancing===!1?Te=!0:$e.isInstancedMesh||re.instancing!==!0?$e.isSkinnedMesh&&re.skinning===!1?Te=!0:$e.isSkinnedMesh||re.skinning!==!0?$e.isInstancedMesh&&re.instancingColor===!0&&$e.instanceColor===null||$e.isInstancedMesh&&re.instancingColor===!1&&$e.instanceColor!==null||$e.isInstancedMesh&&re.instancingMorph===!0&&$e.morphTexture===null||$e.isInstancedMesh&&re.instancingMorph===!1&&$e.morphTexture!==null||re.envMap!==qn||ut.fog===!0&&re.fog!==An?Te=!0:re.numClippingPlanes===void 0||re.numClippingPlanes===ye.numPlanes&&re.numIntersection===ye.numIntersection?(re.vertexAlphas!==S||re.vertexTangents!==R||re.morphTargets!==F||re.morphNormals!==Q||re.morphColors!==B||re.toneMapping!==le||re.morphTargetsCount!==oe)&&(Te=!0):Te=!0:Te=!0:Te=!0:Te=!0:(Te=!0,re.__version=ut.version);let Ce=re.currentProgram;Te===!0&&(Ce=jn(ut,tt,$e));let ne=!1,ge=!1,Ge=!1,Se=Ce.getUniforms(),be=re.uniforms;if(N.useProgram(Ce.program)&&(ne=!0,ge=!0,Ge=!0),ut.id!==D&&(D=ut.id,ge=!0),ne||k!==ht){N.buffers.depth.getReversed()&&ht.reversedDepth!==!0&&(ht._reversedDepth=!0,ht.updateProjectionMatrix()),Se.setValue(H,"projectionMatrix",ht.projectionMatrix),Se.setValue(H,"viewMatrix",ht.matrixWorldInverse);let wt=Se.map.cameraPosition;wt!==void 0&&wt.setValue(H,C.setFromMatrixPosition(ht.matrixWorld)),G.logarithmicDepthBuffer&&Se.setValue(H,"logDepthBufFC",2/(Math.log(ht.far+1)/Math.LN2)),(ut.isMeshPhongMaterial||ut.isMeshToonMaterial||ut.isMeshLambertMaterial||ut.isMeshBasicMaterial||ut.isMeshStandardMaterial||ut.isShaderMaterial)&&Se.setValue(H,"isOrthographic",ht.isOrthographicCamera===!0),k!==ht&&(k=ht,ge=!0,Ge=!0)}if($e.isSkinnedMesh){Se.setOptional(H,$e,"bindMatrix"),Se.setOptional(H,$e,"bindMatrixInverse");let wt=$e.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),Se.setValue(H,"boneTexture",wt.boneTexture,K))}$e.isBatchedMesh&&(Se.setOptional(H,$e,"batchingTexture"),Se.setValue(H,"batchingTexture",$e._matricesTexture,K),Se.setOptional(H,$e,"batchingIdTexture"),Se.setValue(H,"batchingIdTexture",$e._indirectTexture,K),Se.setOptional(H,$e,"batchingColorTexture"),$e._colorsTexture!==null&&Se.setValue(H,"batchingColorTexture",$e._colorsTexture,K));let Ze=Yt.morphAttributes;Ze.position===void 0&&Ze.normal===void 0&&Ze.color===void 0||gt.update($e,Yt,Ce),(ge||re.receiveShadow!==$e.receiveShadow)&&(re.receiveShadow=$e.receiveShadow,Se.setValue(H,"receiveShadow",$e.receiveShadow)),ut.isMeshGouraudMaterial&&ut.envMap!==null&&(be.envMap.value=qn,be.flipEnvMap.value=qn.isCubeTexture&&qn.isRenderTargetTexture===!1?-1:1),ut.isMeshStandardMaterial&&ut.envMap===null&&tt.environment!==null&&(be.envMapIntensity.value=tt.environmentIntensity),ge&&(Se.setValue(H,"toneMappingExposure",x.toneMappingExposure),re.needsLights&&(Gt=Ge,(nt=be).ambientLightColor.needsUpdate=Gt,nt.lightProbe.needsUpdate=Gt,nt.directionalLights.needsUpdate=Gt,nt.directionalLightShadows.needsUpdate=Gt,nt.pointLights.needsUpdate=Gt,nt.pointLightShadows.needsUpdate=Gt,nt.spotLights.needsUpdate=Gt,nt.spotLightShadows.needsUpdate=Gt,nt.rectAreaLights.needsUpdate=Gt,nt.hemisphereLights.needsUpdate=Gt),An&&ut.fog===!0&&at.refreshFogUniforms(be,An),at.refreshMaterialUniforms(be,ut,ce,ue,g.state.transmissionRenderTarget[ht.id]),Or.upload(H,Mn(re),be,K));var nt,Gt;if(ut.isShaderMaterial&&ut.uniformsNeedUpdate===!0&&(Or.upload(H,Mn(re),be,K),ut.uniformsNeedUpdate=!1),ut.isSpriteMaterial&&Se.setValue(H,"center",$e.center),Se.setValue(H,"modelViewMatrix",$e.modelViewMatrix),Se.setValue(H,"normalMatrix",$e.normalMatrix),Se.setValue(H,"modelMatrix",$e.matrixWorld),ut.isShaderMaterial||ut.isRawShaderMaterial){let wt=ut.uniformsGroups;for(let Fn=0,Bn=wt.length;Fn<Bn;Fn++){let Bi=wt[Fn];ln.update(Bi,Ce),ln.bind(Bi,Ce)}}return Ce})(A,ee,te,ie,J);N.setMaterial(ie,ze);let Ve=te.index,Qe=1;if(ie.wireframe===!0){if(Ve=Fe.getWireframeAttribute(te),Ve===void 0)return;Qe=2}let Ye=te.drawRange,et=te.attributes.position,it=Ye.start*Qe,Lt=(Ye.start+Ye.count)*Qe;ve!==null&&(it=Math.max(it,ve.start*Qe),Lt=Math.min(Lt,(ve.start+ve.count)*Qe)),Ve!==null?(it=Math.max(it,0),Lt=Math.min(Lt,Ve.count)):et!=null&&(it=Math.max(it,0),Lt=Math.min(Lt,et.count));let Dt=Lt-it;if(Dt<0||Dt===1/0)return;let vt;$t.setup(J,ie,Pe,te,Ve);let Rt=Ae;if(Ve!==null&&(vt=Me.get(Ve),Rt=ot,Rt.setIndex(vt)),J.isMesh)ie.wireframe===!0?(N.setLineWidth(ie.wireframeLinewidth*T()),Rt.setMode(H.LINES)):Rt.setMode(H.TRIANGLES);else if(J.isLine){let ht=ie.linewidth;ht===void 0&&(ht=1),N.setLineWidth(ht*T()),J.isLineSegments?Rt.setMode(H.LINES):J.isLineLoop?Rt.setMode(H.LINE_LOOP):Rt.setMode(H.LINE_STRIP)}else J.isPoints?Rt.setMode(H.POINTS):J.isSprite&&Rt.setMode(H.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)xr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Rt.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))Rt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let ht=J._multiDrawStarts,tt=J._multiDrawCounts,Yt=J._multiDrawCount,ut=Ve?Me.get(Ve).bytesPerElement:1,$e=Y.get(ie).currentProgram.getUniforms();for(let An=0;An<Yt;An++)$e.setValue(H,"_gl_DrawID",An),Rt.render(ht[An]/ut,tt[An])}else if(J.isInstancedMesh)Rt.renderInstances(it,Dt,J.count);else if(te.isInstancedBufferGeometry){let ht=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,tt=Math.min(te.instanceCount,ht);Rt.renderInstances(it,Dt,tt)}else Rt.render(it,Dt)},this.compile=function(A,ee,te=null){te===null&&(te=A),g=Ne.get(te),g.init(ee),_.push(g),te.traverseVisible(function(J){J.isLight&&J.layers.test(ee.layers)&&(g.pushLight(J),J.castShadow&&g.pushShadow(J))}),A!==te&&A.traverseVisible(function(J){J.isLight&&J.layers.test(ee.layers)&&(g.pushLight(J),J.castShadow&&g.pushShadow(J))}),g.setupLights();let ie=new Set;return A.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let ve=J.material;if(ve)if(Array.isArray(ve))for(let ze=0;ze<ve.length;ze++){let Pe=ve[ze];Ot(Pe,te,J),ie.add(Pe)}else Ot(ve,te,J),ie.add(ve)}),g=_.pop(),ie},this.compileAsync=function(A,ee,te=null){let ie=this.compile(A,ee,te);return new Promise(J=>{function ve(){ie.forEach(function(ze){Y.get(ze).currentProgram.isReady()&&ie.delete(ze)}),ie.size!==0?setTimeout(ve,10):J(A)}P.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let st=null;function sn(){zt.stop()}function It(){zt.start()}let zt=new _u;function en(A,ee,te,ie){if(A.visible===!1)return;if(A.layers.test(ee.layers)){if(A.isGroup)te=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(ee);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||pe.intersectsSprite(A)){ie&&E.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ee);let ve=Be.update(A),ze=A.material;ze.visible&&f.push(A,ve,ze,te,E.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||pe.intersectsObject(A))){let ve=Be.update(A),ze=A.material;if(ie&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),E.copy(A.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),E.copy(ve.boundingSphere.center)),E.applyMatrix4(A.matrixWorld).applyMatrix4(Ee)),Array.isArray(ze)){let Pe=ve.groups;for(let Ve=0,Qe=Pe.length;Ve<Qe;Ve++){let Ye=Pe[Ve],et=ze[Ye.materialIndex];et&&et.visible&&f.push(A,ve,et,te,E.z,Ye)}}else ze.visible&&f.push(A,ve,ze,te,E.z,null)}}let J=A.children;for(let ve=0,ze=J.length;ve<ze;ve++)en(J[ve],ee,te,ie)}function tn(A,ee,te,ie){let J=A.opaque,ve=A.transmissive,ze=A.transparent;g.setupLightsView(te),fe===!0&&ye.setGlobalState(x.clippingPlanes,te),ie&&N.viewport(I.copy(ie)),J.length>0&&cn(J,ee,te),ve.length>0&&cn(ve,ee,te),ze.length>0&&cn(ze,ee,te),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function fn(A,ee,te,ie){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ie.id]===void 0&&(g.state.transmissionRenderTarget[ie.id]=new Gn(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?Ni:li,minFilter:Ji,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace}));let J=g.state.transmissionRenderTarget[ie.id],ve=ie.viewport||I;J.setSize(ve.z*x.transmissionResolutionScale,ve.w*x.transmissionResolutionScale);let ze=x.getRenderTarget(),Pe=x.getActiveCubeFace(),Ve=x.getActiveMipmapLevel();x.setRenderTarget(J),x.getClearColor(V),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),z&&Oe.render(te);let Qe=x.toneMapping;x.toneMapping=Ti;let Ye=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),g.setupLightsView(ie),fe===!0&&ye.setGlobalState(x.clippingPlanes,ie),cn(A,te,ie),K.updateMultisampleRenderTarget(J),K.updateRenderTargetMipmap(J),P.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let it=0,Lt=ee.length;it<Lt;it++){let Dt=ee[it],vt=Dt.object,Rt=Dt.geometry,ht=Dt.material,tt=Dt.group;if(ht.side===Bt&&vt.layers.test(ie.layers)){let Yt=ht.side;ht.side=Nn,ht.needsUpdate=!0,gn(vt,te,ie,Rt,ht,tt),ht.side=Yt,ht.needsUpdate=!0,et=!0}}et===!0&&(K.updateMultisampleRenderTarget(J),K.updateRenderTargetMipmap(J))}x.setRenderTarget(ze,Pe,Ve),x.setClearColor(V,q),Ye!==void 0&&(ie.viewport=Ye),x.toneMapping=Qe}function cn(A,ee,te){let ie=ee.isScene===!0?ee.overrideMaterial:null;for(let J=0,ve=A.length;J<ve;J++){let ze=A[J],Pe=ze.object,Ve=ze.geometry,Qe=ze.group,Ye=ze.material;Ye.allowOverride===!0&&ie!==null&&(Ye=ie),Pe.layers.test(te.layers)&&gn(Pe,ee,te,Ve,Ye,Qe)}}function gn(A,ee,te,ie,J,ve){A.onBeforeRender(x,ee,te,ie,J,ve),A.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),J.onBeforeRender(x,ee,te,ie,A,ve),J.transparent===!0&&J.side===Bt&&J.forceSinglePass===!1?(J.side=Nn,J.needsUpdate=!0,x.renderBufferDirect(te,ee,ie,J,A,ve),J.side=Lr,J.needsUpdate=!0,x.renderBufferDirect(te,ee,ie,J,A,ve),J.side=Bt):x.renderBufferDirect(te,ee,ie,J,A,ve),A.onAfterRender(x,ee,te,ie,J,ve)}function jn(A,ee,te){ee.isScene!==!0&&(ee=W);let ie=Y.get(A),J=g.state.lights,ve=g.state.shadowsArray,ze=J.state.version,Pe=We.getParameters(A,J.state,ve,ee,te),Ve=We.getProgramCacheKey(Pe),Qe=ie.programs;ie.environment=A.isMeshStandardMaterial?ee.environment:null,ie.fog=ee.fog,ie.envMap=(A.isMeshStandardMaterial?Le:xe).get(A.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&A.envMap===null?ee.environmentRotation:A.envMapRotation,Qe===void 0&&(A.addEventListener("dispose",Qt),Qe=new Map,ie.programs=Qe);let Ye=Qe.get(Ve);if(Ye!==void 0){if(ie.currentProgram===Ye&&ie.lightsStateVersion===ze)return nn(A,Pe),Ye}else Pe.uniforms=We.getUniforms(A),A.onBeforeCompile(Pe,x),Ye=We.acquireProgram(Pe,Ve),Qe.set(Ve,Ye),ie.uniforms=Pe.uniforms;let et=ie.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(et.clippingPlanes=ye.uniform),nn(A,Pe),ie.needsLights=(function(it){return it.isMeshLambertMaterial||it.isMeshToonMaterial||it.isMeshPhongMaterial||it.isMeshStandardMaterial||it.isShadowMaterial||it.isShaderMaterial&&it.lights===!0})(A),ie.lightsStateVersion=ze,ie.needsLights&&(et.ambientLightColor.value=J.state.ambient,et.lightProbe.value=J.state.probe,et.directionalLights.value=J.state.directional,et.directionalLightShadows.value=J.state.directionalShadow,et.spotLights.value=J.state.spot,et.spotLightShadows.value=J.state.spotShadow,et.rectAreaLights.value=J.state.rectArea,et.ltc_1.value=J.state.rectAreaLTC1,et.ltc_2.value=J.state.rectAreaLTC2,et.pointLights.value=J.state.point,et.pointLightShadows.value=J.state.pointShadow,et.hemisphereLights.value=J.state.hemi,et.directionalShadowMap.value=J.state.directionalShadowMap,et.directionalShadowMatrix.value=J.state.directionalShadowMatrix,et.spotShadowMap.value=J.state.spotShadowMap,et.spotLightMatrix.value=J.state.spotLightMatrix,et.spotLightMap.value=J.state.spotLightMap,et.pointShadowMap.value=J.state.pointShadowMap,et.pointShadowMatrix.value=J.state.pointShadowMatrix),ie.currentProgram=Ye,ie.uniformsList=null,Ye}function Mn(A){if(A.uniformsList===null){let ee=A.currentProgram.getUniforms();A.uniformsList=Or.seqWithValue(ee.seq,A.uniforms)}return A.uniformsList}function nn(A,ee){let te=Y.get(A);te.outputColorSpace=ee.outputColorSpace,te.batching=ee.batching,te.batchingColor=ee.batchingColor,te.instancing=ee.instancing,te.instancingColor=ee.instancingColor,te.instancingMorph=ee.instancingMorph,te.skinning=ee.skinning,te.morphTargets=ee.morphTargets,te.morphNormals=ee.morphNormals,te.morphColors=ee.morphColors,te.morphTargetsCount=ee.morphTargetsCount,te.numClippingPlanes=ee.numClippingPlanes,te.numIntersection=ee.numClipIntersection,te.vertexAlphas=ee.vertexAlphas,te.vertexTangents=ee.vertexTangents,te.toneMapping=ee.toneMapping}zt.setAnimationLoop(function(A){st&&st(A)}),typeof self<"u"&&zt.setContext(self),this.setAnimationLoop=function(A){st=A,lt.setAnimationLoop(A),A===null?zt.stop():zt.start()},lt.addEventListener("sessionstart",sn),lt.addEventListener("sessionend",It),this.render=function(A,ee){if(ee!==void 0&&ee.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(ee),ee=lt.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,ee,O),g=Ne.get(A,_.length),g.init(ee),_.push(g),Ee.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),pe.setFromProjectionMatrix(Ee,_i,ee.reversedDepth),j=this.localClippingEnabled,fe=ye.init(this.clippingPlanes,j),f=_e.get(A,v.length),f.init(),v.push(f),lt.enabled===!0&&lt.isPresenting===!0){let ve=x.xr.getDepthSensingMesh();ve!==null&&en(ve,ee,-1/0,x.sortObjects)}en(A,ee,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(we,Re),z=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,z&&Oe.addToRenderList(f,A),this.info.render.frame++,fe===!0&&ye.beginShadows();let te=g.state.shadowsArray;De.render(te,A,ee),fe===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();let ie=f.opaque,J=f.transmissive;if(g.setupLights(),ee.isArrayCamera){let ve=ee.cameras;if(J.length>0)for(let ze=0,Pe=ve.length;ze<Pe;ze++)fn(ie,J,A,ve[ze]);z&&Oe.render(A);for(let ze=0,Pe=ve.length;ze<Pe;ze++){let Ve=ve[ze];tn(f,A,Ve,Ve.viewport)}}else J.length>0&&fn(ie,J,A,ee),z&&Oe.render(A),tn(f,A,ee);O!==null&&L===0&&(K.updateMultisampleRenderTarget(O),K.updateRenderTargetMipmap(O)),A.isScene===!0&&A.onAfterRender(x,A,ee),$t.resetDefaultState(),D=-1,k=null,_.pop(),_.length>0?(g=_[_.length-1],fe===!0&&ye.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(A,ee,te){let ie=Y.get(A);ie.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),Y.get(A.texture).__webglTexture=ee,Y.get(A.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:te,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,ee){let te=Y.get(A);te.__webglFramebuffer=ee,te.__useDefaultFramebuffer=ee===void 0};let Qn=H.createFramebuffer();this.setRenderTarget=function(A,ee=0,te=0){O=A,b=ee,L=te;let ie=!0,J=null,ve=!1,ze=!1;if(A){let Pe=Y.get(A);if(Pe.__useDefaultFramebuffer!==void 0)N.bindFramebuffer(H.FRAMEBUFFER,null),ie=!1;else if(Pe.__webglFramebuffer===void 0)K.setupRenderTarget(A);else if(Pe.__hasExternalTextures)K.rebindTextures(A,Y.get(A.texture).__webglTexture,Y.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ye=A.depthTexture;if(Pe.__boundDepthTexture!==Ye){if(Ye!==null&&Y.has(Ye)&&(A.width!==Ye.image.width||A.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(A)}}let Ve=A.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ze=!0);let Qe=Y.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(J=Array.isArray(Qe[ee])?Qe[ee][te]:Qe[ee],ve=!0):J=A.samples>0&&K.useMultisampledRTT(A)===!1?Y.get(A).__webglMultisampledFramebuffer:Array.isArray(Qe)?Qe[te]:Qe,I.copy(A.viewport),U.copy(A.scissor),Z=A.scissorTest}else I.copy($).multiplyScalar(ce).floor(),U.copy(me).multiplyScalar(ce).floor(),Z=he;if(te!==0&&(J=Qn),N.bindFramebuffer(H.FRAMEBUFFER,J)&&ie&&N.drawBuffers(A,J),N.viewport(I),N.scissor(U),N.setScissorTest(Z),ve){let Pe=Y.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe.__webglTexture,te)}else if(ze){let Pe=ee;for(let Ve=0;Ve<A.textures.length;Ve++){let Qe=Y.get(A.textures[Ve]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Ve,Qe.__webglTexture,te,Pe)}}else if(A!==null&&te!==0){let Pe=Y.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Pe.__webglTexture,te)}D=-1},this.readRenderTargetPixels=function(A,ee,te,ie,J,ve,ze,Pe=0){if(!A||!A.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=Y.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ze!==void 0&&(Ve=Ve[ze]),Ve){N.bindFramebuffer(H.FRAMEBUFFER,Ve);try{let Qe=A.textures[Pe],Ye=Qe.format,et=Qe.type;if(!G.textureFormatReadable(Ye))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(et))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");ee>=0&&ee<=A.width-ie&&te>=0&&te<=A.height-J&&(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Pe),H.readPixels(ee,te,ie,J,rt.convert(Ye),rt.convert(et),ve))}finally{let Qe=O!==null?Y.get(O).__webglFramebuffer:null;N.bindFramebuffer(H.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(A,ee,te,ie,J,ve,ze,Pe=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=Y.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ze!==void 0&&(Ve=Ve[ze]),Ve){if(ee>=0&&ee<=A.width-ie&&te>=0&&te<=A.height-J){N.bindFramebuffer(H.FRAMEBUFFER,Ve);let Qe=A.textures[Pe],Ye=Qe.format,et=Qe.type;if(!G.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let it=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,it),H.bufferData(H.PIXEL_PACK_BUFFER,ve.byteLength,H.STREAM_READ),A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Pe),H.readPixels(ee,te,ie,J,rt.convert(Ye),rt.convert(et),0);let Lt=O!==null?Y.get(O).__webglFramebuffer:null;N.bindFramebuffer(H.FRAMEBUFFER,Lt);let Dt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Vh(H,Dt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,it),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,ve),H.deleteBuffer(it),H.deleteSync(Dt),ve}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,ee=null,te=0){let ie=Math.pow(2,-te),J=Math.floor(A.image.width*ie),ve=Math.floor(A.image.height*ie),ze=ee!==null?ee.x:0,Pe=ee!==null?ee.y:0;K.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,te,0,0,ze,Pe,J,ve),N.unbindTexture()};let bt=H.createFramebuffer(),Ct=H.createFramebuffer();this.copyTextureToTexture=function(A,ee,te=null,ie=null,J=0,ve=null){let ze,Pe,Ve,Qe,Ye,et,it,Lt,Dt;ve===null&&(J!==0?(xr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=J,J=0):ve=0);let vt=A.isCompressedTexture?A.mipmaps[ve]:A.image;if(te!==null)ze=te.max.x-te.min.x,Pe=te.max.y-te.min.y,Ve=te.isBox3?te.max.z-te.min.z:1,Qe=te.min.x,Ye=te.min.y,et=te.isBox3?te.min.z:0;else{let S=Math.pow(2,-J);ze=Math.floor(vt.width*S),Pe=Math.floor(vt.height*S),Ve=A.isDataArrayTexture?vt.depth:A.isData3DTexture?Math.floor(vt.depth*S):1,Qe=0,Ye=0,et=0}ie!==null?(it=ie.x,Lt=ie.y,Dt=ie.z):(it=0,Lt=0,Dt=0);let Rt=rt.convert(ee.format),ht=rt.convert(ee.type),tt;ee.isData3DTexture?(K.setTexture3D(ee,0),tt=H.TEXTURE_3D):ee.isDataArrayTexture||ee.isCompressedArrayTexture?(K.setTexture2DArray(ee,0),tt=H.TEXTURE_2D_ARRAY):(K.setTexture2D(ee,0),tt=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,ee.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,ee.unpackAlignment);let Yt=H.getParameter(H.UNPACK_ROW_LENGTH),ut=H.getParameter(H.UNPACK_IMAGE_HEIGHT),$e=H.getParameter(H.UNPACK_SKIP_PIXELS),An=H.getParameter(H.UNPACK_SKIP_ROWS),Fi=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,vt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,vt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Qe),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ye),H.pixelStorei(H.UNPACK_SKIP_IMAGES,et);let rr=A.isDataArrayTexture||A.isData3DTexture,qn=ee.isDataArrayTexture||ee.isData3DTexture;if(A.isDepthTexture){let S=Y.get(A),R=Y.get(ee),F=Y.get(S.__renderTarget),Q=Y.get(R.__renderTarget);N.bindFramebuffer(H.READ_FRAMEBUFFER,F.__webglFramebuffer),N.bindFramebuffer(H.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let B=0;B<Ve;B++)rr&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(A).__webglTexture,J,et+B),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(ee).__webglTexture,ve,Dt+B)),H.blitFramebuffer(Qe,Ye,ze,Pe,it,Lt,ze,Pe,H.DEPTH_BUFFER_BIT,H.NEAREST);N.bindFramebuffer(H.READ_FRAMEBUFFER,null),N.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(J!==0||A.isRenderTargetTexture||Y.has(A)){let S=Y.get(A),R=Y.get(ee);N.bindFramebuffer(H.READ_FRAMEBUFFER,bt),N.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ct);for(let F=0;F<Ve;F++)rr?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,S.__webglTexture,J,et+F):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,S.__webglTexture,J),qn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,R.__webglTexture,ve,Dt+F):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,R.__webglTexture,ve),J!==0?H.blitFramebuffer(Qe,Ye,ze,Pe,it,Lt,ze,Pe,H.COLOR_BUFFER_BIT,H.NEAREST):qn?H.copyTexSubImage3D(tt,ve,it,Lt,Dt+F,Qe,Ye,ze,Pe):H.copyTexSubImage2D(tt,ve,it,Lt,Qe,Ye,ze,Pe);N.bindFramebuffer(H.READ_FRAMEBUFFER,null),N.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else qn?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(tt,ve,it,Lt,Dt,ze,Pe,Ve,Rt,ht,vt.data):ee.isCompressedArrayTexture?H.compressedTexSubImage3D(tt,ve,it,Lt,Dt,ze,Pe,Ve,Rt,vt.data):H.texSubImage3D(tt,ve,it,Lt,Dt,ze,Pe,Ve,Rt,ht,vt):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,ve,it,Lt,ze,Pe,Rt,ht,vt.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,ve,it,Lt,vt.width,vt.height,Rt,vt.data):H.texSubImage2D(H.TEXTURE_2D,ve,it,Lt,ze,Pe,Rt,ht,vt);H.pixelStorei(H.UNPACK_ROW_LENGTH,Yt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ut),H.pixelStorei(H.UNPACK_SKIP_PIXELS,$e),H.pixelStorei(H.UNPACK_SKIP_ROWS,An),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Fi),ve===0&&ee.generateMipmaps&&H.generateMipmap(tt),N.unbindTexture()},this.initRenderTarget=function(A){Y.get(A).__webglFramebuffer===void 0&&K.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?K.setTextureCube(A,0):A.isData3DTexture?K.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?K.setTexture2DArray(A,0):K.setTexture2D(A,0),N.unbindTexture()},this.resetState=function(){b=0,L=0,O=null,N.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};function Tu({paint:r,carbon:e,metal:t}){let n=new ke;n.name="formula-cockpit";function i(d,m,p,y){let f=new Je(new xt(new yt(d.map(g=>new w(...g))),40,m,10,!1),p);return f.name=y,f.castShadow=f.receiveShadow=!0,n.add(f),f}i([[-1.03,1.47,-.49],[-.97,1.98,-.46],[-.38,2.03,-.43],[.38,1.96,-.29],[.6,1.87,0],[.38,1.96,.29],[-.38,2.03,.43],[-.97,1.98,.46],[-1.03,1.47,.49]],.043,e,"halo-ring"),i([[.6,1.87,0],[.69,1.56,0],[.78,1.22,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.29],[-1.27,2.12,-.23],[-1.22,2.22,0],[-1.27,2.12,.23],[-1.25,1.4,.29]],.048,e,"roll-hoop");for(let d of[-1,1])for(let m of[.67,.94])i([[1.19,m,d*.34],[1.92,m-.12,d*1.24],[2.22,m,d*.31]],.024,e,"front-wishbone");let s=new ke;s.name="formula-engine-cover";let a=[],o=[],c=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],l=32;c.forEach(([d,m,p,y],f)=>{for(let g=0;g<=l;g++){let v=g/l*Math.PI*2;if(a.push(d,m+Math.sin(v)*y,Math.cos(v)*p),f<c.length-1&&g<l){let _=f*(l+1)+g,x=_+l+1;o.push(_,x,_+1,_+1,x,x+1)}}});for(let d of[0,c.length-1])for(let m=1;m<l-1;m++){let p=d*(l+1);d===0?o.push(p,p+m,p+m+1):o.push(p,p+m+1,p+m)}let h=new dt;h.setAttribute("position",new Ie(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new Je(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let m=0;m<5;m++){let p=new Je(new Ke(.025,.07,.19),e);p.position.set(-1.48-m*.13,1.57-m*.055,d*.31),p.rotation.z=-.2,s.add(p)}return n.add(s),{group:n,engine:s}}var ho=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function uo(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,c,l)=>{if(l===1){let h=ho(o,.25,.12),u=ho(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,c*=n,c+=s*u*(c>0?1:.15)}if(l===2){let h=(i-1)*ho(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),c*=1+h}if(l===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*ho(o,.69,.16);a=h+(a-h)*(1+u),c*=1+u}return[a,o,c]}}function bu(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new _t({color:i[t]||"#30241d",roughness:.96}),a=new ke;function o(c,l,h,u,d,m,p=0){let y=new qt(1,12,10);n.push(y);let f=new Je(y,s);f.position.set(c,l,h),f.scale.set(u,d,m),f.rotation.z=p,a.add(f)}if(t!=="hairBald"){let c=t==="hairBuzz",l=t==="hairAfro",h=t==="hairMohawk"||t==="hairBlue",u=t==="hairDreads",d=t==="hairRocker";for(let m=0;m<7;m++)for(let p=0;p<12;p++){let y=p/12*Math.PI*2,f=m/7*Math.PI*.57;if(h&&Math.abs(Math.cos(y))>.27)continue;let g=Math.cos(y)*Math.sin(f)*.23,v=.1+Math.sin(y)*Math.sin(f)*.24,_=t==="hairCurly"||l,x=c?.026:_?.067:.045,M=c?.018:l?.12:h?.16:_?.065:.075,b=1.62+Math.cos(f)*.29;t==="hairPompadour"&&(M+=Math.max(0,Math.sin(y))*.1,b+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(b+=g*.16),(u||d)&&(M=m>3?.18:.065,b-=m>3?.07:0),o(g,b,v,x,M,x,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(a),a.position.copy(r.bones.head.userData.rest?new w(...r.bones.head.userData.rest).negate():new w),{dispose(){a.removeFromParent(),n.forEach(c=>c.dispose()),s.dispose()}}}function wu(r,e,t){let n=[],i=[],s=uo(e.body),a=new _t({color:t.item("suit",e.suit).color,roughness:.93,metalness:0}),o=new _t({color:new qe(t.item("suit",e.suit).color).multiplyScalar(.7),roughness:.9}),c=new _t({color:"#e8e5db",roughness:.88}),l=new _t({color:"#1b1f22",roughness:.8}),h=new _t({color:new qe(t.item("pants",e.pants).color).multiplyScalar(.62),roughness:.95}),u=new _t({color:"#ad8c70",roughness:.72}),d=new _t({color:t.item("shoes",e.shoes).color,roughness:.62});i.push(a,o,c,l,d,h,u);function m(g,v,_){let x=g.getAttribute("position"),M=[],b=[];for(let L=0;L<x.count;L++){let O=s(x.getX(L),.5-x.getY(L)/3.825,x.getZ(L),_);x.setXYZ(L,O[0],(.5-O[1])*3.825,O[2]),M.push(.5+x.getX(L)/2.55,.5-x.getY(L)/3.825),b.push(_)}return g.setAttribute("bodyUv",new Ie(M,2)),g.setAttribute("surface",new Ie(b,1)),n.push(g),r.mesh(g,v)}function p(g,v,_,x=.003){let M=new yt(g.map(b=>new w(...b)));return m(new xt(M,24,x,6,!1),v,_)}function y(g,v,_){let x=new dt,M=g.flat();x.setAttribute("position",new Ie(M,3));let b=[];for(let L=1;L<g.length-1;L++)b.push(0,L,L+1);return x.setIndex(b),x.computeVertexNormals(),v.side=Bt,m(x,v,_)}if(["classic","ruby","midnight"].includes(e.suit)){for(let g of[-1,1])p([[g*.2,1.05,-.207],[g*.35,.82,-.254],[g*.38,.38,-.244],[g*.3,.14,-.201]],o,1,.0025);p([[0,1.14,-.19],[0,.8,-.281],[0,.31,-.255],[0,.13,-.218]],o,1,.003);for(let g of[.37,.17]){let v=new He(.013,.013,.008,16);v.rotateX(Math.PI/2),v.translate(.04,g,.275),m(v,l,1)}}for(let g of[-1,1])for(let v=0;v<4;v++){let _=new qt(1,10,8),x=.166+v*.019,M=[.039,.046,.043,.034][v],b=.54+v*.002;_.scale(.013,.022,.006),_.translate(g*(.5-(x+.009))*2.55,(.5-(b+M*.72))*3.825,.117),m(_,u,3)}for(let g of[-1,1]){let v=g*.45;y([[v-.064,-1.54,.113],[v+.064,-1.54,.113],[v+.077,-1.69,.315],[v-.077,-1.69,.315]],d,5);for(let _=0;_<5;_++){let x=-1.56-_*.026,M=.14+_*.043;p([[v-.062,x,M],[v,x-.008,M+.01],[v+.062,x-.014,M]],c,5,.0035),p([[v+.062,x,M+.001],[v,x-.008,M+.011],[v-.062,x-.014,M+.001]],c,5,.0035)}p([[v-.115,-1.77,.21],[v-.11,-1.77,.35],[v,-1.77,.38],[v+.11,-1.77,.35],[v+.115,-1.77,.21]],d,5,.003),p([[v-.08,-1.55,-.07],[v,-1.52,-.087],[v+.08,-1.55,-.07]],l,5,.006)}return{dispose(){n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}var hi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Eu(r){let e=[],t={};function n(y,f,g,v,_=0){let x=new br;x.name=y;let M=f?f.userData.rest:[0,0,0];return x.position.set(g-M[0],v-M[1],_-M[2]),x.userData.rest=[g,v,_],(f||r).add(x),e.push(x),t[y]=x,x}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[y,f]of[["left",-1],["right",1]]){let g=n(y+"Shoulder",a,f*.49,1.09),v=n(y+"Elbow",g,f*.66,.57),_=n(y+"Wrist",v,f*.78,.04,.035),x=n(y+"Hand",_,f*.79,-.15,.07);for(let L=0;L<4;L++)n(y+"Finger"+L,x,f*(.5-(.175+L*.019))*2.55,-.17-L*.007,.07);n(y+"Thumb",x,f*.63,-.13,.11);let M=n(y+"Hip",i,f*.23,-.2,-.01),b=n(y+"Knee",M,f*.34,-.77,-.01);n(y+"Ankle",b,f*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new ls(e);function h(y,f,g){let v=f<.5?"left":"right",_=i,x=i,M=0;if(y===1)_=s,x=a,M=1-hi(.25,.44,g);else if(y===2||y===9)g<.25?(_=a,x=t[v+"Shoulder"],M=hi(.175,.245,g)):g<.4?(_=t[v+"Shoulder"],x=t[v+"Elbow"],M=hi(.29,.38,g)):(_=t[v+"Elbow"],x=t[v+"Wrist"],M=hi(.43,.49,g));else if(y===3){let b=f<.5?f:1-f;g>.54?(_=t[v+"Hand"],x=t[v+(b>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((b-.175)/.019))))],M=hi(.54,.566,g)):(_=t[v+"Wrist"],x=t[v+"Hand"],M=hi(.49,.53,g))}else y===4?g<.57?(_=i,x=t[v+"Hip"],M=hi(.5,.57,g)):g<.76?(_=t[v+"Hip"],x=t[v+"Knee"],M=hi(.66,.74,g)):(_=t[v+"Knee"],x=t[v+"Ankle"],M=hi(.79,.84,g)):y===5||y===8?_=x=t[v+"Ankle"]:y===6?_=x=c:y===7&&(_=a,x=o,M=1-hi(.17,.225,g));return{indices:[e.indexOf(_),e.indexOf(x),0,0],weights:[1-M,M,0,0]}}function u(y,f){let g=y.getAttribute("bodyUv"),v=y.getAttribute("surface"),_=[],x=[];for(let b=0;b<g.count;b++){let L=h(v.getX(b),g.getX(b),g.getY(b));_.push(...L.indices),x.push(...L.weights)}y.setAttribute("skinIndex",new Xi(_,4)),y.setAttribute("skinWeight",new Ie(x,4));let M=new as(y,f);return r.add(M),M.bind(l,new je),M.frustumCulled=!1,M}let d=0;function m(y,f,g){d+=(Number(f)-d)*(1-Math.exp(-Math.min(.1,g)*9));let v=Math.sin(y*1.55)*d;a.scale.set(1+v*.003,1+v*.003,1+v*.007),c.rotation.set(Math.sin(y*.57)*.01*d,Math.sin(y*.36)*.024*d,Math.sin(y*.41)*.008*d);for(let[_,x]of[["left",-1],["right",1]]){t[_+"Shoulder"].rotation.z=(Math.sin(y*.79+x*.5)*.009+x*.005)*d,t[_+"Elbow"].rotation.x=(Math.sin(y*.67+x*.4)*.012-.025)*d,t[_+"Hand"].rotation.x=Math.sin(y*.61+x)*.01*d;for(let M=0;M<4;M++)t[_+"Finger"+M].rotation.x=(.035+Math.sin(y*.53+M*.25+x)*.012)*d}r.updateMatrixWorld(!0),l.update()}function p(y,f){r.updateMatrixWorld(!0),t[f].attach(y)}return{skeleton:l,bones:t,mesh:u,update:m,attach:p,weights:h,dispose(){l.dispose()}}}function Au(r,e="#c5b899"){let t=new ke;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new _t({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new _t({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,M,b,L,O)=>{let D=new Je(x,M);return D.position.set(b,L,O),t.add(D),D},o=a(new St(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let M=x*Math.PI/9,b=a(new Ke(.026,.049,.016),i,Math.cos(M)*.083,0,Math.sin(M)*.105);b.rotation.y=-M}let c=a(new He(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new St(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),m=/Daytona|square|rose/i.test(r),p=u.createRadialGradient(190,170,20,256,256,256);p.addColorStop(0,d?"#237050":m?"#fff7db":"#294559"),p.addColorStop(1,d?"#072b20":m?"#c7c4b4":"#06121c"),u.fillStyle=p,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=m?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let y=(x,M,b)=>{u.save(),u.rotate(x),u.strokeStyle=m?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-M),u.stroke(),u.restore()};y(-Math.PI/3,112,13),y(Math.PI/3,168,9),y(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=m?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let f=new Et(h);f.colorSpace=ft,f.anisotropy=4;let g=a(new Vn(.066,64),new _t({map:f,roughness:.34,metalness:.1}),0,0,.139),v=a(new Vn(.066,64),new yn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),_=a(new He(.012,.012,.019,16),i,.085,0,.12);return _.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(M=>{M.geometry?.dispose(),M.material&&x.add(M.material)});for(let M of x)M.dispose();f.dispose()}}}function Cu(r="#d3b15b"){let e=new ke;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new _t({color:"#c5a14d",metalness:.9,roughness:.24}),n=new _t({color:r,metalness:.25,roughness:.13}),i=new Je(new St(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new Je(new Ke(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new Je(new Cr(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function Ru(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let _e=n.loadHelmet(!0,e.visor,!0,e.helmet);_e.naturalWidth||await new Promise((Ne,ye)=>{_e.addEventListener("load",Ne,{once:!0}),_e.addEventListener("error",ye,{once:!0})})}let s=n.renderCharacter(i,{...e,hair:"hairNatural",watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let m=d.getContext("2d");m.drawImage(u,0,0,1024,1536);let p=m.getImageData(0,0,1024,1536).data,y=o.getImageData(0,0,1024,1536).data,f=h.getImageData(0,0,1024,1536).data;function g(_e,Ne,ye){let De=Math.max(0,Math.min(1535,Math.round(ye*1535))),Oe=Math.max(0,Math.min(1023,Math.round(Ne*1023)));if(_e[(De*1024+Oe)*4+3]>220)return Ne;for(let gt=1;gt<180;gt++)for(let Ae of[Oe-gt,Oe+gt])if(Ae>=0&&Ae<1024&&_e[(De*1024+Ae)*4+3]>220)return Ae/1023;return Ne}let v=new Et(a),_=new Et(l),x=new Et(d);for(let _e of[v,_,x])_e.colorSpace=ft,_e.anisotropy=4;let M=n.wardrobeSubcategory("pants",e.pants)==="shorts",b=e.suit?.endsWith("Tank"),L=e.suit?.endsWith("Tee"),O=["classic","ruby","midnight"].includes(e.suit),D=!!e.helmet&&e.helmet!=="none",k=new dn({uniforms:{helmetColor:{value:new qe(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new qe(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},palmPattern:{value:e.suit==="palmTank"?1:0},hairChanged:{value:!D&&(!e.hat||e.hat==="none")&&e.hair&&e.hair!=="hairNatural"?1:0},helmetOn:{value:D?1:0},shorts:{value:M?1:0},sleeveEnd:{value:b?.165:L?.29:.49},club:{value:O?1:0},portrait:{value:v},rear:{value:_},profile:{value:x},jacketColor:{value:new qe(n.item("suit",e.suit).color)},pantsColor:{value:new qe(n.item("pants",e.pants).color)},shoeColor:{value:new qe(n.item("shoes",e.shoes).color)}},side:Bt,vertexShader:`
#include <common>
#include <skinning_pars_vertex>
attribute vec2 bodyUv;attribute float surface;attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;
varying vec3 vRestPosition;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;
void main(){vRestPosition=position;vBodyUv=bodyUv;vSurface=surface;vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;
#include <skinbase_vertex>
#include <beginnormal_vertex>
#include <skinnormal_vertex>
vNormal=normalMatrix*objectNormal;
#include <begin_vertex>
#include <skinning_vertex>
gl_Position=projectionMatrix*modelViewMatrix*vec4(transformed,1.);
}`,fragmentShader:`uniform float palmPattern;uniform float hairChanged;uniform vec3 helmetColor;uniform vec3 helmetStripe;uniform float helmetOn;uniform float shorts;uniform float sleeveEnd;uniform float club;uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec3 vRestPosition;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;float hash3(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);}
vec3 furColor(){
 // Object-space noise keeps fur continuous around the limb and through rotation.
 vec3 p=vRestPosition;
 float tufts=noise3(p*vec3(38.,13.,38.));
 float strands=noise3(p*vec3(145.,25.,145.));
 float broad=noise3(p*vec3(7.,10.,7.));
 return mix(vec3(.018,.012,.008),vec3(.075,.047,.028),.48*tufts+.32*strands+.20*broad);
}
vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}vec3 dressed(vec3 c,float y,float x){
 if(vSurface>8.5)return vec3(.85,.86,.84);
 if(vSurface>7.5){float tread=.90+.055*sin(x*460.)*sin(y*900.);return vec3(.78,.79,.77)*tread;}
 if(vSurface>4.5&&vSurface<5.5){float sole=smoothstep(.968,.978,y);float upperPanel=smoothstep(.90,.92,y)*(1.-smoothstep(.94,.96,y));vec3 leather=mix(shoeColor*.82,shoeColor*.64,upperPanel);float stitch=1.-.12*exp(-pow((y-.945)/.0025,2.));return mix(leather*stitch,vec3(.78,.79,.77),sole);}
 if(vSurface>6.5&&vSurface<7.5&&y>.19)return jacketColor*.75;
 float arm=step(1.5,vSurface)*(1.-step(2.5,vSurface));
 float legs=step(3.5,vSurface)*(1.-step(4.5,vSurface));
 if(vSurface>5.5&&vSurface<6.5&&helmetOn>.5){float stripe=1.-smoothstep(.017,.024,abs(x-.505));vec3 shell=mix(helmetColor,helmetStripe,stripe);float visorBand=smoothstep(.045,.055,y)*(1.-smoothstep(.098,.112,y))*smoothstep(-.65,.15,vFront);shell=mix(shell,vec3(.025,.035,.045),visorBand);float vent=step(.105,y)*(1.-step(.155,y))*(1.-smoothstep(.08,.11,abs(x-.505)));return shell*(1.-vent*.38);}
 if(vSurface>2.5&&vSurface<3.5){
 float pores=noise3(vRestPosition*95.);
 float backOfHand=(1.-smoothstep(.50,.53,y));
 return mix(vec3(.32,.19,.125)*(.87+.20*pores),furColor(),backOfHand*.8);
 }
 if((legs>.5&&shorts>.5&&y>.65)||(arm>.5&&y>sleeveEnd)){
  // Photograph projection on the sides stretches a narrow strip into bands.
  // Use directional fur shading there; keep the portrait on the front only.
  return furColor();
 }
 if(vSurface<1.5||(arm>.5&&y<sleeveEnd)){float weave=.81+.008*sin(y*85.)*sin(x*110.);float seam=1.-.10*exp(-pow((x-.505)/.003,2.));float fabricShade=.98+.025*sin(y*65.+x*18.);vec3 fabric=jacketColor*weave*seam*fabricShade;
 if(palmPattern>.5){vec2 p=fract(vec2(x*12.,y*19.))-.5;float trunk=(1.-smoothstep(.012,.026,abs(p.x+.05*p.y)))*step(-.27,p.y)*(1.-step(.13,p.y));float leaves=0.;for(int k=0;k<6;k++){float a=float(k)*.62+.1;vec2 d=vec2(cos(a),sin(a));float along=dot(p-vec2(0.,.1),d);float crossD=abs(dot(p-vec2(0.,.1),vec2(-d.y,d.x)));leaves=max(leaves,(1.-smoothstep(.014,.035,crossD))*step(0.,along)*(1.-smoothstep(.13,.23,along)));}fabric=mix(fabric,vec3(.62,.76,.69),max(trunk,leaves)*.65);}
 return fabric;}
 if(legs>.5&&y<(shorts>.5?.65:.85)){float fold=.83+.025*sin(x*44.+y*14.);float inseam=1.-.09*exp(-pow((abs(x-.5)-.07)/.008,2.));fold*=inseam;
 float pocketX=abs(x-.5),pocketY=y-.527;
 float pocketSides=(1.-smoothstep(.001,.0025,min(abs(pocketX-.065),abs(pocketX-.135))))*step(-.024,pocketY)*(1.-step(.024,pocketY));
 float pocketEnds=(1.-smoothstep(.001,.0025,abs(abs(pocketY)-.024)))*step(.065,pocketX)*(1.-step(.135,pocketX));
 fold*=1.-.16*max(pocketSides,pocketEnds)*(1.-smoothstep(-.6,0.,vFront));
 return pantsColor*fold;}return c;
}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);b=dressed(b,vBodyUv.y,vBodyUv.x);s=dressed(s,vBodyUv.y,vBodyUv.x);float f=smoothstep(.38,.86,vFront)*a.a;float shoe=step(4.5,vSurface)*(1.-step(5.5,vSurface));float sole=step(7.5,vSurface);float bareArm=step(1.5,vSurface)*(1.-step(2.5,vSurface))*step(sleeveEnd,vBodyUv.y);
 float bareLeg=step(3.5,vSurface)*(1.-step(4.5,vSurface))*shorts*step(.65,vBodyUv.y);
 f*=1.-max(max(shoe,sole),max(bareArm,bareLeg)*.70);f*=1.-bareLeg*step(.85,vBodyUv.y);vec3 n=normalize(vNormal);vec3 lamp=normalize(vec3(-.55,.85,1.));float light=.62+.34*max(0.,dot(n,lamp))+.09*max(0.,dot(n,normalize(vec3(.7,.2,-1.))));float underArm=exp(-pow((abs(vBodyUv.x-.5)-.19)/.025,2.))*exp(-pow((vBodyUv.y-.30)/.11,2.));float collar=exp(-pow((vBodyUv.y-.192)/.018,2.))*exp(-pow((vBodyUv.x-.5)/.09,2.));light*=1.-.13*underArm-.12*collar;vec3 color=mix(b,a.rgb,f);float sideAmount=(1.-smoothstep(.05,.72,abs(vFront)))*step(5.5,vSurface)*(1.-step(6.5,vSurface))*(1.-helmetOn);color=mix(color,s,sideAmount);
 float scalp=step(5.5,vSurface)*(1.-step(6.5,vSurface))*hairChanged*(1.-helmetOn);
 float crown=1.-smoothstep(.034,.054,vBodyUv.y);
 float rearScalp=(1.-smoothstep(-.1,.35,vFront))*(1.-smoothstep(.075,.115,vBodyUv.y));
 color=mix(color,vec3(.18,.105,.060)*(.86+.24*noise3(vRestPosition*90.)),scalp*max(crown,rearScalp));color*=light;float hardSurface=step(4.5,vSurface)*(1.-step(6.5,vSurface));float gloss=mix(.025,.16,hardSurface);float highlight=pow(max(0.,dot(reflect(-lamp,n),vec3(0.,0.,1.))),mix(14.,48.,hardSurface));float rim=pow(1.-abs(n.z),3.)*.045;color+=vec3(1.,.90,.75)*(highlight*gloss+rim);gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`}),I=new ke,U=[],Z=Eu(I),V=uo(e.body);function q(_e,{rings:Ne=70,sides:ye=80,muzzle:De=!1,folds:Oe=0,z:gt=0,surface:Ae=0}={}){let ot=[],rt=[],$t=[],ln=[],H=[],Ut=[],Wt=[],lt=[],Pt=_e[0][0],En=_e.at(-1)[0];function Xt(Ot){let st=0;for(;st<_e.length-2&&_e[st+1][0]<Ot;)st++;let sn=_e[st],It=_e[st+1],zt=Math.max(0,Math.min(1,(Ot-sn[0])/(It[0]-sn[0])));return sn.map((en,tn)=>{if(tn===0)return Ot;let fn=_e[Math.max(0,st-1)][tn]||0,cn=_e[Math.min(_e.length-1,st+2)][tn]||0,gn=It[tn]||0;return Math.max(Math.min(en,gn),Math.min(Math.max(en,gn),.5*(2*en+(-fn+gn)*zt+(2*fn-5*en+4*gn-cn)*zt*zt+(-fn+3*en-3*gn+cn)*zt*zt*zt)))})}for(let Ot=0;Ot<=Ne;Ot++){let st=Pt+(En-Pt)*Ot/Ne,[,sn,It,zt,en=0]=Xt(st),tn=(sn+It)/2,fn=(It-sn)/2;for(let cn=0;cn<=ye;cn++){let gn=2*Math.PI*cn/ye,jn=Math.cos(gn),Mn=Math.sin(gn),nn=tn+fn*jn,Qn=Ae===1||Ae===2&&st<(b?.165:L?.29:.49)||Ae===4&&(!M||st<.65),bt=zt*(1+(Qn?Oe:0)*Math.sin(st*65+gn*3)*Math.sin(Math.PI*Ot/Ne)),Ct=gt+en+bt*Mn;if(De&&Mn>0){let Pe=(nn-.507)/.085;Ct+=.17*Math.exp(-(Pe*Pe)-((st-.126)/.031)**2)*Mn*Mn,Ct+=.045*Math.exp(-(((nn-.505)/.05)**2)-((st-.104)/.015)**2)*Mn,Ct-=.028*(Math.exp(-(((nn-.466)/.024)**2))+Math.exp(-(((nn-.55)/.024)**2)))*Math.exp(-(((st-.077)/.013)**2))*Mn}let A=V(((Ae===5?tn+(nn-tn)*.88:nn)-.5)*2.55,st,Ae===5?Ct*.84:Ct,Ae);if(De&&e.hair&&e.hair!=="hairNatural"&&st<.065){let Pe=1-st/.065;A[0]*=1-.12*Pe,A[2]=.1+(A[2]-.1)*(1-.1*Pe),A[1]+=.008*Pe}ot.push(A[0],(.5-A[1])*3.825,A[2]),Ut.push(nn,st),Wt.push(Ae);let ee=nn,te=st;Ae===3&&(ee=(nn<.5?.2:.8)+(nn-(sn+It)/2)*.45,te=Math.min(st,.545)),rt.push(g(y,ee,te),1-te);let ie=st,J=nn;De?ie=.008+(st-.008)*.74:Pt<.24&&En>.4&&sn>.29&&It<.72&&(ie=.14+(st-.165)*1.08),Pt>.82&&(J=tn+(nn-tn)*.8),$t.push(g(f,J,ie),1-ie);let ve=De?st*.92:st,ze=(De?.45:.49)+Ct*.4;if(Pt>=.45&&En>.62&&st>.49&&st<.62&&(ze=Math.min(ze,.43)),ln.push(g(p,ze,ve),1-ve),H.push(Mn),Ot<Ne&&cn<ye){let Pe=Ot*(ye+1)+cn,Ve=Pe+ye+1;lt.push(Pe,Pe+1,Ve,Pe+1,Ve+1,Ve)}}}for(let Ot of[0,Ne]){let st=Ot*(ye+1),sn=ot.length/3;for(let[It,zt]of[[ot,3],[rt,2],[$t,2],[ln,2],[Ut,2]])for(let en=0;en<zt;en++){let tn=0;for(let fn=0;fn<ye;fn++)tn+=It[(st+fn)*zt+en];It.push(tn/ye)}Wt.push(Ae),H.push(0);for(let It=0;It<ye;It++)Ot===0?lt.push(sn,st+It+1,st+It):lt.push(sn,st+It,st+It+1)}let Qt=new dt;Qt.setAttribute("bodyUv",new Ie(Ut,2)),Qt.setAttribute("surface",new Ie(Wt,1)),Qt.setAttribute("position",new Ie(ot,3)),Qt.setAttribute("uv",new Ie(rt,2)),Qt.setAttribute("rearUv",new Ie($t,2)),Qt.setAttribute("profileUv",new Ie(ln,2)),Qt.setAttribute("frontWeight",new Ie(H,1)),Qt.setIndex(lt),Qt.computeVertexNormals(),Z.mesh(Qt,k),U.push(Qt)}q([[.165,.435,.575,.1],[.19,b?.405:.35,b?.605:.65,b?.15:.21],[.245,b?.335:.313,b?.675:.69,.235],[.32,.33,.68,.225],[.4,.33,.67,.21],[.455,.33,.67,.195],[.475,.37,.63,.18]],{folds:.025,surface:1}),q([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),q(D?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!D,z:.1,rings:110,sides:112,surface:6}),D||(q([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),q([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let _e of[-1,1]){let Ne=ye=>_e<0?ye:ye.map(([De,Oe,gt,Ae,ot])=>[De,1-gt,1-Oe,Ae,ot||0]);q(Ne([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.305,.194,.305,.121,.005],[.34,.185,.283,.103,-.018],[.375,.17,.272,.132,.004],[.41,.153,.256,.128,.018],[.455,.149,.241,.1,.018],[.49,.158,.23,.079,.01]]),{z:-.025,folds:.025,rings:100,surface:2}),!L&&!b?q(Ne([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}):L&&q(Ne([[.279,.205,.317,.143],[.288,.201,.314,.144]]),{z:-.025,rings:8,surface:2}),O&&q(Ne([[.491,.156,.227,.084],[.5,.159,.225,.08]]),{z:.005,rings:8,surface:9}),q(Ne([[.478,.168,.221,.055],[.493,.151,.23,.08],[.515,.151,.241,.082],[.531,.153,.245,.086],[.545,.165,.241,.066],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let ye=0;ye<4;ye++){let De=.166+ye*.019,Oe=.54+ye*.002,gt=[.039,.046,.043,.034][ye];q(Ne([[Oe,De,De+.019,.024,0],[Oe+gt*.35,De-.001,De+.02,.025,.008],[Oe+gt*.72,De+.001,De+.018,.021,.026],[Oe+gt,De+.005,De+.014,.007,.035]]),{z:.07,rings:22,sides:24,surface:3})}q(Ne([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}q([[.454,.36,.65,.17],[.48,.313,.69,.205],[.53,.3,.703,.215],[.58,.31,.69,.205],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let _e of[-1,1]){let Ne=ye=>_e<0?ye:ye.map(([De,Oe,gt,Ae,ot])=>[De,1-gt,1-Oe,Ae,ot||0]);q(Ne([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,M?.302:.271,M?.428:.44,M?.14:.19],[.72,M?.292:.262,M?.416:.432,M?.155:.19],[.77,M?.286:.247,M?.396:.41,M?.135:.175],[.81,M?.294:.248,M?.387:.393,M?.115:.16],[.843,M?.3:.27,M?.379:.385,M?.095:.13],[.884,.304,.368,.078],[.92,.308,.361,.07]]),{z:-.01,folds:.012,rings:110,surface:4}),q(Ne([[.893,.304,.352,.075,-.015],[.908,.284,.373,.12,.015],[.929,.269,.386,.215,.095],[.95,.263,.389,.275,.145],[.963,.265,.387,.281,.15],[.972,.272,.38,.267,.15]]),{z:.015,rings:54,surface:5}),q(Ne([[.968,.269,.383,.269,.15],[.974,.265,.387,.277,.15],[.982,.267,.385,.272,.15],[.986,.276,.376,.251,.15]]),{z:.015,rings:14,surface:8})}let se=wu(Z,e,n),ue=bu(Z,e),ce=e.ring&&e.ring!=="none"?Cu(n.item("ring",e.ring).color):null;ce&&(I.add(ce.group),Z.attach(ce.group,"rightHand"));let we=e.watch&&e.watch!=="none"?Au(e.watch,n.item("watch",e.watch).color):null;we&&(I.add(we.group),Z.attach(we.group,"rightWrist"));let Re=new _n;Re.add(I);{Re.add(new Un("#fff0d4","#283849",2.1));let _e=new wn("#fff0dc",3.5);_e.position.set(-2,4,5),Re.add(_e);let Ne=new wn("#9cc3ed",1.2);Ne.position.set(3,1,-2),Re.add(Ne)}let $=new Xn({alpha:!0,antialias:!0});$.setPixelRatio(Math.min(devicePixelRatio,2)),$.outputColorSpace=ft,r.append($.domElement),$.domElement.setAttribute("role","img"),$.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let me=new Si(-1.5,1.5,2.05,-2.05,.1,30);me.position.set(0,0,8);let he=t.yaw||0,pe=t.pitch||0,fe=null,j,Ee=!1,C=!1,E=0,W=window.matchMedia?.("(prefers-reduced-motion: reduce)"),z="full",T=t.focusOrbit||null,P=2.05,G=0,N=0;function ae(_e){_e=_e==="watch"?"watch":"full",_e!==z&&(_e==="watch"?(T=T||{yaw:he,pitch:pe},t.focusOrbit=T,he=0,pe=0):T&&(he=T.yaw,pe=T.pitch,T=null,delete t.focusOrbit),t.yaw=he,t.pitch=pe,z=_e,r.dataset.focus=z)}function Y(_e){let Ne=r.clientWidth/Math.max(1,r.clientHeight),ye=z==="watch",De=ye?Math.max(.4,.3/Ne):Math.max(2.4,1.17/Ne),Oe=ye?.76*Math.cos(he)+.1*Math.sin(he):0,gt=ye?.04*Math.cos(pe)-(.1*Math.cos(he)-.76*Math.sin(he))*Math.sin(pe):-.22,Ae=1-Math.exp(-_e*12);P+=(De-P)*Ae,G+=(Oe-G)*Ae,N+=(gt-N)*Ae,me.left=G-P*Ne,me.right=G+P*Ne,me.top=N+P,me.bottom=N-P,me.updateProjectionMatrix()}let K=()=>{!r.clientWidth||!r.clientHeight||(Y(1),$.setSize(r.clientWidth,r.clientHeight,!1))},xe=new ResizeObserver(K);xe.observe(r),K();let Le=_e=>{C=!1,fe={id:_e.pointerId,x:_e.clientX,y:_e.clientY},r.setPointerCapture(_e.pointerId),_e.preventDefault()},Me=_e=>{!fe||fe.id!==_e.pointerId||(he+=(_e.clientX-fe.x)*.012,pe=Math.max(-.35,Math.min(.35,pe+(_e.clientY-fe.y)*.006)),fe.x=_e.clientX,fe.y=_e.clientY)},Fe=()=>{fe=null},Be=_e=>{["ArrowLeft","ArrowRight"].includes(_e.key)&&(he+=_e.key==="ArrowLeft"?-.15:.15,_e.preventDefault())};r.addEventListener("pointerdown",Le),r.addEventListener("pointermove",Me),r.addEventListener("pointerup",Fe),r.addEventListener("pointercancel",Fe),r.addEventListener("keydown",Be);function We(_e=0){if(Ee)return;if(!r.isConnected){at();return}C&&!fe&&E&&(he+=Math.min(.05,(_e-E)/1e3)*.35),k.uniforms.idleTime.value=_e/1e3,k.uniforms.idleStrength.value=!W?.matches&&!fe&&z==="full"?1:0;let Ne=E?Math.min(.05,(_e-E)/1e3):.016;Z.update(_e/1e3,k.uniforms.idleStrength.value,Ne),Y(Ne),E=_e,I.rotation.set(pe,he,0),t.yaw=he,t.pitch=pe,r.dataset.yaw=String(he),$.render(Re,me),j=requestAnimationFrame(We)}return We(),{state:t,setFocus:ae,setYaw(_e){he=_e},setAutoRotate(_e){C=!!_e},dispose:at};function at(){if(!Ee){Ee=!0,cancelAnimationFrame(j),xe.disconnect();for(let[_e,Ne]of[["pointerdown",Le],["pointermove",Me],["pointerup",Fe],["pointercancel",Fe],["keydown",Be]])r.removeEventListener(_e,Ne);for(let _e of U)_e.dispose();we?.dispose(),ce?.dispose(),se.dispose(),ue.dispose(),Z.dispose(),k.dispose(),v.dispose(),_.dispose(),x.dispose(),$.dispose(),$.forceContextLoss(),$.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new _n,s=new ke;i.add(s);let a=new Xn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ft,a.toneMapping=oi,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new kt(34,1,.1,40);i.add(new Un("#dcecff","#50402b",2));for(let[j,Ee,C,E]of[[3,6,5,4],[-3,3,-3,3]]){let W=new wn("#fff0dd",E);W.position.set(j,Ee,C),i.add(W)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let j=0;j<128;j+=2)l.fillStyle=j%4?"#808080":"#b0b0b0",l.fillRect(0,j,128,1);for(let j=0;j<128;j+=3)l.fillStyle="#888888",l.fillRect(j,0,1,128);let h=new Et(c);h.wrapS=h.wrapT=Kn,h.repeat.set(8,8);let u=(j,Ee=0,C=.7)=>new _t({color:j,metalness:Ee,roughness:C}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),y=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),v=u("#171b20"),_=u("#171b20"),x=u("#826222",.9,.18);for(let j of[g,v,p])j.bumpMap=h,j.bumpScale=.012;function M(j,Ee,C,E,W,z,T,P=s){let G=new Je(new qt(1,40,28),j);return G.position.set(Ee,C,E),G.scale.set(W,z,T),P.add(G),G}function b(j,Ee,C,E,W=E){let z=new w(...Ee),T=new w(...C),P=T.clone().sub(z),G=new Je(E>.1?new wr((E+W)/2,Math.max(.01,P.length()-(E+W)),10,32):new He(W,E,P.length(),16),j);return G.position.copy(z.add(T).multiplyScalar(.5)),G.quaternion.setFromUnitVectors(new w(0,1,0),P.normalize()),s.add(G),G}M(v,0,1.64,0,.47,.36,.26),M(g,0,2.32,0,.59,.65,.32),M(p,0,2.35,.29,.27,.49,.055);for(let j of[-1,1]){b(v,[j*.27,1.67,0],[j*.29,.92,.015],.23,.25),M(v,j*.29,.92,.015,.23,.24,.24),b(v,[j*.29,.94,.015],[j*.32,.28,0],.16,.22),b(y,[j*.45,1.55,.03],[j*.48,.36,.03],.025,.032),M(_,j*.32,.18,.15,.22,.19,.39),M(y,j*.32,.075,.15,.235,.065,.4),M(y,j*.32,.27,.12,.135,.08,.2);for(let Ee=0;Ee<5;Ee++)b(y,[j*.32-.1,.29,.08+Ee*.04],[j*.32+.1,.29,.08+Ee*.04],.009);M(g,j*.55,2.63,0,.26,.27,.29),b(g,[j*.57,2.63,0],[j*.76,2.12,.02],.19,.23),M(g,j*.76,2.12,.02,.19,.2,.2),b(g,[j*.76,2.12,.02],[j*.88,1.65,.08],.13,.18),b(y,[j*.71,2.6,.15],[j*.99,1.72,.15],.035),M(p,j*.88,1.67,.08,.145,.09,.15),M(d,j*.89,1.48,.1,.16,.22,.12);for(let Ee=0;Ee<4;Ee++)M(m,j*(.79+Ee*.065),1.36,.15,.035,.13,.045);M(m,j*.75,1.48,.2,.06,.12,.06)}M(d,0,3.04,0,.25,.27,.24),M(d,0,3.39,0,.36,.43,.31);for(let j of[-1,1])M(m,j*.36,3.4,.01,.12,.17,.09),M(d,j*.36,3.4,.065,.065,.1,.035),M(m,j*.15,3.43,.258,.15,.12,.075),M(p,j*.14,3.44,.32,.045,.035,.02),M(y,j*.13,3.45,.335,.009,.01,.006),M(d,j*.15,3.53,.28,.18,.05,.07);M(m,0,3.23,.27,.26,.18,.13),M(m,0,3.34,.34,.14,.08,.08),M(p,0,3.17,.375,.17,.017,.018),M(m,0,3.13,.36,.17,.035,.025);let L=new ke;s.add(L),M(p,0,3.51,-.02,.41,.42,.35,L),M(f,0,3.64,.015,.07,.3,.36,L);for(let j of[-1,1])M(p,j*.32,3.29,.015,.1,.31,.24,L),M(f,j*.39,3.43,.07,.025,.05,.05,L);let O=M(x,0,3.44,.27,.38,.19,.14,L);for(let j of[-1,1])b(p,[j*.28,2.88,.25],[j*.1,2.58,.33],.035),b(p,[j*.3,2.28,.3],[j*.39,2.09,.26],.018);for(let j=0;j<6;j++)M(f,0,2.03+j*.14,.35,.015,.015,.01);let D=document.createElement("canvas");D.width=512,D.height=256;let k=D.getContext("2d"),I=new Et(D);I.colorSpace=ft;let U=new Je(new jt(.28,.12),new _t({map:I,roughness:.9}));U.position.set(-.27,2.46,.317),s.add(U);let Z=new ke;for(let j=0;j<3;j++)for(let Ee=0;Ee<5;Ee++){let C=new Je(new jt(.048,.048),(Ee+j)%2?p:y);C.position.set(-.36+Ee*.048,2.62+j*.048,.318),Z.add(C)}s.add(Z);function V(j){g.color.set(n.item("suit",j.suit).color),v.color.set(n.item("pants",j.pants).color),_.color.set(n.item("shoes",j.shoes).color),L.visible=j.helmet!=="none",O.position.y=j.visor==="open"?3.71:3.44,O.rotation.x=j.visor==="open"?-.8:0,U.visible=j.patch!=="none",k.fillStyle="#22282b",k.fillRect(0,0,512,256),k.strokeStyle="#c9af74",k.lineWidth=12,k.strokeRect(8,8,496,240),k.fillStyle="#eee0b5",k.font="bold 72px Arial",k.textAlign="center",k.fillText(j.patch==="name"?j.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":j.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),I.needsUpdate=!0}V(e),t.yaw??=0,t.pitch??=.07;let q=null,se,ue=!1;function ce(){let j=r.clientWidth,Ee=r.clientHeight;!j||!Ee||(a.setSize(j,Ee,!1),o.aspect=j/Ee,o.updateProjectionMatrix())}let we=new ResizeObserver(ce);we.observe(r),ce();let Re=j=>{q={id:j.pointerId,x:j.clientX,y:j.clientY},r.setPointerCapture(j.pointerId),j.preventDefault()},$=j=>{!q||q.id!==j.pointerId||(t.yaw-=(j.clientX-q.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(j.clientY-q.y)*.006)),q.x=j.clientX,q.y=j.clientY)},me=()=>{q=null},he=j=>{(j.key==="ArrowLeft"||j.key==="ArrowRight")&&(t.yaw+=j.key==="ArrowLeft"?.15:-.15,j.preventDefault())};r.addEventListener("pointerdown",Re),r.addEventListener("pointermove",$),r.addEventListener("pointerup",me),r.addEventListener("pointercancel",me),r.addEventListener("keydown",he);function pe(){if(ue)return;ue=!0,cancelAnimationFrame(se),we.disconnect();for(let[Ee,C]of[["pointerdown",Re],["pointermove",$],["pointerup",me],["pointercancel",me],["keydown",he]])r.removeEventListener(Ee,C);let j=new Set;i.traverse(Ee=>{Ee.geometry?.dispose(),Ee.material&&j.add(Ee.material)});for(let Ee of j)Ee.dispose();I.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function fe(){if(ue)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){pe();return}let j=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*j,1.95+Math.sin(t.pitch)*j,Math.cos(t.yaw)*Math.cos(t.pitch)*j),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),se=requestAnimationFrame(fe)}return fe(),{update:V,dispose:pe,state:t}};function hc(r){let e=new ke;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(D,k,I)=>new yn({color:D,metalness:k,roughness:I,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(D,k,I=0,U=0,Z=0)=>{let V=new Je(D,k);return V.position.set(I,U,Z),V.castShadow=V.receiveShadow=!0,e.add(V),V},h=(D,k,I,U=!0)=>{let Z=new pn;return Z.absarc(k,I,D,0,Math.PI*2,U),Z},u=t?.395:.437,d=new Ht;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let D=0;D<24;D++)for(let[k,I]of[[.28,0],[.36,.045]]){let U=D*Math.PI/12+I;d.holes.push(h(n?.009:.011,Math.cos(U)*k,Math.sin(U)*k))}for(let D of[0,.033])l(new Ft(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,D);let m=new Ke(.22,.014,.025),p=new hs(m,a,32),y=new je;for(let D=0;D<32;D++){let k=D*Math.PI/16;y.compose(new w(Math.cos(k)*.31,Math.sin(k)*.31,.021),new In().setFromAxisAngle(new w(0,0,1),k+.18),new w(1,1,1)),p.setMatrixAt(D,y)}e.add(p);let f=l(new He(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new He(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let D=0;D<10;D++){let k=D*Math.PI/5,I=l(new He(.017,.017,.015,12),s,Math.cos(k)*.18,Math.sin(k)*.18,.05);I.rotation.x=Math.PI/2;let U=l(new He(.009,.009,.018,6),a,Math.cos(k)*.18,Math.sin(k)*.18,.058);U.rotation.x=Math.PI/2}for(let D of[.235,.26,.31,.335,.39,.414])if(D<u){let k=l(new St(D,.0012,3,96),a,0,0,.042);k.castShadow=!1}if(!t)for(let D=0;D<8;D++){let k=D*Math.PI/4,I=[.25,.29,.34,.395].map((Z,V)=>new w(Math.cos(k+V*.075)*Z,Math.sin(k+V*.075)*Z,.043)),U=l(new xt(new yt(I),12,.0024,3,!1),a);U.castShadow=!1}let v=new Ht;v.moveTo(-.08,-.2),v.quadraticCurveTo(-.13,-.15,-.115,-.06),v.lineTo(-.115,.1),v.quadraticCurveTo(-.12,.19,-.05,.215),v.lineTo(.055,.19),v.quadraticCurveTo(.11,.14,.105,.06),v.lineTo(.105,-.1),v.quadraticCurveTo(.1,-.19,.04,-.21),v.closePath();let _=l(new Ft(v,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&_.scale.set(.8,.8,.8),l(new Ke(.09,.31,.032),a,.27,0,.005);for(let D of[-.125,0,.125]){let k=l(new He(.055,.055,.028,24),c,.354,D,.07);k.rotation.x=Math.PI/2}for(let D of[-.155,.155]){let k=l(new He(.014,.014,.025,6),s,.325,D,.094);k.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let M=x.getContext("2d");M.fillStyle="#f5f0df",M.translate(64,192),M.rotate(-Math.PI/2),M.textAlign="center",M.font="italic bold 60px Arial",M.fillText(t?"P21":"P21 SPORT",0,20);let b=new Et(x);b.colorSpace=ft;let L=l(new jt(.075,.24),new kn({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);L.castShadow=!1;let O=l(new He(.012,.014,.047,6),s,.36,.217,.042);return O.rotation.z=.2,e}var cc;function Pu(r,e){if(!r.isConnected)return;if(!cc){let a=new Xn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ft,a.toneMapping=oi,a.toneMappingExposure=1.15;let o=new _n;o.add(new Un("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new wn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new kt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),cc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=cc;s[e]||(s[e]=hc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Iu(r){let e=new ke;e.name="tyre-"+r;let t=new _t({color:"#15181b",roughness:.86}),n=new _t({color:"#050708",roughness:.96}),i=new _t({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new Je(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new Mi([new de(.56,-.19),new de(.63,-.25),new de(.72,-.23),new de(.79,-.15),new de(.8,-.1),new de(.8,.1),new de(.79,.15),new de(.72,.23),new de(.63,.25),new de(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new St(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,m=s(new Ke(.018,.036,.006),i);m.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),m.rotation.z=-d}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(d,m)=>{let p=-.2+m/15*.4,y=.8-.045*(Math.abs(p)/.2)**3,f=h+(o?.18:.08)*Math.sin(m/15*Math.PI);return new w(Math.sin(f)*y,Math.cos(f)*y,p)});s(new xt(new yt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new St(.798,.004,8,80),n);h.position.z=l}}return e}function Lu(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new w;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Ie(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new Rr({depthPacking:so});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Du(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new ke;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(M,b,L)=>{let O=new Je(M,b);return O.name=L,O.castShadow=O.receiveShadow=!0,c.add(O),O};for(let M=0;M<h;M++){let b=[],L=[];for(let I=0;I<=72;I++){let U=I/72*2-1,Z=U*l/2,V=(M?a?.36:.46:.76)*(1-.22*U*U),q=(M?2.86+M*.055:3.02)-.13*U*U,se=.43+M*.095+.1*Math.pow(Math.abs(U),3);for(let ue=0;ue<=28;ue++){let ce=ue/28*Math.PI*2,we=Math.cos(ce);b.push(q+we*V/2,se+.035*(1-we*we)+Math.sin(ce)*(M?.024:.035),Z)}if(I<72)for(let ue=0;ue<28;ue++){let ce=I*29+ue,we=ce+28+1;L.push(ce,ce+1,we,ce+1,we+1,we)}}let k=new dt;k.setAttribute("position",new Ie(b,3)),k.setIndex(L),k.computeVertexNormals(),u(k,M===0?n:t,"wing-element-"+M)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],m=[0,1,2,3].map(M=>new yt(d.map((b,L)=>new w(b[M],L,0)),!1,"catmullrom",.35)),p=[],y=[],f=96,g=48;for(let M=0;M<=f;M++){let b=M/f,[L,O,D,k]=m.map(I=>I.getPoint(b).x);for(let I=0;I<=g;I++){let U=I/g*Math.PI*2,Z=Math.cos(U),V=Math.sin(U),q=a?.7:.82;p.push(L,O+Math.sign(V)*Math.pow(Math.abs(V),q)*k,Math.sign(Z)*Math.pow(Math.abs(Z),q)*D)}if(M<f)for(let I=0;I<g;I++){let U=M*(g+1)+I,Z=U+1;y.push(U,U+g+1,Z,Z,U+g+1,Z+g+1)}}let v=y.length;for(let M of[0,f]){let b=M*(g+1);for(let L=1;L<g-1;L++)M===0?y.push(b,b+L,b+L+1):y.push(b,b+L+1,b+L)}let _=new dt;_.setAttribute("position",new Ie(p,3)),_.setIndex(y),_.computeVertexNormals();let x=Math.floor(f*.89)*g*6;_.addGroup(0,x,0),_.addGroup(x,v-x,a?1:0),_.addGroup(v,y.length-v,0),u(_,[t,s],"tapered-nose");for(let M of[-1,1]){let b=u(new Ke(.15,.4,.035),n,"nose-pylon");b.position.set(2.94,.69,M*.1),b.rotation.z=-.15;let L=new Ht;L.moveTo(2.57,.38),L.lineTo(3.43,.38),L.quadraticCurveTo(3.53,.42,3.43,.61),L.lineTo(3.14,a?.69:.64),L.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),L.closePath();let O=u(new Ft(L,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");O.position.z=M*l/2-.017,u(new Ke(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,M*(l/2+.055));let k=new yt([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([I,U])=>new w(I,U,M*(l/2+.025))));if(u(new xt(k,28,.009,6,!1),s,"endplate-trim"),a)for(let I=0;I<3;I++){let U=u(new Ke(.27,.075,.018),n,"flow-fin");U.position.set(2.86+I*.07,.54+I*.045,M*(1.1+I*.1)),U.rotation.z=.15}}for(let M of c.children){let b=M.geometry?.getAttribute("position");if(b){for(let L=0;L<b.count;L++)b.setX(L,b.getX(L)*.78);M.geometry.computeVertexNormals()}M.position.x=.2332+M.position.x*.78}return c}function uc(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new on;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new je().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function dc(r,{paint:e,carbon:t,metal:n}){let i=new ke;i.name="rear-wing-"+r;let s=new ke;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(g,v,_,x,M,b,L=i){let O=new Je(g,v);return O.name=_,O.position.set(x,M,b),O.castShadow=O.receiveShadow=!0,L.add(O),O}function m(g,v,_,x,M){let b=new Ht;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let L=new Ft(b,{depth:_,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});L.translate(0,0,-_/2);let O=d(L,M,"rear-wing-blade",g,v,0,s);O.rotation.z=-.08}if(m(0,l,h,u,o||r==="sport"?t:n),c&&m(.025,l+.23,h*.96,u*.7,t),a&&m(-.05,l-.18,h,.3,e),r!=="lip")for(let g of[-1,1])d(new Ke(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),g*h/2,s);let p=[];for(let g of[-.72,.72]){d(new Ke(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,g);for(let x of[-2.36,-2.22])d(new He(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,g);let v=d(new Ke(1,.075,.085),t,"rearward-mount-arm",0,1.015,g),_=d(new Ke(.085,1,.075),t,"rear-wing-upright",0,0,g);p.push({lower:v,post:_,z:g})}let y=uc([s],i).max.x;function f(g){let v=Math.min(-2.85,g&&!g.isEmpty()?g.min.x-.24-y:-2.85);s.position.x=v;for(let{lower:_,post:x}of p)_.position.x=(-2.29+v)/2,_.scale.x=Math.abs(v+2.29),x.position.set(v,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=v,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function Uu(r="classic"){let e=new ke;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new _t({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new _t({color:"#161d23",roughness:.83,metalness:.15}),a=new _t({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,m,p=e){let y=new Je(c,l);return y.name=h,y.position.set(u,d,m),y.castShadow=y.receiveShadow=!0,p.add(y),y}o(new Ke(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new He(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new He(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new w(.72,1.09,l),m=new w(1.1,1.31,l),p=m.clone().sub(d),y=d.clone().add(m).multiplyScalar(.5);o(new Ke(.055,p.length(),.035),i,c+"-lever",...y.toArray()).quaternion.setFromUnitVectors(new w(0,1,0),p.normalize());let g=c==="brake"?.24:.32,v=new Ht,_=h/2,x=g/2,M=.025;if(v.moveTo(-_+M,-x),v.lineTo(_-M,-x),v.quadraticCurveTo(_,-x,_,-x+M),v.lineTo(_,x-M),v.quadraticCurveTo(_,x,_-M,x),v.lineTo(-_+M,x),v.quadraticCurveTo(-_,x,-_,x-M),v.lineTo(-_,-x+M),v.quadraticCurveTo(-_,-x,-_+M,-x),n)for(let O of[-.065,0,.065])for(let D of c==="brake"?[-.055,.055]:[0]){let k=new pn;k.absarc(D,O,.014,0,Math.PI*2,!0),v.holes.push(k)}let b=o(new Ft(v,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let O of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new Ke(h*.76,.009,.007),n?a:i,c+"-grip",0,O,-.007,b);let L=Array.from({length:65},(O,D)=>{let k=D/64,I=k*Math.PI*12;return new w(.77+k*.23,1.095+k*.15+Math.sin(I)*.018,l+.045+Math.cos(I)*.018)});if(o(new xt(new yt(L),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let O=o(new He(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);O.rotation.z=-1.05}}return e}function mc(r){let e=new ke;e.name="sport-seat-"+r;let t=(I,U=.8,Z=0)=>new yn({color:I,roughness:U,metalness:Z,clearcoat:Z?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),m=document.createElement("canvas");m.width=m.height=64;let p=m.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let U=0;U<64;U+=8)p.fillStyle=(U+I)%16?"#121820":"#626973",p.fillRect(U,I,7,3),p.fillStyle="#252b33",p.fillRect(U,I+4,3,4);let y=new Et(m);y.wrapS=y.wrapT=Kn,y.repeat.set(3,5),y.colorSpace=ft,c.map=y,c.bumpMap=y,c.bumpScale=.004;let f=(I,U,Z=0,V=0,q=0,se=e)=>{let ue=new Je(I,U);return ue.position.set(Z,V,q),ue.castShadow=ue.receiveShadow=!0,se.add(ue),ue},g=(I,U,Z,V,q,se,ue,ce,we=e)=>{let Re=new Ht,$=-I/2,me=-U/2;return V=Math.min(V,I/2,U/2,Z/2),Re.moveTo($+V,me),Re.lineTo($+I-V,me),Re.quadraticCurveTo($+I,me,$+I,me+V),Re.lineTo($+I,me+U-V),Re.quadraticCurveTo($+I,me+U,$+I-V,me+U),Re.lineTo($+V,me+U),Re.quadraticCurveTo($,me+U,$,me+U-V),Re.lineTo($,me+V),Re.quadraticCurveTo($,me,$+V,me),f(new Ft(Re,{depth:Z-2*V,bevelEnabled:!0,bevelSize:V,bevelThickness:V,bevelSegments:4,curveSegments:12}),q,se,ue,ce-Z/2+V,we)},v=(I,U,Z,V=e)=>f(new xt(new yt(I.map(q=>new w(...q))),32,U,6,!1),Z,0,0,0,V),_=new ke;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let x=new Ht;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let I of[-.135,.135]){let U=new pn;U.moveTo(I-.075,1.24),U.lineTo(I+.075,1.24),U.lineTo(I+.075,1.34),U.lineTo(I-.075,1.34),U.closePath(),x.holes.push(U)}f(new Ft(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,_),f(new Ft(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,_),g(.46,.5,.12,.035,o,0,.85,.065,_),g(.45,.31,.17,.04,o,0,.4,.1,_);for(let I of[-1,1]){let U=g(.17,.42,.19,.055,a,I*.34,.98,.1,_);U.rotation.z=I*.28,U.rotation.y=-I*.25;let Z=g(.13,.55,.23,.045,a,I*.3,.49,.14,_);Z.rotation.z=-I*.12,v([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,l,_);let V=I*.135;for(let q of[1.235,1.345])g(.16,.014,.022,.004,h,V,q,.015,_);for(let q of[V-.08,V+.08])g(.014,.12,.022,.004,h,q,1.29,.015,_)}let b=g(n?.86:.77,.045,.84,.012,c,0,.435,.34);b.name="seat-base";let L=g(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);L.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let I of[.2,.33,.46,.59])v([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,l);if(n){for(let I of[-1,1])g(.14,.13,.64,.04,a,I*.45,.65,.32),g(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let U of[-.1,.1])v([[U-.1,I,.18],[U,I+.07,.18],[U+.1,I,.18]],.003,l,_)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),v([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let I of[-1,1]){let U=g(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);U.rotation.z=-I*.12,v([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let Z of[.02,.65])g(.13,.09,.12,.015,c,I*.28,-.055,Z),f(new He(.022,.022,.015,12),h,I*.28,-.002,Z)}for(let I=.3;I<1.08;I+=.11)v([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,l,_);for(let I of[-1,1]){let U=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],Z=[],V=[];U.forEach(([ce,we,Re],$)=>{Z.push(ce-.033,we,Re,ce+.033,we,Re),$&&V.push($*2-2,$*2-1,$*2,$*2-1,$*2+1,$*2)});let q=new dt;q.setAttribute("position",new Ie(Z,3)),q.setIndex(V),q.computeVertexNormals();let se=u.clone();se.side=Bt,f(q,se);let ue=g(.27,.055,.025,.008,u,I*.18,.64,.45);ue.rotation.z=-I*.2}let O=f(new He(.065,.065,.035,24),h,0,.66,.48);O.rotation.x=Math.PI/2;let D=f(new He(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);D.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let k=new on().setFromObject(b).min.y;for(let I of e.children)I.position.y-=k;return e.userData.floorContact=0,e}var pc;function Nu(r,e){if(!r.isConnected||e==="none")return;if(!pc){let a=new Xn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ft,a.toneMapping=oi,a.toneMappingExposure=1.25;let o=new _n;o.add(new Un("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new wn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new kt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),pc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=pc;s[e]||(s[e]=mc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Ru;window.pokerPaintBrakePreview=Pu;window.pokerPaintSeatPreview=Nu;var Fu=(r,e,t)=>Math.max(e,Math.min(t,r));function Qp(r,e){let t=window.PokerGarage,n=new ke;r.add(n),n.scale.set(1.24,.86,.95);let i=(S,R,F)=>new yn({color:S,metalness:R,roughness:F,clearcoat:R>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(S,R,F=0,Q=0,B=0,le=n){let X=new Je(S,R);return X.position.set(F,Q,B),X.castShadow=!0,X.receiveShadow=!0,le.add(X),X}let y=(S,R,F,Q,B,le,X)=>p(new Ke(S,R,F),Q,B,le,X);function f(S,R,F,Q,B,le,X="y"){let oe=p(new He(S,S,R,64),F,Q,B,le);return X==="z"&&(oe.rotation.x=Math.PI/2),X==="x"&&(oe.rotation.z=Math.PI/2),oe}function g(S,R,F,Q,B,le,X="z"){let oe=p(new St(S,R,12,80),F,Q,B,le);return X==="y"&&(oe.rotation.x=Math.PI/2),X==="x"&&(oe.rotation.y=Math.PI/2),oe}function v(S,R,F,Q=Ht){let B=new Q,le=-S/2,X=-R/2;return F=Math.min(F,R/2-.001),B.moveTo(le+F,X),B.lineTo(le+S-F,X),B.quadraticCurveTo(le+S,X,le+S,X+F),B.lineTo(le+S,X+R-F),B.quadraticCurveTo(le+S,X+R,le+S-F,X+R),B.lineTo(le+F,X+R),B.quadraticCurveTo(le,X+R,le,X+R-F),B.lineTo(le,X+F),B.quadraticCurveTo(le,X,le+F,X),B}function _(S,R,F,Q,B,le,X=null,oe=.025){let re=v(S,R,Q);if(X){let Te=v(X[0],X[1],X[2],pn),Ce=new pn(Te.getPoints(40).map(ne=>new de(ne.x+(X[3]||0),ne.y)));re.holes.push(Ce)}let Xe=p(new Ft(re,{depth:F,bevelEnabled:oe>0,bevelSize:oe,bevelThickness:oe,bevelSegments:4,curveSegments:40}),B,0,le,0);return Xe.rotation.x=-Math.PI/2,Xe}let x=[],M=n.children.length,b=[3.02,1.51,.65,-.28],L=v(4.96,2.44,1.15).getSpacedPoints(128),O=[],D=[],k=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[S,R]of k)for(let F=0;F<128;F++){let Q=L[F];O.push(Q.x*R,S,-Q.y*R)}for(let S=0;S<3;S++)for(let R=0;R<128;R++){let F=S*128+R,Q=S*128+(R+1)%128;D.push(F,Q,F+128,Q,Q+128,F+128)}let I=new dt;I.setAttribute("position",new Ie(O,3)),I.setIndex(D),I.computeVertexNormals(),s.side=Bt,p(I,s),_(5.03,2.51,.065,1.19,o,.58,null,.035),_(5.1,2.58,.09,1.22,o,1.25,b,.035);let U=new yt(v(4.94,2.42,1.15).getPoints(40).map(S=>new w(S.x,1.44,-S.y)),!0,"centripetal");p(new xt(U,240,.125,16,!0),u);for(let S of[-1,1]){let R=Array.from({length:21},(F,Q)=>{let B=.26+Q*.25/20;return new w(1.32+1.15*Math.cos(B),1.44,S*(.06+1.15*Math.sin(B)))});p(new xt(new yt(R),32,.132,20,!1),o)}_(4.65,2.14,.035,1.03,o,1.39,b,.015),_(4.52,2.01,.025,.97,a,1.43,b,.01),x.push(...n.children.slice(M));let Z=_(2.98,1.47,.025,.63,a,.94);Z.position.x=-.28;let V=new yn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Bt,polygonOffset:!0,polygonOffsetFactor:-1}),q=new qi(v(2.9,1.4,.6)),se=q.attributes.position,ue=q.attributes.uv;for(let S=0;S<se.count;S++)ue.setXY(S,(se.getX(S)+1.45)/2.9,(se.getY(S)+.7)/1.4);let ce=p(q,V,-.28,1.005,0);ce.rotation.x=-Math.PI/2,ce.castShadow=!1;let we=V.clone(),Re=[];for(let S of[-1,1]){let R=p(new jt(3.05,.3),we,0,1.04,S*1.329);S<0&&(R.rotation.y=Math.PI),R.castShadow=!1,Re.push(R)}function $(S){let R=S.vinyl||"none";ce.visible=R!=="none",Re.forEach(Q=>Q.visible=R!=="none");let F=R+":"+(S.vinylText||"");if(V.userData.id!==F){V.map?.dispose(),we.map?.dispose(),V.map=new Et(t.vinylCanvas(R,!1,S.vinylText)),we.map=new Et(t.vinylCanvas(R,!0,S.vinylText));for(let Q of[V,we]){Q.map.colorSpace=ft,Q.map.anisotropy=16;let B=Q.map;B.image.addEventListener("vinyl-ready",()=>{B.needsUpdate=!0},{once:!0}),Q.needsUpdate=!0,Q.userData.id=F}}}let me=_(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);me.position.x=-.28;let he=_(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);he.position.x=-.28;for(let S of[-1,-.35,.35])for(let R of[-.75,.75])y(.011,.4,.009,h,S,1.2,R);function pe(S,R){let F=document.createElement("canvas");F.width=F.height=256;let Q=F.getContext("2d");Q.fillStyle=S,Q.fillRect(0,0,256,256);let B=17;for(let X=0;X<18e3;X++)B=B*1664525+1013904223>>>0,Q.fillStyle="rgba(0,0,0,"+R+")",Q.fillRect(B%256,(B>>>8)%256,1,1);let le=new Et(F);return le.colorSpace=ft,le.wrapS=le.wrapT=Kn,le}a.map=pe("#e8e8e8",.035),a.bumpMap=pe("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=pe("#888888",.12),c.bumpScale=.003,u.bumpMap=pe("#888888",.3),u.bumpScale=.001;function fe(S,R,F,Q,B,le=!1,X=n){let oe=new Ht;oe.moveTo(0,.5),oe.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),oe.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),oe.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),oe.bezierCurveTo(.48,.12,.12,.28,0,.5),oe.moveTo(-.12,-.3),oe.lineTo(0,-.06),oe.lineTo(.12,-.3),oe.closePath();let re=p(new Ft(oe,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),R,F,Q,B,X);return re.scale.setScalar(S),le&&(re.rotation.y=Math.PI),re}let j=[],Ee=[],C=[],E=null;for(let S of[-1.72,1.72])for(let R of[-1,1]){let F=R*1.36,Q=R*1.57,B=new ke;B.position.set(S,.81,F),n.add(B),B.userData.groundWheel=!0;let le=n.children.length,X=p(new Mi([new de(.56,-.19),new de(.61,-.245),new de(.67,-.25),new de(.76,-.19),new de(.8,-.1),new de(.8,.1),new de(.76,.19),new de(.67,.25),new de(.61,.245),new de(.56,.19)],80),c,S,.81,F);X.rotation.x=Math.PI/2;for(let Te=-2;Te<=2;Te++)g(.798-Math.abs(Te)*.012,.0035,h,S,.81,F+Te*.071);for(let Te=0;Te<28;Te++){let Ce=Te*Math.PI/14,ne=Array.from({length:17},(ge,Ge)=>{let Se=Ge/16,be=-.205+Se*.41,Ze=.799-.044*Math.pow(Math.abs(be)/.205,3),nt=Ce+.13*Math.sin(Se*Math.PI);return new w(S+Math.sin(nt)*Ze,.81+Math.cos(nt)*Ze,F+be)});p(new xt(new yt(ne),20,.0045,5,!1),h)}for(let Te of[-1,1])for(let Ce of[.625,.654,.681])g(Ce,.0035,h,S,.81,F+Te*.244);let oe=n.children.slice(le);g(.548,.023,l,S,.81,Q+R*.035),g(.505,.016,l,S,.81,Q+R*.043),f(.14,.045,h,S,.81,Q+R*.045,"z"),g(.14,.012,l,S,.81,Q+R*.069);let re=fe(.2,l,S,.8,Q+R*.075,R<0);Ee.push(re);for(let Te of t.wheelDesign()){let Ce=new yt(Te.map(([ne,ge])=>new w(S+ne,.81+ge,Q+R*(.04+.025*(1-Math.hypot(ne,ge)/.51)))));j.push(p(new xt(Ce,20,.007,6,!1),l))}for(let Te=0;Te<20;Te++){let Ce=Te*Math.PI/10;f(.006,.009,l,S+Math.sin(Ce)*.526,.81+Math.cos(Ce)*.526,Q+R*.06,"z")}n.updateMatrixWorld(!0);for(let Te of n.children.slice(le))B.attach(Te);B.scale.set(.88/1.24,.88/.86,1/.95),B.position.y=.715/.86;let Xe={standard:oe};for(let Te of["soft","medium","hard","semi","wet"]){let Ce=Iu(Te);Ce.visible=!1,B.add(Ce),Xe[Te]=[Ce]}C.push({wheelGroup:B,x:S,out:Q,sign:R,tyres:Xe})}let W=[];for(let S of[-1,1])W.push(y(1.35,.43,.04,o,.05,.94,S*1.3));let z=[];for(let S of[-1,1])z.push(f(.275,.27,h,2.16,.945,S*.97,"z"),g(.278,.035,o,2.16,.945,S*1.11));for(let S of[-1.72,1.72])f(.07,2.8,h,S,.7,0,"z");y(3.6,.08,.8,h,0,.57,0);let T=[];function P(S,R,F){let Q=document.createElement("canvas");Q.width=S,Q.height=R,F(Q.getContext("2d"),S,R);let B=new Et(Q);return B.colorSpace=ft,B.anisotropy=8,T.push(B),B}let G=P(768,256,(S,R,F)=>{S.fillStyle="#101b18",S.fillRect(0,0,R,F),S.strokeStyle="#d9b35b",S.lineWidth=7,S.strokeRect(10,10,R-20,F-20),S.fillStyle="#ebc66c",S.textAlign="center",S.font="italic 116px Georgia",S.fillText("Two Aces",R/2,137),S.font="38px Georgia",S.fillText("\u2660 Poker21 \u2660",R/2,209)}),N=[];for(let S of[-1,1]){let R=new yn({map:G,metalness:.55,roughness:.2,clearcoat:1});N.push(R);let F=p(new jt(1.28,.4),R,.05,.94,S*1.326);R.userData.plane=F,S<0&&(F.rotation.y=Math.PI)}let ae=[];for(let S of[-1,1])for(let R=0;R<3;R++){let F=new ke;F.position.set((R-1)*.7+.05,1,S*1.365),S<0&&(F.rotation.y=Math.PI),n.add(F);let Q=p(new Ke(.1,.1,.025),o,0,0,0,F),B=new _t({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),le=p(new jt(.65,.65),B,0,0,.035,F);le.castShadow=!1,le.receiveShadow=!1,ae.push({group:F,mat:B,back:Q,n:R})}for(let S of[-1,1])for(let R of[-.54,.64])for(let F of[.78,1.1]){let Q=f(.014,.018,o,R,F,S*1.35,"z")}let Y=n.children.length;for(let S of[-1.7,-.35,1.48])for(let R of[-1.21,1.21]){let F=f(.128,.13,o,S,1.44,R,"x")}for(let S of[-1.7,-.35,1.48])for(let R of[-1,1])g(.125,.004,h,S+.08,1.44,R*1.21,"x"),g(.125,.004,h,S-.08,1.44,R*1.21,"x");for(let S of[-1.7,-.35,1.48])for(let R of[-.96,.96])f(.135,.08,o,S,1.49,R),f(.108,.082,h,S,1.498,R),g(.125,.015,o,S,1.54,R,"y"),g(.111,.006,o,S,1.535,R,"y");let K=[],xe=[],Le=["#ab2338","#1b684b","#2455a5"].map(S=>i(S,.08,.55)),Me=i("#eee9d6",.04,.6);for(let[S,R,F,Q]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let B=0;B<Q;B++){f(.104,.033,Le[F],S,1.49+B*.037,R);for(let le=0;le<6;le++){let X=le*Math.PI/3,oe=y(.024,.021,.012,Me,S+Math.cos(X)*.103,1.49+B*.037,R+Math.sin(X)*.103);oe.rotation.y=Math.PI/2-X,oe.castShadow=!1,oe.receiveShadow=!1,K.push(oe)}if(B===Q-1){let le=new _t({transparent:!0,alphaTest:.1,roughness:.65}),X=p(new jt(.208,.208),le,S,1.511+B*.037,R);X.rotation.x=-Math.PI/2,X.castShadow=!1,X.receiveShadow=!1,xe.push({mat:le,n:F})}}x.push(...n.children.slice(Y));let Fe=new ke;Fe.position.set(.89,1.96,0),Fe.scale.set(1/1.24,1/.86,1/.95),n.add(Fe);let Be=new ke;Fe.add(Be);let We=new w((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),at=new w(0,0,1),_e=new w().crossVectors(We,at).normalize();Be.quaternion.setFromRotationMatrix(new je().makeBasis(at,_e,We));let Ne=u.clone();p(new St(.53,.06,16,80),Ne,0,0,0,Be),p(new St(.473,.014,10,64),o,0,0,-.02,Be);for(let S of[Math.PI]){let R=p(new Ke(.09,.39,.045),o,Math.sin(S)*.26,Math.cos(S)*.26,0,Be);R.rotation.z=-S}for(let S of[-1,1]){let R=p(new Ke(.35,.075,.06),o,S*.265,0,0,Be);p(new Ke(.32,.035,.064),h,S*.265,0,.006,Be)}let ye=p(new He(.195,.195,.075,64),o,0,0,.035,Be);ye.rotation.x=Math.PI/2;let De=p(new Vn(.177,64),new _t({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Be);De.receiveShadow=!1,fe(.38,o,0,-.025,.105,!1,Be);let Oe={classic:new ke,sport:new ke,formula:new ke};for(let S of Be.children.slice())Oe.classic.add(S);Object.values(Oe).forEach(S=>Be.add(S));function gt(S,R,F,Q){let B=new yt(R.map(([le,X])=>new w(le,X,0)),!0);p(new xt(B,72,F,12,!0),Q,0,0,0,S)}gt(Oe.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Ne);for(let S of[-1,1])p(new Ke(.35,.065,.045),l,S*.27,0,0,Oe.sport),p(new Ke(.065,.3,.045),l,S*.12,-.22,0,Oe.sport);p(new St(.5,.018,8,64,.22),d,0,0,.005,Oe.sport),gt(Oe.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Ne),p(new Ke(.6,.23,.065),h,0,0,0,Oe.formula);for(let S of[-1,1])p(new qt(.035,12,8),d,S*.25,.055,.06,Oe.formula),p(new Ke(.08,.29,.025),l,S*.37,0,-.07,Oe.formula);for(let S of["sport","formula"]){let R=p(new He(.15,.15,.07,48),l,0,0,.035,Oe[S]);R.rotation.x=Math.PI/2,p(new Vn(.13,48),h,0,0,.078,Oe[S]),fe(.25,l,0,-.018,.09,!1,Oe[S])}for(let[S,R]of Object.entries(t.steeringDesigns)){let F=new ke;Be.add(F),Oe[S]=F;let Q=i(R.color,S==="woodHeritage"?.3:.55,.35);R.shape==="round"?p(new St(.53,.065,16,80),Q,0,0,0,F):R.shape==="flat"?gt(F,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Q):J([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Q,F);for(let le=0;le<R.spokes;le++){let X=le*Math.PI*2/R.spokes,oe=p(new Ke(.39,.065,.05),l,Math.cos(X)*.25,Math.sin(X)*.25,.015,F);oe.rotation.z=X}let B=p(new He(.15,.15,.075,40),h,0,0,.05,F);B.rotation.x=Math.PI/2,fe(.23,l,0,-.015,.095,!1,F),p(new Ke(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,F)}let Ae=i("#b9ab8a",.15,.8),ot=i("#171c20",.02,.85);for(let[S,R]of Object.entries(Oe)){let F=S==="classic"?.53:S==="sport"?.51:.47;for(let B of[-1,1]){if(S!=="formula"){let le=p(new St(F,.072,12,30,.64),ot,0,0,.003,R);le.rotation.z=B<0?Math.PI-.32:-.32}for(let le=0;le<9;le++){let X=(B<0?Math.PI:0)-.28+le*.07;p(new qt(.007,6,4),Ae,Math.cos(X)*(F-.045),Math.sin(X)*(F-.045),.063,R)}}let Q=p(new Ke(.065,.1,.035),S==="classic"?o:d,0,S==="formula"?.16:.51,.045,R);for(let B=0;B<6;B++){let le=B*Math.PI/3,X=p(new He(.012,.012,.012,6),l,Math.cos(le)*.13,Math.sin(le)*.13,.099,R);X.rotation.x=Math.PI/2}}let rt=new w(1.3,1.48,0),$t=new w(.89,1.96,0),ln=$t.clone().sub(rt),H=rt.clone().add($t).multiplyScalar(.5),Ut=y(.12,ln.length(),.095,o,...H.toArray());Ut.quaternion.setFromUnitVectors(new w(0,1,0),ln.normalize()),y(.075,Ut.geometry.parameters.height-.04,.1,h,...H.toArray()).quaternion.copy(Ut.quaternion);let lt=-1.84,Pt=1.99,En=.74,Xt=new ke;Xt.name="garage-turbine-primary",Xt.position.set(lt,Pt,0),n.add(Xt);let Qt=n.children.length;f(En,.51,o,lt,Pt,0,"z"),f(.67,.54,h,lt,Pt,0,"z");for(let S of[-1,1]){let R=S*.29;g(.72,.055,h,lt,Pt,R),g(.75,.022,o,lt,Pt,R+S*.03),g(.665,.012,d,lt,Pt,R+S*.025);for(let F=0;F<14;F++){let Q=F*Math.PI/7,B=[],le=[];for(let re=0;re<=16;re++){let Xe=re/16,Te=.22+Xe*.44,Ce=Q+.55*Xe;for(let ne of[-.15,.15])B.push(lt+Math.sin(Ce+ne)*Te,Pt+Math.cos(Ce+ne)*Te,R+S*(.018+Math.sin(Xe*Math.PI)*.12))}for(let re=0;re<16;re++){let Xe=re*2;le.push(Xe,Xe+1,Xe+2,Xe+1,Xe+3,Xe+2)}let X=new dt;X.setAttribute("position",new Ie(B,3)),X.setIndex(le),X.computeVertexNormals(),m.side=Bt,p(X,m);let oe=new yt(Array.from({length:17},(re,Xe)=>{let Te=Xe/16,Ce=.22+Te*.44,ne=Q+.55*Te-.15;return new w(lt+Math.sin(ne)*Ce,Pt+Math.cos(ne)*Ce,R+S*(.025+Math.sin(Te*Math.PI)*.12))}));p(new xt(oe,20,.009,6,!1),d)}f(.215,.07,o,lt,Pt,R+S*.085,"z"),f(.18,.085,h,lt,Pt,R+S*.11,"z")}for(let S=0;S<12;S++){let R=S*Math.PI/6,F=y(.045,.15,.2,h,lt+Math.cos(R)*.735,Pt+Math.sin(R)*.735,0);F.rotation.z=R}n.updateMatrixWorld(!0);for(let S of n.children.slice(Qt))Xt.attach(S);Xt.rotation.set(0,Math.PI/2,0),Xt.scale.set(.96/1.24,.96/.86,.96/.95);let Ot=Xt.clone(!0);Ot.name="garage-turbine-secondary",n.add(Ot);let st=new ke;Xt.add(st);let sn=i("#829aaa",.92,.24);for(let S of[-.24,-.08,.08,.24])p(new St(.765,.028,10,80),sn,0,0,S,st);for(let S=0;S<8;S++){let R=S*Math.PI/4,F=p(new He(.025,.025,.025,6),sn,Math.sin(R)*.73,Math.cos(R)*.73,.35,st);F.rotation.x=Math.PI/2}let It={classic:new ke,dual:new ke,titanium:new ke},zt=i("#a9b7c4",.92,.23),en=i("#668bb5",.88,.25);Object.values(It).forEach(S=>n.add(S));for(let[S,R]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let F of R){let Q=S==="titanium"?en:zt,B=p(new He(.105,.105,.5,32),Q,-2.42,.76,F,It[S]);B.rotation.z=Math.PI/2;let le=p(new He(.079,.079,.012,32),h,-2.678,.76,F,It[S]);le.rotation.z=Math.PI/2;let X=p(new St(.094,.012,8,32),Q,-2.69,.76,F,It[S]);X.rotation.y=Math.PI/2}for(let[S,R]of Object.entries(It)){let F=S==="classic"?[0]:[-.67,.67];for(let B of F){let le=p(new He(.18,.18,.52,40),zt,-2.19,.76,B,R);le.rotation.z=Math.PI/2;for(let X of[-2.36,-2.04]){let oe=p(new St(.184,.016,8,40),h,X,.76,B,R);oe.rotation.y=Math.PI/2,p(new Ke(.07,.19,.07),zt,X,.94,B,R)}}let Q=S==="classic"?[0]:S==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let B of Q){let le=p(new He(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,B,R);le.rotation.z=Math.PI/2;let X=p(new St(.107,.018,10,40),S==="titanium"?en:zt,-2.57,.76,B,R);if(X.rotation.y=Math.PI/2,S==="titanium")for(let[oe,re]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let Xe=p(new St(.106,.008,6,40),i(re,.85,.3),oe,.76,B,R);Xe.rotation.y=Math.PI/2}}}for(let S of[-1,1]){let R=new yt([new w(-2.16,1.46,S*.65),new w(-1.94,1.66,S*.69),new w(-1.3,1.59,S*.64),new w(-.98,1.47,S*.7)]);p(new xt(R,32,.022,8,!1),o),y(.34,.06,.14,o,-1.84,1.48,S*.4)}for(let S of[-1,1]){let R=new yt([new w(-2.45,1.1,S*.7),new w(-2.43,1.36,S*.72),new w(-2.19,1.55,S*.7),new w(-1.9,1.55,S*.68)]);p(new xt(R,40,.075,14,!1),h),p(new xt(R,40,.019,10,!1),o);for(let F of[-2.2,-1.96]){let Q=new yt([new w(F,1.43,S*.48),new w(F,1.63,S*.6),new w(F+.24,1.57,S*.82)]);p(new xt(Q,24,.017,8,!1),o)}}let tn=n.children.length,fn=[],cn=[],gn=[];for(let S=0;S<=48;S++){let R=-.92+S*1.84/48;for(let F of[.64,1.23])cn.push(2.57-.28*(Math.sin(R)*1.25/1.1)**2,F,Math.sin(R)*1.25)}for(let S=0;S<48;S++){let R=S*2;gn.push(R,R+2,R+1,R+1,R+2,R+3)}let jn=new dt;jn.setAttribute("position",new Ie(cn,3)),jn.setIndex(gn),jn.computeVertexNormals();let Mn=i("#00453f",.72,.14);Mn.clearcoat=1,Mn.side=Bt,p(jn,Mn);for(let S of[.635,1.225]){let R=Array.from({length:65},(F,Q)=>{let B=-1.04+Q*2.08/64;return new w(2.57-.28*(B/1.1)**2,S,B)});p(new xt(new yt(R),80,.034,12,!1),o)}for(let S of[-1,1]){let R=S*1,F=2.57-.28*(R/1.1)**2,Q=new yt([new w(F-.04,.635,R),new w(F+.05,.78,R),new w(F+.065,1.12,R),new w(F-.04,1.25,R)]);p(new xt(Q,32,.065,12,!1),o);for(let B of[.91,1.065]){let le=Array.from({length:16},(X,oe)=>{let re=S*(.51+oe*.41/15);return new w(2.57-.28*(re/1.1)**2+.018,B,re)});fn.push(p(new xt(new yt(le),24,.017,8,!1),d))}}let nn=[];for(let S=0;S<2;S++){let R=new Et(t.cardCanvas(e.cards,S));R.colorSpace=ft,R.anisotropy=16;let F=new kn({map:R,transparent:!0,toneMapped:!1});nn.push(F);let Q=1.65,B=S?.34:-.34,le=y(.47,.008,.63,i("#ddd9cf",0,.95),Q,1.474+S*.003,B);le.rotation.y=-(S?-.08:.08);let X=p(new jt(.5,.67),F,Q,1.48+S*.003,B);X.rotation.x=-Math.PI/2,X.rotation.z=S?-.08:.08,X.castShadow=!1,X.receiveShadow=!1}x.push(...n.children.slice(tn));let Qn=new _t({map:new Et(t.plateCanvas(e)),roughness:.6});for(let S of[-1,1]){let R=p(new jt(.79,.463),Qn,S*2.605,1.01,0);R.rotation.y=S*Math.PI/2,S>0&&x.push(R)}let bt={},Ct=i("#7d8c98",.82,.28),A=i("#202a32",.45,.38),ee=i("#a7c6d5",.98,.055),te=i("#182029",.35,.48);te.bumpMap=pe("#888888",.2),te.bumpScale=.001;function ie(S,R,F,Q,B,le,X,oe,re){let Xe=new Ft(v(S,R,Q),{depth:F,bevelEnabled:!0,bevelSize:Math.min(.012,F*.2),bevelThickness:Math.min(.012,F*.2),bevelSegments:3,curveSegments:12});return Xe.translate(0,0,-F/2),p(Xe,B,le,X,oe,re)}function J(S,R,F,Q){return p(new xt(new yt(S.map(B=>new w(...B))),40,R,12,!1),F,0,0,0,Q)}function ve(S,R,F,Q){let B=p(new He(.014,.014,.014,6),Ct,S,R,F,Q);B.rotation.x=Math.PI/2}function ze(S,R,F,Q,B,le){let X=new Ht;X.moveTo(-Q*.5,0),X.bezierCurveTo(-Q*.52,.055,-Q*.12,.07,Q*.5,.008),X.quadraticCurveTo(Q*.05,-.025,-Q*.5,0);let oe=new Ft(X,{depth:F,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});oe.translate(0,0,-F/2);let re=p(oe,B,S,R,0,le);return re.rotation.z=-.08,re}for(let S of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){bt[S]={};for(let R of S==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let F=new ke;n.add(F),bt[S][R]=F;let Q=["sport","aero"].includes(R)?te:Ct;if(S==="spoiler"){n.remove(F);let B=dc(R,{paint:s,carbon:te,metal:Ct});n.add(B),bt.spoiler[R]=B;continue}if(S==="mirrors")for(let B of[-1,1]){let le=R==="aero",X=le?1.77:1.86,oe=B*(le?1.47:1.53),re=.77;ie(.18,.08,.15,.035,A,.64,1.46,B*1.19,F),J([[.64,1.47,B*1.19],[.62,1.62,B*1.32],[re,X-.07,oe]],le?.023:.029,Q,F);let Xe=p(new qt(.046,16,12),A,re,X-.065,oe,F);if(R==="round"){p(new qt(1,32,20),Ct,re,X,oe,F).scale.set(.065,.15,.15);let Ce=p(new Vn(.13,48),ee,re-.056,X,oe,F);Ce.rotation.y=-Math.PI/2,Ce.castShadow=!1;let ne=p(new St(.136,.009,8,48),Ct,re-.06,X,oe,F);ne.rotation.y=Math.PI/2}else{let Te=le?.31:R==="sport"?.35:.38,Ce=le?.16:.22,ne=ie(Te,Ce,.095,.065,R==="club"?A:te,re,X,oe,F);ne.rotation.y=Math.PI/2;let ge=p(new qi(v(Te-.045,Ce-.035,.05)),ee,re-.061,X,oe,F);ge.rotation.y=-Math.PI/2,ge.castShadow=!1,ge.receiveShadow=!1;let Ge=v(Te-.028,Ce-.018,.055).getPoints(24).map(Se=>[re-.058,X+Se.y,oe+Se.x]);Ge.push(Ge[0]),J(Ge,.006,Ct,F)}}else if(S==="sideSkirts")for(let B of[-1,1]){let le=ie(2.3,R==="aero"?.17:.12,R==="rally"?.27:.13,.05,Q,0,.59,B*1.24,F);if(R==="rally")for(let X of[-.84,-.42,0,.42,.84]){let oe=ie(.13,.018,.25,.018,A,X,.67,B*1.24,F)}else J([[-1.08,.54,B*1.3],[0,.53,B*1.32],[1.08,.54,B*1.3]],.009,d,F);for(let X of[-.87,.87])ie(.12,.14,.16,.025,A,X,.65,B*1.2,F),ve(X,.61,B*1.33,F);if(R==="aero")for(let X of[-.95,.95]){let oe=ie(.24,.12,.025,.025,te,X,.57,B*1.35,F);oe.rotation.z=X>0?.2:-.2}}else{let B=S==="frontBumper"?1:-1,le=[[B*2.26,.66,-.92],[B*2.58,.65,-.7],[B*2.67,.65,0],[B*2.58,.65,.7],[B*2.26,.66,.92]];J(le,R==="sport"?.061:.047,Q,F);for(let X of[-.67,.67]){J([[B*2.31,.74,X],[B*2.5,.68,X]],.032,A,F);let oe=ie(.16,.12,.13,.035,A,B*2.51,.67,X,F)}if(R==="aero"){let X=ie(.38,.045,1.94,.07,te,B*2.48,.5,0,F);for(let oe of[-.7,-.27,.27,.7])ie(.27,.12,.022,.025,A,B*2.48,.55,oe,F);J([[B*2.4,.52,-.91],[B*2.64,.52,0],[B*2.4,.52,.91]],.008,Ct,F)}if(R==="rally")for(let X of[-.72,.72])J([[B*2.53,.65,X-.14],[B*2.56,.94,X-.14],[B*2.55,1.04,X],[B*2.56,.94,X+.14],[B*2.53,.65,X+.14]],.036,Ct,F);if(R==="sport")for(let X of[-.67,.67]){let oe=ie(.2,.13,.14,.045,A,B*2.56,.66,X,F)}if(S==="rearBumper"&&R==="aero")for(let X of[-.7,-.35,0,.35,.7]){let oe=ie(.27,.15,.025,.025,te,-2.46,.48,X,F);oe.rotation.z=.12}}}}let Pe=i("#b9e4f5",.28,.17);Pe.emissive.set("#b9e4f5"),Pe.emissiveIntensity=1.8;let Ve=i("#ffdda0",.2,.2);Ve.emissive.set("#ffe0a8"),Ve.emissiveIntensity=1.25;for(let S of["frontBumper","rearBumper"])for(let[R,F,Q]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let B=new ke;n.add(B),bt[S][R]=B;let le=S==="frontBumper"?1:-1,X=R==="trackGT"?.34:.29,oe=.59,re=v(F,X,.1);for(let[Se,be]of[[0,.94],[-.79,.32],[.79,.32]]){let Ze=v(be,.115,.045,pn);re.holes.push(new pn(Ze.getPoints(24).map(nt=>new de(nt.x+Se,nt.y))))}let Xe=new Ft(re,{depth:Q,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),Te=Xe.attributes.position;for(let Se=0;Se<Te.count;Se++){let be=Te.getX(Se),Ze=Te.getY(Se),nt=Te.getZ(Se);Te.setXYZ(Se,le*(2.43+nt-.24*(be/(F/2))**2),oe+Ze,be)}Xe.computeVertexNormals(),p(Xe,s,0,0,0,B);for(let[Se,be]of[[0,.94],[-.79,.32],[.79,.32]]){let Ze=le*(2.43-.24*(Se/(F/2))**2);ie(.025,.14,be+.02,.04,h,Ze,oe,Se,B);for(let nt of[-.032,.012,.045])ie(.012,.006,be-.035,.003,A,Ze+le*.022,oe+nt,Se,B)}let Ce=Array.from({length:41},(Se,be)=>{let Ze=-F/2+be*F/40;return[le*(2.44+Q+.045-.24*(Ze/(F/2))**2),oe-X/2-.025,Ze]});J(Ce,R==="trackGT"?.028:.019,te,B);let ne=new dt,ge=[],Ge=[];for(let[Se,be,Ze]of Ce)ge.push(Se,be,Ze,Se-le*.17,be+.005,Ze);for(let Se=0;Se<40;Se++){let be=Se*2;Ge.push(be,be+1,be+2,be+1,be+3,be+2)}if(ne.setAttribute("position",new Ie(ge,3)),ne.setIndex(Ge),ne.computeVertexNormals(),p(ne,te,0,0,0,B),S==="rearBumper")for(let Se=0;Se<(R==="trackGT"?5:3);Se++){let be=(Se-(R==="trackGT"?2:1))*.3,Ze=ie(.24,.075,.014,.008,te,-2.48,oe-X/2-.035,be,B);Ze.rotation.z=-.12}else if(R==="trackGT")for(let Se of[-.92,.92]){let be=ie(.18,.05,.018,.008,te,2.43,oe-X/2,Se,B);be.rotation.z=.08}}for(let S of["formula","formulaPro","formulaElite"]){let R=Du(S,{paint:s,carbon:te,metal:Ct,accent:o});n.add(R),bt.frontBumper[S]=R}for(let S of["rearBumper","sideSkirts","spoiler"])for(let R of["formula","formulaPro"]){let F=new ke;F.name=S+"-"+R,n.add(F),bt[S][R]=F;let Q=R==="formulaPro";if(S==="rearBumper"){ie(.48,.16,Q?2.3:2.05,.03,te,-2.47,.45,0,F);for(let B=-3;B<=3;B++){let le=ie(.64,.23,.025,.01,te,-2.48,.44,B*.3,F);le.rotation.z=-.15}for(let B of[-1,1])J([[-2.2,.54,B*1],[-2.65,.62,B*1.1]],.025,s,F)}else if(S==="sideSkirts")for(let B of[-1,1]){let le=ie(2.35,Q?.42:.33,.34,.08,s,-.15,.83,B*1.3,F);le.rotation.z=-.045,ie(2.65,.055,.48,.025,te,-.06,.58,B*1.3,F),ie(.07,.21,.24,.035,h,.96,.87,B*1.3,F);for(let X=0;X<(Q?3:1);X++)ie(.35,.11,.025,.01,te,.48-X*.32,.65,B*1.53,F)}else{n.remove(F);let B=dc(R,{paint:s,carbon:te,metal:Ct});n.add(B),bt.spoiler[R]=B}}bt.headlights={};for(let S of["round","projector","rally","matrix"]){let R=new ke;n.add(R),bt.headlights[S]=R;for(let F of[-1,1]){let Q=F*.74,B=2.57-.28*(Q/1.1)**2+.07,le=1.075;if(S==="matrix"){let X=ie(.4,.2,.075,.045,A,B,le,Q,R);X.rotation.y=Math.PI/2;let oe=ie(.35,.15,.01,.035,h,B+.05,le,Q,R);oe.rotation.y=Math.PI/2;for(let re=0;re<4;re++){let Xe=ie(.06,.1,.012,.017,Pe,B+.065,le,Q-.128+re*.085,R);Xe.rotation.y=Math.PI/2,Xe.castShadow=!1}}else{let X=S==="rally"?.16:S==="round"?.14:.135,oe=p(new He(X+.027,X+.02,.095,48),A,B,le,Q,R);oe.rotation.z=Math.PI/2;let re=p(new St(X+.008,.01,10,48),Ct,B+.054,le,Q,R);re.rotation.y=Math.PI/2;let Xe=p(new qt(1,32,20),S==="round"||S==="rally"?Ve:Pe,B+.055,le,Q,R);if(Xe.scale.set(.025,X,X),Xe.castShadow=!1,S==="projector"){let Te=p(new St(X*.8,.008,8,48),Pe,B+.076,le,Q,R);Te.rotation.y=Math.PI/2,p(new qt(1,24,16),ee,B+.081,le,Q,R).scale.set(.022,X*.53,X*.53)}if(S==="rally")for(let Te of[-.07,0,.07]){let Ce=Math.sqrt(X*X-Te*Te);J([[B+.09,le-Ce,Q+Te],[B+.1,le,Q+Te],[B+.09,le+Ce,Q+Te]],.009,A,R)}}}}for(let[S,R]of Object.entries(t.streetHeadlights)){let F=new ke;n.add(F),bt.headlights[S]=F;let Q=i(R.color,.12,.22);Q.emissive.set(R.color),Q.emissiveIntensity=R.smoke?.35:1.1;let B=i(R.smoke?"#1c3348":"#83b6d5",.45,.12);for(let le of[-1,1]){let X=le*.72,oe=2.57-.28*(X/1.1)**2+.07,re=1.075;if(R.shape==="sportHousing"){let Ce=new Ht;Ce.moveTo(-.29,.12),Ce.lineTo(.23,.09),Ce.quadraticCurveTo(.32,.02,.26,-.13),Ce.lineTo(-.25,-.14),Ce.closePath();let ne=p(new Ft(Ce,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),A,oe+.02,re,X,F);ne.rotation.y=Math.PI/2;for(let ge=0;ge<2;ge++){let Ge=X+(ge-.5)*.24;if(p(new qt(1,24,16),B,oe+.13,re,Ge,F).scale.set(.022,.067,.067),R.signature==="rings"){let be=p(new St(.086,.01,10,48),Q,oe+.155,re,Ge,F);be.rotation.y=Math.PI/2}if(R.signature==="doubleL"&&J([[oe+.155,re+.075,Ge-.085],[oe+.155,re-.075,Ge-.085],[oe+.155,re-.075,Ge+.075]],.012,Q,F),R.signature==="pixels")for(let be=0;be<3;be++)p(new Ke(.014,.026,.026),Q,oe+.155,re+.09,Ge-.055+be*.055,F)}R.signature==="arc"&&J([[oe+.155,re-.09,X-.25],[oe+.155,re+.1,X-.25],[oe+.155,re+.12,X],[oe+.155,re+.07,X+.25]],.012,Q,F);continue}let Xe=ie(.47,.25,.1,.04,A,oe,re,X,F);Xe.rotation.y=Math.PI/2;for(let Ce of[-.18,.18]){p(new Ke(.1,.07,.035),Ct,oe-.035,re-.15,X+Ce,F);let ne=p(new He(.012,.012,.018,12),o,oe+.02,re-.13,X+Ce,F);ne.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(R.shape)){let Ce=R.shape==="doubleU"?2:1;for(let ne=0;ne<Ce;ne++){let ge=X+(ne-(Ce-1)/2)*.21;if(p(new qt(1,24,16),B,oe+.073,re,ge,F).scale.set(.019,.067,.067),R.shape==="doubleU")J([[oe+.1,re+.075,ge-.08],[oe+.1,re-.04,ge-.08],[oe+.1,re-.08,ge-.045],[oe+.1,re-.08,ge+.045],[oe+.1,re-.04,ge+.08],[oe+.1,re+.075,ge+.08]],.01,Q,F);else if(R.shape==="brow"){J([[oe+.1,re+.055,ge-.19],[oe+.1,re+.093,ge-.14],[oe+.1,re+.093,ge+.19]],.011,Q,F);let Se=p(new St(.068,.006,8,32),Q,oe+.095,re-.015,ge,F);Se.rotation.y=Math.PI/2}else for(let Se=0;Se<3;Se++){let be=Se*Math.PI*2/3-Math.PI/2;J([[oe+.102,re+Math.sin(be)*.025,ge+Math.cos(be)*.025],[oe+.102,re+Math.sin(be)*.1,ge+Math.cos(be)*.1]],.011,Q,F)}}continue}if(R.shape==="bar"){for(let[Ce,ne,ge]of[[.035,.41,.025],[-.045,.33,.012]]){let Ge=ie(ne,ge,.014,.006,Q,oe+.064,re+Ce,X,F);Ge.rotation.y=Math.PI/2,Ge.castShadow=!1}continue}if(R.shape==="square"){let Ce=ie(.37,.17,.024,.015,Q,oe+.065,re,X,F);Ce.rotation.y=Math.PI/2;for(let ne=0;ne<7;ne++)p(new Ke(.006,.16,.004),B,oe+.082,re,X-.15+ne*.05,F);continue}let Te=R.count===3?.062:R.count===2?.087:.106;for(let Ce=0;Ce<R.count;Ce++){let ne=X+(Ce-(R.count-1)/2)*(R.count===3?.14:.205),ge=p(new He(Te+.014,Te+.02,.09,R.shape==="hex"?6:40),h,oe+.035,re,ne,F);ge.rotation.z=Math.PI/2;let Ge=p(new St(Te,.009,8,R.shape==="hex"?6:48),Q,oe+.09,re,ne,F);Ge.rotation.y=Math.PI/2,Ge.castShadow=!1;let Se=p(new qt(1,24,16),R.projector?B:Q,oe+.077,re,ne,F);if(Se.scale.set(.018,Te*.74,Te*.74),Se.castShadow=!1,R.projector&&p(new qt(1,16,12),Q,oe+.092,re,ne,F).scale.set(.006,Te*.31,Te*.31),R.cross||R.guard)for(let be of[-1,1])J([[oe+.11,re-Te*.74,ne-be*Te*.74],[oe+.115,re,ne],[oe+.11,re+Te*.74,ne+be*Te*.74]],.009,A,F)}}}let Qe={};for(let S of["club","sport","rally","chrome"]){let R=[];Qe[S]=R;for(let{wheelGroup:F,sign:Q}of C){let B=new ke;F.add(B),R.push(B);let le=S==="rally"?.91:.87,X=S==="rally"?.64:S==="sport"?.49:.57,oe=S==="sport"?1:1.23,re=[],Xe=[];for(let ge=0;ge<=48;ge++){let Ge=-oe+ge*oe*2/48;for(let Se of[-X/2,X/2])re.push(Math.sin(Ge)*le,Math.cos(Ge)*le,Se)}for(let ge=0;ge<48;ge++){let Ge=ge*2;Xe.push(Ge,Ge+1,Ge+2,Ge+1,Ge+3,Ge+2)}let Te=new dt;Te.setAttribute("position",new Ie(re,3)),Te.setIndex(Xe),Te.computeVertexNormals();let ne=(S==="chrome"?Ct:S==="club"?s:te).clone();ne.side=Bt,p(Te,ne,0,0,0,B);for(let ge of[-1,1]){let Ge=Array.from({length:49},(Se,be)=>{let Ze=-oe+be*oe*2/48;return[Math.sin(Ze)*le,Math.cos(Ze)*le,ge*X/2]});J(Ge,.012,S==="chrome"?Ct:A,B)}for(let ge of[-1,1])J([[0,0,-Q*.28],[ge*.28,.42,-Q*.31],[ge*.49,.68,-Q*.31]],.022,A,B),ve(ge*.49,.68,-Q*.32,B);if(S==="rally"){let ge=ie(.13,.25,X*.9,.025,A,-.83,.2,0,B)}B.userData.shell=ne}}bt.windshield={};for(let[S,R,F,Q]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let le=function(Se,be){let Ze=.92*(1-.13*be),nt=1-Se*Se;return[1.97+.23*nt-R*.32*be,1.5+R*be*(.84+.16*nt),Se*Ze]},B=new ke;n.add(B),bt.windshield[S]=B;let X=[],oe=[],re=40,Xe=16;for(let Se=0;Se<=Xe;Se++)for(let be=0;be<=re;be++)X.push(...le(-1+be*2/re,Se/Xe));for(let Se=0;Se<Xe;Se++)for(let be=0;be<re;be++){let Ze=Se*(re+1)+be;oe.push(Ze,Ze+1,Ze+re+1,Ze+1,Ze+re+2,Ze+re+1)}let Te=new dt;Te.setAttribute("position",new Ie(X,3)),Te.setIndex(oe),Te.computeVertexNormals();let Ce=new yn({color:F,metalness:.05,roughness:.075,transparent:!0,opacity:Q,depthWrite:!1,side:Bt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});B.userData.glass=Ce,B.userData.originalTint={color:F,opacity:Q};let ne=p(Te,Ce,0,0,0,B);ne.castShadow=!1,ne.receiveShadow=!1,ne.renderOrder=3;let ge=["smoke","highSmoke"].includes(S)?A:Ct;for(let Se of[0,1])J(Array.from({length:41},(be,Ze)=>le(-1+Ze/20,Se)),Se===0?.017:.009,ge,B);for(let Se of[-1,1]){J(Array.from({length:17},(nt,Gt)=>le(Se,Gt/16)),.011,ge,B);let be=le(Se,0);ie(.19,.055,.14,.025,A,be[0],be[1]-.025,be[2],B);let Ze=p(new He(.013,.013,.018,6),Ct,be[0]+.04,be[1]+.014,be[2],B)}let Ge=new kn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let Se of[-.77,-.69]){let be=Array.from({length:13},(nt,Gt)=>{let wt=le(Se,.18+Gt*.058);return wt[0]+=.004,wt}),Ze=J(be,.003,Ge,B);Ze.castShadow=!1,Ze.receiveShadow=!1,Ze.renderOrder=4}}let Ye=new ke;for(let S of n.children.slice())S.userData.groundWheel||Ye.add(S);n.add(Ye);let et=i("#b8c7d6",.72,.27),it=new ke,Lt=[];n.add(it);for(let S of[-1.72,1.72])for(let R of[-1,1]){let F=new ke;F.position.set(S,.52,R*1.12),it.add(F);let Q=Array.from({length:193},(Ce,ne)=>{let ge=ne/192,Ge=ge*Math.PI*14;return new w(Math.cos(Ge)*.071,.055+ge*.36,Math.sin(Ge)*.071)}),B=p(new xt(new yt(Q),192,.014,10,!1),et,0,0,0,F);p(new He(.039,.039,.23,24),A,0,.14,0,F);let le=p(new He(.018,.018,.28,20),Ct,0,.34,0,F),X=new ke;X.position.y=.47,F.add(X);for(let[Ce,ne]of[[F,.04],[X,-.015]])p(new He(.095,.095,.026,32),Ct,0,ne,0,Ce),p(new He(.068,.068,.018,24),A,0,ne+.02,0,Ce);p(new Ke(.14,.075,.18),A,0,.025,R*.035,F),p(new Ke(.16,.075,.22),A,0,0,-R*.075,X);let oe=new w(S,.56,R*1.12),re=new w(S,.81,R*1.43),Xe=re.clone().sub(oe);p(new He(.026,.026,Xe.length(),16),A,...oe.clone().add(re).multiplyScalar(.5).toArray(),it).quaternion.setFromUnitVectors(new w(0,1,0),Xe.normalize()),Lt.push({coil:B,rod:le,upper:X})}bt.brakes={};for(let S of["stock","red","gold","ceramic"]){let R=new ke;n.add(R),bt.brakes[S]=R;for(let{wheelGroup:F,sign:Q}of C){let B=hc(S);B.position.z=Q*.165,Q<0&&(B.rotation.y=Math.PI),F.add(B),R.userData.brakeAssemblies??=[],R.userData.brakeAssemblies.push(B)}}bt.nitrous={};let Dt=document.createElement("canvas");Dt.width=512,Dt.height=256;let vt=Dt.getContext("2d");vt.fillStyle="#101923",vt.fillRect(0,0,512,256),vt.strokeStyle="#e8e1cc",vt.lineWidth=8,vt.strokeRect(10,10,492,236),vt.fillStyle="#f5f2e8",vt.textAlign="center",vt.font="italic bold 106px Arial",vt.fillText("N\u2082O",256,117),vt.font="bold 24px Arial",vt.fillText("NITROUS OXIDE",256,159),vt.fillStyle="#d9b36b",vt.font="bold 18px Arial",vt.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let S=0;S<42;S++)vt.fillRect(165+S*4,212,S%3+1,17);let Rt=new Et(Dt);Rt.colorSpace=ft,Rt.anisotropy=8;let ht=document.createElement("canvas");ht.width=ht.height=128;let tt=ht.getContext("2d");tt.fillStyle="#eee9dc",tt.fillRect(0,0,128,128),tt.translate(64,64),tt.strokeStyle="#17202a";for(let S=0;S<=20;S++){let R=-Math.PI*.8+S*Math.PI*1.6/20;tt.lineWidth=S%5?2:4,tt.beginPath(),tt.moveTo(Math.sin(R)*43,-Math.cos(R)*43),tt.lineTo(Math.sin(R)*(S%5?49:53),-Math.cos(R)*(S%5?49:53)),tt.stroke()}tt.fillStyle="#293541",tt.textAlign="center",tt.font="bold 14px Arial",tt.fillText("PSI",0,30),tt.strokeStyle="#c92737",tt.lineWidth=4,tt.beginPath(),tt.moveTo(-9,12),tt.lineTo(26,-31),tt.stroke(),tt.fillStyle="#25313a",tt.beginPath(),tt.arc(0,0,6,0,Math.PI*2),tt.fill();let Yt=new Et(ht);Yt.colorSpace=ft;for(let S of["blue","twin","triple"]){let R=new ke;R.name="nitrous-"+S,n.add(R),bt.nitrous[S]=R;let F=i(t.item("nitrous",S).color,.65,.27),Q=S==="triple"?3:S==="twin"?2:1,B=1.49,le=-1.3,X=.37,oe=i("#b4924f",.8,.3),re=i("#a5b2bd",.85,.24),Xe=i("#1b2028",.08,.85),Te=i("#ab2635",.35,.4);for(let Ce of[-1.52,-1.13]){ie(.095,.05,Q*X+.04,.015,h,Ce,1.29,0,R);for(let ne of[-1,1]){let ge=ne*(Q*X/2-.02);p(new He(.024,.024,.023,6),re,Ce,1.327,ge,R)}}for(let Ce=0;Ce<Q;Ce++){let ne=(Ce-(Q-1)/2)*X,ge=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Sn,On])=>new de(Sn,On)),Ge=p(new Mi(ge,40),F,le,B,ne,R);Ge.rotation.z=-Math.PI/2;for(let Sn of[-1.52,-1.13]){ie(.11,.095,.27,.025,Xe,Sn,1.35,ne,R);let On=p(new St(.152,.013,8,40),re,Sn,B,ne,R);On.rotation.y=Math.PI/2,ie(.08,.025,.055,.008,re,Sn,B+.155,ne,R),p(new He(.013,.013,.018,6),h,Sn,B+.179,ne,R)}let Se=[],be=[],Ze=[];for(let Sn=0;Sn<2;Sn++)for(let On=0;On<=16;On++){let fc=-.91+On*1.82/16;if(Se.push(le+(Sn?.12:-.12),B+Math.cos(fc)*.147,ne+Math.sin(fc)*.147),be.push(Sn,On/16),Sn&&On){let sr=17+On;Ze.push(sr-18,sr-17,sr,sr-18,sr,sr-1)}}let nt=new dt;nt.setAttribute("position",new Ie(Se,3)),nt.setAttribute("uv",new Ie(be,2)),nt.setIndex(Ze),nt.computeVertexNormals();let Gt=new yn({map:Rt,roughness:.55,metalness:.05,side:Bt});p(nt,Gt,0,0,0,R);let wt=p(new He(.046,.046,.055,24),oe,-.89,B,ne,R);wt.rotation.z=Math.PI/2,ie(.075,.07,.065,.012,oe,-.845,B,ne,R),p(new He(.016,.016,.065,16),re,-.845,B+.045,ne,R);let Fn=p(new St(.052,.012,8,24),Te,-.845,B+.092,ne,R);Fn.rotation.x=Math.PI/2;for(let Sn of[0,Math.PI/3,Math.PI*2/3]){let On=ie(.106,.014,.014,.004,Te,-.845,B+.092,ne,R);On.rotation.y=Sn}let Bn=new ke;Bn.position.set(-.84,B+.065,ne+.075),Bn.rotation.x=-Math.PI*.32,R.add(Bn);let Bi=p(new He(.057,.057,.03,32),re,0,0,0,Bn);Bi.rotation.x=Math.PI/2;let em=p(new Vn(.047,32),new kn({map:Yt}),0,0,.017,Bn),Bu=p(new He(.024,.024,.055,6),oe,-.79,B,ne,R);Bu.rotation.z=Math.PI/2,J([[-.76,B,ne],[-.7,B-.02,ne],[-.71,1.3,ne],[-.91,1.24,ne]],.014,Xe,R);let Ou=p(new He(.021,.021,.055,12),re,-.74,B,ne,R);Ou.rotation.z=Math.PI/2}ie(.07,.07,Q*X,.015,oe,-.91,1.24,0,R),J([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,Xe,R)}bt.pedals={};for(let S of["classic","aluminium","formula"]){let R=Uu(S);n.add(R),bt.pedals[S]=R}bt.seat={};for(let S of["red","carbon","emerald","ivory"]){let R=mc(S);R.rotation.y=Math.PI/2,R.position.set(-.8,1,0),n.add(R),bt.seat[S]=R}let ut=Lu(x),$e=Tu({paint:s,carbon:te,metal:Ct});n.add($e.group);function An(S){let R=["formula","formulaPro","formulaElite"].includes(S.frontBumper);ut.set(R),z.forEach(ne=>ne.visible=!R),$e.group.visible=R||S.turbine==="formula",$e.engine.visible=S.turbine==="formula",$(S);let F=t.glassTints[S.glassTint]||t.glassTints.original;for(let ne of Object.values(bt.windshield)){let ge=ne.userData.originalTint;ne.userData.glass.color.set(F.opacity===null?ge.color:F.color),ne.userData.glass.opacity=F.opacity??ge.opacity}let Q=(t.wheelDiameters[S.wheelSize]||16)/16,B=(Q-1)*(.715/.86),le={standard:1,wide:1.25,ultra:1.45}[S.tyreWidth]||1;for(let{wheelGroup:ne,sign:ge,tyres:Ge}of C){ne.scale.set(.88/1.24*Q,.88/.86*Q,le/.95),ne.position.y=.715/.86*Q,ne.position.z=ge*(1.36+.25*(le-1));for(let[Se,be]of Object.entries(Ge))for(let Ze of be)Ze.visible=Se===(S.tyres||"standard")}let X=B+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[S.suspension]||0);for(let[ne,ge]of Object.entries(bt))if(ne!=="brakes")for(let Ge of Object.values(ge))Ge.parent===n&&(Ge.userData.mountBaseY??=Ge.position.y,Ge.position.y=Ge.userData.mountBaseY+X);fn.forEach(ne=>ne.visible=!S.headlights||S.headlights==="classic");for(let[ne,ge]of Object.entries(Qe))for(let Ge of ge)Ge.visible=S.fenders===ne,ne==="club"&&Ge.userData.shell.color.set(t.item("paint",S.paint).color);et.color.set(t.item("suspension",S.suspension).color),Ye.position.y=X,$e.group.position.y=X,it.visible=X>0,Lt.forEach(({coil:ne,rod:ge,upper:Ge})=>{ne.scale.y=1+X/.415,ge.scale.y=1+X/.28,ge.position.y=.34+X/2,Ge.position.y=.47+X});for(let[ne,ge]of Object.entries(bt))for(let[Ge,Se]of Object.entries(ge))Se.visible=(ne==="pedals"?S.pedals||"classic":S[ne])===Ge;R&&Object.values(bt.headlights).forEach(ne=>ne.visible=!1);for(let[ne,ge]of Object.entries(bt.brakes))for(let Ge of ge.userData.brakeAssemblies||[])Ge.visible=(S.brakes||"stock")===ne;Object.entries(Oe).forEach(([ne,ge])=>ge.visible=ne===(S.steering||"classic")),Object.entries(It).forEach(([ne,ge])=>ge.visible=ne===(S.exhaust||"classic")),st.visible=S.turbine==="boost",Xt.visible=S.turbine!=="formula";let oe=["twin","twinBig"].includes(S.turbine),re=S.turbine==="twinBig",Xe=re?.9:oe?.52:S.turbine==="boost"?.96:.9;Xt.scale.set(Xe/1.24,Xe/.86,Xe/.95),Xt.position.set(lt,Pt+(re?.06:oe?-.2:-.04),oe?re?-.7:-.44:0),Ot.visible=oe,Ot.scale.copy(Xt.scale),Ot.position.set(lt,Pt+(re?.06:-.2),re?.7:.44);let Te=uc(S.turbine==="formula"?[$e.engine]:[Xt,Ot],Ye);for(let ne of Object.values(bt.spoiler))ne.userData.fitTurbines(Te);let Ce=S.badges||[];if(W.forEach(ne=>ne.visible=!Ce.length),N.forEach(ne=>ne.userData.plane.visible=!Ce.length),ae.forEach(({group:ne,mat:ge,back:Ge,n:Se})=>{let be=Ce[Se];ne.visible=!!be;let Ze=be+":"+(S.prizeTotal||0);if(!be||ge.userData.badge===Ze)return;let nt=new Ht,Gt=.65/512,wt=(Fn,Bn)=>[(Fn-256)*Gt,(256-Bn)*Gt];if(be==="millionaire"||be==="day-hero")nt.absarc(0,0,204*Gt,0,Math.PI*2,!1);else if(be==="rating-top10"){for(let Fn=0;Fn<6;Fn++){let Bn=Fn*Math.PI/3-Math.PI/2,Bi=wt(256+Math.cos(Bn)*215,256+Math.sin(Bn)*215);Fn?nt.lineTo(...Bi):nt.moveTo(...Bi)}nt.closePath()}else nt.moveTo(...wt(80,88)),nt.quadraticCurveTo(...wt(256,0),...wt(432,88)),nt.lineTo(...wt(420,296)),nt.quadraticCurveTo(...wt(390,400),...wt(256,465)),nt.quadraticCurveTo(...wt(122,400),...wt(92,296)),nt.closePath();Ge.geometry.dispose(),Ge.geometry=new Ft(nt,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),ge.map?.dispose(),ge.map=new Et(t.badgeCanvas(be,S)),ge.map.colorSpace=ft,ge.map.anisotropy=16,ge.emissive.set("#ffffff"),ge.emissiveMap=ge.map,ge.emissiveIntensity=.35,ge.userData.badge=Ze,ge.needsUpdate=!0}),s.color.set(t.item("paint",S.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(S)),E!==S.wheels){for(let ne of j)ne.removeFromParent(),ne.geometry.dispose();j.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:ne,x:ge,out:Ge,sign:Se}of C)for(let be of t.wheelDesign(S.wheels)){let Ze=new yt(be.map(([Gt,wt])=>new w(Gt,wt,Se*(.25+.025*(1-Math.hypot(Gt,wt)/.51))))),nt=p(new xt(Ze,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[S.wheels]||(["fiveSpoke","legend"].includes(S.wheels)?.023:.009),8,!1),l,0,0,0,ne);j.push(nt)}E=S.wheels}o.color.set(t.item("trim",S.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(S.trim)?.48:["cobalt","anodizedRed","champagne"].includes(S.trim)?.3:.135,o.metalness=.95,u.userData.style!==S.upholstery&&(u.map?.dispose(),u.map=new Et(t.upholsteryCanvas(S.upholstery)),u.map.colorSpace=ft,u.map.wrapS=u.map.wrapT=Kn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(S.upholstery)?.95:S.upholstery==="carbonWeave"?.28:.38,u.userData.style=S.upholstery,u.needsUpdate=!0),t.chipPalette(S.chips).forEach((ne,ge)=>{Le[ge].color.set(ne),Le[ge].roughness=S.chips==="ceramic"?.25:.55}),K.forEach(ne=>ne.visible=S.chips!=="ceramic"),xe.forEach(({mat:ne,n:ge})=>{ne.userData.style!==S.chips&&(ne.map?.dispose(),ne.map=new Et(t.chipCanvas(S.chips,ge)),ne.map.colorSpace=ft,ne.map.anisotropy=8,ne.userData.style=S.chips,ne.needsUpdate=!0)}),nn.forEach((ne,ge)=>{ne.userData.style!==S.cards&&(ne.map?.dispose(),ne.map=new Et(t.cardCanvas(S.cards,ge)),ne.map.colorSpace=ft,ne.map.anisotropy=16,ne.userData.style=S.cards,ne.needsUpdate=!0)}),j.forEach(ne=>ne.visible=!0),Ee.forEach(ne=>ne.visible=!0),d.color.set(t.item("light",S.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,Qn.userData.number!==S.number+S.region&&(Qn.map?.dispose(),Qn.map=new Et(t.plateCanvas(S)),Qn.userData.number=S.number+S.region,Qn.needsUpdate=!0)}for(let S of[-1,1])J([[-1.64,.43,S*.94],[0,.4,S*1.02],[1.66,.43,S*.94]],.027,d,Ye),J([[S*1.91,.43,-.66],[S*2.05,.43,0],[S*1.91,.43,.66]],.023,d,Ye);let Fi=new Ir(d.color,.45,2,2);Fi.position.set(-1.9,2,.48),Ye.add(Fi);let rr=An;function qn(S){rr(S),Fi.color.copy(d.color)}return qn(e),{car:n,update:qn}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Xn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ft,n.toneMapping=oi,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=za,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new _n,s=new kt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Un("#c6d9ef","#44311e",1.25));for(let[$,me,he,pe,fe]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let j=new wn($,me);j.position.set(he,pe,fe),j.castShadow=$==="#fff0d0",j.shadow.bias=-2e-4,j.shadow.normalBias=.025,j.shadow.mapSize.set(2048,2048),j.shadow.camera.left=-5,j.shadow.camera.right=5,j.shadow.camera.top=5,j.shadow.camera.bottom=-5,i.add(j)}let a=new _n;a.background=new qe("#48505b");for(let[$,me,he,pe,fe,j]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let Ee=new Je(new Ke(pe,fe,j),new kn({color:"#ffffff"}));Ee.position.set($,me,he),a.add(Ee)}let o=new zr(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse($=>{$.geometry?.dispose(),$.material?.dispose()}),o.dispose();let l=new Je(new jt(30,30),new Ms({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=Qp(i,e),u=new dn({transparent:!0,depthWrite:!1,side:Bt,toneMapped:!1,uniforms:{color:{value:new qe(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new Je(new jt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let $ of[-.9,.9]){let me=new Ir(u.uniforms.color.value,1.8,3,2);me.position.set(0,.32,$),i.add(me),m.push(me)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function y($){t.night=!!$;for(let me of i.children)me.isHemisphereLight&&(me.intensity=$?.26:1.25),me.isDirectionalLight&&(me.userData.dayIntensity??=me.intensity,me.intensity=me.userData.dayIntensity*($?.13:1));i.environmentIntensity=$?.24:1.5,u.uniforms.strength.value=$?1.35:.95}y(t.night);let f=$=>{p&&y(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=["formula","formulaPro","formulaElite"].includes(e.frontBumper),v=$=>{g=["formula","formulaPro","formulaElite"].includes($.frontBumper),h.update($),u.uniforms.color.value.set(window.PokerGarage.item("light",$.light).color),m.forEach(me=>me.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let _=!1,x=null,M=0,b=0,L=()=>{let $=r.clientWidth,me=r.clientHeight;$&&me&&(n.setSize($,me,!1),s.aspect=$/me,s.updateProjectionMatrix())},O=new ResizeObserver(L);O.observe(r),L();let D=new Gn(1,1,{type:Ni,depthBuffer:!0});D.samples=4;let k=new _n,I=new Si(-1,1,1,-1,0,1),U=new dn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:D.texture},stepSize:{value:new de}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),Z=new Je(new jt(2,2),U);k.add(Z);function V(){let $=n.getDrawingBufferSize(new de);(D.width!==$.x||D.height!==$.y)&&D.setSize($.x,$.y),U.uniforms.stepSize.value.set(3/$.x,3/$.y),n.setRenderTarget(D),n.render(i,s),n.setRenderTarget(null),n.render(k,I)}let q=$=>{$.button&&$.button!==0||(t.manual=!0,x={id:$.pointerId,x:$.clientX,y:$.clientY},r.setPointerCapture($.pointerId),$.preventDefault())},se=$=>{!x||x.id!==$.pointerId||(t.yaw-=($.clientX-x.x)*.011,t.pitch=Fu(t.pitch+($.clientY-x.y)*.009,-.24,1.35),x.x=$.clientX,x.y=$.clientY,$.preventDefault())},ue=$=>{x&&x.id===$.pointerId&&(x=null,r.hasPointerCapture($.pointerId)&&r.releasePointerCapture($.pointerId))},ce=$=>{let me={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};me[$.key]&&(t.manual=!0,t.yaw+=me[$.key][0],t.pitch=Fu(t.pitch+me[$.key][1],-.24,1.35),$.preventDefault())};r.addEventListener("keydown",ce),r.addEventListener("pointerdown",q),r.addEventListener("pointermove",se),r.addEventListener("pointerup",ue),r.addEventListener("pointercancel",ue),r.addEventListener("lostpointercapture",ue);function we(){if(_)return;_=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(M),O.disconnect(),r.removeEventListener("keydown",ce),r.removeEventListener("pointerdown",q),r.removeEventListener("pointermove",se),r.removeEventListener("pointerup",ue),r.removeEventListener("pointercancel",ue),r.removeEventListener("lostpointercapture",ue);let $=new Set,me=new Set,he=new Set;i.traverse(pe=>{pe.geometry&&he.add(pe.geometry),pe.material&&me.add(pe.material)}),me.forEach(pe=>{for(let fe of Object.values(pe))fe&&fe.isTexture&&$.add(fe);pe.dispose()}),$.forEach(pe=>pe.dispose()),he.forEach(pe=>pe.dispose()),c.dispose(),D.dispose(),U.dispose(),Z.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function Re($){if(_)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){we();return}let me=b?Math.min(.05,($-b)/1e3):0;if(b=$,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=me*.13);let he=Math.max(t.snapshotOnly?g?15:13:g?10.5:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*he,1.15+Math.sin(t.pitch)*he,Math.cos(t.yaw)*Math.cos(t.pitch)*he),s.lookAt(0,1.2,0),V(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}M=requestAnimationFrame(Re)}return t.snapshotOnly||(M=requestAnimationFrame(Re)),{update:v,setNight:y,dispose:we,state:t,snapshot(){let $=Math.max(t.snapshotOnly?g?15:13:g?10.5:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*$,1.15+Math.sin(t.pitch)*$,Math.cos(t.yaw)*Math.cos(t.pitch)*$),s.lookAt(0,1.2,0),V();let me=document.createElement("canvas");return me.width=n.domElement.width,me.height=n.domElement.height,me.getContext("2d").drawImage(n.domElement,0,0),me}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
