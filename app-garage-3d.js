(()=>{var Yc=0,$o=1,Zc=2;var Qo=1,Ba=2,ii=3,Pr=0,Un=1,Nt=2,Di=0,Ms=1,el=2,tl=3,nl=4,Jc=5,Ir=100,Kc=101,$c=102,Qc=103,eh=104,th=200,nh=201,ih=202,rh=203,sh=204,ah=205,oh=206,lh=207,ch=208,hh=209,uh=210,dh=211,ph=212,mh=213,fh=214,za=0,Ga=1,ka=2,Ss=3,Va=4,Ha=5,Wa=6,Xa=7,gh=0,vh=1,_h=2,Mi=0,yh=1,xh=2,Mh=3,ri=4,Sh=5,Th=6,bh=7,ko="attached",wh="detached",il=300,Lr=301,qi=302,ja=303,qa=304,Ts=306,Zn=1e3,vr=1001,ra=1002,ti=1003,Eh=1004;var bs=1005;var ni=1006,Ya=1007;var Yi=1008;var si=1009,rl=1010,sl=1011,Dr=1012,Za=1013,Zi=1014,kn=1015,Ui=1016,Ja=1017,Ka=1018,Ur=1020,al=35902,ol=35899,Ah=1021,Ch=1022,Vn=1023,ws=1026,Es=1027,$a=1028,Qa=1029,Rh=1030,ll=1031;var cl=1033,eo=33776,to=33777,no=33778,io=33779,hl=35840,ul=35841,dl=35842,pl=35843,ml=36196,fl=37492,gl=37496,vl=37808,_l=37809,yl=37810,xl=37811,Ml=37812,Sl=37813,Tl=37814,bl=37815,wl=37816,El=37817,Al=37818,Cl=37819,Rl=37820,Pl=37821,Il=36492,Ll=36494,Dl=36495,Ul=36283,Nl=36284,Fl=36285,Ol=36286;var Jr=2300,sa=2301,na=2302,Vo=2400,Ho=2401,Wo=2402;var ro=3201;var Ph=0,Ih=1,Ji="",dt="srgb",ki="srgb-linear",Kr="linear",Rt="srgb";var Gi=7680;var Lh=512,Dh=513,Uh=514,Bl=515,Nh=516,Fh=517,Oh=518,Bh=519,Xo=35044;var zl="300 es",gi=2e3,$r=2001;var vi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ia=Math.PI/180,aa=180/Math.PI;function Ki(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(cn[255&r]+cn[r>>8&255]+cn[r>>16&255]+cn[r>>24&255]+"-"+cn[255&e]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[63&t|128]+cn[t>>8&255]+"-"+cn[t>>16&255]+cn[t>>24&255]+cn[255&n]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]).toLowerCase()}function ut(r,e,t){return Math.max(e,Math.min(t,r))}function Uu(r,e){return(r%e+e)%e}function co(r,e,t){return(1-t)*r+t*e}function zr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Tn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ue=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],v=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=v);if(u!==v||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*v,_=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let M=Math.sqrt(y),w=Math.atan2(M,g*_);f=Math.sin(f*w)/M,o=Math.sin(o*w)/M}let x=o*_;if(c=c*f+d*x,l=l*f+m*x,h=h*f+p*x,u=u*f+v*x,f===1-o){let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},b=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ho.copy(this).projectOnVector(e),this.sub(ho)}reflect(e){return this.sub(ho.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ho=new b,mc=new Pn,ot=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],v=i[0],f=i[3],g=i[6],_=i[1],y=i[4],x=i[7],M=i[2],w=i[5],L=i[8];return s[0]=a*v+o*_+c*M,s[3]=a*f+o*y+c*w,s[6]=a*g+o*x+c*L,s[1]=l*v+h*_+u*M,s[4]=l*f+h*y+u*w,s[7]=l*g+h*x+u*L,s[2]=d*v+m*_+p*M,s[5]=d*f+m*y+p*w,s[8]=d*g+m*x+p*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*c)*v,e[5]=(i*s-o*t)*v,e[6]=m*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(uo.makeScale(e,t)),this}rotate(e){return this.premultiply(uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(uo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},uo=new ot;function Gl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Qr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zh(){let r=Qr("canvas");return r.style.display="block",r}var fc={};function _r(r){r in fc||(fc[r]=!0,console.warn(r))}function Gh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var gc=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vc=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nu(){let r={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Rt&&(i.r=fi(i.r),i.g=fi(i.g),i.b=fi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(i.r=gr(i.r),i.g=gr(i.g),i.b=gr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return _r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return _r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ki]:{primaries:e,whitePoint:n,transfer:Kr,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:dt},outputColorSpaceConfig:{drawingBufferColorSpace:dt}},[dt]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:dt}}}),r}var _t=Nu();function fi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function gr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var rr,oa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rr===void 0&&(rr=Qr("canvas")),rr.width=e.width,rr.height=e.height;let i=rr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=rr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*fi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*fi(t[n]/255)):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fu=0,yr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(po(i[a].image)):s.push(po(i[a]))}else s=po(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function po(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?oa.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ou=0,mo=new b,vn=class r extends vi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=Ki(),this.name="",this.source=new yr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(mo).x}get height(){return this.source.getSize(mo).y}get depth(){return this.source.getSize(mo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zn:e.x=e.x-Math.floor(e.x);break;case vr:e.x=e.x<0?0:1;break;case ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Zn:e.y=e.y-Math.floor(e.y);break;case vr:e.y=e.y<0?0:1;break;case ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null,vn.DEFAULT_MAPPING=il,vn.DEFAULT_ANISOTROPY=1;var bt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],v=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,x=(m+1)/2,M=(g+1)/2,w=(h+d)/4,L=(u+v)/4,z=(p+f)/4;return y>x&&y>M?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=w/n,s=L/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=w/i,s=z/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=L/s,i=z/s),this.set(n,i,s,t),this}let _=Math.sqrt((f-p)*(f-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(f-p)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},la=class extends vi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new vn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ni,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new yr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends la{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},es=class extends vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ti,this.minFilter=ti,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ca=class extends vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ti,this.minFilter=ti,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _n=class{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ps.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ps.copy(n.boundingBox)),Ps.applyMatrix4(e.matrixWorld),this.union(Ps)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gr),Is.subVectors(this.max,Gr),sr.subVectors(e.a,Gr),ar.subVectors(e.b,Gr),or.subVectors(e.c,Gr),Ti.subVectors(ar,sr),bi.subVectors(or,ar),Fi.subVectors(sr,or);let t=[0,-Ti.z,Ti.y,0,-bi.z,bi.y,0,-Fi.z,Fi.y,Ti.z,0,-Ti.x,bi.z,0,-bi.x,Fi.z,0,-Fi.x,-Ti.y,Ti.x,0,-bi.y,bi.x,0,-Fi.y,Fi.x,0];return!!fo(t,sr,ar,or,Is)&&(t=[1,0,0,0,1,0,0,0,1],!!fo(t,sr,ar,or,Is)&&(Ls.crossVectors(Ti,bi),t=[Ls.x,Ls.y,Ls.z],fo(t,sr,ar,or,Is)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(jn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new b,new b,new b,new b,new b,new b,new b,new b],jn=new b,Ps=new _n,sr=new b,ar=new b,or=new b,Ti=new b,bi=new b,Fi=new b,Gr=new b,Is=new b,Ls=new b,Oi=new b;function fo(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Oi.fromArray(r,s);let o=i.x*Math.abs(Oi.x)+i.y*Math.abs(Oi.y)+i.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),h=n.dot(Oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Bu=new _n,kr=new b,go=new b,In=class{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Bu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;kr.subVectors(e,this.center);let t=kr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(kr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(go.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(kr.copy(e.center).add(go)),this.expandByPoint(kr.copy(e.center).sub(go))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},hi=new b,vo=new b,Ds=new b,wi=new b,_o=new b,Us=new b,yo=new b,Vi=class{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){vo.copy(e).add(t).multiplyScalar(.5),Ds.copy(t).sub(e).normalize(),wi.copy(this.origin).sub(vo);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ds),o=wi.dot(this.direction),c=-wi.dot(Ds),l=wi.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let v=1/h;u*=v,d*=v,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(vo).addScaledVector(Ds,d),m}intersectSphere(e,t){hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),i=hi.dot(hi)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,i,s){_o.subVectors(t,e),Us.subVectors(n,e),yo.crossVectors(_o,Us);let a,o=this.direction.dot(yo);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}wi.subVectors(this.origin,e);let c=a*this.direction.dot(Us.crossVectors(wi,Us));if(c<0)return null;let l=a*this.direction.dot(_o.cross(wi));if(l<0||c+l>o)return null;let h=-a*wi.dot(yo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ze=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,v,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,v,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,v,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=v,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/lr.setFromMatrixColumn(e,0).length(),s=1/lr.setFromMatrixColumn(e,1).length(),a=1/lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,v=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,v=l*u;t[0]=d+v*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,v=l*u;t[0]=d-v*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,v=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,v=o*l;t[0]=c*h,t[4]=v-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,v=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zu,e,Gu)}lookAt(e,t,n){let i=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Ei.crossVectors(n,An),Ei.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Ei.crossVectors(n,An)),Ei.normalize(),Ns.crossVectors(An,Ei),i[0]=Ei.x,i[4]=Ns.x,i[8]=An.x,i[1]=Ei.y,i[5]=Ns.y,i[9]=An.y,i[2]=Ei.z,i[6]=Ns.z,i[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],v=n[6],f=n[10],g=n[14],_=n[3],y=n[7],x=n[11],M=n[15],w=i[0],L=i[4],z=i[8],D=i[12],P=i[1],U=i[5],N=i[9],j=i[13],V=i[2],te=i[6],ie=i[10],pe=i[14],le=i[3],_e=i[7],ee=i[11],ce=i[15];return s[0]=a*w+o*P+c*V+l*le,s[4]=a*L+o*U+c*te+l*_e,s[8]=a*z+o*N+c*ie+l*ee,s[12]=a*D+o*j+c*pe+l*ce,s[1]=h*w+u*P+d*V+m*le,s[5]=h*L+u*U+d*te+m*_e,s[9]=h*z+u*N+d*ie+m*ee,s[13]=h*D+u*j+d*pe+m*ce,s[2]=p*w+v*P+f*V+g*le,s[6]=p*L+v*U+f*te+g*_e,s[10]=p*z+v*N+f*ie+g*ee,s[14]=p*D+v*j+f*pe+g*ce,s[3]=_*w+y*P+x*V+M*le,s[7]=_*L+y*U+x*te+M*_e,s[11]=_*z+y*N+x*ie+M*ee,s[15]=_*D+y*j+x*pe+M*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],v=e[13],f=e[14],g=e[15],_=u*f*l-v*d*l+v*c*m-o*f*m-u*c*g+o*d*g,y=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,x=h*v*l-p*u*l+p*o*m-a*v*m-h*o*g+a*u*g,M=p*u*c-h*v*c-p*o*d+a*v*d+h*o*f-a*u*f,w=t*_+n*y+i*x+s*M;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/w;return e[0]=_*L,e[1]=(v*d*s-u*f*s-v*i*m+n*f*m+u*i*g-n*d*g)*L,e[2]=(o*f*s-v*c*s+v*i*l-n*f*l-o*i*g+n*c*g)*L,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*L,e[4]=y*L,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*L,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*L,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*L,e[8]=x*L,e[9]=(p*u*s-h*v*s-p*n*m+t*v*m+h*n*g-t*u*g)*L,e[10]=(a*v*s-p*o*s+p*n*l-t*v*l-a*n*g+t*o*g)*L,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*L,e[12]=M*L,e[13]=(h*v*i-p*u*i+p*n*d-t*v*d-h*n*f+t*u*f)*L,e[14]=(p*o*i-a*v*i-p*n*c+t*v*c+a*n*f-t*o*f)*L,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*L,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,v=a*h,f=a*u,g=o*u,_=c*l,y=c*h,x=c*u,M=n.x,w=n.y,L=n.z;return i[0]=(1-(v+g))*M,i[1]=(m+x)*M,i[2]=(p-y)*M,i[3]=0,i[4]=(m-x)*w,i[5]=(1-(d+g))*w,i[6]=(f+_)*w,i[7]=0,i[8]=(p+y)*L,i[9]=(f-_)*L,i[10]=(1-(d+v))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=lr.set(i[0],i[1],i[2]).length(),a=lr.set(i[4],i[5],i[6]).length(),o=lr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],qn.copy(this);let c=1/s,l=1/a,h=1/o;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=l,qn.elements[5]*=l,qn.elements[6]*=l,qn.elements[8]*=h,qn.elements[9]*=h,qn.elements[10]*=h,t.setFromRotationMatrix(qn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,v;if(c)p=s/(a-s),v=a*s/(a-s);else if(o===gi)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==$r)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),v=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,v;if(c)p=1/(a-s),v=a/(a-s);else if(o===gi)p=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==$r)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),v=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},lr=new b,qn=new Ze,zu=new b(0,0,0),Gu=new b(1,1,1),Ei=new b,Ns=new b,An=new b,_c=new Ze,yc=new Pn,Jn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _c.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_c,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yc.setFromEuler(this),this.setFromQuaternion(yc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var ts=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},ku=0,xc=new b,cr=new Pn,ui=new Ze,Fs=new b,Vr=new b,Vu=new b,Hu=new Pn,Mc=new b(1,0,0),Sc=new b(0,1,0),Tc=new b(0,0,1),bc={type:"added"},Wu={type:"removed"},hr={type:"childadded",child:null},xo={type:"childremoved",child:null},sn=class r extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new b,t=new Jn,n=new Pn,i=new b(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ze},normalMatrix:{value:new ot}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Mc,e)}rotateY(e){return this.rotateOnAxis(Sc,e)}rotateZ(e){return this.rotateOnAxis(Tc,e)}translateOnAxis(e,t){return xc.copy(e).applyQuaternion(this.quaternion),this.position.add(xc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mc,e)}translateY(e){return this.translateOnAxis(Sc,e)}translateZ(e){return this.translateOnAxis(Tc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fs.copy(e):Fs.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Vr,Fs,this.up):ui.lookAt(Fs,Vr,this.up),this.quaternion.setFromRotationMatrix(ui),i&&(ui.extractRotation(i.matrixWorld),cr.setFromRotationMatrix(ui),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bc),hr.child=e,this.dispatchEvent(hr),hr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wu),xo.child=e,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bc),hr.child=e,this.dispatchEvent(hr),hr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,Vu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,Hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};sn.DEFAULT_UP=new b(0,1,0),sn.DEFAULT_MATRIX_AUTO_UPDATE=!0,sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Yn=new b,di=new b,Mo=new b,pi=new b,ur=new b,dr=new b,wc=new b,So=new b,To=new b,bo=new b,wo=new bt,Eo=new bt,Ao=new bt,mi=class r{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Yn.subVectors(e,t),i.cross(Yn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Yn.subVectors(i,t),di.subVectors(n,t),Mo.subVectors(e,t);let a=Yn.dot(Yn),o=Yn.dot(di),c=Yn.dot(Mo),l=di.dot(di),h=di.dot(Mo),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,pi)!==null&&pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return wo.setScalar(0),Eo.setScalar(0),Ao.setScalar(0),wo.fromBufferAttribute(e,t),Eo.fromBufferAttribute(e,n),Ao.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(wo,s.x),a.addScaledVector(Eo,s.y),a.addScaledVector(Ao,s.z),a}static isFrontFacing(e,t,n,i){return Yn.subVectors(n,t),di.subVectors(e,t),Yn.cross(di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),.5*Yn.cross(di).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;ur.subVectors(i,n),dr.subVectors(s,n),So.subVectors(e,n);let c=ur.dot(So),l=dr.dot(So);if(c<=0&&l<=0)return t.copy(n);To.subVectors(e,i);let h=ur.dot(To),u=dr.dot(To);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ur,a);bo.subVectors(e,s);let m=ur.dot(bo),p=dr.dot(bo);if(p>=0&&m<=p)return t.copy(s);let v=m*l-c*p;if(v<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(dr,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return wc.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(wc,o);let g=1/(f+v+d);return a=v*g,o=d*g,t.copy(n).addScaledVector(ur,a).addScaledVector(dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Os={h:0,s:0,l:0};function Co(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=Uu(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Co(a,s,e+1/3),this.g=Co(a,s,e),this.b=Co(a,s,e-1/3)}return _t.colorSpaceToWorking(this,i),this}setStyle(e,t=dt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){let n=kh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return _t.workingToColorSpace(hn.copy(this),e),65536*Math.round(ut(255*hn.r,0,255))+256*Math.round(ut(255*hn.g,0,255))+Math.round(ut(255*hn.b,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(hn.copy(this),t);let n=hn.r,i=hn.g,s=hn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(hn.copy(this),t),e.r=hn.r,e.g=hn.g,e.b=hn.b,e}getStyle(e=dt){_t.workingToColorSpace(hn.copy(this),e);let t=hn.r,n=hn.g,i=hn.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Os);let n=co(Ai.h,Os.h,t),i=co(Ai.s,Os.s,t),s=co(Ai.l,Os.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hn=new Ke;Ke.NAMES=kh;var Xu=0,_i=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zn=class extends _i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zp=ju();function ju(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Kt=new b,Bs=new ue,qu=0,bn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xo,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyMatrix3(e),this.setXY(t,Bs.x,Bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array),i=Tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array),i=Tn(i,this.array),s=Tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xo&&(e.usage=this.usage),e}};var Hi=class extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ns=class extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Pe=class extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yu=0,On=new Ze,Ro=new sn,pr=new b,Cn=new _n,Hr=new _n,rn=new b,pt=class r extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gl(e)?ns:Hi)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ot().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,n){return On.makeTranslation(e,t,n),this.applyMatrix4(On),this}scale(e,t,n){return On.makeScale(e,t,n),this.applyMatrix4(On),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new b,1/0);if(e){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Hr.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(Cn.min,Hr.min),Cn.expandByPoint(rn),rn.addVectors(Cn.max,Hr.max),Cn.expandByPoint(rn)):(Cn.expandByPoint(Hr.min),Cn.expandByPoint(Hr.max))}Cn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)rn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)rn.fromBufferAttribute(o,l),c&&(pr.fromBufferAttribute(e,l),rn.add(pr)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let z=0;z<n.count;z++)o[z]=new b,c[z]=new b;let l=new b,h=new b,u=new b,d=new ue,m=new ue,p=new ue,v=new b,f=new b;function g(z,D,P){l.fromBufferAttribute(n,z),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,P),d.fromBufferAttribute(s,z),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,P),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let U=1/(m.x*p.y-p.x*m.y);isFinite(U)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(U),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(U),o[z].add(v),o[D].add(v),o[P].add(v),c[z].add(f),c[D].add(f),c[P].add(f))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let z=0,D=_.length;z<D;++z){let P=_[z],U=P.start;for(let N=U,j=U+P.count;N<j;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let y=new b,x=new b,M=new b,w=new b;function L(z){M.fromBufferAttribute(i,z),w.copy(M);let D=o[z];y.copy(D),y.sub(M.multiplyScalar(M.dot(D))).normalize(),x.crossVectors(w,D);let P=x.dot(c[z])<0?-1:1;a.setXYZW(z,y.x,y.y,y.z,P)}for(let z=0,D=_.length;z<D;++z){let P=_[z],U=P.start;for(let N=U,j=U+P.count;N<j;N+=3)L(e.getX(N+0)),L(e.getX(N+1)),L(e.getX(N+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new b,s=new b,a=new b,o=new b,c=new b,l=new b,h=new b,u=new b;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),v=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let v=0,f=c.length;v<f;v++){m=o.isInterleavedBufferAttribute?c[v]*o.data.stride+o.offset:c[v]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new bn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ec=new Ze,Bi=new Vi,zs=new In,Ac=new b,Gs=new b,ks=new b,Vs=new b,Po=new b,Hs=new b,Cc=new b,Ws=new b,it=class extends sn{constructor(e=new pt,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Hs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Po.fromBufferAttribute(u,e),a?Hs.addScaledVector(Po,h):Hs.addScaledVector(Po.sub(t),h))}t.add(Hs)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(s),Bi.copy(e.ray).recast(e.near),zs.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(zs,Ac)===null||Bi.origin.distanceToSquared(Ac)>(e.far-e.near)**2))return;Ec.copy(s).invert(),Bi.copy(e.ray).applyMatrix4(Ec),n.boundingBox!==null&&Bi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Bi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){let f=d[p],g=a[f.materialIndex];for(let _=Math.max(f.start,m.start),y=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));_<y;_+=3)i=Xs(this,g,e,n,l,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);p<v;p+=3)i=Xs(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){let f=d[p],g=a[f.materialIndex];for(let _=Math.max(f.start,m.start),y=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));_<y;_+=3)i=Xs(this,g,e,n,l,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);p<v;p+=3)i=Xs(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function Xs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Gs),r.getVertexPosition(c,ks),r.getVertexPosition(l,Vs);let h=(function(u,d,m,p,v,f,g,_){let y;if(y=d.side===1?p.intersectTriangle(g,f,v,!0,_):p.intersectTriangle(v,f,g,d.side===0,_),y===null)return null;Ws.copy(_),Ws.applyMatrix4(u.matrixWorld);let x=m.ray.origin.distanceTo(Ws);return x<m.near||x>m.far?null:{distance:x,point:Ws.clone(),object:u}})(r,e,t,n,Gs,ks,Vs,Cc);if(h){let u=new b;mi.getBarycoord(Cc,Gs,ks,Vs,u),i&&(h.uv=mi.getInterpolatedAttribute(i,o,c,l,u,new ue)),s&&(h.uv1=mi.getInterpolatedAttribute(s,o,c,l,u,new ue)),a&&(h.normal=mi.getInterpolatedAttribute(a,o,c,l,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new b,materialIndex:0};mi.getNormal(Gs,ks,Vs,d.normal),h.face=d,h.barycoord=u}return h}var Qe=class r extends pt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(v,f,g,_,y,x,M,w,L,z,D){let P=x/L,U=M/z,N=x/2,j=M/2,V=w/2,te=L+1,ie=z+1,pe=0,le=0,_e=new b;for(let ee=0;ee<ie;ee++){let ce=ee*U-j;for(let Re=0;Re<te;Re++){let he=Re*P-N;_e[v]=he*_,_e[f]=ce*y,_e[g]=V,l.push(_e.x,_e.y,_e.z),_e[v]=0,_e[f]=0,_e[g]=w>0?1:-1,h.push(_e.x,_e.y,_e.z),u.push(Re/L),u.push(1-ee/z),pe+=1}}for(let ee=0;ee<z;ee++)for(let ce=0;ce<L;ce++){let Re=d+ce+te*ee,he=d+ce+te*(ee+1),xe=d+(ce+1)+te*(ee+1),ge=d+(ce+1)+te*ee;c.push(Re,he,ge),c.push(he,xe,ge),le+=6}o.addGroup(m,le,D),m+=le,d+=pe}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Pe(l,3)),this.setAttribute("normal",new Pe(h,3)),this.setAttribute("uv",new Pe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $i(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function pn(r){let e={};for(let t=0;t<r.length;t++){let n=$i(r[t]);for(let i in n)e[i]=n[i]}return e}function kl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var Vh={clone:$i,merge:pn},un=class extends _i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},xr=class extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ci=new b,Rc=new ue,Pc=new ue,Vt=class extends xr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*aa*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*ia*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*aa*Math.atan(Math.tan(.5*ia*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Rc,Pc),t.subVectors(Pc,Rc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*ia*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},mr=-90,ha=class extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Vt(mr,1,e,t);i.layers=this.layers,this.add(i);let s=new Vt(mr,1,e,t);s.layers=this.layers,this.add(s);let a=new Vt(mr,1,e,t);a.layers=this.layers,this.add(a);let o=new Vt(mr,1,e,t);o.layers=this.layers,this.add(o);let c=new Vt(mr,1,e,t);c.layers=this.layers,this.add(c);let l=new Vt(mr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===gi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==$r)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},is=class extends vn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ua=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new is(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Qe(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new it(i,s),o=t.minFilter;return t.minFilter===Yi&&(t.minFilter=ni),new ha(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},We=class extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zu={type:"move"},Mr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new We,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new We,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new We,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let f=t.getJointPose(v,n),g=this._getHandJoint(l,v);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new We;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var yn=class extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Jp=new b;var Kp=new b,$p=new b,Qp=new b,em=new ue,tm=new ue,nm=new Ze,im=new b,rm=new b,sm=new b,am=new ue,om=new ue,lm=new ue;var cm=new b,hm=new b;var Ic=new b,Lc=new bt,Dc=new bt,Ju=new b,Uc=new Ze,js=new b,Io=new In,Nc=new Ze,Lo=new Vi,rs=class extends it{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ko,this.bindMatrix=new Ze,this.bindMatrixInverse=new Ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new _n),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,js),this.boundingBox.expandByPoint(js)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,js),this.boundingSphere.expandByPoint(js)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Io.copy(this.boundingSphere),Io.applyMatrix4(i),e.ray.intersectsSphere(Io)!==!1&&(Nc.copy(i).invert(),Lo.copy(e.ray).applyMatrix4(Nc),this.boundingBox!==null&&Lo.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Lo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ko?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===wh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Lc.fromBufferAttribute(i.attributes.skinIndex,e),Dc.fromBufferAttribute(i.attributes.skinWeight,e),Ic.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Dc.getComponent(s);if(a!==0){let o=Lc.getComponent(s);Uc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Ju.copy(Ic).applyMatrix4(Uc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Sr=class extends sn{constructor(){super(),this.isBone=!0,this.type="Bone"}},ss=class extends vn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Fc=new Ze,Ku=new Ze,as=class r{constructor(e=[],t=[]){this.uuid=Ki(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Ku;Fc.multiplyMatrices(o,t[s]),Fc.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ss(t,e,e,Vn,kn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Sr),this.bones.push(a),this.boneInverses.push(new Ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},os=class extends bn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fr=new Ze,Oc=new Ze,qs=[],Bc=new _n,$u=new Ze,Wr=new it,Xr=new In,ls=class extends it{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new os(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,$u)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new _n),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Bc.copy(e.boundingBox).applyMatrix4(fr),this.boundingBox.union(Bc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Xr.copy(e.boundingSphere).applyMatrix4(fr),this.boundingSphere.union(Xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(n),e.ray.intersectsSphere(Xr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,fr),Oc.multiplyMatrices(n,fr),Wr.matrixWorld=Oc,Wr.raycast(e,qs);for(let a=0,o=qs.length;a<o;a++){let c=qs[a];c.instanceId=s,c.object=this,t.push(c)}qs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new os(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ss(new Float32Array(i*this.count),i,this.count,$a,kn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Do=new b,Qu=new b,ed=new ot,Qn=class{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Do.subVectors(n,t).cross(Qu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Do),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ed.getNormalMatrix(e),i=this.coplanarPoint(Do).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},zi=new In,td=new ue(.5,.5),Ys=new b,Ii=class{constructor(e=new Qn,t=new Qn,n=new Qn,i=new Qn,s=new Qn,a=new Qn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],v=s[9],f=s[10],g=s[11],_=s[12],y=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-a,m-h,g-p,M-_).normalize(),i[1].setComponents(l+a,m+h,g+p,M+_).normalize(),i[2].setComponents(l+o,m+u,g+v,M+y).normalize(),i[3].setComponents(l-o,m-u,g-v,M-y).normalize(),n)i[4].setComponents(c,d,f,x).normalize(),i[5].setComponents(l-c,m-d,g-f,M-x).normalize();else if(i[4].setComponents(l-c,m-d,g-f,M-x).normalize(),t===gi)i[5].setComponents(l+c,m+d,g+f,M+x).normalize();else{if(t!==$r)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);let t=td.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ys.x=i.normal.x>0?e.max.x:e.min.x,Ys.y=i.normal.y>0?e.max.y:e.min.y,Ys.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ys)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Kn=new Ze,$n=new Ii,da=class r{constructor(){this.coordinateSystem=gi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.containsPoint(e))return!0}return!1}clone(){return new r}};var jo=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},um=new Ze,dm=new Ke(1,1,1),pm=new Ii,mm=new da,fm=new _n,gm=new In,vm=new b,_m=new b,ym=new b,xm=new jo,Mm=new it;var Sm=new b,Tm=new b,bm=new Ze,wm=new Vi,Em=new In,Am=new b,Cm=new b;var Rm=new b,Pm=new b;var Im=new Ze,Lm=new Vi,Dm=new In,Um=new b;var Et=class extends vn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},cs=class extends vn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==ws&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},hs=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Tr=class r extends pt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,v=i+1,f=new b,g=new b;for(let _=0;_<=p;_++){let y=0,x=0,M=0,w=0;if(_<=n){let D=_/n,P=D*Math.PI/2;x=-h-e*Math.cos(P),M=e*Math.sin(P),w=-e*Math.cos(P),y=D*u}else if(_<=n+s){let D=(_-n)/s;x=D*t-h,M=e,w=0,y=u+D*d}else{let D=(_-n-s)/n,P=D*Math.PI/2;x=h+e*Math.sin(P),M=e*Math.cos(P),w=e*Math.sin(P),y=u+d+D*u}let L=Math.max(0,Math.min(1,y/m)),z=0;_===0?z=.5/i:_===p&&(z=-.5/i);for(let D=0;D<=i;D++){let P=D/i,U=P*Math.PI*2,N=Math.sin(U),j=Math.cos(U);g.x=-M*j,g.y=x,g.z=M*N,o.push(g.x,g.y,g.z),f.set(-M*j,w,M*N),f.normalize(),c.push(f.x,f.y,f.z),l.push(P+z,L)}if(_>0){let D=(_-1)*v;for(let P=0;P<i;P++){let U=D+P,N=D+P+1,j=_*v+P,V=_*v+P+1;a.push(U,N,j),a.push(N,V,j)}}}this.setIndex(a),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Gn=class r extends pt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new b,h=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Pe(a,3)),this.setAttribute("normal",new Pe(o,3)),this.setAttribute("uv",new Pe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Xe=class r extends pt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,v=[],f=n/2,g=0;function _(y){let x=p,M=new ue,w=new b,L=0,z=y===!0?e:t,D=y===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,f*D,0),d.push(0,D,0),m.push(.5,.5),p++;let P=p;for(let U=0;U<=i;U++){let N=U/i*c+o,j=Math.cos(N),V=Math.sin(N);w.x=z*V,w.y=f*D,w.z=z*j,u.push(w.x,w.y,w.z),d.push(0,D,0),M.x=.5*j+.5,M.y=.5*V*D+.5,m.push(M.x,M.y),p++}for(let U=0;U<i;U++){let N=x+U,j=P+U;y===!0?h.push(j,j+1,N):h.push(j+1,j,N),L+=3}l.addGroup(g,L,y===!0?1:2),g+=L}(function(){let y=new b,x=new b,M=0,w=(t-e)/n;for(let L=0;L<=s;L++){let z=[],D=L/s,P=D*(t-e)+e;for(let U=0;U<=i;U++){let N=U/i,j=N*c+o,V=Math.sin(j),te=Math.cos(j);x.x=P*V,x.y=-D*n+f,x.z=P*te,u.push(x.x,x.y,x.z),y.set(V,w,te).normalize(),d.push(y.x,y.y,y.z),m.push(N,1-D),z.push(p++)}v.push(z)}for(let L=0;L<i;L++)for(let z=0;z<s;z++){let D=v[z][L],P=v[z+1][L],U=v[z+1][L+1],N=v[z][L+1];(e>0||z!==0)&&(h.push(D,P,N),M+=3),(t>0||z!==s-1)&&(h.push(P,U,N),M+=3)}l.addGroup(g,M,0),g+=M})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Pe(u,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},pa=class r extends Xe{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Li=class r extends pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,v,f){let g=f+1,_=[];for(let y=0;y<=g;y++){_[y]=[];let x=m.clone().lerp(v,y/g),M=p.clone().lerp(v,y/g),w=g-y;for(let L=0;L<=w;L++)_[y][L]=L===0&&y===g?x:x.clone().lerp(M,L/w)}for(let y=0;y<g;y++)for(let x=0;x<2*(g-y)-1;x++){let M=Math.floor(x/2);x%2==0?(c(_[y][M+1]),c(_[y+1][M]),c(_[y][M])):(c(_[y][M+1]),c(_[y+1][M+1]),c(_[y+1][M]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let v=3*m;p.x=e[v+0],p.y=e[v+1],p.z=e[v+2]}function h(m,p,v,f){f<0&&m.x===1&&(a[p]=m.x-1),v.x===0&&v.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new b,v=new b,f=new b;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],v),l(t[g+2],f),o(p,v,f,m)})(i),(function(m){let p=new b;for(let v=0;v<s.length;v+=3)p.x=s[v+0],p.y=s[v+1],p.z=s[v+2],p.normalize().multiplyScalar(m),s[v+0]=p.x,s[v+1]=p.y,s[v+2]=p.z})(n),(function(){let m=new b;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let v=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(v,1-f)}(function(){let p=new b,v=new b,f=new b,g=new b,_=new ue,y=new ue,x=new ue;for(let M=0,w=0;M<s.length;M+=9,w+=6){p.set(s[M+0],s[M+1],s[M+2]),v.set(s[M+3],s[M+4],s[M+5]),f.set(s[M+6],s[M+7],s[M+8]),_.set(a[w+0],a[w+1]),y.set(a[w+2],a[w+3]),x.set(a[w+4],a[w+5]),g.copy(p).add(v).add(f).divideScalar(3);let L=u(g);h(_,w+0,p,L),h(y,w+2,v,L),h(x,w+4,f,L)}})(),(function(){for(let p=0;p<a.length;p+=6){let v=a[p+0],f=a[p+2],g=a[p+4],_=Math.max(v,f,g),y=Math.min(v,f,g);_>.9&&y<.1&&(v<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Pe(s,3)),this.setAttribute("normal",new Pe(s.slice(),3)),this.setAttribute("uv",new Pe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},ma=class r extends Li{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Zs=new b,Js=new b,Uo=new b,Ks=new mi,fa=class extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(ia*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:v,b:f,c:g}=Ks;if(v.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Ks.getNormal(Uo),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let y=(_+1)%3,x=u[_],M=u[y],w=Ks[h[_]],L=Ks[h[y]],z=`${x}_${M}`,D=`${M}_${x}`;D in d&&d[D]?(Uo.dot(d[D].normal)<=s&&(m.push(w.x,w.y,w.z),m.push(L.x,L.y,L.z)),d[D]=null):z in d||(d[z]={index0:l[_],index1:l[y],normal:Uo.clone()})}}for(let p in d)if(d[p]){let{index0:v,index1:f}=d[p];Zs.fromBufferAttribute(o,v),Js.fromBufferAttribute(o,f),m.push(Zs.x,Zs.y,Zs.z),m.push(Js.x,Js.y,Js.z)}this.setAttribute("position",new Pe(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ue:new b);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new b,i=[],s=[],a=[],o=new b,c=new Ze;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new b)}s[0]=new b,a[0]=new b;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ut(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(ut(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},br=class extends Ln{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ga=class extends br{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Vl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var $s=new b,No=new Vl,Fo=new Vl,Oo=new Vl,yt=class extends Ln{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new b){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:($s.subVectors(i[0],i[1]).add(i[0]),o=$s);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:($s.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=$s),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),v=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);v<1e-4&&(v=1),p<1e-4&&(p=v),f<1e-4&&(f=v),No.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,v,f),Fo.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,v,f),Oo.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,v,f)}else this.curveType==="catmullrom"&&(No.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Fo.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Oo.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(No.calc(h),Fo.calc(h),Oo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new b().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function zc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Yr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Zr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var us=class extends Ln{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zr(e,i.x,s.x,a.x,o.x),Zr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},va=class extends Ln{constructor(e=new b,t=new b,n=new b,i=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new b){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zr(e,i.x,s.x,a.x,o.x),Zr(e,i.y,s.y,a.y,o.y),Zr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ds=class extends Ln{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_a=class extends Ln{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ps=class extends Ln{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ms=class extends Ln{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y),Yr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fs=class extends Ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(zc(o,c.x,l.x,h.x,u.x),zc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ue().fromArray(i))}return this}},ya=Object.freeze({__proto__:null,ArcCurve:ga,CatmullRomCurve3:yt,CubicBezierCurve:us,CubicBezierCurve3:va,EllipseCurve:br,LineCurve:ds,LineCurve3:_a,QuadraticBezierCurve:ps,QuadraticBezierCurve3:ms,SplineCurve:fs}),xa=class extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ya[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ya[i.type]().fromJSON(i))}return this}},dn=class extends xa{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ds(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new ps(this.currentPoint.clone(),new ue(e,t),new ue(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new us(this.currentPoint.clone(),new ue(e,t),new ue(n,i),new ue(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new fs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new br(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Wt=class extends dn{constructor(e){super(e),this.uuid=Ki(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new dn().fromJSON(i))}return this}};function nd(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Gc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let v=0,f=u.length;v<f;v++){let g=Gc(h,u[v]*m,v<f-1?u[v+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(hd(g))}p.sort(od);for(let v=0;v<p.length;v++)d=ld(p[v],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return gs(s,a,t,o,c,l,0),a}function Gc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=kc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=kc(a/n|0,r[a],r[a+1],s);return s&&wr(s,s.next)&&(_s(s),s=s.next),s}function Wi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!wr(n,n.next)&&Ht(n.prev,n,n.next)!==0)n=n.next;else{if(_s(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function gs(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=qo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,v=1;do{let f,g=m;m=null;let _=null;for(p=0;g;){p++;let y=g,x=0;for(let w=0;w<v&&(x++,y=y.nextZ,y);w++);let M=v;for(;x>0||M>0&&y;)x!==0&&(M===0||!y||g.z<=y.z)?(f=g,g=g.nextZ,x--):(f=y,y=y.nextZ,M--),_?_.nextZ=f:m=f,f.prevZ=_,_=f;g=y}_.nextZ=null,v*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?rd(r,n,i,s):id(r))e.push(c.i,r.i,l.i),_s(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?gs(r=sd(Wi(r),e),e,t,n,i,s,2):a===2&&ad(r,e,t,n,i,s):gs(Wi(r),e,t,n,i,s,1);break}}}function id(r){let e=r.prev,t=r,n=r.next;if(Ht(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&qr(i,o,s,c,a,l,p.x,p.y)&&Ht(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function rd(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Ht(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),v=Math.max(o,c,l),f=Math.max(h,u,d),g=qo(m,p,e,t,n),_=qo(v,f,e,t,n),y=r.prevZ,x=r.nextZ;for(;y&&y.z>=g&&x&&x.z<=_;){if(y.x>=m&&y.x<=v&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&qr(o,h,c,u,l,d,y.x,y.y)&&Ht(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=m&&x.x<=v&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&qr(o,h,c,u,l,d,x.x,x.y)&&Ht(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=g;){if(y.x>=m&&y.x<=v&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&qr(o,h,c,u,l,d,y.x,y.y)&&Ht(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=_;){if(x.x>=m&&x.x<=v&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&qr(o,h,c,u,l,d,x.x,x.y)&&Ht(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function sd(r,e){let t=r;do{let n=t.prev,i=t.next.next;!wr(n,i)&&Wh(n,t,t.next,i)&&vs(n,i)&&vs(i,n)&&(e.push(n.i,t.i,i.i),_s(t),_s(t.next),t=r=i),t=t.next}while(t!==r);return Wi(t)}function ad(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ud(a,o)){let c=Xh(a,o);return a=Wi(a,a.next),c=Wi(c,c.next),gs(a,e,t,n,i,s,0),void gs(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function od(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function ld(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(wr(i,a))return a;do{if(wr(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let v=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,l=a.x<a.next.x?a:a.next,v===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Hh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let v=Math.abs(c-a.y)/(o-a.x);vs(a,i)&&(v<p||v===p&&(a.x>l.x||a.x===l.x&&cd(l,a)))&&(l=a,p=v)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=Xh(t,r);return Wi(n,n.next),Wi(t,t.next)}function cd(r,e){return Ht(r.prev,r,e.prev)<0&&Ht(e.next,r,r.next)<0}function qo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function hd(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Hh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function qr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Hh(r,e,t,n,i,s,a,o)}function ud(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Wh(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(vs(r,e)&&vs(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Ht(r.prev,r,e.prev)||Ht(r,e.prev,e))||wr(r,e)&&Ht(r.prev,r,r.next)>0&&Ht(e.prev,e,e.next)>0)}function Ht(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function wr(r,e){return r.x===e.x&&r.y===e.y}function Wh(r,e,t,n){let i=ea(Ht(r,e,t)),s=ea(Ht(r,e,n)),a=ea(Ht(t,n,r)),o=ea(Ht(t,n,e));return i!==s&&a!==o||!(i!==0||!Qs(r,t,e))||!(s!==0||!Qs(r,n,e))||!(a!==0||!Qs(t,r,n))||!(o!==0||!Qs(t,e,n))}function Qs(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ea(r){return r>0?1:r<0?-1:0}function vs(r,e){return Ht(r.prev,r,r.next)<0?Ht(r,e,r.next)>=0&&Ht(r,r.prev,e)>=0:Ht(r,e,r.prev)<0||Ht(r,r.next,e)<0}function Xh(r,e){let t=Yo(r.i,r.x,r.y),n=Yo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function kc(r,e,t,n){let i=Yo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function _s(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Yo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Zo=class{static triangulate(e,t,n=2){return nd(e,t,n)}},ei=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Vc(e),Hc(n,e);let a=e.length;t.forEach(Vc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Hc(n,t[c]);let o=Zo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Vc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Hc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Ut=class r extends pt{constructor(e=new Wt([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:dd,y,x,M,w,L,z=!1;g&&(y=g.getSpacedPoints(h),z=!0,d=!1,x=g.computeFrenetFrames(h,!1),M=new b,w=new b,L=new b),d||(f=0,m=0,p=0,v=0);let D=o.extractPoints(l),P=D.shape,U=D.holes;if(!ei.isClockWise(P)){P=P.reverse();for(let G=0,T=U.length;G<T;G++){let I=U[G];ei.isClockWise(I)&&(U[G]=I.reverse())}}function N(G){let T=10000000000000001e-36,I=G[0];for(let k=1;k<=G.length;k++){let B=k%G.length,ae=G[B],Y=ae.x-I.x,K=ae.y-I.y,Me=Y*Y+K*K,Ie=Math.max(Math.abs(ae.x),Math.abs(ae.y),Math.abs(I.x),Math.abs(I.y));Me<=T*Ie*Ie?(G.splice(B,1),k--):I=ae}}N(P),U.forEach(N);let j=U.length,V=P;for(let G=0;G<j;G++){let T=U[G];P=P.concat(T)}function te(G,T,I){return T||console.error("THREE.ExtrudeGeometry: vec does not exist"),G.clone().addScaledVector(T,I)}let ie=P.length;function pe(G,T,I){let k,B,ae,Y=G.x-T.x,K=G.y-T.y,Me=I.x-G.x,Ie=I.y-G.y,ye=Y*Y+K*K,Ce=Y*Ie-K*Me;if(Math.abs(Ce)>Number.EPSILON){let Ve=Math.sqrt(ye),de=Math.sqrt(Me*Me+Ie*Ie),De=T.x-K/Ve,Oe=T.y+Y/Ve,je=((I.x-Ie/de-De)*Ie-(I.y+Me/de-Oe)*Me)/(Y*Ie-K*Me);k=De+Y*je-G.x,B=Oe+K*je-G.y;let Te=k*k+B*B;if(Te<=2)return new ue(k,B);ae=Math.sqrt(Te/2)}else{let Ve=!1;Y>Number.EPSILON?Me>Number.EPSILON&&(Ve=!0):Y<-Number.EPSILON?Me<-Number.EPSILON&&(Ve=!0):Math.sign(K)===Math.sign(Ie)&&(Ve=!0),Ve?(k=-K,B=Y,ae=Math.sqrt(ye)):(k=Y,B=K,ae=Math.sqrt(ye/2))}return new ue(k/ae,B/ae)}let le=[];for(let G=0,T=V.length,I=T-1,k=G+1;G<T;G++,I++,k++)I===T&&(I=0),k===T&&(k=0),le[G]=pe(V[G],V[I],V[k]);let _e=[],ee,ce,Re=le.concat();for(let G=0,T=j;G<T;G++){let I=U[G];ee=[];for(let k=0,B=I.length,ae=B-1,Y=k+1;k<B;k++,ae++,Y++)ae===B&&(ae=0),Y===B&&(Y=0),ee[k]=pe(I[k],I[ae],I[Y]);_e.push(ee),Re=Re.concat(ee)}if(f===0)ce=ei.triangulateShape(V,U);else{let G=[],T=[];for(let I=0;I<f;I++){let k=I/f,B=m*Math.cos(k*Math.PI/2),ae=p*Math.sin(k*Math.PI/2)+v;for(let Y=0,K=V.length;Y<K;Y++){let Me=te(V[Y],le[Y],ae);Z(Me.x,Me.y,-B),k===0&&G.push(Me)}for(let Y=0,K=j;Y<K;Y++){let Me=U[Y];ee=_e[Y];let Ie=[];for(let ye=0,Ce=Me.length;ye<Ce;ye++){let Ve=te(Me[ye],ee[ye],ae);Z(Ve.x,Ve.y,-B),k===0&&Ie.push(Ve)}k===0&&T.push(Ie)}}ce=ei.triangulateShape(G,T)}let he=ce.length,xe=p+v;for(let G=0;G<ie;G++){let T=d?te(P[G],Re[G],xe):P[G];z?(w.copy(x.normals[0]).multiplyScalar(T.x),M.copy(x.binormals[0]).multiplyScalar(T.y),L.copy(y[0]).add(w).add(M),Z(L.x,L.y,L.z)):Z(T.x,T.y,0)}for(let G=1;G<=h;G++)for(let T=0;T<ie;T++){let I=d?te(P[T],Re[T],xe):P[T];z?(w.copy(x.normals[G]).multiplyScalar(I.x),M.copy(x.binormals[G]).multiplyScalar(I.y),L.copy(y[G]).add(w).add(M),Z(L.x,L.y,L.z)):Z(I.x,I.y,u/h*G)}for(let G=f-1;G>=0;G--){let T=G/f,I=m*Math.cos(T*Math.PI/2),k=p*Math.sin(T*Math.PI/2)+v;for(let B=0,ae=V.length;B<ae;B++){let Y=te(V[B],le[B],k);Z(Y.x,Y.y,u+I)}for(let B=0,ae=U.length;B<ae;B++){let Y=U[B];ee=_e[B];for(let K=0,Me=Y.length;K<Me;K++){let Ie=te(Y[K],ee[K],k);z?Z(Ie.x,Ie.y+y[h-1].y,y[h-1].x+I):Z(Ie.x,Ie.y,u+I)}}}function ge(G,T){let I=G.length;for(;--I>=0;){let k=I,B=I-1;B<0&&(B=G.length-1);for(let ae=0,Y=h+2*f;ae<Y;ae++){let K=ie*ae,Me=ie*(ae+1);A(T+k+K,T+B+K,T+B+Me,T+k+Me)}}}function Z(G,T,I){c.push(G),c.push(T),c.push(I)}function be(G,T,I){E(G),E(T),E(I);let k=i.length/3,B=_.generateTopUV(n,i,k-3,k-2,k-1);W(B[0]),W(B[1]),W(B[2])}function A(G,T,I,k){E(G),E(T),E(k),E(T),E(I),E(k);let B=i.length/3,ae=_.generateSideWallUV(n,i,B-6,B-3,B-2,B-1);W(ae[0]),W(ae[1]),W(ae[3]),W(ae[1]),W(ae[2]),W(ae[3])}function E(G){i.push(c[3*G+0]),i.push(c[3*G+1]),i.push(c[3*G+2])}function W(G){s.push(G.x),s.push(G.y)}(function(){let G=i.length/3;if(d){let T=0,I=ie*T;for(let k=0;k<he;k++){let B=ce[k];be(B[2]+I,B[1]+I,B[0]+I)}T=h+2*f,I=ie*T;for(let k=0;k<he;k++){let B=ce[k];be(B[0]+I,B[1]+I,B[2]+I)}}else{for(let T=0;T<he;T++){let I=ce[T];be(I[2],I[1],I[0])}for(let T=0;T<he;T++){let I=ce[T];be(I[0]+ie*h,I[1]+ie*h,I[2]+ie*h)}}n.addGroup(G,i.length/3-G,0)})(),(function(){let G=i.length/3,T=0;ge(V,T),T+=V.length;for(let I=0,k=U.length;I<k;I++){let B=U[I];ge(B,T),T+=B.length}n.addGroup(G,i.length/3-G,1)})()}this.setAttribute("position",new Pe(i,3)),this.setAttribute("uv",new Pe(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ya[i.type]().fromJSON(i)),new r(n,e.options)}},dd={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ue(s,a),new ue(o,c),new ue(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],v=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ue(a,1-c),new ue(l,1-u),new ue(d,1-p),new ue(v,1-g)]:[new ue(o,1-c),new ue(h,1-u),new ue(m,1-p),new ue(f,1-g)]}},Ma=class r extends Li{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},yi=class r extends pt{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ut(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new b,d=new ue,m=new b,p=new b,v=new b,f=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:f=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,m.x=1*g,m.y=-f,m.z=0*g,v.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:f=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=v.x,m.y+=v.y,m.z+=v.z,m.normalize(),c.push(m.x,m.y,m.z),v.copy(p)}for(let _=0;_<=t;_++){let y=n+_*h*i,x=Math.sin(y),M=Math.cos(y);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*x,u.y=e[w].y,u.z=e[w].x*M,a.push(u.x,u.y,u.z),d.x=_/t,d.y=w/(e.length-1),o.push(d.x,d.y);let L=c[3*w+0]*x,z=c[3*w+1],D=c[3*w+0]*M;l.push(L,z,D)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let x=y+_*e.length,M=x,w=x+e.length,L=x+e.length+1,z=x+1;s.push(M,w,z),s.push(L,z,w)}this.setIndex(s),this.setAttribute("position",new Pe(a,3)),this.setAttribute("uv",new Pe(o,2)),this.setAttribute("normal",new Pe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Er=class r extends Li{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Yt=class r extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],v=[],f=[];for(let g=0;g<h;g++){let _=g*d-a;for(let y=0;y<l;y++){let x=y*u-s;p.push(x,-_,0),v.push(0,0,1),f.push(y/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let y=_+l*g,x=_+l*(g+1),M=_+1+l*(g+1),w=_+1+l*g;m.push(y,x,w),m.push(x,M,w)}this.setIndex(m),this.setAttribute("position",new Pe(p,3)),this.setAttribute("normal",new Pe(v,3)),this.setAttribute("uv",new Pe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Sa=class r extends pt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new b,p=new ue;for(let v=0;v<=i;v++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){let f=v*(n+1);for(let g=0;g<n;g++){let _=g+f,y=_,x=_+n+1,M=_+n+2,w=_+1;o.push(y,x,w),o.push(x,M,w)}}this.setIndex(o),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Xi=class r extends pt{constructor(e=new Wt([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;ei.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let _=p[f];ei.isClockWise(_)===!0&&(p[f]=_.reverse())}let v=ei.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let _=p[f];m=m.concat(_)}for(let f=0,g=m.length;f<g;f++){let _=m[f];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let f=0,g=v.length;f<g;f++){let _=v[f],y=_[0]+u,x=_[1]+u,M=_[2]+u;n.push(y,x,M),c+=3}}this.setIndex(n),this.setAttribute("position",new Pe(i,3)),this.setAttribute("normal",new Pe(s,3)),this.setAttribute("uv",new Pe(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},an=class r extends pt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new b,d=new b,m=[],p=[],v=[],f=[];for(let g=0;g<=n;g++){let _=[],y=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let w=M/t;u.x=-e*Math.cos(i+w*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+w*s)*Math.sin(a+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),f.push(w+x,1-y),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],x=h[g][_],M=h[g+1][_],w=h[g+1][_+1];(g!==0||a>0)&&m.push(y,x,w),(g!==n-1||c<Math.PI)&&m.push(x,M,w)}this.setIndex(m),this.setAttribute("position",new Pe(p,3)),this.setAttribute("normal",new Pe(v,3)),this.setAttribute("uv",new Pe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ta=class r extends Li{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},xt=class r extends pt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new b,u=new b,d=new b;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let v=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(v),u.y=(e+t*Math.cos(f))*Math.sin(v),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let v=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,_=(i+1)*m+p;a.push(v,f,_),a.push(f,g,_)}this.setIndex(a),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},ba=class r extends pt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new b,d=new b,m=new b,p=new b,v=new b,f=new b,g=new b;for(let y=0;y<=n;++y){let x=y/n*s*Math.PI*2;_(x,s,a,e,m),_(x+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),v.crossVectors(f,g),g.crossVectors(v,f),v.normalize(),g.normalize();for(let M=0;M<=i;++M){let w=M/i*Math.PI*2,L=-t*Math.cos(w),z=t*Math.sin(w);u.x=m.x+(L*g.x+z*v.x),u.y=m.y+(L*g.y+z*v.y),u.z=m.z+(L*g.z+z*v.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(M/i)}}for(let y=1;y<=n;y++)for(let x=1;x<=i;x++){let M=(i+1)*(y-1)+(x-1),w=(i+1)*y+(x-1),L=(i+1)*y+x,z=(i+1)*(y-1)+x;o.push(M,w,z),o.push(w,L,z)}function _(y,x,M,w,L){let z=Math.cos(y),D=Math.sin(y),P=M/x*y,U=Math.cos(P);L.x=w*(2+U)*.5*z,L.y=w*(2+U)*D*.5,L.z=w*Math.sin(P)*.5}this.setIndex(o),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Mt=class r extends pt{constructor(e=new ms(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new b,c=new b,l=new ue,h=new b,u=[],d=[],m=[],p=[];function v(f){h=e.getPointAt(f/t,h);let g=a.normals[f],_=a.binormals[f];for(let y=0;y<=i;y++){let x=y/i*Math.PI*2,M=Math.sin(x),w=-Math.cos(x);c.x=w*g.x+M*_.x,c.y=w*g.y+M*_.y,c.z=w*g.z+M*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)v(f);v(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let _=(i+1)*(f-1)+(g-1),y=(i+1)*f+(g-1),x=(i+1)*f+g,M=(i+1)*(f-1)+g;p.push(_,y,M),p.push(y,x,M)}})()})(),this.setIndex(p),this.setAttribute("position",new Pe(u,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ya[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},wa=class extends pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new b,s=new b;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let v=0;v<3;v++){let f=o.getX(m+v),g=o.getX(m+(v+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Wc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Wc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Pe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Wc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var Nm=Object.freeze({__proto__:null,BoxGeometry:Qe,CapsuleGeometry:Tr,CircleGeometry:Gn,ConeGeometry:pa,CylinderGeometry:Xe,DodecahedronGeometry:ma,EdgesGeometry:fa,ExtrudeGeometry:Ut,IcosahedronGeometry:Ma,LatheGeometry:yi,OctahedronGeometry:Er,PlaneGeometry:Yt,PolyhedronGeometry:Li,RingGeometry:Sa,ShapeGeometry:Xi,SphereGeometry:an,TetrahedronGeometry:Ta,TorusGeometry:xt,TorusKnotGeometry:ba,TubeGeometry:Mt,WireframeGeometry:wa}),ys=class extends _i{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ke(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var wt=class extends _i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xn=class extends wt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ar=class extends _i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ea=class extends _i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ta(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function pd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ji=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Aa=class extends ji{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vo,endingEnd:Vo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ho:s=e,o=2*t-n;break;case Wo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ho:a=e,c=2*n-t;break;case Wo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),v=p*p,f=v*p,g=-d*f+2*d*v-d*p,_=(1+d)*f+(-1.5-2*d)*v+(-.5+d)*p+1,y=(-1-m)*f+(1.5+m)*v+.5*p,x=m*f-m*v;for(let M=0;M!==o;++M)s[M]=g*a[h+M]+_*a[l+M]+y*a[c+M]+x*a[u+M];return s}},Ca=class extends ji{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Ra=class extends ji{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Rn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ta(t,this.TimeBufferType),this.values=ta(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ta(e.times,Array),values:ta(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Aa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Jr:t=this.InterpolantFactoryMethodDiscrete;break;case sa:t=this.InterpolantFactoryMethodLinear;break;case na:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return sa;case this.InterpolantFactoryMethodSmooth:return na}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&pd(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===na,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Rn.prototype.ValueTypeName="",Rn.prototype.TimeBufferType=Float32Array,Rn.prototype.ValueBufferType=Float32Array,Rn.prototype.DefaultInterpolation=sa;var Ri=class extends Rn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool",Ri.prototype.ValueBufferType=Array,Ri.prototype.DefaultInterpolation=Jr,Ri.prototype.InterpolantFactoryMethodLinear=void 0,Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Pa.prototype.ValueTypeName="color";var Ia=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Ia.prototype.ValueTypeName="number";var La=class extends ji{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Pn.slerpFlat(s,0,a,l-o,a,l,c);return s}},xs=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new La(this.times,this.values,this.getValueSize(),e)}};xs.prototype.ValueTypeName="quaternion",xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends Rn{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="string",Pi.prototype.ValueBufferType=Array,Pi.prototype.DefaultInterpolation=Jr,Pi.prototype.InterpolantFactoryMethodLinear=void 0,Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Da=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Da.prototype.ValueTypeName="vector";var Ua=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},jh=new Ua,Na=class{constructor(e){this.manager=e!==void 0?e:jh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Na.DEFAULT_MATERIAL_NAME="__DEFAULT";var Cr=class extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Dn=class extends Cr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Bo=new Ze,Xc=new b,jc=new b,Fa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ii,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Xc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xc),jc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jc),t.updateMatrixWorld(),Bo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var qc=new Ze,jr=new b,zo=new b,Jo=class extends Fa{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new bt(2,1,1,1),new bt(0,1,1,1),new bt(3,1,1,1),new bt(1,1,1,1),new bt(3,0,1,1),new bt(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),jr.setFromMatrixPosition(e.matrixWorld),n.position.copy(jr),zo.copy(n.position),zo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(zo),n.updateMatrixWorld(),i.makeTranslation(-jr.x,-jr.y,-jr.z),qc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qc,n.coordinateSystem,n.reversedDepth)}},Rr=class extends Cr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Jo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},xi=class extends xr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ko=class extends Fa{constructor(){super(new xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wn=class extends Cr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new Ko}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Fm=new Ze,Om=new Ze,Bm=new Ze;var Oa=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var zm=new b,Gm=new Pn,km=new b,Vm=new b,Hm=new b;var Wm=new b,Xm=new Pn,jm=new b,qm=new b;var Hl="\\[\\]\\.:\\/",md=new RegExp("["+Hl+"]","g"),Go="[^"+Hl+"]",fd="[^"+Hl.replace("\\.","")+"]",gd=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Go)+/(WCOD+)?/.source.replace("WCOD",fd)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Go)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Go)+"$"),vd=["material","materials","bones","map"],Dt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(md,"")}static parseTrackName(e){let t=gd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);vd.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Dt.Composite=class{constructor(r,e,t){let n=t||Dt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Dt.prototype.GetterByBindingType=[Dt.prototype._getValue_direct,Dt.prototype._getValue_array,Dt.prototype._getValue_arrayElement,Dt.prototype._getValue_toArray],Dt.prototype.SetterByBindingTypeAndVersioning=[[Dt.prototype._setValue_direct,Dt.prototype._setValue_direct_setNeedsUpdate,Dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_array,Dt.prototype._setValue_array_setNeedsUpdate,Dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_arrayElement,Dt.prototype._setValue_arrayElement_setNeedsUpdate,Dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_fromArray,Dt.prototype._setValue_fromArray_setNeedsUpdate,Dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ym=new Float32Array(1);var Zm=new Ze;var Jm=new ue;var Km=new b,$m=new b,Qm=new b,ef=new b,tf=new b,nf=new b,rf=new b;var sf=new b;var af=new b,of=new Ze,lf=new Ze;var cf=new b,hf=new Ke,uf=new Ke;var df=new b,pf=new b,mf=new b;var ff=new b,gf=new xr;var vf=new _n;var _f=new b;function Wl(r,e,t,n){let i=(function(s){switch(s){case si:case rl:return{byteLength:1,components:1};case Dr:case sl:case Ui:return{byteLength:2,components:1};case Ja:case Ka:return{byteLength:2,components:4};case Zi:case Za:case kn:return{byteLength:4,components:1};case al:case ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case $a:case Qa:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Vn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function gu(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function yd(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var ht={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ue={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},ai={basic:{uniforms:pn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:pn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ke(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:pn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:pn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:pn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new Ke(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:pn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:pn([Ue.points,Ue.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:pn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:pn([Ue.common,Ue.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:pn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:pn([Ue.sprite,Ue.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:pn([Ue.common,Ue.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:pn([Ue.lights,Ue.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};ai.physical={uniforms:pn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var so={r:0,b:0,g:0},Qi=new Jn,xd=new Ze;function Md(r,e,t,n,i,s,a){let o=new Ke(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function v(f,g){f.getRGB(so,kl(r)),n.buffers.color.setClear(so.r,so.g,so.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,v(o,h)},render:function(f){let g=!1,_=p(f);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let _=p(g);_&&(_.isCubeTexture||_.mapping===Ts)?(l===void 0&&(l=new it(new Qe(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:$i(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,x,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Qi.copy(g.backgroundRotation),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),l.material.uniforms.envMap.value=_,l.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xd.makeRotationFromEuler(Qi)),l.material.toneMapped=_t.getTransfer(_.colorSpace)!==Rt,u===_&&d===_.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=_,d=_.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new it(new Yt(2,2),new un({name:"BackgroundMaterial",uniforms:$i(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=_t.getTransfer(_.colorSpace)!==Rt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&d===_.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=_,d=_.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Sd(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let _=[],y=[],x=[];for(let M=0;M<t;M++)_[M]=0,y[M]=0,x[M]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:y,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,y=g.length;_<y;_++)g[_]=0}function u(g){d(g,0)}function d(g,_){let y=s.newAttributes,x=s.enabledAttributes,M=s.attributeDivisors;y[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),M[g]!==_&&(r.vertexAttribDivisor(g,_),M[g]=_)}function m(){let g=s.newAttributes,_=s.enabledAttributes;for(let y=0,x=_.length;y<x;y++)_[y]!==g[y]&&(r.disableVertexAttribArray(y),_[y]=0)}function p(g,_,y,x,M,w,L){L===!0?r.vertexAttribIPointer(g,_,y,M,w):r.vertexAttribPointer(g,_,y,x,M,w)}function v(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,_,y,x,M){let w=!1,L=(function(z,D,P){let U=P.wireframe===!0,N=n[z.id];N===void 0&&(N={},n[z.id]=N);let j=N[D.id];j===void 0&&(j={},N[D.id]=j);let V=j[U];return V===void 0&&(V=l(r.createVertexArray()),j[U]=V),V})(x,y,_);s!==L&&(s=L,o(s.object)),w=(function(z,D,P,U){let N=s.attributes,j=D.attributes,V=0,te=P.getAttributes();for(let ie in te)if(te[ie].location>=0){let pe=N[ie],le=j[ie];if(le===void 0&&(ie==="instanceMatrix"&&z.instanceMatrix&&(le=z.instanceMatrix),ie==="instanceColor"&&z.instanceColor&&(le=z.instanceColor)),pe===void 0||pe.attribute!==le||le&&pe.data!==le.data)return!0;V++}return s.attributesNum!==V||s.index!==U})(g,x,y,M),w&&(function(z,D,P,U){let N={},j=D.attributes,V=0,te=P.getAttributes();for(let ie in te)if(te[ie].location>=0){let pe=j[ie];pe===void 0&&(ie==="instanceMatrix"&&z.instanceMatrix&&(pe=z.instanceMatrix),ie==="instanceColor"&&z.instanceColor&&(pe=z.instanceColor));let le={};le.attribute=pe,pe&&pe.data&&(le.data=pe.data),N[ie]=le,V++}s.attributes=N,s.attributesNum=V,s.index=U})(g,x,y,M),M!==null&&e.update(M,r.ELEMENT_ARRAY_BUFFER),(w||a)&&(a=!1,(function(z,D,P,U){h();let N=U.attributes,j=P.getAttributes(),V=D.defaultAttributeValues;for(let te in j){let ie=j[te];if(ie.location>=0){let pe=N[te];if(pe===void 0&&(te==="instanceMatrix"&&z.instanceMatrix&&(pe=z.instanceMatrix),te==="instanceColor"&&z.instanceColor&&(pe=z.instanceColor)),pe!==void 0){let le=pe.normalized,_e=pe.itemSize,ee=e.get(pe);if(ee===void 0)continue;let ce=ee.buffer,Re=ee.type,he=ee.bytesPerElement,xe=Re===r.INT||Re===r.UNSIGNED_INT||pe.gpuType===Za;if(pe.isInterleavedBufferAttribute){let ge=pe.data,Z=ge.stride,be=pe.offset;if(ge.isInstancedInterleavedBuffer){for(let A=0;A<ie.locationSize;A++)d(ie.location+A,ge.meshPerAttribute);z.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let A=0;A<ie.locationSize;A++)u(ie.location+A);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let A=0;A<ie.locationSize;A++)p(ie.location+A,_e/ie.locationSize,Re,le,Z*he,(be+_e/ie.locationSize*A)*he,xe)}else{if(pe.isInstancedBufferAttribute){for(let ge=0;ge<ie.locationSize;ge++)d(ie.location+ge,pe.meshPerAttribute);z.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ge=0;ge<ie.locationSize;ge++)u(ie.location+ge);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let ge=0;ge<ie.locationSize;ge++)p(ie.location+ge,_e/ie.locationSize,Re,le,_e*he,_e/ie.locationSize*ge*he,xe)}}else if(V!==void 0){let le=V[te];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(ie.location,le);break;case 3:r.vertexAttrib3fv(ie.location,le);break;case 4:r.vertexAttrib4fv(ie.location,le);break;default:r.vertexAttrib1fv(ie.location,le)}}}}m()})(g,_,y,x),M!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(M).buffer))},reset:v,resetDefaultState:f,dispose:function(){v();for(let g in n){let _=n[g];for(let y in _){let x=_[y];for(let M in x)c(x[M].object),delete x[M];delete _[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let y in _){let x=_[y];for(let M in x)c(x[M].object),delete x[M];delete _[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let y=n[_];if(y[g.id]===void 0)continue;let x=y[g.id];for(let M in x)c(x[M].object),delete x[M];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Td(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function bd(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Vn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===Ui&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==si&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==kn&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function wd(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Qn,o=new ot,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,v=null;if(p!==0){if(v=c.value,m!==!0||v===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<f)&&(v=new Float32Array(f));for(let _=0,y=d;_!==p;++_,y+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,y),v[y+3]=a.constant}c.value=v,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,v}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,v=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!v)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,y=f.clippingState||null;c.value=y,y=l(m,u,_,d);for(let x=0;x!==_;++x)y[x]=t[x];f.clippingState=y,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function Ed(r){let e=new WeakMap;function t(i,s){return s===ja?i.mapping=Lr:s===qa&&(i.mapping=qi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===ja||s===qa){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new ua(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var qh=[.125,.215,.35,.446,.526,.582],As=20,Xl=new xi,Yh=new Ke,jl=null,ql=0,Yl=0,Zl=!1,tr=(1+Math.sqrt(5))/2,Nr=1/tr,Zh=[new b(-tr,Nr,0),new b(tr,Nr,0),new b(-Nr,0,tr),new b(Nr,0,tr),new b(0,tr,-Nr),new b(0,tr,Nr),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)],Ad=new b,Or=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Ad}=s;jl=this._renderer.getRenderTarget(),ql=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jl,ql,Yl),this._renderer.xr.enabled=Zl,e.scissorTest=!1,ao(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Lr||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jl=this._renderer.getRenderTarget(),ql=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:Ui,format:Vn,colorSpace:ki,depthBuffer:!1},i=Jh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+qh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=qh[d-a+4-1]:d===0&&(p=0),l.push(p);let v=1/(m-2),f=-v,g=1+v,_=[f,f,g,f,g,g,f,f,g,g,f,g],y=6,x=6,M=3,w=2,L=1,z=new Float32Array(M*x*y),D=new Float32Array(w*x*y),P=new Float32Array(L*x*y);for(let N=0;N<y;N++){let j=N%3*2/3-1,V=N>2?0:-1,te=[j,V,0,j+2/3,V,0,j+2/3,V+1,0,j,V,0,j+2/3,V+1,0,j,V+1,0];z.set(te,M*x*N),D.set(_,w*x*N);let ie=[N,N,N,N,N,N];P.set(ie,L*x*N)}let U=new pt;U.setAttribute("position",new bn(z,M)),U.setAttribute("uv",new bn(D,w)),U.setAttribute("faceIndex",new bn(P,L)),o.push(U),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(As),h=new b(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:As,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:sc(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new it(this._lodPlanes[0],e);this._renderer.compile(t,Xl)}_sceneToCubeUV(e,t,n,i,s){let a=new Vt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Yh),l.toneMapping=Mi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new zn({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1}),m=new it(new Qe,d),p=!1,v=e.background;v?v.isColor&&(d.color.copy(v),e.background=null,p=!0):(d.color.copy(Yh),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let _=this._cubeSize;ao(i,g*_,f>2?_:0,_,_),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Lr||e.mapping===qi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$h()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new it(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;ao(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Xl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Zh[(i-s-1)%Zh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new it(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,v=isFinite(s)?1+Math.floor(3*p):As;v>As&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let f=[],g=0;for(let x=0;x<As;++x){let M=x/p,w=Math.exp(-M*M/2);f.push(w),x===0?g+=w:x<v&&(g+=2*w)}for(let x=0;x<f.length;x++)f[x]=f[x]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=m,u.mipInt.value=_-n;let y=this._sizeLods[i];ao(t,3*y*(i>_-4?i-_+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Xl)}};function Jh(r,e,t){let n=new Bn(r,e,t);return n.texture.mapping=Ts,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ao(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Kh(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function $h(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function sc(){return`

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
	`}function Cd(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===ja||s===qa,o=s===Lr||s===qi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Or(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new Or(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Rd(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&_r("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Pd(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let v=h.array;d=h.version;for(let f=0,g=v.length;f<g;f+=3){let _=v[f+0],y=v[f+1],x=v[f+2];l.push(_,y,y,x,x,_)}}else{if(u===void 0)return;{let v=u.array;d=u.version;for(let f=0,g=v.length/3-1;f<g;f+=3){let _=f+0,y=f+1,x=f+2;l.push(_,y,y,x,x,_)}}}let m=new(Gl(l)?ns:Hi)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Id(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function Ld(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Dd(r,e,t){let n=new WeakMap,i=new bt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let z=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",z)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),m===!0&&(_=2),p===!0&&(_=3);let y=a.attributes.position.count*_,x=1;y>e.maxTextureSize&&(x=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let M=new Float32Array(y*x*4*h),w=new es(M,y,x,h);w.type=kn,w.needsUpdate=!0;let L=4*_;for(let D=0;D<h;D++){let P=v[D],U=f[D],N=g[D],j=y*x*4*D;for(let V=0;V<P.count;V++){let te=V*L;d===!0&&(i.fromBufferAttribute(P,V),M[j+te+0]=i.x,M[j+te+1]=i.y,M[j+te+2]=i.z,M[j+te+3]=0),m===!0&&(i.fromBufferAttribute(U,V),M[j+te+4]=i.x,M[j+te+5]=i.y,M[j+te+6]=i.z,M[j+te+7]=0),p===!0&&(i.fromBufferAttribute(N,V),M[j+te+8]=i.x,M[j+te+9]=i.y,M[j+te+10]=i.z,M[j+te+11]=N.itemSize===4?i.w:1)}}u={count:h,texture:w,size:new ue(y,x)},n.set(a,u),a.addEventListener("dispose",z)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Ud(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var vu=new vn,Qh=new cs(1,1),_u=new es,yu=new ca,xu=new is,eu=[],tu=[],nu=new Float32Array(16),iu=new Float32Array(9),ru=new Float32Array(4);function Br(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=eu[i];if(s===void 0&&(s=new Float32Array(i),eu[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function en(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function tn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function lo(r,e){let t=tu[e];t===void 0&&(t=new Int32Array(e),tu[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Nd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Fd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;r.uniform2fv(this.addr,e),tn(t,e)}}function Od(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(en(t,e))return;r.uniform3fv(this.addr,e),tn(t,e)}}function Bd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;r.uniform4fv(this.addr,e),tn(t,e)}}function zd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;ru.set(n),r.uniformMatrix2fv(this.addr,!1,ru),tn(t,n)}}function Gd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;iu.set(n),r.uniformMatrix3fv(this.addr,!1,iu),tn(t,n)}}function kd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;nu.set(n),r.uniformMatrix4fv(this.addr,!1,nu),tn(t,n)}}function Vd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Hd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;r.uniform2iv(this.addr,e),tn(t,e)}}function Wd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;r.uniform3iv(this.addr,e),tn(t,e)}}function Xd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;r.uniform4iv(this.addr,e),tn(t,e)}}function jd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function qd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;r.uniform2uiv(this.addr,e),tn(t,e)}}function Yd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;r.uniform3uiv(this.addr,e),tn(t,e)}}function Zd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;r.uniform4uiv(this.addr,e),tn(t,e)}}function Jd(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Qh.compareFunction=Bl,s=Qh):s=vu,t.setTexture2D(e||s,i)}function Kd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||yu,i)}function $d(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||xu,i)}function Qd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||_u,i)}function ep(r,e){r.uniform1fv(this.addr,e)}function tp(r,e){let t=Br(e,this.size,2);r.uniform2fv(this.addr,t)}function np(r,e){let t=Br(e,this.size,3);r.uniform3fv(this.addr,t)}function ip(r,e){let t=Br(e,this.size,4);r.uniform4fv(this.addr,t)}function rp(r,e){let t=Br(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function sp(r,e){let t=Br(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ap(r,e){let t=Br(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function op(r,e){r.uniform1iv(this.addr,e)}function lp(r,e){r.uniform2iv(this.addr,e)}function cp(r,e){r.uniform3iv(this.addr,e)}function hp(r,e){r.uniform4iv(this.addr,e)}function up(r,e){r.uniform1uiv(this.addr,e)}function dp(r,e){r.uniform2uiv(this.addr,e)}function pp(r,e){r.uniform3uiv(this.addr,e)}function mp(r,e){r.uniform4uiv(this.addr,e)}function fp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||vu,s[a])}function gp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||yu,s[a])}function vp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||xu,s[a])}function _p(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||_u,s[a])}var Kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Nd;case 35664:return Fd;case 35665:return Od;case 35666:return Bd;case 35674:return zd;case 35675:return Gd;case 35676:return kd;case 5124:case 35670:return Vd;case 35667:case 35671:return Hd;case 35668:case 35672:return Wd;case 35669:case 35673:return Xd;case 5125:return jd;case 36294:return qd;case 36295:return Yd;case 36296:return Zd;case 35678:case 36198:case 36298:case 36306:case 35682:return Jd;case 35679:case 36299:case 36307:return Kd;case 35680:case 36300:case 36308:case 36293:return $d;case 36289:case 36303:case 36311:case 36292:return Qd}})(t.type)}},$l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return ep;case 35664:return tp;case 35665:return np;case 35666:return ip;case 35674:return rp;case 35675:return sp;case 35676:return ap;case 5124:case 35670:return op;case 35667:case 35671:return lp;case 35668:case 35672:return cp;case 35669:case 35673:return hp;case 5125:return up;case 36294:return dp;case 36295:return pp;case 36296:return mp;case 35678:case 36198:case 36298:case 36306:case 35682:return fp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return vp;case 36289:case 36303:case 36311:case 36292:return _p}})(t.type)}},Ql=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Jl=/(\w+)(\])?(\[|\.)?/g;function su(r,e){r.seq.push(e),r.map[e.id]=e}function yp(r,e,t){let n=r.name,i=n.length;for(Jl.lastIndex=0;;){let s=Jl.exec(n),a=Jl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){su(t,l===void 0?new Kl(o,r,e):new $l(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Ql(o),su(t,h)),t=h}}}var Fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);yp(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function au(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var xp=0,ou=new ot;function lu(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Mp(r,e){let t=(function(n){_t._getMatrix(ou,_t.workingColorSpace,n);let i=`mat3( ${ou.elements.map(s=>s.toFixed(4))} )`;switch(_t.getTransfer(n)){case Kr:return[i,"LinearTransferOETF"];case Rt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Sp(r,e){let t;switch(e){case yh:t="Linear";break;case xh:t="Reinhard";break;case Mh:t="Cineon";break;case ri:t="ACESFilmic";break;case Th:t="AgX";break;case bh:t="Neutral";break;case Sh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var oo=new b;function Tp(){return _t.getLuminanceCoefficients(oo),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${oo.x.toFixed(4)}, ${oo.y.toFixed(4)}, ${oo.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cs(r){return r!==""}function cu(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hu(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var bp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ec(r){return r.replace(bp,Ep)}var wp=new Map;function Ep(r,e){let t=ht[e];if(t===void 0){let n=wp.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ec(t)}var Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uu(r){return r.replace(Ap,Cp)}function Cp(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function du(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Rp(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(U){let N="SHADOWMAP_TYPE_BASIC";return U.shadowMapType===Qo?N="SHADOWMAP_TYPE_PCF":U.shadowMapType===Ba?N="SHADOWMAP_TYPE_PCF_SOFT":U.shadowMapType===ii&&(N="SHADOWMAP_TYPE_VSM"),N})(t),l=(function(U){let N="ENVMAP_TYPE_CUBE";if(U.envMap)switch(U.envMapMode){case Lr:case qi:N="ENVMAP_TYPE_CUBE";break;case Ts:N="ENVMAP_TYPE_CUBE_UV"}return N})(t),h=(function(U){let N="ENVMAP_MODE_REFLECTION";return U.envMap&&U.envMapMode===qi&&(N="ENVMAP_MODE_REFRACTION"),N})(t),u=(function(U){let N="ENVMAP_BLENDING_NONE";if(U.envMap)switch(U.combine){case gh:N="ENVMAP_BLENDING_MULTIPLY";break;case vh:N="ENVMAP_BLENDING_MIX";break;case _h:N="ENVMAP_BLENDING_ADD"}return N})(t),d=(function(U){let N=U.envMapCubeUVHeight;if(N===null)return null;let j=Math.log2(N)-2,V=1/N;return{texelWidth:1/(3*Math.max(Math.pow(2,j),112)),texelHeight:V,maxMip:j}})(t),m=(function(U){return[U.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",U.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)})(t),p=(function(U){let N=[];for(let j in U){let V=U[j];V!==!1&&N.push("#define "+j+" "+V)}return N.join(`
`)})(s),v=i.createProgram(),f,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cs).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cs).join(`
`),g.length>0&&(g+=`
`)):(f=[du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),g=[du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?ht.tonemapping_pars_fragment:"",t.toneMapping!==Mi?Sp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Mp("linearToOutputTexel",t.outputColorSpace),Tp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),a=ec(a),a=cu(a,t),a=hu(a,t),o=ec(o),o=cu(o,t),o=hu(o,t),a=uu(a),o=uu(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+f+a,x=_+g+o,M=au(i,i.VERTEX_SHADER,y),w=au(i,i.FRAGMENT_SHADER,x);function L(U){if(r.debug.checkShaderErrors){let N=i.getProgramInfoLog(v)||"",j=i.getShaderInfoLog(M)||"",V=i.getShaderInfoLog(w)||"",te=N.trim(),ie=j.trim(),pe=V.trim(),le=!0,_e=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,M,w);else{let ee=lu(i,M,"vertex"),ce=lu(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+te+`
`+ee+`
`+ce)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):ie!==""&&pe!==""||(_e=!1);_e&&(U.diagnostics={runnable:le,programLog:te,vertexShader:{log:ie,prefix:f},fragmentShader:{log:pe,prefix:g}})}i.deleteShader(M),i.deleteShader(w),z=new Fr(i,v),D=(function(N,j){let V={},te=N.getProgramParameter(j,N.ACTIVE_ATTRIBUTES);for(let ie=0;ie<te;ie++){let pe=N.getActiveAttrib(j,ie),le=pe.name,_e=1;pe.type===N.FLOAT_MAT2&&(_e=2),pe.type===N.FLOAT_MAT3&&(_e=3),pe.type===N.FLOAT_MAT4&&(_e=4),V[le]={type:pe.type,location:N.getAttribLocation(j,le),locationSize:_e}}return V})(i,v)}let z,D;i.attachShader(v,M),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),this.getUniforms=function(){return z===void 0&&L(this),z},this.getAttributes=function(){return D===void 0&&L(this),D};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(v,37297)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xp++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=w,this}var Pp=0,tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nc(e),t.set(e,n)),n}},nc=class{constructor(e){this.id=Pp++,this.code=e,this.usedTimes=0}};function Ip(r,e,t,n,i,s,a){let o=new ts,c=new tc,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,_,y,x){let M=y.fog,w=x.geometry,L=f.isMeshStandardMaterial?y.environment:null,z=(f.isMeshStandardMaterial?t:e).get(f.envMap||L),D=z&&z.mapping===Ts?z.image.height:null,P=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let U=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,N=U!==void 0?U.length:0,j,V,te,ie,pe=0;if(w.morphAttributes.position!==void 0&&(pe=1),w.morphAttributes.normal!==void 0&&(pe=2),w.morphAttributes.color!==void 0&&(pe=3),P){let gt=ai[P];j=gt.vertexShader,V=gt.fragmentShader}else j=f.vertexShader,V=f.fragmentShader,c.update(f),te=c.getVertexShaderID(f),ie=c.getFragmentShaderID(f);let le=r.getRenderTarget(),_e=r.state.buffers.depth.getReversed(),ee=x.isInstancedMesh===!0,ce=x.isBatchedMesh===!0,Re=!!f.map,he=!!f.matcap,xe=!!z,ge=!!f.aoMap,Z=!!f.lightMap,be=!!f.bumpMap,A=!!f.normalMap,E=!!f.displacementMap,W=!!f.emissiveMap,G=!!f.metalnessMap,T=!!f.roughnessMap,I=f.anisotropy>0,k=f.clearcoat>0,B=f.dispersion>0,ae=f.iridescence>0,Y=f.sheen>0,K=f.transmission>0,Me=I&&!!f.anisotropyMap,Ie=k&&!!f.clearcoatMap,ye=k&&!!f.clearcoatNormalMap,Ce=k&&!!f.clearcoatRoughnessMap,Ve=ae&&!!f.iridescenceMap,de=ae&&!!f.iridescenceThicknessMap,De=Y&&!!f.sheenColorMap,Oe=Y&&!!f.sheenRoughnessMap,je=!!f.specularMap,Te=!!f.specularColorMap,Ee=!!f.specularIntensityMap,ke=K&&!!f.transmissionMap,It=K&&!!f.thicknessMap,Ge=!!f.gradientMap,mt=!!f.alphaMap,rt=f.alphaTest>0,nn=!!f.alphaHash,on=!!f.extensions,H=Mi;f.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(H=r.toneMapping));let Ft={shaderID:P,shaderType:f.type,shaderName:f.name,vertexShader:j,fragmentShader:V,defines:f.defines,customVertexShaderID:te,customFragmentShaderID:ie,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:ce,batchingColor:ce&&x._colorsTexture!==null,instancing:ee,instancingColor:ee&&x.instanceColor!==null,instancingMorph:ee&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:ki,alphaToCoverage:!!f.alphaToCoverage,map:Re,matcap:he,envMap:xe,envMapMode:xe&&z.mapping,envMapCubeUVHeight:D,aoMap:ge,lightMap:Z,bumpMap:be,normalMap:A,displacementMap:d&&E,emissiveMap:W,normalMapObjectSpace:A&&f.normalMapType===Ih,normalMapTangentSpace:A&&f.normalMapType===Ph,metalnessMap:G,roughnessMap:T,anisotropy:I,anisotropyMap:Me,clearcoat:k,clearcoatMap:Ie,clearcoatNormalMap:ye,clearcoatRoughnessMap:Ce,dispersion:B,iridescence:ae,iridescenceMap:Ve,iridescenceThicknessMap:de,sheen:Y,sheenColorMap:De,sheenRoughnessMap:Oe,specularMap:je,specularColorMap:Te,specularIntensityMap:Ee,transmission:K,transmissionMap:ke,thicknessMap:It,gradientMap:Ge,opaque:f.transparent===!1&&f.blending===Ms&&f.alphaToCoverage===!1,alphaMap:mt,alphaTest:rt,alphaHash:nn,combine:f.combine,mapUv:Re&&v(f.map.channel),aoMapUv:ge&&v(f.aoMap.channel),lightMapUv:Z&&v(f.lightMap.channel),bumpMapUv:be&&v(f.bumpMap.channel),normalMapUv:A&&v(f.normalMap.channel),displacementMapUv:E&&v(f.displacementMap.channel),emissiveMapUv:W&&v(f.emissiveMap.channel),metalnessMapUv:G&&v(f.metalnessMap.channel),roughnessMapUv:T&&v(f.roughnessMap.channel),anisotropyMapUv:Me&&v(f.anisotropyMap.channel),clearcoatMapUv:Ie&&v(f.clearcoatMap.channel),clearcoatNormalMapUv:ye&&v(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&v(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&v(f.iridescenceMap.channel),iridescenceThicknessMapUv:de&&v(f.iridescenceThicknessMap.channel),sheenColorMapUv:De&&v(f.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&v(f.sheenRoughnessMap.channel),specularMapUv:je&&v(f.specularMap.channel),specularColorMapUv:Te&&v(f.specularColorMap.channel),specularIntensityMapUv:Ee&&v(f.specularIntensityMap.channel),transmissionMapUv:ke&&v(f.transmissionMap.channel),thicknessMapUv:It&&v(f.thicknessMap.channel),alphaMapUv:mt&&v(f.alphaMap.channel),vertexTangents:!!w.attributes.tangent&&(A||I),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!w.attributes.uv&&(Re||mt),fog:!!M,useFog:f.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_e,skinning:x.isSkinnedMesh===!0,morphTargets:w.morphAttributes.position!==void 0,morphNormals:w.morphAttributes.normal!==void 0,morphColors:w.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:pe,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&_.length>0,shadowMapType:r.shadowMap.type,toneMapping:H,decodeVideoTexture:Re&&f.map.isVideoTexture===!0&&_t.getTransfer(f.map.colorSpace)===Rt,decodeVideoTextureEmissive:W&&f.emissiveMap.isVideoTexture===!0&&_t.getTransfer(f.emissiveMap.colorSpace)===Rt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Nt,flipSided:f.side===Un,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:on&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(on&&f.extensions.multiDraw===!0||ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Ft.vertexUv1s=l.has(1),Ft.vertexUv2s=l.has(2),Ft.vertexUv3s=l.has(3),l.clear(),Ft},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let _ in f.defines)g.push(_),g.push(f.defines[_]);return f.isRawShaderMaterial===!1&&((function(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)})(g,f),(function(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],_;if(g){let y=ai[g];_=Vh.clone(y.uniforms)}else _=f.uniforms;return _},acquireProgram:function(f,g){let _;for(let y=0,x=h.length;y<x;y++){let M=h[y];if(M.cacheKey===g){_=M,++_.usedTimes;break}}return _===void 0&&(_=new Rp(r,g,f,s),h.push(_)),_},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function Lp(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Dp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function pu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function mu(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Dp),n.length>1&&n.sort(o||pu),i.length>1&&i.sort(o||pu)}}}function Up(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new mu,r.set(e,[i])):t>=n.length?(i=new mu,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Np(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new Ke};break;case"SpotLight":t={position:new b,direction:new b,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new b,halfWidth:new b,halfHeight:new b}}return r[e.id]=t,t}}}var Fp=0;function Op(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Bp(r){let e=new Np,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new b);let i=new b,s=new Ze,a=new Ze;return{setup:function(o){let c=0,l=0,h=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let u=0,d=0,m=0,p=0,v=0,f=0,g=0,_=0,y=0,x=0,M=0;o.sort(Op);for(let L=0,z=o.length;L<z;L++){let D=o[L],P=D.color,U=D.intensity,N=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=P.r*U,l+=P.g*U,h+=P.b*U;else if(D.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(D.sh.coefficients[V],U);M++}else if(D.isDirectionalLight){let V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let te=D.shadow,ie=t.get(D);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize=te.mapSize,n.directionalShadow[u]=ie,n.directionalShadowMap[u]=j,n.directionalShadowMatrix[u]=D.shadow.matrix,f++}n.directional[u]=V,u++}else if(D.isSpotLight){let V=e.get(D);V.position.setFromMatrixPosition(D.matrixWorld),V.color.copy(P).multiplyScalar(U),V.distance=N,V.coneCos=Math.cos(D.angle),V.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),V.decay=D.decay,n.spot[m]=V;let te=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,te.updateMatrices(D),D.castShadow&&x++),n.spotLightMatrix[m]=te.matrix,D.castShadow){let ie=t.get(D);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize=te.mapSize,n.spotShadow[m]=ie,n.spotShadowMap[m]=j,_++}m++}else if(D.isRectAreaLight){let V=e.get(D);V.color.copy(P).multiplyScalar(U),V.halfWidth.set(.5*D.width,0,0),V.halfHeight.set(0,.5*D.height,0),n.rectArea[p]=V,p++}else if(D.isPointLight){let V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),V.distance=D.distance,V.decay=D.decay,D.castShadow){let te=D.shadow,ie=t.get(D);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize=te.mapSize,ie.shadowCameraNear=te.camera.near,ie.shadowCameraFar=te.camera.far,n.pointShadow[d]=ie,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=V,d++}else if(D.isHemisphereLight){let V=e.get(D);V.skyColor.copy(D.color).multiplyScalar(U),V.groundColor.copy(D.groundColor).multiplyScalar(U),n.hemi[v]=V,v++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let w=n.hash;w.directionalLength===u&&w.pointLength===d&&w.spotLength===m&&w.rectAreaLength===p&&w.hemiLength===v&&w.numDirectionalShadows===f&&w.numPointShadows===g&&w.numSpotShadows===_&&w.numSpotMaps===y&&w.numLightProbes===M||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=v,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+y-x,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=M,w.directionalLength=u,w.pointLength=d,w.spotLength=m,w.rectAreaLength=p,w.hemiLength=v,w.numDirectionalShadows=f,w.numPointShadows=g,w.numSpotShadows=_,w.numSpotMaps=y,w.numLightProbes=M,n.version=Fp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let v=0,f=o.length;v<f;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[l];_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(p),l++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let _=n.rectArea[d];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let _=n.hemi[m];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(p),m++}}},state:n}}function fu(r){let e=new Bp(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function zp(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new fu(r),e.set(t,[s])):n>=i.length?(s=new fu(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Gp(r,e,t){let n=new Ii,i=new ue,s=new ue,a=new bt,o=new Ar({depthPacking:ro}),c=new Ea,l={},h=t.maxTextureSize,u={[Pr]:Un,[Un]:Pr,[Nt]:Nt},d=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new pt;p.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new it(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qo;let g=this.type;function _(w,L){let z=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Bn(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(L,null,z,d,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(L,null,z,m,v,null)}function y(w,L,z,D){let P=null,U=z.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)P=U;else if(P=z.isPointLight===!0?c:o,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let N=P.uuid,j=L.uuid,V=l[N];V===void 0&&(V={},l[N]=V);let te=V[j];te===void 0&&(te=P.clone(),V[j]=te,L.addEventListener("dispose",M)),P=te}return P.visible=L.visible,P.wireframe=L.wireframe,P.side=D===ii?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:u[L.side],P.alphaMap=L.alphaMap,P.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,P.map=L.map,P.clipShadows=L.clipShadows,P.clippingPlanes=L.clippingPlanes,P.clipIntersection=L.clipIntersection,P.displacementMap=L.displacementMap,P.displacementScale=L.displacementScale,P.displacementBias=L.displacementBias,P.wireframeLinewidth=L.wireframeLinewidth,P.linewidth=L.linewidth,z.isPointLight===!0&&P.isMeshDistanceMaterial===!0&&(r.properties.get(P).light=z),P}function x(w,L,z,D,P){if(w.visible===!1)return;if(w.layers.test(L.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===ii)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld);let N=e.update(w),j=w.material;if(Array.isArray(j)){let V=N.groups;for(let te=0,ie=V.length;te<ie;te++){let pe=V[te],le=j[pe.materialIndex];if(le&&le.visible){let _e=y(w,le,D,P);w.onBeforeShadow(r,w,L,z,N,_e,pe),r.renderBufferDirect(z,null,N,_e,w,pe),w.onAfterShadow(r,w,L,z,N,_e,pe)}}}else if(j.visible){let V=y(w,j,D,P);w.onBeforeShadow(r,w,L,z,N,V,null),r.renderBufferDirect(z,null,N,V,w,null),w.onAfterShadow(r,w,L,z,N,V,null)}}let U=w.children;for(let N=0,j=U.length;N<j;N++)x(U[N],L,z,D,P)}function M(w){w.target.removeEventListener("dispose",M);for(let L in l){let z=l[L],D=w.target.uuid;D in z&&(z[D].dispose(),delete z[D])}}this.render=function(w,L,z){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;let D=r.getRenderTarget(),P=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Di),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let j=g!==ii&&this.type===ii,V=g===ii&&this.type!==ii;for(let te=0,ie=w.length;te<ie;te++){let pe=w[te],le=pe.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",pe,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;i.copy(le.mapSize);let _e=le.getFrameExtents();if(i.multiply(_e),s.copy(le.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/_e.x),i.x=s.x*_e.x,le.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/_e.y),i.y=s.y*_e.y,le.mapSize.y=s.y)),le.map===null||j===!0||V===!0){let ce=this.type!==ii?{minFilter:ti,magFilter:ti}:{};le.map!==null&&le.map.dispose(),le.map=new Bn(i.x,i.y,ce),le.map.texture.name=pe.name+".shadowMap",le.camera.updateProjectionMatrix()}r.setRenderTarget(le.map),r.clear();let ee=le.getViewportCount();for(let ce=0;ce<ee;ce++){let Re=le.getViewport(ce);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),N.viewport(a),le.updateMatrices(pe,ce),n=le.getFrustum(),x(L,z,le.camera,pe,this.type)}le.isPointLightShadow!==!0&&this.type===ii&&_(le,z),le.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(D,P,U)}}var kp={[za]:Ga,[ka]:Wa,[Va]:Xa,[Ss]:Ha,[Ga]:za,[Wa]:ka,[Xa]:Va,[Ha]:Ss};function Vp(r,e){let t=new function(){let T=!1,I=new bt,k=null,B=new bt(0,0,0,0);return{setMask:function(ae){k===ae||T||(r.colorMask(ae,ae,ae,ae),k=ae)},setLocked:function(ae){T=ae},setClear:function(ae,Y,K,Me,Ie){Ie===!0&&(ae*=Me,Y*=Me,K*=Me),I.set(ae,Y,K,Me),B.equals(I)===!1&&(r.clearColor(ae,Y,K,Me),B.copy(I))},reset:function(){T=!1,k=null,B.set(-1,0,0,0)}}},n=new function(){let T=!1,I=!1,k=null,B=null,ae=null;return{setReversed:function(Y){if(I!==Y){let K=e.get("EXT_clip_control");Y?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),I=Y;let Me=ae;ae=null,this.setClear(Me)}},getReversed:function(){return I},setTest:function(Y){Y?xe(r.DEPTH_TEST):ge(r.DEPTH_TEST)},setMask:function(Y){k===Y||T||(r.depthMask(Y),k=Y)},setFunc:function(Y){if(I&&(Y=kp[Y]),B!==Y){switch(Y){case za:r.depthFunc(r.NEVER);break;case Ga:r.depthFunc(r.ALWAYS);break;case ka:r.depthFunc(r.LESS);break;case Ss:r.depthFunc(r.LEQUAL);break;case Va:r.depthFunc(r.EQUAL);break;case Ha:r.depthFunc(r.GEQUAL);break;case Wa:r.depthFunc(r.GREATER);break;case Xa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}B=Y}},setLocked:function(Y){T=Y},setClear:function(Y){ae!==Y&&(I&&(Y=1-Y),r.clearDepth(Y),ae=Y)},reset:function(){T=!1,k=null,B=null,ae=null,I=!1}}},i=new function(){let T=!1,I=null,k=null,B=null,ae=null,Y=null,K=null,Me=null,Ie=null;return{setTest:function(ye){T||(ye?xe(r.STENCIL_TEST):ge(r.STENCIL_TEST))},setMask:function(ye){I===ye||T||(r.stencilMask(ye),I=ye)},setFunc:function(ye,Ce,Ve){k===ye&&B===Ce&&ae===Ve||(r.stencilFunc(ye,Ce,Ve),k=ye,B=Ce,ae=Ve)},setOp:function(ye,Ce,Ve){Y===ye&&K===Ce&&Me===Ve||(r.stencilOp(ye,Ce,Ve),Y=ye,K=Ce,Me=Ve)},setLocked:function(ye){T=ye},setClear:function(ye){Ie!==ye&&(r.clearStencil(ye),Ie=ye)},reset:function(){T=!1,I=null,k=null,B=null,ae=null,Y=null,K=null,Me=null,Ie=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,v=null,f=null,g=null,_=null,y=null,x=new Ke(0,0,0),M=0,w=!1,L=null,z=null,D=null,P=null,U=null,N=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,V=0,te=r.getParameter(r.VERSION);te.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(te)[1]),j=V>=1):te.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),j=V>=2);let ie=null,pe={},le=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),ee=new bt().fromArray(le),ce=new bt().fromArray(_e);function Re(T,I,k,B){let ae=new Uint8Array(4),Y=r.createTexture();r.bindTexture(T,Y),r.texParameteri(T,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(T,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let K=0;K<k;K++)T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY?r.texImage3D(I,0,r.RGBA,1,1,B,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(I+K,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return Y}let he={};function xe(T){o[T]!==!0&&(r.enable(T),o[T]=!0)}function ge(T){o[T]!==!1&&(r.disable(T),o[T]=!1)}he[r.TEXTURE_2D]=Re(r.TEXTURE_2D,r.TEXTURE_2D,1),he[r.TEXTURE_CUBE_MAP]=Re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[r.TEXTURE_2D_ARRAY]=Re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),he[r.TEXTURE_3D]=Re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),xe(r.DEPTH_TEST),n.setFunc(Ss),E(!1),W($o),xe(r.CULL_FACE),A(Di);let Z={[Ir]:r.FUNC_ADD,[Kc]:r.FUNC_SUBTRACT,[$c]:r.FUNC_REVERSE_SUBTRACT};Z[Qc]=r.MIN,Z[eh]=r.MAX;let be={[th]:r.ZERO,[nh]:r.ONE,[ih]:r.SRC_COLOR,[sh]:r.SRC_ALPHA,[uh]:r.SRC_ALPHA_SATURATE,[ch]:r.DST_COLOR,[oh]:r.DST_ALPHA,[rh]:r.ONE_MINUS_SRC_COLOR,[ah]:r.ONE_MINUS_SRC_ALPHA,[hh]:r.ONE_MINUS_DST_COLOR,[lh]:r.ONE_MINUS_DST_ALPHA,[dh]:r.CONSTANT_COLOR,[ph]:r.ONE_MINUS_CONSTANT_COLOR,[mh]:r.CONSTANT_ALPHA,[fh]:r.ONE_MINUS_CONSTANT_ALPHA};function A(T,I,k,B,ae,Y,K,Me,Ie,ye){if(T!==Di){if(d===!1&&(xe(r.BLEND),d=!0),T===Jc)ae=ae||I,Y=Y||k,K=K||B,I===p&&ae===g||(r.blendEquationSeparate(Z[I],Z[ae]),p=I,g=ae),k===v&&B===f&&Y===_&&K===y||(r.blendFuncSeparate(be[k],be[B],be[Y],be[K]),v=k,f=B,_=Y,y=K),Me.equals(x)!==!1&&Ie===M||(r.blendColor(Me.r,Me.g,Me.b,Ie),x.copy(Me),M=Ie),m=T,w=!1;else if(T!==m||ye!==w){if(p===Ir&&g===Ir||(r.blendEquation(r.FUNC_ADD),p=Ir,g=Ir),ye)switch(T){case Ms:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case el:r.blendFunc(r.ONE,r.ONE);break;case tl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",T)}else switch(T){case Ms:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case el:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case tl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",T)}v=null,f=null,_=null,y=null,x.set(0,0,0),M=0,m=T,w=ye}}else d===!0&&(ge(r.BLEND),d=!1)}function E(T){L!==T&&(T?r.frontFace(r.CW):r.frontFace(r.CCW),L=T)}function W(T){T!==Yc?(xe(r.CULL_FACE),T!==z&&(T===$o?r.cullFace(r.BACK):T===Zc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ge(r.CULL_FACE),z=T}function G(T,I,k){T?(xe(r.POLYGON_OFFSET_FILL),P===I&&U===k||(r.polygonOffset(I,k),P=I,U=k)):ge(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:xe,disable:ge,bindFramebuffer:function(T,I){return c[T]!==I&&(r.bindFramebuffer(T,I),c[T]=I,T===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=I),T===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=I),!0)},drawBuffers:function(T,I){let k=h,B=!1;if(T){k=l.get(I),k===void 0&&(k=[],l.set(I,k));let ae=T.textures;if(k.length!==ae.length||k[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,K=ae.length;Y<K;Y++)k[Y]=r.COLOR_ATTACHMENT0+Y;k.length=ae.length,B=!0}}else k[0]!==r.BACK&&(k[0]=r.BACK,B=!0);B&&r.drawBuffers(k)},useProgram:function(T){return u!==T&&(r.useProgram(T),u=T,!0)},setBlending:A,setMaterial:function(T,I){T.side===Nt?ge(r.CULL_FACE):xe(r.CULL_FACE);let k=T.side===Un;I&&(k=!k),E(k),T.blending===Ms&&T.transparent===!1?A(Di):A(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),n.setFunc(T.depthFunc),n.setTest(T.depthTest),n.setMask(T.depthWrite),t.setMask(T.colorWrite);let B=T.stencilWrite;i.setTest(B),B&&(i.setMask(T.stencilWriteMask),i.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),i.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),G(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?xe(r.SAMPLE_ALPHA_TO_COVERAGE):ge(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:W,setLineWidth:function(T){T!==D&&(j&&r.lineWidth(T),D=T)},setPolygonOffset:G,setScissorTest:function(T){T?xe(r.SCISSOR_TEST):ge(r.SCISSOR_TEST)},activeTexture:function(T){T===void 0&&(T=r.TEXTURE0+N-1),ie!==T&&(r.activeTexture(T),ie=T)},bindTexture:function(T,I,k){k===void 0&&(k=ie===null?r.TEXTURE0+N-1:ie);let B=pe[k];B===void 0&&(B={type:void 0,texture:void 0},pe[k]=B),B.type===T&&B.texture===I||(ie!==k&&(r.activeTexture(k),ie=k),r.bindTexture(T,I||he[T]),B.type=T,B.texture=I)},unbindTexture:function(){let T=pe[ie];T!==void 0&&T.type!==void 0&&(r.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},updateUBOMapping:function(T,I){let k=a.get(I);k===void 0&&(k=new WeakMap,a.set(I,k));let B=k.get(T);B===void 0&&(B=r.getUniformBlockIndex(I,T.name),k.set(T,B))},uniformBlockBinding:function(T,I){let k=a.get(I).get(T);s.get(I)!==k&&(r.uniformBlockBinding(I,k,T.__bindingPointIndex),s.set(I,k))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},scissor:function(T){ee.equals(T)===!1&&(r.scissor(T.x,T.y,T.z,T.w),ee.copy(T))},viewport:function(T){ce.equals(T)===!1&&(r.viewport(T.x,T.y,T.z,T.w),ce.copy(T))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ie=null,pe={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,v=null,f=null,g=null,_=null,y=null,x=new Ke(0,0,0),M=0,w=!1,L=null,z=null,D=null,P=null,U=null,ee.set(0,0,r.canvas.width,r.canvas.height),ce.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function Hp(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,E){return m?new OffscreenCanvas(A,E):Qr("canvas")}function v(A,E,W){let G=1,T=be(A);if((T.width>W||T.height>W)&&(G=W/Math.max(T.width,T.height)),G<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let I=Math.floor(G*T.width),k=Math.floor(G*T.height);u===void 0&&(u=p(I,k));let B=E?p(I,k):u;return B.width=I,B.height=k,B.getContext("2d").drawImage(A,0,0,I,k),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+I+"x"+k+")."),B}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),A}return A}function f(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(A,E,W,G,T=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let I=E;if(E===r.RED&&(W===r.FLOAT&&(I=r.R32F),W===r.HALF_FLOAT&&(I=r.R16F),W===r.UNSIGNED_BYTE&&(I=r.R8)),E===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(I=r.R8UI),W===r.UNSIGNED_SHORT&&(I=r.R16UI),W===r.UNSIGNED_INT&&(I=r.R32UI),W===r.BYTE&&(I=r.R8I),W===r.SHORT&&(I=r.R16I),W===r.INT&&(I=r.R32I)),E===r.RG&&(W===r.FLOAT&&(I=r.RG32F),W===r.HALF_FLOAT&&(I=r.RG16F),W===r.UNSIGNED_BYTE&&(I=r.RG8)),E===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(I=r.RG8UI),W===r.UNSIGNED_SHORT&&(I=r.RG16UI),W===r.UNSIGNED_INT&&(I=r.RG32UI),W===r.BYTE&&(I=r.RG8I),W===r.SHORT&&(I=r.RG16I),W===r.INT&&(I=r.RG32I)),E===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(I=r.RGB8UI),W===r.UNSIGNED_SHORT&&(I=r.RGB16UI),W===r.UNSIGNED_INT&&(I=r.RGB32UI),W===r.BYTE&&(I=r.RGB8I),W===r.SHORT&&(I=r.RGB16I),W===r.INT&&(I=r.RGB32I)),E===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(I=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(I=r.RGBA16UI),W===r.UNSIGNED_INT&&(I=r.RGBA32UI),W===r.BYTE&&(I=r.RGBA8I),W===r.SHORT&&(I=r.RGBA16I),W===r.INT&&(I=r.RGBA32I)),E===r.RGB&&(W===r.UNSIGNED_INT_5_9_9_9_REV&&(I=r.RGB9_E5),W===r.UNSIGNED_INT_10F_11F_11F_REV&&(I=r.R11F_G11F_B10F)),E===r.RGBA){let k=T?Kr:_t.getTransfer(G);W===r.FLOAT&&(I=r.RGBA32F),W===r.HALF_FLOAT&&(I=r.RGBA16F),W===r.UNSIGNED_BYTE&&(I=k===Rt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(I=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(I=r.RGB5_A1)}return I!==r.R16F&&I!==r.R32F&&I!==r.RG16F&&I!==r.RG32F&&I!==r.RGBA16F&&I!==r.RGBA32F||e.get("EXT_color_buffer_float"),I}function x(A,E){let W;return A?E===null||E===Zi||E===Ur?W=r.DEPTH24_STENCIL8:E===kn?W=r.DEPTH32F_STENCIL8:E===Dr&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Zi||E===Ur?W=r.DEPTH_COMPONENT24:E===kn?W=r.DEPTH_COMPONENT32F:E===Dr&&(W=r.DEPTH_COMPONENT16),W}function M(A,E){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==ti&&A.minFilter!==ni?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function w(A){let E=A.target;E.removeEventListener("dispose",w),(function(W){let G=n.get(W);if(G.__webglInit===void 0)return;let T=W.source,I=d.get(T);if(I){let k=I[G.__cacheKey];k.usedTimes--,k.usedTimes===0&&z(W),Object.keys(I).length===0&&d.delete(T)}n.remove(W)})(E),E.isVideoTexture&&h.delete(E)}function L(A){let E=A.target;E.removeEventListener("dispose",L),(function(W){let G=n.get(W);if(W.depthTexture&&(W.depthTexture.dispose(),n.remove(W.depthTexture)),W.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(G.__webglFramebuffer[I]))for(let k=0;k<G.__webglFramebuffer[I].length;k++)r.deleteFramebuffer(G.__webglFramebuffer[I][k]);else r.deleteFramebuffer(G.__webglFramebuffer[I]);G.__webglDepthbuffer&&r.deleteRenderbuffer(G.__webglDepthbuffer[I])}else{if(Array.isArray(G.__webglFramebuffer))for(let I=0;I<G.__webglFramebuffer.length;I++)r.deleteFramebuffer(G.__webglFramebuffer[I]);else r.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&r.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&r.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let I=0;I<G.__webglColorRenderbuffer.length;I++)G.__webglColorRenderbuffer[I]&&r.deleteRenderbuffer(G.__webglColorRenderbuffer[I]);G.__webglDepthRenderbuffer&&r.deleteRenderbuffer(G.__webglDepthRenderbuffer)}let T=W.textures;for(let I=0,k=T.length;I<k;I++){let B=n.get(T[I]);B.__webglTexture&&(r.deleteTexture(B.__webglTexture),a.memory.textures--),n.remove(T[I])}n.remove(W)})(E)}function z(A){let E=n.get(A);r.deleteTexture(E.__webglTexture);let W=A.source;delete d.get(W)[E.__cacheKey],a.memory.textures--}let D=0;function P(A,E){let W=n.get(A);if(A.isVideoTexture&&(function(G){let T=a.render.frame;h.get(G)!==T&&(h.set(G,T),G.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){let G=A.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(G.complete!==!1)return void pe(W,A,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+E)}let U={[Zn]:r.REPEAT,[vr]:r.CLAMP_TO_EDGE,[ra]:r.MIRRORED_REPEAT},N={[ti]:r.NEAREST,[Eh]:r.NEAREST_MIPMAP_NEAREST,[bs]:r.NEAREST_MIPMAP_LINEAR,[ni]:r.LINEAR,[Ya]:r.LINEAR_MIPMAP_NEAREST,[Yi]:r.LINEAR_MIPMAP_LINEAR},j={[Lh]:r.NEVER,[Bh]:r.ALWAYS,[Dh]:r.LESS,[Bl]:r.LEQUAL,[Uh]:r.EQUAL,[Oh]:r.GEQUAL,[Nh]:r.GREATER,[Fh]:r.NOTEQUAL};function V(A,E){if(E.type!==kn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==ni&&E.magFilter!==Ya&&E.magFilter!==bs&&E.magFilter!==Yi&&E.minFilter!==ni&&E.minFilter!==Ya&&E.minFilter!==bs&&E.minFilter!==Yi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,U[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,U[E.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,U[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,N[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,N[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,j[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ti||E.minFilter!==bs&&E.minFilter!==Yi||E.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function te(A,E){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",w));let G=E.source,T=d.get(G);T===void 0&&(T={},d.set(G,T));let I=(function(k){let B=[];return B.push(k.wrapS),B.push(k.wrapT),B.push(k.wrapR||0),B.push(k.magFilter),B.push(k.minFilter),B.push(k.anisotropy),B.push(k.internalFormat),B.push(k.format),B.push(k.type),B.push(k.generateMipmaps),B.push(k.premultiplyAlpha),B.push(k.flipY),B.push(k.unpackAlignment),B.push(k.colorSpace),B.join()})(E);if(I!==A.__cacheKey){T[I]===void 0&&(T[I]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),T[I].usedTimes++;let k=T[A.__cacheKey];k!==void 0&&(T[A.__cacheKey].usedTimes--,k.usedTimes===0&&z(E)),A.__cacheKey=I,A.__webglTexture=T[I].texture}return W}function ie(A,E,W){return Math.floor(Math.floor(A/W)/E)}function pe(A,E,W){let G=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(G=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(G=r.TEXTURE_3D);let T=te(A,E),I=E.source;t.bindTexture(G,A.__webglTexture,r.TEXTURE0+W);let k=n.get(I);if(I.version!==k.__version||T===!0){t.activeTexture(r.TEXTURE0+W);let B=_t.getPrimaries(_t.workingColorSpace),ae=E.colorSpace===Ji?null:_t.getPrimaries(E.colorSpace),Y=E.colorSpace===Ji||B===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let K=v(E.image,!1,i.maxTextureSize);K=Z(E,K);let Me=s.convert(E.format,E.colorSpace),Ie=s.convert(E.type),ye,Ce=y(E.internalFormat,Me,Ie,E.colorSpace,E.isVideoTexture);V(G,E);let Ve=E.mipmaps,de=E.isVideoTexture!==!0,De=k.__version===void 0||T===!0,Oe=I.dataReady,je=M(E,K);if(E.isDepthTexture)Ce=x(E.format===Es,E.type),De&&(de?t.texStorage2D(r.TEXTURE_2D,1,Ce,K.width,K.height):t.texImage2D(r.TEXTURE_2D,0,Ce,K.width,K.height,0,Me,Ie,null));else if(E.isDataTexture)if(Ve.length>0){de&&De&&t.texStorage2D(r.TEXTURE_2D,je,Ce,Ve[0].width,Ve[0].height);for(let Te=0,Ee=Ve.length;Te<Ee;Te++)ye=Ve[Te],de?Oe&&t.texSubImage2D(r.TEXTURE_2D,Te,0,0,ye.width,ye.height,Me,Ie,ye.data):t.texImage2D(r.TEXTURE_2D,Te,Ce,ye.width,ye.height,0,Me,Ie,ye.data);E.generateMipmaps=!1}else de?(De&&t.texStorage2D(r.TEXTURE_2D,je,Ce,K.width,K.height),Oe&&(function(Te,Ee,ke,It){let Ge=Te.updateRanges;if(Ge.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee.width,Ee.height,ke,It,Ee.data);else{Ge.sort((H,Ft)=>H.start-Ft.start);let mt=0;for(let H=1;H<Ge.length;H++){let Ft=Ge[mt],gt=Ge[H],lt=Ft.start+Ft.count,Wn=ie(gt.start,Ee.width,4),St=ie(Ft.start,Ee.width,4);gt.start<=lt+1&&Wn===St&&ie(gt.start+gt.count-1,Ee.width,4)===Wn?Ft.count=Math.max(Ft.count,gt.start+gt.count-Ft.start):(++mt,Ge[mt]=gt)}Ge.length=mt+1;let rt=r.getParameter(r.UNPACK_ROW_LENGTH),nn=r.getParameter(r.UNPACK_SKIP_PIXELS),on=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Ee.width);for(let H=0,Ft=Ge.length;H<Ft;H++){let gt=Ge[H],lt=Math.floor(gt.start/4),Wn=Math.ceil(gt.count/4),St=lt%Ee.width,Xt=Math.floor(lt/Ee.width),nt=Wn;r.pixelStorei(r.UNPACK_SKIP_PIXELS,St),r.pixelStorei(r.UNPACK_SKIP_ROWS,Xt),t.texSubImage2D(r.TEXTURE_2D,0,St,Xt,nt,1,ke,It,Ee.data)}Te.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,rt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,nn),r.pixelStorei(r.UNPACK_SKIP_ROWS,on)}})(E,K,Me,Ie)):t.texImage2D(r.TEXTURE_2D,0,Ce,K.width,K.height,0,Me,Ie,K.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){de&&De&&t.texStorage3D(r.TEXTURE_2D_ARRAY,je,Ce,Ve[0].width,Ve[0].height,K.depth);for(let Te=0,Ee=Ve.length;Te<Ee;Te++)if(ye=Ve[Te],E.format!==Vn)if(Me!==null)if(de){if(Oe)if(E.layerUpdates.size>0){let ke=Wl(ye.width,ye.height,E.format,E.type);for(let It of E.layerUpdates){let Ge=ye.data.subarray(It*ke/ye.data.BYTES_PER_ELEMENT,(It+1)*ke/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,It,ye.width,ye.height,1,Me,Ge)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,0,ye.width,ye.height,K.depth,Me,ye.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Te,Ce,ye.width,ye.height,K.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else de?Oe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,0,ye.width,ye.height,K.depth,Me,Ie,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Te,Ce,ye.width,ye.height,K.depth,0,Me,Ie,ye.data)}else{de&&De&&t.texStorage2D(r.TEXTURE_2D,je,Ce,Ve[0].width,Ve[0].height);for(let Te=0,Ee=Ve.length;Te<Ee;Te++)ye=Ve[Te],E.format!==Vn?Me!==null?de?Oe&&t.compressedTexSubImage2D(r.TEXTURE_2D,Te,0,0,ye.width,ye.height,Me,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,Te,Ce,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):de?Oe&&t.texSubImage2D(r.TEXTURE_2D,Te,0,0,ye.width,ye.height,Me,Ie,ye.data):t.texImage2D(r.TEXTURE_2D,Te,Ce,ye.width,ye.height,0,Me,Ie,ye.data)}else if(E.isDataArrayTexture)if(de){if(De&&t.texStorage3D(r.TEXTURE_2D_ARRAY,je,Ce,K.width,K.height,K.depth),Oe)if(E.layerUpdates.size>0){let Te=Wl(K.width,K.height,E.format,E.type);for(let Ee of E.layerUpdates){let ke=K.data.subarray(Ee*Te/K.data.BYTES_PER_ELEMENT,(Ee+1)*Te/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ee,K.width,K.height,1,Me,Ie,ke)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Me,Ie,K.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,K.width,K.height,K.depth,0,Me,Ie,K.data);else if(E.isData3DTexture)de?(De&&t.texStorage3D(r.TEXTURE_3D,je,Ce,K.width,K.height,K.depth),Oe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Me,Ie,K.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,K.width,K.height,K.depth,0,Me,Ie,K.data);else if(E.isFramebufferTexture){if(De)if(de)t.texStorage2D(r.TEXTURE_2D,je,Ce,K.width,K.height);else{let Te=K.width,Ee=K.height;for(let ke=0;ke<je;ke++)t.texImage2D(r.TEXTURE_2D,ke,Ce,Te,Ee,0,Me,Ie,null),Te>>=1,Ee>>=1}}else if(Ve.length>0){if(de&&De){let Te=be(Ve[0]);t.texStorage2D(r.TEXTURE_2D,je,Ce,Te.width,Te.height)}for(let Te=0,Ee=Ve.length;Te<Ee;Te++)ye=Ve[Te],de?Oe&&t.texSubImage2D(r.TEXTURE_2D,Te,0,0,Me,Ie,ye):t.texImage2D(r.TEXTURE_2D,Te,Ce,Me,Ie,ye);E.generateMipmaps=!1}else if(de){if(De){let Te=be(K);t.texStorage2D(r.TEXTURE_2D,je,Ce,Te.width,Te.height)}Oe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Me,Ie,K)}else t.texImage2D(r.TEXTURE_2D,0,Ce,Me,Ie,K);f(E)&&g(G),k.__version=I.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function le(A,E,W,G,T,I){let k=s.convert(W.format,W.colorSpace),B=s.convert(W.type),ae=y(W.internalFormat,k,B,W.colorSpace),Y=n.get(E),K=n.get(W);if(K.__renderTarget=E,!Y.__hasExternalTextures){let Me=Math.max(1,E.width>>I),Ie=Math.max(1,E.height>>I);T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY?t.texImage3D(T,I,ae,Me,Ie,E.depth,0,k,B,null):t.texImage2D(T,I,ae,Me,Ie,0,k,B,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),ge(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,G,T,K.__webglTexture,0,xe(E)):(T===r.TEXTURE_2D||T>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,G,T,K.__webglTexture,I),t.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(A,E,W){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){let G=E.depthTexture,T=G&&G.isDepthTexture?G.type:null,I=x(E.stencilBuffer,T),k=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,B=xe(E);ge(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,B,I,E.width,E.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,B,I,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,I,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,k,r.RENDERBUFFER,A)}else{let G=E.textures;for(let T=0;T<G.length;T++){let I=G[T],k=s.convert(I.format,I.colorSpace),B=s.convert(I.type),ae=y(I.internalFormat,k,B,I.colorSpace),Y=xe(E);W&&ge(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,ae,E.width,E.height):ge(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Y,ae,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ae,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ee(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(E.depthTexture);W.__renderTarget=E,W.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),P(E.depthTexture,0);let G=W.__webglTexture,T=xe(E);if(E.depthTexture.format===ws)ge(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,G,0,T):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,G,0);else{if(E.depthTexture.format!==Es)throw new Error("Unknown depthTexture format");ge(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,G,0,T):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,G,0)}}function ce(A){let E=n.get(A),W=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let G=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),G){let T=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,G.removeEventListener("dispose",T)};G.addEventListener("dispose",T),E.__depthDisposeCallback=T}E.__boundDepthTexture=G}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");let G=A.texture.mipmaps;G&&G.length>0?ee(E.__webglFramebuffer[0],A):ee(E.__webglFramebuffer,A)}else if(W){E.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[G]),E.__webglDepthbuffer[G]===void 0)E.__webglDepthbuffer[G]=r.createRenderbuffer(),_e(E.__webglDepthbuffer[G],A,!1);else{let T=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,I=E.__webglDepthbuffer[G];r.bindRenderbuffer(r.RENDERBUFFER,I),r.framebufferRenderbuffer(r.FRAMEBUFFER,T,r.RENDERBUFFER,I)}}else{let G=A.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),_e(E.__webglDepthbuffer,A,!1);else{let T=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,I=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,I),r.framebufferRenderbuffer(r.FRAMEBUFFER,T,r.RENDERBUFFER,I)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Re=[],he=[];function xe(A){return Math.min(i.maxSamples,A.samples)}function ge(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Z(A,E){let W=A.colorSpace,G=A.format,T=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==ki&&W!==Ji&&(_t.getTransfer(W)===Rt?G===Vn&&T===si||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),E}function be(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A},this.resetTextureUnits=function(){D=0},this.setTexture2D=P,this.setTexture2DArray=function(A,E){let W=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version?pe(W,A,E):t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+E)},this.setTexture3D=function(A,E){let W=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version?pe(W,A,E):t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+E)},this.setTextureCube=function(A,E){let W=n.get(A);A.version>0&&W.__version!==A.version?(function(G,T,I){if(T.image.length!==6)return;let k=te(G,T),B=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+I);let ae=n.get(B);if(B.version!==ae.__version||k===!0){t.activeTexture(r.TEXTURE0+I);let Y=_t.getPrimaries(_t.workingColorSpace),K=T.colorSpace===Ji?null:_t.getPrimaries(T.colorSpace),Me=T.colorSpace===Ji||Y===K?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let Ie=T.isCompressedTexture||T.image[0].isCompressedTexture,ye=T.image[0]&&T.image[0].isDataTexture,Ce=[];for(let Ge=0;Ge<6;Ge++)Ce[Ge]=Ie||ye?ye?T.image[Ge].image:T.image[Ge]:v(T.image[Ge],!0,i.maxCubemapSize),Ce[Ge]=Z(T,Ce[Ge]);let Ve=Ce[0],de=s.convert(T.format,T.colorSpace),De=s.convert(T.type),Oe=y(T.internalFormat,de,De,T.colorSpace),je=T.isVideoTexture!==!0,Te=ae.__version===void 0||k===!0,Ee=B.dataReady,ke,It=M(T,Ve);if(V(r.TEXTURE_CUBE_MAP,T),Ie){je&&Te&&t.texStorage2D(r.TEXTURE_CUBE_MAP,It,Oe,Ve.width,Ve.height);for(let Ge=0;Ge<6;Ge++){ke=Ce[Ge].mipmaps;for(let mt=0;mt<ke.length;mt++){let rt=ke[mt];T.format!==Vn?de!==null?je?Ee&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt,0,0,rt.width,rt.height,de,rt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt,Oe,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?Ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt,0,0,rt.width,rt.height,de,De,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt,Oe,rt.width,rt.height,0,de,De,rt.data)}}}else{if(ke=T.mipmaps,je&&Te){ke.length>0&&It++;let Ge=be(Ce[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,It,Oe,Ge.width,Ge.height)}for(let Ge=0;Ge<6;Ge++)if(ye){je?Ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,0,0,0,Ce[Ge].width,Ce[Ge].height,de,De,Ce[Ge].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,0,Oe,Ce[Ge].width,Ce[Ge].height,0,de,De,Ce[Ge].data);for(let mt=0;mt<ke.length;mt++){let rt=ke[mt].image[Ge].image;je?Ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt+1,0,0,rt.width,rt.height,de,De,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt+1,Oe,rt.width,rt.height,0,de,De,rt.data)}}else{je?Ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,0,0,0,de,De,Ce[Ge]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,0,Oe,de,De,Ce[Ge]);for(let mt=0;mt<ke.length;mt++){let rt=ke[mt];je?Ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt+1,0,0,de,De,rt.image[Ge]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ge,mt+1,Oe,de,De,rt.image[Ge])}}}f(T)&&g(r.TEXTURE_CUBE_MAP),ae.__version=B.version,T.onUpdate&&T.onUpdate(T)}G.__version=T.version})(W,A,E):t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+E)},this.rebindTextures=function(A,E,W){let G=n.get(A);E!==void 0&&le(G.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&ce(A)},this.setupRenderTarget=function(A){let E=A.texture,W=n.get(A),G=n.get(E);A.addEventListener("dispose",L);let T=A.textures,I=A.isWebGLCubeRenderTarget===!0,k=T.length>1;if(k||(G.__webglTexture===void 0&&(G.__webglTexture=r.createTexture()),G.__version=E.version,a.memory.textures++),I){W.__webglFramebuffer=[];for(let B=0;B<6;B++)if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer[B]=[];for(let ae=0;ae<E.mipmaps.length;ae++)W.__webglFramebuffer[B][ae]=r.createFramebuffer()}else W.__webglFramebuffer[B]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer=[];for(let B=0;B<E.mipmaps.length;B++)W.__webglFramebuffer[B]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(k)for(let B=0,ae=T.length;B<ae;B++){let Y=n.get(T[B]);Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&ge(A)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let B=0;B<T.length;B++){let ae=T[B];W.__webglColorRenderbuffer[B]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[B]);let Y=s.convert(ae.format,ae.colorSpace),K=s.convert(ae.type),Me=y(ae.internalFormat,Y,K,ae.colorSpace,A.isXRRenderTarget===!0),Ie=xe(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,Me,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+B,r.RENDERBUFFER,W.__webglColorRenderbuffer[B])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),_e(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(I){t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture),V(r.TEXTURE_CUBE_MAP,E);for(let B=0;B<6;B++)if(E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)le(W.__webglFramebuffer[B][ae],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+B,ae);else le(W.__webglFramebuffer[B],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+B,0);f(E)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(k){for(let B=0,ae=T.length;B<ae;B++){let Y=T[B],K=n.get(Y),Me=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Me=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Me,K.__webglTexture),V(Me,Y),le(W.__webglFramebuffer,A,Y,r.COLOR_ATTACHMENT0+B,Me,0),f(Y)&&g(Me)}t.unbindTexture()}else{let B=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(B=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(B,G.__webglTexture),V(B,E),E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)le(W.__webglFramebuffer[ae],A,E,r.COLOR_ATTACHMENT0,B,ae);else le(W.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,B,0);f(E)&&g(B),t.unbindTexture()}A.depthBuffer&&ce(A)},this.updateRenderTargetMipmap=function(A){let E=A.textures;for(let W=0,G=E.length;W<G;W++){let T=E[W];if(f(T)){let I=_(A),k=n.get(T).__webglTexture;t.bindTexture(I,k),g(I),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(ge(A)===!1){let E=A.textures,W=A.width,G=A.height,T=r.COLOR_BUFFER_BIT,I=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=n.get(A),B=E.length>1;if(B)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,k.__webglMultisampledFramebuffer);let ae=A.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(T|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(T|=r.STENCIL_BUFFER_BIT)),B){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,k.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,W,G,0,0,W,G,T,r.NEAREST),c===!0&&(Re.length=0,he.length=0,Re.push(r.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Re.push(I),he.push(I),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,he)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Re))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),B)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,k.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,K,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ge}function Wp(r,e){return{convert:function(t,n=Ji){let i,s=_t.getTransfer(n);if(t===si)return r.UNSIGNED_BYTE;if(t===Ja)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Ka)return r.UNSIGNED_SHORT_5_5_5_1;if(t===al)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===ol)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===rl)return r.BYTE;if(t===sl)return r.SHORT;if(t===Dr)return r.UNSIGNED_SHORT;if(t===Za)return r.INT;if(t===Zi)return r.UNSIGNED_INT;if(t===kn)return r.FLOAT;if(t===Ui)return r.HALF_FLOAT;if(t===Ah)return r.ALPHA;if(t===Ch)return r.RGB;if(t===Vn)return r.RGBA;if(t===ws)return r.DEPTH_COMPONENT;if(t===Es)return r.DEPTH_STENCIL;if(t===$a)return r.RED;if(t===Qa)return r.RED_INTEGER;if(t===Rh)return r.RG;if(t===ll)return r.RG_INTEGER;if(t===cl)return r.RGBA_INTEGER;if(t===eo||t===to||t===no||t===io)if(s===Rt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===eo)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===to)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===no)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===io)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===eo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===to)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===no)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===io)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===hl||t===ul||t===dl||t===pl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===hl)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===ul)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===dl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===pl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===ml||t===fl||t===gl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===ml||t===fl)return s===Rt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===gl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===vl||t===_l||t===yl||t===xl||t===Ml||t===Sl||t===Tl||t===bl||t===wl||t===El||t===Al||t===Cl||t===Rl||t===Pl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===vl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===_l)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===yl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===xl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Ml)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Sl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Tl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===bl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===wl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===El)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Al)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Cl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Rl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Pl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Il||t===Ll||t===Dl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Il)return s===Rt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ll)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Dl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Ul||t===Nl||t===Fl||t===Ol){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Ul)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Nl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Fl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Ol)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ur?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var ic=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new hs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new un({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new it(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rc=class extends vi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,v=typeof XRWebGLBinding<"u",f=new ic,g={},_=t.getContextAttributes(),y=null,x=null,M=[],w=[],L=new ue,z=null,D=new Vt;D.viewport=new bt;let P=new Vt;P.viewport=new bt;let U=[D,P],N=new Oa,j=null,V=null;function te(he){let xe=w.indexOf(he.inputSource);if(xe===-1)return;let ge=M[xe];ge!==void 0&&(ge.update(he.inputSource,he.frame,l||a),ge.dispatchEvent({type:he.type,data:he.inputSource}))}function ie(){i.removeEventListener("select",te),i.removeEventListener("selectstart",te),i.removeEventListener("selectend",te),i.removeEventListener("squeeze",te),i.removeEventListener("squeezestart",te),i.removeEventListener("squeezeend",te),i.removeEventListener("end",ie),i.removeEventListener("inputsourceschange",pe);for(let he=0;he<M.length;he++){let xe=w[he];xe!==null&&(w[he]=null,M[he].disconnect(xe))}j=null,V=null,f.reset();for(let he in g)delete g[he];e.setRenderTarget(y),m=null,d=null,u=null,i=null,x=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(z),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}function pe(he){for(let xe=0;xe<he.removed.length;xe++){let ge=he.removed[xe],Z=w.indexOf(ge);Z>=0&&(w[Z]=null,M[Z].disconnect(ge))}for(let xe=0;xe<he.added.length;xe++){let ge=he.added[xe],Z=w.indexOf(ge);if(Z===-1){for(let A=0;A<M.length;A++){if(A>=w.length){w.push(ge),Z=A;break}if(w[A]===null){w[A]=ge,Z=A;break}}if(Z===-1)break}let be=M[Z];be&&be.connect(ge)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let xe=M[he];return xe===void 0&&(xe=new Mr,M[he]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(he){let xe=M[he];return xe===void 0&&(xe=new Mr,M[he]=xe),xe.getGripSpace()},this.getHand=function(he){let xe=M[he];return xe===void 0&&(xe=new Mr,M[he]=xe),xe.getHandSpace()},this.setFramebufferScaleFactor=function(he){s=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){o=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(he){if(i=he,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",te),i.addEventListener("selectstart",te),i.addEventListener("selectend",te),i.addEventListener("squeeze",te),i.addEventListener("squeezestart",te),i.addEventListener("squeezeend",te),i.addEventListener("end",ie),i.addEventListener("inputsourceschange",pe),_.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,ge=null,Z=null;_.depth&&(Z=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=_.stencil?Es:ws,ge=_.stencil?Ur:Zi);let be={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(be),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Bn(d.textureWidth,d.textureHeight,{format:Vn,type:si,depthTexture:new cs(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let xe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Bn(m.framebufferWidth,m.framebufferHeight,{format:Vn,type:si,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Re.setContext(i),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let le=new b,_e=new b;function ee(he,xe){xe===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(xe.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(i===null)return;let xe=he.near,ge=he.far;f.texture!==null&&(f.depthNear>0&&(xe=f.depthNear),f.depthFar>0&&(ge=f.depthFar)),N.near=P.near=D.near=xe,N.far=P.far=D.far=ge,j===N.near&&V===N.far||(i.updateRenderState({depthNear:N.near,depthFar:N.far}),j=N.near,V=N.far),N.layers.mask=6|he.layers.mask,D.layers.mask=3&N.layers.mask,P.layers.mask=5&N.layers.mask;let Z=he.parent,be=N.cameras;ee(N,Z);for(let A=0;A<be.length;A++)ee(be[A],Z);be.length===2?(function(A,E,W){le.setFromMatrixPosition(E.matrixWorld),_e.setFromMatrixPosition(W.matrixWorld);let G=le.distanceTo(_e),T=E.projectionMatrix.elements,I=W.projectionMatrix.elements,k=T[14]/(T[10]-1),B=T[14]/(T[10]+1),ae=(T[9]+1)/T[5],Y=(T[9]-1)/T[5],K=(T[8]-1)/T[0],Me=(I[8]+1)/I[0],Ie=k*K,ye=k*Me,Ce=G/(-K+Me),Ve=Ce*-K;if(E.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Ve),A.translateZ(Ce),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),T[10]===-1)A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let de=k+Ce,De=B+Ce,Oe=Ie-Ve,je=ye+(G-Ve),Te=ae*B/De*de,Ee=Y*B/De*de;A.projectionMatrix.makePerspective(Oe,je,Te,Ee,de,De),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(N,D,P):N.projectionMatrix.copy(D.projectionMatrix),(function(A,E,W){W===null?A.matrix.copy(E.matrixWorld):(A.matrix.copy(W.matrixWorld),A.matrix.invert(),A.matrix.multiply(E.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*aa*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(he,N,Z)},this.getCamera=function(){return N},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(he){c=he,d!==null&&(d.fixedFoveation=he),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=he)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(N)},this.getCameraTexture=function(he){return g[he]};let ce=null,Re=new gu;Re.setAnimationLoop(function(he,xe){if(h=xe.getViewerPose(l||a),p=xe,h!==null){let ge=h.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let Z=!1;ge.length!==N.cameras.length&&(N.cameras.length=0,Z=!0);for(let A=0;A<ge.length;A++){let E=ge[A],W=null;if(m!==null)W=m.getViewport(E);else{let T=u.getViewSubImage(d,E);W=T.viewport,A===0&&(e.setRenderTargetTextures(x,T.colorTexture,T.depthStencilTexture),e.setRenderTarget(x))}let G=U[A];G===void 0&&(G=new Vt,G.layers.enable(A),G.viewport=new bt,U[A]=G),G.matrix.fromArray(E.transform.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale),G.projectionMatrix.fromArray(E.projectionMatrix),G.projectionMatrixInverse.copy(G.projectionMatrix).invert(),G.viewport.set(W.x,W.y,W.width,W.height),A===0&&(N.matrix.copy(G.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Z===!0&&N.cameras.push(G)}let be=i.enabledFeatures;if(be&&be.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let A=u.getDepthInformation(ge[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(be&&be.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<ge.length;A++){let E=ge[A].camera;if(E){let W=g[E];W||(W=new hs,g[E]=W);let G=u.getCameraImage(E);W.sourceTexture=G}}}}for(let ge=0;ge<M.length;ge++){let Z=w[ge],be=M[ge];Z!==null&&be!==void 0&&be.update(Z,xe,l||a)}ce&&ce(he,xe),xe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:xe}),p=null}),this.setAnimationLoop=function(he){ce=he},this.dispose=function(){}}},er=new Jn,Xp=new Ze;function jp(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Un&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Un&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,er.copy(c),er.x*=-1,er.y*=-1,er.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(er.y*=-1,er.z*=-1),i.envMapRotation.value.setFromMatrix4(Xp.makeRotationFromEuler(er)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,kl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Un&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function qp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let v=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=p[f];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return p[f]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,_=0,y=16;for(let M=0,w=g.length;M<w;M++){let L=Array.isArray(g[M])?g[M]:[g[M]];for(let z=0,D=L.length;z<D;z++){let P=L[z],U=Array.isArray(P.value)?P.value:[P.value];for(let N=0,j=U.length;N<j;N++){let V=l(U[N]),te=_%y,ie=te%V.boundary,pe=te+ie;_+=ie,pe!==0&&y-pe<V.storage&&(_+=y-pe),P.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=V.storage}}}let x=_%y;x>0&&(_+=y-x),f.__size=_,f.__cache={}})(u),m=(function(f){let g=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let _=r.createBuffer(),y=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,y,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,_),_})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let v=e.render.frame;s[u.id]!==v&&((function(f){let g=i[f.id],_=f.uniforms,y=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,M=_.length;x<M;x++){let w=Array.isArray(_[x])?_[x]:[_[x]];for(let L=0,z=w.length;L<z;L++){let D=w[L];if(c(D,x,L,y)===!0){let P=D.__offset,U=Array.isArray(D.value)?D.value:[D.value],N=0;for(let j=0;j<U.length;j++){let V=U[j],te=l(V);typeof V=="number"||typeof V=="boolean"?(D.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,P+N,D.__data)):V.isMatrix3?(D.__data[0]=V.elements[0],D.__data[1]=V.elements[1],D.__data[2]=V.elements[2],D.__data[3]=0,D.__data[4]=V.elements[3],D.__data[5]=V.elements[4],D.__data[6]=V.elements[5],D.__data[7]=0,D.__data[8]=V.elements[6],D.__data[9]=V.elements[7],D.__data[10]=V.elements[8],D.__data[11]=0):(V.toArray(D.__data,N),N+=te.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,P,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Hn=class{constructor(e={}){let{canvas:t=zh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),v=new Int32Array(4),f=null,g=null,_=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=dt;let w=0,L=0,z=null,D=-1,P=null,U=new bt,N=new bt,j=null,V=new Ke(0),te=0,ie=t.width,pe=t.height,le=1,_e=null,ee=null,ce=new bt(0,0,ie,pe),Re=new bt(0,0,ie,pe),he=!1,xe=new Ii,ge=!1,Z=!1,be=new Ze,A=new b,E=new bt,W={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},G=!1;function T(){return z===null?le:1}let I,k,B,ae,Y,K,Me,Ie,ye,Ce,Ve,de,De,Oe,je,Te,Ee,ke,It,Ge,mt,rt,nn,on,H=n;function Ft(R,q){return t.getContext(R,q)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Wn,!1),t.addEventListener("webglcontextrestored",St,!1),t.addEventListener("webglcontextcreationerror",Xt,!1),H===null){let q="webgl2";if(H=Ft(q,R),H===null)throw Ft(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}function gt(){I=new Rd(H),I.init(),rt=new Wp(H,I),k=new bd(H,I,e,rt),B=new Vp(H,I),k.reversedDepthBuffer&&d&&B.buffers.depth.setReversed(!0),ae=new Ld(H),Y=new Lp,K=new Hp(H,I,B,Y,k,rt,ae),Me=new Ed(x),Ie=new Cd(x),ye=new yd(H),nn=new Sd(H,ye),Ce=new Pd(H,ye,ae,nn),Ve=new Ud(H,Ce,ye,ae),It=new Dd(H,k,K),Te=new wd(Y),de=new Ip(x,Me,Ie,I,k,nn,Te),De=new jp(x,Y),Oe=new Up,je=new zp(I),ke=new Md(x,Me,Ie,B,Ve,m,c),Ee=new Gp(x,Ve,k),on=new qp(H,ae,k,B),Ge=new Td(H,I,ae),mt=new Id(H,I,ae),ae.programs=de.programs,x.capabilities=k,x.extensions=I,x.properties=Y,x.renderLists=Oe,x.shadowMap=Ee,x.state=B,x.info=ae}gt();let lt=new rc(x,H);function Wn(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let R=ae.autoReset,q=Ee.enabled,J=Ee.autoUpdate,re=Ee.needsUpdate,ne=Ee.type;gt(),ae.autoReset=R,Ee.enabled=q,Ee.autoUpdate=J,Ee.needsUpdate=re,Ee.type=ne}function Xt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function nt(R){let q=R.target;q.removeEventListener("dispose",nt),(function(J){(function(re){let ne=Y.get(re).programs;ne!==void 0&&(ne.forEach(function(Se){de.releaseProgram(Se)}),re.isShaderMaterial&&de.releaseShaderCache(re))})(J),Y.remove(J)})(q)}function Zt(R,q,J){R.transparent===!0&&R.side===Nt&&R.forceSinglePass===!1?(R.side=Un,R.needsUpdate=!0,qt(R,q,J),R.side=Pr,R.needsUpdate=!0,qt(R,q,J),R.side=Nt):qt(R,q,J)}this.xr=lt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let R=I.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=I.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(R){R!==void 0&&(le=R,this.setSize(ie,pe,!1))},this.getSize=function(R){return R.set(ie,pe)},this.setSize=function(R,q,J=!0){lt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ie=R,pe=q,t.width=Math.floor(R*le),t.height=Math.floor(q*le),J===!0&&(t.style.width=R+"px",t.style.height=q+"px"),this.setViewport(0,0,R,q))},this.getDrawingBufferSize=function(R){return R.set(ie*le,pe*le).floor()},this.setDrawingBufferSize=function(R,q,J){ie=R,pe=q,le=J,t.width=Math.floor(R*J),t.height=Math.floor(q*J),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(U)},this.getViewport=function(R){return R.copy(ce)},this.setViewport=function(R,q,J,re){R.isVector4?ce.set(R.x,R.y,R.z,R.w):ce.set(R,q,J,re),B.viewport(U.copy(ce).multiplyScalar(le).round())},this.getScissor=function(R){return R.copy(Re)},this.setScissor=function(R,q,J,re){R.isVector4?Re.set(R.x,R.y,R.z,R.w):Re.set(R,q,J,re),B.scissor(N.copy(Re).multiplyScalar(le).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(R){B.setScissorTest(he=R)},this.setOpaqueSort=function(R){_e=R},this.setTransparentSort=function(R){ee=R},this.getClearColor=function(R){return R.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,J=!0){let re=0;if(R){let ne=!1;if(z!==null){let Se=z.texture.format;ne=Se===cl||Se===ll||Se===Qa}if(ne){let Se=z.texture.type,Ne=Se===si||Se===Zi||Se===Dr||Se===Ur||Se===Ja||Se===Ka,Be=ke.getClearColor(),qe=ke.getClearAlpha(),Je=Be.r,et=Be.g,$e=Be.b;Ne?(p[0]=Je,p[1]=et,p[2]=$e,p[3]=qe,H.clearBufferuiv(H.COLOR,0,p)):(v[0]=Je,v[1]=et,v[2]=$e,v[3]=qe,H.clearBufferiv(H.COLOR,0,v))}else re|=H.COLOR_BUFFER_BIT}q&&(re|=H.DEPTH_BUFFER_BIT),J&&(re|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Wn,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",Xt,!1),ke.dispose(),Oe.dispose(),je.dispose(),Y.dispose(),Me.dispose(),Ie.dispose(),Ve.dispose(),nn.dispose(),on.dispose(),de.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",jt),lt.removeEventListener("sessionend",$t),Bt.stop()},this.renderBufferDirect=function(R,q,J,re,ne,Se){q===null&&(q=W);let Ne=ne.isMesh&&ne.matrixWorld.determinant()<0,Be=(function(He,Lt,Qt,ct,tt){Lt.isScene!==!0&&(Lt=W),K.resetTextureUnits();let En=Lt.fog,nr=ct.isMeshStandardMaterial?Lt.environment:null,S=z===null?x.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:ki,C=(ct.isMeshStandardMaterial?Ie:Me).get(ct.envMap||nr),F=ct.vertexColors===!0&&!!Qt.attributes.color&&Qt.attributes.color.itemSize===4,$=!!Qt.attributes.tangent&&(!!ct.normalMap||ct.anisotropy>0),O=!!Qt.morphAttributes.position,oe=!!Qt.morphAttributes.normal,X=!!Qt.morphAttributes.color,se=Mi;ct.toneMapped&&(z!==null&&z.isXRRenderTarget!==!0||(se=x.toneMapping));let fe=Qt.morphAttributes.position||Qt.morphAttributes.normal||Qt.morphAttributes.color,Ye=fe!==void 0?fe.length:0,me=Y.get(ct),Le=g.state.lights;if(ge===!0&&(Z===!0||He!==P)){let kt=He===P&&ct.id===D;Te.setState(ct,He,kt)}let Q=!1;ct.version===me.__version?me.needsLights&&me.lightsStateVersion!==Le.state.version||me.outputColorSpace!==S||tt.isBatchedMesh&&me.batching===!1?Q=!0:tt.isBatchedMesh||me.batching!==!0?tt.isBatchedMesh&&me.batchingColor===!0&&tt.colorTexture===null||tt.isBatchedMesh&&me.batchingColor===!1&&tt.colorTexture!==null||tt.isInstancedMesh&&me.instancing===!1?Q=!0:tt.isInstancedMesh||me.instancing!==!0?tt.isSkinnedMesh&&me.skinning===!1?Q=!0:tt.isSkinnedMesh||me.skinning!==!0?tt.isInstancedMesh&&me.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&me.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&me.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&me.instancingMorph===!1&&tt.morphTexture!==null||me.envMap!==C||ct.fog===!0&&me.fog!==En?Q=!0:me.numClippingPlanes===void 0||me.numClippingPlanes===Te.numPlanes&&me.numIntersection===Te.numIntersection?(me.vertexAlphas!==F||me.vertexTangents!==$||me.morphTargets!==O||me.morphNormals!==oe||me.morphColors!==X||me.toneMapping!==se||me.morphTargetsCount!==Ye)&&(Q=!0):Q=!0:Q=!0:Q=!0:Q=!0:(Q=!0,me.__version=ct.version);let ve=me.currentProgram;Q===!0&&(ve=qt(ct,Lt,tt));let ze=!1,Ae=!1,we=!1,Fe=ve.getUniforms(),st=me.uniforms;if(B.useProgram(ve.program)&&(ze=!0,Ae=!0,we=!0),ct.id!==D&&(D=ct.id,Ae=!0),ze||P!==He){B.buffers.depth.getReversed()&&He.reversedDepth!==!0&&(He._reversedDepth=!0,He.updateProjectionMatrix()),Fe.setValue(H,"projectionMatrix",He.projectionMatrix),Fe.setValue(H,"viewMatrix",He.matrixWorldInverse);let kt=Fe.map.cameraPosition;kt!==void 0&&kt.setValue(H,A.setFromMatrixPosition(He.matrixWorld)),k.logarithmicDepthBuffer&&Fe.setValue(H,"logDepthBufFC",2/(Math.log(He.far+1)/Math.LN2)),(ct.isMeshPhongMaterial||ct.isMeshToonMaterial||ct.isMeshLambertMaterial||ct.isMeshBasicMaterial||ct.isMeshStandardMaterial||ct.isShaderMaterial)&&Fe.setValue(H,"isOrthographic",He.isOrthographicCamera===!0),P!==He&&(P=He,Ae=!0,we=!0)}if(tt.isSkinnedMesh){Fe.setOptional(H,tt,"bindMatrix"),Fe.setOptional(H,tt,"bindMatrixInverse");let kt=tt.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Fe.setValue(H,"boneTexture",kt.boneTexture,K))}tt.isBatchedMesh&&(Fe.setOptional(H,tt,"batchingTexture"),Fe.setValue(H,"batchingTexture",tt._matricesTexture,K),Fe.setOptional(H,tt,"batchingIdTexture"),Fe.setValue(H,"batchingIdTexture",tt._indirectTexture,K),Fe.setOptional(H,tt,"batchingColorTexture"),tt._colorsTexture!==null&&Fe.setValue(H,"batchingColorTexture",tt._colorsTexture,K));let ln=Qt.morphAttributes;ln.position===void 0&&ln.normal===void 0&&ln.color===void 0||It.update(tt,Qt,ve),(Ae||me.receiveShadow!==tt.receiveShadow)&&(me.receiveShadow=tt.receiveShadow,Fe.setValue(H,"receiveShadow",tt.receiveShadow)),ct.isMeshGouraudMaterial&&ct.envMap!==null&&(st.envMap.value=C,st.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1),ct.isMeshStandardMaterial&&ct.envMap===null&&Lt.environment!==null&&(st.envMapIntensity.value=Lt.environmentIntensity),Ae&&(Fe.setValue(H,"toneMappingExposure",x.toneMappingExposure),me.needsLights&&(Jt=we,(Pt=st).ambientLightColor.needsUpdate=Jt,Pt.lightProbe.needsUpdate=Jt,Pt.directionalLights.needsUpdate=Jt,Pt.directionalLightShadows.needsUpdate=Jt,Pt.pointLights.needsUpdate=Jt,Pt.pointLightShadows.needsUpdate=Jt,Pt.spotLights.needsUpdate=Jt,Pt.spotLightShadows.needsUpdate=Jt,Pt.rectAreaLights.needsUpdate=Jt,Pt.hemisphereLights.needsUpdate=Jt),En&&ct.fog===!0&&De.refreshFogUniforms(st,En),De.refreshMaterialUniforms(st,ct,le,pe,g.state.transmissionRenderTarget[He.id]),Fr.upload(H,Ni(me),st,K));var Pt,Jt;if(ct.isShaderMaterial&&ct.uniformsNeedUpdate===!0&&(Fr.upload(H,Ni(me),st,K),ct.uniformsNeedUpdate=!1),ct.isSpriteMaterial&&Fe.setValue(H,"center",tt.center),Fe.setValue(H,"modelViewMatrix",tt.modelViewMatrix),Fe.setValue(H,"normalMatrix",tt.normalMatrix),Fe.setValue(H,"modelMatrix",tt.matrixWorld),ct.isShaderMaterial||ct.isRawShaderMaterial){let kt=ct.uniformsGroups;for(let Si=0,dc=kt.length;Si<dc;Si++){let Rs=kt[Si];on.update(Rs,ve),on.bind(Rs,ve)}}return ve})(R,q,J,re,ne);B.setMaterial(re,Ne);let qe=J.index,Je=1;if(re.wireframe===!0){if(qe=Ce.getWireframeAttribute(J),qe===void 0)return;Je=2}let et=J.drawRange,$e=J.attributes.position,at=et.start*Je,At=(et.start+et.count)*Je;Se!==null&&(at=Math.max(at,Se.start*Je),At=Math.min(At,(Se.start+Se.count)*Je)),qe!==null?(at=Math.max(at,0),At=Math.min(At,qe.count)):$e!=null&&(at=Math.max(at,0),At=Math.min(At,$e.count));let ft=At-at;if(ft<0||ft===1/0)return;let zt;nn.setup(ne,re,Be,J,qe);let Ct=Ge;if(qe!==null&&(zt=ye.get(qe),Ct=mt,Ct.setIndex(zt)),ne.isMesh)re.wireframe===!0?(B.setLineWidth(re.wireframeLinewidth*T()),Ct.setMode(H.LINES)):Ct.setMode(H.TRIANGLES);else if(ne.isLine){let He=re.linewidth;He===void 0&&(He=1),B.setLineWidth(He*T()),ne.isLineSegments?Ct.setMode(H.LINES):ne.isLineLoop?Ct.setMode(H.LINE_LOOP):Ct.setMode(H.LINE_STRIP)}else ne.isPoints?Ct.setMode(H.POINTS):ne.isSprite&&Ct.setMode(H.TRIANGLES);if(ne.isBatchedMesh)if(ne._multiDrawInstances!==null)_r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ct.renderMultiDrawInstances(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount,ne._multiDrawInstances);else if(I.get("WEBGL_multi_draw"))Ct.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let He=ne._multiDrawStarts,Lt=ne._multiDrawCounts,Qt=ne._multiDrawCount,ct=qe?ye.get(qe).bytesPerElement:1,tt=Y.get(re).currentProgram.getUniforms();for(let En=0;En<Qt;En++)tt.setValue(H,"_gl_DrawID",En),Ct.render(He[En]/ct,Lt[En])}else if(ne.isInstancedMesh)Ct.renderInstances(at,ft,ne.count);else if(J.isInstancedBufferGeometry){let He=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Lt=Math.min(J.instanceCount,He);Ct.renderInstances(at,ft,Lt)}else Ct.render(at,ft)},this.compile=function(R,q,J=null){J===null&&(J=R),g=je.get(J),g.init(q),y.push(g),J.traverseVisible(function(ne){ne.isLight&&ne.layers.test(q.layers)&&(g.pushLight(ne),ne.castShadow&&g.pushShadow(ne))}),R!==J&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(q.layers)&&(g.pushLight(ne),ne.castShadow&&g.pushShadow(ne))}),g.setupLights();let re=new Set;return R.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let Se=ne.material;if(Se)if(Array.isArray(Se))for(let Ne=0;Ne<Se.length;Ne++){let Be=Se[Ne];Zt(Be,J,ne),re.add(Be)}else Zt(Se,J,ne),re.add(Se)}),g=y.pop(),re},this.compileAsync=function(R,q,J=null){let re=this.compile(R,q,J);return new Promise(ne=>{function Se(){re.forEach(function(Ne){Y.get(Ne).currentProgram.isReady()&&re.delete(Ne)}),re.size!==0?setTimeout(Se,10):ne(R)}I.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Ot=null;function jt(){Bt.stop()}function $t(){Bt.start()}let Bt=new gu;function mn(R,q,J,re){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||xe.intersectsSprite(R)){re&&E.setFromMatrixPosition(R.matrixWorld).applyMatrix4(be);let Se=Ve.update(R),Ne=R.material;Ne.visible&&f.push(R,Se,Ne,J,E.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||xe.intersectsObject(R))){let Se=Ve.update(R),Ne=R.material;if(re&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),E.copy(R.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),E.copy(Se.boundingSphere.center)),E.applyMatrix4(R.matrixWorld).applyMatrix4(be)),Array.isArray(Ne)){let Be=Se.groups;for(let qe=0,Je=Be.length;qe<Je;qe++){let et=Be[qe],$e=Ne[et.materialIndex];$e&&$e.visible&&f.push(R,Se,$e,J,E.z,et)}}else Ne.visible&&f.push(R,Se,Ne,J,E.z,null)}}let ne=R.children;for(let Se=0,Ne=ne.length;Se<Ne;Se++)mn(ne[Se],q,J,re)}function Mn(R,q,J,re){let ne=R.opaque,Se=R.transmissive,Ne=R.transparent;g.setupLightsView(J),ge===!0&&Te.setGlobalState(x.clippingPlanes,J),re&&B.viewport(U.copy(re)),ne.length>0&&li(ne,q,J),Se.length>0&&li(Se,q,J),Ne.length>0&&li(Ne,q,J),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function fn(R,q,J,re){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[re.id]===void 0&&(g.state.transmissionRenderTarget[re.id]=new Bn(1,1,{generateMipmaps:!0,type:I.has("EXT_color_buffer_half_float")||I.has("EXT_color_buffer_float")?Ui:si,minFilter:Yi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace}));let ne=g.state.transmissionRenderTarget[re.id],Se=re.viewport||U;ne.setSize(Se.z*x.transmissionResolutionScale,Se.w*x.transmissionResolutionScale);let Ne=x.getRenderTarget(),Be=x.getActiveCubeFace(),qe=x.getActiveMipmapLevel();x.setRenderTarget(ne),x.getClearColor(V),te=x.getClearAlpha(),te<1&&x.setClearColor(16777215,.5),x.clear(),G&&ke.render(J);let Je=x.toneMapping;x.toneMapping=Mi;let et=re.viewport;if(re.viewport!==void 0&&(re.viewport=void 0),g.setupLightsView(re),ge===!0&&Te.setGlobalState(x.clippingPlanes,re),li(R,J,re),K.updateMultisampleRenderTarget(ne),K.updateRenderTargetMipmap(ne),I.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let at=0,At=q.length;at<At;at++){let ft=q[at],zt=ft.object,Ct=ft.geometry,He=ft.material,Lt=ft.group;if(He.side===Nt&&zt.layers.test(re.layers)){let Qt=He.side;He.side=Un,He.needsUpdate=!0,gn(zt,J,re,Ct,He,Lt),He.side=Qt,He.needsUpdate=!0,$e=!0}}$e===!0&&(K.updateMultisampleRenderTarget(ne),K.updateRenderTargetMipmap(ne))}x.setRenderTarget(Ne,Be,qe),x.setClearColor(V,te),et!==void 0&&(re.viewport=et),x.toneMapping=Je}function li(R,q,J){let re=q.isScene===!0?q.overrideMaterial:null;for(let ne=0,Se=R.length;ne<Se;ne++){let Ne=R[ne],Be=Ne.object,qe=Ne.geometry,Je=Ne.group,et=Ne.material;et.allowOverride===!0&&re!==null&&(et=re),Be.layers.test(J.layers)&&gn(Be,q,J,qe,et,Je)}}function gn(R,q,J,re,ne,Se){R.onBeforeRender(x,q,J,re,ne,Se),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(x,q,J,re,R,Se),ne.transparent===!0&&ne.side===Nt&&ne.forceSinglePass===!1?(ne.side=Un,ne.needsUpdate=!0,x.renderBufferDirect(J,q,re,ne,R,Se),ne.side=Pr,ne.needsUpdate=!0,x.renderBufferDirect(J,q,re,ne,R,Se),ne.side=Nt):x.renderBufferDirect(J,q,re,ne,R,Se),R.onAfterRender(x,q,J,re,ne,Se)}function qt(R,q,J){q.isScene!==!0&&(q=W);let re=Y.get(R),ne=g.state.lights,Se=g.state.shadowsArray,Ne=ne.state.version,Be=de.getParameters(R,ne.state,Se,q,J),qe=de.getProgramCacheKey(Be),Je=re.programs;re.environment=R.isMeshStandardMaterial?q.environment:null,re.fog=q.fog,re.envMap=(R.isMeshStandardMaterial?Ie:Me).get(R.envMap||re.environment),re.envMapRotation=re.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,Je===void 0&&(R.addEventListener("dispose",nt),Je=new Map,re.programs=Je);let et=Je.get(qe);if(et!==void 0){if(re.currentProgram===et&&re.lightsStateVersion===Ne)return Xn(R,Be),et}else Be.uniforms=de.getUniforms(R),R.onBeforeCompile(Be,x),et=de.acquireProgram(Be,qe),Je.set(qe,et),re.uniforms=Be.uniforms;let $e=re.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||($e.clippingPlanes=Te.uniform),Xn(R,Be),re.needsLights=(function(at){return at.isMeshLambertMaterial||at.isMeshToonMaterial||at.isMeshPhongMaterial||at.isMeshStandardMaterial||at.isShadowMaterial||at.isShaderMaterial&&at.lights===!0})(R),re.lightsStateVersion=Ne,re.needsLights&&($e.ambientLightColor.value=ne.state.ambient,$e.lightProbe.value=ne.state.probe,$e.directionalLights.value=ne.state.directional,$e.directionalLightShadows.value=ne.state.directionalShadow,$e.spotLights.value=ne.state.spot,$e.spotLightShadows.value=ne.state.spotShadow,$e.rectAreaLights.value=ne.state.rectArea,$e.ltc_1.value=ne.state.rectAreaLTC1,$e.ltc_2.value=ne.state.rectAreaLTC2,$e.pointLights.value=ne.state.point,$e.pointLightShadows.value=ne.state.pointShadow,$e.hemisphereLights.value=ne.state.hemi,$e.directionalShadowMap.value=ne.state.directionalShadowMap,$e.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,$e.spotShadowMap.value=ne.state.spotShadowMap,$e.spotLightMatrix.value=ne.state.spotLightMatrix,$e.spotLightMap.value=ne.state.spotLightMap,$e.pointShadowMap.value=ne.state.pointShadowMap,$e.pointShadowMatrix.value=ne.state.pointShadowMatrix),re.currentProgram=et,re.uniformsList=null,et}function Ni(R){if(R.uniformsList===null){let q=R.currentProgram.getUniforms();R.uniformsList=Fr.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function Xn(R,q){let J=Y.get(R);J.outputColorSpace=q.outputColorSpace,J.batching=q.batching,J.batchingColor=q.batchingColor,J.instancing=q.instancing,J.instancingColor=q.instancingColor,J.instancingMorph=q.instancingMorph,J.skinning=q.skinning,J.morphTargets=q.morphTargets,J.morphNormals=q.morphNormals,J.morphColors=q.morphColors,J.morphTargetsCount=q.morphTargetsCount,J.numClippingPlanes=q.numClippingPlanes,J.numIntersection=q.numClipIntersection,J.vertexAlphas=q.vertexAlphas,J.vertexTangents=q.vertexTangents,J.toneMapping=q.toneMapping}Bt.setAnimationLoop(function(R){Ot&&Ot(R)}),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(R){Ot=R,lt.setAnimationLoop(R),R===null?Bt.stop():Bt.start()},lt.addEventListener("sessionstart",jt),lt.addEventListener("sessionend",$t),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(q),q=lt.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,q,z),g=je.get(R,y.length),g.init(q),y.push(g),be.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),xe.setFromProjectionMatrix(be,gi,q.reversedDepth),Z=this.localClippingEnabled,ge=Te.init(this.clippingPlanes,Z),f=Oe.get(R,_.length),f.init(),_.push(f),lt.enabled===!0&&lt.isPresenting===!0){let Se=x.xr.getDepthSensingMesh();Se!==null&&mn(Se,q,-1/0,x.sortObjects)}mn(R,q,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(_e,ee),G=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,G&&ke.addToRenderList(f,R),this.info.render.frame++,ge===!0&&Te.beginShadows();let J=g.state.shadowsArray;Ee.render(J,R,q),ge===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset();let re=f.opaque,ne=f.transmissive;if(g.setupLights(),q.isArrayCamera){let Se=q.cameras;if(ne.length>0)for(let Ne=0,Be=Se.length;Ne<Be;Ne++)fn(re,ne,R,Se[Ne]);G&&ke.render(R);for(let Ne=0,Be=Se.length;Ne<Be;Ne++){let qe=Se[Ne];Mn(f,R,qe,qe.viewport)}}else ne.length>0&&fn(re,ne,R,q),G&&ke.render(R),Mn(f,R,q);z!==null&&L===0&&(K.updateMultisampleRenderTarget(z),K.updateRenderTargetMipmap(z)),R.isScene===!0&&R.onAfterRender(x,R,q),nn.resetDefaultState(),D=-1,P=null,y.pop(),y.length>0?(g=y[y.length-1],ge===!0&&Te.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,_.pop(),f=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(R,q,J){let re=Y.get(R);re.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,re.__autoAllocateDepthBuffer===!1&&(re.__useRenderToTexture=!1),Y.get(R.texture).__webglTexture=q,Y.get(R.depthTexture).__webglTexture=re.__autoAllocateDepthBuffer?void 0:J,re.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){let J=Y.get(R);J.__webglFramebuffer=q,J.__useDefaultFramebuffer=q===void 0};let vt=H.createFramebuffer();this.setRenderTarget=function(R,q=0,J=0){z=R,w=q,L=J;let re=!0,ne=null,Se=!1,Ne=!1;if(R){let Be=Y.get(R);if(Be.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(H.FRAMEBUFFER,null),re=!1;else if(Be.__webglFramebuffer===void 0)K.setupRenderTarget(R);else if(Be.__hasExternalTextures)K.rebindTextures(R,Y.get(R.texture).__webglTexture,Y.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let et=R.depthTexture;if(Be.__boundDepthTexture!==et){if(et!==null&&Y.has(et)&&(R.width!==et.image.width||R.height!==et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(R)}}let qe=R.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ne=!0);let Je=Y.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ne=Array.isArray(Je[q])?Je[q][J]:Je[q],Se=!0):ne=R.samples>0&&K.useMultisampledRTT(R)===!1?Y.get(R).__webglMultisampledFramebuffer:Array.isArray(Je)?Je[J]:Je,U.copy(R.viewport),N.copy(R.scissor),j=R.scissorTest}else U.copy(ce).multiplyScalar(le).floor(),N.copy(Re).multiplyScalar(le).floor(),j=he;if(J!==0&&(ne=vt),B.bindFramebuffer(H.FRAMEBUFFER,ne)&&re&&B.drawBuffers(R,ne),B.viewport(U),B.scissor(N),B.setScissorTest(j),Se){let Be=Y.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+q,Be.__webglTexture,J)}else if(Ne){let Be=q;for(let qe=0;qe<R.textures.length;qe++){let Je=Y.get(R.textures[qe]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+qe,Je.__webglTexture,J,Be)}}else if(R!==null&&J!==0){let Be=Y.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Be.__webglTexture,J)}D=-1},this.readRenderTargetPixels=function(R,q,J,re,ne,Se,Ne,Be=0){if(!R||!R.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ne!==void 0&&(qe=qe[Ne]),qe){B.bindFramebuffer(H.FRAMEBUFFER,qe);try{let Je=R.textures[Be],et=Je.format,$e=Je.type;if(!k.textureFormatReadable(et))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable($e))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");q>=0&&q<=R.width-re&&J>=0&&J<=R.height-ne&&(R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Be),H.readPixels(q,J,re,ne,rt.convert(et),rt.convert($e),Se))}finally{let Je=z!==null?Y.get(z).__webglFramebuffer:null;B.bindFramebuffer(H.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(R,q,J,re,ne,Se,Ne,Be=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ne!==void 0&&(qe=qe[Ne]),qe){if(q>=0&&q<=R.width-re&&J>=0&&J<=R.height-ne){B.bindFramebuffer(H.FRAMEBUFFER,qe);let Je=R.textures[Be],et=Je.format,$e=Je.type;if(!k.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,at),H.bufferData(H.PIXEL_PACK_BUFFER,Se.byteLength,H.STREAM_READ),R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Be),H.readPixels(q,J,re,ne,rt.convert(et),rt.convert($e),0);let At=z!==null?Y.get(z).__webglFramebuffer:null;B.bindFramebuffer(H.FRAMEBUFFER,At);let ft=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Gh(H,ft,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,at),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Se),H.deleteBuffer(at),H.deleteSync(ft),Se}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,q=null,J=0){let re=Math.pow(2,-J),ne=Math.floor(R.image.width*re),Se=Math.floor(R.image.height*re),Ne=q!==null?q.x:0,Be=q!==null?q.y:0;K.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,Ne,Be,ne,Se),B.unbindTexture()};let Gt=H.createFramebuffer(),Tt=H.createFramebuffer();this.copyTextureToTexture=function(R,q,J=null,re=null,ne=0,Se=null){let Ne,Be,qe,Je,et,$e,at,At,ft;Se===null&&(ne!==0?(_r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Se=ne,ne=0):Se=0);let zt=R.isCompressedTexture?R.mipmaps[Se]:R.image;if(J!==null)Ne=J.max.x-J.min.x,Be=J.max.y-J.min.y,qe=J.isBox3?J.max.z-J.min.z:1,Je=J.min.x,et=J.min.y,$e=J.isBox3?J.min.z:0;else{let F=Math.pow(2,-ne);Ne=Math.floor(zt.width*F),Be=Math.floor(zt.height*F),qe=R.isDataArrayTexture?zt.depth:R.isData3DTexture?Math.floor(zt.depth*F):1,Je=0,et=0,$e=0}re!==null?(at=re.x,At=re.y,ft=re.z):(at=0,At=0,ft=0);let Ct=rt.convert(q.format),He=rt.convert(q.type),Lt;q.isData3DTexture?(K.setTexture3D(q,0),Lt=H.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(K.setTexture2DArray(q,0),Lt=H.TEXTURE_2D_ARRAY):(K.setTexture2D(q,0),Lt=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment);let Qt=H.getParameter(H.UNPACK_ROW_LENGTH),ct=H.getParameter(H.UNPACK_IMAGE_HEIGHT),tt=H.getParameter(H.UNPACK_SKIP_PIXELS),En=H.getParameter(H.UNPACK_SKIP_ROWS),nr=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,zt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,zt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Je),H.pixelStorei(H.UNPACK_SKIP_ROWS,et),H.pixelStorei(H.UNPACK_SKIP_IMAGES,$e);let S=R.isDataArrayTexture||R.isData3DTexture,C=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){let F=Y.get(R),$=Y.get(q),O=Y.get(F.__renderTarget),oe=Y.get($.__renderTarget);B.bindFramebuffer(H.READ_FRAMEBUFFER,O.__webglFramebuffer),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let X=0;X<qe;X++)S&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(R).__webglTexture,ne,$e+X),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(q).__webglTexture,Se,ft+X)),H.blitFramebuffer(Je,et,Ne,Be,at,At,Ne,Be,H.DEPTH_BUFFER_BIT,H.NEAREST);B.bindFramebuffer(H.READ_FRAMEBUFFER,null),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(ne!==0||R.isRenderTargetTexture||Y.has(R)){let F=Y.get(R),$=Y.get(q);B.bindFramebuffer(H.READ_FRAMEBUFFER,Gt),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,Tt);for(let O=0;O<qe;O++)S?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,F.__webglTexture,ne,$e+O):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,F.__webglTexture,ne),C?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,$.__webglTexture,Se,ft+O):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,$.__webglTexture,Se),ne!==0?H.blitFramebuffer(Je,et,Ne,Be,at,At,Ne,Be,H.COLOR_BUFFER_BIT,H.NEAREST):C?H.copyTexSubImage3D(Lt,Se,at,At,ft+O,Je,et,Ne,Be):H.copyTexSubImage2D(Lt,Se,at,At,Je,et,Ne,Be);B.bindFramebuffer(H.READ_FRAMEBUFFER,null),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else C?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(Lt,Se,at,At,ft,Ne,Be,qe,Ct,He,zt.data):q.isCompressedArrayTexture?H.compressedTexSubImage3D(Lt,Se,at,At,ft,Ne,Be,qe,Ct,zt.data):H.texSubImage3D(Lt,Se,at,At,ft,Ne,Be,qe,Ct,He,zt):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Se,at,At,Ne,Be,Ct,He,zt.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Se,at,At,zt.width,zt.height,Ct,zt.data):H.texSubImage2D(H.TEXTURE_2D,Se,at,At,Ne,Be,Ct,He,zt);H.pixelStorei(H.UNPACK_ROW_LENGTH,Qt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ct),H.pixelStorei(H.UNPACK_SKIP_PIXELS,tt),H.pixelStorei(H.UNPACK_SKIP_ROWS,En),H.pixelStorei(H.UNPACK_SKIP_IMAGES,nr),Se===0&&q.generateMipmaps&&H.generateMipmap(Lt),B.unbindTexture()},this.initRenderTarget=function(R){Y.get(R).__webglFramebuffer===void 0&&K.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?K.setTextureCube(R,0):R.isData3DTexture?K.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?K.setTexture2DArray(R,0):K.setTexture2D(R,0),B.unbindTexture()},this.resetState=function(){w=0,L=0,z=null,B.reset(),nn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};function Mu(r,e,t){let n=[],i=[],s=new wt({color:t.item("suit",e.suit).color,roughness:.93,metalness:0}),a=new wt({color:new Ke(t.item("suit",e.suit).color).multiplyScalar(.7),roughness:.9}),o=new wt({color:"#e8e5db",roughness:.88}),c=new wt({color:"#1b1f22",roughness:.8}),l=new wt({color:t.item("shoes",e.shoes).color,roughness:.62});i.push(s,a,o,c,l);function h(p,v,f){let g=p.getAttribute("position"),_=[],y=[];for(let x=0;x<g.count;x++)_.push(.5+g.getX(x)/2.55,.5-g.getY(x)/3.825),y.push(f);return p.setAttribute("bodyUv",new Pe(_,2)),p.setAttribute("surface",new Pe(y,1)),n.push(p),r.mesh(p,v)}function u(p,v,f,g=.003){let _=new yt(p.map(y=>new b(...y)));return h(new Mt(_,24,g,6,!1),v,f)}function d(p,v,f){let g=new pt,_=p.flat();g.setAttribute("position",new Pe(_,3));let y=[];for(let x=1;x<p.length-1;x++)y.push(0,x,x+1);return g.setIndex(y),g.computeVertexNormals(),v.side=Nt,h(g,v,f)}if(["classic","ruby","midnight"].includes(e.suit)){for(let p of[-1,1])u([[p*.2,1.05,-.207],[p*.35,.82,-.254],[p*.38,.38,-.244],[p*.3,.14,-.201]],a,1,.0025);u([[0,1.14,-.19],[0,.8,-.281],[0,.31,-.255],[0,.13,-.218]],a,1,.003);for(let p of[.37,.17]){let v=new Xe(.013,.013,.008,16);v.rotateX(Math.PI/2),v.translate(.04,p,.275),h(v,c,1)}}for(let p of[-1,1]){let v=p*.45;d([[v-.064,-1.54,.17],[v+.064,-1.54,.17],[v+.077,-1.69,.365],[v-.077,-1.69,.365]],l,5);for(let f=0;f<5;f++){let g=-1.56-f*.026,_=.205+f*.032;u([[v-.062,g,_],[v,g-.008,_+.01],[v+.062,g-.014,_]],o,5,.0035),u([[v+.062,g,_+.001],[v,g-.008,_+.011],[v-.062,g-.014,_+.001]],o,5,.0035)}u([[v-.115,-1.77,.21],[v-.11,-1.77,.35],[v,-1.77,.439],[v+.11,-1.77,.35],[v+.115,-1.77,.21]],l,5,.003),u([[v-.08,-1.55,-.07],[v,-1.52,-.087],[v+.08,-1.55,-.07]],c,5,.006)}return{dispose(){n.forEach(p=>p.dispose()),i.forEach(p=>p.dispose())}}}var oi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Su(r){let e=[],t={};function n(v,f,g,_,y=0){let x=new Sr;x.name=v;let M=f?f.userData.rest:[0,0,0];return x.position.set(g-M[0],_-M[1],y-M[2]),x.userData.rest=[g,_,y],(f||r).add(x),e.push(x),t[v]=x,x}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[v,f]of[["left",-1],["right",1]]){let g=n(v+"Shoulder",a,f*.49,1.09),_=n(v+"Elbow",g,f*.66,.57),y=n(v+"Wrist",_,f*.78,.04,.035),x=n(v+"Hand",y,f*.79,-.15,.07);for(let L=0;L<4;L++)n(v+"Finger"+L,x,f*(.5-(.175+L*.019))*2.55,-.17-L*.007,.07);n(v+"Thumb",x,f*.63,-.13,.11);let M=n(v+"Hip",i,f*.23,-.2,-.01),w=n(v+"Knee",M,f*.34,-.77,-.01);n(v+"Ankle",w,f*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new as(e);function h(v,f,g){let _=f<.5?"left":"right",y=i,x=i,M=0;if(v===1)y=s,x=a,M=1-oi(.25,.44,g);else if(v===2||v===9)g<.25?(y=a,x=t[_+"Shoulder"],M=oi(.175,.245,g)):g<.4?(y=t[_+"Shoulder"],x=t[_+"Elbow"],M=oi(.29,.38,g)):(y=t[_+"Elbow"],x=t[_+"Wrist"],M=oi(.43,.49,g));else if(v===3){let w=f<.5?f:1-f;g>.54?(y=t[_+"Hand"],x=t[_+(w>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((w-.175)/.019))))],M=oi(.54,.566,g)):(y=t[_+"Wrist"],x=t[_+"Hand"],M=oi(.49,.53,g))}else v===4?g<.57?(y=i,x=t[_+"Hip"],M=oi(.5,.57,g)):g<.76?(y=t[_+"Hip"],x=t[_+"Knee"],M=oi(.66,.74,g)):(y=t[_+"Knee"],x=t[_+"Ankle"],M=oi(.79,.84,g)):v===5||v===8?y=x=t[_+"Ankle"]:v===6?y=x=c:v===7&&(y=a,x=o,M=1-oi(.17,.225,g));return{indices:[e.indexOf(y),e.indexOf(x),0,0],weights:[1-M,M,0,0]}}function u(v,f){let g=v.getAttribute("bodyUv"),_=v.getAttribute("surface"),y=[],x=[];for(let w=0;w<g.count;w++){let L=h(_.getX(w),g.getX(w),g.getY(w));y.push(...L.indices),x.push(...L.weights)}v.setAttribute("skinIndex",new Hi(y,4)),v.setAttribute("skinWeight",new Pe(x,4));let M=new rs(v,f);return r.add(M),M.bind(l,new Ze),M.frustumCulled=!1,M}let d=0;function m(v,f,g){d+=(Number(f)-d)*(1-Math.exp(-Math.min(.1,g)*9));let _=Math.sin(v*1.55)*d;a.scale.set(1+_*.003,1+_*.003,1+_*.007),c.rotation.set(Math.sin(v*.57)*.01*d,Math.sin(v*.36)*.024*d,Math.sin(v*.41)*.008*d);for(let[y,x]of[["left",-1],["right",1]]){t[y+"Shoulder"].rotation.z=(Math.sin(v*.79+x*.5)*.009+x*.005)*d,t[y+"Elbow"].rotation.x=(Math.sin(v*.67+x*.4)*.012-.025)*d,t[y+"Hand"].rotation.x=Math.sin(v*.61+x)*.01*d;for(let M=0;M<4;M++)t[y+"Finger"+M].rotation.x=(.035+Math.sin(v*.53+M*.25+x)*.012)*d}r.updateMatrixWorld(!0),l.update()}function p(v,f){r.updateMatrixWorld(!0),t[f].attach(v)}return{skeleton:l,bones:t,mesh:u,update:m,attach:p,weights:h,dispose(){l.dispose()}}}function Tu(r,e="#c5b899"){let t=new We;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new wt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new wt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,M,w,L,z)=>{let D=new it(x,M);return D.position.set(w,L,z),t.add(D),D},o=a(new xt(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let M=x*Math.PI/9,w=a(new Qe(.026,.049,.016),i,Math.cos(M)*.083,0,Math.sin(M)*.105);w.rotation.y=-M}let c=a(new Xe(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new xt(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),m=/Daytona|square|rose/i.test(r),p=u.createRadialGradient(190,170,20,256,256,256);p.addColorStop(0,d?"#237050":m?"#fff7db":"#294559"),p.addColorStop(1,d?"#072b20":m?"#c7c4b4":"#06121c"),u.fillStyle=p,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=m?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let v=(x,M,w)=>{u.save(),u.rotate(x),u.strokeStyle=m?"#203337":"#f4e4bb",u.lineWidth=w,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-M),u.stroke(),u.restore()};v(-Math.PI/3,112,13),v(Math.PI/3,168,9),v(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=m?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let f=new Et(h);f.colorSpace=dt,f.anisotropy=4;let g=a(new Gn(.066,64),new wt({map:f,roughness:.34,metalness:.1}),0,0,.139),_=a(new Gn(.066,64),new xn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),y=a(new Xe(.012,.012,.019,16),i,.085,0,.12);return y.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(M=>{M.geometry?.dispose(),M.material&&x.add(M.material)});for(let M of x)M.dispose();f.dispose()}}}function bu(r="#d3b15b"){let e=new We;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new wt({color:"#c5a14d",metalness:.9,roughness:.24}),n=new wt({color:r,metalness:.25,roughness:.13}),i=new it(new xt(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new it(new Qe(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new it(new Er(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function wu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let de=n.loadHelmet(!0,e.visor,!0,e.helmet);de.naturalWidth||await new Promise((De,Oe)=>{de.addEventListener("load",De,{once:!0}),de.addEventListener("error",Oe,{once:!0})})}let s=n.renderCharacter(i,{...e,watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let m=d.getContext("2d");m.drawImage(u,0,0,1024,1536);let p=m.getImageData(0,0,1024,1536).data,v=o.getImageData(0,0,1024,1536).data,f=h.getImageData(0,0,1024,1536).data;function g(de,De,Oe){let je=Math.max(0,Math.min(1535,Math.round(Oe*1535))),Te=Math.max(0,Math.min(1023,Math.round(De*1023)));if(de[(je*1024+Te)*4+3]>220)return De;for(let Ee=1;Ee<180;Ee++)for(let ke of[Te-Ee,Te+Ee])if(ke>=0&&ke<1024&&de[(je*1024+ke)*4+3]>220)return ke/1023;return De}let _=new Et(a),y=new Et(l),x=new Et(d);for(let de of[_,y,x])de.colorSpace=dt,de.anisotropy=4;let M=n.wardrobeSubcategory("pants",e.pants)==="shorts",w=e.suit?.endsWith("Tank"),L=e.suit?.endsWith("Tee"),z=["classic","ruby","midnight"].includes(e.suit),D=!!e.helmet&&e.helmet!=="none",P=new un({uniforms:{helmetColor:{value:new Ke(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new Ke(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},helmetOn:{value:D?1:0},shorts:{value:M?1:0},sleeveEnd:{value:w?.19:L?.29:.49},club:{value:z?1:0},portrait:{value:_},rear:{value:y},profile:{value:x},jacketColor:{value:new Ke(n.item("suit",e.suit).color)},pantsColor:{value:new Ke(n.item("pants",e.pants).color)},shoeColor:{value:new Ke(n.item("shoes",e.shoes).color)}},side:Nt,vertexShader:`
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
}`,fragmentShader:`uniform vec3 helmetColor;uniform vec3 helmetStripe;uniform float helmetOn;uniform float shorts;uniform float sleeveEnd;uniform float club;uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec3 vRestPosition;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;float hash3(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
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
 if(vSurface<1.5||(arm>.5&&y<sleeveEnd)){float weave=.81+.008*sin(y*85.)*sin(x*110.);float seam=1.-.10*exp(-pow((x-.505)/.003,2.));float fabricShade=clamp(dot(c,vec3(.2126,.7152,.0722))/.075,.85,1.22);return jacketColor*weave*seam*fabricShade;}
 if(legs>.5&&y<(shorts>.5?.65:.85)){float fold=.83+.025*sin(x*44.+y*14.);float inseam=1.-.09*exp(-pow((abs(x-.5)-.07)/.008,2.));fold*=inseam;return pantsColor*fold;}return c;
}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);b=dressed(b,vBodyUv.y,vBodyUv.x);s=dressed(s,vBodyUv.y,vBodyUv.x);float f=smoothstep(.38,.86,vFront)*a.a;float shoe=step(4.5,vSurface)*(1.-step(5.5,vSurface));float sole=step(7.5,vSurface);float bareArm=step(1.5,vSurface)*(1.-step(2.5,vSurface))*step(sleeveEnd,vBodyUv.y);
 float bareLeg=step(3.5,vSurface)*(1.-step(4.5,vSurface))*shorts*step(.65,vBodyUv.y);
 f*=1.-max(max(shoe,sole),max(bareArm,bareLeg)*.45);vec3 n=normalize(vNormal);vec3 lamp=normalize(vec3(-.55,.85,1.));float light=.62+.34*max(0.,dot(n,lamp))+.09*max(0.,dot(n,normalize(vec3(.7,.2,-1.))));float underArm=exp(-pow((abs(vBodyUv.x-.5)-.19)/.025,2.))*exp(-pow((vBodyUv.y-.30)/.11,2.));float collar=exp(-pow((vBodyUv.y-.192)/.018,2.))*exp(-pow((vBodyUv.x-.5)/.09,2.));light*=1.-.13*underArm-.12*collar;vec3 color=mix(b,a.rgb,f);float sideAmount=(1.-smoothstep(.05,.72,abs(vFront)))*step(5.5,vSurface)*(1.-step(6.5,vSurface))*(1.-helmetOn);color=mix(color,s,sideAmount)*light;float hardSurface=step(4.5,vSurface)*(1.-step(6.5,vSurface));float gloss=mix(.025,.16,hardSurface);float highlight=pow(max(0.,dot(reflect(-lamp,n),vec3(0.,0.,1.))),mix(14.,48.,hardSurface));float rim=pow(1.-abs(n.z),3.)*.045;color+=vec3(1.,.90,.75)*(highlight*gloss+rim);gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`}),U=new We,N=[],j=Su(U);function V(de,{rings:De=70,sides:Oe=80,muzzle:je=!1,folds:Te=0,z:Ee=0,surface:ke=0}={}){let It=[],Ge=[],mt=[],rt=[],nn=[],on=[],H=[],Ft=[],gt=de[0][0],lt=de.at(-1)[0];function Wn(Xt){let nt=0;for(;nt<de.length-2&&de[nt+1][0]<Xt;)nt++;let Zt=de[nt],Ot=de[nt+1],jt=Math.max(0,Math.min(1,(Xt-Zt[0])/(Ot[0]-Zt[0])));return Zt.map(($t,Bt)=>{if(Bt===0)return Xt;let mn=de[Math.max(0,nt-1)][Bt]||0,Mn=de[Math.min(de.length-1,nt+2)][Bt]||0,fn=Ot[Bt]||0;return Math.max(Math.min($t,fn),Math.min(Math.max($t,fn),.5*(2*$t+(-mn+fn)*jt+(2*mn-5*$t+4*fn-Mn)*jt*jt+(-mn+3*$t-3*fn+Mn)*jt*jt*jt)))})}for(let Xt=0;Xt<=De;Xt++){let nt=gt+(lt-gt)*Xt/De,[,Zt,Ot,jt,$t=0]=Wn(nt),Bt=(Zt+Ot)/2,mn=(Ot-Zt)/2;for(let Mn=0;Mn<=Oe;Mn++){let fn=2*Math.PI*Mn/Oe,li=Math.cos(fn),gn=Math.sin(fn),qt=Bt+mn*li,Ni=ke===1||ke===2&&nt<(w?.19:L?.29:.49)||ke===4&&(!M||nt<.65),Xn=jt*(1+(Ni?Te:0)*Math.sin(nt*65+fn*3)*Math.sin(Math.PI*Xt/De)),vt=Ee+$t+Xn*gn;if(je&&gn>0){let ne=(qt-.507)/.085;vt+=.17*Math.exp(-(ne*ne)-((nt-.126)/.031)**2)*gn*gn,vt+=.045*Math.exp(-(((qt-.505)/.05)**2)-((nt-.104)/.015)**2)*gn,vt-=.028*(Math.exp(-(((qt-.466)/.024)**2))+Math.exp(-(((qt-.55)/.024)**2)))*Math.exp(-(((nt-.077)/.013)**2))*gn}It.push(((ke===5?Bt+(qt-Bt)*.88:qt)-.5)*2.55,(.5-nt)*3.825,ke===5?vt*.84:vt),on.push(qt,nt),H.push(ke);let Gt=qt,Tt=nt;ke===3&&(Gt=(qt<.5?.2:.8)+(qt-(Zt+Ot)/2)*.45,Tt=Math.min(nt,.545)),Ge.push(g(v,Gt,Tt),1-Tt);let R=nt,q=qt;je?R=.008+(nt-.008)*.74:gt<.24&&lt>.4&&Zt>.29&&Ot<.72&&(R=.14+(nt-.165)*1.08),gt>.82&&(q=Bt+(qt-Bt)*.8),mt.push(g(f,q,R),1-R);let J=je?nt*.92:nt,re=(je?.45:.49)+vt*.4;if(gt>=.45&&lt>.62&&nt>.49&&nt<.62&&(re=Math.min(re,.43)),rt.push(g(p,re,J),1-J),nn.push(gn),Xt<De&&Mn<Oe){let ne=Xt*(Oe+1)+Mn,Se=ne+Oe+1;Ft.push(ne,ne+1,Se,ne+1,Se+1,Se)}}}for(let Xt of[0,De]){let nt=Xt*(Oe+1),Zt=It.length/3;for(let[Ot,jt]of[[It,3],[Ge,2],[mt,2],[rt,2],[on,2]])for(let $t=0;$t<jt;$t++){let Bt=0;for(let mn=0;mn<Oe;mn++)Bt+=Ot[(nt+mn)*jt+$t];Ot.push(Bt/Oe)}H.push(ke),nn.push(0);for(let Ot=0;Ot<Oe;Ot++)Xt===0?Ft.push(Zt,nt+Ot+1,nt+Ot):Ft.push(Zt,nt+Ot,nt+Ot+1)}let St=new pt;St.setAttribute("bodyUv",new Pe(on,2)),St.setAttribute("surface",new Pe(H,1)),St.setAttribute("position",new Pe(It,3)),St.setAttribute("uv",new Pe(Ge,2)),St.setAttribute("rearUv",new Pe(mt,2)),St.setAttribute("profileUv",new Pe(rt,2)),St.setAttribute("frontWeight",new Pe(nn,1)),St.setIndex(Ft),St.computeVertexNormals(),j.mesh(St,P),N.push(St)}V([[.165,.435,.575,.1],[.19,.35,.65,.21],[.245,.313,.69,.235],[.32,.33,.68,.225],[.4,.33,.67,.21],[.455,.33,.67,.195],[.475,.37,.63,.18]],{folds:.025,surface:1}),V([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),V(D?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!D,z:.1,rings:110,sides:112,surface:6}),D||(V([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),V([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let de of[-1,1]){let De=Oe=>de<0?Oe:Oe.map(([je,Te,Ee,ke,It])=>[je,1-Ee,1-Te,ke,It||0]);V(De([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.305,.194,.305,.121,.005],[.34,.185,.283,.103,-.018],[.375,.17,.272,.132,.004],[.41,.153,.256,.128,.018],[.455,.149,.241,.1,.018],[.49,.158,.23,.079,.01]]),{z:-.025,folds:.025,rings:100,surface:2}),!L&&!w?V(De([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}):V(De(w?[[.185,.28,.357,.125],[.19,.276,.354,.127]]:[[.279,.205,.317,.143],[.288,.201,.314,.144]]),{z:-.025,rings:8,surface:2}),z&&V(De([[.491,.156,.227,.084],[.5,.159,.225,.08]]),{z:.005,rings:8,surface:9}),V(De([[.478,.168,.221,.055],[.493,.151,.23,.08],[.515,.151,.241,.082],[.531,.153,.245,.086],[.545,.165,.241,.066],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let Oe=0;Oe<4;Oe++){let je=.166+Oe*.019,Te=.54+Oe*.002,Ee=[.039,.046,.043,.034][Oe];V(De([[Te,je,je+.019,.024,0],[Te+Ee*.35,je-.001,je+.02,.025,.008],[Te+Ee*.72,je+.001,je+.018,.021,.026],[Te+Ee,je+.005,je+.014,.007,.035]]),{z:.07,rings:22,sides:24,surface:3})}V(De([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}V([[.454,.36,.65,.17],[.48,.313,.69,.205],[.53,.3,.703,.215],[.58,.31,.69,.205],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let de of[-1,1]){let De=Oe=>de<0?Oe:Oe.map(([je,Te,Ee,ke,It])=>[je,1-Ee,1-Te,ke,It||0]);V(De([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,M?.302:.271,M?.428:.44,M?.14:.19],[.72,M?.292:.262,M?.416:.432,M?.155:.19],[.77,M?.286:.247,M?.396:.41,M?.135:.175],[.81,M?.289:.248,M?.379:.393,M?.1:.16],[.826,M?.28:.254,M?.375:.39,M?.11:.155],[.843,.283,.372,.105],[.884,.295,.365,.085],[.92,.302,.356,.075]]),{z:-.01,folds:.012,rings:110,surface:4}),V(De([[.893,.304,.352,.075,-.015],[.908,.284,.373,.12,.015],[.929,.269,.386,.215,.095],[.95,.263,.389,.275,.145],[.963,.265,.387,.281,.15],[.972,.272,.38,.267,.15]]),{z:.015,rings:54,surface:5}),V(De([[.968,.269,.383,.269,.15],[.974,.265,.387,.277,.15],[.982,.267,.385,.272,.15],[.986,.276,.376,.251,.15]]),{z:.015,rings:14,surface:8})}let te=Mu(j,e,n),ie=e.ring&&e.ring!=="none"?bu(n.item("ring",e.ring).color):null;ie&&(U.add(ie.group),j.attach(ie.group,"rightHand"));let pe=e.watch&&e.watch!=="none"?Tu(e.watch,n.item("watch",e.watch).color):null;pe&&(U.add(pe.group),j.attach(pe.group,"rightWrist"));let le=new yn;le.add(U);{le.add(new Dn("#fff0d4","#283849",2.1));let de=new wn("#fff0dc",3.5);de.position.set(-2,4,5),le.add(de);let De=new wn("#9cc3ed",1.2);De.position.set(3,1,-2),le.add(De)}let _e=new Hn({alpha:!0,antialias:!0});_e.setPixelRatio(Math.min(devicePixelRatio,2)),_e.outputColorSpace=dt,r.append(_e.domElement),_e.domElement.setAttribute("role","img"),_e.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let ee=new xi(-1.5,1.5,2.05,-2.05,.1,30);ee.position.set(0,0,8);let ce=t.yaw||0,Re=t.pitch||0,he=null,xe,ge=!1,Z=!1,be=0,A=window.matchMedia?.("(prefers-reduced-motion: reduce)"),E="full",W=t.focusOrbit||null,G=2.05,T=0,I=0;function k(de){de=de==="watch"?"watch":"full",de!==E&&(de==="watch"?(W=W||{yaw:ce,pitch:Re},t.focusOrbit=W,ce=0,Re=0):W&&(ce=W.yaw,Re=W.pitch,W=null,delete t.focusOrbit),t.yaw=ce,t.pitch=Re,E=de,r.dataset.focus=E)}function B(de){let De=r.clientWidth/Math.max(1,r.clientHeight),Oe=E==="watch",je=Oe?Math.max(.4,.3/De):Math.max(2.4,1.17/De),Te=Oe?.76*Math.cos(ce)+.1*Math.sin(ce):0,Ee=Oe?.04*Math.cos(Re)-(.1*Math.cos(ce)-.76*Math.sin(ce))*Math.sin(Re):-.22,ke=1-Math.exp(-de*12);G+=(je-G)*ke,T+=(Te-T)*ke,I+=(Ee-I)*ke,ee.left=T-G*De,ee.right=T+G*De,ee.top=I+G,ee.bottom=I-G,ee.updateProjectionMatrix()}let ae=()=>{!r.clientWidth||!r.clientHeight||(B(1),_e.setSize(r.clientWidth,r.clientHeight,!1))},Y=new ResizeObserver(ae);Y.observe(r),ae();let K=de=>{Z=!1,he={id:de.pointerId,x:de.clientX,y:de.clientY},r.setPointerCapture(de.pointerId),de.preventDefault()},Me=de=>{!he||he.id!==de.pointerId||(ce+=(de.clientX-he.x)*.012,Re=Math.max(-.35,Math.min(.35,Re+(de.clientY-he.y)*.006)),he.x=de.clientX,he.y=de.clientY)},Ie=()=>{he=null},ye=de=>{["ArrowLeft","ArrowRight"].includes(de.key)&&(ce+=de.key==="ArrowLeft"?-.15:.15,de.preventDefault())};r.addEventListener("pointerdown",K),r.addEventListener("pointermove",Me),r.addEventListener("pointerup",Ie),r.addEventListener("pointercancel",Ie),r.addEventListener("keydown",ye);function Ce(de=0){if(ge)return;if(!r.isConnected){Ve();return}Z&&!he&&be&&(ce+=Math.min(.05,(de-be)/1e3)*.35),P.uniforms.idleTime.value=de/1e3,P.uniforms.idleStrength.value=!A?.matches&&!he&&E==="full"?1:0;let De=be?Math.min(.05,(de-be)/1e3):.016;j.update(de/1e3,P.uniforms.idleStrength.value,De),B(De),be=de,U.rotation.set(Re,ce,0),t.yaw=ce,t.pitch=Re,r.dataset.yaw=String(ce),_e.render(le,ee),xe=requestAnimationFrame(Ce)}return Ce(),{state:t,setFocus:k,setYaw(de){ce=de},setAutoRotate(de){Z=!!de},dispose:Ve};function Ve(){if(!ge){ge=!0,cancelAnimationFrame(xe),Y.disconnect();for(let[de,De]of[["pointerdown",K],["pointermove",Me],["pointerup",Ie],["pointercancel",Ie],["keydown",ye]])r.removeEventListener(de,De);for(let de of N)de.dispose();pe?.dispose(),ie?.dispose(),te.dispose(),j.dispose(),P.dispose(),_.dispose(),y.dispose(),x.dispose(),_e.dispose(),_e.forceContextLoss(),_e.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new yn,s=new We;i.add(s);let a=new Hn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=dt,a.toneMapping=ri,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new Vt(34,1,.1,40);i.add(new Dn("#dcecff","#50402b",2));for(let[Z,be,A,E]of[[3,6,5,4],[-3,3,-3,3]]){let W=new wn("#fff0dd",E);W.position.set(Z,be,A),i.add(W)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let Z=0;Z<128;Z+=2)l.fillStyle=Z%4?"#808080":"#b0b0b0",l.fillRect(0,Z,128,1);for(let Z=0;Z<128;Z+=3)l.fillStyle="#888888",l.fillRect(Z,0,1,128);let h=new Et(c);h.wrapS=h.wrapT=Zn,h.repeat.set(8,8);let u=(Z,be=0,A=.7)=>new wt({color:Z,metalness:be,roughness:A}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),v=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),_=u("#171b20"),y=u("#171b20"),x=u("#826222",.9,.18);for(let Z of[g,_,p])Z.bumpMap=h,Z.bumpScale=.012;function M(Z,be,A,E,W,G,T,I=s){let k=new it(new an(1,40,28),Z);return k.position.set(be,A,E),k.scale.set(W,G,T),I.add(k),k}function w(Z,be,A,E,W=E){let G=new b(...be),T=new b(...A),I=T.clone().sub(G),k=new it(E>.1?new Tr((E+W)/2,Math.max(.01,I.length()-(E+W)),10,32):new Xe(W,E,I.length(),16),Z);return k.position.copy(G.add(T).multiplyScalar(.5)),k.quaternion.setFromUnitVectors(new b(0,1,0),I.normalize()),s.add(k),k}M(_,0,1.64,0,.47,.36,.26),M(g,0,2.32,0,.59,.65,.32),M(p,0,2.35,.29,.27,.49,.055);for(let Z of[-1,1]){w(_,[Z*.27,1.67,0],[Z*.29,.92,.015],.23,.25),M(_,Z*.29,.92,.015,.23,.24,.24),w(_,[Z*.29,.94,.015],[Z*.32,.28,0],.16,.22),w(v,[Z*.45,1.55,.03],[Z*.48,.36,.03],.025,.032),M(y,Z*.32,.18,.15,.22,.19,.39),M(v,Z*.32,.075,.15,.235,.065,.4),M(v,Z*.32,.27,.12,.135,.08,.2);for(let be=0;be<5;be++)w(v,[Z*.32-.1,.29,.08+be*.04],[Z*.32+.1,.29,.08+be*.04],.009);M(g,Z*.55,2.63,0,.26,.27,.29),w(g,[Z*.57,2.63,0],[Z*.76,2.12,.02],.19,.23),M(g,Z*.76,2.12,.02,.19,.2,.2),w(g,[Z*.76,2.12,.02],[Z*.88,1.65,.08],.13,.18),w(v,[Z*.71,2.6,.15],[Z*.99,1.72,.15],.035),M(p,Z*.88,1.67,.08,.145,.09,.15),M(d,Z*.89,1.48,.1,.16,.22,.12);for(let be=0;be<4;be++)M(m,Z*(.79+be*.065),1.36,.15,.035,.13,.045);M(m,Z*.75,1.48,.2,.06,.12,.06)}M(d,0,3.04,0,.25,.27,.24),M(d,0,3.39,0,.36,.43,.31);for(let Z of[-1,1])M(m,Z*.36,3.4,.01,.12,.17,.09),M(d,Z*.36,3.4,.065,.065,.1,.035),M(m,Z*.15,3.43,.258,.15,.12,.075),M(p,Z*.14,3.44,.32,.045,.035,.02),M(v,Z*.13,3.45,.335,.009,.01,.006),M(d,Z*.15,3.53,.28,.18,.05,.07);M(m,0,3.23,.27,.26,.18,.13),M(m,0,3.34,.34,.14,.08,.08),M(p,0,3.17,.375,.17,.017,.018),M(m,0,3.13,.36,.17,.035,.025);let L=new We;s.add(L),M(p,0,3.51,-.02,.41,.42,.35,L),M(f,0,3.64,.015,.07,.3,.36,L);for(let Z of[-1,1])M(p,Z*.32,3.29,.015,.1,.31,.24,L),M(f,Z*.39,3.43,.07,.025,.05,.05,L);let z=M(x,0,3.44,.27,.38,.19,.14,L);for(let Z of[-1,1])w(p,[Z*.28,2.88,.25],[Z*.1,2.58,.33],.035),w(p,[Z*.3,2.28,.3],[Z*.39,2.09,.26],.018);for(let Z=0;Z<6;Z++)M(f,0,2.03+Z*.14,.35,.015,.015,.01);let D=document.createElement("canvas");D.width=512,D.height=256;let P=D.getContext("2d"),U=new Et(D);U.colorSpace=dt;let N=new it(new Yt(.28,.12),new wt({map:U,roughness:.9}));N.position.set(-.27,2.46,.317),s.add(N);let j=new We;for(let Z=0;Z<3;Z++)for(let be=0;be<5;be++){let A=new it(new Yt(.048,.048),(be+Z)%2?p:v);A.position.set(-.36+be*.048,2.62+Z*.048,.318),j.add(A)}s.add(j);function V(Z){g.color.set(n.item("suit",Z.suit).color),_.color.set(n.item("pants",Z.pants).color),y.color.set(n.item("shoes",Z.shoes).color),L.visible=Z.helmet!=="none",z.position.y=Z.visor==="open"?3.71:3.44,z.rotation.x=Z.visor==="open"?-.8:0,N.visible=Z.patch!=="none",P.fillStyle="#22282b",P.fillRect(0,0,512,256),P.strokeStyle="#c9af74",P.lineWidth=12,P.strokeRect(8,8,496,240),P.fillStyle="#eee0b5",P.font="bold 72px Arial",P.textAlign="center",P.fillText(Z.patch==="name"?Z.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":Z.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),U.needsUpdate=!0}V(e),t.yaw??=0,t.pitch??=.07;let te=null,ie,pe=!1;function le(){let Z=r.clientWidth,be=r.clientHeight;!Z||!be||(a.setSize(Z,be,!1),o.aspect=Z/be,o.updateProjectionMatrix())}let _e=new ResizeObserver(le);_e.observe(r),le();let ee=Z=>{te={id:Z.pointerId,x:Z.clientX,y:Z.clientY},r.setPointerCapture(Z.pointerId),Z.preventDefault()},ce=Z=>{!te||te.id!==Z.pointerId||(t.yaw-=(Z.clientX-te.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(Z.clientY-te.y)*.006)),te.x=Z.clientX,te.y=Z.clientY)},Re=()=>{te=null},he=Z=>{(Z.key==="ArrowLeft"||Z.key==="ArrowRight")&&(t.yaw+=Z.key==="ArrowLeft"?.15:-.15,Z.preventDefault())};r.addEventListener("pointerdown",ee),r.addEventListener("pointermove",ce),r.addEventListener("pointerup",Re),r.addEventListener("pointercancel",Re),r.addEventListener("keydown",he);function xe(){if(pe)return;pe=!0,cancelAnimationFrame(ie),_e.disconnect();for(let[be,A]of[["pointerdown",ee],["pointermove",ce],["pointerup",Re],["pointercancel",Re],["keydown",he]])r.removeEventListener(be,A);let Z=new Set;i.traverse(be=>{be.geometry?.dispose(),be.material&&Z.add(be.material)});for(let be of Z)be.dispose();U.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function ge(){if(pe)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){xe();return}let Z=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Z,1.95+Math.sin(t.pitch)*Z,Math.cos(t.yaw)*Math.cos(t.pitch)*Z),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ie=requestAnimationFrame(ge)}return ge(),{update:V,dispose:xe,state:t}};function oc(r){let e=new We;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(D,P,U)=>new xn({color:D,metalness:P,roughness:U,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(D,P,U=0,N=0,j=0)=>{let V=new it(D,P);return V.position.set(U,N,j),V.castShadow=V.receiveShadow=!0,e.add(V),V},h=(D,P,U,N=!0)=>{let j=new dn;return j.absarc(P,U,D,0,Math.PI*2,N),j},u=t?.395:.437,d=new Wt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let D=0;D<24;D++)for(let[P,U]of[[.28,0],[.36,.045]]){let N=D*Math.PI/12+U;d.holes.push(h(n?.009:.011,Math.cos(N)*P,Math.sin(N)*P))}for(let D of[0,.033])l(new Ut(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,D);let m=new Qe(.22,.014,.025),p=new ls(m,a,32),v=new Ze;for(let D=0;D<32;D++){let P=D*Math.PI/16;v.compose(new b(Math.cos(P)*.31,Math.sin(P)*.31,.021),new Pn().setFromAxisAngle(new b(0,0,1),P+.18),new b(1,1,1)),p.setMatrixAt(D,v)}e.add(p);let f=l(new Xe(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new Xe(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let D=0;D<10;D++){let P=D*Math.PI/5,U=l(new Xe(.017,.017,.015,12),s,Math.cos(P)*.18,Math.sin(P)*.18,.05);U.rotation.x=Math.PI/2;let N=l(new Xe(.009,.009,.018,6),a,Math.cos(P)*.18,Math.sin(P)*.18,.058);N.rotation.x=Math.PI/2}for(let D of[.235,.26,.31,.335,.39,.414])if(D<u){let P=l(new xt(D,.0012,3,96),a,0,0,.042);P.castShadow=!1}if(!t)for(let D=0;D<8;D++){let P=D*Math.PI/4,U=[.25,.29,.34,.395].map((j,V)=>new b(Math.cos(P+V*.075)*j,Math.sin(P+V*.075)*j,.043)),N=l(new Mt(new yt(U),12,.0024,3,!1),a);N.castShadow=!1}let _=new Wt;_.moveTo(-.08,-.2),_.quadraticCurveTo(-.13,-.15,-.115,-.06),_.lineTo(-.115,.1),_.quadraticCurveTo(-.12,.19,-.05,.215),_.lineTo(.055,.19),_.quadraticCurveTo(.11,.14,.105,.06),_.lineTo(.105,-.1),_.quadraticCurveTo(.1,-.19,.04,-.21),_.closePath();let y=l(new Ut(_,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&y.scale.set(.8,.8,.8),l(new Qe(.09,.31,.032),a,.27,0,.005);for(let D of[-.125,0,.125]){let P=l(new Xe(.055,.055,.028,24),c,.354,D,.07);P.rotation.x=Math.PI/2}for(let D of[-.155,.155]){let P=l(new Xe(.014,.014,.025,6),s,.325,D,.094);P.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let M=x.getContext("2d");M.fillStyle="#f5f0df",M.translate(64,192),M.rotate(-Math.PI/2),M.textAlign="center",M.font="italic bold 60px Arial",M.fillText(t?"P21":"P21 SPORT",0,20);let w=new Et(x);w.colorSpace=dt;let L=l(new Yt(.075,.24),new zn({map:w,transparent:!0,depthWrite:!1}),.329,0,.1);L.castShadow=!1;let z=l(new Xe(.012,.014,.047,6),s,.36,.217,.042);return z.rotation.z=.2,e}var ac;function Eu(r,e){if(!r.isConnected)return;if(!ac){let a=new Hn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=dt,a.toneMapping=ri,a.toneMappingExposure=1.15;let o=new yn;o.add(new Dn("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new wn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Vt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),ac={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=ac;s[e]||(s[e]=oc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Au(r){let e=new We;e.name="tyre-"+r;let t=new wt({color:"#15181b",roughness:.86}),n=new wt({color:"#050708",roughness:.96}),i=new wt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new it(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new yi([new ue(.56,-.19),new ue(.63,-.25),new ue(.72,-.23),new ue(.79,-.15),new ue(.8,-.1),new ue(.8,.1),new ue(.79,.15),new ue(.72,.23),new ue(.63,.25),new ue(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new xt(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,m=s(new Qe(.018,.036,.006),i);m.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),m.rotation.z=-d}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(d,m)=>{let p=-.2+m/15*.4,v=.8-.045*(Math.abs(p)/.2)**3,f=h+(o?.18:.08)*Math.sin(m/15*Math.PI);return new b(Math.sin(f)*v,Math.cos(f)*v,p)});s(new Mt(new yt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new xt(.798,.004,8,80),n);h.position.z=l}}return e}function Cu(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new b;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Pe(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new Ar({depthPacking:ro});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Ru(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new We;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(M,w,L)=>{let z=new it(M,w);return z.name=L,z.castShadow=z.receiveShadow=!0,c.add(z),z};for(let M=0;M<h;M++){let w=[],L=[];for(let U=0;U<=72;U++){let N=U/72*2-1,j=N*l/2,V=(M?a?.36:.46:.76)*(1-.22*N*N),te=(M?2.86+M*.055:3.02)-.13*N*N,ie=.43+M*.095+.1*Math.pow(Math.abs(N),3);for(let pe=0;pe<=28;pe++){let le=pe/28*Math.PI*2,_e=Math.cos(le);w.push(te+_e*V/2,ie+.035*(1-_e*_e)+Math.sin(le)*(M?.024:.035),j)}if(U<72)for(let pe=0;pe<28;pe++){let le=U*29+pe,_e=le+28+1;L.push(le,le+1,_e,le+1,_e+1,_e)}}let P=new pt;P.setAttribute("position",new Pe(w,3)),P.setIndex(L),P.computeVertexNormals(),u(P,M===0?n:t,"wing-element-"+M)}let d=[[1.06,1.06,1.22,.49],[1.3,1.1,1.04,.45],[1.65,1.13,.64,.37],[2.02,1.08,.43,.28],[2.39,.95,a?.34:.3,.2],[2.77,.79,a?.25:.2,.13],[3.13,.66,a?.19:.12,.075],[3.27,.64,a?.16:.075,.045]],m=[0,1,2,3].map(M=>new yt(d.map((w,L)=>new b(w[M],L,0)),!1,"catmullrom",.35)),p=[],v=[],f=96,g=48;for(let M=0;M<=f;M++){let w=M/f,[L,z,D,P]=m.map(U=>U.getPoint(w).x);for(let U=0;U<=g;U++){let N=U/g*Math.PI*2,j=Math.cos(N),V=Math.sin(N),te=a?.7:.82;p.push(L,z+Math.sign(V)*Math.pow(Math.abs(V),te)*P,Math.sign(j)*Math.pow(Math.abs(j),te)*D)}if(M<f)for(let U=0;U<g;U++){let N=M*(g+1)+U,j=N+1;v.push(N,N+g+1,j,j,N+g+1,j+g+1)}}let _=v.length;for(let M of[0,f]){let w=M*(g+1);for(let L=1;L<g-1;L++)M===0?v.push(w,w+L,w+L+1):v.push(w,w+L+1,w+L)}let y=new pt;y.setAttribute("position",new Pe(p,3)),y.setIndex(v),y.computeVertexNormals();let x=Math.floor(f*.89)*g*6;y.addGroup(0,x,0),y.addGroup(x,_-x,a?1:0),y.addGroup(_,v.length-_,0),u(y,[t,s],"tapered-nose");for(let M of[-1,1]){let w=u(new Qe(.19,.22,.035),n,"nose-pylon");w.position.set(3.02,.53,M*.1),w.rotation.z=-.15;let L=new Wt;L.moveTo(2.57,.38),L.lineTo(3.43,.38),L.quadraticCurveTo(3.53,.42,3.43,.61),L.lineTo(3.14,a?.95:.82),L.quadraticCurveTo(2.79,a?.97:.84,2.61,.69),L.closePath();let z=u(new Ut(L,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");z.position.z=M*l/2-.017,u(new Qe(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,M*(l/2+.055));let P=new yt([[2.65,.7],[2.9,a?.94:.81],[3.13,a?.94:.81],[3.4,.61]].map(([U,N])=>new b(U,N,M*(l/2+.025))));if(u(new Mt(P,28,.009,6,!1),s,"endplate-trim"),a)for(let U=0;U<3;U++){let N=u(new Qe(.27,.13,.018),n,"flow-fin");N.position.set(2.86+U*.07,.58+U*.07,M*(1.1+U*.1)),N.rotation.z=.15}}return c}function lc(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new _n;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new Ze().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function cc(r,{paint:e,carbon:t,metal:n}){let i=new We;i.name="rear-wing-"+r;let s=new We;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(g,_,y,x,M,w,L=i){let z=new it(g,_);return z.name=y,z.position.set(x,M,w),z.castShadow=z.receiveShadow=!0,L.add(z),z}function m(g,_,y,x,M){let w=new Wt;w.moveTo(-x*.5,0),w.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),w.quadraticCurveTo(x*.05,-.025,-x*.5,0);let L=new Ut(w,{depth:y,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});L.translate(0,0,-y/2);let z=d(L,M,"rear-wing-blade",g,_,0,s);z.rotation.z=-.08}if(m(0,l,h,u,o||r==="sport"?t:n),c&&m(.025,l+.23,h*.96,u*.7,t),a&&m(-.05,l-.18,h,.3,e),r!=="lip")for(let g of[-1,1])d(new Qe(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),g*h/2,s);let p=[];for(let g of[-.72,.72]){d(new Qe(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,g);for(let x of[-2.36,-2.22])d(new Xe(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,g);let _=d(new Qe(1,.075,.085),t,"rearward-mount-arm",0,1.015,g),y=d(new Qe(.085,1,.075),t,"rear-wing-upright",0,0,g);p.push({lower:_,post:y,z:g})}let v=lc([s],i).max.x;function f(g){let _=Math.min(-2.85,g&&!g.isEmpty()?g.min.x-.24-v:-2.85);s.position.x=_;for(let{lower:y,post:x}of p)y.position.x=(-2.29+_)/2,y.scale.x=Math.abs(_+2.29),x.position.set(_,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=_,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function Pu(r="classic"){let e=new We;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new wt({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new wt({color:"#161d23",roughness:.83,metalness:.15}),a=new wt({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,m,p=e){let v=new it(c,l);return v.name=h,v.position.set(u,d,m),v.castShadow=v.receiveShadow=!0,p.add(v),v}o(new Qe(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new Xe(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new Xe(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new b(.72,1.09,l),m=new b(1.1,1.31,l),p=m.clone().sub(d),v=d.clone().add(m).multiplyScalar(.5);o(new Qe(.055,p.length(),.035),i,c+"-lever",...v.toArray()).quaternion.setFromUnitVectors(new b(0,1,0),p.normalize());let g=c==="brake"?.24:.32,_=new Wt,y=h/2,x=g/2,M=.025;if(_.moveTo(-y+M,-x),_.lineTo(y-M,-x),_.quadraticCurveTo(y,-x,y,-x+M),_.lineTo(y,x-M),_.quadraticCurveTo(y,x,y-M,x),_.lineTo(-y+M,x),_.quadraticCurveTo(-y,x,-y,x-M),_.lineTo(-y,-x+M),_.quadraticCurveTo(-y,-x,-y+M,-x),n)for(let z of[-.065,0,.065])for(let D of c==="brake"?[-.055,.055]:[0]){let P=new dn;P.absarc(D,z,.014,0,Math.PI*2,!0),_.holes.push(P)}let w=o(new Ut(_,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);w.rotation.y=-Math.PI/2,w.rotation.z=-.18;for(let z of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new Qe(h*.76,.009,.007),n?a:i,c+"-grip",0,z,-.007,w);let L=Array.from({length:65},(z,D)=>{let P=D/64,U=P*Math.PI*12;return new b(.77+P*.23,1.095+P*.15+Math.sin(U)*.018,l+.045+Math.cos(U)*.018)});if(o(new Mt(new yt(L),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let z=o(new Xe(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);z.rotation.z=-1.05}}return e}function uc(r){let e=new We;e.name="sport-seat-"+r;let t=(P,U=.8,N=0)=>new xn({color:P,roughness:U,metalness:N,clearcoat:N?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),m=document.createElement("canvas");m.width=m.height=64;let p=m.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let P=0;P<64;P+=8)for(let U=0;U<64;U+=8)p.fillStyle=(U+P)%16?"#121820":"#626973",p.fillRect(U,P,7,3),p.fillStyle="#252b33",p.fillRect(U,P+4,3,4);let v=new Et(m);v.wrapS=v.wrapT=Zn,v.repeat.set(3,5),v.colorSpace=dt,c.map=v,c.bumpMap=v,c.bumpScale=.004;let f=(P,U,N=0,j=0,V=0,te=e)=>{let ie=new it(P,U);return ie.position.set(N,j,V),ie.castShadow=ie.receiveShadow=!0,te.add(ie),ie},g=(P,U,N,j,V,te,ie,pe,le=e)=>{let _e=new Wt,ee=-P/2,ce=-U/2;return j=Math.min(j,P/2,U/2,N/2),_e.moveTo(ee+j,ce),_e.lineTo(ee+P-j,ce),_e.quadraticCurveTo(ee+P,ce,ee+P,ce+j),_e.lineTo(ee+P,ce+U-j),_e.quadraticCurveTo(ee+P,ce+U,ee+P-j,ce+U),_e.lineTo(ee+j,ce+U),_e.quadraticCurveTo(ee,ce+U,ee,ce+U-j),_e.lineTo(ee,ce+j),_e.quadraticCurveTo(ee,ce,ee+j,ce),f(new Ut(_e,{depth:N-2*j,bevelEnabled:!0,bevelSize:j,bevelThickness:j,bevelSegments:4,curveSegments:12}),V,te,ie,pe-N/2+j,le)},_=(P,U,N,j=e)=>f(new Mt(new yt(P.map(V=>new b(...V))),32,U,6,!1),N,0,0,0,j),y=new We;y.rotation.x=-.14,y.position.set(0,.2,0),e.add(y);let x=new Wt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let P of[-.135,.135]){let U=new dn;U.moveTo(P-.075,1.24),U.lineTo(P+.075,1.24),U.lineTo(P+.075,1.34),U.lineTo(P-.075,1.34),U.closePath(),x.holes.push(U)}f(new Ut(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,y),f(new Ut(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,y).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,y),g(.46,.5,.12,.035,o,0,.85,.065,y),g(.45,.31,.17,.04,o,0,.4,.1,y);for(let P of[-1,1]){let U=g(.17,.42,.19,.055,a,P*.34,.98,.1,y);U.rotation.z=P*.28,U.rotation.y=-P*.25;let N=g(.13,.55,.23,.045,a,P*.3,.49,.14,y);N.rotation.z=-P*.12,_([[P*.27,.18,.28],[P*.34,.52,.28],[P*.4,.93,.24],[P*.3,1.17,.2]],.005,l,y);let j=P*.135;for(let V of[1.235,1.345])g(.16,.014,.022,.004,h,j,V,.015,y);for(let V of[j-.08,j+.08])g(.014,.12,.022,.004,h,V,1.29,.015,y)}let w=g(n?.86:.77,.045,.84,.012,c,0,.435,.34);w.name="seat-base";let L=g(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);L.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let P of[.2,.33,.46,.59])_([[-.23,.625,P],[0,.635,P+.015],[.23,.625,P]],.003,l);if(n){for(let P of[-1,1])g(.14,.13,.64,.04,a,P*.45,.65,.32),g(.045,.23,.1,.01,h,P*.45,.48,.16);for(let P=.45;P<1.1;P+=.15)for(let U of[-.1,.1])_([[U-.1,P,.18],[U,P+.07,.18],[U+.1,P,.18]],.003,l,y)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),_([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let P of[-1,1]){let U=g(.16,.26,.74,.055,a,P*(n?.365:.325),.54,.39);U.rotation.z=-P*.12,_([[P*.26,.63,.03],[P*.26,.66,.35],[P*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,P*.28,-.015,.34);for(let N of[.02,.65])g(.13,.09,.12,.015,c,P*.28,-.055,N),f(new Xe(.022,.022,.015,12),h,P*.28,-.002,N)}for(let P=.3;P<1.08;P+=.11)_([[-.19,P,.16],[0,P-.015,.17],[.19,P,.16]],.0025,l,y);for(let P of[-1,1]){let U=[[P*.135,1.5,-.13],[P*.135,1.15,-.03],[P*.13,.78,.08],[P*.1,.66,.4]],N=[],j=[];U.forEach(([pe,le,_e],ee)=>{N.push(pe-.033,le,_e,pe+.033,le,_e),ee&&j.push(ee*2-2,ee*2-1,ee*2,ee*2-1,ee*2+1,ee*2)});let V=new pt;V.setAttribute("position",new Pe(N,3)),V.setIndex(j),V.computeVertexNormals();let te=u.clone();te.side=Nt,f(V,te);let ie=g(.27,.055,.025,.008,u,P*.18,.64,.45);ie.rotation.z=-P*.2}let z=f(new Xe(.065,.065,.035,24),h,0,.66,.48);z.rotation.x=Math.PI/2;let D=f(new Xe(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);return D.rotation.x=Math.PI/2,e}var hc;function Iu(r,e){if(!r.isConnected||e==="none")return;if(!hc){let a=new Hn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=dt,a.toneMapping=ri,a.toneMappingExposure=1.25;let o=new yn;o.add(new Dn("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new wn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Vt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),hc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=hc;s[e]||(s[e]=uc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=wu;window.pokerPaintBrakePreview=Eu;window.pokerPaintSeatPreview=Iu;var Lu=(r,e,t)=>Math.max(e,Math.min(t,r));function Yp(r,e){let t=window.PokerGarage,n=new We;r.add(n),n.scale.set(1.24,.86,.95);let i=(S,C,F)=>new xn({color:S,metalness:C,roughness:F,clearcoat:C>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(S,C,F=0,$=0,O=0,oe=n){let X=new it(S,C);return X.position.set(F,$,O),X.castShadow=!0,X.receiveShadow=!0,oe.add(X),X}let v=(S,C,F,$,O,oe,X)=>p(new Qe(S,C,F),$,O,oe,X);function f(S,C,F,$,O,oe,X="y"){let se=p(new Xe(S,S,C,64),F,$,O,oe);return X==="z"&&(se.rotation.x=Math.PI/2),X==="x"&&(se.rotation.z=Math.PI/2),se}function g(S,C,F,$,O,oe,X="z"){let se=p(new xt(S,C,12,80),F,$,O,oe);return X==="y"&&(se.rotation.x=Math.PI/2),X==="x"&&(se.rotation.y=Math.PI/2),se}function _(S,C,F,$=Wt){let O=new $,oe=-S/2,X=-C/2;return F=Math.min(F,C/2-.001),O.moveTo(oe+F,X),O.lineTo(oe+S-F,X),O.quadraticCurveTo(oe+S,X,oe+S,X+F),O.lineTo(oe+S,X+C-F),O.quadraticCurveTo(oe+S,X+C,oe+S-F,X+C),O.lineTo(oe+F,X+C),O.quadraticCurveTo(oe,X+C,oe,X+C-F),O.lineTo(oe,X+F),O.quadraticCurveTo(oe,X,oe+F,X),O}function y(S,C,F,$,O,oe,X=null,se=.025){let fe=_(S,C,$);if(X){let me=_(X[0],X[1],X[2],dn),Le=new dn(me.getPoints(40).map(Q=>new ue(Q.x+(X[3]||0),Q.y)));fe.holes.push(Le)}let Ye=p(new Ut(fe,{depth:F,bevelEnabled:se>0,bevelSize:se,bevelThickness:se,bevelSegments:4,curveSegments:40}),O,0,oe,0);return Ye.rotation.x=-Math.PI/2,Ye}let x=[],M=n.children.length,w=[3.02,1.51,.65,-.28],L=_(4.96,2.44,1.15).getSpacedPoints(128),z=[],D=[],P=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[S,C]of P)for(let F=0;F<128;F++){let $=L[F];z.push($.x*C,S,-$.y*C)}for(let S=0;S<3;S++)for(let C=0;C<128;C++){let F=S*128+C,$=S*128+(C+1)%128;D.push(F,$,F+128,$,$+128,F+128)}let U=new pt;U.setAttribute("position",new Pe(z,3)),U.setIndex(D),U.computeVertexNormals(),s.side=Nt,p(U,s),y(5.03,2.51,.065,1.19,o,.58,null,.035),y(5.1,2.58,.09,1.22,o,1.25,w,.035);let N=new yt(_(4.94,2.42,1.15).getPoints(40).map(S=>new b(S.x,1.44,-S.y)),!0,"centripetal");p(new Mt(N,240,.125,16,!0),u);for(let S of[-1,1]){let C=Array.from({length:21},(F,$)=>{let O=.26+$*.25/20;return new b(1.32+1.15*Math.cos(O),1.44,S*(.06+1.15*Math.sin(O)))});p(new Mt(new yt(C),32,.132,20,!1),o)}y(4.65,2.14,.035,1.03,o,1.39,w,.015),y(4.52,2.01,.025,.97,a,1.43,w,.01),x.push(...n.children.slice(M));let j=y(2.98,1.47,.025,.63,a,.94);j.position.x=-.28;let V=new xn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Nt,polygonOffset:!0,polygonOffsetFactor:-1}),te=new Xi(_(2.9,1.4,.6)),ie=te.attributes.position,pe=te.attributes.uv;for(let S=0;S<ie.count;S++)pe.setXY(S,(ie.getX(S)+1.45)/2.9,(ie.getY(S)+.7)/1.4);let le=p(te,V,-.28,1.005,0);le.rotation.x=-Math.PI/2,le.castShadow=!1;let _e=V.clone(),ee=[];for(let S of[-1,1]){let C=p(new Yt(3.05,.3),_e,0,1.04,S*1.329);S<0&&(C.rotation.y=Math.PI),C.castShadow=!1,ee.push(C)}function ce(S){let C=S.vinyl||"none";le.visible=C!=="none",ee.forEach($=>$.visible=C!=="none");let F=C+":"+(S.vinylText||"");if(V.userData.id!==F){V.map?.dispose(),_e.map?.dispose(),V.map=new Et(t.vinylCanvas(C,!1,S.vinylText)),_e.map=new Et(t.vinylCanvas(C,!0,S.vinylText));for(let $ of[V,_e]){$.map.colorSpace=dt,$.map.anisotropy=16;let O=$.map;O.image.addEventListener("vinyl-ready",()=>{O.needsUpdate=!0},{once:!0}),$.needsUpdate=!0,$.userData.id=F}}}let Re=y(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);Re.position.x=-.28;let he=y(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);he.position.x=-.28;for(let S of[-1,-.35,.35])for(let C of[-.75,.75])v(.011,.4,.009,h,S,1.2,C);function xe(S,C){let F=document.createElement("canvas");F.width=F.height=256;let $=F.getContext("2d");$.fillStyle=S,$.fillRect(0,0,256,256);let O=17;for(let X=0;X<18e3;X++)O=O*1664525+1013904223>>>0,$.fillStyle="rgba(0,0,0,"+C+")",$.fillRect(O%256,(O>>>8)%256,1,1);let oe=new Et(F);return oe.colorSpace=dt,oe.wrapS=oe.wrapT=Zn,oe}a.map=xe("#e8e8e8",.035),a.bumpMap=xe("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=xe("#888888",.12),c.bumpScale=.003,u.bumpMap=xe("#888888",.3),u.bumpScale=.001;function ge(S,C,F,$,O,oe=!1,X=n){let se=new Wt;se.moveTo(0,.5),se.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),se.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),se.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),se.bezierCurveTo(.48,.12,.12,.28,0,.5),se.moveTo(-.12,-.3),se.lineTo(0,-.06),se.lineTo(.12,-.3),se.closePath();let fe=p(new Ut(se,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),C,F,$,O,X);return fe.scale.setScalar(S),oe&&(fe.rotation.y=Math.PI),fe}let Z=[],be=[],A=[],E=null;for(let S of[-1.72,1.72])for(let C of[-1,1]){let F=C*1.36,$=C*1.57,O=new We;O.position.set(S,.81,F),n.add(O),O.userData.groundWheel=!0;let oe=n.children.length,X=p(new yi([new ue(.56,-.19),new ue(.61,-.245),new ue(.67,-.25),new ue(.76,-.19),new ue(.8,-.1),new ue(.8,.1),new ue(.76,.19),new ue(.67,.25),new ue(.61,.245),new ue(.56,.19)],80),c,S,.81,F);X.rotation.x=Math.PI/2;for(let me=-2;me<=2;me++)g(.798-Math.abs(me)*.012,.0035,h,S,.81,F+me*.071);for(let me=0;me<28;me++){let Le=me*Math.PI/14,Q=Array.from({length:17},(ve,ze)=>{let Ae=ze/16,we=-.205+Ae*.41,Fe=.799-.044*Math.pow(Math.abs(we)/.205,3),st=Le+.13*Math.sin(Ae*Math.PI);return new b(S+Math.sin(st)*Fe,.81+Math.cos(st)*Fe,F+we)});p(new Mt(new yt(Q),20,.0045,5,!1),h)}for(let me of[-1,1])for(let Le of[.625,.654,.681])g(Le,.0035,h,S,.81,F+me*.244);let se=n.children.slice(oe);g(.548,.023,l,S,.81,$+C*.035),g(.505,.016,l,S,.81,$+C*.043),f(.14,.045,h,S,.81,$+C*.045,"z"),g(.14,.012,l,S,.81,$+C*.069);let fe=ge(.2,l,S,.8,$+C*.075,C<0);be.push(fe);for(let me of t.wheelDesign()){let Le=new yt(me.map(([Q,ve])=>new b(S+Q,.81+ve,$+C*(.04+.025*(1-Math.hypot(Q,ve)/.51)))));Z.push(p(new Mt(Le,20,.007,6,!1),l))}for(let me=0;me<20;me++){let Le=me*Math.PI/10;f(.006,.009,l,S+Math.sin(Le)*.526,.81+Math.cos(Le)*.526,$+C*.06,"z")}n.updateMatrixWorld(!0);for(let me of n.children.slice(oe))O.attach(me);O.scale.set(.88/1.24,.88/.86,1/.95),O.position.y=.715/.86;let Ye={standard:se};for(let me of["soft","medium","hard","semi","wet"]){let Le=Au(me);Le.visible=!1,O.add(Le),Ye[me]=[Le]}A.push({wheelGroup:O,x:S,out:$,sign:C,tyres:Ye})}let W=[];for(let S of[-1,1])W.push(v(1.35,.43,.04,o,.05,.94,S*1.3));for(let S of[-1,1]){let C=f(.275,.27,h,2.16,.945,S*.97,"z");g(.278,.035,o,2.16,.945,S*1.11)}for(let S of[-1.72,1.72])f(.07,2.8,h,S,.7,0,"z");v(3.6,.08,.8,h,0,.57,0);let G=[];function T(S,C,F){let $=document.createElement("canvas");$.width=S,$.height=C,F($.getContext("2d"),S,C);let O=new Et($);return O.colorSpace=dt,O.anisotropy=8,G.push(O),O}let I=T(768,256,(S,C,F)=>{S.fillStyle="#101b18",S.fillRect(0,0,C,F),S.strokeStyle="#d9b35b",S.lineWidth=7,S.strokeRect(10,10,C-20,F-20),S.fillStyle="#ebc66c",S.textAlign="center",S.font="italic 116px Georgia",S.fillText("Two Aces",C/2,137),S.font="38px Georgia",S.fillText("\u2660 Poker21 \u2660",C/2,209)}),k=[];for(let S of[-1,1]){let C=new xn({map:I,metalness:.55,roughness:.2,clearcoat:1});k.push(C);let F=p(new Yt(1.28,.4),C,.05,.94,S*1.326);C.userData.plane=F,S<0&&(F.rotation.y=Math.PI)}let B=[];for(let S of[-1,1])for(let C=0;C<3;C++){let F=new We;F.position.set((C-1)*.7+.05,1,S*1.365),S<0&&(F.rotation.y=Math.PI),n.add(F);let $=p(new Qe(.1,.1,.025),o,0,0,0,F),O=new wt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),oe=p(new Yt(.65,.65),O,0,0,.035,F);oe.castShadow=!1,oe.receiveShadow=!1,B.push({group:F,mat:O,back:$,n:C})}for(let S of[-1,1])for(let C of[-.54,.64])for(let F of[.78,1.1]){let $=f(.014,.018,o,C,F,S*1.35,"z")}let ae=n.children.length;for(let S of[-1.7,-.35,1.48])for(let C of[-1.21,1.21]){let F=f(.128,.13,o,S,1.44,C,"x")}for(let S of[-1.7,-.35,1.48])for(let C of[-1,1])g(.125,.004,h,S+.08,1.44,C*1.21,"x"),g(.125,.004,h,S-.08,1.44,C*1.21,"x");for(let S of[-1.7,-.35,1.48])for(let C of[-.96,.96])f(.135,.08,o,S,1.49,C),f(.108,.082,h,S,1.498,C),g(.125,.015,o,S,1.54,C,"y"),g(.111,.006,o,S,1.535,C,"y");let Y=[],K=[],Me=["#ab2338","#1b684b","#2455a5"].map(S=>i(S,.08,.55)),Ie=i("#eee9d6",.04,.6);for(let[S,C,F,$]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let O=0;O<$;O++){f(.104,.033,Me[F],S,1.49+O*.037,C);for(let oe=0;oe<6;oe++){let X=oe*Math.PI/3,se=v(.024,.021,.012,Ie,S+Math.cos(X)*.103,1.49+O*.037,C+Math.sin(X)*.103);se.rotation.y=Math.PI/2-X,se.castShadow=!1,se.receiveShadow=!1,Y.push(se)}if(O===$-1){let oe=new wt({transparent:!0,alphaTest:.1,roughness:.65}),X=p(new Yt(.208,.208),oe,S,1.511+O*.037,C);X.rotation.x=-Math.PI/2,X.castShadow=!1,X.receiveShadow=!1,K.push({mat:oe,n:F})}}x.push(...n.children.slice(ae));let ye=new We;ye.position.set(.89,1.96,0),ye.scale.set(1/1.24,1/.86,1/.95),n.add(ye);let Ce=new We;ye.add(Ce);let Ve=new b((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),de=new b(0,0,1),De=new b().crossVectors(Ve,de).normalize();Ce.quaternion.setFromRotationMatrix(new Ze().makeBasis(de,De,Ve));let Oe=u.clone();p(new xt(.53,.06,16,80),Oe,0,0,0,Ce),p(new xt(.473,.014,10,64),o,0,0,-.02,Ce);for(let S of[Math.PI]){let C=p(new Qe(.09,.39,.045),o,Math.sin(S)*.26,Math.cos(S)*.26,0,Ce);C.rotation.z=-S}for(let S of[-1,1]){let C=p(new Qe(.35,.075,.06),o,S*.265,0,0,Ce);p(new Qe(.32,.035,.064),h,S*.265,0,.006,Ce)}let je=p(new Xe(.195,.195,.075,64),o,0,0,.035,Ce);je.rotation.x=Math.PI/2;let Te=p(new Gn(.177,64),new wt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Ce);Te.receiveShadow=!1,ge(.38,o,0,-.025,.105,!1,Ce);let Ee={classic:new We,sport:new We,formula:new We};for(let S of Ce.children.slice())Ee.classic.add(S);Object.values(Ee).forEach(S=>Ce.add(S));function ke(S,C,F,$){let O=new yt(C.map(([oe,X])=>new b(oe,X,0)),!0);p(new Mt(O,72,F,12,!0),$,0,0,0,S)}ke(Ee.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Oe);for(let S of[-1,1])p(new Qe(.35,.065,.045),l,S*.27,0,0,Ee.sport),p(new Qe(.065,.3,.045),l,S*.12,-.22,0,Ee.sport);p(new xt(.5,.018,8,64,.22),d,0,0,.005,Ee.sport),ke(Ee.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Oe),p(new Qe(.6,.23,.065),h,0,0,0,Ee.formula);for(let S of[-1,1])p(new an(.035,12,8),d,S*.25,.055,.06,Ee.formula),p(new Qe(.08,.29,.025),l,S*.37,0,-.07,Ee.formula);for(let S of["sport","formula"]){let C=p(new Xe(.15,.15,.07,48),l,0,0,.035,Ee[S]);C.rotation.x=Math.PI/2,p(new Gn(.13,48),h,0,0,.078,Ee[S]),ge(.25,l,0,-.018,.09,!1,Ee[S])}for(let[S,C]of Object.entries(t.steeringDesigns)){let F=new We;Ce.add(F),Ee[S]=F;let $=i(C.color,S==="woodHeritage"?.3:.55,.35);C.shape==="round"?p(new xt(.53,.065,16,80),$,0,0,0,F):C.shape==="flat"?ke(F,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,$):re([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,$,F);for(let oe=0;oe<C.spokes;oe++){let X=oe*Math.PI*2/C.spokes,se=p(new Qe(.39,.065,.05),l,Math.cos(X)*.25,Math.sin(X)*.25,.015,F);se.rotation.z=X}let O=p(new Xe(.15,.15,.075,40),h,0,0,.05,F);O.rotation.x=Math.PI/2,ge(.23,l,0,-.015,.095,!1,F),p(new Qe(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,F)}let It=i("#b9ab8a",.15,.8),Ge=i("#171c20",.02,.85);for(let[S,C]of Object.entries(Ee)){let F=S==="classic"?.53:S==="sport"?.51:.47;for(let O of[-1,1]){if(S!=="formula"){let oe=p(new xt(F,.072,12,30,.64),Ge,0,0,.003,C);oe.rotation.z=O<0?Math.PI-.32:-.32}for(let oe=0;oe<9;oe++){let X=(O<0?Math.PI:0)-.28+oe*.07;p(new an(.007,6,4),It,Math.cos(X)*(F-.045),Math.sin(X)*(F-.045),.063,C)}}let $=p(new Qe(.065,.1,.035),S==="classic"?o:d,0,S==="formula"?.16:.51,.045,C);for(let O=0;O<6;O++){let oe=O*Math.PI/3,X=p(new Xe(.012,.012,.012,6),l,Math.cos(oe)*.13,Math.sin(oe)*.13,.099,C);X.rotation.x=Math.PI/2}}let mt=new b(1.3,1.48,0),rt=new b(.89,1.96,0),nn=rt.clone().sub(mt),on=mt.clone().add(rt).multiplyScalar(.5),H=v(.12,nn.length(),.095,o,...on.toArray());H.quaternion.setFromUnitVectors(new b(0,1,0),nn.normalize()),v(.075,H.geometry.parameters.height-.04,.1,h,...on.toArray()).quaternion.copy(H.quaternion);let gt=-1.84,lt=1.99,Wn=.74,St=new We;St.name="garage-turbine-primary",St.position.set(gt,lt,0),n.add(St);let Xt=n.children.length;f(Wn,.51,o,gt,lt,0,"z"),f(.67,.54,h,gt,lt,0,"z");for(let S of[-1,1]){let C=S*.29;g(.72,.055,h,gt,lt,C),g(.75,.022,o,gt,lt,C+S*.03),g(.665,.012,d,gt,lt,C+S*.025);for(let F=0;F<14;F++){let $=F*Math.PI/7,O=[],oe=[];for(let fe=0;fe<=16;fe++){let Ye=fe/16,me=.22+Ye*.44,Le=$+.55*Ye;for(let Q of[-.15,.15])O.push(gt+Math.sin(Le+Q)*me,lt+Math.cos(Le+Q)*me,C+S*(.018+Math.sin(Ye*Math.PI)*.12))}for(let fe=0;fe<16;fe++){let Ye=fe*2;oe.push(Ye,Ye+1,Ye+2,Ye+1,Ye+3,Ye+2)}let X=new pt;X.setAttribute("position",new Pe(O,3)),X.setIndex(oe),X.computeVertexNormals(),m.side=Nt,p(X,m);let se=new yt(Array.from({length:17},(fe,Ye)=>{let me=Ye/16,Le=.22+me*.44,Q=$+.55*me-.15;return new b(gt+Math.sin(Q)*Le,lt+Math.cos(Q)*Le,C+S*(.025+Math.sin(me*Math.PI)*.12))}));p(new Mt(se,20,.009,6,!1),d)}f(.215,.07,o,gt,lt,C+S*.085,"z"),f(.18,.085,h,gt,lt,C+S*.11,"z")}for(let S=0;S<12;S++){let C=S*Math.PI/6,F=v(.045,.15,.2,h,gt+Math.cos(C)*.735,lt+Math.sin(C)*.735,0);F.rotation.z=C}n.updateMatrixWorld(!0);for(let S of n.children.slice(Xt))St.attach(S);St.rotation.set(0,Math.PI/2,0),St.scale.set(.96/1.24,.96/.86,.96/.95);let nt=St.clone(!0);nt.name="garage-turbine-secondary",n.add(nt);let Zt=new We;St.add(Zt);let Ot=i("#829aaa",.92,.24);for(let S of[-.24,-.08,.08,.24])p(new xt(.765,.028,10,80),Ot,0,0,S,Zt);for(let S=0;S<8;S++){let C=S*Math.PI/4,F=p(new Xe(.025,.025,.025,6),Ot,Math.sin(C)*.73,Math.cos(C)*.73,.35,Zt);F.rotation.x=Math.PI/2}let jt={classic:new We,dual:new We,titanium:new We},$t=i("#a9b7c4",.92,.23),Bt=i("#668bb5",.88,.25);Object.values(jt).forEach(S=>n.add(S));for(let[S,C]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let F of C){let $=S==="titanium"?Bt:$t,O=p(new Xe(.105,.105,.5,32),$,-2.42,.76,F,jt[S]);O.rotation.z=Math.PI/2;let oe=p(new Xe(.079,.079,.012,32),h,-2.678,.76,F,jt[S]);oe.rotation.z=Math.PI/2;let X=p(new xt(.094,.012,8,32),$,-2.69,.76,F,jt[S]);X.rotation.y=Math.PI/2}for(let[S,C]of Object.entries(jt)){let F=S==="classic"?[0]:[-.67,.67];for(let O of F){let oe=p(new Xe(.18,.18,.52,40),$t,-2.19,.76,O,C);oe.rotation.z=Math.PI/2;for(let X of[-2.36,-2.04]){let se=p(new xt(.184,.016,8,40),h,X,.76,O,C);se.rotation.y=Math.PI/2,p(new Qe(.07,.19,.07),$t,X,.94,O,C)}}let $=S==="classic"?[0]:S==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let O of $){let oe=p(new Xe(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,O,C);oe.rotation.z=Math.PI/2;let X=p(new xt(.107,.018,10,40),S==="titanium"?Bt:$t,-2.57,.76,O,C);if(X.rotation.y=Math.PI/2,S==="titanium")for(let[se,fe]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let Ye=p(new xt(.106,.008,6,40),i(fe,.85,.3),se,.76,O,C);Ye.rotation.y=Math.PI/2}}}for(let S of[-1,1]){let C=new yt([new b(-2.16,1.46,S*.65),new b(-1.94,1.66,S*.69),new b(-1.3,1.59,S*.64),new b(-.98,1.47,S*.7)]);p(new Mt(C,32,.022,8,!1),o),v(.34,.06,.14,o,-1.84,1.48,S*.4)}for(let S of[-1,1]){let C=new yt([new b(-2.45,1.1,S*.7),new b(-2.43,1.36,S*.72),new b(-2.19,1.55,S*.7),new b(-1.9,1.55,S*.68)]);p(new Mt(C,40,.075,14,!1),h),p(new Mt(C,40,.019,10,!1),o);for(let F of[-2.2,-1.96]){let $=new yt([new b(F,1.43,S*.48),new b(F,1.63,S*.6),new b(F+.24,1.57,S*.82)]);p(new Mt($,24,.017,8,!1),o)}}let mn=n.children.length,Mn=[],fn=[],li=[];for(let S=0;S<=48;S++){let C=-.92+S*1.84/48;for(let F of[.64,1.23])fn.push(2.57-.28*(Math.sin(C)*1.25/1.1)**2,F,Math.sin(C)*1.25)}for(let S=0;S<48;S++){let C=S*2;li.push(C,C+2,C+1,C+1,C+2,C+3)}let gn=new pt;gn.setAttribute("position",new Pe(fn,3)),gn.setIndex(li),gn.computeVertexNormals();let qt=i("#00453f",.72,.14);qt.clearcoat=1,qt.side=Nt,p(gn,qt);for(let S of[.635,1.225]){let C=Array.from({length:65},(F,$)=>{let O=-1.04+$*2.08/64;return new b(2.57-.28*(O/1.1)**2,S,O)});p(new Mt(new yt(C),80,.034,12,!1),o)}for(let S of[-1,1]){let C=S*1,F=2.57-.28*(C/1.1)**2,$=new yt([new b(F-.04,.635,C),new b(F+.05,.78,C),new b(F+.065,1.12,C),new b(F-.04,1.25,C)]);p(new Mt($,32,.065,12,!1),o);for(let O of[.91,1.065]){let oe=Array.from({length:16},(X,se)=>{let fe=S*(.51+se*.41/15);return new b(2.57-.28*(fe/1.1)**2+.018,O,fe)});Mn.push(p(new Mt(new yt(oe),24,.017,8,!1),d))}}let Ni=[];for(let S=0;S<2;S++){let C=new Et(t.cardCanvas(e.cards,S));C.colorSpace=dt,C.anisotropy=16;let F=new zn({map:C,transparent:!0,toneMapped:!1});Ni.push(F);let $=1.65,O=S?.34:-.34,oe=v(.47,.008,.63,i("#ddd9cf",0,.95),$,1.474+S*.003,O);oe.rotation.y=-(S?-.08:.08);let X=p(new Yt(.5,.67),F,$,1.48+S*.003,O);X.rotation.x=-Math.PI/2,X.rotation.z=S?-.08:.08,X.castShadow=!1,X.receiveShadow=!1}x.push(...n.children.slice(mn));let Xn=new wt({map:new Et(t.plateCanvas(e)),roughness:.6});for(let S of[-1,1]){let C=p(new Yt(.79,.463),Xn,S*2.605,1.01,0);C.rotation.y=S*Math.PI/2,S>0&&x.push(C)}let vt={},Gt=i("#7d8c98",.82,.28),Tt=i("#202a32",.45,.38),R=i("#a7c6d5",.98,.055),q=i("#182029",.35,.48);q.bumpMap=xe("#888888",.2),q.bumpScale=.001;function J(S,C,F,$,O,oe,X,se,fe){let Ye=new Ut(_(S,C,$),{depth:F,bevelEnabled:!0,bevelSize:Math.min(.012,F*.2),bevelThickness:Math.min(.012,F*.2),bevelSegments:3,curveSegments:12});return Ye.translate(0,0,-F/2),p(Ye,O,oe,X,se,fe)}function re(S,C,F,$){return p(new Mt(new yt(S.map(O=>new b(...O))),40,C,12,!1),F,0,0,0,$)}function ne(S,C,F,$){let O=p(new Xe(.014,.014,.014,6),Gt,S,C,F,$);O.rotation.x=Math.PI/2}function Se(S,C,F,$,O,oe){let X=new Wt;X.moveTo(-$*.5,0),X.bezierCurveTo(-$*.52,.055,-$*.12,.07,$*.5,.008),X.quadraticCurveTo($*.05,-.025,-$*.5,0);let se=new Ut(X,{depth:F,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});se.translate(0,0,-F/2);let fe=p(se,O,S,C,0,oe);return fe.rotation.z=-.08,fe}for(let S of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){vt[S]={};for(let C of S==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let F=new We;n.add(F),vt[S][C]=F;let $=["sport","aero"].includes(C)?q:Gt;if(S==="spoiler"){n.remove(F);let O=cc(C,{paint:s,carbon:q,metal:Gt});n.add(O),vt.spoiler[C]=O;continue}if(S==="mirrors")for(let O of[-1,1]){let oe=C==="aero",X=oe?1.77:1.86,se=O*(oe?1.47:1.53),fe=.77;J(.18,.08,.15,.035,Tt,.64,1.46,O*1.19,F),re([[.64,1.47,O*1.19],[.62,1.62,O*1.32],[fe,X-.07,se]],oe?.023:.029,$,F);let Ye=p(new an(.046,16,12),Tt,fe,X-.065,se,F);if(C==="round"){p(new an(1,32,20),Gt,fe,X,se,F).scale.set(.065,.15,.15);let Le=p(new Gn(.13,48),R,fe-.056,X,se,F);Le.rotation.y=-Math.PI/2,Le.castShadow=!1;let Q=p(new xt(.136,.009,8,48),Gt,fe-.06,X,se,F);Q.rotation.y=Math.PI/2}else{let me=oe?.31:C==="sport"?.35:.38,Le=oe?.16:.22,Q=J(me,Le,.095,.065,C==="club"?Tt:q,fe,X,se,F);Q.rotation.y=Math.PI/2;let ve=p(new Xi(_(me-.045,Le-.035,.05)),R,fe-.061,X,se,F);ve.rotation.y=-Math.PI/2,ve.castShadow=!1,ve.receiveShadow=!1;let ze=_(me-.028,Le-.018,.055).getPoints(24).map(Ae=>[fe-.058,X+Ae.y,se+Ae.x]);ze.push(ze[0]),re(ze,.006,Gt,F)}}else if(S==="sideSkirts")for(let O of[-1,1]){let oe=J(2.3,C==="aero"?.17:.12,C==="rally"?.27:.13,.05,$,0,.59,O*1.24,F);if(C==="rally")for(let X of[-.84,-.42,0,.42,.84]){let se=J(.13,.018,.25,.018,Tt,X,.67,O*1.24,F)}else re([[-1.08,.54,O*1.3],[0,.53,O*1.32],[1.08,.54,O*1.3]],.009,d,F);for(let X of[-.87,.87])J(.12,.14,.16,.025,Tt,X,.65,O*1.2,F),ne(X,.61,O*1.33,F);if(C==="aero")for(let X of[-.95,.95]){let se=J(.24,.12,.025,.025,q,X,.57,O*1.35,F);se.rotation.z=X>0?.2:-.2}}else{let O=S==="frontBumper"?1:-1,oe=[[O*2.26,.66,-.92],[O*2.58,.65,-.7],[O*2.67,.65,0],[O*2.58,.65,.7],[O*2.26,.66,.92]];re(oe,C==="sport"?.061:.047,$,F);for(let X of[-.67,.67]){re([[O*2.31,.74,X],[O*2.5,.68,X]],.032,Tt,F);let se=J(.16,.12,.13,.035,Tt,O*2.51,.67,X,F)}if(C==="aero"){let X=J(.38,.045,1.94,.07,q,O*2.48,.5,0,F);for(let se of[-.7,-.27,.27,.7])J(.27,.12,.022,.025,Tt,O*2.48,.55,se,F);re([[O*2.4,.52,-.91],[O*2.64,.52,0],[O*2.4,.52,.91]],.008,Gt,F)}if(C==="rally")for(let X of[-.72,.72])re([[O*2.53,.65,X-.14],[O*2.56,.94,X-.14],[O*2.55,1.04,X],[O*2.56,.94,X+.14],[O*2.53,.65,X+.14]],.036,Gt,F);if(C==="sport")for(let X of[-.67,.67]){let se=J(.2,.13,.14,.045,Tt,O*2.56,.66,X,F)}if(S==="rearBumper"&&C==="aero")for(let X of[-.7,-.35,0,.35,.7]){let se=J(.27,.15,.025,.025,q,-2.46,.48,X,F);se.rotation.z=.12}}}}let Ne=i("#b9e4f5",.28,.17);Ne.emissive.set("#b9e4f5"),Ne.emissiveIntensity=1.8;let Be=i("#ffdda0",.2,.2);Be.emissive.set("#ffe0a8"),Be.emissiveIntensity=1.25;for(let S of["frontBumper","rearBumper"])for(let[C,F,$]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let O=new We;n.add(O),vt[S][C]=O;let oe=S==="frontBumper"?1:-1,X=C==="trackGT"?.34:.29,se=.59,fe=_(F,X,.1);for(let[Ae,we]of[[0,.94],[-.79,.32],[.79,.32]]){let Fe=_(we,.115,.045,dn);fe.holes.push(new dn(Fe.getPoints(24).map(st=>new ue(st.x+Ae,st.y))))}let Ye=new Ut(fe,{depth:$,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),me=Ye.attributes.position;for(let Ae=0;Ae<me.count;Ae++){let we=me.getX(Ae),Fe=me.getY(Ae),st=me.getZ(Ae);me.setXYZ(Ae,oe*(2.43+st-.24*(we/(F/2))**2),se+Fe,we)}Ye.computeVertexNormals(),p(Ye,s,0,0,0,O);for(let[Ae,we]of[[0,.94],[-.79,.32],[.79,.32]]){let Fe=oe*(2.43-.24*(Ae/(F/2))**2);J(.025,.14,we+.02,.04,h,Fe,se,Ae,O);for(let st of[-.032,.012,.045])J(.012,.006,we-.035,.003,Tt,Fe+oe*.022,se+st,Ae,O)}let Le=Array.from({length:41},(Ae,we)=>{let Fe=-F/2+we*F/40;return[oe*(2.44+$+.045-.24*(Fe/(F/2))**2),se-X/2-.025,Fe]});re(Le,C==="trackGT"?.028:.019,q,O);let Q=new pt,ve=[],ze=[];for(let[Ae,we,Fe]of Le)ve.push(Ae,we,Fe,Ae-oe*.17,we+.005,Fe);for(let Ae=0;Ae<40;Ae++){let we=Ae*2;ze.push(we,we+1,we+2,we+1,we+3,we+2)}if(Q.setAttribute("position",new Pe(ve,3)),Q.setIndex(ze),Q.computeVertexNormals(),p(Q,q,0,0,0,O),S==="rearBumper")for(let Ae=0;Ae<(C==="trackGT"?5:3);Ae++){let we=(Ae-(C==="trackGT"?2:1))*.3,Fe=J(.24,.075,.014,.008,q,-2.48,se-X/2-.035,we,O);Fe.rotation.z=-.12}else if(C==="trackGT")for(let Ae of[-.92,.92]){let we=J(.18,.05,.018,.008,q,2.43,se-X/2,Ae,O);we.rotation.z=.08}}for(let S of["formula","formulaPro","formulaElite"]){let C=Ru(S,{paint:s,carbon:q,metal:Gt,accent:o});n.add(C),vt.frontBumper[S]=C}for(let S of["rearBumper","sideSkirts","spoiler"])for(let C of["formula","formulaPro"]){let F=new We;F.name=S+"-"+C,n.add(F),vt[S][C]=F;let $=C==="formulaPro";if(S==="rearBumper"){J(.48,.16,$?2.3:2.05,.03,q,-2.47,.45,0,F);for(let O=-3;O<=3;O++){let oe=J(.64,.23,.025,.01,q,-2.48,.44,O*.3,F);oe.rotation.z=-.15}for(let O of[-1,1])re([[-2.2,.54,O*1],[-2.65,.62,O*1.1]],.025,s,F)}else if(S==="sideSkirts")for(let O of[-1,1]){let oe=J(2.35,$?.42:.33,.34,.08,s,-.15,.83,O*1.3,F);oe.rotation.z=-.045,J(2.65,.055,.48,.025,q,-.06,.58,O*1.3,F),J(.07,.21,.24,.035,h,.96,.87,O*1.3,F);for(let X=0;X<($?3:1);X++)J(.35,.11,.025,.01,q,.48-X*.32,.65,O*1.53,F)}else{n.remove(F);let O=cc(C,{paint:s,carbon:q,metal:Gt});n.add(O),vt.spoiler[C]=O}}vt.headlights={};for(let S of["round","projector","rally","matrix"]){let C=new We;n.add(C),vt.headlights[S]=C;for(let F of[-1,1]){let $=F*.74,O=2.57-.28*($/1.1)**2+.07,oe=1.075;if(S==="matrix"){let X=J(.4,.2,.075,.045,Tt,O,oe,$,C);X.rotation.y=Math.PI/2;let se=J(.35,.15,.01,.035,h,O+.05,oe,$,C);se.rotation.y=Math.PI/2;for(let fe=0;fe<4;fe++){let Ye=J(.06,.1,.012,.017,Ne,O+.065,oe,$-.128+fe*.085,C);Ye.rotation.y=Math.PI/2,Ye.castShadow=!1}}else{let X=S==="rally"?.16:S==="round"?.14:.135,se=p(new Xe(X+.027,X+.02,.095,48),Tt,O,oe,$,C);se.rotation.z=Math.PI/2;let fe=p(new xt(X+.008,.01,10,48),Gt,O+.054,oe,$,C);fe.rotation.y=Math.PI/2;let Ye=p(new an(1,32,20),S==="round"||S==="rally"?Be:Ne,O+.055,oe,$,C);if(Ye.scale.set(.025,X,X),Ye.castShadow=!1,S==="projector"){let me=p(new xt(X*.8,.008,8,48),Ne,O+.076,oe,$,C);me.rotation.y=Math.PI/2,p(new an(1,24,16),R,O+.081,oe,$,C).scale.set(.022,X*.53,X*.53)}if(S==="rally")for(let me of[-.07,0,.07]){let Le=Math.sqrt(X*X-me*me);re([[O+.09,oe-Le,$+me],[O+.1,oe,$+me],[O+.09,oe+Le,$+me]],.009,Tt,C)}}}}for(let[S,C]of Object.entries(t.streetHeadlights)){let F=new We;n.add(F),vt.headlights[S]=F;let $=i(C.color,.12,.22);$.emissive.set(C.color),$.emissiveIntensity=C.smoke?.35:1.1;let O=i(C.smoke?"#1c3348":"#83b6d5",.45,.12);for(let oe of[-1,1]){let X=oe*.72,se=2.57-.28*(X/1.1)**2+.07,fe=1.075;if(C.shape==="sportHousing"){let Le=new Wt;Le.moveTo(-.29,.12),Le.lineTo(.23,.09),Le.quadraticCurveTo(.32,.02,.26,-.13),Le.lineTo(-.25,-.14),Le.closePath();let Q=p(new Ut(Le,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),Tt,se+.02,fe,X,F);Q.rotation.y=Math.PI/2;for(let ve=0;ve<2;ve++){let ze=X+(ve-.5)*.24;if(p(new an(1,24,16),O,se+.13,fe,ze,F).scale.set(.022,.067,.067),C.signature==="rings"){let we=p(new xt(.086,.01,10,48),$,se+.155,fe,ze,F);we.rotation.y=Math.PI/2}if(C.signature==="doubleL"&&re([[se+.155,fe+.075,ze-.085],[se+.155,fe-.075,ze-.085],[se+.155,fe-.075,ze+.075]],.012,$,F),C.signature==="pixels")for(let we=0;we<3;we++)p(new Qe(.014,.026,.026),$,se+.155,fe+.09,ze-.055+we*.055,F)}C.signature==="arc"&&re([[se+.155,fe-.09,X-.25],[se+.155,fe+.1,X-.25],[se+.155,fe+.12,X],[se+.155,fe+.07,X+.25]],.012,$,F);continue}let Ye=J(.47,.25,.1,.04,Tt,se,fe,X,F);Ye.rotation.y=Math.PI/2;for(let Le of[-.18,.18]){p(new Qe(.1,.07,.035),Gt,se-.035,fe-.15,X+Le,F);let Q=p(new Xe(.012,.012,.018,12),o,se+.02,fe-.13,X+Le,F);Q.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(C.shape)){let Le=C.shape==="doubleU"?2:1;for(let Q=0;Q<Le;Q++){let ve=X+(Q-(Le-1)/2)*.21;if(p(new an(1,24,16),O,se+.073,fe,ve,F).scale.set(.019,.067,.067),C.shape==="doubleU")re([[se+.1,fe+.075,ve-.08],[se+.1,fe-.04,ve-.08],[se+.1,fe-.08,ve-.045],[se+.1,fe-.08,ve+.045],[se+.1,fe-.04,ve+.08],[se+.1,fe+.075,ve+.08]],.01,$,F);else if(C.shape==="brow"){re([[se+.1,fe+.055,ve-.19],[se+.1,fe+.093,ve-.14],[se+.1,fe+.093,ve+.19]],.011,$,F);let Ae=p(new xt(.068,.006,8,32),$,se+.095,fe-.015,ve,F);Ae.rotation.y=Math.PI/2}else for(let Ae=0;Ae<3;Ae++){let we=Ae*Math.PI*2/3-Math.PI/2;re([[se+.102,fe+Math.sin(we)*.025,ve+Math.cos(we)*.025],[se+.102,fe+Math.sin(we)*.1,ve+Math.cos(we)*.1]],.011,$,F)}}continue}if(C.shape==="bar"){for(let[Le,Q,ve]of[[.035,.41,.025],[-.045,.33,.012]]){let ze=J(Q,ve,.014,.006,$,se+.064,fe+Le,X,F);ze.rotation.y=Math.PI/2,ze.castShadow=!1}continue}if(C.shape==="square"){let Le=J(.37,.17,.024,.015,$,se+.065,fe,X,F);Le.rotation.y=Math.PI/2;for(let Q=0;Q<7;Q++)p(new Qe(.006,.16,.004),O,se+.082,fe,X-.15+Q*.05,F);continue}let me=C.count===3?.062:C.count===2?.087:.106;for(let Le=0;Le<C.count;Le++){let Q=X+(Le-(C.count-1)/2)*(C.count===3?.14:.205),ve=p(new Xe(me+.014,me+.02,.09,C.shape==="hex"?6:40),h,se+.035,fe,Q,F);ve.rotation.z=Math.PI/2;let ze=p(new xt(me,.009,8,C.shape==="hex"?6:48),$,se+.09,fe,Q,F);ze.rotation.y=Math.PI/2,ze.castShadow=!1;let Ae=p(new an(1,24,16),C.projector?O:$,se+.077,fe,Q,F);if(Ae.scale.set(.018,me*.74,me*.74),Ae.castShadow=!1,C.projector&&p(new an(1,16,12),$,se+.092,fe,Q,F).scale.set(.006,me*.31,me*.31),C.cross||C.guard)for(let we of[-1,1])re([[se+.11,fe-me*.74,Q-we*me*.74],[se+.115,fe,Q],[se+.11,fe+me*.74,Q+we*me*.74]],.009,Tt,F)}}}let qe={};for(let S of["club","sport","rally","chrome"]){let C=[];qe[S]=C;for(let{wheelGroup:F,sign:$}of A){let O=new We;F.add(O),C.push(O);let oe=S==="rally"?.91:.87,X=S==="rally"?.64:S==="sport"?.49:.57,se=S==="sport"?1:1.23,fe=[],Ye=[];for(let ve=0;ve<=48;ve++){let ze=-se+ve*se*2/48;for(let Ae of[-X/2,X/2])fe.push(Math.sin(ze)*oe,Math.cos(ze)*oe,Ae)}for(let ve=0;ve<48;ve++){let ze=ve*2;Ye.push(ze,ze+1,ze+2,ze+1,ze+3,ze+2)}let me=new pt;me.setAttribute("position",new Pe(fe,3)),me.setIndex(Ye),me.computeVertexNormals();let Q=(S==="chrome"?Gt:S==="club"?s:q).clone();Q.side=Nt,p(me,Q,0,0,0,O);for(let ve of[-1,1]){let ze=Array.from({length:49},(Ae,we)=>{let Fe=-se+we*se*2/48;return[Math.sin(Fe)*oe,Math.cos(Fe)*oe,ve*X/2]});re(ze,.012,S==="chrome"?Gt:Tt,O)}for(let ve of[-1,1])re([[0,0,-$*.28],[ve*.28,.42,-$*.31],[ve*.49,.68,-$*.31]],.022,Tt,O),ne(ve*.49,.68,-$*.32,O);if(S==="rally"){let ve=J(.13,.25,X*.9,.025,Tt,-.83,.2,0,O)}O.userData.shell=Q}}vt.windshield={};for(let[S,C,F,$]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let oe=function(Ae,we){let Fe=.92*(1-.13*we),st=1-Ae*Ae;return[1.97+.23*st-C*.32*we,1.5+C*we*(.84+.16*st),Ae*Fe]},O=new We;n.add(O),vt.windshield[S]=O;let X=[],se=[],fe=40,Ye=16;for(let Ae=0;Ae<=Ye;Ae++)for(let we=0;we<=fe;we++)X.push(...oe(-1+we*2/fe,Ae/Ye));for(let Ae=0;Ae<Ye;Ae++)for(let we=0;we<fe;we++){let Fe=Ae*(fe+1)+we;se.push(Fe,Fe+1,Fe+fe+1,Fe+1,Fe+fe+2,Fe+fe+1)}let me=new pt;me.setAttribute("position",new Pe(X,3)),me.setIndex(se),me.computeVertexNormals();let Le=new xn({color:F,metalness:.05,roughness:.075,transparent:!0,opacity:$,depthWrite:!1,side:Nt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});O.userData.glass=Le,O.userData.originalTint={color:F,opacity:$};let Q=p(me,Le,0,0,0,O);Q.castShadow=!1,Q.receiveShadow=!1,Q.renderOrder=3;let ve=["smoke","highSmoke"].includes(S)?Tt:Gt;for(let Ae of[0,1])re(Array.from({length:41},(we,Fe)=>oe(-1+Fe/20,Ae)),Ae===0?.017:.009,ve,O);for(let Ae of[-1,1]){re(Array.from({length:17},(st,ln)=>oe(Ae,ln/16)),.011,ve,O);let we=oe(Ae,0);J(.19,.055,.14,.025,Tt,we[0],we[1]-.025,we[2],O);let Fe=p(new Xe(.013,.013,.018,6),Gt,we[0]+.04,we[1]+.014,we[2],O)}let ze=new zn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let Ae of[-.77,-.69]){let we=Array.from({length:13},(st,ln)=>{let Pt=oe(Ae,.18+ln*.058);return Pt[0]+=.004,Pt}),Fe=re(we,.003,ze,O);Fe.castShadow=!1,Fe.receiveShadow=!1,Fe.renderOrder=4}}let Je=new We;for(let S of n.children.slice())S.userData.groundWheel||Je.add(S);n.add(Je);let et=i("#b8c7d6",.72,.27),$e=new We,at=[];n.add($e);for(let S of[-1.72,1.72])for(let C of[-1,1]){let F=new We;F.position.set(S,.52,C*1.12),$e.add(F);let $=Array.from({length:193},(Le,Q)=>{let ve=Q/192,ze=ve*Math.PI*14;return new b(Math.cos(ze)*.071,.055+ve*.36,Math.sin(ze)*.071)}),O=p(new Mt(new yt($),192,.014,10,!1),et,0,0,0,F);p(new Xe(.039,.039,.23,24),Tt,0,.14,0,F);let oe=p(new Xe(.018,.018,.28,20),Gt,0,.34,0,F),X=new We;X.position.y=.47,F.add(X);for(let[Le,Q]of[[F,.04],[X,-.015]])p(new Xe(.095,.095,.026,32),Gt,0,Q,0,Le),p(new Xe(.068,.068,.018,24),Tt,0,Q+.02,0,Le);p(new Qe(.14,.075,.18),Tt,0,.025,C*.035,F),p(new Qe(.16,.075,.22),Tt,0,0,-C*.075,X);let se=new b(S,.56,C*1.12),fe=new b(S,.81,C*1.43),Ye=fe.clone().sub(se);p(new Xe(.026,.026,Ye.length(),16),Tt,...se.clone().add(fe).multiplyScalar(.5).toArray(),$e).quaternion.setFromUnitVectors(new b(0,1,0),Ye.normalize()),at.push({coil:O,rod:oe,upper:X})}vt.brakes={};for(let S of["stock","red","gold","ceramic"]){let C=new We;n.add(C),vt.brakes[S]=C;for(let{wheelGroup:F,sign:$}of A){let O=oc(S);O.position.z=$*.165,$<0&&(O.rotation.y=Math.PI),F.add(O),C.userData.brakeAssemblies??=[],C.userData.brakeAssemblies.push(O)}}vt.nitrous={};let At=document.createElement("canvas");At.width=512,At.height=256;let ft=At.getContext("2d");ft.fillStyle="#101923",ft.fillRect(0,0,512,256),ft.strokeStyle="#e8e1cc",ft.lineWidth=8,ft.strokeRect(10,10,492,236),ft.fillStyle="#f5f2e8",ft.textAlign="center",ft.font="italic bold 106px Arial",ft.fillText("N\u2082O",256,117),ft.font="bold 24px Arial",ft.fillText("NITROUS OXIDE",256,159),ft.fillStyle="#d9b36b",ft.font="bold 18px Arial",ft.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let S=0;S<42;S++)ft.fillRect(165+S*4,212,S%3+1,17);let zt=new Et(At);zt.colorSpace=dt,zt.anisotropy=8;let Ct=document.createElement("canvas");Ct.width=Ct.height=128;let He=Ct.getContext("2d");He.fillStyle="#eee9dc",He.fillRect(0,0,128,128),He.translate(64,64),He.strokeStyle="#17202a";for(let S=0;S<=20;S++){let C=-Math.PI*.8+S*Math.PI*1.6/20;He.lineWidth=S%5?2:4,He.beginPath(),He.moveTo(Math.sin(C)*43,-Math.cos(C)*43),He.lineTo(Math.sin(C)*(S%5?49:53),-Math.cos(C)*(S%5?49:53)),He.stroke()}He.fillStyle="#293541",He.textAlign="center",He.font="bold 14px Arial",He.fillText("PSI",0,30),He.strokeStyle="#c92737",He.lineWidth=4,He.beginPath(),He.moveTo(-9,12),He.lineTo(26,-31),He.stroke(),He.fillStyle="#25313a",He.beginPath(),He.arc(0,0,6,0,Math.PI*2),He.fill();let Lt=new Et(Ct);Lt.colorSpace=dt;for(let S of["blue","twin","triple"]){let C=new We;C.name="nitrous-"+S,n.add(C),vt.nitrous[S]=C;let F=i(t.item("nitrous",S).color,.65,.27),$=S==="triple"?3:S==="twin"?2:1,O=1.49,oe=-1.3,X=.37,se=i("#b4924f",.8,.3),fe=i("#a5b2bd",.85,.24),Ye=i("#1b2028",.08,.85),me=i("#ab2635",.35,.4);for(let Le of[-1.52,-1.13]){J(.095,.05,$*X+.04,.015,h,Le,1.29,0,C);for(let Q of[-1,1]){let ve=Q*($*X/2-.02);p(new Xe(.024,.024,.023,6),fe,Le,1.327,ve,C)}}for(let Le=0;Le<$;Le++){let Q=(Le-($-1)/2)*X,ve=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Sn,Fn])=>new ue(Sn,Fn)),ze=p(new yi(ve,40),F,oe,O,Q,C);ze.rotation.z=-Math.PI/2;for(let Sn of[-1.52,-1.13]){J(.11,.095,.27,.025,Ye,Sn,1.35,Q,C);let Fn=p(new xt(.152,.013,8,40),fe,Sn,O,Q,C);Fn.rotation.y=Math.PI/2,J(.08,.025,.055,.008,fe,Sn,O+.155,Q,C),p(new Xe(.013,.013,.018,6),h,Sn,O+.179,Q,C)}let Ae=[],we=[],Fe=[];for(let Sn=0;Sn<2;Sn++)for(let Fn=0;Fn<=16;Fn++){let pc=-.91+Fn*1.82/16;if(Ae.push(oe+(Sn?.12:-.12),O+Math.cos(pc)*.147,Q+Math.sin(pc)*.147),we.push(Sn,Fn/16),Sn&&Fn){let ir=17+Fn;Fe.push(ir-18,ir-17,ir,ir-18,ir,ir-1)}}let st=new pt;st.setAttribute("position",new Pe(Ae,3)),st.setAttribute("uv",new Pe(we,2)),st.setIndex(Fe),st.computeVertexNormals();let ln=new xn({map:zt,roughness:.55,metalness:.05,side:Nt});p(st,ln,0,0,0,C);let Pt=p(new Xe(.046,.046,.055,24),se,-.89,O,Q,C);Pt.rotation.z=Math.PI/2,J(.075,.07,.065,.012,se,-.845,O,Q,C),p(new Xe(.016,.016,.065,16),fe,-.845,O+.045,Q,C);let Jt=p(new xt(.052,.012,8,24),me,-.845,O+.092,Q,C);Jt.rotation.x=Math.PI/2;for(let Sn of[0,Math.PI/3,Math.PI*2/3]){let Fn=J(.106,.014,.014,.004,me,-.845,O+.092,Q,C);Fn.rotation.y=Sn}let kt=new We;kt.position.set(-.84,O+.065,Q+.075),kt.rotation.x=-Math.PI*.32,C.add(kt);let Si=p(new Xe(.057,.057,.03,32),fe,0,0,0,kt);Si.rotation.x=Math.PI/2;let dc=p(new Gn(.047,32),new zn({map:Lt}),0,0,.017,kt),Rs=p(new Xe(.024,.024,.055,6),se,-.79,O,Q,C);Rs.rotation.z=Math.PI/2,re([[-.76,O,Q],[-.7,O-.02,Q],[-.71,1.3,Q],[-.91,1.24,Q]],.014,Ye,C);let Du=p(new Xe(.021,.021,.055,12),fe,-.74,O,Q,C);Du.rotation.z=Math.PI/2}J(.07,.07,$*X,.015,se,-.91,1.24,0,C),re([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,Ye,C)}vt.pedals={};for(let S of["classic","aluminium","formula"]){let C=Pu(S);n.add(C),vt.pedals[S]=C}vt.seat={};for(let S of["red","carbon","emerald","ivory"]){let C=uc(S);C.rotation.y=Math.PI/2,C.position.set(-.8,1,0),n.add(C),vt.seat[S]=C}let Qt=Cu(x);function ct(S){let C=["formula","formulaPro","formulaElite"].includes(S.frontBumper);Qt.set(C),ce(S);let F=t.glassTints[S.glassTint]||t.glassTints.original;for(let Q of Object.values(vt.windshield)){let ve=Q.userData.originalTint;Q.userData.glass.color.set(F.opacity===null?ve.color:F.color),Q.userData.glass.opacity=F.opacity??ve.opacity}let $=(t.wheelDiameters[S.wheelSize]||16)/16,O=($-1)*(.715/.86),oe={standard:1,wide:1.25,ultra:1.45}[S.tyreWidth]||1;for(let{wheelGroup:Q,sign:ve,tyres:ze}of A){Q.scale.set(.88/1.24*$,.88/.86*$,oe/.95),Q.position.y=.715/.86*$,Q.position.z=ve*(1.36+.25*(oe-1));for(let[Ae,we]of Object.entries(ze))for(let Fe of we)Fe.visible=Ae===(S.tyres||"standard")}let X=O+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[S.suspension]||0);for(let[Q,ve]of Object.entries(vt))if(Q!=="brakes")for(let ze of Object.values(ve))ze.parent===n&&(ze.userData.mountBaseY??=ze.position.y,ze.position.y=ze.userData.mountBaseY+X);Mn.forEach(Q=>Q.visible=!S.headlights||S.headlights==="classic");for(let[Q,ve]of Object.entries(qe))for(let ze of ve)ze.visible=S.fenders===Q,Q==="club"&&ze.userData.shell.color.set(t.item("paint",S.paint).color);et.color.set(t.item("suspension",S.suspension).color),Je.position.y=X,$e.visible=X>0,at.forEach(({coil:Q,rod:ve,upper:ze})=>{Q.scale.y=1+X/.415,ve.scale.y=1+X/.28,ve.position.y=.34+X/2,ze.position.y=.47+X});for(let[Q,ve]of Object.entries(vt))for(let[ze,Ae]of Object.entries(ve))Ae.visible=(Q==="pedals"?S.pedals||"classic":S[Q])===ze;C&&Object.values(vt.headlights).forEach(Q=>Q.visible=!1);for(let[Q,ve]of Object.entries(vt.brakes))for(let ze of ve.userData.brakeAssemblies||[])ze.visible=(S.brakes||"stock")===Q;Object.entries(Ee).forEach(([Q,ve])=>ve.visible=Q===(S.steering||"classic")),Object.entries(jt).forEach(([Q,ve])=>ve.visible=Q===(S.exhaust||"classic")),Zt.visible=S.turbine==="boost";let se=["twin","twinBig"].includes(S.turbine),fe=S.turbine==="twinBig",Ye=fe?.9:se?.52:S.turbine==="boost"?.96:.9;St.scale.set(Ye/1.24,Ye/.86,Ye/.95),St.position.set(gt,lt+(fe?.06:se?-.2:-.04),se?fe?-.7:-.44:0),nt.visible=se,nt.scale.copy(St.scale),nt.position.set(gt,lt+(fe?.06:-.2),fe?.7:.44);let me=lc([St,nt],Je);for(let Q of Object.values(vt.spoiler))Q.userData.fitTurbines(me);let Le=S.badges||[];if(W.forEach(Q=>Q.visible=!Le.length),k.forEach(Q=>Q.userData.plane.visible=!Le.length),B.forEach(({group:Q,mat:ve,back:ze,n:Ae})=>{let we=Le[Ae];Q.visible=!!we;let Fe=we+":"+(S.prizeTotal||0);if(!we||ve.userData.badge===Fe)return;let st=new Wt,ln=.65/512,Pt=(Jt,kt)=>[(Jt-256)*ln,(256-kt)*ln];if(we==="millionaire"||we==="day-hero")st.absarc(0,0,204*ln,0,Math.PI*2,!1);else if(we==="rating-top10"){for(let Jt=0;Jt<6;Jt++){let kt=Jt*Math.PI/3-Math.PI/2,Si=Pt(256+Math.cos(kt)*215,256+Math.sin(kt)*215);Jt?st.lineTo(...Si):st.moveTo(...Si)}st.closePath()}else st.moveTo(...Pt(80,88)),st.quadraticCurveTo(...Pt(256,0),...Pt(432,88)),st.lineTo(...Pt(420,296)),st.quadraticCurveTo(...Pt(390,400),...Pt(256,465)),st.quadraticCurveTo(...Pt(122,400),...Pt(92,296)),st.closePath();ze.geometry.dispose(),ze.geometry=new Ut(st,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),ve.map?.dispose(),ve.map=new Et(t.badgeCanvas(we,S)),ve.map.colorSpace=dt,ve.map.anisotropy=16,ve.emissive.set("#ffffff"),ve.emissiveMap=ve.map,ve.emissiveIntensity=.35,ve.userData.badge=Fe,ve.needsUpdate=!0}),s.color.set(t.item("paint",S.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(S)),E!==S.wheels){for(let Q of Z)Q.removeFromParent(),Q.geometry.dispose();Z.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:Q,x:ve,out:ze,sign:Ae}of A)for(let we of t.wheelDesign(S.wheels)){let Fe=new yt(we.map(([ln,Pt])=>new b(ln,Pt,Ae*(.25+.025*(1-Math.hypot(ln,Pt)/.51))))),st=p(new Mt(Fe,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[S.wheels]||(["fiveSpoke","legend"].includes(S.wheels)?.023:.009),8,!1),l,0,0,0,Q);Z.push(st)}E=S.wheels}o.color.set(t.item("trim",S.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(S.trim)?.48:["cobalt","anodizedRed","champagne"].includes(S.trim)?.3:.135,o.metalness=.95,u.userData.style!==S.upholstery&&(u.map?.dispose(),u.map=new Et(t.upholsteryCanvas(S.upholstery)),u.map.colorSpace=dt,u.map.wrapS=u.map.wrapT=Zn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(S.upholstery)?.95:S.upholstery==="carbonWeave"?.28:.38,u.userData.style=S.upholstery,u.needsUpdate=!0),t.chipPalette(S.chips).forEach((Q,ve)=>{Me[ve].color.set(Q),Me[ve].roughness=S.chips==="ceramic"?.25:.55}),Y.forEach(Q=>Q.visible=S.chips!=="ceramic"),K.forEach(({mat:Q,n:ve})=>{Q.userData.style!==S.chips&&(Q.map?.dispose(),Q.map=new Et(t.chipCanvas(S.chips,ve)),Q.map.colorSpace=dt,Q.map.anisotropy=8,Q.userData.style=S.chips,Q.needsUpdate=!0)}),Ni.forEach((Q,ve)=>{Q.userData.style!==S.cards&&(Q.map?.dispose(),Q.map=new Et(t.cardCanvas(S.cards,ve)),Q.map.colorSpace=dt,Q.map.anisotropy=16,Q.userData.style=S.cards,Q.needsUpdate=!0)}),Z.forEach(Q=>Q.visible=!0),be.forEach(Q=>Q.visible=!0),d.color.set(t.item("light",S.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,Xn.userData.number!==S.number+S.region&&(Xn.map?.dispose(),Xn.map=new Et(t.plateCanvas(S)),Xn.userData.number=S.number+S.region,Xn.needsUpdate=!0)}for(let S of[-1,1])re([[-1.64,.43,S*.94],[0,.4,S*1.02],[1.66,.43,S*.94]],.027,d,Je),re([[S*1.91,.43,-.66],[S*2.05,.43,0],[S*1.91,.43,.66]],.023,d,Je);let tt=new Rr(d.color,.45,2,2);tt.position.set(-1.9,2,.48),Je.add(tt);let En=ct;function nr(S){En(S),tt.color.copy(d.color)}return nr(e),{car:n,update:nr}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Hn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=dt,n.toneMapping=ri,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ba,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new yn,s=new Vt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Dn("#c6d9ef","#44311e",1.25));for(let[ee,ce,Re,he,xe]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let ge=new wn(ee,ce);ge.position.set(Re,he,xe),ge.castShadow=ee==="#fff0d0",ge.shadow.bias=-2e-4,ge.shadow.normalBias=.025,ge.shadow.mapSize.set(2048,2048),ge.shadow.camera.left=-5,ge.shadow.camera.right=5,ge.shadow.camera.top=5,ge.shadow.camera.bottom=-5,i.add(ge)}let a=new yn;a.background=new Ke("#48505b");for(let[ee,ce,Re,he,xe,ge]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let Z=new it(new Qe(he,xe,ge),new zn({color:"#ffffff"}));Z.position.set(ee,ce,Re),a.add(Z)}let o=new Or(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(ee=>{ee.geometry?.dispose(),ee.material?.dispose()}),o.dispose();let l=new it(new Yt(30,30),new ys({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=Yp(i,e),u=new un({transparent:!0,depthWrite:!1,side:Nt,toneMapped:!1,uniforms:{color:{value:new Ke(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new it(new Yt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let ee of[-.9,.9]){let ce=new Rr(u.uniforms.color.value,1.8,3,2);ce.position.set(0,.32,ee),i.add(ce),m.push(ce)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function v(ee){t.night=!!ee;for(let ce of i.children)ce.isHemisphereLight&&(ce.intensity=ee?.26:1.25),ce.isDirectionalLight&&(ce.userData.dayIntensity??=ce.intensity,ce.intensity=ce.userData.dayIntensity*(ee?.13:1));i.environmentIntensity=ee?.24:1.5,u.uniforms.strength.value=ee?1.35:.95}v(t.night);let f=ee=>{p&&v(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=ee=>{h.update(ee),u.uniforms.color.value.set(window.PokerGarage.item("light",ee.light).color),m.forEach(ce=>ce.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let _=!1,y=null,x=0,M=0,w=()=>{let ee=r.clientWidth,ce=r.clientHeight;ee&&ce&&(n.setSize(ee,ce,!1),s.aspect=ee/ce,s.updateProjectionMatrix())},L=new ResizeObserver(w);L.observe(r),w();let z=new Bn(1,1,{type:Ui,depthBuffer:!0});z.samples=4;let D=new yn,P=new xi(-1,1,1,-1,0,1),U=new un({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:z.texture},stepSize:{value:new ue}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),N=new it(new Yt(2,2),U);D.add(N);function j(){let ee=n.getDrawingBufferSize(new ue);(z.width!==ee.x||z.height!==ee.y)&&z.setSize(ee.x,ee.y),U.uniforms.stepSize.value.set(3/ee.x,3/ee.y),n.setRenderTarget(z),n.render(i,s),n.setRenderTarget(null),n.render(D,P)}let V=ee=>{ee.button&&ee.button!==0||(t.manual=!0,y={id:ee.pointerId,x:ee.clientX,y:ee.clientY},r.setPointerCapture(ee.pointerId),ee.preventDefault())},te=ee=>{!y||y.id!==ee.pointerId||(t.yaw-=(ee.clientX-y.x)*.011,t.pitch=Lu(t.pitch+(ee.clientY-y.y)*.009,-.24,1.35),y.x=ee.clientX,y.y=ee.clientY,ee.preventDefault())},ie=ee=>{y&&y.id===ee.pointerId&&(y=null,r.hasPointerCapture(ee.pointerId)&&r.releasePointerCapture(ee.pointerId))},pe=ee=>{let ce={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};ce[ee.key]&&(t.manual=!0,t.yaw+=ce[ee.key][0],t.pitch=Lu(t.pitch+ce[ee.key][1],-.24,1.35),ee.preventDefault())};r.addEventListener("keydown",pe),r.addEventListener("pointerdown",V),r.addEventListener("pointermove",te),r.addEventListener("pointerup",ie),r.addEventListener("pointercancel",ie),r.addEventListener("lostpointercapture",ie);function le(){if(_)return;_=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(x),L.disconnect(),r.removeEventListener("keydown",pe),r.removeEventListener("pointerdown",V),r.removeEventListener("pointermove",te),r.removeEventListener("pointerup",ie),r.removeEventListener("pointercancel",ie),r.removeEventListener("lostpointercapture",ie);let ee=new Set,ce=new Set,Re=new Set;i.traverse(he=>{he.geometry&&Re.add(he.geometry),he.material&&ce.add(he.material)}),ce.forEach(he=>{for(let xe of Object.values(he))xe&&xe.isTexture&&ee.add(xe);he.dispose()}),ee.forEach(he=>he.dispose()),Re.forEach(he=>he.dispose()),c.dispose(),z.dispose(),U.dispose(),N.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function _e(ee){if(_)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){le();return}let ce=M?Math.min(.05,(ee-M)/1e3):0;if(M=ee,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=ce*.13);let Re=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Re,1.15+Math.sin(t.pitch)*Re,Math.cos(t.yaw)*Math.cos(t.pitch)*Re),s.lookAt(0,1.2,0),j(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}x=requestAnimationFrame(_e)}return t.snapshotOnly||(x=requestAnimationFrame(_e)),{update:g,setNight:v,dispose:le,state:t,snapshot(){let ee=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*ee,1.15+Math.sin(t.pitch)*ee,Math.cos(t.yaw)*Math.cos(t.pitch)*ee),s.lookAt(0,1.2,0),j();let ce=document.createElement("canvas");return ce.width=n.domElement.width,ce.height=n.domElement.height,ce.getContext("2d").drawImage(n.domElement,0,0),ce}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
