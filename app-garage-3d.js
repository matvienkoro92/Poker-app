(()=>{var Ac=0,ko=1,Cc=2;var Vo=1,Ia=2,Xn=3,gr=0,fn=1,Ut=2,Ti=0,hs=1,Ho=2,Wo=3,Xo=4,Rc=5,vr=100,Pc=101,Ic=102,Lc=103,Dc=104,Uc=200,Nc=201,Fc=202,Oc=203,Bc=204,zc=205,Gc=206,kc=207,Vc=208,Hc=209,Wc=210,Xc=211,jc=212,qc=213,Yc=214,La=0,Da=1,Ua=2,us=3,Na=4,Fa=5,Oa=6,Ba=7,Zc=0,Jc=1,Kc=2,li=0,$c=1,Qc=2,eh=3,jn=4,th=5,nh=6,ih=7;var jo=300,_r=301,Fi=302,za=303,Ga=304,ds=306,Pn=1e3,ar=1001,Ys=1002,Hn=1003,rh=1004;var ps=1005;var Wn=1006,ka=1007;var Oi=1008;var qn=1009,qo=1010,Yo=1011,yr=1012,Va=1013,Bi=1014,Un=1015,bi=1016,Ha=1017,Wa=1018,xr=1020,Zo=35902,Jo=35899,sh=1021,ah=1022,Nn=1023,ms=1026,fs=1027,Xa=1028,ja=1029,oh=1030,Ko=1031;var $o=1033,qa=33776,Ya=33777,Za=33778,Ja=33779,Qo=35840,el=35841,tl=35842,nl=35843,il=36196,rl=37492,sl=37496,al=37808,ol=37809,ll=37810,cl=37811,hl=37812,ul=37813,dl=37814,pl=37815,ml=37816,fl=37817,gl=37818,vl=37819,_l=37820,yl=37821,xl=36492,Ml=36494,Sl=36495,Tl=36283,bl=36284,wl=36285,El=36286;var kr=2300,Zs=2301,js=2302,Io=2400,Lo=2401,Do=2402;var lh=3201;var ch=0,hh=1,zi="",ot="srgb",Pi="srgb-linear",Vr="linear",vt="srgb";var Ri=7680;var uh=512,dh=513,ph=514,Al=515,mh=516,fh=517,gh=518,vh=519,Uo=35044;var Cl="300 es",ii=2e3,Hr=2001;var ri=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var qs=Math.PI/180,Js=180/Math.PI;function Mr(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Jt[255&r]+Jt[r>>8&255]+Jt[r>>16&255]+Jt[r>>24&255]+"-"+Jt[255&e]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[63&t|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[255&n]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function st(r,e,t){return Math.max(e,Math.min(t,r))}function ru(r,e){return(r%e+e)%e}function to(r,e,t){return(1-t)*r+t*e}function Pr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var de=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],_=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=_);if(u!==_||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*_,v=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let S=Math.sqrt(y),C=Math.atan2(S,g*v);f=Math.sin(f*C)/S,o=Math.sin(o*C)/S}let b=o*v;if(c=c*f+d*b,l=l*f+m*b,h=h*f+p*b,u=u*f+_*b,f===1-o){let S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},no=new A,Ql=new dn,it=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],_=i[0],f=i[3],g=i[6],v=i[1],y=i[4],b=i[7],S=i[2],C=i[5],D=i[8];return s[0]=a*_+o*v+c*S,s[3]=a*f+o*y+c*C,s[6]=a*g+o*b+c*D,s[1]=l*_+h*v+u*S,s[4]=l*f+h*y+u*C,s[7]=l*g+h*b+u*D,s[2]=d*_+m*v+p*S,s[5]=d*f+m*y+p*C,s[8]=d*g+m*b+p*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-o*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(io.makeScale(e,t)),this}rotate(e){return this.premultiply(io.makeRotation(-e)),this}translate(e,t){return this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},io=new it;function Rl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Wr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _h(){let r=Wr("canvas");return r.style.display="block",r}var ec={};function or(r){r in ec||(ec[r]=!0,console.warn(r))}function yh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var tc=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nc=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function su(){let r={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===vt&&(i.r=ni(i.r),i.g=ni(i.g),i.b=ni(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(i.r=sr(i.r),i.g=sr(i.g),i.b=sr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Vr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return or("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return or("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Pi]:{primaries:e,whitePoint:n,transfer:Vr,toXYZ:tc,fromXYZ:nc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ot},outputColorSpaceConfig:{drawingBufferColorSpace:ot}},[ot]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:tc,fromXYZ:nc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ot}}}),r}var ut=su();function ni(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function sr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var qi,Ks=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qi===void 0&&(qi=Wr("canvas")),qi.width=e.width,qi.height=e.height;let i=qi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=qi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*ni(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ni(t[n]/255)):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},au=0,lr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=Mr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ro(i[a].image)):s.push(ro(i[a]))}else s=ro(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function ro(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ks.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ou=0,so=new A,nn=class r extends ri{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Mr(),this.name="",this.source=new lr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(so).x}get height(){return this.source.getSize(so).y}get depth(){return this.source.getSize(so).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pn:e.x=e.x-Math.floor(e.x);break;case ar:e.x=e.x<0?0:1;break;case Ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Pn:e.y=e.y-Math.floor(e.y);break;case ar:e.y=e.y<0?0:1;break;case Ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};nn.DEFAULT_IMAGE=null,nn.DEFAULT_MAPPING=jo,nn.DEFAULT_ANISOTROPY=1;var ft=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],_=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,b=(m+1)/2,S=(g+1)/2,C=(h+d)/4,D=(u+_)/4,F=(p+f)/4;return y>b&&y>S?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=C/n,s=D/n):b>S?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=C/i,s=F/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=D/s,i=F/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-p)*(f-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$s=class extends ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new nn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new lr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},yn=class extends $s{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Xr=class extends nn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=ar,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qs=class extends nn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=ar,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xn=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(s,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ms.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ms.copy(n.boundingBox)),Ms.applyMatrix4(e.matrixWorld),this.union(Ms)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Ss.subVectors(this.max,Ir),Yi.subVectors(e.a,Ir),Zi.subVectors(e.b,Ir),Ji.subVectors(e.c,Ir),pi.subVectors(Zi,Yi),mi.subVectors(Ji,Zi),wi.subVectors(Yi,Ji);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-wi.z,wi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,wi.z,0,-wi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-wi.y,wi.x,0];return!!ao(t,Yi,Zi,Ji,Ss)&&(t=[1,0,0,0,1,0,0,0,1],!!ao(t,Yi,Zi,Ji,Ss)&&(Ts.crossVectors(pi,mi),t=[Ts.x,Ts.y,Ts.z],ao(t,Yi,Zi,Ji,Ss)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(An).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Jn=[new A,new A,new A,new A,new A,new A,new A,new A],An=new A,Ms=new xn,Yi=new A,Zi=new A,Ji=new A,pi=new A,mi=new A,wi=new A,Ir=new A,Ss=new A,Ts=new A,Ei=new A;function ao(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ei.fromArray(r,s);let o=i.x*Math.abs(Ei.x)+i.y*Math.abs(Ei.y)+i.z*Math.abs(Ei.z),c=e.dot(Ei),l=t.dot(Ei),h=n.dot(Ei);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var lu=new xn,Lr=new A,oo=new A,Mn=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):lu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(oo)),this.expandByPoint(Lr.copy(e.center).sub(oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Kn=new A,lo=new A,bs=new A,fi=new A,co=new A,ws=new A,ho=new A,Ii=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){lo.copy(e).add(t).multiplyScalar(.5),bs.copy(t).sub(e).normalize(),fi.copy(this.origin).sub(lo);let s=.5*e.distanceTo(t),a=-this.direction.dot(bs),o=fi.dot(this.direction),c=-fi.dot(bs),l=fi.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let _=1/h;u*=_,d*=_,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(lo).addScaledVector(bs,d),m}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);let n=Kn.dot(this.direction),i=Kn.dot(Kn)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,i,s){co.subVectors(t,e),ws.subVectors(n,e),ho.crossVectors(co,ws);let a,o=this.direction.dot(ho);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}fi.subVectors(this.origin,e);let c=a*this.direction.dot(ws.crossVectors(fi,ws));if(c<0)return null;let l=a*this.direction.dot(co.cross(fi));if(l<0||c+l>o)return null;let h=-a*fi.dot(ho);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qe=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=_,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Ki.setFromMatrixColumn(e,0).length(),s=1/Ki.setFromMatrixColumn(e,1).length(),a=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,_=l*u;t[0]=d+_*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,_=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cu,e,hu)}lookAt(e,t,n){let i=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),gi.crossVectors(n,cn),gi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),gi.crossVectors(n,cn)),gi.normalize(),Es.crossVectors(cn,gi),i[0]=gi.x,i[4]=Es.x,i[8]=cn.x,i[1]=gi.y,i[5]=Es.y,i[9]=cn.y,i[2]=gi.z,i[6]=Es.z,i[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],_=n[6],f=n[10],g=n[14],v=n[3],y=n[7],b=n[11],S=n[15],C=i[0],D=i[4],F=i[8],L=i[12],k=i[1],q=i[5],G=i[9],te=i[13],j=i[2],$=i[6],ne=i[10],fe=i[14],he=i[3],Pe=i[7],oe=i[11],ve=i[15];return s[0]=a*C+o*k+c*j+l*he,s[4]=a*D+o*q+c*$+l*Pe,s[8]=a*F+o*G+c*ne+l*oe,s[12]=a*L+o*te+c*fe+l*ve,s[1]=h*C+u*k+d*j+m*he,s[5]=h*D+u*q+d*$+m*Pe,s[9]=h*F+u*G+d*ne+m*oe,s[13]=h*L+u*te+d*fe+m*ve,s[2]=p*C+_*k+f*j+g*he,s[6]=p*D+_*q+f*$+g*Pe,s[10]=p*F+_*G+f*ne+g*oe,s[14]=p*L+_*te+f*fe+g*ve,s[3]=v*C+y*k+b*j+S*he,s[7]=v*D+y*q+b*$+S*Pe,s[11]=v*F+y*G+b*ne+S*oe,s[15]=v*L+y*te+b*fe+S*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],_=e[13],f=e[14],g=e[15],v=u*f*l-_*d*l+_*c*m-o*f*m-u*c*g+o*d*g,y=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,b=h*_*l-p*u*l+p*o*m-a*_*m-h*o*g+a*u*g,S=p*u*c-h*_*c-p*o*d+a*_*d+h*o*f-a*u*f,C=t*v+n*y+i*b+s*S;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/C;return e[0]=v*D,e[1]=(_*d*s-u*f*s-_*i*m+n*f*m+u*i*g-n*d*g)*D,e[2]=(o*f*s-_*c*s+_*i*l-n*f*l-o*i*g+n*c*g)*D,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*D,e[4]=y*D,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*D,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*D,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*D,e[8]=b*D,e[9]=(p*u*s-h*_*s-p*n*m+t*_*m+h*n*g-t*u*g)*D,e[10]=(a*_*s-p*o*s+p*n*l-t*_*l-a*n*g+t*o*g)*D,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*D,e[12]=S*D,e[13]=(h*_*i-p*u*i+p*n*d-t*_*d-h*n*f+t*u*f)*D,e[14]=(p*o*i-a*_*i-p*n*c+t*_*c+a*n*f-t*o*f)*D,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*D,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,_=a*h,f=a*u,g=o*u,v=c*l,y=c*h,b=c*u,S=n.x,C=n.y,D=n.z;return i[0]=(1-(_+g))*S,i[1]=(m+b)*S,i[2]=(p-y)*S,i[3]=0,i[4]=(m-b)*C,i[5]=(1-(d+g))*C,i[6]=(f+v)*C,i[7]=0,i[8]=(p+y)*D,i[9]=(f-v)*D,i[10]=(1-(d+_))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Ki.set(i[0],i[1],i[2]).length(),a=Ki.set(i[4],i[5],i[6]).length(),o=Ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Cn.copy(this);let c=1/s,l=1/a,h=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=l,Cn.elements[5]*=l,Cn.elements[6]*=l,Cn.elements[8]*=h,Cn.elements[9]*=h,Cn.elements[10]*=h,t.setFromRotationMatrix(Cn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,_;if(c)p=s/(a-s),_=a*s/(a-s);else if(o===ii)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else{if(o!==Hr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),_=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,_;if(c)p=1/(a-s),_=a/(a-s);else if(o===ii)p=-2/(a-s),_=-(a+s)/(a-s);else{if(o!==Hr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),_=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ki=new A,Cn=new Qe,cu=new A(0,0,0),hu=new A(1,1,1),gi=new A,Es=new A,cn=new A,ic=new Qe,rc=new dn,In=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ic.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ic,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rc.setFromEuler(this),this.setFromQuaternion(rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var jr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},uu=0,sc=new A,$i=new dn,$n=new Qe,As=new A,Dr=new A,du=new A,pu=new dn,ac=new A(1,0,0),oc=new A(0,1,0),lc=new A(0,0,1),cc={type:"added"},mu={type:"removed"},Qi={type:"childadded",child:null},uo={type:"childremoved",child:null},$t=class r extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new A,t=new In,n=new dn,i=new A(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qe},normalMatrix:{value:new it}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.multiply($i),this}rotateOnWorldAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.premultiply($i),this}rotateX(e){return this.rotateOnAxis(ac,e)}rotateY(e){return this.rotateOnAxis(oc,e)}rotateZ(e){return this.rotateOnAxis(lc,e)}translateOnAxis(e,t){return sc.copy(e).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ac,e)}translateY(e){return this.translateOnAxis(oc,e)}translateZ(e){return this.translateOnAxis(lc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?As.copy(e):As.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Dr,As,this.up):$n.lookAt(As,Dr,this.up),this.quaternion.setFromRotationMatrix($n),i&&($n.extractRotation(i.matrixWorld),$i.setFromRotationMatrix($n),this.quaternion.premultiply($i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cc),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mu),uo.child=e,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cc),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,du),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};$t.DEFAULT_UP=new A(0,1,0),$t.DEFAULT_MATRIX_AUTO_UPDATE=!0,$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=new A,Qn=new A,po=new A,ei=new A,er=new A,tr=new A,hc=new A,mo=new A,fo=new A,go=new A,vo=new ft,_o=new ft,yo=new ft,ti=class r{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Rn.subVectors(e,t),i.cross(Rn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Rn.subVectors(i,t),Qn.subVectors(n,t),po.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(Qn),c=Rn.dot(po),l=Qn.dot(Qn),h=Qn.dot(po),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ei)!==null&&ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ei.x),c.addScaledVector(a,ei.y),c.addScaledVector(o,ei.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return vo.setScalar(0),_o.setScalar(0),yo.setScalar(0),vo.fromBufferAttribute(e,t),_o.fromBufferAttribute(e,n),yo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(vo,s.x),a.addScaledVector(_o,s.y),a.addScaledVector(yo,s.z),a}static isFrontFacing(e,t,n,i){return Rn.subVectors(n,t),Qn.subVectors(e,t),Rn.cross(Qn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),.5*Rn.cross(Qn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;er.subVectors(i,n),tr.subVectors(s,n),mo.subVectors(e,n);let c=er.dot(mo),l=tr.dot(mo);if(c<=0&&l<=0)return t.copy(n);fo.subVectors(e,i);let h=er.dot(fo),u=tr.dot(fo);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(er,a);go.subVectors(e,s);let m=er.dot(go),p=tr.dot(go);if(p>=0&&m<=p)return t.copy(s);let _=m*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(tr,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return hc.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(hc,o);let g=1/(f+_+d);return a=_*g,o=d*g,t.copy(n).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function xo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ut.workingColorSpace){if(e=ru(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=xo(a,s,e+1/3),this.g=xo(a,s,e),this.b=xo(a,s,e-1/3)}return ut.colorSpaceToWorking(this,i),this}setStyle(e,t=ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ot){let n=xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ot){return ut.workingToColorSpace(Kt.copy(this),e),65536*Math.round(st(255*Kt.r,0,255))+256*Math.round(st(255*Kt.g,0,255))+Math.round(st(255*Kt.b,0,255))}getHexString(e=ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(Kt.copy(this),t);let n=Kt.r,i=Kt.g,s=Kt.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=ot){ut.workingToColorSpace(Kt.copy(this),e);let t=Kt.r,n=Kt.g,i=Kt.b;return e!==ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(Cs);let n=to(vi.h,Cs.h,t),i=to(vi.s,Cs.s,t),s=to(vi.l,Cs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kt=new qe;qe.NAMES=xh;var fu=0,si=class extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Mr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Sn=class extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},vp=gu();function gu(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Gt=new A,Rs=new de,vu=0,an=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Uo,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pr(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pr(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pr(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),i=sn(i,this.array),s=sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uo&&(e.usage=this.usage),e}};var qr=class extends an{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Yr=class extends an{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Fe=class extends an{constructor(e,t,n){super(new Float32Array(e),t,n)}},_u=0,_n=new Qe,Mo=new $t,nr=new A,hn=new xn,Ur=new xn,Xt=new A,ct=class r extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=Mr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rl(e)?Yr:qr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new it().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Fe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];hn.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new A,1/0);if(e){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(hn.min,Ur.min),hn.expandByPoint(Xt),Xt.addVectors(hn.max,Ur.max),hn.expandByPoint(Xt)):(hn.expandByPoint(Ur.min),hn.expandByPoint(Ur.max))}hn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Xt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Xt.fromBufferAttribute(o,l),c&&(nr.fromBufferAttribute(e,l),Xt.add(nr)),i=Math.max(i,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let F=0;F<n.count;F++)o[F]=new A,c[F]=new A;let l=new A,h=new A,u=new A,d=new de,m=new de,p=new de,_=new A,f=new A;function g(F,L,k){l.fromBufferAttribute(n,F),h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,k),d.fromBufferAttribute(s,F),m.fromBufferAttribute(s,L),p.fromBufferAttribute(s,k),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let q=1/(m.x*p.y-p.x*m.y);isFinite(q)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(q),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(q),o[F].add(_),o[L].add(_),o[k].add(_),c[F].add(f),c[L].add(f),c[k].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let F=0,L=v.length;F<L;++F){let k=v[F],q=k.start;for(let G=q,te=q+k.count;G<te;G+=3)g(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let y=new A,b=new A,S=new A,C=new A;function D(F){S.fromBufferAttribute(i,F),C.copy(S);let L=o[F];y.copy(L),y.sub(S.multiplyScalar(S.dot(L))).normalize(),b.crossVectors(C,L);let k=b.dot(c[F])<0?-1:1;a.setXYZW(F,y.x,y.y,y.z,k)}for(let F=0,L=v.length;F<L;++F){let k=v[F],q=k.start;for(let G=q,te=q+k.count;G<te;G+=3)D(e.getX(G+0)),D(e.getX(G+1)),D(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new A,s=new A,a=new A,o=new A,c=new A,l=new A,h=new A,u=new A;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),_=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let _=0,f=c.length;_<f;_++){m=o.isInterleavedBufferAttribute?c[_]*o.data.stride+o.offset:c[_]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new an(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},uc=new Qe,Ai=new Ii,Ps=new Mn,dc=new A,Is=new A,Ls=new A,Ds=new A,So=new A,Us=new A,pc=new A,Ns=new A,pt=class extends $t{constructor(e=new ct,t=new Sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(So.fromBufferAttribute(u,e),a?Us.addScaledVector(So,h):Us.addScaledVector(So.sub(t),h))}t.add(Us)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(s),Ai.copy(e.ray).recast(e.near),Ps.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(Ps,dc)===null||Ai.origin.distanceToSquared(dc)>(e.far-e.near)**2))return;uc.copy(s).invert(),Ai.copy(e.ray).applyMatrix4(uc),n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Ai)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),y=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));v<y;v+=3)i=Fs(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);p<_;p+=3)i=Fs(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),y=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));v<y;v+=3)i=Fs(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);p<_;p+=3)i=Fs(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function Fs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Is),r.getVertexPosition(c,Ls),r.getVertexPosition(l,Ds);let h=(function(u,d,m,p,_,f,g,v){let y;if(y=d.side===1?p.intersectTriangle(g,f,_,!0,v):p.intersectTriangle(_,f,g,d.side===0,v),y===null)return null;Ns.copy(v),Ns.applyMatrix4(u.matrixWorld);let b=m.ray.origin.distanceTo(Ns);return b<m.near||b>m.far?null:{distance:b,point:Ns.clone(),object:u}})(r,e,t,n,Is,Ls,Ds,pc);if(h){let u=new A;ti.getBarycoord(pc,Is,Ls,Ds,u),i&&(h.uv=ti.getInterpolatedAttribute(i,o,c,l,u,new de)),s&&(h.uv1=ti.getInterpolatedAttribute(s,o,c,l,u,new de)),a&&(h.normal=ti.getInterpolatedAttribute(a,o,c,l,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new A,materialIndex:0};ti.getNormal(Is,Ls,Ds,d.normal),h.face=d,h.barycoord=u}return h}var gt=class r extends ct{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(_,f,g,v,y,b,S,C,D,F,L){let k=b/D,q=S/F,G=b/2,te=S/2,j=C/2,$=D+1,ne=F+1,fe=0,he=0,Pe=new A;for(let oe=0;oe<ne;oe++){let ve=oe*q-te;for(let Ce=0;Ce<$;Ce++){let ce=Ce*k-G;Pe[_]=ce*v,Pe[f]=ve*y,Pe[g]=j,l.push(Pe.x,Pe.y,Pe.z),Pe[_]=0,Pe[f]=0,Pe[g]=C>0?1:-1,h.push(Pe.x,Pe.y,Pe.z),u.push(Ce/D),u.push(1-oe/F),fe+=1}}for(let oe=0;oe<F;oe++)for(let ve=0;ve<D;ve++){let Ce=d+ve+$*oe,ce=d+ve+$*(oe+1),_e=d+(ve+1)+$*(oe+1),Q=d+(ve+1)+$*oe;c.push(Ce,ce,Q),c.push(ce,_e,Q),he+=6}o.addGroup(m,he,L),m+=he,d+=fe}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Fe(l,3)),this.setAttribute("normal",new Fe(h,3)),this.setAttribute("uv",new Fe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Gi(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function en(r){let e={};for(let t=0;t<r.length;t++){let n=Gi(r[t]);for(let i in n)e[i]=n[i]}return e}function Pl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var Mh={clone:Gi,merge:en},Qt=class extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},cr=class extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},_i=new A,mc=new de,fc=new de,Lt=class extends cr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Js*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*qs*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Js*Math.atan(Math.tan(.5*qs*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_i.x,_i.y).multiplyScalar(-e/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-e/_i.z)}getViewSize(e,t){return this.getViewBounds(e,mc,fc),t.subVectors(fc,mc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*qs*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ir=-90,ea=class extends $t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Lt(ir,1,e,t);i.layers=this.layers,this.add(i);let s=new Lt(ir,1,e,t);s.layers=this.layers,this.add(s);let a=new Lt(ir,1,e,t);a.layers=this.layers,this.add(a);let o=new Lt(ir,1,e,t);o.layers=this.layers,this.add(o);let c=new Lt(ir,1,e,t);c.layers=this.layers,this.add(c);let l=new Lt(ir,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Hr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Zr=class extends nn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ta=class extends yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Zr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new gt(5,5,5),s=new Qt({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new pt(i,s),o=t.minFilter;return t.minFilter===Oi&&(t.minFilter=Wn),new ea(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ke=class extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}},yu={type:"move"},hr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let f=t.getJointPose(_,n),g=this._getHandJoint(l,_);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var rn=class extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var _p=new A;var yp=new A,xp=new A,Mp=new A,Sp=new de,Tp=new de,bp=new Qe,wp=new A,Ep=new A,Ap=new A,Cp=new de,Rp=new de,Pp=new de;var Ip=new A,Lp=new A;var Dp=new A,Up=new ft,Np=new ft,Fp=new A,Op=new Qe,Bp=new A,zp=new Mn,Gp=new Qe,kp=new Ii;var na=class extends nn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vp=new Qe,Hp=new Qe;var Jr=class extends an{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},rr=new Qe,gc=new Qe,Os=[],vc=new xn,xu=new Qe,Nr=new pt,Fr=new Mn,Kr=class extends pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jr(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,xu)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rr),vc.copy(e.boundingBox).applyMatrix4(rr),this.boundingBox.union(vc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rr),Fr.copy(e.boundingSphere).applyMatrix4(rr),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Nr.geometry=this.geometry,Nr.material=this.material,Nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),e.ray.intersectsSphere(Fr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,rr),gc.multiplyMatrices(n,rr),Nr.matrixWorld=gc,Nr.raycast(e,Os);for(let a=0,o=Os.length;a<o;a++){let c=Os[a];c.instanceId=s,c.object=this,t.push(c)}Os.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jr(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new na(new Float32Array(i*this.count),i,this.count,Xa,Un));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},To=new A,Mu=new A,Su=new it,kn=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=To.subVectors(n,t).cross(Mu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(To),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Su.getNormalMatrix(e),i=this.coplanarPoint(To).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ci=new Mn,Tu=new de(.5,.5),Bs=new A,Mi=class{constructor(e=new kn,t=new kn,n=new kn,i=new kn,s=new kn,a=new kn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],_=s[9],f=s[10],g=s[11],v=s[12],y=s[13],b=s[14],S=s[15];if(i[0].setComponents(l-a,m-h,g-p,S-v).normalize(),i[1].setComponents(l+a,m+h,g+p,S+v).normalize(),i[2].setComponents(l+o,m+u,g+_,S+y).normalize(),i[3].setComponents(l-o,m-u,g-_,S-y).normalize(),n)i[4].setComponents(c,d,f,b).normalize(),i[5].setComponents(l-c,m-d,g-f,S-b).normalize();else if(i[4].setComponents(l-c,m-d,g-f,S-b).normalize(),t===ii)i[5].setComponents(l+c,m+d,g+f,S+b).normalize();else{if(t!==Hr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,b).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){Ci.center.set(0,0,0);let t=Tu.distanceTo(e.center);return Ci.radius=.7071067811865476+t,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Bs.x=i.normal.x>0?e.max.x:e.min.x,Bs.y=i.normal.y>0?e.max.y:e.min.y,Bs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},zn=new Qe,Gn=new Mi,ia=class r{constructor(){this.coordinateSystem=ii}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(zn,i.coordinateSystem,i.reversedDepth),Gn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(zn,i.coordinateSystem,i.reversedDepth),Gn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(zn,i.coordinateSystem,i.reversedDepth),Gn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(zn,i.coordinateSystem,i.reversedDepth),Gn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(zn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(zn,i.coordinateSystem,i.reversedDepth),Gn.containsPoint(e))return!0}return!1}clone(){return new r}};var No=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Wp=new Qe,Xp=new qe(1,1,1),jp=new Mi,qp=new ia,Yp=new xn,Zp=new Mn,Jp=new A,Kp=new A,$p=new A,Qp=new No,em=new pt;var tm=new A,nm=new A,im=new Qe,rm=new Ii,sm=new Mn,am=new A,om=new A;var lm=new A,cm=new A;var hm=new Qe,um=new Ii,dm=new Mn,pm=new A;var Mt=class extends nn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},$r=class extends nn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==ms&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Qr=class extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ur=class r extends ct{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,_=i+1,f=new A,g=new A;for(let v=0;v<=p;v++){let y=0,b=0,S=0,C=0;if(v<=n){let L=v/n,k=L*Math.PI/2;b=-h-e*Math.cos(k),S=e*Math.sin(k),C=-e*Math.cos(k),y=L*u}else if(v<=n+s){let L=(v-n)/s;b=L*t-h,S=e,C=0,y=u+L*d}else{let L=(v-n-s)/n,k=L*Math.PI/2;b=h+e*Math.sin(k),S=e*Math.cos(k),C=e*Math.sin(k),y=u+d+L*u}let D=Math.max(0,Math.min(1,y/m)),F=0;v===0?F=.5/i:v===p&&(F=-.5/i);for(let L=0;L<=i;L++){let k=L/i,q=k*Math.PI*2,G=Math.sin(q),te=Math.cos(q);g.x=-S*te,g.y=b,g.z=S*G,o.push(g.x,g.y,g.z),f.set(-S*te,C,S*G),f.normalize(),c.push(f.x,f.y,f.z),l.push(k+F,D)}if(v>0){let L=(v-1)*_;for(let k=0;k<i;k++){let q=L+k,G=L+k+1,te=v*_+k,j=v*_+k+1;a.push(q,G,te),a.push(G,j,te)}}}this.setIndex(a),this.setAttribute("position",new Fe(o,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},ai=class r extends ct{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new A,h=new de;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Fe(a,3)),this.setAttribute("normal",new Fe(o,3)),this.setAttribute("uv",new Fe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ze=class r extends ct{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,_=[],f=n/2,g=0;function v(y){let b=p,S=new de,C=new A,D=0,F=y===!0?e:t,L=y===!0?1:-1;for(let q=1;q<=i;q++)u.push(0,f*L,0),d.push(0,L,0),m.push(.5,.5),p++;let k=p;for(let q=0;q<=i;q++){let G=q/i*c+o,te=Math.cos(G),j=Math.sin(G);C.x=F*j,C.y=f*L,C.z=F*te,u.push(C.x,C.y,C.z),d.push(0,L,0),S.x=.5*te+.5,S.y=.5*j*L+.5,m.push(S.x,S.y),p++}for(let q=0;q<i;q++){let G=b+q,te=k+q;y===!0?h.push(te,te+1,G):h.push(te+1,te,G),D+=3}l.addGroup(g,D,y===!0?1:2),g+=D}(function(){let y=new A,b=new A,S=0,C=(t-e)/n;for(let D=0;D<=s;D++){let F=[],L=D/s,k=L*(t-e)+e;for(let q=0;q<=i;q++){let G=q/i,te=G*c+o,j=Math.sin(te),$=Math.cos(te);b.x=k*j,b.y=-L*n+f,b.z=k*$,u.push(b.x,b.y,b.z),y.set(j,C,$).normalize(),d.push(y.x,y.y,y.z),m.push(G,1-L),F.push(p++)}_.push(F)}for(let D=0;D<i;D++)for(let F=0;F<s;F++){let L=_[F][D],k=_[F+1][D],q=_[F+1][D+1],G=_[F][D+1];(e>0||F!==0)&&(h.push(L,k,G),S+=3),(t>0||F!==s-1)&&(h.push(k,q,G),S+=3)}l.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Fe(u,3)),this.setAttribute("normal",new Fe(d,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ra=class r extends Ze{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Si=class r extends ct{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,_,f){let g=f+1,v=[];for(let y=0;y<=g;y++){v[y]=[];let b=m.clone().lerp(_,y/g),S=p.clone().lerp(_,y/g),C=g-y;for(let D=0;D<=C;D++)v[y][D]=D===0&&y===g?b:b.clone().lerp(S,D/C)}for(let y=0;y<g;y++)for(let b=0;b<2*(g-y)-1;b++){let S=Math.floor(b/2);b%2==0?(c(v[y][S+1]),c(v[y+1][S]),c(v[y][S])):(c(v[y][S+1]),c(v[y+1][S+1]),c(v[y+1][S]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let _=3*m;p.x=e[_+0],p.y=e[_+1],p.z=e[_+2]}function h(m,p,_,f){f<0&&m.x===1&&(a[p]=m.x-1),_.x===0&&_.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new A,_=new A,f=new A;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],_),l(t[g+2],f),o(p,_,f,m)})(i),(function(m){let p=new A;for(let _=0;_<s.length;_+=3)p.x=s[_+0],p.y=s[_+1],p.z=s[_+2],p.normalize().multiplyScalar(m),s[_+0]=p.x,s[_+1]=p.y,s[_+2]=p.z})(n),(function(){let m=new A;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let _=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(_,1-f)}(function(){let p=new A,_=new A,f=new A,g=new A,v=new de,y=new de,b=new de;for(let S=0,C=0;S<s.length;S+=9,C+=6){p.set(s[S+0],s[S+1],s[S+2]),_.set(s[S+3],s[S+4],s[S+5]),f.set(s[S+6],s[S+7],s[S+8]),v.set(a[C+0],a[C+1]),y.set(a[C+2],a[C+3]),b.set(a[C+4],a[C+5]),g.copy(p).add(_).add(f).divideScalar(3);let D=u(g);h(v,C+0,p,D),h(y,C+2,_,D),h(b,C+4,f,D)}})(),(function(){for(let p=0;p<a.length;p+=6){let _=a[p+0],f=a[p+2],g=a[p+4],v=Math.max(_,f,g),y=Math.min(_,f,g);v>.9&&y<.1&&(_<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Fe(s,3)),this.setAttribute("normal",new Fe(s.slice(),3)),this.setAttribute("uv",new Fe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},sa=class r extends Si{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},zs=new A,Gs=new A,bo=new A,ks=new ti,aa=class extends ct{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(qs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:_,b:f,c:g}=ks;if(_.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),ks.getNormal(bo),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let y=(v+1)%3,b=u[v],S=u[y],C=ks[h[v]],D=ks[h[y]],F=`${b}_${S}`,L=`${S}_${b}`;L in d&&d[L]?(bo.dot(d[L].normal)<=s&&(m.push(C.x,C.y,C.z),m.push(D.x,D.y,D.z)),d[L]=null):F in d||(d[F]={index0:l[v],index1:l[y],normal:bo.clone()})}}for(let p in d)if(d[p]){let{index0:_,index1:f}=d[p];zs.fromBufferAttribute(o,_),Gs.fromBufferAttribute(o,f),m.push(zs.x,zs.y,zs.z),m.push(Gs.x,Gs.y,Gs.z)}this.setAttribute("position",new Fe(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new de:new A);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new A,i=[],s=[],a=[],o=new A,c=new Qe;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new A)}s[0]=new A,a[0]=new A;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(st(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(st(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},dr=class extends pn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new de){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},oa=class extends dr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Il(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Vs=new A,wo=new Il,Eo=new Il,Ao=new Il,Pt=class extends pn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new A){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Vs.subVectors(i[0],i[1]).add(i[0]),o=Vs);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Vs.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),_=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);_<1e-4&&(_=1),p<1e-4&&(p=_),f<1e-4&&(f=_),wo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,_,f),Eo.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,_,f),Ao.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,_,f)}else this.curveType==="catmullrom"&&(wo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Eo.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Ao.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(wo.calc(h),Eo.calc(h),Ao.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new A().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _c(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function zr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Gr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var es=class extends pn{constructor(e=new de,t=new de,n=new de,i=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new de){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Gr(e,i.x,s.x,a.x,o.x),Gr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},la=class extends pn{constructor(e=new A,t=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new A){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Gr(e,i.x,s.x,a.x,o.x),Gr(e,i.y,s.y,a.y,o.y),Gr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ts=class extends pn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends pn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ns=class extends pn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(zr(e,i.x,s.x,a.x),zr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},is=class extends pn{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(zr(e,i.x,s.x,a.x),zr(e,i.y,s.y,a.y),zr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rs=class extends pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(_c(o,c.x,l.x,h.x,u.x),_c(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new de().fromArray(i))}return this}},ha=Object.freeze({__proto__:null,ArcCurve:oa,CatmullRomCurve3:Pt,CubicBezierCurve:es,CubicBezierCurve3:la,EllipseCurve:dr,LineCurve:ts,LineCurve3:ca,QuadraticBezierCurve:ns,QuadraticBezierCurve3:is,SplineCurve:rs}),ua=class extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ha[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ha[i.type]().fromJSON(i))}return this}},on=class extends ua{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ts(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new ns(this.currentPoint.clone(),new de(e,t),new de(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new es(this.currentPoint.clone(),new de(e,t),new de(n,i),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new rs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new dr(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},jt=class extends on{constructor(e){super(e),this.uuid=Mr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new on().fromJSON(i))}return this}};function bu(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=yc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let _=0,f=u.length;_<f;_++){let g=yc(h,u[_]*m,_<f-1?u[_+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(Lu(g))}p.sort(Ru);for(let _=0;_<p.length;_++)d=Pu(p[_],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return ss(s,a,t,o,c,l,0),a}function yc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=xc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=xc(a/n|0,r[a],r[a+1],s);return s&&pr(s,s.next)&&(os(s),s=s.next),s}function Li(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!pr(n,n.next)&&Dt(n.prev,n,n.next)!==0)n=n.next;else{if(os(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ss(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Fo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,_=1;do{let f,g=m;m=null;let v=null;for(p=0;g;){p++;let y=g,b=0;for(let C=0;C<_&&(b++,y=y.nextZ,y);C++);let S=_;for(;b>0||S>0&&y;)b!==0&&(S===0||!y||g.z<=y.z)?(f=g,g=g.nextZ,b--):(f=y,y=y.nextZ,S--),v?v.nextZ=f:m=f,f.prevZ=v,v=f;g=y}v.nextZ=null,_*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?Eu(r,n,i,s):wu(r))e.push(c.i,r.i,l.i),os(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?ss(r=Au(Li(r),e),e,t,n,i,s,2):a===2&&Cu(r,e,t,n,i,s):ss(Li(r),e,t,n,i,s,1);break}}}function wu(r){let e=r.prev,t=r,n=r.next;if(Dt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&Br(i,o,s,c,a,l,p.x,p.y)&&Dt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Eu(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Dt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),_=Math.max(o,c,l),f=Math.max(h,u,d),g=Fo(m,p,e,t,n),v=Fo(_,f,e,t,n),y=r.prevZ,b=r.nextZ;for(;y&&y.z>=g&&b&&b.z<=v;){if(y.x>=m&&y.x<=_&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&Br(o,h,c,u,l,d,y.x,y.y)&&Dt(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=m&&b.x<=_&&b.y>=p&&b.y<=f&&b!==i&&b!==a&&Br(o,h,c,u,l,d,b.x,b.y)&&Dt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=g;){if(y.x>=m&&y.x<=_&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&Br(o,h,c,u,l,d,y.x,y.y)&&Dt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=m&&b.x<=_&&b.y>=p&&b.y<=f&&b!==i&&b!==a&&Br(o,h,c,u,l,d,b.x,b.y)&&Dt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Au(r,e){let t=r;do{let n=t.prev,i=t.next.next;!pr(n,i)&&Th(n,t,t.next,i)&&as(n,i)&&as(i,n)&&(e.push(n.i,t.i,i.i),os(t),os(t.next),t=r=i),t=t.next}while(t!==r);return Li(t)}function Cu(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Du(a,o)){let c=bh(a,o);return a=Li(a,a.next),c=Li(c,c.next),ss(a,e,t,n,i,s,0),void ss(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function Ru(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Pu(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(pr(i,a))return a;do{if(pr(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let _=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(_<=o&&_>h&&(h=_,l=a.x<a.next.x?a:a.next,_===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Sh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let _=Math.abs(c-a.y)/(o-a.x);as(a,i)&&(_<p||_===p&&(a.x>l.x||a.x===l.x&&Iu(l,a)))&&(l=a,p=_)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=bh(t,r);return Li(n,n.next),Li(t,t.next)}function Iu(r,e){return Dt(r.prev,r,e.prev)<0&&Dt(e.next,r,r.next)<0}function Fo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Lu(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Sh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Br(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Sh(r,e,t,n,i,s,a,o)}function Du(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Th(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(as(r,e)&&as(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Dt(r.prev,r,e.prev)||Dt(r,e.prev,e))||pr(r,e)&&Dt(r.prev,r,r.next)>0&&Dt(e.prev,e,e.next)>0)}function Dt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function pr(r,e){return r.x===e.x&&r.y===e.y}function Th(r,e,t,n){let i=Ws(Dt(r,e,t)),s=Ws(Dt(r,e,n)),a=Ws(Dt(t,n,r)),o=Ws(Dt(t,n,e));return i!==s&&a!==o||!(i!==0||!Hs(r,t,e))||!(s!==0||!Hs(r,n,e))||!(a!==0||!Hs(t,r,n))||!(o!==0||!Hs(t,e,n))}function Hs(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ws(r){return r>0?1:r<0?-1:0}function as(r,e){return Dt(r.prev,r,r.next)<0?Dt(r,e,r.next)>=0&&Dt(r,r.prev,e)>=0:Dt(r,e,r.prev)<0||Dt(r,r.next,e)<0}function bh(r,e){let t=Oo(r.i,r.x,r.y),n=Oo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function xc(r,e,t,n){let i=Oo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function os(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Oo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Bo=class{static triangulate(e,t,n=2){return bu(e,t,n)}},Vn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Mc(e),Sc(n,e);let a=e.length;t.forEach(Mc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Sc(n,t[c]);let o=Bo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Mc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Sc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var kt=class r extends ct{constructor(e=new jt([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Uu,y,b,S,C,D,F=!1;g&&(y=g.getSpacedPoints(h),F=!0,d=!1,b=g.computeFrenetFrames(h,!1),S=new A,C=new A,D=new A),d||(f=0,m=0,p=0,_=0);let L=o.extractPoints(l),k=L.shape,q=L.holes;if(!Vn.isClockWise(k)){k=k.reverse();for(let N=0,x=q.length;N<x;N++){let P=q[N];Vn.isClockWise(P)&&(q[N]=P.reverse())}}function G(N){let x=10000000000000001e-36,P=N[0];for(let z=1;z<=N.length;z++){let U=z%N.length,re=N[U],Y=re.x-P.x,J=re.y-P.y,pe=Y*Y+J*J,Se=Math.max(Math.abs(re.x),Math.abs(re.y),Math.abs(P.x),Math.abs(P.y));pe<=x*Se*Se?(N.splice(U,1),z--):P=re}}G(k),q.forEach(G);let te=q.length,j=k;for(let N=0;N<te;N++){let x=q[N];k=k.concat(x)}function $(N,x,P){return x||console.error("THREE.ExtrudeGeometry: vec does not exist"),N.clone().addScaledVector(x,P)}let ne=k.length;function fe(N,x,P){let z,U,re,Y=N.x-x.x,J=N.y-x.y,pe=P.x-N.x,Se=P.y-N.y,me=Y*Y+J*J,xe=Y*Se-J*pe;if(Math.abs(xe)>Number.EPSILON){let Ue=Math.sqrt(me),ze=Math.sqrt(pe*pe+Se*Se),Je=x.x-J/Ue,Ge=x.y+Y/Ue,$e=((P.x-Se/ze-Je)*Se-(P.y+pe/ze-Ge)*pe)/(Y*Se-J*pe);z=Je+Y*$e-N.x,U=Ge+J*$e-N.y;let Ee=z*z+U*U;if(Ee<=2)return new de(z,U);re=Math.sqrt(Ee/2)}else{let Ue=!1;Y>Number.EPSILON?pe>Number.EPSILON&&(Ue=!0):Y<-Number.EPSILON?pe<-Number.EPSILON&&(Ue=!0):Math.sign(J)===Math.sign(Se)&&(Ue=!0),Ue?(z=-J,U=Y,re=Math.sqrt(me)):(z=Y,U=J,re=Math.sqrt(me/2))}return new de(z/re,U/re)}let he=[];for(let N=0,x=j.length,P=x-1,z=N+1;N<x;N++,P++,z++)P===x&&(P=0),z===x&&(z=0),he[N]=fe(j[N],j[P],j[z]);let Pe=[],oe,ve,Ce=he.concat();for(let N=0,x=te;N<x;N++){let P=q[N];oe=[];for(let z=0,U=P.length,re=U-1,Y=z+1;z<U;z++,re++,Y++)re===U&&(re=0),Y===U&&(Y=0),oe[z]=fe(P[z],P[re],P[Y]);Pe.push(oe),Ce=Ce.concat(oe)}if(f===0)ve=Vn.triangulateShape(j,q);else{let N=[],x=[];for(let P=0;P<f;P++){let z=P/f,U=m*Math.cos(z*Math.PI/2),re=p*Math.sin(z*Math.PI/2)+_;for(let Y=0,J=j.length;Y<J;Y++){let pe=$(j[Y],he[Y],re);W(pe.x,pe.y,-U),z===0&&N.push(pe)}for(let Y=0,J=te;Y<J;Y++){let pe=q[Y];oe=Pe[Y];let Se=[];for(let me=0,xe=pe.length;me<xe;me++){let Ue=$(pe[me],oe[me],re);W(Ue.x,Ue.y,-U),z===0&&Se.push(Ue)}z===0&&x.push(Se)}}ve=Vn.triangulateShape(N,x)}let ce=ve.length,_e=p+_;for(let N=0;N<ne;N++){let x=d?$(k[N],Ce[N],_e):k[N];F?(C.copy(b.normals[0]).multiplyScalar(x.x),S.copy(b.binormals[0]).multiplyScalar(x.y),D.copy(y[0]).add(C).add(S),W(D.x,D.y,D.z)):W(x.x,x.y,0)}for(let N=1;N<=h;N++)for(let x=0;x<ne;x++){let P=d?$(k[x],Ce[x],_e):k[x];F?(C.copy(b.normals[N]).multiplyScalar(P.x),S.copy(b.binormals[N]).multiplyScalar(P.y),D.copy(y[N]).add(C).add(S),W(D.x,D.y,D.z)):W(P.x,P.y,u/h*N)}for(let N=f-1;N>=0;N--){let x=N/f,P=m*Math.cos(x*Math.PI/2),z=p*Math.sin(x*Math.PI/2)+_;for(let U=0,re=j.length;U<re;U++){let Y=$(j[U],he[U],z);W(Y.x,Y.y,u+P)}for(let U=0,re=q.length;U<re;U++){let Y=q[U];oe=Pe[U];for(let J=0,pe=Y.length;J<pe;J++){let Se=$(Y[J],oe[J],z);F?W(Se.x,Se.y+y[h-1].y,y[h-1].x+P):W(Se.x,Se.y,u+P)}}}function Q(N,x){let P=N.length;for(;--P>=0;){let z=P,U=P-1;U<0&&(U=N.length-1);for(let re=0,Y=h+2*f;re<Y;re++){let J=ne*re,pe=ne*(re+1);w(x+z+J,x+U+J,x+U+pe,x+z+pe)}}}function W(N,x,P){c.push(N),c.push(x),c.push(P)}function ye(N,x,P){E(N),E(x),E(P);let z=i.length/3,U=v.generateTopUV(n,i,z-3,z-2,z-1);V(U[0]),V(U[1]),V(U[2])}function w(N,x,P,z){E(N),E(x),E(z),E(x),E(P),E(z);let U=i.length/3,re=v.generateSideWallUV(n,i,U-6,U-3,U-2,U-1);V(re[0]),V(re[1]),V(re[3]),V(re[1]),V(re[2]),V(re[3])}function E(N){i.push(c[3*N+0]),i.push(c[3*N+1]),i.push(c[3*N+2])}function V(N){s.push(N.x),s.push(N.y)}(function(){let N=i.length/3;if(d){let x=0,P=ne*x;for(let z=0;z<ce;z++){let U=ve[z];ye(U[2]+P,U[1]+P,U[0]+P)}x=h+2*f,P=ne*x;for(let z=0;z<ce;z++){let U=ve[z];ye(U[0]+P,U[1]+P,U[2]+P)}}else{for(let x=0;x<ce;x++){let P=ve[x];ye(P[2],P[1],P[0])}for(let x=0;x<ce;x++){let P=ve[x];ye(P[0]+ne*h,P[1]+ne*h,P[2]+ne*h)}}n.addGroup(N,i.length/3-N,0)})(),(function(){let N=i.length/3,x=0;Q(j,x),x+=j.length;for(let P=0,z=q.length;P<z;P++){let U=q[P];Q(U,x),x+=U.length}n.addGroup(N,i.length/3-N,1)})()}this.setAttribute("position",new Fe(i,3)),this.setAttribute("uv",new Fe(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ha[i.type]().fromJSON(i)),new r(n,e.options)}},Uu={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new de(s,a),new de(o,c),new de(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],_=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new de(a,1-c),new de(l,1-u),new de(d,1-p),new de(_,1-g)]:[new de(o,1-c),new de(h,1-u),new de(m,1-p),new de(f,1-g)]}},da=class r extends Si{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Di=class r extends ct{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=st(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new A,d=new de,m=new A,p=new A,_=new A,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,_.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=_.x,m.y+=_.y,m.z+=_.z,m.normalize(),c.push(m.x,m.y,m.z),_.copy(p)}for(let v=0;v<=t;v++){let y=n+v*h*i,b=Math.sin(y),S=Math.cos(y);for(let C=0;C<=e.length-1;C++){u.x=e[C].x*b,u.y=e[C].y,u.z=e[C].x*S,a.push(u.x,u.y,u.z),d.x=v/t,d.y=C/(e.length-1),o.push(d.x,d.y);let D=c[3*C+0]*b,F=c[3*C+1],L=c[3*C+0]*S;l.push(D,F,L)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let b=y+v*e.length,S=b,C=b+e.length,D=b+e.length+1,F=b+1;s.push(S,C,F),s.push(D,F,C)}this.setIndex(s),this.setAttribute("position",new Fe(a,3)),this.setAttribute("uv",new Fe(o,2)),this.setAttribute("normal",new Fe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},pa=class r extends Si{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Bt=class r extends ct{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],_=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let y=0;y<l;y++){let b=y*u-s;p.push(b,-v,0),_.push(0,0,1),f.push(y/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let y=v+l*g,b=v+l*(g+1),S=v+1+l*(g+1),C=v+1+l*g;m.push(y,b,C),m.push(b,S,C)}this.setIndex(m),this.setAttribute("position",new Fe(p,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},ma=class r extends ct{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new A,p=new de;for(let _=0;_<=i;_++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){let f=_*(n+1);for(let g=0;g<n;g++){let v=g+f,y=v,b=v+n+1,S=v+n+2,C=v+1;o.push(y,b,C),o.push(b,S,C)}}this.setIndex(o),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(l,3)),this.setAttribute("uv",new Fe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Ui=class r extends ct{constructor(e=new jt([new de(0,.5),new de(-.5,-.5),new de(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;Vn.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let v=p[f];Vn.isClockWise(v)===!0&&(p[f]=v.reverse())}let _=Vn.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let v=p[f];m=m.concat(v)}for(let f=0,g=m.length;f<g;f++){let v=m[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=_.length;f<g;f++){let v=_[f],y=v[0]+u,b=v[1]+u,S=v[2]+u;n.push(y,b,S),c+=3}}this.setIndex(n),this.setAttribute("position",new Fe(i,3)),this.setAttribute("normal",new Fe(s,3)),this.setAttribute("uv",new Fe(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},qt=class r extends ct{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new A,d=new A,m=[],p=[],_=[],f=[];for(let g=0;g<=n;g++){let v=[],y=g/n,b=0;g===0&&a===0?b=.5/t:g===n&&c===Math.PI&&(b=-.5/t);for(let S=0;S<=t;S++){let C=S/t;u.x=-e*Math.cos(i+C*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+C*s)*Math.sin(a+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),f.push(C+b,1-y),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let y=h[g][v+1],b=h[g][v],S=h[g+1][v],C=h[g+1][v+1];(g!==0||a>0)&&m.push(y,b,C),(g!==n-1||c<Math.PI)&&m.push(b,S,C)}this.setIndex(m),this.setAttribute("position",new Fe(p,3)),this.setAttribute("normal",new Fe(_,3)),this.setAttribute("uv",new Fe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},fa=class r extends Si{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Et=class r extends ct{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new A,u=new A,d=new A;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let _=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(_),u.y=(e+t*Math.cos(f))*Math.sin(_),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let _=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,v=(i+1)*m+p;a.push(_,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new Fe(o,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},ga=class r extends ct{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new A,d=new A,m=new A,p=new A,_=new A,f=new A,g=new A;for(let y=0;y<=n;++y){let b=y/n*s*Math.PI*2;v(b,s,a,e,m),v(b+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),_.crossVectors(f,g),g.crossVectors(_,f),_.normalize(),g.normalize();for(let S=0;S<=i;++S){let C=S/i*Math.PI*2,D=-t*Math.cos(C),F=t*Math.sin(C);u.x=m.x+(D*g.x+F*_.x),u.y=m.y+(D*g.y+F*_.y),u.z=m.z+(D*g.z+F*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(S/i)}}for(let y=1;y<=n;y++)for(let b=1;b<=i;b++){let S=(i+1)*(y-1)+(b-1),C=(i+1)*y+(b-1),D=(i+1)*y+b,F=(i+1)*(y-1)+b;o.push(S,C,F),o.push(C,D,F)}function v(y,b,S,C,D){let F=Math.cos(y),L=Math.sin(y),k=S/b*y,q=Math.cos(k);D.x=C*(2+q)*.5*F,D.y=C*(2+q)*L*.5,D.z=C*Math.sin(k)*.5}this.setIndex(o),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(l,3)),this.setAttribute("uv",new Fe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Rt=class r extends ct{constructor(e=new is(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new A,c=new A,l=new de,h=new A,u=[],d=[],m=[],p=[];function _(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let y=0;y<=i;y++){let b=y/i*Math.PI*2,S=Math.sin(b),C=-Math.cos(b);c.x=C*g.x+S*v.x,c.y=C*g.y+S*v.y,c.z=C*g.z+S*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)_(f);_(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),y=(i+1)*f+(g-1),b=(i+1)*f+g,S=(i+1)*(f-1)+g;p.push(v,y,S),p.push(y,b,S)}})()})(),this.setIndex(p),this.setAttribute("position",new Fe(u,3)),this.setAttribute("normal",new Fe(d,3)),this.setAttribute("uv",new Fe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},va=class extends ct{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new A,s=new A;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let _=0;_<3;_++){let f=o.getX(m+_),g=o.getX(m+(_+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Tc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Tc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Fe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Tc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var mm=Object.freeze({__proto__:null,BoxGeometry:gt,CapsuleGeometry:ur,CircleGeometry:ai,ConeGeometry:ra,CylinderGeometry:Ze,DodecahedronGeometry:sa,EdgesGeometry:aa,ExtrudeGeometry:kt,IcosahedronGeometry:da,LatheGeometry:Di,OctahedronGeometry:pa,PlaneGeometry:Bt,PolyhedronGeometry:Si,RingGeometry:ma,ShapeGeometry:Ui,SphereGeometry:qt,TetrahedronGeometry:fa,TorusGeometry:Et,TorusKnotGeometry:ga,TubeGeometry:Rt,WireframeGeometry:va}),ls=class extends si{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new qe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Tn=class extends si{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends Tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var _a=class extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ya=class extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Xs(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Nu(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Ni=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xa=class extends Ni{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Io,endingEnd:Io}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Lo:s=e,o=2*t-n;break;case Do:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Lo:a=e,c=2*n-t;break;case Do:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),_=p*p,f=_*p,g=-d*f+2*d*_-d*p,v=(1+d)*f+(-1.5-2*d)*_+(-.5+d)*p+1,y=(-1-m)*f+(1.5+m)*_+.5*p,b=m*f-m*_;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+v*a[l+S]+y*a[c+S]+b*a[u+S];return s}},Ma=class extends Ni{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Sa=class extends Ni{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},un=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xs(t,this.TimeBufferType),this.values=Xs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xs(e.times,Array),values:Xs(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case Zs:t=this.InterpolantFactoryMethodLinear;break;case js:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return Zs;case this.InterpolantFactoryMethodSmooth:return js}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Nu(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===js,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};un.prototype.ValueTypeName="",un.prototype.TimeBufferType=Float32Array,un.prototype.ValueBufferType=Float32Array,un.prototype.DefaultInterpolation=Zs;var yi=class extends un{constructor(e,t,n){super(e,t,n)}};yi.prototype.ValueTypeName="bool",yi.prototype.ValueBufferType=Array,yi.prototype.DefaultInterpolation=kr,yi.prototype.InterpolantFactoryMethodLinear=void 0,yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends un{constructor(e,t,n,i){super(e,t,n,i)}};Ta.prototype.ValueTypeName="color";var ba=class extends un{constructor(e,t,n,i){super(e,t,n,i)}};ba.prototype.ValueTypeName="number";var wa=class extends Ni{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)dn.slerpFlat(s,0,a,l-o,a,l,c);return s}},cs=class extends un{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new wa(this.times,this.values,this.getValueSize(),e)}};cs.prototype.ValueTypeName="quaternion",cs.prototype.InterpolantFactoryMethodSmooth=void 0;var xi=class extends un{constructor(e,t,n){super(e,t,n)}};xi.prototype.ValueTypeName="string",xi.prototype.ValueBufferType=Array,xi.prototype.DefaultInterpolation=kr,xi.prototype.InterpolantFactoryMethodLinear=void 0,xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends un{constructor(e,t,n,i){super(e,t,n,i)}};Ea.prototype.ValueTypeName="vector";var Aa=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},wh=new Aa,Ca=class{constructor(e){this.manager=e!==void 0?e:wh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ca.DEFAULT_MATERIAL_NAME="__DEFAULT";var mr=class extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ln=class extends mr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Co=new Qe,bc=new A,wc=new A,Ra=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mi,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(bc),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),Co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Co)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ec=new Qe,Or=new A,Ro=new A,zo=class extends Ra{constructor(){super(new Lt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new ft(2,1,1,1),new ft(0,1,1,1),new ft(3,1,1,1),new ft(1,1,1,1),new ft(3,0,1,1),new ft(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Or.setFromMatrixPosition(e.matrixWorld),n.position.copy(Or),Ro.copy(n.position),Ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ro),n.updateMatrixWorld(),i.makeTranslation(-Or.x,-Or.y,-Or.z),Ec.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec,n.coordinateSystem,n.reversedDepth)}},fr=class extends mr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},oi=class extends cr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Go=class extends Ra{constructor(){super(new oi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Dn=class extends mr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new Go}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var fm=new Qe,gm=new Qe,vm=new Qe;var Pa=class extends Lt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var _m=new A,ym=new dn,xm=new A,Mm=new A,Sm=new A;var Tm=new A,bm=new dn,wm=new A,Em=new A;var Ll="\\[\\]\\.:\\/",Fu=new RegExp("["+Ll+"]","g"),Po="[^"+Ll+"]",Ou="[^"+Ll.replace("\\.","")+"]",Bu=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Po)+/(WCOD+)?/.source.replace("WCOD",Ou)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Po)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Po)+"$"),zu=["material","materials","bones","map"],Ct=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fu,"")}static parseTrackName(e){let t=Bu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);zu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=class{constructor(r,e,t){let n=t||Ct.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray],Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Am=new Float32Array(1);var Cm=new Qe;var Rm=new de;var Pm=new A,Im=new A,Lm=new A,Dm=new A,Um=new A,Nm=new A,Fm=new A;var Om=new A;var Bm=new A,zm=new Qe,Gm=new Qe;var km=new A,Vm=new qe,Hm=new qe;var Wm=new A,Xm=new A,jm=new A;var qm=new A,Ym=new cr;var Zm=new xn;var Jm=new A;function Dl(r,e,t,n){let i=(function(s){switch(s){case qn:case qo:return{byteLength:1,components:1};case yr:case Yo:case bi:return{byteLength:2,components:1};case Ha:case Wa:return{byteLength:2,components:4};case Bi:case Va:case Un:return{byteLength:4,components:1};case Zo:case Jo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Xa:case ja:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Nn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Zh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function ku(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var rt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ae={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},Yn={basic:{uniforms:en([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:en([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new qe(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:en([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:en([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:en([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new qe(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:en([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:en([Ae.points,Ae.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:en([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:en([Ae.common,Ae.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:en([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:en([Ae.sprite,Ae.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:en([Ae.common,Ae.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:en([Ae.lights,Ae.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Yn.physical={uniforms:en([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var Ka={r:0,b:0,g:0},ki=new In,Vu=new Qe;function Hu(r,e,t,n,i,s,a){let o=new qe(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function _(f,g){f.getRGB(Ka,Pl(r)),n.buffers.color.setClear(Ka.r,Ka.g,Ka.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,_(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,_(o,h)},render:function(f){let g=!1,v=p(f);v===null?_(o,h):v&&v.isColor&&(_(v,1),g=!0);let y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=p(g);v&&(v.isCubeTexture||v.mapping===ds)?(l===void 0&&(l=new pt(new gt(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:Gi(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,b,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),ki.copy(g.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vu.makeRotationFromEuler(ki)),l.material.toneMapped=ut.getTransfer(v.colorSpace)!==vt,u===v&&d===v.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new pt(new Bt(2,2),new Qt({name:"BackgroundMaterial",uniforms:Gi(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:gr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=ut.getTransfer(v.colorSpace)!==vt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Wu(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],y=[],b=[];for(let S=0;S<t;S++)v[S]=0,y[S]=0,b[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:y,attributeDivisors:b,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,y=g.length;v<y;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let y=s.newAttributes,b=s.enabledAttributes,S=s.attributeDivisors;y[g]=1,b[g]===0&&(r.enableVertexAttribArray(g),b[g]=1),S[g]!==v&&(r.vertexAttribDivisor(g,v),S[g]=v)}function m(){let g=s.newAttributes,v=s.enabledAttributes;for(let y=0,b=v.length;y<b;y++)v[y]!==g[y]&&(r.disableVertexAttribArray(y),v[y]=0)}function p(g,v,y,b,S,C,D){D===!0?r.vertexAttribIPointer(g,v,y,S,C):r.vertexAttribPointer(g,v,y,b,S,C)}function _(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,y,b,S){let C=!1,D=(function(F,L,k){let q=k.wireframe===!0,G=n[F.id];G===void 0&&(G={},n[F.id]=G);let te=G[L.id];te===void 0&&(te={},G[L.id]=te);let j=te[q];return j===void 0&&(j=l(r.createVertexArray()),te[q]=j),j})(b,y,v);s!==D&&(s=D,o(s.object)),C=(function(F,L,k,q){let G=s.attributes,te=L.attributes,j=0,$=k.getAttributes();for(let ne in $)if($[ne].location>=0){let fe=G[ne],he=te[ne];if(he===void 0&&(ne==="instanceMatrix"&&F.instanceMatrix&&(he=F.instanceMatrix),ne==="instanceColor"&&F.instanceColor&&(he=F.instanceColor)),fe===void 0||fe.attribute!==he||he&&fe.data!==he.data)return!0;j++}return s.attributesNum!==j||s.index!==q})(g,b,y,S),C&&(function(F,L,k,q){let G={},te=L.attributes,j=0,$=k.getAttributes();for(let ne in $)if($[ne].location>=0){let fe=te[ne];fe===void 0&&(ne==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),ne==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor));let he={};he.attribute=fe,fe&&fe.data&&(he.data=fe.data),G[ne]=he,j++}s.attributes=G,s.attributesNum=j,s.index=q})(g,b,y,S),S!==null&&e.update(S,r.ELEMENT_ARRAY_BUFFER),(C||a)&&(a=!1,(function(F,L,k,q){h();let G=q.attributes,te=k.getAttributes(),j=L.defaultAttributeValues;for(let $ in te){let ne=te[$];if(ne.location>=0){let fe=G[$];if(fe===void 0&&($==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),$==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor)),fe!==void 0){let he=fe.normalized,Pe=fe.itemSize,oe=e.get(fe);if(oe===void 0)continue;let ve=oe.buffer,Ce=oe.type,ce=oe.bytesPerElement,_e=Ce===r.INT||Ce===r.UNSIGNED_INT||fe.gpuType===Va;if(fe.isInterleavedBufferAttribute){let Q=fe.data,W=Q.stride,ye=fe.offset;if(Q.isInstancedInterleavedBuffer){for(let w=0;w<ne.locationSize;w++)d(ne.location+w,Q.meshPerAttribute);F.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let w=0;w<ne.locationSize;w++)u(ne.location+w);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let w=0;w<ne.locationSize;w++)p(ne.location+w,Pe/ne.locationSize,Ce,he,W*ce,(ye+Pe/ne.locationSize*w)*ce,_e)}else{if(fe.isInstancedBufferAttribute){for(let Q=0;Q<ne.locationSize;Q++)d(ne.location+Q,fe.meshPerAttribute);F.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Q=0;Q<ne.locationSize;Q++)u(ne.location+Q);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let Q=0;Q<ne.locationSize;Q++)p(ne.location+Q,Pe/ne.locationSize,Ce,he,Pe*ce,Pe/ne.locationSize*Q*ce,_e)}}else if(j!==void 0){let he=j[$];if(he!==void 0)switch(he.length){case 2:r.vertexAttrib2fv(ne.location,he);break;case 3:r.vertexAttrib3fv(ne.location,he);break;case 4:r.vertexAttrib4fv(ne.location,he);break;default:r.vertexAttrib1fv(ne.location,he)}}}}m()})(g,v,y,b),S!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:_,resetDefaultState:f,dispose:function(){_();for(let g in n){let v=n[g];for(let y in v){let b=v[y];for(let S in b)c(b[S].object),delete b[S];delete v[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let y in v){let b=v[y];for(let S in b)c(b[S].object),delete b[S];delete v[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let y=n[v];if(y[g.id]===void 0)continue;let b=y[g.id];for(let S in b)c(b[S].object),delete b[S];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Xu(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function ju(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Nn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==qn&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Un&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function qu(r){let e=this,t=null,n=0,i=!1,s=!1,a=new kn,o=new it,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,_=null;if(p!==0){if(_=c.value,m!==!0||_===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(_===null||_.length<f)&&(_=new Float32Array(f));for(let v=0,y=d;v!==p;++v,y+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(_,y),_[y+3]=a.constant}c.value=_,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,_}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,_=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!_)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,y=f.clippingState||null;c.value=y,y=l(m,u,v,d);for(let b=0;b!==v;++b)y[b]=t[b];f.clippingState=y,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function Yu(r){let e=new WeakMap;function t(i,s){return s===za?i.mapping=_r:s===Ga&&(i.mapping=Fi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===za||s===Ga){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new ta(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Eh=[.125,.215,.35,.446,.526,.582],gs=20,Ul=new oi,Ah=new qe,Nl=null,Fl=0,Ol=0,Bl=!1,Hi=(1+Math.sqrt(5))/2,Sr=1/Hi,Ch=[new A(-Hi,Sr,0),new A(Hi,Sr,0),new A(-Sr,0,Hi),new A(Sr,0,Hi),new A(0,Hi,-Sr),new A(0,Hi,Sr),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Zu=new A,br=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Zu}=s;Nl=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),Bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nl,Fl,Ol),this._renderer.xr.enabled=Bl,e.scissorTest=!1,$a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_r||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nl=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),Bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:bi,format:Nn,colorSpace:Pi,depthBuffer:!1},i=Rh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Eh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=Eh[d-a+4-1]:d===0&&(p=0),l.push(p);let _=1/(m-2),f=-_,g=1+_,v=[f,f,g,f,g,g,f,f,g,g,f,g],y=6,b=6,S=3,C=2,D=1,F=new Float32Array(S*b*y),L=new Float32Array(C*b*y),k=new Float32Array(D*b*y);for(let G=0;G<y;G++){let te=G%3*2/3-1,j=G>2?0:-1,$=[te,j,0,te+2/3,j,0,te+2/3,j+1,0,te,j,0,te+2/3,j+1,0,te,j+1,0];F.set($,S*b*G),L.set(v,C*b*G);let ne=[G,G,G,G,G,G];k.set(ne,D*b*G)}let q=new ct;q.setAttribute("position",new an(F,S)),q.setAttribute("uv",new an(L,C)),q.setAttribute("faceIndex",new an(k,D)),o.push(q),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(gs),h=new A(0,1,0);return new Qt({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,Ul)}_sceneToCubeUV(e,t,n,i,s){let a=new Lt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Ah),l.toneMapping=li,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new Sn({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),m=new pt(new gt,d),p=!1,_=e.background;_?_.isColor&&(d.color.copy(_),e.background=null,p=!0):(d.color.copy(Ah),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;$a(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=_}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===_r||e.mapping===Fi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new pt(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;$a(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Ul)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ch[(i-s-1)%Ch.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new pt(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,_=isFinite(s)?1+Math.floor(3*p):gs;_>gs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to 20`);let f=[],g=0;for(let b=0;b<gs;++b){let S=b/p,C=Math.exp(-S*S/2);f.push(C),b===0?g+=C:b<_&&(g+=2*C)}for(let b=0;b<f.length;b++)f[b]=f[b]/g;u.envMap.value=e.texture,u.samples.value=_,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let y=this._sizeLods[i];$a(t,3*y*(i>v-4?i-v+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Ul)}};function Rh(r,e,t){let n=new yn(r,e,t);return n.texture.mapping=ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $a(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Ph(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Ih(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Yl(){return`

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
	`}function Ju(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===za||s===Ga,o=s===_r||s===Fi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new br(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new br(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Ku(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&or("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $u(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let _=h.array;d=h.version;for(let f=0,g=_.length;f<g;f+=3){let v=_[f+0],y=_[f+1],b=_[f+2];l.push(v,y,y,b,b,v)}}else{if(u===void 0)return;{let _=u.array;d=u.version;for(let f=0,g=_.length/3-1;f<g;f+=3){let v=f+0,y=f+1,b=f+2;l.push(v,y,y,b,b,v)}}}let m=new(Rl(l)?Yr:qr)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Qu(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function ed(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function td(r,e,t){let n=new WeakMap,i=new ft;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let F=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",F)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),p===!0&&(v=3);let y=a.attributes.position.count*v,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let S=new Float32Array(y*b*4*h),C=new Xr(S,y,b,h);C.type=Un,C.needsUpdate=!0;let D=4*v;for(let L=0;L<h;L++){let k=_[L],q=f[L],G=g[L],te=y*b*4*L;for(let j=0;j<k.count;j++){let $=j*D;d===!0&&(i.fromBufferAttribute(k,j),S[te+$+0]=i.x,S[te+$+1]=i.y,S[te+$+2]=i.z,S[te+$+3]=0),m===!0&&(i.fromBufferAttribute(q,j),S[te+$+4]=i.x,S[te+$+5]=i.y,S[te+$+6]=i.z,S[te+$+7]=0),p===!0&&(i.fromBufferAttribute(G,j),S[te+$+8]=i.x,S[te+$+9]=i.y,S[te+$+10]=i.z,S[te+$+11]=G.itemSize===4?i.w:1)}}u={count:h,texture:C,size:new de(y,b)},n.set(a,u),a.addEventListener("dispose",F)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function nd(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Jh=new nn,Lh=new $r(1,1),Kh=new Xr,$h=new Qs,Qh=new Zr,Dh=[],Uh=[],Nh=new Float32Array(16),Fh=new Float32Array(9),Oh=new Float32Array(4);function wr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Dh[i];if(s===void 0&&(s=new Float32Array(i),Dh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Vt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ht(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function eo(r,e){let t=Uh[e];t===void 0&&(t=new Int32Array(e),Uh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function id(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function rd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;r.uniform2fv(this.addr,e),Ht(t,e)}}function sd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;r.uniform3fv(this.addr,e),Ht(t,e)}}function ad(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;r.uniform4fv(this.addr,e),Ht(t,e)}}function od(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Oh.set(n),r.uniformMatrix2fv(this.addr,!1,Oh),Ht(t,n)}}function ld(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Fh.set(n),r.uniformMatrix3fv(this.addr,!1,Fh),Ht(t,n)}}function cd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Nh.set(n),r.uniformMatrix4fv(this.addr,!1,Nh),Ht(t,n)}}function hd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function ud(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;r.uniform2iv(this.addr,e),Ht(t,e)}}function dd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;r.uniform3iv(this.addr,e),Ht(t,e)}}function pd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;r.uniform4iv(this.addr,e),Ht(t,e)}}function md(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function fd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;r.uniform2uiv(this.addr,e),Ht(t,e)}}function gd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;r.uniform3uiv(this.addr,e),Ht(t,e)}}function vd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;r.uniform4uiv(this.addr,e),Ht(t,e)}}function _d(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Lh.compareFunction=Al,s=Lh):s=Jh,t.setTexture2D(e||s,i)}function yd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$h,i)}function xd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Qh,i)}function Md(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kh,i)}function Sd(r,e){r.uniform1fv(this.addr,e)}function Td(r,e){let t=wr(e,this.size,2);r.uniform2fv(this.addr,t)}function bd(r,e){let t=wr(e,this.size,3);r.uniform3fv(this.addr,t)}function wd(r,e){let t=wr(e,this.size,4);r.uniform4fv(this.addr,t)}function Ed(r,e){let t=wr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Ad(r,e){let t=wr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Cd(r,e){let t=wr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Rd(r,e){r.uniform1iv(this.addr,e)}function Pd(r,e){r.uniform2iv(this.addr,e)}function Id(r,e){r.uniform3iv(this.addr,e)}function Ld(r,e){r.uniform4iv(this.addr,e)}function Dd(r,e){r.uniform1uiv(this.addr,e)}function Ud(r,e){r.uniform2uiv(this.addr,e)}function Nd(r,e){r.uniform3uiv(this.addr,e)}function Fd(r,e){r.uniform4uiv(this.addr,e)}function Od(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Jh,s[a])}function Bd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||$h,s[a])}function zd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Qh,s[a])}function Gd(r,e,t){let n=this.cache,i=e.length,s=eo(t,i);Vt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Kh,s[a])}var Gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return id;case 35664:return rd;case 35665:return sd;case 35666:return ad;case 35674:return od;case 35675:return ld;case 35676:return cd;case 5124:case 35670:return hd;case 35667:case 35671:return ud;case 35668:case 35672:return dd;case 35669:case 35673:return pd;case 5125:return md;case 36294:return fd;case 36295:return gd;case 36296:return vd;case 35678:case 36198:case 36298:case 36306:case 35682:return _d;case 35679:case 36299:case 36307:return yd;case 35680:case 36300:case 36308:case 36293:return xd;case 36289:case 36303:case 36311:case 36292:return Md}})(t.type)}},kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Sd;case 35664:return Td;case 35665:return bd;case 35666:return wd;case 35674:return Ed;case 35675:return Ad;case 35676:return Cd;case 5124:case 35670:return Rd;case 35667:case 35671:return Pd;case 35668:case 35672:return Id;case 35669:case 35673:return Ld;case 5125:return Dd;case 36294:return Ud;case 36295:return Nd;case 36296:return Fd;case 35678:case 36198:case 36298:case 36306:case 35682:return Od;case 35679:case 36299:case 36307:return Bd;case 35680:case 36300:case 36308:case 36293:return zd;case 36289:case 36303:case 36311:case 36292:return Gd}})(t.type)}},Vl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},zl=/(\w+)(\])?(\[|\.)?/g;function Bh(r,e){r.seq.push(e),r.map[e.id]=e}function kd(r,e,t){let n=r.name,i=n.length;for(zl.lastIndex=0;;){let s=zl.exec(n),a=zl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){Bh(t,l===void 0?new Gl(o,r,e):new kl(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Vl(o),Bh(t,h)),t=h}}}var Tr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);kd(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function zh(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Vd=0,Gh=new it;function kh(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Hd(r,e){let t=(function(n){ut._getMatrix(Gh,ut.workingColorSpace,n);let i=`mat3( ${Gh.elements.map(s=>s.toFixed(4))} )`;switch(ut.getTransfer(n)){case Vr:return[i,"LinearTransferOETF"];case vt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Wd(r,e){let t;switch(e){case $c:t="Linear";break;case Qc:t="Reinhard";break;case eh:t="Cineon";break;case jn:t="ACESFilmic";break;case nh:t="AgX";break;case ih:t="Neutral";break;case th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Qa=new A;function Xd(){return ut.getLuminanceCoefficients(Qa),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Qa.x.toFixed(4)}, ${Qa.y.toFixed(4)}, ${Qa.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vs(r){return r!==""}function Vh(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var jd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(r){return r.replace(jd,Yd)}var qd=new Map;function Yd(r,e){let t=rt[e];if(t===void 0){let n=qd.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=rt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Hl(t)}var Zd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wh(r){return r.replace(Zd,Jd)}function Jd(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Xh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Kd(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(q){let G="SHADOWMAP_TYPE_BASIC";return q.shadowMapType===Vo?G="SHADOWMAP_TYPE_PCF":q.shadowMapType===Ia?G="SHADOWMAP_TYPE_PCF_SOFT":q.shadowMapType===Xn&&(G="SHADOWMAP_TYPE_VSM"),G})(t),l=(function(q){let G="ENVMAP_TYPE_CUBE";if(q.envMap)switch(q.envMapMode){case _r:case Fi:G="ENVMAP_TYPE_CUBE";break;case ds:G="ENVMAP_TYPE_CUBE_UV"}return G})(t),h=(function(q){let G="ENVMAP_MODE_REFLECTION";return q.envMap&&q.envMapMode===Fi&&(G="ENVMAP_MODE_REFRACTION"),G})(t),u=(function(q){let G="ENVMAP_BLENDING_NONE";if(q.envMap)switch(q.combine){case Zc:G="ENVMAP_BLENDING_MULTIPLY";break;case Jc:G="ENVMAP_BLENDING_MIX";break;case Kc:G="ENVMAP_BLENDING_ADD"}return G})(t),d=(function(q){let G=q.envMapCubeUVHeight;if(G===null)return null;let te=Math.log2(G)-2,j=1/G;return{texelWidth:1/(3*Math.max(Math.pow(2,te),112)),texelHeight:j,maxMip:te}})(t),m=(function(q){return[q.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",q.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vs).join(`
`)})(t),p=(function(q){let G=[];for(let te in q){let j=q[te];j!==!1&&G.push("#define "+te+" "+j)}return G.join(`
`)})(s),_=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(vs).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(vs).join(`
`),g.length>0&&(g+=`
`)):(f=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vs).join(`
`),g=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?rt.tonemapping_pars_fragment:"",t.toneMapping!==li?Wd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,Hd("linearToOutputTexel",t.outputColorSpace),Xd(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vs).join(`
`)),a=Hl(a),a=Vh(a,t),a=Hh(a,t),o=Hl(o),o=Vh(o,t),o=Hh(o,t),a=Wh(a),o=Wh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=v+f+a,b=v+g+o,S=zh(i,i.VERTEX_SHADER,y),C=zh(i,i.FRAGMENT_SHADER,b);function D(q){if(r.debug.checkShaderErrors){let G=i.getProgramInfoLog(_)||"",te=i.getShaderInfoLog(S)||"",j=i.getShaderInfoLog(C)||"",$=G.trim(),ne=te.trim(),fe=j.trim(),he=!0,Pe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(he=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,S,C);else{let oe=kh(i,S,"vertex"),ve=kh(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+$+`
`+oe+`
`+ve)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):ne!==""&&fe!==""||(Pe=!1);Pe&&(q.diagnostics={runnable:he,programLog:$,vertexShader:{log:ne,prefix:f},fragmentShader:{log:fe,prefix:g}})}i.deleteShader(S),i.deleteShader(C),F=new Tr(i,_),L=(function(G,te){let j={},$=G.getProgramParameter(te,G.ACTIVE_ATTRIBUTES);for(let ne=0;ne<$;ne++){let fe=G.getActiveAttrib(te,ne),he=fe.name,Pe=1;fe.type===G.FLOAT_MAT2&&(Pe=2),fe.type===G.FLOAT_MAT3&&(Pe=3),fe.type===G.FLOAT_MAT4&&(Pe=4),j[he]={type:fe.type,location:G.getAttribLocation(te,he),locationSize:Pe}}return j})(i,_)}let F,L;i.attachShader(_,S),i.attachShader(_,C),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_),this.getUniforms=function(){return F===void 0&&D(this),F},this.getAttributes=function(){return L===void 0&&D(this),L};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(_,37297)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vd++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=C,this}var $d=0,Wl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xl(e),t.set(e,n)),n}},Xl=class{constructor(e){this.id=$d++,this.code=e,this.usedTimes=0}};function Qd(r,e,t,n,i,s,a){let o=new jr,c=new Wl,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,y,b){let S=y.fog,C=b.geometry,D=f.isMeshStandardMaterial?y.environment:null,F=(f.isMeshStandardMaterial?t:e).get(f.envMap||D),L=F&&F.mapping===ds?F.image.height:null,k=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let q=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,G=q!==void 0?q.length:0,te,j,$,ne,fe=0;if(C.morphAttributes.position!==void 0&&(fe=1),C.morphAttributes.normal!==void 0&&(fe=2),C.morphAttributes.color!==void 0&&(fe=3),k){let mt=Yn[k];te=mt.vertexShader,j=mt.fragmentShader}else te=f.vertexShader,j=f.fragmentShader,c.update(f),$=c.getVertexShaderID(f),ne=c.getFragmentShaderID(f);let he=r.getRenderTarget(),Pe=r.state.buffers.depth.getReversed(),oe=b.isInstancedMesh===!0,ve=b.isBatchedMesh===!0,Ce=!!f.map,ce=!!f.matcap,_e=!!F,Q=!!f.aoMap,W=!!f.lightMap,ye=!!f.bumpMap,w=!!f.normalMap,E=!!f.displacementMap,V=!!f.emissiveMap,N=!!f.metalnessMap,x=!!f.roughnessMap,P=f.anisotropy>0,z=f.clearcoat>0,U=f.dispersion>0,re=f.iridescence>0,Y=f.sheen>0,J=f.transmission>0,pe=P&&!!f.anisotropyMap,Se=z&&!!f.clearcoatMap,me=z&&!!f.clearcoatNormalMap,xe=z&&!!f.clearcoatRoughnessMap,Ue=re&&!!f.iridescenceMap,ze=re&&!!f.iridescenceThicknessMap,Je=Y&&!!f.sheenColorMap,Ge=Y&&!!f.sheenRoughnessMap,$e=!!f.specularMap,Ee=!!f.specularColorMap,Oe=!!f.specularIntensityMap,We=J&&!!f.transmissionMap,Ft=J&&!!f.thicknessMap,Ie=!!f.gradientMap,tt=!!f.alphaMap,nt=f.alphaTest>0,Wt=!!f.alphaHash,_t=!!f.extensions,B=li;f.toneMapped&&(he!==null&&he.isXRRenderTarget!==!0||(B=r.toneMapping));let It={shaderID:k,shaderType:f.type,shaderName:f.name,vertexShader:te,fragmentShader:j,defines:f.defines,customVertexShaderID:$,customFragmentShaderID:ne,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:ve,batchingColor:ve&&b._colorsTexture!==null,instancing:oe,instancingColor:oe&&b.instanceColor!==null,instancingMorph:oe&&b.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?r.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Pi,alphaToCoverage:!!f.alphaToCoverage,map:Ce,matcap:ce,envMap:_e,envMapMode:_e&&F.mapping,envMapCubeUVHeight:L,aoMap:Q,lightMap:W,bumpMap:ye,normalMap:w,displacementMap:d&&E,emissiveMap:V,normalMapObjectSpace:w&&f.normalMapType===hh,normalMapTangentSpace:w&&f.normalMapType===ch,metalnessMap:N,roughnessMap:x,anisotropy:P,anisotropyMap:pe,clearcoat:z,clearcoatMap:Se,clearcoatNormalMap:me,clearcoatRoughnessMap:xe,dispersion:U,iridescence:re,iridescenceMap:Ue,iridescenceThicknessMap:ze,sheen:Y,sheenColorMap:Je,sheenRoughnessMap:Ge,specularMap:$e,specularColorMap:Ee,specularIntensityMap:Oe,transmission:J,transmissionMap:We,thicknessMap:Ft,gradientMap:Ie,opaque:f.transparent===!1&&f.blending===hs&&f.alphaToCoverage===!1,alphaMap:tt,alphaTest:nt,alphaHash:Wt,combine:f.combine,mapUv:Ce&&_(f.map.channel),aoMapUv:Q&&_(f.aoMap.channel),lightMapUv:W&&_(f.lightMap.channel),bumpMapUv:ye&&_(f.bumpMap.channel),normalMapUv:w&&_(f.normalMap.channel),displacementMapUv:E&&_(f.displacementMap.channel),emissiveMapUv:V&&_(f.emissiveMap.channel),metalnessMapUv:N&&_(f.metalnessMap.channel),roughnessMapUv:x&&_(f.roughnessMap.channel),anisotropyMapUv:pe&&_(f.anisotropyMap.channel),clearcoatMapUv:Se&&_(f.clearcoatMap.channel),clearcoatNormalMapUv:me&&_(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&_(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&_(f.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&_(f.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&_(f.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&_(f.sheenRoughnessMap.channel),specularMapUv:$e&&_(f.specularMap.channel),specularColorMapUv:Ee&&_(f.specularColorMap.channel),specularIntensityMapUv:Oe&&_(f.specularIntensityMap.channel),transmissionMapUv:We&&_(f.transmissionMap.channel),thicknessMapUv:Ft&&_(f.thicknessMap.channel),alphaMapUv:tt&&_(f.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(w||P),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!C.attributes.uv&&(Ce||tt),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Pe,skinning:b.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:G,morphTextureStride:fe,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:B,decodeVideoTexture:Ce&&f.map.isVideoTexture===!0&&ut.getTransfer(f.map.colorSpace)===vt,decodeVideoTextureEmissive:V&&f.emissiveMap.isVideoTexture===!0&&ut.getTransfer(f.emissiveMap.colorSpace)===vt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Ut,flipSided:f.side===fn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:_t&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&f.extensions.multiDraw===!0||ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)})(g,f),(function(v,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],v;if(g){let y=Yn[g];v=Mh.clone(y.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let y=0,b=h.length;y<b;y++){let S=h[y];if(S.cacheKey===g){v=S,++v.usedTimes;break}}return v===void 0&&(v=new Kd(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function ep(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function tp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function jh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function qh(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||tp),n.length>1&&n.sort(o||jh),i.length>1&&i.sort(o||jh)}}}function np(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new qh,r.set(e,[i])):t>=n.length?(i=new qh,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function ip(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new qe};break;case"SpotLight":t={position:new A,direction:new A,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new A,halfWidth:new A,halfHeight:new A}}return r[e.id]=t,t}}}var rp=0;function sp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ap(r){let e=new ip,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new A);let i=new A,s=new Qe,a=new Qe;return{setup:function(o){let c=0,l=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let u=0,d=0,m=0,p=0,_=0,f=0,g=0,v=0,y=0,b=0,S=0;o.sort(sp);for(let D=0,F=o.length;D<F;D++){let L=o[D],k=L.color,q=L.intensity,G=L.distance,te=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)c+=k.r*q,l+=k.g*q,h+=k.b*q;else if(L.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(L.sh.coefficients[j],q);S++}else if(L.isDirectionalLight){let j=e.get(L);if(j.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,ne=t.get(L);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,n.directionalShadow[u]=ne,n.directionalShadowMap[u]=te,n.directionalShadowMatrix[u]=L.shadow.matrix,f++}n.directional[u]=j,u++}else if(L.isSpotLight){let j=e.get(L);j.position.setFromMatrixPosition(L.matrixWorld),j.color.copy(k).multiplyScalar(q),j.distance=G,j.coneCos=Math.cos(L.angle),j.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),j.decay=L.decay,n.spot[m]=j;let $=L.shadow;if(L.map&&(n.spotLightMap[y]=L.map,y++,$.updateMatrices(L),L.castShadow&&b++),n.spotLightMatrix[m]=$.matrix,L.castShadow){let ne=t.get(L);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,n.spotShadow[m]=ne,n.spotShadowMap[m]=te,v++}m++}else if(L.isRectAreaLight){let j=e.get(L);j.color.copy(k).multiplyScalar(q),j.halfWidth.set(.5*L.width,0,0),j.halfHeight.set(0,.5*L.height,0),n.rectArea[p]=j,p++}else if(L.isPointLight){let j=e.get(L);if(j.color.copy(L.color).multiplyScalar(L.intensity),j.distance=L.distance,j.decay=L.decay,L.castShadow){let $=L.shadow,ne=t.get(L);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,ne.shadowCameraNear=$.camera.near,ne.shadowCameraFar=$.camera.far,n.pointShadow[d]=ne,n.pointShadowMap[d]=te,n.pointShadowMatrix[d]=L.shadow.matrix,g++}n.point[d]=j,d++}else if(L.isHemisphereLight){let j=e.get(L);j.skyColor.copy(L.color).multiplyScalar(q),j.groundColor.copy(L.groundColor).multiplyScalar(q),n.hemi[_]=j,_++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let C=n.hash;C.directionalLength===u&&C.pointLength===d&&C.spotLength===m&&C.rectAreaLength===p&&C.hemiLength===_&&C.numDirectionalShadows===f&&C.numPointShadows===g&&C.numSpotShadows===v&&C.numSpotMaps===y&&C.numLightProbes===S||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=_,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+y-b,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=S,C.directionalLength=u,C.pointLength=d,C.spotLength=m,C.rectAreaLength=p,C.hemiLength=_,C.numDirectionalShadows=f,C.numPointShadows=g,C.numSpotShadows=v,C.numSpotMaps=y,C.numLightProbes=S,n.version=rp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let _=0,f=o.length;_<f;_++){let g=o[_];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(p),m++}}},state:n}}function Yh(r){let e=new ap(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function op(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Yh(r),e.set(t,[s])):n>=i.length?(s=new Yh(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function lp(r,e,t){let n=new Mi,i=new de,s=new de,a=new ft,o=new _a({depthPacking:lh}),c=new ya,l={},h=t.maxTextureSize,u={[gr]:fn,[fn]:gr,[Ut]:Ut},d=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new ct;p.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new pt(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo;let g=this.type;function v(C,D){let F=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new yn(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(D,null,F,d,_,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(D,null,F,m,_,null)}function y(C,D,F,L){let k=null,q=F.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(q!==void 0)k=q;else if(k=F.isPointLight===!0?c:o,r.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let G=k.uuid,te=D.uuid,j=l[G];j===void 0&&(j={},l[G]=j);let $=j[te];$===void 0&&($=k.clone(),j[te]=$,D.addEventListener("dispose",S)),k=$}return k.visible=D.visible,k.wireframe=D.wireframe,k.side=L===Xn?D.shadowSide!==null?D.shadowSide:D.side:D.shadowSide!==null?D.shadowSide:u[D.side],k.alphaMap=D.alphaMap,k.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,k.map=D.map,k.clipShadows=D.clipShadows,k.clippingPlanes=D.clippingPlanes,k.clipIntersection=D.clipIntersection,k.displacementMap=D.displacementMap,k.displacementScale=D.displacementScale,k.displacementBias=D.displacementBias,k.wireframeLinewidth=D.wireframeLinewidth,k.linewidth=D.linewidth,F.isPointLight===!0&&k.isMeshDistanceMaterial===!0&&(r.properties.get(k).light=F),k}function b(C,D,F,L,k){if(C.visible===!1)return;if(C.layers.test(D.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&k===Xn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,C.matrixWorld);let G=e.update(C),te=C.material;if(Array.isArray(te)){let j=G.groups;for(let $=0,ne=j.length;$<ne;$++){let fe=j[$],he=te[fe.materialIndex];if(he&&he.visible){let Pe=y(C,he,L,k);C.onBeforeShadow(r,C,D,F,G,Pe,fe),r.renderBufferDirect(F,null,G,Pe,C,fe),C.onAfterShadow(r,C,D,F,G,Pe,fe)}}}else if(te.visible){let j=y(C,te,L,k);C.onBeforeShadow(r,C,D,F,G,j,null),r.renderBufferDirect(F,null,G,j,C,null),C.onAfterShadow(r,C,D,F,G,j,null)}}let q=C.children;for(let G=0,te=q.length;G<te;G++)b(q[G],D,F,L,k)}function S(C){C.target.removeEventListener("dispose",S);for(let D in l){let F=l[D],L=C.target.uuid;L in F&&(F[L].dispose(),delete F[L])}}this.render=function(C,D,F){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;let L=r.getRenderTarget(),k=r.getActiveCubeFace(),q=r.getActiveMipmapLevel(),G=r.state;G.setBlending(Ti),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let te=g!==Xn&&this.type===Xn,j=g===Xn&&this.type!==Xn;for(let $=0,ne=C.length;$<ne;$++){let fe=C[$],he=fe.shadow;if(he===void 0){console.warn("THREE.WebGLShadowMap:",fe,"has no shadow.");continue}if(he.autoUpdate===!1&&he.needsUpdate===!1)continue;i.copy(he.mapSize);let Pe=he.getFrameExtents();if(i.multiply(Pe),s.copy(he.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Pe.x),i.x=s.x*Pe.x,he.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Pe.y),i.y=s.y*Pe.y,he.mapSize.y=s.y)),he.map===null||te===!0||j===!0){let ve=this.type!==Xn?{minFilter:Hn,magFilter:Hn}:{};he.map!==null&&he.map.dispose(),he.map=new yn(i.x,i.y,ve),he.map.texture.name=fe.name+".shadowMap",he.camera.updateProjectionMatrix()}r.setRenderTarget(he.map),r.clear();let oe=he.getViewportCount();for(let ve=0;ve<oe;ve++){let Ce=he.getViewport(ve);a.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),G.viewport(a),he.updateMatrices(fe,ve),n=he.getFrustum(),b(D,F,he.camera,fe,this.type)}he.isPointLightShadow!==!0&&this.type===Xn&&v(he,F),he.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(L,k,q)}}var cp={[La]:Da,[Ua]:Oa,[Na]:Ba,[us]:Fa,[Da]:La,[Oa]:Ua,[Ba]:Na,[Fa]:us};function hp(r,e){let t=new function(){let x=!1,P=new ft,z=null,U=new ft(0,0,0,0);return{setMask:function(re){z===re||x||(r.colorMask(re,re,re,re),z=re)},setLocked:function(re){x=re},setClear:function(re,Y,J,pe,Se){Se===!0&&(re*=pe,Y*=pe,J*=pe),P.set(re,Y,J,pe),U.equals(P)===!1&&(r.clearColor(re,Y,J,pe),U.copy(P))},reset:function(){x=!1,z=null,U.set(-1,0,0,0)}}},n=new function(){let x=!1,P=!1,z=null,U=null,re=null;return{setReversed:function(Y){if(P!==Y){let J=e.get("EXT_clip_control");Y?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),P=Y;let pe=re;re=null,this.setClear(pe)}},getReversed:function(){return P},setTest:function(Y){Y?_e(r.DEPTH_TEST):Q(r.DEPTH_TEST)},setMask:function(Y){z===Y||x||(r.depthMask(Y),z=Y)},setFunc:function(Y){if(P&&(Y=cp[Y]),U!==Y){switch(Y){case La:r.depthFunc(r.NEVER);break;case Da:r.depthFunc(r.ALWAYS);break;case Ua:r.depthFunc(r.LESS);break;case us:r.depthFunc(r.LEQUAL);break;case Na:r.depthFunc(r.EQUAL);break;case Fa:r.depthFunc(r.GEQUAL);break;case Oa:r.depthFunc(r.GREATER);break;case Ba:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}U=Y}},setLocked:function(Y){x=Y},setClear:function(Y){re!==Y&&(P&&(Y=1-Y),r.clearDepth(Y),re=Y)},reset:function(){x=!1,z=null,U=null,re=null,P=!1}}},i=new function(){let x=!1,P=null,z=null,U=null,re=null,Y=null,J=null,pe=null,Se=null;return{setTest:function(me){x||(me?_e(r.STENCIL_TEST):Q(r.STENCIL_TEST))},setMask:function(me){P===me||x||(r.stencilMask(me),P=me)},setFunc:function(me,xe,Ue){z===me&&U===xe&&re===Ue||(r.stencilFunc(me,xe,Ue),z=me,U=xe,re=Ue)},setOp:function(me,xe,Ue){Y===me&&J===xe&&pe===Ue||(r.stencilOp(me,xe,Ue),Y=me,J=xe,pe=Ue)},setLocked:function(me){x=me},setClear:function(me){Se!==me&&(r.clearStencil(me),Se=me)},reset:function(){x=!1,P=null,z=null,U=null,re=null,Y=null,J=null,pe=null,Se=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,_=null,f=null,g=null,v=null,y=null,b=new qe(0,0,0),S=0,C=!1,D=null,F=null,L=null,k=null,q=null,G=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,j=0,$=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec($)[1]),te=j>=1):$.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),te=j>=2);let ne=null,fe={},he=r.getParameter(r.SCISSOR_BOX),Pe=r.getParameter(r.VIEWPORT),oe=new ft().fromArray(he),ve=new ft().fromArray(Pe);function Ce(x,P,z,U){let re=new Uint8Array(4),Y=r.createTexture();r.bindTexture(x,Y),r.texParameteri(x,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(x,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let J=0;J<z;J++)x===r.TEXTURE_3D||x===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,U,0,r.RGBA,r.UNSIGNED_BYTE,re):r.texImage2D(P+J,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,re);return Y}let ce={};function _e(x){o[x]!==!0&&(r.enable(x),o[x]=!0)}function Q(x){o[x]!==!1&&(r.disable(x),o[x]=!1)}ce[r.TEXTURE_2D]=Ce(r.TEXTURE_2D,r.TEXTURE_2D,1),ce[r.TEXTURE_CUBE_MAP]=Ce(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[r.TEXTURE_2D_ARRAY]=Ce(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ce[r.TEXTURE_3D]=Ce(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),_e(r.DEPTH_TEST),n.setFunc(us),E(!1),V(ko),_e(r.CULL_FACE),w(Ti);let W={[vr]:r.FUNC_ADD,[Pc]:r.FUNC_SUBTRACT,[Ic]:r.FUNC_REVERSE_SUBTRACT};W[Lc]=r.MIN,W[Dc]=r.MAX;let ye={[Uc]:r.ZERO,[Nc]:r.ONE,[Fc]:r.SRC_COLOR,[Bc]:r.SRC_ALPHA,[Wc]:r.SRC_ALPHA_SATURATE,[Vc]:r.DST_COLOR,[Gc]:r.DST_ALPHA,[Oc]:r.ONE_MINUS_SRC_COLOR,[zc]:r.ONE_MINUS_SRC_ALPHA,[Hc]:r.ONE_MINUS_DST_COLOR,[kc]:r.ONE_MINUS_DST_ALPHA,[Xc]:r.CONSTANT_COLOR,[jc]:r.ONE_MINUS_CONSTANT_COLOR,[qc]:r.CONSTANT_ALPHA,[Yc]:r.ONE_MINUS_CONSTANT_ALPHA};function w(x,P,z,U,re,Y,J,pe,Se,me){if(x!==Ti){if(d===!1&&(_e(r.BLEND),d=!0),x===Rc)re=re||P,Y=Y||z,J=J||U,P===p&&re===g||(r.blendEquationSeparate(W[P],W[re]),p=P,g=re),z===_&&U===f&&Y===v&&J===y||(r.blendFuncSeparate(ye[z],ye[U],ye[Y],ye[J]),_=z,f=U,v=Y,y=J),pe.equals(b)!==!1&&Se===S||(r.blendColor(pe.r,pe.g,pe.b,Se),b.copy(pe),S=Se),m=x,C=!1;else if(x!==m||me!==C){if(p===vr&&g===vr||(r.blendEquation(r.FUNC_ADD),p=vr,g=vr),me)switch(x){case hs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ho:r.blendFunc(r.ONE,r.ONE);break;case Wo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xo:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",x)}else switch(x){case hs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ho:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Wo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",x)}_=null,f=null,v=null,y=null,b.set(0,0,0),S=0,m=x,C=me}}else d===!0&&(Q(r.BLEND),d=!1)}function E(x){D!==x&&(x?r.frontFace(r.CW):r.frontFace(r.CCW),D=x)}function V(x){x!==Ac?(_e(r.CULL_FACE),x!==F&&(x===ko?r.cullFace(r.BACK):x===Cc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Q(r.CULL_FACE),F=x}function N(x,P,z){x?(_e(r.POLYGON_OFFSET_FILL),k===P&&q===z||(r.polygonOffset(P,z),k=P,q=z)):Q(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:_e,disable:Q,bindFramebuffer:function(x,P){return c[x]!==P&&(r.bindFramebuffer(x,P),c[x]=P,x===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),x===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(x,P){let z=h,U=!1;if(x){z=l.get(P),z===void 0&&(z=[],l.set(P,z));let re=x.textures;if(z.length!==re.length||z[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,J=re.length;Y<J;Y++)z[Y]=r.COLOR_ATTACHMENT0+Y;z.length=re.length,U=!0}}else z[0]!==r.BACK&&(z[0]=r.BACK,U=!0);U&&r.drawBuffers(z)},useProgram:function(x){return u!==x&&(r.useProgram(x),u=x,!0)},setBlending:w,setMaterial:function(x,P){x.side===Ut?Q(r.CULL_FACE):_e(r.CULL_FACE);let z=x.side===fn;P&&(z=!z),E(z),x.blending===hs&&x.transparent===!1?w(Ti):w(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),n.setFunc(x.depthFunc),n.setTest(x.depthTest),n.setMask(x.depthWrite),t.setMask(x.colorWrite);let U=x.stencilWrite;i.setTest(U),U&&(i.setMask(x.stencilWriteMask),i.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),i.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass)),N(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?_e(r.SAMPLE_ALPHA_TO_COVERAGE):Q(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:V,setLineWidth:function(x){x!==L&&(te&&r.lineWidth(x),L=x)},setPolygonOffset:N,setScissorTest:function(x){x?_e(r.SCISSOR_TEST):Q(r.SCISSOR_TEST)},activeTexture:function(x){x===void 0&&(x=r.TEXTURE0+G-1),ne!==x&&(r.activeTexture(x),ne=x)},bindTexture:function(x,P,z){z===void 0&&(z=ne===null?r.TEXTURE0+G-1:ne);let U=fe[z];U===void 0&&(U={type:void 0,texture:void 0},fe[z]=U),U.type===x&&U.texture===P||(ne!==z&&(r.activeTexture(z),ne=z),r.bindTexture(x,P||ce[x]),U.type=x,U.texture=P)},unbindTexture:function(){let x=fe[ne];x!==void 0&&x.type!==void 0&&(r.bindTexture(x.type,null),x.type=void 0,x.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},updateUBOMapping:function(x,P){let z=a.get(P);z===void 0&&(z=new WeakMap,a.set(P,z));let U=z.get(x);U===void 0&&(U=r.getUniformBlockIndex(P,x.name),z.set(x,U))},uniformBlockBinding:function(x,P){let z=a.get(P).get(x);s.get(P)!==z&&(r.uniformBlockBinding(P,z,x.__bindingPointIndex),s.set(P,z))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(x){console.error("THREE.WebGLState:",x)}},scissor:function(x){oe.equals(x)===!1&&(r.scissor(x.x,x.y,x.z,x.w),oe.copy(x))},viewport:function(x){ve.equals(x)===!1&&(r.viewport(x.x,x.y,x.z,x.w),ve.copy(x))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ne=null,fe={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,_=null,f=null,g=null,v=null,y=null,b=new qe(0,0,0),S=0,C=!1,D=null,F=null,L=null,k=null,q=null,oe.set(0,0,r.canvas.width,r.canvas.height),ve.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function up(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new de,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(w,E){return m?new OffscreenCanvas(w,E):Wr("canvas")}function _(w,E,V){let N=1,x=ye(w);if((x.width>V||x.height>V)&&(N=V/Math.max(x.width,x.height)),N<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let P=Math.floor(N*x.width),z=Math.floor(N*x.height);u===void 0&&(u=p(P,z));let U=E?p(P,z):u;return U.width=P,U.height=z,U.getContext("2d").drawImage(w,0,0,P,z),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+P+"x"+z+")."),U}return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),w}return w}function f(w){return w.generateMipmaps}function g(w){r.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(w,E,V,N,x=!1){if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let P=E;if(E===r.RED&&(V===r.FLOAT&&(P=r.R32F),V===r.HALF_FLOAT&&(P=r.R16F),V===r.UNSIGNED_BYTE&&(P=r.R8)),E===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(P=r.R8UI),V===r.UNSIGNED_SHORT&&(P=r.R16UI),V===r.UNSIGNED_INT&&(P=r.R32UI),V===r.BYTE&&(P=r.R8I),V===r.SHORT&&(P=r.R16I),V===r.INT&&(P=r.R32I)),E===r.RG&&(V===r.FLOAT&&(P=r.RG32F),V===r.HALF_FLOAT&&(P=r.RG16F),V===r.UNSIGNED_BYTE&&(P=r.RG8)),E===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(P=r.RG8UI),V===r.UNSIGNED_SHORT&&(P=r.RG16UI),V===r.UNSIGNED_INT&&(P=r.RG32UI),V===r.BYTE&&(P=r.RG8I),V===r.SHORT&&(P=r.RG16I),V===r.INT&&(P=r.RG32I)),E===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(P=r.RGB8UI),V===r.UNSIGNED_SHORT&&(P=r.RGB16UI),V===r.UNSIGNED_INT&&(P=r.RGB32UI),V===r.BYTE&&(P=r.RGB8I),V===r.SHORT&&(P=r.RGB16I),V===r.INT&&(P=r.RGB32I)),E===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),V===r.UNSIGNED_INT&&(P=r.RGBA32UI),V===r.BYTE&&(P=r.RGBA8I),V===r.SHORT&&(P=r.RGBA16I),V===r.INT&&(P=r.RGBA32I)),E===r.RGB&&(V===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),V===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),E===r.RGBA){let z=x?Vr:ut.getTransfer(N);V===r.FLOAT&&(P=r.RGBA32F),V===r.HALF_FLOAT&&(P=r.RGBA16F),V===r.UNSIGNED_BYTE&&(P=z===vt?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function b(w,E){let V;return w?E===null||E===Bi||E===xr?V=r.DEPTH24_STENCIL8:E===Un?V=r.DEPTH32F_STENCIL8:E===yr&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Bi||E===xr?V=r.DEPTH_COMPONENT24:E===Un?V=r.DEPTH_COMPONENT32F:E===yr&&(V=r.DEPTH_COMPONENT16),V}function S(w,E){return f(w)===!0||w.isFramebufferTexture&&w.minFilter!==Hn&&w.minFilter!==Wn?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function C(w){let E=w.target;E.removeEventListener("dispose",C),(function(V){let N=n.get(V);if(N.__webglInit===void 0)return;let x=V.source,P=d.get(x);if(P){let z=P[N.__cacheKey];z.usedTimes--,z.usedTimes===0&&F(V),Object.keys(P).length===0&&d.delete(x)}n.remove(V)})(E),E.isVideoTexture&&h.delete(E)}function D(w){let E=w.target;E.removeEventListener("dispose",D),(function(V){let N=n.get(V);if(V.depthTexture&&(V.depthTexture.dispose(),n.remove(V.depthTexture)),V.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(N.__webglFramebuffer[P]))for(let z=0;z<N.__webglFramebuffer[P].length;z++)r.deleteFramebuffer(N.__webglFramebuffer[P][z]);else r.deleteFramebuffer(N.__webglFramebuffer[P]);N.__webglDepthbuffer&&r.deleteRenderbuffer(N.__webglDepthbuffer[P])}else{if(Array.isArray(N.__webglFramebuffer))for(let P=0;P<N.__webglFramebuffer.length;P++)r.deleteFramebuffer(N.__webglFramebuffer[P]);else r.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&r.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&r.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let P=0;P<N.__webglColorRenderbuffer.length;P++)N.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(N.__webglColorRenderbuffer[P]);N.__webglDepthRenderbuffer&&r.deleteRenderbuffer(N.__webglDepthRenderbuffer)}let x=V.textures;for(let P=0,z=x.length;P<z;P++){let U=n.get(x[P]);U.__webglTexture&&(r.deleteTexture(U.__webglTexture),a.memory.textures--),n.remove(x[P])}n.remove(V)})(E)}function F(w){let E=n.get(w);r.deleteTexture(E.__webglTexture);let V=w.source;delete d.get(V)[E.__cacheKey],a.memory.textures--}let L=0;function k(w,E){let V=n.get(w);if(w.isVideoTexture&&(function(N){let x=a.render.frame;h.get(N)!==x&&(h.set(N,x),N.update())})(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&V.__version!==w.version){let N=w.image;if(N===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(N.complete!==!1)return void fe(V,w,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else w.isExternalTexture&&(V.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+E)}let q={[Pn]:r.REPEAT,[ar]:r.CLAMP_TO_EDGE,[Ys]:r.MIRRORED_REPEAT},G={[Hn]:r.NEAREST,[rh]:r.NEAREST_MIPMAP_NEAREST,[ps]:r.NEAREST_MIPMAP_LINEAR,[Wn]:r.LINEAR,[ka]:r.LINEAR_MIPMAP_NEAREST,[Oi]:r.LINEAR_MIPMAP_LINEAR},te={[uh]:r.NEVER,[vh]:r.ALWAYS,[dh]:r.LESS,[Al]:r.LEQUAL,[ph]:r.EQUAL,[gh]:r.GEQUAL,[mh]:r.GREATER,[fh]:r.NOTEQUAL};function j(w,E){if(E.type!==Un||e.has("OES_texture_float_linear")!==!1||E.magFilter!==Wn&&E.magFilter!==ka&&E.magFilter!==ps&&E.magFilter!==Oi&&E.minFilter!==Wn&&E.minFilter!==ka&&E.minFilter!==ps&&E.minFilter!==Oi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,q[E.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,q[E.wrapT]),w!==r.TEXTURE_3D&&w!==r.TEXTURE_2D_ARRAY||r.texParameteri(w,r.TEXTURE_WRAP_R,q[E.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,G[E.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,G[E.minFilter]),E.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,te[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Hn||E.minFilter!==ps&&E.minFilter!==Oi||E.type===Un&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");r.texParameterf(w,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function $(w,E){let V=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",C));let N=E.source,x=d.get(N);x===void 0&&(x={},d.set(N,x));let P=(function(z){let U=[];return U.push(z.wrapS),U.push(z.wrapT),U.push(z.wrapR||0),U.push(z.magFilter),U.push(z.minFilter),U.push(z.anisotropy),U.push(z.internalFormat),U.push(z.format),U.push(z.type),U.push(z.generateMipmaps),U.push(z.premultiplyAlpha),U.push(z.flipY),U.push(z.unpackAlignment),U.push(z.colorSpace),U.join()})(E);if(P!==w.__cacheKey){x[P]===void 0&&(x[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,V=!0),x[P].usedTimes++;let z=x[w.__cacheKey];z!==void 0&&(x[w.__cacheKey].usedTimes--,z.usedTimes===0&&F(E)),w.__cacheKey=P,w.__webglTexture=x[P].texture}return V}function ne(w,E,V){return Math.floor(Math.floor(w/V)/E)}function fe(w,E,V){let N=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(N=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(N=r.TEXTURE_3D);let x=$(w,E),P=E.source;t.bindTexture(N,w.__webglTexture,r.TEXTURE0+V);let z=n.get(P);if(P.version!==z.__version||x===!0){t.activeTexture(r.TEXTURE0+V);let U=ut.getPrimaries(ut.workingColorSpace),re=E.colorSpace===zi?null:ut.getPrimaries(E.colorSpace),Y=E.colorSpace===zi||U===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let J=_(E.image,!1,i.maxTextureSize);J=W(E,J);let pe=s.convert(E.format,E.colorSpace),Se=s.convert(E.type),me,xe=y(E.internalFormat,pe,Se,E.colorSpace,E.isVideoTexture);j(N,E);let Ue=E.mipmaps,ze=E.isVideoTexture!==!0,Je=z.__version===void 0||x===!0,Ge=P.dataReady,$e=S(E,J);if(E.isDepthTexture)xe=b(E.format===fs,E.type),Je&&(ze?t.texStorage2D(r.TEXTURE_2D,1,xe,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,xe,J.width,J.height,0,pe,Se,null));else if(E.isDataTexture)if(Ue.length>0){ze&&Je&&t.texStorage2D(r.TEXTURE_2D,$e,xe,Ue[0].width,Ue[0].height);for(let Ee=0,Oe=Ue.length;Ee<Oe;Ee++)me=Ue[Ee],ze?Ge&&t.texSubImage2D(r.TEXTURE_2D,Ee,0,0,me.width,me.height,pe,Se,me.data):t.texImage2D(r.TEXTURE_2D,Ee,xe,me.width,me.height,0,pe,Se,me.data);E.generateMipmaps=!1}else ze?(Je&&t.texStorage2D(r.TEXTURE_2D,$e,xe,J.width,J.height),Ge&&(function(Ee,Oe,We,Ft){let Ie=Ee.updateRanges;if(Ie.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Oe.width,Oe.height,We,Ft,Oe.data);else{Ie.sort((B,It)=>B.start-It.start);let tt=0;for(let B=1;B<Ie.length;B++){let It=Ie[tt],mt=Ie[B],ht=It.start+It.count,Yt=ne(mt.start,Oe.width,4),gn=ne(It.start,Oe.width,4);mt.start<=ht+1&&Yt===gn&&ne(mt.start+mt.count-1,Oe.width,4)===Yt?It.count=Math.max(It.count,mt.start+mt.count-It.start):(++tt,Ie[tt]=mt)}Ie.length=tt+1;let nt=r.getParameter(r.UNPACK_ROW_LENGTH),Wt=r.getParameter(r.UNPACK_SKIP_PIXELS),_t=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Oe.width);for(let B=0,It=Ie.length;B<It;B++){let mt=Ie[B],ht=Math.floor(mt.start/4),Yt=Math.ceil(mt.count/4),gn=ht%Oe.width,ci=Math.floor(ht/Oe.width),wn=Yt;r.pixelStorei(r.UNPACK_SKIP_PIXELS,gn),r.pixelStorei(r.UNPACK_SKIP_ROWS,ci),t.texSubImage2D(r.TEXTURE_2D,0,gn,ci,wn,1,We,Ft,Oe.data)}Ee.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,nt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Wt),r.pixelStorei(r.UNPACK_SKIP_ROWS,_t)}})(E,J,pe,Se)):t.texImage2D(r.TEXTURE_2D,0,xe,J.width,J.height,0,pe,Se,J.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ze&&Je&&t.texStorage3D(r.TEXTURE_2D_ARRAY,$e,xe,Ue[0].width,Ue[0].height,J.depth);for(let Ee=0,Oe=Ue.length;Ee<Oe;Ee++)if(me=Ue[Ee],E.format!==Nn)if(pe!==null)if(ze){if(Ge)if(E.layerUpdates.size>0){let We=Dl(me.width,me.height,E.format,E.type);for(let Ft of E.layerUpdates){let Ie=me.data.subarray(Ft*We/me.data.BYTES_PER_ELEMENT,(Ft+1)*We/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ee,0,0,Ft,me.width,me.height,1,pe,Ie)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ee,0,0,0,me.width,me.height,J.depth,pe,me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ee,xe,me.width,me.height,J.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?Ge&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Ee,0,0,0,me.width,me.height,J.depth,pe,Se,me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Ee,xe,me.width,me.height,J.depth,0,pe,Se,me.data)}else{ze&&Je&&t.texStorage2D(r.TEXTURE_2D,$e,xe,Ue[0].width,Ue[0].height);for(let Ee=0,Oe=Ue.length;Ee<Oe;Ee++)me=Ue[Ee],E.format!==Nn?pe!==null?ze?Ge&&t.compressedTexSubImage2D(r.TEXTURE_2D,Ee,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(r.TEXTURE_2D,Ee,xe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?Ge&&t.texSubImage2D(r.TEXTURE_2D,Ee,0,0,me.width,me.height,pe,Se,me.data):t.texImage2D(r.TEXTURE_2D,Ee,xe,me.width,me.height,0,pe,Se,me.data)}else if(E.isDataArrayTexture)if(ze){if(Je&&t.texStorage3D(r.TEXTURE_2D_ARRAY,$e,xe,J.width,J.height,J.depth),Ge)if(E.layerUpdates.size>0){let Ee=Dl(J.width,J.height,E.format,E.type);for(let Oe of E.layerUpdates){let We=J.data.subarray(Oe*Ee/J.data.BYTES_PER_ELEMENT,(Oe+1)*Ee/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Oe,J.width,J.height,1,pe,Se,We)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,pe,Se,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,xe,J.width,J.height,J.depth,0,pe,Se,J.data);else if(E.isData3DTexture)ze?(Je&&t.texStorage3D(r.TEXTURE_3D,$e,xe,J.width,J.height,J.depth),Ge&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,pe,Se,J.data)):t.texImage3D(r.TEXTURE_3D,0,xe,J.width,J.height,J.depth,0,pe,Se,J.data);else if(E.isFramebufferTexture){if(Je)if(ze)t.texStorage2D(r.TEXTURE_2D,$e,xe,J.width,J.height);else{let Ee=J.width,Oe=J.height;for(let We=0;We<$e;We++)t.texImage2D(r.TEXTURE_2D,We,xe,Ee,Oe,0,pe,Se,null),Ee>>=1,Oe>>=1}}else if(Ue.length>0){if(ze&&Je){let Ee=ye(Ue[0]);t.texStorage2D(r.TEXTURE_2D,$e,xe,Ee.width,Ee.height)}for(let Ee=0,Oe=Ue.length;Ee<Oe;Ee++)me=Ue[Ee],ze?Ge&&t.texSubImage2D(r.TEXTURE_2D,Ee,0,0,pe,Se,me):t.texImage2D(r.TEXTURE_2D,Ee,xe,pe,Se,me);E.generateMipmaps=!1}else if(ze){if(Je){let Ee=ye(J);t.texStorage2D(r.TEXTURE_2D,$e,xe,Ee.width,Ee.height)}Ge&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,pe,Se,J)}else t.texImage2D(r.TEXTURE_2D,0,xe,pe,Se,J);f(E)&&g(N),z.__version=P.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function he(w,E,V,N,x,P){let z=s.convert(V.format,V.colorSpace),U=s.convert(V.type),re=y(V.internalFormat,z,U,V.colorSpace),Y=n.get(E),J=n.get(V);if(J.__renderTarget=E,!Y.__hasExternalTextures){let pe=Math.max(1,E.width>>P),Se=Math.max(1,E.height>>P);x===r.TEXTURE_3D||x===r.TEXTURE_2D_ARRAY?t.texImage3D(x,P,re,pe,Se,E.depth,0,z,U,null):t.texImage2D(x,P,re,pe,Se,0,z,U,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),Q(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,N,x,J.__webglTexture,0,_e(E)):(x===r.TEXTURE_2D||x>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&x<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,N,x,J.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Pe(w,E,V){if(r.bindRenderbuffer(r.RENDERBUFFER,w),E.depthBuffer){let N=E.depthTexture,x=N&&N.isDepthTexture?N.type:null,P=b(E.stencilBuffer,x),z=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=_e(E);Q(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,U,P,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,U,P,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,P,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,z,r.RENDERBUFFER,w)}else{let N=E.textures;for(let x=0;x<N.length;x++){let P=N[x],z=s.convert(P.format,P.colorSpace),U=s.convert(P.type),re=y(P.internalFormat,z,U,P.colorSpace),Y=_e(E);V&&Q(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,re,E.width,E.height):Q(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Y,re,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,re,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function oe(w,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let V=n.get(E.depthTexture);V.__renderTarget=E,V.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),k(E.depthTexture,0);let N=V.__webglTexture,x=_e(E);if(E.depthTexture.format===ms)Q(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,N,0,x):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,N,0);else{if(E.depthTexture.format!==fs)throw new Error("Unknown depthTexture format");Q(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,N,0,x):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,N,0)}}function ve(w){let E=n.get(w),V=w.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==w.depthTexture){let N=w.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),N){let x=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,N.removeEventListener("dispose",x)};N.addEventListener("dispose",x),E.__depthDisposeCallback=x}E.__boundDepthTexture=N}if(w.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");let N=w.texture.mipmaps;N&&N.length>0?oe(E.__webglFramebuffer[0],w):oe(E.__webglFramebuffer,w)}else if(V){E.__webglDepthbuffer=[];for(let N=0;N<6;N++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[N]),E.__webglDepthbuffer[N]===void 0)E.__webglDepthbuffer[N]=r.createRenderbuffer(),Pe(E.__webglDepthbuffer[N],w,!1);else{let x=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer[N];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,x,r.RENDERBUFFER,P)}}else{let N=w.texture.mipmaps;if(N&&N.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),Pe(E.__webglDepthbuffer,w,!1);else{let x=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,x,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ce=[],ce=[];function _e(w){return Math.min(i.maxSamples,w.samples)}function Q(w){let E=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function W(w,E){let V=w.colorSpace,N=w.format,x=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||V!==Pi&&V!==zi&&(ut.getTransfer(V)===vt?N===Nn&&x===qn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}function ye(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=function(){let w=L;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),L+=1,w},this.resetTextureUnits=function(){L=0},this.setTexture2D=k,this.setTexture2DArray=function(w,E){let V=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&V.__version!==w.version?fe(V,w,E):t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+E)},this.setTexture3D=function(w,E){let V=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&V.__version!==w.version?fe(V,w,E):t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+E)},this.setTextureCube=function(w,E){let V=n.get(w);w.version>0&&V.__version!==w.version?(function(N,x,P){if(x.image.length!==6)return;let z=$(N,x),U=x.source;t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+P);let re=n.get(U);if(U.version!==re.__version||z===!0){t.activeTexture(r.TEXTURE0+P);let Y=ut.getPrimaries(ut.workingColorSpace),J=x.colorSpace===zi?null:ut.getPrimaries(x.colorSpace),pe=x.colorSpace===zi||Y===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let Se=x.isCompressedTexture||x.image[0].isCompressedTexture,me=x.image[0]&&x.image[0].isDataTexture,xe=[];for(let Ie=0;Ie<6;Ie++)xe[Ie]=Se||me?me?x.image[Ie].image:x.image[Ie]:_(x.image[Ie],!0,i.maxCubemapSize),xe[Ie]=W(x,xe[Ie]);let Ue=xe[0],ze=s.convert(x.format,x.colorSpace),Je=s.convert(x.type),Ge=y(x.internalFormat,ze,Je,x.colorSpace),$e=x.isVideoTexture!==!0,Ee=re.__version===void 0||z===!0,Oe=U.dataReady,We,Ft=S(x,Ue);if(j(r.TEXTURE_CUBE_MAP,x),Se){$e&&Ee&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ft,Ge,Ue.width,Ue.height);for(let Ie=0;Ie<6;Ie++){We=xe[Ie].mipmaps;for(let tt=0;tt<We.length;tt++){let nt=We[tt];x.format!==Nn?ze!==null?$e?Oe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt,0,0,nt.width,nt.height,ze,nt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt,Ge,nt.width,nt.height,0,nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt,0,0,nt.width,nt.height,ze,Je,nt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt,Ge,nt.width,nt.height,0,ze,Je,nt.data)}}}else{if(We=x.mipmaps,$e&&Ee){We.length>0&&Ft++;let Ie=ye(xe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ft,Ge,Ie.width,Ie.height)}for(let Ie=0;Ie<6;Ie++)if(me){$e?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,0,0,xe[Ie].width,xe[Ie].height,ze,Je,xe[Ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,Ge,xe[Ie].width,xe[Ie].height,0,ze,Je,xe[Ie].data);for(let tt=0;tt<We.length;tt++){let nt=We[tt].image[Ie].image;$e?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt+1,0,0,nt.width,nt.height,ze,Je,nt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt+1,Ge,nt.width,nt.height,0,ze,Je,nt.data)}}else{$e?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,0,0,ze,Je,xe[Ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,Ge,ze,Je,xe[Ie]);for(let tt=0;tt<We.length;tt++){let nt=We[tt];$e?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt+1,0,0,ze,Je,nt.image[Ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,tt+1,Ge,ze,Je,nt.image[Ie])}}}f(x)&&g(r.TEXTURE_CUBE_MAP),re.__version=U.version,x.onUpdate&&x.onUpdate(x)}N.__version=x.version})(V,w,E):t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+E)},this.rebindTextures=function(w,E,V){let N=n.get(w);E!==void 0&&he(N.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&ve(w)},this.setupRenderTarget=function(w){let E=w.texture,V=n.get(w),N=n.get(E);w.addEventListener("dispose",D);let x=w.textures,P=w.isWebGLCubeRenderTarget===!0,z=x.length>1;if(z||(N.__webglTexture===void 0&&(N.__webglTexture=r.createTexture()),N.__version=E.version,a.memory.textures++),P){V.__webglFramebuffer=[];for(let U=0;U<6;U++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[U]=[];for(let re=0;re<E.mipmaps.length;re++)V.__webglFramebuffer[U][re]=r.createFramebuffer()}else V.__webglFramebuffer[U]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let U=0;U<E.mipmaps.length;U++)V.__webglFramebuffer[U]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(z)for(let U=0,re=x.length;U<re;U++){let Y=n.get(x[U]);Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture(),a.memory.textures++)}if(w.samples>0&&Q(w)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let U=0;U<x.length;U++){let re=x[U];V.__webglColorRenderbuffer[U]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[U]);let Y=s.convert(re.format,re.colorSpace),J=s.convert(re.type),pe=y(re.internalFormat,Y,J,re.colorSpace,w.isXRRenderTarget===!0),Se=_e(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,pe,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+U,r.RENDERBUFFER,V.__webglColorRenderbuffer[U])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),Pe(V.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture),j(r.TEXTURE_CUBE_MAP,E);for(let U=0;U<6;U++)if(E.mipmaps&&E.mipmaps.length>0)for(let re=0;re<E.mipmaps.length;re++)he(V.__webglFramebuffer[U][re],w,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+U,re);else he(V.__webglFramebuffer[U],w,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+U,0);f(E)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(z){for(let U=0,re=x.length;U<re;U++){let Y=x[U],J=n.get(Y),pe=r.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(pe=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(pe,J.__webglTexture),j(pe,Y),he(V.__webglFramebuffer,w,Y,r.COLOR_ATTACHMENT0+U,pe,0),f(Y)&&g(pe)}t.unbindTexture()}else{let U=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(U=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(U,N.__webglTexture),j(U,E),E.mipmaps&&E.mipmaps.length>0)for(let re=0;re<E.mipmaps.length;re++)he(V.__webglFramebuffer[re],w,E,r.COLOR_ATTACHMENT0,U,re);else he(V.__webglFramebuffer,w,E,r.COLOR_ATTACHMENT0,U,0);f(E)&&g(U),t.unbindTexture()}w.depthBuffer&&ve(w)},this.updateRenderTargetMipmap=function(w){let E=w.textures;for(let V=0,N=E.length;V<N;V++){let x=E[V];if(f(x)){let P=v(w),z=n.get(x).__webglTexture;t.bindTexture(P,z),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(Q(w)===!1){let E=w.textures,V=w.width,N=w.height,x=r.COLOR_BUFFER_BIT,P=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=n.get(w),U=E.length>1;if(U)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,z.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,z.__webglMultisampledFramebuffer);let re=w.texture.mipmaps;re&&re.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(x|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(x|=r.STENCIL_BUFFER_BIT)),U){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let J=n.get(E[Y]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,J,0)}r.blitFramebuffer(0,0,V,N,0,0,V,N,x,r.NEAREST),c===!0&&(Ce.length=0,ce.length=0,Ce.push(r.COLOR_ATTACHMENT0+Y),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ce.push(P),ce.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ce)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ce))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),U)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let J=n.get(E[Y]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,z.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,J,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,z.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){let E=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Q}function dp(r,e){return{convert:function(t,n=zi){let i,s=ut.getTransfer(n);if(t===qn)return r.UNSIGNED_BYTE;if(t===Ha)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Wa)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Zo)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Jo)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===qo)return r.BYTE;if(t===Yo)return r.SHORT;if(t===yr)return r.UNSIGNED_SHORT;if(t===Va)return r.INT;if(t===Bi)return r.UNSIGNED_INT;if(t===Un)return r.FLOAT;if(t===bi)return r.HALF_FLOAT;if(t===sh)return r.ALPHA;if(t===ah)return r.RGB;if(t===Nn)return r.RGBA;if(t===ms)return r.DEPTH_COMPONENT;if(t===fs)return r.DEPTH_STENCIL;if(t===Xa)return r.RED;if(t===ja)return r.RED_INTEGER;if(t===oh)return r.RG;if(t===Ko)return r.RG_INTEGER;if(t===$o)return r.RGBA_INTEGER;if(t===qa||t===Ya||t===Za||t===Ja)if(s===vt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===qa)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ya)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Za)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ja)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===qa)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ya)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Za)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ja)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Qo||t===el||t===tl||t===nl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Qo)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===el)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===tl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===nl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===il||t===rl||t===sl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===il||t===rl)return s===vt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===sl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===al||t===ol||t===ll||t===cl||t===hl||t===ul||t===dl||t===pl||t===ml||t===fl||t===gl||t===vl||t===_l||t===yl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===al)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ol)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===ll)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===cl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===hl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===ul)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===dl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===pl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===ml)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===fl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===gl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===vl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===_l)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===yl)return s===vt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===xl||t===Ml||t===Sl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===xl)return s===vt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ml)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Sl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Tl||t===bl||t===wl||t===El){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Tl)return i.COMPRESSED_RED_RGTC1_EXT;if(t===bl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===wl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===El)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===xr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var jl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qr(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Qt({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new Bt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ql=class extends ri{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,_=typeof XRWebGLBinding<"u",f=new jl,g={},v=t.getContextAttributes(),y=null,b=null,S=[],C=[],D=new de,F=null,L=new Lt;L.viewport=new ft;let k=new Lt;k.viewport=new ft;let q=[L,k],G=new Pa,te=null,j=null;function $(ce){let _e=C.indexOf(ce.inputSource);if(_e===-1)return;let Q=S[_e];Q!==void 0&&(Q.update(ce.inputSource,ce.frame,l||a),Q.dispatchEvent({type:ce.type,data:ce.inputSource}))}function ne(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",ne),i.removeEventListener("inputsourceschange",fe);for(let ce=0;ce<S.length;ce++){let _e=C[ce];_e!==null&&(C[ce]=null,S[ce].disconnect(_e))}te=null,j=null,f.reset();for(let ce in g)delete g[ce];e.setRenderTarget(y),m=null,d=null,u=null,i=null,b=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}function fe(ce){for(let _e=0;_e<ce.removed.length;_e++){let Q=ce.removed[_e],W=C.indexOf(Q);W>=0&&(C[W]=null,S[W].disconnect(Q))}for(let _e=0;_e<ce.added.length;_e++){let Q=ce.added[_e],W=C.indexOf(Q);if(W===-1){for(let w=0;w<S.length;w++){if(w>=C.length){C.push(Q),W=w;break}if(C[w]===null){C[w]=Q,W=w;break}}if(W===-1)break}let ye=S[W];ye&&ye.connect(Q)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let _e=S[ce];return _e===void 0&&(_e=new hr,S[ce]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(ce){let _e=S[ce];return _e===void 0&&(_e=new hr,S[ce]=_e),_e.getGripSpace()},this.getHand=function(ce){let _e=S[ce];return _e===void 0&&(_e=new hr,S[ce]=_e),_e.getHandSpace()},this.setFramebufferScaleFactor=function(ce){s=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){o=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ce){l=ce},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(ce){if(i=ce,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",ne),i.addEventListener("inputsourceschange",fe),v.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(D),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Q=null,W=null;v.depth&&(W=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=v.stencil?fs:ms,Q=v.stencil?xr:Bi);let ye={colorFormat:t.RGBA8,depthFormat:W,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(ye),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new yn(d.textureWidth,d.textureHeight,{format:Nn,type:qn,depthTexture:new $r(d.textureWidth,d.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let _e={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,_e),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new yn(m.framebufferWidth,m.framebufferHeight,{format:Nn,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ce.setContext(i),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let he=new A,Pe=new A;function oe(ce,_e){_e===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(_e.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(i===null)return;let _e=ce.near,Q=ce.far;f.texture!==null&&(f.depthNear>0&&(_e=f.depthNear),f.depthFar>0&&(Q=f.depthFar)),G.near=k.near=L.near=_e,G.far=k.far=L.far=Q,te===G.near&&j===G.far||(i.updateRenderState({depthNear:G.near,depthFar:G.far}),te=G.near,j=G.far),G.layers.mask=6|ce.layers.mask,L.layers.mask=3&G.layers.mask,k.layers.mask=5&G.layers.mask;let W=ce.parent,ye=G.cameras;oe(G,W);for(let w=0;w<ye.length;w++)oe(ye[w],W);ye.length===2?(function(w,E,V){he.setFromMatrixPosition(E.matrixWorld),Pe.setFromMatrixPosition(V.matrixWorld);let N=he.distanceTo(Pe),x=E.projectionMatrix.elements,P=V.projectionMatrix.elements,z=x[14]/(x[10]-1),U=x[14]/(x[10]+1),re=(x[9]+1)/x[5],Y=(x[9]-1)/x[5],J=(x[8]-1)/x[0],pe=(P[8]+1)/P[0],Se=z*J,me=z*pe,xe=N/(-J+pe),Ue=xe*-J;if(E.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(Ue),w.translateZ(xe),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),x[10]===-1)w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let ze=z+xe,Je=U+xe,Ge=Se-Ue,$e=me+(N-Ue),Ee=re*U/Je*ze,Oe=Y*U/Je*ze;w.projectionMatrix.makePerspective(Ge,$e,Ee,Oe,ze,Je),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}})(G,L,k):G.projectionMatrix.copy(L.projectionMatrix),(function(w,E,V){V===null?w.matrix.copy(E.matrixWorld):(w.matrix.copy(V.matrixWorld),w.matrix.invert(),w.matrix.multiply(E.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=2*Js*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)})(ce,G,W)},this.getCamera=function(){return G},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(ce){c=ce,d!==null&&(d.fixedFoveation=ce),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ce)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(G)},this.getCameraTexture=function(ce){return g[ce]};let ve=null,Ce=new Zh;Ce.setAnimationLoop(function(ce,_e){if(h=_e.getViewerPose(l||a),p=_e,h!==null){let Q=h.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let W=!1;Q.length!==G.cameras.length&&(G.cameras.length=0,W=!0);for(let w=0;w<Q.length;w++){let E=Q[w],V=null;if(m!==null)V=m.getViewport(E);else{let x=u.getViewSubImage(d,E);V=x.viewport,w===0&&(e.setRenderTargetTextures(b,x.colorTexture,x.depthStencilTexture),e.setRenderTarget(b))}let N=q[w];N===void 0&&(N=new Lt,N.layers.enable(w),N.viewport=new ft,q[w]=N),N.matrix.fromArray(E.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(E.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(V.x,V.y,V.width,V.height),w===0&&(G.matrix.copy(N.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),W===!0&&G.cameras.push(N)}let ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let w=u.getDepthInformation(Q[0]);w&&w.isValid&&w.texture&&f.init(w,i.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let w=0;w<Q.length;w++){let E=Q[w].camera;if(E){let V=g[E];V||(V=new Qr,g[E]=V);let N=u.getCameraImage(E);V.sourceTexture=N}}}}for(let Q=0;Q<S.length;Q++){let W=C[Q],ye=S[Q];W!==null&&ye!==void 0&&ye.update(W,_e,l||a)}ve&&ve(ce,_e),_e.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_e}),p=null}),this.setAnimationLoop=function(ce){ve=ce},this.dispose=function(){}}},Vi=new In,pp=new Qe;function mp(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===fn&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===fn&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Vi.copy(c),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),i.envMapRotation.value.setFromMatrix4(pp.makeRotationFromEuler(Vi)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Pl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===fn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function fp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let _=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof _=="number"||typeof _=="boolean"?_:_.clone(),!0;{let g=p[f];if(typeof _=="number"||typeof _=="boolean"){if(g!==_)return p[f]=_,!0}else if(g.equals(_)===!1)return g.copy(_),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,v=0,y=16;for(let S=0,C=g.length;S<C;S++){let D=Array.isArray(g[S])?g[S]:[g[S]];for(let F=0,L=D.length;F<L;F++){let k=D[F],q=Array.isArray(k.value)?k.value:[k.value];for(let G=0,te=q.length;G<te;G++){let j=l(q[G]),$=v%y,ne=$%j.boundary,fe=$+ne;v+=ne,fe!==0&&y-fe<j.storage&&(v+=y-fe),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=j.storage}}}let b=v%y;b>0&&(v+=y-b),f.__size=v,f.__cache={}})(u),m=(function(f){let g=(function(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),y=f.__size,b=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,y,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let _=e.render.frame;s[u.id]!==_&&((function(f){let g=i[f.id],v=f.uniforms,y=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let b=0,S=v.length;b<S;b++){let C=Array.isArray(v[b])?v[b]:[v[b]];for(let D=0,F=C.length;D<F;D++){let L=C[D];if(c(L,b,D,y)===!0){let k=L.__offset,q=Array.isArray(L.value)?L.value:[L.value],G=0;for(let te=0;te<q.length;te++){let j=q[te],$=l(j);typeof j=="number"||typeof j=="boolean"?(L.__data[0]=j,r.bufferSubData(r.UNIFORM_BUFFER,k+G,L.__data)):j.isMatrix3?(L.__data[0]=j.elements[0],L.__data[1]=j.elements[1],L.__data[2]=j.elements[2],L.__data[3]=0,L.__data[4]=j.elements[3],L.__data[5]=j.elements[4],L.__data[6]=j.elements[5],L.__data[7]=0,L.__data[8]=j.elements[6],L.__data[9]=j.elements[7],L.__data[10]=j.elements[8],L.__data[11]=0):(j.toArray(L.__data,G),G+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=_)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var bn=class{constructor(e={}){let{canvas:t=_h(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),_=new Int32Array(4),f=null,g=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let b=this,S=!1;this._outputColorSpace=ot;let C=0,D=0,F=null,L=-1,k=null,q=new ft,G=new ft,te=null,j=new qe(0),$=0,ne=t.width,fe=t.height,he=1,Pe=null,oe=null,ve=new ft(0,0,ne,fe),Ce=new ft(0,0,ne,fe),ce=!1,_e=new Mi,Q=!1,W=!1,ye=new Qe,w=new A,E=new ft,V={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},N=!1;function x(){return F===null?he:1}let P,z,U,re,Y,J,pe,Se,me,xe,Ue,ze,Je,Ge,$e,Ee,Oe,We,Ft,Ie,tt,nt,Wt,_t,B=n;function It(R,ee){return t.getContext(R,ee)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Yt,!1),t.addEventListener("webglcontextrestored",gn,!1),t.addEventListener("webglcontextcreationerror",ci,!1),B===null){let ee="webgl2";if(B=It(ee,R),B===null)throw It(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}function mt(){P=new Ku(B),P.init(),nt=new dp(B,P),z=new ju(B,P,e,nt),U=new hp(B,P),z.reversedDepthBuffer&&d&&U.buffers.depth.setReversed(!0),re=new ed(B),Y=new ep,J=new up(B,P,U,Y,z,nt,re),pe=new Yu(b),Se=new Ju(b),me=new ku(B),Wt=new Wu(B,me),xe=new $u(B,me,re,Wt),Ue=new nd(B,xe,me,re),Ft=new td(B,z,J),Ee=new qu(Y),ze=new Qd(b,pe,Se,P,z,Wt,Ee),Je=new mp(b,Y),Ge=new np,$e=new op(P),We=new Hu(b,pe,Se,U,Ue,m,c),Oe=new lp(b,Ue,z),_t=new fp(B,re,z,U),Ie=new Xu(B,P,re),tt=new Qu(B,P,re),re.programs=ze.programs,b.capabilities=z,b.extensions=P,b.properties=Y,b.renderLists=Ge,b.shadowMap=Oe,b.state=U,b.info=re}mt();let ht=new ql(b,B);function Yt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function gn(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let R=re.autoReset,ee=Oe.enabled,se=Oe.autoUpdate,ue=Oe.needsUpdate,ie=Oe.type;mt(),re.autoReset=R,Oe.enabled=ee,Oe.autoUpdate=se,Oe.needsUpdate=ue,Oe.type=ie}function ci(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function wn(R){let ee=R.target;ee.removeEventListener("dispose",wn),(function(se){(function(ue){let ie=Y.get(ue).programs;ie!==void 0&&(ie.forEach(function(ge){ze.releaseProgram(ge)}),ue.isShaderMaterial&&ze.releaseShaderCache(ue))})(se),Y.remove(se)})(ee)}function hi(R,ee,se){R.transparent===!0&&R.side===Ut&&R.forceSinglePass===!1?(R.side=fn,R.needsUpdate=!0,Ot(R,ee,se),R.side=gr,R.needsUpdate=!0,Ot(R,ee,se),R.side=Ut):Ot(R,ee,se)}this.xr=ht,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let R=P.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=P.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(R){R!==void 0&&(he=R,this.setSize(ne,fe,!1))},this.getSize=function(R){return R.set(ne,fe)},this.setSize=function(R,ee,se=!0){ht.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ne=R,fe=ee,t.width=Math.floor(R*he),t.height=Math.floor(ee*he),se===!0&&(t.style.width=R+"px",t.style.height=ee+"px"),this.setViewport(0,0,R,ee))},this.getDrawingBufferSize=function(R){return R.set(ne*he,fe*he).floor()},this.setDrawingBufferSize=function(R,ee,se){ne=R,fe=ee,he=se,t.width=Math.floor(R*se),t.height=Math.floor(ee*se),this.setViewport(0,0,R,ee)},this.getCurrentViewport=function(R){return R.copy(q)},this.getViewport=function(R){return R.copy(ve)},this.setViewport=function(R,ee,se,ue){R.isVector4?ve.set(R.x,R.y,R.z,R.w):ve.set(R,ee,se,ue),U.viewport(q.copy(ve).multiplyScalar(he).round())},this.getScissor=function(R){return R.copy(Ce)},this.setScissor=function(R,ee,se,ue){R.isVector4?Ce.set(R.x,R.y,R.z,R.w):Ce.set(R,ee,se,ue),U.scissor(G.copy(Ce).multiplyScalar(he).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(R){U.setScissorTest(ce=R)},this.setOpaqueSort=function(R){Pe=R},this.setTransparentSort=function(R){oe=R},this.getClearColor=function(R){return R.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(R=!0,ee=!0,se=!0){let ue=0;if(R){let ie=!1;if(F!==null){let ge=F.texture.format;ie=ge===$o||ge===Ko||ge===ja}if(ie){let ge=F.texture.type,Le=ge===qn||ge===Bi||ge===yr||ge===xr||ge===Ha||ge===Wa,Ne=We.getClearColor(),ke=We.getClearAlpha(),Xe=Ne.r,Be=Ne.g,je=Ne.b;Le?(p[0]=Xe,p[1]=Be,p[2]=je,p[3]=ke,B.clearBufferuiv(B.COLOR,0,p)):(_[0]=Xe,_[1]=Be,_[2]=je,_[3]=ke,B.clearBufferiv(B.COLOR,0,_))}else ue|=B.COLOR_BUFFER_BIT}ee&&(ue|=B.DEPTH_BUFFER_BIT),se&&(ue|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(ue)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Yt,!1),t.removeEventListener("webglcontextrestored",gn,!1),t.removeEventListener("webglcontextcreationerror",ci,!1),We.dispose(),Ge.dispose(),$e.dispose(),Y.dispose(),pe.dispose(),Se.dispose(),Ue.dispose(),Wt.dispose(),_t.dispose(),ze.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",Er),ht.removeEventListener("sessionend",Ar),Fn.stop()},this.renderBufferDirect=function(R,ee,se,ue,ie,ge){ee===null&&(ee=V);let Le=ie.isMesh&&ie.matrixWorld.determinant()<0,Ne=(function(at,bt,M,T,I){bt.isScene!==!0&&(bt=V),J.resetTextureUnits();let K=bt.fog,O=T.isMeshStandardMaterial?bt.environment:null,ae=F===null?b.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Pi,X=(T.isMeshStandardMaterial?Se:pe).get(T.envMap||O),H=T.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,Z=!!M.attributes.tangent&&(!!T.normalMap||T.anisotropy>0),Te=!!M.morphAttributes.position,De=!!M.morphAttributes.normal,be=!!M.morphAttributes.color,Me=li;T.toneMapped&&(F!==null&&F.isXRRenderTarget!==!0||(Me=b.toneMapping));let Re=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,He=Re!==void 0?Re.length:0,le=Y.get(T),we=g.state.lights;if(Q===!0&&(W===!0||at!==k)){let Tt=at===k&&T.id===L;Ee.setState(T,at,Tt)}let Ve=!1;T.version===le.__version?le.needsLights&&le.lightsStateVersion!==we.state.version||le.outputColorSpace!==ae||I.isBatchedMesh&&le.batching===!1?Ve=!0:I.isBatchedMesh||le.batching!==!0?I.isBatchedMesh&&le.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&le.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&le.instancing===!1?Ve=!0:I.isInstancedMesh||le.instancing!==!0?I.isSkinnedMesh&&le.skinning===!1?Ve=!0:I.isSkinnedMesh||le.skinning!==!0?I.isInstancedMesh&&le.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&le.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&le.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&le.instancingMorph===!1&&I.morphTexture!==null||le.envMap!==X||T.fog===!0&&le.fog!==K?Ve=!0:le.numClippingPlanes===void 0||le.numClippingPlanes===Ee.numPlanes&&le.numIntersection===Ee.numIntersection?(le.vertexAlphas!==H||le.vertexTangents!==Z||le.morphTargets!==Te||le.morphNormals!==De||le.morphColors!==be||le.toneMapping!==Me||le.morphTargetsCount!==He)&&(Ve=!0):Ve=!0:Ve=!0:Ve=!0:Ve=!0:(Ve=!0,le.__version=T.version);let xt=le.currentProgram;Ve===!0&&(xt=Ot(T,bt,I));let di=!1,On=!1,Rr=!1,wt=xt.getUniforms(),Bn=le.uniforms;if(U.useProgram(xt.program)&&(di=!0,On=!0,Rr=!0),T.id!==L&&(L=T.id,On=!0),di||k!==at){U.buffers.depth.getReversed()&&at.reversedDepth!==!0&&(at._reversedDepth=!0,at.updateProjectionMatrix()),wt.setValue(B,"projectionMatrix",at.projectionMatrix),wt.setValue(B,"viewMatrix",at.matrixWorldInverse);let Tt=wt.map.cameraPosition;Tt!==void 0&&Tt.setValue(B,w.setFromMatrixPosition(at.matrixWorld)),z.logarithmicDepthBuffer&&wt.setValue(B,"logDepthBufFC",2/(Math.log(at.far+1)/Math.LN2)),(T.isMeshPhongMaterial||T.isMeshToonMaterial||T.isMeshLambertMaterial||T.isMeshBasicMaterial||T.isMeshStandardMaterial||T.isShaderMaterial)&&wt.setValue(B,"isOrthographic",at.isOrthographicCamera===!0),k!==at&&(k=at,On=!0,Rr=!0)}if(I.isSkinnedMesh){wt.setOptional(B,I,"bindMatrix"),wt.setOptional(B,I,"bindMatrixInverse");let Tt=I.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),wt.setValue(B,"boneTexture",Tt.boneTexture,J))}I.isBatchedMesh&&(wt.setOptional(B,I,"batchingTexture"),wt.setValue(B,"batchingTexture",I._matricesTexture,J),wt.setOptional(B,I,"batchingIdTexture"),wt.setValue(B,"batchingIdTexture",I._indirectTexture,J),wt.setOptional(B,I,"batchingColorTexture"),I._colorsTexture!==null&&wt.setValue(B,"batchingColorTexture",I._colorsTexture,J));let ys=M.morphAttributes;ys.position===void 0&&ys.normal===void 0&&ys.color===void 0||Ft.update(I,M,xt),(On||le.receiveShadow!==I.receiveShadow)&&(le.receiveShadow=I.receiveShadow,wt.setValue(B,"receiveShadow",I.receiveShadow)),T.isMeshGouraudMaterial&&T.envMap!==null&&(Bn.envMap.value=X,Bn.flipEnvMap.value=X.isCubeTexture&&X.isRenderTargetTexture===!1?-1:1),T.isMeshStandardMaterial&&T.envMap===null&&bt.environment!==null&&(Bn.envMapIntensity.value=bt.environmentIntensity),On&&(wt.setValue(B,"toneMappingExposure",b.toneMappingExposure),le.needsLights&&(ln=Rr,(vn=Bn).ambientLightColor.needsUpdate=ln,vn.lightProbe.needsUpdate=ln,vn.directionalLights.needsUpdate=ln,vn.directionalLightShadows.needsUpdate=ln,vn.pointLights.needsUpdate=ln,vn.pointLightShadows.needsUpdate=ln,vn.spotLights.needsUpdate=ln,vn.spotLightShadows.needsUpdate=ln,vn.rectAreaLights.needsUpdate=ln,vn.hemisphereLights.needsUpdate=ln),K&&T.fog===!0&&Je.refreshFogUniforms(Bn,K),Je.refreshMaterialUniforms(Bn,T,he,fe,g.state.transmissionRenderTarget[at.id]),Tr.upload(B,dt(le),Bn,J));var vn,ln;if(T.isShaderMaterial&&T.uniformsNeedUpdate===!0&&(Tr.upload(B,dt(le),Bn,J),T.uniformsNeedUpdate=!1),T.isSpriteMaterial&&wt.setValue(B,"center",I.center),wt.setValue(B,"modelViewMatrix",I.modelViewMatrix),wt.setValue(B,"normalMatrix",I.normalMatrix),wt.setValue(B,"modelMatrix",I.matrixWorld),T.isShaderMaterial||T.isRawShaderMaterial){let Tt=T.uniformsGroups;for(let Zt=0,xs=Tt.length;Zt<xs;Zt++){let Zn=Tt[Zt];_t.update(Zn,xt),_t.bind(Zn,xt)}}return xt})(R,ee,se,ue,ie);U.setMaterial(ue,Le);let ke=se.index,Xe=1;if(ue.wireframe===!0){if(ke=xe.getWireframeAttribute(se),ke===void 0)return;Xe=2}let Be=se.drawRange,je=se.attributes.position,et=Be.start*Xe,Ye=(Be.start+Be.count)*Xe;ge!==null&&(et=Math.max(et,ge.start*Xe),Ye=Math.min(Ye,(ge.start+ge.count)*Xe)),ke!==null?(et=Math.max(et,0),Ye=Math.min(Ye,ke.count)):je!=null&&(et=Math.max(et,0),Ye=Math.min(Ye,je.count));let At=Ye-et;if(At<0||At===1/0)return;let Nt;Wt.setup(ie,ue,Ne,se,ke);let yt=Ie;if(ke!==null&&(Nt=me.get(ke),yt=tt,yt.setIndex(Nt)),ie.isMesh)ue.wireframe===!0?(U.setLineWidth(ue.wireframeLinewidth*x()),yt.setMode(B.LINES)):yt.setMode(B.TRIANGLES);else if(ie.isLine){let at=ue.linewidth;at===void 0&&(at=1),U.setLineWidth(at*x()),ie.isLineSegments?yt.setMode(B.LINES):ie.isLineLoop?yt.setMode(B.LINE_LOOP):yt.setMode(B.LINE_STRIP)}else ie.isPoints?yt.setMode(B.POINTS):ie.isSprite&&yt.setMode(B.TRIANGLES);if(ie.isBatchedMesh)if(ie._multiDrawInstances!==null)or("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),yt.renderMultiDrawInstances(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount,ie._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))yt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let at=ie._multiDrawStarts,bt=ie._multiDrawCounts,M=ie._multiDrawCount,T=ke?me.get(ke).bytesPerElement:1,I=Y.get(ue).currentProgram.getUniforms();for(let K=0;K<M;K++)I.setValue(B,"_gl_DrawID",K),yt.render(at[K]/T,bt[K])}else if(ie.isInstancedMesh)yt.renderInstances(et,At,ie.count);else if(se.isInstancedBufferGeometry){let at=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,bt=Math.min(se.instanceCount,at);yt.renderInstances(et,At,bt)}else yt.render(et,At)},this.compile=function(R,ee,se=null){se===null&&(se=R),g=$e.get(se),g.init(ee),y.push(g),se.traverseVisible(function(ie){ie.isLight&&ie.layers.test(ee.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),R!==se&&R.traverseVisible(function(ie){ie.isLight&&ie.layers.test(ee.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),g.setupLights();let ue=new Set;return R.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let ge=ie.material;if(ge)if(Array.isArray(ge))for(let Le=0;Le<ge.length;Le++){let Ne=ge[Le];hi(Ne,se,ie),ue.add(Ne)}else hi(ge,se,ie),ue.add(ge)}),g=y.pop(),ue},this.compileAsync=function(R,ee,se=null){let ue=this.compile(R,ee,se);return new Promise(ie=>{function ge(){ue.forEach(function(Le){Y.get(Le).currentProgram.isReady()&&ue.delete(Le)}),ue.size!==0?setTimeout(ge,10):ie(R)}P.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Wi=null;function Er(){Fn.stop()}function Ar(){Fn.start()}let Fn=new Zh;function ui(R,ee,se,ue){if(R.visible===!1)return;if(R.layers.test(ee.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(ee);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||_e.intersectsSprite(R)){ue&&E.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ye);let ge=Ue.update(R),Le=R.material;Le.visible&&f.push(R,ge,Le,se,E.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||_e.intersectsObject(R))){let ge=Ue.update(R),Le=R.material;if(ue&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),E.copy(R.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),E.copy(ge.boundingSphere.center)),E.applyMatrix4(R.matrixWorld).applyMatrix4(ye)),Array.isArray(Le)){let Ne=ge.groups;for(let ke=0,Xe=Ne.length;ke<Xe;ke++){let Be=Ne[ke],je=Le[Be.materialIndex];je&&je.visible&&f.push(R,ge,je,se,E.z,Be)}}else Le.visible&&f.push(R,ge,Le,se,E.z,null)}}let ie=R.children;for(let ge=0,Le=ie.length;ge<Le;ge++)ui(ie[ge],ee,se,ue)}function Xi(R,ee,se,ue){let ie=R.opaque,ge=R.transmissive,Le=R.transparent;g.setupLightsView(se),Q===!0&&Ee.setGlobalState(b.clippingPlanes,se),ue&&U.viewport(q.copy(ue)),ie.length>0&&En(ie,ee,se),ge.length>0&&En(ge,ee,se),Le.length>0&&En(Le,ee,se),U.buffers.depth.setTest(!0),U.buffers.depth.setMask(!0),U.buffers.color.setMask(!0),U.setPolygonOffset(!1)}function Cr(R,ee,se,ue){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ue.id]===void 0&&(g.state.transmissionRenderTarget[ue.id]=new yn(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?bi:qn,minFilter:Oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));let ie=g.state.transmissionRenderTarget[ue.id],ge=ue.viewport||q;ie.setSize(ge.z*b.transmissionResolutionScale,ge.w*b.transmissionResolutionScale);let Le=b.getRenderTarget(),Ne=b.getActiveCubeFace(),ke=b.getActiveMipmapLevel();b.setRenderTarget(ie),b.getClearColor(j),$=b.getClearAlpha(),$<1&&b.setClearColor(16777215,.5),b.clear(),N&&We.render(se);let Xe=b.toneMapping;b.toneMapping=li;let Be=ue.viewport;if(ue.viewport!==void 0&&(ue.viewport=void 0),g.setupLightsView(ue),Q===!0&&Ee.setGlobalState(b.clippingPlanes,ue),En(R,se,ue),J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie),P.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let et=0,Ye=ee.length;et<Ye;et++){let At=ee[et],Nt=At.object,yt=At.geometry,at=At.material,bt=At.group;if(at.side===Ut&&Nt.layers.test(ue.layers)){let M=at.side;at.side=fn,at.needsUpdate=!0,zt(Nt,se,ue,yt,at,bt),at.side=M,at.needsUpdate=!0,je=!0}}je===!0&&(J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie))}b.setRenderTarget(Le,Ne,ke),b.setClearColor(j,$),Be!==void 0&&(ue.viewport=Be),b.toneMapping=Xe}function En(R,ee,se){let ue=ee.isScene===!0?ee.overrideMaterial:null;for(let ie=0,ge=R.length;ie<ge;ie++){let Le=R[ie],Ne=Le.object,ke=Le.geometry,Xe=Le.group,Be=Le.material;Be.allowOverride===!0&&ue!==null&&(Be=ue),Ne.layers.test(se.layers)&&zt(Ne,ee,se,ke,Be,Xe)}}function zt(R,ee,se,ue,ie,ge){R.onBeforeRender(b,ee,se,ue,ie,ge),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ie.onBeforeRender(b,ee,se,ue,R,ge),ie.transparent===!0&&ie.side===Ut&&ie.forceSinglePass===!1?(ie.side=fn,ie.needsUpdate=!0,b.renderBufferDirect(se,ee,ue,ie,R,ge),ie.side=gr,ie.needsUpdate=!0,b.renderBufferDirect(se,ee,ue,ie,R,ge),ie.side=Ut):b.renderBufferDirect(se,ee,ue,ie,R,ge),R.onAfterRender(b,ee,se,ue,ie,ge)}function Ot(R,ee,se){ee.isScene!==!0&&(ee=V);let ue=Y.get(R),ie=g.state.lights,ge=g.state.shadowsArray,Le=ie.state.version,Ne=ze.getParameters(R,ie.state,ge,ee,se),ke=ze.getProgramCacheKey(Ne),Xe=ue.programs;ue.environment=R.isMeshStandardMaterial?ee.environment:null,ue.fog=ee.fog,ue.envMap=(R.isMeshStandardMaterial?Se:pe).get(R.envMap||ue.environment),ue.envMapRotation=ue.environment!==null&&R.envMap===null?ee.environmentRotation:R.envMapRotation,Xe===void 0&&(R.addEventListener("dispose",wn),Xe=new Map,ue.programs=Xe);let Be=Xe.get(ke);if(Be!==void 0){if(ue.currentProgram===Be&&ue.lightsStateVersion===Le)return ji(R,Ne),Be}else Ne.uniforms=ze.getUniforms(R),R.onBeforeCompile(Ne,b),Be=ze.acquireProgram(Ne,ke),Xe.set(ke,Be),ue.uniforms=Ne.uniforms;let je=ue.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||(je.clippingPlanes=Ee.uniform),ji(R,Ne),ue.needsLights=(function(et){return et.isMeshLambertMaterial||et.isMeshToonMaterial||et.isMeshPhongMaterial||et.isMeshStandardMaterial||et.isShadowMaterial||et.isShaderMaterial&&et.lights===!0})(R),ue.lightsStateVersion=Le,ue.needsLights&&(je.ambientLightColor.value=ie.state.ambient,je.lightProbe.value=ie.state.probe,je.directionalLights.value=ie.state.directional,je.directionalLightShadows.value=ie.state.directionalShadow,je.spotLights.value=ie.state.spot,je.spotLightShadows.value=ie.state.spotShadow,je.rectAreaLights.value=ie.state.rectArea,je.ltc_1.value=ie.state.rectAreaLTC1,je.ltc_2.value=ie.state.rectAreaLTC2,je.pointLights.value=ie.state.point,je.pointLightShadows.value=ie.state.pointShadow,je.hemisphereLights.value=ie.state.hemi,je.directionalShadowMap.value=ie.state.directionalShadowMap,je.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,je.spotShadowMap.value=ie.state.spotShadowMap,je.spotLightMatrix.value=ie.state.spotLightMatrix,je.spotLightMap.value=ie.state.spotLightMap,je.pointShadowMap.value=ie.state.pointShadowMap,je.pointShadowMatrix.value=ie.state.pointShadowMatrix),ue.currentProgram=Be,ue.uniformsList=null,Be}function dt(R){if(R.uniformsList===null){let ee=R.currentProgram.getUniforms();R.uniformsList=Tr.seqWithValue(ee.seq,R.uniforms)}return R.uniformsList}function ji(R,ee){let se=Y.get(R);se.outputColorSpace=ee.outputColorSpace,se.batching=ee.batching,se.batchingColor=ee.batchingColor,se.instancing=ee.instancing,se.instancingColor=ee.instancingColor,se.instancingMorph=ee.instancingMorph,se.skinning=ee.skinning,se.morphTargets=ee.morphTargets,se.morphNormals=ee.morphNormals,se.morphColors=ee.morphColors,se.morphTargetsCount=ee.morphTargetsCount,se.numClippingPlanes=ee.numClippingPlanes,se.numIntersection=ee.numClipIntersection,se.vertexAlphas=ee.vertexAlphas,se.vertexTangents=ee.vertexTangents,se.toneMapping=ee.toneMapping}Fn.setAnimationLoop(function(R){Wi&&Wi(R)}),typeof self<"u"&&Fn.setContext(self),this.setAnimationLoop=function(R){Wi=R,ht.setAnimationLoop(R),R===null?Fn.stop():Fn.start()},ht.addEventListener("sessionstart",Er),ht.addEventListener("sessionend",Ar),this.render=function(R,ee){if(ee!==void 0&&ee.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(ee),ee=ht.getCamera()),R.isScene===!0&&R.onBeforeRender(b,R,ee,F),g=$e.get(R,y.length),g.init(ee),y.push(g),ye.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),_e.setFromProjectionMatrix(ye,ii,ee.reversedDepth),W=this.localClippingEnabled,Q=Ee.init(this.clippingPlanes,W),f=Ge.get(R,v.length),f.init(),v.push(f),ht.enabled===!0&&ht.isPresenting===!0){let ge=b.xr.getDepthSensingMesh();ge!==null&&ui(ge,ee,-1/0,b.sortObjects)}ui(R,ee,0,b.sortObjects),f.finish(),b.sortObjects===!0&&f.sort(Pe,oe),N=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,N&&We.addToRenderList(f,R),this.info.render.frame++,Q===!0&&Ee.beginShadows();let se=g.state.shadowsArray;Oe.render(se,R,ee),Q===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset();let ue=f.opaque,ie=f.transmissive;if(g.setupLights(),ee.isArrayCamera){let ge=ee.cameras;if(ie.length>0)for(let Le=0,Ne=ge.length;Le<Ne;Le++)Cr(ue,ie,R,ge[Le]);N&&We.render(R);for(let Le=0,Ne=ge.length;Le<Ne;Le++){let ke=ge[Le];Xi(f,R,ke,ke.viewport)}}else ie.length>0&&Cr(ue,ie,R,ee),N&&We.render(R),Xi(f,R,ee);F!==null&&D===0&&(J.updateMultisampleRenderTarget(F),J.updateRenderTargetMipmap(F)),R.isScene===!0&&R.onAfterRender(b,R,ee),Wt.resetDefaultState(),L=-1,k=null,y.pop(),y.length>0?(g=y[y.length-1],Q===!0&&Ee.setGlobalState(b.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(R,ee,se){let ue=Y.get(R);ue.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ue.__autoAllocateDepthBuffer===!1&&(ue.__useRenderToTexture=!1),Y.get(R.texture).__webglTexture=ee,Y.get(R.depthTexture).__webglTexture=ue.__autoAllocateDepthBuffer?void 0:se,ue.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,ee){let se=Y.get(R);se.__webglFramebuffer=ee,se.__useDefaultFramebuffer=ee===void 0};let tn=B.createFramebuffer();this.setRenderTarget=function(R,ee=0,se=0){F=R,C=ee,D=se;let ue=!0,ie=null,ge=!1,Le=!1;if(R){let Ne=Y.get(R);if(Ne.__useDefaultFramebuffer!==void 0)U.bindFramebuffer(B.FRAMEBUFFER,null),ue=!1;else if(Ne.__webglFramebuffer===void 0)J.setupRenderTarget(R);else if(Ne.__hasExternalTextures)J.rebindTextures(R,Y.get(R.texture).__webglTexture,Y.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Be=R.depthTexture;if(Ne.__boundDepthTexture!==Be){if(Be!==null&&Y.has(Be)&&(R.width!==Be.image.width||R.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(R)}}let ke=R.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Le=!0);let Xe=Y.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ie=Array.isArray(Xe[ee])?Xe[ee][se]:Xe[ee],ge=!0):ie=R.samples>0&&J.useMultisampledRTT(R)===!1?Y.get(R).__webglMultisampledFramebuffer:Array.isArray(Xe)?Xe[se]:Xe,q.copy(R.viewport),G.copy(R.scissor),te=R.scissorTest}else q.copy(ve).multiplyScalar(he).floor(),G.copy(Ce).multiplyScalar(he).floor(),te=ce;if(se!==0&&(ie=tn),U.bindFramebuffer(B.FRAMEBUFFER,ie)&&ue&&U.drawBuffers(R,ie),U.viewport(q),U.scissor(G),U.setScissorTest(te),ge){let Ne=Y.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Ne.__webglTexture,se)}else if(Le){let Ne=ee;for(let ke=0;ke<R.textures.length;ke++){let Xe=Y.get(R.textures[ke]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+ke,Xe.__webglTexture,se,Ne)}}else if(R!==null&&se!==0){let Ne=Y.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ne.__webglTexture,se)}L=-1},this.readRenderTargetPixels=function(R,ee,se,ue,ie,ge,Le,Ne=0){if(!R||!R.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){U.bindFramebuffer(B.FRAMEBUFFER,ke);try{let Xe=R.textures[Ne],Be=Xe.format,je=Xe.type;if(!z.textureFormatReadable(Be))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(je))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");ee>=0&&ee<=R.width-ue&&se>=0&&se<=R.height-ie&&(R.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ne),B.readPixels(ee,se,ue,ie,nt.convert(Be),nt.convert(je),ge))}finally{let Xe=F!==null?Y.get(F).__webglFramebuffer:null;U.bindFramebuffer(B.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(R,ee,se,ue,ie,ge,Le,Ne=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){if(ee>=0&&ee<=R.width-ue&&se>=0&&se<=R.height-ie){U.bindFramebuffer(B.FRAMEBUFFER,ke);let Xe=R.textures[Ne],Be=Xe.format,je=Xe.type;if(!z.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let et=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,et),B.bufferData(B.PIXEL_PACK_BUFFER,ge.byteLength,B.STREAM_READ),R.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ne),B.readPixels(ee,se,ue,ie,nt.convert(Be),nt.convert(je),0);let Ye=F!==null?Y.get(F).__webglFramebuffer:null;U.bindFramebuffer(B.FRAMEBUFFER,Ye);let At=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await yh(B,At,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,et),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ge),B.deleteBuffer(et),B.deleteSync(At),ge}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,ee=null,se=0){let ue=Math.pow(2,-se),ie=Math.floor(R.image.width*ue),ge=Math.floor(R.image.height*ue),Le=ee!==null?ee.x:0,Ne=ee!==null?ee.y:0;J.setTexture2D(R,0),B.copyTexSubImage2D(B.TEXTURE_2D,se,0,0,Le,Ne,ie,ge),U.unbindTexture()};let lt=B.createFramebuffer(),St=B.createFramebuffer();this.copyTextureToTexture=function(R,ee,se=null,ue=null,ie=0,ge=null){let Le,Ne,ke,Xe,Be,je,et,Ye,At;ge===null&&(ie!==0?(or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ge=ie,ie=0):ge=0);let Nt=R.isCompressedTexture?R.mipmaps[ge]:R.image;if(se!==null)Le=se.max.x-se.min.x,Ne=se.max.y-se.min.y,ke=se.isBox3?se.max.z-se.min.z:1,Xe=se.min.x,Be=se.min.y,je=se.isBox3?se.min.z:0;else{let H=Math.pow(2,-ie);Le=Math.floor(Nt.width*H),Ne=Math.floor(Nt.height*H),ke=R.isDataArrayTexture?Nt.depth:R.isData3DTexture?Math.floor(Nt.depth*H):1,Xe=0,Be=0,je=0}ue!==null?(et=ue.x,Ye=ue.y,At=ue.z):(et=0,Ye=0,At=0);let yt=nt.convert(ee.format),at=nt.convert(ee.type),bt;ee.isData3DTexture?(J.setTexture3D(ee,0),bt=B.TEXTURE_3D):ee.isDataArrayTexture||ee.isCompressedArrayTexture?(J.setTexture2DArray(ee,0),bt=B.TEXTURE_2D_ARRAY):(J.setTexture2D(ee,0),bt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,ee.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,ee.unpackAlignment);let M=B.getParameter(B.UNPACK_ROW_LENGTH),T=B.getParameter(B.UNPACK_IMAGE_HEIGHT),I=B.getParameter(B.UNPACK_SKIP_PIXELS),K=B.getParameter(B.UNPACK_SKIP_ROWS),O=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Nt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Nt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Xe),B.pixelStorei(B.UNPACK_SKIP_ROWS,Be),B.pixelStorei(B.UNPACK_SKIP_IMAGES,je);let ae=R.isDataArrayTexture||R.isData3DTexture,X=ee.isDataArrayTexture||ee.isData3DTexture;if(R.isDepthTexture){let H=Y.get(R),Z=Y.get(ee),Te=Y.get(H.__renderTarget),De=Y.get(Z.__renderTarget);U.bindFramebuffer(B.READ_FRAMEBUFFER,Te.__webglFramebuffer),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let be=0;be<ke;be++)ae&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Y.get(R).__webglTexture,ie,je+be),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Y.get(ee).__webglTexture,ge,At+be)),B.blitFramebuffer(Xe,Be,Le,Ne,et,Ye,Le,Ne,B.DEPTH_BUFFER_BIT,B.NEAREST);U.bindFramebuffer(B.READ_FRAMEBUFFER,null),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(ie!==0||R.isRenderTargetTexture||Y.has(R)){let H=Y.get(R),Z=Y.get(ee);U.bindFramebuffer(B.READ_FRAMEBUFFER,lt),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,St);for(let Te=0;Te<ke;Te++)ae?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,H.__webglTexture,ie,je+Te):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,H.__webglTexture,ie),X?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Z.__webglTexture,ge,At+Te):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Z.__webglTexture,ge),ie!==0?B.blitFramebuffer(Xe,Be,Le,Ne,et,Ye,Le,Ne,B.COLOR_BUFFER_BIT,B.NEAREST):X?B.copyTexSubImage3D(bt,ge,et,Ye,At+Te,Xe,Be,Le,Ne):B.copyTexSubImage2D(bt,ge,et,Ye,Xe,Be,Le,Ne);U.bindFramebuffer(B.READ_FRAMEBUFFER,null),U.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else X?R.isDataTexture||R.isData3DTexture?B.texSubImage3D(bt,ge,et,Ye,At,Le,Ne,ke,yt,at,Nt.data):ee.isCompressedArrayTexture?B.compressedTexSubImage3D(bt,ge,et,Ye,At,Le,Ne,ke,yt,Nt.data):B.texSubImage3D(bt,ge,et,Ye,At,Le,Ne,ke,yt,at,Nt):R.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ge,et,Ye,Le,Ne,yt,at,Nt.data):R.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ge,et,Ye,Nt.width,Nt.height,yt,Nt.data):B.texSubImage2D(B.TEXTURE_2D,ge,et,Ye,Le,Ne,yt,at,Nt);B.pixelStorei(B.UNPACK_ROW_LENGTH,M),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,T),B.pixelStorei(B.UNPACK_SKIP_PIXELS,I),B.pixelStorei(B.UNPACK_SKIP_ROWS,K),B.pixelStorei(B.UNPACK_SKIP_IMAGES,O),ge===0&&ee.generateMipmaps&&B.generateMipmap(bt),U.unbindTexture()},this.initRenderTarget=function(R){Y.get(R).__webglFramebuffer===void 0&&J.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?J.setTextureCube(R,0):R.isData3DTexture?J.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?J.setTexture2DArray(R,0):J.setTexture2D(R,0),U.unbindTexture()},this.resetState=function(){C=0,D=0,F=null,U.reset(),Wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};async function eu(r,e){let t=window.PokerGarage,n=new Image;n.src="./assets/player-hall/standing-monkey-v1.webp",await n.decode(),await t.loadWardrobe(e);let i=t.renderCharacter(n,e),s=document.createElement("canvas");s.width=1024,s.height=1536;let a=s.getContext("2d",{willReadFrequently:!0});a.drawImage(i,0,0,1024,1536);let o=new Image;o.src="./assets/player-hall/character-3d/club-rear-v1.png",await o.decode();let c=document.createElement("canvas");c.width=1024,c.height=1536;let l=c.getContext("2d");l.drawImage(o,0,0,1024,1536);let h=new Image;h.src="./assets/player-hall/character-3d/club-side-v1.png",await h.decode();let u=document.createElement("canvas");u.width=1024,u.height=1536;let d=u.getContext("2d");d.drawImage(h,0,0,1024,1536);let m=d.getImageData(0,0,1024,1536).data,p=a.getImageData(0,0,1024,1536).data,_=l.getImageData(0,0,1024,1536).data;function f(Q,W,ye){let w=Math.max(0,Math.min(1535,Math.round(ye*1535))),E=Math.max(0,Math.min(1023,Math.round(W*1023)));if(Q[(w*1024+E)*4+3]>220)return W;for(let V=1;V<180;V++)for(let N of[E-V,E+V])if(N>=0&&N<1024&&Q[(w*1024+N)*4+3]>220)return N/1023;return W}let g=new Mt(i),v=new Mt(c),y=new Mt(u);for(let Q of[g,v,y])Q.colorSpace=ot,Q.anisotropy=4;let b=new Qt({uniforms:{portrait:{value:g},rear:{value:v},profile:{value:y},jacketColor:{value:new qe(t.item("suit",e.suit).color)},pantsColor:{value:new qe(t.item("pants",e.pants).color)},shoeColor:{value:new qe(t.item("shoes",e.shoes).color)}},side:Ut,vertexShader:"attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;void main(){vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;vNormal=normalMatrix*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);float f=smoothstep(.03,.52,vFront)*a.a;vec3 n=normalize(vNormal);float light=.90+.10*max(0.,dot(n,normalize(vec3(-.5,.8,1.))));vec3 color=mix(b,a.rgb,f);float sideAmount=1.-smoothstep(.05,.72,abs(vFront));color=mix(color,s,sideAmount)*light;gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`}),S=new Ke,C=[];function D(Q,{rings:W=70,sides:ye=80,muzzle:w=!1,folds:E=0,z:V=0}={}){let N=[],x=[],P=[],z=[],U=[],re=[],Y=Q[0][0],J=Q.at(-1)[0];function pe(me){let xe=0;for(;xe<Q.length-2&&Q[xe+1][0]<me;)xe++;let Ue=Q[xe],ze=Q[xe+1],Je=Math.max(0,Math.min(1,(me-Ue[0])/(ze[0]-Ue[0])));return Ue.map((Ge,$e)=>{if($e===0)return me;let Ee=Q[Math.max(0,xe-1)][$e]||0,Oe=Q[Math.min(Q.length-1,xe+2)][$e]||0,We=ze[$e]||0;return Math.max(Math.min(Ge,We),Math.min(Math.max(Ge,We),.5*(2*Ge+(-Ee+We)*Je+(2*Ee-5*Ge+4*We-Oe)*Je*Je+(-Ee+3*Ge-3*We+Oe)*Je*Je*Je)))})}for(let me=0;me<=W;me++){let xe=Y+(J-Y)*me/W,[,Ue,ze,Je,Ge=0]=pe(xe),$e=(Ue+ze)/2,Ee=(ze-Ue)/2;for(let Oe=0;Oe<=ye;Oe++){let We=2*Math.PI*Oe/ye,Ft=Math.cos(We),Ie=Math.sin(We),tt=$e+Ee*Ft,nt=Je*(1+E*Math.sin(xe*260+We*4)*Math.sin(Math.PI*me/W)),Wt=V+Ge+nt*Ie;if(w&&Ie>0){let ht=(tt-.507)/.085;Wt+=.17*Math.exp(-(ht*ht)-((xe-.126)/.031)**2)*Ie*Ie,Wt+=.045*Math.exp(-(((tt-.505)/.05)**2)-((xe-.104)/.015)**2)*Ie,Wt-=.028*(Math.exp(-(((tt-.466)/.024)**2))+Math.exp(-(((tt-.55)/.024)**2)))*Math.exp(-(((xe-.077)/.013)**2))*Ie}N.push((tt-.5)*2.55,(.5-xe)*3.825,Wt),x.push(f(p,tt,xe),1-xe);let _t=xe,B=tt;w?_t=.008+(xe-.008)*.74:Y<.24&&J>.4&&Ue>.29&&ze<.72&&(_t=.14+(xe-.165)*1.08),Y>.82&&(B=$e+(tt-$e)*.8),P.push(f(_,B,_t),1-_t);let It=w?xe*.92:xe,mt=(w?.45:.49)+Wt*.4;if(Y>=.45&&J>.62&&xe>.49&&xe<.62&&(mt=Math.min(mt,.43)),z.push(f(m,mt,It),1-It),U.push(Ie),me<W&&Oe<ye){let ht=me*(ye+1)+Oe,Yt=ht+ye+1;re.push(ht,ht+1,Yt,ht+1,Yt+1,Yt)}}}let Se=new ct;Se.setAttribute("position",new Fe(N,3)),Se.setAttribute("uv",new Fe(x,2)),Se.setAttribute("rearUv",new Fe(P,2)),Se.setAttribute("profileUv",new Fe(z,2)),Se.setAttribute("frontWeight",new Fe(U,1)),Se.setIndex(re),Se.computeVertexNormals(),S.add(new pt(Se,b)),C.push(Se)}D([[.165,.435,.575,.1],[.19,.35,.65,.21],[.245,.313,.69,.28],[.32,.32,.69,.28],[.4,.31,.69,.255],[.455,.315,.68,.225],[.475,.37,.63,.18]],{folds:.025}),D([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36}),D([[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!0,z:.1,rings:110,sides:112}),D([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35}),D([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35});for(let Q of[-1,1]){let W=ye=>Q<0?ye:ye.map(([w,E,V,N,x])=>[w,1-V,1-E,N,x||0]);D(W([[.175,.324,.35,.02],[.2,.26,.35,.13],[.255,.22,.328,.145],[.32,.185,.303,.15],[.37,.167,.276,.135],[.43,.141,.254,.13],[.475,.145,.234,.105],[.49,.153,.23,.085]]),{z:-.025,folds:.025,rings:100}),D(W([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22}),D(W([[.478,.168,.221,.055],[.493,.151,.23,.08],[.525,.146,.251,.09],[.554,.153,.263,.085],[.58,.166,.251,.065],[.6,.195,.234,.025]]),{z:.035,rings:60,folds:.018});for(let ye=0;ye<4;ye++){let w=.166+ye*.018,E=.55+ye*.004;D(W([[E,w,w+.019,.025],[E+.025,w-.002,w+.02,.028],[E+.041,w+.003,w+.017,.007]]),{z:.07,rings:18,sides:24})}D(W([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30})}D([[.454,.36,.65,.17],[.48,.303,.7,.24],[.53,.29,.713,.25],[.58,.3,.7,.23],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025});for(let Q of[-1,1]){let W=ye=>Q<0?ye:ye.map(([w,E,V,N,x])=>[w,1-V,1-E,N,x||0]);D(W([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,.271,.44,.19],[.74,.252,.423,.185],[.79,.242,.397,.165],[.826,.254,.39,.155],[.843,.27,.379,.12]]),{z:-.01,folds:.025,rings:110}),D(W([[.829,.275,.373,.095],[.848,.27,.389,.135],[.875,.25,.394,.19],[.907,.207,.397,.245],[.944,.165,.4,.285],[.966,.154,.393,.255],[.98,.18,.37,.16],[.986,.26,.31,.01]]),{z:.1,folds:.014,rings:85})}let F=new rn;F.add(S);let L=new bn({alpha:!0,antialias:!0});L.setPixelRatio(Math.min(devicePixelRatio,2)),L.outputColorSpace=ot,r.append(L.domElement),L.domElement.setAttribute("role","img"),L.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let k=new oi(-1.5,1.5,2.05,-2.05,.1,30);k.position.set(0,0,8);let q=0,G=0,te=null,j,$=!1,ne=!1,fe=0,he=()=>{if(!r.clientWidth||!r.clientHeight)return;let Q=r.clientWidth/r.clientHeight,W=Math.max(2.05,1.17/Q);k.left=-W*Q,k.right=W*Q,k.top=W,k.bottom=-W,k.updateProjectionMatrix(),L.setSize(r.clientWidth,r.clientHeight,!1)},Pe=new ResizeObserver(he);Pe.observe(r),he();let oe=Q=>{ne=!1,te={id:Q.pointerId,x:Q.clientX,y:Q.clientY},r.setPointerCapture(Q.pointerId),Q.preventDefault()},ve=Q=>{!te||te.id!==Q.pointerId||(q+=(Q.clientX-te.x)*.012,G=Math.max(-.35,Math.min(.35,G+(Q.clientY-te.y)*.006)),te.x=Q.clientX,te.y=Q.clientY)},Ce=()=>{te=null},ce=Q=>{["ArrowLeft","ArrowRight"].includes(Q.key)&&(q+=Q.key==="ArrowLeft"?-.15:.15,Q.preventDefault())};r.addEventListener("pointerdown",oe),r.addEventListener("pointermove",ve),r.addEventListener("pointerup",Ce),r.addEventListener("pointercancel",Ce),r.addEventListener("keydown",ce);function _e(Q=0){$||(ne&&!te&&fe&&(q+=Math.min(.05,(Q-fe)/1e3)*.35),fe=Q,S.rotation.set(G,q,0),r.dataset.yaw=String(q),L.render(F,k),j=requestAnimationFrame(_e))}return _e(),{setYaw(Q){q=Q},setAutoRotate(Q){ne=!!Q},dispose(){if(!$){$=!0,cancelAnimationFrame(j),Pe.disconnect();for(let[Q,W]of[["pointerdown",oe],["pointermove",ve],["pointerup",Ce],["pointercancel",Ce],["keydown",ce]])r.removeEventListener(Q,W);for(let Q of C)Q.dispose();b.dispose(),g.dispose(),v.dispose(),y.dispose(),L.dispose(),L.forceContextLoss(),L.domElement.remove()}}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new rn,s=new Ke;i.add(s);let a=new bn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ot,a.toneMapping=jn,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new Lt(34,1,.1,40);i.add(new Ln("#dcecff","#50402b",2));for(let[W,ye,w,E]of[[3,6,5,4],[-3,3,-3,3]]){let V=new Dn("#fff0dd",E);V.position.set(W,ye,w),i.add(V)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let W=0;W<128;W+=2)l.fillStyle=W%4?"#808080":"#b0b0b0",l.fillRect(0,W,128,1);for(let W=0;W<128;W+=3)l.fillStyle="#888888",l.fillRect(W,0,1,128);let h=new Mt(c);h.wrapS=h.wrapT=Pn,h.repeat.set(8,8);let u=(W,ye=0,w=.7)=>new Tn({color:W,metalness:ye,roughness:w}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),_=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),v=u("#171b20"),y=u("#171b20"),b=u("#826222",.9,.18);for(let W of[g,v,p])W.bumpMap=h,W.bumpScale=.012;function S(W,ye,w,E,V,N,x,P=s){let z=new pt(new qt(1,40,28),W);return z.position.set(ye,w,E),z.scale.set(V,N,x),P.add(z),z}function C(W,ye,w,E,V=E){let N=new A(...ye),x=new A(...w),P=x.clone().sub(N),z=new pt(E>.1?new ur((E+V)/2,Math.max(.01,P.length()-(E+V)),10,32):new Ze(V,E,P.length(),16),W);return z.position.copy(N.add(x).multiplyScalar(.5)),z.quaternion.setFromUnitVectors(new A(0,1,0),P.normalize()),s.add(z),z}S(v,0,1.64,0,.47,.36,.26),S(g,0,2.32,0,.59,.65,.32),S(p,0,2.35,.29,.27,.49,.055);for(let W of[-1,1]){C(v,[W*.27,1.67,0],[W*.29,.92,.015],.23,.25),S(v,W*.29,.92,.015,.23,.24,.24),C(v,[W*.29,.94,.015],[W*.32,.28,0],.16,.22),C(_,[W*.45,1.55,.03],[W*.48,.36,.03],.025,.032),S(y,W*.32,.18,.15,.22,.19,.39),S(_,W*.32,.075,.15,.235,.065,.4),S(_,W*.32,.27,.12,.135,.08,.2);for(let ye=0;ye<5;ye++)C(_,[W*.32-.1,.29,.08+ye*.04],[W*.32+.1,.29,.08+ye*.04],.009);S(g,W*.55,2.63,0,.26,.27,.29),C(g,[W*.57,2.63,0],[W*.76,2.12,.02],.19,.23),S(g,W*.76,2.12,.02,.19,.2,.2),C(g,[W*.76,2.12,.02],[W*.88,1.65,.08],.13,.18),C(_,[W*.71,2.6,.15],[W*.99,1.72,.15],.035),S(p,W*.88,1.67,.08,.145,.09,.15),S(d,W*.89,1.48,.1,.16,.22,.12);for(let ye=0;ye<4;ye++)S(m,W*(.79+ye*.065),1.36,.15,.035,.13,.045);S(m,W*.75,1.48,.2,.06,.12,.06)}S(d,0,3.04,0,.25,.27,.24),S(d,0,3.39,0,.36,.43,.31);for(let W of[-1,1])S(m,W*.36,3.4,.01,.12,.17,.09),S(d,W*.36,3.4,.065,.065,.1,.035),S(m,W*.15,3.43,.258,.15,.12,.075),S(p,W*.14,3.44,.32,.045,.035,.02),S(_,W*.13,3.45,.335,.009,.01,.006),S(d,W*.15,3.53,.28,.18,.05,.07);S(m,0,3.23,.27,.26,.18,.13),S(m,0,3.34,.34,.14,.08,.08),S(p,0,3.17,.375,.17,.017,.018),S(m,0,3.13,.36,.17,.035,.025);let D=new Ke;s.add(D),S(p,0,3.51,-.02,.41,.42,.35,D),S(f,0,3.64,.015,.07,.3,.36,D);for(let W of[-1,1])S(p,W*.32,3.29,.015,.1,.31,.24,D),S(f,W*.39,3.43,.07,.025,.05,.05,D);let F=S(b,0,3.44,.27,.38,.19,.14,D);for(let W of[-1,1])C(p,[W*.28,2.88,.25],[W*.1,2.58,.33],.035),C(p,[W*.3,2.28,.3],[W*.39,2.09,.26],.018);for(let W=0;W<6;W++)S(f,0,2.03+W*.14,.35,.015,.015,.01);let L=document.createElement("canvas");L.width=512,L.height=256;let k=L.getContext("2d"),q=new Mt(L);q.colorSpace=ot;let G=new pt(new Bt(.28,.12),new Tn({map:q,roughness:.9}));G.position.set(-.27,2.46,.317),s.add(G);let te=new Ke;for(let W=0;W<3;W++)for(let ye=0;ye<5;ye++){let w=new pt(new Bt(.048,.048),(ye+W)%2?p:_);w.position.set(-.36+ye*.048,2.62+W*.048,.318),te.add(w)}s.add(te);function j(W){g.color.set(n.item("suit",W.suit).color),v.color.set(n.item("pants",W.pants).color),y.color.set(n.item("shoes",W.shoes).color),D.visible=W.helmet!=="none",F.position.y=W.visor==="open"?3.71:3.44,F.rotation.x=W.visor==="open"?-.8:0,G.visible=W.patch!=="none",k.fillStyle="#22282b",k.fillRect(0,0,512,256),k.strokeStyle="#c9af74",k.lineWidth=12,k.strokeRect(8,8,496,240),k.fillStyle="#eee0b5",k.font="bold 72px Arial",k.textAlign="center",k.fillText(W.patch==="name"?W.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":W.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),q.needsUpdate=!0}j(e),t.yaw??=0,t.pitch??=.07;let $=null,ne,fe=!1;function he(){let W=r.clientWidth,ye=r.clientHeight;!W||!ye||(a.setSize(W,ye,!1),o.aspect=W/ye,o.updateProjectionMatrix())}let Pe=new ResizeObserver(he);Pe.observe(r),he();let oe=W=>{$={id:W.pointerId,x:W.clientX,y:W.clientY},r.setPointerCapture(W.pointerId),W.preventDefault()},ve=W=>{!$||$.id!==W.pointerId||(t.yaw-=(W.clientX-$.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(W.clientY-$.y)*.006)),$.x=W.clientX,$.y=W.clientY)},Ce=()=>{$=null},ce=W=>{(W.key==="ArrowLeft"||W.key==="ArrowRight")&&(t.yaw+=W.key==="ArrowLeft"?.15:-.15,W.preventDefault())};r.addEventListener("pointerdown",oe),r.addEventListener("pointermove",ve),r.addEventListener("pointerup",Ce),r.addEventListener("pointercancel",Ce),r.addEventListener("keydown",ce);function _e(){if(fe)return;fe=!0,cancelAnimationFrame(ne),Pe.disconnect();for(let[ye,w]of[["pointerdown",oe],["pointermove",ve],["pointerup",Ce],["pointercancel",Ce],["keydown",ce]])r.removeEventListener(ye,w);let W=new Set;i.traverse(ye=>{ye.geometry?.dispose(),ye.material&&W.add(ye.material)});for(let ye of W)ye.dispose();q.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function Q(){if(fe)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){_e();return}let W=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*W,1.95+Math.sin(t.pitch)*W,Math.cos(t.yaw)*Math.cos(t.pitch)*W),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ne=requestAnimationFrame(Q)}return Q(),{update:j,dispose:_e,state:t}};function Jl(r){let e=new Ke;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(L,k,q)=>new mn({color:L,metalness:k,roughness:q,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(L,k,q=0,G=0,te=0)=>{let j=new pt(L,k);return j.position.set(q,G,te),j.castShadow=j.receiveShadow=!0,e.add(j),j},h=(L,k,q,G=!0)=>{let te=new on;return te.absarc(k,q,L,0,Math.PI*2,G),te},u=t?.395:.437,d=new jt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let L=0;L<24;L++)for(let[k,q]of[[.28,0],[.36,.045]]){let G=L*Math.PI/12+q;d.holes.push(h(n?.009:.011,Math.cos(G)*k,Math.sin(G)*k))}for(let L of[0,.033])l(new kt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,L);let m=new gt(.22,.014,.025),p=new Kr(m,a,32),_=new Qe;for(let L=0;L<32;L++){let k=L*Math.PI/16;_.compose(new A(Math.cos(k)*.31,Math.sin(k)*.31,.021),new dn().setFromAxisAngle(new A(0,0,1),k+.18),new A(1,1,1)),p.setMatrixAt(L,_)}e.add(p);let f=l(new Ze(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new Ze(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let L=0;L<10;L++){let k=L*Math.PI/5,q=l(new Ze(.017,.017,.015,12),s,Math.cos(k)*.18,Math.sin(k)*.18,.05);q.rotation.x=Math.PI/2;let G=l(new Ze(.009,.009,.018,6),a,Math.cos(k)*.18,Math.sin(k)*.18,.058);G.rotation.x=Math.PI/2}for(let L of[.235,.26,.31,.335,.39,.414])if(L<u){let k=l(new Et(L,.0012,3,96),a,0,0,.042);k.castShadow=!1}if(!t)for(let L=0;L<8;L++){let k=L*Math.PI/4,q=[.25,.29,.34,.395].map((te,j)=>new A(Math.cos(k+j*.075)*te,Math.sin(k+j*.075)*te,.043)),G=l(new Rt(new Pt(q),12,.0024,3,!1),a);G.castShadow=!1}let v=new jt;v.moveTo(-.08,-.2),v.quadraticCurveTo(-.13,-.15,-.115,-.06),v.lineTo(-.115,.1),v.quadraticCurveTo(-.12,.19,-.05,.215),v.lineTo(.055,.19),v.quadraticCurveTo(.11,.14,.105,.06),v.lineTo(.105,-.1),v.quadraticCurveTo(.1,-.19,.04,-.21),v.closePath();let y=l(new kt(v,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&y.scale.set(.8,.8,.8),l(new gt(.09,.31,.032),a,.27,0,.005);for(let L of[-.125,0,.125]){let k=l(new Ze(.055,.055,.028,24),c,.354,L,.07);k.rotation.x=Math.PI/2}for(let L of[-.155,.155]){let k=l(new Ze(.014,.014,.025,6),s,.325,L,.094);k.rotation.x=Math.PI/2}let b=document.createElement("canvas");b.width=128,b.height=384;let S=b.getContext("2d");S.fillStyle="#f5f0df",S.translate(64,192),S.rotate(-Math.PI/2),S.textAlign="center",S.font="italic bold 60px Arial",S.fillText(t?"P21":"P21 SPORT",0,20);let C=new Mt(b);C.colorSpace=ot;let D=l(new Bt(.075,.24),new Sn({map:C,transparent:!0,depthWrite:!1}),.329,0,.1);D.castShadow=!1;let F=l(new Ze(.012,.014,.047,6),s,.36,.217,.042);return F.rotation.z=.2,e}var Zl;function tu(r,e){if(!r.isConnected)return;if(!Zl){let a=new bn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ot,a.toneMapping=jn,a.toneMappingExposure=1.15;let o=new rn;o.add(new Ln("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new Dn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Lt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),Zl={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=Zl;s[e]||(s[e]=Jl(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function $l(r){let e=new Ke;e.name="sport-seat-"+r;let t=(S,C=.8,D=0)=>new mn({color:S,roughness:C,metalness:D,clearcoat:D?.4:.08}),n=t(r==="red"?"#a91e32":"#303943"),i=t("#151b22"),s=t("#10151c",.32,.35),a=t(r==="red"?"#e26970":"#89959f"),o=t("#acb5be",.28,.85),c=t("#cfb579",.95),l=t("#070b10"),h=document.createElement("canvas");h.width=h.height=64;let u=h.getContext("2d");u.fillStyle="#30343b",u.fillRect(0,0,64,64);for(let S=0;S<64;S+=8)for(let C=0;C<64;C+=8)u.fillStyle=(C+S)%16?"#121820":"#626973",u.fillRect(C,S,7,3),u.fillStyle="#252b33",u.fillRect(C,S+4,3,4);let d=new Mt(h);d.wrapS=d.wrapT=Pn,d.repeat.set(3,5),d.colorSpace=ot,s.map=d,s.bumpMap=d,s.bumpScale=.004;let m=(S,C,D=0,F=0,L=0,k=e)=>{let q=new pt(S,C);return q.position.set(D,F,L),q.castShadow=q.receiveShadow=!0,k.add(q),q},p=(S,C,D,F,L,k,q,G,te=e)=>{let j=new jt,$=-S/2,ne=-C/2;return F=Math.min(F,S/2,C/2,D/2),j.moveTo($+F,ne),j.lineTo($+S-F,ne),j.quadraticCurveTo($+S,ne,$+S,ne+F),j.lineTo($+S,ne+C-F),j.quadraticCurveTo($+S,ne+C,$+S-F,ne+C),j.lineTo($+F,ne+C),j.quadraticCurveTo($,ne+C,$,ne+C-F),j.lineTo($,ne+F),j.quadraticCurveTo($,ne,$+F,ne),m(new kt(j,{depth:D-2*F,bevelEnabled:!0,bevelSize:F,bevelThickness:F,bevelSegments:4,curveSegments:12}),L,k,q,G-D/2+F,te)},_=(S,C,D,F=e)=>m(new Rt(new Pt(S.map(L=>new A(...L))),32,C,6,!1),D,0,0,0,F),f=new Ke;f.rotation.x=-.14,f.position.set(0,.2,0),e.add(f);let g=new jt;g.moveTo(-.29,0),g.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),g.lineTo(-.47,.92),g.quadraticCurveTo(-.46,1.02,-.34,1.11),g.lineTo(-.28,1.21),g.lineTo(-.26,1.48),g.quadraticCurveTo(0,1.62,.26,1.48),g.lineTo(.28,1.21),g.lineTo(.34,1.11),g.quadraticCurveTo(.46,1.02,.47,.92),g.lineTo(.43,.65),g.bezierCurveTo(.39,.42,.38,.2,.29,0),g.closePath();for(let S of[-.135,.135]){let C=new on;C.moveTo(S-.075,1.24),C.lineTo(S+.075,1.24),C.lineTo(S+.075,1.34),C.lineTo(S-.075,1.34),C.closePath(),g.holes.push(C)}m(new kt(g,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),s,0,0,-.09,f),m(new kt(g,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),n,0,.02,.012,f).scale.set(.96,.97,1),p(.41,.18,.095,.025,n,0,1.43,.035,f),p(.46,.5,.12,.035,i,0,.85,.065,f),p(.45,.31,.17,.04,i,0,.4,.1,f);for(let S of[-1,1]){let C=p(.17,.42,.19,.055,n,S*.34,.98,.1,f);C.rotation.z=S*.28,C.rotation.y=-S*.25;let D=p(.13,.55,.23,.045,n,S*.3,.49,.14,f);D.rotation.z=-S*.12,_([[S*.27,.18,.28],[S*.34,.52,.28],[S*.4,.93,.24],[S*.3,1.17,.2]],.005,a,f);let F=S*.135;for(let L of[1.235,1.345])p(.16,.014,.022,.004,o,F,L,.015,f);for(let L of[F-.08,F+.08])p(.014,.12,.022,.004,o,L,1.29,.015,f)}p(.77,.16,.8,.055,s,0,.12,.32),p(.49,.13,.6,.045,i,0,.235,.36);for(let S of[-1,1]){let C=p(.16,.26,.74,.055,n,S*.325,.28,.35);C.rotation.z=-S*.12,_([[S*.26,.37,.03],[S*.26,.4,.31],[S*.26,.37,.66]],.005,a),p(.075,.075,.82,.015,o,S*.28,-.015,.34);for(let D of[.02,.65])p(.13,.09,.12,.015,s,S*.28,-.055,D),m(new Ze(.022,.022,.015,12),o,S*.28,-.002,D)}for(let S=.3;S<1.08;S+=.11)_([[-.19,S,.16],[0,S-.015,.17],[.19,S,.16]],.0025,a,f);for(let S of[-1,1]){let C=[[S*.135,1.5,-.13],[S*.135,1.15,-.03],[S*.13,.78,.08],[S*.1,.4,.36]],D=[],F=[];C.forEach(([G,te,j],$)=>{D.push(G-.033,te,j,G+.033,te,j),$&&F.push($*2-2,$*2-1,$*2,$*2-1,$*2+1,$*2)});let L=new ct;L.setAttribute("position",new Fe(D,3)),L.setIndex(F),L.computeVertexNormals();let k=c.clone();k.side=Ut,m(L,k);let q=p(.27,.055,.025,.008,c,S*.18,.38,.42);q.rotation.z=-S*.2}let y=m(new Ze(.065,.065,.035,24),o,0,.4,.45);y.rotation.x=Math.PI/2;let b=m(new Ze(.037,.037,.04,24),t("#b52332",.4),0,.4,.47);return b.rotation.x=Math.PI/2,e}var Kl;function nu(r,e){if(!r.isConnected||e==="none")return;if(!Kl){let a=new bn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ot,a.toneMapping=jn,a.toneMappingExposure=1.25;let o=new rn;o.add(new Ln("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new Dn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Lt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),Kl={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=Kl;s[e]||(s[e]=$l(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=eu;window.pokerPaintBrakePreview=tu;window.pokerPaintSeatPreview=nu;var iu=(r,e,t)=>Math.max(e,Math.min(t,r));function gp(r,e){let t=window.PokerGarage,n=new Ke;r.add(n),n.scale.set(1.24,.86,.95);let i=(M,T,I)=>new mn({color:M,metalness:T,roughness:I,clearcoat:T>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(M,T,I=0,K=0,O=0,ae=n){let X=new pt(M,T);return X.position.set(I,K,O),X.castShadow=!0,X.receiveShadow=!0,ae.add(X),X}let _=(M,T,I,K,O,ae,X)=>p(new gt(M,T,I),K,O,ae,X);function f(M,T,I,K,O,ae,X="y"){let H=p(new Ze(M,M,T,64),I,K,O,ae);return X==="z"&&(H.rotation.x=Math.PI/2),X==="x"&&(H.rotation.z=Math.PI/2),H}function g(M,T,I,K,O,ae,X="z"){let H=p(new Et(M,T,12,80),I,K,O,ae);return X==="y"&&(H.rotation.x=Math.PI/2),X==="x"&&(H.rotation.y=Math.PI/2),H}function v(M,T,I,K=jt){let O=new K,ae=-M/2,X=-T/2;return I=Math.min(I,T/2-.001),O.moveTo(ae+I,X),O.lineTo(ae+M-I,X),O.quadraticCurveTo(ae+M,X,ae+M,X+I),O.lineTo(ae+M,X+T-I),O.quadraticCurveTo(ae+M,X+T,ae+M-I,X+T),O.lineTo(ae+I,X+T),O.quadraticCurveTo(ae,X+T,ae,X+T-I),O.lineTo(ae,X+I),O.quadraticCurveTo(ae,X,ae+I,X),O}function y(M,T,I,K,O,ae,X=null,H=.025){let Z=v(M,T,K);if(X){let De=v(X[0],X[1],X[2],on),be=new on(De.getPoints(40).map(Me=>new de(Me.x+(X[3]||0),Me.y)));Z.holes.push(be)}let Te=p(new kt(Z,{depth:I,bevelEnabled:H>0,bevelSize:H,bevelThickness:H,bevelSegments:4,curveSegments:40}),O,0,ae,0);return Te.rotation.x=-Math.PI/2,Te}let b=[3.02,1.51,.65,-.28],S=v(4.96,2.44,1.15).getSpacedPoints(128),C=[],D=[],F=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,T]of F)for(let I=0;I<128;I++){let K=S[I];C.push(K.x*T,M,-K.y*T)}for(let M=0;M<3;M++)for(let T=0;T<128;T++){let I=M*128+T,K=M*128+(T+1)%128;D.push(I,K,I+128,K,K+128,I+128)}let L=new ct;L.setAttribute("position",new Fe(C,3)),L.setIndex(D),L.computeVertexNormals(),s.side=Ut,p(L,s),y(5.03,2.51,.065,1.19,o,.58,null,.035),y(5.1,2.58,.09,1.22,o,1.25,b,.035);let k=new Pt(v(4.94,2.42,1.15).getPoints(40).map(M=>new A(M.x,1.44,-M.y)),!0,"centripetal");p(new Rt(k,240,.125,16,!0),u);for(let M of[-1,1]){let T=Array.from({length:21},(I,K)=>{let O=.26+K*.25/20;return new A(1.32+1.15*Math.cos(O),1.44,M*(.06+1.15*Math.sin(O)))});p(new Rt(new Pt(T),32,.132,20,!1),o)}y(4.65,2.14,.035,1.03,o,1.39,b,.015),y(4.52,2.01,.025,.97,a,1.43,b,.01);let q=y(2.98,1.47,.025,.63,a,.94);q.position.x=-.28;let G=new mn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Ut,polygonOffset:!0,polygonOffsetFactor:-1}),te=new Ui(v(2.9,1.4,.6)),j=te.attributes.position,$=te.attributes.uv;for(let M=0;M<j.count;M++)$.setXY(M,(j.getX(M)+1.45)/2.9,(j.getY(M)+.7)/1.4);let ne=p(te,G,-.28,1.005,0);ne.rotation.x=-Math.PI/2,ne.castShadow=!1;let fe=G.clone(),he=[];for(let M of[-1,1]){let T=p(new Bt(3.05,.3),fe,0,1.04,M*1.329);M<0&&(T.rotation.y=Math.PI),T.castShadow=!1,he.push(T)}function Pe(M){let T=M.vinyl||"none";ne.visible=T!=="none",he.forEach(K=>K.visible=T!=="none");let I=T+":"+(M.vinylText||"");if(G.userData.id!==I){G.map?.dispose(),fe.map?.dispose(),G.map=new Mt(t.vinylCanvas(T,!1,M.vinylText)),fe.map=new Mt(t.vinylCanvas(T,!0,M.vinylText));for(let K of[G,fe]){K.map.colorSpace=ot,K.map.anisotropy=16;let O=K.map;O.image.addEventListener("vinyl-ready",()=>{O.needsUpdate=!0},{once:!0}),K.needsUpdate=!0,K.userData.id=I}}}let oe=y(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);oe.position.x=-.28;let ve=y(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);ve.position.x=-.28;for(let M of[-1,-.35,.35])for(let T of[-.75,.75])_(.011,.4,.009,h,M,1.2,T);function Ce(M,T){let I=document.createElement("canvas");I.width=I.height=256;let K=I.getContext("2d");K.fillStyle=M,K.fillRect(0,0,256,256);let O=17;for(let X=0;X<18e3;X++)O=O*1664525+1013904223>>>0,K.fillStyle="rgba(0,0,0,"+T+")",K.fillRect(O%256,(O>>>8)%256,1,1);let ae=new Mt(I);return ae.colorSpace=ot,ae.wrapS=ae.wrapT=Pn,ae}a.map=Ce("#e8e8e8",.035),a.bumpMap=Ce("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=Ce("#888888",.12),c.bumpScale=.003,u.bumpMap=Ce("#888888",.3),u.bumpScale=.001;function ce(M,T,I,K,O,ae=!1,X=n){let H=new jt;H.moveTo(0,.5),H.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),H.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),H.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),H.bezierCurveTo(.48,.12,.12,.28,0,.5),H.moveTo(-.12,-.3),H.lineTo(0,-.06),H.lineTo(.12,-.3),H.closePath();let Z=p(new kt(H,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),T,I,K,O,X);return Z.scale.setScalar(M),ae&&(Z.rotation.y=Math.PI),Z}let _e=[],Q=[],W=[],ye=null;for(let M of[-1.72,1.72])for(let T of[-1,1]){let I=T*1.36,K=T*1.57,O=new Ke;O.position.set(M,.81,I),n.add(O),O.userData.groundWheel=!0;let ae=n.children.length,X=p(new Di([new de(.56,-.19),new de(.61,-.245),new de(.67,-.25),new de(.76,-.19),new de(.8,-.1),new de(.8,.1),new de(.76,.19),new de(.67,.25),new de(.61,.245),new de(.56,.19)],80),c,M,.81,I);X.rotation.x=Math.PI/2;for(let Z=-2;Z<=2;Z++)g(.798-Math.abs(Z)*.012,.0035,h,M,.81,I+Z*.071);for(let Z=0;Z<28;Z++){let Te=Z*Math.PI/14,De=Array.from({length:17},(be,Me)=>{let Re=Me/16,He=-.205+Re*.41,le=.799-.044*Math.pow(Math.abs(He)/.205,3),we=Te+.13*Math.sin(Re*Math.PI);return new A(M+Math.sin(we)*le,.81+Math.cos(we)*le,I+He)});p(new Rt(new Pt(De),20,.0045,5,!1),h)}for(let Z of[-1,1])for(let Te of[.625,.654,.681])g(Te,.0035,h,M,.81,I+Z*.244);g(.548,.023,l,M,.81,K+T*.035),g(.505,.016,l,M,.81,K+T*.043),f(.14,.045,h,M,.81,K+T*.045,"z"),g(.14,.012,l,M,.81,K+T*.069);let H=ce(.2,l,M,.8,K+T*.075,T<0);Q.push(H);for(let Z of t.wheelDesign()){let Te=new Pt(Z.map(([De,be])=>new A(M+De,.81+be,K+T*(.04+.025*(1-Math.hypot(De,be)/.51)))));_e.push(p(new Rt(Te,20,.007,6,!1),l))}for(let Z=0;Z<20;Z++){let Te=Z*Math.PI/10;f(.006,.009,l,M+Math.sin(Te)*.526,.81+Math.cos(Te)*.526,K+T*.06,"z")}n.updateMatrixWorld(!0);for(let Z of n.children.slice(ae))O.attach(Z);O.scale.set(.88/1.24,.88/.86,1/.95),O.position.y=.715/.86,W.push({wheelGroup:O,x:M,out:K,sign:T})}let w=[];for(let M of[-1,1])w.push(_(1.35,.43,.04,o,.05,.94,M*1.3));for(let M of[-1,1]){let T=f(.275,.27,h,2.16,.945,M*.97,"z");g(.278,.035,o,2.16,.945,M*1.11)}for(let M of[-1.72,1.72])f(.07,2.8,h,M,.7,0,"z");_(3.6,.08,.8,h,0,.57,0);let E=[];function V(M,T,I){let K=document.createElement("canvas");K.width=M,K.height=T,I(K.getContext("2d"),M,T);let O=new Mt(K);return O.colorSpace=ot,O.anisotropy=8,E.push(O),O}let N=V(768,256,(M,T,I)=>{M.fillStyle="#101b18",M.fillRect(0,0,T,I),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,T-20,I-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",T/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",T/2,209)}),x=[];for(let M of[-1,1]){let T=new mn({map:N,metalness:.55,roughness:.2,clearcoat:1});x.push(T);let I=p(new Bt(1.28,.4),T,.05,.94,M*1.326);T.userData.plane=I,M<0&&(I.rotation.y=Math.PI)}let P=[];for(let M of[-1,1])for(let T=0;T<3;T++){let I=new Ke;I.position.set((T-1)*.7+.05,1,M*1.365),M<0&&(I.rotation.y=Math.PI),n.add(I);let K=p(new gt(.1,.1,.025),o,0,0,0,I),O=new Tn({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ae=p(new Bt(.65,.65),O,0,0,.035,I);ae.castShadow=!1,ae.receiveShadow=!1,P.push({group:I,mat:O,back:K,n:T})}for(let M of[-1,1])for(let T of[-.54,.64])for(let I of[.78,1.1]){let K=f(.014,.018,o,T,I,M*1.35,"z")}for(let M of[-1.7,-.35,1.48])for(let T of[-1.21,1.21]){let I=f(.128,.13,o,M,1.44,T,"x")}for(let M of[-1.7,-.35,1.48])for(let T of[-1,1])g(.125,.004,h,M+.08,1.44,T*1.21,"x"),g(.125,.004,h,M-.08,1.44,T*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let T of[-.96,.96])f(.135,.08,o,M,1.49,T),f(.108,.082,h,M,1.498,T),g(.125,.015,o,M,1.54,T,"y"),g(.111,.006,o,M,1.535,T,"y");let z=[],U=[],re=["#ab2338","#1b684b","#2455a5"].map(M=>i(M,.08,.55)),Y=i("#eee9d6",.04,.6);for(let[M,T,I,K]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let O=0;O<K;O++){f(.104,.033,re[I],M,1.49+O*.037,T);for(let ae=0;ae<6;ae++){let X=ae*Math.PI/3,H=_(.024,.021,.012,Y,M+Math.cos(X)*.103,1.49+O*.037,T+Math.sin(X)*.103);H.rotation.y=Math.PI/2-X,H.castShadow=!1,H.receiveShadow=!1,z.push(H)}if(O===K-1){let ae=new Tn({transparent:!0,alphaTest:.1,roughness:.65}),X=p(new Bt(.208,.208),ae,M,1.511+O*.037,T);X.rotation.x=-Math.PI/2,X.castShadow=!1,X.receiveShadow=!1,U.push({mat:ae,n:I})}}let J=new Ke;J.position.set(.89,1.96,0),J.scale.set(1/1.24,1/.86,1/.95),n.add(J);let pe=new Ke;J.add(pe);let Se=new A((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),me=new A(0,0,1),xe=new A().crossVectors(Se,me).normalize();pe.quaternion.setFromRotationMatrix(new Qe().makeBasis(me,xe,Se));let Ue=u.clone();p(new Et(.53,.06,16,80),Ue,0,0,0,pe),p(new Et(.473,.014,10,64),o,0,0,-.02,pe);for(let M of[Math.PI]){let T=p(new gt(.09,.39,.045),o,Math.sin(M)*.26,Math.cos(M)*.26,0,pe);T.rotation.z=-M}for(let M of[-1,1]){let T=p(new gt(.35,.075,.06),o,M*.265,0,0,pe);p(new gt(.32,.035,.064),h,M*.265,0,.006,pe)}let ze=p(new Ze(.195,.195,.075,64),o,0,0,.035,pe);ze.rotation.x=Math.PI/2;let Je=p(new ai(.177,64),new Tn({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,pe);Je.receiveShadow=!1,ce(.38,o,0,-.025,.105,!1,pe);let Ge={classic:new Ke,sport:new Ke,formula:new Ke};for(let M of pe.children.slice())Ge.classic.add(M);Object.values(Ge).forEach(M=>pe.add(M));function $e(M,T,I,K){let O=new Pt(T.map(([ae,X])=>new A(ae,X,0)),!0);p(new Rt(O,72,I,12,!0),K,0,0,0,M)}$e(Ge.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Ue);for(let M of[-1,1])p(new gt(.35,.065,.045),l,M*.27,0,0,Ge.sport),p(new gt(.065,.3,.045),l,M*.12,-.22,0,Ge.sport);p(new Et(.5,.018,8,64,.22),d,0,0,.005,Ge.sport),$e(Ge.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Ue),p(new gt(.6,.23,.065),h,0,0,0,Ge.formula);for(let M of[-1,1])p(new qt(.035,12,8),d,M*.25,.055,.06,Ge.formula),p(new gt(.08,.29,.025),l,M*.37,0,-.07,Ge.formula);for(let M of["sport","formula"]){let T=p(new Ze(.15,.15,.07,48),l,0,0,.035,Ge[M]);T.rotation.x=Math.PI/2,p(new ai(.13,48),h,0,0,.078,Ge[M]),ce(.25,l,0,-.018,.09,!1,Ge[M])}for(let[M,T]of Object.entries(t.steeringDesigns)){let I=new Ke;pe.add(I),Ge[M]=I;let K=i(T.color,M==="woodHeritage"?.3:.55,.35);T.shape==="round"?p(new Et(.53,.065,16,80),K,0,0,0,I):T.shape==="flat"?$e(I,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,K):St([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,K,I);for(let ae=0;ae<T.spokes;ae++){let X=ae*Math.PI*2/T.spokes,H=p(new gt(.39,.065,.05),l,Math.cos(X)*.25,Math.sin(X)*.25,.015,I);H.rotation.z=X}let O=p(new Ze(.15,.15,.075,40),h,0,0,.05,I);O.rotation.x=Math.PI/2,ce(.23,l,0,-.015,.095,!1,I),p(new gt(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,I)}let Ee=i("#b9ab8a",.15,.8),Oe=i("#171c20",.02,.85);for(let[M,T]of Object.entries(Ge)){let I=M==="classic"?.53:M==="sport"?.51:.47;for(let O of[-1,1]){if(M!=="formula"){let ae=p(new Et(I,.072,12,30,.64),Oe,0,0,.003,T);ae.rotation.z=O<0?Math.PI-.32:-.32}for(let ae=0;ae<9;ae++){let X=(O<0?Math.PI:0)-.28+ae*.07;p(new qt(.007,6,4),Ee,Math.cos(X)*(I-.045),Math.sin(X)*(I-.045),.063,T)}}let K=p(new gt(.065,.1,.035),M==="classic"?o:d,0,M==="formula"?.16:.51,.045,T);for(let O=0;O<6;O++){let ae=O*Math.PI/3,X=p(new Ze(.012,.012,.012,6),l,Math.cos(ae)*.13,Math.sin(ae)*.13,.099,T);X.rotation.x=Math.PI/2}}let We=new A(1.3,1.48,0),Ft=new A(.89,1.96,0),Ie=Ft.clone().sub(We),tt=We.clone().add(Ft).multiplyScalar(.5),nt=_(.12,Ie.length(),.095,o,...tt.toArray());nt.quaternion.setFromUnitVectors(new A(0,1,0),Ie.normalize()),_(.075,nt.geometry.parameters.height-.04,.1,h,...tt.toArray()).quaternion.copy(nt.quaternion);let _t=-1.84,B=1.99,It=.74,mt=new Ke;mt.position.set(_t,B,0),n.add(mt);let ht=n.children.length;f(It,.51,o,_t,B,0,"z"),f(.67,.54,h,_t,B,0,"z");for(let M of[-1,1]){let T=M*.29;g(.72,.055,h,_t,B,T),g(.75,.022,o,_t,B,T+M*.03),g(.665,.012,d,_t,B,T+M*.025);for(let I=0;I<14;I++){let K=I*Math.PI/7,O=[],ae=[];for(let Z=0;Z<=16;Z++){let Te=Z/16,De=.22+Te*.44,be=K+.55*Te;for(let Me of[-.15,.15])O.push(_t+Math.sin(be+Me)*De,B+Math.cos(be+Me)*De,T+M*(.018+Math.sin(Te*Math.PI)*.12))}for(let Z=0;Z<16;Z++){let Te=Z*2;ae.push(Te,Te+1,Te+2,Te+1,Te+3,Te+2)}let X=new ct;X.setAttribute("position",new Fe(O,3)),X.setIndex(ae),X.computeVertexNormals(),m.side=Ut,p(X,m);let H=new Pt(Array.from({length:17},(Z,Te)=>{let De=Te/16,be=.22+De*.44,Me=K+.55*De-.15;return new A(_t+Math.sin(Me)*be,B+Math.cos(Me)*be,T+M*(.025+Math.sin(De*Math.PI)*.12))}));p(new Rt(H,20,.009,6,!1),d)}f(.215,.07,o,_t,B,T+M*.085,"z"),f(.18,.085,h,_t,B,T+M*.11,"z")}for(let M=0;M<12;M++){let T=M*Math.PI/6,I=_(.045,.15,.2,h,_t+Math.cos(T)*.735,B+Math.sin(T)*.735,0);I.rotation.z=T}n.updateMatrixWorld(!0);for(let M of n.children.slice(ht))mt.attach(M);mt.rotation.set(0,Math.PI/2,0),mt.scale.set(.96/1.24,.96/.86,.96/.95);let Yt=mt.clone(!0);n.add(Yt);let gn=new Ke;mt.add(gn);let ci=i("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])p(new Et(.765,.028,10,80),ci,0,0,M,gn);for(let M=0;M<8;M++){let T=M*Math.PI/4,I=p(new Ze(.025,.025,.025,6),ci,Math.sin(T)*.73,Math.cos(T)*.73,.35,gn);I.rotation.x=Math.PI/2}let wn={classic:new Ke,dual:new Ke,titanium:new Ke},hi=i("#a9b7c4",.92,.23),Wi=i("#668bb5",.88,.25);Object.values(wn).forEach(M=>n.add(M));for(let[M,T]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let I of T){let K=M==="titanium"?Wi:hi,O=p(new Ze(.105,.105,.5,32),K,-2.42,.76,I,wn[M]);O.rotation.z=Math.PI/2;let ae=p(new Ze(.079,.079,.012,32),h,-2.678,.76,I,wn[M]);ae.rotation.z=Math.PI/2;let X=p(new Et(.094,.012,8,32),K,-2.69,.76,I,wn[M]);X.rotation.y=Math.PI/2}for(let[M,T]of Object.entries(wn)){let I=M==="classic"?[0]:[-.67,.67];for(let O of I){let ae=p(new Ze(.18,.18,.52,40),hi,-2.19,.76,O,T);ae.rotation.z=Math.PI/2;for(let X of[-2.36,-2.04]){let H=p(new Et(.184,.016,8,40),h,X,.76,O,T);H.rotation.y=Math.PI/2,p(new gt(.07,.19,.07),hi,X,.94,O,T)}}let K=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let O of K){let ae=p(new Ze(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,O,T);ae.rotation.z=Math.PI/2;let X=p(new Et(.107,.018,10,40),M==="titanium"?Wi:hi,-2.57,.76,O,T);if(X.rotation.y=Math.PI/2,M==="titanium")for(let[H,Z]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let Te=p(new Et(.106,.008,6,40),i(Z,.85,.3),H,.76,O,T);Te.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let T=new Pt([new A(-2.16,1.46,M*.65),new A(-1.94,1.66,M*.69),new A(-1.3,1.59,M*.64),new A(-.98,1.47,M*.7)]);p(new Rt(T,32,.022,8,!1),o),_(.34,.06,.14,o,-1.84,1.48,M*.4)}for(let M of[-1,1]){let T=new Pt([new A(-2.45,1.1,M*.7),new A(-2.43,1.36,M*.72),new A(-2.19,1.55,M*.7),new A(-1.9,1.55,M*.68)]);p(new Rt(T,40,.075,14,!1),h),p(new Rt(T,40,.019,10,!1),o);for(let I of[-2.2,-1.96]){let K=new Pt([new A(I,1.43,M*.48),new A(I,1.63,M*.6),new A(I+.24,1.57,M*.82)]);p(new Rt(K,24,.017,8,!1),o)}}let Er=[],Ar=[],Fn=[];for(let M=0;M<=48;M++){let T=-.92+M*1.84/48;for(let I of[.64,1.23])Ar.push(2.57-.28*(Math.sin(T)*1.25/1.1)**2,I,Math.sin(T)*1.25)}for(let M=0;M<48;M++){let T=M*2;Fn.push(T,T+2,T+1,T+1,T+2,T+3)}let ui=new ct;ui.setAttribute("position",new Fe(Ar,3)),ui.setIndex(Fn),ui.computeVertexNormals();let Xi=i("#00453f",.72,.14);Xi.clearcoat=1,Xi.side=Ut,p(ui,Xi);for(let M of[.635,1.225]){let T=Array.from({length:65},(I,K)=>{let O=-1.04+K*2.08/64;return new A(2.57-.28*(O/1.1)**2,M,O)});p(new Rt(new Pt(T),80,.034,12,!1),o)}for(let M of[-1,1]){let T=M*1,I=2.57-.28*(T/1.1)**2,K=new Pt([new A(I-.04,.635,T),new A(I+.05,.78,T),new A(I+.065,1.12,T),new A(I-.04,1.25,T)]);p(new Rt(K,32,.065,12,!1),o);for(let O of[.91,1.065]){let ae=Array.from({length:16},(X,H)=>{let Z=M*(.51+H*.41/15);return new A(2.57-.28*(Z/1.1)**2+.018,O,Z)});Er.push(p(new Rt(new Pt(ae),24,.017,8,!1),d))}}let Cr=[];for(let M=0;M<2;M++){let T=new Mt(t.cardCanvas(e.cards,M));T.colorSpace=ot,T.anisotropy=16;let I=new Sn({map:T,transparent:!0,toneMapped:!1});Cr.push(I);let K=1.65,O=M?.34:-.34,ae=_(.47,.008,.63,i("#ddd9cf",0,.95),K,1.474+M*.003,O);ae.rotation.y=-(M?-.08:.08);let X=p(new Bt(.5,.67),I,K,1.48+M*.003,O);X.rotation.x=-Math.PI/2,X.rotation.z=M?-.08:.08,X.castShadow=!1,X.receiveShadow=!1}let En=new Tn({map:new Mt(t.plateCanvas(e)),roughness:.6});for(let M of[-1,1]){let T=p(new Bt(.79,.463),En,M*2.605,1.01,0);T.rotation.y=M*Math.PI/2}let zt={},Ot=i("#7d8c98",.82,.28),dt=i("#202a32",.45,.38),ji=i("#a7c6d5",.98,.055),tn=i("#182029",.35,.48);tn.bumpMap=Ce("#888888",.2),tn.bumpScale=.001;function lt(M,T,I,K,O,ae,X,H,Z){let Te=new kt(v(M,T,K),{depth:I,bevelEnabled:!0,bevelSize:Math.min(.012,I*.2),bevelThickness:Math.min(.012,I*.2),bevelSegments:3,curveSegments:12});return Te.translate(0,0,-I/2),p(Te,O,ae,X,H,Z)}function St(M,T,I,K){return p(new Rt(new Pt(M.map(O=>new A(...O))),40,T,12,!1),I,0,0,0,K)}function R(M,T,I,K){let O=p(new Ze(.014,.014,.014,6),Ot,M,T,I,K);O.rotation.x=Math.PI/2}function ee(M,T,I,K,O,ae){let X=new jt;X.moveTo(-K*.5,0),X.bezierCurveTo(-K*.52,.055,-K*.12,.07,K*.5,.008),X.quadraticCurveTo(K*.05,-.025,-K*.5,0);let H=new kt(X,{depth:I,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});H.translate(0,0,-I/2);let Z=p(H,O,M,T,0,ae);return Z.rotation.z=-.08,Z}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){zt[M]={};for(let T of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let I=new Ke;n.add(I),zt[M][T]=I;let K=["sport","aero"].includes(T)?tn:Ot;if(M==="spoiler"){let O=T==="lip"?1.43:T==="sport"?1.78:2.08,ae=T==="gt"||T==="double"?1.98:1.72,X=-2.39;for(let H of[-.62,.62]){if(lt(.25,.055,.22,.045,dt,-2.24,1.31,H,I),T!=="lip"){let Z=lt(.15,O-1.32,.065,.035,dt,-2.32,(O+1.32)/2,H,I);Z.rotation.z=-.19}for(let Z of[-.065,.065]){let Te=p(new Ze(.012,.012,.015,6),Ot,-2.24,1.35,H+Z,I)}}if(ee(X,O,ae,T==="lip"?.22:.36,K,I),T!=="lip")for(let H of[-1,1]){let Z=lt(.43,.19,.025,.055,K,X,O+.055,H*ae/2,I);Z.rotation.z=-.12,R(X-.1,O+.045,H*(ae/2+.02),I),R(X+.1,O+.045,H*(ae/2+.02),I)}if(T==="double"){ee(X+.025,O+.24,ae*.94,.27,tn,I);for(let H of[-1,1])lt(.08,.28,.025,.02,dt,X,O+.13,H*ae*.47,I)}continue}if(M==="mirrors")for(let O of[-1,1]){let ae=T==="aero",X=ae?1.77:1.86,H=O*(ae?1.47:1.53),Z=.77;lt(.18,.08,.15,.035,dt,.64,1.46,O*1.19,I),St([[.64,1.47,O*1.19],[.62,1.62,O*1.32],[Z,X-.07,H]],ae?.023:.029,K,I);let Te=p(new qt(.046,16,12),dt,Z,X-.065,H,I);if(T==="round"){p(new qt(1,32,20),Ot,Z,X,H,I).scale.set(.065,.15,.15);let be=p(new ai(.13,48),ji,Z-.056,X,H,I);be.rotation.y=-Math.PI/2,be.castShadow=!1;let Me=p(new Et(.136,.009,8,48),Ot,Z-.06,X,H,I);Me.rotation.y=Math.PI/2}else{let De=ae?.31:T==="sport"?.35:.38,be=ae?.16:.22,Me=lt(De,be,.095,.065,T==="club"?dt:tn,Z,X,H,I);Me.rotation.y=Math.PI/2;let Re=p(new Ui(v(De-.045,be-.035,.05)),ji,Z-.061,X,H,I);Re.rotation.y=-Math.PI/2,Re.castShadow=!1,Re.receiveShadow=!1;let He=v(De-.028,be-.018,.055).getPoints(24).map(le=>[Z-.058,X+le.y,H+le.x]);He.push(He[0]),St(He,.006,Ot,I)}}else if(M==="sideSkirts")for(let O of[-1,1]){let ae=lt(2.3,T==="aero"?.17:.12,T==="rally"?.27:.13,.05,K,0,.59,O*1.24,I);if(T==="rally")for(let X of[-.84,-.42,0,.42,.84]){let H=lt(.13,.018,.25,.018,dt,X,.67,O*1.24,I)}else St([[-1.08,.54,O*1.3],[0,.53,O*1.32],[1.08,.54,O*1.3]],.009,d,I);for(let X of[-.87,.87])lt(.12,.14,.16,.025,dt,X,.65,O*1.2,I),R(X,.61,O*1.33,I);if(T==="aero")for(let X of[-.95,.95]){let H=lt(.24,.12,.025,.025,tn,X,.57,O*1.35,I);H.rotation.z=X>0?.2:-.2}}else{let O=M==="frontBumper"?1:-1,ae=[[O*2.26,.66,-.92],[O*2.58,.65,-.7],[O*2.67,.65,0],[O*2.58,.65,.7],[O*2.26,.66,.92]];St(ae,T==="sport"?.061:.047,K,I);for(let X of[-.67,.67]){St([[O*2.31,.74,X],[O*2.5,.68,X]],.032,dt,I);let H=lt(.16,.12,.13,.035,dt,O*2.51,.67,X,I)}if(T==="aero"){let X=lt(.38,.045,1.94,.07,tn,O*2.48,.5,0,I);for(let H of[-.7,-.27,.27,.7])lt(.27,.12,.022,.025,dt,O*2.48,.55,H,I);St([[O*2.4,.52,-.91],[O*2.64,.52,0],[O*2.4,.52,.91]],.008,Ot,I)}if(T==="rally")for(let X of[-.72,.72])St([[O*2.53,.65,X-.14],[O*2.56,.94,X-.14],[O*2.55,1.04,X],[O*2.56,.94,X+.14],[O*2.53,.65,X+.14]],.036,Ot,I);if(T==="sport")for(let X of[-.67,.67]){let H=lt(.2,.13,.14,.045,dt,O*2.56,.66,X,I)}if(M==="rearBumper"&&T==="aero")for(let X of[-.7,-.35,0,.35,.7]){let H=lt(.27,.15,.025,.025,tn,-2.46,.48,X,I);H.rotation.z=.12}}}}let se=i("#b9e4f5",.28,.17);se.emissive.set("#b9e4f5"),se.emissiveIntensity=1.8;let ue=i("#ffdda0",.2,.2);ue.emissive.set("#ffe0a8"),ue.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[T,I,K]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let O=new Ke;n.add(O),zt[M][T]=O;let ae=M==="frontBumper"?1:-1,X=T==="trackGT"?.34:.29,H=.59,Z=v(I,X,.1);for(let[le,we]of[[0,.94],[-.79,.32],[.79,.32]]){let Ve=v(we,.115,.045,on);Z.holes.push(new on(Ve.getPoints(24).map(xt=>new de(xt.x+le,xt.y))))}let Te=new kt(Z,{depth:K,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),De=Te.attributes.position;for(let le=0;le<De.count;le++){let we=De.getX(le),Ve=De.getY(le),xt=De.getZ(le);De.setXYZ(le,ae*(2.43+xt-.24*(we/(I/2))**2),H+Ve,we)}Te.computeVertexNormals(),p(Te,s,0,0,0,O);for(let[le,we]of[[0,.94],[-.79,.32],[.79,.32]]){let Ve=ae*(2.43-.24*(le/(I/2))**2);lt(.025,.14,we+.02,.04,h,Ve,H,le,O);for(let xt of[-.032,.012,.045])lt(.012,.006,we-.035,.003,dt,Ve+ae*.022,H+xt,le,O)}let be=Array.from({length:41},(le,we)=>{let Ve=-I/2+we*I/40;return[ae*(2.44+K+.045-.24*(Ve/(I/2))**2),H-X/2-.025,Ve]});St(be,T==="trackGT"?.028:.019,tn,O);let Me=new ct,Re=[],He=[];for(let[le,we,Ve]of be)Re.push(le,we,Ve,le-ae*.17,we+.005,Ve);for(let le=0;le<40;le++){let we=le*2;He.push(we,we+1,we+2,we+1,we+3,we+2)}if(Me.setAttribute("position",new Fe(Re,3)),Me.setIndex(He),Me.computeVertexNormals(),p(Me,tn,0,0,0,O),M==="rearBumper")for(let le=0;le<(T==="trackGT"?5:3);le++){let we=(le-(T==="trackGT"?2:1))*.3,Ve=lt(.24,.075,.014,.008,tn,-2.48,H-X/2-.035,we,O);Ve.rotation.z=-.12}else if(T==="trackGT")for(let le of[-.92,.92]){let we=lt(.18,.05,.018,.008,tn,2.43,H-X/2,le,O);we.rotation.z=.08}}zt.headlights={};for(let M of["round","projector","rally","matrix"]){let T=new Ke;n.add(T),zt.headlights[M]=T;for(let I of[-1,1]){let K=I*.74,O=2.57-.28*(K/1.1)**2+.07,ae=1.075;if(M==="matrix"){let X=lt(.4,.2,.075,.045,dt,O,ae,K,T);X.rotation.y=Math.PI/2;let H=lt(.35,.15,.01,.035,h,O+.05,ae,K,T);H.rotation.y=Math.PI/2;for(let Z=0;Z<4;Z++){let Te=lt(.06,.1,.012,.017,se,O+.065,ae,K-.128+Z*.085,T);Te.rotation.y=Math.PI/2,Te.castShadow=!1}}else{let X=M==="rally"?.16:M==="round"?.14:.135,H=p(new Ze(X+.027,X+.02,.095,48),dt,O,ae,K,T);H.rotation.z=Math.PI/2;let Z=p(new Et(X+.008,.01,10,48),Ot,O+.054,ae,K,T);Z.rotation.y=Math.PI/2;let Te=p(new qt(1,32,20),M==="round"||M==="rally"?ue:se,O+.055,ae,K,T);if(Te.scale.set(.025,X,X),Te.castShadow=!1,M==="projector"){let De=p(new Et(X*.8,.008,8,48),se,O+.076,ae,K,T);De.rotation.y=Math.PI/2,p(new qt(1,24,16),ji,O+.081,ae,K,T).scale.set(.022,X*.53,X*.53)}if(M==="rally")for(let De of[-.07,0,.07]){let be=Math.sqrt(X*X-De*De);St([[O+.09,ae-be,K+De],[O+.1,ae,K+De],[O+.09,ae+be,K+De]],.009,dt,T)}}}}for(let[M,T]of Object.entries(t.streetHeadlights)){let I=new Ke;n.add(I),zt.headlights[M]=I;let K=i(T.color,.12,.22);K.emissive.set(T.color),K.emissiveIntensity=T.smoke?.35:1.1;let O=i(T.smoke?"#1c3348":"#83b6d5",.45,.12);for(let ae of[-1,1]){let X=ae*.72,H=2.57-.28*(X/1.1)**2+.07,Z=1.075;if(T.shape==="sportHousing"){let be=new jt;be.moveTo(-.29,.12),be.lineTo(.23,.09),be.quadraticCurveTo(.32,.02,.26,-.13),be.lineTo(-.25,-.14),be.closePath();let Me=p(new kt(be,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),dt,H+.02,Z,X,I);Me.rotation.y=Math.PI/2;for(let Re=0;Re<2;Re++){let He=X+(Re-.5)*.24;if(p(new qt(1,24,16),O,H+.13,Z,He,I).scale.set(.022,.067,.067),T.signature==="rings"){let we=p(new Et(.086,.01,10,48),K,H+.155,Z,He,I);we.rotation.y=Math.PI/2}if(T.signature==="doubleL"&&St([[H+.155,Z+.075,He-.085],[H+.155,Z-.075,He-.085],[H+.155,Z-.075,He+.075]],.012,K,I),T.signature==="pixels")for(let we=0;we<3;we++)p(new gt(.014,.026,.026),K,H+.155,Z+.09,He-.055+we*.055,I)}T.signature==="arc"&&St([[H+.155,Z-.09,X-.25],[H+.155,Z+.1,X-.25],[H+.155,Z+.12,X],[H+.155,Z+.07,X+.25]],.012,K,I);continue}let Te=lt(.47,.25,.1,.04,dt,H,Z,X,I);Te.rotation.y=Math.PI/2;for(let be of[-.18,.18]){p(new gt(.1,.07,.035),Ot,H-.035,Z-.15,X+be,I);let Me=p(new Ze(.012,.012,.018,12),o,H+.02,Z-.13,X+be,I);Me.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(T.shape)){let be=T.shape==="doubleU"?2:1;for(let Me=0;Me<be;Me++){let Re=X+(Me-(be-1)/2)*.21;if(p(new qt(1,24,16),O,H+.073,Z,Re,I).scale.set(.019,.067,.067),T.shape==="doubleU")St([[H+.1,Z+.075,Re-.08],[H+.1,Z-.04,Re-.08],[H+.1,Z-.08,Re-.045],[H+.1,Z-.08,Re+.045],[H+.1,Z-.04,Re+.08],[H+.1,Z+.075,Re+.08]],.01,K,I);else if(T.shape==="brow"){St([[H+.1,Z+.055,Re-.19],[H+.1,Z+.093,Re-.14],[H+.1,Z+.093,Re+.19]],.011,K,I);let le=p(new Et(.068,.006,8,32),K,H+.095,Z-.015,Re,I);le.rotation.y=Math.PI/2}else for(let le=0;le<3;le++){let we=le*Math.PI*2/3-Math.PI/2;St([[H+.102,Z+Math.sin(we)*.025,Re+Math.cos(we)*.025],[H+.102,Z+Math.sin(we)*.1,Re+Math.cos(we)*.1]],.011,K,I)}}continue}if(T.shape==="bar"){for(let[be,Me,Re]of[[.035,.41,.025],[-.045,.33,.012]]){let He=lt(Me,Re,.014,.006,K,H+.064,Z+be,X,I);He.rotation.y=Math.PI/2,He.castShadow=!1}continue}if(T.shape==="square"){let be=lt(.37,.17,.024,.015,K,H+.065,Z,X,I);be.rotation.y=Math.PI/2;for(let Me=0;Me<7;Me++)p(new gt(.006,.16,.004),O,H+.082,Z,X-.15+Me*.05,I);continue}let De=T.count===3?.062:T.count===2?.087:.106;for(let be=0;be<T.count;be++){let Me=X+(be-(T.count-1)/2)*(T.count===3?.14:.205),Re=p(new Ze(De+.014,De+.02,.09,T.shape==="hex"?6:40),h,H+.035,Z,Me,I);Re.rotation.z=Math.PI/2;let He=p(new Et(De,.009,8,T.shape==="hex"?6:48),K,H+.09,Z,Me,I);He.rotation.y=Math.PI/2,He.castShadow=!1;let le=p(new qt(1,24,16),T.projector?O:K,H+.077,Z,Me,I);if(le.scale.set(.018,De*.74,De*.74),le.castShadow=!1,T.projector&&p(new qt(1,16,12),K,H+.092,Z,Me,I).scale.set(.006,De*.31,De*.31),T.cross||T.guard)for(let we of[-1,1])St([[H+.11,Z-De*.74,Me-we*De*.74],[H+.115,Z,Me],[H+.11,Z+De*.74,Me+we*De*.74]],.009,dt,I)}}}let ie={};for(let M of["club","sport","rally","chrome"]){let T=[];ie[M]=T;for(let{wheelGroup:I,sign:K}of W){let O=new Ke;I.add(O),T.push(O);let ae=M==="rally"?.91:.87,X=M==="rally"?.64:M==="sport"?.49:.57,H=M==="sport"?1:1.23,Z=[],Te=[];for(let Re=0;Re<=48;Re++){let He=-H+Re*H*2/48;for(let le of[-X/2,X/2])Z.push(Math.sin(He)*ae,Math.cos(He)*ae,le)}for(let Re=0;Re<48;Re++){let He=Re*2;Te.push(He,He+1,He+2,He+1,He+3,He+2)}let De=new ct;De.setAttribute("position",new Fe(Z,3)),De.setIndex(Te),De.computeVertexNormals();let Me=(M==="chrome"?Ot:M==="club"?s:tn).clone();Me.side=Ut,p(De,Me,0,0,0,O);for(let Re of[-1,1]){let He=Array.from({length:49},(le,we)=>{let Ve=-H+we*H*2/48;return[Math.sin(Ve)*ae,Math.cos(Ve)*ae,Re*X/2]});St(He,.012,M==="chrome"?Ot:dt,O)}for(let Re of[-1,1])St([[0,0,-K*.28],[Re*.28,.42,-K*.31],[Re*.49,.68,-K*.31]],.022,dt,O),R(Re*.49,.68,-K*.32,O);if(M==="rally"){let Re=lt(.13,.25,X*.9,.025,dt,-.83,.2,0,O)}O.userData.shell=Me}}zt.windshield={};for(let[M,T,I,K]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let ae=function(le,we){let Ve=.92*(1-.13*we),xt=1-le*le;return[1.97+.23*xt-T*.32*we,1.5+T*we*(.84+.16*xt),le*Ve]},O=new Ke;n.add(O),zt.windshield[M]=O;let X=[],H=[],Z=40,Te=16;for(let le=0;le<=Te;le++)for(let we=0;we<=Z;we++)X.push(...ae(-1+we*2/Z,le/Te));for(let le=0;le<Te;le++)for(let we=0;we<Z;we++){let Ve=le*(Z+1)+we;H.push(Ve,Ve+1,Ve+Z+1,Ve+1,Ve+Z+2,Ve+Z+1)}let De=new ct;De.setAttribute("position",new Fe(X,3)),De.setIndex(H),De.computeVertexNormals();let be=new mn({color:I,metalness:.05,roughness:.075,transparent:!0,opacity:K,depthWrite:!1,side:Ut,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});O.userData.glass=be,O.userData.originalTint={color:I,opacity:K};let Me=p(De,be,0,0,0,O);Me.castShadow=!1,Me.receiveShadow=!1,Me.renderOrder=3;let Re=["smoke","highSmoke"].includes(M)?dt:Ot;for(let le of[0,1])St(Array.from({length:41},(we,Ve)=>ae(-1+Ve/20,le)),le===0?.017:.009,Re,O);for(let le of[-1,1]){St(Array.from({length:17},(xt,di)=>ae(le,di/16)),.011,Re,O);let we=ae(le,0);lt(.19,.055,.14,.025,dt,we[0],we[1]-.025,we[2],O);let Ve=p(new Ze(.013,.013,.018,6),Ot,we[0]+.04,we[1]+.014,we[2],O)}let He=new Sn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let le of[-.77,-.69]){let we=Array.from({length:13},(xt,di)=>{let On=ae(le,.18+di*.058);return On[0]+=.004,On}),Ve=St(we,.003,He,O);Ve.castShadow=!1,Ve.receiveShadow=!1,Ve.renderOrder=4}}let ge=new Ke;for(let M of n.children.slice())M.userData.groundWheel||ge.add(M);n.add(ge);let Le=i("#b8c7d6",.72,.27),Ne=new Ke,ke=[];n.add(Ne);for(let M of[-1.72,1.72])for(let T of[-1,1]){let I=new Ke;I.position.set(M,.52,T*1.12),Ne.add(I);let K=Array.from({length:193},(be,Me)=>{let Re=Me/192,He=Re*Math.PI*14;return new A(Math.cos(He)*.071,.055+Re*.36,Math.sin(He)*.071)}),O=p(new Rt(new Pt(K),192,.014,10,!1),Le,0,0,0,I);p(new Ze(.039,.039,.23,24),dt,0,.14,0,I);let ae=p(new Ze(.018,.018,.28,20),Ot,0,.34,0,I),X=new Ke;X.position.y=.47,I.add(X);for(let[be,Me]of[[I,.04],[X,-.015]])p(new Ze(.095,.095,.026,32),Ot,0,Me,0,be),p(new Ze(.068,.068,.018,24),dt,0,Me+.02,0,be);p(new gt(.14,.075,.18),dt,0,.025,T*.035,I),p(new gt(.16,.075,.22),dt,0,0,-T*.075,X);let H=new A(M,.56,T*1.12),Z=new A(M,.81,T*1.43),Te=Z.clone().sub(H);p(new Ze(.026,.026,Te.length(),16),dt,...H.clone().add(Z).multiplyScalar(.5).toArray(),Ne).quaternion.setFromUnitVectors(new A(0,1,0),Te.normalize()),ke.push({coil:O,rod:ae,upper:X})}zt.brakes={};for(let M of["stock","red","gold","ceramic"]){let T=new Ke;n.add(T),zt.brakes[M]=T;for(let{wheelGroup:I,sign:K}of W){let O=Jl(M);O.position.z=K*.165,K<0&&(O.rotation.y=Math.PI),I.add(O),T.userData.brakeAssemblies??=[],T.userData.brakeAssemblies.push(O)}}zt.nitrous={};let Xe=document.createElement("canvas");Xe.width=512,Xe.height=256;let Be=Xe.getContext("2d");Be.fillStyle="#101923",Be.fillRect(0,0,512,256),Be.strokeStyle="#e8e1cc",Be.lineWidth=8,Be.strokeRect(10,10,492,236),Be.fillStyle="#f5f2e8",Be.textAlign="center",Be.font="italic bold 106px Arial",Be.fillText("N\u2082O",256,117),Be.font="bold 24px Arial",Be.fillText("NITROUS OXIDE",256,159),Be.fillStyle="#d9b36b",Be.font="bold 18px Arial",Be.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)Be.fillRect(165+M*4,212,M%3+1,17);let je=new Mt(Xe);je.colorSpace=ot,je.anisotropy=8;let et=document.createElement("canvas");et.width=et.height=128;let Ye=et.getContext("2d");Ye.fillStyle="#eee9dc",Ye.fillRect(0,0,128,128),Ye.translate(64,64),Ye.strokeStyle="#17202a";for(let M=0;M<=20;M++){let T=-Math.PI*.8+M*Math.PI*1.6/20;Ye.lineWidth=M%5?2:4,Ye.beginPath(),Ye.moveTo(Math.sin(T)*43,-Math.cos(T)*43),Ye.lineTo(Math.sin(T)*(M%5?49:53),-Math.cos(T)*(M%5?49:53)),Ye.stroke()}Ye.fillStyle="#293541",Ye.textAlign="center",Ye.font="bold 14px Arial",Ye.fillText("PSI",0,30),Ye.strokeStyle="#c92737",Ye.lineWidth=4,Ye.beginPath(),Ye.moveTo(-9,12),Ye.lineTo(26,-31),Ye.stroke(),Ye.fillStyle="#25313a",Ye.beginPath(),Ye.arc(0,0,6,0,Math.PI*2),Ye.fill();let At=new Mt(et);At.colorSpace=ot;for(let M of["blue","twin","triple"]){let T=new Ke;T.name="nitrous-"+M,n.add(T),zt.nitrous[M]=T;let I=i(t.item("nitrous",M).color,.65,.27),K=M==="triple"?3:M==="twin"?2:1,O=1.49,ae=-1.3,X=.37,H=i("#b4924f",.8,.3),Z=i("#a5b2bd",.85,.24),Te=i("#1b2028",.08,.85),De=i("#ab2635",.35,.4);for(let be of[-1.52,-1.13]){lt(.095,.05,K*X+.04,.015,h,be,1.29,0,T);for(let Me of[-1,1]){let Re=Me*(K*X/2-.02);p(new Ze(.024,.024,.023,6),Z,be,1.327,Re,T)}}for(let be=0;be<K;be++){let Me=(be-(K-1)/2)*X,Re=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Tt,Zt])=>new de(Tt,Zt)),He=p(new Di(Re,40),I,ae,O,Me,T);He.rotation.z=-Math.PI/2;for(let Tt of[-1.52,-1.13]){lt(.11,.095,.27,.025,Te,Tt,1.35,Me,T);let Zt=p(new Et(.152,.013,8,40),Z,Tt,O,Me,T);Zt.rotation.y=Math.PI/2,lt(.08,.025,.055,.008,Z,Tt,O+.155,Me,T),p(new Ze(.013,.013,.018,6),h,Tt,O+.179,Me,T)}let le=[],we=[],Ve=[];for(let Tt=0;Tt<2;Tt++)for(let Zt=0;Zt<=16;Zt++){let xs=-.91+Zt*1.82/16;if(le.push(ae+(Tt?.12:-.12),O+Math.cos(xs)*.147,Me+Math.sin(xs)*.147),we.push(Tt,Zt/16),Tt&&Zt){let Zn=17+Zt;Ve.push(Zn-18,Zn-17,Zn,Zn-18,Zn,Zn-1)}}let xt=new ct;xt.setAttribute("position",new Fe(le,3)),xt.setAttribute("uv",new Fe(we,2)),xt.setIndex(Ve),xt.computeVertexNormals();let di=new mn({map:je,roughness:.55,metalness:.05,side:Ut});p(xt,di,0,0,0,T);let On=p(new Ze(.046,.046,.055,24),H,-.89,O,Me,T);On.rotation.z=Math.PI/2,lt(.075,.07,.065,.012,H,-.845,O,Me,T),p(new Ze(.016,.016,.065,16),Z,-.845,O+.045,Me,T);let Rr=p(new Et(.052,.012,8,24),De,-.845,O+.092,Me,T);Rr.rotation.x=Math.PI/2;for(let Tt of[0,Math.PI/3,Math.PI*2/3]){let Zt=lt(.106,.014,.014,.004,De,-.845,O+.092,Me,T);Zt.rotation.y=Tt}let wt=new Ke;wt.position.set(-.84,O+.065,Me+.075),wt.rotation.x=-Math.PI*.32,T.add(wt);let Bn=p(new Ze(.057,.057,.03,32),Z,0,0,0,wt);Bn.rotation.x=Math.PI/2;let ys=p(new ai(.047,32),new Sn({map:At}),0,0,.017,wt),vn=p(new Ze(.024,.024,.055,6),H,-.79,O,Me,T);vn.rotation.z=Math.PI/2,St([[-.76,O,Me],[-.7,O-.02,Me],[-.71,1.3,Me],[-.91,1.24,Me]],.014,Te,T);let ln=p(new Ze(.021,.021,.055,12),Z,-.74,O,Me,T);ln.rotation.z=Math.PI/2}lt(.07,.07,K*X,.015,H,-.91,1.24,0,T),St([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,Te,T)}zt.seat={};for(let M of["red","carbon"]){let T=$l(M);T.rotation.y=Math.PI/2,T.position.set(-.8,1.04,0),n.add(T),zt.seat[M]=T}function Nt(M){Pe(M);let T=t.glassTints[M.glassTint]||t.glassTints.original;for(let H of Object.values(zt.windshield)){let Z=H.userData.originalTint;H.userData.glass.color.set(T.opacity===null?Z.color:T.color),H.userData.glass.opacity=T.opacity??Z.opacity}let I={standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0;Er.forEach(H=>H.visible=!M.headlights||M.headlights==="classic");for(let[H,Z]of Object.entries(ie))for(let Te of Z)Te.visible=M.fenders===H,H==="club"&&Te.userData.shell.color.set(t.item("paint",M.paint).color);Le.color.set(t.item("suspension",M.suspension).color),ge.position.y=I,Ne.visible=I>0,ke.forEach(({coil:H,rod:Z,upper:Te})=>{H.scale.y=1+I/.415,Z.scale.y=1+I/.28,Z.position.y=.34+I/2,Te.position.y=.47+I});for(let[H,Z]of Object.entries(zt))for(let[Te,De]of Object.entries(Z))De.visible=M[H]===Te;for(let[H,Z]of Object.entries(zt.brakes))for(let Te of Z.userData.brakeAssemblies||[])Te.visible=(M.brakes||"stock")===H;Object.entries(Ge).forEach(([H,Z])=>Z.visible=H===(M.steering||"classic")),Object.entries(wn).forEach(([H,Z])=>Z.visible=H===(M.exhaust||"classic")),gn.visible=M.turbine==="boost";let K=["twin","twinBig"].includes(M.turbine),O=M.turbine==="twinBig",ae=O?.9:K?.52:M.turbine==="boost"?.96:.9;mt.scale.set(ae/1.24,ae/.86,ae/.95),mt.position.set(_t,B+(O?.06:K?-.2:-.04),K?O?-.7:-.44:0),Yt.visible=K,Yt.scale.copy(mt.scale),Yt.position.set(_t,B+(O?.06:-.2),O?.7:.44);let X=M.badges||[];if(w.forEach(H=>H.visible=!X.length),x.forEach(H=>H.userData.plane.visible=!X.length),P.forEach(({group:H,mat:Z,back:Te,n:De})=>{let be=X[De];H.visible=!!be;let Me=be+":"+(M.prizeTotal||0);if(!be||Z.userData.badge===Me)return;let Re=new jt,He=.65/512,le=(we,Ve)=>[(we-256)*He,(256-Ve)*He];if(be==="millionaire"||be==="day-hero")Re.absarc(0,0,204*He,0,Math.PI*2,!1);else if(be==="rating-top10"){for(let we=0;we<6;we++){let Ve=we*Math.PI/3-Math.PI/2,xt=le(256+Math.cos(Ve)*215,256+Math.sin(Ve)*215);we?Re.lineTo(...xt):Re.moveTo(...xt)}Re.closePath()}else Re.moveTo(...le(80,88)),Re.quadraticCurveTo(...le(256,0),...le(432,88)),Re.lineTo(...le(420,296)),Re.quadraticCurveTo(...le(390,400),...le(256,465)),Re.quadraticCurveTo(...le(122,400),...le(92,296)),Re.closePath();Te.geometry.dispose(),Te.geometry=new kt(Re,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),Z.map?.dispose(),Z.map=new Mt(t.badgeCanvas(be,M)),Z.map.colorSpace=ot,Z.map.anisotropy=16,Z.emissive.set("#ffffff"),Z.emissiveMap=Z.map,Z.emissiveIntensity=.35,Z.userData.badge=Me,Z.needsUpdate=!0}),s.color.set(t.item("paint",M.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(M)),ye!==M.wheels){for(let H of _e)H.removeFromParent(),H.geometry.dispose();_e.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:H,x:Z,out:Te,sign:De}of W)for(let be of t.wheelDesign(M.wheels)){let Me=new Pt(be.map(([He,le])=>new A(He,le,De*(.25+.025*(1-Math.hypot(He,le)/.51))))),Re=p(new Rt(Me,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[M.wheels]||(["fiveSpoke","legend"].includes(M.wheels)?.023:.009),8,!1),l,0,0,0,H);_e.push(Re)}ye=M.wheels}o.color.set(t.item("trim",M.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,o.metalness=.95,u.userData.style!==M.upholstery&&(u.map?.dispose(),u.map=new Mt(t.upholsteryCanvas(M.upholstery)),u.map.colorSpace=ot,u.map.wrapS=u.map.wrapT=Pn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,u.userData.style=M.upholstery,u.needsUpdate=!0),t.chipPalette(M.chips).forEach((H,Z)=>{re[Z].color.set(H),re[Z].roughness=M.chips==="ceramic"?.25:.55}),z.forEach(H=>H.visible=M.chips!=="ceramic"),U.forEach(({mat:H,n:Z})=>{H.userData.style!==M.chips&&(H.map?.dispose(),H.map=new Mt(t.chipCanvas(M.chips,Z)),H.map.colorSpace=ot,H.map.anisotropy=8,H.userData.style=M.chips,H.needsUpdate=!0)}),Cr.forEach((H,Z)=>{H.userData.style!==M.cards&&(H.map?.dispose(),H.map=new Mt(t.cardCanvas(M.cards,Z)),H.map.colorSpace=ot,H.map.anisotropy=16,H.userData.style=M.cards,H.needsUpdate=!0)}),_e.forEach(H=>H.visible=!0),Q.forEach(H=>H.visible=!0),d.color.set(t.item("light",M.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,En.userData.number!==M.number+M.region&&(En.map?.dispose(),En.map=new Mt(t.plateCanvas(M)),En.userData.number=M.number+M.region,En.needsUpdate=!0)}for(let M of[-1,1])St([[-1.64,.43,M*.94],[0,.4,M*1.02],[1.66,.43,M*.94]],.027,d,ge),St([[M*1.91,.43,-.66],[M*2.05,.43,0],[M*1.91,.43,.66]],.023,d,ge);let yt=new fr(d.color,.45,2,2);yt.position.set(-1.9,2,.48),ge.add(yt);let at=Nt;function bt(M){at(M),yt.color.copy(d.color)}return bt(e),{car:n,update:bt}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new bn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ot,n.toneMapping=jn,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ia,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new rn,s=new Lt(t.snapshotOnly?25:35,1,.1,60);i.add(new Ln("#c6d9ef","#44311e",1.25));for(let[oe,ve,Ce,ce,_e]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let Q=new Dn(oe,ve);Q.position.set(Ce,ce,_e),Q.castShadow=oe==="#fff0d0",Q.shadow.bias=-2e-4,Q.shadow.normalBias=.025,Q.shadow.mapSize.set(2048,2048),Q.shadow.camera.left=-5,Q.shadow.camera.right=5,Q.shadow.camera.top=5,Q.shadow.camera.bottom=-5,i.add(Q)}let a=new rn;a.background=new qe("#48505b");for(let[oe,ve,Ce,ce,_e,Q]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let W=new pt(new gt(ce,_e,Q),new Sn({color:"#ffffff"}));W.position.set(oe,ve,Ce),a.add(W)}let o=new br(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(oe=>{oe.geometry?.dispose(),oe.material?.dispose()}),o.dispose();let l=new pt(new Bt(30,30),new ls({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=gp(i,e),u=new Qt({transparent:!0,depthWrite:!1,side:Ut,toneMapped:!1,uniforms:{color:{value:new qe(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new pt(new Bt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let oe of[-.9,.9]){let ve=new fr(u.uniforms.color.value,1.8,3,2);ve.position.set(0,.32,oe),i.add(ve),m.push(ve)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function _(oe){t.night=!!oe;for(let ve of i.children)ve.isHemisphereLight&&(ve.intensity=oe?.26:1.25),ve.isDirectionalLight&&(ve.userData.dayIntensity??=ve.intensity,ve.intensity=ve.userData.dayIntensity*(oe?.13:1));i.environmentIntensity=oe?.24:1.5,u.uniforms.strength.value=oe?1.35:.95}_(t.night);let f=oe=>{p&&_(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=oe=>{h.update(oe),u.uniforms.color.value.set(window.PokerGarage.item("light",oe.light).color),m.forEach(ve=>ve.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let v=!1,y=null,b=0,S=0,C=()=>{let oe=r.clientWidth,ve=r.clientHeight;oe&&ve&&(n.setSize(oe,ve,!1),s.aspect=oe/ve,s.updateProjectionMatrix())},D=new ResizeObserver(C);D.observe(r),C();let F=new yn(1,1,{type:bi,depthBuffer:!0});F.samples=4;let L=new rn,k=new oi(-1,1,1,-1,0,1),q=new Qt({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:F.texture},stepSize:{value:new de}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),G=new pt(new Bt(2,2),q);L.add(G);function te(){let oe=n.getDrawingBufferSize(new de);(F.width!==oe.x||F.height!==oe.y)&&F.setSize(oe.x,oe.y),q.uniforms.stepSize.value.set(3/oe.x,3/oe.y),n.setRenderTarget(F),n.render(i,s),n.setRenderTarget(null),n.render(L,k)}let j=oe=>{oe.button&&oe.button!==0||(t.manual=!0,y={id:oe.pointerId,x:oe.clientX,y:oe.clientY},r.setPointerCapture(oe.pointerId),oe.preventDefault())},$=oe=>{!y||y.id!==oe.pointerId||(t.yaw-=(oe.clientX-y.x)*.011,t.pitch=iu(t.pitch+(oe.clientY-y.y)*.009,-.24,1.35),y.x=oe.clientX,y.y=oe.clientY,oe.preventDefault())},ne=oe=>{y&&y.id===oe.pointerId&&(y=null,r.hasPointerCapture(oe.pointerId)&&r.releasePointerCapture(oe.pointerId))},fe=oe=>{let ve={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};ve[oe.key]&&(t.manual=!0,t.yaw+=ve[oe.key][0],t.pitch=iu(t.pitch+ve[oe.key][1],-.24,1.35),oe.preventDefault())};r.addEventListener("keydown",fe),r.addEventListener("pointerdown",j),r.addEventListener("pointermove",$),r.addEventListener("pointerup",ne),r.addEventListener("pointercancel",ne),r.addEventListener("lostpointercapture",ne);function he(){if(v)return;v=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(b),D.disconnect(),r.removeEventListener("keydown",fe),r.removeEventListener("pointerdown",j),r.removeEventListener("pointermove",$),r.removeEventListener("pointerup",ne),r.removeEventListener("pointercancel",ne),r.removeEventListener("lostpointercapture",ne);let oe=new Set,ve=new Set,Ce=new Set;i.traverse(ce=>{ce.geometry&&Ce.add(ce.geometry),ce.material&&ve.add(ce.material)}),ve.forEach(ce=>{for(let _e of Object.values(ce))_e&&_e.isTexture&&oe.add(_e);ce.dispose()}),oe.forEach(ce=>ce.dispose()),Ce.forEach(ce=>ce.dispose()),c.dispose(),F.dispose(),q.dispose(),G.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function Pe(oe){if(v)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){he();return}let ve=S?Math.min(.05,(oe-S)/1e3):0;if(S=oe,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=ve*.13);let Ce=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Ce,1.15+Math.sin(t.pitch)*Ce,Math.cos(t.yaw)*Math.cos(t.pitch)*Ce),s.lookAt(0,1.2,0),te(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}b=requestAnimationFrame(Pe)}return t.snapshotOnly||(b=requestAnimationFrame(Pe)),{update:g,setNight:_,dispose:he,state:t,snapshot(){let oe=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*oe,1.15+Math.sin(t.pitch)*oe,Math.cos(t.yaw)*Math.cos(t.pitch)*oe),s.lookAt(0,1.2,0),te();let ve=document.createElement("canvas");return ve.width=n.domElement.width,ve.height=n.domElement.height,ve.getContext("2d").drawImage(n.domElement,0,0),ve}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
